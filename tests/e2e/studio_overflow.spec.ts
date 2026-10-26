import { expect, test } from "@playwright/test";

import {
  DESKTOP_LARGE,
  goto_studio,
  MOBILE_SMALL,
  navigate_to_route,
  ROUTES,
  VIEWPORTS,
  wait_for_images_settled,
} from "./studio_harness_utils.js";
import {
  find_blank_or_zero_dimension_images,
  measure_box,
  measure_layout_shift,
  run_all_layout_checks,
} from "./studio_layout_checks.js";

test.describe("Studio overflow: full matrix (en, light)", () => {
  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      test(`${route} at ${viewport.name}: no overflow, overlap, clipped text, or portal escape`, async ({
        page,
      }) => {
        await goto_studio(page, { viewport, scenario: "full" });
        await navigate_to_route(page, route, "en");
        await wait_for_images_settled(page);
        await page.waitForTimeout(150);

        const findings = await run_all_layout_checks(page);
        expect(findings, JSON.stringify(findings, null, 2)).toEqual([]);
      });
    }
  }
});

test.describe("Studio overflow: zh-CN at the narrowest viewport", () => {
  const viewport = MOBILE_SMALL;
  for (const route of ROUTES) {
    test(`${route} at ${viewport.name} (zh-CN): no overflow, overlap, or clipped text`, async ({
      page,
    }) => {
      await goto_studio(page, { viewport, scenario: "full", locale: "zh-CN" });
      await navigate_to_route(page, route, "zh-CN");
      await wait_for_images_settled(page);
      await page.waitForTimeout(150);

      const findings = await run_all_layout_checks(page);
      expect(findings, JSON.stringify(findings, null, 2)).toEqual([]);
    });
  }
});

test.describe("Studio overflow: dark mode at the widest viewport", () => {
  const viewport = DESKTOP_LARGE;
  for (const route of ROUTES) {
    test(`${route} at ${viewport.name} (dark): no overflow, overlap, or clipped text`, async ({
      page,
    }) => {
      await goto_studio(page, { viewport, scenario: "full", colorMode: "dark" });
      await navigate_to_route(page, route, "en");
      await wait_for_images_settled(page);
      await page.waitForTimeout(150);

      const findings = await run_all_layout_checks(page);
      expect(findings, JSON.stringify(findings, null, 2)).toEqual([]);
    });
  }
});

test.describe("Studio overflow: blank/zero-dimension image sweep", () => {
  test("every Gallery tile decodes to real, non-uniform pixels", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "gallery", "en");
    await wait_for_images_settled(page);
    await page.waitForTimeout(200);
    const findings = await find_blank_or_zero_dimension_images(page);
    expect(findings, JSON.stringify(findings, null, 2)).toEqual([]);
  });
});

test.describe("Studio overflow: layout shift after loaders/images resolve", () => {
  test("Gallery grid has zero further layout shift once every image has settled", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "gallery", "en");
    await wait_for_images_settled(page);

    const shift = await measure_layout_shift(page, async () => {
      await page.waitForTimeout(800);
    });
    expect(shift).toBe(0);
  });

  test("Settings workspace has zero further layout shift once the loading skeleton resolves", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await expect(page.locator('[data-testid="workspace-skeleton"]')).toHaveCount(0);

    const shift = await measure_layout_shift(page, async () => {
      await page.waitForTimeout(800);
    });
    expect(shift).toBe(0);
  });
});

test.describe("Studio overflow: buttons never change dimensions on hover/selection", () => {
  test("a settings section button keeps its box size across hover and selection", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "settings", "en");
    const selector = '[data-testid="settings-view"] nav button:nth-child(2)';
    const idle_box = await measure_box(page, selector);

    await page.locator(selector).hover();
    expect(await measure_box(page, selector)).toEqual(idle_box);

    await page.locator(selector).click();
    await expect(page.locator(selector)).toHaveAttribute("aria-current", "page");
    expect(await measure_box(page, selector)).toEqual(idle_box);
  });
});
