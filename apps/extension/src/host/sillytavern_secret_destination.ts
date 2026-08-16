import type { SecretCredentialKind } from "@tavern-canvas/v2-migration";

import type { SecretDestinationPort } from "../migration/secret_transfer.js";
import {
  bind_sillytavern_fetch,
  clone_request_headers,
  type SillyTavernFetch,
} from "./sillytavern_host.js";

/**
 * The narrow slice of `SillyTavernContextSurface` this adapter needs -- just enough to attach
 * the same CSRF header every other first-party SillyTavern call already sends.
 */
export interface SillyTavernSecretContext {
  getRequestHeaders(): unknown;
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * True when SillyTavern's `/api/secrets/view` response carries a non-empty active value for the
 * reference. The route returns a `Record<string, string>` in SillyTavern 1.18. The plaintext is
 * necessarily present in the response, but this adapter only checks its type and length and never
 * returns, stores, logs, or includes it in an error.
 */
function has_active_secret(payload: unknown, reference: string): boolean {
  if (!is_record(payload)) {
    return false;
  }
  const value = payload[reference];
  return typeof value === "string" && value.length > 0;
}

/**
 * Concrete `SecretDestinationPort` targeting SillyTavern's real secret vault
 * (`src/endpoints/secrets.js`). SillyTavern accepts arbitrary string keys for writes, but its
 * presence-only `/api/secrets/read` route enumerates built-in keys only. Custom TavernCanvas
 * references therefore use `/api/secrets/view`, which is available when `allowKeysExposure` is
 * enabled; this adapter reduces the returned value to a boolean immediately.
 */
export class SillyTavernSecretDestination implements SecretDestinationPort {
  readonly #context: SillyTavernSecretContext;
  readonly #fetch: SillyTavernFetch;

  constructor(context: SillyTavernSecretContext, fetch_: SillyTavernFetch) {
    this.#context = context;
    this.#fetch = bind_sillytavern_fetch(fetch_);
  }

  supports(_credential_kind: SecretCredentialKind): boolean {
    return true;
  }

  async write_secret(reference: string, plaintext_value: string): Promise<void> {
    const response = await this.#fetch("/api/secrets/write", {
      method: "POST",
      headers: clone_request_headers(this.#context.getRequestHeaders()),
      body: JSON.stringify({
        key: reference,
        value: plaintext_value,
        label: "TavernCanvas migrated credential",
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

/**
 * Detects a usable SillyTavern secrets context and returns a live adapter, or `null` when the
 * host doesn't expose one (e.g. no SillyTavern context reachable at all). `migration_runner`
 * already treats a `null` destination as `no_supported_destination` -- a blocked, user-actionable
 * outcome surfaced by the existing migration-status UI -- so this factory is the only integration
 * point a caller needs.
 */
export function create_sillytavern_secret_destination(
  context: unknown,
  fetch_: unknown,
): SecretDestinationPort | null {
  if (!looks_like_secret_context(context) || typeof fetch_ !== "function") {
    return null;
  }
  return new SillyTavernSecretDestination(context, fetch_ as SillyTavernFetch);
}
