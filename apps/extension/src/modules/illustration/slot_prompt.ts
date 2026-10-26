import type { SlotCharacterPrompt } from "@tavern-canvas/contracts";

import { apply_regex_rules, type RegexRule } from "../prompt/regex_transform.js";
import { deduplicate_tags, get_base_tag, join_prompt_parts } from "../prompt/tag_normalizer.js";
import type { ProposedCharacter } from "./analysis.js";
import type { LibraryMatch } from "./library_match.js";

export interface SlotPromptPreset {
  readonly fixed_positive_prompt: string;
  readonly fixed_negative_prompt: string;
  readonly replacement_rules: readonly {
    readonly triggers: readonly string[];
    readonly replacement: string;
  }[];
  readonly regex_rules: readonly RegexRule[];
}

export interface SlotPromptInput {
  readonly preset: SlotPromptPreset | null;
  readonly library: LibraryMatch;
  /** The characters the analysis placed in the picture, in its order. */
  readonly characters: readonly ProposedCharacter[];
  readonly scene_tags: string;
}

export interface SlotPrompt {
  readonly positive_prompt: string;
  readonly negative_prompt: string;
  readonly character_prompts: readonly SlotCharacterPrompt[];
}

type Subject = "girl" | "boy" | "other";

const SUBJECT_TAG = /^(?:\d+)?(girl|boy|other)s?$/u;

/** NovelAI character prompts start with a bare subject; the count belongs to the base prompt. */
function split_subject(tags: string): { readonly subject: Subject | null; readonly rest: string } {
  let subject: Subject | null = null;
  const rest: string[] = [];
  for (const tag of tags.split(",")) {
    const match = SUBJECT_TAG.exec(get_base_tag(tag).toLowerCase());
    if (match === null) {
      rest.push(tag);
    } else {
      subject ??= match[1] as Subject;
    }
  }
  return { subject, rest: join_prompt_parts(rest) };
}

function count_tags(subjects: readonly Subject[]): string {
  return (["girl", "boy", "other"] as const)
    .map((subject) => {
      const count = subjects.filter((candidate) => candidate === subject).length;
      return count === 0 ? "" : count === 1 ? `1${subject}` : `${String(count)}${subject}s`;
    })
    .filter((tag) => tag !== "")
    .join(", ");
}

function same_name(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

function replace_tags(prompt: string, rules: SlotPromptPreset["replacement_rules"]): string {
  const replacements = new Map<string, string>();
  for (const rule of rules) {
    for (const trigger of rule.triggers) {
      replacements.set(get_base_tag(trigger), rule.replacement);
    }
  }
  return join_prompt_parts(
    prompt.split(",").map((tag) => replacements.get(get_base_tag(tag)) ?? tag),
  );
}

function apply_preset(prompt: string, preset: SlotPromptPreset | null): string {
  if (preset === null) {
    return deduplicate_tags(prompt);
  }
  const replaced = replace_tags(prompt, preset.replacement_rules);
  return deduplicate_tags(apply_regex_rules(replaced, preset.regex_rules).text);
}

/** Outfit names are library keys, not image tags; the outfit's own description is added instead. */
function drop_outfit_names(tags: string, outfit_names: readonly string[]): string {
  const names = new Set(outfit_names.map((name) => name.trim().toLowerCase()));
  return join_prompt_parts(
    tags.split(",").filter((tag) => {
      const base = get_base_tag(tag)
        .toLowerCase()
        .replace(/^wearing\s+/u, "");
      return !names.has(base);
    }),
  );
}

interface CharacterDraft {
  readonly name: string;
  readonly subject: Subject | null;
  readonly prompt: string;
}

function character_drafts(input: SlotPromptInput): readonly CharacterDraft[] {
  const library = input.library.characters;
  const drafts: CharacterDraft[] = [];
  const used = new Set<string>();
  const add_library = (index: number, own_tags: string): void => {
    const entry = library[index];
    if (entry === undefined || used.has(entry.character.id)) {
      return;
    }
    used.add(entry.character.id);
    const appearance = split_subject(entry.character.appearance);
    const own = split_subject(drop_outfit_names(own_tags, input.library.outfit_names));
    drafts.push({
      name: entry.character.name,
      subject: appearance.subject ?? own.subject,
      prompt: join_prompt_parts([appearance.rest, entry.outfit?.description, own.rest]),
    });
  };
  for (const proposed of input.characters) {
    const index = library.findIndex((entry) => same_name(entry.character.name, proposed.name));
    if (index !== -1) {
      add_library(index, proposed.tags);
      continue;
    }
    const own = split_subject(proposed.tags);
    if (own.subject !== null || own.rest !== "") {
      drafts.push({ name: proposed.name, subject: own.subject, prompt: own.rest });
    }
  }
  // Library characters the text names but the analysis left out still get their own prompt.
  library.forEach((_, index) => {
    add_library(index, "");
  });
  return drafts;
}

/**
 * Each character in the picture gets its own NovelAI character prompt (library appearance and
 * outfit, then that character's pose and action), so traits stay on the right person. The base
 * prompt keeps the preset's fixed tags, the subject count and the shared scene tags. Without
 * characters everything stays in the base prompt.
 */
export function assemble_slot_prompt(input: SlotPromptInput): SlotPrompt {
  const preset = input.preset;
  const drafts = character_drafts(input);
  const loose = input.library.loose_outfits.map((outfit) => outfit.description);
  const negative_prompt = deduplicate_tags(preset?.fixed_negative_prompt ?? "");
  if (drafts.length === 0) {
    return {
      positive_prompt: apply_preset(
        join_prompt_parts([preset?.fixed_positive_prompt, ...loose, input.scene_tags]),
        preset,
      ),
      negative_prompt,
      character_prompts: [],
    };
  }
  const subjects = drafts.flatMap((draft) => (draft.subject === null ? [] : [draft.subject]));
  return {
    positive_prompt: apply_preset(
      join_prompt_parts([
        preset?.fixed_positive_prompt,
        count_tags(subjects),
        ...loose,
        split_subject(input.scene_tags).rest,
      ]),
      preset,
    ),
    negative_prompt,
    character_prompts: drafts.flatMap((draft) => {
      const prompt = apply_preset(join_prompt_parts([draft.subject, draft.prompt]), preset);
      return prompt === "" ? [] : [{ name: draft.name, prompt, negative_prompt: "" }];
    }),
  };
}
