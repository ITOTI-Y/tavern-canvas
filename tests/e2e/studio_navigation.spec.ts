import { expect, test } from "@playwright/test";

import {
  DESKTOP_LARGE,
  goto_studio,
  MOBILE_LARGE,
  navigate_to_route,
  open_settings_section,
  ROUTES,
  route_label,
} from "./studio_harness_utils.js";

const ROUTE_MARKERS: Readonly<Record<(typeof ROUTES)[number], string>> = {
  gallery: '[class*="galleryView"]',
  settings: '[data-testid="settings-view"]',
};

test.describe("Studio navigation: desktop rail", () => {
  test("switches the mounted view for both routes", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    for (const route of ROUTES) {
      await navigate_to_route(page, route, "en");
      await expect(page.locator(ROUTE_MARKERS[route])).toBeVisible();
      const selected = page.locator('[data-testid="studio-rail"] button[aria-current="page"]');
      await expect(selected).toHaveAttribute("aria-label", route_label(route, "en"));
    }
  });

  test("keeps the previous route's content out of the DOM after navigating away", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    await navigate_to_route(page, "gallery", "en");
    await expect(page.locator(ROUTE_MARKERS.gallery)).toBeVisible();
    await navigate_to_route(page, "settings", "en");
    await expect(page.locator(ROUTE_MARKERS.settings)).toBeVisible();
    await expect(page.locator(ROUTE_MARKERS.gallery)).toHaveCount(0);
  });

  test("renders zh-CN route labels and switches views identically", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, locale: "zh-CN" });
    for (const route of ROUTES) {
      await navigate_to_route(page, route, "zh-CN");
      await expect(page.locator(ROUTE_MARKERS[route])).toBeVisible();
    }
  });

  test("moves between settings sections inside the Settings route", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    await open_settings_section(page, "Prompt presets");
    await expect(page.locator('[data-testid="preset-browser"]')).toBeVisible();
    await open_settings_section(page, "Diagnostics");
    await expect(page.locator('[data-testid="diagnostics-view"]')).toBeVisible();
    await expect(page.locator('[data-testid="preset-browser"]')).toHaveCount(0);
  });
});

test.describe("Studio navigation: mobile bottom nav", () => {
  test("switches views through both routes", async ({ page }) => {
    await goto_studio(page, { viewport: MOBILE_LARGE });
    for (const route of ROUTES) {
      await navigate_to_route(page, route, "en");
      await expect(page.locator(ROUTE_MARKERS[route])).toBeVisible();
    }
  });

  test("does not render the desktop rail on a mobile viewport", async ({ page }) => {
    await goto_studio(page, { viewport: MOBILE_LARGE });
    await expect(page.locator('[data-viewport="desktop"]')).toHaveCount(0);
    await expect(page.locator('[data-viewport="mobile"]')).toBeVisible();
  });
});

test.describe("Studio navigation: shell-level states", () => {
  test("shows the skeleton (not the routed view) while every capability is still loading", async ({
    page,
  }) => {
    await goto_studio(page, { scenario: "loading", viewport: DESKTOP_LARGE });
    await expect(page.locator('[data-testid="workspace-skeleton"]')).toBeVisible();
    await expect(page.locator(ROUTE_MARKERS.settings)).toHaveCount(0);
  });

  test("shows the partial-initialization banner without hiding the rest of the shell", async ({
    page,
  }) => {
    await goto_studio(page, { scenario: "partial", viewport: DESKTOP_LARGE });
    await expect(page.locator('[data-testid="partial-banner"]')).toBeVisible();
    await expect(page.locator('[data-testid="studio-rail"] button')).toHaveCount(ROUTES.length);
    await page.locator('[data-testid="partial-banner-diagnostics"]').click();
    await expect(page.locator('[data-testid="diagnostics-view"]')).toBeVisible();
  });
});
