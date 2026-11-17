import { describe, expect, it } from "vitest";

import {
  accept_slim,
  is_slim_candidate,
  slim_batches,
  slim_request,
  type SlimSource,
} from "./slim_requests.js";
import { content_hash, create_slim_store } from "./slim_store.js";

const LONG = "迷雾港是一座建在悬崖上的港口城市。".repeat(30);

function source(uid: number, content: string, keys: string[] = ["迷雾港"]): SlimSource {
  return { uid, name: `entry ${String(uid)}`, keys, content };
}

describe("world info condensing", () => {
  it("condenses only long entries without per-scan random macros", () => {
    expect(is_slim_candidate(source(1, LONG))).toBe(true);
    expect(is_slim_candidate(source(2, "短"))).toBe(false);
    expect(is_slim_candidate(source(3, `${LONG}{{random:a,b}}`))).toBe(false);
  });

  it("splits entries into batches of bounded text", () => {
    const sources = Array.from({ length: 30 }, (_, index) => source(index, "x".repeat(1000)));

    expect(slim_batches(sources).map((batch) => batch.length)).toEqual([6, 6, 6, 6, 6]);
  });

  it("accepts a condensed text only when it is shorter and keeps the keys the original names", () => {
    const original = source(1, LONG, ["迷雾港", "不在原文中"]);

    expect(accept_slim(original, "迷雾港：悬崖港口城市。")).toBe(true);
    expect(accept_slim(original, "悬崖港口城市。")).toBe(false);
    expect(accept_slim(original, LONG)).toBe(false);
  });

  it("reads the tool call of a condensing request", () => {
    const request = slim_request([source(7, LONG)]);
    const calls = [
      { name: "submit_slim", arguments: JSON.stringify({ entries: [{ uid: 7, slim: "s" }] }) },
    ];

    expect(request.tools?.parse(calls, "")).toEqual([{ uid: 7, slim: "s" }]);
    expect(request.tools?.user_input).toContain("### uid 7: entry 7");
  });

  it("returns a stored condensed text only for the exact original it was made from", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    } as unknown as Storage;
    const store = create_slim_store(storage);
    const hash = content_hash(LONG);

    store.save("book", [{ uid: 7, hash, slim: "s" }]);

    expect(store.lookup("book", 7, hash)).toBe("s");
    expect(store.lookup("book", 7, content_hash(`${LONG}改`))).toBeNull();
    expect(
      create_slim_store(storage)
        .matching("book", new Map([[7, hash]]))
        .get(7),
    ).toBe("s");
  });
});
