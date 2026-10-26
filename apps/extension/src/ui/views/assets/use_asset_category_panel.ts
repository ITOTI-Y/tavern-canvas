import { reactive, ref, type Ref } from "vue";

import type { Uuid } from "@tavern-canvas/contracts";
import type { AssetCategory, AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import {
  empty_form_values,
  form_values_from_record,
  type AssetFieldSpec,
  type AssetFormValues,
} from "./asset_field_schema.js";

export interface AssetCategoryPanelController {
  readonly dialog_open: Ref<boolean>;
  readonly editing_record: Ref<AssetRecordSummary | null>;
  readonly name: Ref<string>;
  readonly name_error: Ref<string | null>;
  readonly values: AssetFormValues;
  readonly saving: Ref<boolean>;
  open_create(): void;
  open_edit(record: AssetRecordSummary): void;
  close_dialog(): void;
  save(): Promise<void>;
  remove(asset_id: Uuid): void;
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
): AssetCategoryPanelController {
  const dialog_open = ref(false);
  const editing_record = ref<AssetRecordSummary | null>(null);
  const name = ref("");
  const name_error = ref<string | null>(null);
  const values = reactive<AssetFormValues>({});
  const saving = ref(false);

  function open_create(): void {
    editing_record.value = null;
    name.value = "";
    name_error.value = null;
    replace_values(values, empty_form_values(fields()));
    dialog_open.value = true;
  }

  function open_edit(record: AssetRecordSummary): void {
    editing_record.value = record;
    name.value = record.display_name;
    name_error.value = null;
    const preserved: AssetFormValues = {};
    for (const key of preserved_keys) {
      const value = record.payload[key];
      if (typeof value === "string" || typeof value === "number") {
        preserved[key] = value;
      }
    }
    replace_values(values, { ...form_values_from_record(fields(), record), ...preserved });
    dialog_open.value = true;
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
    try {
      const id = editing_record.value?.id ?? crypto.randomUUID();
      await controller.save_asset(category, {
        id,
        category,
        record_key: id,
        display_name: trimmed_name,
        payload: { ...values },
      });
      dialog_open.value = false;
    } finally {
      saving.value = false;
    }
  }

  function remove(asset_id: Uuid): void {
    void controller.remove_asset(category, asset_id);
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
    name,
    name_error,
    values,
    saving,
    open_create,
    open_edit,
    close_dialog,
    save,
    remove,
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
