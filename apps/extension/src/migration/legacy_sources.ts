import {
  classify_settings_paths,
  LegacyGalleryDatabaseFixtureSchema,
  LegacySettingsSchema,
  sha256_hex,
  sha256_hex_bytes,
  type LegacyGalleryDatabaseFixture,
  type LegacySettings,
} from "@tavern-canvas/v2-migration";
import type { ZodError } from "zod";

const MAX_REPORTED_ISSUE_PATHS = 10;

/** Field paths only — never values, so a validation failure can never leak a credential into diagnostics. */
function describe_zod_issue_paths(error: ZodError): string {
  const paths = [
    ...new Set(
      error.issues.map((issue) => (issue.path.length > 0 ? issue.path.join(".") : "(root)")),
    ),
  ];
  return paths.slice(0, MAX_REPORTED_ISSUE_PATHS).join(", ");
}

/**
 * `read_settings` mirrors `extension_settings["st-chatu8"]`; `read_gallery_database` mirrors the
 * "chatu8_gallery"/"tupian" and "chatu8_config_images"/"config_images" IndexedDB stores. Both return
 * `undefined` when absent. Legacy sources are read-only.
 */
export interface LegacySourcePort {
  read_settings(): Promise<unknown>;
  read_gallery_database(): Promise<unknown>;
}

export interface LegacyImageResolverPort {
  resolve_host_image(path: string): Promise<Uint8Array | null>;
}

export interface LegacyInventory {
  readonly jiuguan_image_count: number;
  readonly gallery_image_count: number;
  readonly config_image_count: number;
}

export type LegacySourceResult =
  | { readonly kind: "absent" }
  | { readonly kind: "invalid"; readonly fingerprint: string; readonly message: string }
  | {
      readonly kind: "unknown_paths";
      readonly fingerprint: string;
      readonly paths: readonly string[];
    }
  | {
      readonly kind: "present";
      readonly settings: LegacySettings;
      readonly gallery: LegacyGalleryDatabaseFixture | undefined;
      readonly fingerprint: string;
      readonly inventory: LegacyInventory;
    };

function compute_inventory(
  settings: LegacySettings,
  gallery: LegacyGalleryDatabaseFixture | undefined,
): LegacyInventory {
  const jiuguan_image_count = Object.values(settings.jiuguanStorage).reduce(
    (sum, entry) => sum + entry.images.length,
    0,
  );
  const gallery_image_count = Object.values(gallery?.tupianhuancun_metadata ?? {}).reduce(
    (sum, entry) => sum + entry.images.length,
    0,
  );
  const config_image_count = gallery?.config_images.length ?? 0;
  return { jiuguan_image_count, gallery_image_count, config_image_count };
}

/** Classification runs on the raw settings: `LegacySettingsSchema` silently strips unknown keys, which would hide unknown v2 fields from `assert_settings_fully_classified`. */
export async function load_legacy_source(port: LegacySourcePort): Promise<LegacySourceResult> {
  let raw_settings: unknown;
  try {
    raw_settings = await port.read_settings();
  } catch (error) {
    const detail =
      error instanceof Error && error.message.length > 0
        ? error.message.slice(0, 240)
        : "unknown error";
    const fingerprint = sha256_hex(JSON.stringify({ source: "settings", error: detail }));
    return {
      kind: "invalid",
      fingerprint,
      message: `Legacy settings could not be read: ${detail}`,
    };
  }
  if (raw_settings === undefined || raw_settings === null) {
    return { kind: "absent" };
  }

  let raw_gallery: unknown;
  try {
    raw_gallery = await port.read_gallery_database();
  } catch (error) {
    const detail =
      error instanceof Error && error.message.length > 0
        ? error.message.slice(0, 240)
        : "unknown error";
    const fingerprint = sha256_hex(JSON.stringify({ source: "gallery", error: detail }));
    return {
      kind: "invalid",
      fingerprint,
      message: `Legacy gallery database could not be read: ${detail}`,
    };
  }
  let fingerprint: string;
  try {
    fingerprint = sha256_hex(
      JSON.stringify({ settings: raw_settings, gallery: raw_gallery ?? null }),
    );
  } catch (error) {
    const detail =
      error instanceof Error && error.message.length > 0
        ? error.message.slice(0, 240)
        : "unknown error";
    return {
      kind: "invalid",
      fingerprint: sha256_hex(JSON.stringify({ source: "serialization", error: detail })),
      message: `Legacy source could not be fingerprinted: ${detail}`,
    };
  }

  const classification = classify_settings_paths(raw_settings);
  if (classification.unknown.length > 0) {
    return { kind: "unknown_paths", fingerprint, paths: classification.unknown };
  }

  // Without a `mapped` path the source would parse into an empty defaulted profile and complete silently.
  const has_mapped_path = classification.classified.some(
    (entry) => entry.rule.classification === "mapped",
  );
  if (!has_mapped_path) {
    return {
      kind: "invalid",
      fingerprint,
      message:
        "Legacy settings classify to zero mapped v2 data paths; refusing to treat an effectively-empty object as a real v2 install",
    };
  }

  const settings_result = LegacySettingsSchema.safeParse(raw_settings);
  if (!settings_result.success) {
    return {
      kind: "invalid",
      fingerprint,
      message: `Legacy settings failed schema validation: ${describe_zod_issue_paths(settings_result.error)}`,
    };
  }

  let gallery: LegacyGalleryDatabaseFixture | undefined;
  if (raw_gallery !== undefined && raw_gallery !== null) {
    const gallery_result = LegacyGalleryDatabaseFixtureSchema.safeParse(raw_gallery);
    if (!gallery_result.success) {
      return {
        kind: "invalid",
        fingerprint,
        message: `Legacy gallery database failed schema validation: ${describe_zod_issue_paths(gallery_result.error)}`,
      };
    }
    gallery = gallery_result.data;
  }

  const settings = settings_result.data;
  return {
    kind: "present",
    settings,
    gallery,
    fingerprint,
    inventory: compute_inventory(settings, gallery),
  };
}

function base64_to_bytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export function index_legacy_image_bytes(
  settings: LegacySettings,
  gallery: LegacyGalleryDatabaseFixture | undefined,
): ReadonlyMap<string, Uint8Array> {
  const by_sha256 = new Map<string, Uint8Array>();
  const add = (data_base64: string | undefined): void => {
    if (typeof data_base64 !== "string" || data_base64.length === 0) {
      return;
    }
    const bytes = base64_to_bytes(data_base64);
    if (bytes.byteLength === 0) {
      return;
    }
    by_sha256.set(sha256_hex_bytes(bytes), bytes);
  };

  for (const group of Object.values(settings.jiuguanStorage)) {
    for (const image of group.images) {
      add(image.data_base64);
    }
  }
  for (const group of Object.values(gallery?.tupianhuancun_metadata ?? {})) {
    for (const image of group.images) {
      add(image.data_base64 ?? gallery?.tupianhuancun_blobs[image.uuid]);
    }
  }
  for (const entry of gallery?.config_images ?? []) {
    add(entry.data_base64);
  }
  return by_sha256;
}

function bytes_to_base64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

/** Resolves entries without `data_base64` through `resolver`, so a missing host file becomes a blocking `missing_blob` instead of an incomplete gallery. */
export async function resolve_jiuguan_images(
  settings: LegacySettings,
  resolver: LegacyImageResolverPort,
): Promise<LegacySettings> {
  const entries = Object.entries(settings.jiuguanStorage);
  if (entries.length === 0) {
    return settings;
  }

  const resolved_storage: LegacySettings["jiuguanStorage"] = {};
  for (const [tag_key, group] of entries) {
    const images = await Promise.all(
      group.images.map(async (image) => {
        if (typeof image.data_base64 === "string" && image.data_base64.length > 0) {
          return image;
        }
        let bytes: Uint8Array | null;
        try {
          bytes = await resolver.resolve_host_image(image.path);
        } catch {
          bytes = null;
        }
        if (bytes === null || bytes.byteLength === 0) {
          return { ...image, data_base64: undefined };
        }
        return { ...image, data_base64: bytes_to_base64(bytes) };
      }),
    );
    resolved_storage[tag_key] = { ...group, images };
  }
  return { ...settings, jiuguanStorage: resolved_storage };
}
