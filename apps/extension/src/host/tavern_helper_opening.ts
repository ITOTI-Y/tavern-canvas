import type {
  OpeningBookEntry,
  OpeningCharacter,
  OpeningEntryChanges,
  OpeningEntryInput,
  OpeningHost,
} from "../modules/opening/opening_host.js";

type RawEntry = Record<string, unknown>;

/** The JS-Slash-Runner methods the opening page needs, checked one by one before use. */
interface OpeningHelperSurface {
  getWorldbookNames(): unknown;
  getWorldbook(name: string): Promise<unknown>;
  createWorldbook(name: string, entries?: readonly RawEntry[]): Promise<boolean>;
  replaceWorldbook(name: string, entries: readonly RawEntry[]): Promise<void>;
  deleteWorldbook(name: string): Promise<boolean>;
  getChatWorldbookName(chat: "current"): unknown;
  rebindChatWorldbook(chat: "current", name: string): Promise<void>;
  getPresetNames(): unknown;
  getProxyPresetNames(): unknown;
  createChatMessages(
    messages: readonly { role: "assistant"; name: string; message: string }[],
    options: { refresh: "affected" },
  ): Promise<void>;
}

const REQUIRED_METHODS = [
  "getWorldbookNames",
  "getWorldbook",
  "createWorldbook",
  "replaceWorldbook",
  "deleteWorldbook",
  "getChatWorldbookName",
  "rebindChatWorldbook",
  "getPresetNames",
  "getProxyPresetNames",
  "createChatMessages",
] as const;

export class OpeningHostUnavailableError extends Error {
  readonly code = "opening_host_unavailable";

  constructor(missing: readonly string[]) {
    super(`JS-Slash-Runner lacks ${missing.join(", ")}`);
    this.name = "OpeningHostUnavailableError";
  }
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function string_list(value: unknown, what: string): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`TavernHelper returned invalid ${what}`);
  }
  return value;
}

function key_text(key: unknown): string {
  if (typeof key === "string") {
    return key;
  }
  if (key instanceof RegExp) {
    return `/${key.source}/${key.flags}`;
  }
  throw new Error("TavernHelper returned an invalid world info key");
}

const REGEX_KEY = /^\/(.+)\/([dgimsuvy]*)$/u;

/** A key typed as `/source/flags` becomes a regex again, so editing keeps regex keys working. */
function key_value(text: string): string | RegExp {
  const match = REGEX_KEY.exec(text);
  if (match?.[1] === undefined) {
    return text;
  }
  try {
    return new RegExp(match[1], match[2]);
  } catch {
    return text;
  }
}

function to_entry(raw: unknown): OpeningBookEntry {
  if (!is_record(raw) || !is_record(raw.strategy) || !is_record(raw.position)) {
    throw new Error("TavernHelper returned an invalid world info entry");
  }
  const { uid, name, enabled, content } = raw;
  const { type, keys } = raw.strategy;
  const { order } = raw.position;
  if (
    typeof uid !== "number" ||
    typeof name !== "string" ||
    typeof enabled !== "boolean" ||
    typeof content !== "string" ||
    typeof type !== "string" ||
    !Array.isArray(keys) ||
    typeof order !== "number"
  ) {
    throw new Error("TavernHelper returned an invalid world info entry");
  }
  return {
    uid,
    name,
    enabled,
    constant: type === "constant",
    keys: keys.map(key_text),
    content,
    order,
  };
}

function apply_input(raw: RawEntry, input: OpeningEntryInput): RawEntry {
  const strategy = is_record(raw.strategy) ? raw.strategy : {};
  const position = is_record(raw.position) ? raw.position : {};
  return {
    ...raw,
    name: input.name,
    enabled: input.enabled,
    content: input.content,
    strategy: {
      ...strategy,
      type: input.constant ? "constant" : "selective",
      keys: input.keys.map(key_value),
    },
    position: { ...position, order: input.order },
  };
}

function helper_surface(globals: unknown): OpeningHelperSurface {
  const helper = is_record(globals) ? globals.TavernHelper : undefined;
  const missing = REQUIRED_METHODS.filter(
    (method) => !is_record(helper) || typeof helper[method] !== "function",
  );
  if (missing.length > 0) {
    throw new OpeningHostUnavailableError(missing);
  }
  return helper as OpeningHelperSurface;
}

function text_of(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function sillytavern_context(globals: unknown): Record<string, unknown> | null {
  const context = is_record(globals) ? globals.SillyTavern : undefined;
  const get_context = is_record(context) ? context.getContext : undefined;
  if (typeof get_context !== "function") {
    return null;
  }
  const value = (get_context as () => unknown)();
  return is_record(value) ? value : null;
}

function character_worldbooks(helper: unknown): string[] {
  const read = is_record(helper) ? helper.getCharWorldbookNames : undefined;
  if (typeof read !== "function") {
    return [];
  }
  try {
    const books = (read as (character: "current") => unknown)("current");
    if (!is_record(books)) {
      return [];
    }
    const additional: unknown[] = Array.isArray(books.additional) ? books.additional : [];
    return [books.primary, ...additional].filter(
      (name): name is string => typeof name === "string" && name !== "",
    );
  } catch {
    return [];
  }
}

export function create_opening_host(globals: unknown): OpeningHost {
  const helper = helper_surface(globals);

  async function raw_entries(book: string): Promise<RawEntry[]> {
    const entries = await helper.getWorldbook(book);
    if (!Array.isArray(entries) || !entries.every(is_record)) {
      throw new Error(`TavernHelper returned invalid entries for world book ${book}`);
    }
    return entries;
  }

  /** JS-Slash-Runner throws when no chat is open. */
  function chat_worldbook(): string | null {
    try {
      const name = helper.getChatWorldbookName("current");
      return typeof name === "string" && name !== "" ? name : null;
    } catch {
      return null;
    }
  }

  return {
    list_worldbooks: () => string_list(helper.getWorldbookNames(), "world book names"),
    async read_entries(book) {
      return (await raw_entries(book)).map(to_entry);
    },
    async create_worldbook(name) {
      if (!(await helper.createWorldbook(name, []))) {
        throw new Error(`A world book named ${name} already exists`);
      }
    },
    async save_entries(book: string, changes: OpeningEntryChanges) {
      const removed = new Set(changes.remove);
      const updates = new Map(
        changes.upsert.flatMap((input) => (input.uid === undefined ? [] : [[input.uid, input]])),
      );
      const kept = (await raw_entries(book))
        .filter((raw) => typeof raw.uid !== "number" || !removed.has(raw.uid))
        .map((raw) => {
          const input = typeof raw.uid === "number" ? updates.get(raw.uid) : undefined;
          return input === undefined ? raw : apply_input(raw, input);
        });
      const added = changes.upsert
        .filter((input) => input.uid === undefined)
        .map((input) => apply_input({}, input));
      await helper.replaceWorldbook(book, [...kept, ...added]);
    },
    async delete_worldbook(name) {
      await helper.deleteWorldbook(name);
    },
    async rename_worldbook(from, to) {
      const entries = await raw_entries(from);
      if (!(await helper.createWorldbook(to, entries))) {
        throw new Error(`A world book named ${to} already exists`);
      }
      if (chat_worldbook() === from) {
        await helper.rebindChatWorldbook("current", to);
      }
      await helper.deleteWorldbook(from);
    },
    chat_name() {
      const chat_id = sillytavern_context(globals)?.chatId;
      return typeof chat_id === "string" && chat_id !== "" ? chat_id : null;
    },
    character(): OpeningCharacter | null {
      const context = sillytavern_context(globals);
      const characters = context?.characters;
      const id = context?.characterId;
      const card: unknown =
        Array.isArray(characters) && (typeof id === "number" || typeof id === "string")
          ? characters[Number(id)]
          : undefined;
      const data = is_record(card) && is_record(card.data) ? card.data : null;
      const name = is_record(card) ? text_of(card.name) : "";
      if (data === null || name === "") {
        return null;
      }
      return {
        name,
        description: text_of(data.description),
        personality: text_of(data.personality),
        scenario: text_of(data.scenario),
        first_message: text_of(data.first_mes),
        worldbooks: character_worldbooks(is_record(globals) ? globals.TavernHelper : undefined),
      };
    },
    chat_worldbook,
    async bind_chat_worldbook(name) {
      await helper.rebindChatWorldbook("current", name);
    },
    preset_names: () => string_list(helper.getPresetNames(), "preset names"),
    proxy_preset_names: () => string_list(helper.getProxyPresetNames(), "proxy preset names"),
    async append_character_message(speaker, text) {
      await helper.createChatMessages([{ role: "assistant", name: speaker, message: text }], {
        refresh: "affected",
      });
    },
  };
}
