import { describe, expect, it } from "vitest";

import { create_i18n, format_byte_size } from "./create_i18n.js";

describe("create_i18n", () => {
  it("starts on English with the bundled fallback messages available", () => {
    const { i18n } = create_i18n();

    expect(i18n.global.locale.value).toBe("en");
    expect(i18n.global.t("app.name")).toBe("Inkwell");
  });

  it("lazy-loads the Simplified Chinese chunk and activates it", async () => {
    const { i18n, apply_locale } = create_i18n();

    const outcome = await apply_locale("zh-CN", "en-US");

    expect(outcome).toEqual({ locale: "zh-CN" });
    expect(i18n.global.locale.value).toBe("zh-CN");
    expect(i18n.global.t("app.name")).toBe("Inkwell");
  });

  it("follows the host locale when the preference is auto", async () => {
    const { i18n, apply_locale } = create_i18n();

    const outcome = await apply_locale("auto", "zh-Hans");

    expect(outcome).toEqual({ locale: "zh-CN" });
    expect(i18n.global.locale.value).toBe("zh-CN");
  });

  it("lets an explicit override win over the host locale", async () => {
    const { i18n, apply_locale } = create_i18n();

    const outcome = await apply_locale("en", "zh-CN");

    expect(outcome).toEqual({ locale: "en" });
    expect(i18n.global.locale.value).toBe("en");
  });

  it("renders a real plural message through the loaded locale", async () => {
    const { i18n, apply_locale } = create_i18n();

    expect(i18n.global.t("nav.task_strip_count", { n: 1 }, 1)).toBe("1 task");
    expect(i18n.global.t("nav.task_strip_count", { n: 3 }, 3)).toBe("3 tasks");

    await apply_locale("zh-CN", "en-US");

    expect(i18n.global.t("nav.task_strip_count", { n: 3 }, 3)).toBe("3 个任务");
  });
});

describe("format_byte_size", () => {
  it.each([
    [0, "en", "0 B"],
    [512, "en", "512 B"],
    [1500, "en", "1.5 KB"],
    [2_500_000, "en", "2.5 MB"],
  ] as const)("formats %d bytes for %s as %s", (byte_count, locale, expected) => {
    expect(format_byte_size(byte_count, locale)).toBe(expected);
  });

  it("uses the same unit symbols in Simplified Chinese", () => {
    expect(format_byte_size(51_400_000, "zh-CN")).toBe("51.4 MB");
  });
});
