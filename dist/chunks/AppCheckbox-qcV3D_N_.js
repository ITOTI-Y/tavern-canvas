import { B as e, D as t, G as n, H as r, I as i, L as a, M as o, O as s, P as c, R as l, S as u, _ as d, c as f, dt as p, g as m, h, j as g, lt as _, mt as v, ot as y, p as b, s as x, tt as S, u as C, x as w, y as T } from "./vue-i18n-L-BrQRnK.js";
import { n as E, t as D } from "./AppIcon-DkyxvN8k.js";
import { r as O } from "./StateSurface-X9aRtXAT.js";
import { t as k } from "./components_styles-DHX8irr3.js";
import { a as A, n as ee } from "./_prop_utils-O1SzpV_h.js";
import { N as j, P as M, S as N, f as P, j as F, l as I, s as L, u as te } from "./Teleport-CquQcgiX.js";
import { a as ne, c as re } from "./PopperContent-BPSDCuaj.js";
import { l as R, t as z } from "./Collection-e6mvGbNy.js";
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
	let e = u()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInputBubble.js
var U = /* @__PURE__ */ w({
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
		let n = e, { primitiveElement: i, currentElement: a } = R(), o = b(() => n.checked ?? n.value);
		return r(o, (e, t) => {
			if (!a.value) return;
			let n = a.value, r = window.HTMLInputElement.prototype, i = Object.getOwnPropertyDescriptor(r, "value").set;
			if (i && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				i.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, r) => (c(), h(ne, t({
			ref_key: "primitiveElement",
			ref: i
		}, {
			...n,
			...e.$attrs
		}, { as: "input" }), null, 16));
	}
}), W = /* @__PURE__ */ w({
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
		let n = e, r = b(() => typeof n.value == "object" && Array.isArray(n.value) && n.value.length === 0 && n.required), a = b(() => typeof n.value == "string" || typeof n.value == "number" || typeof n.value == "boolean" || n.value === null || n.value === void 0 ? [{
			name: n.name,
			value: n.value
		}] : typeof n.value == "object" && Array.isArray(n.value) ? n.value.flatMap((e, t) => typeof e == "object" ? Object.entries(e).map(([e, r]) => ({
			name: `${n.name}[${t}][${e}]`,
			value: r
		})) : {
			name: `${n.name}[${t}]`,
			value: e
		}) : n.value !== null && typeof n.value == "object" && !Array.isArray(n.value) ? Object.entries(n.value).map(([e, t]) => ({
			name: `${n.name}[${e}]`,
			value: t
		})) : []);
		return (e, o) => (c(), d(C, null, [m(" We render single input if it's required "), r.value ? (c(), h(U, t({ key: e.name }, {
			...n,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (c(!0), d(C, { key: 1 }, i(a.value, (r) => (c(), h(U, t({ key: r.name }, { ref_for: !0 }, {
			...n,
			...e.$attrs
		}, {
			name: r.name,
			value: r.value
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
var [ae, oe] = /*#__PURE__*/ M("RovingFocusGroup"), se = /* @__PURE__ */ w({
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
		let i = e, o = r, { loop: s, orientation: l, dir: u } = y(i), d = re(u), f = N(i, "currentTabStopId", o, {
			defaultValue: i.defaultCurrentTabStopId,
			passive: i.currentTabStopId === void 0
		}), p = S(!1), m = S(!1), g = S(0), { getItems: v, CollectionSlot: b } = z({ isProvider: !0 });
		function x(e) {
			let t = !m.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !p.value) {
				let t = new CustomEvent(G, K);
				if (e.currentTarget.dispatchEvent(t), o("entryFocus", t), !t.defaultPrevented) {
					let e = v().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					X([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === f.value),
						...e
					].filter(Boolean), i.preventScrollOnEntryFocus);
				}
			}
			m.value = !1;
		}
		function C() {
			setTimeout(() => {
				m.value = !1;
			}, 1);
		}
		return t({ getItems: v }), oe({
			loop: s,
			dir: d,
			orientation: l,
			currentTabStopId: f,
			onItemFocus: (e) => {
				f.value = e;
			},
			onItemShiftTab: () => {
				p.value = !0;
			},
			onFocusableItemAdd: () => {
				g.value++;
			},
			onFocusableItemRemove: () => {
				g.value--;
			}
		}), (e, t) => (c(), h(_(b), null, {
			default: n(() => [T(_(L), {
				tabindex: p.value || g.value === 0 ? -1 : 0,
				"data-orientation": _(l),
				as: e.as,
				"as-child": e.asChild,
				dir: _(d),
				style: { outline: "none" },
				onMousedown: t[0] ||= (e) => m.value = !0,
				onMouseup: C,
				onFocus: x,
				onBlur: t[1] ||= (e) => p.value = !1
			}, {
				default: n(() => [a(e.$slots, "default")]),
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
}), Z = /* @__PURE__ */ w({
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
		let t = e, i = ae(), l = te(), u = b(() => t.tabStopId || l), d = b(() => i.currentTabStopId.value === u.value), { getItems: f, CollectionItem: p } = z();
		g(() => {
			t.focusable && i.onFocusableItemAdd();
		}), o(() => {
			t.focusable && i.onFocusableItemRemove();
		}), r(() => t.focusable, (e, t) => {
			e !== t && (e ? i.onFocusableItemAdd() : i.onFocusableItemRemove());
		});
		function m(e) {
			if (e.key === "Tab" && e.shiftKey) {
				i.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let n = Y(e, i.orientation.value, i.dir.value);
			if (n !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !t.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let r = [...f().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (n === "last") r.reverse();
				else if (n === "prev" || n === "next") {
					n === "prev" && r.reverse();
					let t = r.indexOf(e.currentTarget);
					r = i.loop.value ? ie(r, t + 1) : r.slice(t + 1);
				}
				s(() => X(r));
			}
		}
		return (e, t) => (c(), h(_(p), null, {
			default: n(() => [T(_(L), {
				tabindex: d.value ? 0 : -1,
				"data-orientation": _(i).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: t[0] ||= (t) => {
					e.focusable ? _(i).onItemFocus(u.value) : t.preventDefault();
				},
				onFocus: t[1] ||= (e) => _(i).onItemFocus(u.value),
				onKeydown: m
			}, {
				default: n(() => [a(e.$slots, "default")]),
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
var [ue, de] = /*#__PURE__*/ M("CheckboxRoot"), fe = /* @__PURE__ */ w({
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
	setup(r, { emit: i }) {
		let o = r, s = i, { forwardRef: u, currentElement: p } = P(), g = ce(null), v = N(o, "modelValue", s, {
			defaultValue: o.defaultValue ?? o.falseValue,
			passive: o.modelValue === void 0
		}), y = b(() => g?.disabled.value || o.disabled), S = b(() => A(v.value, o.trueValue)), w = b(() => F(g?.modelValue.value) ? v.value === "indeterminate" ? "indeterminate" : S.value : V(g.modelValue.value, o.value));
		function T() {
			if (F(g?.modelValue.value)) v.value === "indeterminate" ? v.value = o.trueValue : v.value = S.value ? o.falseValue : o.trueValue;
			else {
				let e = [...g.modelValue.value || []];
				if (V(e, o.value)) {
					let t = e.findIndex((e) => A(e, o.value));
					e.splice(t, 1);
				} else e.push(o.value);
				g.modelValue.value = e;
			}
		}
		let E = ee(p), D = H(), O = e(), k = b(() => {
			if (!O["aria-label"]) return o.id && p.value ? document.querySelector(`[for="${o.id}"]`)?.innerText : void 0;
		});
		return de({
			disabled: y,
			state: w
		}), (e, r) => (c(), d(C, null, [(c(), h(l(_(g)?.rovingFocus.value ? _(Z) : _(L)), t({
			...e.$attrs,
			..._(D)
		}, {
			id: e.id,
			ref: _(u),
			role: "checkbox",
			"as-child": e.asChild,
			as: e.as,
			type: e.as === "button" ? "button" : void 0,
			"aria-checked": _(Q)(w.value) ? "mixed" : w.value,
			"aria-required": e.required,
			"aria-label": e.$attrs["aria-label"] || k.value,
			"data-state": _($)(w.value),
			"data-disabled": y.value ? "" : void 0,
			disabled: y.value,
			focusable: _(g)?.rovingFocus.value ? !y.value : void 0,
			onKeydown: x(f(() => {}, ["prevent"]), ["enter"]),
			onClick: T
		}), {
			default: n(() => [a(e.$slots, "default", {
				modelValue: _(v),
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
		])), _(E) && e.name && !_(g) ? (c(), h(_(W), t({
			key: 0,
			type: "checkbox",
			checked: !!w.value,
			name: e.name,
			value: e.value,
			disabled: y.value,
			required: e.required
		}, _(D)), null, 16, [
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		])) : m("v-if", !0)], 64));
	}
}), pe = /* @__PURE__ */ w({
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
		let { forwardRef: r } = P(), i = ue();
		return (e, o) => (c(), h(_(I), { present: e.forceMount || _(Q)(_(i).state.value) || _(i).state.value === !0 }, {
			default: n(() => [T(_(L), t({
				ref: _(r),
				"data-state": _($)(_(i).state.value),
				"data-disabled": _(i).disabled.value ? "" : void 0,
				style: { pointerEvents: "none" },
				"as-child": e.asChild,
				as: e.as
			}, e.$attrs), {
				default: n(() => [a(e.$slots, "default")]),
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
}), me = ["data-disabled"], he = /* @__PURE__ */ w({
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
		return (t, r) => (c(), d("label", {
			class: p(_(k).checkboxRow),
			"data-disabled": e.disabled ? "" : void 0
		}, [T(_(fe), {
			class: p(["tc-interactive", _(k).checkboxBox]),
			"model-value": e.modelValue,
			disabled: e.disabled,
			"aria-label": e.labelHidden ? e.label : void 0,
			"onUpdate:modelValue": i
		}, {
			default: n(() => [T(_(pe), { class: p(_(k).checkboxIndicator) }, {
				default: n(() => [T(D, {
					icon: e.modelValue === "indeterminate" ? _(B) : _(O),
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
		]), e.labelHidden ? m("", !0) : (c(), d("span", {
			key: 0,
			class: p(_(k).checkboxLabel)
		}, v(e.label), 3))], 10, me));
	}
});
//#endregion
export { H as a, W as i, Z as n, B as o, se as r, he as t };
