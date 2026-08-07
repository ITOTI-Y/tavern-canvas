import type { ProviderTransport, ProviderTransportResponse } from "@tavern-canvas/providers";
import { describe, expect, it, vi } from "vitest";

import {
  advance_video_playback_on_error,
  assert_reference_upload_rejects_video,
  create_video_output_asset,
  create_video_playback_state,
  fix_mp4_faststart,
  is_mp4_bytes,
  normalize_video_asset,
  submit_video_generation,
  VideoAssetError,
  VideoGenerationError,
  type IdSource,
  type PosterExtractorPort,
  type VideoStorePort,
} from "./video_generation.js";

function u32(value: number): number[] {
  return [(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff];
}

function ascii(value: string): number[] {
  return Array.from(value, (character) => character.charCodeAt(0));
}

function build_box(type: string, content: number[]): number[] {
  return [...u32(8 + content.length), ...ascii(type), ...content];
}

function concat(...parts: number[][]): Uint8Array {
  return Uint8Array.from(parts.flat());
}

const REAL_FTYP = build_box("ftyp", [...ascii("isom"), 0, 0, 0, 0]);

function stco_box(offsets: number[]): number[] {
  return build_box("stco", [0, 0, 0, 0, ...u32(offsets.length), ...offsets.flatMap(u32)]);
}

function non_faststart_mp4(offsets: number[]): { bytes: Uint8Array; moov_size: number } {
  const stco = stco_box(offsets);
  const stbl = build_box("stbl", stco);
  const minf = build_box("minf", stbl);
  const mdia = build_box("mdia", minf);
  const trak = build_box("trak", mdia);
  const moov = build_box("moov", trak);
  const mdat = build_box(
    "mdat",
    Array.from({ length: 20 }, () => 0xab),
  );
  return { bytes: concat(REAL_FTYP, mdat, moov), moov_size: moov.length };
}

describe("is_mp4_bytes", () => {
  it("recognizes the ftyp signature at offset 4", () => {
    expect(is_mp4_bytes(concat(REAL_FTYP))).toBe(true);
  });

  it("rejects non-mp4 and truncated bytes", () => {
    expect(is_mp4_bytes(Uint8Array.from([0x89, 0x50, 0x4e, 0x47]))).toBe(false);
    expect(is_mp4_bytes(Uint8Array.from([0, 0, 0]))).toBe(false);
  });
});

describe("create_video_output_asset", () => {
  it("builds a video/mp4 GeneratedAsset with a deterministic sha256-derived asset_id", () => {
    const bytes = concat(REAL_FTYP);
    const output = create_video_output_asset(bytes, 4_200);
    expect(output.asset.media_type).toBe("video/mp4");
    expect(output.asset.duration_ms).toBe(4_200);
    expect(output.asset.byte_length).toBe(bytes.byteLength);
    expect(output.bytes).toBe(bytes);

    const again = create_video_output_asset(bytes, 4_200);
    expect(again.asset.asset_id).toBe(output.asset.asset_id);
  });

  it("throws VideoAssetError for non-mp4 bytes", () => {
    expect(() => create_video_output_asset(Uint8Array.from([1, 2, 3]), undefined)).toThrow(
      VideoAssetError,
    );
  });
});

describe("assert_reference_upload_rejects_video", () => {
  it("rejects a claimed video/mp4 media type", () => {
    expect(() =>
      assert_reference_upload_rejects_video("video/mp4", Uint8Array.from([1, 2, 3])),
    ).toThrow(VideoAssetError);
  });

  it("rejects mp4 bytes mislabeled as an image", () => {
    expect(() => assert_reference_upload_rejects_video("image/png", concat(REAL_FTYP))).toThrow(
      VideoAssetError,
    );
  });

  it("accepts real image bytes", () => {
    const png = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(() => assert_reference_upload_rejects_video("image/png", png)).not.toThrow();
  });
});

describe("fix_mp4_faststart", () => {
  it("relocates moov before mdat and shifts stco offsets by moov's byte size", () => {
    const { bytes, moov_size } = non_faststart_mp4([100, 5_000]);
    const fixed = fix_mp4_faststart(bytes);

    expect(fixed.byteLength).toBe(bytes.byteLength);

    // moov must now immediately follow ftyp (16 bytes) and precede mdat.
    const view = new DataView(fixed.buffer, fixed.byteOffset, fixed.byteLength);
    const moov_type = String.fromCharCode(
      view.getUint8(16 + 4),
      view.getUint8(16 + 5),
      view.getUint8(16 + 6),
      view.getUint8(16 + 7),
    );
    expect(moov_type).toBe("moov");
    const mdat_start = 16 + moov_size;
    const mdat_type = String.fromCharCode(
      view.getUint8(mdat_start + 4),
      view.getUint8(mdat_start + 5),
      view.getUint8(mdat_start + 6),
      view.getUint8(mdat_start + 7),
    );
    expect(mdat_type).toBe("mdat");

    // trak(8) > mdia(8) > minf(8) > stbl(8) > stco header(8) + version/flags(4) + count(4) = offset
    // table starts 16 + moov_header(8) + trak_header(8) + mdia_header(8) + minf_header(8) +
    // stbl_header(8) + stco_header(8) + 4 + 4 bytes in.
    const stco_offsets_start = 16 + 8 + 8 + 8 + 8 + 8 + 8 + 4 + 4;
    const first = view.getUint32(stco_offsets_start, false);
    const second = view.getUint32(stco_offsets_start + 4, false);
    expect(first).toBe(100 + moov_size);
    expect(second).toBe(5_000 + moov_size);
  });

  it("leaves already-faststart layouts (moov before mdat) unchanged", () => {
    const stco = stco_box([10]);
    const stbl = build_box("stbl", stco);
    const minf = build_box("minf", stbl);
    const mdia = build_box("mdia", minf);
    const trak = build_box("trak", mdia);
    const moov = build_box("moov", trak);
    const mdat = build_box("mdat", [1, 2, 3]);
    const bytes = concat(REAL_FTYP, moov, mdat);

    const fixed = fix_mp4_faststart(bytes);
    expect(fixed).toBe(bytes);
  });

  it("returns the original bytes unchanged on any parse failure", () => {
    const malformed = Uint8Array.from([0, 0, 0, 200, 0x6d, 0x64, 0x61, 0x74, 1, 2, 3]);
    expect(fix_mp4_faststart(malformed)).toBe(malformed);
  });

  it("returns the original bytes unchanged when moov or mdat is absent", () => {
    const bytes = concat(REAL_FTYP);
    expect(fix_mp4_faststart(bytes)).toBe(bytes);
  });
});

describe("video playback fallback state machine", () => {
  it("starts on blob when a blob URL is available, else original", () => {
    expect(create_video_playback_state("blob:1", "https://example.com/a.mp4").source).toBe("blob");
    expect(create_video_playback_state(null, "https://example.com/a.mp4").source).toBe("original");
  });

  it("advances blob -> original -> download_only", () => {
    const blob_state = create_video_playback_state("blob:1", "https://example.com/a.mp4");
    const original_state = advance_video_playback_on_error(blob_state);
    expect(original_state.source).toBe("original");

    const final_state = advance_video_playback_on_error(original_state);
    expect(final_state.source).toBe("download_only");
  });

  it("skips straight to download_only when there is no distinct original URL", () => {
    const blob_only = create_video_playback_state("blob:1", null);
    expect(advance_video_playback_on_error(blob_only).source).toBe("download_only");

    const blob_same_as_original = create_video_playback_state("blob:1", "blob:1");
    expect(advance_video_playback_on_error(blob_same_as_original).source).toBe("download_only");
  });
});

describe("normalize_video_asset", () => {
  it("stores a poster image record then a linked video/mp4 record", async () => {
    const puts: { id: string; claimed_media_type: string; metadata: Record<string, unknown> }[] =
      [];
    const store: VideoStorePort = {
      put_image: vi.fn<VideoStorePort["put_image"]>(async (input) => {
        puts.push({
          id: input.id,
          claimed_media_type: input.claimed_media_type,
          metadata: input.metadata,
        });
        return { id: input.id };
      }),
    };
    const poster: PosterExtractorPort = {
      extract: vi.fn(async () => ({ bytes: Uint8Array.from([1, 2, 3]), width: 640, height: 360 })),
    };
    let counter = 0;
    const ids: IdSource = { next: () => `id-${String((counter += 1))}` };

    const result = await normalize_video_asset(
      { store, poster, ids },
      {
        video_bytes: concat(REAL_FTYP),
        provider_id: "google_image",
        source_message: { chat_id: "chat-1", message_id: "msg-1", swipe_id: 0 },
        generation_parameters: { generation_anchor: "a".repeat(64), scene_description: "s" },
        source_job_id: "job-1",
        created_at: "2026-08-07T00:00:00.000Z",
        duration_ms: 3_000,
      },
    );

    expect(puts).toHaveLength(2);
    expect(puts[0]?.claimed_media_type).toBe("image/jpeg");
    expect(puts[1]?.claimed_media_type).toBe("video/mp4");
    expect(puts[1]?.metadata.poster_image_id).toBe(result.poster_image_id);
    expect(puts[1]?.metadata.source_job_id).toBe("job-1");
    expect(puts[1]?.metadata.duration_ms).toBe(3_000);
    expect(result.video_image_id).not.toBe(result.poster_image_id);
  });
});

function transport_response(body: Uint8Array): ProviderTransportResponse {
  return { status: 200, headers: {}, body };
}

describe("submit_video_generation", () => {
  it("scrapes the mp4 URL from the response text and fetches it as a video asset", async () => {
    const response_text = `<video src="https://cdn.example.com/out.mp4"></video>`;
    const transport: ProviderTransport = {
      execute: vi.fn(async () => transport_response(new TextEncoder().encode(response_text))),
      fetch_remote_asset: vi.fn(async () => transport_response(concat(REAL_FTYP))),
    };

    const output = await submit_video_generation(
      transport,
      {
        route: "/v1/chat/completions",
        body: new TextEncoder().encode("{}"),
        content_type: "application/json",
      },
      new AbortController().signal,
    );

    expect(output.asset.media_type).toBe("video/mp4");
    expect(transport.fetch_remote_asset).toHaveBeenCalledWith(
      expect.objectContaining({ url: "https://cdn.example.com/out.mp4" }),
    );
  });

  it("throws VideoGenerationError when no mp4 URL is present in the response", async () => {
    const transport: ProviderTransport = {
      execute: vi.fn(async () =>
        transport_response(new TextEncoder().encode(`{"content":"no video here"}`)),
      ),
    };

    await expect(
      submit_video_generation(
        transport,
        {
          route: "/v1/chat/completions",
          body: new TextEncoder().encode("{}"),
          content_type: "application/json",
        },
        new AbortController().signal,
      ),
    ).rejects.toThrow(VideoGenerationError);
  });
});
