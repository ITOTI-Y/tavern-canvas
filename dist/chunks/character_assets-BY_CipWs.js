import { i as e } from "./novelai_models-CXz0Nwhv.js";
import { r as t } from "./tag_normalizer-CEAU4497.js";
//#region src/modules/illustration/character_assets.ts
var n = 16, r = 16, i = .6, a = .7;
function o(e, r, i) {
	if (e.provider_id !== "sd_webui" && e.provider_id !== "comfyui") return e;
	let a = new Set(r.map((e) => e.id)), o = i.filter((e) => a.has(e.character_id) && e.file_name !== "");
	if (o.length === 0) return e;
	if (e.provider_id === "comfyui") {
		if (e.loras === void 0) return e;
		let n = new Set(e.loras.map((e) => e.lora_name));
		return {
			...e,
			prompt: t([e.prompt, ...o.map((e) => e.trigger_words)]),
			loras: [...e.loras, ...o.filter((e) => !n.has(e.file_name)).map((e) => ({
				lora_name: e.file_name,
				strength: e.weight
			}))].slice(0, 64)
		};
	}
	let s = [...e.lora_tokens ?? [], ...o.map((e) => ({
		lora_id: e.file_name,
		weight: e.weight
	}))].slice(0, n);
	return {
		...e,
		prompt: t([e.prompt, ...o.map((e) => e.trigger_words)]),
		lora_tokens: s
	};
}
async function s(t, n, o) {
	if (t.provider_id !== "novelai" || t.action !== "generate") return t;
	let s = e(t.model_id)?.profile;
	if (s === void 0) return t;
	let c = (e) => n.flatMap((t) => t.reference?.mode === e ? [t.reference.image] : []), l = s.character_reference ? c("precise").slice(0, 1) : [], u = l.length === 0 && s.vibe_transfer !== "unsupported" ? c("vibe") : [], d = c("img2img")[0], f = await Promise.all(l.map(async (e) => ({
		asset_id: await o.store_reference(e),
		description: "character",
		strength: 1,
		fidelity: 1,
		information_extracted: 1
	}))), p = [...l.length === 0 ? t.vibe_references ?? [] : [], ...await Promise.all(u.map(async (e) => ({
		asset_id: await o.store_reference(e),
		strength: i,
		information_extracted: 1
	})))].slice(0, r), { vibe_references: m, ...h } = t, g = {
		...h,
		...p.length > 0 ? { vibe_references: p } : {},
		...f.length > 0 ? { character_references: f } : {}
	};
	return d === void 0 ? g : {
		...g,
		action: "img2img",
		image_asset_id: await o.store_reference(d),
		strength: a,
		noise: 0
	};
}
//#endregion
export { o as attach_character_loras, s as attach_character_references };
