import { t as e } from "./shell.module-Bkh0ofYg.js";
import { C as t, F as n, M as r, N as i, O as a, R as o, W as s, _ as c, ct as l, dt as u, g as d, gt as f, h as p, lt as m, m as h, mt as g, n as _, p as v, pt as y, q as b, rt as x, u as S, v as C, x as w, y as T } from "./vue-i18n-XoxYzLIP.js";
import { t as E } from "./AppIcon-DD754F_c.js";
import { t as D } from "./x-CyHrRl6n.js";
import { P as O, S as k, a as A, d as j, f as M, l as N, m as P, n as F, p as I, s as L, t as R, u as z, x as B, y as V } from "./Teleport-zHbQRGnp.js";
import { t as H } from "./use_portal_target-BjeZ76eT.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerProvider.js
var [U, ee] = /*#__PURE__*/ O("DrawerProvider"), W = {
	swipeMovementX: "--drawer-swipe-movement-x",
	swipeMovementY: "--drawer-swipe-movement-y",
	snapPointOffset: "--drawer-snap-point-offset",
	height: "--drawer-height",
	frontmostHeight: "--drawer-frontmost-height",
	swipeProgress: "--drawer-swipe-progress",
	swipeStrength: "--drawer-swipe-strength",
	nestedDrawers: "--nested-drawers"
};
function te() {
	let e = 0, t = /* @__PURE__ */ new Set();
	return {
		getSnapshot: () => e,
		subscribe(e) {
			return t.add(e), () => t.delete(e);
		},
		set(n) {
			n !== e && (e = n, t.forEach((e) => e()));
		}
	};
}
function G(e, t, n) {
	switch (e) {
		case "up": return -n;
		case "down": return n;
		case "left": return -t;
		case "right": return t;
		default: return 0;
	}
}
var K = .2, q = 4, J = 80, ne = 360, Y = .1, X = 1;
function Z(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function re(e) {
	let { direction: t, size: n, axisDelta: r, snapPointOffset: i, releaseVelocity: a } = e;
	if (!Number.isFinite(n) || n <= 0) return null;
	let o = 0;
	t === "down" || t === "right" ? o = i : (t === "up" || t === "left") && (o = -i);
	let s = o + r, c = t === "left" || t === "up" ? -s : s, l = Math.max(0, n - c);
	if (!Number.isFinite(l) || l <= 0) return null;
	let u = t === "left" || t === "up" ? -a : a;
	if (!Number.isFinite(u) || u <= K) return null;
	let d = Z(l / Z(u, K, q), J, ne);
	if (!Number.isFinite(d)) return null;
	let f = Z(Y + (d - J) / 280 * .9, Y, X);
	return !Number.isFinite(f) || f <= 0 ? null : f;
}
var ie = /matrix(?:3d)?\(([^)]+)\)/;
function ae(e) {
	let t = window.getComputedStyle(e).transform, n = 0, r = 0, i = 1;
	if (t && t !== "none") {
		let e = t.match(ie);
		if (e) {
			let t = e[1].split(", ").map(Number);
			t.length === 6 ? (n = t[4], r = t[5], i = Math.sqrt(t[0] * t[0] + t[1] * t[1])) : t.length === 16 && (n = t[12], r = t[13], i = t[0]);
		}
	}
	return {
		x: n,
		y: r,
		scale: i
	};
}
var oe = !1;
function se() {
	if (oe || typeof CSS > "u" || !CSS.registerProperty) return;
	let e = [
		W.swipeMovementX,
		W.swipeMovementY,
		W.snapPointOffset
	];
	for (let t of e) try {
		CSS.registerProperty({
			name: t,
			syntax: "<length>",
			inherits: !1,
			initialValue: "0px"
		});
	} catch {}
	let t = [{
		name: W.swipeProgress,
		initialValue: "0"
	}, {
		name: W.swipeStrength,
		initialValue: "1"
	}];
	for (let { name: e, initialValue: n } of t) try {
		CSS.registerProperty({
			name: e,
			syntax: "<number>",
			inherits: !1,
			initialValue: n
		});
	} catch {}
	oe = !0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerRoot.js
var [Q, $] = /*#__PURE__*/ O("DrawerRoot"), ce = /* @__PURE__ */ w({
	__name: "DrawerRoot",
	props: {
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		modal: {
			type: [Boolean, String],
			required: !1,
			default: !0
		},
		swipeDirection: {
			type: String,
			required: !1,
			default: "down"
		},
		snapPoints: {
			type: Array,
			required: !1,
			default: void 0
		},
		snapPoint: {
			type: [
				Number,
				String,
				null
			],
			required: !1,
			default: void 0
		},
		defaultSnapPoint: {
			type: [
				Number,
				String,
				null
			],
			required: !1,
			default: void 0
		},
		snapToSequentialPoints: {
			type: Boolean,
			required: !1,
			default: !1
		}
	},
	emits: [
		"update:open",
		"update:openComplete",
		"update:snapPoint"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = x(n.defaultOpen), c = v({
			get: () => n.open ?? a.value,
			set: (e) => {
				a.value = e;
			}
		}), u = k(n, "snapPoint", r, {
			defaultValue: n.defaultSnapPoint ?? null,
			passive: n.snapPoint === void 0,
			eventName: "update:snapPoint"
		}), { modal: d, swipeDirection: f, snapPoints: p, snapToSequentialPoints: m } = l(n), h = x(), g = x(), _ = x(0), y = x(0), b = x(!1), S = x(0), C = x(!1), w = x(!1), T = te(), E = Q(null), D = U(null), O = z(void 0, "reka-drawer-content"), A = z(void 0, "reka-drawer-title"), j = z(void 0, "reka-drawer-description");
		$({
			open: c,
			modal: d,
			swipeDirection: f,
			snapPoints: p,
			activeSnapPoint: u,
			snapToSequentialPoints: m,
			popupHeight: _,
			frontmostHeight: y,
			hasNestedDrawer: b,
			nestedOpenDrawerCount: S,
			nestedSwiping: C,
			isSwiping: w,
			nestedSwipeProgressStore: T,
			onOpenChange(e, t) {
				if (c.value === e) return;
				let n = t ? { reason: t } : void 0;
				a.value = e, r("update:open", e, n);
			},
			notifyOpenComplete(e) {
				r("update:openComplete", e);
			},
			setActiveSnapPoint(e) {
				u.value = e;
			},
			onPopupHeightChange(e) {
				_.value = e, D?.visualStateStore.set({ frontmostHeight: e });
			},
			onNestedFrontmostHeightChange(e) {
				y.value = e;
			},
			onNestedDrawerPresenceChange(e) {
				e ? S.value++ : S.value = Math.max(0, S.value - 1), b.value = S.value > 0, E?.notifyParentHasNestedDrawer?.(e);
			},
			onNestedSwipingChange(e) {
				C.value = e, E?.notifyParentSwipingChange?.(e);
			},
			onNestedSwipeProgressChange(e) {
				T.set(e), E?.notifyParentSwipeProgressChange?.(e), D?.visualStateStore.set({ swipeProgress: e });
			},
			onSwipingChange(e) {
				w.value = e;
			},
			notifyParentFrontmostHeight: E?.onNestedFrontmostHeightChange,
			notifyParentSwipingChange: E?.onNestedSwipingChange,
			notifyParentSwipeProgressChange: E?.onNestedSwipeProgressChange,
			notifyParentHasNestedDrawer: E?.onNestedDrawerPresenceChange,
			triggerElement: h,
			contentElement: g,
			contentId: O,
			titleId: A,
			descriptionId: j
		});
		function M() {
			c.value && (a.value = !1, r("update:open", !1, { reason: "close-press" }));
		}
		return s(c, (e) => {
			e ? D?.setDrawerOpen(O, !0) : D?.setDrawerOpen(O, !1);
		}, { immediate: !0 }), i(() => {
			D?.removeDrawer(O);
		}), (e, t) => o(e.$slots, "default", {
			open: c.value,
			close: M
		});
	}
}), le = .5, ue = 300, de = 4, fe = .5;
function pe(e, t, n) {
	let r = null;
	return typeof e == "number" ? r = e >= 0 && e <= 1 ? e * t : e : e.endsWith("rem") ? r = Number.parseFloat(e) * n : e.endsWith("px") && (r = Number.parseFloat(e)), r == null || !Number.isFinite(r) || r < 0 ? null : Math.round(r);
}
function me(e) {
	let { snapPoints: t, activeSnapPoint: n, popupHeight: r, viewportRef: i, onSnapPointChange: a } = e, o = x(typeof window < "u" ? window.innerHeight : 0), s = x(typeof document < "u" && Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
	typeof window < "u" && V(window, "resize", () => {
		o.value = window.innerHeight;
	});
	let c = v(() => {
		let e = t.value;
		if (!e || e.length === 0) return [];
		let n = o.value, i = s.value, a = r.value, c = [];
		for (let t of e) {
			let e = pe(t, n, i);
			if (e == null || c.some((t) => Math.abs(t.height - e) <= 1)) continue;
			let r = Math.min(e, Math.min(a, n));
			c.push({
				value: t,
				height: r,
				offset: Math.max(0, a - r)
			});
		}
		return c.sort((e, t) => e.height - t.height);
	});
	function l() {
		if (!n.value || c.value.length === 0) return;
		let e = pe(n.value, o.value, s.value);
		return c.value.find((t) => t.value === n.value || e != null && Math.abs(t.height - e) <= 1);
	}
	let u = v(() => l()?.offset ?? null);
	function d(e, t, i, o) {
		let s = c.value;
		if (s.length === 0) return;
		let u = r.value, d = i === "up" || i === "down" ? t.y : t.x, f = i === "up" || i === "left" ? -d : d, p = l(), m = p?.offset ?? 0, h = Math.max(0, Math.min(u, m + e)), g = h;
		Math.abs(f) >= le && (g = h + Math.max(-4, Math.min(de, f)) * ue);
		let _ = s[0], v = Math.abs(g - _.offset);
		for (let e of s) {
			let t = Math.abs(g - e.offset);
			t < v && (_ = e, v = t);
		}
		if (Math.abs(g - u) < v) {
			a(null);
			return;
		}
		if (o) {
			let t = [...s].sort((e, t) => e.offset - t.offset), r = p ? t.indexOf(p) : -1;
			if (r < 0) {
				a(_.value);
				return;
			}
			let i = Math.sign(e), o = Math.sign(f) === i && Math.abs(f) >= fe, c = t[Math.max(0, Math.min(t.length - 1, r + i))];
			if (o) {
				a(c.value);
				return;
			}
			let l = i > 0 ? g > c.offset : g < c.offset;
			a(l ? c.value : n.value ?? _.value);
			return;
		}
		a(_.value);
	}
	return {
		resolvedSnapPoints: c,
		activeSnapPointOffset: u,
		viewportHeight: o,
		snapToNearest: d
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/composables/useSwipeDismiss.js
var he = 40, ge = 10, _e = 1, ve = 16, ye = 80, be = "button,a,input,select,textarea,label,[role=\"button\"]";
function xe(e, t) {
	if (!e || e === document.body) return null;
	let n = window.getComputedStyle(e), r = t === "vertical" ? n.overflowY : n.overflowX;
	return (r === "auto" || r === "scroll") && (t === "vertical" ? e.scrollHeight > e.clientHeight : e.scrollWidth > e.clientWidth) ? e : xe(e.parentElement, t);
}
function Se(e, t, n, r) {
	let i = Math.abs(t), a = Math.abs(n);
	if (r.hasVertical && n !== 0 && (!r.hasHorizontal || a >= i)) {
		let t = Math.max(0, e.scrollHeight - e.clientHeight), i = e.scrollTop <= 0, a = e.scrollTop >= t, o = n > 0, s = n < 0, c = o && i && r.allowDown, l = s && a && r.allowUp;
		return c || l;
	}
	if (r.hasHorizontal && t !== 0 && (!r.hasVertical || i > a)) {
		let n = Math.max(0, e.scrollWidth - e.clientWidth), i = e.scrollLeft <= 0, a = e.scrollLeft >= n, o = t > 0, s = t < 0, c = o && i && r.allowRight, l = s && a && r.allowLeft;
		return c || l;
	}
	return null;
}
function Ce(e) {
	let { elementRef: t, directions: n, movementCssVars: r, swipeThreshold: a, canStart: o, onDismiss: c, onProgress: l, onCancel: u, onSwipeStart: d, onRelease: f, onSwipingChange: p } = e, h = v(() => m(n).includes("up") || m(n).includes("down")), g = v(() => m(n).includes("left") || m(n).includes("right")), _ = v(() => m(n).includes("up")), y = v(() => m(n).includes("down")), b = v(() => m(n).includes("left")), S = v(() => m(n).includes("right")), C = x(!1), w = x(void 0), T = x({
		x: 0,
		y: 0
	}), E = {
		x: 0,
		y: 0
	}, D, O = 0, k = !1, A = !1, j = !1, M = null, N = !1, P = null, F = {
		width: 0,
		height: 0
	}, I = 0, L = null, R = {
		x: 0,
		y: 0
	}, z = null, B = null, H = !1;
	function U(e, t) {
		return typeof a == "function" ? Math.max(0, a({
			element: e,
			direction: t
		})) : typeof a == "number" ? a : he;
	}
	function ee(e) {
		C.value !== e && (C.value = e, p?.(e));
	}
	function W(e, t) {
		if (L && t > L.time) {
			let n = Math.max(t - L.time, ve);
			R = {
				x: (e.x - L.x) / n,
				y: (e.y - L.y) / n
			};
		}
		L = {
			x: e.x,
			y: e.y,
			time: t
		};
	}
	function te(e, t, n) {
		e.style.setProperty(r.x, `${t}px`), e.style.setProperty(r.y, `${n}px`);
	}
	function K(e) {
		e.style.setProperty(r.x, "0px"), e.style.setProperty(r.y, "0px");
	}
	function q() {
		ee(!1), w.value = void 0, T.value = {
			x: 0,
			y: 0
		}, E = {
			x: 0,
			y: 0
		}, D = void 0, O = 0, k = !1, A = !1, j = !1, M = null, N = !1, P = null, F = {
			width: 0,
			height: 0
		}, I = 0, L = null, R = {
			x: 0,
			y: 0
		}, z = null, B = null, H = !1;
	}
	function J(e, t) {
		ae(e), E = t, M = t, F = {
			width: e.offsetWidth,
			height: e.offsetHeight
		}, A = !0, j = !0;
	}
	function ne(e, t) {
		let n = (e) => e >= 0 ? e ** .5 : -(Math.abs(e) ** .5), r = (e, t, r) => !t && e < 0 || !r && e > 0 ? n(e) : e;
		return {
			x: g.value ? r(e, b.value, S.value) : n(e),
			y: h.value ? r(t, _.value, y.value) : n(t)
		};
	}
	function Y(e, r, i) {
		let a = r.x - E.x, o = r.y - E.y;
		if (A) {
			A = !1;
			let e = Math.abs(a), t = Math.abs(o);
			z = h.value && g.value ? e > t ? "horizontal" : "vertical" : h.value ? "vertical" : "horizontal";
		}
		let s = z === "vertical" ? 0 : a, c = z === "horizontal" ? 0 : o, u = m(n).find((e) => G(e, s, c) > 0);
		if (j && M) {
			if (!u) return;
			let e = G(u, r.x - M.x, r.y - M.y);
			if (Math.abs(e) < _e) return;
			j = !1, D = u, w.value = u, ee(!0), d?.();
		}
		if (!C.value) return;
		let f = D ?? m(n)[0], p = G(f, s, c);
		k || (O = Math.max(O, p), O > he / 2 && O - p > ge && (k = !0));
		let _ = ne(s, c);
		T.value = {
			x: _.x,
			y: _.y
		}, te(e, _.x, _.y), W({
			x: _.x,
			y: _.y
		}, i);
		let v = t.value;
		if (v) {
			let e = f === "up" || f === "down" ? F.height || v.offsetHeight : F.width || v.offsetWidth, t = U(v, f), n = Math.min(1, Math.max(0, p / (e + t)));
			n !== I && (I = n, l?.(n, {
				deltaX: _.x,
				deltaY: _.y,
				direction: f
			}));
		}
	}
	function X(e) {
		if (!C.value) {
			q();
			return;
		}
		let t = G(D ?? m(n)[0], T.value.x, T.value.y), r = U(e, D ?? m(n)[0]), i = performance.now(), a = (L ? i - L.time : Infinity) > ye ? {
			x: 0,
			y: 0
		} : R;
		if (f?.(a) !== !0) {
			let i = G(D ?? m(n)[0], a.x, a.y);
			!k && (t >= r || i > .3) ? (e.setAttribute("data-swipe-dismissed", ""), c?.()) : (K(e), u?.());
		}
		q();
	}
	function Z(n) {
		if (!m(e.enabled) || n.pointerType === "touch" || n.button !== 0 || o && !o() || n.target?.closest(be)) return;
		let r = t.value;
		if (r) {
			J(r, {
				x: n.clientX,
				y: n.clientY
			}), B = n.pointerId, H = !0;
			try {
				r.setPointerCapture(n.pointerId);
			} catch {}
		}
	}
	function re(e) {
		if (!H || e.pointerId !== B) return;
		let n = t.value;
		n && e.buttons & 1 && Y(n, {
			x: e.clientX,
			y: e.clientY
		}, e.timeStamp);
	}
	function ie(e) {
		if (!H || e.pointerId !== B) return;
		let n = t.value;
		n && X(n);
	}
	function oe(n) {
		if (!m(e.enabled) || o && !o()) return;
		let r = n.target;
		if (r?.closest(be)) return;
		let i = t.value;
		if (!i) return;
		if (!e.ignoreScrollableAncestors) {
			let e = xe(r, h.value ? "vertical" : "horizontal");
			e && (N = !0, P = e);
		}
		let a = n.touches[0];
		a && J(i, {
			x: a.clientX,
			y: a.clientY
		});
	}
	function se(e) {
		let n = t.value;
		if (!n || !j && !C.value) return;
		let r = e.touches[0];
		if (!r) return;
		let i = {
			x: r.clientX,
			y: r.clientY
		};
		if (N && j && P) {
			let e = i.x - E.x, t = i.y - E.y, n = Se(P, e, t, {
				hasVertical: h.value,
				hasHorizontal: g.value,
				allowUp: _.value,
				allowDown: y.value,
				allowLeft: b.value,
				allowRight: S.value
			});
			if (n === !1) {
				q();
				return;
			}
			n === !0 && (N = !1, P = null);
		}
		let a = C.value;
		Y(n, i, e.timeStamp), (a || C.value) && e.preventDefault();
	}
	function Q() {
		let e = t.value;
		e && X(e);
	}
	let $ = [];
	return s(() => t.value, (e) => {
		$.forEach((e) => e()), $.length = 0, e && $.push(V(e, "pointerdown", Z), V(e, "pointermove", re), V(e, "pointerup", ie), V(e, "pointercancel", ie), V(e, "touchstart", oe, { passive: !0 }), V(e, "touchmove", se, { passive: !1 }), V(e, "touchend", Q), V(e, "touchcancel", Q));
	}, { immediate: !0 }), i(() => {
		$.forEach((e) => e()), $.length = 0, q();
	}), {
		isSwiping: C,
		swipeDirection: w,
		dragOffset: T
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerContentImpl.js
var we = /* @__PURE__ */ w({
	__name: "DrawerContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: !1
		},
		initialFocus: {
			type: [Boolean, null],
			required: !1,
			skipCheck: !0
		},
		finalFocus: {
			type: [Boolean, null],
			required: !1,
			skipCheck: !0
		},
		disableOutsidePointerEvents: {
			type: Boolean,
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
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let c = e, l = t, d = Q(), { forwardRef: f, currentElement: m } = M();
		se();
		let { activeSnapPointOffset: h, snapToNearest: g } = me({
			snapPoints: d.snapPoints,
			activeSnapPoint: d.activeSnapPoint,
			popupHeight: d.popupHeight,
			viewportRef: m,
			onSnapPointChange: (e) => {
				e === null ? d.onOpenChange(!1) : d.setActiveSnapPoint(e);
			}
		});
		function _() {
			let e = m.value;
			if (!e) return;
			let t = h.value;
			if (t != null) {
				let n = d.swipeDirection.value, r = n === "up" || n === "left" ? -t : t;
				e.style.setProperty(W.snapPointOffset, `${r}px`);
			} else e.style.setProperty(W.snapPointOffset, "0px");
		}
		s(h, _), B(m, ([e]) => {
			if (!e || d.hasNestedDrawer.value && d.popupHeight.value > 0) return;
			let t = e.contentRect.height;
			d.onPopupHeightChange(t), m.value?.style.setProperty(W.height, `${t}px`);
		}), s(() => d.frontmostHeight.value, (e) => {
			m.value?.style.setProperty(W.frontmostHeight, `${e}px`);
		});
		let y = v(() => (d.snapPoints.value?.length ?? 0) > 0), x = v(() => {
			let e = d.swipeDirection.value;
			return y.value ? [e, {
				up: "down",
				down: "up",
				left: "right",
				right: "left"
			}[e]] : [e];
		}), S = {
			x: 0,
			y: 0
		}, { isSwiping: C, dragOffset: w } = Ce({
			enabled: v(() => d.open.value),
			elementRef: m,
			directions: x,
			movementCssVars: {
				x: W.swipeMovementX,
				y: W.swipeMovementY
			},
			canStart: () => !d.nestedSwiping.value,
			onDismiss() {
				y.value || d.onOpenChange(!1, "swipe");
			},
			onRelease(e) {
				let t = m.value;
				if (t) {
					let n = d.swipeDirection.value, r = n === "left" || n === "right" ? t.offsetWidth : t.offsetHeight, i = n === "left" || n === "right" ? S.x : S.y, a = n === "left" || n === "right" ? e.x : e.y, o = re({
						direction: n,
						size: r,
						axisDelta: i,
						snapPointOffset: h.value ?? 0,
						releaseVelocity: a
					});
					o == null ? t.style.setProperty(W.swipeStrength, "1") : t.style.setProperty(W.swipeStrength, `${o}`);
				}
				if (y.value) {
					let n = d.swipeDirection.value, r = G(n, S.x, S.y);
					g(r, e, n, d.snapToSequentialPoints.value), t && (_(), t.style.setProperty(W.swipeMovementX, "0px"), t.style.setProperty(W.swipeMovementY, "0px"));
				}
				return y.value;
			},
			onSwipingChange(e) {
				d.onSwipingChange(e), d.onNestedSwipingChange(e);
			},
			onProgress(e, t) {
				t && (S = {
					x: t.deltaX,
					y: t.deltaY
				}), d.onNestedSwipeProgressChange(e);
			}
		}), E;
		function D() {
			C.value || (d.onOpenChange(!1, E ?? "outside-press"), E = void 0);
		}
		function O(e) {
			E = "escape-key", l("escapeKeyDown", e);
		}
		function k(e) {
			if (C.value) {
				e.preventDefault();
				return;
			}
			E = "outside-press", l("pointerDownOutside", e);
		}
		function j(e) {
			if (C.value) {
				e.preventDefault();
				return;
			}
			l("focusOutside", e);
		}
		function N(e) {
			if (C.value) {
				e.preventDefault();
				return;
			}
			l("interactOutside", e);
		}
		let P;
		function I() {
			P?.(), P = void 0;
		}
		s(() => d.open.value, (e) => {
			I();
			let t = m.value;
			if (!t) {
				d.notifyOpenComplete(e);
				return;
			}
			let n = (n) => {
				n.target === t && (I(), d.notifyOpenComplete(e));
			};
			t.addEventListener("transitionend", n), t.addEventListener("animationend", n), P = () => {
				t.removeEventListener("transitionend", n), t.removeEventListener("animationend", n);
			};
		});
		let L = v(() => {
			let e = {
				"data-state": d.open.value ? "open" : "closed",
				"data-swipe-direction": d.swipeDirection.value
			};
			return C.value && (e["data-swiping"] = ""), d.hasNestedDrawer.value && (e["data-nested-drawer-open"] = ""), e;
		});
		s(() => d.nestedOpenDrawerCount.value, (e) => {
			m.value?.style.setProperty(W.nestedDrawers, `${e}`);
		});
		let R;
		return r(() => {
			d.contentElement.value = m.value, d.notifyParentHasNestedDrawer?.(!0), m.value?.style.setProperty(W.nestedDrawers, `${d.nestedOpenDrawerCount.value}`), _(), R = d.nestedSwipeProgressStore.subscribe(() => {
				let e = d.nestedSwipeProgressStore.getSnapshot();
				m.value?.style.setProperty(W.swipeProgress, `${e}`);
			});
		}), i(() => {
			d.notifyParentHasNestedDrawer?.(!1), R?.(), I();
		}), (e, t) => (n(), p(u(F), {
			"as-child": "",
			loop: "",
			trapped: c.trapFocus,
			onMountAutoFocus: t[0] ||= (e) => l("openAutoFocus", e),
			onUnmountAutoFocus: t[1] ||= (e) => l("closeAutoFocus", e)
		}, {
			default: b(() => [T(u(A), a({
				id: u(d).contentId,
				ref: u(f),
				as: e.as,
				"as-child": e.asChild,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": u(d).descriptionId,
				"aria-labelledby": u(d).titleId
			}, {
				...L.value,
				...e.$attrs
			}, {
				onDismiss: D,
				onEscapeKeyDown: O,
				onFocusOutside: j,
				onInteractOutside: N,
				onPointerDownOutside: k
			}), {
				default: b(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"as",
				"as-child",
				"disable-outside-pointer-events",
				"aria-describedby",
				"aria-labelledby"
			])]),
			_: 3
		}, 8, ["trapped"]));
	}
}), Te = /* @__PURE__ */ w({
	__name: "DrawerContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		initialFocus: {
			type: [Boolean, null],
			required: !1,
			skipCheck: !0
		},
		finalFocus: {
			type: [Boolean, null],
			required: !1,
			skipCheck: !0
		},
		disableOutsidePointerEvents: {
			type: Boolean,
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
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let r = e, i = t, s = Q(), c = I(i), { forwardRef: l, currentElement: d } = M(), f = x(!1), m = x(!1), h = v(() => s.modal.value === !0), g = v(() => s.modal.value === "trap-focus"), _ = v(() => (h.value || g.value) && s.open.value), y = v(() => h.value ? d.value : void 0);
		j(y);
		function S(e) {
			e.defaultPrevented || (f.value || s.triggerElement.value?.focus(), e.preventDefault()), f.value = !1, m.value = !1;
		}
		function C(e) {
			e.defaultPrevented || (f.value = !0, e.detail.originalEvent.type === "pointerdown" && (m.value = !0));
			let t = e.target;
			s.triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && m.value && e.preventDefault();
		}
		return (e, t) => (n(), p(u(N), { present: e.forceMount || u(s).open.value }, {
			default: b(() => [h.value ? (n(), p(we, a({
				key: 0,
				ref: u(l)
			}, {
				...r,
				...u(c),
				...e.$attrs
			}, {
				"trap-focus": _.value,
				"disable-outside-pointer-events": !0,
				onCloseAutoFocus: t[0] ||= (e) => {
					e.defaultPrevented || (e.preventDefault(), u(s).triggerElement.value?.focus());
				},
				onPointerDownOutside: t[1] ||= (e) => {
					let t = e.detail.originalEvent;
					(t.button === 2 || t.button === 0 && t.ctrlKey) && e.preventDefault();
				},
				onFocusOutside: t[2] ||= (e) => e.preventDefault()
			}), {
				default: b(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"])) : (n(), p(we, a({
				key: 1,
				ref: u(l)
			}, {
				...r,
				...u(c),
				...e.$attrs
			}, {
				"trap-focus": _.value,
				"disable-outside-pointer-events": !1,
				onCloseAutoFocus: S,
				onInteractOutside: C
			}), {
				default: b(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]))]),
			_: 3
		}, 8, ["present"]));
	}
}), Ee = /* @__PURE__ */ w({
	__name: "DrawerDescription",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "p"
		}
	},
	setup(e) {
		let t = e;
		M();
		let r = Q();
		return (e, i) => (n(), p(u(L), a(t, { id: u(r).descriptionId }), {
			default: b(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), De = /* @__PURE__ */ w({
	__name: "DrawerHandle",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "div"
		}
	},
	setup(e) {
		let t = e;
		M();
		let r = Q();
		return (e, i) => (n(), p(u(L), a(t, {
			"aria-hidden": "true",
			"data-state": u(r).open.value ? "open" : "closed"
		}), {
			default: b(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["data-state"]));
	}
}), Oe = /* @__PURE__ */ w({
	__name: "DrawerOverlayImpl",
	props: {
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
		let t = Q(), r = P(t.open.value);
		s(() => t.open.value, (e) => {
			r.value = e;
		}, { immediate: !0 }), M();
		let i = v(() => {
			let e = {
				"data-state": t.open.value ? "open" : "closed",
				"data-swipe-direction": t.swipeDirection.value
			};
			return t.isSwiping.value && (e["data-swiping"] = ""), e;
		});
		return (e, t) => (n(), p(u(L), a({
			as: e.as,
			"as-child": e.asChild
		}, i.value, { style: {
			pointerEvents: "auto",
			userSelect: "none",
			[u(W).swipeProgress]: "0",
			[u(W).swipeStrength]: "1"
		} }), {
			default: b(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"style"
		]));
	}
}), ke = /* @__PURE__ */ w({
	__name: "DrawerOverlay",
	props: {
		forceMount: {
			type: Boolean,
			required: !1,
			default: !1
		},
		forceRender: {
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
	setup(e) {
		let t = Q(), r = !!t.notifyParentHasNestedDrawer, { forwardRef: i } = M();
		return (e, s) => u(t).modal.value && (!r || e.forceRender) ? (n(), p(u(N), {
			key: 0,
			present: e.forceMount || u(t).open.value
		}, {
			default: b(() => [T(Oe, a(e.$attrs, {
				ref: u(i),
				as: e.as,
				"as-child": e.asChild
			}), {
				default: b(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, ["as", "as-child"])]),
			_: 3
		}, 8, ["present"])) : d("v-if", !0);
	}
}), Ae = /* @__PURE__ */ w({
	__name: "DrawerPortal",
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
		return (e, r) => (n(), p(u(R), g(t(e.$props)), {
			default: b(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), je = /* @__PURE__ */ w({
	__name: "DrawerTitle",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "h2"
		}
	},
	setup(e) {
		let t = e, r = Q();
		return M(), (e, i) => (n(), p(u(L), a(t, { id: u(r).titleId }), {
			default: b(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Me = ["aria-label"], Ne = { class: "tc-tabular-nums" }, Pe = /* @__PURE__ */ w({
	__name: "InspectorSheet",
	props: {
		open: { type: Boolean },
		selection: {}
	},
	emits: ["update:open"],
	setup(t, { emit: r }) {
		let i = t, a = r, { t: o } = _(), l = H();
		function d() {
			a("update:open", !1);
		}
		function m(e) {
			let t = e.activeElement;
			return t?.shadowRoot ? m(t.shadowRoot) : t;
		}
		let g = null;
		s(() => i.open, (e) => {
			if (e) {
				let e = m(document);
				g = e instanceof HTMLElement ? e : null;
			}
		});
		function x(e) {
			e.preventDefault(), g?.focus(), g = null;
		}
		let w = v(() => i.selection ? o("common.inspector.selection.kind_gallery_record") : null), O = v(() => i.selection?.record_id ?? null);
		return (r, i) => (n(), p(u(ce), {
			open: t.open,
			modal: "",
			"swipe-direction": "down",
			"onUpdate:open": i[0] ||= (e) => a("update:open", e)
		}, {
			default: b(() => [T(u(Ae), { to: u(l) }, {
				default: b(() => [T(u(ke), { class: y(u(e).sheet_overlay) }, null, 8, ["class"]), T(u(Te), {
					class: y(u(e).sheet_content),
					"data-testid": "inspector-sheet",
					onCloseAutoFocus: x
				}, {
					default: b(() => [
						T(u(De), { class: y(u(e).sheet_handle) }, null, 8, ["class"]),
						T(u(je), { class: "tc-visually-hidden" }, {
							default: b(() => [C(f(u(o)("common.inspector.title")), 1)]),
							_: 1
						}),
						T(u(Ee), { class: "tc-visually-hidden" }, {
							default: b(() => [C(f(u(o)("common.inspector.empty_description")), 1)]),
							_: 1
						}),
						h("div", { class: y(u(e).sheet_header) }, [h("span", null, f(u(o)("common.inspector.title")), 1), h("button", {
							type: "button",
							class: y(["tc-interactive", u(e).icon_button]),
							"aria-label": u(o)("common.actions.close"),
							onClick: d
						}, [T(E, {
							icon: u(D),
							size: 18
						}, null, 8, ["icon"])], 10, Me)], 2),
						h("div", { class: y(u(e).sheet_body) }, [t.selection ? (n(), c(S, { key: 0 }, [h("p", { class: y(u(e).inspector_selection_kind) }, f(w.value), 3), h("dl", { class: y(u(e).inspector_selection) }, [h("div", null, [h("dt", null, f(u(o)("common.inspector.selection.id_label")), 1), h("dd", Ne, f(O.value), 1)])], 2)], 64)) : (n(), c(S, { key: 1 }, [h("p", null, f(u(o)("common.inspector.empty_title")), 1), h("p", null, f(u(o)("common.inspector.empty_description")), 1)], 64))], 2)
					]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 8, ["to"])]),
			_: 1
		}, 8, ["open"]));
	}
});
//#endregion
export { Pe as default };
