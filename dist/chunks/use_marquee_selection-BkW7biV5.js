import { A as e, p as t, tt as n } from "./vue-i18n-L-BrQRnK.js";
//#region src/ui/components/use_marquee_selection.ts
var r = 6, i = "data-select-id";
function a(e, t, n, r, i) {
	return e.left < r && e.right > t && e.top < i && e.bottom > n;
}
function o(o, s) {
	let c = n(null), l = n(null), u = n(!1), d = !1, f = t(() => {
		let e = o.value;
		if (!u.value || c.value === null || l.value === null || e === null) return null;
		let t = e.getBoundingClientRect(), n = Math.min(c.value.x, l.value.x), r = Math.min(c.value.y, l.value.y);
		return {
			left: n - t.left,
			top: r - t.top,
			width: Math.abs(l.value.x - c.value.x),
			height: Math.abs(l.value.y - c.value.y)
		};
	});
	function p() {
		let e = o.value;
		if (e === null || c.value === null || l.value === null) return [];
		let t = Math.min(c.value.x, l.value.x), n = Math.max(c.value.x, l.value.x), r = Math.min(c.value.y, l.value.y), s = Math.max(c.value.y, l.value.y);
		return [...e.querySelectorAll(`[${i}]`)].filter((e) => a(e.getBoundingClientRect(), t, r, n, s)).map((e) => e.getAttribute("data-select-id") ?? "").filter((e) => e !== "");
	}
	function m() {
		let e = (e) => {
			e.preventDefault(), e.stopPropagation();
		};
		window.addEventListener("click", e, {
			capture: !0,
			once: !0
		}), setTimeout(() => {
			window.removeEventListener("click", e, { capture: !0 });
		}, 0);
	}
	function h(e) {
		c.value !== null && (l.value = {
			x: e.clientX,
			y: e.clientY
		}, !u.value && Math.hypot(e.clientX - c.value.x, e.clientY - c.value.y) >= r && (u.value = !0), u.value && e.preventDefault());
	}
	function g() {
		window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", g), c.value = null, l.value = null, u.value = !1;
	}
	function _() {
		u.value && (s.on_select(p(), d ? "add" : "replace"), m()), g();
	}
	function v(e) {
		if (e.button !== 0 || e.pointerType === "touch") return;
		let t = e.target, n = s.start_on_items ? "input, textarea, select, [role='checkbox'], [aria-pressed]" : `input, textarea, select, button, a, [role='checkbox'], [${i}]`;
		t?.closest(n) ?? (d = e.ctrlKey || e.metaKey || e.shiftKey, c.value = {
			x: e.clientX,
			y: e.clientY
		}, l.value = c.value, window.addEventListener("pointermove", h), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", g));
	}
	return e(g), {
		box: f,
		on_pointerdown: v
	};
}
//#endregion
export { o as t };
