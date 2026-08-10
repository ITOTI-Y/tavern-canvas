# Security policy

## Supported versions

Only the latest 3.x release receives security fixes. TavernCanvas 2.x is a separate, abandoned
codebase and receives none.

## Reporting a vulnerability

Report privately through GitHub's private vulnerability reporting on
https://github.com/ITOTI-Y/tavern-canvas, under Security, then Report a vulnerability. Do not open a
public issue for a vulnerability, and do not include working credentials or another person's data in
a report.

A useful report states the affected component, comprising the extension, the Gateway, or the
packaging and release tooling; the version or commit; the impact; and the steps to reproduce.

This is a single maintainer project with no service level commitment on response time.

## Scope

In scope:

- The extension in `apps/extension` and the packages it builds on.
- The Gateway service in `apps/gateway`.
- The release tooling in `tools/`, including anything that would let a published archive differ from
  the audited source.

Out of scope:

- SillyTavern itself and JS Slash Runner. Report those upstream.
- Image provider services and their APIs.
- Consequences of settings this project documents as risks, comprising enabling `allowKeysExposure`,
  binding the Gateway off loopback, and acknowledging a cleartext Gateway origin. Report a case where
  a documented control fails to hold, rather than the documented risk itself.

## Security model

**Credentials.** The extension stores no credentials. It stores references to secrets held by
SillyTavern and resolves a reference to plaintext only at the moment a request is dispatched, writes
it into the single vendor specified authentication header, and discards it. Provider payloads are
scanned for credential shaped keys and rejected. A direct cloud call needs SillyTavern's
`allowKeysExposure` flag, which is off by default; see the README before enabling it.

The Gateway holds provider credentials in its environment and never returns them. Bearer tokens are
stored as SHA-256 digests and compared with a timing safe comparison. Configuration values that
carry secrets are wrapped so logging, `toString`, `toJSON`, and `util.inspect` all yield
`[REDACTED]`, and log records are recursively stripped of credential shaped fields.

**Network boundaries.** The Gateway binds to `127.0.0.1` by default and has no TLS; terminate TLS in
a reverse proxy. CORS origins are matched by exact string equality with no wildcard support.
Outbound provider requests refuse redirects and are restricted to an allowlisted route set. The
extension's direct cloud routes are fixed by a built in catalog, so a profile cannot redirect a
credentialed call to an arbitrary host, and a direct loopback provider endpoint is rejected unless
it really is a loopback address. The Gateway client refuses a cleartext origin until that exact
origin is acknowledged.

**Untrusted input.** Vocabulary shard paths are held to a strict character allowlist that rejects
absolute paths, backslashes, colons, and `..`, so a manifest cannot redirect a fetch. Shard bytes are
verified by SHA-256 before use and decompression is bounded by ratio and absolute size. Archive
import enforces a path allowlist and checks each entry's declared uncompressed size before inflating
it. Gateway image uploads are type sniffed from their bytes rather than trusted from a header, and
are re-encoded before storage.

**Data locality.** User data lives in the browser. There is no telemetry and no analytics. Support
bundles are generated locally, redact settings, and are downloaded rather than uploaded. Exported
archives deliberately exclude credentials, Gateway tokens, logs, and support bundles.

## Known limitations

These are documented, not fixed, in 3.0.0:

- The Gateway retains token hashes supplied through the startup environment for the process lifetime.
  Hashes managed through the optional token hash file can be added or revoked atomically with
  `SIGHUP`; changing the startup environment list still requires a restart.
