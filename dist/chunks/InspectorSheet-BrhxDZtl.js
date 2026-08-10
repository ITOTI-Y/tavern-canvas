import { t as e } from "./shell.module-vwMcpviy.js";
import { $ as t, A as n, B as r, C as i, D as a, I as o, N as s, U as c, _ as l, at as u, ft as d, g as f, h as p, it as m, j as h, lt as g, m as _, n as v, p as y, st as b, u as x, ut as S, v as C, x as w, y as T } from "./vue-i18n-D0uIxSJk.js";
import { t as E } from "./route_nav-DgPwdX5c.js";
import { t as D } from "./x-BB8D-Lda.js";
import { _ as O, c as k, g as A, i as j, j as M, l as N, m as P, n as F, o as I, s as L, t as R } from "./Teleport-CfSgxnHY.js";
import { a as z, i as B, t as V } from "./FocusScope-MQ_KQm08.js";
import { t as H } from "./use_portal_target-Bu49Bio9.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerProvider.js
var [U, ee] = /*#__PURE__*/ M("DrawerProvider"), W = {
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
var [Q, $] = /*#__PURE__*/ M("DrawerRoot"), ce = /* @__PURE__ */ w({
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
		let i = e, a = n, s = t(i.defaultOpen), c = y({
			get: () => i.open ?? s.value,
			set: (e) => {
				s.value = e;
			}
		}), l = O(i, "snapPoint", a, {
			defaultValue: i.defaultSnapPoint ?? null,
			passive: i.snapPoint === void 0,
			eventName: "update:snapPoint"
		}), { modal: u, swipeDirection: d, snapPoints: f, snapToSequentialPoints: p } = m(i), g = t(), _ = t(), v = t(0), b = t(0), x = t(!1), S = t(0), C = t(!1), w = t(!1), T = te(), E = Q(null), D = U(null), k = L(void 0, "reka-drawer-content"), A = L(void 0, "reka-drawer-title"), j = L(void 0, "reka-drawer-description");
		$({
			open: c,
			modal: u,
			swipeDirection: d,
			snapPoints: f,
			activeSnapPoint: l,
			snapToSequentialPoints: p,
			popupHeight: v,
			frontmostHeight: b,
			hasNestedDrawer: x,
			nestedOpenDrawerCount: S,
			nestedSwiping: C,
			isSwiping: w,
			nestedSwipeProgressStore: T,
			onOpenChange(e, t) {
				if (c.value === e) return;
				let n = t ? { reason: t } : void 0;
				s.value = e, a("update:open", e, n);
			},
			notifyOpenComplete(e) {
				a("update:openComplete", e);
			},
			setActiveSnapPoint(e) {
				l.value = e;
			},
			onPopupHeightChange(e) {
				v.value = e, D?.visualStateStore.set({ frontmostHeight: e });
			},
			onNestedFrontmostHeightChange(e) {
				b.value = e;
			},
			onNestedDrawerPresenceChange(e) {
				e ? S.value++ : S.value = Math.max(0, S.value - 1), x.value = S.value > 0, E?.notifyParentHasNestedDrawer?.(e);
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
			triggerElement: g,
			contentElement: _,
			contentId: k,
			titleId: A,
			descriptionId: j
		});
		function M() {
			c.value && (s.value = !1, a("update:open", !1, { reason: "close-press" }));
		}
		return r(c, (e) => {
			e ? D?.setDrawerOpen(k, !0) : D?.setDrawerOpen(k, !1);
		}, { immediate: !0 }), h(() => {
			D?.removeDrawer(k);
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
	let { snapPoints: n, activeSnapPoint: r, popupHeight: i, viewportRef: a, onSnapPointChange: o } = e, s = t(typeof window < "u" ? window.innerHeight : 0), c = t(typeof document < "u" && Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
	typeof window < "u" && P(window, "resize", () => {
		s.value = window.innerHeight;
	});
	let l = y(() => {
		let e = n.value;
		if (!e || e.length === 0) return [];
		let t = s.value, r = c.value, a = i.value, o = [];
		for (let n of e) {
			let e = pe(n, t, r);
			if (e == null || o.some((t) => Math.abs(t.height - e) <= 1)) continue;
			let i = Math.min(e, Math.min(a, t));
			o.push({
				value: n,
				height: i,
				offset: Math.max(0, a - i)
			});
		}
		return o.sort((e, t) => e.height - t.height);
	});
	function u() {
		if (!r.value || l.value.length === 0) return;
		let e = pe(r.value, s.value, c.value);
		return l.value.find((t) => t.value === r.value || e != null && Math.abs(t.height - e) <= 1);
	}
	let d = y(() => u()?.offset ?? null);
	function f(e, t, n, a) {
		let s = l.value;
		if (s.length === 0) return;
		let c = i.value, d = n === "up" || n === "down" ? t.y : t.x, f = n === "up" || n === "left" ? -d : d, p = u(), m = p?.offset ?? 0, h = Math.max(0, Math.min(c, m + e)), g = h;
		Math.abs(f) >= le && (g = h + Math.max(-4, Math.min(de, f)) * ue);
		let _ = s[0], v = Math.abs(g - _.offset);
		for (let e of s) {
			let t = Math.abs(g - e.offset);
			t < v && (_ = e, v = t);
		}
		if (Math.abs(g - c) < v) {
			o(null);
			return;
		}
		if (a) {
			let t = [...s].sort((e, t) => e.offset - t.offset), n = p ? t.indexOf(p) : -1;
			if (n < 0) {
				o(_.value);
				return;
			}
			let i = Math.sign(e), a = Math.sign(f) === i && Math.abs(f) >= fe, c = t[Math.max(0, Math.min(t.length - 1, n + i))];
			if (a) {
				o(c.value);
				return;
			}
			let l = i > 0 ? g > c.offset : g < c.offset;
			o(l ? c.value : r.value ?? _.value);
			return;
		}
		o(_.value);
	}
	return {
		resolvedSnapPoints: l,
		activeSnapPointOffset: d,
		viewportHeight: s,
		snapToNearest: f
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
	let { elementRef: n, directions: i, movementCssVars: a, swipeThreshold: o, canStart: s, onDismiss: c, onProgress: l, onCancel: d, onSwipeStart: f, onRelease: p, onSwipingChange: m } = e, g = y(() => u(i).includes("up") || u(i).includes("down")), _ = y(() => u(i).includes("left") || u(i).includes("right")), v = y(() => u(i).includes("up")), b = y(() => u(i).includes("down")), x = y(() => u(i).includes("left")), S = y(() => u(i).includes("right")), C = t(!1), w = t(void 0), T = t({
		x: 0,
		y: 0
	}), E = {
		x: 0,
		y: 0
	}, D, O = 0, k = !1, A = !1, j = !1, M = null, N = !1, F = null, I = {
		width: 0,
		height: 0
	}, L = 0, R = null, z = {
		x: 0,
		y: 0
	}, B = null, V = null, H = !1;
	function U(e, t) {
		return typeof o == "function" ? Math.max(0, o({
			element: e,
			direction: t
		})) : typeof o == "number" ? o : he;
	}
	function ee(e) {
		C.value !== e && (C.value = e, m?.(e));
	}
	function W(e, t) {
		if (R && t > R.time) {
			let n = Math.max(t - R.time, ve);
			z = {
				x: (e.x - R.x) / n,
				y: (e.y - R.y) / n
			};
		}
		R = {
			x: e.x,
			y: e.y,
			time: t
		};
	}
	function te(e, t, n) {
		e.style.setProperty(a.x, `${t}px`), e.style.setProperty(a.y, `${n}px`);
	}
	function K(e) {
		e.style.setProperty(a.x, "0px"), e.style.setProperty(a.y, "0px");
	}
	function q() {
		ee(!1), w.value = void 0, T.value = {
			x: 0,
			y: 0
		}, E = {
			x: 0,
			y: 0
		}, D = void 0, O = 0, k = !1, A = !1, j = !1, M = null, N = !1, F = null, I = {
			width: 0,
			height: 0
		}, L = 0, R = null, z = {
			x: 0,
			y: 0
		}, B = null, V = null, H = !1;
	}
	function J(e, t) {
		ae(e), E = t, M = t, I = {
			width: e.offsetWidth,
			height: e.offsetHeight
		}, A = !0, j = !0;
	}
	function ne(e, t) {
		let n = (e) => e >= 0 ? e ** .5 : -(Math.abs(e) ** .5), r = (e, t, r) => !t && e < 0 || !r && e > 0 ? n(e) : e;
		return {
			x: _.value ? r(e, x.value, S.value) : n(e),
			y: g.value ? r(t, v.value, b.value) : n(t)
		};
	}
	function Y(e, t, r) {
		let a = t.x - E.x, o = t.y - E.y;
		if (A) {
			A = !1;
			let e = Math.abs(a), t = Math.abs(o);
			B = g.value && _.value ? e > t ? "horizontal" : "vertical" : g.value ? "vertical" : "horizontal";
		}
		let s = B === "vertical" ? 0 : a, c = B === "horizontal" ? 0 : o, d = u(i).find((e) => G(e, s, c) > 0);
		if (j && M) {
			if (!d) return;
			let e = G(d, t.x - M.x, t.y - M.y);
			if (Math.abs(e) < _e) return;
			j = !1, D = d, w.value = d, ee(!0), f?.();
		}
		if (!C.value) return;
		let p = D ?? u(i)[0], m = G(p, s, c);
		k || (O = Math.max(O, m), O > he / 2 && O - m > ge && (k = !0));
		let h = ne(s, c);
		T.value = {
			x: h.x,
			y: h.y
		}, te(e, h.x, h.y), W({
			x: h.x,
			y: h.y
		}, r);
		let v = n.value;
		if (v) {
			let e = p === "up" || p === "down" ? I.height || v.offsetHeight : I.width || v.offsetWidth, t = U(v, p), n = Math.min(1, Math.max(0, m / (e + t)));
			n !== L && (L = n, l?.(n, {
				deltaX: h.x,
				deltaY: h.y,
				direction: p
			}));
		}
	}
	function X(e) {
		if (!C.value) {
			q();
			return;
		}
		let t = G(D ?? u(i)[0], T.value.x, T.value.y), n = U(e, D ?? u(i)[0]), r = performance.now(), a = (R ? r - R.time : Infinity) > ye ? {
			x: 0,
			y: 0
		} : z;
		if (p?.(a) !== !0) {
			let r = G(D ?? u(i)[0], a.x, a.y);
			!k && (t >= n || r > .3) ? (e.setAttribute("data-swipe-dismissed", ""), c?.()) : (K(e), d?.());
		}
		q();
	}
	function Z(t) {
		if (!u(e.enabled) || t.pointerType === "touch" || t.button !== 0 || s && !s() || t.target?.closest(be)) return;
		let r = n.value;
		if (r) {
			J(r, {
				x: t.clientX,
				y: t.clientY
			}), V = t.pointerId, H = !0;
			try {
				r.setPointerCapture(t.pointerId);
			} catch {}
		}
	}
	function re(e) {
		if (!H || e.pointerId !== V) return;
		let t = n.value;
		t && e.buttons & 1 && Y(t, {
			x: e.clientX,
			y: e.clientY
		}, e.timeStamp);
	}
	function ie(e) {
		if (!H || e.pointerId !== V) return;
		let t = n.value;
		t && X(t);
	}
	function oe(t) {
		if (!u(e.enabled) || s && !s()) return;
		let r = t.target;
		if (r?.closest(be)) return;
		let i = n.value;
		if (!i) return;
		if (!e.ignoreScrollableAncestors) {
			let e = xe(r, g.value ? "vertical" : "horizontal");
			e && (N = !0, F = e);
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
		if (N && j && F) {
			let e = i.x - E.x, t = i.y - E.y, n = Se(F, e, t, {
				hasVertical: g.value,
				hasHorizontal: _.value,
				allowUp: v.value,
				allowDown: b.value,
				allowLeft: x.value,
				allowRight: S.value
			});
			if (n === !1) {
				q();
				return;
			}
			n === !0 && (N = !1, F = null);
		}
		let a = C.value;
		Y(t, i, e.timeStamp), (a || C.value) && e.preventDefault();
	}
	function Q() {
		let e = n.value;
		e && X(e);
	}
	let $ = [];
	return r(() => n.value, (e) => {
		$.forEach((e) => e()), $.length = 0, e && $.push(P(e, "pointerdown", Z), P(e, "pointermove", re), P(e, "pointerup", ie), P(e, "pointercancel", ie), P(e, "touchstart", oe, { passive: !0 }), P(e, "touchmove", se, { passive: !1 }), P(e, "touchend", Q), P(e, "touchcancel", Q));
	}, { immediate: !0 }), h(() => {
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
		let i = e, l = t, u = Q(), { forwardRef: d, currentElement: f } = k();
		se();
		let { activeSnapPointOffset: m, snapToNearest: g } = me({
			snapPoints: u.snapPoints,
			activeSnapPoint: u.activeSnapPoint,
			popupHeight: u.popupHeight,
			viewportRef: f,
			onSnapPointChange: (e) => {
				e === null ? u.onOpenChange(!1) : u.setActiveSnapPoint(e);
			}
		});
		function _() {
			let e = f.value;
			if (!e) return;
			let t = m.value;
			if (t != null) {
				let n = u.swipeDirection.value, r = n === "up" || n === "left" ? -t : t;
				e.style.setProperty(W.snapPointOffset, `${r}px`);
			} else e.style.setProperty(W.snapPointOffset, "0px");
		}
		r(m, _), A(f, ([e]) => {
			if (!e || u.hasNestedDrawer.value && u.popupHeight.value > 0) return;
			let t = e.contentRect.height;
			u.onPopupHeightChange(t), f.value?.style.setProperty(W.height, `${t}px`);
		}), r(() => u.frontmostHeight.value, (e) => {
			f.value?.style.setProperty(W.frontmostHeight, `${e}px`);
		});
		let v = y(() => (u.snapPoints.value?.length ?? 0) > 0), x = y(() => {
			let e = u.swipeDirection.value;
			return v.value ? [e, {
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
			elementRef: f,
			directions: x,
			movementCssVars: {
				x: W.swipeMovementX,
				y: W.swipeMovementY
			},
			canStart: () => !u.nestedSwiping.value,
			onDismiss() {
				v.value || u.onOpenChange(!1, "swipe");
			},
			onRelease(e) {
				let t = f.value;
				if (t) {
					let n = u.swipeDirection.value, r = n === "left" || n === "right" ? t.offsetWidth : t.offsetHeight, i = n === "left" || n === "right" ? S.x : S.y, a = n === "left" || n === "right" ? e.x : e.y, o = re({
						direction: n,
						size: r,
						axisDelta: i,
						snapPointOffset: m.value ?? 0,
						releaseVelocity: a
					});
					o == null ? t.style.setProperty(W.swipeStrength, "1") : t.style.setProperty(W.swipeStrength, `${o}`);
				}
				if (v.value) {
					let n = u.swipeDirection.value, r = G(n, S.x, S.y);
					g(r, e, n, u.snapToSequentialPoints.value), t && (_(), t.style.setProperty(W.swipeMovementX, "0px"), t.style.setProperty(W.swipeMovementY, "0px"));
				}
				return v.value;
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
		function j(e) {
			if (C.value) {
				e.preventDefault();
				return;
			}
			E = "outside-press", l("pointerDownOutside", e);
		}
		function M(e) {
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
		r(() => u.open.value, (e) => {
			I();
			let t = f.value;
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
		r(() => u.nestedOpenDrawerCount.value, (e) => {
			f.value?.style.setProperty(W.nestedDrawers, `${e}`);
		});
		let R;
		return n(() => {
			u.contentElement.value = f.value, u.notifyParentHasNestedDrawer?.(!0), f.value?.style.setProperty(W.nestedDrawers, `${u.nestedOpenDrawerCount.value}`), _(), R = u.nestedSwipeProgressStore.subscribe(() => {
				let e = u.nestedSwipeProgressStore.getSnapshot();
				f.value?.style.setProperty(W.swipeProgress, `${e}`);
			});
		}), h(() => {
			u.notifyParentHasNestedDrawer?.(!1), R?.(), I();
		}), (e, t) => (s(), p(b(V), {
			"as-child": "",
			loop: "",
			trapped: i.trapFocus,
			onMountAutoFocus: t[0] ||= (e) => l("openAutoFocus", e),
			onUnmountAutoFocus: t[1] ||= (e) => l("closeAutoFocus", e)
		}, {
			default: c(() => [T(b(F), a({
				id: b(u).contentId,
				ref: b(d),
				as: e.as,
				"as-child": e.asChild,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": b(u).descriptionId,
				"aria-labelledby": b(u).titleId
			}, {
				...L.value,
				...e.$attrs
			}, {
				onDismiss: D,
				onEscapeKeyDown: O,
				onFocusOutside: M,
				onInteractOutside: N,
				onPointerDownOutside: j
			}), {
				default: c(() => [o(e.$slots, "default")]),
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
	setup(e, { emit: n }) {
		let r = e, i = n, l = Q(), u = N(i), { forwardRef: d, currentElement: f } = k(), m = t(!1), h = t(!1), g = y(() => l.modal.value === !0), _ = y(() => l.modal.value === "trap-focus"), v = y(() => (g.value || _.value) && l.open.value), x = y(() => g.value ? f.value : void 0);
		B(x);
		function S(e) {
			e.defaultPrevented || (m.value || l.triggerElement.value?.focus(), e.preventDefault()), m.value = !1, h.value = !1;
		}
		function C(e) {
			e.defaultPrevented || (m.value = !0, e.detail.originalEvent.type === "pointerdown" && (h.value = !0));
			let t = e.target;
			l.triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && h.value && e.preventDefault();
		}
		return (e, t) => (s(), p(b(I), { present: e.forceMount || b(l).open.value }, {
			default: c(() => [g.value ? (s(), p(we, a({
				key: 0,
				ref: b(d)
			}, {
				...r,
				...b(u),
				...e.$attrs
			}, {
				"trap-focus": v.value,
				"disable-outside-pointer-events": !0,
				onCloseAutoFocus: t[0] ||= (e) => {
					e.defaultPrevented || (e.preventDefault(), b(l).triggerElement.value?.focus());
				},
				onPointerDownOutside: t[1] ||= (e) => {
					let t = e.detail.originalEvent;
					(t.button === 2 || t.button === 0 && t.ctrlKey) && e.preventDefault();
				},
				onFocusOutside: t[2] ||= (e) => e.preventDefault()
			}), {
				default: c(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"])) : (s(), p(we, a({
				key: 1,
				ref: b(d)
			}, {
				...r,
				...b(u),
				...e.$attrs
			}, {
				"trap-focus": v.value,
				"disable-outside-pointer-events": !1,
				onCloseAutoFocus: S,
				onInteractOutside: C
			}), {
				default: c(() => [o(e.$slots, "default")]),
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
		k();
		let n = Q();
		return (e, r) => (s(), p(b(j), a(t, { id: b(n).descriptionId }), {
			default: c(() => [o(e.$slots, "default")]),
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
		k();
		let n = Q();
		return (e, r) => (s(), p(b(j), a(t, {
			"aria-hidden": "true",
			"data-state": b(n).open.value ? "open" : "closed"
		}), {
			default: c(() => [o(e.$slots, "default")]),
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
		let t = Q(), n = z(t.open.value);
		r(() => t.open.value, (e) => {
			n.value = e;
		}, { immediate: !0 }), k();
		let i = y(() => {
			let e = {
				"data-state": t.open.value ? "open" : "closed",
				"data-swipe-direction": t.swipeDirection.value
			};
			return t.isSwiping.value && (e["data-swiping"] = ""), e;
		});
		return (e, t) => (s(), p(b(j), a({
			as: e.as,
			"as-child": e.asChild
		}, i.value, { style: {
			pointerEvents: "auto",
			userSelect: "none",
			[b(W).swipeProgress]: "0",
			[b(W).swipeStrength]: "1"
		} }), {
			default: c(() => [o(e.$slots, "default")]),
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
		let t = Q(), n = !!t.notifyParentHasNestedDrawer, { forwardRef: r } = k();
		return (e, i) => b(t).modal.value && (!n || e.forceRender) ? (s(), p(b(I), {
			key: 0,
			present: e.forceMount || b(t).open.value
		}, {
			default: c(() => [T(Oe, a(e.$attrs, {
				ref: b(r),
				as: e.as,
				"as-child": e.asChild
			}), {
				default: c(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, ["as", "as-child"])]),
			_: 3
		}, 8, ["present"])) : f("v-if", !0);
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
		return (e, t) => (s(), p(b(R), S(i(e.$props)), {
			default: c(() => [o(e.$slots, "default")]),
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
		let t = e, n = Q();
		return k(), (e, r) => (s(), p(b(j), a(t, { id: b(n).titleId }), {
			default: c(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Me = ["aria-label"], Ne = { class: "tc-tabular-nums" }, Pe = { key: 0 }, Fe = /* @__PURE__ */ w({
	__name: "InspectorSheet",
	props: {
		open: { type: Boolean },
		selection: {}
	},
	emits: ["update:open"],
	setup(t, { emit: n }) {
		let i = t, a = n, { t: o } = v(), u = H();
		function m() {
			a("update:open", !1);
		}
		function h(e) {
			let t = e.activeElement;
			return t?.shadowRoot ? h(t.shadowRoot) : t;
		}
		let S = null;
		r(() => i.open, (e) => {
			if (e) {
				let e = h(document);
				S = e instanceof HTMLElement ? e : null;
			}
		});
		function w(e) {
			e.preventDefault(), S?.focus(), S = null;
		}
		let O = y(() => {
			let e = i.selection;
			return e ? e.kind === "generation_job" ? o("common.inspector.selection.kind_generation_job") : e.kind === "gallery_record" ? o("common.inspector.selection.kind_gallery_record") : o("common.inspector.selection.kind_asset") : null;
		}), k = y(() => {
			let e = i.selection;
			return e ? e.kind === "generation_job" ? e.job_id : e.kind === "gallery_record" ? e.record_id : e.asset_id : null;
		}), A = y(() => {
			let e = i.selection;
			if (e?.kind !== "gallery_record") return null;
			switch (e.intent) {
				case "modify_prompt": return o("common.inspector.selection.intent_modify_prompt");
				case "regenerate": return o("common.inspector.selection.intent_regenerate");
				case "edit": return o("common.inspector.selection.intent_edit");
				case "inpaint": return o("common.inspector.selection.intent_inpaint");
				default: return null;
			}
		});
		return (n, r) => (s(), p(b(ce), {
			open: t.open,
			modal: "",
			"swipe-direction": "down",
			"onUpdate:open": r[0] ||= (e) => a("update:open", e)
		}, {
			default: c(() => [T(b(Ae), { to: b(u) }, {
				default: c(() => [T(b(ke), { class: g(b(e).sheet_overlay) }, null, 8, ["class"]), T(b(Te), {
					class: g(b(e).sheet_content),
					"data-testid": "inspector-sheet",
					onCloseAutoFocus: w
				}, {
					default: c(() => [
						T(b(De), { class: g(b(e).sheet_handle) }, null, 8, ["class"]),
						T(b(je), { class: "tc-visually-hidden" }, {
							default: c(() => [C(d(b(o)("common.inspector.title")), 1)]),
							_: 1
						}),
						T(b(Ee), { class: "tc-visually-hidden" }, {
							default: c(() => [C(d(b(o)("common.inspector.empty_description")), 1)]),
							_: 1
						}),
						_("div", { class: g(b(e).sheet_header) }, [_("span", null, d(b(o)("common.inspector.title")), 1), _("button", {
							type: "button",
							class: g(["tc-interactive", b(e).icon_button]),
							"aria-label": b(o)("common.actions.close"),
							onClick: m
						}, [T(b(D), {
							size: 18,
							"stroke-width": b(E),
							"aria-hidden": "true"
						}, null, 8, ["stroke-width"])], 10, Me)], 2),
						_("div", { class: g(b(e).sheet_body) }, [t.selection ? (s(), l(x, { key: 0 }, [_("p", { class: g(b(e).inspector_selection_kind) }, d(O.value), 3), _("dl", { class: g(b(e).inspector_selection) }, [_("div", null, [_("dt", null, d(b(o)("common.inspector.selection.id_label")), 1), _("dd", Ne, d(k.value), 1)]), A.value ? (s(), l("div", Pe, [_("dt", null, d(b(o)("common.inspector.selection.action_label")), 1), _("dd", null, d(A.value), 1)])) : f("", !0)], 2)], 64)) : (s(), l(x, { key: 1 }, [_("p", null, d(b(o)("common.inspector.empty_title")), 1), _("p", null, d(b(o)("common.inspector.empty_description")), 1)], 64))], 2)
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
export { Fe as default };
