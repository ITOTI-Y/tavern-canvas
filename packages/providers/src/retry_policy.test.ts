import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ProviderAdapterError,
  ProviderNetworkError,
  provider_error_from_status,
} from "./provider_error.js";
import {
  execute_non_idempotent_with_retry,
  execute_with_retry,
  parse_retry_after,
  SystemRetryClock,
  type RetryClock,
  type RetryRandomSource,
} from "./retry_policy.js";

class RecordingClock implements RetryClock {
  readonly delays: number[] = [];
  constructor(private readonly timestamp_ms = Date.parse("2026-08-05T09:30:00.000Z")) {}

  now(): number {
    return this.timestamp_ms;
  }

  sleep(delay_ms: number, signal: AbortSignal): Promise<void> {
    if (signal.aborted) {
      return Promise.reject(new DOMException("Aborted", "AbortError"));
    }
    this.delays.push(delay_ms);
    return Promise.resolve();
  }
}

class FixedRandomSource implements RetryRandomSource {
  constructor(private readonly values: readonly number[]) {}
  private index = 0;

  next(): number {
    const value = this.values[this.index] ?? this.values.at(-1) ?? 0.5;
    this.index += 1;
    return value;
  }
}

const request = {
  request_id: "11111111-1111-4111-8111-111111111111",
  prompt: "private prompt",
  nested: { seed: 42 },
};

afterEach(() => {
  vi.useRealTimers();
});

describe("execute_with_retry", () => {
  it("retries network failures at most twice after the initial attempt", async () => {
    const clock = new RecordingClock();
    let attempts = 0;

    const result = await execute_with_retry(
      request,
      () => {
        attempts += 1;
        if (attempts < 3) {
          throw new ProviderNetworkError();
        }
        return Promise.resolve("complete");
      },
      {
        signal: new AbortController().signal,
        clock,
        random: new FixedRandomSource([0.5, 0.5]),
      },
    );

    expect(result).toBe("complete");
    expect(attempts).toBe(3);
    expect(clock.delays).toEqual([250, 500]);
  });

  it("does not retry an ambiguous non-idempotent network failure", async () => {
    let attempts = 0;

    await expect(
      execute_non_idempotent_with_retry(
        request,
        () => {
          attempts += 1;
          throw new ProviderNetworkError();
        },
        {
          signal: new AbortController().signal,
          clock: new RecordingClock(),
          random: new FixedRandomSource([0.5]),
        },
      ),
    ).rejects.toMatchObject({
      provider_error: { code: "provider_unavailable", retryable: false },
    });
    expect(attempts).toBe(1);
  });

  it("retries a response-confirmed non-idempotent rate limit", async () => {
    let attempts = 0;

    await expect(
      execute_non_idempotent_with_retry(
        request,
        () => {
          attempts += 1;
          if (attempts === 1) {
            throw new ProviderAdapterError({
              code: "rate_limited",
              retryable: true,
              status_code: 429,
            });
          }
          return Promise.resolve("complete");
        },
        {
          signal: new AbortController().signal,
          clock: new RecordingClock(),
          random: new FixedRandomSource([0.5]),
        },
      ),
    ).resolves.toBe("complete");
    expect(attempts).toBe(2);
  });

  it("retries transport timeout errors as timed_out", async () => {
    let attempts = 0;
    await expect(
      execute_with_retry(
        request,
        () => {
          attempts += 1;
          if (attempts === 1) {
            throw new DOMException("Timed out", "TimeoutError");
          }
          return Promise.resolve("complete");
        },
        {
          signal: new AbortController().signal,
          clock: new RecordingClock(),
          random: new FixedRandomSource([0.5]),
        },
      ),
    ).resolves.toBe("complete");
    expect(attempts).toBe(2);
  });

  it.each([
    [408, false, "timed_out"],
    [429, false, "rate_limited"],
    [500, true, "provider_unavailable"],
    [503, true, "provider_unavailable"],
  ] as const)("retries recoverable HTTP %i responses", async (status, recoverable, code) => {
    const clock = new RecordingClock();
    let attempts = 0;

    await expect(
      execute_with_retry(
        request,
        () => {
          attempts += 1;
          if (attempts === 1) {
            throw new ProviderAdapterError(provider_error_from_status(status, { recoverable }));
          }
          return Promise.resolve("complete");
        },
        {
          signal: new AbortController().signal,
          clock,
          random: new FixedRandomSource([0.5]),
        },
      ),
    ).resolves.toBe("complete");

    expect(attempts).toBe(2);
    expect(code).toBe(provider_error_from_status(status, { recoverable }).code);
  });

  it.each([
    [400, "invalid_request"],
    [401, "auth_failed"],
    [402, "auth_failed"],
    [403, "auth_failed"],
    [422, "invalid_request"],
  ] as const)("does not retry HTTP %i", async (status, error_code) => {
    let attempts = 0;

    await expect(
      execute_with_retry(
        request,
        () => {
          attempts += 1;
          throw new ProviderAdapterError(provider_error_from_status(status));
        },
        {
          signal: new AbortController().signal,
          clock: new RecordingClock(),
          random: new FixedRandomSource([0.5]),
        },
      ),
    ).rejects.toMatchObject({ provider_error: { code: error_code, retryable: false } });

    expect(attempts).toBe(1);
  });

  it.each(["content_blocked", "malformed_response", "cancelled"] as const)(
    "does not retry %s failures",
    async (code) => {
      let attempts = 0;

      await expect(
        execute_with_retry(
          request,
          () => {
            attempts += 1;
            throw new ProviderAdapterError({ code, retryable: false });
          },
          {
            signal: new AbortController().signal,
            clock: new RecordingClock(),
            random: new FixedRandomSource([0.5]),
          },
        ),
      ).rejects.toMatchObject({ provider_error: { code } });

      expect(attempts).toBe(1);
    },
  );

  it("returns the third retryable failure without a fourth attempt", async () => {
    let attempts = 0;

    await expect(
      execute_with_retry(
        request,
        () => {
          attempts += 1;
          throw new ProviderNetworkError();
        },
        {
          signal: new AbortController().signal,
          clock: new RecordingClock(),
          random: new FixedRandomSource([0.5]),
        },
      ),
    ).rejects.toMatchObject({
      provider_error: { code: "provider_unavailable", retryable: true },
    });

    expect(attempts).toBe(3);
  });

  it("honors integer and HTTP-date Retry-After values", async () => {
    const now_ms = Date.parse("2026-08-05T09:30:00.000Z");
    expect(parse_retry_after("7", now_ms)).toBe(7_000);
    expect(parse_retry_after("Wed, 05 Aug 2026 09:30:09 GMT", now_ms)).toBe(9_000);
    expect(parse_retry_after("invalid", now_ms)).toBeUndefined();

    const clock = new RecordingClock(now_ms);
    let attempts = 0;
    await execute_with_retry(
      request,
      () => {
        attempts += 1;
        if (attempts === 1) {
          throw new ProviderAdapterError({
            code: "rate_limited",
            retryable: true,
            retry_after_ms: 7_000,
            status_code: 429,
          });
        }
        return Promise.resolve("complete");
      },
      {
        signal: new AbortController().signal,
        clock,
        random: new FixedRandomSource([0]),
      },
    );

    expect(clock.delays).toEqual([7_000]);
  });

  it("uses injected jitter and bounds exponential delays", async () => {
    const clock = new RecordingClock();
    let attempts = 0;

    await expect(
      execute_with_retry(
        request,
        () => {
          attempts += 1;
          throw new ProviderNetworkError();
        },
        {
          signal: new AbortController().signal,
          clock,
          random: new FixedRandomSource([1, 1]),
          base_delay_ms: 1_000,
          max_delay_ms: 1_200,
        },
      ),
    ).rejects.toBeInstanceOf(ProviderAdapterError);

    expect(clock.delays).toEqual([1_200, 1_200]);
    expect(attempts).toBe(3);
  });

  it("aborts an in-progress backoff immediately", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    let attempts = 0;
    const promise = execute_with_retry(
      request,
      () => {
        attempts += 1;
        throw new ProviderNetworkError();
      },
      {
        signal: controller.signal,
        clock: new SystemRetryClock(),
        random: new FixedRandomSource([0.5]),
      },
    );

    await vi.advanceTimersByTimeAsync(0);
    controller.abort();

    await expect(promise).rejects.toMatchObject({
      provider_error: { code: "cancelled", retryable: false },
    });
    expect(attempts).toBe(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("clones each attempt without mutating the source request", async () => {
    const seen_requests: object[] = [];
    let attempts = 0;

    await execute_with_retry(
      request,
      (attempt_request) => {
        attempts += 1;
        seen_requests.push(attempt_request);
        attempt_request.prompt = "mutated";
        attempt_request.nested.seed = 99;
        if (attempts === 1) {
          throw new ProviderNetworkError();
        }
        return Promise.resolve("complete");
      },
      {
        signal: new AbortController().signal,
        clock: new RecordingClock(),
        random: new FixedRandomSource([0.5]),
      },
    );

    expect(request).toEqual({
      request_id: "11111111-1111-4111-8111-111111111111",
      prompt: "private prompt",
      nested: { seed: 42 },
    });
    expect(seen_requests[0]).not.toBe(seen_requests[1]);
    expect(seen_requests[1]).toMatchObject({ prompt: "mutated", nested: { seed: 99 } });
  });
});
