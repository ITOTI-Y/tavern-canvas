import { n as e, t } from "./prompt_tags-CAoIz8Hm.js";
import { C as n, F as r, N as i, T as a, W as o, _ as s, ct as c, dt as l, g as u, h as d, m as f, n as p, p as m, pt as h, u as g, ut as _, v, x as y, y as b } from "./vue-i18n-DUz2Gjn8.js";
import { n as x } from "./portal_keys-B9C82xtk.js";
import { n as S, t as C } from "./AppIcon-Cnhzrx9o.js";
import { t as w } from "./check-BhrVRbkS.js";
import { t as T } from "./components_styles-AQk4evuq.js";
import { i as E, n as D, r as O, t as k } from "./PopoverTrigger-CZT9XAF0.js";
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
]), M = S("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]), N = ["data-enabled"], P = ["aria-pressed", "onClick"], F = ["aria-pressed", "aria-label"], I = /* @__PURE__ */ y({
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
		let p = e, y = t, S = a(x, void 0), A = m(() => S ? { to: S } : {}), j = m(() => p.presets.find((e) => e.id === p.choice.preset_id)), M = m(() => {
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
		return (t, a) => (i(), s("div", {
			class: _(c(T).promptTagChip),
			"data-enabled": e.choice.enabled ? "" : void 0
		}, [b(c(E), null, {
			default: o(() => [b(c(k), { class: _(["tc-interactive", c(T).promptTagTrigger]) }, {
				default: o(() => [v(h(e.prefix) + h(M.value), 1)]),
				_: 1
			}, 8, ["class"]), b(c(D), l(n(A.value)), {
				default: o(() => [b(c(O), {
					class: _(c(T).promptTagContent),
					"side-offset": 4,
					align: "end",
					"data-testid": "prompt-tag-list"
				}, {
					default: o(() => [(i(!0), s(g, null, r(I.value, (t) => (i(), s("section", {
						key: t.label,
						class: _(c(T).promptTagGroup)
					}, [f("h4", { class: _(c(T).promptTagGroupTitle) }, h(t.label), 3), (i(!0), s(g, null, r(t.presets, (t) => (i(), s("button", {
						key: t.id,
						type: "button",
						class: _(["tc-interactive", c(T).promptTagOption]),
						"aria-pressed": t.id === e.choice.preset_id,
						onClick: (e) => L(t)
					}, [f("span", { class: _(c(T).promptTagOptionLabel) }, [v(h(t.label) + " ", 1), t.id === e.choice.preset_id ? (i(), d(C, {
						key: 0,
						icon: c(w),
						size: 14
					}, null, 8, ["icon"])) : u("", !0)], 2), f("span", { class: _([c(T).promptTagOptionText, t.kind === "undesired_content" && c(T).promptTagOptionTextClamped]) }, h(t.text), 3)], 10, P))), 128))], 2))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}), f("button", {
			type: "button",
			class: _(["tc-interactive", c(T).promptTagToggle]),
			"aria-pressed": e.choice.enabled,
			"aria-label": e.choice.enabled ? e.disableLabel : e.enableLabel,
			onClick: R
		}, [b(C, {
			icon: c(w),
			size: 14
		}, null, 8, ["icon"])], 10, F)], 10, N));
	}
}), L = /* @__PURE__ */ y({
	__name: "PromptTagChips",
	props: {
		port: {},
		kind: {}
	},
	setup(n) {
		let r = n, { t: a } = p(), o = m(() => e(r.port.custom_presets).filter((e) => e.kind === r.kind)), s = m(() => r.port.profile === null ? null : t(r.port.profile));
		function l(e) {
			let t = r.port.profile;
			t !== null && s.value !== null && r.port.save(t.id, {
				...s.value,
				[r.kind]: e
			});
		}
		return (e, t) => s.value === null ? u("", !0) : (i(), d(I, {
			key: 0,
			prefix: n.kind === "quality" ? c(a)("prompt_tags.quality_prefix") : c(a)("prompt_tags.undesired_prefix"),
			choice: s.value[n.kind],
			presets: o.value,
			"custom-group-label": c(a)("prompt_tags.custom_group"),
			"missing-label": c(a)("prompt_tags.missing"),
			"enable-label": c(a)("prompt_tags.enable"),
			"disable-label": c(a)("prompt_tags.disable"),
			"data-testid": `prompt-tag-chip-${n.kind}`,
			"onUpdate:choice": l
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
export { A as i, M as n, j as r, L as t };
