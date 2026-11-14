import { $ as e, F as t, G as n, H as r, I as i, M as a, N as o, O as s, P as c, Q as l, R as u, S as d, T as f, W as p, X as m, Z as h, _t as g, at as _, ct as v, d as y, dt as b, f as ee, ft as te, g as ne, h as x, ht as re, it as ie, j as ae, k as S, l as oe, lt as C, nt as w, p as T, q as se, r as ce, rt as E, tt as le, u as ue, ut as de, w as D, x as O } from "./vue-i18n-XoxYzLIP.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/createContext.js
function fe(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
	return [(t) => {
		let n = f(r, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (i(r, e), e)];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/getActiveElement.js
function k() {
	let e = document.activeElement;
	if (e == null) return null;
	for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null;) e = e.shadowRoot.activeElement;
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function A(e, t, n) {
	let r = n.originalEvent.target, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/nullish.js
function pe(e) {
	return e == null;
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+shared@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/shared/dist/index.js
function j(e, t) {
	return l() ? (le(e, t), !0) : !1;
}
function me() {
	let e = /* @__PURE__ */ new Set(), t = (t) => {
		e.delete(t);
	};
	return {
		on: (n) => {
			e.add(n);
			let r = () => t(n);
			return j(r), { off: r };
		},
		off: t,
		trigger: (...t) => Promise.all(Array.from(e).map((e) => e(...t))),
		clear: () => {
			e.clear();
		}
	};
}
function he(e) {
	let t = !1, n, r = h(!0);
	return ((...i) => (t ||= (n = r.run(() => e(...i)), !0), n));
}
var M = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var ge = (e) => e !== void 0, _e = Object.prototype.toString, ve = (e) => _e.call(e) === "[object Object]", ye = () => {}, be = /* #__PURE__ */ xe();
function xe() {
	var e, t;
	return M && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function N(e) {
	return Array.isArray(e) ? e : [e];
}
function Se(e) {
	return e || d();
}
function Ce(e) {
	if (!M) return e;
	let t = 0, n, r, i = () => {
		--t, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
	};
	return ((...a) => (t += 1, r || (r = h(!0), n = r.run(() => e(...a))), j(i), n));
}
function we(t) {
	return e(t) ? w(new Proxy({}, {
		get(e, n, r) {
			return b(Reflect.get(t.value, n, r));
		},
		set(n, r, i) {
			return e(t.value[r]) && !e(i) ? t.value[r].value = i : t.value[r] = i, !0;
		},
		deleteProperty(e, n) {
			return Reflect.deleteProperty(t.value, n);
		},
		has(e, n) {
			return Reflect.has(t.value, n);
		},
		ownKeys() {
			return Object.keys(t.value);
		},
		getOwnPropertyDescriptor() {
			return {
				enumerable: !0,
				configurable: !0
			};
		}
	})) : w(t);
}
function Te(e) {
	return we(T(e));
}
function Ee(e, ...t) {
	let n = t.flat(), r = n[0];
	return Te(() => Object.fromEntries(typeof r == "function" ? Object.entries(v(e)).filter(([e, t]) => !r(C(t), e)) : Object.entries(v(e)).filter((e) => !n.includes(e[0]))));
}
function De(e, t = 1e4) {
	return m((n, r) => {
		let i = C(e), a, o = () => setTimeout(() => {
			i = C(e), r();
		}, C(t));
		return j(() => {
			clearTimeout(a);
		}), {
			get() {
				return n(), i;
			},
			set(e) {
				i = e, r(), clearTimeout(a), a = o();
			}
		};
	});
}
function Oe(e, t) {
	Se(t) && ae(e, t);
}
function ke(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = _(!1), o;
	function s() {
		o &&= (clearTimeout(o), void 0);
	}
	function c() {
		a.value = !1, s();
	}
	function l(...n) {
		i && e(), s(), a.value = !0, o = setTimeout(() => {
			a.value = !1, o = void 0, e(...n);
		}, C(t));
	}
	return r && (a.value = !0, M && l()), j(c), {
		isPending: ie(a),
		start: l,
		stop: c
	};
}
function Ae(e = 1e3, t = {}) {
	let { controls: n = !1, callback: r } = t, i = ke(r ?? ye, e, t), a = T(() => !i.isPending.value);
	return n ? {
		ready: a,
		...i
	} : a;
}
function je(e, t, n) {
	return p(e, t, {
		...n,
		immediate: !0
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var P = M ? window : void 0;
M && window.document, M && window.navigator, M && window.location;
function F(e) {
	let t = C(e);
	return t?.$el ?? t;
}
function I(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = T(() => {
		let t = N(C(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return je(() => [
		n.value?.map((e) => F(e)) ?? [P].filter((e) => e != null),
		N(C(n.value ? e[1] : e[0])),
		N(b(n.value ? e[2] : e[1])),
		C(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = ve(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function Me() {
	let e = _(!1), t = d();
	return t && a(() => {
		e.value = !0;
	}, t), e;
}
/* @__NO_SIDE_EFFECTS__ */
function Ne(e) {
	let t = Me();
	return T(() => (t.value, !!e()));
}
function Pe(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function L(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = P, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = Pe(t);
	return I(i, a, (e) => {
		e.repeat && C(s) || c(e) && n(e);
	}, o);
}
function Fe(e, t = {}) {
	let { immediate: n = !0, fpsLimit: r = null, window: i = P, once: a = !1 } = t, o = _(!1), s = T(() => {
		let e = C(r);
		return e ? 1e3 / e : null;
	}), c = 0, l = null;
	function u(t) {
		if (!o.value || !i) return;
		c ||= t;
		let n = t - c;
		if (s.value && n < s.value) {
			l = i.requestAnimationFrame(u);
			return;
		}
		if (c = t, e({
			delta: n,
			timestamp: t
		}), a) {
			o.value = !1, l = null;
			return;
		}
		l = i.requestAnimationFrame(u);
	}
	function d() {
		!o.value && i && (o.value = !0, c = 0, l = i.requestAnimationFrame(u));
	}
	function f() {
		o.value = !1, l != null && i && (i.cancelAnimationFrame(l), l = null);
	}
	return n && d(), j(f), {
		isActive: ie(o),
		pause: f,
		resume: d
	};
}
function Ie(e) {
	return JSON.parse(JSON.stringify(e));
}
function Le(e, t, n = {}) {
	let { window: r = P, ...i } = n, a, o = /* @__PURE__ */ Ne(() => r && "ResizeObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, c = p(T(() => {
		let t = C(e);
		return Array.isArray(t) ? t.map((e) => F(e)) : [F(t)];
	}), (e) => {
		if (s(), o.value && r) {
			a = new ResizeObserver(t);
			for (let t of e) t && a.observe(t, i);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), l = () => {
		s(), c();
	};
	return j(l), {
		isSupported: o,
		stop: l
	};
}
function Re(e, t, n, r = {}) {
	var i, a;
	let { clone: o = !1, passive: s = !1, eventName: c, deep: l = !1, defaultValue: u, shouldEmit: f } = r, m = d(), h = n || m?.emit || (m == null || (i = m.$emit) == null ? void 0 : i.bind(m)) || (m == null || (a = m.proxy) == null || (a = a.$emit) == null ? void 0 : a.bind(m?.proxy)), g = c;
	t ||= "modelValue", g ||= `update:${t.toString()}`;
	let _ = (e) => o ? typeof o == "function" ? o(e) : Ie(e) : e, v = () => ge(e[t]) ? _(e[t]) : u, y = (e) => {
		f ? f(e) && h(g, e) : h(g, e);
	};
	if (s) {
		let n = E(v()), r = !1;
		return p(() => e[t], (e) => {
			r || (r = !0, n.value = _(e), S(() => r = !1));
		}), p(n, (n) => {
			!r && (n !== e[t] || l) && y(n);
		}, { deep: l }), n;
	}
	return T({
		get() {
			return v();
		},
		set(e) {
			y(e);
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/renderSlotFragments.js
function R(e) {
	return e ? e.flatMap((e) => e.type === ue ? R(e.children) : [e]) : [];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [z, ze] = /*#__PURE__*/ fe("ConfigProvider");
//#endregion
//#region ../../node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function B(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function V(e, t, n = ".", r) {
	if (!B(t)) return V(e, {}, n, r);
	let i = { ...t };
	for (let t of Object.keys(e)) {
		if (t === "__proto__" || t === "constructor") continue;
		let a = e[t];
		a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : B(a) && B(i[t]) ? V(a, i[t], (n ? `${n}.` : "") + t.toString(), r) : a));
	}
	return i;
}
function Be(e) {
	return (...t) => t.reduce((t, n) => V(t, n, "", e), {});
}
var Ve = Be(), He = Ce(() => {
	let e = E(/* @__PURE__ */ new Map()), t = E(), n = T(() => {
		for (let t of e.value.values()) if (t) return !0;
		return !1;
	}), r = z({ scrollBody: E(!0) }), i = null, a = () => {
		document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", be && i?.(), t.value = void 0;
	};
	return p(n, (e, o) => {
		if (!M) return;
		if (!e) {
			o && a();
			return;
		}
		t.value === void 0 && (t.value = document.body.style.overflow);
		let s = window.innerWidth - document.documentElement.clientWidth, c = {
			padding: s,
			margin: 0
		}, l = r.scrollBody?.value ? typeof r.scrollBody.value == "object" ? Ve({
			padding: r.scrollBody.value.padding === !0 ? s : r.scrollBody.value.padding,
			margin: r.scrollBody.value.margin === !0 ? s : r.scrollBody.value.margin
		}, c) : c : {
			padding: 0,
			margin: 0
		};
		s > 0 && (document.body.style.paddingRight = typeof l.padding == "number" ? `${l.padding}px` : String(l.padding), document.body.style.marginRight = typeof l.margin == "number" ? `${l.margin}px` : String(l.margin), document.documentElement.style.setProperty("--scrollbar-width", `${s}px`), document.body.style.overflow = "hidden"), be && (i = I(document, "touchmove", (e) => Ge(e), { passive: !1 })), S(() => {
			n.value && (document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden");
		});
	}, {
		immediate: !0,
		flush: "sync"
	}), e;
});
function Ue(e) {
	let t = Math.random().toString(36).substring(2, 7), n = He();
	n.value.set(t, e ?? !1);
	let r = T({
		get: () => n.value.get(t) ?? !1,
		set: (e) => n.value.set(t, e)
	});
	return Oe(() => {
		n.value.delete(t);
	}), r;
}
function We(e) {
	let t = window.getComputedStyle(e);
	if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
	{
		let t = e.parentNode;
		return !(t instanceof Element) || t.tagName === "BODY" ? !1 : We(t);
	}
}
function Ge(e) {
	let t = e || window.event, n = t.target;
	return n instanceof Element && We(n) ? !1 : t.touches.length > 1 || (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useEmitAsProps.js
function Ke(e) {
	let t = d(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[g(te(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function H() {
	let e = d(), t = E(), n = T(() => r());
	c(() => {
		n.value !== r() && de(t);
	});
	function r() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : F(t);
	}
	let i = Object.assign({}, e.exposed), a = {};
	for (let t in e.props) Object.defineProperty(a, t, {
		enumerable: !0,
		configurable: !0,
		get: () => e.props[t]
	});
	if (Object.keys(i).length > 0) for (let e in i) Object.defineProperty(a, e, {
		enumerable: !0,
		configurable: !0,
		get: () => i[e]
	});
	Object.defineProperty(a, "$el", {
		enumerable: !0,
		configurable: !0,
		get: () => e.vnode.el
	}), e.exposed = a;
	function o(n) {
		if (t.value = n, n && (Object.defineProperty(a, "$el", {
			enumerable: !0,
			configurable: !0,
			get: () => n instanceof Element ? n : n.$el
		}), !(n instanceof Element) && !Object.hasOwn(n, "$el"))) {
			let t = n.$.exposed, r = Object.assign({}, a);
			for (let e in t) Object.defineProperty(r, e, {
				enumerable: !0,
				configurable: !0,
				get: () => t[e]
			});
			e.exposed = r;
		}
	}
	return {
		forwardRef: o,
		currentRef: t,
		currentElement: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var qe = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, U = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), G = {}, K = 0, Je = function(e) {
	return e && (e.host || Je(e.parentNode));
}, Ye = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = Je(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, Xe = function(e, t, n, r) {
	var i = Ye(t, Array.isArray(e) ? e : [e]);
	G[n] || (G[n] = /* @__PURE__ */ new WeakMap());
	var a = G[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (U.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				U.set(e, c), a.set(e, l), o.push(e), c === 1 && i && W.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), K++, function() {
		o.forEach(function(e) {
			var t = U.get(e) - 1, i = a.get(e) - 1;
			U.set(e, t), a.set(e, i), t || (W.has(e) || e.removeAttribute(r), W.delete(e)), i || e.removeAttribute(n);
		}), K--, K || (U = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), G = {});
	};
}, Ze = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || qe(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), Xe(r, i, n, "aria-hidden")) : function() {
		return null;
	};
};
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useHideOthers.js
function Qe(e) {
	let t;
	p(() => F(e), (e) => {
		let n = !1;
		try {
			n = !!e?.closest("[popover]:not(:popover-open)");
		} catch {}
		e && !n ? t = Ze(e) : t && t();
	}), o(() => {
		t && t();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var $e = 0;
function et(e, t = "reka") {
	if (e) return e;
	let n, i = z({ useId: void 0 });
	return n = i.useId ? i.useId() : "useId" in ce ? r?.() : `${++$e}`, t ? `${t}-${n}` : n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
function tt(e, t) {
	let n = E(e);
	function r(e) {
		return t[n.value][e] ?? n.value;
	}
	return {
		state: n,
		dispatch: (e) => {
			n.value = r(e);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/usePresence.js
function nt(e, t) {
	let n = E({}), r = E("none"), i = E(e), a = e.value ? "mounted" : "unmounted", s, c = t.value?.ownerDocument.defaultView ?? P, { state: l, dispatch: u } = tt(a, {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	}), d = (e) => {
		if (M) {
			let n = new CustomEvent(e, {
				bubbles: !1,
				cancelable: !1
			});
			t.value?.dispatchEvent(n);
		}
	};
	p(e, async (e, i) => {
		let a = i !== e;
		if (await S(), a) {
			let a = r.value, o = q(t.value);
			e ? (u("MOUNT"), d("enter"), o === "none" && d("after-enter")) : o === "none" || o === "undefined" || n.value?.display === "none" ? (u("UNMOUNT"), d("leave"), d("after-leave")) : i && a !== o ? (u("ANIMATION_OUT"), d("leave")) : (u("UNMOUNT"), d("after-leave"));
		}
	}, { immediate: !0 });
	let f = (e) => {
		let n = q(t.value), r = n.includes(CSS.escape(e.animationName)), a = l.value === "mounted" ? "enter" : "leave";
		if (e.target === t.value && r && (d(`after-${a}`), u("ANIMATION_END"), !i.value)) {
			let e = t.value.style.animationFillMode;
			t.value.style.animationFillMode = "forwards", s = c?.setTimeout(() => {
				t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = e);
			});
		}
		e.target === t.value && n === "none" && u("ANIMATION_END");
	}, m = (e) => {
		e.target === t.value && (r.value = q(t.value));
	}, h = p(t, (e, t) => {
		e ? (n.value = getComputedStyle(e), e.addEventListener("animationstart", m), e.addEventListener("animationcancel", f), e.addEventListener("animationend", f)) : (u("ANIMATION_END"), s !== void 0 && c?.clearTimeout(s), t?.removeEventListener("animationstart", m), t?.removeEventListener("animationcancel", f), t?.removeEventListener("animationend", f));
	}, { immediate: !0 }), g = p(l, () => {
		let e = q(t.value);
		r.value = l.value === "mounted" ? e : "none";
	});
	return o(() => {
		h(), g(), t.value && (t.value.removeEventListener("animationstart", m), t.value.removeEventListener("animationcancel", f), t.value.removeEventListener("animationend", f)), s !== void 0 && c?.clearTimeout(s);
	}), { isPresent: T(() => ["mounted", "unmountSuspended"].includes(l.value)) };
}
function q(e) {
	return e && getComputedStyle(e).animationName || "none";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/Presence.js
var rt = /*#__PURE__*/ O({
	name: "Presence",
	props: {
		present: {
			type: Boolean,
			required: !0
		},
		forceMount: { type: Boolean }
	},
	slots: {},
	setup(e, { slots: t, expose: n }) {
		let { present: r, forceMount: i } = v(e), a = E(), { isPresent: o } = nt(r, a);
		n({ present: o });
		let s = t.default({ present: o.value });
		s = R(s || []);
		let c = d();
		if (s && s?.length > 1) {
			let e = c?.parent?.type.name ? `<${c.parent.type.name} />` : "component";
			throw Error([
				`Detected an invalid children for \`${e}\` for  \`Presence\` component.`,
				"",
				"Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
				"You can apply a few solutions:",
				["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((e) => `  - ${e}`).join("\n")
			].join("\n"));
		}
		return () => i.value || r.value || o.value ? D(t.default({ present: o.value })[0], { ref: (e) => {
			let t = F(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? a.value = t.firstElementChild : a.value = t), t;
		} }) : null;
	}
}), it = /*#__PURE__*/ O({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			if (!n.default) return null;
			let e = R(n.default()), r = e.findIndex((e) => e.type !== oe);
			if (r === -1) return e;
			let i = e[r];
			delete i.props?.ref;
			let a = i.props ? s(t, i.props) : t, o = ee({
				...i,
				props: {}
			}, a);
			return e.length === 1 ? o : (e[r] = o, e);
		};
	}
}), at = [
	"area",
	"img",
	"input"
], J = /*#__PURE__*/ O({
	name: "Primitive",
	inheritAttrs: !1,
	props: {
		asChild: {
			type: Boolean,
			default: !1
		},
		as: {
			type: [String, Object],
			default: "div"
		}
	},
	setup(e, { attrs: t, slots: n }) {
		let r = e.asChild ? "template" : e.as;
		return typeof r == "string" && at.includes(r) ? () => D(r, t) : r === "template" ? () => D(it, t, { default: n.default }) : () => D(e.as, t, { default: n.default });
	}
}), ot = "dismissableLayer.pointerDownOutside", st = "dismissableLayer.focusOutside";
function ct(e, t) {
	if (!(t instanceof Element)) return !1;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function lt(e, t, r = !0) {
	let i = t?.value?.ownerDocument ?? globalThis?.document, a = E(!1), o = E(() => {});
	return n((n) => {
		if (!M || !C(r)) return;
		let s = async (n) => {
			let r = n.target;
			if (!(!t?.value || !r)) {
				if (ct(t.value, r)) {
					a.value = !1;
					return;
				}
				if (n.target && !a.value) {
					let t = { originalEvent: n };
					function r() {
						A(ot, e, t);
					}
					n.pointerType === "touch" ? (i.removeEventListener("click", o.value), o.value = r, i.addEventListener("click", o.value, { once: !0 })) : r();
				} else i.removeEventListener("click", o.value);
				a.value = !1;
			}
		}, c = window.setTimeout(() => {
			i.addEventListener("pointerdown", s);
		}, 0);
		n(() => {
			window.clearTimeout(c), i.removeEventListener("pointerdown", s), i.removeEventListener("click", o.value);
		});
	}), { onPointerDownCapture: () => {
		C(r) && (a.value = !0);
	} };
}
function ut(e, t, r = !0) {
	let i = t?.value?.ownerDocument ?? globalThis?.document, a = E(!1);
	return n((n) => {
		if (!M || !C(r)) return;
		let o = async (n) => {
			if (!t?.value) return;
			await S(), await S();
			let r = n.target;
			!t.value || !r || ct(t.value, r) || n.target && !a.value && A(st, e, { originalEvent: n });
		};
		i.addEventListener("focusin", o), n(() => i.removeEventListener("focusin", o));
	}), {
		onFocusCapture: () => {
			C(r) && (a.value = !0);
		},
		onBlurCapture: () => {
			C(r) && (a.value = !1);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var Y = /*#__PURE__*/ w({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
}), dt = /* @__PURE__ */ O({
	__name: "DismissableLayer",
	props: {
		disableOutsidePointerEvents: {
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
		},
		present: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"dismiss"
	],
	setup(e, { emit: r }) {
		let i = e, a = r, { forwardRef: o, currentElement: s } = H(), c = T(() => s.value?.ownerDocument ?? globalThis.document), l = T(() => Y.layersRoot), d = T(() => s.value ? Array.from(l.value).indexOf(s.value) : -1), f = T(() => Y.layersWithOutsidePointerEventsDisabled.size > 0), m = T(() => {
			let e = Array.from(l.value), [t] = [...Y.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return d.value >= n;
		}), h = lt(async (e) => {
			let t = [...Y.branches].some((t) => t?.contains(e.target));
			!i.present || !m.value || t || (a("pointerDownOutside", e), a("interactOutside", e), await S(), e.defaultPrevented || a("dismiss"));
		}, s), g = ut((e) => {
			let t = [...Y.branches].some((t) => t?.contains(e.target));
			!i.present || t || (a("focusOutside", e), a("interactOutside", e), e.defaultPrevented || a("dismiss"));
		}, s);
		return L("Escape", (e) => {
			i.present && d.value === l.value.size - 1 && (a("escapeKeyDown", e), e.defaultPrevented || a("dismiss"));
		}), p([
			s,
			() => i.disableOutsidePointerEvents,
			() => i.present
		], ([e, t, n], r, i) => {
			!e || !n || t && (Y.layersWithOutsidePointerEventsDisabled.size === 0 && (Y.originalBodyPointerEvents = c.value.body.style.pointerEvents, c.value.body.style.pointerEvents = "none"), Y.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				Y.layersWithOutsidePointerEventsDisabled.delete(e), Y.layersWithOutsidePointerEventsDisabled.size === 0 && !pe(Y.originalBodyPointerEvents) && (c.value.body.style.pointerEvents = Y.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), p([s, () => i.present], ([e, t], n, r) => {
			!e || !t || (l.value.add(e), r(() => {
				l.value.delete(e);
			}));
		}, { immediate: !0 }), n((e) => {
			e(() => {
				s.value && (l.value.delete(s.value), Y.layersWithOutsidePointerEventsDisabled.delete(s.value));
			});
		}), (e, n) => (t(), x(b(J), {
			ref: b(o),
			"as-child": e.asChild,
			as: e.as,
			"data-dismissable-layer": "",
			style: re({ pointerEvents: f.value ? m.value ? "auto" : "none" : void 0 }),
			onFocusCapture: b(g).onFocusCapture,
			onBlurCapture: b(g).onBlurCapture,
			onPointerdownCapture: b(h).onPointerDownCapture
		}, {
			default: se(() => [u(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as-child",
			"as",
			"style",
			"onFocusCapture",
			"onBlurCapture",
			"onPointerdownCapture"
		]));
	}
}), ft = he(() => E([]));
function pt() {
	let e = ft();
	return {
		add(t) {
			let n = e.value[0];
			t !== n && n?.pause(), e.value = mt(e.value, t), e.value.unshift(t);
		},
		remove(t) {
			e.value = mt(e.value, t), e.value[0]?.resume();
		}
	};
}
function mt(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/utils.js
var X = "focusScope.autoFocusOnMount", Z = "focusScope.autoFocusOnUnmount", ht = {
	bubbles: !1,
	cancelable: !0
};
function gt(e, { select: t = !1 } = {}) {
	let n = k();
	for (let r of e) if ($(r, { select: t }), k() !== n) return !0;
}
function _t(e) {
	let t = Q(e);
	return [vt(t, e), vt(t.reverse(), e)];
}
function Q(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function vt(e, t) {
	for (let n of e) if (!yt(n, { upTo: t })) return n;
}
function yt(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function bt(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function $(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = k();
		e.focus({ preventScroll: !0 }), e !== n && bt(e) && t && e.select();
	}
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var xt = /* @__PURE__ */ O({
	__name: "FocusScope",
	props: {
		loop: {
			type: Boolean,
			required: !1,
			default: !1
		},
		trapped: {
			type: Boolean,
			required: !1,
			default: !1
		},
		present: {
			type: Boolean,
			required: !1,
			default: !0
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
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(e, { emit: r }) {
		let i = e, a = r, { currentRef: o, currentElement: s } = H(), c = E(null), l = pt(), d = /*#__PURE__*/ w({
			paused: !1,
			pause() {
				this.paused = !0;
			},
			resume() {
				this.paused = !1;
			}
		});
		n((e) => {
			if (!M) return;
			let t = s.value;
			if (!i.trapped) return;
			function n(e) {
				if (d.paused || !t) return;
				let n = e.target;
				t.contains(n) ? c.value = n : $(c.value, { select: !0 });
			}
			function r(e) {
				if (d.paused || !t) return;
				let n = e.relatedTarget;
				n !== null && (t.contains(n) || $(c.value, { select: !0 }));
			}
			function a(e) {
				let n = c.value;
				n !== null && e.some((e) => e.removedNodes.length > 0) && (t.contains(n) || $(t));
			}
			document.addEventListener("focusin", n), document.addEventListener("focusout", r);
			let o = new MutationObserver(a);
			t && o.observe(t, {
				childList: !0,
				subtree: !0
			}), e(() => {
				document.removeEventListener("focusin", n), document.removeEventListener("focusout", r), o.disconnect();
			});
		});
		function f(e, t) {
			let n = new CustomEvent(X, ht), r = (e) => a("mountAutoFocus", e);
			e.addEventListener(X, r), e.dispatchEvent(n), e.removeEventListener(X, r), n.defaultPrevented || (gt(Q(e), { select: !0 }), k() === t && $(e));
		}
		n(async (e) => {
			let t = s.value;
			if (await S(), !t) return;
			i.present !== !1 && l.add(d);
			let n = k();
			!t.contains(n) && i.present !== !1 && f(t, n), e(() => {
				let e = new CustomEvent(Z, ht), r = (e) => {
					a("unmountAutoFocus", e);
				};
				t.addEventListener(Z, r), t.dispatchEvent(e), t.setAttribute("data-focus-scope-unmounting", ""), setTimeout(() => {
					e.defaultPrevented || $(n ?? document.body, { select: !0 }), t.removeEventListener(Z, r), l.remove(d), t.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		}), p(() => i.present, async (e, t) => {
			if (!M) return;
			if (e === !1 && t === !0) {
				l.remove(d);
				return;
			}
			if (e !== !0 || t !== !1) return;
			l.add(d), await S();
			let n = s.value;
			if (!n) return;
			let r = k();
			n.contains(r) || f(n, r);
		});
		function m(e) {
			if (!i.loop && !i.trapped || d.paused) return;
			let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = k();
			if (t && n) {
				let t = e.currentTarget, [r, a] = _t(t);
				r && a ? !e.shiftKey && n === a ? (e.preventDefault(), i.loop && $(r, { select: !0 })) : e.shiftKey && n === r && (e.preventDefault(), i.loop && $(a, { select: !0 })) : n === t && e.preventDefault();
			}
		}
		return (e, n) => (t(), x(b(J), {
			ref_key: "currentRef",
			ref: o,
			tabindex: "-1",
			"as-child": e.asChild,
			as: e.as,
			onKeydown: m
		}, {
			default: se(() => [u(e.$slots, "default")]),
			_: 3
		}, 8, ["as-child", "as"]));
	}
}), St = /* @__PURE__ */ O({
	__name: "Teleport",
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
		let n = e, r = z({}), i = T(() => n.to ?? r.teleportTo?.value ?? "body"), a = Me();
		return (e, n) => b(a) || e.forceMount ? (t(), x(y, {
			key: 0,
			to: i.value,
			disabled: e.disabled,
			defer: e.defer
		}, [u(e.$slots, "default")], 8, [
			"to",
			"disabled",
			"defer"
		])) : ne("v-if", !0);
	}
});
//#endregion
export { ke as A, me as C, De as D, Ee as E, A as M, k as N, j as O, fe as P, Re as S, Te as T, L as _, dt as a, Fe as b, it as c, Qe as d, H as f, z as g, Ve as h, Q as i, pe as j, Ae as k, rt as l, Ue as m, xt as n, Y as o, Ke as p, gt as r, J as s, St as t, et as u, F as v, M as w, Le as x, I as y };
