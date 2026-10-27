import { h as e, m as t, t as n, u as r } from "./schemas-DMBLWk59.js";
import { a as i } from "./ids-stC4fUL8.js";
//#region ../../packages/contracts/src/generation.ts
var a = e().regex(/^[a-f0-9]{64}$/u), o = t({
	generation_anchor: a,
	scene_description: e().trim().min(1).max(12e3),
	negative_constraints: e().trim().max(4e3).optional(),
	context_turns: r().int().min(0).max(12).optional(),
	style_preset_id: i.optional(),
	image_count: r().int().min(1).max(4).optional()
}), s = n([
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
n(["native_tool", "fallback_comment"]);
//#endregion
export { o as n, a as r, s as t };
