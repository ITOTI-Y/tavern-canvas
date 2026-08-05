import {
  RequestIdSchema,
  Sha256Schema,
  TavernCanvasMessageMetadataSchema,
  type ImageId,
  type RequestId,
} from "@tavern-canvas/contracts";

import type { GenerationJobSnapshot } from "../jobs/generation_job.js";
import type {
  FinalAssistantMessageEvent,
  MessageAttachmentUpdate,
  MessageBindingJobPort,
  MessageMedia,
  MessagePort,
} from "./message_binding.js";

interface MessageBinding {
  readonly chat_id: string;
  readonly message_id: number;
  readonly swipe_id: number;
  readonly generation_anchor: string;
  readonly source_anchor: string;
  readonly request_ids: readonly RequestId[];
}

function stable_unique<T>(values: readonly T[]): T[] {
  return [...new Set(values)];
}

function swipe_key(chat_id: string, message_id: number): string {
  return `${chat_id}\u0000${String(message_id)}`;
}

function merge_media(
  existing_media: readonly MessageMedia[],
  image_ids: readonly ImageId[],
): readonly MessageMedia[] {
  const media_by_image_id = new Map<ImageId, MessageMedia>();
  for (const media of existing_media) {
    if (!media_by_image_id.has(media.image_id)) {
      media_by_image_id.set(media.image_id, Object.freeze({ ...media }));
    }
  }
  for (const image_id of image_ids) {
    if (!media_by_image_id.has(image_id)) {
      media_by_image_id.set(image_id, Object.freeze({ image_id }));
    }
  }
  return Object.freeze([...media_by_image_id.values()]);
}

export class MessageBinder {
  readonly #jobs: MessageBindingJobPort;
  readonly #messages: MessagePort;
  readonly #bindings_by_generation = new Map<string, MessageBinding>();
  readonly #pending_jobs = new Map<string, GenerationJobSnapshot>();
  readonly #active_swipes = new Map<string, number>();
  readonly #in_flight = new Set<string>();
  readonly #retry_requested = new Set<string>();
  #active_chat_id: string | null = null;
  #unsubscribers: (() => void)[] = [];

  constructor(jobs: MessageBindingJobPort, messages: MessagePort) {
    this.#jobs = jobs;
    this.#messages = messages;
  }

  start(): void {
    if (this.#unsubscribers.length > 0) {
      return;
    }
    this.#unsubscribers = [
      this.#jobs.subscribe((job) => {
        this.#handle_job(job);
      }),
      this.#messages.subscribe_final_assistant((event) => {
        this.#handle_message(event);
      }),
      this.#messages.subscribe_chat_change((event) => {
        this.#active_chat_id = event.chat_id;
        this.#retry_pending();
      }),
      this.#messages.subscribe_swipe_change((event) => {
        this.#active_chat_id = event.chat_id;
        this.#active_swipes.set(swipe_key(event.chat_id, event.message_id), event.swipe_id);
        this.#retry_pending();
      }),
    ];
  }

  stop(): void {
    const unsubscribers = this.#unsubscribers.toReversed();
    this.#unsubscribers = [];
    for (const unsubscribe of unsubscribers) {
      unsubscribe();
    }
  }

  #handle_message(event: FinalAssistantMessageEvent): void {
    if (
      event.role !== "assistant" ||
      !event.is_final ||
      event.generation_anchor === null ||
      event.source_anchor === null
    ) {
      return;
    }
    const binding: MessageBinding = Object.freeze({
      chat_id: event.chat_id,
      message_id: event.message_id,
      swipe_id: event.swipe_id,
      generation_anchor: Sha256Schema.parse(event.generation_anchor),
      source_anchor: Sha256Schema.parse(event.source_anchor),
      request_ids: Object.freeze(
        stable_unique(event.request_ids.map((request_id) => RequestIdSchema.parse(request_id))),
      ),
    });
    this.#bindings_by_generation.set(binding.generation_anchor, binding);
    if (this.#active_chat_id === null) {
      this.#active_chat_id = binding.chat_id;
    }
    const active_swipe_key = swipe_key(binding.chat_id, binding.message_id);
    if (!this.#active_swipes.has(active_swipe_key)) {
      this.#active_swipes.set(active_swipe_key, binding.swipe_id);
    }
    this.#retry_pending();
  }

  #handle_job(job: GenerationJobSnapshot): void {
    if (job.state === "completed") {
      this.#pending_jobs.set(job.job_id, job);
      void this.#attempt_attachment(job);
      return;
    }
    this.#pending_jobs.delete(job.job_id);
    this.#retry_requested.delete(job.job_id);
  }

  #retry_pending(): void {
    for (const job of this.#pending_jobs.values()) {
      void this.#attempt_attachment(job);
    }
  }

  async #attempt_attachment(job: GenerationJobSnapshot): Promise<void> {
    if (this.#in_flight.has(job.job_id)) {
      this.#retry_requested.add(job.job_id);
      return;
    }
    const binding = this.#bindings_by_generation.get(job.generation_anchor);
    if (binding === undefined) {
      return;
    }
    if (
      binding.chat_id !== job.chat_id ||
      binding.source_anchor !== job.source_anchor ||
      binding.swipe_id !== job.requested_swipe_id
    ) {
      await this.#mark_orphaned(job.job_id);
      return;
    }
    if (this.#active_chat_id !== binding.chat_id) {
      return;
    }
    const active_swipe = this.#active_swipes.get(swipe_key(binding.chat_id, binding.message_id));
    if (active_swipe !== binding.swipe_id) {
      return;
    }

    this.#in_flight.add(job.job_id);
    try {
      const target = await this.#messages.find_target({
        chat_id: binding.chat_id,
        message_id: binding.message_id,
        swipe_id: binding.swipe_id,
        generation_anchor: binding.generation_anchor,
      });
      if (target === null) {
        await this.#mark_orphaned(job.job_id);
        return;
      }
      if (
        target.metadata !== null &&
        (target.metadata.generation_anchor !== binding.generation_anchor ||
          target.metadata.source_anchor !== binding.source_anchor)
      ) {
        await this.#mark_orphaned(job.job_id);
        return;
      }

      const request_ids = stable_unique([
        ...(target.metadata?.request_ids ?? []),
        ...binding.request_ids,
        job.request_id,
      ]);
      const image_ids = stable_unique([...(target.metadata?.image_ids ?? []), ...job.image_ids]);
      const update: MessageAttachmentUpdate = Object.freeze({
        chat_id: binding.chat_id,
        message_id: binding.message_id,
        swipe_id: binding.swipe_id,
        metadata: TavernCanvasMessageMetadataSchema.parse({
          schema_version: 1,
          generation_anchor: binding.generation_anchor,
          source_anchor: binding.source_anchor,
          request_ids,
          image_ids,
        }),
        media: merge_media(target.media, job.image_ids),
      });
      await this.#messages.update_target(update);
      await this.#jobs.mark_attached(job.job_id);
    } catch {
      // Host lookup, update, and persistence failures remain completed for event-driven retry.
    } finally {
      this.#in_flight.delete(job.job_id);
      if (this.#retry_requested.delete(job.job_id)) {
        const current = this.#jobs.get(job.job_id);
        if (current?.state === "completed") {
          void this.#attempt_attachment(current);
        }
      }
    }
  }

  async #mark_orphaned(job_id: string): Promise<void> {
    try {
      await this.#jobs.mark_orphaned(job_id);
    } catch {
      // Persistence failures leave the completed job available for a later refresh retry.
    }
  }
}
