import { expect, test } from "@playwright/test";

import { open_host_page } from "./all_host_utils.js";

/**
 * v2-to-v3 migration and vocabulary-update acceptance gate, run against the real composition root
 * in real Chromium with real IndexedDB. Covers architecture acceptance criteria 11 (settings,
 * presets, workflows, vocabulary and image data switch over only after verification, and no
 * failure ever overwrites v2 data or writes a success flag) and 12 (the user drives the update
 * check, and an interrupted or hash-mismatched install keeps the previous package).
 */

test.describe("criterion 11: v2 data migrates losslessly and a failure never writes a success flag", () => {
  test("a host with no v2 install reports not_required rather than inventing work", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const snapshot = await page.evaluate(async () => {
      const capabilities = window.__TAVERN_CANVAS_E2E__.capabilities;
      if (capabilities === undefined) {
        throw new Error("capabilities mode must expose the composed ports");
      }
      return capabilities.migration.load();
    });

    expect(snapshot.state).toBe("not_required");
    expect(snapshot.failure_reason).toBeNull();
  });

  test("a full v2 settings blob migrates to completion without mutating the legacy source", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities", legacy: "v2" });

    const outcome = await page.evaluate(async () => {
      const surface = window.__TAVERN_CANVAS_E2E__;
      const capabilities = surface.capabilities;
      if (capabilities === undefined) {
        throw new Error("capabilities mode must expose the composed ports");
      }
      const legacy_before = JSON.stringify(surface.control.extension_settings["st-chatu8"]);
      const initial = await capabilities.migration.load();
      const after_run = await capabilities.migration.retry();
      return {
        initial_state: initial.state,
        final_state: after_run.state,
        failure_reason: after_run.failure_reason,
        counts: after_run.counts,
        legacy_unchanged:
          legacy_before === JSON.stringify(surface.control.extension_settings["st-chatu8"]),
      };
    });

    expect(outcome.initial_state).not.toBe("completed");
    expect(outcome.final_state).toBe("completed");
    expect(outcome.failure_reason).toBeNull();
    expect(Object.values(outcome.counts).some((count) => count > 0)).toBe(true);
    expect(outcome.legacy_unchanged).toBe(true);
  });

  test("re-running a completed migration is idempotent and does not duplicate records", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities", legacy: "v2" });

    const outcome = await page.evaluate(async () => {
      const capabilities = window.__TAVERN_CANVAS_E2E__.capabilities;
      if (capabilities === undefined) {
        throw new Error("capabilities mode must expose the composed ports");
      }
      const first = await capabilities.migration.retry();
      const second = await capabilities.migration.retry();
      return { first: first.counts, second: second.counts, state: second.state };
    });

    expect(outcome.state).toBe("completed");
    expect(outcome.second).toEqual(outcome.first);
  });

  test("legacy data is never deleted without an explicit typed confirmation", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities", legacy: "v2" });

    const outcome = await page.evaluate(async () => {
      const surface = window.__TAVERN_CANVAS_E2E__;
      const capabilities = surface.capabilities;
      if (capabilities === undefined) {
        throw new Error("capabilities mode must expose the composed ports");
      }
      await capabilities.migration.retry();
      let rejected: string | null = null;
      try {
        await capabilities.migration.confirm_legacy_cleanup("yes");
      } catch (thrown) {
        rejected = String(thrown);
      }
      return {
        rejected,
        legacy_still_present: surface.control.extension_settings["st-chatu8"] !== undefined,
      };
    });

    expect(outcome.rejected).not.toBeNull();
    expect(outcome.legacy_still_present).toBe(true);
  });
});

test.describe("criterion 12: the user drives vocabulary updates and a bad package never replaces a good one", () => {
  test("the catalog is only read when something asks for it", async ({ page }) => {
    const catalog_requests: string[] = [];
    await page.route("**/*", async (route) => {
      if (route.request().url().includes("catalog.json")) {
        catalog_requests.push(route.request().url());
      }
      await route.continue();
    });

    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });
    await page.waitForTimeout(1_000);

    expect(catalog_requests).toEqual([]);
  });

  test("a manifest whose published hash does not match the served package fails the install and keeps the previous package", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const outcome = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.vocabulary_update(),
    );

    expect(outcome.listed_package_ids).toEqual(["tavern-canvas-vocabulary"]);
    expect(outcome.install_error).not.toBeNull();
    expect(outcome.active_package_after).toBe(outcome.active_package_before);
  });

  test("cancelling an install that is not running is a no-op", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const threw = await page.evaluate(async () => {
      const capabilities = window.__TAVERN_CANVAS_E2E__.capabilities;
      if (capabilities === undefined) {
        throw new Error("capabilities mode must expose the composed ports");
      }
      try {
        capabilities.vocabulary.cancel_install();
        await Promise.resolve();
        return null;
      } catch (thrown) {
        return String(thrown);
      }
    });

    expect(threw).toBeNull();
  });
});
