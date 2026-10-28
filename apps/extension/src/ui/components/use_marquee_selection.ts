import { computed, onBeforeUnmount, ref, type ComputedRef, type Ref } from "vue";

/** Pointer travel before a press turns into a selection box, so clicks stay clicks. */
const DRAG_THRESHOLD_PX = 6;
/** Elements a box can select carry their id in this attribute. */
export const SELECT_ID_ATTRIBUTE = "data-select-id";

export interface MarqueeOptions {
  /** `true` lets a box start on an item too; otherwise only on empty space between items. */
  readonly start_on_items: boolean;
  /** `add` keeps the current selection (Ctrl, Shift or Cmd held), `replace` starts over. */
  readonly on_select: (ids: readonly string[], mode: "add" | "replace") => void;
}

export interface MarqueeBox {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

interface Point {
  readonly x: number;
  readonly y: number;
}

function intersects(a: DOMRect, left: number, top: number, right: number, bottom: number): boolean {
  return a.left < right && a.right > left && a.top < bottom && a.bottom > top;
}

/**
 * Box selection inside `container` with a mouse or pen; touch keeps scrolling. The box is
 * reported in the container's own coordinates for drawing.
 */
export function use_marquee_selection(
  container: Ref<HTMLElement | null>,
  options: MarqueeOptions,
): {
  readonly box: ComputedRef<MarqueeBox | null>;
  readonly on_pointerdown: (event: PointerEvent) => void;
} {
  const origin = ref<Point | null>(null);
  const current = ref<Point | null>(null);
  const dragging = ref(false);
  let additive = false;

  const box = computed<MarqueeBox | null>(() => {
    const element = container.value;
    if (!dragging.value || origin.value === null || current.value === null || element === null) {
      return null;
    }
    const frame = element.getBoundingClientRect();
    const left = Math.min(origin.value.x, current.value.x);
    const top = Math.min(origin.value.y, current.value.y);
    return {
      left: left - frame.left,
      top: top - frame.top,
      width: Math.abs(current.value.x - origin.value.x),
      height: Math.abs(current.value.y - origin.value.y),
    };
  });

  function selected_ids(): string[] {
    const element = container.value;
    if (element === null || origin.value === null || current.value === null) {
      return [];
    }
    const left = Math.min(origin.value.x, current.value.x);
    const right = Math.max(origin.value.x, current.value.x);
    const top = Math.min(origin.value.y, current.value.y);
    const bottom = Math.max(origin.value.y, current.value.y);
    return [...element.querySelectorAll<HTMLElement>(`[${SELECT_ID_ATTRIBUTE}]`)]
      .filter((item) => intersects(item.getBoundingClientRect(), left, top, right, bottom))
      .map((item) => item.getAttribute(SELECT_ID_ATTRIBUTE) ?? "")
      .filter((id) => id !== "");
  }

  /** The click that ends a box drag would otherwise open whatever it was released over. */
  function swallow_next_click(): void {
    const swallow = (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();
    };
    window.addEventListener("click", swallow, { capture: true, once: true });
    setTimeout(() => {
      window.removeEventListener("click", swallow, { capture: true });
    }, 0);
  }

  function on_move(event: PointerEvent): void {
    if (origin.value === null) {
      return;
    }
    current.value = { x: event.clientX, y: event.clientY };
    if (
      !dragging.value &&
      Math.hypot(event.clientX - origin.value.x, event.clientY - origin.value.y) >=
        DRAG_THRESHOLD_PX
    ) {
      dragging.value = true;
    }
    if (dragging.value) {
      event.preventDefault();
    }
  }

  function stop(): void {
    window.removeEventListener("pointermove", on_move);
    window.removeEventListener("pointerup", on_up);
    window.removeEventListener("pointercancel", stop);
    origin.value = null;
    current.value = null;
    dragging.value = false;
  }

  function on_up(): void {
    if (dragging.value) {
      options.on_select(selected_ids(), additive ? "add" : "replace");
      swallow_next_click();
    }
    stop();
  }

  function on_pointerdown(event: PointerEvent): void {
    if (event.button !== 0 || event.pointerType === "touch") {
      return;
    }
    const target = event.target as Element | null;
    const blocked = options.start_on_items
      ? "input, textarea, select, [role='checkbox'], [aria-pressed]"
      : `input, textarea, select, button, a, [role='checkbox'], [${SELECT_ID_ATTRIBUTE}]`;
    if (target?.closest(blocked) != null) {
      return;
    }
    additive = event.ctrlKey || event.metaKey || event.shiftKey;
    origin.value = { x: event.clientX, y: event.clientY };
    current.value = origin.value;
    window.addEventListener("pointermove", on_move);
    window.addEventListener("pointerup", on_up);
    window.addEventListener("pointercancel", stop);
  }

  onBeforeUnmount(stop);
  return { box, on_pointerdown };
}
