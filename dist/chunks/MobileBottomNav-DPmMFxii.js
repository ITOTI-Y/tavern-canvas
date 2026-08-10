import { t as e } from "./shell.module-vwMcpviy.js";
import { $ as t, A as n, B as r, C as i, D as a, E as o, F as s, I as c, L as l, N as u, O as d, U as f, Y as p, _ as m, c as h, ft as g, h as _, it as v, j as y, lt as b, m as x, n as S, p as C, s as w, st as T, u as E, ut as D, v as O, x as k, y as A } from "./vue-i18n-D0uIxSJk.js";
import { t as j } from "./createLucideIcon-D9d_Lia0.js";
import { a as M, n as N, o as P, r as F, t as I } from "./route_nav-DgPwdX5c.js";
import { _ as L, b as R, c as z, i as B, j as V, l as ee, m as H, n as te, o as ne, s as U, t as re } from "./Teleport-CfSgxnHY.js";
import { a as ie, i as ae, o as W, t as oe } from "./FocusScope-MQ_KQm08.js";
import { a as se, c as G, i as ce, n as le, o as K, t as ue } from "./PopperContent-K7T6sb7Y.js";
import { n as de, t as fe } from "./useTypeahead-ftb3Li7l.js";
import { a as pe, c as q, i as me, l as he, n as ge, o as _e, r as ve, s as ye, t as be } from "./Collection-CsTPApsC.js";
import { t as xe } from "./RovingFocusGroup-BDSC0leT.js";
import { t as Se } from "./use_portal_target-Bu49Bio9.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/ellipsis.js
var Ce = j("ellipsis", [
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
function J(e, t, n, r = {}) {
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
	return v || _ ? b = Y(y, t, {
		goForward: _ ? m : c === "ltr" ? d : f,
		loop: s
	}) : h ? b = y.at(0) || null : g && (b = y.at(-1) || null), u && b?.focus(), b;
}
function Y(e, t, n, r = e.includes(t) ? e.length : e.length + 1) {
	if (--r === 0) return null;
	let i = e.indexOf(t), a;
	if (a = i === -1 ? n.goForward ? 0 : e.length - 1 : n.goForward ? i + 1 : i - 1, !n.loop && (a < 0 || a >= e.length)) return null;
	let o = e[(a + e.length) % e.length];
	return o ? o.hasAttribute("disabled") && o.getAttribute("disabled") !== "false" ? Y(e, o, n, r) : o : null;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuAnchor.js
var Te = /* @__PURE__ */ k({
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
		return (e, n) => (u(), _(T(ce), D(i(t)), {
			default: f(() => [c(e.$slots, "default")]),
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
var De = R(Ee), [X, Oe] = /*#__PURE__*/ V(["MenuRoot", "MenuSub"], "MenuContext"), [Z, ke] = /*#__PURE__*/ V("MenuRoot"), Ae = /* @__PURE__ */ k({
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
		let r = e, i = n, { modal: a, dir: o } = v(r), s = G(o), l = L(r, "open", i), d = t(), p = De();
		return Oe({
			open: l,
			onOpenChange: (e) => {
				l.value = e;
			},
			content: d,
			onContentChange: (e) => {
				d.value = e;
			}
		}), ke({
			onClose: () => {
				l.value = !1;
			},
			isUsingKeyboardRef: p,
			dir: s,
			modal: a
		}), (e, t) => (u(), _(T(se), null, {
			default: f(() => [c(e.$slots, "default")]),
			_: 3
		}));
	}
}), [Q, je] = /*#__PURE__*/ V("MenuContent"), $ = /* @__PURE__ */ k({
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
		let i = e, a = n, o = X(), s = Z(), { trapFocus: l, disableOutsidePointerEvents: d, loop: p } = v(i);
		de(), ie(d.value);
		let m = t(""), h = t(0), g = t(0), b = t(null), x = t("right"), S = t(0), C = t(null), w = t(), { forwardRef: E, currentElement: D } = z(), { handleTypeaheadSearch: O } = fe(), k = t();
		function j(e) {
			let t = J(e, k.value || W(), D.value, {
				loop: p.value,
				arrowKeyOptions: "vertical",
				dir: s?.dir.value,
				focus: !1,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			t && (k.value = t, t.scrollIntoView({ block: "nearest" }));
		}
		function M() {
			k.value && k.value.click();
		}
		let N = t(), P = t();
		r(k, (e) => {
			if (P.value && (e === void 0 || e !== P.value.trigger.value)) {
				if (e === void 0) return;
				P.value.onOpenChange(!1), P.value = void 0;
			}
		}), r(D, (e) => {
			o.onContentChange(e);
		}), y(() => {
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
			let t = e.target, n = t.closest("[data-reka-menu-content]") === e.currentTarget, r = ["input", "textarea"].includes(t.tagName.toLowerCase()), i = e.ctrlKey || e.altKey || e.metaKey, a = e.key.length === 1, o = J(e, W(), D.value, {
				loop: p.value,
				arrowKeyOptions: "vertical",
				dir: s?.dir.value,
				focus: !0,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (o) return o?.focus();
			if (e.code === "Space") return;
			let c = w.value?.getItems() ?? [];
			if (n && (e.key === "Tab" && s.modal.value && e.preventDefault(), !i && a && !r && O(e.key, c)), e.target !== D.value || !ge.includes(e.key)) return;
			e.preventDefault();
			let l = [...c.map((e) => e.ref)];
			me.includes(e.key) && l.reverse(), _e(l);
		}
		function R(e) {
			e?.currentTarget?.contains?.(e.target) || (window.clearTimeout(h.value), m.value = "");
		}
		function B(e) {
			if (!q(e)) return;
			let t = e.target, n = S.value !== e.clientX;
			if ((e?.currentTarget)?.contains(t) && n) {
				let t = e.clientX > S.value ? "right" : "left";
				x.value = t, S.value = e.clientX;
			}
		}
		function V(e) {
			q(e) && N.value && N.value.focus();
		}
		return je({
			onItemEnter: (e) => !!F(e),
			onItemLeave: (e) => F(e) ? !0 : (["INPUT", "TEXTAREA"].includes(W()?.tagName || "") || D.value?.focus(), C.value = null, !1),
			onTriggerLeave: (e) => !!F(e),
			searchRef: m,
			highlightedElement: k,
			onKeydownNavigation: j,
			onKeydownEnter: M,
			filterElement: N,
			onFilterElementChange: (e) => {
				N.value = e;
			},
			activeSubmenuContext: P,
			pointerGraceTimerRef: g,
			onPointerGraceIntentChange: (e) => {
				b.value = e;
			}
		}), (e, t) => (u(), _(T(oe), {
			"as-child": "",
			trapped: T(l),
			onMountAutoFocus: I,
			onUnmountAutoFocus: t[7] ||= (e) => a("closeAutoFocus", e)
		}, {
			default: f(() => [A(T(te), {
				"as-child": "",
				"disable-outside-pointer-events": T(d),
				onEscapeKeyDown: t[2] ||= (e) => a("escapeKeyDown", e),
				onPointerDownOutside: t[3] ||= (e) => a("pointerDownOutside", e),
				onFocusOutside: t[4] ||= (e) => a("focusOutside", e),
				onInteractOutside: t[5] ||= (e) => a("interactOutside", e),
				onDismiss: t[6] ||= (e) => a("dismiss")
			}, {
				default: f(() => [A(T(xe), {
					ref_key: "rovingFocusGroupRef",
					ref: w,
					"current-tab-stop-id": C.value,
					"onUpdate:currentTabStopId": t[0] ||= (e) => C.value = e,
					"as-child": "",
					orientation: "vertical",
					dir: T(s).dir.value,
					loop: T(p),
					onEntryFocus: t[1] ||= (e) => {
						a("entryFocus", e), T(s).isUsingKeyboardRef.value || e.preventDefault();
					}
				}, {
					default: f(() => [A(T(le), {
						ref: T(E),
						role: "menu",
						as: e.as,
						"as-child": e.asChild,
						"aria-orientation": "vertical",
						"data-reka-menu-content": "",
						"data-state": T(ye)(T(o).open.value),
						dir: T(s).dir.value,
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
						onBlur: R,
						onPointermove: B,
						onPointerenter: V
					}, {
						default: f(() => [c(e.$slots, "default")]),
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
}), Me = /* @__PURE__ */ k({
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
		let n = e, r = Q(), { forwardRef: i, currentElement: o } = z(), { CollectionItem: s } = be(), l = t(!1), p = C(() => l.value || o.value != null && r.highlightedElement.value === o.value);
		async function m(e) {
			if (!(e.defaultPrevented || !q(e))) {
				if (n.disabled) r.onItemLeave(e);
				else if (!r.onItemEnter(e)) {
					let t = e.currentTarget;
					r.highlightedElement.value = t, ["INPUT", "TEXTAREA"].includes(W()?.tagName || "") || t.focus({ preventScroll: !0 });
				}
			}
		}
		async function h(e) {
			await d(), !e.defaultPrevented && q(e) && r.highlightedElement.value === o.value && !r.onItemLeave(e) && r.highlightedElement.value === o.value && (r.highlightedElement.value = void 0);
		}
		return (e, t) => (u(), _(T(s), { value: { textValue: e.textValue } }, {
			default: f(() => [A(T(B), a({
				ref: T(i),
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
					await d(), !(t.defaultPrevented || e.disabled) && (l.value = !0, T(r).highlightedElement.value = t.currentTarget);
				},
				onBlur: t[1] ||= async (e) => {
					await d(), !e.defaultPrevented && (l.value = !1);
				}
			}), {
				default: f(() => [c(e.$slots, "default")]),
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
}), Ne = /* @__PURE__ */ k({
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
		let r = e, i = n, { forwardRef: o, currentElement: s } = z(), l = Z(), p = Q(), m = t(!1);
		async function h() {
			let e = s.value;
			if (!r.disabled && e) {
				let e = new CustomEvent(ve, {
					bubbles: !0,
					cancelable: !0
				});
				i("select", e), await d(), e.defaultPrevented ? m.value = !1 : l.onClose();
			}
		}
		return (e, t) => (u(), _(Me, a(r, {
			ref: T(o),
			onClick: h,
			onPointerdown: t[0] ||= () => {
				m.value = !0;
			},
			onPointerup: t[1] ||= async (e) => {
				await d(), !e.defaultPrevented && (m.value || e.currentTarget?.click());
			},
			onKeydown: t[2] ||= async (t) => {
				let n = T(p).searchRef.value !== "";
				e.disabled || n && t.key === " " || T(pe).includes(t.key) && (t.currentTarget?.click(), t.preventDefault());
			}
		}), {
			default: f(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Pe = /* @__PURE__ */ k({
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
		let n = e, r = t, i = K(n, r), o = X(), { forwardRef: s, currentElement: l } = z();
		return ae(l), (e, t) => (u(), _($, a(T(i), {
			ref: T(s),
			"trap-focus": T(o).open.value,
			"disable-outside-pointer-events": T(o).open.value,
			"disable-outside-scroll": !0,
			onDismiss: t[0] ||= (e) => T(o).onOpenChange(!1),
			onFocusOutside: t[1] ||= h((e) => r("focusOutside", e), ["prevent"])
		}), {
			default: f(() => [c(e.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus", "disable-outside-pointer-events"]));
	}
}), Fe = /* @__PURE__ */ k({
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
		let n = K(e, t), r = X();
		return (e, t) => (u(), _($, a(T(n), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			"disable-outside-scroll": !1,
			onDismiss: t[0] ||= (e) => T(r).onOpenChange(!1)
		}), {
			default: f(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Ie = /* @__PURE__ */ k({
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
		let n = K(e, t), r = X(), i = Z();
		return (e, t) => (u(), _(T(ne), { present: e.forceMount || T(r).open.value }, {
			default: f(() => [T(i).modal.value ? (u(), _(Pe, D(a({ key: 0 }, {
				...e.$attrs,
				...T(n)
			})), {
				default: f(() => [c(e.$slots, "default")]),
				_: 3
			}, 16)) : (u(), _(Fe, D(a({ key: 1 }, {
				...e.$attrs,
				...T(n)
			})), {
				default: f(() => [c(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), Le = /* @__PURE__ */ k({
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
		return (e, n) => (u(), _(T(re), D(i(t)), {
			default: f(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [Re, ze] = /*#__PURE__*/ V("DropdownMenuRoot"), Be = /* @__PURE__ */ k({
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
		z();
		let a = L(r, "open", i, {
			defaultValue: r.defaultOpen,
			passive: r.open === void 0
		}), o = t(), { modal: s, dir: l } = v(r), d = G(l);
		return ze({
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
			dir: d
		}), (e, t) => (u(), _(T(Ae), {
			open: T(a),
			"onUpdate:open": t[0] ||= (e) => p(a) ? a.value = e : null,
			dir: T(d),
			modal: T(s)
		}, {
			default: f(() => [c(e.$slots, "default", { open: T(a) })]),
			_: 3
		}, 8, [
			"open",
			"dir",
			"modal"
		]));
	}
}), Ve = /* @__PURE__ */ k({
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
		let r = K(e, n);
		z();
		let i = Re(), o = t(!1);
		function s(e) {
			e.defaultPrevented || (o.value || setTimeout(() => {
				i.triggerElement.value?.focus();
			}, 0), o.value = !1, e.preventDefault());
		}
		return i.contentId ||= U(void 0, "reka-dropdown-menu-content"), (e, t) => (u(), _(T(Ie), a(T(r), {
			id: T(i).contentId,
			"aria-labelledby": T(i)?.triggerId,
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
				(!T(i).modal.value || r) && (o.value = !0), T(i).triggerElement.value?.contains(e.target) && e.preventDefault();
			}
		}), {
			default: f(() => [c(e.$slots, "default")]),
			_: 3
		}, 16, ["id", "aria-labelledby"]));
	}
}), He = /* @__PURE__ */ k({
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
		let n = e, r = ee(t);
		return z(), (e, t) => (u(), _(T(Ne), D(i({
			...n,
			...T(r)
		})), {
			default: f(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Ue = /* @__PURE__ */ k({
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
		return (e, n) => (u(), _(T(Le), D(i(t)), {
			default: f(() => [c(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), We = /* @__PURE__ */ k({
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
		let t = e, r = Re(), { forwardRef: i, currentElement: a } = z();
		return n(() => {
			r.triggerElement = a;
		}), r.triggerId ||= U(void 0, "reka-dropdown-menu-trigger"), (e, n) => (u(), _(T(Te), { "as-child": "" }, {
			default: f(() => [A(T(B), {
				id: T(r).triggerId,
				ref: T(i),
				type: e.as === "button" ? "button" : void 0,
				"as-child": t.asChild,
				as: e.as,
				"aria-haspopup": "menu",
				"aria-expanded": T(r).open.value,
				"aria-controls": T(r).open.value ? T(r).contentId : void 0,
				"data-disabled": e.disabled ? "" : void 0,
				disabled: e.disabled,
				"data-state": T(r).open.value ? "open" : "closed",
				onClick: n[0] ||= async (t) => {
					!e.disabled && t.button === 0 && t.ctrlKey === !1 && (T(r)?.onOpenToggle(), await d(), T(r).open.value && t.preventDefault());
				},
				onKeydown: n[1] ||= w((t) => {
					e.disabled || (["Enter", " "].includes(t.key) && T(r).onOpenToggle(), t.key === "ArrowDown" && T(r).onOpenChange(!0), [
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
				default: f(() => [c(e.$slots, "default")]),
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
}), Ge = [
	"data-selected",
	"aria-current",
	"onClick"
], Ke = ["data-selected", "aria-label"], qe = /* @__PURE__ */ k({
	__name: "MobileBottomNav",
	props: { route: {} },
	emits: ["select"],
	setup(t, { emit: n }) {
		let r = t, i = n, { t: a } = S(), o = Se(), c = C(() => F.map((e) => ({
			...M(e),
			label: P(a, e)
		}))), d = C(() => N.map((e) => ({
			...M(e),
			label: P(a, e)
		}))), p = C(() => N.includes(r.route)), h = C(() => a("nav.more"));
		function v(e) {
			i("select", e);
		}
		return (t, n) => (u(), m("nav", { class: b(T(e).bottom_nav) }, [(u(!0), m(E, null, s(c.value, (t) => (u(), m("button", {
			key: t.route,
			type: "button",
			class: b(["tc-interactive", T(e).bottom_nav_item]),
			"data-selected": t.route === r.route,
			"aria-current": t.route === r.route ? "page" : void 0,
			onClick: (e) => v(t.route)
		}, [(u(), _(l(t.icon), {
			size: 20,
			"stroke-width": T(I),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"])), x("span", { class: b(T(e).bottom_nav_item_label) }, g(t.label), 3)], 10, Ge))), 128)), A(T(Be), null, {
			default: f(() => [A(T(We), { "as-child": "" }, {
				default: f(() => [x("button", {
					type: "button",
					class: b(["tc-interactive", T(e).bottom_nav_item]),
					"data-selected": p.value,
					"aria-label": h.value,
					"data-testid": "mobile-more-trigger"
				}, [A(T(Ce), {
					size: 20,
					"stroke-width": T(I),
					"aria-hidden": "true"
				}, null, 8, ["stroke-width"]), x("span", { class: b(T(e).bottom_nav_item_label) }, g(h.value), 3)], 10, Ke)]),
				_: 1
			}), A(T(Ue), { to: T(o) }, {
				default: f(() => [A(T(Ve), {
					class: b(T(e).more_menu_content),
					side: "top",
					"side-offset": 8,
					align: "end"
				}, {
					default: f(() => [(u(!0), m(E, null, s(d.value, (t) => (u(), _(T(He), {
						key: t.route,
						class: b(T(e).more_menu_item),
						onSelect: (e) => v(t.route)
					}, {
						default: f(() => [(u(), _(l(t.icon), {
							size: 16,
							"stroke-width": T(I),
							"aria-hidden": "true"
						}, null, 8, ["stroke-width"])), O(" " + g(t.label), 1)]),
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
export { qe as default };
