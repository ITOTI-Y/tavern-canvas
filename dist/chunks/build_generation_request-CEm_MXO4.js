import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { r as t } from "./novelai_models-CWhnujYI.js";
function n(e) {
	let n = t(e);
	if (n === null) throw Error(`"${e}" is not a NovelAI image model this extension can drive`);
	return n.profile;
}
function r(e) {
	let t = n(e);
	return {
		model_id: e,
		sampler: t.fixed_settings?.sampler ?? "k_euler_ancestral",
		width: 832,
		height: 1216,
		steps: t.fixed_settings?.steps ?? t.default_steps,
		scale: t.default_scale,
		cfg_rescale: 0,
		noise_schedule: "karras",
		quality_preset: "standard",
		undesired_content_preset: t.fixed_settings?.undesired_content_preset ?? "heavy",
		smea: !1,
		dyn: !1,
		variety_plus: !1
	};
}
//#endregion
//#region src/ui/views/workbench/build_generation_request.ts
var i = /* @__PURE__ */ e({
	UnsupportedProviderError: () => a,
	build_generation_request: () => f,
	build_provider_request: () => p,
	compute_generation_anchor: () => d
}), a = class extends Error {
	code = "workbench_provider_unsupported";
	constructor(e) {
		super(`Workbench cannot build a generation request for provider "${e}" yet.`), this.name = "UnsupportedProviderError";
	}
}, o = [
	"gpt-image-1",
	"gpt-image-1-mini",
	"gpt-image-1.5",
	"gpt-image-2",
	"gpt-image-2-2026-04-21",
	"chatgpt-image-latest"
], s = [
	"gemini-2.5-flash-image",
	"gemini-3-pro-image-preview",
	"gemini-3-pro-image",
	"gemini-3.1-flash-image"
];
function c(e, t, n) {
	return e.find((e) => e === t) ?? n;
}
var l = "0123456789abcdef";
function u(e) {
	let t = "";
	for (let n of e) t += (l[n >> 4] ?? "0") + (l[n & 15] ?? "0");
	return t;
}
async function d(e) {
	let t = new TextEncoder().encode(`${e}:${Date.now().toString()}`), n = await crypto.subtle.digest("SHA-256", t);
	return u(new Uint8Array(n));
}
async function f(e, t) {
	return p(e, t, await d(t));
}
function p(e, t, n) {
	let i = {
		request_id: t,
		generation_anchor: n,
		prompt: e.positive_prompt,
		output_count: e.image_count,
		...e.negative_prompt.trim() ? { negative_prompt: e.negative_prompt } : {}
	};
	switch (e.provider_id) {
		case "sd_webui": return {
			provider_id: "sd_webui",
			...i,
			mode: "txt2img",
			model_id: e.model_id ?? "default",
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
			...i,
			...r(e.model_id ?? "nai-diffusion-5-curated"),
			...e.references.length > 0 ? { vibe_references: e.references.slice(0, 16).map((e) => ({
				asset_id: e.asset_id,
				strength: .6,
				information_extracted: 1
			})) } : {}
		};
		case "openai_image": {
			let t = e.references.length > 0;
			return {
				provider_id: "openai_image",
				...i,
				mode: t ? "edit" : "generate",
				model_id: c(o, e.model_id, "gpt-image-1"),
				size: "auto",
				quality: "auto",
				background: "auto",
				output_format: "png",
				input_asset_ids: t ? e.references.map((e) => e.asset_id) : []
			};
		}
		case "google_image": return {
			provider_id: "google_image",
			...i,
			model_id: c(s, e.model_id, "gemini-2.5-flash-image"),
			reference_asset_ids: e.references.slice(0, 14).map((e) => e.asset_id),
			aspect_ratio: "1:1",
			image_size: "1K",
			output_mime_type: "image/png"
		};
		case "comfyui": throw new a(e.provider_id);
	}
}
//#endregion
export { i as n, f as t };
