import type { ProviderTransport, ProviderTransportResponse } from "@tavern-canvas/providers";
import { describe, expect, it, vi } from "vitest";

import {
  cache_legacy_reference_image,
  clear_preset_image_slot,
  create_preset_image_slots,
  IP_ADAPTER_WEIGHT_MAX,
  NOVELAI_CHAR_REF_CACHE_KEY,
  NOVELAI_VIBE_CACHE_KEY,
  ReferenceUploadError,
  remove_cached_reference_image,
  set_preset_image_slot,
  upload_comfyui_reference_image,
  validate_ip_adapter_weights,
  type ReferenceCache,
  type ReferenceCacheEntry,
} from "./reference_upload.js";

const PNG_BYTES = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 1, 2, 3]);
const MP4_BYTES = Uint8Array.from([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 1, 2, 3]);

function fake_cache(): ReferenceCache & { store: Map<string, ReferenceCacheEntry> } {
  const store = new Map<string, ReferenceCacheEntry>();
  return {
    store,
    get: async (key) => store.get(key) ?? null,
    set: async (key, value) => {
      store.set(key, value);
    },
    remove: async (key) => {
      store.delete(key);
    },
  };
}

function transport_response(body: unknown): ProviderTransportResponse {
  return { status: 200, headers: {}, body: new TextEncoder().encode(JSON.stringify(body)) };
}

describe("upload_comfyui_reference_image", () => {
  it("multipart-uploads to /upload/image and caches the server filename", async () => {
    const transport: ProviderTransport = {
      execute: vi.fn(async () => transport_response({ name: "ref_001.png" })),
    };
    const cache = fake_cache();

    const result = await upload_comfyui_reference_image(
      transport,
      cache,
      "slot-1",
      { bytes: PNG_BYTES, claimed_media_type: "image/png", file_name: "ref.png" },
      new AbortController().signal,
    );

    expect(result.server_file_name).toBe("ref_001.png");
    expect(transport.execute).toHaveBeenCalledWith(
      expect.objectContaining({ route: "/upload/image", method: "POST" }),
    );
    const cached = await cache.get("slot-1");
    expect(cached?.server_file_name).toBe("ref_001.png");
    expect(cached?.bytes).toBe(PNG_BYTES);
  });

  it("rejects video bytes before ever calling the transport", async () => {
    const transport: ProviderTransport = { execute: vi.fn() };
    const cache = fake_cache();

    await expect(
      upload_comfyui_reference_image(
        transport,
        cache,
        "slot-1",
        { bytes: MP4_BYTES, claimed_media_type: "video/mp4", file_name: "ref.mp4" },
        new AbortController().signal,
      ),
    ).rejects.toThrow(ReferenceUploadError);
    expect(transport.execute).not.toHaveBeenCalled();
  });

  it("rejects bytes that don't match any known image signature", async () => {
    const transport: ProviderTransport = { execute: vi.fn() };
    const cache = fake_cache();

    await expect(
      upload_comfyui_reference_image(
        transport,
        cache,
        "slot-1",
        {
          bytes: Uint8Array.from([1, 2, 3]),
          claimed_media_type: "image/png",
          file_name: "ref.png",
        },
        new AbortController().signal,
      ),
    ).rejects.toThrow(ReferenceUploadError);
  });

  it("throws upload_failed when the server response has no name field", async () => {
    const transport: ProviderTransport = {
      execute: vi.fn(async () => transport_response({ ok: true })),
    };
    const cache = fake_cache();

    await expect(
      upload_comfyui_reference_image(
        transport,
        cache,
        "slot-1",
        { bytes: PNG_BYTES, claimed_media_type: "image/png", file_name: "ref.png" },
        new AbortController().signal,
      ),
    ).rejects.toThrow(ReferenceUploadError);
  });
});

describe("IP-Adapter weight validation", () => {
  it("accepts weights within [0, 2]", () => {
    expect(() =>
      validate_ip_adapter_weights({ general: 0.8, detail: 0.8, face_id: 1.1, style: 0.8 }),
    ).not.toThrow();
  });

  it("rejects out-of-range weights", () => {
    expect(() =>
      validate_ip_adapter_weights({
        general: -0.1,
        detail: 0.8,
        face_id: 1.1,
        style: 0.8,
      }),
    ).toThrow(ReferenceUploadError);
    expect(() =>
      validate_ip_adapter_weights({
        general: 0.8,
        detail: IP_ADAPTER_WEIGHT_MAX + 0.1,
        face_id: 1.1,
        style: 0.8,
      }),
    ).toThrow(ReferenceUploadError);
  });
});

describe("legacy NovelAI vibe/char-ref single-slot cache", () => {
  it("caches and removes a vibe transfer reference image", async () => {
    const cache = fake_cache();
    await cache_legacy_reference_image(cache, NOVELAI_VIBE_CACHE_KEY, PNG_BYTES, "image/png");
    expect((await cache.get(NOVELAI_VIBE_CACHE_KEY))?.bytes).toBe(PNG_BYTES);

    await remove_cached_reference_image(cache, NOVELAI_VIBE_CACHE_KEY);
    expect(await cache.get(NOVELAI_VIBE_CACHE_KEY)).toBeNull();
  });

  it("caches a character-reference image under its own independent key", async () => {
    const cache = fake_cache();
    await cache_legacy_reference_image(cache, NOVELAI_VIBE_CACHE_KEY, PNG_BYTES, "image/png");
    await cache_legacy_reference_image(cache, NOVELAI_CHAR_REF_CACHE_KEY, PNG_BYTES, "image/png");
    expect(cache.store.size).toBe(2);
  });

  it("rejects caching video as a reference image", async () => {
    const cache = fake_cache();
    await expect(
      cache_legacy_reference_image(cache, NOVELAI_VIBE_CACHE_KEY, MP4_BYTES, "video/mp4"),
    ).rejects.toThrow(ReferenceUploadError);
  });
});

describe("Banana conversation-preset image slots", () => {
  it("creates 6 empty slots (3 turns x user/model)", () => {
    const slots = create_preset_image_slots();
    expect(slots).toHaveLength(6);
    expect(slots.every((slot) => slot.bytes === null)).toBe(true);
  });

  it("sets and clears one slot immutably without disturbing the others", () => {
    const initial = create_preset_image_slots();
    const updated = set_preset_image_slot(initial, 1, "model", PNG_BYTES, "image/png");

    expect(initial.find((slot) => slot.turn === 1 && slot.role === "model")?.bytes).toBeNull();
    const updated_slot = updated.find((slot) => slot.turn === 1 && slot.role === "model");
    expect(updated_slot?.bytes).toBe(PNG_BYTES);
    expect(updated.filter((slot) => slot.bytes !== null)).toHaveLength(1);

    const cleared = clear_preset_image_slot(updated, 1, "model");
    expect(cleared.find((slot) => slot.turn === 1 && slot.role === "model")?.bytes).toBeNull();
  });

  it("rejects setting a slot to video bytes", () => {
    const slots = create_preset_image_slots();
    expect(() => set_preset_image_slot(slots, 0, "user", MP4_BYTES, "video/mp4")).toThrow(
      ReferenceUploadError,
    );
  });
});
