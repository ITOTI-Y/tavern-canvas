import { o as e } from "./wardrobe_library-D08dVzPC.js";
import { n as t, r as n } from "./library_match-C6UXduZZ.js";
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
	return e.replace(RegExp(`\n?<!--tc-image:${o}-->`, "gu"), "");
}
function d(e) {
	return [...e.matchAll(s)].map((e) => e[1] ?? "");
}
function f(e) {
	return e.toLowerCase().replace(/[\p{P}\p{S}\s]/gu, "");
}
function p(e, t) {
	let n = f(t);
	if (n.length === 0) return null;
	let r = e.map((e) => f(e.text));
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
function m(e) {
	let t = [], n = !1;
	return e.split("\n").forEach((e, r) => {
		let i = e.trim();
		if (i.startsWith("```")) {
			n = !n;
			return;
		}
		n || i.length === 0 || d(i).length > 0 || t.push({
			index: t.length,
			text: i,
			line: r
		});
	}), t;
}
function h(e, t) {
	let n = m(e), r = /* @__PURE__ */ new Map();
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
function g(e, t) {
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
function _(e, t) {
	let n = e, r = [];
	for (let e of t) {
		let t = g(n, e);
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
function v(e, t) {
	return g(t, e).text;
}
//#endregion
//#region src/modules/illustration/slot_prompt.ts
var y = /^(?:\d+)?(girl|boy|other)s?$/u;
function b(e) {
	let t = null, n = [];
	for (let i of e.split(",")) {
		let e = y.exec(r(i).toLowerCase());
		e === null ? n.push(i) : t ??= e[1];
	}
	return {
		subject: t,
		rest: i(n)
	};
}
function x(e) {
	return [
		"girl",
		"boy",
		"other"
	].map((t) => {
		let n = e.filter((e) => e === t).length;
		return n === 0 ? "" : n === 1 ? `1${t}` : `${String(n)}${t}s`;
	}).filter((e) => e !== "").join(", ");
}
function S(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.triggers) n.set(r(t), e.replacement);
	return i(e.split(",").map((e) => n.get(r(e)) ?? e));
}
function C(e, t) {
	if (t === null) return a(e);
	let n = S(e, t.replacement_rules);
	return a(_(n, t.regex_rules).text);
}
function w(t, n) {
	return i(e.filter((e) => e !== "expression" || !n).flatMap((e) => t.appearance[e]));
}
function T(e, t) {
	let n = new Set(t.map((e) => e.trim().toLowerCase()));
	return i(e.split(",").filter((e) => {
		let t = r(e).toLowerCase().replace(/^wearing\s+/u, "");
		return !n.has(t);
	}));
}
function E(e) {
	let n = e.library.characters, r = [], a = /* @__PURE__ */ new Set(), o = (t, o, s) => {
		let c = n[t];
		if (c === void 0 || a.has(c.character.id)) return;
		a.add(c.character.id);
		let l = b(T(o, e.library.outfit_names));
		r.push({
			name: c.character.name,
			subject: c.character.subject === "other" ? l.subject ?? "other" : c.character.subject,
			prompt: i([
				w(c.character, l.rest !== ""),
				i(c.outfit_tags),
				l.rest
			]),
			negative_prompt: i(c.character.excluded_traits),
			...s === void 0 ? {} : { center: s }
		});
	};
	for (let i of e.characters) {
		let e = n.findIndex((e) => t(e.character, i.name));
		if (e !== -1) {
			o(e, i.tags, i.center);
			continue;
		}
		let a = b(i.tags);
		(a.subject !== null || a.rest !== "") && r.push({
			name: i.name,
			subject: a.subject,
			prompt: a.rest,
			negative_prompt: "",
			...i.center === void 0 ? {} : { center: i.center }
		});
	}
	return n.forEach((e, t) => {
		o(t, "");
	}), r;
}
function D(e) {
	let t = e.preset, n = E(e), r = a(t?.fixed_negative_prompt ?? "");
	if (n.length === 0) return {
		positive_prompt: C(i([t?.fixed_positive_prompt, e.scene_tags]), t),
		negative_prompt: r,
		character_prompts: []
	};
	let o = n.flatMap((e) => e.subject === null ? [] : [e.subject]);
	return {
		positive_prompt: C(i([
			t?.fixed_positive_prompt,
			x(o),
			b(e.scene_tags).rest
		]), t),
		negative_prompt: r,
		character_prompts: n.flatMap((e) => {
			let n = C(i([e.subject, e.prompt]), t);
			return n === "" ? [] : [{
				name: e.name,
				prompt: n,
				negative_prompt: a(e.negative_prompt),
				...e.center === void 0 ? {} : { center: e.center }
			}];
		})
	};
}
//#endregion
//#region src/modules/illustration/proposal_slots.ts
function O(e) {
	return e.replace(/[,，\s]+/gu, " ").trim();
}
function k(e, t, r, a, o) {
	return t.map((t) => {
		let s = n(`${e[t.paragraph]?.text ?? ""}\n${t.scene}`, t.characters.map((e) => e.name), r.library, a), c = D({
			preset: r.preset,
			library: s,
			characters: t.characters,
			scene_tags: t.tags
		});
		return {
			slot_id: o(),
			paragraph: t.paragraph,
			anchor: (e[t.paragraph]?.text ?? "").slice(0, 400),
			scene: t.scene,
			characters: [.../* @__PURE__ */ new Set([...t.characters.map((e) => e.name), ...s.characters.map((e) => e.character.name)])],
			positive_prompt: i([c.positive_prompt, O(t.caption)]),
			negative_prompt: c.negative_prompt,
			character_prompts: [...c.character_prompts],
			...t.size === void 0 ? {} : { size: { ...t.size } },
			image_ids: [],
			active_image_id: null,
			pending_request_ids: [],
			last_error: null
		};
	});
}
//#endregion
export { p as a, h as i, v as n, m as o, l as r, u as s, k as t };
