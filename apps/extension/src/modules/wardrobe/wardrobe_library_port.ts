import { APPEARANCE_SLOTS, OUTFIT_SLOTS } from "@tavern-canvas/contracts";

import type { AssetsCapability } from "../../ui/contracts/ui_capabilities.js";
import { join_tags, library_in_chat } from "./wardrobe_library.js";
import type { WardrobeLibraryPort } from "./wardrobe_service.js";

/** Stores what the wardrobe update creates as library entries bound to the chat they came from. */
export function create_wardrobe_library_port(assets: AssetsCapability): WardrobeLibraryPort {
  return {
    async load(chat_id) {
      return library_in_chat(await assets.load(), chat_id);
    },
    async create_character(draft, created_from) {
      await assets.save("character", {
        id: draft.id,
        category: "character",
        record_key: "",
        display_name: draft.name,
        payload: {
          aliases: join_tags(draft.aliases),
          subject: draft.subject,
          ...Object.fromEntries(
            APPEARANCE_SLOTS.map((slot) => [slot, join_tags(draft.appearance[slot] ?? [])]),
          ),
          excluded_traits: "",
          default_outfit_id: draft.default_outfit_id ?? "",
          origin: "analysis",
          locked_fields: "",
          chat_id: created_from.chat_id,
          created_from_message_id: created_from.message_id,
        },
      });
    },
    async create_outfit(draft, chat_id) {
      await assets.save("outfit", {
        id: draft.id,
        category: "outfit",
        record_key: "",
        display_name: draft.name,
        payload: {
          character_id: draft.character_id,
          ...Object.fromEntries(
            OUTFIT_SLOTS.map((slot) => [slot, join_tags(draft.slots[slot] ?? [])]),
          ),
          origin: "analysis",
          chat_id,
        },
      });
    },
    async add_appearance(addition) {
      const record = (await assets.load()).character.find(
        (candidate) => candidate.id === addition.character_id,
      );
      if (record === undefined) {
        return;
      }
      const filled = Object.fromEntries(
        Object.entries(addition.slots).map(([slot, tags]) => [slot, join_tags(tags)]),
      );
      await assets.save("character", {
        ...record,
        payload: {
          ...record.payload,
          ...filled,
          ...(addition.subject === null ? {} : { subject: addition.subject }),
        },
      });
    },
  };
}
