import { n as e, t } from "./prompt_tags-CAoIz8Hm.js";
import { E as n, I as r, J as i, R as a, S as o, _ as s, _t as c, b as l, d as u, ft as d, g as f, h as p, ht as m, m as h, mt as g, n as _, v, w as y, y as b } from "./vue-i18n-BQWz_HuU.js";
import { n as x } from "./portal_keys-DthxrmWp.js";
import { n as S, t as C } from "./AppIcon-B1iv8vRB.js";
import { r as w } from "./StateSurface-Dxa4U6G6.js";
import { t as T } from "./components_styles-Cab5IILs.js";
import { n as E, r as D, t as O } from "./PopoverPortal-CDsj-yHu.js";
import { t as k } from "./PopoverTrigger-CtR9sgc0.js";
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
]), M = ["data-enabled"], N = ["aria-pressed", "onClick"], P = ["aria-pressed", "aria-label"], F = /* @__PURE__ */ o({
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
		let o = e, _ = t, S = n(x, void 0), A = h(() => S ? { to: S } : {}), j = h(() => o.presets.find((e) => e.id === o.choice.preset_id)), F = h(() => {
			let e = j.value;
			return e === void 0 ? o.missingLabel : e.group === null ? e.label : `${e.label} · ${e.group}`;
		}), I = h(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of o.presets) {
				let n = t.group ?? o.customGroupLabel;
				e.set(n, [...e.get(n) ?? [], t]);
			}
			return [...e.entries()].map(([e, t]) => ({
				label: e,
				presets: t
			}));
		});
		function L(e) {
			_("update:choice", {
				enabled: !0,
				preset_id: e.id
			});
		}
		function R() {
			_("update:choice", {
				...o.choice,
				enabled: !o.choice.enabled
			});
		}
		return (t, n) => (r(), v("div", {
			class: g(d(T).promptTagChip),
			"data-enabled": e.choice.enabled ? "" : void 0
		}, [l(d(D), null, {
			default: i(() => [l(d(k), { class: g(["tc-interactive", d(T).promptTagTrigger]) }, {
				default: i(() => [b(c(e.prefix) + c(F.value), 1)]),
				_: 1
			}, 8, ["class"]), l(d(O), m(y(A.value)), {
				default: i(() => [l(d(E), {
					class: g(d(T).promptTagContent),
					"side-offset": 4,
					align: "end",
					"data-testid": "prompt-tag-list"
				}, {
					default: i(() => [(r(!0), v(u, null, a(I.value, (t) => (r(), v("section", {
						key: t.label,
						class: g(d(T).promptTagGroup)
					}, [p("h4", { class: g(d(T).promptTagGroupTitle) }, c(t.label), 3), (r(!0), v(u, null, a(t.presets, (t) => (r(), v("button", {
						key: t.id,
						type: "button",
						class: g(["tc-interactive", d(T).promptTagOption]),
						"aria-pressed": t.id === e.choice.preset_id,
						onClick: (e) => L(t)
					}, [p("span", { class: g(d(T).promptTagOptionLabel) }, [b(c(t.label) + " ", 1), t.id === e.choice.preset_id ? (r(), f(C, {
						key: 0,
						icon: d(w),
						size: 14
					}, null, 8, ["icon"])) : s("", !0)], 2), p("span", { class: g([d(T).promptTagOptionText, t.kind === "undesired_content" && d(T).promptTagOptionTextClamped]) }, c(t.text), 3)], 10, N))), 128))], 2))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}), p("button", {
			type: "button",
			class: g(["tc-interactive", d(T).promptTagToggle]),
			"aria-pressed": e.choice.enabled,
			"aria-label": e.choice.enabled ? e.disableLabel : e.enableLabel,
			onClick: R
		}, [l(C, {
			icon: d(w),
			size: 14
		}, null, 8, ["icon"])], 10, P)], 10, M));
	}
}), I = /* @__PURE__ */ o({
	__name: "PromptTagChips",
	props: {
		port: {},
		kind: {}
	},
	setup(n) {
		let i = n, { t: a } = _(), o = h(() => e(i.port.custom_presets).filter((e) => e.kind === i.kind)), c = h(() => i.port.profile === null ? null : t(i.port.profile));
		function l(e) {
			let t = i.port.profile;
			t !== null && c.value !== null && i.port.save(t.id, {
				...c.value,
				[i.kind]: e
			});
		}
		return (e, t) => c.value === null ? s("", !0) : (r(), f(F, {
			key: 0,
			prefix: n.kind === "quality" ? d(a)("prompt_tags.quality_prefix") : d(a)("prompt_tags.undesired_prefix"),
			choice: c.value[n.kind],
			presets: o.value,
			"custom-group-label": d(a)("prompt_tags.custom_group"),
			"missing-label": d(a)("prompt_tags.missing"),
			"enable-label": d(a)("prompt_tags.enable"),
			"disable-label": d(a)("prompt_tags.disable"),
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
export { j as n, A as r, I as t };
