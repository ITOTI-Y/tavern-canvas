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

/**
 * Simulates the Danbooru query semantics the client relies on: `search[order]` accepts only name,
 * date, count, similarity and custom (anything else, including `id`, falls back to `id DESC`), and
 * `page=aN` is `WHERE id > N ORDER BY id ASC` via `reorder`, overriding `search[order]`.
 */
function make_realistic_danbooru_fetch(records: readonly (DanbooruTag | DanbooruTagAlias)[]): {
  fetch_impl: FetchLike;
  calls: string[];
} {
  const calls: string[] = [];
  const fetch_impl: FetchLike = (url) => {
    calls.push(url);
    const parsed = new URL(url);
    const limit = Number(parsed.searchParams.get("limit") ?? "1000");
    const page = parsed.searchParams.get("page");
    const min_post_count_param = parsed.searchParams.get("search[post_count]");
    const min_post_count = min_post_count_param?.startsWith(">=")
      ? Number(min_post_count_param.slice(2))
      : 0;

    let filtered = records.filter(
      (record) => !("post_count" in record) || record.post_count >= min_post_count,
    );

    const after_match = /^a(\d+)$/.exec(page ?? "");
    const before_match = /^b(\d+)$/.exec(page ?? "");
    if (after_match) {
      const after_id = Number(after_match[1]);
      filtered = filtered
        .filter((record) => record.id > after_id)
        .sort((a, b) => a.id - b.id)
        .slice(0, limit)
        .sort((a, b) => b.id - a.id);
    } else if (before_match) {
      const before_id = Number(before_match[1]);
      filtered = filtered
        .filter((record) => record.id < before_id)
        .sort((a, b) => b.id - a.id)
        .slice(0, limit);
    } else {
      const search_id = parsed.searchParams.get("search[id]");
      const id_match = /^>(\d+)$/.exec(search_id ?? "");
      if (id_match) {
        const min_id = Number(id_match[1]);
        filtered = filtered.filter((record) => record.id > min_id);
      }
      filtered = filtered.sort((a, b) => b.id - a.id).slice(0, limit);
    }

    return Promise.resolve(json_response(filtered));
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

  it("builds the documented query: page=a<cursor>, limit, search[post_count]=>=min", async () => {
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
    expect(url.searchParams.get("page")).toBe("a10");
    expect(url.searchParams.get("limit")).toBe("1000");
    expect(url.searchParams.get("search[post_count]")).toBe(">=50");
    // `search[order]=id` is ignored by Danbooru; ascending order must come from `page=a<id>`.
    expect(url.searchParams.has("search[order]")).toBe(false);
    expect(url.searchParams.has("search[id]")).toBe(false);
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
    expect(second_url.searchParams.get("page")).toBe("a9");
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

describe("fetch_danbooru_tags — full-table crawl against realistic Danbooru semantics", () => {
  function build_tag_universe(count: number): DanbooruTag[] {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `tag_${String(index + 1)}`,
      category: 0,
      post_count: index,
    }));
  }

  it("walks the entire id space instead of stopping after ~one page of the newest ids", async () => {
    const universe = build_tag_universe(2_500);
    const { fetch_impl, calls } = make_realistic_danbooru_fetch(universe);

    const results = await collect(
      fetch_danbooru_tags({
        user_agent: "test-bot/1.0",
        fetch_impl,
        page_limit: 1000,
        delay_fn: () => Promise.resolve(),
      }),
    );

    expect(results).toHaveLength(2_500);
    expect(results.map((tag) => tag.id).sort((a, b) => a - b)).toEqual(
      universe.map((tag) => tag.id),
    );
    expect(calls).toHaveLength(3);
  });

  it("applies the min_post_count filter across a full crawl", async () => {
    const universe = build_tag_universe(1_500);
    const { fetch_impl } = make_realistic_danbooru_fetch(universe);

    const results = await collect(
      fetch_danbooru_tags({
        user_agent: "test-bot/1.0",
        fetch_impl,
        page_limit: 500,
        min_post_count: 1_000,
        delay_fn: () => Promise.resolve(),
      }),
    );

    expect(results).toHaveLength(500);
    expect(results.every((tag) => tag.post_count >= 1_000)).toBe(true);
  });

  it("resumes a crawl from a checkpoint without gaps or duplicates", async () => {
    const universe = build_tag_universe(2_500);
    const first_pass_fetch = make_realistic_danbooru_fetch(universe);

    const first_pass_results: DanbooruTag[] = [];
    let last_id = 0;
    for await (const page of fetch_danbooru_tags({
      user_agent: "test-bot/1.0",
      fetch_impl: first_pass_fetch.fetch_impl,
      page_limit: 1_000,
      delay_fn: () => Promise.resolve(),
    })) {
      first_pass_results.push(...page);
      last_id = page.reduce((max, tag) => Math.max(max, tag.id), last_id);
      break; // Simulate a crawl interrupted after the first page.
    }
    expect(first_pass_results).toHaveLength(1_000);
    expect(last_id).toBe(1_000);

    const resumed_fetch = make_realistic_danbooru_fetch(universe);
    const resumed_results = await collect(
      fetch_danbooru_tags({
        user_agent: "test-bot/1.0",
        fetch_impl: resumed_fetch.fetch_impl,
        page_limit: 1_000,
        start_after_id: last_id,
        delay_fn: () => Promise.resolve(),
      }),
    );

    expect(resumed_results).toHaveLength(1_500);
    const combined_ids = [...first_pass_results, ...resumed_results]
      .map((tag) => tag.id)
      .sort((a, b) => a - b);
    expect(combined_ids).toEqual(universe.map((tag) => tag.id));
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
    expect(url.searchParams.get("page")).toBe("a0");
    expect(url.searchParams.has("search[order]")).toBe(false);
  });

  it("walks the entire id space of a realistic alias table", async () => {
    const universe: DanbooruTagAlias[] = Array.from({ length: 1_800 }, (_, index) => ({
      id: index + 1,
      antecedent_name: `alias_${String(index + 1)}`,
      consequent_name: `tag_${String(index + 1)}`,
      status: "active",
    }));
    const { fetch_impl } = make_realistic_danbooru_fetch(universe);

    const results = await collect(
      fetch_danbooru_tag_aliases({
        user_agent: "test-bot/1.0",
        fetch_impl,
        page_limit: 1_000,
        delay_fn: () => Promise.resolve(),
      }),
    );

    expect(results).toHaveLength(1_800);
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
