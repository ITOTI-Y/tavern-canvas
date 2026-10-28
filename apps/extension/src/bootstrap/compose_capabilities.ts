import {
  derive_analysis_credential_reference,
  RequestIdSchema,
  type ImageGenerationRequest,
  type ProviderId,
} from "@tavern-canvas/contracts";
import {
  BrowserRandomSource,
  ImageJobQueue,
  SystemJobTimeSource,
  type RuntimeModule,
} from "@tavern-canvas/core";
import type { ProviderAdapter, ProviderAssetReader } from "@tavern-canvas/providers";
import {
  create_business_repositories,
  GalleryImageRecordRepository,
  open_database,
  type StorageDatabase,
} from "@tavern-canvas/storage";

import type { BootstrapProbeResult } from "../host/index.js";
import type { CompositeHostAdapter } from "../host/composite_host.js";
import {
  IndexedDbJobPersistence,
  MediaExecutionPlanRegistry,
  MediaJobExecutor,
  type GeneratedImageStoreDeps,
} from "../modules/media/media_command_service.js";
import {
  IllustrationService,
  create_wardrobe_runner,
} from "../modules/illustration/illustration_service.js";
import { create_wardrobe_library_port } from "../modules/wardrobe/wardrobe_library_port.js";
import { WardrobeService } from "../modules/wardrobe/wardrobe_service.js";
import {
  IllustrationModule,
  load_slot_prompt_context,
  new_slot_id,
} from "../modules/illustration/illustration_module.js";
import {
  create_prompt_translator,
  type PromptTranslator,
} from "../modules/translation/prompt_translator.js";
import type { NovelAiRuntime } from "../modules/novelai/novelai_runtime.js";
import { create_sillytavern_settings } from "../storage/sillytavern_settings.js";
import { SecretBackendRouter } from "../host/secret_backend_router.js";
import {
  create_browser_secret_vault,
  create_device_secret_vault,
  type BrowserSecretVaultPort,
} from "../storage/browser_secret_vault.js";
import type { ProviderFetch } from "../transport/browser_fetch.js";
import { select_transport, type TransportSelection } from "../transport/transport_selector.js";
import type { CapabilityId, StudioCapabilities } from "../ui/contracts/ui_capabilities.js";
import { create_unavailable_capabilities } from "../ui/controllers/unavailable_capabilities.js";
import { create_assets_capability } from "./capabilities/assets_capability.js";
import {
  create_diagnostics_capability,
  TaskTimeline,
} from "./capabilities/diagnostics_capability.js";
import { create_gallery_capability } from "./capabilities/gallery_capability.js";
import { create_generation_capability } from "./capabilities/generation_capability.js";
import { create_novelai_capability } from "./capabilities/novelai_capability.js";
import { HostGenerationOriginSource } from "./capabilities/generation_context.js";
import {
  adapter_profile_of,
  create_profiles_capability,
} from "./capabilities/profiles_capability.js";
import { create_prompt_presets_capability } from "./capabilities/prompt_presets_capability.js";
import { create_settings_capability } from "./capabilities/settings_capability.js";
import { create_vocabulary_capability } from "./capabilities/vocabulary_capability.js";
import {
  build_provider_adapters,
  create_asset_reader,
  create_image_store_port,
} from "./image_store_ports.js";
import { create_illustration_request_builders } from "./illustration_requests.js";
import {
  create_novelai_transport,
  create_provider_transport,
  describe_active_profile,
  live_transport,
  type ActiveProfile,
} from "./provider_transports.js";
import {
  capability_unavailable_error,
  resolve_capability,
  to_resolution_record,
  unavailable,
  type CapabilityResolution,
  type CapabilityResolutionRecord,
} from "./capability_resolution.js";
import {
  create_host_adapter,
  read_secret_destination,
  read_secret_resolver,
  read_settings_host,
} from "./host_environment.js";

export interface ComposeCapabilitiesOptions {
  readonly probe: BootstrapProbeResult;
  readonly globals?: unknown;
  readonly extension_version?: string;
  readonly open_storage?: () => Promise<StorageDatabase>;
  readonly create_vocabulary_worker?: (() => VocabularyWorkerLike) | null;
  readonly estimate_storage?: () => Promise<{ usage?: number; quota?: number } | undefined>;
  readonly provider_fetch?: ProviderFetch;
  readonly create_browser_secret_vault?: (globals: unknown) => BrowserSecretVaultPort | null;
}

export interface VocabularyWorkerLike {
  postMessage(message: unknown): void;
  terminate(): void;
  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
  addEventListener(type: "error", handler: (event: { readonly message: string }) => void): void;
}

export interface StudioComposition {
  readonly capabilities: StudioCapabilities;
  readonly resolutions: readonly CapabilityResolutionRecord[];
  readonly host: CompositeHostAdapter | null;
  /** `null` when the host, storage or settings needed to illustrate replies are missing. */
  readonly illustrations: IllustrationService | null;
  /** `null` when the host or settings needed to translate are missing. */
  readonly translator: PromptTranslator | null;
  readonly modules: readonly RuntimeModule[];
  dispose(): Promise<void>;
}

const STORAGE_UNAVAILABLE =
  "IndexedDB could not be opened, so nothing that persists records can be composed";
const HOST_UNAVAILABLE = "No usable SillyTavern + TavernHelper host pair was detected";
const SETTINGS_HOST_UNAVAILABLE =
  "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair";

const NOVELAI_PREPARATION_TIMEOUT_MS = 120_000;
// NovelAI answers 429 to image requests that arrive together on one account; spacing them avoids it.
const PROVIDER_START_INTERVAL_MS = { novelai: 1_500 } as const;

const ANALYSIS_KEY_UNREADABLE =
  "This host cannot reveal stored credentials, so the analysis API key cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml or switch credential storage to the encrypted browser vault";

function default_estimate_storage(): Promise<{ usage?: number; quota?: number } | undefined> {
  return navigator.storage.estimate();
}

function default_vocabulary_worker_factory(): (() => VocabularyWorkerLike) | null {
  if (typeof Worker === "undefined") {
    return null;
  }
  return () =>
    new Worker(new URL("../workers/vocabulary_worker.js", import.meta.url), { type: "module" });
}

export async function compose_studio_capabilities(
  options: ComposeCapabilitiesOptions,
): Promise<StudioComposition> {
  const globals = options.globals ?? globalThis;
  const extension_version = options.extension_version ?? "development";
  const fallback = create_unavailable_capabilities();
  const resolutions: CapabilityResolutionRecord[] = [];
  const teardown: (() => void | Promise<void>)[] = [];

  function record<TValue extends { load: (...args: never[]) => Promise<unknown> }>(
    capability_id: CapabilityId,
    resolution: CapabilityResolution<TValue>,
    fallback_value: TValue,
  ): TValue {
    resolutions.push(to_resolution_record(capability_id, resolution));
    if (resolution.status === "available") {
      return resolution.value;
    }
    const reason = resolution.reason;
    return {
      ...fallback_value,
      load: () => Promise.reject(capability_unavailable_error(reason)),
    };
  }

  const capability_matrix = options.probe.ready ? options.probe.matrix : {};
  const host = create_host_adapter(globals, capability_matrix);

  const modules: RuntimeModule[] = [];
  let database: StorageDatabase | null = null;
  try {
    database = await (options.open_storage ?? open_database)();
  } catch {
    database = null;
  }

  const settings_host = read_settings_host(globals);
  const settings_adapter =
    settings_host === null ? null : create_sillytavern_settings(settings_host);
  const namespace = (): string => settings_adapter?.get_settings().active_namespace ?? "primary";
  const now = (): string => new Date().toISOString();
  const host_secret_destination = read_secret_destination(globals);
  const host_secret_resolver = read_secret_resolver(globals);
  let browser_secret_vault: BrowserSecretVaultPort | null;
  try {
    browser_secret_vault = (options.create_browser_secret_vault ?? create_browser_secret_vault)(
      globals,
    );
  } catch {
    browser_secret_vault = null;
  }
  if (browser_secret_vault !== null) {
    teardown.push(() => browser_secret_vault.close());
  }
  const device_vault = create_device_secret_vault(globals);
  if (device_vault !== null) {
    teardown.push(() => device_vault.close());
  }
  const secret_router = new SecretBackendRouter({
    mode: () => settings_adapter?.get_settings().credential_storage_mode ?? "host",
    host_destination: host_secret_destination,
    host_resolver: host_secret_resolver,
    browser_vault: browser_secret_vault,
    device_vault,
  });
  const secrets = secret_router.has_destination ? secret_router : null;
  const secret_resolver = secret_router.has_resolver ? secret_router : null;
  const repositories = database === null ? null : create_business_repositories(database);
  const timeline = new TaskTimeline();
  let provider_adapters: Promise<
    Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>
  > | null = null;
  const load_provider_adapters = (): Promise<
    Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>
  > => (provider_adapters ??= build_provider_adapters(database));
  /** Last provider seen by `read_active_profile`, for checks that must answer synchronously. */
  let last_provider_id: ProviderId | null = null;
  /** Read per use, so switching the active profile in Settings applies to the next request. */
  const read_active_profile = async (): Promise<ActiveProfile | null> => {
    if (repositories === null || settings_adapter === null) {
      return null;
    }
    const profile_id = settings_adapter.get_settings().active_provider_profile_id;
    const record =
      profile_id === null
        ? null
        : await repositories.provider_profiles.get(namespace(), profile_id).catch(() => null);
    const profile =
      record === null ? null : describe_active_profile(record, secret_resolver !== null);
    last_provider_id = profile?.provider_id ?? null;
    return profile;
  };
  await read_active_profile();
  const require_active_profile = async (): Promise<ActiveProfile> => {
    const profile = await read_active_profile();
    if (profile === null) {
      throw new Error("No provider profile is active; choose one in Settings");
    }
    return profile;
  };

  let novelai_runtime: Promise<NovelAiRuntime> | null = null;
  const load_novelai_runtime =
    repositories === null || database === null
      ? null
      : (): Promise<NovelAiRuntime> =>
          (novelai_runtime ??= import("../modules/novelai/novelai_runtime.js").then((runtime) =>
            runtime.create_novelai_runtime({
              vibe_encodings: repositories.novelai_vibe_encodings,
              provider_inputs: repositories.provider_input_assets,
              namespace,
              gallery_assets: create_asset_reader(database, namespace),
              transport: () =>
                live_transport(async () =>
                  create_novelai_transport(
                    (await read_active_profile())?.direct_cloud ?? null,
                    secret_resolver,
                    options.provider_fetch,
                  ),
                ),
              fetch: options.provider_fetch ?? globalThis.fetch.bind(globalThis),
            }),
          ));
  const provider_asset_reader: ProviderAssetReader | null =
    load_novelai_runtime === null || database === null
      ? null
      : {
          async read(asset_id, signal) {
            try {
              return await create_asset_reader(database, namespace).read(asset_id, signal);
            } catch {
              return (await load_novelai_runtime()).assets.read(asset_id, signal);
            }
          },
        };
  const prepare_request =
    load_novelai_runtime === null
      ? null
      : async (request: ImageGenerationRequest): Promise<ImageGenerationRequest> =>
          request.provider_id !== "novelai"
            ? request
            : (await load_novelai_runtime()).prepare(
                request,
                AbortSignal.timeout(NOVELAI_PREPARATION_TIMEOUT_MS),
              );

  const novelai = record(
    "novelai",
    load_novelai_runtime === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : resolve_capability(() =>
          create_novelai_capability(async () => (await load_novelai_runtime()).service),
        ),
    fallback.novelai,
  );

  const settings = record(
    "settings",
    settings_adapter === null
      ? unavailable(SETTINGS_HOST_UNAVAILABLE)
      : resolve_capability(() =>
          create_settings_capability({
            settings: settings_adapter,
            database,
            extension_version,
            secrets,
            browser_secret_vault,
            host_secrets: host_secret_destination,
            list_worldbooks: host === null ? null : () => host.list_worldbooks(),
          }),
        ),
    fallback.settings,
  );

  const profiles = record(
    "profiles",
    repositories === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : resolve_capability(() =>
          create_profiles_capability({
            repository: repositories.provider_profiles,
            namespace,
            load_adapters: load_provider_adapters,
            secrets,
            credential_present: async (reference) =>
              secrets === null ||
              (settings_adapter?.get_settings().credential_storage_mode ?? "host") === "host"
                ? null
                : secrets.probe_secret(reference),
            now,
          }),
        ),
    fallback.profiles,
  );

  const prompt_presets = record(
    "prompt_presets",
    repositories === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : resolve_capability(() =>
          create_prompt_presets_capability({
            repository: repositories.prompt_presets,
            namespace,
            now,
            new_id: () => crypto.randomUUID(),
          }),
        ),
    fallback.prompt_presets,
  );

  const assets = record(
    "assets",
    repositories === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : resolve_capability(() => create_assets_capability({ repositories, namespace, now })),
    fallback.assets,
  );

  const gallery = record(
    "gallery",
    database === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : resolve_capability(() =>
          create_gallery_capability({
            database,
            repository: new GalleryImageRecordRepository(database),
            namespace,
            now,
            reveal_message:
              host === null
                ? null
                : (chat_id, message_id) => {
                    if (host.get_active_chat_id() !== chat_id) {
                      return "other_chat";
                    }
                    const message = host.find_message_element(message_id)?.closest(".mes");
                    if (message === null || message === undefined) {
                      return "not_found";
                    }
                    message.scrollIntoView({ behavior: "smooth", block: "center" });
                    return "revealed";
                  },
          }),
        ),
    fallback.gallery,
  );

  let illustrations: IllustrationService | null = null;
  const generation = record(
    "generation",
    database === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : host === null
        ? unavailable(HOST_UNAVAILABLE)
        : resolve_capability(() => {
            const select = (profile: ActiveProfile | null): TransportSelection =>
              select_transport({
                direct_provider_base_url: profile?.base_url ?? null,
                direct_cloud: profile?.direct_cloud ?? null,
              });
            const plans = new MediaExecutionPlanRegistry();
            const image_store: GeneratedImageStoreDeps = {
              store: create_image_store_port(database, namespace),
              ids: { next: () => crypto.randomUUID() },
              clock: { now },
              resolve_source_message: (job) => {
                const location = illustrations?.source_of(job.request_id) ?? null;
                return location === null
                  ? null
                  : {
                      chat_id: location.chat_id,
                      message_id: String(location.message_id),
                      swipe_id: location.swipe_id,
                    };
              },
            };
            const queue = new ImageJobQueue({
              executor: new MediaJobExecutor({
                ...image_store,
                load_adapters: load_provider_adapters,
                profiles: {
                  resolve: async (provider_id) => {
                    const adapter = (await load_provider_adapters())[provider_id];
                    const profile = await read_active_profile();
                    if (adapter === undefined || profile?.provider_id !== provider_id) {
                      throw new Error(`No stored provider profile is active for ${provider_id}`);
                    }
                    return adapter.validate_profile(adapter_profile_of(profile.record));
                  },
                },
                transport: live_transport(async () =>
                  create_provider_transport(select(await read_active_profile()), {
                    secrets: secret_resolver,
                    ...(options.provider_fetch === undefined
                      ? {}
                      : { fetch: options.provider_fetch }),
                  }),
                ),
                assets: provider_asset_reader ?? create_asset_reader(database, namespace),
                ...(load_novelai_runtime === null
                  ? {}
                  : {
                      postprocess: async (request, outputs) =>
                        request.provider_id === "novelai" && request.action === "infill"
                          ? (await load_novelai_runtime()).finish(
                              request,
                              outputs,
                              AbortSignal.timeout(NOVELAI_PREPARATION_TIMEOUT_MS),
                            )
                          : outputs,
                    }),
                log: { write: () => {} },
                plans,
              }),
              persistence: new IndexedDbJobPersistence(database, namespace()),
              job_id_source: { next: () => crypto.randomUUID() },
              time_source: new SystemJobTimeSource(),
              global_concurrency: settings_adapter?.get_settings().global_concurrency ?? 1,
              provider_start_interval_ms: PROVIDER_START_INTERVAL_MS,
            });
            teardown.push(timeline.observe_jobs(queue));
            const generation_capability = create_generation_capability({
              queue,
              plans,
              jobs: create_business_repositories(database).generation_jobs,
              namespace,
              origin: new HostGenerationOriginSource(
                host,
                new BrowserRandomSource(globalThis.crypto),
              ),
              new_request_id: () => RequestIdSchema.parse(crypto.randomUUID()),
              ...(prepare_request === null ? {} : { prepare_request }),
            });
            if (settings_adapter !== null) {
              const resolve_analysis_key = (): Promise<string> => {
                if (secret_resolver === null) {
                  return Promise.reject(new Error(ANALYSIS_KEY_UNREADABLE));
                }
                return secret_resolver.resolve_secret(
                  derive_analysis_credential_reference(
                    settings_adapter.get_settings().active_namespace,
                  ),
                );
              };
              illustrations = new IllustrationService({
                host,
                settings: () => settings_adapter.get_settings().illustration,
                auto_generation_enabled: () =>
                  settings_adapter.get_settings().auto_generation_enabled,
                prompt_context: (chat_id) =>
                  load_slot_prompt_context(
                    prompt_presets,
                    assets,
                    settings_adapter.get_settings().illustration.prompt_preset_id,
                    chat_id,
                  ),
                wardrobe: new WardrobeService({
                  host,
                  library: create_wardrobe_library_port(assets),
                  run: create_wardrobe_runner({
                    host,
                    settings: () => settings_adapter.get_settings().illustration,
                    resolve_analysis_key,
                    new_generation_id: () => crypto.randomUUID(),
                  }),
                  new_id: () => crypto.randomUUID(),
                }),
                ...create_illustration_request_builders({
                  assets,
                  active_chat_id: () => host.get_active_chat_id(),
                  read_active_profile,
                  require_active_profile,
                  novelai:
                    load_novelai_runtime === null || repositories === null
                      ? null
                      : { load_runtime: load_novelai_runtime, repositories },
                  namespace,
                }),
                edits_available: () => last_provider_id === "novelai",
                resolve_analysis_key,
                async submit(request) {
                  const profile = await require_active_profile();
                  // Job errors carry only a code, so a missing credential is reported here instead.
                  select(profile);
                  const job = await generation_capability.submit({
                    profile_id: profile.record.id,
                    request,
                  });
                  return job.request_id;
                },
                jobs: queue,
                new_slot_id,
                new_generation_id: () => crypto.randomUUID(),
                wait: (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
              });
              modules.push(new IllustrationModule(illustrations, host));
            }
            return generation_capability;
          }),
    fallback.generation,
  );

  const create_worker =
    options.create_vocabulary_worker === undefined
      ? default_vocabulary_worker_factory()
      : options.create_vocabulary_worker;
  const vocabulary = record(
    "vocabulary",
    database === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : create_worker === null
        ? unavailable("This host has no Worker constructor, so vocabulary search cannot run")
        : resolve_capability(() =>
            create_vocabulary_capability({
              async load_catalog() {
                const { VocabularyCatalogClient } =
                  await import("../modules/vocabulary/vocabulary_catalog_client.js");
                return new VocabularyCatalogClient({
                  current_extension_version: extension_version,
                  open_database_impl: () => Promise.resolve(database),
                });
              },
              async create_client() {
                const { VocabularyClient } =
                  await import("../modules/vocabulary/vocabulary_client.js");
                return new VocabularyClient({ create_worker });
              },
            }),
          ),
    fallback.vocabulary,
  );

  const diagnostics = record(
    "diagnostics",
    resolve_capability(() =>
      create_diagnostics_capability({
        capability_matrix,
        helper_version: options.probe.ready ? options.probe.helper_version : null,
        timeline,
        resolutions: () => resolutions,
        settings: () => settings_adapter?.get_settings() ?? null,
        estimate_storage: options.estimate_storage ?? default_estimate_storage,
        extension_version,
      }),
    ),
    fallback.diagnostics,
  );

  return {
    capabilities: {
      generation,
      profiles,
      prompt_presets,
      assets,
      gallery,
      vocabulary,
      diagnostics,
      settings,
      novelai,
    },
    resolutions,
    host,
    illustrations,
    translator:
      host === null || settings_adapter === null
        ? null
        : create_prompt_translator({
            host,
            settings: () => settings_adapter.get_settings().translation,
            vocabulary,
          }),
    modules,
    async dispose() {
      for (const stop of [...teardown].reverse()) {
        try {
          await stop();
        } catch {
          /* A failed teardown step must not prevent the remaining ones from running. */
        }
      }
      await settings_adapter?.stop();
    },
  };
}
