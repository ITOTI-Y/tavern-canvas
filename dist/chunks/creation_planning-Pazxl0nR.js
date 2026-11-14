import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { d as t, g as n, r, t as i, u as a, v as o } from "./schemas-BjkyCQYG.js";
import { o as s, t as c } from "./proposal_slots-BQfaZJTP.js";
import { t as l } from "./user_guidance-Bx38WM6V.js";
import { r as u, t as d } from "./model_json-BmZ6iNw3.js";
import { n as f } from "./analysis-Bc8d_b65.js";
import { n as p } from "./analysis_prompts-DZSUaREq.js";
//#region src/modules/creation/creation_planning.ts
var m = /* @__PURE__ */ e({
	BUBBLE_SYMBOLS: () => v,
	FRAME_SIZES: () => h,
	SCENE_JSON_SCHEMA: () => S,
	SHOTS: () => g,
	build_scene_input: () => k,
	parse_scene_output: () => I,
	scene_generation_input: () => U,
	scenes_from_plans: () => R,
	strip_paragraphs: () => L
}), h = {
	portrait: {
		width: 832,
		height: 1216
	},
	landscape: {
		width: 1216,
		height: 832
	},
	square: {
		width: 1024,
		height: 1024
	}
}, g = [
	"establishing",
	"wide",
	"medium",
	"close-up",
	"extreme close-up",
	"over the shoulder",
	"pov",
	"insert"
], _ = {
	establishing: "wide shot, scenery",
	wide: "wide shot, full body",
	medium: "cowboy shot",
	"close-up": "close-up, portrait",
	"extreme close-up": "close-up, face focus",
	"over the shoulder": "from behind, depth of field",
	pov: "pov",
	insert: "close-up, still life, object focus"
}, v = [
	"question",
	"exclamation",
	"interrobang",
	"ellipsis",
	"heart",
	"anger",
	"sweat",
	"music",
	"zzz"
], y = {
	question: "spoken question mark",
	exclamation: "spoken exclamation mark",
	interrobang: "spoken interrobang",
	ellipsis: "spoken ellipsis",
	heart: "spoken heart",
	anger: "spoken anger vein",
	sweat: "spoken sweatdrop",
	music: "spoken musical note",
	zzz: "spoken zzz"
}, b = {
	type: "object",
	properties: {
		name: { type: "string" },
		tags: { type: "string" }
	},
	required: ["name", "tags"],
	additionalProperties: !1
}, x = {
	type: "object",
	properties: {
		name: { type: "string" },
		tags: { type: "string" },
		bubble: {
			type: "string",
			enum: [
				"none",
				"speech",
				"thought"
			]
		},
		symbol: {
			type: "string",
			enum: ["none", ...v]
		},
		picture: { type: "string" }
	},
	required: [
		"name",
		"tags",
		"bubble",
		"symbol",
		"picture"
	],
	additionalProperties: !1
}, S = {
	name: "tavern_canvas_scenes",
	value: {
		type: "object",
		properties: {
			cast: {
				type: "array",
				items: b
			},
			places: {
				type: "array",
				items: b
			},
			scenes: {
				type: "array",
				items: {
					type: "object",
					properties: {
						paragraph: { type: "integer" },
						scene: { type: "string" },
						caption: { type: "string" },
						shot: {
							type: "string",
							enum: [...g]
						},
						place: { type: "string" },
						frame: {
							type: "string",
							enum: [
								"portrait",
								"landscape",
								"square"
							]
						},
						tags: { type: "string" },
						characters: {
							type: "array",
							items: x
						}
					},
					required: [
						"paragraph",
						"scene",
						"caption",
						"shot",
						"place",
						"frame",
						"tags",
						"characters"
					],
					additionalProperties: !1
				}
			}
		},
		required: [
			"cast",
			"places",
			"scenes"
		],
		additionalProperties: !1
	}
}, C = [
	"Plan the pictures like a storyboard:",
	"- The first picture establishes the place, who is there and the time of day.",
	"- Each later picture shows the next story beat: an action, its result or a reaction. Something visible changes from the previous picture: a pose, a gesture, an object changing hands, an expression, the light.",
	"- Show feelings through faces, gestures and body language. Use a close-up for an emotional beat and an insert shot for an object the plot turns on.",
	"- Vary shot sizes and camera angles; do not repeat the same framing in consecutive pictures.",
	"- Keep the place, the lighting and each character's look the same unless the story changes them.",
	"- Put everyone who takes part in a moment into its picture, so both sides of an exchange are visible. Characters look at each other or at what they are doing, not at the viewer, except in a pov shot.",
	"- Make what is only said or thought visible. When a character tells of a danger, a memory or something far away, draw that thing itself, or the speaker pointing at it with the listener reacting in the same picture; never a picture of something the reader has not been shown a reason for.",
	"- Lead into every change of view: before a picture of a new place or object, the previous picture shows someone looking at it, pointing at it or moving toward it.",
	"- Break an important action into setup, action and reaction over consecutive pictures. Between two consecutive pictures change one thing only, so the reader can tell what happened.",
	"- Act it out like a silent film: poses, gestures and expressions strong enough to read without words, with manga marks as tags where they help (sweatdrop, anger vein, blush, tears, trembling, motion lines, emphasis lines).",
	"- Keep each character on the same side of the picture from one picture to the next."
], w = `  and, only where what the character says or thinks carries the story, bubble: speech or thought (none otherwise) holding either symbol: one of ${v.join(", ")} (none otherwise), or picture: two to five English words naming the one thing spoken or thought about, drawn small inside the bubble, such as black wolf with red eyes (empty otherwise). One bubble per character at most; a bubble never holds words.`, T = "  and bubble: none, symbol: none, picture: empty", E = "Give cast: one entry per character who appears in any picture, with name exactly as written in the text and tags: that character's fixed look as Danbooru-style English tags for an anime image model, starting with girl or boy by the character's gender as the text shows it (other only for a creature or machine without one; no numbers), then hair, eyes, build and clothing. These tags are repeated on every picture, so leave out pose and expression; use a character name tag only when it is a well-known Danbooru character.", D = "Give places: one entry per distinct place a picture is set in, with a short name and tags: Danbooru-style English tags for that place's look (indoor or outdoor, building, materials, furniture, landscape). These tags are added to every picture set there, so leave out lighting that changes and the props of a single moment.", O = [
	"Give scenes, in reading order, one entry per picture:",
	"- paragraph: the number of the paragraph the picture retells",
	"- scene: one sentence saying what happens in this picture",
	"- caption: one plain English sentence without commas that tells an image model exactly what this picture shows: who does what to whom and where each stands in the frame. Call every character by a look, such as the pink-haired girl, never by name",
	`- shot: one of ${g.join(", ")}`,
	"- place: the name of its place in places",
	"- frame: portrait for one figure or a close-up, landscape for an establishing or wide shot or several figures side by side, square otherwise",
	"- tags: Danbooru-style English tags for this picture's lighting, time of day and the props that matter in it, plus any style or artist tags the guidance below asks for",
	"- characters: one entry per character visible in this picture, with name as in cast and tags: only this picture's pose, action, gaze and expression"
];
function k(e, t, n, r, i, a, o) {
	let s = String(n), c = e === "story" ? [`Read the story below, split into numbered paragraphs. Choose at most ${s} moments that together tell the story, in story order, so that someone who has not read it can follow it from the pictures.`] : [`Read the chat messages below, split into numbered paragraphs, and retell them as a wordless comic strip of at most ${s} panels in the order the events happen; several panels may come from one paragraph. A reader who has not seen the text must be able to follow the story from the panels alone.`, o ? "Each panel is one single picture with no lettering: no written words, captions, sound effects or signs. Turn dialogue into expressions, gestures and bubbles that hold a symbol or a small picture." : "Each panel is one single picture with no lettering: no speech bubbles, captions, sound effects or written signs. Turn dialogue into expressions and gestures."], u = a === null ? [] : [`"You" in the text is ${a}. Draw ${a} like any other character in cast, or use the pov shot when a moment is seen through ${a}'s eyes.`];
	return [
		e === "story" ? "[Inkwell scene request]" : "[Inkwell comic strip request]",
		...c,
		...C,
		...u,
		E,
		D,
		...O,
		o ? w : T,
		"Reply with only a JSON object of the form {\"cast\":[...],\"places\":[...],\"scenes\":[...]}.",
		...p(r.library),
		...l(i),
		"",
		"Paragraphs:",
		...t.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
var A = o([n(), r(n()).transform((e) => e.join(", "))]), j = t({
	name: n().trim().min(1).max(120),
	tags: A
}), M = j.extend({
	bubble: i([
		"none",
		"speech",
		"thought"
	]).catch("none"),
	symbol: i(["none", ...v]).catch("none"),
	picture: n().trim().max(120).catch("")
});
function N(e) {
	if (e.bubble === "none") return "";
	let t = e.picture.replace(/[,，\s]+/gu, " ").trim();
	return t === "" ? e.symbol === "none" ? "" : `${e.bubble === "thought" ? "thought bubble" : "speech bubble"}, ${y[e.symbol]}` : e.bubble === "thought" ? `thought bubble, imagining, ${t} in thought bubble` : `speech bubble, spoken object, ${t} in speech bubble`;
}
var P = t({
	paragraph: a().int().min(0),
	scene: n().trim().min(1).max(2e3),
	caption: n().trim().max(600).catch(""),
	shot: i(g).nullable().catch(null),
	place: n().trim().nullable().catch(null),
	frame: i([
		"portrait",
		"landscape",
		"square"
	]).catch("square"),
	tags: A,
	characters: r(M).max(16)
}), F = t({
	cast: r(j).max(32).catch([]),
	places: r(j).max(32).catch([]),
	scenes: r(P)
});
function I(e, t, n, r) {
	for (let i of d(e, "scenes")) {
		let e;
		try {
			e = JSON.parse(i);
		} catch {
			continue;
		}
		let a = F.safeParse(e);
		if (a.success) return {
			cast: a.data.cast,
			places: a.data.places,
			plans: a.data.scenes.filter((e) => e.paragraph < t).slice(0, n).map((e) => ({
				...e,
				characters: e.characters.map((e) => ({
					name: e.name,
					tags: z(e.tags, r ? N(e) : "")
				}))
			}))
		};
	}
	throw new f("The reply contains no scenes JSON object", e);
}
function L(e) {
	let t = [];
	for (let n of e) for (let e of s(n.text)) t.push({
		index: t.length,
		text: `${n.name}: ${e.text}`,
		line: e.line
	});
	return t;
}
function R(e, t, n, r, i) {
	let a = (e, t) => {
		let n = t.trim().toLowerCase();
		return e.find((e) => e.name.trim().toLowerCase() === n)?.tags ?? "";
	}, o = (e) => n.library.characters.some((t) => u(t, e)) ? "" : a(t.cast, e), s = t.plans.map((e) => ({
		...e,
		tags: z(e.shot === null ? "" : _[e.shot], e.place === null ? "" : a(t.places, e.place), e.tags),
		characters: e.characters.map((e) => ({
			name: e.name,
			tags: z(o(e.name), e.tags)
		}))
	})), l = e.map((e) => ({
		...e,
		text: ""
	}));
	return c(l, s.map((e) => ({
		...e,
		scene: ""
	})), n, r, i).map((t, n) => ({
		id: t.slot_id,
		enabled: !0,
		scene: s[n]?.scene ?? "",
		excerpt: (e[s[n]?.paragraph ?? -1]?.text ?? "").slice(0, 200),
		characters: t.characters,
		size: h[s[n]?.frame ?? "square"],
		positive_prompt: z(t.positive_prompt, (s[n]?.caption ?? "").replace(/[,，\s]+/gu, " ")),
		negative_prompt: t.negative_prompt,
		character_prompts: t.character_prompts,
		image_ids: [],
		active_image_id: null,
		last_error: null
	}));
}
function z(...e) {
	return e.map((e) => e.trim().replace(/^,+|,+$/gu, "").trim()).filter((e) => e !== "").join(", ");
}
var B = /^(?:speech|thought) bubble$/u;
function V(e) {
	return e.split(",").filter((e) => !B.test(e.trim().toLowerCase())).join(",");
}
var H = "comic, multiple views, 4koma, split screen";
function U(e, t) {
	return {
		positive_prompt: t?.style === "strip" ? z(e.positive_prompt, t.settings.style_tags) : e.positive_prompt,
		negative_prompt: t === null ? e.negative_prompt : z(e.negative_prompt, e.character_prompts.some((e) => /\b(?:speech|thought) bubble\b/u.test(e.prompt)) ? V(t.settings.no_text_tags) : t.settings.no_text_tags, H),
		character_prompts: e.character_prompts,
		size: e.size
	};
}
//#endregion
export { m as n, U as r, h as t };
