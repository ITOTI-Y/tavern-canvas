import { describe, expect, it } from "vitest";

import type { TavernCanvasSettings } from "@tavern-canvas/contracts";

import {
  DEFAULT_TAVERN_CANVAS_SETTINGS,
  MAX_SETTINGS_SERIALIZED_BYTES,
  create_sillytavern_settings,
} from "./sillytavern_settings.js";
import type { ExtensionSettingsHost, SettingsScheduler } from "./settings_port.js";

function settings(overrides: Partial<TavernCanvasSettings> = {}): TavernCanvasSettings {
  return {
    ...DEFAULT_TAVERN_CANVAS_SETTINGS,
    ...overrides,
    ui: {
      ...DEFAULT_TAVERN_CANVAS_SETTINGS.ui,
      ...(overrides.ui ?? {}),
    },
  };
}

function manual_scheduler(): SettingsScheduler & {
  pending_count(): number;
  run_pending(): Promise<void>;
} {
  const callbacks: Array<() => void | Promise<void>> = [];
  return {
    schedule(callback) {
      callbacks.push(callback);
    },
    pending_count() {
      return callbacks.length;
    },
    async run_pending() {
      while (callbacks.length > 0) {
        await callbacks.shift()?.();
      }
    },
  };
}

function create_host(value?: unknown): {
  extension_settings: ExtensionSettingsHost;
  scheduler: SettingsScheduler & { pending_count(): number; run_pending(): Promise<void> };
  save_settings: () => void;
  saves: { count: number };
} {
  const extension_settings: ExtensionSettingsHost = {};
  if (value !== undefined) {
    extension_settings.tavern_canvas = value;
  }
  const scheduler = manual_scheduler();
  const saves = { count: 0 };
  return {
    extension_settings,
    scheduler,
    save_settings() {
      saves.count += 1;
    },
    saves,
  };
}

describe("SillyTavern settings adapter", () => {
  it("initializes missing settings with the versioned primary defaults under the v3 host key", () => {
    const host = create_host();
    const adapter = create_sillytavern_settings(host);

    expect(adapter.get_settings()).toEqual(DEFAULT_TAVERN_CANVAS_SETTINGS);
    expect(adapter.get_settings().schema_version).toBe(1);
    expect(adapter.get_settings().active_namespace).toBe("primary");
    expect(host.extension_settings.tavern_canvas).toEqual(DEFAULT_TAVERN_CANVAS_SETTINGS);
    expect(host.extension_settings["st-chatu8"]).toBeUndefined();
  });

  it("accepts each supported locale and rejects unsupported locales before replacing settings", () => {
    const host = create_host();
    const adapter = create_sillytavern_settings(host);

    for (const locale of ["auto", "zh-CN", "en"] as const) {
      expect(adapter.update_settings({ locale }).locale).toBe(locale);
    }

    const prior = adapter.get_settings();
    expect(() => adapter.update_settings({ locale: "fr" as never })).toThrow();
    expect(adapter.get_settings()).toBe(prior);
  });
  it("persists the selected credential storage backend and rejects unknown modes", () => {
    const host = create_host();
    const adapter = create_sillytavern_settings(host);

    expect(adapter.get_settings().credential_storage_mode).toBe("browser_device");
    expect(
      adapter.update_settings({ credential_storage_mode: "browser_encrypted" })
        .credential_storage_mode,
    ).toBe("browser_encrypted");
    expect(host.extension_settings.tavern_canvas).toMatchObject({
      credential_storage_mode: "browser_encrypted",
    });
    expect(() =>
      adapter.update_settings({ credential_storage_mode: "plaintext" as never }),
    ).toThrow();
  });

  it("keeps concurrency bounded from one through four", () => {
    const host = create_host();
    const adapter = create_sillytavern_settings(host);

    for (const global_concurrency of [1, 2, 3, 4]) {
      expect(adapter.update_settings({ global_concurrency }).global_concurrency).toBe(
        global_concurrency,
      );
    }

    expect(() => adapter.update_settings({ global_concurrency: 0 })).toThrow();
    expect(() => adapter.update_settings({ global_concurrency: 5 })).toThrow();
  });

  it("recovers fields independently so valid siblings survive persisted corruption", () => {
    const host = create_host({
      ...settings({
        active_namespace: "workspace-a",
        locale: "zh-CN",
        global_concurrency: 3,
        auto_generation_enabled: false,
        ui: {
          ...DEFAULT_TAVERN_CANVAS_SETTINGS.ui,
          inspector_width: 420,
        },
      }),
      schema_version: 99,
      active_namespace: "   ",
      locale: "fr",
      global_concurrency: 9,
      auto_generation_enabled: "yes",
      ui: {
        color_mode: "neon",
        inspector_width: 420,
        inspector_collapsed: false,
        optional_entry_enabled: true,
      },
    });
    const adapter = create_sillytavern_settings(host);

    expect(adapter.get_settings()).toMatchObject({
      schema_version: 1,
      active_namespace: "primary",
      locale: "auto",
      global_concurrency: 4,
      auto_generation_enabled: true,
      ui: {
        inspector_width: 420,
      },
    });
    expect(adapter.diagnostics.map(({ path }) => path)).toEqual(
      expect.arrayContaining([
        "schema_version",
        "active_namespace",
        "locale",
        "global_concurrency",
        "auto_generation_enabled",
        "ui.color_mode",
      ]),
    );
  });

  it("removes unknown fields and exposes diagnostics without admitting them to runtime settings", () => {
    const host = create_host({
      ...settings(),
      unknown_option: true,
      ui: {
        ...DEFAULT_TAVERN_CANVAS_SETTINGS.ui,
        unknown_ui_option: "discard",
      },
    });
    const adapter = create_sillytavern_settings(host);

    expect(adapter.get_settings()).not.toHaveProperty("unknown_option");
    expect(adapter.get_settings().ui).not.toHaveProperty("unknown_ui_option");
    expect(adapter.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "unknown_option", code: "unknown_field" }),
        expect.objectContaining({ path: "ui.unknown_ui_option", code: "unknown_field" }),
      ]),
    );
  });

  it("keeps the valid fields of a nested block when one of its fields is invalid", () => {
    const host = create_host({
      ...settings(),
      illustration: {
        ...DEFAULT_TAVERN_CANVAS_SETTINGS.illustration,
        max_images_per_message: 3,
        max_chat_history: -1,
      },
    });
    const adapter = create_sillytavern_settings(host);

    expect(adapter.get_settings().illustration.max_images_per_message).toBe(3);
    expect(adapter.get_settings().illustration.max_chat_history).toBe(
      DEFAULT_TAVERN_CANVAS_SETTINGS.illustration.max_chat_history,
    );
    expect(adapter.diagnostics).toContainEqual({
      path: "illustration.max_chat_history",
      code: "invalid_value",
    });
  });

  it("drops the retired gateway field without a diagnostic", () => {
    const host = create_host({
      ...settings(),
      gateway: { endpoint: "https://example.com", token_secret_id: null, http_acknowledgments: {} },
    });
    const adapter = create_sillytavern_settings(host);

    expect(adapter.get_settings()).not.toHaveProperty("gateway");
    expect(adapter.diagnostics).toEqual([]);
  });

  it.each(["profiles", "workflows", "image_data", "vocabulary_data", "logs"])(
    "rejects the disallowed small-settings category %s",
    (category) => {
      const host = create_host({ ...settings(), [category]: { payload: "x" } });
      const adapter = create_sillytavern_settings(host);

      expect(adapter.get_settings()).not.toHaveProperty(category);
      expect(adapter.diagnostics).toContainEqual(
        expect.objectContaining({ path: category, code: "disallowed_category" }),
      );
    },
  );

  it("reports a serialized-size violation and keeps the recovered object small", () => {
    const host = create_host({
      ...settings(),
      unknown_payload: "x".repeat(MAX_SETTINGS_SERIALIZED_BYTES + 1),
    });
    const adapter = create_sillytavern_settings(host);

    expect(adapter.get_settings()).toEqual(DEFAULT_TAVERN_CANVAS_SETTINGS);
    expect(adapter.diagnostics).toContainEqual(
      expect.objectContaining({ code: "serialized_size_exceeded" }),
    );
  });

  it("validates before immutable whole-object replacement", () => {
    const host = create_host();
    const adapter = create_sillytavern_settings(host);
    const prior = adapter.get_settings();
    const next = adapter.update_settings({ global_concurrency: 2 });

    expect(next).not.toBe(prior);
    expect(next.global_concurrency).toBe(2);
    expect(prior.global_concurrency).toBe(4);
    expect(host.extension_settings.tavern_canvas).toBe(next);
    expect(() => adapter.replace_settings({ ...next, global_concurrency: 8 })).toThrow();
    expect(adapter.get_settings()).toBe(next);
  });

  it("persists the vocabulary update channel through a fresh adapter", () => {
    const host = create_host();
    const first = create_sillytavern_settings(host);
    first.update_settings({ vocabulary_update_channel: "remote" });

    const second = create_sillytavern_settings(host);
    expect(second.get_settings().vocabulary_update_channel).toBe("remote");
  });
  it("coalesces multiple same-task changes into one host save", async () => {
    const host = create_host();
    const adapter = create_sillytavern_settings(host);

    adapter.update_settings({ locale: "en" });
    adapter.update_settings({ global_concurrency: 2 });

    expect(host.scheduler.pending_count()).toBe(1);
    await host.scheduler.run_pending();
    expect(host.saves.count).toBe(1);
  });

  it("flushes a pending save immediately when the module stops", async () => {
    const host = create_host();
    const adapter = create_sillytavern_settings(host);
    adapter.update_settings({ locale: "en" });

    await adapter.stop();

    expect(host.saves.count).toBe(1);
    expect(host.scheduler.pending_count()).toBe(1);
    await host.scheduler.run_pending();
    expect(host.saves.count).toBe(1);
  });
});
