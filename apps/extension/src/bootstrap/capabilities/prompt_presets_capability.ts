import type { Uuid } from "@tavern-canvas/contracts";
import type { PromptPreset, PromptPresetRepository } from "@tavern-canvas/storage";

import { test_regex_rule } from "../../modules/prompt/regex_transform.js";
import type {
  PromptPresetDraft,
  PromptPresetsCapability,
  PromptPresetsDomainEvent,
  PromptPresetSummary,
  PromptRegexRule,
  PromptReplacementRule,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import {
  as_record,
  DomainEventEmitter,
  read_array,
  read_optional_string,
  read_payload,
  read_string,
  to_json_value,
} from "./_records.js";

export interface PromptPresetsCapabilityDeps {
  readonly repository: PromptPresetRepository;
  readonly namespace: () => string;
  readonly now: () => string;
  readonly new_id: () => Uuid;
}

function to_summary(record: PromptPreset): PromptPresetSummary {
  const payload = read_payload(record);
  return {
    id: record.id,
    display_name: read_string(payload, "display_name", record.id),
    group: read_optional_string(payload, "group"),
    updated_at: record.updated_at,
  };
}

function to_replacement_rules(value: readonly unknown[]): readonly PromptReplacementRule[] {
  return value.flatMap((entry) => {
    const payload = as_record(entry);
    const id = read_optional_string(payload, "id");
    if (id === null) {
      return [];
    }
    return [
      {
        id,
        triggers: read_array(payload, "triggers").filter(
          (trigger): trigger is string => typeof trigger === "string",
        ),
        replacement: read_string(payload, "replacement", ""),
      },
    ];
  });
}

function to_regex_rules(value: readonly unknown[]): readonly PromptRegexRule[] {
  return value.flatMap((entry) => {
    const payload = as_record(entry);
    const id = read_optional_string(payload, "id");
    if (id === null) {
      return [];
    }
    return [
      {
        id,
        pattern: read_string(payload, "pattern", ""),
        flags: read_string(payload, "flags", ""),
        replacement: read_string(payload, "replacement", ""),
      },
    ];
  });
}

export function create_prompt_presets_capability(
  deps: PromptPresetsCapabilityDeps,
): PromptPresetsCapability {
  const events = new DomainEventEmitter<PromptPresetsDomainEvent>();

  async function remove_one(preset_id: Uuid): Promise<void> {
    await deps.repository.delete(deps.namespace(), preset_id);
    events.emit({ type: "preset_removed", preset_id });
  }

  return {
    async load() {
      const records = await deps.repository.list(deps.namespace());
      return records.map(to_summary);
    },
    subscribe: (handler) => events.subscribe(handler),
    async load_draft(preset_id) {
      const record = await deps.repository.get(deps.namespace(), preset_id);
      if (record === null) {
        throw capability_unavailable_error(`Prompt preset ${preset_id} no longer exists`);
      }
      const payload = read_payload(record);
      return {
        id: record.id,
        display_name: read_string(payload, "display_name", record.id),
        group: read_optional_string(payload, "group"),
        fixed_positive_prompt: read_string(payload, "fixed_positive_prompt", ""),
        fixed_negative_prompt: read_string(payload, "fixed_negative_prompt", ""),
        replacement_rules: to_replacement_rules(read_array(payload, "replacement_rules")),
        regex_rules: to_regex_rules(read_array(payload, "regex_rules")),
      } satisfies PromptPresetDraft;
    },
    async save_draft(draft) {
      const namespace = deps.namespace();
      const id = draft.id ?? deps.new_id();
      const existing = await deps.repository.get(namespace, id);
      const now = deps.now();
      const record: PromptPreset = {
        schema_version: 1,
        id,
        namespace,
        record_key: `${namespace}:${id}`,
        created_at: existing?.created_at ?? now,
        updated_at: now,
        payload: to_json_value({
          display_name: draft.display_name,
          group: draft.group,
          fixed_positive_prompt: draft.fixed_positive_prompt,
          fixed_negative_prompt: draft.fixed_negative_prompt,
          replacement_rules: draft.replacement_rules,
          regex_rules: draft.regex_rules,
        }),
      };
      await deps.repository.put(namespace, record);
      const summary = to_summary(record);
      events.emit({ type: "preset_upserted", preset: summary });
      return summary;
    },
    remove: remove_one,
    async bulk_remove(preset_ids) {
      for (const preset_id of preset_ids) {
        await remove_one(preset_id);
      }
    },
    test_regex: (rule, sample_text) => Promise.resolve(test_regex_rule(rule, sample_text)),
  };
}
