import type { CapabilityMatrix, TavernCanvasMessageMetadata } from "@tavern-canvas/contracts";
import type { HostPromptInjection } from "@tavern-canvas/core";

export const HOST_CAPABILITY_IDS = [
  "native_tool_manager",
  "main_generation_events",
  "private_prompt_generation",
  "message_swipe_metadata",
  "host_image_upload",
  "tavern_helper",
  "tauri_chat_surface",
  "tauri_world_info_activation",
  "gateway_protocol",
] as const;

export type HostCapabilityId = (typeof HOST_CAPABILITY_IDS)[number];
export type HostMessageRole = "system" | "assistant" | "user";

export interface HostMessageSwipeSnapshot {
  readonly swipe_id: number;
  readonly content: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly metadata: Readonly<Record<string, unknown>>;
}

export interface HostChatMessageSnapshot {
  readonly message_id: number;
  readonly name: string;
  readonly role: HostMessageRole;
  readonly is_hidden: boolean;
  readonly active_swipe_id: number;
  readonly swipes: readonly HostMessageSwipeSnapshot[];
}

export interface HostChatSnapshot {
  readonly chat_id: string;
  readonly messages: readonly HostChatMessageSnapshot[];
}

export type HostGenerationEvent =
  | {
      readonly phase: "started";
      readonly generation_type: string;
      readonly dry_run: boolean;
    }
  | { readonly phase: "stopped" }
  | { readonly phase: "ended"; readonly message_id: number };

export type HostGenerationHandler = (event: HostGenerationEvent) => void;
export type HostGenerationChunkHandler = (chunk: string) => void;
export interface HostChatChangeEvent {
  readonly chat_id: string;
}
export type HostChatChangeHandler = (event: HostChatChangeEvent) => void;

export interface HostMessageSwipedEvent {
  readonly message_id: number;
}
export type HostMessageSwipedHandler = (event: HostMessageSwipedEvent) => void;

export interface HostImageTool {
  readonly name: string;
  readonly display_name: string;
  readonly description: string;
  readonly parameters: Readonly<Record<string, unknown>>;
  readonly stealth: boolean;
  execute(arguments_: Readonly<Record<string, unknown>>): string | Promise<string>;
}

export interface HostPromptMessage {
  readonly role: HostMessageRole;
  readonly content: string;
}

/** Private prompt generation never exposes tools (`tools: []` / `tool_choice: "none"`); the literal field types stop callers from widening the policy. */
export interface PrivatePromptRequest {
  readonly generation_id: string;
  readonly prompts: readonly HostPromptMessage[];
  readonly max_chat_history?: "all" | number;
  readonly tools?: readonly never[];
  readonly tool_choice?: "none";
}

export interface HostMessageMedia {
  readonly image_id: string;
  readonly [property_name: string]: unknown;
}

export interface MessageUpdateRequest {
  readonly message_id: number;
  readonly swipe_id: number;
  readonly content: string;
  readonly metadata: TavernCanvasMessageMetadata;
  readonly media: readonly HostMessageMedia[];
}

export type HostImageFormat = "jpg" | "png" | "webp";

export interface HostImageUploadRequest {
  readonly image_base64: string;
  readonly character_name: string;
  readonly file_name: string;
  readonly format: HostImageFormat;
}

export interface HostImageUploadResult {
  readonly path: string;
}

export interface HostAdapter {
  readonly capabilities: CapabilityMatrix;
  can_use_native_tools(): boolean;
  get_locale(): string;
  get_active_chat(): Promise<HostChatSnapshot>;
  subscribe_generation(handler: HostGenerationHandler): () => void;
  subscribe_generation_chunk(handler: HostGenerationChunkHandler): () => void;
  subscribe_chat_change(handler: HostChatChangeHandler): () => void;
  subscribe_message_swiped(handler: HostMessageSwipedHandler): () => void;
  register_image_tool(tool: HostImageTool): () => void;
  /** Without this instruction the model cannot know the generation anchor and both trigger paths reject every request it makes. */
  set_trigger_injection(injection: HostPromptInjection | null): void;
  generate_private_prompt(request: PrivatePromptRequest): Promise<string>;
  update_message(request: MessageUpdateRequest): Promise<void>;
  upload_image(request: HostImageUploadRequest): Promise<HostImageUploadResult>;
}
