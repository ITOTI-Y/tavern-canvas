import legacy_settings_fixture from "../../fixtures/migration/v2_settings_full.json" with { type: "json" };

interface PageListenerRegistration {
  readonly target: "window" | "document";
  readonly type: string;
}

// Installed before any extension module is imported.
const page_listener_registrations: PageListenerRegistration[] = [];

function record_listeners(target: EventTarget, label: "window" | "document"): void {
  const original = target.addEventListener.bind(target);
  target.addEventListener = function patched(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    page_listener_registrations.push({ target: label, type });
    original(type, listener, options);
  };
}

record_listeners(window, "window");
record_listeners(document, "document");

const params = new URLSearchParams(window.location.search);
const host_kind = document.body.dataset.host === "tauri" ? "tauri" : "sillytavern";

const PROFILE_ID = "11111111-1111-4111-8111-111111111111";
const NAMESPACE = "primary";
const LOOPBACK_PROVIDER_ORIGIN = "http://127.0.0.1:7860";

async function boot(): Promise<void> {
  const [
    { bootstrap_tavern_canvas },
    { compose_studio_capabilities },
    { INITIAL_STYLESHEET, bind_shadow_root_stylesheet },
    { probe_host_capabilities },
    { open_database, ProviderProfileRepository },
    { create_host_environment },
    { create_security_probes },
  ] = await Promise.all([
    import("../../../apps/extension/src/bootstrap/bootstrap.js"),
    import("../../../apps/extension/src/bootstrap/compose_capabilities.js"),
    import("../../../apps/extension/src/dev/stylesheet_hmr.js"),
    import("../../../apps/extension/src/host/index.js"),
    import("@tavern-canvas/storage"),
    import("./all_host_environment.js"),
    import("./all_host_probes.js"),
  ]);

  const helper_parameter = params.get("helper") ?? "4.9.1";
  const gateway_endpoint = params.get("gateway");
  const environment = create_host_environment({
    helper_version: helper_parameter === "missing" ? null : helper_parameter,
    native_tool_manager: params.get("tools") !== "none",
    tauri: host_kind === "tauri",
    secrets_readable: params.get("secrets") !== "sealed",
    legacy_settings: params.get("legacy") === "v2" ? legacy_settings_fixture : undefined,
    active_provider_profile_id: PROFILE_ID,
    gateway_endpoint,
    http_acknowledgments:
      params.get("ack") === "1" && gateway_endpoint !== null
        ? { [new URL(gateway_endpoint).origin]: "2026-08-08T00:00:00.000Z" }
        : {},
  });

  // native_tool_manager is probed from SillyTavern's context, so a host without native tools lacks the two methods.
  if (params.get("tools") === "none") {
    const context = (
      environment.globals.SillyTavern as { getContext(): Record<string, unknown> }
    ).getContext();
    delete context.registerFunctionTool;
    delete context.unregisterFunctionTool;
  }

  // Deletion must complete before open_database() runs, which a Playwright-side evaluate cannot order.
  if (params.get("reset") === "1") {
    await Promise.all(
      (await indexedDB.databases()).map(
        (info) =>
          new Promise<void>((resolve) => {
            if (info.name === undefined) {
              resolve();
              return;
            }
            const request = indexedDB.deleteDatabase(info.name);
            request.onsuccess = () => {
              resolve();
            };
            request.onerror = () => {
              resolve();
            };
            request.onblocked = () => {
              resolve();
            };
          }),
      ),
    );
  }

  const database = await open_database();
  await new ProviderProfileRepository(database).put(NAMESPACE, {
    schema_version: 1,
    id: PROFILE_ID,
    namespace: NAMESPACE,
    record_key: `${NAMESPACE}:${PROFILE_ID}`,
    created_at: "2026-08-08T00:00:00.000Z",
    updated_at: "2026-08-08T00:00:00.000Z",
    provider_id: "sd_webui",
    payload: {
      display_name: "Local SD WebUI",
      is_default: true,
      base_url: LOOPBACK_PROVIDER_ORIGIN,
      provider_profile: {
        model_allowlist: ["sd_xl_base"],
        output_mime_type_allowlist: ["image/png"],
        max_response_bytes: 5_000_000,
      },
    },
  });

  // Only the seeded database and the provider network boundary are substituted; the vocabulary Worker keeps its production factory.
  const composition_options = {
    open_storage: () => Promise.resolve(database),
    provider_fetch: environment.provider_fetch,
  } as const;

  const surface: Record<string, unknown> = {
    control: environment.control,
    provider_requests: environment.provider_requests,
    page_listener_registrations,
    profile_id: PROFILE_ID,
    namespace: NAMESPACE,
    loopback_provider_origin: LOOPBACK_PROVIDER_ORIGIN,
  };

  if (params.get("mode") === "capabilities") {
    const probe = probe_host_capabilities(environment.globals);
    const composition = await compose_studio_capabilities({
      ...composition_options,
      probe,
      globals: environment.globals,
      extension_version: "3.0.0-e2e",
    });
    surface.probe = probe;
    surface.resolutions = composition.resolutions;
    surface.capabilities = composition.capabilities;
    surface.state = "ready";
  } else {
    const handle = await bootstrap_tavern_canvas({
      globals: environment.globals,
      document,
      stylesheet: INITIAL_STYLESHEET,
      version: "3.0.0-e2e",
      composition: composition_options,
    });
    surface.probe = handle.probe;
    surface.resolutions = handle.resolutions;
    surface.state = handle.state;
    // Dev server only: bootstrap owns the Shadow Root, so the stylesheet is bound from outside.
    const mounted_shadow_root = document.getElementById("tavern-canvas-root")?.shadowRoot;
    if (mounted_shadow_root) {
      bind_shadow_root_stylesheet(mounted_shadow_root);
    }
  }

  surface.probes = await create_security_probes({
    globals: environment.globals,
    database,
    namespace: NAMESPACE,
    provider_fetch: environment.provider_fetch,
    provider_requests: environment.provider_requests,
  });

  Reflect.set(window, "__TAVERN_CANVAS_E2E__", surface);
  document.documentElement.dataset.allHostHarnessReady = "true";
}

void boot().catch((error: unknown) => {
  Reflect.set(window, "__TAVERN_CANVAS_E2E_BOOT_ERROR__", String(error));
  document.documentElement.dataset.allHostHarnessReady = "failed";
});
