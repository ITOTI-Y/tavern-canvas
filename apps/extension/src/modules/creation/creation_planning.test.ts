import { DEFAULT_STRIP_SETTINGS } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import {
  build_scene_input,
  parse_scene_output,
  scene_generation_input,
  strip_paragraphs,
} from "./creation_planning.js";
import type { CreationScene } from "./creation_record.js";

const CONTEXT = { preset: null, library: { characters: [], outfits: [], loras: [] } };

const SCENE: CreationScene = {
  id: "slot_0001",
  enabled: true,
  scene: "A rooftop at night",
  excerpt: "",
  characters: [],
  size: { width: 1216, height: 832 },
  positive_prompt: "rooftop, night",
  negative_prompt: "lowres",
  character_prompts: [],
  image_ids: [],
  active_image_id: null,
  last_error: null,
};

describe("creation planning", () => {
  it("numbers strip paragraphs across messages and names who wrote each", () => {
    const paragraphs = strip_paragraphs([
      { name: "Lin", text: "She ran.\n\nThe wall was high." },
      { name: "You", text: "Over here!" },
    ]);
    expect(paragraphs.map((paragraph) => [paragraph.index, paragraph.text])).toEqual([
      [0, "Lin: She ran."],
      [1, "Lin: The wall was high."],
      [2, "You: Over here!"],
    ]);
  });

  it("asks for a strip without lettering and for a story in story order", () => {
    const paragraphs = strip_paragraphs([{ name: "Lin", text: "She ran." }]);
    expect(build_scene_input("strip", paragraphs, 6, CONTEXT, "")).toContain("no lettering");
    expect(build_scene_input("story", paragraphs, 6, CONTEXT, "")).toContain("in story order");
  });

  it("keeps planned scenes within the paragraphs and the cap, and squares an unknown frame", () => {
    const raw = JSON.stringify({
      scenes: [
        { paragraph: 0, scene: "a", frame: "panorama", tags: "", characters: [] },
        { paragraph: 7, scene: "b", frame: "portrait", tags: "", characters: [] },
        { paragraph: 0, scene: "c", frame: "portrait", tags: "", characters: [] },
        { paragraph: 0, scene: "d", frame: "portrait", tags: "", characters: [] },
      ],
    });
    expect(parse_scene_output(raw, 1, 2).map((plan) => [plan.scene, plan.frame])).toEqual([
      ["a", "square"],
      ["c", "portrait"],
    ]);
  });

  it("adds the strip style and the no-lettering tags to a panel, and only the latter by default", () => {
    const settings = { ...DEFAULT_STRIP_SETTINGS, style_tags: "comic panel", no_text_tags: "text" };
    expect(scene_generation_input(SCENE, { settings, style: "strip" })).toMatchObject({
      positive_prompt: "rooftop, night, comic panel",
      negative_prompt: "lowres, text",
      size: { width: 1216, height: 832 },
    });
    expect(scene_generation_input(SCENE, { settings, style: "default" })).toMatchObject({
      positive_prompt: "rooftop, night",
      negative_prompt: "lowres, text",
    });
    expect(scene_generation_input(SCENE, null).negative_prompt).toBe("lowres");
  });
});
