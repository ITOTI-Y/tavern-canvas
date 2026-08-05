import pino, { type DestinationStream, type Logger } from "pino";

import { redact_provider_log } from "@tavern-canvas/providers";

export interface GatewayLogRecord {
  readonly [key: string]: unknown;
}

export interface GatewayLogger {
  info(record: unknown, message?: string): void;
  warn(record: unknown, message?: string): void;
  error(record: unknown, message?: string): void;
  debug(record: unknown, message?: string): void;
  child(bindings: GatewayLogRecord): GatewayLogger;
  flush(): void;
}

export interface CreateGatewayLoggerOptions {
  readonly destination?: DestinationStream;
  readonly level?: string;
  readonly base?: Record<string, unknown> | null;
}

const SENSITIVE_LOG_FIELDS = new Set([
  "credential",
  "password",
  "token",
  "accesstoken",
  "refreshtoken",
  "privatekey",
]);

class PinoGatewayLogger implements GatewayLogger {
  readonly #logger: Logger;

  constructor(logger: Logger) {
    this.#logger = logger;
  }

  info(record: unknown, message?: string): void {
    this.#write("info", record, message);
  }

  warn(record: unknown, message?: string): void {
    this.#write("warn", record, message);
  }

  error(record: unknown, message?: string): void {
    this.#write("error", record, message);
  }
  debug(record: unknown, message?: string): void {
    this.#write("debug", record, message);
  }
  child(bindings: GatewayLogRecord): GatewayLogger {
    return new PinoGatewayLogger(this.#logger.child(as_log_bindings(redact_record(bindings))));
  }

  flush(): void {
    this.#logger.flush();
  }

  #write(level: "info" | "warn" | "error" | "debug", record: unknown, message?: string): void {
    const redacted = redact_record(record);
    if (message === undefined) {
      this.#logger[level](redacted);
    } else {
      this.#logger[level](redacted, message);
    }
  }
}

export function create_gateway_logger(options: CreateGatewayLoggerOptions = {}): GatewayLogger {
  const logger = pino(
    {
      level: options.level ?? "info",
      ...(options.base === undefined ? {} : { base: options.base }),
      serializers: {
        err: (value: unknown) => redact_record(value),
        obj: (value: unknown) => redact_record(value),
        req: (value: unknown) => redact_record(value),
        res: (value: unknown) => redact_record(value),
      },
    },
    options.destination,
  );
  return new PinoGatewayLogger(logger);
}

export function redact_record(value: unknown): unknown {
  return redact_sensitive_fields(redact_provider_log(value), new WeakMap<object, unknown>());
}

function redact_sensitive_fields(value: unknown, seen: WeakMap<object, unknown>): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }
  const existing = seen.get(value);
  if (existing !== undefined) {
    return "[Circular]";
  }
  if (Array.isArray(value)) {
    const result: unknown[] = [];
    seen.set(value, result);
    for (const item of value) {
      result.push(redact_sensitive_fields(item, seen));
    }
    return result;
  }
  const result: Record<string, unknown> = {};
  seen.set(value, result);
  for (const [key, child] of Object.entries(value)) {
    const normalized = key.toLowerCase().replaceAll(/[^a-z0-9]/gu, "");
    if (SENSITIVE_LOG_FIELDS.has(normalized)) {
      continue;
    }
    result[key] = redact_sensitive_fields(child, seen);
  }
  return result;
}
function as_log_bindings(value: unknown): GatewayLogRecord {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as GatewayLogRecord;
  }
  return {};
}
