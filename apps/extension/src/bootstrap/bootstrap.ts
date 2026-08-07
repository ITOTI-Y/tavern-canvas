import { ModuleRuntime, type RuntimeModule } from "@tavern-canvas/core";
import { createApp } from "vue";

import { probe_host_capabilities, type BootstrapProbeResult } from "../host/index.js";
import { create_i18n } from "../i18n/create_i18n.js";
import AppRoot from "../ui/AppRoot.vue";
import { create_shadow_root } from "../ui/create_shadow_root.js";
import {
  compose_studio_capabilities,
  type ComposeCapabilitiesOptions,
  type StudioComposition,
} from "./compose_capabilities.js";
import type { CapabilityResolutionRecord } from "./capability_resolution.js";
import { startup_failed_status, status_from_probe, type StartupStatus } from "./startup_error.js";

export interface BootstrapOwnedResources {
  readonly subscriptions?: readonly (() => void)[];
  readonly object_urls?: readonly string[];
}

export interface BootstrapOptions {
  readonly globals?: unknown;
  readonly document?: Document;
  readonly modules?: readonly RuntimeModule[];
  readonly stylesheet?: string;
  readonly version?: string;
  readonly owned_resources?: BootstrapOwnedResources;
  /** Forwarded to the composition root; production supplies nothing and gets the real
   * IndexedDB/Worker/provider wiring. */
  readonly composition?: Omit<
    ComposeCapabilitiesOptions,
    "probe" | "globals" | "extension_version"
  >;
}

export type BootstrapState = "ready" | "blocked" | "failed";

export interface BootstrapHandle {
  readonly state: BootstrapState;
  readonly probe: BootstrapProbeResult;
  /** One row per Studio capability: which resolved to a real implementation and, when it did not,
   * why. Surfaced through Diagnostics and the support bundle. */
  readonly resolutions: readonly CapabilityResolutionRecord[];
  dispose(): Promise<void>;
}

export async function bootstrap_tavern_canvas(
  options: BootstrapOptions = {},
): Promise<BootstrapHandle> {
  const document_ = options.document ?? document;
  const globals = options.globals ?? globalThis;
  const probe = probe_host_capabilities(globals);
  let state: BootstrapState;
  let status: StartupStatus;

  // Composed before any module starts, and composed even on a blocked/failed probe: every
  // capability then resolves to the honest-unavailable implementation carrying its own reason, so
  // Diagnostics can explain the state rather than showing nothing at all. Composition also decides
  // which host-specific runtime modules exist (e.g. the Tauri chat surface), so the runtime cannot
  // be built until it has run.
  let composition: StudioComposition | null = null;
  let composition_failed = false;
  try {
    composition = await compose_studio_capabilities({
      ...options.composition,
      probe,
      globals,
      extension_version: options.version ?? "development",
    });
  } catch {
    composition_failed = true;
  }

  const runtime = probe.ready
    ? new ModuleRuntime([...(options.modules ?? []), ...(composition?.modules ?? [])])
    : undefined;

  if (!probe.ready) {
    state = "blocked";
    status = status_from_probe(probe);
  } else if (composition_failed) {
    state = "failed";
    status = startup_failed_status();
  } else {
    try {
      await runtime?.start_all();
      state = "ready";
      status = status_from_probe(probe);
    } catch {
      state = "failed";
      status = startup_failed_status();
    }
  }

  const surface = create_shadow_root(document_, options.stylesheet ?? "");
  const locale_runtime = create_i18n();
  // Fire-and-forget: English ships bundled so the shell always has a working fallback the instant
  // it mounts, and vue-i18n's reactive locale swaps every already-rendered translated string over
  // once the lazy zh-CN chunk (if needed) resolves -- startup never blocks on it. The persisted
  // preference now comes from the real settings capability; "auto" still follows the host language.
  const persisted_locale = await composition?.capabilities.settings
    .load()
    .then((snapshot) => snapshot.settings.locale)
    .catch(() => null);
  void locale_runtime.apply_locale(
    persisted_locale ?? "auto",
    typeof navigator === "undefined" ? "en" : navigator.language,
  );

  const app = createApp(AppRoot, {
    status,
    probe,
    version: options.version ?? "development",
    portalTarget: surface.portal_element,
    hostElement: surface.host_element,
    capabilities: composition?.capabilities,
  });
  app.use(locale_runtime.i18n);
  app.onUnmount(() => {
    surface.remove();
  });

  try {
    app.mount(surface.app_element);
  } catch (error) {
    surface.remove();
    await runtime?.stop_all();
    throw error;
  }

  let disposed = false;
  return {
    state,
    probe,
    resolutions: composition?.resolutions ?? [],
    async dispose() {
      if (disposed) {
        return;
      }
      disposed = true;
      const cleanup_failures: unknown[] = [];

      try {
        app.unmount();
      } catch (error) {
        cleanup_failures.push(error);
      }
      for (const unsubscribe of options.owned_resources?.subscriptions ?? []) {
        try {
          unsubscribe();
        } catch (error) {
          cleanup_failures.push(error);
        }
      }
      for (const object_url of options.owned_resources?.object_urls ?? []) {
        try {
          URL.revokeObjectURL(object_url);
        } catch (error) {
          cleanup_failures.push(error);
        }
      }
      surface.remove();
      try {
        await composition?.dispose();
      } catch (error) {
        cleanup_failures.push(error);
      }
      try {
        await runtime?.stop_all();
      } catch (error) {
        cleanup_failures.push(error);
      }

      if (cleanup_failures.length > 0) {
        throw new AggregateError(cleanup_failures, "TavernCanvas cleanup failed");
      }
    },
  };
}
