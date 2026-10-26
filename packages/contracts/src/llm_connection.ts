import { z } from "zod";

import { UuidSchema, VaultReferenceSchema } from "./ids.js";

// The client picks a dialect and route from this fixed catalog and never supplies an origin,
// header or credential; origin resolution and credential attachment happen host-side.
export const LlmProviderKindSchema = z.enum([
  "openai_compatible",
  "anthropic",
  "google_generative",
  "ollama",
]);
export type LlmProviderKind = z.infer<typeof LlmProviderKindSchema>;

export interface LlmRouteCatalogEntry {
  readonly completion_routes: readonly `/${string}`[];
  readonly models_route: `/${string}`;
}

export const LLM_ROUTE_CATALOG: Readonly<Record<LlmProviderKind, LlmRouteCatalogEntry>> = {
  openai_compatible: {
    completion_routes: ["/v1/chat/completions", "/chat/completions"],
    models_route: "/v1/models",
  },
  anthropic: {
    completion_routes: ["/v1/messages"],
    models_route: "/v1/models",
  },
  google_generative: {
    completion_routes: ["/v1beta/openai/chat/completions"],
    models_route: "/v1beta/openai/models",
  },
  ollama: {
    completion_routes: ["/api/chat"],
    models_route: "/api/tags",
  },
};

// Mirrors `assert_provider_route`'s rejection set so a catalog entry cannot escape the
// host-resolved origin.
function is_relative_absolute_path(route: string): boolean {
  return (
    route.startsWith("/") &&
    !route.startsWith("//") &&
    !route.includes("\\") &&
    !route.includes("#") &&
    !route.split(/[/?]/u).includes("..") &&
    !/^[a-z][a-z0-9+.-]*:/iu.test(route)
  );
}

export function llm_completion_routes(kind: LlmProviderKind): readonly string[] {
  return LLM_ROUTE_CATALOG[kind].completion_routes;
}

export function is_allowed_llm_route(kind: LlmProviderKind, route: string): boolean {
  return (
    is_relative_absolute_path(route) &&
    LLM_ROUTE_CATALOG[kind].completion_routes.includes(route as `/${string}`)
  );
}

export const LLM_CREDENTIAL_KIND = "llm_profile_api_key" as const;

export function derive_llm_credential_reference(namespace: string, connection_id: string): string {
  return `tavern_canvas:${namespace}:${connection_id}:${LLM_CREDENTIAL_KIND}`;
}

const llm_connection_fields = {
  id: UuidSchema,
  display_name: z.string().trim().min(1).max(120),
  provider_kind: LlmProviderKindSchema,
  route: z.string().min(1).max(256),
  model_id: z.string().trim().min(1).max(200),
  temperature: z.number().min(0).max(2),
  max_output_tokens: z.number().int().min(1).max(200_000),
  is_default: z.boolean(),
};

const ROUTE_ISSUE_MESSAGE = "route must be one of the selected provider kind's catalog routes";

function route_issue(route: string): {
  code: "custom";
  input: string;
  path: PropertyKey[];
  message: string;
} {
  return { code: "custom", input: route, path: ["route"], message: ROUTE_ISSUE_MESSAGE };
}

// No credential, header or endpoint field: credentials go straight to the secret vault in a
// separate operation, so no save path can carry a secret into storage.
export const LlmConnectionDraftSchema = z.strictObject(llm_connection_fields).check((context) => {
  if (!is_allowed_llm_route(context.value.provider_kind, context.value.route)) {
    context.issues.push(route_issue(context.value.route));
  }
});
export type LlmConnectionDraft = z.infer<typeof LlmConnectionDraftSchema>;

export const LlmConnectionProfileSchema = z
  .strictObject({
    ...llm_connection_fields,
    credential_reference: VaultReferenceSchema.nullable(),
    created_at: z.iso.datetime({ offset: true }),
    updated_at: z.iso.datetime({ offset: true }),
  })
  .check((context) => {
    if (!is_allowed_llm_route(context.value.provider_kind, context.value.route)) {
      context.issues.push(route_issue(context.value.route));
    }
  });
export type LlmConnectionProfile = z.infer<typeof LlmConnectionProfileSchema>;

export type LlmConnectionTestResult =
  | { readonly status: "success"; readonly latency_ms: number; readonly model_id: string }
  | { readonly status: "failed"; readonly code: string };
