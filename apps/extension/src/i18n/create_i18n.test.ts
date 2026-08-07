import { describe, expect, it } from "vitest";

import { create_i18n, format_byte_size } from "./create_i18n.js";

describe("create_i18n", () => {
  it("starts on English with the bundled fallback messages available", () => {
    const { i18n } = create_i18n();

    expect(i18n.global.locale.value).toBe("en");
    expect(i18n.global.t("app.name")).toBe("TavernCanvas");
  });

  it("lazy-loads the Simplified Chinese chunk and activates it", async () => {
    const { i18n, apply_locale } = create_i18n();

    const outcome = await apply_locale("zh-CN", "en-US");

    expect(outcome).toEqual({ locale: "zh-CN" });
    expect(i18n.global.locale.value).toBe("zh-CN");
    expect(i18n.global.t("app.name")).toBe("智绘姬");
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

    expect(i18n.global.t("workbench.active_jobs.active_count", { n: 1 }, 1)).toBe("1 job running");
    expect(i18n.global.t("workbench.active_jobs.active_count", { n: 3 }, 3)).toBe("3 jobs running");

    await apply_locale("zh-CN", "en-US");

    expect(i18n.global.t("workbench.active_jobs.active_count", { n: 3 }, 3)).toBe(
      "3 个任务正在运行",
    );
  });
});

describe("format_byte_size", () => {
  it.each([
    [0, "en", "0 bytes"],
    [512, "en", "512 bytes"],
    [1500, "en", "1.5 kilobytes"],
    [2_500_000, "en", "2.5 megabytes"],
  ] as const)("formats %d bytes for %s as %s", (byte_count, locale, expected) => {
    expect(format_byte_size(byte_count, locale)).toBe(expected);
  });

  it("formats using Simplified Chinese unit words", () => {
    expect(format_byte_size(1500, "zh-CN")).toBe("1.5千字节");
  });
});
