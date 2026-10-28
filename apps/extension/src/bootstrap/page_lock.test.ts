import { describe, expect, it } from "vitest";

import { hold_page_lock } from "./page_lock.js";

function fake_locks(other_pages: readonly string[]): LockManager & { readonly held: string[] } {
  const held = [...other_pages];
  return {
    held,
    request: ((name: string, callback: () => Promise<void>) => {
      held.push(name);
      return callback().then(() => {
        held.splice(held.indexOf(name), 1);
      });
    }) as unknown as LockManager["request"],
    query: () => Promise.resolve({ held: held.map((name) => ({ name, mode: "exclusive" })) }),
  } as unknown as LockManager & { readonly held: string[] };
}

describe("hold_page_lock", () => {
  it("reports the sole page when no other Inkwell page holds a lock", async () => {
    const locks = fake_locks(["unrelated"]);
    const lock = await hold_page_lock(locks, "a");

    expect(lock.sole_page).toBe(true);
    expect(locks.held).toContain("inkwell:page:a");
  });

  it("reports another open page", async () => {
    const lock = await hold_page_lock(fake_locks(["inkwell:page:b"]), "a");

    expect(lock.sole_page).toBe(false);
  });

  it("releases the lock on request", async () => {
    const locks = fake_locks([]);
    const lock = await hold_page_lock(locks, "a");
    lock.release();
    await Promise.resolve();
    await Promise.resolve();

    expect(locks.held).not.toContain("inkwell:page:a");
  });

  it("treats a host without Web Locks as the sole page", async () => {
    expect((await hold_page_lock(undefined, "a")).sole_page).toBe(true);
  });
});
