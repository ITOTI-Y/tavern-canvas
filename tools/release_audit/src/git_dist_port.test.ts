import { execFileSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { create_git_dist_port } from "./index.js";

/** Builds a repository shaped like the released one: a clean orphan `main` plus a local-only branch carrying the abandoned v2 monolith. */
let repository_root: string;

function git(...args: readonly string[]): string {
  return execFileSync("git", args, { cwd: repository_root, encoding: "utf8" });
}

beforeAll(async () => {
  repository_root = await mkdtemp(join(tmpdir(), "tavern-canvas-git-port-"));
  git("init", "--initial-branch=main", "--quiet");
  git("config", "user.email", "release@example.invalid");
  git("config", "user.name", "Release Test");
  git("config", "commit.gpgsign", "false");

  await writeFile(join(repository_root, "manifest.json"), "{}\n");
  git("add", "manifest.json");
  git("commit", "--quiet", "-m", "chore: first-party root");

  git("checkout", "--quiet", "--orphan", "legacy");
  git("rm", "--quiet", "-rf", ".");
  await writeFile(join(repository_root, "index.js"), "// v2 monolith\n");
  await writeFile(join(repository_root, "vendor.tar.gz"), "not really an archive\n");
  git("add", "index.js", "vendor.tar.gz");
  git("commit", "--quiet", "-m", "chore: legacy import");
  git("checkout", "--quiet", "main");
});

afterAll(async () => {
  await rm(repository_root, { recursive: true, force: true });
});

describe("create_git_dist_port history scope", () => {
  it("reads only the released ref's ancestry, so a local-only legacy branch is invisible", () => {
    expect([...create_git_dist_port(repository_root).historical_paths()]).toEqual([
      "manifest.json",
    ]);
  });

  it("reads the ancestry of an explicitly named ref", () => {
    expect([...create_git_dist_port(repository_root, "legacy").historical_paths()].sort()).toEqual([
      "index.js",
      "vendor.tar.gz",
    ]);
  });

  it("confirms the two branches share no common ancestor", () => {
    expect(() => git("merge-base", "--is-ancestor", "legacy", "main")).toThrow();
    expect(git("rev-list", "--max-parents=0", "main").trim().split("\n")).toHaveLength(1);
  });
});
