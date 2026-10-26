import type {
  NovelAiIgnoredParameter,
  NovelAiNoiseSchedule,
  NovelAiQualityPreset,
  NovelAiSampler,
  NovelAiUndesiredContentPreset,
} from "@tavern-canvas/contracts";

type Translate = (key: string) => string;

/** NovelAI's own sampler names, which its web client shows untranslated. */
export const SAMPLER_NAMES: Readonly<Record<NovelAiSampler, string>> = {
  k_euler: "Euler",
  k_euler_ancestral: "Euler Ancestral",
  k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
  k_dpmpp_2m_sde: "DPM++ 2M SDE",
  k_dpmpp_2m: "DPM++ 2M",
  k_dpmpp_sde: "DPM++ SDE",
  ddim_v3: "DDIM",
};

export const NOISE_SCHEDULE_NAMES: Readonly<Record<NovelAiNoiseSchedule, string>> = {
  native: "Native",
  karras: "Karras",
  exponential: "Exponential",
  polyexponential: "Polyexponential",
};

export function quality_preset_label(t: Translate, preset: NovelAiQualityPreset): string {
  switch (preset) {
    case "standard":
      return t("settings.novelai.quality_standard");
    case "light":
      return t("settings.novelai.quality_light");
    case "none":
      return t("settings.novelai.quality_none");
  }
}

export function undesired_content_label(
  t: Translate,
  preset: NovelAiUndesiredContentPreset,
): string {
  switch (preset) {
    case "heavy":
      return t("settings.novelai.uc_heavy");
    case "light":
      return t("settings.novelai.uc_light");
    case "human_focus":
      return t("settings.novelai.uc_human_focus");
    case "furry_focus":
      return t("settings.novelai.uc_furry_focus");
    case "none":
      return t("settings.novelai.uc_none");
  }
}

export function ignored_parameter_label(t: Translate, parameter: NovelAiIgnoredParameter): string {
  switch (parameter) {
    case "vibe_transfer":
      return t("settings.novelai.ignored_vibe_transfer");
    case "smea":
      return t("settings.novelai.ignored_smea");
    case "cfg_rescale":
      return t("settings.novelai.ignored_cfg_rescale");
    case "variety_plus":
      return t("settings.novelai.ignored_variety_plus");
    case "sampler":
      return t("settings.novelai.ignored_sampler");
    case "steps":
      return t("settings.novelai.ignored_steps");
    case "undesired_content_preset":
      return t("settings.novelai.ignored_undesired_content");
  }
}
