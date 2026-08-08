import { describe, expect, it } from "vitest";

import { VaultReferenceSchema } from "./ids.js";
import { GATEWAY_CREDENTIAL_KIND, derive_gateway_credential_reference } from "./settings.js";

describe("derive_gateway_credential_reference", () => {
  it("derives a stable, namespaced vault reference that carries no token material", () => {
    const reference = derive_gateway_credential_reference("primary");

    expect(reference).toBe(`tavern_canvas:primary:${GATEWAY_CREDENTIAL_KIND}`);
    expect(VaultReferenceSchema.safeParse(reference).success).toBe(true);
    expect(derive_gateway_credential_reference("primary")).toBe(reference);
  });

  it("keeps namespaces apart so two namespaces never share one Gateway token", () => {
    expect(derive_gateway_credential_reference("primary")).not.toBe(
      derive_gateway_credential_reference("secondary"),
    );
  });

  it("refuses a namespace that cannot form a vault reference", () => {
    expect(() => derive_gateway_credential_reference("has space")).toThrow();
  });
});
