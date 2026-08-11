//#region src/ui/views/workbench/build_generation_request.ts
var e = class extends Error {
	code = "workbench_provider_unsupported";
	constructor(e) {
		super(`Workbench cannot build a generation request for provider "${e}" yet.`), this.name = "UnsupportedProviderError";
	}
}, t = [
	"gpt-image-1",
	"gpt-image-1-mini",
	"gpt-image-1.5",
	"gpt-image-2",
	"gpt-image-2-2026-04-21",
	"chatgpt-image-latest"
], n = [
	"gemini-2.5-flash-image",
	"gemini-3-pro-image-preview",
	"gemini-3-pro-image",
	"gemini-3.1-flash-image"
];
function r(e, t, n) {
	return e.find((e) => e === t) ?? n;
}
var i = "0123456789abcdef";
function a(e) {
	let t = "";
	for (let n of e) t += (i[n >> 4] ?? "0") + (i[n & 15] ?? "0");
	return t;
}
async function o(e) {
	let t = new TextEncoder().encode(`${e}:${Date.now().toString()}`), n = await crypto.subtle.digest("SHA-256", t);
	return a(new Uint8Array(n));
}
async function s(e, t) {
	return c(e, t, await o(t));
}
function c(i, a, o) {
	let s = {
		request_id: a,
		generation_anchor: o,
		prompt: i.positive_prompt,
		output_count: i.image_count,
		...i.negative_prompt.trim() ? { negative_prompt: i.negative_prompt } : {}
	};
	switch (i.provider_id) {
		case "sd_webui": return {
			provider_id: "sd_webui",
			...s,
			mode: "txt2img",
			model_id: i.model_id ?? "default",
			sampler: "euler_a",
			scheduler: "normal",
			width: 512,
			height: 512,
			steps: 20,
			cfg_scale: 7
		};
		case "novelai": return {
			provider_id: "novelai",
			...s,
			model_id: i.model_id ?? "nai-diffusion-4-5-full",
			sampler: "k_euler",
			width: 832,
			height: 1216,
			steps: 28,
			scale: 5,
			cfg_rescale: 0,
			noise_schedule: "native",
			quality_toggle: !0,
			undesired_content_preset: "none",
			smea: !1,
			dyn: !1,
			...i.references.length > 0 ? { vibe_references: i.references.slice(0, 4).map((e) => ({
				asset_id: e.asset_id,
				strength: .6,
				information_extracted: 1
			})) } : {}
		};
		case "openai_image": {
			let e = i.references.length > 0;
			return {
				provider_id: "openai_image",
				...s,
				mode: e ? "edit" : "generate",
				model_id: r(t, i.model_id, "gpt-image-1"),
				size: "auto",
				quality: "auto",
				background: "auto",
				output_format: "png",
				input_asset_ids: e ? i.references.map((e) => e.asset_id) : []
			};
		}
		case "google_image": return {
			provider_id: "google_image",
			...s,
			model_id: r(n, i.model_id, "gemini-2.5-flash-image"),
			reference_asset_ids: i.references.slice(0, 14).map((e) => e.asset_id),
			aspect_ratio: "1:1",
			image_size: "1K",
			output_mime_type: "image/png"
		};
		case "comfyui": throw new e(i.provider_id);
	}
}
//#endregion
export { c as n, s as t };
