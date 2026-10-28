import { c as e, h as t, i as n, m as r, o as i, r as a, t as o, u as s } from "./schemas-DMBLWk59.js";
import { i as c, t as l } from "./ids-stC4fUL8.js";
import { n as u } from "./generation-C8k9E8Cm.js";
//#region ../../packages/contracts/src/providers/common.ts
var d = 4294967295, f = t().trim().min(1).max(128).regex(/^[A-Za-z0-9][A-Za-z0-9+._/ -]*$/u), p = s().int().min(0).max(d), m = s().int().min(64).max(4096).multipleOf(8), h = {
	request_id: c,
	generation_anchor: u,
	prompt: t().trim().min(1).max(12e3),
	negative_prompt: t().trim().max(4e3).optional(),
	output_count: s().int().min(1).max(4)
}, g = 3145728, _ = 1048576, v = s().int().min(64).max(8192).multipleOf(64), y = s().min(0).max(1), b = o([
	"k_euler",
	"k_euler_ancestral",
	"k_dpmpp_2s_ancestral",
	"k_dpmpp_2m_sde",
	"k_dpmpp_2m",
	"k_dpmpp_sde",
	"ddim_v3"
]), x = o([
	"native",
	"karras",
	"exponential",
	"polyexponential"
]), S = o([
	"heavy",
	"light",
	"human_focus",
	"furry_focus",
	"none"
]), C = o([
	"standard",
	"light",
	"none"
]), w = r({
	prompt: t().trim().min(1).max(4e3),
	negative_prompt: t().trim().max(4e3).optional(),
	center: r({
		x: y,
		y
	}).optional()
}), T = t().min(1).max(4e7).regex(/^[A-Za-z0-9+/]+={0,2}$/u), E = r({
	asset_id: l,
	strength: s().min(-1).max(1),
	information_extracted: y,
	encoding: T.optional()
}), D = r({
	asset_id: l,
	description: o([
		"character",
		"style",
		"costume",
		"character_and_style"
	]),
	strength: y,
	fidelity: y,
	information_extracted: y
}), O = {
	...h,
	provider_id: e("novelai"),
	model_id: f,
	sampler: b,
	width: v,
	height: v,
	steps: s().int().min(1).max(50),
	scale: s().min(0).max(10),
	cfg_rescale: y,
	noise_schedule: x,
	seed: p.optional(),
	quality_preset: C,
	undesired_content_preset: S,
	smea: n(),
	dyn: n(),
	variety_plus: n(),
	characters: a(w).max(32).optional(),
	vibe_references: a(E).max(16).optional(),
	normalize_vibe_strengths: n().optional(),
	character_references: a(D).max(16).optional()
};
function k(e) {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(g)} pixels`,
		path: ["width"]
	});
}
var A = r({
	...O,
	action: e("generate")
}).check(k), j = r({
	...O,
	action: e("img2img"),
	image_asset_id: l,
	strength: y,
	noise: y
}).check(k), M = r({
	...O,
	action: e("infill"),
	image_asset_id: l,
	mask_asset_id: l,
	inpaint_strength: y
}).check(k), N = r({
	...h,
	provider_id: e("novelai"),
	action: e("upscale"),
	image_asset_id: l,
	output_count: e(1)
}), P = o([
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
]), F = o([
	"bg-removal",
	"declutter",
	"declutter-keep-bubbles",
	"lineart",
	"sketch",
	"colorize",
	"emotion"
]), I = r({
	...h,
	provider_id: e("novelai"),
	action: e("augment"),
	tool: F,
	image_asset_id: l,
	width: s().int().min(64).max(8192),
	height: s().int().min(64).max(8192),
	tool_prompt: t().trim().max(1e3).optional(),
	emotion: P.optional(),
	defry: s().int().min(0).max(5).optional(),
	output_count: e(1)
}).check((e) => {
	k(e);
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
}), L = i("action", [
	A,
	j,
	M,
	N,
	I
]);
function R(e) {
	return e.action !== "infill" && (e.character_references?.length ?? 0) === 0;
}
function z(e) {
	return e.action === "generate" || e.action === "img2img" || e.action === "infill";
}
//#endregion
export { L as a, R as c, m as d, f, x as i, h as l, _ as n, b as o, p, v as r, z as s, g as t, d as u };
