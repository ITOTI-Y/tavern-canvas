import "fake-indexeddb/auto";

import {
  create_business_repositories,
  dispose_database,
  open_database,
} from "@tavern-canvas/storage";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { create_assets_capability } from "./assets_capability.js";

afterEach(async () => {
  await dispose_database();
  await deleteDB("tavern_canvas_v3");
});

// The second id sorts before the first, so id order would put "Forest cloak" first.
const LACE = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const CLOAK = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

describe("create_assets_capability", () => {
  it("lists new entries in creation order and keeps that order when one is edited", async () => {
    const assets = create_assets_capability({
      repositories: create_business_repositories(await open_database()),
      namespace: () => "primary",
      now: () => "2026-10-27T00:00:00.000Z",
    });
    const outfit = (id: string, name: string) => ({
      id,
      category: "outfit" as const,
      record_key: id,
      display_name: name,
      payload: { description: name },
    });

    await assets.save("outfit", outfit(LACE, "Lace dress"));
    await assets.save("outfit", outfit(CLOAK, "Forest cloak"));
    await assets.save("outfit", outfit(LACE, "Lace dress v2"));

    const names = (await assets.load()).outfit.map((record) => record.display_name);
    expect(names).toEqual(["Lace dress v2", "Forest cloak"]);
  });
});
