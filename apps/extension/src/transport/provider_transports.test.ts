import type {
  ProviderRemoteAssetOperation,
  ProviderTransportOperation,
  ProviderTransportResponse,
} from "@tavern-canvas/providers";
import { describe, expect, it, vi } from "vitest";

import { HostProxyTransport, ProviderTransportBoundaryError } from "./host_proxy_transport.js";
import { LocalDirectTransport } from "./local_direct_transport.js";
import { TauriTransport } from "./tauri_transport.js";

const operation: ProviderTransportOperation = {
  route: "/v1/images/generations",
  method: "POST",
  body: new TextEncoder().encode("fixture"),
  content_type: "application/json",
  accept: "application/json",
  max_response_bytes: 3,
  signal: new AbortController().signal,
};

const response: ProviderTransportResponse = {
  status: 200,
  headers: { "content-type": "application/json" },
  body: new TextEncoder().encode("ok"),
};

describe("host provider transports", () => {
  it("passes the byte limit through the host proxy boundary", async () => {
    const execute = vi.fn(() => Promise.resolve(response));
    const transport = new HostProxyTransport({
      execute_provider_request: execute,
    });

    await expect(transport.execute(operation)).resolves.toEqual(response);
    expect(execute).toHaveBeenCalledWith(operation);
  });

  it("rejects an oversized host proxy response", async () => {
    const transport = new HostProxyTransport({
      execute_provider_request: () =>
        Promise.resolve({
          ...response,
          body: new Uint8Array([1, 2, 3, 4]),
        }),
    });

    await expect(transport.execute(operation)).rejects.toBeInstanceOf(
      ProviderTransportBoundaryError,
    );
  });

  it.each([
    null,
    {
      status: 200,
      headers: { "content-type": 7 },
      body: new Uint8Array(),
    },
    {
      get status(): never {
        throw new Error("synthetic getter failure");
      },
      headers: {},
      body: new Uint8Array(),
    },
  ])("rejects an untrusted host response %#", async (untrusted_response) => {
    const transport = new HostProxyTransport({
      execute_provider_request: () => Promise.resolve(untrusted_response),
    });

    await expect(transport.execute(operation)).rejects.toBeInstanceOf(
      ProviderTransportBoundaryError,
    );
  });

  it.each([
    null,
    { ...operation, method: "TRACE" },
    { ...operation, body: "not bytes" },
    { ...operation, content_type: "text/plain\r\nx-injected: true" },
    { ...operation, signal: null },
  ])("rejects an untrusted outbound operation %#", async (untrusted_operation) => {
    const execute_provider_request = vi.fn(() => Promise.resolve(response));
    const transport = new HostProxyTransport({ execute_provider_request });

    await expect(execute_untrusted(transport, untrusted_operation)).rejects.toBeInstanceOf(
      ProviderTransportBoundaryError,
    );
    expect(execute_provider_request).not.toHaveBeenCalled();
  });

  it("passes a canonical operation instead of a caller-owned getter object", async () => {
    let method_reads = 0;
    const untrusted_operation = {
      ...operation,
      get method() {
        method_reads += 1;
        return method_reads === 1 ? "POST" : "TRACE";
      },
    };
    let received_operation: ProviderTransportOperation | undefined;
    const transport = new HostProxyTransport({
      execute_provider_request: (received) => {
        received_operation = received;
        return Promise.resolve(response);
      },
    });

    await expect(execute_untrusted(transport, untrusted_operation)).resolves.toEqual(response);
    expect(method_reads).toBe(1);
    expect(received_operation).not.toBe(untrusted_operation);
    expect(received_operation?.method).toBe("POST");
  });

  it("rejects a malformed remote operation before invoking the surface", async () => {
    const fetch_remote_asset = vi.fn(() => Promise.resolve(response));
    const transport = new HostProxyTransport({
      execute_provider_request: () => Promise.resolve(response),
      fetch_remote_asset,
    });

    await expect(fetch_remote_untrusted(transport, null)).rejects.toBeInstanceOf(
      ProviderTransportBoundaryError,
    );
    expect(fetch_remote_asset).not.toHaveBeenCalled();
  });

  it("rejects a remote URL outside its explicit origin allowlist", async () => {
    const fetch_remote_asset = vi.fn(() => Promise.resolve(response));
    const transport = new HostProxyTransport({
      execute_provider_request: () => Promise.resolve(response),
      fetch_remote_asset,
    });
    const remote_operation: ProviderRemoteAssetOperation = {
      url: "https://assets.example/image.png",
      allowed_origins: ["https://other.example"],
      max_bytes: 3,
      signal: new AbortController().signal,
    };

    await expect(transport.fetch_remote_asset(remote_operation)).rejects.toBeInstanceOf(
      ProviderTransportBoundaryError,
    );
    expect(fetch_remote_asset).not.toHaveBeenCalled();
  });

  it("uses the typed Tauri provider capability", async () => {
    const execute = vi.fn(() => Promise.resolve(response));
    const transport = new TauriTransport({ execute_provider_request: execute });

    await expect(transport.execute(operation)).resolves.toEqual(response);
    expect(execute).toHaveBeenCalledWith(operation);
  });
});

describe("LocalDirectTransport", () => {
  it("allows only loopback origins and composes relative provider routes", async () => {
    const requests: Request[] = [];
    const transport = new LocalDirectTransport({
      base_url: "http://127.0.0.1:7860",
      fetch: async (input, init) => {
        requests.push(new Request(input, init));
        return new Response("ok", {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    });

    await expect(transport.execute(operation)).resolves.toEqual(response);
    expect(requests[0]?.url).toBe("http://127.0.0.1:7860/v1/images/generations");
    expect(requests[0]?.credentials).toBe("omit");
    expect(requests[0]?.redirect).toBe("error");
  });

  it("cancels an oversized response stream", async () => {
    let stream_cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([1, 2, 3, 4]));
      },
      cancel() {
        stream_cancelled = true;
      },
    });
    const transport = new LocalDirectTransport({
      base_url: "http://127.0.0.1:7860",
      fetch: () =>
        Promise.resolve(
          new Response(body, {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        ),
    });

    await expect(transport.execute(operation)).rejects.toBeInstanceOf(
      ProviderTransportBoundaryError,
    );
    expect(stream_cancelled).toBe(true);
  });

  it.each([
    "http://192.168.1.10:7860",
    "https://provider.example",
    "http://localhost.example:7860",
  ])("rejects non-loopback base URL %s", (base_url) => {
    expect(() => new LocalDirectTransport({ base_url })).toThrow(ProviderTransportBoundaryError);
  });
});

function execute_untrusted(
  transport: HostProxyTransport,
  operation_: unknown,
): Promise<ProviderTransportResponse> {
  const execute = transport.execute as (value: unknown) => Promise<ProviderTransportResponse>;
  return execute.call(transport, operation_);
}

function fetch_remote_untrusted(
  transport: HostProxyTransport,
  operation_: unknown,
): Promise<ProviderTransportResponse> {
  const fetch_remote_asset = transport.fetch_remote_asset as (
    value: unknown,
  ) => Promise<ProviderTransportResponse>;
  return fetch_remote_asset.call(transport, operation_);
}
