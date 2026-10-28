import { ProviderTransportBoundaryError } from "@tavern-canvas/providers";
import {
  DirectRouteRejectedError,
  resolve_direct_url,
  type DirectRouteCatalogEntry,
} from "@tavern-canvas/contracts";
import {
  ProviderNetworkError,
  redact_provider_log,
  type ProviderLogSink,
  type ProviderRemoteAssetOperation,
  type ProviderTransport,
  type ProviderTransportOperation,
  type ProviderTransportResponse,
} from "@tavern-canvas/providers";

import type { SecretResolverPort } from "../host/sillytavern_secret_resolver.js";
import { execute_bounded_fetch, type ProviderFetch } from "./browser_fetch.js";
import { validate_provider_operation, validate_remote_operation } from "./provider_operations.js";

export interface DirectCloudTransportOptions {
  readonly catalog_entry: DirectRouteCatalogEntry;
  /** Names a host vault entry. Never a credential value, and never a URL or a header. */
  readonly credential_reference: string | null;
  readonly secrets: SecretResolverPort;
  readonly fetch?: ProviderFetch;
  readonly log?: ProviderLogSink;
}

/**
 * Reaches the vendor straight from the page. The origin and legal path set come from
 * `DirectRouteCatalogEntry`; the credential is a vault reference exchanged at call time. No parameter
 * accepts a URL, host, path or extra header.
 */
export class DirectCloudTransport implements ProviderTransport {
  readonly #entry: DirectRouteCatalogEntry;
  readonly #credential_reference: string | null;
  readonly #secrets: SecretResolverPort;
  readonly #fetch: ProviderFetch;
  readonly #log: ProviderLogSink | null;

  constructor(options: DirectCloudTransportOptions) {
    this.#entry = options.catalog_entry;
    this.#credential_reference = options.credential_reference;
    this.#secrets = options.secrets;
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.#log = options.log ?? null;
  }

  async execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    const validated = validate_provider_operation(operation);
    const url = resolve_catalog_url(this.#entry, validated.route);
    const headers = await build_headers(this.#entry, this.#credential_reference, this.#secrets, {
      ...(validated.content_type === undefined ? {} : { "content-type": validated.content_type }),
      ...(validated.accept === undefined ? {} : { accept: validated.accept }),
    });

    const started_at = Date.now();
    const response = await without_cause_chain(
      execute_bounded_fetch(
        this.#fetch,
        url,
        {
          method: validated.method,
          ...(validated.body === undefined ? {} : { body: new Uint8Array(validated.body).buffer }),
          headers,
          signal: validated.signal,
        },
        validated.max_response_bytes,
      ),
    );
    this.#log?.write(
      redact_provider_log({
        route: validated.route,
        method: validated.method,
        status_code: response.status,
        duration_ms: Date.now() - started_at,
        byte_length: response.body.byteLength,
        headers,
      }),
    );
    return response;
  }

  /** Result downloads carry their own signature, so no credential is attached; the profile's origin allowlist bounds the source. */
  async fetch_remote_asset(
    operation: ProviderRemoteAssetOperation,
  ): Promise<ProviderTransportResponse> {
    const validated = validate_remote_operation(operation);
    return execute_bounded_fetch(
      this.#fetch,
      validated.url,
      { method: "GET", signal: validated.signal },
      validated.max_bytes,
    );
  }
}

/** A `fetch` rejection can embed the request with its credential headers, so the cause chain is dropped instead of sanitized. */
async function without_cause_chain<TValue>(pending: Promise<TValue>): Promise<TValue> {
  try {
    return await pending;
  } catch (error) {
    if (error instanceof ProviderNetworkError) {
      throw new ProviderNetworkError();
    }
    throw error;
  }
}

function resolve_catalog_url(entry: DirectRouteCatalogEntry, route: string): string {
  try {
    return resolve_direct_url(entry, route);
  } catch (error) {
    if (error instanceof DirectRouteRejectedError) {
      throw new ProviderTransportBoundaryError("configuration", error.message);
    }
    throw error;
  }
}

/** Nothing outside this function contributes a header key. */
async function build_headers(
  entry: DirectRouteCatalogEntry,
  credential_reference: string | null,
  secrets: SecretResolverPort,
  negotiation: Readonly<Record<string, string>>,
): Promise<Record<string, string>> {
  const headers: Record<string, string> = { ...negotiation, ...entry.required_headers };
  if (entry.auth.kind === "none") {
    return headers;
  }
  if (credential_reference === null) {
    throw new ProviderTransportBoundaryError(
      "configuration",
      "This provider requires a stored credential; the active profile names no vault reference",
    );
  }

  let credential: string;
  try {
    credential = await secrets.resolve_secret(credential_reference);
  } catch (error) {
    throw new ProviderTransportBoundaryError("configuration", credential_failure_message(error));
  }
  headers[entry.auth.header] = entry.auth.kind === "bearer" ? `Bearer ${credential}` : credential;
  return headers;
}

/** Only vault-authored messages are surfaced; other thrown values may be built from a response body that carried the credential. */
function credential_failure_message(error: unknown): string {
  if (
    error instanceof Error &&
    error.name === "SecretResolutionError" &&
    error.message.trim() !== ""
  ) {
    return error.message;
  }
  return "The stored provider credential could not be resolved from the selected credential storage";
}
