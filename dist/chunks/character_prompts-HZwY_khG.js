import { i as e } from "./novelai_models-CXz0Nwhv.js";
import { r as t } from "./tag_normalizer-CEAU4497.js";
//#region src/modules/illustration/character_prompts.ts
function n(t) {
	if (t.provider_id !== "novelai" || t.action !== "generate" && t.action !== "img2img" && t.action !== "infill") return 0;
	let n = e(t.model_id)?.profile;
	return n === void 0 || n.family === "v3" ? 0 : n.max_characters;
}
function r(e, r) {
	if (r.length === 0) return e;
	let i = n(e), a = r.slice(0, i), o = r.slice(i), s = o.map((e) => e.prompt), c = o.length === 0 ? e.prompt : e.provider_id === "comfyui" ? [e.prompt, ...s].map((e) => e.trim()).filter((e) => e !== "").join("\n") : t([e.prompt, ...s]);
	return a.length === 0 ? {
		...e,
		prompt: c
	} : {
		...e,
		prompt: c,
		characters: a.map((e) => ({
			prompt: e.prompt,
			...e.negative_prompt.trim() === "" ? {} : { negative_prompt: e.negative_prompt },
			...e.center === void 0 ? {} : { center: e.center }
		}))
	};
}
//#endregion
export { r as attach_character_prompts };
