import { describe, expect, it } from "vitest";

import {
  clamp_floating_window_position,
  default_floating_window_position,
  FLOATING_WINDOW_DEFAULT_TOP_PX,
  FLOATING_WINDOW_MARGIN_PX,
} from "./floating_window.js";

const VIEWPORT = { width: 1440, height: 1000 };
const WINDOW_SIZE = { width: 960, height: 720 };

describe("floating_window position math", () => {
  it("places a new window at the upper-right viewport edge", () => {
    expect(default_floating_window_position(VIEWPORT, WINDOW_SIZE)).toEqual({
      x: VIEWPORT.width - WINDOW_SIZE.width - FLOATING_WINDOW_MARGIN_PX,
      y: FLOATING_WINDOW_DEFAULT_TOP_PX,
    });
  });

  it("keeps every window edge inside the viewport margin", () => {
    expect(clamp_floating_window_position({ x: -100, y: -100 }, VIEWPORT, WINDOW_SIZE)).toEqual({
      x: FLOATING_WINDOW_MARGIN_PX,
      y: FLOATING_WINDOW_MARGIN_PX,
    });
    expect(clamp_floating_window_position({ x: 10_000, y: 10_000 }, VIEWPORT, WINDOW_SIZE)).toEqual(
      {
        x: VIEWPORT.width - WINDOW_SIZE.width - FLOATING_WINDOW_MARGIN_PX,
        y: VIEWPORT.height - WINDOW_SIZE.height - FLOATING_WINDOW_MARGIN_PX,
      },
    );
  });

  it("anchors an oversized window at the minimum margin", () => {
    expect(
      clamp_floating_window_position(
        { x: 200, y: 200 },
        { width: 800, height: 600 },
        { width: 900, height: 700 },
      ),
    ).toEqual({
      x: FLOATING_WINDOW_MARGIN_PX,
      y: FLOATING_WINDOW_MARGIN_PX,
    });
  });
});
