import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";

export type AssetFieldKind = "text" | "tags" | "textarea" | "number";

export interface AssetFieldSpec {
  readonly key: string;
  readonly label: string;
  readonly kind: AssetFieldKind;
  readonly required?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly hint?: string;
}

export interface AssetSummaryFieldSpec {
  readonly key: string;
  readonly label: string;
  readonly numeric?: boolean;
}

export type AssetFormValues = Record<string, string | number>;

function read_field_value(
  payload: Readonly<Record<string, unknown>>,
  spec: AssetFieldSpec,
): string | number {
  const raw = payload[spec.key];
  if (spec.kind === "number") {
    return typeof raw === "number" ? raw : 0;
  }
  return typeof raw === "string" ? raw : "";
}

export function form_values_from_record(
  fields: readonly AssetFieldSpec[],
  record: AssetRecordSummary | null,
): AssetFormValues {
  const values: AssetFormValues = {};
  for (const field of fields) {
    values[field.key] = record
      ? read_field_value(record.payload, field)
      : field.kind === "number"
        ? 0
        : "";
  }
  return values;
}

export function empty_form_values(fields: readonly AssetFieldSpec[]): AssetFormValues {
  return form_values_from_record(fields, null);
}

function stringify_summary_value(raw: unknown): string | null {
  if (typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean") {
    return String(raw);
  }
  return null;
}

export function summarize_payload(
  payload: Readonly<Record<string, unknown>>,
  fields: readonly AssetSummaryFieldSpec[],
): readonly { readonly label: string; readonly value: string; readonly numeric: boolean }[] {
  const parts: { label: string; value: string; numeric: boolean }[] = [];
  for (const field of fields) {
    const raw = payload[field.key];
    if (raw === undefined || raw === null || raw === "") {
      continue;
    }
    const value = stringify_summary_value(raw);
    if (value === null) {
      continue;
    }
    parts.push({ label: field.label, value, numeric: field.numeric ?? false });
  }
  return parts;
}
