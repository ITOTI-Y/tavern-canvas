import { ModuleRuntime, type RuntimeModule } from "@tavern-canvas/core";
import { createApp } from "vue";

import { probe_host_capabilities, type BootstrapProbeResult } from "../host/index.js";
import BootstrapStatus from "../ui/BootstrapStatus.vue";
import { create_shadow_root, PORTAL_TARGET_KEY } from "../ui/create_shadow_root.js";
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
}

export type BootstrapState = "ready" | "blocked" | "failed";

export interface BootstrapHandle {
  readonly state: BootstrapState;
  readonly probe: BootstrapProbeResult;
  dispose(): Promise<void>;
}

export async function bootstrap_tavern_canvas(
  options: BootstrapOptions = {},
): Promise<BootstrapHandle> {
  const document_ = options.document ?? document;
  const probe = probe_host_capabilities(options.globals ?? globalThis);
  const runtime = probe.ready ? new ModuleRuntime(options.modules ?? []) : undefined;
  let state: BootstrapState;
  let status: StartupStatus;

  if (!probe.ready) {
    state = "blocked";
    status = status_from_probe(probe);
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
  const app = createApp(BootstrapStatus, {
    status,
    version: options.version ?? "development",
  });
  app.provide(PORTAL_TARGET_KEY, surface.portal_element);
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
