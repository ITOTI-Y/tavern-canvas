import { describe, expect, it } from "vitest";

import { GenerationTriggerModeSchema } from "./generation.js";

describe("GenerationTriggerModeSchema", () => {
  it("exposes only the native-tool and bounded fallback modes", () => {
    expect(GenerationTriggerModeSchema.options).toEqual(["native_tool", "fallback_comment"]);
    expect(GenerationTriggerModeSchema.parse("native_tool")).toBe("native_tool");
    expect(GenerationTriggerModeSchema.parse("fallback_comment")).toBe("fallback_comment");
  });

  it("rejects any second trigger path", () => {
    expect(() => GenerationTriggerModeSchema.parse("history_scan")).toThrow();
  });
});
