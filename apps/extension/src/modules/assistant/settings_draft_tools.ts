import { TavernCanvasSettingsSchema, type TavernCanvasSettings } from "@tavern-canvas/contracts";
import type { z } from "zod";

interface SettingsFieldDescriptor {
  readonly path: string;
  readonly help: string;
  readonly writable: boolean;
  readonly secret: boolean;
}

/**
 * The entire assistant-browsable settings surface. Every writable, non-secret path here also has
 * an entry in `FIELD_SCHEMAS` below, reusing the real `TavernCanvasSettingsSchema` node for
 * validation so this table can never drift from what the settings capability actually accepts.
 * `schema_version`/`active_namespace` are internal bookkeeping (never writable); `gateway.
 * token_secret_id` is a secret reference -- browsable as a path/help entry, never as a value.
 */
const SETTINGS_SCHEMA: readonly SettingsFieldDescriptor[] = [
  {
    path: "schema_version",
    help: "Internal settings schema version.",
    writable: false,
    secret: false,
  },
  {
    path: "active_namespace",
    help: "Internal storage namespace identifier.",
    writable: false,
    secret: false,
  },
  {
    path: "locale",
    help: "UI display language: auto, zh-CN, or en.",
    writable: true,
    secret: false,
  },
  {
    path: "active_provider_profile_id",
    help: "Default provider profile used for new generations.",
    writable: true,
    secret: false,
  },
  {
    path: "global_concurrency",
    help: "Maximum concurrent generation jobs (1-4).",
    writable: true,
    secret: false,
  },
  {
    path: "auto_generation_enabled",
    help: "Automatically trigger image generation from chat context.",
    writable: true,
    secret: false,
  },
  {
    path: "fallback_generation_enabled",
    help: "Fall back to an alternate provider profile when the primary one fails.",
    writable: true,
    secret: false,
  },
  {
    path: "vocabulary_update_channel",
    help: "Vocabulary update channel: bundled or remote.",
    writable: true,
    secret: false,
  },
  {
    path: "gateway.endpoint",
    help: "Gateway server origin URL, or none for local direct mode.",
    writable: true,
    secret: false,
  },
  {
    path: "gateway.token_secret_id",
    help: "Reference to the Gateway auth token in host secret storage.",
    writable: false,
    secret: true,
  },
  {
    path: "ui.color_mode",
    help: "Shell color theme: system, light, or dark.",
    writable: true,
    secret: false,
  },
  {
    path: "ui.inspector_width",
    help: "Inspector panel width in pixels (240-720).",
    writable: true,
    secret: false,
  },
  {
    path: "ui.inspector_collapsed",
    help: "Whether the inspector panel is collapsed.",
    writable: true,
    secret: false,
  },
  {
    path: "ui.optional_entry_enabled",
    help: "Whether the optional floating entry is shown.",
    writable: true,
    secret: false,
  },
];

const ROOT_SHAPE = TavernCanvasSettingsSchema.shape;
const GATEWAY_SHAPE = ROOT_SHAPE.gateway.shape;
const UI_SHAPE = ROOT_SHAPE.ui.shape;

const FIELD_SCHEMAS: Readonly<Record<string, z.ZodType>> = {
  locale: ROOT_SHAPE.locale,
  active_provider_profile_id: ROOT_SHAPE.active_provider_profile_id,
  global_concurrency: ROOT_SHAPE.global_concurrency,
  auto_generation_enabled: ROOT_SHAPE.auto_generation_enabled,
  fallback_generation_enabled: ROOT_SHAPE.fallback_generation_enabled,
  vocabulary_update_channel: ROOT_SHAPE.vocabulary_update_channel,
  "gateway.endpoint": GATEWAY_SHAPE.endpoint,
  "ui.color_mode": UI_SHAPE.color_mode,
  "ui.inspector_width": UI_SHAPE.inspector_width,
  "ui.inspector_collapsed": UI_SHAPE.inspector_collapsed,
  "ui.optional_entry_enabled": UI_SHAPE.optional_entry_enabled,
};

function find_descriptor(path: string): SettingsFieldDescriptor | undefined {
  return SETTINGS_SCHEMA.find((descriptor) => descriptor.path === path);
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function read_path_value(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((accumulator, segment) => {
    return is_record(accumulator) ? accumulator[segment] : undefined;
  }, source);
}

export interface SettingsSchemaEntry {
  readonly path: string;
  readonly help: string;
  readonly writable: boolean;
}

/** The redacted schema+help browse tool: paths and human-readable descriptions only, secret
 * paths always report `writable: false` and carry no value. */
export function list_settings_schema(): readonly SettingsSchemaEntry[] {
  return SETTINGS_SCHEMA.map(({ path, help, writable, secret }) => ({
    path,
    help,
    writable: writable && !secret,
  }));
}

/** Flat fallback search over the same redacted schema (mirrors legacy `keys_list`/`query_key`). */
export function search_settings_paths(query: string): readonly SettingsSchemaEntry[] {
  const normalized_query = query.trim().toLowerCase();
  const entries = list_settings_schema();
  if (normalized_query.length === 0) {
    return entries;
  }
  return entries.filter(
    (entry) =>
      entry.path.toLowerCase().includes(normalized_query) ||
      entry.help.toLowerCase().includes(normalized_query),
  );
}

export type SettingsPathReadResult =
  | { readonly status: "ok"; readonly path: string; readonly value: unknown }
  | {
      readonly status: "rejected";
      readonly path: string;
      readonly reason: "unknown_path" | "secret_path";
    };

/** Reads one path's current value out of an already-redacted `TavernCanvasSettings` snapshot the
 * caller supplies -- this function never reaches into raw browser storage itself. */
export function read_settings_path(
  settings: TavernCanvasSettings,
  path: string,
): SettingsPathReadResult {
  const descriptor = find_descriptor(path);
  if (descriptor === undefined) {
    return { status: "rejected", path, reason: "unknown_path" };
  }
  if (descriptor.secret) {
    return { status: "rejected", path, reason: "secret_path" };
  }
  return { status: "ok", path, value: read_path_value(settings, path) };
}

export interface SettingsDraftChange {
  readonly path: string;
  readonly from: unknown;
  readonly to: unknown;
}

export interface SettingsDraftDiff {
  readonly changes: readonly SettingsDraftChange[];
}

export type SettingsDraftRejectionReason = "unknown_path" | "secret_path" | "invalid_value";

export interface SettingsDraftRejection {
  readonly path: string;
  readonly reason: SettingsDraftRejectionReason;
}

export type CreateSettingsDraftResult =
  | { readonly status: "ok"; readonly draft: SettingsDraftDiff }
  | { readonly status: "rejected"; readonly rejections: readonly SettingsDraftRejection[] };

/**
 * The assistant's only settings-write surface: turns a proposed change set into a typed diff
 * against `current`, or a typed rejection list -- it never calls anything that persists. Every
 * unknown path, every secret/non-writable path, and every value that fails the field's real zod
 * schema is rejected; a single bad entry rejects the whole draft rather than silently applying
 * the rest.
 */
export function create_settings_draft(
  current: TavernCanvasSettings,
  proposed_changes: Readonly<Record<string, unknown>>,
): CreateSettingsDraftResult {
  const rejections: SettingsDraftRejection[] = [];
  const changes: SettingsDraftChange[] = [];

  for (const [path, to] of Object.entries(proposed_changes)) {
    const descriptor = find_descriptor(path);
    if (descriptor === undefined) {
      rejections.push({ path, reason: "unknown_path" });
      continue;
    }
    if (descriptor.secret || !descriptor.writable) {
      rejections.push({ path, reason: "secret_path" });
      continue;
    }
    const schema = FIELD_SCHEMAS[path];
    if (schema === undefined || !schema.safeParse(to).success) {
      rejections.push({ path, reason: "invalid_value" });
      continue;
    }
    changes.push({ path, from: read_path_value(current, path), to });
  }

  if (rejections.length > 0) {
    return { status: "rejected", rejections };
  }
  return { status: "ok", draft: { changes } };
}

export interface SettingsUpdatePort {
  update(partial: Partial<TavernCanvasSettings>): Promise<TavernCanvasSettings>;
}

function build_partial_update(
  draft: SettingsDraftDiff,
  current: TavernCanvasSettings,
): Partial<TavernCanvasSettings> {
  const partial: Record<string, unknown> = {};
  let gateway_override: Record<string, unknown> | null = null;
  let ui_override: Record<string, unknown> | null = null;

  for (const { path, to } of draft.changes) {
    const [root, ...rest] = path.split(".");
    const leaf = rest.join(".");
    if (root === "gateway" && leaf.length > 0) {
      gateway_override ??= { ...current.gateway };
      gateway_override[leaf] = to;
    } else if (root === "ui" && leaf.length > 0) {
      ui_override ??= { ...current.ui };
      ui_override[leaf] = to;
    } else if (root !== undefined) {
      partial[root] = to;
    }
  }

  if (gateway_override !== null) {
    partial.gateway = gateway_override;
  }
  if (ui_override !== null) {
    partial.ui = ui_override;
  }
  return partial;
}

/**
 * The ONLY function in this module that may reach the real settings capability, and it takes an
 * already-approved `SettingsDraftDiff` -- never proposed_changes, never a path string. The
 * assistant's own tool dispatcher must never hold a reference to `settings`; only the UI's
 * explicit Review-then-Apply action wires this call.
 */
export async function apply_settings_draft(
  draft: SettingsDraftDiff,
  current: TavernCanvasSettings,
  settings: SettingsUpdatePort,
): Promise<TavernCanvasSettings> {
  return settings.update(build_partial_update(draft, current));
}

export const ASSISTANT_UI_ACTIONS = [
  "open_settings",
  "open_diagnostics",
  "open_gallery",
  "open_prompt",
  "open_assets",
  "open_workbench",
] as const;

export type AssistantUiAction = (typeof ASSISTANT_UI_ACTIONS)[number];

/**
 * Deliberately small, fixed allowlist replacing legacy's ~30-selector `UIActionRegistry`
 * (utils/configHelper/configBrowseAPI.js) and its raw chat-input read/write bridge
 * (utils/aiSettingsBridge.js `tavern_input`/`tavern_read_input`): highlighting a known Studio
 * section is in authority, reading or overwriting arbitrary host DOM/textarea state is not (see
 * feature_matrix.md's `assistant.tavern_input_bridge` row).
 */
export function is_known_ui_action(action: string): action is AssistantUiAction {
  return (ASSISTANT_UI_ACTIONS as readonly string[]).includes(action);
}

export interface DiagnosticsCodesView {
  readonly codes: readonly string[];
}

/** Diagnostics codes only -- never message/prompt content, matching `TaskTimelineEntry`'s own
 * redaction contract (packages: this reads whatever redacted view the caller already has). */
export function list_diagnostics_codes(
  timeline: readonly { readonly error_code: string | null }[],
): DiagnosticsCodesView {
  const codes = [
    ...new Set(timeline.map((entry) => entry.error_code).filter((code) => code !== null)),
  ];
  return { codes };
}

export interface WorkflowMetadataView {
  readonly id: string;
  readonly display_name: string;
  readonly updated_at: string;
}

/** Workflow identity/bookkeeping only -- the graph payload itself (or any other field a real
 * `AssetRecordSummary`-shaped source carries) never crosses this tool. */
export function list_workflow_metadata(
  records: readonly {
    readonly id: string;
    readonly display_name: string;
    readonly updated_at: string;
    readonly [extra_field: string]: unknown;
  }[],
): readonly WorkflowMetadataView[] {
  return records.map(({ id, display_name, updated_at }) => ({ id, display_name, updated_at }));
}
