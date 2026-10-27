import { describe, expect, it, vi } from "vitest";
import { reactive } from "vue";

import type { HostAdapter, HostChatSnapshot, HostSwipeLocation } from "../../host/index.js";
import { test_character } from "./wardrobe_test_fixtures.js";
import { WardrobeService, type WardrobeLibraryPort } from "./wardrobe_service.js";

const CHAT: HostChatSnapshot = {
  chat_id: "chat-1",
  messages: [
    {
      message_id: 0,
      name: "A",
      role: "assistant",
      is_hidden: false,
      active_swipe_id: 0,
      swipes: [{ swipe_id: 0, content: "Hello." }],
    },
    {
      message_id: 1,
      name: "U",
      role: "user",
      is_hidden: false,
      active_swipe_id: 0,
      swipes: [{ swipe_id: 0, content: "Get changed." }],
    },
    {
      message_id: 2,
      name: "A",
      role: "assistant",
      is_hidden: false,
      active_swipe_id: 0,
      swipes: [{ swipe_id: 0, content: "Ann puts on a raincoat." }],
    },
    {
      message_id: 3,
      name: "U",
      role: "user",
      is_hidden: false,
      active_swipe_id: 0,
      swipes: [{ swipe_id: 0, content: "Go on." }],
    },
    {
      message_id: 4,
      name: "A",
      role: "assistant",
      is_hidden: false,
      active_swipe_id: 0,
      swipes: [{ swipe_id: 0, content: "They walk." }],
    },
  ],
};

function key(location: HostSwipeLocation): string {
  return `${String(location.message_id)}:${String(location.swipe_id)}`;
}

function create(reply: unknown) {
  const stored = new Map<string, unknown>();
  const host = {
    get_active_chat: () => Promise.resolve(CHAT),
    read_swipe_wardrobe: (location: HostSwipeLocation) => stored.get(key(location)) ?? null,
    write_swipe_wardrobe: (location: HostSwipeLocation, record: unknown) => {
      stored.set(key(location), structuredClone(record));
      return Promise.resolve();
    },
  } as unknown as HostAdapter;
  const library: WardrobeLibraryPort = {
    load: () =>
      Promise.resolve({ characters: [test_character({ id: "c1", name: "Ann" })], outfits: [] }),
    create_character: vi.fn(() => Promise.resolve()),
    create_outfit: vi.fn(() => Promise.resolve()),
    add_appearance: vi.fn(() => Promise.resolve()),
  };
  const run = vi.fn((_input: string) => Promise.resolve(JSON.stringify(reply)));
  let sequence = 0;
  const service = new WardrobeService({
    host,
    library,
    run,
    new_id: () => `new-${String((sequence += 1))}`,
  });
  return { service, stored, library, run };
}

describe("WardrobeService", () => {
  it("records a change on the reply and creates the outfit it introduces", async () => {
    const { service, stored, library, run } = create({
      characters: [
        {
          ref: "c1",
          name: "Ann",
          new_character: null,
          appearance_additions: null,
          wearing_changed: true,
          outfit_id: null,
          new_outfit: { name: "Raincoat", slots: { outerwear: ["yellow raincoat"] } },
          overrides: [],
          conditions: [],
        },
      ],
    });

    await service.update(2);

    expect(run.mock.calls[0]?.[0]).toContain("Latest user message:\nGet changed.");
    expect(library.create_outfit).toHaveBeenCalledWith(
      expect.objectContaining({ id: "new-1", character_id: "c1" }),
      "chat-1",
    );
    expect(stored.get("2:0")).toEqual({
      schema_version: 1,
      wearing: [{ character_id: "c1", outfit_id: "new-1", overrides: {}, conditions: [] }],
    });
  });

  it("lets a later reply inherit the latest earlier snapshot until it gets its own", async () => {
    const { service } = create({ characters: [] });
    const wearing = {
      character_id: "c1",
      outfit_id: "o9",
      overrides: {},
      conditions: ["wet clothes"],
    };
    await service.set_wearing({ chat_id: "chat-1", message_id: 2, swipe_id: 0 }, reactive(wearing));

    await expect(service.current(4)).resolves.toEqual([wearing]);
    await expect(service.current(0)).resolves.toEqual([]);
    await service.update(4);
    expect(service.read({ chat_id: "chat-1", message_id: 4, swipe_id: 0 })).toEqual([wearing]);
  });
});
