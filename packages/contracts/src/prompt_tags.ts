import type { ProviderId } from "./provider.js";
import type { NovelAiPromptPresetKey } from "./providers/novelai_models.js";
import { resolve_novelai_model } from "./providers/novelai_models.js";
import { NOVELAI_PROMPT_PRESETS } from "./providers/novelai_prompt_presets.js";
import type { PromptTagKind, PromptTagSelection } from "./prompt_tag_selection.js";

export interface PromptTagPreset {
  readonly id: string;
  readonly kind: PromptTagKind;
  /** Display name of the built-in group, or `null` for a saved preset. */
  readonly group: string | null;
  readonly label: string;
  readonly text: string;
}

const GROUP_LABELS: Readonly<Record<NovelAiPromptPresetKey, string>> = {
  v3: "NAI Diffusion V3",
  furry_v3: "NAI Diffusion Furry V3",
  v4_curated: "NAI Diffusion V4 Curated",
  v4_full: "NAI Diffusion V4 Full",
  v4_5_curated: "NAI Diffusion V4.5 Curated",
  v4_5_full: "NAI Diffusion V4.5 Full",
  v5: "NAI Diffusion V5",
};

const TIER_LABELS: Readonly<Record<string, string>> = {
  standard: "Standard",
  light: "Light",
  heavy: "Heavy",
  human_focus: "Human Focus",
  furry_focus: "Furry Focus",
  none: "None",
};

const FALLBACK_GROUP: NovelAiPromptPresetKey = "v4_5_full";

/** NovelAI's web client presets for every model group, without the ones that add no text. */
export function builtin_prompt_tag_presets(): readonly PromptTagPreset[] {
  return (
    Object.entries(NOVELAI_PROMPT_PRESETS) as [
      NovelAiPromptPresetKey,
      (typeof NOVELAI_PROMPT_PRESETS)[NovelAiPromptPresetKey],
    ][]
  ).flatMap(([group, texts]) => {
    const presets = (kind: PromptTagKind, tiers: Readonly<Record<string, string | undefined>>) =>
      Object.entries(tiers).flatMap(([tier, text]) =>
        text === undefined || text === ""
          ? []
          : [
              {
                id: `novelai:${group}:${tier}`,
                kind,
                group: GROUP_LABELS[group],
                label: TIER_LABELS[tier] ?? tier,
                text,
              },
            ],
      );
    return [
      ...presets("quality", texts.quality),
      ...presets("undesired_content", texts.undesired_content),
    ];
  });
}

export function custom_prompt_tag_preset_id(record_id: string): string {
  return `custom:${record_id}`;
}

/**
 * A NovelAI profile starts with its model's Standard quality tags and Heavy undesired content, as
 * NovelAI's web client does; other providers start with both switched off.
 */
export function default_prompt_tag_selection(
  provider_id: ProviderId,
  model_id: string | null,
): PromptTagSelection {
  const novelai_group =
    provider_id === "novelai" && model_id !== null
      ? resolve_novelai_model(model_id)?.profile.prompt_presets
      : undefined;
  const group = novelai_group ?? FALLBACK_GROUP;
  const enabled = provider_id === "novelai";
  return {
    quality: { enabled, preset_id: `novelai:${group}:standard` },
    undesired_content: { enabled, preset_id: `novelai:${group}:heavy` },
  };
}
