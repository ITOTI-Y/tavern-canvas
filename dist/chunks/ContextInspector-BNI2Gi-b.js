import { $ as e, N as t, _ as n, ft as r, g as i, lt as a, m as o, n as s, p as c, st as l, u, x as d } from "./vue-i18n-CmRk7RjK.js";
import { t as f } from "./shell.module-vwMcpviy.js";
//#region src/ui/shell/ContextInspector.vue?vue&type=script&setup=true&lang.ts
var p = [
	"data-dragging",
	"aria-valuenow",
	"aria-label"
], m = { class: "tc-tabular-nums" }, h = { key: 0 }, g = 240, _ = 720, v = 16, y = /* @__PURE__ */ d({
	__name: "ContextInspector",
	props: {
		width: {},
		selection: {}
	},
	emits: ["resize"],
	setup(d, { emit: y }) {
		let b = d, x = y, { t: S } = s(), C = e(!1), w = c(() => {
			let e = b.selection;
			return e ? e.kind === "generation_job" ? S("common.inspector.selection.kind_generation_job") : e.kind === "gallery_record" ? S("common.inspector.selection.kind_gallery_record") : S("common.inspector.selection.kind_asset") : null;
		}), T = c(() => {
			let e = b.selection;
			return e ? e.kind === "generation_job" ? e.job_id : e.kind === "gallery_record" ? e.record_id : e.asset_id : null;
		}), E = c(() => {
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
		return (e, s) => (t(), n("div", { class: a(l(f).inspector) }, [o("div", {
			role: "separator",
			"aria-orientation": "vertical",
			tabindex: "0",
			class: a(l(f).inspector_resizer),
			"data-dragging": C.value,
			"aria-valuenow": b.width,
			"aria-valuemin": g,
			"aria-valuemax": _,
			"aria-label": l(S)("common.inspector.title"),
			onPointerdown: O,
			onKeydown: k
		}, null, 42, p), o("div", { class: a(l(f).inspector_panel) }, [o("div", { class: a(l(f).inspector_header) }, [o("span", null, r(l(S)("common.inspector.title")), 1)], 2), o("div", { class: a(l(f).inspector_body) }, [d.selection ? (t(), n(u, { key: 0 }, [o("p", { class: a(l(f).inspector_selection_kind) }, r(w.value), 3), o("dl", { class: a(l(f).inspector_selection) }, [o("div", null, [o("dt", null, r(l(S)("common.inspector.selection.id_label")), 1), o("dd", m, r(T.value), 1)]), E.value ? (t(), n("div", h, [o("dt", null, r(l(S)("common.inspector.selection.action_label")), 1), o("dd", null, r(E.value), 1)])) : i("", !0)], 2)], 64)) : (t(), n(u, { key: 1 }, [o("p", null, r(l(S)("common.inspector.empty_title")), 1), o("p", null, r(l(S)("common.inspector.empty_description")), 1)], 64))], 2)], 2)], 2));
	}
});
//#endregion
export { y as default };
