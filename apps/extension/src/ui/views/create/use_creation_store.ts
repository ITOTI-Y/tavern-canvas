import type { StripSettings } from "@tavern-canvas/contracts";
import { computed, reactive, type ComputedRef } from "vue";

import { scene_generation_input } from "../../../modules/creation/creation_planning.js";
import {
  creation_payload,
  read_creation,
  type Creation,
} from "../../../modules/creation/creation_record.js";
import type { CreationPort } from "../../contracts/creation_port.js";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";

const EDIT_SAVE_DELAY_MS = 600;

export interface CreationStoreDeps {
  readonly records: () => readonly AssetRecordSummary[];
  readonly save: (record: Omit<AssetRecordSummary, "updated_at">) => Promise<void>;
  readonly remove: (id: string) => Promise<void>;
  readonly strip_settings: () => StripSettings;
  readonly on_save_error: (error: unknown) => void;
}

export interface CreationStore {
  /** Newest first; a creation being edited shows its unsaved state. */
  readonly list: ComputedRef<readonly Creation[]>;
  get(id: string): Creation | null;
  add(creation: Creation): Promise<void>;
  /** Changes a creation in place; text edits are saved after a pause, everything else at once. */
  edit(
    id: string,
    change: (creation: Creation) => void,
    options?: { readonly debounce: boolean },
  ): void;
  remove(id: string): Promise<void>;
  /** Scenes whose picture is being drawn; kept in memory only. */
  readonly pending: ReadonlySet<string>;
  /** Draws the scenes one after another, saving the creation after each picture. */
  generate(port: CreationPort, id: string, scene_ids: readonly string[]): Promise<void>;
}

export function use_creation_store(deps: CreationStoreDeps): CreationStore {
  const working = reactive(new Map<string, Creation>());
  const pending = reactive(new Set<string>());
  const chains = new Map<string, Promise<void>>();
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  const list = computed<readonly Creation[]>(() => {
    const creations = deps
      .records()
      .map((record) => working.get(record.id) ?? read_creation(record))
      .filter((creation): creation is Creation => creation !== null);
    for (const creation of working.values()) {
      if (!creations.some((candidate) => candidate.id === creation.id)) {
        creations.push(creation);
      }
    }
    return creations.sort((a, b) => b.created_at.localeCompare(a.created_at));
  });

  function get(id: string): Creation | null {
    const current = working.get(id);
    if (current !== undefined) {
      return current;
    }
    const record = deps.records().find((candidate) => candidate.id === id);
    const loaded = record === undefined ? null : read_creation(record);
    if (loaded === null) {
      return null;
    }
    working.set(id, loaded);
    return working.get(id) ?? null;
  }

  /** Saves the creation as it stands when its turn comes, so queued saves collapse to the latest. */
  function persist(id: string): Promise<void> {
    const timer = timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timers.delete(id);
    }
    const next = (chains.get(id) ?? Promise.resolve()).then(async () => {
      const creation = working.get(id);
      if (creation === undefined) {
        return;
      }
      const payload = creation_payload(creation);
      await deps.save({
        id,
        category: "creation",
        record_key: id,
        display_name: payload.display_name,
        payload,
      });
    });
    const settled = next.catch(deps.on_save_error);
    chains.set(id, settled);
    return settled;
  }

  async function add(creation: Creation): Promise<void> {
    working.set(creation.id, creation);
    await persist(creation.id);
  }

  function edit(
    id: string,
    change: (creation: Creation) => void,
    options: { readonly debounce: boolean } = { debounce: false },
  ): void {
    const creation = get(id);
    if (creation === null) {
      return;
    }
    change(creation);
    if (!options.debounce) {
      void persist(id);
      return;
    }
    const timer = timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timers.set(
      id,
      setTimeout(() => {
        void persist(id);
      }, EDIT_SAVE_DELAY_MS),
    );
  }

  async function remove(id: string): Promise<void> {
    const timer = timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timers.delete(id);
    }
    await chains.get(id);
    working.delete(id);
    chains.delete(id);
    await deps.remove(id);
  }

  async function generate(
    port: CreationPort,
    id: string,
    scene_ids: readonly string[],
  ): Promise<void> {
    const queued = scene_ids.filter((scene_id) => !pending.has(scene_id));
    for (const scene_id of queued) {
      pending.add(scene_id);
    }
    for (const scene_id of queued) {
      const creation = get(id);
      const scene = creation?.scenes.find((candidate) => candidate.id === scene_id);
      if (creation === null || scene === undefined) {
        pending.delete(scene_id);
        continue;
      }
      const strip =
        creation.kind === "strip"
          ? { settings: deps.strip_settings(), style: creation.style }
          : null;
      let image_id: string | null = null;
      let failure: string | null = null;
      try {
        image_id = await port.generate(scene_generation_input(scene, strip));
      } catch (error) {
        failure = error instanceof Error ? error.message : String(error);
      }
      pending.delete(scene_id);
      edit(id, (current) => {
        const target = current.scenes.find((candidate) => candidate.id === scene_id);
        if (target === undefined) {
          return;
        }
        if (image_id !== null) {
          target.image_ids.push(image_id);
          target.active_image_id = image_id;
        }
        target.last_error = failure;
      });
    }
  }

  return { list, get, add, edit, remove, pending, generate };
}
