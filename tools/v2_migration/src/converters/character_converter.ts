import { RECORD_SCHEMAS, type CharacterProfile } from "@tavern-canvas/storage";

import {
  namespaced_record_base,
  type ConversionContext,
  type ConversionWarning,
} from "../conversion_result.js";
import { deterministic_uuid } from "../id_derivation.js";
import type { LegacySettings } from "../legacy_schema.js";
import { select_owned_fields, to_json_record } from "../payload_extraction.js";
import { SETTINGS_PATH_RULES } from "../settings_path_registry.js";

export interface CharacterConversionResult {
  readonly character_profiles: readonly CharacterProfile[];
  readonly warnings: readonly ConversionWarning[];
}

function build_character_profile(
  context: ConversionContext,
  id: string,
  payload: Record<string, unknown>,
): CharacterProfile {
  return RECORD_SCHEMAS.character_profiles.parse({
    ...namespaced_record_base(context, id),
    payload: to_json_record(payload),
  });
}

export function convert_characters(
  legacy: LegacySettings,
  context: ConversionContext,
): CharacterConversionResult {
  const warnings: ConversionWarning[] = [];
  const character_profiles: CharacterProfile[] = [];

  const legacy_all_id = deterministic_uuid(`${context.namespace}:character_converter:legacy_all`);
  character_profiles.push(
    build_character_profile(
      context,
      legacy_all_id,
      select_owned_fields(legacy, SETTINGS_PATH_RULES, "character_converter"),
    ),
  );

  const persona_presets = legacy.personaProfiles?.presets ?? {};
  for (const [name, preset] of Object.entries(persona_presets)) {
    const id = deterministic_uuid(`${context.namespace}:character_converter:persona:${name}`);
    character_profiles.push(
      build_character_profile(context, id, { kind: "persona_preset", name, ...preset }),
    );
  }
  if (legacy.personaProfiles === undefined) {
    warnings.push({
      path: "personaProfiles",
      message:
        "v2 settings did not have personaProfiles initialized; no persona presets to convert.",
    });
  }

  return { character_profiles, warnings };
}
