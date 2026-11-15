import { E as e, G as t, I as n, J as r, K as i, N as a, P as o, R as s, S as c, _ as l, _t as u, b as d, d as f, f as p, ft as m, g as h, gt as g, ht as _, it as v, k as y, l as b, lt as x, m as S, mt as C, nt as w, v as T, w as E, y as D, z as O } from "./vue-i18n-BQWz_HuU.js";
import { n as k } from "./portal_keys-DthxrmWp.js";
import { t as A } from "./AppIcon-B1iv8vRB.js";
import { r as j } from "./StateSurface-Dxa4U6G6.js";
import { t as M } from "./components_styles-Cab5IILs.js";
import { t as N } from "./x-CZeKQbKW.js";
import { N as P, P as F, S as I, _ as L, b as ee, f as R, i as z, k as B, l as V, o as H, r as U, s as W, t as te, v as G, w as K } from "./Teleport-B2amidH8.js";
import { a as q } from "./AppTooltip-DuggrS-8.js";
import { n as J } from "./IconButton-DbYdD8bu.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayerBranch.js
var ne = /* @__PURE__ */ c({
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
		let t = e, { forwardRef: i, currentElement: s } = R();
		return a(() => {
			H.branches.add(s.value);
		}), o(() => {
			H.branches.delete(s.value);
		}), (e, a) => (n(), h(m(W), y({ ref: m(i) }, t), {
			default: r(() => [O(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), re = /* @__PURE__ */ c({
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
		return (e, t) => (n(), h(m(W), {
			as: e.as,
			"as-child": e.asChild,
			"data-reka-toast-announce-exclude": "",
			"data-reka-toast-announce-alt": e.altText || void 0
		}, {
			default: r(() => [O(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-reka-toast-announce-alt"
		]));
	}
}), [Y, ie] = /*#__PURE__*/ F("ToastProvider"), ae = /* @__PURE__ */ c({
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
		let t = e, { label: n, duration: r, disableSwipe: i, swipeDirection: a, swipeThreshold: o } = x(t);
		J({ isProvider: !0 });
		let s = v(), c = v(0), l = v(!1), u = v(!1);
		if (t.label && typeof t.label == "string" && !t.label.trim()) throw Error("Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.");
		return ie({
			label: n,
			duration: r,
			disableSwipe: i,
			swipeDirection: a,
			swipeThreshold: o,
			toastCount: c,
			viewport: s,
			onViewportChange(e) {
				s.value = e;
			},
			onToastAdd() {
				c.value++;
			},
			onToastRemove() {
				c.value--;
			},
			isFocusedToastEscapeKeyDownRef: l,
			isClosePausedRef: u
		}), (e, t) => O(e.$slots, "default");
	}
}), oe = /* @__PURE__ */ c({
	__name: "ToastAnnounce",
	setup(e) {
		let t = Y(), i = B(1e3), a = v(!1), o = 0, s = 0;
		return K && (o = requestAnimationFrame(() => {
			s = requestAnimationFrame(() => {
				a.value = !0;
			});
		}), w(() => {
			cancelAnimationFrame(o), cancelAnimationFrame(s);
		})), (e, o) => m(i) || a.value ? (n(), h(m(q), {
			key: 0,
			feature: "fully-hidden"
		}, {
			default: r(() => [D(u(m(t).label.value) + " ", 1), O(e.$slots, "default")]),
			_: 3
		})) : l("v-if", !0);
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
var [le, ue] = /*#__PURE__*/ F("ToastRoot"), de = /* @__PURE__ */ c({
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
		let g = e, _ = c, { forwardRef: x, currentElement: C } = R(), { CollectionItem: w } = J(), E = Y(), k = v(null), A = v(null), j = S(() => typeof g.duration == "number" ? g.duration : E.duration.value), M = v(0), N = v(j.value), F = v(0), I = v(j.value), z = ee(() => {
			let e = Date.now() - M.value;
			I.value = Math.max(N.value - e, 0);
		}, { fpsLimit: 60 });
		function B(e) {
			e <= 0 || e === Infinity || K && (window.clearTimeout(F.value), M.value = Date.now(), F.value = window.setTimeout(V, e));
		}
		function V(e) {
			let t = e?.pointerType === "";
			C.value?.contains(P()) && t && E.viewport.value?.focus(), t && (E.isClosePausedRef.value = !1), _("close");
		}
		let H = S(() => C.value ? ce(C.value) : null);
		if (g.type && !["foreground", "background"].includes(g.type)) throw Error("Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.");
		return i((e) => {
			let t = E.viewport.value;
			if (t) {
				let e = () => {
					B(N.value), z.resume(), _("resume");
				}, n = () => {
					let e = Date.now() - M.value;
					N.value -= e, window.clearTimeout(F.value), z.pause(), _("pause");
				};
				return t.addEventListener(X, n), t.addEventListener(Z, e), () => {
					t.removeEventListener(X, n), t.removeEventListener(Z, e);
				};
			}
		}), t(() => [g.open, j.value], () => {
			N.value = j.value, g.open && !E.isClosePausedRef.value && B(j.value);
		}, { immediate: !0 }), L("Escape", (e) => {
			_("escapeKeyDown", e), e.defaultPrevented || (E.isFocusedToastEscapeKeyDownRef.value = !0, V());
		}), a(() => {
			E.onToastAdd();
		}), o(() => {
			E.onToastRemove();
		}), ue({ onClose: V }), (e, t) => (n(), T(f, null, [H.value ? (n(), h(oe, {
			key: 0,
			role: "alert",
			"aria-live": e.type === "foreground" ? "assertive" : "polite"
		}, {
			default: r(() => [l("\n      Render each chunk as its own text node so screen readers get the\n      natural pause break between nodes (see comment in utils.ts).\n      Interpolating the array directly with `{{ announceTextContent }}`\n      would route through Vue's `toDisplayString`, which JSON-stringifies\n      arrays — the live region would then announce literal `[`, quotes\n      and commas instead of the toast title and description.\n    "), (n(!0), T(f, null, s(H.value, (e, t) => (n(), T(f, { key: t }, [D(u(e), 1)], 64))), 128))]),
			_: 1
		}, 8, ["aria-live"])) : l("v-if", !0), m(E).viewport.value ? (n(), h(p, {
			key: 1,
			to: m(E).viewport.value
		}, [d(m(w), null, {
			default: r(() => [d(m(W), y({
				ref: m(x),
				tabindex: "0"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"data-state": e.open ? "open" : "closed",
				"data-swipe-direction": m(E).swipeDirection.value,
				style: m(E).disableSwipe.value ? void 0 : {
					userSelect: "none",
					touchAction: "none"
				},
				onPointerdown: t[0] ||= b((e) => {
					m(E).disableSwipe.value || (k.value = {
						x: e.clientX,
						y: e.clientY
					});
				}, ["left"]),
				onPointermove: t[1] ||= (e) => {
					if (m(E).disableSwipe.value || !k.value) return;
					let t = e.clientX - k.value.x, n = e.clientY - k.value.y, r = !!A.value, i = ["left", "right"].includes(m(E).swipeDirection.value), a = ["left", "up"].includes(m(E).swipeDirection.value) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
						x: o,
						y: s
					}, u = {
						originalEvent: e,
						delta: l
					};
					r ? (A.value = l, m(Q)(m("toast.swipeMove"), (e) => _("swipeMove", e), u)) : m($)(l, m(E).swipeDirection.value, c) ? (A.value = l, m(Q)(m("toast.swipeStart"), (e) => _("swipeStart", e), u), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (k.value = null);
				},
				onPointerup: t[2] ||= (e) => {
					if (m(E).disableSwipe.value) return;
					let t = A.value, n = e.target;
					if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), A.value = null, k.value = null, t) {
						let n = e.currentTarget, r = {
							originalEvent: e,
							delta: t
						};
						m($)(t, m(E).swipeDirection.value, m(E).swipeThreshold.value) ? m(Q)(m("toast.swipeEnd"), (e) => _("swipeEnd", e), r) : m(Q)(m("toast.swipeCancel"), (e) => _("swipeCancel", e), r), n?.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
					}
				}
			}), {
				default: r(() => [O(e.$slots, "default", {
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
		})], 8, ["to"])) : l("v-if", !0)], 64));
	}
}), fe = /* @__PURE__ */ c({
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
		return (e, o) => (n(), h(re, { "as-child": "" }, {
			default: r(() => [d(m(W), y(t, {
				ref: m(a),
				type: e.as === "button" ? "button" : void 0,
				onClick: m(i).onClose
			}), {
				default: r(() => [O(e.$slots, "default")]),
				_: 3
			}, 16, ["type", "onClick"])]),
			_: 3
		}));
	}
}), pe = /* @__PURE__ */ c({
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
		return R(), (e, i) => (n(), h(m(W), _(E(t)), {
			default: r(() => [O(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), me = /* @__PURE__ */ c({
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
		return (e, i) => (n(), h(m(te), _(E(t)), {
			default: r(() => [O(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), he = /* @__PURE__ */ c({
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
		let i = e, a = t, { forwardRef: o } = R(), s = I(i, "open", a, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
		});
		return (e, t) => (n(), h(m(V), { present: e.forceMount || m(s) }, {
			default: r(() => [d(de, y({
				ref: m(o),
				open: m(s),
				type: e.type,
				as: e.as,
				"as-child": e.asChild,
				duration: e.duration
			}, e.$attrs, {
				onClose: t[0] ||= (e) => s.value = !1,
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
						r.setAttribute("data-swipe", "end"), r.style.removeProperty("--reka-toast-swipe-move-x"), r.style.removeProperty("--reka-toast-swipe-move-y"), r.style.setProperty("--reka-toast-swipe-end-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-end-y", `${n}px`), s.value = !1;
					}
				}
			}), {
				default: r(({ remaining: t, duration: n }) => [O(e.$slots, "default", {
					remaining: t,
					duration: n,
					open: m(s)
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
}), ge = /* @__PURE__ */ c({
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
		return R(), (e, i) => (n(), h(m(W), _(E(t)), {
			default: r(() => [O(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), _e = /* @__PURE__ */ c({
	__name: "FocusProxy",
	emits: ["focusFromOutsideViewport"],
	setup(e, { emit: t }) {
		let i = t, a = Y();
		return (e, t) => (n(), h(m(q), {
			tabindex: "0",
			style: { position: "fixed" },
			onFocus: t[0] ||= (e) => {
				let t = e.relatedTarget;
				m(a).viewport.value?.contains(t) || i("focusFromOutsideViewport");
			}
		}, {
			default: r(() => [O(e.$slots, "default")]),
			_: 3
		}));
	}
}), ve = /* @__PURE__ */ c({
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
		let { hotkey: t, label: o } = x(e), { forwardRef: s, currentElement: c } = R(), { CollectionSlot: u, getItems: f } = J(), p = Y(), _ = S(() => p.toastCount.value > 0), b = v(), C = v(), w = /Key/g, T = /Digit/g, E = S(() => t.value.join("+").replace(w, "").replace(T, ""));
		L(t.value, () => {
			c.value.focus();
		}), a(() => {
			p.onViewportChange(c.value);
		}), i((e) => {
			let t = c.value;
			if (_.value && t) {
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
							b.value?.focus();
							return;
						}
						let i = D({ tabbingDirection: r ? "backwards" : "forwards" }), a = i.findIndex((e) => e === n);
						U(i.slice(a + 1)) ? e.preventDefault() : r ? b.value?.focus() : C.value?.focus();
					}
				};
				t.addEventListener("focusin", n), t.addEventListener("focusout", i), t.addEventListener("pointermove", n), t.addEventListener("pointerleave", a), t.addEventListener("keydown", o), window.addEventListener("blur", n), window.addEventListener("focus", r), e(() => {
					t.removeEventListener("focusin", n), t.removeEventListener("focusout", i), t.removeEventListener("pointermove", n), t.removeEventListener("pointerleave", a), t.removeEventListener("keydown", o), window.removeEventListener("blur", n), window.removeEventListener("focus", r);
				});
			}
		});
		function D({ tabbingDirection: e }) {
			let t = f().map((e) => e.ref).map((t) => {
				let n = [t, ...z(t)];
				return e === "forwards" ? n : n.reverse();
			});
			return (e === "forwards" ? t.reverse() : t).flat();
		}
		return (e, t) => (n(), h(m(ne), {
			role: "region",
			"aria-label": typeof m(o) == "string" ? m(o).replace("{hotkey}", E.value) : m(o)(E.value),
			tabindex: "-1",
			style: g({ pointerEvents: _.value ? void 0 : "none" })
		}, {
			default: r(() => [
				_.value ? (n(), h(_e, {
					key: 0,
					ref: (e) => {
						e && (b.value = m(G)(e));
					},
					onFocusFromOutsideViewport: t[0] ||= () => {
						let e = D({ tabbingDirection: "forwards" });
						m(U)(e);
					}
				}, null, 512)) : l("v-if", !0),
				d(m(u), null, {
					default: r(() => [d(m(W), y({
						ref: m(s),
						tabindex: "-1",
						as: e.as,
						"as-child": e.asChild
					}, e.$attrs), {
						default: r(() => [O(e.$slots, "default")]),
						_: 3
					}, 16, ["as", "as-child"])]),
					_: 3
				}),
				_.value ? (n(), h(_e, {
					key: 1,
					ref: (e) => {
						e && (C.value = m(G)(e));
					},
					onFocusFromOutsideViewport: t[1] ||= () => {
						let e = D({ tabbingDirection: "backwards" });
						m(U)(e);
					}
				}, null, 512)) : l("v-if", !0)
			]),
			_: 3
		}, 8, ["aria-label", "style"]));
	}
}), ye = 5e3, be = /* @__PURE__ */ c({
	__name: "ToastViewport",
	props: {
		toasts: {},
		viewportLabel: {},
		announceLabel: {},
		closeLabel: {}
	},
	emits: ["dismiss"],
	setup(t, { emit: i }) {
		let a = i;
		function o(e, t) {
			t || a("dismiss", e);
		}
		let c = {
			info: void 0,
			success: M.toastSuccess,
			error: M.toastError
		}, p = e(k, void 0), g = S(() => p ? { to: p } : {});
		return (e, i) => (n(), h(m(ae), {
			label: t.announceLabel,
			duration: ye
		}, {
			default: r(() => [d(m(me), _(E(g.value)), {
				default: r(() => [d(m(ve), {
					class: C(["tc-z-toast", m(M).toastViewport]),
					label: t.viewportLabel
				}, {
					default: r(() => [(n(!0), T(f, null, s(t.toasts, (e) => (n(), h(m(he), {
						key: e.id,
						class: C([m(M).toastRoot, c[e.variant ?? "info"]]),
						type: e.variant === "error" ? "foreground" : "background",
						open: !0,
						duration: e.duration ?? ye,
						"onUpdate:open": (t) => o(e.id, t)
					}, {
						default: r(() => [
							e.variant === "success" && !e.description ? (n(), h(A, {
								key: 0,
								icon: m(j),
								size: 16,
								class: C(m(M).toastIcon)
							}, null, 8, ["icon", "class"])) : l("", !0),
							d(m(ge), { class: C(m(M).toastTitle) }, {
								default: r(() => [D(u(e.title), 1)]),
								_: 2
							}, 1032, ["class"]),
							e.description ? (n(), h(m(pe), {
								key: 1,
								class: C(m(M).toastDescription)
							}, {
								default: r(() => [D(u(e.description), 1)]),
								_: 2
							}, 1032, ["class"])) : l("", !0),
							d(m(fe), {
								class: C(["tc-interactive", m(M).toastClose]),
								"aria-label": t.closeLabel
							}, {
								default: r(() => [d(A, {
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
