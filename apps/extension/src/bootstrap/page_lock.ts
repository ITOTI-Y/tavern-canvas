const PAGE_LOCK_PREFIX = "inkwell:page:";

export interface PageLock {
  /** Whether no other open Inkwell page held its lock when this one was taken. */
  readonly sole_page: boolean;
  release(): void;
}

/** Holds a Web Lock for as long as the page runs, so other pages can tell it is still open. */
export async function hold_page_lock(
  locks: LockManager | undefined,
  page_id: string,
): Promise<PageLock> {
  if (locks === undefined) {
    return { sole_page: true, release: () => {} };
  }
  const name = `${PAGE_LOCK_PREFIX}${page_id}`;
  let release = (): void => {};
  await new Promise<void>((acquired) => {
    void locks.request(
      name,
      () =>
        new Promise<void>((released) => {
          release = released;
          acquired();
        }),
    );
  });
  const { held = [] } = await locks.query();
  return {
    sole_page: !held.some(
      (lock) => lock.name !== name && lock.name?.startsWith(PAGE_LOCK_PREFIX) === true,
    ),
    release,
  };
}
