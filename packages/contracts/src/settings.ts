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

export const ANALYSIS_CREDENTIAL_KIND = "analysis_api_key" as const;

/** The custom analysis API's key, one per namespace. */
export function derive_analysis_credential_reference(namespace: string): string {
  return VaultReferenceSchema.parse(`tavern_canvas:${namespace}:${ANALYSIS_CREDENTIAL_KIND}`);
}

const NamespaceIdentifierSchema = z
  .string()
  .min(1)
  .max(128)
  .refine(
    (value) => value === value.trim(),
    "active_namespace must not have surrounding whitespace",
  );
/** `browser_device` needs no passphrase and no host permission to reveal secrets. */
export const CredentialStorageModeSchema = z.enum(["browser_device", "host", "browser_encrypted"]);
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
  /** An OpenAI-compatible endpoint; its key is stored under `derive_analysis_credential_reference`. */
  z.strictObject({
    kind: z.literal("custom"),
    api_url: z.url({ protocol: /^https?$/u }).max(500),
    model: z.string().trim().min(1).max(200),
  }),
]);
export type AnalysisConnection = z.infer<typeof AnalysisConnectionSchema>;

/**
 * World info for paragraph analysis: `chat` is what SillyTavern activates for the current chat,
 * `worldbook` the entries of the chosen books that the analyzed message activates.
 */
export const AnalysisWorldInfoSchema = z.preprocess(
  // Settings saved when only one book could be chosen hold it as `worldbook`.
  (value) =>
    typeof value === "object" &&
    value !== null &&
    "worldbook" in value &&
    typeof value.worldbook === "string"
      ? { mode: "worldbook", worldbooks: [value.worldbook] }
      : value,
  z.discriminatedUnion("mode", [
    z.strictObject({ mode: z.literal("chat") }),
    z.strictObject({ mode: z.literal("off") }),
    z.strictObject({
      mode: z.literal("worldbook"),
      worldbooks: z.array(z.string().trim().min(1).max(200)).min(1).max(20),
    }),
  ]),
);
export type AnalysisWorldInfo = z.infer<typeof AnalysisWorldInfoSchema>;

export const IllustrationSettingsSchema = z.strictObject({
  /** A SillyTavern chat completion preset name; `in_use` is the preset currently loaded. */
  preset_name: z.string().trim().min(1).max(200),
  connection: AnalysisConnectionSchema,
  max_chat_history: z.number().int().min(0).max(20),
  max_images_per_message: z.number().int().min(1).max(8),
  prompt_preset_id: UuidSchema.nullable(),
  world_info: AnalysisWorldInfoSchema.default({ mode: "chat" }),
  /** Model for the per-reply wardrobe update; `null` uses the analysis connection's model. */
  wardrobe_model: z.string().trim().min(1).max(200).nullable().default(null),
  /** The user's direction on style and setting, sent with every paragraph analysis. */
  analysis_guidance: z.string().max(2000).default(""),
  /** The user's direction on clothing, sent with every wardrobe update. */
  wardrobe_guidance: z.string().max(2000).default(""),
});
export type IllustrationSettings = z.infer<typeof IllustrationSettingsSchema>;

export const GlossaryEntrySchema = z.strictObject({
  source: z.string().trim().min(1).max(32),
  target: z.string().trim().min(1).max(128),
});
export type GlossaryEntry = z.infer<typeof GlossaryEntrySchema>;

/** The DeepL key itself lives in SillyTavern's secret store under `deepl`. */
export const TranslationSettingsSchema = z.strictObject({
  deepl_endpoint: z.enum(["free", "pro"]),
  /** Applied before DeepL; capped so the whole settings object stays under SillyTavern's size limit. */
  glossary: z.array(GlossaryEntrySchema).max(200),
});
export type TranslationSettings = z.infer<typeof TranslationSettingsSchema>;

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
  translation: TranslationSettingsSchema,
  ui: TavernCanvasUiSettingsSchema,
});
export type TavernCanvasSettings = z.infer<typeof TavernCanvasSettingsSchema>;
