import { computed, onScopeDispose, ref, type ComputedRef } from "vue";

export type ShellViewport = "desktop" | "mobile";

/**
 * Below this width the shell switches from the desktop rail/inspector-column layout to the
 * mobile bottom-nav/inspector-sheet layout. One documented constant (referenced by
 * shell.module.css's own media query) instead of an ad-hoc number duplicated in two places.
 */
export const DESKTOP_BREAKPOINT_PX = 960;

const DESKTOP_MEDIA_QUERY = `(min-width: ${String(DESKTOP_BREAKPOINT_PX)}px)`;

function read_is_desktop(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    // No viewport signal available (e.g. a non-browser test host): default to desktop, the
    // denser of the two layouts, rather than silently hiding the six-route rail.
    return true;
  }
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

/**
 * Tracks whether the shell should render its desktop or mobile layout. `override` lets
 * StudioShell.test.ts (and any future harness) force a specific viewport directly: happy-dom, this
 * repo's test environment, has no real layout engine, so `matchMedia`-driven detection alone is
 * not testable end to end.
 */
export function use_shell_viewport(override?: ShellViewport): ComputedRef<ShellViewport> {
  if (override !== undefined) {
    return computed(() => override);
  }

  const is_desktop = ref(read_is_desktop());

  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    const media_query_list = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const on_change = (event: MediaQueryListEvent): void => {
      is_desktop.value = event.matches;
    };
    media_query_list.addEventListener("change", on_change);
    onScopeDispose(() => {
      media_query_list.removeEventListener("change", on_change);
    });
  }

  return computed(() => (is_desktop.value ? "desktop" : "mobile"));
}
