# TavernCanvas Gateway

The Gateway is a self hosted HTTP service that accepts image generation jobs, calls the configured
image providers with credentials that never reach the browser, stores the resulting images, and
reports progress over Server Sent Events.

## Status in 3.0.0

The service is complete and covered by tests. The 3.0.0 extension does not yet route generation
through it: the extension's job executor cannot drive the Gateway transport, and because a
configured Gateway endpoint outranks every other transport, setting a Gateway endpoint in the
extension makes the generation capability unavailable. Run the Gateway if you are developing against
it or preparing for a later release. Do not configure a Gateway endpoint in the extension in 3.0.0.

Everything below documents the service as it behaves today.

## Running it

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm --filter @tavern-canvas/gateway build
pnpm --filter @tavern-canvas/gateway start
```

Node 24 or newer. Configuration comes entirely from environment variables read once at startup.
Nothing loads a `.env` file automatically; export the variables yourself or pass
`node --env-file=<file>`. A relative `TAVERN_CANVAS_DATA_DIR` resolves against the process working
directory, so start the service from a stable directory.

`SIGINT` and `SIGTERM` stop the runtime cleanly.

## Configuration

| Variable                            | Default          | Notes                                                                    |
| ----------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| `TAVERN_CANVAS_BIND_HOST`           | `127.0.0.1`      | Must be an IP literal or `localhost`.                                    |
| `TAVERN_CANVAS_BIND_PORT`           | `8787`           | 1–65535.                                                                 |
| `TAVERN_CANVAS_CORS_ORIGINS`        | required         | JSON array of 1–128 exact origins.                                       |
| `TAVERN_CANVAS_BEARER_TOKEN_HASHES` | required         | JSON array of 1–128 lowercase hex SHA-256 digests.                       |
| `TAVERN_CANVAS_PROVIDER_PROFILES`   | required         | JSON array of 1–128 profiles with unique `profile_id` and `provider_id`. |
| `TAVERN_CANVAS_DATA_DIR`            | `output/gateway` | Rejects `..` segments and NUL bytes.                                     |
| `TAVERN_CANVAS_CONCURRENCY`         | `2`              | 1–64 simultaneously executing jobs.                                      |
| `TAVERN_CANVAS_MAX_REQUEST_BYTES`   | `2000000`        | JSON body limit, 1_024–20_000_000.                                       |
| `TAVERN_CANVAS_MAX_IMAGE_BYTES`     | `20000000`       | Image upload limit, 1_024–100_000_000.                                   |
| `TAVERN_CANVAS_MAX_IMAGE_PIXELS`    | `40000000`       | 1–200_000_000.                                                           |
| `TAVERN_CANVAS_MAX_IMAGE_DIMENSION` | `8192`           | 1–32_768.                                                                |

There are no other configuration variables. A malformed value fails startup with a
`GatewayConfigError` that names the offending field path and never echoes the value. Token hashes
and provider credentials are wrapped so that logging, `toString`, `toJSON`, and `util.inspect` all
yield `[REDACTED]`.

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
printf '%s' "$token" | sha256sum   # the hex digest goes in TAVERN_CANVAS_BEARER_TOKEN_HASHES
printf '%s\n' "$token"             # give this to the client; the Gateway never sees it again
```

There is no CLI or API endpoint that mints, rotates, or revokes tokens.

### Rotation and revocation

Configuration is read once at startup. There is no reload endpoint and no `SIGHUP` handler, so both
rotation and revocation mean editing the environment and restarting.

Rotate without downtime for clients by using the fact that up to 128 digests are accepted at once:

1. Add the new token's digest alongside the old one and restart. Both tokens now work.
2. Move clients to the new token.
3. Remove the old digest and restart.

To revoke immediately, remove the digest and restart.

Two consequences deserve care. Jobs carry no owner: the `jobs` table has no token column, and the
job routes authorize on `job_id` alone, so any valid token can read or cancel any job, and revoking
a token does not cancel or orphan the work it created. And because revocation requires a restart,
in flight jobs are aborted by the shutdown path and then resumed by the recovery path on the next
boot, regardless of which token created them. If a token is compromised, treat every job and every
stored asset as exposed.

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
| Images per job         | 4, fixed by the contract                               |
| Provider response body | 100 MB, or the profile's `max_response_bytes` if lower |

Exceeding the rate limit returns `429 rate_limited` with `retryable: true`; the limiter is mounted on
`/v1` only, so `/healthz` is not rate limited. An oversized JSON body returns `413 request_too_large`.

Uploads accept `image/png`, `image/jpeg`, and `image/webp` only. The type is sniffed from the bytes
rather than trusted from a header, multi page images are rejected, and accepted images are
re-encoded canonically before storage.

The pending job queue is unbounded. Nothing rejects a client that enqueues faster than
`TAVERN_CANVAS_CONCURRENCY` drains, so a queue can grow until the process runs out of memory.

**There is no retention or cleanup.** Jobs, job events, and stored image blobs accumulate
indefinitely; no code path prunes, vacuums, or expires them. Plan disk capacity accordingly and prune
by hand if needed.

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
next boot. On startup the worker reloads every job in `queued`, `preparing`, `submitting`, or
`running` and applies these rules:

- `preparing` returns to `queued`, its submission cleared, recorded as a `recovered` event, and runs
  again.
- `submitting` or `running` **with** a persisted queryable submission is requeued, and polling
  resumes from the stored submission id. The provider is not asked to generate a second time.
- `submitting` or `running` **without** a persisted submission fails with
  `provider_unavailable`, `retryable: true`, recorded as `recovered_without_submission`. It is not
  retried automatically, because the Gateway cannot tell whether the provider already accepted and
  charged for the work.
- Terminal jobs, comprising `completed`, `failed`, `cancelled`, `attached`, and `orphaned`, are left
  untouched.

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
