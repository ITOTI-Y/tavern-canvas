import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  check_locales,
  check_usage,
  compare_locales,
  format_finding,
  type LocaleFinding,
  type SourceFile,
} from "./index.js";

function rule_ids(findings: readonly LocaleFinding[]): string[] {
  return findings.map((finding) => finding.rule_id);
}

describe("compare_locales", () => {
  it("reports no findings for a fully matched locale pair", () => {
    const en = { app: { name: "TavernCanvas" }, nav: { workbench: "Workbench" } };
    const zh = { app: { name: "智绘姬" }, nav: { workbench: "工作台" } };

    expect(compare_locales(en, zh)).toEqual([]);
  });

  it("reports key-set-mismatch for a key missing in zh-CN", () => {
    const en = { app: { name: "TavernCanvas", tagline: "Bilingual workbench" } };
    const zh = { app: { name: "智绘姬" } };

    const findings = compare_locales(en, zh);

    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({ rule_id: "key-set-mismatch", path: "app.tagline" });
  });

  it("reports key-set-mismatch for a key only present in zh-CN", () => {
    const en = { app: { name: "TavernCanvas" } };
    const zh = { app: { name: "智绘姬", extra: "多余" } };

    const findings = compare_locales(en, zh);

    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({ rule_id: "key-set-mismatch", path: "app.extra" });
  });

  it("reports value-type-mismatch when the same path is a string in one locale and an object in the other", () => {
    const en = { app: { name: "TavernCanvas" } };
    const zh = { app: { name: { nested: "错误结构" } } };

    const findings = compare_locales(en, zh);

    expect(rule_ids(findings)).toContain("value-type-mismatch");
    expect(findings.find((f) => f.rule_id === "value-type-mismatch")).toMatchObject({
      path: "app.name",
    });
  });

  it("reports interpolation-mismatch when named parameters differ between locales", () => {
    const en = { app: { version_label: "Version {version}" } };
    const zh = { app: { version_label: "版本 {ver}" } };

    const findings = compare_locales(en, zh);

    expect(rule_ids(findings)).toContain("interpolation-mismatch");
    expect(findings.find((f) => f.rule_id === "interpolation-mismatch")).toMatchObject({
      path: "app.version_label",
    });
  });

  it("reports plural-variant-mismatch when variant counts differ between locales", () => {
    const en = { workbench: { active_count: "{n} job running | {n} jobs running" } };
    const zh = { workbench: { active_count: "{n} 个任务正在运行" } };

    const findings = compare_locales(en, zh);

    expect(rule_ids(findings)).toContain("plural-variant-mismatch");
    expect(findings.find((f) => f.rule_id === "plural-variant-mismatch")).toMatchObject({
      path: "workbench.active_count",
    });
  });

  it("reports first-party-emoji for an emoji in a locale value", () => {
    const en = { status: { success: "Success" } };
    const zh = { status: { success: "成功 ✅" } };

    const findings = compare_locales(en, zh);

    expect(rule_ids(findings)).toContain("first-party-emoji");
    expect(findings.find((f) => f.rule_id === "first-party-emoji")).toMatchObject({
      path: "status.success",
    });
  });

  it("reports em-dash-ban for an em dash or en dash in a locale value", () => {
    const en = { app: { tagline: "Fast — reliable workbench" } };
    const zh = { app: { tagline: "快速可靠的工作台" } };

    const findings = compare_locales(en, zh);

    expect(rule_ids(findings)).toContain("em-dash-ban");
    expect(findings.find((f) => f.rule_id === "em-dash-ban")).toMatchObject({
      path: "app.tagline",
    });
  });

  it("reports em-dash-ban for an en dash", () => {
    const en = { app: { tagline: "Plain workbench" } };
    const zh = { app: { tagline: "简单–可靠的工作台" } };

    const findings = compare_locales(en, zh);

    expect(rule_ids(findings)).toContain("em-dash-ban");
  });
});

describe("check_usage", () => {
  const canonical_keys = new Set(["app.name", "app.tagline", "nav.workbench"]);

  it("collects statically referenced keys and reports no unused keys when all are referenced", () => {
    const files: SourceFile[] = [
      {
        path: "apps/extension/src/ui/AppRoot.vue",
        content: [
          '<script setup lang="ts">',
          'const label = t("app.name");',
          "</script>",
          '<template><span>{{ $t("app.tagline") }}</span></template>',
        ].join("\n"),
      },
      {
        path: "apps/extension/src/ui/shell/TopCommandBar.vue",
        content: 'const nav_label = i18n.t("nav.workbench");',
      },
    ];

    const findings = check_usage(files, canonical_keys);

    expect(findings).toEqual([]);
  });

  it("reports unused-key for a canonical key no source file references, once usage exists elsewhere", () => {
    const files: SourceFile[] = [
      {
        path: "apps/extension/src/ui/AppRoot.vue",
        content: 'const label = t("app.name");',
      },
    ];

    const findings = check_usage(files, canonical_keys);

    expect(findings).toHaveLength(2);
    expect(findings.map((f) => f.path).sort()).toEqual(["app.tagline", "nav.workbench"]);
    expect(findings.every((f) => f.rule_id === "unused-key")).toBe(true);
  });

  it("skips unused-key detection entirely when no source file references any translation key yet", () => {
    const files: SourceFile[] = [
      {
        path: "apps/extension/src/ui/AppRoot.vue",
        content: "const nothing_to_see_here = 1;",
      },
    ];

    const findings = check_usage(files, canonical_keys);

    expect(findings).toEqual([]);
  });

  it("reports dynamic-key when a t() call does not use a static string literal", () => {
    const files: SourceFile[] = [
      {
        path: "apps/extension/src/ui/AppRoot.vue",
        content: [
          'const label = t("app.name");',
          "const dynamic_key = someVariable;",
          "const bad = t(dynamic_key);",
        ].join("\n"),
      },
    ];

    const findings = check_usage(files, canonical_keys);

    expect(rule_ids(findings)).toContain("dynamic-key");
    const finding = findings.find((f) => f.rule_id === "dynamic-key");
    expect(finding?.path).toBe("apps/extension/src/ui/AppRoot.vue:3");
  });

  it("reports dynamic-key for a template literal with interpolation", () => {
    const files: SourceFile[] = [
      {
        path: "apps/extension/src/ui/AppRoot.vue",
        content: "const bad = t(`app.${suffix}`);",
      },
    ];

    const findings = check_usage(files, canonical_keys);

    expect(rule_ids(findings)).toContain("dynamic-key");
  });

  it("does not flag unrelated identifiers ending in t( as calls", () => {
    const files: SourceFile[] = [
      {
        path: "apps/extension/src/ui/format.ts",
        content: 'const formatted = format("app.name");',
      },
    ];

    const findings = check_usage(files, canonical_keys);

    expect(findings).toEqual([]);
  });
});

describe("format_finding", () => {
  it("prints the exact path and rule", () => {
    const finding: LocaleFinding = {
      rule_id: "key-set-mismatch",
      path: "app.tagline",
      detail: "present in en but missing in zh-CN",
    };

    expect(format_finding(finding)).toBe(
      "app.tagline [key-set-mismatch] present in en but missing in zh-CN",
    );
  });
});

describe("check_locales", () => {
  let temporary_root: string;

  beforeEach(async () => {
    temporary_root = await mkdtemp(resolve(tmpdir(), "tavern-canvas-locale-check-"));
  });

  afterEach(async () => {
    await rm(temporary_root, { recursive: true, force: true });
  });

  async function write_file(relative_path: string, content: string): Promise<void> {
    const absolute_path = resolve(temporary_root, relative_path);
    await mkdir(dirname(absolute_path), { recursive: true });
    await writeFile(absolute_path, content, "utf8");
  }

  it("loads real locale modules from disk and scans real source files end to end", async () => {
    await write_file(
      "apps/extension/src/i18n/locales/en.ts",
      [
        "export const en_messages = {",
        '  app: { name: "TavernCanvas" },',
        "};",
        "export type LocaleMessageSchema = typeof en_messages;",
      ].join("\n"),
    );
    await write_file(
      "apps/extension/src/i18n/locales/zh_cn.ts",
      [
        'import type { LocaleMessageSchema } from "./en.js";',
        "const zh_cn_messages = {",
        '  app: { name: "智绘姬" },',
        "} satisfies LocaleMessageSchema;",
        "export { zh_cn_messages };",
      ].join("\n"),
    );
    await write_file(
      "apps/extension/src/ui/AppRoot.vue",
      '<script setup lang="ts">\nconst label = t("app.name");\n</script>',
    );

    const findings = await check_locales({ repository_root: temporary_root });

    expect(findings).toEqual([]);
  });

  it("reports a key-set-mismatch discovered from real files on disk", async () => {
    await write_file(
      "apps/extension/src/i18n/locales/en.ts",
      [
        "export const en_messages = {",
        '  app: { name: "TavernCanvas", tagline: "Bilingual workbench" },',
        "};",
        "export type LocaleMessageSchema = typeof en_messages;",
      ].join("\n"),
    );
    await write_file(
      "apps/extension/src/i18n/locales/zh_cn.ts",
      [
        "const zh_cn_messages = {",
        '  app: { name: "智绘姬" },',
        "};",
        "export { zh_cn_messages };",
      ].join("\n"),
    );

    const findings = await check_locales({ repository_root: temporary_root });

    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({ rule_id: "key-set-mismatch", path: "app.tagline" });
  });
});
