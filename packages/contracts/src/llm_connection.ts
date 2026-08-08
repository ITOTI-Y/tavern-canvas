import { z } from "zod";

import { UuidSchema } from "./ids.js";

/**
 * Text-LLM connection profiles, the text-generation counterpart to the image `ProviderProfile`
 * family. The client picks a dialect and a route *from this file's fixed catalog*; it never
 * supplies an origin, a header, or a credential value. Origin resolution and credential
 * attachment happen host/Gateway-side exactly as they do for image providers
 * (`packages/providers`' `ProviderTransport`), which is why nothing here can express a URL.
 */
export const LlmProviderKindSchema = z.enum([
  "openai_compatible",
  "anthropic",
  "google_generative",
  "ollama",
]);
export type LlmProviderKind = z.infer<typeof LlmProviderKindSchema>;

export interface LlmRouteCatalogEntry {
  /** Every completion route this dialect is allowed to select, in preference order. */
  readonly completion_routes: readonly `/${string}`[];
  /** The route a model listing is read from; never selectable, always derived from the kind. */
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
    // Both routes live on Google's OpenAI-compatibility surface so one Bearer key authenticates
    // the completion call and the model listing; the native `/v1beta/models` route would need a
    // second, differently-named auth header for no gain.
    completion_routes: ["/v1beta/openai/chat/completions"],
    models_route: "/v1beta/openai/models",
  },
  ollama: {
    completion_routes: ["/api/chat"],
    models_route: "/api/tags",
  },
};

/**
 * Mirrors `assert_provider_route`'s rejection set (relative absolute-path references only) so a
 * catalog entry can never be widened into something that escapes the host-resolved origin.
 */
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

/**
 * A handle into the host secret vault, never the secret itself. The `tavern_canvas:` prefix is
 * what makes "someone pasted a raw provider key into this field" a schema failure rather than a
 * silent plaintext write, and it matches `derive_secret_reference`'s migration-side format so
 * both paths address the same vault entries.
 */
export const LlmCredentialReferenceSchema = z
  .string()
  .min(1)
  .max(256)
  .regex(/^tavern_canvas:[A-Za-z0-9_.:-]+$/u);
export type LlmCredentialReference = z.infer<typeof LlmCredentialReferenceSchema>;

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

/**
 * What the Settings UI is allowed to submit. There is deliberately no credential, header, or
 * endpoint field: writing a credential is a separate operation that hands the plaintext straight
 * to the secret vault, so no save path exists through which a secret could reach storage.
 */
export const LlmConnectionDraftSchema = z.strictObject(llm_connection_fields).check((context) => {
  if (!is_allowed_llm_route(context.value.provider_kind, context.value.route)) {
    context.issues.push(route_issue(context.value.route));
  }
});
export type LlmConnectionDraft = z.infer<typeof LlmConnectionDraftSchema>;

export const LlmConnectionProfileSchema = z
  .strictObject({
    ...llm_connection_fields,
    credential_reference: LlmCredentialReferenceSchema.nullable(),
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
