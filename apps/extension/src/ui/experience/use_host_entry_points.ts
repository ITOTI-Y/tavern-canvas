import { onBeforeUnmount, onMounted } from "vue";

const PANEL_ATTRIBUTE = "data-tavern-canvas-settings";
const SLASH_COMMAND_NAME = "inkwell";

export interface HostEntryPointLabels {
  readonly name: () => string;
  readonly description: () => string;
  readonly open: () => string;
}

interface SlashCommandSurface {
  readonly SlashCommandParser?: { addCommandObject?: (command: unknown) => void };
  readonly SlashCommand?: { fromProps?: (props: Record<string, unknown>) => unknown };
}

let slash_command_registered = false;

/** SillyTavern cannot unregister slash commands, so the command is added once per page. */
function register_slash_command(help: string, on_open: () => void): void {
  if (slash_command_registered) {
    return;
  }
  const context = (
    globalThis as { SillyTavern?: { getContext?: () => SlashCommandSurface } }
  ).SillyTavern?.getContext?.();
  const command = context?.SlashCommand?.fromProps?.({
    name: SLASH_COMMAND_NAME,
    helpString: help,
    returns: "nothing",
    callback: () => {
      on_open();
      return "";
    },
  });
  if (command !== undefined && context?.SlashCommandParser?.addCommandObject !== undefined) {
    context.SlashCommandParser.addCommandObject(command);
    slash_command_registered = true;
  }
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
    title.textContent = labels.name();
    const description = document.createElement("small");
    description.textContent = labels.description();
    const button = document.createElement("div");
    button.className = "menu_button interactable";
    button.setAttribute("role", "button");
    button.tabIndex = 0;
    button.textContent = labels.open();
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
