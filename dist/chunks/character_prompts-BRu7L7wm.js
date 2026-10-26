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
	let i = n(e), a = r.slice(0, i), o = r.slice(i), s = o.length === 0 ? e.prompt : t([e.prompt, ...o.map((e) => e.prompt)]);
	return a.length === 0 ? {
		...e,
		prompt: s
	} : {
		...e,
		prompt: s,
		characters: a.map((e) => e.negative_prompt.trim() === "" ? { prompt: e.prompt } : {
			prompt: e.prompt,
			negative_prompt: e.negative_prompt
		})
	};
}
//#endregion
export { r as attach_character_prompts };
