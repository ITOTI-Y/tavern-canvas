import type { HostSwipeLocation } from "../../host/index.js";

export type QuickEditKind = "img2img" | "inpaint" | "upscale" | "augment";

export interface QuickEditRequest {
  readonly kind: QuickEditKind;
  readonly location: HostSwipeLocation;
  readonly slot_id: string;
  readonly image_id: string;
  readonly positive_prompt: string;
  readonly negative_prompt: string;
}
