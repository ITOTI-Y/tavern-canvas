import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";

import type { GalleryCapability } from "../contracts/ui_capabilities.js";
import { use_image_urls, type ImageUrlLoader } from "./use_image_urls.js";

afterEach(() => {
  vi.restoreAllMocks();
});

function mount_loader(max_cached: number) {
  const read_bytes = vi.fn(() => Promise.resolve(new Uint8Array([1])));
  let loader: ImageUrlLoader | null = null;
  const wrapper = mount(
    defineComponent({
      setup() {
        loader = use_image_urls({ read_bytes } as unknown as GalleryCapability, max_cached);
        return () => null;
      },
    }),
  );
  if (loader === null) {
    throw new Error("loader was not created");
  }
  return { wrapper, read_bytes, load: loader as ImageUrlLoader };
}

describe("use_image_urls", () => {
  it("keeps the most recently used URLs and revokes the oldest beyond the limit", async () => {
    let sequence = 0;
    vi.spyOn(URL, "createObjectURL").mockImplementation(() => `blob:${String((sequence += 1))}`);
    const revoked = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    const { load, read_bytes } = mount_loader(2);

    await load("a");
    await load("b");
    await load("a");
    await load("c");
    await Promise.resolve();

    expect(revoked).toHaveBeenCalledWith("blob:2");
    await load("a");
    expect(read_bytes).toHaveBeenCalledTimes(3);
  });

  it("revokes every cached URL on unmount", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:x");
    const revoked = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    const { load, wrapper } = mount_loader(4);
    await load("a");

    wrapper.unmount();
    await Promise.resolve();

    expect(revoked).toHaveBeenCalledWith("blob:x");
  });
});
