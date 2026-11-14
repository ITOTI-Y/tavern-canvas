import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
//#region src/modules/illustration/size_choice.ts
var t = /* @__PURE__ */ e({
	active_sizes: () => n,
	chosen_size: () => s,
	size_field_lines: () => a,
	size_json_schema: () => o,
	size_key: () => r
});
function n(e, t) {
	let n = t === null ? void 0 : e.size_set_by_chat[t], r = n === void 0 ? e.size_set_id : n;
	return e.size_sets.find((e) => e.id === r)?.sizes ?? [];
}
function r(e) {
	return `${String(e.width)}x${String(e.height)}`;
}
function i(e) {
	let t = e.width / e.height;
	return t >= 1.15 ? `wide ${t.toFixed(2)}:1` : t <= 1 / 1.15 ? `tall 1:${(1 / t).toFixed(2)}` : "square";
}
function a(e) {
	return e.length < 2 ? [] : [`- size: the canvas for this picture, one of ${e.map((e) => `${r(e)} (${i(e)})`).join(", ")}. Choose it by composition: the widest canvas when three or more characters are spread from left to right, such as at left, center and right, and for a chase, a battle or a landscape; a wide canvas when two characters are side by side or face each other; tall for one figure seen in full, a fall or a climb, or a tall building; square for a close-up of faces or of one object. On a wide canvas spread the characters' x positions across it.`];
}
function o(e) {
	return {
		type: "string",
		enum: e.map(r)
	};
}
function s(e, t) {
	return t.length === 1 ? t[0] : t.find((t) => r(t) === e);
}
//#endregion
export { o as a, a as i, s as n, t as r, n as t };
