import { $ as e, A as t, C as n, E as r, F as i, G as a, I as o, J as s, K as c, L as l, M as u, N as d, P as f, Q as p, S as m, T as h, U as g, Z as _, _ as ee, at as v, d as y, dt as te, et as b, f as ne, ft as x, g as S, gt as re, it as C, k as ie, lt as w, m as T, nt as ae, ot as E, p as oe, pt as se, r as ce, rt as D, u as le, ut as O, vt as ue, z as k } from "./vue-i18n-BQWz_HuU.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/createContext.js
function de(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, i = Symbol(n);
	return [(t) => {
		let n = r(i, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${i.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (l(i, e), e)];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/getActiveElement.js
function A() {
	let e = document.activeElement;
	if (e == null) return null;
	for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null;) e = e.shadowRoot.activeElement;
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function j(e, t, n) {
	let r = n.originalEvent.target, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/nullish.js
function fe(e) {
	return e == null;
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+shared@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/shared/dist/index.js
function M(t, n) {
	return e() ? (ae(t, n), !0) : !1;
}
function pe() {
	let e = /* @__PURE__ */ new Set(), t = (t) => {
		e.delete(t);
	};
	return {
		on: (n) => {
			e.add(n);
			let r = () => t(n);
			return M(r), { off: r };
		},
		off: t,
		trigger: (...t) => Promise.all(Array.from(e).map((e) => e(...t))),
		clear: () => {
			e.clear();
		}
	};
}
function me(e) {
	let t = !1, n, r = p(!0);
	return ((...i) => (t ||= (n = r.run(() => e(...i)), !0), n));
}
var N = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var he = (e) => e !== void 0, ge = Object.prototype.toString, _e = (e) => ge.call(e) === "[object Object]", ve = () => {}, ye = /* #__PURE__ */ be();
function be() {
	var e, t;
	return N && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function P(e) {
	return Array.isArray(e) ? e : [e];
}
function xe(e) {
	return e || n();
}
function Se(e) {
	if (!N) return e;
	let t = 0, n, r, i = () => {
		--t, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
	};
	return ((...a) => (t += 1, r || (r = p(!0), n = r.run(() => e(...a))), M(i), n));
}
function Ce(e) {
	return b(e) ? D(new Proxy({}, {
		get(t, n, r) {
			return x(Reflect.get(e.value, n, r));
		},
		set(t, n, r) {
			return b(e.value[n]) && !b(r) ? e.value[n].value = r : e.value[n] = r, !0;
		},
		deleteProperty(t, n) {
			return Reflect.deleteProperty(e.value, n);
		},
		has(t, n) {
			return Reflect.has(e.value, n);
		},
		ownKeys() {
			return Object.keys(e.value);
		},
		getOwnPropertyDescriptor() {
			return {
				enumerable: !0,
				configurable: !0
			};
		}
	})) : D(e);
}
function we(e) {
	return Ce(T(e));
}
function Te(e, ...t) {
	let n = t.flat(), r = n[0];
	return we(() => Object.fromEntries(typeof r == "function" ? Object.entries(w(e)).filter(([e, t]) => !r(O(t), e)) : Object.entries(w(e)).filter((e) => !n.includes(e[0]))));
}
function Ee(e, t = 1e4) {
	return _((n, r) => {
		let i = O(e), a, o = () => setTimeout(() => {
			i = O(e), r();
		}, O(t));
		return M(() => {
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
function De(e, t) {
	xe(t) && u(e, t);
}
function Oe(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = E(!1), o;
	function s() {
		o &&= (clearTimeout(o), void 0);
	}
	function c() {
		a.value = !1, s();
	}
	function l(...n) {
		i && e(), s(), a.value = !0, o = setTimeout(() => {
			a.value = !1, o = void 0, e(...n);
		}, O(t));
	}
	return r && (a.value = !0, N && l()), M(c), {
		isPending: v(a),
		start: l,
		stop: c
	};
}
function ke(e = 1e3, t = {}) {
	let { controls: n = !1, callback: r } = t, i = Oe(r ?? ve, e, t), a = T(() => !i.isPending.value);
	return n ? {
		ready: a,
		...i
	} : a;
}
function Ae(e, t, n) {
	return a(e, t, {
		...n,
		immediate: !0
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var F = N ? window : void 0;
N && window.document, N && window.navigator, N && window.location;
function I(e) {
	let t = O(e);
	return t?.$el ?? t;
}
function L(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = T(() => {
		let t = P(O(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return Ae(() => [
		n.value?.map((e) => I(e)) ?? [F].filter((e) => e != null),
		P(O(n.value ? e[1] : e[0])),
		P(x(n.value ? e[2] : e[1])),
		O(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = _e(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function je() {
	let e = E(!1), t = n();
	return t && d(() => {
		e.value = !0;
	}, t), e;
}
/* @__NO_SIDE_EFFECTS__ */
function Me(e) {
	let t = je();
	return T(() => (t.value, !!e()));
}
function Ne(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Pe(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = F, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = Ne(t);
	return L(i, a, (e) => {
		e.repeat && O(s) || c(e) && n(e);
	}, o);
}
function Fe(e, t = {}) {
	let { immediate: n = !0, fpsLimit: r = null, window: i = F, once: a = !1 } = t, o = E(!1), s = T(() => {
		let e = O(r);
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
	return n && d(), M(f), {
		isActive: v(o),
		pause: f,
		resume: d
	};
}
function Ie(e) {
	return JSON.parse(JSON.stringify(e));
}
function Le(e, t, n = {}) {
	let { window: r = F, ...i } = n, o, s = /* @__PURE__ */ Me(() => r && "ResizeObserver" in r), c = () => {
		o &&= (o.disconnect(), void 0);
	}, l = a(T(() => {
		let t = O(e);
		return Array.isArray(t) ? t.map((e) => I(e)) : [I(t)];
	}), (e) => {
		if (c(), s.value && r) {
			o = new ResizeObserver(t);
			for (let t of e) t && o.observe(t, i);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), u = () => {
		c(), l();
	};
	return M(u), {
		isSupported: s,
		stop: u
	};
}
function Re(e, r, i, o = {}) {
	var s, c;
	let { clone: l = !1, passive: u = !1, eventName: d, deep: f = !1, defaultValue: p, shouldEmit: m } = o, h = n(), g = i || h?.emit || (h == null || (s = h.$emit) == null ? void 0 : s.bind(h)) || (h == null || (c = h.proxy) == null || (c = c.$emit) == null ? void 0 : c.bind(h?.proxy)), _ = d;
	r ||= "modelValue", _ ||= `update:${r.toString()}`;
	let ee = (e) => l ? typeof l == "function" ? l(e) : Ie(e) : e, v = () => he(e[r]) ? ee(e[r]) : p, y = (e) => {
		m ? m(e) && g(_, e) : g(_, e);
	};
	if (u) {
		let n = C(v()), i = !1;
		return a(() => e[r], (e) => {
			i || (i = !0, n.value = ee(e), t(() => i = !1));
		}), a(n, (t) => {
			!i && (t !== e[r] || f) && y(t);
		}, { deep: f }), n;
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
	return e ? e.flatMap((e) => e.type === y ? R(e.children) : [e]) : [];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [z, ze] = /*#__PURE__*/ de("ConfigProvider");
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
var Ve = Be(), He = Se(() => {
	let e = C(/* @__PURE__ */ new Map()), n = C(), r = T(() => {
		for (let t of e.value.values()) if (t) return !0;
		return !1;
	}), i = z({ scrollBody: C(!0) }), o = null, s = () => {
		document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = n.value ?? "", ye && o?.(), n.value = void 0;
	};
	return a(r, (e, a) => {
		if (!N) return;
		if (!e) {
			a && s();
			return;
		}
		n.value === void 0 && (n.value = document.body.style.overflow);
		let c = window.innerWidth - document.documentElement.clientWidth, l = {
			padding: c,
			margin: 0
		}, u = i.scrollBody?.value ? typeof i.scrollBody.value == "object" ? Ve({
			padding: i.scrollBody.value.padding === !0 ? c : i.scrollBody.value.padding,
			margin: i.scrollBody.value.margin === !0 ? c : i.scrollBody.value.margin
		}, l) : l : {
			padding: 0,
			margin: 0
		};
		c > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.documentElement.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), ye && (o = L(document, "touchmove", (e) => Ge(e), { passive: !1 })), t(() => {
			r.value && (document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden");
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
	return De(() => {
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
	let t = n(), r = t?.type.emits, i = {};
	return r?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), r?.forEach((t) => {
		i[ue(se(t))] = (...n) => e(t, ...n);
	}), i;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function H() {
	let e = n(), t = C(), r = T(() => a());
	i(() => {
		r.value !== a() && te(t);
	});
	function a() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : I(t);
	}
	let o = Object.assign({}, e.exposed), s = {};
	for (let t in e.props) Object.defineProperty(s, t, {
		enumerable: !0,
		configurable: !0,
		get: () => e.props[t]
	});
	if (Object.keys(o).length > 0) for (let e in o) Object.defineProperty(s, e, {
		enumerable: !0,
		configurable: !0,
		get: () => o[e]
	});
	Object.defineProperty(s, "$el", {
		enumerable: !0,
		configurable: !0,
		get: () => e.vnode.el
	}), e.exposed = s;
	function c(n) {
		if (t.value = n, n && (Object.defineProperty(s, "$el", {
			enumerable: !0,
			configurable: !0,
			get: () => n instanceof Element ? n : n.$el
		}), !(n instanceof Element) && !Object.hasOwn(n, "$el"))) {
			let t = n.$.exposed, r = Object.assign({}, s);
			for (let e in t) Object.defineProperty(r, e, {
				enumerable: !0,
				configurable: !0,
				get: () => t[e]
			});
			e.exposed = r;
		}
	}
	return {
		forwardRef: c,
		currentRef: t,
		currentElement: r
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
	a(() => I(e), (e) => {
		let n = !1;
		try {
			n = !!e?.closest("[popover]:not(:popover-open)");
		} catch {}
		e && !n ? t = Ze(e) : t && t();
	}), f(() => {
		t && t();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var $e = 0;
function et(e, t = "reka") {
	if (e) return e;
	let n, r = z({ useId: void 0 });
	return n = r.useId ? r.useId() : "useId" in ce ? g?.() : `${++$e}`, t ? `${t}-${n}` : n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
function tt(e, t) {
	let n = C(e);
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
function nt(e, n) {
	let r = C({}), i = C("none"), o = C(e), s = e.value ? "mounted" : "unmounted", c, l = n.value?.ownerDocument.defaultView ?? F, { state: u, dispatch: d } = tt(s, {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	}), p = (e) => {
		if (N) {
			let t = new CustomEvent(e, {
				bubbles: !1,
				cancelable: !1
			});
			n.value?.dispatchEvent(t);
		}
	};
	a(e, async (e, a) => {
		let o = a !== e;
		if (await t(), o) {
			let t = i.value, o = q(n.value);
			e ? (d("MOUNT"), p("enter"), o === "none" && p("after-enter")) : o === "none" || o === "undefined" || r.value?.display === "none" ? (d("UNMOUNT"), p("leave"), p("after-leave")) : a && t !== o ? (d("ANIMATION_OUT"), p("leave")) : (d("UNMOUNT"), p("after-leave"));
		}
	}, { immediate: !0 });
	let m = (e) => {
		let t = q(n.value), r = t.includes(CSS.escape(e.animationName)), i = u.value === "mounted" ? "enter" : "leave";
		if (e.target === n.value && r && (p(`after-${i}`), d("ANIMATION_END"), !o.value)) {
			let e = n.value.style.animationFillMode;
			n.value.style.animationFillMode = "forwards", c = l?.setTimeout(() => {
				n.value?.style.animationFillMode === "forwards" && (n.value.style.animationFillMode = e);
			});
		}
		e.target === n.value && t === "none" && d("ANIMATION_END");
	}, h = (e) => {
		e.target === n.value && (i.value = q(n.value));
	}, g = a(n, (e, t) => {
		e ? (r.value = getComputedStyle(e), e.addEventListener("animationstart", h), e.addEventListener("animationcancel", m), e.addEventListener("animationend", m)) : (d("ANIMATION_END"), c !== void 0 && l?.clearTimeout(c), t?.removeEventListener("animationstart", h), t?.removeEventListener("animationcancel", m), t?.removeEventListener("animationend", m));
	}, { immediate: !0 }), _ = a(u, () => {
		let e = q(n.value);
		i.value = u.value === "mounted" ? e : "none";
	});
	return f(() => {
		g(), _(), n.value && (n.value.removeEventListener("animationstart", h), n.value.removeEventListener("animationcancel", m), n.value.removeEventListener("animationend", m)), c !== void 0 && l?.clearTimeout(c);
	}), { isPresent: T(() => ["mounted", "unmountSuspended"].includes(u.value)) };
}
function q(e) {
	return e && getComputedStyle(e).animationName || "none";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/Presence.js
var rt = /*#__PURE__*/ m({
	name: "Presence",
	props: {
		present: {
			type: Boolean,
			required: !0
		},
		forceMount: { type: Boolean }
	},
	slots: {},
	setup(e, { slots: t, expose: r }) {
		let { present: i, forceMount: a } = w(e), o = C(), { isPresent: s } = nt(i, o);
		r({ present: s });
		let c = t.default({ present: s.value });
		c = R(c || []);
		let l = n();
		if (c && c?.length > 1) {
			let e = l?.parent?.type.name ? `<${l.parent.type.name} />` : "component";
			throw Error([
				`Detected an invalid children for \`${e}\` for  \`Presence\` component.`,
				"",
				"Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
				"You can apply a few solutions:",
				["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((e) => `  - ${e}`).join("\n")
			].join("\n"));
		}
		return () => a.value || i.value || s.value ? h(t.default({ present: s.value })[0], { ref: (e) => {
			let t = I(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? o.value = t.firstElementChild : o.value = t), t;
		} }) : null;
	}
}), it = /*#__PURE__*/ m({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			if (!n.default) return null;
			let e = R(n.default()), r = e.findIndex((e) => e.type !== le);
			if (r === -1) return e;
			let i = e[r];
			delete i.props?.ref;
			let a = i.props ? ie(t, i.props) : t, o = oe({
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
], J = /*#__PURE__*/ m({
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
		return typeof r == "string" && at.includes(r) ? () => h(r, t) : r === "template" ? () => h(it, t, { default: n.default }) : () => h(e.as, t, { default: n.default });
	}
}), ot = "dismissableLayer.pointerDownOutside", st = "dismissableLayer.focusOutside";
function ct(e, t) {
	if (!(t instanceof Element)) return !1;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function lt(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = C(!1), a = C(() => {});
	return c((o) => {
		if (!N || !O(n)) return;
		let s = async (n) => {
			let o = n.target;
			if (!(!t?.value || !o)) {
				if (ct(t.value, o)) {
					i.value = !1;
					return;
				}
				if (n.target && !i.value) {
					let t = { originalEvent: n };
					function i() {
						j(ot, e, t);
					}
					n.pointerType === "touch" ? (r.removeEventListener("click", a.value), a.value = i, r.addEventListener("click", a.value, { once: !0 })) : i();
				} else r.removeEventListener("click", a.value);
				i.value = !1;
			}
		}, c = window.setTimeout(() => {
			r.addEventListener("pointerdown", s);
		}, 0);
		o(() => {
			window.clearTimeout(c), r.removeEventListener("pointerdown", s), r.removeEventListener("click", a.value);
		});
	}), { onPointerDownCapture: () => {
		O(n) && (i.value = !0);
	} };
}
function ut(e, n, r = !0) {
	let i = n?.value?.ownerDocument ?? globalThis?.document, a = C(!1);
	return c((o) => {
		if (!N || !O(r)) return;
		let s = async (r) => {
			if (!n?.value) return;
			await t(), await t();
			let i = r.target;
			!n.value || !i || ct(n.value, i) || r.target && !a.value && j(st, e, { originalEvent: r });
		};
		i.addEventListener("focusin", s), o(() => i.removeEventListener("focusin", s));
	}), {
		onFocusCapture: () => {
			O(r) && (a.value = !0);
		},
		onBlurCapture: () => {
			O(r) && (a.value = !1);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var Y = /*#__PURE__*/ D({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
}), dt = /* @__PURE__ */ m({
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
	setup(e, { emit: n }) {
		let r = e, i = n, { forwardRef: l, currentElement: u } = H(), d = T(() => u.value?.ownerDocument ?? globalThis.document), f = T(() => Y.layersRoot), p = T(() => u.value ? Array.from(f.value).indexOf(u.value) : -1), m = T(() => Y.layersWithOutsidePointerEventsDisabled.size > 0), h = T(() => {
			let e = Array.from(f.value), [t] = [...Y.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return p.value >= n;
		}), g = lt(async (e) => {
			let n = [...Y.branches].some((t) => t?.contains(e.target));
			!r.present || !h.value || n || (i("pointerDownOutside", e), i("interactOutside", e), await t(), e.defaultPrevented || i("dismiss"));
		}, u), _ = ut((e) => {
			let t = [...Y.branches].some((t) => t?.contains(e.target));
			!r.present || t || (i("focusOutside", e), i("interactOutside", e), e.defaultPrevented || i("dismiss"));
		}, u);
		return Pe("Escape", (e) => {
			r.present && p.value === f.value.size - 1 && (i("escapeKeyDown", e), e.defaultPrevented || i("dismiss"));
		}), a([
			u,
			() => r.disableOutsidePointerEvents,
			() => r.present
		], ([e, t, n], r, i) => {
			!e || !n || t && (Y.layersWithOutsidePointerEventsDisabled.size === 0 && (Y.originalBodyPointerEvents = d.value.body.style.pointerEvents, d.value.body.style.pointerEvents = "none"), Y.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				Y.layersWithOutsidePointerEventsDisabled.delete(e), Y.layersWithOutsidePointerEventsDisabled.size === 0 && !fe(Y.originalBodyPointerEvents) && (d.value.body.style.pointerEvents = Y.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), a([u, () => r.present], ([e, t], n, r) => {
			!e || !t || (f.value.add(e), r(() => {
				f.value.delete(e);
			}));
		}, { immediate: !0 }), c((e) => {
			e(() => {
				u.value && (f.value.delete(u.value), Y.layersWithOutsidePointerEventsDisabled.delete(u.value));
			});
		}), (e, t) => (o(), S(x(J), {
			ref: x(l),
			"as-child": e.asChild,
			as: e.as,
			"data-dismissable-layer": "",
			style: re({ pointerEvents: m.value ? h.value ? "auto" : "none" : void 0 }),
			onFocusCapture: x(_).onFocusCapture,
			onBlurCapture: x(_).onBlurCapture,
			onPointerdownCapture: x(g).onPointerDownCapture
		}, {
			default: s(() => [k(e.$slots, "default")]),
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
}), ft = me(() => C([]));
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
	let n = A();
	for (let r of e) if ($(r, { select: t }), A() !== n) return !0;
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
		let n = A();
		e.focus({ preventScroll: !0 }), e !== n && bt(e) && t && e.select();
	}
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var xt = /* @__PURE__ */ m({
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
	setup(e, { emit: n }) {
		let r = e, i = n, { currentRef: l, currentElement: u } = H(), d = C(null), f = pt(), p = /*#__PURE__*/ D({
			paused: !1,
			pause() {
				this.paused = !0;
			},
			resume() {
				this.paused = !1;
			}
		});
		c((e) => {
			if (!N) return;
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
		function m(e, t) {
			let n = new CustomEvent(X, ht), r = (e) => i("mountAutoFocus", e);
			e.addEventListener(X, r), e.dispatchEvent(n), e.removeEventListener(X, r), n.defaultPrevented || (gt(Q(e), { select: !0 }), A() === t && $(e));
		}
		c(async (e) => {
			let n = u.value;
			if (await t(), !n) return;
			r.present !== !1 && f.add(p);
			let a = A();
			!n.contains(a) && r.present !== !1 && m(n, a), e(() => {
				let e = new CustomEvent(Z, ht), t = (e) => {
					i("unmountAutoFocus", e);
				};
				n.addEventListener(Z, t), n.dispatchEvent(e), n.setAttribute("data-focus-scope-unmounting", ""), setTimeout(() => {
					e.defaultPrevented || $(a ?? document.body, { select: !0 }), n.removeEventListener(Z, t), f.remove(p), n.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		}), a(() => r.present, async (e, n) => {
			if (!N) return;
			if (e === !1 && n === !0) {
				f.remove(p);
				return;
			}
			if (e !== !0 || n !== !1) return;
			f.add(p), await t();
			let r = u.value;
			if (!r) return;
			let i = A();
			r.contains(i) || m(r, i);
		});
		function h(e) {
			if (!r.loop && !r.trapped || p.paused) return;
			let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = A();
			if (t && n) {
				let t = e.currentTarget, [i, a] = _t(t);
				i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r.loop && $(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r.loop && $(a, { select: !0 })) : n === t && e.preventDefault();
			}
		}
		return (e, t) => (o(), S(x(J), {
			ref_key: "currentRef",
			ref: l,
			tabindex: "-1",
			"as-child": e.asChild,
			as: e.as,
			onKeydown: h
		}, {
			default: s(() => [k(e.$slots, "default")]),
			_: 3
		}, 8, ["as-child", "as"]));
	}
}), St = /* @__PURE__ */ m({
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
		let t = e, n = z({}), r = T(() => t.to ?? n.teleportTo?.value ?? "body"), i = je();
		return (e, t) => x(i) || e.forceMount ? (o(), S(ne, {
			key: 0,
			to: r.value,
			disabled: e.disabled,
			defer: e.defer
		}, [k(e.$slots, "default")], 8, [
			"to",
			"disabled",
			"defer"
		])) : ee("v-if", !0);
	}
});
//#endregion
export { Oe as A, pe as C, Ee as D, Te as E, j as M, A as N, M as O, de as P, Re as S, we as T, Pe as _, dt as a, Fe as b, it as c, Qe as d, H as f, z as g, Ve as h, Q as i, fe as j, ke as k, rt as l, Ue as m, xt as n, Y as o, Ke as p, gt as r, J as s, St as t, et as u, I as v, N as w, Le as x, L as y };
