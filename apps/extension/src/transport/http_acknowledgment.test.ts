import { describe, expect, it } from "vitest";

import {
  acknowledge_http_origin,
  classify_http_origin,
  is_http_origin_acknowledged,
  normalize_http_origin,
  requires_http_acknowledgment,
} from "./http_acknowledgment.js";

describe("HTTP origin acknowledgment", () => {
  it("normalizes scheme, host, and effective port identity", () => {
    expect(normalize_http_origin("HTTP://EXAMPLE.COM:80")).toBe("http://example.com");
    expect(normalize_http_origin("https://EXAMPLE.com:443")).toBe("https://example.com");
    expect(normalize_http_origin("http://192.168.1.10:8080")).toBe("http://192.168.1.10:8080");
  });

  it("binds acknowledgment to the exact normalized origin", () => {
    const occurred_at = "2026-08-05T09:30:00.000Z";
    const acknowledgments = acknowledge_http_origin({}, "http://192.168.1.10:8080", occurred_at);

    expect(is_http_origin_acknowledged(acknowledgments, "http://192.168.1.10:8080")).toBe(true);
    expect(is_http_origin_acknowledged(acknowledgments, "http://192.168.1.11:8080")).toBe(false);
    expect(is_http_origin_acknowledged(acknowledgments, "http://192.168.1.10:8081")).toBe(false);
    expect(is_http_origin_acknowledged(acknowledgments, "https://192.168.1.10:8080")).toBe(false);
  });

  it("classifies literals without inferring DNS resolution", () => {
    expect(classify_http_origin("http://127.0.0.1:7860")).toBe("loopback");
    expect(classify_http_origin("http://[::1]:7860")).toBe("loopback");
    expect(classify_http_origin("http://10.0.0.5:7860")).toBe("private");
    expect(classify_http_origin("http://192.168.1.10:7860")).toBe("private");
    expect(classify_http_origin("http://8.8.8.8:7860")).toBe("public_or_unknown");
    expect(classify_http_origin("http://gateway.internal:7860")).toBe("public_or_unknown");
  });

  it("requires acknowledgment for every cleartext Gateway origin", () => {
    expect(requires_http_acknowledgment("http://192.168.1.10:8080")).toBe(true);
    expect(requires_http_acknowledgment("http://127.0.0.1:8080")).toBe(true);
    expect(requires_http_acknowledgment("https://gateway.example")).toBe(false);
  });

  it.each([
    "ftp://gateway.example",
    "http://user:password@gateway.example",
    "http://gateway.example/path",
    "http://gateway.example?query=1",
    "not a URL",
  ])("rejects unsafe or non-origin endpoint %s", (value) => {
    expect(() => normalize_http_origin(value)).toThrow();
  });
});
