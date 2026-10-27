import type { AppearanceSlot, OutfitSlot } from "@tavern-canvas/contracts";

type Translate = (key: string) => string;

export function appearance_slot_label(t: Translate, slot: AppearanceSlot): string {
  switch (slot) {
    case "age":
      return t("assets.characters.appearance.age");
    case "body":
      return t("assets.characters.appearance.body");
    case "skin":
      return t("assets.characters.appearance.skin");
    case "hair":
      return t("assets.characters.appearance.hair");
    case "eyes":
      return t("assets.characters.appearance.eyes");
    case "makeup":
      return t("assets.characters.appearance.makeup");
    case "expression":
      return t("assets.characters.appearance.expression");
    case "features":
      return t("assets.characters.appearance.features");
  }
}

export function outfit_slot_label(t: Translate, slot: OutfitSlot): string {
  switch (slot) {
    case "full_body":
      return t("assets.outfits.slots.full_body");
    case "outerwear":
      return t("assets.outfits.slots.outerwear");
    case "top":
      return t("assets.outfits.slots.top");
    case "bottom":
      return t("assets.outfits.slots.bottom");
    case "legwear":
      return t("assets.outfits.slots.legwear");
    case "footwear":
      return t("assets.outfits.slots.footwear");
    case "headwear":
      return t("assets.outfits.slots.headwear");
    case "accessories":
      return t("assets.outfits.slots.accessories");
  }
}
