import { DEFAULT_STRIP_SETTINGS } from "@tavern-canvas/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { Creation, CreationScene } from "../../../modules/creation/creation_record.js";
import type { CreationPort } from "../../contracts/creation_port.js";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import { use_creation_store } from "./use_creation_store.js";

function scene(id: string): CreationScene {
  return {
    id,
    enabled: true,
    scene: `scene ${id}`,
    excerpt: "",
    characters: [],
    size: { width: 1216, height: 832 },
    positive_prompt: "rooftop",
    negative_prompt: "lowres",
    character_prompts: [],
    image_ids: [],
    active_image_id: null,
    last_error: null,
  };
}

function strip(): Creation {
  return {
    id: "creation-1",
    display_name: "Messages 3–4",
    kind: "strip",
    created_at: "2026-11-06T10:00:00.000Z",
    story: "",
    worldbooks: [],
    chat_id: "chat",
    from_message: 3,
    to_message: 4,
    style: "strip",
    scenes: [scene("a"), scene("b")],
  };
}

function setup() {
  const saved: Omit<AssetRecordSummary, "updated_at">[] = [];
  const store = use_creation_store({
    records: () => [],
    save: (record) => {
      saved.push(structuredClone(record));
      return Promise.resolve();
    },
    remove: () => Promise.resolve(),
    strip_settings: () => ({
      ...DEFAULT_STRIP_SETTINGS,
      style_tags: "comic",
      no_text_tags: "text",
    }),
    on_save_error: (error) => {
      throw error;
    },
  });
  return { store, saved };
}

afterEach(() => {
  vi.useRealTimers();
});

describe("creation store", () => {
  it("draws the scenes in order, keeps a failed one's reason, and saves after each picture", async () => {
    const { store, saved } = setup();
    await store.add(strip());
    const generate = vi
      .fn<CreationPort["generate"]>()
      .mockResolvedValueOnce("image-a")
      .mockRejectedValueOnce(new Error("quota"));
    const port: CreationPort = {
      plan_story: vi.fn(),
      strip_messages: vi.fn(),
      plan_strip: vi.fn(),
      generate,
    };

    await store.generate(port, "creation-1", ["a", "b"]);

    await vi.waitFor(() => {
      const last = saved.at(-1)?.payload as unknown as Creation;
      expect(last.scenes.map((s) => [s.active_image_id, s.last_error])).toEqual([
        ["image-a", null],
        [null, "quota"],
      ]);
    });
    expect(generate.mock.calls.map(([input]) => input.positive_prompt)).toEqual([
      "rooftop, comic",
      "rooftop, comic",
    ]);
    expect(generate.mock.calls[0]?.[0].negative_prompt).toBe(
      "lowres, text, comic, multiple views, 4koma, split screen",
    );
    expect(saved.length).toBeGreaterThanOrEqual(3);
    expect(store.pending.size).toBe(0);
  });

  it("collapses a burst of text edits into one save after the pause", async () => {
    vi.useFakeTimers();
    const { store, saved } = setup();
    await store.add(strip());
    const before = saved.length;

    for (const text of ["a", "ab", "abc"]) {
      store.edit(
        "creation-1",
        (creation) => {
          const first = creation.scenes[0];
          if (first !== undefined) {
            first.scene = text;
          }
        },
        { debounce: true },
      );
    }
    expect(saved.length).toBe(before);

    await vi.runAllTimersAsync();
    expect(saved.length).toBe(before + 1);
    expect((saved.at(-1)?.payload as unknown as Creation).scenes[0]?.scene).toBe("abc");
  });
});
