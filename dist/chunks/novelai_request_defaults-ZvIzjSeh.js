import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { r as t } from "./novelai_models-CWhnujYI.js";
//#region src/modules/novelai/novelai_request_defaults.ts
var n = /* @__PURE__ */ e({
	DEFAULT_NOVELAI_MODEL_ID: () => r,
	novelai_default_parameters: () => a
}), r = "nai-diffusion-5-curated";
function i(e) {
	let n = t(e);
	if (n === null) throw Error(`"${e}" is not a NovelAI image model this extension can drive`);
	return n.profile;
}
function a(e) {
	let t = i(e);
	return {
		model_id: e,
		sampler: t.fixed_settings?.sampler ?? "k_euler_ancestral",
		width: 832,
		height: 1216,
		steps: t.fixed_settings?.steps ?? t.default_steps,
		scale: t.default_scale,
		cfg_rescale: 0,
		noise_schedule: "karras",
		quality_preset: "standard",
		undesired_content_preset: t.fixed_settings?.undesired_content_preset ?? "heavy",
		smea: !1,
		dyn: !1,
		variety_plus: !1
	};
}
//#endregion
export { a as n, n as r, r as t };
