import { t as e } from "./shell.module-bsdu70fJ.js";
import { P as t, _ as n, dt as r, lt as i, m as a, mt as o, n as s, p as c, tt as l, u, x as d } from "./vue-i18n-L-BrQRnK.js";
//#region src/ui/shell/ContextInspector.vue?vue&type=script&setup=true&lang.ts
var f = [
	"data-dragging",
	"aria-valuenow",
	"aria-label"
], p = { class: "tc-tabular-nums" }, m = 240, h = 720, g = 16, _ = /* @__PURE__ */ d({
	__name: "ContextInspector",
	props: {
		width: {},
		selection: {}
	},
	emits: ["resize"],
	setup(d, { emit: _ }) {
		let v = d, y = _, { t: b } = s(), x = l(!1), S = c(() => v.selection ? b("common.inspector.selection.kind_gallery_record") : null), C = c(() => v.selection?.record_id ?? null);
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
		return (s, c) => (t(), n("div", { class: r(i(e).inspector) }, [a("div", {
			role: "separator",
			"aria-orientation": "vertical",
			tabindex: "0",
			class: r(i(e).inspector_resizer),
			"data-dragging": x.value,
			"aria-valuenow": v.width,
			"aria-valuemin": m,
			"aria-valuemax": h,
			"aria-label": i(b)("common.inspector.title"),
			onPointerdown: T,
			onKeydown: E
		}, null, 42, f), a("div", { class: r(i(e).inspector_panel) }, [a("div", { class: r(i(e).inspector_header) }, [a("span", null, o(i(b)("common.inspector.title")), 1)], 2), a("div", { class: r(i(e).inspector_body) }, [d.selection ? (t(), n(u, { key: 0 }, [a("p", { class: r(i(e).inspector_selection_kind) }, o(S.value), 3), a("dl", { class: r(i(e).inspector_selection) }, [a("div", null, [a("dt", null, o(i(b)("common.inspector.selection.id_label")), 1), a("dd", p, o(C.value), 1)])], 2)], 64)) : (t(), n(u, { key: 1 }, [a("p", null, o(i(b)("common.inspector.empty_title")), 1), a("p", null, o(i(b)("common.inspector.empty_description")), 1)], 64))], 2)], 2)], 2));
	}
});
//#endregion
export { _ as default };
