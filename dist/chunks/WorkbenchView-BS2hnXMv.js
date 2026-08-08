import { A as e, I as t, K as n, R as r, S as i, U as a, _ as o, a as s, b as c, ft as l, g as u, ht as d, n as f, nt as p, p as m, r as h, tt as g, ut as _, v, w as y, x as b, y as x } from "./AppIcon-BpY-A4VH.js";
import { r as S } from "./useTypeahead-DHbSip40.js";
import { t as C } from "./chevron-up-BB8zEGvw.js";
import { t as w } from "./copy-CYaZEuNp.js";
import { t as T } from "./image-off-CT1Asxdr.js";
import { n as E, t as D } from "./StateSurface-CNBIMTjV.js";
import { n as O, t as k } from "./NumberStepper-BcQ97MQl.js";
import { n as A, t as j } from "./FieldGroup-BPi4aGE9.js";
import { t as M } from "./AppSelect-YiC8A59f.js";
import { n as N, t as P } from "./_prop_utils-CoKBy72F.js";
import { t as F } from "./ToastViewport-BSmx29WE.js";
import { t as I } from "./IconButton-CW62aQy5.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/ban.js
var L = h("ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M4.929 4.929 19.07 19.071",
	key: "196cmz"
}]]), R = h("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), z = {
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
}, B = ["data-job-state"], V = ["onClick"], H = /* @__PURE__ */ y({
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
	setup(e, { emit: a }) {
		let f = [
			"queued",
			"preparing",
			"submitting",
			"running"
		], h = ["failed", "cancelled"], g = e, y = a, { t: b } = s(), S = p(null), C = u(() => g.loading ? "loading" : g.hasError ? "error" : g.jobs.length === 0 ? "empty" : "ready"), w = u(() => `${b("workbench.active_jobs.empty_title")} ${b("workbench.active_jobs.empty_description")}`), T = u(() => g.jobs.filter((e) => f.includes(e.state)).length);
		function E(e) {
			switch (e) {
				case "queued": return b("workbench.active_jobs.state_labels.queued");
				case "preparing": return b("workbench.active_jobs.state_labels.preparing");
				case "submitting": return b("workbench.active_jobs.state_labels.submitting");
				case "running": return b("workbench.active_jobs.state_labels.running");
				case "completed": return b("workbench.active_jobs.state_labels.completed");
				case "failed": return b("workbench.active_jobs.state_labels.failed");
				case "cancelled": return b("workbench.active_jobs.state_labels.cancelled");
				case "attached": return b("workbench.active_jobs.state_labels.attached");
				case "orphaned": return b("workbench.active_jobs.state_labels.orphaned");
			}
		}
		function O(e) {
			return f.includes(e.state);
		}
		function k(e) {
			return h.includes(e.state);
		}
		function A(e) {
			S.value = e;
		}
		function j() {
			S.value && y("cancel", S.value), S.value = null;
		}
		let M = u(() => g.jobs.find((e) => e.job_id === S.value));
		return (e, a) => (t(), c("div", {
			class: l(_(z).active_jobs),
			"data-testid": "active-jobs"
		}, [
			o("div", { class: l(_(z).section_header) }, [o("span", { class: l(_(z).section_title) }, d(_(b)("workbench.active_jobs.title")), 3), T.value > 0 ? (t(), c("span", {
				key: 0,
				class: l([_(z).section_hint, "tc-tabular-nums"])
			}, d(_(b)("workbench.active_jobs.active_count", { n: T.value }, T.value)), 3)) : x("", !0)], 2),
			i(D, {
				status: C.value,
				"empty-message": w.value,
				"error-message": _(b)("workbench.active_jobs.load_error")
			}, {
				default: n(() => [o("ul", {
					class: l(_(z).job_list),
					"data-testid": "job-list"
				}, [(t(!0), c(m, null, r(g.jobs, (e) => (t(), c("li", {
					key: e.job_id,
					class: l([_(z).job_row, e.job_id === g.selectedJobId && _(z).job_row_selected]),
					"data-testid": "job-row",
					"data-job-state": e.state
				}, [
					o("button", {
						type: "button",
						class: l(["tc-interactive", _(z).job_row_main]),
						"data-testid": "job-select",
						onClick: (t) => y("select", e.job_id)
					}, [
						e.state === "running" ? (t(), c("span", {
							key: 0,
							class: l(_(z).job_status_dot),
							"aria-hidden": "true"
						}, null, 2)) : x("", !0),
						o("span", { class: l(_(z).job_provider) }, d(e.provider_id), 3),
						o("span", {
							class: l(_(z).job_state),
							"data-testid": "job-state-label"
						}, d(E(e.state)), 3),
						o("span", {
							class: l(["tc-tabular-nums", _(z).job_progress]),
							"data-testid": "job-progress"
						}, d(_(b)("workbench.active_jobs.progress_label", {
							completed: e.completed_image_ids.length,
							total: e.image_count
						})), 3)
					], 10, V),
					e.error ? (t(), c("p", {
						key: 0,
						role: "alert",
						class: l(_(z).job_error)
					}, d(_(b)("errors.generation_failed", { message: e.error.code })), 3)) : x("", !0),
					o("span", { class: l(_(z).job_row_actions) }, [O(e) ? (t(), v(I, {
						key: 0,
						icon: _(L),
						size: "sm",
						destructive: "",
						label: _(b)("workbench.active_jobs.cancel_action"),
						"data-testid": "job-cancel",
						onClick: (t) => A(e.job_id)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])) : x("", !0), k(e) ? (t(), v(I, {
						key: 1,
						icon: _(R),
						size: "sm",
						label: _(b)("workbench.retry_action"),
						"data-testid": "job-retry",
						onClick: (t) => y("retry", e.job_id)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])) : x("", !0)], 2)
				], 10, B))), 128))], 2)]),
				_: 1
			}, 8, [
				"status",
				"empty-message",
				"error-message"
			]),
			i(N, {
				open: S.value !== null,
				title: _(b)("workbench.active_jobs.cancel_confirm_title"),
				description: _(b)("workbench.active_jobs.cancel_confirm_description", { provider: M.value?.provider_id ?? "" }),
				"confirm-label": _(b)("common.actions.confirm"),
				"cancel-label": _(b)("common.actions.cancel"),
				"onUpdate:open": a[0] ||= (e) => S.value = e ? S.value : null,
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
}), U = class extends Error {
	code = "workbench_provider_unsupported";
	constructor(e) {
		super(`Workbench cannot build a generation request for provider "${e}" yet.`), this.name = "UnsupportedProviderError";
	}
}, W = "0123456789abcdef";
function G(e) {
	let t = "";
	for (let n of e) t += (W[n >> 4] ?? "0") + (W[n & 15] ?? "0");
	return t;
}
async function K(e) {
	let t = new TextEncoder().encode(`${e}:${Date.now().toString()}`), n = await crypto.subtle.digest("SHA-256", t);
	return G(new Uint8Array(n));
}
async function q(e, t) {
	let n = {
		request_id: t,
		generation_anchor: await K(t),
		prompt: e.positive_prompt,
		output_count: e.image_count,
		...e.negative_prompt.trim() ? { negative_prompt: e.negative_prompt } : {}
	};
	switch (e.provider_id) {
		case "sd_webui": return {
			provider_id: "sd_webui",
			...n,
			mode: "txt2img",
			model_id: "default",
			sampler: "euler_a",
			scheduler: "normal",
			width: 512,
			height: 512,
			steps: 20,
			cfg_scale: 7
		};
		case "novelai": return {
			provider_id: "novelai",
			...n,
			model_id: "nai-diffusion-4-full",
			sampler: "k_euler",
			width: 832,
			height: 1216,
			steps: 28,
			scale: 5,
			cfg_rescale: 0,
			noise_schedule: "native",
			quality_toggle: !0,
			undesired_content_preset: "none",
			smea: !1,
			dyn: !1,
			...e.references.length > 0 ? { vibe_references: e.references.slice(0, 4).map((e) => ({
				asset_id: e.asset_id,
				strength: .6,
				information_extracted: 1
			})) } : {}
		};
		case "openai_image": {
			let t = e.references.length > 0;
			return {
				provider_id: "openai_image",
				...n,
				mode: t ? "edit" : "generate",
				model_id: "gpt-image-1",
				size: "auto",
				quality: "auto",
				background: "auto",
				output_format: "png",
				input_asset_ids: t ? e.references.map((e) => e.asset_id) : []
			};
		}
		case "google_image": return {
			provider_id: "google_image",
			...n,
			model_id: "gemini-2.5-flash-image",
			reference_asset_ids: e.references.slice(0, 14).map((e) => e.asset_id),
			aspect_ratio: "1:1",
			image_size: "1K",
			output_mime_type: "image/png"
		};
		case "comfyui": throw new U(e.provider_id);
	}
}
//#endregion
//#region src/ui/views/workbench/GenerationInspector.vue?vue&type=script&setup=true&lang.ts
var J = { class: "tc-tabular-nums" }, Y = { class: "tc-tabular-nums" }, X = { class: "tc-tabular-nums" }, Z = ["src", "alt"], Q = ["aria-label"], $ = /* @__PURE__ */ y({
	__name: "GenerationInspector",
	props: {
		job: {},
		request: {},
		previewUrls: {}
	},
	emits: ["copy-parameters", "retry"],
	setup(e, { emit: a }) {
		let f = ["failed", "cancelled"], p = e, h = a, { t: g } = s(), y = u(() => p.request && "seed" in p.request ? p.request.seed : void 0), S = u(() => p.request && "steps" in p.request ? p.request.steps : void 0), C = u(() => p.request && "sampler" in p.request ? p.request.sampler : void 0), E = u(() => p.request && "model_id" in p.request ? p.request.model_id : void 0), O = u(() => p.job !== null && f.includes(p.job.state));
		async function k() {
			if (!p.job) return;
			let e = {
				job_id: p.job.job_id,
				provider_id: p.job.provider_id,
				seed: y.value,
				steps: S.value,
				sampler: C.value,
				model_id: E.value
			};
			await navigator.clipboard.writeText(JSON.stringify(e, null, 2)), h("copy-parameters");
		}
		return (e, a) => (t(), c("div", {
			class: l(_(z).generation_inspector),
			"data-testid": "generation-inspector"
		}, [o("div", { class: l(_(z).section_header) }, [o("span", { class: l(_(z).section_title) }, d(_(g)("workbench.generation_inspector.title")), 3)], 2), i(D, {
			status: p.job ? "ready" : "empty",
			"empty-message": `${_(g)("workbench.generation_inspector.empty_title")} ${_(g)("workbench.generation_inspector.empty_description")}`
		}, {
			default: n(() => [
				p.job ? (t(), c("dl", {
					key: 0,
					class: l(_(z).inspector_field_list),
					"data-testid": "inspector-fields"
				}, [
					o("div", { class: l(_(z).inspector_field) }, [o("dt", null, d(_(g)("workbench.generation_inspector.provider_label")), 1), o("dd", null, d(p.job.provider_id), 1)], 2),
					o("div", { class: l(_(z).inspector_field) }, [o("dt", null, d(_(g)("workbench.generation_inspector.submitted_at_label")), 1), o("dd", J, d(p.job.submitted_at), 1)], 2),
					E.value === void 0 ? x("", !0) : (t(), c("div", {
						key: 0,
						class: l(_(z).inspector_field)
					}, [o("dt", null, d(_(g)("workbench.generation_inspector.model_label")), 1), o("dd", null, d(E.value), 1)], 2)),
					C.value === void 0 ? x("", !0) : (t(), c("div", {
						key: 1,
						class: l(_(z).inspector_field)
					}, [o("dt", null, d(_(g)("workbench.generation_inspector.sampler_label")), 1), o("dd", null, d(C.value), 1)], 2)),
					S.value === void 0 ? x("", !0) : (t(), c("div", {
						key: 2,
						class: l(_(z).inspector_field)
					}, [o("dt", null, d(_(g)("workbench.generation_inspector.steps_label")), 1), o("dd", Y, d(S.value), 1)], 2)),
					y.value === void 0 ? x("", !0) : (t(), c("div", {
						key: 3,
						class: l(_(z).inspector_field)
					}, [o("dt", null, d(_(g)("workbench.generation_inspector.seed_label")), 1), o("dd", X, d(y.value), 1)], 2))
				], 2)) : x("", !0),
				o("div", { class: l(_(z).inspector_actions) }, [o("button", {
					type: "button",
					class: l(["tc-interactive", _(z).text_action_button]),
					"data-testid": "copy-parameters",
					onClick: k
				}, [i(_(w), {
					size: 14,
					"aria-hidden": "true"
				}), b(" " + d(_(g)("common.actions.copy")), 1)], 2), O.value ? (t(), v(I, {
					key: 0,
					icon: _(R),
					size: "sm",
					label: _(g)("workbench.retry_action"),
					"data-testid": "inspector-retry",
					onClick: a[0] ||= (e) => h("retry")
				}, null, 8, ["icon", "label"])) : x("", !0)], 2),
				p.job && p.job.completed_image_ids.length > 0 ? (t(), c(m, { key: 1 }, [o("p", { class: l(_(z).section_title) }, d(_(g)("workbench.generation_inspector.completed_images_title")), 3), o("ul", {
					class: l(_(z).completion_preview_list),
					"data-testid": "completion-preview"
				}, [(t(!0), c(m, null, r(p.job.completed_image_ids, (e, n) => (t(), c("li", {
					key: e,
					class: l(_(z).completion_preview_tile)
				}, [p.previewUrls[e] ? (t(), c("img", {
					key: 0,
					src: p.previewUrls[e],
					alt: _(g)("workbench.generation_inspector.image_alt", { n: n + 1 })
				}, null, 8, Z)) : (t(), c("span", {
					key: 1,
					class: l(_(z).completion_preview_placeholder),
					role: "img",
					"aria-label": _(g)("workbench.generation_inspector.image_alt", { n: n + 1 })
				}, [i(_(T), { size: 20 })], 10, Q))], 2))), 128))], 2)], 64)) : x("", !0)
			]),
			_: 1
		}, 8, ["status", "empty-message"])], 2));
	}
}), ee = [
	"id",
	"value",
	"placeholder",
	"aria-describedby",
	"aria-invalid"
], te = [
	"id",
	"value",
	"placeholder",
	"aria-describedby"
], ne = /* @__PURE__ */ y({
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
	setup(r, { emit: a }) {
		let u = r, d = a, { t: f } = s();
		function p(e) {
			d("update:positivePrompt", e.target.value);
		}
		function m(e) {
			d("update:negativePrompt", e.target.value);
		}
		return (r, a) => (t(), c("div", {
			class: l(_(z).prompt_composer),
			"data-testid": "prompt-composer"
		}, [
			i(j, {
				label: _(f)("workbench.prompt_composer.positive_label"),
				error: u.positiveError ?? null,
				required: ""
			}, {
				default: n(({ fieldId: e, describedBy: t, invalid: n }) => [o("textarea", {
					id: e,
					class: l(_(z).prompt_textarea),
					"data-testid": "positive-prompt-input",
					value: u.positivePrompt,
					placeholder: _(f)("workbench.prompt_composer.positive_placeholder"),
					"aria-describedby": t,
					"aria-invalid": n,
					rows: "6",
					onInput: p
				}, null, 42, ee)]),
				_: 1
			}, 8, ["label", "error"]),
			i(j, { label: _(f)("workbench.prompt_composer.negative_label") }, {
				default: n(({ fieldId: e, describedBy: t }) => [o("textarea", {
					id: e,
					class: l(_(z).prompt_textarea),
					"data-testid": "negative-prompt-input",
					value: u.negativePrompt,
					placeholder: _(f)("workbench.prompt_composer.negative_placeholder"),
					"aria-describedby": t,
					rows: "3",
					onInput: m
				}, null, 42, te)]),
				_: 1
			}, 8, ["label"]),
			i(j, {
				label: _(f)("workbench.prompt_composer.image_count_label"),
				error: u.imageCountError ?? null
			}, {
				default: n(({ fieldId: t, describedBy: n }) => [i(k, e(_(P)({ describedBy: n }), {
					id: t,
					"model-value": u.imageCount,
					label: _(f)("workbench.prompt_composer.image_count_label"),
					min: 1,
					max: 4,
					step: 1,
					"increment-label": _(f)("common.actions.increase"),
					"decrement-label": _(f)("common.actions.decrease"),
					"data-testid": "image-count-stepper",
					"onUpdate:modelValue": a[0] ||= (e) => d("update:imageCount", e)
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
}), re = /* @__PURE__ */ y({
	__name: "ProviderSummary",
	props: {
		profiles: {},
		activeProfileId: {},
		loading: { type: Boolean },
		hasError: { type: Boolean }
	},
	emits: ["select", "open-settings"],
	setup(e, { emit: r }) {
		let a = e, f = r, { t: p } = s(), m = u(() => a.loading ? "loading" : a.hasError ? "error" : a.profiles.length === 0 ? "empty" : "ready"), h = u(() => `${p("workbench.provider_summary.no_profile_title")} ${p("workbench.provider_summary.no_profile_description")}`), g = u(() => a.profiles.map((e) => ({
			value: e.id,
			label: `${e.display_name} (${e.provider_id})`
		})));
		function v(e) {
			f("select", e);
		}
		return (e, r) => (t(), c("div", {
			class: l(_(z).provider_summary),
			"data-testid": "provider-summary"
		}, [o("div", { class: l(_(z).section_header) }, [o("span", { class: l(_(z).section_title) }, d(_(p)("workbench.provider_summary.title")), 3)], 2), i(D, {
			status: m.value,
			"min-height": "56px",
			"empty-message": h.value,
			"error-message": _(p)("workbench.provider_summary.load_error")
		}, {
			action: n(() => [o("button", {
				type: "button",
				class: l(["tc-interactive", _(z).text_action_button]),
				"data-testid": "open-provider-settings",
				onClick: r[0] ||= (e) => f("open-settings")
			}, d(_(p)("workbench.provider_summary.open_settings_action")), 3)]),
			default: n(() => [i(M, {
				"data-testid": "provider-select",
				"model-value": a.activeProfileId ?? void 0,
				options: g.value,
				placeholder: _(p)("workbench.provider_summary.select_label"),
				"aria-label": _(p)("workbench.provider_summary.select_label"),
				"onUpdate:modelValue": v
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
}), ie = ["onClick"], ae = 4, oe = /* @__PURE__ */ y({
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
	setup(e, { emit: a }) {
		let h = e, g = a, { t: v } = s(), y = p(!1), w = u(() => h.references.length >= ae), E = u(() => {
			let e = new Set(h.references.map((e) => e.asset_id));
			return h.available.filter((t) => !e.has(t.id));
		}), k = u(() => h.status === "loading" ? "loading" : h.status === "error" ? "error" : E.value.length === 0 ? "empty" : "ready"), j = u(() => `${v("workbench.reference_strip.picker_empty_title")} ${v("workbench.reference_strip.picker_empty_description")}`);
		function M() {
			w.value || (y.value = !0);
		}
		function N(e) {
			g("add", e.id), y.value = !1;
		}
		function P(e) {
			e !== 0 && g("reorder", e, e - 1);
		}
		function F(e) {
			e !== h.references.length - 1 && g("reorder", e, e + 1);
		}
		return (e, a) => (t(), c("div", {
			class: l(_(z).reference_strip),
			"data-testid": "reference-strip"
		}, [
			o("div", { class: l(_(z).section_header) }, [o("span", { class: l(_(z).section_title) }, d(_(v)("workbench.reference_strip.title")), 3), o("span", { class: l(_(z).section_hint) }, d(_(v)("workbench.reference_strip.max_reached_hint")), 3)], 2),
			h.references.length === 0 ? (t(), c("div", {
				key: 0,
				class: l(_(z).reference_empty)
			}, [
				o("p", null, d(_(v)("workbench.reference_strip.empty_title")), 1),
				o("p", { class: l(_(z).section_hint) }, d(_(v)("workbench.reference_strip.empty_description")), 3),
				o("button", {
					type: "button",
					class: l(["tc-interactive", _(z).reference_add_button]),
					"data-testid": "reference-add",
					onClick: M
				}, [i(_(A), {
					size: 16,
					"aria-hidden": "true"
				}), b(" " + d(_(v)("workbench.reference_strip.add_action")), 1)], 2)
			], 2)) : (t(), c("ul", {
				key: 1,
				class: l(_(z).reference_list),
				"data-testid": "reference-list"
			}, [(t(!0), c(m, null, r(h.references, (e, n) => (t(), c("li", {
				key: e.asset_id,
				class: l(_(z).reference_tile),
				"data-testid": "reference-item"
			}, [
				o("span", {
					class: l(_(z).reference_tile_thumb),
					"aria-hidden": "true"
				}, [i(_(T), { size: 18 })], 2),
				o("span", { class: l(_(z).reference_tile_name) }, d(e.display_name), 3),
				o("span", { class: l(_(z).reference_tile_actions) }, [
					i(I, {
						icon: _(C),
						size: "sm",
						label: _(v)("workbench.reference_strip.move_up_action"),
						disabled: n === 0,
						onClick: (e) => P(n)
					}, null, 8, [
						"icon",
						"label",
						"disabled",
						"onClick"
					]),
					i(I, {
						icon: _(S),
						size: "sm",
						label: _(v)("workbench.reference_strip.move_down_action"),
						disabled: n === h.references.length - 1,
						onClick: (e) => F(n)
					}, null, 8, [
						"icon",
						"label",
						"disabled",
						"onClick"
					]),
					i(I, {
						icon: _(f),
						size: "sm",
						label: _(v)("workbench.reference_strip.remove_action"),
						"data-testid": "reference-remove",
						onClick: (e) => g("remove", n)
					}, null, 8, [
						"icon",
						"label",
						"onClick"
					])
				], 2)
			], 2))), 128)), w.value ? x("", !0) : (t(), c("li", {
				key: 0,
				class: l(_(z).reference_tile_add)
			}, [o("button", {
				type: "button",
				class: l(["tc-interactive", _(z).reference_add_button]),
				"data-testid": "reference-add",
				onClick: M
			}, [i(_(A), {
				size: 16,
				"aria-hidden": "true"
			}), b(" " + d(_(v)("workbench.reference_strip.add_action")), 1)], 2)], 2))], 2)),
			i(O, {
				open: y.value,
				title: _(v)("workbench.reference_strip.picker_title"),
				"close-label": _(v)("common.actions.close"),
				"onUpdate:open": a[0] ||= (e) => y.value = e
			}, {
				default: n(() => [i(D, {
					status: k.value,
					"empty-message": j.value,
					"error-message": _(v)("workbench.reference_strip.picker_error")
				}, {
					default: n(() => [o("ul", { class: l(_(z).picker_list) }, [(t(!0), c(m, null, r(E.value, (e) => (t(), c("li", { key: e.id }, [o("button", {
						type: "button",
						class: l(["tc-interactive", _(z).picker_item]),
						"data-testid": "reference-picker-item",
						onClick: (t) => N(e)
					}, d(e.display_name), 11, ie)]))), 128))], 2)]),
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
function se() {
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
//#region src/ui/views/workbench/WorkbenchView.vue
var ce = /* @__PURE__ */ y({
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
	setup(e, { emit: n }) {
		let r = e, f = n, { t: m } = s(), { toasts: h, push: v, dismiss: y } = se(), b = g({
			positive_prompt: "",
			negative_prompt: "",
			image_count: 1,
			references: []
		}), S = p(!1), C = p(null), w = /* @__PURE__ */ new Map(), T = p(null), D = u(() => r.state.workbench.profiles.find((e) => e.id === r.state.workbench.active_profile_id) ?? null), O = u(() => {
			let e = {};
			return r.state.workbench.active_profile_id || (e.profile = m("workbench.submit.validation.profile_required")), b.positive_prompt.trim() === "" && (e.prompt = m("workbench.submit.validation.prompt_required")), (b.image_count < 1 || b.image_count > 4) && (e.image_count = m("workbench.submit.validation.image_count_range")), D.value?.provider_id === "comfyui" && (e.provider = m("workbench.submit.validation.provider_unsupported")), e;
		}), k = u(() => Object.keys(O.value).length > 0), A = u(() => r.state.workbench.jobs.find((e) => e.job_id === C.value) ?? null), j = u(() => A.value ? w.get(A.value.request_id) ?? null : null);
		async function M() {
			S.value = !0;
			let e = r.state.workbench.active_profile_id, t = D.value;
			if (k.value || !e || !t) return;
			let n = crypto.randomUUID(), i = await q({
				provider_id: t.provider_id,
				positive_prompt: b.positive_prompt,
				negative_prompt: b.negative_prompt,
				image_count: b.image_count,
				references: b.references
			}, n);
			T.value = i, f("submit", {
				profile_id: e,
				request: i
			});
		}
		a(() => r.state.workbench.submit_command, (e) => {
			e.status === "success" && T.value && (w.set(e.result.request_id, T.value), C.value = e.result.job_id, S.value = !1);
		}), a(() => r.state.inspector.selected_record, (e) => {
			if (e?.kind !== "gallery_record" || e.intent !== "modify_prompt" && e.intent !== "regenerate") return;
			let t = e.prefill;
			t?.positive_prompt && (b.positive_prompt = t.positive_prompt), t?.negative_prompt && (b.negative_prompt = t.negative_prompt), t?.positive_prompt && v({
				title: m("workbench.prefilled_from_gallery_notice"),
				variant: "info"
			}), f("consume-inspector-selection");
		}, { immediate: !0 });
		function N(e) {
			let t = r.state.assets.records.reference.find((t) => t.id === e);
			!t || b.references.length >= 4 || (b.references = [...b.references, {
				asset_id: e,
				display_name: t.display_name
			}]);
		}
		function P(e) {
			b.references = b.references.filter((t, n) => n !== e);
		}
		function I(e, t) {
			let n = [...b.references], [r] = n.splice(e, 1);
			r && n.splice(t, 0, r), b.references = n;
		}
		function L() {
			v({
				title: m("common.actions.copied"),
				variant: "success"
			});
		}
		function R() {
			A.value && f("retry-job", A.value.job_id);
		}
		return (e, n) => (t(), c("div", {
			class: l(_(z).workbench_view),
			"data-testid": "workbench-view"
		}, [
			o("div", { class: l(_(z).main_column) }, [
				i(re, {
					profiles: r.state.workbench.profiles,
					"active-profile-id": r.state.workbench.active_profile_id,
					loading: r.state.loading.has("profiles"),
					"has-error": r.state.failures.has("profiles"),
					onSelect: n[0] ||= (e) => f("select-profile", e),
					onOpenSettings: n[1] ||= (e) => f("open-settings")
				}, null, 8, [
					"profiles",
					"active-profile-id",
					"loading",
					"has-error"
				]),
				i(ne, {
					"positive-prompt": b.positive_prompt,
					"onUpdate:positivePrompt": n[2] ||= (e) => b.positive_prompt = e,
					"negative-prompt": b.negative_prompt,
					"onUpdate:negativePrompt": n[3] ||= (e) => b.negative_prompt = e,
					"image-count": b.image_count,
					"onUpdate:imageCount": n[4] ||= (e) => b.image_count = e,
					"positive-error": S.value && O.value.prompt ? O.value.prompt : null,
					"image-count-error": S.value && O.value.image_count ? O.value.image_count : null
				}, null, 8, [
					"positive-prompt",
					"negative-prompt",
					"image-count",
					"positive-error",
					"image-count-error"
				]),
				i(oe, {
					references: b.references,
					available: r.state.assets.records.reference,
					status: r.state.loading.has("assets") ? "loading" : r.state.failures.has("assets") ? "error" : "ready",
					onAdd: N,
					onRemove: P,
					onReorder: I
				}, null, 8, [
					"references",
					"available",
					"status"
				]),
				o("div", { class: l(_(z).submit_row) }, [
					i(E, {
						label: _(m)("workbench.submit.action"),
						variant: "primary",
						pending: r.state.workbench.submit_command.status === "pending",
						"data-testid": "submit-generation",
						onClick: M
					}, null, 8, ["label", "pending"]),
					S.value && O.value.profile ? (t(), c("p", {
						key: 0,
						role: "alert",
						class: l(_(z).inline_error),
						"data-testid": "validation-profile"
					}, d(O.value.profile), 3)) : x("", !0),
					S.value && O.value.provider ? (t(), c("p", {
						key: 1,
						role: "alert",
						class: l(_(z).inline_error),
						"data-testid": "validation-provider"
					}, d(O.value.provider), 3)) : x("", !0),
					r.state.workbench.submit_command.status === "error" ? (t(), c("p", {
						key: 2,
						role: "alert",
						class: l(_(z).inline_error),
						"data-testid": "submit-error"
					}, d(_(m)("errors.generation_failed", { message: r.state.workbench.submit_command.failure.code })), 3)) : x("", !0)
				], 2),
				i(H, {
					jobs: r.state.workbench.jobs,
					loading: r.state.loading.has("generation"),
					"has-error": r.state.failures.has("generation"),
					"selected-job-id": C.value,
					onCancel: n[5] ||= (e) => f("cancel-job", e),
					onRetry: n[6] ||= (e) => f("retry-job", e),
					onSelect: n[7] ||= (e) => C.value = e
				}, null, 8, [
					"jobs",
					"loading",
					"has-error",
					"selected-job-id"
				])
			], 2),
			o("div", { class: l(_(z).side_column) }, [i($, {
				job: A.value,
				request: j.value,
				"preview-urls": r.previewUrls ?? {},
				onCopyParameters: L,
				onRetry: R
			}, null, 8, [
				"job",
				"request",
				"preview-urls"
			])], 2),
			i(F, {
				toasts: _(h),
				"viewport-label": _(m)("common.notifications.viewport_label"),
				"announce-label": _(m)("common.notifications.announce_label"),
				"close-label": _(m)("common.actions.close"),
				onDismiss: _(y)
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
export { ce as default };

//# sourceMappingURL=WorkbenchView-BS2hnXMv.js.map