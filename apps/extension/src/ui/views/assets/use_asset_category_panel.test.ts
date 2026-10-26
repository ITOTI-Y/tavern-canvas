import { describe, expect, it, vi } from "vitest";

import type { StudioController } from "../../controllers/studio_controller.js";
import { use_asset_category_panel } from "./use_asset_category_panel.js";

describe("use_asset_category_panel", () => {
  it("keeps the form open and reports why a save failed", async () => {
    const controller = {
      save_asset: vi.fn(() => Promise.reject(new Error("store unavailable"))),
    } as unknown as StudioController;
    const panel = use_asset_category_panel(
      "outfit",
      controller,
      () => [],
      () => "required",
    );

    panel.open_create();
    panel.name.value = "Forest cloak";
    await panel.save();

    expect(panel.dialog_open.value).toBe(true);
    expect(panel.save_error.value).toBe("store unavailable");
    expect(panel.saving.value).toBe(false);
  });
});
