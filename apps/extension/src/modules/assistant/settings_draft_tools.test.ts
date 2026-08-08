import type { TavernCanvasSettings } from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import {
  apply_settings_draft,
  create_settings_draft,
  is_known_ui_action,
  list_diagnostics_codes,
  list_settings_schema,
  list_workflow_metadata,
  read_settings_path,
  search_settings_paths,
  type SettingsUpdatePort,
} from "./settings_draft_tools.js";

function base_settings(): TavernCanvasSettings {
  return {
    schema_version: 1,
    active_namespace: "ns-1",
    locale: "auto",
    active_provider_profile_id: null,
    global_concurrency: 2,
    auto_generation_enabled: false,
    fallback_generation_enabled: false,
    gateway: { endpoint: null, token_secret_id: null, http_acknowledgments: {} },
    ui: {
      color_mode: "system",
      inspector_width: 320,
      inspector_collapsed: false,
      optional_entry_enabled: true,
    },
  };
}

describe("list_settings_schema", () => {
  it("marks the secret gateway token path as never writable and carries no value", () => {
    const entries = list_settings_schema();
    const token_entry = entries.find((entry) => entry.path === "gateway.token_secret_id");

    expect(token_entry?.writable).toBe(false);
    expect(entries.every((entry) => !("value" in entry))).toBe(true);
  });

  it("marks ordinary user-facing fields as writable with help text", () => {
    const entries = list_settings_schema();
    const locale_entry = entries.find((entry) => entry.path === "locale");

    expect(locale_entry).toMatchObject({ writable: true });
    expect(locale_entry?.help.length).toBeGreaterThan(0);
  });
});

describe("search_settings_paths", () => {
  it("finds fields by path or help substring", () => {
    expect(search_settings_paths("inspector").map((entry) => entry.path)).toEqual([
      "ui.inspector_width",
      "ui.inspector_collapsed",
    ]);
  });

  it("returns the full schema for an empty query", () => {
    expect(search_settings_paths("")).toEqual(list_settings_schema());
  });
});

describe("read_settings_path", () => {
  it("reads an ordinary field's current value", () => {
    const result = read_settings_path(base_settings(), "ui.inspector_width");

    expect(result).toEqual({ status: "ok", path: "ui.inspector_width", value: 320 });
  });

  it("rejects a secret path without ever returning its value", () => {
    const settings = {
      ...base_settings(),
      gateway: { ...base_settings().gateway, token_secret_id: "tc:ns:gw" },
    };

    const result = read_settings_path(settings, "gateway.token_secret_id");

    expect(result).toEqual({
      status: "rejected",
      path: "gateway.token_secret_id",
      reason: "secret_path",
    });
  });

  it("rejects an unknown path", () => {
    const result = read_settings_path(base_settings(), "gateway.__proto__");

    expect(result).toEqual({
      status: "rejected",
      path: "gateway.__proto__",
      reason: "unknown_path",
    });
  });
});

describe("create_settings_draft", () => {
  it("builds a typed diff for a valid top-level change, without applying anything", () => {
    const result = create_settings_draft(base_settings(), { locale: "zh-CN" });

    expect(result).toEqual({
      status: "ok",
      draft: { changes: [{ path: "locale", from: "auto", to: "zh-CN" }] },
    });
  });

  it("builds a typed diff for a valid nested change", () => {
    const result = create_settings_draft(base_settings(), { "ui.color_mode": "dark" });

    expect(result).toEqual({
      status: "ok",
      draft: { changes: [{ path: "ui.color_mode", from: "system", to: "dark" }] },
    });
  });

  it("rejects an unknown path", () => {
    const result = create_settings_draft(base_settings(), { not_a_real_path: 1 });

    expect(result).toEqual({
      status: "rejected",
      rejections: [{ path: "not_a_real_path", reason: "unknown_path" }],
    });
  });

  it("rejects a write to a secret path", () => {
    const result = create_settings_draft(base_settings(), {
      "gateway.token_secret_id": "tc:ns:evil",
    });

    expect(result).toEqual({
      status: "rejected",
      rejections: [{ path: "gateway.token_secret_id", reason: "secret_path" }],
    });
  });

  it("rejects a write to a non-writable internal path", () => {
    const result = create_settings_draft(base_settings(), { active_namespace: "attacker-ns" });

    expect(result).toEqual({
      status: "rejected",
      rejections: [{ path: "active_namespace", reason: "secret_path" }],
    });
  });

  it("rejects an out-of-range value against the field's real schema", () => {
    const result = create_settings_draft(base_settings(), { global_concurrency: 99 });

    expect(result).toEqual({
      status: "rejected",
      rejections: [{ path: "global_concurrency", reason: "invalid_value" }],
    });
  });

  it("rejects an invalid enum value", () => {
    const result = create_settings_draft(base_settings(), { locale: "fr-FR" });

    expect(result).toEqual({
      status: "rejected",
      rejections: [{ path: "locale", reason: "invalid_value" }],
    });
  });

  it("rejects the entire draft (not just the bad entry) when one of several changes is invalid", () => {
    const result = create_settings_draft(base_settings(), {
      locale: "zh-CN",
      global_concurrency: 999,
    });

    expect(result.status).toBe("rejected");
    if (result.status === "rejected") {
      expect(result.rejections).toEqual([{ path: "global_concurrency", reason: "invalid_value" }]);
    }
  });
});

describe("apply_settings_draft", () => {
  it("is the only path that reaches the settings update port, merging nested fields against current settings", async () => {
    const current = base_settings();
    const draft_result = create_settings_draft(current, {
      "gateway.endpoint": "https://gw.example.com",
    });
    expect(draft_result.status).toBe("ok");
    const update = vi.fn<SettingsUpdatePort["update"]>(
      async (partial) => ({ ...current, ...partial }) as TavernCanvasSettings,
    );
    const port: SettingsUpdatePort = { update };

    if (draft_result.status === "ok") {
      await apply_settings_draft(draft_result.draft, current, port);
    }

    expect(update).toHaveBeenCalledWith({
      gateway: {
        endpoint: "https://gw.example.com",
        token_secret_id: null,
        http_acknowledgments: {},
      },
    });
  });

  it("hidden auto-execute is structurally impossible: create_settings_draft has no update-port parameter to smuggle a call through", () => {
    expect(create_settings_draft.length).toBe(2);
  });
});

describe("is_known_ui_action", () => {
  it("accepts the fixed allowlist of Studio section actions", () => {
    expect(is_known_ui_action("open_settings")).toBe(true);
    expect(is_known_ui_action("open_gallery")).toBe(true);
  });

  it("rejects anything outside the fixed allowlist -- no raw DOM/textarea bridge", () => {
    expect(is_known_ui_action("tavern_read_input")).toBe(false);
    expect(is_known_ui_action("click:#any-selector")).toBe(false);
  });
});

describe("list_diagnostics_codes", () => {
  it("returns only distinct error codes, dropping nulls", () => {
    const view = list_diagnostics_codes([
      { error_code: "provider_timeout" },
      { error_code: null },
      { error_code: "provider_timeout" },
      { error_code: "quota_exceeded" },
    ]);

    expect(view.codes).toEqual(["provider_timeout", "quota_exceeded"]);
  });
});

describe("list_workflow_metadata", () => {
  it("drops the workflow payload, keeping only identity fields", () => {
    const view = list_workflow_metadata([
      {
        id: "wf-1",
        display_name: "Portrait pipeline",
        updated_at: "2026-08-07T00:00:00.000Z",
        payload: { nodes: [{ secret: "should-never-appear" }] },
      },
    ]);

    expect(view).toEqual([
      { id: "wf-1", display_name: "Portrait pipeline", updated_at: "2026-08-07T00:00:00.000Z" },
    ]);
    expect(JSON.stringify(view)).not.toContain("should-never-appear");
  });
});
