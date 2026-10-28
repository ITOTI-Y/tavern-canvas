import { onBeforeUnmount, onMounted, watchEffect } from "vue";

import { register_slash_command } from "../../host/slash_command.js";

const PANEL_ATTRIBUTE = "data-tavern-canvas-settings";

export interface HostEntryPointLabels {
  readonly name: () => string;
  readonly description: () => string;
  readonly open: () => string;
}

/**
 * Adds a block to SillyTavern's Extensions panel, where users look for an extension's settings,
 * and a `/inkwell` command. Both open the Studio.
 */
export function use_host_entry_points(labels: HostEntryPointLabels, on_open: () => void): void {
  let block: HTMLElement | null = null;

  onMounted(() => {
    register_slash_command(labels.description(), on_open);
    const panel =
      document.getElementById("extensions_settings2") ??
      document.getElementById("extensions_settings");
    if (panel === null) {
      return;
    }
    panel.querySelector(`[${PANEL_ATTRIBUTE}]`)?.remove();
    block = document.createElement("div");
    block.setAttribute(PANEL_ATTRIBUTE, "");
    block.className = "flex-container flexFlowColumn flexGap5";
    const title = document.createElement("b");
    const description = document.createElement("small");
    const button = document.createElement("div");
    // The locale resolves after mount, so the texts follow it.
    watchEffect(() => {
      title.textContent = labels.name();
      description.textContent = labels.description();
      button.textContent = labels.open();
    });
    button.className = "menu_button interactable";
    button.setAttribute("role", "button");
    button.tabIndex = 0;
    button.addEventListener("click", on_open);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        on_open();
      }
    });
    block.append(title, description, button);
    panel.append(block);
  });

  onBeforeUnmount(() => {
    block?.remove();
  });
}
