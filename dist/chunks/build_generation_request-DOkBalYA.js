import { n as e } from "./novelai_request_defaults-B4CHIiJ8.js";
//#region src/modules/generation/build_generation_request.ts
var t = class extends Error {
	code = "workbench_provider_unsupported";
	constructor(e) {
		super(`Inkwell cannot build a generation request for provider "${e}" yet.`), this.name = "UnsupportedProviderError";
	}
}, n = [
	"gpt-image-1",
	"gpt-image-1-mini",
	"gpt-image-1.5",
	"gpt-image-2",
	"gpt-image-2-2026-04-21",
	"chatgpt-image-latest"
], r = [
	"gemini-2.5-flash-image",
	"gemini-3-pro-image-preview",
	"gemini-3-pro-image",
	"gemini-3.1-flash-image"
];
function i(e, t, n) {
	return e.find((e) => e === t) ?? n;
}
var a = "0123456789abcdef";
function o(e) {
	let t = "";
	for (let n of e) t += (a[n >> 4] ?? "0") + (a[n & 15] ?? "0");
	return t;
}
async function s(e) {
	let t = new TextEncoder().encode(`${e}:${Date.now().toString()}`), n = await crypto.subtle.digest("SHA-256", t);
	return o(new Uint8Array(n));
}
async function c(e, t) {
	return l(e, t, await s(t));
}
function l(a, o, s) {
	let c = {
		request_id: o,
		generation_anchor: s,
		prompt: a.positive_prompt,
		output_count: a.image_count,
		...a.negative_prompt.trim() ? { negative_prompt: a.negative_prompt } : {}
	};
	switch (a.provider_id) {
		case "sd_webui": return {
			provider_id: "sd_webui",
			...c,
			mode: "txt2img",
			model_id: a.model_id ?? "default",
			sampler: "euler_a",
			scheduler: "normal",
			width: 512,
			height: 512,
			steps: 20,
			cfg_scale: 7
		};
		case "novelai": return {
			provider_id: "novelai",
			action: "generate",
			...c,
			...e(a.model_id ?? "nai-diffusion-5-curated"),
			...a.references.length > 0 ? { vibe_references: a.references.slice(0, 16).map((e) => ({
				asset_id: e.asset_id,
				strength: .6,
				information_extracted: 1
			})) } : {}
		};
		case "openai_image": {
			let e = a.references.length > 0;
			return {
				provider_id: "openai_image",
				...c,
				mode: e ? "edit" : "generate",
				model_id: i(n, a.model_id, "gpt-image-1"),
				size: "auto",
				quality: "auto",
				background: "auto",
				output_format: "png",
				input_asset_ids: e ? a.references.map((e) => e.asset_id) : []
			};
		}
		case "google_image": return {
			provider_id: "google_image",
			...c,
			model_id: i(r, a.model_id, "gemini-2.5-flash-image"),
			reference_asset_ids: a.references.slice(0, 14).map((e) => e.asset_id),
			aspect_ratio: "1:1",
			image_size: "1K",
			output_mime_type: "image/png"
		};
		case "comfyui": throw new t(a.provider_id);
	}
}
//#endregion
export { t as UnsupportedProviderError, c as build_generation_request, l as build_provider_request, s as compute_generation_anchor };
