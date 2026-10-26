//#region ../../packages/contracts/src/providers/novelai_model_ids.ts
var e = [
	"nai-diffusion-3",
	"nai-diffusion-3-inpainting",
	"nai-diffusion-4-5-curated",
	"nai-diffusion-4-5-curated-inpainting",
	"nai-diffusion-4-5-full",
	"nai-diffusion-4-5-full-inpainting",
	"nai-diffusion-4-curated-inpainting",
	"nai-diffusion-4-curated-preview",
	"nai-diffusion-4-full",
	"nai-diffusion-4-full-inpainting",
	"nai-diffusion-5-curated",
	"nai-diffusion-5-curated-inpainting",
	"nai-diffusion-5-full",
	"nai-diffusion-5-full-inpainting",
	"nai-diffusion-5-full-medium",
	"nai-diffusion-5-full-medium-inpainting",
	"nai-diffusion-furry-3",
	"nai-diffusion-furry-3-inpainting"
], t = {
	family: "v3",
	vibe_transfer: "raw_image",
	character_reference: !1,
	max_characters: 0,
	character_positions: "unsupported",
	smea: !0,
	variety_sigma: 19,
	noise_schedule: "selectable",
	cfg_rescale: !0,
	legacy_uc: !1,
	img2img: !0,
	inpainting_model_id: "nai-diffusion-3-inpainting",
	default_scale: 5,
	default_steps: 23,
	fixed_settings: null,
	prompt_presets: "v3",
	nsfw_negative_prefix: !0,
	opus_usage_limit: !1,
	price_multiplier: 1,
	step_price_factor: 1
}, n = {
	...t,
	family: "v4",
	vibe_transfer: "encoded",
	max_characters: 6,
	character_positions: "grid",
	smea: !1,
	noise_schedule: "no_native",
	legacy_uc: !0,
	default_scale: 5.5,
	prompt_presets: "v4_full"
}, r = {
	...n,
	family: "v4_5",
	character_reference: !0,
	variety_sigma: 58,
	legacy_uc: !1,
	default_scale: 5,
	prompt_presets: "v4_5_full"
}, i = {
	...r,
	family: "v5",
	vibe_transfer: "unsupported",
	character_reference: !1,
	max_characters: 32,
	character_positions: "free",
	variety_sigma: null,
	noise_schedule: "fixed_karras",
	default_scale: 7,
	prompt_presets: "v5",
	opus_usage_limit: !0,
	price_multiplier: 1.5
};
function a(e, t, n, r) {
	return Object.freeze({
		model_id: e,
		display_name: t,
		selectable: n,
		...r
	});
}
var o = {
	...i,
	inpainting_model_id: "nai-diffusion-4-5-curated-inpainting",
	nsfw_negative_prefix: !1
}, s = {
	...i,
	inpainting_model_id: "nai-diffusion-5-full-inpainting"
}, c = {
	...s,
	cfg_rescale: !1,
	inpainting_model_id: "nai-diffusion-5-full-medium-inpainting",
	default_steps: 14,
	fixed_settings: {
		steps: 14,
		sampler: "k_euler_ancestral",
		undesired_content_preset: "heavy"
	},
	step_price_factor: 1 / 1.06521739
}, l = {
	...r,
	inpainting_model_id: "nai-diffusion-4-5-curated-inpainting",
	prompt_presets: "v4_5_curated",
	nsfw_negative_prefix: !1
}, u = {
	...r,
	inpainting_model_id: "nai-diffusion-4-5-full-inpainting",
	prompt_presets: "v4_5_full"
}, d = {
	...n,
	inpainting_model_id: "nai-diffusion-4-curated-inpainting",
	prompt_presets: "v4_curated",
	nsfw_negative_prefix: !1
}, f = {
	...n,
	inpainting_model_id: "nai-diffusion-4-full-inpainting",
	prompt_presets: "v4_full"
}, p = {
	...t,
	inpainting_model_id: "nai-diffusion-furry-3-inpainting",
	default_scale: 6.2,
	prompt_presets: "furry_v3"
};
function m(e, t) {
	return {
		...e,
		inpainting_model_id: t
	};
}
var h = [
	a("nai-diffusion-5-curated", "NAI Diffusion V5 Curated", !0, o),
	a("nai-diffusion-5-full", "NAI Diffusion V5 Full", !0, s),
	a("nai-diffusion-5-full-medium", "NAI Diffusion V5 Full Medium", !0, c),
	a("nai-diffusion-5-curated-inpainting", "NAI Diffusion V5 Curated Inpainting", !1, m(o, "nai-diffusion-5-curated-inpainting")),
	a("nai-diffusion-5-full-inpainting", "NAI Diffusion V5 Full Inpainting", !1, m(s, "nai-diffusion-5-full-inpainting")),
	a("nai-diffusion-5-full-medium-inpainting", "NAI Diffusion V5 Full Medium Inpainting", !1, m(c, "nai-diffusion-5-full-medium-inpainting")),
	a("nai-diffusion-4-5-curated", "NAI Diffusion V4.5 Curated", !0, l),
	a("nai-diffusion-4-5-full", "NAI Diffusion V4.5 Full", !0, u),
	a("nai-diffusion-4-5-curated-inpainting", "NAI Diffusion V4.5 Curated Inpainting", !1, l),
	a("nai-diffusion-4-5-full-inpainting", "NAI Diffusion V4.5 Full Inpainting", !1, u),
	a("nai-diffusion-4-curated-preview", "NAI Diffusion V4 Curated", !0, d),
	a("nai-diffusion-4-full", "NAI Diffusion V4 Full", !0, f),
	a("nai-diffusion-4-curated-inpainting", "NAI Diffusion V4 Curated Inpainting", !1, d),
	a("nai-diffusion-4-full-inpainting", "NAI Diffusion V4 Full Inpainting", !1, f),
	a("nai-diffusion-3", "NAI Diffusion Anime V3", !0, t),
	a("nai-diffusion-3-inpainting", "NAI Diffusion Anime V3 Inpainting", !1, t),
	a("nai-diffusion-furry-3", "NAI Diffusion Furry V3", !0, p),
	a("nai-diffusion-furry-3-inpainting", "NAI Diffusion Furry V3 Inpainting", !1, p)
], g = new Map(h.map((e) => [e.model_id, e])), _ = [
	[/^nai-diffusion-5(?:-|$)/u, s],
	[/^nai-diffusion-4-5(?:-|$)/u, u],
	[/^nai-diffusion-4(?:-|$)/u, f],
	[/^nai-diffusion-(?:furry-)?3(?:-|$)/u, t]
];
function v(e) {
	let t = g.get(e);
	if (t !== void 0) return {
		profile: t,
		confirmed: !0
	};
	for (let [t, n] of _) if (t.test(e)) return {
		profile: a(e, e, !e.endsWith("-inpainting"), {
			...n,
			vibe_transfer: "unsupported",
			character_reference: !1,
			img2img: !1,
			inpainting_model_id: null,
			fixed_settings: null
		}),
		confirmed: !1
	};
	return null;
}
var y = /nai-diffusion-[a-z0-9-]*[a-z0-9]/gu;
function b(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) for (let e of n.matchAll(y)) v(e[0]) !== null && t.add(e[0]);
	return [...t].sort();
}
function x(t = e) {
	let n = /* @__PURE__ */ new Set(), r = [];
	for (let e of [...h.map((e) => e.model_id), ...t]) {
		if (n.has(e)) continue;
		n.add(e);
		let t = v(e);
		t !== null && t.profile.selectable && r.push(t);
	}
	return r;
}
//#endregion
export { e as i, x as n, v as r, b as t };
