import { computed, reactive, type ComputedRef } from "vue";

import {
  OpeningDraftPayloadSchema,
  OpeningTemplatePayloadSchema,
  plain,
  read_draft,
  read_template,
  type OpeningDraft,
  type OpeningTemplate,
} from "../../../modules/opening/opening_model.js";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";

const EDIT_SAVE_DELAY_MS = 600;

export interface OpeningStoreDeps {
  readonly records: () => readonly AssetRecordSummary[];
  readonly save: (record: Omit<AssetRecordSummary, "updated_at">) => Promise<void>;
  readonly remove: (id: string) => Promise<void>;
  readonly on_save_error: (error: unknown) => void;
}

type Item = OpeningDraft | OpeningTemplate;

export interface OpeningStore {
  /** Newest first; an item being edited shows its unsaved state. */
  readonly drafts: ComputedRef<readonly OpeningDraft[]>;
  readonly templates: ComputedRef<readonly OpeningTemplate[]>;
  draft(id: string): OpeningDraft | null;
  template(id: string): OpeningTemplate | null;
  add(item: Item): Promise<void>;
  /** Changes an item in place; text edits are saved after a pause, everything else at once. */
  edit<T extends Item>(
    item: T,
    change: (item: T) => void,
    options?: { readonly debounce: boolean },
  ): void;
  remove(id: string): Promise<void>;
}

function payload_of(item: Item): Readonly<Record<string, unknown>> {
  if (item.kind === "draft") {
    const { id: _id, ...payload } = item;
    return OpeningDraftPayloadSchema.parse(plain(payload));
  }
  const { id: _id, builtin: _builtin, ...payload } = item;
  return OpeningTemplatePayloadSchema.parse(plain(payload));
}

export function use_opening_store(deps: OpeningStoreDeps): OpeningStore {
  const working = reactive(new Map<string, Item>());
  const chains = new Map<string, Promise<void>>();
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  function loaded(record: AssetRecordSummary): Item | null {
    return (
      working.get(record.id) ??
      (record.payload.kind === "template" ? read_template(record) : read_draft(record))
    );
  }

  const items = computed<readonly Item[]>(() => {
    const list = deps
      .records()
      .map(loaded)
      .filter((item): item is Item => item !== null);
    for (const item of working.values()) {
      if (!list.some((candidate) => candidate.id === item.id)) {
        list.push(item);
      }
    }
    return list.sort((a, b) => b.created_at.localeCompare(a.created_at));
  });

  const drafts = computed(() =>
    items.value.filter((item): item is OpeningDraft => item.kind === "draft"),
  );
  const templates = computed(() =>
    items.value.filter((item): item is OpeningTemplate => item.kind === "template"),
  );

  function get(id: string): Item | null {
    const current = working.get(id);
    if (current !== undefined) {
      return current;
    }
    const record = deps.records().find((candidate) => candidate.id === id);
    const item = record === undefined ? null : loaded(record);
    if (item === null) {
      return null;
    }
    working.set(id, item);
    return working.get(id) ?? null;
  }

  /** Saves the item as it stands when its turn comes, so queued saves collapse to the latest. */
  function persist(id: string): Promise<void> {
    const timer = timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timers.delete(id);
    }
    const next = (chains.get(id) ?? Promise.resolve()).then(async () => {
      const item = working.get(id);
      if (item === undefined) {
        return;
      }
      await deps.save({
        id,
        category: "opening",
        record_key: id,
        display_name: item.display_name,
        payload: payload_of(item),
      });
    });
    const settled = next.catch(deps.on_save_error);
    chains.set(id, settled);
    return settled;
  }

  return {
    drafts,
    templates,
    draft(id) {
      const item = get(id);
      return item?.kind === "draft" ? item : null;
    },
    template(id) {
      const item = get(id);
      return item?.kind === "template" ? item : null;
    },
    async add(item) {
      working.set(item.id, item);
      await persist(item.id);
    },
    edit(item, change, options = { debounce: false }) {
      const current = get(item.id);
      if (current === null) {
        return;
      }
      change(current as typeof item);
      if (!options.debounce) {
        void persist(item.id);
        return;
      }
      const timer = timers.get(item.id);
      if (timer !== undefined) {
        clearTimeout(timer);
      }
      timers.set(
        item.id,
        setTimeout(() => {
          void persist(item.id);
        }, EDIT_SAVE_DELAY_MS),
      );
    },
    async remove(id) {
      const timer = timers.get(id);
      if (timer !== undefined) {
        clearTimeout(timer);
        timers.delete(id);
      }
      await chains.get(id);
      working.delete(id);
      chains.delete(id);
      await deps.remove(id);
    },
  };
}
