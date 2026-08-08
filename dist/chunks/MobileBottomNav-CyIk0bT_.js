import { $ as e, A as t, B as n, C as r, D as i, E as a, F as o, I as s, L as c, N as l, O as u, U as d, Y as f, _ as p, c as m, ft as h, h as g, it as _, j as v, lt as y, m as b, n as x, p as S, s as C, st as w, u as T, ut as E, v as D, x as O, y as k } from "./vue-i18n-CmRk7RjK.js";
import { t as A } from "./shell.module-vwMcpviy.js";
import { t as j } from "./createLucideIcon-DAbI7E00.js";
import { a as M, n as N, o as P, r as F, t as I } from "./route_nav-CAxsCBUg.js";
import { _ as L, b as R, c as z, i as B, j as V, l as ee, m as H, n as te, o as ne, s as U, t as re } from "./Teleport-abGLK5Wv.js";
import { a as ie, i as ae, o as W, t as oe } from "./FocusScope-DrI3mUpj.js";
import { a as se, c as G, i as ce, n as le, o as K, t as ue } from "./PopperContent-CWEcCerf.js";
import { n as de, t as fe } from "./useTypeahead-Cjsk7LCT.js";
import { a as pe, c as q, i as me, l as he, n as ge, o as _e, r as ve, s as ye, t as be } from "./Collection-DSmIzJYn.js";
import { t as xe } from "./RovingFocusGroup-C0pItw0h.js";
import { t as Se } from "./use_portal_target-r_aUtBuc.js";
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
		return (e, n) => (l(), g(w(ce), E(r(t)), {
			default: d(() => [s(e.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function Ee() {
	let n = e(!1);
	return t(() => {
		H("keydown", () => {
			n.value = !0;
		}, {
			capture: !0,
			passive: !0
		}), H(["pointerdown", "pointermove"], () => {
			n.value = !1;
		}, {
			capture: !0,
			passive: !0
		});
	}), n;
}
var De = R(Ee), [X, Oe] = /*#__PURE__*/ V(["MenuRoot", "MenuSub"], "MenuContext"), [Z, ke] = /*#__PURE__*/ V("MenuRoot"), Ae = /* @__PURE__ */ O({
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
	setup(t, { emit: n }) {
		let r = t, i = n, { modal: a, dir: o } = _(r), c = G(o), u = L(r, "open", i), f = e(), p = De();
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
			dir: c,
			modal: a
		}), (e, t) => (l(), g(w(se), null, {
			default: d(() => [s(e.$slots, "default")]),
			_: 3
		}));
	}
}), [Q, je] = /*#__PURE__*/ V("MenuContent"), $ = /* @__PURE__ */ O({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ a({
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
	setup(t, { emit: r }) {
		let i = t, a = r, o = X(), c = Z(), { trapFocus: u, disableOutsidePointerEvents: f, loop: p } = _(i);
		de(), ie(f.value);
		let m = e(""), h = e(0), y = e(0), b = e(null), x = e("right"), S = e(0), C = e(null), T = e(), { forwardRef: E, currentElement: D } = z(), { handleTypeaheadSearch: O } = fe(), A = e();
		function j(e) {
			let t = J(e, A.value || W(), D.value, {
				loop: p.value,
				arrowKeyOptions: "vertical",
				dir: c?.dir.value,
				focus: !1,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			t && (A.value = t, t.scrollIntoView({ block: "nearest" }));
		}
		function M() {
			A.value && A.value.click();
		}
		let N = e(), P = e();
		n(A, (e) => {
			if (P.value && (e === void 0 || e !== P.value.trigger.value)) {
				if (e === void 0) return;
				P.value.onOpenChange(!1), P.value = void 0;
			}
		}), n(D, (e) => {
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
			let t = e.target, n = t.closest("[data-reka-menu-content]") === e.currentTarget, r = ["input", "textarea"].includes(t.tagName.toLowerCase()), i = e.ctrlKey || e.altKey || e.metaKey, a = e.key.length === 1, o = J(e, W(), D.value, {
				loop: p.value,
				arrowKeyOptions: "vertical",
				dir: c?.dir.value,
				focus: !0,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (o) return o?.focus();
			if (e.code === "Space") return;
			let s = T.value?.getItems() ?? [];
			if (n && (e.key === "Tab" && c.modal.value && e.preventDefault(), !i && a && !r && O(e.key, s)), e.target !== D.value || !ge.includes(e.key)) return;
			e.preventDefault();
			let l = [...s.map((e) => e.ref)];
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
			default: d(() => [k(w(te), {
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
					dir: w(c).dir.value,
					loop: w(p),
					onEntryFocus: t[1] ||= (e) => {
						a("entryFocus", e), w(c).isUsingKeyboardRef.value || e.preventDefault();
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
						dir: w(c).dir.value,
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
						default: d(() => [s(e.$slots, "default")]),
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
	setup(t) {
		let n = t, r = Q(), { forwardRef: a, currentElement: o } = z(), { CollectionItem: c } = be(), f = e(!1), p = S(() => f.value || o.value != null && r.highlightedElement.value === o.value);
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
			await u(), !e.defaultPrevented && q(e) && r.highlightedElement.value === o.value && !r.onItemLeave(e) && r.highlightedElement.value === o.value && (r.highlightedElement.value = void 0);
		}
		return (e, t) => (l(), g(w(c), { value: { textValue: e.textValue } }, {
			default: d(() => [k(w(B), i({
				ref: w(a),
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
				default: d(() => [s(e.$slots, "default")]),
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
	setup(t, { emit: n }) {
		let r = t, a = n, { forwardRef: o, currentElement: c } = z(), f = Z(), p = Q(), m = e(!1);
		async function h() {
			let e = c.value;
			if (!r.disabled && e) {
				let e = new CustomEvent(ve, {
					bubbles: !0,
					cancelable: !0
				});
				a("select", e), await u(), e.defaultPrevented ? m.value = !1 : f.onClose();
			}
		}
		return (e, t) => (l(), g(Me, i(r, {
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
			default: d(() => [s(e.$slots, "default")]),
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
		let n = e, r = t, a = K(n, r), o = X(), { forwardRef: c, currentElement: u } = z();
		return ae(u), (e, t) => (l(), g($, i(w(a), {
			ref: w(c),
			"trap-focus": w(o).open.value,
			"disable-outside-pointer-events": w(o).open.value,
			"disable-outside-scroll": !0,
			onDismiss: t[0] ||= (e) => w(o).onOpenChange(!1),
			onFocusOutside: t[1] ||= m((e) => r("focusOutside", e), ["prevent"])
		}), {
			default: d(() => [s(e.$slots, "default")]),
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
		let n = K(e, t), r = X();
		return (e, t) => (l(), g($, i(w(n), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			"disable-outside-scroll": !1,
			onDismiss: t[0] ||= (e) => w(r).onOpenChange(!1)
		}), {
			default: d(() => [s(e.$slots, "default")]),
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
		let n = K(e, t), r = X(), a = Z();
		return (e, t) => (l(), g(w(ne), { present: e.forceMount || w(r).open.value }, {
			default: d(() => [w(a).modal.value ? (l(), g(Pe, E(i({ key: 0 }, {
				...e.$attrs,
				...w(n)
			})), {
				default: d(() => [s(e.$slots, "default")]),
				_: 3
			}, 16)) : (l(), g(Fe, E(i({ key: 1 }, {
				...e.$attrs,
				...w(n)
			})), {
				default: d(() => [s(e.$slots, "default")]),
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
		return (e, n) => (l(), g(w(re), E(r(t)), {
			default: d(() => [s(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [Re, ze] = /*#__PURE__*/ V("DropdownMenuRoot"), Be = /* @__PURE__ */ O({
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
	setup(t, { emit: n }) {
		let r = t, i = n;
		z();
		let a = L(r, "open", i, {
			defaultValue: r.defaultOpen,
			passive: r.open === void 0
		}), o = e(), { modal: c, dir: u } = _(r), p = G(u);
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
			modal: c,
			dir: p
		}), (e, t) => (l(), g(w(Ae), {
			open: w(a),
			"onUpdate:open": t[0] ||= (e) => f(a) ? a.value = e : null,
			dir: w(p),
			modal: w(c)
		}, {
			default: d(() => [s(e.$slots, "default", { open: w(a) })]),
			_: 3
		}, 8, [
			"open",
			"dir",
			"modal"
		]));
	}
}), Ve = /* @__PURE__ */ O({
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
	setup(t, { emit: n }) {
		let r = K(t, n);
		z();
		let a = Re(), o = e(!1);
		function c(e) {
			e.defaultPrevented || (o.value || setTimeout(() => {
				a.triggerElement.value?.focus();
			}, 0), o.value = !1, e.preventDefault());
		}
		return a.contentId ||= U(void 0, "reka-dropdown-menu-content"), (e, t) => (l(), g(w(Ie), i(w(r), {
			id: w(a).contentId,
			"aria-labelledby": w(a)?.triggerId,
			style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			},
			onCloseAutoFocus: c,
			onInteractOutside: t[0] ||= (e) => {
				if (e.defaultPrevented) return;
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				(!w(a).modal.value || r) && (o.value = !0), w(a).triggerElement.value?.contains(e.target) && e.preventDefault();
			}
		}), {
			default: d(() => [s(e.$slots, "default")]),
			_: 3
		}, 16, ["id", "aria-labelledby"]));
	}
}), He = /* @__PURE__ */ O({
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
		let n = e, i = ee(t);
		return z(), (e, t) => (l(), g(w(Ne), E(r({
			...n,
			...w(i)
		})), {
			default: d(() => [s(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Ue = /* @__PURE__ */ O({
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
		return (e, n) => (l(), g(w(Le), E(r(t)), {
			default: d(() => [s(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), We = /* @__PURE__ */ O({
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
		let n = e, r = Re(), { forwardRef: i, currentElement: a } = z();
		return t(() => {
			r.triggerElement = a;
		}), r.triggerId ||= U(void 0, "reka-dropdown-menu-trigger"), (e, t) => (l(), g(w(Te), { "as-child": "" }, {
			default: d(() => [k(w(B), {
				id: w(r).triggerId,
				ref: w(i),
				type: e.as === "button" ? "button" : void 0,
				"as-child": n.asChild,
				as: e.as,
				"aria-haspopup": "menu",
				"aria-expanded": w(r).open.value,
				"aria-controls": w(r).open.value ? w(r).contentId : void 0,
				"data-disabled": e.disabled ? "" : void 0,
				disabled: e.disabled,
				"data-state": w(r).open.value ? "open" : "closed",
				onClick: t[0] ||= async (t) => {
					!e.disabled && t.button === 0 && t.ctrlKey === !1 && (w(r)?.onOpenToggle(), await u(), w(r).open.value && t.preventDefault());
				},
				onKeydown: t[1] ||= C((t) => {
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
				default: d(() => [s(e.$slots, "default")]),
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
], Ke = ["data-selected", "aria-label"], qe = /* @__PURE__ */ O({
	__name: "MobileBottomNav",
	props: { route: {} },
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = x(), a = Se(), s = S(() => F.map((e) => ({
			...M(e),
			label: P(i, e)
		}))), u = S(() => N.map((e) => ({
			...M(e),
			label: P(i, e)
		}))), f = S(() => N.includes(n.route)), m = S(() => i("nav.more"));
		function _(e) {
			r("select", e);
		}
		return (e, t) => (l(), p("nav", { class: y(w(A).bottom_nav) }, [(l(!0), p(T, null, o(s.value, (e) => (l(), p("button", {
			key: e.route,
			type: "button",
			class: y(["tc-interactive", w(A).bottom_nav_item]),
			"data-selected": e.route === n.route,
			"aria-current": e.route === n.route ? "page" : void 0,
			onClick: (t) => _(e.route)
		}, [(l(), g(c(e.icon), {
			size: 20,
			"stroke-width": w(I),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"])), b("span", { class: y(w(A).bottom_nav_item_label) }, h(e.label), 3)], 10, Ge))), 128)), k(w(Be), null, {
			default: d(() => [k(w(We), { "as-child": "" }, {
				default: d(() => [b("button", {
					type: "button",
					class: y(["tc-interactive", w(A).bottom_nav_item]),
					"data-selected": f.value,
					"aria-label": m.value,
					"data-testid": "mobile-more-trigger"
				}, [k(w(Ce), {
					size: 20,
					"stroke-width": w(I),
					"aria-hidden": "true"
				}, null, 8, ["stroke-width"]), b("span", { class: y(w(A).bottom_nav_item_label) }, h(m.value), 3)], 10, Ke)]),
				_: 1
			}), k(w(Ue), { to: w(a) }, {
				default: d(() => [k(w(Ve), {
					class: y(w(A).more_menu_content),
					side: "top",
					"side-offset": 8,
					align: "end"
				}, {
					default: d(() => [(l(!0), p(T, null, o(u.value, (e) => (l(), g(w(He), {
						key: e.route,
						class: y(w(A).more_menu_item),
						onSelect: (t) => _(e.route)
					}, {
						default: d(() => [(l(), g(c(e.icon), {
							size: 16,
							"stroke-width": w(I),
							"aria-hidden": "true"
						}, null, 8, ["stroke-width"])), D(" " + h(e.label), 1)]),
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
