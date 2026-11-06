import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { d as t, g as n, r, t as i, u as a, v as o } from "./schemas-BjkyCQYG.js";
import { n as s, s as c, u as l } from "./analysis-5v7pfQ9S.js";
import { r as u, t as d } from "./model_json-DnhzkPSG.js";
import { o as f, t as p } from "./proposal_slots-ufEAgMTk.js";
//#region src/modules/creation/creation_planning.ts
var m = /* @__PURE__ */ e({
	FRAME_SIZES: () => h,
	SCENE_JSON_SCHEMA: () => y,
	SHOTS: () => g,
	build_scene_input: () => w,
	parse_scene_output: () => k,
	scene_generation_input: () => P,
	scenes_from_plans: () => j,
	strip_paragraphs: () => A
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
}, v = {
	type: "object",
	properties: {
		name: { type: "string" },
		tags: { type: "string" }
	},
	required: ["name", "tags"],
	additionalProperties: !1
}, y = {
	name: "tavern_canvas_scenes",
	value: {
		type: "object",
		properties: {
			cast: {
				type: "array",
				items: v
			},
			places: {
				type: "array",
				items: v
			},
			scenes: {
				type: "array",
				items: {
					type: "object",
					properties: {
						paragraph: { type: "integer" },
						scene: { type: "string" },
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
							items: v
						}
					},
					required: [
						"paragraph",
						"scene",
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
}, b = [
	"Plan the pictures like a storyboard:",
	"- The first picture establishes the place, who is there and the time of day.",
	"- Each later picture shows the next story beat: an action, its result or a reaction. Something visible changes from the previous picture: a pose, a gesture, an object changing hands, an expression, the light.",
	"- Show feelings through faces, gestures and body language. Use a close-up for an emotional beat and an insert shot for an object the plot turns on.",
	"- Vary shot sizes and camera angles; do not repeat the same framing in consecutive pictures.",
	"- Keep the place, the lighting and each character's look the same unless the story changes them.",
	"- Put everyone who takes part in a moment into its picture, so both sides of an exchange are visible. Characters look at each other or at what they are doing, not at the viewer, except in a pov shot.",
	"- Make what is only said or thought visible. When a character tells of a danger, a memory or something far away, draw that thing itself, or the speaker pointing at it with the listener reacting in the same picture; never a picture of something the reader has not been shown a reason for.",
	"- Lead into every change of view: before a picture of a new place or object, the previous picture shows someone looking at it, pointing at it or moving toward it."
], x = "Give cast: one entry per character who appears in any picture, with name exactly as written in the text and tags: that character's fixed look as Danbooru-style English tags for an anime image model, starting with girl or boy by the character's gender as the text shows it (other only for a creature or machine without one; no numbers), then hair, eyes, build and clothing. These tags are repeated on every picture, so leave out pose and expression; use a character name tag only when it is a well-known Danbooru character.", S = "Give places: one entry per distinct place a picture is set in, with a short name and tags: Danbooru-style English tags for that place's look (indoor or outdoor, building, materials, furniture, landscape). These tags are added to every picture set there, so leave out lighting that changes and the props of a single moment.", C = [
	"Give scenes, in reading order, one entry per picture:",
	"- paragraph: the number of the paragraph the picture retells",
	"- scene: one sentence saying what happens in this picture",
	`- shot: one of ${g.join(", ")}`,
	"- place: the name of its place in places",
	"- frame: portrait for one figure or a close-up, landscape for an establishing or wide shot or several figures side by side, square otherwise",
	"- tags: Danbooru-style English tags for this picture's lighting, time of day and the props that matter in it, plus any style or artist tags the guidance below asks for",
	"- characters: one entry per character visible in this picture, with name as in cast and tags: only this picture's pose, action, gaze and expression"
];
function w(e, t, n, r, i, a) {
	let o = String(n), s = e === "story" ? [`Read the story below, split into numbered paragraphs. Choose at most ${o} moments that together tell the story, in story order, so that someone who has not read it can follow it from the pictures.`] : [`Read the chat messages below, split into numbered paragraphs, and retell them as a wordless comic strip of at most ${o} panels in the order the events happen; several panels may come from one paragraph. A reader who has not seen the text must be able to follow the story from the panels alone.`, "Each panel is one single picture with no lettering: no speech bubbles, captions, sound effects or written signs. Turn dialogue into expressions and gestures."], u = a === null ? [] : [`"You" in the text is ${a}. Draw ${a} like any other character in cast, or use the pov shot when a moment is seen through ${a}'s eyes.`];
	return [
		e === "story" ? "[Inkwell scene request]" : "[Inkwell comic strip request]",
		...s,
		...b,
		...u,
		x,
		S,
		...C,
		"Reply with only a JSON object of the form {\"cast\":[...],\"places\":[...],\"scenes\":[...]}.",
		...c(r.library),
		...l(i),
		"",
		"Paragraphs:",
		...t.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
var T = o([n(), r(n()).transform((e) => e.join(", "))]), E = t({
	name: n().trim().min(1).max(120),
	tags: T
}), D = t({
	paragraph: a().int().min(0),
	scene: n().trim().min(1).max(2e3),
	shot: i(g).nullable().catch(null),
	place: n().trim().nullable().catch(null),
	frame: i([
		"portrait",
		"landscape",
		"square"
	]).catch("square"),
	tags: T,
	characters: r(E).max(16)
}), O = t({
	cast: r(E).max(32).catch([]),
	places: r(E).max(32).catch([]),
	scenes: r(D)
});
function k(e, t, n) {
	for (let r of d(e, "scenes")) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let i = O.safeParse(e);
		if (i.success) return {
			cast: i.data.cast,
			places: i.data.places,
			plans: i.data.scenes.filter((e) => e.paragraph < t).slice(0, n)
		};
	}
	throw new s("The reply contains no scenes JSON object", e);
}
function A(e) {
	let t = [];
	for (let n of e) for (let e of f(n.text)) t.push({
		index: t.length,
		text: `${n.name}: ${e.text}`,
		line: e.line
	});
	return t;
}
function j(e, t, n, r, i) {
	let a = (e, t) => {
		let n = t.trim().toLowerCase();
		return e.find((e) => e.name.trim().toLowerCase() === n)?.tags ?? "";
	}, o = (e) => n.library.characters.some((t) => u(t, e)) ? "" : a(t.cast, e), s = t.plans.map((e) => ({
		...e,
		tags: M(e.shot === null ? "" : _[e.shot], e.place === null ? "" : a(t.places, e.place), e.tags),
		characters: e.characters.map((e) => ({
			name: e.name,
			tags: M(o(e.name), e.tags)
		}))
	})), c = e.map((e) => ({
		...e,
		text: ""
	}));
	return p(c, s.map((e) => ({
		...e,
		scene: ""
	})), n, r, i).map((t, n) => ({
		id: t.slot_id,
		enabled: !0,
		scene: s[n]?.scene ?? "",
		excerpt: (e[s[n]?.paragraph ?? -1]?.text ?? "").slice(0, 200),
		characters: t.characters,
		size: h[s[n]?.frame ?? "square"],
		positive_prompt: t.positive_prompt,
		negative_prompt: t.negative_prompt,
		character_prompts: t.character_prompts,
		image_ids: [],
		active_image_id: null,
		last_error: null
	}));
}
function M(...e) {
	return e.map((e) => e.trim().replace(/^,+|,+$/gu, "").trim()).filter((e) => e !== "").join(", ");
}
var N = "comic, multiple views, 4koma, split screen";
function P(e, t) {
	return {
		positive_prompt: t?.style === "strip" ? M(e.positive_prompt, t.settings.style_tags) : e.positive_prompt,
		negative_prompt: t === null ? e.negative_prompt : M(e.negative_prompt, t.settings.no_text_tags, N),
		character_prompts: e.character_prompts,
		size: e.size
	};
}
//#endregion
export { m as n, P as r, h as t };
