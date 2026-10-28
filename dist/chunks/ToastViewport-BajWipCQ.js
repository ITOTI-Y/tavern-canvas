import { $ as e, C as t, D as n, G as r, H as i, I as a, L as o, M as s, P as c, T as l, U as u, _ as d, c as f, d as p, dt as m, ft as h, g, h as _, j as v, lt as y, mt as b, ot as x, p as S, pt as C, tt as w, u as T, v as E, x as D, y as O } from "./vue-i18n-L-BrQRnK.js";
import { n as k } from "./portal_keys-DthxrmWp.js";
import { t as A } from "./AppIcon-DkyxvN8k.js";
import { r as j } from "./StateSurface-X9aRtXAT.js";
import { t as M } from "./components_styles-DHX8irr3.js";
import { t as N } from "./x-D7Ry5i_D.js";
import { N as P, P as F, S as I, _ as L, b as ee, f as R, i as z, k as B, l as V, o as H, r as U, s as W, t as te, v as G, w as K } from "./Teleport-CquQcgiX.js";
import { a as q } from "./PopperContent-BPSDCuaj.js";
import { t as J } from "./Collection-e6mvGbNy.js";
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
		let t = e, { forwardRef: i, currentElement: a } = R();
		return v(() => {
			H.branches.add(a.value);
		}), s(() => {
			H.branches.delete(a.value);
		}), (e, a) => (c(), _(y(W), n({ ref: y(i) }, t), {
			default: r(() => [o(e.$slots, "default")]),
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
		return (e, t) => (c(), _(y(W), {
			as: e.as,
			"as-child": e.asChild,
			"data-reka-toast-announce-exclude": "",
			"data-reka-toast-announce-alt": e.altText || void 0
		}, {
			default: r(() => [o(e.$slots, "default")]),
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
		let t = e, { label: n, duration: r, disableSwipe: i, swipeDirection: a, swipeThreshold: s } = x(t);
		J({ isProvider: !0 });
		let c = w(), l = w(0), u = w(!1), d = w(!1);
		if (t.label && typeof t.label == "string" && !t.label.trim()) throw Error("Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.");
		return ie({
			label: n,
			duration: r,
			disableSwipe: i,
			swipeDirection: a,
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
		}), (e, t) => o(e.$slots, "default");
	}
}), oe = /* @__PURE__ */ D({
	__name: "ToastAnnounce",
	setup(t) {
		let n = Y(), i = B(1e3), a = w(!1), s = 0, l = 0;
		return K && (s = requestAnimationFrame(() => {
			l = requestAnimationFrame(() => {
				a.value = !0;
			});
		}), e(() => {
			cancelAnimationFrame(s), cancelAnimationFrame(l);
		})), (e, t) => y(i) || a.value ? (c(), _(y(q), {
			key: 0,
			feature: "fully-hidden"
		}, {
			default: r(() => [E(b(y(n).label.value) + " ", 1), o(e.$slots, "default")]),
			_: 3
		})) : g("v-if", !0);
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
	setup(e, { emit: t }) {
		let l = e, m = t, { forwardRef: h, currentElement: x } = R(), { CollectionItem: C } = J(), D = Y(), k = w(null), A = w(null), j = S(() => typeof l.duration == "number" ? l.duration : D.duration.value), M = w(0), N = w(j.value), F = w(0), I = w(j.value), z = ee(() => {
			let e = Date.now() - M.value;
			I.value = Math.max(N.value - e, 0);
		}, { fpsLimit: 60 });
		function B(e) {
			e <= 0 || e === Infinity || K && (window.clearTimeout(F.value), M.value = Date.now(), F.value = window.setTimeout(V, e));
		}
		function V(e) {
			let t = e?.pointerType === "";
			x.value?.contains(P()) && t && D.viewport.value?.focus(), t && (D.isClosePausedRef.value = !1), m("close");
		}
		let H = S(() => x.value ? ce(x.value) : null);
		if (l.type && !["foreground", "background"].includes(l.type)) throw Error("Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.");
		return u((e) => {
			let t = D.viewport.value;
			if (t) {
				let e = () => {
					B(N.value), z.resume(), m("resume");
				}, n = () => {
					let e = Date.now() - M.value;
					N.value -= e, window.clearTimeout(F.value), z.pause(), m("pause");
				};
				return t.addEventListener(X, n), t.addEventListener(Z, e), () => {
					t.removeEventListener(X, n), t.removeEventListener(Z, e);
				};
			}
		}), i(() => [l.open, j.value], () => {
			N.value = j.value, l.open && !D.isClosePausedRef.value && B(j.value);
		}, { immediate: !0 }), L("Escape", (e) => {
			m("escapeKeyDown", e), e.defaultPrevented || (D.isFocusedToastEscapeKeyDownRef.value = !0, V());
		}), v(() => {
			D.onToastAdd();
		}), s(() => {
			D.onToastRemove();
		}), ue({ onClose: V }), (e, t) => (c(), d(T, null, [H.value ? (c(), _(oe, {
			key: 0,
			role: "alert",
			"aria-live": e.type === "foreground" ? "assertive" : "polite"
		}, {
			default: r(() => [g("\n      Render each chunk as its own text node so screen readers get the\n      natural pause break between nodes (see comment in utils.ts).\n      Interpolating the array directly with `{{ announceTextContent }}`\n      would route through Vue's `toDisplayString`, which JSON-stringifies\n      arrays — the live region would then announce literal `[`, quotes\n      and commas instead of the toast title and description.\n    "), (c(!0), d(T, null, a(H.value, (e, t) => (c(), d(T, { key: t }, [E(b(e), 1)], 64))), 128))]),
			_: 1
		}, 8, ["aria-live"])) : g("v-if", !0), y(D).viewport.value ? (c(), _(p, {
			key: 1,
			to: y(D).viewport.value
		}, [O(y(C), null, {
			default: r(() => [O(y(W), n({
				ref: y(h),
				tabindex: "0"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"data-state": e.open ? "open" : "closed",
				"data-swipe-direction": y(D).swipeDirection.value,
				style: y(D).disableSwipe.value ? void 0 : {
					userSelect: "none",
					touchAction: "none"
				},
				onPointerdown: t[0] ||= f((e) => {
					y(D).disableSwipe.value || (k.value = {
						x: e.clientX,
						y: e.clientY
					});
				}, ["left"]),
				onPointermove: t[1] ||= (e) => {
					if (y(D).disableSwipe.value || !k.value) return;
					let t = e.clientX - k.value.x, n = e.clientY - k.value.y, r = !!A.value, i = ["left", "right"].includes(y(D).swipeDirection.value), a = ["left", "up"].includes(y(D).swipeDirection.value) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
						x: o,
						y: s
					}, u = {
						originalEvent: e,
						delta: l
					};
					r ? (A.value = l, y(Q)(y("toast.swipeMove"), (e) => m("swipeMove", e), u)) : y($)(l, y(D).swipeDirection.value, c) ? (A.value = l, y(Q)(y("toast.swipeStart"), (e) => m("swipeStart", e), u), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (k.value = null);
				},
				onPointerup: t[2] ||= (e) => {
					if (y(D).disableSwipe.value) return;
					let t = A.value, n = e.target;
					if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), A.value = null, k.value = null, t) {
						let n = e.currentTarget, r = {
							originalEvent: e,
							delta: t
						};
						y($)(t, y(D).swipeDirection.value, y(D).swipeThreshold.value) ? y(Q)(y("toast.swipeEnd"), (e) => m("swipeEnd", e), r) : y(Q)(y("toast.swipeCancel"), (e) => m("swipeCancel", e), r), n?.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
					}
				}
			}), {
				default: r(() => [o(e.$slots, "default", {
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
		})], 8, ["to"])) : g("v-if", !0)], 64));
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
		let t = e, i = le(), { forwardRef: a } = R();
		return (e, s) => (c(), _(re, { "as-child": "" }, {
			default: r(() => [O(y(W), n(t, {
				ref: y(a),
				type: e.as === "button" ? "button" : void 0,
				onClick: y(i).onClose
			}), {
				default: r(() => [o(e.$slots, "default")]),
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
	setup(e) {
		let n = e;
		return R(), (e, i) => (c(), _(y(W), h(t(n)), {
			default: r(() => [o(e.$slots, "default")]),
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
	setup(e) {
		let n = e;
		return (e, i) => (c(), _(y(te), h(t(n)), {
			default: r(() => [o(e.$slots, "default")]),
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
	setup(e, { emit: t }) {
		let i = e, a = t, { forwardRef: s } = R(), l = I(i, "open", a, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
		});
		return (e, t) => (c(), _(y(V), { present: e.forceMount || y(l) }, {
			default: r(() => [O(de, n({
				ref: y(s),
				open: y(l),
				type: e.type,
				as: e.as,
				"as-child": e.asChild,
				duration: e.duration
			}, e.$attrs, {
				onClose: t[0] ||= (e) => l.value = !1,
				onPause: t[1] ||= (e) => a("pause"),
				onResume: t[2] ||= (e) => a("resume"),
				onEscapeKeyDown: t[3] ||= (e) => a("escapeKeyDown", e),
				onSwipeStart: t[4] ||= (e) => {
					a("swipeStart", e), e.defaultPrevented || e.currentTarget.setAttribute("data-swipe", "start");
				},
				onSwipeMove: t[5] ||= (e) => {
					if (a("swipeMove", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "move"), r.style.setProperty("--reka-toast-swipe-move-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-move-y", `${n}px`);
					}
				},
				onSwipeCancel: t[6] ||= (e) => {
					if (a("swipeCancel", e), !e.defaultPrevented) {
						let t = e.currentTarget;
						t.setAttribute("data-swipe", "cancel"), t.style.removeProperty("--reka-toast-swipe-move-x"), t.style.removeProperty("--reka-toast-swipe-move-y"), t.style.removeProperty("--reka-toast-swipe-end-x"), t.style.removeProperty("--reka-toast-swipe-end-y");
					}
				},
				onSwipeEnd: t[7] ||= (e) => {
					if (a("swipeEnd", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "end"), r.style.removeProperty("--reka-toast-swipe-move-x"), r.style.removeProperty("--reka-toast-swipe-move-y"), r.style.setProperty("--reka-toast-swipe-end-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-end-y", `${n}px`), l.value = !1;
					}
				}
			}), {
				default: r(({ remaining: t, duration: n }) => [o(e.$slots, "default", {
					remaining: t,
					duration: n,
					open: y(l)
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
	setup(e) {
		let n = e;
		return R(), (e, i) => (c(), _(y(W), h(t(n)), {
			default: r(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), _e = /* @__PURE__ */ D({
	__name: "FocusProxy",
	emits: ["focusFromOutsideViewport"],
	setup(e, { emit: t }) {
		let n = t, i = Y();
		return (e, t) => (c(), _(y(q), {
			tabindex: "0",
			style: { position: "fixed" },
			onFocus: t[0] ||= (e) => {
				let t = e.relatedTarget;
				y(i).viewport.value?.contains(t) || n("focusFromOutsideViewport");
			}
		}, {
			default: r(() => [o(e.$slots, "default")]),
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
		let { hotkey: t, label: i } = x(e), { forwardRef: a, currentElement: s } = R(), { CollectionSlot: l, getItems: d } = J(), f = Y(), p = S(() => f.toastCount.value > 0), m = w(), h = w(), b = /Key/g, T = /Digit/g, E = S(() => t.value.join("+").replace(b, "").replace(T, ""));
		L(t.value, () => {
			s.value.focus();
		}), v(() => {
			f.onViewportChange(s.value);
		}), u((e) => {
			let t = s.value;
			if (p.value && t) {
				let n = () => {
					if (!f.isClosePausedRef.value) {
						let e = new CustomEvent(X);
						t.dispatchEvent(e), f.isClosePausedRef.value = !0;
					}
				}, r = () => {
					if (f.isClosePausedRef.value) {
						let e = new CustomEvent(Z);
						t.dispatchEvent(e), f.isClosePausedRef.value = !1;
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
							m.value?.focus();
							return;
						}
						let i = D({ tabbingDirection: r ? "backwards" : "forwards" }), a = i.findIndex((e) => e === n);
						U(i.slice(a + 1)) ? e.preventDefault() : r ? m.value?.focus() : h.value?.focus();
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
		return (e, t) => (c(), _(y(ne), {
			role: "region",
			"aria-label": typeof y(i) == "string" ? y(i).replace("{hotkey}", E.value) : y(i)(E.value),
			tabindex: "-1",
			style: C({ pointerEvents: p.value ? void 0 : "none" })
		}, {
			default: r(() => [
				p.value ? (c(), _(_e, {
					key: 0,
					ref: (e) => {
						e && (m.value = y(G)(e));
					},
					onFocusFromOutsideViewport: t[0] ||= () => {
						let e = D({ tabbingDirection: "forwards" });
						y(U)(e);
					}
				}, null, 512)) : g("v-if", !0),
				O(y(l), null, {
					default: r(() => [O(y(W), n({
						ref: y(a),
						tabindex: "-1",
						as: e.as,
						"as-child": e.asChild
					}, e.$attrs), {
						default: r(() => [o(e.$slots, "default")]),
						_: 3
					}, 16, ["as", "as-child"])]),
					_: 3
				}),
				p.value ? (c(), _(_e, {
					key: 1,
					ref: (e) => {
						e && (h.value = y(G)(e));
					},
					onFocusFromOutsideViewport: t[1] ||= () => {
						let e = D({ tabbingDirection: "backwards" });
						y(U)(e);
					}
				}, null, 512)) : g("v-if", !0)
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
	setup(e, { emit: n }) {
		let i = n;
		function o(e, t) {
			t || i("dismiss", e);
		}
		let s = {
			info: void 0,
			success: M.toastSuccess,
			error: M.toastError
		}, u = l(k, void 0), f = S(() => u ? { to: u } : {});
		return (n, i) => (c(), _(y(ae), {
			label: e.announceLabel,
			duration: ye
		}, {
			default: r(() => [O(y(me), h(t(f.value)), {
				default: r(() => [O(y(ve), {
					class: m(["tc-z-toast", y(M).toastViewport]),
					label: e.viewportLabel
				}, {
					default: r(() => [(c(!0), d(T, null, a(e.toasts, (t) => (c(), _(y(he), {
						key: t.id,
						class: m([y(M).toastRoot, s[t.variant ?? "info"]]),
						type: t.variant === "error" ? "foreground" : "background",
						open: !0,
						duration: t.duration ?? ye,
						"onUpdate:open": (e) => o(t.id, e)
					}, {
						default: r(() => [
							t.variant === "success" && !t.description ? (c(), _(A, {
								key: 0,
								icon: y(j),
								size: 16,
								class: m(y(M).toastIcon)
							}, null, 8, ["icon", "class"])) : g("", !0),
							O(y(ge), { class: m(y(M).toastTitle) }, {
								default: r(() => [E(b(t.title), 1)]),
								_: 2
							}, 1032, ["class"]),
							t.description ? (c(), _(y(pe), {
								key: 1,
								class: m(y(M).toastDescription)
							}, {
								default: r(() => [E(b(t.description), 1)]),
								_: 2
							}, 1032, ["class"])) : g("", !0),
							O(y(fe), {
								class: m(["tc-interactive", y(M).toastClose]),
								"aria-label": e.closeLabel
							}, {
								default: r(() => [O(A, {
									icon: y(N),
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
