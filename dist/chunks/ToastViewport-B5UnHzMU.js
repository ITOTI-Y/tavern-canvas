import { A as e, C as t, D as n, F as r, H as i, I as a, N as o, Q as s, T as c, V as l, W as u, _ as d, at as f, c as p, ct as m, d as h, dt as g, et as _, ft as v, g as y, h as b, j as x, p as S, pt as C, u as w, ut as T, v as E, x as D, y as O } from "./vue-i18n-DUz2Gjn8.js";
import { t as k } from "./AppIcon-Cnhzrx9o.js";
import { r as A } from "./StateSurface-Bo_sA18G.js";
import { t as j } from "./x-CDKrptQJ.js";
import { t as M } from "./portal_keys-gQ1cWdMS.js";
import { D as N, _ as P, c as F, f as I, h as ee, i as L, j as R, o as z, p as B, r as V, t as H, x as U } from "./Teleport-C7mDSUEl.js";
import { n as W, o as G, r as te } from "./FocusScope-B2vRGnoX.js";
import { t as K } from "./Collection-5SRQOk3F.js";
import { t as q } from "./VisuallyHidden-5YftsqxW.js";
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
	setup(t) {
		let r = t, { forwardRef: i, currentElement: s } = F();
		return e(() => {
			V.branches.add(s.value);
		}), x(() => {
			V.branches.delete(s.value);
		}), (e, t) => (o(), b(m(L), n({ ref: m(i) }, r), {
			default: u(() => [a(e.$slots, "default")]),
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
		return (e, t) => (o(), b(m(L), {
			as: e.as,
			"as-child": e.asChild,
			"data-reka-toast-announce-exclude": "",
			"data-reka-toast-announce-alt": e.altText || void 0
		}, {
			default: u(() => [a(e.$slots, "default")]),
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
	setup(e) {
		let t = e, { label: n, duration: r, disableSwipe: i, swipeDirection: o, swipeThreshold: s } = f(t);
		K({ isProvider: !0 });
		let c = _(), l = _(0), u = _(!1), d = _(!1);
		if (t.label && typeof t.label == "string" && !t.label.trim()) throw Error("Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.");
		return ie({
			label: n,
			duration: r,
			disableSwipe: i,
			swipeDirection: o,
			swipeThreshold: s,
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
		}), (e, t) => a(e.$slots, "default");
	}
}), oe = /* @__PURE__ */ D({
	__name: "ToastAnnounce",
	setup(e) {
		let t = J(), n = N(1e3), r = _(!1), i = 0, c = 0;
		return U && (i = requestAnimationFrame(() => {
			c = requestAnimationFrame(() => {
				r.value = !0;
			});
		}), s(() => {
			cancelAnimationFrame(i), cancelAnimationFrame(c);
		})), (e, i) => m(n) || r.value ? (o(), b(m(q), {
			key: 0,
			feature: "fully-hidden"
		}, {
			default: u(() => [E(C(m(t).label.value) + " ", 1), a(e.$slots, "default")]),
			_: 3
		})) : y("v-if", !0);
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
	setup(t, { emit: s }) {
		let c = t, f = s, { forwardRef: g, currentElement: v } = F(), { CollectionItem: T } = K(), D = J(), k = _(null), A = _(null), j = S(() => typeof c.duration == "number" ? c.duration : D.duration.value), M = _(0), N = _(j.value), P = _(0), R = _(j.value), z = ee(() => {
			let e = Date.now() - M.value;
			R.value = Math.max(N.value - e, 0);
		}, { fpsLimit: 60 });
		function B(e) {
			e <= 0 || e === Infinity || U && (window.clearTimeout(P.value), M.value = Date.now(), P.value = window.setTimeout(V, e));
		}
		function V(e) {
			let t = e?.pointerType === "";
			v.value?.contains(G()) && t && D.viewport.value?.focus(), t && (D.isClosePausedRef.value = !1), f("close");
		}
		let H = S(() => v.value ? $(v.value) : null);
		if (c.type && !["foreground", "background"].includes(c.type)) throw Error("Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.");
		return i((e) => {
			let t = D.viewport.value;
			if (t) {
				let e = () => {
					B(N.value), z.resume(), f("resume");
				}, n = () => {
					let e = Date.now() - M.value;
					N.value -= e, window.clearTimeout(P.value), z.pause(), f("pause");
				};
				return t.addEventListener(Y, n), t.addEventListener(X, e), () => {
					t.removeEventListener(Y, n), t.removeEventListener(X, e);
				};
			}
		}), l(() => [c.open, j.value], () => {
			N.value = j.value, c.open && !D.isClosePausedRef.value && B(j.value);
		}, { immediate: !0 }), I("Escape", (e) => {
			f("escapeKeyDown", e), e.defaultPrevented || (D.isFocusedToastEscapeKeyDownRef.value = !0, V());
		}), e(() => {
			D.onToastAdd();
		}), x(() => {
			D.onToastRemove();
		}), le({ onClose: V }), (e, t) => (o(), d(w, null, [H.value ? (o(), b(oe, {
			key: 0,
			role: "alert",
			"aria-live": e.type === "foreground" ? "assertive" : "polite"
		}, {
			default: u(() => [y("\n      Render each chunk as its own text node so screen readers get the\n      natural pause break between nodes (see comment in utils.ts).\n      Interpolating the array directly with `{{ announceTextContent }}`\n      would route through Vue's `toDisplayString`, which JSON-stringifies\n      arrays — the live region would then announce literal `[`, quotes\n      and commas instead of the toast title and description.\n    "), (o(!0), d(w, null, r(H.value, (e, t) => (o(), d(w, { key: t }, [E(C(e), 1)], 64))), 128))]),
			_: 1
		}, 8, ["aria-live"])) : y("v-if", !0), m(D).viewport.value ? (o(), b(h, {
			key: 1,
			to: m(D).viewport.value
		}, [O(m(T), null, {
			default: u(() => [O(m(L), n({
				ref: m(g),
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
				onPointerdown: t[0] ||= p((e) => {
					m(D).disableSwipe.value || (k.value = {
						x: e.clientX,
						y: e.clientY
					});
				}, ["left"]),
				onPointermove: t[1] ||= (e) => {
					if (m(D).disableSwipe.value || !k.value) return;
					let t = e.clientX - k.value.x, n = e.clientY - k.value.y, r = !!A.value, i = ["left", "right"].includes(m(D).swipeDirection.value), a = ["left", "up"].includes(m(D).swipeDirection.value) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
						x: o,
						y: s
					}, u = {
						originalEvent: e,
						delta: l
					};
					r ? (A.value = l, m(Z)(m("toast.swipeMove"), (e) => f("swipeMove", e), u)) : m(Q)(l, m(D).swipeDirection.value, c) ? (A.value = l, m(Z)(m("toast.swipeStart"), (e) => f("swipeStart", e), u), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (k.value = null);
				},
				onPointerup: t[2] ||= (e) => {
					if (m(D).disableSwipe.value) return;
					let t = A.value, n = e.target;
					if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), A.value = null, k.value = null, t) {
						let n = e.currentTarget, r = {
							originalEvent: e,
							delta: t
						};
						m(Q)(t, m(D).swipeDirection.value, m(D).swipeThreshold.value) ? m(Z)(m("toast.swipeEnd"), (e) => f("swipeEnd", e), r) : m(Z)(m("toast.swipeCancel"), (e) => f("swipeCancel", e), r), n?.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
					}
				}
			}), {
				default: u(() => [a(e.$slots, "default", {
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
		})], 8, ["to"])) : y("v-if", !0)], 64));
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
		let t = e, r = ce(), { forwardRef: i } = F();
		return (e, s) => (o(), b(re, { "as-child": "" }, {
			default: u(() => [O(m(L), n(t, {
				ref: m(i),
				type: e.as === "button" ? "button" : void 0,
				onClick: m(r).onClose
			}), {
				default: u(() => [a(e.$slots, "default")]),
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
		let n = e;
		return F(), (e, r) => (o(), b(m(L), g(t(n)), {
			default: u(() => [a(e.$slots, "default")]),
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
		let n = e;
		return (e, r) => (o(), b(m(H), g(t(n)), {
			default: u(() => [a(e.$slots, "default")]),
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
		let r = e, i = t, { forwardRef: s } = F(), c = P(r, "open", i, {
			defaultValue: r.defaultOpen,
			passive: r.open === void 0
		});
		return (e, t) => (o(), b(m(z), { present: e.forceMount || m(c) }, {
			default: u(() => [O(ue, n({
				ref: m(s),
				open: m(c),
				type: e.type,
				as: e.as,
				"as-child": e.asChild,
				duration: e.duration
			}, e.$attrs, {
				onClose: t[0] ||= (e) => c.value = !1,
				onPause: t[1] ||= (e) => i("pause"),
				onResume: t[2] ||= (e) => i("resume"),
				onEscapeKeyDown: t[3] ||= (e) => i("escapeKeyDown", e),
				onSwipeStart: t[4] ||= (e) => {
					i("swipeStart", e), e.defaultPrevented || e.currentTarget.setAttribute("data-swipe", "start");
				},
				onSwipeMove: t[5] ||= (e) => {
					if (i("swipeMove", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "move"), r.style.setProperty("--reka-toast-swipe-move-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-move-y", `${n}px`);
					}
				},
				onSwipeCancel: t[6] ||= (e) => {
					if (i("swipeCancel", e), !e.defaultPrevented) {
						let t = e.currentTarget;
						t.setAttribute("data-swipe", "cancel"), t.style.removeProperty("--reka-toast-swipe-move-x"), t.style.removeProperty("--reka-toast-swipe-move-y"), t.style.removeProperty("--reka-toast-swipe-end-x"), t.style.removeProperty("--reka-toast-swipe-end-y");
					}
				},
				onSwipeEnd: t[7] ||= (e) => {
					if (i("swipeEnd", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "end"), r.style.removeProperty("--reka-toast-swipe-move-x"), r.style.removeProperty("--reka-toast-swipe-move-y"), r.style.setProperty("--reka-toast-swipe-end-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-end-y", `${n}px`), c.value = !1;
					}
				}
			}), {
				default: u(({ remaining: t, duration: n }) => [a(e.$slots, "default", {
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
		let n = e;
		return F(), (e, r) => (o(), b(m(L), g(t(n)), {
			default: u(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ge = /* @__PURE__ */ D({
	__name: "FocusProxy",
	emits: ["focusFromOutsideViewport"],
	setup(e, { emit: t }) {
		let n = t, r = J();
		return (e, t) => (o(), b(m(q), {
			tabindex: "0",
			style: { position: "fixed" },
			onFocus: t[0] ||= (e) => {
				let t = e.relatedTarget;
				m(r).viewport.value?.contains(t) || n("focusFromOutsideViewport");
			}
		}, {
			default: u(() => [a(e.$slots, "default")]),
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
	setup(t) {
		let { hotkey: r, label: s } = f(t), { forwardRef: c, currentElement: l } = F(), { CollectionSlot: d, getItems: p } = K(), h = J(), g = S(() => h.toastCount.value > 0), x = _(), C = _(), w = /Key/g, T = /Digit/g, E = S(() => r.value.join("+").replace(w, "").replace(T, ""));
		I(r.value, () => {
			l.value.focus();
		}), e(() => {
			h.onViewportChange(l.value);
		}), i((e) => {
			let t = l.value;
			if (g.value && t) {
				let n = () => {
					if (!h.isClosePausedRef.value) {
						let e = new CustomEvent(Y);
						t.dispatchEvent(e), h.isClosePausedRef.value = !0;
					}
				}, r = () => {
					if (h.isClosePausedRef.value) {
						let e = new CustomEvent(X);
						t.dispatchEvent(e), h.isClosePausedRef.value = !1;
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
							x.value?.focus();
							return;
						}
						let i = D({ tabbingDirection: r ? "backwards" : "forwards" }), a = i.findIndex((e) => e === n);
						W(i.slice(a + 1)) ? e.preventDefault() : r ? x.value?.focus() : C.value?.focus();
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
		return (e, t) => (o(), b(m(ne), {
			role: "region",
			"aria-label": typeof m(s) == "string" ? m(s).replace("{hotkey}", E.value) : m(s)(E.value),
			tabindex: "-1",
			style: v({ pointerEvents: g.value ? void 0 : "none" })
		}, {
			default: u(() => [
				g.value ? (o(), b(ge, {
					key: 0,
					ref: (e) => {
						e && (x.value = m(B)(e));
					},
					onFocusFromOutsideViewport: t[0] ||= () => {
						let e = D({ tabbingDirection: "forwards" });
						m(W)(e);
					}
				}, null, 512)) : y("v-if", !0),
				O(m(d), null, {
					default: u(() => [O(m(L), n({
						ref: m(c),
						tabindex: "-1",
						as: e.as,
						"as-child": e.asChild
					}, e.$attrs), {
						default: u(() => [a(e.$slots, "default")]),
						_: 3
					}, 16, ["as", "as-child"])]),
					_: 3
				}),
				g.value ? (o(), b(ge, {
					key: 1,
					ref: (e) => {
						e && (C.value = m(B)(e));
					},
					onFocusFromOutsideViewport: t[1] ||= () => {
						let e = D({ tabbingDirection: "backwards" });
						m(W)(e);
					}
				}, null, 512)) : y("v-if", !0)
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
	setup(e, { emit: n }) {
		let i = n;
		function a(e, t) {
			t || i("dismiss", e);
		}
		let s = {
			info: void 0,
			success: A.toastSuccess,
			error: A.toastError
		}, l = c(M, void 0), f = S(() => l ? { to: l } : {});
		return (n, i) => (o(), b(m(ae), {
			label: e.announceLabel,
			duration: 5e3
		}, {
			default: u(() => [O(m(pe), g(t(f.value)), {
				default: u(() => [O(m(_e), {
					class: T(["tc-z-toast", m(A).toastViewport]),
					label: e.viewportLabel
				}, {
					default: u(() => [(o(!0), d(w, null, r(e.toasts, (t) => (o(), b(m(me), {
						key: t.id,
						class: T([m(A).toastRoot, s[t.variant ?? "info"]]),
						type: t.variant === "error" ? "foreground" : "background",
						open: !0,
						"onUpdate:open": (e) => a(t.id, e)
					}, {
						default: u(() => [
							O(m(he), { class: T(m(A).toastTitle) }, {
								default: u(() => [E(C(t.title), 1)]),
								_: 2
							}, 1032, ["class"]),
							t.description ? (o(), b(m(fe), {
								key: 0,
								class: T(m(A).toastDescription)
							}, {
								default: u(() => [E(C(t.description), 1)]),
								_: 2
							}, 1032, ["class"])) : y("", !0),
							O(m(de), {
								class: T(["tc-interactive", m(A).toastClose]),
								"aria-label": e.closeLabel
							}, {
								default: u(() => [O(k, {
									icon: m(j),
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
