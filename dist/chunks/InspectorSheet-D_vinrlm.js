import { t as e } from "./shell.module-Bkh0ofYg.js";
import { G as t, I as n, J as r, N as i, P as a, S as o, _ as s, _t as c, b as l, d as u, ft as d, g as f, h as p, ht as m, it as h, k as g, lt as _, m as v, mt as y, n as b, ut as x, v as S, w as C, y as w, z as T } from "./vue-i18n-BQWz_HuU.js";
import { t as E } from "./AppIcon-B1iv8vRB.js";
import { t as D } from "./x-CZeKQbKW.js";
import { P as O, S as k, a as A, d as j, f as M, l as N, m as P, n as F, p as I, s as L, t as R, u as z, x as B, y as V } from "./Teleport-B2amidH8.js";
import { t as H } from "./use_portal_target-BZ79IssD.js";
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
var [Q, $] = /*#__PURE__*/ O("DrawerRoot"), ce = /* @__PURE__ */ o({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = h(r.defaultOpen), s = v({
			get: () => r.open ?? o.value,
			set: (e) => {
				o.value = e;
			}
		}), c = k(r, "snapPoint", i, {
			defaultValue: r.defaultSnapPoint ?? null,
			passive: r.snapPoint === void 0,
			eventName: "update:snapPoint"
		}), { modal: l, swipeDirection: u, snapPoints: d, snapToSequentialPoints: f } = _(r), p = h(), m = h(), g = h(0), y = h(0), b = h(!1), x = h(0), S = h(!1), C = h(!1), w = te(), E = Q(null), D = U(null), O = z(void 0, "reka-drawer-content"), A = z(void 0, "reka-drawer-title"), j = z(void 0, "reka-drawer-description");
		$({
			open: s,
			modal: l,
			swipeDirection: u,
			snapPoints: d,
			activeSnapPoint: c,
			snapToSequentialPoints: f,
			popupHeight: g,
			frontmostHeight: y,
			hasNestedDrawer: b,
			nestedOpenDrawerCount: x,
			nestedSwiping: S,
			isSwiping: C,
			nestedSwipeProgressStore: w,
			onOpenChange(e, t) {
				if (s.value === e) return;
				let n = t ? { reason: t } : void 0;
				o.value = e, i("update:open", e, n);
			},
			notifyOpenComplete(e) {
				i("update:openComplete", e);
			},
			setActiveSnapPoint(e) {
				c.value = e;
			},
			onPopupHeightChange(e) {
				g.value = e, D?.visualStateStore.set({ frontmostHeight: e });
			},
			onNestedFrontmostHeightChange(e) {
				y.value = e;
			},
			onNestedDrawerPresenceChange(e) {
				e ? x.value++ : x.value = Math.max(0, x.value - 1), b.value = x.value > 0, E?.notifyParentHasNestedDrawer?.(e);
			},
			onNestedSwipingChange(e) {
				S.value = e, E?.notifyParentSwipingChange?.(e);
			},
			onNestedSwipeProgressChange(e) {
				w.set(e), E?.notifyParentSwipeProgressChange?.(e), D?.visualStateStore.set({ swipeProgress: e });
			},
			onSwipingChange(e) {
				C.value = e;
			},
			notifyParentFrontmostHeight: E?.onNestedFrontmostHeightChange,
			notifyParentSwipingChange: E?.onNestedSwipingChange,
			notifyParentSwipeProgressChange: E?.onNestedSwipeProgressChange,
			notifyParentHasNestedDrawer: E?.onNestedDrawerPresenceChange,
			triggerElement: p,
			contentElement: m,
			contentId: O,
			titleId: A,
			descriptionId: j
		});
		function M() {
			s.value && (o.value = !1, i("update:open", !1, { reason: "close-press" }));
		}
		return t(s, (e) => {
			e ? D?.setDrawerOpen(O, !0) : D?.setDrawerOpen(O, !1);
		}, { immediate: !0 }), a(() => {
			D?.removeDrawer(O);
		}), (e, t) => T(e.$slots, "default", {
			open: s.value,
			close: M
		});
	}
}), le = .5, ue = 300, de = 4, fe = .5;
function pe(e, t, n) {
	let r = null;
	return typeof e == "number" ? r = e >= 0 && e <= 1 ? e * t : e : e.endsWith("rem") ? r = Number.parseFloat(e) * n : e.endsWith("px") && (r = Number.parseFloat(e)), r == null || !Number.isFinite(r) || r < 0 ? null : Math.round(r);
}
function me(e) {
	let { snapPoints: t, activeSnapPoint: n, popupHeight: r, viewportRef: i, onSnapPointChange: a } = e, o = h(typeof window < "u" ? window.innerHeight : 0), s = h(typeof document < "u" && Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
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
	let { elementRef: n, directions: r, movementCssVars: i, swipeThreshold: o, canStart: s, onDismiss: c, onProgress: l, onCancel: u, onSwipeStart: d, onRelease: f, onSwipingChange: p } = e, m = v(() => x(r).includes("up") || x(r).includes("down")), g = v(() => x(r).includes("left") || x(r).includes("right")), _ = v(() => x(r).includes("up")), y = v(() => x(r).includes("down")), b = v(() => x(r).includes("left")), S = v(() => x(r).includes("right")), C = h(!1), w = h(void 0), T = h({
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
		return typeof o == "function" ? Math.max(0, o({
			element: e,
			direction: t
		})) : typeof o == "number" ? o : he;
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
		e.style.setProperty(i.x, `${t}px`), e.style.setProperty(i.y, `${n}px`);
	}
	function K(e) {
		e.style.setProperty(i.x, "0px"), e.style.setProperty(i.y, "0px");
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
			y: m.value ? r(t, _.value, y.value) : n(t)
		};
	}
	function Y(e, t, i) {
		let a = t.x - E.x, o = t.y - E.y;
		if (A) {
			A = !1;
			let e = Math.abs(a), t = Math.abs(o);
			z = m.value && g.value ? e > t ? "horizontal" : "vertical" : m.value ? "vertical" : "horizontal";
		}
		let s = z === "vertical" ? 0 : a, c = z === "horizontal" ? 0 : o, u = x(r).find((e) => G(e, s, c) > 0);
		if (j && M) {
			if (!u) return;
			let e = G(u, t.x - M.x, t.y - M.y);
			if (Math.abs(e) < _e) return;
			j = !1, D = u, w.value = u, ee(!0), d?.();
		}
		if (!C.value) return;
		let f = D ?? x(r)[0], p = G(f, s, c);
		k || (O = Math.max(O, p), O > he / 2 && O - p > ge && (k = !0));
		let h = ne(s, c);
		T.value = {
			x: h.x,
			y: h.y
		}, te(e, h.x, h.y), W({
			x: h.x,
			y: h.y
		}, i);
		let _ = n.value;
		if (_) {
			let e = f === "up" || f === "down" ? F.height || _.offsetHeight : F.width || _.offsetWidth, t = U(_, f), n = Math.min(1, Math.max(0, p / (e + t)));
			n !== I && (I = n, l?.(n, {
				deltaX: h.x,
				deltaY: h.y,
				direction: f
			}));
		}
	}
	function X(e) {
		if (!C.value) {
			q();
			return;
		}
		let t = G(D ?? x(r)[0], T.value.x, T.value.y), n = U(e, D ?? x(r)[0]), i = performance.now(), a = (L ? i - L.time : Infinity) > ye ? {
			x: 0,
			y: 0
		} : R;
		if (f?.(a) !== !0) {
			let i = G(D ?? x(r)[0], a.x, a.y);
			!k && (t >= n || i > .3) ? (e.setAttribute("data-swipe-dismissed", ""), c?.()) : (K(e), u?.());
		}
		q();
	}
	function Z(t) {
		if (!x(e.enabled) || t.pointerType === "touch" || t.button !== 0 || s && !s() || t.target?.closest(be)) return;
		let r = n.value;
		if (r) {
			J(r, {
				x: t.clientX,
				y: t.clientY
			}), B = t.pointerId, H = !0;
			try {
				r.setPointerCapture(t.pointerId);
			} catch {}
		}
	}
	function re(e) {
		if (!H || e.pointerId !== B) return;
		let t = n.value;
		t && e.buttons & 1 && Y(t, {
			x: e.clientX,
			y: e.clientY
		}, e.timeStamp);
	}
	function ie(e) {
		if (!H || e.pointerId !== B) return;
		let t = n.value;
		t && X(t);
	}
	function oe(t) {
		if (!x(e.enabled) || s && !s()) return;
		let r = t.target;
		if (r?.closest(be)) return;
		let i = n.value;
		if (!i) return;
		if (!e.ignoreScrollableAncestors) {
			let e = xe(r, m.value ? "vertical" : "horizontal");
			e && (N = !0, P = e);
		}
		let a = t.touches[0];
		a && J(i, {
			x: a.clientX,
			y: a.clientY
		});
	}
	function se(e) {
		let t = n.value;
		if (!t || !j && !C.value) return;
		let r = e.touches[0];
		if (!r) return;
		let i = {
			x: r.clientX,
			y: r.clientY
		};
		if (N && j && P) {
			let e = i.x - E.x, t = i.y - E.y, n = Se(P, e, t, {
				hasVertical: m.value,
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
		Y(t, i, e.timeStamp), (a || C.value) && e.preventDefault();
	}
	function Q() {
		let e = n.value;
		e && X(e);
	}
	let $ = [];
	return t(() => n.value, (e) => {
		$.forEach((e) => e()), $.length = 0, e && $.push(V(e, "pointerdown", Z), V(e, "pointermove", re), V(e, "pointerup", ie), V(e, "pointercancel", ie), V(e, "touchstart", oe, { passive: !0 }), V(e, "touchmove", se, { passive: !1 }), V(e, "touchend", Q), V(e, "touchcancel", Q));
	}, { immediate: !0 }), a(() => {
		$.forEach((e) => e()), $.length = 0, q();
	}), {
		isSwiping: C,
		swipeDirection: w,
		dragOffset: T
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerContentImpl.js
var we = /* @__PURE__ */ o({
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
	setup(e, { emit: o }) {
		let s = e, c = o, u = Q(), { forwardRef: p, currentElement: m } = M();
		se();
		let { activeSnapPointOffset: h, snapToNearest: _ } = me({
			snapPoints: u.snapPoints,
			activeSnapPoint: u.activeSnapPoint,
			popupHeight: u.popupHeight,
			viewportRef: m,
			onSnapPointChange: (e) => {
				e === null ? u.onOpenChange(!1) : u.setActiveSnapPoint(e);
			}
		});
		function y() {
			let e = m.value;
			if (!e) return;
			let t = h.value;
			if (t != null) {
				let n = u.swipeDirection.value, r = n === "up" || n === "left" ? -t : t;
				e.style.setProperty(W.snapPointOffset, `${r}px`);
			} else e.style.setProperty(W.snapPointOffset, "0px");
		}
		t(h, y), B(m, ([e]) => {
			if (!e || u.hasNestedDrawer.value && u.popupHeight.value > 0) return;
			let t = e.contentRect.height;
			u.onPopupHeightChange(t), m.value?.style.setProperty(W.height, `${t}px`);
		}), t(() => u.frontmostHeight.value, (e) => {
			m.value?.style.setProperty(W.frontmostHeight, `${e}px`);
		});
		let b = v(() => (u.snapPoints.value?.length ?? 0) > 0), x = v(() => {
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
			enabled: v(() => u.open.value),
			elementRef: m,
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
				let t = m.value;
				if (t) {
					let n = u.swipeDirection.value, r = n === "left" || n === "right" ? t.offsetWidth : t.offsetHeight, i = n === "left" || n === "right" ? S.x : S.y, a = n === "left" || n === "right" ? e.x : e.y, o = re({
						direction: n,
						size: r,
						axisDelta: i,
						snapPointOffset: h.value ?? 0,
						releaseVelocity: a
					});
					o == null ? t.style.setProperty(W.swipeStrength, "1") : t.style.setProperty(W.swipeStrength, `${o}`);
				}
				if (b.value) {
					let n = u.swipeDirection.value, r = G(n, S.x, S.y);
					_(r, e, n, u.snapToSequentialPoints.value), t && (y(), t.style.setProperty(W.swipeMovementX, "0px"), t.style.setProperty(W.swipeMovementY, "0px"));
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
			E = "escape-key", c("escapeKeyDown", e);
		}
		function k(e) {
			if (C.value) {
				e.preventDefault();
				return;
			}
			E = "outside-press", c("pointerDownOutside", e);
		}
		function j(e) {
			if (C.value) {
				e.preventDefault();
				return;
			}
			c("focusOutside", e);
		}
		function N(e) {
			if (C.value) {
				e.preventDefault();
				return;
			}
			c("interactOutside", e);
		}
		let P;
		function I() {
			P?.(), P = void 0;
		}
		t(() => u.open.value, (e) => {
			I();
			let t = m.value;
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
		let L = v(() => {
			let e = {
				"data-state": u.open.value ? "open" : "closed",
				"data-swipe-direction": u.swipeDirection.value
			};
			return C.value && (e["data-swiping"] = ""), u.hasNestedDrawer.value && (e["data-nested-drawer-open"] = ""), e;
		});
		t(() => u.nestedOpenDrawerCount.value, (e) => {
			m.value?.style.setProperty(W.nestedDrawers, `${e}`);
		});
		let R;
		return i(() => {
			u.contentElement.value = m.value, u.notifyParentHasNestedDrawer?.(!0), m.value?.style.setProperty(W.nestedDrawers, `${u.nestedOpenDrawerCount.value}`), y(), R = u.nestedSwipeProgressStore.subscribe(() => {
				let e = u.nestedSwipeProgressStore.getSnapshot();
				m.value?.style.setProperty(W.swipeProgress, `${e}`);
			});
		}), a(() => {
			u.notifyParentHasNestedDrawer?.(!1), R?.(), I();
		}), (e, t) => (n(), f(d(F), {
			"as-child": "",
			loop: "",
			trapped: s.trapFocus,
			onMountAutoFocus: t[0] ||= (e) => c("openAutoFocus", e),
			onUnmountAutoFocus: t[1] ||= (e) => c("closeAutoFocus", e)
		}, {
			default: r(() => [l(d(A), g({
				id: d(u).contentId,
				ref: d(p),
				as: e.as,
				"as-child": e.asChild,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": d(u).descriptionId,
				"aria-labelledby": d(u).titleId
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
				default: r(() => [T(e.$slots, "default")]),
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
}), Te = /* @__PURE__ */ o({
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
		let i = e, a = t, o = Q(), s = I(a), { forwardRef: c, currentElement: l } = M(), u = h(!1), p = h(!1), m = v(() => o.modal.value === !0), _ = v(() => o.modal.value === "trap-focus"), y = v(() => (m.value || _.value) && o.open.value), b = v(() => m.value ? l.value : void 0);
		j(b);
		function x(e) {
			e.defaultPrevented || (u.value || o.triggerElement.value?.focus(), e.preventDefault()), u.value = !1, p.value = !1;
		}
		function S(e) {
			e.defaultPrevented || (u.value = !0, e.detail.originalEvent.type === "pointerdown" && (p.value = !0));
			let t = e.target;
			o.triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && p.value && e.preventDefault();
		}
		return (e, t) => (n(), f(d(N), { present: e.forceMount || d(o).open.value }, {
			default: r(() => [m.value ? (n(), f(we, g({
				key: 0,
				ref: d(c)
			}, {
				...i,
				...d(s),
				...e.$attrs
			}, {
				"trap-focus": y.value,
				"disable-outside-pointer-events": !0,
				onCloseAutoFocus: t[0] ||= (e) => {
					e.defaultPrevented || (e.preventDefault(), d(o).triggerElement.value?.focus());
				},
				onPointerDownOutside: t[1] ||= (e) => {
					let t = e.detail.originalEvent;
					(t.button === 2 || t.button === 0 && t.ctrlKey) && e.preventDefault();
				},
				onFocusOutside: t[2] ||= (e) => e.preventDefault()
			}), {
				default: r(() => [T(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"])) : (n(), f(we, g({
				key: 1,
				ref: d(c)
			}, {
				...i,
				...d(s),
				...e.$attrs
			}, {
				"trap-focus": y.value,
				"disable-outside-pointer-events": !1,
				onCloseAutoFocus: x,
				onInteractOutside: S
			}), {
				default: r(() => [T(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]))]),
			_: 3
		}, 8, ["present"]));
	}
}), Ee = /* @__PURE__ */ o({
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
		return (e, a) => (n(), f(d(L), g(t, { id: d(i).descriptionId }), {
			default: r(() => [T(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), De = /* @__PURE__ */ o({
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
		return (e, a) => (n(), f(d(L), g(t, {
			"aria-hidden": "true",
			"data-state": d(i).open.value ? "open" : "closed"
		}), {
			default: r(() => [T(e.$slots, "default")]),
			_: 3
		}, 16, ["data-state"]));
	}
}), Oe = /* @__PURE__ */ o({
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
		let i = Q(), a = P(i.open.value);
		t(() => i.open.value, (e) => {
			a.value = e;
		}, { immediate: !0 }), M();
		let o = v(() => {
			let e = {
				"data-state": i.open.value ? "open" : "closed",
				"data-swipe-direction": i.swipeDirection.value
			};
			return i.isSwiping.value && (e["data-swiping"] = ""), e;
		});
		return (e, t) => (n(), f(d(L), g({
			as: e.as,
			"as-child": e.asChild
		}, o.value, { style: {
			pointerEvents: "auto",
			userSelect: "none",
			[d(W).swipeProgress]: "0",
			[d(W).swipeStrength]: "1"
		} }), {
			default: r(() => [T(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"style"
		]));
	}
}), ke = /* @__PURE__ */ o({
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
		let t = Q(), i = !!t.notifyParentHasNestedDrawer, { forwardRef: a } = M();
		return (e, o) => d(t).modal.value && (!i || e.forceRender) ? (n(), f(d(N), {
			key: 0,
			present: e.forceMount || d(t).open.value
		}, {
			default: r(() => [l(Oe, g(e.$attrs, {
				ref: d(a),
				as: e.as,
				"as-child": e.asChild
			}), {
				default: r(() => [T(e.$slots, "default")]),
				_: 3
			}, 16, ["as", "as-child"])]),
			_: 3
		}, 8, ["present"])) : s("v-if", !0);
	}
}), Ae = /* @__PURE__ */ o({
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
		return (e, t) => (n(), f(d(R), m(C(e.$props)), {
			default: r(() => [T(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), je = /* @__PURE__ */ o({
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
		return M(), (e, a) => (n(), f(d(L), g(t, { id: d(i).titleId }), {
			default: r(() => [T(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Me = ["aria-label"], Ne = { class: "tc-tabular-nums" }, Pe = /* @__PURE__ */ o({
	__name: "InspectorSheet",
	props: {
		open: { type: Boolean },
		selection: {}
	},
	emits: ["update:open"],
	setup(i, { emit: a }) {
		let o = i, s = a, { t: m } = b(), h = H();
		function g() {
			s("update:open", !1);
		}
		function _(e) {
			let t = e.activeElement;
			return t?.shadowRoot ? _(t.shadowRoot) : t;
		}
		let x = null;
		t(() => o.open, (e) => {
			if (e) {
				let e = _(document);
				x = e instanceof HTMLElement ? e : null;
			}
		});
		function C(e) {
			e.preventDefault(), x?.focus(), x = null;
		}
		let T = v(() => o.selection ? m("common.inspector.selection.kind_gallery_record") : null), O = v(() => o.selection?.record_id ?? null);
		return (t, a) => (n(), f(d(ce), {
			open: i.open,
			modal: "",
			"swipe-direction": "down",
			"onUpdate:open": a[0] ||= (e) => s("update:open", e)
		}, {
			default: r(() => [l(d(Ae), { to: d(h) }, {
				default: r(() => [l(d(ke), { class: y(d(e).sheet_overlay) }, null, 8, ["class"]), l(d(Te), {
					class: y(d(e).sheet_content),
					"data-testid": "inspector-sheet",
					onCloseAutoFocus: C
				}, {
					default: r(() => [
						l(d(De), { class: y(d(e).sheet_handle) }, null, 8, ["class"]),
						l(d(je), { class: "tc-visually-hidden" }, {
							default: r(() => [w(c(d(m)("common.inspector.title")), 1)]),
							_: 1
						}),
						l(d(Ee), { class: "tc-visually-hidden" }, {
							default: r(() => [w(c(d(m)("common.inspector.empty_description")), 1)]),
							_: 1
						}),
						p("div", { class: y(d(e).sheet_header) }, [p("span", null, c(d(m)("common.inspector.title")), 1), p("button", {
							type: "button",
							class: y(["tc-interactive", d(e).icon_button]),
							"aria-label": d(m)("common.actions.close"),
							onClick: g
						}, [l(E, {
							icon: d(D),
							size: 18
						}, null, 8, ["icon"])], 10, Me)], 2),
						p("div", { class: y(d(e).sheet_body) }, [i.selection ? (n(), S(u, { key: 0 }, [p("p", { class: y(d(e).inspector_selection_kind) }, c(T.value), 3), p("dl", { class: y(d(e).inspector_selection) }, [p("div", null, [p("dt", null, c(d(m)("common.inspector.selection.id_label")), 1), p("dd", Ne, c(O.value), 1)])], 2)], 64)) : (n(), S(u, { key: 1 }, [p("p", null, c(d(m)("common.inspector.empty_title")), 1), p("p", null, c(d(m)("common.inspector.empty_description")), 1)], 64))], 2)
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
