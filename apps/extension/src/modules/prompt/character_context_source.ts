/** Expands `$Name-sfw-upperbody...$`-style placeholder tokens; name lookup is delegated to the injected `CharacterResolvers`. */

export interface CharacterFields {
  readonly traits: string;
  readonly facial_features: string;
  readonly facial_features_back: string;
  readonly upper_body_sfw: string;
  readonly upper_body_sfw_back: string;
  readonly upper_body_nsfw: string;
  readonly upper_body_nsfw_back: string;
  readonly full_body_sfw: string;
  readonly full_body_sfw_back: string;
  readonly full_body_nsfw: string;
  readonly full_body_nsfw_back: string;
  readonly negative: string;
}

export interface OutfitFields {
  readonly upper_body: string;
  readonly upper_body_back: string;
  readonly full_body: string;
  readonly full_body_back: string;
}

export interface CharacterResolvers {
  resolve_character(normalized_name: string): CharacterFields | null;
  resolve_outfit(normalized_name: string): OutfitFields | null;
}

export function normalize_character_name(name: string): string {
  return name
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/[''`´]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

type BodyState = "sfw" | "nsfw" | null;

interface CharacterSuffixFormat {
  readonly suffix: string;
  readonly upper: BodyState;
  readonly lower: BodyState;
}

const CHARACTER_SUFFIX_FORMATS: readonly CharacterSuffixFormat[] = [
  { suffix: "-sfw-upperbody-sfw-lowerbody", upper: "sfw", lower: "sfw" },
  { suffix: "-sfw-upperbody-nsfw-lowerbody", upper: "sfw", lower: "nsfw" },
  { suffix: "-nsfw-upperbody-sfw-lowerbody", upper: "nsfw", lower: "sfw" },
  { suffix: "-nsfw-upperbody-nsfw-lowerbody", upper: "nsfw", lower: "nsfw" },
  { suffix: "-sfw-upperbody-sfw-fullbody", upper: "sfw", lower: "sfw" },
  { suffix: "-sfw-upperbody-nsfw-fullbody", upper: "sfw", lower: "nsfw" },
  { suffix: "-nsfw-upperbody-sfw-fullbody", upper: "nsfw", lower: "sfw" },
  { suffix: "-nsfw-upperbody-nsfw-fullbody", upper: "nsfw", lower: "nsfw" },
  { suffix: "-sfw-upperbody", upper: "sfw", lower: null },
  { suffix: "-nsfw-upperbody", upper: "nsfw", lower: null },
  { suffix: "-sfw-lowerbody", upper: null, lower: "sfw" },
  { suffix: "-nsfw-lowerbody", upper: null, lower: "nsfw" },
];

interface OutfitSuffixFormat {
  readonly suffix: string;
  readonly has_upper: boolean;
  readonly has_lower: boolean;
}

const OUTFIT_SUFFIX_FORMATS: readonly OutfitSuffixFormat[] = [
  { suffix: "-upperbody-lowerbody", has_upper: true, has_lower: true },
  { suffix: "-upperbody", has_upper: true, has_lower: false },
  { suffix: "-lowerbody", has_upper: false, has_lower: true },
];

function append_part(base: string, part: string): string {
  if (!part) {
    return base;
  }
  return base ? `${base}, ${part}` : part;
}

function is_from_behind(name_and_angle: string): boolean {
  return name_and_angle.toLowerCase().includes("from behind");
}

export interface CharacterExpansionResult {
  readonly text: string;
  readonly collected_negatives: readonly string[];
}

/** Outfit tokens without camera-angle information inherit the "from behind" facing of the most recently resolved character token in the same string. */
export function expand_character_placeholders(
  text: string,
  resolvers: CharacterResolvers,
): CharacterExpansionResult {
  if (!text) {
    return { text, collected_negatives: [] };
  }

  let shared_is_from_behind = false;
  const collected_negatives: string[] = [];

  const expanded = text.replace(/\$([^$]+)\$/g, (match, content: string) => {
    const trimmed_content = content.trim();
    const lowercase_content = trimmed_content.toLowerCase();

    for (const format of CHARACTER_SUFFIX_FORMATS) {
      if (!lowercase_content.endsWith(format.suffix)) {
        continue;
      }
      const name_and_angle = trimmed_content.slice(0, -format.suffix.length).trim();
      // The resolver looks characters up by name alone; the camera-angle phrase is stripped before lookup and only decides `shared_is_from_behind`.
      const clean_name = name_and_angle.replace(/from behind/gi, "").trim();
      const character = resolvers.resolve_character(normalize_character_name(clean_name));
      if (character === null) {
        return match;
      }
      shared_is_from_behind = is_from_behind(name_and_angle);
      let replacement = character.traits;
      if (format.upper !== null) {
        const facial = shared_is_from_behind
          ? character.facial_features_back
          : character.facial_features;
        replacement = append_part(replacement, facial);
        const upper_field =
          format.upper === "sfw"
            ? shared_is_from_behind
              ? character.upper_body_sfw_back
              : character.upper_body_sfw
            : shared_is_from_behind
              ? character.upper_body_nsfw_back
              : character.upper_body_nsfw;
        replacement = append_part(replacement, upper_field);
      }
      if (format.lower !== null) {
        const lower_field =
          format.lower === "sfw"
            ? shared_is_from_behind
              ? character.full_body_sfw_back
              : character.full_body_sfw
            : shared_is_from_behind
              ? character.full_body_nsfw_back
              : character.full_body_nsfw;
        replacement = append_part(replacement, lower_field);
      }
      if (character.negative.trim() !== "") {
        collected_negatives.push(character.negative.trim());
      }
      return replacement;
    }

    for (const format of OUTFIT_SUFFIX_FORMATS) {
      if (!lowercase_content.endsWith(format.suffix)) {
        continue;
      }
      const raw_name = trimmed_content.slice(0, -format.suffix.length).trim();
      const outfit = resolvers.resolve_outfit(normalize_character_name(raw_name));
      if (outfit === null) {
        return match;
      }
      let replacement = "";
      if (format.has_upper) {
        replacement = shared_is_from_behind ? outfit.upper_body_back : outfit.upper_body;
      }
      if (format.has_lower) {
        const lower_field = shared_is_from_behind ? outfit.full_body_back : outfit.full_body;
        replacement = append_part(replacement, lower_field);
      }
      return replacement;
    }

    return match;
  });

  const cleaned = expanded
    .replace(/\r?\n/g, ", ")
    .replace(/, \s*,/g, ",")
    .replace(/,+/g, ",")
    .replace(/^, |, $/g, "")
    .trim();

  return { text: cleaned, collected_negatives };
}
