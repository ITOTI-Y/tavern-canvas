import { SwipeWardrobeSchema, type Wearing } from "@tavern-canvas/contracts";

import type {
  HostAdapter,
  HostChatSnapshot,
  HostJsonSchema,
  HostSwipeLocation,
} from "../../host/index.js";
import type {
  AppearanceAddition,
  CharacterDraft,
  OutfitDraft,
  WardrobeLibrary,
} from "./scene_update.js";

/** Reads the library a chat sees and writes the entries a wardrobe update creates. */
export interface WardrobeLibraryPort {
  load(chat_id: string): Promise<WardrobeLibrary>;
  create_character(draft: CharacterDraft, created_from: HostSwipeLocation): Promise<void>;
  create_outfit(draft: OutfitDraft, chat_id: string): Promise<void>;
  add_appearance(addition: AppearanceAddition): Promise<void>;
}

export interface WardrobeServiceDeps {
  readonly host: HostAdapter;
  readonly library: WardrobeLibraryPort;
  /** Sends the wardrobe request through the analysis preset and connection; resolves with the reply. */
  readonly run: (input: string, json_schema: HostJsonSchema) => Promise<string>;
  readonly new_id: () => string;
}

function location_of(chat: HostChatSnapshot, message_id: number): HostSwipeLocation | null {
  const message = chat.messages.find((candidate) => candidate.message_id === message_id);
  return message === undefined
    ? null
    : { chat_id: chat.chat_id, message_id, swipe_id: message.active_swipe_id };
}

export class WardrobeService {
  readonly #deps: WardrobeServiceDeps;
  readonly #running = new Map<string, Promise<readonly Wearing[]>>();

  constructor(deps: WardrobeServiceDeps) {
    this.#deps = deps;
  }

  /** The snapshot stored on this swipe, or `null` when no update has run for it. */
  read(location: HostSwipeLocation): readonly Wearing[] | null {
    const parsed = SwipeWardrobeSchema.safeParse(this.#deps.host.read_swipe_wardrobe(location));
    return parsed.success ? parsed.data.wearing : null;
  }

  /** The snapshot of the latest earlier assistant reply that has one; empty at the start. */
  inherited(chat: HostChatSnapshot, message_id: number): readonly Wearing[] {
    const earlier = chat.messages
      .filter((message) => message.message_id < message_id && message.role === "assistant")
      .sort((left, right) => right.message_id - left.message_id);
    for (const message of earlier) {
      const snapshot = this.read({
        chat_id: chat.chat_id,
        message_id: message.message_id,
        swipe_id: message.active_swipe_id,
      });
      if (snapshot !== null) {
        return snapshot;
      }
    }
    return [];
  }

  /** The reply's own snapshot, or what it inherits when no update has run for it yet. */
  async current(message_id: number): Promise<readonly Wearing[]> {
    const chat = await this.#deps.host.get_active_chat();
    const location = location_of(chat, message_id);
    return (location === null ? null : this.read(location)) ?? this.inherited(chat, message_id);
  }

  /**
   * Asks the model what the reply changes, records the reply's snapshot and creates the
   * characters and outfits it introduces. Concurrent calls for one swipe share a single request.
   */
  update(message_id: number): Promise<readonly Wearing[]> {
    const pending = this.#deps.host.get_active_chat().then(async (chat) => {
      const location = location_of(chat, message_id);
      if (location === null) {
        throw new Error(`Message ${String(message_id)} is not in the active chat`);
      }
      const key = `${location.chat_id}:${String(message_id)}:${String(location.swipe_id)}`;
      const running = this.#running.get(key);
      if (running !== undefined) {
        return running;
      }
      const run = this.#update(chat, location).finally(() => this.#running.delete(key));
      this.#running.set(key, run);
      return run;
    });
    return pending;
  }

  async #update(chat: HostChatSnapshot, location: HostSwipeLocation): Promise<readonly Wearing[]> {
    const message = chat.messages.find((candidate) => candidate.message_id === location.message_id);
    const reply = message?.swipes[location.swipe_id]?.content ?? "";
    const user_message =
      [...chat.messages]
        .filter((candidate) => candidate.message_id < location.message_id)
        .reverse()
        .find((candidate) => candidate.role === "user")
        ?.swipes.at(0)?.content ?? null;
    const previous = this.inherited(chat, location.message_id);
    const [
      library,
      {
        apply_scene_update,
        build_scene_update_input,
        characters_needing_outfit,
        parse_scene_update,
        scene_update_json_schema,
      },
    ] = await Promise.all([this.#deps.library.load(location.chat_id), import("./scene_update.js")]);
    const needs_outfit = characters_needing_outfit(reply, previous, library);
    const raw = await this.#deps.run(
      build_scene_update_input(user_message, reply, previous, library),
      scene_update_json_schema(needs_outfit.map((character) => character.id)),
    );
    const applied = apply_scene_update(
      parse_scene_update(raw),
      previous,
      library,
      this.#deps.new_id,
    );
    for (const outfit of applied.new_outfits) {
      await this.#deps.library.create_outfit(outfit, location.chat_id);
    }
    for (const character of applied.new_characters) {
      await this.#deps.library.create_character(character, location);
    }
    for (const addition of applied.appearance_additions) {
      await this.#deps.library.add_appearance(addition);
    }
    await this.#write(location, applied.wearing);
    return applied.wearing;
  }

  /** Replaces one character's wearing on this reply; later replies inherit the correction. */
  async set_wearing(location: HostSwipeLocation, wearing: Wearing): Promise<void> {
    const chat = await this.#deps.host.get_active_chat();
    const snapshot = this.read(location) ?? this.inherited(chat, location.message_id);
    await this.#write(location, [
      ...snapshot.filter((item) => item.character_id !== wearing.character_id),
      wearing,
    ]);
  }

  /** Parsing copies the wearing into plain objects, which the host can clone even when Vue passed proxies. */
  #write(location: HostSwipeLocation, wearing: readonly Wearing[]): Promise<void> {
    return this.#deps.host.write_swipe_wardrobe(
      location,
      SwipeWardrobeSchema.parse({ schema_version: 1, wearing }),
    );
  }
}
