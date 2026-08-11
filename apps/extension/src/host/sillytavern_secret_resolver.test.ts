import { describe, expect, it, vi } from "vitest";

import {
  SecretResolutionError,
  SillyTavernSecretResolver,
  create_sillytavern_secret_resolver,
} from "./sillytavern_secret_resolver.js";
import type { SillyTavernFetch, SillyTavernUploadResponse } from "./sillytavern_host.js";

const REFERENCE = "tavern_canvas:primary:11111111-1111-4111-8111-111111111111:novelai_token";
const PLAINTEXT = "sk-plaintext-canary-value";

function context() {
  return { getRequestHeaders: () => ({ "X-CSRF-TOKEN": "csrf-token" }) };
}

function fetch_returning(response: () => SillyTavernUploadResponse): SillyTavernFetch {
  return vi.fn(async (route: string) => {
    if (route !== "/api/secrets/view") {
      throw new Error(`Unexpected route ${route}`);
    }
    return response();
  });
}

/** Serializes an error the way a diagnostics bundle or a console would. */
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

describe("SillyTavernSecretResolver", () => {
  it("resolves a reference through POST /api/secrets/view with the host CSRF headers", async () => {
    const fetch_ = fetch_returning(() => ({
      ok: true,
      status: 200,
      json: async () => ({ [REFERENCE]: PLAINTEXT }),
    }));
    const resolver = new SillyTavernSecretResolver(context(), fetch_);

    await expect(resolver.resolve_secret(REFERENCE)).resolves.toBe(PLAINTEXT);
    expect(fetch_).toHaveBeenCalledWith("/api/secrets/view", {
      method: "POST",
      headers: { "X-CSRF-TOKEN": "csrf-token" },
      body: JSON.stringify({}),
    });
  });

  it("rejects anything that is not a tavern_canvas reference before making a call", async () => {
    const fetch_ = fetch_returning(() => {
      throw new Error("must not be called");
    });
    const resolver = new SillyTavernSecretResolver(context(), fetch_);

    for (const invalid of ["", "api_key", "sk-live-1234", "tavern_canvas:", PLAINTEXT]) {
      await expect(resolver.resolve_secret(invalid)).rejects.toMatchObject({
        code: "invalid_reference",
      });
    }
    expect(fetch_).not.toHaveBeenCalled();
  });

  it("maps a 403 to a user-actionable not_exposed failure naming the host setting", async () => {
    const resolver = new SillyTavernSecretResolver(
      context(),
      fetch_returning(() => ({ ok: false, status: 403, json: async () => ({}) })),
    );

    const error = await resolver.resolve_secret(REFERENCE).catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(SecretResolutionError);
    expect((error as SecretResolutionError).code).toBe("not_exposed");
    expect(String(error)).toContain("allowKeysExposure");
  });

  it("maps a 404 to not_found and any other failure to unavailable", async () => {
    await expect(
      new SillyTavernSecretResolver(
        context(),
        fetch_returning(() => ({ ok: false, status: 404, json: async () => ({}) })),
      ).resolve_secret(REFERENCE),
    ).rejects.toMatchObject({ code: "not_found" });

    await expect(
      new SillyTavernSecretResolver(
        context(),
        fetch_returning(() => ({ ok: false, status: 500, json: async () => ({}) })),
      ).resolve_secret(REFERENCE),
    ).rejects.toMatchObject({ code: "unavailable" });
  });

  it("treats a blank or non-string value as not_found rather than sending an empty credential", async () => {
    for (const payload of [
      { [REFERENCE]: "" },
      { [REFERENCE]: "   " },
      { [REFERENCE]: 42 },
      null,
    ]) {
      await expect(
        new SillyTavernSecretResolver(
          context(),
          fetch_returning(() => ({ ok: true, status: 200, json: async () => payload })),
        ).resolve_secret(REFERENCE),
      ).rejects.toMatchObject({ code: "not_found" });
    }
  });

  it("keeps the plaintext out of every failure it raises, including one the host echoed back", async () => {
    const resolver = new SillyTavernSecretResolver(
      context(),
      fetch_returning(() => ({
        ok: false,
        status: 500,
        json: async () => ({ value: PLAINTEXT, error: PLAINTEXT }),
      })),
    );

    const error = await resolver.resolve_secret(REFERENCE).catch((reason: unknown) => reason);
    expect(fully_serialize(error)).not.toContain(PLAINTEXT);
  });

  it("keeps the plaintext out of a failure raised after a successful read", async () => {
    const resolver = new SillyTavernSecretResolver(
      context(),
      fetch_returning(() => ({
        ok: true,
        status: 200,
        json: () => Promise.reject(new Error(`parse failed for ${PLAINTEXT}`)),
      })),
    );

    const error = await resolver.resolve_secret(REFERENCE).catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(SecretResolutionError);
    expect(fully_serialize(error)).not.toContain(PLAINTEXT);
  });
});

describe("create_sillytavern_secret_resolver", () => {
  it("returns null when the host exposes no usable secrets context", () => {
    expect(create_sillytavern_secret_resolver(undefined, vi.fn())).toBeNull();
    expect(create_sillytavern_secret_resolver({}, vi.fn())).toBeNull();
    expect(create_sillytavern_secret_resolver(context(), "not a function")).toBeNull();
  });

  it("returns a working resolver when the host does expose one", async () => {
    const resolver = create_sillytavern_secret_resolver(
      context(),
      fetch_returning(() => ({
        ok: true,
        status: 200,
        json: async () => ({ [REFERENCE]: PLAINTEXT }),
      })),
    );

    await expect(resolver?.resolve_secret(REFERENCE)).resolves.toBe(PLAINTEXT);
  });
});
