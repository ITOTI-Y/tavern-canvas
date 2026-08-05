import { isIP } from "node:net";

import { AssetIdSchema, ProviderIdSchema } from "@tavern-canvas/contracts";
import { z } from "zod";

const TOKEN_HASH_PATTERN = /^[a-f0-9]{64}$/u;
const MEDIA_TYPE_SCHEMA = z.enum(["image/png", "image/jpeg", "image/webp", "video/mp4"]);

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

const HttpsOriginSchema = HttpOriginSchema.check((context) => {
  if (!context.value.startsWith("https://")) {
    context.issues.push({
      code: "custom",
      input: context.value,
      message: "Expected an HTTPS origin",
    });
  }
});

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

const ProfileStringSchema = z.string().trim().min(1).max(128);

const CommonProviderProfileSchema = z
  .strictObject({
    profile_id: ProfileStringSchema,
    provider_id: ProviderIdSchema,
    model_allowlist: z.array(ProfileStringSchema).min(1).max(128),
    vae_allowlist: z.array(ProfileStringSchema).max(128).optional(),
    adetailer_model_allowlist: z.array(ProfileStringSchema).max(128).optional(),
    controlnet_model_allowlist: z.array(ProfileStringSchema).max(128).optional(),
    output_mime_type_allowlist: z.array(MEDIA_TYPE_SCHEMA).min(1).max(4),
    remote_asset_origin_allowlist: z.array(HttpsOriginSchema).max(32).optional(),
    workflow_allowlist: z.array(AssetIdSchema).min(1).max(256).optional(),
    max_response_bytes: z.number().int().positive().max(100_000_000).optional(),
    max_input_asset_bytes: z.number().int().positive().max(100_000_000).optional(),
    max_archive_entries: z.number().int().min(1).max(32).optional(),
  })
  .check((context) => {
    const allowlists = [
      ["model_allowlist", context.value.model_allowlist],
      ["vae_allowlist", context.value.vae_allowlist],
      ["adetailer_model_allowlist", context.value.adetailer_model_allowlist],
      ["controlnet_model_allowlist", context.value.controlnet_model_allowlist],
      ["output_mime_type_allowlist", context.value.output_mime_type_allowlist],
      ["remote_asset_origin_allowlist", context.value.remote_asset_origin_allowlist],
      ["workflow_allowlist", context.value.workflow_allowlist],
    ] as const;
    for (const [path, values] of allowlists) {
      if (values !== undefined) {
        check_unique(context, path, values);
      }
    }
  });

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
    profile: CommonProviderProfileSchema,
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
