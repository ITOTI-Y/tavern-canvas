import type {
  GenerationSession,
  ImageRequestQueuePort,
  JobIdSource,
  JobPersistencePort,
  JobTimeSource,
  QueuedImageRequest,
  RandomSource,
  RequestIdSource,
} from "@tavern-canvas/core";
import {
  ImageJobQueue,
  RequestImageTool,
  SessionRegistry,
  SourceContextSchema,
  type GenerationJobSnapshot,
} from "@tavern-canvas/core";
import type { RequestImageArguments } from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import {
  GenerationTriggerModule,
  type FallbackTextSink,
  type GenerationTriggerSessionPort,
} from "../../apps/extension/src/modules/generation/generation_trigger_module.js";
import {
  HostMessagePort,
  MessageBindingModule,
  type FinalAssistantBinding,
  type FinalAssistantBindingSource,
} from "../../apps/extension/src/modules/generation/message_binding_module.js";
import { ControlledProvider } from "../harness/src/controlled_provider.js";
import { FakeHost } from "../harness/src/fake_host.js";

class FixedRandomSource implements RandomSource {
  bytes(length: number): Uint8Array {
    return new Uint8Array(length).fill(9);
  }
}

class SequenceRequestIdSource implements RequestIdSource {
  #sequence = 0;

  next(): string {
    this.#sequence += 1;
    return `11111111-1111-4111-8111-${String(this.#sequence).padStart(12, "0")}`;
  }
}

class SequenceJobIdSource implements JobIdSource {
  #sequence = 0;

  next(): string {
    this.#sequence += 1;
    return `22222222-2222-4222-8222-${String(this.#sequence).padStart(12, "0")}`;
  }
}

class SequenceTimeSource implements JobTimeSource {
  #milliseconds = Date.parse("2026-08-05T00:00:00.000Z");

  now(): Date {
    const value = new Date(this.#milliseconds);
    this.#milliseconds += 1;
    return value;
  }
}

class MemoryPersistence implements JobPersistencePort {
  readonly jobs: GenerationJobSnapshot[] = [];

  save(job: GenerationJobSnapshot): Promise<void> {
    this.jobs.push(job);
    return Promise.resolve();
  }
}

class HarnessSessionPort implements GenerationTriggerSessionPort, FinalAssistantBindingSource {
  readonly #sessions: SessionRegistry;
  readonly #bindings = new Map<number, GenerationSession>();
  #root_session: GenerationSession | null = null;

  constructor(sessions: SessionRegistry) {
    this.#sessions = sessions;
  }

  begin(): GenerationSession {
    if (this.#root_session === null) {
      this.#root_session = this.#sessions.open({
        depth: 0,
        host_root_generation_id: "host-root-1",
        source_context: SourceContextSchema.parse({
          schema_version: 1,
          chat_id: "chat-a",
          active_swipes: [],
          messages: [],
        }),
      });
    }
    return this.#root_session;
  }

  complete(_session: GenerationSession): void {}

  bind_message(message_id: number): void {
    if (this.#root_session === null) {
      throw new Error("A root session must start before binding a message");
    }
    this.#bindings.set(message_id, this.#root_session);
  }

  resolve(message_id: number): FinalAssistantBinding | null {
    const session = this.#bindings.get(message_id);
    if (session === undefined) {
      return null;
    }
    return {
      generation_anchor: session.generation_anchor,
      source_anchor: session.source_anchor,
      request_ids: [...session.request_ids],
    };
  }

  get current(): GenerationSession {
    if (this.#root_session === null) {
      throw new Error("Generation has not started");
    }
    return this.#root_session;
  }
}

class HarnessRequestRouter implements ImageRequestQueuePort {
  readonly requests: QueuedImageRequest[] = [];
  readonly job_results: Promise<GenerationJobSnapshot>[] = [];
  requested_swipe_id = 0;
  readonly #jobs: ImageJobQueue;

  constructor(jobs: ImageJobQueue) {
    this.#jobs = jobs;
  }

  enqueue(request: QueuedImageRequest): void {
    this.requests.push(request);
    const result = Promise.resolve().then(() =>
      this.#jobs.enqueue({
        request_id: request.request_id,
        generation_anchor: request.generation_anchor,
        source_anchor: request.source_anchor,
        chat_id: request.source_context.chat_id,
        requested_swipe_id: this.requested_swipe_id,
        provider_id: "sd_webui",
        arguments: request.arguments,
        automatic: true,
      }),
    );
    this.job_results.push(result);
  }

  async wait_for_jobs(count: number): Promise<GenerationJobSnapshot[]> {
    await vi.waitFor(() => expect(this.job_results).toHaveLength(count));
    return Promise.all(this.job_results.slice(0, count));
  }
}

interface GenerationHarness {
  readonly host: FakeHost;
  readonly sessions: HarnessSessionPort;
  readonly router: HarnessRequestRouter;
  readonly provider: ControlledProvider;
  readonly jobs: ImageJobQueue;
  readonly trigger: GenerationTriggerModule;
  readonly binding: MessageBindingModule;
}

async function create_harness(native_tool_available: boolean): Promise<GenerationHarness> {
  const host = new FakeHost(native_tool_available);
  const sessions = new SessionRegistry(new FixedRandomSource());
  const session_port = new HarnessSessionPort(sessions);
  const provider = new ControlledProvider();
  const jobs = new ImageJobQueue({
    executor: provider,
    persistence: new MemoryPersistence(),
    job_id_source: new SequenceJobIdSource(),
    time_source: new SequenceTimeSource(),
  });
  const router = new HarnessRequestRouter(jobs);
  const request_image_tool = new RequestImageTool(sessions, new SequenceRequestIdSource(), router);
  const fallback_text_sink: FallbackTextSink = {
    append: (text) => host.append_cleaned_text(text),
  };
  const trigger = new GenerationTriggerModule({
    host,
    request_image_tool,
    session_port,
    fallback_text_sink,
    is_auto_generation_enabled: () => true,
  });
  const binding = new MessageBindingModule(jobs, new HostMessagePort(host, session_port));
  await trigger.start();
  await binding.start();
  return { host, sessions: session_port, router, provider, jobs, trigger, binding };
}

function tool_arguments(
  harness: GenerationHarness,
  scene_description = "A rainy alley",
): RequestImageArguments {
  return {
    generation_anchor: harness.sessions.current.generation_anchor,
    scene_description,
  };
}

async function wait_for_provider_starts(
  provider: ControlledProvider,
  count: number,
): Promise<void> {
  await vi.waitFor(() => expect(provider.starts).toHaveLength(count));
}

async function wait_for_state(
  jobs: ImageJobQueue,
  job_id: string,
  state: GenerationJobSnapshot["state"],
): Promise<void> {
  await vi.waitFor(() => expect(jobs.get(job_id)?.state).toBe(state));
}

function finish_message(
  harness: GenerationHarness,
  message_id: number,
  role: "assistant" | "system" = "assistant",
): void {
  harness.host.add_message({
    chat_id: "chat-a",
    message_id,
    role,
    content: role === "assistant" ? "Final assistant text" : "Intermediate tool text",
  });
  harness.sessions.bind_message(message_id);
  harness.host.emit_generation({ phase: "ended", message_id });
}

function tavern_metadata(harness: GenerationHarness, message_id: number, swipe_id = 0) {
  const message = harness.host.message("chat-a", message_id);
  return message?.swipes.find((swipe) => swipe.swipe_id === swipe_id)?.metadata.tavern_canvas;
}

function parse_tool_response(response: string): {
  readonly status: string;
  readonly request_id: string;
} {
  const value: unknown = JSON.parse(response);
  if (
    typeof value !== "object" ||
    value === null ||
    !("status" in value && typeof value.status === "string") ||
    !("request_id" in value && typeof value.request_id === "string")
  ) {
    throw new Error("Tool returned an invalid queue response");
  }
  return { status: value.status, request_id: value.request_id };
}

describe("anchored generation flow", () => {
  it("returns three queued native tool results before concurrent providers complete", async () => {
    const harness = await create_harness(true);
    harness.host.emit_generation({ phase: "started", generation_type: "normal", dry_run: false });

    const responses = await Promise.all([
      harness.host.invoke_tool(tool_arguments(harness, "Scene one")),
      harness.host.invoke_tool(tool_arguments(harness, "Scene two")),
      harness.host.invoke_tool(tool_arguments(harness, "Scene three")),
    ]);
    const jobs = await harness.router.wait_for_jobs(3);
    await wait_for_provider_starts(harness.provider, 3);

    expect(responses.map((response) => parse_tool_response(response).status)).toEqual([
      "queued",
      "queued",
      "queued",
    ]);
    expect(jobs.map((job) => harness.jobs.get(job.job_id)?.state)).toEqual([
      "submitting",
      "submitting",
      "submitting",
    ]);
    expect(harness.provider.maximum_active_count).toBe(3);
    expect(jobs.some((job) => harness.jobs.get(job.job_id)?.state === "completed")).toBe(false);
  });

  it("reuses the root anchor across recursion and binds only the final assistant", async () => {
    const harness = await create_harness(true);
    harness.host.emit_generation({ phase: "started", generation_type: "normal", dry_run: false });
    const root_anchor = harness.sessions.current.generation_anchor;
    await harness.host.invoke_tool(tool_arguments(harness));
    const [job] = await harness.router.wait_for_jobs(1);
    if (job === undefined) {
      throw new Error("Expected one image job");
    }
    await wait_for_provider_starts(harness.provider, 1);

    finish_message(harness, 8, "system");
    harness.host.emit_generation({
      phase: "started",
      generation_type: "recursive",
      dry_run: false,
    });
    expect(harness.sessions.current.generation_anchor).toBe(root_anchor);

    harness.provider.complete(job.job_id);
    await wait_for_state(harness.jobs, job.job_id, "completed");
    finish_message(harness, 9);

    await wait_for_state(harness.jobs, job.job_id, "attached");
    expect(tavern_metadata(harness, 8)).toBeUndefined();
    const attached_job = harness.jobs.get(job.job_id);
    expect(tavern_metadata(harness, 9)).toMatchObject({
      generation_anchor: root_anchor,
      image_ids: attached_job?.image_ids,
    });
  });

  it("parses every fallback byte split once and removes controls from saved text", async () => {
    const template = await create_harness(false);
    template.host.emit_generation({
      phase: "started",
      generation_type: "normal",
      dry_run: false,
    });
    const comment = `<!-- tavern-canvas:image ${JSON.stringify(tool_arguments(template))} -->`;
    const message = `Before ${comment} after`;
    await template.trigger.stop();
    await template.binding.stop();

    let passed_splits = 0;
    for (let split = 0; split <= message.length; split += 1) {
      const harness = await create_harness(false);
      harness.host.emit_generation({
        phase: "started",
        generation_type: "normal",
        dry_run: false,
      });
      harness.host.emit_model_chunk(message.slice(0, split));
      harness.host.emit_model_chunk(message.slice(split));
      harness.host.emit_generation({ phase: "stopped" });

      const jobs = await harness.router.wait_for_jobs(1);
      expect(jobs).toHaveLength(1);
      expect(harness.host.cleaned_model_text).toBe("Before  after");
      expect(harness.host.raw_model_text).toBe(message);
      await harness.trigger.stop();
      await harness.binding.stop();
      passed_splits += 1;
    }
    expect(passed_splits).toBe(message.length + 1);
  });

  it("ignores fallback-shaped text while native tool mode is active", async () => {
    const harness = await create_harness(true);
    harness.host.emit_generation({ phase: "started", generation_type: "normal", dry_run: false });
    const comment = `<!-- tavern-canvas:image ${JSON.stringify(tool_arguments(harness))} -->`;

    harness.host.emit_model_chunk(comment);
    harness.host.emit_generation({ phase: "stopped" });
    await new Promise<void>((resolve) => queueMicrotask(resolve));

    expect(harness.router.requests).toEqual([]);
    expect(harness.host.cleaned_model_text).toBe("");
    expect(harness.host.raw_model_text).toBe(comment);
  });

  it("preserves the original chat target across an image-time chat switch", async () => {
    const harness = await create_harness(true);
    harness.host.create_chat("chat-b");
    harness.host.emit_generation({ phase: "started", generation_type: "normal", dry_run: false });
    await harness.host.invoke_tool(tool_arguments(harness));
    const [job] = await harness.router.wait_for_jobs(1);
    if (job === undefined) {
      throw new Error("Expected one image job");
    }
    await wait_for_provider_starts(harness.provider, 1);
    finish_message(harness, 9);
    harness.host.switch_chat("chat-b");

    harness.provider.complete(job.job_id);
    await wait_for_state(harness.jobs, job.job_id, "completed");
    expect(harness.host.message_updates).toEqual([]);

    harness.host.switch_chat("chat-a");
    await wait_for_state(harness.jobs, job.job_id, "attached");
    expect(tavern_metadata(harness, 9)).toBeDefined();
    expect(harness.host.message("chat-b", 9)).toBeNull();
  });

  it("waits for the exact requested swipe to become active again", async () => {
    const harness = await create_harness(true);
    harness.host.emit_generation({ phase: "started", generation_type: "normal", dry_run: false });
    await harness.host.invoke_tool(tool_arguments(harness));
    const [job] = await harness.router.wait_for_jobs(1);
    if (job === undefined) {
      throw new Error("Expected one image job");
    }
    await wait_for_provider_starts(harness.provider, 1);
    finish_message(harness, 9);
    harness.host.add_message({
      chat_id: "chat-a",
      message_id: 9,
      role: "assistant",
      content: "Alternative swipe",
      swipe_id: 1,
    });
    harness.host.switch_swipe("chat-a", 9, 1);

    harness.provider.complete(job.job_id);
    await wait_for_state(harness.jobs, job.job_id, "completed");
    expect(harness.host.message_updates).toEqual([]);

    harness.host.switch_swipe("chat-a", 9, 0);
    await wait_for_state(harness.jobs, job.job_id, "attached");
    expect(tavern_metadata(harness, 9, 0)).toBeDefined();
    expect(tavern_metadata(harness, 9, 1)).toBeUndefined();
  });

  it("marks a deleted exact target orphaned without losing its image", async () => {
    const harness = await create_harness(true);
    harness.host.emit_generation({ phase: "started", generation_type: "normal", dry_run: false });
    await harness.host.invoke_tool(tool_arguments(harness));
    const [job] = await harness.router.wait_for_jobs(1);
    if (job === undefined) {
      throw new Error("Expected one image job");
    }
    await wait_for_provider_starts(harness.provider, 1);
    finish_message(harness, 9);
    harness.host.delete_message("chat-a", 9);

    harness.provider.complete(job.job_id);
    await wait_for_state(harness.jobs, job.job_id, "orphaned");

    expect(harness.jobs.get(job.job_id)?.image_ids).toHaveLength(1);
    expect(harness.host.message_updates).toEqual([]);
  });

  it("deduplicates repeated automatic digests while retaining both request IDs", async () => {
    const harness = await create_harness(true);
    harness.host.emit_generation({ phase: "started", generation_type: "normal", dry_run: false });
    const arguments_ = tool_arguments(harness);
    const responses = await Promise.all([
      harness.host.invoke_tool(arguments_),
      harness.host.invoke_tool(arguments_),
    ]);
    const jobs = await harness.router.wait_for_jobs(2);
    await wait_for_provider_starts(harness.provider, 1);

    expect(jobs[0]?.job_id).toBe(jobs[1]?.job_id);
    expect(parse_tool_response(responses[0] ?? "{}").request_id).not.toBe(
      parse_tool_response(responses[1] ?? "{}").request_id,
    );
    finish_message(harness, 9);
    const job = jobs[0];
    if (job === undefined) {
      throw new Error("Expected one deduplicated job");
    }
    harness.provider.complete(job.job_id);
    await wait_for_state(harness.jobs, job.job_id, "attached");

    expect(tavern_metadata(harness, 9)).toMatchObject({
      request_ids: ["11111111-1111-4111-8111-000000000001", "11111111-1111-4111-8111-000000000002"],
    });
  });

  it("cancels one job without aborting or completing its sibling", async () => {
    const harness = await create_harness(true);
    harness.host.emit_generation({ phase: "started", generation_type: "normal", dry_run: false });
    await Promise.all([
      harness.host.invoke_tool(tool_arguments(harness, "First scene")),
      harness.host.invoke_tool(tool_arguments(harness, "Second scene")),
    ]);
    const jobs = await harness.router.wait_for_jobs(2);
    await wait_for_provider_starts(harness.provider, 2);
    const first = jobs[0];
    const second = jobs[1];
    if (first === undefined || second === undefined) {
      throw new Error("Expected sibling jobs");
    }

    await harness.jobs.cancel(first.job_id);
    await wait_for_state(harness.jobs, first.job_id, "cancelled");

    expect(harness.provider.starts[0]?.signal.aborted).toBe(true);
    expect(harness.provider.starts[1]?.signal.aborted).toBe(false);
    expect(harness.jobs.get(second.job_id)?.state).toBe("submitting");

    harness.provider.complete(second.job_id);
    await wait_for_state(harness.jobs, second.job_id, "completed");
    expect(harness.jobs.get(first.job_id)?.state).toBe("cancelled");
  });
});
