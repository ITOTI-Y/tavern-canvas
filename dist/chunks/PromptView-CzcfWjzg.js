import { I as e, K as t, R as n, S as r, U as i, _ as a, a as o, b as s, c, ft as l, g as u, ht as d, n as f, nt as p, p as m, q as h, tt as g, ut as _, w as v, x as y, y as b } from "./AppIcon-BpY-A4VH.js";
import { n as x, t as S } from "./StateSurface-CNBIMTjV.js";
import { n as C, t as w } from "./FieldGroup-BPi4aGE9.js";
import { t as T } from "./shuffle-CV6Zfm_h.js";
import { n as E } from "./_prop_utils-CoKBy72F.js";
import { t as D } from "./AppSwitch-Cp98f87Q.js";
import { t as O } from "./ToastViewport-BSmx29WE.js";
import { t as k } from "./IconButton-CW62aQy5.js";
var A = {
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
}, j = ["placeholder", "aria-label"], M = ["aria-label", "onClick"], N = [
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
	setup(i, { emit: f }) {
		let g = i, v = f, { t: y } = o(), w = p(""), D = p(/* @__PURE__ */ new Set()), O = p(!1), k = u(() => g.loading ? "loading" : g.hasError ? "error" : g.presets.length === 0 ? "empty" : "ready"), F = u(() => `${y("prompt.preset_browser.empty_title")} ${y("prompt.preset_browser.empty_description")}`), I = u(() => {
			let e = w.value.trim().toLowerCase();
			return e ? g.presets.filter((t) => t.display_name.toLowerCase().includes(e)) : g.presets;
		}), L = u(() => {
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
			v("bulk-delete", [...D.value]), D.value = /* @__PURE__ */ new Set(), O.value = !1;
		}
		return (i, o) => (e(), s("div", {
			class: l(_(A).preset_browser),
			"data-testid": "preset-browser"
		}, [
			a("div", { class: l(_(A).section_header) }, [a("span", { class: l(_(A).section_title) }, d(_(y)("prompt.preset_browser.title")), 3), r(x, {
				label: _(y)("prompt.preset_browser.new_preset_action"),
				icon: _(C),
				variant: "secondary",
				"data-testid": "new-preset",
				onClick: o[0] ||= (e) => v("new-preset")
			}, null, 8, ["label", "icon"])], 2),
			h(a("input", {
				"onUpdate:modelValue": o[1] ||= (e) => w.value = e,
				type: "search",
				class: l(_(A).search_input),
				"data-testid": "preset-search",
				placeholder: _(y)("prompt.preset_browser.search_placeholder"),
				"aria-label": _(y)("prompt.preset_browser.search_placeholder")
			}, null, 10, j), [[c, w.value]]),
			D.value.size > 0 ? (e(), s("button", {
				key: 0,
				type: "button",
				class: l(["tc-interactive", _(A).bulk_delete_button]),
				"data-testid": "bulk-delete-action",
				onClick: o[2] ||= (e) => O.value = !0
			}, d(_(y)("prompt.preset_browser.bulk_delete_action")) + " (" + d(D.value.size) + ") ", 3)) : b("", !0),
			r(S, {
				status: k.value,
				"empty-message": F.value,
				"error-message": _(y)("prompt.preset_browser.load_error")
			}, {
				default: t(() => [(e(!0), s(m, null, n(L.value, ([t, i]) => (e(), s("div", { key: t ?? "__ungrouped__" }, [a("div", { class: l(_(A).group_header) }, [a("span", null, d(t ?? _(y)("prompt.preset_browser.ungrouped_label")), 1), a("button", {
					type: "button",
					class: l(["tc-interactive", _(A).icon_text_button]),
					"aria-label": _(y)("prompt.preset_browser.random_group_action"),
					"data-testid": "random-group",
					onClick: (e) => z(i)
				}, [r(_(T), {
					size: 14,
					"aria-hidden": "true"
				})], 10, M)], 2), a("ul", { class: l(_(A).preset_list) }, [(e(!0), s(m, null, n(i, (t) => (e(), s("li", {
					key: t.id,
					class: l([_(A).preset_row, t.id === g.selectedPresetId && _(A).preset_row_selected]),
					"data-testid": "preset-row"
				}, [a("input", {
					type: "checkbox",
					checked: D.value.has(t.id),
					"aria-label": t.display_name,
					"data-testid": "preset-bulk-checkbox",
					onChange: (e) => R(t.id, e.target.checked)
				}, null, 40, N), a("button", {
					type: "button",
					class: l(["tc-interactive", _(A).preset_name_button]),
					"data-testid": "preset-select",
					onClick: (e) => v("select", t.id)
				}, d(t.display_name), 11, P)], 2))), 128))], 2)]))), 128))]),
				_: 1
			}, 8, [
				"status",
				"empty-message",
				"error-message"
			]),
			r(E, {
				open: O.value,
				title: _(y)("prompt.preset_browser.bulk_delete_confirm_title", { n: D.value.size }, D.value.size),
				description: _(y)("prompt.preset_browser.bulk_delete_confirm_description"),
				"confirm-label": _(y)("confirmations.destructive.default_confirm_action"),
				"cancel-label": _(y)("confirmations.destructive.default_cancel_action"),
				"data-testid": "bulk-delete-confirm",
				"onUpdate:open": o[3] ||= (e) => O.value = e,
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
		fixedNegativePrompt: {},
		contextPreview: {}
	},
	emits: ["update:fixedPositivePrompt", "update:fixedNegativePrompt"],
	setup(i, { emit: c }) {
		let u = i, f = c, { t: p } = o();
		return (i, o) => (e(), s("div", {
			class: l(_(A).prompt_builder),
			"data-testid": "prompt-builder"
		}, [
			a("div", { class: l(_(A).section_header) }, [a("span", { class: l(_(A).section_title) }, d(_(p)("prompt.builder.title")), 3)], 2),
			r(w, { label: _(p)("prompt.fixed_prompts.positive_label") }, {
				default: t(({ fieldId: e }) => [a("textarea", {
					id: e,
					class: l(_(A).textarea),
					"data-testid": "fixed-positive-prompt",
					value: u.fixedPositivePrompt,
					placeholder: _(p)("prompt.fixed_prompts.positive_placeholder"),
					rows: "3",
					onInput: o[0] ||= (e) => f("update:fixedPositivePrompt", e.target.value)
				}, null, 42, I)]),
				_: 1
			}, 8, ["label"]),
			r(w, { label: _(p)("prompt.fixed_prompts.negative_label") }, {
				default: t(({ fieldId: e }) => [a("textarea", {
					id: e,
					class: l(_(A).textarea),
					"data-testid": "fixed-negative-prompt",
					value: u.fixedNegativePrompt,
					placeholder: _(p)("prompt.fixed_prompts.negative_placeholder"),
					rows: "3",
					onInput: o[1] ||= (e) => f("update:fixedNegativePrompt", e.target.value)
				}, null, 42, L)]),
				_: 1
			}, 8, ["label"]),
			a("div", { class: l(_(A).section_header) }, [a("span", { class: l(_(A).section_title) }, d(_(p)("prompt.builder.context_preview_title")), 3)], 2),
			a("div", {
				class: l(_(A).context_preview),
				"data-testid": "context-preview"
			}, [
				a("div", { class: l(_(A).context_block) }, [a("p", { class: l(_(A).context_block_title) }, d(_(p)("prompt.builder.world_info_label")), 3), r(S, {
					status: u.contextPreview && u.contextPreview.worldInfo.length > 0 ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": _(p)("prompt.builder.world_info_empty_description")
				}, {
					default: t(() => [a("ul", { class: l(_(A).context_list) }, [(e(!0), s(m, null, n(u.contextPreview?.worldInfo ?? [], (t, n) => (e(), s("li", { key: n }, d(t), 1))), 128))], 2)]),
					_: 1
				}, 8, ["status", "empty-message"])], 2),
				a("div", { class: l(_(A).context_block) }, [a("p", { class: l(_(A).context_block_title) }, d(_(p)("prompt.builder.user_persona_label")), 3), r(S, {
					status: u.contextPreview?.userPersona ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": _(p)("prompt.builder.user_persona_empty_description")
				}, {
					default: t(() => [a("p", null, d(u.contextPreview?.userPersona), 1)]),
					_: 1
				}, 8, ["status", "empty-message"])], 2),
				a("div", { class: l(_(A).context_block) }, [a("p", { class: l(_(A).context_block_title) }, d(_(p)("prompt.builder.character_context_label")), 3), r(S, {
					status: u.contextPreview?.characterContext ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": _(p)("prompt.builder.character_context_empty_description")
				}, {
					default: t(() => [a("p", null, d(u.contextPreview?.characterContext), 1)]),
					_: 1
				}, 8, ["status", "empty-message"])], 2)
			], 2)
		], 2));
	}
}), z = [
	"id",
	"value",
	"placeholder"
], B = {
	key: 0,
	"data-testid": "test-panel-running"
}, V = {
	key: 1,
	"data-testid": "test-panel-result"
}, H = {
	key: 2,
	role: "alert",
	"data-testid": "test-panel-unavailable"
}, U = {
	key: 3,
	role: "alert",
	"data-testid": "test-panel-error"
}, W = /* @__PURE__ */ v({
	__name: "PromptTestPanel",
	props: {
		inputValue: {},
		testCommand: {}
	},
	emits: ["update:inputValue", "run"],
	setup(n, { emit: i }) {
		let c = n, f = i, { t: p } = o(), m = u(() => c.testCommand.status === "error" && c.testCommand.failure.code === "capability_not_implemented");
		return (n, i) => (e(), s("div", {
			class: l(_(A).test_panel),
			"data-testid": "prompt-test-panel"
		}, [a("div", { class: l(_(A).section_header) }, [a("span", { class: l(_(A).section_title) }, d(_(p)("prompt.test_panel.title")), 3)], 2), a("div", { class: l(_(A).test_panel_body) }, [
			a("p", { class: l(_(A).tools_disabled_note) }, d(_(p)("prompt.test_panel.tools_disabled_note")), 3),
			r(w, { label: _(p)("prompt.test_panel.input_label") }, {
				default: t(({ fieldId: e }) => [a("textarea", {
					id: e,
					class: l(_(A).textarea),
					"data-testid": "test-panel-input",
					value: c.inputValue,
					placeholder: _(p)("prompt.test_panel.input_placeholder"),
					rows: "3",
					onInput: i[0] ||= (e) => f("update:inputValue", e.target.value)
				}, null, 42, z)]),
				_: 1
			}, 8, ["label"]),
			r(x, {
				label: _(p)("prompt.test_panel.run_action"),
				pending: c.testCommand.status === "pending",
				"data-testid": "test-panel-run",
				onClick: i[1] ||= (e) => f("run", c.inputValue)
			}, null, 8, ["label", "pending"]),
			c.testCommand.status === "pending" ? (e(), s("p", B, d(_(p)("prompt.test_panel.running")), 1)) : c.testCommand.status === "success" ? (e(), s("div", V, [a("p", { class: l(_(A).section_title) }, d(_(p)("prompt.test_panel.result_title")), 3), a("p", null, d(c.testCommand.result), 1)])) : m.value ? (e(), s("p", H, d(_(p)("prompt.test_panel.unavailable_description")), 1)) : c.testCommand.status === "error" ? (e(), s("p", U, d(_(p)("errors.unexpected")), 1)) : b("", !0)
		], 2)], 2));
	}
}), G = /* @__PURE__ */ v({
	__name: "QualityControls",
	props: {
		ucpEnabled: { type: Boolean },
		aqtEnabled: { type: Boolean }
	},
	emits: ["update:ucpEnabled", "update:aqtEnabled"],
	setup(t, { emit: n }) {
		let i = t, c = n, { t: u } = o();
		return (t, n) => (e(), s("div", {
			class: l(_(A).quality_controls),
			"data-testid": "quality-controls"
		}, [a("div", { class: l(_(A).section_header) }, [a("span", { class: l(_(A).section_title) }, d(_(u)("prompt.quality_controls.title")), 3)], 2), a("div", { class: l(_(A).switch_list) }, [r(D, {
			"model-value": i.ucpEnabled,
			label: _(u)("prompt.quality_controls.ucp_label"),
			description: _(u)("prompt.quality_controls.ucp_description"),
			"data-testid": "ucp-switch",
			"onUpdate:modelValue": n[0] ||= (e) => c("update:ucpEnabled", e)
		}, null, 8, [
			"model-value",
			"label",
			"description"
		]), r(D, {
			"model-value": i.aqtEnabled,
			label: _(u)("prompt.quality_controls.aqt_label"),
			description: _(u)("prompt.quality_controls.aqt_description"),
			"data-testid": "aqt-switch",
			"onUpdate:modelValue": n[1] ||= (e) => c("update:aqtEnabled", e)
		}, null, 8, [
			"model-value",
			"label",
			"description"
		])], 2)], 2));
	}
}), K = [
	"id",
	"value",
	"placeholder",
	"aria-describedby",
	"aria-invalid",
	"onInput"
], q = [
	"id",
	"value",
	"onInput"
], J = [
	"id",
	"value",
	"onInput"
], Y = ["id", "onUpdate:modelValue"], X = ["disabled", "onClick"], Z = /* @__PURE__ */ v({
	__name: "RegexRules",
	props: {
		rules: {},
		testResults: {}
	},
	emits: ["update:rules", "test"],
	setup(i, { emit: p }) {
		let v = i, x = p, { t: T } = o(), E = g({}), D = u(() => `${T("prompt.regex_rules.empty_title")} ${T("prompt.regex_rules.empty_description")}`);
		function O(e) {
			if (!e.pattern) return null;
			try {
				return new RegExp(e.pattern, e.flags), null;
			} catch (e) {
				let t = e instanceof Error ? e.message : String(e);
				return T("prompt.regex_rules.invalid_pattern", { message: t });
			}
		}
		function j() {
			let e = {
				id: crypto.randomUUID(),
				pattern: "",
				flags: "",
				replacement: ""
			};
			x("update:rules", [...v.rules, e]);
		}
		function M(e, t) {
			x("update:rules", v.rules.map((n) => n.id === e ? {
				...n,
				...t
			} : n));
		}
		function N(e) {
			x("update:rules", v.rules.filter((t) => t.id !== e));
		}
		function P(e) {
			x("test", e, E[e.id] ?? "");
		}
		function F(e) {
			let t = v.testResults[e];
			return t?.status === "success" ? t.result : null;
		}
		return (i, o) => (e(), s("div", {
			class: l(_(A).regex_rules),
			"data-testid": "regex-rules"
		}, [a("div", { class: l(_(A).section_header) }, [a("span", { class: l(_(A).section_title) }, d(_(T)("prompt.regex_rules.title")), 3), a("button", {
			type: "button",
			class: l(["tc-interactive", _(A).icon_text_button]),
			"data-testid": "add-regex-rule",
			onClick: j
		}, [r(_(C), {
			size: 14,
			"aria-hidden": "true"
		}), y(" " + d(_(T)("prompt.regex_rules.add_action")), 1)], 2)], 2), r(S, {
			status: v.rules.length === 0 ? "empty" : "ready",
			"empty-message": D.value
		}, {
			default: t(() => [(e(!0), s(m, null, n(v.rules, (n) => (e(), s("div", {
				key: n.id,
				class: l(_(A).rule_row),
				"data-testid": "regex-rule-row"
			}, [
				r(w, {
					label: _(T)("prompt.regex_rules.pattern_label"),
					error: O(n)
				}, {
					default: t(({ fieldId: e, describedBy: t, invalid: r }) => [a("input", {
						id: e,
						type: "text",
						class: l(_(A).text_input),
						"data-testid": "regex-pattern-input",
						value: n.pattern,
						placeholder: _(T)("prompt.regex_rules.pattern_placeholder"),
						"aria-describedby": t,
						"aria-invalid": r,
						onInput: (e) => M(n.id, { pattern: e.target.value })
					}, null, 42, K)]),
					_: 2
				}, 1032, ["label", "error"]),
				r(w, { label: _(T)("prompt.regex_rules.flags_label") }, {
					default: t(({ fieldId: e }) => [a("input", {
						id: e,
						type: "text",
						class: l(_(A).text_input_narrow),
						"data-testid": "regex-flags-input",
						value: n.flags,
						onInput: (e) => M(n.id, { flags: e.target.value })
					}, null, 42, q)]),
					_: 2
				}, 1032, ["label"]),
				r(w, { label: _(T)("prompt.replacement_rules.replacement_label") }, {
					default: t(({ fieldId: e }) => [a("input", {
						id: e,
						type: "text",
						class: l(_(A).text_input),
						"data-testid": "regex-replacement-input",
						value: n.replacement,
						onInput: (e) => M(n.id, { replacement: e.target.value })
					}, null, 42, J)]),
					_: 2
				}, 1032, ["label"]),
				r(w, { label: _(T)("prompt.regex_rules.test_input_label") }, {
					default: t(({ fieldId: e }) => [h(a("input", {
						id: e,
						"onUpdate:modelValue": (e) => E[n.id] = e,
						type: "text",
						class: l(_(A).text_input),
						"data-testid": "regex-test-input"
					}, null, 10, Y), [[c, E[n.id]]])]),
					_: 2
				}, 1032, ["label"]),
				a("span", { class: l(_(A).rule_row_action) }, [a("button", {
					type: "button",
					class: l(["tc-interactive", _(A).icon_text_button]),
					"data-testid": "regex-test-run",
					disabled: !!O(n),
					onClick: (e) => P(n)
				}, d(_(T)("prompt.regex_rules.test_action")), 11, X), r(k, {
					icon: _(f),
					size: "sm",
					label: _(T)("common.actions.delete"),
					"data-testid": "remove-regex-rule",
					onClick: (e) => N(n.id)
				}, null, 8, [
					"icon",
					"label",
					"onClick"
				])], 2),
				v.testResults[n.id]?.status === "success" ? (e(), s("p", {
					key: 0,
					class: l(_(A).test_result),
					"data-testid": "regex-test-result"
				}, d(_(T)("prompt.regex_rules.test_result_label")) + ": " + d(F(n.id)), 3)) : v.testResults[n.id]?.status === "error" ? (e(), s("p", {
					key: 1,
					role: "alert",
					class: l(_(A).test_result_error),
					"data-testid": "regex-test-error"
				}, d(_(T)("errors.unexpected")), 3)) : b("", !0)
			], 2))), 128))]),
			_: 1
		}, 8, ["status", "empty-message"])], 2));
	}
}), Q = [
	"id",
	"value",
	"placeholder",
	"onChange"
], $ = [
	"id",
	"value",
	"placeholder",
	"onInput"
], ee = /* @__PURE__ */ v({
	__name: "ReplacementRules",
	props: { rules: {} },
	emits: ["update:rules"],
	setup(i, { emit: c }) {
		let p = i, h = c, { t: g } = o(), v = u(() => `${g("prompt.replacement_rules.empty_title")} ${g("prompt.replacement_rules.empty_description")}`);
		function b(e) {
			return e.triggers.join(", ");
		}
		function x() {
			let e = {
				id: crypto.randomUUID(),
				triggers: [],
				replacement: ""
			};
			h("update:rules", [...p.rules, e]);
		}
		function T(e, t) {
			let n = t.split(",").map((e) => e.trim()).filter((e) => e.length > 0);
			h("update:rules", p.rules.map((t) => t.id === e ? {
				...t,
				triggers: n
			} : t));
		}
		function E(e, t) {
			h("update:rules", p.rules.map((n) => n.id === e ? {
				...n,
				replacement: t
			} : n));
		}
		function D(e) {
			h("update:rules", p.rules.filter((t) => t.id !== e));
		}
		return (i, o) => (e(), s("div", {
			class: l(_(A).replacement_rules),
			"data-testid": "replacement-rules"
		}, [a("div", { class: l(_(A).section_header) }, [a("span", { class: l(_(A).section_title) }, d(_(g)("prompt.replacement_rules.title")), 3), a("button", {
			type: "button",
			class: l(["tc-interactive", _(A).icon_text_button]),
			"data-testid": "add-replacement-rule",
			onClick: x
		}, [r(_(C), {
			size: 14,
			"aria-hidden": "true"
		}), y(" " + d(_(g)("prompt.replacement_rules.add_action")), 1)], 2)], 2), r(S, {
			status: p.rules.length === 0 ? "empty" : "ready",
			"empty-message": v.value
		}, {
			default: t(() => [(e(!0), s(m, null, n(p.rules, (n) => (e(), s("div", {
				key: n.id,
				class: l(_(A).rule_row),
				"data-testid": "replacement-rule-row"
			}, [
				r(w, {
					label: _(g)("prompt.replacement_rules.trigger_label"),
					hint: _(g)("prompt.replacement_rules.triggers_hint")
				}, {
					default: t(({ fieldId: e }) => [a("input", {
						id: e,
						type: "text",
						class: l(_(A).text_input),
						"data-testid": "replacement-triggers-input",
						value: b(n),
						placeholder: _(g)("prompt.replacement_rules.trigger_placeholder"),
						onChange: (e) => T(n.id, e.target.value)
					}, null, 42, Q)]),
					_: 2
				}, 1032, ["label", "hint"]),
				r(w, { label: _(g)("prompt.replacement_rules.replacement_label") }, {
					default: t(({ fieldId: e }) => [a("input", {
						id: e,
						type: "text",
						class: l(_(A).text_input),
						"data-testid": "replacement-value-input",
						value: n.replacement,
						placeholder: _(g)("prompt.replacement_rules.replacement_placeholder"),
						onInput: (e) => E(n.id, e.target.value)
					}, null, 42, $)]),
					_: 2
				}, 1032, ["label"]),
				a("span", { class: l(_(A).rule_row_action) }, [r(k, {
					icon: _(f),
					size: "sm",
					label: _(g)("common.actions.delete"),
					"data-testid": "remove-replacement-rule",
					onClick: (e) => D(n.id)
				}, null, 8, [
					"icon",
					"label",
					"onClick"
				])], 2)
			], 2))), 128))]),
			_: 1
		}, 8, ["status", "empty-message"])], 2));
	}
});
//#endregion
//#region src/ui/views/prompt/use_toasts.ts
function te() {
	let e = p([]);
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
var ne = ["id", "value"], re = /* @__PURE__ */ v({
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
	setup(n, { emit: c }) {
		let u = n, d = c, { t: f } = o(), { toasts: h, push: g, dismiss: v } = te(), y = p(null), C = p(!1), T = p(!1), D = p(!1), k = p(null), j = p(""), M = p({});
		function N(e) {
			return e ? JSON.stringify(e) : "";
		}
		let P = () => u.state.prompt.draft !== null && y.value !== null && N(u.state.prompt.draft) !== N(y.value);
		i(() => u.state.prompt.draft, (e) => {
			(C.value || y.value === null) && e && (y.value = e, C.value = !1, T.value = !1, D.value = !1, M.value = {}), e === null && (y.value = null);
		}, { immediate: !0 });
		function I(e) {
			if (P()) {
				k.value = {
					kind: "select",
					presetId: e
				};
				return;
			}
			C.value = !0, d("select-preset", e);
		}
		function L() {
			if (P()) {
				k.value = { kind: "new" };
				return;
			}
			C.value = !0, d("new-preset");
		}
		function z() {
			let e = k.value;
			k.value = null, e && (C.value = !0, e.kind === "select" ? d("select-preset", e.presetId) : d("new-preset"));
		}
		function B(e) {
			d("update-draft", e);
		}
		function V() {
			u.state.prompt.draft && d("save", u.state.prompt.draft);
		}
		i(() => u.state.prompt.save_command, (e) => {
			e.status === "success" && (g({
				title: f("common.actions.save"),
				description: f("status.success"),
				variant: "success"
			}), y.value = null);
		});
		async function H(e, t) {
			M.value = {
				...M.value,
				[e.id]: { status: "pending" }
			};
			try {
				let n = await u.testRegex(e, t);
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
			j.value = e, d("run-test", e);
		}
		return (n, i) => (e(), s("div", {
			class: l(_(A).prompt_view),
			"data-testid": "prompt-view"
		}, [
			a("div", { class: l(_(A).browser_column) }, [r(F, {
				presets: u.state.prompt.presets,
				"selected-preset-id": u.state.prompt.selected_preset_id,
				loading: u.state.loading.has("prompt_presets"),
				"has-error": u.state.failures.has("prompt_presets"),
				onSelect: I,
				onNewPreset: L,
				onBulkDelete: i[0] ||= (e) => d("bulk-delete-presets", e)
			}, null, 8, [
				"presets",
				"selected-preset-id",
				"loading",
				"has-error"
			])], 2),
			a("div", { class: l(_(A).editor_column) }, [r(S, {
				status: u.state.prompt.draft ? "ready" : "empty",
				"empty-message": `${_(f)("prompt.preset_browser.empty_title")} ${_(f)("prompt.preset_browser.empty_description")}`
			}, {
				default: t(() => [u.state.prompt.draft ? (e(), s(m, { key: 0 }, [
					a("div", { class: l(_(A).name_row) }, [r(w, { label: _(f)("common.labels.name") }, {
						default: t(({ fieldId: e }) => [a("input", {
							id: e,
							type: "text",
							class: l(_(A).text_input),
							"data-testid": "preset-name-input",
							value: u.state.prompt.draft.display_name,
							onInput: i[1] ||= (e) => B({ display_name: e.target.value })
						}, null, 42, ne)]),
						_: 1
					}, 8, ["label"]), r(x, {
						label: _(f)("common.actions.save"),
						variant: "primary",
						pending: u.state.prompt.save_command.status === "pending",
						"data-testid": "save-preset",
						onClick: V
					}, null, 8, ["label", "pending"])], 2),
					r(R, {
						"fixed-positive-prompt": u.state.prompt.draft.fixed_positive_prompt,
						"fixed-negative-prompt": u.state.prompt.draft.fixed_negative_prompt,
						"context-preview": u.contextPreview ?? null,
						"onUpdate:fixedPositivePrompt": i[2] ||= (e) => B({ fixed_positive_prompt: e }),
						"onUpdate:fixedNegativePrompt": i[3] ||= (e) => B({ fixed_negative_prompt: e })
					}, null, 8, [
						"fixed-positive-prompt",
						"fixed-negative-prompt",
						"context-preview"
					]),
					r(G, {
						"ucp-enabled": T.value,
						"onUpdate:ucpEnabled": i[4] ||= (e) => T.value = e,
						"aqt-enabled": D.value,
						"onUpdate:aqtEnabled": i[5] ||= (e) => D.value = e
					}, null, 8, ["ucp-enabled", "aqt-enabled"]),
					r(ee, {
						rules: u.state.prompt.draft.replacement_rules,
						"onUpdate:rules": i[6] ||= (e) => B({ replacement_rules: e })
					}, null, 8, ["rules"]),
					r(Z, {
						rules: u.state.prompt.draft.regex_rules,
						"test-results": M.value,
						"onUpdate:rules": i[7] ||= (e) => B({ regex_rules: e }),
						onTest: H
					}, null, 8, ["rules", "test-results"]),
					r(W, {
						"input-value": j.value,
						"test-command": u.testCommand ?? {
							status: "error",
							failure: { code: "capability_not_implemented" }
						},
						"onUpdate:inputValue": i[8] ||= (e) => j.value = e,
						onRun: U
					}, null, 8, ["input-value", "test-command"])
				], 64)) : b("", !0)]),
				_: 1
			}, 8, ["status", "empty-message"])], 2),
			r(E, {
				open: k.value !== null,
				title: _(f)("confirmations.discard_unsaved.title"),
				description: _(f)("confirmations.discard_unsaved.description"),
				"confirm-label": _(f)("confirmations.discard_unsaved.discard_action"),
				"cancel-label": _(f)("confirmations.discard_unsaved.stay_action"),
				"data-testid": "discard-unsaved-confirm",
				"onUpdate:open": i[9] ||= (e) => k.value = e ? k.value : null,
				onConfirm: z
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			]),
			r(O, {
				toasts: _(h),
				"viewport-label": _(f)("common.notifications.viewport_label"),
				"announce-label": _(f)("common.notifications.announce_label"),
				"close-label": _(f)("common.actions.close"),
				onDismiss: _(v)
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
export { re as default };

//# sourceMappingURL=PromptView-CzcfWjzg.js.map