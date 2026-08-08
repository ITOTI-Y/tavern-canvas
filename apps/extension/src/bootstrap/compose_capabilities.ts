import {
  ProviderIdSchema,
  direct_image_catalog_entry,
  type ImageGenerationRequest,
  type ProviderId,
} from "@tavern-canvas/contracts";
import {
  BrowserRandomSource,
  BrowserRequestIdSource,
  ImageJobQueue,
  MessageBinder,
  RequestImageTool,
  SessionRegistry,
  SystemJobTimeSource,
  type MessagePort,
  type RuntimeModule,
} from "@tavern-canvas/core";
import type {
  ProviderAdapter,
  ProviderAssetReader,
  ProviderTransport,
} from "@tavern-canvas/providers";
import {
  create_business_repositories,
  GalleryImageRecordRepository,
  ImageRecordFieldsSchema,
  open_database,
  put_image,
  read_image_bytes,
  type PutImageRecordMetadata,
  type StorageDatabase,
} from "@tavern-canvas/storage";

import type { BootstrapProbeResult } from "../host/index.js";
import type { CompositeHostAdapter } from "../host/composite_host.js";
import {
  HostSurfaceChatMediaInteractions,
  StandardHostChatMediaInteractions,
  type ChatMediaInteractionPort,
} from "../modules/media/chat_media_interactions.js";
import {
  IndexedDbJobPersistence,
  MediaExecutionPlanRegistry,
  MediaJobExecutor,
  type ImageStorePort,
} from "../modules/media/media_command_service.js";
import {
  AutomaticGenerationSessionModule,
  AutomaticImageRequestRouter,
  HostFallbackTextSink,
  HostGenerationSessionPort,
} from "../modules/generation/automatic_generation.js";
import { GenerationTriggerModule } from "../modules/generation/generation_trigger_module.js";
import { HostMessagePort } from "../modules/generation/message_binding_module.js";
import { TauriChatSurfaceModule } from "../modules/tauri/chat_surface_module.js";
import { TauriWorldInfoActivationModule } from "../modules/tauri/world_info_activation_module.js";
import { create_sillytavern_settings } from "../storage/sillytavern_settings.js";
import type { SecretResolverPort } from "../host/sillytavern_secret_resolver.js";
import type { ProviderFetch } from "../transport/browser_fetch.js";
import { DirectCloudTransport, DirectLlmTransport } from "../transport/direct_cloud_transport.js";
import { LocalDirectTransport } from "../transport/local_direct_transport.js";
import { select_transport } from "../transport/transport_selector.js";
import type { CapabilityId, StudioCapabilities } from "../ui/contracts/ui_capabilities.js";
import { create_unavailable_capabilities } from "../ui/controllers/unavailable_capabilities.js";
import { create_assets_capability } from "./capabilities/assets_capability.js";
import {
  create_diagnostics_capability,
  TaskTimeline,
} from "./capabilities/diagnostics_capability.js";
import { create_gallery_capability } from "./capabilities/gallery_capability.js";
import { create_generation_capability } from "./capabilities/generation_capability.js";
import { HostGenerationOriginSource } from "./capabilities/generation_context.js";
import {
  create_knowledge_capability,
  create_llm_connections_capability,
  create_personas_capability,
} from "./capabilities/library_capability.js";
import { create_migration_capability } from "./capabilities/migration_capability.js";
import {
  VAULT_KEY_FIELD,
  adapter_profile_of,
  create_profiles_capability,
} from "./capabilities/profiles_capability.js";
import { create_prompt_presets_capability } from "./capabilities/prompt_presets_capability.js";
import {
  create_settings_capability,
  VocabularyChannelState,
} from "./capabilities/settings_capability.js";
import {
  as_record,
  read_array,
  read_optional_string,
  read_payload,
} from "./capabilities/_records.js";
import { create_vocabulary_capability } from "./capabilities/vocabulary_capability.js";
import {
  capability_unavailable_error,
  resolve_capability,
  to_resolution_record,
  unavailable,
  type CapabilityResolution,
  type CapabilityResolutionRecord,
} from "./capability_resolution.js";
import {
  create_legacy_source,
  create_host_adapter,
  read_secret_destination,
  read_secret_resolver,
  read_settings_host,
  UNRESOLVED_LEGACY_IMAGES,
} from "./host_environment.js";

export interface ComposeCapabilitiesOptions {
  readonly probe: BootstrapProbeResult;
  readonly globals?: unknown;
  readonly extension_version?: string;
  /** Injection seams: production defaults reach the real IndexedDB, Worker and provider adapters. */
  readonly open_storage?: () => Promise<StorageDatabase>;
  readonly create_vocabulary_worker?: (() => VocabularyWorkerLike) | null;
  readonly estimate_storage?: () => Promise<{ usage?: number; quota?: number } | undefined>;
  readonly message_port?: MessagePort | null;
  /** The single network boundary: swapped in tests so the whole job path stays real. */
  readonly provider_fetch?: ProviderFetch;
}

export interface VocabularyWorkerLike {
  postMessage(message: unknown): void;
  terminate(): void;
  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
}

export interface StudioComposition {
  readonly capabilities: StudioCapabilities;
  readonly resolutions: readonly CapabilityResolutionRecord[];
  readonly host: CompositeHostAdapter | null;
  /**
   * Already-classified chat-image gestures. Only a host that owns the rendered message DOM
   * (TauriTavern's ChatSurface) can produce them; standard SillyTavern exposes no such hook and
   * would need a private selector, which is forbidden, so it gets the permanently-unavailable port
   * and the same commands stay reachable from the Gallery instead.
   */
  readonly chat_media: ChatMediaInteractionPort;
  /** Host-specific runtime modules the caller starts alongside its own. */
  readonly modules: readonly RuntimeModule[];
  dispose(): Promise<void>;
}

const STORAGE_UNAVAILABLE =
  "IndexedDB could not be opened, so nothing that persists records can be composed";
const HOST_UNAVAILABLE = "No usable SillyTavern + TavernHelper host pair was detected";
const SETTINGS_HOST_UNAVAILABLE =
  "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair";
const SECRET_VAULT_UNAVAILABLE =
  "This host exposes no secret vault that both stores and reveals a credential, so a text-LLM connection could not be authenticated";

function default_estimate_storage(): Promise<{ usage?: number; quota?: number } | undefined> {
  return navigator.storage.estimate();
}

/**
 * The vocabulary search Worker is a first-party module bundled beside the extension entry; hosts
 * without a `Worker` constructor (unit tests, non-browser runtimes) get `null` and the capability
 * resolves unavailable instead of throwing at first search.
 */
function default_vocabulary_worker_factory(): (() => VocabularyWorkerLike) | null {
  if (typeof Worker === "undefined") {
    return null;
  }
  return () =>
    new Worker(new URL("../workers/vocabulary_worker.js", import.meta.url), { type: "module" });
}

/**
 * The five concrete adapters, imported only when a job runs or a connection is tested. Loading them
 * at composition time put every provider's request mapping, response parsing and workflow renderer
 * into the initial chunk for a session that may never generate anything.
 */
async function build_provider_adapters(
  database: StorageDatabase | null,
): Promise<Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>> {
  const { ComfyUiAdapter, GoogleImageAdapter, NovelAiAdapter, OpenAiImageAdapter, SdWebuiAdapter } =
    await import("@tavern-canvas/providers/adapters");
  const adapters: Record<string, ProviderAdapter<ImageGenerationRequest>> = {
    novelai: new NovelAiAdapter(),
    sd_webui: new SdWebuiAdapter(),
    openai_image: new OpenAiImageAdapter(),
    google_image: new GoogleImageAdapter(),
  };
  if (database !== null) {
    const repositories = create_business_repositories(database);
    adapters.comfyui = new ComfyUiAdapter({
      workflow_store: {
        async load(workflow_id) {
          const record = await repositories.comfy_workflows.get("primary", workflow_id);
          return record?.payload;
        },
      },
    });
  }
  return adapters;
}

/** Reads a stored gallery image back as a provider source asset (i2i / edit / inpaint inputs). */
function create_asset_reader(
  database: StorageDatabase,
  namespace: () => string,
): ProviderAssetReader {
  const records = new GalleryImageRecordRepository(database);
  return {
    async read(asset_id) {
      const record = await records.get(namespace(), asset_id);
      if (record === null) {
        throw new Error(`Source asset ${asset_id} is not in the image store`);
      }
      const bytes = await read_image_bytes(database, record.sha256);
      if (bytes === null) {
        throw new Error(`Source asset ${asset_id} has no stored bytes`);
      }
      if (record.media_type === "video/mp4") {
        throw new Error(`Source asset ${asset_id} is a video and cannot be a provider input`);
      }
      return { asset_id, media_type: record.media_type, bytes };
    },
  };
}

/** `MediaJobExecutor` always supplies these three fields; parsing rather than casting keeps a
 * malformed executor change from reaching IndexedDB as an invalid record. */
function to_image_metadata(metadata: Readonly<Record<string, unknown>>): PutImageRecordMetadata {
  return ImageRecordFieldsSchema.omit({ media_type: true, quarantined: true }).parse(metadata);
}

/** The first model the stored profile permits. Automatic requests have no parameter editor behind
 * them, so this is the only model such a request can legitimately name. */
function read_first_allowlisted_model(payload: Readonly<Record<string, unknown>>): string | null {
  const models = read_array(as_record(payload.provider_profile), "model_allowlist");
  const first_model = models[0];
  return typeof first_model === "string" && first_model.length > 0 ? first_model : null;
}

function create_image_store_port(
  database: StorageDatabase,
  namespace: () => string,
): ImageStorePort {
  return {
    async put_image(input) {
      const record = await put_image(database, namespace(), {
        id: input.id,
        bytes: input.bytes,
        claimed_media_type: input.claimed_media_type,
        created_at: input.created_at,
        metadata: to_image_metadata(input.metadata),
      });
      return { id: record.id };
    },
    async read_image(id) {
      const records = new GalleryImageRecordRepository(database);
      const record = await records.get(namespace(), id);
      if (record === null) {
        return null;
      }
      const bytes = await read_image_bytes(database, record.sha256);
      return bytes === null ? null : { bytes, media_type: record.media_type };
    },
  };
}

/**
 * Builds the real `StudioCapabilities` from the real modules, one capability at a time. Every slice
 * is independent: a capability that cannot be built resolves to the honest-unavailable
 * implementation with a diagnostics-visible reason instead of aborting the composition, so
 * bootstrap never fails because one subsystem is missing.
 */
export async function compose_studio_capabilities(
  options: ComposeCapabilitiesOptions,
): Promise<StudioComposition> {
  const globals = options.globals ?? globalThis;
  const extension_version = options.extension_version ?? "development";
  const fallback = create_unavailable_capabilities();
  const resolutions: CapabilityResolutionRecord[] = [];
  const teardown: (() => void | Promise<void>)[] = [];

  /**
   * An unavailable capability must not look like an empty one: its `load()` rejects with the stable
   * `capability_unavailable` code carrying the real reason, which is what drives StudioShell's
   * partial-initialization banner and puts the reason in front of the user instead of showing an
   * empty view that silently does nothing.
   */
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
  const chat_media: ChatMediaInteractionPort =
    capability_matrix.tauri_chat_surface?.available === true
      ? new HostSurfaceChatMediaInteractions()
      : new StandardHostChatMediaInteractions();
  if (chat_media instanceof HostSurfaceChatMediaInteractions) {
    modules.push(
      new TauriChatSurfaceModule({
        globals,
        port: chat_media,
      }),
    );
  }
  /**
   * Guarded by the probe rather than by the ChatSurface branch above: TauriTavern advertises the two
   * capabilities independently, and on a standard SillyTavern host neither module exists at all.
   */
  if (capability_matrix.tauri_world_info_activation?.available === true) {
    modules.push(new TauriWorldInfoActivationModule({ globals }));
  }

  let database: StorageDatabase | null = null;
  try {
    database = await (options.open_storage ?? open_database)();
  } catch {
    database = null;
  }

  const settings_host = read_settings_host(globals);
  const vocabulary_channel = new VocabularyChannelState();
  const settings_adapter =
    settings_host === null ? null : create_sillytavern_settings(settings_host);
  const namespace = (): string => settings_adapter?.get_settings().active_namespace ?? "primary";
  const now = (): string => new Date().toISOString();
  const secrets = read_secret_destination(globals);
  const secret_resolver = read_secret_resolver(globals);
  const repositories = database === null ? null : create_business_repositories(database);
  const timeline = new TaskTimeline();
  let provider_adapters: Promise<
    Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>
  > | null = null;
  const load_provider_adapters = (): Promise<
    Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>
  > => (provider_adapters ??= build_provider_adapters(database));
  const is_auto_generation_enabled = (): boolean =>
    settings_adapter?.get_settings().auto_generation_enabled ?? false;
  const trigger_sessions =
    host === null
      ? null
      : new HostGenerationSessionPort({
          host,
          sessions: new SessionRegistry(new BrowserRandomSource(globalThis.crypto)),
          new_root_id: () => crypto.randomUUID(),
          is_auto_generation_enabled,
        });

  /**
   * A provider's allowlists and its vault reference live on its stored profile -- never in code,
   * never supplied remotely. Loaded once here so the job executor's synchronous `profiles.resolve`
   * reads a real validated profile rather than an invented one. Neither field can name a cloud
   * destination: `base_url` only ever reaches `LocalDirectTransport`, which requires a loopback
   * origin, and a cloud provider's origin comes from the code-owned route catalog instead.
   */
  const active_profile_record =
    repositories === null || settings_adapter === null
      ? null
      : await repositories.provider_profiles
          .get(namespace(), settings_adapter.get_settings().active_provider_profile_id ?? "")
          .catch(() => null);
  const active_profile_payload =
    active_profile_record === null ? {} : read_payload(active_profile_record);
  const direct_provider_base_url = read_optional_string(active_profile_payload, "base_url");
  const active_profile_model_id = read_first_allowlisted_model(active_profile_payload);
  const active_provider_id =
    active_profile_record === null
      ? null
      : (ProviderIdSchema.safeParse(active_profile_record.provider_id).data ?? null);
  const direct_cloud =
    active_provider_id === null
      ? null
      : {
          provider_id: active_provider_id,
          credential_reference: read_optional_string(active_profile_payload, VAULT_KEY_FIELD),
          secrets_readable: secret_resolver !== null,
        };

  const settings = record(
    "settings",
    settings_adapter === null
      ? unavailable(SETTINGS_HOST_UNAVAILABLE)
      : resolve_capability(() =>
          create_settings_capability({
            settings: settings_adapter,
            database,
            extension_version,
            vocabulary_channel,
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
            now,
          }),
        ),
    fallback.profiles,
  );

  /**
   * `llm_connections` needs three things at once, so its unavailable reasons are distinct: the
   * database version 3 store, a vault that accepts a credential write, and a vault that reveals it
   * again for the connection test. Personas and knowledge need only storage -- they ride on the
   * version 1 `character_profiles` and `knowledge_entries` stores.
   */
  const llm_connections = record(
    "llm_connections",
    repositories === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : secrets === null || secret_resolver === null
        ? unavailable(SECRET_VAULT_UNAVAILABLE)
        : resolve_capability(() =>
            create_llm_connections_capability({
              repository: repositories.llm_connections,
              namespace: namespace(),
              secrets,
              transport: new DirectLlmTransport({
                secrets: secret_resolver,
                ...(options.provider_fetch === undefined ? {} : { fetch: options.provider_fetch }),
              }),
              clock: now,
            }),
          ),
    fallback.llm_connections,
  );

  const personas = record(
    "personas",
    repositories === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : resolve_capability(() =>
          create_personas_capability({
            repository: repositories.character_profiles,
            namespace: namespace(),
            clock: now,
          }),
        ),
    fallback.personas,
  );

  const knowledge = record(
    "knowledge",
    repositories === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : resolve_capability(() =>
          create_knowledge_capability({
            repository: repositories.knowledge_entries,
            namespace: namespace(),
            clock: now,
          }),
        ),
    fallback.knowledge,
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
          }),
        ),
    fallback.gallery,
  );

  /**
   * The main-LLM trigger: `request_image` as a native function tool where the host has a
   * ToolManager, the hidden-comment stream parser where it does not. Wired from inside the
   * generation capability because it enqueues onto exactly the queue the Workbench submits to --
   * where there is no working generation capability there is nothing for a trigger to do either.
   */
  function wire_generation_trigger(
    queue: ImageJobQueue,
    plans: MediaExecutionPlanRegistry,
    sessions: HostGenerationSessionPort,
  ): void {
    if (host === null) {
      return;
    }
    const fallback_text_sink = new HostFallbackTextSink({ host, sessions });
    modules.push(
      new AutomaticGenerationSessionModule(sessions, fallback_text_sink),
      new GenerationTriggerModule({
        host,
        request_image_tool: new RequestImageTool(
          sessions.registry,
          new BrowserRequestIdSource(),
          new AutomaticImageRequestRouter({
            queue,
            plans,
            targets: sessions,
            provider_id: () => active_provider_id,
            model_id: () => active_profile_model_id,
          }),
        ),
        session_port: sessions,
        fallback_text_sink,
        is_auto_generation_enabled,
      }),
    );
  }

  const generation = record(
    "generation",
    database === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : host === null
        ? unavailable(HOST_UNAVAILABLE)
        : resolve_capability(() => {
            const transport = create_provider_transport(
              {
                gateway_endpoint: settings_adapter?.get_settings().gateway.endpoint ?? null,
                http_acknowledgments:
                  settings_adapter?.get_settings().gateway.http_acknowledgments ?? {},
                tauri_provider_available: false,
                sillytavern_available: false,
                direct_provider_base_url,
                direct_cloud,
              },
              {
                secrets: secret_resolver,
                ...(options.provider_fetch === undefined ? {} : { fetch: options.provider_fetch }),
              },
            );
            const plans = new MediaExecutionPlanRegistry();
            const queue = new ImageJobQueue({
              executor: new MediaJobExecutor({
                load_adapters: load_provider_adapters,
                profiles: {
                  resolve: async (provider_id) => {
                    const adapter = (await load_provider_adapters())[provider_id];
                    if (adapter === undefined || active_profile_record === null) {
                      throw new Error(`No stored provider profile is active for ${provider_id}`);
                    }
                    return adapter.validate_profile(adapter_profile_of(active_profile_record));
                  },
                },
                transport,
                assets: create_asset_reader(database, namespace),
                log: { write: () => {} },
                plans,
                store: create_image_store_port(database, namespace),
                ids: { next: () => crypto.randomUUID() },
                clock: { now },
                resolve_source_message: (job) => ({
                  chat_id: job.chat_id,
                  message_id: String(job.requested_swipe_id),
                  swipe_id: job.requested_swipe_id,
                }),
              }),
              persistence: new IndexedDbJobPersistence(database, namespace()),
              job_id_source: { next: () => crypto.randomUUID() },
              time_source: new SystemJobTimeSource(),
              global_concurrency: settings_adapter?.get_settings().global_concurrency ?? 1,
            });
            teardown.push(timeline.observe_jobs(queue));
            /**
             * Production now has a real `MessagePort`: without it no automatic image ever reaches
             * the message it was requested from, because nothing carries a completed job through
             * `completed -> attached | orphaned`.
             */
            const message_port =
              options.message_port ??
              (trigger_sessions === null ? null : new HostMessagePort(host, trigger_sessions));
            if (message_port !== null) {
              const binder = new MessageBinder(queue, message_port);
              binder.start();
              teardown.push(() => {
                binder.stop();
              });
            }
            if (trigger_sessions !== null) {
              wire_generation_trigger(queue, plans, trigger_sessions);
            }
            const request_ids = new BrowserRequestIdSource();
            return create_generation_capability({
              queue,
              plans,
              jobs: create_business_repositories(database).generation_jobs,
              namespace,
              origin: new HostGenerationOriginSource(
                host,
                new BrowserRandomSource(globalThis.crypto),
              ),
              new_request_id: () => request_ids.next(),
            });
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

  const migration = record(
    "migration",
    database === null
      ? unavailable(STORAGE_UNAVAILABLE)
      : settings_adapter === null
        ? unavailable(SETTINGS_HOST_UNAVAILABLE)
        : resolve_capability(() => {
            const legacy_source = create_legacy_source(globals);
            if (legacy_source === null) {
              throw new Error(SETTINGS_HOST_UNAVAILABLE);
            }
            return create_migration_capability({
              database,
              settings: settings_adapter,
              legacy_source,
              image_resolver: UNRESOLVED_LEGACY_IMAGES,
              secrets,
            });
          }),
    fallback.migration,
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
        probe_gateway: null,
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
      migration,
      settings,
      llm_connections,
      personas,
      knowledge,
    },
    resolutions,
    host,
    chat_media,
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

export interface ProviderTransportDependencies {
  readonly secrets: SecretResolverPort | null;
  readonly fetch?: ProviderFetch;
}

/**
 * Turns `select_transport`'s decision into the transport that drives the job executor.
 *
 * Two of the five selections still cannot: `GatewayTransport` is a job-level client rather than a
 * `ProviderTransport`, and neither TauriTavern's bridge nor a first-party SillyTavern relay is
 * reachable from this build. `direct_cloud` and `local_direct` both are, which is the change the
 * 2026-08-07 decision asked for: a cloud profile with a stored credential now yields a working
 * generation capability instead of an unavailable one.
 */
export function create_provider_transport(
  input: Parameters<typeof select_transport>[0],
  dependencies: ProviderTransportDependencies = { secrets: null },
): ProviderTransport {
  const selection = select_transport(input);
  const fetch_ = dependencies.fetch;
  switch (selection.kind) {
    case "direct_cloud": {
      const catalog_entry = direct_image_catalog_entry(selection.provider_id);
      if (catalog_entry === null || dependencies.secrets === null) {
        throw new Error(
          `No direct route catalog entry and host credential resolver pair exists for ${selection.provider_id}`,
        );
      }
      return new DirectCloudTransport({
        catalog_entry,
        credential_reference: selection.credential_reference,
        secrets: dependencies.secrets,
        ...(fetch_ === undefined ? {} : { fetch: fetch_ }),
      });
    }
    case "local_direct":
      return new LocalDirectTransport({
        base_url: selection.endpoint,
        ...(fetch_ === undefined ? {} : { fetch: fetch_ }),
      });
    default:
      throw new Error(
        `The selected ${selection.kind} transport cannot drive the job executor; configure a loopback provider endpoint or a credentialed cloud profile`,
      );
  }
}
