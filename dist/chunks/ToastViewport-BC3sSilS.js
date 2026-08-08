import { $ as e, A as t, B as n, C as r, D as i, F as a, I as o, N as s, T as c, U as l, V as u, Z as d, _ as f, c as p, d as m, dt as h, ft as g, g as _, h as v, it as y, j as b, lt as x, p as S, st as C, u as w, ut as T, v as E, x as D, y as O } from "./vue-i18n-CmRk7RjK.js";
import { r as k } from "./StateSurface-BqMfI2cI.js";
import { t as A } from "./x-Cb9a7voE.js";
import { t as j } from "./AppIcon-B4b88cvE.js";
import { t as M } from "./portal_keys-gQ1cWdMS.js";
import { D as N, _ as P, c as F, f as I, h as ee, i as L, j as R, o as z, p as B, r as V, t as H, x as U } from "./Teleport-abGLK5Wv.js";
import { n as W, o as G, r as te } from "./FocusScope-DrI3mUpj.js";
import { t as K } from "./Collection-DSmIzJYn.js";
import { t as q } from "./VisuallyHidden-CukVafpV.js";
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
		let n = e, { forwardRef: r, currentElement: a } = F();
		return t(() => {
			V.branches.add(a.value);
		}), b(() => {
			V.branches.delete(a.value);
		}), (e, t) => (s(), v(C(L), i({ ref: C(r) }, n), {
			default: l(() => [o(e.$slots, "default")]),
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
		return (e, t) => (s(), v(C(L), {
			as: e.as,
			"as-child": e.asChild,
			"data-reka-toast-announce-exclude": "",
			"data-reka-toast-announce-alt": e.altText || void 0
		}, {
			default: l(() => [o(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-reka-toast-announce-alt"
		]));
	}
}), [J, ie] = /*#__PURE__*/ R("ToastProvider"), ae = /* @__PURE__ */ D({
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
	setup(t) {
		let n = t, { label: r, duration: i, disableSwipe: a, swipeDirection: s, swipeThreshold: c } = y(n);
		K({ isProvider: !0 });
		let l = e(), u = e(0), d = e(!1), f = e(!1);
		if (n.label && typeof n.label == "string" && !n.label.trim()) throw Error("Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.");
		return ie({
			label: r,
			duration: i,
			disableSwipe: a,
			swipeDirection: s,
			swipeThreshold: c,
			toastCount: u,
			viewport: l,
			onViewportChange(e) {
				l.value = e;
			},
			onToastAdd() {
				u.value++;
			},
			onToastRemove() {
				u.value--;
			},
			isFocusedToastEscapeKeyDownRef: d,
			isClosePausedRef: f
		}), (e, t) => o(e.$slots, "default");
	}
}), oe = /* @__PURE__ */ D({
	__name: "ToastAnnounce",
	setup(t) {
		let n = J(), r = N(1e3), i = e(!1), a = 0, c = 0;
		return U && (a = requestAnimationFrame(() => {
			c = requestAnimationFrame(() => {
				i.value = !0;
			});
		}), d(() => {
			cancelAnimationFrame(a), cancelAnimationFrame(c);
		})), (e, t) => C(r) || i.value ? (s(), v(C(q), {
			key: 0,
			feature: "fully-hidden"
		}, {
			default: l(() => [E(g(C(n).label.value) + " ", 1), o(e.$slots, "default")]),
			_: 3
		})) : _("v-if", !0);
	}
}), Y = "toast.viewportPause", X = "toast.viewportResume";
function Z(e, t, n) {
	let r = n.originalEvent.currentTarget, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
function Q(e, t, n = 0) {
	let r = Math.abs(e.x), i = Math.abs(e.y), a = r > i;
	return t === "left" || t === "right" ? a && r > n : !a && i > n;
}
function se(e) {
	return e.nodeType === e.ELEMENT_NODE;
}
function $(e) {
	let t = [];
	return Array.from(e.childNodes).forEach((e) => {
		if (e.nodeType === e.TEXT_NODE && e.textContent && t.push(e.textContent), se(e)) {
			let n = e.ariaHidden || e.hidden || e.style.display === "none", r = e.dataset.rekaToastAnnounceExclude === "";
			if (!n) if (r) {
				let n = e.dataset.rekaToastAnnounceAlt;
				n && t.push(n);
			} else t.push(...$(e));
		}
	}), t;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Toast/ToastRootImpl.js
var [ce, le] = /*#__PURE__*/ R("ToastRoot"), ue = /* @__PURE__ */ D({
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
	setup(r, { emit: c }) {
		let d = r, h = c, { forwardRef: y, currentElement: x } = F(), { CollectionItem: T } = K(), D = J(), k = e(null), A = e(null), j = S(() => typeof d.duration == "number" ? d.duration : D.duration.value), M = e(0), N = e(j.value), P = e(0), R = e(j.value), z = ee(() => {
			let e = Date.now() - M.value;
			R.value = Math.max(N.value - e, 0);
		}, { fpsLimit: 60 });
		function B(e) {
			e <= 0 || e === Infinity || U && (window.clearTimeout(P.value), M.value = Date.now(), P.value = window.setTimeout(V, e));
		}
		function V(e) {
			let t = e?.pointerType === "";
			x.value?.contains(G()) && t && D.viewport.value?.focus(), t && (D.isClosePausedRef.value = !1), h("close");
		}
		let H = S(() => x.value ? $(x.value) : null);
		if (d.type && !["foreground", "background"].includes(d.type)) throw Error("Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.");
		return u((e) => {
			let t = D.viewport.value;
			if (t) {
				let e = () => {
					B(N.value), z.resume(), h("resume");
				}, n = () => {
					let e = Date.now() - M.value;
					N.value -= e, window.clearTimeout(P.value), z.pause(), h("pause");
				};
				return t.addEventListener(Y, n), t.addEventListener(X, e), () => {
					t.removeEventListener(Y, n), t.removeEventListener(X, e);
				};
			}
		}), n(() => [d.open, j.value], () => {
			N.value = j.value, d.open && !D.isClosePausedRef.value && B(j.value);
		}, { immediate: !0 }), I("Escape", (e) => {
			h("escapeKeyDown", e), e.defaultPrevented || (D.isFocusedToastEscapeKeyDownRef.value = !0, V());
		}), t(() => {
			D.onToastAdd();
		}), b(() => {
			D.onToastRemove();
		}), le({ onClose: V }), (e, t) => (s(), f(w, null, [H.value ? (s(), v(oe, {
			key: 0,
			role: "alert",
			"aria-live": e.type === "foreground" ? "assertive" : "polite"
		}, {
			default: l(() => [_("\n      Render each chunk as its own text node so screen readers get the\n      natural pause break between nodes (see comment in utils.ts).\n      Interpolating the array directly with `{{ announceTextContent }}`\n      would route through Vue's `toDisplayString`, which JSON-stringifies\n      arrays — the live region would then announce literal `[`, quotes\n      and commas instead of the toast title and description.\n    "), (s(!0), f(w, null, a(H.value, (e, t) => (s(), f(w, { key: t }, [E(g(e), 1)], 64))), 128))]),
			_: 1
		}, 8, ["aria-live"])) : _("v-if", !0), C(D).viewport.value ? (s(), v(m, {
			key: 1,
			to: C(D).viewport.value
		}, [O(C(T), null, {
			default: l(() => [O(C(L), i({
				ref: C(y),
				tabindex: "0"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"data-state": e.open ? "open" : "closed",
				"data-swipe-direction": C(D).swipeDirection.value,
				style: C(D).disableSwipe.value ? void 0 : {
					userSelect: "none",
					touchAction: "none"
				},
				onPointerdown: t[0] ||= p((e) => {
					C(D).disableSwipe.value || (k.value = {
						x: e.clientX,
						y: e.clientY
					});
				}, ["left"]),
				onPointermove: t[1] ||= (e) => {
					if (C(D).disableSwipe.value || !k.value) return;
					let t = e.clientX - k.value.x, n = e.clientY - k.value.y, r = !!A.value, i = ["left", "right"].includes(C(D).swipeDirection.value), a = ["left", "up"].includes(C(D).swipeDirection.value) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
						x: o,
						y: s
					}, u = {
						originalEvent: e,
						delta: l
					};
					r ? (A.value = l, C(Z)(C("toast.swipeMove"), (e) => h("swipeMove", e), u)) : C(Q)(l, C(D).swipeDirection.value, c) ? (A.value = l, C(Z)(C("toast.swipeStart"), (e) => h("swipeStart", e), u), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (k.value = null);
				},
				onPointerup: t[2] ||= (e) => {
					if (C(D).disableSwipe.value) return;
					let t = A.value, n = e.target;
					if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), A.value = null, k.value = null, t) {
						let n = e.currentTarget, r = {
							originalEvent: e,
							delta: t
						};
						C(Q)(t, C(D).swipeDirection.value, C(D).swipeThreshold.value) ? C(Z)(C("toast.swipeEnd"), (e) => h("swipeEnd", e), r) : C(Z)(C("toast.swipeCancel"), (e) => h("swipeCancel", e), r), n?.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
					}
				}
			}), {
				default: l(() => [o(e.$slots, "default", {
					remaining: R.value,
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
		})], 8, ["to"])) : _("v-if", !0)], 64));
	}
}), de = /* @__PURE__ */ D({
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
		let t = e, n = ce(), { forwardRef: r } = F();
		return (e, a) => (s(), v(re, { "as-child": "" }, {
			default: l(() => [O(C(L), i(t, {
				ref: C(r),
				type: e.as === "button" ? "button" : void 0,
				onClick: C(n).onClose
			}), {
				default: l(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, ["type", "onClick"])]),
			_: 3
		}));
	}
}), fe = /* @__PURE__ */ D({
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
	setup(e) {
		let t = e;
		return F(), (e, n) => (s(), v(C(L), T(r(t)), {
			default: l(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), pe = /* @__PURE__ */ D({
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
	setup(e) {
		let t = e;
		return (e, n) => (s(), v(C(H), T(r(t)), {
			default: l(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), me = /* @__PURE__ */ D({
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
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: a } = F(), c = P(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		return (e, t) => (s(), v(C(z), { present: e.forceMount || C(c) }, {
			default: l(() => [O(ue, i({
				ref: C(a),
				open: C(c),
				type: e.type,
				as: e.as,
				"as-child": e.asChild,
				duration: e.duration
			}, e.$attrs, {
				onClose: t[0] ||= (e) => c.value = !1,
				onPause: t[1] ||= (e) => r("pause"),
				onResume: t[2] ||= (e) => r("resume"),
				onEscapeKeyDown: t[3] ||= (e) => r("escapeKeyDown", e),
				onSwipeStart: t[4] ||= (e) => {
					r("swipeStart", e), e.defaultPrevented || e.currentTarget.setAttribute("data-swipe", "start");
				},
				onSwipeMove: t[5] ||= (e) => {
					if (r("swipeMove", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "move"), r.style.setProperty("--reka-toast-swipe-move-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-move-y", `${n}px`);
					}
				},
				onSwipeCancel: t[6] ||= (e) => {
					if (r("swipeCancel", e), !e.defaultPrevented) {
						let t = e.currentTarget;
						t.setAttribute("data-swipe", "cancel"), t.style.removeProperty("--reka-toast-swipe-move-x"), t.style.removeProperty("--reka-toast-swipe-move-y"), t.style.removeProperty("--reka-toast-swipe-end-x"), t.style.removeProperty("--reka-toast-swipe-end-y");
					}
				},
				onSwipeEnd: t[7] ||= (e) => {
					if (r("swipeEnd", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "end"), r.style.removeProperty("--reka-toast-swipe-move-x"), r.style.removeProperty("--reka-toast-swipe-move-y"), r.style.setProperty("--reka-toast-swipe-end-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-end-y", `${n}px`), c.value = !1;
					}
				}
			}), {
				default: l(({ remaining: t, duration: n }) => [o(e.$slots, "default", {
					remaining: t,
					duration: n,
					open: C(c)
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
}), he = /* @__PURE__ */ D({
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
	setup(e) {
		let t = e;
		return F(), (e, n) => (s(), v(C(L), T(r(t)), {
			default: l(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ge = /* @__PURE__ */ D({
	__name: "FocusProxy",
	emits: ["focusFromOutsideViewport"],
	setup(e, { emit: t }) {
		let n = t, r = J();
		return (e, t) => (s(), v(C(q), {
			tabindex: "0",
			style: { position: "fixed" },
			onFocus: t[0] ||= (e) => {
				let t = e.relatedTarget;
				C(r).viewport.value?.contains(t) || n("focusFromOutsideViewport");
			}
		}, {
			default: l(() => [o(e.$slots, "default")]),
			_: 3
		}));
	}
}), _e = /* @__PURE__ */ D({
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
	setup(n) {
		let { hotkey: r, label: a } = y(n), { forwardRef: c, currentElement: d } = F(), { CollectionSlot: f, getItems: p } = K(), m = J(), g = S(() => m.toastCount.value > 0), b = e(), x = e(), w = /Key/g, T = /Digit/g, E = S(() => r.value.join("+").replace(w, "").replace(T, ""));
		I(r.value, () => {
			d.value.focus();
		}), t(() => {
			m.onViewportChange(d.value);
		}), u((e) => {
			let t = d.value;
			if (g.value && t) {
				let n = () => {
					if (!m.isClosePausedRef.value) {
						let e = new CustomEvent(Y);
						t.dispatchEvent(e), m.isClosePausedRef.value = !0;
					}
				}, r = () => {
					if (m.isClosePausedRef.value) {
						let e = new CustomEvent(X);
						t.dispatchEvent(e), m.isClosePausedRef.value = !1;
					}
				}, i = (e) => {
					t.contains(e.relatedTarget) || r();
				}, a = () => {
					t.contains(G()) || r();
				}, o = (e) => {
					let n = e.altKey || e.ctrlKey || e.metaKey;
					if (e.key === "Tab" && !n) {
						let n = G(), r = e.shiftKey;
						if (e.target === t && r) {
							b.value?.focus();
							return;
						}
						let i = D({ tabbingDirection: r ? "backwards" : "forwards" }), a = i.findIndex((e) => e === n);
						W(i.slice(a + 1)) ? e.preventDefault() : r ? b.value?.focus() : x.value?.focus();
					}
				};
				t.addEventListener("focusin", n), t.addEventListener("focusout", i), t.addEventListener("pointermove", n), t.addEventListener("pointerleave", a), t.addEventListener("keydown", o), window.addEventListener("blur", n), window.addEventListener("focus", r), e(() => {
					t.removeEventListener("focusin", n), t.removeEventListener("focusout", i), t.removeEventListener("pointermove", n), t.removeEventListener("pointerleave", a), t.removeEventListener("keydown", o), window.removeEventListener("blur", n), window.removeEventListener("focus", r);
				});
			}
		});
		function D({ tabbingDirection: e }) {
			let t = p().map((e) => e.ref).map((t) => {
				let n = [t, ...te(t)];
				return e === "forwards" ? n : n.reverse();
			});
			return (e === "forwards" ? t.reverse() : t).flat();
		}
		return (e, t) => (s(), v(C(ne), {
			role: "region",
			"aria-label": typeof C(a) == "string" ? C(a).replace("{hotkey}", E.value) : C(a)(E.value),
			tabindex: "-1",
			style: h({ pointerEvents: g.value ? void 0 : "none" })
		}, {
			default: l(() => [
				g.value ? (s(), v(ge, {
					key: 0,
					ref: (e) => {
						e && (b.value = C(B)(e));
					},
					onFocusFromOutsideViewport: t[0] ||= () => {
						let e = D({ tabbingDirection: "forwards" });
						C(W)(e);
					}
				}, null, 512)) : _("v-if", !0),
				O(C(f), null, {
					default: l(() => [O(C(L), i({
						ref: C(c),
						tabindex: "-1",
						as: e.as,
						"as-child": e.asChild
					}, e.$attrs), {
						default: l(() => [o(e.$slots, "default")]),
						_: 3
					}, 16, ["as", "as-child"])]),
					_: 3
				}),
				g.value ? (s(), v(ge, {
					key: 1,
					ref: (e) => {
						e && (x.value = C(B)(e));
					},
					onFocusFromOutsideViewport: t[1] ||= () => {
						let e = D({ tabbingDirection: "backwards" });
						C(W)(e);
					}
				}, null, 512)) : _("v-if", !0)
			]),
			_: 3
		}, 8, ["aria-label", "style"]));
	}
}), ve = /* @__PURE__ */ D({
	__name: "ToastViewport",
	props: {
		toasts: {},
		viewportLabel: {},
		announceLabel: {},
		closeLabel: {}
	},
	emits: ["dismiss"],
	setup(e, { emit: t }) {
		let n = t;
		function i(e, t) {
			t || n("dismiss", e);
		}
		let o = {
			info: void 0,
			success: k.toastSuccess,
			error: k.toastError
		}, u = c(M, void 0), d = S(() => u ? { to: u } : {});
		return (t, n) => (s(), v(C(ae), {
			label: e.announceLabel,
			duration: 5e3
		}, {
			default: l(() => [O(C(pe), T(r(d.value)), {
				default: l(() => [O(C(_e), {
					class: x(["tc-z-toast", C(k).toastViewport]),
					label: e.viewportLabel
				}, {
					default: l(() => [(s(!0), f(w, null, a(e.toasts, (t) => (s(), v(C(me), {
						key: t.id,
						class: x([C(k).toastRoot, o[t.variant ?? "info"]]),
						type: t.variant === "error" ? "foreground" : "background",
						open: !0,
						"onUpdate:open": (e) => i(t.id, e)
					}, {
						default: l(() => [
							O(C(he), { class: x(C(k).toastTitle) }, {
								default: l(() => [E(g(t.title), 1)]),
								_: 2
							}, 1032, ["class"]),
							t.description ? (s(), v(C(fe), {
								key: 0,
								class: x(C(k).toastDescription)
							}, {
								default: l(() => [E(g(t.description), 1)]),
								_: 2
							}, 1032, ["class"])) : _("", !0),
							O(C(de), {
								class: x(["tc-interactive", C(k).toastClose]),
								"aria-label": e.closeLabel
							}, {
								default: l(() => [O(j, {
									icon: C(A),
									size: 14
								}, null, 8, ["icon"])]),
								_: 1
							}, 8, ["class", "aria-label"])
						]),
						_: 2
					}, 1032, [
						"class",
						"type",
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
export { ve as t };
