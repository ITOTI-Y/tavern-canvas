import { f as e, l as t, s as n } from "./workflow_mapping-1vKn8khF.js";
import { n as r } from "./novelai_request_defaults-DmJSc0ed.js";
//#region src/modules/generation/build_generation_request.ts
var i = class extends Error {
	constructor() {
		super("The ComfyUI profile has no workflow; choose one in Settings > Providers"), this.name = "ComfyUiWorkflowMissingError";
	}
}, a = [
	"gpt-image-1",
	"gpt-image-1-mini",
	"gpt-image-1.5",
	"gpt-image-2",
	"gpt-image-2-2026-04-21",
	"chatgpt-image-latest"
], o = [
	"gemini-2.5-flash-image",
	"gemini-3-pro-image-preview",
	"gemini-3-pro-image",
	"gemini-3.1-flash-image"
];
function s(e, t, n) {
	return e.find((e) => e === t) ?? n;
}
var c = "0123456789abcdef";
function l(e) {
	let t = "";
	for (let n of e) t += (c[n >> 4] ?? "0") + (c[n & 15] ?? "0");
	return t;
}
async function u(e) {
	let t = new TextEncoder().encode(`${e}:${Date.now().toString()}`), n = await crypto.subtle.digest("SHA-256", t);
	return l(new Uint8Array(n));
}
async function d(e, t) {
	return f(e, t, await u(t));
}
function f(c, l, u) {
	let d = {
		request_id: l,
		generation_anchor: u,
		prompt: c.positive_prompt,
		output_count: c.image_count,
		...c.negative_prompt.trim() ? { negative_prompt: c.negative_prompt } : {}
	};
	switch (c.provider_id) {
		case "sd_webui": return {
			provider_id: "sd_webui",
			...d,
			mode: "txt2img",
			model_id: c.model_id ?? "default",
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
			...d,
			...r(c.model_id ?? "nai-diffusion-5-full"),
			...c.references.length > 0 ? { vibe_references: c.references.slice(0, 16).map((e) => ({
				asset_id: e.asset_id,
				strength: .6,
				information_extracted: 1
			})) } : {}
		};
		case "openai_image": {
			let e = c.references.length > 0;
			return {
				provider_id: "openai_image",
				...d,
				mode: e ? "edit" : "generate",
				model_id: s(a, c.model_id, "gpt-image-1"),
				size: "auto",
				quality: "auto",
				background: "auto",
				output_format: "png",
				input_asset_ids: e ? c.references.map((e) => e.asset_id) : []
			};
		}
		case "google_image": return {
			provider_id: "google_image",
			...d,
			model_id: s(o, c.model_id, "gemini-2.5-flash-image"),
			reference_asset_ids: c.references.slice(0, 14).map((e) => e.asset_id),
			aspect_ratio: "1:1",
			image_size: "1K",
			output_mime_type: "image/png"
		};
		case "comfyui": {
			let r = c.comfyui;
			if (r === void 0) throw new i();
			let { mapping: a } = r.mapped, o = t(a);
			if (o.length > 0) throw new n(o);
			let { negative_prompt: s, ...l } = d;
			return {
				provider_id: "comfyui",
				...a.inputs.negative_prompt === void 0 || s === void 0 ? l : d,
				workflow_id: r.workflow_id,
				placeholder_values: e(r.mapped, r.defaults),
				input_asset_bindings: {},
				output_node_ids: [...a.output_node_ids],
				...a.inputs.seed === void 0 ? {} : { seed: crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] ?? 0 }
			};
		}
	}
}
//#endregion
export { i as ComfyUiWorkflowMissingError, d as build_generation_request, f as build_provider_request, u as compute_generation_anchor };
