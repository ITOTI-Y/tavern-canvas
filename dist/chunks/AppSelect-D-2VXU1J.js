import { C as e, D as t, G as n, H as r, I as i, L as a, M as o, O as s, P as c, R as l, T as u, U as d, _ as f, c as p, d as m, dt as h, ft as g, g as _, h as v, j as y, lt as b, m as x, mt as S, ot as C, p as w, pt as T, tt as E, u as D, v as O, x as k, y as A } from "./vue-i18n-L-BrQRnK.js";
import { n as j } from "./portal_keys-DthxrmWp.js";
import { n as M, t as N } from "./AppIcon-DkyxvN8k.js";
import { r as P } from "./StateSurface-X9aRtXAT.js";
import { t as F } from "./components_styles-DHX8irr3.js";
import { a as ee, n as te, r as I, t as L } from "./_prop_utils-O1SzpV_h.js";
import { D as ne, M as re, N as R, P as z, S as B, a as ie, d as ae, f as V, g as oe, j as H, l as se, m as ce, n as le, s as U, t as ue, u as W, v as de, x as fe } from "./Teleport-CquQcgiX.js";
import { a as pe, c as me, i as he, o as ge, r as _e, s as G, t as ve } from "./PopperContent-BPSDCuaj.js";
import { t as ye } from "./useFocusGuards-CZE33dT6.js";
import { o as K, t as q } from "./Collection-e6mvGbNy.js";
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
	let t = oe({ nonce: E() });
	return w(() => e?.value || t.nonce?.value);
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
var Ee = ["value"], [Q, De] = /*#__PURE__*/ z("SelectRoot"), Oe = /* @__PURE__ */ k({
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
	setup(e, { emit: r }) {
		let o = e, s = r, { required: l, disabled: u, multiple: d, dir: p } = C(o), m = B(o, "modelValue", s, {
			defaultValue: o.defaultValue ?? (d.value ? [] : void 0),
			passive: o.modelValue === void 0,
			deep: !0
		}), h = B(o, "open", s, {
			defaultValue: o.defaultOpen,
			passive: o.open === void 0
		}), g = E(), y = E(), x = E({
			x: 0,
			y: 0
		}), S = w(() => d.value && Array.isArray(m.value) ? m.value?.length === 0 : H(m.value));
		q({ isProvider: !0 });
		let T = me(p), O = te(g), k = E(/* @__PURE__ */ new Set()), A = w(() => Array.from(k.value).map((e) => e.value).join(";"));
		function j(e) {
			if (d.value) {
				let t = Array.isArray(m.value) ? [...m.value] : [], n = t.findIndex((t) => Z(t, e, o.by));
				n === -1 ? t.push(e) : t.splice(n, 1), m.value = [...t];
			} else m.value = e;
		}
		function M(e) {
			return Array.from(k.value).find((t) => X(e, t.value, o.by));
		}
		return De({
			triggerElement: g,
			onTriggerChange: (e) => {
				g.value = e;
			},
			valueElement: y,
			onValueElementChange: (e) => {
				y.value = e;
			},
			contentId: "",
			modelValue: m,
			onValueChange: j,
			by: o.by,
			open: h,
			multiple: d,
			required: l,
			onOpenChange: (e) => {
				h.value = e;
			},
			dir: T,
			triggerPointerDownPosRef: x,
			disabled: u,
			isEmptyModelValue: S,
			optionsSet: k,
			onOptionAdd: (e) => {
				let t = M(e.value);
				t && k.value.delete(t), k.value.add(e);
			},
			onOptionRemove: (e) => {
				let t = M(e.value);
				t && k.value.delete(t);
			}
		}), (e, r) => (c(), v(b(he), null, {
			default: n(() => [a(e.$slots, "default", {
				modelValue: b(m),
				open: b(h)
			}), b(O) && e.name ? (c(), v(ke, {
				key: A.value,
				"aria-hidden": "true",
				tabindex: "-1",
				multiple: b(d),
				required: b(l),
				name: e.name,
				autocomplete: e.autocomplete,
				disabled: b(u),
				value: b(m)
			}, {
				default: n(() => [b(H)(b(m)) ? (c(), f("option", {
					key: 0,
					value: e.nullableValue
				}, null, 8, Ee)) : _("v-if", !0), (c(!0), f(D, null, i(Array.from(k.value), (e) => (c(), f("option", t({ key: e.value ?? "" }, { ref_for: !0 }, e), null, 16))), 128))]),
				_: 1
			}, 8, [
				"multiple",
				"required",
				"name",
				"autocomplete",
				"disabled",
				"value"
			])) : _("v-if", !0)]),
			_: 3
		}));
	}
}), ke = /* @__PURE__ */ k({
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
		let i = e, o = E(), s = Q();
		r(() => i.value, (e, t) => {
			let n = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(n, "value").set;
			if (e !== t && r && o.value) {
				let t = new Event("change", { bubbles: !0 });
				r.call(o.value, e), o.value.dispatchEvent(t);
			}
		});
		function l(e) {
			s.onValueChange(e.target.value);
		}
		return (e, r) => (c(), v(b(pe), { "as-child": "" }, {
			default: n(() => [x("select", t({
				ref_key: "selectElement",
				ref: o
			}, i, { onInput: l }), [a(e.$slots, "default")], 16)]),
			_: 3
		}));
	}
}), Ae = /* @__PURE__ */ k({
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
		let r = G(e);
		return (e, i) => (c(), v(b(ve), t(b(r), { style: {
			boxSizing: "border-box",
			"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-select-content-available-width": "var(--reka-popper-available-width)",
			"--reka-select-content-available-height": "var(--reka-popper-available-height)",
			"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
		} }), {
			default: n(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), je = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
}, [$, Me] = /*#__PURE__*/ z("SelectContent"), Ne = /* @__PURE__ */ k({
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
	setup(e, { emit: i }) {
		let o = e, s = i, u = Q();
		ye(), ce(o.bodyLock);
		let { CollectionSlot: f, getItems: m } = q(), h = E();
		ae(h);
		let { search: g, handleTypeaheadSearch: _ } = Y(), y = E(), x = E(), S = E(), C = E(!1), T = E(!1), D = E(!1);
		function O() {
			x.value && h.value && K([x.value, h.value]);
		}
		r(C, () => {
			O();
		});
		let { onOpenChange: k, triggerPointerDownPosRef: j } = u;
		d((e) => {
			if (!h.value) return;
			let t = {
				x: 0,
				y: 0
			}, n = (e) => {
				t = {
					x: Math.abs(Math.round(e.pageX) - (j.value?.x ?? 0)),
					y: Math.abs(Math.round(e.pageY) - (j.value?.y ?? 0))
				};
			}, r = (e) => {
				e.pointerType !== "touch" && (t.x <= 10 && t.y <= 10 ? e.preventDefault() : h.value?.contains(e.target) || k(!1), document.removeEventListener("pointermove", n), j.value = null);
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
			if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && _(e.key, m()), [
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(e.key)) {
				let t = [...m().map((e) => e.ref)];
				if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
					let n = e.target, r = t.indexOf(n);
					t = t.slice(r + 1);
				}
				setTimeout(() => K(t)), e.preventDefault();
			}
		}
		let N = w(() => o.position === "popper" ? o : {}), P = G(N.value);
		return Me({
			content: h,
			viewport: y,
			onViewportChange: (e) => {
				y.value = e;
			},
			itemRefCallback: (e, t, n) => {
				let r = !T.value && !n, i = X(u.modelValue.value, t, u.by);
				if (u.multiple.value) {
					if (D.value) return;
					(i || r) && (x.value = e, i && (D.value = !0));
				} else (i || r) && (x.value = e);
				r && (T.value = !0);
			},
			selectedItem: x,
			selectedItemText: S,
			onItemLeave: () => {
				h.value?.focus();
			},
			itemTextRefCallback: (e, t, n) => {
				let r = !T.value && !n;
				(X(u.modelValue.value, t, u.by) || r) && (S.value = e);
			},
			focusSelectedItem: O,
			position: o.position,
			isPositioned: C,
			searchRef: g
		}), (e, r) => (c(), v(b(f), null, {
			default: n(() => [A(b(le), {
				"as-child": "",
				onMountAutoFocus: r[6] ||= p(() => {}, ["prevent"]),
				onUnmountAutoFocus: r[7] ||= (e) => {
					s("closeAutoFocus", e), !e.defaultPrevented && (b(u).triggerElement.value?.focus({ preventScroll: !0 }), e.preventDefault());
				}
			}, {
				default: n(() => [A(b(ie), {
					"as-child": "",
					"disable-outside-pointer-events": e.disableOutsidePointerEvents,
					onFocusOutside: r[2] ||= p(() => {}, ["prevent"]),
					onDismiss: r[3] ||= (e) => b(u).onOpenChange(!1),
					onEscapeKeyDown: r[4] ||= (e) => s("escapeKeyDown", e),
					onPointerDownOutside: r[5] ||= (e) => s("pointerDownOutside", e)
				}, {
					default: n(() => [(c(), v(l(e.position === "popper" ? Ae : Ie), t({
						...e.$attrs,
						...b(P)
					}, {
						id: b(u).contentId,
						ref: (e) => {
							if (!e) return;
							let t = b(de)(e);
							t?.hasAttribute("data-reka-popper-content-wrapper") ? h.value = t.firstElementChild : h.value = t;
						},
						role: "listbox",
						"data-state": b(u).open.value ? "open" : "closed",
						dir: b(u).dir.value,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none"
						},
						onContextmenu: r[0] ||= p(() => {}, ["prevent"]),
						onPlaced: r[1] ||= (e) => C.value = !0,
						onKeydown: M
					}), {
						default: n(() => [a(e.$slots, "default")]),
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
}), [Pe, Fe] = /*#__PURE__*/ z("SelectItemAlignedPosition"), Ie = /* @__PURE__ */ k({
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
	setup(e, { emit: r }) {
		let i = e, o = r, { getItems: l } = q(), u = Q(), d = $(), p = E(!1), m = E(!0), h = E(), { forwardRef: g, currentElement: _ } = V(), { viewport: v, selectedItem: x, selectedItemText: S, focusSelectedItem: C } = d;
		function w() {
			if (u.triggerElement.value && u.valueElement.value && h.value && _.value && v?.value && x?.value && S?.value) {
				let e = u.triggerElement.value.getBoundingClientRect(), t = _.value.getBoundingClientRect(), n = u.valueElement.value.getBoundingClientRect(), r = S.value.getBoundingClientRect();
				if (u.dir.value !== "rtl") {
					let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = I(a, 10, Math.max(10, l - c));
					h.value.style.minWidth = `${s}px`, h.value.style.left = `${u}px`;
				} else {
					let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = I(a, 10, Math.max(10, l - c));
					h.value.style.minWidth = `${s}px`, h.value.style.right = `${u}px`;
				}
				let i = l().map((e) => e.ref), a = window.innerHeight - 20, s = v.value.scrollHeight, c = window.getComputedStyle(_.value), d = Number.parseInt(c.borderTopWidth, 10), f = Number.parseInt(c.paddingTop, 10), m = Number.parseInt(c.borderBottomWidth, 10), g = Number.parseInt(c.paddingBottom, 10), y = d + f + s + g + m, b = Math.min(x.value.offsetHeight * 5, y), C = window.getComputedStyle(v.value), w = Number.parseInt(C.paddingTop, 10), T = Number.parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - 10, D = a - E, O = x.value.offsetHeight / 2, k = x.value.offsetTop + O, A = d + f + k, j = y - A;
				if (A <= E) {
					let e = x.value === i.at(-1);
					h.value.style.bottom = "0px";
					let t = _.value.clientHeight - v.value.offsetTop - v.value.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + m);
					h.value.style.height = `${n}px`;
				} else {
					let e = x.value === i[0];
					h.value.style.top = "0px";
					let t = Math.max(E, d + v.value.offsetTop + (e ? w : 0) + O) + j;
					h.value.style.height = `${t}px`, v.value.scrollTop = A - E + v.value.offsetTop;
				}
				h.value.style.margin = "10px 0", h.value.style.minHeight = `${b}px`, h.value.style.maxHeight = `${a}px`, o("placed"), requestAnimationFrame(() => p.value = !0);
			}
		}
		let D = E("");
		y(async () => {
			await s(), w(), _.value && (D.value = window.getComputedStyle(_.value).zIndex);
		});
		function O(e) {
			e && m.value === !0 && (w(), C?.(), m.value = !1);
		}
		return fe(u.triggerElement, () => {
			w();
		}), Fe({
			contentWrapper: h,
			shouldExpandOnScrollRef: p,
			onScrollButtonChange: O
		}), (e, r) => (c(), f("div", {
			ref_key: "contentWrapperElement",
			ref: h,
			style: T({
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: D.value
			})
		}, [A(b(U), t({
			ref: b(g),
			style: {
				boxSizing: "border-box",
				maxHeight: "100%"
			}
		}, {
			...e.$attrs,
			...i
		}), {
			default: n(() => [a(e.$slots, "default")]),
			_: 3
		}, 16)], 4));
	}
}), Le = /* @__PURE__ */ k({
	inheritAttrs: !1,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return De(e.context), Me(je), (e, t) => a(e.$slots, "default");
	}
}), Re = { key: 1 }, ze = /* @__PURE__ */ k({
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
	setup(t, { emit: i }) {
		let s = t, l = ge(s, i), u = Q(), d = E();
		y(() => {
			d.value = new DocumentFragment();
		});
		let p = E(), h = w(() => s.forceMount || u.open.value), x = E(h.value), S;
		function C() {
			S &&= (clearTimeout(S), void 0);
		}
		return r(h, (e, t, n) => {
			C(), S = setTimeout(() => {
				x.value = h.value, S = void 0;
			}), n(C);
		}), o(C), (t, r) => h.value || x.value || p.value?.present ? (c(), v(b(se), {
			key: 0,
			ref_key: "presenceRef",
			ref: p,
			present: h.value
		}, {
			default: n(() => [A(Ne, g(e({
				...b(l),
				...t.$attrs
			})), {
				default: n(() => [a(t.$slots, "default")]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["present"])) : d.value ? (c(), f("div", Re, [(c(), v(m, { to: d.value }, [A(Le, { context: b(u) }, {
			default: n(() => [a(t.$slots, "default")]),
			_: 3
		}, 8, ["context"])], 8, ["to"]))])) : _("v-if", !0);
	}
}), Be = /* @__PURE__ */ k({
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
		return (e, t) => (c(), v(b(U), {
			"aria-hidden": "true",
			as: e.as,
			"as-child": e.asChild
		}, {
			default: n(() => [a(e.$slots, "default", {}, () => [t[0] ||= O("▼")])]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), [Ve, He] = /*#__PURE__*/ z("SelectItem"), Ue = /* @__PURE__ */ k({
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
	setup(e, { emit: t }) {
		let r = e, i = t, { disabled: o } = C(r), l = Q(), u = $(), { forwardRef: d, currentElement: f } = V(), { CollectionItem: m } = q(), h = w(() => X(l.modelValue?.value, r.value, l.by)), g = E(!1), _ = E(r.textValue ?? ""), x = W(void 0, "reka-select-item-text");
		async function S(e) {
			if (e.defaultPrevented) return;
			let t = {
				originalEvent: e,
				value: r.value
			};
			re("select.select", T, t);
		}
		async function T(e) {
			await s(), i("select", e), !e.defaultPrevented && (o.value || (l.onValueChange(r.value), l.multiple.value || l.onOpenChange(!1)));
		}
		async function D(e) {
			await s(), !e.defaultPrevented && (o.value ? u.onItemLeave?.() : e.currentTarget?.focus({ preventScroll: !0 }));
		}
		async function O(e) {
			await s(), !e.defaultPrevented && e.currentTarget === R() && u.onItemLeave?.();
		}
		async function k(e) {
			await s(), !e.defaultPrevented && (u.searchRef?.value === "" || e.key !== " ") && (we.includes(e.key) && S(e), e.key === " " && e.preventDefault());
		}
		if (r.value === "") throw Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		return y(() => {
			f.value && u.itemRefCallback(f.value, r.value, r.disabled);
		}), He({
			value: r.value,
			disabled: o,
			textId: x,
			isSelected: h,
			onItemTextChange: (e) => {
				_.value = ((_.value || e?.textContent) ?? "").trim();
			}
		}), (e, t) => (c(), v(b(m), { value: { textValue: _.value } }, {
			default: n(() => [A(b(U), {
				ref: b(d),
				role: "option",
				"aria-labelledby": b(x),
				"data-highlighted": g.value ? "" : void 0,
				"aria-selected": h.value,
				"data-state": h.value ? "checked" : "unchecked",
				"aria-disabled": b(o) || void 0,
				"data-disabled": b(o) ? "" : void 0,
				tabindex: b(o) ? void 0 : -1,
				as: e.as,
				"as-child": e.asChild,
				onFocus: t[0] ||= (e) => g.value = !0,
				onBlur: t[1] ||= (e) => g.value = !1,
				onPointerup: S,
				onPointerdown: t[2] ||= (e) => {
					e.currentTarget.focus({ preventScroll: !0 });
				},
				onTouchend: t[3] ||= p(() => {}, ["prevent", "stop"]),
				onPointermove: D,
				onPointerleave: O,
				onKeydown: k
			}, {
				default: n(() => [a(e.$slots, "default")]),
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
}), We = /* @__PURE__ */ k({
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
		let r = e, i = Ve();
		return (e, o) => b(i).isSelected.value ? (c(), v(b(U), t({
			key: 0,
			"aria-hidden": "true"
		}, r), {
			default: n(() => [a(e.$slots, "default")]),
			_: 3
		}, 16)) : _("v-if", !0);
	}
}), Ge = /* @__PURE__ */ k({
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
		let r = e, i = Q(), s = $(), l = Ve(), { forwardRef: u, currentElement: d } = V(), f = w(() => ({
			value: l.value,
			disabled: l.disabled.value,
			textContent: d.value?.textContent ?? l.value?.toString() ?? ""
		}));
		return y(() => {
			d.value && (l.onItemTextChange(d.value), s.itemTextRefCallback(d.value, l.value, l.disabled.value), i.onOptionAdd(f.value));
		}), o(() => {
			i.onOptionRemove(f.value);
		}), (e, i) => (c(), v(b(U), t({
			id: b(l).textId,
			ref: b(u)
		}, {
			...r,
			...e.$attrs
		}), {
			default: n(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Ke = /* @__PURE__ */ k({
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
	setup(t) {
		let r = t;
		return (t, i) => (c(), v(b(ue), g(e(r)), {
			default: n(() => [a(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), qe = /* @__PURE__ */ k({
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
		let t = e, r = Q(), { forwardRef: i, currentElement: o } = V(), s = w(() => r.disabled?.value || t.disabled);
		r.contentId ||= W(void 0, "reka-select-content"), y(() => {
			r.onTriggerChange(o.value);
		});
		let { getItems: l } = q(), { search: u, handleTypeaheadSearch: d, resetTypeahead: f } = Y();
		function m() {
			s.value || (r.onOpenChange(!0), f());
		}
		function h(e) {
			m(), r.triggerPointerDownPosRef.value = {
				x: Math.round(e.pageX),
				y: Math.round(e.pageY)
			};
		}
		function g(e) {
			return e.button === 0 && e.ctrlKey === !1;
		}
		let _ = !1;
		function x(e) {
			if (e.pointerType === "touch") return e.preventDefault();
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), g(e) && (h(e), _ = !0);
		}
		function S(e) {
			g(e) && e.preventDefault();
		}
		function C(e) {
			_ || e.currentTarget?.focus(), _ = !1;
		}
		return (e, t) => (c(), v(b(_e), {
			"as-child": "",
			reference: e.reference
		}, {
			default: n(() => [A(b(U), {
				ref: b(i),
				role: "combobox",
				type: e.as === "button" ? "button" : void 0,
				"aria-controls": b(r).contentId,
				"aria-expanded": b(r).open.value || !1,
				"aria-required": b(r).required?.value,
				"aria-autocomplete": "none",
				disabled: s.value,
				dir: b(r)?.dir.value,
				"data-state": b(r)?.open.value ? "open" : "closed",
				"data-disabled": s.value ? "" : void 0,
				"data-placeholder": b(Te)(b(r).modelValue?.value) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				onClick: C,
				onPointerdown: x,
				onMousedown: S,
				onPointerup: t[0] ||= p((e) => {
					e.pointerType === "touch" && h(e);
				}, ["prevent"]),
				onKeydown: t[1] ||= (e) => {
					let t = b(u) !== "";
					!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && t && e.key === " " || (b(d)(e.key, b(l)()), b(Ce).includes(e.key) && (m(), e.preventDefault()));
				}
			}, {
				default: n(() => [a(e.$slots, "default")]),
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
}), Je = /* @__PURE__ */ k({
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
		let t = e, { forwardRef: r, currentElement: i } = V(), o = Q();
		y(() => {
			o.valueElement = i;
		});
		let s = w(() => {
			let e = [], t = Array.from(o.optionsSet.value), n = (e) => t.find((t) => X(e, t.value, o.by));
			return e = Array.isArray(o.modelValue.value) ? o.modelValue.value.map((e) => n(e)?.textContent ?? "") : [n(o.modelValue.value)?.textContent ?? ""], e.filter(Boolean);
		}), l = w(() => s.value.length ? s.value.join(", ") : t.placeholder);
		return (e, i) => (c(), v(b(U), {
			ref: b(r),
			as: e.as,
			"as-child": e.asChild,
			style: { pointerEvents: "none" },
			"data-placeholder": s.value.length ? void 0 : t.placeholder
		}, {
			default: n(() => [a(e.$slots, "default", {
				selectedLabel: s.value,
				modelValue: b(o).modelValue.value
			}, () => [O(S(l.value), 1)])]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-placeholder"
		]));
	}
}), Ye = /* @__PURE__ */ k({
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
		let r = e, { nonce: i } = C(r), o = Se(i), s = $(), l = s.position === "item-aligned" ? Pe() : void 0, { forwardRef: u, currentElement: d } = V();
		y(() => {
			s?.onViewportChange(d.value);
		});
		let p = E(0);
		function m(e) {
			let t = e.currentTarget, { shouldExpandOnScrollRef: n, contentWrapper: r } = l ?? {};
			if (n?.value && r?.value) {
				let e = Math.abs(p.value - t.scrollTop);
				if (e > 0) {
					let n = window.innerHeight - 20, i = Number.parseFloat(r.value.style.minHeight), a = Number.parseFloat(r.value.style.height), o = Math.max(i, a);
					if (o < n) {
						let i = o + e, a = Math.min(n, i), s = i - a;
						r.value.style.height = `${a}px`, r.value.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, r.value.style.justifyContent = "flex-end");
					}
				}
			}
			p.value = t.scrollTop;
		}
		return (e, i) => (c(), f(D, null, [A(b(U), t({
			ref: b(u),
			"data-reka-select-viewport": "",
			role: "presentation"
		}, {
			...e.$attrs,
			...r
		}, {
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto"
			},
			onScroll: m
		}), {
			default: n(() => [a(e.$slots, "default")]),
			_: 3
		}, 16), A(b(U), {
			as: "style",
			nonce: b(o)
		}, {
			default: n(() => i[0] ||= [O(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")]),
			_: 1,
			__: [0]
		}, 8, ["nonce"])], 64));
	}
}), Xe = /* @__PURE__ */ k({
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
	setup(r, { emit: a }) {
		let o = r, s = a;
		function l(e) {
			s("update:modelValue", e);
		}
		let d = u(j, void 0), p = w(() => d ? { to: d } : {}), m = w(() => L({
			id: o.id,
			"aria-describedby": o.describedBy,
			"aria-label": o.ariaLabel
		})), _ = w(() => L({ modelValue: o.modelValue }));
		return (a, o) => (c(), v(b(Oe), t(_.value, {
			disabled: r.disabled,
			"onUpdate:modelValue": l
		}), {
			default: n(() => [A(b(qe), t(m.value, { class: ["tc-interactive", b(F).selectTrigger] }), {
				default: n(() => [A(b(Je), {
					class: h(b(F).selectValue),
					placeholder: r.placeholder
				}, null, 8, ["class", "placeholder"]), A(b(Be), { "as-child": "" }, {
					default: n(() => [A(N, {
						icon: b(J),
						size: 16
					}, null, 8, ["icon"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["class"]), A(b(Ke), g(e(p.value)), {
				default: n(() => [A(b(ze), {
					class: h(b(F).selectContent),
					"side-offset": 4,
					position: "popper"
				}, {
					default: n(() => [A(b(Ye), { class: h(b(F).selectViewport) }, {
						default: n(() => [(c(!0), f(D, null, i(r.options, (e) => (c(), v(b(Ue), {
							key: e.value,
							class: h(b(F).selectItem),
							value: e.value
						}, {
							default: n(() => [A(b(Ge), { class: h(b(F).selectItemText) }, {
								default: n(() => [O(S(e.label), 1)]),
								_: 2
							}, 1032, ["class"]), A(b(We), { class: h(b(F).selectItemIndicator) }, {
								default: n(() => [A(N, {
									icon: b(P),
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
