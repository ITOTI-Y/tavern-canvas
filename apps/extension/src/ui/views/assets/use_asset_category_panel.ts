import { reactive, ref, type Ref } from "vue";

import type { Uuid } from "@tavern-canvas/contracts";
import type { AssetCategory, AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import { card_thumbnail } from "./reference_image.js";
import {
  empty_form_values,
  form_values_from_record,
  type AssetFieldSpec,
  type AssetFormValues,
} from "./asset_field_schema.js";

export interface AssetCategoryPanelController {
  readonly dialog_open: Ref<boolean>;
  readonly editing_record: Ref<AssetRecordSummary | null>;
  /** The id the open record has or will be saved under, so other records can link to it first. */
  readonly record_id: Ref<Uuid>;
  readonly name: Ref<string>;
  readonly name_error: Ref<string | null>;
  /** Why the last save failed, shown in the form instead of leaving it open without a word. */
  readonly save_error: Ref<string | null>;
  readonly values: AssetFormValues;
  readonly saving: Ref<boolean>;
  /** The small picture for an image field, or the full image while a new one is unsaved. */
  thumbnail(source_key: string): string | null;
  open_create(): void;
  open_edit(record: AssetRecordSummary): void;
  close_dialog(): void;
  save(): Promise<void>;
  remove(asset_id: Uuid): void;
  remove_many(asset_ids: readonly Uuid[]): Promise<void>;
  reorder(ordered_ids: readonly Uuid[]): void;
  random_select(record: AssetRecordSummary): void;
}

export function use_asset_category_panel(
  category: AssetCategory,
  controller: StudioController,
  fields: () => readonly AssetFieldSpec[],
  validation_message: () => string,
  /** Payload keys edited outside the field form, such as an attached image, kept when a record is edited. */
  preserved_keys: readonly string[] = [],
  /** Image payload keys and the keys their card thumbnails are saved under. */
  thumbnail_keys: Readonly<Record<string, string>> = {},
): AssetCategoryPanelController {
  const dialog_open = ref(false);
  const editing_record = ref<AssetRecordSummary | null>(null);
  const record_id = ref<Uuid>(crypto.randomUUID());
  const name = ref("");
  const name_error = ref<string | null>(null);
  const save_error = ref<string | null>(null);
  const values = reactive<AssetFormValues>({});
  const saving = ref(false);

  function open_create(): void {
    editing_record.value = null;
    record_id.value = crypto.randomUUID();
    name.value = "";
    name_error.value = null;
    save_error.value = null;
    replace_values(values, empty_form_values(fields()));
    dialog_open.value = true;
  }

  function open_edit(record: AssetRecordSummary): void {
    editing_record.value = record;
    record_id.value = record.id;
    name.value = record.display_name;
    name_error.value = null;
    save_error.value = null;
    const preserved: AssetFormValues = {};
    for (const key of [...preserved_keys, ...Object.values(thumbnail_keys)]) {
      const value = record.payload[key];
      if (typeof value === "string" || typeof value === "number") {
        preserved[key] = value;
      }
    }
    replace_values(values, { ...form_values_from_record(fields(), record), ...preserved });
    dialog_open.value = true;
  }

  function image_changed(source_key: string): boolean {
    return values[source_key] !== editing_record.value?.payload[source_key];
  }

  function thumbnail(source_key: string): string | null {
    const image = values[source_key];
    if (typeof image !== "string" || image === "") {
      return null;
    }
    const thumbnail_key = thumbnail_keys[source_key];
    const saved = thumbnail_key === undefined ? undefined : values[thumbnail_key];
    return typeof saved === "string" && !image_changed(source_key) ? saved : image;
  }

  /** A new image gets a fresh thumbnail; a record saved before thumbnails existed gets its first. */
  async function with_thumbnails(): Promise<AssetFormValues> {
    const payload: AssetFormValues = { ...values };
    for (const [source_key, thumbnail_key] of Object.entries(thumbnail_keys)) {
      const image = payload[source_key];
      if (typeof image !== "string" || image === "") {
        Reflect.deleteProperty(payload, thumbnail_key);
      } else if (typeof payload[thumbnail_key] !== "string" || image_changed(source_key)) {
        payload[thumbnail_key] = await card_thumbnail(image);
      }
    }
    return payload;
  }

  function close_dialog(): void {
    dialog_open.value = false;
  }

  async function save(): Promise<void> {
    const trimmed_name = name.value.trim();
    if (trimmed_name === "") {
      name_error.value = validation_message();
      return;
    }
    saving.value = true;
    save_error.value = null;
    try {
      const id = record_id.value;
      await controller.save_asset(category, {
        id,
        category,
        record_key: id,
        display_name: trimmed_name,
        payload: await with_thumbnails(),
      });
      dialog_open.value = false;
    } catch (error) {
      save_error.value = error instanceof Error ? error.message : String(error);
    } finally {
      saving.value = false;
    }
  }

  function remove(asset_id: Uuid): void {
    void controller.remove_asset(category, asset_id);
  }

  async function remove_many(asset_ids: readonly Uuid[]): Promise<void> {
    for (const asset_id of asset_ids) {
      await controller.remove_asset(category, asset_id);
    }
  }

  function reorder(ordered_ids: readonly Uuid[]): void {
    void controller.reorder_assets(category, ordered_ids);
  }

  function random_select(record: AssetRecordSummary): void {
    open_edit(record);
  }

  return {
    dialog_open,
    editing_record,
    record_id,
    name,
    name_error,
    save_error,
    values,
    saving,
    thumbnail,
    open_create,
    open_edit,
    close_dialog,
    save,
    remove,
    remove_many,
    reorder,
    random_select,
  };
}

export function replace_values(target: AssetFormValues, next: AssetFormValues): void {
  for (const key of Object.keys(target)) {
    Reflect.deleteProperty(target, key);
  }
  Object.assign(target, next);
}
