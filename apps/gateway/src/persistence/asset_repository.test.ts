// @vitest-environment node

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { AssetRepository } from "./asset_repository.js";
import { open_gateway_database, type GatewayDatabase } from "./database.js";

const JOB_ID = "11111111-1111-4111-8111-111111111111";
const ASSET_ID = "22222222-2222-4222-8222-222222222222";
const OWNER_TOKEN_HASH = "a".repeat(64);
const OTHER_OWNER_TOKEN_HASH = "b".repeat(64);
const OTHER_ASSET_ID = "33333333-3333-4333-8333-333333333333";
const OTHER_KIND_ASSET_ID = "44444444-4444-4444-8444-444444444444";
const CREATED_AT = "2026-08-05T12:00:00.000Z";
const RETENTION_CUTOFF = "2026-08-06T00:00:00.000Z";

let directory = "";
let file_path = "";
let database: GatewayDatabase;

beforeEach(() => {
  directory = mkdtempSync(path.join(tmpdir(), "tavern-canvas-assets-"));
  file_path = path.join(directory, "tavern_canvas.sqlite");
  database = open_gateway_database({ file_path });
  database.connection
    .prepare(
      `INSERT INTO jobs (
        job_id, request_id, provider_id, owner_token_hash, state, request_json, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      JOB_ID,
      ASSET_ID,
      "openai_image",
      OWNER_TOKEN_HASH,
      "queued",
      "{}",
      CREATED_AT,
      CREATED_AT,
    );
});

afterEach(() => {
  database.close();
  rmSync(directory, { force: true, recursive: true });
});

describe("AssetRepository", () => {
  it("retains repeated asset IDs at distinct positions after reopening", () => {
    const assets = new AssetRepository(database.connection, {
      uuid_factory: () => ASSET_ID,
    });
    const asset = assets.create_or_get({
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_kind: "reference",
      sha256: "a".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });

    assets.attach_to_job({
      job_id: JOB_ID,
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_id: asset.asset_id,
      position: 0,
    });
    assets.attach_to_job({
      job_id: JOB_ID,
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_id: asset.asset_id,
      position: 1,
    });
    expect(
      assets
        .list_for_job_for_worker(JOB_ID)
        .map(({ asset_id, position }) => ({ asset_id, position })),
    ).toEqual([
      { asset_id: ASSET_ID, position: 0 },
      { asset_id: ASSET_ID, position: 1 },
    ]);

    database.close();
    database = open_gateway_database({ file_path });
    const reopened_assets = new AssetRepository(database.connection);

    expect(
      reopened_assets
        .list_for_job_for_worker(JOB_ID)
        .map(({ asset_id, position }) => ({ asset_id, position })),
    ).toEqual([
      { asset_id: ASSET_ID, position: 0 },
      { asset_id: ASSET_ID, position: 1 },
    ]);
  });
  it("restricts asset reads to exact owners", () => {
    const assets = new AssetRepository(database.connection, {
      uuid_factory: () => ASSET_ID,
    });
    const asset = assets.create_or_get({
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_kind: "reference",
      sha256: "c".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });

    expect(assets.get_by_id_for_owner(asset.asset_id, OWNER_TOKEN_HASH)).toEqual(asset);
    expect(assets.get_by_id_for_owner(asset.asset_id, OTHER_OWNER_TOKEN_HASH)).toBeUndefined();

    const other_owner_assets = new AssetRepository(database.connection, {
      uuid_factory: () => OTHER_ASSET_ID,
    });
    const other_owner_asset = other_owner_assets.create_or_get({
      owner_token_hash: OTHER_OWNER_TOKEN_HASH,
      asset_kind: "reference",
      sha256: asset.sha256,
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    expect(() =>
      assets.attach_to_job({
        job_id: JOB_ID,
        owner_token_hash: OWNER_TOKEN_HASH,
        asset_id: other_owner_asset.asset_id,
        position: 0,
      }),
    ).toThrow();
    expect(other_owner_asset).not.toEqual(asset);
    expect(other_owner_asset.owner_token_hash).toBe(OTHER_OWNER_TOKEN_HASH);
    expect(assets.get_by_id_for_owner(asset.asset_id, OTHER_OWNER_TOKEN_HASH)).toBeUndefined();

    const other_kind_assets = new AssetRepository(database.connection, {
      uuid_factory: () => OTHER_KIND_ASSET_ID,
    });
    const other_kind_asset = other_kind_assets.create_or_get({
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_kind: "generated",
      sha256: asset.sha256,
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    expect(other_kind_asset).not.toEqual(asset);
    expect(other_kind_asset.asset_kind).toBe("generated");

    database.close();
    database = open_gateway_database({ file_path });
    const reopened_assets = new AssetRepository(database.connection);
    expect(
      reopened_assets.get_by_id_for_owner(asset.asset_id, OTHER_OWNER_TOKEN_HASH),
    ).toBeUndefined();
    expect(
      reopened_assets.get_by_id_for_owner(other_owner_asset.asset_id, OTHER_OWNER_TOKEN_HASH),
    ).toEqual(other_owner_asset);
  });
  it("retains new and attached assets while deleting expired unreferenced assets", () => {
    const assets = new AssetRepository(database.connection);
    const old_generated = assets.create_or_get({
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_kind: "generated",
      sha256: "d".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    const old_reference = assets.create_or_get({
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_kind: "reference",
      sha256: "e".repeat(64),
      media_type: "image/jpeg",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    const attached = assets.create_or_get({
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_kind: "generated",
      sha256: "f".repeat(64),
      media_type: "image/webp",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    const recent = assets.create_or_get({
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_kind: "reference",
      sha256: "1".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: "2026-08-07T12:00:00.000Z",
    });
    assets.attach_to_job({
      job_id: JOB_ID,
      owner_token_hash: OWNER_TOKEN_HASH,
      asset_id: attached.asset_id,
      position: 0,
    });

    expect(assets.list_orphaned(RETENTION_CUTOFF)).toEqual(
      expect.arrayContaining([old_generated, old_reference]),
    );
    expect(assets.list_orphaned(RETENTION_CUTOFF)).toHaveLength(2);

    let attached_unlink_calls = 0;
    expect(
      assets.delete_orphaned(attached.asset_id, RETENTION_CUTOFF, () => {
        attached_unlink_calls += 1;
      }),
    ).toBe(false);
    expect(attached_unlink_calls).toBe(0);
    expect(assets.get_by_id_for_worker(attached.asset_id)).toEqual(attached);
    expect(assets.get_by_id_for_worker(recent.asset_id)).toEqual(recent);

    expect(assets.delete_orphaned(old_generated.asset_id, RETENTION_CUTOFF, () => undefined)).toBe(
      true,
    );
    expect(assets.delete_orphaned(old_reference.asset_id, RETENTION_CUTOFF, () => undefined)).toBe(
      true,
    );
    expect(assets.get_by_id_for_worker(old_generated.asset_id)).toBeUndefined();
    expect(assets.get_by_id_for_worker(old_reference.asset_id)).toBeUndefined();
  });
});
