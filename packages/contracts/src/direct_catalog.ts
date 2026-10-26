import { LLM_ROUTE_CATALOG, type LlmProviderKind } from "./llm_connection.js";
import type { ProviderId } from "./provider.js";

// Browser-direct calls may only reach origins and paths listed in this file; no setting or
// transport parameter can supply a URL, host, path or header.
export type DirectAuthScheme =
  | { readonly kind: "bearer"; readonly header: "authorization" }
  | { readonly kind: "api_key"; readonly header: "x-goog-api-key" | "x-api-key" }
  | { readonly kind: "none" };

export interface DirectRouteCatalogEntry {
  readonly origin: string;
  /** The complete set of paths this provider may be called on. Exact match, no prefixes. */
  readonly routes: readonly `/${string}`[];
  readonly auth: DirectAuthScheme;
  /** Vendor-required constants; never populated from client input. */
  readonly required_headers: Readonly<Record<string, string>>;
}

const NO_REQUIRED_HEADERS: Readonly<Record<string, string>> = Object.freeze({});

const BEARER: DirectAuthScheme = { kind: "bearer", header: "authorization" };

// `sd_webui` and `comfyui` are null: user-run loopback servers go through `LocalDirectTransport`,
// whose loopback check is what makes a user-supplied base URL safe.
export const DIRECT_IMAGE_ROUTE_CATALOG: Readonly<
  Record<ProviderId, DirectRouteCatalogEntry | null>
> = Object.freeze({
  sd_webui: null,
  comfyui: null,
  novelai: {
    origin: "https://image.novelai.net",
    routes: [
      "/ai/generate-image",
      "/ai/encode-vibe",
      "/ai/upscale",
      "/ai/augment-image",
      "/user/subscription",
    ],
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

// `openai_compatible` resolves to OpenAI itself: pointing it at an arbitrary server would be a
// user-supplied origin. `ollama` is a loopback daemon and takes no credential.
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

/** Carries no destination: echoing a rejected route would let attacker-supplied input into logs and error banners. */
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

/** Exact membership in `entry.routes`; prefixes, traversal, query strings and absolute URLs all fail. */
export function resolve_direct_url(entry: DirectRouteCatalogEntry, route: string): string {
  if (!(entry.routes as readonly string[]).includes(route)) {
    throw new DirectRouteRejectedError();
  }
  return `${entry.origin}${route}`;
}
