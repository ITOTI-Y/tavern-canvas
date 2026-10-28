import { G as e, H as t, I as n, K as r, P as i, _ as a, a as o, dt as s, et as c, g as l, lt as u, m as d, mt as f, n as p, p as m, tt as h, u as g, v as _, x as v, y } from "./vue-i18n-L-BrQRnK.js";
import { t as b } from "./AppIcon-DkyxvN8k.js";
import { n as x, t as S } from "./StateSurface-CYPYd2Rl.js";
import { n as C, t as w } from "./FieldGroup-C0diPHlP.js";
import { t as T } from "./shuffle-Bo5nqqvn.js";
import { t as E } from "./x-D7Ry5i_D.js";
import { t as D } from "./IconButton-Co--h1UV.js";
import { t as O } from "./ToastViewport-VpPC5KkO.js";
import { t as k } from "./ConfirmDialog-DsgvxfoB.js";
import { t as A } from "./prompt_styles-DWDg4plB.js";
import { t as j } from "./use_toasts-taqPHY-l.js";
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
	setup(t, { emit: c }) {
		let _ = t, v = c, { t: w } = p(), E = h(""), D = h(/* @__PURE__ */ new Set()), O = h(!1), j = m(() => _.loading ? "loading" : _.hasError ? "error" : _.presets.length === 0 ? "empty" : "ready"), I = m(() => {
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
		return (t, c) => (i(), a("div", {
			class: s(u(A).preset_browser),
			"data-testid": "preset-browser"
		}, [
			d("div", { class: s(u(A).section_header) }, [d("span", { class: s(u(A).section_title) }, f(u(w)("prompt.preset_browser.title")), 3), y(x, {
				label: u(w)("prompt.preset_browser.new_preset_action"),
				icon: u(C),
				variant: "secondary",
				"data-testid": "new-preset",
				onClick: c[0] ||= (e) => v("new-preset")
			}, null, 8, ["label", "icon"])], 2),
			r(d("input", {
				"onUpdate:modelValue": c[1] ||= (e) => E.value = e,
				type: "search",
				class: s(u(A).search_input),
				"data-testid": "preset-search",
				placeholder: u(w)("prompt.preset_browser.search_placeholder"),
				"aria-label": u(w)("prompt.preset_browser.search_placeholder")
			}, null, 10, M), [[o, E.value]]),
			D.value.size > 0 ? (i(), a("button", {
				key: 0,
				type: "button",
				class: s(["tc-interactive", u(A).bulk_delete_button]),
				"data-testid": "bulk-delete-action",
				onClick: c[2] ||= (e) => O.value = !0
			}, f(u(w)("prompt.preset_browser.bulk_delete_action")) + " (" + f(D.value.size) + ") ", 3)) : l("", !0),
			y(S, {
				status: j.value,
				"empty-title": u(w)("prompt.preset_browser.empty_title"),
				"empty-message": u(w)("prompt.preset_browser.empty_description"),
				"error-message": u(w)("prompt.preset_browser.load_error")
			}, {
				default: e(() => [(i(!0), a(g, null, n(L.value, ([e, t]) => (i(), a("div", { key: e ?? "__ungrouped__" }, [d("div", { class: s(u(A).group_header) }, [d("span", null, f(e ?? u(w)("prompt.preset_browser.ungrouped_label")), 1), d("button", {
					type: "button",
					class: s(["tc-interactive", u(A).icon_text_button]),
					"aria-label": u(w)("prompt.preset_browser.random_group_action"),
					"data-testid": "random-group",
					onClick: (e) => z(t)
				}, [y(b, {
					icon: u(T),
					size: 14
				}, null, 8, ["icon"])], 10, N)], 2), d("ul", { class: s(u(A).preset_list) }, [(i(!0), a(g, null, n(t, (e) => (i(), a("li", {
					key: e.id,
					class: s([u(A).preset_row, e.id === _.selectedPresetId && u(A).preset_row_selected]),
					"data-testid": "preset-row"
				}, [d("input", {
					type: "checkbox",
					checked: D.value.has(e.id),
					"aria-label": e.display_name,
					"data-testid": "preset-bulk-checkbox",
					onChange: (t) => R(e.id, t.target.checked)
				}, null, 40, P), d("button", {
					type: "button",
					class: s(["tc-interactive", u(A).preset_name_button]),
					"data-testid": "preset-select",
					onClick: (t) => v("select", e.id)
				}, f(e.display_name), 11, F)], 2))), 128))], 2)]))), 128))]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message",
				"error-message"
			]),
			y(k, {
				open: O.value,
				title: u(w)("prompt.preset_browser.bulk_delete_confirm_title", { n: D.value.size }, D.value.size),
				description: u(w)("prompt.preset_browser.bulk_delete_confirm_description"),
				"confirm-label": u(w)("confirmations.destructive.default_confirm_action"),
				"cancel-label": u(w)("confirmations.destructive.default_cancel_action"),
				"data-testid": "bulk-delete-confirm",
				"onUpdate:open": c[3] ||= (e) => O.value = e,
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
		let r = t, o = n, { t: c } = p();
		return (t, n) => (i(), a("div", {
			class: s(u(A).prompt_builder),
			"data-testid": "prompt-builder"
		}, [
			d("div", { class: s(u(A).section_header) }, [d("span", { class: s(u(A).section_title) }, f(u(c)("prompt.builder.title")), 3)], 2),
			y(w, { label: u(c)("prompt.fixed_prompts.positive_label") }, {
				default: e(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: s(u(A).textarea),
					"data-testid": "fixed-positive-prompt",
					value: r.fixedPositivePrompt,
					placeholder: u(c)("prompt.fixed_prompts.positive_placeholder"),
					rows: "3",
					onInput: n[0] ||= (e) => o("update:fixedPositivePrompt", e.target.value)
				}, null, 42, L)]),
				_: 1
			}, 8, ["label"]),
			y(w, { label: u(c)("prompt.fixed_prompts.negative_label") }, {
				default: e(({ fieldId: e }) => [d("textarea", {
					id: e,
					class: s(u(A).textarea),
					"data-testid": "fixed-negative-prompt",
					value: r.fixedNegativePrompt,
					placeholder: u(c)("prompt.fixed_prompts.negative_placeholder"),
					rows: "3",
					onInput: n[1] ||= (e) => o("update:fixedNegativePrompt", e.target.value)
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
	setup(t, { emit: m }) {
		let h = t, v = m, { t: x } = p(), T = c({});
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
			v("test", e, T[e.id] ?? "");
		}
		function P(e) {
			let t = h.testResults[e];
			return t?.status === "success" ? t.result : null;
		}
		return (t, c) => (i(), a("div", {
			class: s(u(A).regex_rules),
			"data-testid": "regex-rules"
		}, [d("div", { class: s(u(A).section_header) }, [d("span", { class: s(u(A).section_title) }, f(u(x)("prompt.regex_rules.title")), 3), d("button", {
			type: "button",
			class: s(["tc-interactive", u(A).icon_text_button]),
			"data-testid": "add-regex-rule",
			onClick: k
		}, [y(b, {
			icon: u(C),
			size: 14
		}, null, 8, ["icon"]), _(" " + f(u(x)("prompt.regex_rules.add_action")), 1)], 2)], 2), y(S, {
			status: h.rules.length === 0 ? "empty" : "ready",
			"empty-title": u(x)("prompt.regex_rules.empty_title"),
			"empty-message": u(x)("prompt.regex_rules.empty_description")
		}, {
			default: e(() => [(i(!0), a(g, null, n(h.rules, (t) => (i(), a("div", {
				key: t.id,
				class: s(u(A).rule_row),
				"data-testid": "regex-rule-row"
			}, [
				y(w, {
					label: u(x)("prompt.regex_rules.pattern_label"),
					error: O(t)
				}, {
					default: e(({ fieldId: e, describedBy: n, invalid: r }) => [d("input", {
						id: e,
						type: "text",
						class: s(u(A).text_input),
						"data-testid": "regex-pattern-input",
						value: t.pattern,
						placeholder: u(x)("prompt.regex_rules.pattern_placeholder"),
						"aria-describedby": n,
						"aria-invalid": r,
						onInput: (e) => j(t.id, { pattern: e.target.value })
					}, null, 42, B)]),
					_: 2
				}, 1032, ["label", "error"]),
				y(w, { label: u(x)("prompt.regex_rules.flags_label") }, {
					default: e(({ fieldId: e }) => [d("input", {
						id: e,
						type: "text",
						class: s(u(A).text_input_narrow),
						"data-testid": "regex-flags-input",
						value: t.flags,
						onInput: (e) => j(t.id, { flags: e.target.value })
					}, null, 42, V)]),
					_: 2
				}, 1032, ["label"]),
				y(w, { label: u(x)("prompt.replacement_rules.replacement_label") }, {
					default: e(({ fieldId: e }) => [d("input", {
						id: e,
						type: "text",
						class: s(u(A).text_input),
						"data-testid": "regex-replacement-input",
						value: t.replacement,
						onInput: (e) => j(t.id, { replacement: e.target.value })
					}, null, 42, H)]),
					_: 2
				}, 1032, ["label"]),
				y(w, { label: u(x)("prompt.regex_rules.test_input_label") }, {
					default: e(({ fieldId: e }) => [r(d("input", {
						id: e,
						"onUpdate:modelValue": (e) => T[t.id] = e,
						type: "text",
						class: s(u(A).text_input),
						"data-testid": "regex-test-input"
					}, null, 10, U), [[o, T[t.id]]])]),
					_: 2
				}, 1032, ["label"]),
				d("span", { class: s(u(A).rule_row_action) }, [d("button", {
					type: "button",
					class: s(["tc-interactive", u(A).icon_text_button]),
					"data-testid": "regex-test-run",
					disabled: !!O(t),
					onClick: (e) => N(t)
				}, f(u(x)("prompt.regex_rules.test_action")), 11, W), y(D, {
					icon: u(E),
					size: "sm",
					label: u(x)("common.actions.delete"),
					"data-testid": "remove-regex-rule",
					onClick: (e) => M(t.id)
				}, null, 8, [
					"icon",
					"label",
					"onClick"
				])], 2),
				h.testResults[t.id]?.status === "success" ? (i(), a("p", {
					key: 0,
					class: s(u(A).test_result),
					"data-testid": "regex-test-result"
				}, f(u(x)("prompt.regex_rules.test_result_label")) + ": " + f(P(t.id)), 3)) : h.testResults[t.id]?.status === "error" ? (i(), a("p", {
					key: 1,
					role: "alert",
					class: s(u(A).test_result_error),
					"data-testid": "regex-test-error"
				}, f(u(x)("errors.unexpected")), 3)) : l("", !0)
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
		let o = t, c = r, { t: l } = p();
		function m(e) {
			return e.triggers.join(", ");
		}
		function h() {
			let e = {
				id: crypto.randomUUID(),
				triggers: [],
				replacement: ""
			};
			c("update:rules", [...o.rules, e]);
		}
		function v(e, t) {
			let n = t.split(",").map((e) => e.trim()).filter((e) => e.length > 0);
			c("update:rules", o.rules.map((t) => t.id === e ? {
				...t,
				triggers: n
			} : t));
		}
		function x(e, t) {
			c("update:rules", o.rules.map((n) => n.id === e ? {
				...n,
				replacement: t
			} : n));
		}
		function T(e) {
			c("update:rules", o.rules.filter((t) => t.id !== e));
		}
		return (t, r) => (i(), a("div", {
			class: s(u(A).replacement_rules),
			"data-testid": "replacement-rules"
		}, [d("div", { class: s(u(A).section_header) }, [d("span", { class: s(u(A).section_title) }, f(u(l)("prompt.replacement_rules.title")), 3), d("button", {
			type: "button",
			class: s(["tc-interactive", u(A).icon_text_button]),
			"data-testid": "add-replacement-rule",
			onClick: h
		}, [y(b, {
			icon: u(C),
			size: 14
		}, null, 8, ["icon"]), _(" " + f(u(l)("prompt.replacement_rules.add_action")), 1)], 2)], 2), y(S, {
			status: o.rules.length === 0 ? "empty" : "ready",
			"empty-title": u(l)("prompt.replacement_rules.empty_title"),
			"empty-message": u(l)("prompt.replacement_rules.empty_description")
		}, {
			default: e(() => [(i(!0), a(g, null, n(o.rules, (t) => (i(), a("div", {
				key: t.id,
				class: s(u(A).rule_row),
				"data-testid": "replacement-rule-row"
			}, [
				y(w, {
					label: u(l)("prompt.replacement_rules.trigger_label"),
					hint: u(l)("prompt.replacement_rules.triggers_hint")
				}, {
					default: e(({ fieldId: e }) => [d("input", {
						id: e,
						type: "text",
						class: s(u(A).text_input),
						"data-testid": "replacement-triggers-input",
						value: m(t),
						placeholder: u(l)("prompt.replacement_rules.trigger_placeholder"),
						onChange: (e) => v(t.id, e.target.value)
					}, null, 42, K)]),
					_: 2
				}, 1032, ["label", "hint"]),
				y(w, { label: u(l)("prompt.replacement_rules.replacement_label") }, {
					default: e(({ fieldId: e }) => [d("input", {
						id: e,
						type: "text",
						class: s(u(A).text_input),
						"data-testid": "replacement-value-input",
						value: t.replacement,
						placeholder: u(l)("prompt.replacement_rules.replacement_placeholder"),
						onInput: (e) => x(t.id, e.target.value)
					}, null, 42, q)]),
					_: 2
				}, 1032, ["label"]),
				d("span", { class: s(u(A).rule_row_action) }, [y(D, {
					icon: u(E),
					size: "sm",
					label: u(l)("common.actions.delete"),
					"data-testid": "remove-replacement-rule",
					onClick: (e) => T(t.id)
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
	setup(n, { emit: r }) {
		let o = n, c = r, { t: f } = p(), { toasts: m, push: _, dismiss: v } = j(), b = h(null), C = h(!1), T = h(null), E = h({});
		function D(e) {
			return e ? JSON.stringify(e) : "";
		}
		let M = () => o.state.prompt.draft !== null && b.value !== null && D(o.state.prompt.draft) !== D(b.value);
		t(() => o.state.prompt.draft, (e) => {
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
			C.value = !0, c("select-preset", e);
		}
		function P() {
			if (M()) {
				T.value = { kind: "new" };
				return;
			}
			C.value = !0, c("new-preset");
		}
		function F() {
			let e = T.value;
			T.value = null, e && (C.value = !0, e.kind === "select" ? c("select-preset", e.presetId) : c("new-preset"));
		}
		function L(e) {
			c("update-draft", e);
		}
		function R() {
			o.state.prompt.draft && c("save", o.state.prompt.draft);
		}
		t(() => o.state.prompt.save_command, (e) => {
			e.status === "success" && (_({
				title: f("common.actions.save"),
				description: f("status.success"),
				variant: "success"
			}), b.value = null);
		});
		async function B(e, t) {
			E.value = {
				...E.value,
				[e.id]: { status: "pending" }
			};
			try {
				let n = await o.testRegex(e, t);
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
		return (t, n) => (i(), a("div", {
			class: s(u(A).prompt_view),
			"data-testid": "prompt-view"
		}, [
			d("div", { class: s(u(A).browser_column) }, [y(I, {
				presets: o.state.prompt.presets,
				"selected-preset-id": o.state.prompt.selected_preset_id,
				loading: o.state.loading.has("prompt_presets"),
				"has-error": o.state.failures.has("prompt_presets"),
				onSelect: N,
				onNewPreset: P,
				onBulkDelete: n[0] ||= (e) => c("bulk-delete-presets", e)
			}, null, 8, [
				"presets",
				"selected-preset-id",
				"loading",
				"has-error"
			])], 2),
			d("div", { class: s(u(A).editor_column) }, [y(S, {
				status: o.state.prompt.draft ? "ready" : "empty",
				"empty-title": u(f)("prompt.preset_browser.empty_title"),
				"empty-message": u(f)("prompt.preset_browser.empty_description")
			}, {
				default: e(() => [o.state.prompt.draft ? (i(), a(g, { key: 0 }, [
					d("div", { class: s(u(A).name_row) }, [y(w, { label: u(f)("common.labels.name") }, {
						default: e(({ fieldId: e }) => [d("input", {
							id: e,
							type: "text",
							class: s(u(A).text_input),
							"data-testid": "preset-name-input",
							value: o.state.prompt.draft.display_name,
							onInput: n[1] ||= (e) => L({ display_name: e.target.value })
						}, null, 42, Y)]),
						_: 1
					}, 8, ["label"]), y(x, {
						label: u(f)("common.actions.save"),
						variant: "primary",
						pending: o.state.prompt.save_command.status === "pending",
						"data-testid": "save-preset",
						onClick: R
					}, null, 8, ["label", "pending"])], 2),
					y(z, {
						"fixed-positive-prompt": o.state.prompt.draft.fixed_positive_prompt,
						"fixed-negative-prompt": o.state.prompt.draft.fixed_negative_prompt,
						"onUpdate:fixedPositivePrompt": n[2] ||= (e) => L({ fixed_positive_prompt: e }),
						"onUpdate:fixedNegativePrompt": n[3] ||= (e) => L({ fixed_negative_prompt: e })
					}, null, 8, ["fixed-positive-prompt", "fixed-negative-prompt"]),
					y(J, {
						rules: o.state.prompt.draft.replacement_rules,
						"onUpdate:rules": n[4] ||= (e) => L({ replacement_rules: e })
					}, null, 8, ["rules"]),
					y(G, {
						rules: o.state.prompt.draft.regex_rules,
						"test-results": E.value,
						"onUpdate:rules": n[5] ||= (e) => L({ regex_rules: e }),
						onTest: B
					}, null, 8, ["rules", "test-results"])
				], 64)) : l("", !0)]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message"
			])], 2),
			y(k, {
				open: T.value !== null,
				title: u(f)("confirmations.discard_unsaved.title"),
				description: u(f)("confirmations.discard_unsaved.description"),
				"confirm-label": u(f)("confirmations.discard_unsaved.discard_action"),
				"cancel-label": u(f)("confirmations.discard_unsaved.stay_action"),
				"data-testid": "discard-unsaved-confirm",
				"onUpdate:open": n[6] ||= (e) => T.value = e ? T.value : null,
				onConfirm: F
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			]),
			y(O, {
				toasts: u(m),
				"viewport-label": u(f)("common.notifications.viewport_label"),
				"announce-label": u(f)("common.notifications.announce_label"),
				"close-label": u(f)("common.actions.close"),
				onDismiss: u(v)
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
