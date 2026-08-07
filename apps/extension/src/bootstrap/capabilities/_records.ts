import type { JsonValue, NamespacedRecord } from "@tavern-canvas/storage";

import type { Unsubscribe } from "../../ui/contracts/ui_capabilities.js";

/**
 * Every business store shares one namespaced envelope (`schema_version`/`id`/`namespace`/
 * `record_key`/`created_at`/`updated_at`/`payload`); only the `payload` differs per domain. These
 * helpers are the single place that reads an opaque payload back out into typed UI fields.
 */
export type RecordPayload = Readonly<Record<string, unknown>>;

export function as_record(value: unknown): RecordPayload {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }
  return value as RecordPayload;
}

export function read_payload(record: NamespacedRecord): RecordPayload {
  return as_record(record.payload);
}

export function read_string(payload: RecordPayload, key: string, fallback: string): string {
  const value = payload[key];
  return typeof value === "string" ? value : fallback;
}

export function read_optional_string(payload: RecordPayload, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" ? value : null;
}

export function read_boolean(payload: RecordPayload, key: string, fallback: boolean): boolean {
  const value = payload[key];
  return typeof value === "boolean" ? value : fallback;
}

export function read_number(payload: RecordPayload, key: string, fallback: number): number {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function read_array(payload: RecordPayload, key: string): readonly unknown[] {
  const value = payload[key];
  return Array.isArray(value) ? value : [];
}

/**
 * Narrows an arbitrary UI-supplied value to the `JsonValue` the storage schemas accept, dropping
 * anything that cannot round-trip (functions, symbols, non-finite numbers, cycles). Rejecting at
 * the boundary keeps a `RepositoryValidationError` from surfacing as an opaque command failure.
 */
export function to_json_value(value: unknown, seen: ReadonlySet<object> = new Set()): JsonValue {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value !== "object") {
    return null;
  }
  if (seen.has(value)) {
    throw new TypeError("Record payload contains a cycle");
  }
  const next_seen = new Set(seen).add(value);
  if (Array.isArray(value)) {
    return value.map((entry) => to_json_value(entry, next_seen));
  }
  const result: Record<string, JsonValue> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry !== undefined) {
      result[key] = to_json_value(entry, next_seen);
    }
  }
  return result;
}

/** Minimal synchronous fan-out shared by every capability that owns a domain event stream. */
export class DomainEventEmitter<TEvent> {
  readonly #listeners = new Set<(event: TEvent) => void>();

  subscribe(handler: (event: TEvent) => void): Unsubscribe {
    this.#listeners.add(handler);
    return () => {
      this.#listeners.delete(handler);
    };
  }

  emit(event: TEvent): void {
    for (const listener of [...this.#listeners]) {
      listener(event);
    }
  }
}
