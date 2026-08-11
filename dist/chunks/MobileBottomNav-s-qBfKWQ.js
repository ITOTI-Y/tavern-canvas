import { t as e } from "./shell.module-BtGMUacP.js";
import { A as t, C as n, D as r, E as i, F as a, I as o, N as s, O as c, V as l, W as u, X as d, _ as f, at as p, c as m, ct as h, dt as g, et as _, h as v, j as y, m as b, n as x, p as S, pt as C, s as w, u as T, ut as E, v as D, x as O, y as k } from "./vue-i18n-DUz2Gjn8.js";
import { n as A, t as j } from "./AppIcon-Cnhzrx9o.js";
import { a as M, i as N, n as P, t as F } from "./route_nav-hvhq2rfa.js";
import { _ as I, b as L, c as R, i as z, j as B, l as V, m as H, n as ee, o as te, s as ne, t as re } from "./Teleport-C7mDSUEl.js";
import { a as ie, i as ae, o as U, t as oe } from "./FocusScope-B2vRGnoX.js";
import { a as se, c as W, i as ce, n as le, o as G, t as ue } from "./PopperContent-7a56nwZP.js";
import { n as de, t as fe } from "./useTypeahead-hdQTkCce.js";
import { a as pe, c as K, i as me, l as he, n as ge, o as _e, r as ve, s as ye, t as be } from "./Collection-5SRQOk3F.js";
import { t as xe } from "./RovingFocusGroup-CK-2q3kn.js";
import { t as Se } from "./use_portal_target-DcUqGXJq.js";
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
		return (e, r) => (s(), v(h(ce), g(n(t)), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function Ee() {
	let e = _(!1);
	return t(() => {
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
	setup(e, { emit: t }) {
		let n = e, r = t, { modal: i, dir: a } = p(n), c = W(a), l = I(n, "open", r), d = _(), f = De();
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
			isUsingKeyboardRef: f,
			dir: c,
			modal: i
		}), (e, t) => (s(), v(h(se), null, {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}));
	}
}), [Z, je] = /*#__PURE__*/ B("MenuContent"), Q = /* @__PURE__ */ O({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ i({
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
	setup(e, { emit: t }) {
		let n = e, r = t, i = Y(), a = X(), { trapFocus: c, disableOutsidePointerEvents: d, loop: f } = p(n);
		de(), ie(d.value);
		let m = _(""), g = _(0), b = _(0), x = _(null), S = _("right"), C = _(0), w = _(null), T = _(), { forwardRef: E, currentElement: D } = R(), { handleTypeaheadSearch: O } = fe(), A = _();
		function j(e) {
			let t = q(e, A.value || U(), D.value, {
				loop: f.value,
				arrowKeyOptions: "vertical",
				dir: a?.dir.value,
				focus: !1,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			t && (A.value = t, t.scrollIntoView({ block: "nearest" }));
		}
		function M() {
			A.value && A.value.click();
		}
		let N = _(), P = _();
		l(A, (e) => {
			if (P.value && (e === void 0 || e !== P.value.trigger.value)) {
				if (e === void 0) return;
				P.value.onOpenChange(!1), P.value = void 0;
			}
		}), l(D, (e) => {
			i.onContentChange(e);
		}), y(() => {
			window.clearTimeout(g.value);
		});
		function F(e) {
			return S.value === x.value?.side && he(e, x.value?.area);
		}
		async function I(e) {
			r("openAutoFocus", e), !e.defaultPrevented && (e.preventDefault(), D.value?.focus({ preventScroll: !0 }));
		}
		function L(e) {
			if (e.defaultPrevented) return;
			let t = e.target, n = t.closest("[data-reka-menu-content]") === e.currentTarget, r = ["input", "textarea"].includes(t.tagName.toLowerCase()), i = e.ctrlKey || e.altKey || e.metaKey, o = e.key.length === 1, s = q(e, U(), D.value, {
				loop: f.value,
				arrowKeyOptions: "vertical",
				dir: a?.dir.value,
				focus: !0,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (s) return s?.focus();
			if (e.code === "Space") return;
			let c = T.value?.getItems() ?? [];
			if (n && (e.key === "Tab" && a.modal.value && e.preventDefault(), !i && o && !r && O(e.key, c)), e.target !== D.value || !ge.includes(e.key)) return;
			e.preventDefault();
			let l = [...c.map((e) => e.ref)];
			me.includes(e.key) && l.reverse(), _e(l);
		}
		function z(e) {
			e?.currentTarget?.contains?.(e.target) || (window.clearTimeout(g.value), m.value = "");
		}
		function B(e) {
			if (!K(e)) return;
			let t = e.target, n = C.value !== e.clientX;
			if ((e?.currentTarget)?.contains(t) && n) {
				let t = e.clientX > C.value ? "right" : "left";
				S.value = t, C.value = e.clientX;
			}
		}
		function V(e) {
			K(e) && N.value && N.value.focus();
		}
		return je({
			onItemEnter: (e) => !!F(e),
			onItemLeave: (e) => F(e) ? !0 : (["INPUT", "TEXTAREA"].includes(U()?.tagName || "") || D.value?.focus(), w.value = null, !1),
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
			pointerGraceTimerRef: b,
			onPointerGraceIntentChange: (e) => {
				x.value = e;
			}
		}), (e, t) => (s(), v(h(oe), {
			"as-child": "",
			trapped: h(c),
			onMountAutoFocus: I,
			onUnmountAutoFocus: t[7] ||= (e) => r("closeAutoFocus", e)
		}, {
			default: u(() => [k(h(ee), {
				"as-child": "",
				"disable-outside-pointer-events": h(d),
				onEscapeKeyDown: t[2] ||= (e) => r("escapeKeyDown", e),
				onPointerDownOutside: t[3] ||= (e) => r("pointerDownOutside", e),
				onFocusOutside: t[4] ||= (e) => r("focusOutside", e),
				onInteractOutside: t[5] ||= (e) => r("interactOutside", e),
				onDismiss: t[6] ||= (e) => r("dismiss")
			}, {
				default: u(() => [k(h(xe), {
					ref_key: "rovingFocusGroupRef",
					ref: T,
					"current-tab-stop-id": w.value,
					"onUpdate:currentTabStopId": t[0] ||= (e) => w.value = e,
					"as-child": "",
					orientation: "vertical",
					dir: h(a).dir.value,
					loop: h(f),
					onEntryFocus: t[1] ||= (e) => {
						r("entryFocus", e), h(a).isUsingKeyboardRef.value || e.preventDefault();
					}
				}, {
					default: u(() => [k(h(le), {
						ref: h(E),
						role: "menu",
						as: e.as,
						"as-child": e.asChild,
						"aria-orientation": "vertical",
						"data-reka-menu-content": "",
						"data-state": h(ye)(h(i).open.value),
						dir: h(a).dir.value,
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
						default: u(() => [o(e.$slots, "default")]),
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
		let t = e, n = Z(), { forwardRef: i, currentElement: a } = R(), { CollectionItem: l } = be(), d = _(!1), f = S(() => d.value || a.value != null && n.highlightedElement.value === a.value);
		async function p(e) {
			if (!(e.defaultPrevented || !K(e))) {
				if (t.disabled) n.onItemLeave(e);
				else if (!n.onItemEnter(e)) {
					let t = e.currentTarget;
					n.highlightedElement.value = t, ["INPUT", "TEXTAREA"].includes(U()?.tagName || "") || t.focus({ preventScroll: !0 });
				}
			}
		}
		async function m(e) {
			await c(), !e.defaultPrevented && K(e) && n.highlightedElement.value === a.value && !n.onItemLeave(e) && n.highlightedElement.value === a.value && (n.highlightedElement.value = void 0);
		}
		return (e, t) => (s(), v(h(l), { value: { textValue: e.textValue } }, {
			default: u(() => [k(h(z), r({
				ref: h(i),
				role: "menuitem",
				tabindex: "-1"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"aria-disabled": e.disabled || void 0,
				"data-disabled": e.disabled ? "" : void 0,
				"data-highlighted": f.value ? "" : void 0,
				onPointermove: p,
				onPointerleave: m,
				onFocus: t[0] ||= async (t) => {
					await c(), !(t.defaultPrevented || e.disabled) && (d.value = !0, h(n).highlightedElement.value = t.currentTarget);
				},
				onBlur: t[1] ||= async (e) => {
					await c(), !e.defaultPrevented && (d.value = !1);
				}
			}), {
				default: u(() => [o(e.$slots, "default")]),
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
	setup(e, { emit: t }) {
		let n = e, i = t, { forwardRef: a, currentElement: l } = R(), d = X(), f = Z(), p = _(!1);
		async function m() {
			let e = l.value;
			if (!n.disabled && e) {
				let e = new CustomEvent(ve, {
					bubbles: !0,
					cancelable: !0
				});
				i("select", e), await c(), e.defaultPrevented ? p.value = !1 : d.onClose();
			}
		}
		return (e, t) => (s(), v(Me, r(n, {
			ref: h(a),
			onClick: m,
			onPointerdown: t[0] ||= () => {
				p.value = !0;
			},
			onPointerup: t[1] ||= async (e) => {
				await c(), !e.defaultPrevented && (p.value || e.currentTarget?.click());
			},
			onKeydown: t[2] ||= async (t) => {
				let n = h(f).searchRef.value !== "";
				e.disabled || n && t.key === " " || h(pe).includes(t.key) && (t.currentTarget?.click(), t.preventDefault());
			}
		}), {
			default: u(() => [o(e.$slots, "default")]),
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
		let n = e, i = t, a = G(n, i), c = Y(), { forwardRef: l, currentElement: d } = R();
		return ae(d), (e, t) => (s(), v(Q, r(h(a), {
			ref: h(l),
			"trap-focus": h(c).open.value,
			"disable-outside-pointer-events": h(c).open.value,
			"disable-outside-scroll": !0,
			onDismiss: t[0] ||= (e) => h(c).onOpenChange(!1),
			onFocusOutside: t[1] ||= m((e) => i("focusOutside", e), ["prevent"])
		}), {
			default: u(() => [o(e.$slots, "default")]),
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
		let n = G(e, t), i = Y();
		return (e, t) => (s(), v(Q, r(h(n), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			"disable-outside-scroll": !1,
			onDismiss: t[0] ||= (e) => h(i).onOpenChange(!1)
		}), {
			default: u(() => [o(e.$slots, "default")]),
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
		let n = G(e, t), i = Y(), a = X();
		return (e, t) => (s(), v(h(te), { present: e.forceMount || h(i).open.value }, {
			default: u(() => [h(a).modal.value ? (s(), v(Pe, g(r({ key: 0 }, {
				...e.$attrs,
				...h(n)
			})), {
				default: u(() => [o(e.$slots, "default")]),
				_: 3
			}, 16)) : (s(), v(Fe, g(r({ key: 1 }, {
				...e.$attrs,
				...h(n)
			})), {
				default: u(() => [o(e.$slots, "default")]),
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
		return (e, r) => (s(), v(h(re), g(n(t)), {
			default: u(() => [o(e.$slots, "default")]),
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
	setup(e, { emit: t }) {
		let n = e, r = t;
		R();
		let i = I(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), a = _(), { modal: c, dir: l } = p(n), f = W(l);
		return Re({
			open: i,
			onOpenChange: (e) => {
				i.value = e;
			},
			onOpenToggle: () => {
				i.value = !i.value;
			},
			triggerId: "",
			triggerElement: a,
			contentId: "",
			modal: c,
			dir: f
		}), (e, t) => (s(), v(h(Ae), {
			open: h(i),
			"onUpdate:open": t[0] ||= (e) => d(i) ? i.value = e : null,
			dir: h(f),
			modal: h(c)
		}, {
			default: u(() => [o(e.$slots, "default", { open: h(i) })]),
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
	setup(e, { emit: t }) {
		let n = G(e, t);
		R();
		let i = $(), a = _(!1);
		function c(e) {
			e.defaultPrevented || (a.value || setTimeout(() => {
				i.triggerElement.value?.focus();
			}, 0), a.value = !1, e.preventDefault());
		}
		return i.contentId ||= ne(void 0, "reka-dropdown-menu-content"), (e, t) => (s(), v(h(Ie), r(h(n), {
			id: h(i).contentId,
			"aria-labelledby": h(i)?.triggerId,
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
				(!h(i).modal.value || r) && (a.value = !0), h(i).triggerElement.value?.contains(e.target) && e.preventDefault();
			}
		}), {
			default: u(() => [o(e.$slots, "default")]),
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
		let r = e, i = V(t);
		return R(), (e, t) => (s(), v(h(Ne), g(n({
			...r,
			...h(i)
		})), {
			default: u(() => [o(e.$slots, "default")]),
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
		return (e, r) => (s(), v(h(Le), g(n(t)), {
			default: u(() => [o(e.$slots, "default")]),
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
		let n = e, r = $(), { forwardRef: i, currentElement: a } = R();
		return t(() => {
			r.triggerElement = a;
		}), r.triggerId ||= ne(void 0, "reka-dropdown-menu-trigger"), (e, t) => (s(), v(h(Te), { "as-child": "" }, {
			default: u(() => [k(h(z), {
				id: h(r).triggerId,
				ref: h(i),
				type: e.as === "button" ? "button" : void 0,
				"as-child": n.asChild,
				as: e.as,
				"aria-haspopup": "menu",
				"aria-expanded": h(r).open.value,
				"aria-controls": h(r).open.value ? h(r).contentId : void 0,
				"data-disabled": e.disabled ? "" : void 0,
				disabled: e.disabled,
				"data-state": h(r).open.value ? "open" : "closed",
				onClick: t[0] ||= async (t) => {
					!e.disabled && t.button === 0 && t.ctrlKey === !1 && (h(r)?.onOpenToggle(), await c(), h(r).open.value && t.preventDefault());
				},
				onKeydown: t[1] ||= w((t) => {
					e.disabled || (["Enter", " "].includes(t.key) && h(r).onOpenToggle(), t.key === "ArrowDown" && h(r).onOpenChange(!0), [
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
				default: u(() => [o(e.$slots, "default")]),
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
		let r = t, i = n, { t: o } = x(), c = Se(), l = S(() => P.map((e) => ({
			...N(e),
			label: M(o, e)
		}))), d = S(() => F.map((e) => ({
			...N(e),
			label: M(o, e)
		}))), p = S(() => F.includes(r.route)), m = S(() => o("nav.more"));
		function g(e) {
			i("select", e);
		}
		return (t, n) => (s(), f("nav", { class: E(h(e).bottom_nav) }, [(s(!0), f(T, null, a(l.value, (t) => (s(), f("button", {
			key: t.route,
			type: "button",
			class: E(["tc-interactive", h(e).bottom_nav_item]),
			"data-selected": t.route === r.route,
			"aria-current": t.route === r.route ? "page" : void 0,
			onClick: (e) => g(t.route)
		}, [k(j, {
			icon: t.icon,
			size: 20
		}, null, 8, ["icon"]), b("span", { class: E(h(e).bottom_nav_item_label) }, C(t.label), 3)], 10, We))), 128)), k(h(ze), null, {
			default: u(() => [k(h(Ue), { "as-child": "" }, {
				default: u(() => [b("button", {
					type: "button",
					class: E(["tc-interactive", h(e).bottom_nav_item]),
					"data-selected": p.value,
					"aria-label": m.value,
					"data-testid": "mobile-more-trigger"
				}, [k(j, {
					icon: h(Ce),
					size: 20
				}, null, 8, ["icon"]), b("span", { class: E(h(e).bottom_nav_item_label) }, C(m.value), 3)], 10, Ge)]),
				_: 1
			}), k(h(He), { to: h(c) }, {
				default: u(() => [k(h(Be), {
					class: E(h(e).more_menu_content),
					side: "top",
					"side-offset": 8,
					align: "end"
				}, {
					default: u(() => [(s(!0), f(T, null, a(d.value, (t) => (s(), v(h(Ve), {
						key: t.route,
						class: E(h(e).more_menu_item),
						onSelect: (e) => g(t.route)
					}, {
						default: u(() => [k(j, {
							icon: t.icon,
							size: 16
						}, null, 8, ["icon"]), D(" " + C(t.label), 1)]),
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
