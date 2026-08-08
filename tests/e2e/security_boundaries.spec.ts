import { expect, test } from "@playwright/test";

import { open_host_page } from "./all_host_utils.js";

/**
 * Security boundary gate for the shipped extension, run in real Chromium against the real
 * bootstrap and composition root (tests/harness/src/all_host_boot.ts). Every probe below drives
 * first-party production code with hostile input; nothing here reimplements the behaviour it
 * asserts.
 *
 * Backs docs/parity/feature_matrix.md's "SD WebUI", "NovelAI", "ComfyUI", "OpenAI compatible and
 * Google/Banana/Grok", "LLM prompt generation and testing", and "diagnostics, migration,
 * import/export, and cleanup" sections, and architecture acceptance criterion 10 (a client request
 * can never name the upstream destination).
 */

const SEEDED_PROMPT = "SEEDED_PROMPT_a_rainy_alley_at_night_marker";
const SEEDED_CHAT = "SEEDED_CHAT_CONTENT_marker_never_leaves_the_host";
const SEEDED_SECRET = "seeded-plaintext-credential-never-in-a-bundle";

test.describe("provider destination control (criterion 10)", () => {
  test("a stored profile cannot move the request off the code-owned catalog route", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const outcome = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.provider_override({
        base_url: "https://attacker.example",
        url: "https://attacker.example/steal",
        endpoint: "https://attacker.example",
        host: "attacker.example",
        path: "/steal",
      }),
    );

    for (const url of outcome.request_urls) {
      expect(new URL(url).origin).toBe("https://api.openai.com");
      expect(new URL(url).pathname).toBe("/v1/images/generations");
    }
    expect(outcome.request_urls.some((url) => url.includes("attacker.example"))).toBe(false);
  });

  test("a stored profile cannot inject a request header", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const outcome = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.provider_override({
        headers: { "x-attacker-exfiltration": "1", authorization: "Bearer attacker-token" },
      }),
    );

    // Either the storage layer refuses the field outright, or it is persisted and simply never
    // read by the transport. Both are the boundary holding; a smuggled header on the wire is not.
    for (const headers of outcome.request_headers) {
      expect(Object.keys(headers)).not.toContain("x-attacker-exfiltration");
      expect(headers.authorization).not.toBe("Bearer attacker-token");
    }
    if (outcome.rejected_at_storage === null) {
      expect(outcome.request_headers.length).toBeGreaterThan(0);
    } else {
      expect(outcome.rejected_at_storage).toContain("credential-like field");
    }
  });

  test("a stored profile cannot carry a plaintext credential to the vendor", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const outcome = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.provider_override({
        credential: "attacker-plaintext-credential",
        api_key: "attacker-plaintext-credential",
      }),
    );

    expect(JSON.stringify(outcome.request_headers)).not.toContain("attacker-plaintext-credential");
    expect(outcome.rejected_at_storage).toContain("credential-like field");
  });
});

test.describe("hostile content never becomes code", () => {
  test("a malformed fallback control comment is discarded without executing or leaking", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const outcome = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.parse_fallback([
        "before ",
        // The real control-comment opening, split across chunk boundaries mid-token, carrying a
        // payload that is neither valid JSON nor valid tool arguments.
        "<!-- tavern-canv",
        "as:image ",
        '{"prompt":"</script><script>window.__TAVERN_CANVAS_E2E_EXECUTED__=\\"fallback\\"</script>"',
        ',"__proto__":{"polluted":true}} -->',
        " after",
      ]),
    );

    expect(outcome.executed_marker).toBeNull();
    expect(outcome.request_count).toBe(0);
    // The malformed directive is removed from what the user's message keeps.
    expect(outcome.cleaned_text).not.toContain("tavern-canvas:image");
    expect(outcome.cleaned_text).not.toContain("script");
    expect(outcome.cleaned_text.trim()).toBe("before  after".trim());
  });

  test("workflow placeholder substitution never evaluates its values or pollutes a prototype", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const rendered = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.render_workflow(
        JSON.stringify({
          workflow_id: "66666666-6666-4666-8666-666666666666",
          workflow: {
            "1": { class_type: "CLIPTextEncode", inputs: { text: "" } },
            "2": { class_type: "EmptyLatentImage", inputs: { batch_size: 1 } },
          },
          bindings: {
            prompt: { node_id: "1", property: "text" },
            output_count: { node_id: "2", property: "batch_size" },
            placeholders: {},
            input_assets: {},
          },
        }),
        {
          prompt: "${constructor.constructor('window.__TAVERN_CANVAS_E2E_EXECUTED__=1')()}",
          output_count: 1,
          placeholder_values: {},
          input_asset_names: {},
        },
      ),
    );

    const executed = await page.evaluate(
      () => Reflect.get(window, "__TAVERN_CANVAS_E2E_EXECUTED__") as unknown,
    );
    expect(executed).toBeUndefined();
    const polluted = await page.evaluate(
      () => ({}) as Record<string, unknown> & { polluted?: unknown },
    );
    expect(polluted.polluted).toBeUndefined();
    // The hostile value survives only as an inert string, exactly where the binding put it.
    expect(JSON.parse(rendered)).toMatchObject({
      "1": {
        inputs: { text: "${constructor.constructor('window.__TAVERN_CANVAS_E2E_EXECUTED__=1')()}" },
      },
    });
  });

  test("a workflow whose placeholder is not declared in its bindings is rejected", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const rejected = await page.evaluate(async () => {
      try {
        window.__TAVERN_CANVAS_E2E__.probes.render_workflow(
          JSON.stringify({
            workflow_id: "66666666-6666-4666-8666-666666666666",
            workflow: {
              "1": { class_type: "CLIPTextEncode", inputs: { text: "" } },
              "2": { class_type: "EmptyLatentImage", inputs: { batch_size: 1 } },
            },
            bindings: {
              prompt: { node_id: "1", property: "inputs.text" },
              output_count: { node_id: "2", property: "inputs.batch_size" },
              placeholders: {},
              input_assets: {},
            },
          }),
          {
            prompt: "safe",
            output_count: 1,
            placeholder_values: { __proto__: "polluted", undeclared: "x" },
            input_asset_names: {},
          },
        );
        await Promise.resolve();
        return null;
      } catch (thrown) {
        return String(thrown);
      }
    });

    expect(rejected).not.toBeNull();
  });

  test("Markdown and user tag content cannot produce a script, event handler or unsafe URL", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const outcome = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.render_markdown(
        '<script>window.x=1</script>\n\n<img src=x onerror="window.x=1">\n\n' +
          "[click](javascript:alert(1))\n\n" +
          "[data](data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==)\n\n" +
          "<iframe src=\"javascript:alert(1)\"></iframe>\n\n<a href='vbscript:x'>v</a>",
      ),
    );

    expect(outcome.script_element_count).toBe(0);
    expect(outcome.event_handler_attributes).toEqual([]);
    expect(outcome.unsafe_urls).toEqual([]);
  });
});

test.describe("diagnostics never carry user or credential data", () => {
  test("the support bundle contains no seeded prompt, chat, secret, authorization or upstream body", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const bundle_text = await page.evaluate(async () => {
      const surface = window.__TAVERN_CANVAS_E2E__;
      const capabilities = surface.capabilities;
      if (capabilities === undefined) {
        throw new Error("capabilities mode must expose the composed ports");
      }
      const submitted = await capabilities.generation.submit({
        profile_id: surface.profile_id as never,
        request: {
          provider_id: "sd_webui",
          request_id: "55555555-5555-4555-8555-555555555555",
          generation_anchor: "e".repeat(64),
          prompt: "SEEDED_PROMPT_a_rainy_alley_at_night_marker",
          output_count: 1,
          mode: "txt2img",
          model_id: "sd_xl_base",
          sampler: "dpmpp_2m",
          scheduler: "karras",
          width: 512,
          height: 512,
          steps: 20,
          cfg_scale: 7,
        } as never,
      });
      const deadline = Date.now() + 20_000;
      let state = submitted.state;
      while (Date.now() < deadline && state !== "completed" && state !== "failed") {
        await new Promise((resolve) => setTimeout(resolve, 25));
        const jobs = await capabilities.generation.load();
        state = jobs.find((job) => job.job_id === submitted.job_id)?.state ?? state;
      }
      return JSON.stringify(await capabilities.diagnostics.export_support_bundle());
    });

    expect(bundle_text).not.toContain(SEEDED_PROMPT);
    expect(bundle_text).not.toContain(SEEDED_CHAT);
    expect(bundle_text).not.toContain(SEEDED_SECRET);
    expect(bundle_text.toLowerCase()).not.toContain("authorization");
    // The one-image SD WebUI response body is base64; no part of it may survive into the bundle.
    expect(bundle_text).not.toContain("iVBORw0KGgo");
    expect(bundle_text).not.toMatch(/[A-Za-z0-9+/]{120,}={0,2}/u);
  });
});

test.describe("cleartext HTTP disclosure is per origin and non-blocking (criterion 9)", () => {
  test("an unacknowledged cleartext origin is refused, and the same origin works once acknowledged", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const outcome = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.http_acknowledgment("http://192.168.1.50:8787"),
    );

    expect(outcome.before).toContain("blocked:");
    expect(outcome.after).toBe("gateway");
  });

  test("acknowledging one origin does not acknowledge another", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html");

    const outcome = await page.evaluate(async () => {
      const surface = window.__TAVERN_CANVAS_E2E__;
      const first = surface.probes.http_acknowledgment("http://192.168.1.50:8787");
      const second = surface.probes.http_acknowledgment("http://192.168.1.51:8787");
      await Promise.resolve();
      return { first, second };
    });

    expect(outcome.first.before).toContain("blocked:");
    expect(outcome.second.before).toContain("blocked:");
  });

  test("an HTTPS origin needs no acknowledgment at all", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html");

    const outcome = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.probes.http_acknowledgment("https://gateway.example"),
    );
    expect(outcome.before).toBe("gateway");
  });
});

test.describe("the page stays inert", () => {
  test("a full production mount makes no remote runtime script, font, model or data request", async ({
    page,
  }) => {
    const foreign: string[] = [];
    const catalog: string[] = [];
    await page.route("**/*", async (route) => {
      const request_url = route.request().url();
      const url = new URL(request_url);
      if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
        foreign.push(request_url);
      }
      if (request_url.includes("catalog.json")) {
        catalog.push(request_url);
      }
      await route.continue();
    });

    // Deliberately the default (full bootstrap) mode: the studio controller's eager start() is
    // part of a real extension load, so anything it fetches is an unsolicited request the user
    // never asked for.
    await open_host_page(page, "sillytavern_host.html");
    await page.waitForTimeout(1_000);

    expect(
      foreign,
      "loading the extension must not reach any origin the user did not ask it to",
    ).toEqual([]);
    // Named separately from the origin check: this is the exact request a previously eager
    // `studio_controller.start()` made, and it would still be wrong if the catalog ever moved to
    // an origin the loop above happens to allow.
    expect(
      catalog,
      "the vocabulary catalog is fetched when the vocabulary panel opens, never during bootstrap",
    ).toEqual([]);
  });

  test("no page-wide error or unhandled-rejection listener is installed", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html");

    const page_wide = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.page_listener_registrations.filter((registration) =>
        ["error", "unhandledrejection", "rejectionhandled"].includes(registration.type),
      ),
    );
    expect(page_wide).toEqual([]);
  });
});
