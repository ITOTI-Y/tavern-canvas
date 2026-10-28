import {
  RequestIdSchema,
  Sha256Schema,
  type ImageGenerationRequest,
} from "@tavern-canvas/contracts";
import type { BusinessRepositories } from "@tavern-canvas/storage";

import type { IllustrationServiceDeps } from "../modules/illustration/illustration_service.js";
import { slot_library_of } from "../modules/illustration/illustration_module.js";
import { find_characters } from "../modules/illustration/library_match.js";
import type { NovelAiRuntime } from "../modules/novelai/novelai_runtime.js";
import type { AssetRecordSummary, AssetsCapability } from "../ui/contracts/ui_capabilities.js";
import { read_novelai_defaults, read_prompt_tags } from "./capabilities/profiles_capability.js";
import { read_number, read_payload } from "./capabilities/_records.js";
import type { ActiveProfile } from "./provider_transports.js";

export interface IllustrationRequestDeps {
  readonly assets: AssetsCapability;
  readonly active_chat_id: () => string | null;
  readonly read_active_profile: () => Promise<ActiveProfile | null>;
  readonly require_active_profile: () => Promise<ActiveProfile>;
  /** `null` when storage is missing, which also rules out NovelAI defaults and quick edits. */
  readonly novelai: {
    readonly load_runtime: () => Promise<NovelAiRuntime>;
    readonly repositories: BusinessRepositories;
  } | null;
  readonly namespace: () => string;
}

type IllustrationRequestBuilders = Pick<
  IllustrationServiceDeps,
  "build_request" | "build_edit_request"
>;

async function prompt_tag_injector(
  profile: ActiveProfile,
  prompt_tag_records: readonly AssetRecordSummary[],
): Promise<(request: ImageGenerationRequest) => ImageGenerationRequest> {
  const tags = await import("../modules/illustration/prompt_tags.js");
  const selection = tags.effective_prompt_tags({
    provider_id: profile.provider_id,
    model_id: profile.model_id,
    prompt_tags: read_prompt_tags(profile.record),
  });
  const presets = tags.prompt_tag_presets(prompt_tag_records);
  return (request) => tags.inject_prompt_tags(request, selection, presets);
}

export function create_illustration_request_builders(
  deps: IllustrationRequestDeps,
): IllustrationRequestBuilders {
  return {
    async build_request({ positive_prompt, negative_prompt, character_prompts }) {
      const profile = await deps.require_active_profile();
      const [{ build_generation_request }, assets_module, catalog] = await Promise.all([
        import("../modules/generation/build_generation_request.js"),
        import("../modules/illustration/character_assets.js"),
        deps.assets.load(),
      ]);
      const with_prompt_tags = await prompt_tag_injector(profile, catalog.prompt_tag);
      const library = slot_library_of(catalog, deps.active_chat_id());
      const characters = find_characters(
        character_prompts.map((character) => character.name),
        library,
      );
      const request = assets_module.attach_character_loras(
        await build_generation_request(
          {
            provider_id: profile.provider_id,
            positive_prompt,
            negative_prompt,
            image_count: 1,
            references: [],
            ...(profile.model_id === null ? {} : { model_id: profile.model_id }),
          },
          RequestIdSchema.parse(crypto.randomUUID()),
        ),
        characters,
        library.loras,
      );
      const novelai = deps.novelai;
      if (request.provider_id !== "novelai" || request.action !== "generate" || novelai === null) {
        return with_prompt_tags(request);
      }
      const [{ apply_novelai_defaults }, { reference_image_bytes }, runtime] = await Promise.all([
        import("../modules/novelai/novelai_profile_defaults.js"),
        import("../ui/views/assets/reference_image.js"),
        novelai.load_runtime(),
      ]);
      const defaults = read_novelai_defaults(profile.record);
      const configured =
        defaults === null
          ? request
          : await apply_novelai_defaults(request, defaults, {
              store_input: (bytes) => runtime.store_input(bytes),
              async load_vibe(vibe_id) {
                const record = await novelai.repositories.novelai_vibes.get(
                  deps.namespace(),
                  vibe_id,
                );
                const payload = record === null ? {} : read_payload(record);
                return typeof payload.image === "string"
                  ? {
                      image_bytes: reference_image_bytes(payload.image),
                      strength: read_number(payload, "strength", 0.6),
                      information_extracted: read_number(payload, "information_extracted", 1),
                    }
                  : null;
              },
            });
      return with_prompt_tags(
        await assets_module.attach_character_references(configured, characters, {
          store_reference: (data_url) => runtime.store_input(reference_image_bytes(data_url)),
        }),
      );
    },

    async build_edit_request(edit) {
      const profile = await deps.read_active_profile();
      if (profile?.provider_id !== "novelai" || deps.novelai === null) {
        throw new Error("Quick edits need an active NovelAI provider profile");
      }
      const [
        { build_novelai_edit_request },
        { compute_generation_anchor },
        { DEFAULT_NOVELAI_MODEL_ID },
        catalog,
      ] = await Promise.all([
        import("../modules/illustration/slot_edits.js"),
        import("../modules/generation/build_generation_request.js"),
        import("../modules/novelai/novelai_request_defaults.js"),
        deps.assets.load(),
      ]);
      const with_prompt_tags = await prompt_tag_injector(profile, catalog.prompt_tag);
      const request_id = RequestIdSchema.parse(crypto.randomUUID());
      const context = {
        request_id,
        generation_anchor: Sha256Schema.parse(await compute_generation_anchor(request_id)),
        model_id: profile.model_id ?? DEFAULT_NOVELAI_MODEL_ID,
      };
      if (edit.kind !== "inpaint") {
        return with_prompt_tags(build_novelai_edit_request(edit, context));
      }
      const runtime = await deps.novelai.load_runtime();
      return with_prompt_tags(
        build_novelai_edit_request(edit, {
          ...context,
          mask_asset_id: await runtime.store_input(edit.mask_png),
        }),
      );
    },
  };
}
