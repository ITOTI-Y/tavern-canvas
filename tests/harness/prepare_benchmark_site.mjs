import { cp, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Stages the built benchmark package at vocabulary/baseline/, one directory above the bundled
// Worker's workers/*.js, the offset production expects. Always starts from a clean copy.

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
