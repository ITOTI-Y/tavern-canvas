import type { StorageDatabase } from "@tavern-canvas/storage";
import { ImportBuilder, VocabularyPackageStore } from "@tavern-canvas/vocabulary";

import type { VocabularyImportProgressView } from "../../ui/contracts/ui_capabilities.js";
import { VocabularyImportError } from "./_vocabulary_import_error.js";

const VOCABULARY_NAMESPACE = "vocabulary";
const LOCAL_IMPORT_PACKAGE_ID = "local-import";
const LOCAL_IMPORT_DATA_VERSION = "1.0.0";
const LOCAL_IMPORT_MINIMUM_EXTENSION_VERSION = "3.0.0";
const LOCAL_IMPORT_CHANGELOG = "Imported from a local file";
const MAX_IMPORT_BATCH_PAYLOAD_LENGTH = 8_388_608;

export interface VocabularyImportOperation {
  readonly completed: Promise<void>;
  cancel(): void;
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

export function start_vocabulary_import(
  database: StorageDatabase | null,
  file: Blob,
  on_progress?: (progress: VocabularyImportProgressView) => void,
): VocabularyImportOperation {
  let cancelled = false;
  let builder: ImportBuilder | null = null;

  function cancel(): void {
    cancelled = true;
    builder?.cancel();
  }

  function throw_if_cancelled(): void {
    if (cancelled) {
      throw new VocabularyImportError("vocabulary_import_cancelled", "Vocabulary import cancelled");
    }
  }

  async function run(): Promise<void> {
    if (file.size === 0) {
      throw new VocabularyImportError(
        "vocabulary_import_invalid_file",
        "The vocabulary file is empty",
      );
    }
    if (database === null) {
      throw new VocabularyImportError(
        "vocabulary_import_unavailable",
        "Vocabulary import needs IndexedDB, which is unavailable on this host",
      );
    }

    on_progress?.({ phase: "reading", received_bytes: 0, total_bytes: file.size });
    throw_if_cancelled();
    const text = await file.text();
    throw_if_cancelled();
    on_progress?.({ phase: "reading", received_bytes: file.size, total_bytes: file.size });
    if (text.trim().length === 0) {
      throw new VocabularyImportError(
        "vocabulary_import_invalid_file",
        "The vocabulary file is empty",
      );
    }
    const format = infer_import_format(file, text);
    const batches = format === "legacy_v2" ? [text] : split_jsonl_batches(text);
    builder = new ImportBuilder({
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
    if (cancelled) {
      builder.cancel();
    }
    throw_if_cancelled();
    try {
      for (const [batch_index, payload] of batches.entries()) {
        await builder.import_batch({
          format,
          batch_index,
          batch_count: batches.length,
          payload,
        });
        throw_if_cancelled();
      }
    } catch (error) {
      throw normalize_import_error(error);
    }
  }

  return { cancel, completed: run() };
}
