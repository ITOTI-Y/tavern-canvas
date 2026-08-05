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
  it("normalizes OpenAI remote asset origins to exact origins", () => {
    const env = valid_environment();
    env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
      const profile = provider.profile as Record<string, unknown>;
      profile.remote_asset_origin_allowlist = ["HTTPS://ASSETS.EXAMPLE:443/"];
    });

    const config = load_gateway_config({ env, cwd: "/srv/app" });

    expect(config.provider_profiles[0]?.profile).toMatchObject({
      remote_asset_origin_allowlist: ["https://assets.example"],
    });
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
      "duplicate provider ID",
      (env: Record<string, string>) => {
        const profiles = JSON.parse(env.TAVERN_CANVAS_PROVIDER_PROFILES ?? "[]") as Record<
          string,
          unknown
        >[];
        const first = profiles[0] ?? {};
        const first_profile = first.profile as Record<string, unknown>;
        profiles.push({
          ...first,
          profile: { ...first_profile, profile_id: "openai-secondary" },
        });
        env.TAVERN_CANVAS_PROVIDER_PROFILES = JSON.stringify(profiles);
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

  it.each([
    [
      "missing adapter-required field",
      (profile: Record<string, unknown>) => {
        delete profile.max_response_bytes;
      },
    ],
    [
      "foreign adapter field",
      (profile: Record<string, unknown>) => {
        profile.workflow_allowlist = ["55555555-5555-4555-8555-555555555555"];
      },
    ],
    [
      "unsupported video MIME",
      (profile: Record<string, unknown>) => {
        profile.output_mime_type_allowlist = ["video/mp4"];
      },
    ],
    [
      "invalid fixed model",
      (profile: Record<string, unknown>) => {
        profile.model_allowlist = ["not-a-supported-openai-model"];
      },
    ],
  ])("rejects adapter-invalid profile: %s", (_case_name, mutate) => {
    const env = valid_environment();
    env.TAVERN_CANVAS_PROVIDER_PROFILES = provider_profiles((provider) => {
      mutate(provider.profile as Record<string, unknown>);
    });

    expect(() => load_gateway_config({ env, cwd: "/srv/app" })).toThrow(GatewayConfigError);
  });

  it.each([
    [
      "sd_webui",
      {
        provider_id: "sd_webui",
        base_url: "http://127.0.0.1:7860",
        profile: {
          profile_id: "sd-local",
          provider_id: "sd_webui",
          model_allowlist: ["sdxl-base"],
          vae_allowlist: [],
          adetailer_model_allowlist: [],
          controlnet_model_allowlist: [],
          output_mime_type_allowlist: ["image/png"],
          max_response_bytes: 2_000_000,
          max_input_asset_bytes: 2_000_000,
        },
      },
    ],
    [
      "novelai",
      {
        provider_id: "novelai",
        base_url: "https://api.novelai.example",
        credential: "fixture",
        profile: {
          profile_id: "novelai-cloud",
          provider_id: "novelai",
          model_allowlist: ["nai-diffusion-4-full"],
          output_mime_type_allowlist: ["image/png"],
          max_response_bytes: 2_000_000,
          max_archive_entries: 8,
          max_input_asset_bytes: 2_000_000,
        },
      },
    ],
    [
      "comfyui",
      {
        provider_id: "comfyui",
        base_url: "http://127.0.0.1:8188",
        profile: {
          profile_id: "comfy-local",
          provider_id: "comfyui",
          model_allowlist: ["stored-workflows"],
          output_mime_type_allowlist: ["image/png"],
          workflow_allowlist: ["55555555-5555-4555-8555-555555555555"],
          max_response_bytes: 2_000_000,
          max_input_asset_bytes: 2_000_000,
        },
      },
    ],
    [
      "openai_image",
      {
        provider_id: "openai_image",
        base_url: "https://api.openai.example",
        credential: "fixture",
        profile: {
          profile_id: "openai-cloud",
          provider_id: "openai_image",
          model_allowlist: ["gpt-image-1"],
          output_mime_type_allowlist: ["image/png"],
          remote_asset_origin_allowlist: [],
          max_response_bytes: 2_000_000,
          max_input_asset_bytes: 2_000_000,
        },
      },
    ],
    [
      "google_image",
      {
        provider_id: "google_image",
        base_url: "https://generativelanguage.example",
        credential: "fixture",
        profile: {
          profile_id: "google-cloud",
          provider_id: "google_image",
          model_allowlist: ["gemini-2.5-flash-image"],
          output_mime_type_allowlist: ["image/png"],
          max_response_bytes: 2_000_000,
          max_input_asset_bytes: 2_000_000,
        },
      },
    ],
  ] as const)("accepts normalized %s adapter profiles", (provider_id, provider) => {
    const env = valid_environment();
    env.TAVERN_CANVAS_PROVIDER_PROFILES = JSON.stringify([provider]);

    const config = load_gateway_config({ env, cwd: "/srv/app" });

    expect(config.provider_profiles[0]?.provider_id).toBe(provider_id);
    expect(config.provider_profiles[0]?.profile.provider_id).toBe(provider_id);
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
