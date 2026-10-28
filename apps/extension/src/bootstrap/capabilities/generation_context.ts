import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";
import type { Sha256 } from "@tavern-canvas/contracts";
import {
  create_generation_anchors,
  SourceContextSchema,
  type RandomSource,
  type SourceContext,
} from "@tavern-canvas/core";

import type { HostAdapter, HostChatSnapshot } from "../../host/index.js";

export interface GenerationOrigin {
  readonly chat_id: string;
  readonly requested_swipe_id: number;
  readonly generation_anchor: Sha256;
  readonly source_anchor: Sha256;
}

/** Stands in for the chat of a generation started with no chat open, such as a library preview; no message binds to it. */
export const LIBRARY_CHAT_ID = "inkwell:library";

/** A manual submission gets the same anchors as an automatic tool call, so it binds to a message through the same `MessageBinder` path. */
export interface GenerationOriginSource {
  resolve(): Promise<GenerationOrigin>;
}

export function to_source_context(snapshot: HostChatSnapshot): SourceContext {
  return SourceContextSchema.parse({
    schema_version: 1,
    chat_id: snapshot.chat_id,
    active_swipes: snapshot.messages.map((message) => ({
      message_id: message.message_id,
      swipe_id: message.active_swipe_id,
    })),
    messages: snapshot.messages.map((message) => ({
      message_id: message.message_id,
      role: message.role,
      content_sha256: bytesToHex(
        sha256(
          utf8ToBytes(
            message.swipes.find((swipe) => swipe.swipe_id === message.active_swipe_id)?.content ??
              "",
          ),
        ),
      ),
      swipe_id: message.active_swipe_id,
    })),
  });
}

export class HostGenerationOriginSource implements GenerationOriginSource {
  readonly #host: HostAdapter;
  readonly #random: RandomSource;

  constructor(host: HostAdapter, random: RandomSource) {
    this.#host = host;
    this.#random = random;
  }

  async resolve(): Promise<GenerationOrigin> {
    if (this.#host.get_active_chat_id() === null) {
      return this.#library_origin();
    }
    const snapshot = await this.#host.get_active_chat();
    const source_context = to_source_context(snapshot);
    const anchors = create_generation_anchors(source_context, this.#random);
    const last_message = snapshot.messages.at(-1);
    return {
      chat_id: snapshot.chat_id,
      requested_swipe_id: last_message?.active_swipe_id ?? 0,
      generation_anchor: anchors.generation_anchor,
      source_anchor: anchors.source_anchor,
    };
  }

  #library_origin(): GenerationOrigin {
    const anchors = create_generation_anchors(
      SourceContextSchema.parse({
        schema_version: 1,
        chat_id: LIBRARY_CHAT_ID,
        active_swipes: [],
        messages: [],
      }),
      this.#random,
    );
    return {
      chat_id: LIBRARY_CHAT_ID,
      requested_swipe_id: 0,
      generation_anchor: anchors.generation_anchor,
      source_anchor: anchors.source_anchor,
    };
  }
}
