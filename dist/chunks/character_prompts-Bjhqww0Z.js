import { i as e } from "./novelai_models-CXz0Nwhv.js";
import { r as t } from "./tag_normalizer-CEAU4497.js";
//#region src/modules/illustration/character_prompts.ts
function n(t) {
	if (t.provider_id !== "novelai" || t.action !== "generate" && t.action !== "img2img" && t.action !== "infill") return 0;
	let n = e(t.model_id)?.profile;
	return n === void 0 || n.family === "v3" ? 0 : n.max_characters;
}
var r = {
	girl: "girl",
	boy: "boy",
	other: "creature"
}, i = /^(?:source|target|mutual)#/u;
function a(e) {
	return e === void 0 ? "" : `${e.x < .2 ? "On the far left" : e.x < .4 ? "At center-left" : e.x < .6 ? "In the center" : e.x < .8 ? "At center-right" : "On the far right"}${e.y < .4 ? " in the background" : e.y > .6 ? " in the foreground" : ""}`;
}
function o(e) {
	let t = e.prompt.split(",").map((e) => e.trim().replace(i, "")).filter((e) => e !== ""), n = r[t[0]?.toLowerCase() ?? ""], o = (n === void 0 ? t : t.slice(1)).join(", "), s = `a ${n ?? "figure"}${o === "" ? "" : ` with ${o}`}`, c = a(e.center);
	return c === "" ? `${s.charAt(0).toUpperCase()}${s.slice(1)}.` : `${c} is ${s}.`;
}
function s(e, r) {
	if (r.length === 0) return e;
	let i = n(e), a = r.slice(0, i), s = r.slice(i), c = s.length === 0 ? e.prompt : e.provider_id === "comfyui" ? [e.prompt.trim(), ...s.map(o)].filter((e) => e !== "").join("\n") : t([e.prompt, ...s.map((e) => e.prompt)]);
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
export { s as attach_character_prompts };
