/**
 * The five concrete adapters, reachable without the package barrel. The barrel is imported
 * statically by the transports (for `ProviderNetworkError` and `redact_provider_log`), so a
 * dynamic `import("@tavern-canvas/providers")` would resolve to a module the initial chunk already
 * contains and defer nothing. This entry point is what the composition root loads on demand.
 */
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
