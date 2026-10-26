import {
  SwipeIllustrationsSchema,
  type AnalysisConnection,
  type IllustrationSettings,
  type IllustrationSlot,
  type ImageGenerationRequest,
  type RequestId,
  type SwipeIllustrations,
  type SlotCharacterPrompt,
} from "@tavern-canvas/contracts";
import type { GenerationJobSnapshot } from "@tavern-canvas/core";

import type {
  HostAdapter,
  HostGenerationConnection,
  HostGenerationEvent,
  HostSwipeLocation,
} from "../../host/index.js";
import {
  ANALYSIS_JSON_SCHEMA,
  AnalysisParseError,
  build_analysis_input,
  parse_analysis_output,
} from "./analysis.js";
import type { SlotEdit } from "./slot_edits.js";
import { insert_markers, split_paragraphs } from "./slot_markers.js";
import { assemble_slot_prompt, type SlotPromptPreset } from "./slot_prompt.js";
import { attach_character_prompts } from "./character_prompts.js";
import { match_library, type SlotLibrary } from "./library_match.js";

export interface SlotPromptContext {
  readonly preset: SlotPromptPreset | null;
  readonly library: SlotLibrary;
}

export interface SlotGenerationInput {
  readonly positive_prompt: string;
  readonly negative_prompt: string;
  readonly character_prompts: readonly SlotCharacterPrompt[];
}

export interface IllustrationJobPort {
  subscribe(listener: (job: GenerationJobSnapshot) => void): () => void;
  mark_attached(job_id: string): Promise<unknown>;
  mark_orphaned(job_id: string): Promise<unknown>;
}

export interface IllustrationServiceDeps {
  readonly host: HostAdapter;
  readonly settings: () => IllustrationSettings;
  readonly auto_generation_enabled: () => boolean;
  readonly prompt_context: () => Promise<SlotPromptContext>;
  /** Builds the request the active provider profile would receive for these prompts. */
  readonly build_request: (input: SlotGenerationInput) => Promise<ImageGenerationRequest>;
  /** Builds a quick-edit request for the active profile; throws when its provider cannot edit. */
  readonly build_edit_request: (edit: SlotEdit) => Promise<ImageGenerationRequest>;
  /** Whether the active provider profile supports quick edits. */
  readonly edits_available: () => boolean;
  /** Reads back the custom analysis API's key; throws when none is stored or the host refuses. */
  readonly resolve_analysis_key: () => Promise<string>;
  /** Queues the request and returns its request id. */
  readonly submit: (request: ImageGenerationRequest) => Promise<RequestId>;
  readonly jobs: IllustrationJobPort;
  readonly new_slot_id: () => string;
  readonly new_generation_id: () => string;
}

export type IllustrationEvent =
  | { readonly type: "slots_changed"; readonly location: HostSwipeLocation }
  | { readonly type: "analysis_started"; readonly location: HostSwipeLocation }
  | {
      readonly type: "analysis_failed";
      readonly location: HostSwipeLocation;
      readonly message: string;
      readonly excerpt: string | null;
    };

/** The active swipe's text changed between reading it and writing the markers. */
export class MessageChangedError extends Error {
  constructor(message_id: number) {
    super(`Message ${String(message_id)} changed while it was being analyzed`);
    this.name = "MessageChangedError";
  }
}

interface PendingSlotJob {
  readonly location: HostSwipeLocation;
  readonly slot_id: string;
}

/** Generation types that produce a fresh assistant reply worth illustrating. */
const ILLUSTRATED_GENERATION_TYPES: ReadonlySet<string> = new Set([
  "normal",
  "swipe",
  "regenerate",
  "continue",
]);

async function to_host_connection(
  connection: AnalysisConnection,
  resolve_key: () => Promise<string>,
): Promise<HostGenerationConnection> {
  switch (connection.kind) {
    case "current":
      return { kind: "current" };
    case "proxy_preset":
      return {
        kind: "proxy_preset",
        proxy_preset: connection.proxy_preset,
        model: connection.model,
      };
    case "custom":
      // With `apiurl` set, JS-Slash-Runner sends the request as an OpenAI reverse proxy call.
      return {
        kind: "custom",
        api_url: connection.api_url,
        api_key: await resolve_key(),
        model: connection.model,
        source: "openai",
      };
  }
}

function error_message(error: unknown): string {
  return (error instanceof Error ? error.message : String(error)).slice(0, 500);
}

export class IllustrationService {
  readonly #deps: IllustrationServiceDeps;
  readonly #pending = new Map<string, PendingSlotJob>();
  readonly #listeners = new Set<(event: IllustrationEvent) => void>();
  readonly #analyzing = new Set<string>();
  #last_generation_type: string | null = null;
  #unsubscribes: (() => void)[] = [];

  constructor(deps: IllustrationServiceDeps) {
    this.#deps = deps;
  }

  start(): void {
    if (this.#unsubscribes.length > 0) {
      return;
    }
    this.#unsubscribes = [
      this.#deps.host.subscribe_generation((event) => {
        this.#handle_generation(event);
      }),
      this.#deps.jobs.subscribe((job) => {
        void this.#handle_job(job);
      }),
    ];
  }

  stop(): void {
    for (const unsubscribe of this.#unsubscribes.splice(0)) {
      unsubscribe();
    }
  }

  subscribe(listener: (event: IllustrationEvent) => void): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  /** `null` when the swipe was never analyzed or its chat is not the active one. */
  read(location: HostSwipeLocation): SwipeIllustrations | null {
    const parsed = SwipeIllustrationsSchema.safeParse(this.#deps.host.read_swipe_record(location));
    return parsed.success ? parsed.data : null;
  }

  is_pending(request_id: string): boolean {
    return this.#pending.has(request_id);
  }

  /** The message an image request belongs to, for the gallery's source link. */
  source_of(request_id: string): HostSwipeLocation | null {
    return this.#pending.get(request_id)?.location ?? null;
  }

  async active_location(message_id: number): Promise<HostSwipeLocation> {
    const chat = await this.#deps.host.get_active_chat();
    const message = chat.messages.find((candidate) => candidate.message_id === message_id);
    if (message === undefined) {
      throw new Error(`Message ${String(message_id)} is not in the active chat`);
    }
    return { chat_id: chat.chat_id, message_id, swipe_id: message.active_swipe_id };
  }

  /** Picks paragraphs, writes their slot records and markers; an analyzed swipe is returned as is. */
  async analyze(message_id: number): Promise<SwipeIllustrations> {
    const chat = await this.#deps.host.get_active_chat();
    const message = chat.messages.find((candidate) => candidate.message_id === message_id);
    if (message?.role !== "assistant") {
      throw new Error(`Message ${String(message_id)} is not an assistant reply`);
    }
    const location = { chat_id: chat.chat_id, message_id, swipe_id: message.active_swipe_id };
    const existing = this.read(location);
    if (existing !== null) {
      return existing;
    }
    const key = `${location.chat_id}:${String(message_id)}:${String(location.swipe_id)}`;
    if (this.#analyzing.has(key)) {
      throw new Error(`Message ${String(message_id)} is already being analyzed`);
    }
    this.#analyzing.add(key);
    this.#emit({ type: "analysis_started", location });
    try {
      const record = await this.#analyze_text(
        location,
        message.swipes[location.swipe_id]?.content ?? "",
      );
      this.#emit({ type: "slots_changed", location });
      return record;
    } catch (error) {
      this.#emit({
        type: "analysis_failed",
        location,
        message: error_message(error),
        excerpt: error instanceof AnalysisParseError ? error.excerpt : null,
      });
      throw error;
    } finally {
      this.#analyzing.delete(key);
    }
  }

  async #analyze_text(location: HostSwipeLocation, text: string): Promise<SwipeIllustrations> {
    const paragraphs = split_paragraphs(text);
    const settings = this.#deps.settings();
    const record: SwipeIllustrations = { schema_version: 2, slots: [] };
    if (paragraphs.length > 0) {
      const context = await this.#deps.prompt_context();
      const result = await this.#deps.host.generate_with_preset({
        generation_id: this.#deps.new_generation_id(),
        preset_name: settings.preset_name,
        user_input: build_analysis_input(
          paragraphs,
          settings.max_images_per_message,
          context.library,
        ),
        max_chat_history: settings.max_chat_history,
        connection: await to_host_connection(settings.connection, this.#deps.resolve_analysis_key),
        json_schema: ANALYSIS_JSON_SCHEMA,
      });
      const proposals = parse_analysis_output(
        result.content,
        paragraphs.length,
        settings.max_images_per_message,
      );
      record.slots.push(
        ...proposals.map((proposal): IllustrationSlot => {
          const library = match_library(
            `${paragraphs[proposal.paragraph]?.text ?? ""}\n${proposal.scene}`,
            proposal.characters.map((character) => character.name),
            context.library,
          );
          const prompt = assemble_slot_prompt({
            preset: context.preset,
            library,
            characters: proposal.characters,
            scene_tags: proposal.tags,
          });
          return {
            slot_id: this.#deps.new_slot_id(),
            paragraph: proposal.paragraph,
            anchor: (paragraphs[proposal.paragraph]?.text ?? "").slice(0, 400),
            scene: proposal.scene,
            characters: [
              ...new Set([
                ...proposal.characters.map((character) => character.name),
                ...library.characters.map((entry) => entry.character.name),
              ]),
            ],
            positive_prompt: prompt.positive_prompt,
            negative_prompt: prompt.negative_prompt,
            character_prompts: [...prompt.character_prompts],
            image_ids: [],
            active_image_id: null,
            pending_request_ids: [],
            last_error: null,
          };
        }),
      );
    }
    // The record lands first so the re-render triggered by the text change already finds it.
    await this.#deps.host.write_swipe_record(location, record);
    if (record.slots.length > 0) {
      const marked = insert_markers(
        text,
        record.slots.map((slot) => ({ paragraph: slot.paragraph, slot_id: slot.slot_id })),
      );
      if (!(await this.#deps.host.replace_message_text(location.message_id, text, marked))) {
        await this.#deps.host.write_swipe_record(location, null);
        throw new MessageChangedError(location.message_id);
      }
    }
    return record;
  }

  /** The request a slot would submit, so its cost can be shown before confirming. */
  preview_request(
    location: HostSwipeLocation,
    slot_id: string,
    prompt?: SlotGenerationInput,
  ): Promise<ImageGenerationRequest> {
    const slot = this.#require_slot(location, slot_id);
    return this.#build_slot_request(prompt ?? slot);
  }

  async #build_slot_request(input: SlotGenerationInput): Promise<ImageGenerationRequest> {
    return attach_character_prompts(await this.#deps.build_request(input), input.character_prompts);
  }

  async generate(
    location: HostSwipeLocation,
    slot_id: string,
    prompt?: SlotGenerationInput,
  ): Promise<void> {
    const slot = this.#require_slot(location, slot_id);
    const input: SlotGenerationInput = {
      positive_prompt: prompt?.positive_prompt ?? slot.positive_prompt,
      negative_prompt: prompt?.negative_prompt ?? slot.negative_prompt,
      character_prompts: prompt?.character_prompts ?? slot.character_prompts,
    };
    await this.#submit_for_slot(
      location,
      slot_id,
      () => this.#build_slot_request(input),
      (current) => ({
        ...current,
        positive_prompt: input.positive_prompt,
        negative_prompt: input.negative_prompt,
        character_prompts: [...input.character_prompts],
      }),
    );
  }

  can_edit(): boolean {
    return this.#deps.edits_available();
  }

  /** The request a quick edit would submit; an inpaint edit stores its mask, so it is never previewed. */
  preview_edit(
    edit: Exclude<SlotEdit, { readonly kind: "inpaint" }>,
  ): Promise<ImageGenerationRequest> {
    return this.#deps.build_edit_request(edit);
  }

  /** Queues a quick edit whose result is added to the same slot. */
  async edit(location: HostSwipeLocation, slot_id: string, edit: SlotEdit): Promise<void> {
    const slot = this.#require_slot(location, slot_id);
    // Edits that redraw content keep each character's own prompt, as the original image had.
    const characters =
      edit.kind === "img2img" || edit.kind === "inpaint" ? slot.character_prompts : [];
    await this.#submit_for_slot(location, slot_id, async () =>
      attach_character_prompts(await this.#deps.build_edit_request(edit), characters),
    );
  }

  async #submit_for_slot(
    location: HostSwipeLocation,
    slot_id: string,
    build: () => Promise<ImageGenerationRequest>,
    update: (slot: IllustrationSlot) => IllustrationSlot = (slot) => slot,
  ): Promise<void> {
    let request_id: RequestId;
    try {
      request_id = await this.#deps.submit(await build());
    } catch (error) {
      await this.#update_slot(location, slot_id, (current) => ({
        ...current,
        last_error: error_message(error),
      }));
      throw error;
    }
    this.#pending.set(request_id, { location, slot_id });
    await this.#update_slot(location, slot_id, (current) => ({
      ...update(current),
      pending_request_ids: [...current.pending_request_ids, request_id],
      last_error: null,
    }));
  }

  /** Generates every slot that has no image yet and nothing in flight. */
  async generate_missing(location: HostSwipeLocation): Promise<void> {
    const record = this.read(location);
    for (const slot of record?.slots ?? []) {
      const in_flight = slot.pending_request_ids.some((request_id) =>
        this.#pending.has(request_id),
      );
      if (slot.image_ids.length === 0 && !in_flight) {
        await this.generate(location, slot.slot_id);
      }
    }
  }

  select_image(location: HostSwipeLocation, slot_id: string, image_id: string): Promise<void> {
    return this.#update_slot(location, slot_id, (slot) => {
      const active = slot.image_ids.find((candidate) => candidate === image_id);
      if (active === undefined) {
        throw new Error(`Image ${image_id} does not belong to slot ${slot_id}`);
      }
      return { ...slot, active_image_id: active };
    });
  }

  #require_slot(location: HostSwipeLocation, slot_id: string): IllustrationSlot {
    const slot = this.read(location)?.slots.find((candidate) => candidate.slot_id === slot_id);
    if (slot === undefined) {
      throw new Error(`Slot ${slot_id} is not on message ${String(location.message_id)}`);
    }
    return slot;
  }

  async #update_slot(
    location: HostSwipeLocation,
    slot_id: string,
    update: (slot: IllustrationSlot) => IllustrationSlot,
  ): Promise<void> {
    const record = this.read(location);
    if (record === null || !record.slots.some((slot) => slot.slot_id === slot_id)) {
      throw new Error(`Slot ${slot_id} is not on message ${String(location.message_id)}`);
    }
    await this.#deps.host.write_swipe_record(location, {
      ...record,
      slots: record.slots.map((slot) => (slot.slot_id === slot_id ? update(slot) : slot)),
    });
    this.#emit({ type: "slots_changed", location });
  }

  async #handle_job(job: GenerationJobSnapshot): Promise<void> {
    const pending = this.#pending.get(job.request_id);
    if (pending === undefined) {
      return;
    }
    const finished_ok = job.state === "completed";
    if (!finished_ok && job.state !== "failed" && job.state !== "cancelled") {
      return;
    }
    this.#pending.delete(job.request_id);
    const remove_pending = (slot: IllustrationSlot): IllustrationSlot => ({
      ...slot,
      pending_request_ids: slot.pending_request_ids.filter((id) => id !== job.request_id),
    });
    try {
      await this.#update_slot(pending.location, pending.slot_id, (slot) =>
        finished_ok
          ? {
              ...remove_pending(slot),
              image_ids: [...slot.image_ids, ...job.image_ids],
              active_image_id: job.image_ids.at(-1) ?? slot.active_image_id,
            }
          : {
              ...remove_pending(slot),
              last_error: job.state === "cancelled" ? "cancelled" : (job.error?.code ?? "failed"),
            },
      );
      if (finished_ok) {
        await this.#deps.jobs.mark_attached(job.job_id);
      }
    } catch {
      // The swipe left the active chat or lost its slot; the images stay in the gallery.
      if (finished_ok) {
        await this.#deps.jobs.mark_orphaned(job.job_id);
      }
    }
  }

  #handle_generation(event: HostGenerationEvent): void {
    if (event.phase === "started") {
      this.#last_generation_type = event.dry_run ? null : event.generation_type;
      return;
    }
    if (event.phase === "stopped") {
      this.#last_generation_type = null;
      return;
    }
    const generation_type = this.#last_generation_type;
    this.#last_generation_type = null;
    if (
      generation_type === null ||
      !ILLUSTRATED_GENERATION_TYPES.has(generation_type) ||
      !this.#deps.auto_generation_enabled()
    ) {
      return;
    }
    void this.analyze(event.message_id)
      .then(async (record) => {
        if (record.slots.length > 0) {
          await this.generate_missing(await this.active_location(event.message_id));
        }
      })
      .catch(() => {
        // Surfaced to the chat UI through the analysis_failed event.
      });
  }

  #emit(event: IllustrationEvent): void {
    for (const listener of this.#listeners) {
      listener(event);
    }
  }
}
