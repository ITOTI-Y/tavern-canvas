import { expect, test } from "@playwright/test";

import {
  COLOR_MODES,
  goto_studio,
  LOCALES,
  navigate_to_route,
  ROUTES,
  VIEWPORTS,
  wait_for_images_settled,
  type ColorMode,
  type StudioLocale,
} from "./studio_harness_utils.js";

function snapshot_name(
  route: string,
  viewport: { readonly name: string },
  color_mode: ColorMode,
  locale: StudioLocale,
): string {
  return `${route}-${viewport.name}-${color_mode}-${locale}.png`;
}

for (const viewport of VIEWPORTS) {
  for (const color_mode of COLOR_MODES) {
    for (const locale of LOCALES) {
      test.describe(`Studio visual: ${viewport.name} / ${color_mode} / ${locale}`, () => {
        test(`shell (Settings)`, async ({ page }) => {
          await goto_studio(page, { viewport, colorMode: color_mode, locale, scenario: "full" });
          await wait_for_images_settled(page);
          await page.waitForTimeout(150);
          await expect(page).toHaveScreenshot(
            snapshot_name("shell", viewport, color_mode, locale),
            {
              animations: "disabled",
            },
          );
        });

        for (const route of ROUTES) {
          test(`route: ${route}`, async ({ page }) => {
            await goto_studio(page, { viewport, colorMode: color_mode, locale, scenario: "full" });
            await navigate_to_route(page, route, locale);
            await wait_for_images_settled(page);
            await page.waitForTimeout(150);
            await expect(page).toHaveScreenshot(
              snapshot_name(route, viewport, color_mode, locale),
              {
                animations: "disabled",
              },
            );
          });
        }
      });
    }
  }
}
