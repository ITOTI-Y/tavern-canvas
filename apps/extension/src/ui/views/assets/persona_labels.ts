import type { KnowledgeSourceType, PersonaRole } from "@tavern-canvas/contracts";

export type Translate = (key: string) => string;

export function persona_role_label(t: Translate, role: PersonaRole): string {
  switch (role) {
    case "assistant":
      return t("assets.personas.roles.assistant");
    case "user":
      return t("assets.personas.roles.user");
  }
}

export function knowledge_source_label(t: Translate, source_type: KnowledgeSourceType): string {
  switch (source_type) {
    case "manual":
      return t("assets.knowledge.source_types.manual");
    case "imported":
      return t("assets.knowledge.source_types.imported");
    case "character":
      return t("assets.knowledge.source_types.character");
  }
}
