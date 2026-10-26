export interface PngTextChunk {
  readonly keyword: string;
  readonly text: string;
}

const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

function decode_ascii(bytes: Uint8Array): string {
  let result = "";
  for (const byte of bytes) {
    result += String.fromCharCode(byte);
  }
  return result;
}

function split_at_null(bytes: Uint8Array, from: number): number {
  for (let index = from; index < bytes.length; index += 1) {
    if (bytes[index] === 0) {
      return index;
    }
  }
  return -1;
}

function decode_text_chunk(bytes: Uint8Array, start: number, end: number): PngTextChunk | null {
  const null_index = split_at_null(bytes, start);
  if (null_index === -1 || null_index >= end) {
    return null;
  }
  const keyword = new TextDecoder("iso-8859-1").decode(bytes.subarray(start, null_index));
  const text = new TextDecoder("iso-8859-1").decode(bytes.subarray(null_index + 1, end));
  return { keyword, text };
}

function decode_itxt_chunk(bytes: Uint8Array, start: number, end: number): PngTextChunk | null {
  const keyword_end = split_at_null(bytes, start);
  if (keyword_end === -1 || keyword_end + 2 >= end) {
    return null;
  }
  const keyword = new TextDecoder("iso-8859-1").decode(bytes.subarray(start, keyword_end));
  const compression_flag = bytes[keyword_end + 1] ?? 0;
  if (compression_flag !== 0) {
    return null;
  }
  const language_end = split_at_null(bytes, keyword_end + 3);
  if (language_end === -1) {
    return null;
  }
  const translated_keyword_end = split_at_null(bytes, language_end + 1);
  if (translated_keyword_end === -1) {
    return null;
  }
  const text = new TextDecoder("utf-8").decode(bytes.subarray(translated_keyword_end + 1, end));
  return { keyword, text };
}

export function parse_png_text_chunks(bytes: Uint8Array): readonly PngTextChunk[] {
  if (bytes.length < 8 || !PNG_SIGNATURE.every((expected, index) => bytes[index] === expected)) {
    return [];
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const chunks: PngTextChunk[] = [];
  let offset = 8;

  while (offset + 8 <= bytes.length) {
    const length = view.getUint32(offset, false);
    const type = decode_ascii(bytes.subarray(offset + 4, offset + 8));
    const data_start = offset + 8;
    const data_end = data_start + length;
    if (length < 0 || data_end + 4 > bytes.length) {
      break;
    }
    if (type === "tEXt") {
      const chunk = decode_text_chunk(bytes, data_start, data_end);
      if (chunk) {
        chunks.push(chunk);
      }
    } else if (type === "iTXt") {
      const chunk = decode_itxt_chunk(bytes, data_start, data_end);
      if (chunk) {
        chunks.push(chunk);
      }
    } else if (type === "IEND") {
      break;
    }
    offset = data_end + 4;
  }

  return chunks;
}

export type GenerationParameterSource = "sd_webui" | "novelai" | "comfyui";

export interface ExtractedGenerationParameters {
  readonly source: GenerationParameterSource;
  readonly positive_prompt: string | null;
  readonly negative_prompt: string | null;
  readonly seed: string | null;
  readonly sampler: string | null;
  readonly steps: string | null;
  readonly model: string | null;
  readonly raw_text: string;
}

function find_chunk(chunks: readonly PngTextChunk[], keyword: string): PngTextChunk | undefined {
  return chunks.find((chunk) => chunk.keyword.toLowerCase() === keyword.toLowerCase());
}

function extract_sd_webui(chunks: readonly PngTextChunk[]): ExtractedGenerationParameters | null {
  const chunk = find_chunk(chunks, "parameters");
  if (!chunk) {
    return null;
  }
  const text = chunk.text;
  const negative_split = /\r?\nNegative prompt:\s*/u.exec(text);
  const positive_prompt = negative_split ? text.slice(0, negative_split.index).trim() : null;
  const after_negative = negative_split
    ? text.slice(negative_split.index + negative_split[0].length)
    : text;
  const settings_split = /\r?\nSteps:/u.exec(after_negative);
  const negative_prompt = negative_split
    ? (settings_split ? after_negative.slice(0, settings_split.index) : after_negative).trim()
    : null;

  const seed_match = /Seed:\s*(\d+)/u.exec(text);
  const sampler_match = /Sampler:\s*([^,\n]+)/u.exec(text);
  const steps_match = /Steps:\s*(\d+)/u.exec(text);
  const model_match = /Model:\s*([^,\n]+)/u.exec(text);

  return {
    source: "sd_webui",
    positive_prompt,
    negative_prompt,
    seed: seed_match?.[1] ?? null,
    sampler: sampler_match?.[1]?.trim() ?? null,
    steps: steps_match?.[1] ?? null,
    model: model_match?.[1]?.trim() ?? null,
    raw_text: text,
  };
}

interface NovelAiComment {
  readonly seed?: unknown;
  readonly sampler?: unknown;
  readonly steps?: unknown;
  readonly uc?: unknown;
  readonly prompt?: unknown;
}

function as_string(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return String(value);
  }
  return null;
}

function extract_novelai(chunks: readonly PngTextChunk[]): ExtractedGenerationParameters | null {
  const comment_chunk = find_chunk(chunks, "Comment");
  const description_chunk = find_chunk(chunks, "Description");
  if (!comment_chunk && !description_chunk) {
    return null;
  }

  let comment: NovelAiComment = {};
  if (comment_chunk) {
    try {
      const parsed: unknown = JSON.parse(comment_chunk.text);
      if (parsed !== null && typeof parsed === "object") {
        comment = parsed;
      }
    } catch {
      comment = {};
    }
  }

  const raw_text = [description_chunk?.text, comment_chunk?.text].filter(Boolean).join("\n");

  return {
    source: "novelai",
    positive_prompt: description_chunk?.text ?? as_string(comment.prompt),
    negative_prompt: as_string(comment.uc),
    seed: as_string(comment.seed),
    sampler: as_string(comment.sampler),
    steps: as_string(comment.steps),
    model: null,
    raw_text: raw_text === "" ? (comment_chunk?.text ?? "") : raw_text,
  };
}

function extract_comfyui(chunks: readonly PngTextChunk[]): ExtractedGenerationParameters | null {
  const workflow_chunk = find_chunk(chunks, "prompt") ?? find_chunk(chunks, "workflow");
  if (!workflow_chunk) {
    return null;
  }
  const seed_match = /"seed"\s*:\s*(\d+)/u.exec(workflow_chunk.text);
  return {
    source: "comfyui",
    positive_prompt: null,
    negative_prompt: null,
    seed: seed_match?.[1] ?? null,
    sampler: null,
    steps: null,
    model: null,
    raw_text: workflow_chunk.text,
  };
}

export function extract_generation_parameters(
  bytes: Uint8Array,
): ExtractedGenerationParameters | null {
  const chunks = parse_png_text_chunks(bytes);
  if (chunks.length === 0) {
    return null;
  }
  return extract_sd_webui(chunks) ?? extract_novelai(chunks) ?? extract_comfyui(chunks);
}
