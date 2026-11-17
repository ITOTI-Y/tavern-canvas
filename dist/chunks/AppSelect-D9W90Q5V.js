import { C as e, F as t, G as n, L as r, M as i, N as a, O as o, R as s, T as c, W as l, _ as u, c as d, ct as f, d as p, dt as m, g as h, gt as g, h as _, ht as v, k as y, m as b, mt as x, p as S, pt as C, q as w, rt as T, u as E, v as D, x as O, y as k, z as A } from "./vue-i18n-XoxYzLIP.js";
import { r as j } from "./portal_keys-CIBE-_PC.js";
import { n as M, t as N } from "./AppIcon-DD754F_c.js";
import { r as P, t as F } from "./components_styles-CTlfgDU5.js";
import { i as I, o as ee, r as te, t as L } from "./_prop_utils-CvImpN6J.js";
import { D as ne, M as re, N as R, P as z, S as B, a as ie, d as ae, f as V, g as oe, j as se, l as ce, m as le, n as ue, s as H, t as de, u as U, v as fe, x as pe } from "./Teleport-zHbQRGnp.js";
import { a as me, c as he, i as ge, l as W, n as _e, o as G, r as ve, u as ye } from "./AppTooltip-D3BiEM01.js";
import { t as be } from "./useFocusGuards-71hS207-.js";
import { o as K } from "./IconButton-CgMe_yUU.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/chevron-down.js
var q = M("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function J(e) {
	let t = ne("", 1e3);
	return {
		search: t,
		handleTypeaheadSearch: (n, r) => {
			if (t.value += n, e) e(n);
			else {
				let e = R(), n = r.map((e) => ({
					...e,
					textValue: e.value?.textValue ?? e.ref.textContent?.trim() ?? ""
				})), i = n.find((t) => t.ref === e), a = Se(n.map((e) => e.textValue), t.value, i?.textValue), o = n.find((e) => e.textValue === a);
				return o && o.ref.focus(), o?.ref;
			}
		},
		resetTypeahead: () => {
			t.value = "";
		}
	};
}
function xe(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function Se(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = xe(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function Ce(e) {
	let t = oe({ nonce: T() });
	return S(() => e?.value || t.nonce?.value);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/utils.js
var we = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], Te = [" ", "Enter"];
function Y(e, t, n) {
	return e === void 0 ? !1 : Array.isArray(e) ? e.some((e) => X(e, t, n)) : X(e, t, n);
}
function X(e, t, n) {
	return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? e?.[n] === t?.[n] : ee(e, t);
}
function Ee(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectRoot.js
var De = ["value"], [Z, Q] = /*#__PURE__*/ z("SelectRoot"), Oe = /* @__PURE__ */ O({
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
	setup(e, { emit: n }) {
		let i = e, a = n, { required: c, disabled: l, multiple: d, dir: p } = f(i), g = B(i, "modelValue", a, {
			defaultValue: i.defaultValue ?? (d.value ? [] : void 0),
			passive: i.modelValue === void 0,
			deep: !0
		}), v = B(i, "open", a, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
		}), y = T(), b = T(), x = T({
			x: 0,
			y: 0
		}), C = S(() => d.value && Array.isArray(g.value) ? g.value?.length === 0 : se(g.value));
		G({ isProvider: !0 });
		let D = ye(p), O = te(y), k = T(/* @__PURE__ */ new Set()), A = S(() => Array.from(k.value).map((e) => e.value).join(";"));
		function j(e) {
			if (d.value) {
				let t = Array.isArray(g.value) ? [...g.value] : [], n = t.findIndex((t) => X(t, e, i.by));
				n === -1 ? t.push(e) : t.splice(n, 1), g.value = [...t];
			} else g.value = e;
		}
		function M(e) {
			return Array.from(k.value).find((t) => Y(e, t.value, i.by));
		}
		return Q({
			triggerElement: y,
			onTriggerChange: (e) => {
				y.value = e;
			},
			valueElement: b,
			onValueElementChange: (e) => {
				b.value = e;
			},
			contentId: "",
			modelValue: g,
			onValueChange: j,
			by: i.by,
			open: v,
			multiple: d,
			required: c,
			onOpenChange: (e) => {
				v.value = e;
			},
			dir: D,
			triggerPointerDownPosRef: x,
			disabled: l,
			isEmptyModelValue: C,
			optionsSet: k,
			onOptionAdd: (e) => {
				let t = M(e.value);
				t && k.value.delete(t), k.value.add(e);
			},
			onOptionRemove: (e) => {
				let t = M(e.value);
				t && k.value.delete(t);
			}
		}), (e, n) => (t(), _(m(ge), null, {
			default: w(() => [s(e.$slots, "default", {
				modelValue: m(g),
				open: m(v)
			}), m(O) && e.name ? (t(), _(ke, {
				key: A.value,
				"aria-hidden": "true",
				tabindex: "-1",
				multiple: m(d),
				required: m(c),
				name: e.name,
				autocomplete: e.autocomplete,
				disabled: m(l),
				value: m(g)
			}, {
				default: w(() => [m(se)(m(g)) ? (t(), u("option", {
					key: 0,
					value: e.nullableValue
				}, null, 8, De)) : h("v-if", !0), (t(!0), u(E, null, r(Array.from(k.value), (e) => (t(), u("option", o({ key: e.value ?? "" }, { ref_for: !0 }, e), null, 16))), 128))]),
				_: 1
			}, 8, [
				"multiple",
				"required",
				"name",
				"autocomplete",
				"disabled",
				"value"
			])) : h("v-if", !0)]),
			_: 3
		}));
	}
}), ke = /* @__PURE__ */ O({
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
		let n = e, r = T(), i = Z();
		l(() => n.value, (e, t) => {
			let n = window.HTMLSelectElement.prototype, i = Object.getOwnPropertyDescriptor(n, "value").set;
			if (e !== t && i && r.value) {
				let t = new Event("change", { bubbles: !0 });
				i.call(r.value, e), r.value.dispatchEvent(t);
			}
		});
		function a(e) {
			i.onValueChange(e.target.value);
		}
		return (e, i) => (t(), _(m(me), { "as-child": "" }, {
			default: w(() => [b("select", o({
				ref_key: "selectElement",
				ref: r
			}, n, { onInput: a }), [s(e.$slots, "default")], 16)]),
			_: 3
		}));
	}
}), Ae = /* @__PURE__ */ O({
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
		let n = W(e);
		return (e, r) => (t(), _(m(_e), o(m(n), { style: {
			boxSizing: "border-box",
			"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-select-content-available-width": "var(--reka-popper-available-width)",
			"--reka-select-content-available-height": "var(--reka-popper-available-height)",
			"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
		} }), {
			default: w(() => [s(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), je = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
}, [$, Me] = /*#__PURE__*/ z("SelectContent"), Ne = /* @__PURE__ */ O({
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
	setup(e, { emit: r }) {
		let i = e, a = r, c = Z();
		be(), le(i.bodyLock);
		let { CollectionSlot: u, getItems: f } = G(), p = T();
		ae(p);
		let { search: h, handleTypeaheadSearch: g } = J(), v = T(), y = T(), b = T(), x = T(!1), C = T(!1), E = T(!1);
		function D() {
			y.value && p.value && K([y.value, p.value]);
		}
		l(x, () => {
			D();
		});
		let { onOpenChange: O, triggerPointerDownPosRef: j } = c;
		n((e) => {
			if (!p.value) return;
			let t = {
				x: 0,
				y: 0
			}, n = (e) => {
				t = {
					x: Math.abs(Math.round(e.pageX) - (j.value?.x ?? 0)),
					y: Math.abs(Math.round(e.pageY) - (j.value?.y ?? 0))
				};
			}, r = (e) => {
				e.pointerType !== "touch" && (t.x <= 10 && t.y <= 10 ? e.preventDefault() : p.value?.contains(e.target) || O(!1), document.removeEventListener("pointermove", n), j.value = null);
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
			if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && g(e.key, f()), [
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(e.key)) {
				let t = [...f().map((e) => e.ref)];
				if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
					let n = e.target, r = t.indexOf(n);
					t = t.slice(r + 1);
				}
				setTimeout(() => K(t)), e.preventDefault();
			}
		}
		let N = S(() => i.position === "popper" ? i : {}), P = W(N.value);
		return Me({
			content: p,
			viewport: v,
			onViewportChange: (e) => {
				v.value = e;
			},
			itemRefCallback: (e, t, n) => {
				let r = !C.value && !n, i = Y(c.modelValue.value, t, c.by);
				if (c.multiple.value) {
					if (E.value) return;
					(i || r) && (y.value = e, i && (E.value = !0));
				} else (i || r) && (y.value = e);
				r && (C.value = !0);
			},
			selectedItem: y,
			selectedItemText: b,
			onItemLeave: () => {
				p.value?.focus();
			},
			itemTextRefCallback: (e, t, n) => {
				let r = !C.value && !n;
				(Y(c.modelValue.value, t, c.by) || r) && (b.value = e);
			},
			focusSelectedItem: D,
			position: i.position,
			isPositioned: x,
			searchRef: h
		}), (e, n) => (t(), _(m(u), null, {
			default: w(() => [k(m(ue), {
				"as-child": "",
				onMountAutoFocus: n[6] ||= d(() => {}, ["prevent"]),
				onUnmountAutoFocus: n[7] ||= (e) => {
					a("closeAutoFocus", e), !e.defaultPrevented && (m(c).triggerElement.value?.focus({ preventScroll: !0 }), e.preventDefault());
				}
			}, {
				default: w(() => [k(m(ie), {
					"as-child": "",
					"disable-outside-pointer-events": e.disableOutsidePointerEvents,
					onFocusOutside: n[2] ||= d(() => {}, ["prevent"]),
					onDismiss: n[3] ||= (e) => m(c).onOpenChange(!1),
					onEscapeKeyDown: n[4] ||= (e) => a("escapeKeyDown", e),
					onPointerDownOutside: n[5] ||= (e) => a("pointerDownOutside", e)
				}, {
					default: w(() => [(t(), _(A(e.position === "popper" ? Ae : Ie), o({
						...e.$attrs,
						...m(P)
					}, {
						id: m(c).contentId,
						ref: (e) => {
							if (!e) return;
							let t = m(fe)(e);
							t?.hasAttribute("data-reka-popper-content-wrapper") ? p.value = t.firstElementChild : p.value = t;
						},
						role: "listbox",
						"data-state": m(c).open.value ? "open" : "closed",
						dir: m(c).dir.value,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none"
						},
						onContextmenu: n[0] ||= d(() => {}, ["prevent"]),
						onPlaced: n[1] ||= (e) => x.value = !0,
						onKeydown: M
					}), {
						default: w(() => [s(e.$slots, "default")]),
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
}), [Pe, Fe] = /*#__PURE__*/ z("SelectItemAlignedPosition"), Ie = /* @__PURE__ */ O({
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
	setup(e, { emit: n }) {
		let r = e, a = n, { getItems: c } = G(), l = Z(), d = $(), f = T(!1), p = T(!0), h = T(), { forwardRef: g, currentElement: _ } = V(), { viewport: b, selectedItem: x, selectedItemText: S, focusSelectedItem: C } = d;
		function E() {
			if (l.triggerElement.value && l.valueElement.value && h.value && _.value && b?.value && x?.value && S?.value) {
				let e = l.triggerElement.value.getBoundingClientRect(), t = _.value.getBoundingClientRect(), n = l.valueElement.value.getBoundingClientRect(), r = S.value.getBoundingClientRect();
				if (l.dir.value !== "rtl") {
					let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = I(a, 10, Math.max(10, l - c));
					h.value.style.minWidth = `${s}px`, h.value.style.left = `${u}px`;
				} else {
					let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = I(a, 10, Math.max(10, l - c));
					h.value.style.minWidth = `${s}px`, h.value.style.right = `${u}px`;
				}
				let i = c().map((e) => e.ref), o = window.innerHeight - 20, s = b.value.scrollHeight, u = window.getComputedStyle(_.value), d = Number.parseInt(u.borderTopWidth, 10), p = Number.parseInt(u.paddingTop, 10), m = Number.parseInt(u.borderBottomWidth, 10), g = Number.parseInt(u.paddingBottom, 10), v = d + p + s + g + m, y = Math.min(x.value.offsetHeight * 5, v), C = window.getComputedStyle(b.value), w = Number.parseInt(C.paddingTop, 10), T = Number.parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - 10, D = o - E, O = x.value.offsetHeight / 2, k = x.value.offsetTop + O, A = d + p + k, j = v - A;
				if (A <= E) {
					let e = x.value === i.at(-1);
					h.value.style.bottom = "0px";
					let t = _.value.clientHeight - b.value.offsetTop - b.value.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + m);
					h.value.style.height = `${n}px`;
				} else {
					let e = x.value === i[0];
					h.value.style.top = "0px";
					let t = Math.max(E, d + b.value.offsetTop + (e ? w : 0) + O) + j;
					h.value.style.height = `${t}px`, b.value.scrollTop = A - E + b.value.offsetTop;
				}
				h.value.style.margin = "10px 0", h.value.style.minHeight = `${y}px`, h.value.style.maxHeight = `${o}px`, a("placed"), requestAnimationFrame(() => f.value = !0);
			}
		}
		let D = T("");
		i(async () => {
			await y(), E(), _.value && (D.value = window.getComputedStyle(_.value).zIndex);
		});
		function O(e) {
			e && p.value === !0 && (E(), C?.(), p.value = !1);
		}
		return pe(l.triggerElement, () => {
			E();
		}), Fe({
			contentWrapper: h,
			shouldExpandOnScrollRef: f,
			onScrollButtonChange: O
		}), (e, n) => (t(), u("div", {
			ref_key: "contentWrapperElement",
			ref: h,
			style: v({
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: D.value
			})
		}, [k(m(H), o({
			ref: m(g),
			style: {
				boxSizing: "border-box",
				maxHeight: "100%"
			}
		}, {
			...e.$attrs,
			...r
		}), {
			default: w(() => [s(e.$slots, "default")]),
			_: 3
		}, 16)], 4));
	}
}), Le = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return Q(e.context), Me(je), (e, t) => s(e.$slots, "default");
	}
}), Re = { key: 1 }, ze = /* @__PURE__ */ O({
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
	setup(n, { emit: r }) {
		let o = n, c = he(o, r), d = Z(), f = T();
		i(() => {
			f.value = new DocumentFragment();
		});
		let g = T(), v = S(() => o.forceMount || d.open.value), y = T(v.value), b;
		function C() {
			b &&= (clearTimeout(b), void 0);
		}
		return l(v, (e, t, n) => {
			C(), b = setTimeout(() => {
				y.value = v.value, b = void 0;
			}), n(C);
		}), a(C), (n, r) => v.value || y.value || g.value?.present ? (t(), _(m(ce), {
			key: 0,
			ref_key: "presenceRef",
			ref: g,
			present: v.value
		}, {
			default: w(() => [k(Ne, x(e({
				...m(c),
				...n.$attrs
			})), {
				default: w(() => [s(n.$slots, "default")]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["present"])) : f.value ? (t(), u("div", Re, [(t(), _(p, { to: f.value }, [k(Le, { context: m(d) }, {
			default: w(() => [s(n.$slots, "default")]),
			_: 3
		}, 8, ["context"])], 8, ["to"]))])) : h("v-if", !0);
	}
}), Be = /* @__PURE__ */ O({
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
		return (e, n) => (t(), _(m(H), {
			"aria-hidden": "true",
			as: e.as,
			"as-child": e.asChild
		}, {
			default: w(() => [s(e.$slots, "default", {}, () => [n[0] ||= D("▼")])]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), [Ve, He] = /*#__PURE__*/ z("SelectItem"), Ue = /* @__PURE__ */ O({
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
	setup(e, { emit: n }) {
		let r = e, a = n, { disabled: o } = f(r), c = Z(), l = $(), { forwardRef: u, currentElement: p } = V(), { CollectionItem: h } = G(), g = S(() => Y(c.modelValue?.value, r.value, c.by)), v = T(!1), b = T(r.textValue ?? ""), x = U(void 0, "reka-select-item-text");
		async function C(e) {
			if (e.defaultPrevented) return;
			let t = {
				originalEvent: e,
				value: r.value
			};
			re("select.select", E, t);
		}
		async function E(e) {
			await y(), a("select", e), !e.defaultPrevented && (o.value || (c.onValueChange(r.value), c.multiple.value || c.onOpenChange(!1)));
		}
		async function D(e) {
			await y(), !e.defaultPrevented && (o.value ? l.onItemLeave?.() : e.currentTarget?.focus({ preventScroll: !0 }));
		}
		async function O(e) {
			await y(), !e.defaultPrevented && e.currentTarget === R() && l.onItemLeave?.();
		}
		async function A(e) {
			await y(), !e.defaultPrevented && (l.searchRef?.value === "" || e.key !== " ") && (Te.includes(e.key) && C(e), e.key === " " && e.preventDefault());
		}
		if (r.value === "") throw Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		return i(() => {
			p.value && l.itemRefCallback(p.value, r.value, r.disabled);
		}), He({
			value: r.value,
			disabled: o,
			textId: x,
			isSelected: g,
			onItemTextChange: (e) => {
				b.value = ((b.value || e?.textContent) ?? "").trim();
			}
		}), (e, n) => (t(), _(m(h), { value: { textValue: b.value } }, {
			default: w(() => [k(m(H), {
				ref: m(u),
				role: "option",
				"aria-labelledby": m(x),
				"data-highlighted": v.value ? "" : void 0,
				"aria-selected": g.value,
				"data-state": g.value ? "checked" : "unchecked",
				"aria-disabled": m(o) || void 0,
				"data-disabled": m(o) ? "" : void 0,
				tabindex: m(o) ? void 0 : -1,
				as: e.as,
				"as-child": e.asChild,
				onFocus: n[0] ||= (e) => v.value = !0,
				onBlur: n[1] ||= (e) => v.value = !1,
				onPointerup: C,
				onPointerdown: n[2] ||= (e) => {
					e.currentTarget.focus({ preventScroll: !0 });
				},
				onTouchend: n[3] ||= d(() => {}, ["prevent", "stop"]),
				onPointermove: D,
				onPointerleave: O,
				onKeydown: A
			}, {
				default: w(() => [s(e.$slots, "default")]),
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
}), We = /* @__PURE__ */ O({
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
		let n = e, r = Ve();
		return (e, i) => m(r).isSelected.value ? (t(), _(m(H), o({
			key: 0,
			"aria-hidden": "true"
		}, n), {
			default: w(() => [s(e.$slots, "default")]),
			_: 3
		}, 16)) : h("v-if", !0);
	}
}), Ge = /* @__PURE__ */ O({
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
		let n = e, r = Z(), c = $(), l = Ve(), { forwardRef: u, currentElement: d } = V(), f = S(() => ({
			value: l.value,
			disabled: l.disabled.value,
			textContent: d.value?.textContent ?? l.value?.toString() ?? ""
		}));
		return i(() => {
			d.value && (l.onItemTextChange(d.value), c.itemTextRefCallback(d.value, l.value, l.disabled.value), r.onOptionAdd(f.value));
		}), a(() => {
			r.onOptionRemove(f.value);
		}), (e, r) => (t(), _(m(H), o({
			id: m(l).textId,
			ref: m(u)
		}, {
			...n,
			...e.$attrs
		}), {
			default: w(() => [s(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Ke = /* @__PURE__ */ O({
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
	setup(n) {
		let r = n;
		return (n, i) => (t(), _(m(de), x(e(r)), {
			default: w(() => [s(n.$slots, "default")]),
			_: 3
		}, 16));
	}
}), qe = /* @__PURE__ */ O({
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
		let n = e, r = Z(), { forwardRef: a, currentElement: o } = V(), c = S(() => r.disabled?.value || n.disabled);
		r.contentId ||= U(void 0, "reka-select-content"), i(() => {
			r.onTriggerChange(o.value);
		});
		let { getItems: l } = G(), { search: u, handleTypeaheadSearch: f, resetTypeahead: p } = J();
		function h() {
			c.value || (r.onOpenChange(!0), p());
		}
		function g(e) {
			h(), r.triggerPointerDownPosRef.value = {
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
			t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), v(e) && (g(e), y = !0);
		}
		function x(e) {
			v(e) && e.preventDefault();
		}
		function C(e) {
			y || e.currentTarget?.focus(), y = !1;
		}
		return (e, n) => (t(), _(m(ve), {
			"as-child": "",
			reference: e.reference
		}, {
			default: w(() => [k(m(H), {
				ref: m(a),
				role: "combobox",
				type: e.as === "button" ? "button" : void 0,
				"aria-controls": m(r).contentId,
				"aria-expanded": m(r).open.value || !1,
				"aria-required": m(r).required?.value,
				"aria-autocomplete": "none",
				disabled: c.value,
				dir: m(r)?.dir.value,
				"data-state": m(r)?.open.value ? "open" : "closed",
				"data-disabled": c.value ? "" : void 0,
				"data-placeholder": m(Ee)(m(r).modelValue?.value) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				onClick: C,
				onPointerdown: b,
				onMousedown: x,
				onPointerup: n[0] ||= d((e) => {
					e.pointerType === "touch" && g(e);
				}, ["prevent"]),
				onKeydown: n[1] ||= (e) => {
					let t = m(u) !== "";
					!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && t && e.key === " " || (m(f)(e.key, m(l)()), m(we).includes(e.key) && (h(), e.preventDefault()));
				}
			}, {
				default: w(() => [s(e.$slots, "default")]),
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
}), Je = /* @__PURE__ */ O({
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
		let n = e, { forwardRef: r, currentElement: a } = V(), o = Z();
		i(() => {
			o.valueElement = a;
		});
		let c = S(() => {
			let e = [], t = Array.from(o.optionsSet.value), n = (e) => t.find((t) => Y(e, t.value, o.by));
			return e = Array.isArray(o.modelValue.value) ? o.modelValue.value.map((e) => n(e)?.textContent ?? "") : [n(o.modelValue.value)?.textContent ?? ""], e.filter(Boolean);
		}), l = S(() => c.value.length ? c.value.join(", ") : n.placeholder);
		return (e, i) => (t(), _(m(H), {
			ref: m(r),
			as: e.as,
			"as-child": e.asChild,
			style: { pointerEvents: "none" },
			"data-placeholder": c.value.length ? void 0 : n.placeholder
		}, {
			default: w(() => [s(e.$slots, "default", {
				selectedLabel: c.value,
				modelValue: m(o).modelValue.value
			}, () => [D(g(l.value), 1)])]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-placeholder"
		]));
	}
}), Ye = /* @__PURE__ */ O({
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
		let n = e, { nonce: r } = f(n), a = Ce(r), c = $(), l = c.position === "item-aligned" ? Pe() : void 0, { forwardRef: d, currentElement: p } = V();
		i(() => {
			c?.onViewportChange(p.value);
		});
		let h = T(0);
		function g(e) {
			let t = e.currentTarget, { shouldExpandOnScrollRef: n, contentWrapper: r } = l ?? {};
			if (n?.value && r?.value) {
				let e = Math.abs(h.value - t.scrollTop);
				if (e > 0) {
					let n = window.innerHeight - 20, i = Number.parseFloat(r.value.style.minHeight), a = Number.parseFloat(r.value.style.height), o = Math.max(i, a);
					if (o < n) {
						let i = o + e, a = Math.min(n, i), s = i - a;
						r.value.style.height = `${a}px`, r.value.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, r.value.style.justifyContent = "flex-end");
					}
				}
			}
			h.value = t.scrollTop;
		}
		return (e, r) => (t(), u(E, null, [k(m(H), o({
			ref: m(d),
			"data-reka-select-viewport": "",
			role: "presentation"
		}, {
			...e.$attrs,
			...n
		}, {
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto"
			},
			onScroll: g
		}), {
			default: w(() => [s(e.$slots, "default")]),
			_: 3
		}, 16), k(m(H), {
			as: "style",
			nonce: m(a)
		}, {
			default: w(() => r[0] ||= [D(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")]),
			_: 1,
			__: [0]
		}, 8, ["nonce"])], 64));
	}
}), Xe = /* @__PURE__ */ O({
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
	setup(n, { emit: i }) {
		let a = n, s = i;
		function l(e) {
			s("update:modelValue", e);
		}
		let d = c(j, void 0), f = S(() => d ? { to: d } : {}), p = S(() => L({
			id: a.id,
			"aria-describedby": a.describedBy,
			"aria-label": a.ariaLabel
		})), h = S(() => L({ modelValue: a.modelValue }));
		return (i, a) => (t(), _(m(Oe), o(h.value, {
			disabled: n.disabled,
			"onUpdate:modelValue": l
		}), {
			default: w(() => [k(m(qe), o(p.value, { class: ["tc-interactive", m(F).selectTrigger] }), {
				default: w(() => [k(m(Je), {
					class: C(m(F).selectValue),
					placeholder: n.placeholder
				}, null, 8, ["class", "placeholder"]), k(m(Be), { "as-child": "" }, {
					default: w(() => [k(N, {
						icon: m(q),
						size: 16
					}, null, 8, ["icon"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["class"]), k(m(Ke), x(e(f.value)), {
				default: w(() => [k(m(ze), {
					class: C(m(F).selectContent),
					"side-offset": 4,
					position: "popper"
				}, {
					default: w(() => [k(m(Ye), { class: C(m(F).selectViewport) }, {
						default: w(() => [(t(!0), u(E, null, r(n.options, (e) => (t(), _(m(Ue), {
							key: e.value,
							class: C(m(F).selectItem),
							value: e.value
						}, {
							default: w(() => [k(m(Ge), { class: C(m(F).selectItemText) }, {
								default: w(() => [D(g(e.label), 1)]),
								_: 2
							}, 1032, ["class"]), k(m(We), { class: C(m(F).selectItemIndicator) }, {
								default: w(() => [k(N, {
									icon: m(P),
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
export { q as n, Xe as t };
