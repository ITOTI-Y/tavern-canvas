import { describe, expect, it } from "vitest";

import { slot_error_label } from "./slot_error_label.js";

const t = (key: string): string => `t:${key}`;

describe("slot_error_label", () => {
  it.each([
    ["not_configured", "t:chat.errors.not_configured"],
    ["analysis_unparsable", "t:chat.errors.analysis_unparsable"],
    ["message_changed", "t:chat.errors.message_changed"],
    ["timed_out", "t:chat.errors.timed_out"],
  ])("translates the code %s", (code, label) => {
    expect(slot_error_label(t, code)).toBe(label);
  });

  it("shows an uncoded failure as written", () => {
    expect(slot_error_label(t, "upstream 502")).toBe("upstream 502");
  });
});
