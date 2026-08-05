import { Router } from "express";
import { GatewayCapabilitiesResponseSchema, type ProviderId } from "@tavern-canvas/contracts";

import type { GatewayConfig } from "../../config/config_schema.js";
import type { GatewayAdapter } from "../../jobs/job_worker.js";

export interface CapabilitiesRouteOptions {
  readonly config: GatewayConfig;
  readonly adapters: ReadonlyMap<ProviderId, GatewayAdapter>;
}

export function create_capabilities_router(options: CapabilitiesRouteOptions): Router {
  const router = Router();
  router.get("/capabilities", (_request, response) => {
    const providers = options.config.provider_profiles.map((provider) => {
      const adapter = options.adapters.get(provider.provider_id);
      return {
        provider_id: provider.provider_id,
        capabilities: adapter === undefined ? [] : [...adapter.capabilities].sort(),
      };
    });
    response.json(
      GatewayCapabilitiesResponseSchema.parse({
        protocol_version: "1.0",
        providers,
        limits: {
          max_concurrency: options.config.concurrency,
          max_image_count: 4,
          max_request_bytes: options.config.limits.max_request_bytes,
        },
      }),
    );
  });
  return router;
}
