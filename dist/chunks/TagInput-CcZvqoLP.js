import { E as e, I as t, J as n, M as r, P as i, R as a, S as o, U as ee, _t as s, b as c, d as l, ft as u, g as d, h as f, ht as p, it as m, j as h, l as g, m as _, mt as v, n as te, v as y, w as b, y as x, z as S } from "./vue-i18n-BQWz_HuU.js";
import { i as C, n as w } from "./portal_keys-DthxrmWp.js";
import { t as T } from "./AppIcon-B1iv8vRB.js";
import { t as E } from "./components_styles-Cab5IILs.js";
import { t as ne } from "./x-CZeKQbKW.js";
import { f as D } from "./Teleport-B2amidH8.js";
import { r as O } from "./AppTooltip-DuggrS-8.js";
import { i as k, n as re, r as A, t as ie } from "./PopoverPortal-CDsj-yHu.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverAnchor.js
var ae = /* @__PURE__ */ o({
	__name: "PopoverAnchor",
	props: {
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
			required: !1
		}
	},
	setup(e) {
		let r = e;
		D();
		let a = k();
		return h(() => {
			a.hasCustomAnchor.value = !0;
		}), i(() => {
			a.hasCustomAnchor.value = !1;
		}), (e, i) => (t(), d(u(O), p(b(r)), {
			default: n(() => [S(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), oe = ["aria-label", "onClick"], j = [
	"id",
	"value",
	"placeholder",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-describedby"
], M = ["aria-label"], N = [
	"id",
	"aria-selected",
	"onMousedown",
	"onMousemove"
], P = 150, F = /* @__PURE__ */ o({
	__name: "TagInput",
	props: {
		modelValue: {},
		id: { default: void 0 },
		describedBy: { default: void 0 }
	},
	emits: ["update:modelValue"],
	setup(i, { emit: o }) {
		let h = /[,，]/u, S = /[぀-ヿ㐀-鿿豈-﫿]/u, D = i, O = o, { t: k, locale: F } = te(), I = e(C, null), L = e(w, void 0), se = _(() => L ? { to: L } : {}), R = `${ee()}-suggestions`, z = m(null), B = m(""), V = m([]), H = m(0), U = null, W = 0, G = _(() => [...new Set(D.modelValue.split(h).map((e) => e.trim()).filter((e) => e !== ""))]), K = _(() => V.value.length > 0), ce = _(() => new Intl.NumberFormat(F.value, {
			notation: "compact",
			maximumFractionDigits: 1
		}));
		function q(e) {
			O("update:modelValue", [...new Set(e)].join(", "));
		}
		function J(e) {
			let t = e.map((e) => e.trim()).filter((e) => e !== "");
			t.length > 0 && q([...G.value, ...t]);
		}
		function le(e) {
			q(G.value.filter((t) => t !== e)), z.value?.focus();
		}
		function Y() {
			W += 1, U !== null && (clearTimeout(U), U = null), V.value = [], H.value = 0;
		}
		function ue() {
			let e = B.value.trim(), t = S.test(e) ? e.length >= 1 : e.length >= 2;
			if (I === null || !t) {
				Y();
				return;
			}
			U !== null && clearTimeout(U);
			let n = ++W;
			U = setTimeout(() => {
				I.suggest(e).then((e) => {
					n === W && (V.value = (e ?? []).filter((e) => !G.value.includes(e.tag)), H.value = 0);
				});
			}, P);
		}
		function X(e) {
			let t = e.target.value.split(h), n = t.pop() ?? "";
			J(t), B.value = t.length > 0 ? n.trimStart() : n, ue();
		}
		function Z() {
			J([B.value]), B.value = "", Y();
		}
		function Q(e) {
			let t = V.value[e];
			t !== void 0 && (J([t.tag]), B.value = "", Y(), z.value?.focus());
		}
		function de(e) {
			let t = V.value.length;
			if ((e.key === "ArrowDown" || e.key === "ArrowUp") && t > 0) {
				e.preventDefault();
				let n = e.key === "ArrowDown" ? 1 : -1;
				H.value = (H.value + n + t) % t;
			} else e.key === "Enter" ? (e.preventDefault(), t > 0 ? Q(H.value) : Z()) : e.key === "Escape" && t > 0 ? (e.stopPropagation(), Y()) : e.key === "Backspace" && B.value === "" && G.value.length > 0 && q(G.value.slice(0, -1));
		}
		function $(e) {
			let t = B.value.trim().toLowerCase();
			return e.toLowerCase().startsWith(t) && t !== "" ? [e.slice(0, t.length), e.slice(t.length)] : ["", e];
		}
		function fe(e) {
			e.target instanceof Node && z.value?.parentElement?.contains(e.target) && e.preventDefault();
		}
		return r(Y), (e, r) => (t(), d(u(A), {
			open: K.value,
			"onUpdate:open": r[4] ||= (e) => !e && Y()
		}, {
			default: n(() => [c(u(ae), { "as-child": "" }, {
				default: n(() => [f("div", {
					class: v(u(E).tagInput),
					onClick: r[0] ||= g((e) => z.value?.focus(), ["self"])
				}, [(t(!0), y(l, null, a(G.value, (e) => (t(), y("span", {
					key: e,
					class: v(u(E).tagInputChip)
				}, [x(s(e) + " ", 1), f("button", {
					type: "button",
					class: v(["tc-interactive", u(E).tagInputRemove]),
					"aria-label": u(k)("common.tag_input.remove", { tag: e }),
					onClick: (t) => le(e)
				}, [c(T, {
					icon: u(ne),
					size: 12
				}, null, 8, ["icon"])], 10, oe)], 2))), 128)), f("input", {
					id: i.id,
					ref_key: "input",
					ref: z,
					value: B.value,
					type: "text",
					autocomplete: "off",
					class: v(u(E).tagInputField),
					placeholder: u(k)("common.tag_input.placeholder"),
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-expanded": K.value,
					"aria-controls": K.value ? R : void 0,
					"aria-activedescendant": K.value ? `${R}-${H.value}` : void 0,
					"aria-describedby": i.describedBy,
					onInput: X,
					onKeydown: de,
					onBlur: Z
				}, null, 42, j)], 2)]),
				_: 1
			}), c(u(ie), p(b(se.value)), {
				default: n(() => [c(u(re), {
					class: v(u(E).tagInputPopover),
					side: "bottom",
					align: "start",
					"side-offset": 4,
					onOpenAutoFocus: r[1] ||= g(() => {}, ["prevent"]),
					onCloseAutoFocus: r[2] ||= g(() => {}, ["prevent"]),
					onPointerDownOutside: fe,
					onFocusOutside: r[3] ||= g(() => {}, ["prevent"])
				}, {
					default: n(() => [f("ul", {
						id: R,
						role: "listbox",
						"aria-label": u(k)("common.tag_input.suggestions_label"),
						class: v(u(E).tagInputList)
					}, [(t(!0), y(l, null, a(V.value, (e, n) => (t(), y("li", {
						id: `${R}-${n}`,
						key: e.tag,
						role: "option",
						"aria-selected": n === H.value,
						class: v(u(E).tagInputOption),
						onMousedown: g((e) => Q(n), ["prevent"]),
						onMousemove: (e) => H.value = n
					}, [
						f("span", { class: v(u(E).tagInputOptionTag) }, [f("b", null, s($(e.tag)[0]), 1), x(s($(e.tag)[1]), 1)], 2),
						f("span", { class: v(u(E).tagInputOptionTranslation) }, s(e.translation ?? ""), 3),
						f("span", { class: v([u(E).tagInputOptionCount, "tc-tabular-nums"]) }, s(ce.value.format(e.popularity)), 3)
					], 42, N))), 128))], 10, M), f("div", {
						class: v(u(E).tagInputHints),
						"aria-hidden": "true"
					}, [
						f("span", null, [
							r[5] ||= f("kbd", null, "↑", -1),
							r[6] ||= x(),
							r[7] ||= f("kbd", null, "↓", -1),
							x(" " + s(u(k)("common.tag_input.hint_select")), 1)
						]),
						f("span", null, [r[8] ||= f("kbd", null, "Enter", -1), x(" " + s(u(k)("common.tag_input.hint_add")), 1)]),
						f("span", null, [r[9] ||= f("kbd", null, "Esc", -1), x(" " + s(u(k)("common.tag_input.hint_close")), 1)])
					], 2)]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 8, ["open"]));
	}
});
//#endregion
export { F as t };
