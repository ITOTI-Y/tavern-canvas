import { randomUUID } from "node:crypto";

import express, { type Application } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { z } from "zod";

import type { ProviderId } from "@tavern-canvas/contracts";

import type { AssetStore } from "../assets/asset_store.js";
import type { GatewayConfig } from "../config/config_schema.js";
import { create_bearer_authentication } from "./authentication.js";
import { create_gateway_error_handler, GatewayHttpError } from "./error_handler.js";
import { create_assets_router } from "./routes/assets.js";
import { create_capabilities_router } from "./routes/capabilities.js";
import { create_job_events_router } from "./routes/job_events.js";
import { create_jobs_router } from "./routes/jobs.js";
import { JobService } from "../jobs/job_service.js";
import { JobWorker, type GatewayAdapter } from "../jobs/job_worker.js";
import type { AssetRepository } from "../persistence/asset_repository.js";
import type { JobRepository } from "../persistence/job_repository.js";
import type { GatewayLogger } from "../logging/logger.js";
import { create_gateway_logger } from "../logging/logger.js";
import {
  get_request_correlation_id,
  get_request_token_hash,
  set_request_correlation_id,
} from "./request_context.js";

export interface GatewayAppOptions {
  readonly config: GatewayConfig;
  readonly job_repository: JobRepository;
  readonly asset_repository: AssetRepository;
  readonly asset_store: AssetStore;
  readonly adapters: ReadonlyMap<ProviderId, GatewayAdapter>;
  readonly logger?: GatewayLogger;
  readonly worker?: JobWorker;
  readonly service?: JobService;
  readonly database_ready?: () => boolean;
  readonly clock?: () => string;
  readonly auto_start_worker?: boolean;
}

export interface GatewayAppHandle {
  readonly service: JobService;
  readonly worker: JobWorker;
  readonly asset_store: AssetStore;
  readonly logger: GatewayLogger;
  readonly ready: Promise<void>;
  stop(): Promise<void>;
}

export interface GatewayApplication extends Application {
  readonly gateway: GatewayAppHandle;
}

const CORRELATION_ID_SCHEMA = z.uuid();

export function create_app(options: GatewayAppOptions): GatewayApplication {
  const logger = options.logger ?? create_gateway_logger();
  const service =
    options.service ??
    new JobService({
      job_repository: options.job_repository,
      asset_repository: options.asset_repository,
      config: options.config,
      ...(options.clock === undefined ? {} : { clock: options.clock }),
    });
  const worker =
    options.worker ??
    new JobWorker({
      service,
      asset_store: options.asset_store,
      config: options.config,
      adapters: options.adapters,
      logger,
      ...(options.clock === undefined ? {} : { clock: options.clock }),
    });
  const application = express();
  application.disable("x-powered-by");
  application.use(helmet());
  application.use(create_correlation_middleware());
  application.use(create_exact_cors_middleware(options.config.cors_origins));
  application.get("/healthz", (_request, response) => {
    const database_ready = options.database_ready?.() ?? true;
    const ready = database_ready;
    response.status(ready ? 200 : 503).json({
      status: ready ? "ok" : "not_ready",
      process: { ready: true },
      database: { ready: database_ready },
    });
  });
  const authentication = create_bearer_authentication({
    token_hashes: options.config.bearer_token_hashes,
  });
  const limiter = rateLimit({
    windowMs: 60_000,
    limit: 120,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    keyGenerator: (request) => get_request_token_hash(request) ?? "anonymous",
    handler: (_request, response) => {
      response.status(429).json({
        protocol_version: "1.0",
        error: {
          code: "rate_limited",
          retryable: true,
          correlation_id: get_request_correlation_id(_request) ?? "unknown",
        },
      });
    },
  });
  application.use("/v1", authentication, limiter);
  application.use(
    "/v1",
    express.json({
      limit: options.config.limits.max_request_bytes,
      strict: true,
    }),
  );
  application.use(
    "/v1",
    create_capabilities_router({ config: options.config, adapters: options.adapters }),
  );
  application.use(
    "/v1",
    create_assets_router({
      config: options.config,
      asset_store: options.asset_store,
      ...(options.clock === undefined ? {} : { clock: options.clock }),
    }),
  );
  application.use("/v1", create_job_events_router({ service }));
  application.use("/v1", create_jobs_router({ service, worker }));
  application.use((_request, _response, next) => {
    next(new GatewayHttpError(404, "not_found"));
  });
  application.use(create_gateway_error_handler());

  const should_start = options.auto_start_worker ?? true;
  const ready = should_start
    ? worker.start().catch((error: unknown) => {
        logger.error({ error }, "Gateway worker failed to start");
        throw error;
      })
    : Promise.resolve();
  const gateway: GatewayAppHandle = {
    service,
    worker,
    asset_store: options.asset_store,
    logger,
    ready,
    stop: async () => {
      await worker.stop();
      logger.flush();
    },
  };
  return Object.assign(application, { gateway });
}

export const create_gateway_app = create_app;

function create_correlation_middleware() {
  return (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): void => {
    const supplied = request.header("x-request-id");
    const correlation_id =
      supplied !== undefined && CORRELATION_ID_SCHEMA.safeParse(supplied).success
        ? supplied
        : randomUUID();
    set_request_correlation_id(request, correlation_id);
    response.setHeader("x-request-id", correlation_id);
    next();
  };
}

function create_exact_cors_middleware(origins: readonly string[]) {
  const allowed_origins = new Set(origins);
  return (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): void => {
    const origin = request.header("origin");
    if (origin === undefined) {
      next();
      return;
    }
    if (!allowed_origins.has(origin)) {
      next(new GatewayHttpError(403, "cors_origin_denied"));
      return;
    }
    response.setHeader("access-control-allow-origin", origin);
    response.setHeader("vary", "Origin");
    if (request.method === "OPTIONS") {
      response.setHeader("access-control-allow-methods", "GET,POST,DELETE,OPTIONS");
      response.setHeader(
        "access-control-allow-headers",
        "Authorization,Content-Type,Last-Event-ID,X-Request-ID",
      );
      response.status(204).end();
      return;
    }
    next();
  };
}
