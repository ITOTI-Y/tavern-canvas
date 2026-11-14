import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { d as t, g as n, r, t as i, u as a, v as o, y as s } from "./schemas-BjkyCQYG.js";
import { o as c, t as l } from "./proposal_slots-BbPBfZTa.js";
import { t as u } from "./user_guidance-Bx38WM6V.js";
import { n as d } from "./library_match-CF9rnk-0.js";
import { t as f } from "./analysis_error-a25bWfWj.js";
import { t as p } from "./model_json-B2EVqBvs.js";
import { a as m, i as h, n as g } from "./size_choice-BAuN1-V0.js";
import { i as _, n as v, t as y } from "./analysis-BGYu8mAR.js";
import { n as b } from "./analysis_prompts-MT5pm1R7.js";
//#region src/modules/creation/creation_planning.ts
var x = /* @__PURE__ */ e({
	BUBBLE_SYMBOLS: () => T,
	FRAME_SIZES: () => S,
	SCENE_JSON_SCHEMA: () => k,
	SHOTS: () => C,
	build_scene_input: () => R,
	parse_scene_output: () => G,
	scene_generation_input: () => $,
	scene_json_schema: () => A,
	scenes_from_plans: () => J,
	strip_paragraphs: () => q
}), S = {
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
}, C = [
	"establishing",
	"wide",
	"medium",
	"close-up",
	"extreme close-up",
	"over the shoulder",
	"pov",
	"insert"
], w = {
	establishing: "wide shot, scenery",
	wide: "wide shot, full body",
	medium: "cowboy shot",
	"close-up": "close-up, portrait",
	"extreme close-up": "close-up, face focus",
	"over the shoulder": "from behind, depth of field",
	pov: "pov",
	insert: "close-up, still life, object focus"
}, T = [
	"question",
	"exclamation",
	"interrobang",
	"ellipsis",
	"heart",
	"anger",
	"sweat",
	"music",
	"zzz"
], E = {
	question: "spoken question mark",
	exclamation: "spoken exclamation mark",
	interrobang: "spoken interrobang",
	ellipsis: "spoken ellipsis",
	heart: "spoken heart",
	anger: "spoken anger vein",
	sweat: "spoken sweatdrop",
	music: "spoken musical note",
	zzz: "spoken zzz"
}, D = {
	type: "object",
	properties: {
		name: { type: "string" },
		tags: { type: "string" }
	},
	required: ["name", "tags"],
	additionalProperties: !1
}, O = {
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
			enum: ["none", ...T]
		},
		picture: { type: "string" },
		position: y
	},
	required: [
		"name",
		"tags",
		"bubble",
		"symbol",
		"picture",
		"position"
	],
	additionalProperties: !1
}, k = {
	name: "tavern_canvas_scenes",
	value: {
		type: "object",
		properties: {
			cast: {
				type: "array",
				items: D
			},
			places: {
				type: "array",
				items: D
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
							enum: [...C]
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
							items: O
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
};
function A(e) {
	if (e.length < 2) return k;
	let t = k.value, n = t.properties.scenes, { frame: r, ...i } = n.items.properties;
	return {
		name: k.name,
		value: {
			...t,
			properties: {
				...t.properties,
				scenes: {
					...n,
					items: {
						...n.items,
						properties: {
							...i,
							size: m(e)
						},
						required: n.items.required.map((e) => e === "frame" ? "size" : e)
					}
				}
			}
		}
	};
}
var j = [
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
], M = `  and, only where what the character says or thinks carries the story, bubble: speech or thought (none otherwise) holding either symbol: one of ${T.join(", ")} (none otherwise), or picture: two to five English words naming the one thing spoken or thought about, drawn small inside the bubble, such as black wolf with red eyes (empty otherwise). One bubble per character at most; a bubble never holds words.`, N = "  and bubble: none, symbol: none, picture: empty", P = "Give cast: one entry per character who appears in any picture, with name exactly as written in the text and tags: that character's fixed look as Danbooru-style English tags for an anime image model, starting with girl or boy by the character's gender as the text shows it (other only for a creature or machine without one; no numbers), then hair, eyes, build and clothing. These tags are repeated on every picture, so leave out pose and expression; use a character name tag only when it is a well-known Danbooru character.", F = "Give places: one entry per distinct place a picture is set in, with a short name and tags: Danbooru-style English tags for that place's look (indoor or outdoor, building, materials, furniture, landscape). These tags are added to every picture set there, so leave out lighting that changes and the props of a single moment.", I = [
	"Give scenes, in reading order, one entry per picture:",
	"- paragraph: the number of the paragraph the picture retells",
	"- scene: one sentence saying what happens in this picture",
	"- caption: one plain English sentence without commas that tells an image model exactly what this picture shows: who does what to whom and where each stands in the frame. Call every character by a look, such as the pink-haired girl, never by name",
	`- shot: one of ${C.join(", ")}`,
	"- place: the name of its place in places",
	"- tags: Danbooru-style English tags for this picture's lighting, time of day and the props that matter in it, plus any style or artist tags the guidance below asks for",
	"- characters: one entry per character visible in this picture, with name as in cast, tags: only this picture's pose, action, gaze and expression, and position: where the character is in the picture, x one of left, center-left, center, center-right, right and y one of top, middle, bottom, where bottom is nearer the viewer",
	"Animals and creatures that take part in a moment are characters too: list them in cast and give each its own entry, named by kind such as wolf 1, with tags starting with other. For an action between two characters, put it in both entries with a prefix: source# for the one who acts and target# for the one acted on, or mutual# on both, such as source#hug and target#hug."
], L = "- frame: portrait for one figure or a close-up, landscape for an establishing or wide shot or several figures side by side, square otherwise";
function R(e, t, n, r, i, a, o, s) {
	let c = String(n), l = e === "story" ? [`Read the story below, split into numbered paragraphs. Choose at most ${c} moments that together tell the story, in story order, so that someone who has not read it can follow it from the pictures.`] : [`Read the chat messages below, split into numbered paragraphs, and retell them as a wordless comic strip of at most ${c} panels in the order the events happen; several panels may come from one paragraph. A reader who has not seen the text must be able to follow the story from the panels alone.`, o ? "Each panel is one single picture with no lettering: no written words, captions, sound effects or signs. Turn dialogue into expressions, gestures and bubbles that hold a symbol or a small picture." : "Each panel is one single picture with no lettering: no speech bubbles, captions, sound effects or written signs. Turn dialogue into expressions and gestures."], d = a === null ? [] : [`"You" in the text is ${a}. Draw ${a} like any other character in cast, or use the pov shot when a moment is seen through ${a}'s eyes.`];
	return [
		e === "story" ? "[Inkwell scene request]" : "[Inkwell comic strip request]",
		...l,
		...j,
		...d,
		P,
		F,
		...I,
		...s.length < 2 ? [L] : h(s),
		o ? M : N,
		"Reply with only a JSON object of the form {\"cast\":[...],\"places\":[...],\"scenes\":[...]}.",
		...b(r.library),
		...u(i),
		"",
		"Paragraphs:",
		...t.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
var z = o([n(), r(n()).transform((e) => e.join(", "))]), B = t({
	name: n().trim().min(1).max(120),
	tags: z
}), V = B.extend({
	bubble: i([
		"none",
		"speech",
		"thought"
	]).catch("none"),
	symbol: i(["none", ...T]).catch("none"),
	picture: n().trim().max(120).catch(""),
	position: v
});
function H(e) {
	if (e.bubble === "none") return "";
	let t = e.picture.replace(/[,，\s]+/gu, " ").trim();
	return t === "" ? e.symbol === "none" ? "" : `${e.bubble === "thought" ? "thought bubble" : "speech bubble"}, ${E[e.symbol]}` : e.bubble === "thought" ? `thought bubble, imagining, ${t} in thought bubble` : `speech bubble, spoken object, ${t} in speech bubble`;
}
var U = t({
	paragraph: a().int().min(0),
	scene: n().trim().min(1).max(2e3),
	caption: n().trim().max(600).catch(""),
	shot: i(C).nullable().catch(null),
	place: n().trim().nullable().catch(null),
	frame: i([
		"portrait",
		"landscape",
		"square"
	]).catch("square"),
	tags: z,
	characters: r(V).max(16),
	size: s().optional()
}), W = t({
	cast: r(B).max(32).catch([]),
	places: r(B).max(32).catch([]),
	scenes: r(U)
});
function G(e, t, n, r, i = []) {
	for (let a of p(e, "scenes")) {
		let e;
		try {
			e = JSON.parse(a);
		} catch {
			continue;
		}
		let o = W.safeParse(e);
		if (o.success) return {
			cast: o.data.cast,
			places: o.data.places,
			plans: o.data.scenes.filter((e) => e.paragraph < t).slice(0, n).map(({ size: e, ...t }) => ({
				...t,
				...K(g(e, i)),
				characters: t.characters.map((e) => ({
					name: e.name,
					tags: Y(e.tags, r ? H(e) : ""),
					..._(e.position)
				}))
			}))
		};
	}
	throw new f("The reply contains no scenes JSON object", e);
}
function K(e) {
	return e === void 0 ? {} : { size: e };
}
function q(e) {
	let t = [];
	for (let n of e) for (let e of c(n.text)) t.push({
		index: t.length,
		text: `${n.name}: ${e.text}`,
		line: e.line
	});
	return t;
}
function J(e, t, n, r, i) {
	let a = (e, t) => {
		let n = t.trim().toLowerCase();
		return e.find((e) => e.name.trim().toLowerCase() === n)?.tags ?? "";
	}, o = (e) => n.library.characters.some((t) => d(t, e)) ? "" : a(t.cast, e), s = t.plans.map((e) => ({
		...e,
		tags: Y(e.shot === null ? "" : w[e.shot], e.place === null ? "" : a(t.places, e.place), e.tags),
		characters: e.characters.map((e) => ({
			...e,
			tags: Y(o(e.name), e.tags)
		}))
	})), c = e.map((e) => ({
		...e,
		text: ""
	}));
	return l(c, s.map((e) => ({
		...e,
		scene: ""
	})), n, r, i).map((t, n) => ({
		id: t.slot_id,
		enabled: !0,
		scene: s[n]?.scene ?? "",
		excerpt: (e[s[n]?.paragraph ?? -1]?.text ?? "").slice(0, 200),
		characters: t.characters,
		size: s[n]?.size ?? S[s[n]?.frame ?? "square"],
		positive_prompt: t.positive_prompt,
		negative_prompt: t.negative_prompt,
		character_prompts: t.character_prompts,
		image_ids: [],
		active_image_id: null,
		last_error: null
	}));
}
function Y(...e) {
	return e.map((e) => e.trim().replace(/^,+|,+$/gu, "").trim()).filter((e) => e !== "").join(", ");
}
var X = /^(?:speech|thought) bubble$/u;
function Z(e) {
	return e.split(",").filter((e) => !X.test(e.trim().toLowerCase())).join(",");
}
var Q = "comic, multiple views, 4koma, split screen";
function $(e, t) {
	return {
		positive_prompt: t?.style === "strip" ? Y(e.positive_prompt, t.settings.style_tags) : e.positive_prompt,
		negative_prompt: t === null ? e.negative_prompt : Y(e.negative_prompt, e.character_prompts.some((e) => /\b(?:speech|thought) bubble\b/u.test(e.prompt)) ? Z(t.settings.no_text_tags) : t.settings.no_text_tags, Q),
		character_prompts: e.character_prompts,
		size: e.size
	};
}
//#endregion
export { x as n, $ as r, S as t };
