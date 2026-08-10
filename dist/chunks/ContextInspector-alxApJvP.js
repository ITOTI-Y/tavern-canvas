import { t as e } from "./shell.module-vwMcpviy.js";
import { $ as t, N as n, _ as r, ft as i, g as a, lt as o, m as s, n as c, p as l, st as u, u as d, x as f } from "./vue-i18n-D0uIxSJk.js";
//#region src/ui/shell/ContextInspector.vue?vue&type=script&setup=true&lang.ts
var p = [
	"data-dragging",
	"aria-valuenow",
	"aria-label"
], m = { class: "tc-tabular-nums" }, h = { key: 0 }, g = 240, _ = 720, v = 16, y = /* @__PURE__ */ f({
	__name: "ContextInspector",
	props: {
		width: {},
		selection: {}
	},
	emits: ["resize"],
	setup(f, { emit: y }) {
		let b = f, x = y, { t: S } = c(), C = t(!1), w = l(() => {
			let e = b.selection;
			return e ? e.kind === "generation_job" ? S("common.inspector.selection.kind_generation_job") : e.kind === "gallery_record" ? S("common.inspector.selection.kind_gallery_record") : S("common.inspector.selection.kind_asset") : null;
		}), T = l(() => {
			let e = b.selection;
			return e ? e.kind === "generation_job" ? e.job_id : e.kind === "gallery_record" ? e.record_id : e.asset_id : null;
		}), E = l(() => {
			let e = b.selection;
			if (e?.kind !== "gallery_record") return null;
			switch (e.intent) {
				case "modify_prompt": return S("common.inspector.selection.intent_modify_prompt");
				case "regenerate": return S("common.inspector.selection.intent_regenerate");
				case "edit": return S("common.inspector.selection.intent_edit");
				case "inpaint": return S("common.inspector.selection.intent_inpaint");
				default: return null;
			}
		});
		function D(e) {
			return Math.min(_, Math.max(g, e));
		}
		function O(e) {
			if (e.button !== 0) return;
			e.preventDefault();
			let t = e.clientX, n = b.width, r = e.pointerId, i = e.currentTarget;
			i.setPointerCapture(r), C.value = !0;
			function a(e) {
				let r = t - e.clientX;
				x("resize", D(n + r));
			}
			function o() {
				i.releasePointerCapture(r), i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o), C.value = !1;
			}
			i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
		}
		function k(e) {
			e.key === "ArrowLeft" ? (e.preventDefault(), x("resize", D(b.width + v))) : e.key === "ArrowRight" && (e.preventDefault(), x("resize", D(b.width - v)));
		}
		return (t, c) => (n(), r("div", { class: o(u(e).inspector) }, [s("div", {
			role: "separator",
			"aria-orientation": "vertical",
			tabindex: "0",
			class: o(u(e).inspector_resizer),
			"data-dragging": C.value,
			"aria-valuenow": b.width,
			"aria-valuemin": g,
			"aria-valuemax": _,
			"aria-label": u(S)("common.inspector.title"),
			onPointerdown: O,
			onKeydown: k
		}, null, 42, p), s("div", { class: o(u(e).inspector_panel) }, [s("div", { class: o(u(e).inspector_header) }, [s("span", null, i(u(S)("common.inspector.title")), 1)], 2), s("div", { class: o(u(e).inspector_body) }, [f.selection ? (n(), r(d, { key: 0 }, [s("p", { class: o(u(e).inspector_selection_kind) }, i(w.value), 3), s("dl", { class: o(u(e).inspector_selection) }, [s("div", null, [s("dt", null, i(u(S)("common.inspector.selection.id_label")), 1), s("dd", m, i(T.value), 1)]), E.value ? (n(), r("div", h, [s("dt", null, i(u(S)("common.inspector.selection.action_label")), 1), s("dd", null, i(E.value), 1)])) : a("", !0)], 2)], 64)) : (n(), r(d, { key: 1 }, [s("p", null, i(u(S)("common.inspector.empty_title")), 1), s("p", null, i(u(S)("common.inspector.empty_description")), 1)], 64))], 2)], 2)], 2));
	}
});
//#endregion
export { y as default };
