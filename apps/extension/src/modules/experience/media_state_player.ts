import { z } from "zod";

/**
 * The floating entry's reaction states (feature_matrix.md's floatingentry.mascot_reaction_videos
 * row: headpat/thinking/talk mirrored onto this fixed five-state set, plus "enter" for the
 * one-shot appearance transition and "dragging" for pointer-drag feedback). Scope note: this
 * module intentionally covers state -> asset resolution only, not the legacy WebGL alpha-channel
 * video mascot renderer, per-pixel hit-testing, Document Picture-in-Picture "desktop pet" mode, or
 * the onboarding video/minigame (task-6-brief.md's Step 1 names exactly the five states below and
 * a Lucide icon fallback; it does not ask for a WebGL compositor). Those richer legacy behaviors
 * remain unported pending explicit scope approval -- see task-6-report.md.
 */
export const MEDIA_STATES = ["idle", "thinking", "talk", "enter", "dragging"] as const;
export type MediaState = (typeof MEDIA_STATES)[number];

const MEDIA_ASSET_KINDS = ["image", "video"] as const;
export type MediaAssetKind = (typeof MEDIA_ASSET_KINDS)[number];

/**
 * Runtime media assets are already-validated local object/data URIs, never a remote address and
 * never a raw `.chatu8` legacy container -- that binary format's own parsing is confined to
 * `@tavern-canvas/v2-migration` (task-6-brief.md Step 1: "legacy .chatu8 media adapter is confined
 * to the v2 converter. Runtime stores standard validated image/video assets"). By the time an
 * asset reaches this module it is a converted, storage-backed blob: or data: URI like any other
 * TavernCanvas image/video asset.
 */
const SAFE_ASSET_URL_PATTERN = /^(?:blob:|data:image\/|data:video\/)/u;

export const MediaAssetSchema = z.strictObject({
  kind: z.enum(MEDIA_ASSET_KINDS),
  url: z
    .string()
    .min(1)
    .refine((value) => SAFE_ASSET_URL_PATTERN.test(value), {
      message: "Media asset URL must be a local blob: or data: URI, not a remote address",
    }),
});
export type MediaAsset = z.infer<typeof MediaAssetSchema>;

export type MediaStateAssetMap = Readonly<Partial<Record<MediaState, MediaAsset>>>;

export interface MediaStateResolution {
  readonly state: MediaState;
  /** null means "no usable asset for this state" -- the caller falls back to the Lucide icon
   * without blocking studio access (task-6-brief.md Step 1), it never surfaces a loading error. */
  readonly asset: MediaAsset | null;
}

export function validate_media_asset(candidate: unknown): MediaAsset | null {
  const result = MediaAssetSchema.safeParse(candidate);
  return result.success ? result.data : null;
}

export function resolve_media_for_state(
  assets: MediaStateAssetMap,
  state: MediaState,
): MediaStateResolution {
  const raw = assets[state];
  if (raw === undefined) {
    return { state, asset: null };
  }
  return { state, asset: validate_media_asset(raw) };
}

/**
 * Small state holder the FloatingEntry.vue component drives (idle by default, transitioning on
 * generation/assistant activity and pointer drag). Kept framework-agnostic and independently
 * testable rather than living inside the component as ad hoc refs.
 */
export class MediaStatePlayer {
  #assets: MediaStateAssetMap;
  #state: MediaState = "idle";

  constructor(assets: MediaStateAssetMap = {}) {
    this.#assets = assets;
  }

  get state(): MediaState {
    return this.#state;
  }

  set_assets(assets: MediaStateAssetMap): void {
    this.#assets = assets;
  }

  transition(state: MediaState): MediaStateResolution {
    this.#state = state;
    return this.current();
  }

  current(): MediaStateResolution {
    return resolve_media_for_state(this.#assets, this.#state);
  }
}
