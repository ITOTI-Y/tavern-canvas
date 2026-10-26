import { NovelAiRequestSchema } from "@tavern-canvas/contracts";
import type { ProviderTransport, ProviderTransportOperation } from "@tavern-canvas/providers";
import { describe, expect, it, vi } from "vitest";

import { NovelAiServiceUnavailableError } from "./novelai_errors.js";
import {
  create_novelai_service,
  create_sillytavern_proxy_fetcher,
  type NovelAiServiceDeps,
  type PageTextFetcher,
} from "./novelai_service.js";

const SUBSCRIPTION = {
  tier: 3,
  active: true,
  expiresAt: 1_795_683_665,
  trainingStepsLeft: { fixedTrainingStepsLeft: 10_000, purchasedTrainingSteps: 4_327 },
  usage: { percent: 97, purchasedPercent: 0, isNegative: false, timeUntilNextPercent: 7_888 },
};

function transport_returning(
  body: unknown,
): ProviderTransport & { operations: ProviderTransportOperation[] } {
  const operations: ProviderTransportOperation[] = [];
  return {
    operations,
    execute: (operation) => {
      operations.push(operation);
      return Promise.resolve({
        status: 200,
        headers: { "content-type": "application/json" },
        body: new TextEncoder().encode(JSON.stringify(body)),
      });
    },
  };
}

function service(overrides: Partial<NovelAiServiceDeps> = {}) {
  const transport = transport_returning(SUBSCRIPTION);
  return {
    transport,
    service: create_novelai_service({
      transport: () => transport,
      preparation: {
        assets: { read: () => Promise.reject(new Error("no assets")) },
        vibe_cache: { get: () => Promise.resolve(null), put: () => Promise.resolve() },
        sha256: () => Promise.resolve("0".repeat(64)),
      },
      image_operations: {
        size: () => Promise.resolve({ width: 832, height: 1216 }),
        resize: () => Promise.reject(new Error("unused")),
        pad: () => Promise.reject(new Error("unused")),
        binarize_mask: () => Promise.reject(new Error("unused")),
      },
      page_fetchers: [],
      ...overrides,
    }),
  };
}

const signal = new AbortController().signal;

const generate = NovelAiRequestSchema.parse({
  provider_id: "novelai",
  action: "generate",
  request_id: "11111111-1111-4111-8111-111111111111",
  generation_anchor: "a".repeat(64),
  prompt: "girl",
  output_count: 1,
  model_id: "nai-diffusion-5-curated",
  sampler: "k_euler_ancestral",
  width: 832,
  height: 1216,
  steps: 23,
  scale: 7,
  cfg_rescale: 0,
  noise_schedule: "karras",
  quality_preset: "standard",
  undesired_content_preset: "heavy",
  smea: false,
  dyn: false,
  variety_plus: false,
});

describe("NovelAI service", () => {
  it("reads the account from /user/subscription", async () => {
    const { service: novelai, transport } = service();
    await expect(novelai.get_account(signal)).resolves.toMatchObject({
      tier: "opus",
      anlas: 14_327,
    });
    expect(transport.operations[0]).toMatchObject({ route: "/user/subscription", method: "GET" });
  });

  it("applies the Opus free image only after the account is known", async () => {
    const { service: novelai } = service();
    await expect(novelai.estimate_cost(generate, signal)).resolves.toMatchObject({
      anlas: 26,
      opus_free: false,
    });
    await novelai.get_account(signal);
    await expect(novelai.estimate_cost(generate, signal)).resolves.toMatchObject({
      anlas: 0,
      opus_free: true,
    });
  });

  it("falls back to the next relay and adopts the refreshed model list", async () => {
    const failing: PageTextFetcher = () => Promise.reject(new Error("relay down"));
    const pages: Record<string, string> = {
      "https://novelai.net/image": '<script src="/_next/static/chunks/a1.js"></script>',
      "https://novelai.net/_next/static/chunks/a1.js": 'x="nai-diffusion-5-1-full";',
    };
    const working: PageTextFetcher = (url) => Promise.resolve(pages[url] ?? "");
    const { service: novelai } = service({ page_fetchers: [failing, working] });

    const models = await novelai.refresh_models(signal);

    expect(models.map((model) => model.profile.model_id)).toContain("nai-diffusion-5-1-full");
    expect(novelai.list_models()).toEqual(models);
  });

  it("keeps the bundled list and explains why when every relay fails", async () => {
    const { service: novelai } = service({
      page_fetchers: [() => Promise.reject(new Error("relay down"))],
    });
    const before = novelai.list_models();
    await expect(novelai.refresh_models(signal)).rejects.toThrow(/relay down/u);
    await expect(novelai.refresh_models(signal)).rejects.toBeInstanceOf(
      NovelAiServiceUnavailableError,
    );
    expect(novelai.list_models()).toEqual(before);
  });
});

describe("SillyTavern CORS proxy fetcher", () => {
  it("requests the page through /proxy/ and reports a disabled proxy", async () => {
    const fetch_impl = vi.fn((input: string) =>
      Promise.resolve(
        input.endsWith("/missing")
          ? new Response("", { status: 404 })
          : new Response("page", { status: 200 }),
      ),
    );
    const fetch_text = create_sillytavern_proxy_fetcher(fetch_impl as unknown as typeof fetch);
    await expect(fetch_text("https://novelai.net/image", signal)).resolves.toBe("page");
    expect(fetch_impl.mock.calls[0]?.[0]).toBe("/proxy/https://novelai.net/image");
    await expect(fetch_text("https://novelai.net/missing", signal)).rejects.toThrow(
      /enableCorsProxy/u,
    );
  });
});
