import { describe, expect, it } from "vitest";

import { preset_of, resize } from "./image_size.js";

describe("image size", () => {
  it("names a standard canvas and leaves custom sizes unnamed", () => {
    expect(preset_of({ width: 832, height: 1216 })).toBe("portrait");
    expect(preset_of({ width: 832, height: 1280 })).toBeNull();
  });

  it("keeps the ratio on the 64 px grid when locked and changes one side when free", () => {
    const portrait = { width: 832, height: 1216 };
    expect(resize(portrait, "width", 1024, 832 / 1216)).toEqual({ width: 1024, height: 1472 });
    expect(resize(portrait, "height", 1280, 832 / 1216)).toEqual({ width: 896, height: 1280 });
    expect(resize(portrait, "width", 896, null)).toEqual({ width: 896, height: 1216 });
  });

  it("clamps the derived side to the allowed range", () => {
    expect(resize({ width: 512, height: 2048 }, "width", 1024, 512 / 2048)).toEqual({
      width: 1024,
      height: 2048,
    });
  });
});
