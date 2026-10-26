// Concrete adapters without the package barrel: the transports import the barrel statically, so a
// dynamic import of it would defer nothing.
export { ComfyUiAdapter, type ComfyUiAdapterOptions } from "./comfyui/comfyui_adapter.js";
export {
  GoogleImageAdapter,
  type GoogleImageAdapterOptions,
} from "./google_image/google_image_adapter.js";
export { NovelAiAdapter, type NovelAiAdapterOptions } from "./novelai/novelai_adapter.js";
export {
  OpenAiImageAdapter,
  type OpenAiImageAdapterOptions,
} from "./openai_image/openai_image_adapter.js";
export { SdWebuiAdapter, type SdWebuiAdapterOptions } from "./sd_webui/sd_webui_adapter.js";
