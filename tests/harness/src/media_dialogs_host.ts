import type { ImageGenerationRequest, ProviderId } from "@tavern-canvas/contracts";
import type {
  ProviderAdapter,
  ProviderOutputAsset,
  ProviderPollResult,
  ProviderProfile,
  ProviderSubmission,
  ProviderTransport,
} from "@tavern-canvas/providers";
import {
  ImageJobQueue,
  type JobIdSource,
  type JobPersistencePort,
  type JobTimeSource,
} from "@tavern-canvas/core";
import { createApp, defineComponent, h, ref } from "vue";

import { create_i18n } from "../../../apps/extension/src/i18n/create_i18n.js";
import { ChatMediaInteractionCommands } from "../../../apps/extension/src/modules/media/chat_media_interactions.js";
import {
  MediaExecutionPlanRegistry,
  MediaJobExecutor,
  submit_manual_generation,
  submit_manual_video,
  type MediaCommandDeps,
} from "../../../apps/extension/src/modules/media/media_command_service.js";
import { PORTAL_TARGET_KEY } from "../../../apps/extension/src/ui/contracts/portal_keys.js";
import GenerationParametersDialog from "../../../apps/extension/src/ui/dialogs/GenerationParametersDialog.vue";
import ImageEditDialog from "../../../apps/extension/src/ui/dialogs/ImageEditDialog.vue";
import InpaintDialog from "../../../apps/extension/src/ui/dialogs/InpaintDialog.vue";
import { create_shadow_root } from "../../../apps/extension/src/ui/create_shadow_root.js";
import { FIRST_PARTY_STYLESHEET } from "../../../apps/extension/src/ui/styles/runtime_stylesheet.js";
import { fixture_by_id, read_bitmap_fixture_bytes } from "./bitmap_fixtures.js";

function output_asset(seed: number): ProviderOutputAsset {
  const bytes = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, seed]);
  return {
    asset: {
      asset_id: crypto.randomUUID(),
      media_type: "image/png",
      byte_length: bytes.byteLength,
      sha256: "c".repeat(64),
    },
    bytes,
  };
}

class MemoryPersistence implements JobPersistencePort {
  save(): Promise<void> {
    return Promise.resolve();
  }
}

class SequenceJobIdSource implements JobIdSource {
  #sequence = 0;
  next(): string {
    this.#sequence += 1;
    return `22222222-2222-4222-8222-${String(this.#sequence).padStart(12, "0")}`;
  }
}

class SequenceTimeSource implements JobTimeSource {
  #milliseconds = Date.parse("2026-08-07T00:00:00.000Z");
  now(): Date {
    const value = new Date(this.#milliseconds);
    this.#milliseconds += 1;
    return value;
  }
}

function multi_result_adapter(count: number): ProviderAdapter<ImageGenerationRequest> {
  const assets = Array.from({ length: count }, (_unused, index) => output_asset(index + 1));
  return {
    provider_id: "sd_webui",
    capabilities: new Set(),
    validate_profile: (profile: unknown) => profile as ProviderProfile,
    submit: (): Promise<ProviderSubmission> =>
      Promise.resolve({
        state: "completed",
        result: {
          request_id: "11111111-1111-4111-8111-111111111111",
          provider_id: "sd_webui",
          assets: assets.map((a) => a.asset),
        },
        output_assets: assets,
      }),
    poll: (): Promise<ProviderPollResult> => {
      throw new Error("unreachable");
    },
    cancel: (): Promise<void> => Promise.resolve(),
  };
}

function failing_adapter(): ProviderAdapter<ImageGenerationRequest> {
  return {
    provider_id: "sd_webui",
    capabilities: new Set(),
    validate_profile: (profile: unknown) => profile as ProviderProfile,
    submit: (): Promise<ProviderSubmission> => Promise.reject(new Error("smoke-test failure")),
    poll: (): Promise<ProviderPollResult> => {
      throw new Error("unreachable");
    },
    cancel: (): Promise<void> => Promise.resolve(),
  };
}

function create_deps(
  adapters: Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>,
  transport: ProviderTransport,
): MediaCommandDeps {
  const plans = new MediaExecutionPlanRegistry();
  const puts: string[] = [];
  const executor = new MediaJobExecutor({
    load_adapters: () => Promise.resolve(adapters),
    profiles: {
      resolve: () =>
        Promise.resolve({
          profile_id: "p",
          provider_id: "sd_webui",
          model_allowlist: [],
          output_mime_type_allowlist: [],
        }),
    },
    transport,
    assets: { read: () => Promise.reject(new Error("unused")) },
    log: { write: () => {} },
    plans,
    store: {
      put_image: (input) => {
        puts.push(input.claimed_media_type);
        return Promise.resolve({ id: crypto.randomUUID() });
      },
      read_image: () => Promise.resolve(null),
    },
    ids: { next: () => crypto.randomUUID() },
    clock: { now: () => new Date().toISOString() },
    resolve_source_message: (job) => ({
      chat_id: job.chat_id,
      message_id: "smoke",
      swipe_id: job.requested_swipe_id,
    }),
  });
  const queue = new ImageJobQueue({
    executor,
    persistence: new MemoryPersistence(),
    job_id_source: new SequenceJobIdSource(),
    time_source: new SequenceTimeSource(),
  });
  return { queue, plans };
}

const JobsPanel = defineComponent({
  setup() {
    const log = ref<string[]>([]);
    const base = {
      chat_id: "chat-1",
      requested_swipe_id: 0,
      generation_anchor: "a".repeat(64),
      source_anchor: "b".repeat(64),
      scene_description: "smoke test",
    };

    async function run_four_image(): Promise<void> {
      const deps = create_deps(
        { sd_webui: multi_result_adapter(4) },
        { execute: () => Promise.reject(new Error("unused")) },
      );
      const job = await submit_manual_generation(deps, base, {
        provider_id: "sd_webui",
        request_id: "11111111-1111-4111-8111-111111111111",
        generation_anchor: base.generation_anchor,
        prompt: "smoke",
        output_count: 4,
        mode: "txt2img",
        model_id: "sdxl-base",
        sampler: "DPM++ 2M",
        scheduler: "Karras",
        width: 512,
        height: 512,
        steps: 20,
        cfg_scale: 7,
      });
      await new Promise((resolve) => setTimeout(resolve, 50));
      const completed = deps.queue.get(job.job_id);
      log.value.push(
        `four-image: state=${String(completed?.state)} image_count=${String(completed?.image_ids.length)}`,
      );
    }

    async function run_video(): Promise<void> {
      const transport: ProviderTransport = {
        execute: () =>
          Promise.resolve({
            status: 200,
            headers: {},
            body: new TextEncoder().encode('<video src="https://example.com/out.mp4">'),
          }),
        fetch_remote_asset: () =>
          Promise.resolve({
            status: 200,
            headers: {},
            body: Uint8Array.from([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 1, 2, 3]),
          }),
      };
      const deps = create_deps({}, transport);
      const job = await submit_manual_video(
        deps,
        base,
        {
          route: "/v1/chat/completions",
          body: new TextEncoder().encode("{}"),
          content_type: "application/json",
        },
        "11111111-1111-4111-8111-111111111112",
        "google_image",
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
      const completed = deps.queue.get(job.job_id);
      log.value.push(
        `video: state=${String(completed?.state)} image_count=${String(completed?.image_ids.length)}`,
      );
    }

    async function run_failed_edit(): Promise<void> {
      const deps = create_deps(
        { sd_webui: failing_adapter() },
        { execute: () => Promise.reject(new Error("unused")) },
      );
      const job = await submit_manual_generation(deps, base, {
        provider_id: "sd_webui",
        request_id: "11111111-1111-4111-8111-111111111113",
        generation_anchor: base.generation_anchor,
        prompt: "smoke",
        output_count: 1,
        mode: "txt2img",
        model_id: "sdxl-base",
        sampler: "DPM++ 2M",
        scheduler: "Karras",
        width: 512,
        height: 512,
        steps: 20,
        cfg_scale: 7,
      });
      await new Promise((resolve) => setTimeout(resolve, 50));
      const completed = deps.queue.get(job.job_id);
      log.value.push(
        `failed-edit: state=${String(completed?.state)} error=${String(completed?.error?.code)}`,
      );
    }

    const commands = new ChatMediaInteractionCommands({
      open_prompt_edit: (image_id) => {
        log.value.push(`command: open_prompt_edit ${image_id}`);
      },
      confirm_active_profile: () => Promise.resolve(true),
      regenerate: (image_id) => {
        log.value.push(`command: regenerate ${image_id}`);
      },
      open_preview: (image_id) => {
        log.value.push(`command: open_preview ${image_id}`);
      },
    });

    return () =>
      h("div", { "data-testid": "jobs-panel" }, [
        h(
          "button",
          { "data-testid": "run-four-image", onClick: () => void run_four_image() },
          "Run four-image",
        ),
        h("button", { "data-testid": "run-video", onClick: () => void run_video() }, "Run video"),
        h(
          "button",
          { "data-testid": "run-failed-edit", onClick: () => void run_failed_edit() },
          "Run failed edit",
        ),
        h(
          "button",
          {
            "data-testid": "simulate-long-press",
            onClick: () =>
              void commands.handle({
                image_id: "44444444-4444-4444-8444-444444444444",
                gesture: "long_press",
              }),
          },
          "Simulate long press",
        ),
        h(
          "button",
          {
            "data-testid": "simulate-double-click",
            onClick: () =>
              void commands.handle({
                image_id: "44444444-4444-4444-8444-444444444444",
                gesture: "double_click",
              }),
          },
          "Simulate double click",
        ),
        h(
          "button",
          {
            "data-testid": "simulate-click",
            onClick: () =>
              void commands.handle({
                image_id: "44444444-4444-4444-8444-444444444444",
                gesture: "click",
              }),
          },
          "Simulate click",
        ),
        h("pre", { "data-testid": "jobs-log" }, log.value.join("\n")),
      ]);
  },
});

// Resolved before mount: an async setup() would need a <Suspense> boundary, which the panel router lacks.
async function load_square_bitmap(): Promise<ImageBitmap> {
  const fixture = fixture_by_id("square");
  const bytes = await read_bitmap_fixture_bytes(fixture);
  return createImageBitmap(new Blob([new Uint8Array(bytes)], { type: "image/png" }));
}

const InpaintPanel = defineComponent({
  props: { bitmap: { type: Object as () => ImageBitmap, required: true } },
  setup(props) {
    const submitted = ref<string | null>(null);
    return () =>
      h(InpaintDialog, {
        open: true,
        title: "Inpaint",
        closeLabel: "Close",
        bitmap: props.bitmap,
        undoLabel: "Undo",
        redoLabel: "Redo",
        eraseLabel: "Erase",
        clearLabel: "Clear",
        zoomInLabel: "Zoom in",
        zoomOutLabel: "Zoom out",
        uploadLabel: "Upload reference",
        generateLabel: "Generate",
        brushSizeLabel: "Brush size",
        positivePromptLabel: "Positive prompt",
        negativePromptLabel: "Negative prompt",
        denoiseLabel: "Denoise strength",
        dimensionErrorLabel: "Mask dimensions do not match the source image",
        onSubmit: (payload: { mask: Uint8ClampedArray }) => {
          submitted.value = `masked_pixels=${String([...payload.mask].filter((v) => v === 255).length)}`;
        },
      });
  },
});

const EditPanel = defineComponent({
  setup() {
    return () =>
      h(ImageEditDialog, {
        open: true,
        title: "Edit tag",
        closeLabel: "Close",
        text: "a cat, masterpiece",
        locked: false,
        presets: [{ preset_id: "quality", label: "masterpiece" }],
        textLabel: "Tag text",
        resetLabel: "Reset",
        lockLabel: "Lock",
        unlockLabel: "Unlock",
        deleteLabel: "Delete",
        saveLabel: "Save",
        processMenuLabel: "Process with",
        bananaRetouchLabel: "Banana retouch",
        grokVideoLabel: "Grok video",
        comfyuiInpaintLabel: "ComfyUI inpaint",
        novelaiInpaintLabel: "NovelAI inpaint",
      });
  },
});

const ParamsPanel = defineComponent({
  setup() {
    const width = ref(1024);
    const height = ref(1024);
    return () =>
      h(GenerationParametersDialog, {
        open: true,
        title: "Generation size",
        closeLabel: "Close",
        mode: "dimensions",
        widthLabel: "Width",
        heightLabel: "Height",
        width: width.value,
        height: height.value,
        widthStepLabel: "Adjust width",
        heightStepLabel: "Adjust height",
        aspectRatioLabel: "Aspect ratio",
        aspectRatioPlaceholder: "Choose an aspect ratio",
        swapLabel: "Swap",
        generateLabel: "Generate",
        "onUpdate:width": (value: number) => {
          width.value = value;
        },
        "onUpdate:height": (value: number) => {
          height.value = value;
        },
      });
  },
});

const PANELS = {
  inpaint: InpaintPanel,
  edit: EditPanel,
  params: ParamsPanel,
  jobs: JobsPanel,
} as const;

function resolve_panel_name(value: string | null): keyof typeof PANELS {
  return value !== null && value in PANELS ? (value as keyof typeof PANELS) : "jobs";
}

const params = new URLSearchParams(window.location.search);
const panel_name = resolve_panel_name(params.get("panel"));
const locale = params.get("locale") === "zh-CN" ? "zh-CN" : "en";

async function start(): Promise<void> {
  const bitmap = panel_name === "inpaint" ? await load_square_bitmap() : null;

  const surface = create_shadow_root(document, FIRST_PARTY_STYLESHEET);
  const locale_runtime = create_i18n();
  const Root = defineComponent({
    render: () =>
      panel_name === "inpaint" && bitmap !== null
        ? h(InpaintPanel, { bitmap })
        : h(PANELS[panel_name]),
  });
  const app = createApp(Root);
  app.use(locale_runtime.i18n);
  app.provide(PORTAL_TARGET_KEY, surface.portal_element);
  app.mount(surface.app_element);

  await locale_runtime.apply_locale(locale, locale);
  await document.fonts.ready;
  document.documentElement.dataset.mediaDialogsHarnessReady = "true";
}

void start();
