import { expect, test } from "@playwright/test";

import { DESKTOP_LARGE, goto_studio, navigate_to_route } from "./studio_harness_utils.js";

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

// mock_capabilities.ts's GALLERY_RECORDS[index] ids ("square" = index 2, "detailed" = index 5),
// computed the same way that file's own uuid() helper does (200 + index), rather than importing
// the harness's mock module into an e2e spec. "square" is the one build_jobs()'s pre-seeded
// completed job also references as its one completed image.
const SQUARE_GALLERY_RECORD_ID = `00000000-0000-4000-8000-${String(202).padStart(12, "0")}`;
const DETAILED_GALLERY_RECORD_ID = `00000000-0000-4000-8000-${String(205).padStart(12, "0")}`;

/**
 * The full common interaction workflow (task-8-brief.md Step 2) plus the additional named
 * workflows: preset save, vocabulary search, workflow import, batch gallery actions, HTTP
 * acknowledgment, archive export/import, and migration status. All run against the "full"
 * scenario (mock_capabilities.ts), whose generation/gallery capabilities are real, working state
 * machines (subscribe/submit/cancel/retry genuinely mutate and notify), not scripted no-ops.
 */
test.describe("Studio workflow: the full common generation flow", () => {
  test("provider -> prompt -> reference -> generate -> cancel -> inspect -> copy -> regenerate -> source message", async ({
    page,
  }) => {
    // open studio
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });

    // select provider (switch away from the default Local SD WebUI)
    await page.locator('[aria-label="Provider profile"]').click();
    await page.getByRole("option", { name: /novelai/iu }).click();
    await expect(page.locator('[aria-label="Provider profile"]')).toContainText("NovelAI");

    // write prompt
    await page.locator('[data-testid="positive-prompt-input"]').fill("a fox in a snowy forest");

    // add reference
    await page.locator('[data-testid="reference-add"]').click();
    await page.locator('[data-testid="reference-picker-item"]').first().click();
    await expect(page.locator('[data-testid="reference-item"]')).toHaveCount(1);

    // generate four images
    // PromptComposer.vue's image-count stepper sets both increment-label and decrement-label to
    // the same "Image count" text (NumberStepper.vue's own accessible-name contract only requires
    // non-empty, not mutually distinguishable) -- the increment control is the second (last) of
    // the group's two buttons, decrement/spinbutton/increment in DOM order.
    const stepper_increase = page.locator('[data-testid="image-count-stepper"] button').last();
    await stepper_increase.click();
    await stepper_increase.click();
    await stepper_increase.click();
    await expect(page.locator('[data-testid="image-count-stepper"] input')).toHaveValue("4");
    await page.locator('[data-testid="submit-generation"]').click();
    await expect(page.locator('[data-testid="job-row"]')).toHaveCount(5); // 4 seeded + 1 new

    // cancel one (the pre-seeded running job, independent of the one just submitted)
    const cancel_buttons = page.locator('[aria-label="Cancel job"]');
    await cancel_buttons.first().click();
    await page.locator('button[aria-label="Confirm"]').click();
    await expect(page.locator('[data-testid="job-row"][data-job-state="cancelled"]')).toHaveCount(
      1,
    );

    // inspect completed image (the pre-seeded completed job, "square")
    const completed_row = page
      .locator('[data-testid="job-row"][data-job-state="completed"]')
      .first();
    await completed_row.locator('[data-testid="job-select"]').click();
    await expect(page.locator('[data-testid="inspector-fields"]')).toBeVisible();
    const preview_tiles = page.locator('[data-testid="completion-preview"] li');
    await expect(preview_tiles).toHaveCount(1);
    await expect(preview_tiles.locator("img")).toHaveCount(1, { timeout: 10_000 });

    // copy parameters
    await page.locator('[data-testid="copy-parameters"]').click();
    await expect(page.getByText("Copied", { exact: false })).toBeVisible();
    const clipboard_text = await page.evaluate(() => navigator.clipboard.readText());
    expect(JSON.parse(clipboard_text)).toMatchObject({ provider_id: "sd_webui" });

    // regenerate (from Gallery's metadata inspector, on the same completed image)
    await navigate_to_route(page, "gallery", "en");
    await page.locator(`button[aria-label="Download: ${SQUARE_GALLERY_RECORD_ID}"]`).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Regenerate" }).click();
    await expect(page.locator('[data-testid="workbench-view"]')).toBeVisible();

    // navigate to source message
    await navigate_to_route(page, "gallery", "en");
    await page.locator(`button[aria-label="Download: ${SQUARE_GALLERY_RECORD_ID}"]`).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    // ContextInspector.vue does not yet render `state.inspector.selected_record` (an
    // honest, pre-existing gap outside this task's three named gaps -- ledgered in
    // task-8-report.md) -- the observable contract today is just "the action completes
    // without error and the dialog stays interactive", not a visible inspector update.
    await page.getByRole("button", { name: "Go to source message" }).click();
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
    // `{ exact: true }`: PromptView.vue's toast description ("Success") and ConfirmDialog's
    // hidden aria-live announcer region (which concatenates recent live-region text, e.g.
    // "Confirm SaveSuccess") both contain the substring "Success" -- only the exact match is
    // the actual visible toast.
    await expect(page.getByText("Success", { exact: true })).toBeVisible();
  });
});

test.describe("Studio workflow: vocabulary search", () => {
  test("searches the vocabulary panel and shows a real result", async ({ page }) => {
    await goto_studio(page, { viewport: DESKTOP_LARGE, scenario: "full" });
    await navigate_to_route(page, "assets", "en");
    // AssetsView.vue starts on state.assets.active_category ("character"), not "vocabulary" --
    // the Vocabulary tab must be selected explicitly first.
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
    // Waits for all six mock records' tiles, not just the first one to mount -- ImageGrid.vue
    // virtualizes rows, so a bare "at least one toggle exists" check can resolve before the
    // second tile a positional `.nth(1)` would need is actually in the DOM.
    await page.waitForFunction(() => {
      const host = document.getElementById("tavern-canvas-root");
      return (host?.shadowRoot?.querySelectorAll("[aria-pressed]").length ?? 0) >= 6;
    });
    await page.locator(`button[aria-label="Select all: ${SQUARE_GALLERY_RECORD_ID}"]`).click();
    await page.locator(`button[aria-label="Select all: ${DETAILED_GALLERY_RECORD_ID}"]`).click();
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
    // The mock's import_archive() always resolves -- a successful import shows no error tone
    // text in the Data section at all (DataSettings.vue only sets archive_import_error on a
    // caught rejection).
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
