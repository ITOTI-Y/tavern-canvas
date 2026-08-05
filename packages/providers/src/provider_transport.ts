export type ProviderHttpMethod = "GET" | "POST" | "DELETE";

interface ProviderTransportOperationBase {
  readonly route: `/${string}`;
  readonly method: ProviderHttpMethod;
  readonly content_type?: string;
  readonly accept?: string;
  /** Enforced while reading and decompressing the response body. */
  readonly max_response_bytes: number;
  readonly signal: AbortSignal;
}

export type ProviderTransportOperation =
  | (ProviderTransportOperationBase & {
      readonly body: Uint8Array;
      /** Positive encoded request-body limit enforced before transport allocation. */
      readonly max_request_bytes: number;
    })
  | (ProviderTransportOperationBase & {
      readonly body?: undefined;
      readonly max_request_bytes?: undefined;
    });

/** Deliberate upper bound for any encoded provider request body. */
export const MAX_PROVIDER_REQUEST_BYTES = 200_000_000;
const MAX_PROVIDER_INPUT_BYTES = 100_000_000;
const PROVIDER_REQUEST_FIXED_OVERHEAD_BYTES = 1_000_000;

export function derive_provider_request_limit(max_input_asset_bytes: number): number {
  if (
    !Number.isSafeInteger(max_input_asset_bytes) ||
    max_input_asset_bytes <= 0 ||
    max_input_asset_bytes > MAX_PROVIDER_INPUT_BYTES
  ) {
    throw new TypeError("Provider input asset byte limit is invalid");
  }
  const base64_chunks = Math.ceil(max_input_asset_bytes / 3);
  const max_encoded_payload = MAX_PROVIDER_REQUEST_BYTES - PROVIDER_REQUEST_FIXED_OVERHEAD_BYTES;
  if (base64_chunks > Math.floor(max_encoded_payload / 4)) {
    return MAX_PROVIDER_REQUEST_BYTES;
  }
  return Math.min(
    MAX_PROVIDER_REQUEST_BYTES,
    base64_chunks * 4 + PROVIDER_REQUEST_FIXED_OVERHEAD_BYTES,
  );
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
