import { describe, expect, it } from "vitest";

import {
  assert_tag_deletable,
  build_image_edit_request,
  can_delete_tag,
  create_tag_edit_draft,
  edit_tag_text,
  find_preset_matches,
  reset_tag_text,
  TagEditError,
  toggle_tag_lock,
} from "./image_edit.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const GENERATION_ANCHOR = "a".repeat(64);
const ASSET_ID = "33333333-3333-4333-8333-333333333333";

describe("tag edit draft: reset/lock/unlock/delete", () => {
  it("edits the current text while leaving original_text untouched", () => {
    const draft = create_tag_edit_draft("tag-1", "a cat, sitting");
    const edited = edit_tag_text(draft, "a cat, sitting, night");
    expect(edited.current_text).toBe("a cat, sitting, night");
    expect(edited.original_text).toBe("a cat, sitting");
  });

  it("reset reverts current_text back to original_text", () => {
    const draft = edit_tag_text(create_tag_edit_draft("tag-1", "a cat"), "a dog");
    const reset = reset_tag_text(draft);
    expect(reset.current_text).toBe("a cat");
  });

  it("locking prevents further edits, resets, and deletes", () => {
    const locked = toggle_tag_lock(create_tag_edit_draft("tag-1", "a cat"));
    expect(locked.locked).toBe(true);
    expect(() => edit_tag_text(locked, "a dog")).toThrow(TagEditError);
    expect(() => reset_tag_text(locked)).toThrow(TagEditError);
    expect(can_delete_tag(locked)).toBe(false);
    expect(() => assert_tag_deletable(locked)).toThrow(TagEditError);
  });

  it("unlocking restores edit/reset/delete", () => {
    const unlocked = toggle_tag_lock(toggle_tag_lock(create_tag_edit_draft("tag-1", "a cat")));
    expect(unlocked.locked).toBe(false);
    expect(() => edit_tag_text(unlocked, "a dog")).not.toThrow();
    expect(can_delete_tag(unlocked)).toBe(true);
  });
});

describe("find_preset_matches: preset-match highlighting underlay", () => {
  it("finds a single preset label occurrence", () => {
    const ranges = find_preset_matches("a cat, masterpiece, sitting", [
      { preset_id: "quality", label: "masterpiece" },
    ]);
    expect(ranges).toEqual([{ start: 7, end: 18, preset_id: "quality" }]);
  });

  it("is case-insensitive", () => {
    const ranges = find_preset_matches("MASTERPIECE quality", [
      { preset_id: "quality", label: "masterpiece" },
    ]);
    expect(ranges).toHaveLength(1);
    expect(ranges[0]).toMatchObject({ start: 0, end: 11 });
  });

  it("prefers the longer of two overlapping preset labels", () => {
    const ranges = find_preset_matches("best quality, quality", [
      { preset_id: "short", label: "quality" },
      { preset_id: "long", label: "best quality" },
    ]);
    expect(ranges).toEqual([
      { start: 0, end: 12, preset_id: "long" },
      { start: 14, end: 21, preset_id: "short" },
    ]);
  });

  it("returns no ranges when nothing matches", () => {
    expect(
      find_preset_matches("no matches here", [{ preset_id: "x", label: "masterpiece" }]),
    ).toEqual([]);
  });

  it("skips blank preset labels", () => {
    expect(find_preset_matches("anything", [{ preset_id: "x", label: "   " }])).toEqual([]);
  });
});

describe("build_image_edit_request", () => {
  it("builds an OpenAI edit-mode request with no mask (whole-image retouch)", () => {
    const request = build_image_edit_request({
      request_id: REQUEST_ID,
      generation_anchor: GENERATION_ANCHOR,
      source_asset_id: ASSET_ID,
      instruction: "make the sky purple",
      provider_id: "openai_image",
    });
    expect(request.provider_id).toBe("openai_image");
    if (request.provider_id === "openai_image") {
      expect(request.mode).toBe("edit");
      expect(request.input_asset_ids).toEqual([ASSET_ID]);
      expect(request.mask_asset_id).toBeUndefined();
    }
    expect(request.prompt).toBe("make the sky purple");
  });

  it("builds a Google edit request via reference_asset_ids", () => {
    const request = build_image_edit_request({
      request_id: REQUEST_ID,
      generation_anchor: GENERATION_ANCHOR,
      source_asset_id: ASSET_ID,
      instruction: "add a hat",
      provider_id: "google_image",
    });
    expect(request.provider_id).toBe("google_image");
    if (request.provider_id === "google_image") {
      expect(request.reference_asset_ids).toEqual([ASSET_ID]);
    }
    expect(request.prompt).toBe("add a hat");
  });
});
