import {
  danbooru_category_name,
  fetch_danbooru_tag_aliases,
  fetch_danbooru_tags,
  read_checkpoint,
  write_checkpoint,
  type DanbooruClientOptions,
} from "./danbooru_client.js";
import { read_jsonl, write_jsonl } from "./jsonl_io.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

function compare_tag_records(left: VocabularyRecord, right: VocabularyRecord): number {
  if (left.popularity !== right.popularity) {
    return right.popularity - left.popularity;
  }
  return left.tag < right.tag ? -1 : left.tag > right.tag ? 1 : 0;
}

export interface FetchDanbooruOptions {
  readonly client: DanbooruClientOptions;
  readonly min_post_count?: number;
  readonly checkpoint_path?: string;
}

/**
 * Fetches the full Danbooru tag dictionary (paginated) plus active tag
 * aliases, and maps them onto fact-only `VocabularyRecordSchema` records
 * (no `translation`: Danbooru's API carries no zh translation). Writes/reads
 * `checkpoint_path` (if given) so an interrupted run resumes from the last
 * completed tag page instead of restarting from id 0.
 */
export async function fetch_danbooru_fact_records(
  options: FetchDanbooruOptions,
): Promise<VocabularyRecord[]> {
  const checkpoint = options.checkpoint_path
    ? await read_checkpoint(options.checkpoint_path)
    : undefined;

  const aliases_by_tag = new Map<string, string[]>();
  for await (const page of fetch_danbooru_tag_aliases(options.client)) {
    for (const alias of page) {
      if (alias.status !== "active") {
        continue;
      }
      const existing = aliases_by_tag.get(alias.consequent_name) ?? [];
      existing.push(alias.antecedent_name);
      aliases_by_tag.set(alias.consequent_name, existing);
    }
  }

  const records: VocabularyRecord[] = [];
  let last_id = checkpoint?.last_id ?? 0;
  for await (const page of fetch_danbooru_tags({
    ...options.client,
    min_post_count: options.min_post_count ?? 0,
    ...(checkpoint !== undefined ? { start_after_id: checkpoint.last_id } : {}),
  })) {
    for (const tag of page) {
      records.push(
        VocabularyRecordSchema.parse({
          record_id: tag.id,
          tag: tag.name,
          category: danbooru_category_name(tag.category),
          popularity: tag.post_count,
          aliases: aliases_by_tag.get(tag.name) ?? [],
        }),
      );
      last_id = Math.max(last_id, tag.id);
    }
    if (options.checkpoint_path) {
      await write_checkpoint(options.checkpoint_path, last_id);
    }
  }

  return records.sort(compare_tag_records);
}

export interface RunFetchDanbooruCliOptions extends FetchDanbooruOptions {
  readonly out_path: string;
}

/**
 * Loads the records a resumed run must not lose. `fetch_danbooru_fact_records`
 * only fetches tag pages after `checkpoint.last_id` on resume, so its return
 * value alone is just the tail of the crawl -- writing that directly over
 * `out_path` (the pre-fix behavior) silently discarded every record from
 * before the interruption. Returns `[]` for a fresh run (no checkpoint yet).
 */
async function load_pre_checkpoint_records(
  options: RunFetchDanbooruCliOptions,
): Promise<VocabularyRecord[]> {
  if (options.checkpoint_path === undefined) {
    return [];
  }
  const checkpoint = await read_checkpoint(options.checkpoint_path);
  if (checkpoint === undefined) {
    return [];
  }
  try {
    return await read_jsonl(options.out_path, VocabularyRecordSchema);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(
        `Danbooru fetch checkpoint at ${options.checkpoint_path} exists but ${options.out_path} ` +
          "does not -- refusing to resume into a truncated output. Delete the checkpoint to start " +
          "a fresh crawl instead.",
        { cause: error },
      );
    }
    throw error;
  }
}

function merge_by_record_id(
  previous: readonly VocabularyRecord[],
  fresh: readonly VocabularyRecord[],
): VocabularyRecord[] {
  const by_id = new Map<number, VocabularyRecord>();
  for (const record of previous) {
    by_id.set(record.record_id, record);
  }
  for (const record of fresh) {
    by_id.set(record.record_id, record);
  }
  return [...by_id.values()].sort(compare_tag_records);
}

export async function run_fetch_danbooru_cli(
  options: RunFetchDanbooruCliOptions,
): Promise<VocabularyRecord[]> {
  const previous_records = await load_pre_checkpoint_records(options);
  const fetched_records = await fetch_danbooru_fact_records(options);
  const records = merge_by_record_id(previous_records, fetched_records);
  await write_jsonl(options.out_path, records);
  return records;
}
