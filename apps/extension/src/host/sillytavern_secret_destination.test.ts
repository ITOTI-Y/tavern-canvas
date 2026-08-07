import { describe, expect, it, vi } from "vitest";

import { transfer_secrets } from "../migration/secret_transfer.js";
import {
  create_sillytavern_secret_destination,
  SillyTavernSecretDestination,
} from "./sillytavern_secret_destination.js";
import type { SillyTavernFetch, SillyTavernUploadResponse } from "./sillytavern_host.js";

function context() {
  return { getRequestHeaders: () => ({ "X-CSRF-TOKEN": "csrf-token" }) };
}

function fetch_returning(
  responses: Record<string, () => SillyTavernUploadResponse>,
): SillyTavernFetch {
  return vi.fn(async (route: string) => {
    const build = responses[route];
    if (!build) {
      throw new Error(`Unexpected route ${route}`);
    }
    return build();
  });
}

describe("SillyTavernSecretDestination", () => {
  it("supports every v2 credential kind: SillyTavern's secret vault is a generic string-keyed store", () => {
    const destination = new SillyTavernSecretDestination(context(), vi.fn());

    expect(destination.supports("chatu8_ai_assistant_api_key")).toBe(true);
    expect(destination.supports("novelai_token")).toBe(true);
    expect(destination.supports("legacy_ai_token")).toBe(true);
  });

  it("writes a secret via POST /api/secrets/write with CSRF headers and the derived reference as the key", async () => {
    const fetch_ = fetch_returning({
      "/api/secrets/write": () => ({
        ok: true,
        status: 200,
        json: async () => ({ id: "secret-uuid" }),
      }),
    });
    const destination = new SillyTavernSecretDestination(context(), fetch_);

    await destination.write_secret("tavern_canvas:ns:profile:novelai_token", "sk-plaintext");

    expect(fetch_).toHaveBeenCalledWith("/api/secrets/write", {
      method: "POST",
      headers: { "X-CSRF-TOKEN": "csrf-token" },
      body: JSON.stringify({
        key: "tavern_canvas:ns:profile:novelai_token",
        value: "sk-plaintext",
        label: "TavernCanvas migrated credential",
      }),
    });
  });

  it("throws when the write endpoint returns a non-OK status, never treating a rejected write as success", async () => {
    const fetch_ = fetch_returning({
      "/api/secrets/write": () => ({ ok: false, status: 400, json: async () => ({}) }),
    });
    const destination = new SillyTavernSecretDestination(context(), fetch_);

    await expect(
      destination.write_secret("tavern_canvas:ns:profile:novelai_token", "sk-plaintext"),
    ).rejects.toThrowError(/status 400/u);
  });

  it("probes retrievability through the read-state endpoint and never returns the secret value", async () => {
    const fetch_ = fetch_returning({
      "/api/secrets/read": () => ({
        ok: true,
        status: 200,
        json: async () => ({
          "tavern_canvas:ns:profile:novelai_token": [
            { id: "secret-uuid", value: "*******642", label: "Unlabeled", active: true },
          ],
        }),
      }),
    });
    const destination = new SillyTavernSecretDestination(context(), fetch_);

    const probed = await destination.probe_secret("tavern_canvas:ns:profile:novelai_token");

    expect(probed).toBe(true);
    expect(typeof probed).toBe("boolean");
  });

  it("reports false when no active entry exists for the reference", async () => {
    const fetch_ = fetch_returning({
      "/api/secrets/read": () => ({
        ok: true,
        status: 200,
        json: async () => ({ "tavern_canvas:ns:profile:novelai_token": null }),
      }),
    });
    const destination = new SillyTavernSecretDestination(context(), fetch_);

    await expect(
      destination.probe_secret("tavern_canvas:ns:profile:novelai_token"),
    ).resolves.toBe(false);
  });

  it("reports false (never throws) when the read endpoint itself fails, so the caller maps it to probe_failed", async () => {
    const fetch_ = fetch_returning({
      "/api/secrets/read": () => ({ ok: false, status: 500, json: async () => ({}) }),
    });
    const destination = new SillyTavernSecretDestination(context(), fetch_);

    await expect(
      destination.probe_secret("tavern_canvas:ns:profile:novelai_token"),
    ).resolves.toBe(false);
  });

  it("round-trips store -> probe-retrieve through migration's real transfer_secrets contract, with the plaintext never surfacing again", async () => {
    const store = new Map<string, { active: boolean }[]>();
    const fetch_ = vi.fn<SillyTavernFetch>(async (route, init) => {
      const body = JSON.parse(init.body) as { key?: string; value?: string };
      if (route === "/api/secrets/write" && body.key && body.value) {
        store.set(body.key, [{ active: true }]);
        return { ok: true, status: 200, json: async () => ({ id: "secret-uuid" }) };
      }
      if (route === "/api/secrets/read") {
        const state: Record<string, unknown> = {};
        for (const [key, entries] of store) {
          state[key] = entries;
        }
        return { ok: true, status: 200, json: async () => state };
      }
      throw new Error(`Unexpected call to ${route}`);
    });
    const destination = new SillyTavernSecretDestination(context(), fetch_);

    const summary = await transfer_secrets(
      [
        {
          operation: "secret_transfer",
          credential_kind: "novelai_token",
          source_path: "novelai_profiles.default.novelaiApi",
          provider_profile_id: "profile-1",
          plaintext_value: "sk-secret-value",
        },
      ],
      "ns",
      destination,
    );

    expect(summary.blocked).toBe(false);
    expect(summary.records).toEqual([
      {
        credential_kind: "novelai_token",
        provider_profile_id: "profile-1",
        source_path: "novelai_profiles.default.novelaiApi",
        status: "transferred",
        reference: "tavern_canvas:ns:profile-1:novelai_token",
      },
    ]);
    expect(JSON.stringify(summary)).not.toContain("sk-secret-value");
  });
});

describe("create_sillytavern_secret_destination", () => {
  it("returns null (no-supported-destination) when the host does not expose a usable secrets context", () => {
    expect(create_sillytavern_secret_destination(undefined, vi.fn())).toBeNull();
    expect(create_sillytavern_secret_destination({}, vi.fn())).toBeNull();
    expect(create_sillytavern_secret_destination(context(), "not a function")).toBeNull();
  });

  it("blocks migration end-to-end with a user-actionable reason when unsupported", async () => {
    const destination = create_sillytavern_secret_destination(undefined, vi.fn());

    const summary = await transfer_secrets(
      [
        {
          operation: "secret_transfer",
          credential_kind: "novelai_token",
          source_path: "novelai_profiles.default.novelaiApi",
          provider_profile_id: "profile-1",
          plaintext_value: "sk-secret-value",
        },
      ],
      "ns",
      destination,
    );

    expect(summary.blocked).toBe(true);
    expect(summary.records[0]).toMatchObject({
      status: "blocked",
      reason: "no_supported_destination",
    });
  });

  it("returns a working adapter when the host exposes a usable secrets context", () => {
    const destination = create_sillytavern_secret_destination(context(), vi.fn());

    expect(destination).not.toBeNull();
    expect(destination?.supports("novelai_token")).toBe(true);
  });
});
