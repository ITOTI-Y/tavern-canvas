import { pathToFileURL } from "node:url";
import { createServer, type Server } from "node:http";
import path from "node:path";

import {
  ComfyUiAdapter,
  GoogleImageAdapter,
  NovelAiAdapter,
  OpenAiImageAdapter,
  SdWebuiAdapter,
  type ProviderTransport,
} from "@tavern-canvas/providers";

import { AssetStore } from "./assets/asset_store.js";
import { load_gateway_config, type GatewayConfig } from "./config/load_config.js";
import { create_app, type GatewayApplication } from "./http/create_app.js";
import { JobService } from "./jobs/job_service.js";
import {
  JobWorker,
  type GatewayAdapter,
  type ProviderTransportFactory,
} from "./jobs/job_worker.js";
import { create_gateway_logger, type GatewayLogger } from "./logging/logger.js";
import { open_gateway_database, type GatewayDatabase } from "./persistence/database.js";
import { AssetRepository } from "./persistence/asset_repository.js";
import { JobRepository } from "./persistence/job_repository.js";
import { ProviderHttpTransport } from "./transport/provider_http_transport.js";

export interface GatewayRuntimeOptions {
  readonly config?: GatewayConfig;
  readonly adapters?: ReadonlyMap<GatewayAdapter["provider_id"], GatewayAdapter>;
  readonly logger?: GatewayLogger;
  readonly clock?: () => string;
  readonly fetcher?: typeof fetch;
  readonly transport_factory?: ProviderTransportFactory;
}

export interface GatewayRuntime {
  readonly config: GatewayConfig;
  readonly database: GatewayDatabase;
  readonly app: GatewayApplication;
  readonly server: Server | undefined;
  start(): Promise<Server>;
  stop(): Promise<void>;
}

export function create_gateway_runtime(options: GatewayRuntimeOptions = {}): GatewayRuntime {
  const config = options.config ?? load_gateway_config();
  const database = open_gateway_database({
    file_path: path.join(config.data_directory, "tavern_canvas.sqlite"),
  });
  const job_repository = new JobRepository(database.connection);
  const asset_repository = new AssetRepository(database.connection);
  const asset_store = new AssetStore({
    data_directory: config.data_directory,
    asset_repository,
    ...config.limits,
  });
  const logger = options.logger ?? create_gateway_logger();
  const adapters = options.adapters ?? create_default_adapters();
  const transport_factory =
    options.transport_factory ??
    ({
      create: (provider) =>
        new ProviderHttpTransport({
          provider,
          ...(options.fetcher === undefined ? {} : { fetcher: options.fetcher }),
        }),
    } satisfies ProviderTransportFactory);
  const service = new JobService({
    job_repository,
    asset_repository,
    config,
    ...(options.clock === undefined ? {} : { clock: options.clock }),
  });
  const worker = new JobWorker({
    service,
    asset_store,
    config,
    adapters,
    transport_factory,
    logger,
    ...(options.clock === undefined ? {} : { clock: options.clock }),
  });
  const application = create_app({
    config,
    job_repository,
    asset_repository,
    asset_store,
    adapters,
    logger,
    worker,
    service,
    ...(options.clock === undefined ? {} : { clock: options.clock }),
  });
  let server: Server | undefined;
  let stopped = false;
  return {
    config,
    database,
    app: application,
    get server() {
      return server;
    },
    async start(): Promise<Server> {
      if (server !== undefined) {
        return server;
      }
      await application.gateway.ready;
      server = await listen(application, config.bind_port, config.bind_host);
      return server;
    },
    async stop(): Promise<void> {
      if (stopped) {
        return;
      }
      stopped = true;
      await application.gateway.stop();
      if (server !== undefined) {
        await close_server(server);
        server = undefined;
      }
      database.close();
    },
  };
}

export async function start_gateway(options: GatewayRuntimeOptions = {}): Promise<GatewayRuntime> {
  const runtime = create_gateway_runtime(options);
  await runtime.start();
  return runtime;
}

function create_default_adapters(): ReadonlyMap<GatewayAdapter["provider_id"], GatewayAdapter> {
  const comfyui = new ComfyUiAdapter({
    workflow_store: {
      load: () => {
        throw new Error("ComfyUI workflow storage is not configured");
      },
    },
  });
  const adapters = new Map<GatewayAdapter["provider_id"], GatewayAdapter>();
  adapters.set("sd_webui", new SdWebuiAdapter());
  adapters.set("novelai", new NovelAiAdapter());
  adapters.set("comfyui", comfyui);
  adapters.set("openai_image", new OpenAiImageAdapter());
  adapters.set("google_image", new GoogleImageAdapter());
  return adapters;
}

async function listen(
  application: GatewayApplication,
  port: number,
  host: string,
): Promise<Server> {
  const server = createServer(application);
  await new Promise<void>((resolve, reject) => {
    const on_error = (error: Error): void => {
      server.off("listening", on_listening);
      reject(error);
    };
    const on_listening = (): void => {
      server.off("error", on_error);
      resolve();
    };
    server.once("error", on_error);
    server.once("listening", on_listening);
    server.listen(port, host);
  });
  return server;
}

async function close_server(server: Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error === undefined) {
        resolve();
      } else {
        reject(error);
      }
    });
  });
}

const entrypoint = process.argv[1];
if (entrypoint !== undefined && import.meta.url === pathToFileURL(path.resolve(entrypoint)).href) {
  const runtime = await start_gateway();
  const shutdown = (): void => {
    void runtime.stop().finally(() => process.exit(0));
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

export type { ProviderTransport };
