/**
 * Persona/user injection formatting and the separate, user-curated knowledge base preview surface.
 * Ported from legacy `buildPersonaPromptContent`/`buildUserPromptContent`
 * (utils/settings/knowledgeBase/personaService.js, userService.js) -- fixed labeled sections wrapped
 * in Chinese-tag markers, structurally the same "escaped user content in structural markup" concern
 * `world_info_source.ts`'s injection templates address, so this module reuses that escaper.
 */

import { escape_injected_field_value } from "./world_info_source.js";

export type PersonaFields = Readonly<Record<string, string | undefined>>;

const FIELD_LABELS: Readonly<Record<string, string>> = Object.freeze({
  name: "角色名称",
  age: "年龄",
  gender: "性别",
  race: "种族/物种",
  personality: "性格",
  background: "背景",
  bodyType: "身材",
  appearance: "外貌特征",
  hobbies: "爱好",
  abilities: "特殊能力",
  speechStyle: "口癖/说话方式",
  relationships: "人际关系",
  isekai_origin: "穿越来源",
  isekai_method: "穿越方式",
  isekai_reaction: "穿越后反应",
  isekai_goal: "穿越期间目标",
});

interface PersonaSection {
  readonly tag: string;
  readonly fields: readonly string[];
}

const PERSONA_SECTIONS: readonly PersonaSection[] = [
  { tag: "基础信息", fields: ["name", "age", "gender", "race"] },
  { tag: "外观与身材", fields: ["bodyType", "appearance"] },
  { tag: "性格与能力", fields: ["personality", "abilities", "speechStyle"] },
  { tag: "背景故事", fields: ["background", "hobbies", "relationships"] },
  { tag: "穿越认知", fields: ["isekai_origin", "isekai_method", "isekai_reaction", "isekai_goal"] },
];

function build_field_lines(data: PersonaFields, fields: readonly string[]): readonly string[] {
  const lines: string[] = [];
  for (const field of fields) {
    const value = (data[field] ?? "").trim();
    if (!value) {
      continue;
    }
    const label = FIELD_LABELS[field] ?? field;
    lines.push(`${label}: ${escape_injected_field_value(value)}`);
  }
  return lines;
}

/**
 * Shared renderer behind both `build_persona_prompt_content` and `build_user_prompt_content` --
 * legacy carries two structurally identical copies of this logic for character-persona and
 * User-persona respectively; this module collapses them into one parameterized implementation.
 */
function build_labeled_prompt_content(data: PersonaFields | null, enabled: boolean): string {
  if (!enabled || data === null) {
    return "";
  }
  const sections: string[] = [];
  for (const section of PERSONA_SECTIONS) {
    const lines = build_field_lines(data, section.fields);
    if (lines.length > 0) {
      sections.push(`<${section.tag}>\n${lines.join("\n")}\n</${section.tag}>`);
    }
  }
  const notes = (data.notes ?? "").trim();
  if (notes) {
    sections.push(`<补充信息>\n${escape_injected_field_value(notes)}\n</补充信息>`);
  }
  return sections.join("\n\n");
}

export function build_persona_prompt_content(
  persona: PersonaFields | null,
  enabled: boolean,
): string {
  return build_labeled_prompt_content(persona, enabled);
}

export function build_user_prompt_content(user: PersonaFields | null, enabled: boolean): string {
  return build_labeled_prompt_content(user, enabled);
}

// ---------------------------------------------------------------------------
// Knowledge base (separate from World Info): explicit, previewable selection
// ---------------------------------------------------------------------------

export interface KnowledgeEntry {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly keys: readonly string[];
}

/** Read-only lookup by ID -- the "read_knowledge" surface. */
export function read_knowledge_entry(
  entries: readonly KnowledgeEntry[],
  id: string,
): KnowledgeEntry | null {
  return entries.find((entry) => entry.id === id) ?? null;
}

/** Case-insensitive substring search across title/content/keys -- the "search_knowledge" surface. */
export function search_knowledge_entries(
  entries: readonly KnowledgeEntry[],
  query: string,
): readonly KnowledgeEntry[] {
  const trimmed_query = query.trim().toLowerCase();
  if (!trimmed_query) {
    return [];
  }
  return entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(trimmed_query) ||
      entry.content.toLowerCase().includes(trimmed_query) ||
      entry.keys.some((key) => key.toLowerCase().includes(trimmed_query)),
  );
}

/**
 * Selection stays explicit and previewable: only entries the caller has actually selected are
 * returned, in the caller's selection order, never a silent "everything matching" fallback.
 */
export function preview_selected_knowledge(
  entries: readonly KnowledgeEntry[],
  selected_ids: readonly string[],
): readonly KnowledgeEntry[] {
  const by_id = new Map(entries.map((entry) => [entry.id, entry]));
  const previewed: KnowledgeEntry[] = [];
  for (const id of selected_ids) {
    const entry = by_id.get(id);
    if (entry !== undefined) {
      previewed.push(entry);
    }
  }
  return previewed;
}
