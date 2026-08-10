import {
  derive_gateway_credential_reference,
  type TavernCanvasSettings,
} from "@tavern-canvas/contracts";
import type { StorageDatabase } from "@tavern-canvas/storage";

import type { SecretDestinationPort } from "../../migration/secret_transfer.js";
import type { SillyTavernSettings } from "../../storage/sillytavern_settings.js";
import { acknowledge_http_origin } from "../../transport/http_acknowledgment.js";
import type {
  SettingsCapability,
  SettingsDomainEvent,
  SettingsSnapshot,
  VocabularyImportProgressView,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import { DomainEventEmitter } from "./_records.js";

const VOCABULARY_NAMESPACE = "vocabulary";
const LOCAL_IMPORT_PACKAGE_ID = "local-import";
const LOCAL_IMPORT_DATA_VERSION = "1.0.0";
const LOCAL_IMPORT_MINIMUM_EXTENSION_VERSION = "3.0.0";
const LOCAL_IMPORT_CHANGELOG = "Imported from a local file";
const MAX_IMPORT_BATCH_PAYLOAD_LENGTH = 8_388_608;
interface VocabularyImportBuilder {
  cancel(): void;
}

interface VocabularyImportOperation {
  cancelled: boolean;
  builder: VocabularyImportBuilder | null;
  cancel(): void;
}

function create_vocabulary_import_operation(): VocabularyImportOperation {
  const operation: VocabularyImportOperation = {
    cancelled: false,
    builder: null,
    cancel() {
      operation.cancelled = true;
      operation.builder?.cancel();
    },
  };
  return operation;
}

function throw_if_vocabulary_import_cancelled(operation: VocabularyImportOperation): void {
  if (operation.cancelled) {
    throw new VocabularyImportError("vocabulary_import_cancelled", "Vocabulary import cancelled");
  }
}

export type VocabularyImportErrorCode =
  | "vocabulary_import_busy"
  | "vocabulary_import_cancelled"
  | "vocabulary_import_invalid_file"
  | "vocabulary_import_invalid_format"
  | "vocabulary_import_size_limit"
  | "vocabulary_import_unavailable"
  | "vocabulary_import_failed";

export class VocabularyImportError extends Error {
  readonly code: VocabularyImportErrorCode;

  constructor(code: VocabularyImportErrorCode, message: string) {
    super(message);
    this.name = "VocabularyImportError";
    this.code = code;
  }
}

export interface SettingsCapabilityDeps {
  readonly settings: SillyTavernSettings;
  readonly database: StorageDatabase | null;
  readonly extension_version: string;
  readonly secrets: SecretDestinationPort | null;
}

const SECRET_DESTINATION_UNAVAILABLE =
  "This host exposes no secret vault, so a Gateway token cannot be stored anywhere but the page";

function require_database(database: StorageDatabase | null): StorageDatabase {
  if (database === null) {
    throw capability_unavailable_error(
      "Archive import and export need IndexedDB, which is unavailable on this host",
    );
  }
  return database;
}

function file_name(file: Blob): string {
  if ("name" in file && typeof file.name === "string") {
    return file.name;
  }
  return "";
}

function is_legacy_v2_document(text: string): boolean {
  try {
    const parsed: unknown = JSON.parse(text);
    return (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed) &&
      "tag_groups" in parsed &&
      "tag_tags" in parsed &&
      Array.isArray(parsed.tag_groups) &&
      Array.isArray(parsed.tag_tags)
    );
  } catch {
    return false;
  }
}

function infer_import_format(file: Blob, text: string): "tavern_canvas_jsonl" | "legacy_v2" {
  const name = file_name(file).toLowerCase();
  if (name.endsWith(".jsonl") || name.endsWith(".ndjson")) {
    return "tavern_canvas_jsonl";
  }
  if (name.endsWith(".json")) {
    return "legacy_v2";
  }
  if (name.length === 0) {
    return is_legacy_v2_document(text) ? "legacy_v2" : "tavern_canvas_jsonl";
  }
  throw new VocabularyImportError(
    "vocabulary_import_invalid_format",
    "Vocabulary import accepts .jsonl, .ndjson, and legacy .json files",
  );
}

function split_jsonl_batches(text: string): readonly string[] {
  const lines = text.replace(/\r\n?/gu, "\n").split("\n");
  const batches: string[] = [];
  let current_lines: string[] = [];
  let current_length = 0;

  for (const line of lines) {
    if (line.length > MAX_IMPORT_BATCH_PAYLOAD_LENGTH) {
      throw new VocabularyImportError(
        "vocabulary_import_size_limit",
        "A vocabulary import line exceeds the maximum batch size",
      );
    }
    const separator_length = current_lines.length === 0 ? 0 : 1;
    if (
      current_lines.length > 0 &&
      current_length + separator_length + line.length > MAX_IMPORT_BATCH_PAYLOAD_LENGTH
    ) {
      batches.push(current_lines.join("\n"));
      current_lines = [];
      current_length = 0;
    }
    current_lines.push(line);
    current_length += (current_lines.length === 1 ? 0 : 1) + line.length;
  }

  if (current_lines.length > 0) {
    batches.push(current_lines.join("\n"));
  }
  return batches;
}

function to_import_progress_view(progress: {
  readonly phase: string;
  readonly batch_index?: number;
  readonly batch_count?: number;
  readonly accepted_records?: number;
  readonly malformed_records?: number;
  readonly shard_index?: number;
  readonly shard_count?: number;
  readonly data_version?: string;
  readonly record_count?: number;
  readonly package_record_id?: string;
  readonly merge_conflicts?: number;
}): VocabularyImportProgressView | null {
  switch (progress.phase) {
    case "batch":
      return {
        phase: "batch",
        batch_index: progress.batch_index ?? 0,
        batch_count: progress.batch_count ?? 0,
        accepted_records: progress.accepted_records ?? 0,
        malformed_records: progress.malformed_records ?? 0,
      };
    case "indexing":
      return { phase: "indexing" };
    case "staging_shard":
      return {
        phase: "staging_shard",
        shard_index: progress.shard_index ?? 0,
        shard_count: progress.shard_count ?? 0,
      };
    case "activating":
      return { phase: "activating" };
    case "complete":
      return {
        phase: "complete",
        data_version: progress.data_version ?? LOCAL_IMPORT_DATA_VERSION,
        record_count: progress.record_count ?? 0,
        package_record_id: progress.package_record_id ?? "",
        malformed_records: progress.malformed_records ?? 0,
        merge_conflicts: progress.merge_conflicts ?? 0,
      };
    case "cancelled":
      return { phase: "cancelled" };
    default:
      return null;
  }
}

function normalize_import_error(error: unknown): VocabularyImportError {
  if (error instanceof VocabularyImportError) {
    return error;
  }
  if (error instanceof Error) {
    if (error.name === "ImportCancelledError") {
      return new VocabularyImportError(
        "vocabulary_import_cancelled",
        "Vocabulary import cancelled",
      );
    }
    if (error.name === "ImportSizeLimitError") {
      return new VocabularyImportError("vocabulary_import_size_limit", error.message);
    }
    if (error.name === "ImportSourceFormatError") {
      return new VocabularyImportError("vocabulary_import_invalid_format", error.message);
    }
    return new VocabularyImportError("vocabulary_import_failed", error.message);
  }
  return new VocabularyImportError("vocabulary_import_failed", String(error));
}

export function create_settings_capability(deps: SettingsCapabilityDeps): SettingsCapability {
  const events = new DomainEventEmitter<SettingsDomainEvent>();
  let active_import: VocabularyImportOperation | null = null;

  function snapshot(): SettingsSnapshot {
    const settings = deps.settings.get_settings();
    return {
      settings,
      vocabulary_update_channel: settings.vocabulary_update_channel,
    };
  }

  function apply(partial: Partial<TavernCanvasSettings>): TavernCanvasSettings {
    const settings = deps.settings.update_settings(partial);
    events.emit({ type: "settings_changed", settings });
    return settings;
  }

  return {
    load: () => Promise.resolve(snapshot()),
    subscribe: (handler) => events.subscribe(handler),
    update: (partial) => Promise.resolve(apply(partial)),
    acknowledge_http_origin(origin) {
      const current = deps.settings.get_settings();
      apply({
        gateway: {
          ...current.gateway,
          http_acknowledgments: acknowledge_http_origin(
            current.gateway.http_acknowledgments,
            origin,
            new Date().toISOString(),
          ),
        },
      });
      return deps.settings.flush();
    },
    /**
     * The plaintext token goes straight to host secret storage; settings keep only the reference,
     * mirroring how an LLM connection's API key is set. There is no read path back through this
     * capability, so nothing the UI or a support bundle can reach ever holds the value.
     */
    async set_gateway_token(plaintext_value) {
      if (deps.secrets === null) {
        throw capability_unavailable_error(SECRET_DESTINATION_UNAVAILABLE);
      }
      const current = deps.settings.get_settings();
      const reference = derive_gateway_credential_reference(current.active_namespace);
      await deps.secrets.write_secret(reference, plaintext_value);
      apply({ gateway: { ...current.gateway, token_secret_id: reference } });
      return deps.settings.flush();
    },
    /** Drops the reference only: the host vault owns the value and its own removal. */
    clear_gateway_token() {
      const current = deps.settings.get_settings();
      apply({ gateway: { ...current.gateway, token_secret_id: null } });
      return deps.settings.flush();
    },
    set_vocabulary_update_channel(channel) {
      apply({ vocabulary_update_channel: channel });
      return deps.settings.flush();
    },
    async import_vocabulary_package(file, on_progress) {
      if (active_import !== null) {
        throw new VocabularyImportError(
          "vocabulary_import_busy",
          "A vocabulary import is already in progress",
        );
      }
      if (file.size === 0) {
        throw new VocabularyImportError(
          "vocabulary_import_invalid_file",
          "The vocabulary file is empty",
        );
      }
      const database = deps.database;
      if (database === null) {
        throw new VocabularyImportError(
          "vocabulary_import_unavailable",
          "Vocabulary import needs IndexedDB, which is unavailable on this host",
        );
      }

      const operation = create_vocabulary_import_operation();
      active_import = operation;
      try {
        on_progress?.({ phase: "reading", received_bytes: 0, total_bytes: file.size });
        throw_if_vocabulary_import_cancelled(operation);
        const text = await file.text();
        throw_if_vocabulary_import_cancelled(operation);
        on_progress?.({ phase: "reading", received_bytes: file.size, total_bytes: file.size });
        throw_if_vocabulary_import_cancelled(operation);
        if (text.trim().length === 0) {
          throw new VocabularyImportError(
            "vocabulary_import_invalid_file",
            "The vocabulary file is empty",
          );
        }
        const format = infer_import_format(file, text);
        const batches = format === "legacy_v2" ? [text] : split_jsonl_batches(text);
        // Keep package import lazy: the importer pulls the index builder and MessagePack codec into
        // the settings chunk only after the user selects a local file.
        const { ImportBuilder, VocabularyPackageStore } = await import("@tavern-canvas/vocabulary");
        throw_if_vocabulary_import_cancelled(operation);
        const builder = new ImportBuilder({
          store: new VocabularyPackageStore(database, VOCABULARY_NAMESPACE),
          package_id: LOCAL_IMPORT_PACKAGE_ID,
          data_version: LOCAL_IMPORT_DATA_VERSION,
          minimum_extension_version: LOCAL_IMPORT_MINIMUM_EXTENSION_VERSION,
          changelog: LOCAL_IMPORT_CHANGELOG,
          on_progress: (progress) => {
            const view = to_import_progress_view(progress);
            if (view !== null) {
              on_progress?.(view);
            }
          },
        });
        operation.builder = builder;
        if (operation.cancelled) {
          builder.cancel();
        }
        throw_if_vocabulary_import_cancelled(operation);
        try {
          for (const [batch_index, payload] of batches.entries()) {
            await builder.import_batch({
              format,
              batch_index,
              batch_count: batches.length,
              payload,
            });
            throw_if_vocabulary_import_cancelled(operation);
          }
        } catch (error) {
          throw normalize_import_error(error);
        }
      } finally {
        if (active_import === operation) {
          active_import = null;
        }
      }
    },
    cancel_vocabulary_import() {
      active_import?.cancel();
    },
    // Both halves of the archive path, including the zip writer they pull in, load only when the
    // user actually exports or imports.
    async export_archive() {
      const { export_archive } = await import("@tavern-canvas/storage/archive");
      return export_archive({
        database: require_database(deps.database),
        namespace: deps.settings.get_settings().active_namespace,
        extension_version: deps.extension_version,
      });
    },
    async import_archive(archive) {
      const { import_archive } = await import("@tavern-canvas/storage/archive");
      await import_archive({ database: require_database(deps.database), archive });
    },
  };
}
