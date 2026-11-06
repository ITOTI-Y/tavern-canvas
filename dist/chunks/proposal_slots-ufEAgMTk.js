import { o as e } from "./wardrobe_library-BkM-wKPK.js";
import { i as t, r as n } from "./model_json-DnhzkPSG.js";
import { n as r, r as i, t as a } from "./tag_normalizer-CEAU4497.js";
//#region src/modules/illustration/slot_markers.ts
var o = "[A-Za-z0-9_-]{8,32}", s = RegExp(`<!--tc-image:(${o})-->`, "gu");
function c(e) {
	return `<!--tc-image:${e}-->`;
}
var l = [{
	id: "tavern-canvas-image-slot-display",
	script_name: "Inkwell image slot (display)",
	find_regex: `/<!--tc-image:(${o})-->/g`,
	replace_string: "<div class=\"tavern-canvas-slot\" data-tc-slot=\"$1\"></div>",
	destination: "display"
}, {
	id: "tavern-canvas-image-slot-prompt",
	script_name: "Inkwell image slot (prompt)",
	find_regex: `/\\n?<!--tc-image:${o}-->/g`,
	replace_string: "",
	destination: "prompt"
}];
function u(e) {
	return [...e.matchAll(s)].map((e) => e[1] ?? "");
}
function d(e) {
	return e.toLowerCase().replace(/[\p{P}\p{S}\s]/gu, "");
}
function f(e, t) {
	let n = d(t);
	if (n.length === 0) return null;
	let r = e.map((e) => d(e.text));
	for (let t of [
		24,
		12,
		6
	]) {
		let i = n.slice(0, t), a = r.findIndex((e) => e.includes(i));
		if (a !== -1) return e[a]?.index ?? null;
	}
	return null;
}
function p(e) {
	let t = [], n = !1;
	return e.split("\n").forEach((e, r) => {
		let i = e.trim();
		if (i.startsWith("```")) {
			n = !n;
			return;
		}
		n || i.length === 0 || u(i).length > 0 || t.push({
			index: t.length,
			text: i,
			line: r
		});
	}), t;
}
function m(e, t) {
	let n = p(e), r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = n[e.paragraph];
		if (t === void 0) throw RangeError(`Paragraph ${String(e.paragraph)} does not exist`);
		let i = r.get(t.line) ?? [];
		i.push(c(e.slot_id)), r.set(t.line, i);
	}
	return e.split("\n").flatMap((e, t) => [e, ...r.get(t) ?? []]).join("\n");
}
//#endregion
//#region src/modules/prompt/regex_transform.ts
function h(e, t) {
	try {
		let n = new RegExp(t.pattern, t.flags);
		return {
			text: e.replace(n, t.replacement),
			error: null
		};
	} catch (t) {
		return {
			text: e,
			error: t instanceof Error ? t.message : String(t)
		};
	}
}
function g(e, t) {
	let n = e, r = [];
	for (let e of t) {
		let t = h(n, e);
		n = t.text, t.error !== null && r.push({
			rule_id: e.id,
			error: t.error
		});
	}
	return {
		text: n,
		failures: r
	};
}
function _(e, t) {
	return h(t, e).text;
}
//#endregion
//#region src/modules/illustration/slot_prompt.ts
var v = /^(?:\d+)?(girl|boy|other)s?$/u;
function y(e) {
	let t = null, n = [];
	for (let i of e.split(",")) {
		let e = v.exec(r(i).toLowerCase());
		e === null ? n.push(i) : t ??= e[1];
	}
	return {
		subject: t,
		rest: i(n)
	};
}
function b(e) {
	return [
		"girl",
		"boy",
		"other"
	].map((t) => {
		let n = e.filter((e) => e === t).length;
		return n === 0 ? "" : n === 1 ? `1${t}` : `${String(n)}${t}s`;
	}).filter((e) => e !== "").join(", ");
}
function x(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.triggers) n.set(r(t), e.replacement);
	return i(e.split(",").map((e) => n.get(r(e)) ?? e));
}
function S(e, t) {
	if (t === null) return a(e);
	let n = x(e, t.replacement_rules);
	return a(g(n, t.regex_rules).text);
}
function C(t, n) {
	return i(e.filter((e) => e !== "expression" || !n).flatMap((e) => t.appearance[e]));
}
function w(e, t) {
	let n = new Set(t.map((e) => e.trim().toLowerCase()));
	return i(e.split(",").filter((e) => {
		let t = r(e).toLowerCase().replace(/^wearing\s+/u, "");
		return !n.has(t);
	}));
}
function T(e) {
	let t = e.library.characters, r = [], a = /* @__PURE__ */ new Set(), o = (n, o) => {
		let s = t[n];
		if (s === void 0 || a.has(s.character.id)) return;
		a.add(s.character.id);
		let c = y(w(o, e.library.outfit_names));
		r.push({
			name: s.character.name,
			subject: s.character.subject === "other" ? c.subject ?? "other" : s.character.subject,
			prompt: i([
				C(s.character, c.rest !== ""),
				i(s.outfit_tags),
				c.rest
			]),
			negative_prompt: i(s.character.excluded_traits)
		});
	};
	for (let i of e.characters) {
		let e = t.findIndex((e) => n(e.character, i.name));
		if (e !== -1) {
			o(e, i.tags);
			continue;
		}
		let a = y(i.tags);
		(a.subject !== null || a.rest !== "") && r.push({
			name: i.name,
			subject: a.subject,
			prompt: a.rest,
			negative_prompt: ""
		});
	}
	return t.forEach((e, t) => {
		o(t, "");
	}), r;
}
function E(e) {
	let t = e.preset, n = T(e), r = a(t?.fixed_negative_prompt ?? "");
	if (n.length === 0) return {
		positive_prompt: S(i([t?.fixed_positive_prompt, e.scene_tags]), t),
		negative_prompt: r,
		character_prompts: []
	};
	let o = n.flatMap((e) => e.subject === null ? [] : [e.subject]);
	return {
		positive_prompt: S(i([
			t?.fixed_positive_prompt,
			b(o),
			y(e.scene_tags).rest
		]), t),
		negative_prompt: r,
		character_prompts: n.flatMap((e) => {
			let n = S(i([e.subject, e.prompt]), t);
			return n === "" ? [] : [{
				name: e.name,
				prompt: n,
				negative_prompt: a(e.negative_prompt)
			}];
		})
	};
}
//#endregion
//#region src/modules/illustration/proposal_slots.ts
function D(e, n, r, i, a) {
	return n.map((n) => {
		let o = t(`${e[n.paragraph]?.text ?? ""}\n${n.scene}`, n.characters.map((e) => e.name), r.library, i), s = E({
			preset: r.preset,
			library: o,
			characters: n.characters,
			scene_tags: n.tags
		});
		return {
			slot_id: a(),
			paragraph: n.paragraph,
			anchor: (e[n.paragraph]?.text ?? "").slice(0, 400),
			scene: n.scene,
			characters: [.../* @__PURE__ */ new Set([...n.characters.map((e) => e.name), ...o.characters.map((e) => e.character.name)])],
			positive_prompt: s.positive_prompt,
			negative_prompt: s.negative_prompt,
			character_prompts: [...s.character_prompts],
			image_ids: [],
			active_image_id: null,
			pending_request_ids: [],
			last_error: null
		};
	});
}
//#endregion
export { f as a, m as i, _ as n, p as o, l as r, D as t };
