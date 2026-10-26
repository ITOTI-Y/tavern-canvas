import { expect, test } from "@playwright/test";

import { open_host_page, REQUIRED_HOST_CAPABILITY_IDS } from "./all_host_utils.js";

test.describe("TauriTavern enables the ChatSurface and WorldInfo activation enhancements", () => {
  test("the standard host baseline still holds under TauriTavern", async ({ page }) => {
    await open_host_page(page, "tauri_host.html");

    const probe = await page.evaluate(() => window.__TAVERN_CANVAS_E2E__.probe);
    expect(probe.ready).toBe(true);
    if (!probe.ready) {
      throw new Error("probe must be ready");
    }
    for (const capability_id of REQUIRED_HOST_CAPABILITY_IDS) {
      expect(probe.matrix[capability_id]?.available, capability_id).toBe(true);
    }
  });

  test("both Tauri capabilities are detected", async ({ page }) => {
    await open_host_page(page, "tauri_host.html");

    const tauri = await page.evaluate(() => {
      const probe = window.__TAVERN_CANVAS_E2E__.probe;
      return probe.ready
        ? {
            chat_surface: probe.matrix.tauri_chat_surface?.available,
            world_info: probe.matrix.tauri_world_info_activation?.available,
          }
        : null;
    });
    expect(tauri).toEqual({ chat_surface: true, world_info: true });
  });

  test("the ChatSurface module registers a participant with the host", async ({ page }) => {
    await open_host_page(page, "tauri_host.html");

    const participants = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.control.chat_surface_participant_count(),
    );
    expect(
      participants,
      "compose_capabilities.ts starts TauriChatSurfaceModule when the ChatSurface capability is " +
        "available, so exactly one participant must be registered",
    ).toBe(1);
  });

  test("WorldInfo activation batches reach a subscribed first-party module", async ({ page }) => {
    await open_host_page(page, "tauri_host.html");

    const delivered = await page.evaluate(async () => {
      window.__TAVERN_CANVAS_E2E__.control.emit_world_info_activation([
        { uid: "entry-1", world: "harness-world" },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return window.__TAVERN_CANVAS_E2E__.control.subscribed_world_info_handler_count();
    });

    expect(
      delivered,
      "compose_capabilities.ts must start TauriWorldInfoActivationModule so World Info activation " +
        "results reach the prompt pipeline on a TauriTavern host",
    ).toBeGreaterThan(0);
  });

  test("no page-wide error listener is installed on the Tauri host either", async ({ page }) => {
    await open_host_page(page, "tauri_host.html");

    const page_wide = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.page_listener_registrations.filter((registration) =>
        ["error", "unhandledrejection", "rejectionhandled"].includes(registration.type),
      ),
    );
    expect(page_wide).toEqual([]);
  });
});
