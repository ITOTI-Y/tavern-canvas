/**
 * Main-trigger parsing: extracts image-generation cues the roleplay model embeds inline in its own
 * reply between configured start/end markers -- distinct from Stage 02's structured native-tool and
 * `<!-- tavern-canvas:image ... -->` fallback-comment mechanisms (`generation_trigger_module.ts`).
 * Ported from legacy `parsePrompts`/`pregenManager` (utils/settings/stream_generate.js,
 * utils/pregen_manager.js).
 *
 * Delegates every extracted prompt to Stage 02 by calling an injected `RequestImageTool`-shaped
 * port (`TriggerDelegatePort`) -- this module keeps only a per-session dedupe `Set`, never a second
 * job queue.
 *
 * Boundary with T3: this module owns text-marker PARSING only. Click/drawing/gesture triggers
 * (`clicktrigger.*`, `gesture.*` in docs/parity/feature_matrix.md) are DOM/canvas interactions with
 * no text to parse -- T3's `ChatMediaInteractionPort` owns binding those to the host surface. Both
 * ultimately produce the same typed delegation call shape this module defines
 * (`TriggerDelegatePort.execute`), so T3 can reuse it once its own trigger detection resolves a
 * scene description.
 */

export interface TriggerMarkerConfig {
  readonly start: string;
  readonly end: string;
}

export const DEFAULT_TRIGGER_MARKERS: TriggerMarkerConfig = Object.freeze({
  start: "image###",
  end: "###",
});

export interface ExtractedTrigger {
  readonly raw_match: string;
  readonly prompt: string;
}

export interface TriggerExtractionResult {
  readonly cleaned_text: string;
  readonly triggers: readonly ExtractedTrigger[];
}

function escape_regex_chars(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Trims, strips physical newlines, and normalizes full-width punctuation to half-width. */
function sanitize_trigger_content(raw: string): string {
  return raw.trim().replace(/\n/g, "").replace(/，/g, ",").replace(/；/g, ";").replace(/：/g, ":");
}

/**
 * One-shot extraction from a complete, final text (a fully received message, not a stream). When
 * `retain_original_text` is false the matched `start...end` blocks are removed from `cleaned_text`;
 * when true they are left in place (the "insert original text" behavior).
 */
export function extract_triggers_from_text(
  text: string,
  markers: TriggerMarkerConfig = DEFAULT_TRIGGER_MARKERS,
  retain_original_text = false,
): TriggerExtractionResult {
  const pattern = new RegExp(
    `${escape_regex_chars(markers.start)}([\\s\\S]*?)${escape_regex_chars(markers.end)}`,
    "g",
  );
  const triggers: ExtractedTrigger[] = [...text.matchAll(pattern)].map((match) => ({
    raw_match: match[0],
    prompt: sanitize_trigger_content(match[1] ?? ""),
  }));
  const cleaned_text = retain_original_text ? text : text.replace(pattern, "");
  return { cleaned_text, triggers };
}

// ---------------------------------------------------------------------------
// Streaming extraction -- partial markers across chunk boundaries
// ---------------------------------------------------------------------------

const MAX_CANDIDATE_LENGTH = 8_192;

type StreamState = "text" | "candidate" | "discarding";

/**
 * Stateful char-by-char scanner for streaming text, mirroring `FallbackStreamParser`'s buffering
 * strategy (`packages/core/src/generation/fallback_stream_parser.ts`) but for plain configured
 * start/end markers instead of a JSON control comment: characters are only ever emitted once they
 * are provably not the prefix of a start marker split across two `push()` calls.
 */
export class TriggerStreamParser {
  readonly #markers: TriggerMarkerConfig;
  readonly #retain_original_text: boolean;
  #state: StreamState = "text";
  #text_prefix = "";
  #candidate = "";
  #discarding_prefix = "";
  #finished = false;

  constructor(
    markers: TriggerMarkerConfig = DEFAULT_TRIGGER_MARKERS,
    retain_original_text = false,
  ) {
    this.#markers = markers;
    this.#retain_original_text = retain_original_text;
  }

  push(chunk: string): TriggerExtractionResult {
    if (this.#finished) {
      throw new Error("Cannot push trigger stream content after finish");
    }
    const stripped_parts: string[] = [];
    const triggers: ExtractedTrigger[] = [];
    for (const character of chunk) {
      switch (this.#state) {
        case "text":
          this.#consume_text(character, stripped_parts);
          break;
        case "candidate":
          this.#consume_candidate(character, triggers);
          break;
        case "discarding":
          this.#consume_discarding(character);
          break;
      }
    }
    return {
      cleaned_text: this.#retain_original_text ? chunk : stripped_parts.join(""),
      triggers,
    };
  }

  finish(): TriggerExtractionResult {
    if (this.#finished) {
      return { cleaned_text: "", triggers: [] };
    }
    this.#finished = true;
    const cleaned_text =
      !this.#retain_original_text && this.#state === "text" ? this.#text_prefix : "";
    this.#text_prefix = "";
    this.#candidate = "";
    this.#discarding_prefix = "";
    return { cleaned_text, triggers: [] };
  }

  #consume_text(character: string, stripped_parts: string[]): void {
    this.#text_prefix += character;
    while (!this.#markers.start.startsWith(this.#text_prefix)) {
      const first_character = this.#text_prefix[0] as string;
      stripped_parts.push(first_character);
      this.#text_prefix = this.#text_prefix.slice(1);
      if (this.#text_prefix === "") {
        break;
      }
    }
    if (this.#text_prefix === this.#markers.start) {
      this.#text_prefix = "";
      this.#state = "candidate";
    }
  }

  #consume_candidate(character: string, triggers: ExtractedTrigger[]): void {
    this.#candidate += character;
    if (this.#candidate.endsWith(this.#markers.end)) {
      const inner = this.#candidate.slice(0, -this.#markers.end.length);
      triggers.push({
        raw_match: `${this.#markers.start}${this.#candidate}`,
        prompt: sanitize_trigger_content(inner),
      });
      this.#candidate = "";
      this.#state = "text";
      return;
    }
    if (this.#candidate.length > MAX_CANDIDATE_LENGTH) {
      this.#candidate = "";
      this.#state = "discarding";
      this.#discarding_prefix = "";
    }
  }

  #consume_discarding(character: string): void {
    this.#discarding_prefix += character;
    while (!this.#markers.end.startsWith(this.#discarding_prefix)) {
      this.#discarding_prefix = this.#discarding_prefix.slice(1);
      if (this.#discarding_prefix === "") {
        break;
      }
    }
    if (this.#discarding_prefix === this.#markers.end) {
      this.#discarding_prefix = "";
      this.#state = "text";
    }
  }
}

// ---------------------------------------------------------------------------
// Delegation to Stage 02 with per-session pre-generation dedupe
// ---------------------------------------------------------------------------

export interface TriggerDelegateArguments {
  readonly generation_anchor: string;
  readonly scene_description: string;
}

/** Structurally the surface `@tavern-canvas/core`'s `RequestImageTool` already exposes. */
export interface TriggerDelegatePort {
  execute(host_root_generation_id: string, arguments_: unknown): unknown;
}

export interface TriggerParserSessionOptions {
  readonly markers?: TriggerMarkerConfig;
  readonly retain_original_text?: boolean;
  readonly auto_generation_enabled: boolean;
  readonly generation_anchor: string;
  readonly host_root_generation_id: string;
  readonly delegate: TriggerDelegatePort;
}

/**
 * Drives a `TriggerStreamParser` for one generation and, when `auto_generation_enabled`, delegates
 * every newly seen distinct prompt to Stage 02 exactly once (a `Set`-backed dedupe -- never a
 * second queue). When automatic generation is disabled, prompts are still extracted and exposed via
 * `delegated_prompts_since_last_check` for a caller to act on manually.
 */
export class TriggerParserSession {
  readonly #parser: TriggerStreamParser;
  readonly #options: TriggerParserSessionOptions;
  readonly #submitted_prompts = new Set<string>();
  readonly #delegated_prompts: string[] = [];

  constructor(options: TriggerParserSessionOptions) {
    this.#options = options;
    this.#parser = new TriggerStreamParser(
      options.markers ?? DEFAULT_TRIGGER_MARKERS,
      options.retain_original_text ?? false,
    );
  }

  get delegated_prompts(): readonly string[] {
    return this.#delegated_prompts;
  }

  push(chunk: string): TriggerExtractionResult {
    const result = this.#parser.push(chunk);
    this.#handle_triggers(result.triggers);
    return result;
  }

  finish(): TriggerExtractionResult {
    const result = this.#parser.finish();
    this.#handle_triggers(result.triggers);
    return result;
  }

  #handle_triggers(triggers: readonly ExtractedTrigger[]): void {
    for (const trigger of triggers) {
      if (trigger.prompt.length === 0 || this.#submitted_prompts.has(trigger.prompt)) {
        continue;
      }
      this.#submitted_prompts.add(trigger.prompt);
      this.#delegated_prompts.push(trigger.prompt);
      if (this.#options.auto_generation_enabled) {
        this.#options.delegate.execute(this.#options.host_root_generation_id, {
          generation_anchor: this.#options.generation_anchor,
          scene_description: trigger.prompt,
        } satisfies TriggerDelegateArguments);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// "Insert original text" auto-regex descriptors
// ---------------------------------------------------------------------------

export interface InsertOriginalTextRegexScript {
  readonly script_name: string;
  readonly find_regex: string;
  readonly replace_string: string;
  readonly prompt_only: boolean;
}

const IMAGE_TAG_SCRIPT_NAME = "tavern-canvas-hide-image-tag";
const IMGTHINK_TAG_SCRIPT_NAME = "tavern-canvas-hide-imgthink-tag";

/**
 * Descriptors for the two hide-rules the "insert original text" toggle needs so the raw
 * `<image>`/`<imgthink>` markup a retained-original message carries never renders in chat. Returning
 * typed descriptors keeps this module host-agnostic -- applying them to a live SillyTavern-style
 * regex engine is a host-adapter concern, not this pure module's.
 */
export function build_insert_original_text_regex_scripts(): readonly InsertOriginalTextRegexScript[] {
  return [
    {
      script_name: IMAGE_TAG_SCRIPT_NAME,
      find_regex: "/<image>[\\s\\S]*?<\\/image>/g",
      replace_string: "",
      prompt_only: true,
    },
    {
      script_name: IMGTHINK_TAG_SCRIPT_NAME,
      find_regex: "/<imgthink>[\\s\\S]*?<\\/imgthink>/g",
      replace_string: "",
      prompt_only: true,
    },
  ];
}
