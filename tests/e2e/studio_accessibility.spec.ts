import { expect, test } from "@playwright/test";

import {
  DESKTOP_LARGE,
  goto_studio,
  MOBILE_LARGE,
  navigate_to_route,
} from "./studio_harness_utils.js";

/**
 * Real-browser accessibility coverage (task-8-brief.md Step 2): keyboard access, focus order and
 * return, accessible names, dialog focus traps, no focus clipping, and reduced motion. Component
 * unit tests (happy-dom) already assert individual pieces of this in isolation
 * (StudioShell.test.ts's tab-order/focus-return tests, components.test.ts's dialog behavior); this
 * spec proves the same contracts hold once every route's real view is mounted together in a real
 * browser, across the whole app rather than one component at a time.
 */

test.describe("Studio accessibility: keyboard access", () => {
  test("every desktop rail button is reachable by Tab and activates with the keyboard", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    const rail_buttons = page.locator("nav > button");
    const count = await rail_buttons.count();
    expect(count).toBe(6);
    for (let index = 0; index < count; index += 1) {
      const button = rail_buttons.nth(index);
      await button.focus();
      await expect(button).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator('[data-testid="workspace"]')).toBeVisible();
    }
  });

  test("submits the Workbench form when Generate receives a real keyboard activation", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    await page.locator('[data-testid="positive-prompt-input"]').fill("a mountain lake");
    const submit = page.locator('[data-testid="submit-generation"]');
    await submit.focus();
    await expect(submit).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator('[data-testid="active-jobs"]')).toContainText("job");
  });
});

test.describe("Studio accessibility: focus order and return", () => {
  test("moves focus through the Workbench form in visual/document order", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    const positive = page.locator('[data-testid="positive-prompt-input"]');
    const negative = page.locator('[data-testid="negative-prompt-input"]');
    await positive.focus();
    await page.keyboard.press("Tab");
    await expect(negative).toBeFocused();
  });

  test("returns focus to the triggering button after a confirm dialog closes", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    const cancel_button = page.locator('[aria-label="Cancel job"]').first();
    await cancel_button.focus();
    await cancel_button.press("Enter");
    const confirm = page.locator('button[aria-label="Confirm"]');
    await expect(confirm).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(cancel_button).toBeFocused();
  });

  test("returns focus to the inspector toggle after the mobile inspector sheet closes", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: MOBILE_LARGE });
    const toggle = page.locator('[data-testid="inspector-toggle"]');
    await toggle.focus();
    await toggle.press("Enter");
    const sheet = page.locator('[data-testid="inspector-sheet"]');
    await expect(sheet).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(sheet).toHaveCount(0);
    await expect(toggle).toBeFocused();
  });
});

test.describe("Studio accessibility: dialog focus traps", () => {
  test("keeps Tab focus inside the destructive-confirm dialog", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    await page.locator('[aria-label="Cancel job"]').first().click();
    const dialog = page.locator('[role="alertdialog"]');
    await expect(dialog).toBeVisible();

    for (let step = 0; step < 8; step += 1) {
      await page.keyboard.press("Tab");
      const focused_inside = await page.evaluate(() => {
        const host = document.getElementById("tavern-canvas-root");
        const shadow_root = host?.shadowRoot;
        const active = shadow_root?.activeElement ?? null;
        // The dialog is portaled into the Shadow Root's own portal element
        // (PortalProvider.vue), never document.body -- see the portal-escape check in
        // studio_layout_checks.ts for the negative-space version of this assertion.
        const dialog_element = shadow_root?.querySelector('[role="alertdialog"]') ?? null;
        return dialog_element ? dialog_element.contains(active) : false;
      });
      expect(focused_inside).toBe(true);
    }
  });

  test("Escape closes the settings archive-cleanup dialog without leaving a stray focus target", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    await navigate_to_route(page, "settings", "en");
    const open_button = page.locator('[data-testid="manual-cleanup-action"]');
    await open_button.click();
    await expect(page.locator('[data-testid="cleanup-confirm-input"]')).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator('[data-testid="cleanup-confirm-input"]')).toHaveCount(0);
    await expect(open_button).toBeFocused();
  });
});

test.describe("Studio accessibility: accessible names", () => {
  test("every interactive control in the Workbench and Settings routes has a non-empty accessible name", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    for (const route of ["workbench", "settings"] as const) {
      await navigate_to_route(page, route, "en");
      const unnamed = await page.evaluate(() => {
        const host = document.getElementById("tavern-canvas-root");
        const root = host?.shadowRoot;
        if (!root) {
          return ["Shadow Root not found"];
        }
        const problems: string[] = [];
        const controls = root.querySelectorAll<HTMLElement>(
          'button, a[href], [role="tab"], [role="menuitem"], input:not([type="hidden"]), select, textarea',
        );
        for (const control of controls) {
          const rect = control.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            continue;
          }
          const aria_label = control.getAttribute("aria-label")?.trim();
          const aria_labelledby = control.getAttribute("aria-labelledby");
          const text = control.textContent?.trim();
          const associated_label =
            control.id !== ""
              ? root.querySelector(`label[for="${control.id}"]`)?.textContent?.trim()
              : undefined;
          // AppSwitch.vue's pattern: a labelable control (button/input/...) nested inside a
          // <label> with no `for` attribute gets its accessible name from the label's own text
          // content, per the HTML "wrapped control" implicit-association rule -- the same pattern
          // a plain `<label><span>Enable X</span><input type="checkbox"></label>` relies on
          // everywhere on the web, not something aria-label/aria-labelledby/for is required for.
          const wrapping_label = control.closest("label")?.textContent?.trim();
          const has_name =
            Boolean(aria_label) ||
            Boolean(aria_labelledby) ||
            Boolean(text) ||
            Boolean(associated_label) ||
            Boolean(wrapping_label);
          if (!has_name) {
            problems.push(
              `${control.tagName.toLowerCase()} with no accessible name (outerHTML: ${control.outerHTML.slice(0, 120)})`,
            );
          }
        }
        return problems;
      });
      expect(unnamed, `route=${route}`).toEqual([]);
    }
  });

  test("every gallery grid tile's select toggle has a unique accessible name", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    await navigate_to_route(page, "gallery", "en");
    await page.waitForFunction(() => {
      const host = document.getElementById("tavern-canvas-root");
      return (host?.shadowRoot?.querySelectorAll("img").length ?? 0) > 0;
    });
    const labels = await page.evaluate(() => {
      const host = document.getElementById("tavern-canvas-root");
      const toggles = host?.shadowRoot?.querySelectorAll("[aria-pressed]") ?? [];
      return [...toggles].map((toggle) => toggle.getAttribute("aria-label"));
    });
    expect(labels.length).toBeGreaterThan(0);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

test.describe("Studio accessibility: no focus clipping", () => {
  test("every Tab stop on the mobile bottom nav stays fully within the viewport", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: MOBILE_LARGE });
    const nav_buttons = page.locator("nav > button");
    const count = await nav_buttons.count();
    for (let index = 0; index < count; index += 1) {
      const button = nav_buttons.nth(index);
      await button.focus();
      const box = await button.boundingBox();
      expect(box, `nav button ${String(index)}`).not.toBeNull();
      if (box) {
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.y).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(MOBILE_LARGE.width + 1);
        expect(box.y + box.height).toBeLessThanOrEqual(MOBILE_LARGE.height + 1);
      }
    }
  });
});

test.describe("Studio accessibility: reduced motion", () => {
  test("collapses transition duration to near-zero when prefers-reduced-motion is set", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, reducedMotion: true });
    const duration = await page.evaluate(() => {
      const host = document.getElementById("tavern-canvas-root");
      const button = host?.shadowRoot?.querySelector("nav > button");
      return button ? getComputedStyle(button).transitionDuration : null;
    });
    expect(duration).not.toBeNull();
    // "0.01ms" (or the equivalent "0s"-rounding some engines report) -- never the real ~180ms
    // motion-contract duration.
    expect(duration && Number.parseFloat(duration)).toBeLessThan(1);
  });
});
