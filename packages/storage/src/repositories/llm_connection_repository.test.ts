import "fake-indexeddb/auto";

import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { DATABASE_NAME, type LlmConnection } from "../database_schema.js";
import { dispose_database, open_database } from "../open_database.js";
import {
  create_business_repositories,
  type BusinessRepositories,
} from "./business_repositories.js";

const NAMESPACE = "primary";
const OTHER_NAMESPACE = "secondary";
const NOW = "2026-08-07T00:00:00.000Z";
const LATER = "2026-08-07T00:00:01.000Z";
const IDS = {
  first: "11111111-1111-4111-8111-111111111111",
  second: "22222222-2222-4222-8222-222222222222",
} as const;

async function make_repositories(): Promise<BusinessRepositories> {
  return create_business_repositories(await open_database());
}

function connection(
  id: string = IDS.first,
  overrides: Partial<LlmConnection> = {},
  namespace = NAMESPACE,
): LlmConnection {
  return {
    schema_version: 1,
    id,
    namespace,
    record_key: `${namespace}:${id}`,
    created_at: NOW,
    updated_at: NOW,
    provider_kind: "openai_compatible",
    credential_reference: `tavern_canvas:${namespace}:${id}:llm_profile_api_key`,
    payload: {
      display_name: "Primary text model",
      route: "/v1/chat/completions",
      model_id: "gpt-4o-mini",
      temperature: 0.7,
      max_output_tokens: 2048,
      is_default: true,
    },
    ...overrides,
  };
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("LlmConnectionRepository", () => {
  it("creates, reads, updates, and deletes a connection", async () => {
    const repositories = await make_repositories();
    const repository = repositories.llm_connections;

    await repository.create(NAMESPACE, connection());
    expect(await repository.get(NAMESPACE, IDS.first)).toMatchObject({
      provider_kind: "openai_compatible",
    });

    await repository.update(
      NAMESPACE,
      connection(IDS.first, { updated_at: LATER, provider_kind: "anthropic" }),
    );
    expect((await repository.get(NAMESPACE, IDS.first))?.provider_kind).toBe("anthropic");

    await repository.delete(NAMESPACE, IDS.first);
    expect(await repository.get(NAMESPACE, IDS.first)).toBeNull();
  });

  it("lists only the requested namespace's connections", async () => {
    const repositories = await make_repositories();
    await repositories.llm_connections.create(NAMESPACE, connection(IDS.first));
    await repositories.llm_connections.create(
      OTHER_NAMESPACE,
      connection(IDS.second, {}, OTHER_NAMESPACE),
    );

    const listed = await repositories.llm_connections.list(NAMESPACE);
    expect(listed.map((record) => record.id)).toEqual([IDS.first]);
  });

  it("stores a credential reference without ever storing a credential value", async () => {
    const repositories = await make_repositories();
    await repositories.llm_connections.create(NAMESPACE, connection());

    const stored = await repositories.llm_connections.get(NAMESPACE, IDS.first);
    expect(stored?.credential_reference).toBe(
      `tavern_canvas:${NAMESPACE}:${IDS.first}:llm_profile_api_key`,
    );
    expect(JSON.stringify(stored)).not.toContain("sk-");
  });

  it("accepts a connection with no credential configured", async () => {
    const repositories = await make_repositories();
    await repositories.llm_connections.create(
      NAMESPACE,
      connection(IDS.first, { credential_reference: null }),
    );
    expect(
      (await repositories.llm_connections.get(NAMESPACE, IDS.first))?.credential_reference,
    ).toBe(null);
  });

  it("rejects a payload carrying a credential-shaped field", async () => {
    const repositories = await make_repositories();
    await expect(
      repositories.llm_connections.create(
        NAMESPACE,
        connection(IDS.first, {
          payload: { display_name: "Leaky", api_key: "sk-live-abcdef" },
        }),
      ),
    ).rejects.toThrow(/credential-like/u);
  });

  it("rejects a payload carrying an authorization header", async () => {
    const repositories = await make_repositories();
    await expect(
      repositories.llm_connections.create(
        NAMESPACE,
        connection(IDS.first, {
          payload: { display_name: "Leaky", headers: { Authorization: "Bearer abc" } },
        }),
      ),
    ).rejects.toThrow(/credential-like/u);
  });

  it("rejects a record whose key does not derive from namespace and id", async () => {
    const repositories = await make_repositories();
    await expect(
      repositories.llm_connections.create(
        NAMESPACE,
        connection(IDS.first, { record_key: "primary:tampered" }),
      ),
    ).rejects.toThrow(/Record key/u);
  });
});
