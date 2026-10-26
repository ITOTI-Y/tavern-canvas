import type { Uuid } from "@tavern-canvas/contracts";
import type { RuntimeModule } from "@tavern-canvas/core";

import type { HostAdapter } from "../../host/index.js";
import type {
  AssetsCapability,
  PromptPresetsCapability,
} from "../../ui/contracts/ui_capabilities.js";
import type { IllustrationService, SlotPromptContext } from "./illustration_service.js";
import { SLOT_REGEX_SCRIPTS } from "./slot_markers.js";

const SLOT_ID_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

export function new_slot_id(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return [...bytes].map((byte) => SLOT_ID_ALPHABET[byte % 64] ?? "_").join("");
}

/** The preset chosen in the illustration settings and every stored character appearance. */
export async function load_slot_prompt_context(
  prompt_presets: PromptPresetsCapability,
  assets: AssetsCapability,
  prompt_preset_id: Uuid | null,
): Promise<SlotPromptContext> {
  const [preset, catalog] = await Promise.all([
    prompt_preset_id === null ? null : prompt_presets.load_draft(prompt_preset_id),
    assets.load(),
  ]);
  const text = (value: unknown): string => (typeof value === "string" ? value.trim() : "");
  return {
    preset,
    library: {
      characters: catalog.character.map((record) => ({
        id: record.id,
        name: record.display_name,
        appearance: text(record.payload.appearance),
      })),
      outfits: catalog.outfit.map((record) => ({
        id: record.id,
        name: record.display_name,
        description: text(record.payload.description),
        character_id: text(record.payload.character_id) || null,
      })),
    },
  };
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
