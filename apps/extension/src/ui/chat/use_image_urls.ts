import type { Uuid } from "@tavern-canvas/contracts";
import { onBeforeUnmount } from "vue";

import type { GalleryCapability } from "../contracts/ui_capabilities.js";

export type ImageUrlLoader = (image_id: Uuid) => Promise<string>;

/** One object URL per image for the lifetime of the chat layer; every URL is revoked on unmount. */
export function use_image_urls(gallery: GalleryCapability): ImageUrlLoader {
  const urls = new Map<string, Promise<string>>();

  onBeforeUnmount(() => {
    for (const url of urls.values()) {
      void url.then((value) => {
        URL.revokeObjectURL(value);
      });
    }
    urls.clear();
  });

  return (image_id) => {
    let url = urls.get(image_id);
    if (url === undefined) {
      url = gallery
        .read_bytes(image_id)
        .then((bytes) => URL.createObjectURL(new Blob([new Uint8Array(bytes)])));
      urls.set(image_id, url);
      url.catch(() => urls.delete(image_id));
    }
    return url;
  };
}
