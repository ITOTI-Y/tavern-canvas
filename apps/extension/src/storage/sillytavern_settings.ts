import {
  GatewaySettingsSchema,
  TavernCanvasSettingsSchema,
  TavernCanvasUiSettingsSchema,
  type TavernCanvasSettings,
} from "@tavern-canvas/contracts";
import type { z } from "zod";

import type { SillyTavernSettingsHostOptions } from "./settings_port.js";

export const TAVERN_CANVAS_SETTINGS_KEY = "tavern_canvas" as const;
export const MAX_SETTINGS_SERIALIZED_BYTES = 65_536 as const;

// These v2 categories belong in IndexedDB (business records, image bytes,
// vocabulary data) or are excluded entirely (logs), never in small settings.
// Naming them lets recovery report `disallowed_category` instead of the
// generic `unknown_field`.
const DISALLOWED_SMALL_SETTINGS_CATEGORIES: ReadonlySet<string> = new Set([
  "profiles",
  "workflows",
  "image_data",
  "vocabulary_data",
  "logs",
]);

const TOP_LEVEL_KEYS: ReadonlySet<string> = new Set(Object.keys(TavernCanvasSettingsSchema.shape));
const GATEWAY_KEYS: ReadonlySet<string> = new Set(Object.keys(GatewaySettingsSchema.shape));
const UI_KEYS: ReadonlySet<string> = new Set(Object.keys(TavernCanvasUiSettingsSchema.shape));

export const DEFAULT_TAVERN_CANVAS_SETTINGS = {
  schema_version: 1,
  active_namespace: "primary",
  locale: "auto",
  active_provider_profile_id: null,
  global_concurrency: 4,
  auto_generation_enabled: true,
  fallback_generation_enabled: true,
  vocabulary_update_channel: "bundled",
  gateway: {
    endpoint: null,
    token_secret_id: null,
    http_acknowledgments: {},
  },
  ui: {
    color_mode: "system",
    inspector_width: 320,
    inspector_collapsed: false,
    optional_entry_enabled: false,
  },
} satisfies TavernCanvasSettings;

export type SettingsDiagnosticCode =
  "invalid_value" | "unknown_field" | "disallowed_category" | "serialized_size_exceeded";

export interface SettingsDiagnostic {
  path: string;
  code: SettingsDiagnosticCode;
}

export interface SillyTavernSettings {
  readonly diagnostics: readonly SettingsDiagnostic[];
  get_settings(): TavernCanvasSettings;
  update_settings(partial: Partial<TavernCanvasSettings>): TavernCanvasSettings;
  replace_settings(candidate: TavernCanvasSettings): TavernCanvasSettings;
  flush(): Promise<void>;
  stop(): Promise<void>;
}

function is_plain_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clone_default(): TavernCanvasSettings {
  return structuredClone(DEFAULT_TAVERN_CANVAS_SETTINGS);
}

// JSON.stringify's lib types claim it always returns string, but it returns
// undefined for functions, symbols, and undefined itself; this signature
// carries the accurate contract across the call boundary.
function stringify(value: unknown): string | undefined {
  return JSON.stringify(value);
}

function measure_serialized_bytes(raw: unknown): number | null {
  try {
    const serialized = stringify(raw);
    return serialized === undefined ? 0 : new TextEncoder().encode(serialized).length;
  } catch {
    return null;
  }
}

function report_unknown_fields(
  record: Record<string, unknown>,
  known_keys: ReadonlySet<string>,
  path_prefix: string,
  diagnostics: SettingsDiagnostic[],
): void {
  for (const key of Object.keys(record)) {
    if (known_keys.has(key)) {
      continue;
    }
    const path = path_prefix === "" ? key : `${path_prefix}.${key}`;
    const code: SettingsDiagnosticCode = DISALLOWED_SMALL_SETTINGS_CATEGORIES.has(key)
      ? "disallowed_category"
      : "unknown_field";
    diagnostics.push({ path, code });
  }
}

function recover_field<T>(
  schema: z.ZodType<T>,
  value: unknown,
  fallback: T,
  path: string,
  diagnostics: SettingsDiagnostic[],
): T {
  const parsed = schema.safeParse(value);
  if (parsed.success) {
    return parsed.data;
  }
  diagnostics.push({ path, code: "invalid_value" });
  return fallback;
}

function recover_http_acknowledgments(
  raw: unknown,
  path: string,
  diagnostics: SettingsDiagnostic[],
): Record<string, string> {
  if (!is_plain_record(raw)) {
    if (raw !== undefined) {
      diagnostics.push({ path, code: "invalid_value" });
    }
    return {};
  }

  const { keyType: key_schema, valueType: value_schema } =
    GatewaySettingsSchema.shape.http_acknowledgments;
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    const key_result = key_schema.safeParse(key);
    const value_result = value_schema.safeParse(value);
    if (key_result.success && value_result.success) {
      result[key_result.data] = value_result.data;
    } else {
      diagnostics.push({ path: `${path}.${key}`, code: "invalid_value" });
    }
  }
  return result;
}

function recover_gateway(
  raw: unknown,
  diagnostics: SettingsDiagnostic[],
): TavernCanvasSettings["gateway"] {
  const default_gateway = DEFAULT_TAVERN_CANVAS_SETTINGS.gateway;
  if (!is_plain_record(raw)) {
    if (raw !== undefined) {
      diagnostics.push({ path: "gateway", code: "invalid_value" });
    }
    return { ...default_gateway };
  }

  report_unknown_fields(raw, GATEWAY_KEYS, "gateway", diagnostics);

  return {
    endpoint: recover_field(
      GatewaySettingsSchema.shape.endpoint,
      raw.endpoint,
      default_gateway.endpoint,
      "gateway.endpoint",
      diagnostics,
    ),
    token_secret_id: recover_field(
      GatewaySettingsSchema.shape.token_secret_id,
      raw.token_secret_id,
      default_gateway.token_secret_id,
      "gateway.token_secret_id",
      diagnostics,
    ),
    http_acknowledgments: recover_http_acknowledgments(
      raw.http_acknowledgments,
      "gateway.http_acknowledgments",
      diagnostics,
    ),
  };
}

function recover_ui(raw: unknown, diagnostics: SettingsDiagnostic[]): TavernCanvasSettings["ui"] {
  const default_ui = DEFAULT_TAVERN_CANVAS_SETTINGS.ui;
  if (!is_plain_record(raw)) {
    if (raw !== undefined) {
      diagnostics.push({ path: "ui", code: "invalid_value" });
    }
    return { ...default_ui };
  }

  report_unknown_fields(raw, UI_KEYS, "ui", diagnostics);

  return {
    color_mode: recover_field(
      TavernCanvasUiSettingsSchema.shape.color_mode,
      raw.color_mode,
      default_ui.color_mode,
      "ui.color_mode",
      diagnostics,
    ),
    inspector_width: recover_field(
      TavernCanvasUiSettingsSchema.shape.inspector_width,
      raw.inspector_width,
      default_ui.inspector_width,
      "ui.inspector_width",
      diagnostics,
    ),
    inspector_collapsed: recover_field(
      TavernCanvasUiSettingsSchema.shape.inspector_collapsed,
      raw.inspector_collapsed,
      default_ui.inspector_collapsed,
      "ui.inspector_collapsed",
      diagnostics,
    ),
    optional_entry_enabled: recover_field(
      TavernCanvasUiSettingsSchema.shape.optional_entry_enabled,
      raw.optional_entry_enabled,
      default_ui.optional_entry_enabled,
      "ui.optional_entry_enabled",
      diagnostics,
    ),
  };
}

function recover_settings(raw: unknown, diagnostics: SettingsDiagnostic[]): TavernCanvasSettings {
  if (raw === undefined) {
    return clone_default();
  }

  const serialized_bytes = measure_serialized_bytes(raw);
  if (serialized_bytes === null || serialized_bytes > MAX_SETTINGS_SERIALIZED_BYTES) {
    diagnostics.push({
      path: TAVERN_CANVAS_SETTINGS_KEY,
      code: serialized_bytes === null ? "invalid_value" : "serialized_size_exceeded",
    });
    return clone_default();
  }

  if (!is_plain_record(raw)) {
    diagnostics.push({ path: TAVERN_CANVAS_SETTINGS_KEY, code: "invalid_value" });
    return clone_default();
  }

  report_unknown_fields(raw, TOP_LEVEL_KEYS, "", diagnostics);
  const defaults = DEFAULT_TAVERN_CANVAS_SETTINGS;

  return {
    schema_version: recover_field(
      TavernCanvasSettingsSchema.shape.schema_version,
      raw.schema_version,
      defaults.schema_version,
      "schema_version",
      diagnostics,
    ),
    active_namespace: recover_field(
      TavernCanvasSettingsSchema.shape.active_namespace,
      raw.active_namespace,
      defaults.active_namespace,
      "active_namespace",
      diagnostics,
    ),
    locale: recover_field(
      TavernCanvasSettingsSchema.shape.locale,
      raw.locale,
      defaults.locale,
      "locale",
      diagnostics,
    ),
    active_provider_profile_id: recover_field(
      TavernCanvasSettingsSchema.shape.active_provider_profile_id,
      raw.active_provider_profile_id,
      defaults.active_provider_profile_id,
      "active_provider_profile_id",
      diagnostics,
    ),
    global_concurrency: recover_field(
      TavernCanvasSettingsSchema.shape.global_concurrency,
      raw.global_concurrency,
      defaults.global_concurrency,
      "global_concurrency",
      diagnostics,
    ),
    auto_generation_enabled: recover_field(
      TavernCanvasSettingsSchema.shape.auto_generation_enabled,
      raw.auto_generation_enabled,
      defaults.auto_generation_enabled,
      "auto_generation_enabled",
      diagnostics,
    ),
    fallback_generation_enabled: recover_field(
      TavernCanvasSettingsSchema.shape.fallback_generation_enabled,
      raw.fallback_generation_enabled,
      defaults.fallback_generation_enabled,
      "fallback_generation_enabled",
      diagnostics,
    ),
    vocabulary_update_channel: recover_field(
      TavernCanvasSettingsSchema.shape.vocabulary_update_channel,
      raw.vocabulary_update_channel,
      defaults.vocabulary_update_channel,
      "vocabulary_update_channel",
      diagnostics,
    ),
    gateway: recover_gateway(raw.gateway, diagnostics),
    ui: recover_ui(raw.ui, diagnostics),
  };
}

/**
 * Owns `extension_settings.tavern_canvas`. Every write validates the
 * candidate, replaces the settings object immutably in memory and on the
 * host, then schedules one debounced host save; same-task writes coalesce
 * into that single save. `flush()`/`stop()` bypass the scheduler and persist
 * immediately.
 */
export function create_sillytavern_settings(
  host: SillyTavernSettingsHostOptions,
): SillyTavernSettings {
  const { extension_settings, save_settings, scheduler } = host;
  const diagnostics: SettingsDiagnostic[] = [];
  let current = recover_settings(extension_settings[TAVERN_CANVAS_SETTINGS_KEY], diagnostics);
  extension_settings[TAVERN_CANVAS_SETTINGS_KEY] = current;

  let dirty = false;
  let flush_scheduled = false;

  async function flush(): Promise<void> {
    if (!dirty) {
      return;
    }
    dirty = false;
    await save_settings();
  }

  function schedule_flush(): void {
    if (flush_scheduled) {
      return;
    }
    flush_scheduled = true;
    scheduler.schedule(async () => {
      flush_scheduled = false;
      await flush();
    });
  }

  function apply(next: TavernCanvasSettings): TavernCanvasSettings {
    current = next;
    extension_settings[TAVERN_CANVAS_SETTINGS_KEY] = current;
    dirty = true;
    schedule_flush();
    return current;
  }

  return {
    diagnostics,
    get_settings() {
      return current;
    },
    update_settings(partial) {
      const candidate = { ...current, ...partial };
      return apply(TavernCanvasSettingsSchema.parse(candidate));
    },
    replace_settings(candidate) {
      return apply(TavernCanvasSettingsSchema.parse(candidate));
    },
    flush,
    async stop() {
      await flush();
    },
  };
}
