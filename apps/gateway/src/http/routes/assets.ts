import express, { Router } from "express";
import { AssetIdSchema } from "@tavern-canvas/contracts";

import type { GatewayConfig } from "../../config/config_schema.js";
import { AssetStore, AssetStoreError } from "../../assets/asset_store.js";
import { GatewayHttpError } from "../error_handler.js";

export interface AssetsRouteOptions {
  readonly config: GatewayConfig;
  readonly asset_store: AssetStore;
  readonly clock?: () => string;
}

export function create_assets_router(options: AssetsRouteOptions): Router {
  const router = Router();
  const raw_image_body = express.raw({
    type: () => true,
    limit: options.config.limits.max_image_bytes,
  });

  router.post("/assets", raw_image_body, async (request, response) => {
    if (
      Object.keys(request.query).length > 0 ||
      request.header("content-disposition") !== undefined
    ) {
      throw new GatewayHttpError(400, "invalid_asset");
    }
    const body: unknown = request.body as unknown;
    if (!Buffer.isBuffer(body) && !(body instanceof Uint8Array)) {
      throw new GatewayHttpError(400, "invalid_asset");
    }
    try {
      const result = await options.asset_store.ingest_reference_image(
        body,
        request.header("content-type") ?? "",
        (options.clock ?? (() => new Date().toISOString()))(),
      );
      response.status(201).json({
        protocol_version: "1.0",
        asset_id: result.asset.asset_id,
        sha256: result.asset.sha256,
        media_type: result.asset.media_type,
        byte_length: result.asset.byte_length,
      });
    } catch (error) {
      throw map_asset_error(error);
    }
  });

  router.get("/assets/:asset_id", (request, response) => {
    const asset_id = AssetIdSchema.parse(request.params.asset_id);
    const asset = options.asset_store.get_metadata(asset_id);
    if (asset === undefined) {
      throw new GatewayHttpError(404, "asset_not_found");
    }
    response.json({
      protocol_version: "1.0",
      asset_id: asset.asset_id,
      sha256: asset.sha256,
      media_type: asset.media_type,
      byte_length: asset.byte_length,
      created_at: asset.created_at,
    });
  });

  router.get("/assets/:asset_id/content", async (request, response) => {
    const asset_id = AssetIdSchema.parse(request.params.asset_id);
    try {
      const result = await options.asset_store.read_bytes(asset_id);
      response
        .status(200)
        .setHeader("content-type", result.asset.media_type)
        .setHeader("content-length", String(result.bytes.byteLength))
        .send(Buffer.from(result.bytes));
    } catch (error) {
      throw map_asset_error(error);
    }
  });

  return router;
}

function map_asset_error(error: unknown): GatewayHttpError {
  if (error instanceof AssetStoreError) {
    switch (error.code) {
      case "asset_not_found":
        return new GatewayHttpError(404, "asset_not_found");
      case "asset_content_unavailable":
        return new GatewayHttpError(404, "asset_content_unavailable");
      case "invalid_asset":
        return new GatewayHttpError(400, "invalid_asset");
    }
  }
  return new GatewayHttpError(400, "invalid_asset");
}
