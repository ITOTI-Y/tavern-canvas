import { a as e, b as t, g as n, s as r, x as i } from "./ids-CQF5rr2J.js";
//#region ../../packages/contracts/src/generation.ts
var a = i().regex(/^[a-f0-9]{64}$/u), o = t({
	generation_anchor: a,
	scene_description: i().trim().min(1).max(12e3),
	negative_constraints: i().trim().max(4e3).optional(),
	context_turns: n().int().min(0).max(12).optional(),
	style_preset_id: e.optional(),
	image_count: n().int().min(1).max(4).optional()
}), s = r([
	"queued",
	"preparing",
	"submitting",
	"running",
	"completed",
	"failed",
	"cancelled",
	"attached",
	"orphaned"
]), c = r(["native_tool", "fallback_comment"]);
//#endregion
export { a as i, c as n, o as r, s as t };
