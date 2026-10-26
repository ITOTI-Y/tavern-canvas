import { LLM_ROUTE_CATALOG, type LlmProviderKind } from "@tavern-canvas/contracts";

export type Translate = (key: string) => string;

export const LLM_PROVIDER_KINDS = [
  "openai_compatible",
  "anthropic",
  "google_generative",
  "ollama",
] as const satisfies readonly LlmProviderKind[];

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

/** Rendered as a select: a free-text route would let the client control part of the request URL. */
export function llm_route_options(kind: LlmProviderKind): readonly string[] {
  return LLM_ROUTE_CATALOG[kind].completion_routes;
}
