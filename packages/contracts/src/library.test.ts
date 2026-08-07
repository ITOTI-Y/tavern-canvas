import { describe, expect, it } from "vitest";

import {
  KnowledgeRecordDraftSchema,
  KnowledgeRecordSchema,
  KnowledgeSourceTypeSchema,
  PersonaProfileDraftSchema,
  PersonaProfileSchema,
  PersonaRoleSchema,
} from "./library.js";

const ID = "11111111-1111-4111-8111-111111111111";
const IMAGE_ID = "22222222-2222-4222-8222-222222222222";
const NOW = "2026-08-07T00:00:00.000Z";

function persona_draft(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: ID,
    display_name: "Narrator",
    role: "assistant",
    description: "Calm, precise, keeps scenes moving.",
    greeting: "Where would you like to begin?",
    avatar_image_id: IMAGE_ID,
    is_active: true,
    ...overrides,
  };
}

function knowledge_draft(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: ID,
    title: "Harbor district",
    source_type: "manual",
    content: "The harbor district floods at every spring tide.",
    keywords: ["harbor", "tide"],
    priority: 10,
    enabled: true,
    ...overrides,
  };
}

describe("PersonaProfileDraftSchema", () => {
  it("accepts a well formed draft", () => {
    expect(PersonaProfileDraftSchema.safeParse(persona_draft()).success).toBe(true);
  });

  it("accepts a persona with no avatar", () => {
    expect(
      PersonaProfileDraftSchema.safeParse(persona_draft({ avatar_image_id: null })).success,
    ).toBe(true);
  });

  it("rejects a blank display name", () => {
    expect(PersonaProfileDraftSchema.safeParse(persona_draft({ display_name: " " })).success).toBe(
      false,
    );
  });

  it("rejects a role outside the enum", () => {
    expect(PersonaRoleSchema.safeParse("narrator").success).toBe(false);
    expect(PersonaProfileDraftSchema.safeParse(persona_draft({ role: "narrator" })).success).toBe(
      false,
    );
  });

  it("rejects an avatar given as a remote URL rather than a stored image id", () => {
    expect(
      PersonaProfileDraftSchema.safeParse(
        persona_draft({ avatar_image_id: "https://cdn.test/avatar.png" }),
      ).success,
    ).toBe(false);
  });

  it("rejects unknown keys", () => {
    expect(
      PersonaProfileDraftSchema.safeParse(persona_draft({ system_prompt_override: "x" })).success,
    ).toBe(false);
  });

  it("bounds description length", () => {
    expect(
      PersonaProfileDraftSchema.safeParse(persona_draft({ description: "x".repeat(9000) })).success,
    ).toBe(false);
  });
});

describe("PersonaProfileSchema", () => {
  it("carries bookkeeping timestamps on top of the draft fields", () => {
    const parsed = PersonaProfileSchema.safeParse({
      ...persona_draft(),
      created_at: NOW,
      updated_at: NOW,
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects a record with no timestamps", () => {
    expect(PersonaProfileSchema.safeParse(persona_draft()).success).toBe(false);
  });
});

describe("KnowledgeRecordDraftSchema", () => {
  it("accepts a well formed draft", () => {
    expect(KnowledgeRecordDraftSchema.safeParse(knowledge_draft()).success).toBe(true);
  });

  it("accepts every declared source type", () => {
    for (const source_type of KnowledgeSourceTypeSchema.options) {
      expect(KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ source_type })).success).toBe(
        true,
      );
    }
  });

  it("rejects a blank title and blank content", () => {
    expect(KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ title: "  " })).success).toBe(
      false,
    );
    expect(KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ content: "" })).success).toBe(
      false,
    );
  });

  it("rejects blank keywords and duplicate keywords", () => {
    expect(
      KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ keywords: ["harbor", " "] })).success,
    ).toBe(false);
    expect(
      KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ keywords: ["harbor", "harbor"] }))
        .success,
    ).toBe(false);
  });

  it("accepts an entry with no keywords", () => {
    expect(KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ keywords: [] })).success).toBe(
      true,
    );
  });

  it("bounds priority", () => {
    expect(KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ priority: -1 })).success).toBe(
      false,
    );
    expect(KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ priority: 1001 })).success).toBe(
      false,
    );
  });

  it("rejects unknown keys", () => {
    expect(
      KnowledgeRecordDraftSchema.safeParse(knowledge_draft({ fetch_url: "https://x.test" }))
        .success,
    ).toBe(false);
  });
});

describe("KnowledgeRecordSchema", () => {
  it("carries bookkeeping timestamps on top of the draft fields", () => {
    expect(
      KnowledgeRecordSchema.safeParse({ ...knowledge_draft(), created_at: NOW, updated_at: NOW })
        .success,
    ).toBe(true);
  });
});
