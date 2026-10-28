import { t as e } from "./shell.module-bsdu70fJ.js";
import { C as t, D as n, G as r, H as i, L as a, M as o, P as s, _ as c, dt as l, ft as u, g as d, h as f, j as p, lt as m, m as h, mt as g, n as _, ot as v, p as y, st as b, tt as x, u as S, v as C, x as w, y as T } from "./vue-i18n-L-BrQRnK.js";
import { t as E } from "./AppIcon-DkyxvN8k.js";
import { t as D } from "./x-D7Ry5i_D.js";
import { P as O, S as k, a as A, d as j, f as M, l as N, m as P, n as F, p as I, s as L, t as R, u as z, x as B, y as V } from "./Teleport-CquQcgiX.js";
import { t as H } from "./use_portal_target-RDZJMCu5.js";
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
		let n = e, r = t, s = x(n.defaultOpen), c = y({
			get: () => n.open ?? s.value,
			set: (e) => {
				s.value = e;
			}
		}), l = k(n, "snapPoint", r, {
			defaultValue: n.defaultSnapPoint ?? null,
			passive: n.snapPoint === void 0,
			eventName: "update:snapPoint"
		}), { modal: u, swipeDirection: d, snapPoints: f, snapToSequentialPoints: p } = v(n), m = x(), h = x(), g = x(0), _ = x(0), b = x(!1), S = x(0), C = x(!1), w = x(!1), T = te(), E = Q(null), D = U(null), O = z(void 0, "reka-drawer-content"), A = z(void 0, "reka-drawer-title"), j = z(void 0, "reka-drawer-description");
		$({
			open: c,
			modal: u,
			swipeDirection: d,
			snapPoints: f,
			activeSnapPoint: l,
			snapToSequentialPoints: p,
			popupHeight: g,
			frontmostHeight: _,
			hasNestedDrawer: b,
			nestedOpenDrawerCount: S,
			nestedSwiping: C,
			isSwiping: w,
			nestedSwipeProgressStore: T,
			onOpenChange(e, t) {
				if (c.value === e) return;
				let n = t ? { reason: t } : void 0;
				s.value = e, r("update:open", e, n);
			},
			notifyOpenComplete(e) {
				r("update:openComplete", e);
			},
			setActiveSnapPoint(e) {
				l.value = e;
			},
			onPopupHeightChange(e) {
				g.value = e, D?.visualStateStore.set({ frontmostHeight: e });
			},
			onNestedFrontmostHeightChange(e) {
				_.value = e;
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
			triggerElement: m,
			contentElement: h,
			contentId: O,
			titleId: A,
			descriptionId: j
		});
		function M() {
			c.value && (s.value = !1, r("update:open", !1, { reason: "close-press" }));
		}
		return i(c, (e) => {
			e ? D?.setDrawerOpen(O, !0) : D?.setDrawerOpen(O, !1);
		}, { immediate: !0 }), o(() => {
			D?.removeDrawer(O);
		}), (e, t) => a(e.$slots, "default", {
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
	let c = y(() => {
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
	let u = y(() => l()?.offset ?? null);
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
	let { elementRef: t, directions: n, movementCssVars: r, swipeThreshold: a, canStart: s, onDismiss: c, onProgress: l, onCancel: u, onSwipeStart: d, onRelease: f, onSwipingChange: p } = e, m = y(() => b(n).includes("up") || b(n).includes("down")), h = y(() => b(n).includes("left") || b(n).includes("right")), g = y(() => b(n).includes("up")), _ = y(() => b(n).includes("down")), v = y(() => b(n).includes("left")), S = y(() => b(n).includes("right")), C = x(!1), w = x(void 0), T = x({
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
			x: h.value ? r(e, v.value, S.value) : n(e),
			y: m.value ? r(t, g.value, _.value) : n(t)
		};
	}
	function Y(e, r, i) {
		let a = r.x - E.x, o = r.y - E.y;
		if (A) {
			A = !1;
			let e = Math.abs(a), t = Math.abs(o);
			z = m.value && h.value ? e > t ? "horizontal" : "vertical" : m.value ? "vertical" : "horizontal";
		}
		let s = z === "vertical" ? 0 : a, c = z === "horizontal" ? 0 : o, u = b(n).find((e) => G(e, s, c) > 0);
		if (j && M) {
			if (!u) return;
			let e = G(u, r.x - M.x, r.y - M.y);
			if (Math.abs(e) < _e) return;
			j = !1, D = u, w.value = u, ee(!0), d?.();
		}
		if (!C.value) return;
		let f = D ?? b(n)[0], p = G(f, s, c);
		k || (O = Math.max(O, p), O > he / 2 && O - p > ge && (k = !0));
		let g = ne(s, c);
		T.value = {
			x: g.x,
			y: g.y
		}, te(e, g.x, g.y), W({
			x: g.x,
			y: g.y
		}, i);
		let _ = t.value;
		if (_) {
			let e = f === "up" || f === "down" ? F.height || _.offsetHeight : F.width || _.offsetWidth, t = U(_, f), n = Math.min(1, Math.max(0, p / (e + t)));
			n !== I && (I = n, l?.(n, {
				deltaX: g.x,
				deltaY: g.y,
				direction: f
			}));
		}
	}
	function X(e) {
		if (!C.value) {
			q();
			return;
		}
		let t = G(D ?? b(n)[0], T.value.x, T.value.y), r = U(e, D ?? b(n)[0]), i = performance.now(), a = (L ? i - L.time : Infinity) > ye ? {
			x: 0,
			y: 0
		} : R;
		if (f?.(a) !== !0) {
			let i = G(D ?? b(n)[0], a.x, a.y);
			!k && (t >= r || i > .3) ? (e.setAttribute("data-swipe-dismissed", ""), c?.()) : (K(e), u?.());
		}
		q();
	}
	function Z(n) {
		if (!b(e.enabled) || n.pointerType === "touch" || n.button !== 0 || s && !s() || n.target?.closest(be)) return;
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
		if (!b(e.enabled) || s && !s()) return;
		let r = n.target;
		if (r?.closest(be)) return;
		let i = t.value;
		if (!i) return;
		if (!e.ignoreScrollableAncestors) {
			let e = xe(r, m.value ? "vertical" : "horizontal");
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
				hasVertical: m.value,
				hasHorizontal: h.value,
				allowUp: g.value,
				allowDown: _.value,
				allowLeft: v.value,
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
	return i(() => t.value, (e) => {
		$.forEach((e) => e()), $.length = 0, e && $.push(V(e, "pointerdown", Z), V(e, "pointermove", re), V(e, "pointerup", ie), V(e, "pointercancel", ie), V(e, "touchstart", oe, { passive: !0 }), V(e, "touchmove", se, { passive: !1 }), V(e, "touchend", Q), V(e, "touchcancel", Q));
	}, { immediate: !0 }), o(() => {
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
		let c = e, l = t, u = Q(), { forwardRef: d, currentElement: h } = M();
		se();
		let { activeSnapPointOffset: g, snapToNearest: _ } = me({
			snapPoints: u.snapPoints,
			activeSnapPoint: u.activeSnapPoint,
			popupHeight: u.popupHeight,
			viewportRef: h,
			onSnapPointChange: (e) => {
				e === null ? u.onOpenChange(!1) : u.setActiveSnapPoint(e);
			}
		});
		function v() {
			let e = h.value;
			if (!e) return;
			let t = g.value;
			if (t != null) {
				let n = u.swipeDirection.value, r = n === "up" || n === "left" ? -t : t;
				e.style.setProperty(W.snapPointOffset, `${r}px`);
			} else e.style.setProperty(W.snapPointOffset, "0px");
		}
		i(g, v), B(h, ([e]) => {
			if (!e || u.hasNestedDrawer.value && u.popupHeight.value > 0) return;
			let t = e.contentRect.height;
			u.onPopupHeightChange(t), h.value?.style.setProperty(W.height, `${t}px`);
		}), i(() => u.frontmostHeight.value, (e) => {
			h.value?.style.setProperty(W.frontmostHeight, `${e}px`);
		});
		let b = y(() => (u.snapPoints.value?.length ?? 0) > 0), x = y(() => {
			let e = u.swipeDirection.value;
			return b.value ? [e, {
				up: "down",
				down: "up",
				left: "right",
				right: "left"
			}[e]] : [e];
		}), S = {
			x: 0,
			y: 0
		}, { isSwiping: C, dragOffset: w } = Ce({
			enabled: y(() => u.open.value),
			elementRef: h,
			directions: x,
			movementCssVars: {
				x: W.swipeMovementX,
				y: W.swipeMovementY
			},
			canStart: () => !u.nestedSwiping.value,
			onDismiss() {
				b.value || u.onOpenChange(!1, "swipe");
			},
			onRelease(e) {
				let t = h.value;
				if (t) {
					let n = u.swipeDirection.value, r = n === "left" || n === "right" ? t.offsetWidth : t.offsetHeight, i = n === "left" || n === "right" ? S.x : S.y, a = n === "left" || n === "right" ? e.x : e.y, o = re({
						direction: n,
						size: r,
						axisDelta: i,
						snapPointOffset: g.value ?? 0,
						releaseVelocity: a
					});
					o == null ? t.style.setProperty(W.swipeStrength, "1") : t.style.setProperty(W.swipeStrength, `${o}`);
				}
				if (b.value) {
					let n = u.swipeDirection.value, r = G(n, S.x, S.y);
					_(r, e, n, u.snapToSequentialPoints.value), t && (v(), t.style.setProperty(W.swipeMovementX, "0px"), t.style.setProperty(W.swipeMovementY, "0px"));
				}
				return b.value;
			},
			onSwipingChange(e) {
				u.onSwipingChange(e), u.onNestedSwipingChange(e);
			},
			onProgress(e, t) {
				t && (S = {
					x: t.deltaX,
					y: t.deltaY
				}), u.onNestedSwipeProgressChange(e);
			}
		}), E;
		function D() {
			C.value || (u.onOpenChange(!1, E ?? "outside-press"), E = void 0);
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
		i(() => u.open.value, (e) => {
			I();
			let t = h.value;
			if (!t) {
				u.notifyOpenComplete(e);
				return;
			}
			let n = (n) => {
				n.target === t && (I(), u.notifyOpenComplete(e));
			};
			t.addEventListener("transitionend", n), t.addEventListener("animationend", n), P = () => {
				t.removeEventListener("transitionend", n), t.removeEventListener("animationend", n);
			};
		});
		let L = y(() => {
			let e = {
				"data-state": u.open.value ? "open" : "closed",
				"data-swipe-direction": u.swipeDirection.value
			};
			return C.value && (e["data-swiping"] = ""), u.hasNestedDrawer.value && (e["data-nested-drawer-open"] = ""), e;
		});
		i(() => u.nestedOpenDrawerCount.value, (e) => {
			h.value?.style.setProperty(W.nestedDrawers, `${e}`);
		});
		let R;
		return p(() => {
			u.contentElement.value = h.value, u.notifyParentHasNestedDrawer?.(!0), h.value?.style.setProperty(W.nestedDrawers, `${u.nestedOpenDrawerCount.value}`), v(), R = u.nestedSwipeProgressStore.subscribe(() => {
				let e = u.nestedSwipeProgressStore.getSnapshot();
				h.value?.style.setProperty(W.swipeProgress, `${e}`);
			});
		}), o(() => {
			u.notifyParentHasNestedDrawer?.(!1), R?.(), I();
		}), (e, t) => (s(), f(m(F), {
			"as-child": "",
			loop: "",
			trapped: c.trapFocus,
			onMountAutoFocus: t[0] ||= (e) => l("openAutoFocus", e),
			onUnmountAutoFocus: t[1] ||= (e) => l("closeAutoFocus", e)
		}, {
			default: r(() => [T(m(A), n({
				id: m(u).contentId,
				ref: m(d),
				as: e.as,
				"as-child": e.asChild,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": m(u).descriptionId,
				"aria-labelledby": m(u).titleId
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
				default: r(() => [a(e.$slots, "default")]),
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
		let i = e, o = t, c = Q(), l = I(o), { forwardRef: u, currentElement: d } = M(), p = x(!1), h = x(!1), g = y(() => c.modal.value === !0), _ = y(() => c.modal.value === "trap-focus"), v = y(() => (g.value || _.value) && c.open.value), b = y(() => g.value ? d.value : void 0);
		j(b);
		function S(e) {
			e.defaultPrevented || (p.value || c.triggerElement.value?.focus(), e.preventDefault()), p.value = !1, h.value = !1;
		}
		function C(e) {
			e.defaultPrevented || (p.value = !0, e.detail.originalEvent.type === "pointerdown" && (h.value = !0));
			let t = e.target;
			c.triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && h.value && e.preventDefault();
		}
		return (e, t) => (s(), f(m(N), { present: e.forceMount || m(c).open.value }, {
			default: r(() => [g.value ? (s(), f(we, n({
				key: 0,
				ref: m(u)
			}, {
				...i,
				...m(l),
				...e.$attrs
			}, {
				"trap-focus": v.value,
				"disable-outside-pointer-events": !0,
				onCloseAutoFocus: t[0] ||= (e) => {
					e.defaultPrevented || (e.preventDefault(), m(c).triggerElement.value?.focus());
				},
				onPointerDownOutside: t[1] ||= (e) => {
					let t = e.detail.originalEvent;
					(t.button === 2 || t.button === 0 && t.ctrlKey) && e.preventDefault();
				},
				onFocusOutside: t[2] ||= (e) => e.preventDefault()
			}), {
				default: r(() => [a(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"])) : (s(), f(we, n({
				key: 1,
				ref: m(u)
			}, {
				...i,
				...m(l),
				...e.$attrs
			}, {
				"trap-focus": v.value,
				"disable-outside-pointer-events": !1,
				onCloseAutoFocus: S,
				onInteractOutside: C
			}), {
				default: r(() => [a(e.$slots, "default")]),
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
		let i = Q();
		return (e, o) => (s(), f(m(L), n(t, { id: m(i).descriptionId }), {
			default: r(() => [a(e.$slots, "default")]),
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
		let i = Q();
		return (e, o) => (s(), f(m(L), n(t, {
			"aria-hidden": "true",
			"data-state": m(i).open.value ? "open" : "closed"
		}), {
			default: r(() => [a(e.$slots, "default")]),
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
		let t = Q(), o = P(t.open.value);
		i(() => t.open.value, (e) => {
			o.value = e;
		}, { immediate: !0 }), M();
		let c = y(() => {
			let e = {
				"data-state": t.open.value ? "open" : "closed",
				"data-swipe-direction": t.swipeDirection.value
			};
			return t.isSwiping.value && (e["data-swiping"] = ""), e;
		});
		return (e, t) => (s(), f(m(L), n({
			as: e.as,
			"as-child": e.asChild
		}, c.value, { style: {
			pointerEvents: "auto",
			userSelect: "none",
			[m(W).swipeProgress]: "0",
			[m(W).swipeStrength]: "1"
		} }), {
			default: r(() => [a(e.$slots, "default")]),
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
		let t = Q(), i = !!t.notifyParentHasNestedDrawer, { forwardRef: o } = M();
		return (e, c) => m(t).modal.value && (!i || e.forceRender) ? (s(), f(m(N), {
			key: 0,
			present: e.forceMount || m(t).open.value
		}, {
			default: r(() => [T(Oe, n(e.$attrs, {
				ref: m(o),
				as: e.as,
				"as-child": e.asChild
			}), {
				default: r(() => [a(e.$slots, "default")]),
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
		return (e, n) => (s(), f(m(R), u(t(e.$props)), {
			default: r(() => [a(e.$slots, "default")]),
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
		let t = e, i = Q();
		return M(), (e, o) => (s(), f(m(L), n(t, { id: m(i).titleId }), {
			default: r(() => [a(e.$slots, "default")]),
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
	setup(t, { emit: n }) {
		let a = t, o = n, { t: u } = _(), d = H();
		function p() {
			o("update:open", !1);
		}
		function v(e) {
			let t = e.activeElement;
			return t?.shadowRoot ? v(t.shadowRoot) : t;
		}
		let b = null;
		i(() => a.open, (e) => {
			if (e) {
				let e = v(document);
				b = e instanceof HTMLElement ? e : null;
			}
		});
		function x(e) {
			e.preventDefault(), b?.focus(), b = null;
		}
		let w = y(() => a.selection ? u("common.inspector.selection.kind_gallery_record") : null), O = y(() => a.selection?.record_id ?? null);
		return (n, i) => (s(), f(m(ce), {
			open: t.open,
			modal: "",
			"swipe-direction": "down",
			"onUpdate:open": i[0] ||= (e) => o("update:open", e)
		}, {
			default: r(() => [T(m(Ae), { to: m(d) }, {
				default: r(() => [T(m(ke), { class: l(m(e).sheet_overlay) }, null, 8, ["class"]), T(m(Te), {
					class: l(m(e).sheet_content),
					"data-testid": "inspector-sheet",
					onCloseAutoFocus: x
				}, {
					default: r(() => [
						T(m(De), { class: l(m(e).sheet_handle) }, null, 8, ["class"]),
						T(m(je), { class: "tc-visually-hidden" }, {
							default: r(() => [C(g(m(u)("common.inspector.title")), 1)]),
							_: 1
						}),
						T(m(Ee), { class: "tc-visually-hidden" }, {
							default: r(() => [C(g(m(u)("common.inspector.empty_description")), 1)]),
							_: 1
						}),
						h("div", { class: l(m(e).sheet_header) }, [h("span", null, g(m(u)("common.inspector.title")), 1), h("button", {
							type: "button",
							class: l(["tc-interactive", m(e).icon_button]),
							"aria-label": m(u)("common.actions.close"),
							onClick: p
						}, [T(E, {
							icon: m(D),
							size: 18
						}, null, 8, ["icon"])], 10, Me)], 2),
						h("div", { class: l(m(e).sheet_body) }, [t.selection ? (s(), c(S, { key: 0 }, [h("p", { class: l(m(e).inspector_selection_kind) }, g(w.value), 3), h("dl", { class: l(m(e).inspector_selection) }, [h("div", null, [h("dt", null, g(m(u)("common.inspector.selection.id_label")), 1), h("dd", Ne, g(O.value), 1)])], 2)], 64)) : (s(), c(S, { key: 1 }, [h("p", null, g(m(u)("common.inspector.empty_title")), 1), h("p", null, g(m(u)("common.inspector.empty_description")), 1)], 64))], 2)
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
