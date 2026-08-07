import {
  KnowledgeRecordDraftSchema,
  KnowledgeRecordSchema,
  type KnowledgeRecord,
  type KnowledgeRecordDraft,
} from "@tavern-canvas/contracts";
import type { KnowledgeEntry, KnowledgeEntryRepository } from "@tavern-canvas/storage";

export type KnowledgeDomainEvent =
  | { readonly type: "entry_upserted"; readonly entry: KnowledgeRecord }
  | { readonly type: "entry_removed"; readonly entry_id: string };

export interface KnowledgeServiceDependencies {
  readonly repository: KnowledgeEntryRepository;
  readonly namespace: string;
  readonly clock: () => string;
}

export class UnknownKnowledgeEntryError extends Error {
  readonly code = "unknown_knowledge_entry";

  constructor(entry_id: string) {
    super(`Unknown knowledge entry "${entry_id}"`);
    this.name = "UnknownKnowledgeEntryError";
  }
}

/** `source_type` is a typed column on the store (it is one of `knowledge_entries`' indexes), so
 * it stays out of the payload and a filtered listing never has to deserialize entry bodies. */
function to_record(entry: KnowledgeRecord, namespace: string, created_at: string): KnowledgeEntry {
  return {
    schema_version: 1,
    id: entry.id,
    namespace,
    record_key: `${namespace}:${entry.id}`,
    created_at,
    updated_at: entry.updated_at,
    source_type: entry.source_type,
    payload: {
      title: entry.title,
      content: entry.content,
      keywords: [...entry.keywords],
      priority: entry.priority,
      enabled: entry.enabled,
    },
  };
}

function to_entry(record: KnowledgeEntry): KnowledgeRecord {
  const payload = (record.payload ?? {}) as Record<string, unknown>;
  return KnowledgeRecordSchema.parse({
    id: record.id,
    title: payload.title,
    source_type: record.source_type,
    content: payload.content,
    keywords: payload.keywords,
    priority: payload.priority,
    enabled: payload.enabled,
    created_at: record.created_at,
    updated_at: record.updated_at,
  });
}

/** Knowledge entry CRUD over `knowledge_entries`. Listings come back highest-priority first,
 * matching the order the prompt builder drops entries in when a context budget runs out. */
export class KnowledgeService {
  readonly #deps: KnowledgeServiceDependencies;
  readonly #listeners = new Set<(event: KnowledgeDomainEvent) => void>();

  constructor(dependencies: KnowledgeServiceDependencies) {
    this.#deps = dependencies;
  }

  subscribe(handler: (event: KnowledgeDomainEvent) => void): () => void {
    this.#listeners.add(handler);
    return () => {
      this.#listeners.delete(handler);
    };
  }

  async list(): Promise<readonly KnowledgeRecord[]> {
    const records = await this.#deps.repository.list(this.#deps.namespace);
    return records
      .map(to_entry)
      .sort((left, right) =>
        right.priority - left.priority !== 0
          ? right.priority - left.priority
          : left.title.localeCompare(right.title),
      );
  }

  async save(draft: KnowledgeRecordDraft): Promise<KnowledgeRecord> {
    const valid = KnowledgeRecordDraftSchema.parse(draft);
    const existing = await this.#deps.repository.get(this.#deps.namespace, valid.id);
    const now = this.#deps.clock();
    const entry: KnowledgeRecord = {
      ...valid,
      created_at: existing?.created_at ?? now,
      updated_at: now,
    };
    await this.#put(entry, entry.created_at);
    return entry;
  }

  async set_enabled(entry_id: string, enabled: boolean): Promise<KnowledgeRecord> {
    const entry = await this.#require(entry_id);
    const updated: KnowledgeRecord = { ...entry, enabled, updated_at: this.#deps.clock() };
    await this.#put(updated, entry.created_at);
    return updated;
  }

  async remove(entry_id: string): Promise<void> {
    await this.#require(entry_id);
    await this.#deps.repository.delete(this.#deps.namespace, entry_id);
    this.#emit({ type: "entry_removed", entry_id });
  }

  /** One confirmed multi-select delete. Missing ids are skipped rather than aborting the batch
   * partway, which would leave the user unsure which entries survived. */
  async bulk_remove(entry_ids: readonly string[]): Promise<void> {
    for (const entry_id of entry_ids) {
      const record = await this.#deps.repository.get(this.#deps.namespace, entry_id);
      if (record === null) {
        continue;
      }
      await this.#deps.repository.delete(this.#deps.namespace, entry_id);
      this.#emit({ type: "entry_removed", entry_id });
    }
  }

  async #require(entry_id: string): Promise<KnowledgeRecord> {
    const record = await this.#deps.repository.get(this.#deps.namespace, entry_id);
    if (record === null) {
      throw new UnknownKnowledgeEntryError(entry_id);
    }
    return to_entry(record);
  }

  async #put(entry: KnowledgeRecord, created_at: string): Promise<void> {
    await this.#deps.repository.put(
      this.#deps.namespace,
      to_record(entry, this.#deps.namespace, created_at),
    );
    this.#emit({ type: "entry_upserted", entry });
  }

  #emit(event: KnowledgeDomainEvent): void {
    for (const listener of this.#listeners) {
      listener(event);
    }
  }
}
