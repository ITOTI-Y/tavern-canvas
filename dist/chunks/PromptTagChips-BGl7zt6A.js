import { n as e, t } from "./prompt_tags-CAoIz8Hm.js";
import { A as n, C as r, D as i, F as a, I as o, L as s, N as c, T as l, W as u, _ as d, at as f, c as p, ct as m, dt as h, et as g, g as _, h as v, m as y, n as b, p as x, pt as S, u as C, ut as w, v as T, x as E, y as D } from "./vue-i18n-DUz2Gjn8.js";
import { n as O } from "./portal_keys-B9C82xtk.js";
import { t as k } from "./AppIcon-Cnhzrx9o.js";
import { t as A } from "./check-BhrVRbkS.js";
import { r as j } from "./StateSurface-C9BHPFzJ.js";
import { M, _ as N, c as P, i as F, n as I, o as ee, s as L, t as R, w as z } from "./Teleport-CZ6NJvBB.js";
import { a as B, i as V, t as H } from "./FocusScope-DyrFWv3K.js";
import { i as U, o as W, r as G, s as K, t as q } from "./PopperContent-8IQaFABb.js";
import { n as J } from "./AppSelect-DRHFSF1d.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverRoot.js
var [Y, X] = /*#__PURE__*/ M("PopoverRoot"), Z = /* @__PURE__ */ E({
	__name: "PopoverRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !1
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t, { modal: i } = f(n), a = N(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		return X({
			contentId: "",
			triggerId: "",
			modal: i,
			open: a,
			onOpenChange: (e) => {
				a.value = e;
			},
			onOpenToggle: () => {
				a.value = !a.value;
			},
			triggerElement: g(),
			hasCustomAnchor: g(!1)
		}), (e, t) => (c(), v(m(U), null, {
			default: u(() => [o(e.$slots, "default", {
				open: m(a),
				close: () => a.value = !1
			})]),
			_: 3
		}));
	}
}), Q = /* @__PURE__ */ E({
	__name: "PopoverContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
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
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = K(z(n, "trapFocus", "disableOutsidePointerEvents")), { forwardRef: s } = P(), l = Y();
		return J(), (e, t) => (c(), v(m(H), {
			"as-child": "",
			loop: "",
			trapped: e.trapFocus,
			onMountAutoFocus: t[5] ||= (e) => r("openAutoFocus", e),
			onUnmountAutoFocus: t[6] ||= (e) => r("closeAutoFocus", e)
		}, {
			default: u(() => [D(m(I), {
				"as-child": "",
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				onPointerDownOutside: t[0] ||= (e) => r("pointerDownOutside", e),
				onInteractOutside: t[1] ||= (e) => r("interactOutside", e),
				onEscapeKeyDown: t[2] ||= (e) => r("escapeKeyDown", e),
				onFocusOutside: t[3] ||= (e) => r("focusOutside", e),
				onDismiss: t[4] ||= (e) => m(l).onOpenChange(!1)
			}, {
				default: u(() => [D(m(q), i(m(a), {
					id: m(l).contentId,
					ref: m(s),
					"data-state": m(l).open.value ? "open" : "closed",
					"aria-labelledby": m(l).triggerId,
					style: {
						"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
						"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
						"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
					},
					role: "dialog"
				}), {
					default: u(() => [o(e.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"data-state",
					"aria-labelledby"
				])]),
				_: 3
			}, 8, ["disable-outside-pointer-events"])]),
			_: 3
		}, 8, ["trapped"]));
	}
}), te = /* @__PURE__ */ E({
	__name: "PopoverContentModal",
	props: {
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
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
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = Y(), s = g(!1);
		B(!0);
		let l = W(n, r), { forwardRef: d, currentElement: f } = P();
		return V(f), (e, t) => (c(), v(Q, i(m(l), {
			ref: m(d),
			"trap-focus": m(a).open.value,
			"disable-outside-pointer-events": "",
			onCloseAutoFocus: t[0] ||= p((e) => {
				r("closeAutoFocus", e), s.value || m(a).triggerElement.value?.focus();
			}, ["prevent"]),
			onPointerDownOutside: t[1] ||= (e) => {
				r("pointerDownOutside", e);
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, i = t.button === 2 || n;
				s.value = i;
			},
			onFocusOutside: t[2] ||= p(() => {}, ["prevent"])
		}), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus"]));
	}
}), ne = /* @__PURE__ */ E({
	__name: "PopoverContentNonModal",
	props: {
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
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
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = Y(), s = g(!1), l = g(!1), d = W(n, r);
		return (e, t) => (c(), v(Q, i(m(d), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: t[0] ||= (e) => {
				r("closeAutoFocus", e), e.defaultPrevented || (s.value || m(a).triggerElement.value?.focus(), e.preventDefault()), s.value = !1, l.value = !1;
			},
			onInteractOutside: t[1] ||= async (e) => {
				r("interactOutside", e), e.defaultPrevented || (s.value = !0, e.detail.originalEvent.type === "pointerdown" && (l.value = !0));
				let t = e.target;
				m(a).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && l.value && e.preventDefault();
			}
		}), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), re = /* @__PURE__ */ E({
	__name: "PopoverContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
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
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = Y(), s = W(n, r), { forwardRef: l } = P();
		return a.contentId ||= L(void 0, "reka-popover-content"), (e, t) => (c(), v(m(ee), { present: e.forceMount || m(a).open.value }, {
			default: u(() => [m(a).modal.value ? (c(), v(te, i({ key: 0 }, m(s), { ref: m(l) }), {
				default: u(() => [o(e.$slots, "default")]),
				_: 3
			}, 16)) : (c(), v(ne, i({ key: 1 }, m(s), { ref: m(l) }), {
				default: u(() => [o(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), ie = /* @__PURE__ */ E({
	__name: "PopoverPortal",
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
		return (e, n) => (c(), v(m(R), h(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ae = /* @__PURE__ */ E({
	__name: "PopoverTrigger",
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
		let t = e, r = Y(), { forwardRef: i, currentElement: a } = P();
		return r.triggerId ||= L(void 0, "reka-popover-trigger"), n(() => {
			r.triggerElement.value = a.value;
		}), (e, n) => (c(), v(s(m(r).hasCustomAnchor.value ? m(F) : m(G)), { "as-child": "" }, {
			default: u(() => [D(m(F), {
				id: m(r).triggerId,
				ref: m(i),
				type: e.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": m(r).open.value,
				"aria-controls": m(r).contentId,
				"data-state": m(r).open.value ? "open" : "closed",
				as: e.as,
				"as-child": t.asChild,
				onClick: m(r).onOpenToggle
			}, {
				default: u(() => [o(e.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"as",
				"as-child",
				"onClick"
			])]),
			_: 3
		}));
	}
}), oe = ["data-enabled"], $ = ["aria-pressed", "onClick"], se = ["aria-pressed", "aria-label"], ce = /* @__PURE__ */ E({
	__name: "PromptTagChip",
	props: {
		prefix: {},
		choice: {},
		presets: {},
		customGroupLabel: {},
		missingLabel: {},
		enableLabel: {},
		disableLabel: {}
	},
	emits: ["update:choice"],
	setup(e, { emit: t }) {
		let n = e, i = t, o = l(O, void 0), s = x(() => o ? { to: o } : {}), f = x(() => n.presets.find((e) => e.id === n.choice.preset_id)), p = x(() => {
			let e = f.value;
			return e === void 0 ? n.missingLabel : e.group === null ? e.label : `${e.label} · ${e.group}`;
		}), g = x(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of n.presets) {
				let r = t.group ?? n.customGroupLabel;
				e.set(r, [...e.get(r) ?? [], t]);
			}
			return [...e.entries()].map(([e, t]) => ({
				label: e,
				presets: t
			}));
		});
		function b(e) {
			i("update:choice", {
				enabled: !0,
				preset_id: e.id
			});
		}
		function E() {
			i("update:choice", {
				...n.choice,
				enabled: !n.choice.enabled
			});
		}
		return (t, n) => (c(), d("div", {
			class: w(m(j).promptTagChip),
			"data-enabled": e.choice.enabled ? "" : void 0
		}, [D(m(Z), null, {
			default: u(() => [D(m(ae), { class: w(["tc-interactive", m(j).promptTagTrigger]) }, {
				default: u(() => [T(S(e.prefix) + S(p.value), 1)]),
				_: 1
			}, 8, ["class"]), D(m(ie), h(r(s.value)), {
				default: u(() => [D(m(re), {
					class: w(m(j).promptTagContent),
					"side-offset": 4,
					align: "end",
					"data-testid": "prompt-tag-list"
				}, {
					default: u(() => [(c(!0), d(C, null, a(g.value, (t) => (c(), d("section", {
						key: t.label,
						class: w(m(j).promptTagGroup)
					}, [y("h4", { class: w(m(j).promptTagGroupTitle) }, S(t.label), 3), (c(!0), d(C, null, a(t.presets, (t) => (c(), d("button", {
						key: t.id,
						type: "button",
						class: w(["tc-interactive", m(j).promptTagOption]),
						"aria-pressed": t.id === e.choice.preset_id,
						onClick: (e) => b(t)
					}, [y("span", { class: w(m(j).promptTagOptionLabel) }, [T(S(t.label) + " ", 1), t.id === e.choice.preset_id ? (c(), v(k, {
						key: 0,
						icon: m(A),
						size: 14
					}, null, 8, ["icon"])) : _("", !0)], 2), y("span", { class: w([m(j).promptTagOptionText, t.kind === "undesired_content" && m(j).promptTagOptionTextClamped]) }, S(t.text), 3)], 10, $))), 128))], 2))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}), y("button", {
			type: "button",
			class: w(["tc-interactive", m(j).promptTagToggle]),
			"aria-pressed": e.choice.enabled,
			"aria-label": e.choice.enabled ? e.disableLabel : e.enableLabel,
			onClick: E
		}, [D(k, {
			icon: m(A),
			size: 14
		}, null, 8, ["icon"])], 10, se)], 10, oe));
	}
}), le = /* @__PURE__ */ E({
	__name: "PromptTagChips",
	props: {
		port: {},
		kind: {}
	},
	setup(n) {
		let r = n, { t: i } = b(), a = x(() => e(r.port.custom_presets).filter((e) => e.kind === r.kind)), o = x(() => r.port.profile === null ? null : t(r.port.profile));
		function s(e) {
			let t = r.port.profile;
			t !== null && o.value !== null && r.port.save(t.id, {
				...o.value,
				[r.kind]: e
			});
		}
		return (e, t) => o.value === null ? _("", !0) : (c(), v(ce, {
			key: 0,
			prefix: n.kind === "quality" ? m(i)("prompt_tags.quality_prefix") : m(i)("prompt_tags.undesired_prefix"),
			choice: o.value[n.kind],
			presets: a.value,
			"custom-group-label": m(i)("prompt_tags.custom_group"),
			"missing-label": m(i)("prompt_tags.missing"),
			"enable-label": m(i)("prompt_tags.enable"),
			"disable-label": m(i)("prompt_tags.disable"),
			"data-testid": `prompt-tag-chip-${n.kind}`,
			"onUpdate:choice": s
		}, null, 8, [
			"prefix",
			"choice",
			"presets",
			"custom-group-label",
			"missing-label",
			"enable-label",
			"disable-label",
			"data-testid"
		]));
	}
});
//#endregion
export { le as t };
