export type ProviderHttpMethod = "GET" | "POST" | "DELETE";

export interface ProviderTransportOperation {
  readonly route: `/${string}`;
  readonly method: ProviderHttpMethod;
  readonly body?: Uint8Array;
  readonly content_type?: string;
  readonly accept?: string;
  /** Enforced while reading and decompressing the response body. */
  readonly max_response_bytes: number;
  readonly signal: AbortSignal;
}

export interface ProviderRemoteAssetOperation {
  readonly url: string;
  readonly allowed_origins: readonly string[];
  readonly max_bytes: number;
  readonly signal: AbortSignal;
}

export interface ProviderTransportResponse {
  readonly status: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: Uint8Array;
}

export interface ProviderTransport {
  execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse>;
  fetch_remote_asset?(operation: ProviderRemoteAssetOperation): Promise<ProviderTransportResponse>;
}

export function assert_provider_route(route: string): asserts route is `/${string}` {
  if (
    !route.startsWith("/") ||
    route.startsWith("//") ||
    route.includes("\\") ||
    route.includes("#") ||
    route.split(/[/?]/u).includes("..") ||
    /^[a-z][a-z0-9+.-]*:/iu.test(route)
  ) {
    throw new TypeError("Provider transport route must be a relative absolute-path reference");
  }
}
