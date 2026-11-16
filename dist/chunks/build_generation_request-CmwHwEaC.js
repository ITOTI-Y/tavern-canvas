import { f as e, l as t, p as n, s as r } from "./workflow_mapping-BBTT75pE.js";
import { n as i } from "./novelai_request_defaults-DmJSc0ed.js";
//#region src/modules/generation/build_generation_request.ts
var a = class extends Error {
	constructor() {
		super("The ComfyUI profile has no workflow; choose one in Settings > Providers"), this.name = "ComfyUiWorkflowMissingError";
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
function p(l, u, d) {
	let f = {
		request_id: u,
		generation_anchor: d,
		prompt: l.positive_prompt,
		output_count: l.image_count,
		...l.negative_prompt.trim() ? { negative_prompt: l.negative_prompt } : {}
	};
	switch (l.provider_id) {
		case "sd_webui": return {
			provider_id: "sd_webui",
			...f,
			mode: "txt2img",
			model_id: l.model_id ?? "default",
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
			...f,
			...i(l.model_id ?? "nai-diffusion-5-full"),
			...l.references.length > 0 ? { vibe_references: l.references.slice(0, 16).map((e) => ({
				asset_id: e.asset_id,
				strength: .6,
				information_extracted: 1
			})) } : {}
		};
		case "openai_image": {
			let e = l.references.length > 0;
			return {
				provider_id: "openai_image",
				...f,
				mode: e ? "edit" : "generate",
				model_id: c(o, l.model_id, "gpt-image-1"),
				size: "auto",
				quality: "auto",
				background: "auto",
				output_format: "png",
				input_asset_ids: e ? l.references.map((e) => e.asset_id) : []
			};
		}
		case "google_image": return {
			provider_id: "google_image",
			...f,
			model_id: c(s, l.model_id, "gemini-2.5-flash-image"),
			reference_asset_ids: l.references.slice(0, 14).map((e) => e.asset_id),
			aspect_ratio: "1:1",
			image_size: "1K",
			output_mime_type: "image/png"
		};
		case "comfyui": {
			let i = l.comfyui;
			if (i === void 0) throw new a();
			let { mapping: o } = i.mapped, s = t(o);
			if (s.length > 0) throw new r(s);
			let { negative_prompt: c, ...u } = f, d = e(i.mapped, i.defaults);
			return {
				provider_id: "comfyui",
				...o.inputs.negative_prompt === void 0 || c === void 0 ? u : f,
				workflow_id: i.workflow_id,
				placeholder_values: n(i.mapped, i.defaults),
				input_asset_bindings: {},
				output_node_ids: [...o.output_node_ids],
				...d === void 0 ? {} : { loras: [...d] },
				...o.inputs.seed === void 0 ? {} : { seed: crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] ?? 0 }
			};
		}
	}
}
//#endregion
export { a as ComfyUiWorkflowMissingError, f as build_generation_request, p as build_provider_request, d as compute_generation_anchor };
