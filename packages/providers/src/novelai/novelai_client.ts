import { parse_novelai_subscription, type NovelAiAccountStatus } from "@tavern-canvas/contracts";

import { encode_base64, invalid_request, malformed_response } from "../image_bytes.js";
import { ProviderAdapterError, provider_error_from_status } from "../provider_error.js";
import type { ProviderTransport, ProviderTransportResponse } from "../provider_transport.js";

const MAX_ACCOUNT_RESPONSE_BYTES = 64 * 1024;
const MAX_VIBE_RESPONSE_BYTES = 8 * 1024 * 1024;

export interface NovelAiVibeEncodingRequest {
  readonly image: Uint8Array;
  /** The generation model the encoding is for; encodings are not interchangeable between models. */
  readonly model_id: string;
  readonly information_extracted: number;
  readonly max_request_bytes: number;
  readonly signal: AbortSignal;
}

function require_success(response: ProviderTransportResponse): void {
  if (response.status < 200 || response.status >= 300) {
    throw new ProviderAdapterError(
      provider_error_from_status(response.status, { recoverable: false }),
    );
  }
}

export async function fetch_novelai_account(
  transport: ProviderTransport,
  signal: AbortSignal,
): Promise<NovelAiAccountStatus> {
  const response = await transport.execute({
    route: "/user/subscription",
    method: "GET",
    accept: "application/json",
    max_response_bytes: MAX_ACCOUNT_RESPONSE_BYTES,
    signal,
  });
  require_success(response);
  try {
    return parse_novelai_subscription(JSON.parse(new TextDecoder().decode(response.body)));
  } catch {
    throw malformed_response();
  }
}

/** Each call is billed; callers cache the result per image, model and information_extracted. */
export async function encode_novelai_vibe(
  transport: ProviderTransport,
  request: NovelAiVibeEncodingRequest,
): Promise<string> {
  if (request.image.byteLength === 0) {
    throw invalid_request();
  }
  const body = new TextEncoder().encode(
    JSON.stringify({
      image: encode_base64(request.image),
      information_extracted: request.information_extracted,
      model: request.model_id,
    }),
  );
  const response = await transport.execute({
    route: "/ai/encode-vibe",
    method: "POST",
    body,
    max_request_bytes: request.max_request_bytes,
    content_type: "application/json",
    accept: "application/octet-stream",
    max_response_bytes: MAX_VIBE_RESPONSE_BYTES,
    signal: request.signal,
  });
  require_success(response);
  if (response.body.byteLength === 0) {
    throw malformed_response();
  }
  return encode_base64(response.body);
}
