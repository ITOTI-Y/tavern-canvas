import { Activity, Images, LayoutDashboard, Library, Settings, Type } from "lucide-vue-next";
import type { Component } from "vue";

import type { StudioRoute } from "../contracts/view_models.js";

/**
 * The one standardized stroke width for every Lucide icon in the Studio (taste directive 11):
 * no component picks its own weight.
 */
export const ICON_STROKE_WIDTH = 1.75;

export interface RouteNavItem {
  readonly route: StudioRoute;
  readonly icon: Component;
  /** Locale key under the `nav` domain (apps/extension/src/i18n/locales/en.ts). */
  readonly label_key: string;
}

/** All six routes, in the order the desktop rail exposes them directly. */
export const STUDIO_ROUTES: readonly RouteNavItem[] = [
  { route: "workbench", icon: LayoutDashboard, label_key: "nav.workbench" },
  { route: "prompt", icon: Type, label_key: "nav.prompt" },
  { route: "assets", icon: Library, label_key: "nav.assets" },
  { route: "gallery", icon: Images, label_key: "nav.gallery" },
  { route: "diagnostics", icon: Activity, label_key: "nav.diagnostics" },
  { route: "settings", icon: Settings, label_key: "nav.settings" },
];

/** The four routes the mobile bottom nav exposes directly (task-2-brief.md's five stable items,
 * the fifth being the "More" trigger itself, not a route). */
export const MOBILE_PRIMARY_ROUTES: readonly StudioRoute[] = [
  "workbench",
  "prompt",
  "assets",
  "gallery",
];

/** The two routes the mobile "More" menu opens. */
export const MOBILE_MORE_ROUTES: readonly StudioRoute[] = ["diagnostics", "settings"];

export function find_route_nav_item(route: StudioRoute): RouteNavItem {
  const item = STUDIO_ROUTES.find((candidate) => candidate.route === route);
  if (item === undefined) {
    throw new Error(`No nav item registered for route "${route}"`);
  }
  return item;
}

export type Translate = (key: string) => string;

/**
 * Every branch below passes a literal string into the translate function (a `switch` on the
 * closed `StudioRoute` union, never a data-driven lookup): tools/locale_check's dynamic-key rule
 * flags any translate call whose argument isn't a literal, so route labels are resolved through
 * this one exhaustive function instead of indexing `RouteNavItem.label_key` at the call site.
 */
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
