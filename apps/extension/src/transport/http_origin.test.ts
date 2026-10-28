import { describe, expect, it } from "vitest";

import { classify_http_origin, normalize_http_origin } from "./http_origin.js";

describe("HTTP origins", () => {
  it("normalizes scheme, host, and effective port identity", () => {
    expect(normalize_http_origin("HTTP://EXAMPLE.COM:80")).toBe("http://example.com");
    expect(normalize_http_origin("https://EXAMPLE.com:443")).toBe("https://example.com");
    expect(normalize_http_origin("http://192.168.1.10:8080")).toBe("http://192.168.1.10:8080");
  });

  it("classifies literals without inferring DNS resolution", () => {
    expect(classify_http_origin("http://127.0.0.1:7860")).toBe("loopback");
    expect(classify_http_origin("http://[::1]:7860")).toBe("loopback");
    expect(classify_http_origin("http://10.0.0.5:7860")).toBe("private");
    expect(classify_http_origin("http://192.168.1.10:7860")).toBe("private");
    expect(classify_http_origin("http://8.8.8.8:7860")).toBe("public_or_unknown");
    expect(classify_http_origin("http://sd.internal:7860")).toBe("public_or_unknown");
  });

  it.each([
    "ftp://sd.example",
    "http://user:password@sd.example",
    "http://sd.example/path",
    "http://sd.example?query=1",
    "not a URL",
  ])("rejects unsafe or non-origin endpoint %s", (value) => {
    expect(() => normalize_http_origin(value)).toThrow();
  });
});
