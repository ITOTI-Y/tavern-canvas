import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
//#region src/modules/illustration/inline_analysis.ts
var t = /* @__PURE__ */ e({
	INLINE_FIELD: () => r,
	INLINE_MACRO: () => i,
	INLINE_STRUCTURE_ID: () => n,
	build_inline_request: () => a,
	paragraph_of_quote: () => s,
	resolve_inline_reply: () => c
}), n = "inkwell", r = "inkwell_illustrations", i = "inkwell_illustration_request";
function a(e, t) {
	return [
		e,
		...t === null ? [] : [
			"",
			t,
			"Here the latest reply is the one you are writing now."
		],
		"",
		`Fill the ${r} field with one JSON object written as a string: ${t === null ? "{\"illustrations\":[...]}" : "{\"illustrations\":[...],\"wardrobe\":{\"characters\":[...],\"initial_outfits\":{...}}}"}. Give at least one illustration whenever your reply shows a visible scene. This replaces the reply format each request states.`
	].join("\n");
}
function o(e) {
	return e.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}
function s(e, t) {
	let n = o(e).slice(0, 24);
	return n.length < 4 ? null : (t.find((e) => o(e.text).startsWith(n)) ?? t.find((e) => o(e.text).includes(n)))?.index ?? null;
}
function c(e, t) {
	let n;
	try {
		n = JSON.parse(e);
	} catch {
		return null;
	}
	if (typeof n != "object" || !n || Array.isArray(n)) return null;
	let r = n, i = (Array.isArray(r.illustrations) ? r.illustrations : []).flatMap((e) => {
		if (typeof e != "object" || !e) return [];
		let { quote: n, ...r } = e, i = typeof n == "string" ? s(n, t) : null;
		return i === null ? [] : [{
			...r,
			paragraph: i
		}];
	});
	return JSON.stringify({
		...r,
		illustrations: i
	});
}
//#endregion
export { t as i, i as n, n as r, r as t };
