import { describe, expect, it, vi } from "vitest";

import { create_opening_host, OpeningHostUnavailableError } from "./tavern_helper_opening.js";

function raw(uid: number, name: string, keys: unknown[]): Record<string, unknown> {
  return {
    uid,
    name,
    enabled: true,
    content: `${name} content`,
    strategy: { type: "selective", keys, keys_secondary: { logic: "and_any", keys: [] } },
    position: { type: "before_character_definition", order: uid * 10 },
    probability: 100,
  };
}

function helper(entries: Record<string, unknown>[]) {
  return {
    getWorldbookNames: () => ["book"],
    getWorldbook: vi.fn(() => Promise.resolve(entries)),
    createWorldbook: vi.fn(() => Promise.resolve(true)),
    replaceWorldbook: vi.fn(() => Promise.resolve()),
    deleteWorldbook: vi.fn(() => Promise.resolve(true)),
    getChatWorldbookName: vi.fn((): string | null => {
      throw new Error("no chat");
    }),
    rebindChatWorldbook: vi.fn(() => Promise.resolve()),
    getPresetNames: () => ["in_use", "story"],
    getProxyPresetNames: () => [],
    createChatMessages: vi.fn(() => Promise.resolve()),
  };
}

describe("create_opening_host", () => {
  it("names the JS-Slash-Runner methods it lacks", () => {
    expect(() => create_opening_host({ TavernHelper: { getWorldbookNames: () => [] } })).toThrow(
      OpeningHostUnavailableError,
    );
  });

  it("reads regex keys as /source/flags and writes them back as regexes", async () => {
    const tavern = helper([raw(1, "a", ["城", /锈街?/iu])]);
    const host = create_opening_host({ TavernHelper: tavern });

    const [entry] = await host.read_entries("book");
    expect(entry?.keys).toEqual(["城", "/锈街?/iu"]);
    if (entry === undefined) {
      return;
    }
    await host.save_entries("book", { upsert: [entry], remove: [] });

    const written = tavern.replaceWorldbook.mock.calls[0] as unknown as [
      string,
      Record<string, unknown>[],
    ];
    const keys = (written[1][0]?.strategy as { keys: unknown[] }).keys;
    expect(keys[0]).toBe("城");
    expect(keys[1]).toBeInstanceOf(RegExp);
  });

  it("changes named fields of existing entries, keeps the rest, removes and appends", async () => {
    const tavern = helper([raw(1, "a", ["a"]), raw(2, "b", ["b"])]);
    const host = create_opening_host({ TavernHelper: tavern });

    await host.save_entries("book", {
      upsert: [
        { uid: 1, name: "a2", enabled: false, constant: true, keys: [], content: "x", order: 5 },
        { name: "c", enabled: true, constant: false, keys: ["c"], content: "y", order: 40 },
      ],
      remove: [2],
    });

    const [, written] = tavern.replaceWorldbook.mock.calls[0] as unknown as [
      string,
      Record<string, unknown>[],
    ];
    expect(written).toHaveLength(2);
    expect(written[0]).toMatchObject({
      uid: 1,
      name: "a2",
      enabled: false,
      probability: 100,
      strategy: { type: "constant", keys: [], keys_secondary: { logic: "and_any", keys: [] } },
      position: { type: "before_character_definition", order: 5 },
    });
    expect(written[1]).toMatchObject({ name: "c", strategy: { type: "selective", keys: ["c"] } });
  });

  it("places a new entry and turns off its recursion when the write asks for it", async () => {
    const tavern = helper([]);
    const host = create_opening_host({ TavernHelper: tavern });

    await host.save_entries("book", {
      upsert: [
        {
          name: "rule",
          enabled: true,
          constant: true,
          keys: [],
          content: "x",
          order: 10,
          placement: { position: "after_character_definition", depth: 4, prevent_outgoing: true },
        },
      ],
      remove: [],
    });

    const [, written] = tavern.replaceWorldbook.mock.calls[0] as unknown as [
      string,
      Record<string, unknown>[],
    ];
    expect(written[0]).toMatchObject({
      position: { type: "after_character_definition", role: "system", depth: 4, order: 10 },
      recursion: { prevent_outgoing: true },
    });
  });

  it("reads the open chat's character card with the books bound to it", () => {
    const tavern = {
      ...helper([]),
      getCharWorldbookNames: () => ({ primary: "Eldoria", additional: ["Extra"] }),
    };
    const card = {
      name: "Seraphina",
      data: { description: "d", personality: "p", scenario: "s", first_mes: "hello" },
    };
    const host = create_opening_host({
      TavernHelper: tavern,
      SillyTavern: { getContext: () => ({ characterId: "0", characters: [card] }) },
    });

    expect(host.character()).toEqual({
      name: "Seraphina",
      description: "d",
      personality: "p",
      scenario: "s",
      first_message: "hello",
      worldbooks: ["Eldoria", "Extra"],
    });
    const group = create_opening_host({
      TavernHelper: tavern,
      SillyTavern: { getContext: () => ({ characterId: undefined, characters: [card] }) },
    });
    expect(group.character()).toBeNull();
  });

  it("reports no chat book while no chat is open", () => {
    const host = create_opening_host({ TavernHelper: helper([]) });
    expect(host.chat_worldbook()).toBeNull();
  });
});
