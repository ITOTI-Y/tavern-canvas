import type { Page } from "@playwright/test";

/**
 * Shared navigation/state helpers for every studio_*.spec.ts file (Stage 06 Task 8). Kept in one
 * place so a change to the harness's URL contract (tests/harness/src/studio_host.ts) or the Shadow
 * Root's DOM shape (create_shadow_root.ts) only needs updating here.
 */

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

/** The four required viewport dimensions (task-8-brief.md Step 3), desktop-large through
 * mobile-small -- desktop uses the icon rail, the two mobile sizes use the bottom nav
 * (use_shell_viewport.ts's breakpoint sits below 1024px). Named constants (not positional array
 * indices) so a call site reads as "the wide desktop viewport", not "VIEWPORTS[0]" -- and so
 * `noUncheckedIndexedAccess` never turns a typo'd index into a silent `undefined`. */
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

/** The two routes the mobile bottom nav tucks behind "More" (route_nav.ts's MOBILE_MORE_ROUTES). */
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

/** Navigates to the harness with the given scenario/locale, sets color scheme and (optionally)
 * reduced motion through Playwright's own emulation (never a harness query param -- AppRoot.vue
 * reads `prefers-color-scheme` exactly like production, so driving it from the outside is the
 * only way to exercise the real code path), and waits for studio_host.ts's own readiness signal
 * (mount complete + fonts settled) before handing control back. */
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

/** Resolves once every real bitmap `<img>` inside the given root has finished decoding (or
 * failed) -- `naturalWidth`/`naturalHeight` are 0 until then, which would make the blank-image
 * check (studio_overflow.spec.ts) misreport a still-loading image as blank. */
export async function wait_for_images_settled(page: Page, root_selector = "img"): Promise<void> {
  await page.waitForFunction((selector) => {
    const host = document.getElementById("tavern-canvas-root");
    const images = host?.shadowRoot?.querySelectorAll<HTMLImageElement>(selector) ?? [];
    return [...images].every((img) => img.complete);
  }, root_selector);
}

/** True on the current viewport's rendered layout (the desktop rail vs. mobile bottom nav are two
 * different DOM subtrees, per StudioShell.vue's `use_shell_viewport`, not a CSS-only breakpoint). */
export async function is_mobile_layout(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const host = document.getElementById("tavern-canvas-root");
    return host?.shadowRoot?.querySelector('[data-viewport="mobile"]') !== null;
  });
}

/** Navigates through the real desktop rail or mobile bottom nav / "More" menu -- never a
 * harness-only shortcut -- so every route switch exercises the actual production navigation
 * component (DesktopIconRail.vue / MobileBottomNav.vue) the same way a user would. */
export async function navigate_to_route(
  page: Page,
  route: StudioRoute,
  locale: StudioLocale,
): Promise<void> {
  const label = route_label(route, locale);
  const mobile = await is_mobile_layout(page);
  // create_shadow_root.ts always opens with `{ mode: "open" }`, and Playwright's locator engine
  // natively pierces an open Shadow Root for standard CSS selectors -- no special traversal
  // needed, `page.locator()` reaches straight into it.
  if (mobile && MOBILE_MORE_ROUTES.has(route)) {
    await page.locator('[data-testid="mobile-more-trigger"]').click();
    await page.locator(`[role="menuitem"]:has-text("${label}")`).click();
  } else if (mobile) {
    // MobileBottomNav.vue's four primary-route buttons carry no `aria-label` (their accessible
    // name comes from the visible label span, per StudioShell.test.ts's own "includes('Prompt')"
    // precedent) -- unlike the desktop rail's icon-only buttons, which need `aria-label` because
    // they have no visible text at all.
    await page.locator("nav > button", { hasText: label }).click();
  } else {
    await page.locator(`nav > button[aria-label="${label}"]`).click();
  }
  await page.locator('[data-testid="workspace"]').waitFor({ state: "visible" });
}
