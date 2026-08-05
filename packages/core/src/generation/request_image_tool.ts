import {
  RequestIdSchema,
  RequestImageArgumentsSchema,
  type RequestId,
  type RequestImageArguments,
  type Sha256,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import type { SourceContext } from "./source_context.js";
import type { SessionRegistry } from "./session_registry.js";

export interface RequestIdSource {
  next(): string;
}

export class BrowserRequestIdSource implements RequestIdSource {
  readonly #crypto_source: Pick<Crypto, "randomUUID">;

  constructor(crypto_source: Pick<Crypto, "randomUUID"> = globalThis.crypto) {
    this.#crypto_source = crypto_source;
  }

  next(): string {
    return RequestIdSchema.parse(this.#crypto_source.randomUUID());
  }
}

export interface QueuedImageRequest {
  readonly request_id: RequestId;
  readonly host_root_generation_id: string;
  readonly generation_anchor: Sha256;
  readonly source_anchor: Sha256;
  readonly source_context: SourceContext;
  readonly arguments: Readonly<RequestImageArguments>;
}

export interface ImageRequestQueuePort {
  enqueue(request: QueuedImageRequest): void;
}

export interface QueuedImageRequestResult {
  readonly status: "queued";
  readonly request_id: RequestId;
  readonly generation_anchor: Sha256;
}

export interface RequestImageToolDefinition {
  readonly name: "request_image";
  readonly display_name: "Request image";
  readonly description: string;
  readonly stealth: false;
  readonly parameters: Readonly<Record<string, unknown>>;
}

const REQUEST_IMAGE_PARAMETERS = Object.freeze(
  z.toJSONSchema(RequestImageArgumentsSchema, { target: "draft-07" }),
);

export class RequestImageTool {
  readonly definition: RequestImageToolDefinition = Object.freeze({
    name: "request_image",
    display_name: "Request image",
    description:
      "Queue an image generation request for the current TavernCanvas generation session.",
    stealth: false,
    parameters: REQUEST_IMAGE_PARAMETERS,
  });

  readonly #sessions: SessionRegistry;
  readonly #request_id_source: RequestIdSource;
  readonly #queue: ImageRequestQueuePort;

  constructor(
    sessions: SessionRegistry,
    request_id_source: RequestIdSource,
    queue: ImageRequestQueuePort,
  ) {
    this.#sessions = sessions;
    this.#request_id_source = request_id_source;
    this.#queue = queue;
  }

  execute(host_root_generation_id: string, input: unknown): QueuedImageRequestResult {
    const arguments_ = Object.freeze(RequestImageArgumentsSchema.parse(input));
    const session = this.#sessions.require_actionable(
      host_root_generation_id,
      arguments_.generation_anchor,
    );
    const request_id = RequestIdSchema.parse(this.#request_id_source.next());
    const request: QueuedImageRequest = Object.freeze({
      request_id,
      host_root_generation_id,
      generation_anchor: session.generation_anchor,
      source_anchor: session.source_anchor,
      source_context: session.source_context,
      arguments: arguments_,
    });

    this.#queue.enqueue(request);
    this.#sessions.add_request(session.generation_anchor, request_id);

    return Object.freeze({
      status: "queued",
      request_id,
      generation_anchor: session.generation_anchor,
    });
  }
}
