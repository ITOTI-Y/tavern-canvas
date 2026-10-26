import type { ProviderId, Uuid } from "@tavern-canvas/contracts";
import { ProviderIdSchema } from "@tavern-canvas/contracts";
import {
  delete_image_record,
  read_image_bytes,
  type GalleryImageRecord,
  type GalleryImageRecordRepository,
  type StorageDatabase,
} from "@tavern-canvas/storage";

import type {
  GalleryCapability,
  GalleryDomainEvent,
  GalleryMediaType,
  GalleryRecordSummary,
  SourceRevealOutcome,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import { DomainEventEmitter } from "./_records.js";

export interface GalleryCapabilityDeps {
  readonly database: StorageDatabase;
  readonly repository: GalleryImageRecordRepository;
  readonly namespace: () => string;
  readonly now: () => string;
  /** Scrolls the chat to a message; `null` when no host chat is available. */
  readonly reveal_message: ((chat_id: string, message_id: number) => SourceRevealOutcome) | null;
}

/** Video records have no grid representation and are filtered out instead of coerced into an image type. */
function to_gallery_media_type(record: GalleryImageRecord): GalleryMediaType | null {
  switch (record.media_type) {
    case "image/png":
    case "image/jpeg":
    case "image/webp":
      return record.media_type;
    case "video/mp4":
      return null;
  }
}

function to_summary(record: GalleryImageRecord): GalleryRecordSummary | null {
  const media_type = to_gallery_media_type(record);
  if (media_type === null) {
    return null;
  }
  const provider_id: ProviderId = ProviderIdSchema.parse(record.provider_id);
  return {
    id: record.id,
    provider_id,
    source_chat_id: record.source_message?.chat_id ?? null,
    source_message_id:
      record.source_message === null ? null : Number.parseInt(record.source_message.message_id, 10),
    media_type,
    width: record.width ?? null,
    height: record.height ?? null,
    pinned: record.pinned,
    quarantined: record.quarantined,
    created_at: record.created_at,
  };
}

export function create_gallery_capability(deps: GalleryCapabilityDeps): GalleryCapability {
  const events = new DomainEventEmitter<GalleryDomainEvent>();

  async function read(record_id: Uuid): Promise<GalleryImageRecord> {
    const record = await deps.repository.get(deps.namespace(), record_id);
    if (record === null) {
      throw capability_unavailable_error(`Gallery record ${record_id} no longer exists`);
    }
    return record;
  }

  async function write(record: GalleryImageRecord): Promise<void> {
    await deps.repository.put(deps.namespace(), record);
    const summary = to_summary(record);
    if (summary !== null) {
      events.emit({ type: "record_upserted", record: summary });
    }
  }

  async function remove(record_id: Uuid): Promise<void> {
    await delete_image_record(deps.database, deps.namespace(), record_id);
    events.emit({ type: "record_removed", record_id });
  }

  return {
    async load() {
      const records = await deps.repository.list(deps.namespace());
      return records.flatMap((record) => {
        const summary = to_summary(record);
        return summary === null ? [] : [summary];
      });
    },
    subscribe: (handler) => events.subscribe(handler),
    async read_bytes(record_id) {
      const record = await read(record_id);
      const bytes = await read_image_bytes(deps.database, record.sha256);
      if (bytes === null) {
        throw capability_unavailable_error(
          `Gallery record ${record_id} has no stored bytes; the blob was evicted`,
        );
      }
      return bytes;
    },
    async pin(record_id, pinned) {
      const record = await read(record_id);
      await write({ ...record, pinned, updated_at: deps.now() });
    },
    /** Detach clears the record's chat-message link without deleting the image; `quarantined` is the flag the orphan filter reads. */
    async detach_from_message(record_id) {
      const record = await read(record_id);
      await write({ ...record, quarantined: true, updated_at: deps.now() });
    },
    async reveal_source(record_id) {
      const source = (await read(record_id)).source_message;
      if (source === null || deps.reveal_message === null) {
        return "not_found";
      }
      return deps.reveal_message(source.chat_id, Number.parseInt(source.message_id, 10));
    },
    delete_record: remove,
    async bulk_delete(record_ids) {
      for (const record_id of record_ids) {
        await remove(record_id);
      }
    },
  };
}
