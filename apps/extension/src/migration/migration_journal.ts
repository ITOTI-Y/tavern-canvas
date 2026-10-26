import {
  MigrationJournalRepository,
  parse_json_value,
  type MigrationJournal,
  type StorageDatabase,
} from "@tavern-canvas/storage";
import { z } from "zod";

import type { NamespaceMarkerPort, NamespaceReadinessMarker } from "../storage/active_namespace.js";

export const MIGRATION_NAMESPACE_PREFIX = "migration:" as const;
export const NOT_REQUIRED_MIGRATION_ID = "migration:not_required" as const;
export const V2_SOURCE_VERSION = 2 as const;

export const MIGRATION_JOURNAL_STATES = [
  "inventory",
  "copying",
  "verifying",
  "ready_to_switch",
  "completed",
  "failed",
  "not_required",
] as const;
export type MigrationJournalState = (typeof MIGRATION_JOURNAL_STATES)[number];

export const MIGRATION_FAILURE_REASONS = [
  "invalid_source",
  "unknown_setting_path",
  "converter_error",
  "missing_blob",
  "hash_mismatch",
  "count_mismatch",
  "secret_transfer_blocked",
  "switch_failed",
] as const;
export type MigrationFailureReason = (typeof MIGRATION_FAILURE_REASONS)[number];

export interface ConversionWarningPayload {
  readonly path: string;
  readonly message: string;
}

export interface MigrationFailureInfo {
  readonly reason: MigrationFailureReason;
  readonly message: string;
  readonly step: string;
}

const conversion_warning_schema = z.strictObject({
  path: z.string(),
  message: z.string(),
});

const migration_failure_schema = z.strictObject({
  reason: z.enum(MIGRATION_FAILURE_REASONS),
  message: z.string(),
  step: z.string(),
});

const in_progress_shape = {
  source_fingerprint: z.string().min(1),
  staging_namespace: z.string().min(1),
  started_at: z.string().min(1),
  completed_batches: z.array(z.string()),
  counts: z.record(z.string(), z.number().int().nonnegative()),
  image_hashes: z.array(z.string()),
  warnings: z.array(conversion_warning_schema),
};

export const MigrationJournalPayloadSchema = z.discriminatedUnion("state", [
  z.strictObject({ state: z.literal("inventory"), ...in_progress_shape }),
  z.strictObject({ state: z.literal("copying"), ...in_progress_shape }),
  z.strictObject({ state: z.literal("verifying"), ...in_progress_shape }),
  z.strictObject({ state: z.literal("ready_to_switch"), ...in_progress_shape }),
  z.strictObject({ state: z.literal("completed"), ...in_progress_shape }),
  z.strictObject({
    state: z.literal("failed"),
    ...in_progress_shape,
    failure: migration_failure_schema,
  }),
  z.strictObject({ state: z.literal("not_required"), checked_at: z.string().min(1) }),
]);
export type MigrationJournalPayload = z.infer<typeof MigrationJournalPayloadSchema>;

export interface LoadedMigrationJournal {
  readonly state: MigrationJournalState;
  readonly updated_at: string;
  readonly payload: MigrationJournalPayload;
}

export interface MigrationJournalStore {
  load(migration_id: string): Promise<LoadedMigrationJournal | null>;
  save(migration_id: string, payload: MigrationJournalPayload, updated_at: string): Promise<void>;
}

export function create_journal_store(database: StorageDatabase): MigrationJournalStore {
  const repository = new MigrationJournalRepository(database);

  return {
    async load(migration_id) {
      const record = await repository.get(migration_id);
      if (record === null) {
        return null;
      }
      const parsed = MigrationJournalPayloadSchema.safeParse(record.payload);
      if (!parsed.success) {
        throw new Error(`Migration journal "${migration_id}" has a corrupt payload`);
      }
      return {
        state: parsed.data.state,
        updated_at: record.updated_at,
        payload: parsed.data,
      };
    },
    async save(migration_id, payload, updated_at) {
      const existing = await repository.get(migration_id);
      const record: MigrationJournal = {
        migration_id,
        source_version: V2_SOURCE_VERSION,
        state: payload.state,
        updated_at,
        payload: parse_json_value(payload),
      };
      if (existing === null) {
        await repository.create(record);
        return;
      }
      await repository.update(record);
    },
  };
}

/** Reads the record in one transaction so a switch never observes a marker a concurrent write is still producing. */
export function create_namespace_marker_port(database: StorageDatabase): NamespaceMarkerPort {
  return {
    async with_marker_transaction<T>(
      namespace: string,
      callback: (transaction: {
        get_marker(): Promise<NamespaceReadinessMarker | null>;
      }) => Promise<T> | T,
    ): Promise<T> {
      const repository = new MigrationJournalRepository(database);
      const transaction = database.transaction(["migration_journal"], "readonly");
      try {
        const record = await repository.get(namespace, transaction);
        const result = await callback({
          get_marker: () =>
            Promise.resolve(
              record === null ? null : { namespace: record.migration_id, state: record.state },
            ),
        });
        await transaction.done;
        return result;
      } catch (error) {
        await transaction.done.catch(() => undefined);
        throw error;
      }
    },
  };
}
