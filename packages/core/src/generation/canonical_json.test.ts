import { describe, expect, it } from "vitest";

import { canonical_json } from "./canonical_json.js";

class ExampleRecord {
  readonly value = 1;
}

describe("canonical_json", () => {
  it("sorts object keys recursively without changing array order", () => {
    const first = {
      zeta: 3,
      alpha: { delta: 4, charlie: 2 },
      items: [
        { beta: 2, alpha: 1 },
        { alpha: 3, beta: 4 },
      ],
    };
    const second = {
      items: [
        { alpha: 1, beta: 2 },
        { beta: 4, alpha: 3 },
      ],
      alpha: { charlie: 2, delta: 4 },
      zeta: 3,
    };

    expect(canonical_json(first)).toBe(canonical_json(second));
    expect(canonical_json(first)).toBe(
      '{"alpha":{"charlie":2,"delta":4},"items":[{"alpha":1,"beta":2},{"alpha":3,"beta":4}],"zeta":3}',
    );
  });

  it("keeps array order significant", () => {
    expect(canonical_json(["first", "second"])).not.toBe(canonical_json(["second", "first"]));
  });

  it("preserves CJK text and line breaks exactly", () => {
    const value = "雨夜巷口\n第二行";

    expect(JSON.parse(canonical_json(value))).toBe(value);
  });

  it.each([
    ["undefined", undefined],
    ["function", () => undefined],
    ["symbol", Symbol("unsupported")],
    ["bigint", 1n],
    ["NaN", Number.NaN],
    ["positive infinity", Number.POSITIVE_INFINITY],
    ["negative infinity", Number.NEGATIVE_INFINITY],
    ["class instance", new ExampleRecord()],
    ["map", new Map([["key", "value"]])],
    ["set", new Set(["value"])],
  ])("rejects %s", (_name, value) => {
    expect(() => canonical_json(value)).toThrow("Canonical JSON accepts only JSON data");
  });

  it("rejects unsupported nested values", () => {
    expect(() => canonical_json({ value: undefined })).toThrow(
      "Canonical JSON accepts only JSON data",
    );
    expect(() => canonical_json([undefined])).toThrow("Canonical JSON accepts only JSON data");
  });

  it("rejects cyclic objects", () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;

    expect(() => canonical_json(cyclic)).toThrow("Canonical JSON cannot encode cyclic data");
  });

  it("rejects sparse arrays, symbol keys, and accessors", () => {
    const sparse = Array.from({ length: 2 }) as unknown[];
    Reflect.deleteProperty(sparse, "0");
    const symbol_keyed = { value: 1, [Symbol("hidden")]: 2 };
    const accessor = Object.defineProperty({}, "value", {
      enumerable: true,
      get: () => 1,
    });

    expect(() => canonical_json(sparse)).toThrow("Canonical JSON accepts only JSON data");
    expect(() => canonical_json(symbol_keyed)).toThrow("Canonical JSON accepts only JSON data");
    expect(() => canonical_json(accessor)).toThrow("Canonical JSON accepts only JSON data");
  });

  it("serializes negative zero as zero", () => {
    expect(canonical_json(-0)).toBe("0");
    expect(canonical_json({ value: -0 })).toBe('{"value":0}');
  });
});
