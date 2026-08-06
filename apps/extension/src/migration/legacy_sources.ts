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
 * Injection seam for the v2 data this migration reads. `read_settings`
 * mirrors `extension_settings["st-chatu8"]`; `read_gallery_database` mirrors
 * the "chatu8_gallery"/"tupian" IndexedDB stores. Both return `undefined`
 * when the source is absent (a real host adapter resolves these against the
 * actual v2 storage locations; this module only validates and inventories
 * what comes back). Legacy sources are read-only: nothing in this module, or
 * anything that consumes it, may write back to a v2 location.
 */
export interface LegacySourcePort {
  read_settings(): Promise<unknown>;
  read_gallery_database(): Promise<unknown>;
}

/** Fetches one host-persisted legacy image by its v2 file path. `null` means the file could not be resolved. */
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

/**
 * Reads and validates the raw v2 source, computing a stable content
 * fingerprint up front (used to derive the staging namespace deterministically,
 * so re-running the migration against unchanged v2 data always resumes the
 * same journal — even when that source turns out to be invalid or
 * unclassifiable) and an inventory used later to detect data loss
 * (`missing_blob`).
 *
 * Classification runs against the *raw* settings object, before
 * `LegacySettingsSchema.safeParse`: that schema is a plain `z.object`, which
 * silently strips unrecognized keys rather than rejecting them, so
 * classifying the already-parsed value would make a genuinely unknown v2
 * field invisible to `assert_settings_fully_classified`'s "don't silently
 * drop it" guarantee.
 */
export async function load_legacy_source(port: LegacySourcePort): Promise<LegacySourceResult> {
  const raw_settings = await port.read_settings();
  if (raw_settings === undefined || raw_settings === null) {
    return { kind: "absent" };
  }

  const raw_gallery = await port.read_gallery_database();
  const fingerprint = sha256_hex(
    JSON.stringify({ settings: raw_settings, gallery: raw_gallery ?? null }),
  );

  const classification = classify_settings_paths(raw_settings);
  if (classification.unknown.length > 0) {
    return { kind: "unknown_paths", fingerprint, paths: classification.unknown };
  }

  // Plausibility guard: every field in `LegacySettingsSchema` now has a
  // default (I5), so `{}` — or any object whose own paths are all
  // `intentionally_obsolete`/`deferred_secret_transfer`, never `mapped` —
  // would otherwise parse into a fully-defaulted, effectively-empty
  // settings object and complete migration silently, switching the user to
  // a blank v3 profile with no error and no signal. A real v2 source always
  // classifies at least one own path as `mapped` (business data); zero
  // means this source claims to exist but carries nothing real, and must
  // fail loudly instead of "completing".
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

/**
 * Every image byte a converter can hash, indexed by that same sha256.
 * Converters (Task 5, pure, no I/O) only ever emit an `ImageRecord.sha256`
 * computed from bytes resolved this same way, so this index and a
 * converter's declared hash always agree — the migration runner uses it to
 * get the raw bytes back for writing `image_blobs`.
 */
export function index_legacy_image_bytes(
  settings: LegacySettings,
  gallery: LegacyGalleryDatabaseFixture | undefined,
): ReadonlyMap<string, Uint8Array> {
  const by_sha256 = new Map<string, Uint8Array>();
  const add = (data_base64: string | undefined): void => {
    if (data_base64 === undefined) {
      return;
    }
    const bytes = base64_to_bytes(data_base64);
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

/**
 * `jiuguanStorage` entries reference host filesystem paths, not embedded
 * bytes (unlike `tupianhuancun`, whose fixture already carries resolved
 * base64/blob data). Resolves every entry lacking `data_base64` through
 * `resolver` before the converters run, so a missing host file surfaces as
 * `gallery_converter`'s "no resolved bytes" warning — which
 * `migration_runner` escalates to a blocking `missing_blob` failure — instead
 * of silently producing an incomplete gallery.
 */
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
        if (image.data_base64 !== undefined) {
          return image;
        }
        const bytes = await resolver.resolve_host_image(image.path);
        return bytes === null ? image : { ...image, data_base64: bytes_to_base64(bytes) };
      }),
    );
    resolved_storage[tag_key] = { ...group, images };
  }
  return { ...settings, jiuguanStorage: resolved_storage };
}
