import { A as e, rt as t } from "./src-CLzfjths.js";
import { $ as n, B as r, F as i, N as a, U as o, W as s, _ as c, a as l, ft as u, g as d, h as f, lt as p, m, n as h, p as g, st as _, u as v, v as y, x as b, y as x } from "./vue-i18n-D0uIxSJk.js";
import { t as S } from "./createLucideIcon-D9d_Lia0.js";
import { n as C, t as w } from "./StateSurface-C7mKA32L.js";
import { n as T, t as E } from "./NumberStepper-BrE3Mw-G.js";
import { t as D } from "./FieldGroup-CQJSK567.js";
import { t as O } from "./AppIcon-CXvmyYE2.js";
import { a as k, n as A, o as j, r as M } from "./http_acknowledgment-Bd7iIzs_.js";
import { t as N } from "./AppSelect-DzN2YfMC.js";
import { n as P } from "./_prop_utils-Cr0BV-r1.js";
import { t as F } from "./AppSwitch-BxASERvg.js";
import { t as I } from "./SegmentedControl-B6JSrdwj.js";
import { t as L } from "./MigrationStatus-DrvjYhJ7.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/circle-check.js
var R = S("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), z = S("triangle-alert", [
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
]), B = {
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
}, V = /* @__PURE__ */ b({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = h(), r = {
			color_mode: "system",
			inspector_width: 320,
			inspector_collapsed: !1,
			optional_entry_enabled: !1
		};
		function i(e) {
			t.controller.update_settings({ ui: {
				...t.settings?.ui ?? r,
				...e
			} });
		}
		let o = g(() => [
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
		]), s = g(() => [
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
		function l(e) {
			(e === "system" || e === "light" || e === "dark") && i({ color_mode: e });
		}
		function d(e) {
			(e === "auto" || e === "zh-CN" || e === "en") && t.controller.update_settings({ locale: e });
		}
		function f(e) {
			t.controller.set_inspector_width(e), i({ inspector_width: e });
		}
		return (t, r) => (a(), c("div", {
			class: p(_(B).section),
			"data-testid": "appearance-settings"
		}, [m("div", { class: p(_(B).section_header) }, [m("h2", { class: p(_(B).section_title) }, u(_(n)("settings.sections.appearance")), 3)], 2), m("div", { class: p(_(B).form_grid) }, [
			m("div", { class: p(_(B).row) }, [m("span", { class: p(_(B).row_label) }, u(_(n)("settings.appearance.theme_label")), 3), x(I, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: o.value,
				label: _(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			m("div", { class: p(_(B).row) }, [m("span", { class: p(_(B).row_label) }, u(_(n)("settings.appearance.language_label")), 3), x(I, {
				"model-value": e.settings?.locale ?? "auto",
				options: s.value,
				label: _(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": d
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			m("div", { class: p(_(B).row) }, [m("span", { class: p(_(B).row_label) }, u(_(n)("settings.appearance.inspector_width_label")), 3), x(E, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: _(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": _(n)("common.actions.increase"),
				"decrement-label": _(n)("common.actions.decrease"),
				"onUpdate:modelValue": f
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			x(F, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: _(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), H = /* @__PURE__ */ b({
	__name: "AutomationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = h();
		function r(e) {
			t.controller.update_settings(e);
		}
		let i = g(() => t.settings?.global_concurrency);
		return (t, o) => (a(), c("div", {
			class: p(_(B).section),
			"data-testid": "automation-settings"
		}, [m("div", { class: p(_(B).section_header) }, [m("h2", { class: p(_(B).section_title) }, u(_(n)("settings.sections.automation")), 3)], 2), m("div", { class: p(_(B).form_grid) }, [
			x(F, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: _(n)("settings.automation.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[0] ||= (e) => r({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			x(F, {
				"model-value": e.settings?.fallback_generation_enabled ?? !1,
				label: _(n)("settings.automation.fallback_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[1] ||= (e) => r({ fallback_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			m("div", { class: p(_(B).row) }, [m("span", { class: p(_(B).row_label) }, u(_(n)("settings.automation.global_concurrency_label")), 3), x(E, {
				"model-value": i.value,
				label: _(n)("settings.automation.global_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": _(n)("common.actions.increase"),
				"decrement-label": _(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[2] ||= (e) => r({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			m("div", { class: p(_(B).row) }, [m("span", { class: p(_(B).row_label) }, u(_(n)("settings.automation.provider_concurrency_label")), 3), x(E, {
				"model-value": 1,
				label: _(n)("settings.automation.provider_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": _(n)("common.actions.increase"),
				"decrement-label": _(n)("common.actions.decrease"),
				disabled: "",
				"data-testid": "provider-concurrency-stepper"
			}, null, 8, [
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			m("p", { class: p(_(B).description) }, u(_(n)("errors.capability_blocked", { capability: _(n)("settings.automation.provider_concurrency_label") })), 3)
		], 2)], 2));
	}
}), ee = ["aria-label"], U = ["aria-label"], te = [
	"id",
	"aria-describedby",
	"placeholder"
], W = /* @__PURE__ */ b({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		migration: {},
		migrationRetryCommand: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: r } = h(), i = g(() => r("settings.data.manual_cleanup.confirm_phrase")), v = n(!1), y = [{
			value: "bundled",
			label: r("settings.data.vocabulary_channel_bundled")
		}, {
			value: "remote",
			label: r("settings.data.vocabulary_channel_https")
		}];
		async function b(e) {
			if (!(e !== "bundled" && e !== "remote" || v.value)) {
				v.value = !0;
				try {
					await t.controller.set_vocabulary_update_channel(e);
				} finally {
					v.value = !1;
				}
			}
		}
		let S = n(!1), w = n(!1), E = n(null), O = n(null), k = n(null);
		function A() {
			k.value?.click();
		}
		function j() {
			t.controller.cancel_vocabulary_import();
		}
		async function M(e) {
			let n = e.target, i = n.files?.[0];
			if (n.value = "", !(!i || S.value)) {
				S.value = !0, w.value = !1, E.value = null, O.value = null;
				try {
					await t.controller.import_vocabulary_package(i, (e) => {
						O.value = e;
					}), w.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					E.value = r("settings.data.vocabulary_import_error", { code: t });
				} finally {
					S.value = !1;
				}
			}
		}
		let N = g(() => {
			let e = O.value;
			if (e === null) return null;
			switch (e.phase) {
				case "reading": return r("settings.data.vocabulary_import.progress_reading", {
					received: e.received_bytes,
					total: e.total_bytes
				});
				case "batch": return r("settings.data.vocabulary_import.progress_batch", {
					current: e.batch_index + 1,
					total: e.batch_count
				});
				case "indexing": return r("settings.data.vocabulary_import.progress_indexing");
				case "staging_shard": return r("settings.data.vocabulary_import.progress_staging", {
					current: e.shard_index + 1,
					total: e.shard_count
				});
				case "activating": return r("settings.data.vocabulary_import.progress_activating");
				case "complete": return r("settings.data.vocabulary_import.progress_complete", { count: e.record_count });
				case "cancelled": return r("settings.data.vocabulary_import.progress_cancelled");
			}
		}), P = n(!1), F = n(!1), R = n(null);
		async function z() {
			if (!P.value) {
				P.value = !0, R.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "tavern-canvas-archive.json", r.click(), URL.revokeObjectURL(n), F.value = !0;
				} catch {
					R.value = r("errors.unexpected");
				} finally {
					P.value = !1;
				}
			}
		}
		let V = n(!1), H = n(null), W = n(null);
		function ne() {
			W.value?.click();
		}
		async function G(e) {
			let n = e.target, i = n.files?.[0];
			if (n.value = "", !(!i || V.value)) {
				V.value = !0, H.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					H.value = r("errors.unexpected");
				} finally {
					V.value = !1;
				}
			}
		}
		function K() {
			t.controller.retry_migration();
		}
		let q = n(!1);
		function re() {
			q.value = !q.value;
		}
		let ie = g(() => Object.values(t.migration?.counts ?? {}).reduce((e, t) => e + t, 0)), ae = g(() => r("settings.data.manual_cleanup.record_summary", ie.value, { named: {
			count: ie.value,
			bytes: r("settings.data.manual_cleanup.bytes_unavailable")
		} })), J = g(() => t.migration?.state === "completed" || F.value), Y = n(!1), X = n(""), Z = n(!1), Q = n(null);
		function oe() {
			X.value = "", Q.value = null, Y.value = !0;
		}
		function $() {
			Y.value = !1, X.value = "";
		}
		async function se() {
			if (!(X.value !== i.value || Z.value)) {
				Z.value = !0, Q.value = null;
				try {
					await t.controller.confirm_legacy_cleanup(X.value), Y.value = !1;
				} catch {
					Q.value = r("errors.unexpected");
				} finally {
					Z.value = !1;
				}
			}
		}
		return (t, n) => (a(), c("div", {
			class: p(_(B).section),
			"data-testid": "data-settings"
		}, [
			m("div", { class: p(_(B).section_header) }, [m("h2", { class: p(_(B).section_title) }, u(_(r)("settings.sections.data")), 3)], 2),
			m("div", { class: p(_(B).form_grid) }, [
				m("div", { class: p(_(B).row) }, [m("span", { class: p(_(B).row_label) }, u(_(r)("settings.data.vocabulary_channel_label")), 3), x(I, {
					"model-value": e.vocabularyUpdateChannel ?? "bundled",
					options: y,
					label: _(r)("settings.data.vocabulary_channel_label"),
					disabled: v.value,
					"onUpdate:modelValue": b
				}, null, 8, [
					"model-value",
					"label",
					"disabled"
				])], 2),
				m("div", { class: p(_(B).actions_row) }, [
					x(C, {
						label: _(r)("settings.data.vocabulary_import.action"),
						variant: "secondary",
						pending: S.value,
						onClick: A
					}, null, 8, ["label", "pending"]),
					S.value ? (a(), f(C, {
						key: 0,
						label: _(r)("settings.data.vocabulary_import.cancel_action"),
						variant: "destructive",
						onClick: j
					}, null, 8, ["label"])) : d("", !0),
					m("input", {
						ref_key: "vocabulary_file_input",
						ref: k,
						type: "file",
						accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
						class: "tc-visually-hidden",
						"aria-label": _(r)("settings.data.vocabulary_import.action"),
						"data-testid": "vocabulary-import-input",
						onChange: M
					}, null, 40, ee)
				], 2),
				m("p", { class: p(_(B).description) }, u(_(r)("settings.data.vocabulary_import.description")), 3),
				N.value ? (a(), c("p", {
					key: 0,
					class: p([_(B).status_text, _(B).description]),
					"data-testid": "vocabulary-import-progress"
				}, u(N.value), 3)) : d("", !0),
				w.value ? (a(), c("p", {
					key: 1,
					class: p([_(B).status_text, _(B).description]),
					"data-tone": "success",
					"data-testid": "vocabulary-import-success"
				}, u(_(r)("settings.data.vocabulary_import.success")), 3)) : d("", !0),
				E.value ? (a(), c("p", {
					key: 2,
					class: p([_(B).status_text, _(B).description]),
					"data-tone": "error",
					"data-testid": "vocabulary-import-error"
				}, u(E.value), 3)) : d("", !0),
				m("div", { class: p(_(B).actions_row) }, [
					x(C, {
						label: _(r)("settings.data.archive_export_action"),
						pending: P.value,
						onClick: z
					}, null, 8, ["label", "pending"]),
					x(C, {
						label: _(r)("settings.data.archive_import_action"),
						variant: "secondary",
						pending: V.value,
						onClick: ne
					}, null, 8, ["label", "pending"]),
					m("input", {
						ref_key: "file_input",
						ref: W,
						type: "file",
						accept: "application/json",
						class: "tc-visually-hidden",
						"aria-label": _(r)("settings.data.archive_import_action"),
						"data-testid": "archive-import-input",
						onChange: G
					}, null, 40, U)
				], 2),
				m("p", { class: p(_(B).description) }, u(_(r)("settings.data.archive_import_description")), 3),
				R.value ? (a(), c("p", {
					key: 3,
					class: p([_(B).status_text, _(B).description]),
					"data-tone": "error"
				}, u(R.value), 3)) : d("", !0),
				H.value ? (a(), c("p", {
					key: 4,
					class: p([_(B).status_text, _(B).description]),
					"data-tone": "error"
				}, u(H.value), 3)) : d("", !0),
				m("div", { class: p(_(B).actions_row) }, [x(C, {
					label: _(r)("settings.data.migration_retry_action"),
					pending: e.migrationRetryCommand.status === "pending",
					onClick: K
				}, null, 8, ["label", "pending"]), x(C, {
					label: _(r)("settings.data.migration_report_action"),
					variant: "secondary",
					onClick: re
				}, null, 8, ["label"])], 2),
				q.value ? (a(), f(L, {
					key: 5,
					snapshot: e.migration
				}, null, 8, ["snapshot"])) : d("", !0),
				m("div", {
					class: p(_(B).section),
					"data-testid": "manual-cleanup"
				}, [
					m("div", { class: p(_(B).section_header) }, [m("h3", { class: p(_(B).section_title) }, u(_(r)("settings.data.manual_cleanup.title")), 3)], 2),
					m("p", { class: p(_(B).description) }, u(_(r)("settings.data.manual_cleanup.description")), 3),
					m("div", { class: p(_(B).row) }, [m("span", { class: p(_(B).row_label) }, u(_(r)("diagnostics.migration_status.counts_label")), 3), m("span", { class: p(["tc-tabular-nums", _(B).row_value]) }, u(ae.value), 3)], 2),
					J.value ? d("", !0) : (a(), c("p", {
						key: 0,
						class: p(_(B).description),
						"data-testid": "cleanup-locked"
					}, u(_(r)("settings.data.manual_cleanup.unlock_hint")), 3)),
					m("div", { class: p(_(B).actions_row) }, [x(C, {
						label: _(r)("settings.data.manual_cleanup.confirm_action"),
						variant: "destructive",
						disabled: !J.value,
						"data-testid": "manual-cleanup-action",
						onClick: oe
					}, null, 8, ["label", "disabled"])], 2)
				], 2)
			], 2),
			x(T, {
				open: Y.value,
				title: _(r)("settings.data.manual_cleanup.title"),
				description: _(r)("confirmations.destructive.irreversible_note"),
				"close-label": _(r)("common.actions.close"),
				"onUpdate:open": n[1] ||= (e) => !e && $()
			}, {
				default: o(() => [x(D, {
					label: _(r)("confirmations.typed_confirmation.label", { phrase: i.value }),
					error: X.value.length > 0 && X.value !== i.value ? _(r)("confirmations.typed_confirmation.mismatch", { phrase: i.value }) : Q.value
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
						id: e,
						"onUpdate:modelValue": n[0] ||= (e) => X.value = e,
						type: "text",
						"aria-describedby": t,
						class: p(_(B).typed_confirm_input),
						placeholder: _(r)("confirmations.typed_confirmation.placeholder"),
						"data-testid": "cleanup-confirm-input"
					}, null, 10, te), [[l, X.value]])]),
					_: 1
				}, 8, ["label", "error"]), m("div", { class: p(_(B).actions_row) }, [x(C, {
					label: _(r)("settings.data.manual_cleanup.confirm_action"),
					variant: "destructive",
					pending: Z.value,
					disabled: X.value !== i.value,
					onClick: se
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]), x(C, {
					label: _(r)("confirmations.destructive.default_cancel_action"),
					variant: "secondary",
					onClick: $
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
}), ne = ["id", "aria-describedby"], G = ["data-severity"], K = ["id"], q = ["id", "aria-describedby"], re = /* @__PURE__ */ b({
	__name: "GatewaySettings",
	props: {
		settings: {},
		connectionTestCommand: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: i } = h(), v = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, b = n(t.settings?.gateway.endpoint ?? ""), S = n(null), w = n(!1), T = n(!1), E = n(""), N = n(!1), P = n(null);
		r(() => t.settings?.gateway.endpoint ?? "", (e) => {
			b.value = e;
		});
		let F = g(() => {
			let e = b.value.trim();
			if (e.length === 0) return null;
			try {
				if (!j(e)) return null;
				let n = k(e), r = A(n), i = M(t.settings?.gateway.http_acknowledgments ?? {}, n);
				return {
					origin: n,
					severity: r === "public_or_unknown" ? "error" : "warning",
					acknowledged: i
				};
			} catch {
				return null;
			}
		});
		async function I() {
			if (w.value) return;
			let e = b.value.trim();
			if (S.value = null, e.length === 0) {
				w.value = !0;
				try {
					await t.controller.update_settings({ gateway: {
						...t.settings?.gateway ?? v,
						endpoint: null
					} });
				} finally {
					w.value = !1;
				}
				return;
			}
			let n;
			try {
				n = k(e);
			} catch {
				S.value = i("errors.validation_required");
				return;
			}
			w.value = !0;
			try {
				await t.controller.update_settings({ gateway: {
					...t.settings?.gateway ?? v,
					endpoint: n
				} });
			} finally {
				w.value = !1;
			}
		}
		async function L() {
			let e = F.value;
			if (!(!e || T.value)) {
				T.value = !0;
				try {
					await t.controller.acknowledge_http_origin(e.origin);
				} finally {
					T.value = !1;
				}
			}
		}
		async function V() {
			let e = E.value.trim();
			if (P.value = null, !(e.length === 0 || N.value)) {
				N.value = !0;
				try {
					await t.controller.set_gateway_token(e), E.value = "";
				} catch {
					P.value = i("errors.validation_required");
				} finally {
					N.value = !1;
				}
			}
		}
		async function H() {
			if (!N.value) {
				N.value = !0;
				try {
					await t.controller.clear_gateway_token();
				} finally {
					N.value = !1;
				}
			}
		}
		function ee() {
			t.controller.test_diagnostics_connection();
		}
		let U = g(() => t.connectionTestCommand.status === "pending");
		return (t, n) => (a(), c("div", {
			class: p(_(B).section),
			"data-testid": "gateway-settings"
		}, [m("div", { class: p(_(B).section_header) }, [m("h2", { class: p(_(B).section_title) }, u(_(i)("settings.sections.gateway")), 3)], 2), m("div", { class: p(_(B).form_grid) }, [
			x(D, {
				label: _(i)("settings.gateway.endpoint_label"),
				hint: _(i)("settings.gateway.endpoint_hint"),
				error: S.value
			}, {
				default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
					id: e,
					"onUpdate:modelValue": n[0] ||= (e) => b.value = e,
					type: "text",
					"aria-describedby": t,
					class: p(_(B).typed_confirm_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: I
				}, null, 42, ne), [[l, b.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			F.value && !F.value.acknowledged ? (a(), c("div", {
				key: 0,
				class: p(_(B).risk_banner),
				"data-severity": F.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				m("div", { class: p(_(B).risk_banner_title) }, [x(O, {
					icon: _(z),
					size: 16
				}, null, 8, ["icon"]), y(" " + u(_(i)("settings.http_risk.warning_title")), 1)], 2),
				m("p", { class: p(_(B).risk_banner_description) }, u(F.value.severity === "error" ? _(i)("settings.http_risk.error_description_public", { origin: F.value.origin }) : _(i)("settings.http_risk.warning_description_local", { origin: F.value.origin })), 3),
				m("p", { class: p(_(B).risk_banner_description) }, u(_(i)("settings.http_risk.disclosure")), 3),
				m("div", { class: p(_(B).risk_banner_actions) }, [x(C, {
					label: _(i)("settings.http_risk.continue_action"),
					pending: T.value,
					onClick: L
				}, null, 8, ["label", "pending"])], 2)
			], 10, G)) : F.value && F.value.acknowledged ? (a(), c("div", {
				key: 1,
				class: p(_(B).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [x(O, {
				icon: _(R),
				size: 14
			}, null, 8, ["icon"]), y(" " + u(_(i)("settings.http_risk.acknowledged_label")), 1)], 2)) : d("", !0),
			m("div", { class: p(_(B).row) }, [m("span", { class: p(_(B).row_label) }, u(_(i)("settings.gateway.protocol_label")), 3), x(C, {
				label: _(i)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: U.value,
				onClick: ee
			}, null, 8, ["label", "pending"])], 2),
			x(D, { label: _(i)("settings.gateway.token_secret_label") }, {
				default: o(({ fieldId: t }) => [m("span", {
					id: t,
					class: p(_(B).row_value),
					"data-testid": "gateway-token-reference"
				}, u(e.settings?.gateway.token_secret_id ?? _(i)("settings.gateway.token_not_set")), 11, K)]),
				_: 1
			}, 8, ["label"]),
			x(D, {
				label: _(i)("settings.gateway.token_label"),
				hint: _(i)("settings.gateway.token_hint"),
				error: P.value
			}, {
				default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
					id: e,
					"onUpdate:modelValue": n[1] ||= (e) => E.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: p(_(B).typed_confirm_input),
					"data-testid": "gateway-token-input"
				}, null, 10, q), [[l, E.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			m("div", { class: p(_(B).row) }, [x(C, {
				label: _(i)("settings.gateway.token_save_action"),
				pending: N.value,
				disabled: E.value.trim().length === 0,
				"data-testid": "gateway-token-save",
				onClick: V
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), e.settings?.gateway.token_secret_id ? (a(), f(C, {
				key: 0,
				label: _(i)("settings.gateway.token_clear_action"),
				variant: "secondary",
				pending: N.value,
				"data-testid": "gateway-token-clear",
				onClick: H
			}, null, 8, ["label", "pending"])) : d("", !0)], 2)
		], 2)], 2));
	}
}), ie = [
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
];
function ae(e, t) {
	switch (t) {
		case "openai_compatible": return e("settings.llm_connections.provider_kinds.openai_compatible");
		case "anthropic": return e("settings.llm_connections.provider_kinds.anthropic");
		case "google_generative": return e("settings.llm_connections.provider_kinds.google_generative");
		case "ollama": return e("settings.llm_connections.provider_kinds.ollama");
	}
}
function J(t) {
	return e[t].completion_routes;
}
//#endregion
//#region src/ui/views/settings/LlmConnections.vue?vue&type=script&setup=true&lang.ts
var Y = ["id", "aria-describedby"], X = ["id", "aria-describedby"], Z = ["id", "aria-describedby"], Q = /* @__PURE__ */ b({
	__name: "LlmConnections",
	props: {
		connections: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: r } = h(), y = n(!1), b = n(null), S = n(!1), O = n(null), k = n(null), A = n(null), j = n(null), M = n(!1), I = n(null), L = n(""), R = n(!1), z = n(null), V = n(/* @__PURE__ */ new Map()), H = g(() => ie.map((e) => ({
			value: e,
			label: ae(r, e)
		}))), ee = g(() => J(b.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), U = g({
			get: () => b.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				b.value && (b.value.provider_kind = e, b.value.route = J(b.value.provider_kind)[0] ?? "");
			}
		}), te = g({
			get: () => b.value?.route ?? "",
			set: (e) => {
				b.value && (b.value.route = e);
			}
		});
		function W() {
			b.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_kind: "openai_compatible",
				route: J("openai_compatible")[0] ?? "",
				display_name: "",
				model_id: "",
				temperature: .7,
				max_output_tokens: 2048,
				is_default: t.connections.length === 0
			}, G(), y.value = !0;
		}
		function ne(e) {
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
			}, G(), y.value = !0;
		}
		function G() {
			O.value = null, k.value = null, A.value = null;
		}
		function K() {
			y.value = !1, b.value = null, G();
		}
		async function q() {
			let e = b.value;
			if (!e || S.value) return;
			G();
			let n = e.display_name.trim(), i = e.model_id.trim();
			if (n.length === 0 && (O.value = r("errors.validation_required")), i.length === 0 && (k.value = r("errors.validation_required")), !(O.value || k.value)) {
				S.value = !0;
				try {
					await t.controller.save_llm_connection({
						id: e.id,
						display_name: n,
						provider_kind: e.provider_kind,
						route: e.route,
						model_id: i,
						temperature: e.temperature,
						max_output_tokens: e.max_output_tokens,
						is_default: e.is_default
					}), K();
				} catch {
					A.value = r("errors.unexpected");
				} finally {
					S.value = !1;
				}
			}
		}
		function re(e) {
			j.value = e;
		}
		async function Q() {
			let e = j.value;
			if (!(!e || M.value)) {
				M.value = !0;
				try {
					await t.controller.remove_llm_connection(e.id), j.value = null;
				} finally {
					M.value = !1;
				}
			}
		}
		function oe(e) {
			I.value = e, L.value = "", z.value = null;
		}
		function $() {
			I.value = null, L.value = "", z.value = null;
		}
		async function se() {
			let e = I.value;
			if (!(!e || R.value)) {
				if (L.value.trim().length === 0) {
					z.value = r("errors.validation_required");
					return;
				}
				R.value = !0, z.value = null;
				try {
					await t.controller.set_llm_connection_credential(e.id, L.value), $();
				} catch {
					z.value = r("errors.unexpected");
				} finally {
					R.value = !1, L.value = "";
				}
			}
		}
		async function ce(e) {
			await t.controller.clear_llm_connection_credential(e.id);
		}
		async function le(e) {
			V.value = new Map(V.value).set(e.id, {
				pending: !0,
				label: null
			});
			let n;
			try {
				let i = await t.controller.test_llm_connection(e.id);
				n = i.status === "success" ? `${r("status.success")} · ${r("diagnostics.connection_tests.latency_label", { ms: i.latency_ms })}` : r("errors.connection_test_failed", { code: i.code });
			} catch {
				n = r("errors.unexpected");
			}
			V.value = new Map(V.value).set(e.id, {
				pending: !1,
				label: n
			});
		}
		return (t, n) => (a(), c("div", {
			class: p(_(B).section),
			"data-testid": "llm-connections"
		}, [
			m("div", { class: p(_(B).section_header) }, [m("h2", { class: p(_(B).section_title) }, u(_(r)("settings.sections.llm_connections")), 3), x(C, {
				label: _(r)("settings.llm_connections.add_action"),
				onClick: W
			}, null, 8, ["label"])], 2),
			m("p", { class: p(_(B).description) }, u(_(r)("settings.llm_connections.section_description")), 3),
			x(w, {
				status: e.loading ? "loading" : e.connections.length === 0 ? "empty" : "ready",
				"empty-message": _(r)("settings.llm_connections.empty_description")
			}, {
				action: o(() => [x(C, {
					label: _(r)("settings.llm_connections.add_action"),
					onClick: W
				}, null, 8, ["label"])]),
				default: o(() => [m("div", null, [(a(!0), c(v, null, i(e.connections, (e) => (a(), c("div", {
					key: e.id,
					class: p(_(B).profile_row),
					"data-testid": "llm-connection-row"
				}, [m("div", { class: p(_(B).profile_identity) }, [
					m("span", { class: p(_(B).profile_name) }, u(e.display_name), 3),
					m("span", { class: p(_(B).profile_meta) }, u(_(ae)(_(r), e.provider_kind)) + " · " + u(e.model_id), 3),
					m("span", {
						class: p(_(B).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, u(e.credential_reference ? _(r)("settings.llm_connections.credential_set") : _(r)("settings.llm_connections.credential_unset")), 3),
					V.value.get(e.id)?.label ? (a(), c("span", {
						key: 0,
						class: p(_(B).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, u(V.value.get(e.id)?.label), 3)) : d("", !0)
				], 2), m("div", { class: p(_(B).profile_actions) }, [
					e.is_default ? (a(), c("span", {
						key: 0,
						class: p(_(B).badge)
					}, u(_(r)("settings.llm_connections.default_badge")), 3)) : d("", !0),
					x(C, {
						label: _(r)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: V.value.get(e.id)?.pending === !0,
						onClick: (t) => le(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					x(C, {
						label: _(r)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (t) => oe(e)
					}, null, 8, ["label", "onClick"]),
					e.credential_reference ? (a(), f(C, {
						key: 1,
						label: _(r)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => ce(e)
					}, null, 8, ["label", "onClick"])) : d("", !0),
					x(C, {
						label: _(r)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => ne(e)
					}, null, 8, ["label", "onClick"]),
					x(C, {
						label: _(r)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => re(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			x(T, {
				open: y.value,
				title: b.value?.is_new ? _(r)("settings.llm_connections.dialog_add_title") : _(r)("settings.llm_connections.dialog_edit_title"),
				description: _(r)("settings.llm_connections.dialog_description"),
				"close-label": _(r)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && K()
			}, {
				default: o(() => [b.value ? (a(), c("div", {
					key: 0,
					class: p(_(B).form_grid)
				}, [
					x(D, {
						label: _(r)("common.labels.name"),
						error: O.value,
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => b.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: p(_(B).typed_confirm_input)
						}, null, 10, Y), [[l, b.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					x(D, {
						label: _(r)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [x(N, {
							id: e,
							modelValue: U.value,
							"onUpdate:modelValue": n[1] ||= (e) => U.value = e,
							options: H.value,
							placeholder: _(r)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					x(D, {
						label: _(r)("settings.llm_connections.route_label"),
						hint: _(r)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [x(N, {
							id: e,
							modelValue: te.value,
							"onUpdate:modelValue": n[2] ||= (e) => te.value = e,
							options: ee.value,
							placeholder: _(r)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					x(D, {
						label: _(r)("settings.llm_connections.model_label"),
						hint: _(r)("settings.llm_connections.model_hint"),
						error: k.value,
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => b.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: p(_(B).typed_confirm_input)
						}, null, 10, X), [[l, b.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					x(D, {
						label: _(r)("settings.llm_connections.temperature_label"),
						hint: _(r)("settings.llm_connections.temperature_hint")
					}, {
						default: o(() => [x(E, {
							modelValue: b.value.temperature,
							"onUpdate:modelValue": n[4] ||= (e) => b.value.temperature = e,
							label: _(r)("settings.llm_connections.temperature_label"),
							"increment-label": _(r)("common.actions.increase"),
							"decrement-label": _(r)("common.actions.decrease"),
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
					x(D, { label: _(r)("settings.llm_connections.max_output_tokens_label") }, {
						default: o(() => [x(E, {
							modelValue: b.value.max_output_tokens,
							"onUpdate:modelValue": n[5] ||= (e) => b.value.max_output_tokens = e,
							label: _(r)("settings.llm_connections.max_output_tokens_label"),
							"increment-label": _(r)("common.actions.increase"),
							"decrement-label": _(r)("common.actions.decrease"),
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
					x(F, {
						modelValue: b.value.is_default,
						"onUpdate:modelValue": n[6] ||= (e) => b.value.is_default = e,
						label: _(r)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					A.value ? (a(), c("p", {
						key: 0,
						class: p([_(B).status_text, _(B).description]),
						"data-tone": "error"
					}, u(A.value), 3)) : d("", !0),
					m("div", { class: p(_(B).actions_row) }, [x(C, {
						label: _(r)("common.actions.save"),
						pending: S.value,
						onClick: q
					}, null, 8, ["label", "pending"]), x(C, {
						label: _(r)("common.actions.cancel"),
						variant: "secondary",
						onClick: K
					}, null, 8, ["label"])], 2)
				], 2)) : d("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			x(T, {
				open: I.value !== null,
				title: _(r)("settings.llm_connections.credential_dialog_title"),
				description: _(r)("settings.llm_connections.credential_dialog_description"),
				"close-label": _(r)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && $()
			}, {
				default: o(() => [m("div", { class: p(_(B).form_grid) }, [x(D, {
					label: _(r)("settings.llm_connections.credential_label"),
					hint: _(r)("provider.credentials.not_stored_locally"),
					error: z.value,
					required: ""
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => L.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: p(_(B).typed_confirm_input),
						"data-testid": "llm-credential-input"
					}, null, 10, Z), [[l, L.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), m("div", { class: p(_(B).actions_row) }, [x(C, {
					label: _(r)("common.actions.save"),
					pending: R.value,
					onClick: se
				}, null, 8, ["label", "pending"]), x(C, {
					label: _(r)("common.actions.cancel"),
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
			x(P, {
				open: j.value !== null,
				title: _(r)("settings.llm_connections.remove_confirm_title", { name: j.value?.display_name ?? "" }),
				description: _(r)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": _(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": _(r)("confirmations.destructive.default_cancel_action"),
				pending: M.value,
				"onUpdate:open": n[10] ||= (e) => !e && (j.value = null),
				onConfirm: Q
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
}), oe = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function $(e, t) {
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
var se = ["id", "aria-describedby"], ce = ["id", "aria-describedby"], le = ["id", "aria-describedby"], ue = ["id", "aria-describedby"], de = /* @__PURE__ */ b({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		controller: {}
	},
	setup(e) {
		let r = e, { t: y } = h(), b = n(!1), S = n(null), E = n(!1), O = n(null), k = n(null), A = n(!1), j = n(/* @__PURE__ */ new Map()), M = oe.map((e) => ({
			value: e,
			label: $(y, e)
		})), I = g({
			get: () => S.value?.provider_id ?? "sd_webui",
			set: (e) => {
				S.value && (S.value.provider_id = e, S.value.workflow_id = "");
			}
		});
		function L() {
			S.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				model_id: "",
				workflow_id: "",
				secret_reference: "",
				is_default: r.profiles.length === 0
			}, O.value = null, b.value = !0;
		}
		function R(e) {
			S.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				secret_reference: "",
				is_default: e.is_default
			}, O.value = null, b.value = !0;
		}
		function z() {
			b.value = !1, S.value = null, O.value = null;
		}
		async function V() {
			let e = S.value;
			if (!e || E.value) return;
			let n = e.display_name.trim(), i = e.model_id.trim(), a = e.provider_id === "comfyui" ? t.safeParse(e.workflow_id.trim()) : null;
			if (n.length === 0 || i.length === 0 || e.provider_id === "comfyui" && a?.success !== !0) {
				O.value = y("errors.validation_required");
				return;
			}
			E.value = !0, O.value = null;
			try {
				await r.controller.save_provider_profile({
					id: e.id,
					provider_id: e.provider_id,
					display_name: n,
					model_id: i,
					workflow_id: e.provider_id === "comfyui" && a?.success === !0 ? a.data : null,
					is_default: e.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString(),
					secret_reference: e.secret_reference.trim().length > 0 ? e.secret_reference : null
				}), z();
			} catch {
				O.value = y("errors.unexpected");
			} finally {
				E.value = !1;
			}
		}
		function H(e) {
			k.value = e;
		}
		async function ee() {
			let e = k.value;
			if (!(!e || A.value)) {
				A.value = !0;
				try {
					await r.controller.remove_provider_profile(e.id), k.value = null;
				} finally {
					A.value = !1;
				}
			}
		}
		async function U(e) {
			j.value.set(e.id, {
				pending: !0,
				label: null
			}), j.value = new Map(j.value);
			try {
				let t = await r.controller.test_provider_profile_connection(e.id), n = t.status === "success" ? `${y("status.success")} · ${y("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : y("errors.connection_test_failed", { code: t.error.code });
				j.value.set(e.id, {
					pending: !1,
					label: n
				});
			} catch {
				j.value.set(e.id, {
					pending: !1,
					label: y("errors.unexpected")
				});
			}
			j.value = new Map(j.value);
		}
		return (t, n) => (a(), c("div", {
			class: p(_(B).section),
			"data-testid": "provider-profiles"
		}, [
			m("div", { class: p(_(B).section_header) }, [m("h2", { class: p(_(B).section_title) }, u(_(y)("settings.sections.provider_profiles")), 3), x(C, {
				label: _(y)("settings.provider_profiles.add_action"),
				onClick: L
			}, null, 8, ["label"])], 2),
			x(w, {
				status: e.profiles.length === 0 ? "empty" : "ready",
				"empty-message": _(y)("settings.provider_profiles.empty_description")
			}, {
				default: o(() => [m("div", null, [(a(!0), c(v, null, i(e.profiles, (e) => (a(), c("div", {
					key: e.id,
					class: p(_(B).profile_row),
					"data-testid": "provider-profile-row"
				}, [m("div", { class: p(_(B).profile_identity) }, [
					m("span", { class: p(_(B).profile_name) }, u(e.display_name), 3),
					m("span", { class: p(_(B).profile_meta) }, u(_($)(_(y), e.provider_id)), 3),
					j.value.get(e.id)?.label ? (a(), c("span", {
						key: 0,
						class: p(_(B).profile_meta),
						"data-testid": "profile-test-result"
					}, u(j.value.get(e.id)?.label), 3)) : d("", !0)
				], 2), m("div", { class: p(_(B).profile_actions) }, [
					e.is_default ? (a(), c("span", {
						key: 0,
						class: p(_(B).badge)
					}, u(_(y)("settings.provider_profiles.default_badge")), 3)) : d("", !0),
					x(C, {
						label: _(y)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: j.value.get(e.id)?.pending === !0,
						onClick: (t) => U(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					x(C, {
						label: _(y)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => R(e)
					}, null, 8, ["label", "onClick"]),
					x(C, {
						label: _(y)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => H(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			x(T, {
				open: b.value,
				title: S.value?.is_new ? _(y)("settings.provider_profiles.dialog_add_title") : _(y)("settings.provider_profiles.dialog_edit_title"),
				"close-label": _(y)("common.actions.close"),
				"onUpdate:open": n[6] ||= (e) => !e && z()
			}, {
				default: o(() => [S.value ? (a(), c("div", {
					key: 0,
					class: p(_(B).form_grid)
				}, [
					x(D, {
						label: _(y)("common.labels.name"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => S.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: p(_(B).typed_confirm_input)
						}, null, 10, se), [[l, S.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					x(D, {
						label: _(y)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [x(N, {
							id: e,
							modelValue: I.value,
							"onUpdate:modelValue": n[1] ||= (e) => I.value = e,
							options: _(M),
							placeholder: _(y)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					x(D, {
						label: _(y)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
							id: e,
							"onUpdate:modelValue": n[2] ||= (e) => S.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: p(_(B).typed_confirm_input),
							"data-testid": "provider-model-input"
						}, null, 10, ce), [[l, S.value.model_id]])]),
						_: 1
					}, 8, ["label"]),
					S.value.provider_id === "comfyui" ? (a(), f(D, {
						key: 0,
						label: _(y)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => S.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: p(_(B).typed_confirm_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, le), [[l, S.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : d("", !0),
					x(D, {
						label: _(y)("settings.gateway.token_secret_label"),
						hint: _(y)("provider.credentials.not_stored_locally")
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [s(m("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => S.value.secret_reference = e,
							type: "text",
							"aria-describedby": t,
							class: p(_(B).typed_confirm_input)
						}, null, 10, ue), [[l, S.value.secret_reference]])]),
						_: 1
					}, 8, ["label", "hint"]),
					x(F, {
						modelValue: S.value.is_default,
						"onUpdate:modelValue": n[5] ||= (e) => S.value.is_default = e,
						label: _(y)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					O.value ? (a(), c("p", {
						key: 1,
						class: p([_(B).status_text, _(B).description]),
						"data-tone": "error"
					}, u(O.value), 3)) : d("", !0),
					m("div", { class: p(_(B).actions_row) }, [x(C, {
						label: _(y)("common.actions.save"),
						pending: E.value,
						onClick: V
					}, null, 8, ["label", "pending"]), x(C, {
						label: _(y)("common.actions.cancel"),
						variant: "secondary",
						onClick: z
					}, null, 8, ["label"])], 2)
				], 2)) : d("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			x(P, {
				open: k.value !== null,
				title: _(y)("settings.provider_profiles.remove_confirm_title", { name: k.value?.display_name ?? "" }),
				description: _(y)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": _(y)("confirmations.destructive.default_confirm_action"),
				"cancel-label": _(y)("confirmations.destructive.default_cancel_action"),
				pending: A.value,
				"onUpdate:open": n[7] ||= (e) => !e && (k.value = null),
				onConfirm: ee
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
}), fe = { class: "tc-visually-hidden" }, pe = /* @__PURE__ */ b({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let { t } = h();
		return (n, r) => (a(), c("div", {
			class: p(_(B).view),
			"data-testid": "settings-view"
		}, [
			m("h1", fe, u(_(t)("nav.settings")), 1),
			x(de, {
				profiles: e.state.workbench.profiles,
				controller: e.controller
			}, null, 8, ["profiles", "controller"]),
			x(Q, {
				connections: e.state.llm_connections.connections,
				loading: e.state.loading.has("llm_connections"),
				controller: e.controller
			}, null, 8, [
				"connections",
				"loading",
				"controller"
			]),
			x(re, {
				settings: e.state.settings.settings,
				"connection-test-command": e.state.diagnostics.connection_test_command,
				controller: e.controller
			}, null, 8, [
				"settings",
				"connection-test-command",
				"controller"
			]),
			x(H, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			x(V, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			x(W, {
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
export { pe as default };
