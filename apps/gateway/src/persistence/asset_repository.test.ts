// @vitest-environment node

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { AssetRepository } from "./asset_repository.js";
import { open_gateway_database, type GatewayDatabase } from "./database.js";

const JOB_ID = "11111111-1111-4111-8111-111111111111";
const ASSET_ID = "22222222-2222-4222-8222-222222222222";
const CREATED_AT = "2026-08-05T12:00:00.000Z";

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
        job_id, request_id, provider_id, state, request_json, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(JOB_ID, ASSET_ID, "openai_image", "queued", "{}", CREATED_AT, CREATED_AT);
});

afterEach(() => {
  database.close();
  rmSync(directory, { force: true, recursive: true });
});

describe("AssetRepository job output positions", () => {
  it("retains repeated asset IDs at distinct positions after reopening", () => {
    const assets = new AssetRepository(database.connection, {
      uuid_factory: () => ASSET_ID,
    });
    const asset = assets.create_or_get({
      sha256: "a".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });

    assets.attach_to_job({ job_id: JOB_ID, asset_id: asset.asset_id, position: 0 });
    assets.attach_to_job({ job_id: JOB_ID, asset_id: asset.asset_id, position: 1 });
    expect(
      assets.list_for_job(JOB_ID).map(({ asset_id, position }) => ({ asset_id, position })),
    ).toEqual([
      { asset_id: ASSET_ID, position: 0 },
      { asset_id: ASSET_ID, position: 1 },
    ]);

    database.close();
    database = open_gateway_database({ file_path });
    const reopened_assets = new AssetRepository(database.connection);

    expect(
      reopened_assets
        .list_for_job(JOB_ID)
        .map(({ asset_id, position }) => ({ asset_id, position })),
    ).toEqual([
      { asset_id: ASSET_ID, position: 0 },
      { asset_id: ASSET_ID, position: 1 },
    ]);
  });
});
