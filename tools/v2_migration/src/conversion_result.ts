import { NamespaceSchema, TimestampSchema, UuidSchema } from "@tavern-canvas/storage";
import { z } from "zod";

export interface ConversionWarning {
  readonly path: string;
  readonly message: string;
}

export type SecretCredentialKind =
  | "sd_webui_auth"
  | "novelai_token"
  | "banana_api_key"
  | "chatu8_ai_assistant_api_key"
  | "llm_profile_api_key"
  | "legacy_ai_token";

/**
 * `plaintext_value` is handed to SillyTavern secret storage in memory only; never log,
 * journal or persist this operation.
 */
export interface SecretTransferOperation {
  readonly operation: "secret_transfer";
  readonly credential_kind: SecretCredentialKind;
  readonly source_path: string;
  readonly provider_profile_id: string;
  readonly plaintext_value: string;
}

export interface ConverterResult<TRecord> {
  readonly records: readonly TRecord[];
  readonly warnings: readonly ConversionWarning[];
  readonly secret_transfers: readonly SecretTransferOperation[];
}

export function empty_result<TRecord>(
  warnings: readonly ConversionWarning[] = [],
): ConverterResult<TRecord> {
  return { records: [], warnings, secret_transfers: [] };
}

/** Converters take a caller-supplied timestamp instead of `Date.now()`, so identical input yields byte-identical output and resume/retry never duplicates records. */
export interface ConversionContext {
  readonly namespace: string;
  readonly migrated_at: string;
}

export function build_record_key(namespace: string, id: string): string {
  return `${namespace}:${id}`;
}

export function namespaced_record_base(
  context: ConversionContext,
  id: string,
): {
  schema_version: 1;
  id: string;
  namespace: string;
  record_key: string;
  created_at: string;
  updated_at: string;
} {
  return {
    schema_version: 1,
    id,
    namespace: context.namespace,
    record_key: build_record_key(context.namespace, id),
    created_at: context.migrated_at,
    updated_at: context.migrated_at,
  };
}

/** Structurally identical to `packages/storage`'s private `namespaced_schema({})` base shape. */
export const NamespacedRecordBaseSchema = z.strictObject({
  schema_version: z.literal(1),
  id: UuidSchema,
  namespace: NamespaceSchema,
  record_key: z.string().min(1),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
