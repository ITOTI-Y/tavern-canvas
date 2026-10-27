import type { AssetId, ImageGenerationRequest } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import { attach_character_loras, attach_character_references } from "./character_assets.js";
import type { CharacterReferenceMode, LibraryCharacter } from "./library_match.js";

function character(id: string, mode: CharacterReferenceMode | null): LibraryCharacter {
  return {
    id,
    name: id,
    appearance: "",
    excluded_traits: "",
    reference: mode === null ? null : { image: `data:image/jpeg;base64,${id}`, mode },
  };
}

function novelai(model_id: string, extra: Record<string, unknown> = {}): ImageGenerationRequest {
  return {
    provider_id: "novelai",
    action: "generate",
    model_id,
    prompt: "tavern",
    ...extra,
  } as unknown as ImageGenerationRequest;
}

/** Stores each reference under an asset id derived from its data URL, so tests can tell them apart. */
const PORT = {
  store_reference: (data_url: string) =>
    Promise.resolve(`asset-${data_url.slice(data_url.indexOf(",") + 1)}` as AssetId),
};

const PROFILE_VIBE = {
  asset_id: "asset-profile" as AssetId,
  strength: 0.5,
  information_extracted: 1,
};

describe("attach_character_loras", () => {
  it("adds the LoRAs and trigger words of the characters in an SD WebUI request", () => {
    const sd = {
      provider_id: "sd_webui",
      action: "generate",
      prompt: "tavern",
    } as unknown as ImageGenerationRequest;

    expect(
      attach_character_loras(
        sd,
        [character("c1", null)],
        [
          {
            file_name: "seraphina_v2",
            weight: 0.8,
            trigger_words: "seraphina",
            character_id: "c1",
          },
          { file_name: "kael", weight: 1, trigger_words: "kael", character_id: "c2" },
        ],
      ),
    ).toMatchObject({
      prompt: "tavern, seraphina",
      lora_tokens: [{ lora_id: "seraphina_v2", weight: 0.8 }],
    });
  });
});

describe("attach_character_references", () => {
  it("sends only the first precise reference on V4.5 and drops vibes with it", async () => {
    const request = await attach_character_references(
      novelai("nai-diffusion-4-5-full", { vibe_references: [PROFILE_VIBE] }),
      [character("c1", "vibe"), character("c2", "precise"), character("c3", "precise")],
      PORT,
    );

    expect(request).not.toHaveProperty("vibe_references");
    expect(request).toMatchObject({
      action: "generate",
      character_references: [{ asset_id: "asset-c2", description: "character" }],
    });
  });

  it("adds vibe references after the profile's own and skips them on V5", async () => {
    const characters = [character("c1", "vibe")];

    await expect(
      attach_character_references(
        novelai("nai-diffusion-4-5-full", { vibe_references: [PROFILE_VIBE] }),
        characters,
        PORT,
      ),
    ).resolves.toMatchObject({
      vibe_references: [PROFILE_VIBE, { asset_id: "asset-c1", strength: 0.6 }],
    });
    await expect(
      attach_character_references(novelai("nai-diffusion-5-full"), characters, PORT),
    ).resolves.not.toHaveProperty("vibe_references");
  });

  it("turns the request into image to image from the first character that asks for it", async () => {
    await expect(
      attach_character_references(
        novelai("nai-diffusion-4-5-full"),
        [character("c1", null), character("c2", "img2img"), character("c3", "img2img")],
        PORT,
      ),
    ).resolves.toMatchObject({
      action: "img2img",
      image_asset_id: "asset-c2",
      strength: 0.7,
      noise: 0,
    });
  });
});
