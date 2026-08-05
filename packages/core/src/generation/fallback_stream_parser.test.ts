import { describe, expect, expectTypeOf, it } from "vitest";

import {
  FALLBACK_CANDIDATE_BYTE_LIMIT,
  FallbackStreamParser,
  type FallbackParseDelta,
} from "./fallback_stream_parser.js";

const GENERATION_ANCHOR = "a".repeat(64);

function control_comment(overrides: Record<string, unknown> = {}): string {
  return `<!-- tavern-canvas:image ${JSON.stringify({
    generation_anchor: GENERATION_ANCHOR,
    scene_description: "A rainy alley",
    ...overrides,
  })} -->`;
}

function collect(deltas: readonly FallbackParseDelta[]) {
  return {
    cleaned_text: deltas.map((delta) => delta.cleaned_text).join(""),
    requests: deltas.flatMap((delta) => delta.requests),
  };
}

function parse_chunks(chunks: readonly string[], enabled = true) {
  const parser = new FallbackStreamParser(GENERATION_ANCHOR, enabled);
  return collect([...chunks.map((chunk) => parser.push(chunk)), parser.finish()]);
}

describe("FallbackStreamParser", () => {
  it("parses one valid control comment at every character split", () => {
    const comment = control_comment();
    const message = `Before ${comment} after`;

    for (let split = 0; split <= message.length; split += 1) {
      expect(
        parse_chunks([message.slice(0, split), message.slice(split)]),
        `split ${split}`,
      ).toEqual({
        cleaned_text: "Before  after",
        requests: [
          {
            generation_anchor: GENERATION_ANCHOR,
            scene_description: "A rainy alley",
          },
        ],
      });
    }
  });

  it("counts UTF-8 bytes correctly when chunks split surrogate pairs", () => {
    const scene_description = "\uD83D\uDE00".repeat(3_000);
    const comment = control_comment({ scene_description });
    const code_unit_chunks = Array.from(
      { length: comment.length },
      (_, index) => comment[index] ?? "",
    );

    expect(parse_chunks(code_unit_chunks)).toEqual({
      cleaned_text: "",
      requests: [{ generation_anchor: GENERATION_ANCHOR, scene_description }],
    });
  });

  it("parses multiple comments and preserves their order", () => {
    const first = control_comment({ scene_description: "First" });
    const second = control_comment({ scene_description: "Second", image_count: 2 });

    expect(parse_chunks([`A${first}B${second}C`])).toEqual({
      cleaned_text: "ABC",
      requests: [
        { generation_anchor: GENERATION_ANCHOR, scene_description: "First" },
        {
          generation_anchor: GENERATION_ANCHOR,
          scene_description: "Second",
          image_count: 2,
        },
      ],
    });
  });

  it("preserves ordinary HTML comments", () => {
    const message = "A<!-- ordinary comment -->B";
    expect(parse_chunks([message])).toEqual({ cleaned_text: message, requests: [] });
  });

  it("removes malformed and schema-invalid control comments without emitting requests", () => {
    const malformed = "<!-- tavern-canvas:image {not-json} -->";
    const unknown_key = control_comment({ provider_url: "https://example.invalid" });
    const too_long = control_comment({ scene_description: "x".repeat(12_001) });

    expect(parse_chunks([`A${malformed}B${unknown_key}C${too_long}D`])).toEqual({
      cleaned_text: "ABCD",
      requests: [],
    });
  });

  it("ignores a valid request bound to another generation anchor", () => {
    const comment = control_comment({ generation_anchor: "b".repeat(64) });
    expect(parse_chunks([`A${comment}B`])).toEqual({
      cleaned_text: "AB",
      requests: [],
    });
  });

  it("bounds an unterminated oversized candidate and resumes after its closure", () => {
    const parser = new FallbackStreamParser(GENERATION_ANCHOR);
    const opening = "<!-- tavern-canvas:image ";
    const first = parser.push(`${opening}${"x".repeat(FALLBACK_CANDIDATE_BYTE_LIMIT + 1)}`);

    expect(first).toEqual({ cleaned_text: "", requests: [] });
    expect(parser.buffered_bytes).toBeLessThanOrEqual(2);
    expect(collect([parser.push("-->safe"), parser.finish()])).toEqual({
      cleaned_text: "safe",
      requests: [],
    });
  });

  it("removes an incomplete TavernCanvas control comment at end of stream", () => {
    expect(parse_chunks(['safe<!-- tavern-canvas:image {"generation_anchor":'])).toEqual({
      cleaned_text: "safe",
      requests: [],
    });
  });

  it("passes control comments through untouched when native-tool mode disables parsing", () => {
    const message = `Before ${control_comment()} after`;
    expect(parse_chunks([message.slice(0, 20), message.slice(20)], false)).toEqual({
      cleaned_text: message,
      requests: [],
    });
  });

  it("does not expose a history scanning path", () => {
    type HasHistoryScan = "scan_history" extends keyof FallbackStreamParser ? true : false;
    expectTypeOf<HasHistoryScan>().toEqualTypeOf<false>();
  });
});
