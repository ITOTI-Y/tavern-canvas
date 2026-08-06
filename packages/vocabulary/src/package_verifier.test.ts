import { encode } from "@msgpack/msgpack";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { describe, expect, it } from "vitest";

import type { VocabularyManifest, VocabularyShardEntry } from "@tavern-canvas/contracts";

import {
  compare_semver,
  PackageVerificationError,
  verify_manifest,
  verify_shard_bytes,
} from "./package_verifier.js";

async function gzip(bytes: Uint8Array): Promise<Uint8Array> {
  const body = new Response(new Uint8Array(bytes)).body;
  if (body === null) {
    throw new Error("no body");
  }
  const stream = body.pipeThrough(new CompressionStream("gzip"));
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}

function sha256_hex(bytes: Uint8Array): string {
  return bytesToHex(sha256(bytes));
}

async function build_shard(value: unknown): Promise<{ bytes: Uint8Array; sha256: string }> {
  const bytes = await gzip(encode(value));
  return { bytes, sha256: sha256_hex(bytes) };
}

function shard_entry(
  overrides: Partial<VocabularyShardEntry> & { bytes: Uint8Array },
): VocabularyShardEntry {
  return {
    shard_id: "prefix-aa",
    package_id: "baseline",
    kind: "prefix",
    path: "shards/prefix-aa.msgpack.gz",
    sha256: sha256_hex(overrides.bytes),
    byte_length: overrides.bytes.byteLength,
    ...overrides,
  };
}

function manifest(overrides: Partial<VocabularyManifest> = {}): VocabularyManifest {
  return {
    package_id: "baseline",
    schema_version: 1,
    data_version: "1.0.0",
    changelog: "initial",
    record_count: 1,
    compressed_size: 100,
    minimum_extension_version: "3.0.0",
    shards: [
      {
        shard_id: "prefix-aa",
        package_id: "baseline",
        kind: "prefix",
        path: "shards/prefix-aa.msgpack.gz",
        sha256: "a".repeat(64),
        byte_length: 10,
      },
    ],
    ...overrides,
  };
}

describe("verify_manifest", () => {
  it("accepts a valid manifest whose minimum_extension_version the current extension satisfies", () => {
    const result = verify_manifest(manifest(), { current_extension_version: "3.1.0" });
    expect(result.package_id).toBe("baseline");
  });

  it("rejects an unsupported schema_version before running full schema validation", () => {
    const raw = { ...manifest(), schema_version: 2 };
    expect(() => verify_manifest(raw, { current_extension_version: "3.0.0" })).toThrowError(
      PackageVerificationError,
    );
    try {
      verify_manifest(raw, { current_extension_version: "3.0.0" });
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(PackageVerificationError);
      expect((error as PackageVerificationError).reason).toBe("unsupported_schema");
    }
  });

  it("rejects when the running extension version is below minimum_extension_version", () => {
    const raw = manifest({ minimum_extension_version: "3.1.0" });
    try {
      verify_manifest(raw, { current_extension_version: "3.0.0" });
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(PackageVerificationError);
      expect((error as PackageVerificationError).reason).toBe("extension_version_too_low");
    }
  });

  it("accepts when the running extension version equals minimum_extension_version", () => {
    const raw = manifest({ minimum_extension_version: "3.0.0" });
    expect(() => verify_manifest(raw, { current_extension_version: "3.0.0" })).not.toThrow();
  });

  it("rejects duplicate shard paths even when shard_id differs", () => {
    const raw = manifest({
      shards: [
        {
          shard_id: "prefix-aa",
          package_id: "baseline",
          kind: "prefix",
          path: "shards/same.msgpack.gz",
          sha256: "a".repeat(64),
          byte_length: 10,
        },
        {
          shard_id: "prefix-ab",
          package_id: "baseline",
          kind: "prefix",
          path: "shards/same.msgpack.gz",
          sha256: "b".repeat(64),
          byte_length: 10,
        },
      ],
    });
    try {
      verify_manifest(raw, { current_extension_version: "3.0.0" });
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(PackageVerificationError);
      expect((error as PackageVerificationError).reason).toBe("duplicate_shard_path");
    }
  });

  it("rejects a manifest that otherwise fails contracts schema validation", () => {
    const raw = { ...manifest(), record_count: -1 };
    try {
      verify_manifest(raw, { current_extension_version: "3.0.0" });
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(PackageVerificationError);
      expect((error as PackageVerificationError).reason).toBe("invalid_manifest");
    }
  });
});

describe("compare_semver", () => {
  it("orders by major, minor, then patch", () => {
    expect(compare_semver("1.2.3", "1.2.4")).toBe(-1);
    expect(compare_semver("2.0.0", "1.9.9")).toBe(1);
    expect(compare_semver("1.2.3", "1.2.3")).toBe(0);
  });

  it("ranks a version without a prerelease above one with a prerelease", () => {
    expect(compare_semver("1.0.0", "1.0.0-alpha")).toBe(1);
    expect(compare_semver("1.0.0-alpha", "1.0.0")).toBe(-1);
  });

  it("compares prerelease identifiers per SemVer precedence", () => {
    expect(compare_semver("1.0.0-alpha", "1.0.0-alpha.1")).toBe(-1);
    expect(compare_semver("1.0.0-alpha.1", "1.0.0-alpha.beta")).toBe(-1);
    expect(compare_semver("1.0.0-beta", "1.0.0-beta.2")).toBe(-1);
    expect(compare_semver("1.0.0-beta.11", "1.0.0-rc.1")).toBe(-1);
  });

  it("ignores build metadata", () => {
    expect(compare_semver("1.0.0+build1", "1.0.0+build2")).toBe(0);
  });
});

describe("verify_shard_bytes", () => {
  it("accepts a well-formed prefix shard and returns the compressed bytes unchanged", async () => {
    const shard = await build_shard({
      kind: "prefix",
      entries: [["ab", 1, 10]],
    });
    const entry = shard_entry({ bytes: shard.bytes, kind: "prefix" });

    const result = await verify_shard_bytes(entry, shard.bytes);
    expect(result.compressed_bytes).toBe(shard.bytes);
    expect(result.entry).toBe(entry);
  });

  it("accepts HTML/script-like strings stored as inert MessagePack text without special handling", async () => {
    const shard = await build_shard({
      kind: "detail",
      start_id: 1,
      records: [
        {
          record_id: 1,
          tag: "<script>alert(1)</script>",
          description: "<img src=x onerror=alert(1)>",
          aliases: [],
          popularity: 0,
        },
      ],
    });
    const entry = shard_entry({
      bytes: shard.bytes,
      kind: "detail",
      path: "shards/detail-0.msgpack.gz",
    });

    const result = await verify_shard_bytes(entry, shard.bytes);
    expect(result.compressed_bytes.byteLength).toBe(shard.bytes.byteLength);
  });

  it("rejects when the downloaded byte length does not match the declared byte_length", async () => {
    const shard = await build_shard({ kind: "prefix", entries: [] });
    const entry = shard_entry({ bytes: shard.bytes, byte_length: shard.bytes.byteLength + 1 });

    await expect(verify_shard_bytes(entry, shard.bytes)).rejects.toMatchObject({
      reason: "byte_length_mismatch",
    });
  });

  it("rejects when the SHA-256 of the downloaded bytes does not match the manifest", async () => {
    const shard = await build_shard({ kind: "prefix", entries: [] });
    const entry = shard_entry({ bytes: shard.bytes, sha256: "f".repeat(64) });

    await expect(verify_shard_bytes(entry, shard.bytes)).rejects.toMatchObject({
      reason: "hash_mismatch",
    });
  });

  it("rejects a corrupt gzip stream while still consuming byte_length/hash checks first", async () => {
    const shard = await build_shard({ kind: "prefix", entries: [] });
    const corrupted = new Uint8Array(shard.bytes);
    const corrupt_index = Math.floor(corrupted.length / 2);
    corrupted[corrupt_index] = (corrupted[corrupt_index] ?? 0) ^ 0xff;
    const entry = shard_entry({ bytes: corrupted, kind: "prefix" });

    await expect(verify_shard_bytes(entry, corrupted)).rejects.toMatchObject({
      reason: "corrupt_gzip",
    });
  });

  it("rejects gzip bytes that decompress to invalid MessagePack", async () => {
    const not_msgpack = new TextEncoder().encode("not valid messagepack at all, just text");
    const bytes = await gzip(not_msgpack);
    const entry = shard_entry({ bytes, kind: "prefix" });

    await expect(verify_shard_bytes(entry, bytes)).rejects.toMatchObject({
      reason: "corrupt_messagepack",
    });
  });

  it("rejects a decoded envelope whose kind does not match the manifest entry", async () => {
    const shard = await build_shard({ kind: "alias", entries: [] });
    const entry = shard_entry({ bytes: shard.bytes, kind: "prefix" });

    await expect(verify_shard_bytes(entry, shard.bytes)).rejects.toMatchObject({
      reason: "wrong_shard_kind",
    });
  });

  it("rejects a shard whose decompressed size exceeds the bounded ratio", async () => {
    const huge_value = { kind: "hot", global: [], padding: "a".repeat(4 * 1024 * 1024) };
    const shard = await build_shard(huge_value);
    // Highly compressible payload: gzip shrinks it far below the decompressed size, so the
    // declared byte_length is tiny relative to what decompression would actually produce.
    const entry = shard_entry({ bytes: shard.bytes, kind: "hot" });

    await expect(verify_shard_bytes(entry, shard.bytes)).rejects.toMatchObject({
      reason: "decompressed_size_exceeded",
    });
  });

  it("consumes bounded streams: an oversized decompression aborts before buffering the full payload", async () => {
    const huge_value = { kind: "trigram", padding: "b".repeat(8 * 1024 * 1024) };
    const shard = await build_shard(huge_value);
    const entry = shard_entry({ bytes: shard.bytes, kind: "trigram" });

    const started = Date.now();
    await expect(verify_shard_bytes(entry, shard.bytes)).rejects.toMatchObject({
      reason: "decompressed_size_exceeded",
    });
    expect(Date.now() - started).toBeLessThan(5_000);
  });
});
