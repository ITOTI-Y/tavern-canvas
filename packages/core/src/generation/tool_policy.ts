import {
  GenerationTriggerModeSchema,
  Sha256Schema,
  type GenerationTriggerMode,
} from "@tavern-canvas/contracts";

export interface HostPromptInjection {
  readonly position: "in_chat";
  readonly depth: 0;
  readonly role: "system";
  readonly scan_world_info: false;
  readonly content: string;
}

export interface PrivatePromptPolicy {
  readonly tools: readonly never[];
  readonly tool_choice: "none";
}

export interface GenerationTriggerPolicy {
  readonly mode: GenerationTriggerMode;
  readonly register_native_tool: boolean;
  readonly host_injection: HostPromptInjection;
  readonly private_prompt: PrivatePromptPolicy;
}

const PRIVATE_PROMPT_POLICY: PrivatePromptPolicy = Object.freeze({
  tools: Object.freeze([]),
  tool_choice: "none",
});

export function create_trigger_policy(
  mode: GenerationTriggerMode,
  generation_anchor: string,
): GenerationTriggerPolicy {
  const validated_mode = GenerationTriggerModeSchema.parse(mode);
  const validated_anchor = Sha256Schema.parse(generation_anchor);
  const native_tool = validated_mode === "native_tool";
  const content = native_tool
    ? `Use image generation only when visual content would materially support the response. When appropriate, call request_image with generation_anchor "${validated_anchor}" before writing final assistant text.`
    : `When image generation is appropriate, emit this exact hidden comment before writing final assistant text: <!-- tavern-canvas:image {"generation_anchor":"${validated_anchor}","scene_description":"<text>"} -->`;

  return Object.freeze({
    mode: validated_mode,
    register_native_tool: native_tool,
    host_injection: Object.freeze({
      position: "in_chat",
      depth: 0,
      role: "system",
      scan_world_info: false,
      content,
    }),
    private_prompt: PRIVATE_PROMPT_POLICY,
  });
}
