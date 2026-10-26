import { a as e } from "./ids-CQF5rr2J.js";
import { n as t } from "./llm_connection-BJrh9qUU.js";
import { F as n, G as r, N as i, V as a, W as o, _ as s, a as c, ct as l, et as u, g as d, h as f, m as p, n as m, p as h, pt as g, s as _, u as v, ut as y, v as b, x, y as S } from "./vue-i18n-DUz2Gjn8.js";
import { n as C, t as w } from "./AppIcon-Cnhzrx9o.js";
import { t as T } from "./cable-DOLYmQWA.js";
import { n as E, t as D } from "./StateSurface-Bo_sA18G.js";
import { n as O, t as k } from "./NumberStepper-zIDhvMwB.js";
import { t as A } from "./FieldGroup-LDtWeac7.js";
import "./browser_secret_vault-_O6KgM_S.js";
import { a as j, n as M, o as N, r as P } from "./http_acknowledgment-BICa1SvS.js";
import { t as F } from "./AppSelect-CJ-1Hi5_.js";
import { n as I } from "./_prop_utils-DtjJGT5O.js";
import { t as L } from "./AppSwitch-w_KIxpNZ.js";
import { t as R } from "./SegmentedControl-CR6qvbSJ.js";
import { t as z } from "./MigrationStatus-BX0VIoDk.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/circle-check.js
var B = C("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), V = C("triangle-alert", [
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
]), H = {
	view: "_view_19ffo_7",
	onboarding: "_onboarding_19ffo_16",
	onboarding_icon: "_onboarding_icon_19ffo_25",
	onboarding_label: "_onboarding_label_19ffo_37",
	onboarding_title: "_onboarding_title_19ffo_44",
	onboarding_description: "_onboarding_description_19ffo_51",
	section: "_section_19ffo_70",
	section_header: "_section_header_19ffo_79",
	section_title: "_section_title_19ffo_89",
	row: "_row_19ffo_95",
	row_label: "_row_label_19ffo_104",
	row_value: "_row_value_19ffo_112",
	profile_row: "_profile_row_19ffo_76",
	profile_identity: "_profile_identity_19ffo_120",
	profile_name: "_profile_name_19ffo_144",
	profile_meta: "_profile_meta_19ffo_151",
	profile_actions: "_profile_actions_19ffo_161",
	badge: "_badge_19ffo_169",
	form_grid: "_form_grid_19ffo_178",
	status_text: "_status_text_19ffo_184",
	risk_banner: "_risk_banner_19ffo_204",
	risk_banner_title: "_risk_banner_title_19ffo_218",
	risk_banner_description: "_risk_banner_description_19ffo_230",
	risk_banner_actions: "_risk_banner_actions_19ffo_237",
	acknowledged_note: "_acknowledged_note_19ffo_243",
	description: "_description_19ffo_251",
	actions_row: "_actions_row_19ffo_258",
	vault_mode_row: "_vault_mode_row_19ffo_264",
	vault_controls: "_vault_controls_19ffo_280",
	vault_unlocked_actions: "_vault_unlocked_actions_19ffo_291",
	typed_confirm_input: "_typed_confirm_input_19ffo_298"
}, U = /* @__PURE__ */ x({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = m(), r = {
			color_mode: "system",
			inspector_width: 320,
			inspector_collapsed: !1,
			optional_entry_enabled: !1
		};
		function a(e) {
			t.controller.update_settings({ ui: {
				...t.settings?.ui ?? r,
				...e
			} });
		}
		let o = h(() => [
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
		]), c = h(() => [
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
		function d(e) {
			(e === "auto" || e === "zh-CN" || e === "en") && t.controller.update_settings({ locale: e });
		}
		function f(e) {
			t.controller.set_inspector_width(e), a({ inspector_width: e });
		}
		return (t, r) => (i(), s("div", {
			class: y(l(H).section),
			"data-testid": "appearance-settings"
		}, [p("div", { class: y(l(H).section_header) }, [p("h2", { class: y(l(H).section_title) }, g(l(n)("settings.sections.appearance")), 3)], 2), p("div", { class: y(l(H).form_grid) }, [
			p("div", { class: y(l(H).row) }, [p("span", { class: y(l(H).row_label) }, g(l(n)("settings.appearance.theme_label")), 3), S(R, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: o.value,
				label: l(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": u
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			p("div", { class: y(l(H).row) }, [p("span", { class: y(l(H).row_label) }, g(l(n)("settings.appearance.language_label")), 3), S(R, {
				"model-value": e.settings?.locale ?? "auto",
				options: c.value,
				label: l(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": d
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			p("div", { class: y(l(H).row) }, [p("span", { class: y(l(H).row_label) }, g(l(n)("settings.appearance.inspector_width_label")), 3), S(k, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: l(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": l(n)("common.actions.increase"),
				"decrement-label": l(n)("common.actions.decrease"),
				"onUpdate:modelValue": f
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			S(L, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: l(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => a({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), W = /* @__PURE__ */ x({
	__name: "AutomationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = m();
		function r(e) {
			t.controller.update_settings(e);
		}
		let a = h(() => t.settings?.global_concurrency);
		return (t, o) => (i(), s("div", {
			class: y(l(H).section),
			"data-testid": "automation-settings"
		}, [p("div", { class: y(l(H).section_header) }, [p("h2", { class: y(l(H).section_title) }, g(l(n)("settings.sections.automation")), 3)], 2), p("div", { class: y(l(H).form_grid) }, [
			S(L, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: l(n)("settings.automation.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[0] ||= (e) => r({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			S(L, {
				"model-value": e.settings?.fallback_generation_enabled ?? !1,
				label: l(n)("settings.automation.fallback_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[1] ||= (e) => r({ fallback_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			p("div", { class: y(l(H).row) }, [p("span", { class: y(l(H).row_label) }, g(l(n)("settings.automation.global_concurrency_label")), 3), S(k, {
				"model-value": a.value,
				label: l(n)("settings.automation.global_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": l(n)("common.actions.increase"),
				"decrement-label": l(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[2] ||= (e) => r({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			p("div", { class: y(l(H).row) }, [p("span", { class: y(l(H).row_label) }, g(l(n)("settings.automation.provider_concurrency_label")), 3), S(k, {
				"model-value": 1,
				label: l(n)("settings.automation.provider_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": l(n)("common.actions.increase"),
				"decrement-label": l(n)("common.actions.decrease"),
				disabled: "",
				"data-testid": "provider-concurrency-stepper"
			}, null, 8, [
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			p("p", { class: y(l(H).description) }, g(l(n)("errors.capability_blocked", { capability: l(n)("settings.automation.provider_concurrency_label") })), 3)
		], 2)], 2));
	}
}), ee = ["aria-label"], te = ["aria-label"], ne = [
	"id",
	"aria-describedby",
	"placeholder"
], G = /* @__PURE__ */ x({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		migration: {},
		migrationRetryCommand: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = m(), a = h(() => n("settings.data.manual_cleanup.confirm_phrase")), _ = u(!1), v = [{
			value: "bundled",
			label: n("settings.data.vocabulary_channel_bundled")
		}, {
			value: "remote",
			label: n("settings.data.vocabulary_channel_https")
		}];
		async function b(e) {
			if (!(e !== "bundled" && e !== "remote" || _.value)) {
				_.value = !0;
				try {
					await t.controller.set_vocabulary_update_channel(e);
				} finally {
					_.value = !1;
				}
			}
		}
		let x = u(!1), C = u(!1), w = u(null), T = u(null), D = u(null);
		function k() {
			D.value?.click();
		}
		function j() {
			t.controller.cancel_vocabulary_import();
		}
		async function M(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || x.value)) {
				x.value = !0, C.value = !1, w.value = null, T.value = null;
				try {
					await t.controller.import_vocabulary_package(i, (e) => {
						T.value = e;
					}), C.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					w.value = n("settings.data.vocabulary_import_error", { code: t });
				} finally {
					x.value = !1;
				}
			}
		}
		let N = h(() => {
			let e = T.value;
			if (e === null) return null;
			switch (e.phase) {
				case "reading": return n("settings.data.vocabulary_import.progress_reading", {
					received: e.received_bytes,
					total: e.total_bytes
				});
				case "batch": return n("settings.data.vocabulary_import.progress_batch", {
					current: e.batch_index + 1,
					total: e.batch_count
				});
				case "indexing": return n("settings.data.vocabulary_import.progress_indexing");
				case "staging_shard": return n("settings.data.vocabulary_import.progress_staging", {
					current: e.shard_index + 1,
					total: e.shard_count
				});
				case "activating": return n("settings.data.vocabulary_import.progress_activating");
				case "complete": return n("settings.data.vocabulary_import.progress_complete", { count: e.record_count });
				case "cancelled": return n("settings.data.vocabulary_import.progress_cancelled");
			}
		}), P = u(!1), F = u(!1), I = u(null);
		async function L() {
			if (!P.value) {
				P.value = !0, I.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "tavern-canvas-archive.json", r.click(), URL.revokeObjectURL(n), F.value = !0;
				} catch {
					I.value = n("errors.unexpected");
				} finally {
					P.value = !1;
				}
			}
		}
		let B = u(!1), V = u(null), U = u(null);
		function W() {
			U.value?.click();
		}
		async function G(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || B.value)) {
				B.value = !0, V.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					V.value = n("errors.unexpected");
				} finally {
					B.value = !1;
				}
			}
		}
		function K() {
			t.controller.retry_migration();
		}
		let q = u(!1);
		function re() {
			q.value = !q.value;
		}
		let J = h(() => Object.values(t.migration?.counts ?? {}).reduce((e, t) => e + t, 0)), ie = h(() => n("settings.data.manual_cleanup.record_summary", J.value, { named: {
			count: J.value,
			bytes: n("settings.data.manual_cleanup.bytes_unavailable")
		} })), Y = h(() => t.migration?.state === "completed" || F.value), X = u(!1), Z = u(""), Q = u(!1), $ = u(null);
		function ae() {
			Z.value = "", $.value = null, X.value = !0;
		}
		function oe() {
			X.value = !1, Z.value = "";
		}
		async function se() {
			if (!(Z.value !== a.value || Q.value)) {
				Q.value = !0, $.value = null;
				try {
					await t.controller.confirm_legacy_cleanup(Z.value), X.value = !1;
				} catch {
					$.value = n("errors.unexpected");
				} finally {
					Q.value = !1;
				}
			}
		}
		return (t, u) => (i(), s("div", {
			class: y(l(H).section),
			"data-testid": "data-settings"
		}, [
			p("div", { class: y(l(H).section_header) }, [p("h2", { class: y(l(H).section_title) }, g(l(n)("settings.sections.data")), 3)], 2),
			p("div", { class: y(l(H).form_grid) }, [
				p("div", { class: y(l(H).row) }, [p("span", { class: y(l(H).row_label) }, g(l(n)("settings.data.vocabulary_channel_label")), 3), S(R, {
					"model-value": e.vocabularyUpdateChannel ?? "bundled",
					options: v,
					label: l(n)("settings.data.vocabulary_channel_label"),
					disabled: _.value,
					"onUpdate:modelValue": b
				}, null, 8, [
					"model-value",
					"label",
					"disabled"
				])], 2),
				p("div", { class: y(l(H).actions_row) }, [
					S(E, {
						label: l(n)("settings.data.vocabulary_import.action"),
						variant: "secondary",
						pending: x.value,
						onClick: k
					}, null, 8, ["label", "pending"]),
					x.value ? (i(), f(E, {
						key: 0,
						label: l(n)("settings.data.vocabulary_import.cancel_action"),
						variant: "destructive",
						onClick: j
					}, null, 8, ["label"])) : d("", !0),
					p("input", {
						ref_key: "vocabulary_file_input",
						ref: D,
						type: "file",
						accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
						class: "tc-visually-hidden",
						"aria-label": l(n)("settings.data.vocabulary_import.action"),
						"data-testid": "vocabulary-import-input",
						onChange: M
					}, null, 40, ee)
				], 2),
				p("p", { class: y(l(H).description) }, g(l(n)("settings.data.vocabulary_import.description")), 3),
				N.value ? (i(), s("p", {
					key: 0,
					class: y([l(H).status_text, l(H).description]),
					"data-testid": "vocabulary-import-progress"
				}, g(N.value), 3)) : d("", !0),
				C.value ? (i(), s("p", {
					key: 1,
					class: y([l(H).status_text, l(H).description]),
					"data-tone": "success",
					"data-testid": "vocabulary-import-success"
				}, g(l(n)("settings.data.vocabulary_import.success")), 3)) : d("", !0),
				w.value ? (i(), s("p", {
					key: 2,
					class: y([l(H).status_text, l(H).description]),
					"data-tone": "error",
					"data-testid": "vocabulary-import-error"
				}, g(w.value), 3)) : d("", !0),
				p("div", { class: y(l(H).actions_row) }, [
					S(E, {
						label: l(n)("settings.data.archive_export_action"),
						pending: P.value,
						onClick: L
					}, null, 8, ["label", "pending"]),
					S(E, {
						label: l(n)("settings.data.archive_import_action"),
						variant: "secondary",
						pending: B.value,
						onClick: W
					}, null, 8, ["label", "pending"]),
					p("input", {
						ref_key: "file_input",
						ref: U,
						type: "file",
						accept: "application/json",
						class: "tc-visually-hidden",
						"aria-label": l(n)("settings.data.archive_import_action"),
						"data-testid": "archive-import-input",
						onChange: G
					}, null, 40, te)
				], 2),
				p("p", { class: y(l(H).description) }, g(l(n)("settings.data.archive_import_description")), 3),
				I.value ? (i(), s("p", {
					key: 3,
					class: y([l(H).status_text, l(H).description]),
					"data-tone": "error"
				}, g(I.value), 3)) : d("", !0),
				V.value ? (i(), s("p", {
					key: 4,
					class: y([l(H).status_text, l(H).description]),
					"data-tone": "error"
				}, g(V.value), 3)) : d("", !0),
				p("div", { class: y(l(H).actions_row) }, [S(E, {
					label: l(n)("settings.data.migration_retry_action"),
					pending: e.migrationRetryCommand.status === "pending",
					onClick: K
				}, null, 8, ["label", "pending"]), S(E, {
					label: l(n)("settings.data.migration_report_action"),
					variant: "secondary",
					onClick: re
				}, null, 8, ["label"])], 2),
				q.value ? (i(), f(z, {
					key: 5,
					snapshot: e.migration
				}, null, 8, ["snapshot"])) : d("", !0),
				p("div", {
					class: y(l(H).section),
					"data-testid": "manual-cleanup"
				}, [
					p("div", { class: y(l(H).section_header) }, [p("h3", { class: y(l(H).section_title) }, g(l(n)("settings.data.manual_cleanup.title")), 3)], 2),
					p("p", { class: y(l(H).description) }, g(l(n)("settings.data.manual_cleanup.description")), 3),
					p("div", { class: y(l(H).row) }, [p("span", { class: y(l(H).row_label) }, g(l(n)("diagnostics.migration_status.counts_label")), 3), p("span", { class: y(["tc-tabular-nums", l(H).row_value]) }, g(ie.value), 3)], 2),
					Y.value ? d("", !0) : (i(), s("p", {
						key: 0,
						class: y(l(H).description),
						"data-testid": "cleanup-locked"
					}, g(l(n)("settings.data.manual_cleanup.unlock_hint")), 3)),
					p("div", { class: y(l(H).actions_row) }, [S(E, {
						label: l(n)("settings.data.manual_cleanup.confirm_action"),
						variant: "destructive",
						disabled: !Y.value,
						"data-testid": "manual-cleanup-action",
						onClick: ae
					}, null, 8, ["label", "disabled"])], 2)
				], 2)
			], 2),
			S(O, {
				open: X.value,
				title: l(n)("settings.data.manual_cleanup.title"),
				description: l(n)("confirmations.destructive.irreversible_note"),
				"close-label": l(n)("common.actions.close"),
				"onUpdate:open": u[1] ||= (e) => !e && oe()
			}, {
				default: o(() => [S(A, {
					label: l(n)("confirmations.typed_confirmation.label", { phrase: a.value }),
					error: Z.value.length > 0 && Z.value !== a.value ? l(n)("confirmations.typed_confirmation.mismatch", { phrase: a.value }) : $.value
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
						id: e,
						"onUpdate:modelValue": u[0] ||= (e) => Z.value = e,
						type: "text",
						"aria-describedby": t,
						class: y(l(H).typed_confirm_input),
						placeholder: l(n)("confirmations.typed_confirmation.placeholder"),
						"data-testid": "cleanup-confirm-input"
					}, null, 10, ne), [[c, Z.value]])]),
					_: 1
				}, 8, ["label", "error"]), p("div", { class: y(l(H).actions_row) }, [S(E, {
					label: l(n)("settings.data.manual_cleanup.confirm_action"),
					variant: "destructive",
					pending: Q.value,
					disabled: Z.value !== a.value,
					onClick: se
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]), S(E, {
					label: l(n)("confirmations.destructive.default_cancel_action"),
					variant: "secondary",
					onClick: oe
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
}), K = ["data-tone"], q = ["id", "aria-describedby"], re = ["id", "aria-describedby"], J = ["id", "aria-describedby"], ie = /* @__PURE__ */ x({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = m(), a = u(""), f = u(""), b = u(!1), x = u(null), C = u(!1), w = h(() => [{
			value: "host",
			label: n("settings.credential_storage.modes.host")
		}, {
			value: "browser_encrypted",
			label: n("settings.credential_storage.modes.browser_encrypted")
		}]), T = h({
			get: () => t.settings?.credential_storage_mode ?? "host",
			set: (e) => {
				x.value = null, t.controller.update_settings({ credential_storage_mode: e }).catch(() => {
					x.value = n("errors.unexpected");
				});
			}
		}), D = h(() => {
			let e = { count: t.vaultStatus.secret_count };
			switch (t.vaultStatus.state) {
				case "unavailable": return n("settings.credential_storage.states.unavailable", e);
				case "error": return n("settings.credential_storage.states.error", e);
				case "uninitialized": return n("settings.credential_storage.states.uninitialized", e);
				case "locked": return n("settings.credential_storage.states.locked", e);
				case "unlocked": return n("settings.credential_storage.states.unlocked", e);
			}
		}), O = h(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function k() {
			a.value = "", f.value = "";
		}
		function j(e) {
			return a.value.length < 12 ? (x.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && a.value !== f.value ? (x.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function M(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function N() {
			if (!(b.value || !j(!0))) {
				b.value = !0, x.value = null;
				try {
					await t.controller.initialize_browser_secret_vault(a.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), k();
				} catch (e) {
					x.value = M(e);
				} finally {
					b.value = !1;
				}
			}
		}
		async function P() {
			if (!(b.value || !j(!1))) {
				b.value = !0, x.value = null;
				try {
					await t.controller.unlock_browser_secret_vault(a.value), k();
				} catch (e) {
					x.value = M(e);
				} finally {
					b.value = !1;
				}
			}
		}
		async function F() {
			if (!b.value) {
				b.value = !0, x.value = null;
				try {
					await t.controller.lock_browser_secret_vault(), k();
				} catch {
					x.value = n("errors.unexpected");
				} finally {
					b.value = !1;
				}
			}
		}
		async function L() {
			if (!b.value) {
				b.value = !0, x.value = null;
				try {
					await t.controller.reset_browser_secret_vault(), C.value = !1, k();
				} catch {
					x.value = n("errors.unexpected");
				} finally {
					b.value = !1;
				}
			}
		}
		return (t, u) => (i(), s("div", {
			class: y(l(H).section),
			"data-testid": "credential-storage-settings"
		}, [
			p("div", { class: y(l(H).section_header) }, [p("h2", { class: y(l(H).section_title) }, g(l(n)("settings.sections.credential_storage")), 3), T.value === "browser_encrypted" ? (i(), s("span", {
				key: 0,
				class: y(l(H).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, g(D.value), 11, K)) : d("", !0)], 2),
			p("div", { class: y(l(H).vault_mode_row) }, [p("div", { class: y(l(H).profile_identity) }, [p("span", { class: y(l(H).profile_name) }, g(l(n)("settings.credential_storage.mode_label")), 3), p("span", { class: y(l(H).profile_meta) }, g(l(n)("settings.credential_storage.mode_hint")), 3)], 2), S(R, {
				modelValue: T.value,
				"onUpdate:modelValue": u[0] ||= (e) => T.value = e,
				options: w.value,
				label: l(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			T.value === "browser_encrypted" ? (i(), s("div", {
				key: 0,
				class: y(l(H).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (i(), s("p", {
				key: 0,
				class: y(l(H).status_text),
				"data-tone": "error",
				role: "alert"
			}, g(O.value), 3)) : e.vaultStatus.state === "uninitialized" ? (i(), s(v, { key: 1 }, [
				S(A, {
					label: l(n)("settings.credential_storage.passphrase_label"),
					hint: l(n)("settings.credential_storage.passphrase_hint", { count: l(12) }),
					required: ""
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
						id: e,
						"onUpdate:modelValue": u[1] ||= (e) => a.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: y(l(H).typed_confirm_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, q), [[c, a.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				S(A, {
					label: l(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
						id: e,
						"onUpdate:modelValue": u[2] ||= (e) => f.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: y(l(H).typed_confirm_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, re), [[c, f.value]])]),
					_: 1
				}, 8, ["label"]),
				S(E, {
					label: l(n)("settings.credential_storage.initialize_action"),
					pending: b.value,
					onClick: N
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (i(), s(v, { key: 2 }, [S(A, {
				label: l(n)("settings.credential_storage.passphrase_label"),
				hint: l(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
					id: e,
					"onUpdate:modelValue": u[3] ||= (e) => a.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: y(l(H).typed_confirm_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: _(P, ["enter"])
				}, null, 42, J), [[c, a.value]])]),
				_: 1
			}, 8, ["label", "hint"]), S(E, {
				label: l(n)("settings.credential_storage.unlock_action"),
				pending: b.value,
				onClick: P
			}, null, 8, ["label", "pending"])], 64)) : (i(), s("div", {
				key: 3,
				class: y(l(H).vault_unlocked_actions)
			}, [S(E, {
				label: l(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: b.value,
				onClick: F
			}, null, 8, ["label", "pending"]), S(E, {
				label: l(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: u[4] ||= (e) => C.value = !0
			}, null, 8, ["label"])], 2)), x.value ? (i(), s("p", {
				key: 4,
				class: y(l(H).status_text),
				"data-tone": "error",
				role: "alert"
			}, g(x.value), 3)) : d("", !0)], 2)) : d("", !0),
			S(I, {
				open: C.value,
				title: l(n)("settings.credential_storage.reset_confirm_title"),
				description: l(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": l(n)("settings.credential_storage.reset_action"),
				"cancel-label": l(n)("common.actions.cancel"),
				pending: b.value,
				"onUpdate:open": u[5] ||= (e) => C.value = e,
				onConfirm: L
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
}), Y = ["id", "aria-describedby"], X = ["data-severity"], Z = ["id"], Q = ["id", "aria-describedby"], $ = /* @__PURE__ */ x({
	__name: "GatewaySettings",
	props: {
		settings: {},
		connectionTestCommand: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = m(), _ = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, v = u(t.settings?.gateway.endpoint ?? ""), x = u(null), C = u(!1), T = u(!1), D = u(""), O = u(!1), k = u(null);
		a(() => t.settings?.gateway.endpoint ?? "", (e) => {
			v.value = e;
		});
		let F = h(() => {
			let e = v.value.trim();
			if (e.length === 0) return null;
			try {
				if (!N(e)) return null;
				let n = j(e), r = M(n), i = P(t.settings?.gateway.http_acknowledgments ?? {}, n);
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
			if (C.value) return;
			let e = v.value.trim();
			if (x.value = null, e.length === 0) {
				C.value = !0;
				try {
					await t.controller.update_settings({ gateway: {
						...t.settings?.gateway ?? _,
						endpoint: null
					} });
				} finally {
					C.value = !1;
				}
				return;
			}
			let r;
			try {
				r = j(e);
			} catch {
				x.value = n("errors.validation_required");
				return;
			}
			C.value = !0;
			try {
				await t.controller.update_settings({ gateway: {
					...t.settings?.gateway ?? _,
					endpoint: r
				} });
			} finally {
				C.value = !1;
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
		async function R() {
			let e = D.value.trim();
			if (k.value = null, !(e.length === 0 || O.value)) {
				O.value = !0;
				try {
					await t.controller.set_gateway_token(e), D.value = "";
				} catch {
					k.value = n("settings.credential_storage.unlock_required");
				} finally {
					O.value = !1;
				}
			}
		}
		async function z() {
			if (!O.value) {
				O.value = !0, k.value = null;
				try {
					await t.controller.clear_gateway_token();
				} catch {
					k.value = n("settings.credential_storage.unlock_required");
				} finally {
					O.value = !1;
				}
			}
		}
		function U() {
			t.controller.test_diagnostics_connection();
		}
		let W = h(() => t.connectionTestCommand.status === "pending");
		return (t, a) => (i(), s("div", {
			class: y(l(H).section),
			"data-testid": "gateway-settings"
		}, [p("div", { class: y(l(H).section_header) }, [p("h2", { class: y(l(H).section_title) }, g(l(n)("settings.sections.gateway")), 3)], 2), p("div", { class: y(l(H).form_grid) }, [
			S(A, {
				label: l(n)("settings.gateway.endpoint_label"),
				hint: l(n)("settings.gateway.endpoint_hint"),
				error: x.value
			}, {
				default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
					id: e,
					"onUpdate:modelValue": a[0] ||= (e) => v.value = e,
					type: "text",
					"aria-describedby": t,
					class: y(l(H).typed_confirm_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: I
				}, null, 42, Y), [[c, v.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			F.value && !F.value.acknowledged ? (i(), s("div", {
				key: 0,
				class: y(l(H).risk_banner),
				"data-severity": F.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				p("div", { class: y(l(H).risk_banner_title) }, [S(w, {
					icon: l(V),
					size: 16
				}, null, 8, ["icon"]), b(" " + g(l(n)("settings.http_risk.warning_title")), 1)], 2),
				p("p", { class: y(l(H).risk_banner_description) }, g(F.value.severity === "error" ? l(n)("settings.http_risk.error_description_public", { origin: F.value.origin }) : l(n)("settings.http_risk.warning_description_local", { origin: F.value.origin })), 3),
				p("p", { class: y(l(H).risk_banner_description) }, g(l(n)("settings.http_risk.disclosure")), 3),
				p("div", { class: y(l(H).risk_banner_actions) }, [S(E, {
					label: l(n)("settings.http_risk.continue_action"),
					pending: T.value,
					onClick: L
				}, null, 8, ["label", "pending"])], 2)
			], 10, X)) : F.value && F.value.acknowledged ? (i(), s("div", {
				key: 1,
				class: y(l(H).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [S(w, {
				icon: l(B),
				size: 14
			}, null, 8, ["icon"]), b(" " + g(l(n)("settings.http_risk.acknowledged_label")), 1)], 2)) : d("", !0),
			p("div", { class: y(l(H).row) }, [p("span", { class: y(l(H).row_label) }, g(l(n)("settings.gateway.protocol_label")), 3), S(E, {
				label: l(n)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: W.value,
				onClick: U
			}, null, 8, ["label", "pending"])], 2),
			S(A, { label: l(n)("settings.gateway.token_secret_label") }, {
				default: o(({ fieldId: t }) => [p("span", {
					id: t,
					class: y(l(H).row_value),
					"data-testid": "gateway-token-reference"
				}, g(e.settings?.gateway.token_secret_id ?? l(n)("settings.gateway.token_not_set")), 11, Z)]),
				_: 1
			}, 8, ["label"]),
			S(A, {
				label: l(n)("settings.gateway.token_label"),
				hint: l(n)("settings.gateway.token_hint"),
				error: k.value
			}, {
				default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
					id: e,
					"onUpdate:modelValue": a[1] ||= (e) => D.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: y(l(H).typed_confirm_input),
					"data-testid": "gateway-token-input"
				}, null, 10, Q), [[c, D.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			p("div", { class: y(l(H).row) }, [S(E, {
				label: l(n)("settings.gateway.token_save_action"),
				pending: O.value,
				disabled: D.value.trim().length === 0,
				"data-testid": "gateway-token-save",
				onClick: R
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), e.settings?.gateway.token_secret_id ? (i(), f(E, {
				key: 0,
				label: l(n)("settings.gateway.token_clear_action"),
				variant: "secondary",
				pending: O.value,
				"data-testid": "gateway-token-clear",
				onClick: z
			}, null, 8, ["label", "pending"])) : d("", !0)], 2)
		], 2)], 2));
	}
}), ae = [
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
];
function oe(e, t) {
	switch (t) {
		case "openai_compatible": return e("settings.llm_connections.provider_kinds.openai_compatible");
		case "anthropic": return e("settings.llm_connections.provider_kinds.anthropic");
		case "google_generative": return e("settings.llm_connections.provider_kinds.google_generative");
		case "ollama": return e("settings.llm_connections.provider_kinds.ollama");
	}
}
function se(e) {
	return t[e].completion_routes;
}
//#endregion
//#region src/ui/views/settings/LlmConnections.vue?vue&type=script&setup=true&lang.ts
var ce = ["id", "aria-describedby"], le = ["id", "aria-describedby"], ue = ["id", "aria-describedby"], de = /* @__PURE__ */ x({
	__name: "LlmConnections",
	props: {
		connections: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: a } = m(), _ = u(!1), b = u(null), x = u(!1), C = u(null), w = u(null), T = u(null), j = u(null), M = u(!1), N = u(null), P = u(""), R = u(!1), z = u(null), B = u(/* @__PURE__ */ new Map()), V = h(() => ae.map((e) => ({
			value: e,
			label: oe(a, e)
		}))), U = h(() => se(b.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), W = h({
			get: () => b.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				b.value && (b.value.provider_kind = e, b.value.route = se(b.value.provider_kind)[0] ?? "");
			}
		}), ee = h({
			get: () => b.value?.route ?? "",
			set: (e) => {
				b.value && (b.value.route = e);
			}
		});
		function te() {
			b.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_kind: "openai_compatible",
				route: se("openai_compatible")[0] ?? "",
				display_name: "",
				model_id: "",
				temperature: .7,
				max_output_tokens: 2048,
				is_default: t.connections.length === 0
			}, G(), _.value = !0;
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
			}, G(), _.value = !0;
		}
		function G() {
			C.value = null, w.value = null, T.value = null;
		}
		function K() {
			_.value = !1, b.value = null, G();
		}
		async function q() {
			let e = b.value;
			if (!e || x.value) return;
			G();
			let n = e.display_name.trim(), r = e.model_id.trim();
			if (n.length === 0 && (C.value = a("errors.validation_required")), r.length === 0 && (w.value = a("errors.validation_required")), !(C.value || w.value)) {
				x.value = !0;
				try {
					await t.controller.save_llm_connection({
						id: e.id,
						display_name: n,
						provider_kind: e.provider_kind,
						route: e.route,
						model_id: r,
						temperature: e.temperature,
						max_output_tokens: e.max_output_tokens,
						is_default: e.is_default
					}), K();
				} catch {
					T.value = a("errors.unexpected");
				} finally {
					x.value = !1;
				}
			}
		}
		function re(e) {
			j.value = e;
		}
		async function J() {
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
		function ie(e) {
			N.value = e, P.value = "", z.value = null;
		}
		function Y() {
			N.value = null, P.value = "", z.value = null;
		}
		async function X() {
			let e = N.value;
			if (!(!e || R.value)) {
				if (P.value.trim().length === 0) {
					z.value = a("errors.validation_required");
					return;
				}
				R.value = !0, z.value = null;
				try {
					await t.controller.set_llm_connection_credential(e.id, P.value), Y();
				} catch {
					z.value = a("settings.credential_storage.unlock_required");
				} finally {
					R.value = !1, P.value = "";
				}
			}
		}
		async function Z(e) {
			try {
				await t.controller.clear_llm_connection_credential(e.id);
			} catch {
				N.value = e, P.value = "", z.value = a("settings.credential_storage.unlock_required");
			}
		}
		async function Q(e) {
			B.value = new Map(B.value).set(e.id, {
				pending: !0,
				label: null
			});
			let n;
			try {
				let r = await t.controller.test_llm_connection(e.id);
				n = r.status === "success" ? `${a("status.success")} · ${a("diagnostics.connection_tests.latency_label", { ms: r.latency_ms })}` : a("errors.connection_test_failed", { code: r.code });
			} catch {
				n = a("errors.unexpected");
			}
			B.value = new Map(B.value).set(e.id, {
				pending: !1,
				label: n
			});
		}
		return (t, u) => (i(), s("div", {
			class: y(l(H).section),
			"data-testid": "llm-connections"
		}, [
			p("div", { class: y(l(H).section_header) }, [p("h2", { class: y(l(H).section_title) }, g(l(a)("settings.sections.llm_connections")), 3), S(E, {
				label: l(a)("settings.llm_connections.add_action"),
				onClick: te
			}, null, 8, ["label"])], 2),
			p("p", { class: y(l(H).description) }, g(l(a)("settings.llm_connections.section_description")), 3),
			S(D, {
				status: e.loading ? "loading" : e.connections.length === 0 ? "empty" : "ready",
				"empty-message": l(a)("settings.llm_connections.empty_description")
			}, {
				action: o(() => [S(E, {
					label: l(a)("settings.llm_connections.add_action"),
					onClick: te
				}, null, 8, ["label"])]),
				default: o(() => [p("div", null, [(i(!0), s(v, null, n(e.connections, (e) => (i(), s("div", {
					key: e.id,
					class: y(l(H).profile_row),
					"data-testid": "llm-connection-row"
				}, [p("div", { class: y(l(H).profile_identity) }, [
					p("span", { class: y(l(H).profile_name) }, g(e.display_name), 3),
					p("span", { class: y(l(H).profile_meta) }, g(l(oe)(l(a), e.provider_kind)) + " · " + g(e.model_id), 3),
					p("span", {
						class: y(l(H).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, g(e.credential_reference ? l(a)("settings.llm_connections.credential_set") : l(a)("settings.llm_connections.credential_unset")), 3),
					B.value.get(e.id)?.label ? (i(), s("span", {
						key: 0,
						class: y(l(H).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, g(B.value.get(e.id)?.label), 3)) : d("", !0)
				], 2), p("div", { class: y(l(H).profile_actions) }, [
					e.is_default ? (i(), s("span", {
						key: 0,
						class: y(l(H).badge)
					}, g(l(a)("settings.llm_connections.default_badge")), 3)) : d("", !0),
					S(E, {
						label: l(a)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: B.value.get(e.id)?.pending === !0,
						onClick: (t) => Q(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					S(E, {
						label: l(a)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (t) => ie(e)
					}, null, 8, ["label", "onClick"]),
					e.credential_reference ? (i(), f(E, {
						key: 1,
						label: l(a)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => Z(e)
					}, null, 8, ["label", "onClick"])) : d("", !0),
					S(E, {
						label: l(a)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => ne(e)
					}, null, 8, ["label", "onClick"]),
					S(E, {
						label: l(a)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => re(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			S(O, {
				open: _.value,
				title: b.value?.is_new ? l(a)("settings.llm_connections.dialog_add_title") : l(a)("settings.llm_connections.dialog_edit_title"),
				description: l(a)("settings.llm_connections.dialog_description"),
				"close-label": l(a)("common.actions.close"),
				"onUpdate:open": u[7] ||= (e) => !e && K()
			}, {
				default: o(() => [b.value ? (i(), s("div", {
					key: 0,
					class: y(l(H).form_grid)
				}, [
					S(A, {
						label: l(a)("common.labels.name"),
						error: C.value,
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": u[0] ||= (e) => b.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: y(l(H).typed_confirm_input)
						}, null, 10, ce), [[c, b.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					S(A, {
						label: l(a)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [S(F, {
							id: e,
							modelValue: W.value,
							"onUpdate:modelValue": u[1] ||= (e) => W.value = e,
							options: V.value,
							placeholder: l(a)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					S(A, {
						label: l(a)("settings.llm_connections.route_label"),
						hint: l(a)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [S(F, {
							id: e,
							modelValue: ee.value,
							"onUpdate:modelValue": u[2] ||= (e) => ee.value = e,
							options: U.value,
							placeholder: l(a)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					S(A, {
						label: l(a)("settings.llm_connections.model_label"),
						hint: l(a)("settings.llm_connections.model_hint"),
						error: w.value,
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": u[3] ||= (e) => b.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: y(l(H).typed_confirm_input)
						}, null, 10, le), [[c, b.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					S(A, {
						label: l(a)("settings.llm_connections.temperature_label"),
						hint: l(a)("settings.llm_connections.temperature_hint")
					}, {
						default: o(() => [S(k, {
							modelValue: b.value.temperature,
							"onUpdate:modelValue": u[4] ||= (e) => b.value.temperature = e,
							label: l(a)("settings.llm_connections.temperature_label"),
							"increment-label": l(a)("common.actions.increase"),
							"decrement-label": l(a)("common.actions.decrease"),
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
					S(A, { label: l(a)("settings.llm_connections.max_output_tokens_label") }, {
						default: o(() => [S(k, {
							modelValue: b.value.max_output_tokens,
							"onUpdate:modelValue": u[5] ||= (e) => b.value.max_output_tokens = e,
							label: l(a)("settings.llm_connections.max_output_tokens_label"),
							"increment-label": l(a)("common.actions.increase"),
							"decrement-label": l(a)("common.actions.decrease"),
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
					S(L, {
						modelValue: b.value.is_default,
						"onUpdate:modelValue": u[6] ||= (e) => b.value.is_default = e,
						label: l(a)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					T.value ? (i(), s("p", {
						key: 0,
						class: y([l(H).status_text, l(H).description]),
						"data-tone": "error"
					}, g(T.value), 3)) : d("", !0),
					p("div", { class: y(l(H).actions_row) }, [S(E, {
						label: l(a)("common.actions.save"),
						pending: x.value,
						onClick: q
					}, null, 8, ["label", "pending"]), S(E, {
						label: l(a)("common.actions.cancel"),
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
			S(O, {
				open: N.value !== null,
				title: l(a)("settings.llm_connections.credential_dialog_title"),
				description: l(a)("settings.llm_connections.credential_dialog_description"),
				"close-label": l(a)("common.actions.close"),
				"onUpdate:open": u[9] ||= (e) => !e && Y()
			}, {
				default: o(() => [p("div", { class: y(l(H).form_grid) }, [S(A, {
					label: l(a)("settings.llm_connections.credential_label"),
					hint: l(a)("provider.credentials.not_stored_locally"),
					error: z.value,
					required: ""
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
						id: e,
						"onUpdate:modelValue": u[8] ||= (e) => P.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: y(l(H).typed_confirm_input),
						"data-testid": "llm-credential-input"
					}, null, 10, ue), [[c, P.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), p("div", { class: y(l(H).actions_row) }, [S(E, {
					label: l(a)("common.actions.save"),
					pending: R.value,
					onClick: X
				}, null, 8, ["label", "pending"]), S(E, {
					label: l(a)("common.actions.cancel"),
					variant: "secondary",
					onClick: Y
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			S(I, {
				open: j.value !== null,
				title: l(a)("settings.llm_connections.remove_confirm_title", { name: j.value?.display_name ?? "" }),
				description: l(a)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": l(a)("confirmations.destructive.default_confirm_action"),
				"cancel-label": l(a)("confirmations.destructive.default_cancel_action"),
				pending: M.value,
				"onUpdate:open": u[10] ||= (e) => !e && (j.value = null),
				onConfirm: J
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
}), fe = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function pe(e, t) {
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
var me = ["id", "aria-describedby"], he = ["id", "aria-describedby"], ge = ["id", "aria-describedby"], _e = ["id", "aria-describedby"], ve = /* @__PURE__ */ x({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		controller: {}
	},
	setup(t) {
		let a = t, { t: _ } = m(), b = u(!1), x = u(null), C = u(!1), w = u(null), T = u(null), k = u(!1), j = u(null), M = u(""), N = u(!1), P = u(null), R = u(/* @__PURE__ */ new Map()), z = fe.map((e) => ({
			value: e,
			label: pe(_, e)
		})), B = h({
			get: () => x.value?.provider_id ?? "sd_webui",
			set: (e) => {
				x.value && (x.value.provider_id = e, x.value.workflow_id = "");
			}
		});
		function V() {
			x.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				model_id: "",
				workflow_id: "",
				is_default: a.profiles.length === 0
			}, w.value = null, b.value = !0;
		}
		function U(e) {
			x.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				is_default: e.is_default
			}, w.value = null, b.value = !0;
		}
		function W() {
			b.value = !1, x.value = null, w.value = null;
		}
		async function ee() {
			let t = x.value;
			if (!t || C.value) return;
			let n = t.display_name.trim(), r = t.model_id.trim(), i = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (n.length === 0 || r.length === 0 || t.provider_id === "comfyui" && i?.success !== !0) {
				w.value = _("errors.validation_required");
				return;
			}
			C.value = !0, w.value = null;
			try {
				await a.controller.save_provider_profile({
					id: t.id,
					provider_id: t.provider_id,
					display_name: n,
					model_id: r,
					workflow_id: t.provider_id === "comfyui" && i?.success === !0 ? i.data : null,
					is_default: t.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}), W();
			} catch {
				w.value = _("errors.unexpected");
			} finally {
				C.value = !1;
			}
		}
		function te(e) {
			T.value = e;
		}
		async function ne() {
			let e = T.value;
			if (!(!e || k.value)) {
				k.value = !0;
				try {
					await a.controller.remove_provider_profile(e.id), T.value = null;
				} finally {
					k.value = !1;
				}
			}
		}
		function G(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function K(e) {
			j.value = e, M.value = "", P.value = null;
		}
		function q() {
			j.value = null, M.value = "", P.value = null;
		}
		async function re() {
			let e = j.value;
			if (!(!e || N.value)) {
				if (M.value.trim().length === 0) {
					P.value = _("errors.validation_required");
					return;
				}
				N.value = !0, P.value = null;
				try {
					await a.controller.set_provider_profile_credential(e.id, M.value), q();
				} catch {
					P.value = _("settings.credential_storage.unlock_required");
				} finally {
					N.value = !1, M.value = "";
				}
			}
		}
		async function J(e) {
			try {
				await a.controller.clear_provider_profile_credential(e.id);
			} catch {
				j.value = e, M.value = "", P.value = _("settings.credential_storage.unlock_required");
			}
		}
		async function ie(e) {
			R.value.set(e.id, {
				pending: !0,
				label: null
			}), R.value = new Map(R.value);
			try {
				let t = await a.controller.test_provider_profile_connection(e.id), n = t.status === "success" ? `${_("status.success")} · ${_("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : _("errors.connection_test_failed", { code: t.error.code });
				R.value.set(e.id, {
					pending: !1,
					label: n
				});
			} catch {
				R.value.set(e.id, {
					pending: !1,
					label: _("errors.unexpected")
				});
			}
			R.value = new Map(R.value);
		}
		return (e, a) => (i(), s("div", {
			class: y(l(H).section),
			"data-testid": "provider-profiles"
		}, [
			p("div", { class: y(l(H).section_header) }, [p("h2", { class: y(l(H).section_title) }, g(l(_)("settings.sections.provider_profiles")), 3), S(E, {
				label: l(_)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: V
			}, null, 8, ["label", "variant"])], 2),
			S(D, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": l(_)("settings.provider_profiles.empty_description")
			}, {
				default: o(() => [p("div", null, [(i(!0), s(v, null, n(t.profiles, (e) => (i(), s("div", {
					key: e.id,
					class: y(l(H).profile_row),
					"data-testid": "provider-profile-row"
				}, [p("div", { class: y(l(H).profile_identity) }, [
					p("span", { class: y(l(H).profile_name) }, g(e.display_name), 3),
					p("span", { class: y(l(H).profile_meta) }, g(l(pe)(l(_), e.provider_id)), 3),
					G(e.provider_id) ? (i(), s("span", {
						key: 0,
						class: y(l(H).profile_meta)
					}, g(e.credential_reference ? l(_)("settings.provider_profiles.credential_set") : l(_)("settings.provider_profiles.credential_unset")), 3)) : d("", !0),
					R.value.get(e.id)?.label ? (i(), s("span", {
						key: 1,
						class: y(l(H).profile_meta),
						"data-testid": "profile-test-result"
					}, g(R.value.get(e.id)?.label), 3)) : d("", !0)
				], 2), p("div", { class: y(l(H).profile_actions) }, [
					e.is_default ? (i(), s("span", {
						key: 0,
						class: y(l(H).badge)
					}, g(l(_)("settings.provider_profiles.default_badge")), 3)) : d("", !0),
					S(E, {
						label: l(_)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: R.value.get(e.id)?.pending === !0,
						onClick: (t) => ie(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					G(e.provider_id) ? (i(), f(E, {
						key: 1,
						label: l(_)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => K(e)
					}, null, 8, ["label", "onClick"])) : d("", !0),
					G(e.provider_id) && e.credential_reference !== null ? (i(), f(E, {
						key: 2,
						label: l(_)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => J(e)
					}, null, 8, ["label", "onClick"])) : d("", !0),
					S(E, {
						label: l(_)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => U(e)
					}, null, 8, ["label", "onClick"]),
					S(E, {
						label: l(_)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => te(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			S(O, {
				open: b.value,
				title: x.value?.is_new ? l(_)("settings.provider_profiles.dialog_add_title") : l(_)("settings.provider_profiles.dialog_edit_title"),
				"close-label": l(_)("common.actions.close"),
				"onUpdate:open": a[5] ||= (e) => !e && W()
			}, {
				default: o(() => [x.value ? (i(), s("div", {
					key: 0,
					class: y(l(H).form_grid)
				}, [
					S(A, {
						label: l(_)("common.labels.name"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": a[0] ||= (e) => x.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: y(l(H).typed_confirm_input)
						}, null, 10, me), [[c, x.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					S(A, {
						label: l(_)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [S(F, {
							id: e,
							modelValue: B.value,
							"onUpdate:modelValue": a[1] ||= (e) => B.value = e,
							options: l(z),
							placeholder: l(_)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					S(A, {
						label: l(_)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": a[2] ||= (e) => x.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: y(l(H).typed_confirm_input),
							"data-testid": "provider-model-input"
						}, null, 10, he), [[c, x.value.model_id]])]),
						_: 1
					}, 8, ["label"]),
					x.value.provider_id === "comfyui" ? (i(), f(A, {
						key: 0,
						label: l(_)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": a[3] ||= (e) => x.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: y(l(H).typed_confirm_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, ge), [[c, x.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : d("", !0),
					S(L, {
						modelValue: x.value.is_default,
						"onUpdate:modelValue": a[4] ||= (e) => x.value.is_default = e,
						label: l(_)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					w.value ? (i(), s("p", {
						key: 1,
						class: y([l(H).status_text, l(H).description]),
						"data-tone": "error"
					}, g(w.value), 3)) : d("", !0),
					p("div", { class: y(l(H).actions_row) }, [S(E, {
						label: l(_)("common.actions.save"),
						pending: C.value,
						onClick: ee
					}, null, 8, ["label", "pending"]), S(E, {
						label: l(_)("common.actions.cancel"),
						variant: "secondary",
						onClick: W
					}, null, 8, ["label"])], 2)
				], 2)) : d("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			S(O, {
				open: j.value !== null,
				title: l(_)("settings.provider_profiles.credential_dialog_title", { name: j.value?.display_name ?? "" }),
				description: l(_)("settings.provider_profiles.credential_dialog_description"),
				"close-label": l(_)("common.actions.close"),
				"onUpdate:open": a[7] ||= (e) => !e && q()
			}, {
				default: o(() => [p("div", { class: y(l(H).form_grid) }, [S(A, {
					label: l(_)("settings.provider_profiles.credential_label"),
					error: P.value,
					required: ""
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
						id: e,
						"onUpdate:modelValue": a[6] ||= (e) => M.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: y(l(H).typed_confirm_input),
						"data-testid": "provider-credential-input"
					}, null, 10, _e), [[c, M.value]])]),
					_: 1
				}, 8, ["label", "error"]), p("div", { class: y(l(H).actions_row) }, [S(E, {
					label: l(_)("common.actions.save"),
					pending: N.value,
					onClick: re
				}, null, 8, ["label", "pending"]), S(E, {
					label: l(_)("common.actions.cancel"),
					variant: "secondary",
					onClick: q
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			S(I, {
				open: T.value !== null,
				title: l(_)("settings.provider_profiles.remove_confirm_title", { name: T.value?.display_name ?? "" }),
				description: l(_)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": l(_)("confirmations.destructive.default_confirm_action"),
				"cancel-label": l(_)("confirmations.destructive.default_cancel_action"),
				pending: k.value,
				"onUpdate:open": a[8] ||= (e) => !e && (T.value = null),
				onConfirm: ne
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
}), ye = {
	key: 0,
	class: "tc-visually-hidden"
}, be = /* @__PURE__ */ x({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let { t } = m();
		return (n, r) => (i(), s("div", {
			class: y(l(H).view),
			"data-testid": "settings-view"
		}, [
			e.state.workbench.profiles.length > 0 ? (i(), s("h1", ye, g(l(t)("nav.settings")), 1)) : (i(), s("section", {
				key: 1,
				class: y(l(H).onboarding),
				"data-testid": "settings-onboarding",
				"aria-labelledby": "settings-onboarding-title"
			}, [p("div", {
				class: y(l(H).onboarding_icon),
				"aria-hidden": "true"
			}, [S(w, {
				icon: l(T),
				size: 22
			}, null, 8, ["icon"])], 2), p("div", null, [
				p("p", { class: y(l(H).onboarding_label) }, g(l(t)("settings.onboarding.label")), 3),
				p("h1", {
					id: "settings-onboarding-title",
					class: y(l(H).onboarding_title)
				}, g(l(t)("settings.onboarding.title")), 3),
				p("p", { class: y(l(H).onboarding_description) }, g(l(t)("settings.onboarding.description")), 3)
			])], 2)),
			S(ie, {
				settings: e.state.settings.settings,
				"vault-status": e.state.settings.browser_secret_vault,
				controller: e.controller
			}, null, 8, [
				"settings",
				"vault-status",
				"controller"
			]),
			S(ve, {
				profiles: e.state.workbench.profiles,
				controller: e.controller
			}, null, 8, ["profiles", "controller"]),
			S(de, {
				connections: e.state.llm_connections.connections,
				loading: e.state.loading.has("llm_connections"),
				controller: e.controller
			}, null, 8, [
				"connections",
				"loading",
				"controller"
			]),
			S($, {
				settings: e.state.settings.settings,
				"connection-test-command": e.state.diagnostics.connection_test_command,
				controller: e.controller
			}, null, 8, [
				"settings",
				"connection-test-command",
				"controller"
			]),
			S(W, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			S(U, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			S(G, {
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
export { be as default };
