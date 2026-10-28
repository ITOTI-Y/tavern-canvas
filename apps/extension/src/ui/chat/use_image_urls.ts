import type { Uuid } from "@tavern-canvas/contracts";
import { onBeforeUnmount } from "vue";

import type { GalleryCapability } from "../contracts/ui_capabilities.js";

export type ImageUrlLoader = (image_id: Uuid) => Promise<string>;

/** Object URLs kept alive at once; each holds a full-size image in memory until it is revoked. */
const MAX_CACHED_URLS = 64;

function revoke(url: Promise<string>): void {
  void url.then(
    (value) => {
      URL.revokeObjectURL(value);
    },
    () => undefined,
  );
}

/**
 * One object URL per image, keeping the most recently used ones; an evicted image is read again
 * when it is shown next. Every URL is revoked on unmount.
 */
export function use_image_urls(
  gallery: GalleryCapability,
  max_cached = MAX_CACHED_URLS,
): ImageUrlLoader {
  const urls = new Map<string, Promise<string>>();

  onBeforeUnmount(() => {
    for (const url of urls.values()) {
      revoke(url);
    }
    urls.clear();
  });

  return (image_id) => {
    const cached = urls.get(image_id);
    if (cached !== undefined) {
      urls.delete(image_id);
      urls.set(image_id, cached);
      return cached;
    }
    const url = gallery
      .read_bytes(image_id)
      .then((bytes) => URL.createObjectURL(new Blob([new Uint8Array(bytes)])));
    urls.set(image_id, url);
    url.catch(() => urls.delete(image_id));
    for (const [oldest_id, oldest] of urls) {
      if (urls.size <= max_cached) {
        break;
      }
      urls.delete(oldest_id);
      revoke(oldest);
    }
    return url;
  };
}
