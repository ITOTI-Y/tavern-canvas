import type { MigrationJournalStateView } from "../../contracts/ui_capabilities.js";

export type Translate = (key: string) => string;

export function migration_state_label(t: Translate, state: MigrationJournalStateView): string {
  switch (state) {
    case "inventory":
      return t("migration.journal.inventory");
    case "copying":
      return t("migration.journal.copying");
    case "verifying":
      return t("migration.journal.verifying");
    case "ready_to_switch":
      return t("migration.journal.ready_to_switch");
    case "completed":
      return t("migration.journal.completed");
    case "failed":
      return t("migration.journal.failed");
    case "not_required":
      return t("migration.journal.not_required");
  }
}

export function migration_failure_reason_label(t: Translate, reason: string): string {
  switch (reason) {
    case "invalid_source":
      return t("migration.failure_reasons.invalid_source");
    case "unknown_setting_path":
      return t("migration.failure_reasons.unknown_setting_path");
    case "converter_error":
      return t("migration.failure_reasons.converter_error");
    case "missing_blob":
      return t("migration.failure_reasons.missing_blob");
    case "hash_mismatch":
      return t("migration.failure_reasons.hash_mismatch");
    case "count_mismatch":
      return t("migration.failure_reasons.count_mismatch");
    case "secret_transfer_blocked":
      return t("migration.failure_reasons.secret_transfer_blocked");
    case "switch_failed":
      return t("migration.failure_reasons.switch_failed");
    default:
      return reason;
  }
}
