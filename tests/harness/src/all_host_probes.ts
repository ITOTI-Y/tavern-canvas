import type { StorageDatabase } from "@tavern-canvas/storage";

import type { RecordedRequest } from "./all_host_environment.js";

export interface ProviderOverrideAttempt {
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
  readonly rejected_at_storage: string | null;
  readonly error: string | null;
  readonly request_urls: readonly string[];
  readonly request_headers: readonly Readonly<Record<string, string>>[];
}

export interface VocabularyUpdateOutcome {
  readonly listed_package_ids: readonly string[];
  readonly install_error: string | null;
  readonly active_package_before: string | null;
  readonly active_package_after: string | null;
}

export interface SecurityProbes {
  vocabulary_update(): Promise<VocabularyUpdateOutcome>;
  provider_override(attempt: ProviderOverrideAttempt): Promise<ProviderOverrideOutcome>;
  render_workflow(workflow_json: string, values: Readonly<Record<string, unknown>>): string;
}

export interface SecurityProbeOptions {
  readonly globals: Record<string, unknown>;
  readonly database: StorageDatabase;
  readonly namespace: string;
  readonly provider_fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  readonly provider_requests: readonly RecordedRequest[];
}

const ATTACKER_PROFILE_ID = "33333333-3333-4333-8333-333333333333";

export async function create_security_probes(
  options: SecurityProbeOptions,
): Promise<SecurityProbes> {
  const [
    { compose_studio_capabilities },
    { probe_host_capabilities },
    { render_comfyui_workflow, validate_stored_comfyui_workflow },
    { ProviderProfileRepository },
    { VocabularyCatalogClient },
    { VocabularyPackageStore },
  ] = await Promise.all([
    import("../../../apps/extension/src/bootstrap/compose_capabilities.js"),
    import("../../../apps/extension/src/host/index.js"),
    import("@tavern-canvas/providers"),
    import("@tavern-canvas/storage"),
    import("../../../apps/extension/src/modules/vocabulary/vocabulary_catalog_client.js"),
    import("@tavern-canvas/vocabulary"),
  ]);

  return {
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
        // Does not match the served manifest's digest.
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

    render_workflow(workflow_json, values) {
      const workflow = validate_stored_comfyui_workflow(JSON.parse(workflow_json) as unknown);
      return JSON.stringify(
        render_comfyui_workflow(
          workflow,
          values as unknown as Parameters<typeof render_comfyui_workflow>[1],
        ),
      );
    },
  };
}
