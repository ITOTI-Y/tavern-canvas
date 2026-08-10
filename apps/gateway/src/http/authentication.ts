import { createHash, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";

import type { RequestHandler } from "express";

import { GatewayHttpError } from "./error_handler.js";
import { set_request_token_hash } from "./request_context.js";

const TOKEN_HASH_PATTERN = /^[a-f0-9]{64}$/u;

export interface BearerAuthenticationOptions {
  readonly token_hashes?: readonly string[];
  readonly token_hashes_provider?: () => readonly string[];
}

export interface BearerTokenHashStoreOptions {
  readonly token_hashes: readonly string[];
  readonly token_hash_file?: string;
  readonly on_reload_error?: (error: unknown) => void;
}

export interface BearerTokenHashStore {
  readonly token_hashes: readonly string[];
  reload(): boolean;
}

export function create_bearer_token_hash_store(
  options: BearerTokenHashStoreOptions,
): BearerTokenHashStore {
  let current = merge_token_hashes(options.token_hashes, undefined);
  if (options.token_hash_file !== undefined) {
    current = merge_token_hashes(
      options.token_hashes,
      read_token_hash_file(options.token_hash_file),
    );
  }
  const store: BearerTokenHashStore = {
    get token_hashes(): readonly string[] {
      return current;
    },
    reload(): boolean {
      if (options.token_hash_file === undefined) {
        return false;
      }
      try {
        const file_hashes = read_token_hash_file(options.token_hash_file);
        const next = merge_token_hashes(options.token_hashes, file_hashes);
        current = next;
        return true;
      } catch (error) {
        options.on_reload_error?.(error);
        return false;
      }
    },
  };
  return store;
}

export function create_bearer_authentication(options: BearerAuthenticationOptions): RequestHandler {
  const get_token_hashes =
    options.token_hashes_provider ??
    (() => {
      if (options.token_hashes === undefined) {
        throw new TypeError("Bearer authentication requires token hashes");
      }
      return options.token_hashes;
    });
  return (request, _response, next): void => {
    const authorization = request.header("authorization");
    const token = parse_bearer_token(authorization);
    const candidate_hash = sha256_token(token ?? "");
    let matched = false;
    for (const token_hash of get_token_hashes()) {
      const expected_hash = Buffer.from(token_hash, "hex");
      const equal =
        expected_hash.length === candidate_hash.length &&
        timingSafeEqual(candidate_hash, expected_hash);
      matched = equal || matched;
    }
    if (token === null || !matched) {
      next(
        new GatewayHttpError(
          token === null ? 401 : 403,
          token === null ? "authentication_required" : "authentication_failed",
        ),
      );
      return;
    }
    set_request_token_hash(request, candidate_hash.toString("hex"));
    next();
  };
}

export function sha256_token(token: string): Buffer {
  return createHash("sha256").update(token, "utf8").digest();
}

function parse_bearer_token(header: string | undefined): string | null {
  if (header === undefined) {
    return null;
  }
  const match = /^Bearer\s+([^\s]+)$/u.exec(header);
  if (match === null) {
    return null;
  }
  const token = match[1];
  if (token === undefined || token.length === 0 || token.length > 4_096) {
    return null;
  }
  return token;
}

function read_token_hash_file(file_path: string): readonly string[] {
  const content = readFileSync(file_path, "utf8");
  const normalized = content.trim();
  if (normalized.length === 0) {
    return [];
  }
  let values: unknown;
  if (normalized.startsWith("[")) {
    values = JSON.parse(normalized) as unknown;
  } else {
    values = normalized.split(/\r?\n/u).map((line) => line.trim());
  }
  if (!Array.isArray(values)) {
    throw new Error("Bearer token hash file must contain a hash list");
  }
  const hashes: string[] = [];
  for (const value of values) {
    if (typeof value !== "string" || !TOKEN_HASH_PATTERN.test(value.trim().toLowerCase())) {
      throw new Error("Bearer token hash file contains an invalid hash");
    }
    hashes.push(value.trim().toLowerCase());
  }
  return hashes;
}

function merge_token_hashes(
  startup_hashes: readonly string[],
  file_hashes: readonly string[] | undefined,
): readonly string[] {
  const hashes = [...startup_hashes, ...(file_hashes ?? [])];
  const unique = [...new Set(hashes)];
  if (
    unique.length === 0 ||
    unique.length > 128 ||
    unique.some((value) => !TOKEN_HASH_PATTERN.test(value))
  ) {
    throw new Error("Bearer token hash configuration is invalid");
  }
  return Object.freeze(unique);
}
