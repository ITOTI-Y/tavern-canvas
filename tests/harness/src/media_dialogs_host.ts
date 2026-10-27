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
import {
  MediaExecutionPlanRegistry,
  MediaJobExecutor,
  submit_manual_generation,
  type MediaCommandDeps,
} from "../../../apps/extension/src/modules/media/media_command_service.js";
import { PORTAL_TARGET_KEY } from "../../../apps/extension/src/ui/contracts/portal_keys.js";
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

    return () =>
      // The Shadow Root host ignores pointer events; harness-only controls opt back in.
      h("div", { "data-testid": "jobs-panel", style: { pointerEvents: "auto" } }, [
        h(
          "button",
          { "data-testid": "run-four-image", onClick: () => void run_four_image() },
          "Run four-image",
        ),
        h(
          "button",
          { "data-testid": "run-failed-edit", onClick: () => void run_failed_edit() },
          "Run failed edit",
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

const PANELS = {
  inpaint: InpaintPanel,
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
