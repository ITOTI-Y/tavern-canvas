import { cp, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Stage 05 Task 6: stages the already-built 500,000-record benchmark
// package (output/benchmark/package, produced by
// `vocabulary-builder build-package`) into the harness's Vite `publicDir`
// at the exact relative offset production expects: the bundled Worker
// lands at `workers/*.js` (vite.config.ts's worker.rolldownOptions.output),
// and vocabulary_worker.ts's resolve_bundled_baseline_base_url resolves the
// package one directory up, at `vocabulary/baseline/`. Runs before every
// `vite build` invocation (see playwright.config.ts's webServer.command) --
// idempotent, always starts from a clean copy so a stale prior run can
// never leak into a fresh benchmark.

const HARNESS_ROOT = resolve(fileURLToPath(import.meta.url), "..");
const REPO_ROOT = resolve(HARNESS_ROOT, "../..");
const SOURCE_PACKAGE_DIRECTORY = resolve(REPO_ROOT, "output/benchmark/package");
const PUBLIC_DIRECTORY = resolve(HARNESS_ROOT, ".benchmark_public");
const DESTINATION_DIRECTORY = resolve(PUBLIC_DIRECTORY, "vocabulary/baseline");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(SOURCE_PACKAGE_DIRECTORY))) {
    throw new Error(
      `Benchmark package not found at ${SOURCE_PACKAGE_DIRECTORY}. Run ` +
        `"pnpm prepare:e2e" first.`,
    );
  }
  await rm(PUBLIC_DIRECTORY, { recursive: true, force: true });
  await cp(SOURCE_PACKAGE_DIRECTORY, DESTINATION_DIRECTORY, { recursive: true });
  console.log(
    `prepare_benchmark_site: staged ${SOURCE_PACKAGE_DIRECTORY} -> ${DESTINATION_DIRECTORY}`,
  );
}

await main();
