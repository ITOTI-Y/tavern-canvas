import { describe, expect, it } from "vitest";

import {
  LOCALE_LOAD_FAILED_CODE,
  load_locale,
  normalize_host_locale,
  resolve_locale,
  type LocaleMessageHost,
} from "./locale_resolution.js";

describe("normalize_host_locale", () => {
  it.each([
    ["zh-CN", "zh-CN"],
    ["zh-SG", "zh-CN"],
    ["zh-Hans", "zh-CN"],
    ["zh-cn", "zh-CN"],
    ["ZH-CN", "zh-CN"],
    ["zh_CN", "zh-CN"],
    ["ZH_cn", "zh-CN"],
    ["zh_sg", "zh-CN"],
    ["Zh-Hans", "zh-CN"],
    ["zh_hans", "zh-CN"],
    ["  zh-CN  ", "zh-CN"],
  ] as const)("maps host locale %s to %s", (host_locale, expected) => {
    expect(normalize_host_locale(host_locale)).toBe(expected);
  });

  it.each([
    ["zh-TW", "en"],
    ["zh-Hant", "en"],
    ["zh-HK", "en"],
    ["zh", "en"],
    ["en", "en"],
    ["en-US", "en"],
    ["ja", "en"],
    ["fr-FR", "en"],
    ["", "en"],
    ["not-a-real-locale", "en"],
  ] as const)("maps every other locale %s to en, including zh-TW", (host_locale, expected) => {
    expect(normalize_host_locale(host_locale)).toBe(expected);
  });
});

describe("resolve_locale", () => {
  it("lets an explicit zh-CN override win regardless of host locale", () => {
    expect(resolve_locale("zh-CN", "en-US")).toBe("zh-CN");
  });

  it("lets an explicit en override win regardless of host locale", () => {
    expect(resolve_locale("en", "zh-CN")).toBe("en");
  });

  it("follows the host locale when preference is auto", () => {
    expect(resolve_locale("auto", "zh-SG")).toBe("zh-CN");
    expect(resolve_locale("auto", "zh-TW")).toBe("en");
  });

  it("re-evaluates auto on every call, following host locale changes", () => {
    let host_locale = "en-US";
    expect(resolve_locale("auto", host_locale)).toBe("en");

    host_locale = "zh-Hans";
    expect(resolve_locale("auto", host_locale)).toBe("zh-CN");
  });
});

function create_fake_host(initial_locale: string): LocaleMessageHost & {
  set_locale_calls: string[];
  set_message_calls: Array<{ locale: string; messages: Record<string, unknown> }>;
} {
  const state = {
    locale: initial_locale,
    available: new Set([initial_locale]),
  };
  const set_locale_calls: string[] = [];
  const set_message_calls: Array<{ locale: string; messages: Record<string, unknown> }> = [];

  return {
    set_locale_calls,
    set_message_calls,
    get locale() {
      return {
        get value() {
          return state.locale;
        },
        set value(next: string) {
          state.locale = next;
          set_locale_calls.push(next);
        },
      };
    },
    get availableLocales() {
      return [...state.available];
    },
    setLocaleMessage(locale: string, messages: Record<string, unknown>) {
      state.available.add(locale);
      set_message_calls.push({ locale, messages });
    },
  };
}

describe("load_locale", () => {
  it("applies English immediately without invoking any loader", async () => {
    const host = create_fake_host("en");

    const outcome = await load_locale(host, "en", {});

    expect(outcome).toEqual({ locale: "en" });
    expect(host.set_locale_calls).toEqual(["en"]);
    expect(host.set_message_calls).toEqual([]);
  });

  it("lazy-loads Simplified Chinese messages and activates the locale", async () => {
    const host = create_fake_host("en");
    const zh_messages = { app: { name: "酒馆画布" } };

    const outcome = await load_locale(host, "zh-CN", {
      "zh-CN": async () => zh_messages,
    });

    expect(outcome).toEqual({ locale: "zh-CN" });
    expect(host.set_message_calls).toEqual([{ locale: "zh-CN", messages: zh_messages }]);
    expect(host.set_locale_calls).toEqual(["zh-CN"]);
  });

  it("does not re-invoke the loader once a locale is already available", async () => {
    const host = create_fake_host("en");
    let load_count = 0;
    const loaders = {
      "zh-CN": async () => {
        load_count += 1;
        return { app: { name: "酒馆画布" } };
      },
    };

    await load_locale(host, "zh-CN", loaders);
    await load_locale(host, "zh-CN", loaders);

    expect(load_count).toBe(1);
  });

  it("falls back to English and reports locale_load_failed when the chunk loader rejects", async () => {
    const host = create_fake_host("en");

    const outcome = await load_locale(host, "zh-CN", {
      "zh-CN": async () => {
        throw new Error("chunk fetch failed");
      },
    });

    expect(outcome).toEqual({ locale: "en", error_code: LOCALE_LOAD_FAILED_CODE });
    expect(host.set_locale_calls.at(-1)).toBe("en");
  });

  it("falls back to English and reports locale_load_failed when no loader is registered", async () => {
    const host = create_fake_host("en");

    const outcome = await load_locale(host, "zh-CN", {});

    expect(outcome).toEqual({ locale: "en", error_code: LOCALE_LOAD_FAILED_CODE });
  });
});
