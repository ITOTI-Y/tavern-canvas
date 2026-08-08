import { derive_gateway_credential_reference } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import type { SecretDestinationPort } from "../../migration/secret_transfer.js";
import { create_sillytavern_settings } from "../../storage/sillytavern_settings.js";
import { CAPABILITY_UNAVAILABLE_CODE } from "../capability_resolution.js";
import { create_settings_capability, VocabularyChannelState } from "./settings_capability.js";

const PLAINTEXT_TOKEN = "gateway-bearer-canary-value";

class RecordingSecrets implements SecretDestinationPort {
  readonly writes: { reference: string; value: string }[] = [];

  supports(): boolean {
    return true;
  }

  write_secret(reference: string, plaintext_value: string): Promise<void> {
    this.writes.push({ reference, value: plaintext_value });
    return Promise.resolve();
  }

  probe_secret(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

function create_capability(secrets: SecretDestinationPort | null) {
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
      database: null,
      extension_version: "3.0.0-test",
      vocabulary_channel: new VocabularyChannelState(),
      secrets,
    }),
  };
}

describe("gateway access token", () => {
  it("writes the plaintext to host secret storage and keeps only the reference in settings", async () => {
    const secrets = new RecordingSecrets();
    const { capability } = create_capability(secrets);

    await capability.set_gateway_token(PLAINTEXT_TOKEN);
    const snapshot = await capability.load();

    const reference = derive_gateway_credential_reference(snapshot.settings.active_namespace);
    expect(secrets.writes).toEqual([{ reference, value: PLAINTEXT_TOKEN }]);
    expect(snapshot.settings.gateway.token_secret_id).toBe(reference);
    expect(JSON.stringify(snapshot.settings)).not.toContain(PLAINTEXT_TOKEN);
  });

  it("clears the reference without touching the vault entry", async () => {
    const secrets = new RecordingSecrets();
    const { capability } = create_capability(secrets);

    await capability.set_gateway_token(PLAINTEXT_TOKEN);
    await capability.clear_gateway_token();

    expect((await capability.load()).settings.gateway.token_secret_id).toBeNull();
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
