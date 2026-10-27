import type { TranslationSettings, VocabularySearchResult } from "@tavern-canvas/contracts";

import type { DeepLTarget, HostAdapter } from "../../host/index.js";
import type { VocabularyCapability } from "../../ui/contracts/ui_capabilities.js";
import { read_prompt_in_chinese, translate_prompt_to_tags } from "./prompt_translation.js";

const MAX_SUGGESTIONS = 10;

export interface TagSuggestion {
  readonly tag: string;
  /** The vocabulary's Chinese name, without the series it comes from. */
  readonly translation: string | null;
  readonly popularity: number;
}

export interface PromptTranslator {
  to_tags(prompt: string): Promise<string>;
  read_in_chinese(prompt: string): Promise<string>;
  /** Tags matching what is being typed; `null` while the vocabulary is still being prepared. */
  suggest(query: string): Promise<readonly TagSuggestion[] | null>;
  /** Starts preparing the vocabulary, which takes about a minute the first time. */
  prepare(): Promise<void>;
}

export interface PromptTranslatorDeps {
  readonly host: HostAdapter;
  readonly settings: () => TranslationSettings;
  readonly vocabulary: VocabularyCapability;
}

/** Character tags carry "name-series-original"; the name alone is what a reader needs. */
function short_translation(result: VocabularySearchResult): string | null {
  const name = result.translation?.split("-")[0]?.trim() ?? "";
  return name === "" ? null : name;
}

/**
 * Vocabulary lookups count as "not found" while the vocabulary is being prepared or when it
 * fails, and only answered lookups are cached, so a later call can still find the tag.
 */
export function create_prompt_translator(deps: PromptTranslatorDeps): PromptTranslator {
  const answers = new Map<string, readonly VocabularySearchResult[]>();
  const deepl_answers = new Map<string, Promise<string>>();

  async function lookup(query: string): Promise<readonly VocabularySearchResult[] | null> {
    const cached = answers.get(query);
    if (cached !== undefined) {
      return cached;
    }
    let page;
    try {
      page = await deps.vocabulary.lookup(query);
    } catch {
      return null;
    }
    if (page === null) {
      return null;
    }
    answers.set(query, page.results);
    return page.results;
  }

  function deepl(text: string, target: DeepLTarget): Promise<string> {
    const key = `${target}\n${text}`;
    let answer = deepl_answers.get(key);
    if (answer === undefined) {
      answer = deps.host.translate_deepl(text, target, deps.settings().deepl_endpoint);
      answer.catch(() => deepl_answers.delete(key));
      deepl_answers.set(key, answer);
    }
    return answer;
  }

  function translation_deps() {
    return {
      glossary: deps.settings().glossary,
      async find_tag(term: string) {
        const hit = (await lookup(term))?.find((result) => result.match_kind === "translation");
        return hit?.display_text.replaceAll("_", " ") ?? null;
      },
      async find_translation(tag: string) {
        const hit = (await lookup(tag))?.find((result) => result.match_kind === "exact");
        return hit === undefined ? null : short_translation(hit);
      },
      deepl,
    };
  }

  return {
    to_tags: (prompt) => translate_prompt_to_tags(prompt, translation_deps()),
    read_in_chinese: (prompt) => read_prompt_in_chinese(prompt, translation_deps()),
    async suggest(query) {
      let page;
      try {
        page = await deps.vocabulary.lookup(query.trim());
      } catch {
        return [];
      }
      return page === null
        ? null
        : page.results.slice(0, MAX_SUGGESTIONS).map((result) => ({
            tag: result.display_text.replaceAll("_", " "),
            translation: short_translation(result),
            popularity: result.popularity,
          }));
    },
    prepare: () => deps.vocabulary.prepare(),
  };
}
