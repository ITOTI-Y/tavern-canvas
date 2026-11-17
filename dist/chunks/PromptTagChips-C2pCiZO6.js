import { n as e, t } from "./prompt_tags-CAoIz8Hm.js";
import { C as n, F as r, L as i, T as a, _ as o, dt as s, g as c, gt as l, h as u, m as d, mt as f, n as p, p as m, pt as h, q as g, u as _, v, x as y, y as b } from "./vue-i18n-XoxYzLIP.js";
import { r as x } from "./portal_keys-CIBE-_PC.js";
import { n as S, t as C } from "./AppIcon-DD754F_c.js";
import { r as w, t as T } from "./components_styles-COPsMRS_.js";
import { n as E, r as D, t as O } from "./PopoverPortal-CKwmxxi6.js";
import { t as k } from "./PopoverTrigger-DmYlsUyQ.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/book-open-text.js
var A = S("book-open-text", [
	["path", {
		d: "M12 7v14",
		key: "1akyts"
	}],
	["path", {
		d: "M16 12h2",
		key: "7q9ll5"
	}],
	["path", {
		d: "M16 8h2",
		key: "msurwy"
	}],
	["path", {
		d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
		key: "ruj8y"
	}],
	["path", {
		d: "M6 12h2",
		key: "32wvfc"
	}],
	["path", {
		d: "M6 8h2",
		key: "30oboj"
	}]
]), j = S("languages", [
	["path", {
		d: "m5 8 6 6",
		key: "1wu5hv"
	}],
	["path", {
		d: "m4 14 6-6 2-3",
		key: "1k1g8d"
	}],
	["path", {
		d: "M2 5h12",
		key: "or177f"
	}],
	["path", {
		d: "M7 2h1",
		key: "1t2jsx"
	}],
	["path", {
		d: "m22 22-5-10-5 10",
		key: "don7ne"
	}],
	["path", {
		d: "M14 18h6",
		key: "1m8k6r"
	}]
]), M = ["data-enabled"], N = ["aria-pressed", "onClick"], P = ["aria-pressed", "aria-label"], F = /* @__PURE__ */ y({
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
		let p = e, y = t, S = a(x, void 0), A = m(() => S ? { to: S } : {}), j = m(() => p.presets.find((e) => e.id === p.choice.preset_id)), F = m(() => {
			let e = j.value;
			return e === void 0 ? p.missingLabel : e.group === null ? e.label : `${e.label} · ${e.group}`;
		}), I = m(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of p.presets) {
				let n = t.group ?? p.customGroupLabel;
				e.set(n, [...e.get(n) ?? [], t]);
			}
			return [...e.entries()].map(([e, t]) => ({
				label: e,
				presets: t
			}));
		});
		function L(e) {
			y("update:choice", {
				enabled: !0,
				preset_id: e.id
			});
		}
		function R() {
			y("update:choice", {
				...p.choice,
				enabled: !p.choice.enabled
			});
		}
		return (t, a) => (r(), o("div", {
			class: h(s(T).promptTagChip),
			"data-enabled": e.choice.enabled ? "" : void 0
		}, [b(s(D), null, {
			default: g(() => [b(s(k), { class: h(["tc-interactive", s(T).promptTagTrigger]) }, {
				default: g(() => [v(l(e.prefix) + l(F.value), 1)]),
				_: 1
			}, 8, ["class"]), b(s(O), f(n(A.value)), {
				default: g(() => [b(s(E), {
					class: h(s(T).promptTagContent),
					"side-offset": 4,
					align: "end",
					"data-testid": "prompt-tag-list"
				}, {
					default: g(() => [(r(!0), o(_, null, i(I.value, (t) => (r(), o("section", {
						key: t.label,
						class: h(s(T).promptTagGroup)
					}, [d("h4", { class: h(s(T).promptTagGroupTitle) }, l(t.label), 3), (r(!0), o(_, null, i(t.presets, (t) => (r(), o("button", {
						key: t.id,
						type: "button",
						class: h(["tc-interactive", s(T).promptTagOption]),
						"aria-pressed": t.id === e.choice.preset_id,
						onClick: (e) => L(t)
					}, [d("span", { class: h(s(T).promptTagOptionLabel) }, [v(l(t.label) + " ", 1), t.id === e.choice.preset_id ? (r(), u(C, {
						key: 0,
						icon: s(w),
						size: 14
					}, null, 8, ["icon"])) : c("", !0)], 2), d("span", { class: h([s(T).promptTagOptionText, t.kind === "undesired_content" && s(T).promptTagOptionTextClamped]) }, l(t.text), 3)], 10, N))), 128))], 2))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}), d("button", {
			type: "button",
			class: h(["tc-interactive", s(T).promptTagToggle]),
			"aria-pressed": e.choice.enabled,
			"aria-label": e.choice.enabled ? e.disableLabel : e.enableLabel,
			onClick: R
		}, [b(C, {
			icon: s(w),
			size: 14
		}, null, 8, ["icon"])], 10, P)], 10, M));
	}
}), I = /* @__PURE__ */ y({
	__name: "PromptTagChips",
	props: {
		port: {},
		kind: {}
	},
	setup(n) {
		let i = n, { t: a } = p(), o = m(() => e(i.port.custom_presets).filter((e) => e.kind === i.kind)), l = m(() => i.port.profile === null ? null : t(i.port.profile));
		function d(e) {
			let t = i.port.profile;
			t !== null && l.value !== null && i.port.save(t.id, {
				...l.value,
				[i.kind]: e
			});
		}
		return (e, t) => l.value === null ? c("", !0) : (r(), u(F, {
			key: 0,
			prefix: n.kind === "quality" ? s(a)("prompt_tags.quality_prefix") : s(a)("prompt_tags.undesired_prefix"),
			choice: l.value[n.kind],
			presets: o.value,
			"custom-group-label": s(a)("prompt_tags.custom_group"),
			"missing-label": s(a)("prompt_tags.missing"),
			"enable-label": s(a)("prompt_tags.enable"),
			"disable-label": s(a)("prompt_tags.disable"),
			"data-testid": `prompt-tag-chip-${n.kind}`,
			"onUpdate:choice": d
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
export { j as n, A as r, I as t };
