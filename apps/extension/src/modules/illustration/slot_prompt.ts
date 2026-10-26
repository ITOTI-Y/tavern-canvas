import { apply_regex_rules, type RegexRule } from "../prompt/regex_transform.js";
import { deduplicate_tags, get_base_tag, join_prompt_parts } from "../prompt/tag_normalizer.js";

export interface SlotPromptPreset {
  readonly fixed_positive_prompt: string;
  readonly fixed_negative_prompt: string;
  readonly replacement_rules: readonly {
    readonly triggers: readonly string[];
    readonly replacement: string;
  }[];
  readonly regex_rules: readonly RegexRule[];
}

export interface CharacterAppearance {
  readonly name: string;
  readonly appearance: string;
}

export interface SlotPromptInput {
  readonly preset: SlotPromptPreset | null;
  readonly characters: readonly string[];
  readonly appearances: readonly CharacterAppearance[];
  readonly scene_tags: string;
}

export interface SlotPrompt {
  readonly positive_prompt: string;
  readonly negative_prompt: string;
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

/** Fixed preset tags, then each named character's stored appearance, then the scene's own tags. */
export function assemble_slot_prompt(input: SlotPromptInput): SlotPrompt {
  const appearances = input.characters.flatMap((name) => {
    const match = input.appearances.find(
      (candidate) => candidate.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    return match === undefined ? [] : [match.appearance];
  });
  const preset = input.preset;
  const joined = join_prompt_parts([
    preset?.fixed_positive_prompt,
    ...appearances,
    input.scene_tags,
  ]);
  const replaced = preset === null ? joined : replace_tags(joined, preset.replacement_rules);
  const positive =
    preset === null ? replaced : apply_regex_rules(replaced, preset.regex_rules).text;
  return {
    positive_prompt: deduplicate_tags(positive),
    negative_prompt: deduplicate_tags(preset?.fixed_negative_prompt ?? ""),
  };
}
