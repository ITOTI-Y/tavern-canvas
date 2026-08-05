import { z } from "zod";

export const NormalizedOriginSchema = z.url().check((context) => {
  if (!URL.canParse(context.value)) {
    return;
  }

  const url = new URL(context.value);
  if (
    (url.protocol !== "http:" && url.protocol !== "https:") ||
    url.origin !== context.value
  ) {
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
  http_acknowledgments: z.record(
    NormalizedOriginSchema,
    z.iso.datetime({ offset: false }),
  ),
});
export type GatewaySettings = z.infer<typeof GatewaySettingsSchema>;

export const TavernCanvasSettingsSchema = z.strictObject({
  schema_version: z.literal(1),
  locale: z.enum(["auto", "zh-CN", "en"]),
  global_concurrency: z.number().int().min(1).max(4),
  gateway: GatewaySettingsSchema,
});
export type TavernCanvasSettings = z.infer<
  typeof TavernCanvasSettingsSchema
>;
