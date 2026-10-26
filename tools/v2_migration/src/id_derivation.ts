import { md5 } from "@noble/hashes/legacy.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";
import type { RandomSource } from "@tavern-canvas/core";

export function sha256_hex(value: string): string {
  return bytesToHex(sha256(utf8ToBytes(value)));
}

export function sha256_hex_bytes(value: Uint8Array): string {
  return bytesToHex(sha256(value));
}

/** Matches v2's `CryptoJS.MD5(tag).toString()`, used as the jiuguanStorage lookup key. */
export function md5_hex(value: string): string {
  return bytesToHex(md5(utf8ToBytes(value)));
}

/** Deterministic, so re-running a migration never mints different IDs for the same record. */
export function deterministic_bytes(seed: string, length: number): Uint8Array {
  const output = new Uint8Array(length);
  let filled = 0;
  let counter = 0;
  while (filled < length) {
    const block = sha256(utf8ToBytes(`${seed}::${String(counter)}`));
    const take = Math.min(block.length, length - filled);
    output.set(block.subarray(0, take), filled);
    filled += take;
    counter += 1;
  }
  return output;
}

const HEX_DIGITS = "0123456789abcdef";

function require_byte(bytes: Uint8Array, index: number): number {
  const value = bytes[index];
  if (value === undefined) {
    throw new RangeError(`Missing byte at index ${String(index)}`);
  }
  return value;
}

function byte_to_hex(byte: number): string {
  return HEX_DIGITS.charAt(byte >> 4) + HEX_DIGITS.charAt(byte & 0x0f);
}

/** Not an RFC 4122 name-based UUID; only matches `UuidSchema` (version nibble 1-8, variant nibble 89ab). */
export function deterministic_uuid(seed: string): string {
  const bytes = deterministic_bytes(seed, 16);
  bytes[6] = (require_byte(bytes, 6) & 0x0f) | 0x50;
  bytes[8] = (require_byte(bytes, 8) & 0x3f) | 0x80;
  const hex = Array.from(bytes, byte_to_hex).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export class DeterministicRandomSource implements RandomSource {
  readonly #seed: string;

  constructor(seed: string) {
    this.#seed = seed;
  }

  bytes(length: number): Uint8Array {
    return deterministic_bytes(this.#seed, length);
  }
}
