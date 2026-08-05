import { GenerationTriggerModeSchema } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import { create_trigger_policy } from "./tool_policy.js";

const generation_anchor = "a".repeat(64);

const private_prompt_policy = {
  tools: [],
  tool_choice: "none",
} as const;

describe("create_trigger_policy", () => {
  it("creates the exact bounded native-tool policy", () => {
    expect(create_trigger_policy("native_tool", generation_anchor)).toEqual({
      mode: "native_tool",
      register_native_tool: true,
      host_injection: {
        position: "in_chat",
        depth: 0,
        role: "system",
        scan_world_info: false,
        content:
          'Use image generation only when visual content would materially support the response. When appropriate, call request_image with generation_anchor "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" before writing final assistant text.',
      },
      private_prompt: private_prompt_policy,
    });
  });

  it("creates the exact fallback grammar without native tool registration", () => {
    expect(create_trigger_policy("fallback_comment", generation_anchor)).toEqual({
      mode: "fallback_comment",
      register_native_tool: false,
      host_injection: {
        position: "in_chat",
        depth: 0,
        role: "system",
        scan_world_info: false,
        content:
          'When image generation is appropriate, emit this exact hidden comment before writing final assistant text: <!-- tavern-canvas:image {"generation_anchor":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","scene_description":"<text>"} -->',
      },
      private_prompt: private_prompt_policy,
    });
  });

  it.each(GenerationTriggerModeSchema.options)(
    "keeps private prompt generation tool-free in %s mode",
    (mode) => {
      const policy = create_trigger_policy(mode, generation_anchor);

      expect(policy.private_prompt.tools).toEqual([]);
      expect(policy.private_prompt.tool_choice).toBe("none");
    },
  );

  it("contains no provider controls or world-info instructions", () => {
    for (const mode of GenerationTriggerModeSchema.options) {
      const content = create_trigger_policy(mode, generation_anchor).host_injection.content;

      expect(content).not.toMatch(/provider|https?:\/\/|secret|header|world\s*info/iu);
      expect(content.match(new RegExp(generation_anchor, "gu"))).toHaveLength(1);
    }
  });
});
