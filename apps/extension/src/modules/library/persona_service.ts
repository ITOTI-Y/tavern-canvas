import {
  PersonaProfileDraftSchema,
  PersonaProfileSchema,
  type PersonaProfile,
  type PersonaProfileDraft,
} from "@tavern-canvas/contracts";
import type { CharacterProfile, CharacterProfileRepository } from "@tavern-canvas/storage";

/**
 * Personas share the `character_profiles` store with character asset records, so every persona
 * row carries this discriminator and every read filters on it. A single store keeps the two
 * closely related shapes together without a database version bump, and the discriminator keeps
 * either reader from picking up the other's rows.
 */
const PERSONA_RECORD_KIND = "persona";

export type PersonasDomainEvent =
  | { readonly type: "persona_upserted"; readonly persona: PersonaProfile }
  | { readonly type: "persona_removed"; readonly persona_id: string };

export interface PersonaServiceDependencies {
  readonly repository: CharacterProfileRepository;
  readonly namespace: string;
  readonly clock: () => string;
}

export class UnknownPersonaError extends Error {
  readonly code = "unknown_persona";

  constructor(persona_id: string) {
    super(`Unknown persona "${persona_id}"`);
    this.name = "UnknownPersonaError";
  }
}

function is_persona_record(record: CharacterProfile): boolean {
  const payload = record.payload;
  return (
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload) &&
    payload.record_kind === PERSONA_RECORD_KIND
  );
}

function to_record(
  persona: PersonaProfile,
  namespace: string,
  created_at: string,
): CharacterProfile {
  return {
    schema_version: 1,
    id: persona.id,
    namespace,
    record_key: `${namespace}:${persona.id}`,
    created_at,
    updated_at: persona.updated_at,
    payload: {
      record_kind: PERSONA_RECORD_KIND,
      display_name: persona.display_name,
      role: persona.role,
      description: persona.description,
      greeting: persona.greeting,
      avatar_image_id: persona.avatar_image_id,
      is_active: persona.is_active,
    },
  };
}

function to_persona(record: CharacterProfile): PersonaProfile {
  const payload = (record.payload ?? {}) as Record<string, unknown>;
  return PersonaProfileSchema.parse({
    id: record.id,
    display_name: payload.display_name,
    role: payload.role,
    description: payload.description,
    greeting: payload.greeting,
    avatar_image_id: payload.avatar_image_id,
    is_active: payload.is_active,
    created_at: record.created_at,
    updated_at: record.updated_at,
  });
}

/** Persona CRUD over `character_profiles`. Active is exclusive per role, so a user persona and an
 * assistant persona can both be live while two assistants cannot. */
export class PersonaService {
  readonly #deps: PersonaServiceDependencies;
  readonly #listeners = new Set<(event: PersonasDomainEvent) => void>();

  constructor(dependencies: PersonaServiceDependencies) {
    this.#deps = dependencies;
  }

  subscribe(handler: (event: PersonasDomainEvent) => void): () => void {
    this.#listeners.add(handler);
    return () => {
      this.#listeners.delete(handler);
    };
  }

  async list(): Promise<readonly PersonaProfile[]> {
    const records = await this.#deps.repository.list(this.#deps.namespace);
    return records.filter(is_persona_record).map(to_persona);
  }

  async save(draft: PersonaProfileDraft): Promise<PersonaProfile> {
    const valid = PersonaProfileDraftSchema.parse(draft);
    const existing = await this.#read(valid.id);
    const now = this.#deps.clock();
    const persona: PersonaProfile = {
      ...valid,
      created_at: existing?.created_at ?? now,
      updated_at: now,
    };
    await this.#put(persona, persona.created_at);

    if (persona.is_active) {
      await this.#deactivate_other_roles(persona);
    }
    return persona;
  }

  async remove(persona_id: string): Promise<void> {
    await this.#require(persona_id);
    await this.#deps.repository.delete(this.#deps.namespace, persona_id);
    this.#emit({ type: "persona_removed", persona_id });
  }

  async #require(persona_id: string): Promise<PersonaProfile> {
    const persona = await this.#read(persona_id);
    if (persona === null) {
      throw new UnknownPersonaError(persona_id);
    }
    return persona;
  }

  async #read(persona_id: string): Promise<PersonaProfile | null> {
    const record = await this.#deps.repository.get(this.#deps.namespace, persona_id);
    if (record === null || !is_persona_record(record)) {
      return null;
    }
    return to_persona(record);
  }

  async #put(persona: PersonaProfile, created_at: string): Promise<void> {
    await this.#deps.repository.put(
      this.#deps.namespace,
      to_record(persona, this.#deps.namespace, created_at),
    );
    this.#emit({ type: "persona_upserted", persona });
  }

  async #deactivate_other_roles(kept: PersonaProfile): Promise<void> {
    for (const other of await this.list()) {
      if (other.id === kept.id || other.role !== kept.role || !other.is_active) {
        continue;
      }
      await this.#put(
        { ...other, is_active: false, updated_at: this.#deps.clock() },
        other.created_at,
      );
    }
  }

  #emit(event: PersonasDomainEvent): void {
    for (const listener of this.#listeners) {
      listener(event);
    }
  }
}
