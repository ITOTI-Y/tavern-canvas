import { computed, onScopeDispose, ref, type ComputedRef } from "vue";

export type ShellViewport = "desktop" | "mobile";

export const DESKTOP_BREAKPOINT_PX = 960;

const DESKTOP_MEDIA_QUERY = `(min-width: ${String(DESKTOP_BREAKPOINT_PX)}px)`;

function read_is_desktop(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

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
