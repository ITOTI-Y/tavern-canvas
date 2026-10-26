import { expect, test } from "@playwright/test";

import { DESKTOP_LARGE, goto_studio, navigate_to_route } from "./studio_harness_utils.js";

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

const SQUARE_GALLERY_RECORD_ID = `00000000-0000-4000-8000-${String(202).padStart(12, "0")}`;
const DETAILED_GALLERY_RECORD_ID = `00000000-0000-4000-8000-${String(205).padStart(12, "0")}`;

test.describe("Studio workflow: the full common generation flow", () => {
  test("provider -> prompt -> reference -> generate -> cancel -> inspect -> copy -> regenerate -> source message", async ({
    page,
  }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });

    await page.locator('[aria-label="Provider profile"]').click();
    await page.getByRole("option", { name: /novelai/iu }).click();
    await expect(page.locator('[aria-label="Provider profile"]')).toContainText("NovelAI");

    await page.locator('[data-testid="positive-prompt-input"]').fill("a fox in a snowy forest");

    await page.locator('[data-testid="reference-add"]').click();
    await page.locator('[data-testid="reference-picker-item"]').first().click();
    await expect(page.locator('[data-testid="reference-item"]')).toHaveCount(1);

    const stepper_increase = page.locator(
      '[data-testid="image-count-stepper"] button[aria-label="Increase"]',
    );
    await stepper_increase.click();
    await stepper_increase.click();
    await stepper_increase.click();
    await expect(page.locator('[data-testid="image-count-stepper"] input')).toHaveValue("4");
    await page.locator('[data-testid="submit-generation"]').click();
    await expect(page.locator('[data-testid="job-row"]')).toHaveCount(5); // 4 seeded + 1 new

    const cancel_buttons = page.locator('[aria-label="Cancel job"]');
    await cancel_buttons.first().click();
    await page.locator('button[aria-label="Confirm"]').click();
    await expect(page.locator('[data-testid="job-row"][data-job-state="cancelled"]')).toHaveCount(
      1,
    );

    const completed_row = page
      .locator('[data-testid="job-row"][data-job-state="completed"]')
      .first();
    await completed_row.locator('[data-testid="job-select"]').click();
    await expect(page.locator('[data-testid="inspector-fields"]')).toBeVisible();
    const preview_tiles = page.locator('[data-testid="completion-preview"] li');
    await expect(preview_tiles).toHaveCount(1);
    await expect(preview_tiles.locator("img")).toHaveCount(1, { timeout: 10_000 });

    await page.locator('[data-testid="copy-parameters"]').click();
    await expect(page.getByText("Copied", { exact: false })).toBeVisible();
    const clipboard_text = await page.evaluate(() => navigator.clipboard.readText());
    expect(JSON.parse(clipboard_text)).toMatchObject({ provider_id: "sd_webui" });

    await navigate_to_route(page, "gallery", "en");
    await page.locator(`button[aria-label="Open preview: ${SQUARE_GALLERY_RECORD_ID}"]`).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Regenerate" }).click();
    await expect(page.locator('[data-testid="workbench-view"]')).toBeVisible();

    await navigate_to_route(page, "gallery", "en");
    await page.locator(`button[aria-label="Open preview: ${SQUARE_GALLERY_RECORD_ID}"]`).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("button", { name: "Go to source message" })).toBeDisabled();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});

test.describe("Studio workflow: preset save", () => {
  test("edits and saves an existing prompt preset", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "prompt", "en");
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
    await navigate_to_route(page, "assets", "en");
    await page.locator('[role="tab"]', { hasText: "Vocabulary" }).click();
    await page.locator("#vocabulary-search-input").fill("forest");
    await expect(page.getByText("forest", { exact: false })).toBeVisible({ timeout: 5_000 });
  });
});

test.describe("Studio workflow: workflow import", () => {
  test("imports a ComfyUI workflow JSON file and scans its placeholders", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "assets", "en");
    await page.locator('[role="tab"]', { hasText: "Workflow" }).click();
    await page.setInputFiles('input[type="file"][accept*="json"]', {
      name: "mock_workflow.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ prompt: "{{positive_prompt}}", seed: "{{seed}}" })),
    });
    await expect(page.getByRole("dialog")).toBeVisible();
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
    await navigate_to_route(page, "settings", "en");
    await expect(page.locator('[data-testid="http-risk-banner"]')).toBeVisible();
    await page.getByRole("button", { name: "Continue anyway" }).click();
    await expect(page.locator('[data-testid="http-risk-acknowledged"]')).toBeVisible();
    await expect(page.locator('[data-testid="http-risk-banner"]')).toHaveCount(0);
  });
});

test.describe("Studio workflow: archive export/import", () => {
  test("exports a settings archive and imports one back", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "settings", "en");

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Export archive" }).click(),
    ]);
    expect(download.suggestedFilename()).toBe("tavern-canvas-archive.json");

    await page.setInputFiles('[data-testid="archive-import-input"]', {
      name: "archive.json",
      mimeType: "application/json",
      buffer: Buffer.from("{}"),
    });
    await page.waitForTimeout(200);
    await expect(page.locator('[data-testid="data-settings"] [data-tone="error"]')).toHaveCount(0);
  });
});

test.describe("Studio workflow: migration status", () => {
  test("shows the completed migration state with counts and a warning", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "diagnostics", "en");
    const status = page.locator('[data-testid="migration-status"]');
    await expect(status).toBeVisible();
    await expect(status.locator('[data-testid="migration-state"]')).toContainText("completed", {
      ignoreCase: true,
    });
    await expect(status).toContainText("171"); // 128 + 42 + 1, the mock's total legacy record count
  });
});
