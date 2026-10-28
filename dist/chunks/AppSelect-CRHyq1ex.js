import { A as e, C as t, D as n, F as r, G as i, H as a, I as o, L as s, N as c, O as l, P as u, S as d, T as f, V as p, W as m, Z as h, _ as g, at as _, c as v, ct as y, d as b, dt as x, et as S, ft as C, g as w, h as T, j as E, m as D, o as O, ot as k, p as A, pt as j, u as M, ut as N, v as P, w as ee, x as F, y as I } from "./vue-i18n-DUz2Gjn8.js";
import { n as te } from "./portal_keys-B9C82xtk.js";
import { n as ne, t as L } from "./AppIcon-Cnhzrx9o.js";
import { t as re } from "./chevron-down-Tu_8qTxg.js";
import { n as ie } from "./deferred_stylesheets-BpS7LWkd.js";
import { A as ae, M as R, T as oe, _ as se, a as ce, c as z, d as le, g as ue, i as B, j as de, l as V, n as fe, o as H, p as U, s as W, t as pe, x as me } from "./Teleport-CZ6NJvBB.js";
import { a as he, i as ge, o as G, t as _e } from "./FocusScope-DyrFWv3K.js";
import { a as ve, c as ye, i as be, o as xe, r as Se, s as Ce, t as we } from "./PopperContent-8IQaFABb.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/check.js
var Te = ne("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), Ee = ne("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/shared/ohash.D__AXeF1.mjs
function De(e) {
	return typeof e == "string" ? `'${e}'` : new Oe().serialize(e);
}
var Oe = /*@__PURE__*/ function() {
	class e {
		#e = /* @__PURE__ */ new Map();
		compare(e, t) {
			let n = typeof e, r = typeof t;
			return n === "string" && r === "string" ? e.localeCompare(t) : n === "number" && r === "number" ? e - t : String.prototype.localeCompare.call(this.serialize(e, !0), this.serialize(t, !0));
		}
		serialize(e, t) {
			if (e === null) return "null";
			switch (typeof e) {
				case "string": return t ? e : `'${e}'`;
				case "bigint": return `${e}n`;
				case "object": return this.$object(e);
				case "function": return this.$function(e);
			}
			return String(e);
		}
		serializeObject(e) {
			let t = Object.prototype.toString.call(e);
			if (t !== "[object Object]") return this.serializeBuiltInType(t.length < 10 ? `unknown:${t}` : t.slice(8, -1), e);
			let n = e.constructor, r = n === Object || n === void 0 ? "" : n.name;
			if (r !== "" && globalThis[r] === n) return this.serializeBuiltInType(r, e);
			if (typeof e.toJSON == "function") {
				let t = e.toJSON();
				return r + (typeof t == "object" && t ? this.$object(t) : `(${this.serialize(t)})`);
			}
			return this.serializeObjectEntries(r, Object.entries(e));
		}
		serializeBuiltInType(e, t) {
			let n = this["$" + e];
			if (n) return n.call(this, t);
			if (typeof t?.entries == "function") return this.serializeObjectEntries(e, t.entries());
			throw Error(`Cannot serialize ${e}`);
		}
		serializeObjectEntries(e, t) {
			let n = Array.from(t).sort((e, t) => this.compare(e[0], t[0])), r = `${e}{`;
			for (let e = 0; e < n.length; e++) {
				let [t, i] = n[e];
				r += `${this.serialize(t, !0)}:${this.serialize(i)}`, e < n.length - 1 && (r += ",");
			}
			return r + "}";
		}
		$object(e) {
			let t = this.#e.get(e);
			return t === void 0 && (this.#e.set(e, `#${this.#e.size}`), t = this.serializeObject(e), this.#e.set(e, t)), t;
		}
		$function(e) {
			let t = Function.prototype.toString.call(e);
			return t.slice(-15) === "[native code] }" ? `${e.name || ""}()[native]` : `${e.name}(${e.length})${t.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(e) {
			let t = "[";
			for (let n = 0; n < e.length; n++) t += this.serialize(e[n]), n < e.length - 1 && (t += ",");
			return t + "]";
		}
		$Date(e) {
			try {
				return `Date(${e.toISOString()})`;
			} catch {
				return "Date(null)";
			}
		}
		$ArrayBuffer(e) {
			return `ArrayBuffer[${new Uint8Array(e).join(",")}]`;
		}
		$Set(e) {
			return `Set${this.$Array(Array.from(e).sort((e, t) => this.compare(e, t)))}`;
		}
		$Map(e) {
			return this.serializeObjectEntries("Map", e.entries());
		}
	}
	for (let t of [
		"Error",
		"RegExp",
		"URL"
	]) e.prototype["$" + t] = function(e) {
		return `${t}(${e})`;
	};
	for (let t of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) e.prototype["$" + t] = function(e) {
		return `${t}[${e.join(",")}]`;
	};
	for (let t of ["BigInt64Array", "BigUint64Array"]) e.prototype["$" + t] = function(e) {
		return `${t}[${e.join("n,")}${e.length > 0 ? "n" : ""}]`;
	};
	return e;
}();
function ke(e, t) {
	return e === t || De(e) === De(t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/clamp.js
function Ae(e, t = -Infinity, n = Infinity) {
	return Math.min(n, Math.max(t, e));
}
function K(e, t) {
	let n = e, r = t.toString(), i = r.indexOf("."), a = i >= 0 ? r.length - i : 0;
	if (a > 0) {
		let e = 10 ** a;
		n = Math.round(n * e) / e;
	}
	return n;
}
function je(e, t, n, r) {
	t = Number(t), n = Number(n);
	let i = (e - (Number.isNaN(t) ? 0 : t)) % r, a = K(Math.abs(i) * 2 >= r ? e + Math.sign(i) * (r - Math.abs(i)) : e - i, r);
	return Number.isNaN(t) ? !Number.isNaN(n) && a > n && (a = Math.floor(K(n / r, r)) * r) : a < t ? a = t : !Number.isNaN(n) && a > n && (a = t + Math.floor(K((n - t) / r, r)) * r), a = K(a, r), a;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFocusGuards.js
var Me = 0;
function Ne() {
	a((e) => {
		if (!me) return;
		let t = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", t[0] ?? Pe()), document.body.insertAdjacentElement("beforeend", t[1] ?? Pe()), Me++, e(() => {
			Me === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((e) => e.remove()), Me--;
		});
	});
}
function Pe() {
	let e = document.createElement("span");
	return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function Fe(e) {
	return A(() => !k(e) || !!U(e)?.closest("form"));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
function Ie() {
	let e = d()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function Le(e) {
	let t = oe("", 1e3);
	return {
		search: t,
		handleTypeaheadSearch: (n, r) => {
			if (t.value += n, e) e(n);
			else {
				let e = G(), n = r.map((e) => ({
					...e,
					textValue: e.value?.textValue ?? e.ref.textContent?.trim() ?? ""
				})), i = n.find((t) => t.ref === e), a = ze(n.map((e) => e.textValue), t.value, i?.textValue), o = n.find((e) => e.textValue === a);
				return o && o.ref.focus(), o?.ref;
			}
		},
		resetTypeahead: () => {
			t.value = "";
		}
	};
}
function Re(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function ze(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Re(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function q() {
	let e = S();
	return {
		primitiveElement: e,
		currentElement: A(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : U(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [J, Be] = /*#__PURE__*/ R("DialogRoot"), Ve = /* @__PURE__ */ F({
	inheritAttrs: !1,
	__name: "DialogRoot",
	props: {
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !0
		},
		unmountOnHide: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = se(n, "open", t, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), i = S(), a = S(), { modal: s, unmountOnHide: c } = _(n);
		return Be({
			open: r,
			modal: s,
			unmountOnHide: c,
			openModal: () => {
				r.value = !0;
			},
			onOpenChange: (e) => {
				r.value = e;
			},
			onOpenToggle: () => {
				r.value = !r.value;
			},
			contentId: "",
			titleId: "",
			descriptionId: "",
			triggerElement: i,
			contentElement: a
		}), (e, t) => o(e.$slots, "default", {
			open: y(r),
			close: () => r.value = !1
		});
	}
}), He = /* @__PURE__ */ F({
	__name: "DialogClose",
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
		let t = e;
		z();
		let r = J();
		return (e, i) => (c(), T(y(B), n(t, {
			type: e.as === "button" ? "button" : void 0,
			onClick: i[0] ||= (e) => y(r).onOpenChange(!1)
		}), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["type"]));
	}
}), Ue = ["Enter", " "], We = [
	"ArrowDown",
	"PageUp",
	"Home"
], Ge = [
	"ArrowUp",
	"PageDown",
	"End"
];
[...We, ...Ge], [...Ue], [...Ue];
function Ke(e) {
	return e ? "open" : "closed";
}
function qe(e) {
	let t = G();
	for (let n of e) if (n === t || (n.focus(), G() !== t)) return;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentImpl.js
var Je = /* @__PURE__ */ F({
	__name: "DialogContentImpl",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		trapFocus: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
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
		present: {
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
	setup(t, { emit: r }) {
		let i = t, a = r, s = J(), { forwardRef: l, currentElement: u } = z();
		return s.titleId ||= W(void 0, "reka-dialog-title"), s.descriptionId ||= W(void 0, "reka-dialog-description"), e(() => {
			s.contentElement = u, G() !== document.body && (s.triggerElement.value = G());
		}), (e, t) => (c(), T(y(_e), {
			"as-child": "",
			loop: "",
			trapped: i.trapFocus,
			present: i.present,
			onMountAutoFocus: t[5] ||= (e) => a("openAutoFocus", e),
			onUnmountAutoFocus: t[6] ||= (e) => a("closeAutoFocus", e)
		}, {
			default: m(() => [I(y(fe), n({
				id: y(s).contentId,
				ref: y(l),
				as: e.as,
				"as-child": e.asChild,
				present: i.present,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": y(s).descriptionId,
				"aria-labelledby": y(s).titleId,
				"data-state": y(Ke)(y(s).open.value)
			}, e.$attrs, {
				onDismiss: t[0] ||= (e) => y(s).onOpenChange(!1),
				onEscapeKeyDown: t[1] ||= (e) => a("escapeKeyDown", e),
				onFocusOutside: t[2] ||= (e) => a("focusOutside", e),
				onInteractOutside: t[3] ||= (e) => a("interactOutside", e),
				onPointerDownOutside: t[4] ||= (e) => a("pointerDownOutside", e)
			}), {
				default: m(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"as",
				"as-child",
				"present",
				"disable-outside-pointer-events",
				"aria-describedby",
				"aria-labelledby",
				"data-state"
			])]),
			_: 3
		}, 8, ["trapped", "present"]));
	}
}), Ye = /* @__PURE__ */ F({
	__name: "DialogContentModal",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		trapFocus: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1,
			default: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		present: {
			type: Boolean,
			required: !0
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
		let r = e, i = t, a = J(), s = V(i), { forwardRef: l, currentElement: u } = z(), d = A(() => r.present ? u.value : void 0);
		ge(d);
		let f = A(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return p(() => r.present, (e, t) => {
			!e && t && a.triggerElement.value?.focus();
		}), (e, t) => (c(), T(Je, n({
			...f.value,
			...y(s)
		}, {
			ref: y(l),
			present: e.present,
			"trap-focus": y(a).open.value,
			"disable-outside-pointer-events": r.disableOutsidePointerEvents,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), y(a).triggerElement.value?.focus());
			},
			onPointerDownOutside: t[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: t[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, [
			"present",
			"trap-focus",
			"disable-outside-pointer-events"
		]));
	}
}), Xe = /* @__PURE__ */ F({
	__name: "DialogContentNonModal",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		trapFocus: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
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
		present: {
			type: Boolean,
			required: !0
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
		let r = e, i = V(t);
		z();
		let a = J(), s = S(!1), l = S(!1), u = A(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return p(() => r.present, (e, t) => {
			!e && t && (s.value || a.triggerElement.value?.focus(), s.value = !1, l.value = !1);
		}), (e, t) => (c(), T(Je, n({
			...u.value,
			...y(i)
		}, {
			present: e.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (s.value || y(a).triggerElement.value?.focus(), e.preventDefault()), s.value = !1, l.value = !1;
			},
			onInteractOutside: t[1] ||= (e) => {
				e.defaultPrevented || (s.value = !0, e.detail.originalEvent.type === "pointerdown" && (l.value = !0));
				let t = e.target;
				y(a).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && l.value && e.preventDefault();
			}
		}), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), Ze = /* @__PURE__ */ F({
	__name: "DialogContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1,
			default: void 0
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let r = e, a = t, s = J(), l = V(a), { forwardRef: u } = z();
		return (e, t) => (c(), T(y(H), {
			present: e.forceMount || y(s).open.value,
			"force-mount": e.forceMount || !y(s).unmountOnHide.value
		}, {
			default: m(({ present: t }) => [y(s).modal.value ? i((c(), T(Ye, n({
				key: 0,
				ref: y(u),
				present: y(s).unmountOnHide.value || t
			}, {
				...r,
				...y(l),
				...e.$attrs
			}), {
				default: m(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[O, y(s).unmountOnHide.value || t]]) : i((c(), T(Xe, n({
				key: 1,
				ref: y(u),
				present: y(s).unmountOnHide.value || t
			}, {
				...r,
				...y(l),
				...e.$attrs
			}), {
				default: m(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[O, y(s).unmountOnHide.value || t]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), Qe = /* @__PURE__ */ F({
	__name: "DialogDescription",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "p"
		}
	},
	setup(e) {
		let t = e;
		z();
		let r = J();
		return (e, i) => (c(), T(y(B), n(t, { id: y(r).descriptionId }), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), $e = /* @__PURE__ */ F({
	__name: "DialogOverlayImpl",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		present: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	setup(e) {
		let t = e, n = J(), r = he(t.present);
		return p(() => t.present, (e) => r.value = e), z(), (e, t) => (c(), T(y(B), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": y(n).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: t[0] ||= v(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-state"
		]));
	}
}), et = /* @__PURE__ */ F({
	__name: "DialogOverlay",
	props: {
		forceMount: {
			type: Boolean,
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
		let t = J(), { forwardRef: r } = z();
		return (e, a) => y(t)?.modal.value ? (c(), T(y(H), {
			key: 0,
			present: e.forceMount || y(t).open.value,
			"force-mount": e.forceMount || !y(t).unmountOnHide.value
		}, {
			default: m(({ present: a }) => [i(I($e, n(e.$attrs, {
				ref: y(r),
				as: e.as,
				"as-child": e.asChild,
				present: y(t).unmountOnHide.value || a
			}), {
				default: m(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[O, y(t).unmountOnHide.value || a]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : w("v-if", !0);
	}
}), tt = /* @__PURE__ */ F({
	__name: "DialogPortal",
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
		return (e, r) => (c(), T(y(pe), x(t(n)), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), nt = /* @__PURE__ */ F({
	__name: "DialogTitle",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "h2"
		}
	},
	setup(e) {
		let t = e, r = J();
		return z(), (e, i) => (c(), T(y(B), n(t, { id: y(r).titleId }), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), rt = "data-reka-collection-item";
function Y(e = {}) {
	let { key: t = "", isProvider: n = !1 } = e, r = `${t}CollectionProvider`, i;
	if (n) {
		let e = S(/* @__PURE__ */ new Map());
		i = {
			collectionRef: S(),
			itemMap: e
		}, u(r, i);
	} else i = f(r);
	let o = (e = !1) => {
		let t = i.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${rt}]`)), r = new Map(n.map((e, t) => [e, t])), a = Array.from(i.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? a : a.filter((e) => e.ref.dataset.disabled !== "");
	}, s = /*#__PURE__*/ F({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: a } = q();
			return p(a, () => {
				i.collectionRef.value = a.value;
			}), () => ee(ce, {
				ref: r,
				...n
			}, t);
		}
	}), c = /*#__PURE__*/ F({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: o } = q();
			return a((t) => {
				if (o.value) {
					let n = h(o.value);
					i.itemMap.value.set(n, {
						ref: o.value,
						value: e.value
					}), t(() => i.itemMap.value.delete(n));
				}
			}), () => ee(ce, {
				...n,
				[rt]: "",
				ref: r
			}, t);
		}
	});
	return {
		getItems: o,
		reactiveItems: A(() => Array.from(i.itemMap.value.values())),
		itemMapSize: A(() => i.itemMap.value.size),
		CollectionSlot: s,
		CollectionItem: c
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInputBubble.js
var it = /* @__PURE__ */ F({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, { primitiveElement: r, currentElement: i } = q(), a = A(() => t.checked ?? t.value);
		return p(a, (e, t) => {
			if (!i.value) return;
			let n = i.value, r = window.HTMLInputElement.prototype, a = Object.getOwnPropertyDescriptor(r, "value").set;
			if (a && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				a.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, i) => (c(), T(ve, n({
			ref_key: "primitiveElement",
			ref: r
		}, {
			...t,
			...e.$attrs
		}, { as: "input" }), null, 16));
	}
}), at = /* @__PURE__ */ F({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, i = A(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), a = A(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
			name: t.name,
			value: t.value
		}] : typeof t.value == "object" && Array.isArray(t.value) ? t.value.flatMap((e, n) => typeof e == "object" ? Object.entries(e).map(([e, r]) => ({
			name: `${t.name}[${n}][${e}]`,
			value: r
		})) : {
			name: `${t.name}[${n}]`,
			value: e
		}) : t.value !== null && typeof t.value == "object" && !Array.isArray(t.value) ? Object.entries(t.value).map(([e, n]) => ({
			name: `${t.name}[${e}]`,
			value: n
		})) : []);
		return (e, o) => (c(), g(M, null, [w(" We render single input if it's required "), i.value ? (c(), T(it, n({ key: e.name }, {
			...t,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (c(!0), g(M, { key: 1 }, r(a.value, (r) => (c(), T(it, n({ key: r.name }, { ref_for: !0 }, {
			...t,
			...e.$attrs
		}, {
			name: r.name,
			value: r.value
		}), null, 16, ["name", "value"]))), 128))], 2112));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function ot(e) {
	let t = le({ nonce: S() });
	return A(() => e?.value || t.nonce?.value);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/utils.js
var st = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], ct = [" ", "Enter"];
function X(e, t, n) {
	return e === void 0 ? !1 : Array.isArray(e) ? e.some((e) => lt(e, t, n)) : lt(e, t, n);
}
function lt(e, t, n) {
	return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? e?.[n] === t?.[n] : ke(e, t);
}
function ut(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectRoot.js
var dt = ["value"], [Z, ft] = /*#__PURE__*/ R("SelectRoot"), pt = /* @__PURE__ */ F({
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
		let i = e, a = t, { required: s, disabled: l, multiple: u, dir: d } = _(i), f = se(i, "modelValue", a, {
			defaultValue: i.defaultValue ?? (u.value ? [] : void 0),
			passive: i.modelValue === void 0,
			deep: !0
		}), p = se(i, "open", a, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
		}), h = S(), v = S(), b = S({
			x: 0,
			y: 0
		}), x = A(() => u.value && Array.isArray(f.value) ? f.value?.length === 0 : ae(f.value));
		Y({ isProvider: !0 });
		let C = ye(d), E = Fe(h), D = S(/* @__PURE__ */ new Set()), O = A(() => Array.from(D.value).map((e) => e.value).join(";"));
		function k(e) {
			if (u.value) {
				let t = Array.isArray(f.value) ? [...f.value] : [], n = t.findIndex((t) => lt(t, e, i.by));
				n === -1 ? t.push(e) : t.splice(n, 1), f.value = [...t];
			} else f.value = e;
		}
		function j(e) {
			return Array.from(D.value).find((t) => X(e, t.value, i.by));
		}
		return ft({
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
			onValueChange: k,
			by: i.by,
			open: p,
			multiple: u,
			required: s,
			onOpenChange: (e) => {
				p.value = e;
			},
			dir: C,
			triggerPointerDownPosRef: b,
			disabled: l,
			isEmptyModelValue: x,
			optionsSet: D,
			onOptionAdd: (e) => {
				let t = j(e.value);
				t && D.value.delete(t), D.value.add(e);
			},
			onOptionRemove: (e) => {
				let t = j(e.value);
				t && D.value.delete(t);
			}
		}), (e, t) => (c(), T(y(be), null, {
			default: m(() => [o(e.$slots, "default", {
				modelValue: y(f),
				open: y(p)
			}), y(E) && e.name ? (c(), T(mt, {
				key: O.value,
				"aria-hidden": "true",
				tabindex: "-1",
				multiple: y(u),
				required: y(s),
				name: e.name,
				autocomplete: e.autocomplete,
				disabled: y(l),
				value: y(f)
			}, {
				default: m(() => [y(ae)(y(f)) ? (c(), g("option", {
					key: 0,
					value: e.nullableValue
				}, null, 8, dt)) : w("v-if", !0), (c(!0), g(M, null, r(Array.from(D.value), (e) => (c(), g("option", n({ key: e.value ?? "" }, { ref_for: !0 }, e), null, 16))), 128))]),
				_: 1
			}, 8, [
				"multiple",
				"required",
				"name",
				"autocomplete",
				"disabled",
				"value"
			])) : w("v-if", !0)]),
			_: 3
		}));
	}
}), mt = /* @__PURE__ */ F({
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
		let t = e, r = S(), i = Z();
		p(() => t.value, (e, t) => {
			let n = window.HTMLSelectElement.prototype, i = Object.getOwnPropertyDescriptor(n, "value").set;
			if (e !== t && i && r.value) {
				let t = new Event("change", { bubbles: !0 });
				i.call(r.value, e), r.value.dispatchEvent(t);
			}
		});
		function a(e) {
			i.onValueChange(e.target.value);
		}
		return (e, i) => (c(), T(y(ve), { "as-child": "" }, {
			default: m(() => [D("select", n({
				ref_key: "selectElement",
				ref: r
			}, t, { onInput: a }), [o(e.$slots, "default")], 16)]),
			_: 3
		}));
	}
}), ht = /* @__PURE__ */ F({
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
		let t = Ce(e);
		return (e, r) => (c(), T(y(we), n(y(t), { style: {
			boxSizing: "border-box",
			"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-select-content-available-width": "var(--reka-popper-available-width)",
			"--reka-select-content-available-height": "var(--reka-popper-available-height)",
			"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
		} }), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), gt = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
}, [Q, _t] = /*#__PURE__*/ R("SelectContent"), vt = /* @__PURE__ */ F({
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
	setup(e, { emit: t }) {
		let r = e, i = t, l = Z();
		Ne(), he(r.bodyLock);
		let { CollectionSlot: u, getItems: d } = Y(), f = S();
		ge(f);
		let { search: h, handleTypeaheadSearch: g } = Le(), _ = S(), b = S(), x = S(), C = S(!1), w = S(!1), E = S(!1);
		function D() {
			b.value && f.value && qe([b.value, f.value]);
		}
		p(C, () => {
			D();
		});
		let { onOpenChange: O, triggerPointerDownPosRef: k } = l;
		a((e) => {
			if (!f.value) return;
			let t = {
				x: 0,
				y: 0
			}, n = (e) => {
				t = {
					x: Math.abs(Math.round(e.pageX) - (k.value?.x ?? 0)),
					y: Math.abs(Math.round(e.pageY) - (k.value?.y ?? 0))
				};
			}, r = (e) => {
				e.pointerType !== "touch" && (t.x <= 10 && t.y <= 10 ? e.preventDefault() : f.value?.contains(e.target) || O(!1), document.removeEventListener("pointermove", n), k.value = null);
			};
			k.value !== null && (document.addEventListener("pointermove", n), document.addEventListener("pointerup", r, {
				capture: !0,
				once: !0
			})), e(() => {
				document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", r, { capture: !0 });
			});
		});
		function j(e) {
			let t = e.ctrlKey || e.altKey || e.metaKey;
			if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && g(e.key, d()), [
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
				setTimeout(() => qe(t)), e.preventDefault();
			}
		}
		let M = A(() => r.position === "popper" ? r : {}), N = Ce(M.value);
		return _t({
			content: f,
			viewport: _,
			onViewportChange: (e) => {
				_.value = e;
			},
			itemRefCallback: (e, t, n) => {
				let r = !w.value && !n, i = X(l.modelValue.value, t, l.by);
				if (l.multiple.value) {
					if (E.value) return;
					(i || r) && (b.value = e, i && (E.value = !0));
				} else (i || r) && (b.value = e);
				r && (w.value = !0);
			},
			selectedItem: b,
			selectedItemText: x,
			onItemLeave: () => {
				f.value?.focus();
			},
			itemTextRefCallback: (e, t, n) => {
				let r = !w.value && !n;
				(X(l.modelValue.value, t, l.by) || r) && (x.value = e);
			},
			focusSelectedItem: D,
			position: r.position,
			isPositioned: C,
			searchRef: h
		}), (e, t) => (c(), T(y(u), null, {
			default: m(() => [I(y(_e), {
				"as-child": "",
				onMountAutoFocus: t[6] ||= v(() => {}, ["prevent"]),
				onUnmountAutoFocus: t[7] ||= (e) => {
					i("closeAutoFocus", e), !e.defaultPrevented && (y(l).triggerElement.value?.focus({ preventScroll: !0 }), e.preventDefault());
				}
			}, {
				default: m(() => [I(y(fe), {
					"as-child": "",
					"disable-outside-pointer-events": e.disableOutsidePointerEvents,
					onFocusOutside: t[2] ||= v(() => {}, ["prevent"]),
					onDismiss: t[3] ||= (e) => y(l).onOpenChange(!1),
					onEscapeKeyDown: t[4] ||= (e) => i("escapeKeyDown", e),
					onPointerDownOutside: t[5] ||= (e) => i("pointerDownOutside", e)
				}, {
					default: m(() => [(c(), T(s(e.position === "popper" ? ht : xt), n({
						...e.$attrs,
						...y(N)
					}, {
						id: y(l).contentId,
						ref: (e) => {
							if (!e) return;
							let t = y(U)(e);
							t?.hasAttribute("data-reka-popper-content-wrapper") ? f.value = t.firstElementChild : f.value = t;
						},
						role: "listbox",
						"data-state": y(l).open.value ? "open" : "closed",
						dir: y(l).dir.value,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none"
						},
						onContextmenu: t[0] ||= v(() => {}, ["prevent"]),
						onPlaced: t[1] ||= (e) => C.value = !0,
						onKeydown: j
					}), {
						default: m(() => [o(e.$slots, "default")]),
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
}), [yt, bt] = /*#__PURE__*/ R("SelectItemAlignedPosition"), xt = /* @__PURE__ */ F({
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
	setup(t, { emit: r }) {
		let i = t, a = r, { getItems: s } = Y(), u = Z(), d = Q(), f = S(!1), p = S(!0), h = S(), { forwardRef: _, currentElement: v } = z(), { viewport: b, selectedItem: x, selectedItemText: w, focusSelectedItem: T } = d;
		function E() {
			if (u.triggerElement.value && u.valueElement.value && h.value && v.value && b?.value && x?.value && w?.value) {
				let e = u.triggerElement.value.getBoundingClientRect(), t = v.value.getBoundingClientRect(), n = u.valueElement.value.getBoundingClientRect(), r = w.value.getBoundingClientRect();
				if (u.dir.value !== "rtl") {
					let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = Ae(a, 10, Math.max(10, l - c));
					h.value.style.minWidth = `${s}px`, h.value.style.left = `${u}px`;
				} else {
					let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = Ae(a, 10, Math.max(10, l - c));
					h.value.style.minWidth = `${s}px`, h.value.style.right = `${u}px`;
				}
				let i = s().map((e) => e.ref), o = window.innerHeight - 20, c = b.value.scrollHeight, l = window.getComputedStyle(v.value), d = Number.parseInt(l.borderTopWidth, 10), p = Number.parseInt(l.paddingTop, 10), m = Number.parseInt(l.borderBottomWidth, 10), g = Number.parseInt(l.paddingBottom, 10), _ = d + p + c + g + m, y = Math.min(x.value.offsetHeight * 5, _), S = window.getComputedStyle(b.value), C = Number.parseInt(S.paddingTop, 10), T = Number.parseInt(S.paddingBottom, 10), E = e.top + e.height / 2 - 10, D = o - E, O = x.value.offsetHeight / 2, k = x.value.offsetTop + O, A = d + p + k, j = _ - A;
				if (A <= E) {
					let e = x.value === i.at(-1);
					h.value.style.bottom = "0px";
					let t = v.value.clientHeight - b.value.offsetTop - b.value.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + m);
					h.value.style.height = `${n}px`;
				} else {
					let e = x.value === i[0];
					h.value.style.top = "0px";
					let t = Math.max(E, d + b.value.offsetTop + (e ? C : 0) + O) + j;
					h.value.style.height = `${t}px`, b.value.scrollTop = A - E + b.value.offsetTop;
				}
				h.value.style.margin = "10px 0", h.value.style.minHeight = `${y}px`, h.value.style.maxHeight = `${o}px`, a("placed"), requestAnimationFrame(() => f.value = !0);
			}
		}
		let D = S("");
		e(async () => {
			await l(), E(), v.value && (D.value = window.getComputedStyle(v.value).zIndex);
		});
		function O(e) {
			e && p.value === !0 && (E(), T?.(), p.value = !1);
		}
		return ue(u.triggerElement, () => {
			E();
		}), bt({
			contentWrapper: h,
			shouldExpandOnScrollRef: f,
			onScrollButtonChange: O
		}), (e, t) => (c(), g("div", {
			ref_key: "contentWrapperElement",
			ref: h,
			style: C({
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: D.value
			})
		}, [I(y(B), n({
			ref: y(_),
			style: {
				boxSizing: "border-box",
				maxHeight: "100%"
			}
		}, {
			...e.$attrs,
			...i
		}), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16)], 4));
	}
}), St = /* @__PURE__ */ F({
	inheritAttrs: !1,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return ft(e.context), _t(gt), (e, t) => o(e.$slots, "default");
	}
}), Ct = { key: 1 }, wt = /* @__PURE__ */ F({
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
		let i = n, a = xe(i, r), s = Z(), l = S();
		e(() => {
			l.value = new DocumentFragment();
		});
		let u = S(), d = A(() => i.forceMount || s.open.value), f = S(d.value), h;
		function _() {
			h &&= (clearTimeout(h), void 0);
		}
		return p(d, (e, t, n) => {
			_(), h = setTimeout(() => {
				f.value = d.value, h = void 0;
			}), n(_);
		}), E(_), (e, n) => d.value || f.value || u.value?.present ? (c(), T(y(H), {
			key: 0,
			ref_key: "presenceRef",
			ref: u,
			present: d.value
		}, {
			default: m(() => [I(vt, x(t({
				...y(a),
				...e.$attrs
			})), {
				default: m(() => [o(e.$slots, "default")]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["present"])) : l.value ? (c(), g("div", Ct, [(c(), T(b, { to: l.value }, [I(St, { context: y(s) }, {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 8, ["context"])], 8, ["to"]))])) : w("v-if", !0);
	}
}), Tt = /* @__PURE__ */ F({
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
		return (e, t) => (c(), T(y(B), {
			"aria-hidden": "true",
			as: e.as,
			"as-child": e.asChild
		}, {
			default: m(() => [o(e.$slots, "default", {}, () => [t[0] ||= P("▼")])]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), [Et, Dt] = /*#__PURE__*/ R("SelectItem"), Ot = /* @__PURE__ */ F({
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
		let r = t, i = n, { disabled: a } = _(r), s = Z(), u = Q(), { forwardRef: d, currentElement: f } = z(), { CollectionItem: p } = Y(), h = A(() => X(s.modelValue?.value, r.value, s.by)), g = S(!1), b = S(r.textValue ?? ""), x = W(void 0, "reka-select-item-text");
		async function C(e) {
			if (e.defaultPrevented) return;
			let t = {
				originalEvent: e,
				value: r.value
			};
			de("select.select", w, t);
		}
		async function w(e) {
			await l(), i("select", e), !e.defaultPrevented && (a.value || (s.onValueChange(r.value), s.multiple.value || s.onOpenChange(!1)));
		}
		async function E(e) {
			await l(), !e.defaultPrevented && (a.value ? u.onItemLeave?.() : e.currentTarget?.focus({ preventScroll: !0 }));
		}
		async function D(e) {
			await l(), !e.defaultPrevented && e.currentTarget === G() && u.onItemLeave?.();
		}
		async function O(e) {
			await l(), !e.defaultPrevented && (u.searchRef?.value === "" || e.key !== " ") && (ct.includes(e.key) && C(e), e.key === " " && e.preventDefault());
		}
		if (r.value === "") throw Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		return e(() => {
			f.value && u.itemRefCallback(f.value, r.value, r.disabled);
		}), Dt({
			value: r.value,
			disabled: a,
			textId: x,
			isSelected: h,
			onItemTextChange: (e) => {
				b.value = ((b.value || e?.textContent) ?? "").trim();
			}
		}), (e, t) => (c(), T(y(p), { value: { textValue: b.value } }, {
			default: m(() => [I(y(B), {
				ref: y(d),
				role: "option",
				"aria-labelledby": y(x),
				"data-highlighted": g.value ? "" : void 0,
				"aria-selected": h.value,
				"data-state": h.value ? "checked" : "unchecked",
				"aria-disabled": y(a) || void 0,
				"data-disabled": y(a) ? "" : void 0,
				tabindex: y(a) ? void 0 : -1,
				as: e.as,
				"as-child": e.asChild,
				onFocus: t[0] ||= (e) => g.value = !0,
				onBlur: t[1] ||= (e) => g.value = !1,
				onPointerup: C,
				onPointerdown: t[2] ||= (e) => {
					e.currentTarget.focus({ preventScroll: !0 });
				},
				onTouchend: t[3] ||= v(() => {}, ["prevent", "stop"]),
				onPointermove: E,
				onPointerleave: D,
				onKeydown: O
			}, {
				default: m(() => [o(e.$slots, "default")]),
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
}), kt = /* @__PURE__ */ F({
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
		let t = e, r = Et();
		return (e, i) => y(r).isSelected.value ? (c(), T(y(B), n({
			key: 0,
			"aria-hidden": "true"
		}, t), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16)) : w("v-if", !0);
	}
}), At = /* @__PURE__ */ F({
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
	setup(t) {
		let r = t, i = Z(), a = Q(), s = Et(), { forwardRef: l, currentElement: u } = z(), d = A(() => ({
			value: s.value,
			disabled: s.disabled.value,
			textContent: u.value?.textContent ?? s.value?.toString() ?? ""
		}));
		return e(() => {
			u.value && (s.onItemTextChange(u.value), a.itemTextRefCallback(u.value, s.value, s.disabled.value), i.onOptionAdd(d.value));
		}), E(() => {
			i.onOptionRemove(d.value);
		}), (e, t) => (c(), T(y(B), n({
			id: y(s).textId,
			ref: y(l)
		}, {
			...r,
			...e.$attrs
		}), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), jt = /* @__PURE__ */ F({
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
		let n = e;
		return (e, r) => (c(), T(y(pe), x(t(n)), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Mt = /* @__PURE__ */ F({
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
	setup(t) {
		let n = t, r = Z(), { forwardRef: i, currentElement: a } = z(), s = A(() => r.disabled?.value || n.disabled);
		r.contentId ||= W(void 0, "reka-select-content"), e(() => {
			r.onTriggerChange(a.value);
		});
		let { getItems: l } = Y(), { search: u, handleTypeaheadSearch: d, resetTypeahead: f } = Le();
		function p() {
			s.value || (r.onOpenChange(!0), f());
		}
		function h(e) {
			p(), r.triggerPointerDownPosRef.value = {
				x: Math.round(e.pageX),
				y: Math.round(e.pageY)
			};
		}
		function g(e) {
			return e.button === 0 && e.ctrlKey === !1;
		}
		let _ = !1;
		function b(e) {
			if (e.pointerType === "touch") return e.preventDefault();
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), g(e) && (h(e), _ = !0);
		}
		function x(e) {
			g(e) && e.preventDefault();
		}
		function S(e) {
			_ || e.currentTarget?.focus(), _ = !1;
		}
		return (e, t) => (c(), T(y(Se), {
			"as-child": "",
			reference: e.reference
		}, {
			default: m(() => [I(y(B), {
				ref: y(i),
				role: "combobox",
				type: e.as === "button" ? "button" : void 0,
				"aria-controls": y(r).contentId,
				"aria-expanded": y(r).open.value || !1,
				"aria-required": y(r).required?.value,
				"aria-autocomplete": "none",
				disabled: s.value,
				dir: y(r)?.dir.value,
				"data-state": y(r)?.open.value ? "open" : "closed",
				"data-disabled": s.value ? "" : void 0,
				"data-placeholder": y(ut)(y(r).modelValue?.value) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				onClick: S,
				onPointerdown: b,
				onMousedown: x,
				onPointerup: t[0] ||= v((e) => {
					e.pointerType === "touch" && h(e);
				}, ["prevent"]),
				onKeydown: t[1] ||= (e) => {
					let t = y(u) !== "";
					!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && t && e.key === " " || (y(d)(e.key, y(l)()), y(st).includes(e.key) && (p(), e.preventDefault()));
				}
			}, {
				default: m(() => [o(e.$slots, "default")]),
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
}), Nt = /* @__PURE__ */ F({
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
	setup(t) {
		let n = t, { forwardRef: r, currentElement: i } = z(), a = Z();
		e(() => {
			a.valueElement = i;
		});
		let s = A(() => {
			let e = [], t = Array.from(a.optionsSet.value), n = (e) => t.find((t) => X(e, t.value, a.by));
			return e = Array.isArray(a.modelValue.value) ? a.modelValue.value.map((e) => n(e)?.textContent ?? "") : [n(a.modelValue.value)?.textContent ?? ""], e.filter(Boolean);
		}), l = A(() => s.value.length ? s.value.join(", ") : n.placeholder);
		return (e, t) => (c(), T(y(B), {
			ref: y(r),
			as: e.as,
			"as-child": e.asChild,
			style: { pointerEvents: "none" },
			"data-placeholder": s.value.length ? void 0 : n.placeholder
		}, {
			default: m(() => [o(e.$slots, "default", {
				selectedLabel: s.value,
				modelValue: y(a).modelValue.value
			}, () => [P(j(l.value), 1)])]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-placeholder"
		]));
	}
}), Pt = /* @__PURE__ */ F({
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
	setup(t) {
		let r = t, { nonce: i } = _(r), a = ot(i), s = Q(), l = s.position === "item-aligned" ? yt() : void 0, { forwardRef: u, currentElement: d } = z();
		e(() => {
			s?.onViewportChange(d.value);
		});
		let f = S(0);
		function p(e) {
			let t = e.currentTarget, { shouldExpandOnScrollRef: n, contentWrapper: r } = l ?? {};
			if (n?.value && r?.value) {
				let e = Math.abs(f.value - t.scrollTop);
				if (e > 0) {
					let n = window.innerHeight - 20, i = Number.parseFloat(r.value.style.minHeight), a = Number.parseFloat(r.value.style.height), o = Math.max(i, a);
					if (o < n) {
						let i = o + e, a = Math.min(n, i), s = i - a;
						r.value.style.height = `${a}px`, r.value.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, r.value.style.justifyContent = "flex-end");
					}
				}
			}
			f.value = t.scrollTop;
		}
		return (e, t) => (c(), g(M, null, [I(y(B), n({
			ref: y(u),
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
			onScroll: p
		}), {
			default: m(() => [o(e.$slots, "default")]),
			_: 3
		}, 16), I(y(B), {
			as: "style",
			nonce: y(a)
		}, {
			default: m(() => t[0] ||= [P(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")]),
			_: 1,
			__: [0]
		}, 8, ["nonce"])], 64));
	}
}), Ft = {
	iconButton: "_iconButton_4cnmf_32",
	iconButtonSm: "_iconButtonSm_4cnmf_42",
	iconButtonMd: "_iconButtonMd_4cnmf_47",
	iconButtonLg: "_iconButtonLg_4cnmf_52",
	iconButtonDestructive: "_iconButtonDestructive_4cnmf_65",
	iconButtonPressed: "_iconButtonPressed_4cnmf_74",
	appButton: "_appButton_4cnmf_84",
	appButtonContent: "_appButtonContent_4cnmf_100",
	appButtonContentPending: "_appButtonContentPending_4cnmf_107",
	appButtonLabel: "_appButtonLabel_4cnmf_111",
	appButtonSpinner: "_appButtonSpinner_4cnmf_118",
	"tc-icon-rotate": "_tc-icon-rotate_4cnmf_1",
	appButtonPrimary: "_appButtonPrimary_4cnmf_136",
	appButtonSecondary: "_appButtonSecondary_4cnmf_147",
	appButtonDestructive: "_appButtonDestructive_4cnmf_156",
	segmentedControl: "_segmentedControl_4cnmf_169",
	segmentedControlItem: "_segmentedControlItem_4cnmf_178",
	segmentedControlItemLabel: "_segmentedControlItemLabel_4cnmf_199",
	switchRow: "_switchRow_4cnmf_210",
	switchLabelGroup: "_switchLabelGroup_4cnmf_222",
	switchLabel: "_switchLabel_4cnmf_222",
	switchDescription: "_switchDescription_4cnmf_234",
	switchRoot: "_switchRoot_4cnmf_247",
	switchThumb: "_switchThumb_4cnmf_266",
	checkboxRow: "_checkboxRow_4cnmf_293",
	checkboxBox: "_checkboxBox_4cnmf_311",
	checkboxIndicator: "_checkboxIndicator_4cnmf_335",
	checkboxLabel: "_checkboxLabel_4cnmf_341",
	numberStepper: "_numberStepper_4cnmf_355",
	numberStepperButton: "_numberStepperButton_4cnmf_365",
	numberStepperInput: "_numberStepperInput_4cnmf_383",
	selectTrigger: "_selectTrigger_4cnmf_402",
	selectValue: "_selectValue_4cnmf_424",
	selectContent: "_selectContent_4cnmf_433",
	selectViewport: "_selectViewport_4cnmf_444",
	selectItem: "_selectItem_4cnmf_448",
	selectItemText: "_selectItemText_4cnmf_461",
	selectItemIndicator: "_selectItemIndicator_4cnmf_483",
	fieldGroup: "_fieldGroup_4cnmf_493",
	fieldGroupLabel: "_fieldGroupLabel_4cnmf_499",
	fieldGroupRequired: "_fieldGroupRequired_4cnmf_505",
	fieldGroupHint: "_fieldGroupHint_4cnmf_509",
	fieldGroupError: "_fieldGroupError_4cnmf_516",
	dialogOverlay: "_dialogOverlay_4cnmf_527",
	dialogContent: "_dialogContent_4cnmf_534",
	confirmDialogContent: "_confirmDialogContent_4cnmf_552",
	dialogHeader: "_dialogHeader_4cnmf_556",
	dialogTitle: "_dialogTitle_4cnmf_563",
	dialogClose: "_dialogClose_4cnmf_570",
	dialogDescription: "_dialogDescription_4cnmf_583",
	dialogBody: "_dialogBody_4cnmf_589",
	confirmDialogActions: "_confirmDialogActions_4cnmf_595",
	tooltipContent: "_tooltipContent_4cnmf_605",
	tooltipArrow: "_tooltipArrow_4cnmf_616",
	stateSurface: "_stateSurface_4cnmf_624",
	stateSurfaceSkeleton: "_stateSurfaceSkeleton_4cnmf_630",
	skeletonBlock: "_skeletonBlock_4cnmf_637",
	stateSurfaceMessage: "_stateSurfaceMessage_4cnmf_643",
	stateSurfaceMessageGroup: "_stateSurfaceMessageGroup_4cnmf_656",
	stateSurfaceMessageTitle: "_stateSurfaceMessageTitle_4cnmf_662",
	stateSurfaceMessageText: "_stateSurfaceMessageText_4cnmf_670",
	stateSurfaceErrorText: "_stateSurfaceErrorText_4cnmf_677",
	stateSurfaceAction: "_stateSurfaceAction_4cnmf_681",
	toastViewport: "_toastViewport_4cnmf_689",
	toastRoot: "_toastRoot_4cnmf_703",
	toastTitle: "_toastTitle_4cnmf_714",
	toastDescription: "_toastDescription_4cnmf_721",
	toastClose: "_toastClose_4cnmf_727",
	toastSuccess: "_toastSuccess_4cnmf_742",
	toastError: "_toastError_4cnmf_750",
	virtualList: "_virtualList_4cnmf_762",
	virtualListSizer: "_virtualListSizer_4cnmf_767",
	virtualListItem: "_virtualListItem_4cnmf_772",
	promptTagChip: "_promptTagChip_4cnmf_783",
	promptTagTrigger: "_promptTagTrigger_4cnmf_798",
	promptTagToggle: "_promptTagToggle_4cnmf_809",
	promptTagContent: "_promptTagContent_4cnmf_823",
	promptTagGroup: "_promptTagGroup_4cnmf_834",
	promptTagGroupTitle: "_promptTagGroupTitle_4cnmf_839",
	promptTagOption: "_promptTagOption_4cnmf_847",
	promptTagOptionLabel: "_promptTagOptionLabel_4cnmf_865",
	promptTagOptionText: "_promptTagOptionText_4cnmf_872",
	promptTagOptionTextClamped: "_promptTagOptionTextClamped_4cnmf_878"
};
//#endregion
//#region src/ui/components/components_styles.ts
ie("components", "@keyframes _tc-icon-rotate_4cnmf_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}._iconButton_4cnmf_32{border-radius:var(--tc-radius-field);color:var(--tc-text);background-color:#0000;flex:none;justify-content:center;align-items:center;display:inline-flex}._iconButtonSm_4cnmf_42{width:28px;height:28px}._iconButtonMd_4cnmf_47{width:32px;height:32px}._iconButtonLg_4cnmf_52{width:40px;height:40px}._iconButton_4cnmf_32:hover:not(:disabled){background-color:var(--tc-surface-raised)}._iconButton_4cnmf_32:disabled{color:var(--tc-text-muted)}._iconButtonDestructive_4cnmf_65{color:var(--tc-error)}._iconButtonDestructive_4cnmf_65:hover:not(:disabled){background-color:var(--tc-surface-raised);border-color:var(--tc-error)}._iconButtonPressed_4cnmf_74{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._appButton_4cnmf_84{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);justify-content:center;align-items:center;height:36px;padding:0 16px;font-weight:500;display:inline-flex;position:relative}._appButton_4cnmf_84:disabled{opacity:.5}._appButtonContent_4cnmf_100{align-items:center;gap:8px;min-width:0;display:inline-flex}._appButtonContentPending_4cnmf_107{visibility:hidden}._appButtonLabel_4cnmf_111{white-space:nowrap;text-overflow:ellipsis;max-width:240px;overflow:hidden}._appButtonSpinner_4cnmf_118{justify-content:center;align-items:center;display:inline-flex;position:absolute;inset:0}._appButtonSpinner_4cnmf_118 svg{animation:_tc-icon-rotate_4cnmf_1 var(--tc-motion-normal) linear infinite}._appButtonPrimary_4cnmf_136{border-color:var(--tc-accent);background-color:var(--tc-accent);color:var(--tc-on-accent)}._appButtonPrimary_4cnmf_136:hover:not(:disabled){background-color:var(--tc-accent-hover);border-color:var(--tc-accent-hover)}._appButtonSecondary_4cnmf_147{border-color:var(--tc-divider);color:var(--tc-text)}._appButtonSecondary_4cnmf_147:hover:not(:disabled){background-color:var(--tc-surface-raised)}._appButtonDestructive_4cnmf_156{border-color:var(--tc-error);color:var(--tc-error)}._appButtonDestructive_4cnmf_156:hover:not(:disabled){background-color:var(--tc-surface-raised)}._segmentedControl_4cnmf_169{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);gap:2px;padding:2px;display:inline-flex}._segmentedControlItem_4cnmf_178{border-radius:var(--tc-radius-status);height:28px;color:var(--tc-text-muted);background-color:#0000;justify-content:center;align-items:center;padding:0 12px;display:inline-flex}._segmentedControlItem_4cnmf_178:hover:not([data-disabled]){background-color:var(--tc-surface-raised)}._segmentedControlItem_4cnmf_178[data-state=checked]{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._segmentedControlItemLabel_4cnmf_199{white-space:nowrap;text-overflow:ellipsis;max-width:160px;overflow:hidden}._switchRow_4cnmf_210{cursor:pointer;justify-content:space-between;align-items:center;gap:16px;display:flex}._switchRow_4cnmf_210[data-disabled]{cursor:not-allowed}._switchLabelGroup_4cnmf_222{flex-direction:column;gap:2px;min-width:0;display:flex}._switchLabel_4cnmf_222{color:var(--tc-text);overflow-wrap:anywhere}._switchDescription_4cnmf_234{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._switchRoot_4cnmf_247{background-color:var(--tc-surface-raised);border-color:var(--tc-text-muted);border-radius:999px;flex:none;width:40px;height:24px;position:relative}._switchRoot_4cnmf_247[data-state=checked]{background-color:var(--tc-accent);border-color:var(--tc-accent)}._switchRoot_4cnmf_247:disabled{opacity:.5}._switchThumb_4cnmf_266{border:1px solid var(--tc-text-muted);background-color:var(--tc-surface);width:18px;height:18px;transition:transform var(--tc-motion-fast) ease-out;border-radius:50%;display:block;transform:translate(2px)}._switchThumb_4cnmf_266[data-state=checked]{border-color:var(--tc-accent);transform:translate(18px)}._checkboxRow_4cnmf_293{cursor:pointer;align-items:center;gap:8px;display:inline-flex}._checkboxRow_4cnmf_293[data-disabled]{cursor:not-allowed}._checkboxBox_4cnmf_311{border-radius:var(--tc-radius-status);border-color:var(--tc-text-muted);background-color:var(--tc-surface);width:18px;height:18px;color:var(--tc-on-accent);transition:background-color var(--tc-motion-fast) ease-out;flex:none;justify-content:center;align-items:center;display:inline-flex}._checkboxBox_4cnmf_311[data-state=checked],._checkboxBox_4cnmf_311[data-state=indeterminate]{border-color:var(--tc-accent);background-color:var(--tc-accent)}._checkboxBox_4cnmf_311:disabled{opacity:.5}._checkboxIndicator_4cnmf_335{justify-content:center;align-items:center;display:inline-flex}._checkboxLabel_4cnmf_341{color:var(--tc-text);overflow-wrap:anywhere}._numberStepper_4cnmf_355{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);align-self:start;align-items:stretch;height:32px;display:inline-flex;overflow:hidden}._numberStepperButton_4cnmf_365{background-color:var(--tc-surface);width:28px;color:var(--tc-text);border-radius:0;justify-content:center;align-items:center;display:inline-flex}._numberStepperButton_4cnmf_365:hover:not(:disabled){background-color:var(--tc-surface-raised)}._numberStepperButton_4cnmf_365:disabled{color:var(--tc-text-muted)}._numberStepperInput_4cnmf_383{border:none;border-left:1px solid var(--tc-divider);border-right:1px solid var(--tc-divider);background-color:var(--tc-surface);width:56px;color:var(--tc-text);text-align:center}._numberStepperInput_4cnmf_383:focus-visible{outline:2px solid var(--tc-accent);outline-offset:-2px}._selectTrigger_4cnmf_402{border-radius:var(--tc-radius-field);border-color:var(--tc-divider);background-color:var(--tc-surface);min-width:160px;height:32px;color:var(--tc-text);justify-content:space-between;align-items:center;gap:8px;padding:0 10px;display:inline-flex}._selectTrigger_4cnmf_402:hover:not(:disabled){background-color:var(--tc-surface-raised)}._selectTrigger_4cnmf_402[data-placeholder]{color:var(--tc-text-muted)}._selectValue_4cnmf_424{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectContent_4cnmf_433{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);max-height:320px;width:var(--reka-select-trigger-width);max-width:var(--reka-select-content-available-width);overflow:hidden}._selectViewport_4cnmf_444{padding:4px}._selectItem_4cnmf_448{border-radius:var(--tc-radius-status);color:var(--tc-text);outline-offset:-2px;outline:2px solid #0000;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding:6px 8px;display:flex}._selectItemText_4cnmf_461{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectItem_4cnmf_448[data-highlighted]{background-color:var(--tc-surface-raised)}._selectItem_4cnmf_448:focus-visible,._selectItem_4cnmf_448:focus{outline-color:var(--tc-accent)}._selectItem_4cnmf_448[data-disabled]{color:var(--tc-text-muted)}._selectItemIndicator_4cnmf_483{color:var(--tc-accent);flex-shrink:0;display:inline-flex}._fieldGroup_4cnmf_493{flex-direction:column;gap:6px;display:flex}._fieldGroupLabel_4cnmf_499{color:var(--tc-text);font-size:13px;font-weight:500}._fieldGroupRequired_4cnmf_505{color:var(--tc-error)}._fieldGroupHint_4cnmf_509{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._fieldGroupError_4cnmf_516{color:var(--tc-error);overflow-wrap:anywhere;margin:0;font-size:12px}._dialogOverlay_4cnmf_527{z-index:var(--tc-z-overlay);background-color:#1113187a;position:fixed;inset:0}._dialogContent_4cnmf_534{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);flex-direction:column;gap:12px;width:min(480px,100vw - 32px);max-height:calc(100vh - 64px);padding:20px;display:flex;position:fixed;top:50%;left:50%;overflow-y:auto;transform:translate(-50%,-50%)}._confirmDialogContent_4cnmf_552{gap:16px}._dialogHeader_4cnmf_556{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}._dialogTitle_4cnmf_563{color:var(--tc-text);overflow-wrap:anywhere;font-size:16px;font-weight:600}._dialogClose_4cnmf_570{border-radius:var(--tc-radius-field);width:28px;height:28px;color:var(--tc-text-muted);flex:none}._dialogClose_4cnmf_570:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._dialogDescription_4cnmf_583{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:13px}._dialogBody_4cnmf_589{flex-direction:column;gap:12px;display:flex}._confirmDialogActions_4cnmf_595{justify-content:flex-end;gap:8px;display:flex}._tooltipContent_4cnmf_605{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-status);background-color:var(--tc-text);max-width:240px;color:var(--tc-canvas);overflow-wrap:anywhere;padding:6px 10px;font-size:12px}._tooltipArrow_4cnmf_616{fill:var(--tc-text)}._stateSurface_4cnmf_624{flex-direction:column;padding:4px 0;display:flex}._stateSurfaceSkeleton_4cnmf_630{flex-direction:column;gap:8px;padding:4px 0;display:flex}._skeletonBlock_4cnmf_637{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);height:12px}._stateSurfaceMessage_4cnmf_643{flex-direction:column;flex:1;justify-content:center;align-items:flex-start;gap:12px;padding:16px;display:flex}._stateSurfaceMessageGroup_4cnmf_656{flex-direction:column;gap:4px;display:flex}._stateSurfaceMessageTitle_4cnmf_662{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px;font-weight:500}._stateSurfaceMessageText_4cnmf_670{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:13px}._stateSurfaceErrorText_4cnmf_677{color:var(--tc-error)}._stateSurfaceAction_4cnmf_681{display:flex}._toastViewport_4cnmf_689{z-index:var(--tc-z-toast);flex-direction:column;gap:8px;width:320px;max-width:calc(100vw - 32px);margin:0;padding:0;display:flex;position:fixed;bottom:16px;right:16px}._toastRoot_4cnmf_703{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-status);background-color:var(--tc-surface);flex-direction:column;gap:4px;padding:12px 36px 12px 12px;display:flex;position:relative}._toastTitle_4cnmf_714{color:var(--tc-text);overflow-wrap:anywhere;font-size:13px;font-weight:600}._toastDescription_4cnmf_721{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._toastClose_4cnmf_727{border-radius:var(--tc-radius-status);width:22px;height:22px;color:var(--tc-text-muted);position:absolute;top:8px;right:8px}._toastClose_4cnmf_727:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._toastSuccess_4cnmf_742{border-color:var(--tc-success)}._toastSuccess_4cnmf_742 ._toastTitle_4cnmf_714{color:var(--tc-success)}._toastError_4cnmf_750{border-color:var(--tc-error)}._toastError_4cnmf_750 ._toastTitle_4cnmf_714{color:var(--tc-error)}._virtualList_4cnmf_762{position:relative;overflow-y:auto}._virtualListSizer_4cnmf_767{width:100%;position:relative}._virtualListItem_4cnmf_772{width:100%;position:absolute;top:0;left:0}._promptTagChip_4cnmf_783{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-status);background-color:var(--tc-surface);max-width:100%;color:var(--tc-text-muted);align-items:stretch;font-size:12px;display:inline-flex}._promptTagChip_4cnmf_783[data-enabled]{color:var(--tc-text)}._promptTagTrigger_4cnmf_798{min-width:0;color:inherit;white-space:nowrap;text-overflow:ellipsis;background:0 0;border:0;padding:4px 8px;overflow:hidden}._promptTagToggle_4cnmf_809{border:0;border-left:1px solid var(--tc-divider);color:var(--tc-text-muted);background:0 0;align-items:center;padding:0 6px;display:inline-flex}._promptTagToggle_4cnmf_809[aria-pressed=true]{color:var(--tc-accent)}._promptTagContent_4cnmf_823{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:min(420px,90vw);max-height:360px;padding:4px;overflow-y:auto}._promptTagGroup_4cnmf_834+._promptTagGroup_4cnmf_834{border-top:1px solid var(--tc-divider);margin-top:4px}._promptTagGroupTitle_4cnmf_839{color:var(--tc-text-muted);margin:0;padding:6px 8px 2px;font-size:12px;font-weight:600}._promptTagOption_4cnmf_847{border-radius:var(--tc-radius-status);width:100%;color:var(--tc-text);text-align:left;background:0 0;border:0;flex-direction:column;gap:2px;padding:6px 8px;display:flex}._promptTagOption_4cnmf_847:hover,._promptTagOption_4cnmf_847[aria-pressed=true]{background-color:var(--tc-surface-raised)}._promptTagOptionLabel_4cnmf_865{align-items:center;gap:4px;font-size:13px;display:inline-flex}._promptTagOptionText_4cnmf_872{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._promptTagOptionTextClamped_4cnmf_878{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}");
var $ = Ft, It = [
	"type",
	"disabled",
	"aria-busy",
	"aria-label"
], Lt = /* @__PURE__ */ F({
	__name: "AppButton",
	props: {
		label: {},
		icon: { default: void 0 },
		variant: { default: "secondary" },
		pending: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: { default: "button" }
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = {
			primary: $.appButtonPrimary,
			secondary: $.appButtonSecondary,
			destructive: $.appButtonDestructive
		}, a = A(() => i[n.variant]), o = A(() => n.disabled || n.pending);
		function s(e) {
			o.value || r("click", e);
		}
		return (t, n) => (c(), g("button", {
			type: e.type,
			class: N(["tc-interactive", [y($).appButton, a.value]]),
			disabled: o.value,
			"aria-busy": e.pending,
			"aria-label": e.label,
			onClick: s
		}, [D("span", {
			class: N([y($).appButtonContent, e.pending && y($).appButtonContentPending]),
			"aria-hidden": "true"
		}, [e.icon ? (c(), T(L, {
			key: 0,
			icon: e.icon,
			size: 16
		}, null, 8, ["icon"])) : w("", !0), D("span", { class: N(y($).appButtonLabel) }, j(e.label), 3)], 2), e.pending ? (c(), g("span", {
			key: 0,
			class: N(y($).appButtonSpinner),
			"aria-hidden": "true"
		}, [I(L, {
			icon: y(Ee),
			size: 16
		}, null, 8, ["icon"])], 2)) : w("", !0)], 10, It));
	}
}), Rt = /* @__PURE__ */ F({
	__name: "StateSurface",
	props: {
		status: {},
		minHeight: { default: "160px" },
		emptyTitle: { default: "" },
		emptyMessage: { default: "" },
		errorMessage: { default: "" }
	},
	setup(e) {
		return (t, n) => (c(), g("div", {
			class: N(y($).stateSurface),
			style: C({ minHeight: e.minHeight })
		}, [e.status === "loading" ? (c(), g("div", {
			key: 0,
			class: N(y($).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [o(t.$slots, "skeleton", {}, () => [
			D("div", {
				class: N(y($).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			D("div", {
				class: N(y($).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			D("div", {
				class: N(y($).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : e.status === "empty" ? (c(), g("div", {
			key: 1,
			class: N(y($).stateSurfaceMessage)
		}, [D("div", { class: N(y($).stateSurfaceMessageGroup) }, [e.emptyTitle ? (c(), g("p", {
			key: 0,
			class: N(y($).stateSurfaceMessageTitle)
		}, j(e.emptyTitle), 3)) : w("", !0), e.emptyMessage ? (c(), g("p", {
			key: 1,
			class: N(y($).stateSurfaceMessageText)
		}, j(e.emptyMessage), 3)) : w("", !0)], 2), t.$slots.action ? (c(), g("div", {
			key: 0,
			class: N(y($).stateSurfaceAction)
		}, [o(t.$slots, "action")], 2)) : w("", !0)], 2)) : e.status === "error" ? (c(), g("div", {
			key: 2,
			class: N(y($).stateSurfaceMessage),
			role: "alert"
		}, [D("p", { class: N([y($).stateSurfaceMessageText, y($).stateSurfaceErrorText]) }, j(e.errorMessage), 3), t.$slots.action ? (c(), g("div", {
			key: 0,
			class: N(y($).stateSurfaceAction)
		}, [o(t.$slots, "action")], 2)) : w("", !0)], 2)) : o(t.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
//#region src/ui/components/_prop_utils.ts
function zt(e) {
	let t = {};
	for (let n of Object.keys(e)) {
		let r = e[n];
		r !== void 0 && (t[n] = r);
	}
	return t;
}
//#endregion
//#region src/ui/components/AppSelect.vue
var Bt = /* @__PURE__ */ F({
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
	setup(e, { emit: i }) {
		let a = e, o = i;
		function s(e) {
			o("update:modelValue", e);
		}
		let l = f(te, void 0), u = A(() => l ? { to: l } : {}), d = A(() => zt({
			id: a.id,
			"aria-describedby": a.describedBy,
			"aria-label": a.ariaLabel
		})), p = A(() => zt({ modelValue: a.modelValue }));
		return (i, a) => (c(), T(y(pt), n(p.value, {
			disabled: e.disabled,
			"onUpdate:modelValue": s
		}), {
			default: m(() => [I(y(Mt), n(d.value, { class: ["tc-interactive", y($).selectTrigger] }), {
				default: m(() => [I(y(Nt), {
					class: N(y($).selectValue),
					placeholder: e.placeholder
				}, null, 8, ["class", "placeholder"]), I(y(Tt), { "as-child": "" }, {
					default: m(() => [I(L, {
						icon: y(re),
						size: 16
					}, null, 8, ["icon"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["class"]), I(y(jt), x(t(u.value)), {
				default: m(() => [I(y(wt), {
					class: N(y($).selectContent),
					"side-offset": 4,
					position: "popper"
				}, {
					default: m(() => [I(y(Pt), { class: N(y($).selectViewport) }, {
						default: m(() => [(c(!0), g(M, null, r(e.options, (e) => (c(), T(y(Ot), {
							key: e.value,
							class: N(y($).selectItem),
							value: e.value
						}, {
							default: m(() => [I(y(At), { class: N(y($).selectItemText) }, {
								default: m(() => [P(j(e.label), 1)]),
								_: 2
							}, 1032, ["class"]), I(y(kt), { class: N(y($).selectItemIndicator) }, {
								default: m(() => [I(L, {
									icon: y(Te),
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
export { Te as C, Ee as S, Fe as _, $ as a, je as b, nt as c, Qe as d, Ze as f, Ie as g, q as h, Lt as i, tt as l, Ve as m, zt as n, at as o, He as p, Rt as r, Y as s, Bt as t, et as u, Ne as v, ke as x, Ae as y };
