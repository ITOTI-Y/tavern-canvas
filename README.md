# Inkwell

Inkwell (repository `tavern-canvas`) is a SillyTavern and TauriTavern extension that illustrates
chat replies. After a reply arrives, a language model picks the paragraphs worth an image and writes
tags for each; Inkwell turns them into image prompts, generates the images with the provider you
configure, and shows each image under its paragraph. The images are stored in the browser next to
the message that produced them.

The extension is a Vue application mounted in a Shadow Root. Its Studio has two views, Settings and
Gallery. A separate self hosted Gateway service in this repository can carry generation so provider
credentials never reach the browser; see [Providers and transports](#providers-and-transports).

## Requirements

| Requirement     | Version                                                               |
| --------------- | --------------------------------------------------------------------- |
| SillyTavern     | 1.18.0 or newer (`minimum_client_version`), or TauriTavern            |
| JS Slash Runner | 4.9.1 or newer (`minimum_tavern_helper_version`, enforced at startup) |

JS Slash Runner is a hard dependency, declared in `manifest.json` as
`dependencies: ["third-party/JS-Slash-Runner"]`. Paragraph analysis, message editing and world info
access all go through its TavernHelper API. At startup the extension probes the host for the
capabilities it needs; if the probe fails, it renders a blocked screen naming the required version
and linking to https://github.com/N0VI028/JS-Slash-Runner instead of starting.

## Installation

Install through the extension installer of SillyTavern or TauriTavern using this repository URL:

```text
https://github.com/ITOTI-Y/tavern-canvas
```

The host clones the repository root and reads `manifest.json`, which points at `dist/index.js` and
`dist/index.css`. The built runtime is committed, so no build step runs on the host.

## Opening Inkwell

There are three entry points. The Extensions panel gets an Inkwell block with a button that opens
the Studio, the `/inkwell` slash command opens it from the chat input, and a draggable floating
button can be turned on under **Settings > General**. When the host has no Extensions panel, the
floating button is always shown. The Studio is a full viewport overlay inside an open Shadow
Root on `#tavern-canvas-root`.

## Illustrating a reply

With **Settings > Illustration > Illustrate every reply automatically** on, every new assistant
reply is analyzed and its images are generated without further input. With it off, each reply gets
an illustrate button; it opens a dialog listing the paragraphs the analysis chose, where the
prompts can be edited, Chinese text can be translated to tags, and the NovelAI cost is shown before
anything is generated.

The analysis runs through a SillyTavern chat completion preset, by default the one currently
loaded, over the current API, a proxy preset, or a custom OpenAI compatible API. The illustration
settings also choose how much chat history and which world info the analysis sees: the world info
SillyTavern activates for the current chat (the default), the entries one chosen book activates for
the analyzed reply, or none.

Each chosen paragraph gets an image slot below it. A slot keeps every image generated for it, with
regenerate, prompt editing and paging between images. For NovelAI images a slot also offers image
to image, inpainting, 2x upscaling and the Director tools.

## The Library

**Settings > Library** holds what prompts reuse across requests.

| Tab           | Content                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| Vocabulary    | Tag packages for tag search and Chinese-to-tag translation                     |
| Characters    | Aliases, appearance tags by slot, excluded traits, default outfit, reference   |
| Outfits       | Outfit tags by slot, optionally linked to a character                          |
| LoRA          | SD WebUI LoRA file name, weight and trigger words, linked to a character       |
| Vibe transfer | NovelAI vibe transfer images, chosen per NovelAI profile under Image providers |
| Workflow      | ComfyUI workflow JSON with its placeholder mapping                             |

A character's appearance is split into eight slots: age, body, skin, hair, eyes, makeup, expression
and other features. An outfit is split into slots such as headwear, top, bottom, full body,
outerwear, legwear, footwear and accessories. When a paragraph names a library character or one of
its aliases, or the analysis reports one, the character's appearance replaces whatever the model
wrote about its looks, and the outfit the character currently wears is added. On NovelAI V4 and
later each character gets its own character prompt with its excluded traits as that character's
negative prompt, which keeps several characters from blending.

### Wardrobe tracking

After every new assistant reply, a short structured request through the analysis preset records
what each character wears in that reply: the outfit, slots taken off or replaced, and passing
states such as wet clothes. The record is stored on the reply's swipe, and a reply without its own
record inherits the latest earlier one, so an outfit change carries forward until the story changes
it again. A character the chat has not recorded yet starts in its default outfit, or else its first
linked outfit. When the reply names a character that has no outfit at all, the request's schema
requires the model to return what that character wears, from the story or its character
description, and that becomes the character's first outfit. The request uses the analysis connection; **Settings > Illustration > Wardrobe
update model** can name a different model when the connection is not the current SillyTavern API.

The same request creates library entries for named characters and outfits the library lacks. These
entries are marked as created by the analysis and belong to the current chat only; their edit form
has a button that moves them into the global library. The model may fill an empty appearance slot
of a known character, but never one the user has edited. The illustrate dialog shows an outfit
picker and a passing states field under each library character's prompt; a correction there
rewrites the prompts and is saved as the reply's record.

A character's reference image is sent only when its "send with NovelAI requests" box is ticked, and
then in the use chosen for it:

- **Vibe transfer** adds the image as a vibe reference. V5 models have no vibe transfer, so the
  image is skipped there.
- **Image to image** uses the image as the base image. When several characters ask for it, only the
  first is used.
- **Precise reference** sends the image as a NovelAI character reference. It works on V4.5 only,
  costs 5 extra Anlas per image and cannot be combined with vibe transfer, so vibes are dropped
  while it is in use. Several references blend into one person, so only the first is sent.

LoRAs apply to SD WebUI requests only: a LoRA linked to a character in the picture is added as
`<lora:file_name:weight>` together with its trigger words.

## Providers and transports

Five image providers have adapters:

| Provider id    | Name         | Endpoint kind             | Illustrates replies |
| -------------- | ------------ | ------------------------- | ------------------- |
| `sd_webui`     | SD WebUI     | A server you run yourself | Yes                 |
| `comfyui`      | ComfyUI      | A server you run yourself | No                  |
| `novelai`      | NovelAI      | Cloud vendor              | Yes                 |
| `openai_image` | OpenAI Image | Cloud vendor              | Yes                 |
| `google_image` | Google Image | Cloud vendor              | Yes                 |

A configured Gateway endpoint carries every request; without one, the active profile's provider and
endpoint decide which transport does.

**Loopback providers.** `sd_webui` and `comfyui` are reached over a direct browser call to the
`base_url` on the active profile. That URL must be a loopback address; a non loopback endpoint is
rejected with `Direct provider endpoint must use a loopback address`. The profile form has no
`base_url` field, so on a fresh install SD WebUI is used through the Gateway.

**Cloud providers.** `novelai`, `openai_image`, and `google_image` are called directly from the
browser to the vendor's own origin, with a credential from the credential backend. The routes and
auth headers are fixed by a built in catalog, so a cloud profile cannot be pointed at an arbitrary
host.

### Credential backends

**Settings > General** chooses where API keys are kept. Settings, profiles and archives only ever
hold a reference to a key.

| Backend                       | Where the key lives                                          | Reading it back                     |
| ----------------------------- | ------------------------------------------------------------ | ----------------------------------- |
| On-device encrypted (default) | IndexedDB, encrypted with a non-extractable browser key      | Always possible on this browser     |
| SillyTavern secret store      | The host's `secrets.json`                                    | Needs `allowKeysExposure: true`     |
| Passphrase vault              | IndexedDB, encrypted with a key derived from your passphrase | After unlocking, once per page load |

A direct cloud call has to read the key back. With the SillyTavern secret store, the host refuses
that until `allowKeysExposure: true` is set in `config.yaml`, and the flag lets any page script in
the session read every stored key in plaintext. TauriTavern keeps the same flag off by default,
which is why the on-device backend is the default. Switching backends does not move existing keys;
enter them again after switching.

### NovelAI

The NovelAI profile drives NAI Diffusion V3, V4, V4.5 and V5 through `image.novelai.net`:
text-to-image with multi-character prompts, img2img, inpainting, vibe transfer, character
references, the Director tools (background removal, line art, sketch, colourise, emotion,
declutter) and 2x upscaling. Each model only exposes what NovelAI's own client offers for it; V5,
for example, has no vibe transfer or character references. The profile's saved parameters, under
**Settings > Image providers**, apply to every illustration; quality tags and UC come from the
profile's presets described below.

Vibe images are encoded once per model and `information_extracted` value and cached in the
browser, because NovelAI bills every encoding (2 Anlas). Source images, masks and references are
resized or padded to the sizes NovelAI expects before the job is queued.

The account view reads the subscription tier, Anlas balance and the Opus V5 allowance from
`/user/subscription`, and the cost estimate follows the formula NovelAI's web client shows,
including the Opus free image (up to 1024x1024 pixels and 28 steps). NovelAI's server remains the
authority on what is charged. The model list ships with the extension and is regenerated with
`pnpm exec tsx packages/contracts/scripts/update_novelai_model_ids.ts`.

### Quality tags and UC presets

Every provider profile carries a quality tag preset and an undesired content (UC) preset, shown as
chips under the prompt boxes of the illustrate dialog and on each profile under **Settings > Image
providers**. Opening a chip lists NovelAI's built-in presets for every model, with their full
text, followed by your own; the check mark switches the preset on or off. Quality tags are appended
to the positive prompt and UC tags put before the negative prompt when the request is built, for
every provider, so the tags never appear in the prompt boxes. A change made in any chip is saved to
the active profile and applies to every later image, automatic illustration included.

A NovelAI profile starts with its model's Standard quality tags and Heavy UC; other providers start
with both switched off. Your own presets are managed under **Settings > Prompt presets**. A NovelAI
model that fixes its own UC preset keeps it, and no UC is injected there.

### Routing generation through the Gateway

The Gateway keeps provider credentials off the browser entirely. Configuring an endpoint under
**Settings > Connections** is the opt in: a configured Gateway outranks every other transport, so
all image generation goes through it and the vendor credentials stay on the Gateway host.

Two settings make it work:

1. The **Gateway endpoint**, an `http://` or `https://` origin.
2. The **Gateway access token**, the bearer token the Gateway was configured with. The plaintext
   goes straight to the credential backend; it is never shown, exported, or written to a support
   bundle.

If an endpoint is set with no token stored, generation reports
`A Gateway endpoint is configured but no Gateway access token is stored` in Diagnostics, and an
unacknowledged `http://` origin reports `Cleartext Gateway origin has not been acknowledged` until
you acknowledge it. Clearing the endpoint returns generation to the direct transports.

See [docs/gateway.md](docs/gateway.md) for the service's own configuration, security model, and
operational procedures.

## TauriTavern

TauriTavern is supported directly. When its chat DOM virtualization is on (TauriTavern settings,
Performance), Inkwell registers as a ChatSurface participant through the `chatSurface` hook in
`manifest.json`, so image slots are restored whenever a virtualized message is mounted again.
TauriTavern has no `/proxy` route; NovelAI generation and the account lookup work because
`image.novelai.net` answers cross origin requests.

## Your data stays local

Generated images, prompts, presets, library entries, vocabulary packages, and job records live in
the browser, in an IndexedDB database named `tavern_canvas_v3`. Image bytes are stored content
addressed by SHA-256 in that same database. Settings live in the host's extension settings under
the key `tavern_canvas`. Provider payloads are checked for credential shaped keys and rejected if
any are found.

There is no telemetry and no analytics. The only requests the extension makes are to the provider
endpoints you configure or to the Gateway endpoint if one is set, plus the vocabulary catalog if you
open the vocabulary tab; see [docs/vocabulary-packages.md](docs/vocabulary-packages.md). The
support bundle in Diagnostics is generated locally, redacts settings, and is downloaded as a file.

## Cleartext connections

The Gateway client refuses to use an `http://` origin until you acknowledge that specific origin in
settings. On an `http://` connection the request, the bearer token, and the generated images all
cross the network in cleartext. A loopback origin keeps traffic on your own machine; any other host
does not. Prefer HTTPS through a reverse proxy for anything beyond loopback.

## Backups

**Settings > General** exports a ZIP archive containing a manifest, checksums, one JSONL file per
record store, and content addressed image assets. Credentials, Gateway tokens, logs, and support
bundles are excluded. The archive covers the active namespace only, not the Gateway's own state,
which is documented in [docs/gateway.md](docs/gateway.md).

Importing an archive merges its records into the active namespace and never deletes existing data;
a record with the same id as an archived one is replaced by the archived version. Every record and
asset is verified against the checksums in a staging namespace first, so a damaged or cancelled
import leaves the current data unchanged.

## Building from source

Requires Node 24 or newer and pnpm 11.20.0, which Corepack will provision.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm build
```

`pnpm build` writes the extension runtime into the repository root `dist/`. For UI work, the dev
servers in [Development](docs/development.md) serve the real component tree with hot module
replacement instead.

Other useful commands:

```bash
pnpm check             # lint, format, typecheck, unit tests, build, and the source policy gates
pnpm test              # unit and integration tests
pnpm test:e2e          # Playwright end to end tests
pnpm package:extension # writes output/release/tavern-canvas.zip and its SHA-256 sidecar
pnpm verify:release    # the full release gate
```

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## Third party components

Bundled dependencies, fonts, and vocabulary data sources are listed with their
licenses in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

No license is granted for Inkwell source code in this release. Public access to the repository does
not grant permission to copy, modify, or redistribute the code.
