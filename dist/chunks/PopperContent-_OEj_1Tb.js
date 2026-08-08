import { $ as e, A as t, D as n, F as r, G as i, H as a, I as o, J as s, K as c, L as l, M as u, N as d, O as f, P as p, Q as m, T as h, U as g, W as _, X as v, Y as y, Z as b, b as x, ct as S, dt as C, et as w, f as T, g as E, gt as ee, h as D, it as O, j as k, k as A, lt as te, m as ne, mt as re, nt as j, o as ie, ot as ae, p as oe, rt as M, st as se, tt as ce, ut as N, v as P, w as F, y as le, z as I } from "./AppIcon-BpY-A4VH.js";
//#region src/ui/contracts/portal_keys.ts
var ue = Symbol("tavern-canvas-portal-target");
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/createContext.js
function de(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
	return [(t) => {
		let n = f(r, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (l(r, e), e)];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/getActiveElement.js
function L() {
	let e = document.activeElement;
	if (e == null) return null;
	for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null;) e = e.shadowRoot.activeElement;
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function fe(e, t, n) {
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
function me(e, t) {
	return b() ? (w(e, t), !0) : !1;
}
function he() {
	let e = /* @__PURE__ */ new Set(), t = (t) => {
		e.delete(t);
	};
	return {
		on: (n) => {
			e.add(n);
			let r = () => t(n);
			return me(r), { off: r };
		},
		off: t,
		trigger: (...t) => Promise.all(Array.from(e).map((e) => e(...t))),
		clear: () => {
			e.clear();
		}
	};
}
function ge(e) {
	let t = !1, n, r = v(!0);
	return ((...i) => (t ||= (n = r.run(() => e(...i)), !0), n));
}
var R = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var _e = (e) => e !== void 0, ve = Object.prototype.toString, ye = (e) => ve.call(e) === "[object Object]", be = () => {}, xe = /* #__PURE__ */ Se();
function Se() {
	var e, t;
	return R && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function Ce(e) {
	return Array.isArray(e) ? e : [e];
}
function we(e) {
	return e || h();
}
function Te(e) {
	if (!R) return e;
	let t = 0, n, r, i = () => {
		--t, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
	};
	return ((...a) => (t += 1, r || (r = v(!0), n = r.run(() => e(...a))), me(i), n));
}
function Ee(e) {
	return m(e) ? ce(new Proxy({}, {
		get(t, n, r) {
			return N(Reflect.get(e.value, n, r));
		},
		set(t, n, r) {
			return m(e.value[n]) && !m(r) ? e.value[n].value = r : e.value[n] = r, !0;
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
	})) : ce(e);
}
function De(e) {
	return Ee(E(e));
}
function Oe(e, t = 1e4) {
	return y((n, r) => {
		let i = S(e), a, o = () => setTimeout(() => {
			i = S(e), r();
		}, S(t));
		return me(() => {
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
	we(t) && u(e, t);
}
function Ae(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = O(!1), o;
	function s() {
		o &&= (clearTimeout(o), void 0);
	}
	function c() {
		a.value = !1, s();
	}
	function l(...n) {
		i && e(), s(), a.value = !0, o = setTimeout(() => {
			a.value = !1, o = void 0, e(...n);
		}, S(t));
	}
	return r && (a.value = !0, R && l()), me(c), {
		isPending: M(a),
		start: l,
		stop: c
	};
}
function je(e = 1e3, t = {}) {
	let { controls: n = !1, callback: r } = t, i = Ae(r ?? be, e, t), a = E(() => !i.isPending.value);
	return n ? {
		ready: a,
		...i
	} : a;
}
function Me(e, t, n) {
	return g(e, t, {
		...n,
		immediate: !0
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var Ne = R ? window : void 0;
R && window.document, R && window.navigator, R && window.location;
function z(e) {
	let t = S(e);
	return t?.$el ?? t;
}
function Pe(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = E(() => {
		let t = Ce(S(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return Me(() => [
		n.value?.map((e) => z(e)) ?? [Ne].filter((e) => e != null),
		Ce(S(n.value ? e[1] : e[0])),
		Ce(N(n.value ? e[2] : e[1])),
		S(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = ye(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function Fe() {
	let e = O(!1), t = h();
	return t && d(() => {
		e.value = !0;
	}, t), e;
}
/* @__NO_SIDE_EFFECTS__ */
function Ie(e) {
	let t = Fe();
	return E(() => (t.value, !!e()));
}
function Le(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Re(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = Ne, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = Le(t);
	return Pe(i, a, (e) => {
		e.repeat && S(s) || c(e) && n(e);
	}, o);
}
function ze(e, t = {}) {
	let { immediate: n = !0, fpsLimit: r = null, window: i = Ne, once: a = !1 } = t, o = O(!1), s = E(() => {
		let e = S(r);
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
	return n && d(), me(f), {
		isActive: M(o),
		pause: f,
		resume: d
	};
}
function Be(e) {
	return JSON.parse(JSON.stringify(e));
}
function Ve(e, t, n = {}) {
	let { window: r = Ne, ...i } = n, a, o = /* @__PURE__ */ Ie(() => r && "ResizeObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, c = g(E(() => {
		let t = S(e);
		return Array.isArray(t) ? t.map((e) => z(e)) : [z(t)];
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
	return me(l), {
		isSupported: o,
		stop: l
	};
}
function He(e, t, n, r = {}) {
	var i, a;
	let { clone: o = !1, passive: s = !1, eventName: c, deep: l = !1, defaultValue: u, shouldEmit: d } = r, f = h(), p = n || f?.emit || (f == null || (i = f.$emit) == null ? void 0 : i.bind(f)) || (f == null || (a = f.proxy) == null || (a = a.$emit) == null ? void 0 : a.bind(f?.proxy)), m = c;
	t ||= "modelValue", m ||= `update:${t.toString()}`;
	let _ = (e) => o ? typeof o == "function" ? o(e) : Be(e) : e, v = () => _e(e[t]) ? _(e[t]) : u, y = (e) => {
		d ? d(e) && p(m, e) : p(m, e);
	};
	if (s) {
		let n = j(v()), r = !1;
		return g(() => e[t], (e) => {
			r || (r = !0, n.value = _(e), k(() => r = !1));
		}), g(n, (n) => {
			!r && (n !== e[t] || l) && y(n);
		}, { deep: l }), n;
	}
	return E({
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
function Ue(e) {
	return e ? e.flatMap((e) => e.type === oe ? Ue(e.children) : [e]) : [];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [We, Ge] = /*#__PURE__*/ de("ConfigProvider");
//#endregion
//#region ../../node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function Ke(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function qe(e, t, n = ".", r) {
	if (!Ke(t)) return qe(e, {}, n, r);
	let i = { ...t };
	for (let t of Object.keys(e)) {
		if (t === "__proto__" || t === "constructor") continue;
		let a = e[t];
		a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : Ke(a) && Ke(i[t]) ? qe(a, i[t], (n ? `${n}.` : "") + t.toString(), r) : a));
	}
	return i;
}
function Je(e) {
	return (...t) => t.reduce((t, n) => qe(t, n, "", e), {});
}
var Ye = Je(), Xe = Te(() => {
	let e = j(/* @__PURE__ */ new Map()), t = j(), n = E(() => {
		for (let t of e.value.values()) if (t) return !0;
		return !1;
	}), r = We({ scrollBody: j(!0) }), i = null, a = () => {
		document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", xe && i?.(), t.value = void 0;
	};
	return g(n, (e, o) => {
		if (!R) return;
		if (!e) {
			o && a();
			return;
		}
		t.value === void 0 && (t.value = document.body.style.overflow);
		let s = window.innerWidth - document.documentElement.clientWidth, c = {
			padding: s,
			margin: 0
		}, l = r.scrollBody?.value ? typeof r.scrollBody.value == "object" ? Ye({
			padding: r.scrollBody.value.padding === !0 ? s : r.scrollBody.value.padding,
			margin: r.scrollBody.value.margin === !0 ? s : r.scrollBody.value.margin
		}, c) : c : {
			padding: 0,
			margin: 0
		};
		s > 0 && (document.body.style.paddingRight = typeof l.padding == "number" ? `${l.padding}px` : String(l.padding), document.body.style.marginRight = typeof l.margin == "number" ? `${l.margin}px` : String(l.margin), document.documentElement.style.setProperty("--scrollbar-width", `${s}px`), document.body.style.overflow = "hidden"), xe && (i = Pe(document, "touchmove", (e) => $e(e), { passive: !1 })), k(() => {
			n.value && (document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden");
		});
	}, {
		immediate: !0,
		flush: "sync"
	}), e;
});
function Ze(e) {
	let t = Math.random().toString(36).substring(2, 7), n = Xe();
	n.value.set(t, e ?? !1);
	let r = E({
		get: () => n.value.get(t) ?? !1,
		set: (e) => n.value.set(t, e)
	});
	return ke(() => {
		n.value.delete(t);
	}), r;
}
function Qe(e) {
	let t = window.getComputedStyle(e);
	if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
	{
		let t = e.parentNode;
		return !(t instanceof Element) || t.tagName === "BODY" ? !1 : Qe(t);
	}
}
function $e(e) {
	let t = e || window.event, n = t.target;
	return n instanceof Element && Qe(n) ? !1 : t.touches.length > 1 || (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useDirection.js
function et(e) {
	let t = We({ dir: j("ltr") });
	return E(() => e?.value || t.dir?.value || "ltr");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useEmitAsProps.js
function tt(e) {
	let t = h(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[ee(C(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function nt() {
	let e = h(), t = j(), n = E(() => i());
	r(() => {
		n.value !== i() && te(t);
	});
	function i() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : z(t);
	}
	let a = Object.assign({}, e.exposed), o = {};
	for (let t in e.props) Object.defineProperty(o, t, {
		enumerable: !0,
		configurable: !0,
		get: () => e.props[t]
	});
	if (Object.keys(a).length > 0) for (let e in a) Object.defineProperty(o, e, {
		enumerable: !0,
		configurable: !0,
		get: () => a[e]
	});
	Object.defineProperty(o, "$el", {
		enumerable: !0,
		configurable: !0,
		get: () => e.vnode.el
	}), e.exposed = o;
	function s(n) {
		if (t.value = n, n && (Object.defineProperty(o, "$el", {
			enumerable: !0,
			configurable: !0,
			get: () => n instanceof Element ? n : n.$el
		}), !(n instanceof Element) && !Object.hasOwn(n, "$el"))) {
			let t = n.$.exposed, r = Object.assign({}, o);
			for (let e in t) Object.defineProperty(r, e, {
				enumerable: !0,
				configurable: !0,
				get: () => t[e]
			});
			e.exposed = r;
		}
	}
	return {
		forwardRef: s,
		currentRef: t,
		currentElement: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardProps.js
function rt(e) {
	let t = h(), n = Object.keys(t?.type.props ?? {}).reduce((e, n) => {
		let r = (t?.type.props[n]).default;
		return r !== void 0 && (e[n] = r), e;
	}, {}), r = ae(e);
	return E(() => {
		let e = {}, i = t?.vnode.props ?? {};
		return Object.keys(i).forEach((t) => {
			e[C(t)] = i[t];
		}), Object.keys({
			...n,
			...e
		}).reduce((e, t) => (r.value[t] !== void 0 && (e[t] = r.value[t]), e), {});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardPropsEmits.js
function it(e, t) {
	let n = rt(e), r = t ? tt(t) : {};
	return E(() => ({
		...n.value,
		...r
	}));
}
//#endregion
//#region ../../node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var at = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, ot = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), ct = {}, lt = 0, ut = function(e) {
	return e && (e.host || ut(e.parentNode));
}, dt = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = ut(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, ft = function(e, t, n, r) {
	var i = dt(t, Array.isArray(e) ? e : [e]);
	ct[n] || (ct[n] = /* @__PURE__ */ new WeakMap());
	var a = ct[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (ot.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				ot.set(e, c), a.set(e, l), o.push(e), c === 1 && i && st.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), lt++, function() {
		o.forEach(function(e) {
			var t = ot.get(e) - 1, i = a.get(e) - 1;
			ot.set(e, t), a.set(e, i), t || (st.has(e) || e.removeAttribute(r), st.delete(e)), i || e.removeAttribute(n);
		}), lt--, lt || (ot = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), ct = {});
	};
}, pt = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || at(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), ft(r, i, n, "aria-hidden")) : function() {
		return null;
	};
};
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useHideOthers.js
function mt(e) {
	let t;
	g(() => z(e), (e) => {
		let n = !1;
		try {
			n = !!e?.closest("[popover]:not(:popover-open)");
		} catch {}
		e && !n ? t = pt(e) : t && t();
	}), p(() => {
		t && t();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var ht = 0;
function gt(e, t = "reka") {
	if (e) return e;
	let n, r = We({ useId: void 0 });
	return n = r.useId ? r.useId() : "useId" in ie ? a?.() : `${++ht}`, t ? `${t}-${n}` : n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useSize.js
function _t(e) {
	let t = j(), n = E(() => t.value?.width ?? 0), r = E(() => t.value?.height ?? 0), i;
	return d(() => {
		let n = z(e);
		n ? (t.value = {
			width: n.offsetWidth,
			height: n.offsetHeight
		}, i = new ResizeObserver((e) => {
			if (!Array.isArray(e) || !e.length) return;
			let r = e[0], i, a;
			if ("borderBoxSize" in r) {
				let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
				i = t.inlineSize, a = t.blockSize;
			} else i = n.offsetWidth, a = n.offsetHeight;
			t.value = {
				width: i,
				height: a
			};
		}), i.observe(n, { box: "border-box" })) : t.value = void 0;
	}), p(() => {
		i?.disconnect(), i = void 0;
	}), {
		width: n,
		height: r
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
function vt(e, t) {
	let n = j(e);
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
function yt(e, t) {
	let n = j({}), r = j("none"), i = j(e), a = e.value ? "mounted" : "unmounted", o, s = t.value?.ownerDocument.defaultView ?? Ne, { state: c, dispatch: l } = vt(a, {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	}), u = (e) => {
		if (R) {
			let n = new CustomEvent(e, {
				bubbles: !1,
				cancelable: !1
			});
			t.value?.dispatchEvent(n);
		}
	};
	g(e, async (e, i) => {
		let a = i !== e;
		if (await k(), a) {
			let a = r.value, o = bt(t.value);
			e ? (l("MOUNT"), u("enter"), o === "none" && u("after-enter")) : o === "none" || o === "undefined" || n.value?.display === "none" ? (l("UNMOUNT"), u("leave"), u("after-leave")) : i && a !== o ? (l("ANIMATION_OUT"), u("leave")) : (l("UNMOUNT"), u("after-leave"));
		}
	}, { immediate: !0 });
	let d = (e) => {
		let n = bt(t.value), r = n.includes(CSS.escape(e.animationName)), a = c.value === "mounted" ? "enter" : "leave";
		if (e.target === t.value && r && (u(`after-${a}`), l("ANIMATION_END"), !i.value)) {
			let e = t.value.style.animationFillMode;
			t.value.style.animationFillMode = "forwards", o = s?.setTimeout(() => {
				t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = e);
			});
		}
		e.target === t.value && n === "none" && l("ANIMATION_END");
	}, f = (e) => {
		e.target === t.value && (r.value = bt(t.value));
	}, m = g(t, (e, t) => {
		e ? (n.value = getComputedStyle(e), e.addEventListener("animationstart", f), e.addEventListener("animationcancel", d), e.addEventListener("animationend", d)) : (l("ANIMATION_END"), o !== void 0 && s?.clearTimeout(o), t?.removeEventListener("animationstart", f), t?.removeEventListener("animationcancel", d), t?.removeEventListener("animationend", d));
	}, { immediate: !0 }), h = g(c, () => {
		let e = bt(t.value);
		r.value = c.value === "mounted" ? e : "none";
	});
	return p(() => {
		m(), h(), t.value && (t.value.removeEventListener("animationstart", f), t.value.removeEventListener("animationcancel", d), t.value.removeEventListener("animationend", d)), o !== void 0 && s?.clearTimeout(o);
	}), { isPresent: E(() => ["mounted", "unmountSuspended"].includes(c.value)) };
}
function bt(e) {
	return e && getComputedStyle(e).animationName || "none";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/Presence.js
var xt = /*#__PURE__*/ F({
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
		let { present: i, forceMount: a } = se(e), o = j(), { isPresent: s } = yt(i, o);
		r({ present: s });
		let c = t.default({ present: s.value });
		c = Ue(c || []);
		let l = h();
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
		return () => a.value || i.value || s.value ? n(t.default({ present: s.value })[0], { ref: (e) => {
			let t = z(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? o.value = t.firstElementChild : o.value = t), t;
		} }) : null;
	}
}), St = /*#__PURE__*/ F({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: n, slots: r }) {
		return () => {
			if (!r.default) return null;
			let e = Ue(r.default()), i = e.findIndex((e) => e.type !== T);
			if (i === -1) return e;
			let a = e[i];
			delete a.props?.ref;
			let o = a.props ? t(n, a.props) : n, s = D({
				...a,
				props: {}
			}, o);
			return e.length === 1 ? s : (e[i] = s, e);
		};
	}
}), Ct = [
	"area",
	"img",
	"input"
], B = /*#__PURE__*/ F({
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
	setup(e, { attrs: t, slots: r }) {
		let i = e.asChild ? "template" : e.as;
		return typeof i == "string" && Ct.includes(i) ? () => n(i, t) : i === "template" ? () => n(St, t, { default: r.default }) : () => n(e.as, t, { default: r.default });
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function wt() {
	let e = j();
	return {
		primitiveElement: e,
		currentElement: E(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : z(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/utils.js
var Tt = "dismissableLayer.pointerDownOutside", Et = "dismissableLayer.focusOutside";
function Dt(e, t) {
	if (!(t instanceof Element)) return !1;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function Ot(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = j(!1), a = j(() => {});
	return _((o) => {
		if (!R || !S(n)) return;
		let s = async (n) => {
			let o = n.target;
			if (!(!t?.value || !o)) {
				if (Dt(t.value, o)) {
					i.value = !1;
					return;
				}
				if (n.target && !i.value) {
					let t = { originalEvent: n };
					function i() {
						fe(Tt, e, t);
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
		S(n) && (i.value = !0);
	} };
}
function kt(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = j(!1);
	return _((a) => {
		if (!R || !S(n)) return;
		let o = async (n) => {
			if (!t?.value) return;
			await k(), await k();
			let r = n.target;
			!t.value || !r || Dt(t.value, r) || n.target && !i.value && fe(Et, e, { originalEvent: n });
		};
		r.addEventListener("focusin", o), a(() => r.removeEventListener("focusin", o));
	}), {
		onFocusCapture: () => {
			S(n) && (i.value = !0);
		},
		onBlurCapture: () => {
			S(n) && (i.value = !1);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var V = /*#__PURE__*/ ce({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
}), At = /* @__PURE__ */ F({
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
		let n = e, r = t, { forwardRef: i, currentElement: a } = nt(), s = E(() => a.value?.ownerDocument ?? globalThis.document), l = E(() => V.layersRoot), u = E(() => a.value ? Array.from(l.value).indexOf(a.value) : -1), d = E(() => V.layersWithOutsidePointerEventsDisabled.size > 0), f = E(() => {
			let e = Array.from(l.value), [t] = [...V.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return u.value >= n;
		}), p = Ot(async (e) => {
			let t = [...V.branches].some((t) => t?.contains(e.target));
			!n.present || !f.value || t || (r("pointerDownOutside", e), r("interactOutside", e), await k(), e.defaultPrevented || r("dismiss"));
		}, a), m = kt((e) => {
			let t = [...V.branches].some((t) => t?.contains(e.target));
			!n.present || t || (r("focusOutside", e), r("interactOutside", e), e.defaultPrevented || r("dismiss"));
		}, a);
		return Re("Escape", (e) => {
			n.present && u.value === l.value.size - 1 && (r("escapeKeyDown", e), e.defaultPrevented || r("dismiss"));
		}), g([
			a,
			() => n.disableOutsidePointerEvents,
			() => n.present
		], ([e, t, n], r, i) => {
			!e || !n || t && (V.layersWithOutsidePointerEventsDisabled.size === 0 && (V.originalBodyPointerEvents = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = "none"), V.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				V.layersWithOutsidePointerEventsDisabled.delete(e), V.layersWithOutsidePointerEventsDisabled.size === 0 && !pe(V.originalBodyPointerEvents) && (s.value.body.style.pointerEvents = V.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), g([a, () => n.present], ([e, t], n, r) => {
			!e || !t || (l.value.add(e), r(() => {
				l.value.delete(e);
			}));
		}, { immediate: !0 }), _((e) => {
			e(() => {
				a.value && (l.value.delete(a.value), V.layersWithOutsidePointerEventsDisabled.delete(a.value));
			});
		}), (e, t) => (o(), P(N(B), {
			ref: N(i),
			"as-child": e.asChild,
			as: e.as,
			"data-dismissable-layer": "",
			style: re({ pointerEvents: d.value ? f.value ? "auto" : "none" : void 0 }),
			onFocusCapture: N(m).onFocusCapture,
			onBlurCapture: N(m).onBlurCapture,
			onPointerdownCapture: N(p).onPointerDownCapture
		}, {
			default: c(() => [I(e.$slots, "default")]),
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
}), jt = ge(() => j([]));
function Mt() {
	let e = jt();
	return {
		add(t) {
			let n = e.value[0];
			t !== n && n?.pause(), e.value = Nt(e.value, t), e.value.unshift(t);
		},
		remove(t) {
			e.value = Nt(e.value, t), e.value[0]?.resume();
		}
	};
}
function Nt(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/utils.js
var Pt = "focusScope.autoFocusOnMount", Ft = "focusScope.autoFocusOnUnmount", It = {
	bubbles: !1,
	cancelable: !0
};
function Lt(e, { select: t = !1 } = {}) {
	let n = L();
	for (let r of e) if (H(r, { select: t }), L() !== n) return !0;
}
function Rt(e) {
	let t = zt(e);
	return [Bt(t, e), Bt(t.reverse(), e)];
}
function zt(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function Bt(e, t) {
	for (let n of e) if (!Vt(n, { upTo: t })) return n;
}
function Vt(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function Ht(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function H(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = L();
		e.focus({ preventScroll: !0 }), e !== n && Ht(e) && t && e.select();
	}
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var Ut = /* @__PURE__ */ F({
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
		let n = e, r = t, { currentRef: i, currentElement: a } = nt(), s = j(null), l = Mt(), u = /*#__PURE__*/ ce({
			paused: !1,
			pause() {
				this.paused = !0;
			},
			resume() {
				this.paused = !1;
			}
		});
		_((e) => {
			if (!R) return;
			let t = a.value;
			if (!n.trapped) return;
			function r(e) {
				if (u.paused || !t) return;
				let n = e.target;
				t.contains(n) ? s.value = n : H(s.value, { select: !0 });
			}
			function i(e) {
				if (u.paused || !t) return;
				let n = e.relatedTarget;
				n !== null && (t.contains(n) || H(s.value, { select: !0 }));
			}
			function o(e) {
				let n = s.value;
				n !== null && e.some((e) => e.removedNodes.length > 0) && (t.contains(n) || H(t));
			}
			document.addEventListener("focusin", r), document.addEventListener("focusout", i);
			let c = new MutationObserver(o);
			t && c.observe(t, {
				childList: !0,
				subtree: !0
			}), e(() => {
				document.removeEventListener("focusin", r), document.removeEventListener("focusout", i), c.disconnect();
			});
		});
		function d(e, t) {
			let n = new CustomEvent(Pt, It), i = (e) => r("mountAutoFocus", e);
			e.addEventListener(Pt, i), e.dispatchEvent(n), e.removeEventListener(Pt, i), n.defaultPrevented || (Lt(zt(e), { select: !0 }), L() === t && H(e));
		}
		_(async (e) => {
			let t = a.value;
			if (await k(), !t) return;
			n.present !== !1 && l.add(u);
			let i = L();
			!t.contains(i) && n.present !== !1 && d(t, i), e(() => {
				let e = new CustomEvent(Ft, It), n = (e) => {
					r("unmountAutoFocus", e);
				};
				t.addEventListener(Ft, n), t.dispatchEvent(e), t.setAttribute("data-focus-scope-unmounting", ""), setTimeout(() => {
					e.defaultPrevented || H(i ?? document.body, { select: !0 }), t.removeEventListener(Ft, n), l.remove(u), t.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		}), g(() => n.present, async (e, t) => {
			if (!R) return;
			if (e === !1 && t === !0) {
				l.remove(u);
				return;
			}
			if (e !== !0 || t !== !1) return;
			l.add(u), await k();
			let n = a.value;
			if (!n) return;
			let r = L();
			n.contains(r) || d(n, r);
		});
		function f(e) {
			if (!n.loop && !n.trapped || u.paused) return;
			let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, r = L();
			if (t && r) {
				let t = e.currentTarget, [i, a] = Rt(t);
				i && a ? !e.shiftKey && r === a ? (e.preventDefault(), n.loop && H(i, { select: !0 })) : e.shiftKey && r === i && (e.preventDefault(), n.loop && H(a, { select: !0 })) : r === t && e.preventDefault();
			}
		}
		return (e, t) => (o(), P(N(B), {
			ref_key: "currentRef",
			ref: i,
			tabindex: "-1",
			"as-child": e.asChild,
			as: e.as,
			onKeydown: f
		}, {
			default: c(() => [I(e.$slots, "default")]),
			_: 3
		}, 8, ["as-child", "as"]));
	}
}), Wt = "menu.itemSelect", Gt = ["Enter", " "], Kt = [
	"ArrowDown",
	"PageUp",
	"Home"
], qt = [
	"ArrowUp",
	"PageDown",
	"End"
], Jt = [...Kt, ...qt];
[...Gt], [...Gt];
function Yt(e) {
	return e ? "open" : "closed";
}
function Xt(e) {
	let t = L();
	for (let n of e) if (n === t || (n.focus(), L() !== t)) return;
}
function Zt(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function Qt(e, t) {
	return t ? Zt({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function $t(e) {
	return e.pointerType === "mouse";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Teleport/Teleport.js
var en = /* @__PURE__ */ F({
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
		let t = e, n = We({}), r = E(() => t.to ?? n.teleportTo?.value ?? "body"), i = Fe();
		return (e, t) => N(i) || e.forceMount ? (o(), P(ne, {
			key: 0,
			to: r.value,
			disabled: e.disabled,
			defer: e.defer
		}, [I(e.$slots, "default")], 8, [
			"to",
			"disabled",
			"defer"
		])) : le("v-if", !0);
	}
}), tn = "data-reka-collection-item";
function nn(t = {}) {
	let { key: r = "", isProvider: i = !1 } = t, a = `${r}CollectionProvider`, o;
	if (i) {
		let e = j(/* @__PURE__ */ new Map());
		o = {
			collectionRef: j(),
			itemMap: e
		}, l(a, o);
	} else o = f(a);
	let s = (e = !1) => {
		let t = o.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${tn}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(o.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, c = /*#__PURE__*/ F({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: r }) {
			let { primitiveElement: i, currentElement: a } = wt();
			return g(a, () => {
				o.collectionRef.value = a.value;
			}), () => n(St, {
				ref: i,
				...r
			}, t);
		}
	}), u = /*#__PURE__*/ F({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(t, { slots: r, attrs: i }) {
			let { primitiveElement: a, currentElement: s } = wt();
			return _((n) => {
				if (s.value) {
					let r = e(s.value);
					o.itemMap.value.set(r, {
						ref: s.value,
						value: t.value
					}), n(() => o.itemMap.value.delete(r));
				}
			}), () => n(St, {
				...i,
				[tn]: "",
				ref: a
			}, r);
		}
	});
	return {
		getItems: s,
		reactiveItems: E(() => Array.from(o.itemMap.value.values())),
		itemMapSize: E(() => o.itemMap.value.size),
		CollectionSlot: c,
		CollectionItem: u
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHidden.js
var rn = /* @__PURE__ */ F({
	__name: "VisuallyHidden",
	props: {
		feature: {
			type: String,
			required: !1,
			default: "focusable"
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		return (e, t) => (o(), P(N(B), {
			as: e.as,
			"as-child": e.asChild,
			"aria-hidden": e.feature === "focusable" || e.feature === "fully-hidden" ? "true" : void 0,
			"data-hidden": e.feature === "fully-hidden" ? "" : void 0,
			tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
			style: {
				position: "absolute",
				border: 0,
				width: "1px",
				height: "1px",
				padding: 0,
				margin: "-1px",
				overflow: "hidden",
				clip: "rect(0, 0, 0, 0)",
				clipPath: "inset(50%)",
				whiteSpace: "nowrap",
				wordWrap: "normal",
				top: "-1px",
				left: "-1px"
			}
		}, {
			default: c(() => [I(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"aria-hidden",
			"data-hidden",
			"tabindex"
		]));
	}
}), [an, on] = /*#__PURE__*/ de("PopperRoot"), sn = /* @__PURE__ */ F({
	inheritAttrs: !1,
	__name: "PopperRoot",
	setup(e) {
		let t = j();
		return on({
			anchor: t,
			onAnchorChange: (e) => t.value = e
		}), (e, t) => I(e.$slots, "default");
	}
}), cn = /* @__PURE__ */ F({
	__name: "PopperAnchor",
	props: {
		reference: {
			type: null,
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
	setup(e) {
		let t = e, { forwardRef: n, currentElement: r } = nt(), a = an();
		return i(() => {
			a.onAnchorChange(t.reference ?? r.value);
		}), (e, t) => (o(), P(N(B), {
			ref: N(n),
			as: e.as,
			"as-child": e.asChild
		}, {
			default: c(() => [I(e.$slots, "default")]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/utils.js
function ln(e) {
	return e !== null;
}
function un(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = dn(n), u = {
				start: e.dir === "rtl" ? "100%" : "0%",
				center: "50%",
				end: e.dir === "rtl" ? "0%" : "100%"
			}[l], d = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[l], f = (i.arrow?.x ?? 0) + o / 2, p = (i.arrow?.y ?? 0) + s / 2, m = "", h = "";
			return c === "bottom" ? (m = a ? u : `${f}px`, h = `${-s}px`) : c === "top" ? (m = a ? u : `${f}px`, h = `${r.floating.height + s}px`) : c === "right" ? (m = `${-s}px`, h = a ? d : `${p}px`) : c === "left" && (m = `${r.floating.width + s}px`, h = a ? d : `${p}px`), { data: {
				x: m,
				y: h
			} };
		}
	};
}
function dn(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var fn = [
	"top",
	"right",
	"bottom",
	"left"
], U = Math.min, W = Math.max, pn = Math.round, mn = Math.floor, G = (e) => ({
	x: e,
	y: e
}), hn = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function gn(e, t, n) {
	return W(e, U(t, n));
}
function K(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function q(e) {
	return e.split("-")[0];
}
function _n(e) {
	return e.split("-")[1];
}
function vn(e) {
	return e === "x" ? "y" : "x";
}
function yn(e) {
	return e === "y" ? "height" : "width";
}
function J(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function bn(e) {
	return vn(J(e));
}
function xn(e, t, n) {
	n === void 0 && (n = !1);
	let r = _n(e), i = bn(e), a = yn(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = An(o)), [o, An(o)];
}
function Sn(e) {
	let t = An(e);
	return [
		Cn(e),
		t,
		Cn(t)
	];
}
function Cn(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var wn = ["left", "right"], Tn = ["right", "left"], En = ["top", "bottom"], Dn = ["bottom", "top"];
function On(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Tn : wn : t ? wn : Tn;
		case "left":
		case "right": return t ? En : Dn;
		default: return [];
	}
}
function kn(e, t, n, r) {
	let i = _n(e), a = On(q(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Cn)))), a;
}
function An(e) {
	let t = q(e);
	return hn[t] + e.slice(t.length);
}
function jn(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Mn(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : jn(e);
}
function Nn(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Pn(e, t, n) {
	let { reference: r, floating: i } = e, a = J(t), o = bn(t), s = yn(o), c = q(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = _n(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Fn(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = K(t, e), p = Mn(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Nn(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Nn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var In = 50, Ln = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Fn
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Pn(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < In && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Pn(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Rn = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = K(e, t) || {};
		if (l == null) return {};
		let d = Mn(u), f = {
			x: n,
			y: r
		}, p = bn(i), m = yn(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = U(d[_], T), ee = U(d[v], T), D = C - h[m] - ee, O = C / 2 - h[m] / 2 + w, k = gn(E, O, D), A = !c.arrow && _n(i) != null && O !== k && a.reference[m] / 2 - (O < E ? E : ee) - h[m] / 2 < 0, te = A ? O < E ? O - E : O - D : 0;
		return {
			[p]: f[p] + te,
			data: {
				[p]: k,
				centerOffset: O - k - te,
				...A && { alignmentOffset: te }
			},
			reset: A
		};
	}
}), zn = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = K(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = q(r), _ = J(o), v = q(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [An(o)] : Sn(o)), x = p !== "none";
			!d && x && b.push(...kn(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = xn(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === J(t) || T.every((e) => J(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = J(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Bn(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Vn(e) {
	return fn.some((t) => e[t] >= 0);
}
var Hn = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = K(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Bn(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Vn(e)
					} };
				}
				case "escaped": {
					let e = Bn(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Vn(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Un = /*#__PURE__*/ new Set(["left", "top"]);
async function Wn(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = q(n), s = _n(n), c = J(n) === "y", l = Un.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = K(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Gn = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Wn(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Kn = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = K(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = J(i), p = vn(f), m = u[p], h = u[f], g = (e, t) => gn(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, qn = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = K(e, t), u = {
				x: n,
				y: r
			}, d = J(i), f = vn(d), p = u[f], m = u[d], h = K(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Un.has(q(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Jn = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = K(e, t), c = await i.detectOverflow(t, s), l = q(n), u = _n(n), d = J(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = U(p - c[m], g), y = U(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * W(c.left, c.right) : S = p - 2 * W(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Yn() {
	return typeof window < "u";
}
function Xn(e) {
	return Zn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Y(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function X(e) {
	return ((Zn(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Zn(e) {
	return Yn() ? e instanceof Node || e instanceof Y(e).Node : !1;
}
function Z(e) {
	return Yn() ? e instanceof Element || e instanceof Y(e).Element : !1;
}
function Q(e) {
	return Yn() ? e instanceof HTMLElement || e instanceof Y(e).HTMLElement : !1;
}
function Qn(e) {
	return !Yn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Y(e).ShadowRoot;
}
function $n(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function er(e) {
	return /^(table|td|th)$/.test(Xn(e));
}
function tr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var nr = /transform|translate|scale|rotate|perspective|filter/, rr = /paint|layout|strict|content/, ir = (e) => !!e && e !== "none", ar;
function or(e) {
	let t = Z(e) ? $(e) : e;
	return ir(t.transform) || ir(t.translate) || ir(t.scale) || ir(t.rotate) || ir(t.perspective) || !cr() && (ir(t.backdropFilter) || ir(t.filter)) || nr.test(t.willChange || "") || rr.test(t.contain || "");
}
function sr(e) {
	let t = dr(e);
	for (; Q(t) && !lr(t);) {
		if (or(t)) return t;
		if (tr(t)) return null;
		t = dr(t);
	}
	return null;
}
function cr() {
	return ar ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), ar;
}
function lr(e) {
	return /^(html|body|#document)$/.test(Xn(e));
}
function $(e) {
	return Y(e).getComputedStyle(e);
}
function ur(e) {
	return Z(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function dr(e) {
	if (Xn(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Qn(e) && e.host || X(e);
	return Qn(t) ? t.host : t;
}
function fr(e) {
	let t = dr(e);
	return lr(t) ? (e.ownerDocument || e).body : Q(t) && $n(t) ? t : fr(t);
}
function pr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = fr(e), i = r === e.ownerDocument?.body, a = Y(r);
	if (i) {
		let e = mr(a);
		return t.concat(a, a.visualViewport || [], $n(r) ? r : [], e && n ? pr(e) : []);
	}
	return t.concat(r, pr(r, [], n));
}
function mr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function hr(e) {
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Q(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = pn(n) !== a || pn(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function gr(e) {
	return Z(e) ? e : e.contextElement;
}
function _r(e) {
	let t = gr(e);
	if (!Q(t)) return G(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = hr(t), o = (a ? pn(n.width) : n.width) / r, s = (a ? pn(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var vr = /*#__PURE__*/ G(0);
function yr(e) {
	let t = Y(e);
	return !cr() || !t.visualViewport ? vr : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function br(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Y(e);
}
function xr(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = gr(e), o = G(1);
	t && (r ? Z(r) && (o = _r(r)) : o = _r(e));
	let s = br(a, n, r) ? yr(a) : G(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Y(a), t = Z(r) ? Y(r) : r, n = e, i = mr(n);
		for (; i && t !== n;) {
			let e = _r(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Y(i), i = mr(n);
		}
	}
	return Nn({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Sr(e, t) {
	let n = ur(e).scrollLeft;
	return t ? t.left + n : xr(X(e)).left + n;
}
function Cr(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Sr(e, n),
		y: n.top + t.scrollTop
	};
}
function wr(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = X(r), s = t ? tr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = G(1), u = G(0), d = Q(r);
	if ((d || !a) && ((Xn(r) !== "body" || $n(o)) && (c = ur(r)), d)) {
		let e = xr(r);
		l = _r(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Cr(o, c) : G(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Tr(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Er(e) {
	let t = ur(e), n = e.ownerDocument.body, r = W(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = W(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Sr(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += W(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Dr = 25;
function Or(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Y(e), a = X(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !cr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Sr(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Dr && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function kr(e, t) {
	let n = xr(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = _r(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Ar(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Or(e, n, t);
	else if (t === "document") r = Er(X(e));
	else if (Z(t)) r = kr(t, n);
	else {
		let n = yr(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Nn(r);
}
function jr(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = pr(e, [], !1).filter((e) => Z(e) && Xn(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? dr(e) : e;
	for (; Z(o) && !lr(o);) {
		let e = $(o), t = or(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = dr(o);
	}
	return t.set(e, r), r;
}
function Mr(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? tr(t) ? [] : jr(t, this._c) : [].concat(n), r], o = Ar(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Ar(t, a[e], i);
		s = W(n.top, s), c = U(n.right, c), l = U(n.bottom, l), u = W(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Nr(e) {
	let { width: t, height: n } = hr(e);
	return {
		width: t,
		height: n
	};
}
function Pr(e, t, n) {
	let r = Q(t), i = X(t), a = n === "fixed", o = xr(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = G(0);
	if ((r || !a) && ((Xn(t) !== "body" || $n(i)) && (s = ur(t)), r)) {
		let e = xr(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Sr(i));
	let l = i && !r && !a ? Cr(i, s) : G(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Fr(e) {
	return $(e).position === "static";
}
function Ir(e, t) {
	if (!Q(e) || $(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return X(e) === n && (n = n.ownerDocument.body), n;
}
function Lr(e, t) {
	let n = Y(e);
	if (tr(e)) return n;
	if (!Q(e)) {
		let t = dr(e);
		for (; t && !lr(t);) {
			if (Z(t) && !Fr(t)) return t;
			t = dr(t);
		}
		return n;
	}
	let r = Ir(e, t);
	for (; r && er(r) && Fr(r);) r = Ir(r, t);
	return r && lr(r) && Fr(r) && !or(r) ? n : r || sr(e) || n;
}
var Rr = async function(e) {
	let t = this.getOffsetParent || Lr, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Pr(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function zr(e) {
	return $(e).direction === "rtl";
}
var Br = {
	convertOffsetParentRelativeRectToViewportRelativeRect: wr,
	getDocumentElement: X,
	getClippingRect: Mr,
	getOffsetParent: Lr,
	getElementRects: Rr,
	getClientRects: Tr,
	getDimensions: Nr,
	getScale: _r,
	isElement: Z,
	isRTL: zr
};
function Vr(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Hr(e, t, n) {
	let r = null, i, a = X(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = mn(d), h = mn(a.clientWidth - (u + f)), g = mn(a.clientHeight - (d + p)), _ = mn(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: W(0, U(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Vr(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = Y(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Ur(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = gr(e), u = i || a ? [...l ? pr(l) : [], ...t ? pr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Hr(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? xr(e) : null;
	c && g();
	function g() {
		let t = xr(e);
		h && !Vr(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Wr = Gn, Gr = Kn, Kr = zn, qr = Jn, Jr = Hn, Yr = Rn, Xr = qn, Zr = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Br,
		...i.platform,
		_c: r
	};
	return Ln(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+vue@1.1.11_vue@3.5.40_typescript@6.0.3_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function Qr(e) {
	return typeof e == "object" && !!e && "$el" in e;
}
function $r(e) {
	if (Qr(e)) {
		let t = e.$el;
		return Zn(t) && Xn(t) === "#comment" ? null : t;
	}
	return e;
}
function ei(e) {
	return typeof e == "function" ? e() : N(e);
}
function ti(e) {
	return {
		name: "arrow",
		options: e,
		fn(t) {
			let n = $r(ei(e.element));
			return n == null ? {} : Yr({
				element: n,
				padding: e.padding
			}).fn(t);
		}
	};
}
function ni(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ri(e, t) {
	let n = ni(e);
	return Math.round(t * n) / n;
}
function ii(e, t, n) {
	n === void 0 && (n = {});
	let r = n.whileElementsMounted, i = E(() => ei(n.open) ?? !0), a = E(() => ei(n.middleware)), o = E(() => ei(n.placement) ?? "bottom"), s = E(() => ei(n.strategy) ?? "absolute"), c = E(() => ei(n.transform) ?? !0), l = E(() => $r(e.value)), u = E(() => $r(t.value)), d = j(0), f = j(0), p = j(s.value), m = j(o.value), h = O({}), _ = j(!1), v = E(() => {
		let e = {
			position: p.value,
			left: "0",
			top: "0"
		};
		if (!u.value) return e;
		let t = ri(u.value, d.value), n = ri(u.value, f.value);
		return c.value ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...ni(u.value) >= 1.5 && { willChange: "transform" }
		} : {
			position: p.value,
			left: t + "px",
			top: n + "px"
		};
	}), y;
	function x() {
		if (l.value == null || u.value == null) return;
		let e = i.value;
		Zr(l.value, u.value, {
			middleware: a.value,
			placement: o.value,
			strategy: s.value
		}).then((t) => {
			d.value = t.x, f.value = t.y, p.value = t.strategy, m.value = t.placement, h.value = t.middlewareData, _.value = e !== !1;
		});
	}
	function S() {
		typeof y == "function" && (y(), y = void 0);
	}
	function C() {
		if (S(), r === void 0) {
			x();
			return;
		}
		if (l.value != null && u.value != null) {
			y = r(l.value, u.value, x);
			return;
		}
	}
	function T() {
		i.value || (_.value = !1);
	}
	return g([
		a,
		o,
		s,
		i
	], x, { flush: "sync" }), g([l, u], C, { flush: "sync" }), g(i, T, { flush: "sync" }), b() && w(S), {
		x: M(d),
		y: M(f),
		strategy: M(p),
		placement: M(m),
		middlewareData: M(h),
		isPositioned: M(_),
		floatingStyles: v,
		update: x
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperContent.js
var ai = ["dir"], oi = {
	side: "bottom",
	sideOffset: 0,
	sideFlip: !0,
	align: "center",
	alignOffset: 0,
	alignFlip: !0,
	arrowPadding: 0,
	hideShiftedArrow: !0,
	avoidCollisions: !0,
	collisionBoundary: () => [],
	collisionPadding: 0,
	sticky: "partial",
	hideWhenDetached: !1,
	positionStrategy: "fixed",
	updatePositionStrategy: "optimized",
	prioritizePosition: !1
}, [si, ci] = /*#__PURE__*/ de("PopperContent"), li = /* @__PURE__ */ F({
	inheritAttrs: !1,
	__name: "PopperContent",
	props: /* @__PURE__ */ A({
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
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
	}, { ...oi }),
	emits: ["placed"],
	setup(e, { emit: n }) {
		let r = e, a = n, l = an(), { forwardRef: u, currentElement: d } = nt(), f = et(E(() => r.dir)), p = j(), m = j(), { width: h, height: g } = _t(m), v = E(() => r.side + (r.align === "center" ? "" : `-${r.align}`)), y = E(() => typeof r.collisionPadding == "number" ? r.collisionPadding : {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			...r.collisionPadding
		}), b = E(() => Array.isArray(r.collisionBoundary) ? r.collisionBoundary : [r.collisionBoundary]), S = E(() => ({
			padding: y.value,
			boundary: b.value.filter(ln),
			altBoundary: b.value.length > 0
		})), C = E(() => ({
			mainAxis: r.sideFlip,
			crossAxis: r.alignFlip
		})), w = E(() => [
			Wr({
				mainAxis: r.sideOffset + g.value,
				alignmentAxis: r.alignOffset
			}),
			r.prioritizePosition && r.avoidCollisions && Kr({
				...S.value,
				...C.value
			}),
			r.avoidCollisions && Gr({
				mainAxis: !0,
				crossAxis: !!r.prioritizePosition,
				limiter: r.sticky === "partial" ? Xr() : void 0,
				...S.value
			}),
			!r.prioritizePosition && r.avoidCollisions && Kr({
				...S.value,
				...C.value
			}),
			qr({
				...S.value,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--reka-popper-available-width", `${n}px`), o.setProperty("--reka-popper-available-height", `${r}px`), o.setProperty("--reka-popper-anchor-width", `${i}px`), o.setProperty("--reka-popper-anchor-height", `${a}px`);
				}
			}),
			m.value && ti({
				element: m.value,
				padding: r.arrowPadding
			}),
			un({
				arrowWidth: h.value,
				arrowHeight: g.value,
				dir: f.value
			}),
			r.hideWhenDetached && Jr({
				strategy: "referenceHidden",
				...S.value
			})
		]), { floatingStyles: T, placement: ee, isPositioned: D, middlewareData: O, update: k } = ii(E(() => r.reference ?? l.anchor.value), p, {
			strategy: r.positionStrategy,
			placement: v,
			whileElementsMounted: (...e) => Ur(...e, {
				layoutShift: !r.disableUpdateOnLayoutShift,
				animationFrame: r.updatePositionStrategy === "always"
			}),
			middleware: w
		}), A = E(() => dn(ee.value)[0]), te = E(() => dn(ee.value)[1]);
		i(() => {
			D.value && a("placed");
		});
		let ne = E(() => {
			let e = O.value.arrow?.centerOffset !== 0;
			return r.hideShiftedArrow && e;
		}), ie = j("");
		return _(() => {
			d.value && (ie.value = window.getComputedStyle(d.value).zIndex);
		}), ci({
			placedSide: A,
			onArrowChange: (e) => m.value = e,
			arrowX: E(() => O.value.arrow?.x ?? 0),
			arrowY: E(() => O.value.arrow?.y ?? 0),
			shouldHideArrow: ne
		}), (e, n) => (o(), x("div", {
			ref_key: "floatingRef",
			ref: p,
			"data-reka-popper-content-wrapper": "",
			dir: N(f),
			style: re({
				...N(T),
				transform: N(D) ? N(T).transform : "translate(0, -200%)",
				minWidth: "max-content",
				zIndex: ie.value,
				"--reka-popper-transform-origin": [N(O).transformOrigin?.x, N(O).transformOrigin?.y].join(" "),
				...N(O).hide?.referenceHidden && {
					visibility: "hidden",
					pointerEvents: "none"
				}
			})
		}, [r.memoDependencies ? s([
			r.asChild,
			r.as,
			A.value,
			te.value,
			N(D),
			...Object.values(e.$attrs),
			...r.memoDependencies
		], () => (o(), P(N(B), t({
			key: 0,
			ref: N(u)
		}, e.$attrs, {
			"as-child": r.asChild,
			as: r.as,
			"data-side": A.value,
			"data-align": te.value,
			style: { animation: N(D) ? void 0 : "none" }
		}), {
			default: c(() => [I(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"style"
		])), n, 0) : (o(), P(N(B), t({
			key: 1,
			ref: N(u)
		}, e.$attrs, {
			"as-child": r.asChild,
			as: r.as,
			"data-side": A.value,
			"data-align": te.value,
			dir: N(f),
			style: { animation: N(D) ? void 0 : "none" }
		}), {
			default: c(() => [I(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"dir",
			"style"
		]))], 12, ai));
	}
});
//#endregion
export { ue as $, tt as A, He as B, B as C, it as D, mt as E, Re as F, Oe as G, Te as H, z as I, Ae as J, me as K, Pe as L, Ze as M, Ye as N, rt as O, We as P, de as Q, ze as R, wt as S, gt as T, R as U, he as V, De as W, fe as X, pe as Y, L as Z, Ut as _, sn as a, At as b, en as c, qt as d, Gt as f, Qt as g, $t as h, cn as i, et as j, nt as k, Jt as l, Yt as m, li as n, rn as o, Xt as p, je as q, si as r, nn as s, oi as t, Wt as u, Lt as v, xt as w, V as x, zt as y, Ve as z };

//# sourceMappingURL=PopperContent-_OEj_1Tb.js.map