/**
 * Loads TavernCanvas into a real running SillyTavern from the Vite dev server instead of from a
 * built dist/index.js, so an edit in the working tree reaches the running Studio through HMR.
 *
 * Installed as its own SillyTavern extension (see README.md), which keeps the repository's own
 * dist/ untouched -- `pnpm verify:dist` fails on any modification there, and pointing the real
 * extension's manifest at a dev server would mean editing a committed file on every session.
 *
 * SillyTavern loads this file as an ES module and runs helmet with `contentSecurityPolicy: false`,
 * so the cross-origin dynamic imports below are neither blocked nor rewritten. The dev server
 * supplies the matching CORS headers (apps/extension/vite.config.dev.ts).
 */

const DEV_SERVER_ORIGIN = "http://localhost:5182";

try {
  // The HMR client. Vite injects an import of this into every module that needs a hot context, so
  // importing it here is belt-and-braces -- it guarantees the websocket connects (and the error
  // overlay exists) even before any hot-capable module has loaded.
  await import(/* @vite-ignore */ `${DEV_SERVER_ORIGIN}/@vite/client`);
  await import(/* @vite-ignore */ `${DEV_SERVER_ORIGIN}/src/dev/dev_entry.ts`);
} catch (error) {
  console.error(
    `[tavern-canvas dev] Could not load the extension from ${DEV_SERVER_ORIGIN}. ` +
      `Start the dev server with \`pnpm dev:extension\` in the repository, then reload this page.`,
    error,
  );
}
