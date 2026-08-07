import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import FloatingEntry from "../../ui/experience/FloatingEntry.vue";
import {
  center_position,
  clamp_position,
  DRAG_CLICK_THRESHOLD_PX,
  FLOATING_ENTRY_DIAMETER_PX,
  FloatingEntryController,
  InMemoryFloatingEntryPositionStore,
  validate_custom_icon,
  type ViewportSize,
} from "./floating_entry.js";
import {
  MediaStatePlayer,
  resolve_media_for_state,
  validate_media_asset,
} from "./media_state_player.js";

const VIEWPORT: ViewportSize = { width: 1200, height: 800 };

describe("floating_entry: position math", () => {
  it("clamps a position so the full entry stays inside the viewport", () => {
    expect(clamp_position({ x: -100, y: -100 }, VIEWPORT)).toEqual({ x: 8, y: 8 });
    const clamped = clamp_position({ x: 10_000, y: 10_000 }, VIEWPORT);
    expect(clamped.x).toBeLessThanOrEqual(VIEWPORT.width - FLOATING_ENTRY_DIAMETER_PX);
    expect(clamped.y).toBeLessThanOrEqual(VIEWPORT.height - FLOATING_ENTRY_DIAMETER_PX);
  });

  it("centers within the viewport", () => {
    const centered = center_position(VIEWPORT);
    expect(centered.x).toBeCloseTo((VIEWPORT.width - FLOATING_ENTRY_DIAMETER_PX) / 2, 0);
    expect(centered.y).toBeCloseTo((VIEWPORT.height - FLOATING_ENTRY_DIAMETER_PX) / 2, 0);
  });
});

describe("floating_entry: position persists separately for desktop/mobile", () => {
  it("stores and retrieves independently per viewport bucket", () => {
    const store = new InMemoryFloatingEntryPositionStore();
    expect(store.get("desktop")).toBeNull();
    expect(store.get("mobile")).toBeNull();

    store.set("desktop", { x: 900, y: 100 });
    store.set("mobile", { x: 20, y: 400 });

    expect(store.get("desktop")).toEqual({ x: 900, y: 100 });
    expect(store.get("mobile")).toEqual({ x: 20, y: 400 });
  });
});

describe("floating_entry: FloatingEntryController drag/click distinction and viewport clamping", () => {
  function build_controller(bucket: "desktop" | "mobile" = "desktop") {
    const store = new InMemoryFloatingEntryPositionStore();
    const controller = new FloatingEntryController({
      position_store: store,
      get_viewport: () => VIEWPORT,
      get_viewport_bucket: () => bucket,
    });
    return { store, controller };
  }

  it("centers on first use when nothing is stored yet", () => {
    const { controller } = build_controller();
    expect(controller.position).toEqual(center_position(VIEWPORT));
  });

  it("a press-release with no meaningful movement is reported as a click, not a drag", () => {
    const { controller } = build_controller();
    const start = controller.position;
    controller.begin_drag();
    controller.drag_to({ x: start.x + 1, y: start.y });
    const result = controller.end_drag();
    expect(result.moved).toBe(false);
  });

  it("a press-release past the click threshold is reported as a drag and persists position", () => {
    const { controller, store } = build_controller("desktop");
    controller.begin_drag();
    controller.drag_to({ x: 40, y: 60 });
    const result = controller.end_drag();
    expect(result.moved).toBe(true);
    expect(store.get("desktop")).toEqual(controller.position);
    expect(DRAG_CLICK_THRESHOLD_PX).toBeGreaterThan(0);
  });

  it("clamps the dragged position to the viewport even when the pointer leaves it", () => {
    const { controller } = build_controller();
    controller.begin_drag();
    controller.drag_to({ x: -500, y: 100_000 });
    expect(controller.position.x).toBeGreaterThanOrEqual(0);
    expect(controller.position.y).toBeLessThanOrEqual(VIEWPORT.height);
  });

  it("reset_position recenters and persists the reset", () => {
    const { controller, store } = build_controller("mobile");
    controller.begin_drag();
    controller.drag_to({ x: 5, y: 5 });
    controller.end_drag();
    controller.reset_position();
    expect(controller.position).toEqual(center_position(VIEWPORT));
    expect(store.get("mobile")).toEqual(center_position(VIEWPORT));
  });

  it("reflow re-reads the position for whichever bucket is current", () => {
    const store = new InMemoryFloatingEntryPositionStore();
    store.set("desktop", { x: 900, y: 50 });
    store.set("mobile", { x: 10, y: 500 });
    let bucket: "desktop" | "mobile" = "desktop";
    const controller = new FloatingEntryController({
      position_store: store,
      get_viewport: () => VIEWPORT,
      get_viewport_bucket: () => bucket,
    });
    expect(controller.position).toEqual({ x: 900, y: 50 });

    bucket = "mobile";
    controller.reflow();
    expect(controller.position).toEqual({ x: 10, y: 500 });
  });
});

describe("floating_entry: user-provided icon validation", () => {
  it("accepts a local image asset", () => {
    expect(validate_custom_icon({ kind: "image", url: "blob:tavern-canvas/abc" })).toEqual({
      kind: "image",
      url: "blob:tavern-canvas/abc",
    });
  });

  it("rejects a video asset -- the static icon is image-only", () => {
    expect(validate_custom_icon({ kind: "video", url: "blob:tavern-canvas/abc" })).toBeNull();
  });

  it("rejects a remote URL without blocking (returns null, does not throw)", () => {
    expect(validate_custom_icon({ kind: "image", url: "https://evil.example/x.png" })).toBeNull();
  });

  it("rejects missing/corrupt input", () => {
    expect(validate_custom_icon(undefined)).toBeNull();
    expect(validate_custom_icon({ kind: "image" })).toBeNull();
    expect(validate_custom_icon("not-an-object")).toBeNull();
  });
});

describe("floating_entry: media state resolution (idle/thinking/talk/enter/dragging)", () => {
  it("resolves a valid asset for a configured state", () => {
    const asset = { kind: "video" as const, url: "blob:tavern-canvas/thinking" };
    expect(resolve_media_for_state({ thinking: asset }, "thinking")).toEqual({
      state: "thinking",
      asset,
    });
  });

  it("falls back to a null asset (Lucide icon) when a state has no configured media", () => {
    expect(resolve_media_for_state({}, "talk")).toEqual({ state: "talk", asset: null });
  });

  it("falls back to a null asset for corrupt media without throwing", () => {
    const corrupt = { kind: "video" as const, url: "https://not-local.example/video.mp4" };
    expect(validate_media_asset(corrupt)).toBeNull();
    expect(resolve_media_for_state({ enter: corrupt }, "enter")).toEqual({
      state: "enter",
      asset: null,
    });
  });

  it("MediaStatePlayer tracks the current state across transitions", () => {
    const player = new MediaStatePlayer({
      dragging: { kind: "image", url: "blob:tavern-canvas/dragging" },
    });
    expect(player.state).toBe("idle");
    const resolution = player.transition("dragging");
    expect(resolution.asset?.url).toBe("blob:tavern-canvas/dragging");
    expect(player.state).toBe("dragging");
  });
});

describe("FloatingEntry.vue: settings-gated rendering", () => {
  it("renders nothing when disabled", () => {
    const wrapper = mount(FloatingEntry, { props: { enabled: false } });
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("renders an accessible button when enabled", () => {
    const wrapper = mount(FloatingEntry, {
      props: { enabled: true, openLabel: "Open studio" },
    });
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.attributes("aria-label")).toBe("Open studio");
  });
});

describe("FloatingEntry.vue: activation opens the studio", () => {
  it("emits open on click", async () => {
    const wrapper = mount(FloatingEntry, { props: { enabled: true } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("open")).toHaveLength(1);
  });

  it("emits open on Enter and Space (keyboard activation)", async () => {
    const wrapper = mount(FloatingEntry, { props: { enabled: true } });
    const button = wrapper.find("button");
    await button.trigger("keydown", { key: "Enter" });
    await button.trigger("keydown", { key: " " });
    expect(wrapper.emitted("open")).toHaveLength(2);
  });

  it("ignores unrelated keys", async () => {
    const wrapper = mount(FloatingEntry, { props: { enabled: true } });
    await wrapper.find("button").trigger("keydown", { key: "Tab" });
    expect(wrapper.emitted("open")).toBeUndefined();
  });
});

describe("FloatingEntry.vue: pointer drag with viewport clamping", () => {
  it("repositions the button and suppresses the trailing click once dragged past the threshold", async () => {
    const wrapper = mount(FloatingEntry, {
      props: { enabled: true, viewportOverride: "desktop" },
      attachTo: document.body,
    });
    const element = wrapper.find("button").element;
    const initial_left = Number.parseFloat(element.style.left);

    element.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 1,
        isPrimary: true,
        clientX: 100,
        clientY: 100,
      }),
    );
    element.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        pointerId: 1,
        isPrimary: true,
        clientX: 160,
        clientY: 100,
      }),
    );
    element.dispatchEvent(
      new PointerEvent("pointerup", { bubbles: true, pointerId: 1, isPrimary: true }),
    );
    await wrapper.vm.$nextTick();

    expect(Number.parseFloat(element.style.left)).toBeCloseTo(initial_left + 60, 0);

    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("open")).toBeUndefined();

    wrapper.unmount();
  });

  it("a plain click (no movement) still opens the studio", async () => {
    const wrapper = mount(FloatingEntry, {
      props: { enabled: true, viewportOverride: "desktop" },
      attachTo: document.body,
    });
    const element = wrapper.find("button").element;

    element.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 2,
        isPrimary: true,
        clientX: 50,
        clientY: 50,
      }),
    );
    element.dispatchEvent(
      new PointerEvent("pointerup", { bubbles: true, pointerId: 2, isPrimary: true }),
    );
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("open")).toHaveLength(1);
    wrapper.unmount();
  });

  it("clamps a drag that would move the entry outside the viewport", async () => {
    const wrapper = mount(FloatingEntry, {
      props: { enabled: true, viewportOverride: "desktop" },
      attachTo: document.body,
    });
    const element = wrapper.find("button").element;

    element.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 3,
        isPrimary: true,
        clientX: 0,
        clientY: 0,
      }),
    );
    element.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        pointerId: 3,
        isPrimary: true,
        clientX: -100_000,
        clientY: -100_000,
      }),
    );
    await wrapper.vm.$nextTick();

    expect(Number.parseFloat(element.style.left)).toBeGreaterThanOrEqual(0);
    expect(Number.parseFloat(element.style.top)).toBeGreaterThanOrEqual(0);

    element.dispatchEvent(
      new PointerEvent("pointerup", { bubbles: true, pointerId: 3, isPrimary: true }),
    );
    wrapper.unmount();
  });

  it("persists desktop and mobile drag positions independently", async () => {
    const store = new InMemoryFloatingEntryPositionStore();
    const wrapper = mount(FloatingEntry, {
      props: { enabled: true, viewportOverride: "desktop", positionStore: store },
      attachTo: document.body,
    });
    const element = wrapper.find("button").element;
    element.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 4,
        isPrimary: true,
        clientX: 0,
        clientY: 0,
      }),
    );
    element.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        pointerId: 4,
        isPrimary: true,
        clientX: 200,
        clientY: 40,
      }),
    );
    element.dispatchEvent(
      new PointerEvent("pointerup", { bubbles: true, pointerId: 4, isPrimary: true }),
    );
    await wrapper.vm.$nextTick();

    expect(store.get("desktop")).not.toBeNull();
    expect(store.get("mobile")).toBeNull();
    wrapper.unmount();
  });
});

describe("FloatingEntry.vue: media states and icon fallback", () => {
  it("renders the Lucide fallback icon when idle has no configured media", () => {
    const wrapper = mount(FloatingEntry, { props: { enabled: true } });
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.find("video").exists()).toBe(false);
    expect(wrapper.find("svg").exists()).toBe(true);
  });

  it("renders a user-provided idle icon as an image", () => {
    const wrapper = mount(FloatingEntry, {
      props: {
        enabled: true,
        mediaAssets: { idle: { kind: "image", url: "blob:tavern-canvas/icon" } },
      },
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("blob:tavern-canvas/icon");
  });

  it("renders a video for a non-idle reaction state", () => {
    const wrapper = mount(FloatingEntry, {
      props: {
        enabled: true,
        mediaState: "thinking",
        mediaAssets: { thinking: { kind: "video", url: "blob:tavern-canvas/thinking" } },
      },
    });
    const video = wrapper.find("video");
    expect(video.exists()).toBe(true);
    expect(video.attributes("src")).toBe("blob:tavern-canvas/thinking");
  });

  it("falls back to the Lucide icon for missing/corrupt media without blocking rendering", () => {
    const wrapper = mount(FloatingEntry, {
      props: {
        enabled: true,
        mediaState: "talk",
        mediaAssets: { talk: { kind: "video", url: "https://not-local.example/x.mp4" } },
      },
    });
    expect(wrapper.find("video").exists()).toBe(false);
    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("shows the dragging state's media while a drag is in progress", async () => {
    const wrapper = mount(FloatingEntry, {
      props: {
        enabled: true,
        viewportOverride: "desktop",
        mediaAssets: { dragging: { kind: "image", url: "blob:tavern-canvas/dragging" } },
      },
      attachTo: document.body,
    });
    const element = wrapper.find("button").element;
    element.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 5,
        isPrimary: true,
        clientX: 0,
        clientY: 0,
      }),
    );
    await wrapper.vm.$nextTick();

    expect(element.getAttribute("data-media-state")).toBe("dragging");
    expect(wrapper.find("img").attributes("src")).toBe("blob:tavern-canvas/dragging");

    element.dispatchEvent(
      new PointerEvent("pointerup", { bubbles: true, pointerId: 5, isPrimary: true }),
    );
    wrapper.unmount();
  });
});
