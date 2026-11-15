import { A as e, B as t, C as n, G as r, H as i, I as a, J as o, N as s, P as c, R as l, S as u, _ as d, _t as f, b as p, c as m, d as h, ft as g, g as _, it as v, k as y, l as b, lt as x, m as S, mt as C, v as w, z as T } from "./vue-i18n-BQWz_HuU.js";
import { n as E, t as D } from "./AppIcon-B1iv8vRB.js";
import { r as O } from "./StateSurface-Dxa4U6G6.js";
import { t as k } from "./components_styles-Cab5IILs.js";
import { o as A, r as ee } from "./_prop_utils-BQHilWOI.js";
import { N as j, P as M, S as N, f as P, j as F, l as I, s as L, u as te } from "./Teleport-B2amidH8.js";
import { a as ne, c as re } from "./AppTooltip-DuggrS-8.js";
import { n as R, u as z } from "./IconButton-DbYdD8bu.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var B = E("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
function V(e, t) {
	return F(e) ? !1 : Array.isArray(e) ? e.some((e) => A(e, t)) : A(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
function H() {
	let e = n()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInputBubble.js
var U = /* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, { primitiveElement: n, currentElement: i } = z(), o = S(() => t.checked ?? t.value);
		return r(o, (e, t) => {
			if (!i.value) return;
			let n = i.value, r = window.HTMLInputElement.prototype, a = Object.getOwnPropertyDescriptor(r, "value").set;
			if (a && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				a.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, r) => (a(), _(ne, y({
			ref_key: "primitiveElement",
			ref: n
		}, {
			...t,
			...e.$attrs
		}, { as: "input" }), null, 16));
	}
}), W = /* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, n = S(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), r = S(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
			name: t.name,
			value: t.value
		}] : typeof t.value == "object" && Array.isArray(t.value) ? t.value.flatMap((e, n) => typeof e == "object" ? Object.entries(e).map(([e, r]) => ({
			name: `${t.name}[${n}][${e}]`,
			value: r
		})) : {
			name: `${t.name}[${n}]`,
			value: e
		}) : t.value !== null && typeof t.value == "object" && !Array.isArray(t.value) ? Object.entries(t.value).map(([e, n]) => ({
			name: `${t.name}[${e}]`,
			value: n
		})) : []);
		return (e, i) => (a(), w(h, null, [d(" We render single input if it's required "), n.value ? (a(), _(U, y({ key: e.name }, {
			...t,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (a(!0), w(h, { key: 1 }, l(r.value, (n) => (a(), _(U, y({ key: n.name }, { ref_for: !0 }, {
			...t,
			...e.$attrs
		}, {
			name: n.name,
			value: n.value
		}), null, 16, ["name", "value"]))), 128))], 2112));
	}
}), G = "rovingFocusGroup.onEntryFocus", K = {
	bubbles: !1,
	cancelable: !0
}, q = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function J(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function Y(e, t, n) {
	let r = J(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return q[r];
}
function X(e, t = !1) {
	let n = j();
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), j() !== n)) return;
}
function ie(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [ae, oe] = /*#__PURE__*/ M("RovingFocusGroup"), se = /* @__PURE__ */ u({
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
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, { loop: s, orientation: c, dir: l } = x(r), u = re(l), d = N(r, "currentTabStopId", i, {
			defaultValue: r.defaultCurrentTabStopId,
			passive: r.currentTabStopId === void 0
		}), f = v(!1), m = v(!1), h = v(0), { getItems: y, CollectionSlot: b } = R({ isProvider: !0 });
		function S(e) {
			let t = !m.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !f.value) {
				let t = new CustomEvent(G, K);
				if (e.currentTarget.dispatchEvent(t), i("entryFocus", t), !t.defaultPrevented) {
					let e = y().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					X([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === d.value),
						...e
					].filter(Boolean), r.preventScrollOnEntryFocus);
				}
			}
			m.value = !1;
		}
		function C() {
			setTimeout(() => {
				m.value = !1;
			}, 1);
		}
		return t({ getItems: y }), oe({
			loop: s,
			dir: u,
			orientation: c,
			currentTabStopId: d,
			onItemFocus: (e) => {
				d.value = e;
			},
			onItemShiftTab: () => {
				f.value = !0;
			},
			onFocusableItemAdd: () => {
				h.value++;
			},
			onFocusableItemRemove: () => {
				h.value--;
			}
		}), (e, t) => (a(), _(g(b), null, {
			default: o(() => [p(g(L), {
				tabindex: f.value || h.value === 0 ? -1 : 0,
				"data-orientation": g(c),
				as: e.as,
				"as-child": e.asChild,
				dir: g(u),
				style: { outline: "none" },
				onMousedown: t[0] ||= (e) => m.value = !0,
				onMouseup: C,
				onFocus: S,
				onBlur: t[1] ||= (e) => f.value = !1
			}, {
				default: o(() => [T(e.$slots, "default")]),
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
}), Z = /* @__PURE__ */ u({
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
	setup(t) {
		let n = t, i = ae(), l = te(), u = S(() => n.tabStopId || l), d = S(() => i.currentTabStopId.value === u.value), { getItems: f, CollectionItem: m } = R();
		s(() => {
			n.focusable && i.onFocusableItemAdd();
		}), c(() => {
			n.focusable && i.onFocusableItemRemove();
		}), r(() => n.focusable, (e, t) => {
			e !== t && (e ? i.onFocusableItemAdd() : i.onFocusableItemRemove());
		});
		function h(t) {
			if (t.key === "Tab" && t.shiftKey) {
				i.onItemShiftTab();
				return;
			}
			if (t.target !== t.currentTarget) return;
			let r = Y(t, i.orientation.value, i.dir.value);
			if (r !== void 0) {
				if (t.metaKey || t.ctrlKey || t.altKey || !n.allowShiftKey && t.shiftKey) return;
				t.preventDefault();
				let a = [...f().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (r === "last") a.reverse();
				else if (r === "prev" || r === "next") {
					r === "prev" && a.reverse();
					let e = a.indexOf(t.currentTarget);
					a = i.loop.value ? ie(a, e + 1) : a.slice(e + 1);
				}
				e(() => X(a));
			}
		}
		return (e, t) => (a(), _(g(m), null, {
			default: o(() => [p(g(L), {
				tabindex: d.value ? 0 : -1,
				"data-orientation": g(i).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: t[0] ||= (t) => {
					e.focusable ? g(i).onItemFocus(u.value) : t.preventDefault();
				},
				onFocus: t[1] ||= (e) => g(i).onItemFocus(u.value),
				onKeydown: h
			}, {
				default: o(() => [T(e.$slots, "default")]),
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
}), [ce, le] = /*#__PURE__*/ M("CheckboxGroupRoot");
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
var [ue, de] = /*#__PURE__*/ M("CheckboxRoot"), fe = /* @__PURE__ */ u({
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
	setup(e, { emit: n }) {
		let r = e, s = n, { forwardRef: c, currentElement: l } = P(), u = ce(null), f = N(r, "modelValue", s, {
			defaultValue: r.defaultValue ?? r.falseValue,
			passive: r.modelValue === void 0
		}), p = S(() => u?.disabled.value || r.disabled), v = S(() => A(f.value, r.trueValue)), x = S(() => F(u?.modelValue.value) ? f.value === "indeterminate" ? "indeterminate" : v.value : V(u.modelValue.value, r.value));
		function C() {
			if (F(u?.modelValue.value)) f.value === "indeterminate" ? f.value = r.trueValue : f.value = v.value ? r.falseValue : r.trueValue;
			else {
				let e = [...u.modelValue.value || []];
				if (V(e, r.value)) {
					let t = e.findIndex((e) => A(e, r.value));
					e.splice(t, 1);
				} else e.push(r.value);
				u.modelValue.value = e;
			}
		}
		let E = ee(l), D = H(), O = i(), k = S(() => {
			if (!O["aria-label"]) return r.id && l.value ? document.querySelector(`[for="${r.id}"]`)?.innerText : void 0;
		});
		return de({
			disabled: p,
			state: x
		}), (e, n) => (a(), w(h, null, [(a(), _(t(g(u)?.rovingFocus.value ? g(Z) : g(L)), y({
			...e.$attrs,
			...g(D)
		}, {
			id: e.id,
			ref: g(c),
			role: "checkbox",
			"as-child": e.asChild,
			as: e.as,
			type: e.as === "button" ? "button" : void 0,
			"aria-checked": g(Q)(x.value) ? "mixed" : x.value,
			"aria-required": e.required,
			"aria-label": e.$attrs["aria-label"] || k.value,
			"data-state": g($)(x.value),
			"data-disabled": p.value ? "" : void 0,
			disabled: p.value,
			focusable: g(u)?.rovingFocus.value ? !p.value : void 0,
			onKeydown: m(b(() => {}, ["prevent"]), ["enter"]),
			onClick: C
		}), {
			default: o(() => [T(e.$slots, "default", {
				modelValue: g(f),
				state: x.value
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
		])), g(E) && e.name && !g(u) ? (a(), _(g(W), y({
			key: 0,
			type: "checkbox",
			checked: !!x.value,
			name: e.name,
			value: e.value,
			disabled: p.value,
			required: e.required
		}, g(D)), null, 16, [
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		])) : d("v-if", !0)], 64));
	}
}), pe = /* @__PURE__ */ u({
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
		let { forwardRef: t } = P(), n = ue();
		return (e, r) => (a(), _(g(I), { present: e.forceMount || g(Q)(g(n).state.value) || g(n).state.value === !0 }, {
			default: o(() => [p(g(L), y({
				ref: g(t),
				"data-state": g($)(g(n).state.value),
				"data-disabled": g(n).disabled.value ? "" : void 0,
				style: { pointerEvents: "none" },
				"as-child": e.asChild,
				as: e.as
			}, e.$attrs), {
				default: o(() => [T(e.$slots, "default")]),
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
}), me = ["data-disabled"], he = /* @__PURE__ */ u({
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
		let n = t;
		function r(e) {
			n("update:modelValue", e === !0);
		}
		return (t, n) => (a(), w("label", {
			class: C(g(k).checkboxRow),
			"data-disabled": e.disabled ? "" : void 0
		}, [p(g(fe), {
			class: C(["tc-interactive", g(k).checkboxBox]),
			"model-value": e.modelValue,
			disabled: e.disabled,
			"aria-label": e.labelHidden ? e.label : void 0,
			"onUpdate:modelValue": r
		}, {
			default: o(() => [p(g(pe), { class: C(g(k).checkboxIndicator) }, {
				default: o(() => [p(D, {
					icon: e.modelValue === "indeterminate" ? g(B) : g(O),
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
		]), e.labelHidden ? d("", !0) : (a(), w("span", {
			key: 0,
			class: C(g(k).checkboxLabel)
		}, f(e.label), 3))], 10, me));
	}
});
//#endregion
export { H as a, W as i, Z as n, B as o, se as r, he as t };
