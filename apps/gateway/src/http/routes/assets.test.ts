// @vitest-environment node
import { createServer, type Server } from "node:http";
import { mkdtemp, rm, unlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { AssetIdSchema } from "@tavern-canvas/contracts";
import express from "express";
import { afterEach, describe, expect, it } from "vitest";

import { AssetStore } from "../../assets/asset_store.js";
import type { GatewayConfig } from "../../config/config_schema.js";
import { AssetRepository } from "../../persistence/asset_repository.js";
import { open_gateway_database, type GatewayDatabase } from "../../persistence/database.js";
import { create_gateway_error_handler } from "../error_handler.js";
import { create_assets_router } from "./assets.js";

const PNG_BYTES = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);
const CREATED_AT = "2026-08-05T12:00:00.000Z";
const limits = {
  max_image_bytes: 2_000_000,
  max_image_pixels: 4_000_000,
  max_image_dimension: 2_048,
};

type WriteFile = (file_path: string, bytes: Uint8Array) => Promise<void>;

const temporary_directories: string[] = [];
const open_databases: GatewayDatabase[] = [];
const open_servers: Server[] = [];

afterEach(async () => {
  for (const server of open_servers.splice(0)) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
  for (const database of open_databases.splice(0)) {
    database.close();
  }
  for (const directory of temporary_directories.splice(0)) {
    await rm(directory, { force: true, recursive: true });
  }
});

async function create_assets_server(write_file?: WriteFile) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-canvas-assets-route-"));
  temporary_directories.push(directory);
  const database = open_gateway_database({ file_path: path.join(directory, "gateway.sqlite") });
  open_databases.push(database);
  const asset_repository = new AssetRepository(database.connection);
  const asset_store = new AssetStore({
    data_directory: directory,
    asset_repository,
    ...limits,
    ...(write_file === undefined ? {} : { write_file }),
  });
  const config = { limits } as GatewayConfig;
  const app = express();
  app.use("/v1", create_assets_router({ config, asset_store, clock: () => CREATED_AT }));
  app.use(create_gateway_error_handler());
  const server = createServer(app);
  open_servers.push(server);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Asset route test server did not expose a loopback address");
  }
  return {
    base_url: `http://127.0.0.1:${String(address.port)}`,
    asset_store,
    directory,
  };
}

describe("asset upload routes", () => {
  it("maps storage write failures to a retryable server error", async () => {
    const gateway = await create_assets_server(async () => {
      throw new Error("synthetic disk full");
    });

    const response = await fetch(`${gateway.base_url}/v1/assets`, {
      method: "POST",
      headers: { "content-type": "image/png" },
      body: PNG_BYTES,
    });

    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({
      protocol_version: "1.0",
      error: { code: "internal_error", retryable: true },
    });
  });

  it("keeps missing content distinct from missing asset metadata", async () => {
    const gateway = await create_assets_server();
    const upload = await fetch(`${gateway.base_url}/v1/assets`, {
      method: "POST",
      headers: { "content-type": "image/png" },
      body: PNG_BYTES,
    });
    expect(upload.status).toBe(201);
    const uploaded = (await upload.json()) as { asset_id: string };
    const asset_id = AssetIdSchema.parse(uploaded.asset_id);
    const metadata = gateway.asset_store.get_metadata(asset_id);
    if (metadata === undefined) {
      throw new Error("Asset upload did not create metadata");
    }
    await unlink(path.resolve(gateway.directory, metadata.relative_path));

    const content = await fetch(`${gateway.base_url}/v1/assets/${uploaded.asset_id}/content`);
    expect(content.status).toBe(404);
    expect(await content.json()).toMatchObject({
      error: { code: "asset_content_unavailable", retryable: false },
    });
  });
});
