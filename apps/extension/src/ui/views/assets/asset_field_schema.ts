import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";

/**
 * Storage keeps every asset category's payload as an opaque `Record<string, unknown>` bag
 * (packages/storage's `namespaced_schema({})` shape for character_profiles/comfy_workflows/
 * novelai_vibes -- see ui_capabilities.ts's AssetRecordSummary doc comment): the domain layer
 * imposes no per-category fields at all. These specs are therefore a UI-layer judgment call, not
 * a mirror of an existing domain schema -- kept deliberately small and aligned to what each
 * category's locale copy already promises (assets.characters/outfits/lora/vibe/reference in
 * en.ts/zh_cn.ts).
 */
export type AssetFieldKind = "text" | "textarea" | "number";

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

/** One-line meta summary shown under a card's display name in AssetCategoryList. */
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

/** Builds initial form values for editing an existing record, defaulting missing/mistyped payload
 * fields to the field kind's empty value instead of throwing -- the payload bag is untyped at
 * storage, so a legacy or partially-written record must still open for editing. */
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

/** The payload bag is opaque storage (`Record<string, unknown>`), so a summary field's raw value
 * is only ever rendered when it is actually a primitive Vue could have written there itself
 * (string/number/boolean) -- an unexpected object shape is skipped rather than stringified into
 * an unhelpful "[object Object]". */
function stringify_summary_value(raw: unknown): string | null {
  if (typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean") {
    return String(raw);
  }
  return null;
}

/** Renders a card's one-line meta summary text from its payload, skipping fields that are absent
 * or blank so the summary never shows "Weight: · Trigger words:" for a partially-filled record. */
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
