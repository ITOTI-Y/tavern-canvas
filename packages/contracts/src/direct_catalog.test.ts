import { describe, expect, it } from "vitest";

import {
  DIRECT_IMAGE_ROUTE_CATALOG,
  DirectRouteRejectedError,
  direct_image_catalog_entry,
  resolve_direct_url,
} from "./direct_catalog.js";
import { ProviderIdSchema } from "./provider.js";

const ARBITRARY_DESTINATIONS = [
  "https://evil.example/v1/images/generations",
  "http://127.0.0.1:7860/sdapi/v1/txt2img",
  "//evil.example/v1/images/generations",
  "/v1/images/generations/../../../etc/passwd",
  "/v1/images/generations#fragment",
  "/v1/images/generations?redirect=https://evil.example",
  "\\v1\\images\\generations",
  "/V1/images/generations",
  "/v1/images/generations/",
  "javascript:alert(1)",
] as const;

describe("direct route catalog", () => {
  it("exposes only HTTPS vendor origins with no path, query or credentials", () => {
    const entries = Object.values(DIRECT_IMAGE_ROUTE_CATALOG).filter((entry) => entry !== null);

    for (const entry of entries) {
      const url = new URL(entry.origin);
      expect(url.origin).toBe(entry.origin);
      expect(url.username).toBe("");
      expect(url.password).toBe("");
      // Only a loopback origin may drop TLS; every vendor origin is HTTPS.
      expect(url.protocol === "https:" || url.hostname === "127.0.0.1").toBe(true);
      expect(entry.routes.length).toBeGreaterThan(0);
      for (const route of entry.routes) {
        expect(route.startsWith("/")).toBe(true);
        expect(route.startsWith("//")).toBe(false);
      }
    }
  });

  it("covers every cloud image provider and leaves the loopback ones out", () => {
    expect(Object.keys(DIRECT_IMAGE_ROUTE_CATALOG).sort()).toEqual(
      ProviderIdSchema.options.slice().sort(),
    );
    expect(direct_image_catalog_entry("sd_webui")).toBeNull();
    expect(direct_image_catalog_entry("comfyui")).toBeNull();
    expect(direct_image_catalog_entry("novelai")?.origin).toBe("https://image.novelai.net");
    expect(direct_image_catalog_entry("openai_image")?.origin).toBe("https://api.openai.com");
    expect(direct_image_catalog_entry("google_image")?.origin).toBe(
      "https://generativelanguage.googleapis.com",
    );
  });

  it("names one vendor-documented auth header per cloud provider", () => {
    expect(direct_image_catalog_entry("novelai")?.auth).toEqual({
      kind: "bearer",
      header: "authorization",
    });
    expect(direct_image_catalog_entry("openai_image")?.auth).toEqual({
      kind: "bearer",
      header: "authorization",
    });
    expect(direct_image_catalog_entry("google_image")?.auth).toEqual({
      kind: "api_key",
      header: "x-goog-api-key",
    });
  });

  it("resolves a catalog route into an absolute vendor URL", () => {
    const entry = direct_image_catalog_entry("openai_image");
    expect(entry).not.toBeNull();
    expect(resolve_direct_url(entry as NonNullable<typeof entry>, "/v1/images/generations")).toBe(
      "https://api.openai.com/v1/images/generations",
    );
  });

  it.each(ARBITRARY_DESTINATIONS)("refuses the non-catalog destination %s", (destination) => {
    const entry = direct_image_catalog_entry("openai_image");
    expect(() => resolve_direct_url(entry as NonNullable<typeof entry>, destination)).toThrow(
      DirectRouteRejectedError,
    );
  });

  it("refuses a route that belongs to a different provider", () => {
    const openai = direct_image_catalog_entry("openai_image");
    expect(() =>
      resolve_direct_url(openai as NonNullable<typeof openai>, "/ai/generate-image"),
    ).toThrow(DirectRouteRejectedError);
  });

  it("never leaks the rejected destination into the error message", () => {
    const entry = direct_image_catalog_entry("novelai");
    try {
      resolve_direct_url(entry as NonNullable<typeof entry>, "/v1/secret-path-marker");
      expect.unreachable("a non-catalog route must throw");
    } catch (error) {
      expect(String(error)).not.toContain("secret-path-marker");
    }
  });
});
