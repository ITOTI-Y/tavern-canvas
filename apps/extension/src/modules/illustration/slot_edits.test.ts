import {
  NovelAiRequestSchema,
  RequestIdSchema,
  Sha256Schema,
  type AssetId,
} from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import { build_novelai_edit_request, fit_novelai_canvas } from "./slot_edits.js";

const IMAGE_ID = "01906f4e-5f1c-7a2a-8d73-cc3a51abf1ed";
const MASK_ID = "6ba7b810-9dad-41d1-80b4-00c04fd430c8" as AssetId;
const CONTEXT = {
  request_id: RequestIdSchema.parse("550e8400-e29b-41d4-a716-446655440000"),
  generation_anchor: Sha256Schema.parse("a".repeat(64)),
  model_id: "nai-diffusion-4-5-full",
};

describe("fit_novelai_canvas", () => {
  it("keeps an aligned canvas and shrinks an oversized one to 64-px multiples", () => {
    expect(fit_novelai_canvas({ width: 832, height: 1216 })).toEqual({ width: 832, height: 1216 });
    const fitted = fit_novelai_canvas({ width: 4000, height: 3000 });
    expect(fitted.width % 64).toBe(0);
    expect(fitted.height % 64).toBe(0);
    expect(fitted.width * fitted.height).toBeLessThanOrEqual(3_145_728);
  });
});

describe("build_novelai_edit_request", () => {
  const source = { width: 1000, height: 1500 };

  it("builds a valid img2img request at the fitted size", () => {
    const request = build_novelai_edit_request(
      {
        kind: "img2img",
        image_id: IMAGE_ID,
        source,
        positive_prompt: "1girl",
        negative_prompt: "",
        strength: 0.6,
      },
      CONTEXT,
    );

    expect(NovelAiRequestSchema.parse(request)).toMatchObject({
      action: "img2img",
      image_asset_id: IMAGE_ID,
      width: 960,
      height: 1472,
      strength: 0.6,
    });
  });

  it("builds a valid infill request with the stored mask", () => {
    const request = build_novelai_edit_request(
      {
        kind: "inpaint",
        image_id: IMAGE_ID,
        source,
        mask_png: new Uint8Array([1]),
        positive_prompt: "red dress",
        negative_prompt: "lowres",
        strength: 0.8,
      },
      { ...CONTEXT, mask_asset_id: MASK_ID },
    );

    expect(NovelAiRequestSchema.parse(request)).toMatchObject({
      action: "infill",
      mask_asset_id: MASK_ID,
      inpaint_strength: 0.8,
    });
  });

  it.each([
    [{ kind: "upscale", image_id: IMAGE_ID }],
    [{ kind: "augment", image_id: IMAGE_ID, tool: "lineart" }],
    [{ kind: "augment", image_id: IMAGE_ID, tool: "emotion", emotion: "happy", defry: 1 }],
  ] as const)("builds a valid tool request for %o", (edit) => {
    expect(NovelAiRequestSchema.safeParse(build_novelai_edit_request(edit, CONTEXT)).success).toBe(
      true,
    );
  });
});
