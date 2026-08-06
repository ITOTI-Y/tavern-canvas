import { RECORD_SCHEMAS, type PromptPreset, type RegexRule } from "@tavern-canvas/storage";

import {
  namespaced_record_base,
  type ConversionContext,
  type ConversionWarning,
} from "../conversion_result.js";
import { deterministic_uuid } from "../id_derivation.js";
import type { LegacySettings } from "../legacy_schema.js";
import { select_owned_fields, to_json_record } from "../payload_extraction.js";
import { SETTINGS_PATH_RULES } from "../settings_path_registry.js";

export interface PromptConversionResult {
  readonly prompt_presets: readonly PromptPreset[];
  readonly regex_rules: readonly RegexRule[];
  readonly warnings: readonly ConversionWarning[];
}

function build_prompt_preset(
  context: ConversionContext,
  id: string,
  payload: Record<string, unknown>,
): PromptPreset {
  return RECORD_SCHEMAS.prompt_presets.parse({
    ...namespaced_record_base(context, id),
    payload: to_json_record(payload),
  });
}

function build_regex_rule(
  context: ConversionContext,
  id: string,
  payload: Record<string, unknown>,
): RegexRule {
  return RECORD_SCHEMAS.regex_rules.parse({
    ...namespaced_record_base(context, id),
    payload: to_json_record(payload),
  });
}

export function convert_prompts(
  legacy: LegacySettings,
  context: ConversionContext,
): PromptConversionResult {
  const warnings: ConversionWarning[] = [];
  const prompt_presets: PromptPreset[] = [];
  const regex_rules: RegexRule[] = [];

  const legacy_all_id = deterministic_uuid(`${context.namespace}:prompt_converter:legacy_all`);
  prompt_presets.push(
    build_prompt_preset(
      context,
      legacy_all_id,
      select_owned_fields(legacy, SETTINGS_PATH_RULES, "prompt_converter"),
    ),
  );

  for (const [name, preset] of Object.entries(legacy.yushe)) {
    const id = deterministic_uuid(`${context.namespace}:prompt_converter:yushe:${name}`);
    prompt_presets.push(build_prompt_preset(context, id, { kind: "yushe", name, ...preset }));
  }

  for (const [name, profile] of Object.entries(legacy.test_context_profiles)) {
    const id = deterministic_uuid(`${context.namespace}:prompt_converter:test_context:${name}`);
    prompt_presets.push(
      build_prompt_preset(context, id, { kind: "llm_test_context", name, ...profile }),
    );
  }

  const persona_ai_id = deterministic_uuid(
    `${context.namespace}:prompt_converter:persona_ai_defaults`,
  );
  prompt_presets.push(
    build_prompt_preset(context, persona_ai_id, {
      kind: "llm_prompt_builder_defaults",
      characterAI: legacy.characterAI,
      outfitAI: legacy.outfitAI,
      translation_model: legacy.translation_model,
      translation_system_prompt: legacy.translation_system_prompt,
      ai_test_system: legacy.ai_test_system,
      ai_test_user: legacy.ai_test_user,
      ai_test_output: legacy.ai_test_output,
      defaultImageDemand: legacy.defaultImageDemand,
    }),
  );

  for (const [name, profile] of Object.entries(legacy.prompt_replace)) {
    const id = deterministic_uuid(`${context.namespace}:prompt_converter:prompt_replace:${name}`);
    regex_rules.push(build_regex_rule(context, id, { kind: "prompt_replace", name, ...profile }));
  }

  for (const [name, profile] of Object.entries(legacy.regex_profiles)) {
    const id = deterministic_uuid(`${context.namespace}:prompt_converter:regex_profile:${name}`);
    regex_rules.push(build_regex_rule(context, id, { kind: "regex_profile", name, ...profile }));
  }

  for (const [name, profile] of Object.entries(legacy.word_replacement_profiles)) {
    const id = deterministic_uuid(`${context.namespace}:prompt_converter:word_replacement:${name}`);
    regex_rules.push(build_regex_rule(context, id, { kind: "word_replacement", name, ...profile }));
  }

  return { prompt_presets, regex_rules, warnings };
}
