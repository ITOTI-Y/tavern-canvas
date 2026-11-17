import { reactive } from "vue";

import { AnalysisStoppedError } from "../../../modules/illustration/analysis_error.js";
import {
  mark_later_stale,
  type OpeningDraft,
  type OpeningEntry,
  type StepStatus,
} from "../../../modules/opening/opening_model.js";
import {
  activation_text,
  entries_request,
  message_request,
  rewrite_request,
  follow_up_request,
  question_request,
  type OpeningResult,
  type RejectedQuestion,
} from "../../../modules/opening/opening_requests.js";
import type { OpeningPort, OpeningRequestOptions } from "../../contracts/opening_port.js";
import type { OpeningStore } from "./use_opening_store.js";

export type OpeningBusy =
  | { readonly kind: "question" | "generate"; readonly step: number }
  | { readonly kind: "rewrite"; readonly step: number; readonly entry_id: string };

export interface OpeningFlow {
  busy(draft_id: string): OpeningBusy | null;
  error(draft_id: string): unknown;
  /** Entries the last write left out because they failed validation. */
  dropped(draft_id: string): number;
  /** Asks the model about the step, or writes it once no question is left. */
  run_step(draft: OpeningDraft, index: number): Promise<void>;
  /**
   * Asks one more question about a step that already has a result, which stays until answered;
   * `focus` is what the user wants asked about, empty to leave it to the model.
   */
  ask_more(draft: OpeningDraft, index: number, focus: string): Promise<void>;
  /**
   * Turns down the question shown and asks a new one built on `feedback`; every question turned
   * down in this step is sent along, so the user can keep refining without limit.
   */
  refine_question(draft: OpeningDraft, feedback: string): Promise<void>;
  /** Drops the question shown; the step returns to the state it had before the question. */
  cancel_question(draft: OpeningDraft): void;
  /** Stops the draft's running request; nothing it would have written is kept. */
  cancel(draft: OpeningDraft): void;
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

type Outcome = "done" | "failed" | "cancelled";

export function use_opening_flow(port: OpeningPort, store: OpeningStore): OpeningFlow {
  const busy = reactive(new Map<string, OpeningBusy>());
  const errors = reactive(new Map<string, unknown>());
  const dropped = reactive(new Map<string, number>());
  const aborts = new Map<string, AbortController>();
  /** The status a step had before its question, restored when the question is dropped. */
  const resume = new Map<string, StepStatus>();
  /** Questions turned down in a step since its last answer, keyed by draft and step. */
  const rejected = new Map<string, RejectedQuestion[]>();
  const key = (draft: OpeningDraft, index: number): string => `${draft.id}:${String(index)}`;

  /** Stores a written result; later steps that already had one are now stale. */
  function store_result(draft: OpeningDraft, index: number, turn: OpeningResult) {
    dropped.set(draft.id, turn.kind === "entries" ? turn.dropped : 0);
    store.edit(draft, (current) => {
      const state = current.states[index];
      if (state !== undefined) {
        state.question = null;
        state.status = "done";
        if (turn.kind === "entries") {
          state.entries = turn.entries;
        } else {
          state.message = turn.message;
        }
      }
      mark_later_stale(current, index);
    });
  }

  function options(draft: OpeningDraft): OpeningRequestOptions {
    return {
      connection: draft.connection,
      preset_name: draft.preset_name,
      worldbooks: draft.worldbooks,
      text: activation_text(draft),
    };
  }

  /** Runs one request with the draft marked busy; a failure is kept for the page to show. */
  async function guarded(
    draft: OpeningDraft,
    state: OpeningBusy,
    work: (signal: AbortSignal) => Promise<void>,
  ): Promise<Outcome> {
    if (busy.has(draft.id)) {
      return "failed";
    }
    const controller = new AbortController();
    aborts.set(draft.id, controller);
    busy.set(draft.id, state);
    errors.delete(draft.id);
    try {
      await work(controller.signal);
      return "done";
    } catch (error) {
      if (error instanceof AnalysisStoppedError && error.reason === "cancelled") {
        return "cancelled";
      }
      errors.set(draft.id, error);
      return "failed";
    } finally {
      busy.delete(draft.id);
      aborts.delete(draft.id);
    }
  }

  function set_status(draft: OpeningDraft, index: number, status: StepStatus): void {
    store.edit(draft, (current) => {
      const target = current.states[index];
      if (target !== undefined) {
        target.status = status;
      }
    });
  }

  /** The status to return to when a question is dropped: the result's, or not started. */
  function remember_status(draft: OpeningDraft, index: number): void {
    const status = draft.states[index]?.status;
    if (status !== undefined && status !== "asking") {
      resume.set(key(draft, index), status);
    }
  }

  function restore_status(draft: OpeningDraft, index: number): void {
    const state = draft.states[index];
    const has_result = (state?.entries.length ?? 0) > 0 || state?.message != null;
    set_status(draft, index, resume.get(key(draft, index)) ?? (has_result ? "done" : "pending"));
  }

  function show_question(
    draft: OpeningDraft,
    index: number,
    question: OpeningDraft["states"][number]["question"],
  ) {
    store.edit(draft, (current) => {
      current.current = index;
      const target = current.states[index];
      if (target !== undefined) {
        target.question = question;
        target.status = "asking";
      }
    });
  }

  async function write_step(draft: OpeningDraft, index: number): Promise<Outcome> {
    const step = draft.steps[index];
    if (step === undefined) {
      return "failed";
    }
    const outcome = await guarded(draft, { kind: "generate", step: index }, async (signal) => {
      if (step.output === "message") {
        const message = await port.request(message_request(draft, index), options(draft), signal);
        store_result(draft, index, { kind: "message", message });
      } else {
        const written = await port.request(entries_request(draft, index), options(draft), signal);
        store_result(draft, index, { kind: "entries", ...written });
      }
    });
    rejected.delete(key(draft, index));
    return outcome;
  }

  async function run_step(draft: OpeningDraft, index: number): Promise<void> {
    const step = draft.steps[index];
    const state = draft.states[index];
    if (step === undefined || state === undefined) {
      return;
    }
    remember_status(draft, index);
    store.edit(draft, (current) => {
      current.current = index;
      const target = current.states[index];
      if (target !== undefined) {
        target.status = "asking";
      }
    });
    const rounds_left = step.max_rounds - state.answers.length;
    if (rounds_left > 0) {
      const asked = { value: false };
      const outcome = await guarded(draft, { kind: "question", step: index }, async (signal) => {
        const question = await port.request(
          question_request(draft, index, rounds_left),
          options(draft),
          signal,
        );
        if (question !== null) {
          asked.value = true;
          show_question(draft, index, question);
        }
      });
      if (outcome === "cancelled") {
        restore_status(draft, index);
        return;
      }
      if (outcome === "failed" || asked.value) {
        return;
      }
    }
    await write_step(draft, index);
  }

  /** Requests one follow-up question; a stopped request leaves the step as it was. */
  async function ask(draft: OpeningDraft, index: number, focus: string): Promise<void> {
    const outcome = await guarded(draft, { kind: "question", step: index }, async (signal) => {
      const question = await port.request(
        follow_up_request(draft, index, focus, rejected.get(key(draft, index)) ?? []),
        options(draft),
        signal,
      );
      show_question(draft, index, question);
    });
    if (outcome === "cancelled" && draft.states[index]?.question == null) {
      restore_status(draft, index);
    }
  }

  return {
    busy: (id) => busy.get(id) ?? null,
    error: (id) => errors.get(id) ?? null,
    dropped: (id) => dropped.get(id) ?? 0,
    run_step,
    async ask_more(draft, index, focus) {
      remember_status(draft, index);
      rejected.delete(key(draft, index));
      await ask(draft, index, focus);
    },
    async refine_question(draft, feedback) {
      const index = draft.current;
      const question = draft.states[index]?.question;
      if (question == null) {
        return;
      }
      const list = rejected.get(key(draft, index)) ?? [];
      rejected.set(key(draft, index), [...list, { question, feedback: feedback.trim() }]);
      await ask(draft, index, "");
    },
    cancel_question(draft) {
      const index = draft.current;
      store.edit(draft, (current) => {
        const target = current.states[index];
        if (target !== undefined) {
          target.question = null;
        }
      });
      rejected.delete(key(draft, index));
      restore_status(draft, index);
    },
    cancel(draft) {
      aborts.get(draft.id)?.abort();
    },
    async generate(draft, index) {
      await write_step(draft, index);
    },
    async answer(draft, selected, other) {
      const index = draft.current;
      const question = draft.states[index]?.question;
      if (question === null || question === undefined) {
        return;
      }
      rejected.delete(key(draft, index));
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
      rejected.delete(key(draft, draft.current));
      store.edit(draft, (current) => {
        const target = current.states[current.current];
        if (target !== undefined) {
          target.question = null;
        }
      });
      await write_step(draft, draft.current);
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
        if ((await write_step(draft, index)) !== "done") {
          return;
        }
      }
    },
    async rewrite_entry(draft, index, entry) {
      await guarded(draft, { kind: "rewrite", step: index, entry_id: entry.id }, async (signal) => {
        const next = await port.request(
          rewrite_request(draft, index, entry),
          options(draft),
          signal,
        );
        store.edit(draft, (current) => {
          const entries = current.states[index]?.entries;
          const position = entries?.findIndex((candidate) => candidate.id === entry.id) ?? -1;
          if (entries !== undefined && position >= 0) {
            entries[position] = next;
          }
        });
      });
    },
  };
}
