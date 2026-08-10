import type { CapabilityMatrix } from "@tavern-canvas/contracts";

import { create_composite_host, type CompositeHostAdapter } from "../host/composite_host.js";
import { create_sillytavern_secret_destination } from "../host/sillytavern_secret_destination.js";
import {
  create_sillytavern_secret_resolver,
  type SecretResolverPort,
} from "../host/sillytavern_secret_resolver.js";
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

function read_string(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

async function read_response_bytes(value: unknown): Promise<Uint8Array | null> {
  const array_buffer = read_property(value, "arrayBuffer");
  if (typeof array_buffer !== "function") {
    return null;
  }
  try {
    const read_array_buffer = array_buffer as (this: unknown) => Promise<unknown>;
    const result = await read_array_buffer.call(value);
    if (Object.prototype.toString.call(result) === "[object ArrayBuffer]") {
      return new Uint8Array((result as ArrayBuffer).slice(0));
    }
    if (ArrayBuffer.isView(result)) {
      return new Uint8Array(
        result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength),
      );
    }
  } catch {
    return null;
  }
  return null;
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
 * The read half of host secret storage, needed only by a direct browser-to-vendor call. Separate
 * from `read_secret_destination` because a host can accept writes while refusing to reveal values
 * (SillyTavern's `allowKeysExposure`), and that difference decides whether the direct transport is
 * usable at all.
 */
export function read_secret_resolver(globals: unknown): SecretResolverPort | null {
  return create_sillytavern_secret_resolver(read_context(globals), read_property(globals, "fetch"));
}

/**
 * Reads v2 settings and the real v2 IndexedDB gallery stores. The source remains read-only: opening
 * an absent database is aborted before creation, and no legacy store is ever written or deleted.
 */
export function create_legacy_source(globals: unknown): LegacySourcePort | null {
  const settings_host = read_settings_host(globals);
  if (settings_host === null) {
    return null;
  }
  return {
    read_settings: () => Promise.resolve(settings_host.extension_settings[LEGACY_SETTINGS_KEY]),
    read_gallery_database: async () => {
      // A static import would add the migration-only IndexedDB parser to every host startup.
      const { read_legacy_gallery_database } = await import("./legacy_gallery_source.js");
      return read_legacy_gallery_database(globals);
    },
  };
}

function read_location(
  globals: unknown,
): { readonly href: string; readonly origin: string } | null {
  const candidate = read_property(globals, "location") ?? read_property(globalThis, "location");
  const origin = read_string(read_property(candidate, "origin"));
  const href = read_string(
    read_property(candidate, "href"),
    origin.length > 0 && origin !== "null" ? `${origin}/` : "",
  );
  if (href.length === 0 || origin.length === 0 || origin === "null") {
    return null;
  }
  let normalized_origin: string;
  try {
    normalized_origin = new URL(origin).origin;
  } catch {
    return null;
  }
  if (normalized_origin === "null") {
    return null;
  }
  return { href, origin: normalized_origin };
}

function contains_path_traversal(pathname: string): boolean {
  let decoded = pathname;
  for (let pass = 0; pass < 3; pass += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) {
        break;
      }
      decoded = next;
    } catch {
      return true;
    }
  }
  if (decoded.includes("\\") || decoded.includes("\0")) {
    return true;
  }
  return decoded.split("/").some((segment) => segment === "." || segment === "..");
}

function is_image_bytes(bytes: Uint8Array): boolean {
  if (
    bytes.length >= 8 &&
    bytes
      .subarray(0, 8)
      .every((byte, index) => byte === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index])
  ) {
    return true;
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return true;
  }
  if (
    bytes.length >= 6 &&
    ((bytes[0] === 0x47 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x38 &&
      (bytes[4] === 0x37 || bytes[4] === 0x39) &&
      bytes[5] === 0x61) ||
      (bytes[0] === 0x42 && bytes[1] === 0x4d))
  ) {
    return true;
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return true;
  }
  if (
    bytes.length >= 4 &&
    ((bytes[0] === 0x49 && bytes[1] === 0x49 && bytes[2] === 0x2a && bytes[3] === 0x00) ||
      (bytes[0] === 0x4d && bytes[1] === 0x4d && bytes[2] === 0x00 && bytes[3] === 0x2a))
  ) {
    return true;
  }
  if (
    bytes.length >= 12 &&
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70 &&
    ([0x61, 0x76, 0x69, 0x66].every((byte, index) => bytes[8 + index] === byte) ||
      [0x61, 0x76, 0x69, 0x73].every((byte, index) => bytes[8 + index] === byte) ||
      [0x68, 0x65, 0x69, 0x63].every((byte, index) => bytes[8 + index] === byte) ||
      [0x6d, 0x69, 0x66, 0x31].every((byte, index) => bytes[8 + index] === byte))
  ) {
    return true;
  }
  const prefix = new TextDecoder().decode(bytes.subarray(0, 256)).trimStart().toLowerCase();
  return prefix.startsWith("<svg") || (prefix.startsWith("<?xml") && prefix.includes("<svg"));
}

/**
 * Resolves v2 host image paths through the host fetch boundary. URLs must stay on the current
 * origin, contain no traversal segment, and return a non-empty response with actual image bytes.
 */
export function create_legacy_image_resolver(globals: unknown): LegacyImageResolverPort | null {
  const fetch_impl = read_property(globals, "fetch") ?? read_property(globalThis, "fetch");
  const location = read_location(globals);
  if (typeof fetch_impl !== "function" || location === null) {
    return null;
  }
  return {
    async resolve_host_image(path: string): Promise<Uint8Array | null> {
      if (
        typeof path !== "string" ||
        path.trim().length === 0 ||
        path.includes("\\") ||
        contains_path_traversal(path)
      ) {
        return null;
      }
      let base: URL;
      let url: URL;
      try {
        base = new URL(location.href);
        url = new URL(path, base);
      } catch {
        return null;
      }
      if (
        (url.protocol !== "http:" && url.protocol !== "https:") ||
        url.origin !== location.origin ||
        url.username.length > 0 ||
        url.password.length > 0
      ) {
        return null;
      }
      if (contains_path_traversal(url.pathname)) {
        return null;
      }
      const call_fetch = fetch_impl as (
        this: unknown,
        input: string,
        init: { readonly credentials: "same-origin" },
      ) => Promise<unknown>;
      let response: unknown;
      try {
        response = await call_fetch.call(globals, url.href, { credentials: "same-origin" });
      } catch {
        return null;
      }
      if (typeof response !== "object" || response === null) {
        return null;
      }
      const status_value = read_property(response, "status");
      const response_status = typeof status_value === "number" ? status_value : undefined;
      const ok_value = read_property(response, "ok");
      const response_ok =
        response_status === undefined
          ? ok_value === true
          : response_status >= 200 && response_status < 300 && ok_value !== false;
      if (!response_ok) {
        return null;
      }
      const headers = read_property(response, "headers");
      const get_content_type = read_property(headers, "get");
      const content_type =
        typeof get_content_type === "function"
          ? (() => {
              const read_header = get_content_type as (this: unknown, name: string) => unknown;
              return read_string(read_header.call(headers, "content-type"))
                .split(";", 1)[0]
                ?.trim()
                .toLowerCase();
            })()
          : undefined;
      if (
        content_type !== undefined &&
        content_type.length > 0 &&
        !content_type.startsWith("image/")
      ) {
        return null;
      }
      const bytes = await read_response_bytes(response);
      return bytes !== null && bytes.length > 0 && is_image_bytes(bytes) ? bytes : null;
    },
  };
}

export function create_host_adapter(
  globals: unknown,
  capabilities: CapabilityMatrix,
): CompositeHostAdapter | null {
  return create_composite_host(globals, capabilities);
}
