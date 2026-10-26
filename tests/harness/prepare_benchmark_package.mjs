import { mkdir, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPOSITORY_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const BENCHMARK_DIRECTORY = resolve(REPOSITORY_ROOT, "output/benchmark");
const RAW_VOCABULARY_PATH = resolve(BENCHMARK_DIRECTORY, "raw_vocabulary_500k.jsonl");
const KNOWN_QUERIES_PATH = resolve(BENCHMARK_DIRECTORY, "known_queries.json");
const PACKAGE_DIRECTORY = resolve(BENCHMARK_DIRECTORY, "package");
const VOCABULARY_BUILDER = "@tavern-canvas/vocabulary-builder";

const BENCHMARK_RECORDS = 500_000;
const BENCHMARK_SEED = 20260804;
const BENCHMARK_PACKAGE_ID = "benchmark";
const BENCHMARK_DATA_VERSION = "1.0.0";
const BENCHMARK_MINIMUM_EXTENSION_VERSION = "3.0.0";
const BENCHMARK_CHANGELOG = "benchmark";

// Under `pnpm prepare:e2e`, npm_execpath is pnpm's JS entry. Running it through Node avoids
// spawning pnpm.cmd, which Node refuses on Windows without a shell.
const PNPM_ENTRY = process.env.npm_execpath;

function run_pnpm(command, args) {
  const pnpm_args = ["--filter", VOCABULARY_BUILDER, command, ...args];
  const [executable, executable_args] =
    PNPM_ENTRY === undefined ? ["pnpm", pnpm_args] : [process.execPath, [PNPM_ENTRY, ...pnpm_args]];
  return new Promise((resolve_promise, reject) => {
    const child = spawn(executable, executable_args, {
      cwd: REPOSITORY_ROOT,
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        resolve_promise();
        return;
      }
      const reason = signal === null ? `exit code ${String(code)}` : `signal ${signal}`;
      reject(new Error(`${command} failed with ${reason}`));
    });
  });
}

async function main() {
  await rm(BENCHMARK_DIRECTORY, { recursive: true, force: true });
  await mkdir(BENCHMARK_DIRECTORY, { recursive: true });

  await run_pnpm("generate-benchmark", [
    "--records",
    String(BENCHMARK_RECORDS),
    "--seed",
    String(BENCHMARK_SEED),
    "--output",
    RAW_VOCABULARY_PATH,
    "--queries-output",
    KNOWN_QUERIES_PATH,
  ]);
  await run_pnpm("build-package", [
    "--input",
    RAW_VOCABULARY_PATH,
    "--output",
    PACKAGE_DIRECTORY,
    "--package-id",
    BENCHMARK_PACKAGE_ID,
    "--data-version",
    BENCHMARK_DATA_VERSION,
    "--minimum-extension-version",
    BENCHMARK_MINIMUM_EXTENSION_VERSION,
    "--changelog",
    BENCHMARK_CHANGELOG,
  ]);
}

await main();
