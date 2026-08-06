import {
  create_generation_anchors,
  SourceContextSchema,
  type SourceContext,
} from "@tavern-canvas/core";
import {
  TavernCanvasMessageMetadataSchema,
  type TavernCanvasMessageMetadata,
} from "@tavern-canvas/contracts";

import { type ConversionContext, type ConversionWarning } from "../conversion_result.js";
import {
  DeterministicRandomSource,
  deterministic_uuid,
  md5_hex,
  sha256_hex,
} from "../id_derivation.js";
import type { LegacyMessage, LegacyMessagesFixture, LegacySettings } from "../legacy_schema.js";

export interface ConvertedMessageMetadata {
  readonly chat_id: string;
  readonly message_id: number;
  readonly swipe_id: number;
  readonly metadata: TavernCanvasMessageMetadata;
}

export interface MessageConversionResult {
  readonly entries: readonly ConvertedMessageMetadata[];
  readonly warnings: readonly ConversionWarning[];
}

function resolve_image_ids(
  message: LegacyMessage,
  swipe_key: string,
  tags: readonly { readonly tag: string }[],
  jiuguan_storage: LegacySettings["jiuguanStorage"],
  context: ConversionContext,
  warnings: ConversionWarning[],
): string[] {
  const image_ids = new Set<string>();
  for (const { tag } of tags) {
    const storage_key = md5_hex(tag);
    const group = jiuguan_storage[storage_key];
    if (group === undefined) {
      warnings.push({
        path: `chat[${message.chat_id}].${String(message.message_id)}.extra.images[${swipe_key}]`,
        message: `No jiuguanStorage entry for tag ${JSON.stringify(tag)} (md5 ${storage_key}); the referenced image(s) were not migrated.`,
      });
      continue;
    }
    for (const image of group.images) {
      image_ids.add(
        deterministic_uuid(`${context.namespace}:gallery_converter:server:${image.uuid}`),
      );
    }
  }
  return [...image_ids].toSorted();
}

export function convert_messages(
  fixture: LegacyMessagesFixture,
  jiuguan_storage: LegacySettings["jiuguanStorage"],
  context: ConversionContext,
): MessageConversionResult {
  const warnings: ConversionWarning[] = [];
  const entries: ConvertedMessageMetadata[] = [];

  for (const message of fixture.messages) {
    const images_by_swipe = message.extra?.images ?? {};
    for (const [swipe_key, tags] of Object.entries(images_by_swipe)) {
      const swipe_id = Number(swipe_key);
      if (!Number.isInteger(swipe_id) || swipe_id < 0) {
        warnings.push({
          path: `chat[${message.chat_id}].${String(message.message_id)}.extra.images`,
          message: `Swipe key ${JSON.stringify(swipe_key)} is not a nonnegative integer; skipped.`,
        });
        continue;
      }

      const image_ids = resolve_image_ids(
        message,
        swipe_key,
        tags,
        jiuguan_storage,
        context,
        warnings,
      );

      const source_context: SourceContext = SourceContextSchema.parse({
        schema_version: 1,
        chat_id: message.chat_id,
        active_swipes: [{ message_id: message.message_id, swipe_id }],
        messages: [
          {
            message_id: message.message_id,
            role: message.role,
            content_sha256: sha256_hex(message.mes),
            swipe_id: message.swipe_id,
          },
        ],
      });
      const random_source = new DeterministicRandomSource(
        `${context.namespace}:message_converter:${message.chat_id}:${String(message.message_id)}:${String(swipe_id)}`,
      );
      const anchors = create_generation_anchors(source_context, random_source);

      const metadata = TavernCanvasMessageMetadataSchema.parse({
        schema_version: 1,
        generation_anchor: anchors.generation_anchor,
        source_anchor: anchors.source_anchor,
        request_ids: [],
        image_ids,
      } satisfies TavernCanvasMessageMetadata);

      entries.push({
        chat_id: message.chat_id,
        message_id: message.message_id,
        swipe_id,
        metadata,
      });
    }
  }

  return { entries, warnings };
}
