import { $ as e, A as t, B as n, C as r, D as i, I as a, N as o, U as s, _ as c, at as l, ft as u, g as d, h as f, it as p, j as m, lt as h, m as g, n as _, p as v, st as y, u as b, ut as x, v as S, x as C, y as w } from "./vue-i18n-CmRk7RjK.js";
import { t as T } from "./shell.module-vwMcpviy.js";
import { t as E } from "./route_nav-CAxsCBUg.js";
import { t as D } from "./x-Cb9a7voE.js";
import { _ as O, c as k, g as A, i as j, j as M, l as N, m as P, n as F, o as I, s as L, t as R } from "./Teleport-abGLK5Wv.js";
import { a as z, i as B, t as V } from "./FocusScope-DrI3mUpj.js";
import { t as H } from "./use_portal_target-r_aUtBuc.js";
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
var [Q, $] = /*#__PURE__*/ M("DrawerRoot"), ce = /* @__PURE__ */ C({
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
	setup(t, { emit: r }) {
		let i = t, o = r, s = e(i.defaultOpen), c = v({
			get: () => i.open ?? s.value,
			set: (e) => {
				s.value = e;
			}
		}), l = O(i, "snapPoint", o, {
			defaultValue: i.defaultSnapPoint ?? null,
			passive: i.snapPoint === void 0,
			eventName: "update:snapPoint"
		}), { modal: u, swipeDirection: d, snapPoints: f, snapToSequentialPoints: h } = p(i), g = e(), _ = e(), y = e(0), b = e(0), x = e(!1), S = e(0), C = e(!1), w = e(!1), T = te(), E = Q(null), D = U(null), k = L(void 0, "reka-drawer-content"), A = L(void 0, "reka-drawer-title"), j = L(void 0, "reka-drawer-description");
		$({
			open: c,
			modal: u,
			swipeDirection: d,
			snapPoints: f,
			activeSnapPoint: l,
			snapToSequentialPoints: h,
			popupHeight: y,
			frontmostHeight: b,
			hasNestedDrawer: x,
			nestedOpenDrawerCount: S,
			nestedSwiping: C,
			isSwiping: w,
			nestedSwipeProgressStore: T,
			onOpenChange(e, t) {
				if (c.value === e) return;
				let n = t ? { reason: t } : void 0;
				s.value = e, o("update:open", e, n);
			},
			notifyOpenComplete(e) {
				o("update:openComplete", e);
			},
			setActiveSnapPoint(e) {
				l.value = e;
			},
			onPopupHeightChange(e) {
				y.value = e, D?.visualStateStore.set({ frontmostHeight: e });
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
			c.value && (s.value = !1, o("update:open", !1, { reason: "close-press" }));
		}
		return n(c, (e) => {
			e ? D?.setDrawerOpen(k, !0) : D?.setDrawerOpen(k, !1);
		}, { immediate: !0 }), m(() => {
			D?.removeDrawer(k);
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
function me(t) {
	let { snapPoints: n, activeSnapPoint: r, popupHeight: i, viewportRef: a, onSnapPointChange: o } = t, s = e(typeof window < "u" ? window.innerHeight : 0), c = e(typeof document < "u" && Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
	typeof window < "u" && P(window, "resize", () => {
		s.value = window.innerHeight;
	});
	let l = v(() => {
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
	let d = v(() => u()?.offset ?? null);
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
function Ce(t) {
	let { elementRef: r, directions: i, movementCssVars: a, swipeThreshold: o, canStart: s, onDismiss: c, onProgress: u, onCancel: d, onSwipeStart: f, onRelease: p, onSwipingChange: h } = t, g = v(() => l(i).includes("up") || l(i).includes("down")), _ = v(() => l(i).includes("left") || l(i).includes("right")), y = v(() => l(i).includes("up")), b = v(() => l(i).includes("down")), x = v(() => l(i).includes("left")), S = v(() => l(i).includes("right")), C = e(!1), w = e(void 0), T = e({
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
		C.value !== e && (C.value = e, h?.(e));
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
			y: g.value ? r(t, y.value, b.value) : n(t)
		};
	}
	function Y(e, t, n) {
		let a = t.x - E.x, o = t.y - E.y;
		if (A) {
			A = !1;
			let e = Math.abs(a), t = Math.abs(o);
			B = g.value && _.value ? e > t ? "horizontal" : "vertical" : g.value ? "vertical" : "horizontal";
		}
		let s = B === "vertical" ? 0 : a, c = B === "horizontal" ? 0 : o, d = l(i).find((e) => G(e, s, c) > 0);
		if (j && M) {
			if (!d) return;
			let e = G(d, t.x - M.x, t.y - M.y);
			if (Math.abs(e) < _e) return;
			j = !1, D = d, w.value = d, ee(!0), f?.();
		}
		if (!C.value) return;
		let p = D ?? l(i)[0], m = G(p, s, c);
		k || (O = Math.max(O, m), O > he / 2 && O - m > ge && (k = !0));
		let h = ne(s, c);
		T.value = {
			x: h.x,
			y: h.y
		}, te(e, h.x, h.y), W({
			x: h.x,
			y: h.y
		}, n);
		let v = r.value;
		if (v) {
			let e = p === "up" || p === "down" ? I.height || v.offsetHeight : I.width || v.offsetWidth, t = U(v, p), n = Math.min(1, Math.max(0, m / (e + t)));
			n !== L && (L = n, u?.(n, {
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
		let t = G(D ?? l(i)[0], T.value.x, T.value.y), n = U(e, D ?? l(i)[0]), r = performance.now(), a = (R ? r - R.time : Infinity) > ye ? {
			x: 0,
			y: 0
		} : z;
		if (p?.(a) !== !0) {
			let r = G(D ?? l(i)[0], a.x, a.y);
			!k && (t >= n || r > .3) ? (e.setAttribute("data-swipe-dismissed", ""), c?.()) : (K(e), d?.());
		}
		q();
	}
	function Z(e) {
		if (!l(t.enabled) || e.pointerType === "touch" || e.button !== 0 || s && !s() || e.target?.closest(be)) return;
		let n = r.value;
		if (n) {
			J(n, {
				x: e.clientX,
				y: e.clientY
			}), V = e.pointerId, H = !0;
			try {
				n.setPointerCapture(e.pointerId);
			} catch {}
		}
	}
	function re(e) {
		if (!H || e.pointerId !== V) return;
		let t = r.value;
		t && e.buttons & 1 && Y(t, {
			x: e.clientX,
			y: e.clientY
		}, e.timeStamp);
	}
	function ie(e) {
		if (!H || e.pointerId !== V) return;
		let t = r.value;
		t && X(t);
	}
	function oe(e) {
		if (!l(t.enabled) || s && !s()) return;
		let n = e.target;
		if (n?.closest(be)) return;
		let i = r.value;
		if (!i) return;
		if (!t.ignoreScrollableAncestors) {
			let e = xe(n, g.value ? "vertical" : "horizontal");
			e && (N = !0, F = e);
		}
		let a = e.touches[0];
		a && J(i, {
			x: a.clientX,
			y: a.clientY
		});
	}
	function se(e) {
		let t = r.value;
		if (!t || !j && !C.value) return;
		let n = e.touches[0];
		if (!n) return;
		let i = {
			x: n.clientX,
			y: n.clientY
		};
		if (N && j && F) {
			let e = i.x - E.x, t = i.y - E.y, n = Se(F, e, t, {
				hasVertical: g.value,
				hasHorizontal: _.value,
				allowUp: y.value,
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
		let e = r.value;
		e && X(e);
	}
	let $ = [];
	return n(() => r.value, (e) => {
		$.forEach((e) => e()), $.length = 0, e && $.push(P(e, "pointerdown", Z), P(e, "pointermove", re), P(e, "pointerup", ie), P(e, "pointercancel", ie), P(e, "touchstart", oe, { passive: !0 }), P(e, "touchmove", se, { passive: !1 }), P(e, "touchend", Q), P(e, "touchcancel", Q));
	}, { immediate: !0 }), m(() => {
		$.forEach((e) => e()), $.length = 0, q();
	}), {
		isSwiping: C,
		swipeDirection: w,
		dragOffset: T
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerContentImpl.js
var we = /* @__PURE__ */ C({
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
	setup(e, { emit: r }) {
		let c = e, l = r, u = Q(), { forwardRef: d, currentElement: p } = k();
		se();
		let { activeSnapPointOffset: h, snapToNearest: g } = me({
			snapPoints: u.snapPoints,
			activeSnapPoint: u.activeSnapPoint,
			popupHeight: u.popupHeight,
			viewportRef: p,
			onSnapPointChange: (e) => {
				e === null ? u.onOpenChange(!1) : u.setActiveSnapPoint(e);
			}
		});
		function _() {
			let e = p.value;
			if (!e) return;
			let t = h.value;
			if (t != null) {
				let n = u.swipeDirection.value, r = n === "up" || n === "left" ? -t : t;
				e.style.setProperty(W.snapPointOffset, `${r}px`);
			} else e.style.setProperty(W.snapPointOffset, "0px");
		}
		n(h, _), A(p, ([e]) => {
			if (!e || u.hasNestedDrawer.value && u.popupHeight.value > 0) return;
			let t = e.contentRect.height;
			u.onPopupHeightChange(t), p.value?.style.setProperty(W.height, `${t}px`);
		}), n(() => u.frontmostHeight.value, (e) => {
			p.value?.style.setProperty(W.frontmostHeight, `${e}px`);
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
		}, { isSwiping: C, dragOffset: T } = Ce({
			enabled: v(() => u.open.value),
			elementRef: p,
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
				let t = p.value;
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
					g(r, e, n, u.snapToSequentialPoints.value), t && (_(), t.style.setProperty(W.swipeMovementX, "0px"), t.style.setProperty(W.swipeMovementY, "0px"));
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
		n(() => u.open.value, (e) => {
			I();
			let t = p.value;
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
		n(() => u.nestedOpenDrawerCount.value, (e) => {
			p.value?.style.setProperty(W.nestedDrawers, `${e}`);
		});
		let R;
		return t(() => {
			u.contentElement.value = p.value, u.notifyParentHasNestedDrawer?.(!0), p.value?.style.setProperty(W.nestedDrawers, `${u.nestedOpenDrawerCount.value}`), _(), R = u.nestedSwipeProgressStore.subscribe(() => {
				let e = u.nestedSwipeProgressStore.getSnapshot();
				p.value?.style.setProperty(W.swipeProgress, `${e}`);
			});
		}), m(() => {
			u.notifyParentHasNestedDrawer?.(!1), R?.(), I();
		}), (e, t) => (o(), f(y(V), {
			"as-child": "",
			loop: "",
			trapped: c.trapFocus,
			onMountAutoFocus: t[0] ||= (e) => l("openAutoFocus", e),
			onUnmountAutoFocus: t[1] ||= (e) => l("closeAutoFocus", e)
		}, {
			default: s(() => [w(y(F), i({
				id: y(u).contentId,
				ref: y(d),
				as: e.as,
				"as-child": e.asChild,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": y(u).descriptionId,
				"aria-labelledby": y(u).titleId
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
				default: s(() => [a(e.$slots, "default")]),
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
}), Te = /* @__PURE__ */ C({
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
	setup(t, { emit: n }) {
		let r = t, c = n, l = Q(), u = N(c), { forwardRef: d, currentElement: p } = k(), m = e(!1), h = e(!1), g = v(() => l.modal.value === !0), _ = v(() => l.modal.value === "trap-focus"), b = v(() => (g.value || _.value) && l.open.value), x = v(() => g.value ? p.value : void 0);
		B(x);
		function S(e) {
			e.defaultPrevented || (m.value || l.triggerElement.value?.focus(), e.preventDefault()), m.value = !1, h.value = !1;
		}
		function C(e) {
			e.defaultPrevented || (m.value = !0, e.detail.originalEvent.type === "pointerdown" && (h.value = !0));
			let t = e.target;
			l.triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && h.value && e.preventDefault();
		}
		return (e, t) => (o(), f(y(I), { present: e.forceMount || y(l).open.value }, {
			default: s(() => [g.value ? (o(), f(we, i({
				key: 0,
				ref: y(d)
			}, {
				...r,
				...y(u),
				...e.$attrs
			}, {
				"trap-focus": b.value,
				"disable-outside-pointer-events": !0,
				onCloseAutoFocus: t[0] ||= (e) => {
					e.defaultPrevented || (e.preventDefault(), y(l).triggerElement.value?.focus());
				},
				onPointerDownOutside: t[1] ||= (e) => {
					let t = e.detail.originalEvent;
					(t.button === 2 || t.button === 0 && t.ctrlKey) && e.preventDefault();
				},
				onFocusOutside: t[2] ||= (e) => e.preventDefault()
			}), {
				default: s(() => [a(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"])) : (o(), f(we, i({
				key: 1,
				ref: y(d)
			}, {
				...r,
				...y(u),
				...e.$attrs
			}, {
				"trap-focus": b.value,
				"disable-outside-pointer-events": !1,
				onCloseAutoFocus: S,
				onInteractOutside: C
			}), {
				default: s(() => [a(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]))]),
			_: 3
		}, 8, ["present"]));
	}
}), Ee = /* @__PURE__ */ C({
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
		return (e, r) => (o(), f(y(j), i(t, { id: y(n).descriptionId }), {
			default: s(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), De = /* @__PURE__ */ C({
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
		return (e, r) => (o(), f(y(j), i(t, {
			"aria-hidden": "true",
			"data-state": y(n).open.value ? "open" : "closed"
		}), {
			default: s(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["data-state"]));
	}
}), Oe = /* @__PURE__ */ C({
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
		let t = Q(), r = z(t.open.value);
		n(() => t.open.value, (e) => {
			r.value = e;
		}, { immediate: !0 }), k();
		let c = v(() => {
			let e = {
				"data-state": t.open.value ? "open" : "closed",
				"data-swipe-direction": t.swipeDirection.value
			};
			return t.isSwiping.value && (e["data-swiping"] = ""), e;
		});
		return (e, t) => (o(), f(y(j), i({
			as: e.as,
			"as-child": e.asChild
		}, c.value, { style: {
			pointerEvents: "auto",
			userSelect: "none",
			[y(W).swipeProgress]: "0",
			[y(W).swipeStrength]: "1"
		} }), {
			default: s(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"style"
		]));
	}
}), ke = /* @__PURE__ */ C({
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
		return (e, c) => y(t).modal.value && (!n || e.forceRender) ? (o(), f(y(I), {
			key: 0,
			present: e.forceMount || y(t).open.value
		}, {
			default: s(() => [w(Oe, i(e.$attrs, {
				ref: y(r),
				as: e.as,
				"as-child": e.asChild
			}), {
				default: s(() => [a(e.$slots, "default")]),
				_: 3
			}, 16, ["as", "as-child"])]),
			_: 3
		}, 8, ["present"])) : d("v-if", !0);
	}
}), Ae = /* @__PURE__ */ C({
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
		return (e, t) => (o(), f(y(R), x(r(e.$props)), {
			default: s(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), je = /* @__PURE__ */ C({
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
		return k(), (e, r) => (o(), f(y(j), i(t, { id: y(n).titleId }), {
			default: s(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Me = ["aria-label"], Ne = { class: "tc-tabular-nums" }, Pe = { key: 0 }, Fe = /* @__PURE__ */ C({
	__name: "InspectorSheet",
	props: {
		open: { type: Boolean },
		selection: {}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let r = e, i = t, { t: a } = _(), l = H();
		function p() {
			i("update:open", !1);
		}
		function m(e) {
			let t = e.activeElement;
			return t?.shadowRoot ? m(t.shadowRoot) : t;
		}
		let x = null;
		n(() => r.open, (e) => {
			if (e) {
				let e = m(document);
				x = e instanceof HTMLElement ? e : null;
			}
		});
		function C(e) {
			e.preventDefault(), x?.focus(), x = null;
		}
		let O = v(() => {
			let e = r.selection;
			return e ? e.kind === "generation_job" ? a("common.inspector.selection.kind_generation_job") : e.kind === "gallery_record" ? a("common.inspector.selection.kind_gallery_record") : a("common.inspector.selection.kind_asset") : null;
		}), k = v(() => {
			let e = r.selection;
			return e ? e.kind === "generation_job" ? e.job_id : e.kind === "gallery_record" ? e.record_id : e.asset_id : null;
		}), A = v(() => {
			let e = r.selection;
			if (e?.kind !== "gallery_record") return null;
			switch (e.intent) {
				case "modify_prompt": return a("common.inspector.selection.intent_modify_prompt");
				case "regenerate": return a("common.inspector.selection.intent_regenerate");
				case "edit": return a("common.inspector.selection.intent_edit");
				case "inpaint": return a("common.inspector.selection.intent_inpaint");
				default: return null;
			}
		});
		return (t, n) => (o(), f(y(ce), {
			open: e.open,
			modal: "",
			"swipe-direction": "down",
			"onUpdate:open": n[0] ||= (e) => i("update:open", e)
		}, {
			default: s(() => [w(y(Ae), { to: y(l) }, {
				default: s(() => [w(y(ke), { class: h(y(T).sheet_overlay) }, null, 8, ["class"]), w(y(Te), {
					class: h(y(T).sheet_content),
					"data-testid": "inspector-sheet",
					onCloseAutoFocus: C
				}, {
					default: s(() => [
						w(y(De), { class: h(y(T).sheet_handle) }, null, 8, ["class"]),
						w(y(je), { class: "tc-visually-hidden" }, {
							default: s(() => [S(u(y(a)("common.inspector.title")), 1)]),
							_: 1
						}),
						w(y(Ee), { class: "tc-visually-hidden" }, {
							default: s(() => [S(u(y(a)("common.inspector.empty_description")), 1)]),
							_: 1
						}),
						g("div", { class: h(y(T).sheet_header) }, [g("span", null, u(y(a)("common.inspector.title")), 1), g("button", {
							type: "button",
							class: h(["tc-interactive", y(T).icon_button]),
							"aria-label": y(a)("common.actions.close"),
							onClick: p
						}, [w(y(D), {
							size: 18,
							"stroke-width": y(E),
							"aria-hidden": "true"
						}, null, 8, ["stroke-width"])], 10, Me)], 2),
						g("div", { class: h(y(T).sheet_body) }, [e.selection ? (o(), c(b, { key: 0 }, [g("p", { class: h(y(T).inspector_selection_kind) }, u(O.value), 3), g("dl", { class: h(y(T).inspector_selection) }, [g("div", null, [g("dt", null, u(y(a)("common.inspector.selection.id_label")), 1), g("dd", Ne, u(k.value), 1)]), A.value ? (o(), c("div", Pe, [g("dt", null, u(y(a)("common.inspector.selection.action_label")), 1), g("dd", null, u(A.value), 1)])) : d("", !0)], 2)], 64)) : (o(), c(b, { key: 1 }, [g("p", null, u(y(a)("common.inspector.empty_title")), 1), g("p", null, u(y(a)("common.inspector.empty_description")), 1)], 64))], 2)
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
