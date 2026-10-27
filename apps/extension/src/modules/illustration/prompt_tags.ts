import {
  builtin_prompt_tag_presets,
  custom_prompt_tag_preset_id,
  default_prompt_tag_selection,
  resolve_novelai_model,
  type ImageGenerationRequest,
  type PromptTagKind,
  type PromptTagPreset,
  type PromptTagSelection,
  type ProviderId,
} from "@tavern-canvas/contracts";

import type { AssetRecordSummary } from "../../ui/contracts/ui_capabilities.js";
import { join_prompt_parts } from "../prompt/tag_normalizer.js";

/** Saved presets from the library's `prompt_tag` category, in library order. */
export function custom_prompt_tag_presets(
  records: readonly AssetRecordSummary[],
): readonly PromptTagPreset[] {
  return records.flatMap((record) => {
    const { kind, text } = record.payload;
    return (kind === "quality" || kind === "undesired_content") && typeof text === "string"
      ? [
          {
            id: custom_prompt_tag_preset_id(record.id),
            kind,
            group: null,
            label: record.display_name,
            text: text.trim(),
          },
        ]
      : [];
  });
}

/** The saved selection, or the provider's default until one is saved. */
export function effective_prompt_tags(profile: {
  readonly provider_id: ProviderId;
  readonly model_id?: string | null;
  readonly prompt_tags: PromptTagSelection | null;
}): PromptTagSelection {
  return (
    profile.prompt_tags ??
    default_prompt_tag_selection(profile.provider_id, profile.model_id ?? null)
  );
}

/** Built-in presets first, then the saved ones. */
export function prompt_tag_presets(
  records: readonly AssetRecordSummary[],
): readonly PromptTagPreset[] {
  return [...builtin_prompt_tag_presets(), ...custom_prompt_tag_presets(records)];
}

function selected_text(
  selection: PromptTagSelection,
  kind: PromptTagKind,
  presets: readonly PromptTagPreset[],
): string {
  const choice = selection[kind];
  if (!choice.enabled) {
    return "";
  }
  return (
    presets.find((preset) => preset.id === choice.preset_id && preset.kind === kind)?.text ?? ""
  );
}

function takes_prompt_tags(request: ImageGenerationRequest): boolean {
  return (
    request.provider_id !== "novelai" ||
    request.action === "generate" ||
    request.action === "img2img" ||
    request.action === "infill"
  );
}

/**
 * Appends the selected quality tags to the positive prompt and puts the selected undesired
 * content before the negative prompt. A NovelAI model that fixes its own undesired content keeps
 * it, so none is injected there.
 */
export function inject_prompt_tags(
  request: ImageGenerationRequest,
  selection: PromptTagSelection,
  presets: readonly PromptTagPreset[],
): ImageGenerationRequest {
  if (!takes_prompt_tags(request)) {
    return request;
  }
  const quality = selected_text(selection, "quality", presets);
  const fixed_undesired =
    request.provider_id === "novelai" &&
    "model_id" in request &&
    resolve_novelai_model(request.model_id)?.profile.fixed_settings?.undesired_content_preset !==
      undefined;
  const undesired = fixed_undesired ? "" : selected_text(selection, "undesired_content", presets);
  if (quality === "" && undesired === "") {
    return request;
  }
  const negative_prompt = join_prompt_parts([undesired, request.negative_prompt]);
  return {
    ...request,
    prompt: join_prompt_parts([request.prompt, quality]),
    ...(negative_prompt === "" ? {} : { negative_prompt }),
  };
}
