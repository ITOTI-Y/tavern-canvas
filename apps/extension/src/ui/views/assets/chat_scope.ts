import { computed, inject, ref, type ComputedRef } from "vue";

import { ACTIVE_CHAT_ID_KEY } from "../../contracts/portal_keys.js";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";

/**
 * Global entries plus the ones bound to the active chat, each with a `scope_label` payload field
 * for the list summary. Entries bound to another chat are left out.
 */
export function use_chat_scope(
  records: () => readonly AssetRecordSummary[],
  chat_label: () => string,
): {
  readonly active_chat_id: Readonly<{ value: string | null }>;
  readonly visible: ComputedRef<readonly AssetRecordSummary[]>;
} {
  const active_chat_id = inject(ACTIVE_CHAT_ID_KEY, ref(null));
  const visible = computed(() =>
    records().flatMap((record) => {
      const chat_id = record.payload.chat_id;
      if (typeof chat_id !== "string" || chat_id === "") {
        return [record];
      }
      return chat_id === active_chat_id.value
        ? [{ ...record, payload: { ...record.payload, scope_label: chat_label() } }]
        : [];
    }),
  );
  return { active_chat_id, visible };
}
