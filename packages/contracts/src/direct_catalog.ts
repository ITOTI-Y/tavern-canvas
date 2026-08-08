import { LLM_ROUTE_CATALOG, type LlmProviderKind } from "./llm_connection.js";
import type { ProviderId } from "./provider.js";

/**
 * Where a browser-direct provider call is allowed to land.
 *
 * The v3 red line is that a client may never name a destination. Direct browser-to-vendor calls
 * (user decision 2026-08-07) keep that rule intact by moving the destination into this file: the
 * user picks a provider profile, the profile names a `ProviderId` or `LlmProviderKind`, and the
 * origin, the exact allowed paths, and the auth header shape all come from here. There is no
 * settings field, no draft schema and no transport parameter through which a URL, a host, a path
 * or a header could be supplied, which is what `direct_catalog.test.ts` pins down.
 */
export type DirectAuthScheme =
  | { readonly kind: "bearer"; readonly header: "authorization" }
  | { readonly kind: "api_key"; readonly header: "x-goog-api-key" | "x-api-key" }
  | { readonly kind: "none" };

export interface DirectRouteCatalogEntry {
  /** Exact normalized origin: scheme + host + optional port, never a path or query. */
  readonly origin: string;
  /** The complete set of paths this provider may be called on. Exact match, no prefixes. */
  readonly routes: readonly `/${string}`[];
  readonly auth: DirectAuthScheme;
  /**
   * Vendor-documented constants the request must carry beyond auth and content negotiation. Only
   * this file may populate it; no client input reaches these values.
   */
  readonly required_headers: Readonly<Record<string, string>>;
}

const NO_REQUIRED_HEADERS: Readonly<Record<string, string>> = Object.freeze({});

const BEARER: DirectAuthScheme = { kind: "bearer", header: "authorization" };

/**
 * Image providers reachable directly from the page.
 *
 * `sd_webui` and `comfyui` are deliberately `null`: they are user-run loopback servers with no
 * fixed public origin, so they keep going through `LocalDirectTransport`, whose loopback check is
 * what makes a user-supplied base URL safe there.
 *
 * NovelAI (`https://image.novelai.net/ai/generate-image`, `Authorization: Bearer`), OpenAI
 * (`https://api.openai.com/v1/images/{generations,edits}`, `Authorization: Bearer`) and Google's
 * Interactions API (`https://generativelanguage.googleapis.com/v1beta/interactions`,
 * `x-goog-api-key`) are the three vendors whose CORS preflights were probed on 2026-08-07 and
 * found to allow a browser origin with the auth header named here.
 */
export const DIRECT_IMAGE_ROUTE_CATALOG: Readonly<
  Record<ProviderId, DirectRouteCatalogEntry | null>
> = Object.freeze({
  sd_webui: null,
  comfyui: null,
  novelai: {
    origin: "https://image.novelai.net",
    routes: ["/ai/generate-image"],
    auth: BEARER,
    required_headers: NO_REQUIRED_HEADERS,
  },
  openai_image: {
    origin: "https://api.openai.com",
    routes: ["/v1/images/generations", "/v1/images/edits"],
    auth: BEARER,
    required_headers: NO_REQUIRED_HEADERS,
  },
  google_image: {
    origin: "https://generativelanguage.googleapis.com",
    routes: ["/v1beta/interactions"],
    auth: { kind: "api_key", header: "x-goog-api-key" },
    required_headers: NO_REQUIRED_HEADERS,
  },
});

function llm_routes(kind: LlmProviderKind): readonly `/${string}`[] {
  const catalog = LLM_ROUTE_CATALOG[kind];
  return Object.freeze([...catalog.completion_routes, catalog.models_route]);
}

/**
 * Text-LLM dialects reachable directly from the page, on the same terms as the image catalog.
 *
 * `openai_compatible` resolves to OpenAI itself: the dialect names a wire format, and pointing it
 * at an arbitrary compatible server would be exactly the user-supplied origin the red line
 * forbids. `google_generative` stays entirely on the OpenAI-compatibility surface so one Bearer
 * key covers both its completion and its model-listing route. `anthropic` carries the two
 * constants its API requires from a browser: the version pin and the SDK's documented
 * direct-browser-access opt-in. `ollama` is a loopback daemon and takes no credential at all.
 */
export const DIRECT_LLM_ROUTE_CATALOG: Readonly<
  Record<LlmProviderKind, DirectRouteCatalogEntry | null>
> = Object.freeze({
  openai_compatible: {
    origin: "https://api.openai.com",
    routes: llm_routes("openai_compatible"),
    auth: BEARER,
    required_headers: NO_REQUIRED_HEADERS,
  },
  anthropic: {
    origin: "https://api.anthropic.com",
    routes: llm_routes("anthropic"),
    auth: { kind: "api_key", header: "x-api-key" },
    required_headers: Object.freeze({
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    }),
  },
  google_generative: {
    origin: "https://generativelanguage.googleapis.com",
    routes: llm_routes("google_generative"),
    auth: BEARER,
    required_headers: NO_REQUIRED_HEADERS,
  },
  ollama: {
    origin: "http://127.0.0.1:11434",
    routes: llm_routes("ollama"),
    auth: { kind: "none" },
    required_headers: NO_REQUIRED_HEADERS,
  },
});

/**
 * Carries no destination. A rejected route is attacker- or bug-supplied input, and echoing it back
 * would turn every log line and error banner into a channel for whatever the caller wanted printed.
 */
export class DirectRouteRejectedError extends Error {
  readonly code = "direct_route_rejected";

  constructor() {
    super("The requested destination is not in the provider route catalog");
    this.name = "DirectRouteRejectedError";
  }
}

export function direct_image_catalog_entry(
  provider_id: ProviderId,
): DirectRouteCatalogEntry | null {
  return DIRECT_IMAGE_ROUTE_CATALOG[provider_id];
}

export function direct_llm_catalog_entry(kind: LlmProviderKind): DirectRouteCatalogEntry | null {
  return DIRECT_LLM_ROUTE_CATALOG[kind];
}

/**
 * The only way a direct transport can obtain a URL. Exact membership in `entry.routes`, so a
 * prefix, a traversal segment, a query string or an absolute URL all fail the same way.
 */
export function resolve_direct_url(entry: DirectRouteCatalogEntry, route: string): string {
  if (!(entry.routes as readonly string[]).includes(route)) {
    throw new DirectRouteRejectedError();
  }
  return `${entry.origin}${route}`;
}
