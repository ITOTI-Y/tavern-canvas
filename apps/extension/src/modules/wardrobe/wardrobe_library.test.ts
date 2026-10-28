import { describe, expect, it } from "vitest";

import type { AssetRecordSummary } from "../../ui/contracts/ui_capabilities.js";
import { library_in_chat } from "./wardrobe_library.js";

function record(
  category: "character" | "outfit",
  id: string,
  payload: Record<string, unknown>,
): AssetRecordSummary {
  return {
    id,
    category,
    record_key: id,
    display_name: id,
    updated_at: "2026-10-28T00:00:00.000Z",
    payload,
  } as AssetRecordSummary;
}

describe("library_in_chat", () => {
  it("shows a global character's default outfit even when it was created in another chat", () => {
    const library = library_in_chat(
      {
        character: [
          record("character", "global-char", { chat_id: "", default_outfit_id: "first-outfit" }),
          record("character", "other-char", { chat_id: "chat-a", default_outfit_id: "a-outfit" }),
        ],
        outfit: [
          record("outfit", "first-outfit", { character_id: "global-char", chat_id: "chat-a" }),
          record("outfit", "variant", { character_id: "global-char", chat_id: "chat-a" }),
          record("outfit", "a-outfit", { character_id: "other-char", chat_id: "chat-a" }),
          record("outfit", "own", { character_id: "global-char", chat_id: "chat-b" }),
        ],
      },
      "chat-b",
    );

    expect(library.characters.map((character) => character.id)).toEqual(["global-char"]);
    expect(library.outfits.map((outfit) => outfit.id)).toEqual(["first-outfit", "own"]);
  });
});
