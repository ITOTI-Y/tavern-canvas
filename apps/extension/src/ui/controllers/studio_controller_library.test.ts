import type {
  KnowledgeRecord,
  KnowledgeRecordDraft,
  PersonaProfile,
  PersonaProfileDraft,
  Uuid,
} from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import type {
  KnowledgeCapability,
  KnowledgeDomainEvent,
  PersonasCapability,
  PersonasDomainEvent,
  StudioCapabilities,
} from "../contracts/ui_capabilities.js";
import { create_studio_controller } from "./studio_controller.js";
import { create_unavailable_capabilities } from "./unavailable_capabilities.js";

const PERSONA_ID = "11111111-1111-4111-8111-111111111111" as Uuid;
const OTHER_PERSONA_ID = "22222222-2222-4222-8222-222222222222" as Uuid;
const ENTRY_ID = "33333333-3333-4333-8333-333333333333" as Uuid;
const OTHER_ENTRY_ID = "44444444-4444-4444-8444-444444444444" as Uuid;
const NOW = "2026-08-07T00:00:00.000Z";

function persona(overrides: Partial<PersonaProfile> = {}): PersonaProfile {
  return {
    id: PERSONA_ID,
    display_name: "Narrator",
    role: "assistant",
    description: "Calm and precise.",
    greeting: "Where to?",
    avatar_image_id: null,
    is_active: true,
    created_at: NOW,
    updated_at: NOW,
    ...overrides,
  };
}

function entry(overrides: Partial<KnowledgeRecord> = {}): KnowledgeRecord {
  return {
    id: ENTRY_ID,
    title: "Harbor district",
    source_type: "manual",
    content: "Floods at spring tide.",
    keywords: ["harbor"],
    priority: 10,
    enabled: true,
    created_at: NOW,
    updated_at: NOW,
    ...overrides,
  };
}

function build_capabilities() {
  let persona_handler: ((event: PersonasDomainEvent) => void) | null = null;
  let knowledge_handler: ((event: KnowledgeDomainEvent) => void) | null = null;

  const personas: PersonasCapability = {
    load: vi.fn(() => Promise.resolve([persona()])),
    subscribe: vi.fn((handler: (event: PersonasDomainEvent) => void) => {
      persona_handler = handler;
      return () => {
        persona_handler = null;
      };
    }),
    save: vi.fn((draft: PersonaProfileDraft) => Promise.resolve(persona(draft))),
    remove: vi.fn(() => Promise.resolve()),
  };

  const knowledge: KnowledgeCapability = {
    load: vi.fn(() => Promise.resolve([entry()])),
    subscribe: vi.fn((handler: (event: KnowledgeDomainEvent) => void) => {
      knowledge_handler = handler;
      return () => {
        knowledge_handler = null;
      };
    }),
    save: vi.fn((draft: KnowledgeRecordDraft) => Promise.resolve(entry(draft))),
    set_enabled: vi.fn((entry_id: Uuid, enabled: boolean) =>
      Promise.resolve(entry({ id: entry_id, enabled })),
    ),
    remove: vi.fn(() => Promise.resolve()),
    bulk_remove: vi.fn(() => Promise.resolve()),
  };

  return {
    capabilities: {
      ...create_unavailable_capabilities(),
      personas,
      knowledge,
    } as StudioCapabilities,
    personas,
    knowledge,
    emit_persona: (event: PersonasDomainEvent) => persona_handler?.(event),
    emit_entry: (event: KnowledgeDomainEvent) => knowledge_handler?.(event),
  };
}

describe("StudioController: personas", () => {
  it("loads personas into their own slice", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    expect(controller.state.library.personas).toHaveLength(1);
    expect(controller.state.failures.has("personas")).toBe(false);
  });

  it("records a stable failure code when the load rejects", async () => {
    const { capabilities, personas } = build_capabilities();
    vi.mocked(personas.load).mockRejectedValueOnce(
      Object.assign(new Error("nope"), { code: "personas_unavailable" }),
    );
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    expect(controller.state.failures.get("personas")).toEqual({ code: "personas_unavailable" });
  });

  it("upserts a saved persona and drops a removed one", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    await controller.save_persona({
      id: OTHER_PERSONA_ID,
      display_name: "Player",
      role: "user",
      description: "",
      greeting: "",
      avatar_image_id: null,
      is_active: false,
    });
    expect(controller.state.library.personas).toHaveLength(2);

    await controller.remove_persona(PERSONA_ID);
    expect(controller.state.library.personas.map((item) => item.id)).toEqual([OTHER_PERSONA_ID]);
  });

  it("keeps activation exclusive within a role when a persona is promoted", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    await controller.save_persona({
      id: OTHER_PERSONA_ID,
      display_name: "Chronicler",
      role: "assistant",
      description: "",
      greeting: "",
      avatar_image_id: null,
      is_active: true,
    });

    const active = controller.state.library.personas.filter((item) => item.is_active);
    expect(active.map((item) => item.id)).toEqual([OTHER_PERSONA_ID]);
  });

  it("applies persona events raised outside its own commands", async () => {
    const { capabilities, emit_persona } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    emit_persona({ type: "persona_removed", persona_id: PERSONA_ID });
    expect(controller.state.library.personas).toHaveLength(0);
  });
});

describe("StudioController: knowledge", () => {
  it("loads knowledge entries into their own slice", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    expect(controller.state.library.knowledge).toHaveLength(1);
  });

  it("upserts a saved entry and drops a removed one", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    await controller.save_knowledge_entry({
      id: OTHER_ENTRY_ID,
      title: "Second",
      source_type: "manual",
      content: "Body",
      keywords: [],
      priority: 0,
      enabled: true,
    });
    expect(controller.state.library.knowledge).toHaveLength(2);

    await controller.remove_knowledge_entry(ENTRY_ID);
    expect(controller.state.library.knowledge.map((item) => item.id)).toEqual([OTHER_ENTRY_ID]);
  });

  it("toggles an entry through the capability and reflects the result", async () => {
    const { capabilities, knowledge } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    await controller.set_knowledge_entry_enabled(ENTRY_ID, false);

    expect(knowledge.set_enabled).toHaveBeenCalledWith(ENTRY_ID, false);
    expect(controller.state.library.knowledge[0]?.enabled).toBe(false);
  });

  it("removes a multi-selection in one command and clears the selection", async () => {
    const { capabilities, knowledge } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();
    controller.set_knowledge_selection([ENTRY_ID]);

    await controller.bulk_remove_knowledge_entries([ENTRY_ID]);

    expect(knowledge.bulk_remove).toHaveBeenCalledWith([ENTRY_ID]);
    expect(controller.state.library.knowledge).toHaveLength(0);
    expect(controller.state.library.selected_knowledge_ids).toEqual([]);
  });

  it("tracks a multi-selection without touching the capability", async () => {
    const { capabilities, knowledge } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    controller.set_knowledge_selection([ENTRY_ID, OTHER_ENTRY_ID]);

    expect(controller.state.library.selected_knowledge_ids).toEqual([ENTRY_ID, OTHER_ENTRY_ID]);
    expect(knowledge.bulk_remove).not.toHaveBeenCalled();
  });

  it("applies knowledge events raised outside its own commands", async () => {
    const { capabilities, emit_entry } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    emit_entry({ type: "entry_upserted", entry: entry({ id: OTHER_ENTRY_ID, title: "Second" }) });
    expect(controller.state.library.knowledge).toHaveLength(2);

    emit_entry({ type: "entry_removed", entry_id: ENTRY_ID });
    expect(controller.state.library.knowledge.map((item) => item.id)).toEqual([OTHER_ENTRY_ID]);
  });
});
