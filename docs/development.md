# Development

`pnpm build` writes the shipped runtime into `dist/`, and SillyTavern loads that file. Rebuilding
after every edit is the wrong loop for UI work: it discards the running Studio's state, so any
change to a dialog, a scrolled list, or a half-filled form costs a rebuild plus the clicks to get
back to where you were.

Three dev servers replace that loop. Each serves the real, unmodified production component tree
through Vite's dev server, so a saved file reaches the running Studio over HMR instead of a
rebuild.

| Command              | Port | What it boots                                                          | Needs SillyTavern |
| -------------------- | ---- | ---------------------------------------------------------------------- | ----------------- |
| `pnpm dev`           | 5180 | `AppRoot.vue` in a real Shadow Root, wired to deterministic mock ports | No                |
| `pnpm dev:host`      | 5181 | The real`bootstrap.ts` against a fake SillyTavern/TavernHelper globals | No                |
| `pnpm dev:extension` | 5182 | The real`bootstrap.ts` inside your actual running SillyTavern          | Yes               |

`pnpm dev` is an alias for `pnpm dev:studio`.

## Choosing one

**`pnpm dev`** covers component work, layout, styling, and interaction. It mounts the same
`AppRoot.vue` that production mounts, in a real Shadow Root, with the same stylesheet — the one
substitution is `capabilities`, which comes from `tests/harness/src/mock_capabilities.ts` instead
of the real composition root. Open http://localhost:5180/studio_host.html.

Two query parameters select state, the same way the Playwright suite does:

```text
?scenario=full|empty|loading|partial|error    # default: full
&locale=en|zh-CN                              # default: en
```

**`pnpm dev:host`** covers host adapters, the capability probe, the composition root, storage, and
migration. It boots the shipped `bootstrap_tavern_canvas` against the fake host global object graph
in `tests/harness/src/all_host_environment.ts`, backed by a real IndexedDB. Open
http://localhost:5181/sillytavern_host.html, or `tauri_host.html` for the Tauri surface.

Its query parameters are documented in `tests/harness/src/all_host_boot.ts`; the most useful are
`?reset=1` for a clean database, `?legacy=v2` to boot against a v2 settings fixture, and
`?helper=missing` to see the blocked-startup screen.

**`pnpm dev:extension`** is the only one that exercises a real chat, a real TavernHelper, and real
provider traffic. It is also the slowest loop to set up, so reach for it when the other two cannot
answer the question.

## Loading the dev server into a real SillyTavern

`tools/dev_loader/` is a small SillyTavern extension whose entire job is to import the extension
from the dev server rather than from a built file. Install it once:

1. Copy `tools/dev_loader/` into SillyTavern's third-party extension directory as its own folder,
   e.g. `<SillyTavern>/data/<user>/extensions/tavern-canvas-dev/` — or symlink it, so edits to the
   loader itself do not need re-copying.
2. Disable or remove the normal TavernCanvas extension. Both bootstrap into
   `#tavern-canvas-root`, and the second one to load silently replaces the first one's element
   while the first one's Vue app, subscriptions, and database handles keep running.
3. Run `pnpm dev:extension` in this repository.
4. Reload SillyTavern.

If the dev server is not running, the loader logs a single explanatory error to the console and
SillyTavern starts normally without the extension.

The loader points at `http://localhost:5182`. Under WSL that address usually works unchanged from
the Windows side; the dev server binds every interface, so if it does not, substitute the address
Vite prints as `Network:` in both `tools/dev_loader/loader.js` and `DEV_ORIGIN` in
`apps/extension/vite.config.dev.ts`. They must agree: the second one is what makes the Shadow Root
stylesheet's font URL absolute.

Nothing about this touches `dist/`, which `pnpm verify:dist` requires to stay byte-identical to
what is committed.

## What hot reloads

Vue components hot reload in place, keeping application state.

CSS hot reloads too, which needs an explanation, because it does not work by default here. Every
first-party stylesheet reaches the browser as a plain string through `runtime_stylesheet.ts`'s
`?inline` imports and is injected into the Shadow Root's own `<style>` element. An `?inline` import
is a JS module exporting text, so it never self-accepts the way a normal `import "./x.css"` does,
and the invalidation would walk all the way up to the entry and fall back to a full page reload.
`apps/extension/src/dev/stylesheet_hmr.ts` is the boundary that stops that walk: it accepts the
dependency and hands the new text to every subscriber, each of which writes it back over the
`<style>` element it owns. Entries import the stylesheet from that module instead of from
`runtime_stylesheet.ts` directly, which is what keeps it the single importer.

`import.meta.hot` is statically undefined in a production build, so that whole module drops out of
`dist/` through tree shaking.

Editing an entry file itself (`studio_host.ts`, `all_host_boot.ts`, `dev_entry.ts`) reloads the
page, as does editing a Vite config.

## How the dev servers differ from the shipped build

Worth knowing before concluding that something is broken in production, or fixed:

- **Vue runs its development build.** `apps/extension/vite.config.ts` defines
  `process.env.NODE_ENV` as `"production"`; the dev configs do not. You get Vue's runtime warnings
  and devtools support, and slightly different performance characteristics.
- **Asset URLs are absolute through a different mechanism.** The shipped build emits
  `__TAVERN_CANVAS_ASSET_URL__` markers that `runtime_stylesheet.ts` substitutes at runtime from
  `import.meta.url`. The dev server has no build step to emit markers, so
  `vite.config.dev.ts` sets `server.origin` and Vite writes absolute URLs directly. The effect is
  the same; the code path is not.
- **CSS Modules also inject into the host page's `<head>`.** Vite's dev transform of a
  `*.module.css` import adds a `<style>` element to the document, in addition to the Shadow Root
  copy that actually styles the extension. Every rule in those files is scoped, including the
  `:global()` ones, which are all anchored under a scoped class — so this does not affect
  SillyTavern's own styling. It does not happen in a build.
- **Web Workers cannot start under `pnpm dev:extension`.** A Worker script must be same-origin,
  and there the page is SillyTavern's while the modules come from the dev server, so
  `new Worker(new URL(..., import.meta.url))` throws `SecurityError`. Two call sites do this.
  `dev_entry.ts` declines the vocabulary worker up front, which turns it into that capability's own
  designed unavailable state with a reason visible in Diagnostics. The NovelAI tokenizer
  (`tokenizer_service.ts`) has no injection point at the bootstrap layer, so the first
  `count_tokens()` call throws despite that method's "never throws" contract; this only affects the
  NovelAI prompt editor's live token-budget display. Both workers run normally under `pnpm dev` and
  `pnpm dev:host`, where the page and the modules share an origin — debug worker-backed features
  there.
- **No bundle gates run.** `assert_bundle.mjs`, the bundle budget, and the first-party source
  policy all read `dist/`, which no dev server writes. Run `pnpm check` before trusting a change.

## Before opening a PR

```bash
pnpm check            # lint, format, typecheck, unit tests, build, and the source policy gates
pnpm test:e2e         # Playwright end to end tests
```

`pnpm check` runs `pnpm build`, which rewrites `dist/`. Commit that change with the rest.
