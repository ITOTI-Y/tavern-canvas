import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

const ENTRY_ATTRIBUTE = "data-tavern-canvas-menu-entry";

/**
 * Adds an item to SillyTavern's extensions (wand) menu. `available` stays false on a page without
 * that menu, so the caller can fall back to the floating entry.
 */
export function use_extensions_menu_entry(label: () => string, on_open: () => void): Ref<boolean> {
  const available = ref(false);
  let entry: HTMLElement | null = null;

  onMounted(() => {
    const menu = document.getElementById("extensionsMenu");
    if (menu === null) {
      return;
    }
    menu.querySelector(`[${ENTRY_ATTRIBUTE}]`)?.remove();
    entry = document.createElement("div");
    entry.className = "list-group-item flex-container flexGap5 interactable";
    entry.setAttribute(ENTRY_ATTRIBUTE, "");
    entry.setAttribute("role", "button");
    entry.tabIndex = 0;
    const icon = document.createElement("div");
    icon.className = "fa-solid fa-image extensionsMenuExtensionButton";
    const text = document.createElement("span");
    text.textContent = label();
    entry.append(icon, text);
    entry.addEventListener("click", on_open);
    menu.append(entry);
    available.value = true;
  });

  onBeforeUnmount(() => {
    entry?.remove();
  });

  return available;
}
