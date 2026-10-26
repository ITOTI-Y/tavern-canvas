export interface AssistantPersonaInfo {
  readonly persona_id: string;
  readonly display_name: string;
  readonly avatar_url: string | null;
}

/** Falls back to the bundled mascot avatar when no persona is selected. */
export function resolve_assistant_avatar(
  persona: AssistantPersonaInfo | null,
  default_avatar_url: string,
): string {
  return persona?.avatar_url ?? default_avatar_url;
}

export interface AssistantSystemPromptInput {
  readonly persona: AssistantPersonaInfo | null;
  readonly user_persona_name: string | null;
  readonly knowledge_base_context: string | null;
  readonly floor_info: string | null;
  readonly screenshot_info: string | null;
  readonly user_request: string;
  readonly custom_preset_template: string | null;
}

const DEFAULT_SYSTEM_PROMPT_TEMPLATE = [
  "You are {{persona_name}}, an embedded assistant inside TavernCanvas.",
  "User persona: {{user_persona_name}}.",
  "{{knowledge_base_context}}",
  "{{floor_info}}",
  "{{screenshot_info}}",
  "Request: {{user_request}}",
].join("\n");

function substitute_template(template: string, values: Readonly<Record<string, string>>): string {
  return template.replace(/\{\{(\w+)\}\}/gu, (_match, key: string) => values[key] ?? "");
}

/** Blank placeholder lines collapse rather than leaving visible gaps. */
export function build_system_prompt(input: AssistantSystemPromptInput): string {
  const template = input.custom_preset_template ?? DEFAULT_SYSTEM_PROMPT_TEMPLATE;
  const filled = substitute_template(template, {
    persona_name: input.persona?.display_name ?? "TavernCanvas Assistant",
    user_persona_name: input.user_persona_name ?? "User",
    knowledge_base_context: input.knowledge_base_context ?? "",
    floor_info: input.floor_info ?? "",
    screenshot_info: input.screenshot_info ?? "",
    user_request: input.user_request,
  });
  return filled
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .join("\n");
}

export interface FloorSourceMessage {
  readonly message_id: number;
  readonly content: string;
}

export interface FloorCollectionOptions {
  readonly anchor_message_id: number;
  readonly radius: number;
  readonly max_messages: number;
}

/** Manual selections bypass the anchor search: pass them as `messages` with a radius covering the whole list. */
export function collect_floor_messages(
  messages: readonly FloorSourceMessage[],
  options: FloorCollectionOptions,
): readonly FloorSourceMessage[] {
  const anchor_index = messages.findIndex(
    (message) => message.message_id === options.anchor_message_id,
  );
  if (anchor_index === -1) {
    return [];
  }
  const start = Math.max(0, anchor_index - options.radius);
  const end = Math.min(messages.length, anchor_index + options.radius + 1);
  const deduped = [
    ...new Map(messages.slice(start, end).map((message) => [message.message_id, message])).values(),
  ];
  if (deduped.length <= options.max_messages) {
    return deduped;
  }
  return deduped.slice(deduped.length - options.max_messages);
}

export interface FloorRegexRule {
  readonly pattern: string;
  readonly flags: string;
  readonly replacement: string;
}

/** An invalid rule is skipped, never allowed to drop the whole floor context. */
export function apply_floor_regex(text: string, rules: readonly FloorRegexRule[]): string {
  return rules.reduce((accumulated, rule) => {
    try {
      return accumulated.replace(new RegExp(rule.pattern, rule.flags), rule.replacement);
    } catch {
      return accumulated;
    }
  }, text);
}

export interface HistoryImageRef {
  readonly message_id: number;
  readonly image_id: string;
}

export interface CapHistoryImagesResult {
  readonly kept: readonly HistoryImageRef[];
  readonly omitted_count: number;
}

const MAX_HISTORY_IMAGES = 5;

/** Keeps the 5 most recent history images and notes omissions; disabling "send images" strips all of them. */
export function cap_history_images(
  images: readonly HistoryImageRef[],
  send_images_enabled: boolean,
): CapHistoryImagesResult {
  if (!send_images_enabled) {
    return { kept: [], omitted_count: images.length };
  }
  if (images.length <= MAX_HISTORY_IMAGES) {
    return { kept: images, omitted_count: 0 };
  }
  return {
    kept: images.slice(images.length - MAX_HISTORY_IMAGES),
    omitted_count: images.length - MAX_HISTORY_IMAGES,
  };
}

export interface SummaryContextEntry {
  readonly id: string;
  readonly enabled: boolean;
  readonly text: string;
  readonly covers_up_to_message_id: number;
}

/** Returns `null` when no summary is enabled so callers omit the block. */
export function build_summary_context_block(
  summaries: readonly SummaryContextEntry[],
): string | null {
  const enabled = summaries.filter((summary) => summary.enabled);
  if (enabled.length === 0) {
    return null;
  }
  return `Previous conversation summary:\n${enabled.map((summary) => summary.text).join("\n\n")}`;
}

/** Excludes raw history already covered by an enabled summary, beyond a floor buffer of the most recent messages. */
export function filter_history_covered_by_summaries(
  messages: readonly FloorSourceMessage[],
  summaries: readonly SummaryContextEntry[],
  floor_buffer: number,
): readonly FloorSourceMessage[] {
  const enabled = summaries.filter((summary) => summary.enabled);
  if (enabled.length === 0) {
    return messages;
  }
  const max_covered = Math.max(...enabled.map((summary) => summary.covers_up_to_message_id));
  const cutoff_index = messages.findIndex((message) => message.message_id > max_covered);
  if (cutoff_index === -1) {
    return [];
  }
  return messages.slice(Math.max(0, cutoff_index - floor_buffer));
}

export type AssistantConnectionRole = "system" | "user" | "assistant";

export interface AssistantConnectionMessage {
  readonly role: AssistantConnectionRole;
  readonly content: string;
}

export interface AssistantToolDefinition {
  readonly name: string;
  readonly description: string;
  readonly parameters: Readonly<Record<string, unknown>>;
}

export interface AssistantCompletionRequest {
  readonly messages: readonly AssistantConnectionMessage[];
  readonly tools: readonly AssistantToolDefinition[];
  readonly tool_choice: "auto" | "none";
}

/** `tool_choice` degrades to "none" when the tool list is empty. */
export function build_chat_completion_request(
  messages: readonly AssistantConnectionMessage[],
  tools: readonly AssistantToolDefinition[],
): AssistantCompletionRequest {
  return { messages, tools, tool_choice: tools.length > 0 ? "auto" : "none" };
}

/** Has no `tools` parameter at all, so `tools: []` / `tool_choice: "none"` are structural for every non-chat completion. */
export function build_prompt_building_request(
  messages: readonly AssistantConnectionMessage[],
): AssistantCompletionRequest {
  return { messages, tools: [], tool_choice: "none" };
}
