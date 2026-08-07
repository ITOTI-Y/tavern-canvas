/**
 * The "preset/random group selection" pipeline stage. Ported from legacy `getRandomYusheId` and
 * `getRandomVibeGroupId` (utils/utils.js) -- when the "random preset"/"random Vibe group" toggle is
 * on, replaces the manually selected ID with a uniformly random eligible one for this generation;
 * otherwise the manual selection passes through unchanged. `random` is injectable so callers can
 * seed selection deterministically in tests.
 */

export interface RandomGroupSelection<Id extends string> {
  readonly selected_id: Id;
  readonly was_randomized: boolean;
}

function pick_random(keys: readonly string[], random: () => number): string {
  const index = Math.floor(random() * keys.length);
  // Guards a `random() === 1` edge case (or a caller-supplied RNG that is not strictly < 1) from
  // indexing past the end of `keys`.
  return keys[Math.min(index, keys.length - 1)] as string;
}

/**
 * Selects a random prompt preset ID from `presets` when `enabled`; falls back to `current_id` when
 * disabled or when there are no candidate presets to choose from.
 */
export function select_random_preset<Id extends string>(
  current_id: Id,
  presets: Readonly<Record<string, unknown>>,
  enabled: boolean,
  random: () => number = Math.random,
): RandomGroupSelection<Id> {
  if (!enabled) {
    return { selected_id: current_id, was_randomized: false };
  }
  const keys = Object.keys(presets);
  if (keys.length === 0) {
    return { selected_id: current_id, was_randomized: false };
  }
  return { selected_id: pick_random(keys, random) as Id, was_randomized: true };
}

export interface VibeGroupCandidate {
  readonly vibes: readonly unknown[];
}

/**
 * Selects a random non-empty Vibe group ID from `vibe_groups` when `enabled`; groups with an empty
 * `vibes` array are never eligible, matching the legacy "回退到当前选中的组" fallback when no
 * non-empty group exists.
 */
export function select_random_vibe_group<Id extends string>(
  current_id: Id,
  vibe_groups: Readonly<Record<string, VibeGroupCandidate>>,
  enabled: boolean,
  random: () => number = Math.random,
): RandomGroupSelection<Id> {
  if (!enabled) {
    return { selected_id: current_id, was_randomized: false };
  }
  const keys = Object.keys(vibe_groups).filter((key) => (vibe_groups[key]?.vibes.length ?? 0) > 0);
  if (keys.length === 0) {
    return { selected_id: current_id, was_randomized: false };
  }
  return { selected_id: pick_random(keys, random) as Id, was_randomized: true };
}
