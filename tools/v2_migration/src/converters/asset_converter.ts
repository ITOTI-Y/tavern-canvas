import {
  ImageRecordSchema,
  RECORD_SCHEMAS,
  type ComfyWorkflow,
  type ImageRecord,
  type NovelAiVibe,
} from "@tavern-canvas/storage";

import {
  namespaced_record_base,
  type ConversionContext,
  type ConversionWarning,
} from "../conversion_result.js";
import { decode_base64 } from "../legacy_coercion.js";
import { deterministic_uuid, sha256_hex_bytes } from "../id_derivation.js";
import type { LegacyGalleryDatabaseFixture, LegacySettings } from "../legacy_schema.js";
import { select_owned_fields, to_json_record } from "../payload_extraction.js";
import { SETTINGS_PATH_RULES } from "../settings_path_registry.js";

export interface AssetConversionResult {
  readonly comfy_workflows: readonly ComfyWorkflow[];
  readonly novelai_vibes: readonly NovelAiVibe[];
  readonly image_records: readonly ImageRecord[];
  readonly warnings: readonly ConversionWarning[];
}

function build_comfy_workflow(
  context: ConversionContext,
  id: string,
  payload: Record<string, unknown>,
): ComfyWorkflow {
  return RECORD_SCHEMAS.comfy_workflows.parse({
    ...namespaced_record_base(context, id),
    payload: to_json_record(payload),
  });
}

function build_novelai_vibe(
  context: ConversionContext,
  id: string,
  payload: Record<string, unknown>,
): NovelAiVibe {
  return RECORD_SCHEMAS.novelai_vibes.parse({
    ...namespaced_record_base(context, id),
    payload: to_json_record(payload),
  });
}

export function convert_assets(
  legacy: LegacySettings,
  gallery: LegacyGalleryDatabaseFixture | undefined,
  context: ConversionContext,
): AssetConversionResult {
  const warnings: ConversionWarning[] = [];
  const comfy_workflows: ComfyWorkflow[] = [];
  const novelai_vibes: NovelAiVibe[] = [];
  const image_records: ImageRecord[] = [];

  const legacy_all_id = deterministic_uuid(`${context.namespace}:asset_converter:legacy_all`);
  comfy_workflows.push(
    build_comfy_workflow(
      context,
      legacy_all_id,
      select_owned_fields(legacy, SETTINGS_PATH_RULES, "asset_converter"),
    ),
  );

  for (const [name, workflow_json] of Object.entries(legacy.workers)) {
    const id = deterministic_uuid(`${context.namespace}:asset_converter:workers:${name}`);
    comfy_workflows.push(
      build_comfy_workflow(context, id, { kind: "workflow", name, workflow_json }),
    );
  }

  const edit_id = deterministic_uuid(`${context.namespace}:asset_converter:edit_workflow`);
  comfy_workflows.push(
    build_comfy_workflow(context, edit_id, {
      kind: "edit_workflow",
      editWorkerid: legacy.editWorkerid,
      editWorker: legacy.editWorker,
    }),
  );

  const inpaint_id = deterministic_uuid(`${context.namespace}:asset_converter:inpaint_defaults`);
  comfy_workflows.push(
    build_comfy_workflow(context, inpaint_id, {
      kind: "inpaint_lora_defaults",
      inpaint_denoise: legacy.inpaint_denoise,
      inpaint_brush_size: legacy.inpaint_brush_size,
      inpaint_positive_prompt: legacy.inpaint_positive_prompt,
      inpaint_negative_prompt: legacy.inpaint_negative_prompt,
      weilin_lora_fix: legacy.weilin_lora_fix,
    }),
  );

  for (const [name, preset] of Object.entries(legacy.vibePresets)) {
    const id = deterministic_uuid(`${context.namespace}:asset_converter:vibe:${name}`);
    novelai_vibes.push(build_novelai_vibe(context, id, { kind: "vibe_preset", name, ...preset }));
  }

  const vibe_defaults_id = deterministic_uuid(`${context.namespace}:asset_converter:vibe_defaults`);
  novelai_vibes.push(
    build_novelai_vibe(context, vibe_defaults_id, {
      kind: "vibe_defaults",
      nai3VibeTransfer: legacy.nai3VibeTransfer,
      enableVibeGroupTransfer: legacy.enableVibeGroupTransfer,
      randomVibeGroup: legacy.randomVibeGroup,
      normalizeRefStrength: legacy.normalizeRefStrength,
      nai3CharRef: legacy.nai3CharRef,
      InformationExtracted: legacy.InformationExtracted,
      ReferenceStrength: legacy.ReferenceStrength,
      vibeJiuguanchucun: legacy.vibeJiuguanchucun,
    }),
  );

  for (const entry of gallery?.config_images ?? []) {
    const bytes = decode_base64(entry.data_base64);
    const sha256 = sha256_hex_bytes(bytes);
    const id = deterministic_uuid(`${context.namespace}:asset_converter:config_image:${entry.id}`);
    image_records.push(
      ImageRecordSchema.parse({
        ...namespaced_record_base(context, id),
        sha256,
        last_accessed_at: context.migrated_at,
        pinned: true,
        payload: to_json_record({
          kind: "uploaded_configuration_image",
          legacy_id: entry.id,
          byte_length: bytes.byteLength,
        }),
      }),
    );
  }
  if (gallery === undefined) {
    warnings.push({
      path: "chatu8_config_images.config_images",
      message:
        "No gallery database fixture supplied; uploaded configuration images were not converted.",
    });
  }

  return { comfy_workflows, novelai_vibes, image_records, warnings };
}
