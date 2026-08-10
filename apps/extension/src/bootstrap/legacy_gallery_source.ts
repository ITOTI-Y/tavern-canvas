type PropertyRecord = Record<string, unknown>;

const LEGACY_GALLERY_DATABASE = "chatu8_gallery";
const LEGACY_GALLERY_DATABASE_OLD = "tupian";
const LEGACY_CONFIG_IMAGE_DATABASE = "chatu8_config_images";
const LEGACY_GALLERY_STORE = "tupianhuancun";
const LEGACY_CONFIG_IMAGE_STORE = "config_images";

interface IndexedDbRecord {
  readonly key: IDBValidKey | undefined;
  readonly value: unknown;
}

interface DatabaseInfo {
  readonly name?: string;
}

interface IndexedDbFactory {
  open(name: string): IDBOpenDBRequest;
  databases?: () => Promise<readonly DatabaseInfo[]>;
}

function read_property(container: unknown, property_name: string): unknown {
  if ((typeof container !== "object" || container === null) && typeof container !== "function") {
    return undefined;
  }
  try {
    return Reflect.get(container, property_name);
  } catch {
    return undefined;
  }
}
function as_record(value: unknown): PropertyRecord | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  return value as PropertyRecord;
}

function key_to_string(key: IDBValidKey | undefined): string | undefined {
  if (typeof key === "string") {
    return key;
  }
  if (typeof key === "number" && Number.isFinite(key)) {
    return String(key);
  }
  return undefined;
}

function is_array_buffer(value: unknown): value is ArrayBuffer {
  return Object.prototype.toString.call(value) === "[object ArrayBuffer]";
}

function is_binary_view(value: unknown): value is ArrayBufferView {
  return ArrayBuffer.isView(value);
}

function bytes_from_binary(value: unknown): Uint8Array | null {
  if (is_array_buffer(value)) {
    return new Uint8Array(value.slice(0));
  }
  if (is_binary_view(value)) {
    return new Uint8Array(
      value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength),
    );
  }
  if (Array.isArray(value) && value.every((entry) => typeof entry === "number")) {
    if (value.some((entry) => !Number.isInteger(entry) || entry < 0 || entry > 255)) {
      return null;
    }
    return Uint8Array.from(value);
  }
  return null;
}

function decode_base64(value: string): Uint8Array {
  const trimmed = value.trim();
  const payload = trimmed.startsWith("data:") ? trimmed.slice(trimmed.indexOf(",") + 1) : trimmed;
  if (payload.length === 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(payload)) {
    throw new Error("legacy image base64 is malformed");
  }
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function bytes_to_base64(bytes: Uint8Array): string {
  let binary = "";
  const chunk_size = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunk_size) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunk_size));
  }
  return btoa(binary);
}

async function read_blob_bytes(value: unknown): Promise<Uint8Array | null> {
  const direct = bytes_from_binary(value);
  if (direct !== null) {
    return direct;
  }
  if (typeof value === "string") {
    try {
      return decode_base64(value);
    } catch {
      return null;
    }
  }
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const array_buffer = read_property(value, "arrayBuffer");
  if (typeof array_buffer === "function") {
    try {
      const read_array_buffer = array_buffer as (this: unknown) => Promise<unknown>;
      const result = await read_array_buffer.call(value);
      return bytes_from_binary(result);
    } catch {
      return null;
    }
  }
  return null;
}

function record_key(record: IndexedDbRecord, value: PropertyRecord): string | undefined {
  return (
    (typeof value.uuid === "string" ? value.uuid : undefined) ??
    (typeof value.id === "string" ? value.id : undefined) ??
    (typeof value.key === "string" ? value.key : undefined) ??
    key_to_string(record.key)
  );
}

function looks_like_tag_entry(value: unknown): value is PropertyRecord & { images: unknown[] } {
  const record = as_record(value);
  return record !== null && Array.isArray(record.images);
}

function looks_like_row(value: unknown, field_names: readonly string[]): boolean {
  const record = as_record(value);
  return (
    record !== null &&
    field_names.some(
      (field_name) =>
        typeof record[field_name] === "string" || typeof record[field_name] === "number",
    )
  );
}

interface ExpandedRecord {
  readonly key: string | undefined;
  readonly value: unknown;
}

function expand_records(records: readonly IndexedDbRecord[]): ExpandedRecord[] {
  const expanded: ExpandedRecord[] = [];
  const visit = (key: string | undefined, value: unknown, depth: number): void => {
    if (depth > 8) {
      expanded.push({ key, value });
      return;
    }
    if (
      bytes_from_binary(value) !== null ||
      typeof read_property(value, "arrayBuffer") === "function"
    ) {
      expanded.push({ key, value });
      return;
    }
    const source = as_record(value);
    if (Array.isArray(value)) {
      for (const item of value) {
        visit(undefined, item, depth + 1);
      }
      return;
    }
    if (source === null) {
      expanded.push({ key, value });
      return;
    }
    if ("value" in source && ("key" in source || "id" in source) && !looks_like_tag_entry(source)) {
      const nested_key = read_string(source.key, read_string(source.id, key));
      visit(nested_key.length > 0 ? nested_key : key, source.value, depth + 1);
      return;
    }
    if (
      looks_like_tag_entry(source) ||
      looks_like_row(source, ["id_index", "idIndex", "fileName", "file_name", "hot"]) ||
      typeof source.id === "string" ||
      typeof source.uuid === "string"
    ) {
      expanded.push({ key, value });
      return;
    }
    for (const [nested_key, nested_value] of Object.entries(source)) {
      visit(nested_key, nested_value, depth + 1);
    }
  };

  for (const record of records) {
    const source = as_record(record.value);
    visit(record_key(record, source ?? {}), record.value, 0);
  }
  return expanded;
}

function read_nonnegative_integer(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : fallback;
}

function read_string(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function normalize_base64(value: unknown): string | undefined {
  if (typeof value !== "string" || value.trim().length === 0) {
    return undefined;
  }
  return bytes_to_base64(decode_base64(value));
}

function normalize_image_entry(value: unknown, fallback_uuid: string | undefined): PropertyRecord {
  const source = as_record(value);
  if (source === null) {
    throw new Error("legacy gallery image entry is not an object");
  }
  const uuid = read_string(source.uuid, read_string(source.id, fallback_uuid));
  if (uuid.length === 0) {
    throw new Error("legacy gallery image entry has no uuid");
  }
  const normalized: PropertyRecord = {
    uuid,
    date: read_nonnegative_integer(source.date, read_nonnegative_integer(source.createdAt)),
    isVideo: source.isVideo === true || source.is_video === true,
    originalUrl: read_string(source.originalUrl, read_string(source.original_url)),
    size: read_nonnegative_integer(source.size),
    thumbnail_size: read_nonnegative_integer(
      source.thumbnail_size,
      read_nonnegative_integer(source.thumbnailSize),
    ),
  };
  const path = read_string(source.path, read_string(source.url));
  if (path.length > 0) {
    normalized.path = path;
  }
  const thumbnail_uuid = read_string(source.thumbnail_uuid, read_string(source.thumbnailUuid));
  if (thumbnail_uuid.length > 0) {
    normalized.thumbnail_uuid = thumbnail_uuid;
  }
  const thumbnail_path = read_string(source.thumbnail_path, read_string(source.thumbnailPath));
  if (thumbnail_path.length > 0) {
    normalized.thumbnail_path = thumbnail_path;
  }
  if (source.genParams !== undefined || source.gen_params !== undefined) {
    normalized.genParams = source.genParams ?? source.gen_params ?? null;
  }
  const data_base64 = normalize_base64(source.data_base64 ?? source.dataBase64);
  if (data_base64 !== undefined) {
    normalized.data_base64 = data_base64;
  }
  return normalized;
}

async function read_direct_image_bytes(value: unknown): Promise<Uint8Array | null> {
  const direct = await read_blob_bytes(value);
  if (direct !== null) {
    return direct;
  }
  const source = as_record(value);
  if (source === null) {
    return null;
  }
  for (const field_name of ["data_base64", "dataBase64", "blob", "bytes", "buffer", "data"]) {
    const candidate = source[field_name];
    if (candidate === undefined) {
      continue;
    }
    const bytes =
      typeof candidate === "string"
        ? (() => {
            try {
              return decode_base64(candidate);
            } catch {
              return null;
            }
          })()
        : await read_blob_bytes(candidate);
    if (bytes !== null && bytes.byteLength > 0) {
      return bytes;
    }
  }
  return null;
}

async function read_tupian_records(
  records: readonly IndexedDbRecord[],
): Promise<{ metadata: Record<string, PropertyRecord>; blobs: Record<string, string> }> {
  const metadata: Record<string, PropertyRecord> = {};
  const blobs: Record<string, string> = {};
  for (const record of records) {
    const value = record.value;
    const direct_key = record_key(record, as_record(value) ?? {});
    const direct_bytes = await read_direct_image_bytes(value);
    if (direct_bytes !== null && direct_key !== undefined) {
      blobs[direct_key] = bytes_to_base64(direct_bytes);
      continue;
    }

    for (const candidate of expand_records([record])) {
      if (looks_like_tag_entry(candidate.value)) {
        const tag_key = candidate.key ?? read_string(as_record(candidate.value)?.tag);
        if (tag_key.length === 0) {
          throw new Error("legacy gallery metadata entry has no tag key");
        }
        const tag_value = candidate.value;
        const images: PropertyRecord[] = [];
        for (const image_value of tag_value.images) {
          const image = normalize_image_entry(image_value, undefined);
          const image_bytes = await read_direct_image_bytes(image_value);
          if (image_bytes !== null) {
            blobs[String(image.uuid)] = bytes_to_base64(image_bytes);
          }
          const thumbnail_uuid = read_string(image.thumbnail_uuid);
          const image_source = as_record(image_value);
          if (thumbnail_uuid.length > 0 && image_source !== null) {
            const thumbnail_bytes = await read_blob_bytes(
              image_source.thumbnail_data ?? image_source.thumbnail_blob ?? image_source.thumbnail,
            );
            if (thumbnail_bytes !== null) {
              blobs[thumbnail_uuid] = bytes_to_base64(thumbnail_bytes);
            }
          }
          images.push(image);
        }
        metadata[tag_key] = {
          images,
          index: read_nonnegative_integer(tag_value.index),
          change: read_string(tag_value.change),
        };
        continue;
      }

      const candidate_bytes = await read_direct_image_bytes(candidate.value);
      const candidate_source = as_record(candidate.value);
      const candidate_key = read_string(candidate_source?.uuid, candidate.key);
      if (candidate_bytes !== null && candidate_key.length > 0) {
        blobs[candidate_key] = bytes_to_base64(candidate_bytes);
      }
    }
  }
  return { metadata, blobs };
}

function normalize_gallery_row(
  value: unknown,
  kind: "group" | "tag",
  fallback_key?: string,
): PropertyRecord {
  const source = as_record(value);
  if (source === null) {
    throw new Error(`legacy gallery ${kind} row is not an object`);
  }
  if (kind === "tag") {
    const file_name = read_string(source.fileName, read_string(source.file_name));
    const name = read_string(source.name, fallback_key);
    if (file_name.length === 0 || name.length === 0) {
      throw new Error("legacy gallery tag row is missing fileName or name");
    }
    const normalized: PropertyRecord = { fileName: file_name, name };
    if (source.hot !== undefined) {
      normalized.hot = read_nonnegative_integer(source.hot);
    }
    return normalized;
  }
  const id_index = read_string(source.id_index, read_string(source.idIndex, fallback_key));
  const file_name = read_string(source.fileName, read_string(source.file_name));
  const name = read_string(source.name, fallback_key);
  if (id_index.length === 0 || file_name.length === 0 || name.length === 0) {
    throw new Error(`legacy gallery ${kind} row is missing id_index, fileName, or name`);
  }
  return { id_index, fileName: file_name, name };
}

function read_rows(records: readonly IndexedDbRecord[], kind: "group" | "tag"): PropertyRecord[] {
  const rows: PropertyRecord[] = [];
  for (const candidate of expand_records(records)) {
    const values = Array.isArray(candidate.value) ? candidate.value : [candidate.value];
    for (const value of values) {
      rows.push(normalize_gallery_row(value, kind, candidate.key));
    }
  }
  return rows;
}

async function read_config_images(records: readonly IndexedDbRecord[]): Promise<PropertyRecord[]> {
  const entries: PropertyRecord[] = [];
  const handled_records = new Set<IndexedDbRecord>();
  for (const record of records) {
    const source = as_record(record.value);
    if (source !== null && "value" in source && ("key" in source || "id" in source)) {
      const id = read_string(source.id, read_string(source.key, key_to_string(record.key)));
      const bytes = await read_blob_bytes(source.value);
      if (id.length > 0 && bytes !== null && bytes.byteLength > 0) {
        entries.push({
          id,
          data_base64: bytes_to_base64(bytes),
          date: read_nonnegative_integer(source.date, read_nonnegative_integer(source.createdAt)),
        });
        handled_records.add(record);
      }
    }
  }
  for (const candidate of expand_records(
    records.filter((record) => !handled_records.has(record)),
  )) {
    const source = as_record(candidate.value);
    const id = read_string(source?.id, read_string(source?.uuid, candidate.key));
    if (id.length === 0) {
      throw new Error("legacy config image entry has no id");
    }
    const bytes =
      source === null
        ? await read_blob_bytes(candidate.value)
        : await read_direct_image_bytes(source);
    if (bytes === null || bytes.byteLength === 0) {
      throw new Error(`legacy config image ${id} has no bytes`);
    }
    entries.push({
      id,
      data_base64: bytes_to_base64(bytes),
      date: read_nonnegative_integer(source?.date, read_nonnegative_integer(source?.createdAt)),
    });
  }
  return entries;
}

function has_store(database: IDBDatabase, store_name: string): boolean {
  return database.objectStoreNames.contains(store_name);
}

function read_store_records(
  database: IDBDatabase,
  store_name: string,
): Promise<readonly IndexedDbRecord[]> {
  if (!has_store(database, store_name)) {
    return Promise.reject(new Error(`Legacy IndexedDB is missing store ${store_name}`));
  }
  const { promise, resolve, reject } = Promise.withResolvers<readonly IndexedDbRecord[]>();
  let settled = false;
  const records: IndexedDbRecord[] = [];
  let transaction: IDBTransaction;
  try {
    transaction = database.transaction(store_name, "readonly");
    const request = transaction.objectStore(store_name).openCursor();
    request.onerror = () => {
      if (!settled) {
        settled = true;
        reject(request.error ?? new Error(`Failed to read IndexedDB store ${store_name}`));
      }
    };
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor === null) {
        if (!settled) {
          settled = true;
          resolve(records);
        }
        return;
      }
      records.push({ key: cursor.key, value: cursor.value });
      cursor.continue();
    };
    transaction.onerror = () => {
      if (!settled) {
        settled = true;
        reject(transaction.error ?? new Error(`Failed to read IndexedDB store ${store_name}`));
      }
    };
  } catch (error) {
    reject(error instanceof Error ? error : new Error(String(error)));
  }
  return promise;
}

function read_indexed_db(globals: unknown): IndexedDbFactory | null {
  const candidate = read_property(globals, "indexedDB") ?? read_property(globalThis, "indexedDB");
  if (typeof candidate !== "object" || candidate === null) {
    return null;
  }
  const open = read_property(candidate, "open");
  if (typeof open !== "function") {
    return null;
  }
  return candidate as IndexedDbFactory;
}

async function list_database_names(factory: IndexedDbFactory): Promise<ReadonlySet<string> | null> {
  const databases = read_property(factory, "databases");
  if (typeof databases !== "function") {
    return null;
  }
  try {
    const values = (await Reflect.apply(databases, factory, [])) as readonly DatabaseInfo[];
    return new Set(
      values.map((entry) => entry.name).filter((name): name is string => name !== undefined),
    );
  } catch {
    return null;
  }
}

function open_existing_database(
  factory: IndexedDbFactory,
  database_name: string,
): Promise<IDBDatabase | null> {
  const { promise, resolve, reject } = Promise.withResolvers<IDBDatabase | null>();
  let created = false;
  let settled = false;
  let request: IDBOpenDBRequest;
  try {
    request = factory.open(database_name);
  } catch (error) {
    reject(error instanceof Error ? error : new Error(String(error)));
    return promise;
  }
  request.onupgradeneeded = () => {
    created = true;
    request.transaction?.abort();
  };
  request.onblocked = () => {
    if (!settled) {
      settled = true;
      reject(new Error(`Legacy IndexedDB ${database_name} is blocked by another connection`));
    }
  };
  request.onerror = () => {
    if (settled) {
      return;
    }
    settled = true;
    if (created) {
      resolve(null);
      return;
    }
    reject(request.error ?? new Error(`Failed to open legacy IndexedDB ${database_name}`));
  };
  request.onsuccess = () => {
    if (settled) {
      request.result.close();
      return;
    }
    settled = true;
    if (created) {
      request.result.close();
      resolve(null);
      return;
    }
    resolve(request.result);
  };
  return promise;
}

async function read_existing_database(
  factory: IndexedDbFactory,
  database_name: string,
  known_names: ReadonlySet<string> | null,
): Promise<IDBDatabase | null> {
  if (known_names !== null && !known_names.has(database_name)) {
    return null;
  }
  return open_existing_database(factory, database_name);
}

export async function read_legacy_gallery_database(globals: unknown): Promise<unknown> {
  const factory = read_indexed_db(globals);
  if (factory === null) {
    return undefined;
  }
  const known_names = await list_database_names(factory);
  const gallery_database = await read_existing_database(
    factory,
    LEGACY_GALLERY_DATABASE,
    known_names,
  );
  const old_gallery_database = await read_existing_database(
    factory,
    LEGACY_GALLERY_DATABASE_OLD,
    known_names,
  );
  const config_database = await read_existing_database(
    factory,
    LEGACY_CONFIG_IMAGE_DATABASE,
    known_names,
  );
  if (gallery_database === null && old_gallery_database === null && config_database === null) {
    return undefined;
  }

  const metadata: Record<string, PropertyRecord> = {};
  const blobs: Record<string, string> = {};
  const groups: PropertyRecord[] = [];
  const subgroups: PropertyRecord[] = [];
  const tags: PropertyRecord[] = [];
  const config_images: PropertyRecord[] = [];
  try {
    if (old_gallery_database !== null) {
      if (!has_store(old_gallery_database, LEGACY_GALLERY_STORE)) {
        throw new Error(
          `Legacy IndexedDB ${LEGACY_GALLERY_DATABASE_OLD} is missing store ${LEGACY_GALLERY_STORE}`,
        );
      }
      const old_result = await read_tupian_records(
        await read_store_records(old_gallery_database, LEGACY_GALLERY_STORE),
      );
      Object.assign(metadata, old_result.metadata);
      Object.assign(blobs, old_result.blobs);
    }
    if (gallery_database !== null) {
      if (!has_store(gallery_database, LEGACY_GALLERY_STORE)) {
        throw new Error(
          `Legacy IndexedDB ${LEGACY_GALLERY_DATABASE} is missing store ${LEGACY_GALLERY_STORE}`,
        );
      }
      const current_result = await read_tupian_records(
        await read_store_records(gallery_database, LEGACY_GALLERY_STORE),
      );
      Object.assign(metadata, current_result.metadata);
      Object.assign(blobs, current_result.blobs);
      if (has_store(gallery_database, "groups")) {
        groups.push(...read_rows(await read_store_records(gallery_database, "groups"), "group"));
      }
      if (has_store(gallery_database, "subgroups")) {
        subgroups.push(
          ...read_rows(await read_store_records(gallery_database, "subgroups"), "group"),
        );
      }
      if (has_store(gallery_database, "tags")) {
        tags.push(...read_rows(await read_store_records(gallery_database, "tags"), "tag"));
      }
    }
    if (config_database !== null) {
      if (!has_store(config_database, LEGACY_CONFIG_IMAGE_STORE)) {
        throw new Error(
          `Legacy IndexedDB ${LEGACY_CONFIG_IMAGE_DATABASE} is missing store ${LEGACY_CONFIG_IMAGE_STORE}`,
        );
      }
      config_images.push(
        ...(await read_config_images(
          await read_store_records(config_database, LEGACY_CONFIG_IMAGE_STORE),
        )),
      );
    }
  } finally {
    gallery_database?.close();
    old_gallery_database?.close();
    config_database?.close();
  }

  return {
    tupianhuancun_metadata: metadata,
    tupianhuancun_blobs: blobs,
    groups,
    subgroups,
    tags,
    config_images,
  };
}
