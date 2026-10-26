import { computed, ref, type ComputedRef, type Ref } from "vue";

import type { AssistantMessageRecord } from "../../modules/assistant/assistant_session.js";

export interface MessagePagination {
  readonly visible: ComputedRef<readonly AssistantMessageRecord[]>;
  readonly has_older: ComputedRef<boolean>;
  readonly page_size: Ref<number>;
  load_older(): void;
  reset(): void;
  is_near_top(scroll_top: number): boolean;
  is_at_bottom(scroll_top: number, scroll_height: number, client_height: number): boolean;
}

const DEFAULT_PAGE_SIZE = 30;
const TOP_THRESHOLD_PX = 48;
const BOTTOM_THRESHOLD_PX = 64;

export function use_message_pagination(
  messages: () => readonly AssistantMessageRecord[],
  page_size = DEFAULT_PAGE_SIZE,
): MessagePagination {
  const limit = ref(page_size);
  const size = ref(page_size);

  const visible = computed(() => {
    const all = messages();
    return all.slice(Math.max(0, all.length - limit.value));
  });

  const has_older = computed(() => messages().length > visible.value.length);

  return {
    visible,
    has_older,
    page_size: size,
    load_older(): void {
      if (has_older.value) {
        limit.value += size.value;
      }
    },
    reset(): void {
      limit.value = size.value;
    },
    is_near_top(scroll_top: number): boolean {
      return scroll_top <= TOP_THRESHOLD_PX;
    },
    is_at_bottom(scroll_top: number, scroll_height: number, client_height: number): boolean {
      return scroll_height - (scroll_top + client_height) <= BOTTOM_THRESHOLD_PX;
    },
  };
}
