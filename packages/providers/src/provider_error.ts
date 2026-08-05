import {
  ProviderErrorSchema,
  type ProviderError,
  type ProviderErrorCode,
} from "@tavern-canvas/contracts";

export interface ProviderStatusErrorOptions {
  readonly recoverable?: boolean;
  readonly retry_after_ms?: number;
}

export class ProviderAdapterError extends Error {
  readonly provider_error: Readonly<ProviderError>;

  constructor(provider_error: ProviderError) {
    super(`Provider operation failed: ${provider_error.code}`);
    this.name = "ProviderAdapterError";
    this.provider_error = Object.freeze(ProviderErrorSchema.parse(provider_error));
  }
}

export class ProviderNetworkError extends Error {
  constructor(options?: ErrorOptions) {
    super("Provider network request failed", options);
    this.name = "ProviderNetworkError";
  }
}

export function provider_error_from_status(
  status_code: number,
  options: ProviderStatusErrorOptions = {},
): ProviderError {
  let code: ProviderErrorCode;
  let retryable = false;

  if (status_code === 401 || status_code === 403) {
    code = "auth_failed";
  } else if (status_code === 408) {
    code = "timed_out";
    retryable = true;
  } else if (status_code === 429) {
    code = "rate_limited";
    retryable = true;
  } else if (status_code >= 400 && status_code < 500) {
    code = "invalid_request";
  } else {
    code = "provider_unavailable";
    retryable = status_code >= 500 && status_code <= 599 && options.recoverable === true;
  }

  return ProviderErrorSchema.parse({
    code,
    retryable,
    status_code,
    ...(options.retry_after_ms === undefined ? {} : { retry_after_ms: options.retry_after_ms }),
  });
}

export function normalize_provider_failure(
  error: unknown,
  signal: AbortSignal,
): ProviderAdapterError {
  if (signal.aborted || is_abort_error(error)) {
    return new ProviderAdapterError({ code: "cancelled", retryable: false });
  }
  if (error instanceof ProviderAdapterError) {
    return error;
  }
  if (error instanceof ProviderNetworkError) {
    return new ProviderAdapterError({ code: "provider_unavailable", retryable: true });
  }
  return new ProviderAdapterError({ code: "malformed_response", retryable: false });
}

function is_abort_error(error: unknown): boolean {
  return (
    error instanceof DOMException && (error.name === "AbortError" || error.name === "TimeoutError")
  );
}
