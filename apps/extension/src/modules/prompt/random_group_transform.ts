export interface RandomGroupSelection<Id extends string> {
  readonly selected_id: Id;
  readonly was_randomized: boolean;
}

function pick_random(keys: readonly string[], random: () => number): string {
  const index = Math.floor(random() * keys.length);
  // Guards `random() === 1` (or an RNG not strictly < 1) from indexing past the end of `keys`.
  return keys[Math.min(index, keys.length - 1)] as string;
}

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

/** Groups with an empty `vibes` array are never eligible. */
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
