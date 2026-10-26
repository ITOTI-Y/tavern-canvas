import { describe, expect, it } from "vitest";

import { decrypt_legacy_openssl_payload, LegacyDecryptionError } from "./decrypt_legacy_tagdata.js";

const PASSPHRASE = "a-very-secret-key-that-is-not-so-secret";

// Fixtures come from the real `openssl enc -aes-256-cbc -md md5 -a -A -pass pass:<passphrase>` CLI
// run on synthetic plaintexts.
const VALID_DANBOORU_TAG_PAYLOAD =
  "U2FsdGVkX1+eT68OQat0sPvrohhtY3TJomVZbfJ/EIwLwtnut3Vxe07z3LQeHDgyMRh4doqbpVwn2PCDXrBjGkjnIHN2oorJxRHUYzSLv1EhNmdkKM4dj05CD8AuSGSw0FPwIBps7bSVkt0aFEW2dIsOKWdBnmmC1x18pU/A3XRnX8uymGsGlfhtxUDYznLh";
const VALID_DANBOORU_TAG_PLAINTEXT =
  '{"danbooru_tag":[{"id_index":1,"tag":"synthetic_tag_a","color_id":0,"translate":"合成标签甲","hot":42,"aliases":1}]}';

const NON_JSON_PAYLOAD = "U2FsdGVkX1/eXdpQT5ZvfxwSXnTKfoSw1kBIi+/dSq0=";
const NON_JSON_PLAINTEXT = "not json at all";

const GROUP_TREE_SHAPE_PAYLOAD =
  "U2FsdGVkX1/6TGAwunrgbrgD5qx3Yb8kX30lubl+IgBrdT3BqxN109xfD966zOyMQy9w0TSc/ED1kH9BL2UMk7kaOj4LFg3yrOmWivImmKDih5oSG2lr13RopauXNHosSwlC01G+/9sNYJrFRprXH8swgRIsoARwnCGhIbREgudif77baXrPvUDNU0Z4FR+/";
const GROUP_TREE_SHAPE_PLAINTEXT =
  '{"tag_groups":[{"id_index":1,"name":"合成分组"}],"tag_tags":[{"text":"synthetic_group_tag","desc":"合成分组标签"}]}';

describe("decrypt_legacy_openssl_payload", () => {
  it("decrypts a real OpenSSL-salted AES-256-CBC (EVP_BytesToKey MD5) payload", () => {
    const plaintext = decrypt_legacy_openssl_payload(VALID_DANBOORU_TAG_PAYLOAD, PASSPHRASE);

    expect(plaintext).toBe(VALID_DANBOORU_TAG_PLAINTEXT);
    expect(JSON.parse(plaintext)).toEqual({
      danbooru_tag: [
        {
          id_index: 1,
          tag: "synthetic_tag_a",
          color_id: 0,
          translate: "合成标签甲",
          hot: 42,
          aliases: 1,
        },
      ],
    });
  });

  it("decrypts payloads whose plaintext happens not to be the danbooru_tag shape (decryption is shape-agnostic)", () => {
    expect(decrypt_legacy_openssl_payload(NON_JSON_PAYLOAD, PASSPHRASE)).toBe(NON_JSON_PLAINTEXT);
    expect(decrypt_legacy_openssl_payload(GROUP_TREE_SHAPE_PAYLOAD, PASSPHRASE)).toBe(
      GROUP_TREE_SHAPE_PLAINTEXT,
    );
  });

  it("throws LegacyDecryptionError for a wrong passphrase", () => {
    expect(() =>
      decrypt_legacy_openssl_payload(VALID_DANBOORU_TAG_PAYLOAD, "wrong-passphrase"),
    ).toThrow(LegacyDecryptionError);
  });

  it("throws LegacyDecryptionError when the Salted__ magic header is missing", () => {
    const not_salted = Buffer.from("plain text with no openssl header at all", "utf8").toString(
      "base64",
    );

    expect(() => decrypt_legacy_openssl_payload(not_salted, PASSPHRASE)).toThrow(
      LegacyDecryptionError,
    );
    expect(() => decrypt_legacy_openssl_payload(not_salted, PASSPHRASE)).toThrow(/Salted__/);
  });

  it("throws LegacyDecryptionError for truncated ciphertext", () => {
    const truncated = VALID_DANBOORU_TAG_PAYLOAD.slice(0, 40);

    expect(() => decrypt_legacy_openssl_payload(truncated, PASSPHRASE)).toThrow(
      LegacyDecryptionError,
    );
  });

  it("throws LegacyDecryptionError for a payload too short to hold the magic and salt", () => {
    const too_short = Buffer.from("short", "utf8").toString("base64");

    expect(() => decrypt_legacy_openssl_payload(too_short, PASSPHRASE)).toThrow(
      LegacyDecryptionError,
    );
  });

  it("is deterministic: decrypting the same payload twice yields identical plaintext", () => {
    const first = decrypt_legacy_openssl_payload(VALID_DANBOORU_TAG_PAYLOAD, PASSPHRASE);
    const second = decrypt_legacy_openssl_payload(VALID_DANBOORU_TAG_PAYLOAD, PASSPHRASE);

    expect(first).toBe(second);
  });
});
