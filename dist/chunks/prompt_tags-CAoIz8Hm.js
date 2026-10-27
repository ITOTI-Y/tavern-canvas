import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { i as t } from "./novelai_models-CXz0Nwhv.js";
import { t as n } from "./novelai_prompt_presets-Cxcc0ebv.js";
import { r } from "./tag_normalizer-CEAU4497.js";
//#region ../../packages/contracts/src/prompt_tags.ts
var i = {
	v3: "NAI Diffusion V3",
	furry_v3: "NAI Diffusion Furry V3",
	v4_curated: "NAI Diffusion V4 Curated",
	v4_full: "NAI Diffusion V4 Full",
	v4_5_curated: "NAI Diffusion V4.5 Curated",
	v4_5_full: "NAI Diffusion V4.5 Full",
	v5: "NAI Diffusion V5"
}, a = {
	standard: "Standard",
	light: "Light",
	heavy: "Heavy",
	human_focus: "Human Focus",
	furry_focus: "Furry Focus",
	none: "None"
}, o = "v4_5_full";
function s() {
	return Object.entries(n).flatMap(([e, t]) => {
		let n = (t, n) => Object.entries(n).flatMap(([n, r]) => r === void 0 || r === "" ? [] : [{
			id: `novelai:${e}:${n}`,
			kind: t,
			group: i[e],
			label: a[n] ?? n,
			text: r
		}]);
		return [...n("quality", t.quality), ...n("undesired_content", t.undesired_content)];
	});
}
function c(e) {
	return `custom:${e}`;
}
function l(e, n) {
	let r = (e === "novelai" && n !== null ? t(n)?.profile.prompt_presets : void 0) ?? o, i = e === "novelai";
	return {
		quality: {
			enabled: i,
			preset_id: `novelai:${r}:standard`
		},
		undesired_content: {
			enabled: i,
			preset_id: `novelai:${r}:heavy`
		}
	};
}
//#endregion
//#region src/modules/illustration/prompt_tags.ts
var u = /* @__PURE__ */ e({
	custom_prompt_tag_presets: () => d,
	effective_prompt_tags: () => f,
	inject_prompt_tags: () => g,
	prompt_tag_presets: () => p
});
function d(e) {
	return e.flatMap((e) => {
		let { kind: t, text: n } = e.payload;
		return (t === "quality" || t === "undesired_content") && typeof n == "string" ? [{
			id: c(e.id),
			kind: t,
			group: null,
			label: e.display_name,
			text: n.trim()
		}] : [];
	});
}
function f(e) {
	return e.prompt_tags ?? l(e.provider_id, e.model_id ?? null);
}
function p(e) {
	return [...s(), ...d(e)];
}
function m(e, t, n) {
	let r = e[t];
	return r.enabled ? n.find((e) => e.id === r.preset_id && e.kind === t)?.text ?? "" : "";
}
function h(e) {
	return e.provider_id !== "novelai" || e.action === "generate" || e.action === "img2img" || e.action === "infill";
}
function g(e, n, i) {
	if (!h(e)) return e;
	let a = m(n, "quality", i), o = e.provider_id === "novelai" && "model_id" in e && t(e.model_id)?.profile.fixed_settings?.undesired_content_preset !== void 0 ? "" : m(n, "undesired_content", i);
	if (a === "" && o === "") return e;
	let s = r([o, e.negative_prompt]);
	return {
		...e,
		prompt: r([e.prompt, a]),
		...s === "" ? {} : { negative_prompt: s }
	};
}
//#endregion
export { p as n, u as r, f as t };
