import { $ as e, B as t, F as n, N as r, Q as i, U as a, W as o, _ as s, a as c, ft as l, g as u, lt as d, m as f, n as p, p as m, st as h, u as g, v as _, x as v, y } from "./vue-i18n-D0uIxSJk.js";
import { t as b } from "./AppIcon-C3iVkJ88.js";
import { n as x, t as S } from "./StateSurface-BEQHm_62.js";
import { n as C, t as w } from "./FieldGroup-Cy3BpEB-.js";
import { t as T } from "./shuffle-DAH1WX4K.js";
import { t as E } from "./x-DZfSclkZ.js";
import { n as D } from "./_prop_utils-xadmv5JU.js";
import { t as O } from "./AppSwitch-DMAmbdlY.js";
import { t as k } from "./ToastViewport-BQU92mmg.js";
import { t as A } from "./IconButton-CYdojfyf.js";
var j = {
	prompt_view: "_prompt_view_i5kyf_7",
	browser_column: "_browser_column_i5kyf_14",
	editor_column: "_editor_column_i5kyf_18",
	section_header: "_section_header_i5kyf_40",
	section_title: "_section_title_i5kyf_48",
	icon_text_button: "_icon_text_button_i5kyf_52",
	text_input: "_text_input_i5kyf_59",
	text_input_narrow: "_text_input_narrow_i5kyf_70",
	textarea: "_textarea_i5kyf_87",
	preset_browser: "_preset_browser_i5kyf_107",
	search_input: "_search_input_i5kyf_112",
	bulk_delete_button: "_bulk_delete_button_i5kyf_122",
	group_header: "_group_header_i5kyf_131",
	preset_list: "_preset_list_i5kyf_141",
	preset_row: "_preset_row_i5kyf_146",
	preset_row_selected: "_preset_row_selected_i5kyf_153",
	preset_name_button: "_preset_name_button_i5kyf_157",
	name_row: "_name_row_i5kyf_169",
	prompt_builder: "_prompt_builder_i5kyf_183",
	context_preview: "_context_preview_i5kyf_191",
	context_block_title: "_context_block_title_i5kyf_198",
	context_list: "_context_list_i5kyf_204",
	quality_controls: "_quality_controls_i5kyf_211",
	switch_list: "_switch_list_i5kyf_216",
	replacement_rules: "_replacement_rules_i5kyf_225",
	regex_rules: "_regex_rules_i5kyf_226",
	rule_row: "_rule_row_i5kyf_231",
	rule_row_action: "_rule_row_action_i5kyf_240",
	test_result: "_test_result_i5kyf_253",
	test_result_error: "_test_result_error_i5kyf_260",
	test_panel: "_test_panel_i5kyf_269",
	test_panel_body: "_test_panel_body_i5kyf_277",
	tools_disabled_note: "_tools_disabled_note_i5kyf_284"
}, M = ["placeholder", "aria-label"], N = ["aria-label", "onClick"], P = [
	"checked",
	"aria-label",
	"onChange"
], F = ["onClick"], I = /* @__PURE__ */ v({
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
	setup(t, { emit: i }) {
		let _ = t, v = i, { t: w } = p(), E = e(""), O = e(/* @__PURE__ */ new Set()), k = e(!1), A = m(() => _.loading ? "loading" : _.hasError ? "error" : _.presets.length === 0 ? "empty" : "ready"), I = m(() => {
			let e = E.value.trim().toLowerCase();
			return e ? _.presets.filter((t) => t.display_name.toLowerCase().includes(e)) : _.presets;
		}), L = m(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of I.value) {
				let n = t.group, r = e.get(n) ?? [];
				r.push(t), e.set(n, r);
			}
			return [...e.entries()].sort(([e], [t]) => e === null ? 1 : t === null ? -1 : e.localeCompare(t));
		});
		function R(e, t) {
			let n = new Set(O.value);
			t ? n.add(e) : n.delete(e), O.value = n;
		}
		function z(e) {
			if (e.length === 0) return;
			let t = e[Math.floor(Math.random() * e.length)];
			t && v("select", t.id);
		}
		function B() {
			v("bulk-delete", [...O.value]), O.value = /* @__PURE__ */ new Set(), k.value = !1;
		}
		return (e, t) => (r(), s("div", {
			class: d(h(j).preset_browser),
			"data-testid": "preset-browser"
		}, [
			f("div", { class: d(h(j).section_header) }, [f("span", { class: d(h(j).section_title) }, l(h(w)("prompt.preset_browser.title")), 3), y(x, {
				label: h(w)("prompt.preset_browser.new_preset_action"),
				icon: h(C),
				variant: "secondary",
				"data-testid": "new-preset",
				onClick: t[0] ||= (e) => v("new-preset")
			}, null, 8, ["label", "icon"])], 2),
			o(f("input", {
				"onUpdate:modelValue": t[1] ||= (e) => E.value = e,
				type: "search",
				class: d(h(j).search_input),
				"data-testid": "preset-search",
				placeholder: h(w)("prompt.preset_browser.search_placeholder"),
				"aria-label": h(w)("prompt.preset_browser.search_placeholder")
			}, null, 10, M), [[c, E.value]]),
			O.value.size > 0 ? (r(), s("button", {
				key: 0,
				type: "button",
				class: d(["tc-interactive", h(j).bulk_delete_button]),
				"data-testid": "bulk-delete-action",
				onClick: t[2] ||= (e) => k.value = !0
			}, l(h(w)("prompt.preset_browser.bulk_delete_action")) + " (" + l(O.value.size) + ") ", 3)) : u("", !0),
			y(S, {
				status: A.value,
				"empty-title": h(w)("prompt.preset_browser.empty_title"),
				"empty-message": h(w)("prompt.preset_browser.empty_description"),
				"error-message": h(w)("prompt.preset_browser.load_error")
			}, {
				default: a(() => [(r(!0), s(g, null, n(L.value, ([e, t]) => (r(), s("div", { key: e ?? "__ungrouped__" }, [f("div", { class: d(h(j).group_header) }, [f("span", null, l(e ?? h(w)("prompt.preset_browser.ungrouped_label")), 1), f("button", {
					type: "button",
					class: d(["tc-interactive", h(j).icon_text_button]),
					"aria-label": h(w)("prompt.preset_browser.random_group_action"),
					"data-testid": "random-group",
					onClick: (e) => z(t)
				}, [y(b, {
					icon: h(T),
					size: 14
				}, null, 8, ["icon"])], 10, N)], 2), f("ul", { class: d(h(j).preset_list) }, [(r(!0), s(g, null, n(t, (e) => (r(), s("li", {
					key: e.id,
					class: d([h(j).preset_row, e.id === _.selectedPresetId && h(j).preset_row_selected]),
					"data-testid": "preset-row"
				}, [f("input", {
					type: "checkbox",
					checked: O.value.has(e.id),
					"aria-label": e.display_name,
					"data-testid": "preset-bulk-checkbox",
					onChange: (t) => R(e.id, t.target.checked)
				}, null, 40, P), f("button", {
					type: "button",
					class: d(["tc-interactive", h(j).preset_name_button]),
					"data-testid": "preset-select",
					onClick: (t) => v("select", e.id)
				}, l(e.display_name), 11, F)], 2))), 128))], 2)]))), 128))]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message",
				"error-message"
			]),
			y(D, {
				open: k.value,
				title: h(w)("prompt.preset_browser.bulk_delete_confirm_title", { n: O.value.size }, O.value.size),
				description: h(w)("prompt.preset_browser.bulk_delete_confirm_description"),
				"confirm-label": h(w)("confirmations.destructive.default_confirm_action"),
				"cancel-label": h(w)("confirmations.destructive.default_cancel_action"),
				"data-testid": "bulk-delete-confirm",
				"onUpdate:open": t[3] ||= (e) => k.value = e,
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
}), L = [
	"id",
	"value",
	"placeholder"
], R = [
	"id",
	"value",
	"placeholder"
], z = /* @__PURE__ */ v({
	__name: "PromptBuilder",
	props: {
		fixedPositivePrompt: {},
		fixedNegativePrompt: {},
		contextPreview: {}
	},
	emits: ["update:fixedPositivePrompt", "update:fixedNegativePrompt"],
	setup(e, { emit: t }) {
		let i = e, o = t, { t: c } = p();
		return (e, t) => (r(), s("div", {
			class: d(h(j).prompt_builder),
			"data-testid": "prompt-builder"
		}, [
			f("div", { class: d(h(j).section_header) }, [f("span", { class: d(h(j).section_title) }, l(h(c)("prompt.builder.title")), 3)], 2),
			y(w, { label: h(c)("prompt.fixed_prompts.positive_label") }, {
				default: a(({ fieldId: e }) => [f("textarea", {
					id: e,
					class: d(h(j).textarea),
					"data-testid": "fixed-positive-prompt",
					value: i.fixedPositivePrompt,
					placeholder: h(c)("prompt.fixed_prompts.positive_placeholder"),
					rows: "3",
					onInput: t[0] ||= (e) => o("update:fixedPositivePrompt", e.target.value)
				}, null, 42, L)]),
				_: 1
			}, 8, ["label"]),
			y(w, { label: h(c)("prompt.fixed_prompts.negative_label") }, {
				default: a(({ fieldId: e }) => [f("textarea", {
					id: e,
					class: d(h(j).textarea),
					"data-testid": "fixed-negative-prompt",
					value: i.fixedNegativePrompt,
					placeholder: h(c)("prompt.fixed_prompts.negative_placeholder"),
					rows: "3",
					onInput: t[1] ||= (e) => o("update:fixedNegativePrompt", e.target.value)
				}, null, 42, R)]),
				_: 1
			}, 8, ["label"]),
			f("div", { class: d(h(j).section_header) }, [f("span", { class: d(h(j).section_title) }, l(h(c)("prompt.builder.context_preview_title")), 3)], 2),
			f("div", {
				class: d(h(j).context_preview),
				"data-testid": "context-preview"
			}, [
				f("div", { class: d(h(j).context_block) }, [f("p", { class: d(h(j).context_block_title) }, l(h(c)("prompt.builder.world_info_label")), 3), y(S, {
					status: i.contextPreview && i.contextPreview.worldInfo.length > 0 ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": h(c)("prompt.builder.world_info_empty_description")
				}, {
					default: a(() => [f("ul", { class: d(h(j).context_list) }, [(r(!0), s(g, null, n(i.contextPreview?.worldInfo ?? [], (e, t) => (r(), s("li", { key: t }, l(e), 1))), 128))], 2)]),
					_: 1
				}, 8, ["status", "empty-message"])], 2),
				f("div", { class: d(h(j).context_block) }, [f("p", { class: d(h(j).context_block_title) }, l(h(c)("prompt.builder.user_persona_label")), 3), y(S, {
					status: i.contextPreview?.userPersona ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": h(c)("prompt.builder.user_persona_empty_description")
				}, {
					default: a(() => [f("p", null, l(i.contextPreview?.userPersona), 1)]),
					_: 1
				}, 8, ["status", "empty-message"])], 2),
				f("div", { class: d(h(j).context_block) }, [f("p", { class: d(h(j).context_block_title) }, l(h(c)("prompt.builder.character_context_label")), 3), y(S, {
					status: i.contextPreview?.characterContext ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": h(c)("prompt.builder.character_context_empty_description")
				}, {
					default: a(() => [f("p", null, l(i.contextPreview?.characterContext), 1)]),
					_: 1
				}, 8, ["status", "empty-message"])], 2)
			], 2)
		], 2));
	}
}), B = [
	"id",
	"value",
	"placeholder"
], V = {
	key: 0,
	"data-testid": "test-panel-running"
}, H = {
	key: 1,
	"data-testid": "test-panel-result"
}, U = {
	key: 2,
	role: "alert",
	"data-testid": "test-panel-unavailable"
}, W = {
	key: 3,
	role: "alert",
	"data-testid": "test-panel-error"
}, G = /* @__PURE__ */ v({
	__name: "PromptTestPanel",
	props: {
		inputValue: {},
		testCommand: {}
	},
	emits: ["update:inputValue", "run"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: o } = p(), c = m(() => n.testCommand.status === "error" && n.testCommand.failure.code === "capability_not_implemented");
		return (e, t) => (r(), s("div", {
			class: d(h(j).test_panel),
			"data-testid": "prompt-test-panel"
		}, [f("div", { class: d(h(j).section_header) }, [f("span", { class: d(h(j).section_title) }, l(h(o)("prompt.test_panel.title")), 3)], 2), f("div", { class: d(h(j).test_panel_body) }, [
			f("p", { class: d(h(j).tools_disabled_note) }, l(h(o)("prompt.test_panel.tools_disabled_note")), 3),
			y(w, { label: h(o)("prompt.test_panel.input_label") }, {
				default: a(({ fieldId: e }) => [f("textarea", {
					id: e,
					class: d(h(j).textarea),
					"data-testid": "test-panel-input",
					value: n.inputValue,
					placeholder: h(o)("prompt.test_panel.input_placeholder"),
					rows: "3",
					onInput: t[0] ||= (e) => i("update:inputValue", e.target.value)
				}, null, 42, B)]),
				_: 1
			}, 8, ["label"]),
			y(x, {
				label: h(o)("prompt.test_panel.run_action"),
				pending: n.testCommand.status === "pending",
				"data-testid": "test-panel-run",
				onClick: t[1] ||= (e) => i("run", n.inputValue)
			}, null, 8, ["label", "pending"]),
			n.testCommand.status === "pending" ? (r(), s("p", V, l(h(o)("prompt.test_panel.running")), 1)) : n.testCommand.status === "success" ? (r(), s("div", H, [f("p", { class: d(h(j).section_title) }, l(h(o)("prompt.test_panel.result_title")), 3), f("p", null, l(n.testCommand.result), 1)])) : c.value ? (r(), s("p", U, l(h(o)("prompt.test_panel.unavailable_description")), 1)) : n.testCommand.status === "error" ? (r(), s("p", W, l(h(o)("errors.unexpected")), 1)) : u("", !0)
		], 2)], 2));
	}
}), K = /* @__PURE__ */ v({
	__name: "QualityControls",
	props: {
		ucpEnabled: { type: Boolean },
		aqtEnabled: { type: Boolean }
	},
	emits: ["update:ucpEnabled", "update:aqtEnabled"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: a } = p();
		return (e, t) => (r(), s("div", {
			class: d(h(j).quality_controls),
			"data-testid": "quality-controls"
		}, [f("div", { class: d(h(j).section_header) }, [f("span", { class: d(h(j).section_title) }, l(h(a)("prompt.quality_controls.title")), 3)], 2), f("div", { class: d(h(j).switch_list) }, [y(O, {
			"model-value": n.ucpEnabled,
			label: h(a)("prompt.quality_controls.ucp_label"),
			description: h(a)("prompt.quality_controls.ucp_description"),
			"data-testid": "ucp-switch",
			"onUpdate:modelValue": t[0] ||= (e) => i("update:ucpEnabled", e)
		}, null, 8, [
			"model-value",
			"label",
			"description"
		]), y(O, {
			"model-value": n.aqtEnabled,
			label: h(a)("prompt.quality_controls.aqt_label"),
			description: h(a)("prompt.quality_controls.aqt_description"),
			"data-testid": "aqt-switch",
			"onUpdate:modelValue": t[1] ||= (e) => i("update:aqtEnabled", e)
		}, null, 8, [
			"model-value",
			"label",
			"description"
		])], 2)], 2));
	}
}), q = [
	"id",
	"value",
	"placeholder",
	"aria-describedby",
	"aria-invalid",
	"onInput"
], J = [
	"id",
	"value",
	"onInput"
], Y = [
	"id",
	"value",
	"onInput"
], X = ["id", "onUpdate:modelValue"], Z = ["disabled", "onClick"], Q = /* @__PURE__ */ v({
	__name: "RegexRules",
	props: {
		rules: {},
		testResults: {}
	},
	emits: ["update:rules", "test"],
	setup(e, { emit: t }) {
		let m = e, v = t, { t: x } = p(), T = i({});
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
			v("update:rules", [...m.rules, e]);
		}
		function k(e, t) {
			v("update:rules", m.rules.map((n) => n.id === e ? {
				...n,
				...t
			} : n));
		}
		function M(e) {
			v("update:rules", m.rules.filter((t) => t.id !== e));
		}
		function N(e) {
			v("test", e, T[e.id] ?? "");
		}
		function P(e) {
			let t = m.testResults[e];
			return t?.status === "success" ? t.result : null;
		}
		return (e, t) => (r(), s("div", {
			class: d(h(j).regex_rules),
			"data-testid": "regex-rules"
		}, [f("div", { class: d(h(j).section_header) }, [f("span", { class: d(h(j).section_title) }, l(h(x)("prompt.regex_rules.title")), 3), f("button", {
			type: "button",
			class: d(["tc-interactive", h(j).icon_text_button]),
			"data-testid": "add-regex-rule",
			onClick: O
		}, [y(b, {
			icon: h(C),
			size: 14
		}, null, 8, ["icon"]), _(" " + l(h(x)("prompt.regex_rules.add_action")), 1)], 2)], 2), y(S, {
			status: m.rules.length === 0 ? "empty" : "ready",
			"empty-title": h(x)("prompt.regex_rules.empty_title"),
			"empty-message": h(x)("prompt.regex_rules.empty_description")
		}, {
			default: a(() => [(r(!0), s(g, null, n(m.rules, (e) => (r(), s("div", {
				key: e.id,
				class: d(h(j).rule_row),
				"data-testid": "regex-rule-row"
			}, [
				y(w, {
					label: h(x)("prompt.regex_rules.pattern_label"),
					error: D(e)
				}, {
					default: a(({ fieldId: t, describedBy: n, invalid: r }) => [f("input", {
						id: t,
						type: "text",
						class: d(h(j).text_input),
						"data-testid": "regex-pattern-input",
						value: e.pattern,
						placeholder: h(x)("prompt.regex_rules.pattern_placeholder"),
						"aria-describedby": n,
						"aria-invalid": r,
						onInput: (t) => k(e.id, { pattern: t.target.value })
					}, null, 42, q)]),
					_: 2
				}, 1032, ["label", "error"]),
				y(w, { label: h(x)("prompt.regex_rules.flags_label") }, {
					default: a(({ fieldId: t }) => [f("input", {
						id: t,
						type: "text",
						class: d(h(j).text_input_narrow),
						"data-testid": "regex-flags-input",
						value: e.flags,
						onInput: (t) => k(e.id, { flags: t.target.value })
					}, null, 42, J)]),
					_: 2
				}, 1032, ["label"]),
				y(w, { label: h(x)("prompt.replacement_rules.replacement_label") }, {
					default: a(({ fieldId: t }) => [f("input", {
						id: t,
						type: "text",
						class: d(h(j).text_input),
						"data-testid": "regex-replacement-input",
						value: e.replacement,
						onInput: (t) => k(e.id, { replacement: t.target.value })
					}, null, 42, Y)]),
					_: 2
				}, 1032, ["label"]),
				y(w, { label: h(x)("prompt.regex_rules.test_input_label") }, {
					default: a(({ fieldId: t }) => [o(f("input", {
						id: t,
						"onUpdate:modelValue": (t) => T[e.id] = t,
						type: "text",
						class: d(h(j).text_input),
						"data-testid": "regex-test-input"
					}, null, 10, X), [[c, T[e.id]]])]),
					_: 2
				}, 1032, ["label"]),
				f("span", { class: d(h(j).rule_row_action) }, [f("button", {
					type: "button",
					class: d(["tc-interactive", h(j).icon_text_button]),
					"data-testid": "regex-test-run",
					disabled: !!D(e),
					onClick: (t) => N(e)
				}, l(h(x)("prompt.regex_rules.test_action")), 11, Z), y(A, {
					icon: h(E),
					size: "sm",
					label: h(x)("common.actions.delete"),
					"data-testid": "remove-regex-rule",
					onClick: (t) => M(e.id)
				}, null, 8, [
					"icon",
					"label",
					"onClick"
				])], 2),
				m.testResults[e.id]?.status === "success" ? (r(), s("p", {
					key: 0,
					class: d(h(j).test_result),
					"data-testid": "regex-test-result"
				}, l(h(x)("prompt.regex_rules.test_result_label")) + ": " + l(P(e.id)), 3)) : m.testResults[e.id]?.status === "error" ? (r(), s("p", {
					key: 1,
					role: "alert",
					class: d(h(j).test_result_error),
					"data-testid": "regex-test-error"
				}, l(h(x)("errors.unexpected")), 3)) : u("", !0)
			], 2))), 128))]),
			_: 1
		}, 8, [
			"status",
			"empty-title",
			"empty-message"
		])], 2));
	}
}), $ = [
	"id",
	"value",
	"placeholder",
	"onChange"
], ee = [
	"id",
	"value",
	"placeholder",
	"onInput"
], te = /* @__PURE__ */ v({
	__name: "ReplacementRules",
	props: { rules: {} },
	emits: ["update:rules"],
	setup(e, { emit: t }) {
		let i = e, o = t, { t: c } = p();
		function u(e) {
			return e.triggers.join(", ");
		}
		function m() {
			let e = {
				id: crypto.randomUUID(),
				triggers: [],
				replacement: ""
			};
			o("update:rules", [...i.rules, e]);
		}
		function v(e, t) {
			let n = t.split(",").map((e) => e.trim()).filter((e) => e.length > 0);
			o("update:rules", i.rules.map((t) => t.id === e ? {
				...t,
				triggers: n
			} : t));
		}
		function x(e, t) {
			o("update:rules", i.rules.map((n) => n.id === e ? {
				...n,
				replacement: t
			} : n));
		}
		function T(e) {
			o("update:rules", i.rules.filter((t) => t.id !== e));
		}
		return (e, t) => (r(), s("div", {
			class: d(h(j).replacement_rules),
			"data-testid": "replacement-rules"
		}, [f("div", { class: d(h(j).section_header) }, [f("span", { class: d(h(j).section_title) }, l(h(c)("prompt.replacement_rules.title")), 3), f("button", {
			type: "button",
			class: d(["tc-interactive", h(j).icon_text_button]),
			"data-testid": "add-replacement-rule",
			onClick: m
		}, [y(b, {
			icon: h(C),
			size: 14
		}, null, 8, ["icon"]), _(" " + l(h(c)("prompt.replacement_rules.add_action")), 1)], 2)], 2), y(S, {
			status: i.rules.length === 0 ? "empty" : "ready",
			"empty-title": h(c)("prompt.replacement_rules.empty_title"),
			"empty-message": h(c)("prompt.replacement_rules.empty_description")
		}, {
			default: a(() => [(r(!0), s(g, null, n(i.rules, (e) => (r(), s("div", {
				key: e.id,
				class: d(h(j).rule_row),
				"data-testid": "replacement-rule-row"
			}, [
				y(w, {
					label: h(c)("prompt.replacement_rules.trigger_label"),
					hint: h(c)("prompt.replacement_rules.triggers_hint")
				}, {
					default: a(({ fieldId: t }) => [f("input", {
						id: t,
						type: "text",
						class: d(h(j).text_input),
						"data-testid": "replacement-triggers-input",
						value: u(e),
						placeholder: h(c)("prompt.replacement_rules.trigger_placeholder"),
						onChange: (t) => v(e.id, t.target.value)
					}, null, 42, $)]),
					_: 2
				}, 1032, ["label", "hint"]),
				y(w, { label: h(c)("prompt.replacement_rules.replacement_label") }, {
					default: a(({ fieldId: t }) => [f("input", {
						id: t,
						type: "text",
						class: d(h(j).text_input),
						"data-testid": "replacement-value-input",
						value: e.replacement,
						placeholder: h(c)("prompt.replacement_rules.replacement_placeholder"),
						onInput: (t) => x(e.id, t.target.value)
					}, null, 42, ee)]),
					_: 2
				}, 1032, ["label"]),
				f("span", { class: d(h(j).rule_row_action) }, [y(A, {
					icon: h(E),
					size: "sm",
					label: h(c)("common.actions.delete"),
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
function ne() {
	let t = e([]);
	function n(e) {
		t.value = [...t.value, {
			...e,
			id: crypto.randomUUID()
		}];
	}
	function r(e) {
		t.value = t.value.filter((t) => t.id !== e);
	}
	return {
		toasts: t,
		push: n,
		dismiss: r
	};
}
//#endregion
//#region src/ui/views/prompt/PromptView.vue?vue&type=script&setup=true&lang.ts
var re = ["id", "value"], ie = /* @__PURE__ */ v({
	__name: "PromptView",
	props: {
		state: {},
		testRegex: { type: Function },
		testCommand: {},
		contextPreview: {}
	},
	emits: [
		"select-preset",
		"new-preset",
		"bulk-delete-presets",
		"update-draft",
		"save",
		"run-test"
	],
	setup(n, { emit: i }) {
		let o = n, c = i, { t: l } = p(), { toasts: m, push: _, dismiss: v } = ne(), b = e(null), C = e(!1), T = e(!1), E = e(!1), O = e(null), A = e(""), M = e({});
		function N(e) {
			return e ? JSON.stringify(e) : "";
		}
		let P = () => o.state.prompt.draft !== null && b.value !== null && N(o.state.prompt.draft) !== N(b.value);
		t(() => o.state.prompt.draft, (e) => {
			(C.value || b.value === null) && e && (b.value = e, C.value = !1, T.value = !1, E.value = !1, M.value = {}), e === null && (b.value = null);
		}, { immediate: !0 });
		function F(e) {
			if (P()) {
				O.value = {
					kind: "select",
					presetId: e
				};
				return;
			}
			C.value = !0, c("select-preset", e);
		}
		function L() {
			if (P()) {
				O.value = { kind: "new" };
				return;
			}
			C.value = !0, c("new-preset");
		}
		function R() {
			let e = O.value;
			O.value = null, e && (C.value = !0, e.kind === "select" ? c("select-preset", e.presetId) : c("new-preset"));
		}
		function B(e) {
			c("update-draft", e);
		}
		function V() {
			o.state.prompt.draft && c("save", o.state.prompt.draft);
		}
		t(() => o.state.prompt.save_command, (e) => {
			e.status === "success" && (_({
				title: l("common.actions.save"),
				description: l("status.success"),
				variant: "success"
			}), b.value = null);
		});
		async function H(e, t) {
			M.value = {
				...M.value,
				[e.id]: { status: "pending" }
			};
			try {
				let n = await o.testRegex(e, t);
				M.value = {
					...M.value,
					[e.id]: {
						status: "success",
						result: n
					}
				};
			} catch (t) {
				let n = t instanceof Error && "code" in t && typeof t.code == "string" ? t.code : "command_failed";
				M.value = {
					...M.value,
					[e.id]: {
						status: "error",
						failure: { code: n }
					}
				};
			}
		}
		function U(e) {
			A.value = e, c("run-test", e);
		}
		return (e, t) => (r(), s("div", {
			class: d(h(j).prompt_view),
			"data-testid": "prompt-view"
		}, [
			f("div", { class: d(h(j).browser_column) }, [y(I, {
				presets: o.state.prompt.presets,
				"selected-preset-id": o.state.prompt.selected_preset_id,
				loading: o.state.loading.has("prompt_presets"),
				"has-error": o.state.failures.has("prompt_presets"),
				onSelect: F,
				onNewPreset: L,
				onBulkDelete: t[0] ||= (e) => c("bulk-delete-presets", e)
			}, null, 8, [
				"presets",
				"selected-preset-id",
				"loading",
				"has-error"
			])], 2),
			f("div", { class: d(h(j).editor_column) }, [y(S, {
				status: o.state.prompt.draft ? "ready" : "empty",
				"empty-title": h(l)("prompt.preset_browser.empty_title"),
				"empty-message": h(l)("prompt.preset_browser.empty_description")
			}, {
				default: a(() => [o.state.prompt.draft ? (r(), s(g, { key: 0 }, [
					f("div", { class: d(h(j).name_row) }, [y(w, { label: h(l)("common.labels.name") }, {
						default: a(({ fieldId: e }) => [f("input", {
							id: e,
							type: "text",
							class: d(h(j).text_input),
							"data-testid": "preset-name-input",
							value: o.state.prompt.draft.display_name,
							onInput: t[1] ||= (e) => B({ display_name: e.target.value })
						}, null, 42, re)]),
						_: 1
					}, 8, ["label"]), y(x, {
						label: h(l)("common.actions.save"),
						variant: "primary",
						pending: o.state.prompt.save_command.status === "pending",
						"data-testid": "save-preset",
						onClick: V
					}, null, 8, ["label", "pending"])], 2),
					y(z, {
						"fixed-positive-prompt": o.state.prompt.draft.fixed_positive_prompt,
						"fixed-negative-prompt": o.state.prompt.draft.fixed_negative_prompt,
						"context-preview": o.contextPreview ?? null,
						"onUpdate:fixedPositivePrompt": t[2] ||= (e) => B({ fixed_positive_prompt: e }),
						"onUpdate:fixedNegativePrompt": t[3] ||= (e) => B({ fixed_negative_prompt: e })
					}, null, 8, [
						"fixed-positive-prompt",
						"fixed-negative-prompt",
						"context-preview"
					]),
					y(K, {
						"ucp-enabled": T.value,
						"onUpdate:ucpEnabled": t[4] ||= (e) => T.value = e,
						"aqt-enabled": E.value,
						"onUpdate:aqtEnabled": t[5] ||= (e) => E.value = e
					}, null, 8, ["ucp-enabled", "aqt-enabled"]),
					y(te, {
						rules: o.state.prompt.draft.replacement_rules,
						"onUpdate:rules": t[6] ||= (e) => B({ replacement_rules: e })
					}, null, 8, ["rules"]),
					y(Q, {
						rules: o.state.prompt.draft.regex_rules,
						"test-results": M.value,
						"onUpdate:rules": t[7] ||= (e) => B({ regex_rules: e }),
						onTest: H
					}, null, 8, ["rules", "test-results"]),
					y(G, {
						"input-value": A.value,
						"test-command": o.testCommand ?? {
							status: "error",
							failure: { code: "capability_not_implemented" }
						},
						"onUpdate:inputValue": t[8] ||= (e) => A.value = e,
						onRun: U
					}, null, 8, ["input-value", "test-command"])
				], 64)) : u("", !0)]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message"
			])], 2),
			y(D, {
				open: O.value !== null,
				title: h(l)("confirmations.discard_unsaved.title"),
				description: h(l)("confirmations.discard_unsaved.description"),
				"confirm-label": h(l)("confirmations.discard_unsaved.discard_action"),
				"cancel-label": h(l)("confirmations.discard_unsaved.stay_action"),
				"data-testid": "discard-unsaved-confirm",
				"onUpdate:open": t[9] ||= (e) => O.value = e ? O.value : null,
				onConfirm: R
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			]),
			y(k, {
				toasts: h(m),
				"viewport-label": h(l)("common.notifications.viewport_label"),
				"announce-label": h(l)("common.notifications.announce_label"),
				"close-label": h(l)("common.actions.close"),
				onDismiss: h(v)
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
export { ie as default };
