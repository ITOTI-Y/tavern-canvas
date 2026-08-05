export type ProviderHttpMethod = "GET" | "POST" | "DELETE";

export interface ProviderTransportOperation {
  readonly route: `/${string}`;
  readonly method: ProviderHttpMethod;
  readonly body?: Uint8Array;
  readonly content_type?: string;
  readonly accept?: string;
  readonly signal: AbortSignal;
}

export interface ProviderTransportResponse {
  readonly status: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: Uint8Array;
}

export interface ProviderTransport {
  execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse>;
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
