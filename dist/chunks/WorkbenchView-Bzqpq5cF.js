import { $ as e, B as t, D as n, F as r, N as i, Q as a, U as o, _ as s, ft as c, g as l, h as u, lt as d, m as f, n as p, p as m, st as h, u as g, v as _, x as v, y } from "./vue-i18n-D0uIxSJk.js";
import { t as b } from "./createLucideIcon-D9d_Lia0.js";
import { t as x } from "./chevron-down-DlF1EAFX.js";
import { t as S } from "./chevron-up-CDY_e6lX.js";
import { t as C } from "./copy-C-9v3gK-.js";
import { t as w } from "./image-off-DwqmEQ4N.js";
import { n as T, t as E } from "./StateSurface-C7mKA32L.js";
import { n as D, t as O } from "./NumberStepper-BrE3Mw-G.js";
import { n as k, t as A } from "./FieldGroup-CQJSK567.js";
import { t as j } from "./x-BB8D-Lda.js";
import { t as M } from "./build_generation_request-CwGRNQz1.js";
import { t as N } from "./AppSelect-DzN2YfMC.js";
import { n as P, t as F } from "./_prop_utils-Cr0BV-r1.js";
import { t as I } from "./ToastViewport-DN7Gzvpy.js";
import { t as L } from "./IconButton-BbpRM97K.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/ban.js
var R = b("ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M4.929 4.929 19.07 19.071",
	key: "196cmz"
}]]), z = b("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), B = {
	workbench_view: "_workbench_view_pr9le_8",
	main_column: "_main_column_pr9le_15",
	side_column: "_side_column_pr9le_22",
	section_header: "_section_header_pr9le_43",
	section_title: "_section_title_pr9le_51",
	section_hint: "_section_hint_pr9le_55",
	inline_error: "_inline_error_pr9le_60",
	prompt_composer: "_prompt_composer_pr9le_68",
	prompt_textarea: "_prompt_textarea_pr9le_76",
	reference_strip: "_reference_strip_pr9le_96",
	reference_empty: "_reference_empty_pr9le_101",
	reference_list: "_reference_list_pr9le_109",
	reference_tile: "_reference_tile_pr9le_116",
	reference_tile_thumb: "_reference_tile_thumb_pr9le_127",
	reference_tile_name: "_reference_tile_name_pr9le_137",
	reference_tile_actions: "_reference_tile_actions_pr9le_144",
	reference_tile_add: "_reference_tile_add_pr9le_149",
	reference_add_button: "_reference_add_button_pr9le_156",
	picker_list: "_picker_list_pr9le_166",
	picker_item: "_picker_item_pr9le_172",
	submit_row: "_submit_row_pr9le_183",
	provider_summary: "_provider_summary_pr9le_194",
	text_action_button: "_text_action_button_pr9le_199",
	active_jobs: "_active_jobs_pr9le_208",
	job_list: "_job_list_pr9le_214",
	job_row: "_job_row_pr9le_219",
	job_row_selected: "_job_row_selected_pr9le_227",
	job_row_main: "_job_row_main_pr9le_231",
	job_status_dot: "_job_status_dot_pr9le_239",
	job_provider: "_job_provider_pr9le_247",
	job_state: "_job_state_pr9le_251",
	job_progress: "_job_progress_pr9le_256",
	job_error: "_job_error_pr9le_262",
	job_row_actions: "_job_row_actions_pr9le_268",
	generation_inspector: "_generation_inspector_pr9le_275",
	inspector_field_list: "_inspector_field_list_pr9le_279",
	inspector_field: "_inspector_field_pr9le_279",
	inspector_actions: "_inspector_actions_pr9le_306",
	completion_preview_list: "_completion_preview_list_pr9le_313",
	completion_preview_tile: "_completion_preview_tile_pr9le_320",
	completion_preview_placeholder: "_completion_preview_placeholder_pr9le_333"
}, V = ["data-job-state"], H = ["onClick"], U = /* @__PURE__ */ v({
	__name: "ActiveJobs",
	props: {
		jobs: {},
		loading: { type: Boolean },
		hasError: { type: Boolean },
		selectedJobId: {}
	},
	emits: [
		"cancel",
		"retry",
		"select"
	],
	setup(t, { emit: n }) {
		let a = [
			"queued",
			"preparing",
			"submitting",
			"running"
		], _ = ["failed", "cancelled"], v = t, b = n, { t: x } = p(), S = e(null), C = m(() => v.loading ? "loading" : v.hasError ? "error" : v.jobs.length === 0 ? "empty" : "ready"), w = m(() => `${x("workbench.active_jobs.empty_title")} ${x("workbench.active_jobs.empty_description")}`), T = m(() => v.jobs.filter((e) => a.includes(e.state)).length);
		function D(e) {
			switch (e) {
				case "queued": return x("workbench.active_jobs.state_labels.queued");
				case "preparing": return x("workbench.active_jobs.state_labels.preparing");
				case "submitting": return x("workbench.active_jobs.state_labels.submitting");
				case "running": return x("workbench.active_jobs.state_labels.running");
				case "completed": return x("workbench.active_jobs.state_labels.completed");
				case "failed": return x("workbench.active_jobs.state_labels.failed");
				case "cancelled": return x("workbench.active_jobs.state_labels.cancelled");
				case "attached": return x("workbench.active_jobs.state_labels.attached");
				case "orphaned": return x("workbench.active_jobs.state_labels.orphaned");
			}
		}
		function O(e) {
			return a.includes(e.state);
		}
		function k(e) {
			return _.includes(e.state);
		}
		function A(e) {
			S.value = e;
		}
		function j() {
			S.value && b("cancel", S.value), S.value = null;
		}
		let M = m(() => v.jobs.find((e) => e.job_id === S.value));
		return (e, t) => (i(), s("div", {
			class: d(h(B).active_jobs),
			"data-testid": "active-jobs"
		}, [
			f("div", { class: d(h(B).section_header) }, [f("span", { class: d(h(B).section_title) }, c(h(x)("workbench.active_jobs.title")), 3), T.value > 0 ? (i(), s("span", {
				key: 0,
				class: d([h(B).section_hint, "tc-tabular-nums"])
			}, c(h(x)("workbench.active_jobs.active_count", { n: T.value }, T.value)), 3)) : l("", !0)], 2),
			y(E, {
				status: C.value,
				"empty-message": w.value,
				"error-message": h(x)("workbench.active_jobs.load_error")
			}, {
				default: o(() => [f("ul", {
					class: d(h(B).job_list),
					"data-testid": "job-list"
				}, [(i(!0), s(g, null, r(v.jobs, (e) => (i(), s("li", {
					key: e.job_id,
					class: d([h(B).job_row, e.job_id === v.selectedJobId && h(B).job_row_selected]),
					"data-testid": "job-row",
					"data-job-state": e.state
				}, [
					f("button", {
						type: "button",
						class: d(["tc-interactive", h(B).job_row_main]),
						"data-testid": "job-select",
						onClick: (t) => b("select", e.job_id)
					}, [
						e.state === "running" ? (i(), s("span", {
							key: 0,
							class: d(h(B).job_status_dot),
							"aria-hidden": "true"
						}, null, 2)) : l("", !0),
						f("span", { class: d(h(B).job_provider) }, c(e.provider_id), 3),
						f("span", {
							class: d(h(B).job_state),
							"data-testid": "job-state-label"
						}, c(D(e.state)), 3),
						f("span", {
							class: d(["tc-tabular-nums", h(B).job_progress]),
							"data-testid": "job-progress"
						}, c(h(x)("workbench.active_jobs.progress_label", {
							completed: e.completed_image_ids.length,
							total: e.image_count
						})), 3)
					], 10, H),
					e.error ? (i(), s("p", {
						key: 0,
						role: "alert",
						class: d(h(B).job_error)
					}, c(h(x)("errors.generation_failed", { message: e.error.code })), 3)) : l("", !0),
					f("span", { class: d(h(B).job_row_actions) }, [O(e) ? (i(), u(L, {
						key: 0,
						icon: h(R),
						size: "sm",
						destructive: "",
						label: h(x)("workbench.active_jobs.cancel_action"),
						"data-testid": "job-cancel",
						onClick: (t) => A(e.job_id)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])) : l("", !0), k(e) ? (i(), u(L, {
						key: 1,
						icon: h(z),
						size: "sm",
						label: h(x)("workbench.retry_action"),
						"data-testid": "job-retry",
						onClick: (t) => b("retry", e.job_id)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])) : l("", !0)], 2)
				], 10, V))), 128))], 2)]),
				_: 1
			}, 8, [
				"status",
				"empty-message",
				"error-message"
			]),
			y(P, {
				open: S.value !== null,
				title: h(x)("workbench.active_jobs.cancel_confirm_title"),
				description: h(x)("workbench.active_jobs.cancel_confirm_description", { provider: M.value?.provider_id ?? "" }),
				"confirm-label": h(x)("common.actions.confirm"),
				"cancel-label": h(x)("common.actions.cancel"),
				"onUpdate:open": t[0] ||= (e) => S.value = e ? S.value : null,
				onConfirm: j
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			])
		], 2));
	}
}), W = { class: "tc-tabular-nums" }, G = { class: "tc-tabular-nums" }, K = { class: "tc-tabular-nums" }, q = ["src", "alt"], J = ["aria-label"], Y = /* @__PURE__ */ v({
	__name: "GenerationInspector",
	props: {
		job: {},
		request: {},
		previewUrls: {}
	},
	emits: ["copy-parameters", "retry"],
	setup(e, { emit: t }) {
		let n = ["failed", "cancelled"], a = e, v = t, { t: b } = p(), x = m(() => a.request && "seed" in a.request ? a.request.seed : void 0), S = m(() => a.request && "steps" in a.request ? a.request.steps : void 0), T = m(() => a.request && "sampler" in a.request ? a.request.sampler : void 0), D = m(() => a.request && "model_id" in a.request ? a.request.model_id : void 0), O = m(() => a.job !== null && n.includes(a.job.state));
		async function k() {
			if (!a.job) return;
			let e = {
				job_id: a.job.job_id,
				provider_id: a.job.provider_id,
				seed: x.value,
				steps: S.value,
				sampler: T.value,
				model_id: D.value
			};
			await navigator.clipboard.writeText(JSON.stringify(e, null, 2)), v("copy-parameters");
		}
		return (e, t) => (i(), s("div", {
			class: d(h(B).generation_inspector),
			"data-testid": "generation-inspector"
		}, [f("div", { class: d(h(B).section_header) }, [f("span", { class: d(h(B).section_title) }, c(h(b)("workbench.generation_inspector.title")), 3)], 2), y(E, {
			status: a.job ? "ready" : "empty",
			"empty-message": `${h(b)("workbench.generation_inspector.empty_title")} ${h(b)("workbench.generation_inspector.empty_description")}`
		}, {
			default: o(() => [
				a.job ? (i(), s("dl", {
					key: 0,
					class: d(h(B).inspector_field_list),
					"data-testid": "inspector-fields"
				}, [
					f("div", { class: d(h(B).inspector_field) }, [f("dt", null, c(h(b)("workbench.generation_inspector.provider_label")), 1), f("dd", null, c(a.job.provider_id), 1)], 2),
					f("div", { class: d(h(B).inspector_field) }, [f("dt", null, c(h(b)("workbench.generation_inspector.submitted_at_label")), 1), f("dd", W, c(a.job.submitted_at), 1)], 2),
					D.value === void 0 ? l("", !0) : (i(), s("div", {
						key: 0,
						class: d(h(B).inspector_field)
					}, [f("dt", null, c(h(b)("workbench.generation_inspector.model_label")), 1), f("dd", null, c(D.value), 1)], 2)),
					T.value === void 0 ? l("", !0) : (i(), s("div", {
						key: 1,
						class: d(h(B).inspector_field)
					}, [f("dt", null, c(h(b)("workbench.generation_inspector.sampler_label")), 1), f("dd", null, c(T.value), 1)], 2)),
					S.value === void 0 ? l("", !0) : (i(), s("div", {
						key: 2,
						class: d(h(B).inspector_field)
					}, [f("dt", null, c(h(b)("workbench.generation_inspector.steps_label")), 1), f("dd", G, c(S.value), 1)], 2)),
					x.value === void 0 ? l("", !0) : (i(), s("div", {
						key: 3,
						class: d(h(B).inspector_field)
					}, [f("dt", null, c(h(b)("workbench.generation_inspector.seed_label")), 1), f("dd", K, c(x.value), 1)], 2))
				], 2)) : l("", !0),
				f("div", { class: d(h(B).inspector_actions) }, [f("button", {
					type: "button",
					class: d(["tc-interactive", h(B).text_action_button]),
					"data-testid": "copy-parameters",
					onClick: k
				}, [y(h(C), {
					size: 14,
					"aria-hidden": "true"
				}), _(" " + c(h(b)("common.actions.copy")), 1)], 2), O.value ? (i(), u(L, {
					key: 0,
					icon: h(z),
					size: "sm",
					label: h(b)("workbench.retry_action"),
					"data-testid": "inspector-retry",
					onClick: t[0] ||= (e) => v("retry")
				}, null, 8, ["icon", "label"])) : l("", !0)], 2),
				a.job && a.job.completed_image_ids.length > 0 ? (i(), s(g, { key: 1 }, [f("p", { class: d(h(B).section_title) }, c(h(b)("workbench.generation_inspector.completed_images_title")), 3), f("ul", {
					class: d(h(B).completion_preview_list),
					"data-testid": "completion-preview"
				}, [(i(!0), s(g, null, r(a.job.completed_image_ids, (e, t) => (i(), s("li", {
					key: e,
					class: d(h(B).completion_preview_tile)
				}, [a.previewUrls[e] ? (i(), s("img", {
					key: 0,
					src: a.previewUrls[e],
					alt: h(b)("workbench.generation_inspector.image_alt", { n: t + 1 })
				}, null, 8, q)) : (i(), s("span", {
					key: 1,
					class: d(h(B).completion_preview_placeholder),
					role: "img",
					"aria-label": h(b)("workbench.generation_inspector.image_alt", { n: t + 1 })
				}, [y(h(w), { size: 20 })], 10, J))], 2))), 128))], 2)], 64)) : l("", !0)
			]),
			_: 1
		}, 8, ["status", "empty-message"])], 2));
	}
}), X = [
	"id",
	"value",
	"placeholder",
	"aria-describedby",
	"aria-invalid"
], Z = [
	"id",
	"value",
	"placeholder",
	"aria-describedby"
], Q = /* @__PURE__ */ v({
	__name: "PromptComposer",
	props: {
		positivePrompt: {},
		negativePrompt: {},
		imageCount: {},
		positiveError: {},
		imageCountError: {}
	},
	emits: [
		"update:positivePrompt",
		"update:negativePrompt",
		"update:imageCount"
	],
	setup(e, { emit: t }) {
		let r = e, a = t, { t: c } = p();
		function l(e) {
			a("update:positivePrompt", e.target.value);
		}
		function u(e) {
			a("update:negativePrompt", e.target.value);
		}
		return (e, t) => (i(), s("div", {
			class: d(h(B).prompt_composer),
			"data-testid": "prompt-composer"
		}, [
			y(A, {
				label: h(c)("workbench.prompt_composer.positive_label"),
				error: r.positiveError ?? null,
				required: ""
			}, {
				default: o(({ fieldId: e, describedBy: t, invalid: n }) => [f("textarea", {
					id: e,
					class: d(h(B).prompt_textarea),
					"data-testid": "positive-prompt-input",
					value: r.positivePrompt,
					placeholder: h(c)("workbench.prompt_composer.positive_placeholder"),
					"aria-describedby": t,
					"aria-invalid": n,
					rows: "6",
					onInput: l
				}, null, 42, X)]),
				_: 1
			}, 8, ["label", "error"]),
			y(A, { label: h(c)("workbench.prompt_composer.negative_label") }, {
				default: o(({ fieldId: e, describedBy: t }) => [f("textarea", {
					id: e,
					class: d(h(B).prompt_textarea),
					"data-testid": "negative-prompt-input",
					value: r.negativePrompt,
					placeholder: h(c)("workbench.prompt_composer.negative_placeholder"),
					"aria-describedby": t,
					rows: "3",
					onInput: u
				}, null, 42, Z)]),
				_: 1
			}, 8, ["label"]),
			y(A, {
				label: h(c)("workbench.prompt_composer.image_count_label"),
				error: r.imageCountError ?? null
			}, {
				default: o(({ fieldId: e, describedBy: i }) => [y(O, n(h(F)({ describedBy: i }), {
					id: e,
					"model-value": r.imageCount,
					label: h(c)("workbench.prompt_composer.image_count_label"),
					min: 1,
					max: 4,
					step: 1,
					"increment-label": h(c)("common.actions.increase"),
					"decrement-label": h(c)("common.actions.decrease"),
					"data-testid": "image-count-stepper",
					"onUpdate:modelValue": t[0] ||= (e) => a("update:imageCount", e)
				}), null, 16, [
					"id",
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])]),
				_: 1
			}, 8, ["label", "error"])
		], 2));
	}
}), $ = /* @__PURE__ */ v({
	__name: "ProviderSummary",
	props: {
		profiles: {},
		activeProfileId: {},
		loading: { type: Boolean },
		hasError: { type: Boolean }
	},
	emits: ["select", "open-settings"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: a } = p(), l = m(() => n.loading ? "loading" : n.hasError ? "error" : n.profiles.length === 0 ? "empty" : "ready"), u = m(() => `${a("workbench.provider_summary.no_profile_title")} ${a("workbench.provider_summary.no_profile_description")}`), g = m(() => n.profiles.map((e) => ({
			value: e.id,
			label: `${e.display_name} (${e.provider_id})`
		})));
		function _(e) {
			r("select", e);
		}
		return (e, t) => (i(), s("div", {
			class: d(h(B).provider_summary),
			"data-testid": "provider-summary"
		}, [f("div", { class: d(h(B).section_header) }, [f("span", { class: d(h(B).section_title) }, c(h(a)("workbench.provider_summary.title")), 3)], 2), y(E, {
			status: l.value,
			"min-height": "56px",
			"empty-message": u.value,
			"error-message": h(a)("workbench.provider_summary.load_error")
		}, {
			action: o(() => [f("button", {
				type: "button",
				class: d(["tc-interactive", h(B).text_action_button]),
				"data-testid": "open-provider-settings",
				onClick: t[0] ||= (e) => r("open-settings")
			}, c(h(a)("workbench.provider_summary.open_settings_action")), 3)]),
			default: o(() => [y(N, {
				"data-testid": "provider-select",
				"model-value": n.activeProfileId ?? void 0,
				options: g.value,
				placeholder: h(a)("workbench.provider_summary.select_label"),
				"aria-label": h(a)("workbench.provider_summary.select_label"),
				"onUpdate:modelValue": _
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])]),
			_: 1
		}, 8, [
			"status",
			"empty-message",
			"error-message"
		])], 2));
	}
}), ee = ["onClick"], te = 4, ne = /* @__PURE__ */ v({
	__name: "ReferenceStrip",
	props: {
		references: {},
		available: {},
		status: {}
	},
	emits: [
		"add",
		"remove",
		"reorder"
	],
	setup(t, { emit: n }) {
		let a = t, u = n, { t: v } = p(), b = e(!1), C = m(() => a.references.length >= te), T = m(() => {
			let e = new Set(a.references.map((e) => e.asset_id));
			return a.available.filter((t) => !e.has(t.id));
		}), O = m(() => a.status === "loading" ? "loading" : a.status === "error" ? "error" : T.value.length === 0 ? "empty" : "ready"), A = m(() => `${v("workbench.reference_strip.picker_empty_title")} ${v("workbench.reference_strip.picker_empty_description")}`);
		function M() {
			C.value || (b.value = !0);
		}
		function N(e) {
			u("add", e.id), b.value = !1;
		}
		function P(e) {
			e !== 0 && u("reorder", e, e - 1);
		}
		function F(e) {
			e !== a.references.length - 1 && u("reorder", e, e + 1);
		}
		return (e, t) => (i(), s("div", {
			class: d(h(B).reference_strip),
			"data-testid": "reference-strip"
		}, [
			f("div", { class: d(h(B).section_header) }, [f("span", { class: d(h(B).section_title) }, c(h(v)("workbench.reference_strip.title")), 3), f("span", { class: d(h(B).section_hint) }, c(h(v)("workbench.reference_strip.max_reached_hint")), 3)], 2),
			a.references.length === 0 ? (i(), s("div", {
				key: 0,
				class: d(h(B).reference_empty)
			}, [
				f("p", null, c(h(v)("workbench.reference_strip.empty_title")), 1),
				f("p", { class: d(h(B).section_hint) }, c(h(v)("workbench.reference_strip.empty_description")), 3),
				f("button", {
					type: "button",
					class: d(["tc-interactive", h(B).reference_add_button]),
					"data-testid": "reference-add",
					onClick: M
				}, [y(h(k), {
					size: 16,
					"aria-hidden": "true"
				}), _(" " + c(h(v)("workbench.reference_strip.add_action")), 1)], 2)
			], 2)) : (i(), s("ul", {
				key: 1,
				class: d(h(B).reference_list),
				"data-testid": "reference-list"
			}, [(i(!0), s(g, null, r(a.references, (e, t) => (i(), s("li", {
				key: e.asset_id,
				class: d(h(B).reference_tile),
				"data-testid": "reference-item"
			}, [
				f("span", {
					class: d(h(B).reference_tile_thumb),
					"aria-hidden": "true"
				}, [y(h(w), { size: 18 })], 2),
				f("span", { class: d(h(B).reference_tile_name) }, c(e.display_name), 3),
				f("span", { class: d(h(B).reference_tile_actions) }, [
					y(L, {
						icon: h(S),
						size: "sm",
						label: h(v)("workbench.reference_strip.move_up_action"),
						disabled: t === 0,
						onClick: (e) => P(t)
					}, null, 8, [
						"icon",
						"label",
						"disabled",
						"onClick"
					]),
					y(L, {
						icon: h(x),
						size: "sm",
						label: h(v)("workbench.reference_strip.move_down_action"),
						disabled: t === a.references.length - 1,
						onClick: (e) => F(t)
					}, null, 8, [
						"icon",
						"label",
						"disabled",
						"onClick"
					]),
					y(L, {
						icon: h(j),
						size: "sm",
						label: h(v)("workbench.reference_strip.remove_action"),
						"data-testid": "reference-remove",
						onClick: (e) => u("remove", t)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])
				], 2)
			], 2))), 128)), C.value ? l("", !0) : (i(), s("li", {
				key: 0,
				class: d(h(B).reference_tile_add)
			}, [f("button", {
				type: "button",
				class: d(["tc-interactive", h(B).reference_add_button]),
				"data-testid": "reference-add",
				onClick: M
			}, [y(h(k), {
				size: 16,
				"aria-hidden": "true"
			}), _(" " + c(h(v)("workbench.reference_strip.add_action")), 1)], 2)], 2))], 2)),
			y(D, {
				open: b.value,
				title: h(v)("workbench.reference_strip.picker_title"),
				"close-label": h(v)("common.actions.close"),
				"onUpdate:open": t[0] ||= (e) => b.value = e
			}, {
				default: o(() => [y(E, {
					status: O.value,
					"empty-message": A.value,
					"error-message": h(v)("workbench.reference_strip.picker_error")
				}, {
					default: o(() => [f("ul", { class: d(h(B).picker_list) }, [(i(!0), s(g, null, r(T.value, (e) => (i(), s("li", { key: e.id }, [f("button", {
						type: "button",
						class: d(["tc-interactive", h(B).picker_item]),
						"data-testid": "reference-picker-item",
						onClick: (t) => N(e)
					}, c(e.display_name), 11, ee)]))), 128))], 2)]),
					_: 1
				}, 8, [
					"status",
					"empty-message",
					"error-message"
				])]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			])
		], 2));
	}
});
//#endregion
//#region src/ui/views/workbench/use_toasts.ts
function re() {
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
//#region src/ui/views/workbench/WorkbenchView.vue
var ie = /* @__PURE__ */ v({
	__name: "WorkbenchView",
	props: {
		state: {},
		previewUrls: {}
	},
	emits: [
		"select-profile",
		"submit",
		"cancel-job",
		"retry-job",
		"open-settings",
		"consume-inspector-selection"
	],
	setup(n, { emit: r }) {
		let o = n, u = r, { t: g } = p(), { toasts: _, push: v, dismiss: b } = re(), x = a({
			positive_prompt: "",
			negative_prompt: "",
			image_count: 1,
			references: []
		}), S = e(!1), C = e(null), w = /* @__PURE__ */ new Map(), E = e(null), D = m(() => o.state.workbench.profiles.find((e) => e.id === o.state.workbench.active_profile_id) ?? null), O = m(() => {
			let e = {};
			return o.state.workbench.active_profile_id || (e.profile = g("workbench.submit.validation.profile_required")), x.positive_prompt.trim() === "" && (e.prompt = g("workbench.submit.validation.prompt_required")), (x.image_count < 1 || x.image_count > 4) && (e.image_count = g("workbench.submit.validation.image_count_range")), D.value?.provider_id === "comfyui" && (e.provider = g("workbench.submit.validation.provider_unsupported")), e;
		}), k = m(() => Object.keys(O.value).length > 0), A = m(() => o.state.workbench.jobs.find((e) => e.job_id === C.value) ?? null), j = m(() => A.value ? w.get(A.value.request_id) ?? null : null);
		async function N() {
			S.value = !0;
			let e = o.state.workbench.active_profile_id, t = D.value;
			if (k.value || !e || !t) return;
			let n = crypto.randomUUID(), r = await M({
				provider_id: t.provider_id,
				positive_prompt: x.positive_prompt,
				negative_prompt: x.negative_prompt,
				image_count: x.image_count,
				references: x.references
			}, n);
			E.value = r, u("submit", {
				profile_id: e,
				request: r
			});
		}
		t(() => o.state.workbench.submit_command, (e) => {
			e.status === "success" && E.value && (w.set(e.result.request_id, E.value), C.value = e.result.job_id, S.value = !1);
		}), t(() => o.state.inspector.selected_record, (e) => {
			if (e?.kind !== "gallery_record" || e.intent !== "modify_prompt" && e.intent !== "regenerate") return;
			let t = e.prefill;
			t?.positive_prompt && (x.positive_prompt = t.positive_prompt), t?.negative_prompt && (x.negative_prompt = t.negative_prompt), t?.positive_prompt && v({
				title: g("workbench.prefilled_from_gallery_notice"),
				variant: "info"
			}), u("consume-inspector-selection");
		}, { immediate: !0 });
		function P(e) {
			let t = o.state.assets.records.reference.find((t) => t.id === e);
			!t || x.references.length >= 4 || (x.references = [...x.references, {
				asset_id: e,
				display_name: t.display_name
			}]);
		}
		function F(e) {
			x.references = x.references.filter((t, n) => n !== e);
		}
		function L(e, t) {
			let n = [...x.references], [r] = n.splice(e, 1);
			r && n.splice(t, 0, r), x.references = n;
		}
		function R() {
			v({
				title: g("common.actions.copied"),
				variant: "success"
			});
		}
		function z() {
			A.value && u("retry-job", A.value.job_id);
		}
		return (e, t) => (i(), s("div", {
			class: d(h(B).workbench_view),
			"data-testid": "workbench-view"
		}, [
			f("div", { class: d(h(B).main_column) }, [
				y($, {
					profiles: o.state.workbench.profiles,
					"active-profile-id": o.state.workbench.active_profile_id,
					loading: o.state.loading.has("profiles"),
					"has-error": o.state.failures.has("profiles"),
					onSelect: t[0] ||= (e) => u("select-profile", e),
					onOpenSettings: t[1] ||= (e) => u("open-settings")
				}, null, 8, [
					"profiles",
					"active-profile-id",
					"loading",
					"has-error"
				]),
				y(Q, {
					"positive-prompt": x.positive_prompt,
					"onUpdate:positivePrompt": t[2] ||= (e) => x.positive_prompt = e,
					"negative-prompt": x.negative_prompt,
					"onUpdate:negativePrompt": t[3] ||= (e) => x.negative_prompt = e,
					"image-count": x.image_count,
					"onUpdate:imageCount": t[4] ||= (e) => x.image_count = e,
					"positive-error": S.value && O.value.prompt ? O.value.prompt : null,
					"image-count-error": S.value && O.value.image_count ? O.value.image_count : null
				}, null, 8, [
					"positive-prompt",
					"negative-prompt",
					"image-count",
					"positive-error",
					"image-count-error"
				]),
				y(ne, {
					references: x.references,
					available: o.state.assets.records.reference,
					status: o.state.loading.has("assets") ? "loading" : o.state.failures.has("assets") ? "error" : "ready",
					onAdd: P,
					onRemove: F,
					onReorder: L
				}, null, 8, [
					"references",
					"available",
					"status"
				]),
				f("div", { class: d(h(B).submit_row) }, [
					y(T, {
						label: h(g)("workbench.submit.action"),
						variant: "primary",
						pending: o.state.workbench.submit_command.status === "pending",
						"data-testid": "submit-generation",
						onClick: N
					}, null, 8, ["label", "pending"]),
					S.value && O.value.profile ? (i(), s("p", {
						key: 0,
						role: "alert",
						class: d(h(B).inline_error),
						"data-testid": "validation-profile"
					}, c(O.value.profile), 3)) : l("", !0),
					S.value && O.value.provider ? (i(), s("p", {
						key: 1,
						role: "alert",
						class: d(h(B).inline_error),
						"data-testid": "validation-provider"
					}, c(O.value.provider), 3)) : l("", !0),
					o.state.workbench.submit_command.status === "error" ? (i(), s("p", {
						key: 2,
						role: "alert",
						class: d(h(B).inline_error),
						"data-testid": "submit-error"
					}, c(h(g)("errors.generation_failed", { message: o.state.workbench.submit_command.failure.code })), 3)) : l("", !0)
				], 2),
				y(U, {
					jobs: o.state.workbench.jobs,
					loading: o.state.loading.has("generation"),
					"has-error": o.state.failures.has("generation"),
					"selected-job-id": C.value,
					onCancel: t[5] ||= (e) => u("cancel-job", e),
					onRetry: t[6] ||= (e) => u("retry-job", e),
					onSelect: t[7] ||= (e) => C.value = e
				}, null, 8, [
					"jobs",
					"loading",
					"has-error",
					"selected-job-id"
				])
			], 2),
			f("div", { class: d(h(B).side_column) }, [y(Y, {
				job: A.value,
				request: j.value,
				"preview-urls": o.previewUrls ?? {},
				onCopyParameters: R,
				onRetry: z
			}, null, 8, [
				"job",
				"request",
				"preview-urls"
			])], 2),
			y(I, {
				toasts: h(_),
				"viewport-label": h(g)("common.notifications.viewport_label"),
				"announce-label": h(g)("common.notifications.announce_label"),
				"close-label": h(g)("common.actions.close"),
				onDismiss: h(b)
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
