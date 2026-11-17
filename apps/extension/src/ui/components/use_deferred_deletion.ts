import { inject } from "vue";

import { DEFER_DELETION_KEY, type DeferDeletion } from "../contracts/portal_keys.js";

/** The studio shell's deferred deletion: shows an undo toast and deletes when it runs out. */
export function use_deferred_deletion(): DeferDeletion {
  const defer = inject(DEFER_DELETION_KEY);
  if (defer === undefined) {
    throw new Error("Deferred deletion needs the studio shell, which provides it");
  }
  return defer;
}
