import { d as e, t } from "./schemas-DMBLWk59.js";
import { c as n, s as r } from "./wardrobe_library-CZLkOF9h.js";
import { l as i } from "./library_match-U5kHYoiF.js";
import { OutfitSchema as a, clean_slots as o, slot_record as s, slots_schema as c } from "./scene_update-RfbMpEez.js";
//#region src/modules/wardrobe/character_from_image.ts
var l = {
	name: "tavern_canvas_character",
	value: {
		type: "object",
		properties: {
			subject: {
				type: "string",
				enum: [
					"girl",
					"boy",
					"other"
				]
			},
			appearance: c(r),
			outfit: {
				type: "object",
				properties: {
					name: { type: "string" },
					slots: c(n)
				},
				required: ["name", "slots"],
				additionalProperties: !1
			}
		},
		required: [
			"subject",
			"appearance",
			"outfit"
		],
		additionalProperties: !1
	}
}, u = [
	"[Inkwell character from image]",
	"The attached image shows one character. Describe how they look as visual Danbooru-style English tags for an anime image model.",
	"- subject: girl for a woman or girl, boy for a man or boy, other only for a character without a gender, such as a creature or a machine",
	"- appearance: tags per slot: age, body, skin, hair (length, color, style), eyes (color, shape), makeup, expression, features (species traits such as pointy ears, scars, tattoos)",
	"- outfit: the clothing and accessories worn, sorted into these slots: full_body (dresses, jumpsuits, swimsuits), outerwear, top, bottom, legwear, footwear, headwear, accessories; give the outfit a short descriptive name",
	"Leave out the pose, the background and the art style. Give an empty list for a slot the image does not show; never write placeholders such as unknown or none.",
	"Reply with only a JSON object of the form {\"subject\":\"...\",\"appearance\":{...},\"outfit\":{\"name\":\"...\",\"slots\":{...}}}."
].join("\n"), d = e({
	subject: t([
		"girl",
		"boy",
		"other"
	]).catch("other"),
	appearance: s(r).catch({}),
	outfit: a.nullable().catch(null)
});
function f(e) {
	for (let t of i(e, "appearance")) {
		let e;
		try {
			e = JSON.parse(t);
		} catch {
			continue;
		}
		let i = d.safeParse(e);
		if (!i.success) continue;
		let a = o(i.data.appearance, r), s = o(i.data.outfit?.slots ?? null, n), c = i.data.outfit === null || Object.keys(s).length === 0 ? null : {
			name: i.data.outfit.name,
			slots: s
		};
		if (Object.keys(a).length > 0 || c !== null) return {
			subject: i.data.subject,
			appearance: a,
			outfit: c
		};
	}
	throw Error(`The model returned no character tags: ${e.slice(0, 200)}`);
}
//#endregion
export { u as CHARACTER_FROM_IMAGE_INPUT, l as CHARACTER_FROM_IMAGE_JSON_SCHEMA, f as parse_character_from_image };
