import { describe, expect, it } from "vitest";

import {
  classify_forbidden_modules,
  collect_initial_assets,
  evaluate_budget,
  format_finding,
  INITIAL_CSS_GZIP_LIMIT_BYTES,
  INITIAL_JS_GZIP_LIMIT_BYTES,
  type ViteManifest,
} from "./index.js";

const SPLIT_MANIFEST: ViteManifest = {
  "apps/extension/src/index.ts": {
    file: "index.js",
    isEntry: true,
    imports: ["_shared-Aaa.js"],
    dynamicImports: ["apps/extension/src/ui/studio/StudioView.vue"],
    css: ["index.css"],
  },
  "_shared-Aaa.js": {
    file: "chunks/shared-Aaa.js",
    css: ["chunks/shared-Aaa.css"],
  },
  "apps/extension/src/ui/studio/StudioView.vue": {
    file: "chunks/StudioView-Bbb.js",
    isDynamicEntry: true,
    imports: ["_studio_only-Ccc.js"],
    css: ["chunks/StudioView-Bbb.css"],
  },
  "_studio_only-Ccc.js": {
    file: "chunks/studio_only-Ccc.js",
  },
};

function sourcemap_for(sources: readonly string[]): ReadonlyMap<string, readonly string[]> {
  return new Map<string, readonly string[]>([["index.js", sources]]);
}

const HOST_DECLARED_FILES = ["index.js", "index.css"];

describe("collect_initial_assets", () => {
  it("collects the entry chunk and its static import chain", () => {
    expect(collect_initial_assets(SPLIT_MANIFEST, []).js_files).toStrictEqual([
      "chunks/shared-Aaa.js",
      "index.js",
    ]);
  });

  it("does not collect a dynamically imported chunk or its own transitive imports", () => {
    const js_files = collect_initial_assets(SPLIT_MANIFEST, HOST_DECLARED_FILES).js_files;
    expect(js_files).not.toContain("chunks/StudioView-Bbb.js");
    expect(js_files).not.toContain("chunks/studio_only-Ccc.js");
  });

  it("collects the css of every reached chunk and none of the dynamic ones", () => {
    expect(collect_initial_assets(SPLIT_MANIFEST, []).css_files).toStrictEqual([
      "chunks/shared-Aaa.css",
      "index.css",
    ]);
  });

  it("counts host-declared css the vite graph never links", () => {
    const manifest: ViteManifest = {
      "apps/extension/src/index.ts": { file: "index.js", isEntry: true },
      "style.css": { file: "index.css", src: "style.css" },
    };
    expect(collect_initial_assets(manifest, HOST_DECLARED_FILES)).toStrictEqual({
      js_files: ["index.js"],
      css_files: ["index.css"],
    });
  });

  it("counts a file declared by both the host manifest and the vite graph once", () => {
    expect(collect_initial_assets(SPLIT_MANIFEST, HOST_DECLARED_FILES)).toStrictEqual({
      js_files: ["chunks/shared-Aaa.js", "index.js"],
      css_files: ["chunks/shared-Aaa.css", "index.css"],
    });
  });

  it("counts a css-only manifest entry against the css budget", () => {
    const manifest: ViteManifest = {
      "style.css": { file: "index.css", src: "style.css", isEntry: true },
    };
    expect(collect_initial_assets(manifest, [])).toStrictEqual({
      js_files: [],
      css_files: ["index.css"],
    });
  });
});

describe("evaluate_budget", () => {
  it("reports the exact measured byte count when js is over budget", () => {
    const findings = evaluate_budget({
      initial_js_gzip_bytes: 403456,
      initial_css_gzip_bytes: 0,
    });
    expect(findings).toHaveLength(1);
    expect(findings[0]?.rule_id).toBe("js-budget");
    expect(findings[0]?.path).toBe("initial_js_gzip_bytes");
    expect(findings[0]?.detail).toContain("403456");
    expect(findings[0]?.detail).toContain(String(403456 - INITIAL_JS_GZIP_LIMIT_BYTES));
  });

  it("passes js exactly at the limit", () => {
    expect(
      evaluate_budget({
        initial_js_gzip_bytes: INITIAL_JS_GZIP_LIMIT_BYTES,
        initial_css_gzip_bytes: 0,
      }),
    ).toStrictEqual([]);
  });

  it("reports the exact measured byte count when css is over budget", () => {
    const findings = evaluate_budget({
      initial_js_gzip_bytes: 0,
      initial_css_gzip_bytes: 51200,
    });
    expect(findings).toHaveLength(1);
    expect(findings[0]?.rule_id).toBe("css-budget");
    expect(findings[0]?.path).toBe("initial_css_gzip_bytes");
    expect(findings[0]?.detail).toContain("51200");
  });

  it("passes css exactly at the limit", () => {
    expect(
      evaluate_budget({
        initial_js_gzip_bytes: 0,
        initial_css_gzip_bytes: INITIAL_CSS_GZIP_LIMIT_BYTES,
      }),
    ).toStrictEqual([]);
  });
});

describe("classify_forbidden_modules", () => {
  it.each([
    ["tokenizer", "../../apps/extension/src/modules/novelai/tokenizer/tokenizer_service.ts"],
    ["tokenizer", "../../node_modules/@huggingface/transformers/dist/transformers.js"],
    ["assistant", "../../apps/extension/src/modules/assistant/assistant_module.ts"],
    ["assistant", "../../apps/extension/src/ui/assistant/AssistantPanel.vue"],
    ["gallery-detail", "../../apps/extension/src/ui/views/gallery/ImagePreviewDialog.vue"],
    ["gallery-detail", "../../apps/extension/src/ui/views/gallery/ImageMetadataInspector.vue"],
    ["vocabulary-worker", "../../apps/extension/src/workers/vocabulary_worker.ts"],
    ["non-default-locale", "../../apps/extension/src/i18n/locales/zh_cn.ts"],
  ])("detects %s from %s", (forbidden_id, source) => {
    const findings = classify_forbidden_modules(["index.js"], sourcemap_for([source]));
    expect(findings).toStrictEqual([
      { rule_id: "forbidden-module", path: "index.js", detail: `${forbidden_id}: ${source}` },
    ]);
  });

  it("reports nothing for a clean initial chunk, gallery list surfaces included", () => {
    const findings = classify_forbidden_modules(
      ["index.js"],
      sourcemap_for([
        "../../apps/extension/src/index.ts",
        "../../apps/extension/src/ui/views/gallery/GalleryView.vue",
        "../../apps/extension/src/ui/views/gallery/ImageGrid.vue",
        "../../apps/extension/src/ui/views/gallery/GalleryTile.vue",
        "../../apps/extension/src/ui/views/gallery/BulkActionBar.vue",
        "../../packages/core/src/index.ts",
      ]),
    );
    expect(findings).toStrictEqual([]);
  });

  it("allows the bundled default locale but not zh_cn", () => {
    expect(
      classify_forbidden_modules(
        ["index.js"],
        sourcemap_for(["../../apps/extension/src/i18n/locales/en.ts"]),
      ),
    ).toStrictEqual([]);
    expect(
      classify_forbidden_modules(
        ["index.js"],
        sourcemap_for([
          "../../apps/extension/src/i18n/locales/en.ts",
          "../../apps/extension/src/i18n/locales/zh_cn.ts",
        ]),
      ).map((finding) => finding.detail),
    ).toStrictEqual(["non-default-locale: ../../apps/extension/src/i18n/locales/zh_cn.ts"]);
  });

  it("reports one finding per chunk and rule even when many sources match", () => {
    const findings = classify_forbidden_modules(
      ["index.js"],
      sourcemap_for([
        "../../apps/extension/src/modules/assistant/assistant_module.ts",
        "../../apps/extension/src/modules/assistant/assistant_session.ts",
        "../../apps/extension/src/ui/assistant/AssistantPanel.vue",
      ]),
    );
    expect(findings).toHaveLength(1);
  });

  it("fails hard when an initial chunk has no sourcemap", () => {
    const findings = classify_forbidden_modules(
      ["index.js", "chunks/shared-Aaa.js"],
      sourcemap_for([]),
    );
    expect(findings).toStrictEqual([
      {
        rule_id: "missing-sourcemap",
        path: "chunks/shared-Aaa.js",
        detail: "initial chunk has no sourcemap, so the modules inside it cannot be audited",
      },
    ]);
  });
});

describe("format_finding", () => {
  it("renders path, rule id, and detail", () => {
    expect(
      format_finding({
        rule_id: "js-budget",
        path: "initial_js_gzip_bytes",
        detail: "403456 gzip bytes exceeds the 184320 byte budget by 219136",
      }),
    ).toBe(
      "initial_js_gzip_bytes [js-budget] 403456 gzip bytes exceeds the 184320 byte budget by 219136",
    );
  });
});
