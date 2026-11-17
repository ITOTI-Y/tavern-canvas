import { C as e, F as t, G as n, L as r, M as i, N as a, O as o, R as s, T as c, W as l, _ as u, c as d, ct as f, d as p, dt as m, g as h, gt as g, h as _, ht as v, m as y, mt as b, p as x, pt as S, q as C, rt as w, tt as T, u as E, v as D, x as O, y as k } from "./vue-i18n-XoxYzLIP.js";
import { r as A } from "./portal_keys-CIBE-_PC.js";
import { t as j } from "./AppIcon-DD754F_c.js";
import { r as M, t as N } from "./components_styles-CTlfgDU5.js";
import { t as P } from "./x-CyHrRl6n.js";
import { N as F, P as I, S as L, _ as R, b as ee, f as z, i as B, k as V, l as H, o as U, r as W, s as G, t as te, v as K, w as q } from "./Teleport-zHbQRGnp.js";
import { a as J, o as Y } from "./AppTooltip-D3BiEM01.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayerBranch.js
var ne = /* @__PURE__ */ O({
	__name: "DismissableLayerBranch",
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
		let n = e, { forwardRef: r, currentElement: c } = z();
		return i(() => {
			U.branches.add(c.value);
		}), a(() => {
			U.branches.delete(c.value);
		}), (e, i) => (t(), _(m(G), o({ ref: m(r) }, n), {
			default: C(() => [s(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), re = /* @__PURE__ */ O({
	__name: "ToastAnnounceExclude",
	props: {
		altText: {
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
	},
	setup(e) {
		return (e, n) => (t(), _(m(G), {
			as: e.as,
			"as-child": e.asChild,
			"data-reka-toast-announce-exclude": "",
			"data-reka-toast-announce-alt": e.altText || void 0
		}, {
			default: C(() => [s(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-reka-toast-announce-alt"
		]));
	}
}), [X, ie] = /*#__PURE__*/ I("ToastProvider"), ae = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "ToastProvider",
	props: {
		label: {
			type: String,
			required: !1,
			default: "Notification"
		},
		duration: {
			type: Number,
			required: !1,
			default: 5e3
		},
		disableSwipe: {
			type: Boolean,
			required: !1
		},
		swipeDirection: {
			type: String,
			required: !1,
			default: "right"
		},
		swipeThreshold: {
			type: Number,
			required: !1,
			default: 50
		}
	},
	setup(e) {
		let t = e, { label: n, duration: r, disableSwipe: i, swipeDirection: a, swipeThreshold: o } = f(t);
		Y({ isProvider: !0 });
		let c = w(), l = w(0), u = w(!1), d = w(!1);
		if (t.label && typeof t.label == "string" && !t.label.trim()) throw Error("Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.");
		return ie({
			label: n,
			duration: r,
			disableSwipe: i,
			swipeDirection: a,
			swipeThreshold: o,
			toastCount: l,
			viewport: c,
			onViewportChange(e) {
				c.value = e;
			},
			onToastAdd() {
				l.value++;
			},
			onToastRemove() {
				l.value--;
			},
			isFocusedToastEscapeKeyDownRef: u,
			isClosePausedRef: d
		}), (e, t) => s(e.$slots, "default");
	}
}), oe = /* @__PURE__ */ O({
	__name: "ToastAnnounce",
	setup(e) {
		let n = X(), r = V(1e3), i = w(!1), a = 0, o = 0;
		return q && (a = requestAnimationFrame(() => {
			o = requestAnimationFrame(() => {
				i.value = !0;
			});
		}), T(() => {
			cancelAnimationFrame(a), cancelAnimationFrame(o);
		})), (e, a) => m(r) || i.value ? (t(), _(m(J), {
			key: 0,
			feature: "fully-hidden"
		}, {
			default: C(() => [D(g(m(n).label.value) + " ", 1), s(e.$slots, "default")]),
			_: 3
		})) : h("v-if", !0);
	}
}), Z = "toast.viewportPause", Q = "toast.viewportResume";
function $(e, t, n) {
	let r = n.originalEvent.currentTarget, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
function se(e, t, n = 0) {
	let r = Math.abs(e.x), i = Math.abs(e.y), a = r > i;
	return t === "left" || t === "right" ? a && r > n : !a && i > n;
}
function ce(e) {
	return e.nodeType === e.ELEMENT_NODE;
}
function le(e) {
	let t = [];
	return Array.from(e.childNodes).forEach((e) => {
		if (e.nodeType === e.TEXT_NODE && e.textContent && t.push(e.textContent), ce(e)) {
			let n = e.ariaHidden || e.hidden || e.style.display === "none", r = e.dataset.rekaToastAnnounceExclude === "";
			if (!n) if (r) {
				let n = e.dataset.rekaToastAnnounceAlt;
				n && t.push(n);
			} else t.push(...le(e));
		}
	}), t;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Toast/ToastRootImpl.js
var [ue, de] = /*#__PURE__*/ I("ToastRoot"), fe = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "ToastRootImpl",
	props: {
		type: {
			type: String,
			required: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: !1
		},
		duration: {
			type: Number,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "li"
		}
	},
	emits: [
		"close",
		"escapeKeyDown",
		"pause",
		"resume",
		"swipeStart",
		"swipeMove",
		"swipeCancel",
		"swipeEnd"
	],
	setup(e, { emit: c }) {
		let f = e, v = c, { forwardRef: y, currentElement: b } = z(), { CollectionItem: S } = Y(), T = X(), O = w(null), A = w(null), j = x(() => typeof f.duration == "number" ? f.duration : T.duration.value), M = w(0), N = w(j.value), P = w(0), I = w(j.value), L = ee(() => {
			let e = Date.now() - M.value;
			I.value = Math.max(N.value - e, 0);
		}, { fpsLimit: 60 });
		function B(e) {
			e <= 0 || e === Infinity || q && (window.clearTimeout(P.value), M.value = Date.now(), P.value = window.setTimeout(V, e));
		}
		function V(e) {
			let t = e?.pointerType === "";
			b.value?.contains(F()) && t && T.viewport.value?.focus(), t && (T.isClosePausedRef.value = !1), v("close");
		}
		let H = x(() => b.value ? le(b.value) : null);
		if (f.type && !["foreground", "background"].includes(f.type)) throw Error("Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.");
		return n((e) => {
			let t = T.viewport.value;
			if (t) {
				let e = () => {
					B(N.value), L.resume(), v("resume");
				}, n = () => {
					let e = Date.now() - M.value;
					N.value -= e, window.clearTimeout(P.value), L.pause(), v("pause");
				};
				return t.addEventListener(Z, n), t.addEventListener(Q, e), () => {
					t.removeEventListener(Z, n), t.removeEventListener(Q, e);
				};
			}
		}), l(() => [f.open, j.value], () => {
			N.value = j.value, f.open && !T.isClosePausedRef.value && B(j.value);
		}, { immediate: !0 }), R("Escape", (e) => {
			v("escapeKeyDown", e), e.defaultPrevented || (T.isFocusedToastEscapeKeyDownRef.value = !0, V());
		}), i(() => {
			T.onToastAdd();
		}), a(() => {
			T.onToastRemove();
		}), de({ onClose: V }), (e, n) => (t(), u(E, null, [H.value ? (t(), _(oe, {
			key: 0,
			role: "alert",
			"aria-live": e.type === "foreground" ? "assertive" : "polite"
		}, {
			default: C(() => [h("\n      Render each chunk as its own text node so screen readers get the\n      natural pause break between nodes (see comment in utils.ts).\n      Interpolating the array directly with `{{ announceTextContent }}`\n      would route through Vue's `toDisplayString`, which JSON-stringifies\n      arrays — the live region would then announce literal `[`, quotes\n      and commas instead of the toast title and description.\n    "), (t(!0), u(E, null, r(H.value, (e, n) => (t(), u(E, { key: n }, [D(g(e), 1)], 64))), 128))]),
			_: 1
		}, 8, ["aria-live"])) : h("v-if", !0), m(T).viewport.value ? (t(), _(p, {
			key: 1,
			to: m(T).viewport.value
		}, [k(m(S), null, {
			default: C(() => [k(m(G), o({
				ref: m(y),
				tabindex: "0"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"data-state": e.open ? "open" : "closed",
				"data-swipe-direction": m(T).swipeDirection.value,
				style: m(T).disableSwipe.value ? void 0 : {
					userSelect: "none",
					touchAction: "none"
				},
				onPointerdown: n[0] ||= d((e) => {
					m(T).disableSwipe.value || (O.value = {
						x: e.clientX,
						y: e.clientY
					});
				}, ["left"]),
				onPointermove: n[1] ||= (e) => {
					if (m(T).disableSwipe.value || !O.value) return;
					let t = e.clientX - O.value.x, n = e.clientY - O.value.y, r = !!A.value, i = ["left", "right"].includes(m(T).swipeDirection.value), a = ["left", "up"].includes(m(T).swipeDirection.value) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
						x: o,
						y: s
					}, u = {
						originalEvent: e,
						delta: l
					};
					r ? (A.value = l, m($)(m("toast.swipeMove"), (e) => v("swipeMove", e), u)) : m(se)(l, m(T).swipeDirection.value, c) ? (A.value = l, m($)(m("toast.swipeStart"), (e) => v("swipeStart", e), u), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (O.value = null);
				},
				onPointerup: n[2] ||= (e) => {
					if (m(T).disableSwipe.value) return;
					let t = A.value, n = e.target;
					if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), A.value = null, O.value = null, t) {
						let n = e.currentTarget, r = {
							originalEvent: e,
							delta: t
						};
						m(se)(t, m(T).swipeDirection.value, m(T).swipeThreshold.value) ? m($)(m("toast.swipeEnd"), (e) => v("swipeEnd", e), r) : m($)(m("toast.swipeCancel"), (e) => v("swipeCancel", e), r), n?.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
					}
				}
			}), {
				default: C(() => [s(e.$slots, "default", {
					remaining: I.value,
					duration: j.value
				})]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"data-state",
				"data-swipe-direction",
				"style"
			])]),
			_: 3
		})], 8, ["to"])) : h("v-if", !0)], 64));
	}
}), pe = /* @__PURE__ */ O({
	__name: "ToastClose",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(e) {
		let n = e, r = ue(), { forwardRef: i } = z();
		return (e, a) => (t(), _(re, { "as-child": "" }, {
			default: C(() => [k(m(G), o(n, {
				ref: m(i),
				type: e.as === "button" ? "button" : void 0,
				onClick: m(r).onClose
			}), {
				default: C(() => [s(e.$slots, "default")]),
				_: 3
			}, 16, ["type", "onClick"])]),
			_: 3
		}));
	}
}), me = /* @__PURE__ */ O({
	__name: "ToastAction",
	props: {
		altText: {
			type: String,
			required: !0
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
		if (!e.altText) throw Error("Missing prop `altText` expected on `ToastAction`");
		let { forwardRef: n } = z();
		return (e, r) => e.altText ? (t(), _(re, {
			key: 0,
			"alt-text": e.altText,
			"as-child": ""
		}, {
			default: C(() => [k(pe, {
				ref: m(n),
				as: e.as,
				"as-child": e.asChild
			}, {
				default: C(() => [s(e.$slots, "default")]),
				_: 3
			}, 8, ["as", "as-child"])]),
			_: 3
		}, 8, ["alt-text"])) : h("v-if", !0);
	}
}), he = /* @__PURE__ */ O({
	__name: "ToastDescription",
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
	setup(n) {
		let r = n;
		return z(), (n, i) => (t(), _(m(G), b(e(r)), {
			default: C(() => [s(n.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ge = /* @__PURE__ */ O({
	__name: "ToastPortal",
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
	setup(n) {
		let r = n;
		return (n, i) => (t(), _(m(te), b(e(r)), {
			default: C(() => [s(n.$slots, "default")]),
			_: 3
		}, 16));
	}
}), _e = /* @__PURE__ */ O({
	__name: "ToastRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !0
		},
		forceMount: {
			type: Boolean,
			required: !1
		},
		type: {
			type: String,
			required: !1,
			default: "foreground"
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		duration: {
			type: Number,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "li"
		}
	},
	emits: [
		"escapeKeyDown",
		"pause",
		"resume",
		"swipeStart",
		"swipeMove",
		"swipeCancel",
		"swipeEnd",
		"update:open"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, { forwardRef: a } = z(), c = L(r, "open", i, {
			defaultValue: r.defaultOpen,
			passive: r.open === void 0
		});
		return (e, n) => (t(), _(m(H), { present: e.forceMount || m(c) }, {
			default: C(() => [k(fe, o({
				ref: m(a),
				open: m(c),
				type: e.type,
				as: e.as,
				"as-child": e.asChild,
				duration: e.duration
			}, e.$attrs, {
				onClose: n[0] ||= (e) => c.value = !1,
				onPause: n[1] ||= (e) => i("pause"),
				onResume: n[2] ||= (e) => i("resume"),
				onEscapeKeyDown: n[3] ||= (e) => i("escapeKeyDown", e),
				onSwipeStart: n[4] ||= (e) => {
					i("swipeStart", e), e.defaultPrevented || e.currentTarget.setAttribute("data-swipe", "start");
				},
				onSwipeMove: n[5] ||= (e) => {
					if (i("swipeMove", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "move"), r.style.setProperty("--reka-toast-swipe-move-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-move-y", `${n}px`);
					}
				},
				onSwipeCancel: n[6] ||= (e) => {
					if (i("swipeCancel", e), !e.defaultPrevented) {
						let t = e.currentTarget;
						t.setAttribute("data-swipe", "cancel"), t.style.removeProperty("--reka-toast-swipe-move-x"), t.style.removeProperty("--reka-toast-swipe-move-y"), t.style.removeProperty("--reka-toast-swipe-end-x"), t.style.removeProperty("--reka-toast-swipe-end-y");
					}
				},
				onSwipeEnd: n[7] ||= (e) => {
					if (i("swipeEnd", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "end"), r.style.removeProperty("--reka-toast-swipe-move-x"), r.style.removeProperty("--reka-toast-swipe-move-y"), r.style.setProperty("--reka-toast-swipe-end-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-end-y", `${n}px`), c.value = !1;
					}
				}
			}), {
				default: C(({ remaining: t, duration: n }) => [s(e.$slots, "default", {
					remaining: t,
					duration: n,
					open: m(c)
				})]),
				_: 3
			}, 16, [
				"open",
				"type",
				"as",
				"as-child",
				"duration"
			])]),
			_: 3
		}, 8, ["present"]));
	}
}), ve = /* @__PURE__ */ O({
	__name: "ToastTitle",
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
	setup(n) {
		let r = n;
		return z(), (n, i) => (t(), _(m(G), b(e(r)), {
			default: C(() => [s(n.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ye = /* @__PURE__ */ O({
	__name: "FocusProxy",
	emits: ["focusFromOutsideViewport"],
	setup(e, { emit: n }) {
		let r = n, i = X();
		return (e, n) => (t(), _(m(J), {
			tabindex: "0",
			style: { position: "fixed" },
			onFocus: n[0] ||= (e) => {
				let t = e.relatedTarget;
				m(i).viewport.value?.contains(t) || r("focusFromOutsideViewport");
			}
		}, {
			default: C(() => [s(e.$slots, "default")]),
			_: 3
		}));
	}
}), be = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "ToastViewport",
	props: {
		hotkey: {
			type: Array,
			required: !1,
			default: () => ["F8"]
		},
		label: {
			type: [String, Function],
			required: !1,
			default: "Notifications ({hotkey})"
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "ol"
		}
	},
	setup(e) {
		let { hotkey: r, label: a } = f(e), { forwardRef: c, currentElement: l } = z(), { CollectionSlot: u, getItems: d } = Y(), p = X(), g = x(() => p.toastCount.value > 0), y = w(), b = w(), S = /Key/g, T = /Digit/g, E = x(() => r.value.join("+").replace(S, "").replace(T, ""));
		R(r.value, () => {
			l.value.focus();
		}), i(() => {
			p.onViewportChange(l.value);
		}), n((e) => {
			let t = l.value;
			if (g.value && t) {
				let n = () => {
					if (!p.isClosePausedRef.value) {
						let e = new CustomEvent(Z);
						t.dispatchEvent(e), p.isClosePausedRef.value = !0;
					}
				}, r = () => {
					if (p.isClosePausedRef.value) {
						let e = new CustomEvent(Q);
						t.dispatchEvent(e), p.isClosePausedRef.value = !1;
					}
				}, i = (e) => {
					t.contains(e.relatedTarget) || r();
				}, a = () => {
					t.contains(F()) || r();
				}, o = (e) => {
					let n = e.altKey || e.ctrlKey || e.metaKey;
					if (e.key === "Tab" && !n) {
						let n = F(), r = e.shiftKey;
						if (e.target === t && r) {
							y.value?.focus();
							return;
						}
						let i = D({ tabbingDirection: r ? "backwards" : "forwards" }), a = i.findIndex((e) => e === n);
						W(i.slice(a + 1)) ? e.preventDefault() : r ? y.value?.focus() : b.value?.focus();
					}
				};
				t.addEventListener("focusin", n), t.addEventListener("focusout", i), t.addEventListener("pointermove", n), t.addEventListener("pointerleave", a), t.addEventListener("keydown", o), window.addEventListener("blur", n), window.addEventListener("focus", r), e(() => {
					t.removeEventListener("focusin", n), t.removeEventListener("focusout", i), t.removeEventListener("pointermove", n), t.removeEventListener("pointerleave", a), t.removeEventListener("keydown", o), window.removeEventListener("blur", n), window.removeEventListener("focus", r);
				});
			}
		});
		function D({ tabbingDirection: e }) {
			let t = d().map((e) => e.ref).map((t) => {
				let n = [t, ...B(t)];
				return e === "forwards" ? n : n.reverse();
			});
			return (e === "forwards" ? t.reverse() : t).flat();
		}
		return (e, n) => (t(), _(m(ne), {
			role: "region",
			"aria-label": typeof m(a) == "string" ? m(a).replace("{hotkey}", E.value) : m(a)(E.value),
			tabindex: "-1",
			style: v({ pointerEvents: g.value ? void 0 : "none" })
		}, {
			default: C(() => [
				g.value ? (t(), _(ye, {
					key: 0,
					ref: (e) => {
						e && (y.value = m(K)(e));
					},
					onFocusFromOutsideViewport: n[0] ||= () => {
						let e = D({ tabbingDirection: "forwards" });
						m(W)(e);
					}
				}, null, 512)) : h("v-if", !0),
				k(m(u), null, {
					default: C(() => [k(m(G), o({
						ref: m(c),
						tabindex: "-1",
						as: e.as,
						"as-child": e.asChild
					}, e.$attrs), {
						default: C(() => [s(e.$slots, "default")]),
						_: 3
					}, 16, ["as", "as-child"])]),
					_: 3
				}),
				g.value ? (t(), _(ye, {
					key: 1,
					ref: (e) => {
						e && (b.value = m(K)(e));
					},
					onFocusFromOutsideViewport: n[1] ||= () => {
						let e = D({ tabbingDirection: "backwards" });
						m(W)(e);
					}
				}, null, 512)) : h("v-if", !0)
			]),
			_: 3
		}, 8, ["aria-label", "style"]));
	}
}), xe = ["onClick"], Se = 5e3, Ce = /* @__PURE__ */ O({
	__name: "ToastViewport",
	props: {
		toasts: {},
		viewportLabel: {},
		announceLabel: {},
		closeLabel: {}
	},
	emits: ["dismiss"],
	setup(n, { emit: i }) {
		let a = i;
		function o(e, t) {
			t || a("dismiss", e);
		}
		let s = {
			info: void 0,
			success: N.toastSuccess,
			error: N.toastError
		}, l = c(A, void 0), d = x(() => l ? { to: l } : {});
		return (i, a) => (t(), _(m(ae), {
			label: n.announceLabel,
			duration: Se
		}, {
			default: C(() => [k(m(ge), b(e(d.value)), {
				default: C(() => [k(m(be), {
					class: S(["tc-z-toast", m(N).toastViewport]),
					label: n.viewportLabel
				}, {
					default: C(() => [(t(!0), u(E, null, r(n.toasts, (e) => (t(), _(m(_e), {
						key: e.id,
						class: S([m(N).toastRoot, s[e.variant ?? "info"]]),
						type: e.variant === "error" ? "foreground" : "background",
						open: !0,
						duration: e.duration ?? Se,
						"onUpdate:open": (t) => o(e.id, t)
					}, {
						default: C(() => [
							e.variant === "success" && !e.description ? (t(), _(j, {
								key: 0,
								icon: m(M),
								size: 16,
								class: S(m(N).toastIcon)
							}, null, 8, ["icon", "class"])) : h("", !0),
							k(m(ve), { class: S(m(N).toastTitle) }, {
								default: C(() => [D(g(e.title), 1)]),
								_: 2
							}, 1032, ["class"]),
							e.description ? (t(), _(m(he), {
								key: 1,
								class: S(m(N).toastDescription)
							}, {
								default: C(() => [D(g(e.description), 1)]),
								_: 2
							}, 1032, ["class"])) : h("", !0),
							e.action ? (t(), _(m(me), {
								key: 2,
								"alt-text": e.action.label,
								"as-child": ""
							}, {
								default: C(() => [y("button", {
									type: "button",
									class: S(["tc-interactive", m(N).toastAction]),
									onClick: (t) => e.action.run()
								}, g(e.action.label), 11, xe)]),
								_: 2
							}, 1032, ["alt-text"])) : h("", !0),
							k(m(pe), {
								class: S(["tc-interactive", m(N).toastClose]),
								"aria-label": n.closeLabel
							}, {
								default: C(() => [k(j, {
									icon: m(P),
									size: 14
								}, null, 8, ["icon"])]),
								_: 1
							}, 8, ["class", "aria-label"])
						]),
						_: 2
					}, 1032, [
						"class",
						"type",
						"duration",
						"onUpdate:open"
					]))), 128))]),
					_: 1
				}, 8, ["class", "label"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 8, ["label"]));
	}
});
//#endregion
export { Ce as t };
