import type { Uuid } from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";
import { effectScope } from "vue";

import type { GalleryRecordSummary } from "../contracts/ui_capabilities.js";
import { IDLE_COMMAND_STATE, type StudioState } from "../contracts/view_models.js";
import type { StudioController } from "../controllers/studio_controller.js";
import { use_generation_preview_urls } from "./use_generation_preview_urls.js";

const IMAGE_ID = "11111111-1111-4111-8111-111111111111" as Uuid;

function build_record(overrides: Partial<GalleryRecordSummary> = {}): GalleryRecordSummary {
  return {
    id: IMAGE_ID,
    provider_id: "sd_webui",
    source_chat_id: "chat-1",
    source_message_id: 1,
    media_type: "image/webp",
    width: 640,
    height: 480,
    pinned: false,
    quarantined: false,
    created_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function build_state(records: readonly GalleryRecordSummary[]): StudioState {
  return {
    route: "workbench",
    color_mode: "light",
    loading: new Set(),
    failures: new Map(),
    workbench: {
      profiles: [],
      active_profile_id: null,
      jobs: [
        {
          job_id: "22222222-2222-4222-8222-222222222222" as Uuid,
          request_id: "22222222-2222-4222-8222-222222222222" as Uuid,
          provider_id: "sd_webui",
          state: "completed",
          image_count: 1,
          completed_image_ids: [IMAGE_ID],
          error: null,
          submitted_at: "2026-01-01T00:00:00Z",
        },
      ],
      submit_command: IDLE_COMMAND_STATE,
    },
    llm_connections: { connections: [], selected_connection_id: null },
    library: { personas: [], knowledge: [], selected_knowledge_ids: [] },
    prompt: {
      presets: [],
      selected_preset_id: null,
      draft: null,
      save_command: IDLE_COMMAND_STATE,
    },
    assets: {
      active_category: "character",
      records: { character: [], outfit: [], lora: [], vibe: [], reference: [], workflow: [] },
      vocabulary_catalog: [],
      vocabulary_install_command: IDLE_COMMAND_STATE,
    },
    gallery: { records, selected_record_id: null, bulk_delete_command: IDLE_COMMAND_STATE },
    diagnostics: {
      snapshot: null,
      timeline: [],
      connection_test_command: IDLE_COMMAND_STATE,
      support_bundle_command: IDLE_COMMAND_STATE,
    },
    settings: {
      settings: null,
      vocabulary_update_channel: null,
      browser_secret_vault: { state: "unavailable", secret_count: 0 },
      update_command: IDLE_COMMAND_STATE,
    },
    inspector: { collapsed: false, width: 320, selected_record: null },
    tasks: [],
  };
}

function build_controller(read_gallery_bytes: StudioController["read_gallery_bytes"]) {
  return { read_gallery_bytes } as unknown as StudioController;
}

describe("use_generation_preview_urls: object URL media type", () => {
  it("creates the preview blob with the gallery record's own media type, not untyped", async () => {
    const create_spy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock");
    const state = build_state([build_record({ media_type: "image/webp" })]);
    const controller = build_controller(() => Promise.resolve(new Uint8Array([1, 2, 3])));

    const scope = effectScope();
    scope.run(() => {
      use_generation_preview_urls(() => state, controller);
    });
    await vi.waitFor(() => {
      expect(create_spy).toHaveBeenCalledTimes(1);
    });

    const blob = create_spy.mock.calls[0]?.[0] as Blob;
    expect(blob.type).toBe("image/webp");
    scope.stop();
    create_spy.mockRestore();
  });

  it("falls back to an untyped blob when the record has not loaded into gallery state yet", async () => {
    const create_spy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock");
    const state = build_state([]);
    const controller = build_controller(() => Promise.resolve(new Uint8Array([1, 2, 3])));

    const scope = effectScope();
    scope.run(() => {
      use_generation_preview_urls(() => state, controller);
    });
    await vi.waitFor(() => {
      expect(create_spy).toHaveBeenCalledTimes(1);
    });

    const blob = create_spy.mock.calls[0]?.[0] as Blob;
    expect(blob.type).toBe("");
    scope.stop();
    create_spy.mockRestore();
  });
});
