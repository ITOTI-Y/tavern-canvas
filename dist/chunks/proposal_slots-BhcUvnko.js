import { o as e } from "./wardrobe_library-D08dVzPC.js";
import { n as t, r as n } from "./library_match-C6UXduZZ.js";
import { n as r, r as i, t as a } from "./tag_normalizer-CEAU4497.js";
import { t as o } from "./analysis-6BRuPB_U.js";
//#region src/modules/illustration/slot_markers.ts
var s = "[A-Za-z0-9_-]{8,32}", c = RegExp(`<!--tc-image:(${s})-->`, "gu");
function l(e) {
	return `<!--tc-image:${e}-->`;
}
var u = [{
	id: "tavern-canvas-image-slot-display",
	script_name: "Inkwell image slot (display)",
	find_regex: `/<!--tc-image:(${s})-->/g`,
	replace_string: "<div class=\"tavern-canvas-slot\" data-tc-slot=\"$1\"></div>",
	destination: "display"
}, {
	id: "tavern-canvas-image-slot-prompt",
	script_name: "Inkwell image slot (prompt)",
	find_regex: `/\\n?<!--tc-image:${s}-->/g`,
	replace_string: "",
	destination: "prompt"
}];
function d(e) {
	return e.replace(RegExp(`\n?<!--tc-image:${s}-->`, "gu"), "");
}
function f(e) {
	return [...e.matchAll(c)].map((e) => e[1] ?? "");
}
function p(e) {
	return e.toLowerCase().replace(/[\p{P}\p{S}\s]/gu, "");
}
function m(e, t) {
	let n = p(t);
	if (n.length === 0) return null;
	let r = e.map((e) => p(e.text));
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
function h(e) {
	let t = [], n = !1;
	return e.split("\n").forEach((e, r) => {
		let i = e.trim();
		if (i.startsWith("```")) {
			n = !n;
			return;
		}
		n || i.length === 0 || f(i).length > 0 || t.push({
			index: t.length,
			text: i,
			line: r
		});
	}), t;
}
function g(e, t) {
	let n = h(e), r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = n[e.paragraph];
		if (t === void 0) throw RangeError(`Paragraph ${String(e.paragraph)} does not exist`);
		let i = r.get(t.line) ?? [];
		i.push(l(e.slot_id)), r.set(t.line, i);
	}
	return e.split("\n").flatMap((e, t) => [e, ...r.get(t) ?? []]).join("\n");
}
//#endregion
//#region src/modules/prompt/regex_transform.ts
function _(e, t) {
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
function v(e, t) {
	let n = e, r = [];
	for (let e of t) {
		let t = _(n, e);
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
function y(e, t) {
	return _(t, e).text;
}
//#endregion
//#region src/modules/illustration/slot_prompt.ts
var b = /^(?:\d+)?(girl|boy|other)s?$/u;
function x(e) {
	let t = null, n = [];
	for (let i of e.split(",")) {
		let e = b.exec(r(i).toLowerCase());
		e === null ? n.push(i) : t ??= e[1];
	}
	return {
		subject: t,
		rest: i(n)
	};
}
function S(e) {
	return [
		"girl",
		"boy",
		"other"
	].map((t) => {
		let n = e.filter((e) => e === t).length;
		return n === 0 ? "" : n === 1 ? `1${t}` : `${String(n)}${t}s`;
	}).filter((e) => e !== "").join(", ");
}
function C(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.triggers) n.set(r(t), e.replacement);
	return i(e.split(",").map((e) => n.get(r(e)) ?? e));
}
function w(e, t) {
	if (t === null) return a(e);
	let n = C(e, t.replacement_rules);
	return a(v(n, t.regex_rules).text);
}
function T(t, n) {
	return i(e.filter((e) => e !== "expression" || !n).flatMap((e) => t.appearance[e]));
}
function E(e, t) {
	let n = new Set(t.map((e) => e.trim().toLowerCase()));
	return i(e.split(",").filter((e) => {
		let t = r(e).toLowerCase().replace(/^wearing\s+/u, "");
		return !n.has(t);
	}));
}
function D(e) {
	let n = e.library.characters, r = [], a = /* @__PURE__ */ new Set(), o = (t, o, s) => {
		let c = n[t];
		if (c === void 0 || a.has(c.character.id)) return;
		a.add(c.character.id);
		let l = x(E(o, e.library.outfit_names));
		r.push({
			name: c.character.name,
			subject: c.character.subject === "other" ? l.subject ?? "other" : c.character.subject,
			prompt: i([
				T(c.character, l.rest !== ""),
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
		let a = x(i.tags);
		(a.subject !== null || a.rest !== "") && r.push({
			name: i.name,
			subject: a.subject,
			prompt: a.rest,
			negative_prompt: "",
			...i.center === void 0 ? {} : { center: i.center }
		});
	}
	return r;
}
function O(e, t) {
	return e.x === t.x && e.y === t.y;
}
function k(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	return e.forEach((e, r) => {
		let i = e.center;
		i !== void 0 && (t.some((e) => O(e, i)) ? n.add(r) : t.push(i));
	}), e.map((e, r) => {
		let i = e.center;
		if (i === void 0 || !n.has(r)) return e;
		let a = o.filter((e) => !t.some((t) => O(t, {
			x: e,
			y: i.y
		}))).sort((e, t) => Math.abs(e - i.x) - Math.abs(t - i.x))[0];
		if (a === void 0) return e;
		let s = {
			x: a,
			y: i.y
		};
		return t.push(s), {
			...e,
			center: s
		};
	});
}
function A(e) {
	return e.some((e) => e.center === void 0) ? e : e.map((e, t) => ({
		draft: e,
		index: t
	})).sort((e, t) => (e.draft.center?.x ?? 0) - (t.draft.center?.x ?? 0) || (e.draft.center?.y ?? 0) - (t.draft.center?.y ?? 0) || e.index - t.index).map(({ draft: e }) => e);
}
function j(e) {
	let t = e.preset, n = A(k(D(e))), r = a(t?.fixed_negative_prompt ?? "");
	if (n.length === 0) return {
		positive_prompt: w(i([t?.fixed_positive_prompt, e.scene_tags]), t),
		negative_prompt: r,
		character_prompts: []
	};
	let o = n.flatMap((e) => e.subject === null ? [] : [e.subject]);
	return {
		positive_prompt: w(i([
			t?.fixed_positive_prompt,
			S(o),
			x(e.scene_tags).rest
		]), t),
		negative_prompt: r,
		character_prompts: n.flatMap((e) => {
			let n = w(i([e.subject, e.prompt]), t);
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
function M(e) {
	return e.replace(/[,，\s]+/gu, " ").trim();
}
function N(e, t, r, a, o) {
	return t.map((t) => {
		let s = n(`${e[t.paragraph]?.text ?? ""}\n${t.scene}`, t.characters.map((e) => e.name), r.library, a), c = j({
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
			positive_prompt: i([c.positive_prompt, M(t.caption)]),
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
export { m as a, g as i, y as n, h as o, u as r, d as s, N as t };
