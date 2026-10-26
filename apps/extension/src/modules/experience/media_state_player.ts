import { z } from "zod";

/** State to asset resolution only: headpat/thinking/talk, plus "enter" for the appearance transition and "dragging" for pointer drag. */
export const MEDIA_STATES = ["idle", "thinking", "talk", "enter", "dragging"] as const;
export type MediaState = (typeof MEDIA_STATES)[number];

const MEDIA_ASSET_KINDS = ["image", "video"] as const;
export type MediaAssetKind = (typeof MEDIA_ASSET_KINDS)[number];

/** Runtime media assets are validated local object/data URIs, never remote addresses or raw `.chatu8` containers (parsed only in `@tavern-canvas/v2-migration`). */
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
  /** null means no usable asset; the caller falls back to the Lucide icon without surfacing a loading error. */
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
