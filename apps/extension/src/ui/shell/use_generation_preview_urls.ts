import { onScopeDispose, shallowRef, watch, type ShallowRef } from "vue";

import type { StudioState } from "../contracts/view_models.js";
import type { StudioController } from "../controllers/studio_controller.js";

/**
 * Resolves the Workbench's completion-preview tiles (GenerationInspector.vue) to real object
 * URLs. `WorkbenchView` only carries the `completed_image_ids` a job reports
 * (`GenerationJobSummary`, ui_capabilities.ts) -- those ids are the same Gallery record ids the
 * generation writes (both share one id space, per `GalleryCapability.read_bytes`'s contract), so
 * this composable is the one place that bridges "a job finished" to "here is its image" through
 * `StudioController.read_gallery_bytes` (never the capability port directly -- roadmap rule 5).
 * `WorkbenchView.vue`'s own doc comment left this wiring for "the stage's whole-review integration
 * pass" (task-5-report.md); StudioWorkspace.vue is that pass for the routing gap (task-8-report.md).
 *
 * Object URLs are cached per image id (never re-requested once resolved or once a request fails)
 * and every outstanding URL is revoked when the owning component scope is disposed, so navigating
 * away from Workbench cannot leak blobs.
 */
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
        // GalleryView.download_record passes `record.media_type` for the same reason: an
        // untyped Blob leaves decoding to browser content-sniffing, which is not spec-guaranteed
        // (works in Chromium, per the stage review). The completion-preview tile only has the
        // image id, not the record itself, so this looks the record up in gallery state -- its
        // own doc comment above already establishes both share one id space -- and falls back to
        // untyped only if the record has not loaded into that slice yet.
        const media_type = get_state().gallery.records.find((r) => r.id === image_id)?.media_type;
        const blob = new Blob([new Uint8Array(bytes)], media_type ? { type: media_type } : {});
        const url = URL.createObjectURL(blob);
        urls.value = { ...urls.value, [image_id]: url };
      })
      .catch(() => {
        // Left unresolved: GenerationInspector.vue's completion tile falls back to its
        // ImageOff placeholder instead of retrying a read that already failed.
        failed.add(image_id);
      })
      .finally(() => {
        pending.delete(image_id);
      });
  }

  watch(
    () => get_state().workbench.jobs.flatMap((job) => job.completed_image_ids),
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
