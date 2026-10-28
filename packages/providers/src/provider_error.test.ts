import { describe, expect, it } from "vitest";

import {
  ProviderNetworkError,
  ProviderTransportBoundaryError,
  normalize_provider_failure,
} from "./provider_error.js";

describe("normalize_provider_failure", () => {
  const signal = new AbortController().signal;

  it("reports a transport that cannot make the call as configured as not_configured", () => {
    const failure = normalize_provider_failure(
      new ProviderTransportBoundaryError("configuration", "no stored credential"),
      signal,
    );
    expect(failure.provider_error).toEqual({ code: "not_configured", retryable: false });
  });

  it("keeps a network failure retryable as provider_unavailable", () => {
    expect(normalize_provider_failure(new ProviderNetworkError(), signal).provider_error).toEqual({
      code: "provider_unavailable",
      retryable: true,
    });
  });
});
