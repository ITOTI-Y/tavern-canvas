import {
  RequestImageArgumentsSchema,
  type RequestImageArguments,
  type Sha256,
} from "@tavern-canvas/contracts";

export const FALLBACK_CANDIDATE_BYTE_LIMIT = 16_384;

const CONTROL_COMMENT_OPENING = "<!-- tavern-canvas:image ";
const CONTROL_COMMENT_CLOSING = "-->";

type ParserState = "text" | "candidate" | "discarding";

export interface FallbackParseDelta {
  readonly cleaned_text: string;
  readonly requests: readonly Readonly<RequestImageArguments>[];
}

function utf8_byte_length(value: string): number {
  const code_point = value.codePointAt(0);
  if (code_point === undefined) {
    return 0;
  }
  if (code_point <= 0x7f) {
    return 1;
  }
  if (code_point <= 0x7ff) {
    return 2;
  }
  return code_point <= 0xffff ? 3 : 4;
}

function joins_split_surrogate_pair(previous: string, value: string): boolean {
  if (value.length !== 1 || previous.length === 0) {
    return false;
  }
  const previous_code_unit = previous.charCodeAt(previous.length - 1);
  const current_code_unit = value.charCodeAt(0);
  return (
    previous_code_unit >= 0xd800 &&
    previous_code_unit <= 0xdbff &&
    current_code_unit >= 0xdc00 &&
    current_code_unit <= 0xdfff
  );
}

function closing_prefix_byte_length(value: string): number {
  if (value.endsWith("--")) {
    return 2;
  }
  return value.endsWith("-") ? 1 : 0;
}

function delta(
  cleaned_text: string,
  requests: readonly Readonly<RequestImageArguments>[] = [],
): FallbackParseDelta {
  return Object.freeze({ cleaned_text, requests: Object.freeze(requests) });
}

export class FallbackStreamParser {
  readonly #expected_generation_anchor: Sha256;
  readonly #enabled: boolean;
  #state: ParserState = "text";
  #text_prefix = "";
  #candidate = "";
  #candidate_bytes = 0;
  #discarding_prefix = "";
  #finished = false;

  constructor(expected_generation_anchor: Sha256, enabled = true) {
    this.#expected_generation_anchor = expected_generation_anchor;
    this.#enabled = enabled;
  }

  get buffered_bytes(): number {
    if (this.#state === "candidate") {
      return this.#candidate_bytes;
    }
    return new TextEncoder().encode(
      this.#state === "text" ? this.#text_prefix : this.#discarding_prefix,
    ).byteLength;
  }

  push(chunk: string): FallbackParseDelta {
    if (this.#finished) {
      throw new Error("Cannot push fallback stream content after finish");
    }
    if (!this.#enabled) {
      return delta(chunk);
    }

    const cleaned_parts: string[] = [];
    const requests: Readonly<RequestImageArguments>[] = [];
    for (const character of chunk) {
      switch (this.#state) {
        case "text":
          this.#consume_text(character, cleaned_parts);
          break;
        case "candidate":
          this.#consume_candidate(character, requests);
          break;
        case "discarding":
          this.#consume_discarding(character);
          break;
      }
    }
    return delta(cleaned_parts.join(""), requests);
  }

  finish(): FallbackParseDelta {
    if (this.#finished) {
      return delta("");
    }
    this.#finished = true;

    if (!this.#enabled) {
      return delta("");
    }
    const cleaned_text = this.#state === "text" ? this.#text_prefix : "";
    this.#reset_buffers();
    return delta(cleaned_text);
  }

  #consume_text(character: string, cleaned_parts: string[]): void {
    this.#text_prefix += character;
    while (!CONTROL_COMMENT_OPENING.startsWith(this.#text_prefix)) {
      const code_point = this.#text_prefix.codePointAt(0);
      if (code_point === undefined) {
        break;
      }
      const first_character = String.fromCodePoint(code_point);
      cleaned_parts.push(first_character);
      this.#text_prefix = this.#text_prefix.slice(first_character.length);
    }
    if (this.#text_prefix === CONTROL_COMMENT_OPENING) {
      this.#text_prefix = "";
      this.#state = "candidate";
    }
  }

  #consume_candidate(character: string, requests: Readonly<RequestImageArguments>[]): void {
    const joins_previous_surrogate = joins_split_surrogate_pair(this.#candidate, character);
    this.#candidate += character;
    this.#candidate_bytes += joins_previous_surrogate ? 1 : utf8_byte_length(character);

    if (this.#candidate.endsWith(CONTROL_COMMENT_CLOSING)) {
      const candidate_json = this.#candidate.slice(0, -CONTROL_COMMENT_CLOSING.length);
      const candidate_bytes = this.#candidate_bytes - CONTROL_COMMENT_CLOSING.length;
      if (candidate_bytes <= FALLBACK_CANDIDATE_BYTE_LIMIT) {
        const request = this.#parse_candidate(candidate_json);
        if (request !== null) {
          requests.push(request);
        }
      }
      this.#candidate = "";
      this.#candidate_bytes = 0;
      this.#state = "text";
      return;
    }

    const possible_closing_bytes = closing_prefix_byte_length(this.#candidate);
    if (this.#candidate_bytes - possible_closing_bytes > FALLBACK_CANDIDATE_BYTE_LIMIT) {
      this.#candidate = "";
      this.#candidate_bytes = 0;
      this.#state = "discarding";
      this.#discarding_prefix = "";
    }
  }

  #consume_discarding(character: string): void {
    this.#discarding_prefix += character;
    while (!CONTROL_COMMENT_CLOSING.startsWith(this.#discarding_prefix)) {
      const first_character = this.#discarding_prefix[0];
      if (first_character === undefined) {
        break;
      }
      this.#discarding_prefix = this.#discarding_prefix.slice(1);
    }
    if (this.#discarding_prefix === CONTROL_COMMENT_CLOSING) {
      this.#discarding_prefix = "";
      this.#state = "text";
    }
  }

  #parse_candidate(candidate_json: string): Readonly<RequestImageArguments> | null {
    let input: unknown;
    try {
      input = JSON.parse(candidate_json);
    } catch {
      return null;
    }
    const result = RequestImageArgumentsSchema.safeParse(input);
    if (!result.success || result.data.generation_anchor !== this.#expected_generation_anchor) {
      return null;
    }
    return Object.freeze(result.data);
  }

  #reset_buffers(): void {
    this.#text_prefix = "";
    this.#candidate = "";
    this.#candidate_bytes = 0;
    this.#discarding_prefix = "";
  }
}
