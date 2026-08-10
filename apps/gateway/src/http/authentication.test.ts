// @vitest-environment node

import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { create_bearer_token_hash_store } from "./authentication.js";

const BASE_HASH = "a".repeat(64);
const FIRST_FILE_HASH = "b".repeat(64);
const SECOND_FILE_HASH = "c".repeat(64);

const temporary_directories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporary_directories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("bearer token hash file reload", () => {
  it("loads the file at startup, atomically applies valid reloads, and keeps the old set on failure", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-token-"));
    temporary_directories.push(directory);
    const file_path = path.join(directory, "hashes");
    await writeFile(file_path, `${FIRST_FILE_HASH}\n`, "utf8");

    const store = create_bearer_token_hash_store({
      token_hashes: [BASE_HASH],
      token_hash_file: file_path,
    });
    expect(store.token_hashes).toEqual([BASE_HASH, FIRST_FILE_HASH]);

    await writeFile(file_path, `${SECOND_FILE_HASH}\n`, "utf8");
    expect(store.reload()).toBe(true);
    expect(store.token_hashes).toEqual([BASE_HASH, SECOND_FILE_HASH]);

    await writeFile(file_path, "not-a-sha256-hash\n", "utf8");
    expect(store.reload()).toBe(false);
    expect(store.token_hashes).toEqual([BASE_HASH, SECOND_FILE_HASH]);
  });
});
