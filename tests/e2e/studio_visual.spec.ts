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

/**
 * Four-viewport visual snapshots (task-8-brief.md Step 3): 1440x900, 1024x768, 390x844, 360x800,
 * each in light/dark x en/zh-CN, covering the shell (Workbench, the default route -- the one
 * screen that always includes the full chrome: top bar, rail/bottom-nav, task strip, inspector)
 * plus each of the six routes individually, all against the "full" scenario so every screenshot
 * shows representative real bitmap content (Gallery grid, Workbench completion preview) rather
 * than empty placeholders. `animations: "disabled"` force-completes any in-flight CSS
 * transition/animation before the screenshot -- the Step 3 requirement to exclude nondeterministic
 * animation state, without faking a state the app can never actually render.
 */

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
        test(`shell (Workbench)`, async ({ page }) => {
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
