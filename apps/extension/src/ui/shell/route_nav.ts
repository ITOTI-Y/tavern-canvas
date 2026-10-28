import { Images, Layers, Settings } from "lucide-vue-next";
import type { Component } from "vue";

import type { StudioRoute } from "../contracts/view_models.js";

export interface RouteNavItem {
  readonly route: StudioRoute;
  readonly icon: Component;
}

export const STUDIO_ROUTES: readonly RouteNavItem[] = [
  { route: "library", icon: Layers },
  { route: "gallery", icon: Images },
  { route: "settings", icon: Settings },
];

export type Translate = (key: string) => string;

/** One literal translate call per route; tools/locale_check forbids dynamic keys. */
export function route_label(t: Translate, route: StudioRoute): string {
  switch (route) {
    case "library":
      return t("nav.library");
    case "settings":
      return t("nav.settings");
    case "gallery":
      return t("nav.gallery");
  }
}
