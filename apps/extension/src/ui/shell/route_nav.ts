import { Activity, Images, LayoutDashboard, Library, Settings, Type } from "lucide-vue-next";
import type { Component } from "vue";

import type { StudioRoute } from "../contracts/view_models.js";

export interface RouteNavItem {
  readonly route: StudioRoute;
  readonly icon: Component;
  readonly label_key: string;
}

export const STUDIO_ROUTES: readonly RouteNavItem[] = [
  { route: "workbench", icon: LayoutDashboard, label_key: "nav.workbench" },
  { route: "prompt", icon: Type, label_key: "nav.prompt" },
  { route: "assets", icon: Library, label_key: "nav.assets" },
  { route: "gallery", icon: Images, label_key: "nav.gallery" },
  { route: "diagnostics", icon: Activity, label_key: "nav.diagnostics" },
  { route: "settings", icon: Settings, label_key: "nav.settings" },
];

export const MOBILE_PRIMARY_ROUTES: readonly StudioRoute[] = [
  "workbench",
  "prompt",
  "assets",
  "gallery",
];

export const MOBILE_MORE_ROUTES: readonly StudioRoute[] = ["diagnostics", "settings"];

export function find_route_nav_item(route: StudioRoute): RouteNavItem {
  const item = STUDIO_ROUTES.find((candidate) => candidate.route === route);
  if (item === undefined) {
    throw new Error(`No nav item registered for route "${route}"`);
  }
  return item;
}

export type Translate = (key: string) => string;

/** One literal translate call per route; tools/locale_check forbids dynamic keys. */
export function route_label(t: Translate, route: StudioRoute): string {
  switch (route) {
    case "workbench":
      return t("nav.workbench");
    case "prompt":
      return t("nav.prompt");
    case "assets":
      return t("nav.assets");
    case "gallery":
      return t("nav.gallery");
    case "diagnostics":
      return t("nav.diagnostics");
    case "settings":
      return t("nav.settings");
  }
}
