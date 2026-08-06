import { ProviderProfileSchema, type ProviderProfile } from "@tavern-canvas/storage";

import {
  namespaced_record_base,
  type ConversionContext,
  type ConversionWarning,
  type ConverterResult,
  type SecretTransferOperation,
} from "../conversion_result.js";
import { deterministic_uuid } from "../id_derivation.js";
import type { LegacySettings } from "../legacy_schema.js";
import { redact_secret_paths, select_owned_fields, to_json_record } from "../payload_extraction.js";
import { SETTINGS_PATH_RULES } from "../settings_path_registry.js";

function build_provider_profile(
  context: ConversionContext,
  id: string,
  provider_id: string,
  payload: Record<string, unknown>,
): ProviderProfile {
  return ProviderProfileSchema.parse({
    ...namespaced_record_base(context, id),
    provider_id,
    payload: to_json_record(payload),
  });
}

function omit_keys<T extends Record<string, unknown>>(
  value: T,
  keys: readonly (keyof T)[],
): Record<string, unknown> {
  const excluded = new Set<unknown>(keys);
  return Object.fromEntries(Object.entries(value).filter(([key]) => !excluded.has(key)));
}

function push_secret(
  secret_transfers: SecretTransferOperation[],
  plaintext_value: string,
  rest: Omit<SecretTransferOperation, "operation" | "plaintext_value">,
): void {
  if (plaintext_value.trim().length === 0) {
    return;
  }
  secret_transfers.push({ operation: "secret_transfer", plaintext_value, ...rest });
}

// `provider_id` values below include "llm" and "legacy_all", which fall
// outside the roadmap §5 `provider_ids` enum — `storage`'s `provider_id`
// field is deliberately a bare string, not that enum, so LLM profiles and
// the catch-all "everything else" record have somewhere to live. This is an
// intentional, undocumented-elsewhere contract deviation (Stage 04 review
// M6); record it before Stage 06 starts consuming provider profiles by
// `provider_id`.
export function convert_provider(
  legacy: LegacySettings,
  context: ConversionContext,
): ConverterResult<ProviderProfile> {
  const warnings: ConversionWarning[] = [];
  const secret_transfers: SecretTransferOperation[] = [];
  const records: ProviderProfile[] = [];

  // Every provider_converter-owned path, secret-redacted, so nothing is lost
  // even where the per-profile expansion below is imprecise about which v2
  // route a shared legacy default scalar originally applied to.
  const legacy_all_id = deterministic_uuid(`${context.namespace}:provider_converter:legacy_all`);
  const legacy_all_payload = redact_secret_paths(
    select_owned_fields(legacy, SETTINGS_PATH_RULES, "provider_converter"),
    [],
    SETTINGS_PATH_RULES,
  ) as Record<string, unknown>;
  records.push(build_provider_profile(context, legacy_all_id, "legacy_all", legacy_all_payload));
  warnings.push({
    path: "mode",
    message: `v2 "mode" was ${JSON.stringify(legacy.mode)}; the migration runner resolves this to active_provider_profile_id.`,
  });

  for (const [name, profile] of Object.entries(legacy.novelai_profiles)) {
    const id = deterministic_uuid(`${context.namespace}:provider_converter:novelai:${name}`);
    records.push(
      build_provider_profile(context, id, "novelai", omit_keys(profile, ["novelaiApi"])),
    );
    push_secret(secret_transfers, profile.novelaiApi, {
      credential_kind: "novelai_token",
      source_path: `novelai_profiles.${name}.novelaiApi`,
      provider_profile_id: id,
    });
  }

  for (const [name, profile] of Object.entries(legacy.comfyui_profiles)) {
    const id = deterministic_uuid(`${context.namespace}:provider_converter:comfyui:${name}`);
    records.push(build_provider_profile(context, id, "comfyui", { ...profile }));
  }

  for (const [name, profile] of Object.entries(legacy.llm_profiles)) {
    const id = deterministic_uuid(`${context.namespace}:provider_converter:llm:${name}`);
    records.push(build_provider_profile(context, id, "llm", omit_keys(profile, ["api_key"])));
    push_secret(secret_transfers, profile.api_key, {
      credential_kind: "llm_profile_api_key",
      source_path: `llm_profiles.${name}.api_key`,
      provider_profile_id: id,
    });
  }

  const banana_id = deterministic_uuid(
    `${context.namespace}:provider_converter:openai_image:banana`,
  );
  records.push(
    build_provider_profile(context, banana_id, "openai_image", {
      ...omit_keys(legacy.banana, ["apiKey"]),
      character_presets: legacy.bananaCharacterPresets,
      character_preset_id: legacy.bananaCharacterPresetId,
    }),
  );
  warnings.push({
    path: "banana",
    message:
      'v2 "banana" (Banana/Grok) used an OpenAI-compatible API; remapped to provider_id "openai_image".',
  });
  push_secret(secret_transfers, legacy.banana.apiKey, {
    credential_kind: "banana_api_key",
    source_path: "banana.apiKey",
    provider_profile_id: banana_id,
  });

  const assistant_id = deterministic_uuid(
    `${context.namespace}:provider_converter:llm:chatu8_ai_assistant`,
  );
  records.push(
    build_provider_profile(
      context,
      assistant_id,
      "llm",
      omit_keys(legacy.chatu8_ai_assistant, ["api_key"]),
    ),
  );
  push_secret(secret_transfers, legacy.chatu8_ai_assistant.api_key, {
    credential_kind: "chatu8_ai_assistant_api_key",
    source_path: "chatu8_ai_assistant.api_key",
    provider_profile_id: assistant_id,
  });

  push_secret(secret_transfers, legacy.st_chatu8_sd_auth, {
    credential_kind: "sd_webui_auth",
    source_path: "st_chatu8_sd_auth",
    provider_profile_id: legacy_all_id,
  });
  push_secret(secret_transfers, legacy.novelaiApi, {
    credential_kind: "novelai_token",
    source_path: "novelaiApi",
    provider_profile_id: legacy_all_id,
  });
  push_secret(secret_transfers, legacy.novelaiApi_id, {
    credential_kind: "novelai_token",
    source_path: "novelaiApi_id",
    provider_profile_id: legacy_all_id,
  });
  push_secret(secret_transfers, legacy.ai_token, {
    credential_kind: "legacy_ai_token",
    source_path: "ai_token",
    provider_profile_id: legacy_all_id,
  });

  return { records, warnings, secret_transfers };
}
