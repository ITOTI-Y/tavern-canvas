import { NOVELAI_PUBLISHED_MODEL_IDS } from "./novelai_model_ids.js";

export type NovelAiModelFamily = "v3" | "v4" | "v4_5" | "v5";

export type NovelAiUndesiredContentPreset =
  "heavy" | "light" | "human_focus" | "furry_focus" | "none";

export type NovelAiQualityPreset = "standard" | "light" | "none";

export type NovelAiPromptPresetKey =
  "v3" | "furry_v3" | "v4_curated" | "v4_full" | "v4_5_curated" | "v4_5_full" | "v5";

export type NovelAiNoiseScheduleRule = "selectable" | "no_native" | "fixed_karras";

export interface NovelAiModelProfile {
  readonly model_id: string;
  readonly display_name: string;
  readonly family: NovelAiModelFamily;
  readonly selectable: boolean;
  readonly vibe_transfer: "raw_image" | "encoded" | "unsupported";
  readonly character_reference: boolean;
  readonly max_characters: number;
  readonly character_positions: "unsupported" | "grid" | "free";
  readonly smea: boolean;
  readonly variety_sigma: number | null;
  readonly noise_schedule: NovelAiNoiseScheduleRule;
  readonly cfg_rescale: boolean;
  readonly legacy_uc: boolean;
  readonly img2img: boolean;
  readonly inpainting_model_id: string | null;
  readonly default_scale: number;
  readonly default_steps: number;
  readonly fixed_settings: {
    readonly steps: number;
    readonly sampler: "k_euler_ancestral";
    readonly undesired_content_preset: NovelAiUndesiredContentPreset;
  } | null;
  /** Selects the quality tags and undesired-content texts NovelAI's web client uses for this model. */
  readonly prompt_presets: NovelAiPromptPresetKey;
  readonly nsfw_negative_prefix: boolean;
  readonly opus_usage_limit: boolean;
  readonly price_multiplier: number;
  readonly step_price_factor: number;
}

export interface ResolvedNovelAiModel {
  readonly profile: NovelAiModelProfile;
  readonly confirmed: boolean;
}

type ProfileOverrides = Omit<NovelAiModelProfile, "model_id" | "display_name" | "selectable">;

const V3_BASE: ProfileOverrides = {
  family: "v3",
  vibe_transfer: "raw_image",
  character_reference: false,
  max_characters: 0,
  character_positions: "unsupported",
  smea: true,
  variety_sigma: 19,
  noise_schedule: "selectable",
  cfg_rescale: true,
  legacy_uc: false,
  img2img: true,
  inpainting_model_id: "nai-diffusion-3-inpainting",
  default_scale: 5,
  default_steps: 23,
  fixed_settings: null,
  prompt_presets: "v3",
  nsfw_negative_prefix: true,
  opus_usage_limit: false,
  price_multiplier: 1,
  step_price_factor: 1,
};

const V4_BASE: ProfileOverrides = {
  ...V3_BASE,
  family: "v4",
  vibe_transfer: "encoded",
  max_characters: 6,
  character_positions: "grid",
  smea: false,
  noise_schedule: "no_native",
  legacy_uc: true,
  default_scale: 5.5,
  prompt_presets: "v4_full",
};

const V4_5_BASE: ProfileOverrides = {
  ...V4_BASE,
  family: "v4_5",
  character_reference: true,
  variety_sigma: 58,
  legacy_uc: false,
  default_scale: 5,
  prompt_presets: "v4_5_full",
};

const V5_BASE: ProfileOverrides = {
  ...V4_5_BASE,
  family: "v5",
  vibe_transfer: "unsupported",
  character_reference: false,
  max_characters: 32,
  character_positions: "free",
  variety_sigma: null,
  noise_schedule: "fixed_karras",
  default_scale: 7,
  prompt_presets: "v5",
  opus_usage_limit: true,
  price_multiplier: 1.5,
};

function model(
  model_id: string,
  display_name: string,
  selectable: boolean,
  profile: ProfileOverrides,
): NovelAiModelProfile {
  return Object.freeze({ model_id, display_name, selectable, ...profile });
}

const V5_CURATED: ProfileOverrides = {
  ...V5_BASE,
  inpainting_model_id: "nai-diffusion-4-5-curated-inpainting",
  nsfw_negative_prefix: false,
};
const V5_FULL: ProfileOverrides = {
  ...V5_BASE,
  inpainting_model_id: "nai-diffusion-5-full-inpainting",
};
const V5_FULL_MEDIUM: ProfileOverrides = {
  ...V5_FULL,
  cfg_rescale: false,
  inpainting_model_id: "nai-diffusion-5-full-medium-inpainting",
  default_steps: 14,
  fixed_settings: { steps: 14, sampler: "k_euler_ancestral", undesired_content_preset: "heavy" },
  step_price_factor: 1 / 1.06521739,
};
const V4_5_CURATED: ProfileOverrides = {
  ...V4_5_BASE,
  inpainting_model_id: "nai-diffusion-4-5-curated-inpainting",
  prompt_presets: "v4_5_curated",
  nsfw_negative_prefix: false,
};
const V4_5_FULL: ProfileOverrides = {
  ...V4_5_BASE,
  inpainting_model_id: "nai-diffusion-4-5-full-inpainting",
  prompt_presets: "v4_5_full",
};
const V4_CURATED: ProfileOverrides = {
  ...V4_BASE,
  inpainting_model_id: "nai-diffusion-4-curated-inpainting",
  prompt_presets: "v4_curated",
  nsfw_negative_prefix: false,
};
const V4_FULL: ProfileOverrides = {
  ...V4_BASE,
  inpainting_model_id: "nai-diffusion-4-full-inpainting",
  prompt_presets: "v4_full",
};
const FURRY_V3: ProfileOverrides = {
  ...V3_BASE,
  inpainting_model_id: "nai-diffusion-furry-3-inpainting",
  default_scale: 6.2,
  prompt_presets: "furry_v3",
};

function inpainting(base: ProfileOverrides, model_id: string): ProfileOverrides {
  return { ...base, inpainting_model_id: model_id };
}

const PROFILES: readonly NovelAiModelProfile[] = [
  model("nai-diffusion-5-curated", "NAI Diffusion V5 Curated", true, V5_CURATED),
  model("nai-diffusion-5-full", "NAI Diffusion V5 Full", true, V5_FULL),
  model("nai-diffusion-5-full-medium", "NAI Diffusion V5 Full Medium", true, V5_FULL_MEDIUM),
  model(
    "nai-diffusion-5-curated-inpainting",
    "NAI Diffusion V5 Curated Inpainting",
    false,
    inpainting(V5_CURATED, "nai-diffusion-5-curated-inpainting"),
  ),
  model(
    "nai-diffusion-5-full-inpainting",
    "NAI Diffusion V5 Full Inpainting",
    false,
    inpainting(V5_FULL, "nai-diffusion-5-full-inpainting"),
  ),
  model(
    "nai-diffusion-5-full-medium-inpainting",
    "NAI Diffusion V5 Full Medium Inpainting",
    false,
    inpainting(V5_FULL_MEDIUM, "nai-diffusion-5-full-medium-inpainting"),
  ),
  model("nai-diffusion-4-5-curated", "NAI Diffusion V4.5 Curated", true, V4_5_CURATED),
  model("nai-diffusion-4-5-full", "NAI Diffusion V4.5 Full", true, V4_5_FULL),
  model(
    "nai-diffusion-4-5-curated-inpainting",
    "NAI Diffusion V4.5 Curated Inpainting",
    false,
    V4_5_CURATED,
  ),
  model(
    "nai-diffusion-4-5-full-inpainting",
    "NAI Diffusion V4.5 Full Inpainting",
    false,
    V4_5_FULL,
  ),
  model("nai-diffusion-4-curated-preview", "NAI Diffusion V4 Curated", true, V4_CURATED),
  model("nai-diffusion-4-full", "NAI Diffusion V4 Full", true, V4_FULL),
  model(
    "nai-diffusion-4-curated-inpainting",
    "NAI Diffusion V4 Curated Inpainting",
    false,
    V4_CURATED,
  ),
  model("nai-diffusion-4-full-inpainting", "NAI Diffusion V4 Full Inpainting", false, V4_FULL),
  model("nai-diffusion-3", "NAI Diffusion Anime V3", true, V3_BASE),
  model("nai-diffusion-3-inpainting", "NAI Diffusion Anime V3 Inpainting", false, V3_BASE),
  model("nai-diffusion-furry-3", "NAI Diffusion Furry V3", true, FURRY_V3),
  model("nai-diffusion-furry-3-inpainting", "NAI Diffusion Furry V3 Inpainting", false, FURRY_V3),
];

const PROFILE_BY_ID: ReadonlyMap<string, NovelAiModelProfile> = new Map(
  PROFILES.map((profile) => [profile.model_id, profile]),
);

const FAMILY_FALLBACKS: readonly (readonly [RegExp, ProfileOverrides])[] = [
  [/^nai-diffusion-5(?:-|$)/u, V5_FULL],
  [/^nai-diffusion-4-5(?:-|$)/u, V4_5_FULL],
  [/^nai-diffusion-4(?:-|$)/u, V4_FULL],
  [/^nai-diffusion-(?:furry-)?3(?:-|$)/u, V3_BASE],
];

export const NOVELAI_MODEL_PROFILES: readonly NovelAiModelProfile[] = PROFILES;

/**
 * A model id the table does not list keeps only text-to-image: its family is guessed from the id
 * prefix, and features whose request shape differs between releases stay disabled until the table
 * lists the model.
 */
export function resolve_novelai_model(model_id: string): ResolvedNovelAiModel | null {
  const known = PROFILE_BY_ID.get(model_id);
  if (known !== undefined) {
    return { profile: known, confirmed: true };
  }
  for (const [pattern, base] of FAMILY_FALLBACKS) {
    if (pattern.test(model_id)) {
      return {
        profile: model(model_id, model_id, !model_id.endsWith("-inpainting"), {
          ...base,
          vibe_transfer: "unsupported",
          character_reference: false,
          img2img: false,
          inpainting_model_id: null,
          fixed_settings: null,
        }),
        confirmed: false,
      };
    }
  }
  return null;
}

const MODEL_ID_PATTERN = /nai-diffusion-[a-z0-9-]*[a-z0-9]/gu;

/** Model ids named in NovelAI's web client sources, restricted to families this extension can drive. */
export function extract_novelai_model_ids(sources: readonly string[]): readonly string[] {
  const found = new Set<string>();
  for (const source of sources) {
    for (const match of source.matchAll(MODEL_ID_PATTERN)) {
      if (resolve_novelai_model(match[0]) !== null) {
        found.add(match[0]);
      }
    }
  }
  return [...found].sort();
}

/** Selectable models: the table's own entries plus any published id the table does not list yet. */
export function list_novelai_models(
  published_ids: readonly string[] = NOVELAI_PUBLISHED_MODEL_IDS,
): readonly ResolvedNovelAiModel[] {
  const seen = new Set<string>();
  const models: ResolvedNovelAiModel[] = [];
  for (const model_id of [...PROFILES.map((profile) => profile.model_id), ...published_ids]) {
    if (seen.has(model_id)) {
      continue;
    }
    seen.add(model_id);
    const resolved = resolve_novelai_model(model_id);
    if (resolved !== null && resolved.profile.selectable) {
      models.push(resolved);
    }
  }
  return models;
}
