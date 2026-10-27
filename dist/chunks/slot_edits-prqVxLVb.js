import { t as e } from "./ids-stC4fUL8.js";
import { t } from "./novelai-Ckd0H4Ml.js";
import { n } from "./novelai_request_defaults-B0sJ9ANr.js";
import { n as r } from "./inpaint_session-wWdlKjTY.js";
//#region src/modules/illustration/slot_edits.ts
var i = 64;
function a(e) {
	let n = Math.min(1, Math.sqrt(t / (e.width * e.height))), r = (e) => Math.max(i, Math.floor(e * n / i) * i);
	return {
		width: r(e.width),
		height: r(e.height)
	};
}
function o(t, i) {
	let o = {
		provider_id: "novelai",
		request_id: i.request_id,
		generation_anchor: i.generation_anchor
	}, s = e.parse(t.image_id);
	switch (t.kind) {
		case "img2img": return {
			...o,
			action: "img2img",
			prompt: t.positive_prompt,
			...t.negative_prompt.trim() ? { negative_prompt: t.negative_prompt } : {},
			output_count: 1,
			...n(i.model_id),
			...a(t.source),
			image_asset_id: s,
			strength: t.strength,
			noise: 0
		};
		case "inpaint": {
			if (i.mask_asset_id === void 0) throw TypeError("An inpaint edit needs its stored mask asset");
			let e = a(t.source);
			return r({
				request_id: i.request_id,
				generation_anchor: i.generation_anchor,
				image_asset_id: s,
				mask_asset_id: i.mask_asset_id,
				positive_prompt: t.positive_prompt,
				...t.negative_prompt.trim() ? { negative_prompt: t.negative_prompt } : {},
				strength: t.strength,
				width: e.width,
				height: e.height,
				model_id: i.model_id
			});
		}
		case "upscale": return {
			...o,
			action: "upscale",
			prompt: "upscale",
			output_count: 1,
			image_asset_id: s
		};
		case "augment": return {
			...o,
			action: "augment",
			prompt: t.tool,
			output_count: 1,
			tool: t.tool,
			image_asset_id: s,
			width: 1024,
			height: 1024,
			...t.emotion === void 0 ? {} : { emotion: t.emotion },
			...t.tool_prompt === void 0 ? {} : { tool_prompt: t.tool_prompt },
			...t.defry === void 0 ? {} : { defry: t.defry }
		};
	}
}
//#endregion
export { o as build_novelai_edit_request, a as fit_novelai_canvas };
