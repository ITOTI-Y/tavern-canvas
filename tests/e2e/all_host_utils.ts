import { expect, type Page } from "@playwright/test";

import type {
  HostEnvironmentControl,
  RecordedRequest,
} from "../harness/src/all_host_environment.js";
import type { BootstrapProbeResult } from "../../apps/extension/src/host/index.js";
import type { CapabilityResolutionRecord } from "../../apps/extension/src/bootstrap/capability_resolution.js";
import type { StudioCapabilities } from "../../apps/extension/src/ui/contracts/ui_capabilities.js";
import type { SecurityProbes } from "../harness/src/all_host_probes.js";

export interface AllHostSurface {
  readonly state: "ready" | "blocked" | "failed";
  readonly probe: BootstrapProbeResult;
  readonly resolutions: readonly CapabilityResolutionRecord[];
  readonly control: HostEnvironmentControl;
  readonly provider_requests: readonly RecordedRequest[];
  readonly page_listener_registrations: readonly { target: string; type: string }[];
  readonly profile_id: string;
  readonly namespace: string;
  readonly loopback_provider_origin: string;
  readonly probes: SecurityProbes;
  /** Only present in `mode=capabilities`; `undefined` after a full bootstrap mount. */
  readonly capabilities?: StudioCapabilities;
}

declare global {
  interface Window {
    __TAVERN_CANVAS_E2E__: AllHostSurface;
    __TAVERN_CANVAS_E2E_BOOT_ERROR__?: string;
  }
}

export type HostPage = "sillytavern_host.html" | "tauri_host.html";

export interface HarnessScenario {
  /** TavernHelper version to advertise, or `"missing"` to install no TavernHelper at all. */
  readonly helper?: string;
  readonly tools?: "none";
  readonly secrets?: "sealed";
  readonly legacy?: "v2";
  readonly gateway?: string;
  readonly ack?: "1";
  /**
   * `capabilities` stops after the composition root so a spec can drive the real capability ports;
   * the default runs the full bootstrap mount.
   */
  readonly mode?: "capabilities";
  /** Set by `open_host_page` for every scenario: wipe IndexedDB before the composition root runs. */
  readonly reset?: "1";
}

function to_query(scenario: HarnessScenario): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries<string | undefined>({ ...scenario })) {
    if (value !== undefined) {
      params.set(key, value);
    }
  }
  const query = params.toString();
  return query.length === 0 ? "" : `?${query}`;
}

/** Both harness pages share one origin-keyed IndexedDB, so every scenario starts with a reset. */
export async function open_host_page(
  page: Page,
  host_page: HostPage,
  scenario: HarnessScenario = {},
): Promise<void> {
  await page.goto(`/${host_page}${to_query({ ...scenario, reset: "1" })}`);
  await page.waitForFunction(
    () => document.documentElement.dataset.allHostHarnessReady !== undefined,
    undefined,
    { timeout: 60_000 },
  );
  const boot_error = await page.evaluate(() => window.__TAVERN_CANVAS_E2E_BOOT_ERROR__);
  expect(boot_error, "the harness must boot the real extension without throwing").toBeUndefined();
}

export const REQUIRED_HOST_CAPABILITY_IDS = [
  "main_generation_events",
  "private_prompt_generation",
  "message_swipe_metadata",
  "host_image_upload",
  "tavern_helper",
] as const;

export const PUBLIC_TAVERN_HELPER_MEMBERS: ReadonlySet<string> = new Set([
  "getTavernHelperVersion",
  "generateRaw",
  "getChatMessages",
  "setChatMessages",
]);
