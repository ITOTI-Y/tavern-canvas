import { A as e, E as t, I as n, K as r, N as i, O as a, P as o, R as s, S as c, U as l, W as u, b as d, d as f, et as p, ft as m, g as h, ht as g, m as _, mt as v, n as y, nt as b, p as x, pt as S, st as C, t as w, ut as T, v as E, w as D, x as O, y as k, z as A } from "./AppIcon-BpY-A4VH.js";
import { r as j } from "./StateSurface-CNBIMTjV.js";
import { $ as M, B as N, C as P, F, I, Q as L, R as ee, U as R, Z as z, c as B, k as V, o as H, q as U, s as W, v as G, w as te, x as K, y as ne } from "./PopperContent-_OEj_1Tb.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayerBranch.js
var re = /* @__PURE__ */ D({
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
		let a = t, { forwardRef: s, currentElement: c } = V();
		return i(() => {
			K.branches.add(c.value);
		}), o(() => {
			K.branches.delete(c.value);
		}), (t, i) => (n(), E(T(P), e({ ref: T(s) }, a), {
			default: r(() => [A(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ie = /* @__PURE__ */ D({
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
		return (e, t) => (n(), E(T(P), {
			as: e.as,
			"as-child": e.asChild,
			"data-reka-toast-announce-exclude": "",
			"data-reka-toast-announce-alt": e.altText || void 0
		}, {
			default: r(() => [A(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-reka-toast-announce-alt"
		]));
	}
}), [q, ae] = /*#__PURE__*/ L("ToastProvider"), oe = /* @__PURE__ */ D({
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
		let t = e, { label: n, duration: r, disableSwipe: i, swipeDirection: a, swipeThreshold: o } = C(t);
		W({ isProvider: !0 });
		let s = b(), c = b(0), l = b(!1), u = b(!1);
		if (t.label && typeof t.label == "string" && !t.label.trim()) throw Error("Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.");
		return ae({
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
		}), (e, t) => A(e.$slots, "default");
	}
}), se = /* @__PURE__ */ D({
	__name: "ToastAnnounce",
	setup(e) {
		let t = q(), i = U(1e3), a = b(!1), o = 0, s = 0;
		return R && (o = requestAnimationFrame(() => {
			s = requestAnimationFrame(() => {
				a.value = !0;
			});
		}), p(() => {
			cancelAnimationFrame(o), cancelAnimationFrame(s);
		})), (e, o) => T(i) || a.value ? (n(), E(T(H), {
			key: 0,
			feature: "fully-hidden"
		}, {
			default: r(() => [O(g(T(t).label.value) + " ", 1), A(e.$slots, "default")]),
			_: 3
		})) : k("v-if", !0);
	}
}), J = "toast.viewportPause", Y = "toast.viewportResume";
function X(e, t, n) {
	let r = n.originalEvent.currentTarget, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
function Z(e, t, n = 0) {
	let r = Math.abs(e.x), i = Math.abs(e.y), a = r > i;
	return t === "left" || t === "right" ? a && r > n : !a && i > n;
}
function ce(e) {
	return e.nodeType === e.ELEMENT_NODE;
}
function Q(e) {
	let t = [];
	return Array.from(e.childNodes).forEach((e) => {
		if (e.nodeType === e.TEXT_NODE && e.textContent && t.push(e.textContent), ce(e)) {
			let n = e.ariaHidden || e.hidden || e.style.display === "none", r = e.dataset.rekaToastAnnounceExclude === "";
			if (!n) if (r) {
				let n = e.dataset.rekaToastAnnounceAlt;
				n && t.push(n);
			} else t.push(...Q(e));
		}
	}), t;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Toast/ToastRootImpl.js
var [le, ue] = /*#__PURE__*/ L("ToastRoot"), de = /* @__PURE__ */ D({
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
	setup(t, { emit: a }) {
		let p = t, m = a, { forwardRef: v, currentElement: y } = V(), { CollectionItem: S } = W(), C = q(), w = b(null), D = b(null), j = h(() => typeof p.duration == "number" ? p.duration : C.duration.value), M = b(0), N = b(j.value), I = b(0), L = b(j.value), B = ee(() => {
			let e = Date.now() - M.value;
			L.value = Math.max(N.value - e, 0);
		}, { fpsLimit: 60 });
		function H(e) {
			e <= 0 || e === Infinity || R && (window.clearTimeout(I.value), M.value = Date.now(), I.value = window.setTimeout(U, e));
		}
		function U(e) {
			let t = e?.pointerType === "";
			y.value?.contains(z()) && t && C.viewport.value?.focus(), t && (C.isClosePausedRef.value = !1), m("close");
		}
		let G = h(() => y.value ? Q(y.value) : null);
		if (p.type && !["foreground", "background"].includes(p.type)) throw Error("Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.");
		return u((e) => {
			let t = C.viewport.value;
			if (t) {
				let e = () => {
					H(N.value), B.resume(), m("resume");
				}, n = () => {
					let e = Date.now() - M.value;
					N.value -= e, window.clearTimeout(I.value), B.pause(), m("pause");
				};
				return t.addEventListener(J, n), t.addEventListener(Y, e), () => {
					t.removeEventListener(J, n), t.removeEventListener(Y, e);
				};
			}
		}), l(() => [p.open, j.value], () => {
			N.value = j.value, p.open && !C.isClosePausedRef.value && H(j.value);
		}, { immediate: !0 }), F("Escape", (e) => {
			m("escapeKeyDown", e), e.defaultPrevented || (C.isFocusedToastEscapeKeyDownRef.value = !0, U());
		}), i(() => {
			C.onToastAdd();
		}), o(() => {
			C.onToastRemove();
		}), ue({ onClose: U }), (t, i) => (n(), d(x, null, [G.value ? (n(), E(se, {
			key: 0,
			role: "alert",
			"aria-live": t.type === "foreground" ? "assertive" : "polite"
		}, {
			default: r(() => [k("\n      Render each chunk as its own text node so screen readers get the\n      natural pause break between nodes (see comment in utils.ts).\n      Interpolating the array directly with `{{ announceTextContent }}`\n      would route through Vue's `toDisplayString`, which JSON-stringifies\n      arrays — the live region would then announce literal `[`, quotes\n      and commas instead of the toast title and description.\n    "), (n(!0), d(x, null, s(G.value, (e, t) => (n(), d(x, { key: t }, [O(g(e), 1)], 64))), 128))]),
			_: 1
		}, 8, ["aria-live"])) : k("v-if", !0), T(C).viewport.value ? (n(), E(_, {
			key: 1,
			to: T(C).viewport.value
		}, [c(T(S), null, {
			default: r(() => [c(T(P), e({
				ref: T(v),
				tabindex: "0"
			}, t.$attrs, {
				as: t.as,
				"as-child": t.asChild,
				"data-state": t.open ? "open" : "closed",
				"data-swipe-direction": T(C).swipeDirection.value,
				style: T(C).disableSwipe.value ? void 0 : {
					userSelect: "none",
					touchAction: "none"
				},
				onPointerdown: i[0] ||= f((e) => {
					T(C).disableSwipe.value || (w.value = {
						x: e.clientX,
						y: e.clientY
					});
				}, ["left"]),
				onPointermove: i[1] ||= (e) => {
					if (T(C).disableSwipe.value || !w.value) return;
					let t = e.clientX - w.value.x, n = e.clientY - w.value.y, r = !!D.value, i = ["left", "right"].includes(T(C).swipeDirection.value), a = ["left", "up"].includes(T(C).swipeDirection.value) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
						x: o,
						y: s
					}, u = {
						originalEvent: e,
						delta: l
					};
					r ? (D.value = l, T(X)(T("toast.swipeMove"), (e) => m("swipeMove", e), u)) : T(Z)(l, T(C).swipeDirection.value, c) ? (D.value = l, T(X)(T("toast.swipeStart"), (e) => m("swipeStart", e), u), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (w.value = null);
				},
				onPointerup: i[2] ||= (e) => {
					if (T(C).disableSwipe.value) return;
					let t = D.value, n = e.target;
					if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), D.value = null, w.value = null, t) {
						let n = e.currentTarget, r = {
							originalEvent: e,
							delta: t
						};
						T(Z)(t, T(C).swipeDirection.value, T(C).swipeThreshold.value) ? T(X)(T("toast.swipeEnd"), (e) => m("swipeEnd", e), r) : T(X)(T("toast.swipeCancel"), (e) => m("swipeCancel", e), r), n?.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
					}
				}
			}), {
				default: r(() => [A(t.$slots, "default", {
					remaining: L.value,
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
		})], 8, ["to"])) : k("v-if", !0)], 64));
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
	setup(t) {
		let i = t, a = le(), { forwardRef: o } = V();
		return (t, s) => (n(), E(ie, { "as-child": "" }, {
			default: r(() => [c(T(P), e(i, {
				ref: T(o),
				type: t.as === "button" ? "button" : void 0,
				onClick: T(a).onClose
			}), {
				default: r(() => [A(t.$slots, "default")]),
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
		let i = e;
		return V(), (e, a) => (n(), E(T(P), S(t(i)), {
			default: r(() => [A(e.$slots, "default")]),
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
		let i = e;
		return (e, a) => (n(), E(T(B), S(t(i)), {
			default: r(() => [A(e.$slots, "default")]),
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
	setup(t, { emit: i }) {
		let a = t, o = i, { forwardRef: s } = V(), l = N(a, "open", o, {
			defaultValue: a.defaultOpen,
			passive: a.open === void 0
		});
		return (t, i) => (n(), E(T(te), { present: t.forceMount || T(l) }, {
			default: r(() => [c(de, e({
				ref: T(s),
				open: T(l),
				type: t.type,
				as: t.as,
				"as-child": t.asChild,
				duration: t.duration
			}, t.$attrs, {
				onClose: i[0] ||= (e) => l.value = !1,
				onPause: i[1] ||= (e) => o("pause"),
				onResume: i[2] ||= (e) => o("resume"),
				onEscapeKeyDown: i[3] ||= (e) => o("escapeKeyDown", e),
				onSwipeStart: i[4] ||= (e) => {
					o("swipeStart", e), e.defaultPrevented || e.currentTarget.setAttribute("data-swipe", "start");
				},
				onSwipeMove: i[5] ||= (e) => {
					if (o("swipeMove", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "move"), r.style.setProperty("--reka-toast-swipe-move-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-move-y", `${n}px`);
					}
				},
				onSwipeCancel: i[6] ||= (e) => {
					if (o("swipeCancel", e), !e.defaultPrevented) {
						let t = e.currentTarget;
						t.setAttribute("data-swipe", "cancel"), t.style.removeProperty("--reka-toast-swipe-move-x"), t.style.removeProperty("--reka-toast-swipe-move-y"), t.style.removeProperty("--reka-toast-swipe-end-x"), t.style.removeProperty("--reka-toast-swipe-end-y");
					}
				},
				onSwipeEnd: i[7] ||= (e) => {
					if (o("swipeEnd", e), !e.defaultPrevented) {
						let { x: t, y: n } = e.detail.delta, r = e.currentTarget;
						r.setAttribute("data-swipe", "end"), r.style.removeProperty("--reka-toast-swipe-move-x"), r.style.removeProperty("--reka-toast-swipe-move-y"), r.style.setProperty("--reka-toast-swipe-end-x", `${t}px`), r.style.setProperty("--reka-toast-swipe-end-y", `${n}px`), l.value = !1;
					}
				}
			}), {
				default: r(({ remaining: e, duration: n }) => [A(t.$slots, "default", {
					remaining: e,
					duration: n,
					open: T(l)
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
		let i = e;
		return V(), (e, a) => (n(), E(T(P), S(t(i)), {
			default: r(() => [A(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), $ = /* @__PURE__ */ D({
	__name: "FocusProxy",
	emits: ["focusFromOutsideViewport"],
	setup(e, { emit: t }) {
		let i = t, a = q();
		return (e, t) => (n(), E(T(H), {
			tabindex: "0",
			style: { position: "fixed" },
			onFocus: t[0] ||= (e) => {
				let t = e.relatedTarget;
				T(a).viewport.value?.contains(t) || i("focusFromOutsideViewport");
			}
		}, {
			default: r(() => [A(e.$slots, "default")]),
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
		let { hotkey: a, label: o } = C(t), { forwardRef: s, currentElement: l } = V(), { CollectionSlot: d, getItems: f } = W(), p = q(), m = h(() => p.toastCount.value > 0), g = b(), _ = b(), y = /Key/g, x = /Digit/g, S = h(() => a.value.join("+").replace(y, "").replace(x, ""));
		F(a.value, () => {
			l.value.focus();
		}), i(() => {
			p.onViewportChange(l.value);
		}), u((e) => {
			let t = l.value;
			if (m.value && t) {
				let n = () => {
					if (!p.isClosePausedRef.value) {
						let e = new CustomEvent(J);
						t.dispatchEvent(e), p.isClosePausedRef.value = !0;
					}
				}, r = () => {
					if (p.isClosePausedRef.value) {
						let e = new CustomEvent(Y);
						t.dispatchEvent(e), p.isClosePausedRef.value = !1;
					}
				}, i = (e) => {
					t.contains(e.relatedTarget) || r();
				}, a = () => {
					t.contains(z()) || r();
				}, o = (e) => {
					let n = e.altKey || e.ctrlKey || e.metaKey;
					if (e.key === "Tab" && !n) {
						let n = z(), r = e.shiftKey;
						if (e.target === t && r) {
							g.value?.focus();
							return;
						}
						let i = w({ tabbingDirection: r ? "backwards" : "forwards" }), a = i.findIndex((e) => e === n);
						G(i.slice(a + 1)) ? e.preventDefault() : r ? g.value?.focus() : _.value?.focus();
					}
				};
				t.addEventListener("focusin", n), t.addEventListener("focusout", i), t.addEventListener("pointermove", n), t.addEventListener("pointerleave", a), t.addEventListener("keydown", o), window.addEventListener("blur", n), window.addEventListener("focus", r), e(() => {
					t.removeEventListener("focusin", n), t.removeEventListener("focusout", i), t.removeEventListener("pointermove", n), t.removeEventListener("pointerleave", a), t.removeEventListener("keydown", o), window.removeEventListener("blur", n), window.removeEventListener("focus", r);
				});
			}
		});
		function w({ tabbingDirection: e }) {
			let t = f().map((e) => e.ref).map((t) => {
				let n = [t, ...ne(t)];
				return e === "forwards" ? n : n.reverse();
			});
			return (e === "forwards" ? t.reverse() : t).flat();
		}
		return (t, i) => (n(), E(T(re), {
			role: "region",
			"aria-label": typeof T(o) == "string" ? T(o).replace("{hotkey}", S.value) : T(o)(S.value),
			tabindex: "-1",
			style: v({ pointerEvents: m.value ? void 0 : "none" })
		}, {
			default: r(() => [
				m.value ? (n(), E($, {
					key: 0,
					ref: (e) => {
						e && (g.value = T(I)(e));
					},
					onFocusFromOutsideViewport: i[0] ||= () => {
						let e = w({ tabbingDirection: "forwards" });
						T(G)(e);
					}
				}, null, 512)) : k("v-if", !0),
				c(T(d), null, {
					default: r(() => [c(T(P), e({
						ref: T(s),
						tabindex: "-1",
						as: t.as,
						"as-child": t.asChild
					}, t.$attrs), {
						default: r(() => [A(t.$slots, "default")]),
						_: 3
					}, 16, ["as", "as-child"])]),
					_: 3
				}),
				m.value ? (n(), E($, {
					key: 1,
					ref: (e) => {
						e && (_.value = T(I)(e));
					},
					onFocusFromOutsideViewport: i[1] ||= () => {
						let e = w({ tabbingDirection: "backwards" });
						T(G)(e);
					}
				}, null, 512)) : k("v-if", !0)
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
	setup(e, { emit: i }) {
		let o = i;
		function l(e, t) {
			t || o("dismiss", e);
		}
		let u = {
			info: void 0,
			success: j.toastSuccess,
			error: j.toastError
		}, f = a(M, void 0), p = h(() => f ? { to: f } : {});
		return (i, a) => (n(), E(T(oe), {
			label: e.announceLabel,
			duration: 5e3
		}, {
			default: r(() => [c(T(me), S(t(p.value)), {
				default: r(() => [c(T(_e), {
					class: m(["tc-z-toast", T(j).toastViewport]),
					label: e.viewportLabel
				}, {
					default: r(() => [(n(!0), d(x, null, s(e.toasts, (t) => (n(), E(T(he), {
						key: t.id,
						class: m([T(j).toastRoot, u[t.variant ?? "info"]]),
						type: t.variant === "error" ? "foreground" : "background",
						open: !0,
						"onUpdate:open": (e) => l(t.id, e)
					}, {
						default: r(() => [
							c(T(ge), { class: m(T(j).toastTitle) }, {
								default: r(() => [O(g(t.title), 1)]),
								_: 2
							}, 1032, ["class"]),
							t.description ? (n(), E(T(pe), {
								key: 0,
								class: m(T(j).toastDescription)
							}, {
								default: r(() => [O(g(t.description), 1)]),
								_: 2
							}, 1032, ["class"])) : k("", !0),
							c(T(fe), {
								class: m(["tc-interactive", T(j).toastClose]),
								"aria-label": e.closeLabel
							}, {
								default: r(() => [c(w, {
									icon: T(y),
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

//# sourceMappingURL=ToastViewport-BSmx29WE.js.map