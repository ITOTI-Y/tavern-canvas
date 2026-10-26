import type { IDBPDatabase } from "idb";

import { type DBSchema, type Sha256 } from "../database_schema.js";
import { with_transaction } from "../transaction.js";
import { GalleryImageRecordSchema, type GalleryImageRecord } from "./image_schema.js";

export interface StorageEstimate {
  readonly usage?: number;
  readonly quota?: number;
}

export interface LruEvictionConfig {
  readonly start_pressure_ratio: number;
  readonly target_pressure_ratio: number;
}

export interface LruEvictionResult {
  readonly reclaimed_bytes: number;
  readonly evicted_sha256: readonly Sha256[];
  readonly excluded_count: number;
}

const NO_OP_RESULT: LruEvictionResult = {
  reclaimed_bytes: 0,
  evicted_sha256: [],
  excluded_count: 0,
};

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

interface RecordPartition {
  readonly records_by_sha256: ReadonlyMap<Sha256, readonly GalleryImageRecord[]>;
  readonly foreign_sha256: ReadonlySet<Sha256>;
}

function raw_sha256(raw: unknown): Sha256 | undefined {
  if (typeof raw !== "object" || raw === null) {
    return undefined;
  }
  const value = (raw as { sha256?: unknown }).sha256;
  return typeof value === "string" ? value : undefined;
}

// `image_records` is shared with non-gallery writers (migrated assets). Rows that fail to parse as
// gallery records cannot be proven safe to evict, so their sha256 is excluded via `foreign_sha256`.
function partition_records(raw_records: readonly unknown[]): RecordPartition {
  const records_by_sha256 = new Map<Sha256, GalleryImageRecord[]>();
  const foreign_sha256 = new Set<Sha256>();
  for (const raw of raw_records) {
    const parsed = GalleryImageRecordSchema.safeParse(raw);
    if (parsed.success) {
      const existing = records_by_sha256.get(parsed.data.sha256);
      if (existing === undefined) {
        records_by_sha256.set(parsed.data.sha256, [parsed.data]);
      } else {
        existing.push(parsed.data);
      }
      continue;
    }
    const sha256_value = raw_sha256(raw);
    if (sha256_value !== undefined) {
      foreign_sha256.add(sha256_value);
    }
  }
  return { records_by_sha256, foreign_sha256 };
}

// Local bytes may be evicted only if every referencing record has a persisted_url to re-fetch from
// and none is pinned.
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
    const { records_by_sha256, foreign_sha256 } = partition_records(raw_records);
    const excluded_count = blobs.filter((blob) => foreign_sha256.has(blob.sha256)).length;

    const candidates = blobs
      .map((blob) =>
        foreign_sha256.has(blob.sha256)
          ? null
          : build_candidate(
              blob.sha256,
              blob.byte_length,
              records_by_sha256.get(blob.sha256) ?? [],
            ),
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

    return { reclaimed_bytes, evicted_sha256, excluded_count };
  });
}
