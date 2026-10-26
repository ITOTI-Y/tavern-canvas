import type { GenerationJobSnapshot } from "@tavern-canvas/core";
import {
  RequestIdSchema,
  type IllustrationSettings,
  type ImageGenerationRequest,
} from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import type {
  HostAdapter,
  HostGenerationHandler,
  HostSwipeLocation,
  PresetGenerationRequest,
} from "../../host/index.js";
import { IllustrationService, MessageChangedError } from "./illustration_service.js";

const REPLY = "She opened the door.\n\nRain fell outside.";
const IMAGE_ID = "01906f4e-5f1c-7a2a-8d73-cc3a51abf1ed";
const REQUEST_ID = RequestIdSchema.parse("550e8400-e29b-41d4-a716-446655440000");

const SETTINGS: IllustrationSettings = {
  preset_name: "in_use",
  connection: { kind: "current" },
  max_chat_history: 4,
  max_images_per_message: 2,
  prompt_preset_id: null,
};

class MemoryHost {
  chat_id = "chat-1";
  text = REPLY;
  readonly records = new Map<string, unknown>();
  readonly generation_handlers = new Set<HostGenerationHandler>();
  readonly generate_calls: PresetGenerationRequest[] = [];
  analysis_reply = JSON.stringify({
    illustrations: [{ paragraph: 1, scene: "rain", tags: "rain, window", characters: [] }],
  });
  edit_before_replace = false;

  readonly adapter = {
    capabilities: {},
    get_locale: () => "en",
    get_active_chat_id: () => this.chat_id,
    get_active_chat: () =>
      Promise.resolve({
        chat_id: this.chat_id,
        messages: [
          {
            message_id: 3,
            name: "Alice",
            role: "assistant" as const,
            is_hidden: false,
            active_swipe_id: 0,
            swipes: [{ swipe_id: 0, content: this.text }],
          },
        ],
      }),
    subscribe_generation: (handler: HostGenerationHandler) => {
      this.generation_handlers.add(handler);
      return () => this.generation_handlers.delete(handler);
    },
    subscribe_chat_change: () => () => undefined,
    subscribe_message_rendered: () => () => undefined,
    subscribe_message_released: () => () => undefined,
    subscribe_chat_rendered: () => () => undefined,
    find_message_element: () => null,
    read_swipe_record: (location: HostSwipeLocation) =>
      location.chat_id === this.chat_id ? (this.records.get(this.#key(location)) ?? null) : null,
    write_swipe_record: (location: HostSwipeLocation, record: unknown) => {
      if (location.chat_id !== this.chat_id) {
        return Promise.reject(new Error("not available"));
      }
      this.records.set(this.#key(location), structuredClone(record));
      return Promise.resolve();
    },
    replace_message_text: (_message_id: number, expected: string, next: string) => {
      if (this.edit_before_replace) {
        this.text = "edited by the user";
      }
      if (this.text !== expected) {
        return Promise.resolve(false);
      }
      this.text = next;
      return Promise.resolve(true);
    },
    generate_with_preset: (request: PresetGenerationRequest) => {
      this.generate_calls.push(request);
      return Promise.resolve({ content: this.analysis_reply, reasoning: null });
    },
    stop_generation: () => undefined,
    sync_regex_scripts: () => Promise.resolve(false),
    translate_deepl: () => Promise.reject(new Error("not used")),
  } satisfies HostAdapter;

  #key(location: HostSwipeLocation): string {
    return `${String(location.message_id)}:${String(location.swipe_id)}`;
  }

  emit(...events: Parameters<HostGenerationHandler>[0][]): void {
    for (const event of events) {
      for (const handler of this.generation_handlers) {
        handler(event);
      }
    }
  }
}

function create_service(host: MemoryHost, options: { auto?: boolean } = {}) {
  const job_listeners = new Set<(job: GenerationJobSnapshot) => void>();
  const jobs = {
    subscribe: (listener: (job: GenerationJobSnapshot) => void) => {
      job_listeners.add(listener);
      return () => job_listeners.delete(listener);
    },
    mark_attached: vi.fn(() => Promise.resolve()),
    mark_orphaned: vi.fn(() => Promise.resolve()),
  };
  const submit = vi.fn(() => Promise.resolve(REQUEST_ID));
  const service = new IllustrationService({
    host: host.adapter,
    settings: () => SETTINGS,
    auto_generation_enabled: () => options.auto ?? false,
    prompt_context: () => Promise.resolve({ preset: null, appearances: [] }),
    build_request: (input) =>
      Promise.resolve({ prompt: input.positive_prompt } as unknown as ImageGenerationRequest),
    build_edit_request: (edit) =>
      Promise.resolve({ prompt: edit.kind } as unknown as ImageGenerationRequest),
    edits_available: () => true,
    submit,
    jobs,
    new_slot_id: () => "slot_0001",
    new_generation_id: () => "generation-1",
  });
  service.start();
  return {
    service,
    jobs,
    submit,
    finish(state: GenerationJobSnapshot["state"]) {
      const job = {
        job_id: "job-1",
        request_id: REQUEST_ID,
        state,
        image_ids: state === "completed" ? [IMAGE_ID] : [],
        error: state === "failed" ? { code: "rate_limited", retryable: true } : null,
      } as unknown as GenerationJobSnapshot;
      for (const listener of job_listeners) {
        listener(job);
      }
    },
  };
}

const LOCATION = { chat_id: "chat-1", message_id: 3, swipe_id: 0 };

describe("IllustrationService.analyze", () => {
  it("records the chosen slots and writes a marker after the paragraph", async () => {
    const host = new MemoryHost();
    const { service } = create_service(host);

    const record = await service.analyze(3);

    expect(record.slots).toMatchObject([
      { slot_id: "slot_0001", paragraph: 1, scene: "rain", positive_prompt: "rain, window" },
    ]);
    expect(host.text).toBe(`${REPLY}\n<!--tc-image:slot_0001-->`);
    expect(service.read(LOCATION)).toEqual(record);
    expect(host.generate_calls[0]).toMatchObject({ preset_name: "in_use", max_chat_history: 4 });
  });

  it("returns an analyzed swipe without asking the model again", async () => {
    const host = new MemoryHost();
    const { service } = create_service(host);

    await service.analyze(3);
    await service.analyze(3);

    expect(host.generate_calls).toHaveLength(1);
  });

  it("drops the record when the user edited the reply during analysis", async () => {
    const host = new MemoryHost();
    host.edit_before_replace = true;
    const { service } = create_service(host);

    await expect(service.analyze(3)).rejects.toThrow(MessageChangedError);
    expect(service.read(LOCATION)).toBeNull();
  });
});

describe("IllustrationService image jobs", () => {
  it("adds a finished image to its slot and marks the job attached", async () => {
    const host = new MemoryHost();
    const { service, jobs, finish } = create_service(host);
    await service.analyze(3);

    await service.generate(LOCATION, "slot_0001");
    expect(service.read(LOCATION)?.slots[0]?.pending_request_ids).toEqual([REQUEST_ID]);
    expect(service.source_of(REQUEST_ID)).toEqual(LOCATION);
    finish("completed");

    await vi.waitFor(() => expect(jobs.mark_attached).toHaveBeenCalledWith("job-1"));
    expect(service.read(LOCATION)?.slots[0]).toMatchObject({
      image_ids: [IMAGE_ID],
      active_image_id: IMAGE_ID,
      pending_request_ids: [],
    });
  });

  it("keeps a failed job's error code on the slot", async () => {
    const host = new MemoryHost();
    const { service, finish } = create_service(host);
    await service.analyze(3);
    await service.generate(LOCATION, "slot_0001");

    finish("failed");

    await vi.waitFor(() =>
      expect(service.read(LOCATION)?.slots[0]?.last_error).toBe("rate_limited"),
    );
  });

  it("orphans the job when its chat is no longer active", async () => {
    const host = new MemoryHost();
    const { service, jobs, finish } = create_service(host);
    await service.analyze(3);
    await service.generate(LOCATION, "slot_0001");

    host.chat_id = "chat-2";
    finish("completed");

    await vi.waitFor(() => expect(jobs.mark_orphaned).toHaveBeenCalledWith("job-1"));
  });
});

describe("IllustrationService quick edits", () => {
  it("queues an edit of the slot's image and adds the result to the same slot", async () => {
    const host = new MemoryHost();
    const { service, submit, finish } = create_service(host);
    await service.analyze(3);

    await service.edit(LOCATION, "slot_0001", { kind: "upscale", image_id: IMAGE_ID });
    expect(submit).toHaveBeenCalledWith({ prompt: "upscale" });
    finish("completed");

    await vi.waitFor(() => expect(service.read(LOCATION)?.slots[0]?.image_ids).toEqual([IMAGE_ID]));
  });
});

describe("IllustrationService automatic generation", () => {
  it("analyzes and generates after a normal reply when enabled", async () => {
    const host = new MemoryHost();
    const { submit } = create_service(host, { auto: true });

    host.emit(
      { phase: "started", generation_type: "normal", dry_run: false },
      { phase: "ended", message_id: 3 },
    );

    await vi.waitFor(() => expect(submit).toHaveBeenCalledOnce());
  });

  it("ignores quiet generations, including its own analysis call", async () => {
    const host = new MemoryHost();
    create_service(host, { auto: true });

    host.emit(
      { phase: "started", generation_type: "quiet", dry_run: false },
      { phase: "ended", message_id: 3 },
    );
    await Promise.resolve();

    expect(host.generate_calls).toHaveLength(0);
  });
});
