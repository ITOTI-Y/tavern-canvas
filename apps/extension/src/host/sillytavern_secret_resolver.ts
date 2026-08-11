import { VaultReferenceSchema } from "@tavern-canvas/contracts";

import {
  bind_sillytavern_fetch,
  clone_request_headers,
  type SillyTavernFetch,
} from "./sillytavern_host.js";
import type { SillyTavernSecretContext } from "./sillytavern_secret_destination.js";

export type SecretResolutionFailure =
  "invalid_reference" | "unsupported_host" | "not_exposed" | "not_found" | "unavailable";

/**
 * Never carries the resolved value, and never wraps the underlying failure as `cause`: the host
 * response body that failed may itself contain the plaintext, and an `Error` chain is exactly what
 * a diagnostics bundle serializes.
 */
export class SecretResolutionError extends Error {
  readonly code: SecretResolutionFailure;

  constructor(code: SecretResolutionFailure, message: string) {
    super(message);
    this.name = "SecretResolutionError";
    this.code = code;
  }
}

/**
 * Reads a credential back out of host secret storage by reference, for the one caller that needs
 * the value itself: a direct browser-to-vendor request, which has to put the credential in a
 * header. Deliberately a separate port from `SecretDestinationPort`, which stays write-and-probe
 * only, so "can store a secret" and "can read a secret back" remain independently grantable.
 */
export interface SecretResolverPort {
  resolve_secret(reference: string): Promise<string>;
}

const NOT_EXPOSED_MESSAGE =
  "SillyTavern refused to reveal the stored credential. Set allowKeysExposure to true in " +
  "config.yaml to allow direct provider calls, or route this profile through the Gateway instead.";

/**
 * Concrete `SecretResolverPort` over SillyTavern's `POST /api/secrets/view` route. The route is
 * gated by the host's `allowKeysExposure` setting and returns the active plaintext value for each
 * custom and built-in key. This resolver extracts only the value named by its requested vault
 * reference.
 */
export class SillyTavernSecretResolver implements SecretResolverPort {
  readonly #context: SillyTavernSecretContext;
  readonly #fetch: SillyTavernFetch;

  constructor(context: SillyTavernSecretContext, fetch_: SillyTavernFetch) {
    this.#context = context;
    this.#fetch = bind_sillytavern_fetch(fetch_);
  }

  async resolve_secret(reference: string): Promise<string> {
    if (!VaultReferenceSchema.safeParse(reference).success) {
      throw new SecretResolutionError(
        "invalid_reference",
        "A provider credential must be named by a tavern_canvas: vault reference",
      );
    }

    let response: { readonly ok: boolean; readonly status: number; json(): Promise<unknown> };
    try {
      response = await this.#fetch("/api/secrets/view", {
        method: "POST",
        headers: clone_request_headers(this.#context.getRequestHeaders()),
        body: JSON.stringify({}),
      });
    } catch {
      throw new SecretResolutionError("unavailable", "The host secret vault could not be reached");
    }

    if (!response.ok) {
      if (response.status === 403) {
        throw new SecretResolutionError("not_exposed", NOT_EXPOSED_MESSAGE);
      }
      if (response.status === 404) {
        throw new SecretResolutionError("not_found", "The host vault holds no such credential");
      }
      throw new SecretResolutionError(
        "unavailable",
        `The host secret vault answered with status ${String(response.status)}`,
      );
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new SecretResolutionError(
        "unavailable",
        "The host secret vault returned an unreadable response",
      );
    }
    let value: unknown;
    if (
      typeof payload === "object" &&
      payload !== null &&
      !Array.isArray(payload) &&
      reference in payload
    ) {
      value = Reflect.get(payload, reference);
    }
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new SecretResolutionError("not_found", "The host vault holds no such credential");
    }
    return value;
  }
}

function looks_like_secret_context(value: unknown): value is SillyTavernSecretContext {
  return (
    ((typeof value === "object" && value !== null) || typeof value === "function") &&
    typeof (value as { getRequestHeaders?: unknown }).getRequestHeaders === "function"
  );
}

export function create_sillytavern_secret_resolver(
  context: unknown,
  fetch_: unknown,
): SecretResolverPort | null {
  if (!looks_like_secret_context(context) || typeof fetch_ !== "function") {
    return null;
  }
  return new SillyTavernSecretResolver(context, fetch_ as SillyTavernFetch);
}
