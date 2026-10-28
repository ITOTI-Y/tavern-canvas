import { s as e } from "./wardrobe_library-cpT1rkQA.js";
import { l as t } from "./library_match-er4-CW2n.js";
import { OutfitSchema as n, clean_slots as r, slots_schema as i } from "./scene_update-DXMm_fSD.js";
//#region src/modules/wardrobe/outfit_from_image.ts
var a = {
	name: "tavern_canvas_outfit",
	value: {
		type: "object",
		properties: {
			name: { type: "string" },
			slots: i(e)
		},
		required: ["name", "slots"],
		additionalProperties: !1
	}
}, o = [
	"[Inkwell outfit from image]",
	"The attached image shows one character. Describe only the clothing and accessories it wears, as visual Danbooru-style English tags for an anime image model, sorted into these slots: full_body (dresses, jumpsuits, swimsuits), outerwear, top, bottom, legwear, footwear, headwear, accessories.",
	"Leave out the body, hair, eyes, expression, pose, and background. Give an empty list for a slot the image does not show, and give the outfit a short descriptive name.",
	"Reply with only a JSON object of the form {\"name\":\"...\",\"slots\":{...}}."
].join("\n");
function s(i) {
	for (let a of t(i, "slots")) {
		let t;
		try {
			t = JSON.parse(a);
		} catch {
			continue;
		}
		let i = n.safeParse(t);
		if (!i.success) continue;
		let o = r(i.data.slots, e);
		if (Object.keys(o).length > 0) return {
			name: i.data.name,
			slots: o
		};
	}
	throw Error(`The model returned no outfit with clothing tags: ${i.slice(0, 200)}`);
}
//#endregion
export { o as OUTFIT_FROM_IMAGE_INPUT, a as OUTFIT_FROM_IMAGE_JSON_SCHEMA, s as parse_outfit_from_image };
