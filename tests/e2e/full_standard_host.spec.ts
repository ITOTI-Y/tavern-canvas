import { expect, test } from "@playwright/test";

import {
  open_host_page,
  PUBLIC_TAVERN_HELPER_MEMBERS,
  REQUIRED_HOST_CAPABILITY_IDS,
} from "./all_host_utils.js";

test.describe("standard SillyTavern with JS Slash Runner 4.9.1 runs core generation, message binding, gallery and settings", () => {
  test("the probe activates and every required host capability resolves available", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const surface = await page.evaluate(() => ({
      state: window.__TAVERN_CANVAS_E2E__.state,
      probe: window.__TAVERN_CANVAS_E2E__.probe,
    }));

    expect(surface.state).toBe("ready");
    expect(surface.probe.ready).toBe(true);
    if (!surface.probe.ready) {
      throw new Error("probe must be ready");
    }
    expect(surface.probe.helper_version).toBe("4.9.1");
    for (const capability_id of REQUIRED_HOST_CAPABILITY_IDS) {
      expect(surface.probe.matrix[capability_id]?.available, capability_id).toBe(true);
    }
    expect(surface.probe.matrix.native_tool_manager?.available).toBe(true);
  });

  test("the Studio mounts into a real Shadow Root and installs no page-wide error listeners", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const shadow_roots = await page.evaluate(
      () => [...document.body.children].filter((element) => element.shadowRoot !== null).length,
    );
    expect(shadow_roots).toBeGreaterThan(0);

    const page_wide = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.page_listener_registrations.filter((registration) =>
        ["error", "unhandledrejection", "rejectionhandled"].includes(registration.type),
      ),
    );
    expect(page_wide).toEqual([]);
  });

  test("generation, gallery, settings, migration and diagnostics all resolve to real implementations", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const unavailable = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.resolutions
        .filter((resolution) => resolution.status !== "available")
        .map((resolution) => `${resolution.capability_id}: ${String(resolution.reason)}`),
    );
    expect(unavailable).toEqual([]);
  });

  test("a submitted job reaches the provider, the image store and the gallery", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const result = await page.evaluate(async () => {
      const surface = window.__TAVERN_CANVAS_E2E__;
      const capabilities = surface.capabilities;
      if (capabilities === undefined) {
        throw new Error("capabilities mode must expose the composed ports");
      }
      const submitted = await capabilities.generation.submit({
        profile_id: surface.profile_id as never,
        request: {
          provider_id: "sd_webui",
          request_id: "22222222-2222-4222-8222-222222222222",
          generation_anchor: "a".repeat(64),
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
      return {
        state,
        gallery_count: (await capabilities.gallery.load()).length,
        provider_urls: surface.provider_requests.map((request) => request.url),
      };
    });

    expect(result.state).toBe("completed");
    expect(result.gallery_count).toBe(1);
    expect(result.provider_urls).toEqual(["http://127.0.0.1:7860/sdapi/v1/txt2img"]);
  });

  test("message and swipe metadata round-trip through the real TavernHelper adapter", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const messages = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.control.chat_messages.map((message) => ({
        message_id: message.message_id,
        role: message.role,
        swipe_count: message.swipes.length,
      })),
    );
    expect(messages).toEqual([
      { message_id: 0, role: "user", swipe_count: 1 },
      { message_id: 1, role: "assistant", swipe_count: 1 },
    ]);
  });

  test("a settings change is written through SillyTavern's own extension_settings", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const outcome = await page.evaluate(async () => {
      const surface = window.__TAVERN_CANVAS_E2E__;
      const capabilities = surface.capabilities;
      if (capabilities === undefined) {
        throw new Error("capabilities mode must expose the composed ports");
      }
      await capabilities.settings.update({ global_concurrency: 4 });
      const stored = surface.control.extension_settings.tavern_canvas as {
        global_concurrency: number;
      };
      return {
        stored_concurrency: stored.global_concurrency,
        reloaded: (await capabilities.settings.load()).settings.global_concurrency,
      };
    });

    expect(outcome.stored_concurrency).toBe(4);
    expect(outcome.reloaded).toBe(4);
  });

  test("every host request the extension makes is a first-party SillyTavern route", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const foreign_requests = await page.evaluate(() =>
      window.__TAVERN_CANVAS_E2E__.control.requests
        .map((request) => request.url)
        .filter((url) => !url.startsWith("/api/")),
    );
    expect(foreign_requests).toEqual([]);
  });

  test("no TauriTavern capability is claimed on a standard host", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html");

    const tauri = await page.evaluate(() => {
      const probe = window.__TAVERN_CANVAS_E2E__.probe;
      return probe.ready
        ? {
            chat_surface: probe.matrix.tauri_chat_surface?.available,
            world_info: probe.matrix.tauri_world_info_activation?.available,
          }
        : null;
    });
    expect(tauri).toEqual({ chat_surface: false, world_info: false });
  });
});

test.describe("a missing, disabled or too-old JS Slash Runner blocks activation with an actionable message", () => {
  test("no TavernHelper at all blocks startup", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html", { helper: "missing" });

    const probe = await page.evaluate(() => window.__TAVERN_CANVAS_E2E__.probe);
    const state = await page.evaluate(() => window.__TAVERN_CANVAS_E2E__.state);
    expect(state).toBe("blocked");
    expect(probe.ready).toBe(false);
    if (probe.ready) {
      throw new Error("probe must be blocked");
    }
    expect(probe.error_code).toBe("tavern_helper_missing");
  });

  test("a below-minimum TavernHelper blocks startup and reports the detected version", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { helper: "4.8.0" });

    const probe = await page.evaluate(() => window.__TAVERN_CANVAS_E2E__.probe);
    expect(probe.ready).toBe(false);
    if (probe.ready) {
      throw new Error("probe must be blocked");
    }
    expect(probe.error_code).toBe("helper_version_unsupported");
    expect(probe.current_version).toBe("4.8.0");
  });

  test("the blocked screen names the required version to install", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html", { helper: "4.8.0" });

    const shadow_text = await page.evaluate(() => {
      const host = [...document.body.children].find((element) => element.shadowRoot !== null);
      return host?.shadowRoot?.textContent ?? "";
    });
    expect(shadow_text).toContain("4.9.1");
  });

  test("running code touches only the documented TavernHelper API", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const reads = await page.evaluate(() => [
      ...new Set(window.__TAVERN_CANVAS_E2E__.control.helper_property_reads),
    ]);
    const undocumented = reads.filter((name) => !PUBLIC_TAVERN_HELPER_MEMBERS.has(name));
    expect(undocumented).toEqual([]);
  });
});

test.describe("main LLM trigger path (native tool first, hidden-comment fallback)", () => {
  test("a tool-capable host gets the request_image function tool registered for the generation", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html");

    const registered = await page.evaluate(async () => {
      window.__TAVERN_CANVAS_E2E__.control.emit_generation_started("normal", false);
      await new Promise((resolve) => setTimeout(resolve, 250));
      return window.__TAVERN_CANVAS_E2E__.control.registered_tools.map((tool) => tool.name);
    });

    expect(
      registered,
      "compose_capabilities.ts must start GenerationTriggerModule so the main LLM can request " +
        "images through SillyTavern's native ToolManager",
    ).toContain("request_image");
  });

  test("a host without native tools gets the hidden-comment fallback stream parser attached", async ({
    page,
  }) => {
    await open_host_page(page, "sillytavern_host.html", { tools: "none" });

    const subscribed = await page.evaluate(async () => {
      window.__TAVERN_CANVAS_E2E__.control.emit_generation_started("normal", false);
      await new Promise((resolve) => setTimeout(resolve, 250));
      return window.__TAVERN_CANVAS_E2E__.control.subscribed_events;
    });

    expect(
      subscribed,
      "compose_capabilities.ts must start GenerationTriggerModule so a non-tool model's hidden " +
        "comments are parsed out of the stream",
    ).toContain("STREAM_TOKEN_RECEIVED");
  });
});
