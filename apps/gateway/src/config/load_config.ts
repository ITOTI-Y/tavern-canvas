import path from "node:path";

import { GatewayConfigSchema, type GatewayConfig } from "./config_schema.js";

const DEFAULT_BIND_HOST = "127.0.0.1";
const DEFAULT_BIND_PORT = 8787;
const DEFAULT_DATA_DIRECTORY = "output/gateway";
const DEFAULT_CONCURRENCY = 2;
const DEFAULT_MAX_REQUEST_BYTES = 2_000_000;
const DEFAULT_MAX_IMAGE_BYTES = 20_000_000;
const DEFAULT_MAX_IMAGE_PIXELS = 40_000_000;
const DEFAULT_MAX_IMAGE_DIMENSION = 8_192;

export interface LoadGatewayConfigOptions {
  readonly env?: Readonly<Record<string, string | undefined>>;
  readonly cwd?: string;
}

export class GatewayConfigError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "GatewayConfigError";
  }
}

export function load_gateway_config(options: LoadGatewayConfigOptions = {}): GatewayConfig {
  const env = options.env ?? process.env;
  const cwd = options.cwd ?? process.cwd();
  const data_directory = resolve_data_directory(
    env.TAVERN_CANVAS_DATA_DIR ?? DEFAULT_DATA_DIRECTORY,
    cwd,
  );
  const input = {
    bind_host: env.TAVERN_CANVAS_BIND_HOST ?? DEFAULT_BIND_HOST,
    bind_port: parse_integer(
      "TAVERN_CANVAS_BIND_PORT",
      env.TAVERN_CANVAS_BIND_PORT,
      DEFAULT_BIND_PORT,
    ),
    cors_origins: parse_json("TAVERN_CANVAS_CORS_ORIGINS", env.TAVERN_CANVAS_CORS_ORIGINS),
    bearer_token_hashes: parse_json(
      "TAVERN_CANVAS_BEARER_TOKEN_HASHES",
      env.TAVERN_CANVAS_BEARER_TOKEN_HASHES,
    ),
    data_directory,
    concurrency: parse_integer(
      "TAVERN_CANVAS_CONCURRENCY",
      env.TAVERN_CANVAS_CONCURRENCY,
      DEFAULT_CONCURRENCY,
    ),
    limits: {
      max_request_bytes: parse_integer(
        "TAVERN_CANVAS_MAX_REQUEST_BYTES",
        env.TAVERN_CANVAS_MAX_REQUEST_BYTES,
        DEFAULT_MAX_REQUEST_BYTES,
      ),
      max_image_bytes: parse_integer(
        "TAVERN_CANVAS_MAX_IMAGE_BYTES",
        env.TAVERN_CANVAS_MAX_IMAGE_BYTES,
        DEFAULT_MAX_IMAGE_BYTES,
      ),
      max_image_pixels: parse_integer(
        "TAVERN_CANVAS_MAX_IMAGE_PIXELS",
        env.TAVERN_CANVAS_MAX_IMAGE_PIXELS,
        DEFAULT_MAX_IMAGE_PIXELS,
      ),
      max_image_dimension: parse_integer(
        "TAVERN_CANVAS_MAX_IMAGE_DIMENSION",
        env.TAVERN_CANVAS_MAX_IMAGE_DIMENSION,
        DEFAULT_MAX_IMAGE_DIMENSION,
      ),
    },
    provider_profiles: parse_json(
      "TAVERN_CANVAS_PROVIDER_PROFILES",
      env.TAVERN_CANVAS_PROVIDER_PROFILES,
    ),
  };
  const result = GatewayConfigSchema.safeParse(input);

  if (!result.success) {
    const paths = [
      ...new Set(
        result.error.issues.map((issue) =>
          issue.path.length === 0 ? "configuration" : issue.path.join("."),
        ),
      ),
    ].sort();
    throw new GatewayConfigError(`Invalid Gateway configuration fields: ${paths.join(", ")}`);
  }
  const config: GatewayConfig = {
    ...result.data,
    bearer_token_hashes: redact_token_hashes(result.data.bearer_token_hashes),
  };
  Object.freeze(config.limits);
  Object.freeze(config.cors_origins);
  for (const provider of config.provider_profiles) {
    for (const value of Object.values(provider.profile)) {
      if (Array.isArray(value)) {
        Object.freeze(value);
      }
    }
    Object.freeze(provider.profile);
    Object.freeze(provider);
  }
  Object.freeze(config.provider_profiles);
  return Object.freeze(config);
}

function parse_json(variable_name: string, value: string | undefined): unknown {
  if (value === undefined) {
    throw new GatewayConfigError(`Missing Gateway configuration variable: ${variable_name}`);
  }
  try {
    return JSON.parse(value) as unknown;
  } catch {
    throw new GatewayConfigError(
      `Gateway configuration variable is not valid JSON: ${variable_name}`,
    );
  }
}

function parse_integer(
  variable_name: string,
  value: string | undefined,
  default_value: number,
): number {
  if (value === undefined) {
    return default_value;
  }
  if (!/^\d+$/u.test(value)) {
    throw new GatewayConfigError(
      `Gateway configuration variable is not an integer: ${variable_name}`,
    );
  }
  return Number(value);
}

function resolve_data_directory(value: string, cwd: string): string {
  const normalized = value.trim();
  if (
    normalized.length === 0 ||
    normalized.includes("\0") ||
    normalized.split(/[\\/]/u).includes("..")
  ) {
    throw new GatewayConfigError("Invalid Gateway configuration fields: data_directory");
  }
  return path.resolve(cwd, normalized);
}

function redact_token_hashes(values: readonly string[]): string[] {
  const redacted = [...values];
  const inspect_symbol = Symbol.for("nodejs.util.inspect.custom");
  Object.defineProperties(redacted, {
    toJSON: {
      configurable: false,
      enumerable: false,
      value: () => redacted.map(() => "[REDACTED]"),
      writable: false,
    },
    toString: {
      configurable: false,
      enumerable: false,
      value: () => "[REDACTED]",
      writable: false,
    },
    [inspect_symbol]: {
      configurable: false,
      enumerable: false,
      value: () => "[REDACTED]",
      writable: false,
    },
  });
  return Object.freeze(redacted) as string[];
}

export type { GatewayConfig };
