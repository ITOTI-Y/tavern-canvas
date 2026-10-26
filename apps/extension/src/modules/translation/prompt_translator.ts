import type { TranslationSettings } from "@tavern-canvas/contracts";

import type { HostAdapter } from "../../host/index.js";
import type { VocabularyCapability } from "../../ui/contracts/ui_capabilities.js";
import { read_prompt_in_chinese, translate_prompt_to_tags } from "./prompt_translation.js";

export interface PromptTranslator {
  to_tags(prompt: string): Promise<string>;
  read_in_chinese(prompt: string): Promise<string>;
}

export interface PromptTranslatorDeps {
  readonly host: HostAdapter;
  readonly settings: () => TranslationSettings;
  readonly vocabulary: VocabularyCapability;
}

/** Vocabulary lookups degrade to "not found" when no vocabulary package is installed. */
export function create_prompt_translator(deps: PromptTranslatorDeps): PromptTranslator {
  async function search(query: string) {
    try {
      return (await deps.vocabulary.search(query)).results;
    } catch {
      return [];
    }
  }

  function translation_deps() {
    const settings = deps.settings();
    return {
      glossary: settings.glossary,
      async find_tag(term: string) {
        const hit = (await search(term)).find((result) => result.match_kind === "translation");
        return hit?.display_text.replaceAll("_", " ") ?? null;
      },
      async find_translation(tag: string) {
        const hit = (await search(tag)).find((result) => result.match_kind === "exact");
        return hit?.translation ?? null;
      },
      deepl: (text: string, target: "EN-US" | "ZH") =>
        deps.host.translate_deepl(text, target, settings.deepl_endpoint),
    };
  }

  return {
    to_tags: (prompt) => translate_prompt_to_tags(prompt, translation_deps()),
    read_in_chinese: (prompt) => read_prompt_in_chinese(prompt, translation_deps()),
  };
}
