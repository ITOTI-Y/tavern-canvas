import { i as e } from "./novelai_models-CXz0Nwhv.js";
//#region src/modules/novelai/novelai_profile_defaults.ts
async function t(t, n, r) {
	let { vibe_asset_ids: i, ...a } = n, o = e(t.model_id)?.profile.vibe_transfer !== "unsupported", s = [];
	if (o) for (let e of i) {
		let t = await r.load_vibe(e);
		t !== null && s.push({
			asset_id: await r.store_input(t.image_bytes),
			strength: t.strength,
			information_extracted: t.information_extracted
		});
	}
	return {
		...t,
		...a,
		...s.length > 0 ? { vibe_references: s } : {}
	};
}
//#endregion
export { t as apply_novelai_defaults };
