import { derive_gateway_credential_reference } from "@tavern-canvas/contracts";
import type { StorageDatabase } from "@tavern-canvas/storage";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { SecretDestinationPort } from "../../host/secret_destination.js";
import { create_sillytavern_settings } from "../../storage/sillytavern_settings.js";
import type {
  BrowserSecretVaultPort,
  BrowserSecretVaultStatus,
} from "../../storage/browser_secret_vault.js";
import { CAPABILITY_UNAVAILABLE_CODE } from "../capability_resolution.js";
import { create_settings_capability } from "./settings_capability.js";

type ImportBatchBehavior = () => Promise<void>;

let import_batch_behavior: ImportBatchBehavior = () => Promise.resolve();
let on_builder_created: (() => void) | null = null;

class FakeImportBuilder {
  static instances: FakeImportBuilder[] = [];

  cancel_count = 0;

  constructor(_options: unknown) {
    FakeImportBuilder.instances.push(this);
    on_builder_created?.();
  }

  cancel(): void {
    this.cancel_count += 1;
  }

  import_batch(_request: unknown): Promise<void> {
    return import_batch_behavior();
  }
}

vi.mock("@tavern-canvas/vocabulary", () => ({
  ImportBuilder: FakeImportBuilder,
  VocabularyPackageStore: class {
    readonly mock = true;
  },
}));

function deferred<T>(): {
  promise: Promise<T>;
  resolve(value: T): void;
} {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolve_value) => {
    resolve = resolve_value;
  });
  return { promise, resolve };
}

function vocabulary_file(text: Promise<string>, name = "vocabulary.jsonl"): Blob {
  return Object.assign(new Blob(["pending"]), {
    name,
    text: () => text,
  });
}

const VALID_IMPORT_TEXT = '{"tag":"hello","translation":"hello"}\n';
const PLAINTEXT_TOKEN = "gateway-bearer-canary-value";

class RecordingSecrets implements SecretDestinationPort {
  readonly writes: { reference: string; value: string }[] = [];
  readonly deletes: string[] = [];

  supports(): boolean {
    return true;
  }

  write_secret(reference: string, plaintext_value: string): Promise<void> {
    this.writes.push({ reference, value: plaintext_value });
    return Promise.resolve();
  }
  delete_secret(reference: string): Promise<void> {
    this.deletes.push(reference);
    return Promise.resolve();
  }

  probe_secret(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

function create_capability(
  secrets: SecretDestinationPort | null,
  database: StorageDatabase | null = null,
  browser_secret_vault: BrowserSecretVaultPort | null = null,
) {
  const extension_settings: Record<string, unknown> = {};
  const settings = create_sillytavern_settings({
    extension_settings,
    save_settings: () => Promise.resolve(),
    scheduler: {
      schedule: (task: () => Promise<void>) => {
        void task();
      },
    },
  });
  return {
    extension_settings,
    capability: create_settings_capability({
      settings,
      database,
      extension_version: "3.0.0-test",
      secrets,
      browser_secret_vault,
    }),
  };
}

beforeEach(() => {
  import_batch_behavior = () => Promise.resolve();
  on_builder_created = null;
  FakeImportBuilder.instances = [];
});

describe("vocabulary import operation lifecycle", () => {
  it("rejects a concurrent import before the first file read resolves", async () => {
    const text_gate = deferred<string>();
    const { capability } = create_capability(null, {} as StorageDatabase);

    const first_import = capability.import_vocabulary_package(vocabulary_file(text_gate.promise));
    const second_import = capability.import_vocabulary_package(
      new Blob([VALID_IMPORT_TEXT], { type: "application/jsonl" }),
    );

    await expect(second_import).rejects.toMatchObject({ code: "vocabulary_import_busy" });
    text_gate.resolve(VALID_IMPORT_TEXT);
    await first_import;
  });

  it("cancels during file reading without constructing or installing a builder", async () => {
    const text_gate = deferred<string>();
    const { capability } = create_capability(null, {} as StorageDatabase);

    const pending_import = capability.import_vocabulary_package(vocabulary_file(text_gate.promise));
    capability.cancel_vocabulary_import();
    text_gate.resolve(VALID_IMPORT_TEXT);

    await expect(pending_import).rejects.toMatchObject({
      code: "vocabulary_import_cancelled",
    });
    expect(FakeImportBuilder.instances).toHaveLength(0);
  });

  it("forwards cancellation to a builder waiting on a batch", async () => {
    const text_gate = deferred<void>();
    const builder_gate = deferred<void>();
    on_builder_created = () => text_gate.resolve(undefined);
    import_batch_behavior = () => builder_gate.promise;
    const { capability } = create_capability(null, {} as StorageDatabase);

    const pending_import = capability.import_vocabulary_package(
      new Blob([VALID_IMPORT_TEXT], { type: "application/jsonl" }),
    );
    await text_gate.promise;

    const builder = FakeImportBuilder.instances[0];
    expect(builder).toBeDefined();
    capability.cancel_vocabulary_import();
    expect(builder?.cancel_count).toBe(1);
    builder_gate.resolve(undefined);

    await expect(pending_import).rejects.toMatchObject({
      code: "vocabulary_import_cancelled",
    });
  });
});

describe("gateway access token", () => {
  it("writes the plaintext to the selected credential backend and keeps only the reference in settings", async () => {
    const secrets = new RecordingSecrets();
    const { capability } = create_capability(secrets);

    await capability.set_gateway_token(PLAINTEXT_TOKEN);
    const snapshot = await capability.load();

    const reference = derive_gateway_credential_reference(snapshot.settings.active_namespace);
    expect(secrets.writes).toEqual([{ reference, value: PLAINTEXT_TOKEN }]);
    expect(snapshot.settings.gateway.token_secret_id).toBe(reference);
    expect(JSON.stringify(snapshot.settings)).not.toContain(PLAINTEXT_TOKEN);
  });
  it("rejects a blank token without writing a vault entry", async () => {
    const secrets = new RecordingSecrets();
    const { capability } = create_capability(secrets);

    await expect(capability.set_gateway_token("   ")).rejects.toBeInstanceOf(TypeError);
    expect(secrets.writes).toEqual([]);
  });

  it("deletes the vault entry before clearing its settings reference", async () => {
    const secrets = new RecordingSecrets();
    const { capability } = create_capability(secrets);

    await capability.set_gateway_token(PLAINTEXT_TOKEN);
    await capability.clear_gateway_token();

    const snapshot = await capability.load();
    expect(snapshot.settings.gateway.token_secret_id).toBeNull();
    expect(secrets.deletes).toEqual([
      derive_gateway_credential_reference(snapshot.settings.active_namespace),
    ]);
    expect(secrets.writes).toHaveLength(1);
  });

  it("refuses to store a token on a host with no secret vault", async () => {
    const { capability } = create_capability(null);

    await expect(capability.set_gateway_token(PLAINTEXT_TOKEN)).rejects.toMatchObject({
      code: CAPABILITY_UNAVAILABLE_CODE,
    });
    expect((await capability.load()).settings.gateway.token_secret_id).toBeNull();
  });
});

describe("browser secret vault status", () => {
  it("loads vault state only when encrypted browser storage is selected", async () => {
    const status = vi.fn<() => Promise<BrowserSecretVaultStatus>>(() =>
      Promise.resolve({ state: "locked", secret_count: 2 }),
    );
    const browser_secret_vault: BrowserSecretVaultPort = {
      supports: () => true,
      write_secret: () => Promise.resolve(),
      delete_secret: () => Promise.resolve(),
      probe_secret: () => Promise.resolve(true),
      resolve_secret: () => Promise.resolve("secret"),
      status,
      initialize: () => Promise.resolve({ state: "unlocked", secret_count: 0 }),
      unlock: () => Promise.resolve({ state: "unlocked", secret_count: 2 }),
      lock: () => Promise.resolve({ state: "locked", secret_count: 2 }),
      reset: () => Promise.resolve({ state: "uninitialized", secret_count: 0 }),
      close: () => Promise.resolve(),
    };
    const { capability } = create_capability(null, null, browser_secret_vault);

    await expect(capability.load()).resolves.toMatchObject({
      browser_secret_vault: { state: "uninitialized", secret_count: 0 },
    });
    expect(status).not.toHaveBeenCalled();

    await capability.update({ credential_storage_mode: "browser_encrypted" });
    await expect(capability.load()).resolves.toMatchObject({
      browser_secret_vault: { state: "locked", secret_count: 2 },
    });
    expect(status).toHaveBeenCalledOnce();
  });
});

describe("vocabulary update channel", () => {
  it("persists the selected channel in the formal settings object", async () => {
    const { extension_settings, capability } = create_capability(null);

    await capability.set_vocabulary_update_channel("remote");
    expect((await capability.load()).vocabulary_update_channel).toBe("remote");
    expect(extension_settings.tavern_canvas).toMatchObject({
      vocabulary_update_channel: "remote",
    });
  });
});
