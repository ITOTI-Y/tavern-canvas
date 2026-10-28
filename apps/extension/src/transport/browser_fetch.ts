import { ProviderNetworkError, type ProviderTransportResponse } from "@tavern-canvas/providers";

import { ProviderTransportBoundaryError } from "@tavern-canvas/providers";

export type ProviderFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export async function execute_bounded_fetch(
  fetch_: ProviderFetch,
  url: string,
  init: RequestInit,
  max_bytes: number,
): Promise<ProviderTransportResponse> {
  let response: Response;
  try {
    response = await fetch_(url, {
      ...init,
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
    });
  } catch (error) {
    if (init.signal?.aborted) {
      throw new DOMException("Provider request was aborted", "AbortError");
    }
    throw new ProviderNetworkError({ cause: error });
  }
  const content_length = Number(response.headers.get("content-length"));
  if (Number.isFinite(content_length) && content_length > max_bytes) {
    if (response.body !== null) {
      try {
        await response.body.cancel();
      } catch {
        // The size violation remains authoritative.
      }
    }
    throw new ProviderTransportBoundaryError(
      "malformed_response",
      "Provider response exceeds the byte limit",
    );
  }
  const body = await read_bounded_body(response.body, max_bytes, init.signal);
  return {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body,
  };
}

async function read_bounded_body(
  stream: ReadableStream<Uint8Array> | null,
  max_bytes: number,
  signal: AbortSignal | null | undefined,
): Promise<Uint8Array> {
  if (stream === null) {
    return new Uint8Array();
  }
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let byte_length = 0;
  let reached_eof = false;
  try {
    for (;;) {
      if (signal?.aborted === true) {
        throw new DOMException("Provider request was aborted", "AbortError");
      }
      const { done, value } = await reader.read();
      if (done) {
        reached_eof = true;
        break;
      }
      byte_length += value.byteLength;
      if (byte_length > max_bytes) {
        throw new ProviderTransportBoundaryError(
          "malformed_response",
          "Provider response exceeds the byte limit",
        );
      }
      chunks.push(value);
    }
  } catch (error) {
    if (signal?.aborted === true) {
      throw new DOMException("Provider request was aborted", "AbortError");
    }
    if (error instanceof ProviderTransportBoundaryError) {
      throw error;
    }
    throw new ProviderNetworkError({ cause: error });
  } finally {
    if (!reached_eof) {
      try {
        await reader.cancel();
      } catch {
        // The primary body read failure remains authoritative.
      }
    }
    reader.releaseLock();
  }

  const body = new Uint8Array(byte_length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}
