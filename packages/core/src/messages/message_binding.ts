import type {
  ImageId,
  RequestId,
  Sha256,
  TavernCanvasMessageMetadata,
} from "@tavern-canvas/contracts";

import type { GenerationJobListener } from "../jobs/image_job_queue.js";
import type { GenerationJobSnapshot } from "../jobs/generation_job.js";

export type MessageCandidateRole = "system" | "assistant" | "tool" | "user";

export interface FinalAssistantMessageEvent {
  readonly chat_id: string;
  readonly message_id: number;
  readonly swipe_id: number;
  readonly role: MessageCandidateRole;
  readonly is_final: boolean;
  readonly generation_anchor: Sha256 | null;
  readonly source_anchor: Sha256 | null;
  readonly request_ids: readonly RequestId[];
}

export interface ChatChangeEvent {
  readonly chat_id: string;
}

export interface SwipeChangeEvent {
  readonly chat_id: string;
  readonly message_id: number;
  readonly swipe_id: number;
}

export interface MessageTargetQuery {
  readonly chat_id: string;
  readonly message_id: number;
  readonly swipe_id: number;
  readonly generation_anchor: Sha256;
}

export interface MessageMedia {
  readonly image_id: ImageId;
  readonly [property_name: string]: unknown;
}

export interface MessageTarget {
  readonly chat_id: string;
  readonly message_id: number;
  readonly swipe_id: number;
  readonly generation_anchor: Sha256;
  readonly metadata: TavernCanvasMessageMetadata | null;
  readonly media: readonly MessageMedia[];
}

export interface MessageAttachmentUpdate {
  readonly chat_id: string;
  readonly message_id: number;
  readonly swipe_id: number;
  readonly metadata: TavernCanvasMessageMetadata;
  readonly media: readonly MessageMedia[];
}

export type FinalAssistantHandler = (event: FinalAssistantMessageEvent) => void;
export type ChatChangeHandler = (event: ChatChangeEvent) => void;
export type SwipeChangeHandler = (event: SwipeChangeEvent) => void;

export interface MessagePort {
  find_target(request: MessageTargetQuery): Promise<MessageTarget | null>;
  update_target(request: MessageAttachmentUpdate): Promise<void>;
  subscribe_final_assistant(handler: FinalAssistantHandler): () => void;
  subscribe_chat_change(handler: ChatChangeHandler): () => void;
  subscribe_swipe_change(handler: SwipeChangeHandler): () => void;
}

export interface MessageBindingJobPort {
  get(job_id: string): GenerationJobSnapshot | null;
  subscribe(listener: GenerationJobListener): () => void;
  mark_attached(job_id: string): Promise<GenerationJobSnapshot>;
  mark_orphaned(job_id: string): Promise<GenerationJobSnapshot>;
}
