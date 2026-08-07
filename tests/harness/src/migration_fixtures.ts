import type { SecretCredentialKind } from "@tavern-canvas/v2-migration";
import type { StorageDatabase } from "@tavern-canvas/storage";

import type {
  LegacyImageResolverPort,
  LegacySourcePort,
} from "../../../apps/extension/src/migration/legacy_sources.js";
import type { RunMigrationOptions } from "../../../apps/extension/src/migration/migration_runner.js";
import type { SecretDestinationPort } from "../../../apps/extension/src/migration/secret_transfer.js";
import type {
  ExtensionSettingsHost,
  SettingsScheduler,
} from "../../../apps/extension/src/storage/settings_port.js";
import {
  create_sillytavern_settings,
  type SillyTavernSettings,
} from "../../../apps/extension/src/storage/sillytavern_settings.js";
import galleryFixture from "../../fixtures/migration/v2_gallery_metadata.json" with { type: "json" };
import settingsFixture from "../../fixtures/migration/v2_settings_full.json" with { type: "json" };

export type V2SettingsFixture = typeof settingsFixture;
export type V2GalleryFixture = typeof galleryFixture;

/** A fresh, mutable copy of the fully populated v2 settings fixture — safe for a scenario to edit in place. */
export function clone_settings_fixture(): V2SettingsFixture {
  return structuredClone(settingsFixture);
}

/** A fresh, mutable copy of the v2 gallery database fixture — safe for a scenario to edit in place. */
export function clone_gallery_fixture(): V2GalleryFixture {
  return structuredClone(galleryFixture);
}

/** A scheduler that queues callbacks instead of running them, so a test controls exactly when a settings flush happens. */
export function manual_scheduler(): SettingsScheduler & { run_pending(): Promise<void> } {
  const callbacks: Array<() => void | Promise<void>> = [];
  return {
    schedule(callback) {
      callbacks.push(callback);
    },
    async run_pending() {
      while (callbacks.length > 0) {
        await callbacks.shift()?.();
      }
    },
  };
}

export interface TestSettingsHarness {
  readonly settings: SillyTavernSettings;
  readonly extension_settings: ExtensionSettingsHost;
  readonly flush_count: { value: number };
}

/** A `SillyTavernSettings` instance backed by an in-memory host object, with a manual (never-auto-firing) flush scheduler. */
export function create_test_settings(): TestSettingsHarness {
  const extension_settings: ExtensionSettingsHost = {};
  const flush_count = { value: 0 };
  const settings = create_sillytavern_settings({
    extension_settings,
    save_settings: () => {
      flush_count.value += 1;
    },
    scheduler: manual_scheduler(),
  });
  return { settings, extension_settings, flush_count };
}

/**
 * Wraps the full v2 fixtures (or the caller's overrides) as a `LegacySourcePort`. Passing
 * `settings`/`gallery` explicitly (including `undefined`, to simulate "no legacy install")
 * overrides the corresponding fixture; omitting a key keeps the fixture default.
 */
export function fake_legacy_source(
  overrides: { readonly settings?: unknown; readonly gallery?: unknown } = {},
): LegacySourcePort {
  return {
    read_settings: () =>
      Promise.resolve("settings" in overrides ? overrides.settings : settingsFixture),
    read_gallery_database: () =>
      Promise.resolve("gallery" in overrides ? overrides.gallery : galleryFixture),
  };
}

/** Every fixture image already embeds `data_base64`, so the default resolver never needs to be called. */
export function fake_image_resolver(
  resolve: (path: string) => Uint8Array | null = () => null,
): LegacyImageResolverPort {
  return { resolve_host_image: (path) => Promise.resolve(resolve(path)) };
}

export interface FakeSecretDestination extends SecretDestinationPort {
  readonly write_calls: ReadonlyArray<{
    readonly reference: string;
    readonly plaintext_value: string;
  }>;
}

/** Tracks every `write_secret` call so a scenario can assert a blocked transfer never attempted (and never leaked) a plaintext value. */
export function fake_secret_destination(
  supports: (kind: SecretCredentialKind) => boolean = () => true,
): FakeSecretDestination {
  const written = new Map<string, string>();
  const write_calls: { reference: string; plaintext_value: string }[] = [];
  return {
    supports,
    write_calls,
    write_secret: (reference, plaintext_value) => {
      written.set(reference, plaintext_value);
      write_calls.push({ reference, plaintext_value });
      return Promise.resolve();
    },
    probe_secret: (reference) => Promise.resolve(written.has(reference)),
  };
}

/** Default `run_migration` options wired to the full v2 fixtures, an always-supporting secret destination, and a fixed clock. */
export function migration_options(
  database: StorageDatabase,
  settings: SillyTavernSettings,
  overrides: Partial<RunMigrationOptions> = {},
): RunMigrationOptions {
  return {
    database,
    settings,
    legacy_source: fake_legacy_source(),
    image_resolver: fake_image_resolver(),
    secret_destination: fake_secret_destination(),
    migrated_at: "2026-08-06T00:00:00.000Z",
    ...overrides,
  };
}
