import {
  normalize_provider_failure,
  ProviderAdapterError,
  ProviderNetworkError,
} from "./provider_error.js";

const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_BASE_DELAY_MS = 250;
const DEFAULT_MAX_DELAY_MS = 10_000;
const DEFAULT_MAX_RETRY_AFTER_MS = 120_000;

export interface RetryClock {
  now(): number;
  sleep(delay_ms: number, signal: AbortSignal): Promise<void>;
}

export interface RetryRandomSource {
  next(): number;
}

export interface RetryOptions {
  readonly signal: AbortSignal;
  readonly clock: RetryClock;
  readonly random: RetryRandomSource;
  readonly max_retries?: number;
  readonly base_delay_ms?: number;
  readonly max_delay_ms?: number;
  readonly max_retry_after_ms?: number;
}

export class SystemRetryClock implements RetryClock {
  now(): number {
    return Date.now();
  }

  sleep(delay_ms: number, signal: AbortSignal): Promise<void> {
    const { promise, resolve, reject } = Promise.withResolvers<undefined>();
    if (signal.aborted) {
      reject(new DOMException("The retry was aborted", "AbortError"));
      return promise;
    }

    const abort = () => {
      clearTimeout(timeout_id);
      signal.removeEventListener("abort", abort);
      reject(new DOMException("The retry was aborted", "AbortError"));
    };
    const timeout_id = setTimeout(() => {
      signal.removeEventListener("abort", abort);
      resolve(undefined);
    }, delay_ms);
    signal.addEventListener("abort", abort, { once: true });
    return promise;
  }
}

export function parse_retry_after(value: string | null, now_ms: number): number | undefined {
  if (value === null) {
    return undefined;
  }

  const normalized = value.trim();
  if (/^\d+$/u.test(normalized)) {
    const seconds = Number(normalized);
    if (Number.isSafeInteger(seconds) && seconds <= Number.MAX_SAFE_INTEGER / 1_000) {
      return seconds * 1_000;
    }
    return undefined;
  }

  const retry_at_ms = Date.parse(normalized);
  if (!Number.isFinite(retry_at_ms)) {
    return undefined;
  }
  return Math.max(0, retry_at_ms - now_ms);
}

export function execute_non_idempotent_with_retry<TRequest, TResult>(
  source_request: TRequest,
  operation: (request: TRequest, attempt: number) => Promise<TResult>,
  options: RetryOptions,
): Promise<TResult> {
  return execute_with_retry(
    source_request,
    async (request, attempt) => {
      try {
        return await operation(request, attempt);
      } catch (error) {
        if (error instanceof ProviderNetworkError) {
          throw new ProviderAdapterError({
            code: "provider_unavailable",
            retryable: false,
          });
        }
        if (error instanceof DOMException && error.name === "TimeoutError") {
          throw new ProviderAdapterError({ code: "timed_out", retryable: false });
        }
        throw error;
      }
    },
    options,
  );
}

export async function execute_with_retry<TRequest, TResult>(
  source_request: TRequest,
  operation: (request: TRequest, attempt: number) => Promise<TResult>,
  options: RetryOptions,
): Promise<TResult> {
  const max_retries = nonnegative_integer(options.max_retries, DEFAULT_MAX_RETRIES);
  const base_delay_ms = positive_number(options.base_delay_ms, DEFAULT_BASE_DELAY_MS);
  const max_delay_ms = positive_number(options.max_delay_ms, DEFAULT_MAX_DELAY_MS);
  const max_retry_after_ms = positive_number(
    options.max_retry_after_ms,
    DEFAULT_MAX_RETRY_AFTER_MS,
  );

  for (let attempt = 0; ; attempt += 1) {
    if (options.signal.aborted) {
      throw new ProviderAdapterError({ code: "cancelled", retryable: false });
    }

    try {
      return await operation(structuredClone(source_request), attempt);
    } catch (error) {
      const failure = normalize_provider_failure(error, options.signal);
      if (!failure.provider_error.retryable || attempt >= max_retries) {
        throw failure;
      }

      const retry_after_ms = failure.provider_error.retry_after_ms;
      const delay_ms =
        retry_after_ms === undefined
          ? exponential_delay(attempt, base_delay_ms, max_delay_ms, options.random)
          : Math.min(retry_after_ms, max_retry_after_ms);
      try {
        await options.clock.sleep(delay_ms, options.signal);
      } catch {
        throw new ProviderAdapterError({ code: "cancelled", retryable: false });
      }
    }
  }
}

function exponential_delay(
  retry_index: number,
  base_delay_ms: number,
  max_delay_ms: number,
  random: RetryRandomSource,
): number {
  const random_value = random.next();
  const bounded_random = Number.isFinite(random_value)
    ? Math.max(0, Math.min(1, random_value))
    : 0.5;
  const jitter = 0.5 + bounded_random;
  return Math.min(max_delay_ms, Math.round(base_delay_ms * 2 ** retry_index * jitter));
}

function nonnegative_integer(value: number | undefined, fallback: number): number {
  return value === undefined || !Number.isInteger(value) || value < 0 ? fallback : value;
}

function positive_number(value: number | undefined, fallback: number): number {
  return value === undefined || !Number.isFinite(value) || value <= 0 ? fallback : value;
}
