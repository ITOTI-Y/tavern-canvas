import {
  ImageRecordSchema,
  RECORD_SCHEMAS,
  type ImageRecord,
  type Vocabulary,
  type VocabularyGroup,
} from "@tavern-canvas/storage";

import {
  namespaced_record_base,
  type ConversionContext,
  type ConversionWarning,
} from "../conversion_result.js";
import { decode_base64 } from "../legacy_coercion.js";
import { deterministic_uuid, sha256_hex_bytes } from "../id_derivation.js";
import type {
  LegacyGalleryDatabaseFixture,
  LegacyGalleryImageEntry,
  LegacySettings,
} from "../legacy_schema.js";

export interface GalleryConversionResult {
  readonly image_records: readonly ImageRecord[];
  readonly vocabularies: readonly Vocabulary[];
  readonly vocabulary_groups: readonly VocabularyGroup[];
  readonly warnings: readonly ConversionWarning[];
}

const MANUAL_FILE_NAME = "manual";

function build_image_record(
  context: ConversionContext,
  id: string,
  sha256: string,
  kind: string,
  extra: Record<string, unknown>,
): ImageRecord {
  return ImageRecordSchema.parse({
    ...namespaced_record_base(context, id),
    sha256,
    last_accessed_at: context.migrated_at,
    pinned: false,
    payload: { kind, ...extra },
  });
}

function convert_resolved_image(
  context: ConversionContext,
  id_seed: string,
  tag_key: string,
  entry: LegacyGalleryImageEntry,
  kind: "server_metadata" | "indexeddb_blob",
  warnings: ConversionWarning[],
  source_path: string,
): ImageRecord | undefined {
  if (entry.data_base64 === undefined) {
    warnings.push({
      path: source_path,
      message: `Image ${entry.uuid} has no resolved bytes; the migration runner must fetch it before this record can be converted.`,
    });
    return undefined;
  }
  const bytes = decode_base64(entry.data_base64);
  const sha256 = sha256_hex_bytes(bytes);
  const id = deterministic_uuid(`${context.namespace}:gallery_converter:${id_seed}:${entry.uuid}`);
  return build_image_record(context, id, sha256, kind, {
    tag_key,
    legacy_uuid: entry.uuid,
    ...(entry.path === undefined ? {} : { host_path: entry.path }),
    ...(entry.thumbnail_path === undefined ? {} : { thumbnail_host_path: entry.thumbnail_path }),
    is_video: entry.isVideo,
    original_url: entry.originalUrl,
    byte_length: bytes.byteLength,
    generation_parameters: entry.genParams ?? null,
  });
}

export function convert_gallery(
  legacy: LegacySettings,
  gallery: LegacyGalleryDatabaseFixture | undefined,
  context: ConversionContext,
): GalleryConversionResult {
  const warnings: ConversionWarning[] = [];
  const image_records: ImageRecord[] = [];
  const vocabularies: Vocabulary[] = [];
  const vocabulary_groups: VocabularyGroup[] = [];

  for (const [tag_key, tag_entry] of Object.entries(legacy.jiuguanStorage)) {
    for (const [index, entry] of tag_entry.images.entries()) {
      const record = convert_resolved_image(
        context,
        "server",
        tag_key,
        entry,
        "server_metadata",
        warnings,
        `jiuguanStorage.${tag_key}.images[${String(index)}]`,
      );
      if (record !== undefined) {
        image_records.push(record);
      }
    }
  }

  for (const [tag_key, tag_entry] of Object.entries(gallery?.tupianhuancun_metadata ?? {})) {
    for (const [index, entry] of tag_entry.images.entries()) {
      const resolved =
        entry.data_base64 ??
        (gallery?.tupianhuancun_blobs[entry.uuid] === undefined
          ? undefined
          : gallery.tupianhuancun_blobs[entry.uuid]);
      const record = convert_resolved_image(
        context,
        "indexeddb",
        tag_key,
        { ...entry, data_base64: resolved },
        "indexeddb_blob",
        warnings,
        `chatu8_gallery.tupianhuancun.${tag_key}.images[${String(index)}]`,
      );
      if (record !== undefined) {
        image_records.push(record);
      }
    }
  }

  if (gallery === undefined) {
    warnings.push({
      path: "chatu8_gallery",
      message:
        "No gallery database fixture supplied; the IndexedDB tupianhuancun/vocabulary stores were not converted.",
    });
    return { image_records, vocabularies, vocabulary_groups, warnings };
  }

  const manual_tags = gallery.tags.filter((row) => row.fileName === MANUAL_FILE_NAME);
  const vocabulary_id = deterministic_uuid(
    `${context.namespace}:gallery_converter:manual_vocabulary`,
  );
  vocabularies.push(
    RECORD_SCHEMAS.vocabularies.parse({
      ...namespaced_record_base(context, vocabulary_id),
      payload: { kind: "manual_vocabulary", tags: manual_tags },
    }),
  );

  const manual_groups = gallery.groups.filter((row) => row.fileName === MANUAL_FILE_NAME);
  const manual_subgroups = gallery.subgroups.filter((row) => row.fileName === MANUAL_FILE_NAME);
  for (const row of manual_groups) {
    const id = deterministic_uuid(`${context.namespace}:gallery_converter:group:${row.id_index}`);
    vocabulary_groups.push(
      RECORD_SCHEMAS.vocabulary_groups.parse({
        ...namespaced_record_base(context, id),
        vocabulary_id,
        payload: { kind: "group", ...row },
      }),
    );
  }
  for (const row of manual_subgroups) {
    const id = deterministic_uuid(
      `${context.namespace}:gallery_converter:subgroup:${row.id_index}`,
    );
    vocabulary_groups.push(
      RECORD_SCHEMAS.vocabulary_groups.parse({
        ...namespaced_record_base(context, id),
        vocabulary_id,
        payload: { kind: "subgroup", ...row },
      }),
    );
  }

  const skipped_bundled_tags = gallery.tags.length - manual_tags.length;
  if (skipped_bundled_tags > 0) {
    warnings.push({
      path: "chatu8_gallery.tags",
      message: `Skipped ${String(skipped_bundled_tags)} bundled (non-manual) tag row(s); the bundled vocabulary dataset ships with the extension and is not user data.`,
    });
  }

  return { image_records, vocabularies, vocabulary_groups, warnings };
}
