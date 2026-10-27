import type { InjectionKey, Ref } from "vue";

import type { OutfitTags } from "../../modules/wardrobe/outfit_from_image.js";

/** Reka portals must render into the Shadow Root's portal element, never `document.body`. */
export const PORTAL_TARGET_KEY: InjectionKey<HTMLElement> = Symbol("tavern-canvas-portal-target");

/** The active chat's id, so library views can show the entries bound to it; `null` without a host. */
export const ACTIVE_CHAT_ID_KEY: InjectionKey<Readonly<Ref<string | null>>> = Symbol(
  "tavern-canvas-active-chat-id",
);

/** Generates a character's reference image and reads the outfit it shows. */
export interface ReferenceImagePort {
  /** Uses the active provider profile. */
  generate(prompt: {
    readonly positive_prompt: string;
    readonly negative_prompt: string;
  }): Promise<Blob>;
  /** Uses the wardrobe model, which must accept images; `image` is a data URL. */
  read_outfit(image: string): Promise<OutfitTags>;
}

/** `null` when no chat host is attached, since generation runs through the chat illustration service. */
export const REFERENCE_IMAGE_KEY: InjectionKey<ReferenceImagePort | null> = Symbol(
  "tavern-canvas-reference-image",
);
