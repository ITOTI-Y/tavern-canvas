import { n as e, t } from "./prompt_tags-CAoIz8Hm.js";
import { A as n, C as r, D as i, F as a, I as o, L as s, N as c, O as l, T as u, V as d, W as f, _ as p, at as m, c as h, ct as g, dt as _, et as v, g as y, h as b, j as x, m as S, n as C, p as w, pt as T, s as ee, u as E, ut as D, v as O, x as k, y as A, z as te } from "./vue-i18n-DUz2Gjn8.js";
import { n as j } from "./portal_keys-B9C82xtk.js";
import { n as ne, t as M } from "./AppIcon-Cnhzrx9o.js";
import { C as N, _ as re, a as P, c as ie, d as ae, f as oe, g as se, l as ce, m as le, o as ue, p as de, s as F, u as fe, v as pe, x as I } from "./AppSelect-CRHyq1ex.js";
import { t as me } from "./x-CDKrptQJ.js";
import { A as L, M as R, _ as z, c as B, i as V, n as he, o as H, s as U, t as ge, w as _e } from "./Teleport-CZ6NJvBB.js";
import { a as ve, i as ye, o as W, t as be } from "./FocusScope-DyrFWv3K.js";
import { c as xe, i as Se, o as G, r as Ce, s as we, t as Te } from "./PopperContent-8IQaFABb.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var K = ne("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
function q(e, t) {
	return L(e) ? !1 : Array.isArray(e) ? e.some((e) => I(e, t)) : I(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/utils.js
var Ee = "rovingFocusGroup.onEntryFocus", De = {
	bubbles: !1,
	cancelable: !0
}, Oe = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function ke(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function Ae(e, t, n) {
	let r = ke(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return Oe[r];
}
function J(e, t = !1) {
	let n = W();
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), W() !== n)) return;
}
function je(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [Me, Ne] = /*#__PURE__*/ R("RovingFocusGroup"), Pe = /* @__PURE__ */ k({
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
		let r = e, i = n, { loop: a, orientation: s, dir: l } = m(r), u = xe(l), d = z(r, "currentTabStopId", i, {
			defaultValue: r.defaultCurrentTabStopId,
			passive: r.currentTabStopId === void 0
		}), p = v(!1), h = v(!1), _ = v(0), { getItems: y, CollectionSlot: x } = F({ isProvider: !0 });
		function S(e) {
			let t = !h.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !p.value) {
				let t = new CustomEvent(Ee, De);
				if (e.currentTarget.dispatchEvent(t), i("entryFocus", t), !t.defaultPrevented) {
					let e = y().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					J([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === d.value),
						...e
					].filter(Boolean), r.preventScrollOnEntryFocus);
				}
			}
			h.value = !1;
		}
		function C() {
			setTimeout(() => {
				h.value = !1;
			}, 1);
		}
		return t({ getItems: y }), Ne({
			loop: a,
			dir: u,
			orientation: s,
			currentTabStopId: d,
			onItemFocus: (e) => {
				d.value = e;
			},
			onItemShiftTab: () => {
				p.value = !0;
			},
			onFocusableItemAdd: () => {
				_.value++;
			},
			onFocusableItemRemove: () => {
				_.value--;
			}
		}), (e, t) => (c(), b(g(x), null, {
			default: f(() => [A(g(V), {
				tabindex: p.value || _.value === 0 ? -1 : 0,
				"data-orientation": g(s),
				as: e.as,
				"as-child": e.asChild,
				dir: g(u),
				style: { outline: "none" },
				onMousedown: t[0] ||= (e) => h.value = !0,
				onMouseup: C,
				onFocus: S,
				onBlur: t[1] ||= (e) => p.value = !1
			}, {
				default: f(() => [o(e.$slots, "default")]),
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
}), Y = /* @__PURE__ */ k({
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
		let t = e, r = Me(), i = U(), a = w(() => t.tabStopId || i), s = w(() => r.currentTabStopId.value === a.value), { getItems: u, CollectionItem: p } = F();
		n(() => {
			t.focusable && r.onFocusableItemAdd();
		}), x(() => {
			t.focusable && r.onFocusableItemRemove();
		}), d(() => t.focusable, (e, t) => {
			e !== t && (e ? r.onFocusableItemAdd() : r.onFocusableItemRemove());
		});
		function m(e) {
			if (e.key === "Tab" && e.shiftKey) {
				r.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let n = Ae(e, r.orientation.value, r.dir.value);
			if (n !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !t.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let i = [...u().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (n === "last") i.reverse();
				else if (n === "prev" || n === "next") {
					n === "prev" && i.reverse();
					let t = i.indexOf(e.currentTarget);
					i = r.loop.value ? je(i, t + 1) : i.slice(t + 1);
				}
				l(() => J(i));
			}
		}
		return (e, t) => (c(), b(g(p), null, {
			default: f(() => [A(g(V), {
				tabindex: s.value ? 0 : -1,
				"data-orientation": g(r).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: t[0] ||= (t) => {
					e.focusable ? g(r).onItemFocus(a.value) : t.preventDefault();
				},
				onFocus: t[1] ||= (e) => g(r).onItemFocus(a.value),
				onKeydown: m
			}, {
				default: f(() => [o(e.$slots, "default")]),
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
}), [Fe, Ie] = /*#__PURE__*/ R("CheckboxGroupRoot");
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/utils.js
function X(e) {
	return e === "indeterminate";
}
function Z(e) {
	return X(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
var [Le, Re] = /*#__PURE__*/ R("CheckboxRoot"), ze = /* @__PURE__ */ k({
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
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: a, currentElement: l } = B(), u = Fe(null), d = z(n, "modelValue", r, {
			defaultValue: n.defaultValue ?? n.falseValue,
			passive: n.modelValue === void 0
		}), m = w(() => u?.disabled.value || n.disabled), _ = w(() => I(d.value, n.trueValue)), v = w(() => L(u?.modelValue.value) ? d.value === "indeterminate" ? "indeterminate" : _.value : q(u.modelValue.value, n.value));
		function x() {
			if (L(u?.modelValue.value)) d.value === "indeterminate" ? d.value = n.trueValue : d.value = _.value ? n.falseValue : n.trueValue;
			else {
				let e = [...u.modelValue.value || []];
				if (q(e, n.value)) {
					let t = e.findIndex((e) => I(e, n.value));
					e.splice(t, 1);
				} else e.push(n.value);
				u.modelValue.value = e;
			}
		}
		let S = re(l), C = se(), T = te(), D = w(() => {
			if (!T["aria-label"]) return n.id && l.value ? document.querySelector(`[for="${n.id}"]`)?.innerText : void 0;
		});
		return Re({
			disabled: m,
			state: v
		}), (e, t) => (c(), p(E, null, [(c(), b(s(g(u)?.rovingFocus.value ? g(Y) : g(V)), i({
			...e.$attrs,
			...g(C)
		}, {
			id: e.id,
			ref: g(a),
			role: "checkbox",
			"as-child": e.asChild,
			as: e.as,
			type: e.as === "button" ? "button" : void 0,
			"aria-checked": g(X)(v.value) ? "mixed" : v.value,
			"aria-required": e.required,
			"aria-label": e.$attrs["aria-label"] || D.value,
			"data-state": g(Z)(v.value),
			"data-disabled": m.value ? "" : void 0,
			disabled: m.value,
			focusable: g(u)?.rovingFocus.value ? !m.value : void 0,
			onKeydown: ee(h(() => {}, ["prevent"]), ["enter"]),
			onClick: x
		}), {
			default: f(() => [o(e.$slots, "default", {
				modelValue: g(d),
				state: v.value
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
		])), g(S) && e.name && !g(u) ? (c(), b(g(ue), i({
			key: 0,
			type: "checkbox",
			checked: !!v.value,
			name: e.name,
			value: e.value,
			disabled: m.value,
			required: e.required
		}, g(C)), null, 16, [
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		])) : y("v-if", !0)], 64));
	}
}), Be = /* @__PURE__ */ k({
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
		let { forwardRef: t } = B(), n = Le();
		return (e, r) => (c(), b(g(H), { present: e.forceMount || g(X)(g(n).state.value) || g(n).state.value === !0 }, {
			default: f(() => [A(g(V), i({
				ref: g(t),
				"data-state": g(Z)(g(n).state.value),
				"data-disabled": g(n).disabled.value ? "" : void 0,
				style: { pointerEvents: "none" },
				"as-child": e.asChild,
				as: e.as
			}, e.$attrs), {
				default: f(() => [o(e.$slots, "default")]),
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
}), [Q, Ve] = /*#__PURE__*/ R("PopoverRoot"), He = /* @__PURE__ */ k({
	__name: "PopoverRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !1
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t, { modal: i } = m(n), a = z(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		return Ve({
			contentId: "",
			triggerId: "",
			modal: i,
			open: a,
			onOpenChange: (e) => {
				a.value = e;
			},
			onOpenToggle: () => {
				a.value = !a.value;
			},
			triggerElement: v(),
			hasCustomAnchor: v(!1)
		}), (e, t) => (c(), b(g(Se), null, {
			default: f(() => [o(e.$slots, "default", {
				open: g(a),
				close: () => a.value = !1
			})]),
			_: 3
		}));
	}
}), $ = /* @__PURE__ */ k({
	__name: "PopoverContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = we(_e(n, "trapFocus", "disableOutsidePointerEvents")), { forwardRef: s } = B(), l = Q();
		return pe(), (e, t) => (c(), b(g(be), {
			"as-child": "",
			loop: "",
			trapped: e.trapFocus,
			onMountAutoFocus: t[5] ||= (e) => r("openAutoFocus", e),
			onUnmountAutoFocus: t[6] ||= (e) => r("closeAutoFocus", e)
		}, {
			default: f(() => [A(g(he), {
				"as-child": "",
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				onPointerDownOutside: t[0] ||= (e) => r("pointerDownOutside", e),
				onInteractOutside: t[1] ||= (e) => r("interactOutside", e),
				onEscapeKeyDown: t[2] ||= (e) => r("escapeKeyDown", e),
				onFocusOutside: t[3] ||= (e) => r("focusOutside", e),
				onDismiss: t[4] ||= (e) => g(l).onOpenChange(!1)
			}, {
				default: f(() => [A(g(Te), i(g(a), {
					id: g(l).contentId,
					ref: g(s),
					"data-state": g(l).open.value ? "open" : "closed",
					"aria-labelledby": g(l).triggerId,
					style: {
						"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
						"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
						"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
					},
					role: "dialog"
				}), {
					default: f(() => [o(e.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"data-state",
					"aria-labelledby"
				])]),
				_: 3
			}, 8, ["disable-outside-pointer-events"])]),
			_: 3
		}, 8, ["trapped"]));
	}
}), Ue = /* @__PURE__ */ k({
	__name: "PopoverContentModal",
	props: {
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = Q(), s = v(!1);
		ve(!0);
		let l = G(n, r), { forwardRef: u, currentElement: d } = B();
		return ye(d), (e, t) => (c(), b($, i(g(l), {
			ref: g(u),
			"trap-focus": g(a).open.value,
			"disable-outside-pointer-events": "",
			onCloseAutoFocus: t[0] ||= h((e) => {
				r("closeAutoFocus", e), s.value || g(a).triggerElement.value?.focus();
			}, ["prevent"]),
			onPointerDownOutside: t[1] ||= (e) => {
				r("pointerDownOutside", e);
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, i = t.button === 2 || n;
				s.value = i;
			},
			onFocusOutside: t[2] ||= h(() => {}, ["prevent"])
		}), {
			default: f(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus"]));
	}
}), We = /* @__PURE__ */ k({
	__name: "PopoverContentNonModal",
	props: {
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = Q(), s = v(!1), l = v(!1), u = G(n, r);
		return (e, t) => (c(), b($, i(g(u), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: t[0] ||= (e) => {
				r("closeAutoFocus", e), e.defaultPrevented || (s.value || g(a).triggerElement.value?.focus(), e.preventDefault()), s.value = !1, l.value = !1;
			},
			onInteractOutside: t[1] ||= async (e) => {
				r("interactOutside", e), e.defaultPrevented || (s.value = !0, e.detail.originalEvent.type === "pointerdown" && (l.value = !0));
				let t = e.target;
				g(a).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && l.value && e.preventDefault();
			}
		}), {
			default: f(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Ge = /* @__PURE__ */ k({
	__name: "PopoverContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = Q(), s = G(n, r), { forwardRef: l } = B();
		return a.contentId ||= U(void 0, "reka-popover-content"), (e, t) => (c(), b(g(H), { present: e.forceMount || g(a).open.value }, {
			default: f(() => [g(a).modal.value ? (c(), b(Ue, i({ key: 0 }, g(s), { ref: g(l) }), {
				default: f(() => [o(e.$slots, "default")]),
				_: 3
			}, 16)) : (c(), b(We, i({ key: 1 }, g(s), { ref: g(l) }), {
				default: f(() => [o(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), Ke = /* @__PURE__ */ k({
	__name: "PopoverPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return (e, n) => (c(), b(g(ge), _(r(t)), {
			default: f(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), qe = /* @__PURE__ */ k({
	__name: "PopoverTrigger",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(e) {
		let t = e, r = Q(), { forwardRef: i, currentElement: a } = B();
		return r.triggerId ||= U(void 0, "reka-popover-trigger"), n(() => {
			r.triggerElement.value = a.value;
		}), (e, n) => (c(), b(s(g(r).hasCustomAnchor.value ? g(V) : g(Ce)), { "as-child": "" }, {
			default: f(() => [A(g(V), {
				id: g(r).triggerId,
				ref: g(i),
				type: e.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": g(r).open.value,
				"aria-controls": g(r).contentId,
				"data-state": g(r).open.value ? "open" : "closed",
				as: e.as,
				"as-child": t.asChild,
				onClick: g(r).onOpenToggle
			}, {
				default: f(() => [o(e.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"as",
				"as-child",
				"onClick"
			])]),
			_: 3
		}));
	}
}), Je = ["data-disabled"], Ye = /* @__PURE__ */ k({
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
		return (t, n) => (c(), p("label", {
			class: D(g(P).checkboxRow),
			"data-disabled": e.disabled ? "" : void 0
		}, [A(g(ze), {
			class: D(["tc-interactive", g(P).checkboxBox]),
			"model-value": e.modelValue,
			disabled: e.disabled,
			"aria-label": e.labelHidden ? e.label : void 0,
			"onUpdate:modelValue": r
		}, {
			default: f(() => [A(g(Be), { class: D(g(P).checkboxIndicator) }, {
				default: f(() => [A(M, {
					icon: e.modelValue === "indeterminate" ? g(K) : g(N),
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
		]), e.labelHidden ? y("", !0) : (c(), p("span", {
			key: 0,
			class: D(g(P).checkboxLabel)
		}, T(e.label), 3))], 10, Je));
	}
}), Xe = /* @__PURE__ */ k({
	__name: "AppDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = t;
		function i(e) {
			n("update:open", e);
		}
		let a = u(j, void 0), s = w(() => a ? { to: a } : {});
		return (t, n) => (c(), b(g(le), {
			open: e.open,
			"onUpdate:open": i
		}, {
			default: f(() => [A(g(ce), _(r(s.value)), {
				default: f(() => [A(g(fe), { class: D(g(P).dialogOverlay) }, null, 8, ["class"]), A(g(oe), { class: D(g(P).dialogContent) }, {
					default: f(() => [
						S("header", { class: D(g(P).dialogHeader) }, [A(g(ie), { class: D(g(P).dialogTitle) }, {
							default: f(() => [O(T(e.title), 1)]),
							_: 1
						}, 8, ["class"]), A(g(de), {
							class: D(["tc-interactive", g(P).dialogClose]),
							"aria-label": e.closeLabel
						}, {
							default: f(() => [A(M, {
								icon: g(me),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						e.description ? (c(), b(g(ae), {
							key: 0,
							class: D(g(P).dialogDescription)
						}, {
							default: f(() => [O(T(e.description), 1)]),
							_: 1
						}, 8, ["class"])) : y("", !0),
						S("div", { class: D(g(P).dialogBody) }, [o(t.$slots, "default")], 2)
					]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["open"]));
	}
}), Ze = ["data-enabled"], Qe = ["aria-pressed", "onClick"], $e = ["aria-pressed", "aria-label"], et = /* @__PURE__ */ k({
	__name: "PromptTagChip",
	props: {
		prefix: {},
		choice: {},
		presets: {},
		customGroupLabel: {},
		missingLabel: {},
		enableLabel: {},
		disableLabel: {}
	},
	emits: ["update:choice"],
	setup(e, { emit: t }) {
		let n = e, i = t, o = u(j, void 0), s = w(() => o ? { to: o } : {}), l = w(() => n.presets.find((e) => e.id === n.choice.preset_id)), d = w(() => {
			let e = l.value;
			return e === void 0 ? n.missingLabel : e.group === null ? e.label : `${e.label} · ${e.group}`;
		}), m = w(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of n.presets) {
				let r = t.group ?? n.customGroupLabel;
				e.set(r, [...e.get(r) ?? [], t]);
			}
			return [...e.entries()].map(([e, t]) => ({
				label: e,
				presets: t
			}));
		});
		function h(e) {
			i("update:choice", {
				enabled: !0,
				preset_id: e.id
			});
		}
		function v() {
			i("update:choice", {
				...n.choice,
				enabled: !n.choice.enabled
			});
		}
		return (t, n) => (c(), p("div", {
			class: D(g(P).promptTagChip),
			"data-enabled": e.choice.enabled ? "" : void 0
		}, [A(g(He), null, {
			default: f(() => [A(g(qe), { class: D(["tc-interactive", g(P).promptTagTrigger]) }, {
				default: f(() => [O(T(e.prefix) + T(d.value), 1)]),
				_: 1
			}, 8, ["class"]), A(g(Ke), _(r(s.value)), {
				default: f(() => [A(g(Ge), {
					class: D(g(P).promptTagContent),
					"side-offset": 4,
					align: "end",
					"data-testid": "prompt-tag-list"
				}, {
					default: f(() => [(c(!0), p(E, null, a(m.value, (t) => (c(), p("section", {
						key: t.label,
						class: D(g(P).promptTagGroup)
					}, [S("h4", { class: D(g(P).promptTagGroupTitle) }, T(t.label), 3), (c(!0), p(E, null, a(t.presets, (t) => (c(), p("button", {
						key: t.id,
						type: "button",
						class: D(["tc-interactive", g(P).promptTagOption]),
						"aria-pressed": t.id === e.choice.preset_id,
						onClick: (e) => h(t)
					}, [S("span", { class: D(g(P).promptTagOptionLabel) }, [O(T(t.label) + " ", 1), t.id === e.choice.preset_id ? (c(), b(M, {
						key: 0,
						icon: g(N),
						size: 14
					}, null, 8, ["icon"])) : y("", !0)], 2), S("span", { class: D([g(P).promptTagOptionText, t.kind === "undesired_content" && g(P).promptTagOptionTextClamped]) }, T(t.text), 3)], 10, Qe))), 128))], 2))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}), S("button", {
			type: "button",
			class: D(["tc-interactive", g(P).promptTagToggle]),
			"aria-pressed": e.choice.enabled,
			"aria-label": e.choice.enabled ? e.disableLabel : e.enableLabel,
			onClick: v
		}, [A(M, {
			icon: g(N),
			size: 14
		}, null, 8, ["icon"])], 10, $e)], 10, Ze));
	}
}), tt = /* @__PURE__ */ k({
	__name: "PromptTagChips",
	props: {
		port: {},
		kind: {}
	},
	setup(n) {
		let r = n, { t: i } = C(), a = w(() => e(r.port.custom_presets).filter((e) => e.kind === r.kind)), o = w(() => r.port.profile === null ? null : t(r.port.profile));
		function s(e) {
			let t = r.port.profile;
			t !== null && o.value !== null && r.port.save(t.id, {
				...o.value,
				[r.kind]: e
			});
		}
		return (e, t) => o.value === null ? y("", !0) : (c(), b(et, {
			key: 0,
			prefix: n.kind === "quality" ? g(i)("prompt_tags.quality_prefix") : g(i)("prompt_tags.undesired_prefix"),
			choice: o.value[n.kind],
			presets: a.value,
			"custom-group-label": g(i)("prompt_tags.custom_group"),
			"missing-label": g(i)("prompt_tags.missing"),
			"enable-label": g(i)("prompt_tags.enable"),
			"disable-label": g(i)("prompt_tags.disable"),
			"data-testid": `prompt-tag-chip-${n.kind}`,
			"onUpdate:choice": s
		}, null, 8, [
			"prefix",
			"choice",
			"presets",
			"custom-group-label",
			"missing-label",
			"enable-label",
			"disable-label",
			"data-testid"
		]));
	}
});
//#endregion
export { Pe as a, Y as i, Xe as n, K as o, Ye as r, tt as t };
