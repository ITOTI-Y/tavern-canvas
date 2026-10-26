import { onScopeDispose, shallowRef, watch, type ShallowRef } from "vue";

import type { StudioState } from "../contracts/view_models.js";
import type { StudioController } from "../controllers/studio_controller.js";

export function use_generation_preview_urls(
  get_state: () => Readonly<StudioState>,
  controller: StudioController,
): ShallowRef<Readonly<Record<string, string>>> {
  const urls = shallowRef<Readonly<Record<string, string>>>({});
  const pending = new Set<string>();
  const failed = new Set<string>();

  function resolve_one(image_id: string): void {
    if (image_id in urls.value || pending.has(image_id) || failed.has(image_id)) {
      return;
    }
    pending.add(image_id);
    controller
      .read_gallery_bytes(image_id)
      .then((bytes) => {
        const media_type = get_state().gallery.records.find((r) => r.id === image_id)?.media_type;
        const blob = new Blob([new Uint8Array(bytes)], media_type ? { type: media_type } : {});
        const url = URL.createObjectURL(blob);
        urls.value = { ...urls.value, [image_id]: url };
      })
      .catch(() => {
        failed.add(image_id);
      })
      .finally(() => {
        pending.delete(image_id);
      });
  }

  watch(
    () => get_state().generation.jobs.flatMap((job) => job.completed_image_ids),
    (image_ids) => {
      for (const image_id of image_ids) {
        resolve_one(image_id);
      }
    },
    { immediate: true },
  );

  onScopeDispose(() => {
    for (const url of Object.values(urls.value)) {
      URL.revokeObjectURL(url);
    }
  });

  return urls;
}
