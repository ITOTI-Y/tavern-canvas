import {
  create_business_repositories,
  detect_image_media_type,
  with_transaction,
  type BusinessRepositories,
  type CharacterProfile,
  type ComfyWorkflow,
  type ImageBlob,
  type ImageRecord,
  type KnowledgeEntry,
  type NovelAiVibe,
  parse_json_value,
  type PromptPreset,
  type ProviderProfile,
  type RegexRule,
  type StorageDatabase,
  type StorageWriteTransaction,
  type Vocabulary,
  type VocabularyGroup,
} from "@tavern-canvas/storage";
import {
  convert_assets,
  convert_characters,
  convert_gallery,
  convert_knowledge,
  convert_prompts,
  convert_provider,
  convert_settings,
  deterministic_uuid,
  sha256_hex_bytes,
  type LegacySettings,
  type SecretTransferOperation,
  type TavernCanvasSettings,
} from "@tavern-canvas/v2-migration";

import { switch_active_namespace } from "../storage/active_namespace.js";
import type { SillyTavernSettings } from "../storage/sillytavern_settings.js";
import {
  index_legacy_image_bytes,
  load_legacy_source,
  resolve_jiuguan_images,
  type LegacyImageResolverPort,
  type LegacyInventory,
  type LegacySourcePort,
} from "./legacy_sources.js";
import {
  create_journal_store,
  create_namespace_marker_port,
  MIGRATION_NAMESPACE_PREFIX,
  NOT_REQUIRED_MIGRATION_ID,
  type ConversionWarningPayload,
  type MigrationFailureInfo,
  type MigrationFailureReason,
  type MigrationJournalPayload,
} from "./migration_journal.js";
import { transfer_secrets, type SecretDestinationPort } from "./secret_transfer.js";

export interface RunMigrationOptions {
  readonly database: StorageDatabase;
  readonly settings: SillyTavernSettings;
  readonly legacy_source: LegacySourcePort;
  readonly image_resolver: LegacyImageResolverPort;
  readonly secret_destination: SecretDestinationPort | null;
  readonly migrated_at?: string;
}

export type MigrationOutcome =
  | { readonly status: "not_required" }
  | {
      readonly status: "completed";
      readonly namespace: string;
      readonly counts: Readonly<Record<string, number>>;
    }
  | {
      readonly status: "failed";
      readonly namespace: string | null;
      readonly failure: MigrationFailureInfo;
    };

class ExpectedMigrationFailure extends Error {
  readonly reason: MigrationFailureReason;
  readonly step: string;

  constructor(reason: MigrationFailureReason, message: string, step: string) {
    super(message);
    this.name = "ExpectedMigrationFailure";
    this.reason = reason;
    this.step = step;
  }
}

interface MigrationPlan {
  readonly settings: TavernCanvasSettings;
  readonly legacy_preferences_id: string;
  readonly legacy_preferences_payload: Record<string, unknown>;
  readonly provider_profiles: readonly ProviderProfile[];
  readonly secret_transfers: readonly SecretTransferOperation[];
  readonly prompt_presets: readonly PromptPreset[];
  readonly regex_rules: readonly RegexRule[];
  readonly comfy_workflows: readonly ComfyWorkflow[];
  readonly novelai_vibes: readonly NovelAiVibe[];
  readonly character_profiles: readonly CharacterProfile[];
  readonly knowledge_entries: readonly KnowledgeEntry[];
  readonly asset_image_records: readonly ImageRecord[];
  readonly gallery_image_records: readonly ImageRecord[];
  readonly vocabularies: readonly Vocabulary[];
  readonly vocabulary_groups: readonly VocabularyGroup[];
  readonly warnings: readonly ConversionWarningPayload[];
}

const PROVIDER_MODE_PREFIXES: Readonly<Record<string, (legacy: LegacySettings) => string | null>> =
  {
    novelai: (legacy) => legacy.novelai_profile_id,
    comfyui: (legacy) => legacy.comfyui_profile_id,
    llm: (legacy) => legacy.current_llm_profile,
  };

/**
 * Best-effort: v2's "mode" plus the per-kind "current profile" fields select
 * one provider profile, but the mapping is heuristic (v2 never recorded this
 * relationship explicitly). Unresolved cases are left `null`, matching
 * `convert_settings`'s own default and its accompanying warning — this never
 * blocks migration.
 */
function resolve_active_provider_profile_id(
  legacy: LegacySettings,
  namespace: string,
  provider_profiles: readonly ProviderProfile[],
): string | null {
  if (legacy.mode === "banana") {
    const id = deterministic_uuid(`${namespace}:provider_converter:openai_image:banana`);
    return provider_profiles.some((profile) => profile.id === id) ? id : null;
  }
  const current_profile_name = PROVIDER_MODE_PREFIXES[legacy.mode]?.(legacy);
  if (current_profile_name === undefined || current_profile_name === null) {
    return null;
  }
  const id = deterministic_uuid(
    `${namespace}:provider_converter:${legacy.mode}:${current_profile_name}`,
  );
  return provider_profiles.some((profile) => profile.id === id) ? id : null;
}

function build_plan(
  legacy: LegacySettings,
  gallery: Parameters<typeof convert_gallery>[1],
  namespace: string,
  migrated_at: string,
): MigrationPlan {
  const context = { namespace, migrated_at };
  const settings_result = convert_settings(legacy, context);
  const provider_result = convert_provider(legacy, context);
  const prompt_result = convert_prompts(legacy, context);
  const asset_result = convert_assets(legacy, gallery, context);
  const character_result = convert_characters(legacy, context);
  const knowledge_result = convert_knowledge(legacy, context);
  const gallery_result = convert_gallery(legacy, gallery, context);

  const active_provider_profile_id = resolve_active_provider_profile_id(
    legacy,
    namespace,
    provider_result.records,
  );

  const warnings = [
    ...settings_result.warnings,
    ...provider_result.warnings,
    ...prompt_result.warnings,
    ...asset_result.warnings,
    ...character_result.warnings,
    ...knowledge_result.warnings,
    ...gallery_result.warnings,
  ];

  return {
    settings: { ...settings_result.settings, active_provider_profile_id },
    legacy_preferences_id: settings_result.legacy_preferences.id,
    legacy_preferences_payload: settings_result.legacy_preferences.payload,
    provider_profiles: provider_result.records,
    secret_transfers: provider_result.secret_transfers,
    prompt_presets: prompt_result.prompt_presets,
    regex_rules: prompt_result.regex_rules,
    comfy_workflows: asset_result.comfy_workflows,
    novelai_vibes: asset_result.novelai_vibes,
    character_profiles: character_result.character_profiles,
    knowledge_entries: knowledge_result.knowledge_entries,
    asset_image_records: asset_result.image_records,
    gallery_image_records: gallery_result.image_records,
    vocabularies: gallery_result.vocabularies,
    vocabulary_groups: gallery_result.vocabulary_groups,
    warnings,
  };
}

/**
 * Writes one migrated image and, only the first time this record id is seen,
 * accounts for its blob (create at ref_count 1, or increment an existing
 * blob's ref_count). Checking "was this record already present" inside the
 * same transaction — rather than trusting the batch-level `completed_batches`
 * guard alone — makes the write safe to repeat even if a prior attempt
 * committed this transaction but crashed before the journal recorded the
 * batch as done, which is exactly the guarantee "rerun does not duplicate
 * blob references" asks for.
 */
async function put_migrated_image(
  transaction: StorageWriteTransaction,
  repositories: BusinessRepositories,
  namespace: string,
  record: ImageRecord,
  bytes_by_sha256: ReadonlyMap<string, Uint8Array>,
): Promise<void> {
  const already_present =
    (await repositories.image_records.get(namespace, record.id, transaction)) !== null;
  await repositories.image_records.put(namespace, record, transaction);
  if (already_present) {
    return;
  }

  const bytes = bytes_by_sha256.get(record.sha256);
  if (bytes === undefined) {
    throw new ExpectedMigrationFailure(
      "missing_blob",
      `No resolved bytes for image ${record.id} (sha256 ${record.sha256})`,
      "assets_gallery",
    );
  }

  const existing_blob = await repositories.image_blobs.get(record.sha256, transaction);
  if (existing_blob === null) {
    const media_type = detect_image_media_type(bytes);
    const blob_bytes = new Uint8Array(bytes);
    const blob: ImageBlob = {
      sha256: record.sha256,
      ref_count: 1,
      byte_length: bytes.byteLength,
      blob:
        media_type === undefined
          ? new Blob([blob_bytes])
          : new Blob([blob_bytes], { type: media_type }),
    };
    await repositories.image_blobs.create(blob, transaction);
    return;
  }
  await repositories.image_blobs.update(
    { ...existing_blob, ref_count: existing_blob.ref_count + 1 },
    transaction,
  );
}

const COPY_BATCHES = [
  "provider",
  "secrets",
  "prompts",
  "assets",
  "characters",
  "knowledge",
  "gallery",
  "settings",
] as const;
type CopyBatchName = (typeof COPY_BATCHES)[number];

interface CopyBatchContext {
  readonly database: StorageDatabase;
  readonly namespace: string;
  readonly plan: MigrationPlan;
  readonly bytes_by_sha256: ReadonlyMap<string, Uint8Array>;
  readonly migrated_at: string;
  readonly settings: SillyTavernSettings;
  readonly secret_destination: SecretDestinationPort | null;
}

/** Every batch is one atomic transaction, upserting records via `.put` so a repeated batch never duplicates or errors. */
async function run_copy_batch(batch: CopyBatchName, context: CopyBatchContext): Promise<number> {
  const { database, namespace, plan, bytes_by_sha256, migrated_at } = context;
  const repositories = create_business_repositories(database);

  switch (batch) {
    case "provider":
      return with_transaction(database, ["provider_profiles"], async (transaction) => {
        for (const record of plan.provider_profiles) {
          await repositories.provider_profiles.put(namespace, record, transaction);
        }
        return plan.provider_profiles.length;
      });

    case "secrets": {
      // A configured Gateway is itself the supported destination: it holds
      // provider credentials server-side, so nothing needs to move client-side.
      if (context.settings.get_settings().gateway.endpoint !== null) {
        return 0;
      }
      const summary = await transfer_secrets(
        plan.secret_transfers,
        namespace,
        context.secret_destination,
      );
      const blocked = summary.records.find((record) => record.status === "blocked");
      if (blocked !== undefined) {
        throw new ExpectedMigrationFailure(
          "secret_transfer_blocked",
          `Secret transfer blocked for credential "${blocked.credential_kind}" (${blocked.reason}); configure SillyTavern secret storage or a Gateway profile and retry`,
          "secrets",
        );
      }
      return summary.records.length;
    }

    case "prompts":
      return with_transaction(database, ["prompt_presets", "regex_rules"], async (transaction) => {
        for (const record of plan.prompt_presets) {
          await repositories.prompt_presets.put(namespace, record, transaction);
        }
        for (const record of plan.regex_rules) {
          await repositories.regex_rules.put(namespace, record, transaction);
        }
        return plan.prompt_presets.length + plan.regex_rules.length;
      });

    case "assets":
      return with_transaction(
        database,
        ["comfy_workflows", "novelai_vibes", "image_records", "image_blobs"],
        async (transaction) => {
          for (const record of plan.comfy_workflows) {
            await repositories.comfy_workflows.put(namespace, record, transaction);
          }
          for (const record of plan.novelai_vibes) {
            await repositories.novelai_vibes.put(namespace, record, transaction);
          }
          for (const record of plan.asset_image_records) {
            await put_migrated_image(transaction, repositories, namespace, record, bytes_by_sha256);
          }
          return (
            plan.comfy_workflows.length +
            plan.novelai_vibes.length +
            plan.asset_image_records.length
          );
        },
      );

    case "characters":
      return with_transaction(database, ["character_profiles"], async (transaction) => {
        for (const record of plan.character_profiles) {
          await repositories.character_profiles.put(namespace, record, transaction);
        }
        return plan.character_profiles.length;
      });

    case "knowledge":
      return with_transaction(database, ["knowledge_entries"], async (transaction) => {
        for (const record of plan.knowledge_entries) {
          await repositories.knowledge_entries.put(namespace, record, transaction);
        }
        return plan.knowledge_entries.length;
      });

    case "gallery":
      return with_transaction(
        database,
        ["image_records", "image_blobs", "vocabularies", "vocabulary_groups"],
        async (transaction) => {
          for (const record of plan.gallery_image_records) {
            await put_migrated_image(transaction, repositories, namespace, record, bytes_by_sha256);
          }
          for (const record of plan.vocabularies) {
            await repositories.vocabularies.put(namespace, record, transaction);
          }
          for (const record of plan.vocabulary_groups) {
            await repositories.vocabulary_groups.put(namespace, record, transaction);
          }
          return (
            plan.gallery_image_records.length +
            plan.vocabularies.length +
            plan.vocabulary_groups.length
          );
        },
      );

    case "settings":
      return with_transaction(database, ["legacy_preferences"], async (transaction) => {
        await repositories.legacy_preferences.put(
          namespace,
          {
            schema_version: 1,
            id: plan.legacy_preferences_id,
            namespace,
            record_key: `${namespace}:${plan.legacy_preferences_id}`,
            created_at: migrated_at,
            updated_at: migrated_at,
            payload: parse_json_value(plan.legacy_preferences_payload),
          },
          transaction,
        );
        return 1;
      });
  }
}

type CountedStore =
  | "provider_profiles"
  | "prompt_presets"
  | "regex_rules"
  | "comfy_workflows"
  | "novelai_vibes"
  | "character_profiles"
  | "knowledge_entries"
  | "image_records"
  | "vocabularies"
  | "vocabulary_groups"
  | "legacy_preferences";

/**
 * Re-reads every store from the staging namespace and cross-checks it
 * against the plan computed before copying, then re-reads and re-hashes
 * every distinct image blob actually written. This is independent of the
 * per-batch write itself, so it catches a write that silently dropped
 * records or a blob whose stored bytes drifted from its key.
 *
 * The image-record counts are additionally cross-checked against
 * `inventory` — counted directly from the raw v2 source, independent of any
 * converter — so a converter that silently drops a record (most commonly:
 * an image whose bytes never resolved) fails here even though both `plan`
 * and the store agree with each other.
 */
async function verify(
  database: StorageDatabase,
  namespace: string,
  plan: MigrationPlan,
  inventory: LegacyInventory,
): Promise<readonly string[]> {
  const repositories = create_business_repositories(database);
  const expected_counts: Readonly<Record<CountedStore, number>> = {
    provider_profiles: plan.provider_profiles.length,
    prompt_presets: plan.prompt_presets.length,
    regex_rules: plan.regex_rules.length,
    comfy_workflows: plan.comfy_workflows.length,
    novelai_vibes: plan.novelai_vibes.length,
    character_profiles: plan.character_profiles.length,
    knowledge_entries: plan.knowledge_entries.length,
    image_records: plan.asset_image_records.length + plan.gallery_image_records.length,
    vocabularies: plan.vocabularies.length,
    vocabulary_groups: plan.vocabulary_groups.length,
    legacy_preferences: 1,
  };
  for (const [store_name, expected_count] of Object.entries(expected_counts) as [
    CountedStore,
    number,
  ][]) {
    const actual_count = (await repositories[store_name].list(namespace)).length;
    if (actual_count !== expected_count) {
      throw new ExpectedMigrationFailure(
        "count_mismatch",
        `Expected ${String(expected_count)} record(s) in ${store_name}, found ${String(actual_count)}`,
        "verifying",
      );
    }
  }

  if (plan.asset_image_records.length !== inventory.config_image_count) {
    throw new ExpectedMigrationFailure(
      "count_mismatch",
      `Expected ${String(inventory.config_image_count)} config image record(s) per source inventory, converter produced ${String(plan.asset_image_records.length)}`,
      "verifying",
    );
  }
  const expected_gallery_image_count =
    inventory.jiuguan_image_count + inventory.gallery_image_count;
  if (plan.gallery_image_records.length !== expected_gallery_image_count) {
    throw new ExpectedMigrationFailure(
      "missing_blob",
      `Expected ${String(expected_gallery_image_count)} gallery image record(s) per source inventory (jiuguan ${String(inventory.jiuguan_image_count)} + gallery ${String(inventory.gallery_image_count)}), converter produced ${String(plan.gallery_image_records.length)}; some legacy images likely had no resolved bytes`,
      "verifying",
    );
  }

  const unique_hashes = [
    ...new Set(
      [...plan.asset_image_records, ...plan.gallery_image_records].map((record) => record.sha256),
    ),
  ];
  for (const sha256_hex_value of unique_hashes) {
    const blob = await repositories.image_blobs.get(sha256_hex_value);
    if (blob === null) {
      throw new ExpectedMigrationFailure(
        "missing_blob",
        `Missing image_blobs entry for ${sha256_hex_value}`,
        "verifying",
      );
    }
    const bytes =
      blob.blob instanceof Blob
        ? new Uint8Array(await blob.blob.arrayBuffer())
        : new Uint8Array(blob.blob);
    if (sha256_hex_bytes(bytes) !== sha256_hex_value) {
      throw new ExpectedMigrationFailure(
        "hash_mismatch",
        `Stored blob ${sha256_hex_value} no longer hashes to its key`,
        "verifying",
      );
    }
  }
  return unique_hashes;
}

type ProgressState = Exclude<MigrationJournalPayload["state"], "not_required" | "failed">;

/**
 * Runs the resumable copy-verify-switch migration. Legacy data is read-only
 * throughout: this function never writes to `legacy_source`/`image_resolver`,
 * never deletes anything, and only ever advances `active_namespace` through
 * `switch_active_namespace`, exactly once, after verification passes.
 *
 * Two failure shapes are deliberately different. Expected, diagnosable
 * failures (an unknown setting path, a missing blob, a hash mismatch, a
 * blocked secret transfer, ...) are caught, journaled as `failed`, and
 * returned as `{status: "failed", ...}` — calling this again after fixing the
 * cause resumes from the last committed batch. Anything else (a thrown error
 * from the injected ports, an unexpected bug) is left to propagate: the
 * journal simply stays at whatever the last successfully committed batch
 * left it at, ready to resume on the next call.
 */
export async function run_migration(options: RunMigrationOptions): Promise<MigrationOutcome> {
  const { database, settings, legacy_source, image_resolver, secret_destination } = options;
  const migrated_at = options.migrated_at ?? new Date().toISOString();
  const journal_store = create_journal_store(database);

  const source = await load_legacy_source(legacy_source);
  if (source.kind === "absent") {
    await journal_store.save(
      NOT_REQUIRED_MIGRATION_ID,
      { state: "not_required", checked_at: migrated_at },
      migrated_at,
    );
    return { status: "not_required" };
  }
  // Deterministic: the same v2 source always derives the same staging
  // namespace, so calling this again (interrupted process, or a blocked
  // migration retried after the user fixes its cause) naturally resumes the
  // same journal instead of needing a separately persisted resume token.
  const namespace = `${MIGRATION_NAMESPACE_PREFIX}${deterministic_uuid(source.fingerprint)}`;
  const existing = await journal_store.load(namespace);
  if (existing !== null && existing.payload.state === "completed") {
    return { status: "completed", namespace, counts: existing.payload.counts };
  }

  const started_at =
    existing !== null && existing.payload.state !== "not_required"
      ? existing.payload.started_at
      : migrated_at;
  const completed_batches = new Set<string>(
    existing !== null && existing.payload.state !== "not_required"
      ? existing.payload.completed_batches
      : [],
  );
  const counts: Record<string, number> = {
    ...(existing !== null && existing.payload.state !== "not_required"
      ? existing.payload.counts
      : {}),
  };
  let plan: MigrationPlan | null = null;
  // Preserved across a resume purely for journal continuity: `verify()`
  // always recomputes this from the actually-stored blobs before it is ever
  // trusted, so a stale value here can never mask real corruption.
  let image_hashes: readonly string[] =
    existing !== null && existing.payload.state !== "not_required"
      ? existing.payload.image_hashes
      : [];

  const save_progress = (state: ProgressState): Promise<void> =>
    journal_store.save(
      namespace,
      {
        state,
        source_fingerprint: source.fingerprint,
        staging_namespace: namespace,
        started_at,
        completed_batches: [...completed_batches],
        counts: { ...counts },
        image_hashes: [...image_hashes],
        warnings: plan !== null ? [...plan.warnings] : [],
      },
      new Date().toISOString(),
    );

  const save_failure = (failure: MigrationFailureInfo): Promise<void> =>
    journal_store.save(
      namespace,
      {
        state: "failed",
        source_fingerprint: source.fingerprint,
        staging_namespace: namespace,
        started_at,
        completed_batches: [...completed_batches],
        counts: { ...counts },
        image_hashes: [...image_hashes],
        warnings: plan !== null ? [...plan.warnings] : [],
        failure,
      },
      new Date().toISOString(),
    );

  if (existing === null) {
    await save_progress("inventory");
  }

  if (source.kind === "unknown_paths") {
    const failure: MigrationFailureInfo = {
      reason: "unknown_setting_path",
      message: `Unclassified v2 settings path(s): ${source.paths.join(", ")}`,
      step: "inventory",
    };
    await save_failure(failure);
    return { status: "failed", namespace, failure };
  }
  if (source.kind === "invalid") {
    const failure: MigrationFailureInfo = {
      reason: "invalid_source",
      message: source.message,
      step: "inventory",
    };
    await save_failure(failure);
    return { status: "failed", namespace, failure };
  }

  try {
    const resolved_settings = await resolve_jiuguan_images(source.settings, image_resolver);

    try {
      plan = build_plan(resolved_settings, source.gallery, namespace, migrated_at);
    } catch (error) {
      if (error instanceof ExpectedMigrationFailure) {
        throw error;
      }
      throw new ExpectedMigrationFailure(
        "converter_error",
        error instanceof Error ? error.message : String(error),
        "convert",
      );
    }

    const bytes_by_sha256 = index_legacy_image_bytes(resolved_settings, source.gallery);
    await save_progress("copying");

    for (const batch of COPY_BATCHES) {
      if (completed_batches.has(batch)) {
        continue;
      }
      const count = await run_copy_batch(batch, {
        database,
        namespace,
        plan,
        bytes_by_sha256,
        migrated_at,
        settings,
        secret_destination,
      });
      completed_batches.add(batch);
      counts[batch] = count;
      await save_progress("copying");
    }

    await save_progress("verifying");
    image_hashes = await verify(database, namespace, plan, source.inventory);
    await save_progress("ready_to_switch");

    try {
      await switch_active_namespace(settings, namespace, create_namespace_marker_port(database));
    } catch (error) {
      throw new ExpectedMigrationFailure(
        "switch_failed",
        error instanceof Error ? error.message : String(error),
        "switch",
      );
    }

    try {
      // `gateway` is excluded: v2 has no Gateway concept, so
      // `convert_settings` always produces an unconfigured placeholder for it
      // (settings_converter.ts) — applying it here would wipe a live,
      // user-configured Gateway (endpoint/token_secret_id/acknowledgments),
      // including the exact configuration the "secrets" batch just relied on
      // to skip client-side credential transfer.
      const {
        schema_version: _schema_version,
        active_namespace: _active_namespace,
        gateway: _gateway,
        ...cosmetic
      } = plan.settings;
      settings.update_settings(cosmetic);
    } catch {
      // Best-effort: the namespace pointer is already switched and verified;
      // cosmetic settings (theme mode, concurrency, ...) can be reapplied on
      // a later run without risking the data that already migrated.
    }

    await save_progress("completed");
    return { status: "completed", namespace, counts };
  } catch (error) {
    if (!(error instanceof ExpectedMigrationFailure)) {
      throw error;
    }
    const failure: MigrationFailureInfo = {
      reason: error.reason,
      message: error.message,
      step: error.step,
    };
    await save_failure(failure);
    return { status: "failed", namespace, failure };
  }
}
