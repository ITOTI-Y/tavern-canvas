import {
  TavernCanvasMessageMetadataSchema,
  type TavernCanvasMessageMetadata,
} from "@tavern-canvas/contracts";
import {
  MigrationJournalRepository,
  parse_json_value,
  type MigrationJournal,
  type StorageDatabase,
} from "@tavern-canvas/storage";
import {
  convert_messages,
  LegacyMessagesFixtureSchema,
  sha256_hex,
  type LegacyMessage,
  type LegacyMessageImageEntry,
  type LegacyMessagesFixture,
  type LegacySettings,
} from "@tavern-canvas/v2-migration";

import {
  TAVERN_CANVAS_SWIPE_METADATA_KEY,
  type HostChatSnapshot,
  type HostMessageSwipeSnapshot,
  type MessageUpdateRequest,
} from "../host/index.js";

/** The subset of `HostAdapter` this module needs: read the open chat, write metadata back to one message. */
export interface LazyMessageMigrationHost {
  get_active_chat(): Promise<HostChatSnapshot>;
  update_message(request: MessageUpdateRequest): Promise<void>;
}

export interface LazyMessageMigrationOptions {
  readonly database: StorageDatabase;
  readonly host: LazyMessageMigrationHost;
  readonly namespace: string;
  readonly jiuguan_storage: LegacySettings["jiuguanStorage"];
  readonly migrated_at?: string;
}

export type MessageMigrationDiagnosticReason = "swipe_missing" | "verification_failed";

export interface MessageMigrationDiagnostic {
  readonly message_id: number;
  readonly swipe_id: number;
  readonly reason: MessageMigrationDiagnosticReason;
}

export type MessageMigrationOutcome =
  | { readonly status: "skipped"; readonly chat_id: string }
  | { readonly status: "migrated"; readonly chat_id: string; readonly entries_written: number }
  | {
      readonly status: "partial";
      readonly chat_id: string;
      readonly entries_written: number;
      readonly diagnostics: readonly MessageMigrationDiagnostic[];
    };

const CHAT_MIGRATION_SOURCE_VERSION = 2 as const;

function chat_migration_id(namespace: string, chat_id: string): string {
  return `message_migration:${namespace}:${chat_id}`;
}

interface ChatMigrationPayload {
  readonly chat_id: string;
  readonly namespace: string;
  readonly fingerprint: string;
  readonly entries_written: number;
}

function is_chat_migration_payload(value: unknown): value is ChatMigrationPayload {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { fingerprint?: unknown }).fingerprint === "string"
  );
}

/**
 * A v2 message's image tags lived under `extra.images`, a dictionary keyed by
 * swipe id whose *values* are the per-swipe `{tag, regex?, locked?}` entry
 * arrays (confirmed against the archived v2 source: `saveImageGroup` writes
 * `chat[id].extra.images[swipe_id] = mergedImages`) — never a bare array
 * itself. This mirrors `message_converter.ts`'s own
 * `Object.entries(message.extra?.images ?? {})` treatment of the same field;
 * `extra.images` is reconstructed here from `HostChatSnapshot` rather than a
 * standalone fixture, since it is the one part of the v2 data model
 * `message_converter` (Task 5) never had to define itself. Anything not
 * shaped like a tag entry is skipped rather than rejected, since a host
 * swipe can carry unrelated `extra` data.
 */
function extract_legacy_image_entries(
  data: Readonly<Record<string, unknown>>,
  swipe_id: number,
): LegacyMessageImageEntry[] {
  const images_by_swipe = data.images;
  if (
    typeof images_by_swipe !== "object" ||
    images_by_swipe === null ||
    Array.isArray(images_by_swipe)
  ) {
    return [];
  }
  const raw = (images_by_swipe as Record<string, unknown>)[String(swipe_id)];
  if (!Array.isArray(raw)) {
    return [];
  }
  const entries: LegacyMessageImageEntry[] = [];
  for (const item of raw as readonly unknown[]) {
    if (typeof item !== "object" || item === null) {
      continue;
    }
    const tag = (item as Record<string, unknown>).tag;
    if (typeof tag === "string" && tag.length > 0) {
      entries.push({ tag });
    }
  }
  return entries;
}

function to_legacy_messages(chat: HostChatSnapshot): LegacyMessagesFixture {
  const messages: LegacyMessage[] = chat.messages.map((message) => {
    const active_swipe = message.swipes.find(
      (swipe): swipe is HostMessageSwipeSnapshot => swipe.swipe_id === message.active_swipe_id,
    );
    const images: Record<string, LegacyMessageImageEntry[]> = {};
    for (const swipe of message.swipes) {
      const entries = extract_legacy_image_entries(swipe.data, swipe.swipe_id);
      if (entries.length > 0) {
        images[String(swipe.swipe_id)] = entries;
      }
    }
    return {
      chat_id: chat.chat_id,
      message_id: message.message_id,
      role: message.role,
      mes: active_swipe?.content ?? "",
      swipe_id: message.active_swipe_id,
      ...(Object.keys(images).length > 0 ? { extra: { images } } : {}),
    };
  });
  return LegacyMessagesFixtureSchema.parse({ messages });
}

function read_stored_metadata(
  metadata: Readonly<Record<string, unknown>>,
): TavernCanvasMessageMetadata | undefined {
  const parsed = TavernCanvasMessageMetadataSchema.safeParse(
    metadata[TAVERN_CANVAS_SWIPE_METADATA_KEY],
  );
  return parsed.success ? parsed.data : undefined;
}

function metadata_equal(
  left: TavernCanvasMessageMetadata | undefined,
  right: TavernCanvasMessageMetadata,
): boolean {
  return left !== undefined && JSON.stringify(left) === JSON.stringify(right);
}

/**
 * Converts and journals message metadata for the chat that is open right
 * now. The host cannot enumerate every v2 chat, so this never scans or
 * touches any chat other than the active one, and skips entirely once a
 * chat's content fingerprint matches its last successful migration. A
 * mismatch found only after `update_message` (the re-read verification)
 * downgrades the whole call to `"partial"`: the affected message stays
 * unjournaled so the next time this chat opens, it is retried.
 */
export async function migrate_active_chat_messages(
  options: LazyMessageMigrationOptions,
): Promise<MessageMigrationOutcome> {
  const { database, host, namespace, jiuguan_storage } = options;
  const migrated_at = options.migrated_at ?? new Date().toISOString();

  const chat = await host.get_active_chat();
  const fixture = to_legacy_messages(chat);
  const fingerprint = sha256_hex(JSON.stringify(fixture));

  const repository = new MigrationJournalRepository(database);
  const migration_id = chat_migration_id(namespace, chat.chat_id);
  const existing = await repository.get(migration_id);
  if (
    existing !== null &&
    existing.state === "completed" &&
    is_chat_migration_payload(existing.payload) &&
    existing.payload.fingerprint === fingerprint
  ) {
    return { status: "skipped", chat_id: chat.chat_id };
  }

  const conversion = convert_messages(fixture, jiuguan_storage, { namespace, migrated_at });

  const diagnostics: MessageMigrationDiagnostic[] = [];
  let entries_written = 0;
  for (const entry of conversion.entries) {
    const message = chat.messages.find((candidate) => candidate.message_id === entry.message_id);
    const swipe = message?.swipes.find((candidate) => candidate.swipe_id === entry.swipe_id);
    if (message === undefined || swipe === undefined) {
      diagnostics.push({
        message_id: entry.message_id,
        swipe_id: entry.swipe_id,
        reason: "swipe_missing",
      });
      continue;
    }
    if (metadata_equal(read_stored_metadata(swipe.metadata), entry.metadata)) {
      continue;
    }
    await host.update_message({
      message_id: entry.message_id,
      swipe_id: entry.swipe_id,
      content: swipe.content,
      metadata: entry.metadata,
      media: entry.metadata.image_ids.map((image_id) => ({ image_id })),
    });
    entries_written += 1;
  }

  if (entries_written > 0) {
    const verification_chat = await host.get_active_chat();
    for (const entry of conversion.entries) {
      const message = verification_chat.messages.find(
        (candidate) => candidate.message_id === entry.message_id,
      );
      const swipe = message?.swipes.find((candidate) => candidate.swipe_id === entry.swipe_id);
      const stored = swipe === undefined ? undefined : read_stored_metadata(swipe.metadata);
      if (!metadata_equal(stored, entry.metadata)) {
        diagnostics.push({
          message_id: entry.message_id,
          swipe_id: entry.swipe_id,
          reason: "verification_failed",
        });
      }
    }
  }

  if (diagnostics.length > 0) {
    return { status: "partial", chat_id: chat.chat_id, entries_written, diagnostics };
  }

  const payload: ChatMigrationPayload = {
    chat_id: chat.chat_id,
    namespace,
    fingerprint,
    entries_written,
  };
  const record: MigrationJournal = {
    migration_id,
    source_version: CHAT_MIGRATION_SOURCE_VERSION,
    state: "completed",
    updated_at: migrated_at,
    payload: parse_json_value(payload),
  };
  if (existing === null) {
    await repository.create(record);
  } else {
    await repository.update(record);
  }

  return { status: "migrated", chat_id: chat.chat_id, entries_written };
}
