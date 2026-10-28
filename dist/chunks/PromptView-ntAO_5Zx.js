import { $ as e, F as t, G as n, N as r, V as i, W as a, _ as o, a as s, ct as c, et as l, g as u, m as d, n as f, p, pt as m, u as h, ut as g, v as _, x as v, y } from "./vue-i18n-DUz2Gjn8.js";
import { t as b } from "./AppIcon-Cnhzrx9o.js";
import { n as x, t as S } from "./StateSurface-BA0Ffiwe.js";
import { n as C, t as w } from "./FieldGroup-BYtqLDde.js";
import { t as T } from "./shuffle-BAB9O4dE.js";
import { t as E } from "./x-CDKrptQJ.js";
import { t as D } from "./ToastViewport-G0GgrUYw.js";
import { t as O } from "./ConfirmDialog-3SJceF8v.js";
import { t as k } from "./IconButton-DPIesKAc.js";
import { t as A } from "./prompt_styles-C9N1Zkvr.js";
//#region src/ui/views/prompt/PresetBrowser.vue?vue&type=script&setup=true&lang.ts
var j = ["placeholder", "aria-label"], M = ["aria-label", "onClick"], N = [
	"checked",
	"aria-label",
	"onChange"
], P = ["onClick"], F = /* @__PURE__ */ v({
	__name: "PresetBrowser",
	props: {
		presets: {},
		selectedPresetId: {},
		loading: { type: Boolean },
		hasError: { type: Boolean }
	},
	emits: [
		"select",
		"new-preset",
		"bulk-delete"
	],
	setup(e, { emit: i }) {
		let _ = e, v = i, { t: w } = f(), E = l(""), D = l(/* @__PURE__ */ new Set()), k = l(!1), F = p(() => _.loading ? "loading" : _.hasError ? "error" : _.presets.length === 0 ? "empty" : "ready"), I = p(() => {
			let e = E.value.trim().toLowerCase();
			return e ? _.presets.filter((t) => t.display_name.toLowerCase().includes(e)) : _.presets;
		}), L = p(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of I.value) {
				let n = t.group, r = e.get(n) ?? [];
				r.push(t), e.set(n, r);
			}
			return [...e.entries()].sort(([e], [t]) => e === null ? 1 : t === null ? -1 : e.localeCompare(t));
		});
		function R(e, t) {
			let n = new Set(D.value);
			t ? n.add(e) : n.delete(e), D.value = n;
		}
		function z(e) {
			if (e.length === 0) return;
			let t = e[Math.floor(Math.random() * e.length)];
			t && v("select", t.id);
		}
		function B() {
			v("bulk-delete", [...D.value]), D.value = /* @__PURE__ */ new Set(), k.value = !1;
		}
		return (e, i) => (r(), o("div", {
			class: g(c(A).preset_browser),
			"data-testid": "preset-browser"
		}, [
			d("div", { class: g(c(A).section_header) }, [d("span", { class: g(c(A).section_title) }, m(c(w)("prompt.preset_browser.title")), 3), y(x, {
				label: c(w)("prompt.preset_browser.new_preset_action"),
				icon: c(C),
				variant: "secondary",
				"data-testid": "new-preset",
				onClick: i[0] ||= (e) => v("new-preset")
			}, null, 8, ["label", "icon"])], 2),
			n(d("input", {
				"onUpdate:modelValue": i[1] ||= (e) => E.value = e,
				type: "search",
				class: g(c(A).search_input),
				"data-testid": "preset-search",
				placeholder: c(w)("prompt.preset_browser.search_placeholder"),
				"aria-label": c(w)("prompt.preset_browser.search_placeholder")
			}, null, 10, j), [[s, E.value]]),
			D.value.size > 0 ? (r(), o("button", {
				key: 0,
				type: "button",
				class: g(["tc-interactive", c(A).bulk_delete_button]),
				"data-testid": "bulk-delete-action",
				onClick: i[2] ||= (e) => k.value = !0
			}, m(c(w)("prompt.preset_browser.bulk_delete_action")) + " (" + m(D.value.size) + ") ", 3)) : u("", !0),
			y(S, {
				status: F.value,
				"empty-title": c(w)("prompt.preset_browser.empty_title"),
				"empty-message": c(w)("prompt.preset_browser.empty_description"),
				"error-message": c(w)("prompt.preset_browser.load_error")
			}, {
				default: a(() => [(r(!0), o(h, null, t(L.value, ([e, n]) => (r(), o("div", { key: e ?? "__ungrouped__" }, [d("div", { class: g(c(A).group_header) }, [d("span", null, m(e ?? c(w)("prompt.preset_browser.ungrouped_label")), 1), d("button", {
					type: "button",
					class: g(["tc-interactive", c(A).icon_text_button]),
					"aria-label": c(w)("prompt.preset_browser.random_group_action"),
					"data-testid": "random-group",
					onClick: (e) => z(n)
				}, [y(b, {
					icon: c(T),
					size: 14
				}, null, 8, ["icon"])], 10, M)], 2), d("ul", { class: g(c(A).preset_list) }, [(r(!0), o(h, null, t(n, (e) => (r(), o("li", {
					key: e.id,
					class: g([c(A).preset_row, e.id === _.selectedPresetId && c(A).preset_row_selected]),
					"data-testid": "preset-row"
				}, [d("input", {
					type: "checkbox",
					checked: D.value.has(e.id),
					"aria-label": e.display_name,
					"data-testid": "preset-bulk-checkbox",
					onChange: (t) => R(e.id, t.target.checked)
				}, null, 40, N), d("button", {
					type: "button",
					class: g(["tc-interactive", c(A).preset_name_button]),
					"data-testid": "preset-select",
					onClick: (t) => v("select", e.id)
				}, m(e.display_name), 11, P)], 2))), 128))], 2)]))), 128))]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message",
				"error-message"
			]),
			y(O, {
				open: k.value,
				title: c(w)("prompt.preset_browser.bulk_delete_confirm_title", { n: D.value.size }, D.value.size),
				description: c(w)("prompt.preset_browser.bulk_delete_confirm_description"),
				"confirm-label": c(w)("confirmations.destructive.default_confirm_action"),
				"cancel-label": c(w)("confirmations.destructive.default_cancel_action"),
				"data-testid": "bulk-delete-confirm",
				"onUpdate:open": i[3] ||= (e) => k.value = e,
				onConfirm: B
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			])
		], 2));
	}
}), I = [
	"id",
	"value",
	"placeholder"
], L = [
	"id",
	"value",
	"placeholder"
], R = /* @__PURE__ */ v({
	__name: "PromptBuilder",
	props: {
		fixedPositivePrompt: {},
		fixedNegativePrompt: {}
	},
	emits: ["update:fixedPositivePrompt", "update:fixedNegativePrompt"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: s } = f();
		return (e, t) => (r(), o("div", {
			class: g(c(A).prompt_builder),
			"data-testid": "prompt-builder"
		}, [
			d("div", { class: g(c(A).section_header) }, [d("span", { class: g(c(A).section_title) }, m(c(s)("prompt.builder.title")), 3)], 2),
			y(w, { label: c(s)("prompt.fixed_prompts.positive_label") }, {
				default: a(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: g(c(A).textarea),
					"data-testid": "fixed-positive-prompt",
					value: n.fixedPositivePrompt,
					placeholder: c(s)("prompt.fixed_prompts.positive_placeholder"),
					rows: "3",
					onInput: t[0] ||= (e) => i("update:fixedPositivePrompt", e.target.value)
				}, null, 42, I)]),
				_: 1
			}, 8, ["label"]),
			y(w, { label: c(s)("prompt.fixed_prompts.negative_label") }, {
				default: a(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: g(c(A).textarea),
					"data-testid": "fixed-negative-prompt",
					value: n.fixedNegativePrompt,
					placeholder: c(s)("prompt.fixed_prompts.negative_placeholder"),
					rows: "3",
					onInput: t[1] ||= (e) => i("update:fixedNegativePrompt", e.target.value)
				}, null, 42, L)]),
				_: 1
			}, 8, ["label"])
		], 2));
	}
}), z = [
	"id",
	"value",
	"placeholder",
	"aria-describedby",
	"aria-invalid",
	"onInput"
], B = [
	"id",
	"value",
	"onInput"
], V = [
	"id",
	"value",
	"onInput"
], H = ["id", "onUpdate:modelValue"], U = ["disabled", "onClick"], W = /* @__PURE__ */ v({
	__name: "RegexRules",
	props: {
		rules: {},
		testResults: {}
	},
	emits: ["update:rules", "test"],
	setup(i, { emit: l }) {
		let p = i, v = l, { t: x } = f(), T = e({});
		function D(e) {
			if (!e.pattern) return null;
			try {
				return new RegExp(e.pattern, e.flags), null;
			} catch (e) {
				let t = e instanceof Error ? e.message : String(e);
				return x("prompt.regex_rules.invalid_pattern", { message: t });
			}
		}
		function O() {
			let e = {
				id: crypto.randomUUID(),
				pattern: "",
				flags: "",
				replacement: ""
			};
			v("update:rules", [...p.rules, e]);
		}
		function j(e, t) {
			v("update:rules", p.rules.map((n) => n.id === e ? {
				...n,
				...t
			} : n));
		}
		function M(e) {
			v("update:rules", p.rules.filter((t) => t.id !== e));
		}
		function N(e) {
			v("test", e, T[e.id] ?? "");
		}
		function P(e) {
			let t = p.testResults[e];
			return t?.status === "success" ? t.result : null;
		}
		return (e, i) => (r(), o("div", {
			class: g(c(A).regex_rules),
			"data-testid": "regex-rules"
		}, [d("div", { class: g(c(A).section_header) }, [d("span", { class: g(c(A).section_title) }, m(c(x)("prompt.regex_rules.title")), 3), d("button", {
			type: "button",
			class: g(["tc-interactive", c(A).icon_text_button]),
			"data-testid": "add-regex-rule",
			onClick: O
		}, [y(b, {
			icon: c(C),
			size: 14
		}, null, 8, ["icon"]), _(" " + m(c(x)("prompt.regex_rules.add_action")), 1)], 2)], 2), y(S, {
			status: p.rules.length === 0 ? "empty" : "ready",
			"empty-title": c(x)("prompt.regex_rules.empty_title"),
			"empty-message": c(x)("prompt.regex_rules.empty_description")
		}, {
			default: a(() => [(r(!0), o(h, null, t(p.rules, (e) => (r(), o("div", {
				key: e.id,
				class: g(c(A).rule_row),
				"data-testid": "regex-rule-row"
			}, [
				y(w, {
					label: c(x)("prompt.regex_rules.pattern_label"),
					error: D(e)
				}, {
					default: a(({ fieldId: t, describedBy: n, invalid: r }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(A).text_input),
						"data-testid": "regex-pattern-input",
						value: e.pattern,
						placeholder: c(x)("prompt.regex_rules.pattern_placeholder"),
						"aria-describedby": n,
						"aria-invalid": r,
						onInput: (t) => j(e.id, { pattern: t.target.value })
					}, null, 42, z)]),
					_: 2
				}, 1032, ["label", "error"]),
				y(w, { label: c(x)("prompt.regex_rules.flags_label") }, {
					default: a(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(A).text_input_narrow),
						"data-testid": "regex-flags-input",
						value: e.flags,
						onInput: (t) => j(e.id, { flags: t.target.value })
					}, null, 42, B)]),
					_: 2
				}, 1032, ["label"]),
				y(w, { label: c(x)("prompt.replacement_rules.replacement_label") }, {
					default: a(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(A).text_input),
						"data-testid": "regex-replacement-input",
						value: e.replacement,
						onInput: (t) => j(e.id, { replacement: t.target.value })
					}, null, 42, V)]),
					_: 2
				}, 1032, ["label"]),
				y(w, { label: c(x)("prompt.regex_rules.test_input_label") }, {
					default: a(({ fieldId: t }) => [n(d("input", {
						id: t,
						"onUpdate:modelValue": (t) => T[e.id] = t,
						type: "text",
						class: g(c(A).text_input),
						"data-testid": "regex-test-input"
					}, null, 10, H), [[s, T[e.id]]])]),
					_: 2
				}, 1032, ["label"]),
				d("span", { class: g(c(A).rule_row_action) }, [d("button", {
					type: "button",
					class: g(["tc-interactive", c(A).icon_text_button]),
					"data-testid": "regex-test-run",
					disabled: !!D(e),
					onClick: (t) => N(e)
				}, m(c(x)("prompt.regex_rules.test_action")), 11, U), y(k, {
					icon: c(E),
					size: "sm",
					label: c(x)("common.actions.delete"),
					"data-testid": "remove-regex-rule",
					onClick: (t) => M(e.id)
				}, null, 8, [
					"icon",
					"label",
					"onClick"
				])], 2),
				p.testResults[e.id]?.status === "success" ? (r(), o("p", {
					key: 0,
					class: g(c(A).test_result),
					"data-testid": "regex-test-result"
				}, m(c(x)("prompt.regex_rules.test_result_label")) + ": " + m(P(e.id)), 3)) : p.testResults[e.id]?.status === "error" ? (r(), o("p", {
					key: 1,
					role: "alert",
					class: g(c(A).test_result_error),
					"data-testid": "regex-test-error"
				}, m(c(x)("errors.unexpected")), 3)) : u("", !0)
			], 2))), 128))]),
			_: 1
		}, 8, [
			"status",
			"empty-title",
			"empty-message"
		])], 2));
	}
}), G = [
	"id",
	"value",
	"placeholder",
	"onChange"
], K = [
	"id",
	"value",
	"placeholder",
	"onInput"
], q = /* @__PURE__ */ v({
	__name: "ReplacementRules",
	props: { rules: {} },
	emits: ["update:rules"],
	setup(e, { emit: n }) {
		let i = e, s = n, { t: l } = f();
		function u(e) {
			return e.triggers.join(", ");
		}
		function p() {
			let e = {
				id: crypto.randomUUID(),
				triggers: [],
				replacement: ""
			};
			s("update:rules", [...i.rules, e]);
		}
		function v(e, t) {
			let n = t.split(",").map((e) => e.trim()).filter((e) => e.length > 0);
			s("update:rules", i.rules.map((t) => t.id === e ? {
				...t,
				triggers: n
			} : t));
		}
		function x(e, t) {
			s("update:rules", i.rules.map((n) => n.id === e ? {
				...n,
				replacement: t
			} : n));
		}
		function T(e) {
			s("update:rules", i.rules.filter((t) => t.id !== e));
		}
		return (e, n) => (r(), o("div", {
			class: g(c(A).replacement_rules),
			"data-testid": "replacement-rules"
		}, [d("div", { class: g(c(A).section_header) }, [d("span", { class: g(c(A).section_title) }, m(c(l)("prompt.replacement_rules.title")), 3), d("button", {
			type: "button",
			class: g(["tc-interactive", c(A).icon_text_button]),
			"data-testid": "add-replacement-rule",
			onClick: p
		}, [y(b, {
			icon: c(C),
			size: 14
		}, null, 8, ["icon"]), _(" " + m(c(l)("prompt.replacement_rules.add_action")), 1)], 2)], 2), y(S, {
			status: i.rules.length === 0 ? "empty" : "ready",
			"empty-title": c(l)("prompt.replacement_rules.empty_title"),
			"empty-message": c(l)("prompt.replacement_rules.empty_description")
		}, {
			default: a(() => [(r(!0), o(h, null, t(i.rules, (e) => (r(), o("div", {
				key: e.id,
				class: g(c(A).rule_row),
				"data-testid": "replacement-rule-row"
			}, [
				y(w, {
					label: c(l)("prompt.replacement_rules.trigger_label"),
					hint: c(l)("prompt.replacement_rules.triggers_hint")
				}, {
					default: a(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(A).text_input),
						"data-testid": "replacement-triggers-input",
						value: u(e),
						placeholder: c(l)("prompt.replacement_rules.trigger_placeholder"),
						onChange: (t) => v(e.id, t.target.value)
					}, null, 42, G)]),
					_: 2
				}, 1032, ["label", "hint"]),
				y(w, { label: c(l)("prompt.replacement_rules.replacement_label") }, {
					default: a(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(A).text_input),
						"data-testid": "replacement-value-input",
						value: e.replacement,
						placeholder: c(l)("prompt.replacement_rules.replacement_placeholder"),
						onInput: (t) => x(e.id, t.target.value)
					}, null, 42, K)]),
					_: 2
				}, 1032, ["label"]),
				d("span", { class: g(c(A).rule_row_action) }, [y(k, {
					icon: c(E),
					size: "sm",
					label: c(l)("common.actions.delete"),
					"data-testid": "remove-replacement-rule",
					onClick: (t) => T(e.id)
				}, null, 8, [
					"icon",
					"label",
					"onClick"
				])], 2)
			], 2))), 128))]),
			_: 1
		}, 8, [
			"status",
			"empty-title",
			"empty-message"
		])], 2));
	}
});
//#endregion
//#region src/ui/views/prompt/use_toasts.ts
function J() {
	let e = l([]);
	function t(t) {
		e.value = [...e.value, {
			...t,
			id: crypto.randomUUID()
		}];
	}
	function n(t) {
		e.value = e.value.filter((e) => e.id !== t);
	}
	return {
		toasts: e,
		push: t,
		dismiss: n
	};
}
//#endregion
//#region src/ui/views/prompt/PromptView.vue?vue&type=script&setup=true&lang.ts
var Y = ["id", "value"], X = /* @__PURE__ */ v({
	__name: "PromptView",
	props: {
		state: {},
		testRegex: { type: Function }
	},
	emits: [
		"select-preset",
		"new-preset",
		"bulk-delete-presets",
		"update-draft",
		"save"
	],
	setup(e, { emit: t }) {
		let n = e, s = t, { t: p } = f(), { toasts: m, push: _, dismiss: v } = J(), b = l(null), C = l(!1), T = l(null), E = l({});
		function k(e) {
			return e ? JSON.stringify(e) : "";
		}
		let j = () => n.state.prompt.draft !== null && b.value !== null && k(n.state.prompt.draft) !== k(b.value);
		i(() => n.state.prompt.draft, (e) => {
			(C.value || b.value === null) && e && (b.value = e, C.value = !1, E.value = {}), e === null && (b.value = null);
		}, { immediate: !0 });
		function M(e) {
			if (j()) {
				T.value = {
					kind: "select",
					presetId: e
				};
				return;
			}
			C.value = !0, s("select-preset", e);
		}
		function N() {
			if (j()) {
				T.value = { kind: "new" };
				return;
			}
			C.value = !0, s("new-preset");
		}
		function P() {
			let e = T.value;
			T.value = null, e && (C.value = !0, e.kind === "select" ? s("select-preset", e.presetId) : s("new-preset"));
		}
		function I(e) {
			s("update-draft", e);
		}
		function L() {
			n.state.prompt.draft && s("save", n.state.prompt.draft);
		}
		i(() => n.state.prompt.save_command, (e) => {
			e.status === "success" && (_({
				title: p("common.actions.save"),
				description: p("status.success"),
				variant: "success"
			}), b.value = null);
		});
		async function z(e, t) {
			E.value = {
				...E.value,
				[e.id]: { status: "pending" }
			};
			try {
				let r = await n.testRegex(e, t);
				E.value = {
					...E.value,
					[e.id]: {
						status: "success",
						result: r
					}
				};
			} catch (t) {
				let n = t instanceof Error && "code" in t && typeof t.code == "string" ? t.code : "command_failed";
				E.value = {
					...E.value,
					[e.id]: {
						status: "error",
						failure: { code: n }
					}
				};
			}
		}
		return (e, t) => (r(), o("div", {
			class: g(c(A).prompt_view),
			"data-testid": "prompt-view"
		}, [
			d("div", { class: g(c(A).browser_column) }, [y(F, {
				presets: n.state.prompt.presets,
				"selected-preset-id": n.state.prompt.selected_preset_id,
				loading: n.state.loading.has("prompt_presets"),
				"has-error": n.state.failures.has("prompt_presets"),
				onSelect: M,
				onNewPreset: N,
				onBulkDelete: t[0] ||= (e) => s("bulk-delete-presets", e)
			}, null, 8, [
				"presets",
				"selected-preset-id",
				"loading",
				"has-error"
			])], 2),
			d("div", { class: g(c(A).editor_column) }, [y(S, {
				status: n.state.prompt.draft ? "ready" : "empty",
				"empty-title": c(p)("prompt.preset_browser.empty_title"),
				"empty-message": c(p)("prompt.preset_browser.empty_description")
			}, {
				default: a(() => [n.state.prompt.draft ? (r(), o(h, { key: 0 }, [
					d("div", { class: g(c(A).name_row) }, [y(w, { label: c(p)("common.labels.name") }, {
						default: a(({ fieldId: e }) => [d("input", {
							id: e,
							type: "text",
							class: g(c(A).text_input),
							"data-testid": "preset-name-input",
							value: n.state.prompt.draft.display_name,
							onInput: t[1] ||= (e) => I({ display_name: e.target.value })
						}, null, 42, Y)]),
						_: 1
					}, 8, ["label"]), y(x, {
						label: c(p)("common.actions.save"),
						variant: "primary",
						pending: n.state.prompt.save_command.status === "pending",
						"data-testid": "save-preset",
						onClick: L
					}, null, 8, ["label", "pending"])], 2),
					y(R, {
						"fixed-positive-prompt": n.state.prompt.draft.fixed_positive_prompt,
						"fixed-negative-prompt": n.state.prompt.draft.fixed_negative_prompt,
						"onUpdate:fixedPositivePrompt": t[2] ||= (e) => I({ fixed_positive_prompt: e }),
						"onUpdate:fixedNegativePrompt": t[3] ||= (e) => I({ fixed_negative_prompt: e })
					}, null, 8, ["fixed-positive-prompt", "fixed-negative-prompt"]),
					y(q, {
						rules: n.state.prompt.draft.replacement_rules,
						"onUpdate:rules": t[4] ||= (e) => I({ replacement_rules: e })
					}, null, 8, ["rules"]),
					y(W, {
						rules: n.state.prompt.draft.regex_rules,
						"test-results": E.value,
						"onUpdate:rules": t[5] ||= (e) => I({ regex_rules: e }),
						onTest: z
					}, null, 8, ["rules", "test-results"])
				], 64)) : u("", !0)]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message"
			])], 2),
			y(O, {
				open: T.value !== null,
				title: c(p)("confirmations.discard_unsaved.title"),
				description: c(p)("confirmations.discard_unsaved.description"),
				"confirm-label": c(p)("confirmations.discard_unsaved.discard_action"),
				"cancel-label": c(p)("confirmations.discard_unsaved.stay_action"),
				"data-testid": "discard-unsaved-confirm",
				"onUpdate:open": t[6] ||= (e) => T.value = e ? T.value : null,
				onConfirm: P
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			]),
			y(D, {
				toasts: c(m),
				"viewport-label": c(p)("common.notifications.viewport_label"),
				"announce-label": c(p)("common.notifications.announce_label"),
				"close-label": c(p)("common.actions.close"),
				onDismiss: c(v)
			}, null, 8, [
				"toasts",
				"viewport-label",
				"announce-label",
				"close-label",
				"onDismiss"
			])
		], 2));
	}
});
//#endregion
export { X as default };
