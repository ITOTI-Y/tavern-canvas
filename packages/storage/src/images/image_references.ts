import type { IDBPDatabase } from "idb";

import {
  GenerationJobSchema,
  type DBSchema,
  type GenerationJob,
  type Sha256,
} from "../database_schema.js";
import { RepositoryNotFoundError } from "../repository.js";
import { ImageBlobRepository } from "../repositories/business_repositories.js";
import { with_transaction, type StorageWriteTransaction } from "../transaction.js";
import {
  create_image_record,
  delete_image_record_entry,
  GalleryImageRecordRepository,
  type GalleryImageRecord,
  type PutImageRecordInput,
} from "./image_store.js";

const ATTACH_STORES = ["image_records", "image_blobs", "generation_jobs"] as const;

export interface AttachImageInput extends PutImageRecordInput {
  readonly namespace: string;
  readonly job_id: string;
}

export interface AttachImageResult {
  readonly image_record: GalleryImageRecord;
  readonly job: GenerationJob;
}

export interface DetachImageInput {
  readonly namespace: string;
  readonly id: string;
  readonly job_id: string;
  readonly updated_at: string;
}

export interface DetachImageResult {
  readonly sha256: Sha256;
  readonly blob_deleted: boolean;
  readonly job: GenerationJob;
}

async function update_job_after_reference_change(
  transaction: StorageWriteTransaction,
  namespace: string,
  job_id: string,
  updated_at: string,
  apply: (job: GenerationJob) => GenerationJob,
): Promise<GenerationJob> {
  const job_key = `${namespace}:${job_id}`;
  const store = transaction.objectStore("generation_jobs");
  const raw = await store.get(job_key);
  if (raw === undefined) {
    throw new RepositoryNotFoundError("generation_jobs", job_key);
  }
  const existing = GenerationJobSchema.parse(raw);
  const updated = GenerationJobSchema.parse({ ...apply(existing), updated_at });
  await store.put(updated);
  return updated;
}

export async function attach_image(
  database: IDBPDatabase<DBSchema>,
  input: AttachImageInput,
): Promise<AttachImageResult> {
  const records = new GalleryImageRecordRepository(database);
  const blobs = new ImageBlobRepository(database);
  return with_transaction(database, ATTACH_STORES, async (transaction) => {
    const image_record = await create_image_record(
      transaction,
      records,
      blobs,
      input.namespace,
      input,
    );
    const job = await update_job_after_reference_change(
      transaction,
      input.namespace,
      input.job_id,
      input.created_at,
      (job_draft) => ({
        ...job_draft,
        image_ids: job_draft.image_ids.includes(input.id)
          ? job_draft.image_ids
          : [...job_draft.image_ids, input.id],
        state: "attached",
      }),
    );
    return { image_record, job };
  });
}

export async function detach_image(
  database: IDBPDatabase<DBSchema>,
  input: DetachImageInput,
): Promise<DetachImageResult> {
  const records = new GalleryImageRecordRepository(database);
  const blobs = new ImageBlobRepository(database);
  return with_transaction(database, ATTACH_STORES, async (transaction) => {
    const { sha256, blob_deleted } = await delete_image_record_entry(
      transaction,
      records,
      blobs,
      input.namespace,
      input.id,
    );
    const job = await update_job_after_reference_change(
      transaction,
      input.namespace,
      input.job_id,
      input.updated_at,
      (job_draft) => {
        const image_ids = job_draft.image_ids.filter((image_id) => image_id !== input.id);
        return {
          ...job_draft,
          image_ids,
          state: image_ids.length === 0 ? "orphaned" : job_draft.state,
        };
      },
    );
    return { sha256, blob_deleted, job };
  });
}
