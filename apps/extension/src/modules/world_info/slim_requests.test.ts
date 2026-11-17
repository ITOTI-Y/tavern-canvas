import { describe, expect, it } from "vitest";

import { accept_slim, is_slim_candidate, slim_request, type SlimSource } from "./slim_requests.js";
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

  it("accepts a condensed text only when it is shorter and keeps the keys the original names", () => {
    const original = source(1, LONG, ["迷雾港", "不在原文中"]);

    expect(accept_slim(original, "迷雾港：悬崖港口城市。")).toBe(true);
    expect(accept_slim(original, "悬崖港口城市。")).toBe(false);
    expect(accept_slim(original, LONG)).toBe(false);
  });

  it("condenses one entry per request through a forced tool call", () => {
    const { preamble, request } = slim_request(source(7, LONG), "");
    const calls = [{ name: "submit_slim", arguments: JSON.stringify({ slim: "s" }) }];

    expect(preamble.map((message) => message.role)).toEqual(["system"]);
    expect(request.tools?.user_input).toContain(LONG.trim());
    expect(request.tools?.choice).toEqual({ name: "submit_slim" });
    expect(request.tools?.parse(calls, "")).toBe("s");
  });

  it("adds the user's requirements only when there are some", () => {
    const guided = slim_request(source(7, LONG), "  保留全部对白  ").request.tools?.user_input;

    expect(guided).toContain("The user's requirements");
    expect(guided).toContain("保留全部对白");
    expect(slim_request(source(7, LONG), " ").request.tools?.user_input).not.toContain(
      "The user's requirements",
    );
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

  it("removes a stored text and shows other instances the change at once", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    } as unknown as Storage;
    const studio = create_slim_store(storage);
    const generation = create_slim_store(storage);
    const hash = content_hash(LONG);
    expect(generation.lookup("book", 7, hash)).toBeNull();

    studio.save("book", [{ uid: 7, hash, slim: "s" }]);
    expect(generation.lookup("book", 7, hash)).toBe("s");

    expect(studio.remove("book", 7)).toEqual({ hash, slim: "s" });
    expect(generation.lookup("book", 7, hash)).toBeNull();
    expect(studio.get("book", 7)).toBeNull();
  });
});
