# Inkwell

Inkwell (repository `tavern-canvas`) is a SillyTavern and TauriTavern extension that generates images for chat messages. It builds
prompts from chat context, dispatches generation jobs to an image provider, and stores the results
in the browser alongside the message that anchored them.

The extension ships as a Vue application mounted in a Shadow Root, with a workbench, a prompt
builder, an asset library, a gallery, a diagnostics view, and settings. A separate self hosted
Gateway service is included in this repository, and generation can be routed through it so provider
credentials never reach the browser; see [Providers and transports](#providers-and-transports).

## Requirements

| Requirement     | Version                                                               |
| --------------- | --------------------------------------------------------------------- |
| SillyTavern     | 1.18.0 or newer (`minimum_client_version`)                            |
| JS Slash Runner | 4.9.1 or newer (`minimum_tavern_helper_version`, enforced at startup) |

JS Slash Runner is a hard dependency, declared in `manifest.json` as `dependencies: ["third-party/JS-Slash-Runner"]`.
At startup the extension probes the host for the capabilities it needs, comprising main generation
events, private prompt generation, message swipe metadata, host image upload, and the TavernHelper
API. If the probe fails, the extension renders a blocked screen naming the required version and
linking to https://github.com/N0VI028/JS-Slash-Runner instead of starting.

## Installation

Install through SillyTavern's extension installer using this repository URL:

```text
https://github.com/ITOTI-Y/tavern-canvas
```

SillyTavern clones the repository root and reads `manifest.json`, which points at `dist/index.js`
and `dist/index.css`. The built runtime is committed, so no build step runs on the host.

## Opening the workbench

The Studio mounts itself when the extension loads. It creates a `#tavern-canvas-root` element on
`document.body` with an open Shadow Root, and that host element is a fixed, full viewport surface at
`z-index: 2147483000`. There is no slash command, toolbar button, or extensions menu entry.

Settings offers an optional floating entry point. With it enabled the shell stays unmounted until
the draggable button is clicked; with it disabled, which is the default, the shell renders directly
and no entry button exists in the DOM.

The workbench is the default route. The other routes are Prompt, Assets, Gallery, Diagnostics, and
Settings, reachable from the desktop icon rail or the mobile bottom navigation.

## Providers and transports

Five image providers have adapters:

| Provider id    | Name         | Endpoint kind             |
| -------------- | ------------ | ------------------------- |
| `sd_webui`     | SD WebUI     | A server you run yourself |
| `comfyui`      | ComfyUI      | A server you run yourself |
| `novelai`      | NovelAI      | Cloud vendor              |
| `openai_image` | OpenAI Image | Cloud vendor              |
| `google_image` | Google Image | Cloud vendor              |

A configured Gateway endpoint carries every request; without one, the profile's provider and
endpoint decide which transport does.

**Loopback providers.** `sd_webui` and `comfyui` are reached over a direct browser call to the
`base_url` on the active profile. That URL must be a loopback address; a non loopback endpoint is
rejected with `Direct provider endpoint must use a loopback address`. These providers need no
credential handling from the host and no extra configuration.

**Cloud providers.** `novelai`, `openai_image`, and `google_image` are called directly from the
browser to the vendor's own origin, using a credential stored in SillyTavern's secret store and
referenced by the profile. The routes and auth headers are fixed by a built in catalog, so a cloud
profile cannot be pointed at an arbitrary host.

### NovelAI

The NovelAI profile drives NAI Diffusion V3, V4, V4.5 and V5 through `image.novelai.net`:
text-to-image with multi-character prompts and positions, img2img, inpainting, vibe transfer,
character references, the Director tools (background removal, line art, sketch, colourise,
emotion, declutter) and 2× upscaling. Each model only exposes what NovelAI's own client offers for
it; V5, for example, has no vibe transfer or character references. Quality tags and
undesired-content presets are added to the prompt exactly as NovelAI's web client adds them.

Vibe images are encoded once per model and `information_extracted` value and cached in the
browser, because NovelAI bills every encoding (2 Anlas). Source images, masks and references are
resized or padded to the sizes NovelAI expects before the job is queued.

The account view reads the subscription tier, Anlas balance and the Opus V5 allowance from
`/user/subscription`, and the cost estimate follows the formula NovelAI's web client shows,
including the Opus free image (up to 1024×1024 pixels and 28 steps). NovelAI's server remains the
authority on what is charged.

The model list ships with the extension and is regenerated with
`pnpm exec tsx packages/contracts/scripts/update_novelai_model_ids.ts`. Refreshing it at runtime
reads novelai.net through SillyTavern's CORS proxy, which needs `enableCorsProxy: true` in
`config.yaml`. A model the extension does not know yet is offered for text-to-image only.

### Direct cloud calls require `allowKeysExposure`

A direct cloud call has to read the stored credential back out of SillyTavern, through
`POST /api/secrets/find`. SillyTavern gates that endpoint behind a configuration flag that is off by
default. Until you turn it on, every direct cloud generation fails closed with:

> SillyTavern refused to reveal the stored credential. Set allowKeysExposure to true in config.yaml
> to allow direct provider calls, or route this profile through the Gateway instead.

To enable it, set `allowKeysExposure: true` in SillyTavern's `config.yaml` and restart SillyTavern.

Understand what that flag does before enabling it: it lets any page script running in your
SillyTavern session read your stored API keys in plaintext, not only this extension. If that is not
acceptable, use a loopback provider instead. Storing a credential and checking whether one exists do
not need the flag; only reading it back does.

### Routing generation through the Gateway

The Gateway is the alternative to letting the browser hold provider credentials at all. Configuring
an endpoint in Settings is the opt in: a configured Gateway outranks every other transport, so all
image generation goes through it and the vendor credentials stay on the Gateway host.

Two settings make it work, both under **Settings > Gateway**:

1. The **Gateway endpoint**, an `http://` or `https://` origin.
2. The **Gateway access token**, the bearer token the Gateway was configured with. The plaintext
   goes straight to SillyTavern's secret store; settings keep only a reference to it, and it is
   never shown, exported, or written to a support bundle.

Both are required. If an endpoint is set with no token stored, generation reports
`A Gateway endpoint is configured but no Gateway access token is stored` in Diagnostics rather than
failing silently, and an unacknowledged `http://` origin reports
`Cleartext Gateway origin has not been acknowledged` until you acknowledge it. Clearing the endpoint
returns generation to the direct transports.

In this mode the extension never names a provider URL and never holds a provider credential: it
submits one job, follows it over Server Sent Events with a polling fallback, downloads the finished
image from the Gateway, and stores it exactly as a directly generated image is stored. Cancelling a
job cancels it on the Gateway too. `allowKeysExposure` is still needed to read the Gateway token
back out of SillyTavern's secret store, but no provider key ever has to be stored in the browser
session at all.

See [docs/gateway.md](docs/gateway.md) for the service's own configuration, security model, and
operational procedures.

## Your data stays local

Generated images, prompts, presets, character profiles, knowledge entries, vocabulary packages, and
job records live in the browser, in an IndexedDB database named `tavern_canvas_v3`. Image bytes are
stored content addressed by SHA-256 in that same database. Settings live in SillyTavern's own
extension settings under the key `tavern_canvas`.

The extension stores no credentials, only references to secrets held by SillyTavern. Provider
payloads are checked for credential shaped keys and rejected if any are found.

There is no telemetry and no analytics. The only requests the extension makes are to the provider
endpoints you configure or to the Gateway endpoint if one is set, plus the vocabulary catalog if you
open the vocabulary panel; see
[docs/vocabulary-packages.md](docs/vocabulary-packages.md). The support bundle in Diagnostics is
generated locally, redacts settings, and is downloaded as a file rather than uploaded.

## Cleartext connections

The Gateway client refuses to use an `http://` origin until you acknowledge that specific origin in
settings. On an `http://` connection the request, the bearer token, and the generated images all
cross the network in cleartext, readable and modifiable by anything on the path. A loopback origin
keeps traffic on your own machine; any other host does not. Prefer HTTPS through a reverse proxy for
anything beyond loopback.

## Migrating from v2 and backups

Settings has a Data section with both.

**Migration** imports v2 (`st-chatu8`) settings, gallery records, configuration images, and
same-origin host image files. It is resumable and idempotent, tracked in a migration journal, and
reports its state and any failure reason. Missing or invalid image bytes fail verification before
the active namespace switches, so the v2 source remains untouched. Legacy data cleanup is not
implemented; remove the v2 extension by hand once migration reports completion.

**Export** writes a ZIP archive containing a manifest, checksums, one JSONL file per record store,
and content addressed image assets. Credentials, Gateway tokens, logs, and support bundles are
excluded by design. **Import** merges an archive into the active namespace and never deletes
existing data.

Export covers the active namespace only. It does not cover the Gateway's own state, which is
documented separately in [docs/gateway.md](docs/gateway.md).

## Building from source

Requires Node 24 or newer and pnpm 11.20.0, which Corepack will provision.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm build
```

`pnpm build` writes the extension runtime into the repository root `dist/`.

Rebuilding after every edit is the wrong loop for development. Three dev servers serve the real,
unmodified component tree with hot module replacement instead, two of them without SillyTavern
running at all; see [Development](docs/development.md).

Other useful commands:

```bash
pnpm check            # lint, format, typecheck, unit tests, build, and the source policy gates
pnpm test             # unit and integration tests
pnpm test:e2e         # Playwright end to end tests
pnpm package:extension # writes output/release/tavern-canvas.zip and its SHA-256 sidecar
pnpm verify:release   # the full release gate
```

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## Third party components

Bundled dependencies, fonts, tokenizer assets, and vocabulary data sources are listed with their
licenses in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

No license is granted for TavernCanvas source code in this release. Public access to the repository
does not grant permission to copy, modify, or redistribute the code.
