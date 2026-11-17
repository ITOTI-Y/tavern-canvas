import { F as e, J as t, L as n, W as r, _ as i, a, dt as o, g as s, gt as c, m as l, n as u, nt as d, p as f, pt as p, q as m, rt as h, u as g, v as _, x as v, y } from "./vue-i18n-XoxYzLIP.js";
import { t as b } from "./AppIcon-DD754F_c.js";
import { n as x, t as S } from "./FieldGroup-B_z8muEe.js";
import { t as C } from "./shuffle-COaJroO0.js";
import { t as w } from "./x-CyHrRl6n.js";
import { t as T } from "./IconButton-B3DZhN69.js";
import { t as E } from "./ToastViewport-D9ShULRd.js";
import { t as D } from "./ConfirmDialog-YmdHM2H5.js";
import { n as O, t as k } from "./StateSurface-D7OPOCWT.js";
import { t as A } from "./prompt_styles-DfG7McZY.js";
import { t as j } from "./use_toasts-BkstxFb0.js";
//#region src/ui/views/prompt/PresetBrowser.vue?vue&type=script&setup=true&lang.ts
var M = ["placeholder", "aria-label"], N = ["aria-label", "onClick"], P = [
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
	setup(r, { emit: d }) {
		let _ = r, v = d, { t: S } = u(), w = h(""), T = h(/* @__PURE__ */ new Set()), E = h(!1), j = f(() => _.loading ? "loading" : _.hasError ? "error" : _.presets.length === 0 ? "empty" : "ready"), I = f(() => {
			let e = w.value.trim().toLowerCase();
			return e ? _.presets.filter((t) => t.display_name.toLowerCase().includes(e)) : _.presets;
		}), L = f(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of I.value) {
				let n = t.group, r = e.get(n) ?? [];
				r.push(t), e.set(n, r);
			}
			return [...e.entries()].sort(([e], [t]) => e === null ? 1 : t === null ? -1 : e.localeCompare(t));
		});
		function R(e, t) {
			let n = new Set(T.value);
			t ? n.add(e) : n.delete(e), T.value = n;
		}
		function z(e) {
			if (e.length === 0) return;
			let t = e[Math.floor(Math.random() * e.length)];
			t && v("select", t.id);
		}
		function B() {
			v("bulk-delete", [...T.value]), T.value = /* @__PURE__ */ new Set(), E.value = !1;
		}
		return (r, u) => (e(), i("div", {
			class: p(o(A).preset_browser),
			"data-testid": "preset-browser"
		}, [
			l("div", { class: p(o(A).section_header) }, [l("span", { class: p(o(A).section_title) }, c(o(S)("prompt.preset_browser.title")), 3), y(O, {
				label: o(S)("prompt.preset_browser.new_preset_action"),
				icon: o(x),
				variant: "secondary",
				"data-testid": "new-preset",
				onClick: u[0] ||= (e) => v("new-preset")
			}, null, 8, ["label", "icon"])], 2),
			t(l("input", {
				"onUpdate:modelValue": u[1] ||= (e) => w.value = e,
				type: "search",
				class: p(o(A).search_input),
				"data-testid": "preset-search",
				placeholder: o(S)("prompt.preset_browser.search_placeholder"),
				"aria-label": o(S)("prompt.preset_browser.search_placeholder")
			}, null, 10, M), [[a, w.value]]),
			T.value.size > 0 ? (e(), i("button", {
				key: 0,
				type: "button",
				class: p(["tc-interactive", o(A).bulk_delete_button]),
				"data-testid": "bulk-delete-action",
				onClick: u[2] ||= (e) => E.value = !0
			}, c(o(S)("prompt.preset_browser.bulk_delete_action")) + " (" + c(T.value.size) + ") ", 3)) : s("", !0),
			y(k, {
				status: j.value,
				"empty-title": o(S)("prompt.preset_browser.empty_title"),
				"empty-message": o(S)("prompt.preset_browser.empty_description"),
				"error-message": o(S)("prompt.preset_browser.load_error")
			}, {
				default: m(() => [(e(!0), i(g, null, n(L.value, ([t, r]) => (e(), i("div", { key: t ?? "__ungrouped__" }, [l("div", { class: p(o(A).group_header) }, [l("span", null, c(t ?? o(S)("prompt.preset_browser.ungrouped_label")), 1), l("button", {
					type: "button",
					class: p(["tc-interactive", o(A).icon_text_button]),
					"aria-label": o(S)("prompt.preset_browser.random_group_action"),
					"data-testid": "random-group",
					onClick: (e) => z(r)
				}, [y(b, {
					icon: o(C),
					size: 14
				}, null, 8, ["icon"])], 10, N)], 2), l("ul", { class: p(o(A).preset_list) }, [(e(!0), i(g, null, n(r, (t) => (e(), i("li", {
					key: t.id,
					class: p([o(A).preset_row, t.id === _.selectedPresetId && o(A).preset_row_selected]),
					"data-testid": "preset-row"
				}, [l("input", {
					type: "checkbox",
					checked: T.value.has(t.id),
					"aria-label": t.display_name,
					"data-testid": "preset-bulk-checkbox",
					onChange: (e) => R(t.id, e.target.checked)
				}, null, 40, P), l("button", {
					type: "button",
					class: p(["tc-interactive", o(A).preset_name_button]),
					"data-testid": "preset-select",
					onClick: (e) => v("select", t.id)
				}, c(t.display_name), 11, F)], 2))), 128))], 2)]))), 128))]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message",
				"error-message"
			]),
			y(D, {
				open: E.value,
				title: o(S)("prompt.preset_browser.bulk_delete_confirm_title", { n: T.value.size }, T.value.size),
				description: o(S)("prompt.preset_browser.bulk_delete_confirm_description"),
				"confirm-label": o(S)("confirmations.destructive.default_confirm_action"),
				"cancel-label": o(S)("confirmations.destructive.default_cancel_action"),
				"data-testid": "bulk-delete-confirm",
				"onUpdate:open": u[3] ||= (e) => E.value = e,
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
		fixedNegativePrompt: {}
	},
	emits: ["update:fixedPositivePrompt", "update:fixedNegativePrompt"],
	setup(t, { emit: n }) {
		let r = t, a = n, { t: s } = u();
		return (t, n) => (e(), i("div", {
			class: p(o(A).prompt_builder),
			"data-testid": "prompt-builder"
		}, [
			l("div", { class: p(o(A).section_header) }, [l("span", { class: p(o(A).section_title) }, c(o(s)("prompt.builder.title")), 3)], 2),
			y(S, { label: o(s)("prompt.fixed_prompts.positive_label") }, {
				default: m(({ fieldId: e }) => [l("textarea", {
					id: e,
					class: p(o(A).textarea),
					"data-testid": "fixed-positive-prompt",
					value: r.fixedPositivePrompt,
					placeholder: o(s)("prompt.fixed_prompts.positive_placeholder"),
					rows: "3",
					onInput: n[0] ||= (e) => a("update:fixedPositivePrompt", e.target.value)
				}, null, 42, L)]),
				_: 1
			}, 8, ["label"]),
			y(S, { label: o(s)("prompt.fixed_prompts.negative_label") }, {
				default: m(({ fieldId: e }) => [l("textarea", {
					id: e,
					class: p(o(A).textarea),
					"data-testid": "fixed-negative-prompt",
					value: r.fixedNegativePrompt,
					placeholder: o(s)("prompt.fixed_prompts.negative_placeholder"),
					rows: "3",
					onInput: n[1] ||= (e) => a("update:fixedNegativePrompt", e.target.value)
				}, null, 42, R)]),
				_: 1
			}, 8, ["label"])
		], 2));
	}
}), B = [
	"id",
	"value",
	"placeholder",
	"aria-describedby",
	"aria-invalid",
	"onInput"
], V = [
	"id",
	"value",
	"onInput"
], H = [
	"id",
	"value",
	"onInput"
], U = ["id", "onUpdate:modelValue"], W = ["disabled", "onClick"], G = /* @__PURE__ */ v({
	__name: "RegexRules",
	props: {
		rules: {},
		testResults: {}
	},
	emits: ["update:rules", "test"],
	setup(r, { emit: f }) {
		let h = r, v = f, { t: C } = u(), E = d({});
		function D(e) {
			if (!e.pattern) return null;
			try {
				return new RegExp(e.pattern, e.flags), null;
			} catch (e) {
				let t = e instanceof Error ? e.message : String(e);
				return C("prompt.regex_rules.invalid_pattern", { message: t });
			}
		}
		function O() {
			let e = {
				id: crypto.randomUUID(),
				pattern: "",
				flags: "",
				replacement: ""
			};
			v("update:rules", [...h.rules, e]);
		}
		function j(e, t) {
			v("update:rules", h.rules.map((n) => n.id === e ? {
				...n,
				...t
			} : n));
		}
		function M(e) {
			v("update:rules", h.rules.filter((t) => t.id !== e));
		}
		function N(e) {
			v("test", e, E[e.id] ?? "");
		}
		function P(e) {
			let t = h.testResults[e];
			return t?.status === "success" ? t.result : null;
		}
		return (r, u) => (e(), i("div", {
			class: p(o(A).regex_rules),
			"data-testid": "regex-rules"
		}, [l("div", { class: p(o(A).section_header) }, [l("span", { class: p(o(A).section_title) }, c(o(C)("prompt.regex_rules.title")), 3), l("button", {
			type: "button",
			class: p(["tc-interactive", o(A).icon_text_button]),
			"data-testid": "add-regex-rule",
			onClick: O
		}, [y(b, {
			icon: o(x),
			size: 14
		}, null, 8, ["icon"]), _(" " + c(o(C)("prompt.regex_rules.add_action")), 1)], 2)], 2), y(k, {
			status: h.rules.length === 0 ? "empty" : "ready",
			"empty-title": o(C)("prompt.regex_rules.empty_title"),
			"empty-message": o(C)("prompt.regex_rules.empty_description")
		}, {
			default: m(() => [(e(!0), i(g, null, n(h.rules, (n) => (e(), i("div", {
				key: n.id,
				class: p(o(A).rule_row),
				"data-testid": "regex-rule-row"
			}, [
				y(S, {
					label: o(C)("prompt.regex_rules.pattern_label"),
					error: D(n)
				}, {
					default: m(({ fieldId: e, describedBy: t, invalid: r }) => [l("input", {
						id: e,
						type: "text",
						class: p(o(A).text_input),
						"data-testid": "regex-pattern-input",
						value: n.pattern,
						placeholder: o(C)("prompt.regex_rules.pattern_placeholder"),
						"aria-describedby": t,
						"aria-invalid": r,
						onInput: (e) => j(n.id, { pattern: e.target.value })
					}, null, 42, B)]),
					_: 2
				}, 1032, ["label", "error"]),
				y(S, { label: o(C)("prompt.regex_rules.flags_label") }, {
					default: m(({ fieldId: e }) => [l("input", {
						id: e,
						type: "text",
						class: p(o(A).text_input_narrow),
						"data-testid": "regex-flags-input",
						value: n.flags,
						onInput: (e) => j(n.id, { flags: e.target.value })
					}, null, 42, V)]),
					_: 2
				}, 1032, ["label"]),
				y(S, { label: o(C)("prompt.replacement_rules.replacement_label") }, {
					default: m(({ fieldId: e }) => [l("input", {
						id: e,
						type: "text",
						class: p(o(A).text_input),
						"data-testid": "regex-replacement-input",
						value: n.replacement,
						onInput: (e) => j(n.id, { replacement: e.target.value })
					}, null, 42, H)]),
					_: 2
				}, 1032, ["label"]),
				y(S, { label: o(C)("prompt.regex_rules.test_input_label") }, {
					default: m(({ fieldId: e }) => [t(l("input", {
						id: e,
						"onUpdate:modelValue": (e) => E[n.id] = e,
						type: "text",
						class: p(o(A).text_input),
						"data-testid": "regex-test-input"
					}, null, 10, U), [[a, E[n.id]]])]),
					_: 2
				}, 1032, ["label"]),
				l("span", { class: p(o(A).rule_row_action) }, [l("button", {
					type: "button",
					class: p(["tc-interactive", o(A).icon_text_button]),
					"data-testid": "regex-test-run",
					disabled: !!D(n),
					onClick: (e) => N(n)
				}, c(o(C)("prompt.regex_rules.test_action")), 11, W), y(T, {
					icon: o(w),
					size: "sm",
					label: o(C)("common.actions.delete"),
					"data-testid": "remove-regex-rule",
					onClick: (e) => M(n.id)
				}, null, 8, [
					"icon",
					"label",
					"onClick"
				])], 2),
				h.testResults[n.id]?.status === "success" ? (e(), i("p", {
					key: 0,
					class: p(o(A).test_result),
					"data-testid": "regex-test-result"
				}, c(o(C)("prompt.regex_rules.test_result_label")) + ": " + c(P(n.id)), 3)) : h.testResults[n.id]?.status === "error" ? (e(), i("p", {
					key: 1,
					role: "alert",
					class: p(o(A).test_result_error),
					"data-testid": "regex-test-error"
				}, c(o(C)("errors.unexpected")), 3)) : s("", !0)
			], 2))), 128))]),
			_: 1
		}, 8, [
			"status",
			"empty-title",
			"empty-message"
		])], 2));
	}
}), K = [
	"id",
	"value",
	"placeholder",
	"onChange"
], q = [
	"id",
	"value",
	"placeholder",
	"onInput"
], J = /* @__PURE__ */ v({
	__name: "ReplacementRules",
	props: { rules: {} },
	emits: ["update:rules"],
	setup(t, { emit: r }) {
		let a = t, s = r, { t: d } = u();
		function f(e) {
			return e.triggers.join(", ");
		}
		function h() {
			let e = {
				id: crypto.randomUUID(),
				triggers: [],
				replacement: ""
			};
			s("update:rules", [...a.rules, e]);
		}
		function v(e, t) {
			let n = t.split(",").map((e) => e.trim()).filter((e) => e.length > 0);
			s("update:rules", a.rules.map((t) => t.id === e ? {
				...t,
				triggers: n
			} : t));
		}
		function C(e, t) {
			s("update:rules", a.rules.map((n) => n.id === e ? {
				...n,
				replacement: t
			} : n));
		}
		function E(e) {
			s("update:rules", a.rules.filter((t) => t.id !== e));
		}
		return (t, r) => (e(), i("div", {
			class: p(o(A).replacement_rules),
			"data-testid": "replacement-rules"
		}, [l("div", { class: p(o(A).section_header) }, [l("span", { class: p(o(A).section_title) }, c(o(d)("prompt.replacement_rules.title")), 3), l("button", {
			type: "button",
			class: p(["tc-interactive", o(A).icon_text_button]),
			"data-testid": "add-replacement-rule",
			onClick: h
		}, [y(b, {
			icon: o(x),
			size: 14
		}, null, 8, ["icon"]), _(" " + c(o(d)("prompt.replacement_rules.add_action")), 1)], 2)], 2), y(k, {
			status: a.rules.length === 0 ? "empty" : "ready",
			"empty-title": o(d)("prompt.replacement_rules.empty_title"),
			"empty-message": o(d)("prompt.replacement_rules.empty_description")
		}, {
			default: m(() => [(e(!0), i(g, null, n(a.rules, (t) => (e(), i("div", {
				key: t.id,
				class: p(o(A).rule_row),
				"data-testid": "replacement-rule-row"
			}, [
				y(S, {
					label: o(d)("prompt.replacement_rules.trigger_label"),
					hint: o(d)("prompt.replacement_rules.triggers_hint")
				}, {
					default: m(({ fieldId: e }) => [l("input", {
						id: e,
						type: "text",
						class: p(o(A).text_input),
						"data-testid": "replacement-triggers-input",
						value: f(t),
						placeholder: o(d)("prompt.replacement_rules.trigger_placeholder"),
						onChange: (e) => v(t.id, e.target.value)
					}, null, 42, K)]),
					_: 2
				}, 1032, ["label", "hint"]),
				y(S, { label: o(d)("prompt.replacement_rules.replacement_label") }, {
					default: m(({ fieldId: e }) => [l("input", {
						id: e,
						type: "text",
						class: p(o(A).text_input),
						"data-testid": "replacement-value-input",
						value: t.replacement,
						placeholder: o(d)("prompt.replacement_rules.replacement_placeholder"),
						onInput: (e) => C(t.id, e.target.value)
					}, null, 42, q)]),
					_: 2
				}, 1032, ["label"]),
				l("span", { class: p(o(A).rule_row_action) }, [y(T, {
					icon: o(w),
					size: "sm",
					label: o(d)("common.actions.delete"),
					"data-testid": "remove-replacement-rule",
					onClick: (e) => E(t.id)
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
}), Y = ["id", "value"], X = /* @__PURE__ */ v({
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
	setup(t, { emit: n }) {
		let a = t, c = n, { t: d } = u(), { toasts: f, push: _, dismiss: v } = j(), b = h(null), x = h(!1), C = h(null), w = h({});
		function T(e) {
			return e ? JSON.stringify(e) : "";
		}
		let M = () => a.state.prompt.draft !== null && b.value !== null && T(a.state.prompt.draft) !== T(b.value);
		r(() => a.state.prompt.draft, (e) => {
			(x.value || b.value === null) && e && (b.value = e, x.value = !1, w.value = {}), e === null && (b.value = null);
		}, { immediate: !0 });
		function N(e) {
			if (M()) {
				C.value = {
					kind: "select",
					presetId: e
				};
				return;
			}
			x.value = !0, c("select-preset", e);
		}
		function P() {
			if (M()) {
				C.value = { kind: "new" };
				return;
			}
			x.value = !0, c("new-preset");
		}
		function F() {
			let e = C.value;
			C.value = null, e && (x.value = !0, e.kind === "select" ? c("select-preset", e.presetId) : c("new-preset"));
		}
		function L(e) {
			c("update-draft", e);
		}
		function R() {
			a.state.prompt.draft && c("save", a.state.prompt.draft);
		}
		r(() => a.state.prompt.save_command, (e) => {
			e.status === "success" && (_({
				title: d("common.actions.save"),
				description: d("status.success"),
				variant: "success"
			}), b.value = null);
		});
		async function B(e, t) {
			w.value = {
				...w.value,
				[e.id]: { status: "pending" }
			};
			try {
				let n = await a.testRegex(e, t);
				w.value = {
					...w.value,
					[e.id]: {
						status: "success",
						result: n
					}
				};
			} catch (t) {
				let n = t instanceof Error && "code" in t && typeof t.code == "string" ? t.code : "command_failed";
				w.value = {
					...w.value,
					[e.id]: {
						status: "error",
						failure: { code: n }
					}
				};
			}
		}
		return (t, n) => (e(), i("div", {
			class: p(o(A).prompt_view),
			"data-testid": "prompt-view"
		}, [
			l("div", { class: p(o(A).browser_column) }, [y(I, {
				presets: a.state.prompt.presets,
				"selected-preset-id": a.state.prompt.selected_preset_id,
				loading: a.state.loading.has("prompt_presets"),
				"has-error": a.state.failures.has("prompt_presets"),
				onSelect: N,
				onNewPreset: P,
				onBulkDelete: n[0] ||= (e) => c("bulk-delete-presets", e)
			}, null, 8, [
				"presets",
				"selected-preset-id",
				"loading",
				"has-error"
			])], 2),
			l("div", { class: p(o(A).editor_column) }, [y(k, {
				status: a.state.prompt.draft ? "ready" : "empty",
				"empty-title": o(d)("prompt.preset_browser.empty_title"),
				"empty-message": o(d)("prompt.preset_browser.empty_description")
			}, {
				default: m(() => [a.state.prompt.draft ? (e(), i(g, { key: 0 }, [
					l("div", { class: p(o(A).name_row) }, [y(S, { label: o(d)("common.labels.name") }, {
						default: m(({ fieldId: e }) => [l("input", {
							id: e,
							type: "text",
							class: p(o(A).text_input),
							"data-testid": "preset-name-input",
							value: a.state.prompt.draft.display_name,
							onInput: n[1] ||= (e) => L({ display_name: e.target.value })
						}, null, 42, Y)]),
						_: 1
					}, 8, ["label"]), y(O, {
						label: o(d)("common.actions.save"),
						variant: "primary",
						pending: a.state.prompt.save_command.status === "pending",
						"data-testid": "save-preset",
						onClick: R
					}, null, 8, ["label", "pending"])], 2),
					y(z, {
						"fixed-positive-prompt": a.state.prompt.draft.fixed_positive_prompt,
						"fixed-negative-prompt": a.state.prompt.draft.fixed_negative_prompt,
						"onUpdate:fixedPositivePrompt": n[2] ||= (e) => L({ fixed_positive_prompt: e }),
						"onUpdate:fixedNegativePrompt": n[3] ||= (e) => L({ fixed_negative_prompt: e })
					}, null, 8, ["fixed-positive-prompt", "fixed-negative-prompt"]),
					y(J, {
						rules: a.state.prompt.draft.replacement_rules,
						"onUpdate:rules": n[4] ||= (e) => L({ replacement_rules: e })
					}, null, 8, ["rules"]),
					y(G, {
						rules: a.state.prompt.draft.regex_rules,
						"test-results": w.value,
						"onUpdate:rules": n[5] ||= (e) => L({ regex_rules: e }),
						onTest: B
					}, null, 8, ["rules", "test-results"])
				], 64)) : s("", !0)]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message"
			])], 2),
			y(D, {
				open: C.value !== null,
				title: o(d)("confirmations.discard_unsaved.title"),
				description: o(d)("confirmations.discard_unsaved.description"),
				"confirm-label": o(d)("confirmations.discard_unsaved.discard_action"),
				"cancel-label": o(d)("confirmations.discard_unsaved.stay_action"),
				"data-testid": "discard-unsaved-confirm",
				"onUpdate:open": n[6] ||= (e) => C.value = e ? C.value : null,
				onConfirm: F
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			]),
			y(E, {
				toasts: o(f),
				"viewport-label": o(d)("common.notifications.viewport_label"),
				"announce-label": o(d)("common.notifications.announce_label"),
				"close-label": o(d)("common.actions.close"),
				onDismiss: o(v)
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
