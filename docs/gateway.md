# TavernCanvas Gateway

The Gateway is a self hosted HTTP service that accepts image generation jobs, calls the configured
image providers with credentials that never reach the browser, stores the resulting images, and
reports progress over Server Sent Events.

## Connecting the extension

The 3.0.0 extension routes generation through the Gateway whenever one is configured. Under
**Settings > Gateway** set two fields:

1. **Gateway endpoint** — the origin this service is reachable at. An `http://` origin has to be
   acknowledged once, per origin, before it is used.
2. **Gateway access token** — one of the bearer tokens whose digest is in
   `TAVERN_CANVAS_BEARER_TOKEN_HASHES`. The plaintext goes straight to SillyTavern's secret store;
   the extension's settings keep only a reference and never render, export, or log the value.

With both set, every image job goes to this service and no provider credential is ever held by the
browser. With an endpoint but no token, or with an unacknowledged cleartext origin, the extension's
generation capability reports that exact reason in Diagnostics instead of generating.

Reading the token back out of SillyTavern's secret store needs `allowKeysExposure: true` in
SillyTavern's `config.yaml`, the same host flag a direct cloud call needs. The difference is what
that flag exposes: with a Gateway, the only secret in the browser session is this service's bearer
token, and every vendor API key stays here.

### What the client does

`apps/extension/src/transport/gateway_job_executor.ts` submits one `POST /v1/jobs` per generation,
follows `GET /v1/jobs/{id}/events` over SSE with a bounded polling fallback, downloads each finished
image from `GET /v1/assets/{id}/content`, and stores it exactly as a directly generated image is
stored. Cancelling a job in the workbench sends `DELETE /v1/jobs/{id}`. The client names no provider
URL and sends no provider credential; only this service's bearer token and the typed generation
request cross the wire.

## Running it

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm --filter @tavern-canvas/gateway build
pnpm --filter @tavern-canvas/gateway start
```

Node 24 or newer. Configuration comes from environment variables. Nothing loads a `.env` file
automatically; export the variables yourself or pass `node --env-file=<file>`. A relative
`TAVERN_CANVAS_DATA_DIR` resolves against the process working directory, so start the service from a
stable directory. `TAVERN_CANVAS_BEARER_TOKEN_HASHES` is read at startup. An optional
`TAVERN_CANVAS_BEARER_TOKEN_HASH_FILE` adds newline-delimited SHA-256 digests and is re-read
atomically after `SIGHUP`; a malformed or unreadable reload leaves the previous set in place.

## Configuration

| Variable                               | Default          | Notes                                                                     |
| -------------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| `TAVERN_CANVAS_BIND_HOST`              | `127.0.0.1`      | Must be an IP literal or `localhost`.                                     |
| `TAVERN_CANVAS_BIND_PORT`              | `8787`           | 1–65535.                                                                  |
| `TAVERN_CANVAS_CORS_ORIGINS`           | required         | JSON array of 1–128 exact origins.                                        |
| `TAVERN_CANVAS_BEARER_TOKEN_HASHES`    | required         | JSON array of 1–128 lowercase hex SHA-256 digests.                        |
| `TAVERN_CANVAS_BEARER_TOKEN_HASH_FILE` | unset            | Optional newline-delimited lowercase SHA-256 digests, reloaded by SIGHUP. |
| `TAVERN_CANVAS_PROVIDER_PROFILES`      | required         | JSON array of 1–128 profiles with unique `profile_id` and `provider_id`.  |
| `TAVERN_CANVAS_DATA_DIR`               | `output/gateway` | Rejects `..` segments and NUL bytes.                                      |
| `TAVERN_CANVAS_CONCURRENCY`            | `2`              | 1–64 simultaneously executing jobs.                                       |
| `TAVERN_CANVAS_MAX_PENDING_JOBS`       | `256`            | Hard cap, 1–100000 pending jobs.                                          |
| `TAVERN_CANVAS_RETENTION_HOURS`        | `168`            | Terminal job retention, 1–8760 hours.                                     |
| `TAVERN_CANVAS_MAX_REQUEST_BYTES`      | `2000000`        | JSON body limit, 1_024–20_000_000.                                        |
| `TAVERN_CANVAS_MAX_IMAGE_BYTES`        | `20000000`       | Image upload limit, 1_024–100_000_000.                                    |
| `TAVERN_CANVAS_MAX_IMAGE_PIXELS`       | `40000000`       | 1–200_000_000.                                                            |
| `TAVERN_CANVAS_MAX_IMAGE_DIMENSION`    | `8192`           | 1–32_768.                                                                 |

These are the Gateway configuration variables. A malformed value fails startup with a
`GatewayConfigError` that names the offending field path and never echoes the value. A malformed
token hash file during `SIGHUP` is rejected without changing the active set and is logged only as a
redacted reload error. Token hashes and provider credentials are wrapped so that logging, `toString`,
`toJSON`, and `util.inspect` all yield `[REDACTED]`.

### The loopback default

The default bind address keeps the service reachable only from the machine it runs on. Changing
`TAVERN_CANVAS_BIND_HOST` exposes it to the network, which is the point at which the rest of this
document starts to matter.

Provider `base_url` values are held to the same rule from the other direction: a provider URL may
only use `http:` when its host is a loopback address, otherwise startup fails with
`Cleartext provider URLs must be loopback origins`.

## Authentication

Every `/v1` route requires `Authorization: Bearer <token>`. The token is compared by hashing it with
SHA-256 and running a timing safe comparison against every configured hash, without short circuiting
on the first match.

`/healthz` is mounted before the authentication middleware and is deliberately unauthenticated.

A missing or unparseable header returns `401 authentication_required`. A well formed header whose
token matches no configured hash returns `403 authentication_failed`.

### Provisioning a token

The Gateway stores only digests, never tokens. Generate a token and record its digest:

```bash
token="$(openssl rand -hex 32)"
printf '%s' "$token" | sha256sum   # put the digest in the JSON startup list or hash file
printf '%s\n' "$token"             # give this to the client; the Gateway never sees it again
```

There is no CLI or API endpoint that mints tokens.

### Rotation and revocation

`TAVERN_CANVAS_BEARER_TOKEN_HASHES` remains the startup set. To manage rotating credentials without
restarting, set `TAVERN_CANVAS_BEARER_TOKEN_HASH_FILE` to a file containing one lowercase SHA-256
digest per line, then send `SIGHUP` to the process:

```bash
printf '%s\n' '<sha256-hex-of-new-token>' > /run/secrets/tavern-canvas-bearer-hashes
kill -HUP "$(cat /run/tavern-canvas-gateway.pid)"
```

The file is parsed completely before the active set is replaced, so adding or removing a file
digest takes effect atomically after `SIGHUP`. If the file is missing, unreadable, malformed, or
contains more than 128 combined digests, the previous set remains active and the Gateway records
only a redacted reload error. The process does not restart. To revoke a digest managed by the
startup environment list, update the environment and restart; startup hashes are intentionally
kept as the stable base set.

Jobs are owned by the bearer-token SHA-256 digest that created them. A valid token can read, cancel,
or receive events only for its own jobs; revoking a token does not cancel its already running work.

## CORS

Allowed origins are matched by exact string equality against `TAVERN_CANVAS_CORS_ORIGINS`. There is
no wildcard, no subdomain matching, and no pattern support; `"*"` is rejected at configuration load.

- Requests with no `Origin` header pass through untouched, so non browser clients are unaffected.
- A disallowed origin returns `403 cors_origin_denied`, including on preflight.
- An allowed origin gets `Access-Control-Allow-Origin` echoed back plus `Vary: Origin`.
- Preflight replies with `204` and:
  - `Access-Control-Allow-Methods: GET,POST,DELETE,OPTIONS`
  - `Access-Control-Allow-Headers: Authorization,Content-Type,Last-Event-ID,X-Request-ID`
- `Access-Control-Allow-Credentials` is never set, so credentials mode is off. Authentication is the
  bearer header, not a cookie.

CORS runs before authentication, so it also guards `/healthz`. `helmet` runs first with its
defaults, and `x-powered-by` is disabled.

## Cleartext over a LAN

Exposing the Gateway on a LAN over plain HTTP puts the bearer token, the prompts, and the generated
images on the wire in cleartext.

```bash
export TAVERN_CANVAS_BIND_HOST=0.0.0.0
export TAVERN_CANVAS_BIND_PORT=8787
export TAVERN_CANVAS_CORS_ORIGINS='["http://192.168.1.20:8000"]'
export TAVERN_CANVAS_BEARER_TOKEN_HASHES='["<sha256-hex-of-your-token>"]'
export TAVERN_CANVAS_PROVIDER_PROFILES='[{"profile_id":"nai","provider_id":"novelai","credential":"<key>"}]'
pnpm --filter @tavern-canvas/gateway start
```

Anyone on that network segment can read the token out of a single request and then use it, because
the token is a bearer credential and the Gateway has no other client identity. Treat this
configuration as equivalent to publishing the token to everyone who can see the traffic.

The Gateway serves plain HTTP only. It creates a `node:http` server and has no TLS option, so
encryption is a reverse proxy's job.

The extension side has its own guard: the Gateway client refuses an `http://` origin until that
exact origin has been acknowledged in settings, and the acknowledgment is stored per origin with a
timestamp. Acknowledging is a decision about accepting cleartext, not a fix for it.

### HTTPS through a reverse proxy

Keep the Gateway on loopback and terminate TLS in front of it. With Caddy:

```caddyfile
canvas.example.com {
    reverse_proxy 127.0.0.1:8787 {
        flush_interval -1
    }
}
```

`flush_interval -1` disables response buffering, which the Server Sent Events job stream needs.

Then set `TAVERN_CANVAS_CORS_ORIGINS` to the HTTPS origin the browser actually uses, for example
`["https://tavern.example.com"]`, and leave `TAVERN_CANVAS_BIND_HOST` at `127.0.0.1` so the service
is reachable only through the proxy.

## Limits

| Limit                  | Value                                                  |
| ---------------------- | ------------------------------------------------------ |
| Rate limit             | 120 requests per 60 s, keyed per bearer token          |
| JSON body              | `TAVERN_CANVAS_MAX_REQUEST_BYTES`, default 2 MB        |
| Image upload           | `TAVERN_CANVAS_MAX_IMAGE_BYTES`, default 20 MB         |
| Image pixels           | `TAVERN_CANVAS_MAX_IMAGE_PIXELS`, default 40 M         |
| Image dimension        | `TAVERN_CANVAS_MAX_IMAGE_DIMENSION`, default 8192      |
| Concurrent jobs        | `TAVERN_CANVAS_CONCURRENCY`, default 2                 |
| Pending jobs           | `TAVERN_CANVAS_MAX_PENDING_JOBS`, default 256          |
| Images per job         | 4, fixed by the contract                               |
| Provider response body | 100 MB, or the profile's `max_response_bytes` if lower |

Exceeding the rate limit returns `429 rate_limited` with `retryable: true`; the limiter is mounted on
`/v1` only, so `/healthz` is not rate limited. An oversized JSON body returns `413 request_too_large`.
When the persistent pending-job count reaches `TAVERN_CANVAS_MAX_PENDING_JOBS`, a new job returns
`429 queue_full` with `retryable: true`. The rejected request does not create a job row, event, or
asset.

Uploads accept `image/png`, `image/jpeg`, and `image/webp` only. The type is sniffed from the bytes
rather than trusted from a header, multi page images are rejected, and accepted images are
re-encoded canonically before storage.

Terminal jobs, their events, and their job asset links are retained for
`TAVERN_CANVAS_RETENTION_HOURS` (default 168 hours). Cleanup runs once during startup and every hour
thereafter. It deletes only `completed`, `failed`, and `cancelled` jobs older than the cutoff, then
removes unreferenced asset records and their blobs. `queued`, `preparing`, `submitting`, `running`,
`attached`, and `orphaned` jobs are not deleted by retention cleanup.

## Data on disk

Everything lives under `TAVERN_CANVAS_DATA_DIR`, default `output/gateway`:

| Path                                 | Contents                                                   |
| ------------------------------------ | ---------------------------------------------------------- |
| `tavern_canvas.sqlite`               | Jobs, job events, and asset records                        |
| `tavern_canvas.sqlite-wal`, `-shm`   | SQLite write ahead log sidecars                            |
| `assets/<asset_id>.<png\|jpg\|webp>` | Image blobs, written `0600` through a temp file and rename |

SQLite runs in WAL mode with foreign keys on and a 5 s busy timeout. There are no separate variables
for the database file, the asset directory, or a log path.

Logs go to stdout through pino at level `info`. There is no log file and no rotation; capture stdout
with your process supervisor. Log records are recursively stripped of credential, password, token,
access token, refresh token, and private key fields before they are written.

Note that the default data directory sits under `output/`, which this repository gitignores, so
version control never captures it.

## Backup

There is no backup or export command. A complete backup is a file copy of three things:

1. `tavern_canvas.sqlite` together with its `-wal` and `-shm` sidecars. Nothing checkpoints on
   demand, so copy these with the process stopped or the backup may be inconsistent.
2. The whole `assets/` directory. Database rows reference blobs by relative path, so a database
   without its assets restores to broken records.
3. The environment configuration itself. It exists only in the environment, never on disk, and
   `TAVERN_CANVAS_PROVIDER_PROFILES` carries your provider credentials. Store it with the same care
   you would give a password file.

```bash
systemctl --user stop tavern-canvas-gateway
tar czf gateway-backup-$(date +%Y%m%d).tar.gz -C "$TAVERN_CANVAS_DATA_DIR" .
systemctl --user start tavern-canvas-gateway
```

## Restart recovery

Shutdown aborts every active job without marking it failed, so its persisted state survives for the
next boot. On startup the worker first removes expired terminal data, then reloads every job in
`queued`, `preparing`, `submitting`, or `running` and applies these rules:

- `preparing` returns to `queued`, its submission cleared, recorded as a `recovered` event, and runs
  again.
- `submitting` or `running` **with** a persisted queryable submission is requeued, and polling
  resumes from the stored submission id. The provider is not asked to generate a second time.
- `submitting` or `running` **without** a persisted submission fails with
  `provider_unavailable`, `retryable: true`, recorded as `recovered_without_submission`. It is not
  retried automatically, because the Gateway cannot tell whether the provider already accepted and
  charged for the work.
- `completed`, `failed`, and `cancelled` jobs older than the retention cutoff, their events, and
  their unreferenced assets are deleted. Active jobs and all other terminal states remain untouched.

Clients reconnecting to a job's event stream can resume from where they stopped using the
`Last-Event-ID` header or the `?after=` query parameter.

## HTTP surface

| Method   | Path                           | Notes                                         |
| -------- | ------------------------------ | --------------------------------------------- |
| `GET`    | `/healthz`                     | Unauthenticated, not rate limited             |
| `GET`    | `/v1/capabilities`             | Advertises concurrency and request limits     |
| `POST`   | `/v1/assets`                   | Raw image upload                              |
| `GET`    | `/v1/assets/:asset_id`         | Asset metadata                                |
| `GET`    | `/v1/assets/:asset_id/content` | Asset bytes                                   |
| `POST`   | `/v1/jobs`                     | Enqueue a generation job                      |
| `GET`    | `/v1/jobs/:job_id`             | Job state                                     |
| `DELETE` | `/v1/jobs/:job_id`             | Cancel a job                                  |
| `GET`    | `/v1/jobs/:job_id/events`      | Server Sent Events, 15 s heartbeat, resumable |

Anything else returns `404 not_found`.

## Providers

Adapters are registered by default for `sd_webui`, `novelai`, `openai_image`, and `google_image`.
`comfyui` validates in configuration but has no default runtime adapter, so a `comfyui` profile
fails startup with `GatewayRuntimeConfigurationError` before SQLite is even opened. A credential is
mandatory for `novelai`, `openai_image`, and `google_image`.

Outbound provider calls go through a single HTTP transport that refuses redirects, restricts
requests to an allowlisted route set, and injects the credential as `x-goog-api-key` for
`google_image` or `Authorization: Bearer` for everything else. Remote asset fetches are restricted to
the operation's declared origins and reject URLs carrying embedded credentials.
