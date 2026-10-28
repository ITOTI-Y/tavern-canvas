import { $ as e, A as t, D as n, F as r, G as i, H as a, J as o, L as s, M as c, N as l, O as u, P as d, S as f, T as p, U as m, V as h, X as g, Y as _, Z as v, ct as ee, d as y, et as b, f as te, g as ne, h as x, ht as re, j as ie, l as ae, lt as S, nt as oe, ot as C, p as w, pt as se, r as ce, rt as T, st as E, tt as D, u as le, ut as ue, w as O, x as k } from "./vue-i18n-L-BrQRnK.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/createContext.js
function de(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, i = Symbol(n);
	return [(t) => {
		let n = p(i, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${i.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (r(i, e), e)];
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
	return g() ? (e(t, n), !0) : !1;
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
	let t = !1, n, r = _(!0);
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
	return e || f();
}
function Se(e) {
	if (!N) return e;
	let t = 0, n, r, i = () => {
		--t, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
	};
	return ((...a) => (t += 1, r || (r = _(!0), n = r.run(() => e(...a))), M(i), n));
}
function Ce(e) {
	return v(e) ? b(new Proxy({}, {
		get(t, n, r) {
			return S(Reflect.get(e.value, n, r));
		},
		set(t, n, r) {
			return v(e.value[n]) && !v(r) ? e.value[n].value = r : e.value[n] = r, !0;
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
	})) : b(e);
}
function we(e) {
	return Ce(w(e));
}
function Te(e, ...t) {
	let n = t.flat(), r = n[0];
	return we(() => Object.fromEntries(typeof r == "function" ? Object.entries(C(e)).filter(([e, t]) => !r(E(t), e)) : Object.entries(C(e)).filter((e) => !n.includes(e[0]))));
}
function Ee(e, t = 1e4) {
	return o((n, r) => {
		let i = E(e), a, o = () => setTimeout(() => {
			i = E(e), r();
		}, E(t));
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
function De(e, n) {
	xe(n) && t(e, n);
}
function Oe(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = T(!1), o;
	function s() {
		o &&= (clearTimeout(o), void 0);
	}
	function c() {
		a.value = !1, s();
	}
	function l(...n) {
		i && e(), s(), a.value = !0, o = setTimeout(() => {
			a.value = !1, o = void 0, e(...n);
		}, E(t));
	}
	return r && (a.value = !0, N && l()), M(c), {
		isPending: oe(a),
		start: l,
		stop: c
	};
}
function ke(e = 1e3, t = {}) {
	let { controls: n = !1, callback: r } = t, i = Oe(r ?? ve, e, t), a = w(() => !i.isPending.value);
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
	let t = E(e);
	return t?.$el ?? t;
}
function L(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = w(() => {
		let t = P(E(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return Ae(() => [
		n.value?.map((e) => I(e)) ?? [F].filter((e) => e != null),
		P(E(n.value ? e[1] : e[0])),
		P(S(n.value ? e[2] : e[1])),
		E(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = _e(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function je() {
	let e = T(!1), t = f();
	return t && ie(() => {
		e.value = !0;
	}, t), e;
}
/* @__NO_SIDE_EFFECTS__ */
function Me(e) {
	let t = je();
	return w(() => (t.value, !!e()));
}
function Ne(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Pe(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = F, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = Ne(t);
	return L(i, a, (e) => {
		e.repeat && E(s) || c(e) && n(e);
	}, o);
}
function Fe(e, t = {}) {
	let { immediate: n = !0, fpsLimit: r = null, window: i = F, once: a = !1 } = t, o = T(!1), s = w(() => {
		let e = E(r);
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
		isActive: oe(o),
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
	}, l = a(w(() => {
		let t = E(e);
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
function Re(e, t, n, r = {}) {
	var i, o;
	let { clone: s = !1, passive: c = !1, eventName: l, deep: d = !1, defaultValue: p, shouldEmit: m } = r, h = f(), g = n || h?.emit || (h == null || (i = h.$emit) == null ? void 0 : i.bind(h)) || (h == null || (o = h.proxy) == null || (o = o.$emit) == null ? void 0 : o.bind(h?.proxy)), _ = l;
	t ||= "modelValue", _ ||= `update:${t.toString()}`;
	let v = (e) => s ? typeof s == "function" ? s(e) : Ie(e) : e, ee = () => he(e[t]) ? v(e[t]) : p, y = (e) => {
		m ? m(e) && g(_, e) : g(_, e);
	};
	if (c) {
		let n = D(ee()), r = !1;
		return a(() => e[t], (e) => {
			r || (r = !0, n.value = v(e), u(() => r = !1));
		}), a(n, (n) => {
			!r && (n !== e[t] || d) && y(n);
		}, { deep: d }), n;
	}
	return w({
		get() {
			return ee();
		},
		set(e) {
			y(e);
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/renderSlotFragments.js
function R(e) {
	return e ? e.flatMap((e) => e.type === le ? R(e.children) : [e]) : [];
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
	let e = D(/* @__PURE__ */ new Map()), t = D(), n = w(() => {
		for (let t of e.value.values()) if (t) return !0;
		return !1;
	}), r = z({ scrollBody: D(!0) }), i = null, o = () => {
		document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", ye && i?.(), t.value = void 0;
	};
	return a(n, (e, a) => {
		if (!N) return;
		if (!e) {
			a && o();
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
		s > 0 && (document.body.style.paddingRight = typeof l.padding == "number" ? `${l.padding}px` : String(l.padding), document.body.style.marginRight = typeof l.margin == "number" ? `${l.margin}px` : String(l.margin), document.documentElement.style.setProperty("--scrollbar-width", `${s}px`), document.body.style.overflow = "hidden"), ye && (i = L(document, "touchmove", (e) => Ge(e), { passive: !1 })), u(() => {
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
	let r = w({
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
	let t = f(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[re(ue(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function H() {
	let e = f(), t = D(), n = w(() => r());
	l(() => {
		n.value !== r() && ee(t);
	});
	function r() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : I(t);
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
	a(() => I(e), (e) => {
		let n = !1;
		try {
			n = !!e?.closest("[popover]:not(:popover-open)");
		} catch {}
		e && !n ? t = Ze(e) : t && t();
	}), c(() => {
		t && t();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var $e = 0;
function et(e, t = "reka") {
	if (e) return e;
	let n, r = z({ useId: void 0 });
	return n = r.useId ? r.useId() : "useId" in ce ? h?.() : `${++$e}`, t ? `${t}-${n}` : n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
function tt(e, t) {
	let n = D(e);
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
	let n = D({}), r = D("none"), i = D(e), o = e.value ? "mounted" : "unmounted", s, l = t.value?.ownerDocument.defaultView ?? F, { state: d, dispatch: f } = tt(o, {
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
			let n = new CustomEvent(e, {
				bubbles: !1,
				cancelable: !1
			});
			t.value?.dispatchEvent(n);
		}
	};
	a(e, async (e, i) => {
		let a = i !== e;
		if (await u(), a) {
			let a = r.value, o = q(t.value);
			e ? (f("MOUNT"), p("enter"), o === "none" && p("after-enter")) : o === "none" || o === "undefined" || n.value?.display === "none" ? (f("UNMOUNT"), p("leave"), p("after-leave")) : i && a !== o ? (f("ANIMATION_OUT"), p("leave")) : (f("UNMOUNT"), p("after-leave"));
		}
	}, { immediate: !0 });
	let m = (e) => {
		let n = q(t.value), r = n.includes(CSS.escape(e.animationName)), a = d.value === "mounted" ? "enter" : "leave";
		if (e.target === t.value && r && (p(`after-${a}`), f("ANIMATION_END"), !i.value)) {
			let e = t.value.style.animationFillMode;
			t.value.style.animationFillMode = "forwards", s = l?.setTimeout(() => {
				t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = e);
			});
		}
		e.target === t.value && n === "none" && f("ANIMATION_END");
	}, h = (e) => {
		e.target === t.value && (r.value = q(t.value));
	}, g = a(t, (e, t) => {
		e ? (n.value = getComputedStyle(e), e.addEventListener("animationstart", h), e.addEventListener("animationcancel", m), e.addEventListener("animationend", m)) : (f("ANIMATION_END"), s !== void 0 && l?.clearTimeout(s), t?.removeEventListener("animationstart", h), t?.removeEventListener("animationcancel", m), t?.removeEventListener("animationend", m));
	}, { immediate: !0 }), _ = a(d, () => {
		let e = q(t.value);
		r.value = d.value === "mounted" ? e : "none";
	});
	return c(() => {
		g(), _(), t.value && (t.value.removeEventListener("animationstart", h), t.value.removeEventListener("animationcancel", m), t.value.removeEventListener("animationend", m)), s !== void 0 && l?.clearTimeout(s);
	}), { isPresent: w(() => ["mounted", "unmountSuspended"].includes(d.value)) };
}
function q(e) {
	return e && getComputedStyle(e).animationName || "none";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/Presence.js
var rt = /*#__PURE__*/ k({
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
		let { present: r, forceMount: i } = C(e), a = D(), { isPresent: o } = nt(r, a);
		n({ present: o });
		let s = t.default({ present: o.value });
		s = R(s || []);
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
		return () => i.value || r.value || o.value ? O(t.default({ present: o.value })[0], { ref: (e) => {
			let t = I(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? a.value = t.firstElementChild : a.value = t), t;
		} }) : null;
	}
}), it = /*#__PURE__*/ k({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: r }) {
		return () => {
			if (!r.default) return null;
			let e = R(r.default()), i = e.findIndex((e) => e.type !== ae);
			if (i === -1) return e;
			let a = e[i];
			delete a.props?.ref;
			let o = a.props ? n(t, a.props) : t, s = te({
				...a,
				props: {}
			}, o);
			return e.length === 1 ? s : (e[i] = s, e);
		};
	}
}), at = [
	"area",
	"img",
	"input"
], J = /*#__PURE__*/ k({
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
		return typeof r == "string" && at.includes(r) ? () => O(r, t) : r === "template" ? () => O(it, t, { default: n.default }) : () => O(e.as, t, { default: n.default });
	}
}), ot = "dismissableLayer.pointerDownOutside", st = "dismissableLayer.focusOutside";
function ct(e, t) {
	if (!(t instanceof Element)) return !1;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function lt(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = D(!1), a = D(() => {});
	return m((o) => {
		if (!N || !E(n)) return;
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
		E(n) && (i.value = !0);
	} };
}
function ut(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = D(!1);
	return m((a) => {
		if (!N || !E(n)) return;
		let o = async (n) => {
			if (!t?.value) return;
			await u(), await u();
			let r = n.target;
			!t.value || !r || ct(t.value, r) || n.target && !i.value && j(st, e, { originalEvent: n });
		};
		r.addEventListener("focusin", o), a(() => r.removeEventListener("focusin", o));
	}), {
		onFocusCapture: () => {
			E(n) && (i.value = !0);
		},
		onBlurCapture: () => {
			E(n) && (i.value = !1);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var Y = /*#__PURE__*/ b({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
}), dt = /* @__PURE__ */ k({
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
		let n = e, r = t, { forwardRef: o, currentElement: c } = H(), l = w(() => c.value?.ownerDocument ?? globalThis.document), f = w(() => Y.layersRoot), p = w(() => c.value ? Array.from(f.value).indexOf(c.value) : -1), h = w(() => Y.layersWithOutsidePointerEventsDisabled.size > 0), g = w(() => {
			let e = Array.from(f.value), [t] = [...Y.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return p.value >= n;
		}), _ = lt(async (e) => {
			let t = [...Y.branches].some((t) => t?.contains(e.target));
			!n.present || !g.value || t || (r("pointerDownOutside", e), r("interactOutside", e), await u(), e.defaultPrevented || r("dismiss"));
		}, c), v = ut((e) => {
			let t = [...Y.branches].some((t) => t?.contains(e.target));
			!n.present || t || (r("focusOutside", e), r("interactOutside", e), e.defaultPrevented || r("dismiss"));
		}, c);
		return Pe("Escape", (e) => {
			n.present && p.value === f.value.size - 1 && (r("escapeKeyDown", e), e.defaultPrevented || r("dismiss"));
		}), a([
			c,
			() => n.disableOutsidePointerEvents,
			() => n.present
		], ([e, t, n], r, i) => {
			!e || !n || t && (Y.layersWithOutsidePointerEventsDisabled.size === 0 && (Y.originalBodyPointerEvents = l.value.body.style.pointerEvents, l.value.body.style.pointerEvents = "none"), Y.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				Y.layersWithOutsidePointerEventsDisabled.delete(e), Y.layersWithOutsidePointerEventsDisabled.size === 0 && !fe(Y.originalBodyPointerEvents) && (l.value.body.style.pointerEvents = Y.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), a([c, () => n.present], ([e, t], n, r) => {
			!e || !t || (f.value.add(e), r(() => {
				f.value.delete(e);
			}));
		}, { immediate: !0 }), m((e) => {
			e(() => {
				c.value && (f.value.delete(c.value), Y.layersWithOutsidePointerEventsDisabled.delete(c.value));
			});
		}), (e, t) => (d(), x(S(J), {
			ref: S(o),
			"as-child": e.asChild,
			as: e.as,
			"data-dismissable-layer": "",
			style: se({ pointerEvents: h.value ? g.value ? "auto" : "none" : void 0 }),
			onFocusCapture: S(v).onFocusCapture,
			onBlurCapture: S(v).onBlurCapture,
			onPointerdownCapture: S(_).onPointerDownCapture
		}, {
			default: i(() => [s(e.$slots, "default")]),
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
}), ft = me(() => D([]));
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
var xt = /* @__PURE__ */ k({
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
	setup(e, { emit: t }) {
		let n = e, r = t, { currentRef: o, currentElement: c } = H(), l = D(null), f = pt(), p = /*#__PURE__*/ b({
			paused: !1,
			pause() {
				this.paused = !0;
			},
			resume() {
				this.paused = !1;
			}
		});
		m((e) => {
			if (!N) return;
			let t = c.value;
			if (!n.trapped) return;
			function r(e) {
				if (p.paused || !t) return;
				let n = e.target;
				t.contains(n) ? l.value = n : $(l.value, { select: !0 });
			}
			function i(e) {
				if (p.paused || !t) return;
				let n = e.relatedTarget;
				n !== null && (t.contains(n) || $(l.value, { select: !0 }));
			}
			function a(e) {
				let n = l.value;
				n !== null && e.some((e) => e.removedNodes.length > 0) && (t.contains(n) || $(t));
			}
			document.addEventListener("focusin", r), document.addEventListener("focusout", i);
			let o = new MutationObserver(a);
			t && o.observe(t, {
				childList: !0,
				subtree: !0
			}), e(() => {
				document.removeEventListener("focusin", r), document.removeEventListener("focusout", i), o.disconnect();
			});
		});
		function h(e, t) {
			let n = new CustomEvent(X, ht), i = (e) => r("mountAutoFocus", e);
			e.addEventListener(X, i), e.dispatchEvent(n), e.removeEventListener(X, i), n.defaultPrevented || (gt(Q(e), { select: !0 }), A() === t && $(e));
		}
		m(async (e) => {
			let t = c.value;
			if (await u(), !t) return;
			n.present !== !1 && f.add(p);
			let i = A();
			!t.contains(i) && n.present !== !1 && h(t, i), e(() => {
				let e = new CustomEvent(Z, ht), n = (e) => {
					r("unmountAutoFocus", e);
				};
				t.addEventListener(Z, n), t.dispatchEvent(e), t.setAttribute("data-focus-scope-unmounting", ""), setTimeout(() => {
					e.defaultPrevented || $(i ?? document.body, { select: !0 }), t.removeEventListener(Z, n), f.remove(p), t.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		}), a(() => n.present, async (e, t) => {
			if (!N) return;
			if (e === !1 && t === !0) {
				f.remove(p);
				return;
			}
			if (e !== !0 || t !== !1) return;
			f.add(p), await u();
			let n = c.value;
			if (!n) return;
			let r = A();
			n.contains(r) || h(n, r);
		});
		function g(e) {
			if (!n.loop && !n.trapped || p.paused) return;
			let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, r = A();
			if (t && r) {
				let t = e.currentTarget, [i, a] = _t(t);
				i && a ? !e.shiftKey && r === a ? (e.preventDefault(), n.loop && $(i, { select: !0 })) : e.shiftKey && r === i && (e.preventDefault(), n.loop && $(a, { select: !0 })) : r === t && e.preventDefault();
			}
		}
		return (e, t) => (d(), x(S(J), {
			ref_key: "currentRef",
			ref: o,
			tabindex: "-1",
			"as-child": e.asChild,
			as: e.as,
			onKeydown: g
		}, {
			default: i(() => [s(e.$slots, "default")]),
			_: 3
		}, 8, ["as-child", "as"]));
	}
}), St = /* @__PURE__ */ k({
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
		let t = e, n = z({}), r = w(() => t.to ?? n.teleportTo?.value ?? "body"), i = je();
		return (e, t) => S(i) || e.forceMount ? (d(), x(y, {
			key: 0,
			to: r.value,
			disabled: e.disabled,
			defer: e.defer
		}, [s(e.$slots, "default")], 8, [
			"to",
			"disabled",
			"defer"
		])) : ne("v-if", !0);
	}
});
//#endregion
export { Oe as A, pe as C, Ee as D, Te as E, j as M, A as N, M as O, de as P, Re as S, we as T, Pe as _, dt as a, Fe as b, it as c, Qe as d, H as f, z as g, Ve as h, Q as i, fe as j, ke as k, rt as l, Ue as m, xt as n, Y as o, Ke as p, gt as r, J as s, St as t, et as u, I as v, N as w, Le as x, L as y };
