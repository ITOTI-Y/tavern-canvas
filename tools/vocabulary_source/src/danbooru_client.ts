import { readFile, writeFile } from "node:fs/promises";

import { z } from "zod";

export const DANBOORU_DEFAULT_BASE_URL = "https://danbooru.donmai.us";
export const DANBOORU_DEFAULT_PAGE_LIMIT = 1000;
export const DANBOORU_MIN_REQUEST_DELAY_MS = 150;

/** Danbooru's tag category enum (`app/models/tag.rb`; id 2 is unused). */
export const DANBOORU_TAG_CATEGORY_NAMES: Readonly<Record<number, string>> = {
  0: "general",
  1: "artist",
  3: "copyright",
  4: "character",
  5: "meta",
};

export function danbooru_category_name(category_id: number): string {
  return DANBOORU_TAG_CATEGORY_NAMES[category_id] ?? String(category_id);
}

export const DanbooruTagSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().trim().min(1),
  category: z.number().int().nonnegative(),
  post_count: z.number().int().nonnegative(),
});
export type DanbooruTag = z.infer<typeof DanbooruTagSchema>;

export const DanbooruTagAliasSchema = z.object({
  id: z.number().int().nonnegative(),
  antecedent_name: z.string().trim().min(1),
  consequent_name: z.string().trim().min(1),
  status: z.string(),
});
export type DanbooruTagAlias = z.infer<typeof DanbooruTagAliasSchema>;

export type FetchLike = (
  url: string,
  init: { headers: Record<string, string> },
) => Promise<{ ok: boolean; status: number; statusText: string; json(): Promise<unknown> }>;

export class DanbooruApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "DanbooruApiError";
  }
}

export interface DanbooruClientOptions {
  /** Required: Danbooru requires clients to self-identify, and a shared default would misrepresent every caller. */
  readonly user_agent: string;
  readonly base_url?: string;
  readonly page_limit?: number;
  readonly fetch_impl?: FetchLike;
  /** Minimum delay between requests; Danbooru's read limit is 10 req/s. */
  readonly min_request_delay_ms?: number;
  readonly delay_fn?: (ms: number) => Promise<void>;
}

interface ResolvedClientOptions {
  readonly user_agent: string;
  readonly base_url: string;
  readonly page_limit: number;
  readonly fetch_impl: FetchLike;
  readonly min_request_delay_ms: number;
  readonly delay_fn: (ms: number) => Promise<void>;
}

function resolve_options(options: DanbooruClientOptions): ResolvedClientOptions {
  const min_request_delay_ms = options.min_request_delay_ms ?? DANBOORU_MIN_REQUEST_DELAY_MS;
  if (min_request_delay_ms < DANBOORU_MIN_REQUEST_DELAY_MS) {
    throw new RangeError(
      `min_request_delay_ms must be >= ${String(DANBOORU_MIN_REQUEST_DELAY_MS)}ms (Danbooru API etiquette); got ${String(min_request_delay_ms)}.`,
    );
  }
  return {
    user_agent: options.user_agent,
    base_url: options.base_url ?? DANBOORU_DEFAULT_BASE_URL,
    page_limit: options.page_limit ?? DANBOORU_DEFAULT_PAGE_LIMIT,
    fetch_impl: options.fetch_impl ?? globalThis.fetch,
    min_request_delay_ms,
    delay_fn: options.delay_fn ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms))),
  };
}

async function fetch_json(
  resolved: ResolvedClientOptions,
  path: string,
  params: Record<string, string>,
): Promise<unknown> {
  const url = new URL(path, resolved.base_url);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await resolved.fetch_impl(url.toString(), {
    headers: { "User-Agent": resolved.user_agent, Accept: "application/json" },
  });
  if (!response.ok) {
    throw new DanbooruApiError(
      `Danbooru API request to ${url.toString()} failed: ${String(response.status)} ${response.statusText}`,
      response.status,
    );
  }
  return response.json();
}

/**
 * Cursor-paginates with `page=a{cursor}` (`WHERE id > cursor ORDER BY id ASC`). Do not use
 * `search[id]=>cursor` with `search[order]=id`: Danbooru ignores `id` as an order and falls back to
 * `id DESC`, which silently truncates a crawl to one page. Yields one page at a time and stops on
 * a page shorter than `page_limit`.
 */
export async function* fetch_danbooru_tags(
  options: DanbooruClientOptions & {
    readonly min_post_count?: number;
    readonly start_after_id?: number;
  },
): AsyncGenerator<DanbooruTag[]> {
  const resolved = resolve_options(options);
  const min_post_count = options.min_post_count ?? 0;
  let cursor = options.start_after_id ?? 0;
  let first_request = true;

  for (;;) {
    if (!first_request) {
      await resolved.delay_fn(resolved.min_request_delay_ms);
    }
    first_request = false;

    const raw = await fetch_json(resolved, "/tags.json", {
      page: `a${String(cursor)}`,
      limit: String(resolved.page_limit),
      "search[post_count]": `>=${String(min_post_count)}`,
    });
    const page = z.array(DanbooruTagSchema).parse(raw);
    if (page.length === 0) {
      return;
    }
    yield page;

    const max_id = page.reduce((max, tag) => Math.max(max, tag.id), cursor);
    cursor = max_id;
    if (page.length < resolved.page_limit) {
      return;
    }
  }
}

export async function* fetch_danbooru_tag_aliases(
  options: DanbooruClientOptions & { readonly start_after_id?: number },
): AsyncGenerator<DanbooruTagAlias[]> {
  const resolved = resolve_options(options);
  let cursor = options.start_after_id ?? 0;
  let first_request = true;

  for (;;) {
    if (!first_request) {
      await resolved.delay_fn(resolved.min_request_delay_ms);
    }
    first_request = false;

    const raw = await fetch_json(resolved, "/tag_aliases.json", {
      page: `a${String(cursor)}`,
      limit: String(resolved.page_limit),
    });
    const page = z.array(DanbooruTagAliasSchema).parse(raw);
    if (page.length === 0) {
      return;
    }
    yield page;

    const max_id = page.reduce((max, alias) => Math.max(max, alias.id), cursor);
    cursor = max_id;
    if (page.length < resolved.page_limit) {
      return;
    }
  }
}

const CheckpointSchema = z.strictObject({
  last_id: z.number().int().nonnegative(),
  updated_at: z.string(),
});
export type Checkpoint = z.infer<typeof CheckpointSchema>;

export async function read_checkpoint(path: string): Promise<Checkpoint | undefined> {
  let text: string;
  try {
    text = await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
  return CheckpointSchema.parse(JSON.parse(text));
}

export async function write_checkpoint(path: string, last_id: number): Promise<void> {
  const checkpoint: Checkpoint = { last_id, updated_at: new Date().toISOString() };
  await writeFile(path, JSON.stringify(checkpoint, null, 2), "utf8");
}
