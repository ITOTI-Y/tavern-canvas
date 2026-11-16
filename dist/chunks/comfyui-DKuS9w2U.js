import { c as e, g as t, h as n, i as r, m as i, r as a, u as o, v as s } from "./schemas-BjkyCQYG.js";
import { t as c } from "./ids-pPJWL4BL.js";
import { a as l, i as u, t as d } from "./common-C4qkl4E0.js";
//#region ../../packages/contracts/src/providers/comfyui.ts
var f = s([
	t().max(4e3),
	o(),
	r()
]), p = i(u, f).check((e) => {
	Object.keys(e.value).length > 64 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "placeholder_values must contain at most 64 entries"
	});
}), m = i(u, c).check((e) => {
	Object.keys(e.value).length > 16 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "input_asset_bindings must contain at most 16 entries"
	});
}), h = n({
	lora_name: t().trim().min(1).max(512),
	strength: o().min(-10).max(10)
}), g = n({
	provider_id: e("comfyui"),
	...d,
	workflow_id: c,
	placeholder_values: p,
	input_asset_bindings: m,
	output_node_ids: a(u).min(1).max(16),
	seed: l.optional(),
	loras: a(h).max(64).optional()
}).check((e) => {
	new Set(e.value.output_node_ids).size !== e.value.output_node_ids.length && e.issues.push({
		code: "custom",
		input: e.value.output_node_ids,
		message: "output_node_ids must not contain duplicates",
		path: ["output_node_ids"]
	});
});
//#endregion
export { g as n, h as t };
