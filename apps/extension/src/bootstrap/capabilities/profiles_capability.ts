import {
  NovelAiGenerationDefaultsSchema,
  PromptTagSelectionSchema,
  ProviderIdSchema,
  type PromptTagSelection,
  derive_provider_credential_reference,
  type NovelAiGenerationDefaults,
  type ImageGenerationRequest,
  type ProviderId,
  type Uuid,
} from "@tavern-canvas/contracts";
import { ProviderAdapterError, type ProviderAdapter } from "@tavern-canvas/providers";
import type { ProviderProfile, ProviderProfileRepository } from "@tavern-canvas/storage";

import type { SecretDestinationPort } from "../../host/secret_destination.js";
import type {
  ProfileConnectionTestResult,
  ProfilesCapability,
  ProfilesDomainEvent,
  ProviderProfileDraft,
  ProviderProfileSummary,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import {
  as_record,
  DomainEventEmitter,
  read_array,
  read_boolean,
  read_payload,
  read_string,
  to_json_value,
} from "./_records.js";

/** A key name only, never credential material: plaintext never reaches IndexedDB (`assert_safe_provider_payload`). */
export const VAULT_KEY_FIELD = "vault_key";

/** Generation defaults a NovelAI profile starts every request from; see `NovelAiGenerationDefaultsSchema`. */
export const NOVELAI_DEFAULTS_FIELD = "novelai_defaults";
const PROMPT_TAGS_FIELD = "prompt_tags";

/** Adapter-owned fields live in their own sub-object because adapter schemas are strict and would reject presentation fields. */
const ADAPTER_PROFILE_FIELD = "provider_profile";

export interface ProfilesCapabilityDeps {
  readonly repository: ProviderProfileRepository;
  readonly namespace: () => string;
  readonly load_adapters: () => Promise<
    Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>
  >;
  readonly secrets: SecretDestinationPort | null;
  /**
   * Whether the selected backend still holds a reference; `null` when it cannot tell without
   * revealing secrets (SillyTavern's vault), so the stored reference is trusted.
   */
  readonly credential_present: (reference: string) => Promise<boolean | null>;
  readonly now: () => string;
}

const DEFAULT_MAX_BYTES = 20_000_000;

function first_string(values: readonly unknown[]): string | null {
  const value = values[0];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function build_adapter_profile(
  draft: ProviderProfileDraft,
  existing: ProviderProfile | null,
): Readonly<Record<string, unknown>> {
  const inherited =
    existing?.provider_id === draft.provider_id
      ? as_record(read_payload(existing)[ADAPTER_PROFILE_FIELD])
      : {};
  const common = {
    output_mime_type_allowlist: ["image/png"],
    max_response_bytes: DEFAULT_MAX_BYTES,
    max_input_asset_bytes: DEFAULT_MAX_BYTES,
    ...inherited,
    model_allowlist: [draft.model_id.trim()],
  };
  switch (draft.provider_id) {
    case "sd_webui":
      return {
        vae_allowlist: [],
        adetailer_model_allowlist: [],
        controlnet_model_allowlist: [],
        ...common,
      };
    case "novelai":
      return { max_archive_entries: 8, ...common };
    case "comfyui":
      return {
        ...common,
        workflow_allowlist: draft.workflow_id === null ? [] : [draft.workflow_id],
      };
    case "openai_image":
      return { remote_asset_origin_allowlist: [], ...common };
    case "google_image":
      return common;
  }
}

export function adapter_profile_of(record: ProviderProfile): Readonly<Record<string, unknown>> {
  return {
    ...as_record(read_payload(record)[ADAPTER_PROFILE_FIELD]),
    profile_id: record.id,
    provider_id: record.provider_id,
  };
}

function to_summary(record: ProviderProfile): ProviderProfileSummary {
  const payload = read_payload(record);
  const adapter_profile = as_record(payload[ADAPTER_PROFILE_FIELD]);
  return {
    id: record.id,
    provider_id: ProviderIdSchema.parse(record.provider_id),
    display_name: read_string(payload, "display_name", record.id),
    model_id: first_string(read_array(adapter_profile, "model_allowlist")),
    workflow_id: first_string(read_array(adapter_profile, "workflow_allowlist")),
    is_default: read_boolean(payload, "is_default", false),
    credential_reference:
      typeof payload[VAULT_KEY_FIELD] === "string" ? payload[VAULT_KEY_FIELD] : null,
    updated_at: record.updated_at,
    novelai_defaults: read_novelai_defaults(record),
    prompt_tags: read_prompt_tags(record),
  };
}

export function read_prompt_tags(record: ProviderProfile): PromptTagSelection | null {
  const parsed = PromptTagSelectionSchema.safeParse(read_payload(record)[PROMPT_TAGS_FIELD]);
  return parsed.success ? parsed.data : null;
}

export function read_novelai_defaults(record: ProviderProfile): NovelAiGenerationDefaults | null {
  const parsed = NovelAiGenerationDefaultsSchema.safeParse(
    read_payload(record)[NOVELAI_DEFAULTS_FIELD],
  );
  return parsed.success ? parsed.data : null;
}

export function create_profiles_capability(deps: ProfilesCapabilityDeps): ProfilesCapability {
  const events = new DomainEventEmitter<ProfilesDomainEvent>();

  async function read(profile_id: Uuid): Promise<ProviderProfile> {
    const record = await deps.repository.get(deps.namespace(), profile_id);
    if (record === null) {
      throw capability_unavailable_error(`Provider profile ${profile_id} no longer exists`);
    }
    return record;
  }

  return {
    async load() {
      const records = await deps.repository.list(deps.namespace());
      return Promise.all(
        records.map(async (record) => {
          const summary = to_summary(record);
          if (summary.credential_reference === null) {
            return summary;
          }
          // Switching credential storage leaves references whose keys live in the old backend.
          const present = await deps
            .credential_present(summary.credential_reference)
            .catch(() => false);
          return present === false ? { ...summary, credential_reference: null } : summary;
        }),
      );
    },
    subscribe: (handler) => events.subscribe(handler),
    async save(draft) {
      const namespace = deps.namespace();
      const existing = await deps.repository.get(namespace, draft.id);
      const now = deps.now();
      const payload = {
        ...read_payload(existing ?? ({ payload: {} } as ProviderProfile)),
        display_name: draft.display_name,
        is_default: draft.is_default,
        [ADAPTER_PROFILE_FIELD]: to_json_value(build_adapter_profile(draft, existing)),
      };
      if (existing !== null && existing.provider_id !== draft.provider_id) {
        Reflect.deleteProperty(payload, VAULT_KEY_FIELD);
      }
      const record: ProviderProfile = {
        schema_version: 1,
        id: draft.id,
        namespace,
        record_key: `${namespace}:${draft.id}`,
        created_at: existing?.created_at ?? now,
        updated_at: now,
        provider_id: draft.provider_id,
        payload,
      };
      const adapter = (await deps.load_adapters())[draft.provider_id];
      if (adapter === undefined) {
        throw capability_unavailable_error(`Provider ${draft.provider_id} is unavailable`);
      }
      adapter.validate_profile(adapter_profile_of(record));
      await deps.repository.put(namespace, record);
      const summary = to_summary(record);
      events.emit({ type: "profile_upserted", profile: summary });
      return summary;
    },
    async remove(profile_id) {
      await deps.repository.delete(deps.namespace(), profile_id);
      events.emit({ type: "profile_removed", profile_id });
    },
    async set_credential(profile_id, plaintext_value) {
      if (plaintext_value.trim().length === 0) {
        throw new TypeError("A provider credential must not be blank");
      }
      if (deps.secrets === null) {
        throw capability_unavailable_error(
          "The selected credential storage backend is unavailable",
        );
      }
      const record = await read(profile_id);
      const reference = derive_provider_credential_reference(record.namespace, profile_id);
      await deps.secrets.write_secret(reference, plaintext_value);
      const updated: ProviderProfile = {
        ...record,
        updated_at: deps.now(),
        payload: to_json_value({ ...read_payload(record), [VAULT_KEY_FIELD]: reference }),
      };
      await deps.repository.put(record.namespace, updated);
      const summary = to_summary(updated);
      events.emit({ type: "profile_upserted", profile: summary });
      return summary;
    },
    async save_novelai_defaults(profile_id, defaults) {
      const record = await read(profile_id);
      if (record.provider_id !== "novelai") {
        throw new TypeError(`Provider profile ${profile_id} is not a NovelAI profile`);
      }
      const updated: ProviderProfile = {
        ...record,
        updated_at: deps.now(),
        payload: to_json_value({
          ...read_payload(record),
          [NOVELAI_DEFAULTS_FIELD]: NovelAiGenerationDefaultsSchema.parse(defaults),
        }),
      };
      await deps.repository.put(record.namespace, updated);
      const summary = to_summary(updated);
      events.emit({ type: "profile_upserted", profile: summary });
      return summary;
    },
    async save_prompt_tags(profile_id, selection) {
      const record = await read(profile_id);
      const updated: ProviderProfile = {
        ...record,
        updated_at: deps.now(),
        payload: to_json_value({
          ...read_payload(record),
          [PROMPT_TAGS_FIELD]: PromptTagSelectionSchema.parse(selection),
        }),
      };
      await deps.repository.put(record.namespace, updated);
      const summary = to_summary(updated);
      events.emit({ type: "profile_upserted", profile: summary });
      return summary;
    },
    async clear_credential(profile_id) {
      const record = await read(profile_id);
      const payload = { ...read_payload(record) };
      const reference = payload[VAULT_KEY_FIELD];
      Reflect.deleteProperty(payload, VAULT_KEY_FIELD);
      if (typeof reference === "string") {
        await deps.secrets?.delete_secret?.(reference);
      }
      const updated: ProviderProfile = {
        ...record,
        updated_at: deps.now(),
        payload: to_json_value(payload),
      };
      await deps.repository.put(record.namespace, updated);
      const summary = to_summary(updated);
      events.emit({ type: "profile_upserted", profile: summary });
      return summary;
    },
    async test_connection(profile_id): Promise<ProfileConnectionTestResult> {
      const started_at = Date.now();
      const record = await read(profile_id);
      const provider_id = ProviderIdSchema.parse(record.provider_id);
      const adapter = (await deps.load_adapters())[provider_id];
      if (adapter === undefined) {
        return {
          status: "failed",
          error: { code: "provider_unavailable", retryable: false },
        };
      }
      try {
        adapter.validate_profile(adapter_profile_of(record));
      } catch (error) {
        return {
          status: "failed",
          error:
            error instanceof ProviderAdapterError
              ? error.provider_error
              : { code: "invalid_request", retryable: false },
        };
      }

      const vault_key = read_payload(record)[VAULT_KEY_FIELD];
      if (typeof vault_key === "string" && deps.secrets !== null) {
        const present = await deps.secrets.probe_secret(vault_key);
        if (!present) {
          return { status: "failed", error: { code: "auth_failed", retryable: false } };
        }
      }
      return { status: "success", latency_ms: Date.now() - started_at };
    },
  };
}
