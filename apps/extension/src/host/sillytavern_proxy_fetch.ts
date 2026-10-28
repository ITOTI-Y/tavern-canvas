import type { PageTextFetcher } from "../modules/novelai/novelai_service.js";

/**
 * SillyTavern's `/proxy/` relay, enabled by `enableCorsProxy: true` in its config.yaml. A disabled
 * relay answers 404, which is reported as the reason the refresh failed.
 */
export function create_sillytavern_proxy_fetcher(
  fetch_impl: typeof fetch = globalThis.fetch.bind(globalThis),
): PageTextFetcher {
  return async (url, signal) => {
    const response = await fetch_impl(`/proxy/${url}`, { signal });
    if (response.status === 404) {
      throw new Error("SillyTavern's CORS proxy is disabled (set enableCorsProxy: true)");
    }
    if (!response.ok) {
      throw new Error(`the SillyTavern CORS proxy answered ${String(response.status)}`);
    }
    return response.text();
  };
}
