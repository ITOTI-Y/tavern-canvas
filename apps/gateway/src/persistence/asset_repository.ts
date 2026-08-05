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

const OccurredAtSchema = z.iso.datetime({ offset: false });
const AssetMediaTypeSchema = z.enum(["image/png", "image/jpeg", "image/webp"]);

type AssetMediaType = z.infer<typeof AssetMediaTypeSchema>;

interface AssetRow {
  readonly asset_id: string;
  readonly sha256: string;
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
  readonly media_type: AssetMediaType;
  readonly byte_length: number;
  readonly created_at: string;
}

export interface AttachAssetInput {
  readonly job_id: JobId;
  readonly asset_id: AssetId;
  readonly position: number;
}

export interface AssetRepositoryOptions {
  readonly uuid_factory?: () => string;
}

export class AssetRepository {
  readonly #uuid_factory: () => string;
  readonly #select_by_id: Database.Statement;
  readonly #select_by_sha256: Database.Statement;
  readonly #insert_asset: Database.Statement;
  readonly #attach_asset: Database.Statement;
  readonly #select_for_job: Database.Statement;
  readonly #create_or_get_transaction: (input: CreateAssetInput) => StoredAsset;

  constructor(connection: Database.Database, options: AssetRepositoryOptions = {}) {
    this.#uuid_factory = options.uuid_factory ?? randomUUID;
    this.#select_by_id = connection.prepare("SELECT * FROM assets WHERE asset_id = ?");
    this.#select_by_sha256 = connection.prepare("SELECT * FROM assets WHERE sha256 = ?");
    this.#insert_asset = connection.prepare(`
      INSERT INTO assets (
        asset_id, sha256, media_type, byte_length, relative_path, created_at
      ) VALUES (
        @asset_id, @sha256, @media_type, @byte_length, @relative_path, @created_at
      )
      ON CONFLICT(sha256) DO NOTHING
    `);
    this.#attach_asset = connection.prepare(`
      INSERT INTO job_assets (job_id, asset_id, position)
      VALUES (@job_id, @asset_id, @position)
      ON CONFLICT(job_id, asset_id) DO UPDATE SET position = excluded.position
    `);
    this.#select_for_job = connection.prepare(`
      SELECT assets.*, job_assets.position
      FROM job_assets
      JOIN assets ON assets.asset_id = job_assets.asset_id
      WHERE job_assets.job_id = ?
      ORDER BY job_assets.position, assets.asset_id
    `);
    const create_or_get_transaction = connection.transaction((input: CreateAssetInput) =>
      this.#create_or_get(input),
    );
    this.#create_or_get_transaction = (input) => create_or_get_transaction.immediate(input);
  }

  create_or_get(input: CreateAssetInput): StoredAsset {
    return this.#create_or_get_transaction(input);
  }

  #create_or_get(input: CreateAssetInput): StoredAsset {
    const sha256 = Sha256Schema.parse(input.sha256);
    const media_type = AssetMediaTypeSchema.parse(input.media_type);
    if (!Number.isSafeInteger(input.byte_length) || input.byte_length <= 0) {
      throw new TypeError("Asset byte length is invalid");
    }
    const created_at = OccurredAtSchema.parse(input.created_at);
    const existing = this.#select_by_sha256.get(sha256) as AssetRow | undefined;
    if (existing !== undefined) {
      return parse_asset_row(existing);
    }
    const asset_id = AssetIdSchema.parse(this.#uuid_factory());
    const relative_path = `assets/${asset_id}.${extension_for(media_type)}`;
    const insert_result = this.#insert_asset.run({
      asset_id,
      sha256,
      media_type,
      byte_length: input.byte_length,
      relative_path,
      created_at,
    });
    const row =
      insert_result.changes === 0
        ? (this.#select_by_sha256.get(sha256) as AssetRow | undefined)
        : (this.#select_by_id.get(asset_id) as AssetRow | undefined);
    if (row === undefined) {
      throw new Error("Asset insert did not produce a readable row");
    }
    return parse_asset_row(row);
  }

  get_by_id(asset_id: AssetId): StoredAsset | undefined {
    AssetIdSchema.parse(asset_id);
    const row = this.#select_by_id.get(asset_id) as AssetRow | undefined;
    return row === undefined ? undefined : parse_asset_row(row);
  }

  attach_to_job(input: AttachAssetInput): void {
    const job_id = JobIdSchema.parse(input.job_id);
    const asset_id = AssetIdSchema.parse(input.asset_id);
    if (!Number.isSafeInteger(input.position) || input.position < 0) {
      throw new TypeError("Asset position is invalid");
    }
    this.#attach_asset.run({
      job_id,
      asset_id,
      position: input.position,
    });
  }

  list_for_job(job_id: JobId): StoredJobAsset[] {
    JobIdSchema.parse(job_id);
    const rows = this.#select_for_job.all(job_id) as JobAssetRow[];
    return rows.map((row) => {
      if (!Number.isSafeInteger(row.position) || row.position < 0) {
        throw new Error("Stored asset position is invalid");
      }
      return { ...parse_asset_row(row), position: row.position };
    });
  }
}

function parse_asset_row(row: AssetRow): StoredAsset {
  if (!Number.isSafeInteger(row.byte_length) || row.byte_length <= 0) {
    throw new Error("Stored asset byte length is invalid");
  }
  return {
    asset_id: AssetIdSchema.parse(row.asset_id),
    sha256: Sha256Schema.parse(row.sha256),
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
