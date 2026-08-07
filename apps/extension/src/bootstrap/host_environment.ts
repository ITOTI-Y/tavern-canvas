import type { CapabilityMatrix } from "@tavern-canvas/contracts";

import { create_composite_host, type CompositeHostAdapter } from "../host/composite_host.js";
import { create_sillytavern_secret_destination } from "../host/sillytavern_secret_destination.js";
import type { LegacyImageResolverPort, LegacySourcePort } from "../migration/legacy_sources.js";
import type { SecretDestinationPort } from "../migration/secret_transfer.js";
import type {
  ExtensionSettingsHost,
  SillyTavernSettingsHostOptions,
} from "../storage/settings_port.js";

/** Where v2 kept its settings inside SillyTavern's shared `extension_settings` object. */
const LEGACY_SETTINGS_KEY = "st-chatu8";

function read_property(container: unknown, property_name: string): unknown {
  if ((typeof container !== "object" || container === null) && typeof container !== "function") {
    return undefined;
  }
  try {
    return Reflect.get(container, property_name);
  } catch {
    return undefined;
  }
}

function read_context(globals: unknown): unknown {
  const sillytavern = read_property(globals, "SillyTavern");
  const get_context = read_property(sillytavern, "getContext");
  if (typeof get_context !== "function") {
    return undefined;
  }
  try {
    return Reflect.apply(get_context, sillytavern, []);
  } catch {
    return undefined;
  }
}

/**
 * `SillyTavernContextSurface` deliberately types only what the host adapters call. Settings
 * persistence needs two further well-known context members, read defensively here so their absence
 * degrades the settings capability instead of failing the probe every other capability depends on.
 */
export function read_settings_host(globals: unknown): SillyTavernSettingsHostOptions | null {
  const context = read_context(globals);
  const extension_settings = read_property(context, "extensionSettings");
  const save_settings = read_property(context, "saveSettingsDebounced");
  if (typeof extension_settings !== "object" || extension_settings === null) {
    return null;
  }
  if (typeof save_settings !== "function") {
    return null;
  }
  return {
    extension_settings: extension_settings as ExtensionSettingsHost,
    save_settings: () => {
      Reflect.apply(save_settings, context, []);
    },
    scheduler: {
      schedule(callback) {
        queueMicrotask(() => {
          void callback();
        });
      },
    },
  };
}

export function read_secret_destination(globals: unknown): SecretDestinationPort | null {
  return create_sillytavern_secret_destination(
    read_context(globals),
    read_property(globals, "fetch"),
  );
}

/**
 * Reads v2's settings from the same `extension_settings` object v2 itself wrote to. The gallery
 * database half returns `undefined`: v2's IndexedDB gallery layout has no reader in this codebase,
 * and `load_legacy_source` treats an absent source as absent rather than as an error.
 */
export function create_legacy_source(globals: unknown): LegacySourcePort | null {
  const settings_host = read_settings_host(globals);
  if (settings_host === null) {
    return null;
  }
  return {
    read_settings: () => Promise.resolve(settings_host.extension_settings[LEGACY_SETTINGS_KEY]),
    read_gallery_database: () => Promise.resolve(undefined),
  };
}

export const UNRESOLVED_LEGACY_IMAGES: LegacyImageResolverPort = {
  resolve_host_image: () => Promise.resolve(null),
};

export function create_host_adapter(
  globals: unknown,
  capabilities: CapabilityMatrix,
): CompositeHostAdapter | null {
  return create_composite_host(globals, capabilities);
}
