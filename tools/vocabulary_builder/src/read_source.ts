import { readFile } from "node:fs/promises";

import { VocabularyRecordSchema } from "@tavern-canvas/contracts";
import { z } from "zod";

// The source line shape is the canonical VocabularyRecord minus `record_id`:
// the builder reassigns ids deterministically after merging duplicates, so
// source data never supplies one.
export const VocabularySourceRecordSchema = VocabularyRecordSchema.omit({ record_id: true });
export type VocabularySourceRecord = z.infer<typeof VocabularySourceRecordSchema>;

export class VocabularySourceError extends Error {
  readonly cause_kind: "io" | "format";

  constructor(message: string, cause_kind: "io" | "format") {
    super(message);
    this.name = "VocabularySourceError";
    this.cause_kind = cause_kind;
  }
}

/**
 * Reads a newline-delimited JSON vocabulary source. Blank lines are
 * skipped; every non-blank line must be a JSON object satisfying
 * `VocabularySourceRecordSchema`. Any malformed JSON or schema violation
 * ("malformed or over-limit source") throws before the caller can produce
 * any output, so a bad rebuild never touches a previously valid package.
 */
export async function read_vocabulary_source(
  input_path: string,
): Promise<VocabularySourceRecord[]> {
  let raw_text: string;
  try {
    raw_text = await readFile(input_path, "utf8");
  } catch (error) {
    throw new VocabularySourceError(
      `cannot read vocabulary source at "${input_path}": ${String(error)}`,
      "io",
    );
  }

  const lines = raw_text.split(/\r?\n/u).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    throw new VocabularySourceError(
      `vocabulary source at "${input_path}" has no records`,
      "format",
    );
  }

  return lines.map((line, index) => {
    const line_number = index + 1;
    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch (error) {
      throw new VocabularySourceError(
        `line ${String(line_number)} is not valid JSON: ${String(error)}`,
        "format",
      );
    }
    const result = VocabularySourceRecordSchema.safeParse(parsed);
    if (!result.success) {
      throw new VocabularySourceError(
        `line ${String(line_number)} failed validation: ${result.error.message}`,
        "format",
      );
    }
    return result.data;
  });
}
