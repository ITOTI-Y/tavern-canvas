import { A as e, C as t, F as n, H as r, L as i, N as a, R as o, T as s, _ as c, c as l, dt as u, gt as d, h as f, j as p, m, mt as h, n as g, p as _, pt as v, q as y, rt as b, u as x, v as S, x as C, y as w } from "./vue-i18n-XoxYzLIP.js";
import { a as T, r as E } from "./portal_keys-CIBE-_PC.js";
import { t as D } from "./AppIcon-DD754F_c.js";
import { t as O } from "./components_styles-CTlfgDU5.js";
import { t as ee } from "./x-CyHrRl6n.js";
import { f as k } from "./Teleport-zHbQRGnp.js";
import { r as A } from "./AppTooltip-D3BiEM01.js";
import { i as j, n as te, r as M, t as N } from "./PopoverPortal-CubTQ6nq.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverAnchor.js
var ne = /* @__PURE__ */ C({
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
	setup(r) {
		let i = r;
		k();
		let s = j();
		return e(() => {
			s.hasCustomAnchor.value = !0;
		}), a(() => {
			s.hasCustomAnchor.value = !1;
		}), (e, r) => (n(), f(u(A), h(t(i)), {
			default: y(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), re = ["aria-label", "onClick"], ie = [
	"id",
	"value",
	"placeholder",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-describedby"
], ae = ["aria-label"], P = [
	"id",
	"aria-selected",
	"onMousedown",
	"onMousemove"
], F = 150, I = /* @__PURE__ */ C({
	__name: "TagInput",
	props: {
		modelValue: {},
		id: { default: void 0 },
		describedBy: { default: void 0 }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: a }) {
		let o = /[,，]/u, C = /[぀-ヿ㐀-鿿豈-﫿]/u, k = e, A = a, { t: j, locale: I } = g(), L = s(T, null), R = s(E, void 0), oe = _(() => R ? { to: R } : {}), z = `${r()}-suggestions`, B = b(null), V = b(""), H = b([]), U = b(0), W = null, G = 0, K = _(() => [...new Set(k.modelValue.split(o).map((e) => e.trim()).filter((e) => e !== ""))]), q = _(() => H.value.length > 0), se = _(() => new Intl.NumberFormat(I.value, {
			notation: "compact",
			maximumFractionDigits: 1
		}));
		function J(e) {
			A("update:modelValue", [...new Set(e)].join(", "));
		}
		function Y(e) {
			let t = e.map((e) => e.trim()).filter((e) => e !== "");
			t.length > 0 && J([...K.value, ...t]);
		}
		function ce(e) {
			J(K.value.filter((t) => t !== e)), B.value?.focus();
		}
		function X() {
			G += 1, W !== null && (clearTimeout(W), W = null), H.value = [], U.value = 0;
		}
		function le() {
			let e = V.value.trim(), t = C.test(e) ? e.length >= 1 : e.length >= 2;
			if (L === null || !t) {
				X();
				return;
			}
			W !== null && clearTimeout(W);
			let n = ++G;
			W = setTimeout(() => {
				L.suggest(e).then((e) => {
					n === G && (H.value = (e ?? []).filter((e) => !K.value.includes(e.tag)), U.value = 0);
				});
			}, F);
		}
		function ue(e) {
			let t = e.target.value.split(o), n = t.pop() ?? "";
			Y(t), V.value = t.length > 0 ? n.trimStart() : n, le();
		}
		function Z() {
			Y([V.value]), V.value = "", X();
		}
		function Q(e) {
			let t = H.value[e];
			t !== void 0 && (Y([t.tag]), V.value = "", X(), B.value?.focus());
		}
		function de(e) {
			let t = H.value.length;
			if ((e.key === "ArrowDown" || e.key === "ArrowUp") && t > 0) {
				e.preventDefault();
				let n = e.key === "ArrowDown" ? 1 : -1;
				U.value = (U.value + n + t) % t;
			} else e.key === "Enter" ? (e.preventDefault(), t > 0 ? Q(U.value) : Z()) : e.key === "Escape" && t > 0 ? (e.stopPropagation(), X()) : e.key === "Backspace" && V.value === "" && K.value.length > 0 && J(K.value.slice(0, -1));
		}
		function $(e) {
			let t = V.value.trim().toLowerCase();
			return e.toLowerCase().startsWith(t) && t !== "" ? [e.slice(0, t.length), e.slice(t.length)] : ["", e];
		}
		function fe(e) {
			e.target instanceof Node && B.value?.parentElement?.contains(e.target) && e.preventDefault();
		}
		return p(X), (r, a) => (n(), f(u(M), {
			open: q.value,
			"onUpdate:open": a[4] ||= (e) => !e && X()
		}, {
			default: y(() => [w(u(ne), { "as-child": "" }, {
				default: y(() => [m("div", {
					class: v(u(O).tagInput),
					onClick: a[0] ||= l((e) => B.value?.focus(), ["self"])
				}, [(n(!0), c(x, null, i(K.value, (e) => (n(), c("span", {
					key: e,
					class: v(u(O).tagInputChip)
				}, [S(d(e) + " ", 1), m("button", {
					type: "button",
					class: v(["tc-interactive", u(O).tagInputRemove]),
					"aria-label": u(j)("common.tag_input.remove", { tag: e }),
					onClick: (t) => ce(e)
				}, [w(D, {
					icon: u(ee),
					size: 12
				}, null, 8, ["icon"])], 10, re)], 2))), 128)), m("input", {
					id: e.id,
					ref_key: "input",
					ref: B,
					value: V.value,
					type: "text",
					autocomplete: "off",
					class: v(u(O).tagInputField),
					placeholder: u(j)("common.tag_input.placeholder"),
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-expanded": q.value,
					"aria-controls": q.value ? z : void 0,
					"aria-activedescendant": q.value ? `${z}-${U.value}` : void 0,
					"aria-describedby": e.describedBy,
					onInput: ue,
					onKeydown: de,
					onBlur: Z
				}, null, 42, ie)], 2)]),
				_: 1
			}), w(u(N), h(t(oe.value)), {
				default: y(() => [w(u(te), {
					class: v(u(O).tagInputPopover),
					side: "bottom",
					align: "start",
					"side-offset": 4,
					onOpenAutoFocus: a[1] ||= l(() => {}, ["prevent"]),
					onCloseAutoFocus: a[2] ||= l(() => {}, ["prevent"]),
					onPointerDownOutside: fe,
					onFocusOutside: a[3] ||= l(() => {}, ["prevent"])
				}, {
					default: y(() => [m("ul", {
						id: z,
						role: "listbox",
						"aria-label": u(j)("common.tag_input.suggestions_label"),
						class: v(u(O).tagInputList)
					}, [(n(!0), c(x, null, i(H.value, (e, t) => (n(), c("li", {
						id: `${z}-${t}`,
						key: e.tag,
						role: "option",
						"aria-selected": t === U.value,
						class: v(u(O).tagInputOption),
						onMousedown: l((e) => Q(t), ["prevent"]),
						onMousemove: (e) => U.value = t
					}, [
						m("span", { class: v(u(O).tagInputOptionTag) }, [m("b", null, d($(e.tag)[0]), 1), S(d($(e.tag)[1]), 1)], 2),
						m("span", { class: v(u(O).tagInputOptionTranslation) }, d(e.translation ?? ""), 3),
						m("span", { class: v([u(O).tagInputOptionCount, "tc-tabular-nums"]) }, d(se.value.format(e.popularity)), 3)
					], 42, P))), 128))], 10, ae), m("div", {
						class: v(u(O).tagInputHints),
						"aria-hidden": "true"
					}, [
						m("span", null, [
							a[5] ||= m("kbd", null, "↑", -1),
							a[6] ||= S(),
							a[7] ||= m("kbd", null, "↓", -1),
							S(" " + d(u(j)("common.tag_input.hint_select")), 1)
						]),
						m("span", null, [a[8] ||= m("kbd", null, "Enter", -1), S(" " + d(u(j)("common.tag_input.hint_add")), 1)]),
						m("span", null, [a[9] ||= m("kbd", null, "Esc", -1), S(" " + d(u(j)("common.tag_input.hint_close")), 1)])
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
export { I as t };
