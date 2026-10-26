import type { Page } from "@playwright/test";

export type ScenarioName = "full" | "empty" | "loading" | "partial" | "error";
export type StudioLocale = "en" | "zh-CN";
export type ColorMode = "light" | "dark";
export type StudioRoute =
  "workbench" | "prompt" | "assets" | "gallery" | "diagnostics" | "settings";

export interface Viewport {
  readonly name: string;
  readonly width: number;
  readonly height: number;
}

export const DESKTOP_LARGE: Viewport = { name: "desktop-1440x900", width: 1440, height: 900 };
export const DESKTOP_SMALL: Viewport = { name: "desktop-1024x768", width: 1024, height: 768 };
export const MOBILE_LARGE: Viewport = { name: "mobile-390x844", width: 390, height: 844 };
export const MOBILE_SMALL: Viewport = { name: "mobile-360x800", width: 360, height: 800 };

export const VIEWPORTS: readonly Viewport[] = [
  DESKTOP_LARGE,
  DESKTOP_SMALL,
  MOBILE_LARGE,
  MOBILE_SMALL,
];

export const LOCALES: readonly StudioLocale[] = ["en", "zh-CN"];
export const COLOR_MODES: readonly ColorMode[] = ["light", "dark"];
export const ROUTES: readonly StudioRoute[] = [
  "workbench",
  "prompt",
  "assets",
  "gallery",
  "diagnostics",
  "settings",
];

const ROUTE_LABELS: Readonly<Record<StudioLocale, Readonly<Record<StudioRoute, string>>>> = {
  en: {
    workbench: "Workbench",
    prompt: "Prompt",
    assets: "Assets",
    gallery: "Gallery",
    diagnostics: "Diagnostics",
    settings: "Settings",
  },
  "zh-CN": {
    workbench: "工作台",
    prompt: "提示词",
    assets: "资产",
    gallery: "图库",
    diagnostics: "诊断",
    settings: "设置",
  },
};

const MOBILE_MORE_ROUTES: ReadonlySet<StudioRoute> = new Set(["diagnostics", "settings"]);

export function route_label(route: StudioRoute, locale: StudioLocale): string {
  return ROUTE_LABELS[locale][route];
}

export interface GotoOptions {
  readonly scenario?: ScenarioName;
  readonly locale?: StudioLocale;
  readonly colorMode?: ColorMode;
  readonly reducedMotion?: boolean;
  readonly viewport?: Viewport;
}

export async function goto_studio(page: Page, options: GotoOptions = {}): Promise<void> {
  if (options.viewport) {
    await page.setViewportSize({ width: options.viewport.width, height: options.viewport.height });
  }
  await page.emulateMedia({
    colorScheme: options.colorMode ?? "light",
    reducedMotion: options.reducedMotion ? "reduce" : "no-preference",
  });
  const params = new URLSearchParams({
    scenario: options.scenario ?? "full",
    locale: options.locale ?? "en",
  });
  await page.goto(`/studio_host.html?${params.toString()}`);
  await page.waitForFunction(
    () => document.documentElement.dataset.studioHarnessReady === "true",
    undefined,
    { timeout: 15_000 },
  );
}

export async function wait_for_images_settled(page: Page, root_selector = "img"): Promise<void> {
  await page.waitForFunction((selector) => {
    const host = document.getElementById("tavern-canvas-root");
    const images = host?.shadowRoot?.querySelectorAll<HTMLImageElement>(selector) ?? [];
    return [...images].every((img) => img.complete);
  }, root_selector);
}

export async function is_mobile_layout(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const host = document.getElementById("tavern-canvas-root");
    return host?.shadowRoot?.querySelector('[data-viewport="mobile"]') !== null;
  });
}

export async function navigate_to_route(
  page: Page,
  route: StudioRoute,
  locale: StudioLocale,
): Promise<void> {
  const label = route_label(route, locale);
  const mobile = await is_mobile_layout(page);
  if (mobile && MOBILE_MORE_ROUTES.has(route)) {
    await page.locator('[data-testid="mobile-more-trigger"]').click();
    await page.locator(`[role="menuitem"]:has-text("${label}")`).click();
  } else if (mobile) {
    await page.locator("nav > button", { hasText: label }).click();
  } else {
    await page.locator(`nav > button[aria-label="${label}"]`).click();
  }
  await page.locator('[data-testid="workspace"]').waitFor({ state: "visible" });
}
