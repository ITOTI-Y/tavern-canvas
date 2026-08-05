import { describe, expect, expectTypeOf, it } from "vitest";

import { HOST_CAPABILITY_IDS } from "./index.js";

import type {
  HostAdapter,
  HostChatSnapshot,
  HostGenerationEvent,
  HostImageTool,
  HostImageUploadRequest,
  HostImageUploadResult,
  MessageUpdateRequest,
  PrivatePromptRequest,
} from "./index.js";

const capabilities = {
  native_tool_manager: { available: true },
};

const adapter: HostAdapter = {
  capabilities,
  get_locale: () => "en",
  get_active_chat: async () => ({ chat_id: "chat-1", messages: [] }),
  subscribe_generation: () => () => undefined,
  subscribe_generation_chunk: () => () => undefined,
  register_image_tool: () => () => undefined,
  generate_private_prompt: async () => "response",
  update_message: async () => undefined,
  upload_image: async () => ({ path: "/user/images/example.png" }),
};

describe("HostAdapter boundary", () => {
  it("defines the complete capability boundary in deterministic order", () => {
    expect(HOST_CAPABILITY_IDS).toEqual([
      "native_tool_manager",
      "main_generation_events",
      "private_prompt_generation",
      "message_swipe_metadata",
      "host_image_upload",
      "tavern_helper",
      "tauri_chat_surface",
      "tauri_world_info_activation",
      "gateway_protocol",
    ]);
  });

  it("exposes exactly the supported capability property and eight operations", () => {
    expect(Object.keys(adapter)).toEqual([
      "capabilities",
      "get_locale",
      "get_active_chat",
      "subscribe_generation",
      "subscribe_generation_chunk",
      "register_image_tool",
      "generate_private_prompt",
      "update_message",
      "upload_image",
    ]);
  });

  it("uses normalized domain inputs and outputs", () => {
    expectTypeOf(adapter.get_active_chat).returns.toEqualTypeOf<Promise<HostChatSnapshot>>();
    expectTypeOf(adapter.subscribe_generation)
      .parameter(0)
      .parameter(0)
      .toEqualTypeOf<HostGenerationEvent>();
    expectTypeOf(adapter.subscribe_generation_chunk)
      .parameter(0)
      .parameter(0)
      .toEqualTypeOf<string>();
    expectTypeOf<HostImageTool["stealth"]>().toEqualTypeOf<boolean>();
    expectTypeOf(adapter.register_image_tool).parameter(0).toEqualTypeOf<HostImageTool>();
    expectTypeOf(adapter.generate_private_prompt)
      .parameter(0)
      .toEqualTypeOf<PrivatePromptRequest>();
    expectTypeOf(adapter.update_message).parameter(0).toEqualTypeOf<MessageUpdateRequest>();
    expectTypeOf(adapter.upload_image).parameter(0).toEqualTypeOf<HostImageUploadRequest>();
    expectTypeOf(adapter.upload_image).returns.toEqualTypeOf<Promise<HostImageUploadResult>>();
  });
});
