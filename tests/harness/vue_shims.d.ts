// apps/extension/src/vue.d.ts is outside the tests tsconfig include glob, so plain tsc needs its own `.vue` shim.
declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent;
  export default component;
}
