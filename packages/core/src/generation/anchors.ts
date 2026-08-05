import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";

import { canonical_json } from "./canonical_json.js";
import type { SourceContext } from "./source_context.js";

export interface RandomSource {
  bytes(length: number): Uint8Array;
}

export interface SecureCryptoSource {
  getRandomValues<T extends ArrayBufferView>(array: T): T;
}

export interface GenerationAnchors {
  readonly source_anchor: string;
  readonly generation_anchor: string;
}

export class BrowserRandomSource implements RandomSource {
  readonly #crypto_source: SecureCryptoSource;

  constructor(crypto_source: SecureCryptoSource | undefined) {
    if (crypto_source === undefined || typeof crypto_source.getRandomValues !== "function") {
      throw new Error("Secure random generation is unavailable");
    }
    this.#crypto_source = crypto_source;
  }

  bytes(length: number): Uint8Array {
    if (!Number.isInteger(length) || length < 1 || length > 65_536) {
      throw new RangeError("Secure random byte length must be between 1 and 65536");
    }
    const bytes = new Uint8Array(length);
    this.#crypto_source.getRandomValues(bytes);
    return bytes;
  }
}

function sha256_hex(value: string): string {
  return bytesToHex(sha256(utf8ToBytes(value)));
}

export function create_generation_anchors(
  source_context: SourceContext,
  random_source: RandomSource,
): GenerationAnchors {
  const source_anchor = sha256_hex(canonical_json(source_context));
  const invocation_bytes = random_source.bytes(32);
  if (invocation_bytes.length !== 32) {
    throw new Error("Random source must return exactly 32 bytes");
  }
  const invocation_id = bytesToHex(invocation_bytes);
  const generation_anchor = sha256_hex(`${source_anchor}${invocation_id}`);
  return { source_anchor, generation_anchor };
}
