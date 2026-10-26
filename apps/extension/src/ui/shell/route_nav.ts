import { Images, Settings } from "lucide-vue-next";
import type { Component } from "vue";

import type { StudioRoute } from "../contracts/view_models.js";

export interface RouteNavItem {
  readonly route: StudioRoute;
  readonly icon: Component;
}

export const STUDIO_ROUTES: readonly RouteNavItem[] = [
  { route: "settings", icon: Settings },
  { route: "gallery", icon: Images },
];

export type Translate = (key: string) => string;

/** One literal translate call per route; tools/locale_check forbids dynamic keys. */
export function route_label(t: Translate, route: StudioRoute): string {
  switch (route) {
    case "settings":
      return t("nav.settings");
    case "gallery":
      return t("nav.gallery");
  }
}
