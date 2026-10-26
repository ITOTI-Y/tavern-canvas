import { expect, test } from "@playwright/test";

import { open_host_page } from "./all_host_utils.js";

test.describe("the user drives vocabulary updates and a bad package never replaces a good one", () => {
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
