import { enumerate_own_property_paths } from "./inventory.js";
import { classify_path, type ConverterName, type PathRule } from "./path_rules.js";
import { SETTINGS_PATH_RULES } from "./settings_path_registry.js";

export const CONVERTER_NAMES: readonly ConverterName[] = [
  "settings_converter",
  "provider_converter",
  "prompt_converter",
  "asset_converter",
  "character_converter",
  "knowledge_converter",
  "gallery_converter",
  "message_converter",
];

export interface ClassifiedPath {
  readonly path: string;
  readonly rule: PathRule;
}

export interface SettingsClassification {
  readonly classified: readonly ClassifiedPath[];
  readonly unknown: readonly string[];
}

export class UnknownLegacyPathError extends Error {
  readonly unknown_paths: readonly string[];

  constructor(unknown_paths: readonly string[]) {
    super(
      `Migration blocked: ${String(unknown_paths.length)} unclassified v2 settings path(s): ${unknown_paths.join(", ")}`,
    );
    this.name = "UnknownLegacyPathError";
    this.unknown_paths = unknown_paths;
  }
}

/**
 * Classifies every own path (at every depth) reachable from a v2 settings
 * object against `SETTINGS_PATH_RULES`. This is the completeness check: a
 * fully populated fixture must produce zero `unknown` entries, and every v2
 * settings field a real user could have must resolve to exactly one of
 * mapped / deferred_secret_transfer / intentionally_obsolete.
 */
export function classify_settings_paths(settings: unknown): SettingsClassification {
  const classified: ClassifiedPath[] = [];
  const unknown: string[] = [];
  for (const path of enumerate_own_property_paths(settings)) {
    const rule = classify_path(path, SETTINGS_PATH_RULES);
    if (rule === undefined) {
      unknown.push(path);
    } else {
      classified.push({ path, rule });
    }
  }
  return { classified, unknown };
}

export function assert_settings_fully_classified(settings: unknown): readonly ClassifiedPath[] {
  const result = classify_settings_paths(settings);
  if (result.unknown.length > 0) {
    throw new UnknownLegacyPathError(result.unknown);
  }
  return result.classified;
}

export { classify_path, type ConverterName, type PathRule } from "./path_rules.js";
export { SETTINGS_PATH_RULES } from "./settings_path_registry.js";

export { convert_settings } from "./converters/settings_converter.js";
export type {
  LegacyPreferenceRecord,
  SettingsConversionResult,
  TavernCanvasSettings,
} from "./converters/settings_converter.js";

export { convert_provider } from "./converters/provider_converter.js";

export { convert_prompts } from "./converters/prompt_converter.js";
export type { PromptConversionResult } from "./converters/prompt_converter.js";

export { convert_assets } from "./converters/asset_converter.js";
export type { AssetConversionResult } from "./converters/asset_converter.js";

export { convert_characters } from "./converters/character_converter.js";
export type { CharacterConversionResult } from "./converters/character_converter.js";

export { convert_knowledge } from "./converters/knowledge_converter.js";
export type { KnowledgeConversionResult } from "./converters/knowledge_converter.js";

export { convert_gallery } from "./converters/gallery_converter.js";
export type { GalleryConversionResult } from "./converters/gallery_converter.js";

export { convert_messages } from "./converters/message_converter.js";
export type {
  ConvertedMessageMetadata,
  MessageConversionResult,
} from "./converters/message_converter.js";
