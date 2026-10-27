import { $ as e, A as t, B as n, D as r, H as i, I as a, J as o, M as s, N as c, O as l, P as u, Q as d, S as f, T as p, V as m, W as h, X as g, Y as _, at as v, ct as y, d as b, et as x, f as ee, ft as te, g as ne, h as S, j as re, k as ie, l as ae, lt as oe, mt as C, nt as w, ot as T, p as E, q as se, r as ce, st as le, tt as D, u as O, w as k, x as A } from "./vue-i18n-DUz2Gjn8.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/createContext.js
function j(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
	return [(t) => {
		let n = p(r, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (u(r, e), e)];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function M(e, t, n) {
	let r = n.originalEvent.target, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/nullish.js
function N(e) {
	return e == null;
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+shared@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/shared/dist/index.js
function P(e, t) {
	return _() ? (d(e, t), !0) : !1;
}
function ue() {
	let e = /* @__PURE__ */ new Set(), t = (t) => {
		e.delete(t);
	};
	return {
		on: (n) => {
			e.add(n);
			let r = () => t(n);
			return P(r), { off: r };
		},
		off: t,
		trigger: (...t) => Promise.all(Array.from(e).map((e) => e(...t))),
		clear: () => {
			e.clear();
		}
	};
}
function de(e) {
	let t = !1, n, r = o(!0);
	return ((...i) => (t ||= (n = r.run(() => e(...i)), !0), n));
}
var F = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var fe = (e) => e !== void 0, pe = Object.prototype.toString, me = (e) => pe.call(e) === "[object Object]", he = () => {}, ge = /* #__PURE__ */ _e();
function _e() {
	var e, t;
	return F && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function I(e) {
	return Array.isArray(e) ? e : [e];
}
function ve(e) {
	return e || f();
}
function ye(e) {
	if (!F) return e;
	let t = 0, n, r, i = () => {
		--t, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
	};
	return ((...a) => (t += 1, r || (r = o(!0), n = r.run(() => e(...a))), P(i), n));
}
function be(t) {
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
function L(e) {
	return be(E(e));
}
function xe(e, ...t) {
	let n = t.flat(), r = n[0];
	return L(() => Object.fromEntries(typeof r == "function" ? Object.entries(v(e)).filter(([e, t]) => !r(T(t), e)) : Object.entries(v(e)).filter((e) => !n.includes(e[0]))));
}
function Se(e, t = 1e4) {
	return se((n, r) => {
		let i = T(e), a, o = () => setTimeout(() => {
			i = T(e), r();
		}, T(t));
		return P(() => {
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
function Ce(e, t) {
	ve(t) && ie(e, t);
}
function R(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = w(!1), o;
	function s() {
		o &&= (clearTimeout(o), void 0);
	}
	function c() {
		a.value = !1, s();
	}
	function l(...n) {
		i && e(), s(), a.value = !0, o = setTimeout(() => {
			a.value = !1, o = void 0, e(...n);
		}, T(t));
	}
	return r && (a.value = !0, F && l()), P(c), {
		isPending: D(a),
		start: l,
		stop: c
	};
}
function we(e = 1e3, t = {}) {
	let { controls: n = !1, callback: r } = t, i = R(r ?? he, e, t), a = E(() => !i.isPending.value);
	return n ? {
		ready: a,
		...i
	} : a;
}
function Te(e, t, n) {
	return m(e, t, {
		...n,
		immediate: !0
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var z = F ? window : void 0;
F && window.document, F && window.navigator, F && window.location;
function B(e) {
	let t = T(e);
	return t?.$el ?? t;
}
function V(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = E(() => {
		let t = I(T(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return Te(() => [
		n.value?.map((e) => B(e)) ?? [z].filter((e) => e != null),
		I(T(n.value ? e[1] : e[0])),
		I(y(n.value ? e[2] : e[1])),
		T(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = me(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function H() {
	let e = w(!1), n = f();
	return n && t(() => {
		e.value = !0;
	}, n), e;
}
/* @__NO_SIDE_EFFECTS__ */
function Ee(e) {
	let t = H();
	return E(() => (t.value, !!e()));
}
function De(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function U(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = z, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = De(t);
	return V(i, a, (e) => {
		e.repeat && T(s) || c(e) && n(e);
	}, o);
}
function Oe(e, t = {}) {
	let { immediate: n = !0, fpsLimit: r = null, window: i = z, once: a = !1 } = t, o = w(!1), s = E(() => {
		let e = T(r);
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
	return n && d(), P(f), {
		isActive: D(o),
		pause: f,
		resume: d
	};
}
function ke(e) {
	return JSON.parse(JSON.stringify(e));
}
function Ae(e, t, n = {}) {
	let { window: r = z, ...i } = n, a, o = /* @__PURE__ */ Ee(() => r && "ResizeObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, c = m(E(() => {
		let t = T(e);
		return Array.isArray(t) ? t.map((e) => B(e)) : [B(t)];
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
	return P(l), {
		isSupported: o,
		stop: l
	};
}
function je(e, t, n, r = {}) {
	var i, a;
	let { clone: o = !1, passive: s = !1, eventName: c, deep: u = !1, defaultValue: d, shouldEmit: p } = r, h = f(), g = n || h?.emit || (h == null || (i = h.$emit) == null ? void 0 : i.bind(h)) || (h == null || (a = h.proxy) == null || (a = a.$emit) == null ? void 0 : a.bind(h?.proxy)), _ = c;
	t ||= "modelValue", _ ||= `update:${t.toString()}`;
	let v = (e) => o ? typeof o == "function" ? o(e) : ke(e) : e, y = () => fe(e[t]) ? v(e[t]) : d, b = (e) => {
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
	return E({
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
function W(e) {
	return e ? e.flatMap((e) => e.type === O ? W(e.children) : [e]) : [];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [G, Me] = /*#__PURE__*/ j("ConfigProvider");
//#endregion
//#region ../../node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function K(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function q(e, t, n = ".", r) {
	if (!K(t)) return q(e, {}, n, r);
	let i = { ...t };
	for (let t of Object.keys(e)) {
		if (t === "__proto__" || t === "constructor") continue;
		let a = e[t];
		a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : K(a) && K(i[t]) ? q(a, i[t], (n ? `${n}.` : "") + t.toString(), r) : a));
	}
	return i;
}
function Ne(e) {
	return (...t) => t.reduce((t, n) => q(t, n, "", e), {});
}
var Pe = Ne();
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useEmitAsProps.js
function Fe(e) {
	let t = f(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[C(oe(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function J() {
	let e = f(), t = x(), n = E(() => r());
	s(() => {
		n.value !== r() && le(t);
	});
	function r() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : B(t);
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
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var Ie = 0;
function Le(e, t = "reka") {
	if (e) return e;
	let r, i = G({ useId: void 0 });
	return r = i.useId ? i.useId() : "useId" in ce ? n?.() : `${++Ie}`, t ? `${t}-${r}` : r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
function Re(e, t) {
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
function ze(e, t) {
	let n = x({}), r = x("none"), i = x(e), a = e.value ? "mounted" : "unmounted", o, s = t.value?.ownerDocument.defaultView ?? z, { state: c, dispatch: u } = Re(a, {
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
		if (F) {
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
			let a = r.value, o = Y(t.value);
			e ? (u("MOUNT"), d("enter"), o === "none" && d("after-enter")) : o === "none" || o === "undefined" || n.value?.display === "none" ? (u("UNMOUNT"), d("leave"), d("after-leave")) : i && a !== o ? (u("ANIMATION_OUT"), d("leave")) : (u("UNMOUNT"), d("after-leave"));
		}
	}, { immediate: !0 });
	let f = (e) => {
		let n = Y(t.value), r = n.includes(CSS.escape(e.animationName)), a = c.value === "mounted" ? "enter" : "leave";
		if (e.target === t.value && r && (d(`after-${a}`), u("ANIMATION_END"), !i.value)) {
			let e = t.value.style.animationFillMode;
			t.value.style.animationFillMode = "forwards", o = s?.setTimeout(() => {
				t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = e);
			});
		}
		e.target === t.value && n === "none" && u("ANIMATION_END");
	}, p = (e) => {
		e.target === t.value && (r.value = Y(t.value));
	}, h = m(t, (e, t) => {
		e ? (n.value = getComputedStyle(e), e.addEventListener("animationstart", p), e.addEventListener("animationcancel", f), e.addEventListener("animationend", f)) : (u("ANIMATION_END"), o !== void 0 && s?.clearTimeout(o), t?.removeEventListener("animationstart", p), t?.removeEventListener("animationcancel", f), t?.removeEventListener("animationend", f));
	}, { immediate: !0 }), g = m(c, () => {
		let e = Y(t.value);
		r.value = c.value === "mounted" ? e : "none";
	});
	return re(() => {
		h(), g(), t.value && (t.value.removeEventListener("animationstart", p), t.value.removeEventListener("animationcancel", f), t.value.removeEventListener("animationend", f)), o !== void 0 && s?.clearTimeout(o);
	}), { isPresent: E(() => ["mounted", "unmountSuspended"].includes(c.value)) };
}
function Y(e) {
	return e && getComputedStyle(e).animationName || "none";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/Presence.js
var Be = /*#__PURE__*/ A({
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
		let { present: r, forceMount: i } = v(e), a = x(), { isPresent: o } = ze(r, a);
		n({ present: o });
		let s = t.default({ present: o.value });
		s = W(s || []);
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
		return () => i.value || r.value || o.value ? k(t.default({ present: o.value })[0], { ref: (e) => {
			let t = B(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? a.value = t.firstElementChild : a.value = t), t;
		} }) : null;
	}
}), X = /*#__PURE__*/ A({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			if (!n.default) return null;
			let e = W(n.default()), i = e.findIndex((e) => e.type !== ae);
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
}), Ve = [
	"area",
	"img",
	"input"
], Z = /*#__PURE__*/ A({
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
		return typeof r == "string" && Ve.includes(r) ? () => k(r, t) : r === "template" ? () => k(X, t, { default: n.default }) : () => k(e.as, t, { default: n.default });
	}
}), He = "dismissableLayer.pointerDownOutside", Ue = "dismissableLayer.focusOutside";
function Q(e, t) {
	if (!(t instanceof Element)) return !1;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function We(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, a = x(!1), o = x(() => {});
	return i((i) => {
		if (!F || !T(n)) return;
		let s = async (n) => {
			let i = n.target;
			if (!(!t?.value || !i)) {
				if (Q(t.value, i)) {
					a.value = !1;
					return;
				}
				if (n.target && !a.value) {
					let t = { originalEvent: n };
					function i() {
						M(He, e, t);
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
		T(n) && (a.value = !0);
	} };
}
function Ge(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, a = x(!1);
	return i((i) => {
		if (!F || !T(n)) return;
		let o = async (n) => {
			if (!t?.value) return;
			await l(), await l();
			let r = n.target;
			!t.value || !r || Q(t.value, r) || n.target && !a.value && M(Ue, e, { originalEvent: n });
		};
		r.addEventListener("focusin", o), i(() => r.removeEventListener("focusin", o));
	}), {
		onFocusCapture: () => {
			T(n) && (a.value = !0);
		},
		onBlurCapture: () => {
			T(n) && (a.value = !1);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var $ = /*#__PURE__*/ e({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
}), Ke = /* @__PURE__ */ A({
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
		let n = e, r = t, { forwardRef: o, currentElement: s } = J(), u = E(() => s.value?.ownerDocument ?? globalThis.document), d = E(() => $.layersRoot), f = E(() => s.value ? Array.from(d.value).indexOf(s.value) : -1), p = E(() => $.layersWithOutsidePointerEventsDisabled.size > 0), g = E(() => {
			let e = Array.from(d.value), [t] = [...$.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return f.value >= n;
		}), _ = We(async (e) => {
			let t = [...$.branches].some((t) => t?.contains(e.target));
			!n.present || !g.value || t || (r("pointerDownOutside", e), r("interactOutside", e), await l(), e.defaultPrevented || r("dismiss"));
		}, s), v = Ge((e) => {
			let t = [...$.branches].some((t) => t?.contains(e.target));
			!n.present || t || (r("focusOutside", e), r("interactOutside", e), e.defaultPrevented || r("dismiss"));
		}, s);
		return U("Escape", (e) => {
			n.present && f.value === d.value.size - 1 && (r("escapeKeyDown", e), e.defaultPrevented || r("dismiss"));
		}), m([
			s,
			() => n.disableOutsidePointerEvents,
			() => n.present
		], ([e, t, n], r, i) => {
			!e || !n || t && ($.layersWithOutsidePointerEventsDisabled.size === 0 && ($.originalBodyPointerEvents = u.value.body.style.pointerEvents, u.value.body.style.pointerEvents = "none"), $.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				$.layersWithOutsidePointerEventsDisabled.delete(e), $.layersWithOutsidePointerEventsDisabled.size === 0 && !N($.originalBodyPointerEvents) && (u.value.body.style.pointerEvents = $.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), m([s, () => n.present], ([e, t], n, r) => {
			!e || !t || (d.value.add(e), r(() => {
				d.value.delete(e);
			}));
		}, { immediate: !0 }), i((e) => {
			e(() => {
				s.value && (d.value.delete(s.value), $.layersWithOutsidePointerEventsDisabled.delete(s.value));
			});
		}), (e, t) => (c(), S(y(Z), {
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
}), qe = /* @__PURE__ */ A({
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
		let t = e, n = G({}), r = E(() => t.to ?? n.teleportTo?.value ?? "body"), i = H();
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
export { N as A, L as C, P as D, Ce as E, j as M, we as O, ge as S, Se as T, je as _, X as a, ye as b, J as c, G as d, U as f, Ae as g, Oe as h, Z as i, M as j, R as k, Fe as l, V as m, Ke as n, Be as o, B as p, $ as r, Le as s, qe as t, Pe as u, ue as v, xe as w, F as x, de as y };
