import { z } from "zod";

import { Sha256Schema } from "./generation.js";
import { VocabularyPackageIdSchema, VocabularySemverSchema } from "./vocabulary.js";

// Not a closed enum: the catalog is published data and a future entry may use another language.
const VocabularyCatalogLanguageSchema = z
  .string()
  .trim()
  .min(2)
  .max(16)
  .regex(/^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$/u);

const VocabularyCatalogDisplayNameSchema = z.strictObject({
  en: z.string().trim().min(1).max(128),
  "zh-CN": z.string().trim().min(1).max(128),
});

const VocabularyCatalogDescriptionSchema = z.strictObject({
  en: z.string().trim().min(1).max(1_024),
  "zh-CN": z.string().trim().min(1).max(1_024),
});

// base_url is the only source of a package download location; it must be an absolute https URL.
const VocabularyCatalogBaseUrlSchema = z.url().check((context) => {
  if (!URL.canParse(context.value)) {
    return;
  }
  if (new URL(context.value).protocol !== "https:") {
    context.issues.push({
      code: "custom",
      input: context.value,
      message: "Catalog entry base_url must use the https: scheme",
    });
  }
});

// Strict: an unknown field in the published catalog fails closed.
export const VocabularyCatalogEntrySchema = z
  .strictObject({
    package_id: VocabularyPackageIdSchema,
    display_name: VocabularyCatalogDisplayNameSchema,
    description: VocabularyCatalogDescriptionSchema,
    data_version: VocabularySemverSchema,
    record_count: z.number().int().nonnegative(),
    compressed_bytes: z.number().int().nonnegative(),
    manifest_sha256: Sha256Schema,
    languages: z.array(VocabularyCatalogLanguageSchema).min(1).max(16),
    min_extension_version: VocabularySemverSchema,
    base_url: VocabularyCatalogBaseUrlSchema.nullable(),
    bundled: z.boolean().optional(),
    updated_at: z.iso.datetime({ offset: false }),
  })
  .check((context) => {
    if (context.value.bundled !== true && context.value.base_url === null) {
      context.issues.push({
        code: "custom",
        input: context.value.base_url,
        message: "base_url must be a non-null https URL unless the entry is bundled",
        path: ["base_url"],
      });
    }
  });
export type VocabularyCatalogEntry = z.infer<typeof VocabularyCatalogEntrySchema>;

// Bare JSON array; package_id is unique so two entries cannot describe the same package.
export const VocabularyCatalogDocumentSchema = z
  .array(VocabularyCatalogEntrySchema)
  .min(1)
  .max(500)
  .check((context) => {
    const seen_package_ids = new Set<string>();
    context.value.forEach((entry, index) => {
      if (seen_package_ids.has(entry.package_id)) {
        context.issues.push({
          code: "custom",
          input: entry.package_id,
          message: `duplicate package_id: ${entry.package_id}`,
          path: [index, "package_id"],
        });
      }
      seen_package_ids.add(entry.package_id);
    });
  });
export type VocabularyCatalogDocument = z.infer<typeof VocabularyCatalogDocumentSchema>;
