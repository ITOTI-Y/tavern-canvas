import { onUnmounted, ref, watch, type Ref } from "vue";

import type { GalleryMediaType } from "../../contracts/ui_capabilities.js";

export type ObjectUrlStatus = "idle" | "loading" | "ready" | "error";

export interface GalleryObjectUrlState {
  readonly url: Ref<string | null>;
  readonly status: Ref<ObjectUrlStatus>;
  readonly bytes: Ref<Uint8Array | null>;
}

/**
 * Lazily fetches one gallery record's bytes through the controller (never directly -- views never
 * fetch, per the plan) and wraps them in an object URL, revoking it the instant this goes away:
 * on `active` turning false (a virtualized tile scrolling out), the record changing, or the owning
 * component unmounting. This is the one place object URL lifetime is managed so every caller (grid
 * tile, preview dialog) gets the same "release on unmount" guarantee instead of reimplementing it.
 */
export function use_gallery_object_url(
  record_id: Ref<string>,
  media_type: Ref<GalleryMediaType>,
  active: Ref<boolean>,
  read_bytes: (id: string) => Promise<Uint8Array>,
): GalleryObjectUrlState {
  const url = ref<string | null>(null);
  const status = ref<ObjectUrlStatus>("idle");
  const bytes = ref<Uint8Array | null>(null);
  let request_token = 0;

  function release(): void {
    if (url.value !== null) {
      URL.revokeObjectURL(url.value);
      url.value = null;
    }
    bytes.value = null;
  }

  async function load(): Promise<void> {
    const token = (request_token += 1);
    status.value = "loading";
    try {
      const loaded_bytes = await read_bytes(record_id.value);
      if (token !== request_token) {
        return;
      }
      release();
      bytes.value = loaded_bytes;
      url.value = URL.createObjectURL(
        new Blob([new Uint8Array(loaded_bytes)], { type: media_type.value }),
      );
      status.value = "ready";
    } catch {
      if (token !== request_token) {
        return;
      }
      status.value = "error";
    }
  }

  watch(
    [record_id, active],
    ([, is_active]) => {
      request_token += 1;
      release();
      status.value = "idle";
      if (is_active) {
        void load();
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    request_token += 1;
    release();
  });

  return { url, status, bytes };
}
