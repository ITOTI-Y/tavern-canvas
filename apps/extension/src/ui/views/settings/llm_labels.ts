import { LLM_ROUTE_CATALOG, type LlmProviderKind } from "@tavern-canvas/contracts";

export type Translate = (key: string) => string;

export const LLM_PROVIDER_KINDS = [
  "openai_compatible",
  "anthropic",
  "google_generative",
  "ollama",
] as const satisfies readonly LlmProviderKind[];

/** A `switch` over literal keys, matching `provider_labels.ts`, so `tools/locale_check`'s
 * dynamic-key rule can verify every call site statically. */
export function llm_provider_kind_label(t: Translate, kind: LlmProviderKind): string {
  switch (kind) {
    case "openai_compatible":
      return t("settings.llm_connections.provider_kinds.openai_compatible");
    case "anthropic":
      return t("settings.llm_connections.provider_kinds.anthropic");
    case "google_generative":
      return t("settings.llm_connections.provider_kinds.google_generative");
    case "ollama":
      return t("settings.llm_connections.provider_kinds.ollama");
  }
}

/** The route options a kind allows. Rendered as a select, never a text field: a free-text route
 * would be the client controlling part of the request URL, which this stage removed everywhere. */
export function llm_route_options(kind: LlmProviderKind): readonly string[] {
  return LLM_ROUTE_CATALOG[kind].completion_routes;
}
