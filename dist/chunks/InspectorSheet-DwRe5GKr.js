import { t as e } from "./shell.module-Bh7Ylo2p.js";
import { A as t, C as n, D as r, I as i, N as a, V as o, W as s, _ as c, at as l, ct as u, dt as d, et as f, g as p, h as m, j as h, m as g, n as _, ot as v, p as y, pt as b, u as x, ut as S, v as C, x as w, y as T } from "./vue-i18n-DUz2Gjn8.js";
import { t as E } from "./AppIcon-Cnhzrx9o.js";
import { t as D } from "./x-CDKrptQJ.js";
import { _ as O, c as k, g as A, i as j, j as M, l as N, m as P, n as F, o as I, s as L, t as R } from "./Teleport-C7mDSUEl.js";
import { a as z, i as B, t as V } from "./FocusScope-B2vRGnoX.js";
import { t as H } from "./use_portal_target-DcUqGXJq.js";
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
	setup(e, { emit: t }) {
		let n = e, r = t, a = f(n.defaultOpen), s = y({
			get: () => n.open ?? a.value,
			set: (e) => {
				a.value = e;
			}
		}), c = O(n, "snapPoint", r, {
			defaultValue: n.defaultSnapPoint ?? null,
			passive: n.snapPoint === void 0,
			eventName: "update:snapPoint"
		}), { modal: u, swipeDirection: d, snapPoints: p, snapToSequentialPoints: m } = l(n), g = f(), _ = f(), v = f(0), b = f(0), x = f(!1), S = f(0), C = f(!1), w = f(!1), T = te(), E = Q(null), D = U(null), k = L(void 0, "reka-drawer-content"), A = L(void 0, "reka-drawer-title"), j = L(void 0, "reka-drawer-description");
		$({
			open: s,
			modal: u,
			swipeDirection: d,
			snapPoints: p,
			activeSnapPoint: c,
			snapToSequentialPoints: m,
			popupHeight: v,
			frontmostHeight: b,
			hasNestedDrawer: x,
			nestedOpenDrawerCount: S,
			nestedSwiping: C,
			isSwiping: w,
			nestedSwipeProgressStore: T,
			onOpenChange(e, t) {
				if (s.value === e) return;
				let n = t ? { reason: t } : void 0;
				a.value = e, r("update:open", e, n);
			},
			notifyOpenComplete(e) {
				r("update:openComplete", e);
			},
			setActiveSnapPoint(e) {
				c.value = e;
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
			s.value && (a.value = !1, r("update:open", !1, { reason: "close-press" }));
		}
		return o(s, (e) => {
			e ? D?.setDrawerOpen(k, !0) : D?.setDrawerOpen(k, !1);
		}, { immediate: !0 }), h(() => {
			D?.removeDrawer(k);
		}), (e, t) => i(e.$slots, "default", {
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
	let { snapPoints: t, activeSnapPoint: n, popupHeight: r, viewportRef: i, onSnapPointChange: a } = e, o = f(typeof window < "u" ? window.innerHeight : 0), s = f(typeof document < "u" && Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
	typeof window < "u" && P(window, "resize", () => {
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
	let { elementRef: t, directions: n, movementCssVars: r, swipeThreshold: i, canStart: a, onDismiss: s, onProgress: c, onCancel: l, onSwipeStart: u, onRelease: d, onSwipingChange: p } = e, m = y(() => v(n).includes("up") || v(n).includes("down")), g = y(() => v(n).includes("left") || v(n).includes("right")), _ = y(() => v(n).includes("up")), b = y(() => v(n).includes("down")), x = y(() => v(n).includes("left")), S = y(() => v(n).includes("right")), C = f(!1), w = f(void 0), T = f({
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
		return typeof i == "function" ? Math.max(0, i({
			element: e,
			direction: t
		})) : typeof i == "number" ? i : he;
	}
	function ee(e) {
		C.value !== e && (C.value = e, p?.(e));
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
			x: g.value ? r(e, x.value, S.value) : n(e),
			y: m.value ? r(t, _.value, b.value) : n(t)
		};
	}
	function Y(e, r, i) {
		let a = r.x - E.x, o = r.y - E.y;
		if (A) {
			A = !1;
			let e = Math.abs(a), t = Math.abs(o);
			B = m.value && g.value ? e > t ? "horizontal" : "vertical" : m.value ? "vertical" : "horizontal";
		}
		let s = B === "vertical" ? 0 : a, l = B === "horizontal" ? 0 : o, d = v(n).find((e) => G(e, s, l) > 0);
		if (j && M) {
			if (!d) return;
			let e = G(d, r.x - M.x, r.y - M.y);
			if (Math.abs(e) < _e) return;
			j = !1, D = d, w.value = d, ee(!0), u?.();
		}
		if (!C.value) return;
		let f = D ?? v(n)[0], p = G(f, s, l);
		k || (O = Math.max(O, p), O > he / 2 && O - p > ge && (k = !0));
		let h = ne(s, l);
		T.value = {
			x: h.x,
			y: h.y
		}, te(e, h.x, h.y), W({
			x: h.x,
			y: h.y
		}, i);
		let _ = t.value;
		if (_) {
			let e = f === "up" || f === "down" ? I.height || _.offsetHeight : I.width || _.offsetWidth, t = U(_, f), n = Math.min(1, Math.max(0, p / (e + t)));
			n !== L && (L = n, c?.(n, {
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
		let t = G(D ?? v(n)[0], T.value.x, T.value.y), r = U(e, D ?? v(n)[0]), i = performance.now(), a = (R ? i - R.time : Infinity) > ye ? {
			x: 0,
			y: 0
		} : z;
		if (d?.(a) !== !0) {
			let i = G(D ?? v(n)[0], a.x, a.y);
			!k && (t >= r || i > .3) ? (e.setAttribute("data-swipe-dismissed", ""), s?.()) : (K(e), l?.());
		}
		q();
	}
	function Z(n) {
		if (!v(e.enabled) || n.pointerType === "touch" || n.button !== 0 || a && !a() || n.target?.closest(be)) return;
		let r = t.value;
		if (r) {
			J(r, {
				x: n.clientX,
				y: n.clientY
			}), V = n.pointerId, H = !0;
			try {
				r.setPointerCapture(n.pointerId);
			} catch {}
		}
	}
	function re(e) {
		if (!H || e.pointerId !== V) return;
		let n = t.value;
		n && e.buttons & 1 && Y(n, {
			x: e.clientX,
			y: e.clientY
		}, e.timeStamp);
	}
	function ie(e) {
		if (!H || e.pointerId !== V) return;
		let n = t.value;
		n && X(n);
	}
	function oe(n) {
		if (!v(e.enabled) || a && !a()) return;
		let r = n.target;
		if (r?.closest(be)) return;
		let i = t.value;
		if (!i) return;
		if (!e.ignoreScrollableAncestors) {
			let e = xe(r, m.value ? "vertical" : "horizontal");
			e && (N = !0, F = e);
		}
		let o = n.touches[0];
		o && J(i, {
			x: o.clientX,
			y: o.clientY
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
		if (N && j && F) {
			let e = i.x - E.x, t = i.y - E.y, n = Se(F, e, t, {
				hasVertical: m.value,
				hasHorizontal: g.value,
				allowUp: _.value,
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
		Y(n, i, e.timeStamp), (a || C.value) && e.preventDefault();
	}
	function Q() {
		let e = t.value;
		e && X(e);
	}
	let $ = [];
	return o(() => t.value, (e) => {
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
	setup(e, { emit: n }) {
		let c = e, l = n, d = Q(), { forwardRef: f, currentElement: p } = k();
		se();
		let { activeSnapPointOffset: g, snapToNearest: _ } = me({
			snapPoints: d.snapPoints,
			activeSnapPoint: d.activeSnapPoint,
			popupHeight: d.popupHeight,
			viewportRef: p,
			onSnapPointChange: (e) => {
				e === null ? d.onOpenChange(!1) : d.setActiveSnapPoint(e);
			}
		});
		function v() {
			let e = p.value;
			if (!e) return;
			let t = g.value;
			if (t != null) {
				let n = d.swipeDirection.value, r = n === "up" || n === "left" ? -t : t;
				e.style.setProperty(W.snapPointOffset, `${r}px`);
			} else e.style.setProperty(W.snapPointOffset, "0px");
		}
		o(g, v), A(p, ([e]) => {
			if (!e || d.hasNestedDrawer.value && d.popupHeight.value > 0) return;
			let t = e.contentRect.height;
			d.onPopupHeightChange(t), p.value?.style.setProperty(W.height, `${t}px`);
		}), o(() => d.frontmostHeight.value, (e) => {
			p.value?.style.setProperty(W.frontmostHeight, `${e}px`);
		});
		let b = y(() => (d.snapPoints.value?.length ?? 0) > 0), x = y(() => {
			let e = d.swipeDirection.value;
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
			enabled: y(() => d.open.value),
			elementRef: p,
			directions: x,
			movementCssVars: {
				x: W.swipeMovementX,
				y: W.swipeMovementY
			},
			canStart: () => !d.nestedSwiping.value,
			onDismiss() {
				b.value || d.onOpenChange(!1, "swipe");
			},
			onRelease(e) {
				let t = p.value;
				if (t) {
					let n = d.swipeDirection.value, r = n === "left" || n === "right" ? t.offsetWidth : t.offsetHeight, i = n === "left" || n === "right" ? S.x : S.y, a = n === "left" || n === "right" ? e.x : e.y, o = re({
						direction: n,
						size: r,
						axisDelta: i,
						snapPointOffset: g.value ?? 0,
						releaseVelocity: a
					});
					o == null ? t.style.setProperty(W.swipeStrength, "1") : t.style.setProperty(W.swipeStrength, `${o}`);
				}
				if (b.value) {
					let n = d.swipeDirection.value, r = G(n, S.x, S.y);
					_(r, e, n, d.snapToSequentialPoints.value), t && (v(), t.style.setProperty(W.swipeMovementX, "0px"), t.style.setProperty(W.swipeMovementY, "0px"));
				}
				return b.value;
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
		o(() => d.open.value, (e) => {
			I();
			let t = p.value;
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
		let L = y(() => {
			let e = {
				"data-state": d.open.value ? "open" : "closed",
				"data-swipe-direction": d.swipeDirection.value
			};
			return C.value && (e["data-swiping"] = ""), d.hasNestedDrawer.value && (e["data-nested-drawer-open"] = ""), e;
		});
		o(() => d.nestedOpenDrawerCount.value, (e) => {
			p.value?.style.setProperty(W.nestedDrawers, `${e}`);
		});
		let R;
		return t(() => {
			d.contentElement.value = p.value, d.notifyParentHasNestedDrawer?.(!0), p.value?.style.setProperty(W.nestedDrawers, `${d.nestedOpenDrawerCount.value}`), v(), R = d.nestedSwipeProgressStore.subscribe(() => {
				let e = d.nestedSwipeProgressStore.getSnapshot();
				p.value?.style.setProperty(W.swipeProgress, `${e}`);
			});
		}), h(() => {
			d.notifyParentHasNestedDrawer?.(!1), R?.(), I();
		}), (e, t) => (a(), m(u(V), {
			"as-child": "",
			loop: "",
			trapped: c.trapFocus,
			onMountAutoFocus: t[0] ||= (e) => l("openAutoFocus", e),
			onUnmountAutoFocus: t[1] ||= (e) => l("closeAutoFocus", e)
		}, {
			default: s(() => [T(u(F), r({
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
				onFocusOutside: M,
				onInteractOutside: N,
				onPointerDownOutside: j
			}), {
				default: s(() => [i(e.$slots, "default")]),
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
		let n = e, o = t, c = Q(), l = N(o), { forwardRef: d, currentElement: p } = k(), h = f(!1), g = f(!1), _ = y(() => c.modal.value === !0), v = y(() => c.modal.value === "trap-focus"), b = y(() => (_.value || v.value) && c.open.value), x = y(() => _.value ? p.value : void 0);
		B(x);
		function S(e) {
			e.defaultPrevented || (h.value || c.triggerElement.value?.focus(), e.preventDefault()), h.value = !1, g.value = !1;
		}
		function C(e) {
			e.defaultPrevented || (h.value = !0, e.detail.originalEvent.type === "pointerdown" && (g.value = !0));
			let t = e.target;
			c.triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && g.value && e.preventDefault();
		}
		return (e, t) => (a(), m(u(I), { present: e.forceMount || u(c).open.value }, {
			default: s(() => [_.value ? (a(), m(we, r({
				key: 0,
				ref: u(d)
			}, {
				...n,
				...u(l),
				...e.$attrs
			}, {
				"trap-focus": b.value,
				"disable-outside-pointer-events": !0,
				onCloseAutoFocus: t[0] ||= (e) => {
					e.defaultPrevented || (e.preventDefault(), u(c).triggerElement.value?.focus());
				},
				onPointerDownOutside: t[1] ||= (e) => {
					let t = e.detail.originalEvent;
					(t.button === 2 || t.button === 0 && t.ctrlKey) && e.preventDefault();
				},
				onFocusOutside: t[2] ||= (e) => e.preventDefault()
			}), {
				default: s(() => [i(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"])) : (a(), m(we, r({
				key: 1,
				ref: u(d)
			}, {
				...n,
				...u(l),
				...e.$attrs
			}, {
				"trap-focus": b.value,
				"disable-outside-pointer-events": !1,
				onCloseAutoFocus: S,
				onInteractOutside: C
			}), {
				default: s(() => [i(e.$slots, "default")]),
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
		return (e, o) => (a(), m(u(j), r(t, { id: u(n).descriptionId }), {
			default: s(() => [i(e.$slots, "default")]),
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
		return (e, o) => (a(), m(u(j), r(t, {
			"aria-hidden": "true",
			"data-state": u(n).open.value ? "open" : "closed"
		}), {
			default: s(() => [i(e.$slots, "default")]),
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
		o(() => t.open.value, (e) => {
			n.value = e;
		}, { immediate: !0 }), k();
		let c = y(() => {
			let e = {
				"data-state": t.open.value ? "open" : "closed",
				"data-swipe-direction": t.swipeDirection.value
			};
			return t.isSwiping.value && (e["data-swiping"] = ""), e;
		});
		return (e, t) => (a(), m(u(j), r({
			as: e.as,
			"as-child": e.asChild
		}, c.value, { style: {
			pointerEvents: "auto",
			userSelect: "none",
			[u(W).swipeProgress]: "0",
			[u(W).swipeStrength]: "1"
		} }), {
			default: s(() => [i(e.$slots, "default")]),
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
		let t = Q(), n = !!t.notifyParentHasNestedDrawer, { forwardRef: o } = k();
		return (e, c) => u(t).modal.value && (!n || e.forceRender) ? (a(), m(u(I), {
			key: 0,
			present: e.forceMount || u(t).open.value
		}, {
			default: s(() => [T(Oe, r(e.$attrs, {
				ref: u(o),
				as: e.as,
				"as-child": e.asChild
			}), {
				default: s(() => [i(e.$slots, "default")]),
				_: 3
			}, 16, ["as", "as-child"])]),
			_: 3
		}, 8, ["present"])) : p("v-if", !0);
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
		return (e, t) => (a(), m(u(R), d(n(e.$props)), {
			default: s(() => [i(e.$slots, "default")]),
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
		return k(), (e, o) => (a(), m(u(j), r(t, { id: u(n).titleId }), {
			default: s(() => [i(e.$slots, "default")]),
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
		let r = t, i = n, { t: l } = _(), d = H();
		function f() {
			i("update:open", !1);
		}
		function h(e) {
			let t = e.activeElement;
			return t?.shadowRoot ? h(t.shadowRoot) : t;
		}
		let v = null;
		o(() => r.open, (e) => {
			if (e) {
				let e = h(document);
				v = e instanceof HTMLElement ? e : null;
			}
		});
		function w(e) {
			e.preventDefault(), v?.focus(), v = null;
		}
		let O = y(() => {
			let e = r.selection;
			return e ? e.kind === "generation_job" ? l("common.inspector.selection.kind_generation_job") : e.kind === "gallery_record" ? l("common.inspector.selection.kind_gallery_record") : l("common.inspector.selection.kind_asset") : null;
		}), k = y(() => {
			let e = r.selection;
			return e ? e.kind === "generation_job" ? e.job_id : e.kind === "gallery_record" ? e.record_id : e.asset_id : null;
		}), A = y(() => {
			let e = r.selection;
			if (e?.kind !== "gallery_record") return null;
			switch (e.intent) {
				case "modify_prompt": return l("common.inspector.selection.intent_modify_prompt");
				case "regenerate": return l("common.inspector.selection.intent_regenerate");
				case "edit": return l("common.inspector.selection.intent_edit");
				case "inpaint": return l("common.inspector.selection.intent_inpaint");
				default: return null;
			}
		});
		return (n, r) => (a(), m(u(ce), {
			open: t.open,
			modal: "",
			"swipe-direction": "down",
			"onUpdate:open": r[0] ||= (e) => i("update:open", e)
		}, {
			default: s(() => [T(u(Ae), { to: u(d) }, {
				default: s(() => [T(u(ke), { class: S(u(e).sheet_overlay) }, null, 8, ["class"]), T(u(Te), {
					class: S(u(e).sheet_content),
					"data-testid": "inspector-sheet",
					onCloseAutoFocus: w
				}, {
					default: s(() => [
						T(u(De), { class: S(u(e).sheet_handle) }, null, 8, ["class"]),
						T(u(je), { class: "tc-visually-hidden" }, {
							default: s(() => [C(b(u(l)("common.inspector.title")), 1)]),
							_: 1
						}),
						T(u(Ee), { class: "tc-visually-hidden" }, {
							default: s(() => [C(b(u(l)("common.inspector.empty_description")), 1)]),
							_: 1
						}),
						g("div", { class: S(u(e).sheet_header) }, [g("span", null, b(u(l)("common.inspector.title")), 1), g("button", {
							type: "button",
							class: S(["tc-interactive", u(e).icon_button]),
							"aria-label": u(l)("common.actions.close"),
							onClick: f
						}, [T(E, {
							icon: u(D),
							size: 18
						}, null, 8, ["icon"])], 10, Me)], 2),
						g("div", { class: S(u(e).sheet_body) }, [t.selection ? (a(), c(x, { key: 0 }, [g("p", { class: S(u(e).inspector_selection_kind) }, b(O.value), 3), g("dl", { class: S(u(e).inspector_selection) }, [g("div", null, [g("dt", null, b(u(l)("common.inspector.selection.id_label")), 1), g("dd", Ne, b(k.value), 1)]), A.value ? (a(), c("div", Pe, [g("dt", null, b(u(l)("common.inspector.selection.action_label")), 1), g("dd", null, b(A.value), 1)])) : p("", !0)], 2)], 64)) : (a(), c(x, { key: 1 }, [g("p", null, b(u(l)("common.inspector.empty_title")), 1), g("p", null, b(u(l)("common.inspector.empty_description")), 1)], 64))], 2)
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
