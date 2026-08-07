import type { SecretCredentialKind } from "@tavern-canvas/v2-migration";

import type { SecretDestinationPort } from "../migration/secret_transfer.js";
import { clone_request_headers, type SillyTavernFetch } from "./sillytavern_host.js";

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
 * True when `payload[reference]` is SillyTavern's `SecretState[]` shape with at least one
 * `active` entry. Deliberately reads no field but `active`: the sibling `value` field in that
 * response is masked by default and unmasked only if the host's `allowKeysExposure` config is
 * on, but this adapter must never depend on that config either way, so it never looks at
 * `value` at all -- presence-and-active is the entire signal.
 */
function has_active_secret(payload: unknown, reference: string): boolean {
  if (!is_record(payload)) {
    return false;
  }
  const entries = payload[reference];
  if (!Array.isArray(entries)) {
    return false;
  }
  return entries.some((entry) => is_record(entry) && entry.active === true);
}

/**
 * Concrete `SecretDestinationPort` targeting SillyTavern's real secret vault
 * (`src/endpoints/secrets.js`, `SecretManager`): `/api/secrets/write` stores a value under an
 * arbitrary string key (deactivating any prior entry for that key, never deleting it), and
 * `/api/secrets/read` returns only presence/active state -- masked values, never plaintext,
 * regardless of the host's `allowKeysExposure` config. `derive_secret_reference`'s namespaced
 * string becomes that key; SillyTavern's own `SECRET_KEYS` enum is just a client-side
 * convenience list, not a server-enforced allowlist, so every v2 credential kind fits.
 */
export class SillyTavernSecretDestination implements SecretDestinationPort {
  readonly #context: SillyTavernSecretContext;
  readonly #fetch: SillyTavernFetch;

  constructor(context: SillyTavernSecretContext, fetch_: SillyTavernFetch) {
    this.#context = context;
    this.#fetch = fetch_;
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

  async probe_secret(reference: string): Promise<boolean> {
    const response = await this.#fetch("/api/secrets/read", {
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
