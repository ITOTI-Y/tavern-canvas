import { $ as e, B as t, F as n, N as r, U as i, W as a, _ as o, a as s, ft as c, g as l, h as u, lt as d, m as f, n as p, p as m, st as h, u as g, v as _, x as v, y } from "./vue-i18n-CmRk7RjK.js";
import { w as b } from "./src-BPUc1ma2.js";
import { t as x } from "./createLucideIcon-DAbI7E00.js";
import { n as S, t as C } from "./StateSurface-BqMfI2cI.js";
import { n as w, t as T } from "./NumberStepper-ClF9OQR0.js";
import { t as E } from "./FieldGroup-FjrngN50.js";
import { t as D } from "./AppIcon-B4b88cvE.js";
import { a as O, n as k, o as A, r as j } from "./http_acknowledgment-mIUdfc_8.js";
import { t as M } from "./AppSelect-BRIguiRc.js";
import { n as N } from "./_prop_utils-DuwFuJLL.js";
import { t as P } from "./AppSwitch-BcrYzJli.js";
import { t as F } from "./SegmentedControl-D4EyVIZf.js";
import { t as I } from "./MigrationStatus-gqEZIzMz.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/circle-check.js
var L = x("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), R = x("triangle-alert", [
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
}, B = /* @__PURE__ */ v({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = p(), i = {
			color_mode: "system",
			inspector_width: 320,
			inspector_collapsed: !1,
			optional_entry_enabled: !1
		};
		function a(e) {
			t.controller.update_settings({ ui: {
				...t.settings?.ui ?? i,
				...e
			} });
		}
		let s = m(() => [
			{
				value: "system",
				label: n("settings.appearance.theme_system")
			},
			{
				value: "light",
				label: n("settings.appearance.theme_light")
			},
			{
				value: "dark",
				label: n("settings.appearance.theme_dark")
			}
		]), l = m(() => [
			{
				value: "auto",
				label: n("settings.appearance.language_auto")
			},
			{
				value: "zh-CN",
				label: n("settings.appearance.language_zh_cn")
			},
			{
				value: "en",
				label: n("settings.appearance.language_en")
			}
		]);
		function u(e) {
			(e === "system" || e === "light" || e === "dark") && a({ color_mode: e });
		}
		function g(e) {
			(e === "auto" || e === "zh-CN" || e === "en") && t.controller.update_settings({ locale: e });
		}
		function _(e) {
			t.controller.set_inspector_width(e), a({ inspector_width: e });
		}
		return (t, i) => (r(), o("div", {
			class: d(h(z).section),
			"data-testid": "appearance-settings"
		}, [f("div", { class: d(h(z).section_header) }, [f("h2", { class: d(h(z).section_title) }, c(h(n)("settings.sections.appearance")), 3)], 2), f("div", { class: d(h(z).form_grid) }, [
			f("div", { class: d(h(z).row) }, [f("span", { class: d(h(z).row_label) }, c(h(n)("settings.appearance.theme_label")), 3), y(F, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: s.value,
				label: h(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": u
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			f("div", { class: d(h(z).row) }, [f("span", { class: d(h(z).row_label) }, c(h(n)("settings.appearance.language_label")), 3), y(F, {
				"model-value": e.settings?.locale ?? "auto",
				options: l.value,
				label: h(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": g
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			f("div", { class: d(h(z).row) }, [f("span", { class: d(h(z).row_label) }, c(h(n)("settings.appearance.inspector_width_label")), 3), y(T, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: h(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": h(n)("common.actions.increase"),
				"decrement-label": h(n)("common.actions.decrease"),
				"onUpdate:modelValue": _
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			y(P, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: h(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": i[0] ||= (e) => a({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), V = /* @__PURE__ */ v({
	__name: "AutomationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = p();
		function i(e) {
			t.controller.update_settings(e);
		}
		let a = m(() => t.settings?.global_concurrency);
		return (t, s) => (r(), o("div", {
			class: d(h(z).section),
			"data-testid": "automation-settings"
		}, [f("div", { class: d(h(z).section_header) }, [f("h2", { class: d(h(z).section_title) }, c(h(n)("settings.sections.automation")), 3)], 2), f("div", { class: d(h(z).form_grid) }, [
			y(P, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: h(n)("settings.automation.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": s[0] ||= (e) => i({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			y(P, {
				"model-value": e.settings?.fallback_generation_enabled ?? !1,
				label: h(n)("settings.automation.fallback_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": s[1] ||= (e) => i({ fallback_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			f("div", { class: d(h(z).row) }, [f("span", { class: d(h(z).row_label) }, c(h(n)("settings.automation.global_concurrency_label")), 3), y(T, {
				"model-value": a.value,
				label: h(n)("settings.automation.global_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": h(n)("common.actions.increase"),
				"decrement-label": h(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": s[2] ||= (e) => i({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			f("div", { class: d(h(z).row) }, [f("span", { class: d(h(z).row_label) }, c(h(n)("settings.automation.provider_concurrency_label")), 3), y(T, {
				"model-value": 1,
				label: h(n)("settings.automation.provider_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": h(n)("common.actions.increase"),
				"decrement-label": h(n)("common.actions.decrease"),
				disabled: "",
				"data-testid": "provider-concurrency-stepper"
			}, null, 8, [
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			f("p", { class: d(h(z).description) }, c(h(n)("errors.capability_blocked", { capability: h(n)("settings.automation.provider_concurrency_label") })), 3)
		], 2)], 2));
	}
}), H = ["aria-label"], U = [
	"id",
	"aria-describedby",
	"placeholder"
], W = /* @__PURE__ */ v({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		migration: {},
		migrationRetryCommand: {},
		controller: {}
	},
	setup(t) {
		let n = t, { t: g } = p(), _ = m(() => g("settings.data.manual_cleanup.confirm_phrase")), v = e(!1), b = [{
			value: "bundled",
			label: g("settings.data.vocabulary_channel_bundled")
		}, {
			value: "remote",
			label: g("settings.data.vocabulary_channel_https")
		}];
		async function x(e) {
			if (!(e !== "bundled" && e !== "remote" || v.value)) {
				v.value = !0;
				try {
					await n.controller.set_vocabulary_update_channel(e);
				} finally {
					v.value = !1;
				}
			}
		}
		let C = e(!1), T = e(!1), D = e(null);
		async function O() {
			if (!C.value) {
				C.value = !0, D.value = null;
				try {
					let e = await n.controller.export_settings_archive(), t = URL.createObjectURL(e), r = document.createElement("a");
					r.href = t, r.download = "tavern-canvas-archive.json", r.click(), URL.revokeObjectURL(t), T.value = !0;
				} catch {
					D.value = g("errors.unexpected");
				} finally {
					C.value = !1;
				}
			}
		}
		let k = e(!1), A = e(null), j = e(null);
		function M() {
			j.value?.click();
		}
		async function N(e) {
			let t = e.target, r = t.files?.[0];
			if (t.value = "", !(!r || k.value)) {
				k.value = !0, A.value = null;
				try {
					await n.controller.import_settings_archive(r);
				} catch {
					A.value = g("errors.unexpected");
				} finally {
					k.value = !1;
				}
			}
		}
		function P() {
			n.controller.retry_migration();
		}
		let L = e(!1);
		function R() {
			L.value = !L.value;
		}
		let B = m(() => Object.values(n.migration?.counts ?? {}).reduce((e, t) => e + t, 0)), V = m(() => g("settings.data.manual_cleanup.record_summary", B.value, { named: {
			count: B.value,
			bytes: g("settings.data.manual_cleanup.bytes_unavailable")
		} })), W = m(() => n.migration?.state === "completed" || T.value), G = e(!1), K = e(""), q = e(!1), J = e(null);
		function ee() {
			K.value = "", J.value = null, G.value = !0;
		}
		function Y() {
			G.value = !1, K.value = "";
		}
		async function X() {
			if (!(K.value !== _.value || q.value)) {
				q.value = !0, J.value = null;
				try {
					await n.controller.confirm_legacy_cleanup(K.value), G.value = !1;
				} catch {
					J.value = g("errors.unexpected");
				} finally {
					q.value = !1;
				}
			}
		}
		return (e, n) => (r(), o("div", {
			class: d(h(z).section),
			"data-testid": "data-settings"
		}, [
			f("div", { class: d(h(z).section_header) }, [f("h2", { class: d(h(z).section_title) }, c(h(g)("settings.sections.data")), 3)], 2),
			f("div", { class: d(h(z).form_grid) }, [
				f("div", { class: d(h(z).row) }, [f("span", { class: d(h(z).row_label) }, c(h(g)("settings.data.vocabulary_channel_label")), 3), y(F, {
					"model-value": t.vocabularyUpdateChannel ?? "bundled",
					options: b,
					label: h(g)("settings.data.vocabulary_channel_label"),
					disabled: v.value,
					"onUpdate:modelValue": x
				}, null, 8, [
					"model-value",
					"label",
					"disabled"
				])], 2),
				f("div", { class: d(h(z).actions_row) }, [
					y(S, {
						label: h(g)("settings.data.archive_export_action"),
						pending: C.value,
						onClick: O
					}, null, 8, ["label", "pending"]),
					y(S, {
						label: h(g)("settings.data.archive_import_action"),
						variant: "secondary",
						pending: k.value,
						onClick: M
					}, null, 8, ["label", "pending"]),
					f("input", {
						ref_key: "file_input",
						ref: j,
						type: "file",
						accept: "application/json",
						class: "tc-visually-hidden",
						"aria-label": h(g)("settings.data.archive_import_action"),
						"data-testid": "archive-import-input",
						onChange: N
					}, null, 40, H)
				], 2),
				f("p", { class: d(h(z).description) }, c(h(g)("settings.data.archive_import_description")), 3),
				D.value ? (r(), o("p", {
					key: 0,
					class: d([h(z).status_text, h(z).description]),
					"data-tone": "error"
				}, c(D.value), 3)) : l("", !0),
				A.value ? (r(), o("p", {
					key: 1,
					class: d([h(z).status_text, h(z).description]),
					"data-tone": "error"
				}, c(A.value), 3)) : l("", !0),
				f("div", { class: d(h(z).actions_row) }, [y(S, {
					label: h(g)("settings.data.migration_retry_action"),
					pending: t.migrationRetryCommand.status === "pending",
					onClick: P
				}, null, 8, ["label", "pending"]), y(S, {
					label: h(g)("settings.data.migration_report_action"),
					variant: "secondary",
					onClick: R
				}, null, 8, ["label"])], 2),
				L.value ? (r(), u(I, {
					key: 2,
					snapshot: t.migration
				}, null, 8, ["snapshot"])) : l("", !0),
				f("div", {
					class: d(h(z).section),
					"data-testid": "manual-cleanup"
				}, [
					f("div", { class: d(h(z).section_header) }, [f("h3", { class: d(h(z).section_title) }, c(h(g)("settings.data.manual_cleanup.title")), 3)], 2),
					f("p", { class: d(h(z).description) }, c(h(g)("settings.data.manual_cleanup.description")), 3),
					f("div", { class: d(h(z).row) }, [f("span", { class: d(h(z).row_label) }, c(h(g)("diagnostics.migration_status.counts_label")), 3), f("span", { class: d(["tc-tabular-nums", h(z).row_value]) }, c(V.value), 3)], 2),
					W.value ? l("", !0) : (r(), o("p", {
						key: 0,
						class: d(h(z).description),
						"data-testid": "cleanup-locked"
					}, c(h(g)("settings.data.manual_cleanup.unlock_hint")), 3)),
					f("div", { class: d(h(z).actions_row) }, [y(S, {
						label: h(g)("settings.data.manual_cleanup.confirm_action"),
						variant: "destructive",
						disabled: !W.value,
						"data-testid": "manual-cleanup-action",
						onClick: ee
					}, null, 8, ["label", "disabled"])], 2)
				], 2)
			], 2),
			y(w, {
				open: G.value,
				title: h(g)("settings.data.manual_cleanup.title"),
				description: h(g)("confirmations.destructive.irreversible_note"),
				"close-label": h(g)("common.actions.close"),
				"onUpdate:open": n[1] ||= (e) => !e && Y()
			}, {
				default: i(() => [y(E, {
					label: h(g)("confirmations.typed_confirmation.label", { phrase: _.value }),
					error: K.value.length > 0 && K.value !== _.value ? h(g)("confirmations.typed_confirmation.mismatch", { phrase: _.value }) : J.value
				}, {
					default: i(({ fieldId: e, describedBy: t }) => [a(f("input", {
						id: e,
						"onUpdate:modelValue": n[0] ||= (e) => K.value = e,
						type: "text",
						"aria-describedby": t,
						class: d(h(z).typed_confirm_input),
						placeholder: h(g)("confirmations.typed_confirmation.placeholder"),
						"data-testid": "cleanup-confirm-input"
					}, null, 10, U), [[s, K.value]])]),
					_: 1
				}, 8, ["label", "error"]), f("div", { class: d(h(z).actions_row) }, [y(S, {
					label: h(g)("settings.data.manual_cleanup.confirm_action"),
					variant: "destructive",
					pending: q.value,
					disabled: K.value !== _.value,
					onClick: X
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]), y(S, {
					label: h(g)("confirmations.destructive.default_cancel_action"),
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
}), G = ["id", "aria-describedby"], K = ["data-severity"], q = ["id"], J = /* @__PURE__ */ v({
	__name: "GatewaySettings",
	props: {
		settings: {},
		connectionTestCommand: {},
		controller: {}
	},
	setup(n) {
		let u = n, { t: g } = p(), v = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, b = e(u.settings?.gateway.endpoint ?? ""), x = e(null), C = e(!1), w = e(!1);
		t(() => u.settings?.gateway.endpoint ?? "", (e) => {
			b.value = e;
		});
		let T = m(() => {
			let e = b.value.trim();
			if (e.length === 0) return null;
			try {
				if (!A(e)) return null;
				let t = O(e), n = k(t), r = j(u.settings?.gateway.http_acknowledgments ?? {}, t);
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
			if (C.value) return;
			let e = b.value.trim();
			if (x.value = null, e.length === 0) {
				C.value = !0;
				try {
					await u.controller.update_settings({ gateway: {
						...u.settings?.gateway ?? v,
						endpoint: null
					} });
				} finally {
					C.value = !1;
				}
				return;
			}
			let t;
			try {
				t = O(e);
			} catch {
				x.value = g("errors.validation_required");
				return;
			}
			C.value = !0;
			try {
				await u.controller.update_settings({ gateway: {
					...u.settings?.gateway ?? v,
					endpoint: t
				} });
			} finally {
				C.value = !1;
			}
		}
		async function N() {
			let e = T.value;
			if (!(!e || w.value)) {
				w.value = !0;
				try {
					await u.controller.acknowledge_http_origin(e.origin);
				} finally {
					w.value = !1;
				}
			}
		}
		function P() {
			u.controller.test_diagnostics_connection();
		}
		let F = m(() => u.connectionTestCommand.status === "pending");
		return (e, t) => (r(), o("div", {
			class: d(h(z).section),
			"data-testid": "gateway-settings"
		}, [f("div", { class: d(h(z).section_header) }, [f("h2", { class: d(h(z).section_title) }, c(h(g)("settings.sections.gateway")), 3)], 2), f("div", { class: d(h(z).form_grid) }, [
			y(E, {
				label: h(g)("settings.gateway.endpoint_label"),
				hint: h(g)("settings.gateway.endpoint_hint"),
				error: x.value
			}, {
				default: i(({ fieldId: e, describedBy: n }) => [a(f("input", {
					id: e,
					"onUpdate:modelValue": t[0] ||= (e) => b.value = e,
					type: "text",
					"aria-describedby": n,
					class: d(h(z).typed_confirm_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: M
				}, null, 42, G), [[s, b.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			T.value && !T.value.acknowledged ? (r(), o("div", {
				key: 0,
				class: d(h(z).risk_banner),
				"data-severity": T.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				f("div", { class: d(h(z).risk_banner_title) }, [y(D, {
					icon: h(R),
					size: 16
				}, null, 8, ["icon"]), _(" " + c(h(g)("settings.http_risk.warning_title")), 1)], 2),
				f("p", { class: d(h(z).risk_banner_description) }, c(T.value.severity === "error" ? h(g)("settings.http_risk.error_description_public", { origin: T.value.origin }) : h(g)("settings.http_risk.warning_description_local", { origin: T.value.origin })), 3),
				f("p", { class: d(h(z).risk_banner_description) }, c(h(g)("settings.http_risk.disclosure")), 3),
				f("div", { class: d(h(z).risk_banner_actions) }, [y(S, {
					label: h(g)("settings.http_risk.continue_action"),
					pending: w.value,
					onClick: N
				}, null, 8, ["label", "pending"])], 2)
			], 10, K)) : T.value && T.value.acknowledged ? (r(), o("div", {
				key: 1,
				class: d(h(z).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [y(D, {
				icon: h(L),
				size: 14
			}, null, 8, ["icon"]), _(" " + c(h(g)("settings.http_risk.acknowledged_label")), 1)], 2)) : l("", !0),
			f("div", { class: d(h(z).row) }, [f("span", { class: d(h(z).row_label) }, c(h(g)("settings.gateway.protocol_label")), 3), y(S, {
				label: h(g)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: F.value,
				onClick: P
			}, null, 8, ["label", "pending"])], 2),
			y(E, { label: h(g)("settings.gateway.token_secret_label") }, {
				default: i(({ fieldId: e }) => [f("span", {
					id: e,
					class: d(h(z).row_value),
					"data-testid": "gateway-token-reference"
				}, c(n.settings?.gateway.token_secret_id ?? h(g)("settings.gateway.token_not_set")), 11, q)]),
				_: 1
			}, 8, ["label"]),
			f("p", { class: d(h(z).description) }, c(h(g)("errors.capability_blocked", { capability: h(g)("settings.gateway.auto_generate_action") })), 3)
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
	return b[e].completion_routes;
}
//#endregion
//#region src/ui/views/settings/LlmConnections.vue?vue&type=script&setup=true&lang.ts
var te = ["id", "aria-describedby"], ne = ["id", "aria-describedby"], re = ["id", "aria-describedby"], Z = /* @__PURE__ */ v({
	__name: "LlmConnections",
	props: {
		connections: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(t) {
		let _ = t, { t: v } = p(), b = e(!1), x = e(null), D = e(!1), O = e(null), k = e(null), A = e(null), j = e(null), F = e(!1), I = e(null), L = e(""), R = e(!1), B = e(null), V = e(/* @__PURE__ */ new Map()), H = m(() => ee.map((e) => ({
			value: e,
			label: Y(v, e)
		}))), U = m(() => X(x.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), W = m({
			get: () => x.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				x.value && (x.value.provider_kind = e, x.value.route = X(x.value.provider_kind)[0] ?? "");
			}
		}), G = m({
			get: () => x.value?.route ?? "",
			set: (e) => {
				x.value && (x.value.route = e);
			}
		});
		function K() {
			x.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_kind: "openai_compatible",
				route: X("openai_compatible")[0] ?? "",
				display_name: "",
				model_id: "",
				temperature: .7,
				max_output_tokens: 2048,
				is_default: _.connections.length === 0
			}, J(), b.value = !0;
		}
		function q(e) {
			x.value = {
				id: e.id,
				is_new: !1,
				provider_kind: e.provider_kind,
				route: e.route,
				display_name: e.display_name,
				model_id: e.model_id,
				temperature: e.temperature,
				max_output_tokens: e.max_output_tokens,
				is_default: e.is_default
			}, J(), b.value = !0;
		}
		function J() {
			O.value = null, k.value = null, A.value = null;
		}
		function Z() {
			b.value = !1, x.value = null, J();
		}
		async function ie() {
			let e = x.value;
			if (!e || D.value) return;
			J();
			let t = e.display_name.trim(), n = e.model_id.trim();
			if (t.length === 0 && (O.value = v("errors.validation_required")), n.length === 0 && (k.value = v("errors.validation_required")), !(O.value || k.value)) {
				D.value = !0;
				try {
					await _.controller.save_llm_connection({
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
					A.value = v("errors.unexpected");
				} finally {
					D.value = !1;
				}
			}
		}
		function Q(e) {
			j.value = e;
		}
		async function ae() {
			let e = j.value;
			if (!(!e || F.value)) {
				F.value = !0;
				try {
					await _.controller.remove_llm_connection(e.id), j.value = null;
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
					B.value = v("errors.validation_required");
					return;
				}
				R.value = !0, B.value = null;
				try {
					await _.controller.set_llm_connection_credential(e.id, L.value), $();
				} catch {
					B.value = v("errors.unexpected");
				} finally {
					R.value = !1, L.value = "";
				}
			}
		}
		async function ce(e) {
			await _.controller.clear_llm_connection_credential(e.id);
		}
		async function le(e) {
			V.value = new Map(V.value).set(e.id, {
				pending: !0,
				label: null
			});
			let t;
			try {
				let n = await _.controller.test_llm_connection(e.id);
				t = n.status === "success" ? `${v("status.success")} · ${v("diagnostics.connection_tests.latency_label", { ms: n.latency_ms })}` : v("errors.connection_test_failed", { code: n.code });
			} catch {
				t = v("errors.unexpected");
			}
			V.value = new Map(V.value).set(e.id, {
				pending: !1,
				label: t
			});
		}
		return (e, p) => (r(), o("div", {
			class: d(h(z).section),
			"data-testid": "llm-connections"
		}, [
			f("div", { class: d(h(z).section_header) }, [f("h2", { class: d(h(z).section_title) }, c(h(v)("settings.sections.llm_connections")), 3), y(S, {
				label: h(v)("settings.llm_connections.add_action"),
				onClick: K
			}, null, 8, ["label"])], 2),
			f("p", { class: d(h(z).description) }, c(h(v)("settings.llm_connections.section_description")), 3),
			y(C, {
				status: t.loading ? "loading" : t.connections.length === 0 ? "empty" : "ready",
				"empty-message": h(v)("settings.llm_connections.empty_description")
			}, {
				action: i(() => [y(S, {
					label: h(v)("settings.llm_connections.add_action"),
					onClick: K
				}, null, 8, ["label"])]),
				default: i(() => [f("div", null, [(r(!0), o(g, null, n(t.connections, (e) => (r(), o("div", {
					key: e.id,
					class: d(h(z).profile_row),
					"data-testid": "llm-connection-row"
				}, [f("div", { class: d(h(z).profile_identity) }, [
					f("span", { class: d(h(z).profile_name) }, c(e.display_name), 3),
					f("span", { class: d(h(z).profile_meta) }, c(h(Y)(h(v), e.provider_kind)) + " · " + c(e.model_id), 3),
					f("span", {
						class: d(h(z).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, c(e.credential_reference ? h(v)("settings.llm_connections.credential_set") : h(v)("settings.llm_connections.credential_unset")), 3),
					V.value.get(e.id)?.label ? (r(), o("span", {
						key: 0,
						class: d(h(z).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, c(V.value.get(e.id)?.label), 3)) : l("", !0)
				], 2), f("div", { class: d(h(z).profile_actions) }, [
					e.is_default ? (r(), o("span", {
						key: 0,
						class: d(h(z).badge)
					}, c(h(v)("settings.llm_connections.default_badge")), 3)) : l("", !0),
					y(S, {
						label: h(v)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: V.value.get(e.id)?.pending === !0,
						onClick: (t) => le(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					y(S, {
						label: h(v)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (t) => oe(e)
					}, null, 8, ["label", "onClick"]),
					e.credential_reference ? (r(), u(S, {
						key: 1,
						label: h(v)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => ce(e)
					}, null, 8, ["label", "onClick"])) : l("", !0),
					y(S, {
						label: h(v)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => q(e)
					}, null, 8, ["label", "onClick"]),
					y(S, {
						label: h(v)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => Q(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			y(w, {
				open: b.value,
				title: x.value?.is_new ? h(v)("settings.llm_connections.dialog_add_title") : h(v)("settings.llm_connections.dialog_edit_title"),
				description: h(v)("settings.llm_connections.dialog_description"),
				"close-label": h(v)("common.actions.close"),
				"onUpdate:open": p[7] ||= (e) => !e && Z()
			}, {
				default: i(() => [x.value ? (r(), o("div", {
					key: 0,
					class: d(h(z).form_grid)
				}, [
					y(E, {
						label: h(v)("common.labels.name"),
						error: O.value,
						required: ""
					}, {
						default: i(({ fieldId: e, describedBy: t }) => [a(f("input", {
							id: e,
							"onUpdate:modelValue": p[0] ||= (e) => x.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: d(h(z).typed_confirm_input)
						}, null, 10, te), [[s, x.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					y(E, {
						label: h(v)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: i(({ fieldId: e }) => [y(M, {
							id: e,
							modelValue: W.value,
							"onUpdate:modelValue": p[1] ||= (e) => W.value = e,
							options: H.value,
							placeholder: h(v)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					y(E, {
						label: h(v)("settings.llm_connections.route_label"),
						hint: h(v)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: i(({ fieldId: e }) => [y(M, {
							id: e,
							modelValue: G.value,
							"onUpdate:modelValue": p[2] ||= (e) => G.value = e,
							options: U.value,
							placeholder: h(v)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					y(E, {
						label: h(v)("settings.llm_connections.model_label"),
						hint: h(v)("settings.llm_connections.model_hint"),
						error: k.value,
						required: ""
					}, {
						default: i(({ fieldId: e, describedBy: t }) => [a(f("input", {
							id: e,
							"onUpdate:modelValue": p[3] ||= (e) => x.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: d(h(z).typed_confirm_input)
						}, null, 10, ne), [[s, x.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					y(E, {
						label: h(v)("settings.llm_connections.temperature_label"),
						hint: h(v)("settings.llm_connections.temperature_hint")
					}, {
						default: i(() => [y(T, {
							modelValue: x.value.temperature,
							"onUpdate:modelValue": p[4] ||= (e) => x.value.temperature = e,
							label: h(v)("settings.llm_connections.temperature_label"),
							"increment-label": h(v)("common.actions.increase"),
							"decrement-label": h(v)("common.actions.decrease"),
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
					y(E, { label: h(v)("settings.llm_connections.max_output_tokens_label") }, {
						default: i(() => [y(T, {
							modelValue: x.value.max_output_tokens,
							"onUpdate:modelValue": p[5] ||= (e) => x.value.max_output_tokens = e,
							label: h(v)("settings.llm_connections.max_output_tokens_label"),
							"increment-label": h(v)("common.actions.increase"),
							"decrement-label": h(v)("common.actions.decrease"),
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
					y(P, {
						modelValue: x.value.is_default,
						"onUpdate:modelValue": p[6] ||= (e) => x.value.is_default = e,
						label: h(v)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					A.value ? (r(), o("p", {
						key: 0,
						class: d([h(z).status_text, h(z).description]),
						"data-tone": "error"
					}, c(A.value), 3)) : l("", !0),
					f("div", { class: d(h(z).actions_row) }, [y(S, {
						label: h(v)("common.actions.save"),
						pending: D.value,
						onClick: ie
					}, null, 8, ["label", "pending"]), y(S, {
						label: h(v)("common.actions.cancel"),
						variant: "secondary",
						onClick: Z
					}, null, 8, ["label"])], 2)
				], 2)) : l("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			y(w, {
				open: I.value !== null,
				title: h(v)("settings.llm_connections.credential_dialog_title"),
				description: h(v)("settings.llm_connections.credential_dialog_description"),
				"close-label": h(v)("common.actions.close"),
				"onUpdate:open": p[9] ||= (e) => !e && $()
			}, {
				default: i(() => [f("div", { class: d(h(z).form_grid) }, [y(E, {
					label: h(v)("settings.llm_connections.credential_label"),
					hint: h(v)("provider.credentials.not_stored_locally"),
					error: B.value,
					required: ""
				}, {
					default: i(({ fieldId: e, describedBy: t }) => [a(f("input", {
						id: e,
						"onUpdate:modelValue": p[8] ||= (e) => L.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: d(h(z).typed_confirm_input),
						"data-testid": "llm-credential-input"
					}, null, 10, re), [[s, L.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), f("div", { class: d(h(z).actions_row) }, [y(S, {
					label: h(v)("common.actions.save"),
					pending: R.value,
					onClick: se
				}, null, 8, ["label", "pending"]), y(S, {
					label: h(v)("common.actions.cancel"),
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
			y(N, {
				open: j.value !== null,
				title: h(v)("settings.llm_connections.remove_confirm_title", { name: j.value?.display_name ?? "" }),
				description: h(v)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": h(v)("confirmations.destructive.default_confirm_action"),
				"cancel-label": h(v)("confirmations.destructive.default_cancel_action"),
				pending: F.value,
				"onUpdate:open": p[10] ||= (e) => !e && (j.value = null),
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
var ae = ["id", "aria-describedby"], oe = ["id", "aria-describedby"], $ = /* @__PURE__ */ v({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		controller: {}
	},
	setup(t) {
		let u = t, { t: _ } = p(), v = e(!1), b = e(null), x = e(!1), T = e(null), D = e(null), O = e(!1), k = e(/* @__PURE__ */ new Map()), A = ie.map((e) => ({
			value: e,
			label: Q(_, e)
		})), j = m({
			get: () => b.value?.provider_id ?? "sd_webui",
			set: (e) => {
				b.value && (b.value.provider_id = e);
			}
		});
		function F() {
			b.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				secret_reference: "",
				is_default: u.profiles.length === 0
			}, T.value = null, v.value = !0;
		}
		function I(e) {
			b.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				secret_reference: "",
				is_default: e.is_default
			}, T.value = null, v.value = !0;
		}
		function L() {
			v.value = !1, b.value = null, T.value = null;
		}
		async function R() {
			let e = b.value;
			if (!(!e || x.value)) {
				x.value = !0, T.value = null;
				try {
					await u.controller.save_provider_profile({
						id: e.id,
						provider_id: e.provider_id,
						display_name: e.display_name,
						is_default: e.is_default,
						updated_at: (/* @__PURE__ */ new Date()).toISOString(),
						secret_reference: e.secret_reference.trim().length > 0 ? e.secret_reference : null
					}), L();
				} catch {
					T.value = _("errors.unexpected");
				} finally {
					x.value = !1;
				}
			}
		}
		function B(e) {
			D.value = e;
		}
		async function V() {
			let e = D.value;
			if (!(!e || O.value)) {
				O.value = !0;
				try {
					await u.controller.remove_provider_profile(e.id), D.value = null;
				} finally {
					O.value = !1;
				}
			}
		}
		async function H(e) {
			k.value.set(e.id, {
				pending: !0,
				label: null
			}), k.value = new Map(k.value);
			try {
				let t = await u.controller.test_provider_profile_connection(e.id), n = t.status === "success" ? `${_("status.success")} · ${_("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : _("errors.connection_test_failed", { code: t.error.code });
				k.value.set(e.id, {
					pending: !1,
					label: n
				});
			} catch {
				k.value.set(e.id, {
					pending: !1,
					label: _("errors.unexpected")
				});
			}
			k.value = new Map(k.value);
		}
		return (e, u) => (r(), o("div", {
			class: d(h(z).section),
			"data-testid": "provider-profiles"
		}, [
			f("div", { class: d(h(z).section_header) }, [f("h2", { class: d(h(z).section_title) }, c(h(_)("settings.sections.provider_profiles")), 3), y(S, {
				label: h(_)("settings.provider_profiles.add_action"),
				onClick: F
			}, null, 8, ["label"])], 2),
			y(C, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": h(_)("settings.provider_profiles.empty_description")
			}, {
				default: i(() => [f("div", null, [(r(!0), o(g, null, n(t.profiles, (e) => (r(), o("div", {
					key: e.id,
					class: d(h(z).profile_row),
					"data-testid": "provider-profile-row"
				}, [f("div", { class: d(h(z).profile_identity) }, [
					f("span", { class: d(h(z).profile_name) }, c(e.display_name), 3),
					f("span", { class: d(h(z).profile_meta) }, c(h(Q)(h(_), e.provider_id)), 3),
					k.value.get(e.id)?.label ? (r(), o("span", {
						key: 0,
						class: d(h(z).profile_meta),
						"data-testid": "profile-test-result"
					}, c(k.value.get(e.id)?.label), 3)) : l("", !0)
				], 2), f("div", { class: d(h(z).profile_actions) }, [
					e.is_default ? (r(), o("span", {
						key: 0,
						class: d(h(z).badge)
					}, c(h(_)("settings.provider_profiles.default_badge")), 3)) : l("", !0),
					y(S, {
						label: h(_)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: k.value.get(e.id)?.pending === !0,
						onClick: (t) => H(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					y(S, {
						label: h(_)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => I(e)
					}, null, 8, ["label", "onClick"]),
					y(S, {
						label: h(_)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => B(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			y(w, {
				open: v.value,
				title: b.value?.is_new ? h(_)("settings.provider_profiles.dialog_add_title") : h(_)("settings.provider_profiles.dialog_edit_title"),
				"close-label": h(_)("common.actions.close"),
				"onUpdate:open": u[4] ||= (e) => !e && L()
			}, {
				default: i(() => [b.value ? (r(), o("div", {
					key: 0,
					class: d(h(z).form_grid)
				}, [
					y(E, {
						label: h(_)("common.labels.name"),
						required: ""
					}, {
						default: i(({ fieldId: e, describedBy: t }) => [a(f("input", {
							id: e,
							"onUpdate:modelValue": u[0] ||= (e) => b.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: d(h(z).typed_confirm_input)
						}, null, 10, ae), [[s, b.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					y(E, {
						label: h(_)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: i(({ fieldId: e }) => [y(M, {
							id: e,
							modelValue: j.value,
							"onUpdate:modelValue": u[1] ||= (e) => j.value = e,
							options: h(A),
							placeholder: h(_)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					y(E, {
						label: h(_)("settings.gateway.token_secret_label"),
						hint: h(_)("provider.credentials.not_stored_locally")
					}, {
						default: i(({ fieldId: e, describedBy: t }) => [a(f("input", {
							id: e,
							"onUpdate:modelValue": u[2] ||= (e) => b.value.secret_reference = e,
							type: "text",
							"aria-describedby": t,
							class: d(h(z).typed_confirm_input)
						}, null, 10, oe), [[s, b.value.secret_reference]])]),
						_: 1
					}, 8, ["label", "hint"]),
					y(P, {
						modelValue: b.value.is_default,
						"onUpdate:modelValue": u[3] ||= (e) => b.value.is_default = e,
						label: h(_)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					T.value ? (r(), o("p", {
						key: 0,
						class: d([h(z).status_text, h(z).description]),
						"data-tone": "error"
					}, c(T.value), 3)) : l("", !0),
					f("div", { class: d(h(z).actions_row) }, [y(S, {
						label: h(_)("common.actions.save"),
						pending: x.value,
						onClick: R
					}, null, 8, ["label", "pending"]), y(S, {
						label: h(_)("common.actions.cancel"),
						variant: "secondary",
						onClick: L
					}, null, 8, ["label"])], 2)
				], 2)) : l("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			y(N, {
				open: D.value !== null,
				title: h(_)("settings.provider_profiles.remove_confirm_title", { name: D.value?.display_name ?? "" }),
				description: h(_)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": h(_)("confirmations.destructive.default_confirm_action"),
				"cancel-label": h(_)("confirmations.destructive.default_cancel_action"),
				pending: O.value,
				"onUpdate:open": u[5] ||= (e) => !e && (D.value = null),
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
}), se = { class: "tc-visually-hidden" }, ce = /* @__PURE__ */ v({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let { t } = p();
		return (n, i) => (r(), o("div", {
			class: d(h(z).view),
			"data-testid": "settings-view"
		}, [
			f("h1", se, c(h(t)("nav.settings")), 1),
			y($, {
				profiles: e.state.workbench.profiles,
				controller: e.controller
			}, null, 8, ["profiles", "controller"]),
			y(Z, {
				connections: e.state.llm_connections.connections,
				loading: e.state.loading.has("llm_connections"),
				controller: e.controller
			}, null, 8, [
				"connections",
				"loading",
				"controller"
			]),
			y(J, {
				settings: e.state.settings.settings,
				"connection-test-command": e.state.diagnostics.connection_test_command,
				controller: e.controller
			}, null, 8, [
				"settings",
				"connection-test-command",
				"controller"
			]),
			y(V, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			y(B, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			y(W, {
				"vocabulary-update-channel": e.state.settings.vocabulary_update_channel,
				migration: e.state.diagnostics.migration,
				"migration-retry-command": e.state.settings.migration_retry_command,
				controller: e.controller
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
