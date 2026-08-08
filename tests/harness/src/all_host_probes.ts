import type { StorageDatabase } from "@tavern-canvas/storage";

import type { RecordedRequest } from "./all_host_environment.js";

/**
 * Security probes for tests/e2e/security_boundaries.spec.ts. Each one runs the REAL first-party
 * module against hostile input inside the real browser and returns plain data; none of them
 * reimplements or approximates the behaviour under test. They live here rather than inside the
 * spec because a Playwright `page.evaluate` callback is serialized as source and cannot import the
 * extension's modules, and rather than inside all_host_boot.ts because they are a distinct
 * concern from booting the host.
 */

export interface ProviderOverrideAttempt {
  /** Everything a client could conceivably try to smuggle into a stored provider profile. */
  readonly base_url?: string;
  readonly url?: string;
  readonly endpoint?: string;
  readonly host?: string;
  readonly path?: string;
  readonly headers?: Readonly<Record<string, string>>;
  readonly credential?: string;
  readonly api_key?: string;
}

export interface ProviderOverrideOutcome {
  /** Non-null when the storage layer refused to persist the smuggled field at all. */
  readonly rejected_at_storage: string | null;
  readonly error: string | null;
  readonly request_urls: readonly string[];
  readonly request_headers: readonly Readonly<Record<string, string>>[];
}

export interface FallbackParseOutcome {
  readonly cleaned_text: string;
  readonly request_count: number;
  readonly executed_marker: string | null;
}

export interface MarkdownRenderOutcome {
  readonly html: string;
  readonly script_element_count: number;
  readonly event_handler_attributes: readonly string[];
  readonly unsafe_urls: readonly string[];
}

export interface HttpAcknowledgmentOutcome {
  readonly before: string;
  readonly after: string;
}

export interface VocabularyUpdateOutcome {
  readonly listed_package_ids: readonly string[];
  readonly install_error: string | null;
  readonly active_package_before: string | null;
  readonly active_package_after: string | null;
}

export interface GatewayJobOptions {
  readonly request_id: string;
  /** Truncate the SSE body after this many events, forcing the client's polling fallback. */
  readonly drop_stream_after_events?: number;
}

export interface GatewayRunOutcome {
  readonly state: string;
  readonly polled: boolean;
  readonly error: string | null;
}

export interface GatewayCancelOutcome {
  readonly state: string;
  readonly cancel_error: string | null;
}

export interface SecurityProbes {
  /** The raw capabilities document the REAL GatewayTransport read over real HTTP. */
  gateway_capabilities(origin: string, token: string): Promise<Record<string, unknown>>;
  gateway_submit(
    origin: string,
    token: string,
    options: GatewayJobOptions,
  ): Promise<{ readonly job_id: string }>;
  gateway_run(
    origin: string,
    token: string,
    options: GatewayJobOptions,
  ): Promise<GatewayRunOutcome>;
  gateway_cancel(
    origin: string,
    token: string,
    options: GatewayJobOptions,
  ): Promise<GatewayCancelOutcome>;
  /**
   * Drives the REAL `VocabularyCatalogClient` against a catalog whose published manifest hash does
   * not match the package it serves, through the class's own documented `catalog_url`/`fetch_impl`
   * seam. Acceptance criterion 12: a hash failure must leave the previously active package in
   * place.
   */
  vocabulary_update(): Promise<VocabularyUpdateOutcome>;
  provider_override(attempt: ProviderOverrideAttempt): Promise<ProviderOverrideOutcome>;
  parse_fallback(chunks: readonly string[]): FallbackParseOutcome;
  render_workflow(workflow_json: string, values: Readonly<Record<string, unknown>>): string;
  render_markdown(raw_text: string): Promise<MarkdownRenderOutcome>;
  http_acknowledgment(endpoint: string): HttpAcknowledgmentOutcome;
}

export interface SecurityProbeOptions {
  readonly globals: Record<string, unknown>;
  readonly database: StorageDatabase;
  readonly namespace: string;
  readonly provider_fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  readonly provider_requests: readonly RecordedRequest[];
}

const ATTACKER_PROFILE_ID = "33333333-3333-4333-8333-333333333333";
const EXECUTION_MARKER_KEY = "__TAVERN_CANVAS_E2E_EXECUTED__";

export async function create_security_probes(
  options: SecurityProbeOptions,
): Promise<SecurityProbes> {
  const [
    { compose_studio_capabilities },
    { probe_host_capabilities },
    { FallbackStreamParser },
    { render_comfyui_workflow, validate_stored_comfyui_workflow },
    { render_assistant_markdown },
    { acknowledge_http_origin, is_http_origin_acknowledged },
    { select_transport, TransportConfigurationError },
    { ProviderProfileRepository },
    { VocabularyCatalogClient },
    { VocabularyPackageStore },
    { GatewayTransport },
  ] = await Promise.all([
    import("../../../apps/extension/src/bootstrap/compose_capabilities.js"),
    import("../../../apps/extension/src/host/index.js"),
    import("@tavern-canvas/core"),
    import("@tavern-canvas/providers"),
    import("../../../apps/extension/src/modules/assistant/assistant_markdown.js"),
    import("../../../apps/extension/src/transport/http_acknowledgment.js"),
    import("../../../apps/extension/src/transport/transport_selector.js"),
    import("@tavern-canvas/storage"),
    import("../../../apps/extension/src/modules/vocabulary/vocabulary_catalog_client.js"),
    import("@tavern-canvas/vocabulary"),
    import("../../../apps/extension/src/transport/gateway_transport.js"),
  ]);

  /**
   * A `fetch` that can truncate an SSE body after N events, so a spec can make the client lose its
   * stream mid-job and prove the polling fallback finishes the job. `poll_count` counts the plain
   * job reads the client falls back to.
   */
  function instrumented_gateway_fetch(drop_after_events: number | undefined): {
    readonly fetch_impl: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
    poll_count(): number;
  } {
    let polls = 0;
    return {
      poll_count: () => polls,
      fetch_impl: async (input, init) => {
        const url =
          typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const response = await globalThis.fetch(input, init);
        if (!url.includes("/events")) {
          if (/\/v1\/jobs\/[^/]+$/u.test(url) && (init?.method ?? "GET") === "GET") {
            polls += 1;
          }
          return response;
        }
        if (drop_after_events === undefined || response.body === null) {
          return response;
        }
        const reader = response.body.getReader();
        let delivered = 0;
        const truncated = new ReadableStream<Uint8Array>({
          async pull(controller) {
            if (delivered >= drop_after_events) {
              await reader.cancel().catch(() => undefined);
              controller.close();
              return;
            }
            const chunk = await reader.read();
            if (chunk.done) {
              controller.close();
              return;
            }
            delivered += 1;
            controller.enqueue(chunk.value);
          },
        });
        return new Response(truncated, { status: response.status, headers: response.headers });
      },
    };
  }

  function gateway_request(request_id: string): Record<string, unknown> {
    return {
      provider_id: "sd_webui",
      request_id,
      generation_anchor: "b".repeat(64),
      prompt: "gateway e2e prompt",
      output_count: 1,
      mode: "txt2img",
      model_id: "e2e-model",
      sampler: "Euler",
      scheduler: "Normal",
      width: 64,
      height: 64,
      steps: 1,
      cfg_scale: 1,
      seed: 7,
    };
  }

  function gateway_transport(
    origin: string,
    token: string,
    fetch_impl?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
  ): InstanceType<typeof GatewayTransport> {
    return new GatewayTransport({
      endpoint: origin,
      access_token: token,
      http_acknowledgments: { [new URL(origin).origin]: "2026-08-08T00:00:00.000Z" },
      ...(fetch_impl === undefined ? {} : { fetch: fetch_impl }),
    });
  }

  return {
    async gateway_capabilities(origin, token) {
      const controller = new AbortController();
      const document_ = await gateway_transport(origin, token).get_capabilities(controller.signal);
      return document_;
    },

    async gateway_submit(origin, token, job_options) {
      const controller = new AbortController();
      const submitted = await gateway_transport(origin, token).submit(
        gateway_request(job_options.request_id) as never,
        controller.signal,
      );
      return { job_id: submitted.job_id };
    },

    async gateway_run(origin, token, job_options) {
      const instrumented = instrumented_gateway_fetch(job_options.drop_stream_after_events);
      const transport = gateway_transport(origin, token, instrumented.fetch_impl);
      const controller = new AbortController();
      try {
        const finished = await transport.run(gateway_request(job_options.request_id) as never, {
          signal: controller.signal,
        });
        return { state: finished.state, polled: instrumented.poll_count() > 0, error: null };
      } catch (thrown) {
        return { state: "threw", polled: instrumented.poll_count() > 0, error: String(thrown) };
      }
    },

    async gateway_cancel(origin, token, job_options) {
      const transport = gateway_transport(origin, token);
      const controller = new AbortController();
      const submitted = await transport.submit(
        gateway_request(job_options.request_id) as never,
        controller.signal,
      );
      let cancel_error: string | null = null;
      try {
        await transport.cancel(submitted.job_id, controller.signal);
      } catch (thrown) {
        cancel_error = String(thrown);
      }
      const response = await globalThis.fetch(`${origin}/v1/jobs/${submitted.job_id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const body = (await response.json()) as { state?: unknown };
      return { state: typeof body.state === "string" ? body.state : "unknown", cancel_error };
    },

    async vocabulary_update() {
      const store = new VocabularyPackageStore(options.database, "vocabulary");
      const active_before = await store.find_active_or_confirmed();

      const catalog_entry = {
        package_id: "tavern-canvas-vocabulary",
        display_name: { en: "Harness package", "zh-CN": "测试词库" },
        description: { en: "Harness package", "zh-CN": "测试词库" },
        data_version: "1.0.0",
        record_count: 1,
        compressed_bytes: 8,
        // Deliberately not the digest of the manifest served below.
        manifest_sha256: "f".repeat(64),
        languages: ["en"],
        min_extension_version: "0.0.1",
        base_url: "https://catalog.invalid/packages/v1",
        updated_at: "2026-08-08T00:00:00.000Z",
      };

      const client = new VocabularyCatalogClient({
        current_extension_version: "3.0.0",
        catalog_url: "https://catalog.invalid/catalog.json",
        open_database_impl: () => Promise.resolve(options.database),
        fetch_impl: (input: RequestInfo | URL) => {
          const url =
            typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
          // The catalog document is a bare JSON array; the package manifest it points at is served
          // with contents whose digest cannot match the published manifest_sha256 above.
          const body = url.endsWith("/catalog.json")
            ? JSON.stringify([catalog_entry])
            : JSON.stringify({ tampered: true });
          return Promise.resolve(
            new Response(body, { status: 200, headers: { "content-type": "application/json" } }),
          );
        },
      });

      let listed_package_ids: readonly string[] = [];
      let install_error: string | null = null;
      try {
        const entries = await client.list();
        listed_package_ids = entries.map((entry) => entry.package_id);
        const first = entries[0];
        if (first === undefined) {
          throw new Error("catalog listed no entry");
        }
        await client.install(first);
      } catch (thrown) {
        install_error = String(thrown);
      }

      const active_after = await store.find_active_or_confirmed();
      return {
        listed_package_ids,
        install_error,
        active_package_before: active_before?.manifest.package_id ?? null,
        active_package_after: active_after?.manifest.package_id ?? null,
      };
    },

    /**
     * Writes an attacker-controlled provider profile through the only door a client has -- a
     * stored profile record -- activates it, recomposes the real capability graph, and submits.
     * Whatever URL and headers the provider request ends up with are the ones the code-owned
     * route catalog (packages/contracts/src/direct_catalog.ts) decided, never the ones below.
     */
    async provider_override(attempt) {
      const before = options.provider_requests.length;
      const repository = new ProviderProfileRepository(options.database);
      try {
        await repository.put(options.namespace, {
          schema_version: 1,
          id: ATTACKER_PROFILE_ID,
          namespace: options.namespace,
          record_key: `${options.namespace}:${ATTACKER_PROFILE_ID}`,
          created_at: "2026-08-08T00:00:00.000Z",
          updated_at: "2026-08-08T00:00:00.000Z",
          provider_id: "openai_image",
          payload: {
            display_name: "Attacker profile",
            is_default: true,
            vault_key: "tavern_canvas:image:openai_image:default",
            ...attempt,
            provider_profile: {
              model_allowlist: ["gpt-image-1"],
              output_mime_type_allowlist: ["image/png"],
              remote_asset_origin_allowlist: [],
              max_response_bytes: 5_000_000,
              max_input_asset_bytes: 5_000_000,
            },
          },
        });
      } catch (thrown) {
        // The storage layer refusing to persist the field is itself one of the two acceptable
        // outcomes: the attempt is rejected before any transport could read it.
        return {
          rejected_at_storage: String(thrown),
          error: null,
          request_urls: [],
          request_headers: [],
        };
      }

      const settings = options.globals.SillyTavern as { getContext(): Record<string, unknown> };
      const context = settings.getContext();
      const extension_settings = context.extensionSettings as Record<string, unknown>;
      const tavern_canvas = extension_settings.tavern_canvas as Record<string, unknown>;
      tavern_canvas.active_provider_profile_id = ATTACKER_PROFILE_ID;

      const composition = await compose_studio_capabilities({
        probe: probe_host_capabilities(options.globals),
        globals: options.globals,
        extension_version: "3.0.0-e2e",
        open_storage: () => Promise.resolve(options.database),
        create_vocabulary_worker: null,
        provider_fetch: options.provider_fetch,
      });

      let error: string | null = null;
      try {
        const submitted = await composition.capabilities.generation.submit({
          profile_id: ATTACKER_PROFILE_ID,
          request: {
            provider_id: "openai_image",
            request_id: "44444444-4444-4444-8444-444444444444",
            generation_anchor: "c".repeat(64),
            prompt: "override probe",
            output_count: 1,
            mode: "generation",
            model_id: "gpt-image-1",
            size: "1024x1024",
          } as never,
        });
        const deadline = Date.now() + 15_000;
        let state = submitted.state;
        while (Date.now() < deadline && state !== "completed" && state !== "failed") {
          await new Promise((resolve) => setTimeout(resolve, 25));
          const jobs = await composition.capabilities.generation.load();
          state = jobs.find((job) => job.job_id === submitted.job_id)?.state ?? state;
        }
      } catch (thrown) {
        error = String(thrown);
      }
      await composition.dispose();

      const observed = options.provider_requests.slice(before);
      return {
        rejected_at_storage: null,
        error,
        request_urls: observed.map((request) => request.url),
        request_headers: observed.map((request) => request.headers),
      };
    },

    parse_fallback(chunks) {
      Reflect.deleteProperty(window, EXECUTION_MARKER_KEY);
      const parser = new FallbackStreamParser("d".repeat(64), true);
      let cleaned_text = "";
      let request_count = 0;
      for (const chunk of chunks) {
        const parsed = parser.push(chunk);
        cleaned_text += parsed.cleaned_text;
        request_count += parsed.requests.length;
      }
      const marker: unknown = Reflect.get(window, EXECUTION_MARKER_KEY);
      return {
        cleaned_text,
        request_count,
        executed_marker: typeof marker === "string" ? marker : null,
      };
    },

    render_workflow(workflow_json, values) {
      const workflow = validate_stored_comfyui_workflow(JSON.parse(workflow_json) as unknown);
      return JSON.stringify(
        render_comfyui_workflow(
          workflow,
          values as unknown as Parameters<typeof render_comfyui_workflow>[1],
        ),
      );
    },

    async render_markdown(raw_text) {
      const rendered = await render_assistant_markdown(raw_text);
      const container = document.createElement("div");
      container.innerHTML = rendered.html;
      const event_handler_attributes: string[] = [];
      const unsafe_urls: string[] = [];
      for (const element of container.querySelectorAll("*")) {
        for (const attribute of element.attributes) {
          if (attribute.name.toLowerCase().startsWith("on")) {
            event_handler_attributes.push(`${element.tagName}:${attribute.name}`);
          }
          const value = attribute.value.trim().toLowerCase();
          if (value.startsWith("javascript:") || value.startsWith("data:text/html")) {
            unsafe_urls.push(`${element.tagName}:${attribute.name}`);
          }
        }
      }
      return {
        html: rendered.html,
        script_element_count: container.querySelectorAll("script").length,
        event_handler_attributes,
        unsafe_urls,
      };
    },

    http_acknowledgment(endpoint) {
      const input = {
        gateway_endpoint: endpoint,
        http_acknowledgments: {} as Readonly<Record<string, string>>,
        tauri_provider_available: false,
        sillytavern_available: false,
        direct_provider_base_url: null,
        direct_cloud: null,
      };
      const describe = (acknowledgments: Readonly<Record<string, string>>): string => {
        try {
          return select_transport({ ...input, http_acknowledgments: acknowledgments }).kind;
        } catch (thrown) {
          return thrown instanceof TransportConfigurationError
            ? `blocked:${thrown.message}`
            : `error:${String(thrown)}`;
        }
      };
      const before = describe({});
      const acknowledged = acknowledge_http_origin({}, endpoint, "2026-08-08T00:00:00.000Z");
      if (!is_http_origin_acknowledged(acknowledged, endpoint)) {
        throw new Error("acknowledgment did not record the origin");
      }
      return { before, after: describe(acknowledged) };
    },
  };
}
