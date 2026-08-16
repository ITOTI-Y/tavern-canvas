import "fake-indexeddb/auto";

import type { LlmConnectionDraft } from "@tavern-canvas/contracts";
import {
  DATABASE_NAME,
  LlmConnectionRepository,
  dispose_database,
  open_database,
} from "@tavern-canvas/storage";
import { deleteDB } from "idb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { SecretDestinationPort } from "../../migration/secret_transfer.js";
import {
  LlmConnectionService,
  type LlmTransportOperation,
  type LlmTransportPort,
} from "./llm_connection_service.js";

const NAMESPACE = "default";
const CONNECTION_ID = "11111111-1111-4111-8111-111111111111";
const OTHER_ID = "22222222-2222-4222-8222-222222222222";
const NOW = "2026-08-07T00:00:00.000Z";

function draft(overrides: Partial<LlmConnectionDraft> = {}): LlmConnectionDraft {
  return {
    id: CONNECTION_ID,
    display_name: "Primary text model",
    provider_kind: "openai_compatible",
    route: "/v1/chat/completions",
    model_id: "gpt-4o-mini",
    temperature: 0.7,
    max_output_tokens: 2048,
    is_default: true,
    ...overrides,
  } as LlmConnectionDraft;
}

interface RecordingSecrets extends SecretDestinationPort {
  readonly writes: { reference: string; value: string }[];
  readonly deletes: string[];
}

function make_secrets(): RecordingSecrets {
  const writes: { reference: string; value: string }[] = [];
  const deletes: string[] = [];
  return {
    writes,
    deletes,
    supports: () => true,
    write_secret: (reference, value) => {
      writes.push({ reference, value });
      return Promise.resolve();
    },
    delete_secret: (reference) => {
      deletes.push(reference);
      return Promise.resolve();
    },
    probe_secret: (reference) =>
      Promise.resolve(writes.some((write) => write.reference === reference)),
  };
}

function make_transport(
  respond: (operation: LlmTransportOperation) => { status: number; body: Uint8Array } = () => ({
    status: 200,
    body: new TextEncoder().encode('{"data":[]}'),
  }),
): LlmTransportPort & { readonly operations: LlmTransportOperation[] } {
  const operations: LlmTransportOperation[] = [];
  return {
    operations,
    execute: (operation) => {
      operations.push(operation);
      return Promise.resolve(respond(operation));
    },
  };
}

async function make_service(
  overrides: {
    readonly secrets?: RecordingSecrets;
    readonly transport?: LlmTransportPort;
  } = {},
) {
  const database = await open_database();
  const repository = new LlmConnectionRepository(database);
  const secrets = overrides.secrets ?? make_secrets();
  const transport = overrides.transport ?? make_transport();
  const service = new LlmConnectionService({
    repository,
    namespace: NAMESPACE,
    secrets,
    transport,
    clock: () => NOW,
  });
  return { service, repository, secrets, transport };
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date", "performance"] });
});

afterEach(async () => {
  vi.useRealTimers();
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("LlmConnectionService: CRUD", () => {
  it("creates a connection and lists it back", async () => {
    const { service } = await make_service();
    const saved = await service.save(draft());

    expect(saved.display_name).toBe("Primary text model");
    expect(saved.credential_reference).toBe(null);
    expect(await service.list()).toHaveLength(1);
  });

  it("updates an existing connection in place instead of duplicating it", async () => {
    const { service } = await make_service();
    await service.save(draft());
    const updated = await service.save(draft({ display_name: "Renamed", model_id: "gpt-4.1" }));

    expect(updated.model_id).toBe("gpt-4.1");
    const listed = await service.list();
    expect(listed).toHaveLength(1);
    expect(listed[0]?.display_name).toBe("Renamed");
  });

  it("removes a connection", async () => {
    const { service } = await make_service();
    await service.save(draft());
    await service.remove(CONNECTION_ID);
    expect(await service.list()).toHaveLength(0);
  });

  it("keeps exactly one default connection", async () => {
    const { service } = await make_service();
    await service.save(draft());
    await service.save(draft({ id: OTHER_ID, display_name: "Second", is_default: true }));

    const defaults = (await service.list()).filter((connection) => connection.is_default);
    expect(defaults.map((connection) => connection.id)).toEqual([OTHER_ID]);
  });

  it("emits upsert and remove events to subscribers", async () => {
    const { service } = await make_service();
    const events: string[] = [];
    const unsubscribe = service.subscribe((event) => {
      events.push(event.type);
    });

    await service.save(draft());
    await service.remove(CONNECTION_ID);
    unsubscribe();
    await service.save(draft({ id: OTHER_ID }));

    expect(events).toEqual(["connection_upserted", "connection_removed"]);
  });
});

describe("LlmConnectionService: validation", () => {
  it("rejects a draft whose route is not in the selected kind's catalog", async () => {
    const { service } = await make_service();
    await expect(
      service.save(draft({ provider_kind: "anthropic", route: "/v1/chat/completions" })),
    ).rejects.toThrow();
  });

  it("rejects a draft carrying an absolute endpoint URL as the route", async () => {
    const { service } = await make_service();
    await expect(
      service.save(draft({ route: "https://api.openai.com/v1/chat/completions" })),
    ).rejects.toThrow();
  });

  it("rejects a blank display name", async () => {
    const { service } = await make_service();
    await expect(service.save(draft({ display_name: "   " }))).rejects.toThrow();
  });

  it("rejects a draft carrying extra transport keys", async () => {
    const { service } = await make_service();
    await expect(
      service.save({ ...draft(), base_url: "https://evil.test" } as unknown as LlmConnectionDraft),
    ).rejects.toThrow();
  });

  it("rejects removing an unknown connection", async () => {
    const { service } = await make_service();
    await expect(service.remove(OTHER_ID)).rejects.toThrow(/unknown/iu);
  });
});

describe("LlmConnectionService: credentials stay references", () => {
  it("writes the plaintext to the secret vault and persists only a reference", async () => {
    const { service, secrets, repository } = await make_service();
    await service.save(draft());

    const updated = await service.set_credential(CONNECTION_ID, "sk-live-super-secret");

    expect(secrets.writes).toEqual([
      {
        reference: `tavern_canvas:${NAMESPACE}:${CONNECTION_ID}:llm_profile_api_key`,
        value: "sk-live-super-secret",
      },
    ]);
    expect(updated.credential_reference).toBe(
      `tavern_canvas:${NAMESPACE}:${CONNECTION_ID}:llm_profile_api_key`,
    );

    const stored = await repository.get(NAMESPACE, CONNECTION_ID);
    expect(JSON.stringify(stored)).not.toContain("sk-live-super-secret");
  });

  it("never returns the plaintext through any read path", async () => {
    const { service } = await make_service();
    await service.save(draft());
    await service.set_credential(CONNECTION_ID, "sk-live-super-secret");

    expect(JSON.stringify(await service.list())).not.toContain("sk-live-super-secret");
  });

  it("does not persist a reference when the vault probe fails", async () => {
    const secrets: RecordingSecrets = {
      writes: [],
      deletes: [],
      supports: () => true,
      write_secret: () => Promise.resolve(),
      probe_secret: () => Promise.resolve(false),
    };
    const { service } = await make_service({ secrets });
    await service.save(draft());

    await expect(service.set_credential(CONNECTION_ID, "sk-live")).rejects.toThrow(
      /credential_probe_failed/u,
    );
    expect((await service.list())[0]?.credential_reference).toBe(null);
  });

  it("rejects a blank credential rather than writing an empty vault entry", async () => {
    const { service, secrets } = await make_service();
    await service.save(draft());

    await expect(service.set_credential(CONNECTION_ID, "   ")).rejects.toThrow();
    expect(secrets.writes).toHaveLength(0);
  });

  it("deletes the vault entry before clearing the credential reference", async () => {
    const { service, secrets } = await make_service();
    await service.save(draft());
    const configured = await service.set_credential(CONNECTION_ID, "sk-live");

    const cleared = await service.clear_credential(CONNECTION_ID);
    expect(secrets.deletes).toEqual([configured.credential_reference]);
    expect(cleared.credential_reference).toBe(null);
  });
});

describe("LlmConnectionService: connection test", () => {
  it("calls the catalog models route for the connection's kind, never a client supplied URL", async () => {
    const transport = make_transport();
    const { service } = await make_service({ transport });
    await service.save(draft());

    const result = await service.test_connection(CONNECTION_ID);

    expect(result.status).toBe("success");
    expect(transport.operations).toHaveLength(1);
    expect(transport.operations[0]?.route).toBe("/v1/models");
    expect(transport.operations[0]?.method).toBe("GET");
  });

  it("passes the credential reference to the transport, never a credential value", async () => {
    const transport = make_transport();
    const { service } = await make_service({ transport });
    await service.save(draft());
    await service.set_credential(CONNECTION_ID, "sk-live-super-secret");

    await service.test_connection(CONNECTION_ID);

    const operation = transport.operations[0];
    expect(operation?.credential_reference).toBe(
      `tavern_canvas:${NAMESPACE}:${CONNECTION_ID}:llm_profile_api_key`,
    );
    expect(JSON.stringify(operation)).not.toContain("sk-live-super-secret");
  });

  it("maps a non-ok status to a stable failure code", async () => {
    const transport = make_transport(() => ({ status: 401, body: new Uint8Array() }));
    const { service } = await make_service({ transport });
    await service.save(draft());

    const result = await service.test_connection(CONNECTION_ID);
    expect(result).toEqual({ status: "failed", code: "auth_failed" });
  });

  it("maps a transport rejection to a stable failure code", async () => {
    const transport: LlmTransportPort = {
      execute: () => Promise.reject(new Error("offline")),
    };
    const { service } = await make_service({ transport });
    await service.save(draft());

    expect(await service.test_connection(CONNECTION_ID)).toEqual({
      status: "failed",
      code: "provider_unavailable",
    });
  });

  it("rejects testing an unknown connection", async () => {
    const { service } = await make_service();
    await expect(service.test_connection(OTHER_ID)).rejects.toThrow(/unknown/iu);
  });
});
