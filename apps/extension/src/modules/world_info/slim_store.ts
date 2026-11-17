/**
 * Condensed versions of world book entries, kept in this browser by book name and entry uid with
 * a hash of the original text. A stale hash means the entry changed since, and the original is
 * sent instead. The store is a cache: losing it only brings back the original texts.
 */
export interface SlimEntry {
  readonly hash: string;
  readonly slim: string;
}

const STORAGE_KEY = "tavern_canvas.world_info_slims.v1";

/** Macros whose value changes per scan; such an entry is never condensed. */
const RANDOM_MACRO = /\{\{\s*(?:random|roll|pick)\b/iu;

export function is_slimmable(content: string): boolean {
  return !RANDOM_MACRO.test(content);
}

/** FNV-1a over the text with its length; enough to notice an edited entry. */
export function content_hash(text: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash = Math.imul(hash ^ text.charCodeAt(index), 0x01000193) >>> 0;
  }
  return `${hash.toString(16)}-${String(text.length)}`;
}

type Books = Record<string, Record<string, SlimEntry>>;

function parse_books(raw: string | null): Books {
  try {
    const parsed: unknown = JSON.parse(raw ?? "{}");
    return typeof parsed === "object" && parsed !== null ? (parsed as Books) : {};
  } catch {
    return {};
  }
}

export interface StoredSlim {
  readonly uid: number;
  readonly hash: string;
  readonly slim: string;
}

export interface SlimStore {
  /** The condensed text when one is stored for this exact original. */
  lookup(book: string, uid: number, hash: string): string | null;
  /** The stored entry whatever original it was made from; `null` when there is none. */
  get(book: string, uid: number): SlimEntry | null;
  save(book: string, entries: readonly StoredSlim[]): void;
  /** Removes and returns the stored entry, so it can be saved back. */
  remove(book: string, uid: number): SlimEntry | null;
  /** Stored entries of a book that still match `current` original hashes, by uid. */
  matching(book: string, current: ReadonlyMap<number, string>): ReadonlyMap<number, string>;
}

/**
 * Every instance reads the storage again whenever its text changed, so the studio's edits reach
 * the generation hook's instance at once.
 */
export function create_slim_store(storage: Storage): SlimStore {
  let raw: string | null = null;
  let books: Books = {};
  const current = (): Books => {
    const next = storage.getItem(STORAGE_KEY);
    if (next !== raw) {
      raw = next;
      books = parse_books(next);
    }
    return books;
  };
  const write = (next: Books): void => {
    raw = JSON.stringify(next);
    books = next;
    storage.setItem(STORAGE_KEY, raw);
  };
  return {
    lookup(book, uid, hash) {
      const entry = current()[book]?.[String(uid)];
      return entry !== undefined && entry.hash === hash ? entry.slim : null;
    },
    get(book, uid) {
      return current()[book]?.[String(uid)] ?? null;
    },
    save(book, entries) {
      const all = current();
      const stored = { ...all[book] };
      for (const entry of entries) {
        stored[String(entry.uid)] = { hash: entry.hash, slim: entry.slim };
      }
      write({ ...all, [book]: stored });
    },
    remove(book, uid) {
      const all = current();
      const entry = all[book]?.[String(uid)];
      if (entry === undefined) {
        return null;
      }
      const { [String(uid)]: _removed, ...rest } = all[book] ?? {};
      write({ ...all, [book]: rest });
      return entry;
    },
    matching(book, hashes) {
      const stored = current()[book];
      const result = new Map<number, string>();
      for (const [uid, hash] of hashes) {
        const entry = stored?.[String(uid)];
        if (entry !== undefined && entry.hash === hash) {
          result.set(uid, entry.slim);
        }
      }
      return result;
    },
  };
}
