import type { InjectionKey } from "vue";

export const PORTAL_TARGET_KEY: InjectionKey<HTMLElement> = Symbol("tavern-canvas-portal-target");

export interface ShadowRootSurface {
  readonly host_element: HTMLElement;
  readonly shadow_root: ShadowRoot;
  readonly app_element: HTMLElement;
  readonly portal_element: HTMLElement;
  remove(): void;
}

export function create_shadow_root(document_: Document, stylesheet: string): ShadowRootSurface {
  document_.getElementById("tavern-canvas-root")?.remove();

  const host_element = document_.createElement("div");
  host_element.id = "tavern-canvas-root";
  const shadow_root = host_element.attachShadow({ mode: "open" });

  const style_element = document_.createElement("style");
  style_element.textContent = stylesheet;
  shadow_root.append(style_element);

  const app_element = document_.createElement("div");
  app_element.dataset.shadowRole = "app";
  shadow_root.append(app_element);

  const portal_element = document_.createElement("div");
  portal_element.dataset.shadowRole = "portal";
  shadow_root.append(portal_element);

  document_.body.append(host_element);

  return {
    host_element,
    shadow_root,
    app_element,
    portal_element,
    remove() {
      host_element.remove();
    },
  };
}
