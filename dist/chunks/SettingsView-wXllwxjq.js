import { A as e, rt as t } from "./src-CLzfjths.js";
import { F as n, G as r, N as i, V as a, W as o, _ as s, a as c, ct as l, et as u, g as d, h as f, m as p, n as m, p as h, pt as g, u as _, ut as v, v as y, x as b, y as x } from "./vue-i18n-DUz2Gjn8.js";
import { n as S, t as C } from "./AppIcon-Cnhzrx9o.js";
import { n as w, t as T } from "./StateSurface-Bo_sA18G.js";
import { n as E, t as D } from "./NumberStepper-zIDhvMwB.js";
import { t as O } from "./FieldGroup-LDtWeac7.js";
import { a as k, n as A, o as j, r as M } from "./http_acknowledgment-Bd7iIzs_.js";
import { t as N } from "./AppSelect-CJ-1Hi5_.js";
import { n as P } from "./_prop_utils-DtjJGT5O.js";
import { t as F } from "./AppSwitch-w_KIxpNZ.js";
import { t as I } from "./SegmentedControl-CR6qvbSJ.js";
import { t as L } from "./MigrationStatus-BX0VIoDk.js";
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
	view: "_view_88xnb_7",
	section: "_section_88xnb_14",
	section_header: "_section_header_88xnb_23",
	section_title: "_section_title_88xnb_32",
	row: "_row_88xnb_38",
	row_label: "_row_label_88xnb_47",
	row_value: "_row_value_88xnb_55",
	profile_row: "_profile_row_88xnb_20",
	profile_identity: "_profile_identity_88xnb_63",
	profile_name: "_profile_name_88xnb_87",
	profile_meta: "_profile_meta_88xnb_94",
	profile_actions: "_profile_actions_88xnb_104",
	badge: "_badge_88xnb_112",
	form_grid: "_form_grid_88xnb_121",
	status_text: "_status_text_88xnb_127",
	risk_banner: "_risk_banner_88xnb_147",
	risk_banner_title: "_risk_banner_title_88xnb_161",
	risk_banner_description: "_risk_banner_description_88xnb_173",
	risk_banner_actions: "_risk_banner_actions_88xnb_180",
	acknowledged_note: "_acknowledged_note_88xnb_186",
	description: "_description_88xnb_194",
	actions_row: "_actions_row_88xnb_201",
	typed_confirm_input: "_typed_confirm_input_88xnb_208"
}, V = /* @__PURE__ */ b({
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
			class: v(l(B).section),
			"data-testid": "appearance-settings"
		}, [p("div", { class: v(l(B).section_header) }, [p("h2", { class: v(l(B).section_title) }, g(l(n)("settings.sections.appearance")), 3)], 2), p("div", { class: v(l(B).form_grid) }, [
			p("div", { class: v(l(B).row) }, [p("span", { class: v(l(B).row_label) }, g(l(n)("settings.appearance.theme_label")), 3), x(I, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: o.value,
				label: l(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": u
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			p("div", { class: v(l(B).row) }, [p("span", { class: v(l(B).row_label) }, g(l(n)("settings.appearance.language_label")), 3), x(I, {
				"model-value": e.settings?.locale ?? "auto",
				options: c.value,
				label: l(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": d
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			p("div", { class: v(l(B).row) }, [p("span", { class: v(l(B).row_label) }, g(l(n)("settings.appearance.inspector_width_label")), 3), x(D, {
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
			x(F, {
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
}), H = /* @__PURE__ */ b({
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
			class: v(l(B).section),
			"data-testid": "automation-settings"
		}, [p("div", { class: v(l(B).section_header) }, [p("h2", { class: v(l(B).section_title) }, g(l(n)("settings.sections.automation")), 3)], 2), p("div", { class: v(l(B).form_grid) }, [
			x(F, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: l(n)("settings.automation.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[0] ||= (e) => r({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			x(F, {
				"model-value": e.settings?.fallback_generation_enabled ?? !1,
				label: l(n)("settings.automation.fallback_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o[1] ||= (e) => r({ fallback_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			p("div", { class: v(l(B).row) }, [p("span", { class: v(l(B).row_label) }, g(l(n)("settings.automation.global_concurrency_label")), 3), x(D, {
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
			p("div", { class: v(l(B).row) }, [p("span", { class: v(l(B).row_label) }, g(l(n)("settings.automation.provider_concurrency_label")), 3), x(D, {
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
			p("p", { class: v(l(B).description) }, g(l(n)("errors.capability_blocked", { capability: l(n)("settings.automation.provider_concurrency_label") })), 3)
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
		let t = e, { t: n } = m(), a = h(() => n("settings.data.manual_cleanup.confirm_phrase")), _ = u(!1), y = [{
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
		let S = u(!1), C = u(!1), T = u(null), D = u(null), k = u(null);
		function A() {
			k.value?.click();
		}
		function j() {
			t.controller.cancel_vocabulary_import();
		}
		async function M(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || S.value)) {
				S.value = !0, C.value = !1, T.value = null, D.value = null;
				try {
					await t.controller.import_vocabulary_package(i, (e) => {
						D.value = e;
					}), C.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					T.value = n("settings.data.vocabulary_import_error", { code: t });
				} finally {
					S.value = !1;
				}
			}
		}
		let N = h(() => {
			let e = D.value;
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
		}), P = u(!1), F = u(!1), R = u(null);
		async function z() {
			if (!P.value) {
				P.value = !0, R.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "tavern-canvas-archive.json", r.click(), URL.revokeObjectURL(n), F.value = !0;
				} catch {
					R.value = n("errors.unexpected");
				} finally {
					P.value = !1;
				}
			}
		}
		let V = u(!1), H = u(null), W = u(null);
		function ne() {
			W.value?.click();
		}
		async function G(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || V.value)) {
				V.value = !0, H.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					H.value = n("errors.unexpected");
				} finally {
					V.value = !1;
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
		let ie = h(() => Object.values(t.migration?.counts ?? {}).reduce((e, t) => e + t, 0)), ae = h(() => n("settings.data.manual_cleanup.record_summary", ie.value, { named: {
			count: ie.value,
			bytes: n("settings.data.manual_cleanup.bytes_unavailable")
		} })), J = h(() => t.migration?.state === "completed" || F.value), Y = u(!1), X = u(""), Z = u(!1), Q = u(null);
		function oe() {
			X.value = "", Q.value = null, Y.value = !0;
		}
		function $() {
			Y.value = !1, X.value = "";
		}
		async function se() {
			if (!(X.value !== a.value || Z.value)) {
				Z.value = !0, Q.value = null;
				try {
					await t.controller.confirm_legacy_cleanup(X.value), Y.value = !1;
				} catch {
					Q.value = n("errors.unexpected");
				} finally {
					Z.value = !1;
				}
			}
		}
		return (t, u) => (i(), s("div", {
			class: v(l(B).section),
			"data-testid": "data-settings"
		}, [
			p("div", { class: v(l(B).section_header) }, [p("h2", { class: v(l(B).section_title) }, g(l(n)("settings.sections.data")), 3)], 2),
			p("div", { class: v(l(B).form_grid) }, [
				p("div", { class: v(l(B).row) }, [p("span", { class: v(l(B).row_label) }, g(l(n)("settings.data.vocabulary_channel_label")), 3), x(I, {
					"model-value": e.vocabularyUpdateChannel ?? "bundled",
					options: y,
					label: l(n)("settings.data.vocabulary_channel_label"),
					disabled: _.value,
					"onUpdate:modelValue": b
				}, null, 8, [
					"model-value",
					"label",
					"disabled"
				])], 2),
				p("div", { class: v(l(B).actions_row) }, [
					x(w, {
						label: l(n)("settings.data.vocabulary_import.action"),
						variant: "secondary",
						pending: S.value,
						onClick: A
					}, null, 8, ["label", "pending"]),
					S.value ? (i(), f(w, {
						key: 0,
						label: l(n)("settings.data.vocabulary_import.cancel_action"),
						variant: "destructive",
						onClick: j
					}, null, 8, ["label"])) : d("", !0),
					p("input", {
						ref_key: "vocabulary_file_input",
						ref: k,
						type: "file",
						accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
						class: "tc-visually-hidden",
						"aria-label": l(n)("settings.data.vocabulary_import.action"),
						"data-testid": "vocabulary-import-input",
						onChange: M
					}, null, 40, ee)
				], 2),
				p("p", { class: v(l(B).description) }, g(l(n)("settings.data.vocabulary_import.description")), 3),
				N.value ? (i(), s("p", {
					key: 0,
					class: v([l(B).status_text, l(B).description]),
					"data-testid": "vocabulary-import-progress"
				}, g(N.value), 3)) : d("", !0),
				C.value ? (i(), s("p", {
					key: 1,
					class: v([l(B).status_text, l(B).description]),
					"data-tone": "success",
					"data-testid": "vocabulary-import-success"
				}, g(l(n)("settings.data.vocabulary_import.success")), 3)) : d("", !0),
				T.value ? (i(), s("p", {
					key: 2,
					class: v([l(B).status_text, l(B).description]),
					"data-tone": "error",
					"data-testid": "vocabulary-import-error"
				}, g(T.value), 3)) : d("", !0),
				p("div", { class: v(l(B).actions_row) }, [
					x(w, {
						label: l(n)("settings.data.archive_export_action"),
						pending: P.value,
						onClick: z
					}, null, 8, ["label", "pending"]),
					x(w, {
						label: l(n)("settings.data.archive_import_action"),
						variant: "secondary",
						pending: V.value,
						onClick: ne
					}, null, 8, ["label", "pending"]),
					p("input", {
						ref_key: "file_input",
						ref: W,
						type: "file",
						accept: "application/json",
						class: "tc-visually-hidden",
						"aria-label": l(n)("settings.data.archive_import_action"),
						"data-testid": "archive-import-input",
						onChange: G
					}, null, 40, U)
				], 2),
				p("p", { class: v(l(B).description) }, g(l(n)("settings.data.archive_import_description")), 3),
				R.value ? (i(), s("p", {
					key: 3,
					class: v([l(B).status_text, l(B).description]),
					"data-tone": "error"
				}, g(R.value), 3)) : d("", !0),
				H.value ? (i(), s("p", {
					key: 4,
					class: v([l(B).status_text, l(B).description]),
					"data-tone": "error"
				}, g(H.value), 3)) : d("", !0),
				p("div", { class: v(l(B).actions_row) }, [x(w, {
					label: l(n)("settings.data.migration_retry_action"),
					pending: e.migrationRetryCommand.status === "pending",
					onClick: K
				}, null, 8, ["label", "pending"]), x(w, {
					label: l(n)("settings.data.migration_report_action"),
					variant: "secondary",
					onClick: re
				}, null, 8, ["label"])], 2),
				q.value ? (i(), f(L, {
					key: 5,
					snapshot: e.migration
				}, null, 8, ["snapshot"])) : d("", !0),
				p("div", {
					class: v(l(B).section),
					"data-testid": "manual-cleanup"
				}, [
					p("div", { class: v(l(B).section_header) }, [p("h3", { class: v(l(B).section_title) }, g(l(n)("settings.data.manual_cleanup.title")), 3)], 2),
					p("p", { class: v(l(B).description) }, g(l(n)("settings.data.manual_cleanup.description")), 3),
					p("div", { class: v(l(B).row) }, [p("span", { class: v(l(B).row_label) }, g(l(n)("diagnostics.migration_status.counts_label")), 3), p("span", { class: v(["tc-tabular-nums", l(B).row_value]) }, g(ae.value), 3)], 2),
					J.value ? d("", !0) : (i(), s("p", {
						key: 0,
						class: v(l(B).description),
						"data-testid": "cleanup-locked"
					}, g(l(n)("settings.data.manual_cleanup.unlock_hint")), 3)),
					p("div", { class: v(l(B).actions_row) }, [x(w, {
						label: l(n)("settings.data.manual_cleanup.confirm_action"),
						variant: "destructive",
						disabled: !J.value,
						"data-testid": "manual-cleanup-action",
						onClick: oe
					}, null, 8, ["label", "disabled"])], 2)
				], 2)
			], 2),
			x(E, {
				open: Y.value,
				title: l(n)("settings.data.manual_cleanup.title"),
				description: l(n)("confirmations.destructive.irreversible_note"),
				"close-label": l(n)("common.actions.close"),
				"onUpdate:open": u[1] ||= (e) => !e && $()
			}, {
				default: o(() => [x(O, {
					label: l(n)("confirmations.typed_confirmation.label", { phrase: a.value }),
					error: X.value.length > 0 && X.value !== a.value ? l(n)("confirmations.typed_confirmation.mismatch", { phrase: a.value }) : Q.value
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
						id: e,
						"onUpdate:modelValue": u[0] ||= (e) => X.value = e,
						type: "text",
						"aria-describedby": t,
						class: v(l(B).typed_confirm_input),
						placeholder: l(n)("confirmations.typed_confirmation.placeholder"),
						"data-testid": "cleanup-confirm-input"
					}, null, 10, te), [[c, X.value]])]),
					_: 1
				}, 8, ["label", "error"]), p("div", { class: v(l(B).actions_row) }, [x(w, {
					label: l(n)("settings.data.manual_cleanup.confirm_action"),
					variant: "destructive",
					pending: Z.value,
					disabled: X.value !== a.value,
					onClick: se
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]), x(w, {
					label: l(n)("confirmations.destructive.default_cancel_action"),
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
		let t = e, { t: n } = m(), _ = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, b = u(t.settings?.gateway.endpoint ?? ""), S = u(null), T = u(!1), E = u(!1), D = u(""), N = u(!1), P = u(null);
		a(() => t.settings?.gateway.endpoint ?? "", (e) => {
			b.value = e;
		});
		let F = h(() => {
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
			if (T.value) return;
			let e = b.value.trim();
			if (S.value = null, e.length === 0) {
				T.value = !0;
				try {
					await t.controller.update_settings({ gateway: {
						...t.settings?.gateway ?? _,
						endpoint: null
					} });
				} finally {
					T.value = !1;
				}
				return;
			}
			let r;
			try {
				r = k(e);
			} catch {
				S.value = n("errors.validation_required");
				return;
			}
			T.value = !0;
			try {
				await t.controller.update_settings({ gateway: {
					...t.settings?.gateway ?? _,
					endpoint: r
				} });
			} finally {
				T.value = !1;
			}
		}
		async function L() {
			let e = F.value;
			if (!(!e || E.value)) {
				E.value = !0;
				try {
					await t.controller.acknowledge_http_origin(e.origin);
				} finally {
					E.value = !1;
				}
			}
		}
		async function V() {
			let e = D.value.trim();
			if (P.value = null, !(e.length === 0 || N.value)) {
				N.value = !0;
				try {
					await t.controller.set_gateway_token(e), D.value = "";
				} catch {
					P.value = n("errors.validation_required");
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
		let U = h(() => t.connectionTestCommand.status === "pending");
		return (t, a) => (i(), s("div", {
			class: v(l(B).section),
			"data-testid": "gateway-settings"
		}, [p("div", { class: v(l(B).section_header) }, [p("h2", { class: v(l(B).section_title) }, g(l(n)("settings.sections.gateway")), 3)], 2), p("div", { class: v(l(B).form_grid) }, [
			x(O, {
				label: l(n)("settings.gateway.endpoint_label"),
				hint: l(n)("settings.gateway.endpoint_hint"),
				error: S.value
			}, {
				default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
					id: e,
					"onUpdate:modelValue": a[0] ||= (e) => b.value = e,
					type: "text",
					"aria-describedby": t,
					class: v(l(B).typed_confirm_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: I
				}, null, 42, ne), [[c, b.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			F.value && !F.value.acknowledged ? (i(), s("div", {
				key: 0,
				class: v(l(B).risk_banner),
				"data-severity": F.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				p("div", { class: v(l(B).risk_banner_title) }, [x(C, {
					icon: l(z),
					size: 16
				}, null, 8, ["icon"]), y(" " + g(l(n)("settings.http_risk.warning_title")), 1)], 2),
				p("p", { class: v(l(B).risk_banner_description) }, g(F.value.severity === "error" ? l(n)("settings.http_risk.error_description_public", { origin: F.value.origin }) : l(n)("settings.http_risk.warning_description_local", { origin: F.value.origin })), 3),
				p("p", { class: v(l(B).risk_banner_description) }, g(l(n)("settings.http_risk.disclosure")), 3),
				p("div", { class: v(l(B).risk_banner_actions) }, [x(w, {
					label: l(n)("settings.http_risk.continue_action"),
					pending: E.value,
					onClick: L
				}, null, 8, ["label", "pending"])], 2)
			], 10, G)) : F.value && F.value.acknowledged ? (i(), s("div", {
				key: 1,
				class: v(l(B).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [x(C, {
				icon: l(R),
				size: 14
			}, null, 8, ["icon"]), y(" " + g(l(n)("settings.http_risk.acknowledged_label")), 1)], 2)) : d("", !0),
			p("div", { class: v(l(B).row) }, [p("span", { class: v(l(B).row_label) }, g(l(n)("settings.gateway.protocol_label")), 3), x(w, {
				label: l(n)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: U.value,
				onClick: ee
			}, null, 8, ["label", "pending"])], 2),
			x(O, { label: l(n)("settings.gateway.token_secret_label") }, {
				default: o(({ fieldId: t }) => [p("span", {
					id: t,
					class: v(l(B).row_value),
					"data-testid": "gateway-token-reference"
				}, g(e.settings?.gateway.token_secret_id ?? l(n)("settings.gateway.token_not_set")), 11, K)]),
				_: 1
			}, 8, ["label"]),
			x(O, {
				label: l(n)("settings.gateway.token_label"),
				hint: l(n)("settings.gateway.token_hint"),
				error: P.value
			}, {
				default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
					id: e,
					"onUpdate:modelValue": a[1] ||= (e) => D.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: v(l(B).typed_confirm_input),
					"data-testid": "gateway-token-input"
				}, null, 10, q), [[c, D.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			p("div", { class: v(l(B).row) }, [x(w, {
				label: l(n)("settings.gateway.token_save_action"),
				pending: N.value,
				disabled: D.value.trim().length === 0,
				"data-testid": "gateway-token-save",
				onClick: V
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), e.settings?.gateway.token_secret_id ? (i(), f(w, {
				key: 0,
				label: l(n)("settings.gateway.token_clear_action"),
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
		let t = e, { t: a } = m(), y = u(!1), b = u(null), S = u(!1), C = u(null), k = u(null), A = u(null), j = u(null), M = u(!1), I = u(null), L = u(""), R = u(!1), z = u(null), V = u(/* @__PURE__ */ new Map()), H = h(() => ie.map((e) => ({
			value: e,
			label: ae(a, e)
		}))), ee = h(() => J(b.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), U = h({
			get: () => b.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				b.value && (b.value.provider_kind = e, b.value.route = J(b.value.provider_kind)[0] ?? "");
			}
		}), te = h({
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
			C.value = null, k.value = null, A.value = null;
		}
		function K() {
			y.value = !1, b.value = null, G();
		}
		async function q() {
			let e = b.value;
			if (!e || S.value) return;
			G();
			let n = e.display_name.trim(), r = e.model_id.trim();
			if (n.length === 0 && (C.value = a("errors.validation_required")), r.length === 0 && (k.value = a("errors.validation_required")), !(C.value || k.value)) {
				S.value = !0;
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
					A.value = a("errors.unexpected");
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
					z.value = a("errors.validation_required");
					return;
				}
				R.value = !0, z.value = null;
				try {
					await t.controller.set_llm_connection_credential(e.id, L.value), $();
				} catch {
					z.value = a("errors.unexpected");
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
				let r = await t.controller.test_llm_connection(e.id);
				n = r.status === "success" ? `${a("status.success")} · ${a("diagnostics.connection_tests.latency_label", { ms: r.latency_ms })}` : a("errors.connection_test_failed", { code: r.code });
			} catch {
				n = a("errors.unexpected");
			}
			V.value = new Map(V.value).set(e.id, {
				pending: !1,
				label: n
			});
		}
		return (t, u) => (i(), s("div", {
			class: v(l(B).section),
			"data-testid": "llm-connections"
		}, [
			p("div", { class: v(l(B).section_header) }, [p("h2", { class: v(l(B).section_title) }, g(l(a)("settings.sections.llm_connections")), 3), x(w, {
				label: l(a)("settings.llm_connections.add_action"),
				onClick: W
			}, null, 8, ["label"])], 2),
			p("p", { class: v(l(B).description) }, g(l(a)("settings.llm_connections.section_description")), 3),
			x(T, {
				status: e.loading ? "loading" : e.connections.length === 0 ? "empty" : "ready",
				"empty-message": l(a)("settings.llm_connections.empty_description")
			}, {
				action: o(() => [x(w, {
					label: l(a)("settings.llm_connections.add_action"),
					onClick: W
				}, null, 8, ["label"])]),
				default: o(() => [p("div", null, [(i(!0), s(_, null, n(e.connections, (e) => (i(), s("div", {
					key: e.id,
					class: v(l(B).profile_row),
					"data-testid": "llm-connection-row"
				}, [p("div", { class: v(l(B).profile_identity) }, [
					p("span", { class: v(l(B).profile_name) }, g(e.display_name), 3),
					p("span", { class: v(l(B).profile_meta) }, g(l(ae)(l(a), e.provider_kind)) + " · " + g(e.model_id), 3),
					p("span", {
						class: v(l(B).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, g(e.credential_reference ? l(a)("settings.llm_connections.credential_set") : l(a)("settings.llm_connections.credential_unset")), 3),
					V.value.get(e.id)?.label ? (i(), s("span", {
						key: 0,
						class: v(l(B).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, g(V.value.get(e.id)?.label), 3)) : d("", !0)
				], 2), p("div", { class: v(l(B).profile_actions) }, [
					e.is_default ? (i(), s("span", {
						key: 0,
						class: v(l(B).badge)
					}, g(l(a)("settings.llm_connections.default_badge")), 3)) : d("", !0),
					x(w, {
						label: l(a)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: V.value.get(e.id)?.pending === !0,
						onClick: (t) => le(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					x(w, {
						label: l(a)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (t) => oe(e)
					}, null, 8, ["label", "onClick"]),
					e.credential_reference ? (i(), f(w, {
						key: 1,
						label: l(a)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => ce(e)
					}, null, 8, ["label", "onClick"])) : d("", !0),
					x(w, {
						label: l(a)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => ne(e)
					}, null, 8, ["label", "onClick"]),
					x(w, {
						label: l(a)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => re(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			x(E, {
				open: y.value,
				title: b.value?.is_new ? l(a)("settings.llm_connections.dialog_add_title") : l(a)("settings.llm_connections.dialog_edit_title"),
				description: l(a)("settings.llm_connections.dialog_description"),
				"close-label": l(a)("common.actions.close"),
				"onUpdate:open": u[7] ||= (e) => !e && K()
			}, {
				default: o(() => [b.value ? (i(), s("div", {
					key: 0,
					class: v(l(B).form_grid)
				}, [
					x(O, {
						label: l(a)("common.labels.name"),
						error: C.value,
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": u[0] ||= (e) => b.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: v(l(B).typed_confirm_input)
						}, null, 10, Y), [[c, b.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					x(O, {
						label: l(a)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [x(N, {
							id: e,
							modelValue: U.value,
							"onUpdate:modelValue": u[1] ||= (e) => U.value = e,
							options: H.value,
							placeholder: l(a)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					x(O, {
						label: l(a)("settings.llm_connections.route_label"),
						hint: l(a)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [x(N, {
							id: e,
							modelValue: te.value,
							"onUpdate:modelValue": u[2] ||= (e) => te.value = e,
							options: ee.value,
							placeholder: l(a)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					x(O, {
						label: l(a)("settings.llm_connections.model_label"),
						hint: l(a)("settings.llm_connections.model_hint"),
						error: k.value,
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": u[3] ||= (e) => b.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: v(l(B).typed_confirm_input)
						}, null, 10, X), [[c, b.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					x(O, {
						label: l(a)("settings.llm_connections.temperature_label"),
						hint: l(a)("settings.llm_connections.temperature_hint")
					}, {
						default: o(() => [x(D, {
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
					x(O, { label: l(a)("settings.llm_connections.max_output_tokens_label") }, {
						default: o(() => [x(D, {
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
					x(F, {
						modelValue: b.value.is_default,
						"onUpdate:modelValue": u[6] ||= (e) => b.value.is_default = e,
						label: l(a)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					A.value ? (i(), s("p", {
						key: 0,
						class: v([l(B).status_text, l(B).description]),
						"data-tone": "error"
					}, g(A.value), 3)) : d("", !0),
					p("div", { class: v(l(B).actions_row) }, [x(w, {
						label: l(a)("common.actions.save"),
						pending: S.value,
						onClick: q
					}, null, 8, ["label", "pending"]), x(w, {
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
			x(E, {
				open: I.value !== null,
				title: l(a)("settings.llm_connections.credential_dialog_title"),
				description: l(a)("settings.llm_connections.credential_dialog_description"),
				"close-label": l(a)("common.actions.close"),
				"onUpdate:open": u[9] ||= (e) => !e && $()
			}, {
				default: o(() => [p("div", { class: v(l(B).form_grid) }, [x(O, {
					label: l(a)("settings.llm_connections.credential_label"),
					hint: l(a)("provider.credentials.not_stored_locally"),
					error: z.value,
					required: ""
				}, {
					default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
						id: e,
						"onUpdate:modelValue": u[8] ||= (e) => L.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: v(l(B).typed_confirm_input),
						"data-testid": "llm-credential-input"
					}, null, 10, Z), [[c, L.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), p("div", { class: v(l(B).actions_row) }, [x(w, {
					label: l(a)("common.actions.save"),
					pending: R.value,
					onClick: se
				}, null, 8, ["label", "pending"]), x(w, {
					label: l(a)("common.actions.cancel"),
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
				title: l(a)("settings.llm_connections.remove_confirm_title", { name: j.value?.display_name ?? "" }),
				description: l(a)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": l(a)("confirmations.destructive.default_confirm_action"),
				"cancel-label": l(a)("confirmations.destructive.default_cancel_action"),
				pending: M.value,
				"onUpdate:open": u[10] ||= (e) => !e && (j.value = null),
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
		let a = e, { t: y } = m(), b = u(!1), S = u(null), C = u(!1), D = u(null), k = u(null), A = u(!1), j = u(/* @__PURE__ */ new Map()), M = oe.map((e) => ({
			value: e,
			label: $(y, e)
		})), I = h({
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
				is_default: a.profiles.length === 0
			}, D.value = null, b.value = !0;
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
			}, D.value = null, b.value = !0;
		}
		function z() {
			b.value = !1, S.value = null, D.value = null;
		}
		async function V() {
			let e = S.value;
			if (!e || C.value) return;
			let n = e.display_name.trim(), r = e.model_id.trim(), i = e.provider_id === "comfyui" ? t.safeParse(e.workflow_id.trim()) : null;
			if (n.length === 0 || r.length === 0 || e.provider_id === "comfyui" && i?.success !== !0) {
				D.value = y("errors.validation_required");
				return;
			}
			C.value = !0, D.value = null;
			try {
				await a.controller.save_provider_profile({
					id: e.id,
					provider_id: e.provider_id,
					display_name: n,
					model_id: r,
					workflow_id: e.provider_id === "comfyui" && i?.success === !0 ? i.data : null,
					is_default: e.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString(),
					secret_reference: e.secret_reference.trim().length > 0 ? e.secret_reference : null
				}), z();
			} catch {
				D.value = y("errors.unexpected");
			} finally {
				C.value = !1;
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
					await a.controller.remove_provider_profile(e.id), k.value = null;
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
				let t = await a.controller.test_provider_profile_connection(e.id), n = t.status === "success" ? `${y("status.success")} · ${y("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : y("errors.connection_test_failed", { code: t.error.code });
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
		return (t, a) => (i(), s("div", {
			class: v(l(B).section),
			"data-testid": "provider-profiles"
		}, [
			p("div", { class: v(l(B).section_header) }, [p("h2", { class: v(l(B).section_title) }, g(l(y)("settings.sections.provider_profiles")), 3), x(w, {
				label: l(y)("settings.provider_profiles.add_action"),
				onClick: L
			}, null, 8, ["label"])], 2),
			x(T, {
				status: e.profiles.length === 0 ? "empty" : "ready",
				"empty-message": l(y)("settings.provider_profiles.empty_description")
			}, {
				default: o(() => [p("div", null, [(i(!0), s(_, null, n(e.profiles, (e) => (i(), s("div", {
					key: e.id,
					class: v(l(B).profile_row),
					"data-testid": "provider-profile-row"
				}, [p("div", { class: v(l(B).profile_identity) }, [
					p("span", { class: v(l(B).profile_name) }, g(e.display_name), 3),
					p("span", { class: v(l(B).profile_meta) }, g(l($)(l(y), e.provider_id)), 3),
					j.value.get(e.id)?.label ? (i(), s("span", {
						key: 0,
						class: v(l(B).profile_meta),
						"data-testid": "profile-test-result"
					}, g(j.value.get(e.id)?.label), 3)) : d("", !0)
				], 2), p("div", { class: v(l(B).profile_actions) }, [
					e.is_default ? (i(), s("span", {
						key: 0,
						class: v(l(B).badge)
					}, g(l(y)("settings.provider_profiles.default_badge")), 3)) : d("", !0),
					x(w, {
						label: l(y)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: j.value.get(e.id)?.pending === !0,
						onClick: (t) => U(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					x(w, {
						label: l(y)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => R(e)
					}, null, 8, ["label", "onClick"]),
					x(w, {
						label: l(y)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => H(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			x(E, {
				open: b.value,
				title: S.value?.is_new ? l(y)("settings.provider_profiles.dialog_add_title") : l(y)("settings.provider_profiles.dialog_edit_title"),
				"close-label": l(y)("common.actions.close"),
				"onUpdate:open": a[6] ||= (e) => !e && z()
			}, {
				default: o(() => [S.value ? (i(), s("div", {
					key: 0,
					class: v(l(B).form_grid)
				}, [
					x(O, {
						label: l(y)("common.labels.name"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": a[0] ||= (e) => S.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: v(l(B).typed_confirm_input)
						}, null, 10, se), [[c, S.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					x(O, {
						label: l(y)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: o(({ fieldId: e }) => [x(N, {
							id: e,
							modelValue: I.value,
							"onUpdate:modelValue": a[1] ||= (e) => I.value = e,
							options: l(M),
							placeholder: l(y)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					x(O, {
						label: l(y)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": a[2] ||= (e) => S.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: v(l(B).typed_confirm_input),
							"data-testid": "provider-model-input"
						}, null, 10, ce), [[c, S.value.model_id]])]),
						_: 1
					}, 8, ["label"]),
					S.value.provider_id === "comfyui" ? (i(), f(O, {
						key: 0,
						label: l(y)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": a[3] ||= (e) => S.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: v(l(B).typed_confirm_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, le), [[c, S.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : d("", !0),
					x(O, {
						label: l(y)("settings.gateway.token_secret_label"),
						hint: l(y)("provider.credentials.not_stored_locally")
					}, {
						default: o(({ fieldId: e, describedBy: t }) => [r(p("input", {
							id: e,
							"onUpdate:modelValue": a[4] ||= (e) => S.value.secret_reference = e,
							type: "text",
							"aria-describedby": t,
							class: v(l(B).typed_confirm_input)
						}, null, 10, ue), [[c, S.value.secret_reference]])]),
						_: 1
					}, 8, ["label", "hint"]),
					x(F, {
						modelValue: S.value.is_default,
						"onUpdate:modelValue": a[5] ||= (e) => S.value.is_default = e,
						label: l(y)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					D.value ? (i(), s("p", {
						key: 1,
						class: v([l(B).status_text, l(B).description]),
						"data-tone": "error"
					}, g(D.value), 3)) : d("", !0),
					p("div", { class: v(l(B).actions_row) }, [x(w, {
						label: l(y)("common.actions.save"),
						pending: C.value,
						onClick: V
					}, null, 8, ["label", "pending"]), x(w, {
						label: l(y)("common.actions.cancel"),
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
				title: l(y)("settings.provider_profiles.remove_confirm_title", { name: k.value?.display_name ?? "" }),
				description: l(y)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": l(y)("confirmations.destructive.default_confirm_action"),
				"cancel-label": l(y)("confirmations.destructive.default_cancel_action"),
				pending: A.value,
				"onUpdate:open": a[7] ||= (e) => !e && (k.value = null),
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
		let { t } = m();
		return (n, r) => (i(), s("div", {
			class: v(l(B).view),
			"data-testid": "settings-view"
		}, [
			p("h1", fe, g(l(t)("nav.settings")), 1),
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
