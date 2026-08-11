import { t as e } from "./shell.module-vwMcpviy.js";
import { $ as t, A as n, B as r, C as i, D as a, E as o, F as s, I as c, N as l, O as u, U as d, Y as f, _ as p, c as m, ft as h, h as g, it as _, j as v, lt as y, m as b, n as x, p as S, s as C, st as w, u as T, ut as E, v as D, x as O, y as k } from "./vue-i18n-D0uIxSJk.js";
import { n as A, t as j } from "./AppIcon-C3iVkJ88.js";
import { a as M, i as N, n as P, t as F } from "./route_nav-CynI56Wc.js";
import { _ as I, b as L, c as R, i as z, j as B, l as V, m as H, n as ee, o as te, s as ne, t as re } from "./Teleport-CfSgxnHY.js";
import { a as ie, i as ae, o as U, t as oe } from "./FocusScope-MQ_KQm08.js";
import { a as se, c as W, i as ce, n as le, o as G, t as ue } from "./PopperContent-K7T6sb7Y.js";
import { n as de, t as fe } from "./useTypeahead-ftb3Li7l.js";
import { a as pe, c as K, i as me, l as he, n as ge, o as _e, r as ve, s as ye, t as be } from "./Collection-CsTPApsC.js";
import { t as xe } from "./RovingFocusGroup-BDSC0leT.js";
import { t as Se } from "./use_portal_target-Bu49Bio9.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/ellipsis.js
var Ce = A("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]), we = ["INPUT", "TEXTAREA"];
function q(e, t, n, r = {}) {
	if (!t || r.enableIgnoredElement && we.includes(t.nodeName)) return null;
	let { arrowKeyOptions: i = "both", attributeName: a = "[data-reka-collection-item]", itemsArray: o = [], loop: s = !0, dir: c = "ltr", preventScroll: l = !0, focus: u = !1 } = r, [d, f, p, m, h, g] = [
		e.key === "ArrowRight",
		e.key === "ArrowLeft",
		e.key === "ArrowUp",
		e.key === "ArrowDown",
		e.key === "Home",
		e.key === "End"
	], _ = p || m, v = d || f;
	if (!h && !g && (!_ && !v || i === "vertical" && v || i === "horizontal" && _)) return null;
	let y = n ? Array.from(n.querySelectorAll(a)) : o;
	if (!y.length) return null;
	l && e.preventDefault();
	let b = null;
	return v || _ ? b = J(y, t, {
		goForward: _ ? m : c === "ltr" ? d : f,
		loop: s
	}) : h ? b = y.at(0) || null : g && (b = y.at(-1) || null), u && b?.focus(), b;
}
function J(e, t, n, r = e.includes(t) ? e.length : e.length + 1) {
	if (--r === 0) return null;
	let i = e.indexOf(t), a;
	if (a = i === -1 ? n.goForward ? 0 : e.length - 1 : n.goForward ? i + 1 : i - 1, !n.loop && (a < 0 || a >= e.length)) return null;
	let o = e[(a + e.length) % e.length];
	return o ? o.hasAttribute("disabled") && o.getAttribute("disabled") !== "false" ? J(e, o, n, r) : o : null;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuAnchor.js
var Te = /* @__PURE__ */ O({
	__name: "MenuAnchor",
	props: {
		reference: {
			type: null,
			required: !1
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
	setup(e) {
		let t = e;
		return (e, n) => (l(), g(w(ce), E(i(t)), {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function Ee() {
	let e = t(!1);
	return n(() => {
		H("keydown", () => {
			e.value = !0;
		}, {
			capture: !0,
			passive: !0
		}), H(["pointerdown", "pointermove"], () => {
			e.value = !1;
		}, {
			capture: !0,
			passive: !0
		});
	}), e;
}
var De = L(Ee), [Y, Oe] = /*#__PURE__*/ B(["MenuRoot", "MenuSub"], "MenuContext"), [X, ke] = /*#__PURE__*/ B("MenuRoot"), Ae = /* @__PURE__ */ O({
	__name: "MenuRoot",
	props: {
		open: {
			type: Boolean,
			required: !1,
			default: !1
		},
		dir: {
			type: String,
			required: !1
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: n }) {
		let r = e, i = n, { modal: a, dir: o } = _(r), s = W(o), u = I(r, "open", i), f = t(), p = De();
		return Oe({
			open: u,
			onOpenChange: (e) => {
				u.value = e;
			},
			content: f,
			onContentChange: (e) => {
				f.value = e;
			}
		}), ke({
			onClose: () => {
				u.value = !1;
			},
			isUsingKeyboardRef: p,
			dir: s,
			modal: a
		}), (e, t) => (l(), g(w(se), null, {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}));
	}
}), [Z, je] = /*#__PURE__*/ B("MenuContent"), Q = /* @__PURE__ */ O({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ o({
		loop: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		},
		disableOutsideScroll: {
			type: Boolean,
			required: !1
		},
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
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	}, { ...ue }),
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus",
		"dismiss"
	],
	setup(e, { emit: n }) {
		let i = e, a = n, o = Y(), s = X(), { trapFocus: u, disableOutsidePointerEvents: f, loop: p } = _(i);
		de(), ie(f.value);
		let m = t(""), h = t(0), y = t(0), b = t(null), x = t("right"), S = t(0), C = t(null), T = t(), { forwardRef: E, currentElement: D } = R(), { handleTypeaheadSearch: O } = fe(), A = t();
		function j(e) {
			let t = q(e, A.value || U(), D.value, {
				loop: p.value,
				arrowKeyOptions: "vertical",
				dir: s?.dir.value,
				focus: !1,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			t && (A.value = t, t.scrollIntoView({ block: "nearest" }));
		}
		function M() {
			A.value && A.value.click();
		}
		let N = t(), P = t();
		r(A, (e) => {
			if (P.value && (e === void 0 || e !== P.value.trigger.value)) {
				if (e === void 0) return;
				P.value.onOpenChange(!1), P.value = void 0;
			}
		}), r(D, (e) => {
			o.onContentChange(e);
		}), v(() => {
			window.clearTimeout(h.value);
		});
		function F(e) {
			return x.value === b.value?.side && he(e, b.value?.area);
		}
		async function I(e) {
			a("openAutoFocus", e), !e.defaultPrevented && (e.preventDefault(), D.value?.focus({ preventScroll: !0 }));
		}
		function L(e) {
			if (e.defaultPrevented) return;
			let t = e.target, n = t.closest("[data-reka-menu-content]") === e.currentTarget, r = ["input", "textarea"].includes(t.tagName.toLowerCase()), i = e.ctrlKey || e.altKey || e.metaKey, a = e.key.length === 1, o = q(e, U(), D.value, {
				loop: p.value,
				arrowKeyOptions: "vertical",
				dir: s?.dir.value,
				focus: !0,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (o) return o?.focus();
			if (e.code === "Space") return;
			let c = T.value?.getItems() ?? [];
			if (n && (e.key === "Tab" && s.modal.value && e.preventDefault(), !i && a && !r && O(e.key, c)), e.target !== D.value || !ge.includes(e.key)) return;
			e.preventDefault();
			let l = [...c.map((e) => e.ref)];
			me.includes(e.key) && l.reverse(), _e(l);
		}
		function z(e) {
			e?.currentTarget?.contains?.(e.target) || (window.clearTimeout(h.value), m.value = "");
		}
		function B(e) {
			if (!K(e)) return;
			let t = e.target, n = S.value !== e.clientX;
			if ((e?.currentTarget)?.contains(t) && n) {
				let t = e.clientX > S.value ? "right" : "left";
				x.value = t, S.value = e.clientX;
			}
		}
		function V(e) {
			K(e) && N.value && N.value.focus();
		}
		return je({
			onItemEnter: (e) => !!F(e),
			onItemLeave: (e) => F(e) ? !0 : (["INPUT", "TEXTAREA"].includes(U()?.tagName || "") || D.value?.focus(), C.value = null, !1),
			onTriggerLeave: (e) => !!F(e),
			searchRef: m,
			highlightedElement: A,
			onKeydownNavigation: j,
			onKeydownEnter: M,
			filterElement: N,
			onFilterElementChange: (e) => {
				N.value = e;
			},
			activeSubmenuContext: P,
			pointerGraceTimerRef: y,
			onPointerGraceIntentChange: (e) => {
				b.value = e;
			}
		}), (e, t) => (l(), g(w(oe), {
			"as-child": "",
			trapped: w(u),
			onMountAutoFocus: I,
			onUnmountAutoFocus: t[7] ||= (e) => a("closeAutoFocus", e)
		}, {
			default: d(() => [k(w(ee), {
				"as-child": "",
				"disable-outside-pointer-events": w(f),
				onEscapeKeyDown: t[2] ||= (e) => a("escapeKeyDown", e),
				onPointerDownOutside: t[3] ||= (e) => a("pointerDownOutside", e),
				onFocusOutside: t[4] ||= (e) => a("focusOutside", e),
				onInteractOutside: t[5] ||= (e) => a("interactOutside", e),
				onDismiss: t[6] ||= (e) => a("dismiss")
			}, {
				default: d(() => [k(w(xe), {
					ref_key: "rovingFocusGroupRef",
					ref: T,
					"current-tab-stop-id": C.value,
					"onUpdate:currentTabStopId": t[0] ||= (e) => C.value = e,
					"as-child": "",
					orientation: "vertical",
					dir: w(s).dir.value,
					loop: w(p),
					onEntryFocus: t[1] ||= (e) => {
						a("entryFocus", e), w(s).isUsingKeyboardRef.value || e.preventDefault();
					}
				}, {
					default: d(() => [k(w(le), {
						ref: w(E),
						role: "menu",
						as: e.as,
						"as-child": e.asChild,
						"aria-orientation": "vertical",
						"data-reka-menu-content": "",
						"data-state": w(ye)(w(o).open.value),
						dir: w(s).dir.value,
						side: e.side,
						"side-offset": e.sideOffset,
						align: e.align,
						"align-offset": e.alignOffset,
						"avoid-collisions": e.avoidCollisions,
						"collision-boundary": e.collisionBoundary,
						"collision-padding": e.collisionPadding,
						"arrow-padding": e.arrowPadding,
						"prioritize-position": e.prioritizePosition,
						"position-strategy": e.positionStrategy,
						"update-position-strategy": e.updatePositionStrategy,
						sticky: e.sticky,
						"hide-when-detached": e.hideWhenDetached,
						reference: e.reference,
						onKeydown: L,
						onBlur: z,
						onPointermove: B,
						onPointerenter: V
					}, {
						default: d(() => [c(e.$slots, "default")]),
						_: 3
					}, 8, [
						"as",
						"as-child",
						"data-state",
						"dir",
						"side",
						"side-offset",
						"align",
						"align-offset",
						"avoid-collisions",
						"collision-boundary",
						"collision-padding",
						"arrow-padding",
						"prioritize-position",
						"position-strategy",
						"update-position-strategy",
						"sticky",
						"hide-when-detached",
						"reference"
					])]),
					_: 3
				}, 8, [
					"current-tab-stop-id",
					"dir",
					"loop"
				])]),
				_: 3
			}, 8, ["disable-outside-pointer-events"])]),
			_: 3
		}, 8, ["trapped"]));
	}
}), Me = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "MenuItemImpl",
	props: {
		disabled: {
			type: Boolean,
			required: !1
		},
		textValue: {
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
		}
	},
	setup(e) {
		let n = e, r = Z(), { forwardRef: i, currentElement: o } = R(), { CollectionItem: s } = be(), f = t(!1), p = S(() => f.value || o.value != null && r.highlightedElement.value === o.value);
		async function m(e) {
			if (!(e.defaultPrevented || !K(e))) {
				if (n.disabled) r.onItemLeave(e);
				else if (!r.onItemEnter(e)) {
					let t = e.currentTarget;
					r.highlightedElement.value = t, ["INPUT", "TEXTAREA"].includes(U()?.tagName || "") || t.focus({ preventScroll: !0 });
				}
			}
		}
		async function h(e) {
			await u(), !e.defaultPrevented && K(e) && r.highlightedElement.value === o.value && !r.onItemLeave(e) && r.highlightedElement.value === o.value && (r.highlightedElement.value = void 0);
		}
		return (e, t) => (l(), g(w(s), { value: { textValue: e.textValue } }, {
			default: d(() => [k(w(z), a({
				ref: w(i),
				role: "menuitem",
				tabindex: "-1"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"aria-disabled": e.disabled || void 0,
				"data-disabled": e.disabled ? "" : void 0,
				"data-highlighted": p.value ? "" : void 0,
				onPointermove: m,
				onPointerleave: h,
				onFocus: t[0] ||= async (t) => {
					await u(), !(t.defaultPrevented || e.disabled) && (f.value = !0, w(r).highlightedElement.value = t.currentTarget);
				},
				onBlur: t[1] ||= async (e) => {
					await u(), !e.defaultPrevented && (f.value = !1);
				}
			}), {
				default: d(() => [c(e.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"aria-disabled",
				"data-disabled",
				"data-highlighted"
			])]),
			_: 3
		}, 8, ["value"]));
	}
}), Ne = /* @__PURE__ */ O({
	__name: "MenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: !1
		},
		textValue: {
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
		}
	},
	emits: ["select"],
	setup(e, { emit: n }) {
		let r = e, i = n, { forwardRef: o, currentElement: s } = R(), f = X(), p = Z(), m = t(!1);
		async function h() {
			let e = s.value;
			if (!r.disabled && e) {
				let e = new CustomEvent(ve, {
					bubbles: !0,
					cancelable: !0
				});
				i("select", e), await u(), e.defaultPrevented ? m.value = !1 : f.onClose();
			}
		}
		return (e, t) => (l(), g(Me, a(r, {
			ref: w(o),
			onClick: h,
			onPointerdown: t[0] ||= () => {
				m.value = !0;
			},
			onPointerup: t[1] ||= async (e) => {
				await u(), !e.defaultPrevented && (m.value || e.currentTarget?.click());
			},
			onKeydown: t[2] ||= async (t) => {
				let n = w(p).searchRef.value !== "";
				e.disabled || n && t.key === " " || w(pe).includes(t.key) && (t.currentTarget?.click(), t.preventDefault());
			}
		}), {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Pe = /* @__PURE__ */ O({
	__name: "MenuRootContentModal",
	props: {
		loop: {
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
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = G(n, r), o = Y(), { forwardRef: s, currentElement: u } = R();
		return ae(u), (e, t) => (l(), g(Q, a(w(i), {
			ref: w(s),
			"trap-focus": w(o).open.value,
			"disable-outside-pointer-events": w(o).open.value,
			"disable-outside-scroll": !0,
			onDismiss: t[0] ||= (e) => w(o).onOpenChange(!1),
			onFocusOutside: t[1] ||= m((e) => r("focusOutside", e), ["prevent"])
		}), {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus", "disable-outside-pointer-events"]));
	}
}), Fe = /* @__PURE__ */ O({
	__name: "MenuRootContentNonModal",
	props: {
		loop: {
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
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = G(e, t), r = Y();
		return (e, t) => (l(), g(Q, a(w(n), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			"disable-outside-scroll": !1,
			onDismiss: t[0] ||= (e) => w(r).onOpenChange(!1)
		}), {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Ie = /* @__PURE__ */ O({
	__name: "MenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		loop: {
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
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = G(e, t), r = Y(), i = X();
		return (e, t) => (l(), g(w(te), { present: e.forceMount || w(r).open.value }, {
			default: d(() => [w(i).modal.value ? (l(), g(Pe, E(a({ key: 0 }, {
				...e.$attrs,
				...w(n)
			})), {
				default: d(() => [c(e.$slots, "default")]),
				_: 3
			}, 16)) : (l(), g(Fe, E(a({ key: 1 }, {
				...e.$attrs,
				...w(n)
			})), {
				default: d(() => [c(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), Le = /* @__PURE__ */ O({
	__name: "MenuPortal",
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
		return (e, n) => (l(), g(w(re), E(i(t)), {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [$, Re] = /*#__PURE__*/ B("DropdownMenuRoot"), ze = /* @__PURE__ */ O({
	__name: "DropdownMenuRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		dir: {
			type: String,
			required: !1
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: n }) {
		let r = e, i = n;
		R();
		let a = I(r, "open", i, {
			defaultValue: r.defaultOpen,
			passive: r.open === void 0
		}), o = t(), { modal: s, dir: u } = _(r), p = W(u);
		return Re({
			open: a,
			onOpenChange: (e) => {
				a.value = e;
			},
			onOpenToggle: () => {
				a.value = !a.value;
			},
			triggerId: "",
			triggerElement: o,
			contentId: "",
			modal: s,
			dir: p
		}), (e, t) => (l(), g(w(Ae), {
			open: w(a),
			"onUpdate:open": t[0] ||= (e) => f(a) ? a.value = e : null,
			dir: w(p),
			modal: w(s)
		}, {
			default: d(() => [c(e.$slots, "default", { open: w(a) })]),
			_: 3
		}, 8, [
			"open",
			"dir",
			"modal"
		]));
	}
}), Be = /* @__PURE__ */ O({
	__name: "DropdownMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		loop: {
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
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(e, { emit: n }) {
		let r = G(e, n);
		R();
		let i = $(), o = t(!1);
		function s(e) {
			e.defaultPrevented || (o.value || setTimeout(() => {
				i.triggerElement.value?.focus();
			}, 0), o.value = !1, e.preventDefault());
		}
		return i.contentId ||= ne(void 0, "reka-dropdown-menu-content"), (e, t) => (l(), g(w(Ie), a(w(r), {
			id: w(i).contentId,
			"aria-labelledby": w(i)?.triggerId,
			style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			},
			onCloseAutoFocus: s,
			onInteractOutside: t[0] ||= (e) => {
				if (e.defaultPrevented) return;
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				(!w(i).modal.value || r) && (o.value = !0), w(i).triggerElement.value?.contains(e.target) && e.preventDefault();
			}
		}), {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}, 16, ["id", "aria-labelledby"]));
	}
}), Ve = /* @__PURE__ */ O({
	__name: "DropdownMenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: !1
		},
		textValue: {
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
		}
	},
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, r = V(t);
		return R(), (e, t) => (l(), g(w(Ne), E(i({
			...n,
			...w(r)
		})), {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), He = /* @__PURE__ */ O({
	__name: "DropdownMenuPortal",
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
		return (e, n) => (l(), g(w(Le), E(i(t)), {
			default: d(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Ue = /* @__PURE__ */ O({
	__name: "DropdownMenuTrigger",
	props: {
		disabled: {
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
			default: "button"
		}
	},
	setup(e) {
		let t = e, r = $(), { forwardRef: i, currentElement: a } = R();
		return n(() => {
			r.triggerElement = a;
		}), r.triggerId ||= ne(void 0, "reka-dropdown-menu-trigger"), (e, n) => (l(), g(w(Te), { "as-child": "" }, {
			default: d(() => [k(w(z), {
				id: w(r).triggerId,
				ref: w(i),
				type: e.as === "button" ? "button" : void 0,
				"as-child": t.asChild,
				as: e.as,
				"aria-haspopup": "menu",
				"aria-expanded": w(r).open.value,
				"aria-controls": w(r).open.value ? w(r).contentId : void 0,
				"data-disabled": e.disabled ? "" : void 0,
				disabled: e.disabled,
				"data-state": w(r).open.value ? "open" : "closed",
				onClick: n[0] ||= async (t) => {
					!e.disabled && t.button === 0 && t.ctrlKey === !1 && (w(r)?.onOpenToggle(), await u(), w(r).open.value && t.preventDefault());
				},
				onKeydown: n[1] ||= C((t) => {
					e.disabled || (["Enter", " "].includes(t.key) && w(r).onOpenToggle(), t.key === "ArrowDown" && w(r).onOpenChange(!0), [
						"Enter",
						" ",
						"ArrowDown"
					].includes(t.key) && t.preventDefault());
				}, [
					"enter",
					"space",
					"arrow-down"
				])
			}, {
				default: d(() => [c(e.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"type",
				"as-child",
				"as",
				"aria-expanded",
				"aria-controls",
				"data-disabled",
				"disabled",
				"data-state"
			])]),
			_: 3
		}));
	}
}), We = [
	"data-selected",
	"aria-current",
	"onClick"
], Ge = ["data-selected", "aria-label"], Ke = /* @__PURE__ */ O({
	__name: "MobileBottomNav",
	props: { route: {} },
	emits: ["select"],
	setup(t, { emit: n }) {
		let r = t, i = n, { t: a } = x(), o = Se(), c = S(() => P.map((e) => ({
			...N(e),
			label: M(a, e)
		}))), u = S(() => F.map((e) => ({
			...N(e),
			label: M(a, e)
		}))), f = S(() => F.includes(r.route)), m = S(() => a("nav.more"));
		function _(e) {
			i("select", e);
		}
		return (t, n) => (l(), p("nav", { class: y(w(e).bottom_nav) }, [(l(!0), p(T, null, s(c.value, (t) => (l(), p("button", {
			key: t.route,
			type: "button",
			class: y(["tc-interactive", w(e).bottom_nav_item]),
			"data-selected": t.route === r.route,
			"aria-current": t.route === r.route ? "page" : void 0,
			onClick: (e) => _(t.route)
		}, [k(j, {
			icon: t.icon,
			size: 20
		}, null, 8, ["icon"]), b("span", { class: y(w(e).bottom_nav_item_label) }, h(t.label), 3)], 10, We))), 128)), k(w(ze), null, {
			default: d(() => [k(w(Ue), { "as-child": "" }, {
				default: d(() => [b("button", {
					type: "button",
					class: y(["tc-interactive", w(e).bottom_nav_item]),
					"data-selected": f.value,
					"aria-label": m.value,
					"data-testid": "mobile-more-trigger"
				}, [k(j, {
					icon: w(Ce),
					size: 20
				}, null, 8, ["icon"]), b("span", { class: y(w(e).bottom_nav_item_label) }, h(m.value), 3)], 10, Ge)]),
				_: 1
			}), k(w(He), { to: w(o) }, {
				default: d(() => [k(w(Be), {
					class: y(w(e).more_menu_content),
					side: "top",
					"side-offset": 8,
					align: "end"
				}, {
					default: d(() => [(l(!0), p(T, null, s(u.value, (t) => (l(), g(w(Ve), {
						key: t.route,
						class: y(w(e).more_menu_item),
						onSelect: (e) => _(t.route)
					}, {
						default: d(() => [k(j, {
							icon: t.icon,
							size: 16
						}, null, 8, ["icon"]), D(" " + h(t.label), 1)]),
						_: 2
					}, 1032, ["class", "onSelect"]))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 8, ["to"])]),
			_: 1
		})], 2));
	}
});
//#endregion
export { Ke as default };
