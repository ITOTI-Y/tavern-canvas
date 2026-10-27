import {
  MAX_PROVIDER_REQUEST_BYTES,
  assert_provider_route,
  type ProviderRemoteAssetOperation,
  type ProviderTransportOperation,
} from "@tavern-canvas/providers";

import { normalize_http_origin } from "./http_acknowledgment.js";

export type ProviderTransportBoundaryErrorCode = "configuration" | "malformed_response";

export class ProviderTransportBoundaryError extends Error {
  readonly code: ProviderTransportBoundaryErrorCode;

  constructor(code: ProviderTransportBoundaryErrorCode, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "ProviderTransportBoundaryError";
    this.code = code;
  }
}

export function validate_provider_operation(operation: unknown): ProviderTransportOperation {
  try {
    if (!is_plain_record(operation)) {
      throw invalid_operation("Provider operation is invalid");
    }
    const {
      route,
      method,
      body,
      max_request_bytes,
      content_type,
      accept,
      max_response_bytes,
      signal,
    } = operation;
    const valid_request_limit =
      body === undefined
        ? max_request_bytes === undefined
        : typeof max_request_bytes === "number" &&
          Number.isSafeInteger(max_request_bytes) &&
          max_request_bytes > 0 &&
          max_request_bytes <= MAX_PROVIDER_REQUEST_BYTES;
    if (
      typeof route !== "string" ||
      (method !== "GET" && method !== "POST" && method !== "DELETE") ||
      (body !== undefined && !(body instanceof Uint8Array)) ||
      (body !== undefined &&
        body instanceof Uint8Array &&
        typeof max_request_bytes === "number" &&
        body.byteLength > max_request_bytes) ||
      !valid_request_limit ||
      !is_optional_header_value(content_type) ||
      !is_optional_header_value(accept) ||
      typeof max_response_bytes !== "number" ||
      !Number.isSafeInteger(max_response_bytes) ||
      max_response_bytes <= 0 ||
      !(signal instanceof AbortSignal) ||
      signal.aborted
    ) {
      throw invalid_operation("Provider operation is invalid");
    }
    assert_provider_route(route);
    if (body === undefined) {
      return {
        route,
        method,
        ...(content_type === undefined ? {} : { content_type }),
        ...(accept === undefined ? {} : { accept }),
        max_response_bytes,
        signal,
      };
    }
    if (!(body instanceof Uint8Array) || typeof max_request_bytes !== "number") {
      throw invalid_operation("Provider operation is invalid");
    }
    return {
      route,
      method,
      body,
      max_request_bytes,
      ...(content_type === undefined ? {} : { content_type }),
      ...(accept === undefined ? {} : { accept }),
      max_response_bytes,
      signal,
    };
  } catch (error) {
    if (error instanceof ProviderTransportBoundaryError) {
      throw error;
    }
    throw invalid_operation("Provider operation is invalid", error);
  }
}

export function validate_remote_operation(operation: unknown): ProviderRemoteAssetOperation {
  try {
    if (!is_plain_record(operation)) {
      throw invalid_operation("Remote provider asset operation is invalid");
    }
    const { url, allowed_origins, max_bytes, signal } = operation;
    if (
      typeof url !== "string" ||
      !Array.isArray(allowed_origins) ||
      allowed_origins.length === 0 ||
      !allowed_origins.every((origin) => typeof origin === "string") ||
      typeof max_bytes !== "number" ||
      !Number.isSafeInteger(max_bytes) ||
      max_bytes <= 0 ||
      !(signal instanceof AbortSignal) ||
      signal.aborted
    ) {
      throw invalid_operation("Remote provider asset operation is invalid");
    }
    const parsed_url = new URL(url);
    const normalized_origins = allowed_origins.map(normalize_http_origin);
    if (
      parsed_url.protocol !== "https:" ||
      parsed_url.username.length > 0 ||
      parsed_url.password.length > 0 ||
      parsed_url.hash.length > 0 ||
      !normalized_origins.includes(parsed_url.origin)
    ) {
      throw invalid_operation("Remote provider asset URL is not allowlisted");
    }
    return {
      url: parsed_url.href,
      allowed_origins: Object.freeze(normalized_origins),
      max_bytes,
      signal,
    };
  } catch (error) {
    if (error instanceof ProviderTransportBoundaryError) {
      throw error;
    }
    throw invalid_operation("Remote provider asset operation is invalid", error);
  }
}

function is_plain_record(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  try {
    const prototype = Object.getPrototypeOf(value) as unknown;
    return prototype === Object.prototype || prototype === null;
  } catch {
    return false;
  }
}

function is_optional_header_value(value: unknown): value is string | undefined {
  if (value === undefined) {
    return true;
  }
  if (typeof value !== "string" || value.length === 0 || value.length > 1_024) {
    return false;
  }
  for (const character of value) {
    const code_point = character.codePointAt(0);
    if (code_point !== undefined && (code_point <= 0x1f || code_point === 0x7f)) {
      return false;
    }
  }
  return true;
}

function invalid_operation(message: string, cause?: unknown): ProviderTransportBoundaryError {
  return new ProviderTransportBoundaryError(
    "configuration",
    message,
    cause === undefined ? undefined : { cause },
  );
}
