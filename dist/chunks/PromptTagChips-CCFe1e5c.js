import { n as e, t } from "./prompt_tags-CAoIz8Hm.js";
import { C as n, G as r, I as i, P as a, T as o, _ as s, dt as c, ft as l, g as u, h as d, lt as f, m as p, mt as m, n as h, p as g, u as _, v, x as y, y as b } from "./vue-i18n-L-BrQRnK.js";
import { n as x } from "./portal_keys-DthxrmWp.js";
import { n as S, t as C } from "./AppIcon-DkyxvN8k.js";
import { r as w } from "./StateSurface-DkfG2xGX.js";
import { t as T } from "./components_styles-D-hVkM2e.js";
import { n as E, r as D, t as O } from "./PopoverPortal-CT9mA2k4.js";
import { t as k } from "./PopoverTrigger-DiboJhkH.js";
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
		let h = e, y = t, S = o(x, void 0), A = g(() => S ? { to: S } : {}), j = g(() => h.presets.find((e) => e.id === h.choice.preset_id)), F = g(() => {
			let e = j.value;
			return e === void 0 ? h.missingLabel : e.group === null ? e.label : `${e.label} · ${e.group}`;
		}), I = g(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of h.presets) {
				let n = t.group ?? h.customGroupLabel;
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
				...h.choice,
				enabled: !h.choice.enabled
			});
		}
		return (t, o) => (a(), s("div", {
			class: c(f(T).promptTagChip),
			"data-enabled": e.choice.enabled ? "" : void 0
		}, [b(f(D), null, {
			default: r(() => [b(f(k), { class: c(["tc-interactive", f(T).promptTagTrigger]) }, {
				default: r(() => [v(m(e.prefix) + m(F.value), 1)]),
				_: 1
			}, 8, ["class"]), b(f(O), l(n(A.value)), {
				default: r(() => [b(f(E), {
					class: c(f(T).promptTagContent),
					"side-offset": 4,
					align: "end",
					"data-testid": "prompt-tag-list"
				}, {
					default: r(() => [(a(!0), s(_, null, i(I.value, (t) => (a(), s("section", {
						key: t.label,
						class: c(f(T).promptTagGroup)
					}, [p("h4", { class: c(f(T).promptTagGroupTitle) }, m(t.label), 3), (a(!0), s(_, null, i(t.presets, (t) => (a(), s("button", {
						key: t.id,
						type: "button",
						class: c(["tc-interactive", f(T).promptTagOption]),
						"aria-pressed": t.id === e.choice.preset_id,
						onClick: (e) => L(t)
					}, [p("span", { class: c(f(T).promptTagOptionLabel) }, [v(m(t.label) + " ", 1), t.id === e.choice.preset_id ? (a(), d(C, {
						key: 0,
						icon: f(w),
						size: 14
					}, null, 8, ["icon"])) : u("", !0)], 2), p("span", { class: c([f(T).promptTagOptionText, t.kind === "undesired_content" && f(T).promptTagOptionTextClamped]) }, m(t.text), 3)], 10, N))), 128))], 2))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}), p("button", {
			type: "button",
			class: c(["tc-interactive", f(T).promptTagToggle]),
			"aria-pressed": e.choice.enabled,
			"aria-label": e.choice.enabled ? e.disableLabel : e.enableLabel,
			onClick: R
		}, [b(C, {
			icon: f(w),
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
		let r = n, { t: i } = h(), o = g(() => e(r.port.custom_presets).filter((e) => e.kind === r.kind)), s = g(() => r.port.profile === null ? null : t(r.port.profile));
		function c(e) {
			let t = r.port.profile;
			t !== null && s.value !== null && r.port.save(t.id, {
				...s.value,
				[r.kind]: e
			});
		}
		return (e, t) => s.value === null ? u("", !0) : (a(), d(F, {
			key: 0,
			prefix: n.kind === "quality" ? f(i)("prompt_tags.quality_prefix") : f(i)("prompt_tags.undesired_prefix"),
			choice: s.value[n.kind],
			presets: o.value,
			"custom-group-label": f(i)("prompt_tags.custom_group"),
			"missing-label": f(i)("prompt_tags.missing"),
			"enable-label": f(i)("prompt_tags.enable"),
			"disable-label": f(i)("prompt_tags.disable"),
			"data-testid": `prompt-tag-chip-${n.kind}`,
			"onUpdate:choice": c
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
