/**
 * The top-level pipeline orchestrator. Runs the fixed stage order from the Stage 07 plan:
 *
 *   raw scene -> selected context -> MVU variable resolution -> fixed positive/negative and
 *   UCP/AQT quality controls -> preset/random group selection -> replacement rules -> regex rules
 *   -> roll/random expression resolution -> tag normalization and stable deduplication ->
 *   provider-specific request mapping
 *
 * This is a deliberate reordering from legacy (where replacement ran *before* the positive-prompt
 * assembly, feeding its 5 insertion points directly into `zhengmian`): the brief fixes replacement
 * rules *after* quality-control assembly, so this pipeline keeps the assembled positive prompt as
 * named slices (`fixed_start` / `middle` / `fixed_end` / `aqt`) through the quality-control and
 * preset-selection stages, and only performs the final 9-part join once the replacement stage's
 * insertions are known. Regex, roll resolution, and tag deduplication then run as plain string
 * transforms on the joined result. The negative prompt is assembled once (quality controls) and
 * never touched by replacement/regex/roll -- see the "negative prompt separation" test.
 */

import {
  ImageGenerationRequestSchema,
  type ImageGenerationRequest,
} from "@tavern-canvas/contracts";

import type { ResolvedContext } from "./context_sources.js";
import { resolve_getvar_macros, type VariableStore } from "./mvu_variable_source.js";
import {
  select_random_preset,
  select_random_vibe_group,
  type VibeGroupCandidate,
} from "./random_group_transform.js";
import { apply_regex_rules, type RegexRule, type RegexRuleFailure } from "./regex_transform.js";
import { apply_replacement_rules, type ReplacementRule } from "./replacement_transform.js";
import {
  deduplicate_tags,
  join_prompt_parts,
  normalize_physical_newlines,
} from "./tag_normalizer.js";

// ---------------------------------------------------------------------------
// Shared helpers reused outside the main 9-stage text pipeline
// ---------------------------------------------------------------------------

const CHINESE_PARENTHETICAL_PATTERN = /（[^（）]*）/g;

/** Repeatedly strips full-width Chinese parenthetical annotations, e.g. "1girl（一个女孩）" -> "1girl". */
export function strip_chinese_annotations(text: string): string {
  if (!text) {
    return "";
  }
  let result = text;
  let previous: string;
  do {
    previous = result;
    result = result.replace(CHINESE_PARENTHETICAL_PATTERN, "");
  } while (result !== previous);
  return result;
}

export interface ChatMessageLike {
  readonly role: "system" | "assistant" | "user";
  readonly content: string;
}

/** Merges consecutive same-role messages, optionally folding "system" into "user" first. */
export function merge_adjacent_messages(
  messages: readonly ChatMessageLike[],
  options: { readonly merge_system_user?: boolean } = {},
): readonly ChatMessageLike[] {
  if (messages.length === 0) {
    return [];
  }
  const normalize_role = (role: ChatMessageLike["role"]): ChatMessageLike["role"] =>
    options.merge_system_user === true && role === "system" ? "user" : role;

  const result: ChatMessageLike[] = [];
  let current: ChatMessageLike | null = null;
  for (const message of messages) {
    const role = normalize_role(message.role);
    if (current === null) {
      current = { role, content: message.content };
    } else if (current.role === role) {
      current = { role, content: `${current.content}\n${message.content}` };
    } else {
      result.push(current);
      current = { role, content: message.content };
    }
  }
  if (current !== null) {
    result.push(current);
  }
  return result;
}

const PLACEHOLDER_TOKEN_PATTERN = /\{\{([a-zA-Z0-9_]+)\}\}/g;

/** General `{{key}}` -> value substitution pass, distinct from the World Info-specific fixed placeholders. */
export function substitute_template_placeholders(
  text: string,
  values: Readonly<Record<string, string>>,
): string {
  return text.replace(PLACEHOLDER_TOKEN_PATTERN, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? (values[key] as string) : match,
  );
}

// ---------------------------------------------------------------------------
// Roll / random expression resolution (seeded)
// ---------------------------------------------------------------------------

const ROLL_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const ROLL_DEFAULT_SEED_MAX = 100_000;
const ROLL_STRING_LENGTH = 8;
const ROLL_PATTERN = /\{\{roll\s+(?:1d)?(\d+)\}\}/gi;

/** Mulberry32-family seeded PRNG -- deterministic given the same numeric seed. */
function create_seeded_random(seed: number): () => number {
  let state = seed;
  return () => {
    state += 1831565813;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seeded_random_string(seed: number): string {
  const random = create_seeded_random(seed);
  let result = "";
  for (let index = 0; index < ROLL_STRING_LENGTH; index += 1) {
    result += ROLL_CHARSET[Math.floor(random() * ROLL_CHARSET.length)] ?? "";
  }
  return result;
}

/**
 * Resolves `{{roll N}}` / `{{roll 1dN}}` into an 8-character deterministic-per-seed string.
 * `pick_seed` chooses the seed (defaults to `Math.random`-driven); injecting a fixed sequence makes
 * resolution fully deterministic for tests.
 */
export function resolve_roll_placeholders(
  text: string,
  pick_seed: (seed_max: number) => number = (seed_max) =>
    Math.floor(Math.random() * (seed_max + 1)),
): string {
  return text.replace(ROLL_PATTERN, (_match, seed_max_text: string) => {
    const parsed_max = Number.parseInt(seed_max_text, 10);
    const seed_max =
      Number.isNaN(parsed_max) || parsed_max <= 0 ? ROLL_DEFAULT_SEED_MAX : parsed_max;
    return seeded_random_string(pick_seed(seed_max));
  });
}

// ---------------------------------------------------------------------------
// Quality-control assembly (zhengmian / fumian)
// ---------------------------------------------------------------------------

export interface QualityControlInput {
  readonly fixed_positive_prompt: string;
  readonly scene: string;
  readonly fixed_positive_prompt_end: string;
  readonly aqt_quality_tags: string;
  readonly fixed_negative_prompt: string;
  readonly ucp_negative_prompt: string;
}

interface PositivePromptSlices {
  readonly fixed_start: string;
  readonly middle: string;
  readonly fixed_end: string;
  readonly aqt: string;
}

function assemble_quality_controls(input: QualityControlInput): {
  readonly slices: PositivePromptSlices;
  readonly negative_prompt: string;
} {
  const slices: PositivePromptSlices = {
    fixed_start: strip_chinese_annotations(input.fixed_positive_prompt),
    middle: strip_chinese_annotations(input.scene),
    fixed_end: strip_chinese_annotations(input.fixed_positive_prompt_end),
    aqt: strip_chinese_annotations(input.aqt_quality_tags),
  };

  const fixed_negative = strip_chinese_annotations(input.fixed_negative_prompt);
  const ucp = input.ucp_negative_prompt;
  const negative_prompt =
    fixed_negative === "" ? ucp : ucp === "" ? fixed_negative : `${ucp}, ${fixed_negative}`;

  return { slices, negative_prompt };
}

// ---------------------------------------------------------------------------
// Provider-specific request mapping
// ---------------------------------------------------------------------------

type DistributiveOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K & keyof T>
  : never;

export type ProviderRequestBase = DistributiveOmit<
  ImageGenerationRequest,
  "prompt" | "negative_prompt"
>;

/** Merges the assembled positive/negative text into a provider-specific request and validates it. */
export function map_to_provider_request(
  base: ProviderRequestBase,
  assembled: { readonly positive_prompt: string; readonly negative_prompt: string },
): ImageGenerationRequest {
  const negative_prompt = assembled.negative_prompt.trim();
  const candidate = {
    ...base,
    prompt: assembled.positive_prompt,
    ...(negative_prompt.length > 0 ? { negative_prompt } : {}),
  };
  return ImageGenerationRequestSchema.parse(candidate);
}

// ---------------------------------------------------------------------------
// Full pipeline orchestration
// ---------------------------------------------------------------------------

export type PipelineStageId =
  | "context"
  | "mvu_resolution"
  | "quality_controls"
  | "preset_selection"
  | "replacement_rules"
  | "regex_rules"
  | "roll_resolution"
  | "tag_normalization"
  | "provider_mapping";

export interface PipelineStageTrace {
  readonly stage: PipelineStageId;
  readonly positive_snapshot: string;
}

export interface PresetSelectionInput {
  readonly current_preset_id: string;
  readonly presets: Readonly<Record<string, unknown>>;
  readonly random_enabled: boolean;
}

export interface VibeGroupSelectionInput {
  readonly current_group_id: string;
  readonly groups: Readonly<Record<string, VibeGroupCandidate>>;
  readonly random_enabled: boolean;
}

export interface PromptPipelineInput {
  readonly raw_scene: string;
  readonly context: ResolvedContext | null;
  readonly mvu_store: VariableStore | null;
  readonly fixed_positive_prompt: string;
  readonly fixed_positive_prompt_end: string;
  readonly fixed_negative_prompt: string;
  readonly ucp_negative_prompt: string;
  readonly aqt_quality_tags: string;
  readonly preset_selection: PresetSelectionInput | null;
  readonly vibe_group_selection: VibeGroupSelectionInput | null;
  readonly replacement_rules: readonly ReplacementRule[];
  readonly regex_rules: readonly RegexRule[];
  readonly random_source?: () => number;
  readonly roll_seed_picker?: (seed_max: number) => number;
  readonly provider_request_base: ProviderRequestBase;
}

export interface PromptPipelineResult {
  readonly original_text: string;
  readonly positive_prompt: string;
  readonly negative_prompt: string;
  readonly selected_preset_id: string | null;
  readonly selected_vibe_group_id: string | null;
  readonly regex_failures: readonly RegexRuleFailure[];
  readonly provider_request: ImageGenerationRequest;
  readonly trace: readonly PipelineStageTrace[];
}

function positive_from_slices(
  slices: PositivePromptSlices,
  extra: Partial<
    Record<
      "prefix" | "after_fixed_start" | "before_fixed_end" | "after_fixed_end" | "suffix",
      string
    >
  >,
): string {
  return join_prompt_parts([
    extra.prefix,
    slices.fixed_start,
    extra.after_fixed_start,
    slices.middle,
    extra.before_fixed_end,
    slices.fixed_end,
    extra.after_fixed_end,
    slices.aqt,
    extra.suffix,
  ]);
}

export function run_prompt_pipeline(input: PromptPipelineInput): PromptPipelineResult {
  const trace: PipelineStageTrace[] = [];
  const original_text = input.raw_scene;

  // Stage: context -- the resolved context block is folded into the working scene text ahead of
  // MVU resolution, so `{@getvar}` macros anywhere in context content resolve too.
  const context_block =
    input.context === null
      ? ""
      : [
          input.context.world_info_text,
          input.context.character_context,
          input.context.persona_text,
          input.context.user_persona_text,
          input.context.knowledge_text,
        ]
          .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
          .join("\n");
  let working_scene = context_block ? `${context_block}\n${input.raw_scene}` : input.raw_scene;
  trace.push({ stage: "context", positive_snapshot: working_scene });

  // Stage: MVU variable resolution.
  working_scene = normalize_physical_newlines(
    resolve_getvar_macros(working_scene, input.mvu_store),
  );
  trace.push({ stage: "mvu_resolution", positive_snapshot: working_scene });

  // Stage: fixed positive/negative and UCP/AQT quality controls.
  const { slices, negative_prompt: base_negative } = assemble_quality_controls({
    fixed_positive_prompt: input.fixed_positive_prompt,
    scene: working_scene,
    fixed_positive_prompt_end: input.fixed_positive_prompt_end,
    aqt_quality_tags: input.aqt_quality_tags,
    fixed_negative_prompt: input.fixed_negative_prompt,
    ucp_negative_prompt: input.ucp_negative_prompt,
  });
  trace.push({ stage: "quality_controls", positive_snapshot: positive_from_slices(slices, {}) });

  // Stage: preset/random group selection -- resolves IDs only, no text mutation.
  const random_source = input.random_source ?? Math.random;
  const selected_preset_id =
    input.preset_selection === null
      ? null
      : select_random_preset(
          input.preset_selection.current_preset_id,
          input.preset_selection.presets,
          input.preset_selection.random_enabled,
          random_source,
        ).selected_id;
  const selected_vibe_group_id =
    input.vibe_group_selection === null
      ? null
      : select_random_vibe_group(
          input.vibe_group_selection.current_group_id,
          input.vibe_group_selection.groups,
          input.vibe_group_selection.random_enabled,
          random_source,
        ).selected_id;
  trace.push({ stage: "preset_selection", positive_snapshot: positive_from_slices(slices, {}) });

  // Stage: replacement rules -- matches against the whole assembled context, mutates only the
  // scene ("middle") slice, and the 5 insertion positions are spliced in as this stage's final join.
  const other_prompt_haystack = join_prompt_parts([
    slices.fixed_start,
    slices.fixed_end,
    slices.aqt,
  ]);
  const replacement_result = apply_replacement_rules(
    slices.middle,
    input.replacement_rules,
    other_prompt_haystack,
  );
  let positive_prompt = positive_from_slices(
    { ...slices, middle: replacement_result.modified_prompt },
    {
      prefix: replacement_result.insertions.前置前,
      after_fixed_start: replacement_result.insertions.前置后,
      before_fixed_end: replacement_result.insertions.后置前,
      after_fixed_end: replacement_result.insertions.后置后,
      suffix: replacement_result.insertions.最后置,
    },
  );
  trace.push({ stage: "replacement_rules", positive_snapshot: positive_prompt });

  // Stage: regex rules.
  const regex_result = apply_regex_rules(positive_prompt, input.regex_rules);
  positive_prompt = regex_result.text;
  trace.push({ stage: "regex_rules", positive_snapshot: positive_prompt });

  // Stage: roll/random expression resolution.
  const roll_seed_picker =
    input.roll_seed_picker ?? ((seed_max: number) => Math.floor(random_source() * (seed_max + 1)));
  positive_prompt = resolve_roll_placeholders(positive_prompt, roll_seed_picker);
  let negative_prompt = resolve_roll_placeholders(base_negative, roll_seed_picker);
  trace.push({ stage: "roll_resolution", positive_snapshot: positive_prompt });

  // Stage: tag normalization and stable deduplication -- applied to positive and negative independently.
  positive_prompt = deduplicate_tags(positive_prompt);
  negative_prompt = deduplicate_tags(negative_prompt);
  trace.push({ stage: "tag_normalization", positive_snapshot: positive_prompt });

  // Stage: provider-specific request mapping.
  const provider_request = map_to_provider_request(input.provider_request_base, {
    positive_prompt,
    negative_prompt,
  });
  trace.push({ stage: "provider_mapping", positive_snapshot: positive_prompt });

  return {
    original_text,
    positive_prompt,
    negative_prompt,
    selected_preset_id,
    selected_vibe_group_id,
    regex_failures: regex_result.failures,
    provider_request,
    trace,
  };
}
