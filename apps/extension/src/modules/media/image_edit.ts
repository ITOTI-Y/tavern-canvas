import type {
  AssetId,
  GoogleImageRequest,
  OpenAiImageRequest,
  RequestId,
  Sha256,
} from "@tavern-canvas/contracts";

export class TagEditError extends Error {
  readonly code: "tag_locked";

  constructor(code: "tag_locked", message: string) {
    super(message);
    this.name = "TagEditError";
    this.code = code;
  }
}

// ---------------------------------------------------------------------------
// Tag-edit textbox dialog state (manual.tag_edit_dialog, manual.tag_actions_menu)
// ---------------------------------------------------------------------------

export interface TagEditDraft {
  readonly tag_id: string;
  readonly original_text: string;
  readonly current_text: string;
  readonly locked: boolean;
}

export function create_tag_edit_draft(tag_id: string, original_text: string): TagEditDraft {
  return { tag_id, original_text, current_text: original_text, locked: false };
}

export function edit_tag_text(draft: TagEditDraft, next_text: string): TagEditDraft {
  if (draft.locked) {
    throw new TagEditError("tag_locked", `Tag "${draft.tag_id}" is locked and cannot be edited`);
  }
  return { ...draft, current_text: next_text };
}

/** "reset" reverts the textbox back to the tag's original preset-generated text. */
export function reset_tag_text(draft: TagEditDraft): TagEditDraft {
  if (draft.locked) {
    throw new TagEditError("tag_locked", `Tag "${draft.tag_id}" is locked and cannot be reset`);
  }
  return { ...draft, current_text: draft.original_text };
}

export function toggle_tag_lock(draft: TagEditDraft): TagEditDraft {
  return { ...draft, locked: !draft.locked };
}

/** Locked tags protect their generated images from being overwritten or deleted. */
export function can_delete_tag(draft: TagEditDraft): boolean {
  return !draft.locked;
}

export function assert_tag_deletable(draft: TagEditDraft): void {
  if (!can_delete_tag(draft)) {
    throw new TagEditError("tag_locked", `Tag "${draft.tag_id}" is locked and cannot be deleted`);
  }
}

// ---------------------------------------------------------------------------
// Preset-match highlighting underlay
// ---------------------------------------------------------------------------

export interface PresetMatchCandidate {
  readonly preset_id: string;
  readonly label: string;
}

export interface PresetMatchRange {
  readonly start: number;
  readonly end: number;
  readonly preset_id: string;
}

/**
 * Scans `text` for occurrences of each preset's label (case-insensitive, longest-label-first so a
 * longer preset name is never shadowed by a shorter one it happens to contain), returning
 * non-overlapping match ranges in left-to-right order. Backs the tag-edit textbox's preset-match
 * highlighting underlay (manual.tag_edit_dialog); the underlay rendering itself lives in
 * ImageEditDialog.vue.
 */
export function find_preset_matches(
  text: string,
  presets: readonly PresetMatchCandidate[],
): readonly PresetMatchRange[] {
  const lower_text = text.toLowerCase();
  const ordered = [...presets]
    .filter((preset) => preset.label.trim().length > 0)
    .sort((left, right) => right.label.length - left.label.length);

  const ranges: PresetMatchRange[] = [];
  const covered = new Array<boolean>(text.length).fill(false);
  for (const preset of ordered) {
    const lower_label = preset.label.toLowerCase();
    let search_from = 0;
    while (search_from <= lower_text.length) {
      const index = lower_text.indexOf(lower_label, search_from);
      if (index < 0) {
        break;
      }
      const end = index + lower_label.length;
      const overlaps = covered.slice(index, end).some(Boolean);
      if (!overlaps) {
        ranges.push({ start: index, end, preset_id: preset.preset_id });
        for (let position = index; position < end; position += 1) {
          covered[position] = true;
        }
      }
      search_from = index + 1;
    }
  }
  return ranges.sort((left, right) => left.start - right.start);
}

// ---------------------------------------------------------------------------
// Banana retouch / {修图} edit-mode request building
// (manual.banana_retouch_trigger_dialog, manual.banana_edit_mode_trigger)
// ---------------------------------------------------------------------------

export type ImageEditProvider = "openai_image" | "google_image";

export interface ImageEditInput {
  readonly request_id: RequestId;
  readonly generation_anchor: Sha256;
  readonly source_asset_id: AssetId;
  readonly instruction: string;
  readonly provider_id: ImageEditProvider;
}

/**
 * Builds a whole-image edit request (Banana retouch dialog, or the {修图}-tag trigger routed
 * through a dedicated edit preset) -- no mask, so this is always a full-image edit, distinct from
 * inpaint_session.ts's masked submissions. OpenAI already declares `mode: "edit"` for exactly this
 * shape; Google has no explicit mode, editing is implicit via `reference_asset_ids` -- both fit the
 * existing contracts unchanged.
 */
export function build_image_edit_request(
  input: ImageEditInput,
): OpenAiImageRequest | GoogleImageRequest {
  if (input.provider_id === "openai_image") {
    return {
      provider_id: "openai_image",
      request_id: input.request_id,
      generation_anchor: input.generation_anchor,
      prompt: input.instruction,
      output_count: 1,
      mode: "edit",
      model_id: "gpt-image-1",
      size: "auto",
      quality: "auto",
      background: "auto",
      output_format: "png",
      input_asset_ids: [input.source_asset_id],
    };
  }
  return {
    provider_id: "google_image",
    request_id: input.request_id,
    generation_anchor: input.generation_anchor,
    prompt: input.instruction,
    output_count: 1,
    model_id: "gemini-2.5-flash-image",
    reference_asset_ids: [input.source_asset_id],
    aspect_ratio: "1:1",
    image_size: "1K",
    output_mime_type: "image/png",
  };
}
