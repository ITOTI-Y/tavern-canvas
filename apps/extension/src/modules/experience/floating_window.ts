export interface FloatingWindowPosition {
  readonly x: number;
  readonly y: number;
}

export interface FloatingWindowSize {
  readonly width: number;
  readonly height: number;
}

export interface FloatingWindowViewport {
  readonly width: number;
  readonly height: number;
}

export const FLOATING_WINDOW_MARGIN_PX = 20;
export const FLOATING_WINDOW_DEFAULT_TOP_PX = 64;

export function clamp_floating_window_position(
  position: FloatingWindowPosition,
  viewport: FloatingWindowViewport,
  window_size: FloatingWindowSize,
): FloatingWindowPosition {
  const max_x = Math.max(
    FLOATING_WINDOW_MARGIN_PX,
    viewport.width - window_size.width - FLOATING_WINDOW_MARGIN_PX,
  );
  const max_y = Math.max(
    FLOATING_WINDOW_MARGIN_PX,
    viewport.height - window_size.height - FLOATING_WINDOW_MARGIN_PX,
  );
  return {
    x: Math.min(Math.max(position.x, FLOATING_WINDOW_MARGIN_PX), max_x),
    y: Math.min(Math.max(position.y, FLOATING_WINDOW_MARGIN_PX), max_y),
  };
}

export function default_floating_window_position(
  viewport: FloatingWindowViewport,
  window_size: FloatingWindowSize,
): FloatingWindowPosition {
  return clamp_floating_window_position(
    {
      x: viewport.width - window_size.width - FLOATING_WINDOW_MARGIN_PX,
      y: FLOATING_WINDOW_DEFAULT_TOP_PX,
    },
    viewport,
    window_size,
  );
}
