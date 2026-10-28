// @vitest-environment node

import "fake-indexeddb/auto";

import {
  dispose_database,
  GalleryImageRecordRepository,
  open_database,
  put_image,
} from "@tavern-canvas/storage";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it, vi } from "vitest";

import { create_gallery_capability } from "./gallery_capability.js";

const NAMESPACE = "primary";
const IMAGE_ID = "11111111-1111-4111-8111-111111111111";
const PNG = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
/** A PNG signature and IHDR for an 832 x 1216 image. */
const SIZED_PNG = Uint8Array.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13, 0x49, 0x48, 0x44, 0x52, 0, 0, 3, 64,
  0, 0, 4, 192,
]);

afterEach(async () => {
  await dispose_database();
  await deleteDB("tavern_canvas_v3");
});

describe("gallery read_thumbnail", () => {
  it("makes a thumbnail once and serves the stored one afterwards", async () => {
    const database = await open_database();
    await put_image(database, NAMESPACE, {
      id: IMAGE_ID,
      bytes: PNG,
      claimed_media_type: "image/png",
      created_at: "2026-10-28T00:00:00.000Z",
      metadata: {
        provider_id: "novelai",
        source_message: null,
        generation_parameters: { generation_anchor: "a".repeat(64), scene_description: "x" },
      },
    });
    const make_thumbnail = vi.fn(() => Promise.resolve(Uint8Array.from([7, 7])));
    const gallery = create_gallery_capability({
      database,
      repository: new GalleryImageRecordRepository(database),
      namespace: () => NAMESPACE,
      now: () => "2026-10-28T00:00:00.000Z",
      reveal_message: null,
      make_thumbnail,
    });

    await expect(gallery.read_thumbnail(IMAGE_ID)).resolves.toEqual(Uint8Array.from([7, 7]));
    await expect(gallery.read_thumbnail(IMAGE_ID)).resolves.toEqual(Uint8Array.from([7, 7]));
    expect(make_thumbnail).toHaveBeenCalledOnce();
    expect(make_thumbnail).toHaveBeenCalledWith(PNG, "image/png");
  });

  it("records the size of an image stored without one, for the gallery layout", async () => {
    const database = await open_database();
    await put_image(database, NAMESPACE, {
      id: IMAGE_ID,
      bytes: SIZED_PNG,
      claimed_media_type: "image/png",
      created_at: "2026-10-28T00:00:00.000Z",
      metadata: {
        provider_id: "novelai",
        source_message: null,
        generation_parameters: { generation_anchor: "a".repeat(64), scene_description: "x" },
      },
    });
    const repository = new GalleryImageRecordRepository(database);
    const stored = await repository.get(NAMESPACE, IMAGE_ID);
    expect(stored).toMatchObject({ width: 832, height: 1216 });
    const { width: _width, height: _height, ...legacy } = stored ?? {};
    await repository.put(NAMESPACE, legacy as NonNullable<typeof stored>);
    const gallery = create_gallery_capability({
      database,
      repository,
      namespace: () => NAMESPACE,
      now: () => "2026-10-28T00:00:00.000Z",
      reveal_message: null,
      make_thumbnail: () => Promise.resolve(Uint8Array.from([7])),
    });

    await gallery.read_thumbnail(IMAGE_ID);

    expect((await gallery.load())[0]).toMatchObject({ width: 832, height: 1216 });
  });
});
