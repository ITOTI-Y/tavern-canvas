import type { StorageDatabase } from "@tavern-canvas/storage";

import type { LegacySourcePort } from "../../migration/legacy_sources.js";
import {
  create_journal_store,
  MIGRATION_NAMESPACE_PREFIX,
  NOT_REQUIRED_MIGRATION_ID,
  type MigrationJournalState,
} from "../../migration/migration_journal.js";
import type { LegacyImageResolverPort } from "../../migration/legacy_sources.js";
import type { SecretDestinationPort } from "../../migration/secret_transfer.js";
import type { SillyTavernSettings } from "../../storage/sillytavern_settings.js";
import type {
  MigrationCapability,
  MigrationDomainEvent,
  MigrationSnapshot,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import { as_record, DomainEventEmitter, read_array, read_number } from "./_records.js";

const NOT_REQUIRED: MigrationSnapshot = {
  state: "not_required",
  counts: {},
  warnings: [],
  failure_reason: null,
  failure_message: null,
};

export interface MigrationCapabilityDeps {
  readonly database: StorageDatabase;
  readonly settings: SillyTavernSettings;
  readonly legacy_source: LegacySourcePort;
  readonly image_resolver: LegacyImageResolverPort;
  readonly secrets: SecretDestinationPort | null;
}

export function create_migration_capability(deps: MigrationCapabilityDeps): MigrationCapability {
  const events = new DomainEventEmitter<MigrationDomainEvent>();
  const journal_store = create_journal_store(deps.database);

  async function read_snapshot(): Promise<MigrationSnapshot> {
    const not_required = await journal_store.load(NOT_REQUIRED_MIGRATION_ID);
    if (not_required !== null) {
      return NOT_REQUIRED;
    }
    const active = await find_active_journal();
    if (active === null) {
      return NOT_REQUIRED;
    }
    const payload = as_record(active.payload);
    const counts = as_record(payload.counts);
    return {
      state: active.state,
      counts: Object.fromEntries(
        Object.keys(counts).map((key) => [key, read_number(counts, key, 0)]),
      ),
      warnings: read_array(payload, "warnings").flatMap((warning) => {
        const record = as_record(warning);
        const message = record.message;
        return typeof message === "string" ? [message] : [];
      }),
      failure_reason:
        typeof as_record(payload.failure).reason === "string"
          ? String(as_record(payload.failure).reason)
          : null,
      failure_message:
        typeof as_record(payload.failure).message === "string"
          ? String(as_record(payload.failure).message)
          : null,
    };
  }

  async function find_active_journal(): Promise<{
    readonly state: MigrationJournalState;
    readonly payload: unknown;
  } | null> {
    const records = await deps.database.getAll("migration_journal");
    const candidates = records
      .filter((record) => record.migration_id.startsWith(MIGRATION_NAMESPACE_PREFIX))
      .filter((record) => record.migration_id !== NOT_REQUIRED_MIGRATION_ID)
      .sort((left, right) => (left.updated_at < right.updated_at ? 1 : -1));
    const latest = candidates[0];
    return latest === undefined
      ? null
      : { state: latest.state as MigrationJournalState, payload: latest.payload };
  }

  return {
    load: read_snapshot,
    subscribe: (handler) => events.subscribe(handler),
    async retry() {
      const { run_migration } = await import("../../migration/migration_runner.js");
      await run_migration({
        database: deps.database,
        settings: deps.settings,
        legacy_source: deps.legacy_source,
        image_resolver: deps.image_resolver,
        secret_destination: deps.secrets,
      });
      const snapshot = await read_snapshot();
      events.emit({ type: "state_changed", snapshot });
      return snapshot;
    },
    confirm_legacy_cleanup() {
      /* v2 data is never deleted by this app. */
      return Promise.reject(
        capability_unavailable_error(
          "Legacy v2 data cleanup is not implemented; remove the v2 extension manually once the migration reports completed.",
        ),
      );
    },
  };
}
