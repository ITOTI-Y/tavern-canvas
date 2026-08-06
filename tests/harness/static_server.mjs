import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

// Stage 05 Task 6: serves output/benchmark/site verbatim over plain HTTP.
// `vite preview` cannot be used here -- its static middleware treats any
// `.gz`-suffixed path as a precompressed asset and answers with
// `Content-Encoding: gzip`, which a browser's `fetch()` transparently
// decompresses before the Worker's own gunzip step ever runs. Every shard
// path the real builder writes literally ends in `.msgpack.gz`
// (tools/vocabulary_builder/src/write_package.ts) -- that suffix is part of
// the application's own filename, not a transport hint, so the shard bytes
// arrived already-decompressed and failed `verify_shard_bytes`'s declared
// vs. downloaded byte-length check (caught during manual smoke-testing:
// "Declared byte_length 1731 does not match downloaded size 2815"). This
// server never sets Content-Encoding, so every file's bytes reach `fetch()`
// unmodified -- exactly what a real static host (e.g. the extension's own
// bundled-baseline origin) does.

const ROOT = fileURLToPath(new URL("../../output/benchmark/site", import.meta.url));
const PORT = Number.parseInt(process.env.STATIC_SERVER_PORT ?? "4173", 10);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

function content_type_for(path) {
  return CONTENT_TYPES[extname(path)] ?? "application/octet-stream";
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const decoded_path = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const resolved_path = normalize(join(ROOT, decoded_path));

  if (!resolved_path.startsWith(ROOT)) {
    response.writeHead(403).end("forbidden");
    return;
  }

  stat(resolved_path)
    .then((stats) => {
      if (!stats.isFile()) {
        throw new Error("not a file");
      }
      response.writeHead(200, {
        "Content-Type": content_type_for(resolved_path),
        "Content-Length": String(stats.size),
        "Cache-Control": "no-store",
      });
      createReadStream(resolved_path).pipe(response);
    })
    .catch(() => {
      response.writeHead(404).end("not found");
    });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`static_server: serving ${ROOT} at http://127.0.0.1:${String(PORT)}`);
});
