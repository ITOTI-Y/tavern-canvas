import type {
  ProviderRemoteAssetOperation,
  ProviderTransportOperation,
  ProviderTransportResponse,
} from "@tavern-canvas/providers";
import { describe, expect, it } from "vitest";

import { LocalDirectTransport } from "./local_direct_transport.js";
import {
  ProviderTransportBoundaryError,
  validate_provider_operation,
  validate_remote_operation,
} from "./provider_operations.js";

const operation: ProviderTransportOperation = {
  route: "/v1/images/generations",
  method: "POST",
  body: new TextEncoder().encode("fixture"),
  max_request_bytes: 1_000_000,
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

describe("provider operation validation", () => {
  it("returns a canonical copy of a valid operation", () => {
    let method_reads = 0;
    const untrusted_operation = {
      ...operation,
      get method() {
        method_reads += 1;
        return method_reads === 1 ? "POST" : "TRACE";
      },
    };

    const validated = validate_provider_operation(untrusted_operation);

    expect(method_reads).toBe(1);
    expect(validated).not.toBe(untrusted_operation);
    expect(validated.method).toBe("POST");
  });

  it.each([
    null,
    { ...operation, max_request_bytes: 1 },
    { ...operation, method: "TRACE" },
    { ...operation, body: "not bytes" },
    { ...operation, max_request_bytes: 0 },
    { ...operation, max_request_bytes: Number.POSITIVE_INFINITY },
    (() => {
      const { max_request_bytes: _max_request_bytes, ...bodyless } = operation;
      return bodyless;
    })(),
    { ...operation, content_type: "text/plain\r\nx-injected: true" },
    { ...operation, signal: null },
  ])("rejects an untrusted outbound operation %#", (untrusted_operation) => {
    expect(() => validate_provider_operation(untrusted_operation)).toThrow(
      ProviderTransportBoundaryError,
    );
  });

  it("rejects a malformed remote operation or a URL outside its origin allowlist", () => {
    const remote_operation: ProviderRemoteAssetOperation = {
      url: "https://assets.example/image.png",
      allowed_origins: ["https://other.example"],
      max_bytes: 3,
      signal: new AbortController().signal,
    };

    expect(() => validate_remote_operation(null)).toThrow(ProviderTransportBoundaryError);
    expect(() => validate_remote_operation(remote_operation)).toThrow(
      ProviderTransportBoundaryError,
    );
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
