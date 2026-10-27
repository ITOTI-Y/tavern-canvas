import { $ as e, H as t, I as n, N as r, O as i, V as a, W as o, ct as s, et as c, h as l, j as u, p as d, x as f } from "./vue-i18n-DUz2Gjn8.js";
import { E as p, S as m, b as h, c as g, d as _, i as v, m as y, p as b, u as x, x as S, y as C } from "./Teleport-CZ6NJvBB.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/getActiveElement.js
function w() {
	let e = document.activeElement;
	if (e == null) return null;
	for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null;) e = e.shadowRoot.activeElement;
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useBodyScrollLock.js
var T = h(() => {
	let e = c(/* @__PURE__ */ new Map()), t = c(), n = d(() => {
		for (let t of e.value.values()) if (t) return !0;
		return !1;
	}), r = _({ scrollBody: c(!0) }), o = null, s = () => {
		document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", m && o?.(), t.value = void 0;
	};
	return a(n, (e, a) => {
		if (!S) return;
		if (!e) {
			a && s();
			return;
		}
		t.value === void 0 && (t.value = document.body.style.overflow);
		let c = window.innerWidth - document.documentElement.clientWidth, l = {
			padding: c,
			margin: 0
		}, u = r.scrollBody?.value ? typeof r.scrollBody.value == "object" ? x({
			padding: r.scrollBody.value.padding === !0 ? c : r.scrollBody.value.padding,
			margin: r.scrollBody.value.margin === !0 ? c : r.scrollBody.value.margin
		}, l) : l : {
			padding: 0,
			margin: 0
		};
		c > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.documentElement.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), m && (o = y(document, "touchmove", (e) => O(e), { passive: !1 })), i(() => {
			n.value && (document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden");
		});
	}, {
		immediate: !0,
		flush: "sync"
	}), e;
});
function E(e) {
	let t = Math.random().toString(36).substring(2, 7), n = T();
	n.value.set(t, e ?? !1);
	let r = d({
		get: () => n.value.get(t) ?? !1,
		set: (e) => n.value.set(t, e)
	});
	return p(() => {
		n.value.delete(t);
	}), r;
}
function D(e) {
	let t = window.getComputedStyle(e);
	if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
	{
		let t = e.parentNode;
		return !(t instanceof Element) || t.tagName === "BODY" ? !1 : D(t);
	}
}
function O(e) {
	let t = e || window.event, n = t.target;
	return n instanceof Element && D(n) ? !1 : t.touches.length > 1 || (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
//#endregion
//#region ../../node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var k = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, A = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), M = {}, N = 0, P = function(e) {
	return e && (e.host || P(e.parentNode));
}, F = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = P(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, I = function(e, t, n, r) {
	var i = F(t, Array.isArray(e) ? e : [e]);
	M[n] || (M[n] = /* @__PURE__ */ new WeakMap());
	var a = M[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (A.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				A.set(e, c), a.set(e, l), o.push(e), c === 1 && i && j.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), N++, function() {
		o.forEach(function(e) {
			var t = A.get(e) - 1, i = a.get(e) - 1;
			A.set(e, t), a.set(e, i), t || (j.has(e) || e.removeAttribute(r), j.delete(e)), i || e.removeAttribute(n);
		}), N--, N || (A = /* @__PURE__ */ new WeakMap(), A = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), M = {});
	};
}, L = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || k(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), I(r, i, n, "aria-hidden")) : function() {
		return null;
	};
};
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useHideOthers.js
function R(e) {
	let t;
	a(() => b(e), (e) => {
		let n = !1;
		try {
			n = !!e?.closest("[popover]:not(:popover-open)");
		} catch {}
		e && !n ? t = L(e) : t && t();
	}), u(() => {
		t && t();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/stack.js
var z = C(() => c([]));
function B() {
	let e = z();
	return {
		add(t) {
			let n = e.value[0];
			t !== n && n?.pause(), e.value = V(e.value, t), e.value.unshift(t);
		},
		remove(t) {
			e.value = V(e.value, t), e.value[0]?.resume();
		}
	};
}
function V(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/utils.js
var H = "focusScope.autoFocusOnMount", U = "focusScope.autoFocusOnUnmount", W = {
	bubbles: !1,
	cancelable: !0
};
function G(e, { select: t = !1 } = {}) {
	let n = w();
	for (let r of e) if (Z(r, { select: t }), w() !== n) return !0;
}
function K(e) {
	let t = q(e);
	return [J(t, e), J(t.reverse(), e)];
}
function q(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function J(e, t) {
	for (let n of e) if (!Y(n, { upTo: t })) return n;
}
function Y(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function X(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function Z(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = w();
		e.focus({ preventScroll: !0 }), e !== n && X(e) && t && e.select();
	}
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var Q = /* @__PURE__ */ f({
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
	setup(u, { emit: d }) {
		let f = u, p = d, { currentRef: m, currentElement: h } = g(), _ = c(null), y = B(), b = /*#__PURE__*/ e({
			paused: !1,
			pause() {
				this.paused = !0;
			},
			resume() {
				this.paused = !1;
			}
		});
		t((e) => {
			if (!S) return;
			let t = h.value;
			if (!f.trapped) return;
			function n(e) {
				if (b.paused || !t) return;
				let n = e.target;
				t.contains(n) ? _.value = n : Z(_.value, { select: !0 });
			}
			function r(e) {
				if (b.paused || !t) return;
				let n = e.relatedTarget;
				n !== null && (t.contains(n) || Z(_.value, { select: !0 }));
			}
			function i(e) {
				let n = _.value;
				n !== null && e.some((e) => e.removedNodes.length > 0) && (t.contains(n) || Z(t));
			}
			document.addEventListener("focusin", n), document.addEventListener("focusout", r);
			let a = new MutationObserver(i);
			t && a.observe(t, {
				childList: !0,
				subtree: !0
			}), e(() => {
				document.removeEventListener("focusin", n), document.removeEventListener("focusout", r), a.disconnect();
			});
		});
		function x(e, t) {
			let n = new CustomEvent(H, W), r = (e) => p("mountAutoFocus", e);
			e.addEventListener(H, r), e.dispatchEvent(n), e.removeEventListener(H, r), n.defaultPrevented || (G(q(e), { select: !0 }), w() === t && Z(e));
		}
		t(async (e) => {
			let t = h.value;
			if (await i(), !t) return;
			f.present !== !1 && y.add(b);
			let n = w();
			!t.contains(n) && f.present !== !1 && x(t, n), e(() => {
				let e = new CustomEvent(U, W), r = (e) => {
					p("unmountAutoFocus", e);
				};
				t.addEventListener(U, r), t.dispatchEvent(e), t.setAttribute("data-focus-scope-unmounting", ""), setTimeout(() => {
					e.defaultPrevented || Z(n ?? document.body, { select: !0 }), t.removeEventListener(U, r), y.remove(b), t.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		}), a(() => f.present, async (e, t) => {
			if (!S) return;
			if (e === !1 && t === !0) {
				y.remove(b);
				return;
			}
			if (e !== !0 || t !== !1) return;
			y.add(b), await i();
			let n = h.value;
			if (!n) return;
			let r = w();
			n.contains(r) || x(n, r);
		});
		function C(e) {
			if (!f.loop && !f.trapped || b.paused) return;
			let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = w();
			if (t && n) {
				let t = e.currentTarget, [r, i] = K(t);
				r && i ? !e.shiftKey && n === i ? (e.preventDefault(), f.loop && Z(r, { select: !0 })) : e.shiftKey && n === r && (e.preventDefault(), f.loop && Z(i, { select: !0 })) : n === t && e.preventDefault();
			}
		}
		return (e, t) => (r(), l(s(v), {
			ref_key: "currentRef",
			ref: m,
			tabindex: "-1",
			"as-child": e.asChild,
			as: e.as,
			onKeydown: C
		}, {
			default: o(() => [n(e.$slots, "default")]),
			_: 3
		}, 8, ["as-child", "as"]));
	}
});
//#endregion
export { E as a, R as i, G as n, w as o, q as r, Q as t };
