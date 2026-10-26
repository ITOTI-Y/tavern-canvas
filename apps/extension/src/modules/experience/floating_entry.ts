import { validate_media_asset, type MediaAsset } from "./media_state_player.js";

export type ViewportBucket = "desktop" | "mobile";

export interface FloatingEntryPosition {
  readonly x: number;
  readonly y: number;
}

export interface ViewportSize {
  readonly width: number;
  readonly height: number;
}

export const FLOATING_ENTRY_DIAMETER_PX = 56;
const VIEWPORT_MARGIN_PX = 8;

export const DRAG_CLICK_THRESHOLD_PX = 4;

export function clamp_position(
  position: FloatingEntryPosition,
  viewport: ViewportSize,
): FloatingEntryPosition {
  const max_x = Math.max(
    VIEWPORT_MARGIN_PX,
    viewport.width - FLOATING_ENTRY_DIAMETER_PX - VIEWPORT_MARGIN_PX,
  );
  const max_y = Math.max(
    VIEWPORT_MARGIN_PX,
    viewport.height - FLOATING_ENTRY_DIAMETER_PX - VIEWPORT_MARGIN_PX,
  );
  return {
    x: Math.min(Math.max(position.x, VIEWPORT_MARGIN_PX), max_x),
    y: Math.min(Math.max(position.y, VIEWPORT_MARGIN_PX), max_y),
  };
}

export function center_position(viewport: ViewportSize): FloatingEntryPosition {
  return clamp_position(
    {
      x: (viewport.width - FLOATING_ENTRY_DIAMETER_PX) / 2,
      y: (viewport.height - FLOATING_ENTRY_DIAMETER_PX) / 2,
    },
    viewport,
  );
}

/** Position persists separately for desktop and mobile; the caller wires the concrete storage. */
export interface FloatingEntryPositionStore {
  get(bucket: ViewportBucket): FloatingEntryPosition | null;
  set(bucket: ViewportBucket, position: FloatingEntryPosition): void;
}

export class InMemoryFloatingEntryPositionStore implements FloatingEntryPositionStore {
  readonly #positions = new Map<ViewportBucket, FloatingEntryPosition>();

  get(bucket: ViewportBucket): FloatingEntryPosition | null {
    return this.#positions.get(bucket) ?? null;
  }

  set(bucket: ViewportBucket, position: FloatingEntryPosition): void {
    this.#positions.set(bucket, position);
  }
}

export function validate_custom_icon(candidate: unknown): MediaAsset | null {
  const asset = validate_media_asset(candidate);
  return asset !== null && asset.kind === "image" ? asset : null;
}

export interface FloatingEntryControllerOptions {
  readonly position_store: FloatingEntryPositionStore;
  readonly get_viewport: () => ViewportSize;
  readonly get_viewport_bucket: () => ViewportBucket;
}

export class FloatingEntryController {
  readonly #options: FloatingEntryControllerOptions;
  #position: FloatingEntryPosition;
  #dragging = false;
  #drag_start: FloatingEntryPosition | null = null;

  constructor(options: FloatingEntryControllerOptions) {
    this.#options = options;
    this.#position = this.#read_or_center();
  }

  get position(): FloatingEntryPosition {
    return this.#position;
  }

  get dragging(): boolean {
    return this.#dragging;
  }

  begin_drag(): void {
    this.#dragging = true;
    this.#drag_start = this.#position;
  }

  drag_to(position: FloatingEntryPosition): void {
    if (!this.#dragging) {
      return;
    }
    this.#position = clamp_position(position, this.#options.get_viewport());
  }

  /** Returns whether the gesture exceeded the click threshold; position is persisted either way. */
  end_drag(): { readonly moved: boolean } {
    const was_dragging = this.#dragging;
    const start = this.#drag_start;
    this.#dragging = false;
    this.#drag_start = null;
    if (!was_dragging) {
      return { moved: false };
    }
    this.#options.position_store.set(this.#options.get_viewport_bucket(), this.#position);
    if (start === null) {
      return { moved: false };
    }
    const moved_x = Math.abs(this.#position.x - start.x);
    const moved_y = Math.abs(this.#position.y - start.y);
    return { moved: moved_x > DRAG_CLICK_THRESHOLD_PX || moved_y > DRAG_CLICK_THRESHOLD_PX };
  }

  reset_position(): void {
    this.#position = center_position(this.#options.get_viewport());
    this.#options.position_store.set(this.#options.get_viewport_bucket(), this.#position);
  }

  /** Call on resize or bucket change so a desktop position does not leak into a narrowed mobile viewport. */
  reflow(): void {
    this.#position = this.#read_or_center();
  }

  #read_or_center(): FloatingEntryPosition {
    const stored = this.#options.position_store.get(this.#options.get_viewport_bucket());
    const viewport = this.#options.get_viewport();
    return stored === null ? center_position(viewport) : clamp_position(stored, viewport);
  }
}
