import { z } from "zod";

import { UuidSchema, VaultReferenceSchema } from "./ids.js";

export const NormalizedOriginSchema = z.url().check((context) => {
  if (!URL.canParse(context.value)) {
    return;
  }

  const url = new URL(context.value);
  if ((url.protocol !== "http:" && url.protocol !== "https:") || url.origin !== context.value) {
    context.issues.push({
      code: "custom",
      input: context.value,
      message: "Expected a normalized HTTP or HTTPS origin",
    });
  }
});
export type NormalizedOrigin = z.infer<typeof NormalizedOriginSchema>;

export const GatewaySettingsSchema = z.strictObject({
  endpoint: NormalizedOriginSchema.nullable(),
  token_secret_id: z.string().min(1).nullable(),
  http_acknowledgments: z.record(NormalizedOriginSchema, z.iso.datetime({ offset: false })),
});
export type GatewaySettings = z.infer<typeof GatewaySettingsSchema>;

export const GATEWAY_CREDENTIAL_KIND = "gateway_access_token" as const;

// One Gateway bearer token per namespace; the token itself lives only in host secret storage and in
// the `Authorization` header of a live request.
export function derive_gateway_credential_reference(namespace: string): string {
  return VaultReferenceSchema.parse(`tavern_canvas:${namespace}:${GATEWAY_CREDENTIAL_KIND}`);
}

const NamespaceIdentifierSchema = z
  .string()
  .min(1)
  .max(128)
  .refine(
    (value) => value === value.trim(),
    "active_namespace must not have surrounding whitespace",
  );
export const CredentialStorageModeSchema = z.enum(["host", "browser_encrypted"]);
export type CredentialStorageMode = z.infer<typeof CredentialStorageModeSchema>;

export const TavernCanvasUiSettingsSchema = z.strictObject({
  color_mode: z.enum(["system", "light", "dark"]),
  inspector_width: z.number().int().min(240).max(720),
  inspector_collapsed: z.boolean(),
  optional_entry_enabled: z.boolean(),
});
export type TavernCanvasUiSettings = z.infer<typeof TavernCanvasUiSettingsSchema>;

/** Which backend answers the paragraph analysis; both route through SillyTavern's server. */
export const AnalysisConnectionSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("current") }),
  z.strictObject({
    kind: z.literal("proxy_preset"),
    proxy_preset: z.string().trim().min(1).max(200),
    model: z.string().trim().min(1).max(200).nullable(),
  }),
]);
export type AnalysisConnection = z.infer<typeof AnalysisConnectionSchema>;

export const IllustrationSettingsSchema = z.strictObject({
  /** A SillyTavern chat completion preset name; `in_use` is the preset currently loaded. */
  preset_name: z.string().trim().min(1).max(200),
  connection: AnalysisConnectionSchema,
  max_chat_history: z.number().int().min(0).max(20),
  max_images_per_message: z.number().int().min(1).max(8),
  prompt_preset_id: UuidSchema.nullable(),
});
export type IllustrationSettings = z.infer<typeof IllustrationSettingsSchema>;

export const TavernCanvasSettingsSchema = z.strictObject({
  schema_version: z.literal(1),
  active_namespace: NamespaceIdentifierSchema,
  locale: z.enum(["auto", "zh-CN", "en"]),
  credential_storage_mode: CredentialStorageModeSchema,
  active_provider_profile_id: UuidSchema.nullable(),
  global_concurrency: z.number().int().min(1).max(4),
  auto_generation_enabled: z.boolean(),
  vocabulary_update_channel: z.enum(["bundled", "remote"]),
  illustration: IllustrationSettingsSchema,
  gateway: GatewaySettingsSchema,
  ui: TavernCanvasUiSettingsSchema,
});
export type TavernCanvasSettings = z.infer<typeof TavernCanvasSettingsSchema>;
