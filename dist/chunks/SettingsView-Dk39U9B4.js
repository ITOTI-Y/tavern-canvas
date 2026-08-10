import { A as e } from "./src-B_6VhXl3.js";
import { $ as t, B as n, F as r, N as i, U as a, W as o, _ as s, a as c, ft as l, g as u, h as d, lt as f, m as p, n as m, p as h, st as g, u as _, v, x as y, y as b } from "./vue-i18n-D0uIxSJk.js";
import { t as x } from "./createLucideIcon-D9d_Lia0.js";
import { n as S, t as C } from "./StateSurface-C7mKA32L.js";
import { n as w, t as T } from "./NumberStepper-BrE3Mw-G.js";
import { t as E } from "./FieldGroup-CQJSK567.js";
import { t as D } from "./AppIcon-CXvmyYE2.js";
import { a as O, n as k, o as A, r as j } from "./http_acknowledgment-DnfJr4cV.js";
import { t as M } from "./AppSelect-DzN2YfMC.js";
import { n as N } from "./_prop_utils-Cr0BV-r1.js";
import { t as P } from "./AppSwitch-BxASERvg.js";
import { t as F } from "./SegmentedControl-B6JSrdwj.js";
import { t as I } from "./MigrationStatus-DrvjYhJ7.js";
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
}, B = /* @__PURE__ */ y({
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
		function _(e) {
			t.controller.set_inspector_width(e), a({ inspector_width: e });
		}
		return (t, r) => (i(), s("div", {
			class: f(g(z).section),
			"data-testid": "appearance-settings"
		}, [p("div", { class: f(g(z).section_header) }, [p("h2", { class: f(g(z).section_title) }, l(g(n)("settings.sections.appearance")), 3)], 2), p("div", { class: f(g(z).form_grid) }, [
			p("div", { class: f(g(z).row) }, [p("span", { class: f(g(z).row_label) }, l(g(n)("settings.appearance.theme_label")), 3), b(F, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: o.value,
				label: g(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": u
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			p("div", { class: f(g(z).row) }, [p("span", { class: f(g(z).row_label) }, l(g(n)("settings.appearance.language_label")), 3), b(F, {
				"model-value": e.settings?.locale ?? "auto",
				options: c.value,
				label: g(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": d
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			p("div", { class: f(g(z).row) }, [p("span", { class: f(g(z).row_label) }, l(g(n)("settings.appearance.inspector_width_label")), 3), b(T, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: g(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": g(n)("common.actions.increase"),
				"decrement-label": g(n)("common.actions.decrease"),
				"onUpdate:modelValue": _
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			b(P, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: g(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => a({ optional_entry_enabled: e })
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
	setup(e) {
		let t = e, { t: n } = m();
		function r(e) {
			t.controller.update_settings(e);
		}
		let a = h(() => t.settings?.global_concurrency);
		return (t, o) => (i(), s("div", {
			class: f(g(z).section),
			"data-testid": "automation-settings"
		}, [p("div", { class: f(g(z).section_header) }, [p("h2", { class: f(g(z).section_title) }, l(g(n)("settings.sections.automation")), 3)], 2), p("div", { class: f(g(z).form_grid) }, [
			b(P, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: g(n)("settings.automation.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[0] ||= (e) => r({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			b(P, {
				"model-value": e.settings?.fallback_generation_enabled ?? !1,
				label: g(n)("settings.automation.fallback_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[1] ||= (e) => r({ fallback_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			p("div", { class: f(g(z).row) }, [p("span", { class: f(g(z).row_label) }, l(g(n)("settings.automation.global_concurrency_label")), 3), b(T, {
				"model-value": a.value,
				label: g(n)("settings.automation.global_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": g(n)("common.actions.increase"),
				"decrement-label": g(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[2] ||= (e) => r({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			p("div", { class: f(g(z).row) }, [p("span", { class: f(g(z).row_label) }, l(g(n)("settings.automation.provider_concurrency_label")), 3), b(T, {
				"model-value": 1,
				label: g(n)("settings.automation.provider_concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": g(n)("common.actions.increase"),
				"decrement-label": g(n)("common.actions.decrease"),
				disabled: "",
				"data-testid": "provider-concurrency-stepper"
			}, null, 8, [
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			p("p", { class: f(g(z).description) }, l(g(n)("errors.capability_blocked", { capability: g(n)("settings.automation.provider_concurrency_label") })), 3)
		], 2)], 2));
	}
}), H = ["aria-label"], ee = ["aria-label"], U = [
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
	setup(e) {
		let n = e, { t: r } = m(), _ = h(() => r("settings.data.manual_cleanup.confirm_phrase")), v = t(!1), y = [{
			value: "bundled",
			label: r("settings.data.vocabulary_channel_bundled")
		}, {
			value: "remote",
			label: r("settings.data.vocabulary_channel_https")
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
		let C = t(!1), T = t(!1), D = t(null), O = t(null), k = t(null);
		function A() {
			k.value?.click();
		}
		function j() {
			n.controller.cancel_vocabulary_import();
		}
		async function M(e) {
			let t = e.target, i = t.files?.[0];
			if (t.value = "", !(!i || C.value)) {
				C.value = !0, T.value = !1, D.value = null, O.value = null;
				try {
					await n.controller.import_vocabulary_package(i, (e) => {
						O.value = e;
					}), T.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					D.value = r("settings.data.vocabulary_import_error", { code: t });
				} finally {
					C.value = !1;
				}
			}
		}
		let N = h(() => {
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
		}), P = t(!1), L = t(!1), R = t(null);
		async function B() {
			if (!P.value) {
				P.value = !0, R.value = null;
				try {
					let e = await n.controller.export_settings_archive(), t = URL.createObjectURL(e), r = document.createElement("a");
					r.href = t, r.download = "tavern-canvas-archive.json", r.click(), URL.revokeObjectURL(t), L.value = !0;
				} catch {
					R.value = r("errors.unexpected");
				} finally {
					P.value = !1;
				}
			}
		}
		let V = t(!1), W = t(null), G = t(null);
		function te() {
			G.value?.click();
		}
		async function K(e) {
			let t = e.target, i = t.files?.[0];
			if (t.value = "", !(!i || V.value)) {
				V.value = !0, W.value = null;
				try {
					await n.controller.import_settings_archive(i);
				} catch {
					W.value = r("errors.unexpected");
				} finally {
					V.value = !1;
				}
			}
		}
		function q() {
			n.controller.retry_migration();
		}
		let J = t(!1);
		function ne() {
			J.value = !J.value;
		}
		let re = h(() => Object.values(n.migration?.counts ?? {}).reduce((e, t) => e + t, 0)), ie = h(() => r("settings.data.manual_cleanup.record_summary", re.value, { named: {
			count: re.value,
			bytes: r("settings.data.manual_cleanup.bytes_unavailable")
		} })), ae = h(() => n.migration?.state === "completed" || L.value), Y = t(!1), X = t(""), Z = t(!1), Q = t(null);
		function oe() {
			X.value = "", Q.value = null, Y.value = !0;
		}
		function $() {
			Y.value = !1, X.value = "";
		}
		async function se() {
			if (!(X.value !== _.value || Z.value)) {
				Z.value = !0, Q.value = null;
				try {
					await n.controller.confirm_legacy_cleanup(X.value), Y.value = !1;
				} catch {
					Q.value = r("errors.unexpected");
				} finally {
					Z.value = !1;
				}
			}
		}
		return (t, n) => (i(), s("div", {
			class: f(g(z).section),
			"data-testid": "data-settings"
		}, [
			p("div", { class: f(g(z).section_header) }, [p("h2", { class: f(g(z).section_title) }, l(g(r)("settings.sections.data")), 3)], 2),
			p("div", { class: f(g(z).form_grid) }, [
				p("div", { class: f(g(z).row) }, [p("span", { class: f(g(z).row_label) }, l(g(r)("settings.data.vocabulary_channel_label")), 3), b(F, {
					"model-value": e.vocabularyUpdateChannel ?? "bundled",
					options: y,
					label: g(r)("settings.data.vocabulary_channel_label"),
					disabled: v.value,
					"onUpdate:modelValue": x
				}, null, 8, [
					"model-value",
					"label",
					"disabled"
				])], 2),
				p("div", { class: f(g(z).actions_row) }, [
					b(S, {
						label: g(r)("settings.data.vocabulary_import.action"),
						variant: "secondary",
						pending: C.value,
						onClick: A
					}, null, 8, ["label", "pending"]),
					C.value ? (i(), d(S, {
						key: 0,
						label: g(r)("settings.data.vocabulary_import.cancel_action"),
						variant: "destructive",
						onClick: j
					}, null, 8, ["label"])) : u("", !0),
					p("input", {
						ref_key: "vocabulary_file_input",
						ref: k,
						type: "file",
						accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
						class: "tc-visually-hidden",
						"aria-label": g(r)("settings.data.vocabulary_import.action"),
						"data-testid": "vocabulary-import-input",
						onChange: M
					}, null, 40, H)
				], 2),
				p("p", { class: f(g(z).description) }, l(g(r)("settings.data.vocabulary_import.description")), 3),
				N.value ? (i(), s("p", {
					key: 0,
					class: f([g(z).status_text, g(z).description]),
					"data-testid": "vocabulary-import-progress"
				}, l(N.value), 3)) : u("", !0),
				T.value ? (i(), s("p", {
					key: 1,
					class: f([g(z).status_text, g(z).description]),
					"data-tone": "success",
					"data-testid": "vocabulary-import-success"
				}, l(g(r)("settings.data.vocabulary_import.success")), 3)) : u("", !0),
				D.value ? (i(), s("p", {
					key: 2,
					class: f([g(z).status_text, g(z).description]),
					"data-tone": "error",
					"data-testid": "vocabulary-import-error"
				}, l(D.value), 3)) : u("", !0),
				p("div", { class: f(g(z).actions_row) }, [
					b(S, {
						label: g(r)("settings.data.archive_export_action"),
						pending: P.value,
						onClick: B
					}, null, 8, ["label", "pending"]),
					b(S, {
						label: g(r)("settings.data.archive_import_action"),
						variant: "secondary",
						pending: V.value,
						onClick: te
					}, null, 8, ["label", "pending"]),
					p("input", {
						ref_key: "file_input",
						ref: G,
						type: "file",
						accept: "application/json",
						class: "tc-visually-hidden",
						"aria-label": g(r)("settings.data.archive_import_action"),
						"data-testid": "archive-import-input",
						onChange: K
					}, null, 40, ee)
				], 2),
				p("p", { class: f(g(z).description) }, l(g(r)("settings.data.archive_import_description")), 3),
				R.value ? (i(), s("p", {
					key: 3,
					class: f([g(z).status_text, g(z).description]),
					"data-tone": "error"
				}, l(R.value), 3)) : u("", !0),
				W.value ? (i(), s("p", {
					key: 4,
					class: f([g(z).status_text, g(z).description]),
					"data-tone": "error"
				}, l(W.value), 3)) : u("", !0),
				p("div", { class: f(g(z).actions_row) }, [b(S, {
					label: g(r)("settings.data.migration_retry_action"),
					pending: e.migrationRetryCommand.status === "pending",
					onClick: q
				}, null, 8, ["label", "pending"]), b(S, {
					label: g(r)("settings.data.migration_report_action"),
					variant: "secondary",
					onClick: ne
				}, null, 8, ["label"])], 2),
				J.value ? (i(), d(I, {
					key: 5,
					snapshot: e.migration
				}, null, 8, ["snapshot"])) : u("", !0),
				p("div", {
					class: f(g(z).section),
					"data-testid": "manual-cleanup"
				}, [
					p("div", { class: f(g(z).section_header) }, [p("h3", { class: f(g(z).section_title) }, l(g(r)("settings.data.manual_cleanup.title")), 3)], 2),
					p("p", { class: f(g(z).description) }, l(g(r)("settings.data.manual_cleanup.description")), 3),
					p("div", { class: f(g(z).row) }, [p("span", { class: f(g(z).row_label) }, l(g(r)("diagnostics.migration_status.counts_label")), 3), p("span", { class: f(["tc-tabular-nums", g(z).row_value]) }, l(ie.value), 3)], 2),
					ae.value ? u("", !0) : (i(), s("p", {
						key: 0,
						class: f(g(z).description),
						"data-testid": "cleanup-locked"
					}, l(g(r)("settings.data.manual_cleanup.unlock_hint")), 3)),
					p("div", { class: f(g(z).actions_row) }, [b(S, {
						label: g(r)("settings.data.manual_cleanup.confirm_action"),
						variant: "destructive",
						disabled: !ae.value,
						"data-testid": "manual-cleanup-action",
						onClick: oe
					}, null, 8, ["label", "disabled"])], 2)
				], 2)
			], 2),
			b(w, {
				open: Y.value,
				title: g(r)("settings.data.manual_cleanup.title"),
				description: g(r)("confirmations.destructive.irreversible_note"),
				"close-label": g(r)("common.actions.close"),
				"onUpdate:open": n[1] ||= (e) => !e && $()
			}, {
				default: a(() => [b(E, {
					label: g(r)("confirmations.typed_confirmation.label", { phrase: _.value }),
					error: X.value.length > 0 && X.value !== _.value ? g(r)("confirmations.typed_confirmation.mismatch", { phrase: _.value }) : Q.value
				}, {
					default: a(({ fieldId: e, describedBy: t }) => [o(p("input", {
						id: e,
						"onUpdate:modelValue": n[0] ||= (e) => X.value = e,
						type: "text",
						"aria-describedby": t,
						class: f(g(z).typed_confirm_input),
						placeholder: g(r)("confirmations.typed_confirmation.placeholder"),
						"data-testid": "cleanup-confirm-input"
					}, null, 10, U), [[c, X.value]])]),
					_: 1
				}, 8, ["label", "error"]), p("div", { class: f(g(z).actions_row) }, [b(S, {
					label: g(r)("settings.data.manual_cleanup.confirm_action"),
					variant: "destructive",
					pending: Z.value,
					disabled: X.value !== _.value,
					onClick: se
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]), b(S, {
					label: g(r)("confirmations.destructive.default_cancel_action"),
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
}), G = ["id", "aria-describedby"], te = ["data-severity"], K = ["id"], q = ["id", "aria-describedby"], J = /* @__PURE__ */ y({
	__name: "GatewaySettings",
	props: {
		settings: {},
		connectionTestCommand: {},
		controller: {}
	},
	setup(e) {
		let r = e, { t: _ } = m(), y = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, x = t(r.settings?.gateway.endpoint ?? ""), C = t(null), w = t(!1), T = t(!1), M = t(""), N = t(!1), P = t(null);
		n(() => r.settings?.gateway.endpoint ?? "", (e) => {
			x.value = e;
		});
		let F = h(() => {
			let e = x.value.trim();
			if (e.length === 0) return null;
			try {
				if (!A(e)) return null;
				let t = O(e), n = k(t), i = j(r.settings?.gateway.http_acknowledgments ?? {}, t);
				return {
					origin: t,
					severity: n === "public_or_unknown" ? "error" : "warning",
					acknowledged: i
				};
			} catch {
				return null;
			}
		});
		async function I() {
			if (w.value) return;
			let e = x.value.trim();
			if (C.value = null, e.length === 0) {
				w.value = !0;
				try {
					await r.controller.update_settings({ gateway: {
						...r.settings?.gateway ?? y,
						endpoint: null
					} });
				} finally {
					w.value = !1;
				}
				return;
			}
			let t;
			try {
				t = O(e);
			} catch {
				C.value = _("errors.validation_required");
				return;
			}
			w.value = !0;
			try {
				await r.controller.update_settings({ gateway: {
					...r.settings?.gateway ?? y,
					endpoint: t
				} });
			} finally {
				w.value = !1;
			}
		}
		async function B() {
			let e = F.value;
			if (!(!e || T.value)) {
				T.value = !0;
				try {
					await r.controller.acknowledge_http_origin(e.origin);
				} finally {
					T.value = !1;
				}
			}
		}
		async function V() {
			let e = M.value.trim();
			if (P.value = null, !(e.length === 0 || N.value)) {
				N.value = !0;
				try {
					await r.controller.set_gateway_token(e), M.value = "";
				} catch {
					P.value = _("errors.validation_required");
				} finally {
					N.value = !1;
				}
			}
		}
		async function H() {
			if (!N.value) {
				N.value = !0;
				try {
					await r.controller.clear_gateway_token();
				} finally {
					N.value = !1;
				}
			}
		}
		function ee() {
			r.controller.test_diagnostics_connection();
		}
		let U = h(() => r.connectionTestCommand.status === "pending");
		return (t, n) => (i(), s("div", {
			class: f(g(z).section),
			"data-testid": "gateway-settings"
		}, [p("div", { class: f(g(z).section_header) }, [p("h2", { class: f(g(z).section_title) }, l(g(_)("settings.sections.gateway")), 3)], 2), p("div", { class: f(g(z).form_grid) }, [
			b(E, {
				label: g(_)("settings.gateway.endpoint_label"),
				hint: g(_)("settings.gateway.endpoint_hint"),
				error: C.value
			}, {
				default: a(({ fieldId: e, describedBy: t }) => [o(p("input", {
					id: e,
					"onUpdate:modelValue": n[0] ||= (e) => x.value = e,
					type: "text",
					"aria-describedby": t,
					class: f(g(z).typed_confirm_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: I
				}, null, 42, G), [[c, x.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			F.value && !F.value.acknowledged ? (i(), s("div", {
				key: 0,
				class: f(g(z).risk_banner),
				"data-severity": F.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				p("div", { class: f(g(z).risk_banner_title) }, [b(D, {
					icon: g(R),
					size: 16
				}, null, 8, ["icon"]), v(" " + l(g(_)("settings.http_risk.warning_title")), 1)], 2),
				p("p", { class: f(g(z).risk_banner_description) }, l(F.value.severity === "error" ? g(_)("settings.http_risk.error_description_public", { origin: F.value.origin }) : g(_)("settings.http_risk.warning_description_local", { origin: F.value.origin })), 3),
				p("p", { class: f(g(z).risk_banner_description) }, l(g(_)("settings.http_risk.disclosure")), 3),
				p("div", { class: f(g(z).risk_banner_actions) }, [b(S, {
					label: g(_)("settings.http_risk.continue_action"),
					pending: T.value,
					onClick: B
				}, null, 8, ["label", "pending"])], 2)
			], 10, te)) : F.value && F.value.acknowledged ? (i(), s("div", {
				key: 1,
				class: f(g(z).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [b(D, {
				icon: g(L),
				size: 14
			}, null, 8, ["icon"]), v(" " + l(g(_)("settings.http_risk.acknowledged_label")), 1)], 2)) : u("", !0),
			p("div", { class: f(g(z).row) }, [p("span", { class: f(g(z).row_label) }, l(g(_)("settings.gateway.protocol_label")), 3), b(S, {
				label: g(_)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: U.value,
				onClick: ee
			}, null, 8, ["label", "pending"])], 2),
			b(E, { label: g(_)("settings.gateway.token_secret_label") }, {
				default: a(({ fieldId: t }) => [p("span", {
					id: t,
					class: f(g(z).row_value),
					"data-testid": "gateway-token-reference"
				}, l(e.settings?.gateway.token_secret_id ?? g(_)("settings.gateway.token_not_set")), 11, K)]),
				_: 1
			}, 8, ["label"]),
			b(E, {
				label: g(_)("settings.gateway.token_label"),
				hint: g(_)("settings.gateway.token_hint"),
				error: P.value
			}, {
				default: a(({ fieldId: e, describedBy: t }) => [o(p("input", {
					id: e,
					"onUpdate:modelValue": n[1] ||= (e) => M.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: f(g(z).typed_confirm_input),
					"data-testid": "gateway-token-input"
				}, null, 10, q), [[c, M.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			p("div", { class: f(g(z).row) }, [b(S, {
				label: g(_)("settings.gateway.token_save_action"),
				pending: N.value,
				disabled: M.value.trim().length === 0,
				"data-testid": "gateway-token-save",
				onClick: V
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), e.settings?.gateway.token_secret_id ? (i(), d(S, {
				key: 0,
				label: g(_)("settings.gateway.token_clear_action"),
				variant: "secondary",
				pending: N.value,
				"data-testid": "gateway-token-clear",
				onClick: H
			}, null, 8, ["label", "pending"])) : u("", !0)], 2)
		], 2)], 2));
	}
}), ne = [
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
];
function re(e, t) {
	switch (t) {
		case "openai_compatible": return e("settings.llm_connections.provider_kinds.openai_compatible");
		case "anthropic": return e("settings.llm_connections.provider_kinds.anthropic");
		case "google_generative": return e("settings.llm_connections.provider_kinds.google_generative");
		case "ollama": return e("settings.llm_connections.provider_kinds.ollama");
	}
}
function ie(t) {
	return e[t].completion_routes;
}
//#endregion
//#region src/ui/views/settings/LlmConnections.vue?vue&type=script&setup=true&lang.ts
var ae = ["id", "aria-describedby"], Y = ["id", "aria-describedby"], X = ["id", "aria-describedby"], Z = /* @__PURE__ */ y({
	__name: "LlmConnections",
	props: {
		connections: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let n = e, { t: v } = m(), y = t(!1), x = t(null), D = t(!1), O = t(null), k = t(null), A = t(null), j = t(null), F = t(!1), I = t(null), L = t(""), R = t(!1), B = t(null), V = t(/* @__PURE__ */ new Map()), H = h(() => ne.map((e) => ({
			value: e,
			label: re(v, e)
		}))), ee = h(() => ie(x.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), U = h({
			get: () => x.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				x.value && (x.value.provider_kind = e, x.value.route = ie(x.value.provider_kind)[0] ?? "");
			}
		}), W = h({
			get: () => x.value?.route ?? "",
			set: (e) => {
				x.value && (x.value.route = e);
			}
		});
		function G() {
			x.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_kind: "openai_compatible",
				route: ie("openai_compatible")[0] ?? "",
				display_name: "",
				model_id: "",
				temperature: .7,
				max_output_tokens: 2048,
				is_default: n.connections.length === 0
			}, K(), y.value = !0;
		}
		function te(e) {
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
			}, K(), y.value = !0;
		}
		function K() {
			O.value = null, k.value = null, A.value = null;
		}
		function q() {
			y.value = !1, x.value = null, K();
		}
		async function J() {
			let e = x.value;
			if (!e || D.value) return;
			K();
			let t = e.display_name.trim(), r = e.model_id.trim();
			if (t.length === 0 && (O.value = v("errors.validation_required")), r.length === 0 && (k.value = v("errors.validation_required")), !(O.value || k.value)) {
				D.value = !0;
				try {
					await n.controller.save_llm_connection({
						id: e.id,
						display_name: t,
						provider_kind: e.provider_kind,
						route: e.route,
						model_id: r,
						temperature: e.temperature,
						max_output_tokens: e.max_output_tokens,
						is_default: e.is_default
					}), q();
				} catch {
					A.value = v("errors.unexpected");
				} finally {
					D.value = !1;
				}
			}
		}
		function Z(e) {
			j.value = e;
		}
		async function Q() {
			let e = j.value;
			if (!(!e || F.value)) {
				F.value = !0;
				try {
					await n.controller.remove_llm_connection(e.id), j.value = null;
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
					await n.controller.set_llm_connection_credential(e.id, L.value), $();
				} catch {
					B.value = v("errors.unexpected");
				} finally {
					R.value = !1, L.value = "";
				}
			}
		}
		async function ce(e) {
			await n.controller.clear_llm_connection_credential(e.id);
		}
		async function le(e) {
			V.value = new Map(V.value).set(e.id, {
				pending: !0,
				label: null
			});
			let t;
			try {
				let r = await n.controller.test_llm_connection(e.id);
				t = r.status === "success" ? `${v("status.success")} · ${v("diagnostics.connection_tests.latency_label", { ms: r.latency_ms })}` : v("errors.connection_test_failed", { code: r.code });
			} catch {
				t = v("errors.unexpected");
			}
			V.value = new Map(V.value).set(e.id, {
				pending: !1,
				label: t
			});
		}
		return (t, n) => (i(), s("div", {
			class: f(g(z).section),
			"data-testid": "llm-connections"
		}, [
			p("div", { class: f(g(z).section_header) }, [p("h2", { class: f(g(z).section_title) }, l(g(v)("settings.sections.llm_connections")), 3), b(S, {
				label: g(v)("settings.llm_connections.add_action"),
				onClick: G
			}, null, 8, ["label"])], 2),
			p("p", { class: f(g(z).description) }, l(g(v)("settings.llm_connections.section_description")), 3),
			b(C, {
				status: e.loading ? "loading" : e.connections.length === 0 ? "empty" : "ready",
				"empty-message": g(v)("settings.llm_connections.empty_description")
			}, {
				action: a(() => [b(S, {
					label: g(v)("settings.llm_connections.add_action"),
					onClick: G
				}, null, 8, ["label"])]),
				default: a(() => [p("div", null, [(i(!0), s(_, null, r(e.connections, (e) => (i(), s("div", {
					key: e.id,
					class: f(g(z).profile_row),
					"data-testid": "llm-connection-row"
				}, [p("div", { class: f(g(z).profile_identity) }, [
					p("span", { class: f(g(z).profile_name) }, l(e.display_name), 3),
					p("span", { class: f(g(z).profile_meta) }, l(g(re)(g(v), e.provider_kind)) + " · " + l(e.model_id), 3),
					p("span", {
						class: f(g(z).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, l(e.credential_reference ? g(v)("settings.llm_connections.credential_set") : g(v)("settings.llm_connections.credential_unset")), 3),
					V.value.get(e.id)?.label ? (i(), s("span", {
						key: 0,
						class: f(g(z).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, l(V.value.get(e.id)?.label), 3)) : u("", !0)
				], 2), p("div", { class: f(g(z).profile_actions) }, [
					e.is_default ? (i(), s("span", {
						key: 0,
						class: f(g(z).badge)
					}, l(g(v)("settings.llm_connections.default_badge")), 3)) : u("", !0),
					b(S, {
						label: g(v)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: V.value.get(e.id)?.pending === !0,
						onClick: (t) => le(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					b(S, {
						label: g(v)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (t) => oe(e)
					}, null, 8, ["label", "onClick"]),
					e.credential_reference ? (i(), d(S, {
						key: 1,
						label: g(v)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => ce(e)
					}, null, 8, ["label", "onClick"])) : u("", !0),
					b(S, {
						label: g(v)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => te(e)
					}, null, 8, ["label", "onClick"]),
					b(S, {
						label: g(v)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => Z(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			b(w, {
				open: y.value,
				title: x.value?.is_new ? g(v)("settings.llm_connections.dialog_add_title") : g(v)("settings.llm_connections.dialog_edit_title"),
				description: g(v)("settings.llm_connections.dialog_description"),
				"close-label": g(v)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && q()
			}, {
				default: a(() => [x.value ? (i(), s("div", {
					key: 0,
					class: f(g(z).form_grid)
				}, [
					b(E, {
						label: g(v)("common.labels.name"),
						error: O.value,
						required: ""
					}, {
						default: a(({ fieldId: e, describedBy: t }) => [o(p("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => x.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: f(g(z).typed_confirm_input)
						}, null, 10, ae), [[c, x.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					b(E, {
						label: g(v)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: a(({ fieldId: e }) => [b(M, {
							id: e,
							modelValue: U.value,
							"onUpdate:modelValue": n[1] ||= (e) => U.value = e,
							options: H.value,
							placeholder: g(v)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					b(E, {
						label: g(v)("settings.llm_connections.route_label"),
						hint: g(v)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: a(({ fieldId: e }) => [b(M, {
							id: e,
							modelValue: W.value,
							"onUpdate:modelValue": n[2] ||= (e) => W.value = e,
							options: ee.value,
							placeholder: g(v)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					b(E, {
						label: g(v)("settings.llm_connections.model_label"),
						hint: g(v)("settings.llm_connections.model_hint"),
						error: k.value,
						required: ""
					}, {
						default: a(({ fieldId: e, describedBy: t }) => [o(p("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => x.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: f(g(z).typed_confirm_input)
						}, null, 10, Y), [[c, x.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					b(E, {
						label: g(v)("settings.llm_connections.temperature_label"),
						hint: g(v)("settings.llm_connections.temperature_hint")
					}, {
						default: a(() => [b(T, {
							modelValue: x.value.temperature,
							"onUpdate:modelValue": n[4] ||= (e) => x.value.temperature = e,
							label: g(v)("settings.llm_connections.temperature_label"),
							"increment-label": g(v)("common.actions.increase"),
							"decrement-label": g(v)("common.actions.decrease"),
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
					b(E, { label: g(v)("settings.llm_connections.max_output_tokens_label") }, {
						default: a(() => [b(T, {
							modelValue: x.value.max_output_tokens,
							"onUpdate:modelValue": n[5] ||= (e) => x.value.max_output_tokens = e,
							label: g(v)("settings.llm_connections.max_output_tokens_label"),
							"increment-label": g(v)("common.actions.increase"),
							"decrement-label": g(v)("common.actions.decrease"),
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
					b(P, {
						modelValue: x.value.is_default,
						"onUpdate:modelValue": n[6] ||= (e) => x.value.is_default = e,
						label: g(v)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					A.value ? (i(), s("p", {
						key: 0,
						class: f([g(z).status_text, g(z).description]),
						"data-tone": "error"
					}, l(A.value), 3)) : u("", !0),
					p("div", { class: f(g(z).actions_row) }, [b(S, {
						label: g(v)("common.actions.save"),
						pending: D.value,
						onClick: J
					}, null, 8, ["label", "pending"]), b(S, {
						label: g(v)("common.actions.cancel"),
						variant: "secondary",
						onClick: q
					}, null, 8, ["label"])], 2)
				], 2)) : u("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			b(w, {
				open: I.value !== null,
				title: g(v)("settings.llm_connections.credential_dialog_title"),
				description: g(v)("settings.llm_connections.credential_dialog_description"),
				"close-label": g(v)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && $()
			}, {
				default: a(() => [p("div", { class: f(g(z).form_grid) }, [b(E, {
					label: g(v)("settings.llm_connections.credential_label"),
					hint: g(v)("provider.credentials.not_stored_locally"),
					error: B.value,
					required: ""
				}, {
					default: a(({ fieldId: e, describedBy: t }) => [o(p("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => L.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: f(g(z).typed_confirm_input),
						"data-testid": "llm-credential-input"
					}, null, 10, X), [[c, L.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), p("div", { class: f(g(z).actions_row) }, [b(S, {
					label: g(v)("common.actions.save"),
					pending: R.value,
					onClick: se
				}, null, 8, ["label", "pending"]), b(S, {
					label: g(v)("common.actions.cancel"),
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
			b(N, {
				open: j.value !== null,
				title: g(v)("settings.llm_connections.remove_confirm_title", { name: j.value?.display_name ?? "" }),
				description: g(v)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": g(v)("confirmations.destructive.default_confirm_action"),
				"cancel-label": g(v)("confirmations.destructive.default_cancel_action"),
				pending: F.value,
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
}), Q = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function oe(e, t) {
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
var $ = ["id", "aria-describedby"], se = ["id", "aria-describedby"], ce = /* @__PURE__ */ y({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		controller: {}
	},
	setup(e) {
		let n = e, { t: d } = m(), v = t(!1), y = t(null), x = t(!1), T = t(null), D = t(null), O = t(!1), k = t(/* @__PURE__ */ new Map()), A = Q.map((e) => ({
			value: e,
			label: oe(d, e)
		})), j = h({
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
				is_default: n.profiles.length === 0
			}, T.value = null, v.value = !0;
		}
		function I(e) {
			y.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				secret_reference: "",
				is_default: e.is_default
			}, T.value = null, v.value = !0;
		}
		function L() {
			v.value = !1, y.value = null, T.value = null;
		}
		async function R() {
			let e = y.value;
			if (!(!e || x.value)) {
				x.value = !0, T.value = null;
				try {
					await n.controller.save_provider_profile({
						id: e.id,
						provider_id: e.provider_id,
						display_name: e.display_name,
						is_default: e.is_default,
						updated_at: (/* @__PURE__ */ new Date()).toISOString(),
						secret_reference: e.secret_reference.trim().length > 0 ? e.secret_reference : null
					}), L();
				} catch {
					T.value = d("errors.unexpected");
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
					await n.controller.remove_provider_profile(e.id), D.value = null;
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
				let t = await n.controller.test_provider_profile_connection(e.id), r = t.status === "success" ? `${d("status.success")} · ${d("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : d("errors.connection_test_failed", { code: t.error.code });
				k.value.set(e.id, {
					pending: !1,
					label: r
				});
			} catch {
				k.value.set(e.id, {
					pending: !1,
					label: d("errors.unexpected")
				});
			}
			k.value = new Map(k.value);
		}
		return (t, n) => (i(), s("div", {
			class: f(g(z).section),
			"data-testid": "provider-profiles"
		}, [
			p("div", { class: f(g(z).section_header) }, [p("h2", { class: f(g(z).section_title) }, l(g(d)("settings.sections.provider_profiles")), 3), b(S, {
				label: g(d)("settings.provider_profiles.add_action"),
				onClick: F
			}, null, 8, ["label"])], 2),
			b(C, {
				status: e.profiles.length === 0 ? "empty" : "ready",
				"empty-message": g(d)("settings.provider_profiles.empty_description")
			}, {
				default: a(() => [p("div", null, [(i(!0), s(_, null, r(e.profiles, (e) => (i(), s("div", {
					key: e.id,
					class: f(g(z).profile_row),
					"data-testid": "provider-profile-row"
				}, [p("div", { class: f(g(z).profile_identity) }, [
					p("span", { class: f(g(z).profile_name) }, l(e.display_name), 3),
					p("span", { class: f(g(z).profile_meta) }, l(g(oe)(g(d), e.provider_id)), 3),
					k.value.get(e.id)?.label ? (i(), s("span", {
						key: 0,
						class: f(g(z).profile_meta),
						"data-testid": "profile-test-result"
					}, l(k.value.get(e.id)?.label), 3)) : u("", !0)
				], 2), p("div", { class: f(g(z).profile_actions) }, [
					e.is_default ? (i(), s("span", {
						key: 0,
						class: f(g(z).badge)
					}, l(g(d)("settings.provider_profiles.default_badge")), 3)) : u("", !0),
					b(S, {
						label: g(d)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: k.value.get(e.id)?.pending === !0,
						onClick: (t) => H(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					b(S, {
						label: g(d)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => I(e)
					}, null, 8, ["label", "onClick"]),
					b(S, {
						label: g(d)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => B(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			b(w, {
				open: v.value,
				title: y.value?.is_new ? g(d)("settings.provider_profiles.dialog_add_title") : g(d)("settings.provider_profiles.dialog_edit_title"),
				"close-label": g(d)("common.actions.close"),
				"onUpdate:open": n[4] ||= (e) => !e && L()
			}, {
				default: a(() => [y.value ? (i(), s("div", {
					key: 0,
					class: f(g(z).form_grid)
				}, [
					b(E, {
						label: g(d)("common.labels.name"),
						required: ""
					}, {
						default: a(({ fieldId: e, describedBy: t }) => [o(p("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => y.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: f(g(z).typed_confirm_input)
						}, null, 10, $), [[c, y.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					b(E, {
						label: g(d)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: a(({ fieldId: e }) => [b(M, {
							id: e,
							modelValue: j.value,
							"onUpdate:modelValue": n[1] ||= (e) => j.value = e,
							options: g(A),
							placeholder: g(d)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					b(E, {
						label: g(d)("settings.gateway.token_secret_label"),
						hint: g(d)("provider.credentials.not_stored_locally")
					}, {
						default: a(({ fieldId: e, describedBy: t }) => [o(p("input", {
							id: e,
							"onUpdate:modelValue": n[2] ||= (e) => y.value.secret_reference = e,
							type: "text",
							"aria-describedby": t,
							class: f(g(z).typed_confirm_input)
						}, null, 10, se), [[c, y.value.secret_reference]])]),
						_: 1
					}, 8, ["label", "hint"]),
					b(P, {
						modelValue: y.value.is_default,
						"onUpdate:modelValue": n[3] ||= (e) => y.value.is_default = e,
						label: g(d)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					T.value ? (i(), s("p", {
						key: 0,
						class: f([g(z).status_text, g(z).description]),
						"data-tone": "error"
					}, l(T.value), 3)) : u("", !0),
					p("div", { class: f(g(z).actions_row) }, [b(S, {
						label: g(d)("common.actions.save"),
						pending: x.value,
						onClick: R
					}, null, 8, ["label", "pending"]), b(S, {
						label: g(d)("common.actions.cancel"),
						variant: "secondary",
						onClick: L
					}, null, 8, ["label"])], 2)
				], 2)) : u("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			b(N, {
				open: D.value !== null,
				title: g(d)("settings.provider_profiles.remove_confirm_title", { name: D.value?.display_name ?? "" }),
				description: g(d)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": g(d)("confirmations.destructive.default_confirm_action"),
				"cancel-label": g(d)("confirmations.destructive.default_cancel_action"),
				pending: O.value,
				"onUpdate:open": n[5] ||= (e) => !e && (D.value = null),
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
}), le = { class: "tc-visually-hidden" }, ue = /* @__PURE__ */ y({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let { t } = m();
		return (n, r) => (i(), s("div", {
			class: f(g(z).view),
			"data-testid": "settings-view"
		}, [
			p("h1", le, l(g(t)("nav.settings")), 1),
			b(ce, {
				profiles: e.state.workbench.profiles,
				controller: e.controller
			}, null, 8, ["profiles", "controller"]),
			b(Z, {
				connections: e.state.llm_connections.connections,
				loading: e.state.loading.has("llm_connections"),
				controller: e.controller
			}, null, 8, [
				"connections",
				"loading",
				"controller"
			]),
			b(J, {
				settings: e.state.settings.settings,
				"connection-test-command": e.state.diagnostics.connection_test_command,
				controller: e.controller
			}, null, 8, [
				"settings",
				"connection-test-command",
				"controller"
			]),
			b(V, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			b(B, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			b(W, {
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
export { ue as default };
