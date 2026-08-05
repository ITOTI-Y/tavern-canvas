import { createHash, timingSafeEqual } from "node:crypto";

import type { RequestHandler } from "express";

import { GatewayHttpError } from "./error_handler.js";
import { set_request_token_hash } from "./request_context.js";

export interface BearerAuthenticationOptions {
  readonly token_hashes: readonly string[];
}

export function create_bearer_authentication(options: BearerAuthenticationOptions): RequestHandler {
  const expected_hashes = options.token_hashes.map((value) => Buffer.from(value, "hex"));
  return (request, _response, next): void => {
    const authorization = request.header("authorization");
    const token = parse_bearer_token(authorization);
    const candidate_hash = sha256_token(token ?? "");
    let matched = false;
    for (const expected_hash of expected_hashes) {
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
