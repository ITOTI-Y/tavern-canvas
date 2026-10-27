import {
  resolve_novelai_model,
  type NovelAiDiffusionRequest,
  type NovelAiModelProfile,
} from "@tavern-canvas/contracts";

export const DEFAULT_NOVELAI_MODEL_ID = "nai-diffusion-5-curated";

export type NovelAiDiffusionParameters = Pick<
  NovelAiDiffusionRequest,
  | "model_id"
  | "sampler"
  | "width"
  | "height"
  | "steps"
  | "scale"
  | "cfg_rescale"
  | "noise_schedule"
  | "quality_preset"
  | "undesired_content_preset"
  | "smea"
  | "dyn"
  | "variety_plus"
>;

function require_profile(model_id: string): NovelAiModelProfile {
  const resolved = resolve_novelai_model(model_id);
  if (resolved === null) {
    throw new Error(`"${model_id}" is not a NovelAI image model this extension can drive`);
  }
  return resolved.profile;
}

/** The parameters NovelAI's web client starts a new generation with for this model. */
export function novelai_default_parameters(model_id: string): NovelAiDiffusionParameters {
  const profile = require_profile(model_id);
  return {
    model_id,
    sampler: profile.fixed_settings?.sampler ?? "k_euler_ancestral",
    width: 832,
    height: 1216,
    steps: profile.fixed_settings?.steps ?? profile.default_steps,
    scale: profile.default_scale,
    cfg_rescale: 0,
    noise_schedule: "karras",
    // The profile's prompt tag selection injects quality tags and undesired content as text.
    quality_preset: "none",
    undesired_content_preset: profile.fixed_settings?.undesired_content_preset ?? "none",
    smea: false,
    dyn: false,
    variety_plus: false,
  };
}
