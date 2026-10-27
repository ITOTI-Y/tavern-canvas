import { expect, test } from "@playwright/test";

import {
  DESKTOP_LARGE,
  goto_studio,
  navigate_to_route,
  open_settings_section,
} from "./studio_harness_utils.js";

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

const SQUARE_GALLERY_RECORD_ID = `00000000-0000-4000-8000-${String(202).padStart(12, "0")}`;
const DETAILED_GALLERY_RECORD_ID = `00000000-0000-4000-8000-${String(205).padStart(12, "0")}`;

test.describe("Studio workflow: gallery preview", () => {
  test("opens a preview that offers the image's source message", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "gallery", "en");
    await page.locator(`button[aria-label="Open preview: ${SQUARE_GALLERY_RECORD_ID}"]`).click();
    await expect(page.locator('[role="dialog"][data-state="open"]')).toBeVisible();
    await expect(page.getByRole("button", { name: "Go to source message" })).toBeEnabled();
  });
});

test.describe("Studio workflow: preset save", () => {
  test("edits and saves an existing prompt preset", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await open_settings_section(page, "Prompt presets");
    await page.locator('[data-testid="preset-select"]').first().click();
    await expect(page.locator('[data-testid="preset-name-input"]')).toBeVisible();
    await page.locator('[data-testid="preset-name-input"]').fill("Mock preset: Portrait (edited)");
    await page.locator('[data-testid="save-preset"]').click();
    // exact: a hidden aria-live region also contains the substring "Success".
    await expect(page.getByText("Success", { exact: true })).toBeVisible();
  });
});

test.describe("Studio workflow: vocabulary search", () => {
  test("searches the vocabulary panel and shows a real result", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await open_settings_section(page, "Library");
    await page.locator('[role="tab"]', { hasText: "Vocabulary" }).click();
    await page.locator("#vocabulary-search-input").fill("forest");
    await expect(page.getByText("forest", { exact: false })).toBeVisible({ timeout: 5_000 });
  });
});

test.describe("Studio workflow: workflow import", () => {
  test("imports a ComfyUI workflow JSON file and scans its placeholders", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await open_settings_section(page, "Library");
    await page.locator('[role="tab"]', { hasText: "Workflow" }).click();
    await page.setInputFiles('input[type="file"][accept*="json"]', {
      name: "mock_workflow.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ prompt: "{{positive_prompt}}", seed: "{{seed}}" })),
    });
    await expect(page.locator('[role="dialog"][data-state="open"]')).toBeVisible();
    await page.getByRole("button", { name: "Scan placeholders" }).click();
    await expect(page.getByText("{{positive_prompt}}", { exact: false })).toBeVisible();
  });
});

test.describe("Studio workflow: batch gallery actions", () => {
  test("selects two images and bulk-deletes them", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "gallery", "en");
    // ImageGrid virtualizes rows, so wait for every tile before using a positional nth(1).
    await page.waitForFunction(() => {
      const host = document.getElementById("tavern-canvas-root");
      return (host?.shadowRoot?.querySelectorAll("[aria-pressed]").length ?? 0) >= 6;
    });
    await page.locator(`button[aria-label="Select image: ${SQUARE_GALLERY_RECORD_ID}"]`).click();
    await page.locator(`button[aria-label="Select image: ${DETAILED_GALLERY_RECORD_ID}"]`).click();
    await expect(page.getByText("2 images selected", { exact: false })).toBeVisible();
    await page.getByRole("button", { name: "Delete selected" }).click();
    await page.locator('button[aria-label="Delete"]').click();
    await expect(page.getByText("2 images selected", { exact: false })).toHaveCount(0);
  });
});

test.describe("Studio workflow: HTTP acknowledgment", () => {
  test("shows the plaintext-HTTP risk banner and acknowledges it", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await open_settings_section(page, "Connections");
    await expect(page.locator('[data-testid="http-risk-banner"]')).toBeVisible();
    await page.getByRole("button", { name: "Continue anyway" }).click();
    await expect(page.locator('[data-testid="http-risk-acknowledged"]')).toBeVisible();
    await expect(page.locator('[data-testid="http-risk-banner"]')).toHaveCount(0);
  });
});

test.describe("Studio workflow: archive export/import", () => {
  test("exports a settings archive and imports one back", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await open_settings_section(page, "General");

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Export archive" }).click(),
    ]);
    expect(download.suggestedFilename()).toBe("inkwell-archive.zip");

    await page.setInputFiles('[data-testid="archive-import-input"]', {
      name: "archive.json",
      mimeType: "application/json",
      buffer: Buffer.from("{}"),
    });
    await page.waitForTimeout(200);
    await expect(page.locator('[data-testid="data-settings"] [data-tone="error"]')).toHaveCount(0);
  });
});
