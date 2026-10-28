import { C as e, D as t, G as n, H as r, L as i, P as a, R as o, T as s, U as c, _ as l, c as u, dt as d, ft as f, h as p, j as m, lt as h, mt as g, ot as _, p as v, pt as y, tt as b, v as x, x as S, y as C, z as w } from "./vue-i18n-L-BrQRnK.js";
import { n as T } from "./portal_keys-DthxrmWp.js";
import { t as E } from "./components_styles-DHX8irr3.js";
import { A as D, C as O, D as ee, O as k, P as A, S as te, a as ne, f as j, h as re, l as ie, s as M, t as N, u as P, y as F } from "./Teleport-CquQcgiX.js";
import { a as I, i as L, n as R, o as z, r as B, s as V, t as H } from "./PopperContent-BPSDCuaj.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function U(e, t) {
	let n = ee(!1, 300);
	k(() => {
		n.value = !1;
	});
	let r = b(null), i = O();
	function a() {
		r.value = null, n.value = !1;
	}
	function o(e, t) {
		if (!t) return;
		let i = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = G(a, W(a, i.getBoundingClientRect()), 1), s = K(t.getBoundingClientRect()), c = ae([...o, ...s]);
		r.value = c, n.value = !0;
	}
	return c((n) => {
		if (e.value && t.value) {
			let r = (e) => o(e, t.value), i = (t) => o(t, e.value);
			e.value.addEventListener("pointerleave", r), t.value.addEventListener("pointerleave", i), n(() => {
				e.value?.removeEventListener("pointerleave", r), t.value?.removeEventListener("pointerleave", i);
			});
		}
	}), c((n) => {
		if (r.value) {
			let o = (n) => {
				if (!r.value || !(n.target instanceof Element)) return;
				let o = n.target, s = {
					x: n.clientX,
					y: n.clientY
				}, c = e.value?.contains(o) || t.value?.contains(o), l = !q(s, r.value), u = !!o.closest("[data-grace-area-trigger]");
				c ? a() : (l || u) && (a(), i.trigger());
			};
			e.value?.ownerDocument.addEventListener("pointermove", o), n(() => e.value?.ownerDocument.removeEventListener("pointermove", o));
		}
	}), {
		isPointerInTransit: n,
		onPointerExit: i.on
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
}, ce = /* @__PURE__ */ S({
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
		let r = e;
		return j(), (e, o) => (a(), p(h(M), t(r, {
			width: e.width,
			height: e.height,
			viewBox: e.asChild ? void 0 : "0 0 12 6",
			preserveAspectRatio: e.asChild ? void 0 : "none"
		}), {
			default: n(() => [i(e.$slots, "default", {}, () => [e.rounded ? (a(), l("path", se)) : (a(), l("path", oe))])]),
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
}, ue = /* @__PURE__ */ S({
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
		let { forwardRef: r } = j(), o = R(), s = v(() => le[o.placedSide.value]);
		return (e, c) => (a(), l("span", {
			ref: (e) => {
				h(o).onArrowChange(e ?? void 0);
			},
			style: y({
				position: "absolute",
				left: h(o).arrowX?.value ? `${h(o).arrowX?.value}px` : void 0,
				top: h(o).arrowY?.value ? `${h(o).arrowY?.value}px` : void 0,
				[s.value]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0"
				}[h(o).placedSide.value],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)"
				}[h(o).placedSide.value],
				visibility: h(o).shouldHideArrow.value ? "hidden" : void 0
			})
		}, [C(ce, t(e.$attrs, {
			ref: h(r),
			style: { display: "block" },
			as: e.as,
			"as-child": e.asChild,
			rounded: e.rounded,
			width: e.width,
			height: e.height
		}), {
			default: n(() => [i(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"rounded",
			"width",
			"height"
		])], 4));
	}
}), de = /* @__PURE__ */ S({
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
	setup(t) {
		let r = t;
		return j(), (t, o) => (a(), p(h(ue), f(e(r)), {
			default: n(() => [i(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [Y, fe] = /*#__PURE__*/ A("TooltipProvider"), pe = /* @__PURE__ */ S({
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
		let { delayDuration: t, skipDelayDuration: n, disableHoverableContent: r, disableClosingTrigger: a, ignoreNonKeyboardFocus: o, disabled: s, content: c } = _(e);
		j();
		let l = b(!0), u = b(!1), { start: d, stop: f } = D(() => {
			l.value = !0;
		}, n, { immediate: !1 });
		return fe({
			isOpenDelayed: l,
			delayDuration: t,
			onOpen() {
				f(), l.value = !1;
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
}), X = "tooltip.open", [Z, me] = /*#__PURE__*/ A("TooltipRoot"), Q = /* @__PURE__ */ S({
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
		let o = e, s = t;
		j();
		let c = Y(), l = v(() => o.disableHoverableContent ?? c.disableHoverableContent.value), u = v(() => o.disableClosingTrigger ?? c.disableClosingTrigger.value), d = v(() => o.disabled ?? c.disabled.value), f = v(() => o.delayDuration ?? c.delayDuration.value), m = v(() => o.ignoreNonKeyboardFocus ?? c.ignoreNonKeyboardFocus.value), g = te(o, "open", s, {
			defaultValue: o.defaultOpen,
			passive: o.open === void 0
		});
		r(g, (e) => {
			c.onClose && (e ? (c.onOpen(), document.dispatchEvent(new CustomEvent(X))) : c.onClose());
		});
		let _ = b(!1), y = b(), x = v(() => g.value ? _.value ? "delayed-open" : "instant-open" : "closed"), { start: S, stop: C } = D(() => {
			_.value = !0, g.value = !0;
		}, f, { immediate: !1 });
		function w() {
			C(), _.value = !1, g.value = !0;
		}
		function T() {
			C(), g.value = !1;
		}
		function E() {
			S();
		}
		return me({
			contentId: "",
			open: g,
			stateAttribute: x,
			trigger: y,
			onTriggerChange(e) {
				y.value = e;
			},
			onTriggerEnter() {
				c.isOpenDelayed.value ? E() : w();
			},
			onTriggerLeave() {
				l.value ? T() : C();
			},
			onOpen: w,
			onClose: T,
			disableHoverableContent: l,
			disableClosingTrigger: u,
			disabled: d,
			ignoreNonKeyboardFocus: m
		}), (e, t) => (a(), p(h(L), null, {
			default: n(() => [i(e.$slots, "default", { open: h(g) })]),
			_: 3
		}));
	}
}), $ = /* @__PURE__ */ S({
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
	setup(e, { emit: r }) {
		let o = e, s = r, c = Z(), l = Y(), { forwardRef: d, currentElement: f } = j(), _ = v(() => o.ariaLabel || f.value?.textContent), y = v(() => {
			let { ariaLabel: e, ...t } = o;
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
		return m(() => {
			F(window, "scroll", (e) => {
				e.target?.contains(c.trigger.value) && c.onClose();
			}, { capture: !0 }), F(window, X, c.onClose);
		}), (e, r) => (a(), p(h(ne), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: r[0] ||= (e) => s("escapeKeyDown", e),
			onPointerDownOutside: r[1] ||= (e) => {
				h(c).disableClosingTrigger.value && h(c).trigger.value?.contains(e.target) && e.preventDefault(), s("pointerDownOutside", e);
			},
			onFocusOutside: r[2] ||= u(() => {}, ["prevent"]),
			onDismiss: r[3] ||= (e) => h(c).onClose()
		}, {
			default: n(() => [C(h(H), t({
				ref: h(d),
				"data-state": h(c).stateAttribute.value
			}, {
				...e.$attrs,
				...y.value
			}, { style: {
				"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
				"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
				"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: n(() => [i(e.$slots, "default"), C(h(I), {
					id: h(c).contentId,
					role: "tooltip"
				}, {
					default: n(() => [x(g(_.value), 1)]),
					_: 1
				}, 8, ["id"])]),
				_: 3
			}, 16, ["data-state"])]),
			_: 3
		}));
	}
}), he = /* @__PURE__ */ S({
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
		let r = V(e), { forwardRef: o, currentElement: s } = j(), { trigger: c, onClose: l } = Z(), u = Y(), { isPointerInTransit: d, onPointerExit: f } = U(c, s);
		return u.isPointerInTransitRef = d, f(() => {
			l();
		}), (e, s) => (a(), p($, t({ ref: h(o) }, h(r)), {
			default: n(() => [i(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ge = /* @__PURE__ */ S({
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
	setup(e, { emit: r }) {
		let s = e, c = r, l = Z(), u = z(s, c), { forwardRef: d } = j();
		return (e, r) => (a(), p(h(ie), { present: e.forceMount || h(l).open.value }, {
			default: n(() => [(a(), p(o(h(l).disableHoverableContent.value ? $ : he), t({ ref: h(d) }, h(u)), {
				default: n(() => [i(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), _e = /* @__PURE__ */ S({
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
	setup(t) {
		let r = t;
		return (t, o) => (a(), p(h(N), f(e(r)), {
			default: n(() => [i(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ve = /* @__PURE__ */ S({
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
	setup(e) {
		let r = e, o = Z(), s = Y();
		o.contentId ||= P(void 0, "reka-tooltip-content");
		let { forwardRef: c, currentElement: l } = j(), u = b(!1), d = b(!1), f = v(() => o.disabled.value ? {} : {
			click: E,
			focus: S,
			pointermove: y,
			pointerleave: x,
			pointerdown: _,
			blur: T
		});
		m(() => {
			o.onTriggerChange(l.value);
		});
		function g() {
			setTimeout(() => {
				u.value = !1;
			}, 1);
		}
		function _() {
			o.open && !o.disableClosingTrigger.value && o.onClose(), u.value = !0, document.addEventListener("pointerup", g, { once: !0 });
		}
		function y(e) {
			e.pointerType !== "touch" && !d.value && !s.isPointerInTransitRef.value && (o.onTriggerEnter(), d.value = !0);
		}
		function x() {
			o.onTriggerLeave(), d.value = !1;
		}
		function S(e) {
			u.value || o.ignoreNonKeyboardFocus.value && !e.target.matches?.(":focus-visible") || o.onOpen();
		}
		function T() {
			o.onClose();
		}
		function E() {
			o.disableClosingTrigger.value || o.onClose();
		}
		return (e, s) => (a(), p(h(B), {
			"as-child": "",
			reference: e.reference
		}, {
			default: n(() => [C(h(M), t({
				ref: h(c),
				"aria-describedby": h(o).open.value ? h(o).contentId : void 0,
				"data-state": h(o).stateAttribute.value,
				as: e.as,
				"as-child": r.asChild,
				"data-grace-area-trigger": ""
			}, w(f.value)), {
				default: n(() => [i(e.$slots, "default")]),
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
}), ye = /* @__PURE__ */ S({
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
	setup(t) {
		let r = s(T, void 0), o = v(() => r ? { to: r } : {});
		return (r, s) => (a(), p(h(pe), { "disable-hoverable-content": !1 }, {
			default: n(() => [C(h(Q), {
				"delay-duration": t.delayDuration,
				disabled: t.disabled
			}, {
				default: n(() => [C(h(ve), { "as-child": "" }, {
					default: n(() => [i(r.$slots, "default")]),
					_: 3
				}), C(h(_e), f(e(o.value)), {
					default: n(() => [C(h(ge), {
						side: t.side,
						"side-offset": 6,
						class: d(h(E).tooltipContent)
					}, {
						default: n(() => [x(g(t.content) + " ", 1), C(h(de), {
							class: d(h(E).tooltipArrow),
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
