import { createDecipheriv, createHash } from "node:crypto";

const SALT_MAGIC = "Salted__";
const SALT_MAGIC_BYTES = 8;
const SALT_BYTES = 8;
const AES_256_KEY_BYTES = 32;
const AES_256_IV_BYTES = 16;

export class LegacyDecryptionError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "LegacyDecryptionError";
  }
}

/**
 * Replicates OpenSSL's legacy (pre-`-pbkdf2`) `EVP_BytesToKey` key
 * derivation with the MD5 digest: `D_0 = ""`, `D_i = MD5(D_{i-1} + password +
 * salt)`, concatenated until there are enough bytes for the key and IV. This
 * is the derivation `openssl enc -aes-256-cbc -md md5 -pass ...` performs.
 */
function derive_key_and_iv(
  passphrase: string,
  salt: Buffer,
  key_length: number,
  iv_length: number,
): { key: Buffer; iv: Buffer } {
  const passphrase_bytes = Buffer.from(passphrase, "utf8");
  let derived = Buffer.alloc(0);
  let previous_block = Buffer.alloc(0);

  while (derived.length < key_length + iv_length) {
    previous_block = createHash("md5")
      .update(Buffer.concat([previous_block, passphrase_bytes, salt]))
      .digest();
    derived = Buffer.concat([derived, previous_block]);
  }

  return {
    key: derived.subarray(0, key_length),
    iv: derived.subarray(key_length, key_length + iv_length),
  };
}

/**
 * Decrypts a base64-encoded OpenSSL-salted AES-256-CBC payload, i.e. the
 * output of `openssl enc -aes-256-cbc -salt -md md5 -a -pass pass:<passphrase>`.
 * The legacy st-chatu8 v2.8.1 `tagData/*.json` shard files are this format
 * verbatim (whole-file base64 text starting with the `Salted__` magic once
 * decoded).
 */
export function decrypt_legacy_openssl_payload(
  base64_ciphertext: string,
  passphrase: string,
): string {
  let raw: Buffer;
  try {
    raw = Buffer.from(base64_ciphertext.trim(), "base64");
  } catch (cause) {
    throw new LegacyDecryptionError("Payload is not valid base64.", { cause });
  }

  if (raw.length < SALT_MAGIC_BYTES + SALT_BYTES) {
    throw new LegacyDecryptionError(
      `Payload too short to contain the ${String(SALT_MAGIC_BYTES)}-byte "${SALT_MAGIC}" magic and ${String(SALT_BYTES)}-byte salt.`,
    );
  }

  const magic = raw.subarray(0, SALT_MAGIC_BYTES).toString("utf8");
  if (magic !== SALT_MAGIC) {
    throw new LegacyDecryptionError(
      `Expected OpenSSL "${SALT_MAGIC}" magic header, got ${JSON.stringify(magic)}.`,
    );
  }

  const salt = raw.subarray(SALT_MAGIC_BYTES, SALT_MAGIC_BYTES + SALT_BYTES);
  const ciphertext = raw.subarray(SALT_MAGIC_BYTES + SALT_BYTES);
  const { key, iv } = derive_key_and_iv(passphrase, salt, AES_256_KEY_BYTES, AES_256_IV_BYTES);

  try {
    const decipher = createDecipheriv("aes-256-cbc", key, iv);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
  } catch (cause) {
    throw new LegacyDecryptionError(
      "AES-256-CBC decryption failed (wrong passphrase or corrupted payload).",
      { cause },
    );
  }
}
