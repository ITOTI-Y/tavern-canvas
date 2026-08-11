import { $ as e, D as t, F as n, N as r, V as i, W as a, _ as o, ct as s, et as c, g as l, h as u, m as d, n as f, p, pt as m, u as h, ut as g, v as _, x as v, y } from "./vue-i18n-DUz2Gjn8.js";
import { n as b, t as x } from "./AppIcon-Cnhzrx9o.js";
import { t as S } from "./chevron-down-Tu_8qTxg.js";
import { t as C } from "./chevron-up-D4TetO-M.js";
import { t as w } from "./copy-CzjDY47g.js";
import { t as T } from "./image-off-CuiUiYj9.js";
import { n as E, t as D } from "./StateSurface-Bo_sA18G.js";
import { n as O, t as k } from "./NumberStepper-zIDhvMwB.js";
import { n as A, t as j } from "./FieldGroup-LDtWeac7.js";
import { t as M } from "./x-CDKrptQJ.js";
import { t as N } from "./build_generation_request-CwGRNQz1.js";
import { t as P } from "./AppSelect-CJ-1Hi5_.js";
import { n as F, t as I } from "./_prop_utils-DtjJGT5O.js";
import { t as L } from "./ToastViewport-B5UnHzMU.js";
import { t as R } from "./IconButton-JYVgios9.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/ban.js
var z = b("ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M4.929 4.929 19.07 19.071",
	key: "196cmz"
}]]), B = b("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), V = {
	workbench_view: "_workbench_view_12cu0_8",
	main_column: "_main_column_12cu0_15",
	side_column: "_side_column_12cu0_22",
	section_header: "_section_header_12cu0_43",
	section_title: "_section_title_12cu0_51",
	section_hint: "_section_hint_12cu0_55",
	inline_error: "_inline_error_12cu0_60",
	prompt_composer: "_prompt_composer_12cu0_68",
	prompt_textarea: "_prompt_textarea_12cu0_76",
	reference_strip: "_reference_strip_12cu0_96",
	reference_empty: "_reference_empty_12cu0_101",
	reference_list: "_reference_list_12cu0_109",
	reference_tile: "_reference_tile_12cu0_116",
	reference_tile_thumb: "_reference_tile_thumb_12cu0_127",
	reference_tile_name: "_reference_tile_name_12cu0_137",
	reference_tile_actions: "_reference_tile_actions_12cu0_144",
	reference_tile_add: "_reference_tile_add_12cu0_149",
	reference_add_button: "_reference_add_button_12cu0_156",
	picker_list: "_picker_list_12cu0_166",
	picker_item: "_picker_item_12cu0_172",
	submit_row: "_submit_row_12cu0_183",
	provider_summary: "_provider_summary_12cu0_194",
	provider_content: "_provider_content_12cu0_199",
	text_action_button: "_text_action_button_12cu0_203",
	active_jobs: "_active_jobs_12cu0_212",
	job_list: "_job_list_12cu0_218",
	job_row: "_job_row_12cu0_223",
	job_row_selected: "_job_row_selected_12cu0_231",
	job_row_main: "_job_row_main_12cu0_239",
	job_status_dot: "_job_status_dot_12cu0_248",
	job_provider: "_job_provider_12cu0_256",
	job_state: "_job_state_12cu0_260",
	job_progress: "_job_progress_12cu0_265",
	job_error: "_job_error_12cu0_271",
	job_row_actions: "_job_row_actions_12cu0_277",
	generation_inspector: "_generation_inspector_12cu0_284",
	inspector_field_list: "_inspector_field_list_12cu0_288",
	inspector_field: "_inspector_field_12cu0_288",
	inspector_actions: "_inspector_actions_12cu0_315",
	completion_preview_list: "_completion_preview_list_12cu0_322",
	completion_preview_tile: "_completion_preview_tile_12cu0_329",
	completion_preview_placeholder: "_completion_preview_placeholder_12cu0_342"
}, H = ["data-job-state"], U = ["onClick"], W = /* @__PURE__ */ v({
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
		function O(e) {
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
			class: g(s(V).active_jobs),
			"data-testid": "active-jobs"
		}, [
			d("div", { class: g(s(V).section_header) }, [d("span", { class: g(s(V).section_title) }, m(s(x)("workbench.active_jobs.title")), 3), w.value > 0 ? (r(), o("span", {
				key: 0,
				class: g([s(V).section_hint, "tc-tabular-nums"])
			}, m(s(x)("workbench.active_jobs.active_count", { n: w.value }, w.value)), 3)) : l("", !0)], 2),
			y(D, {
				status: C.value,
				"empty-title": s(x)("workbench.active_jobs.empty_title"),
				"empty-message": s(x)("workbench.active_jobs.empty_description"),
				"error-message": s(x)("workbench.active_jobs.load_error")
			}, {
				default: a(() => [d("ul", {
					class: g(s(V).job_list),
					"data-testid": "job-list"
				}, [(r(!0), o(h, null, n(v.jobs, (e) => (r(), o("li", {
					key: e.job_id,
					class: g([s(V).job_row, e.job_id === v.selectedJobId && s(V).job_row_selected]),
					"data-testid": "job-row",
					"data-job-state": e.state
				}, [
					d("button", {
						type: "button",
						class: g(["tc-interactive", s(V).job_row_main]),
						"data-testid": "job-select",
						onClick: (t) => b("select", e.job_id)
					}, [
						e.state === "running" ? (r(), o("span", {
							key: 0,
							class: g(s(V).job_status_dot),
							"aria-hidden": "true"
						}, null, 2)) : l("", !0),
						d("span", { class: g(s(V).job_provider) }, m(e.provider_id), 3),
						d("span", {
							class: g(s(V).job_state),
							"data-testid": "job-state-label"
						}, m(T(e.state)), 3),
						d("span", {
							class: g(["tc-tabular-nums", s(V).job_progress]),
							"data-testid": "job-progress"
						}, m(s(x)("workbench.active_jobs.progress_label", {
							completed: e.completed_image_ids.length,
							total: e.image_count
						})), 3)
					], 10, U),
					e.error ? (r(), o("p", {
						key: 0,
						role: "alert",
						class: g(s(V).job_error)
					}, m(s(x)("errors.generation_failed", { message: e.error.code })), 3)) : l("", !0),
					d("span", { class: g(s(V).job_row_actions) }, [E(e) ? (r(), u(R, {
						key: 0,
						icon: s(z),
						size: "sm",
						destructive: "",
						label: s(x)("workbench.active_jobs.cancel_action"),
						"data-testid": "job-cancel",
						onClick: (t) => k(e.job_id)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])) : l("", !0), O(e) ? (r(), u(R, {
						key: 1,
						icon: s(B),
						size: "sm",
						label: s(x)("workbench.retry_action"),
						"data-testid": "job-retry",
						onClick: (t) => b("retry", e.job_id)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])) : l("", !0)], 2)
				], 10, H))), 128))], 2)]),
				_: 1
			}, 8, [
				"status",
				"empty-title",
				"empty-message",
				"error-message"
			]),
			y(F, {
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
}), G = { class: "tc-tabular-nums" }, K = { class: "tc-tabular-nums" }, q = { class: "tc-tabular-nums" }, J = ["src", "alt"], Y = ["aria-label"], X = /* @__PURE__ */ v({
	__name: "GenerationInspector",
	props: {
		job: {},
		request: {},
		previewUrls: {}
	},
	emits: ["copy-parameters", "retry"],
	setup(e, { emit: t }) {
		let i = ["failed", "cancelled"], c = e, v = t, { t: b } = f(), S = p(() => c.request && "seed" in c.request ? c.request.seed : void 0), C = p(() => c.request && "steps" in c.request ? c.request.steps : void 0), E = p(() => c.request && "sampler" in c.request ? c.request.sampler : void 0), O = p(() => c.request && "model_id" in c.request ? c.request.model_id : void 0), k = p(() => c.job !== null && i.includes(c.job.state));
		async function A() {
			if (!c.job) return;
			let e = {
				job_id: c.job.job_id,
				provider_id: c.job.provider_id,
				seed: S.value,
				steps: C.value,
				sampler: E.value,
				model_id: O.value
			};
			await navigator.clipboard.writeText(JSON.stringify(e, null, 2)), v("copy-parameters");
		}
		return (e, t) => (r(), o("div", {
			class: g(s(V).generation_inspector),
			"data-testid": "generation-inspector"
		}, [d("div", { class: g(s(V).section_header) }, [d("span", { class: g(s(V).section_title) }, m(s(b)("workbench.generation_inspector.title")), 3)], 2), y(D, {
			status: c.job ? "ready" : "empty",
			"empty-title": s(b)("workbench.generation_inspector.empty_title"),
			"empty-message": s(b)("workbench.generation_inspector.empty_description")
		}, {
			default: a(() => [
				c.job ? (r(), o("dl", {
					key: 0,
					class: g(s(V).inspector_field_list),
					"data-testid": "inspector-fields"
				}, [
					d("div", { class: g(s(V).inspector_field) }, [d("dt", null, m(s(b)("workbench.generation_inspector.provider_label")), 1), d("dd", null, m(c.job.provider_id), 1)], 2),
					d("div", { class: g(s(V).inspector_field) }, [d("dt", null, m(s(b)("workbench.generation_inspector.submitted_at_label")), 1), d("dd", G, m(c.job.submitted_at), 1)], 2),
					O.value === void 0 ? l("", !0) : (r(), o("div", {
						key: 0,
						class: g(s(V).inspector_field)
					}, [d("dt", null, m(s(b)("workbench.generation_inspector.model_label")), 1), d("dd", null, m(O.value), 1)], 2)),
					E.value === void 0 ? l("", !0) : (r(), o("div", {
						key: 1,
						class: g(s(V).inspector_field)
					}, [d("dt", null, m(s(b)("workbench.generation_inspector.sampler_label")), 1), d("dd", null, m(E.value), 1)], 2)),
					C.value === void 0 ? l("", !0) : (r(), o("div", {
						key: 2,
						class: g(s(V).inspector_field)
					}, [d("dt", null, m(s(b)("workbench.generation_inspector.steps_label")), 1), d("dd", K, m(C.value), 1)], 2)),
					S.value === void 0 ? l("", !0) : (r(), o("div", {
						key: 3,
						class: g(s(V).inspector_field)
					}, [d("dt", null, m(s(b)("workbench.generation_inspector.seed_label")), 1), d("dd", q, m(S.value), 1)], 2))
				], 2)) : l("", !0),
				d("div", { class: g(s(V).inspector_actions) }, [d("button", {
					type: "button",
					class: g(["tc-interactive", s(V).text_action_button]),
					"data-testid": "copy-parameters",
					onClick: A
				}, [y(x, {
					icon: s(w),
					size: 14
				}, null, 8, ["icon"]), _(" " + m(s(b)("common.actions.copy")), 1)], 2), k.value ? (r(), u(R, {
					key: 0,
					icon: s(B),
					size: "sm",
					label: s(b)("workbench.retry_action"),
					"data-testid": "inspector-retry",
					onClick: t[0] ||= (e) => v("retry")
				}, null, 8, ["icon", "label"])) : l("", !0)], 2),
				c.job && c.job.completed_image_ids.length > 0 ? (r(), o(h, { key: 1 }, [d("p", { class: g(s(V).section_title) }, m(s(b)("workbench.generation_inspector.completed_images_title")), 3), d("ul", {
					class: g(s(V).completion_preview_list),
					"data-testid": "completion-preview"
				}, [(r(!0), o(h, null, n(c.job.completed_image_ids, (e, t) => (r(), o("li", {
					key: e,
					class: g(s(V).completion_preview_tile)
				}, [c.previewUrls[e] ? (r(), o("img", {
					key: 0,
					src: c.previewUrls[e],
					alt: s(b)("workbench.generation_inspector.image_alt", { n: t + 1 })
				}, null, 8, J)) : (r(), o("span", {
					key: 1,
					class: g(s(V).completion_preview_placeholder),
					role: "img",
					"aria-label": s(b)("workbench.generation_inspector.image_alt", { n: t + 1 })
				}, [y(x, {
					icon: s(T),
					size: 20
				}, null, 8, ["icon"])], 10, Y))], 2))), 128))], 2)], 64)) : l("", !0)
			]),
			_: 1
		}, 8, [
			"status",
			"empty-title",
			"empty-message"
		])], 2));
	}
}), Z = [
	"id",
	"value",
	"placeholder",
	"aria-describedby",
	"aria-invalid"
], Q = [
	"id",
	"value",
	"placeholder",
	"aria-describedby"
], $ = /* @__PURE__ */ v({
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
			class: g(s(V).prompt_composer),
			"data-testid": "prompt-composer"
		}, [
			y(j, {
				label: s(l)("workbench.prompt_composer.positive_label"),
				error: i.positiveError ?? null,
				required: ""
			}, {
				default: a(({ fieldId: e, describedBy: t, invalid: n }) => [d("textarea", {
					id: e,
					class: g(s(V).prompt_textarea),
					"data-testid": "positive-prompt-input",
					value: i.positivePrompt,
					placeholder: s(l)("workbench.prompt_composer.positive_placeholder"),
					"aria-describedby": t,
					"aria-invalid": n,
					rows: "6",
					onInput: u
				}, null, 42, Z)]),
				_: 1
			}, 8, ["label", "error"]),
			y(j, { label: s(l)("workbench.prompt_composer.negative_label") }, {
				default: a(({ fieldId: e, describedBy: t }) => [d("textarea", {
					id: e,
					class: g(s(V).prompt_textarea),
					"data-testid": "negative-prompt-input",
					value: i.negativePrompt,
					placeholder: s(l)("workbench.prompt_composer.negative_placeholder"),
					"aria-describedby": t,
					rows: "3",
					onInput: p
				}, null, 42, Q)]),
				_: 1
			}, 8, ["label"]),
			y(j, {
				label: s(l)("workbench.prompt_composer.image_count_label"),
				error: i.imageCountError ?? null
			}, {
				default: a(({ fieldId: e, describedBy: r }) => [y(k, t(s(I)({ describedBy: r }), {
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
}), ee = /* @__PURE__ */ v({
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
			class: g(s(V).provider_summary),
			"data-testid": "provider-summary"
		}, [d("div", { class: g(s(V).section_header) }, [d("span", { class: g(s(V).section_title) }, m(s(c)("workbench.provider_summary.title")), 3)], 2), d("div", { class: g(s(V).provider_content) }, [y(D, {
			status: l.value,
			"min-height": "56px",
			"empty-title": s(c)("workbench.provider_summary.no_profile_title"),
			"empty-message": s(c)("workbench.provider_summary.no_profile_description"),
			"error-message": s(c)("workbench.provider_summary.load_error")
		}, {
			action: a(() => [d("button", {
				type: "button",
				class: g(["tc-interactive", s(V).text_action_button]),
				"data-testid": "open-provider-settings",
				onClick: t[0] ||= (e) => i("open-settings")
			}, m(s(c)("workbench.provider_summary.open_settings_action")), 3)]),
			default: a(() => [y(P, {
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
}), te = ["onClick"], ne = 4, re = /* @__PURE__ */ v({
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
		let i = e, u = t, { t: v } = f(), b = c(!1), w = p(() => i.references.length >= ne), E = p(() => {
			let e = new Set(i.references.map((e) => e.asset_id));
			return i.available.filter((t) => !e.has(t.id));
		}), k = p(() => i.status === "loading" ? "loading" : i.status === "error" ? "error" : E.value.length === 0 ? "empty" : "ready");
		function j() {
			w.value || (b.value = !0);
		}
		function N(e) {
			u("add", e.id), b.value = !1;
		}
		function P(e) {
			e !== 0 && u("reorder", e, e - 1);
		}
		function F(e) {
			e !== i.references.length - 1 && u("reorder", e, e + 1);
		}
		return (e, t) => (r(), o("div", {
			class: g(s(V).reference_strip),
			"data-testid": "reference-strip"
		}, [
			d("div", { class: g(s(V).section_header) }, [d("span", { class: g(s(V).section_title) }, m(s(v)("workbench.reference_strip.title")), 3), d("span", { class: g(s(V).section_hint) }, m(s(v)("workbench.reference_strip.max_reached_hint")), 3)], 2),
			i.references.length === 0 ? (r(), o("div", {
				key: 0,
				class: g(s(V).reference_empty)
			}, [
				d("p", null, m(s(v)("workbench.reference_strip.empty_title")), 1),
				d("p", { class: g(s(V).section_hint) }, m(s(v)("workbench.reference_strip.empty_description")), 3),
				d("button", {
					type: "button",
					class: g(["tc-interactive", s(V).reference_add_button]),
					"data-testid": "reference-add",
					onClick: j
				}, [y(x, {
					icon: s(A),
					size: 16
				}, null, 8, ["icon"]), _(" " + m(s(v)("workbench.reference_strip.add_action")), 1)], 2)
			], 2)) : (r(), o("ul", {
				key: 1,
				class: g(s(V).reference_list),
				"data-testid": "reference-list"
			}, [(r(!0), o(h, null, n(i.references, (e, t) => (r(), o("li", {
				key: e.asset_id,
				class: g(s(V).reference_tile),
				"data-testid": "reference-item"
			}, [
				d("span", {
					class: g(s(V).reference_tile_thumb),
					"aria-hidden": "true"
				}, [y(x, {
					icon: s(T),
					size: 18
				}, null, 8, ["icon"])], 2),
				d("span", { class: g(s(V).reference_tile_name) }, m(e.display_name), 3),
				d("span", { class: g(s(V).reference_tile_actions) }, [
					y(R, {
						icon: s(C),
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
					y(R, {
						icon: s(S),
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
					y(R, {
						icon: s(M),
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
			], 2))), 128)), w.value ? l("", !0) : (r(), o("li", {
				key: 0,
				class: g(s(V).reference_tile_add)
			}, [d("button", {
				type: "button",
				class: g(["tc-interactive", s(V).reference_add_button]),
				"data-testid": "reference-add",
				onClick: j
			}, [y(x, {
				icon: s(A),
				size: 16
			}, null, 8, ["icon"]), _(" " + m(s(v)("workbench.reference_strip.add_action")), 1)], 2)], 2))], 2)),
			y(O, {
				open: b.value,
				title: s(v)("workbench.reference_strip.picker_title"),
				"close-label": s(v)("common.actions.close"),
				"onUpdate:open": t[0] ||= (e) => b.value = e
			}, {
				default: a(() => [y(D, {
					status: k.value,
					"empty-title": s(v)("workbench.reference_strip.picker_empty_title"),
					"empty-message": s(v)("workbench.reference_strip.picker_empty_description"),
					"error-message": s(v)("workbench.reference_strip.picker_error")
				}, {
					default: a(() => [d("ul", { class: g(s(V).picker_list) }, [(r(!0), o(h, null, n(E.value, (e) => (r(), o("li", { key: e.id }, [d("button", {
						type: "button",
						class: g(["tc-interactive", s(V).picker_item]),
						"data-testid": "reference-picker-item",
						onClick: (t) => N(e)
					}, m(e.display_name), 11, te)]))), 128))], 2)]),
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
function ie() {
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
var ae = /* @__PURE__ */ v({
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
		let a = t, u = n, { t: h } = f(), { toasts: _, push: v, dismiss: b } = ie(), x = e({
			positive_prompt: "",
			negative_prompt: "",
			image_count: 1,
			references: []
		}), S = c(!1), C = c(null), w = /* @__PURE__ */ new Map(), T = c(null), D = p(() => a.state.workbench.profiles.find((e) => e.id === a.state.workbench.active_profile_id) ?? null), O = p(() => {
			let e = {};
			return a.state.workbench.active_profile_id || (e.profile = h("workbench.submit.validation.profile_required")), x.positive_prompt.trim() === "" && (e.prompt = h("workbench.submit.validation.prompt_required")), (x.image_count < 1 || x.image_count > 4) && (e.image_count = h("workbench.submit.validation.image_count_range")), D.value?.provider_id === "comfyui" && (e.provider = h("workbench.submit.validation.provider_unsupported")), e;
		}), k = p(() => Object.keys(O.value).length > 0), A = p(() => a.state.workbench.jobs.find((e) => e.job_id === C.value) ?? null), j = p(() => A.value ? w.get(A.value.request_id) ?? null : null);
		async function M() {
			S.value = !0;
			let e = a.state.workbench.active_profile_id, t = D.value;
			if (k.value || !e || !t) return;
			let n = crypto.randomUUID(), r = await N({
				provider_id: t.provider_id,
				positive_prompt: x.positive_prompt,
				negative_prompt: x.negative_prompt,
				image_count: x.image_count,
				references: x.references
			}, n);
			T.value = r, u("submit", {
				profile_id: e,
				request: r
			});
		}
		i(() => a.state.workbench.submit_command, (e) => {
			e.status === "success" && T.value && (w.set(e.result.request_id, T.value), C.value = e.result.job_id, S.value = !1);
		}), i(() => a.state.inspector.selected_record, (e) => {
			if (e?.kind !== "gallery_record" || e.intent !== "modify_prompt" && e.intent !== "regenerate") return;
			let t = e.prefill;
			t?.positive_prompt && (x.positive_prompt = t.positive_prompt), t?.negative_prompt && (x.negative_prompt = t.negative_prompt), t?.positive_prompt && v({
				title: h("workbench.prefilled_from_gallery_notice"),
				variant: "info"
			}), u("consume-inspector-selection");
		}, { immediate: !0 });
		function P(e) {
			let t = a.state.assets.records.reference.find((t) => t.id === e);
			!t || x.references.length >= 4 || (x.references = [...x.references, {
				asset_id: e,
				display_name: t.display_name
			}]);
		}
		function F(e) {
			x.references = x.references.filter((t, n) => n !== e);
		}
		function I(e, t) {
			let n = [...x.references], [r] = n.splice(e, 1);
			r && n.splice(t, 0, r), x.references = n;
		}
		function R() {
			v({
				title: h("common.actions.copied"),
				variant: "success"
			});
		}
		function z() {
			A.value && u("retry-job", A.value.job_id);
		}
		return (e, t) => (r(), o("div", {
			class: g(s(V).workbench_view),
			"data-testid": "workbench-view"
		}, [
			d("div", { class: g(s(V).main_column) }, [
				y(ee, {
					profiles: a.state.workbench.profiles,
					"active-profile-id": a.state.workbench.active_profile_id,
					loading: a.state.loading.has("profiles"),
					"has-error": a.state.failures.has("profiles"),
					onSelect: t[0] ||= (e) => u("select-profile", e),
					onOpenSettings: t[1] ||= (e) => u("open-settings")
				}, null, 8, [
					"profiles",
					"active-profile-id",
					"loading",
					"has-error"
				]),
				y($, {
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
				y(re, {
					references: x.references,
					available: a.state.assets.records.reference,
					status: a.state.loading.has("assets") ? "loading" : a.state.failures.has("assets") ? "error" : "ready",
					onAdd: P,
					onRemove: F,
					onReorder: I
				}, null, 8, [
					"references",
					"available",
					"status"
				]),
				d("div", { class: g(s(V).submit_row) }, [
					y(E, {
						label: s(h)("workbench.submit.action"),
						variant: "primary",
						pending: a.state.workbench.submit_command.status === "pending",
						"data-testid": "submit-generation",
						onClick: M
					}, null, 8, ["label", "pending"]),
					S.value && O.value.profile ? (r(), o("p", {
						key: 0,
						role: "alert",
						class: g(s(V).inline_error),
						"data-testid": "validation-profile"
					}, m(O.value.profile), 3)) : l("", !0),
					S.value && O.value.provider ? (r(), o("p", {
						key: 1,
						role: "alert",
						class: g(s(V).inline_error),
						"data-testid": "validation-provider"
					}, m(O.value.provider), 3)) : l("", !0),
					a.state.workbench.submit_command.status === "error" ? (r(), o("p", {
						key: 2,
						role: "alert",
						class: g(s(V).inline_error),
						"data-testid": "submit-error"
					}, m(s(h)("errors.generation_failed", { message: a.state.workbench.submit_command.failure.code })), 3)) : l("", !0)
				], 2),
				y(W, {
					jobs: a.state.workbench.jobs,
					loading: a.state.loading.has("generation"),
					"has-error": a.state.failures.has("generation"),
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
			d("div", { class: g(s(V).side_column) }, [y(X, {
				job: A.value,
				request: j.value,
				"preview-urls": a.previewUrls ?? {},
				onCopyParameters: R,
				onRetry: z
			}, null, 8, [
				"job",
				"request",
				"preview-urls"
			])], 2),
			y(L, {
				toasts: s(_),
				"viewport-label": s(h)("common.notifications.viewport_label"),
				"announce-label": s(h)("common.notifications.announce_label"),
				"close-label": s(h)("common.actions.close"),
				onDismiss: s(b)
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
export { ae as default };
