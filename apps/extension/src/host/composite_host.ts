import type { CapabilityMatrix } from "@tavern-canvas/contracts";
import type { HostPromptInjection } from "@tavern-canvas/core";

import type {
  HostAdapter,
  HostChatChangeHandler,
  HostChatSnapshot,
  HostGenerationChunkHandler,
  HostGenerationHandler,
  HostImageTool,
  HostImageUploadRequest,
  HostImageUploadResult,
  HostMessageSwipedHandler,
  MessageUpdateRequest,
  PrivatePromptRequest,
} from "./host_adapter.js";
import {
  inspect_sillytavern,
  SillyTavernHost,
  type SillyTavernContextSurface,
  type SillyTavernFetch,
} from "./sillytavern_host.js";
import {
  inspect_tavern_helper,
  TavernHelperHost,
  type TavernHelperSurface,
} from "./tavern_helper_host.js";

/** Pure delegation: TavernHelper owns chat reads/writes and private prompt generation; SillyTavern owns events, tool registration and image upload. */
export class CompositeHostAdapter implements HostAdapter {
  readonly capabilities: CapabilityMatrix;
  readonly #helper: TavernHelperHost;
  readonly #sillytavern: SillyTavernHost;

  constructor(
    capabilities: CapabilityMatrix,
    helper: TavernHelperHost,
    sillytavern: SillyTavernHost,
  ) {
    this.capabilities = capabilities;
    this.#helper = helper;
    this.#sillytavern = sillytavern;
  }
  can_use_native_tools(): boolean {
    return (
      this.capabilities.native_tool_manager?.available === true &&
      this.#sillytavern.can_use_native_tools()
    );
  }

  get_locale(): string {
    return this.#sillytavern.get_locale();
  }

  get_active_chat(): Promise<HostChatSnapshot> {
    return this.#helper.get_active_chat();
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    return this.#sillytavern.subscribe_generation(handler);
  }

  subscribe_generation_chunk(handler: HostGenerationChunkHandler): () => void {
    return this.#sillytavern.subscribe_generation_chunk(handler);
  }

  subscribe_chat_change(handler: HostChatChangeHandler): () => void {
    return this.#sillytavern.subscribe_chat_change(handler);
  }

  subscribe_message_swiped(handler: HostMessageSwipedHandler): () => void {
    return this.#sillytavern.subscribe_message_swiped(handler);
  }

  register_image_tool(tool: HostImageTool): () => void {
    return this.#sillytavern.register_image_tool(tool);
  }

  set_trigger_injection(injection: HostPromptInjection | null): void {
    this.#sillytavern.set_trigger_injection(injection);
  }

  generate_private_prompt(request: PrivatePromptRequest): Promise<string> {
    return this.#helper.generate_private_prompt(request);
  }

  update_message(request: MessageUpdateRequest): Promise<void> {
    return this.#helper.update_message(request);
  }

  upload_image(request: HostImageUploadRequest): Promise<HostImageUploadResult> {
    return this.#sillytavern.upload_image(request);
  }
}

function read_property(container: unknown, property_name: string): unknown {
  if ((typeof container !== "object" || container === null) && typeof container !== "function") {
    return undefined;
  }
  try {
    return Reflect.get(container, property_name);
  } catch {
    return undefined;
  }
}

function read_sillytavern_context(globals: unknown): unknown {
  const sillytavern = read_property(globals, "SillyTavern");
  const get_context = read_property(sillytavern, "getContext");
  if (typeof get_context !== "function") {
    return undefined;
  }
  try {
    return Reflect.apply(get_context, sillytavern, []);
  } catch {
    return undefined;
  }
}

/** Returns a composite only when both halves are present, reusing the bootstrap probe's `inspect_*` checks; the casts do not widen trust because the host classes re-validate values they read back. */
export function create_composite_host(
  globals: unknown,
  capabilities: CapabilityMatrix,
): CompositeHostAdapter | null {
  const helper_surface = read_property(globals, "TavernHelper");
  const fetch_ = read_property(globals, "fetch");
  const context = read_sillytavern_context(globals);

  const helper_inspection = inspect_tavern_helper(helper_surface);
  const sillytavern_inspection = inspect_sillytavern(read_property(globals, "SillyTavern"), fetch_);

  if (!helper_inspection.detected || !helper_inspection.message_swipe_metadata) {
    return null;
  }
  if (!sillytavern_inspection.main_generation_events || context === undefined) {
    return null;
  }
  if (typeof fetch_ !== "function") {
    return null;
  }

  const sillytavern = new SillyTavernHost(
    context as SillyTavernContextSurface,
    fetch_ as SillyTavernFetch,
  );
  const helper = new TavernHelperHost(helper_surface as TavernHelperSurface, () =>
    sillytavern.get_active_chat_id(),
  );
  return new CompositeHostAdapter(capabilities, helper, sillytavern);
}
