import {
  normalize_vocabulary_search_key,
  VOCABULARY_SCHEMA_VERSION,
  VocabularyManifestSchema,
  type VocabularyImportFormat,
  type VocabularyManifest,
  type VocabularyRecord,
} from "@tavern-canvas/contracts";

import type { StoredVocabularyPackage, VocabularyPackageStore } from "../package_store.js";
import {
  IMPORT_SOURCE_ADAPTERS,
  type ImportedRecordDraft,
  type MalformedImportRecord,
} from "./import_source.js";
import {
  build_all_shards,
  compare_by_code_point,
  encode_shard,
  type EncodedShard,
} from "./shard_builder.js";

// Mirrors the frozen Worker protocol's per-batch bound
// (packages/contracts/src/vocabulary_worker.ts,
// VocabularyImportSourceRequestSchema.payload) so this package-level layer
// enforces the same limit even though it does not import that Worker-only
// schema. A JS string's .length is UTF-16 code units, the same unit the
// contracts z.string().max() bound counts.
export const DEFAULT_MAX_BATCH_PAYLOAD_LENGTH = 8_388_608;
// Defensive aggregate bound across the whole import (implementer-chosen,
// same category as Task 1/3's flagged defensive bounds -- revisit once real
// user-import sizes are known). Both bounds are constructor-configurable so
// callers (and tests) are never forced to allocate a real 8 MiB string or
// 200,000 records to exercise the limit.
export const DEFAULT_MAX_TOTAL_RECORDS = 200_000;
const MAX_ALIASES_PER_RECORD = 32;

export class ImportSizeLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImportSizeLimitError";
  }
}

export class ImportCancelledError extends Error {
  constructor() {
    super("vocabulary import was cancelled");
    this.name = "ImportCancelledError";
  }
}

export class ImportBuilderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImportBuilderError";
  }
}

export interface ImportBatchRequest {
  readonly format: VocabularyImportFormat;
  readonly batch_index: number;
  readonly batch_count: number;
  readonly payload: string;
}

export interface ImportBatchOutcome {
  readonly accepted_records: number;
  readonly malformed: readonly MalformedImportRecord[];
  readonly complete: boolean;
}

export type ImportProgress =
  | {
      readonly phase: "batch";
      readonly batch_index: number;
      readonly batch_count: number;
      readonly accepted_records: number;
      readonly malformed_records: number;
    }
  | { readonly phase: "indexing" }
  | { readonly phase: "staging_shard"; readonly shard_index: number; readonly shard_count: number }
  | { readonly phase: "activating" }
  | {
      readonly phase: "complete";
      readonly data_version: string;
      readonly record_count: number;
      readonly package_record_id: string;
      readonly malformed_records: number;
      readonly merge_conflicts: number;
    }
  | { readonly phase: "cancelled" };

export interface ImportBuilderOptions {
  readonly store: VocabularyPackageStore;
  readonly package_id: string;
  readonly data_version: string;
  readonly minimum_extension_version: string;
  readonly changelog: string;
  readonly on_progress?: (progress: ImportProgress) => void;
  readonly max_batch_payload_length?: number;
  readonly max_total_records?: number;
}

interface RecordAccumulator {
  tag: string;
  translation: string | undefined;
  aliases: string[];
  category: string | undefined;
  popularity: number;
  description: string | undefined;
}

function merge_text_field(
  current: string | undefined,
  incoming: string | undefined,
  on_conflict: () => void,
): string | undefined {
  if (current === undefined) {
    return incoming;
  }
  if (incoming === undefined || incoming === current) {
    return current;
  }
  on_conflict();
  return current;
}

// Deduplicates by normalized key, keeping the lexicographically smallest
// (code-point order) original spelling as canonical -- deterministic
// regardless of accumulation order.
function dedupe_and_sort_aliases(aliases: readonly string[]): string[] {
  const canonical_by_key = new Map<string, string>();
  for (const alias of aliases) {
    const key = normalize_vocabulary_search_key(alias);
    const current = canonical_by_key.get(key);
    if (current === undefined || compare_by_code_point(alias, current) < 0) {
      canonical_by_key.set(key, alias);
    }
  }
  return [...canonical_by_key.entries()]
    .sort(([left], [right]) => compare_by_code_point(left, right))
    .map(([, text]) => text);
}

/**
 * Accumulates records across every batch of one import, merging duplicates
 * by normalized tag. Unlike tools/vocabulary_builder's baseline-build merge
 * rule (which throws on a primary-field conflict, appropriate for a curated
 * single source that must never silently lose content), this uses a
 * tolerant "first occurrence wins, later conflicts counted" policy --
 * legacy_v2's real data has duplicate tag text under different subgroups
 * with different resolved categories (task-src-report.md SS10: 193 such
 * cases in tags.json alone), and a user import must not abort over that.
 */
class ImportAccumulation {
  readonly #records = new Map<string, RecordAccumulator>();
  #conflicts = 0;

  add(draft: ImportedRecordDraft): void {
    const normalized_tag = normalize_vocabulary_search_key(draft.tag);
    const existing = this.#records.get(normalized_tag);
    if (existing === undefined) {
      this.#records.set(normalized_tag, {
        tag: draft.tag,
        translation: draft.translation,
        aliases: [...draft.aliases],
        category: draft.category,
        popularity: draft.popularity,
        description: draft.description,
      });
      return;
    }
    const note_conflict = (): void => {
      this.#conflicts += 1;
    };
    existing.tag = merge_text_field(existing.tag, draft.tag, note_conflict) ?? existing.tag;
    existing.translation = merge_text_field(existing.translation, draft.translation, note_conflict);
    existing.category = merge_text_field(existing.category, draft.category, note_conflict);
    existing.description = merge_text_field(existing.description, draft.description, note_conflict);
    existing.aliases.push(...draft.aliases);
    existing.popularity = Math.max(existing.popularity, draft.popularity);
  }

  get record_count(): number {
    return this.#records.size;
  }

  get conflict_count(): number {
    return this.#conflicts;
  }

  finalize(): VocabularyRecord[] {
    return [...this.#records.entries()]
      .sort(([left], [right]) => compare_by_code_point(left, right))
      .map(([, accumulated], index) => ({
        record_id: index,
        tag: accumulated.tag,
        ...(accumulated.translation !== undefined ? { translation: accumulated.translation } : {}),
        aliases: dedupe_and_sort_aliases(accumulated.aliases).slice(0, MAX_ALIASES_PER_RECORD),
        ...(accumulated.category !== undefined ? { category: accumulated.category } : {}),
        popularity: accumulated.popularity,
        ...(accumulated.description !== undefined ? { description: accumulated.description } : {}),
      }));
  }
}

/**
 * Runs one user import to completion: parses bounded batches through an
 * explicit format adapter, accumulates and merges records across batches,
 * and -- once every batch has arrived -- builds index shards and persists
 * them into a fresh staging package one shard at a time (VocabularyPackageStore.
 * put_shard_content per shard, never one monolithic write), then marks it
 * ready and activates it. Activation confirms only after the caller reports
 * one successful Worker query (report_query_success), the same lifecycle
 * package_updater.ts uses for remote updates.
 */
export class ImportBuilder {
  readonly #store: VocabularyPackageStore;
  readonly #package_id: string;
  readonly #data_version: string;
  readonly #minimum_extension_version: string;
  readonly #changelog: string;
  readonly #on_progress: ((progress: ImportProgress) => void) | undefined;
  readonly #max_batch_payload_length: number;
  readonly #max_total_records: number;
  readonly #accumulation = new ImportAccumulation();
  readonly #processed_batch_indices = new Set<number>();
  #expected_batch_count: number | null = null;
  #malformed_total = 0;
  #cancelled = false;
  #finalized = false;
  #staging: StoredVocabularyPackage | null = null;

  constructor(options: ImportBuilderOptions) {
    this.#store = options.store;
    this.#package_id = options.package_id;
    this.#data_version = options.data_version;
    this.#minimum_extension_version = options.minimum_extension_version;
    this.#changelog = options.changelog;
    this.#on_progress = options.on_progress;
    this.#max_batch_payload_length =
      options.max_batch_payload_length ?? DEFAULT_MAX_BATCH_PAYLOAD_LENGTH;
    this.#max_total_records = options.max_total_records ?? DEFAULT_MAX_TOTAL_RECORDS;
  }

  cancel(): void {
    this.#cancelled = true;
  }

  async import_batch(request: ImportBatchRequest): Promise<ImportBatchOutcome> {
    this.#assert_not_cancelled();
    if (this.#finalized) {
      throw new ImportBuilderError("this import already completed");
    }
    if (
      request.batch_count <= 0 ||
      request.batch_index < 0 ||
      request.batch_index >= request.batch_count
    ) {
      throw new ImportBuilderError(
        `invalid batch_index ${String(request.batch_index)} for batch_count ${String(request.batch_count)}`,
      );
    }
    if (this.#expected_batch_count === null) {
      this.#expected_batch_count = request.batch_count;
    } else if (this.#expected_batch_count !== request.batch_count) {
      throw new ImportBuilderError("batch_count changed mid-import");
    }
    if (this.#processed_batch_indices.has(request.batch_index)) {
      throw new ImportBuilderError(
        `batch_index ${String(request.batch_index)} was already processed`,
      );
    }
    if (request.payload.length > this.#max_batch_payload_length) {
      throw new ImportSizeLimitError(
        `batch payload of ${String(request.payload.length)} characters exceeds the ${String(this.#max_batch_payload_length)}-character limit`,
      );
    }

    const parsed = IMPORT_SOURCE_ADAPTERS[request.format].parse_batch(request.payload);
    for (const draft of parsed.records) {
      this.#accumulation.add(draft);
    }
    if (this.#accumulation.record_count > this.#max_total_records) {
      throw new ImportSizeLimitError(
        `import accumulated more than ${String(this.#max_total_records)} records`,
      );
    }
    this.#malformed_total += parsed.malformed.length;
    this.#processed_batch_indices.add(request.batch_index);

    this.#emit({
      phase: "batch",
      batch_index: request.batch_index,
      batch_count: request.batch_count,
      accepted_records: parsed.records.length,
      malformed_records: parsed.malformed.length,
    });

    let complete = false;
    if (this.#processed_batch_indices.size === request.batch_count) {
      await this.#finalize();
      complete = true;
    }

    return { accepted_records: parsed.records.length, malformed: parsed.malformed, complete };
  }

  /** Call after the newly activated package completes one successful Worker query. */
  async report_query_success(): Promise<void> {
    const active = await this.#store.find_active_or_confirmed();
    if (active !== null && active.state === "active") {
      await this.#store.confirm(active.record_id);
    }
  }

  /** Call when the first query against the newly activated package fails. */
  async report_query_failure(): Promise<StoredVocabularyPackage | null> {
    const active = await this.#store.find_active_or_confirmed();
    if (active === null || active.state !== "active") {
      return null;
    }
    return this.#store.reselect_prior_confirmed(active.record_id);
  }

  #assert_not_cancelled(): void {
    if (this.#cancelled) {
      throw new ImportCancelledError();
    }
  }

  #emit(progress: ImportProgress): void {
    this.#on_progress?.(progress);
  }

  // Runs exactly once, when the last outstanding batch arrives. Sets
  // #finalized unconditionally up front -- whether this succeeds, is
  // cancelled, or fails, every batch has already been consumed into the
  // accumulator, and this instance never accepts another one.
  async #finalize(): Promise<void> {
    this.#finalized = true;
    this.#emit({ phase: "indexing" });
    const records = this.#accumulation.finalize();
    const draft_shards = build_all_shards(records);

    try {
      const encoded: EncodedShard[] = [];
      for (const draft of draft_shards) {
        this.#assert_not_cancelled();
        encoded.push(await encode_shard(this.#package_id, draft));
      }

      const manifest: VocabularyManifest = {
        package_id: this.#package_id,
        schema_version: VOCABULARY_SCHEMA_VERSION,
        data_version: this.#data_version,
        changelog: this.#changelog,
        record_count: records.length,
        compressed_size: encoded.reduce((total, shard) => total + shard.entry.byte_length, 0),
        minimum_extension_version: this.#minimum_extension_version,
        shards: encoded.map((shard) => shard.entry),
      };
      const manifest_result = VocabularyManifestSchema.safeParse(manifest);
      if (!manifest_result.success) {
        throw new ImportBuilderError(
          `assembled manifest failed validation: ${manifest_result.error.message}`,
        );
      }

      this.#staging = await this.#store.create_staging_package(manifest_result.data);

      for (const [index, shard] of encoded.entries()) {
        this.#assert_not_cancelled();
        await this.#store.put_shard_content(this.#staging, shard.entry, shard.bytes);
        this.#emit({ phase: "staging_shard", shard_index: index, shard_count: encoded.length });
      }
      this.#assert_not_cancelled();
      await this.#store.mark_ready(this.#staging.record_id);
      this.#emit({ phase: "activating" });
      await this.#store.activate(this.#staging.record_id);
      this.#emit({
        phase: "complete",
        data_version: this.#data_version,
        record_count: records.length,
        package_record_id: this.#staging.record_id,
        malformed_records: this.#malformed_total,
        merge_conflicts: this.#accumulation.conflict_count,
      });
    } catch (error) {
      if (this.#staging !== null) {
        await this.#store.rollback_staging(this.#staging.record_id);
      }
      if (error instanceof ImportCancelledError) {
        this.#emit({ phase: "cancelled" });
      }
      throw error;
    }
  }
}
