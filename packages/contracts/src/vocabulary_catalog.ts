import { z } from "zod";

import { Sha256Schema } from "./generation.js";
import { VocabularyPackageIdSchema, VocabularySemverSchema } from "./vocabulary.js";

/**
 * BCP-47-ish language tag: a 2-3 letter primary subtag, optionally followed by a region/script
 * subtag (e.g. "en", "zh-CN"). Deliberately not a closed enum -- the catalog is published data,
 * and locking this to today's two languages would reject a legitimate future catalog entry.
 */
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

/**
 * A catalog entry's base_url is the one place the extension is allowed to source a package
 * download location from (see packages/vocabulary/src/package_client.ts's I/O contract) -- it
 * must always be a well-formed absolute https URL, never http or another scheme.
 */
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

/**
 * One installable vocabulary package as published by the catalog document. Strict and exact to
 * the live shape at https://huggingface.co/datasets/ITOTII/tavern-canvas-vocabulary/resolve/main/catalog.json
 * -- an unknown field or a shape drift on the published catalog fails closed rather than being
 * silently ignored.
 */
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
    // ISO 8601 UTC only ("Z" offset) -- mirrors packages/storage's TimestampSchema convention.
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

/**
 * The published catalog document is a bare JSON array of entries (not wrapped in an envelope
 * object) -- verified directly against the live document. Bounded to a generous entry count as a
 * defensive ceiling; uniqueness of package_id is enforced so two entries can never race to
 * describe the same installable package.
 */
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
