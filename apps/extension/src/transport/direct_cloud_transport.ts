import {
  DirectRouteRejectedError,
  direct_llm_catalog_entry,
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
import type {
  LlmTransportOperation,
  LlmTransportPort,
} from "../modules/llm/llm_connection_service.js";
import { execute_bounded_fetch, type ProviderFetch } from "./browser_fetch.js";
import {
  ProviderTransportBoundaryError,
  validate_provider_operation,
  validate_remote_operation,
} from "./host_proxy_transport.js";

export interface DirectCloudTransportOptions {
  readonly catalog_entry: DirectRouteCatalogEntry;
  /** Names a host vault entry. Never a credential value, and never a URL or a header. */
  readonly credential_reference: string | null;
  readonly secrets: SecretResolverPort;
  readonly fetch?: ProviderFetch;
  readonly log?: ProviderLogSink;
}

/**
 * A `ProviderTransport` that reaches the vendor straight from the page (user decision 2026-08-07,
 * taken after all three cloud vendors' CORS preflights were confirmed to allow a browser origin
 * with their documented auth header).
 *
 * What the client can decide is unchanged from the Gateway path: which stored profile is active,
 * and nothing else. The origin and the legal path set come from `DirectRouteCatalogEntry`, the
 * header set is built here from that entry, and the credential arrives as a vault reference that
 * is exchanged for a value at call time and dropped when the request is dispatched. There is no
 * parameter on this class, on its operations, or on the profile schema through which a URL, a
 * host, a path or an extra header could be supplied.
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

  /**
   * Provider-hosted result downloads (OpenAI returns temporary blob URLs). The credential is
   * deliberately absent: these URLs already carry their own signature, and the profile's origin
   * allowlist is what bounds where the bytes may come from.
   */
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

export interface DirectLlmTransportOptions {
  readonly secrets: SecretResolverPort;
  readonly fetch?: ProviderFetch;
}

/**
 * The text-LLM counterpart, on identical terms. Both the catalog entry and the credential
 * reference are chosen per operation rather than per transport: one host holds several text
 * connections, across different dialects, whose credentials are distinct vault entries.
 */
export class DirectLlmTransport implements LlmTransportPort {
  readonly #secrets: SecretResolverPort;
  readonly #fetch: ProviderFetch;

  constructor(options: DirectLlmTransportOptions) {
    this.#secrets = options.secrets;
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
  }

  async execute(
    operation: LlmTransportOperation,
  ): Promise<{ readonly status: number; readonly body: Uint8Array }> {
    const entry = direct_llm_catalog_entry(operation.provider_kind);
    if (entry === null) {
      throw new ProviderTransportBoundaryError(
        "configuration",
        "This LLM dialect has no direct route catalog entry",
      );
    }
    const url = resolve_catalog_url(entry, operation.route);
    const headers = await build_headers(
      entry,
      operation.credential_reference,
      this.#secrets,
      operation.body === undefined
        ? { accept: "application/json" }
        : { "content-type": "application/json", accept: "application/json" },
    );
    const response = await without_cause_chain(
      execute_bounded_fetch(
        this.#fetch,
        url,
        {
          method: operation.method,
          ...(operation.body === undefined ? {} : { body: new Uint8Array(operation.body).buffer }),
          headers,
          signal: operation.signal,
        },
        operation.max_response_bytes,
      ),
    );
    return { status: response.status, body: response.body };
  }
}

/**
 * A direct request carries the credential in its own headers, so whatever `fetch` throws was
 * raised while holding it -- a wrapped or instrumented `fetch` can put the request, headers and
 * all, into the message it rejects with. `ProviderNetworkError` would then carry that as `cause`
 * straight into a support bundle. The network failure itself is the whole diagnostic signal here,
 * so the chain is dropped rather than sanitized.
 */
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

/**
 * The complete outgoing header set: content negotiation the adapter asked for, the vendor
 * constants the catalog names, and one auth header. `Object.freeze` is not the guard here -- the
 * guard is that nothing outside this function contributes a key.
 */
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

/**
 * A vault failure is reported by its own message only when the vault itself authored it (those are
 * fixed strings written to be shown to a user). Anything else is summarized, because an arbitrary
 * thrown value may have been built from the response body that carried the credential.
 */
function credential_failure_message(error: unknown): string {
  if (
    error instanceof Error &&
    error.name === "SecretResolutionError" &&
    error.message.trim() !== ""
  ) {
    return error.message;
  }
  return "The stored provider credential could not be resolved from host secret storage";
}
