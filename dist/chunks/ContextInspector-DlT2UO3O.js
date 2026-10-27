import { t as e } from "./shell.module-DFs3Bhuc.js";
import { N as t, _ as n, ct as r, et as i, m as a, n as o, p as s, pt as c, u as l, ut as u, x as d } from "./vue-i18n-DUz2Gjn8.js";
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
		let v = d, y = _, { t: b } = o(), x = i(!1), S = s(() => v.selection ? b("common.inspector.selection.kind_gallery_record") : null), C = s(() => v.selection?.record_id ?? null);
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
		return (i, o) => (t(), n("div", { class: u(r(e).inspector) }, [a("div", {
			role: "separator",
			"aria-orientation": "vertical",
			tabindex: "0",
			class: u(r(e).inspector_resizer),
			"data-dragging": x.value,
			"aria-valuenow": v.width,
			"aria-valuemin": m,
			"aria-valuemax": h,
			"aria-label": r(b)("common.inspector.title"),
			onPointerdown: T,
			onKeydown: E
		}, null, 42, f), a("div", { class: u(r(e).inspector_panel) }, [a("div", { class: u(r(e).inspector_header) }, [a("span", null, c(r(b)("common.inspector.title")), 1)], 2), a("div", { class: u(r(e).inspector_body) }, [d.selection ? (t(), n(l, { key: 0 }, [a("p", { class: u(r(e).inspector_selection_kind) }, c(S.value), 3), a("dl", { class: u(r(e).inspector_selection) }, [a("div", null, [a("dt", null, c(r(b)("common.inspector.selection.id_label")), 1), a("dd", p, c(C.value), 1)])], 2)], 64)) : (t(), n(l, { key: 1 }, [a("p", null, c(r(b)("common.inspector.empty_title")), 1), a("p", null, c(r(b)("common.inspector.empty_description")), 1)], 64))], 2)], 2)], 2));
	}
});
//#endregion
export { _ as default };
