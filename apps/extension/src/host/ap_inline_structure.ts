/**
 * The copy of an Advanced Preset built-in preset that Inkwell puts in Advanced Preset's installed
 * slot while inline analysis is on: the built-in artifact plus one hidden custom structure and an
 * always-on module that asks for it. Same id and version as the built-in, so Advanced Preset uses
 * it in place of the built-in and keeps the user's configuration, modules and carrier.
 */

export const INLINE_MODULE_ID = "inkwell-illustrations";

/** Marks a copy as Inkwell's, with the hash of the built-in it was made from. */
export const INLINE_MARKER = "__inkwell";

export interface InlineStructureNames {
  readonly structure_id: string;
  readonly field: string;
  readonly macro: string;
}

type Artifact = Record<string, unknown>;

function records(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is Record<string, unknown> => typeof item === "object" && item !== null,
      )
    : [];
}

/** The region the module goes into: `task` when the preset has one, else its last region. */
function target_region(artifact: Artifact): string | null {
  const ids = records(artifact["regions"]).flatMap((region) =>
    typeof region["id"] === "string" ? [region["id"]] : [],
  );
  return ids.includes("task") ? "task" : (ids.at(-1) ?? null);
}

/** `null` when the artifact does not have the parts the copy is built from. */
export function derive_inline_artifact(
  artifact: Artifact,
  names: InlineStructureNames,
): Artifact | null {
  const region = target_region(artifact);
  const structures = artifact["structures"];
  if (
    region === null ||
    typeof structures !== "object" ||
    structures === null ||
    !Array.isArray(artifact["modules"]) ||
    !Array.isArray(artifact["entries"])
  ) {
    return null;
  }
  const order = 950;
  const regions = records(artifact["regions"]).map((item) => item["id"]);
  const rank = (entry: Record<string, unknown>): number => regions.indexOf(entry["region"]);
  const entries = records(artifact["entries"]);
  const at = entries.findIndex(
    (entry) =>
      rank(entry) > regions.indexOf(region) ||
      (entry["region"] === region && typeof entry["order"] === "number" && entry["order"] > order),
  );
  const entry = {
    id: `${INLINE_MODULE_ID}/main`,
    module: INLINE_MODULE_ID,
    region,
    order,
    content: [
      { pieces: [{ text: `{{${names.macro}}}\n\n{{ap::structure::${names.structure_id}}}` }] },
    ],
  };
  return {
    ...artifact,
    structures: {
      ...structures,
      [names.structure_id]: {
        id: names.structure_id,
        kind: "custom",
        tag: names.field,
        field: names.field,
        shape: "text",
        display: "hidden",
        title: "Inkwell",
        description:
          "Inkwell's picture suggestions and wardrobe update for the reply, as one JSON object written as a string, in the form the Inkwell illustration request states.",
        formatPrompt: {
          tag: `<${names.field}>the JSON object the Inkwell illustration request states</${names.field}>`,
          field: "Fill `{{field}}` with the JSON object the Inkwell illustration request states.",
        },
      },
    },
    modules: [
      ...(artifact["modules"] as unknown[]),
      {
        id: INLINE_MODULE_ID,
        name: "Inkwell",
        toggle: "always",
        default: true,
        structures: [names.structure_id],
        vars: [],
        source: "inkwell",
        description: "Picture suggestions and wardrobe update for Inkwell.",
      },
    ],
    entries: [
      ...entries.slice(0, at < 0 ? entries.length : at),
      entry,
      ...entries.slice(at < 0 ? entries.length : at),
    ],
    [INLINE_MARKER]: { from_hash: artifact["hash"] ?? null },
  };
}

export function is_inline_copy(value: unknown): boolean {
  return typeof value === "object" && value !== null && INLINE_MARKER in value;
}

export function inline_copy_source(value: unknown): unknown {
  return is_inline_copy(value)
    ? (value as Record<string, { readonly from_hash?: unknown }>)[INLINE_MARKER]?.from_hash
    : undefined;
}
