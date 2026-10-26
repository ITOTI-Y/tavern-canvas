import { a as e, b as t, g as n, s as r, y as i } from "./ids-DjWg1HG8.js";
//#region ../../packages/contracts/src/generation.ts
var a = t().regex(/^[a-f0-9]{64}$/u), o = i({
	generation_anchor: a,
	scene_description: t().trim().min(1).max(12e3),
	negative_constraints: t().trim().max(4e3).optional(),
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
]);
r(["native_tool", "fallback_comment"]);
//#endregion
export { o as n, a as r, s as t };
