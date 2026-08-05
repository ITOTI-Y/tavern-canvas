// @vitest-environment node

import { describe, expect, it } from "vitest";

import { GatewayConfigError, load_gateway_config } from "./load_config.js";

const TOKEN_HASH = "a".repeat(64);
const PROVIDER_CREDENTIAL = "fixture-provider-secret";

function valid_environment(): Record<string, string> {
  return {
    TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
    TAVERN_CANVAS_BIND_PORT: "8787",
    TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify(["HTTP://LOCALHOST:80"]),
    TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([TOKEN_HASH]),
    TAVERN_CANVAS_DATA_DIR: "output/gateway",
    TAVERN_CANVAS_CONCURRENCY: "2",
    TAVERN_CANVAS_MAX_REQUEST_BYTES: "2000000",
    TAVERN_CANVAS_MAX_IMAGE_BYTES: "20000000",
    TAVERN_CANVAS_MAX_IMAGE_PIXELS: "40000000",
    TAVERN_CANVAS_MAX_IMAGE_DIMENSION: "8192",
    TAVERN_CANVAS_PROVIDER_PROFILES: JSON.stringify([
      {
        provider_id: "openai_image",
        base_url: "https://API.EXAMPLE.com:443",
        credential: PROVIDER_CREDENTIAL,
        profile: {
          profile_id: "openai-default",
          provider_id: "openai_image",
          model_allowlist: ["gpt-image-1"],
          output_mime_type_allowlist: ["image/png"],
          remote_asset_origin_allowlist: [],
          max_response_bytes: 20_000_000,
          max_input_asset_bytes: 20_000_000,
        },
      },
    ]),
  };
}

function provider_profiles(mutate: (profile: Record<string, unknown>) => void): string {
  const profiles = JSON.parse(
    valid_environment().TAVERN_CANVAS_PROVIDER_PROFILES ?? "[]",
  ) as Record<string, unknown>[];
  mutate(profiles[0] ?? {});
  return JSON.stringify(profiles);
}

describe("load_gateway_config", () => {
  it("loads normalized server-only configuration and redacts credentials", () => {
    const config = load_gateway_config({
      env: valid_environment(),
      cwd: "/srv/tavern-canvas",
    });

    expect(config).toMatchObject({
      bind_host: "127.0.0.1",
      bind_port: 8787,
      cors_origins: ["http://localhost"],
      bearer_token_hashes: [TOKEN_HASH],
      data_directory: "/srv/tavern-canvas/output/gateway",
      concurrency: 2,
      limits: {
        max_request_bytes: 2_000_000,
        max_image_bytes: 20_000_000,
        max_image_pixels: 40_000_000,
        max_image_dimension: 8192,
      },
    });
    const provider = config.provider_profiles[0];
    expect(provider?.base_url).toBe("https://api.example.com");
    expect(provider?.credential?.reveal()).toBe(PROVIDER_CREDENTIAL);
    expect(provider?.profile.model_allowlist).toEqual(["gpt-image-1"]);
    expect(JSON.stringify(config)).not.toContain(PROVIDER_CREDENTIAL);
    expect(String(provider?.credential)).toBe("[REDACTED]");
  });
  it("redacts bearer-token hashes from JSON and string output", () => {
    const config = load_gateway_config({
      env: valid_environment(),
      cwd: "/srv/tavern-canvas",
    });

    expect(config.bearer_token_hashes).toEqual([TOKEN_HASH]);
    expect(JSON.stringify(config)).not.toContain(TOKEN_HASH);
    expect(String(config.bearer_token_hashes)).toBe("[REDACTED]");
  });

  it.each([
    [
      "wildcard CORS",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_CORS_ORIGINS = JSON.stringify(["*"]);
      },
    ],
    [
      "empty CORS allowlist",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_CORS_ORIGINS = "[]";
      },
    ],
    [
      "empty bearer hash allowlist",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_BEARER_TOKEN_HASHES = "[]";
      },
    ],
    [
      "empty model allowlist",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
          const profile = provider.profile as Record<string, unknown>;
          profile.model_allowlist = [];
        });
      },
    ],
    [
      "duplicate model allowlist entry",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
          const profile = provider.profile as Record<string, unknown>;
          profile.model_allowlist = ["gpt-image-1", "gpt-image-1"];
        });
      },
    ],
    [
      "invalid provider URL",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
          provider.base_url = "not a URL";
        });
      },
    ],
    [
      "credential over cleartext non-loopback URL",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
          provider.base_url = "http://192.168.1.10:7860";
        });
      },
    ],
    [
      "path-bearing remote asset origin",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
          const profile = provider.profile as Record<string, unknown>;
          profile.remote_asset_origin_allowlist = ["https://assets.example/path"];
        });
      },
    ],
    [
      "blank provider credential",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
          provider.credential = "   ";
        });
      },
    ],
    [
      "data path traversal",
      (env: Record<string, string>) => {
        env.TAVERN_CANVAS_DATA_DIR = "../outside";
      },
    ],
  ])("rejects %s", (_case_name, mutate) => {
    const env = valid_environment();
    mutate(env);

    expect(() => load_gateway_config({ env, cwd: "/srv/app" })).toThrow(GatewayConfigError);
  });

  it("rejects unknown profile fields instead of retaining secret material", () => {
    const env = valid_environment();
    env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
      provider.profile = {
        ...(provider.profile as Record<string, unknown>),
        api_key: "profile-secret-that-must-not-appear",
      };
    });

    expect(() => load_gateway_config({ env, cwd: "/srv/app" })).toThrow(GatewayConfigError);
  });

  it("does not leak provider credentials through validation errors", () => {
    const env = valid_environment();
    env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
      provider.base_url = "invalid";
      provider.credential = "credential-that-must-not-appear";
    });

    let message = "";
    try {
      load_gateway_config({ env, cwd: "/srv/app" });
    } catch (error) {
      message = String(error);
    }
    expect(message).not.toContain("credential-that-must-not-appear");
    expect(message).not.toContain(PROVIDER_CREDENTIAL);
  });
});
