import type { ProviderId } from "@tavern-canvas/contracts";

export type Translate = (key: string) => string;

export const PROVIDER_IDS = [
  "sd_webui",
  "novelai",
  "comfyui",
  "openai_image",
  "google_image",
] as const satisfies readonly ProviderId[];

/** A `switch` over a literal string per case (never a template-interpolated key), matching
 * `route_nav.ts`'s `route_label` precedent so `tools/locale_check`'s dynamic-key rule can
 * statically verify every call site. */
export function provider_type_label(t: Translate, provider_id: ProviderId): string {
  switch (provider_id) {
    case "sd_webui":
      return t("settings.provider_profiles.provider_types.sd_webui");
    case "novelai":
      return t("settings.provider_profiles.provider_types.novelai");
    case "comfyui":
      return t("settings.provider_profiles.provider_types.comfyui");
    case "openai_image":
      return t("settings.provider_profiles.provider_types.openai_image");
    case "google_image":
      return t("settings.provider_profiles.provider_types.google_image");
  }
}
