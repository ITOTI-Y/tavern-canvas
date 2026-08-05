import type {
  GenerationState,
  ImageId,
  RequestId,
  TavernCanvasMessageMetadata,
} from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import type { GenerationJobSnapshot } from "../jobs/generation_job.js";
import type {
  ChatChangeHandler,
  FinalAssistantHandler,
  FinalAssistantMessageEvent,
  MessageAttachmentUpdate,
  MessageBindingJobPort,
  MessagePort,
  MessageTarget,
  MessageTargetQuery,
  SwipeChangeHandler,
} from "./message_binding.js";
import { MessageBinder } from "./message_binder.js";

const GENERATION_ANCHOR = "a".repeat(64);
const SOURCE_ANCHOR = "b".repeat(64);

function request_id(index: number): RequestId {
  return `11111111-1111-4111-8111-${String(index).padStart(12, "0")}`;
}

function image_id(index: number): ImageId {
  return `33333333-3333-4333-8333-${String(index).padStart(12, "0")}`;
}

function completed_job(overrides: Partial<GenerationJobSnapshot> = {}): GenerationJobSnapshot {
  return {
    job_id: "22222222-2222-4222-8222-222222222222",
    request_id: request_id(1),
    request_digest: "c".repeat(64),
    generation_anchor: GENERATION_ANCHOR,
    source_anchor: SOURCE_ANCHOR,
    chat_id: "chat-a",
    requested_swipe_id: 0,
    provider_id: "sd_webui",
    arguments: {
      generation_anchor: GENERATION_ANCHOR,
      scene_description: "A rainy alley",
    },
    state: "completed",
    created_at: "2026-08-05T00:00:00.000Z",
    updated_at: "2026-08-05T00:00:01.000Z",
    error: null,
    image_ids: [image_id(1)],
    ...overrides,
  };
}

function final_event(
  overrides: Partial<FinalAssistantMessageEvent> = {},
): FinalAssistantMessageEvent {
  return {
    chat_id: "chat-a",
    message_id: 9,
    swipe_id: 0,
    role: "assistant",
    is_final: true,
    generation_anchor: GENERATION_ANCHOR,
    source_anchor: SOURCE_ANCHOR,
    request_ids: [request_id(1), request_id(2)],
    ...overrides,
  };
}

class FakeJobPort implements MessageBindingJobPort {
  readonly jobs = new Map<string, GenerationJobSnapshot>();
  readonly listeners = new Set<(job: GenerationJobSnapshot) => void>();
  readonly transitions: { job_id: string; state: "attached" | "orphaned" }[] = [];

  get(job_id: string): GenerationJobSnapshot | null {
    return this.jobs.get(job_id) ?? null;
  }

  subscribe(listener: (job: GenerationJobSnapshot) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  mark_attached(job_id: string): Promise<GenerationJobSnapshot> {
    return this.#transition(job_id, "attached");
  }

  mark_orphaned(job_id: string): Promise<GenerationJobSnapshot> {
    return this.#transition(job_id, "orphaned");
  }

  emit(job: GenerationJobSnapshot): void {
    this.jobs.set(job.job_id, job);
    for (const listener of this.listeners) {
      listener(job);
    }
  }

  async #transition(
    job_id: string,
    state: "attached" | "orphaned",
  ): Promise<GenerationJobSnapshot> {
    const current = this.jobs.get(job_id);
    if (current === undefined) {
      throw new Error(`Missing job ${job_id}`);
    }
    const updated = { ...current, state } satisfies GenerationJobSnapshot;
    this.transitions.push({ job_id, state });
    this.emit(updated);
    return updated;
  }
}

class FakeMessagePort implements MessagePort {
  readonly final_handlers = new Set<FinalAssistantHandler>();
  readonly chat_handlers = new Set<ChatChangeHandler>();
  readonly swipe_handlers = new Set<SwipeChangeHandler>();
  readonly find_queries: MessageTargetQuery[] = [];
  readonly updates: MessageAttachmentUpdate[] = [];
  target: MessageTarget | null = {
    chat_id: "chat-a",
    message_id: 9,
    swipe_id: 0,
    generation_anchor: GENERATION_ANCHOR,
    metadata: null,
    media: [],
  };
  update_failures = 0;

  find_target(query: MessageTargetQuery): Promise<MessageTarget | null> {
    this.find_queries.push(query);
    if (
      this.target === null ||
      this.target.chat_id !== query.chat_id ||
      this.target.message_id !== query.message_id ||
      this.target.swipe_id !== query.swipe_id ||
      this.target.generation_anchor !== query.generation_anchor
    ) {
      return Promise.resolve(null);
    }
    return Promise.resolve(this.target);
  }

  update_target(request: MessageAttachmentUpdate): Promise<void> {
    this.updates.push(request);
    if (this.update_failures > 0) {
      this.update_failures -= 1;
      return Promise.reject(new Error("host update failed"));
    }
    this.target = {
      chat_id: request.chat_id,
      message_id: request.message_id,
      swipe_id: request.swipe_id,
      generation_anchor: request.metadata.generation_anchor,
      metadata: request.metadata,
      media: request.media,
    };
    return Promise.resolve();
  }

  subscribe_final_assistant(handler: FinalAssistantHandler): () => void {
    this.final_handlers.add(handler);
    return () => this.final_handlers.delete(handler);
  }

  subscribe_chat_change(handler: ChatChangeHandler): () => void {
    this.chat_handlers.add(handler);
    return () => this.chat_handlers.delete(handler);
  }

  subscribe_swipe_change(handler: SwipeChangeHandler): () => void {
    this.swipe_handlers.add(handler);
    return () => this.swipe_handlers.delete(handler);
  }

  emit_final(event: FinalAssistantMessageEvent): void {
    for (const handler of this.final_handlers) {
      handler(event);
    }
  }

  emit_chat(chat_id: string): void {
    for (const handler of this.chat_handlers) {
      handler({ chat_id });
    }
  }

  emit_swipe(message_id: number, swipe_id: number, chat_id = "chat-a"): void {
    for (const handler of this.swipe_handlers) {
      handler({ chat_id, message_id, swipe_id });
    }
  }
}

function create_fixture() {
  const jobs = new FakeJobPort();
  const messages = new FakeMessagePort();
  const binder = new MessageBinder(jobs, messages);
  binder.start();
  return { binder, jobs, messages };
}

async function wait_for_updates(messages: FakeMessagePort, count: number): Promise<void> {
  await vi.waitFor(() => expect(messages.updates).toHaveLength(count));
}

async function wait_for_job_state(
  jobs: FakeJobPort,
  job_id: string,
  state: GenerationState,
): Promise<void> {
  await vi.waitFor(() => expect(jobs.get(job_id)?.state).toBe(state));
}

describe("MessageBinder", () => {
  it.each([
    ["tool", true],
    ["system", true],
    ["assistant", false],
  ] as const)("ignores %s messages with final=%s", async (role, is_final) => {
    const { jobs, messages } = create_fixture();
    messages.emit_final(final_event({ role, is_final }));
    const job = completed_job();
    jobs.emit(job);

    await new Promise<void>((resolve) => queueMicrotask(resolve));
    expect(messages.find_queries).toEqual([]);
    expect(messages.updates).toEqual([]);
    expect(jobs.get(job.job_id)?.state).toBe("completed");
  });

  it("binds the final assistant swipe with all session request IDs", async () => {
    const { jobs, messages } = create_fixture();
    messages.emit_final(final_event());
    const job = completed_job();
    jobs.emit(job);

    await wait_for_updates(messages, 1);
    await wait_for_job_state(jobs, job.job_id, "attached");
    expect(messages.updates[0]).toEqual({
      chat_id: "chat-a",
      message_id: 9,
      swipe_id: 0,
      metadata: {
        schema_version: 1,
        generation_anchor: GENERATION_ANCHOR,
        source_anchor: SOURCE_ANCHOR,
        request_ids: [request_id(1), request_id(2)],
        image_ids: [image_id(1)],
      },
      media: [{ image_id: image_id(1) }],
    });
  });

  it("waits for final text when image completion arrives first", async () => {
    const { jobs, messages } = create_fixture();
    const job = completed_job();
    jobs.emit(job);
    await new Promise<void>((resolve) => queueMicrotask(resolve));
    expect(messages.updates).toEqual([]);

    messages.emit_final(final_event());

    await wait_for_job_state(jobs, job.job_id, "attached");
    expect(messages.updates).toHaveLength(1);
  });

  it("waits for image completion when final text arrives first", async () => {
    const { jobs, messages } = create_fixture();
    messages.emit_final(final_event());
    await new Promise<void>((resolve) => queueMicrotask(resolve));
    expect(messages.updates).toEqual([]);

    const job = completed_job();
    jobs.emit(job);

    await wait_for_job_state(jobs, job.job_id, "attached");
    expect(messages.updates).toHaveLength(1);
  });

  it("does not redirect completion after switching chats", async () => {
    const { jobs, messages } = create_fixture();
    messages.emit_final(final_event());
    messages.emit_chat("chat-b");
    const job = completed_job();
    jobs.emit(job);
    await new Promise<void>((resolve) => queueMicrotask(resolve));

    expect(messages.find_queries).toEqual([]);
    expect(messages.updates).toEqual([]);

    messages.emit_chat("chat-a");
    await wait_for_job_state(jobs, job.job_id, "attached");
    expect(messages.find_queries).toEqual([
      {
        chat_id: "chat-a",
        message_id: 9,
        swipe_id: 0,
        generation_anchor: GENERATION_ANCHOR,
      },
    ]);
  });

  it("waits while a nonmatching swipe is active and resumes on the exact swipe", async () => {
    const { jobs, messages } = create_fixture();
    messages.emit_final(final_event());
    messages.emit_swipe(9, 1);
    const job = completed_job();
    jobs.emit(job);
    await new Promise<void>((resolve) => queueMicrotask(resolve));
    expect(messages.updates).toEqual([]);

    messages.emit_swipe(9, 0);

    await wait_for_job_state(jobs, job.job_id, "attached");
    expect(messages.updates[0]?.swipe_id).toBe(0);
  });

  it("marks a completed job orphaned when its exact target was deleted", async () => {
    const { jobs, messages } = create_fixture();
    messages.emit_final(final_event());
    messages.target = null;
    const job = completed_job();
    jobs.emit(job);

    await wait_for_job_state(jobs, job.job_id, "orphaned");
    expect(messages.updates).toEqual([]);
    expect(jobs.transitions).toEqual([{ job_id: job.job_id, state: "orphaned" }]);
  });

  it("merges media and metadata idempotently across duplicate completion events", async () => {
    const { jobs, messages } = create_fixture();
    const existing_metadata: TavernCanvasMessageMetadata = {
      schema_version: 1,
      generation_anchor: GENERATION_ANCHOR,
      source_anchor: SOURCE_ANCHOR,
      request_ids: [request_id(1)],
      image_ids: [image_id(1)],
    };
    messages.target = {
      chat_id: "chat-a",
      message_id: 9,
      swipe_id: 0,
      generation_anchor: GENERATION_ANCHOR,
      metadata: existing_metadata,
      media: [{ image_id: image_id(1), path: "/existing.png" }],
    };
    messages.emit_final(final_event());
    const job = completed_job();
    jobs.emit(job);
    jobs.emit(job);

    await wait_for_job_state(jobs, job.job_id, "attached");
    expect(messages.updates).toHaveLength(1);
    expect(messages.updates[0]?.metadata.image_ids).toEqual([image_id(1)]);
    expect(messages.updates[0]?.media).toEqual([{ image_id: image_id(1), path: "/existing.png" }]);
  });

  it("keeps completion retryable after host update failure and never falls back", async () => {
    const { jobs, messages } = create_fixture();
    messages.update_failures = 1;
    messages.emit_final(final_event());
    const job = completed_job();
    jobs.emit(job);

    await wait_for_updates(messages, 1);
    expect(jobs.get(job.job_id)?.state).toBe("completed");

    messages.emit_chat("chat-a");

    await wait_for_updates(messages, 2);
    await wait_for_job_state(jobs, job.job_id, "attached");
    expect(messages.find_queries).toEqual([
      {
        chat_id: "chat-a",
        message_id: 9,
        swipe_id: 0,
        generation_anchor: GENERATION_ANCHOR,
      },
      {
        chat_id: "chat-a",
        message_id: 9,
        swipe_id: 0,
        generation_anchor: GENERATION_ANCHOR,
      },
    ]);
  });

  it("unsubscribes all event sources idempotently", () => {
    const { binder, messages } = create_fixture();

    binder.stop();
    binder.stop();

    expect(messages.final_handlers.size).toBe(0);
    expect(messages.chat_handlers.size).toBe(0);
    expect(messages.swipe_handlers.size).toBe(0);
  });
});
