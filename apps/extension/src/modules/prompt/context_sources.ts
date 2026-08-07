/**
 * Orchestrates the pipeline's "selected World Info/user/character/outfit/knowledge context" stage:
 * fans out to `world_info_source.ts`, `character_context_source.ts`, and `knowledge_context_source.ts`,
 * then assembles their outputs both as a joined text block (for `prompt_pipeline.ts`'s MVU-resolution
 * stage) and as the `ContextPreview` shape `PromptView.vue`/`PromptBuilder.vue` already expect (see
 * `apps/extension/src/ui/views/prompt/context_preview.ts`).
 *
 * Also owns the "prompt-building private LLM calls set tools: [] and tool_choice: 'none'" policy
 * for context-adjacent private calls (e.g. AI persona generation, knowledge summarization) --
 * reusing `@tavern-canvas/core`'s `PrivatePromptPolicy` shape from Stage 02's `create_trigger_policy`
 * rather than inventing a second one.
 */

import type { PrivatePromptPolicy } from "@tavern-canvas/core";

import {
  expand_character_placeholders,
  type CharacterResolvers,
} from "./character_context_source.js";
import {
  build_persona_prompt_content,
  build_user_prompt_content,
  preview_selected_knowledge,
  type KnowledgeEntry,
  type PersonaFields,
} from "./knowledge_context_source.js";
import {
  resolve_triggered_entries,
  substitute_fixed_placeholders,
  type FixedEnableListTexts,
  type TauriActivationEntryRef,
  type TriggeredWorldInfoEntry,
  type WorldInfoEntry,
  type WorldInfoEntrySelectionState,
} from "./world_info_source.js";

export const PRIVATE_PROMPT_POLICY: PrivatePromptPolicy = Object.freeze({
  tools: Object.freeze([]),
  tool_choice: "none",
});

export interface HostPromptMessageLike {
  readonly role: "system" | "assistant" | "user";
  readonly content: string;
}

export interface PrivateLlmPromptRequest {
  readonly prompts: readonly HostPromptMessageLike[];
  readonly tools: readonly never[];
  readonly tool_choice: "none";
}

/** Builds a private-LLM call payload that always carries the no-tools policy. */
export function build_private_llm_prompt_request(
  prompts: readonly HostPromptMessageLike[],
): PrivateLlmPromptRequest {
  return {
    prompts,
    tools: PRIVATE_PROMPT_POLICY.tools,
    tool_choice: PRIVATE_PROMPT_POLICY.tool_choice,
  };
}

export interface WorldInfoContextInput {
  readonly entries: readonly WorldInfoEntry[];
  readonly selection: ReadonlyMap<string, WorldInfoEntrySelectionState>;
  readonly trigger_text: string;
  readonly tauri_activation: readonly TauriActivationEntryRef[] | null;
  readonly fixed_lists: FixedEnableListTexts;
}

export interface CharacterContextInput {
  readonly template_text: string;
  readonly resolvers: CharacterResolvers;
}

export interface PersonaContextInput {
  readonly fields: PersonaFields | null;
  readonly enabled: boolean;
}

export interface KnowledgeContextInput {
  readonly entries: readonly KnowledgeEntry[];
  readonly selected_ids: readonly string[];
}

export interface ContextSourcesInput {
  readonly world_info: WorldInfoContextInput;
  readonly character: CharacterContextInput | null;
  readonly persona: PersonaContextInput;
  readonly user_persona: PersonaContextInput;
  readonly knowledge: KnowledgeContextInput;
}

export interface ResolvedContext {
  readonly world_info_entries: readonly TriggeredWorldInfoEntry[];
  readonly world_info_text: string;
  readonly character_context: string | null;
  readonly persona_text: string | null;
  readonly user_persona_text: string | null;
  readonly knowledge_entries: readonly KnowledgeEntry[];
  readonly knowledge_text: string | null;
  readonly collected_negatives: readonly string[];
}

export function resolve_context(input: ContextSourcesInput): ResolvedContext {
  const triggered = resolve_triggered_entries(
    input.world_info.entries,
    input.world_info.selection,
    input.world_info.trigger_text,
    input.world_info.tauri_activation,
  );
  const character_list_text = triggered.map((entry) => entry.comment).join(", ");
  const world_info_text = triggered
    .map((entry) =>
      substitute_fixed_placeholders(entry.content, {
        ...input.world_info.fixed_lists,
        character_list_text:
          input.world_info.fixed_lists.character_list_text || character_list_text,
      }),
    )
    .filter((content) => content.trim().length > 0)
    .join("\n");

  let character_context: string | null = null;
  let collected_negatives: readonly string[] = [];
  if (input.character !== null) {
    const expansion = expand_character_placeholders(
      input.character.template_text,
      input.character.resolvers,
    );
    character_context = expansion.text;
    collected_negatives = expansion.collected_negatives;
  }

  const persona_text = build_persona_prompt_content(input.persona.fields, input.persona.enabled);
  const user_persona_text = build_user_prompt_content(
    input.user_persona.fields,
    input.user_persona.enabled,
  );

  const knowledge_entries = preview_selected_knowledge(
    input.knowledge.entries,
    input.knowledge.selected_ids,
  );
  const knowledge_text =
    knowledge_entries.length > 0
      ? knowledge_entries.map((entry) => entry.content).join("\n")
      : null;

  return {
    world_info_entries: triggered,
    world_info_text,
    character_context,
    persona_text: persona_text || null,
    user_persona_text: user_persona_text || null,
    knowledge_entries,
    knowledge_text,
    collected_negatives,
  };
}

/** The `ContextPreview` shape `PromptView.vue`/`PromptBuilder.vue` already render (Stage 06). */
export interface ContextPreview {
  readonly worldInfo: readonly string[];
  readonly userPersona: string | null;
  readonly characterContext: string | null;
}

export function to_context_preview(resolved: ResolvedContext): ContextPreview {
  return {
    worldInfo: resolved.world_info_entries.map((entry) => entry.content),
    userPersona: resolved.user_persona_text,
    characterContext: resolved.character_context,
  };
}

/** Joins every context piece into the single text block the MVU-resolution stage operates on. */
export function join_context_block(resolved: ResolvedContext): string {
  return [
    resolved.world_info_text,
    resolved.character_context,
    resolved.persona_text,
    resolved.user_persona_text,
    resolved.knowledge_text,
  ]
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .join("\n");
}
