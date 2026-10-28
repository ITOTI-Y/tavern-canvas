import type { Uuid } from "@tavern-canvas/contracts";
import type { RuntimeModule } from "@tavern-canvas/core";

import type { HostAdapter } from "../../host/index.js";
import type {
  AssetCategory,
  AssetRecordSummary,
  AssetsCapability,
  PromptPresetsCapability,
} from "../../ui/contracts/ui_capabilities.js";
import type { IllustrationService, SlotPromptContext } from "./illustration_service.js";
import { library_in_chat } from "../wardrobe/wardrobe_library.js";
import type { SlotLibrary } from "./library_match.js";
import { SLOT_REGEX_SCRIPTS } from "./slot_markers.js";

const SLOT_ID_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

export function new_slot_id(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return [...bytes].map((byte) => SLOT_ID_ALPHABET[byte % 64] ?? "_").join("");
}

/** The global library and the entries bound to this chat, in library order. */
export async function load_slot_library(
  assets: AssetsCapability,
  chat_id: string,
): Promise<SlotLibrary> {
  return slot_library_of(await assets.load(), chat_id);
}

export function slot_library_of(
  catalog: Readonly<Record<AssetCategory, readonly AssetRecordSummary[]>>,
  chat_id: string | null,
): SlotLibrary {
  const text = (value: unknown): string => (typeof value === "string" ? value.trim() : "");
  return {
    ...library_in_chat(catalog, chat_id),
    loras: catalog.lora.flatMap((record) => {
      const character_id = text(record.payload.character_id);
      return character_id === ""
        ? []
        : [
            {
              file_name: text(record.payload.file_name),
              weight: typeof record.payload.weight === "number" ? record.payload.weight : 1,
              trigger_words: text(record.payload.trigger_words),
              character_id,
            },
          ];
    }),
  };
}

/** The preset chosen in the illustration settings and the library this chat sees. */
export async function load_slot_prompt_context(
  prompt_presets: PromptPresetsCapability,
  assets: AssetsCapability,
  prompt_preset_id: Uuid | null,
  chat_id: string,
): Promise<SlotPromptContext> {
  const [preset, library] = await Promise.all([
    prompt_preset_id === null ? null : prompt_presets.load_draft(prompt_preset_id),
    load_slot_library(assets, chat_id),
  ]);
  return { preset, library };
}

/** Installs the slot regex scripts before listening, so the first marker it writes already renders. */
export class IllustrationModule implements RuntimeModule {
  readonly module_id = "illustrations";
  readonly requires: readonly string[] = [];
  readonly #service: IllustrationService;
  readonly #host: HostAdapter;
  #regex_error: string | null = null;

  constructor(service: IllustrationService, host: HostAdapter) {
    this.#service = service;
    this.#host = host;
  }

  /** Why the regex scripts could not be installed; markers then stay invisible in the chat. */
  get regex_error(): string | null {
    return this.#regex_error;
  }

  async start(): Promise<void> {
    try {
      await this.#host.sync_regex_scripts(SLOT_REGEX_SCRIPTS);
      this.#regex_error = null;
    } catch (error) {
      this.#regex_error = error instanceof Error ? error.message : String(error);
    }
    this.#service.start();
  }

  stop(): Promise<void> {
    this.#service.stop();
    return Promise.resolve();
  }
}
