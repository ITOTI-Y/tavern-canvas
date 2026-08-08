import { direct_image_catalog_entry } from "@tavern-canvas/contracts";
import { MAX_PROVIDER_REQUEST_BYTES } from "@tavern-canvas/providers";
import { describe, expect, it, vi } from "vitest";

import {
  SecretResolutionError,
  type SecretResolverPort,
} from "../host/sillytavern_secret_resolver.js";
import type { ProviderFetch } from "./browser_fetch.js";
import { DirectCloudTransport, DirectLlmTransport } from "./direct_cloud_transport.js";
import { ProviderTransportBoundaryError } from "./host_proxy_transport.js";

const REFERENCE = "tavern_canvas:primary:11111111-1111-4111-8111-111111111111:novelai_token";
const PLAINTEXT = "sk-plaintext-canary-value";

function secrets(value: string | Error = PLAINTEXT): SecretResolverPort {
  return {
    resolve_secret: vi.fn(() =>
      value instanceof Error ? Promise.reject(value) : Promise.resolve(value),
    ),
  };
}

function ok_response(body = "{}", headers: Record<string, string> = {}): Response {
  return new Response(body, { status: 200, headers });
}

function recording_fetch(
  respond: () => Response | Promise<Response> = () => ok_response(),
): ProviderFetch & { readonly calls: { url: string; init: RequestInit }[] } {
  const calls: { url: string; init: RequestInit }[] = [];
  const fetch_ = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: url_of(input), init: init ?? {} });
    return respond();
  });
  return Object.assign(fetch_ as unknown as ProviderFetch, { calls });
}

function url_of(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }
  return input instanceof URL ? input.href : input.url;
}

function headers_of(init: RequestInit): Record<string, string> {
  return Object.fromEntries(new Headers(init.headers).entries());
}

function image_transport(
  provider_id: Parameters<typeof direct_image_catalog_entry>[0],
  overrides: {
    readonly fetch?: ProviderFetch;
    readonly secrets?: SecretResolverPort;
    readonly credential_reference?: string | null;
  } = {},
): DirectCloudTransport {
  return new DirectCloudTransport({
    catalog_entry: direct_image_catalog_entry(provider_id) as NonNullable<
      ReturnType<typeof direct_image_catalog_entry>
    >,
    credential_reference:
      overrides.credential_reference === undefined ? REFERENCE : overrides.credential_reference,
    secrets: overrides.secrets ?? secrets(),
    fetch: overrides.fetch ?? recording_fetch(),
  });
}

function operation(overrides: Partial<Parameters<DirectCloudTransport["execute"]>[0]> = {}) {
  return {
    route: "/v1/images/generations",
    method: "POST",
    body: new TextEncoder().encode("{}"),
    max_request_bytes: 1_000,
    content_type: "application/json",
    accept: "application/json",
    max_response_bytes: 10_000,
    signal: new AbortController().signal,
    ...overrides,
  } as Parameters<DirectCloudTransport["execute"]>[0];
}

function fully_serialize(error: unknown): string {
  if (!(error instanceof Error)) {
    return JSON.stringify(error);
  }
  return [
    String(error),
    error.stack ?? "",
    JSON.stringify(error, Object.getOwnPropertyNames(error)),
  ].join("\n");
}

describe("DirectCloudTransport: catalog-only routing", () => {
  it("sends the request to the catalog origin joined with the catalog route", async () => {
    const fetch_ = recording_fetch();
    await image_transport("openai_image", { fetch: fetch_ }).execute(operation());

    expect(fetch_.calls[0]?.url).toBe("https://api.openai.com/v1/images/generations");
  });

  it.each([
    "https://evil.example/v1/images/generations",
    "http://127.0.0.1:7860/v1/images/generations",
    "//evil.example/v1/images/generations",
    "/v1/images/../../evil",
    "/v1/images/generations?to=https://evil.example",
    "/ai/generate-image",
  ] as `/${string}`[])(
    "refuses the non-catalog destination %s without opening a connection",
    async (route) => {
      const fetch_ = recording_fetch();

      await expect(
        image_transport("openai_image", { fetch: fetch_ }).execute(operation({ route })),
      ).rejects.toBeInstanceOf(ProviderTransportBoundaryError);
      expect(fetch_.calls).toHaveLength(0);
    },
  );

  it("never echoes the rejected destination back to the caller", async () => {
    const error = await image_transport("openai_image")
      .execute(operation({ route: "/v1/secret-path-marker" }))
      .catch((reason: unknown) => reason);

    expect(fully_serialize(error)).not.toContain("secret-path-marker");
  });

  it("refuses to be constructed for a provider that has no direct catalog entry", () => {
    expect(direct_image_catalog_entry("sd_webui")).toBeNull();
    expect(direct_image_catalog_entry("comfyui")).toBeNull();
  });
});

describe("DirectCloudTransport: credentials", () => {
  it("injects the vendor's documented auth header per provider", async () => {
    const openai = recording_fetch();
    await image_transport("openai_image", { fetch: openai }).execute(operation());
    expect(headers_of(openai.calls[0]?.init ?? {}).authorization).toBe(`Bearer ${PLAINTEXT}`);

    const novelai = recording_fetch();
    await image_transport("novelai", { fetch: novelai }).execute(
      operation({ route: "/ai/generate-image" }),
    );
    expect(headers_of(novelai.calls[0]?.init ?? {}).authorization).toBe(`Bearer ${PLAINTEXT}`);

    const google = recording_fetch();
    await image_transport("google_image", { fetch: google }).execute(
      operation({ route: "/v1beta/interactions" }),
    );
    const google_headers = headers_of(google.calls[0]?.init ?? {});
    expect(google_headers["x-goog-api-key"]).toBe(PLAINTEXT);
    expect(google_headers.authorization).toBeUndefined();
  });

  it("resolves the reference on every call rather than caching the plaintext", async () => {
    const vault = secrets();
    const transport = image_transport("openai_image", { secrets: vault });

    await transport.execute(operation());
    await transport.execute(operation());

    expect(vault.resolve_secret).toHaveBeenCalledTimes(2);
    expect(vault.resolve_secret).toHaveBeenCalledWith(REFERENCE);
  });

  it("fails closed when the profile names no vault reference", async () => {
    const fetch_ = recording_fetch();

    await expect(
      image_transport("openai_image", { fetch: fetch_, credential_reference: null }).execute(
        operation(),
      ),
    ).rejects.toMatchObject({ code: "configuration" });
    expect(fetch_.calls).toHaveLength(0);
  });

  it("fails closed, without calling the vendor, when the vault will not reveal the credential", async () => {
    const fetch_ = recording_fetch();
    const blocked = secrets(new SecretResolutionError("not_exposed", "allowKeysExposure is off"));

    await expect(
      image_transport("openai_image", { fetch: fetch_, secrets: blocked }).execute(operation()),
    ).rejects.toMatchObject({ code: "configuration" });
    expect(fetch_.calls).toHaveLength(0);
  });

  it("keeps the plaintext out of every error it raises", async () => {
    const leaky = secrets(new Error(`vault blew up holding ${PLAINTEXT}`));

    const error = await image_transport("openai_image", { secrets: leaky })
      .execute(operation())
      .catch((reason: unknown) => reason);

    expect(fully_serialize(error)).not.toContain(PLAINTEXT);
  });

  it("keeps the plaintext out of a network failure raised after the header was built", async () => {
    const fetch_ = recording_fetch(() => {
      throw new Error(`connection reset while sending ${PLAINTEXT}`);
    });

    const error = await image_transport("openai_image", { fetch: fetch_ })
      .execute(operation())
      .catch((reason: unknown) => reason);

    expect(fully_serialize(error)).not.toContain(PLAINTEXT);
  });

  it("keeps the plaintext out of the redacted request record it exposes for diagnostics", async () => {
    const records: unknown[] = [];
    const transport = new DirectCloudTransport({
      catalog_entry: direct_image_catalog_entry("google_image") as NonNullable<
        ReturnType<typeof direct_image_catalog_entry>
      >,
      credential_reference: REFERENCE,
      secrets: secrets(),
      fetch: recording_fetch(),
      log: { write: (record) => records.push(record) },
    });

    await transport.execute(operation({ route: "/v1beta/interactions" }));

    expect(records).toHaveLength(1);
    expect(JSON.stringify(records)).not.toContain(PLAINTEXT);
    expect(records[0]).toMatchObject({ route: "/v1beta/interactions", status_code: 200 });
  });
});

describe("DirectCloudTransport: request posture", () => {
  it("sends only the code-owned header set", async () => {
    const fetch_ = recording_fetch();
    await image_transport("openai_image", { fetch: fetch_ }).execute(operation());

    expect(Object.keys(headers_of(fetch_.calls[0]?.init ?? {})).sort()).toEqual([
      "accept",
      "authorization",
      "content-type",
    ]);
  });

  it("carries the vendor's required constants when the catalog names them", async () => {
    const fetch_ = recording_fetch();
    await new DirectLlmTransport({ secrets: secrets(), fetch: fetch_ }).execute({
      provider_kind: "anthropic",
      route: "/v1/messages",
      method: "POST",
      credential_reference: REFERENCE,
      body: new TextEncoder().encode("{}"),
      max_response_bytes: 10_000,
      signal: new AbortController().signal,
    });

    const headers = headers_of(fetch_.calls[0]?.init ?? {});
    expect(headers["anthropic-version"]).toBe("2023-06-01");
    expect(headers["anthropic-dangerous-direct-browser-access"]).toBe("true");
    expect(headers["x-api-key"]).toBe(PLAINTEXT);
  });

  it("omits ambient cookies, refuses redirects and bypasses the cache", async () => {
    const fetch_ = recording_fetch();
    await image_transport("openai_image", { fetch: fetch_ }).execute(operation());

    expect(fetch_.calls[0]?.init).toMatchObject({
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
    });
  });

  it("rejects a request body over its declared limit before reaching the network", async () => {
    const fetch_ = recording_fetch();

    await expect(
      image_transport("openai_image", { fetch: fetch_ }).execute(
        operation({ body: new Uint8Array(2_000), max_request_bytes: 1_000 }),
      ),
    ).rejects.toBeInstanceOf(ProviderTransportBoundaryError);
    expect(fetch_.calls).toHaveLength(0);
  });

  it("rejects a declared limit above the deliberate provider ceiling", async () => {
    const fetch_ = recording_fetch();

    await expect(
      image_transport("openai_image", { fetch: fetch_ }).execute(
        operation({ max_request_bytes: MAX_PROVIDER_REQUEST_BYTES + 1 }),
      ),
    ).rejects.toBeInstanceOf(ProviderTransportBoundaryError);
    expect(fetch_.calls).toHaveLength(0);
  });

  it("stops reading a response that exceeds its byte limit", async () => {
    const fetch_ = recording_fetch(() => ok_response("x".repeat(64)));

    await expect(
      image_transport("openai_image", { fetch: fetch_ }).execute(
        operation({ max_response_bytes: 8 }),
      ),
    ).rejects.toMatchObject({ code: "malformed_response" });
  });

  it("refuses an already-aborted signal and surfaces an abort raised mid-flight", async () => {
    const aborted = new AbortController();
    aborted.abort();
    await expect(
      image_transport("openai_image").execute(operation({ signal: aborted.signal })),
    ).rejects.toBeInstanceOf(ProviderTransportBoundaryError);

    const live = new AbortController();
    const fetch_ = recording_fetch(() => {
      live.abort();
      throw new DOMException("aborted", "AbortError");
    });
    await expect(
      image_transport("openai_image", { fetch: fetch_ }).execute(
        operation({ signal: live.signal }),
      ),
    ).rejects.toMatchObject({ name: "AbortError" });
  });

  it("returns the vendor status and headers unchanged for the adapter to classify", async () => {
    const fetch_ = recording_fetch(
      () => new Response("nope", { status: 429, headers: { "retry-after": "12" } }),
    );

    await expect(
      image_transport("openai_image", { fetch: fetch_ }).execute(operation()),
    ).resolves.toMatchObject({ status: 429, headers: { "retry-after": "12" } });
  });
});

describe("DirectCloudTransport: remote assets", () => {
  it("fetches an allowlisted provider asset URL without attaching the credential", async () => {
    const fetch_ = recording_fetch(() => ok_response("bytes"));

    await image_transport("openai_image", { fetch: fetch_ }).fetch_remote_asset({
      url: "https://oaidalleapiprodscus.blob.core.windows.net/private/img.png",
      allowed_origins: ["https://oaidalleapiprodscus.blob.core.windows.net"],
      max_bytes: 10_000,
      signal: new AbortController().signal,
    });

    expect(headers_of(fetch_.calls[0]?.init ?? {}).authorization).toBeUndefined();
  });

  it("refuses an asset URL outside the profile's origin allowlist", async () => {
    const fetch_ = recording_fetch();

    await expect(
      image_transport("openai_image", { fetch: fetch_ }).fetch_remote_asset({
        url: "https://evil.example/img.png",
        allowed_origins: ["https://oaidalleapiprodscus.blob.core.windows.net"],
        max_bytes: 10_000,
        signal: new AbortController().signal,
      }),
    ).rejects.toBeInstanceOf(ProviderTransportBoundaryError);
    expect(fetch_.calls).toHaveLength(0);
  });
});

describe("DirectLlmTransport", () => {
  it("routes a catalog completion call to the catalog origin with a Bearer credential", async () => {
    const fetch_ = recording_fetch();

    await new DirectLlmTransport({ secrets: secrets(), fetch: fetch_ }).execute({
      provider_kind: "openai_compatible",
      route: "/v1/chat/completions",
      method: "POST",
      credential_reference: REFERENCE,
      body: new TextEncoder().encode("{}"),
      max_response_bytes: 10_000,
      signal: new AbortController().signal,
    });

    expect(fetch_.calls[0]?.url).toBe("https://api.openai.com/v1/chat/completions");
    expect(headers_of(fetch_.calls[0]?.init ?? {})).toMatchObject({
      authorization: `Bearer ${PLAINTEXT}`,
      "content-type": "application/json",
    });
  });

  it("sends no auth header for a dialect the catalog marks credential-free", async () => {
    const fetch_ = recording_fetch();

    await new DirectLlmTransport({ secrets: secrets(), fetch: fetch_ }).execute({
      provider_kind: "ollama",
      route: "/api/tags",
      method: "GET",
      credential_reference: null,
      max_response_bytes: 10_000,
      signal: new AbortController().signal,
    });

    expect(headers_of(fetch_.calls[0]?.init ?? {}).authorization).toBeUndefined();
    expect(fetch_.calls[0]?.url).toBe("http://127.0.0.1:11434/api/tags");
  });

  it("refuses a route outside the dialect's catalog", async () => {
    const fetch_ = recording_fetch();

    await expect(
      new DirectLlmTransport({ secrets: secrets(), fetch: fetch_ }).execute({
        provider_kind: "openai_compatible",
        route: "/v1/messages",
        method: "POST",
        credential_reference: REFERENCE,
        max_response_bytes: 10_000,
        signal: new AbortController().signal,
      }),
    ).rejects.toBeInstanceOf(ProviderTransportBoundaryError);
    expect(fetch_.calls).toHaveLength(0);
  });
});
