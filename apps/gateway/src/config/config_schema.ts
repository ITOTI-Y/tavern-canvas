import { isIP } from "node:net";

import { ProviderIdSchema, type ProviderId } from "@tavern-canvas/contracts";
import {
  ComfyUiAdapter,
  GoogleImageAdapter,
  NovelAiAdapter,
  OpenAiImageAdapter,
  SdWebuiAdapter,
  type ProviderProfile,
} from "@tavern-canvas/providers";
import { z } from "zod";

const TOKEN_HASH_PATTERN = /^[a-f0-9]{64}$/u;

export class SecretValue {
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
    Object.freeze(this);
  }

  reveal(): string {
    return this.#value;
  }

  toJSON(): string {
    return "[REDACTED]";
  }

  toString(): string {
    return "[REDACTED]";
  }
}

const BindHostSchema = z
  .string()
  .trim()
  .min(1)
  .max(255)
  .refine((value) => value === "localhost" || isIP(value) !== 0, {
    message: "Bind host must be an IP literal or localhost",
  });

const HttpOriginSchema = z
  .string()
  .trim()
  .check((context) => {
    if (normalize_http_origin(context.value) === null) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "Expected an HTTP origin",
      });
    }
  })
  .transform((value) => normalize_http_origin(value) ?? value);

const ProviderBaseUrlSchema = HttpOriginSchema.check((context) => {
  const url = new URL(context.value);
  if (url.protocol === "http:" && !is_loopback_hostname(url.hostname)) {
    context.issues.push({
      code: "custom",
      input: context.value,
      message: "Cleartext provider URLs must be loopback origins",
    });
  }
});

const PROVIDER_ADAPTERS: Record<
  ProviderId,
  { readonly validate_profile: (profile: unknown) => ProviderProfile }
> = {
  sd_webui: new SdWebuiAdapter(),
  novelai: new NovelAiAdapter(),
  comfyui: new ComfyUiAdapter({
    workflow_store: { load: () => Promise.resolve({}) },
  }),
  openai_image: new OpenAiImageAdapter(),
  google_image: new GoogleImageAdapter(),
};

const GatewayProviderProfileSchema = z
  .record(z.string(), z.unknown())
  .check((context) => {
    const provider_id = ProviderIdSchema.safeParse(context.value.provider_id);
    if (!provider_id.success) {
      context.issues.push({
        code: "custom",
        input: "[REDACTED]",
        message: "Provider profile ID is invalid",
        path: ["provider_id"],
      });
      return;
    }
    const normalized_profile = normalize_provider_profile_input(context.value, provider_id.data);
    try {
      PROVIDER_ADAPTERS[provider_id.data].validate_profile(normalized_profile);
    } catch {
      context.issues.push({
        code: "custom",
        input: "[REDACTED]",
        message: "Provider profile does not satisfy its adapter schema",
        path: ["profile"],
      });
    }
    if (provider_id.data === "openai_image") {
      check_openai_remote_origins(context, normalized_profile);
    }
  })
  .transform((profile) => {
    const provider_id = ProviderIdSchema.parse(profile.provider_id);
    const normalized_profile = normalize_provider_profile_input(profile, provider_id);
    return PROVIDER_ADAPTERS[provider_id].validate_profile(normalized_profile);
  });

function is_unknown_array(value: unknown): value is readonly unknown[] {
  return Array.isArray(value);
}

function normalize_provider_profile_input(
  profile: Record<string, unknown>,
  provider_id: ProviderId,
): Record<string, unknown> {
  if (provider_id !== "openai_image") {
    return profile;
  }
  const origins = profile.remote_asset_origin_allowlist;
  if (!is_unknown_array(origins)) {
    return profile;
  }
  return {
    ...profile,
    remote_asset_origin_allowlist: origins.map((origin) =>
      typeof origin === "string" ? (normalize_http_origin(origin) ?? origin) : origin,
    ),
  };
}

function check_openai_remote_origins(
  context: { issues: z.core.$ZodRawIssue[] },
  profile: Record<string, unknown>,
): void {
  const origins = profile.remote_asset_origin_allowlist;
  if (!is_unknown_array(origins)) {
    return;
  }
  const normalized_origins = origins.map((origin) =>
    typeof origin === "string" ? normalize_http_origin(origin) : null,
  );
  if (
    normalized_origins.some((origin) => origin === null) ||
    new Set(normalized_origins).size !== normalized_origins.length
  ) {
    context.issues.push({
      code: "custom",
      input: "[REDACTED]",
      message: "Remote asset origins must be unique exact HTTP origins",
      path: ["remote_asset_origin_allowlist"],
    });
  }
}

export const GatewayProviderConfigSchema = z
  .strictObject({
    provider_id: ProviderIdSchema,
    base_url: ProviderBaseUrlSchema,
    credential: z
      .string()
      .min(1)
      .max(16_384)
      .refine((value) => value.trim().length > 0, "Provider credential must not be blank")
      .transform((value) => new SecretValue(value))
      .optional(),
    profile: GatewayProviderProfileSchema,
  })
  .check((context) => {
    if (context.value.profile.provider_id !== context.value.provider_id) {
      context.issues.push({
        code: "custom",
        input: context.value.profile.provider_id,
        message: "Provider profile ID must match its runtime provider ID",
        path: ["profile", "provider_id"],
      });
    }
    if (
      ["novelai", "openai_image", "google_image"].includes(context.value.provider_id) &&
      context.value.credential === undefined
    ) {
      context.issues.push({
        code: "custom",
        input: context.value.provider_id,
        message: "This provider requires a server credential",
        path: ["credential"],
      });
    }
  });

export const GatewayConfigSchema = z
  .strictObject({
    bind_host: BindHostSchema,
    bind_port: z.number().int().min(1).max(65_535),
    cors_origins: z.array(HttpOriginSchema).min(1).max(128),
    bearer_token_hashes: z
      .array(z.string().trim().toLowerCase().regex(TOKEN_HASH_PATTERN))
      .min(1)
      .max(128),
    data_directory: z.string().min(1).max(4_096),
    concurrency: z.number().int().min(1).max(64),
    limits: z.strictObject({
      max_request_bytes: z.number().int().min(1_024).max(20_000_000),
      max_image_bytes: z.number().int().min(1_024).max(100_000_000),
      max_image_pixels: z.number().int().min(1).max(200_000_000),
      max_image_dimension: z.number().int().min(1).max(32_768),
    }),
    provider_profiles: z.array(GatewayProviderConfigSchema).min(1).max(128),
  })
  .check((context) => {
    check_unique(context, "cors_origins", context.value.cors_origins);
    check_unique(context, "bearer_token_hashes", context.value.bearer_token_hashes);
    check_unique(
      context,
      "provider_profiles",
      context.value.provider_profiles.map((provider) => provider.profile.profile_id),
    );
    check_unique(
      context,
      "provider_ids",
      context.value.provider_profiles.map((provider) => provider.provider_id),
    );
  });

export type GatewayProviderConfig = z.infer<typeof GatewayProviderConfigSchema>;
export type GatewayConfig = z.infer<typeof GatewayConfigSchema>;

function normalize_http_origin(value: string): string | null {
  try {
    if (value === "*") {
      return null;
    }
    const url = new URL(value);
    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      url.username.length > 0 ||
      url.password.length > 0 ||
      url.pathname !== "/" ||
      url.search.length > 0 ||
      url.hash.length > 0
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function is_loopback_hostname(hostname: string): boolean {
  if (hostname === "localhost" || hostname === "[::1]") {
    return true;
  }
  if (isIP(hostname) !== 4) {
    return false;
  }
  const first_octet = Number(hostname.split(".", 1)[0]);
  return first_octet === 127;
}

function check_unique(
  context: { issues: z.core.$ZodRawIssue[] },
  path: string,
  values: readonly string[],
): void {
  if (new Set(values).size !== values.length) {
    context.issues.push({
      code: "custom",
      input: values,
      message: `${path} must not contain duplicates`,
      path: [path],
    });
  }
}
