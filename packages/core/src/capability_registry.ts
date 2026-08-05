interface CapabilityEntry {
  readonly owner_module_id: string;
  readonly value: unknown;
}

export class CapabilityRegistry {
  readonly #entries = new Map<string, CapabilityEntry>();

  register<T>(capability_id: string, owner_module_id: string, value: T): void {
    const existing = this.#entries.get(capability_id);
    if (existing !== undefined) {
      throw new Error(
        `Capability "${capability_id}" is already owned by module "${existing.owner_module_id}"; module "${owner_module_id}" cannot register it`,
      );
    }

    this.#entries.set(capability_id, { owner_module_id, value });
  }

  has(capability_id: string): boolean {
    return this.#entries.has(capability_id);
  }

  get<T>(capability_id: string): T | undefined {
    return this.#entries.get(capability_id)?.value as T | undefined;
  }

  require<T>(capability_id: string): T {
    const entry = this.#entries.get(capability_id);
    if (entry === undefined) {
      throw new Error(`Required capability "${capability_id}" is not registered`);
    }

    return entry.value as T;
  }

  remove_by_owner(owner_module_id: string): void {
    for (const [capability_id, entry] of this.#entries) {
      if (entry.owner_module_id === owner_module_id) {
        this.#entries.delete(capability_id);
      }
    }
  }
}
