import { expect, test, type Locator, type Page } from "@playwright/test";

import {
  DESKTOP_LARGE,
  goto_studio,
  MOBILE_LARGE,
  navigate_to_route,
  open_settings_section,
} from "./studio_harness_utils.js";

const SQUARE_GALLERY_RECORD_ID = `00000000-0000-4000-8000-${String(202).padStart(12, "0")}`;

async function open_bulk_delete_confirm(page: Page): Promise<Locator> {
  await navigate_to_route(page, "gallery", "en");
  await page.locator(`button[aria-label="Select image: ${SQUARE_GALLERY_RECORD_ID}"]`).click();
  const trigger = page.getByRole("button", { name: "Delete selected" });
  await trigger.focus();
  await trigger.press("Enter");
  await expect(page.locator('[role="alertdialog"]')).toBeVisible();
  return trigger;
}

test.describe("Studio accessibility: keyboard access", () => {
  test("every desktop rail button is reachable by Tab and activates with the keyboard", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    const rail_buttons = page.locator('[data-testid="studio-rail"] button');
    const count = await rail_buttons.count();
    expect(count).toBe(2);
    for (let index = 0; index < count; index += 1) {
      const button = rail_buttons.nth(index);
      await button.focus();
      await expect(button).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator('[data-testid="workspace"]')).toBeVisible();
    }
  });
});

test.describe("Studio accessibility: focus order and return", () => {
  test("moves focus through the settings sections in visual/document order", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    await navigate_to_route(page, "settings", "en");
    const sections = page.locator('[data-testid="settings-view"] nav button');
    await sections.nth(0).focus();
    await page.keyboard.press("Tab");
    await expect(sections.nth(1)).toBeFocused();
  });

  test("returns focus to the triggering button after a confirm dialog closes", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    const trigger = await open_bulk_delete_confirm(page);
    await page.keyboard.press("Escape");
    await expect(page.locator('[role="alertdialog"]')).toHaveCount(0);
    await expect(trigger).toBeFocused();
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
    await open_bulk_delete_confirm(page);

    for (let step = 0; step < 8; step += 1) {
      await page.keyboard.press("Tab");
      const focused_inside = await page.evaluate(() => {
        const host = document.getElementById("tavern-canvas-root");
        const shadow_root = host?.shadowRoot;
        const active = shadow_root?.activeElement ?? null;
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
    await open_settings_section(page, "General");
    const open_button = page.locator('[data-testid="manual-cleanup-action"]');
    await open_button.click();
    await expect(page.locator('[data-testid="cleanup-confirm-input"]')).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator('[data-testid="cleanup-confirm-input"]')).toHaveCount(0);
    await expect(open_button).toBeFocused();
  });
});

test.describe("Studio accessibility: accessible names", () => {
  test("every interactive control in the settings sections has a non-empty accessible name", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE });
    const sections = [
      "Illustration",
      "Image providers",
      "Translation",
      "Connections",
      "General",
    ] as const;
    for (const route of sections) {
      await open_settings_section(page, route);
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
    expect(duration && Number.parseFloat(duration)).toBeLessThan(1);
  });
});
