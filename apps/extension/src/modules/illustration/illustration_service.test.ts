import type { GenerationJobSnapshot } from "@tavern-canvas/core";
import {
  RequestIdSchema,
  type IllustrationSettings,
  type ImageGenerationRequest,
} from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";
import { reactive } from "vue";

import type {
  HostAdapter,
  HostGenerationHandler,
  HostSwipeLocation,
  HostWorldbookEntry,
  PresetGenerationRequest,
} from "../../host/index.js";
import { WardrobeService } from "../wardrobe/wardrobe_service.js";
import {
  IllustrationService,
  MessageChangedError,
  create_wardrobe_runner,
} from "./illustration_service.js";

const REPLY = "She opened the door.\n\nRain fell outside.";
const IMAGE_ID = "01906f4e-5f1c-7a2a-8d73-cc3a51abf1ed";
const REQUEST_ID = RequestIdSchema.parse("550e8400-e29b-41d4-a716-446655440000");

const SETTINGS: IllustrationSettings = {
  preset_name: "in_use",
  connection: { kind: "current" },
  max_chat_history: 4,
  max_images_per_message: 2,
  prompt_preset_id: null,
  world_info: { mode: "chat" },
  wardrobe_model: null,
  analysis_guidance: "",
  wardrobe_guidance: "",
};

class MemoryHost {
  chat_id = "chat-1";
  text = REPLY;
  readonly records = new Map<string, unknown>();
  readonly wardrobes = new Map<string, unknown>();
  readonly generation_handlers = new Set<HostGenerationHandler>();
  readonly generate_calls: PresetGenerationRequest[] = [];
  readonly worldbooks = new Map<string, readonly HostWorldbookEntry[]>();
  analysis_reply = JSON.stringify({
    illustrations: [{ paragraph: 1, scene: "rain", tags: "rain, window", characters: [] }],
  });
  edit_before_replace = false;
  failures_before_reply = 0;

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
    read_swipe_wardrobe: (location: HostSwipeLocation) =>
      this.wardrobes.get(this.#key(location)) ?? null,
    write_swipe_wardrobe: (location: HostSwipeLocation, record: unknown) => {
      this.wardrobes.set(this.#key(location), structuredClone(record));
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
      if (this.failures_before_reply > 0) {
        this.failures_before_reply -= 1;
        return Promise.reject(new Error("upstream 502"));
      }
      return Promise.resolve({ content: this.analysis_reply, reasoning: null });
    },
    list_worldbooks: () => [...this.worldbooks.keys()],
    read_worldbook: (name: string) => Promise.resolve(this.worldbooks.get(name) ?? []),
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

function create_service(
  host: MemoryHost,
  options: { auto?: boolean; settings?: IllustrationSettings } = {},
) {
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
  let slot_sequence = 0;
  const service = new IllustrationService({
    host: host.adapter,
    settings: () => options.settings ?? SETTINGS,
    auto_generation_enabled: () => options.auto ?? false,
    prompt_context: () =>
      Promise.resolve({ preset: null, library: { characters: [], outfits: [], loras: [] } }),
    wardrobe: new WardrobeService({
      host: host.adapter,
      library: {
        load: () => Promise.resolve({ characters: [], outfits: [] }),
        create_character: () => Promise.resolve(),
        create_outfit: () => Promise.resolve(),
        add_appearance: () => Promise.resolve(),
      },
      run: () => Promise.resolve(JSON.stringify({ characters: [] })),
      new_id: () => "id-1",
    }),
    build_request: (input) =>
      Promise.resolve({ prompt: input.positive_prompt } as unknown as ImageGenerationRequest),
    build_edit_request: (edit) =>
      Promise.resolve({ prompt: edit.kind } as unknown as ImageGenerationRequest),
    edits_available: () => true,
    resolve_analysis_key: () => Promise.resolve("analysis-key"),
    submit,
    jobs,
    new_slot_id: () => `slot_${String((slot_sequence += 1)).padStart(4, "0")}`,
    new_generation_id: () => "generation-1",
    wait: () => Promise.resolve(),
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
  it("retries a failed analysis request before recording the slots", async () => {
    const host = new MemoryHost();
    host.failures_before_reply = 2;
    const { service } = create_service(host);

    const record = await service.analyze(3);

    expect(host.generate_calls).toHaveLength(3);
    expect(record.slots).toMatchObject([{ paragraph: 1, scene: "rain" }]);
  });

  it("reports the failure once every attempt failed", async () => {
    const host = new MemoryHost();
    host.failures_before_reply = 3;
    const { service } = create_service(host);

    await expect(service.analyze(3)).rejects.toThrow("upstream 502");
    expect(host.generate_calls).toHaveLength(3);
    expect(service.read(LOCATION)).toBeNull();
  });

  it("records the chosen slots and writes a marker after the paragraph", async () => {
    const host = new MemoryHost();
    const { service } = create_service(host);

    const record = await service.analyze(3);

    expect(record.slots).toMatchObject([
      { slot_id: "slot_0001", paragraph: 1, scene: "rain", positive_prompt: "rain, window" },
    ]);
    expect(host.text).toBe(`${REPLY}\n<!--tc-image:slot_0001-->`);
    expect(service.read(LOCATION)).toEqual(record);
    expect(host.generate_calls[0]).toMatchObject({
      preset_name: "in_use",
      max_chat_history: 4,
      world_info: { kind: "chat" },
    });
  });

  it("replaces the chat's world info with the entries one book activates for this reply", async () => {
    const host = new MemoryHost();
    host.worldbooks.set("Town", [
      {
        enabled: true,
        strategy: "selective" as const,
        keys: ["door"],
        secondary_logic: "and_any" as const,
        secondary_keys: [],
        order: 1,
        content: "Doors in the old town are painted blue.",
      },
      {
        enabled: true,
        strategy: "selective",
        keys: ["dragon"],
        secondary_logic: "and_any",
        secondary_keys: [],
        order: 0,
        content: "Dragons sleep under the hill.",
      },
    ]);
    const { service } = create_service(host, {
      settings: { ...SETTINGS, world_info: { mode: "worldbook", worldbook: "Town" } },
    });

    await service.analyze(3);

    expect(host.generate_calls[0]?.world_info).toEqual({
      kind: "replace",
      text: "Doors in the old town are painted blue.",
    });
  });

  it("returns an analyzed swipe without asking the model again", async () => {
    const host = new MemoryHost();
    const { service } = create_service(host);

    await service.analyze(3);
    await service.analyze(3);

    expect(host.generate_calls).toHaveLength(1);
  });

  it("sends a custom API connection with the stored key", async () => {
    const host = new MemoryHost();
    const { service } = create_service(host, {
      settings: {
        ...SETTINGS,
        connection: { kind: "custom", api_url: "https://llm.example/v1", model: "m" },
      },
    });

    await service.analyze(3);

    expect(host.generate_calls[0]?.connection).toEqual({
      kind: "custom",
      api_url: "https://llm.example/v1",
      api_key: "analysis-key",
      model: "m",
      source: "openai",
    });
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
  it("stores edited character prompts even when the caller passes reactive objects", async () => {
    const host = new MemoryHost();
    const { service } = create_service(host);
    await service.analyze(3);

    await service.generate(LOCATION, "slot_0001", {
      positive_prompt: "1girl, rain",
      negative_prompt: "",
      character_prompts: reactive([{ name: "Alice", prompt: "girl, smile", negative_prompt: "" }]),
    });

    expect(service.read(LOCATION)?.slots[0]?.character_prompts).toEqual([
      { name: "Alice", prompt: "girl, smile", negative_prompt: "" },
    ]);
  });

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

describe("IllustrationService.generate_image", () => {
  it("submits one request outside any slot and resolves with the finished image", async () => {
    const host = new MemoryHost();
    const { service, submit, jobs, finish } = create_service(host);

    const image = service.generate_image({
      positive_prompt: "1girl, solo, full body",
      negative_prompt: "",
      character_prompts: [],
    });
    await vi.waitFor(() => expect(submit).toHaveBeenCalledOnce());
    await Promise.resolve();
    finish("completed");

    await expect(image).resolves.toBe(IMAGE_ID);
    expect(jobs.mark_attached).toHaveBeenCalledWith("job-1");
  });

  it("rejects with the job's error code when generation fails", async () => {
    const host = new MemoryHost();
    const { service, submit, finish } = create_service(host);

    const image = service.generate_image({
      positive_prompt: "1girl",
      negative_prompt: "",
      character_prompts: [],
    });
    await vi.waitFor(() => expect(submit).toHaveBeenCalledOnce());
    await Promise.resolve();
    finish("failed");

    await expect(image).rejects.toThrow("rate_limited");
  });
});

describe("IllustrationService.read_outfit", () => {
  it("sends the image with the outfit schema and returns the clothing it reads", async () => {
    const host = new MemoryHost();
    host.analysis_reply = JSON.stringify({
      name: "Black sundress",
      slots: { full_body: ["black sundress"], footwear: ["sandals"], headwear: ["unknown"] },
    });
    const { service } = create_service(host);

    const outfit = await service.read_outfit("data:image/jpeg;base64,AAAA");

    expect(host.generate_calls[0]).toMatchObject({
      image: "data:image/jpeg;base64,AAAA",
      max_chat_history: 0,
      json_schema: { name: "tavern_canvas_outfit" },
    });
    expect(outfit).toEqual({
      name: "Black sundress",
      slots: { full_body: ["black sundress"], footwear: ["sandals"] },
    });
  });

  it("fails when the model reads no clothing", async () => {
    const host = new MemoryHost();
    host.analysis_reply = JSON.stringify({ name: "Nothing", slots: {} });
    const { service } = create_service(host);

    await expect(service.read_outfit("data:image/jpeg;base64,AAAA")).rejects.toThrow(
      "no outfit with clothing tags",
    );
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

  it("drops the records a new swipe copied from the previous one before analyzing it", async () => {
    const host = new MemoryHost();
    const { service } = create_service(host, { auto: true });
    const copied = { schema_version: 2, slots: [] };
    await host.adapter.write_swipe_record(LOCATION, copied);
    await host.adapter.write_swipe_wardrobe(LOCATION, { schema_version: 1, wearing: [] });

    host.emit(
      { phase: "started", generation_type: "swipe", dry_run: false },
      { phase: "ended", message_id: 3 },
    );

    await vi.waitFor(() => expect(service.read(LOCATION)?.slots).toHaveLength(1));
    expect(host.generate_calls).toHaveLength(1);
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

describe("create_wardrobe_runner", () => {
  it("appends the wardrobe guidance and leaves out the illustration guidance", async () => {
    const requests: PresetGenerationRequest[] = [];
    const host = {
      generate_with_preset: (request: PresetGenerationRequest) => {
        requests.push(request);
        return Promise.resolve({ content: "{}", reasoning: null });
      },
    } as unknown as HostAdapter;
    const run = create_wardrobe_runner({
      host,
      settings: () => ({
        ...SETTINGS,
        analysis_guidance: "watercolor",
        wardrobe_guidance: "summer clothing",
      }),
      resolve_analysis_key: () => Promise.resolve(""),
      new_generation_id: () => "g1",
    });

    await run("[Inkwell wardrobe update]", { name: "tavern_canvas_wardrobe", value: {} });

    expect(requests[0]?.user_input).toMatch(
      /^\[Inkwell wardrobe update\]\n\nUser guidance[^\n]*\nsummer clothing$/u,
    );
    expect(requests[0]?.user_input).not.toContain("watercolor");
  });
});

describe("IllustrationService.add_paragraphs", () => {
  it("adds slots for the chosen paragraphs, keeping one the model left out", async () => {
    const host = new MemoryHost();
    host.analysis_reply = JSON.stringify({
      illustrations: [{ paragraph: 0, scene: "door", tags: "door", characters: [] }],
    });
    const { service } = create_service(host);

    expect((await service.open_paragraphs(LOCATION)).map((paragraph) => paragraph.index)).toEqual([
      0, 1,
    ]);
    const slots = await service.add_paragraphs(LOCATION, [1, 0]);

    expect(slots).toMatchObject([
      { paragraph: 0, scene: "door", positive_prompt: "door" },
      { paragraph: 1, scene: "Rain fell outside.", positive_prompt: "" },
    ]);
    expect(host.generate_calls[0]?.user_input).toContain(
      "Illustrate exactly these paragraphs, one entry each: [0], [1].",
    );
    expect(host.text).toBe(
      "She opened the door.\n<!--tc-image:slot_0001-->\n\nRain fell outside.\n<!--tc-image:slot_0002-->",
    );
    expect(service.read(LOCATION)?.slots).toHaveLength(2);
    expect(await service.open_paragraphs(LOCATION)).toEqual([]);
  });
});
