import {
  SwipeIllustrationsSchema,
  type AnalysisConnection,
  type AnalysisWorldInfo,
  type IllustrationSettings,
  type IllustrationSlot,
  type ImageGenerationRequest,
  type RequestId,
  type SwipeIllustrations,
  type SlotCharacterPrompt,
  type Wearing,
} from "@tavern-canvas/contracts";
import type { GenerationJobSnapshot } from "@tavern-canvas/core";

import type {
  HostAdapter,
  HostGenerationConnection,
  HostGenerationEvent,
  HostJsonSchema,
  HostSwipeLocation,
  HostWorldInfo,
} from "../../host/index.js";
import {
  ANALYSIS_JSON_SCHEMA,
  AnalysisParseError,
  build_analysis_input,
  build_chosen_paragraphs_input,
  parse_analysis_output,
  type IllustrationProposal,
} from "./analysis.js";
import type { SlotEdit } from "./slot_edits.js";
import { insert_markers, split_paragraphs, type Paragraph } from "./slot_markers.js";
import { assemble_slot_prompt, type SlotPromptPreset } from "./slot_prompt.js";
import type { OutfitTags } from "../wardrobe/outfit_from_image.js";
import type { WardrobeService } from "../wardrobe/wardrobe_service.js";
import { match_library, type SlotLibrary } from "./library_match.js";
import { guidance_lines } from "./user_guidance.js";
import { activate_worldbook } from "./worldbook.js";

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
  readonly prompt_context: (chat_id: string) => Promise<SlotPromptContext>;
  readonly wardrobe: WardrobeService;
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
  readonly wait: (milliseconds: number) => Promise<void>;
}

const ANALYSIS_ATTEMPTS = 3;
const ANALYSIS_RETRY_DELAY_MS = 2_000;

export type IllustrationEvent =
  | { readonly type: "slots_changed"; readonly location: HostSwipeLocation }
  | { readonly type: "analysis_started"; readonly location: HostSwipeLocation }
  | {
      readonly type: "analysis_failed";
      readonly location: HostSwipeLocation;
      readonly message: string;
      readonly excerpt: string | null;
    }
  | {
      readonly type: "wardrobe_failed";
      readonly location: HostSwipeLocation;
      readonly message: string;
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

async function to_host_world_info(
  world_info: AnalysisWorldInfo,
  text: string,
  host: HostAdapter,
): Promise<HostWorldInfo> {
  switch (world_info.mode) {
    case "chat":
      return { kind: "chat" };
    case "off":
      return { kind: "replace", text: "" };
    case "worldbook":
      return {
        kind: "replace",
        text: activate_worldbook(await host.read_worldbook(world_info.worldbook), text),
      };
  }
}

export interface WardrobeRunnerDeps {
  readonly host: HostAdapter;
  readonly settings: () => IllustrationSettings;
  readonly resolve_analysis_key: () => Promise<string>;
  readonly new_generation_id: () => string;
}

/**
 * Runs a wardrobe request through the analysis preset and connection, with the chosen wardrobe
 * model where the connection names one. It sends no chat history and no world info: the request
 * carries everything it needs.
 */
async function run_wardrobe_request(
  deps: WardrobeRunnerDeps,
  input: string,
  json_schema: HostJsonSchema,
  image: string | null,
): Promise<string> {
  const settings = deps.settings();
  const model = settings.wardrobe_model;
  const connection =
    model === null || settings.connection.kind === "current"
      ? settings.connection
      : { ...settings.connection, model };
  const result = await deps.host.generate_with_preset({
    generation_id: deps.new_generation_id(),
    preset_name: settings.preset_name,
    user_input: input,
    max_chat_history: 0,
    connection: await to_host_connection(connection, deps.resolve_analysis_key),
    json_schema,
    world_info: { kind: "replace", text: "" },
    image,
  });
  return result.content;
}

export function create_wardrobe_runner(
  deps: WardrobeRunnerDeps,
): (input: string, json_schema: HostJsonSchema) => Promise<string> {
  return (input, json_schema) =>
    run_wardrobe_request(
      deps,
      [input, ...guidance_lines(deps.settings().wardrobe_guidance)].join("\n"),
      json_schema,
      null,
    );
}

/** Loaded on demand: it needs the NovelAI model table, which stays out of the initial bundle. */
async function with_character_prompts(
  request: ImageGenerationRequest,
  prompts: readonly SlotCharacterPrompt[],
): Promise<ImageGenerationRequest> {
  const { attach_character_prompts } = await import("./character_prompts.js");
  return attach_character_prompts(request, prompts);
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

  /** Analyzes the reply and generates every slot still without an image, as automatic illustration does. */
  async illustrate(message_id: number): Promise<void> {
    const record = await this.analyze(message_id);
    if (record.slots.length > 0) {
      await this.generate_missing(await this.active_location(message_id));
    }
  }

  auto_generation_enabled(): boolean {
    return this.#deps.auto_generation_enabled();
  }

  async #analyze_text(location: HostSwipeLocation, text: string): Promise<SwipeIllustrations> {
    const paragraphs = split_paragraphs(text);
    const settings = this.#deps.settings();
    const record: SwipeIllustrations = { schema_version: 2, slots: [] };
    if (paragraphs.length > 0) {
      const snapshot = await this.#wardrobe_snapshot(location);
      const context = await this.#deps.prompt_context(location.chat_id);
      const proposals = await this.#propose(
        text,
        build_analysis_input(
          paragraphs,
          settings.max_images_per_message,
          context.library,
          settings.analysis_guidance,
        ),
        (raw) => parse_analysis_output(raw, paragraphs.length, settings.max_images_per_message),
      );
      record.slots.push(...this.#slots_for(paragraphs, proposals, context, snapshot));
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

  /**
   * Sends one analysis request and parses its reply, retrying both together: a failed request and a
   * reply cut off mid-JSON usually succeed on another try.
   */
  async #propose(
    text: string,
    user_input: string,
    parse: (raw: string) => readonly IllustrationProposal[],
  ): Promise<readonly IllustrationProposal[]> {
    const settings = this.#deps.settings();
    const connection = await to_host_connection(
      settings.connection,
      this.#deps.resolve_analysis_key,
    );
    const world_info = await to_host_world_info(settings.world_info, text, this.#deps.host);
    for (let attempt = 1; ; attempt += 1) {
      try {
        const result = await this.#deps.host.generate_with_preset({
          generation_id: this.#deps.new_generation_id(),
          preset_name: settings.preset_name,
          user_input,
          max_chat_history: settings.max_chat_history,
          connection,
          json_schema: ANALYSIS_JSON_SCHEMA,
          world_info,
          image: null,
        });
        return parse(result.content);
      } catch (error) {
        if (attempt >= ANALYSIS_ATTEMPTS) {
          throw error;
        }
        await this.#deps.wait(ANALYSIS_RETRY_DELAY_MS * attempt);
      }
    }
  }

  #slots_for(
    paragraphs: readonly Paragraph[],
    proposals: readonly IllustrationProposal[],
    context: SlotPromptContext,
    snapshot: readonly Wearing[],
  ): IllustrationSlot[] {
    return proposals.map((proposal): IllustrationSlot => {
      const library = match_library(
        `${paragraphs[proposal.paragraph]?.text ?? ""}\n${proposal.scene}`,
        proposal.characters.map((character) => character.name),
        context.library,
        snapshot,
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
    });
  }

  async #swipe_text(location: HostSwipeLocation): Promise<string> {
    const chat = await this.#deps.host.get_active_chat();
    const message = chat.messages.find((candidate) => candidate.message_id === location.message_id);
    if (chat.chat_id !== location.chat_id || message?.active_swipe_id !== location.swipe_id) {
      throw new MessageChangedError(location.message_id);
    }
    return message.swipes[location.swipe_id]?.content ?? "";
  }

  /** The reply's paragraphs that have no slot yet, for the user to pick from. */
  async open_paragraphs(location: HostSwipeLocation): Promise<readonly Paragraph[]> {
    const taken = new Set(this.read(location)?.slots.map((slot) => slot.paragraph) ?? []);
    return split_paragraphs(await this.#swipe_text(location)).filter(
      (paragraph) => !taken.has(paragraph.index),
    );
  }

  /**
   * Adds slots for the paragraphs the user picked, with prompts from the analysis model. A paragraph
   * the model leaves out still gets a slot, with prompts for the user to write.
   */
  async add_paragraphs(
    location: HostSwipeLocation,
    chosen: readonly number[],
  ): Promise<readonly IllustrationSlot[]> {
    const text = await this.#swipe_text(location);
    const paragraphs = split_paragraphs(text);
    const previous = this.read(location);
    const taken = new Set(previous?.slots.map((slot) => slot.paragraph) ?? []);
    const wanted = [...new Set(chosen)]
      .filter((index) => index < paragraphs.length && !taken.has(index))
      .sort((left, right) => left - right);
    if (wanted.length === 0) {
      return [];
    }
    const settings = this.#deps.settings();
    const snapshot = await this.#wardrobe_snapshot(location);
    const context = await this.#deps.prompt_context(location.chat_id);
    const proposals = await this.#propose(
      text,
      build_chosen_paragraphs_input(
        paragraphs,
        wanted,
        context.library,
        settings.analysis_guidance,
      ),
      (raw) => parse_analysis_output(raw, paragraphs.length, paragraphs.length),
    );
    const by_paragraph = new Map(proposals.map((proposal) => [proposal.paragraph, proposal]));
    const slots = this.#slots_for(
      paragraphs,
      wanted.map(
        (index) =>
          by_paragraph.get(index) ?? {
            paragraph: index,
            scene: (paragraphs[index]?.text ?? "").slice(0, 120),
            tags: "",
            characters: [],
          },
      ),
      context,
      snapshot,
    );
    await this.#deps.host.write_swipe_record(location, {
      schema_version: 2,
      slots: [...(previous?.slots ?? []), ...slots],
    });
    const marked = insert_markers(
      text,
      slots.map((slot) => ({ paragraph: slot.paragraph, slot_id: slot.slot_id })),
    );
    if (!(await this.#deps.host.replace_message_text(location.message_id, text, marked))) {
      await this.#deps.host.write_swipe_record(location, previous);
      throw new MessageChangedError(location.message_id);
    }
    this.#emit({ type: "slots_changed", location });
    return slots;
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
    return with_character_prompts(await this.#deps.build_request(input), input.character_prompts);
  }

  /**
   * Generates one image outside any chat slot, such as a character's reference image, through the
   * active provider profile; resolves with the gallery image id once the job finishes.
   */
  async generate_image(input: SlotGenerationInput): Promise<string> {
    const request = await this.#build_slot_request(input);
    const finished = new Map<string, GenerationJobSnapshot>();
    let request_id: string | null = null;
    let settle: ((job: GenerationJobSnapshot) => void) | null = null;
    const stop = this.#deps.jobs.subscribe((job) => {
      if (job.state !== "completed" && job.state !== "failed" && job.state !== "cancelled") {
        return;
      }
      if (job.request_id === request_id) {
        settle?.(job);
      } else {
        finished.set(job.request_id, job);
      }
    });
    try {
      const submitted = await this.#deps.submit(request);
      request_id = submitted;
      const job =
        finished.get(submitted) ??
        (await new Promise<GenerationJobSnapshot>((resolve) => {
          settle = resolve;
        }));
      const image_id = job.state === "completed" ? job.image_ids.at(-1) : undefined;
      if (image_id === undefined) {
        throw new Error(job.state === "cancelled" ? "cancelled" : (job.error?.code ?? "failed"));
      }
      await this.#deps.jobs.mark_attached(job.job_id);
      return image_id;
    } finally {
      stop();
    }
  }

  /**
   * The clothing in an image as outfit tags, read by the wardrobe model, which must accept images.
   * `image` is a data URL.
   */
  async read_outfit(image: string): Promise<OutfitTags> {
    const { OUTFIT_FROM_IMAGE_INPUT, OUTFIT_FROM_IMAGE_JSON_SCHEMA, parse_outfit_from_image } =
      await import("../wardrobe/outfit_from_image.js");
    const raw = await run_wardrobe_request(
      this.#deps,
      OUTFIT_FROM_IMAGE_INPUT,
      OUTFIT_FROM_IMAGE_JSON_SCHEMA,
      image,
    );
    return parse_outfit_from_image(raw);
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
        // Plain copies: a caller may pass reactive objects, which structuredClone rejects.
        character_prompts: input.character_prompts.map((character) => ({
          name: character.name,
          prompt: character.prompt,
          negative_prompt: character.negative_prompt,
        })),
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
      with_character_prompts(await this.#deps.build_edit_request(edit), characters),
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
    if (generation_type === null || !ILLUSTRATED_GENERATION_TYPES.has(generation_type)) {
      return;
    }
    void this.active_location(event.message_id)
      .then(async (location) => {
        if (generation_type === "swipe") {
          // A new swipe starts with a copy of the previous swipe's extra, records included.
          await this.#deps.host.write_swipe_record(location, null);
          await this.#deps.host.write_swipe_wardrobe(location, null);
        }
        await this.#wardrobe_snapshot(location);
        if (this.#deps.auto_generation_enabled()) {
          await this.illustrate(event.message_id);
        }
      })
      .catch(() => {
        // Surfaced to the chat UI through the analysis_failed and wardrobe_failed events.
      });
  }

  /**
   * The reply's wardrobe snapshot, running the wardrobe update when the reply has none. A failed
   * update is reported and the reply falls back to what it inherits.
   */
  async #wardrobe_snapshot(location: HostSwipeLocation): Promise<readonly Wearing[]> {
    const own = this.#deps.wardrobe.read(location);
    if (own !== null) {
      return own;
    }
    try {
      return await this.#deps.wardrobe.update(location.message_id);
    } catch (error) {
      this.#emit({ type: "wardrobe_failed", location, message: error_message(error) });
      return this.#deps.wardrobe.current(location.message_id);
    }
  }

  /** The library this chat sees and the reply's wardrobe snapshot, for correcting outfits. */
  async wardrobe_view(location: HostSwipeLocation): Promise<{
    readonly library: SlotLibrary;
    readonly snapshot: readonly Wearing[];
  }> {
    const [context, snapshot] = await Promise.all([
      this.#deps.prompt_context(location.chat_id),
      this.#deps.wardrobe.current(location.message_id),
    ]);
    return { library: context.library, snapshot };
  }

  /** Records a corrected outfit on this reply; later replies inherit it. */
  set_wearing(location: HostSwipeLocation, wearing: Wearing): Promise<void> {
    return this.#deps.wardrobe.set_wearing(location, wearing);
  }

  #emit(event: IllustrationEvent): void {
    for (const listener of this.#listeners) {
      listener(event);
    }
  }
}
