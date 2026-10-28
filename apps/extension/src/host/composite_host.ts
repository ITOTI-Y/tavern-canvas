import type { CapabilityMatrix } from "@tavern-canvas/contracts";

import type {
  DeepLEndpoint,
  DeepLTarget,
  HostAdapter,
  HostChatChangeHandler,
  HostChatSnapshot,
  HostGenerationHandler,
  HostMessageRenderedHandler,
  HostRegexScript,
  HostSwipeLocation,
  HostWorldbookEntry,
  PresetGenerationRequest,
  PresetGenerationResult,
} from "./host_adapter.js";
import type { ChatSurfaceMounts } from "./chat_surface.js";
import {
  inspect_sillytavern,
  SillyTavernHost,
  type SillyTavernContextSurface,
} from "./sillytavern_host.js";
import {
  inspect_tavern_helper,
  TavernHelperHost,
  type TavernHelperSurface,
} from "./tavern_helper_host.js";

/** TavernHelper owns chat text, preset generation, regex scripts and message DOM lookup; SillyTavern owns events and the per-swipe `extra` record. */
export class CompositeHostAdapter implements HostAdapter {
  readonly capabilities: CapabilityMatrix;
  readonly #helper: TavernHelperHost;
  readonly #sillytavern: SillyTavernHost;
  readonly #surface: ChatSurfaceMounts | null;

  /** `surface` is set when TauriTavern's managed ChatSurface owns the message DOM. */
  constructor(
    capabilities: CapabilityMatrix,
    helper: TavernHelperHost,
    sillytavern: SillyTavernHost,
    surface: ChatSurfaceMounts | null,
  ) {
    this.capabilities = capabilities;
    this.#helper = helper;
    this.#sillytavern = sillytavern;
    this.#surface = surface;
  }

  get_locale(): string {
    return this.#sillytavern.get_locale();
  }

  get_active_chat_id(): string | null {
    return this.#sillytavern.get_active_chat_id();
  }

  get_active_chat(): Promise<HostChatSnapshot> {
    return this.#helper.get_active_chat();
  }

  get_active_swipe_id(message_id: number): number | null {
    return this.#helper.get_active_swipe_id(message_id);
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    return this.#sillytavern.subscribe_generation(handler);
  }

  subscribe_chat_change(handler: HostChatChangeHandler): () => void {
    return this.#sillytavern.subscribe_chat_change(handler);
  }

  subscribe_message_rendered(handler: HostMessageRenderedHandler): () => void {
    const unsubscribe_events = this.#sillytavern.subscribe_message_rendered(handler);
    const unsubscribe_surface = this.#surface?.subscribe((event) => {
      if (event.type === "committed") {
        handler(event.mount.mesid);
      }
    });
    return () => {
      unsubscribe_events();
      unsubscribe_surface?.();
    };
  }

  subscribe_message_released(handler: HostMessageRenderedHandler): () => void {
    return (
      this.#surface?.subscribe((event) => {
        if (event.type === "released") {
          handler(event.mesid);
        }
      }) ??
      (() => {
        // Without a managed surface, message DOM is only replaced, never dropped.
      })
    );
  }

  subscribe_chat_rendered(handler: () => void): () => void {
    return this.#sillytavern.subscribe_chat_rendered(handler);
  }

  find_message_element(message_id: number): HTMLElement | null {
    return this.#helper.find_message_element(message_id);
  }

  read_swipe_record(location: HostSwipeLocation): unknown {
    return this.#sillytavern.read_swipe_record(location);
  }

  write_swipe_record(location: HostSwipeLocation, record: unknown): Promise<void> {
    return this.#sillytavern.write_swipe_record(location, record);
  }

  read_swipe_wardrobe(location: HostSwipeLocation): unknown {
    return this.#sillytavern.read_swipe_wardrobe(location);
  }

  write_swipe_wardrobe(location: HostSwipeLocation, record: unknown): Promise<void> {
    return this.#sillytavern.write_swipe_wardrobe(location, record);
  }

  replace_message_text(message_id: number, expected: string, next: string): Promise<boolean> {
    return this.#helper.replace_message_text(message_id, expected, next);
  }

  generate_with_preset(request: PresetGenerationRequest): Promise<PresetGenerationResult> {
    return this.#helper.generate_with_preset(request);
  }

  list_worldbooks(): readonly string[] {
    return this.#helper.list_worldbooks();
  }

  read_worldbook(name: string): Promise<readonly HostWorldbookEntry[]> {
    return this.#helper.read_worldbook(name);
  }

  stop_generation(generation_id: string): void {
    this.#helper.stop_generation(generation_id);
  }

  sync_regex_scripts(scripts: readonly HostRegexScript[]): Promise<boolean> {
    return this.#helper.sync_regex_scripts(scripts);
  }

  translate_deepl(text: string, target: DeepLTarget, endpoint: DeepLEndpoint): Promise<string> {
    return this.#sillytavern.translate_deepl(text, target, endpoint);
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

/** Returns a composite only when both halves pass the bootstrap probe's `inspect_*` checks. */
export function create_composite_host(
  globals: unknown,
  capabilities: CapabilityMatrix,
  surface: ChatSurfaceMounts | null,
): CompositeHostAdapter | null {
  const helper_surface = read_property(globals, "TavernHelper");
  const sillytavern_global = read_property(globals, "SillyTavern");
  const fetch_ = read_property(globals, "fetch");
  const helper_inspection = inspect_tavern_helper(helper_surface);
  const sillytavern_inspection = inspect_sillytavern(sillytavern_global);

  if (
    !helper_inspection.message_swipe_metadata ||
    !helper_inspection.preset_generation ||
    !helper_inspection.tavern_regex ||
    !sillytavern_inspection.main_generation_events ||
    !sillytavern_inspection.message_swipe_metadata ||
    typeof fetch_ !== "function"
  ) {
    return null;
  }

  const sillytavern = new SillyTavernHost(
    () => (sillytavern_global as { getContext(): SillyTavernContextSurface }).getContext(),
    fetch_ as typeof fetch,
  );
  const helper = new TavernHelperHost(helper_surface as TavernHelperSurface, () => {
    const chat_id = sillytavern.get_active_chat_id();
    if (chat_id === null) {
      throw new Error("No chat is open");
    }
    return chat_id;
  });
  return new CompositeHostAdapter(capabilities, helper, sillytavern, surface);
}
