import { readFile } from "node:fs/promises";

import { VocabularyRecordSchema } from "@tavern-canvas/contracts";
import { z } from "zod";

// Source lines are VocabularyRecord minus `record_id`; ids are reassigned after merging duplicates.
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

/** Any malformed line throws before output is produced, so a bad rebuild never touches a valid package. */
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
