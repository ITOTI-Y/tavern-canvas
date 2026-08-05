import { describe, expect, it } from "vitest";

import { BrowserRandomSource, create_generation_anchors, type RandomSource } from "./anchors.js";
import { SourceContextSchema, type SourceContext } from "./source_context.js";

class FixedRandomSource implements RandomSource {
  readonly #value: Uint8Array;

  constructor(value: Uint8Array) {
    this.#value = value;
  }

  bytes(length: number): Uint8Array {
    expect(length).toBe(32);
    return this.#value.slice();
  }
}

function source_context(): SourceContext {
  return SourceContextSchema.parse({
    schema_version: 1,
    chat_id: "chat-42",
    active_swipes: [{ message_id: 1, swipe_id: 0 }],
    messages: [
      {
        message_id: 1,
        role: "user",
        content_sha256: "a".repeat(64),
        swipe_id: null,
      },
    ],
  });
}

describe("create_generation_anchors", () => {
  it("returns identical anchors for identical context and invocation bytes", () => {
    const random_source = new FixedRandomSource(new Uint8Array(32).fill(7));

    expect(create_generation_anchors(source_context(), random_source)).toEqual(
      create_generation_anchors(source_context(), random_source),
    );
  });

  it("keeps the source anchor and changes the generation anchor for distinct invocations", () => {
    const first = create_generation_anchors(
      source_context(),
      new FixedRandomSource(new Uint8Array(32).fill(1)),
    );
    const second = create_generation_anchors(
      source_context(),
      new FixedRandomSource(new Uint8Array(32).fill(2)),
    );

    expect(first.source_anchor).toBe(second.source_anchor);
    expect(first.generation_anchor).not.toBe(second.generation_anchor);
    expect(first.source_anchor).toMatch(/^[a-f0-9]{64}$/u);
    expect(first.generation_anchor).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("matches the committed canonical hash fixture", () => {
    const invocation_bytes = Uint8Array.from({ length: 32 }, (_value, index) => index);

    expect(
      create_generation_anchors(source_context(), new FixedRandomSource(invocation_bytes)),
    ).toEqual({
      source_anchor: "cdfb20c6e5e5958f9cf3b712ed51934d90fb5e8d229c93d487ff8f36e5cc090f",
      generation_anchor: "87b57c4d0db50378817d4c8f9a98f852b76cfaec99ecf11e9eebb2ad12395a54",
    });
  });

  it("rejects a random source that does not return exactly 32 bytes", () => {
    const random_source = new FixedRandomSource(new Uint8Array(31));

    expect(() => create_generation_anchors(source_context(), random_source)).toThrow(
      "Random source must return exactly 32 bytes",
    );
  });
});

describe("BrowserRandomSource", () => {
  it("fails closed when secure browser randomness is unavailable", () => {
    expect(() => new BrowserRandomSource(undefined)).toThrow(
      "Secure random generation is unavailable",
    );
  });

  it("delegates every byte request to getRandomValues", () => {
    const requested_lengths: number[] = [];
    const crypto_source = {
      getRandomValues<T extends ArrayBufferView>(array: T): T {
        requested_lengths.push(array.byteLength);
        new Uint8Array(array.buffer, array.byteOffset, array.byteLength).fill(9);
        return array;
      },
    };
    const random_source = new BrowserRandomSource(crypto_source);

    expect(random_source.bytes(4)).toEqual(new Uint8Array([9, 9, 9, 9]));
    expect(requested_lengths).toEqual([4]);
  });
});
