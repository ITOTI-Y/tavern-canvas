import { I as e, K as t, R as n, S as r, U as i, _ as a, a as o, b as s, c, ft as l, g as u, ht as d, nt as f, p, q as m, r as h, t as g, ut as _, v, w as y, x as b, y as x } from "./AppIcon-BpY-A4VH.js";
import { a as S, k as C, n as w, o as T, r as E } from "./http_acknowledgment-Cg2RHuTs.js";
import { n as D, t as O } from "./StateSurface-CNBIMTjV.js";
import { n as k, t as A } from "./NumberStepper-BcQ97MQl.js";
import { t as j } from "./FieldGroup-BPi4aGE9.js";
import { t as M } from "./AppSelect-YiC8A59f.js";
import { n as N } from "./_prop_utils-CoKBy72F.js";
import { t as P } from "./AppSwitch-Cp98f87Q.js";
import { t as F } from "./SegmentedControl-DhxUizbt.js";
import { t as I } from "./MigrationStatus-DZ-yxWIP.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/circle-check.js
var L = h("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), R = h("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), z = {
	view: "_view_sikhr_7",
	section: "_section_sikhr_14",
	section_header: "_section_header_sikhr_20",
	section_title: "_section_title_sikhr_28",
	row: "_row_sikhr_34",
	row_label: "_row_label_sikhr_43",
	row_value: "_row_value_sikhr_51",
	profile_row: "_profile_row_sikhr_56",
	profile_identity: "_profile_identity_sikhr_65",
	profile_name: "_profile_name_sikhr_72",
	profile_meta: "_profile_meta_sikhr_79",
	profile_actions: "_profile_actions_sikhr_87",
	badge: "_badge_sikhr_94",
	form_grid: "_form_grid_sikhr_103",
	status_text: "_status_text_sikhr_109",
	risk_banner: "_risk_banner_sikhr_129",
	risk_banner_title: "_risk_banner_title_sikhr_143",
	risk_banner_description: "_risk_banner_description_sikhr_155",
	risk_banner_actions: "_risk_banner_actions_sikhr_162",
	acknowledged_note: "_acknowledged_note_sikhr_168",
	description: "_description_sikhr_176",
	actions_row: "_actions_row_sikhr_183",
	typed_confirm_input: "_typed_confirm_input_sikhr_190"
}, B = /* @__PURE__ */ y({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(t) {
		let n = t, { t: i } = o(), c = {
			color_mode: "system",
			inspector_width: 320,
			inspector_collapsed: !1,
			optional_entry_enabled: !1
		};
		function f(e) {
			n.controller.update_settings({ ui: {
				...n.settings?.ui ?? c,
				...e
			} });
		}
		let p = u(() => [
			{
				value: "system",
				label: i("settings.appearance.theme_system")
			},
			{
				value: "light",
				label: i("settings.appearance.theme_light")
			},
			{
				value: "dark",
				label: i("settings.appearance.theme_dark")
			}
		]), m = u(() => [
			{
				value: "auto",
				label: i("settings.appearance.language_auto")
			},
			{
				value: "zh-CN",
				label: i("settings.appearance.language_zh_cn")
			},
			{
				value: "en",
				label: i("settings.appearance.language_en")
			}
		]);
		function h(e) {
			(e === "system" || e === "light" || e === "dark") && f({ color_mode: e });
		}
		function g(e) {
			(e === "auto" || e === "zh-CN" || e === "en") && n.controller.update_settings({ locale: e });
		}
		function v(e) {
			n.controller.set_inspector_width(e), f({ inspector_width: e });
		}
		return (n, o) => (e(), s("div", {
			class: l(_(z).section),
			"data-testid": "appearance-settings"
		}, [a("div", { class: l(_(z).section_header) }, [a("h2", { class: l(_(z).section_title) }, d(_(i)("settings.sections.appearance")), 3)], 2), a("div", { class: l(_(z).form_grid) }, [
			a("div", { class: l(_(z).row) }, [a("span", { class: l(_(z).row_label) }, d(_(i)("settings.appearance.theme_label")), 3), r(F, {
				"model-value": t.settings?.ui.color_mode ?? "system",
				options: p.value,
				label: _(i)("settings.appearance.theme_label"),
				"onUpdate:modelValue": h
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			a("div", { class: l(_(z).row) }, [a("span", { class: l(_(z).row_label) }, d(_(i)("settings.appearance.language_label")), 3), r(F, {
				"model-value": t.settings?.locale ?? "auto",
				options: m.value,
				label: _(i)("settings.appearance.language_label"),
				"onUpdate:modelValue": g
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			a("div", { class: l(_(z).row) }, [a("span", { class: l(_(z).row_label) }, d(_(i)("settings.appearance.inspector_width_label")), 3), r(A, {
				"model-value": t.settings?.ui.inspector_width ?? 320,
				label: _(i)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": _(i)("common.actions.increase"),
				"decrement-label": _(i)("common.actions.decrease"),
				"onUpdate:modelValue": v
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			r(P, {
				"model-value": t.settings?.ui.optional_entry_enabled ?? !1,
				label: _(i)("settings.appearance.optional_entry_label"),
				disabled: !t.settings,
				"onUpdate:modelValue": o[0] ||= (e) => f({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), V = /* @__PURE__ */ y({
	__name: "AutomationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(t) {
		let n = t, { t: i } = o();
		function c(e) {
			n.controller.update_settings(e);
		}
		let f = u(() => n.settings?.global_concurrency);
		return (n, o) => (e(), s("div", {
			class: l(_(z).section),
			"data-testid": "automation-settings"
		}, [a("div", { class: l(_(z).section_header) }, [a("h2", { class: l(_(z).section_title) }, d(_(i)("settings.sections.automation")), 3)], 2), a("div", { class: l(_(z).form_grid) }, [
			r(P, {
				"model-value": t.settings?.auto_generation_enabled ?? !1,
				label: _(i)("settings.automation.auto_generation_label"),
				disabled: !t.settings,
				"onUpdate:modelValue": o[0] ||= (e) => c({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			r(P, {
				"model-value": t.settings?.fallback_generation_enabled ?? !1,
				label: _(i)("settings.automation.fallback_generation_label"),
				disabled: !t.settings,
				"onUpdate:modelValue": o[1] ||= (e) => c({ fallback_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			a("div", { class: l(_(z).row) }, [a("span", { class: l(_(z).row_label) }, d(_(i)("settings.automation.global_concurrency_label")), 3), r(A, {
				"model-value": f.value,
				label: _(i)("settings.automation.global_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": _(i)("common.actions.increase"),
				"decrement-label": _(i)("common.actions.decrease"),
				disabled: !t.settings,
				"onUpdate:modelValue": o[2] ||= (e) => c({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			a("div", { class: l(_(z).row) }, [a("span", { class: l(_(z).row_label) }, d(_(i)("settings.automation.provider_concurrency_label")), 3), r(A, {
				"model-value": 1,
				label: _(i)("settings.automation.provider_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": _(i)("common.actions.increase"),
				"decrement-label": _(i)("common.actions.decrease"),
				disabled: "",
				"data-testid": "provider-concurrency-stepper"
			}, null, 8, [
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			a("p", { class: l(_(z).description) }, d(_(i)("errors.capability_blocked", { capability: _(i)("settings.automation.provider_concurrency_label") })), 3)
		], 2)], 2));
	}
}), H = ["aria-label"], U = [
	"id",
	"aria-describedby",
	"placeholder"
], W = /* @__PURE__ */ y({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		migration: {},
		migrationRetryCommand: {},
		controller: {}
	},
	setup(n) {
		let i = n, { t: p } = o(), h = u(() => p("settings.data.manual_cleanup.confirm_phrase")), g = f(!1), y = [{
			value: "bundled",
			label: p("settings.data.vocabulary_channel_bundled")
		}, {
			value: "remote",
			label: p("settings.data.vocabulary_channel_https")
		}];
		async function b(e) {
			if (!(e !== "bundled" && e !== "remote" || g.value)) {
				g.value = !0;
				try {
					await i.controller.set_vocabulary_update_channel(e);
				} finally {
					g.value = !1;
				}
			}
		}
		let S = f(!1), C = f(!1), w = f(null);
		async function T() {
			if (!S.value) {
				S.value = !0, w.value = null;
				try {
					let e = await i.controller.export_settings_archive(), t = URL.createObjectURL(e), n = document.createElement("a");
					n.href = t, n.download = "tavern-canvas-archive.json", n.click(), URL.revokeObjectURL(t), C.value = !0;
				} catch {
					w.value = p("errors.unexpected");
				} finally {
					S.value = !1;
				}
			}
		}
		let E = f(!1), O = f(null), A = f(null);
		function M() {
			A.value?.click();
		}
		async function N(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !(!n || E.value)) {
				E.value = !0, O.value = null;
				try {
					await i.controller.import_settings_archive(n);
				} catch {
					O.value = p("errors.unexpected");
				} finally {
					E.value = !1;
				}
			}
		}
		function P() {
			i.controller.retry_migration();
		}
		let L = f(!1);
		function R() {
			L.value = !L.value;
		}
		let B = u(() => Object.values(i.migration?.counts ?? {}).reduce((e, t) => e + t, 0)), V = u(() => p("settings.data.manual_cleanup.record_summary", B.value, { named: {
			count: B.value,
			bytes: p("settings.data.manual_cleanup.bytes_unavailable")
		} })), W = u(() => i.migration?.state === "completed" || C.value), G = f(!1), K = f(""), q = f(!1), J = f(null);
		function ee() {
			K.value = "", J.value = null, G.value = !0;
		}
		function Y() {
			G.value = !1, K.value = "";
		}
		async function X() {
			if (!(K.value !== h.value || q.value)) {
				q.value = !0, J.value = null;
				try {
					await i.controller.confirm_legacy_cleanup(K.value), G.value = !1;
				} catch {
					J.value = p("errors.unexpected");
				} finally {
					q.value = !1;
				}
			}
		}
		return (i, o) => (e(), s("div", {
			class: l(_(z).section),
			"data-testid": "data-settings"
		}, [
			a("div", { class: l(_(z).section_header) }, [a("h2", { class: l(_(z).section_title) }, d(_(p)("settings.sections.data")), 3)], 2),
			a("div", { class: l(_(z).form_grid) }, [
				a("div", { class: l(_(z).row) }, [a("span", { class: l(_(z).row_label) }, d(_(p)("settings.data.vocabulary_channel_label")), 3), r(F, {
					"model-value": n.vocabularyUpdateChannel ?? "bundled",
					options: y,
					label: _(p)("settings.data.vocabulary_channel_label"),
					disabled: g.value,
					"onUpdate:modelValue": b
				}, null, 8, [
					"model-value",
					"label",
					"disabled"
				])], 2),
				a("div", { class: l(_(z).actions_row) }, [
					r(D, {
						label: _(p)("settings.data.archive_export_action"),
						pending: S.value,
						onClick: T
					}, null, 8, ["label", "pending"]),
					r(D, {
						label: _(p)("settings.data.archive_import_action"),
						variant: "secondary",
						pending: E.value,
						onClick: M
					}, null, 8, ["label", "pending"]),
					a("input", {
						ref_key: "file_input",
						ref: A,
						type: "file",
						accept: "application/json",
						class: "tc-visually-hidden",
						"aria-label": _(p)("settings.data.archive_import_action"),
						"data-testid": "archive-import-input",
						onChange: N
					}, null, 40, H)
				], 2),
				a("p", { class: l(_(z).description) }, d(_(p)("settings.data.archive_import_description")), 3),
				w.value ? (e(), s("p", {
					key: 0,
					class: l([_(z).status_text, _(z).description]),
					"data-tone": "error"
				}, d(w.value), 3)) : x("", !0),
				O.value ? (e(), s("p", {
					key: 1,
					class: l([_(z).status_text, _(z).description]),
					"data-tone": "error"
				}, d(O.value), 3)) : x("", !0),
				a("div", { class: l(_(z).actions_row) }, [r(D, {
					label: _(p)("settings.data.migration_retry_action"),
					pending: n.migrationRetryCommand.status === "pending",
					onClick: P
				}, null, 8, ["label", "pending"]), r(D, {
					label: _(p)("settings.data.migration_report_action"),
					variant: "secondary",
					onClick: R
				}, null, 8, ["label"])], 2),
				L.value ? (e(), v(I, {
					key: 2,
					snapshot: n.migration
				}, null, 8, ["snapshot"])) : x("", !0),
				a("div", {
					class: l(_(z).section),
					"data-testid": "manual-cleanup"
				}, [
					a("div", { class: l(_(z).section_header) }, [a("h3", { class: l(_(z).section_title) }, d(_(p)("settings.data.manual_cleanup.title")), 3)], 2),
					a("p", { class: l(_(z).description) }, d(_(p)("settings.data.manual_cleanup.description")), 3),
					a("div", { class: l(_(z).row) }, [a("span", { class: l(_(z).row_label) }, d(_(p)("diagnostics.migration_status.counts_label")), 3), a("span", { class: l(["tc-tabular-nums", _(z).row_value]) }, d(V.value), 3)], 2),
					W.value ? x("", !0) : (e(), s("p", {
						key: 0,
						class: l(_(z).description),
						"data-testid": "cleanup-locked"
					}, d(_(p)("settings.data.manual_cleanup.unlock_hint")), 3)),
					a("div", { class: l(_(z).actions_row) }, [r(D, {
						label: _(p)("settings.data.manual_cleanup.confirm_action"),
						variant: "destructive",
						disabled: !W.value,
						"data-testid": "manual-cleanup-action",
						onClick: ee
					}, null, 8, ["label", "disabled"])], 2)
				], 2)
			], 2),
			r(k, {
				open: G.value,
				title: _(p)("settings.data.manual_cleanup.title"),
				description: _(p)("confirmations.destructive.irreversible_note"),
				"close-label": _(p)("common.actions.close"),
				"onUpdate:open": o[1] ||= (e) => !e && Y()
			}, {
				default: t(() => [r(j, {
					label: _(p)("confirmations.typed_confirmation.label", { phrase: h.value }),
					error: K.value.length > 0 && K.value !== h.value ? _(p)("confirmations.typed_confirmation.mismatch", { phrase: h.value }) : J.value
				}, {
					default: t(({ fieldId: e, describedBy: t }) => [m(a("input", {
						id: e,
						"onUpdate:modelValue": o[0] ||= (e) => K.value = e,
						type: "text",
						"aria-describedby": t,
						class: l(_(z).typed_confirm_input),
						placeholder: _(p)("confirmations.typed_confirmation.placeholder"),
						"data-testid": "cleanup-confirm-input"
					}, null, 10, U), [[c, K.value]])]),
					_: 1
				}, 8, ["label", "error"]), a("div", { class: l(_(z).actions_row) }, [r(D, {
					label: _(p)("settings.data.manual_cleanup.confirm_action"),
					variant: "destructive",
					pending: q.value,
					disabled: K.value !== h.value,
					onClick: X
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]), r(D, {
					label: _(p)("confirmations.destructive.default_cancel_action"),
					variant: "secondary",
					onClick: Y
				}, null, 8, ["label"])], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			])
		], 2));
	}
}), G = ["id", "aria-describedby"], K = ["data-severity"], q = ["id"], J = /* @__PURE__ */ y({
	__name: "GatewaySettings",
	props: {
		settings: {},
		connectionTestCommand: {},
		controller: {}
	},
	setup(n) {
		let p = n, { t: h } = o(), v = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, y = f(p.settings?.gateway.endpoint ?? ""), C = f(null), O = f(!1), k = f(!1);
		i(() => p.settings?.gateway.endpoint ?? "", (e) => {
			y.value = e;
		});
		let A = u(() => {
			let e = y.value.trim();
			if (e.length === 0) return null;
			try {
				if (!T(e)) return null;
				let t = S(e), n = w(t), r = E(p.settings?.gateway.http_acknowledgments ?? {}, t);
				return {
					origin: t,
					severity: n === "public_or_unknown" ? "error" : "warning",
					acknowledged: r
				};
			} catch {
				return null;
			}
		});
		async function M() {
			if (O.value) return;
			let e = y.value.trim();
			if (C.value = null, e.length === 0) {
				O.value = !0;
				try {
					await p.controller.update_settings({ gateway: {
						...p.settings?.gateway ?? v,
						endpoint: null
					} });
				} finally {
					O.value = !1;
				}
				return;
			}
			let t;
			try {
				t = S(e);
			} catch {
				C.value = h("errors.validation_required");
				return;
			}
			O.value = !0;
			try {
				await p.controller.update_settings({ gateway: {
					...p.settings?.gateway ?? v,
					endpoint: t
				} });
			} finally {
				O.value = !1;
			}
		}
		async function N() {
			let e = A.value;
			if (!(!e || k.value)) {
				k.value = !0;
				try {
					await p.controller.acknowledge_http_origin(e.origin);
				} finally {
					k.value = !1;
				}
			}
		}
		function P() {
			p.controller.test_diagnostics_connection();
		}
		let F = u(() => p.connectionTestCommand.status === "pending");
		return (i, o) => (e(), s("div", {
			class: l(_(z).section),
			"data-testid": "gateway-settings"
		}, [a("div", { class: l(_(z).section_header) }, [a("h2", { class: l(_(z).section_title) }, d(_(h)("settings.sections.gateway")), 3)], 2), a("div", { class: l(_(z).form_grid) }, [
			r(j, {
				label: _(h)("settings.gateway.endpoint_label"),
				hint: _(h)("settings.gateway.endpoint_hint"),
				error: C.value
			}, {
				default: t(({ fieldId: e, describedBy: t }) => [m(a("input", {
					id: e,
					"onUpdate:modelValue": o[0] ||= (e) => y.value = e,
					type: "text",
					"aria-describedby": t,
					class: l(_(z).typed_confirm_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: M
				}, null, 42, G), [[c, y.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			A.value && !A.value.acknowledged ? (e(), s("div", {
				key: 0,
				class: l(_(z).risk_banner),
				"data-severity": A.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				a("div", { class: l(_(z).risk_banner_title) }, [r(g, {
					icon: _(R),
					size: 16
				}, null, 8, ["icon"]), b(" " + d(_(h)("settings.http_risk.warning_title")), 1)], 2),
				a("p", { class: l(_(z).risk_banner_description) }, d(A.value.severity === "error" ? _(h)("settings.http_risk.error_description_public", { origin: A.value.origin }) : _(h)("settings.http_risk.warning_description_local", { origin: A.value.origin })), 3),
				a("p", { class: l(_(z).risk_banner_description) }, d(_(h)("settings.http_risk.disclosure")), 3),
				a("div", { class: l(_(z).risk_banner_actions) }, [r(D, {
					label: _(h)("settings.http_risk.continue_action"),
					pending: k.value,
					onClick: N
				}, null, 8, ["label", "pending"])], 2)
			], 10, K)) : A.value && A.value.acknowledged ? (e(), s("div", {
				key: 1,
				class: l(_(z).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [r(g, {
				icon: _(L),
				size: 14
			}, null, 8, ["icon"]), b(" " + d(_(h)("settings.http_risk.acknowledged_label")), 1)], 2)) : x("", !0),
			a("div", { class: l(_(z).row) }, [a("span", { class: l(_(z).row_label) }, d(_(h)("settings.gateway.protocol_label")), 3), r(D, {
				label: _(h)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: F.value,
				onClick: P
			}, null, 8, ["label", "pending"])], 2),
			r(j, { label: _(h)("settings.gateway.token_secret_label") }, {
				default: t(({ fieldId: e }) => [a("span", {
					id: e,
					class: l(_(z).row_value),
					"data-testid": "gateway-token-reference"
				}, d(n.settings?.gateway.token_secret_id ?? _(h)("settings.gateway.token_not_set")), 11, q)]),
				_: 1
			}, 8, ["label"]),
			a("p", { class: l(_(z).description) }, d(_(h)("errors.capability_blocked", { capability: _(h)("settings.gateway.auto_generate_action") })), 3)
		], 2)], 2));
	}
}), ee = [
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
];
function Y(e, t) {
	switch (t) {
		case "openai_compatible": return e("settings.llm_connections.provider_kinds.openai_compatible");
		case "anthropic": return e("settings.llm_connections.provider_kinds.anthropic");
		case "google_generative": return e("settings.llm_connections.provider_kinds.google_generative");
		case "ollama": return e("settings.llm_connections.provider_kinds.ollama");
	}
}
function X(e) {
	return C[e].completion_routes;
}
//#endregion
//#region src/ui/views/settings/LlmConnections.vue?vue&type=script&setup=true&lang.ts
var te = ["id", "aria-describedby"], ne = ["id", "aria-describedby"], re = ["id", "aria-describedby"], Z = /* @__PURE__ */ y({
	__name: "LlmConnections",
	props: {
		connections: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(i) {
		let h = i, { t: g } = o(), y = f(!1), b = f(null), S = f(!1), C = f(null), w = f(null), T = f(null), E = f(null), F = f(!1), I = f(null), L = f(""), R = f(!1), B = f(null), V = f(/* @__PURE__ */ new Map()), H = u(() => ee.map((e) => ({
			value: e,
			label: Y(g, e)
		}))), U = u(() => X(b.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), W = u({
			get: () => b.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				b.value && (b.value.provider_kind = e, b.value.route = X(b.value.provider_kind)[0] ?? "");
			}
		}), G = u({
			get: () => b.value?.route ?? "",
			set: (e) => {
				b.value && (b.value.route = e);
			}
		});
		function K() {
			b.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_kind: "openai_compatible",
				route: X("openai_compatible")[0] ?? "",
				display_name: "",
				model_id: "",
				temperature: .7,
				max_output_tokens: 2048,
				is_default: h.connections.length === 0
			}, J(), y.value = !0;
		}
		function q(e) {
			b.value = {
				id: e.id,
				is_new: !1,
				provider_kind: e.provider_kind,
				route: e.route,
				display_name: e.display_name,
				model_id: e.model_id,
				temperature: e.temperature,
				max_output_tokens: e.max_output_tokens,
				is_default: e.is_default
			}, J(), y.value = !0;
		}
		function J() {
			C.value = null, w.value = null, T.value = null;
		}
		function Z() {
			y.value = !1, b.value = null, J();
		}
		async function ie() {
			let e = b.value;
			if (!e || S.value) return;
			J();
			let t = e.display_name.trim(), n = e.model_id.trim();
			if (t.length === 0 && (C.value = g("errors.validation_required")), n.length === 0 && (w.value = g("errors.validation_required")), !(C.value || w.value)) {
				S.value = !0;
				try {
					await h.controller.save_llm_connection({
						id: e.id,
						display_name: t,
						provider_kind: e.provider_kind,
						route: e.route,
						model_id: n,
						temperature: e.temperature,
						max_output_tokens: e.max_output_tokens,
						is_default: e.is_default
					}), Z();
				} catch {
					T.value = g("errors.unexpected");
				} finally {
					S.value = !1;
				}
			}
		}
		function Q(e) {
			E.value = e;
		}
		async function ae() {
			let e = E.value;
			if (!(!e || F.value)) {
				F.value = !0;
				try {
					await h.controller.remove_llm_connection(e.id), E.value = null;
				} finally {
					F.value = !1;
				}
			}
		}
		function oe(e) {
			I.value = e, L.value = "", B.value = null;
		}
		function $() {
			I.value = null, L.value = "", B.value = null;
		}
		async function se() {
			let e = I.value;
			if (!(!e || R.value)) {
				if (L.value.trim().length === 0) {
					B.value = g("errors.validation_required");
					return;
				}
				R.value = !0, B.value = null;
				try {
					await h.controller.set_llm_connection_credential(e.id, L.value), $();
				} catch {
					B.value = g("errors.unexpected");
				} finally {
					R.value = !1, L.value = "";
				}
			}
		}
		async function ce(e) {
			await h.controller.clear_llm_connection_credential(e.id);
		}
		async function le(e) {
			V.value = new Map(V.value).set(e.id, {
				pending: !0,
				label: null
			});
			let t;
			try {
				let n = await h.controller.test_llm_connection(e.id);
				t = n.status === "success" ? `${g("status.success")} · ${g("diagnostics.connection_tests.latency_label", { ms: n.latency_ms })}` : g("errors.connection_test_failed", { code: n.code });
			} catch {
				t = g("errors.unexpected");
			}
			V.value = new Map(V.value).set(e.id, {
				pending: !1,
				label: t
			});
		}
		return (o, u) => (e(), s("div", {
			class: l(_(z).section),
			"data-testid": "llm-connections"
		}, [
			a("div", { class: l(_(z).section_header) }, [a("h2", { class: l(_(z).section_title) }, d(_(g)("settings.sections.llm_connections")), 3), r(D, {
				label: _(g)("settings.llm_connections.add_action"),
				onClick: K
			}, null, 8, ["label"])], 2),
			a("p", { class: l(_(z).description) }, d(_(g)("settings.llm_connections.section_description")), 3),
			r(O, {
				status: i.loading ? "loading" : i.connections.length === 0 ? "empty" : "ready",
				"empty-message": _(g)("settings.llm_connections.empty_description")
			}, {
				action: t(() => [r(D, {
					label: _(g)("settings.llm_connections.add_action"),
					onClick: K
				}, null, 8, ["label"])]),
				default: t(() => [a("div", null, [(e(!0), s(p, null, n(i.connections, (t) => (e(), s("div", {
					key: t.id,
					class: l(_(z).profile_row),
					"data-testid": "llm-connection-row"
				}, [a("div", { class: l(_(z).profile_identity) }, [
					a("span", { class: l(_(z).profile_name) }, d(t.display_name), 3),
					a("span", { class: l(_(z).profile_meta) }, d(_(Y)(_(g), t.provider_kind)) + " · " + d(t.model_id), 3),
					a("span", {
						class: l(_(z).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, d(t.credential_reference ? _(g)("settings.llm_connections.credential_set") : _(g)("settings.llm_connections.credential_unset")), 3),
					V.value.get(t.id)?.label ? (e(), s("span", {
						key: 0,
						class: l(_(z).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, d(V.value.get(t.id)?.label), 3)) : x("", !0)
				], 2), a("div", { class: l(_(z).profile_actions) }, [
					t.is_default ? (e(), s("span", {
						key: 0,
						class: l(_(z).badge)
					}, d(_(g)("settings.llm_connections.default_badge")), 3)) : x("", !0),
					r(D, {
						label: _(g)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: V.value.get(t.id)?.pending === !0,
						onClick: (e) => le(t)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					r(D, {
						label: _(g)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (e) => oe(t)
					}, null, 8, ["label", "onClick"]),
					t.credential_reference ? (e(), v(D, {
						key: 1,
						label: _(g)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (e) => ce(t)
					}, null, 8, ["label", "onClick"])) : x("", !0),
					r(D, {
						label: _(g)("common.actions.edit"),
						variant: "secondary",
						onClick: (e) => q(t)
					}, null, 8, ["label", "onClick"]),
					r(D, {
						label: _(g)("common.actions.delete"),
						variant: "destructive",
						onClick: (e) => Q(t)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			r(k, {
				open: y.value,
				title: b.value?.is_new ? _(g)("settings.llm_connections.dialog_add_title") : _(g)("settings.llm_connections.dialog_edit_title"),
				description: _(g)("settings.llm_connections.dialog_description"),
				"close-label": _(g)("common.actions.close"),
				"onUpdate:open": u[7] ||= (e) => !e && Z()
			}, {
				default: t(() => [b.value ? (e(), s("div", {
					key: 0,
					class: l(_(z).form_grid)
				}, [
					r(j, {
						label: _(g)("common.labels.name"),
						error: C.value,
						required: ""
					}, {
						default: t(({ fieldId: e, describedBy: t }) => [m(a("input", {
							id: e,
							"onUpdate:modelValue": u[0] ||= (e) => b.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: l(_(z).typed_confirm_input)
						}, null, 10, te), [[c, b.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					r(j, {
						label: _(g)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: t(({ fieldId: e }) => [r(M, {
							id: e,
							modelValue: W.value,
							"onUpdate:modelValue": u[1] ||= (e) => W.value = e,
							options: H.value,
							placeholder: _(g)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					r(j, {
						label: _(g)("settings.llm_connections.route_label"),
						hint: _(g)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: t(({ fieldId: e }) => [r(M, {
							id: e,
							modelValue: G.value,
							"onUpdate:modelValue": u[2] ||= (e) => G.value = e,
							options: U.value,
							placeholder: _(g)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					r(j, {
						label: _(g)("settings.llm_connections.model_label"),
						hint: _(g)("settings.llm_connections.model_hint"),
						error: w.value,
						required: ""
					}, {
						default: t(({ fieldId: e, describedBy: t }) => [m(a("input", {
							id: e,
							"onUpdate:modelValue": u[3] ||= (e) => b.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: l(_(z).typed_confirm_input)
						}, null, 10, ne), [[c, b.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					r(j, {
						label: _(g)("settings.llm_connections.temperature_label"),
						hint: _(g)("settings.llm_connections.temperature_hint")
					}, {
						default: t(() => [r(A, {
							modelValue: b.value.temperature,
							"onUpdate:modelValue": u[4] ||= (e) => b.value.temperature = e,
							label: _(g)("settings.llm_connections.temperature_label"),
							"increment-label": _(g)("common.actions.increase"),
							"decrement-label": _(g)("common.actions.decrease"),
							min: 0,
							max: 2,
							step: .1
						}, null, 8, [
							"modelValue",
							"label",
							"increment-label",
							"decrement-label"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					r(j, { label: _(g)("settings.llm_connections.max_output_tokens_label") }, {
						default: t(() => [r(A, {
							modelValue: b.value.max_output_tokens,
							"onUpdate:modelValue": u[5] ||= (e) => b.value.max_output_tokens = e,
							label: _(g)("settings.llm_connections.max_output_tokens_label"),
							"increment-label": _(g)("common.actions.increase"),
							"decrement-label": _(g)("common.actions.decrease"),
							min: 1,
							max: 2e5,
							step: 256
						}, null, 8, [
							"modelValue",
							"label",
							"increment-label",
							"decrement-label"
						])]),
						_: 1
					}, 8, ["label"]),
					r(P, {
						modelValue: b.value.is_default,
						"onUpdate:modelValue": u[6] ||= (e) => b.value.is_default = e,
						label: _(g)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					T.value ? (e(), s("p", {
						key: 0,
						class: l([_(z).status_text, _(z).description]),
						"data-tone": "error"
					}, d(T.value), 3)) : x("", !0),
					a("div", { class: l(_(z).actions_row) }, [r(D, {
						label: _(g)("common.actions.save"),
						pending: S.value,
						onClick: ie
					}, null, 8, ["label", "pending"]), r(D, {
						label: _(g)("common.actions.cancel"),
						variant: "secondary",
						onClick: Z
					}, null, 8, ["label"])], 2)
				], 2)) : x("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			r(k, {
				open: I.value !== null,
				title: _(g)("settings.llm_connections.credential_dialog_title"),
				description: _(g)("settings.llm_connections.credential_dialog_description"),
				"close-label": _(g)("common.actions.close"),
				"onUpdate:open": u[9] ||= (e) => !e && $()
			}, {
				default: t(() => [a("div", { class: l(_(z).form_grid) }, [r(j, {
					label: _(g)("settings.llm_connections.credential_label"),
					hint: _(g)("provider.credentials.not_stored_locally"),
					error: B.value,
					required: ""
				}, {
					default: t(({ fieldId: e, describedBy: t }) => [m(a("input", {
						id: e,
						"onUpdate:modelValue": u[8] ||= (e) => L.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: l(_(z).typed_confirm_input),
						"data-testid": "llm-credential-input"
					}, null, 10, re), [[c, L.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), a("div", { class: l(_(z).actions_row) }, [r(D, {
					label: _(g)("common.actions.save"),
					pending: R.value,
					onClick: se
				}, null, 8, ["label", "pending"]), r(D, {
					label: _(g)("common.actions.cancel"),
					variant: "secondary",
					onClick: $
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			r(N, {
				open: E.value !== null,
				title: _(g)("settings.llm_connections.remove_confirm_title", { name: E.value?.display_name ?? "" }),
				description: _(g)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": _(g)("confirmations.destructive.default_confirm_action"),
				"cancel-label": _(g)("confirmations.destructive.default_cancel_action"),
				pending: F.value,
				"onUpdate:open": u[10] ||= (e) => !e && (E.value = null),
				onConfirm: ae
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 2));
	}
}), ie = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Q(e, t) {
	switch (t) {
		case "sd_webui": return e("settings.provider_profiles.provider_types.sd_webui");
		case "novelai": return e("settings.provider_profiles.provider_types.novelai");
		case "comfyui": return e("settings.provider_profiles.provider_types.comfyui");
		case "openai_image": return e("settings.provider_profiles.provider_types.openai_image");
		case "google_image": return e("settings.provider_profiles.provider_types.google_image");
	}
}
//#endregion
//#region src/ui/views/settings/ProviderProfiles.vue?vue&type=script&setup=true&lang.ts
var ae = ["id", "aria-describedby"], oe = ["id", "aria-describedby"], $ = /* @__PURE__ */ y({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		controller: {}
	},
	setup(i) {
		let h = i, { t: g } = o(), v = f(!1), y = f(null), b = f(!1), S = f(null), C = f(null), w = f(!1), T = f(/* @__PURE__ */ new Map()), E = ie.map((e) => ({
			value: e,
			label: Q(g, e)
		})), A = u({
			get: () => y.value?.provider_id ?? "sd_webui",
			set: (e) => {
				y.value && (y.value.provider_id = e);
			}
		});
		function F() {
			y.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				secret_reference: "",
				is_default: h.profiles.length === 0
			}, S.value = null, v.value = !0;
		}
		function I(e) {
			y.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				secret_reference: "",
				is_default: e.is_default
			}, S.value = null, v.value = !0;
		}
		function L() {
			v.value = !1, y.value = null, S.value = null;
		}
		async function R() {
			let e = y.value;
			if (!(!e || b.value)) {
				b.value = !0, S.value = null;
				try {
					await h.controller.save_provider_profile({
						id: e.id,
						provider_id: e.provider_id,
						display_name: e.display_name,
						is_default: e.is_default,
						updated_at: (/* @__PURE__ */ new Date()).toISOString(),
						secret_reference: e.secret_reference.trim().length > 0 ? e.secret_reference : null
					}), L();
				} catch {
					S.value = g("errors.unexpected");
				} finally {
					b.value = !1;
				}
			}
		}
		function B(e) {
			C.value = e;
		}
		async function V() {
			let e = C.value;
			if (!(!e || w.value)) {
				w.value = !0;
				try {
					await h.controller.remove_provider_profile(e.id), C.value = null;
				} finally {
					w.value = !1;
				}
			}
		}
		async function H(e) {
			T.value.set(e.id, {
				pending: !0,
				label: null
			}), T.value = new Map(T.value);
			try {
				let t = await h.controller.test_provider_profile_connection(e.id), n = t.status === "success" ? `${g("status.success")} · ${g("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : g("errors.connection_test_failed", { code: t.error.code });
				T.value.set(e.id, {
					pending: !1,
					label: n
				});
			} catch {
				T.value.set(e.id, {
					pending: !1,
					label: g("errors.unexpected")
				});
			}
			T.value = new Map(T.value);
		}
		return (o, u) => (e(), s("div", {
			class: l(_(z).section),
			"data-testid": "provider-profiles"
		}, [
			a("div", { class: l(_(z).section_header) }, [a("h2", { class: l(_(z).section_title) }, d(_(g)("settings.sections.provider_profiles")), 3), r(D, {
				label: _(g)("settings.provider_profiles.add_action"),
				onClick: F
			}, null, 8, ["label"])], 2),
			r(O, {
				status: i.profiles.length === 0 ? "empty" : "ready",
				"empty-message": _(g)("settings.provider_profiles.empty_description")
			}, {
				default: t(() => [a("div", null, [(e(!0), s(p, null, n(i.profiles, (t) => (e(), s("div", {
					key: t.id,
					class: l(_(z).profile_row),
					"data-testid": "provider-profile-row"
				}, [a("div", { class: l(_(z).profile_identity) }, [
					a("span", { class: l(_(z).profile_name) }, d(t.display_name), 3),
					a("span", { class: l(_(z).profile_meta) }, d(_(Q)(_(g), t.provider_id)), 3),
					T.value.get(t.id)?.label ? (e(), s("span", {
						key: 0,
						class: l(_(z).profile_meta),
						"data-testid": "profile-test-result"
					}, d(T.value.get(t.id)?.label), 3)) : x("", !0)
				], 2), a("div", { class: l(_(z).profile_actions) }, [
					t.is_default ? (e(), s("span", {
						key: 0,
						class: l(_(z).badge)
					}, d(_(g)("settings.provider_profiles.default_badge")), 3)) : x("", !0),
					r(D, {
						label: _(g)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: T.value.get(t.id)?.pending === !0,
						onClick: (e) => H(t)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					r(D, {
						label: _(g)("common.actions.edit"),
						variant: "secondary",
						onClick: (e) => I(t)
					}, null, 8, ["label", "onClick"]),
					r(D, {
						label: _(g)("common.actions.delete"),
						variant: "destructive",
						onClick: (e) => B(t)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			r(k, {
				open: v.value,
				title: y.value?.is_new ? _(g)("settings.provider_profiles.dialog_add_title") : _(g)("settings.provider_profiles.dialog_edit_title"),
				"close-label": _(g)("common.actions.close"),
				"onUpdate:open": u[4] ||= (e) => !e && L()
			}, {
				default: t(() => [y.value ? (e(), s("div", {
					key: 0,
					class: l(_(z).form_grid)
				}, [
					r(j, {
						label: _(g)("common.labels.name"),
						required: ""
					}, {
						default: t(({ fieldId: e, describedBy: t }) => [m(a("input", {
							id: e,
							"onUpdate:modelValue": u[0] ||= (e) => y.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: l(_(z).typed_confirm_input)
						}, null, 10, ae), [[c, y.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					r(j, {
						label: _(g)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: t(({ fieldId: e }) => [r(M, {
							id: e,
							modelValue: A.value,
							"onUpdate:modelValue": u[1] ||= (e) => A.value = e,
							options: _(E),
							placeholder: _(g)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					r(j, {
						label: _(g)("settings.gateway.token_secret_label"),
						hint: _(g)("provider.credentials.not_stored_locally")
					}, {
						default: t(({ fieldId: e, describedBy: t }) => [m(a("input", {
							id: e,
							"onUpdate:modelValue": u[2] ||= (e) => y.value.secret_reference = e,
							type: "text",
							"aria-describedby": t,
							class: l(_(z).typed_confirm_input)
						}, null, 10, oe), [[c, y.value.secret_reference]])]),
						_: 1
					}, 8, ["label", "hint"]),
					r(P, {
						modelValue: y.value.is_default,
						"onUpdate:modelValue": u[3] ||= (e) => y.value.is_default = e,
						label: _(g)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					S.value ? (e(), s("p", {
						key: 0,
						class: l([_(z).status_text, _(z).description]),
						"data-tone": "error"
					}, d(S.value), 3)) : x("", !0),
					a("div", { class: l(_(z).actions_row) }, [r(D, {
						label: _(g)("common.actions.save"),
						pending: b.value,
						onClick: R
					}, null, 8, ["label", "pending"]), r(D, {
						label: _(g)("common.actions.cancel"),
						variant: "secondary",
						onClick: L
					}, null, 8, ["label"])], 2)
				], 2)) : x("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			r(N, {
				open: C.value !== null,
				title: _(g)("settings.provider_profiles.remove_confirm_title", { name: C.value?.display_name ?? "" }),
				description: _(g)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": _(g)("confirmations.destructive.default_confirm_action"),
				"cancel-label": _(g)("confirmations.destructive.default_cancel_action"),
				pending: w.value,
				"onUpdate:open": u[5] ||= (e) => !e && (C.value = null),
				onConfirm: V
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 2));
	}
}), se = { class: "tc-visually-hidden" }, ce = /* @__PURE__ */ y({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(t) {
		let { t: n } = o();
		return (i, o) => (e(), s("div", {
			class: l(_(z).view),
			"data-testid": "settings-view"
		}, [
			a("h1", se, d(_(n)("nav.settings")), 1),
			r($, {
				profiles: t.state.workbench.profiles,
				controller: t.controller
			}, null, 8, ["profiles", "controller"]),
			r(Z, {
				connections: t.state.llm_connections.connections,
				loading: t.state.loading.has("llm_connections"),
				controller: t.controller
			}, null, 8, [
				"connections",
				"loading",
				"controller"
			]),
			r(J, {
				settings: t.state.settings.settings,
				"connection-test-command": t.state.diagnostics.connection_test_command,
				controller: t.controller
			}, null, 8, [
				"settings",
				"connection-test-command",
				"controller"
			]),
			r(V, {
				settings: t.state.settings.settings,
				controller: t.controller
			}, null, 8, ["settings", "controller"]),
			r(B, {
				settings: t.state.settings.settings,
				controller: t.controller
			}, null, 8, ["settings", "controller"]),
			r(W, {
				"vocabulary-update-channel": t.state.settings.vocabulary_update_channel,
				migration: t.state.diagnostics.migration,
				"migration-retry-command": t.state.settings.migration_retry_command,
				controller: t.controller
			}, null, 8, [
				"vocabulary-update-channel",
				"migration",
				"migration-retry-command",
				"controller"
			])
		], 2));
	}
});
//#endregion
export { ce as default };

//# sourceMappingURL=SettingsView-CeAegH4D.js.map