import { z } from "zod";

import {
  build_record_key,
  NamespacedRecordBaseSchema,
  type ConversionContext,
  type ConversionWarning,
} from "../conversion_result.js";
import { deterministic_uuid } from "../id_derivation.js";
import { to_bool } from "../legacy_coercion.js";
import type { LegacySettings } from "../legacy_schema.js";
import { select_owned_fields, to_json_record } from "../payload_extraction.js";
import { SETTINGS_PATH_RULES } from "../settings_path_registry.js";

import {
  TavernCanvasSettingsSchema,
  type TavernCanvasSettings,
} from "@tavern-canvas/contracts";

export { TavernCanvasSettingsSchema };
export type { TavernCanvasSettings };

/**
 * `packages/storage` has no dedicated business store yet for v2's theme,
 * trigger-tag, cache-policy, and floating-entry preferences — every existing
 * store beyond `provider_profiles`/`knowledge_entries`/`image_records` is
 * presently an untyped `namespaced_schema({})`. This record is structurally
 * identical to that base shape so it slots into whichever store a future
 * stage designates (reported as a schema gap in the Task 5 report).
 */
export const LegacyPreferenceRecordSchema = NamespacedRecordBaseSchema.extend({
  payload: z.record(z.string(), z.unknown()),
});
export type LegacyPreferenceRecord = z.infer<typeof LegacyPreferenceRecordSchema>;

export interface SettingsConversionResult {
  readonly settings: TavernCanvasSettings;
  readonly legacy_preferences: LegacyPreferenceRecord;
  readonly warnings: readonly ConversionWarning[];
}

export function convert_settings(
  legacy: LegacySettings,
  context: ConversionContext,
): SettingsConversionResult {
  const warnings: ConversionWarning[] = [
    {
      path: "locale",
      message: "v2 has no UI locale setting; defaulted to 'auto'.",
    },
    {
      path: "global_concurrency",
      message: "v2 has no concurrency-limit setting; defaulted to 1.",
    },
    {
      path: "active_provider_profile_id",
      message: `Unresolved; the migration runner must map v2 "mode" (${JSON.stringify(
        legacy.mode,
      )}) to a provider_profiles id created by provider_converter.`,
    },
    {
      path: "gateway",
      message: "v2 has no Gateway concept; defaulted to an unconfigured Gateway.",
    },
    {
      path: "ui.color_mode",
      message:
        "v2's rich custom theme system (theme_id/themes/fabThemes) has no v3 color_mode equivalent; preserved verbatim in legacy_preferences instead of being mapped.",
    },
    {
      path: "ui.inspector_width",
      message: "v2 has no inspector panel; defaulted to 360.",
    },
  ];

  const settings = TavernCanvasSettingsSchema.parse({
    schema_version: 1,
    active_namespace: context.namespace,
    locale: "auto",
    active_provider_profile_id: null,
    global_concurrency: 1,
    auto_generation_enabled: to_bool(legacy.autoLLMImageGen),
    fallback_generation_enabled: to_bool(legacy.enablePregen),
    gateway: { endpoint: null, token_secret_id: null, http_acknowledgments: {} },
    ui: {
      color_mode: "system",
      inspector_width: 360,
      inspector_collapsed: false,
      optional_entry_enabled: legacy.enable_chatu8_fab,
    },
  } satisfies TavernCanvasSettings);

  const id = deterministic_uuid(`${context.namespace}:legacy_preferences:settings_converter`);
  const payload = to_json_record(
    select_owned_fields(legacy, SETTINGS_PATH_RULES, "settings_converter"),
  );
  const legacy_preferences = LegacyPreferenceRecordSchema.parse({
    schema_version: 1,
    id,
    namespace: context.namespace,
    record_key: build_record_key(context.namespace, id),
    created_at: context.migrated_at,
    updated_at: context.migrated_at,
    payload,
  } satisfies LegacyPreferenceRecord);

  return { settings, legacy_preferences, warnings };
}
