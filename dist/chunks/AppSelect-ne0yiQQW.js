import { A as e, B as t, E as n, G as r, I as i, J as a, K as o, N as s, P as c, R as l, S as u, _ as d, _t as f, b as p, d as m, f as h, ft as g, g as _, gt as v, h as y, ht as b, it as x, k as S, l as C, lt as w, m as T, mt as E, v as D, w as O, y as k, z as A } from "./vue-i18n-BQWz_HuU.js";
import { n as j } from "./portal_keys-DthxrmWp.js";
import { n as M, t as N } from "./AppIcon-B1iv8vRB.js";
import { r as P } from "./StateSurface-Dxa4U6G6.js";
import { t as F } from "./components_styles-Cab5IILs.js";
import { i as I, o as ee, r as te, t as L } from "./_prop_utils-BQHilWOI.js";
import { D as ne, M as re, N as R, P as z, S as B, a as ie, d as ae, f as V, g as oe, j as H, l as se, m as ce, n as le, s as U, t as ue, u as W, v as de, x as fe } from "./Teleport-B2amidH8.js";
import { a as pe, c as me, i as he, n as ge, o as _e, r as ve, s as G } from "./AppTooltip-DuggrS-8.js";
import { t as ye } from "./useFocusGuards-OHZKmDOB.js";
import { n as K, s as q } from "./IconButton-DbYdD8bu.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/chevron-down.js
var J = M("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function Y(e) {
	let t = ne("", 1e3);
	return {
		search: t,
		handleTypeaheadSearch: (n, r) => {
			if (t.value += n, e) e(n);
			else {
				let e = R(), n = r.map((e) => ({
					...e,
					textValue: e.value?.textValue ?? e.ref.textContent?.trim() ?? ""
				})), i = n.find((t) => t.ref === e), a = xe(n.map((e) => e.textValue), t.value, i?.textValue), o = n.find((e) => e.textValue === a);
				return o && o.ref.focus(), o?.ref;
			}
		},
		resetTypeahead: () => {
			t.value = "";
		}
	};
}
function be(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function xe(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = be(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function Se(e) {
	let t = oe({ nonce: x() });
	return T(() => e?.value || t.nonce?.value);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/utils.js
var Ce = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], we = [" ", "Enter"];
function X(e, t, n) {
	return e === void 0 ? !1 : Array.isArray(e) ? e.some((e) => Z(e, t, n)) : Z(e, t, n);
}
function Z(e, t, n) {
	return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? e?.[n] === t?.[n] : ee(e, t);
}
function Te(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectRoot.js
var Ee = ["value"], [Q, De] = /*#__PURE__*/ z("SelectRoot"), Oe = /* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "SelectRoot",
	props: {
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: !1
		},
		defaultValue: {
			type: null,
			required: !1
		},
		modelValue: {
			type: null,
			required: !1,
			default: void 0
		},
		nullableValue: {
			type: String,
			required: !1,
			default: ""
		},
		by: {
			type: [String, Function],
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		multiple: {
			type: Boolean,
			required: !1
		},
		autocomplete: {
			type: String,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		}
	},
	emits: ["update:modelValue", "update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t, { required: o, disabled: s, multiple: c, dir: u } = w(n), f = B(n, "modelValue", r, {
			defaultValue: n.defaultValue ?? (c.value ? [] : void 0),
			passive: n.modelValue === void 0,
			deep: !0
		}), p = B(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), h = x(), v = x(), y = x({
			x: 0,
			y: 0
		}), b = T(() => c.value && Array.isArray(f.value) ? f.value?.length === 0 : H(f.value));
		K({ isProvider: !0 });
		let C = me(u), E = te(h), O = x(/* @__PURE__ */ new Set()), k = T(() => Array.from(O.value).map((e) => e.value).join(";"));
		function j(e) {
			if (c.value) {
				let t = Array.isArray(f.value) ? [...f.value] : [], r = t.findIndex((t) => Z(t, e, n.by));
				r === -1 ? t.push(e) : t.splice(r, 1), f.value = [...t];
			} else f.value = e;
		}
		function M(e) {
			return Array.from(O.value).find((t) => X(e, t.value, n.by));
		}
		return De({
			triggerElement: h,
			onTriggerChange: (e) => {
				h.value = e;
			},
			valueElement: v,
			onValueElementChange: (e) => {
				v.value = e;
			},
			contentId: "",
			modelValue: f,
			onValueChange: j,
			by: n.by,
			open: p,
			multiple: c,
			required: o,
			onOpenChange: (e) => {
				p.value = e;
			},
			dir: C,
			triggerPointerDownPosRef: y,
			disabled: s,
			isEmptyModelValue: b,
			optionsSet: O,
			onOptionAdd: (e) => {
				let t = M(e.value);
				t && O.value.delete(t), O.value.add(e);
			},
			onOptionRemove: (e) => {
				let t = M(e.value);
				t && O.value.delete(t);
			}
		}), (e, t) => (i(), _(g(he), null, {
			default: a(() => [A(e.$slots, "default", {
				modelValue: g(f),
				open: g(p)
			}), g(E) && e.name ? (i(), _(ke, {
				key: k.value,
				"aria-hidden": "true",
				tabindex: "-1",
				multiple: g(c),
				required: g(o),
				name: e.name,
				autocomplete: e.autocomplete,
				disabled: g(s),
				value: g(f)
			}, {
				default: a(() => [g(H)(g(f)) ? (i(), D("option", {
					key: 0,
					value: e.nullableValue
				}, null, 8, Ee)) : d("v-if", !0), (i(!0), D(m, null, l(Array.from(O.value), (e) => (i(), D("option", S({ key: e.value ?? "" }, { ref_for: !0 }, e), null, 16))), 128))]),
				_: 1
			}, 8, [
				"multiple",
				"required",
				"name",
				"autocomplete",
				"disabled",
				"value"
			])) : d("v-if", !0)]),
			_: 3
		}));
	}
}), ke = /* @__PURE__ */ u({
	__name: "BubbleSelect",
	props: {
		autocomplete: {
			type: String,
			required: !1
		},
		autofocus: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		form: {
			type: String,
			required: !1
		},
		multiple: {
			type: Boolean,
			required: !1
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		},
		size: {
			type: Number,
			required: !1
		},
		value: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let t = e, n = x(), o = Q();
		r(() => t.value, (e, t) => {
			let r = window.HTMLSelectElement.prototype, i = Object.getOwnPropertyDescriptor(r, "value").set;
			if (e !== t && i && n.value) {
				let t = new Event("change", { bubbles: !0 });
				i.call(n.value, e), n.value.dispatchEvent(t);
			}
		});
		function s(e) {
			o.onValueChange(e.target.value);
		}
		return (e, r) => (i(), _(g(pe), { "as-child": "" }, {
			default: a(() => [y("select", S({
				ref_key: "selectElement",
				ref: n
			}, t, { onInput: s }), [A(e.$slots, "default")], 16)]),
			_: 3
		}));
	}
}), Ae = /* @__PURE__ */ u({
	__name: "SelectPopperPosition",
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
			required: !1,
			default: "start"
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
			required: !1,
			default: 10
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
		}
	},
	setup(e) {
		let t = G(e);
		return (e, n) => (i(), _(g(ge), S(g(t), { style: {
			boxSizing: "border-box",
			"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-select-content-available-width": "var(--reka-popper-available-width)",
			"--reka-select-content-available-height": "var(--reka-popper-available-height)",
			"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
		} }), {
			default: a(() => [A(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), je = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
}, [$, Me] = /*#__PURE__*/ z("SelectContent"), Ne = /* @__PURE__ */ u({
	__name: "SelectContentImpl",
	props: {
		position: {
			type: String,
			required: !1,
			default: "item-aligned"
		},
		bodyLock: {
			type: Boolean,
			required: !1,
			default: !0
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
			required: !1,
			default: "start"
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
			required: !1,
			default: !0
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(e, { emit: n }) {
		let s = e, c = n, l = Q();
		ye(), ce(s.bodyLock);
		let { CollectionSlot: u, getItems: d } = K(), f = x();
		ae(f);
		let { search: m, handleTypeaheadSearch: h } = Y(), v = x(), y = x(), b = x(), w = x(!1), E = x(!1), D = x(!1);
		function O() {
			y.value && f.value && q([y.value, f.value]);
		}
		r(w, () => {
			O();
		});
		let { onOpenChange: k, triggerPointerDownPosRef: j } = l;
		o((e) => {
			if (!f.value) return;
			let t = {
				x: 0,
				y: 0
			}, n = (e) => {
				t = {
					x: Math.abs(Math.round(e.pageX) - (j.value?.x ?? 0)),
					y: Math.abs(Math.round(e.pageY) - (j.value?.y ?? 0))
				};
			}, r = (e) => {
				e.pointerType !== "touch" && (t.x <= 10 && t.y <= 10 ? e.preventDefault() : f.value?.contains(e.target) || k(!1), document.removeEventListener("pointermove", n), j.value = null);
			};
			j.value !== null && (document.addEventListener("pointermove", n), document.addEventListener("pointerup", r, {
				capture: !0,
				once: !0
			})), e(() => {
				document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", r, { capture: !0 });
			});
		});
		function M(e) {
			let t = e.ctrlKey || e.altKey || e.metaKey;
			if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && h(e.key, d()), [
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(e.key)) {
				let t = [...d().map((e) => e.ref)];
				if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
					let n = e.target, r = t.indexOf(n);
					t = t.slice(r + 1);
				}
				setTimeout(() => q(t)), e.preventDefault();
			}
		}
		let N = T(() => s.position === "popper" ? s : {}), P = G(N.value);
		return Me({
			content: f,
			viewport: v,
			onViewportChange: (e) => {
				v.value = e;
			},
			itemRefCallback: (e, t, n) => {
				let r = !E.value && !n, i = X(l.modelValue.value, t, l.by);
				if (l.multiple.value) {
					if (D.value) return;
					(i || r) && (y.value = e, i && (D.value = !0));
				} else (i || r) && (y.value = e);
				r && (E.value = !0);
			},
			selectedItem: y,
			selectedItemText: b,
			onItemLeave: () => {
				f.value?.focus();
			},
			itemTextRefCallback: (e, t, n) => {
				let r = !E.value && !n;
				(X(l.modelValue.value, t, l.by) || r) && (b.value = e);
			},
			focusSelectedItem: O,
			position: s.position,
			isPositioned: w,
			searchRef: m
		}), (e, n) => (i(), _(g(u), null, {
			default: a(() => [p(g(le), {
				"as-child": "",
				onMountAutoFocus: n[6] ||= C(() => {}, ["prevent"]),
				onUnmountAutoFocus: n[7] ||= (e) => {
					c("closeAutoFocus", e), !e.defaultPrevented && (g(l).triggerElement.value?.focus({ preventScroll: !0 }), e.preventDefault());
				}
			}, {
				default: a(() => [p(g(ie), {
					"as-child": "",
					"disable-outside-pointer-events": e.disableOutsidePointerEvents,
					onFocusOutside: n[2] ||= C(() => {}, ["prevent"]),
					onDismiss: n[3] ||= (e) => g(l).onOpenChange(!1),
					onEscapeKeyDown: n[4] ||= (e) => c("escapeKeyDown", e),
					onPointerDownOutside: n[5] ||= (e) => c("pointerDownOutside", e)
				}, {
					default: a(() => [(i(), _(t(e.position === "popper" ? Ae : Ie), S({
						...e.$attrs,
						...g(P)
					}, {
						id: g(l).contentId,
						ref: (e) => {
							if (!e) return;
							let t = g(de)(e);
							t?.hasAttribute("data-reka-popper-content-wrapper") ? f.value = t.firstElementChild : f.value = t;
						},
						role: "listbox",
						"data-state": g(l).open.value ? "open" : "closed",
						dir: g(l).dir.value,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none"
						},
						onContextmenu: n[0] ||= C(() => {}, ["prevent"]),
						onPlaced: n[1] ||= (e) => w.value = !0,
						onKeydown: M
					}), {
						default: a(() => [A(e.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"data-state",
						"dir",
						"onKeydown"
					]))]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			})]),
			_: 3
		}));
	}
}), [Pe, Fe] = /*#__PURE__*/ z("SelectItemAlignedPosition"), Ie = /* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "SelectItemAlignedPosition",
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
	emits: ["placed"],
	setup(t, { emit: n }) {
		let r = t, o = n, { getItems: c } = K(), l = Q(), u = $(), d = x(!1), f = x(!0), m = x(), { forwardRef: h, currentElement: _ } = V(), { viewport: y, selectedItem: b, selectedItemText: C, focusSelectedItem: w } = u;
		function T() {
			if (l.triggerElement.value && l.valueElement.value && m.value && _.value && y?.value && b?.value && C?.value) {
				let e = l.triggerElement.value.getBoundingClientRect(), t = _.value.getBoundingClientRect(), n = l.valueElement.value.getBoundingClientRect(), r = C.value.getBoundingClientRect();
				if (l.dir.value !== "rtl") {
					let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = I(a, 10, Math.max(10, l - c));
					m.value.style.minWidth = `${s}px`, m.value.style.left = `${u}px`;
				} else {
					let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = I(a, 10, Math.max(10, l - c));
					m.value.style.minWidth = `${s}px`, m.value.style.right = `${u}px`;
				}
				let i = c().map((e) => e.ref), a = window.innerHeight - 20, s = y.value.scrollHeight, u = window.getComputedStyle(_.value), f = Number.parseInt(u.borderTopWidth, 10), p = Number.parseInt(u.paddingTop, 10), h = Number.parseInt(u.borderBottomWidth, 10), g = Number.parseInt(u.paddingBottom, 10), v = f + p + s + g + h, x = Math.min(b.value.offsetHeight * 5, v), S = window.getComputedStyle(y.value), w = Number.parseInt(S.paddingTop, 10), T = Number.parseInt(S.paddingBottom, 10), E = e.top + e.height / 2 - 10, D = a - E, O = b.value.offsetHeight / 2, k = b.value.offsetTop + O, A = f + p + k, j = v - A;
				if (A <= E) {
					let e = b.value === i.at(-1);
					m.value.style.bottom = "0px";
					let t = _.value.clientHeight - y.value.offsetTop - y.value.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + h);
					m.value.style.height = `${n}px`;
				} else {
					let e = b.value === i[0];
					m.value.style.top = "0px";
					let t = Math.max(E, f + y.value.offsetTop + (e ? w : 0) + O) + j;
					m.value.style.height = `${t}px`, y.value.scrollTop = A - E + y.value.offsetTop;
				}
				m.value.style.margin = "10px 0", m.value.style.minHeight = `${x}px`, m.value.style.maxHeight = `${a}px`, o("placed"), requestAnimationFrame(() => d.value = !0);
			}
		}
		let E = x("");
		s(async () => {
			await e(), T(), _.value && (E.value = window.getComputedStyle(_.value).zIndex);
		});
		function O(e) {
			e && f.value === !0 && (T(), w?.(), f.value = !1);
		}
		return fe(l.triggerElement, () => {
			T();
		}), Fe({
			contentWrapper: m,
			shouldExpandOnScrollRef: d,
			onScrollButtonChange: O
		}), (e, t) => (i(), D("div", {
			ref_key: "contentWrapperElement",
			ref: m,
			style: v({
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: E.value
			})
		}, [p(g(U), S({
			ref: g(h),
			style: {
				boxSizing: "border-box",
				maxHeight: "100%"
			}
		}, {
			...e.$attrs,
			...r
		}), {
			default: a(() => [A(e.$slots, "default")]),
			_: 3
		}, 16)], 4));
	}
}), Le = /* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return De(e.context), Me(je), (e, t) => A(e.$slots, "default");
	}
}), Re = { key: 1 }, ze = /* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "SelectContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		position: {
			type: String,
			required: !1
		},
		bodyLock: {
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
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(e, { emit: t }) {
		let n = e, o = _e(n, t), l = Q(), u = x();
		s(() => {
			u.value = new DocumentFragment();
		});
		let f = x(), m = T(() => n.forceMount || l.open.value), v = x(m.value), y;
		function S() {
			y &&= (clearTimeout(y), void 0);
		}
		return r(m, (e, t, n) => {
			S(), y = setTimeout(() => {
				v.value = m.value, y = void 0;
			}), n(S);
		}), c(S), (e, t) => m.value || v.value || f.value?.present ? (i(), _(g(se), {
			key: 0,
			ref_key: "presenceRef",
			ref: f,
			present: m.value
		}, {
			default: a(() => [p(Ne, b(O({
				...g(o),
				...e.$attrs
			})), {
				default: a(() => [A(e.$slots, "default")]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["present"])) : u.value ? (i(), D("div", Re, [(i(), _(h, { to: u.value }, [p(Le, { context: g(l) }, {
			default: a(() => [A(e.$slots, "default")]),
			_: 3
		}, 8, ["context"])], 8, ["to"]))])) : d("v-if", !0);
	}
}), Be = /* @__PURE__ */ u({
	__name: "SelectIcon",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		return (e, t) => (i(), _(g(U), {
			"aria-hidden": "true",
			as: e.as,
			"as-child": e.asChild
		}, {
			default: a(() => [A(e.$slots, "default", {}, () => [t[0] ||= k("▼")])]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), [Ve, He] = /*#__PURE__*/ z("SelectItem"), Ue = /* @__PURE__ */ u({
	__name: "SelectItem",
	props: {
		value: {
			type: null,
			required: !0
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		textValue: {
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
	emits: ["select"],
	setup(t, { emit: n }) {
		let r = t, o = n, { disabled: c } = w(r), l = Q(), u = $(), { forwardRef: d, currentElement: f } = V(), { CollectionItem: m } = K(), h = T(() => X(l.modelValue?.value, r.value, l.by)), v = x(!1), y = x(r.textValue ?? ""), b = W(void 0, "reka-select-item-text");
		async function S(e) {
			if (e.defaultPrevented) return;
			let t = {
				originalEvent: e,
				value: r.value
			};
			re("select.select", E, t);
		}
		async function E(t) {
			await e(), o("select", t), !t.defaultPrevented && (c.value || (l.onValueChange(r.value), l.multiple.value || l.onOpenChange(!1)));
		}
		async function D(t) {
			await e(), !t.defaultPrevented && (c.value ? u.onItemLeave?.() : t.currentTarget?.focus({ preventScroll: !0 }));
		}
		async function O(t) {
			await e(), !t.defaultPrevented && t.currentTarget === R() && u.onItemLeave?.();
		}
		async function k(t) {
			await e(), !t.defaultPrevented && (u.searchRef?.value === "" || t.key !== " ") && (we.includes(t.key) && S(t), t.key === " " && t.preventDefault());
		}
		if (r.value === "") throw Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		return s(() => {
			f.value && u.itemRefCallback(f.value, r.value, r.disabled);
		}), He({
			value: r.value,
			disabled: c,
			textId: b,
			isSelected: h,
			onItemTextChange: (e) => {
				y.value = ((y.value || e?.textContent) ?? "").trim();
			}
		}), (e, t) => (i(), _(g(m), { value: { textValue: y.value } }, {
			default: a(() => [p(g(U), {
				ref: g(d),
				role: "option",
				"aria-labelledby": g(b),
				"data-highlighted": v.value ? "" : void 0,
				"aria-selected": h.value,
				"data-state": h.value ? "checked" : "unchecked",
				"aria-disabled": g(c) || void 0,
				"data-disabled": g(c) ? "" : void 0,
				tabindex: g(c) ? void 0 : -1,
				as: e.as,
				"as-child": e.asChild,
				onFocus: t[0] ||= (e) => v.value = !0,
				onBlur: t[1] ||= (e) => v.value = !1,
				onPointerup: S,
				onPointerdown: t[2] ||= (e) => {
					e.currentTarget.focus({ preventScroll: !0 });
				},
				onTouchend: t[3] ||= C(() => {}, ["prevent", "stop"]),
				onPointermove: D,
				onPointerleave: O,
				onKeydown: k
			}, {
				default: a(() => [A(e.$slots, "default")]),
				_: 3
			}, 8, [
				"aria-labelledby",
				"data-highlighted",
				"aria-selected",
				"data-state",
				"aria-disabled",
				"data-disabled",
				"tabindex",
				"as",
				"as-child"
			])]),
			_: 3
		}, 8, ["value"]));
	}
}), We = /* @__PURE__ */ u({
	__name: "SelectItemIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		let t = e, n = Ve();
		return (e, r) => g(n).isSelected.value ? (i(), _(g(U), S({
			key: 0,
			"aria-hidden": "true"
		}, t), {
			default: a(() => [A(e.$slots, "default")]),
			_: 3
		}, 16)) : d("v-if", !0);
	}
}), Ge = /* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "SelectItemText",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		let t = e, n = Q(), r = $(), o = Ve(), { forwardRef: l, currentElement: u } = V(), d = T(() => ({
			value: o.value,
			disabled: o.disabled.value,
			textContent: u.value?.textContent ?? o.value?.toString() ?? ""
		}));
		return s(() => {
			u.value && (o.onItemTextChange(u.value), r.itemTextRefCallback(u.value, o.value, o.disabled.value), n.onOptionAdd(d.value));
		}), c(() => {
			n.onOptionRemove(d.value);
		}), (e, n) => (i(), _(g(U), S({
			id: g(o).textId,
			ref: g(l)
		}, {
			...t,
			...e.$attrs
		}), {
			default: a(() => [A(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Ke = /* @__PURE__ */ u({
	__name: "SelectPortal",
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
		return (e, n) => (i(), _(g(ue), b(O(t)), {
			default: a(() => [A(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), qe = /* @__PURE__ */ u({
	__name: "SelectTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
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
		let t = e, n = Q(), { forwardRef: r, currentElement: o } = V(), c = T(() => n.disabled?.value || t.disabled);
		n.contentId ||= W(void 0, "reka-select-content"), s(() => {
			n.onTriggerChange(o.value);
		});
		let { getItems: l } = K(), { search: u, handleTypeaheadSearch: d, resetTypeahead: f } = Y();
		function m() {
			c.value || (n.onOpenChange(!0), f());
		}
		function h(e) {
			m(), n.triggerPointerDownPosRef.value = {
				x: Math.round(e.pageX),
				y: Math.round(e.pageY)
			};
		}
		function v(e) {
			return e.button === 0 && e.ctrlKey === !1;
		}
		let y = !1;
		function b(e) {
			if (e.pointerType === "touch") return e.preventDefault();
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), v(e) && (h(e), y = !0);
		}
		function x(e) {
			v(e) && e.preventDefault();
		}
		function S(e) {
			y || e.currentTarget?.focus(), y = !1;
		}
		return (e, t) => (i(), _(g(ve), {
			"as-child": "",
			reference: e.reference
		}, {
			default: a(() => [p(g(U), {
				ref: g(r),
				role: "combobox",
				type: e.as === "button" ? "button" : void 0,
				"aria-controls": g(n).contentId,
				"aria-expanded": g(n).open.value || !1,
				"aria-required": g(n).required?.value,
				"aria-autocomplete": "none",
				disabled: c.value,
				dir: g(n)?.dir.value,
				"data-state": g(n)?.open.value ? "open" : "closed",
				"data-disabled": c.value ? "" : void 0,
				"data-placeholder": g(Te)(g(n).modelValue?.value) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				onClick: S,
				onPointerdown: b,
				onMousedown: x,
				onPointerup: t[0] ||= C((e) => {
					e.pointerType === "touch" && h(e);
				}, ["prevent"]),
				onKeydown: t[1] ||= (e) => {
					let t = g(u) !== "";
					!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && t && e.key === " " || (g(d)(e.key, g(l)()), g(Ce).includes(e.key) && (m(), e.preventDefault()));
				}
			}, {
				default: a(() => [A(e.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"aria-controls",
				"aria-expanded",
				"aria-required",
				"disabled",
				"dir",
				"data-state",
				"data-disabled",
				"data-placeholder",
				"as-child",
				"as"
			])]),
			_: 3
		}, 8, ["reference"]));
	}
}), Je = /* @__PURE__ */ u({
	__name: "SelectValue",
	props: {
		placeholder: {
			type: String,
			required: !1,
			default: ""
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		let t = e, { forwardRef: n, currentElement: r } = V(), o = Q();
		s(() => {
			o.valueElement = r;
		});
		let c = T(() => {
			let e = [], t = Array.from(o.optionsSet.value), n = (e) => t.find((t) => X(e, t.value, o.by));
			return e = Array.isArray(o.modelValue.value) ? o.modelValue.value.map((e) => n(e)?.textContent ?? "") : [n(o.modelValue.value)?.textContent ?? ""], e.filter(Boolean);
		}), l = T(() => c.value.length ? c.value.join(", ") : t.placeholder);
		return (e, r) => (i(), _(g(U), {
			ref: g(n),
			as: e.as,
			"as-child": e.asChild,
			style: { pointerEvents: "none" },
			"data-placeholder": c.value.length ? void 0 : t.placeholder
		}, {
			default: a(() => [A(e.$slots, "default", {
				selectedLabel: c.value,
				modelValue: g(o).modelValue.value
			}, () => [k(f(l.value), 1)])]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-placeholder"
		]));
	}
}), Ye = /* @__PURE__ */ u({
	__name: "SelectViewport",
	props: {
		nonce: {
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
		let t = e, { nonce: n } = w(t), r = Se(n), o = $(), c = o.position === "item-aligned" ? Pe() : void 0, { forwardRef: l, currentElement: u } = V();
		s(() => {
			o?.onViewportChange(u.value);
		});
		let d = x(0);
		function f(e) {
			let t = e.currentTarget, { shouldExpandOnScrollRef: n, contentWrapper: r } = c ?? {};
			if (n?.value && r?.value) {
				let e = Math.abs(d.value - t.scrollTop);
				if (e > 0) {
					let n = window.innerHeight - 20, i = Number.parseFloat(r.value.style.minHeight), a = Number.parseFloat(r.value.style.height), o = Math.max(i, a);
					if (o < n) {
						let i = o + e, a = Math.min(n, i), s = i - a;
						r.value.style.height = `${a}px`, r.value.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, r.value.style.justifyContent = "flex-end");
					}
				}
			}
			d.value = t.scrollTop;
		}
		return (e, n) => (i(), D(m, null, [p(g(U), S({
			ref: g(l),
			"data-reka-select-viewport": "",
			role: "presentation"
		}, {
			...e.$attrs,
			...t
		}, {
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto"
			},
			onScroll: f
		}), {
			default: a(() => [A(e.$slots, "default")]),
			_: 3
		}, 16), p(g(U), {
			as: "style",
			nonce: g(r)
		}, {
			default: a(() => n[0] ||= [k(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")]),
			_: 1,
			__: [0]
		}, 8, ["nonce"])], 64));
	}
}), Xe = /* @__PURE__ */ u({
	__name: "AppSelect",
	props: {
		modelValue: {},
		options: {},
		placeholder: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		id: { default: void 0 },
		describedBy: { default: void 0 },
		ariaLabel: { default: void 0 }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = e, o = t;
		function s(e) {
			o("update:modelValue", e);
		}
		let c = n(j, void 0), u = T(() => c ? { to: c } : {}), d = T(() => L({
			id: r.id,
			"aria-describedby": r.describedBy,
			"aria-label": r.ariaLabel
		})), h = T(() => L({ modelValue: r.modelValue }));
		return (t, n) => (i(), _(g(Oe), S(h.value, {
			disabled: e.disabled,
			"onUpdate:modelValue": s
		}), {
			default: a(() => [p(g(qe), S(d.value, { class: ["tc-interactive", g(F).selectTrigger] }), {
				default: a(() => [p(g(Je), {
					class: E(g(F).selectValue),
					placeholder: e.placeholder
				}, null, 8, ["class", "placeholder"]), p(g(Be), { "as-child": "" }, {
					default: a(() => [p(N, {
						icon: g(J),
						size: 16
					}, null, 8, ["icon"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["class"]), p(g(Ke), b(O(u.value)), {
				default: a(() => [p(g(ze), {
					class: E(g(F).selectContent),
					"side-offset": 4,
					position: "popper"
				}, {
					default: a(() => [p(g(Ye), { class: E(g(F).selectViewport) }, {
						default: a(() => [(i(!0), D(m, null, l(e.options, (e) => (i(), _(g(Ue), {
							key: e.value,
							class: E(g(F).selectItem),
							value: e.value
						}, {
							default: a(() => [p(g(Ge), { class: E(g(F).selectItemText) }, {
								default: a(() => [k(f(e.label), 1)]),
								_: 2
							}, 1032, ["class"]), p(g(We), { class: E(g(F).selectItemIndicator) }, {
								default: a(() => [p(N, {
									icon: g(P),
									size: 14
								}, null, 8, ["icon"])]),
								_: 1
							}, 8, ["class"])]),
							_: 2
						}, 1032, ["class", "value"]))), 128))]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 16, ["disabled"]));
	}
});
//#endregion
export { J as n, Xe as t };
