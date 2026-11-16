import { describe, expect, it } from "vitest";

import { change_description, empty_state, type OpeningDraftPayload } from "./opening_model.js";

describe("change_description", () => {
  it("replaces the description and marks every step that has a result as stale", () => {
    const draft = {
      description: "old",
      states: [
        { ...empty_state(), status: "done" },
        { ...empty_state(), status: "asking" },
        empty_state(),
      ],
    } as unknown as OpeningDraftPayload;

    change_description(draft, "new");

    expect(draft.description).toBe("new");
    expect(draft.states.map((state) => state.status)).toEqual(["stale", "asking", "pending"]);
  });
});
