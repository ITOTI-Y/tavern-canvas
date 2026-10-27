import type {
  NovelAiIgnoredParameter,
  NovelAiNoiseSchedule,
  NovelAiSampler,
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
  }
}
