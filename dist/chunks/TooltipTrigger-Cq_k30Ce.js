import { A as e, B as t, E as n, I as r, K as i, N as a, S as o, U as s, V as c, W as l, d as u, g as d, ht as f, nt as p, pt as m, st as h, ut as g, v as _, w as v, x as y, z as b } from "./AppIcon-BpY-A4VH.js";
import { B as x, C as S, D as C, G as w, J as T, K as E, L as D, N as O, O as k, Q as A, T as j, V as M, a as N, b as P, c as F, i as I, k as L, n as R, o as z, w as B } from "./PopperContent-_OEj_1Tb.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function V(e, t) {
	let n = w(!1, 300);
	E(() => {
		n.value = !1;
	});
	let r = p(null), i = M();
	function a() {
		r.value = null, n.value = !1;
	}
	function o(e, t) {
		if (!t) return;
		let i = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = U(a, H(a, i.getBoundingClientRect()), 1), s = W(t.getBoundingClientRect()), c = K([...o, ...s]);
		r.value = c, n.value = !0;
	}
	return l((n) => {
		if (e.value && t.value) {
			let r = (e) => o(e, t.value), i = (t) => o(t, e.value);
			e.value.addEventListener("pointerleave", r), t.value.addEventListener("pointerleave", i), n(() => {
				e.value?.removeEventListener("pointerleave", r), t.value?.removeEventListener("pointerleave", i);
			});
		}
	}), l((n) => {
		if (r.value) {
			let o = (n) => {
				if (!r.value || !(n.target instanceof Element)) return;
				let o = n.target, s = {
					x: n.clientX,
					y: n.clientY
				}, c = e.value?.contains(o) || t.value?.contains(o), l = !G(s, r.value), u = !!o.closest("[data-grace-area-trigger]");
				c ? a() : (l || u) && (a(), i.trigger());
			};
			e.value?.ownerDocument.addEventListener("pointermove", o), n(() => e.value?.ownerDocument.removeEventListener("pointermove", o));
		}
	}), {
		isPointerInTransit: n,
		onPointerExit: i.on
	};
}
function H(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function U(e, t, n = 5) {
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
function W(e) {
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
function G(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function K(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), q(t);
}
function q(e) {
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
var [J, Y] = /*#__PURE__*/ A("TooltipProvider"), X = /* @__PURE__ */ v({
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
		let { delayDuration: t, skipDelayDuration: n, disableHoverableContent: r, disableClosingTrigger: i, ignoreNonKeyboardFocus: a, disabled: o, content: s } = h(e);
		L();
		let c = p(!0), l = p(!1), { start: u, stop: d } = T(() => {
			c.value = !0;
		}, n, { immediate: !1 });
		return Y({
			isOpenDelayed: c,
			delayDuration: t,
			onOpen() {
				d(), c.value = !1;
			},
			onClose() {
				u();
			},
			isPointerInTransitRef: l,
			disableHoverableContent: r,
			disableClosingTrigger: i,
			disabled: o,
			ignoreNonKeyboardFocus: a,
			content: s
		}), (e, t) => b(e.$slots, "default");
	}
}), Z = "tooltip.open", [Q, ee] = /*#__PURE__*/ A("TooltipRoot"), te = /* @__PURE__ */ v({
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
		let n = e, a = t;
		L();
		let o = J(), c = d(() => n.disableHoverableContent ?? o.disableHoverableContent.value), l = d(() => n.disableClosingTrigger ?? o.disableClosingTrigger.value), u = d(() => n.disabled ?? o.disabled.value), f = d(() => n.delayDuration ?? o.delayDuration.value), m = d(() => n.ignoreNonKeyboardFocus ?? o.ignoreNonKeyboardFocus.value), h = x(n, "open", a, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		s(h, (e) => {
			o.onClose && (e ? (o.onOpen(), document.dispatchEvent(new CustomEvent(Z))) : o.onClose());
		});
		let v = p(!1), y = p(), S = d(() => h.value ? v.value ? "delayed-open" : "instant-open" : "closed"), { start: C, stop: w } = T(() => {
			v.value = !0, h.value = !0;
		}, f, { immediate: !1 });
		function E() {
			w(), v.value = !1, h.value = !0;
		}
		function D() {
			w(), h.value = !1;
		}
		function O() {
			C();
		}
		return ee({
			contentId: "",
			open: h,
			stateAttribute: S,
			trigger: y,
			onTriggerChange(e) {
				y.value = e;
			},
			onTriggerEnter() {
				o.isOpenDelayed.value ? O() : E();
			},
			onTriggerLeave() {
				c.value ? D() : w();
			},
			onOpen: E,
			onClose: D,
			disableHoverableContent: c,
			disableClosingTrigger: l,
			disabled: u,
			ignoreNonKeyboardFocus: m
		}), (e, t) => (r(), _(g(N), null, {
			default: i(() => [b(e.$slots, "default", { open: g(h) })]),
			_: 3
		}));
	}
}), $ = /* @__PURE__ */ v({
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
	setup(t, { emit: n }) {
		let s = t, c = n, l = Q(), p = J(), { forwardRef: m, currentElement: h } = L(), v = d(() => s.ariaLabel || h.value?.textContent), x = d(() => {
			let { ariaLabel: e, ...t } = s;
			return O(t, p.content.value ?? {}, {
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
		return a(() => {
			D(window, "scroll", (e) => {
				e.target?.contains(l.trigger.value) && l.onClose();
			}, { capture: !0 }), D(window, Z, l.onClose);
		}), (t, n) => (r(), _(g(P), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: n[0] ||= (e) => c("escapeKeyDown", e),
			onPointerDownOutside: n[1] ||= (e) => {
				g(l).disableClosingTrigger.value && g(l).trigger.value?.contains(e.target) && e.preventDefault(), c("pointerDownOutside", e);
			},
			onFocusOutside: n[2] ||= u(() => {}, ["prevent"]),
			onDismiss: n[3] ||= (e) => g(l).onClose()
		}, {
			default: i(() => [o(g(R), e({
				ref: g(m),
				"data-state": g(l).stateAttribute.value
			}, {
				...t.$attrs,
				...x.value
			}, { style: {
				"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
				"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
				"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: i(() => [b(t.$slots, "default"), o(g(z), {
					id: g(l).contentId,
					role: "tooltip"
				}, {
					default: i(() => [y(f(v.value), 1)]),
					_: 1
				}, 8, ["id"])]),
				_: 3
			}, 16, ["data-state"])]),
			_: 3
		}));
	}
}), ne = /* @__PURE__ */ v({
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
	setup(t) {
		let n = k(t), { forwardRef: a, currentElement: o } = L(), { trigger: s, onClose: c } = Q(), l = J(), { isPointerInTransit: u, onPointerExit: d } = V(s, o);
		return l.isPointerInTransitRef = u, d(() => {
			c();
		}), (t, o) => (r(), _($, e({ ref: g(a) }, g(n)), {
			default: i(() => [b(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), re = /* @__PURE__ */ v({
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
	setup(n, { emit: a }) {
		let o = n, s = a, c = Q(), l = C(o, s), { forwardRef: u } = L();
		return (n, a) => (r(), _(g(B), { present: n.forceMount || g(c).open.value }, {
			default: i(() => [(r(), _(t(g(c).disableHoverableContent.value ? $ : ne), e({ ref: g(u) }, g(l)), {
				default: i(() => [b(n.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), ie = /* @__PURE__ */ v({
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
		return (e, a) => (r(), _(g(F), m(n(t)), {
			default: i(() => [b(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ae = /* @__PURE__ */ v({
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
		let n = t, s = Q(), l = J();
		s.contentId ||= j(void 0, "reka-tooltip-content");
		let { forwardRef: u, currentElement: f } = L(), m = p(!1), h = p(!1), v = d(() => s.disabled.value ? {} : {
			click: D,
			focus: T,
			pointermove: C,
			pointerleave: w,
			pointerdown: x,
			blur: E
		});
		a(() => {
			s.onTriggerChange(f.value);
		});
		function y() {
			setTimeout(() => {
				m.value = !1;
			}, 1);
		}
		function x() {
			s.open && !s.disableClosingTrigger.value && s.onClose(), m.value = !0, document.addEventListener("pointerup", y, { once: !0 });
		}
		function C(e) {
			e.pointerType !== "touch" && !h.value && !l.isPointerInTransitRef.value && (s.onTriggerEnter(), h.value = !0);
		}
		function w() {
			s.onTriggerLeave(), h.value = !1;
		}
		function T(e) {
			m.value || s.ignoreNonKeyboardFocus.value && !e.target.matches?.(":focus-visible") || s.onOpen();
		}
		function E() {
			s.onClose();
		}
		function D() {
			s.disableClosingTrigger.value || s.onClose();
		}
		return (t, a) => (r(), _(g(I), {
			"as-child": "",
			reference: t.reference
		}, {
			default: i(() => [o(g(S), e({
				ref: g(u),
				"aria-describedby": g(s).open.value ? g(s).contentId : void 0,
				"data-state": g(s).stateAttribute.value,
				as: t.as,
				"as-child": n.asChild,
				"data-grace-area-trigger": ""
			}, c(v.value)), {
				default: i(() => [b(t.$slots, "default")]),
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
export { X as a, te as i, ie as n, re as r, ae as t };

//# sourceMappingURL=TooltipTrigger-Cq_k30Ce.js.map