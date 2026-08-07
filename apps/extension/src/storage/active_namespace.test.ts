import { describe, expect, it } from "vitest";

import { create_sillytavern_settings, type SillyTavernSettings } from "./sillytavern_settings.js";
import {
  switch_active_namespace,
  type NamespaceMarkerPort,
  type NamespaceReadinessMarker,
} from "./active_namespace.js";
import type { ExtensionSettingsHost, SettingsScheduler } from "./settings_port.js";

function manual_scheduler(): SettingsScheduler & { run_pending(): Promise<void> } {
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

function marker_port(
  markers: Record<string, NamespaceReadinessMarker | null>,
  seen_namespaces: string[],
): NamespaceMarkerPort {
  return {
    with_marker_transaction(namespace, callback) {
      seen_namespaces.push(namespace);
      return callback({
        async get_marker() {
          return markers[namespace] ?? null;
        },
      });
    },
  };
}

function create_settings(save_settings: () => void | Promise<void>): {
  extension_settings: ExtensionSettingsHost;
  settings: SillyTavernSettings;
  scheduler: SettingsScheduler & { run_pending(): Promise<void> };
} {
  const extension_settings: ExtensionSettingsHost = {};
  const scheduler = manual_scheduler();
  return {
    extension_settings,
    settings: create_sillytavern_settings({ extension_settings, save_settings, scheduler }),
    scheduler,
  };
}

describe("active namespace switching", () => {
  it.each(["import_ready", "ready_to_switch"] as const)(
    "switches only after a %s marker is verified in the transaction boundary",
    async (state) => {
      const seen_namespaces: string[] = [];
      const { settings, scheduler } = create_settings(() => undefined);
      const result = await switch_active_namespace(
        settings,
        "imported:one",
        marker_port({ "imported:one": { namespace: "imported:one", state } }, seen_namespaces),
      );

      expect(result).toBe("imported:one");
      expect(settings.get_settings().active_namespace).toBe("imported:one");
      expect(seen_namespaces).toEqual(["imported:one"]);
      await scheduler.run_pending();
    },
  );

  it("rejects a missing namespace marker without changing the active pointer", async () => {
    const { settings } = create_settings(() => undefined);
    const markers: Record<string, NamespaceReadinessMarker | null> = {};

    await expect(
      switch_active_namespace(settings, "missing", marker_port(markers, [])),
    ).rejects.toThrow(/missing/i);
    expect(settings.get_settings().active_namespace).toBe("primary");
  });

  it("rejects a namespace marker that is not ready to switch", async () => {
    const { settings } = create_settings(() => undefined);
    const markers = {
      copying: { namespace: "copying", state: "copying" as const },
    };

    await expect(
      switch_active_namespace(settings, "copying", marker_port(markers, [])),
    ).rejects.toThrow(/ready/i);
    expect(settings.get_settings().active_namespace).toBe("primary");
  });

  it("does not change the active pointer until marker verification finishes", async () => {
    const { settings } = create_settings(() => undefined);
    let release_marker: ((marker: NamespaceReadinessMarker) => void) | undefined;
    const marker_verification = new Promise<NamespaceReadinessMarker>((resolve) => {
      release_marker = resolve;
    });
    const marker_store: NamespaceMarkerPort = {
      with_marker_transaction(_namespace, callback) {
        return marker_verification.then((marker) => callback({ get_marker: async () => marker }));
      },
    };

    const switching = switch_active_namespace(settings, "imported:two", marker_store);
    await Promise.resolve();
    expect(settings.get_settings().active_namespace).toBe("primary");

    release_marker?.({ namespace: "imported:two", state: "ready_to_switch" });
    await switching;
    expect(settings.get_settings().active_namespace).toBe("imported:two");
  });

  it("restores the previous pointer when the host save fails", async () => {
    let save_attempts = 0;
    const { settings, extension_settings } = create_settings(() => {
      save_attempts += 1;
      throw new Error("host save failed");
    });
    const markers = {
      imported: { namespace: "imported", state: "import_ready" as const },
    };

    await expect(
      switch_active_namespace(settings, "imported", marker_port(markers, [])),
    ).rejects.toThrow("host save failed");

    expect(save_attempts).toBe(1);
    expect(settings.get_settings().active_namespace).toBe("primary");
    expect(
      (extension_settings.tavern_canvas as { active_namespace: string }).active_namespace,
    ).toBe("primary");
  });
});
