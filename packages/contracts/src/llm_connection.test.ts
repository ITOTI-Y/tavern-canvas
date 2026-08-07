import { describe, expect, it } from "vitest";

import {
  LLM_ROUTE_CATALOG,
  LlmConnectionDraftSchema,
  LlmConnectionProfileSchema,
  LlmCredentialReferenceSchema,
  LlmProviderKindSchema,
  derive_llm_credential_reference,
  is_allowed_llm_route,
  llm_completion_routes,
} from "./llm_connection.js";

const CONNECTION_ID = "11111111-1111-4111-8111-111111111111";
const NOW = "2026-08-07T00:00:00.000Z";

function valid_draft(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: CONNECTION_ID,
    display_name: "Primary text model",
    provider_kind: "openai_compatible",
    route: "/v1/chat/completions",
    model_id: "gpt-4o-mini",
    temperature: 0.7,
    max_output_tokens: 2048,
    is_default: true,
    ...overrides,
  };
}

describe("LlmProviderKindSchema", () => {
  it("accepts every kind the route catalog covers and nothing else", () => {
    for (const kind of LlmProviderKindSchema.options) {
      expect(LLM_ROUTE_CATALOG[kind]).toBeDefined();
    }
    expect(LlmProviderKindSchema.safeParse("custom_http").success).toBe(false);
  });
});

describe("is_allowed_llm_route", () => {
  it("accepts a route the catalog declares for that kind", () => {
    expect(is_allowed_llm_route("openai_compatible", "/v1/chat/completions")).toBe(true);
    expect(is_allowed_llm_route("anthropic", "/v1/messages")).toBe(true);
  });

  it("rejects a route belonging to a different kind", () => {
    expect(is_allowed_llm_route("anthropic", "/v1/chat/completions")).toBe(false);
  });

  it("rejects absolute URLs, protocol-relative paths, and traversal", () => {
    expect(is_allowed_llm_route("openai_compatible", "https://evil.test/v1/chat/completions")).toBe(
      false,
    );
    expect(is_allowed_llm_route("openai_compatible", "//evil.test/v1/chat/completions")).toBe(
      false,
    );
    expect(is_allowed_llm_route("openai_compatible", "/v1/../../v1/chat/completions")).toBe(false);
  });

  it("exposes the catalog's completion routes for a kind", () => {
    expect(llm_completion_routes("ollama")).toContain("/api/chat");
    expect(llm_completion_routes("ollama").every((route) => route.startsWith("/"))).toBe(true);
  });
});

describe("LlmConnectionDraftSchema", () => {
  it("accepts a well formed draft", () => {
    expect(LlmConnectionDraftSchema.safeParse(valid_draft()).success).toBe(true);
  });

  it("rejects a route that is not in the selected kind's catalog", () => {
    const parsed = LlmConnectionDraftSchema.safeParse(
      valid_draft({ provider_kind: "anthropic", route: "/v1/chat/completions" }),
    );
    expect(parsed.success).toBe(false);
  });

  it("rejects an absolute endpoint URL supplied as the route", () => {
    const parsed = LlmConnectionDraftSchema.safeParse(
      valid_draft({ route: "https://api.openai.com/v1/chat/completions" }),
    );
    expect(parsed.success).toBe(false);
  });

  it("has no field through which a plaintext credential could be submitted", () => {
    const keys = Object.keys(LlmConnectionDraftSchema.shape);
    expect(keys).not.toContain("api_key");
    expect(keys).not.toContain("credential_reference");
    expect(keys).not.toContain("headers");
    expect(keys).not.toContain("base_url");
    expect(keys).not.toContain("endpoint");
  });

  it("rejects unknown keys rather than passing them through to storage", () => {
    const parsed = LlmConnectionDraftSchema.safeParse(
      valid_draft({ api_key: "sk-live-not-a-reference" }),
    );
    expect(parsed.success).toBe(false);
  });

  it("rejects a blank display name and a blank model id", () => {
    expect(LlmConnectionDraftSchema.safeParse(valid_draft({ display_name: "  " })).success).toBe(
      false,
    );
    expect(LlmConnectionDraftSchema.safeParse(valid_draft({ model_id: "" })).success).toBe(false);
  });

  it("bounds temperature and output tokens", () => {
    expect(LlmConnectionDraftSchema.safeParse(valid_draft({ temperature: 5 })).success).toBe(false);
    expect(LlmConnectionDraftSchema.safeParse(valid_draft({ max_output_tokens: 0 })).success).toBe(
      false,
    );
  });
});

describe("LlmCredentialReferenceSchema", () => {
  it("accepts a derived reference", () => {
    const reference = derive_llm_credential_reference("default", CONNECTION_ID);
    expect(LlmCredentialReferenceSchema.safeParse(reference).success).toBe(true);
  });

  it("derives a stable, namespaced reference that carries no secret material", () => {
    const reference = derive_llm_credential_reference("default", CONNECTION_ID);
    expect(reference).toBe(`tavern_canvas:default:${CONNECTION_ID}:llm_profile_api_key`);
    expect(derive_llm_credential_reference("default", CONNECTION_ID)).toBe(reference);
  });

  it("rejects anything shaped like a raw provider key", () => {
    expect(LlmCredentialReferenceSchema.safeParse("sk-abc123").success).toBe(false);
    expect(LlmCredentialReferenceSchema.safeParse("Bearer abc123").success).toBe(false);
    expect(LlmCredentialReferenceSchema.safeParse("").success).toBe(false);
  });
});

describe("LlmConnectionProfileSchema", () => {
  it("carries only a credential reference, never a value", () => {
    const profile = {
      ...valid_draft(),
      credential_reference: derive_llm_credential_reference("default", CONNECTION_ID),
      created_at: NOW,
      updated_at: NOW,
    };
    const parsed = LlmConnectionProfileSchema.safeParse(profile);
    expect(parsed.success).toBe(true);
    expect(Object.keys(LlmConnectionProfileSchema.shape)).not.toContain("credential_value");
  });

  it("accepts a connection with no credential configured yet", () => {
    const parsed = LlmConnectionProfileSchema.safeParse({
      ...valid_draft(),
      credential_reference: null,
      created_at: NOW,
      updated_at: NOW,
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects a raw key stored in the reference field", () => {
    const parsed = LlmConnectionProfileSchema.safeParse({
      ...valid_draft(),
      credential_reference: "sk-live-abcdef",
      created_at: NOW,
      updated_at: NOW,
    });
    expect(parsed.success).toBe(false);
  });
});
