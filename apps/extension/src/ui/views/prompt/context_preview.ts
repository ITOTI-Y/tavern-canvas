/**
 * World Info / user persona / character context preview shape shared by `PromptBuilder.vue` and
 * `PromptView.vue`. Declared in a plain `.ts` module rather than exported from a `.vue` single-file
 * component: the ESLint TypeScript project service does not resolve type-only imports from `.vue`
 * files reliably (see `use_toasts.ts`'s identical note for `ToastItem`).
 *
 * No `StudioCapabilities` port supplies this data yet (the Studio never imports host modules
 * directly per roadmap rule 5, and `host_adapter.ts`'s WorldInfo/persona surfaces are not among
 * the nine capability ports) -- see task-5-report.md's contract-gap note. Callers pass this as an
 * optional prop, `null`/absent when no such capability exists yet.
 */
export interface ContextPreview {
  readonly worldInfo: readonly string[];
  readonly userPersona: string | null;
  readonly characterContext: string | null;
}
