import { readFile } from "node:fs/promises";
import { deflateRawSync } from "node:zlib";

import { AssetIdSchema, NovelAiRequestSchema, type AssetId } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import type {
  ProviderAssetReader,
  ProviderLogSink,
  ProviderSourceAsset,
} from "../provider_adapter.js";
import { ProviderAdapterError } from "../provider_error.js";
import type {
  ProviderTransport,
  ProviderTransportOperation,
  ProviderTransportResponse,
} from "../provider_transport.js";
import type { RetryClock, RetryRandomSource } from "../retry_policy.js";
import {
  define_provider_contract_suite,
  type ProviderContractExpectation,
  type ProviderContractScenario,
} from "../testing/provider_contract_suite.js";
import { NovelAiAdapter } from "./novelai_adapter.js";
import { map_novelai_request } from "./novelai_mapping.js";
import { parse_novelai_response } from "./novelai_response.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const ASSET_ID = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
const GENERATION_ANCHOR = "a".repeat(64);
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const PNG_BYTES = base64_to_bytes(PNG_BASE64);

const request_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/novelai/generate_request.json",
);
const response_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/novelai/generate_response.json",
);
const zip_fixture = parse_entry_fixture(
  await read_json_fixture(
    "../../../../tests/fixtures/providers/novelai/generate_zip_response.json",
  ),
  "entries",
);
const multipart_fixture = parse_entry_fixture(
  await read_json_fixture(
    "../../../../tests/fixtures/providers/novelai/generate_multipart_response.json",
  ),
  "parts",
);
const response_bytes = new TextEncoder().encode(JSON.stringify(response_fixture));

const profile = {
  profile_id: "novelai-cloud",
  provider_id: "novelai",
  model_allowlist: ["nai-diffusion-4-full"],
  output_mime_type_allowlist: ["image/png", "image/webp"],
  max_response_bytes: 2_000_000,
  max_archive_entries: 8,
  max_input_asset_bytes: 20_000_000,
} as const;

const full_request = NovelAiRequestSchema.parse({
  provider_id: "novelai",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "fixture prompt",
  negative_prompt: "fixture negative prompt",
  output_count: 1,
  model_id: "nai-diffusion-4-full",
  sampler: "k_euler_ancestral",
  width: 1024,
  height: 1024,
  steps: 28,
  scale: 5,
  cfg_rescale: 0,
  noise_schedule: "native",
  seed: 42,
  quality_toggle: true,
  undesired_content_preset: "heavy",
  smea: false,
  dyn: false,
  vibe_references: [{ asset_id: ASSET_ID, strength: 0.6, information_extracted: 0.8 }],
  character_references: [{ asset_id: ASSET_ID, prompt: "fixture character", strength: 0.7 }],
});

class ImmediateClock implements RetryClock {
  now(): number {
    return Date.parse("2026-08-05T09:30:00.000Z");
  }

  sleep(_delay_ms: number, signal: AbortSignal): Promise<void> {
    return signal.aborted
      ? Promise.reject(new DOMException("Aborted", "AbortError"))
      : Promise.resolve();
  }
}

class FixedRandom implements RetryRandomSource {
  next(): number {
    return 0.5;
  }
}

class ScriptedTransport implements ProviderTransport {
  readonly operations: ProviderTransportOperation[] = [];

  constructor(private readonly responses: (ProviderTransportResponse | Error)[]) {}

  execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    this.operations.push(operation);
    if (operation.signal.aborted) {
      return Promise.reject(new DOMException("Aborted", "AbortError"));
    }
    const response = this.responses.shift();
    if (response === undefined) {
      return Promise.reject(new Error("Scripted transport exhausted"));
    }
    return response instanceof Error ? Promise.reject(response) : Promise.resolve(response);
  }
}

class StaticAssetReader implements ProviderAssetReader {
  async read(asset_id: AssetId): Promise<ProviderSourceAsset> {
    expect(asset_id).toBe(ASSET_ID);
    return { asset_id, media_type: "image/png", bytes: PNG_BYTES };
  }
}

class RecordingLog implements ProviderLogSink {
  readonly records: unknown[] = [];

  write(record: unknown): void {
    this.records.push(record);
  }
}

function transport_response(
  status: number,
  body: Uint8Array = new Uint8Array(),
  content_type = "application/json",
): ProviderTransportResponse {
  return { status, headers: { "content-type": content_type }, body };
}

function contract_case(scenario: ProviderContractScenario) {
  const controller = new AbortController();
  const log = new RecordingLog();
  let request = full_request;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [transport_response(201, response_bytes)];

  if (scenario === "multiple_images") {
    request = NovelAiRequestSchema.parse({ ...full_request, output_count: 2 });
    responses = [
      transport_response(
        201,
        new TextEncoder().encode(
          JSON.stringify({
            images: [
              { image: PNG_BASE64, index: 0, seed: 42 },
              { image: PNG_BASE64, index: 1, seed: 43 },
            ],
          }),
        ),
      ),
    ];
    expectation = { kind: "success", asset_count: 2 };
  } else if (scenario === "auth_failure") {
    responses = [transport_response(401)];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [transport_response(451)];
    expectation = { kind: "error", code: "content_blocked" };
  } else if (scenario === "rate_limit") {
    responses = Array.from({ length: 3 }, () => transport_response(429));
    expectation = { kind: "error", code: "rate_limited" };
  } else if (scenario === "timeout") {
    responses = [new ProviderAdapterError({ code: "timed_out", retryable: false })];
    expectation = { kind: "error", code: "timed_out" };
  } else if (scenario === "cancellation") {
    controller.abort();
    responses = [];
    expectation = { kind: "error", code: "cancelled" };
  } else if (scenario === "malformed_response") {
    responses = [transport_response(201, new TextEncoder().encode("{}"))];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "unsupported_capability") {
    request = NovelAiRequestSchema.parse({ ...full_request, model_id: "not-allowed" });
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  return {
    adapter: new NovelAiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }),
    raw_profile: profile,
    context: {
      transport: new ScriptedTransport(responses),
      assets: new StaticAssetReader(),
      signal: controller.signal,
      log,
    },
    request,
    expectation,
    secret_markers: [request.prompt, "private upstream detail"],
    log_records: () => log.records,
  };
}

define_provider_contract_suite("NovelAI", contract_case);
describe("NovelAI request bounds", () => {
  const second_asset_id = AssetIdSchema.parse("33333333-3333-4333-8333-333333333334");
  const asset_bytes = new Uint8Array(6);

  it("rejects distinct individually legal assets when their aggregate exceeds the profile budget", async () => {
    const request = NovelAiRequestSchema.parse({
      ...full_request,
      vibe_references: [{ asset_id: ASSET_ID, strength: 0.6, information_extracted: 0.8 }],
      character_references: [
        { asset_id: second_asset_id, prompt: "fixture character", strength: 0.7 },
      ],
    });
    const transport = new ScriptedTransport([]);
    const assets: ProviderAssetReader = {
      read: async (asset_id) => ({
        asset_id,
        media_type: "image/png",
        bytes: asset_bytes,
      }),
    };
    const bounded_profile = { ...profile, max_input_asset_bytes: 10 };

    await expect(
      new NovelAiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }).submit(
        {
          profile: bounded_profile,
          transport,
          assets,
          signal: new AbortController().signal,
          log: new RecordingLog(),
        },
        request,
      ),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
    expect(transport.operations).toHaveLength(0);
  });

  it("counts a duplicated asset ID once in the aggregate budget", async () => {
    const transport = new ScriptedTransport([transport_response(201, response_bytes)]);
    const assets: ProviderAssetReader = {
      read: async (asset_id) => ({
        asset_id,
        media_type: "image/png",
        bytes: asset_bytes,
      }),
    };
    const bounded_profile = { ...profile, max_input_asset_bytes: 6 };

    await expect(
      new NovelAiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }).submit(
        {
          profile: bounded_profile,
          transport,
          assets,
          signal: new AbortController().signal,
          log: new RecordingLog(),
        },
        full_request,
      ),
    ).resolves.toMatchObject({ state: "completed" });
    expect(transport.operations).toHaveLength(1);
  });
});

describe("NovelAI mapping", () => {
  it("maps top-level negative prompt and supported character description fields", () => {
    const assets = new Map<AssetId, ProviderSourceAsset>([
      [ASSET_ID, { asset_id: ASSET_ID, media_type: "image/png", bytes: PNG_BYTES }],
    ]);

    const payload = map_novelai_request(full_request, assets);

    expect(payload).toEqual(request_fixture);
    expect(payload.parameters.negative_prompt).toBe("fixture negative prompt");
    expect(payload.parameters.director_reference_descriptions).toEqual([
      {
        caption: {
          base_caption: "character, fixture character",
          char_captions: [],
        },
        legacy_uc: false,
        use_coords: false,
        use_order: true,
      },
    ]);
    expect(payload.parameters.director_reference_descriptions?.[0]).not.toHaveProperty(
      "negative_prompt",
    );
    expect(full_request.prompt).toBe("fixture prompt");
  });

  it.each([
    ["heavy", 0],
    ["light", 1],
    ["human_focus", 2],
    ["none", 3],
  ] as const)("maps %s undesired-content preset", (preset, uc_preset) => {
    const request = NovelAiRequestSchema.parse({
      ...full_request,
      vibe_references: undefined,
      character_references: undefined,
      undesired_content_preset: preset,
    });

    expect(map_novelai_request(request, new Map()).parameters.ucPreset).toBe(uc_preset);
  });
});

describe("NovelAI response parsing", () => {
  it("extracts the official JSON response and seed", async () => {
    await expect(
      parse_novelai_response(
        response_bytes,
        "application/json",
        full_request,
        profile.max_response_bytes,
        profile.max_archive_entries,
      ),
    ).resolves.toMatchObject({
      result: {
        request_id: REQUEST_ID,
        provider_id: "novelai",
        seed: 42,
        assets: [{ media_type: "image/png" }],
      },
    });
  });

  it("extracts bounded ZIP image entries", async () => {
    const request = NovelAiRequestSchema.parse({ ...full_request, output_count: 2 });
    const archive = create_zip(
      zip_fixture.map((entry) => ({
        name: entry.filename,
        bytes: base64_to_bytes(entry.base64),
      })),
    );

    await expect(
      parse_novelai_response(
        archive,
        "application/zip",
        request,
        profile.max_response_bytes,
        profile.max_archive_entries,
      ),
    ).resolves.toMatchObject({
      result: {
        seed: 42,
        assets: [{ media_type: "image/png" }, { media_type: "image/png" }],
      },
    });
  });

  it("extracts deflated ZIP image entries", async () => {
    const archive = create_zip([{ name: "image_0.png", bytes: PNG_BYTES }], "deflate");

    await expect(
      parse_novelai_response(
        archive,
        "application/zip",
        full_request,
        profile.max_response_bytes,
        profile.max_archive_entries,
      ),
    ).resolves.toMatchObject({ result: { assets: [{ media_type: "image/png" }] } });
  });

  it("extracts bounded multipart image parts", async () => {
    const content_type = "multipart/mixed; boundary=tavern-canvas-fixture";
    const multipart = create_multipart(
      "tavern-canvas-fixture",
      multipart_fixture.map((entry) => ({
        name: entry.filename,
        media_type: entry.content_type ?? "image/png",
        bytes: base64_to_bytes(entry.base64),
      })),
    );

    await expect(
      parse_novelai_response(
        multipart,
        content_type,
        full_request,
        profile.max_response_bytes,
        profile.max_archive_entries,
      ),
    ).resolves.toMatchObject({ result: { assets: [{ media_type: "image/png" }] } });
  });

  it("rejects excess archive entries, bytes, and image counts", async () => {
    const excess_entries = create_zip(
      Array.from({ length: 9 }, (_, index) => ({
        name: `image_${String(index)}.png`,
        bytes: PNG_BYTES,
      })),
    );
    await expect(
      parse_novelai_response(excess_entries, "application/zip", full_request, 2_000_000, 8),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
    await expect(
      parse_novelai_response(response_bytes, "application/json", full_request, 10, 8),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
    await expect(
      parse_novelai_response(
        new TextEncoder().encode(
          JSON.stringify({
            images: [
              { image: PNG_BASE64, index: 0, seed: 42 },
              { image: PNG_BASE64, index: 1, seed: 43 },
            ],
          }),
        ),
        "application/json",
        full_request,
        2_000_000,
        8,
      ),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
  });
});

interface EntryFixture {
  readonly filename: string;
  readonly base64: string;
  readonly content_type?: string;
}

function parse_entry_fixture(value: unknown, property_name: "entries" | "parts"): EntryFixture[] {
  if (typeof value !== "object" || value === null) {
    throw new TypeError("Invalid entry fixture");
  }
  const entries = Reflect.get(value, property_name);
  if (!Array.isArray(entries)) {
    throw new TypeError("Invalid entry fixture list");
  }
  return entries.map((entry) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      typeof Reflect.get(entry, "filename") !== "string" ||
      typeof Reflect.get(entry, "base64") !== "string"
    ) {
      throw new TypeError("Invalid entry fixture item");
    }
    const content_type = Reflect.get(entry, "content_type");
    return {
      filename: Reflect.get(entry, "filename") as string,
      base64: Reflect.get(entry, "base64") as string,
      ...(typeof content_type === "string" ? { content_type } : {}),
    };
  });
}

async function read_json_fixture(relative_path: string): Promise<unknown> {
  const text = await readFile(new URL(relative_path, import.meta.url), "utf8");
  return JSON.parse(text) as unknown;
}

function create_zip(
  entries: readonly { name: string; bytes: Uint8Array }[],
  compression: "stored" | "deflate" = "stored",
): Uint8Array {
  const encoder = new TextEncoder();
  const local_parts: Uint8Array[] = [];
  const central_parts: Uint8Array[] = [];
  let local_offset = 0;

  for (const entry of entries) {
    const name = encoder.encode(entry.name);
    const crc = crc32(entry.bytes);
    const compression_method = compression === "deflate" ? 8 : 0;
    const compressed_bytes =
      compression === "deflate" ? Uint8Array.from(deflateRawSync(entry.bytes)) : entry.bytes;
    const local = new Uint8Array(30 + name.length + compressed_bytes.length);
    const local_view = new DataView(local.buffer);
    local_view.setUint32(0, 0x04034b50, true);
    local_view.setUint16(4, 20, true);
    local_view.setUint16(8, compression_method, true);
    local_view.setUint32(14, crc, true);
    local_view.setUint32(18, compressed_bytes.length, true);
    local_view.setUint32(22, entry.bytes.length, true);
    local_view.setUint16(26, name.length, true);
    local.set(name, 30);
    local.set(compressed_bytes, 30 + name.length);
    local_parts.push(local);

    const central = new Uint8Array(46 + name.length);
    const central_view = new DataView(central.buffer);
    central_view.setUint32(0, 0x02014b50, true);
    central_view.setUint16(4, 20, true);
    central_view.setUint16(6, 20, true);
    central_view.setUint16(10, compression_method, true);
    central_view.setUint32(16, crc, true);
    central_view.setUint32(20, compressed_bytes.length, true);
    central_view.setUint32(24, entry.bytes.length, true);
    central_view.setUint16(28, name.length, true);
    central_view.setUint32(42, local_offset, true);
    central.set(name, 46);
    central_parts.push(central);
    local_offset += local.length;
  }

  const central_offset = local_offset;
  const central_size = central_parts.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const end_view = new DataView(end.buffer);
  end_view.setUint32(0, 0x06054b50, true);
  end_view.setUint16(8, entries.length, true);
  end_view.setUint16(10, entries.length, true);
  end_view.setUint32(12, central_size, true);
  end_view.setUint32(16, central_offset, true);
  return concatenate_bytes([...local_parts, ...central_parts, end]);
}

function create_multipart(
  boundary: string,
  entries: readonly { name: string; media_type: string; bytes: Uint8Array }[],
): Uint8Array {
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  for (const entry of entries) {
    parts.push(
      encoder.encode(
        `--${boundary}\r\nContent-Type: ${entry.media_type}\r\nContent-Disposition: attachment; filename="${entry.name}"\r\n\r\n`,
      ),
      entry.bytes,
      encoder.encode("\r\n"),
    );
  }
  parts.push(encoder.encode(`--${boundary}--\r\n`));
  return concatenate_bytes(parts);
}

function concatenate_bytes(parts: readonly Uint8Array[]): Uint8Array {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function base64_to_bytes(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}
