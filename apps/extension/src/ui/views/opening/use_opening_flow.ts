import { reactive } from "vue";

import {
  mark_later_stale,
  type OpeningDraft,
  type OpeningEntry,
} from "../../../modules/opening/opening_model.js";
import {
  activation_text,
  entries_request,
  message_request,
  question_request,
  rewrite_request,
} from "../../../modules/opening/opening_requests.js";
import type { OpeningPort, OpeningRequestOptions } from "../../contracts/opening_port.js";
import type { OpeningStore } from "./use_opening_store.js";

export type OpeningBusy =
  | { readonly kind: "question" | "generate"; readonly step: number }
  | { readonly kind: "rewrite"; readonly step: number; readonly entry_id: string };

export interface OpeningFlow {
  busy(draft_id: string): OpeningBusy | null;
  error(draft_id: string): unknown;
  /** Asks the model about the step, or writes it once no question is left. */
  run_step(draft: OpeningDraft, index: number): Promise<void>;
  answer(draft: OpeningDraft, selected: readonly string[], other: string): Promise<void>;
  /** Writes the current step now, without the questions left. */
  skip(draft: OpeningDraft): Promise<void>;
  generate(draft: OpeningDraft, index: number): Promise<void>;
  /** Shows an earlier answer's question again; the answers after it are dropped. */
  reask(draft: OpeningDraft, index: number, answer_index: number): void;
  next(draft: OpeningDraft): Promise<void>;
  /** Writes every stale step again, in order, stopping at the first failure. */
  regenerate_stale(draft: OpeningDraft): Promise<void>;
  rewrite_entry(draft: OpeningDraft, index: number, entry: OpeningEntry): Promise<void>;
}

export function use_opening_flow(port: OpeningPort, store: OpeningStore): OpeningFlow {
  const busy = reactive(new Map<string, OpeningBusy>());
  const errors = reactive(new Map<string, unknown>());

  function options(draft: OpeningDraft): OpeningRequestOptions {
    return {
      connection: draft.connection,
      preset_name: draft.preset_name,
      worldbooks: draft.worldbooks,
      text: activation_text(draft),
    };
  }

  /** Runs one request with the draft marked busy; a failure is kept for the page to show. */
  async function guarded(draft: OpeningDraft, state: OpeningBusy, work: () => Promise<void>) {
    if (busy.has(draft.id)) {
      return false;
    }
    busy.set(draft.id, state);
    errors.delete(draft.id);
    try {
      await work();
      return true;
    } catch (error) {
      errors.set(draft.id, error);
      return false;
    } finally {
      busy.delete(draft.id);
    }
  }

  async function generate(draft: OpeningDraft, index: number): Promise<void> {
    const step = draft.steps[index];
    if (step === undefined) {
      return;
    }
    await guarded(draft, { kind: "generate", step: index }, async () => {
      if (step.output === "message") {
        const message = await port.request(message_request(draft, index), options(draft));
        store.edit(draft, (current) => {
          const state = current.states[index];
          if (state !== undefined) {
            Object.assign(state, { message, question: null, status: "done" });
          }
        });
      } else {
        const entries = await port.request(entries_request(draft, index), options(draft));
        store.edit(draft, (current) => {
          const state = current.states[index];
          if (state !== undefined) {
            Object.assign(state, { entries, question: null, status: "done" });
          }
        });
      }
      store.edit(draft, (current) => {
        mark_later_stale(current, index);
      });
    });
  }

  async function run_step(draft: OpeningDraft, index: number): Promise<void> {
    const step = draft.steps[index];
    const state = draft.states[index];
    if (step === undefined || state === undefined) {
      return;
    }
    store.edit(draft, (current) => {
      current.current = index;
      const target = current.states[index];
      if (target !== undefined) {
        target.status = "asking";
      }
    });
    const rounds_left = step.max_rounds - state.answers.length;
    if (rounds_left > 0) {
      const outcome = { asked: false };
      const ok = await guarded(draft, { kind: "question", step: index }, async () => {
        const question = await port.request(
          question_request(draft, index, rounds_left),
          options(draft),
        );
        if (question !== null) {
          outcome.asked = true;
          store.edit(draft, (current) => {
            const target = current.states[index];
            if (target !== undefined) {
              target.question = question;
            }
          });
        }
      });
      if (!ok || outcome.asked) {
        return;
      }
    }
    await generate(draft, index);
  }

  return {
    busy: (id) => busy.get(id) ?? null,
    error: (id) => errors.get(id) ?? null,
    run_step,
    generate,
    async answer(draft, selected, other) {
      const index = draft.current;
      const question = draft.states[index]?.question;
      if (question === null || question === undefined) {
        return;
      }
      store.edit(draft, (current) => {
        const target = current.states[index];
        if (target !== undefined) {
          target.answers.push({ question, selected: [...selected], other: other.trim() });
          target.question = null;
        }
      });
      await run_step(draft, index);
    },
    async skip(draft) {
      store.edit(draft, (current) => {
        const target = current.states[current.current];
        if (target !== undefined) {
          target.question = null;
        }
      });
      await generate(draft, draft.current);
    },
    reask(draft, index, answer_index) {
      store.edit(draft, (current) => {
        const target = current.states[index];
        const answer = target?.answers[answer_index];
        if (target === undefined || answer === undefined) {
          return;
        }
        target.answers = target.answers.slice(0, answer_index);
        target.question = answer.question;
        target.status = "asking";
        current.current = index;
        mark_later_stale(current, index);
      });
    },
    async next(draft) {
      const index = draft.current + 1;
      const state = draft.states[index];
      if (state === undefined) {
        return;
      }
      store.edit(draft, (current) => {
        current.current = index;
      });
      if (state.status === "pending") {
        await run_step(draft, index);
      }
    },
    async regenerate_stale(draft) {
      for (let index = 0; index < draft.steps.length; index += 1) {
        if (draft.states[index]?.status !== "stale") {
          continue;
        }
        await generate(draft, index);
        if (errors.has(draft.id)) {
          return;
        }
      }
    },
    async rewrite_entry(draft, index, entry) {
      await guarded(draft, { kind: "rewrite", step: index, entry_id: entry.id }, async () => {
        const next = await port.request(rewrite_request(draft, index, entry), options(draft));
        store.edit(draft, (current) => {
          const entries = current.states[index]?.entries;
          const position = entries?.findIndex((candidate) => candidate.id === entry.id) ?? -1;
          if (entries !== undefined && position >= 0) {
            entries[position] = next;
          }
          mark_later_stale(current, index);
        });
      });
    },
  };
}
