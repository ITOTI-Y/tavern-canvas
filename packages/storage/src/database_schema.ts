import type {
  DBSchema as IdbDBSchema,
  IDBPDatabase,
  IDBPTransaction,
} from "idb";
import { z } from "zod";

export const DATABASE_NAME = "tavern_canvas_v3" as const;
export const DATABASE_VERSION = 1 as const;
export const MAX_NAMESPACE_LENGTH = 128 as const;

export const STORE_DEFINITIONS = {
  provider_profiles: {
    key_path: "record_key",
    indexes: ["namespace", "provider_id", "updated_at"],
  },
  prompt_presets: {
    key_path: "record_key",
    indexes: ["namespace", "updated_at"],
  },
  comfy_workflows: {
    key_path: "record_key",
    indexes: ["namespace", "updated_at"],
  },
  novelai_vibes: {
    key_path: "record_key",
    indexes: ["namespace", "updated_at"],
  },
  character_profiles: {
    key_path: "record_key",
    indexes: ["namespace", "updated_at"],
  },
  regex_rules: {
    key_path: "record_key",
    indexes: ["namespace", "updated_at"],
  },
  knowledge_entries: {
    key_path: "record_key",
    indexes: ["namespace", "source_type", "updated_at"],
  },
  vocabularies: {
    key_path: "record_key",
    indexes: ["namespace", "updated_at"],
  },
  vocabulary_groups: {
    key_path: "record_key",
    indexes: ["namespace", "vocabulary_id"],
  },
  vocabulary_packages: {
    key_path: "record_key",
    indexes: ["namespace", "data_version", "state"],
  },
  vocabulary_shards: {
    key_path: "record_key",
    indexes: ["namespace", "data_version", "kind"],
  },
  image_records: {
    key_path: "record_key",
    indexes: ["namespace", "sha256", "created_at", "last_accessed_at", "pinned"],
  },
  image_blobs: {
    key_path: "sha256",
    indexes: ["ref_count", "byte_length"],
  },
  generation_jobs: {
    key_path: "record_key",
    indexes: ["namespace", "request_id", "request_digest", "state", "updated_at"],
  },
  migration_journal: {
    key_path: "migration_id",
    indexes: ["source_version", "state", "updated_at"],
  },
} as const;

export type StoreName = keyof typeof STORE_DEFINITIONS;
export type NamespacedStoreName = Exclude<
  StoreName,
  "image_blobs" | "migration_journal"
>;
export type BusinessStoreName = Exclude<NamespacedStoreName, "generation_jobs">;

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

const json_value_schema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number().finite(),
    z.boolean(),
    z.null(),
    z.array(json_value_schema),
    z.record(z.string(), json_value_schema),
  ]),
);

const uuid_pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
export const UuidSchema = z.string().regex(uuid_pattern);
export type Uuid = z.infer<typeof UuidSchema>;

export const Sha256Schema = z.string().regex(/^[a-f0-9]{64}$/u);
export type Sha256 = z.infer<typeof Sha256Schema>;

export const TimestampSchema = z.iso.datetime({ offset: true });

export const NamespaceSchema = z
  .string()
  .min(1)
  .max(MAX_NAMESPACE_LENGTH)
  .refine((value) => value === value.trim(), "namespace must not have surrounding whitespace")
  .refine((value) => !value.includes("\u0000"), "namespace must not contain NUL");
export type Namespace = z.infer<typeof NamespaceSchema>;

const base_record_shape = {
  schema_version: z.literal(1),
  id: UuidSchema,
  namespace: NamespaceSchema,
  record_key: z.string().min(1),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
  payload: json_value_schema.optional(),
};

function namespaced_schema<T extends z.ZodRawShape>(shape: T) {
  return z.strictObject({ ...base_record_shape, ...shape });
}

const provider_id_schema = z.string().min(1).max(128);
const data_version_schema = z.union([z.number().int().nonnegative(), z.string().min(1).max(128)]);
const state_schema = z.string().min(1).max(64);
const kind_schema = z.string().min(1).max(128);

export const ProviderProfileSchema = namespaced_schema({
  provider_id: provider_id_schema,
});
export type ProviderProfile = z.infer<typeof ProviderProfileSchema>;

export const PromptPresetSchema = namespaced_schema({});
export type PromptPreset = z.infer<typeof PromptPresetSchema>;

export const ComfyWorkflowSchema = namespaced_schema({});
export type ComfyWorkflow = z.infer<typeof ComfyWorkflowSchema>;

export const NovelAiVibeSchema = namespaced_schema({});
export type NovelAiVibe = z.infer<typeof NovelAiVibeSchema>;

export const CharacterProfileSchema = namespaced_schema({});
export type CharacterProfile = z.infer<typeof CharacterProfileSchema>;

export const RegexRuleSchema = namespaced_schema({});
export type RegexRule = z.infer<typeof RegexRuleSchema>;

export const KnowledgeEntrySchema = namespaced_schema({
  source_type: z.string().min(1).max(128),
});
export type KnowledgeEntry = z.infer<typeof KnowledgeEntrySchema>;

export const VocabularySchema = namespaced_schema({});
export type Vocabulary = z.infer<typeof VocabularySchema>;

export const VocabularyGroupSchema = namespaced_schema({
  vocabulary_id: UuidSchema,
});
export type VocabularyGroup = z.infer<typeof VocabularyGroupSchema>;

export const VocabularyPackageSchema = namespaced_schema({
  data_version: data_version_schema,
  state: state_schema,
});
export type VocabularyPackage = z.infer<typeof VocabularyPackageSchema>;

export const VocabularyShardSchema = namespaced_schema({
  data_version: data_version_schema,
  kind: kind_schema,
});
export type VocabularyShard = z.infer<typeof VocabularyShardSchema>;

export const ImageRecordSchema = namespaced_schema({
  sha256: Sha256Schema,
  last_accessed_at: TimestampSchema,
  pinned: z.boolean(),
});
export type ImageRecord = z.infer<typeof ImageRecordSchema>;

const image_blob_data_schema = z.custom<Blob | ArrayBuffer>(
  (value): value is Blob | ArrayBuffer =>
    (typeof Blob !== "undefined" && value instanceof Blob) || value instanceof ArrayBuffer,
  "expected a Blob or ArrayBuffer",
);

export const ImageBlobSchema = z.strictObject({
  sha256: Sha256Schema,
  ref_count: z.number().int().nonnegative(),
  byte_length: z.number().int().nonnegative(),
  blob: image_blob_data_schema,
});
export type ImageBlob = z.infer<typeof ImageBlobSchema>;

const generation_arguments_schema = z.strictObject({
  generation_anchor: Sha256Schema,
  scene_description: z.string().trim().min(1).max(12_000),
  negative_constraints: z.string().trim().max(4_000).optional(),
  context_turns: z.number().int().min(0).max(12).optional(),
  style_preset_id: UuidSchema.optional(),
  image_count: z.number().int().min(1).max(4).optional(),
});

const provider_error_schema = z.strictObject({
  code: z.enum([
    "auth_failed",
    "rate_limited",
    "content_blocked",
    "invalid_request",
    "provider_unavailable",
    "timed_out",
    "cancelled",
    "malformed_response",
  ]),
  retryable: z.boolean(),
  retry_after_ms: z.number().int().nonnegative().optional(),
  status_code: z.number().int().min(100).max(599).optional(),
});

export const GenerationJobSchema = namespaced_schema({
  request_id: UuidSchema,
  request_digest: Sha256Schema,
  generation_anchor: Sha256Schema,
  source_anchor: Sha256Schema,
  chat_id: z.string().min(1).max(512),
  requested_swipe_id: z.number().int().nonnegative(),
  provider_id: provider_id_schema,
  arguments: generation_arguments_schema,
  state: z.enum([
    "queued",
    "preparing",
    "submitting",
    "running",
    "completed",
    "failed",
    "cancelled",
    "attached",
    "orphaned",
  ]),
  error: provider_error_schema.nullable(),
  image_ids: z.array(UuidSchema),
  automatic: z.boolean().optional(),
});
export type GenerationJob = z.infer<typeof GenerationJobSchema>;

export const MigrationJournalSchema = z.strictObject({
  migration_id: z.string().min(1).max(256),
  source_version: z.number().int().nonnegative(),
  state: z.string().min(1).max(64),
  updated_at: TimestampSchema,
  payload: json_value_schema.optional(),
});
export type MigrationJournal = z.infer<typeof MigrationJournalSchema>;

export type NamespacedRecord = {
  schema_version: 1;
  id: string;
  namespace: string;
  record_key: string;
  created_at: string;
  updated_at: string;
  payload?: JsonValue | undefined;
};

export type BusinessRecord =
  | ProviderProfile
  | PromptPreset
  | ComfyWorkflow
  | NovelAiVibe
  | CharacterProfile
  | RegexRule
  | KnowledgeEntry
  | Vocabulary
  | VocabularyGroup
  | VocabularyPackage
  | VocabularyShard
  | ImageRecord;
export type ImageBlobRecord = ImageBlob;
export type ImageRecordRecord = ImageRecord;
export type GenerationJobRecord = GenerationJob;
export type MigrationJournalRecord = MigrationJournal;

export type RecordByStore = {
  provider_profiles: ProviderProfile;
  prompt_presets: PromptPreset;
  comfy_workflows: ComfyWorkflow;
  novelai_vibes: NovelAiVibe;
  character_profiles: CharacterProfile;
  regex_rules: RegexRule;
  knowledge_entries: KnowledgeEntry;
  vocabularies: Vocabulary;
  vocabulary_groups: VocabularyGroup;
  vocabulary_packages: VocabularyPackage;
  vocabulary_shards: VocabularyShard;
  image_records: ImageRecord;
  image_blobs: ImageBlob;
  generation_jobs: GenerationJob;
  migration_journal: MigrationJournal;
};

export interface DBSchema extends IdbDBSchema {
  provider_profiles: {
    key: string;
    value: ProviderProfile;
    indexes: {
      namespace: IDBValidKey;
      provider_id: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  prompt_presets: {
    key: string;
    value: PromptPreset;
    indexes: {
      namespace: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  comfy_workflows: {
    key: string;
    value: ComfyWorkflow;
    indexes: {
      namespace: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  novelai_vibes: {
    key: string;
    value: NovelAiVibe;
    indexes: {
      namespace: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  character_profiles: {
    key: string;
    value: CharacterProfile;
    indexes: {
      namespace: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  regex_rules: {
    key: string;
    value: RegexRule;
    indexes: {
      namespace: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  knowledge_entries: {
    key: string;
    value: KnowledgeEntry;
    indexes: {
      namespace: IDBValidKey;
      source_type: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  vocabularies: {
    key: string;
    value: Vocabulary;
    indexes: {
      namespace: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  vocabulary_groups: {
    key: string;
    value: VocabularyGroup;
    indexes: {
      namespace: IDBValidKey;
      vocabulary_id: IDBValidKey;
    };
  };
  vocabulary_packages: {
    key: string;
    value: VocabularyPackage;
    indexes: {
      namespace: IDBValidKey;
      data_version: IDBValidKey;
      state: IDBValidKey;
    };
  };
  vocabulary_shards: {
    key: string;
    value: VocabularyShard;
    indexes: {
      namespace: IDBValidKey;
      data_version: IDBValidKey;
      kind: IDBValidKey;
    };
  };
  image_records: {
    key: string;
    value: ImageRecord;
    indexes: {
      namespace: IDBValidKey;
      sha256: IDBValidKey;
      created_at: IDBValidKey;
      last_accessed_at: IDBValidKey;
      pinned: IDBValidKey;
    };
  };
  image_blobs: {
    key: string;
    value: ImageBlob;
    indexes: {
      ref_count: IDBValidKey;
      byte_length: IDBValidKey;
    };
  };
  generation_jobs: {
    key: string;
    value: GenerationJob;
    indexes: {
      namespace: IDBValidKey;
      request_id: IDBValidKey;
      request_digest: IDBValidKey;
      state: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
  migration_journal: {
    key: string;
    value: MigrationJournal;
    indexes: {
      source_version: IDBValidKey;
      state: IDBValidKey;
      updated_at: IDBValidKey;
    };
  };
}

export const RECORD_SCHEMAS: {
  [Store in NamespacedStoreName | "generation_jobs"]: z.ZodType<RecordByStore[Store]>;
} = {
  provider_profiles: ProviderProfileSchema,
  prompt_presets: PromptPresetSchema,
  comfy_workflows: ComfyWorkflowSchema,
  novelai_vibes: NovelAiVibeSchema,
  character_profiles: CharacterProfileSchema,
  regex_rules: RegexRuleSchema,
  knowledge_entries: KnowledgeEntrySchema,
  vocabularies: VocabularySchema,
  vocabulary_groups: VocabularyGroupSchema,
  vocabulary_packages: VocabularyPackageSchema,
  vocabulary_shards: VocabularyShardSchema,
  image_records: ImageRecordSchema,
  generation_jobs: GenerationJobSchema,
};

export const IMAGE_BLOB_SCHEMA: z.ZodType<ImageBlob> = ImageBlobSchema;
export const MIGRATION_JOURNAL_SCHEMA: z.ZodType<MigrationJournal> = MigrationJournalSchema;

const secret_key_pattern =
  /(credential|secret|token|authorization|auth|header|apikey|password|passwd|privatekey|accesskey|refreshtoken)/u;

function assert_json_value(value: unknown, path: string, seen: WeakSet<object>): asserts value is JsonValue {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return;
  }
  if (typeof value === "number") {
    if (Number.isFinite(value)) {
      return;
    }
    throw new TypeError(`${path} must contain finite JSON numbers`);
  }
  if (typeof value !== "object") {
    throw new TypeError(`${path} must be JSON serializable`);
  }
  if (
    (typeof Blob !== "undefined" && value instanceof Blob) ||
    value instanceof ArrayBuffer ||
    value instanceof Date ||
    value instanceof Map ||
    value instanceof Set
  ) {
    throw new TypeError(`${path} must not contain structured non-JSON values`);
  }
  if (seen.has(value)) {
    throw new TypeError(`${path} must not contain cycles`);
  }
  seen.add(value);
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      assert_json_value(item, `${path}[${index}]`, seen);
    }
  } else {
    if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
      throw new TypeError(`${path} must contain plain objects`);
    }
    for (const key of Reflect.ownKeys(value)) {
      if (typeof key !== "string") {
        throw new TypeError(`${path} must not contain symbol keys`);
      }
      assert_json_value(value[key as keyof typeof value], `${path}.${key}`, seen);
    }
  }
  seen.delete(value);
}

export function parse_json_value(value: unknown): JsonValue {
  assert_json_value(value, "payload", new WeakSet<object>());
  return json_value_schema.parse(value);
}

export function assert_safe_provider_payload(payload: unknown): void {
  const checked = parse_json_value(payload);
  const visit = (value: JsonValue, path: string): void => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }
    if (value !== null && typeof value === "object") {
      for (const [key, item] of Object.entries(value)) {
        const normalized_key = key.toLowerCase().replace(/[^a-z0-9]/gu, "");
        if (secret_key_pattern.test(normalized_key)) {
          throw new TypeError(`${path}.${key} contains a credential-like field`);
        }
        visit(item, `${path}.${key}`);
      }
    }
  };
  visit(checked, "payload");
}

export function validate_record_key(namespace: string, id: string, record_key: string): void {
  NamespaceSchema.parse(namespace);
  UuidSchema.parse(id);
  if (record_key !== `${namespace}:${id}`) {
    throw new TypeError("record_key must equal namespace + ':' + id");
  }
}

export function upgrade_database(
  database: IDBPDatabase<DBSchema>,
  old_version: number,
  _new_version: number | null,
  _transaction: IDBPTransaction<DBSchema, StoreName[], "versionchange">,
  _event: IDBVersionChangeEvent,
): void {
  if (old_version >= DATABASE_VERSION) {
    return;
  }
  for (const [store_name, definition] of Object.entries(STORE_DEFINITIONS) as [
    StoreName,
    (typeof STORE_DEFINITIONS)[StoreName],
  ][]) {
    const store = database.createObjectStore(store_name, { keyPath: definition.key_path });
    for (const index_name of definition.indexes) {
      store.createIndex(index_name as never, index_name);
    }
  }
}
