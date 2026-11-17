import { F as e, L as t, M as n, N as r, O as i, R as a, S as o, V as s, W as c, _ as l, c as u, ct as d, dt as f, g as p, gt as m, h, k as g, p as _, pt as v, q as y, rt as b, s as x, u as S, x as C, y as w, z as ee } from "./vue-i18n-XoxYzLIP.js";
import { n as T, t as E } from "./AppIcon-DD754F_c.js";
import { r as D, t as O } from "./components_styles-CTlfgDU5.js";
import { o as k, r as te } from "./_prop_utils-CvImpN6J.js";
import { N as A, P as j, S as M, f as N, j as P, l as F, s as I, u as ne } from "./Teleport-zHbQRGnp.js";
import { a as L, o as R, s as z, u as re } from "./AppTooltip-D3BiEM01.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var B = T("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
function V(e, t) {
	return P(e) ? !1 : Array.isArray(e) ? e.some((e) => k(e, t)) : k(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
function H() {
	let e = o()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInputBubble.js
var U = /* @__PURE__ */ C({
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
	setup(t) {
		let n = t, { primitiveElement: r, currentElement: a } = z(), o = _(() => n.checked ?? n.value);
		return c(o, (e, t) => {
			if (!a.value) return;
			let n = a.value, r = window.HTMLInputElement.prototype, i = Object.getOwnPropertyDescriptor(r, "value").set;
			if (i && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				i.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (t, a) => (e(), h(L, i({
			ref_key: "primitiveElement",
			ref: r
		}, {
			...n,
			...t.$attrs
		}, { as: "input" }), null, 16));
	}
}), W = /* @__PURE__ */ C({
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
	setup(n) {
		let r = n, a = _(() => typeof r.value == "object" && Array.isArray(r.value) && r.value.length === 0 && r.required), o = _(() => typeof r.value == "string" || typeof r.value == "number" || typeof r.value == "boolean" || r.value === null || r.value === void 0 ? [{
			name: r.name,
			value: r.value
		}] : typeof r.value == "object" && Array.isArray(r.value) ? r.value.flatMap((e, t) => typeof e == "object" ? Object.entries(e).map(([e, n]) => ({
			name: `${r.name}[${t}][${e}]`,
			value: n
		})) : {
			name: `${r.name}[${t}]`,
			value: e
		}) : r.value !== null && typeof r.value == "object" && !Array.isArray(r.value) ? Object.entries(r.value).map(([e, t]) => ({
			name: `${r.name}[${e}]`,
			value: t
		})) : []);
		return (n, s) => (e(), l(S, null, [p(" We render single input if it's required "), a.value ? (e(), h(U, i({ key: n.name }, {
			...r,
			...n.$attrs
		}, {
			name: n.name,
			value: n.value
		}), null, 16, ["name", "value"])) : (e(!0), l(S, { key: 1 }, t(o.value, (t) => (e(), h(U, i({ key: t.name }, { ref_for: !0 }, {
			...r,
			...n.$attrs
		}, {
			name: t.name,
			value: t.value
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
	let n = A();
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), A() !== n)) return;
}
function ie(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [ae, oe] = /*#__PURE__*/ j("RovingFocusGroup"), se = /* @__PURE__ */ C({
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
	setup(t, { expose: n, emit: r }) {
		let i = t, o = r, { loop: s, orientation: c, dir: l } = d(i), u = re(l), p = M(i, "currentTabStopId", o, {
			defaultValue: i.defaultCurrentTabStopId,
			passive: i.currentTabStopId === void 0
		}), m = b(!1), g = b(!1), _ = b(0), { getItems: v, CollectionSlot: x } = R({ isProvider: !0 });
		function S(e) {
			let t = !g.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !m.value) {
				let t = new CustomEvent(G, K);
				if (e.currentTarget.dispatchEvent(t), o("entryFocus", t), !t.defaultPrevented) {
					let e = v().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					X([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === p.value),
						...e
					].filter(Boolean), i.preventScrollOnEntryFocus);
				}
			}
			g.value = !1;
		}
		function C() {
			setTimeout(() => {
				g.value = !1;
			}, 1);
		}
		return n({ getItems: v }), oe({
			loop: s,
			dir: u,
			orientation: c,
			currentTabStopId: p,
			onItemFocus: (e) => {
				p.value = e;
			},
			onItemShiftTab: () => {
				m.value = !0;
			},
			onFocusableItemAdd: () => {
				_.value++;
			},
			onFocusableItemRemove: () => {
				_.value--;
			}
		}), (t, n) => (e(), h(f(x), null, {
			default: y(() => [w(f(I), {
				tabindex: m.value || _.value === 0 ? -1 : 0,
				"data-orientation": f(c),
				as: t.as,
				"as-child": t.asChild,
				dir: f(u),
				style: { outline: "none" },
				onMousedown: n[0] ||= (e) => g.value = !0,
				onMouseup: C,
				onFocus: S,
				onBlur: n[1] ||= (e) => m.value = !1
			}, {
				default: y(() => [a(t.$slots, "default")]),
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
}), Z = /* @__PURE__ */ C({
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
		let i = t, o = ae(), s = ne(), l = _(() => i.tabStopId || s), u = _(() => o.currentTabStopId.value === l.value), { getItems: d, CollectionItem: p } = R();
		n(() => {
			i.focusable && o.onFocusableItemAdd();
		}), r(() => {
			i.focusable && o.onFocusableItemRemove();
		}), c(() => i.focusable, (e, t) => {
			e !== t && (e ? o.onFocusableItemAdd() : o.onFocusableItemRemove());
		});
		function m(e) {
			if (e.key === "Tab" && e.shiftKey) {
				o.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let t = Y(e, o.orientation.value, o.dir.value);
			if (t !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !i.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let n = [...d().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (t === "last") n.reverse();
				else if (t === "prev" || t === "next") {
					t === "prev" && n.reverse();
					let r = n.indexOf(e.currentTarget);
					n = o.loop.value ? ie(n, r + 1) : n.slice(r + 1);
				}
				g(() => X(n));
			}
		}
		return (t, n) => (e(), h(f(p), null, {
			default: y(() => [w(f(I), {
				tabindex: u.value ? 0 : -1,
				"data-orientation": f(o).orientation.value,
				"data-active": t.active ? "" : void 0,
				"data-disabled": t.focusable ? void 0 : "",
				as: t.as,
				"as-child": t.asChild,
				onMousedown: n[0] ||= (e) => {
					t.focusable ? f(o).onItemFocus(l.value) : e.preventDefault();
				},
				onFocus: n[1] ||= (e) => f(o).onItemFocus(l.value),
				onKeydown: m
			}, {
				default: y(() => [a(t.$slots, "default")]),
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
}), [ce, le] = /*#__PURE__*/ j("CheckboxGroupRoot");
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
var [ue, de] = /*#__PURE__*/ j("CheckboxRoot"), fe = /* @__PURE__ */ C({
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
	setup(t, { emit: n }) {
		let r = t, o = n, { forwardRef: c, currentElement: d } = N(), m = ce(null), g = M(r, "modelValue", o, {
			defaultValue: r.defaultValue ?? r.falseValue,
			passive: r.modelValue === void 0
		}), v = _(() => m?.disabled.value || r.disabled), b = _(() => k(g.value, r.trueValue)), C = _(() => P(m?.modelValue.value) ? g.value === "indeterminate" ? "indeterminate" : b.value : V(m.modelValue.value, r.value));
		function w() {
			if (P(m?.modelValue.value)) g.value === "indeterminate" ? g.value = r.trueValue : g.value = b.value ? r.falseValue : r.trueValue;
			else {
				let e = [...m.modelValue.value || []];
				if (V(e, r.value)) {
					let t = e.findIndex((e) => k(e, r.value));
					e.splice(t, 1);
				} else e.push(r.value);
				m.modelValue.value = e;
			}
		}
		let T = te(d), E = H(), D = s(), O = _(() => {
			if (!D["aria-label"]) return r.id && d.value ? document.querySelector(`[for="${r.id}"]`)?.innerText : void 0;
		});
		return de({
			disabled: v,
			state: C
		}), (t, n) => (e(), l(S, null, [(e(), h(ee(f(m)?.rovingFocus.value ? f(Z) : f(I)), i({
			...t.$attrs,
			...f(E)
		}, {
			id: t.id,
			ref: f(c),
			role: "checkbox",
			"as-child": t.asChild,
			as: t.as,
			type: t.as === "button" ? "button" : void 0,
			"aria-checked": f(Q)(C.value) ? "mixed" : C.value,
			"aria-required": t.required,
			"aria-label": t.$attrs["aria-label"] || O.value,
			"data-state": f($)(C.value),
			"data-disabled": v.value ? "" : void 0,
			disabled: v.value,
			focusable: f(m)?.rovingFocus.value ? !v.value : void 0,
			onKeydown: x(u(() => {}, ["prevent"]), ["enter"]),
			onClick: w
		}), {
			default: y(() => [a(t.$slots, "default", {
				modelValue: f(g),
				state: C.value
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
		])), f(T) && t.name && !f(m) ? (e(), h(f(W), i({
			key: 0,
			type: "checkbox",
			checked: !!C.value,
			name: t.name,
			value: t.value,
			disabled: v.value,
			required: t.required
		}, f(E)), null, 16, [
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		])) : p("v-if", !0)], 64));
	}
}), pe = /* @__PURE__ */ C({
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
	setup(t) {
		let { forwardRef: n } = N(), r = ue();
		return (t, o) => (e(), h(f(F), { present: t.forceMount || f(Q)(f(r).state.value) || f(r).state.value === !0 }, {
			default: y(() => [w(f(I), i({
				ref: f(n),
				"data-state": f($)(f(r).state.value),
				"data-disabled": f(r).disabled.value ? "" : void 0,
				style: { pointerEvents: "none" },
				"as-child": t.asChild,
				as: t.as
			}, t.$attrs), {
				default: y(() => [a(t.$slots, "default")]),
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
}), me = ["data-disabled"], he = /* @__PURE__ */ C({
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
	setup(t, { emit: n }) {
		let r = n;
		function i(e) {
			r("update:modelValue", e === !0);
		}
		return (n, r) => (e(), l("label", {
			class: v(f(O).checkboxRow),
			"data-disabled": t.disabled ? "" : void 0
		}, [w(f(fe), {
			class: v(["tc-interactive", f(O).checkboxBox]),
			"model-value": t.modelValue,
			disabled: t.disabled,
			"aria-label": t.labelHidden ? t.label : void 0,
			"onUpdate:modelValue": i
		}, {
			default: y(() => [w(f(pe), { class: v(f(O).checkboxIndicator) }, {
				default: y(() => [w(E, {
					icon: t.modelValue === "indeterminate" ? f(B) : f(D),
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
		]), t.labelHidden ? p("", !0) : (e(), l("span", {
			key: 0,
			class: v(f(O).checkboxLabel)
		}, m(t.label), 3))], 10, me));
	}
});
//#endregion
export { H as a, W as i, Z as n, B as o, se as r, he as t };
