import type { Request } from "express";

import { OwnerTokenHashSchema, type OwnerTokenHash } from "../persistence/job_repository.js";
import { GatewayHttpError } from "./error_handler.js";

const correlation_ids = new WeakMap<Request, string>();
const token_hashes = new WeakMap<Request, string>();

export function set_request_correlation_id(request: Request, correlation_id: string): void {
  correlation_ids.set(request, correlation_id);
}

export function get_request_correlation_id(request: Request): string | undefined {
  return correlation_ids.get(request);
}

export function set_request_token_hash(request: Request, token_hash: string): void {
  token_hashes.set(request, token_hash);
}

export function require_request_token_hash(request: Request): OwnerTokenHash {
  const token_hash = get_request_token_hash(request);
  if (token_hash === undefined) {
    throw new GatewayHttpError(401, "authentication_required");
  }
  return OwnerTokenHashSchema.parse(token_hash);
}
export function get_request_token_hash(request: Request): string | undefined {
  return token_hashes.get(request);
}
