import { $ as e, F as t, G as n, N as r, V as i, W as a, _ as o, a as s, ct as c, et as l, g as u, m as d, n as f, p, pt as m, u as h, ut as g, v as _, x as v, y } from "./vue-i18n-DUz2Gjn8.js";
import { t as b } from "./AppIcon-Cnhzrx9o.js";
import { n as x, t as S } from "./StateSurface-Bo_sA18G.js";
import { n as C, t as w } from "./FieldGroup-LDtWeac7.js";
import { t as T } from "./shuffle-BAB9O4dE.js";
import { t as E } from "./x-CDKrptQJ.js";
import { t as D } from "./ToastViewport-DoW6gPt4.js";
import { n as O, t as k } from "./AppSwitch-x2vuooAG.js";
import { t as A } from "./IconButton-BvRQHJyk.js";
var j = {
	prompt_view: "_prompt_view_1d2kr_7",
	browser_column: "_browser_column_1d2kr_14",
	editor_column: "_editor_column_1d2kr_18",
	section_header: "_section_header_1d2kr_40",
	section_title: "_section_title_1d2kr_48",
	icon_text_button: "_icon_text_button_1d2kr_55",
	text_input: "_text_input_1d2kr_63",
	text_input_narrow: "_text_input_narrow_1d2kr_74",
	textarea: "_textarea_1d2kr_91",
	preset_browser: "_preset_browser_1d2kr_111",
	search_input: "_search_input_1d2kr_116",
	bulk_delete_button: "_bulk_delete_button_1d2kr_126",
	group_header: "_group_header_1d2kr_135",
	preset_list: "_preset_list_1d2kr_145",
	preset_row: "_preset_row_1d2kr_150",
	preset_row_selected: "_preset_row_selected_1d2kr_157",
	preset_name_button: "_preset_name_button_1d2kr_161",
	name_row: "_name_row_1d2kr_173",
	prompt_builder: "_prompt_builder_1d2kr_187",
	context_preview: "_context_preview_1d2kr_195",
	context_block_title: "_context_block_title_1d2kr_202",
	context_list: "_context_list_1d2kr_208",
	quality_controls: "_quality_controls_1d2kr_215",
	switch_list: "_switch_list_1d2kr_220",
	replacement_rules: "_replacement_rules_1d2kr_229",
	regex_rules: "_regex_rules_1d2kr_230",
	rule_row: "_rule_row_1d2kr_235",
	rule_row_action: "_rule_row_action_1d2kr_244",
	test_result: "_test_result_1d2kr_257",
	test_result_error: "_test_result_error_1d2kr_264",
	test_panel: "_test_panel_1d2kr_273",
	test_panel_body: "_test_panel_body_1d2kr_281",
	tools_disabled_note: "_tools_disabled_note_1d2kr_288"
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
	setup(e, { emit: i }) {
		let _ = e, v = i, { t: w } = f(), E = l(""), D = l(/* @__PURE__ */ new Set()), k = l(!1), A = p(() => _.loading ? "loading" : _.hasError ? "error" : _.presets.length === 0 ? "empty" : "ready"), I = p(() => {
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
			class: g(c(j).preset_browser),
			"data-testid": "preset-browser"
		}, [
			d("div", { class: g(c(j).section_header) }, [d("span", { class: g(c(j).section_title) }, m(c(w)("prompt.preset_browser.title")), 3), y(x, {
				label: c(w)("prompt.preset_browser.new_preset_action"),
				icon: c(C),
				variant: "secondary",
				"data-testid": "new-preset",
				onClick: i[0] ||= (e) => v("new-preset")
			}, null, 8, ["label", "icon"])], 2),
			n(d("input", {
				"onUpdate:modelValue": i[1] ||= (e) => E.value = e,
				type: "search",
				class: g(c(j).search_input),
				"data-testid": "preset-search",
				placeholder: c(w)("prompt.preset_browser.search_placeholder"),
				"aria-label": c(w)("prompt.preset_browser.search_placeholder")
			}, null, 10, M), [[s, E.value]]),
			D.value.size > 0 ? (r(), o("button", {
				key: 0,
				type: "button",
				class: g(["tc-interactive", c(j).bulk_delete_button]),
				"data-testid": "bulk-delete-action",
				onClick: i[2] ||= (e) => k.value = !0
			}, m(c(w)("prompt.preset_browser.bulk_delete_action")) + " (" + m(D.value.size) + ") ", 3)) : u("", !0),
			y(S, {
				status: A.value,
				"empty-title": c(w)("prompt.preset_browser.empty_title"),
				"empty-message": c(w)("prompt.preset_browser.empty_description"),
				"error-message": c(w)("prompt.preset_browser.load_error")
			}, {
				default: a(() => [(r(!0), o(h, null, t(L.value, ([e, n]) => (r(), o("div", { key: e ?? "__ungrouped__" }, [d("div", { class: g(c(j).group_header) }, [d("span", null, m(e ?? c(w)("prompt.preset_browser.ungrouped_label")), 1), d("button", {
					type: "button",
					class: g(["tc-interactive", c(j).icon_text_button]),
					"aria-label": c(w)("prompt.preset_browser.random_group_action"),
					"data-testid": "random-group",
					onClick: (e) => z(n)
				}, [y(b, {
					icon: c(T),
					size: 14
				}, null, 8, ["icon"])], 10, N)], 2), d("ul", { class: g(c(j).preset_list) }, [(r(!0), o(h, null, t(n, (e) => (r(), o("li", {
					key: e.id,
					class: g([c(j).preset_row, e.id === _.selectedPresetId && c(j).preset_row_selected]),
					"data-testid": "preset-row"
				}, [d("input", {
					type: "checkbox",
					checked: D.value.has(e.id),
					"aria-label": e.display_name,
					"data-testid": "preset-bulk-checkbox",
					onChange: (t) => R(e.id, t.target.checked)
				}, null, 40, P), d("button", {
					type: "button",
					class: g(["tc-interactive", c(j).preset_name_button]),
					"data-testid": "preset-select",
					onClick: (t) => v("select", e.id)
				}, m(e.display_name), 11, F)], 2))), 128))], 2)]))), 128))]),
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
	setup(e, { emit: n }) {
		let i = e, s = n, { t: l } = f();
		return (e, n) => (r(), o("div", {
			class: g(c(j).prompt_builder),
			"data-testid": "prompt-builder"
		}, [
			d("div", { class: g(c(j).section_header) }, [d("span", { class: g(c(j).section_title) }, m(c(l)("prompt.builder.title")), 3)], 2),
			y(w, { label: c(l)("prompt.fixed_prompts.positive_label") }, {
				default: a(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: g(c(j).textarea),
					"data-testid": "fixed-positive-prompt",
					value: i.fixedPositivePrompt,
					placeholder: c(l)("prompt.fixed_prompts.positive_placeholder"),
					rows: "3",
					onInput: n[0] ||= (e) => s("update:fixedPositivePrompt", e.target.value)
				}, null, 42, L)]),
				_: 1
			}, 8, ["label"]),
			y(w, { label: c(l)("prompt.fixed_prompts.negative_label") }, {
				default: a(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: g(c(j).textarea),
					"data-testid": "fixed-negative-prompt",
					value: i.fixedNegativePrompt,
					placeholder: c(l)("prompt.fixed_prompts.negative_placeholder"),
					rows: "3",
					onInput: n[1] ||= (e) => s("update:fixedNegativePrompt", e.target.value)
				}, null, 42, R)]),
				_: 1
			}, 8, ["label"]),
			d("div", { class: g(c(j).section_header) }, [d("span", { class: g(c(j).section_title) }, m(c(l)("prompt.builder.context_preview_title")), 3)], 2),
			d("div", {
				class: g(c(j).context_preview),
				"data-testid": "context-preview"
			}, [
				d("div", { class: g(c(j).context_block) }, [d("p", { class: g(c(j).context_block_title) }, m(c(l)("prompt.builder.world_info_label")), 3), y(S, {
					status: i.contextPreview && i.contextPreview.worldInfo.length > 0 ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": c(l)("prompt.builder.world_info_empty_description")
				}, {
					default: a(() => [d("ul", { class: g(c(j).context_list) }, [(r(!0), o(h, null, t(i.contextPreview?.worldInfo ?? [], (e, t) => (r(), o("li", { key: t }, m(e), 1))), 128))], 2)]),
					_: 1
				}, 8, ["status", "empty-message"])], 2),
				d("div", { class: g(c(j).context_block) }, [d("p", { class: g(c(j).context_block_title) }, m(c(l)("prompt.builder.user_persona_label")), 3), y(S, {
					status: i.contextPreview?.userPersona ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": c(l)("prompt.builder.user_persona_empty_description")
				}, {
					default: a(() => [d("p", null, m(i.contextPreview?.userPersona), 1)]),
					_: 1
				}, 8, ["status", "empty-message"])], 2),
				d("div", { class: g(c(j).context_block) }, [d("p", { class: g(c(j).context_block_title) }, m(c(l)("prompt.builder.character_context_label")), 3), y(S, {
					status: i.contextPreview?.characterContext ? "ready" : "empty",
					"min-height": "32px",
					"empty-message": c(l)("prompt.builder.character_context_empty_description")
				}, {
					default: a(() => [d("p", null, m(i.contextPreview?.characterContext), 1)]),
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
		let n = e, i = t, { t: s } = f(), l = p(() => n.testCommand.status === "error" && n.testCommand.failure.code === "capability_not_implemented");
		return (e, t) => (r(), o("div", {
			class: g(c(j).test_panel),
			"data-testid": "prompt-test-panel"
		}, [d("div", { class: g(c(j).section_header) }, [d("span", { class: g(c(j).section_title) }, m(c(s)("prompt.test_panel.title")), 3)], 2), d("div", { class: g(c(j).test_panel_body) }, [
			d("p", { class: g(c(j).tools_disabled_note) }, m(c(s)("prompt.test_panel.tools_disabled_note")), 3),
			y(w, { label: c(s)("prompt.test_panel.input_label") }, {
				default: a(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: g(c(j).textarea),
					"data-testid": "test-panel-input",
					value: n.inputValue,
					placeholder: c(s)("prompt.test_panel.input_placeholder"),
					rows: "3",
					onInput: t[0] ||= (e) => i("update:inputValue", e.target.value)
				}, null, 42, B)]),
				_: 1
			}, 8, ["label"]),
			y(x, {
				label: c(s)("prompt.test_panel.run_action"),
				pending: n.testCommand.status === "pending",
				"data-testid": "test-panel-run",
				onClick: t[1] ||= (e) => i("run", n.inputValue)
			}, null, 8, ["label", "pending"]),
			n.testCommand.status === "pending" ? (r(), o("p", V, m(c(s)("prompt.test_panel.running")), 1)) : n.testCommand.status === "success" ? (r(), o("div", H, [d("p", { class: g(c(j).section_title) }, m(c(s)("prompt.test_panel.result_title")), 3), d("p", null, m(n.testCommand.result), 1)])) : l.value ? (r(), o("p", U, m(c(s)("prompt.test_panel.unavailable_description")), 1)) : n.testCommand.status === "error" ? (r(), o("p", W, m(c(s)("errors.unexpected")), 1)) : u("", !0)
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
		let n = e, i = t, { t: a } = f();
		return (e, t) => (r(), o("div", {
			class: g(c(j).quality_controls),
			"data-testid": "quality-controls"
		}, [d("div", { class: g(c(j).section_header) }, [d("span", { class: g(c(j).section_title) }, m(c(a)("prompt.quality_controls.title")), 3)], 2), d("div", { class: g(c(j).switch_list) }, [y(k, {
			"model-value": n.ucpEnabled,
			label: c(a)("prompt.quality_controls.ucp_label"),
			description: c(a)("prompt.quality_controls.ucp_description"),
			"data-testid": "ucp-switch",
			"onUpdate:modelValue": t[0] ||= (e) => i("update:ucpEnabled", e)
		}, null, 8, [
			"model-value",
			"label",
			"description"
		]), y(k, {
			"model-value": n.aqtEnabled,
			label: c(a)("prompt.quality_controls.aqt_label"),
			description: c(a)("prompt.quality_controls.aqt_description"),
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
		function k(e, t) {
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
			class: g(c(j).regex_rules),
			"data-testid": "regex-rules"
		}, [d("div", { class: g(c(j).section_header) }, [d("span", { class: g(c(j).section_title) }, m(c(x)("prompt.regex_rules.title")), 3), d("button", {
			type: "button",
			class: g(["tc-interactive", c(j).icon_text_button]),
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
				class: g(c(j).rule_row),
				"data-testid": "regex-rule-row"
			}, [
				y(w, {
					label: c(x)("prompt.regex_rules.pattern_label"),
					error: D(e)
				}, {
					default: a(({ fieldId: t, describedBy: n, invalid: r }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(j).text_input),
						"data-testid": "regex-pattern-input",
						value: e.pattern,
						placeholder: c(x)("prompt.regex_rules.pattern_placeholder"),
						"aria-describedby": n,
						"aria-invalid": r,
						onInput: (t) => k(e.id, { pattern: t.target.value })
					}, null, 42, q)]),
					_: 2
				}, 1032, ["label", "error"]),
				y(w, { label: c(x)("prompt.regex_rules.flags_label") }, {
					default: a(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(j).text_input_narrow),
						"data-testid": "regex-flags-input",
						value: e.flags,
						onInput: (t) => k(e.id, { flags: t.target.value })
					}, null, 42, J)]),
					_: 2
				}, 1032, ["label"]),
				y(w, { label: c(x)("prompt.replacement_rules.replacement_label") }, {
					default: a(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(j).text_input),
						"data-testid": "regex-replacement-input",
						value: e.replacement,
						onInput: (t) => k(e.id, { replacement: t.target.value })
					}, null, 42, Y)]),
					_: 2
				}, 1032, ["label"]),
				y(w, { label: c(x)("prompt.regex_rules.test_input_label") }, {
					default: a(({ fieldId: t }) => [n(d("input", {
						id: t,
						"onUpdate:modelValue": (t) => T[e.id] = t,
						type: "text",
						class: g(c(j).text_input),
						"data-testid": "regex-test-input"
					}, null, 10, X), [[s, T[e.id]]])]),
					_: 2
				}, 1032, ["label"]),
				d("span", { class: g(c(j).rule_row_action) }, [d("button", {
					type: "button",
					class: g(["tc-interactive", c(j).icon_text_button]),
					"data-testid": "regex-test-run",
					disabled: !!D(e),
					onClick: (t) => N(e)
				}, m(c(x)("prompt.regex_rules.test_action")), 11, Z), y(A, {
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
					class: g(c(j).test_result),
					"data-testid": "regex-test-result"
				}, m(c(x)("prompt.regex_rules.test_result_label")) + ": " + m(P(e.id)), 3)) : p.testResults[e.id]?.status === "error" ? (r(), o("p", {
					key: 1,
					role: "alert",
					class: g(c(j).test_result_error),
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
			class: g(c(j).replacement_rules),
			"data-testid": "replacement-rules"
		}, [d("div", { class: g(c(j).section_header) }, [d("span", { class: g(c(j).section_title) }, m(c(l)("prompt.replacement_rules.title")), 3), d("button", {
			type: "button",
			class: g(["tc-interactive", c(j).icon_text_button]),
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
				class: g(c(j).rule_row),
				"data-testid": "replacement-rule-row"
			}, [
				y(w, {
					label: c(l)("prompt.replacement_rules.trigger_label"),
					hint: c(l)("prompt.replacement_rules.triggers_hint")
				}, {
					default: a(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(j).text_input),
						"data-testid": "replacement-triggers-input",
						value: u(e),
						placeholder: c(l)("prompt.replacement_rules.trigger_placeholder"),
						onChange: (t) => v(e.id, t.target.value)
					}, null, 42, $)]),
					_: 2
				}, 1032, ["label", "hint"]),
				y(w, { label: c(l)("prompt.replacement_rules.replacement_label") }, {
					default: a(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: g(c(j).text_input),
						"data-testid": "replacement-value-input",
						value: e.replacement,
						placeholder: c(l)("prompt.replacement_rules.replacement_placeholder"),
						onInput: (t) => x(e.id, t.target.value)
					}, null, 42, ee)]),
					_: 2
				}, 1032, ["label"]),
				d("span", { class: g(c(j).rule_row_action) }, [y(A, {
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
function ne() {
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
	setup(e, { emit: t }) {
		let n = e, s = t, { t: p } = f(), { toasts: m, push: _, dismiss: v } = ne(), b = l(null), C = l(!1), T = l(!1), E = l(!1), k = l(null), A = l(""), M = l({});
		function N(e) {
			return e ? JSON.stringify(e) : "";
		}
		let P = () => n.state.prompt.draft !== null && b.value !== null && N(n.state.prompt.draft) !== N(b.value);
		i(() => n.state.prompt.draft, (e) => {
			(C.value || b.value === null) && e && (b.value = e, C.value = !1, T.value = !1, E.value = !1, M.value = {}), e === null && (b.value = null);
		}, { immediate: !0 });
		function F(e) {
			if (P()) {
				k.value = {
					kind: "select",
					presetId: e
				};
				return;
			}
			C.value = !0, s("select-preset", e);
		}
		function L() {
			if (P()) {
				k.value = { kind: "new" };
				return;
			}
			C.value = !0, s("new-preset");
		}
		function R() {
			let e = k.value;
			k.value = null, e && (C.value = !0, e.kind === "select" ? s("select-preset", e.presetId) : s("new-preset"));
		}
		function B(e) {
			s("update-draft", e);
		}
		function V() {
			n.state.prompt.draft && s("save", n.state.prompt.draft);
		}
		i(() => n.state.prompt.save_command, (e) => {
			e.status === "success" && (_({
				title: p("common.actions.save"),
				description: p("status.success"),
				variant: "success"
			}), b.value = null);
		});
		async function H(e, t) {
			M.value = {
				...M.value,
				[e.id]: { status: "pending" }
			};
			try {
				let r = await n.testRegex(e, t);
				M.value = {
					...M.value,
					[e.id]: {
						status: "success",
						result: r
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
			A.value = e, s("run-test", e);
		}
		return (e, t) => (r(), o("div", {
			class: g(c(j).prompt_view),
			"data-testid": "prompt-view"
		}, [
			d("div", { class: g(c(j).browser_column) }, [y(I, {
				presets: n.state.prompt.presets,
				"selected-preset-id": n.state.prompt.selected_preset_id,
				loading: n.state.loading.has("prompt_presets"),
				"has-error": n.state.failures.has("prompt_presets"),
				onSelect: F,
				onNewPreset: L,
				onBulkDelete: t[0] ||= (e) => s("bulk-delete-presets", e)
			}, null, 8, [
				"presets",
				"selected-preset-id",
				"loading",
				"has-error"
			])], 2),
			d("div", { class: g(c(j).editor_column) }, [y(S, {
				status: n.state.prompt.draft ? "ready" : "empty",
				"empty-title": c(p)("prompt.preset_browser.empty_title"),
				"empty-message": c(p)("prompt.preset_browser.empty_description")
			}, {
				default: a(() => [n.state.prompt.draft ? (r(), o(h, { key: 0 }, [
					d("div", { class: g(c(j).name_row) }, [y(w, { label: c(p)("common.labels.name") }, {
						default: a(({ fieldId: e }) => [d("input", {
							id: e,
							type: "text",
							class: g(c(j).text_input),
							"data-testid": "preset-name-input",
							value: n.state.prompt.draft.display_name,
							onInput: t[1] ||= (e) => B({ display_name: e.target.value })
						}, null, 42, re)]),
						_: 1
					}, 8, ["label"]), y(x, {
						label: c(p)("common.actions.save"),
						variant: "primary",
						pending: n.state.prompt.save_command.status === "pending",
						"data-testid": "save-preset",
						onClick: V
					}, null, 8, ["label", "pending"])], 2),
					y(z, {
						"fixed-positive-prompt": n.state.prompt.draft.fixed_positive_prompt,
						"fixed-negative-prompt": n.state.prompt.draft.fixed_negative_prompt,
						"context-preview": n.contextPreview ?? null,
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
						rules: n.state.prompt.draft.replacement_rules,
						"onUpdate:rules": t[6] ||= (e) => B({ replacement_rules: e })
					}, null, 8, ["rules"]),
					y(Q, {
						rules: n.state.prompt.draft.regex_rules,
						"test-results": M.value,
						"onUpdate:rules": t[7] ||= (e) => B({ regex_rules: e }),
						onTest: H
					}, null, 8, ["rules", "test-results"]),
					y(G, {
						"input-value": A.value,
						"test-command": n.testCommand ?? {
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
			y(O, {
				open: k.value !== null,
				title: c(p)("confirmations.discard_unsaved.title"),
				description: c(p)("confirmations.discard_unsaved.description"),
				"confirm-label": c(p)("confirmations.discard_unsaved.discard_action"),
				"cancel-label": c(p)("confirmations.discard_unsaved.stay_action"),
				"data-testid": "discard-unsaved-confirm",
				"onUpdate:open": t[9] ||= (e) => k.value = e ? k.value : null,
				onConfirm: R
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
export { ie as default };
