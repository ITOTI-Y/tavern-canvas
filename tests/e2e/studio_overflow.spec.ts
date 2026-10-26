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

  test("a completed Workbench job's preview tiles decode to real, non-uniform pixels", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    const completed_row = page
      .locator('[data-testid="job-row"][data-job-state="completed"]')
      .first();
    await completed_row.locator('[data-testid="job-select"]').click();
    await expect(page.locator('[data-testid="completion-preview"]')).toBeVisible();
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

  test("Workbench workspace has zero further layout shift once the loading skeleton resolves", async ({
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

test.describe("Studio overflow: buttons never change dimensions on hover/loading/status", () => {
  test("Generate button keeps its box size across hover and the pending state", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    const selector = '[data-testid="submit-generation"]';
    const idle_box = await measure_box(page, selector);

    await page.locator(selector).hover();
    const hover_box = await measure_box(page, selector);
    expect(hover_box).toEqual(idle_box);

    await page.locator('[data-testid="positive-prompt-input"]').fill("a river at dawn");
    // The mock's submit() resolves fast; asserting aria-busy concurrently with the click catches the pending render.
    await Promise.all([
      page.locator(selector).click(),
      expect(page.locator(selector)).toHaveAttribute("aria-busy", "true"),
    ]);
    const pending_box = await measure_box(page, selector);
    expect(pending_box).toEqual(idle_box);
  });

  test("job cancel/retry icon buttons keep their box size across hover", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    const selector = '[aria-label="Cancel job"]';
    const idle_box = await measure_box(page, selector);
    await page.locator(selector).first().hover();
    const hover_box = await measure_box(page, selector);
    expect(hover_box).toEqual(idle_box);
  });
});
