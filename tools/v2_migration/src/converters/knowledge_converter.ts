import { RECORD_SCHEMAS, type KnowledgeEntry } from "@tavern-canvas/storage";

import {
  namespaced_record_base,
  type ConversionContext,
  type ConversionWarning,
} from "../conversion_result.js";
import { deterministic_uuid } from "../id_derivation.js";
import type { LegacySettings } from "../legacy_schema.js";
import { select_owned_fields, to_json_record } from "../payload_extraction.js";
import { SETTINGS_PATH_RULES } from "../settings_path_registry.js";

export interface KnowledgeConversionResult {
  readonly knowledge_entries: readonly KnowledgeEntry[];
  readonly warnings: readonly ConversionWarning[];
}

function build_knowledge_entry(
  context: ConversionContext,
  id: string,
  source_type: string,
  payload: Record<string, unknown>,
): KnowledgeEntry {
  return RECORD_SCHEMAS.knowledge_entries.parse({
    ...namespaced_record_base(context, id),
    source_type,
    payload: to_json_record(payload),
  });
}

export function convert_knowledge(
  legacy: LegacySettings,
  context: ConversionContext,
): KnowledgeConversionResult {
  const warnings: ConversionWarning[] = [];
  const knowledge_entries: KnowledgeEntry[] = [];

  const legacy_all_id = deterministic_uuid(`${context.namespace}:knowledge_converter:legacy_all`);
  knowledge_entries.push(
    build_knowledge_entry(
      context,
      legacy_all_id,
      "legacy_all",
      select_owned_fields(legacy, SETTINGS_PATH_RULES, "knowledge_converter"),
    ),
  );

  const config_id = deterministic_uuid(
    `${context.namespace}:knowledge_converter:knowledge_base_config`,
  );
  knowledge_entries.push(
    build_knowledge_entry(context, config_id, "knowledge_base_config", legacy.knowledgeBaseConfig),
  );

  for (const [name, entry] of Object.entries(legacy.worldBookList)) {
    const id = deterministic_uuid(
      `${context.namespace}:knowledge_converter:builtin_world_book:${name}`,
    );
    knowledge_entries.push(
      build_knowledge_entry(context, id, "builtin_world_book", {
        name,
        enabled: legacy.worldBookEnabled,
        active_entry_id: legacy.worldBookList_id === name,
        ...entry,
      }),
    );
  }

  if (legacy.worldBookConfig !== undefined) {
    const send_data_id = deterministic_uuid(
      `${context.namespace}:knowledge_converter:send_data_world_book_config`,
    );
    knowledge_entries.push(
      build_knowledge_entry(
        context,
        send_data_id,
        "send_data_world_book_config",
        legacy.worldBookConfig,
      ),
    );
  } else {
    warnings.push({
      path: "worldBookConfig",
      message:
        "v2 settings did not have worldBookConfig initialized (send_data World Info was never opened).",
    });
  }

  return { knowledge_entries, warnings };
}
