// Mirrors apps/extension/src/vue.d.ts: plain `tsc` (tests/tsconfig.json's `pnpm typecheck` pass,
// unlike apps/extension's own `vue-tsc`) has no built-in understanding of `.vue` Single-File
// Components. studio_host.ts imports apps/extension/src/ui/AppRoot.vue directly (mounting the
// real production component tree) -- that shim isn't reachable from here (outside tests/
// tsconfig.json's include glob), so this is its own copy, scoped to this harness.
declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent;
  export default component;
}
