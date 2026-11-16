import { c as e, g as t, h as n, i as r, o as i, r as a, t as o, u as s } from "./schemas-BjkyCQYG.js";
import { t as c } from "./ids-pPJWL4BL.js";
import { a as l, i as u, t as d } from "./common-C4qkl4E0.js";
//#region ../../packages/contracts/src/providers/novelai.ts
var f = 3145728, p = 1048576, m = s().int().min(64).max(8192).multipleOf(64), h = s().min(0).max(1), g = o([
	"k_euler",
	"k_euler_ancestral",
	"k_dpmpp_2s_ancestral",
	"k_dpmpp_2m_sde",
	"k_dpmpp_2m",
	"k_dpmpp_sde",
	"ddim_v3"
]), _ = o([
	"native",
	"karras",
	"exponential",
	"polyexponential"
]), v = o([
	"heavy",
	"light",
	"human_focus",
	"furry_focus",
	"none"
]), y = o([
	"standard",
	"light",
	"none"
]), b = n({
	prompt: t().trim().min(1).max(4e3),
	negative_prompt: t().trim().max(4e3).optional(),
	center: n({
		x: h,
		y: h
	}).optional()
}), x = t().min(1).max(4e7).regex(/^[A-Za-z0-9+/]+={0,2}$/u), S = n({
	asset_id: c,
	strength: s().min(-1).max(1),
	information_extracted: h,
	encoding: x.optional()
}), C = n({
	asset_id: c,
	description: o([
		"character",
		"style",
		"costume",
		"character_and_style"
	]),
	strength: h,
	fidelity: h,
	information_extracted: h
}), w = {
	...d,
	provider_id: e("novelai"),
	model_id: u,
	sampler: g,
	width: m,
	height: m,
	steps: s().int().min(1).max(50),
	scale: s().min(0).max(10),
	cfg_rescale: h,
	noise_schedule: _,
	seed: l.optional(),
	quality_preset: y,
	undesired_content_preset: v,
	smea: r(),
	dyn: r(),
	variety_plus: r(),
	characters: a(b).max(32).optional(),
	vibe_references: a(S).max(16).optional(),
	normalize_vibe_strengths: r().optional(),
	character_references: a(C).max(16).optional()
};
function T(e) {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(f)} pixels`,
		path: ["width"]
	});
}
var E = n({
	...w,
	action: e("generate")
}).check(T), D = n({
	...w,
	action: e("img2img"),
	image_asset_id: c,
	strength: h,
	noise: h
}).check(T), O = n({
	...w,
	action: e("infill"),
	image_asset_id: c,
	mask_asset_id: c,
	inpaint_strength: h
}).check(T), k = n({
	...d,
	provider_id: e("novelai"),
	action: e("upscale"),
	image_asset_id: c,
	output_count: e(1)
}), A = o([
	"neutral",
	"happy",
	"sad",
	"angry",
	"scared",
	"surprised",
	"tired",
	"excited",
	"nervous",
	"thinking",
	"confused",
	"shy",
	"disgusted",
	"smug",
	"bored",
	"laughing",
	"irritated",
	"aroused",
	"embarrassed",
	"worried",
	"love",
	"determined",
	"hurt",
	"playful"
]), j = o([
	"bg-removal",
	"declutter",
	"declutter-keep-bubbles",
	"lineart",
	"sketch",
	"colorize",
	"emotion"
]), M = n({
	...d,
	provider_id: e("novelai"),
	action: e("augment"),
	tool: j,
	image_asset_id: c,
	width: s().int().min(64).max(8192),
	height: s().int().min(64).max(8192),
	tool_prompt: t().trim().max(1e3).optional(),
	emotion: A.optional(),
	defry: s().int().min(0).max(5).optional(),
	output_count: e(1)
}).check((e) => {
	T(e);
	let { tool: t, emotion: n, defry: r, tool_prompt: i } = e.value;
	t === "emotion" && n === void 0 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "the emotion tool requires an emotion",
		path: ["emotion"]
	}), t !== "emotion" && n !== void 0 && e.issues.push({
		code: "custom",
		input: n,
		message: "emotion only applies to the emotion tool",
		path: ["emotion"]
	}), t !== "colorize" && t !== "emotion" && (r !== void 0 || i !== void 0) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "tool_prompt and defry only apply to the colorize and emotion tools",
		path: ["tool"]
	});
}), N = i("action", [
	E,
	D,
	O,
	k,
	M
]);
function P(e) {
	return e.action !== "infill" && (e.character_references?.length ?? 0) === 0;
}
function F(e) {
	return e.action === "generate" || e.action === "img2img" || e.action === "infill";
}
//#endregion
export { N as a, P as c, _ as i, p as n, g as o, m as r, F as s, f as t };
