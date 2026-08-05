import type { ErrorRequestHandler, Request, Response } from "express";
import { ZodError } from "zod";

import { get_request_correlation_id } from "./request_context.js";

export type GatewayErrorCode =
  | "authentication_required"
  | "authentication_failed"
  | "cors_origin_denied"
  | "invalid_request"
  | "request_too_large"
  | "invalid_json"
  | "invalid_asset"
  | "asset_not_found"
  | "asset_content_unavailable"
  | "job_not_found"
  | "provider_not_configured"
  | "provider_unavailable"
  | "rate_limited"
  | "not_found"
  | "internal_error";

export class GatewayHttpError extends Error {
  readonly status_code: number;
  readonly code: GatewayErrorCode;
  readonly retryable: boolean;
  readonly retry_after_ms: number | undefined;

  constructor(
    status_code: number,
    code: GatewayErrorCode,
    options: { readonly retryable?: boolean; readonly retry_after_ms?: number } = {},
  ) {
    super(code);
    this.name = "GatewayHttpError";
    this.status_code = status_code;
    this.code = code;
    this.retryable = options.retryable ?? false;
    this.retry_after_ms = options.retry_after_ms;
  }
}

export interface GatewayErrorBody {
  readonly protocol_version: "1.0";
  readonly error: {
    readonly code: GatewayErrorCode;
    readonly retryable: boolean;
    readonly retry_after_ms?: number;
    readonly correlation_id: string;
  };
}

export function create_gateway_error_handler(): ErrorRequestHandler {
  return (error: unknown, request: Request, response: Response, next): void => {
    if (response.headersSent) {
      next(error);
      return;
    }
    const normalized = normalize_gateway_error(error);
    const correlation_id = get_request_correlation_id(request) ?? "unknown";
    const body: GatewayErrorBody = {
      protocol_version: "1.0",
      error: {
        code: normalized.code,
        retryable: normalized.retryable,
        correlation_id,
        ...(normalized.retry_after_ms === undefined
          ? {}
          : { retry_after_ms: normalized.retry_after_ms }),
      },
    };
    response.status(normalized.status_code).json(body);
  };
}

function normalize_gateway_error(error: unknown): GatewayHttpError {
  if (error instanceof GatewayHttpError) {
    return error;
  }
  if (error instanceof ZodError) {
    return new GatewayHttpError(400, "invalid_request");
  }
  if (is_body_too_large_error(error)) {
    return new GatewayHttpError(413, "request_too_large");
  }
  if (is_invalid_json_error(error)) {
    return new GatewayHttpError(400, "invalid_json");
  }
  return new GatewayHttpError(500, "internal_error");
}

function is_body_too_large_error(error: unknown): boolean {
  if (error === null || typeof error !== "object") {
    return false;
  }
  const candidate = error as { readonly type?: unknown; readonly status?: unknown };
  return candidate.type === "entity.too.large" || candidate.status === 413;
}

function is_invalid_json_error(error: unknown): boolean {
  if (!(error instanceof SyntaxError)) {
    return false;
  }
  const candidate = error as SyntaxError & { readonly type?: unknown };
  return candidate.type === "entity.parse.failed";
}
