import type { SecretDestinationPort } from "../host/secret_destination.js";
import {
  bind_sillytavern_fetch,
  clone_request_headers,
  type SillyTavernFetch,
} from "./sillytavern_host.js";

export interface SillyTavernSecretContext {
  getRequestHeaders(): unknown;
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** `/api/secrets/view` returns the plaintext; only its type and length are checked, and it is never returned, stored, logged or put in an error. */
function has_active_secret(payload: unknown, reference: string): boolean {
  if (!is_record(payload)) {
    return false;
  }
  const value = payload[reference];
  return typeof value === "string" && value.length > 0;
}

/** Custom references use `/api/secrets/view` (needs `allowKeysExposure`) because `/api/secrets/read` enumerates built-in keys only; the value is reduced to a boolean immediately. */
export class SillyTavernSecretDestination implements SecretDestinationPort {
  readonly #context: SillyTavernSecretContext;
  readonly #fetch: SillyTavernFetch;

  constructor(context: SillyTavernSecretContext, fetch_: SillyTavernFetch) {
    this.#context = context;
    this.#fetch = bind_sillytavern_fetch(fetch_);
  }

  supports(_credential_kind: string): boolean {
    return true;
  }

  async write_secret(reference: string, plaintext_value: string): Promise<void> {
    const response = await this.#fetch("/api/secrets/write", {
      method: "POST",
      headers: clone_request_headers(this.#context.getRequestHeaders()),
      body: JSON.stringify({
        key: reference,
        value: plaintext_value,
        label: "Inkwell",
      }),
    });
    if (!response.ok) {
      throw new Error(`SillyTavern secret write failed with status ${String(response.status)}`);
    }
  }
  async delete_secret(reference: string): Promise<void> {
    const response = await this.#fetch("/api/secrets/delete", {
      method: "POST",
      headers: clone_request_headers(this.#context.getRequestHeaders()),
      body: JSON.stringify({ key: reference }),
    });
    if (!response.ok) {
      throw new Error(`SillyTavern secret deletion failed with status ${String(response.status)}`);
    }
  }

  async probe_secret(reference: string): Promise<boolean> {
    const response = await this.#fetch("/api/secrets/view", {
      method: "POST",
      headers: clone_request_headers(this.#context.getRequestHeaders()),
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      return false;
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      return false;
    }
    return has_active_secret(payload, reference);
  }
}

function looks_like_secret_context(value: unknown): value is SillyTavernSecretContext {
  return (
    ((typeof value === "object" && value !== null) || typeof value === "function") &&
    typeof (value as { getRequestHeaders?: unknown }).getRequestHeaders === "function"
  );
}

/** Returns `null` when no SillyTavern context is reachable. */
export function create_sillytavern_secret_destination(
  context: unknown,
  fetch_: unknown,
): SecretDestinationPort | null {
  if (!looks_like_secret_context(context) || typeof fetch_ !== "function") {
    return null;
  }
  return new SillyTavernSecretDestination(context, fetch_ as SillyTavernFetch);
}
