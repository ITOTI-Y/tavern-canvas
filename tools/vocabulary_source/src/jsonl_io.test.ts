import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { z } from "zod";

import { JsonlParseError, parse_jsonl, read_jsonl, to_jsonl, write_jsonl } from "./jsonl_io.js";

const RecordSchema = z.strictObject({ id: z.number().int(), name: z.string() });

describe("to_jsonl / parse_jsonl", () => {
  it("round-trips an empty list to an empty string", () => {
    expect(to_jsonl([])).toBe("");
    expect(parse_jsonl("", RecordSchema, "test")).toEqual([]);
  });

  it("round-trips records as one compact JSON object per line", () => {
    const records = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ];

    const text = to_jsonl(records);

    expect(text).toBe('{"id":1,"name":"a"}\n{"id":2,"name":"b"}\n');
    expect(parse_jsonl(text, RecordSchema, "test")).toEqual(records);
  });

  it("throws JsonlParseError with file label and line number on invalid JSON", () => {
    const text = '{"id":1,"name":"a"}\nnot json\n';

    expect(() => parse_jsonl(text, RecordSchema, "my_file.jsonl")).toThrow(JsonlParseError);
    expect(() => parse_jsonl(text, RecordSchema, "my_file.jsonl")).toThrow(/my_file\.jsonl:2/);
  });

  it("throws JsonlParseError on a line that fails schema validation", () => {
    const text = '{"id":"not-a-number","name":"a"}\n';

    expect(() => parse_jsonl(text, RecordSchema, "my_file.jsonl")).toThrow(/my_file\.jsonl:1/);
  });

  it("ignores trailing blank lines", () => {
    const text = '{"id":1,"name":"a"}\n\n';

    expect(parse_jsonl(text, RecordSchema, "test")).toEqual([{ id: 1, name: "a" }]);
  });
});

describe("write_jsonl / read_jsonl", () => {
  let temp_dir: string;

  beforeEach(async () => {
    temp_dir = await mkdtemp(join(tmpdir(), "vocab-jsonl-test-"));
  });

  afterEach(async () => {
    await rm(temp_dir, { recursive: true, force: true });
  });

  it("writes and reads back records, creating parent directories as needed", async () => {
    const path = join(temp_dir, "nested", "records.jsonl");
    const records = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ];

    await write_jsonl(path, records);
    const result = await read_jsonl(path, RecordSchema);

    expect(result).toEqual(records);
  });

  it("surfaces the real file path in a JsonlParseError", async () => {
    const path = join(temp_dir, "bad.jsonl");
    await write_jsonl(path, [{ id: "nope", name: "a" }]);

    await expect(read_jsonl(path, RecordSchema)).rejects.toThrow(`${path}:1`);
  });
});
