import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  DANBOORU_MIN_REQUEST_DELAY_MS,
  danbooru_category_name,
  DanbooruApiError,
  fetch_danbooru_tag_aliases,
  fetch_danbooru_tags,
  read_checkpoint,
  write_checkpoint,
  type DanbooruTag,
  type DanbooruTagAlias,
  type FetchLike,
} from "./danbooru_client.js";

// Recorded-shape fixtures mirroring real /tags.json and /tag_aliases.json
// response objects (field names verified against Danbooru's public API
// docs), never fetched live — this environment's IP is Cloudflare-blocked
// for danbooru.donmai.us.
const TAG_PAGE_1: DanbooruTag[] = [
  { id: 1, name: "1girl", category: 0, post_count: 8_243_826 },
  { id: 2, name: "solo", category: 0, post_count: 7_000_000 },
];
const TAG_PAGE_2: DanbooruTag[] = [
  { id: 3, name: "hatsune_miku", category: 4, post_count: 300_000 },
];

function json_response(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    statusText: ok ? "OK" : "Error",
    json: () => Promise.resolve(body),
  };
}

function make_paged_fetch(pages: unknown[][]): { fetch_impl: FetchLike; calls: string[] } {
  const calls: string[] = [];
  let call_index = 0;
  const fetch_impl: FetchLike = (url) => {
    calls.push(url);
    const page = pages[call_index] ?? [];
    call_index += 1;
    return Promise.resolve(json_response(page));
  };
  return { fetch_impl, calls };
}

async function collect<T>(generator: AsyncGenerator<T[]>): Promise<T[]> {
  const results: T[] = [];
  for await (const page of generator) {
    results.push(...page);
  }
  return results;
}

describe("danbooru_category_name", () => {
  it("maps known Danbooru category ids to names", () => {
    expect(danbooru_category_name(0)).toBe("general");
    expect(danbooru_category_name(1)).toBe("artist");
    expect(danbooru_category_name(3)).toBe("copyright");
    expect(danbooru_category_name(4)).toBe("character");
    expect(danbooru_category_name(5)).toBe("meta");
  });

  it("falls back to the numeric string for an unrecognized category id", () => {
    expect(danbooru_category_name(99)).toBe("99");
  });
});

describe("fetch_danbooru_tags", () => {
  it("paginates by id cursor across pages with a page_limit of exactly the page size, stopping on a short page", async () => {
    const { fetch_impl, calls } = make_paged_fetch([TAG_PAGE_1, TAG_PAGE_2]);

    const results = await collect(
      fetch_danbooru_tags({
        user_agent: "test-bot/1.0 (test)",
        fetch_impl,
        page_limit: 2,
        delay_fn: () => Promise.resolve(),
      }),
    );

    expect(results).toEqual([...TAG_PAGE_1, ...TAG_PAGE_2]);
    expect(calls).toHaveLength(2);
  });

  it("stops immediately on an empty first page", async () => {
    const { fetch_impl, calls } = make_paged_fetch([[]]);

    const results = await collect(
      fetch_danbooru_tags({
        user_agent: "test-bot/1.0",
        fetch_impl,
        delay_fn: () => Promise.resolve(),
      }),
    );

    expect(results).toEqual([]);
    expect(calls).toHaveLength(1);
  });

  it("builds the documented query: search[id]=>cursor, search[order]=id, limit, search[post_count]=>=min", async () => {
    const { fetch_impl, calls } = make_paged_fetch([TAG_PAGE_1]);

    await collect(
      fetch_danbooru_tags({
        user_agent: "test-bot/1.0",
        fetch_impl,
        page_limit: 1000,
        min_post_count: 50,
        start_after_id: 10,
        delay_fn: () => Promise.resolve(),
      }),
    );

    const url = new URL(calls[0] ?? "");
    expect(url.pathname).toBe("/tags.json");
    expect(url.searchParams.get("search[id]")).toBe(">10");
    expect(url.searchParams.get("search[order]")).toBe("id");
    expect(url.searchParams.get("limit")).toBe("1000");
    expect(url.searchParams.get("search[post_count]")).toBe(">=50");
  });

  it("advances the cursor to the max id seen, not just the last record", async () => {
    const out_of_order_page: DanbooruTag[] = [
      { id: 5, name: "a", category: 0, post_count: 1 },
      { id: 9, name: "b", category: 0, post_count: 1 },
      { id: 7, name: "c", category: 0, post_count: 1 },
    ];
    const { fetch_impl, calls } = make_paged_fetch([out_of_order_page, TAG_PAGE_2]);

    await collect(
      fetch_danbooru_tags({
        user_agent: "test-bot/1.0",
        fetch_impl,
        page_limit: 3,
        delay_fn: () => Promise.resolve(),
      }),
    );

    const second_url = new URL(calls[1] ?? "");
    expect(second_url.searchParams.get("search[id]")).toBe(">9");
  });

  it("sends the explicit User-Agent header on every request", async () => {
    const calls: { headers: Record<string, string> }[] = [];
    const fetch_impl: FetchLike = (_url, init) => {
      calls.push(init);
      return Promise.resolve(json_response([]));
    };

    await collect(
      fetch_danbooru_tags({
        user_agent: "vocab-source-test/1.0 (contact: test@example.com)",
        fetch_impl,
        delay_fn: () => Promise.resolve(),
      }),
    );

    expect(calls[0]?.headers["User-Agent"]).toBe(
      "vocab-source-test/1.0 (contact: test@example.com)",
    );
  });

  it("awaits delay_fn with min_request_delay_ms between requests, but not before the first request", async () => {
    const { fetch_impl } = make_paged_fetch([TAG_PAGE_1, TAG_PAGE_2]);
    const delay_calls: number[] = [];

    await collect(
      fetch_danbooru_tags({
        user_agent: "test-bot/1.0",
        fetch_impl,
        page_limit: 2,
        delay_fn: (ms) => {
          delay_calls.push(ms);
          return Promise.resolve();
        },
      }),
    );

    expect(delay_calls).toEqual([DANBOORU_MIN_REQUEST_DELAY_MS]);
  });

  it("rejects a min_request_delay_ms below the documented floor", async () => {
    const { fetch_impl } = make_paged_fetch([TAG_PAGE_1]);
    const generator = fetch_danbooru_tags({
      user_agent: "test-bot/1.0",
      fetch_impl,
      min_request_delay_ms: 10,
    });

    await expect(generator.next()).rejects.toThrow(RangeError);
  });

  it("throws DanbooruApiError on a non-ok response instead of yielding it as data", async () => {
    const fetch_impl: FetchLike = () =>
      Promise.resolve(json_response({ error: "rate limited" }, false, 429));
    const generator = fetch_danbooru_tags({
      user_agent: "test-bot/1.0",
      fetch_impl,
      delay_fn: () => Promise.resolve(),
    });

    await expect(generator.next()).rejects.toThrow(DanbooruApiError);
  });

  it("throws on a response shape that fails DanbooruTagSchema validation", async () => {
    const fetch_impl: FetchLike = () => Promise.resolve(json_response([{ id: "not-a-number" }]));
    const generator = fetch_danbooru_tags({
      user_agent: "test-bot/1.0",
      fetch_impl,
      delay_fn: () => Promise.resolve(),
    });

    await expect(generator.next()).rejects.toThrow();
  });
});

describe("fetch_danbooru_tag_aliases", () => {
  it("paginates aliases the same way as tags", async () => {
    const page: DanbooruTagAlias[] = [
      { id: 1, antecedent_name: "1girls", consequent_name: "1girl", status: "active" },
    ];
    const { fetch_impl, calls } = make_paged_fetch([page]);

    const results = await collect(
      fetch_danbooru_tag_aliases({
        user_agent: "test-bot/1.0",
        fetch_impl,
        delay_fn: () => Promise.resolve(),
      }),
    );

    expect(results).toEqual(page);
    const url = new URL(calls[0] ?? "");
    expect(url.pathname).toBe("/tag_aliases.json");
    expect(url.searchParams.get("search[order]")).toBe("id");
  });
});

describe("checkpoint round trip", () => {
  let temp_dir: string;

  beforeEach(async () => {
    temp_dir = await mkdtemp(join(tmpdir(), "vocab-checkpoint-test-"));
  });

  afterEach(async () => {
    await rm(temp_dir, { recursive: true, force: true });
  });

  it("returns undefined when no checkpoint file exists yet (fresh run)", async () => {
    const result = await read_checkpoint(join(temp_dir, "missing.json"));

    expect(result).toBeUndefined();
  });

  it("writes then reads back the cursor for resumability", async () => {
    const path = join(temp_dir, "checkpoint.json");

    await write_checkpoint(path, 12_345);
    const result = await read_checkpoint(path);

    expect(result?.last_id).toBe(12_345);
    expect(typeof result?.updated_at).toBe("string");
  });
});
