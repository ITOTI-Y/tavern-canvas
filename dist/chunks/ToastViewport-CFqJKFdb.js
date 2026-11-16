import { C as e, F as t, G as n, L as r, M as i, N as a, O as o, R as s, T as c, W as l, _ as u, c as d, ct as f, d as p, dt as m, g as h, gt as g, h as _, ht as v, mt as y, p as b, pt as x, q as S, rt as C, tt as w, u as T, v as E, x as D, y as O } from "./vue-i18n-XoxYzLIP.js";
import { n as k } from "./portal_keys-DthxrmWp.js";
import { t as A } from "./AppIcon-DD754F_c.js";
import { r as j } from "./StateSurface-C9eJEtTP.js";
import { t as M } from "./components_styles-BXC5Dc_L.js";
import { t as N } from "./x-CyHrRl6n.js";
import { N as P, P as F, S as I, _ as L, b as ee, f as R, i as z, k as B, l as V, o as H, r as U, s as W, t as te, v as G, w as K } from "./Teleport-zHbQRGnp.js";
import { a as q } from "./AppTooltip-CmgWxKYL.js";
import { n as J } from "./IconButton-CPI-A0bT.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayerBranch.js
var ne = /* @__PURE__ */ D({
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
		let n = e, { forwardRef: r, currentElement: c } = R();
		return i(() => {
			H.branches.add(c.value);
		}), a(() => {
			H.branches.delete(c.value);
		}), (e, i) => (t(), _(m(W), o({ ref: m(r) }, n), {
			default: S(() => [s(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), re = /* @__PURE__ */ D({
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
		return (e, n) => (t(), _(m(W), {
			as: e.as,
			"as-child": e.asChild,
			"data-reka-toast-announce-exclude": "",
			"data-reka-toast-announce-alt": e.altText || void 0
		}, {
			default: S(() => [s(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-reka-toast-announce-alt"
		]));
	}
}), [Y, ie] = /*#__PURE__*/ F("ToastProvider"), ae = /* @__PURE__ */ D({
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
		J({ isProvider: !0 });
		let c = C(), l = C(0), u = C(!1), d = C(!1);
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
}), oe = /* @__PURE__ */ D({
	__name: "ToastAnnounce",
	setup(e) {
		let n = Y(), r = B(1e3), i = C(!1), a = 0, o = 0;
		return K && (a = requestAnimationFrame(() => {
			o = requestAnimationFrame(() => {
				i.value = !0;
			});
		}), w(() => {
			cancelAnimationFrame(a), cancelAnimationFrame(o);
		})), (e, a) => m(r) || i.value ? (t(), _(m(q), {
			key: 0,
			feature: "fully-hidden"
		}, {
			default: S(() => [E(g(m(n).label.value) + " ", 1), s(e.$slots, "default")]),
			_: 3
		})) : h("v-if", !0);
	}
}), X = "toast.viewportPause", Z = "toast.viewportResume";
function Q(e, t, n) {
	let r = n.originalEvent.currentTarget, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
function $(e, t, n = 0) {
	let r = Math.abs(e.x), i = Math.abs(e.y), a = r > i;
	return t === "left" || t === "right" ? a && r > n : !a && i > n;
}
function se(e) {
	return e.nodeType === e.ELEMENT_NODE;
}
function ce(e) {
	let t = [];
	return Array.from(e.childNodes).forEach((e) => {
		if (e.nodeType === e.TEXT_NODE && e.textContent && t.push(e.textContent), se(e)) {
			let n = e.ariaHidden || e.hidden || e.style.display === "none", r = e.dataset.rekaToastAnnounceExclude === "";
			if (!n) if (r) {
				let n = e.dataset.rekaToastAnnounceAlt;
				n && t.push(n);
			} else t.push(...ce(e));
		}
	}), t;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Toast/ToastRootImpl.js
var [le, ue] = /*#__PURE__*/ F("ToastRoot"), de = /* @__PURE__ */ D({
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
		let f = e, v = c, { forwardRef: y, currentElement: x } = R(), { CollectionItem: w } = J(), D = Y(), k = C(null), A = C(null), j = b(() => typeof f.duration == "number" ? f.duration : D.duration.value), M = C(0), N = C(j.value), F = C(0), I = C(j.value), z = ee(() => {
			let e = Date.now() - M.value;
			I.value = Math.max(N.value - e, 0);
		}, { fpsLimit: 60 });
		function B(e) {
			e <= 0 || e === Infinity || K && (window.clearTimeout(F.value), M.value = Date.now(), F.value = window.setTimeout(V, e));
		}
		function V(e) {
			let t = e?.pointerType === "";
			x.value?.contains(P()) && t && D.viewport.value?.focus(), t && (D.isClosePausedRef.value = !1), v("close");
		}
		let H = b(() => x.value ? ce(x.value) : null);
		if (f.type && !["foreground", "background"].includes(f.type)) throw Error("Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.");
		return n((e) => {
			let t = D.viewport.value;
			if (t) {
				let e = () => {
					B(N.value), z.resume(), v("resume");
				}, n = () => {
					let e = Date.now() - M.value;
					N.value -= e, window.clearTimeout(F.value), z.pause(), v("pause");
				};
				return t.addEventListener(X, n), t.addEventListener(Z, e), () => {
					t.removeEventListener(X, n), t.removeEventListener(Z, e);
				};
			}
		}), l(() => [f.open, j.value], () => {
			N.value = j.value, f.open && !D.isClosePausedRef.value && B(j.value);
		}, { immediate: !0 }), L("Escape", (e) => {
			v("escapeKeyDown", e), e.defaultPrevented || (D.isFocusedToastEscapeKeyDownRef.value = !0, V());
		}), i(() => {
			D.onToastAdd();
		}), a(() => {
			D.onToastRemove();
		}), ue({ onClose: V }), (e, n) => (t(), u(T, null, [H.value ? (t(), _(oe, {
			key: 0,
			role: "alert",
			"aria-live": e.type === "foreground" ? "assertive" : "polite"
		}, {
			default: S(() => [h("\n      Render each chunk as its own text node so screen readers get the\n      natural pause break between nodes (see comment in utils.ts).\n      Interpolating the array directly with `{{ announceTextContent }}`\n      would route through Vue's `toDisplayString`, which JSON-stringifies\n      arrays — the live region would then announce literal `[`, quotes\n      and commas instead of the toast title and description.\n    "), (t(!0), u(T, null, r(H.value, (e, n) => (t(), u(T, { key: n }, [E(g(e), 1)], 64))), 128))]),
			_: 1
		}, 8, ["aria-live"])) : h("v-if", !0), m(D).viewport.value ? (t(), _(p, {
			key: 1,
			to: m(D).viewport.value
		}, [O(m(w), null, {
			default: S(() => [O(m(W), o({
				ref: m(y),
				tabindex: "0"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"data-state": e.open ? "open" : "closed",
				"data-swipe-direction": m(D).swipeDirection.value,
				style: m(D).disableSwipe.value ? void 0 : {
					userSelect: "none",
					touchAction: "none"
				},
				onPointerdown: n[0] ||= d((e) => {
					m(D).disableSwipe.value || (k.value = {
						x: e.clientX,
						y: e.clientY
					});
				}, ["left"]),
				onPointermove: n[1] ||= (e) => {
					if (m(D).disableSwipe.value || !k.value) return;
					let t = e.clientX - k.value.x, n = e.clientY - k.value.y, r = !!A.value, i = ["left", "right"].includes(m(D).swipeDirection.value), a = ["left", "up"].includes(m(D).swipeDirection.value) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
						x: o,
						y: s
					}, u = {
						originalEvent: e,
						delta: l
					};
					r ? (A.value = l, m(Q)(m("toast.swipeMove"), (e) => v("swipeMove", e), u)) : m($)(l, m(D).swipeDirection.value, c) ? (A.value = l, m(Q)(m("toast.swipeStart"), (e) => v("swipeStart", e), u), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (k.value = null);
				},
				onPointerup: n[2] ||= (e) => {
					if (m(D).disableSwipe.value) return;
					let t = A.value, n = e.target;
					if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), A.value = null, k.value = null, t) {
						let n = e.currentTarget, r = {
							originalEvent: e,
							delta: t
						};
						m($)(t, m(D).swipeDirection.value, m(D).swipeThreshold.value) ? m(Q)(m("toast.swipeEnd"), (e) => v("swipeEnd", e), r) : m(Q)(m("toast.swipeCancel"), (e) => v("swipeCancel", e), r), n?.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
					}
				}
			}), {
				default: S(() => [s(e.$slots, "default", {
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
}), fe = /* @__PURE__ */ D({
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
		let n = e, r = le(), { forwardRef: i } = R();
		return (e, a) => (t(), _(re, { "as-child": "" }, {
			default: S(() => [O(m(W), o(n, {
				ref: m(i),
				type: e.as === "button" ? "button" : void 0,
				onClick: m(r).onClose
			}), {
				default: S(() => [s(e.$slots, "default")]),
				_: 3
			}, 16, ["type", "onClick"])]),
			_: 3
		}));
	}
}), pe = /* @__PURE__ */ D({
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
		return R(), (n, i) => (t(), _(m(W), y(e(r)), {
			default: S(() => [s(n.$slots, "default")]),
			_: 3
		}, 16));
	}
}), me = /* @__PURE__ */ D({
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
		return (n, i) => (t(), _(m(te), y(e(r)), {
			default: S(() => [s(n.$slots, "default")]),
			_: 3
		}, 16));
	}
}), he = /* @__PURE__ */ D({
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
		let r = e, i = n, { forwardRef: a } = R(), c = I(r, "open", i, {
			defaultValue: r.defaultOpen,
			passive: r.open === void 0
		});
		return (e, n) => (t(), _(m(V), { present: e.forceMount || m(c) }, {
			default: S(() => [O(de, o({
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
				default: S(({ remaining: t, duration: n }) => [s(e.$slots, "default", {
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
}), ge = /* @__PURE__ */ D({
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
		return R(), (n, i) => (t(), _(m(W), y(e(r)), {
			default: S(() => [s(n.$slots, "default")]),
			_: 3
		}, 16));
	}
}), _e = /* @__PURE__ */ D({
	__name: "FocusProxy",
	emits: ["focusFromOutsideViewport"],
	setup(e, { emit: n }) {
		let r = n, i = Y();
		return (e, n) => (t(), _(m(q), {
			tabindex: "0",
			style: { position: "fixed" },
			onFocus: n[0] ||= (e) => {
				let t = e.relatedTarget;
				m(i).viewport.value?.contains(t) || r("focusFromOutsideViewport");
			}
		}, {
			default: S(() => [s(e.$slots, "default")]),
			_: 3
		}));
	}
}), ve = /* @__PURE__ */ D({
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
		let { hotkey: r, label: a } = f(e), { forwardRef: c, currentElement: l } = R(), { CollectionSlot: u, getItems: d } = J(), p = Y(), g = b(() => p.toastCount.value > 0), y = C(), x = C(), w = /Key/g, T = /Digit/g, E = b(() => r.value.join("+").replace(w, "").replace(T, ""));
		L(r.value, () => {
			l.value.focus();
		}), i(() => {
			p.onViewportChange(l.value);
		}), n((e) => {
			let t = l.value;
			if (g.value && t) {
				let n = () => {
					if (!p.isClosePausedRef.value) {
						let e = new CustomEvent(X);
						t.dispatchEvent(e), p.isClosePausedRef.value = !0;
					}
				}, r = () => {
					if (p.isClosePausedRef.value) {
						let e = new CustomEvent(Z);
						t.dispatchEvent(e), p.isClosePausedRef.value = !1;
					}
				}, i = (e) => {
					t.contains(e.relatedTarget) || r();
				}, a = () => {
					t.contains(P()) || r();
				}, o = (e) => {
					let n = e.altKey || e.ctrlKey || e.metaKey;
					if (e.key === "Tab" && !n) {
						let n = P(), r = e.shiftKey;
						if (e.target === t && r) {
							y.value?.focus();
							return;
						}
						let i = D({ tabbingDirection: r ? "backwards" : "forwards" }), a = i.findIndex((e) => e === n);
						U(i.slice(a + 1)) ? e.preventDefault() : r ? y.value?.focus() : x.value?.focus();
					}
				};
				t.addEventListener("focusin", n), t.addEventListener("focusout", i), t.addEventListener("pointermove", n), t.addEventListener("pointerleave", a), t.addEventListener("keydown", o), window.addEventListener("blur", n), window.addEventListener("focus", r), e(() => {
					t.removeEventListener("focusin", n), t.removeEventListener("focusout", i), t.removeEventListener("pointermove", n), t.removeEventListener("pointerleave", a), t.removeEventListener("keydown", o), window.removeEventListener("blur", n), window.removeEventListener("focus", r);
				});
			}
		});
		function D({ tabbingDirection: e }) {
			let t = d().map((e) => e.ref).map((t) => {
				let n = [t, ...z(t)];
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
			default: S(() => [
				g.value ? (t(), _(_e, {
					key: 0,
					ref: (e) => {
						e && (y.value = m(G)(e));
					},
					onFocusFromOutsideViewport: n[0] ||= () => {
						let e = D({ tabbingDirection: "forwards" });
						m(U)(e);
					}
				}, null, 512)) : h("v-if", !0),
				O(m(u), null, {
					default: S(() => [O(m(W), o({
						ref: m(c),
						tabindex: "-1",
						as: e.as,
						"as-child": e.asChild
					}, e.$attrs), {
						default: S(() => [s(e.$slots, "default")]),
						_: 3
					}, 16, ["as", "as-child"])]),
					_: 3
				}),
				g.value ? (t(), _(_e, {
					key: 1,
					ref: (e) => {
						e && (x.value = m(G)(e));
					},
					onFocusFromOutsideViewport: n[1] ||= () => {
						let e = D({ tabbingDirection: "backwards" });
						m(U)(e);
					}
				}, null, 512)) : h("v-if", !0)
			]),
			_: 3
		}, 8, ["aria-label", "style"]));
	}
}), ye = 5e3, be = /* @__PURE__ */ D({
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
			success: M.toastSuccess,
			error: M.toastError
		}, l = c(k, void 0), d = b(() => l ? { to: l } : {});
		return (i, a) => (t(), _(m(ae), {
			label: n.announceLabel,
			duration: ye
		}, {
			default: S(() => [O(m(me), y(e(d.value)), {
				default: S(() => [O(m(ve), {
					class: x(["tc-z-toast", m(M).toastViewport]),
					label: n.viewportLabel
				}, {
					default: S(() => [(t(!0), u(T, null, r(n.toasts, (e) => (t(), _(m(he), {
						key: e.id,
						class: x([m(M).toastRoot, s[e.variant ?? "info"]]),
						type: e.variant === "error" ? "foreground" : "background",
						open: !0,
						duration: e.duration ?? ye,
						"onUpdate:open": (t) => o(e.id, t)
					}, {
						default: S(() => [
							e.variant === "success" && !e.description ? (t(), _(A, {
								key: 0,
								icon: m(j),
								size: 16,
								class: x(m(M).toastIcon)
							}, null, 8, ["icon", "class"])) : h("", !0),
							O(m(ge), { class: x(m(M).toastTitle) }, {
								default: S(() => [E(g(e.title), 1)]),
								_: 2
							}, 1032, ["class"]),
							e.description ? (t(), _(m(pe), {
								key: 1,
								class: x(m(M).toastDescription)
							}, {
								default: S(() => [E(g(e.description), 1)]),
								_: 2
							}, 1032, ["class"])) : h("", !0),
							O(m(fe), {
								class: x(["tc-interactive", m(M).toastClose]),
								"aria-label": n.closeLabel
							}, {
								default: S(() => [O(A, {
									icon: m(N),
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
export { be as t };
