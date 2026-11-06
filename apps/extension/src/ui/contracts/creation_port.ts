import type { InjectionKey } from "vue";

import type { CreationScene } from "../../modules/creation/creation_record.js";
import type { SlotGenerationInput } from "../../modules/illustration/illustration_service.js";

export interface StripMessageView {
  readonly message_id: number;
  readonly name: string;
  readonly is_user: boolean;
  readonly text: string;
}

/** What the create page needs from the host and the illustration service. */
export interface CreationPort {
  plan_story(story: string, worldbooks: readonly string[]): Promise<readonly CreationScene[]>;
  /** Rejects when no chat is open. */
  strip_messages(): Promise<{
    readonly chat_id: string;
    readonly messages: readonly StripMessageView[];
  }>;
  plan_strip(from: number, to: number, max_panels: number): Promise<readonly CreationScene[]>;
  /** Draws one picture through the active provider profile and resolves with its gallery id. */
  generate(input: SlotGenerationInput): Promise<string>;
}

/** `null` without a chat host, which plans and draws through the illustration service. */
export const CREATION_KEY: InjectionKey<CreationPort | null> = Symbol("tavern-canvas-creation");
