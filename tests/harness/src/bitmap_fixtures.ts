import detailed_url from "../../fixtures/ui/detailed.png?url";
import landscape_url from "../../fixtures/ui/landscape.png?url";
import portrait_url from "../../fixtures/ui/portrait.png?url";
import square_url from "../../fixtures/ui/square.png?url";
import very_dark_url from "../../fixtures/ui/very_dark.png?url";
import very_light_url from "../../fixtures/ui/very_light.png?url";

/**
 * The six real, hard-edged, non-uniform bitmap fixtures tests/fixtures/ui/generate_fixtures.ts
 * produces (Stage 06 Task 6). Task 8's harness serves them as real `image/png` bytes through the
 * mock Gallery/Generation capabilities' `read_bytes`, so the blank-image and zero-dimension
 * programmatic checks (studio_overflow.spec.ts) exercise genuine decoded pixels instead of a
 * placeholder color swatch, and the visual snapshots show real image content in the Gallery grid
 * and the Workbench completion preview.
 */
export interface BitmapFixture {
  readonly id: string;
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly media_type: "image/png";
}

export const BITMAP_FIXTURES: readonly BitmapFixture[] = [
  { id: "portrait", url: portrait_url, width: 480, height: 720, media_type: "image/png" },
  { id: "landscape", url: landscape_url, width: 720, height: 480, media_type: "image/png" },
  { id: "square", url: square_url, width: 600, height: 600, media_type: "image/png" },
  { id: "very-light", url: very_light_url, width: 512, height: 512, media_type: "image/png" },
  { id: "very-dark", url: very_dark_url, width: 512, height: 512, media_type: "image/png" },
  { id: "detailed", url: detailed_url, width: 640, height: 480, media_type: "image/png" },
];

const byte_cache = new Map<string, Uint8Array>();

/** Fetches one fixture's real bytes (from Vite's own dev/preview static serving of the imported
 * asset URL), caching per fixture id so a record read more than once never refetches. */
export async function read_bitmap_fixture_bytes(fixture: BitmapFixture): Promise<Uint8Array> {
  const cached = byte_cache.get(fixture.id);
  if (cached) {
    return cached;
  }
  const response = await fetch(fixture.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch fixture "${fixture.id}": ${String(response.status)}`);
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  byte_cache.set(fixture.id, bytes);
  return bytes;
}

export function fixture_by_id(id: string): BitmapFixture {
  const fixture = BITMAP_FIXTURES.find((candidate) => candidate.id === id);
  if (!fixture) {
    throw new Error(`Unknown bitmap fixture id "${id}"`);
  }
  return fixture;
}
