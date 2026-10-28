import { A as e, C as t, D as n, H as r, I as i, L as a, N as o, R as s, T as c, V as l, W as u, _ as d, at as f, c as p, ct as m, dt as h, et as g, ft as _, h as v, p as y, pt as b, ut as x, v as S, x as C, y as w } from "./vue-i18n-DUz2Gjn8.js";
import { n as T } from "./portal_keys-B9C82xtk.js";
import { t as E } from "./components_styles-AQk4evuq.js";
import { A as D, C as O, D as ee, O as k, P as A, S as te, a as ne, f as j, h as re, l as ie, s as M, t as N, u as P, y as F } from "./Teleport-CQG7H--I.js";
import { a as I, i as L, n as R, o as z, r as B, s as V, t as H } from "./PopperContent-C8_wQG8J.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function U(e, t) {
	let n = ee(!1, 300);
	k(() => {
		n.value = !1;
	});
	let i = g(null), a = O();
	function o() {
		i.value = null, n.value = !1;
	}
	function s(e, t) {
		if (!t) return;
		let r = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = G(a, W(a, r.getBoundingClientRect()), 1), s = K(t.getBoundingClientRect()), c = ae([...o, ...s]);
		i.value = c, n.value = !0;
	}
	return r((n) => {
		if (e.value && t.value) {
			let r = (e) => s(e, t.value), i = (t) => s(t, e.value);
			e.value.addEventListener("pointerleave", r), t.value.addEventListener("pointerleave", i), n(() => {
				e.value?.removeEventListener("pointerleave", r), t.value?.removeEventListener("pointerleave", i);
			});
		}
	}), r((n) => {
		if (i.value) {
			let r = (n) => {
				if (!i.value || !(n.target instanceof Element)) return;
				let r = n.target, s = {
					x: n.clientX,
					y: n.clientY
				}, c = e.value?.contains(r) || t.value?.contains(r), l = !q(s, i.value), u = !!r.closest("[data-grace-area-trigger]");
				c ? o() : (l || u) && (o(), a.trigger());
			};
			e.value?.ownerDocument.addEventListener("pointermove", r), n(() => e.value?.ownerDocument.removeEventListener("pointermove", r));
		}
	}), {
		isPointerInTransit: n,
		onPointerExit: a.on
	};
}
function W(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function G(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right": r.push({
			x: e.x - n,
			y: e.y - n
		}, {
			x: e.x - n,
			y: e.y + n
		});
	}
	return r;
}
function K(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
function q(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function ae(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), J(t);
}
function J(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t.at(-1), n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n.at(-1), t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/component/Arrow.js
var oe = {
	key: 0,
	d: "M0 0L6 6L12 0"
}, se = {
	key: 1,
	d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
}, ce = /* @__PURE__ */ C({
	__name: "Arrow",
	props: {
		width: {
			type: Number,
			required: !1,
			default: 10
		},
		height: {
			type: Number,
			required: !1,
			default: 5
		},
		rounded: {
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
			default: "svg"
		}
	},
	setup(e) {
		let t = e;
		return j(), (e, r) => (o(), v(m(M), n(t, {
			width: e.width,
			height: e.height,
			viewBox: e.asChild ? void 0 : "0 0 12 6",
			preserveAspectRatio: e.asChild ? void 0 : "none"
		}), {
			default: u(() => [i(e.$slots, "default", {}, () => [e.rounded ? (o(), d("path", se)) : (o(), d("path", oe))])]),
			_: 3
		}, 16, [
			"width",
			"height",
			"viewBox",
			"preserveAspectRatio"
		]));
	}
}), le = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, ue = /* @__PURE__ */ C({
	inheritAttrs: !1,
	__name: "PopperArrow",
	props: {
		width: {
			type: Number,
			required: !1
		},
		height: {
			type: Number,
			required: !1
		},
		rounded: {
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
			default: "svg"
		}
	},
	setup(e) {
		let { forwardRef: t } = j(), r = R(), a = y(() => le[r.placedSide.value]);
		return (e, s) => (o(), d("span", {
			ref: (e) => {
				m(r).onArrowChange(e ?? void 0);
			},
			style: _({
				position: "absolute",
				left: m(r).arrowX?.value ? `${m(r).arrowX?.value}px` : void 0,
				top: m(r).arrowY?.value ? `${m(r).arrowY?.value}px` : void 0,
				[a.value]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0"
				}[m(r).placedSide.value],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)"
				}[m(r).placedSide.value],
				visibility: m(r).shouldHideArrow.value ? "hidden" : void 0
			})
		}, [w(ce, n(e.$attrs, {
			ref: m(t),
			style: { display: "block" },
			as: e.as,
			"as-child": e.asChild,
			rounded: e.rounded,
			width: e.width,
			height: e.height
		}), {
			default: u(() => [i(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"rounded",
			"width",
			"height"
		])], 4));
	}
}), de = /* @__PURE__ */ C({
	__name: "TooltipArrow",
	props: {
		width: {
			type: Number,
			required: !1,
			default: 10
		},
		height: {
			type: Number,
			required: !1,
			default: 5
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "svg"
		}
	},
	setup(e) {
		let n = e;
		return j(), (e, r) => (o(), v(m(ue), h(t(n)), {
			default: u(() => [i(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [Y, fe] = /*#__PURE__*/ A("TooltipProvider"), pe = /* @__PURE__ */ C({
	inheritAttrs: !1,
	__name: "TooltipProvider",
	props: {
		delayDuration: {
			type: Number,
			required: !1,
			default: 700
		},
		skipDelayDuration: {
			type: Number,
			required: !1,
			default: 300
		},
		disableHoverableContent: {
			type: Boolean,
			required: !1,
			default: !1
		},
		disableClosingTrigger: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: !1,
			default: !1
		},
		content: {
			type: Object,
			required: !1
		}
	},
	setup(e) {
		let { delayDuration: t, skipDelayDuration: n, disableHoverableContent: r, disableClosingTrigger: a, ignoreNonKeyboardFocus: o, disabled: s, content: c } = f(e);
		j();
		let l = g(!0), u = g(!1), { start: d, stop: p } = D(() => {
			l.value = !0;
		}, n, { immediate: !1 });
		return fe({
			isOpenDelayed: l,
			delayDuration: t,
			onOpen() {
				p(), l.value = !1;
			},
			onClose() {
				d();
			},
			isPointerInTransitRef: u,
			disableHoverableContent: r,
			disableClosingTrigger: a,
			disabled: s,
			ignoreNonKeyboardFocus: o,
			content: c
		}), (e, t) => i(e.$slots, "default");
	}
}), X = "tooltip.open", [Z, me] = /*#__PURE__*/ A("TooltipRoot"), Q = /* @__PURE__ */ C({
	__name: "TooltipRoot",
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
		delayDuration: {
			type: Number,
			required: !1,
			default: void 0
		},
		disableHoverableContent: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		disableClosingTrigger: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: !1,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		j();
		let a = Y(), s = y(() => n.disableHoverableContent ?? a.disableHoverableContent.value), c = y(() => n.disableClosingTrigger ?? a.disableClosingTrigger.value), d = y(() => n.disabled ?? a.disabled.value), f = y(() => n.delayDuration ?? a.delayDuration.value), p = y(() => n.ignoreNonKeyboardFocus ?? a.ignoreNonKeyboardFocus.value), h = te(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		l(h, (e) => {
			a.onClose && (e ? (a.onOpen(), document.dispatchEvent(new CustomEvent(X))) : a.onClose());
		});
		let _ = g(!1), b = g(), x = y(() => h.value ? _.value ? "delayed-open" : "instant-open" : "closed"), { start: S, stop: C } = D(() => {
			_.value = !0, h.value = !0;
		}, f, { immediate: !1 });
		function w() {
			C(), _.value = !1, h.value = !0;
		}
		function T() {
			C(), h.value = !1;
		}
		function E() {
			S();
		}
		return me({
			contentId: "",
			open: h,
			stateAttribute: x,
			trigger: b,
			onTriggerChange(e) {
				b.value = e;
			},
			onTriggerEnter() {
				a.isOpenDelayed.value ? E() : w();
			},
			onTriggerLeave() {
				s.value ? T() : C();
			},
			onOpen: w,
			onClose: T,
			disableHoverableContent: s,
			disableClosingTrigger: c,
			disabled: d,
			ignoreNonKeyboardFocus: p
		}), (e, t) => (o(), v(m(L), null, {
			default: u(() => [i(e.$slots, "default", { open: m(h) })]),
			_: 3
		}));
	}
}), $ = /* @__PURE__ */ C({
	__name: "TooltipContentImpl",
	props: {
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		as: {
			type: null,
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
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1,
			default: void 0
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
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(t, { emit: r }) {
		let a = t, s = r, c = Z(), l = Y(), { forwardRef: d, currentElement: f } = j(), h = y(() => a.ariaLabel || f.value?.textContent), g = y(() => {
			let { ariaLabel: e, ...t } = a;
			return re(t, l.content.value ?? {}, {
				side: "top",
				sideOffset: 0,
				align: "center",
				avoidCollisions: !0,
				collisionBoundary: [],
				collisionPadding: 0,
				arrowPadding: 0,
				sticky: "partial",
				hideWhenDetached: !1
			});
		});
		return e(() => {
			F(window, "scroll", (e) => {
				e.target?.contains(c.trigger.value) && c.onClose();
			}, { capture: !0 }), F(window, X, c.onClose);
		}), (e, t) => (o(), v(m(ne), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: t[0] ||= (e) => s("escapeKeyDown", e),
			onPointerDownOutside: t[1] ||= (e) => {
				m(c).disableClosingTrigger.value && m(c).trigger.value?.contains(e.target) && e.preventDefault(), s("pointerDownOutside", e);
			},
			onFocusOutside: t[2] ||= p(() => {}, ["prevent"]),
			onDismiss: t[3] ||= (e) => m(c).onClose()
		}, {
			default: u(() => [w(m(H), n({
				ref: m(d),
				"data-state": m(c).stateAttribute.value
			}, {
				...e.$attrs,
				...g.value
			}, { style: {
				"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
				"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
				"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: u(() => [i(e.$slots, "default"), w(m(I), {
					id: m(c).contentId,
					role: "tooltip"
				}, {
					default: u(() => [S(b(h.value), 1)]),
					_: 1
				}, 8, ["id"])]),
				_: 3
			}, 16, ["data-state"])]),
			_: 3
		}));
	}
}), he = /* @__PURE__ */ C({
	__name: "TooltipContentHoverable",
	props: {
		ariaLabel: {
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
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
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
		}
	},
	setup(e) {
		let t = V(e), { forwardRef: r, currentElement: a } = j(), { trigger: s, onClose: c } = Z(), l = Y(), { isPointerInTransit: d, onPointerExit: f } = U(s, a);
		return l.isPointerInTransitRef = d, f(() => {
			c();
		}), (e, a) => (o(), v($, n({ ref: m(r) }, m(t)), {
			default: u(() => [i(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ge = /* @__PURE__ */ C({
	__name: "TooltipContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		ariaLabel: {
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
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
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
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(e, { emit: t }) {
		let r = e, s = t, c = Z(), l = z(r, s), { forwardRef: d } = j();
		return (e, t) => (o(), v(m(ie), { present: e.forceMount || m(c).open.value }, {
			default: u(() => [(o(), v(a(m(c).disableHoverableContent.value ? $ : he), n({ ref: m(d) }, m(l)), {
				default: u(() => [i(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), _e = /* @__PURE__ */ C({
	__name: "TooltipPortal",
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
		let n = e;
		return (e, r) => (o(), v(m(N), h(t(n)), {
			default: u(() => [i(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ve = /* @__PURE__ */ C({
	__name: "TooltipTrigger",
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
			required: !1,
			default: "button"
		}
	},
	setup(t) {
		let r = t, a = Z(), c = Y();
		a.contentId ||= P(void 0, "reka-tooltip-content");
		let { forwardRef: l, currentElement: d } = j(), f = g(!1), p = g(!1), h = y(() => a.disabled.value ? {} : {
			click: E,
			focus: C,
			pointermove: x,
			pointerleave: S,
			pointerdown: b,
			blur: T
		});
		e(() => {
			a.onTriggerChange(d.value);
		});
		function _() {
			setTimeout(() => {
				f.value = !1;
			}, 1);
		}
		function b() {
			a.open && !a.disableClosingTrigger.value && a.onClose(), f.value = !0, document.addEventListener("pointerup", _, { once: !0 });
		}
		function x(e) {
			e.pointerType !== "touch" && !p.value && !c.isPointerInTransitRef.value && (a.onTriggerEnter(), p.value = !0);
		}
		function S() {
			a.onTriggerLeave(), p.value = !1;
		}
		function C(e) {
			f.value || a.ignoreNonKeyboardFocus.value && !e.target.matches?.(":focus-visible") || a.onOpen();
		}
		function T() {
			a.onClose();
		}
		function E() {
			a.disableClosingTrigger.value || a.onClose();
		}
		return (e, t) => (o(), v(m(B), {
			"as-child": "",
			reference: e.reference
		}, {
			default: u(() => [w(m(M), n({
				ref: m(l),
				"aria-describedby": m(a).open.value ? m(a).contentId : void 0,
				"data-state": m(a).stateAttribute.value,
				as: e.as,
				"as-child": r.asChild,
				"data-grace-area-trigger": ""
			}, s(h.value)), {
				default: u(() => [i(e.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-describedby",
				"data-state",
				"as",
				"as-child"
			])]),
			_: 3
		}, 8, ["reference"]));
	}
}), ye = /* @__PURE__ */ C({
	__name: "AppTooltip",
	props: {
		content: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		side: { default: "top" },
		delayDuration: { default: 300 }
	},
	setup(e) {
		let n = c(T, void 0), r = y(() => n ? { to: n } : {});
		return (n, a) => (o(), v(m(pe), { "disable-hoverable-content": !1 }, {
			default: u(() => [w(m(Q), {
				"delay-duration": e.delayDuration,
				disabled: e.disabled
			}, {
				default: u(() => [w(m(ve), { "as-child": "" }, {
					default: u(() => [i(n.$slots, "default")]),
					_: 3
				}), w(m(_e), h(t(r.value)), {
					default: u(() => [w(m(ge), {
						side: e.side,
						"side-offset": 6,
						class: x(m(E).tooltipContent)
					}, {
						default: u(() => [S(b(e.content) + " ", 1), w(m(de), {
							class: x(m(E).tooltipArrow),
							width: 8,
							height: 5
						}, null, 8, ["class"])]),
						_: 1
					}, 8, ["side", "class"])]),
					_: 1
				}, 16)]),
				_: 3
			}, 8, ["delay-duration", "disabled"])]),
			_: 3
		}));
	}
});
//#endregion
export { ye as t };
