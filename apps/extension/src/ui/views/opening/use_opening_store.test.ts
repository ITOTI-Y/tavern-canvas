import { afterEach, describe, expect, it, vi } from "vitest";

import { empty_state, type OpeningDraft } from "../../../modules/opening/opening_model.js";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import { use_opening_store } from "./use_opening_store.js";

function draft(id: string): OpeningDraft {
  return {
    id,
    kind: "draft",
    display_name: "Draft",
    created_at: "2026-11-17T00:00:00.000Z",
    description: "",
    template_name: "Default",
    steps: [{ id: "genre", name: "Genre", instruction: "", max_rounds: 0, output: "entries" }],
    states: [empty_state()],
    current: 0,
    started: false,
    connection: { kind: "analysis" },
    preset_name: "in_use",
    worldbooks: [],
    card: null,
    use_greeting: false,
    written: {},
  };
}

afterEach(() => {
  vi.useRealTimers();
});

describe("use_opening_store", () => {
  it("saves a pending text edit before a deletion and never brings the draft back after it", async () => {
    vi.useFakeTimers();
    const item = draft("d1");
    const { id: _id, ...payload } = item;
    const records: AssetRecordSummary[] = [
      {
        id: "d1",
        category: "opening",
        record_key: "d1",
        display_name: "Draft",
        payload,
        updated_at: "2026-11-17T00:00:00.000Z",
      } as unknown as AssetRecordSummary,
    ];
    const calls: string[] = [];
    const save = vi.fn(() => {
      calls.push("save");
      return Promise.resolve();
    });
    const remove = vi.fn(() => {
      calls.push("remove");
      // The host hides a removed record from the list at once.
      records.length = 0;
      return Promise.resolve();
    });
    const store = use_opening_store({
      records: () => records,
      save,
      remove,
      on_save_error: (error) => {
        throw error;
      },
    });

    const current = store.draft("d1");
    if (current === null) {
      throw new Error("the draft should load from its record");
    }
    store.edit(
      current,
      (value) => {
        value.display_name = "Renamed";
      },
      { debounce: true },
    );

    await store.remove("d1");
    await vi.runAllTimersAsync();

    expect(remove).toHaveBeenCalledWith("d1");
    expect(calls).toEqual(["save", "remove"]);
    expect(store.draft("d1")).toBeNull();
    expect(store.drafts.value).toEqual([]);
  });
});
