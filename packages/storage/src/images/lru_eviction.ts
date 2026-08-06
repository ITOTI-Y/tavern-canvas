import type { IDBPDatabase } from "idb";

import { type DBSchema, type Sha256 } from "../database_schema.js";
import { with_transaction } from "../transaction.js";
import { GalleryImageRecordSchema, type GalleryImageRecord } from "./image_schema.js";

export interface StorageEstimate {
  readonly usage?: number;
  readonly quota?: number;
}

export interface LruEvictionConfig {
  /** Pressure ratio (usage / quota) at or above which cleanup may run. */
  readonly start_pressure_ratio: number;
  /** Pressure ratio cleanup stops reclaiming bytes at. */
  readonly target_pressure_ratio: number;
}

export interface LruEvictionResult {
  readonly reclaimed_bytes: number;
  readonly evicted_sha256: readonly Sha256[];
}

const NO_OP_RESULT: LruEvictionResult = { reclaimed_bytes: 0, evicted_sha256: [] };

interface EvictionCandidate {
  readonly sha256: Sha256;
  readonly byte_length: number;
  readonly last_accessed_at: string;
}

function validate_config(config: LruEvictionConfig): void {
  if (config.start_pressure_ratio < config.target_pressure_ratio) {
    throw new RangeError(
      "start_pressure_ratio must be greater than or equal to target_pressure_ratio",
    );
  }
}

async function safe_estimate(
  estimate_storage: () => Promise<StorageEstimate | undefined>,
): Promise<StorageEstimate | undefined> {
  try {
    return await estimate_storage();
  } catch {
    return undefined;
  }
}

function group_by_sha256(
  records: readonly GalleryImageRecord[],
): Map<Sha256, GalleryImageRecord[]> {
  const grouped = new Map<Sha256, GalleryImageRecord[]>();
  for (const record of records) {
    const existing = grouped.get(record.sha256);
    if (existing === undefined) {
      grouped.set(record.sha256, [record]);
    } else {
      existing.push(record);
    }
  }
  return grouped;
}

/**
 * A blob may only have its local bytes evicted while its metadata (the
 * image_records rows) is retained. That is only safe when nothing would lose
 * its sole recoverable copy: every referencing record must carry a
 * persisted_url the content can be re-fetched from, and none may be pinned.
 */
function build_candidate(
  sha256_value: Sha256,
  byte_length: number,
  referencing_records: readonly GalleryImageRecord[],
): EvictionCandidate | null {
  const [first_record, ...rest] = referencing_records;
  if (first_record === undefined) {
    return null;
  }
  const eligible = referencing_records.every(
    (record) => !record.pinned && record.persisted_url !== undefined,
  );
  if (!eligible) {
    return null;
  }
  const last_accessed_at = rest.reduce(
    (latest, record) => (record.last_accessed_at > latest ? record.last_accessed_at : latest),
    first_record.last_accessed_at,
  );
  return { sha256: sha256_value, byte_length, last_accessed_at };
}

/**
 * Evicts local blob bytes for least-recently-accessed, eligible content until
 * usage falls at or below the target pressure ratio, or eligible candidates
 * are exhausted. Cleanup only runs once usage/quota reaches the start
 * pressure ratio, and is a no-op when the storage estimate is unavailable.
 */
export async function run_lru_eviction(
  database: IDBPDatabase<DBSchema>,
  config: LruEvictionConfig,
  estimate_storage: () => Promise<StorageEstimate | undefined>,
): Promise<LruEvictionResult> {
  validate_config(config);

  const estimate = await safe_estimate(estimate_storage);
  if (estimate?.usage === undefined || estimate.quota === undefined || estimate.quota <= 0) {
    return NO_OP_RESULT;
  }
  const { usage, quota } = estimate;
  if (usage / quota < config.start_pressure_ratio) {
    return NO_OP_RESULT;
  }

  return with_transaction(database, ["image_records", "image_blobs"], async (transaction) => {
    const blob_store = transaction.objectStore("image_blobs");
    const [blobs, raw_records] = await Promise.all([
      blob_store.getAll(),
      transaction.objectStore("image_records").getAll(),
    ]);
    const records = raw_records.map((raw) => GalleryImageRecordSchema.parse(raw));
    const records_by_sha256 = group_by_sha256(records);

    const candidates = blobs
      .map((blob) =>
        build_candidate(blob.sha256, blob.byte_length, records_by_sha256.get(blob.sha256) ?? []),
      )
      .filter((candidate): candidate is EvictionCandidate => candidate !== null)
      .sort((left, right) => (left.last_accessed_at < right.last_accessed_at ? -1 : 1));

    let remaining_usage = usage;
    let reclaimed_bytes = 0;
    const evicted_sha256: Sha256[] = [];

    for (const candidate of candidates) {
      if (remaining_usage / quota <= config.target_pressure_ratio) {
        break;
      }
      await blob_store.delete(candidate.sha256);
      remaining_usage -= candidate.byte_length;
      reclaimed_bytes += candidate.byte_length;
      evicted_sha256.push(candidate.sha256);
    }

    return { reclaimed_bytes, evicted_sha256 };
  });
}
