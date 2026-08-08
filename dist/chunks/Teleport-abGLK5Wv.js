import { $ as e, A as t, B as n, D as r, I as i, J as a, K as o, M as s, N as c, O as l, P as u, Q as d, S as f, T as p, U as m, V as h, Y as g, Z as _, at as v, ct as y, d as b, dt as x, et as S, f as ee, g as te, h as C, it as w, j as ne, k as re, l as ie, ot as ae, p as T, pt as oe, q as E, r as se, st as D, tt as O, u as ce, w as k, x as A, z as le } from "./vue-i18n-CmRk7RjK.js";
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
	return a() ? (_(e, t), !0) : !1;
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
	let t = !1, n, r = E(!0);
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
	return ((...a) => (t += 1, r || (r = E(!0), n = r.run(() => e(...a))), P(i), n));
}
function be(e) {
	return g(e) ? d(new Proxy({}, {
		get(t, n, r) {
			return D(Reflect.get(e.value, n, r));
		},
		set(t, n, r) {
			return g(e.value[n]) && !g(r) ? e.value[n].value = r : e.value[n] = r, !0;
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
	})) : d(e);
}
function xe(e) {
	return be(T(e));
}
function Se(e, t = 1e4) {
	return o((n, r) => {
		let i = v(e), a, o = () => setTimeout(() => {
			i = v(e), r();
		}, v(t));
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
	ve(t) && re(e, t);
}
function L(e, t, n = {}) {
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
		}, v(t));
	}
	return r && (a.value = !0, F && l()), P(c), {
		isPending: S(a),
		start: l,
		stop: c
	};
}
function we(e = 1e3, t = {}) {
	let { controls: n = !1, callback: r } = t, i = L(r ?? he, e, t), a = T(() => !i.isPending.value);
	return n ? {
		ready: a,
		...i
	} : a;
}
function Te(e, t, r) {
	return n(e, t, {
		...r,
		immediate: !0
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var R = F ? window : void 0;
F && window.document, F && window.navigator, F && window.location;
function z(e) {
	let t = v(e);
	return t?.$el ?? t;
}
function B(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = T(() => {
		let t = I(v(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return Te(() => [
		n.value?.map((e) => z(e)) ?? [R].filter((e) => e != null),
		I(v(n.value ? e[1] : e[0])),
		I(D(n.value ? e[2] : e[1])),
		v(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = me(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function V() {
	let e = O(!1), n = f();
	return n && t(() => {
		e.value = !0;
	}, n), e;
}
/* @__NO_SIDE_EFFECTS__ */
function Ee(e) {
	let t = V();
	return T(() => (t.value, !!e()));
}
function De(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function H(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = R, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = De(t);
	return B(i, a, (e) => {
		e.repeat && v(s) || c(e) && n(e);
	}, o);
}
function Oe(e, t = {}) {
	let { immediate: n = !0, fpsLimit: r = null, window: i = R, once: a = !1 } = t, o = O(!1), s = T(() => {
		let e = v(r);
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
		isActive: S(o),
		pause: f,
		resume: d
	};
}
function ke(e) {
	return JSON.parse(JSON.stringify(e));
}
function Ae(e, t, r = {}) {
	let { window: i = R, ...a } = r, o, s = /* @__PURE__ */ Ee(() => i && "ResizeObserver" in i), c = () => {
		o &&= (o.disconnect(), void 0);
	}, l = n(T(() => {
		let t = v(e);
		return Array.isArray(t) ? t.map((e) => z(e)) : [z(t)];
	}), (e) => {
		if (c(), s.value && i) {
			o = new ResizeObserver(t);
			for (let t of e) t && o.observe(t, a);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), u = () => {
		c(), l();
	};
	return P(u), {
		isSupported: s,
		stop: u
	};
}
function je(t, r, i, a = {}) {
	var o, s;
	let { clone: c = !1, passive: u = !1, eventName: d, deep: p = !1, defaultValue: m, shouldEmit: h } = a, g = f(), _ = i || g?.emit || (g == null || (o = g.$emit) == null ? void 0 : o.bind(g)) || (g == null || (s = g.proxy) == null || (s = s.$emit) == null ? void 0 : s.bind(g?.proxy)), v = d;
	r ||= "modelValue", v ||= `update:${r.toString()}`;
	let y = (e) => c ? typeof c == "function" ? c(e) : ke(e) : e, b = () => fe(t[r]) ? y(t[r]) : m, x = (e) => {
		h ? h(e) && _(v, e) : _(v, e);
	};
	if (u) {
		let i = e(b()), a = !1;
		return n(() => t[r], (e) => {
			a || (a = !0, i.value = y(e), l(() => a = !1));
		}), n(i, (e) => {
			!a && (e !== t[r] || p) && x(e);
		}, { deep: p }), i;
	}
	return T({
		get() {
			return b();
		},
		set(e) {
			x(e);
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/renderSlotFragments.js
function U(e) {
	return e ? e.flatMap((e) => e.type === ce ? U(e.children) : [e]) : [];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [W, Me] = /*#__PURE__*/ j("ConfigProvider");
//#endregion
//#region ../../node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function G(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function K(e, t, n = ".", r) {
	if (!G(t)) return K(e, {}, n, r);
	let i = { ...t };
	for (let t of Object.keys(e)) {
		if (t === "__proto__" || t === "constructor") continue;
		let a = e[t];
		a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : G(a) && G(i[t]) ? K(a, i[t], (n ? `${n}.` : "") + t.toString(), r) : a));
	}
	return i;
}
function Ne(e) {
	return (...t) => t.reduce((t, n) => K(t, n, "", e), {});
}
var Pe = Ne();
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useEmitAsProps.js
function Fe(e) {
	let t = f(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[oe(y(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function q() {
	let t = f(), n = e(), r = T(() => i());
	s(() => {
		r.value !== i() && ae(n);
	});
	function i() {
		return n.value && "$el" in n.value && ["#text", "#comment"].includes(n.value.$el.nodeName) ? n.value.$el.nextElementSibling : z(n);
	}
	let a = Object.assign({}, t.exposed), o = {};
	for (let e in t.props) Object.defineProperty(o, e, {
		enumerable: !0,
		configurable: !0,
		get: () => t.props[e]
	});
	if (Object.keys(a).length > 0) for (let e in a) Object.defineProperty(o, e, {
		enumerable: !0,
		configurable: !0,
		get: () => a[e]
	});
	Object.defineProperty(o, "$el", {
		enumerable: !0,
		configurable: !0,
		get: () => t.vnode.el
	}), t.exposed = o;
	function c(e) {
		if (n.value = e, e && (Object.defineProperty(o, "$el", {
			enumerable: !0,
			configurable: !0,
			get: () => e instanceof Element ? e : e.$el
		}), !(e instanceof Element) && !Object.hasOwn(e, "$el"))) {
			let n = e.$.exposed, r = Object.assign({}, o);
			for (let e in n) Object.defineProperty(r, e, {
				enumerable: !0,
				configurable: !0,
				get: () => n[e]
			});
			t.exposed = r;
		}
	}
	return {
		forwardRef: c,
		currentRef: n,
		currentElement: r
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var Ie = 0;
function Le(e, t = "reka") {
	if (e) return e;
	let n, r = W({ useId: void 0 });
	return n = r.useId ? r.useId() : "useId" in se ? le?.() : `${++Ie}`, t ? `${t}-${n}` : n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
function Re(t, n) {
	let r = e(t);
	function i(e) {
		return n[r.value][e] ?? r.value;
	}
	return {
		state: r,
		dispatch: (e) => {
			r.value = i(e);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/usePresence.js
function ze(t, r) {
	let i = e({}), a = e("none"), o = e(t), s = t.value ? "mounted" : "unmounted", c, u = r.value?.ownerDocument.defaultView ?? R, { state: d, dispatch: f } = Re(s, {
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
		if (F) {
			let t = new CustomEvent(e, {
				bubbles: !1,
				cancelable: !1
			});
			r.value?.dispatchEvent(t);
		}
	};
	n(t, async (e, t) => {
		let n = t !== e;
		if (await l(), n) {
			let n = a.value, o = J(r.value);
			e ? (f("MOUNT"), p("enter"), o === "none" && p("after-enter")) : o === "none" || o === "undefined" || i.value?.display === "none" ? (f("UNMOUNT"), p("leave"), p("after-leave")) : t && n !== o ? (f("ANIMATION_OUT"), p("leave")) : (f("UNMOUNT"), p("after-leave"));
		}
	}, { immediate: !0 });
	let m = (e) => {
		let t = J(r.value), n = t.includes(CSS.escape(e.animationName)), i = d.value === "mounted" ? "enter" : "leave";
		if (e.target === r.value && n && (p(`after-${i}`), f("ANIMATION_END"), !o.value)) {
			let e = r.value.style.animationFillMode;
			r.value.style.animationFillMode = "forwards", c = u?.setTimeout(() => {
				r.value?.style.animationFillMode === "forwards" && (r.value.style.animationFillMode = e);
			});
		}
		e.target === r.value && t === "none" && f("ANIMATION_END");
	}, h = (e) => {
		e.target === r.value && (a.value = J(r.value));
	}, g = n(r, (e, t) => {
		e ? (i.value = getComputedStyle(e), e.addEventListener("animationstart", h), e.addEventListener("animationcancel", m), e.addEventListener("animationend", m)) : (f("ANIMATION_END"), c !== void 0 && u?.clearTimeout(c), t?.removeEventListener("animationstart", h), t?.removeEventListener("animationcancel", m), t?.removeEventListener("animationend", m));
	}, { immediate: !0 }), _ = n(d, () => {
		let e = J(r.value);
		a.value = d.value === "mounted" ? e : "none";
	});
	return ne(() => {
		g(), _(), r.value && (r.value.removeEventListener("animationstart", h), r.value.removeEventListener("animationcancel", m), r.value.removeEventListener("animationend", m)), c !== void 0 && u?.clearTimeout(c);
	}), { isPresent: T(() => ["mounted", "unmountSuspended"].includes(d.value)) };
}
function J(e) {
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
	setup(t, { slots: n, expose: r }) {
		let { present: i, forceMount: a } = w(t), o = e(), { isPresent: s } = ze(i, o);
		r({ present: s });
		let c = n.default({ present: s.value });
		c = U(c || []);
		let l = f();
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
		return () => a.value || i.value || s.value ? k(n.default({ present: s.value })[0], { ref: (e) => {
			let t = z(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? o.value = t.firstElementChild : o.value = t), t;
		} }) : null;
	}
}), Y = /*#__PURE__*/ A({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			if (!n.default) return null;
			let e = U(n.default()), i = e.findIndex((e) => e.type !== ie);
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
}), X = [
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
		return typeof r == "string" && X.includes(r) ? () => k(r, t) : r === "template" ? () => k(Y, t, { default: n.default }) : () => k(e.as, t, { default: n.default });
	}
}), Ve = "dismissableLayer.pointerDownOutside", He = "dismissableLayer.focusOutside";
function Q(e, t) {
	if (!(t instanceof Element)) return !1;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function Ue(t, n, r = !0) {
	let i = n?.value?.ownerDocument ?? globalThis?.document, a = e(!1), o = e(() => {});
	return h((e) => {
		if (!F || !v(r)) return;
		let s = async (e) => {
			let r = e.target;
			if (!(!n?.value || !r)) {
				if (Q(n.value, r)) {
					a.value = !1;
					return;
				}
				if (e.target && !a.value) {
					let n = { originalEvent: e };
					function r() {
						M(Ve, t, n);
					}
					e.pointerType === "touch" ? (i.removeEventListener("click", o.value), o.value = r, i.addEventListener("click", o.value, { once: !0 })) : r();
				} else i.removeEventListener("click", o.value);
				a.value = !1;
			}
		}, c = window.setTimeout(() => {
			i.addEventListener("pointerdown", s);
		}, 0);
		e(() => {
			window.clearTimeout(c), i.removeEventListener("pointerdown", s), i.removeEventListener("click", o.value);
		});
	}), { onPointerDownCapture: () => {
		v(r) && (a.value = !0);
	} };
}
function We(t, n, r = !0) {
	let i = n?.value?.ownerDocument ?? globalThis?.document, a = e(!1);
	return h((e) => {
		if (!F || !v(r)) return;
		let o = async (e) => {
			if (!n?.value) return;
			await l(), await l();
			let r = e.target;
			!n.value || !r || Q(n.value, r) || e.target && !a.value && M(He, t, { originalEvent: e });
		};
		i.addEventListener("focusin", o), e(() => i.removeEventListener("focusin", o));
	}), {
		onFocusCapture: () => {
			v(r) && (a.value = !0);
		},
		onBlurCapture: () => {
			v(r) && (a.value = !1);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var $ = /*#__PURE__*/ d({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
}), Ge = /* @__PURE__ */ A({
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
		let r = e, a = t, { forwardRef: o, currentElement: s } = q(), u = T(() => s.value?.ownerDocument ?? globalThis.document), d = T(() => $.layersRoot), f = T(() => s.value ? Array.from(d.value).indexOf(s.value) : -1), p = T(() => $.layersWithOutsidePointerEventsDisabled.size > 0), g = T(() => {
			let e = Array.from(d.value), [t] = [...$.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return f.value >= n;
		}), _ = Ue(async (e) => {
			let t = [...$.branches].some((t) => t?.contains(e.target));
			!r.present || !g.value || t || (a("pointerDownOutside", e), a("interactOutside", e), await l(), e.defaultPrevented || a("dismiss"));
		}, s), v = We((e) => {
			let t = [...$.branches].some((t) => t?.contains(e.target));
			!r.present || t || (a("focusOutside", e), a("interactOutside", e), e.defaultPrevented || a("dismiss"));
		}, s);
		return H("Escape", (e) => {
			r.present && f.value === d.value.size - 1 && (a("escapeKeyDown", e), e.defaultPrevented || a("dismiss"));
		}), n([
			s,
			() => r.disableOutsidePointerEvents,
			() => r.present
		], ([e, t, n], r, i) => {
			!e || !n || t && ($.layersWithOutsidePointerEventsDisabled.size === 0 && ($.originalBodyPointerEvents = u.value.body.style.pointerEvents, u.value.body.style.pointerEvents = "none"), $.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				$.layersWithOutsidePointerEventsDisabled.delete(e), $.layersWithOutsidePointerEventsDisabled.size === 0 && !N($.originalBodyPointerEvents) && (u.value.body.style.pointerEvents = $.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), n([s, () => r.present], ([e, t], n, r) => {
			!e || !t || (d.value.add(e), r(() => {
				d.value.delete(e);
			}));
		}, { immediate: !0 }), h((e) => {
			e(() => {
				s.value && (d.value.delete(s.value), $.layersWithOutsidePointerEventsDisabled.delete(s.value));
			});
		}), (e, t) => (c(), C(D(Z), {
			ref: D(o),
			"as-child": e.asChild,
			as: e.as,
			"data-dismissable-layer": "",
			style: x({ pointerEvents: p.value ? g.value ? "auto" : "none" : void 0 }),
			onFocusCapture: D(v).onFocusCapture,
			onBlurCapture: D(v).onBlurCapture,
			onPointerdownCapture: D(_).onPointerDownCapture
		}, {
			default: m(() => [i(e.$slots, "default")]),
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
}), Ke = /* @__PURE__ */ A({
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
		let t = e, n = W({}), r = T(() => t.to ?? n.teleportTo?.value ?? "body"), a = V();
		return (e, t) => D(a) || e.forceMount ? (c(), C(b, {
			key: 0,
			to: r.value,
			disabled: e.disabled,
			defer: e.defer
		}, [i(e.$slots, "default")], 8, [
			"to",
			"disabled",
			"defer"
		])) : te("v-if", !0);
	}
});
//#endregion
export { M as A, xe as C, we as D, P as E, L as O, ge as S, Ce as T, je as _, Y as a, ye as b, q as c, W as d, H as f, Ae as g, Oe as h, Z as i, j, N as k, Fe as l, B as m, Ge as n, Be as o, z as p, $ as r, Le as s, Ke as t, Pe as u, ue as v, Se as w, F as x, de as y };
