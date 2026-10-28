import type { CapabilityMatrix } from "@tavern-canvas/contracts";

export const HOST_CAPABILITY_IDS = [
  "main_generation_events",
  "preset_generation",
  "message_swipe_metadata",
  "tavern_regex",
  "tavern_helper",
] as const;

export type HostCapabilityId = (typeof HOST_CAPABILITY_IDS)[number];
export type HostMessageRole = "system" | "assistant" | "user";

export interface HostMessageSwipeSnapshot {
  readonly swipe_id: number;
  readonly content: string;
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
export interface HostChatChangeEvent {
  readonly chat_id: string;
}
export type HostChatChangeHandler = (event: HostChatChangeEvent) => void;
export type HostMessageRenderedHandler = (message_id: number) => void;

/** Identifies one swipe of one message in one chat; writes are refused when the chat is no longer active. */
export interface HostSwipeLocation {
  readonly chat_id: string;
  readonly message_id: number;
  readonly swipe_id: number;
}

export type HostGenerationConnection =
  | { readonly kind: "current" }
  | { readonly kind: "proxy_preset"; readonly proxy_preset: string; readonly model: string | null }
  | {
      readonly kind: "custom";
      readonly api_url: string;
      readonly api_key: string;
      readonly model: string;
      readonly source: string;
    };

export interface HostJsonSchema {
  readonly name: string;
  readonly value: Readonly<Record<string, unknown>>;
}

/** `chat` lets SillyTavern insert the world info it activates for the current chat. */
export type HostWorldInfo =
  { readonly kind: "chat" } | { readonly kind: "replace"; readonly text: string };

/** Always runs through a SillyTavern preset: the extension never sends a request the user's preset has not shaped. */
export interface PresetGenerationRequest {
  readonly generation_id: string;
  readonly preset_name: string;
  readonly user_input: string;
  readonly max_chat_history: number;
  readonly connection: HostGenerationConnection;
  readonly json_schema: HostJsonSchema | null;
  readonly world_info: HostWorldInfo;
  /** A data URL sent with the user input; the connection's model must accept images. */
  readonly image: string | null;
}

export type HostWorldbookKey = string | { readonly source: string; readonly flags: string };

export interface HostWorldbookEntry {
  readonly enabled: boolean;
  readonly strategy: "constant" | "selective" | "vectorized";
  readonly keys: readonly HostWorldbookKey[];
  readonly secondary_logic: "and_any" | "and_all" | "not_all" | "not_any";
  readonly secondary_keys: readonly HostWorldbookKey[];
  readonly order: number;
  readonly content: string;
}

export interface PresetGenerationResult {
  readonly content: string;
  readonly reasoning: string | null;
}

/** A SillyTavern global regex script owned by the extension, keyed by a stable id. */
export interface HostRegexScript {
  readonly id: string;
  readonly script_name: string;
  readonly find_regex: string;
  readonly replace_string: string;
  readonly destination: "display" | "prompt";
}

export type DeepLTarget = "EN-US" | "ZH";
export type DeepLEndpoint = "free" | "pro";

export interface HostAdapter {
  readonly capabilities: CapabilityMatrix;
  get_locale(): string;
  /** `null` while no chat is open. */
  get_active_chat_id(): string | null;
  get_active_chat(): Promise<HostChatSnapshot>;
  /** The active swipe of one message of the open chat, without reading the rest of the chat. */
  get_active_swipe_id(message_id: number): number | null;
  subscribe_generation(handler: HostGenerationHandler): () => void;
  subscribe_chat_change(handler: HostChatChangeHandler): () => void;
  /** Fires for every message whose DOM was rebuilt: rendered, updated, edited, swiped or remounted. */
  subscribe_message_rendered(handler: HostMessageRenderedHandler): () => void;
  /** Fires when a virtualized chat drops a message's content from the page. */
  subscribe_message_released(handler: HostMessageRenderedHandler): () => void;
  /** Fires when the whole visible chat was rebuilt, so every message must be scanned again. */
  subscribe_chat_rendered(handler: () => void): () => void;
  find_message_element(message_id: number): HTMLElement | null;
  /** Reads the extension's record from the swipe's `extra`; `null` when absent or the chat is not active. */
  read_swipe_record(location: HostSwipeLocation): unknown;
  write_swipe_record(location: HostSwipeLocation, record: unknown): Promise<void>;
  /** The wardrobe snapshot kept beside the illustration record, under its own key. */
  read_swipe_wardrobe(location: HostSwipeLocation): unknown;
  write_swipe_wardrobe(location: HostSwipeLocation, record: unknown): Promise<void>;
  /** Replaces the active swipe's text only if it still equals `expected`, so a concurrent edit is never overwritten. */
  replace_message_text(message_id: number, expected: string, next: string): Promise<boolean>;
  generate_with_preset(request: PresetGenerationRequest): Promise<PresetGenerationResult>;
  list_worldbooks(): readonly string[];
  read_worldbook(name: string): Promise<readonly HostWorldbookEntry[]>;
  stop_generation(generation_id: string): void;
  /** Installs or updates the scripts; returns whether anything changed, which reloads the chat. */
  sync_regex_scripts(scripts: readonly HostRegexScript[]): Promise<boolean>;
  /** Translates through SillyTavern's server with the DeepL key stored in its secrets. */
  translate_deepl(text: string, target: DeepLTarget, endpoint: DeepLEndpoint): Promise<string>;
}
