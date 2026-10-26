import chat_stylesheet from "./chat.module.css?inline";

const STYLE_ELEMENT_ID = "tavern-canvas-chat-style";

/** The chat layer renders into SillyTavern's own DOM, so its rules go to the page head instead of the shadow root. */
export function install_chat_stylesheet(document_: Document): () => void {
  document_.getElementById(STYLE_ELEMENT_ID)?.remove();
  const style_element = document_.createElement("style");
  style_element.id = STYLE_ELEMENT_ID;
  style_element.textContent = chat_stylesheet;
  document_.head.append(style_element);
  return () => {
    style_element.remove();
  };
}
