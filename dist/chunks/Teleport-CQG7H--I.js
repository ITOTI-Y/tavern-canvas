import { $ as e, A as t, B as n, D as r, H as i, I as a, J as o, M as s, N as c, O as l, P as u, Q as d, S as f, T as p, V as m, W as h, X as g, Y as _, at as v, ct as y, d as b, et as x, f as ee, ft as te, g as ne, h as S, j as re, k as ie, l as ae, lt as oe, mt as se, nt as C, ot as w, p as T, q as ce, r as le, st as ue, tt as de, u as fe, w as E, x as D } from "./vue-i18n-DUz2Gjn8.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/createContext.js
function pe(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
	return [(t) => {
		let n = p(r, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (u(r, e), e)];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/getActiveElement.js
function O() {
	let e = document.activeElement;
	if (e == null) return null;
	for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null;) e = e.shadowRoot.activeElement;
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function k(e, t, n) {
	let r = n.originalEvent.target, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/nullish.js
function me(e) {
	return e == null;
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+shared@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/shared/dist/index.js
function A(e, t) {
	return _() ? (d(e, t), !0) : !1;
}
function he() {
	let e = /* @__PURE__ */ new Set(), t = (t) => {
		e.delete(t);
	};
	return {
		on: (n) => {
			e.add(n);
			let r = () => t(n);
			return A(r), { off: r };
		},
		off: t,
		trigger: (...t) => Promise.all(Array.from(e).map((e) => e(...t))),
		clear: () => {
			e.clear();
		}
	};
}
function ge(e) {
	let t = !1, n, r = o(!0);
	return ((...i) => (t ||= (n = r.run(() => e(...i)), !0), n));
}
var j = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var _e = (e) => e !== void 0, ve = Object.prototype.toString, ye = (e) => ve.call(e) === "[object Object]", be = () => {}, xe = /* #__PURE__ */ Se();
function Se() {
	var e, t;
	return j && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function M(e) {
	return Array.isArray(e) ? e : [e];
}
function Ce(e) {
	return e || f();
}
function we(e) {
	if (!j) return e;
	let t = 0, n, r, i = () => {
		--t, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
	};
	return ((...a) => (t += 1, r || (r = o(!0), n = r.run(() => e(...a))), A(i), n));
}
function Te(t) {
	return g(t) ? e(new Proxy({}, {
		get(e, n, r) {
			return y(Reflect.get(t.value, n, r));
		},
		set(e, n, r) {
			return g(t.value[n]) && !g(r) ? t.value[n].value = r : t.value[n] = r, !0;
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
	})) : e(t);
}
function Ee(e) {
	return Te(T(e));
}
function De(e, ...t) {
	let n = t.flat(), r = n[0];
	return Ee(() => Object.fromEntries(typeof r == "function" ? Object.entries(v(e)).filter(([e, t]) => !r(w(t), e)) : Object.entries(v(e)).filter((e) => !n.includes(e[0]))));
}
function Oe(e, t = 1e4) {
	return ce((n, r) => {
		let i = w(e), a, o = () => setTimeout(() => {
			i = w(e), r();
		}, w(t));
		return A(() => {
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
function ke(e, t) {
	Ce(t) && ie(e, t);
}
function Ae(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = C(!1), o;
	function s() {
		o &&= (clearTimeout(o), void 0);
	}
	function c() {
		a.value = !1, s();
	}
	function l(...n) {
		i && e(), s(), a.value = !0, o = setTimeout(() => {
			a.value = !1, o = void 0, e(...n);
		}, w(t));
	}
	return r && (a.value = !0, j && l()), A(c), {
		isPending: de(a),
		start: l,
		stop: c
	};
}
function je(e = 1e3, t = {}) {
	let { controls: n = !1, callback: r } = t, i = Ae(r ?? be, e, t), a = T(() => !i.isPending.value);
	return n ? {
		ready: a,
		...i
	} : a;
}
function Me(e, t, n) {
	return m(e, t, {
		...n,
		immediate: !0
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var N = j ? window : void 0;
j && window.document, j && window.navigator, j && window.location;
function P(e) {
	let t = w(e);
	return t?.$el ?? t;
}
function F(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = T(() => {
		let t = M(w(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return Me(() => [
		n.value?.map((e) => P(e)) ?? [N].filter((e) => e != null),
		M(w(n.value ? e[1] : e[0])),
		M(y(n.value ? e[2] : e[1])),
		w(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = ye(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function Ne() {
	let e = C(!1), n = f();
	return n && t(() => {
		e.value = !0;
	}, n), e;
}
/* @__NO_SIDE_EFFECTS__ */
function Pe(e) {
	let t = Ne();
	return T(() => (t.value, !!e()));
}
function Fe(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function I(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = N, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = Fe(t);
	return F(i, a, (e) => {
		e.repeat && w(s) || c(e) && n(e);
	}, o);
}
function Ie(e, t = {}) {
	let { immediate: n = !0, fpsLimit: r = null, window: i = N, once: a = !1 } = t, o = C(!1), s = T(() => {
		let e = w(r);
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
	return n && d(), A(f), {
		isActive: de(o),
		pause: f,
		resume: d
	};
}
function Le(e) {
	return JSON.parse(JSON.stringify(e));
}
function Re(e, t, n = {}) {
	let { window: r = N, ...i } = n, a, o = /* @__PURE__ */ Pe(() => r && "ResizeObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, c = m(T(() => {
		let t = w(e);
		return Array.isArray(t) ? t.map((e) => P(e)) : [P(t)];
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
	return A(l), {
		isSupported: o,
		stop: l
	};
}
function ze(e, t, n, r = {}) {
	var i, a;
	let { clone: o = !1, passive: s = !1, eventName: c, deep: u = !1, defaultValue: d, shouldEmit: p } = r, h = f(), g = n || h?.emit || (h == null || (i = h.$emit) == null ? void 0 : i.bind(h)) || (h == null || (a = h.proxy) == null || (a = a.$emit) == null ? void 0 : a.bind(h?.proxy)), _ = c;
	t ||= "modelValue", _ ||= `update:${t.toString()}`;
	let v = (e) => o ? typeof o == "function" ? o(e) : Le(e) : e, y = () => _e(e[t]) ? v(e[t]) : d, b = (e) => {
		p ? p(e) && g(_, e) : g(_, e);
	};
	if (s) {
		let n = x(y()), r = !1;
		return m(() => e[t], (e) => {
			r || (r = !0, n.value = v(e), l(() => r = !1));
		}), m(n, (n) => {
			!r && (n !== e[t] || u) && b(n);
		}, { deep: u }), n;
	}
	return T({
		get() {
			return y();
		},
		set(e) {
			b(e);
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/renderSlotFragments.js
function L(e) {
	return e ? e.flatMap((e) => e.type === fe ? L(e.children) : [e]) : [];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [R, Be] = /*#__PURE__*/ pe("ConfigProvider");
//#endregion
//#region ../../node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function z(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function B(e, t, n = ".", r) {
	if (!z(t)) return B(e, {}, n, r);
	let i = { ...t };
	for (let t of Object.keys(e)) {
		if (t === "__proto__" || t === "constructor") continue;
		let a = e[t];
		a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : z(a) && z(i[t]) ? B(a, i[t], (n ? `${n}.` : "") + t.toString(), r) : a));
	}
	return i;
}
function Ve(e) {
	return (...t) => t.reduce((t, n) => B(t, n, "", e), {});
}
var He = Ve(), Ue = we(() => {
	let e = x(/* @__PURE__ */ new Map()), t = x(), n = T(() => {
		for (let t of e.value.values()) if (t) return !0;
		return !1;
	}), r = R({ scrollBody: x(!0) }), i = null, a = () => {
		document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", xe && i?.(), t.value = void 0;
	};
	return m(n, (e, o) => {
		if (!j) return;
		if (!e) {
			o && a();
			return;
		}
		t.value === void 0 && (t.value = document.body.style.overflow);
		let s = window.innerWidth - document.documentElement.clientWidth, c = {
			padding: s,
			margin: 0
		}, u = r.scrollBody?.value ? typeof r.scrollBody.value == "object" ? He({
			padding: r.scrollBody.value.padding === !0 ? s : r.scrollBody.value.padding,
			margin: r.scrollBody.value.margin === !0 ? s : r.scrollBody.value.margin
		}, c) : c : {
			padding: 0,
			margin: 0
		};
		s > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.documentElement.style.setProperty("--scrollbar-width", `${s}px`), document.body.style.overflow = "hidden"), xe && (i = F(document, "touchmove", (e) => Ke(e), { passive: !1 })), l(() => {
			n.value && (document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden");
		});
	}, {
		immediate: !0,
		flush: "sync"
	}), e;
});
function We(e) {
	let t = Math.random().toString(36).substring(2, 7), n = Ue();
	n.value.set(t, e ?? !1);
	let r = T({
		get: () => n.value.get(t) ?? !1,
		set: (e) => n.value.set(t, e)
	});
	return ke(() => {
		n.value.delete(t);
	}), r;
}
function Ge(e) {
	let t = window.getComputedStyle(e);
	if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
	{
		let t = e.parentNode;
		return !(t instanceof Element) || t.tagName === "BODY" ? !1 : Ge(t);
	}
}
function Ke(e) {
	let t = e || window.event, n = t.target;
	return n instanceof Element && Ge(n) ? !1 : t.touches.length > 1 || (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useEmitAsProps.js
function qe(e) {
	let t = f(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[se(oe(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function V() {
	let e = f(), t = x(), n = T(() => r());
	s(() => {
		n.value !== r() && ue(t);
	});
	function r() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : P(t);
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
var Je = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, H = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), W = {}, G = 0, Ye = function(e) {
	return e && (e.host || Ye(e.parentNode));
}, Xe = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = Ye(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, Ze = function(e, t, n, r) {
	var i = Xe(t, Array.isArray(e) ? e : [e]);
	W[n] || (W[n] = /* @__PURE__ */ new WeakMap());
	var a = W[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (H.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				H.set(e, c), a.set(e, l), o.push(e), c === 1 && i && U.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), G++, function() {
		o.forEach(function(e) {
			var t = H.get(e) - 1, i = a.get(e) - 1;
			H.set(e, t), a.set(e, i), t || (U.has(e) || e.removeAttribute(r), U.delete(e)), i || e.removeAttribute(n);
		}), G--, G || (H = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), W = {});
	};
}, Qe = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || Je(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), Ze(r, i, n, "aria-hidden")) : function() {
		return null;
	};
};
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useHideOthers.js
function $e(e) {
	let t;
	m(() => P(e), (e) => {
		let n = !1;
		try {
			n = !!e?.closest("[popover]:not(:popover-open)");
		} catch {}
		e && !n ? t = Qe(e) : t && t();
	}), re(() => {
		t && t();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var et = 0;
function tt(e, t = "reka") {
	if (e) return e;
	let r, i = R({ useId: void 0 });
	return r = i.useId ? i.useId() : "useId" in le ? n?.() : `${++et}`, t ? `${t}-${r}` : r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
function nt(e, t) {
	let n = x(e);
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
function rt(e, t) {
	let n = x({}), r = x("none"), i = x(e), a = e.value ? "mounted" : "unmounted", o, s = t.value?.ownerDocument.defaultView ?? N, { state: c, dispatch: u } = nt(a, {
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
		if (j) {
			let n = new CustomEvent(e, {
				bubbles: !1,
				cancelable: !1
			});
			t.value?.dispatchEvent(n);
		}
	};
	m(e, async (e, i) => {
		let a = i !== e;
		if (await l(), a) {
			let a = r.value, o = K(t.value);
			e ? (u("MOUNT"), d("enter"), o === "none" && d("after-enter")) : o === "none" || o === "undefined" || n.value?.display === "none" ? (u("UNMOUNT"), d("leave"), d("after-leave")) : i && a !== o ? (u("ANIMATION_OUT"), d("leave")) : (u("UNMOUNT"), d("after-leave"));
		}
	}, { immediate: !0 });
	let f = (e) => {
		let n = K(t.value), r = n.includes(CSS.escape(e.animationName)), a = c.value === "mounted" ? "enter" : "leave";
		if (e.target === t.value && r && (d(`after-${a}`), u("ANIMATION_END"), !i.value)) {
			let e = t.value.style.animationFillMode;
			t.value.style.animationFillMode = "forwards", o = s?.setTimeout(() => {
				t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = e);
			});
		}
		e.target === t.value && n === "none" && u("ANIMATION_END");
	}, p = (e) => {
		e.target === t.value && (r.value = K(t.value));
	}, h = m(t, (e, t) => {
		e ? (n.value = getComputedStyle(e), e.addEventListener("animationstart", p), e.addEventListener("animationcancel", f), e.addEventListener("animationend", f)) : (u("ANIMATION_END"), o !== void 0 && s?.clearTimeout(o), t?.removeEventListener("animationstart", p), t?.removeEventListener("animationcancel", f), t?.removeEventListener("animationend", f));
	}, { immediate: !0 }), g = m(c, () => {
		let e = K(t.value);
		r.value = c.value === "mounted" ? e : "none";
	});
	return re(() => {
		h(), g(), t.value && (t.value.removeEventListener("animationstart", p), t.value.removeEventListener("animationcancel", f), t.value.removeEventListener("animationend", f)), o !== void 0 && s?.clearTimeout(o);
	}), { isPresent: T(() => ["mounted", "unmountSuspended"].includes(c.value)) };
}
function K(e) {
	return e && getComputedStyle(e).animationName || "none";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/Presence.js
var it = /*#__PURE__*/ D({
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
		let { present: r, forceMount: i } = v(e), a = x(), { isPresent: o } = rt(r, a);
		n({ present: o });
		let s = t.default({ present: o.value });
		s = L(s || []);
		let c = f();
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
		return () => i.value || r.value || o.value ? E(t.default({ present: o.value })[0], { ref: (e) => {
			let t = P(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? a.value = t.firstElementChild : a.value = t), t;
		} }) : null;
	}
}), at = /*#__PURE__*/ D({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			if (!n.default) return null;
			let e = L(n.default()), i = e.findIndex((e) => e.type !== ae);
			if (i === -1) return e;
			let a = e[i];
			delete a.props?.ref;
			let o = a.props ? r(t, a.props) : t, s = ee({
				...a,
				props: {}
			}, o);
			return e.length === 1 ? s : (e[i] = s, e);
		};
	}
}), ot = [
	"area",
	"img",
	"input"
], q = /*#__PURE__*/ D({
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
		return typeof r == "string" && ot.includes(r) ? () => E(r, t) : r === "template" ? () => E(at, t, { default: n.default }) : () => E(e.as, t, { default: n.default });
	}
}), st = "dismissableLayer.pointerDownOutside", ct = "dismissableLayer.focusOutside";
function lt(e, t) {
	if (!(t instanceof Element)) return !1;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function ut(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, a = x(!1), o = x(() => {});
	return i((i) => {
		if (!j || !w(n)) return;
		let s = async (n) => {
			let i = n.target;
			if (!(!t?.value || !i)) {
				if (lt(t.value, i)) {
					a.value = !1;
					return;
				}
				if (n.target && !a.value) {
					let t = { originalEvent: n };
					function i() {
						k(st, e, t);
					}
					n.pointerType === "touch" ? (r.removeEventListener("click", o.value), o.value = i, r.addEventListener("click", o.value, { once: !0 })) : i();
				} else r.removeEventListener("click", o.value);
				a.value = !1;
			}
		}, c = window.setTimeout(() => {
			r.addEventListener("pointerdown", s);
		}, 0);
		i(() => {
			window.clearTimeout(c), r.removeEventListener("pointerdown", s), r.removeEventListener("click", o.value);
		});
	}), { onPointerDownCapture: () => {
		w(n) && (a.value = !0);
	} };
}
function dt(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, a = x(!1);
	return i((i) => {
		if (!j || !w(n)) return;
		let o = async (n) => {
			if (!t?.value) return;
			await l(), await l();
			let r = n.target;
			!t.value || !r || lt(t.value, r) || n.target && !a.value && k(ct, e, { originalEvent: n });
		};
		r.addEventListener("focusin", o), i(() => r.removeEventListener("focusin", o));
	}), {
		onFocusCapture: () => {
			w(n) && (a.value = !0);
		},
		onBlurCapture: () => {
			w(n) && (a.value = !1);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var J = /*#__PURE__*/ e({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
}), ft = /* @__PURE__ */ D({
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
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: o, currentElement: s } = V(), u = T(() => s.value?.ownerDocument ?? globalThis.document), d = T(() => J.layersRoot), f = T(() => s.value ? Array.from(d.value).indexOf(s.value) : -1), p = T(() => J.layersWithOutsidePointerEventsDisabled.size > 0), g = T(() => {
			let e = Array.from(d.value), [t] = [...J.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return f.value >= n;
		}), _ = ut(async (e) => {
			let t = [...J.branches].some((t) => t?.contains(e.target));
			!n.present || !g.value || t || (r("pointerDownOutside", e), r("interactOutside", e), await l(), e.defaultPrevented || r("dismiss"));
		}, s), v = dt((e) => {
			let t = [...J.branches].some((t) => t?.contains(e.target));
			!n.present || t || (r("focusOutside", e), r("interactOutside", e), e.defaultPrevented || r("dismiss"));
		}, s);
		return I("Escape", (e) => {
			n.present && f.value === d.value.size - 1 && (r("escapeKeyDown", e), e.defaultPrevented || r("dismiss"));
		}), m([
			s,
			() => n.disableOutsidePointerEvents,
			() => n.present
		], ([e, t, n], r, i) => {
			!e || !n || t && (J.layersWithOutsidePointerEventsDisabled.size === 0 && (J.originalBodyPointerEvents = u.value.body.style.pointerEvents, u.value.body.style.pointerEvents = "none"), J.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				J.layersWithOutsidePointerEventsDisabled.delete(e), J.layersWithOutsidePointerEventsDisabled.size === 0 && !me(J.originalBodyPointerEvents) && (u.value.body.style.pointerEvents = J.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), m([s, () => n.present], ([e, t], n, r) => {
			!e || !t || (d.value.add(e), r(() => {
				d.value.delete(e);
			}));
		}, { immediate: !0 }), i((e) => {
			e(() => {
				s.value && (d.value.delete(s.value), J.layersWithOutsidePointerEventsDisabled.delete(s.value));
			});
		}), (e, t) => (c(), S(y(q), {
			ref: y(o),
			"as-child": e.asChild,
			as: e.as,
			"data-dismissable-layer": "",
			style: te({ pointerEvents: p.value ? g.value ? "auto" : "none" : void 0 }),
			onFocusCapture: y(v).onFocusCapture,
			onBlurCapture: y(v).onBlurCapture,
			onPointerdownCapture: y(_).onPointerDownCapture
		}, {
			default: h(() => [a(e.$slots, "default")]),
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
}), pt = ge(() => x([]));
function mt() {
	let e = pt();
	return {
		add(t) {
			let n = e.value[0];
			t !== n && n?.pause(), e.value = ht(e.value, t), e.value.unshift(t);
		},
		remove(t) {
			e.value = ht(e.value, t), e.value[0]?.resume();
		}
	};
}
function ht(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/utils.js
var Y = "focusScope.autoFocusOnMount", X = "focusScope.autoFocusOnUnmount", gt = {
	bubbles: !1,
	cancelable: !0
};
function _t(e, { select: t = !1 } = {}) {
	let n = O();
	for (let r of e) if ($(r, { select: t }), O() !== n) return !0;
}
function vt(e) {
	let t = Z(e);
	return [Q(t, e), Q(t.reverse(), e)];
}
function Z(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function Q(e, t) {
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
		let n = O();
		e.focus({ preventScroll: !0 }), e !== n && bt(e) && t && e.select();
	}
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var xt = /* @__PURE__ */ D({
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
	setup(t, { emit: n }) {
		let r = t, o = n, { currentRef: s, currentElement: u } = V(), d = x(null), f = mt(), p = /*#__PURE__*/ e({
			paused: !1,
			pause() {
				this.paused = !0;
			},
			resume() {
				this.paused = !1;
			}
		});
		i((e) => {
			if (!j) return;
			let t = u.value;
			if (!r.trapped) return;
			function n(e) {
				if (p.paused || !t) return;
				let n = e.target;
				t.contains(n) ? d.value = n : $(d.value, { select: !0 });
			}
			function i(e) {
				if (p.paused || !t) return;
				let n = e.relatedTarget;
				n !== null && (t.contains(n) || $(d.value, { select: !0 }));
			}
			function a(e) {
				let n = d.value;
				n !== null && e.some((e) => e.removedNodes.length > 0) && (t.contains(n) || $(t));
			}
			document.addEventListener("focusin", n), document.addEventListener("focusout", i);
			let o = new MutationObserver(a);
			t && o.observe(t, {
				childList: !0,
				subtree: !0
			}), e(() => {
				document.removeEventListener("focusin", n), document.removeEventListener("focusout", i), o.disconnect();
			});
		});
		function g(e, t) {
			let n = new CustomEvent(Y, gt), r = (e) => o("mountAutoFocus", e);
			e.addEventListener(Y, r), e.dispatchEvent(n), e.removeEventListener(Y, r), n.defaultPrevented || (_t(Z(e), { select: !0 }), O() === t && $(e));
		}
		i(async (e) => {
			let t = u.value;
			if (await l(), !t) return;
			r.present !== !1 && f.add(p);
			let n = O();
			!t.contains(n) && r.present !== !1 && g(t, n), e(() => {
				let e = new CustomEvent(X, gt), r = (e) => {
					o("unmountAutoFocus", e);
				};
				t.addEventListener(X, r), t.dispatchEvent(e), t.setAttribute("data-focus-scope-unmounting", ""), setTimeout(() => {
					e.defaultPrevented || $(n ?? document.body, { select: !0 }), t.removeEventListener(X, r), f.remove(p), t.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		}), m(() => r.present, async (e, t) => {
			if (!j) return;
			if (e === !1 && t === !0) {
				f.remove(p);
				return;
			}
			if (e !== !0 || t !== !1) return;
			f.add(p), await l();
			let n = u.value;
			if (!n) return;
			let r = O();
			n.contains(r) || g(n, r);
		});
		function _(e) {
			if (!r.loop && !r.trapped || p.paused) return;
			let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = O();
			if (t && n) {
				let t = e.currentTarget, [i, a] = vt(t);
				i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r.loop && $(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r.loop && $(a, { select: !0 })) : n === t && e.preventDefault();
			}
		}
		return (e, t) => (c(), S(y(q), {
			ref_key: "currentRef",
			ref: s,
			tabindex: "-1",
			"as-child": e.asChild,
			as: e.as,
			onKeydown: _
		}, {
			default: h(() => [a(e.$slots, "default")]),
			_: 3
		}, 8, ["as-child", "as"]));
	}
}), St = /* @__PURE__ */ D({
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
		let t = e, n = R({}), r = T(() => t.to ?? n.teleportTo?.value ?? "body"), i = Ne();
		return (e, t) => y(i) || e.forceMount ? (c(), S(b, {
			key: 0,
			to: r.value,
			disabled: e.disabled,
			defer: e.defer
		}, [a(e.$slots, "default")], 8, [
			"to",
			"disabled",
			"defer"
		])) : ne("v-if", !0);
	}
});
//#endregion
export { Ae as A, he as C, Oe as D, De as E, k as M, O as N, A as O, pe as P, ze as S, Ee as T, I as _, ft as a, Ie as b, at as c, $e as d, V as f, R as g, He as h, Z as i, me as j, je as k, it as l, We as m, xt as n, J as o, qe as p, _t as r, q as s, St as t, tt as u, P as v, j as w, Re as x, F as y };
