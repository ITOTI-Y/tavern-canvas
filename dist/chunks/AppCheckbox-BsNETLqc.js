import { B as e, D as t, G as n, H as r, L as i, M as a, O as o, P as s, R as c, _ as l, c as u, dt as d, g as f, h as p, j as m, lt as h, mt as g, ot as _, p as v, s as y, tt as b, u as x, x as S, y as C } from "./vue-i18n-L-BrQRnK.js";
import { n as w, t as T } from "./AppIcon-DkyxvN8k.js";
import { r as E } from "./StateSurface-X9aRtXAT.js";
import { t as D } from "./components_styles-DHX8irr3.js";
import { i as O, n as k, r as ee, s as A } from "./_prop_utils-vFiFbBPl.js";
import { N as j, P as M, S as N, f as P, j as F, l as te, s as I, u as ne } from "./Teleport-CquQcgiX.js";
import { c as L } from "./PopperContent-BPSDCuaj.js";
import { t as R } from "./Collection-e6mvGbNy.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var z = w("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
function B(e, t) {
	return F(e) ? !1 : Array.isArray(e) ? e.some((e) => A(e, t)) : A(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/utils.js
var V = "rovingFocusGroup.onEntryFocus", H = {
	bubbles: !1,
	cancelable: !0
}, U = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function W(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function G(e, t, n) {
	let r = W(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return U[r];
}
function K(e, t = !1) {
	let n = j();
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), j() !== n)) return;
}
function q(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [J, Y] = /*#__PURE__*/ M("RovingFocusGroup"), X = /* @__PURE__ */ S({
	__name: "RovingFocusGroup",
	props: {
		orientation: {
			type: String,
			required: !1,
			default: void 0
		},
		dir: {
			type: String,
			required: !1
		},
		loop: {
			type: Boolean,
			required: !1,
			default: !1
		},
		currentTabStopId: {
			type: [String, null],
			required: !1
		},
		defaultCurrentTabStopId: {
			type: String,
			required: !1
		},
		preventScrollOnEntryFocus: {
			type: Boolean,
			required: !1,
			default: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	emits: ["entryFocus", "update:currentTabStopId"],
	setup(e, { expose: t, emit: r }) {
		let a = e, o = r, { loop: c, orientation: l, dir: u } = _(a), d = L(u), f = N(a, "currentTabStopId", o, {
			defaultValue: a.defaultCurrentTabStopId,
			passive: a.currentTabStopId === void 0
		}), m = b(!1), g = b(!1), v = b(0), { getItems: y, CollectionSlot: x } = R({ isProvider: !0 });
		function S(e) {
			let t = !g.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !m.value) {
				let t = new CustomEvent(V, H);
				if (e.currentTarget.dispatchEvent(t), o("entryFocus", t), !t.defaultPrevented) {
					let e = y().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					K([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === f.value),
						...e
					].filter(Boolean), a.preventScrollOnEntryFocus);
				}
			}
			g.value = !1;
		}
		function w() {
			setTimeout(() => {
				g.value = !1;
			}, 1);
		}
		return t({ getItems: y }), Y({
			loop: c,
			dir: d,
			orientation: l,
			currentTabStopId: f,
			onItemFocus: (e) => {
				f.value = e;
			},
			onItemShiftTab: () => {
				m.value = !0;
			},
			onFocusableItemAdd: () => {
				v.value++;
			},
			onFocusableItemRemove: () => {
				v.value--;
			}
		}), (e, t) => (s(), p(h(x), null, {
			default: n(() => [C(h(I), {
				tabindex: m.value || v.value === 0 ? -1 : 0,
				"data-orientation": h(l),
				as: e.as,
				"as-child": e.asChild,
				dir: h(d),
				style: { outline: "none" },
				onMousedown: t[0] ||= (e) => g.value = !0,
				onMouseup: w,
				onFocus: S,
				onBlur: t[1] ||= (e) => m.value = !1
			}, {
				default: n(() => [i(e.$slots, "default")]),
				_: 3
			}, 8, [
				"tabindex",
				"data-orientation",
				"as",
				"as-child",
				"dir"
			])]),
			_: 3
		}));
	}
}), Z = /* @__PURE__ */ S({
	__name: "RovingFocusItem",
	props: {
		tabStopId: {
			type: String,
			required: !1
		},
		focusable: {
			type: Boolean,
			required: !1,
			default: !0
		},
		active: {
			type: Boolean,
			required: !1
		},
		allowShiftKey: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		let t = e, c = J(), l = ne(), u = v(() => t.tabStopId || l), d = v(() => c.currentTabStopId.value === u.value), { getItems: f, CollectionItem: g } = R();
		m(() => {
			t.focusable && c.onFocusableItemAdd();
		}), a(() => {
			t.focusable && c.onFocusableItemRemove();
		}), r(() => t.focusable, (e, t) => {
			e !== t && (e ? c.onFocusableItemAdd() : c.onFocusableItemRemove());
		});
		function _(e) {
			if (e.key === "Tab" && e.shiftKey) {
				c.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let n = G(e, c.orientation.value, c.dir.value);
			if (n !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !t.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let r = [...f().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (n === "last") r.reverse();
				else if (n === "prev" || n === "next") {
					n === "prev" && r.reverse();
					let t = r.indexOf(e.currentTarget);
					r = c.loop.value ? q(r, t + 1) : r.slice(t + 1);
				}
				o(() => K(r));
			}
		}
		return (e, t) => (s(), p(h(g), null, {
			default: n(() => [C(h(I), {
				tabindex: d.value ? 0 : -1,
				"data-orientation": h(c).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: t[0] ||= (t) => {
					e.focusable ? h(c).onItemFocus(u.value) : t.preventDefault();
				},
				onFocus: t[1] ||= (e) => h(c).onItemFocus(u.value),
				onKeydown: _
			}, {
				default: n(() => [i(e.$slots, "default")]),
				_: 3
			}, 8, [
				"tabindex",
				"data-orientation",
				"data-active",
				"data-disabled",
				"as",
				"as-child"
			])]),
			_: 3
		}));
	}
}), [re, ie] = /*#__PURE__*/ M("CheckboxGroupRoot");
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/utils.js
function Q(e) {
	return e === "indeterminate";
}
function $(e) {
	return Q(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
var [ae, oe] = /*#__PURE__*/ M("CheckboxRoot"), se = /* @__PURE__ */ S({
	inheritAttrs: !1,
	__name: "CheckboxRoot",
	props: {
		defaultValue: {
			type: null,
			required: !1
		},
		modelValue: {
			type: null,
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		value: {
			type: null,
			required: !1,
			default: "on"
		},
		id: {
			type: String,
			required: !1
		},
		trueValue: {
			type: null,
			required: !1,
			default: () => !0
		},
		falseValue: {
			type: null,
			required: !1,
			default: () => !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		}
	},
	emits: ["update:modelValue"],
	setup(r, { emit: a }) {
		let o = r, d = a, { forwardRef: m, currentElement: g } = P(), _ = re(null), b = N(o, "modelValue", d, {
			defaultValue: o.defaultValue ?? o.falseValue,
			passive: o.modelValue === void 0
		}), S = v(() => _?.disabled.value || o.disabled), C = v(() => A(b.value, o.trueValue)), w = v(() => F(_?.modelValue.value) ? b.value === "indeterminate" ? "indeterminate" : C.value : B(_.modelValue.value, o.value));
		function T() {
			if (F(_?.modelValue.value)) b.value === "indeterminate" ? b.value = o.trueValue : b.value = C.value ? o.falseValue : o.trueValue;
			else {
				let e = [..._.modelValue.value || []];
				if (B(e, o.value)) {
					let t = e.findIndex((e) => A(e, o.value));
					e.splice(t, 1);
				} else e.push(o.value);
				_.modelValue.value = e;
			}
		}
		let E = O(g), D = ee(), j = e(), M = v(() => {
			if (!j["aria-label"]) return o.id && g.value ? document.querySelector(`[for="${o.id}"]`)?.innerText : void 0;
		});
		return oe({
			disabled: S,
			state: w
		}), (e, r) => (s(), l(x, null, [(s(), p(c(h(_)?.rovingFocus.value ? h(Z) : h(I)), t({
			...e.$attrs,
			...h(D)
		}, {
			id: e.id,
			ref: h(m),
			role: "checkbox",
			"as-child": e.asChild,
			as: e.as,
			type: e.as === "button" ? "button" : void 0,
			"aria-checked": h(Q)(w.value) ? "mixed" : w.value,
			"aria-required": e.required,
			"aria-label": e.$attrs["aria-label"] || M.value,
			"data-state": h($)(w.value),
			"data-disabled": S.value ? "" : void 0,
			disabled: S.value,
			focusable: h(_)?.rovingFocus.value ? !S.value : void 0,
			onKeydown: y(u(() => {}, ["prevent"]), ["enter"]),
			onClick: T
		}), {
			default: n(() => [i(e.$slots, "default", {
				modelValue: h(b),
				state: w.value
			})]),
			_: 3
		}, 16, [
			"id",
			"as-child",
			"as",
			"type",
			"aria-checked",
			"aria-required",
			"aria-label",
			"data-state",
			"data-disabled",
			"disabled",
			"focusable",
			"onKeydown"
		])), h(E) && e.name && !h(_) ? (s(), p(h(k), t({
			key: 0,
			type: "checkbox",
			checked: !!w.value,
			name: e.name,
			value: e.value,
			disabled: S.value,
			required: e.required
		}, h(D)), null, 16, [
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		])) : f("v-if", !0)], 64));
	}
}), ce = /* @__PURE__ */ S({
	__name: "CheckboxIndicator",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		let { forwardRef: r } = P(), a = ae();
		return (e, o) => (s(), p(h(te), { present: e.forceMount || h(Q)(h(a).state.value) || h(a).state.value === !0 }, {
			default: n(() => [C(h(I), t({
				ref: h(r),
				"data-state": h($)(h(a).state.value),
				"data-disabled": h(a).disabled.value ? "" : void 0,
				style: { pointerEvents: "none" },
				"as-child": e.asChild,
				as: e.as
			}, e.$attrs), {
				default: n(() => [i(e.$slots, "default")]),
				_: 3
			}, 16, [
				"data-state",
				"data-disabled",
				"as-child",
				"as"
			])]),
			_: 3
		}, 8, ["present"]));
	}
}), le = ["data-disabled"], ue = /* @__PURE__ */ S({
	__name: "AppCheckbox",
	props: {
		modelValue: { type: [Boolean, String] },
		label: {},
		labelHidden: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = t;
		function i(e) {
			r("update:modelValue", e === !0);
		}
		return (t, r) => (s(), l("label", {
			class: d(h(D).checkboxRow),
			"data-disabled": e.disabled ? "" : void 0
		}, [C(h(se), {
			class: d(["tc-interactive", h(D).checkboxBox]),
			"model-value": e.modelValue,
			disabled: e.disabled,
			"aria-label": e.labelHidden ? e.label : void 0,
			"onUpdate:modelValue": i
		}, {
			default: n(() => [C(h(ce), { class: d(h(D).checkboxIndicator) }, {
				default: n(() => [C(T, {
					icon: e.modelValue === "indeterminate" ? h(z) : h(E),
					size: 14
				}, null, 8, ["icon"])]),
				_: 1
			}, 8, ["class"])]),
			_: 1
		}, 8, [
			"class",
			"model-value",
			"disabled",
			"aria-label"
		]), e.labelHidden ? f("", !0) : (s(), l("span", {
			key: 0,
			class: d(h(D).checkboxLabel)
		}, g(e.label), 3))], 10, le));
	}
});
//#endregion
export { z as i, Z as n, X as r, ue as t };
