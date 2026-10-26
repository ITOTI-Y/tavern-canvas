import { b as e, f as t, g as n, i as r, l as i, m as a, s as o, t as s, u as c, y as l } from "./ids-DjWg1HG8.js";
import { r as u } from "./generation-CPQjBKML.js";
//#region ../../packages/contracts/src/providers/common.ts
var d = 4294967295, f = e().trim().min(1).max(128).regex(/^[A-Za-z0-9][A-Za-z0-9+._/ -]*$/u), p = n().int().min(0).max(d), m = n().int().min(64).max(4096).multipleOf(8), h = {
	request_id: r,
	generation_anchor: u,
	prompt: e().trim().min(1).max(12e3),
	negative_prompt: e().trim().max(4e3).optional(),
	output_count: n().int().min(1).max(4)
}, g = 3145728, _ = 1048576, v = n().int().min(64).max(8192).multipleOf(64), y = n().min(0).max(1), b = o([
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
]), w = l({
	prompt: e().trim().min(1).max(4e3),
	negative_prompt: e().trim().max(4e3).optional(),
	center: l({
		x: y,
		y
	}).optional()
}), T = e().min(1).max(4e7).regex(/^[A-Za-z0-9+/]+={0,2}$/u), E = l({
	asset_id: s,
	strength: n().min(-1).max(1),
	information_extracted: y,
	encoding: T.optional()
}), D = l({
	asset_id: s,
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
	provider_id: a("novelai"),
	model_id: f,
	sampler: b,
	width: v,
	height: v,
	steps: n().int().min(1).max(50),
	scale: n().min(0).max(10),
	cfg_rescale: y,
	noise_schedule: x,
	seed: p.optional(),
	quality_preset: C,
	undesired_content_preset: S,
	smea: c(),
	dyn: c(),
	variety_plus: c(),
	characters: i(w).max(32).optional(),
	vibe_references: i(E).max(16).optional(),
	normalize_vibe_strengths: c().optional(),
	character_references: i(D).max(16).optional()
};
function k(e) {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(g)} pixels`,
		path: ["width"]
	});
}
var A = l({
	...O,
	action: a("generate")
}).check(k), j = l({
	...O,
	action: a("img2img"),
	image_asset_id: s,
	strength: y,
	noise: y
}).check(k), M = l({
	...O,
	action: a("infill"),
	image_asset_id: s,
	mask_asset_id: s,
	inpaint_strength: y
}).check(k), N = l({
	...h,
	provider_id: a("novelai"),
	action: a("upscale"),
	image_asset_id: s,
	output_count: a(1)
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
]), I = l({
	...h,
	provider_id: a("novelai"),
	action: a("augment"),
	tool: F,
	image_asset_id: s,
	width: n().int().min(64).max(8192),
	height: n().int().min(64).max(8192),
	tool_prompt: e().trim().max(1e3).optional(),
	emotion: P.optional(),
	defry: n().int().min(0).max(5).optional(),
	output_count: a(1)
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
}), L = t("action", [
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
export { C as a, S as c, h as d, d as f, p as h, x as i, z as l, f as m, _ as n, L as o, m as p, v as r, b as s, g as t, R as u };
