import { A as e, C as t, D as n, H as r, I as i, L as a, N as o, R as s, V as c, W as l, at as u, c as d, ct as f, dt as p, et as m, h, p as g, pt as _, v, x as y, y as b } from "./vue-i18n-DUz2Gjn8.js";
import { E as x, O as S, _ as C, c as w, i as T, j as E, m as D, n as O, o as k, s as A, t as j, u as M, v as N, w as ee } from "./Teleport-C7mDSUEl.js";
import { a as P, i as F, o as I, r as L, s as R, t as z } from "./PopperContent-a3U-C0mc.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function B(e, t) {
	let n = ee(!1, 300);
	x(() => {
		n.value = !1;
	});
	let i = m(null), a = N();
	function o() {
		i.value = null, n.value = !1;
	}
	function s(e, t) {
		if (!t) return;
		let r = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = H(a, V(a, r.getBoundingClientRect()), 1), s = U(t.getBoundingClientRect()), c = G([...o, ...s]);
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
				}, c = e.value?.contains(r) || t.value?.contains(r), l = !W(s, i.value), u = !!r.closest("[data-grace-area-trigger]");
				c ? o() : (l || u) && (o(), a.trigger());
			};
			e.value?.ownerDocument.addEventListener("pointermove", r), n(() => e.value?.ownerDocument.removeEventListener("pointermove", r));
		}
	}), {
		isPointerInTransit: n,
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
	setup(e) {
		let { delayDuration: t, skipDelayDuration: n, disableHoverableContent: r, disableClosingTrigger: a, ignoreNonKeyboardFocus: o, disabled: s, content: c } = u(e);
		w();
		let l = m(!0), d = m(!1), { start: f, stop: p } = S(() => {
			l.value = !0;
		}, n, { immediate: !1 });
		return J({
			isOpenDelayed: l,
			delayDuration: t,
			onOpen() {
				p(), l.value = !1;
			},
			onClose() {
				f();
			},
			isPointerInTransitRef: d,
			disableHoverableContent: r,
			disableClosingTrigger: a,
			disabled: s,
			ignoreNonKeyboardFocus: o,
			content: c
		}), (e, t) => i(e.$slots, "default");
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
	setup(e, { emit: t }) {
		let n = e, r = t;
		w();
		let a = q(), s = g(() => n.disableHoverableContent ?? a.disableHoverableContent.value), u = g(() => n.disableClosingTrigger ?? a.disableClosingTrigger.value), d = g(() => n.disabled ?? a.disabled.value), p = g(() => n.delayDuration ?? a.delayDuration.value), _ = g(() => n.ignoreNonKeyboardFocus ?? a.ignoreNonKeyboardFocus.value), v = C(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		c(v, (e) => {
			a.onClose && (e ? (a.onOpen(), document.dispatchEvent(new CustomEvent(X))) : a.onClose());
		});
		let y = m(!1), b = m(), x = g(() => v.value ? y.value ? "delayed-open" : "instant-open" : "closed"), { start: T, stop: E } = S(() => {
			y.value = !0, v.value = !0;
		}, p, { immediate: !1 });
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
				a.isOpenDelayed.value ? k() : D();
			},
			onTriggerLeave() {
				s.value ? O() : E();
			},
			onOpen: D,
			onClose: O,
			disableHoverableContent: s,
			disableClosingTrigger: u,
			disabled: d,
			ignoreNonKeyboardFocus: _
		}), (e, t) => (o(), h(f(F), null, {
			default: l(() => [i(e.$slots, "default", { open: f(v) })]),
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
	setup(t, { emit: r }) {
		let a = t, s = r, c = Z(), u = q(), { forwardRef: p, currentElement: m } = w(), y = g(() => a.ariaLabel || m.value?.textContent), x = g(() => {
			let { ariaLabel: e, ...t } = a;
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
		return e(() => {
			D(window, "scroll", (e) => {
				e.target?.contains(c.trigger.value) && c.onClose();
			}, { capture: !0 }), D(window, X, c.onClose);
		}), (e, t) => (o(), h(f(O), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: t[0] ||= (e) => s("escapeKeyDown", e),
			onPointerDownOutside: t[1] ||= (e) => {
				f(c).disableClosingTrigger.value && f(c).trigger.value?.contains(e.target) && e.preventDefault(), s("pointerDownOutside", e);
			},
			onFocusOutside: t[2] ||= d(() => {}, ["prevent"]),
			onDismiss: t[3] ||= (e) => f(c).onClose()
		}, {
			default: l(() => [b(f(z), n({
				ref: f(p),
				"data-state": f(c).stateAttribute.value
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
				default: l(() => [i(e.$slots, "default"), b(f(P), {
					id: f(c).contentId,
					role: "tooltip"
				}, {
					default: l(() => [v(_(y.value), 1)]),
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
		let t = R(e), { forwardRef: r, currentElement: a } = w(), { trigger: s, onClose: c } = Z(), u = q(), { isPointerInTransit: d, onPointerExit: p } = B(s, a);
		return u.isPointerInTransitRef = d, p(() => {
			c();
		}), (e, a) => (o(), h($, n({ ref: f(r) }, f(t)), {
			default: l(() => [i(e.$slots, "default")]),
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
		let r = e, s = t, c = Z(), u = I(r, s), { forwardRef: d } = w();
		return (e, t) => (o(), h(f(k), { present: e.forceMount || f(c).open.value }, {
			default: l(() => [(o(), h(a(f(c).disableHoverableContent.value ? $ : ne), n({ ref: f(d) }, f(u)), {
				default: l(() => [i(e.$slots, "default")]),
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
		let n = e;
		return (e, r) => (o(), h(f(j), p(t(n)), {
			default: l(() => [i(e.$slots, "default")]),
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
	setup(t) {
		let r = t, a = Z(), c = q();
		a.contentId ||= A(void 0, "reka-tooltip-content");
		let { forwardRef: u, currentElement: d } = w(), p = m(!1), _ = m(!1), v = g(() => a.disabled.value ? {} : {
			click: O,
			focus: E,
			pointermove: S,
			pointerleave: C,
			pointerdown: x,
			blur: D
		});
		e(() => {
			a.onTriggerChange(d.value);
		});
		function y() {
			setTimeout(() => {
				p.value = !1;
			}, 1);
		}
		function x() {
			a.open && !a.disableClosingTrigger.value && a.onClose(), p.value = !0, document.addEventListener("pointerup", y, { once: !0 });
		}
		function S(e) {
			e.pointerType !== "touch" && !_.value && !c.isPointerInTransitRef.value && (a.onTriggerEnter(), _.value = !0);
		}
		function C() {
			a.onTriggerLeave(), _.value = !1;
		}
		function E(e) {
			p.value || a.ignoreNonKeyboardFocus.value && !e.target.matches?.(":focus-visible") || a.onOpen();
		}
		function D() {
			a.onClose();
		}
		function O() {
			a.disableClosingTrigger.value || a.onClose();
		}
		return (e, t) => (o(), h(f(L), {
			"as-child": "",
			reference: e.reference
		}, {
			default: l(() => [b(f(T), n({
				ref: f(u),
				"aria-describedby": f(a).open.value ? f(a).contentId : void 0,
				"data-state": f(a).stateAttribute.value,
				as: e.as,
				"as-child": r.asChild,
				"data-grace-area-trigger": ""
			}, s(v.value)), {
				default: l(() => [i(e.$slots, "default")]),
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
