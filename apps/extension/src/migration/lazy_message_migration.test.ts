// @vitest-environment node
import "fake-indexeddb/auto";

import {
  create_business_repositories,
  dispose_database,
  open_database,
  DATABASE_NAME,
  type StorageDatabase,
} from "@tavern-canvas/storage";
import { md5_hex, type LegacySettings } from "@tavern-canvas/v2-migration";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import {
  TAVERN_CANVAS_SWIPE_METADATA_KEY,
  type HostChatMessageSnapshot,
  type HostChatSnapshot,
  type MessageUpdateRequest,
} from "../host/index.js";
import {
  migrate_active_chat_messages,
  type LazyMessageMigrationHost,
} from "./lazy_message_migration.js";

type MutableSwipe = {
  swipe_id: number;
  content: string;
  data: Record<string, unknown>;
  metadata: Record<string, unknown>;
};
type MutableMessage = Omit<HostChatMessageSnapshot, "swipes"> & { swipes: MutableSwipe[] };
type MutableChat = { chat_id: string; messages: MutableMessage[] };

/** Minimal host double: tracks multiple chats, but only ever answers "the active one" — mirrors the real HostAdapter's `get_active_chat()` contract. */
class RecordingHost implements LazyMessageMigrationHost {
  readonly #chats = new Map<string, MutableChat>();
  #active_chat_id: string;
  readonly update_calls: MessageUpdateRequest[] = [];
  /** When set, the chat state read back for verification differs from what was just written. */
  corrupt_verification_for: { message_id: number; swipe_id: number } | null = null;

  constructor(chat: MutableChat) {
    this.#chats.set(chat.chat_id, chat);
    this.#active_chat_id = chat.chat_id;
  }

  add_chat(chat: MutableChat): void {
    this.#chats.set(chat.chat_id, chat);
  }

  switch_active_chat(chat_id: string): void {
    this.#active_chat_id = chat_id;
  }

  get_active_chat(): Promise<HostChatSnapshot> {
    const chat = this.#chats.get(this.#active_chat_id);
    if (chat === undefined) {
      throw new Error("no active chat");
    }
    return Promise.resolve(structuredClone(chat));
  }

  update_message(request: MessageUpdateRequest): Promise<void> {
    this.update_calls.push(structuredClone(request));
    const chat = this.#chats.get(this.#active_chat_id);
    if (chat === undefined) {
      throw new Error("no active chat");
    }
    const message = chat.messages.find((candidate) => candidate.message_id === request.message_id);
    const swipe = message?.swipes.find((candidate) => candidate.swipe_id === request.swipe_id);
    if (message === undefined || swipe === undefined) {
      throw new Error("target swipe does not exist");
    }
    swipe.content = request.content;
    const corrupt =
      this.corrupt_verification_for !== null &&
      this.corrupt_verification_for.message_id === request.message_id &&
      this.corrupt_verification_for.swipe_id === request.swipe_id;
    swipe.metadata = {
      ...swipe.metadata,
      [TAVERN_CANVAS_SWIPE_METADATA_KEY]: corrupt
        ? { ...request.metadata, image_ids: [] }
        : structuredClone(request.metadata),
    };
    return Promise.resolve();
  }
}

function build_chat(chat_id: string, messages: MutableMessage[]): MutableChat {
  return { chat_id, messages };
}

function build_message(
  message_id: number,
  content: string,
  tags: readonly string[],
): MutableMessage {
  // v2 stores `extra.images` as a dictionary keyed by swipe id; this single swipe uses swipe_id 0.
  return {
    message_id,
    name: "Assistant",
    role: "assistant",
    is_hidden: false,
    active_swipe_id: 0,
    swipes: [
      {
        swipe_id: 0,
        content,
        data: tags.length > 0 ? { images: { "0": tags.map((tag) => ({ tag })) } } : {},
        metadata: {},
      },
    ],
  };
}

function jiuguan_storage_for(tag: string, uuid: string): LegacySettings["jiuguanStorage"] {
  return {
    [md5_hex(tag)]: {
      images: [
        {
          uuid,
          path: `user/images/${uuid}.png`,
          thumbnail_uuid: `${uuid}-thumb`,
          thumbnail_path: `user/images/${uuid}-thumb.png`,
          date: 0,
          isVideo: false,
          originalUrl: "",
          size: 0,
          thumbnail_size: 0,
        },
      ],
      index: 0,
      change: "",
    },
  };
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("migrate_active_chat_messages", () => {
  it("converts and writes message metadata for a chat that has never been migrated", async () => {
    const database: StorageDatabase = await open_database();
    const chat = build_chat("chat-a", [build_message(1, "a cat<image>cat</image>", ["cat"])]);
    const host = new RecordingHost(chat);
    const jiuguan_storage = jiuguan_storage_for("cat", "img-uuid-cat");

    const outcome = await migrate_active_chat_messages({
      database,
      host,
      namespace: "primary",
      jiuguan_storage,
      migrated_at: "2026-08-06T00:00:00.000Z",
    });

    expect(outcome).toEqual({ status: "migrated", chat_id: "chat-a", entries_written: 1 });
    expect(host.update_calls).toHaveLength(1);
    expect(host.update_calls[0]?.message_id).toBe(1);
    expect(host.update_calls[0]?.swipe_id).toBe(0);
    expect(host.update_calls[0]?.metadata.image_ids).toHaveLength(1);
    expect(host.update_calls[0]?.media).toEqual([
      { image_id: host.update_calls[0]?.metadata.image_ids[0] },
    ]);

    const repositories = create_business_repositories(database);
    const journal_entries = await repositories.migration_journal.list();
    const chat_entry = journal_entries.find((entry) => entry.migration_id.includes("chat-a"));
    expect(chat_entry?.state).toBe("completed");
  });

  it("skips a chat whose content fingerprint already matches its last successful migration", async () => {
    const database: StorageDatabase = await open_database();
    const chat = build_chat("chat-b", [build_message(1, "a cat<image>cat</image>", ["cat"])]);
    const host = new RecordingHost(chat);
    const jiuguan_storage = jiuguan_storage_for("cat", "img-uuid-cat");
    const options = {
      database,
      host,
      namespace: "primary",
      jiuguan_storage,
      migrated_at: "2026-08-06T00:00:00.000Z",
    };

    const first = await migrate_active_chat_messages(options);
    expect(first.status).toBe("migrated");
    host.update_calls.length = 0;

    const second = await migrate_active_chat_messages(options);
    expect(second).toEqual({ status: "skipped", chat_id: "chat-b" });
    expect(host.update_calls).toHaveLength(0);
  });

  it("writes only the changed message once the chat grows, leaving the already-migrated one untouched", async () => {
    const database: StorageDatabase = await open_database();
    const chat = build_chat("chat-c", [build_message(1, "a cat<image>cat</image>", ["cat"])]);
    const host = new RecordingHost(chat);
    const jiuguan_storage = {
      ...jiuguan_storage_for("cat", "img-uuid-cat"),
      ...jiuguan_storage_for("dog", "img-uuid-dog"),
    };
    const options = {
      database,
      host,
      namespace: "primary",
      jiuguan_storage,
      migrated_at: "2026-08-06T00:00:00.000Z",
    };

    const first = await migrate_active_chat_messages(options);
    expect(first).toEqual({ status: "migrated", chat_id: "chat-c", entries_written: 1 });
    host.update_calls.length = 0;

    chat.messages.push(build_message(2, "a dog<image>dog</image>", ["dog"]));
    const second = await migrate_active_chat_messages(options);

    expect(second).toEqual({ status: "migrated", chat_id: "chat-c", entries_written: 1 });
    expect(host.update_calls).toHaveLength(1);
    expect(host.update_calls[0]?.message_id).toBe(2);
  });

  it("warns instead of throwing on a dangling tag reference, leaving that entry's image_ids empty", async () => {
    const database: StorageDatabase = await open_database();
    const chat = build_chat("chat-d", [build_message(1, "a ghost<image>ghost</image>", ["ghost"])]);
    const host = new RecordingHost(chat);

    const outcome = await migrate_active_chat_messages({
      database,
      host,
      namespace: "primary",
      jiuguan_storage: {},
      migrated_at: "2026-08-06T00:00:00.000Z",
    });

    expect(outcome).toEqual({ status: "migrated", chat_id: "chat-d", entries_written: 1 });
    expect(host.update_calls[0]?.metadata.image_ids).toEqual([]);
  });

  it("returns partial with a verification_failed diagnostic, and does not journal success, when a write does not verify", async () => {
    const database: StorageDatabase = await open_database();
    const chat = build_chat("chat-e", [build_message(1, "a cat<image>cat</image>", ["cat"])]);
    const host = new RecordingHost(chat);
    host.corrupt_verification_for = { message_id: 1, swipe_id: 0 };
    const jiuguan_storage = jiuguan_storage_for("cat", "img-uuid-cat");

    const outcome = await migrate_active_chat_messages({
      database,
      host,
      namespace: "primary",
      jiuguan_storage,
      migrated_at: "2026-08-06T00:00:00.000Z",
    });

    expect(outcome.status).toBe("partial");
    if (outcome.status !== "partial") {
      throw new Error("unreachable");
    }
    expect(outcome.diagnostics).toEqual([
      { message_id: 1, swipe_id: 0, reason: "verification_failed" },
    ]);

    const repositories = create_business_repositories(database);
    const journal_entries = await repositories.migration_journal.list();
    expect(journal_entries.find((entry) => entry.migration_id.includes("chat-e"))).toBeUndefined();

    // Retrying (chat unchanged) should attempt again, not stay silently stuck skipped.
    host.corrupt_verification_for = null;
    const retry = await migrate_active_chat_messages({
      database,
      host,
      namespace: "primary",
      jiuguan_storage,
      migrated_at: "2026-08-06T00:00:00.000Z",
    });
    expect(retry.status).toBe("migrated");
  });

  it("never touches a chat other than the currently active one", async () => {
    const database: StorageDatabase = await open_database();
    const active_chat = build_chat("chat-active", [
      build_message(1, "a cat<image>cat</image>", ["cat"]),
    ]);
    const other_chat = build_chat("chat-other", [
      build_message(2, "a dog<image>dog</image>", ["dog"]),
    ]);
    const host = new RecordingHost(active_chat);
    host.add_chat(other_chat);
    const jiuguan_storage = {
      ...jiuguan_storage_for("cat", "img-uuid-cat"),
      ...jiuguan_storage_for("dog", "img-uuid-dog"),
    };

    const outcome = await migrate_active_chat_messages({
      database,
      host,
      namespace: "primary",
      jiuguan_storage,
      migrated_at: "2026-08-06T00:00:00.000Z",
    });

    expect(outcome).toEqual({ status: "migrated", chat_id: "chat-active", entries_written: 1 });
    expect(host.update_calls.every((call) => call.message_id === 1)).toBe(true);
    expect(other_chat.messages[0]?.swipes[0]?.metadata).toEqual({});
  });
});
