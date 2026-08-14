import { $ as e, D as t, F as n, N as r, V as i, W as a, _ as o, ct as s, et as c, g as l, h as u, m as d, n as f, p, pt as m, u as h, ut as g, v as _, x as v, y } from "./vue-i18n-DUz2Gjn8.js";
import { n as b, t as x } from "./AppIcon-Cnhzrx9o.js";
import { t as S } from "./cable-DOLYmQWA.js";
import { t as C } from "./chevron-down-Tu_8qTxg.js";
import { t as w } from "./chevron-up-D4TetO-M.js";
import { t as T } from "./copy-CzjDY47g.js";
import { t as E } from "./image-off-CuiUiYj9.js";
import { n as D, t as O } from "./StateSurface-Bo_sA18G.js";
import { n as k, t as A } from "./NumberStepper-zIDhvMwB.js";
import { n as j, t as M } from "./FieldGroup-LDtWeac7.js";
import { t as N } from "./x-CDKrptQJ.js";
import { t as P } from "./build_generation_request-CwGRNQz1.js";
import { t as F } from "./AppSelect-CJ-1Hi5_.js";
import { n as I, t as L } from "./_prop_utils-DtjJGT5O.js";
import { t as R } from "./ToastViewport-B5UnHzMU.js";
import { t as z } from "./IconButton-JYVgios9.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/ban.js
var B = b("ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M4.929 4.929 19.07 19.071",
	key: "196cmz"
}]]), V = b("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), H = b("settings-2", [
	["path", {
		d: "M14 17H5",
		key: "gfn3mx"
	}],
	["path", {
		d: "M19 7h-9",
		key: "6i9tg"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "3",
		key: "18b49y"
	}],
	["circle", {
		cx: "7",
		cy: "7",
		r: "3",
		key: "dfmy0x"
	}]
]), U = {
	workbench_view: "_workbench_view_10r88_8",
	workbench_view_setup: "_workbench_view_setup_10r88_16",
	setup_panel: "_setup_panel_10r88_20",
	setup_intro: "_setup_intro_10r88_29",
	setup_icon: "_setup_icon_10r88_36",
	setup_label: "_setup_label_10r88_49",
	setup_title: "_setup_title_10r88_56",
	setup_description: "_setup_description_10r88_64",
	setup_steps: "_setup_steps_10r88_72",
	setup_step: "_setup_step_10r88_72",
	setup_step_index: "_setup_step_index_10r88_89",
	setup_step_active: "_setup_step_active_10r88_103",
	setup_step_title: "_setup_step_title_10r88_108",
	setup_step_description: "_setup_step_description_10r88_114",
	main_column: "_main_column_10r88_121",
	side_column: "_side_column_10r88_129",
	provider_summary: "_provider_summary_10r88_168",
	section_header: "_section_header_10r88_174",
	section_title: "_section_title_10r88_182",
	section_hint: "_section_hint_10r88_188",
	inline_error: "_inline_error_10r88_193",
	prompt_composer: "_prompt_composer_10r88_201",
	prompt_textarea: "_prompt_textarea_10r88_210",
	reference_strip: "_reference_strip_10r88_231",
	reference_empty: "_reference_empty_10r88_237",
	reference_list: "_reference_list_10r88_245",
	reference_tile: "_reference_tile_10r88_252",
	reference_tile_thumb: "_reference_tile_thumb_10r88_263",
	reference_tile_name: "_reference_tile_name_10r88_273",
	reference_tile_actions: "_reference_tile_actions_10r88_280",
	reference_tile_add: "_reference_tile_add_10r88_285",
	reference_add_button: "_reference_add_button_10r88_292",
	picker_list: "_picker_list_10r88_302",
	picker_item: "_picker_item_10r88_308",
	submit_row: "_submit_row_10r88_319",
	provider_content: "_provider_content_10r88_341",
	text_action_button: "_text_action_button_10r88_354",
	active_jobs: "_active_jobs_10r88_363",
	job_list: "_job_list_10r88_370",
	job_row: "_job_row_10r88_375",
	job_row_selected: "_job_row_selected_10r88_384",
	job_row_main: "_job_row_main_10r88_393",
	job_status_dot: "_job_status_dot_10r88_402",
	job_provider: "_job_provider_10r88_410",
	job_state: "_job_state_10r88_414",
	job_progress: "_job_progress_10r88_419",
	job_error: "_job_error_10r88_425",
	job_row_actions: "_job_row_actions_10r88_431",
	generation_inspector: "_generation_inspector_10r88_438",
	inspector_field_list: "_inspector_field_list_10r88_444",
	inspector_field: "_inspector_field_10r88_444",
	inspector_actions: "_inspector_actions_10r88_471",
	completion_preview_list: "_completion_preview_list_10r88_478",
	completion_preview_tile: "_completion_preview_tile_10r88_485",
	completion_preview_placeholder: "_completion_preview_placeholder_10r88_498"
}, W = ["data-job-state"], G = ["onClick"], K = /* @__PURE__ */ v({
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
	setup(e, { emit: t }) {
		let i = [
			"queued",
			"preparing",
			"submitting",
			"running"
		], _ = ["failed", "cancelled"], v = e, b = t, { t: x } = f(), S = c(null), C = p(() => v.loading ? "loading" : v.hasError ? "error" : v.jobs.length === 0 ? "empty" : "ready"), w = p(() => v.jobs.filter((e) => i.includes(e.state)).length);
		function T(e) {
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
		function E(e) {
			return i.includes(e.state);
		}
		function D(e) {
			return _.includes(e.state);
		}
		function k(e) {
			S.value = e;
		}
		function A() {
			S.value && b("cancel", S.value), S.value = null;
		}
		let j = p(() => v.jobs.find((e) => e.job_id === S.value));
		return (e, t) => (r(), o("div", {
			class: g(s(U).active_jobs),
			"data-testid": "active-jobs"
		}, [
			d("div", { class: g(s(U).section_header) }, [d("span", { class: g(s(U).section_title) }, m(s(x)("workbench.active_jobs.title")), 3), w.value > 0 ? (r(), o("span", {
				key: 0,
				class: g([s(U).section_hint, "tc-tabular-nums"])
			}, m(s(x)("workbench.active_jobs.active_count", { n: w.value }, w.value)), 3)) : l("", !0)], 2),
			y(O, {
				status: C.value,
				"empty-title": s(x)("workbench.active_jobs.empty_title"),
				"empty-message": s(x)("workbench.active_jobs.empty_description"),
				"error-message": s(x)("workbench.active_jobs.load_error")
			}, {
				default: a(() => [d("ul", {
					class: g(s(U).job_list),
					"data-testid": "job-list"
				}, [(r(!0), o(h, null, n(v.jobs, (e) => (r(), o("li", {
					key: e.job_id,
					class: g([s(U).job_row, e.job_id === v.selectedJobId && s(U).job_row_selected]),
					"data-testid": "job-row",
					"data-job-state": e.state
				}, [
					d("button", {
						type: "button",
						class: g(["tc-interactive", s(U).job_row_main]),
						"data-testid": "job-select",
						onClick: (t) => b("select", e.job_id)
					}, [
						e.state === "running" ? (r(), o("span", {
							key: 0,
							class: g(s(U).job_status_dot),
							"aria-hidden": "true"
						}, null, 2)) : l("", !0),
						d("span", { class: g(s(U).job_provider) }, m(e.provider_id), 3),
						d("span", {
							class: g(s(U).job_state),
							"data-testid": "job-state-label"
						}, m(T(e.state)), 3),
						d("span", {
							class: g(["tc-tabular-nums", s(U).job_progress]),
							"data-testid": "job-progress"
						}, m(s(x)("workbench.active_jobs.progress_label", {
							completed: e.completed_image_ids.length,
							total: e.image_count
						})), 3)
					], 10, G),
					e.error ? (r(), o("p", {
						key: 0,
						role: "alert",
						class: g(s(U).job_error)
					}, m(s(x)("errors.generation_failed", { message: e.error.code })), 3)) : l("", !0),
					d("span", { class: g(s(U).job_row_actions) }, [E(e) ? (r(), u(z, {
						key: 0,
						icon: s(B),
						size: "sm",
						destructive: "",
						label: s(x)("workbench.active_jobs.cancel_action"),
						"data-testid": "job-cancel",
						onClick: (t) => k(e.job_id)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])) : l("", !0), D(e) ? (r(), u(z, {
						key: 1,
						icon: s(V),
						size: "sm",
						label: s(x)("workbench.retry_action"),
						"data-testid": "job-retry",
						onClick: (t) => b("retry", e.job_id)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])) : l("", !0)], 2)
				], 10, W))), 128))], 2)]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message",
				"error-message"
			]),
			y(I, {
				open: S.value !== null,
				title: s(x)("workbench.active_jobs.cancel_confirm_title"),
				description: s(x)("workbench.active_jobs.cancel_confirm_description", { provider: j.value?.provider_id ?? "" }),
				"confirm-label": s(x)("common.actions.confirm"),
				"cancel-label": s(x)("common.actions.cancel"),
				"onUpdate:open": t[0] ||= (e) => S.value = e ? S.value : null,
				onConfirm: A
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			])
		], 2));
	}
}), q = { class: "tc-tabular-nums" }, J = { class: "tc-tabular-nums" }, Y = { class: "tc-tabular-nums" }, X = ["src", "alt"], Z = ["aria-label"], Q = /* @__PURE__ */ v({
	__name: "GenerationInspector",
	props: {
		job: {},
		request: {},
		previewUrls: {}
	},
	emits: ["copy-parameters", "retry"],
	setup(e, { emit: t }) {
		let i = ["failed", "cancelled"], c = e, v = t, { t: b } = f(), S = p(() => c.request && "seed" in c.request ? c.request.seed : void 0), C = p(() => c.request && "steps" in c.request ? c.request.steps : void 0), w = p(() => c.request && "sampler" in c.request ? c.request.sampler : void 0), D = p(() => c.request && "model_id" in c.request ? c.request.model_id : void 0), k = p(() => c.job !== null && i.includes(c.job.state));
		async function A() {
			if (!c.job) return;
			let e = {
				job_id: c.job.job_id,
				provider_id: c.job.provider_id,
				seed: S.value,
				steps: C.value,
				sampler: w.value,
				model_id: D.value
			};
			await navigator.clipboard.writeText(JSON.stringify(e, null, 2)), v("copy-parameters");
		}
		return (e, t) => (r(), o("div", {
			class: g(s(U).generation_inspector),
			"data-testid": "generation-inspector"
		}, [d("div", { class: g(s(U).section_header) }, [d("span", { class: g(s(U).section_title) }, m(s(b)("workbench.generation_inspector.title")), 3)], 2), y(O, {
			status: c.job ? "ready" : "empty",
			"empty-title": s(b)("workbench.generation_inspector.empty_title"),
			"empty-message": s(b)("workbench.generation_inspector.empty_description")
		}, {
			default: a(() => [
				c.job ? (r(), o("dl", {
					key: 0,
					class: g(s(U).inspector_field_list),
					"data-testid": "inspector-fields"
				}, [
					d("div", { class: g(s(U).inspector_field) }, [d("dt", null, m(s(b)("workbench.generation_inspector.provider_label")), 1), d("dd", null, m(c.job.provider_id), 1)], 2),
					d("div", { class: g(s(U).inspector_field) }, [d("dt", null, m(s(b)("workbench.generation_inspector.submitted_at_label")), 1), d("dd", q, m(c.job.submitted_at), 1)], 2),
					D.value === void 0 ? l("", !0) : (r(), o("div", {
						key: 0,
						class: g(s(U).inspector_field)
					}, [d("dt", null, m(s(b)("workbench.generation_inspector.model_label")), 1), d("dd", null, m(D.value), 1)], 2)),
					w.value === void 0 ? l("", !0) : (r(), o("div", {
						key: 1,
						class: g(s(U).inspector_field)
					}, [d("dt", null, m(s(b)("workbench.generation_inspector.sampler_label")), 1), d("dd", null, m(w.value), 1)], 2)),
					C.value === void 0 ? l("", !0) : (r(), o("div", {
						key: 2,
						class: g(s(U).inspector_field)
					}, [d("dt", null, m(s(b)("workbench.generation_inspector.steps_label")), 1), d("dd", J, m(C.value), 1)], 2)),
					S.value === void 0 ? l("", !0) : (r(), o("div", {
						key: 3,
						class: g(s(U).inspector_field)
					}, [d("dt", null, m(s(b)("workbench.generation_inspector.seed_label")), 1), d("dd", Y, m(S.value), 1)], 2))
				], 2)) : l("", !0),
				d("div", { class: g(s(U).inspector_actions) }, [d("button", {
					type: "button",
					class: g(["tc-interactive", s(U).text_action_button]),
					"data-testid": "copy-parameters",
					onClick: A
				}, [y(x, {
					icon: s(T),
					size: 14
				}, null, 8, ["icon"]), _(" " + m(s(b)("common.actions.copy")), 1)], 2), k.value ? (r(), u(z, {
					key: 0,
					icon: s(V),
					size: "sm",
					label: s(b)("workbench.retry_action"),
					"data-testid": "inspector-retry",
					onClick: t[0] ||= (e) => v("retry")
				}, null, 8, ["icon", "label"])) : l("", !0)], 2),
				c.job && c.job.completed_image_ids.length > 0 ? (r(), o(h, { key: 1 }, [d("p", { class: g(s(U).section_title) }, m(s(b)("workbench.generation_inspector.completed_images_title")), 3), d("ul", {
					class: g(s(U).completion_preview_list),
					"data-testid": "completion-preview"
				}, [(r(!0), o(h, null, n(c.job.completed_image_ids, (e, t) => (r(), o("li", {
					key: e,
					class: g(s(U).completion_preview_tile)
				}, [c.previewUrls[e] ? (r(), o("img", {
					key: 0,
					src: c.previewUrls[e],
					alt: s(b)("workbench.generation_inspector.image_alt", { n: t + 1 })
				}, null, 8, X)) : (r(), o("span", {
					key: 1,
					class: g(s(U).completion_preview_placeholder),
					role: "img",
					"aria-label": s(b)("workbench.generation_inspector.image_alt", { n: t + 1 })
				}, [y(x, {
					icon: s(E),
					size: 20
				}, null, 8, ["icon"])], 10, Z))], 2))), 128))], 2)], 64)) : l("", !0)
			]),
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
	"aria-describedby",
	"aria-invalid"
], ee = [
	"id",
	"value",
	"placeholder",
	"aria-describedby"
], te = /* @__PURE__ */ v({
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
	setup(e, { emit: n }) {
		let i = e, c = n, { t: l } = f();
		function u(e) {
			c("update:positivePrompt", e.target.value);
		}
		function p(e) {
			c("update:negativePrompt", e.target.value);
		}
		return (e, n) => (r(), o("div", {
			class: g(s(U).prompt_composer),
			"data-testid": "prompt-composer"
		}, [
			y(M, {
				label: s(l)("workbench.prompt_composer.positive_label"),
				error: i.positiveError ?? null,
				required: ""
			}, {
				default: a(({ fieldId: e, describedBy: t, invalid: n }) => [d("textarea", {
					id: e,
					class: g(s(U).prompt_textarea),
					"data-testid": "positive-prompt-input",
					value: i.positivePrompt,
					placeholder: s(l)("workbench.prompt_composer.positive_placeholder"),
					"aria-describedby": t,
					"aria-invalid": n,
					rows: "6",
					onInput: u
				}, null, 42, $)]),
				_: 1
			}, 8, ["label", "error"]),
			y(M, { label: s(l)("workbench.prompt_composer.negative_label") }, {
				default: a(({ fieldId: e, describedBy: t }) => [d("textarea", {
					id: e,
					class: g(s(U).prompt_textarea),
					"data-testid": "negative-prompt-input",
					value: i.negativePrompt,
					placeholder: s(l)("workbench.prompt_composer.negative_placeholder"),
					"aria-describedby": t,
					rows: "3",
					onInput: p
				}, null, 42, ee)]),
				_: 1
			}, 8, ["label"]),
			y(M, {
				label: s(l)("workbench.prompt_composer.image_count_label"),
				error: i.imageCountError ?? null
			}, {
				default: a(({ fieldId: e, describedBy: r }) => [y(A, t(s(L)({ describedBy: r }), {
					id: e,
					"model-value": i.imageCount,
					label: s(l)("workbench.prompt_composer.image_count_label"),
					min: 1,
					max: 4,
					step: 1,
					"increment-label": s(l)("common.actions.increase"),
					"decrement-label": s(l)("common.actions.decrease"),
					"data-testid": "image-count-stepper",
					"onUpdate:modelValue": n[0] ||= (e) => c("update:imageCount", e)
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
}), ne = /* @__PURE__ */ v({
	__name: "ProviderSummary",
	props: {
		profiles: {},
		activeProfileId: {},
		loading: { type: Boolean },
		hasError: { type: Boolean }
	},
	emits: ["select", "open-settings"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: c } = f(), l = p(() => n.loading ? "loading" : n.hasError ? "error" : n.profiles.length === 0 ? "empty" : "ready"), u = p(() => n.profiles.map((e) => ({
			value: e.id,
			label: `${e.display_name} (${e.provider_id})`
		})));
		function h(e) {
			i("select", e);
		}
		return (e, t) => (r(), o("div", {
			class: g(s(U).provider_summary),
			"data-testid": "provider-summary"
		}, [d("div", { class: g(s(U).section_header) }, [d("span", { class: g(s(U).section_title) }, m(s(c)("workbench.provider_summary.title")), 3)], 2), d("div", { class: g(s(U).provider_content) }, [y(O, {
			status: l.value,
			"min-height": "56px",
			"empty-title": s(c)("workbench.provider_summary.no_profile_title"),
			"empty-message": s(c)("workbench.provider_summary.no_profile_description"),
			"error-message": s(c)("workbench.provider_summary.load_error")
		}, {
			action: a(() => [d("button", {
				type: "button",
				class: g(["tc-interactive", s(U).text_action_button]),
				"data-testid": "open-provider-settings",
				onClick: t[0] ||= (e) => i("open-settings")
			}, m(s(c)("workbench.provider_summary.open_settings_action")), 3)]),
			default: a(() => [y(F, {
				"data-testid": "provider-select",
				"model-value": n.activeProfileId ?? void 0,
				options: u.value,
				placeholder: s(c)("workbench.provider_summary.select_label"),
				"aria-label": s(c)("workbench.provider_summary.select_label"),
				"onUpdate:modelValue": h
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])]),
			_: 1
		}, 8, [
			"status",
			"empty-title",
			"empty-message",
			"error-message"
		])], 2)], 2));
	}
}), re = ["onClick"], ie = 4, ae = /* @__PURE__ */ v({
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
	setup(e, { emit: t }) {
		let i = e, u = t, { t: v } = f(), b = c(!1), S = p(() => i.references.length >= ie), T = p(() => {
			let e = new Set(i.references.map((e) => e.asset_id));
			return i.available.filter((t) => !e.has(t.id));
		}), D = p(() => i.status === "loading" ? "loading" : i.status === "error" ? "error" : T.value.length === 0 ? "empty" : "ready");
		function A() {
			S.value || (b.value = !0);
		}
		function M(e) {
			u("add", e.id), b.value = !1;
		}
		function P(e) {
			e !== 0 && u("reorder", e, e - 1);
		}
		function F(e) {
			e !== i.references.length - 1 && u("reorder", e, e + 1);
		}
		return (e, t) => (r(), o("div", {
			class: g(s(U).reference_strip),
			"data-testid": "reference-strip"
		}, [
			d("div", { class: g(s(U).section_header) }, [d("span", { class: g(s(U).section_title) }, m(s(v)("workbench.reference_strip.title")), 3), d("span", { class: g(s(U).section_hint) }, m(s(v)("workbench.reference_strip.max_reached_hint")), 3)], 2),
			i.references.length === 0 ? (r(), o("div", {
				key: 0,
				class: g(s(U).reference_empty)
			}, [
				d("p", null, m(s(v)("workbench.reference_strip.empty_title")), 1),
				d("p", { class: g(s(U).section_hint) }, m(s(v)("workbench.reference_strip.empty_description")), 3),
				d("button", {
					type: "button",
					class: g(["tc-interactive", s(U).reference_add_button]),
					"data-testid": "reference-add",
					onClick: A
				}, [y(x, {
					icon: s(j),
					size: 16
				}, null, 8, ["icon"]), _(" " + m(s(v)("workbench.reference_strip.add_action")), 1)], 2)
			], 2)) : (r(), o("ul", {
				key: 1,
				class: g(s(U).reference_list),
				"data-testid": "reference-list"
			}, [(r(!0), o(h, null, n(i.references, (e, t) => (r(), o("li", {
				key: e.asset_id,
				class: g(s(U).reference_tile),
				"data-testid": "reference-item"
			}, [
				d("span", {
					class: g(s(U).reference_tile_thumb),
					"aria-hidden": "true"
				}, [y(x, {
					icon: s(E),
					size: 18
				}, null, 8, ["icon"])], 2),
				d("span", { class: g(s(U).reference_tile_name) }, m(e.display_name), 3),
				d("span", { class: g(s(U).reference_tile_actions) }, [
					y(z, {
						icon: s(w),
						size: "sm",
						label: s(v)("workbench.reference_strip.move_up_action"),
						disabled: t === 0,
						onClick: (e) => P(t)
					}, null, 8, [
						"icon",
						"label",
						"disabled",
						"onClick"
					]),
					y(z, {
						icon: s(C),
						size: "sm",
						label: s(v)("workbench.reference_strip.move_down_action"),
						disabled: t === i.references.length - 1,
						onClick: (e) => F(t)
					}, null, 8, [
						"icon",
						"label",
						"disabled",
						"onClick"
					]),
					y(z, {
						icon: s(N),
						size: "sm",
						label: s(v)("workbench.reference_strip.remove_action"),
						"data-testid": "reference-remove",
						onClick: (e) => u("remove", t)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])
				], 2)
			], 2))), 128)), S.value ? l("", !0) : (r(), o("li", {
				key: 0,
				class: g(s(U).reference_tile_add)
			}, [d("button", {
				type: "button",
				class: g(["tc-interactive", s(U).reference_add_button]),
				"data-testid": "reference-add",
				onClick: A
			}, [y(x, {
				icon: s(j),
				size: 16
			}, null, 8, ["icon"]), _(" " + m(s(v)("workbench.reference_strip.add_action")), 1)], 2)], 2))], 2)),
			y(k, {
				open: b.value,
				title: s(v)("workbench.reference_strip.picker_title"),
				"close-label": s(v)("common.actions.close"),
				"onUpdate:open": t[0] ||= (e) => b.value = e
			}, {
				default: a(() => [y(O, {
					status: D.value,
					"empty-title": s(v)("workbench.reference_strip.picker_empty_title"),
					"empty-message": s(v)("workbench.reference_strip.picker_empty_description"),
					"error-message": s(v)("workbench.reference_strip.picker_error")
				}, {
					default: a(() => [d("ul", { class: g(s(U).picker_list) }, [(r(!0), o(h, null, n(T.value, (e) => (r(), o("li", { key: e.id }, [d("button", {
						type: "button",
						class: g(["tc-interactive", s(U).picker_item]),
						"data-testid": "reference-picker-item",
						onClick: (t) => M(e)
					}, m(e.display_name), 11, re)]))), 128))], 2)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
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
function oe() {
	let e = c([]);
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
//#region src/ui/views/workbench/WorkbenchView.vue
var se = /* @__PURE__ */ v({
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
	setup(t, { emit: n }) {
		let a = t, u = n, { t: _ } = f(), { toasts: v, push: b, dismiss: C } = oe(), w = e({
			positive_prompt: "",
			negative_prompt: "",
			image_count: 1,
			references: []
		}), T = c(!1), E = c(null), O = /* @__PURE__ */ new Map(), k = c(null), A = p(() => a.state.workbench.profiles.find((e) => e.id === a.state.workbench.active_profile_id) ?? null), j = p(() => !a.state.loading.has("profiles") && !a.state.failures.has("profiles") && a.state.workbench.profiles.length === 0), M = p(() => {
			let e = {};
			return a.state.workbench.active_profile_id || (e.profile = _("workbench.submit.validation.profile_required")), w.positive_prompt.trim() === "" && (e.prompt = _("workbench.submit.validation.prompt_required")), (w.image_count < 1 || w.image_count > 4) && (e.image_count = _("workbench.submit.validation.image_count_range")), A.value?.provider_id === "comfyui" && (e.provider = _("workbench.submit.validation.provider_unsupported")), e;
		}), N = p(() => Object.keys(M.value).length > 0), F = p(() => a.state.workbench.jobs.find((e) => e.job_id === E.value) ?? null), I = p(() => F.value ? O.get(F.value.request_id) ?? null : null);
		async function L() {
			T.value = !0;
			let e = a.state.workbench.active_profile_id, t = A.value;
			if (N.value || !e || !t) return;
			let n = crypto.randomUUID(), r = await P({
				provider_id: t.provider_id,
				positive_prompt: w.positive_prompt,
				negative_prompt: w.negative_prompt,
				image_count: w.image_count,
				references: w.references
			}, n);
			k.value = r, u("submit", {
				profile_id: e,
				request: r
			});
		}
		i(() => a.state.workbench.submit_command, (e) => {
			e.status === "success" && k.value && (O.set(e.result.request_id, k.value), E.value = e.result.job_id, T.value = !1);
		}), i(() => a.state.inspector.selected_record, (e) => {
			if (e?.kind !== "gallery_record" || e.intent !== "modify_prompt" && e.intent !== "regenerate") return;
			let t = e.prefill;
			t?.positive_prompt && (w.positive_prompt = t.positive_prompt), t?.negative_prompt && (w.negative_prompt = t.negative_prompt), t?.positive_prompt && b({
				title: _("workbench.prefilled_from_gallery_notice"),
				variant: "info"
			}), u("consume-inspector-selection");
		}, { immediate: !0 });
		function z(e) {
			let t = a.state.assets.records.reference.find((t) => t.id === e);
			!t || w.references.length >= 4 || (w.references = [...w.references, {
				asset_id: e,
				display_name: t.display_name
			}]);
		}
		function B(e) {
			w.references = w.references.filter((t, n) => n !== e);
		}
		function V(e, t) {
			let n = [...w.references], [r] = n.splice(e, 1);
			r && n.splice(t, 0, r), w.references = n;
		}
		function W() {
			b({
				title: _("common.actions.copied"),
				variant: "success"
			});
		}
		function G() {
			F.value && u("retry-job", F.value.job_id);
		}
		return (e, t) => (r(), o("div", {
			class: g([s(U).workbench_view, j.value && s(U).workbench_view_setup]),
			"data-testid": "workbench-view"
		}, [j.value ? (r(), o("section", {
			key: 0,
			class: g(s(U).setup_panel),
			"data-testid": "provider-setup-panel"
		}, [d("div", { class: g(s(U).setup_intro) }, [
			d("div", {
				class: g(s(U).setup_icon),
				"aria-hidden": "true"
			}, [y(x, {
				icon: s(S),
				size: 26
			}, null, 8, ["icon"])], 2),
			d("p", { class: g(s(U).setup_label) }, m(s(_)("workbench.setup.label")), 3),
			d("h1", { class: g(s(U).setup_title) }, m(s(_)("workbench.setup.title")), 3),
			d("p", { class: g(s(U).setup_description) }, m(s(_)("workbench.setup.description")), 3),
			y(D, {
				label: s(_)("workbench.setup.action"),
				icon: s(H),
				variant: "primary",
				"data-testid": "open-provider-settings",
				onClick: t[0] ||= (e) => u("open-settings")
			}, null, 8, ["label", "icon"])
		], 2), d("ol", { class: g(s(U).setup_steps) }, [
			d("li", { class: g([s(U).setup_step, s(U).setup_step_active]) }, [d("span", { class: g(s(U).setup_step_index) }, "1", 2), d("div", null, [d("h2", { class: g(s(U).setup_step_title) }, m(s(_)("workbench.setup.steps.profile_title")), 3), d("p", { class: g(s(U).setup_step_description) }, m(s(_)("workbench.setup.steps.profile_description")), 3)])], 2),
			d("li", { class: g(s(U).setup_step) }, [d("span", { class: g(s(U).setup_step_index) }, "2", 2), d("div", null, [d("h2", { class: g(s(U).setup_step_title) }, m(s(_)("workbench.setup.steps.credentials_title")), 3), d("p", { class: g(s(U).setup_step_description) }, m(s(_)("workbench.setup.steps.credentials_description")), 3)])], 2),
			d("li", { class: g(s(U).setup_step) }, [d("span", { class: g(s(U).setup_step_index) }, "3", 2), d("div", null, [d("h2", { class: g(s(U).setup_step_title) }, m(s(_)("workbench.setup.steps.test_title")), 3), d("p", { class: g(s(U).setup_step_description) }, m(s(_)("workbench.setup.steps.test_description")), 3)])], 2)
		], 2)], 2)) : (r(), o(h, { key: 1 }, [d("div", { class: g(s(U).main_column) }, [
			y(ne, {
				profiles: a.state.workbench.profiles,
				"active-profile-id": a.state.workbench.active_profile_id,
				loading: a.state.loading.has("profiles"),
				"has-error": a.state.failures.has("profiles"),
				onSelect: t[1] ||= (e) => u("select-profile", e),
				onOpenSettings: t[2] ||= (e) => u("open-settings")
			}, null, 8, [
				"profiles",
				"active-profile-id",
				"loading",
				"has-error"
			]),
			y(te, {
				"positive-prompt": w.positive_prompt,
				"onUpdate:positivePrompt": t[3] ||= (e) => w.positive_prompt = e,
				"negative-prompt": w.negative_prompt,
				"onUpdate:negativePrompt": t[4] ||= (e) => w.negative_prompt = e,
				"image-count": w.image_count,
				"onUpdate:imageCount": t[5] ||= (e) => w.image_count = e,
				"positive-error": T.value && M.value.prompt ? M.value.prompt : null,
				"image-count-error": T.value && M.value.image_count ? M.value.image_count : null
			}, null, 8, [
				"positive-prompt",
				"negative-prompt",
				"image-count",
				"positive-error",
				"image-count-error"
			]),
			d("div", { class: g(s(U).submit_row) }, [
				y(D, {
					label: s(_)("workbench.submit.action"),
					variant: "primary",
					pending: a.state.workbench.submit_command.status === "pending",
					"data-testid": "submit-generation",
					onClick: L
				}, null, 8, ["label", "pending"]),
				T.value && M.value.profile ? (r(), o("p", {
					key: 0,
					role: "alert",
					class: g(s(U).inline_error),
					"data-testid": "validation-profile"
				}, m(M.value.profile), 3)) : l("", !0),
				T.value && M.value.provider ? (r(), o("p", {
					key: 1,
					role: "alert",
					class: g(s(U).inline_error),
					"data-testid": "validation-provider"
				}, m(M.value.provider), 3)) : l("", !0),
				a.state.workbench.submit_command.status === "error" ? (r(), o("p", {
					key: 2,
					role: "alert",
					class: g(s(U).inline_error),
					"data-testid": "submit-error"
				}, m(s(_)("errors.generation_failed", { message: a.state.workbench.submit_command.failure.code })), 3)) : l("", !0)
			], 2),
			y(ae, {
				references: w.references,
				available: a.state.assets.records.reference,
				status: a.state.loading.has("assets") ? "loading" : a.state.failures.has("assets") ? "error" : "ready",
				onAdd: z,
				onRemove: B,
				onReorder: V
			}, null, 8, [
				"references",
				"available",
				"status"
			]),
			y(K, {
				jobs: a.state.workbench.jobs,
				loading: a.state.loading.has("generation"),
				"has-error": a.state.failures.has("generation"),
				"selected-job-id": E.value,
				onCancel: t[6] ||= (e) => u("cancel-job", e),
				onRetry: t[7] ||= (e) => u("retry-job", e),
				onSelect: t[8] ||= (e) => E.value = e
			}, null, 8, [
				"jobs",
				"loading",
				"has-error",
				"selected-job-id"
			])
		], 2), d("div", { class: g(s(U).side_column) }, [y(Q, {
			job: F.value,
			request: I.value,
			"preview-urls": a.previewUrls ?? {},
			onCopyParameters: W,
			onRetry: G
		}, null, 8, [
			"job",
			"request",
			"preview-urls"
		])], 2)], 64)), y(R, {
			toasts: s(v),
			"viewport-label": s(_)("common.notifications.viewport_label"),
			"announce-label": s(_)("common.notifications.announce_label"),
			"close-label": s(_)("common.actions.close"),
			onDismiss: s(C)
		}, null, 8, [
			"toasts",
			"viewport-label",
			"announce-label",
			"close-label",
			"onDismiss"
		])], 2));
	}
});
//#endregion
export { se as default };
