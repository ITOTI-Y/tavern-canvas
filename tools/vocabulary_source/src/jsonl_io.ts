import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { z } from "zod";

export class JsonlParseError extends Error {
  constructor(
    message: string,
    readonly file_label: string,
    readonly line_number: number,
    options?: { cause?: unknown },
  ) {
    super(`${file_label}:${String(line_number)}: ${message}`, options);
    this.name = "JsonlParseError";
  }
}

export function to_jsonl(records: readonly unknown[]): string {
  return (
    records.map((record) => JSON.stringify(record)).join("\n") + (records.length > 0 ? "\n" : "")
  );
}

export async function write_jsonl(path: string, records: readonly unknown[]): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, to_jsonl(records), "utf8");
}

export function parse_jsonl<Schema extends z.ZodType>(
  text: string,
  schema: Schema,
  file_label: string,
): z.infer<Schema>[] {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  return lines.map((line, index) => {
    const line_number = index + 1;
    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch (cause) {
      throw new JsonlParseError("invalid JSON.", file_label, line_number, { cause });
    }
    const result = schema.safeParse(parsed);
    if (!result.success) {
      throw new JsonlParseError(
        `record failed schema validation: ${result.error.message}`,
        file_label,
        line_number,
      );
    }
    return result.data;
  });
}

export async function read_jsonl<Schema extends z.ZodType>(
  path: string,
  schema: Schema,
): Promise<z.infer<Schema>[]> {
  const text = await readFile(path, "utf8");
  return parse_jsonl(text, schema, path);
}
