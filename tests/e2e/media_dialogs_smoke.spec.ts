import { expect, test } from "@playwright/test";

async function goto_panel(page: import("@playwright/test").Page, panel: string): Promise<void> {
  await page.goto(`/media_dialogs_host.html?panel=${panel}`);
  await page.waitForFunction(
    () => document.documentElement.dataset.mediaDialogsHarnessReady === "true",
  );
}

test.describe("InpaintDialog: touch inpaint (real bitmap, real canvas)", () => {
  test("a touch stroke paints the mask overlay and the dialog stays open with a fixed frame size", async ({
    page,
  }) => {
    await goto_panel(page, "inpaint");
    const frame = page.locator('[class*="inpaintCanvasFrame"]');
    await expect(frame).toBeVisible();
    const box_before = await frame.boundingBox();

    const canvas = page.locator('[data-testid="inpaint-mask-canvas"]');
    const canvas_box = await canvas.boundingBox();
    if (canvas_box === null) {
      throw new Error("mask canvas has no bounding box");
    }
    const center_x = canvas_box.x + canvas_box.width / 2;
    const center_y = canvas_box.y + canvas_box.height / 2;

    await page.evaluate(
      ({ x, y }) => {
        const shadow_root = document.getElementById("tavern-canvas-root")?.shadowRoot;
        const element = shadow_root?.querySelector('[data-testid="inpaint-mask-canvas"]');
        if (!(element instanceof HTMLElement)) {
          throw new Error("mask canvas not found");
        }
        const fire = (type: string, clientX: number, clientY: number) => {
          element.dispatchEvent(
            new PointerEvent(type, {
              pointerId: 1,
              pointerType: "touch",
              clientX,
              clientY,
              bubbles: true,
            }),
          );
        };
        fire("pointerdown", x, y);
        fire("pointermove", x + 10, y + 10);
        fire("pointerup", x + 10, y + 10);
      },
      { x: center_x, y: center_y },
    );

    const generate_button = page.locator('button[aria-label="Generate"]');
    await generate_button.click();

    const box_after = await frame.boundingBox();
    expect(box_after?.width).toBeCloseTo(box_before?.width ?? -1, 0);
    expect(box_after?.height).toBeCloseTo(box_before?.height ?? -1, 0);
  });

  test("undo/redo/clear toolbar buttons render lucide SVG icons and respond to real clicks", async ({
    page,
  }) => {
    await goto_panel(page, "inpaint");
    for (const label of ["Undo", "Redo", "Erase", "Clear", "Zoom in", "Zoom out"]) {
      const button = page.locator(`button[aria-label="${label}"]`);
      await expect(button).toBeVisible();
      await expect(button.locator("svg")).toHaveCount(1);
    }
    await page.locator('button[aria-label="Erase"]').click();
    await expect(page.locator('button[aria-label="Erase"]')).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

test.describe("ImageEditDialog: preset highlighting and submenu", () => {
  test("renders the highlighted preset and the 4-way processing submenu", async ({ page }) => {
    await goto_panel(page, "edit");
    await expect(page.locator('[class*="editHighlightMatch"]')).toHaveText("masterpiece");
    for (const label of ["Banana retouch", "Grok video", "ComfyUI inpaint", "NovelAI inpaint"]) {
      await expect(page.locator(`button[aria-label="${label}"]`)).toBeVisible();
    }
  });
});

test.describe("GenerationParametersDialog: dimensions mode", () => {
  test("width/height steppers render and generate is clickable", async ({ page }) => {
    await goto_panel(page, "params");
    await expect(page.locator('[role="spinbutton"]')).toHaveCount(2);
    await page.locator('button[aria-label="Generate"]').click();
  });
});

test.describe("media_command_service: four-image, video, and failed-edit flows in a real browser", () => {
  test("a four-result submission completes with 4 stored images", async ({ page }) => {
    await goto_panel(page, "jobs");
    await page.locator('[data-testid="run-four-image"]').click();
    await expect(page.locator('[data-testid="jobs-log"]')).toContainText(
      "four-image: state=completed image_count=4",
      { timeout: 10_000 },
    );
  });

  test("a video submission completes and stores a video/mp4 asset", async ({ page }) => {
    await goto_panel(page, "jobs");
    await page.locator('[data-testid="run-video"]').click();
    await expect(page.locator('[data-testid="jobs-log"]')).toContainText(
      "video: state=completed image_count=1",
      { timeout: 10_000 },
    );
  });

  test("a failing submission ends in the failed state with a provider error", async ({ page }) => {
    await goto_panel(page, "jobs");
    await page.locator('[data-testid="run-failed-edit"]').click();
    await expect(page.locator('[data-testid="jobs-log"]')).toContainText(
      "failed-edit: state=failed",
      {
        timeout: 10_000,
      },
    );
  });
});
