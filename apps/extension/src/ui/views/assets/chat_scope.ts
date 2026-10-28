import { computed, inject, ref, type ComputedRef } from "vue";

import { ACTIVE_CHAT_ID_KEY } from "../../contracts/portal_keys.js";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";

/**
 * Global entries plus the ones bound to the active chat, each chat-bound entry with a
 * `scope_label` payload field for the list summary. Entries bound to another chat are listed only
 * when `show_all` is on, labelled with that chat's id, so they can still be found and deleted.
 */
export function use_chat_scope(
  records: () => readonly AssetRecordSummary[],
  labels: () => { readonly this_chat: string; readonly other_chat: (chat_id: string) => string },
  show_all: () => boolean = () => false,
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
      if (chat_id === active_chat_id.value) {
        return [{ ...record, payload: { ...record.payload, scope_label: labels().this_chat } }];
      }
      return show_all()
        ? [{ ...record, payload: { ...record.payload, scope_label: labels().other_chat(chat_id) } }]
        : [];
    }),
  );
  return { active_chat_id, visible };
}
