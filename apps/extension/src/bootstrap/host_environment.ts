import type { CapabilityMatrix } from "@tavern-canvas/contracts";

import { chat_surface_mounts } from "../host/chat_surface.js";
import { create_composite_host, type CompositeHostAdapter } from "../host/composite_host.js";
import { create_sillytavern_secret_destination } from "../host/sillytavern_secret_destination.js";
import {
  create_sillytavern_secret_resolver,
  type SecretResolverPort,
} from "../host/sillytavern_secret_resolver.js";
import type { SecretDestinationPort } from "../host/secret_destination.js";
import type {
  ExtensionSettingsHost,
  SillyTavernSettingsHostOptions,
} from "../storage/settings_port.js";

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

/** Separate from `read_secret_destination`: a host can accept writes while refusing to reveal values (`allowKeysExposure`). */
export function read_secret_resolver(globals: unknown): SecretResolverPort | null {
  return create_sillytavern_secret_resolver(read_context(globals), read_property(globals, "fetch"));
}

export function create_host_adapter(
  globals: unknown,
  capabilities: CapabilityMatrix,
): CompositeHostAdapter | null {
  return create_composite_host(
    globals,
    capabilities,
    chat_surface_mounts.active ? chat_surface_mounts : null,
  );
}
