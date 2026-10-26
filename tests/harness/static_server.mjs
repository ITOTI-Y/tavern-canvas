import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

// Serves the benchmark site without ever setting Content-Encoding. `vite preview` answers `.gz`
// paths with Content-Encoding: gzip, so fetch() would decompress `.msgpack.gz` shards before the
// Worker's own gunzip step and the declared byte_length check would fail.

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
