import type { CapabilityMatrix, TavernCanvasSettings } from "@tavern-canvas/contracts";
import type { GenerationJobSnapshot, ImageJobQueue } from "@tavern-canvas/core";
import type { StorageEstimate } from "@tavern-canvas/storage";

import type {
  ConnectionTestResult,
  DiagnosticsCapability,
  DiagnosticsDomainEvent,
  SupportBundle,
  TaskTimelineEntry,
} from "../../ui/contracts/ui_capabilities.js";
import type { CapabilityResolutionRecord } from "../capability_resolution.js";
import { DomainEventEmitter } from "./_records.js";

/** Bounded so a long session cannot grow the timeline without limit. */
const MAX_TIMELINE_ENTRIES = 500;

/**
 * The Studio's real event log. Entries carry only correlation fields (anchors, ids, codes) -- never
 * prompt text, message content, or anything a provider payload touched.
 */
export class TaskTimeline {
  readonly #entries: TaskTimelineEntry[] = [];
  readonly #events = new DomainEventEmitter<DiagnosticsDomainEvent>();
  #sequence = 0;

  get entries(): readonly TaskTimelineEntry[] {
    return this.#entries;
  }

  subscribe(handler: (event: DiagnosticsDomainEvent) => void): () => void {
    return this.#events.subscribe(handler);
  }

  append(entry: Omit<TaskTimelineEntry, "event_id" | "occurred_at">): void {
    this.#sequence += 1;
    const full: TaskTimelineEntry = {
      ...entry,
      event_id: `timeline-${String(this.#sequence)}`,
      occurred_at: new Date().toISOString(),
    };
    this.#entries.push(full);
    if (this.#entries.length > MAX_TIMELINE_ENTRIES) {
      this.#entries.shift();
    }
    this.#events.emit({ type: "timeline_entry_appended", entry: full });
  }

  /** Mirrors every job transition the queue publishes into the timeline. */
  observe_jobs(queue: ImageJobQueue): () => void {
    return queue.subscribe((job: GenerationJobSnapshot) => {
      this.append({
        event_code: `generation.${job.state}`,
        module_id: "generation",
        generation_anchor: job.generation_anchor,
        request_id: job.request_id,
        job_id: job.job_id,
        provider_id: job.provider_id,
        error_code: job.error?.code ?? null,
      });
    });
  }
}

export interface DiagnosticsCapabilityDeps {
  readonly capability_matrix: CapabilityMatrix;
  readonly helper_version: string | null;
  readonly timeline: TaskTimeline;
  readonly resolutions: () => readonly CapabilityResolutionRecord[];
  readonly settings: () => TavernCanvasSettings | null;
  readonly estimate_storage: () => Promise<StorageEstimate | undefined>;
  readonly extension_version: string;
  /** Present only when a Gateway endpoint is configured; otherwise the connection test reports the
   * absence rather than pretending to have reached something. */
  readonly probe_gateway: (() => Promise<ConnectionTestResult>) | null;
}

/** Settings are exported into the support bundle with every value that could identify a host or a
 * credential removed, keeping only shape and non-sensitive flags. */
function redact_settings(settings: TavernCanvasSettings | null): Readonly<Record<string, unknown>> {
  if (settings === null) {
    return {};
  }
  return {
    schema_version: settings.schema_version,
    locale: settings.locale,
    global_concurrency: settings.global_concurrency,
    auto_generation_enabled: settings.auto_generation_enabled,
    fallback_generation_enabled: settings.fallback_generation_enabled,
    gateway_configured: settings.gateway.endpoint !== null,
    acknowledged_origin_count: Object.keys(settings.gateway.http_acknowledgments).length,
    ui: settings.ui,
  };
}

export function create_diagnostics_capability(
  deps: DiagnosticsCapabilityDeps,
): DiagnosticsCapability {
  async function load_storage_estimate(): Promise<StorageEstimate | undefined> {
    try {
      return await deps.estimate_storage();
    } catch {
      return undefined;
    }
  }

  return {
    async load() {
      const estimate = await load_storage_estimate();
      return {
        capability_matrix: deps.capability_matrix,
        helper_version: deps.helper_version,
        protocol_version: null,
        storage_usage_bytes: estimate?.usage ?? null,
        storage_quota_bytes: estimate?.quota ?? null,
      };
    },
    subscribe: (handler) => deps.timeline.subscribe(handler),
    test_connection() {
      if (deps.probe_gateway === null) {
        return Promise.resolve({
          status: "failed",
          code: "gateway_not_configured",
        } satisfies ConnectionTestResult);
      }
      return deps.probe_gateway();
    },
    load_timeline: () => Promise.resolve(deps.timeline.entries),
    export_support_bundle(): Promise<SupportBundle> {
      const timeline = deps.timeline.entries;
      const error_codes = [
        ...new Set(
          timeline.flatMap((entry) => (entry.error_code === null ? [] : [entry.error_code])),
        ),
      ];
      return Promise.resolve({
        version: deps.extension_version,
        capability_matrix: deps.capability_matrix,
        redacted_settings: {
          ...redact_settings(deps.settings()),
          capability_resolutions: deps.resolutions(),
        },
        error_codes,
        timeline,
      });
    },
  };
}
