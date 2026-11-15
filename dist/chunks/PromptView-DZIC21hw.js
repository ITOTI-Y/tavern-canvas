import { G as e, I as t, J as n, R as r, S as i, Y as a, _ as o, _t as s, b as c, d as l, ft as u, h as d, it as f, m as p, mt as m, n as h, o as g, rt as _, v, y } from "./vue-i18n-BQWz_HuU.js";
import { t as b } from "./AppIcon-B1iv8vRB.js";
import { n as x, t as S } from "./StateSurface-Dxa4U6G6.js";
import { n as C, t as w } from "./FieldGroup-B4bm8x77.js";
import { t as T } from "./shuffle-D7_1BAVX.js";
import { t as E } from "./x-CZeKQbKW.js";
import { t as D } from "./IconButton-DbYdD8bu.js";
import { t as O } from "./ToastViewport-CuumTAT9.js";
import { t as k } from "./ConfirmDialog-BbJ8Vn0S.js";
import { t as A } from "./prompt_styles-DfG7McZY.js";
import { t as j } from "./use_toasts-IjxnITpJ.js";
//#region src/ui/views/prompt/PresetBrowser.vue?vue&type=script&setup=true&lang.ts
var M = ["placeholder", "aria-label"], N = ["aria-label", "onClick"], P = [
	"checked",
	"aria-label",
	"onChange"
], F = ["onClick"], I = /* @__PURE__ */ i({
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
		let _ = e, y = i, { t: w } = h(), E = f(""), D = f(/* @__PURE__ */ new Set()), O = f(!1), j = p(() => _.loading ? "loading" : _.hasError ? "error" : _.presets.length === 0 ? "empty" : "ready"), I = p(() => {
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
			t && y("select", t.id);
		}
		function B() {
			y("bulk-delete", [...D.value]), D.value = /* @__PURE__ */ new Set(), O.value = !1;
		}
		return (e, i) => (t(), v("div", {
			class: m(u(A).preset_browser),
			"data-testid": "preset-browser"
		}, [
			d("div", { class: m(u(A).section_header) }, [d("span", { class: m(u(A).section_title) }, s(u(w)("prompt.preset_browser.title")), 3), c(x, {
				label: u(w)("prompt.preset_browser.new_preset_action"),
				icon: u(C),
				variant: "secondary",
				"data-testid": "new-preset",
				onClick: i[0] ||= (e) => y("new-preset")
			}, null, 8, ["label", "icon"])], 2),
			a(d("input", {
				"onUpdate:modelValue": i[1] ||= (e) => E.value = e,
				type: "search",
				class: m(u(A).search_input),
				"data-testid": "preset-search",
				placeholder: u(w)("prompt.preset_browser.search_placeholder"),
				"aria-label": u(w)("prompt.preset_browser.search_placeholder")
			}, null, 10, M), [[g, E.value]]),
			D.value.size > 0 ? (t(), v("button", {
				key: 0,
				type: "button",
				class: m(["tc-interactive", u(A).bulk_delete_button]),
				"data-testid": "bulk-delete-action",
				onClick: i[2] ||= (e) => O.value = !0
			}, s(u(w)("prompt.preset_browser.bulk_delete_action")) + " (" + s(D.value.size) + ") ", 3)) : o("", !0),
			c(S, {
				status: j.value,
				"empty-title": u(w)("prompt.preset_browser.empty_title"),
				"empty-message": u(w)("prompt.preset_browser.empty_description"),
				"error-message": u(w)("prompt.preset_browser.load_error")
			}, {
				default: n(() => [(t(!0), v(l, null, r(L.value, ([e, n]) => (t(), v("div", { key: e ?? "__ungrouped__" }, [d("div", { class: m(u(A).group_header) }, [d("span", null, s(e ?? u(w)("prompt.preset_browser.ungrouped_label")), 1), d("button", {
					type: "button",
					class: m(["tc-interactive", u(A).icon_text_button]),
					"aria-label": u(w)("prompt.preset_browser.random_group_action"),
					"data-testid": "random-group",
					onClick: (e) => z(n)
				}, [c(b, {
					icon: u(T),
					size: 14
				}, null, 8, ["icon"])], 10, N)], 2), d("ul", { class: m(u(A).preset_list) }, [(t(!0), v(l, null, r(n, (e) => (t(), v("li", {
					key: e.id,
					class: m([u(A).preset_row, e.id === _.selectedPresetId && u(A).preset_row_selected]),
					"data-testid": "preset-row"
				}, [d("input", {
					type: "checkbox",
					checked: D.value.has(e.id),
					"aria-label": e.display_name,
					"data-testid": "preset-bulk-checkbox",
					onChange: (t) => R(e.id, t.target.checked)
				}, null, 40, P), d("button", {
					type: "button",
					class: m(["tc-interactive", u(A).preset_name_button]),
					"data-testid": "preset-select",
					onClick: (t) => y("select", e.id)
				}, s(e.display_name), 11, F)], 2))), 128))], 2)]))), 128))]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message",
				"error-message"
			]),
			c(k, {
				open: O.value,
				title: u(w)("prompt.preset_browser.bulk_delete_confirm_title", { n: D.value.size }, D.value.size),
				description: u(w)("prompt.preset_browser.bulk_delete_confirm_description"),
				"confirm-label": u(w)("confirmations.destructive.default_confirm_action"),
				"cancel-label": u(w)("confirmations.destructive.default_cancel_action"),
				"data-testid": "bulk-delete-confirm",
				"onUpdate:open": i[3] ||= (e) => O.value = e,
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
], z = /* @__PURE__ */ i({
	__name: "PromptBuilder",
	props: {
		fixedPositivePrompt: {},
		fixedNegativePrompt: {}
	},
	emits: ["update:fixedPositivePrompt", "update:fixedNegativePrompt"],
	setup(e, { emit: r }) {
		let i = e, a = r, { t: o } = h();
		return (e, r) => (t(), v("div", {
			class: m(u(A).prompt_builder),
			"data-testid": "prompt-builder"
		}, [
			d("div", { class: m(u(A).section_header) }, [d("span", { class: m(u(A).section_title) }, s(u(o)("prompt.builder.title")), 3)], 2),
			c(w, { label: u(o)("prompt.fixed_prompts.positive_label") }, {
				default: n(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: m(u(A).textarea),
					"data-testid": "fixed-positive-prompt",
					value: i.fixedPositivePrompt,
					placeholder: u(o)("prompt.fixed_prompts.positive_placeholder"),
					rows: "3",
					onInput: r[0] ||= (e) => a("update:fixedPositivePrompt", e.target.value)
				}, null, 42, L)]),
				_: 1
			}, 8, ["label"]),
			c(w, { label: u(o)("prompt.fixed_prompts.negative_label") }, {
				default: n(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: m(u(A).textarea),
					"data-testid": "fixed-negative-prompt",
					value: i.fixedNegativePrompt,
					placeholder: u(o)("prompt.fixed_prompts.negative_placeholder"),
					rows: "3",
					onInput: r[1] ||= (e) => a("update:fixedNegativePrompt", e.target.value)
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
], U = ["id", "onUpdate:modelValue"], W = ["disabled", "onClick"], G = /* @__PURE__ */ i({
	__name: "RegexRules",
	props: {
		rules: {},
		testResults: {}
	},
	emits: ["update:rules", "test"],
	setup(e, { emit: i }) {
		let f = e, p = i, { t: x } = h(), T = _({});
		function O(e) {
			if (!e.pattern) return null;
			try {
				return new RegExp(e.pattern, e.flags), null;
			} catch (e) {
				let t = e instanceof Error ? e.message : String(e);
				return x("prompt.regex_rules.invalid_pattern", { message: t });
			}
		}
		function k() {
			let e = {
				id: crypto.randomUUID(),
				pattern: "",
				flags: "",
				replacement: ""
			};
			p("update:rules", [...f.rules, e]);
		}
		function j(e, t) {
			p("update:rules", f.rules.map((n) => n.id === e ? {
				...n,
				...t
			} : n));
		}
		function M(e) {
			p("update:rules", f.rules.filter((t) => t.id !== e));
		}
		function N(e) {
			p("test", e, T[e.id] ?? "");
		}
		function P(e) {
			let t = f.testResults[e];
			return t?.status === "success" ? t.result : null;
		}
		return (e, i) => (t(), v("div", {
			class: m(u(A).regex_rules),
			"data-testid": "regex-rules"
		}, [d("div", { class: m(u(A).section_header) }, [d("span", { class: m(u(A).section_title) }, s(u(x)("prompt.regex_rules.title")), 3), d("button", {
			type: "button",
			class: m(["tc-interactive", u(A).icon_text_button]),
			"data-testid": "add-regex-rule",
			onClick: k
		}, [c(b, {
			icon: u(C),
			size: 14
		}, null, 8, ["icon"]), y(" " + s(u(x)("prompt.regex_rules.add_action")), 1)], 2)], 2), c(S, {
			status: f.rules.length === 0 ? "empty" : "ready",
			"empty-title": u(x)("prompt.regex_rules.empty_title"),
			"empty-message": u(x)("prompt.regex_rules.empty_description")
		}, {
			default: n(() => [(t(!0), v(l, null, r(f.rules, (e) => (t(), v("div", {
				key: e.id,
				class: m(u(A).rule_row),
				"data-testid": "regex-rule-row"
			}, [
				c(w, {
					label: u(x)("prompt.regex_rules.pattern_label"),
					error: O(e)
				}, {
					default: n(({ fieldId: t, describedBy: n, invalid: r }) => [d("input", {
						id: t,
						type: "text",
						class: m(u(A).text_input),
						"data-testid": "regex-pattern-input",
						value: e.pattern,
						placeholder: u(x)("prompt.regex_rules.pattern_placeholder"),
						"aria-describedby": n,
						"aria-invalid": r,
						onInput: (t) => j(e.id, { pattern: t.target.value })
					}, null, 42, B)]),
					_: 2
				}, 1032, ["label", "error"]),
				c(w, { label: u(x)("prompt.regex_rules.flags_label") }, {
					default: n(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: m(u(A).text_input_narrow),
						"data-testid": "regex-flags-input",
						value: e.flags,
						onInput: (t) => j(e.id, { flags: t.target.value })
					}, null, 42, V)]),
					_: 2
				}, 1032, ["label"]),
				c(w, { label: u(x)("prompt.replacement_rules.replacement_label") }, {
					default: n(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: m(u(A).text_input),
						"data-testid": "regex-replacement-input",
						value: e.replacement,
						onInput: (t) => j(e.id, { replacement: t.target.value })
					}, null, 42, H)]),
					_: 2
				}, 1032, ["label"]),
				c(w, { label: u(x)("prompt.regex_rules.test_input_label") }, {
					default: n(({ fieldId: t }) => [a(d("input", {
						id: t,
						"onUpdate:modelValue": (t) => T[e.id] = t,
						type: "text",
						class: m(u(A).text_input),
						"data-testid": "regex-test-input"
					}, null, 10, U), [[g, T[e.id]]])]),
					_: 2
				}, 1032, ["label"]),
				d("span", { class: m(u(A).rule_row_action) }, [d("button", {
					type: "button",
					class: m(["tc-interactive", u(A).icon_text_button]),
					"data-testid": "regex-test-run",
					disabled: !!O(e),
					onClick: (t) => N(e)
				}, s(u(x)("prompt.regex_rules.test_action")), 11, W), c(D, {
					icon: u(E),
					size: "sm",
					label: u(x)("common.actions.delete"),
					"data-testid": "remove-regex-rule",
					onClick: (t) => M(e.id)
				}, null, 8, [
					"icon",
					"label",
					"onClick"
				])], 2),
				f.testResults[e.id]?.status === "success" ? (t(), v("p", {
					key: 0,
					class: m(u(A).test_result),
					"data-testid": "regex-test-result"
				}, s(u(x)("prompt.regex_rules.test_result_label")) + ": " + s(P(e.id)), 3)) : f.testResults[e.id]?.status === "error" ? (t(), v("p", {
					key: 1,
					role: "alert",
					class: m(u(A).test_result_error),
					"data-testid": "regex-test-error"
				}, s(u(x)("errors.unexpected")), 3)) : o("", !0)
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
], J = /* @__PURE__ */ i({
	__name: "ReplacementRules",
	props: { rules: {} },
	emits: ["update:rules"],
	setup(e, { emit: i }) {
		let a = e, o = i, { t: f } = h();
		function p(e) {
			return e.triggers.join(", ");
		}
		function g() {
			let e = {
				id: crypto.randomUUID(),
				triggers: [],
				replacement: ""
			};
			o("update:rules", [...a.rules, e]);
		}
		function _(e, t) {
			let n = t.split(",").map((e) => e.trim()).filter((e) => e.length > 0);
			o("update:rules", a.rules.map((t) => t.id === e ? {
				...t,
				triggers: n
			} : t));
		}
		function x(e, t) {
			o("update:rules", a.rules.map((n) => n.id === e ? {
				...n,
				replacement: t
			} : n));
		}
		function T(e) {
			o("update:rules", a.rules.filter((t) => t.id !== e));
		}
		return (e, i) => (t(), v("div", {
			class: m(u(A).replacement_rules),
			"data-testid": "replacement-rules"
		}, [d("div", { class: m(u(A).section_header) }, [d("span", { class: m(u(A).section_title) }, s(u(f)("prompt.replacement_rules.title")), 3), d("button", {
			type: "button",
			class: m(["tc-interactive", u(A).icon_text_button]),
			"data-testid": "add-replacement-rule",
			onClick: g
		}, [c(b, {
			icon: u(C),
			size: 14
		}, null, 8, ["icon"]), y(" " + s(u(f)("prompt.replacement_rules.add_action")), 1)], 2)], 2), c(S, {
			status: a.rules.length === 0 ? "empty" : "ready",
			"empty-title": u(f)("prompt.replacement_rules.empty_title"),
			"empty-message": u(f)("prompt.replacement_rules.empty_description")
		}, {
			default: n(() => [(t(!0), v(l, null, r(a.rules, (e) => (t(), v("div", {
				key: e.id,
				class: m(u(A).rule_row),
				"data-testid": "replacement-rule-row"
			}, [
				c(w, {
					label: u(f)("prompt.replacement_rules.trigger_label"),
					hint: u(f)("prompt.replacement_rules.triggers_hint")
				}, {
					default: n(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: m(u(A).text_input),
						"data-testid": "replacement-triggers-input",
						value: p(e),
						placeholder: u(f)("prompt.replacement_rules.trigger_placeholder"),
						onChange: (t) => _(e.id, t.target.value)
					}, null, 42, K)]),
					_: 2
				}, 1032, ["label", "hint"]),
				c(w, { label: u(f)("prompt.replacement_rules.replacement_label") }, {
					default: n(({ fieldId: t }) => [d("input", {
						id: t,
						type: "text",
						class: m(u(A).text_input),
						"data-testid": "replacement-value-input",
						value: e.replacement,
						placeholder: u(f)("prompt.replacement_rules.replacement_placeholder"),
						onInput: (t) => x(e.id, t.target.value)
					}, null, 42, q)]),
					_: 2
				}, 1032, ["label"]),
				d("span", { class: m(u(A).rule_row_action) }, [c(D, {
					icon: u(E),
					size: "sm",
					label: u(f)("common.actions.delete"),
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
}), Y = ["id", "value"], X = /* @__PURE__ */ i({
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
	setup(r, { emit: i }) {
		let a = r, s = i, { t: p } = h(), { toasts: g, push: _, dismiss: y } = j(), b = f(null), C = f(!1), T = f(null), E = f({});
		function D(e) {
			return e ? JSON.stringify(e) : "";
		}
		let M = () => a.state.prompt.draft !== null && b.value !== null && D(a.state.prompt.draft) !== D(b.value);
		e(() => a.state.prompt.draft, (e) => {
			(C.value || b.value === null) && e && (b.value = e, C.value = !1, E.value = {}), e === null && (b.value = null);
		}, { immediate: !0 });
		function N(e) {
			if (M()) {
				T.value = {
					kind: "select",
					presetId: e
				};
				return;
			}
			C.value = !0, s("select-preset", e);
		}
		function P() {
			if (M()) {
				T.value = { kind: "new" };
				return;
			}
			C.value = !0, s("new-preset");
		}
		function F() {
			let e = T.value;
			T.value = null, e && (C.value = !0, e.kind === "select" ? s("select-preset", e.presetId) : s("new-preset"));
		}
		function L(e) {
			s("update-draft", e);
		}
		function R() {
			a.state.prompt.draft && s("save", a.state.prompt.draft);
		}
		e(() => a.state.prompt.save_command, (e) => {
			e.status === "success" && (_({
				title: p("common.actions.save"),
				description: p("status.success"),
				variant: "success"
			}), b.value = null);
		});
		async function B(e, t) {
			E.value = {
				...E.value,
				[e.id]: { status: "pending" }
			};
			try {
				let n = await a.testRegex(e, t);
				E.value = {
					...E.value,
					[e.id]: {
						status: "success",
						result: n
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
		return (e, r) => (t(), v("div", {
			class: m(u(A).prompt_view),
			"data-testid": "prompt-view"
		}, [
			d("div", { class: m(u(A).browser_column) }, [c(I, {
				presets: a.state.prompt.presets,
				"selected-preset-id": a.state.prompt.selected_preset_id,
				loading: a.state.loading.has("prompt_presets"),
				"has-error": a.state.failures.has("prompt_presets"),
				onSelect: N,
				onNewPreset: P,
				onBulkDelete: r[0] ||= (e) => s("bulk-delete-presets", e)
			}, null, 8, [
				"presets",
				"selected-preset-id",
				"loading",
				"has-error"
			])], 2),
			d("div", { class: m(u(A).editor_column) }, [c(S, {
				status: a.state.prompt.draft ? "ready" : "empty",
				"empty-title": u(p)("prompt.preset_browser.empty_title"),
				"empty-message": u(p)("prompt.preset_browser.empty_description")
			}, {
				default: n(() => [a.state.prompt.draft ? (t(), v(l, { key: 0 }, [
					d("div", { class: m(u(A).name_row) }, [c(w, { label: u(p)("common.labels.name") }, {
						default: n(({ fieldId: e }) => [d("input", {
							id: e,
							type: "text",
							class: m(u(A).text_input),
							"data-testid": "preset-name-input",
							value: a.state.prompt.draft.display_name,
							onInput: r[1] ||= (e) => L({ display_name: e.target.value })
						}, null, 42, Y)]),
						_: 1
					}, 8, ["label"]), c(x, {
						label: u(p)("common.actions.save"),
						variant: "primary",
						pending: a.state.prompt.save_command.status === "pending",
						"data-testid": "save-preset",
						onClick: R
					}, null, 8, ["label", "pending"])], 2),
					c(z, {
						"fixed-positive-prompt": a.state.prompt.draft.fixed_positive_prompt,
						"fixed-negative-prompt": a.state.prompt.draft.fixed_negative_prompt,
						"onUpdate:fixedPositivePrompt": r[2] ||= (e) => L({ fixed_positive_prompt: e }),
						"onUpdate:fixedNegativePrompt": r[3] ||= (e) => L({ fixed_negative_prompt: e })
					}, null, 8, ["fixed-positive-prompt", "fixed-negative-prompt"]),
					c(J, {
						rules: a.state.prompt.draft.replacement_rules,
						"onUpdate:rules": r[4] ||= (e) => L({ replacement_rules: e })
					}, null, 8, ["rules"]),
					c(G, {
						rules: a.state.prompt.draft.regex_rules,
						"test-results": E.value,
						"onUpdate:rules": r[5] ||= (e) => L({ regex_rules: e }),
						onTest: B
					}, null, 8, ["rules", "test-results"])
				], 64)) : o("", !0)]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message"
			])], 2),
			c(k, {
				open: T.value !== null,
				title: u(p)("confirmations.discard_unsaved.title"),
				description: u(p)("confirmations.discard_unsaved.description"),
				"confirm-label": u(p)("confirmations.discard_unsaved.discard_action"),
				"cancel-label": u(p)("confirmations.discard_unsaved.stay_action"),
				"data-testid": "discard-unsaved-confirm",
				"onUpdate:open": r[6] ||= (e) => T.value = e ? T.value : null,
				onConfirm: F
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			]),
			c(O, {
				toasts: u(g),
				"viewport-label": u(p)("common.notifications.viewport_label"),
				"announce-label": u(p)("common.notifications.announce_label"),
				"close-label": u(p)("common.actions.close"),
				onDismiss: u(y)
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
