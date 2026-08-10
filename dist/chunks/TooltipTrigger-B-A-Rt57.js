import { $ as e, A as t, B as n, C as r, D as i, I as a, L as o, N as s, R as c, U as l, V as u, c as d, ft as f, h as p, it as m, p as h, st as g, ut as _, v, x as y, y as b } from "./vue-i18n-D0uIxSJk.js";
import { E as x, O as S, _ as C, c as w, i as T, j as E, m as D, n as O, o as k, s as A, t as j, u as M, v as N, w as ee } from "./Teleport-CfSgxnHY.js";
import { a as P, i as F, n as I, o as L, s as R } from "./PopperContent-K7T6sb7Y.js";
import { t as z } from "./VisuallyHidden-D7Q8zkTs.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function B(t, n) {
	let r = ee(!1, 300);
	x(() => {
		r.value = !1;
	});
	let i = e(null), a = N();
	function o() {
		i.value = null, r.value = !1;
	}
	function s(e, t) {
		if (!t) return;
		let n = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = H(a, V(a, n.getBoundingClientRect()), 1), s = U(t.getBoundingClientRect()), c = G([...o, ...s]);
		i.value = c, r.value = !0;
	}
	return u((e) => {
		if (t.value && n.value) {
			let r = (e) => s(e, n.value), i = (e) => s(e, t.value);
			t.value.addEventListener("pointerleave", r), n.value.addEventListener("pointerleave", i), e(() => {
				t.value?.removeEventListener("pointerleave", r), n.value?.removeEventListener("pointerleave", i);
			});
		}
	}), u((e) => {
		if (i.value) {
			let r = (e) => {
				if (!i.value || !(e.target instanceof Element)) return;
				let r = e.target, s = {
					x: e.clientX,
					y: e.clientY
				}, c = t.value?.contains(r) || n.value?.contains(r), l = !W(s, i.value), u = !!r.closest("[data-grace-area-trigger]");
				c ? o() : (l || u) && (o(), a.trigger());
			};
			t.value?.ownerDocument.addEventListener("pointermove", r), e(() => t.value?.ownerDocument.removeEventListener("pointermove", r));
		}
	}), {
		isPointerInTransit: r,
		onPointerExit: a.on
	};
}
function V(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function H(e, t, n = 5) {
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
function U(e) {
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
function W(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function G(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), K(t);
}
function K(e) {
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
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipProvider.js
var [q, J] = /*#__PURE__*/ E("TooltipProvider"), Y = /* @__PURE__ */ y({
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
	setup(t) {
		let { delayDuration: n, skipDelayDuration: r, disableHoverableContent: i, disableClosingTrigger: o, ignoreNonKeyboardFocus: s, disabled: c, content: l } = m(t);
		w();
		let u = e(!0), d = e(!1), { start: f, stop: p } = S(() => {
			u.value = !0;
		}, r, { immediate: !1 });
		return J({
			isOpenDelayed: u,
			delayDuration: n,
			onOpen() {
				p(), u.value = !1;
			},
			onClose() {
				f();
			},
			isPointerInTransitRef: d,
			disableHoverableContent: i,
			disableClosingTrigger: o,
			disabled: c,
			ignoreNonKeyboardFocus: s,
			content: l
		}), (e, t) => a(e.$slots, "default");
	}
}), X = "tooltip.open", [Z, Q] = /*#__PURE__*/ E("TooltipRoot"), te = /* @__PURE__ */ y({
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
	setup(t, { emit: r }) {
		let i = t, o = r;
		w();
		let c = q(), u = h(() => i.disableHoverableContent ?? c.disableHoverableContent.value), d = h(() => i.disableClosingTrigger ?? c.disableClosingTrigger.value), f = h(() => i.disabled ?? c.disabled.value), m = h(() => i.delayDuration ?? c.delayDuration.value), _ = h(() => i.ignoreNonKeyboardFocus ?? c.ignoreNonKeyboardFocus.value), v = C(i, "open", o, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
		});
		n(v, (e) => {
			c.onClose && (e ? (c.onOpen(), document.dispatchEvent(new CustomEvent(X))) : c.onClose());
		});
		let y = e(!1), b = e(), x = h(() => v.value ? y.value ? "delayed-open" : "instant-open" : "closed"), { start: T, stop: E } = S(() => {
			y.value = !0, v.value = !0;
		}, m, { immediate: !1 });
		function D() {
			E(), y.value = !1, v.value = !0;
		}
		function O() {
			E(), v.value = !1;
		}
		function k() {
			T();
		}
		return Q({
			contentId: "",
			open: v,
			stateAttribute: x,
			trigger: b,
			onTriggerChange(e) {
				b.value = e;
			},
			onTriggerEnter() {
				c.isOpenDelayed.value ? k() : D();
			},
			onTriggerLeave() {
				u.value ? O() : E();
			},
			onOpen: D,
			onClose: O,
			disableHoverableContent: u,
			disableClosingTrigger: d,
			disabled: f,
			ignoreNonKeyboardFocus: _
		}), (e, t) => (s(), p(g(P), null, {
			default: l(() => [a(e.$slots, "default", { open: g(v) })]),
			_: 3
		}));
	}
}), $ = /* @__PURE__ */ y({
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
	setup(e, { emit: n }) {
		let r = e, o = n, c = Z(), u = q(), { forwardRef: m, currentElement: _ } = w(), y = h(() => r.ariaLabel || _.value?.textContent), x = h(() => {
			let { ariaLabel: e, ...t } = r;
			return M(t, u.content.value ?? {}, {
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
		return t(() => {
			D(window, "scroll", (e) => {
				e.target?.contains(c.trigger.value) && c.onClose();
			}, { capture: !0 }), D(window, X, c.onClose);
		}), (e, t) => (s(), p(g(O), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: t[0] ||= (e) => o("escapeKeyDown", e),
			onPointerDownOutside: t[1] ||= (e) => {
				g(c).disableClosingTrigger.value && g(c).trigger.value?.contains(e.target) && e.preventDefault(), o("pointerDownOutside", e);
			},
			onFocusOutside: t[2] ||= d(() => {}, ["prevent"]),
			onDismiss: t[3] ||= (e) => g(c).onClose()
		}, {
			default: l(() => [b(g(I), i({
				ref: g(m),
				"data-state": g(c).stateAttribute.value
			}, {
				...e.$attrs,
				...x.value
			}, { style: {
				"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
				"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
				"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: l(() => [a(e.$slots, "default"), b(g(z), {
					id: g(c).contentId,
					role: "tooltip"
				}, {
					default: l(() => [v(f(y.value), 1)]),
					_: 1
				}, 8, ["id"])]),
				_: 3
			}, 16, ["data-state"])]),
			_: 3
		}));
	}
}), ne = /* @__PURE__ */ y({
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
		let t = R(e), { forwardRef: n, currentElement: r } = w(), { trigger: o, onClose: c } = Z(), u = q(), { isPointerInTransit: d, onPointerExit: f } = B(o, r);
		return u.isPointerInTransitRef = d, f(() => {
			c();
		}), (e, r) => (s(), p($, i({ ref: g(n) }, g(t)), {
			default: l(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), re = /* @__PURE__ */ y({
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
		let n = e, r = t, c = Z(), u = L(n, r), { forwardRef: d } = w();
		return (e, t) => (s(), p(g(k), { present: e.forceMount || g(c).open.value }, {
			default: l(() => [(s(), p(o(g(c).disableHoverableContent.value ? $ : ne), i({ ref: g(d) }, g(u)), {
				default: l(() => [a(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), ie = /* @__PURE__ */ y({
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
		let t = e;
		return (e, n) => (s(), p(g(j), _(r(t)), {
			default: l(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ae = /* @__PURE__ */ y({
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
	setup(n) {
		let r = n, o = Z(), u = q();
		o.contentId ||= A(void 0, "reka-tooltip-content");
		let { forwardRef: d, currentElement: f } = w(), m = e(!1), _ = e(!1), v = h(() => o.disabled.value ? {} : {
			click: O,
			focus: E,
			pointermove: S,
			pointerleave: C,
			pointerdown: x,
			blur: D
		});
		t(() => {
			o.onTriggerChange(f.value);
		});
		function y() {
			setTimeout(() => {
				m.value = !1;
			}, 1);
		}
		function x() {
			o.open && !o.disableClosingTrigger.value && o.onClose(), m.value = !0, document.addEventListener("pointerup", y, { once: !0 });
		}
		function S(e) {
			e.pointerType !== "touch" && !_.value && !u.isPointerInTransitRef.value && (o.onTriggerEnter(), _.value = !0);
		}
		function C() {
			o.onTriggerLeave(), _.value = !1;
		}
		function E(e) {
			m.value || o.ignoreNonKeyboardFocus.value && !e.target.matches?.(":focus-visible") || o.onOpen();
		}
		function D() {
			o.onClose();
		}
		function O() {
			o.disableClosingTrigger.value || o.onClose();
		}
		return (e, t) => (s(), p(g(F), {
			"as-child": "",
			reference: e.reference
		}, {
			default: l(() => [b(g(T), i({
				ref: g(d),
				"aria-describedby": g(o).open.value ? g(o).contentId : void 0,
				"data-state": g(o).stateAttribute.value,
				as: e.as,
				"as-child": r.asChild,
				"data-grace-area-trigger": ""
			}, c(v.value)), {
				default: l(() => [a(e.$slots, "default")]),
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
});
//#endregion
export { Y as a, te as i, ie as n, re as r, ae as t };
