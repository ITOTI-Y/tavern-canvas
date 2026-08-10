import { randomUUID } from "node:crypto";

import type Database from "better-sqlite3";
import {
  AssetIdSchema,
  JobIdSchema,
  Sha256Schema,
  type AssetId,
  type JobId,
  type Sha256,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import { OwnerTokenHashSchema, type OwnerTokenHash } from "./job_repository.js";

const OccurredAtSchema = z.iso.datetime({ offset: false });
const AssetMediaTypeSchema = z.enum(["image/png", "image/jpeg", "image/webp"]);
const AssetKindSchema = z.enum(["reference", "generated"]);
type AssetMediaType = z.infer<typeof AssetMediaTypeSchema>;
export type AssetKind = z.infer<typeof AssetKindSchema>;

interface AssetRow {
  readonly asset_id: string;
  readonly sha256: string;
  readonly owner_token_hash: string;
  readonly asset_kind: string;
  readonly media_type: string;
  readonly byte_length: number;
  readonly relative_path: string;
  readonly created_at: string;
}

interface JobAssetRow extends AssetRow {
  readonly position: number;
}

export interface StoredAsset {
  readonly asset_id: AssetId;
  readonly sha256: Sha256;
  readonly owner_token_hash: OwnerTokenHash;
  readonly asset_kind: AssetKind;
  readonly media_type: AssetMediaType;
  readonly byte_length: number;
  readonly relative_path: string;
  readonly created_at: string;
}
export interface StoredJobAsset extends StoredAsset {
  readonly position: number;
}

export interface CreateAssetInput {
  readonly sha256: Sha256;
  readonly owner_token_hash: OwnerTokenHash;
  readonly asset_kind: AssetKind;
  readonly media_type: AssetMediaType;
  readonly byte_length: number;
  readonly created_at: string;
}

export interface AttachAssetInput {
  readonly job_id: JobId;
  readonly owner_token_hash: OwnerTokenHash;
  readonly asset_id: AssetId;
  readonly position: number;
}

export interface AssetRepositoryOptions {
  readonly uuid_factory?: () => string;
}

export class AssetRepository {
  readonly #uuid_factory: () => string;
  readonly #select_by_id_for_worker: Database.Statement;
  readonly #select_by_id_for_owner: Database.Statement;
  readonly #select_by_sha256: Database.Statement;
  readonly #insert_asset: Database.Statement;
  readonly #attach_asset: Database.Statement;
  readonly #select_for_job_for_worker: Database.Statement;
  readonly #select_orphaned: Database.Statement;
  readonly #delete_orphaned: Database.Statement;
  readonly #create_or_get_transaction: (input: CreateAssetInput) => StoredAsset;
  readonly #delete_orphaned_transaction: (
    asset_id: AssetId,
    cutoff_at: string,
    unlink_file: () => void,
  ) => boolean;
  constructor(connection: Database.Database, options: AssetRepositoryOptions = {}) {
    this.#uuid_factory = options.uuid_factory ?? randomUUID;
    this.#select_by_id_for_worker = connection.prepare("SELECT * FROM assets WHERE asset_id = ?");
    this.#select_by_id_for_owner = connection.prepare(
      "SELECT * FROM assets WHERE asset_id = ? AND owner_token_hash = ?",
    );
    this.#select_by_sha256 = connection.prepare(`
      SELECT * FROM assets
      WHERE owner_token_hash = ? AND asset_kind = ? AND sha256 = ?
    `);
    this.#insert_asset = connection.prepare(`
      INSERT INTO assets (
        asset_id, sha256, owner_token_hash, asset_kind, media_type,
        byte_length, relative_path, created_at
      ) VALUES (
        @asset_id, @sha256, @owner_token_hash, @asset_kind, @media_type,
        @byte_length, @relative_path, @created_at
      )
      ON CONFLICT(owner_token_hash, asset_kind, sha256) DO NOTHING
    `);
    this.#attach_asset = connection.prepare(`
      INSERT INTO job_assets (job_id, owner_token_hash, asset_id, position)
      VALUES (@job_id, @owner_token_hash, @asset_id, @position)
      ON CONFLICT(job_id, position) DO UPDATE SET
        owner_token_hash = excluded.owner_token_hash,
        asset_id = excluded.asset_id
    `);
    this.#select_for_job_for_worker = connection.prepare(`
      SELECT assets.*, job_assets.position
      FROM job_assets
      JOIN assets
        ON assets.asset_id = job_assets.asset_id
        AND assets.owner_token_hash = job_assets.owner_token_hash
      WHERE job_assets.job_id = ?
      ORDER BY job_assets.position
    `);
    this.#select_orphaned = connection.prepare(`
      SELECT assets.*
      FROM assets
      WHERE assets.created_at < ?
        AND NOT EXISTS (
          SELECT 1 FROM job_assets
          WHERE job_assets.asset_id = assets.asset_id
            AND job_assets.owner_token_hash = assets.owner_token_hash
        )
      ORDER BY assets.asset_id
    `);
    this.#delete_orphaned = connection.prepare(`
      DELETE FROM assets
      WHERE asset_id = ?
        AND created_at < ?
        AND NOT EXISTS (
          SELECT 1 FROM job_assets
          WHERE job_assets.asset_id = assets.asset_id
            AND job_assets.owner_token_hash = assets.owner_token_hash
        )
    `);
    const create_or_get_transaction = connection.transaction((input: CreateAssetInput) =>
      this.#create_or_get(input),
    );
    this.#create_or_get_transaction = (input) => create_or_get_transaction.immediate(input);
    const delete_orphaned_transaction = connection.transaction(
      (asset_id: AssetId, cutoff_at: string, unlink_file: () => void): boolean => {
        const deleted = this.#delete_orphaned.run(asset_id, cutoff_at).changes === 1;
        if (!deleted) {
          return false;
        }
        unlink_file();
        return true;
      },
    );
    this.#delete_orphaned_transaction = (asset_id, cutoff_at, unlink_file) =>
      delete_orphaned_transaction.immediate(asset_id, cutoff_at, unlink_file);
  }

  create_or_get(input: CreateAssetInput): StoredAsset {
    return this.#create_or_get_transaction(input);
  }

  #create_or_get(input: CreateAssetInput): StoredAsset {
    const sha256 = Sha256Schema.parse(input.sha256);
    const owner_token_hash = OwnerTokenHashSchema.parse(input.owner_token_hash);
    const asset_kind = AssetKindSchema.parse(input.asset_kind);
    const media_type = AssetMediaTypeSchema.parse(input.media_type);
    if (!Number.isSafeInteger(input.byte_length) || input.byte_length <= 0) {
      throw new TypeError("Asset byte length is invalid");
    }
    const created_at = OccurredAtSchema.parse(input.created_at);
    const existing = this.#select_by_sha256.get(owner_token_hash, asset_kind, sha256) as
      AssetRow | undefined;
    if (existing !== undefined) {
      return parse_asset_row(existing);
    }
    const asset_id = AssetIdSchema.parse(this.#uuid_factory());
    const relative_path = `assets/${asset_id}.${extension_for(media_type)}`;
    const insert_result = this.#insert_asset.run({
      asset_id,
      sha256,
      owner_token_hash,
      asset_kind,
      media_type,
      byte_length: input.byte_length,
      relative_path,
      created_at,
    });
    const row =
      insert_result.changes === 0
        ? (this.#select_by_sha256.get(owner_token_hash, asset_kind, sha256) as AssetRow | undefined)
        : (this.#select_by_id_for_worker.get(asset_id) as AssetRow | undefined);
    if (row === undefined) {
      throw new Error("Asset insert did not produce a readable row");
    }
    return parse_asset_row(row);
  }

  get_by_id_for_worker(asset_id: AssetId): StoredAsset | undefined {
    AssetIdSchema.parse(asset_id);
    const row = this.#select_by_id_for_worker.get(asset_id) as AssetRow | undefined;
    return row === undefined ? undefined : parse_asset_row(row);
  }

  get_by_id_for_owner(
    asset_id: AssetId,
    owner_token_hash: OwnerTokenHash,
  ): StoredAsset | undefined {
    AssetIdSchema.parse(asset_id);
    const normalized_owner_token_hash = OwnerTokenHashSchema.parse(owner_token_hash);
    const row = this.#select_by_id_for_owner.get(asset_id, normalized_owner_token_hash) as
      AssetRow | undefined;
    return row === undefined ? undefined : parse_asset_row(row);
  }

  attach_to_job(input: AttachAssetInput): void {
    const job_id = JobIdSchema.parse(input.job_id);
    const owner_token_hash = OwnerTokenHashSchema.parse(input.owner_token_hash);
    const asset_id = AssetIdSchema.parse(input.asset_id);
    if (!Number.isSafeInteger(input.position) || input.position < 0) {
      throw new TypeError("Asset position is invalid");
    }
    this.#attach_asset.run({
      job_id,
      owner_token_hash,
      asset_id,
      position: input.position,
    });
  }

  list_for_job_for_worker(job_id: JobId): StoredJobAsset[] {
    JobIdSchema.parse(job_id);
    const rows = this.#select_for_job_for_worker.all(job_id) as JobAssetRow[];
    return rows.map((row) => {
      if (!Number.isSafeInteger(row.position) || row.position < 0) {
        throw new Error("Stored asset position is invalid");
      }
      return { ...parse_asset_row(row), position: row.position };
    });
  }

  list_orphaned(cutoff_at: string): StoredAsset[] {
    const normalized_cutoff_at = OccurredAtSchema.parse(cutoff_at);
    return (this.#select_orphaned.all(normalized_cutoff_at) as AssetRow[]).map(parse_asset_row);
  }

  delete_orphaned(asset_id: AssetId, cutoff_at: string, unlink_file: () => void): boolean {
    const normalized_asset_id = AssetIdSchema.parse(asset_id);
    const normalized_cutoff_at = OccurredAtSchema.parse(cutoff_at);
    return this.#delete_orphaned_transaction(
      normalized_asset_id,
      normalized_cutoff_at,
      unlink_file,
    );
  }
}

function parse_asset_row(row: AssetRow): StoredAsset {
  if (!Number.isSafeInteger(row.byte_length) || row.byte_length <= 0) {
    throw new Error("Stored asset byte length is invalid");
  }
  return {
    asset_id: AssetIdSchema.parse(row.asset_id),
    sha256: Sha256Schema.parse(row.sha256),
    owner_token_hash: OwnerTokenHashSchema.parse(row.owner_token_hash),
    asset_kind: AssetKindSchema.parse(row.asset_kind),
    media_type: AssetMediaTypeSchema.parse(row.media_type),
    byte_length: row.byte_length,
    relative_path: validate_relative_path(row.relative_path),
    created_at: OccurredAtSchema.parse(row.created_at),
  };
}

function extension_for(media_type: AssetMediaType): string {
  switch (media_type) {
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
  }
}

function validate_relative_path(value: string): string {
  if (!/^assets\/[0-9a-f-]+\.(?:jpg|png|webp)$/u.test(value) || value.includes("..")) {
    throw new Error("Stored asset path is invalid");
  }
  return value;
}
