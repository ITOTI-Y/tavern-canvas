import type { LlmConnectionDraft, LlmConnectionProfile, Uuid } from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import type {
  LlmConnectionsCapability,
  LlmConnectionsDomainEvent,
  StudioCapabilities,
} from "../contracts/ui_capabilities.js";
import { create_unavailable_capabilities } from "./unavailable_capabilities.js";
import { create_studio_controller } from "./studio_controller.js";

const CONNECTION_ID = "11111111-1111-4111-8111-111111111111" as Uuid;
const OTHER_ID = "22222222-2222-4222-8222-222222222222" as Uuid;
const NOW = "2026-08-07T00:00:00.000Z";

function connection(overrides: Partial<LlmConnectionProfile> = {}): LlmConnectionProfile {
  return {
    id: CONNECTION_ID,
    display_name: "Primary text model",
    provider_kind: "openai_compatible",
    route: "/v1/chat/completions",
    model_id: "gpt-4o-mini",
    temperature: 0.7,
    max_output_tokens: 2048,
    is_default: true,
    credential_reference: null,
    created_at: NOW,
    updated_at: NOW,
    ...overrides,
  };
}

function build_capabilities(overrides: Partial<LlmConnectionsCapability> = {}): {
  readonly capabilities: StudioCapabilities;
  readonly llm: LlmConnectionsCapability;
  emit(event: LlmConnectionsDomainEvent): void;
} {
  let handler: ((event: LlmConnectionsDomainEvent) => void) | null = null;
  const llm: LlmConnectionsCapability = {
    load: vi.fn(() => Promise.resolve([connection()])),
    subscribe: vi.fn((next: (event: LlmConnectionsDomainEvent) => void) => {
      handler = next;
      return () => {
        handler = null;
      };
    }),
    save: vi.fn((draft: LlmConnectionDraft) => Promise.resolve(connection(draft))),
    remove: vi.fn(() => Promise.resolve()),
    set_credential: vi.fn(() =>
      Promise.resolve(connection({ credential_reference: "tavern_canvas:default:x:llm" })),
    ),
    clear_credential: vi.fn(() => Promise.resolve(connection())),
    test_connection: vi.fn(() =>
      Promise.resolve({ status: "success", latency_ms: 12, model_id: "gpt-4o-mini" } as const),
    ),
    ...overrides,
  };
  return {
    capabilities: { ...create_unavailable_capabilities(), llm_connections: llm },
    llm,
    emit(event) {
      handler?.(event);
    },
  };
}

describe("StudioController: text-LLM connections", () => {
  it("loads connections into its own state slice on start", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });

    await controller.start();

    expect(controller.state.llm_connections.connections).toHaveLength(1);
    expect(controller.state.loading.has("llm_connections")).toBe(false);
  });

  it("records a stable failure code when the load rejects", async () => {
    const failure = Object.assign(new Error("nope"), { code: "llm_load_failed" });
    const { capabilities } = build_capabilities({ load: vi.fn(() => Promise.reject(failure)) });
    const controller = create_studio_controller({ capabilities });

    await controller.start();

    expect(controller.state.failures.get("llm_connections")).toEqual({ code: "llm_load_failed" });
  });

  it("upserts a saved connection into state", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    await controller.save_llm_connection({
      id: OTHER_ID,
      display_name: "Second",
      provider_kind: "anthropic",
      route: "/v1/messages",
      model_id: "claude-sonnet",
      temperature: 1,
      max_output_tokens: 4096,
      is_default: false,
    });

    expect(controller.state.llm_connections.connections.map((item) => item.id)).toEqual([
      CONNECTION_ID,
      OTHER_ID,
    ]);
  });

  it("drops a removed connection from state", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    await controller.remove_llm_connection(CONNECTION_ID);

    expect(controller.state.llm_connections.connections).toHaveLength(0);
  });

  it("applies domain events emitted outside its own commands", async () => {
    const { capabilities, emit } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    emit({ type: "connection_upserted", connection: connection({ id: OTHER_ID }) });
    expect(controller.state.llm_connections.connections).toHaveLength(2);

    emit({ type: "connection_removed", connection_id: OTHER_ID });
    expect(controller.state.llm_connections.connections).toHaveLength(1);
  });

  it("stores the reference-only result of a credential write", async () => {
    const { capabilities, llm } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    await controller.set_llm_connection_credential(CONNECTION_ID, "sk-live-secret");

    expect(llm.set_credential).toHaveBeenCalledWith(CONNECTION_ID, "sk-live-secret");
    expect(JSON.stringify(controller.state.llm_connections.connections)).not.toContain("sk-live");
  });

  it("clears a credential back to no reference", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    await controller.clear_llm_connection_credential(CONNECTION_ID);

    expect(controller.state.llm_connections.connections[0]?.credential_reference).toBe(null);
  });

  it("passes a connection test straight through to the caller", async () => {
    const { capabilities } = build_capabilities();
    const controller = create_studio_controller({ capabilities });
    await controller.start();

    expect(await controller.test_llm_connection(CONNECTION_ID)).toEqual({
      status: "success",
      latency_ms: 12,
      model_id: "gpt-4o-mini",
    });
  });
});
