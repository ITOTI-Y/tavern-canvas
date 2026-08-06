import { VocabularyManifestSchema, type VocabularyManifest } from "@tavern-canvas/contracts";

/**
 * Where package content is fetched from: a remote HTTPS update channel, or the extension's own
 * bundled baseline (served from its own origin at a relative path). Both resolve to a concrete
 * absolute base URL supplied by the caller — this module never derives a fetch URL from
 * manifest or shard content, so downloaded bytes can never redirect a future fetch.
 */
export type PackageSourceConfig =
  | { readonly kind: "https"; readonly base_url: string }
  | { readonly kind: "bundled"; readonly base_url: string };

export interface DownloadProgress {
  readonly downloaded_bytes: number;
  readonly total_bytes: number;
}

export interface FetchShardOptions {
  readonly max_bytes: number;
  readonly signal?: AbortSignal;
  readonly on_progress?: (progress: DownloadProgress) => void;
}

export interface PackageClient {
  fetch_manifest(signal?: AbortSignal): Promise<VocabularyManifest>;
  fetch_shard_bytes(path: string, options: FetchShardOptions): Promise<Uint8Array>;
}

export class PackageSourceConfigError extends TypeError {}

export class PackageFetchError extends Error {
  readonly path: string;

  constructor(path: string, message: string) {
    super(message);
    this.name = "PackageFetchError";
    this.path = path;
  }
}

const MANIFEST_FILE_NAME = "manifest.json";
/** Generous ceiling for a JSON manifest (bounded array of up to 50,000 shard entries). */
const MAX_MANIFEST_BYTES = 8 * 1024 * 1024;

function validated_base_url(config: PackageSourceConfig): URL {
  let url: URL;
  try {
    url = new URL(config.base_url);
  } catch {
    throw new PackageSourceConfigError(
      `Package source base_url is not a valid absolute URL: ${config.base_url}`,
    );
  }
  if (config.kind === "https" && url.protocol !== "https:") {
    throw new PackageSourceConfigError(
      `An HTTPS package source must use the https: scheme, got: ${url.protocol}`,
    );
  }
  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  url.search = "";
  url.hash = "";
  return url;
}

/**
 * Resolves strictly against the configured, statically-supplied base — the only URL source this
 * client ever consults. `relative_path` always comes from a validated `VocabularyShardPath` (or
 * the fixed manifest filename), never from a field decoded out of downloaded package content.
 */
function resolve_relative(base_url: URL, relative_path: string): URL {
  return new URL(relative_path, base_url);
}

async function read_bounded_stream(
  body: ReadableStream<Uint8Array> | null,
  path: string,
  max_bytes: number,
  on_progress?: (progress: DownloadProgress) => void,
): Promise<Uint8Array> {
  if (body === null) {
    throw new PackageFetchError(path, `Response for ${path} has no readable body`);
  }
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    total += value.byteLength;
    if (total > max_bytes) {
      await reader.cancel("bounded_stream_exceeded").catch(() => undefined);
      throw new PackageFetchError(
        path,
        `Response for ${path} exceeded the allowed ${String(max_bytes)}-byte bound`,
      );
    }
    chunks.push(value);
    on_progress?.({ downloaded_bytes: total, total_bytes: max_bytes });
  }
  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return combined;
}

export function create_package_client(
  config: PackageSourceConfig,
  fetch_impl: typeof fetch = fetch,
): PackageClient {
  const base_url = validated_base_url(config);

  return {
    async fetch_manifest(signal) {
      const url = resolve_relative(base_url, MANIFEST_FILE_NAME);
      const response = await fetch_impl(url, signal === undefined ? {} : { signal });
      if (!response.ok) {
        throw new PackageFetchError(
          MANIFEST_FILE_NAME,
          `Manifest request failed with status ${String(response.status)}`,
        );
      }
      const bytes = await read_bounded_stream(
        response.body,
        MANIFEST_FILE_NAME,
        MAX_MANIFEST_BYTES,
      );
      let parsed: unknown;
      try {
        parsed = JSON.parse(new TextDecoder().decode(bytes));
      } catch {
        throw new PackageFetchError(MANIFEST_FILE_NAME, "Manifest response is not valid JSON");
      }
      const result = VocabularyManifestSchema.safeParse(parsed);
      if (!result.success) {
        throw new PackageFetchError(
          MANIFEST_FILE_NAME,
          "Manifest response failed schema validation",
        );
      }
      return result.data;
    },

    async fetch_shard_bytes(path, options) {
      const url = resolve_relative(base_url, path);
      const response = await fetch_impl(
        url,
        options.signal === undefined ? {} : { signal: options.signal },
      );
      if (!response.ok) {
        throw new PackageFetchError(
          path,
          `Shard request failed with status ${String(response.status)}: ${path}`,
        );
      }
      return read_bounded_stream(response.body, path, options.max_bytes, options.on_progress);
    },
  };
}
