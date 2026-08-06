import type { IDBPDatabase } from "idb";

import {
  type CharacterProfile,
  CharacterProfileSchema,
  type ComfyWorkflow,
  ComfyWorkflowSchema,
  type DBSchema,
  type ImageBlob,
  ImageBlobSchema,
  type ImageRecord,
  ImageRecordSchema,
  type KnowledgeEntry,
  KnowledgeEntrySchema,
  type MigrationJournal,
  MigrationJournalSchema,
  type NovelAiVibe,
  NovelAiVibeSchema,
  type PromptPreset,
  PromptPresetSchema,
  type ProviderProfile,
  ProviderProfileSchema,
  type RegexRule,
  RegexRuleSchema,
  parse_json_value,
  Sha256Schema,
  type Vocabulary,
  VocabularyGroupSchema,
  type VocabularyGroup,
  VocabularyPackageSchema,
  type VocabularyPackage,
  VocabularySchema,
  VocabularyShardSchema,
  type VocabularyShard,
  type NamespacedRecord,
} from "../database_schema.js";
import {
  IndexedDbRepository,
  RepositoryDuplicateError,
  RepositoryNotFoundError,
  type Repository,
  RepositoryValidationError,
} from "../repository.js";
import { type StorageTransaction, type StorageWriteTransaction } from "../transaction.js";
import { GenerationJobRepository } from "./job_repository.js";

export class ProviderProfileRepository extends IndexedDbRepository<
  "provider_profiles",
  ProviderProfile
> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "provider_profiles", ProviderProfileSchema, true);
  }
}

export class PromptPresetRepository extends IndexedDbRepository<"prompt_presets", PromptPreset> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "prompt_presets", PromptPresetSchema);
  }
}

export class ComfyWorkflowRepository extends IndexedDbRepository<"comfy_workflows", ComfyWorkflow> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "comfy_workflows", ComfyWorkflowSchema);
  }
}

export class NovelAiVibeRepository extends IndexedDbRepository<"novelai_vibes", NovelAiVibe> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "novelai_vibes", NovelAiVibeSchema);
  }
}

export class CharacterProfileRepository extends IndexedDbRepository<
  "character_profiles",
  CharacterProfile
> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "character_profiles", CharacterProfileSchema);
  }
}

export class RegexRuleRepository extends IndexedDbRepository<"regex_rules", RegexRule> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "regex_rules", RegexRuleSchema);
  }
}

export class KnowledgeEntryRepository extends IndexedDbRepository<
  "knowledge_entries",
  KnowledgeEntry
> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "knowledge_entries", KnowledgeEntrySchema);
  }
}

export class VocabularyRepository extends IndexedDbRepository<"vocabularies", Vocabulary> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "vocabularies", VocabularySchema);
  }
}

export class VocabularyGroupRepository extends IndexedDbRepository<
  "vocabulary_groups",
  VocabularyGroup
> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "vocabulary_groups", VocabularyGroupSchema);
  }
}

export class VocabularyPackageRepository extends IndexedDbRepository<
  "vocabulary_packages",
  VocabularyPackage
> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "vocabulary_packages", VocabularyPackageSchema);
  }
}

export class VocabularyShardRepository extends IndexedDbRepository<
  "vocabulary_shards",
  VocabularyShard
> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "vocabulary_shards", VocabularyShardSchema);
  }
}

export class ImageRecordRepository extends IndexedDbRepository<"image_records", ImageRecord> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "image_records", ImageRecordSchema);
  }
}

function clone_boundary<T>(value: T): T {
  try {
    return globalThis.structuredClone(value);
  } catch (error) {
    throw new RepositoryValidationError(
      `Value cannot cross the structured-clone boundary: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

function is_constraint_error(error: unknown): boolean {
  return error instanceof Error && error.name === "ConstraintError";
}

async function run_read<T>(
  database: IDBPDatabase<DBSchema>,
  store_name: "image_blobs" | "migration_journal",
  transaction: StorageTransaction | undefined,
  callback: (active_transaction: StorageTransaction) => Promise<T>,
): Promise<T> {
  if (transaction !== undefined) {
    return callback(transaction);
  }
  const created_transaction = database.transaction(store_name, "readonly");
  try {
    const result = await callback(created_transaction);
    await created_transaction.done;
    return result;
  } catch (error) {
    try {
      await created_transaction.done;
    } catch {
      // Preserve the request or validation error.
    }
    throw error;
  }
}

async function run_write<T>(
  database: IDBPDatabase<DBSchema>,
  store_name: "image_blobs" | "migration_journal",
  transaction: StorageTransaction | undefined,
  callback: (active_transaction: StorageWriteTransaction) => Promise<T>,
): Promise<T> {
  if (transaction !== undefined) {
    if (transaction.mode === "readonly") {
      throw new TypeError("A readwrite transaction is required for this repository method");
    }
    return callback(transaction as StorageWriteTransaction);
  }
  const created_transaction = database.transaction(store_name, "readwrite");
  try {
    const result = await callback(created_transaction);
    await created_transaction.done;
    return result;
  } catch (error) {
    try {
      created_transaction.abort();
    } catch {
      // The transaction may already be inactive; its completion promise remains authoritative.
    }
    try {
      await created_transaction.done;
    } catch {
      // Preserve the original repository error.
    }
    throw error;
  }
}

export class ImageBlobRepository {
  constructor(private readonly database: IDBPDatabase<DBSchema>) {}

  async get(sha256: string, transaction?: StorageTransaction): Promise<ImageBlob | null> {
    const key = Sha256Schema.parse(sha256);
    return run_read(this.database, "image_blobs", transaction, async (active_transaction) => {
      const raw = await active_transaction.objectStore("image_blobs").get(key);
      if (raw === undefined) {
        return null;
      }
      return this.validate(raw);
    });
  }

  async list(transaction?: StorageTransaction): Promise<ImageBlob[]> {
    return run_read(this.database, "image_blobs", transaction, async (active_transaction) => {
      const raw_records = await active_transaction.objectStore("image_blobs").getAll();
      return raw_records
        .map((raw) => this.validate(raw))
        .sort((left, right) =>
          left.sha256 < right.sha256 ? -1 : left.sha256 > right.sha256 ? 1 : 0,
        );
    });
  }

  async create(record: ImageBlob, transaction?: StorageTransaction): Promise<void> {
    const valid_record = this.prepare(record);
    await run_write(this.database, "image_blobs", transaction, async (active_transaction) => {
      try {
        await active_transaction.objectStore("image_blobs").add(valid_record);
      } catch (error) {
        if (is_constraint_error(error)) {
          throw new RepositoryDuplicateError("image_blobs", valid_record.sha256);
        }
        throw error;
      }
    });
  }

  async update(record: ImageBlob, transaction?: StorageTransaction): Promise<void> {
    const valid_record = this.prepare(record);
    await run_write(this.database, "image_blobs", transaction, async (active_transaction) => {
      const store = active_transaction.objectStore("image_blobs");
      if ((await store.get(valid_record.sha256)) === undefined) {
        throw new RepositoryNotFoundError("image_blobs", valid_record.sha256);
      }
      await store.put(valid_record);
    });
  }

  async put(record: ImageBlob, transaction?: StorageTransaction): Promise<void> {
    const valid_record = this.prepare(record);
    await run_write(this.database, "image_blobs", transaction, async (active_transaction) => {
      await active_transaction.objectStore("image_blobs").put(valid_record);
    });
  }

  async delete(sha256: string, transaction?: StorageTransaction): Promise<void> {
    const key = Sha256Schema.parse(sha256);
    await run_write(this.database, "image_blobs", transaction, async (active_transaction) => {
      await active_transaction.objectStore("image_blobs").delete(key);
    });
  }

  private prepare(record: ImageBlob): ImageBlob {
    const cloned = clone_boundary(record);
    const parsed = ImageBlobSchema.safeParse(cloned);
    if (!parsed.success) {
      throw new RepositoryValidationError(
        "Image blob failed schema validation",
        parsed.error.issues,
      );
    }
    const actual_byte_length =
      parsed.data.blob instanceof Blob ? parsed.data.blob.size : parsed.data.blob.byteLength;
    if (actual_byte_length !== parsed.data.byte_length) {
      throw new RepositoryValidationError("Image blob byte_length does not match blob data");
    }
    return clone_boundary(parsed.data);
  }

  private validate(raw: unknown): ImageBlob {
    const cloned = clone_boundary(raw);
    const parsed = ImageBlobSchema.safeParse(cloned);
    if (!parsed.success) {
      throw new RepositoryValidationError(
        "Stored image blob failed schema validation",
        parsed.error.issues,
      );
    }
    const actual_byte_length =
      parsed.data.blob instanceof Blob ? parsed.data.blob.size : parsed.data.blob.byteLength;
    if (actual_byte_length !== parsed.data.byte_length) {
      throw new RepositoryValidationError("Stored image blob byte_length does not match blob data");
    }
    return clone_boundary(parsed.data);
  }
}

export class MigrationJournalRepository {
  constructor(private readonly database: IDBPDatabase<DBSchema>) {}

  async get(
    migration_id: string,
    transaction?: StorageTransaction,
  ): Promise<MigrationJournal | null> {
    const key = this.key(migration_id);
    return run_read(this.database, "migration_journal", transaction, async (active_transaction) => {
      const raw = await active_transaction.objectStore("migration_journal").get(key);
      if (raw === undefined) {
        return null;
      }
      return this.validate(raw);
    });
  }

  async list(transaction?: StorageTransaction): Promise<MigrationJournal[]> {
    return run_read(this.database, "migration_journal", transaction, async (active_transaction) => {
      const raw_records = await active_transaction.objectStore("migration_journal").getAll();
      return raw_records
        .map((raw) => this.validate(raw))
        .sort((left, right) =>
          left.migration_id < right.migration_id
            ? -1
            : left.migration_id > right.migration_id
              ? 1
              : 0,
        );
    });
  }

  async create(record: MigrationJournal, transaction?: StorageTransaction): Promise<void> {
    const valid_record = this.prepare(record);
    await run_write(this.database, "migration_journal", transaction, async (active_transaction) => {
      try {
        await active_transaction.objectStore("migration_journal").add(valid_record);
      } catch (error) {
        if (is_constraint_error(error)) {
          throw new RepositoryDuplicateError("migration_journal", valid_record.migration_id);
        }
        throw error;
      }
    });
  }

  async update(record: MigrationJournal, transaction?: StorageTransaction): Promise<void> {
    const valid_record = this.prepare(record);
    await run_write(this.database, "migration_journal", transaction, async (active_transaction) => {
      const store = active_transaction.objectStore("migration_journal");
      if ((await store.get(valid_record.migration_id)) === undefined) {
        throw new RepositoryNotFoundError("migration_journal", valid_record.migration_id);
      }
      await store.put(valid_record);
    });
  }

  async put(record: MigrationJournal, transaction?: StorageTransaction): Promise<void> {
    const valid_record = this.prepare(record);
    await run_write(this.database, "migration_journal", transaction, async (active_transaction) => {
      await active_transaction.objectStore("migration_journal").put(valid_record);
    });
  }

  async delete(migration_id: string, transaction?: StorageTransaction): Promise<void> {
    const key = this.key(migration_id);
    await run_write(this.database, "migration_journal", transaction, async (active_transaction) => {
      await active_transaction.objectStore("migration_journal").delete(key);
    });
  }

  private key(migration_id: string): string {
    const parsed = MigrationJournalSchema.shape.migration_id.safeParse(migration_id);
    if (!parsed.success) {
      throw new RepositoryValidationError(
        "migration_id must be a nonempty bounded string",
        parsed.error.issues,
      );
    }
    return parsed.data;
  }

  private prepare(record: MigrationJournal): MigrationJournal {
    const cloned = clone_boundary(record);
    if (cloned.payload !== undefined) {
      try {
        cloned.payload = parse_json_value(cloned.payload);
      } catch (error) {
        throw new RepositoryValidationError(
          error instanceof Error ? error.message : "Migration payload must be serializable JSON",
        );
      }
    }
    const parsed = MigrationJournalSchema.safeParse(cloned);
    if (!parsed.success) {
      throw new RepositoryValidationError(
        "Migration journal failed schema validation",
        parsed.error.issues,
      );
    }
    return clone_boundary(parsed.data);
  }

  private validate(raw: unknown): MigrationJournal {
    const cloned = clone_boundary(raw);
    if (
      typeof cloned === "object" &&
      cloned !== null &&
      "payload" in cloned &&
      cloned.payload !== undefined
    ) {
      try {
        parse_json_value(cloned.payload);
      } catch (error) {
        throw new RepositoryValidationError(
          error instanceof Error
            ? error.message
            : "Stored migration payload must be serializable JSON",
        );
      }
    }
    const parsed = MigrationJournalSchema.safeParse(cloned);
    if (!parsed.success) {
      throw new RepositoryValidationError(
        "Stored migration journal failed schema validation",
        parsed.error.issues,
      );
    }
    return clone_boundary(parsed.data);
  }
}

export interface BusinessRepositories {
  provider_profiles: ProviderProfileRepository;
  prompt_presets: PromptPresetRepository;
  comfy_workflows: ComfyWorkflowRepository;
  novelai_vibes: NovelAiVibeRepository;
  character_profiles: CharacterProfileRepository;
  regex_rules: RegexRuleRepository;
  knowledge_entries: KnowledgeEntryRepository;
  vocabularies: VocabularyRepository;
  vocabulary_groups: VocabularyGroupRepository;
  vocabulary_packages: VocabularyPackageRepository;
  vocabulary_shards: VocabularyShardRepository;
  image_records: ImageRecordRepository;
  image_blobs: ImageBlobRepository;
  migration_journal: MigrationJournalRepository;
  generation_jobs: GenerationJobRepository;
}

export function create_business_repositories(
  database: IDBPDatabase<DBSchema>,
): BusinessRepositories {
  return {
    provider_profiles: new ProviderProfileRepository(database),
    prompt_presets: new PromptPresetRepository(database),
    comfy_workflows: new ComfyWorkflowRepository(database),
    novelai_vibes: new NovelAiVibeRepository(database),
    character_profiles: new CharacterProfileRepository(database),
    regex_rules: new RegexRuleRepository(database),
    knowledge_entries: new KnowledgeEntryRepository(database),
    vocabularies: new VocabularyRepository(database),
    vocabulary_groups: new VocabularyGroupRepository(database),
    vocabulary_packages: new VocabularyPackageRepository(database),
    vocabulary_shards: new VocabularyShardRepository(database),
    image_records: new ImageRecordRepository(database),
    image_blobs: new ImageBlobRepository(database),
    migration_journal: new MigrationJournalRepository(database),
    generation_jobs: new GenerationJobRepository(database),
  };
}

export const business_repositories = create_business_repositories;

export type AnyBusinessRepository = Repository<NamespacedRecord>;
