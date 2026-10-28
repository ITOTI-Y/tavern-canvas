import { i as e, m as t, r as n, u as r } from "./schemas-DMBLWk59.js";
import { a as i } from "./ids-stC4fUL8.js";
import { i as a, o, r as s, t as c } from "./novelai-Dh4UVw5r.js";
//#region ../../packages/contracts/src/providers/novelai_defaults.ts
var l = t({
	width: s,
	height: s,
	steps: r().int().min(1).max(50),
	scale: r().min(0).max(10),
	cfg_rescale: r().min(0).max(1),
	sampler: o,
	noise_schedule: a,
	smea: e(),
	dyn: e(),
	variety_plus: e(),
	vibe_asset_ids: n(i).max(16)
}).check((e) => {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(c)} pixels`,
		path: ["width"]
	});
});
function u(e, t) {
	let n = [];
	t.vibe_asset_ids.length > 0 && e.vibe_transfer === "unsupported" && n.push("vibe_transfer"), (t.smea || t.dyn) && !e.smea && n.push("smea"), t.cfg_rescale > 0 && !e.cfg_rescale && n.push("cfg_rescale"), t.variety_plus && e.variety_sigma === null && n.push("variety_plus");
	let r = e.fixed_settings;
	return r !== null && (t.sampler !== r.sampler && n.push("sampler"), t.steps !== r.steps && n.push("steps")), n;
}
//#endregion
export { u as n, l as t };
