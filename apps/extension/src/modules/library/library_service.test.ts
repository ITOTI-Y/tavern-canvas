import "fake-indexeddb/auto";

import type { KnowledgeRecordDraft, PersonaProfileDraft } from "@tavern-canvas/contracts";
import {
  CharacterProfileRepository,
  DATABASE_NAME,
  KnowledgeEntryRepository,
  dispose_database,
  open_database,
} from "@tavern-canvas/storage";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { KnowledgeService } from "./knowledge_service.js";
import { PersonaService } from "./persona_service.js";

const NAMESPACE = "default";
const FIRST = "11111111-1111-4111-8111-111111111111";
const SECOND = "22222222-2222-4222-8222-222222222222";
const IMAGE_ID = "33333333-3333-4333-8333-333333333333";
const NOW = "2026-08-07T00:00:00.000Z";
const LATER = "2026-08-07T01:00:00.000Z";

function persona(overrides: Partial<PersonaProfileDraft> = {}): PersonaProfileDraft {
  return {
    id: FIRST,
    display_name: "Narrator",
    role: "assistant",
    description: "Calm, precise, keeps scenes moving.",
    greeting: "Where would you like to begin?",
    avatar_image_id: IMAGE_ID,
    is_active: true,
    ...overrides,
  } as PersonaProfileDraft;
}

function knowledge(overrides: Partial<KnowledgeRecordDraft> = {}): KnowledgeRecordDraft {
  return {
    id: FIRST,
    title: "Harbor district",
    source_type: "manual",
    content: "The harbor district floods at every spring tide.",
    keywords: ["harbor", "tide"],
    priority: 10,
    enabled: true,
    ...overrides,
  } as KnowledgeRecordDraft;
}

async function make_services(clock: () => string = () => NOW) {
  const database = await open_database();
  const personas = new PersonaService({
    repository: new CharacterProfileRepository(database),
    namespace: NAMESPACE,
    clock,
  });
  const knowledge_service = new KnowledgeService({
    repository: new KnowledgeEntryRepository(database),
    namespace: NAMESPACE,
    clock,
  });
  return { personas, knowledge: knowledge_service, database };
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("PersonaService", () => {
  it("creates, reads, updates, and deletes a persona", async () => {
    const { personas } = await make_services();

    const created = await personas.save(persona());
    expect(created.display_name).toBe("Narrator");
    expect(created.created_at).toBe(NOW);

    await personas.save(persona({ display_name: "Chronicler" }));
    const listed = await personas.list();
    expect(listed).toHaveLength(1);
    expect(listed[0]?.display_name).toBe("Chronicler");

    await personas.remove(FIRST);
    expect(await personas.list()).toHaveLength(0);
  });

  it("preserves created_at across updates while advancing updated_at", async () => {
    let now = NOW;
    const { personas } = await make_services(() => now);
    await personas.save(persona());
    now = LATER;

    const updated = await personas.save(persona({ display_name: "Chronicler" }));
    expect(updated.created_at).toBe(NOW);
    expect(updated.updated_at).toBe(LATER);
  });

  it("keeps at most one active persona per role", async () => {
    const { personas } = await make_services();
    await personas.save(persona());
    await personas.save(persona({ id: SECOND, display_name: "Second", is_active: true }));

    const active = (await personas.list()).filter((item) => item.is_active);
    expect(active.map((item) => item.id)).toEqual([SECOND]);
  });

  it("lets a user persona and an assistant persona both be active", async () => {
    const { personas } = await make_services();
    await personas.save(persona());
    await personas.save(
      persona({ id: SECOND, display_name: "Player", role: "user", is_active: true }),
    );

    const active = (await personas.list()).filter((item) => item.is_active);
    expect(active).toHaveLength(2);
  });

  it("rejects an invalid draft rather than writing a partial record", async () => {
    const { personas } = await make_services();
    await expect(personas.save(persona({ display_name: "   " }))).rejects.toThrow();
    expect(await personas.list()).toHaveLength(0);
  });

  it("rejects an avatar supplied as a URL", async () => {
    const { personas } = await make_services();
    await expect(
      personas.save(persona({ avatar_image_id: "https://cdn.test/a.png" as never })),
    ).rejects.toThrow();
  });

  it("rejects removing a persona that does not exist", async () => {
    const { personas } = await make_services();
    await expect(personas.remove(SECOND)).rejects.toThrow(/unknown/iu);
  });

  it("emits upsert and remove events, and stops after unsubscribe", async () => {
    const { personas } = await make_services();
    const events: string[] = [];
    const unsubscribe = personas.subscribe((event) => {
      events.push(event.type);
    });

    await personas.save(persona());
    await personas.remove(FIRST);
    unsubscribe();
    await personas.save(persona({ id: SECOND }));

    expect(events).toEqual(["persona_upserted", "persona_removed"]);
  });

  it("does not read character asset records as personas", async () => {
    const { personas, database } = await make_services();
    await new CharacterProfileRepository(database).create(NAMESPACE, {
      schema_version: 1,
      id: SECOND,
      namespace: NAMESPACE,
      record_key: `${NAMESPACE}:${SECOND}`,
      created_at: NOW,
      updated_at: NOW,
      payload: { record_kind: "character_asset", display_name: "Not a persona" },
    });
    await personas.save(persona());

    const listed = await personas.list();
    expect(listed.map((item) => item.id)).toEqual([FIRST]);
  });
});

describe("KnowledgeService", () => {
  it("creates, reads, updates, and deletes an entry", async () => {
    const { knowledge: service } = await make_services();

    await service.save(knowledge());
    expect((await service.list())[0]?.title).toBe("Harbor district");

    await service.save(knowledge({ title: "Harbor district (revised)", priority: 40 }));
    const listed = await service.list();
    expect(listed).toHaveLength(1);
    expect(listed[0]?.priority).toBe(40);

    await service.remove(FIRST);
    expect(await service.list()).toHaveLength(0);
  });

  it("orders entries by descending priority so the prompt budget drops the least important", async () => {
    const { knowledge: service } = await make_services();
    await service.save(knowledge({ priority: 5 }));
    await service.save(knowledge({ id: SECOND, title: "Second", priority: 90 }));

    expect((await service.list()).map((item) => item.id)).toEqual([SECOND, FIRST]);
  });

  it("indexes the entry by source type so a listing can filter without reading payloads", async () => {
    const { knowledge: service, database } = await make_services();
    await service.save(knowledge({ source_type: "imported" }));

    const raw = await new KnowledgeEntryRepository(database).get(NAMESPACE, FIRST);
    expect(raw?.source_type).toBe("imported");
  });

  it("toggles an entry without rewriting its other fields", async () => {
    const { knowledge: service } = await make_services();
    await service.save(knowledge());

    const toggled = await service.set_enabled(FIRST, false);
    expect(toggled.enabled).toBe(false);
    expect(toggled.content).toBe("The harbor district floods at every spring tide.");
  });

  it("removes several entries in one confirmed action", async () => {
    const { knowledge: service } = await make_services();
    await service.save(knowledge());
    await service.save(knowledge({ id: SECOND, title: "Second" }));

    await service.bulk_remove([FIRST, SECOND]);
    expect(await service.list()).toHaveLength(0);
  });

  it("rejects an invalid draft rather than writing a partial record", async () => {
    const { knowledge: service } = await make_services();
    await expect(service.save(knowledge({ content: "" }))).rejects.toThrow();
    expect(await service.list()).toHaveLength(0);
  });

  it("rejects duplicate keywords", async () => {
    const { knowledge: service } = await make_services();
    await expect(service.save(knowledge({ keywords: ["a", "a"] }))).rejects.toThrow();
  });

  it("rejects removing an entry that does not exist", async () => {
    const { knowledge: service } = await make_services();
    await expect(service.remove(SECOND)).rejects.toThrow(/unknown/iu);
  });

  it("emits upsert and remove events", async () => {
    const { knowledge: service } = await make_services();
    const events: string[] = [];
    service.subscribe((event) => {
      events.push(event.type);
    });

    await service.save(knowledge());
    await service.set_enabled(FIRST, false);
    await service.remove(FIRST);

    expect(events).toEqual(["entry_upserted", "entry_upserted", "entry_removed"]);
  });
});
