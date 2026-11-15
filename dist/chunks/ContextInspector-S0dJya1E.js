import { t as e } from "./shell.module-Bkh0ofYg.js";
import { I as t, S as n, _t as r, d as i, ft as a, h as o, it as s, m as c, mt as l, n as u, v as d } from "./vue-i18n-BQWz_HuU.js";
//#region src/ui/shell/ContextInspector.vue?vue&type=script&setup=true&lang.ts
var f = [
	"data-dragging",
	"aria-valuenow",
	"aria-label"
], p = { class: "tc-tabular-nums" }, m = 240, h = 720, g = 16, _ = /* @__PURE__ */ n({
	__name: "ContextInspector",
	props: {
		width: {},
		selection: {}
	},
	emits: ["resize"],
	setup(n, { emit: _ }) {
		let v = n, y = _, { t: b } = u(), x = s(!1), S = c(() => v.selection ? b("common.inspector.selection.kind_gallery_record") : null), C = c(() => v.selection?.record_id ?? null);
		function w(e) {
			return Math.min(h, Math.max(m, e));
		}
		function T(e) {
			if (e.button !== 0) return;
			e.preventDefault();
			let t = e.clientX, n = v.width, r = e.pointerId, i = e.currentTarget;
			i.setPointerCapture(r), x.value = !0;
			function a(e) {
				let r = t - e.clientX;
				y("resize", w(n + r));
			}
			function o() {
				i.releasePointerCapture(r), i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o), x.value = !1;
			}
			i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
		}
		function E(e) {
			e.key === "ArrowLeft" ? (e.preventDefault(), y("resize", w(v.width + g))) : e.key === "ArrowRight" && (e.preventDefault(), y("resize", w(v.width - g)));
		}
		return (s, c) => (t(), d("div", { class: l(a(e).inspector) }, [o("div", {
			role: "separator",
			"aria-orientation": "vertical",
			tabindex: "0",
			class: l(a(e).inspector_resizer),
			"data-dragging": x.value,
			"aria-valuenow": v.width,
			"aria-valuemin": m,
			"aria-valuemax": h,
			"aria-label": a(b)("common.inspector.title"),
			onPointerdown: T,
			onKeydown: E
		}, null, 42, f), o("div", { class: l(a(e).inspector_panel) }, [o("div", { class: l(a(e).inspector_header) }, [o("span", null, r(a(b)("common.inspector.title")), 1)], 2), o("div", { class: l(a(e).inspector_body) }, [n.selection ? (t(), d(i, { key: 0 }, [o("p", { class: l(a(e).inspector_selection_kind) }, r(S.value), 3), o("dl", { class: l(a(e).inspector_selection) }, [o("div", null, [o("dt", null, r(a(b)("common.inspector.selection.id_label")), 1), o("dd", p, r(C.value), 1)])], 2)], 64)) : (t(), d(i, { key: 1 }, [o("p", null, r(a(b)("common.inspector.empty_title")), 1), o("p", null, r(a(b)("common.inspector.empty_description")), 1)], 64))], 2)], 2)], 2));
	}
});
//#endregion
export { _ as default };
