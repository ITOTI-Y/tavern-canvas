import { a as e } from "./ids-DjWg1HG8.js";
import { a as t, c as n, i as r, s as i } from "./novelai-BG6cLQq6.js";
import { i as a, t as o } from "./novelai_models-CXz0Nwhv.js";
import { n as s, o as c, s as l } from "./llm_connection-DZhYUypM.js";
import { a as u, n as d, o as f, r as p } from "./http_acknowledgment-DGpvRi1i.js";
import { A as m, F as h, G as g, N as _, V as v, W as y, _ as b, a as x, b as S, ct as C, et as w, g as T, h as E, m as D, n as O, p as k, pt as A, s as j, u as M, ut as N, v as P, x as F, y as I } from "./vue-i18n-DUz2Gjn8.js";
import { n as L, t as R } from "./AppIcon-Cnhzrx9o.js";
import { n as z, t as B } from "./StateSurface-Bo_sA18G.js";
import { n as V, t as H } from "./AppDialog-BizR-VGE.js";
import { t as U } from "./FieldGroup-LDtWeac7.js";
import "./browser_secret_vault-DhuOFaGV.js";
import { n as ee, t as te } from "./novelai_request_defaults-B4CHIiJ8.js";
import { t as W } from "./AppSelect-CIW6ICNh.js";
import { n as G, t as K } from "./NumberStepper-jpxDjrkG.js";
import { t as ne } from "./ConfirmDialog-B3fuCaB9.js";
import { t as q } from "./AppSwitch-DlJak999.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var J = L("cable", [
	["path", {
		d: "M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z",
		key: "trhst0"
	}],
	["path", {
		d: "M17 21v-2",
		key: "ds4u3f"
	}],
	["path", {
		d: "M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10",
		key: "1mo9zo"
	}],
	["path", {
		d: "M21 21v-2",
		key: "eo0ou"
	}],
	["path", {
		d: "M3 5V3",
		key: "1k5hjh"
	}],
	["path", {
		d: "M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z",
		key: "1dd30t"
	}],
	["path", {
		d: "M7 5V3",
		key: "1t1388"
	}]
]), re = L("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), Y = L("triangle-alert", [
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
]), X = {
	view: "_view_q4cbg_7",
	onboarding: "_onboarding_q4cbg_16",
	onboarding_icon: "_onboarding_icon_q4cbg_25",
	onboarding_label: "_onboarding_label_q4cbg_37",
	onboarding_title: "_onboarding_title_q4cbg_44",
	onboarding_description: "_onboarding_description_q4cbg_51",
	section: "_section_q4cbg_70",
	section_header: "_section_header_q4cbg_79",
	section_title: "_section_title_q4cbg_89",
	row: "_row_q4cbg_95",
	row_label: "_row_label_q4cbg_104",
	row_value: "_row_value_q4cbg_112",
	profile_row: "_profile_row_q4cbg_76",
	profile_identity: "_profile_identity_q4cbg_120",
	profile_name: "_profile_name_q4cbg_144",
	profile_meta: "_profile_meta_q4cbg_151",
	profile_actions: "_profile_actions_q4cbg_161",
	badge: "_badge_q4cbg_169",
	form_grid: "_form_grid_q4cbg_178",
	status_text: "_status_text_q4cbg_184",
	risk_banner: "_risk_banner_q4cbg_204",
	risk_banner_title: "_risk_banner_title_q4cbg_218",
	risk_banner_description: "_risk_banner_description_q4cbg_230",
	risk_banner_actions: "_risk_banner_actions_q4cbg_237",
	acknowledged_note: "_acknowledged_note_q4cbg_243",
	description: "_description_q4cbg_251",
	actions_row: "_actions_row_q4cbg_258",
	vault_mode_row: "_vault_mode_row_q4cbg_264",
	vault_controls: "_vault_controls_q4cbg_280",
	vault_unlocked_actions: "_vault_unlocked_actions_q4cbg_291",
	text_input: "_text_input_q4cbg_298",
	layout: "_layout_q4cbg_314",
	section_nav: "_section_nav_q4cbg_320",
	section_nav_item: "_section_nav_item_q4cbg_328",
	section_content: "_section_content_q4cbg_341"
}, Z = /* @__PURE__ */ F({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = O(), r = {
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
		let a = k(() => [
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
		]), o = k(() => [
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
		function s(e) {
			(e === "system" || e === "light" || e === "dark") && i({ color_mode: e });
		}
		function c(e) {
			(e === "auto" || e === "zh-CN" || e === "en") && t.controller.update_settings({ locale: e });
		}
		function l(e) {
			t.controller.set_inspector_width(e), i({ inspector_width: e });
		}
		return (t, r) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "appearance-settings"
		}, [D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(n)("settings.sections.appearance")), 3)], 2), D("div", { class: N(C(X).form_grid) }, [
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.appearance.theme_label")), 3), I(G, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: C(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.appearance.language_label")), 3), I(G, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: C(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.appearance.inspector_width_label")), 3), I(K, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: C(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": C(n)("common.actions.increase"),
				"decrement-label": C(n)("common.actions.decrease"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			I(q, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: C(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), Q = ["data-tone"], $ = ["id", "aria-describedby"], ie = ["id", "aria-describedby"], ae = ["id", "aria-describedby"], oe = /* @__PURE__ */ F({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = O(), r = w(""), i = w(""), a = w(!1), o = w(null), s = w(!1), c = k(() => [
			{
				value: "browser_device",
				label: n("settings.credential_storage.modes.browser_device")
			},
			{
				value: "host",
				label: n("settings.credential_storage.modes.host")
			},
			{
				value: "browser_encrypted",
				label: n("settings.credential_storage.modes.browser_encrypted")
			}
		]), l = k({
			get: () => t.settings?.credential_storage_mode ?? "browser_device",
			set: (e) => {
				o.value = null, t.controller.update_settings({ credential_storage_mode: e }).catch(() => {
					o.value = n("errors.unexpected");
				});
			}
		}), u = k(() => {
			let e = { count: t.vaultStatus.secret_count };
			switch (t.vaultStatus.state) {
				case "unavailable": return n("settings.credential_storage.states.unavailable", e);
				case "error": return n("settings.credential_storage.states.error", e);
				case "uninitialized": return n("settings.credential_storage.states.uninitialized", e);
				case "locked": return n("settings.credential_storage.states.locked", e);
				case "unlocked": return n("settings.credential_storage.states.unlocked", e);
			}
		}), d = k(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function f() {
			r.value = "", i.value = "";
		}
		function p(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function m(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function h() {
			if (!(a.value || !p(!0))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.initialize_browser_secret_vault(r.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), f();
				} catch (e) {
					o.value = m(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function v() {
			if (!(a.value || !p(!1))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.unlock_browser_secret_vault(r.value), f();
				} catch (e) {
					o.value = m(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function S() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.lock_browser_secret_vault(), f();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		async function E() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.reset_browser_secret_vault(), s.value = !1, f();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		return (t, f) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "credential-storage-settings"
		}, [
			D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (_(), b("span", {
				key: 0,
				class: N(C(X).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, A(u.value), 11, Q)) : T("", !0)], 2),
			D("div", { class: N(C(X).vault_mode_row) }, [D("div", { class: N(C(X).profile_identity) }, [D("span", { class: N(C(X).profile_name) }, A(C(n)("settings.credential_storage.mode_label")), 3), D("span", { class: N(C(X).profile_meta) }, A(C(n)("settings.credential_storage.mode_hint")), 3)], 2), I(G, {
				modelValue: l.value,
				"onUpdate:modelValue": f[0] ||= (e) => l.value = e,
				options: c.value,
				label: C(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (_(), b("div", {
				key: 0,
				class: N(C(X).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (_(), b("p", {
				key: 0,
				class: N(C(X).status_text),
				"data-tone": "error",
				role: "alert"
			}, A(d.value), 3)) : e.vaultStatus.state === "uninitialized" ? (_(), b(M, { key: 1 }, [
				I(U, {
					label: C(n)("settings.credential_storage.passphrase_label"),
					hint: C(n)("settings.credential_storage.passphrase_hint", { count: C(12) }),
					required: ""
				}, {
					default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
						id: e,
						"onUpdate:modelValue": f[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: N(C(X).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, $), [[x, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				I(U, {
					label: C(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
						id: e,
						"onUpdate:modelValue": f[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: N(C(X).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, ie), [[x, i.value]])]),
					_: 1
				}, 8, ["label"]),
				I(z, {
					label: C(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: h
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (_(), b(M, { key: 2 }, [I(U, {
				label: C(n)("settings.credential_storage.passphrase_label"),
				hint: C(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
					id: e,
					"onUpdate:modelValue": f[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: N(C(X).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: j(v, ["enter"])
				}, null, 42, ae), [[x, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), I(z, {
				label: C(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: v
			}, null, 8, ["label", "pending"])], 64)) : (_(), b("div", {
				key: 3,
				class: N(C(X).vault_unlocked_actions)
			}, [I(z, {
				label: C(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: S
			}, null, 8, ["label", "pending"]), I(z, {
				label: C(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: f[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (_(), b("p", {
				key: 4,
				class: N(C(X).status_text),
				"data-tone": "error",
				role: "alert"
			}, A(o.value), 3)) : T("", !0)], 2)) : T("", !0),
			I(ne, {
				open: s.value,
				title: C(n)("settings.credential_storage.reset_confirm_title"),
				description: C(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": C(n)("settings.credential_storage.reset_action"),
				"cancel-label": C(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": f[5] ||= (e) => s.value = e,
				onConfirm: E
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
}), se = ["aria-label"], ce = ["aria-label"], le = /* @__PURE__ */ F({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = O(), r = w(!1), i = [{
			value: "bundled",
			label: n("settings.data.vocabulary_channel_bundled")
		}, {
			value: "remote",
			label: n("settings.data.vocabulary_channel_https")
		}];
		async function a(e) {
			if (!(e !== "bundled" && e !== "remote" || r.value)) {
				r.value = !0;
				try {
					await t.controller.set_vocabulary_update_channel(e);
				} finally {
					r.value = !1;
				}
			}
		}
		let o = w(!1), s = w(!1), c = w(null), l = w(null), u = w(null);
		function d() {
			u.value?.click();
		}
		function f() {
			t.controller.cancel_vocabulary_import();
		}
		async function p(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || o.value)) {
				o.value = !0, s.value = !1, c.value = null, l.value = null;
				try {
					await t.controller.import_vocabulary_package(i, (e) => {
						l.value = e;
					}), s.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					c.value = n("settings.data.vocabulary_import_error", { code: t });
				} finally {
					o.value = !1;
				}
			}
		}
		let m = k(() => {
			let e = l.value;
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
		}), h = w(!1), g = w(null);
		async function v() {
			if (!h.value) {
				h.value = !0, g.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "inkwell-archive.zip", r.click(), URL.revokeObjectURL(n);
				} catch {
					g.value = n("errors.unexpected");
				} finally {
					h.value = !1;
				}
			}
		}
		let y = w(!1), x = w(null), S = w(null);
		function j() {
			S.value?.click();
		}
		async function M(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || y.value)) {
				y.value = !0, x.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					x.value = n("errors.unexpected");
				} finally {
					y.value = !1;
				}
			}
		}
		return (t, l) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "data-settings"
		}, [D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(n)("settings.sections.data")), 3)], 2), D("div", { class: N(C(X).form_grid) }, [
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.data.vocabulary_channel_label")), 3), I(G, {
				"model-value": e.vocabularyUpdateChannel ?? "bundled",
				options: i,
				label: C(n)("settings.data.vocabulary_channel_label"),
				disabled: r.value,
				"onUpdate:modelValue": a
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])], 2),
			D("div", { class: N(C(X).actions_row) }, [
				I(z, {
					label: C(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: o.value,
					onClick: d
				}, null, 8, ["label", "pending"]),
				o.value ? (_(), E(z, {
					key: 0,
					label: C(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: f
				}, null, 8, ["label"])) : T("", !0),
				D("input", {
					ref_key: "vocabulary_file_input",
					ref: u,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": C(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: p
				}, null, 40, se)
			], 2),
			D("p", { class: N(C(X).description) }, A(C(n)("settings.data.vocabulary_import.description")), 3),
			m.value ? (_(), b("p", {
				key: 0,
				class: N([C(X).status_text, C(X).description]),
				"data-testid": "vocabulary-import-progress"
			}, A(m.value), 3)) : T("", !0),
			s.value ? (_(), b("p", {
				key: 1,
				class: N([C(X).status_text, C(X).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, A(C(n)("settings.data.vocabulary_import.success")), 3)) : T("", !0),
			c.value ? (_(), b("p", {
				key: 2,
				class: N([C(X).status_text, C(X).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, A(c.value), 3)) : T("", !0),
			D("div", { class: N(C(X).actions_row) }, [
				I(z, {
					label: C(n)("settings.data.archive_export_action"),
					pending: h.value,
					onClick: v
				}, null, 8, ["label", "pending"]),
				I(z, {
					label: C(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: y.value,
					onClick: j
				}, null, 8, ["label", "pending"]),
				D("input", {
					ref_key: "file_input",
					ref: S,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": C(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: M
				}, null, 40, ce)
			], 2),
			D("p", { class: N(C(X).description) }, A(C(n)("settings.data.archive_import_description")), 3),
			g.value ? (_(), b("p", {
				key: 3,
				class: N([C(X).status_text, C(X).description]),
				"data-tone": "error"
			}, A(g.value), 3)) : T("", !0),
			x.value ? (_(), b("p", {
				key: 4,
				class: N([C(X).status_text, C(X).description]),
				"data-tone": "error"
			}, A(x.value), 3)) : T("", !0)
		], 2)], 2));
	}
}), ue = ["id", "aria-describedby"], de = ["data-severity"], fe = ["id"], pe = ["id", "aria-describedby"], me = /* @__PURE__ */ F({
	__name: "GatewaySettings",
	props: {
		settings: {},
		connectionTestCommand: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = O(), r = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, i = w(t.settings?.gateway.endpoint ?? ""), a = w(null), o = w(!1), s = w(!1), c = w(""), l = w(!1), m = w(null);
		v(() => t.settings?.gateway.endpoint ?? "", (e) => {
			i.value = e;
		});
		let h = k(() => {
			let e = i.value.trim();
			if (e.length === 0) return null;
			try {
				if (!f(e)) return null;
				let n = u(e), r = d(n), i = p(t.settings?.gateway.http_acknowledgments ?? {}, n);
				return {
					origin: n,
					severity: r === "public_or_unknown" ? "error" : "warning",
					acknowledged: i
				};
			} catch {
				return null;
			}
		});
		async function S() {
			if (o.value) return;
			let e = i.value.trim();
			if (a.value = null, e.length === 0) {
				o.value = !0;
				try {
					await t.controller.update_settings({ gateway: {
						...t.settings?.gateway ?? r,
						endpoint: null
					} });
				} finally {
					o.value = !1;
				}
				return;
			}
			let s;
			try {
				s = u(e);
			} catch {
				a.value = n("errors.validation_required");
				return;
			}
			o.value = !0;
			try {
				await t.controller.update_settings({ gateway: {
					...t.settings?.gateway ?? r,
					endpoint: s
				} });
			} finally {
				o.value = !1;
			}
		}
		async function j() {
			let e = h.value;
			if (!(!e || s.value)) {
				s.value = !0;
				try {
					await t.controller.acknowledge_http_origin(e.origin);
				} finally {
					s.value = !1;
				}
			}
		}
		async function M() {
			let e = c.value.trim();
			if (m.value = null, !(e.length === 0 || l.value)) {
				l.value = !0;
				try {
					await t.controller.set_gateway_token(e), c.value = "";
				} catch {
					m.value = n("settings.credential_storage.unlock_required");
				} finally {
					l.value = !1;
				}
			}
		}
		async function F() {
			if (!l.value) {
				l.value = !0, m.value = null;
				try {
					await t.controller.clear_gateway_token();
				} catch {
					m.value = n("settings.credential_storage.unlock_required");
				} finally {
					l.value = !1;
				}
			}
		}
		function L() {
			t.controller.test_diagnostics_connection();
		}
		let B = k(() => t.connectionTestCommand.status === "pending");
		return (t, r) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "gateway-settings"
		}, [D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(n)("settings.sections.gateway")), 3)], 2), D("div", { class: N(C(X).form_grid) }, [
			I(U, {
				label: C(n)("settings.gateway.endpoint_label"),
				hint: C(n)("settings.gateway.endpoint_hint"),
				error: a.value
			}, {
				default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
					id: e,
					"onUpdate:modelValue": r[0] ||= (e) => i.value = e,
					type: "text",
					"aria-describedby": t,
					class: N(C(X).text_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: S
				}, null, 42, ue), [[x, i.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			h.value && !h.value.acknowledged ? (_(), b("div", {
				key: 0,
				class: N(C(X).risk_banner),
				"data-severity": h.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				D("div", { class: N(C(X).risk_banner_title) }, [I(R, {
					icon: C(Y),
					size: 16
				}, null, 8, ["icon"]), P(" " + A(C(n)("settings.http_risk.warning_title")), 1)], 2),
				D("p", { class: N(C(X).risk_banner_description) }, A(h.value.severity === "error" ? C(n)("settings.http_risk.error_description_public", { origin: h.value.origin }) : C(n)("settings.http_risk.warning_description_local", { origin: h.value.origin })), 3),
				D("p", { class: N(C(X).risk_banner_description) }, A(C(n)("settings.http_risk.disclosure")), 3),
				D("div", { class: N(C(X).risk_banner_actions) }, [I(z, {
					label: C(n)("settings.http_risk.continue_action"),
					pending: s.value,
					onClick: j
				}, null, 8, ["label", "pending"])], 2)
			], 10, de)) : h.value && h.value.acknowledged ? (_(), b("div", {
				key: 1,
				class: N(C(X).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [I(R, {
				icon: C(re),
				size: 14
			}, null, 8, ["icon"]), P(" " + A(C(n)("settings.http_risk.acknowledged_label")), 1)], 2)) : T("", !0),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.gateway.protocol_label")), 3), I(z, {
				label: C(n)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: B.value,
				onClick: L
			}, null, 8, ["label", "pending"])], 2),
			I(U, { label: C(n)("settings.gateway.token_secret_label") }, {
				default: y(({ fieldId: t }) => [D("span", {
					id: t,
					class: N(C(X).row_value),
					"data-testid": "gateway-token-reference"
				}, A(e.settings?.gateway.token_secret_id ?? C(n)("settings.gateway.token_not_set")), 11, fe)]),
				_: 1
			}, 8, ["label"]),
			I(U, {
				label: C(n)("settings.gateway.token_label"),
				hint: C(n)("settings.gateway.token_hint"),
				error: m.value
			}, {
				default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
					id: e,
					"onUpdate:modelValue": r[1] ||= (e) => c.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: N(C(X).text_input),
					"data-testid": "gateway-token-input"
				}, null, 10, pe), [[x, c.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			D("div", { class: N(C(X).row) }, [I(z, {
				label: C(n)("settings.gateway.token_save_action"),
				pending: l.value,
				disabled: c.value.trim().length === 0,
				"data-testid": "gateway-token-save",
				onClick: M
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), e.settings?.gateway.token_secret_id ? (_(), E(z, {
				key: 0,
				label: C(n)("settings.gateway.token_clear_action"),
				variant: "secondary",
				pending: l.value,
				"data-testid": "gateway-token-clear",
				onClick: F
			}, null, 8, ["label", "pending"])) : T("", !0)], 2)
		], 2)], 2));
	}
}), he = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], ge = ["id", "aria-describedby"], _e = ["id", "aria-describedby"], ve = ["id", "aria-describedby"], ye = ["id", "aria-describedby"], be = ["id", "aria-describedby"], xe = "in_use", Se = "none", Ce = /* @__PURE__ */ F({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = O(), r = k(() => t.settings?.illustration ?? null);
		function i(e) {
			t.controller.update_settings(e);
		}
		function a(e) {
			let t = r.value;
			t !== null && i({ illustration: {
				...t,
				...e
			} });
		}
		let o = w(""), s = w(""), c = w(""), l = w(""), u = w("");
		v(r, (e) => {
			o.value = e === null || e.preset_name === xe ? "" : e.preset_name, e?.connection.kind === "proxy_preset" ? (s.value = e.connection.proxy_preset, c.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (l.value = e.connection.api_url, u.value = e.connection.model);
		}, { immediate: !0 });
		function d() {
			a({ preset_name: o.value.trim() || xe });
		}
		let f = k(() => [
			{
				value: "current",
				label: n("settings.illustration.connection_current")
			},
			{
				value: "proxy_preset",
				label: n("settings.illustration.connection_proxy_preset")
			},
			{
				value: "custom",
				label: n("settings.illustration.connection_custom")
			}
		]);
		function p() {
			let e = s.value.trim();
			if (e === "") return null;
			let t = c.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function h() {
			let e = l.value.trim(), t = u.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let S = k(() => B.value === "custom" && l.value.trim() !== "" && h() === null);
		function E() {
			let e = h();
			e !== null && a({ connection: e });
		}
		let j = w(""), P = w("idle");
		async function F() {
			let e = j.value.trim();
			if (e !== "") {
				P.value = "saving";
				try {
					await t.controller.set_analysis_key(e), j.value = "", P.value = "saved";
				} catch {
					P.value = "failed";
				}
			}
		}
		async function L() {
			P.value = "saving";
			try {
				await t.controller.clear_analysis_key(), P.value = "cleared";
			} catch {
				P.value = "failed";
			}
		}
		let R = k(() => {
			switch (P.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), B = w(r.value?.connection.kind ?? "current");
		v(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (B.value = e);
		});
		function V(e) {
			if (e === "current") B.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				B.value = "proxy_preset";
				let e = p();
				e !== null && a({ connection: e });
			} else e === "custom" && (B.value = "custom", E());
		}
		function H() {
			let e = p();
			e !== null && a({ connection: e });
		}
		let ee = k(() => [{
			value: Se,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function te(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let ne = k(() => [
			{
				value: "chat",
				label: n("settings.illustration.world_info_chat")
			},
			{
				value: "worldbook",
				label: n("settings.illustration.world_info_worldbook")
			},
			{
				value: "off",
				label: n("settings.illustration.world_info_off")
			}
		]), J = w(r.value?.world_info.mode ?? "chat");
		v(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (J.value = e);
		});
		let re = w([]), Y = w(!1);
		async function Z() {
			try {
				re.value = await t.controller.list_worldbooks(), Y.value = !1;
			} catch {
				Y.value = !0;
			}
		}
		m(() => {
			J.value === "worldbook" && Z();
		});
		let Q = k(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbook : void 0), $ = k(() => [.../* @__PURE__ */ new Set([...re.value, ...Q.value === void 0 ? [] : [Q.value]])].map((e) => ({
			value: e,
			label: e
		})));
		function ie(e) {
			e === "chat" || e === "off" ? (J.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (J.value = e, Z());
		}
		function ae(e) {
			a({ world_info: {
				mode: "worldbook",
				worldbook: e
			} });
		}
		return (t, p) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "illustration-settings"
		}, [D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(n)("settings.nav.illustration")), 3)], 2), D("div", { class: N(C(X).form_grid) }, [
			I(q, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: C(n)("settings.illustration.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": p[0] ||= (e) => i({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			D("p", { class: N(C(X).description) }, A(C(n)("settings.illustration.auto_generation_hint")), 3),
			I(U, {
				label: C(n)("settings.illustration.preset_label"),
				hint: C(n)("settings.illustration.preset_hint")
			}, {
				default: y(({ fieldId: t, describedBy: r }) => [g(D("input", {
					id: t,
					"onUpdate:modelValue": p[1] ||= (e) => o.value = e,
					type: "text",
					placeholder: C(n)("settings.illustration.preset_placeholder"),
					"aria-describedby": r,
					class: N(C(X).text_input),
					disabled: !e.settings,
					"data-testid": "analysis-preset-input",
					onBlur: d
				}, null, 42, he), [[x, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.illustration.connection_label")), 3), I(G, {
				"model-value": B.value,
				options: f.value,
				label: C(n)("settings.illustration.connection_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": V
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			B.value === "proxy_preset" ? (_(), b(M, { key: 0 }, [I(U, {
				label: C(n)("settings.illustration.proxy_preset_label"),
				hint: C(n)("settings.illustration.proxy_preset_hint")
			}, {
				default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
					id: e,
					"onUpdate:modelValue": p[2] ||= (e) => s.value = e,
					type: "text",
					"aria-describedby": t,
					class: N(C(X).text_input),
					"data-testid": "analysis-proxy-preset-input",
					onBlur: H
				}, null, 42, ge), [[x, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]), I(U, {
				label: C(n)("settings.illustration.proxy_model_label"),
				hint: C(n)("settings.illustration.proxy_model_hint")
			}, {
				default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
					id: e,
					"onUpdate:modelValue": p[3] ||= (e) => c.value = e,
					type: "text",
					"aria-describedby": t,
					class: N(C(X).text_input),
					onBlur: H
				}, null, 42, _e), [[x, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])], 64)) : T("", !0),
			B.value === "custom" ? (_(), b(M, { key: 1 }, [
				I(U, {
					label: C(n)("settings.illustration.custom_url_label"),
					hint: C(n)("settings.illustration.custom_url_hint"),
					error: S.value ? C(n)("settings.illustration.custom_invalid") : null
				}, {
					default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
						id: e,
						"onUpdate:modelValue": p[4] ||= (e) => l.value = e,
						type: "url",
						placeholder: "https://",
						"aria-describedby": t,
						class: N(C(X).text_input),
						"data-testid": "analysis-custom-url-input",
						onBlur: E
					}, null, 42, ve), [[x, l.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]),
				I(U, { label: C(n)("settings.illustration.custom_model_label") }, {
					default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
						id: e,
						"onUpdate:modelValue": p[5] ||= (e) => u.value = e,
						type: "text",
						"aria-describedby": t,
						class: N(C(X).text_input),
						"data-testid": "analysis-custom-model-input",
						onBlur: E
					}, null, 42, ye), [[x, u.value]])]),
					_: 1
				}, 8, ["label"]),
				I(U, {
					label: C(n)("settings.illustration.custom_key_label"),
					hint: C(n)("settings.illustration.custom_key_hint")
				}, {
					default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
						id: e,
						"onUpdate:modelValue": p[6] ||= (e) => j.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: N(C(X).text_input),
						"data-testid": "analysis-custom-key-input"
					}, null, 10, be), [[x, j.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				D("div", { class: N(C(X).actions_row) }, [
					I(z, {
						label: C(n)("settings.illustration.custom_key_save"),
						variant: "primary",
						pending: P.value === "saving",
						disabled: j.value.trim() === "",
						onClick: F
					}, null, 8, [
						"label",
						"pending",
						"disabled"
					]),
					I(z, {
						label: C(n)("settings.illustration.custom_key_clear"),
						onClick: L
					}, null, 8, ["label"]),
					D("span", {
						class: N(C(X).status_text),
						role: "status"
					}, A(R.value), 3)
				], 2)
			], 64)) : T("", !0),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.illustration.chat_history_label")), 3), I(K, {
				"model-value": r.value?.max_chat_history,
				label: C(n)("settings.illustration.chat_history_label"),
				min: 0,
				max: 20,
				"increment-label": C(n)("common.actions.increase"),
				"decrement-label": C(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": p[7] ||= (e) => a({ max_chat_history: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.illustration.world_info_label")), 3), I(G, {
				"model-value": J.value,
				options: ne.value,
				label: C(n)("settings.illustration.world_info_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": ie
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			D("p", { class: N(C(X).description) }, A(C(n)("settings.illustration.world_info_hint")), 3),
			J.value === "worldbook" ? (_(), b(M, { key: 2 }, [D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.illustration.worldbook_label")), 3), I(W, {
				"model-value": Q.value,
				options: $.value,
				placeholder: C(n)("settings.illustration.worldbook_placeholder"),
				"aria-label": C(n)("settings.illustration.worldbook_label"),
				"onUpdate:modelValue": ae
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2), Y.value ? (_(), b("p", {
				key: 0,
				class: N(C(X).description),
				role: "alert"
			}, A(C(n)("settings.illustration.worldbook_unavailable")), 3)) : T("", !0)], 64)) : T("", !0),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.illustration.max_images_label")), 3), I(K, {
				"model-value": r.value?.max_images_per_message,
				label: C(n)("settings.illustration.max_images_label"),
				min: 1,
				max: 8,
				"increment-label": C(n)("common.actions.increase"),
				"decrement-label": C(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": p[8] ||= (e) => a({ max_images_per_message: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.illustration.prompt_preset_label")), 3), I(W, {
				"model-value": r.value?.prompt_preset_id ?? Se,
				options: ee.value,
				placeholder: C(n)("settings.illustration.prompt_preset_label"),
				"aria-label": C(n)("settings.illustration.prompt_preset_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": te
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label",
				"disabled"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.illustration.concurrency_label")), 3), I(K, {
				"model-value": e.settings?.global_concurrency,
				label: C(n)("settings.illustration.concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": C(n)("common.actions.increase"),
				"decrement-label": C(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": p[9] ||= (e) => i({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2)
		], 2)], 2));
	}
}), we = [
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
];
function Te(e, t) {
	switch (t) {
		case "openai_compatible": return e("settings.llm_connections.provider_kinds.openai_compatible");
		case "anthropic": return e("settings.llm_connections.provider_kinds.anthropic");
		case "google_generative": return e("settings.llm_connections.provider_kinds.google_generative");
		case "ollama": return e("settings.llm_connections.provider_kinds.ollama");
	}
}
function Ee(e) {
	return s[e].completion_routes;
}
//#endregion
//#region src/ui/views/settings/LlmConnections.vue?vue&type=script&setup=true&lang.ts
var De = ["id", "aria-describedby"], Oe = ["id", "aria-describedby"], ke = ["id", "aria-describedby"], Ae = /* @__PURE__ */ F({
	__name: "LlmConnections",
	props: {
		connections: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = O(), r = w(!1), i = w(null), a = w(!1), o = w(null), s = w(null), c = w(null), l = w(null), u = w(!1), d = w(null), f = w(""), p = w(!1), m = w(null), v = w(/* @__PURE__ */ new Map()), S = k(() => we.map((e) => ({
			value: e,
			label: Te(n, e)
		}))), j = k(() => Ee(i.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), P = k({
			get: () => i.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				i.value && (i.value.provider_kind = e, i.value.route = Ee(i.value.provider_kind)[0] ?? "");
			}
		}), F = k({
			get: () => i.value?.route ?? "",
			set: (e) => {
				i.value && (i.value.route = e);
			}
		});
		function L() {
			i.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_kind: "openai_compatible",
				route: Ee("openai_compatible")[0] ?? "",
				display_name: "",
				model_id: "",
				temperature: .7,
				max_output_tokens: 2048,
				is_default: t.connections.length === 0
			}, V(), r.value = !0;
		}
		function R(e) {
			i.value = {
				id: e.id,
				is_new: !1,
				provider_kind: e.provider_kind,
				route: e.route,
				display_name: e.display_name,
				model_id: e.model_id,
				temperature: e.temperature,
				max_output_tokens: e.max_output_tokens,
				is_default: e.is_default
			}, V(), r.value = !0;
		}
		function V() {
			o.value = null, s.value = null, c.value = null;
		}
		function ee() {
			r.value = !1, i.value = null, V();
		}
		async function te() {
			let e = i.value;
			if (!e || a.value) return;
			V();
			let r = e.display_name.trim(), l = e.model_id.trim();
			if (r.length === 0 && (o.value = n("errors.validation_required")), l.length === 0 && (s.value = n("errors.validation_required")), !(o.value || s.value)) {
				a.value = !0;
				try {
					await t.controller.save_llm_connection({
						id: e.id,
						display_name: r,
						provider_kind: e.provider_kind,
						route: e.route,
						model_id: l,
						temperature: e.temperature,
						max_output_tokens: e.max_output_tokens,
						is_default: e.is_default
					}), ee();
				} catch {
					c.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		function G(e) {
			l.value = e;
		}
		async function J() {
			let e = l.value;
			if (!(!e || u.value)) {
				u.value = !0;
				try {
					await t.controller.remove_llm_connection(e.id), l.value = null;
				} finally {
					u.value = !1;
				}
			}
		}
		function re(e) {
			d.value = e, f.value = "", m.value = null;
		}
		function Y() {
			d.value = null, f.value = "", m.value = null;
		}
		async function Z() {
			let e = d.value;
			if (!(!e || p.value)) {
				if (f.value.trim().length === 0) {
					m.value = n("errors.validation_required");
					return;
				}
				p.value = !0, m.value = null;
				try {
					await t.controller.set_llm_connection_credential(e.id, f.value), Y();
				} catch {
					m.value = n("settings.credential_storage.unlock_required");
				} finally {
					p.value = !1, f.value = "";
				}
			}
		}
		async function Q(e) {
			try {
				await t.controller.clear_llm_connection_credential(e.id);
			} catch {
				d.value = e, f.value = "", m.value = n("settings.credential_storage.unlock_required");
			}
		}
		async function $(e) {
			v.value = new Map(v.value).set(e.id, {
				pending: !0,
				label: null
			});
			let r;
			try {
				let i = await t.controller.test_llm_connection(e.id);
				r = i.status === "success" ? `${n("status.success")} · ${n("diagnostics.connection_tests.latency_label", { ms: i.latency_ms })}` : n("errors.connection_test_failed", { code: i.code });
			} catch {
				r = n("errors.unexpected");
			}
			v.value = new Map(v.value).set(e.id, {
				pending: !1,
				label: r
			});
		}
		return (t, w) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "llm-connections"
		}, [
			D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(n)("settings.sections.llm_connections")), 3), I(z, {
				label: C(n)("settings.llm_connections.add_action"),
				onClick: L
			}, null, 8, ["label"])], 2),
			D("p", { class: N(C(X).description) }, A(C(n)("settings.llm_connections.section_description")), 3),
			I(B, {
				status: e.loading ? "loading" : e.connections.length === 0 ? "empty" : "ready",
				"empty-message": C(n)("settings.llm_connections.empty_description")
			}, {
				action: y(() => [I(z, {
					label: C(n)("settings.llm_connections.add_action"),
					onClick: L
				}, null, 8, ["label"])]),
				default: y(() => [D("div", null, [(_(!0), b(M, null, h(e.connections, (e) => (_(), b("div", {
					key: e.id,
					class: N(C(X).profile_row),
					"data-testid": "llm-connection-row"
				}, [D("div", { class: N(C(X).profile_identity) }, [
					D("span", { class: N(C(X).profile_name) }, A(e.display_name), 3),
					D("span", { class: N(C(X).profile_meta) }, A(C(Te)(C(n), e.provider_kind)) + " · " + A(e.model_id), 3),
					D("span", {
						class: N(C(X).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, A(e.credential_reference ? C(n)("settings.llm_connections.credential_set") : C(n)("settings.llm_connections.credential_unset")), 3),
					v.value.get(e.id)?.label ? (_(), b("span", {
						key: 0,
						class: N(C(X).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, A(v.value.get(e.id)?.label), 3)) : T("", !0)
				], 2), D("div", { class: N(C(X).profile_actions) }, [
					e.is_default ? (_(), b("span", {
						key: 0,
						class: N(C(X).badge)
					}, A(C(n)("settings.llm_connections.default_badge")), 3)) : T("", !0),
					I(z, {
						label: C(n)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: v.value.get(e.id)?.pending === !0,
						onClick: (t) => $(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					I(z, {
						label: C(n)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (t) => re(e)
					}, null, 8, ["label", "onClick"]),
					e.credential_reference ? (_(), E(z, {
						key: 1,
						label: C(n)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => Q(e)
					}, null, 8, ["label", "onClick"])) : T("", !0),
					I(z, {
						label: C(n)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => R(e)
					}, null, 8, ["label", "onClick"]),
					I(z, {
						label: C(n)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => G(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			I(H, {
				open: r.value,
				title: i.value?.is_new ? C(n)("settings.llm_connections.dialog_add_title") : C(n)("settings.llm_connections.dialog_edit_title"),
				description: C(n)("settings.llm_connections.dialog_description"),
				"close-label": C(n)("common.actions.close"),
				"onUpdate:open": w[7] ||= (e) => !e && ee()
			}, {
				default: y(() => [i.value ? (_(), b("div", {
					key: 0,
					class: N(C(X).form_grid)
				}, [
					I(U, {
						label: C(n)("common.labels.name"),
						error: o.value,
						required: ""
					}, {
						default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
							id: e,
							"onUpdate:modelValue": w[0] ||= (e) => i.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: N(C(X).text_input)
						}, null, 10, De), [[x, i.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					I(U, {
						label: C(n)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: y(({ fieldId: e }) => [I(W, {
							id: e,
							modelValue: P.value,
							"onUpdate:modelValue": w[1] ||= (e) => P.value = e,
							options: S.value,
							placeholder: C(n)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					I(U, {
						label: C(n)("settings.llm_connections.route_label"),
						hint: C(n)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: y(({ fieldId: e }) => [I(W, {
							id: e,
							modelValue: F.value,
							"onUpdate:modelValue": w[2] ||= (e) => F.value = e,
							options: j.value,
							placeholder: C(n)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					I(U, {
						label: C(n)("settings.llm_connections.model_label"),
						hint: C(n)("settings.llm_connections.model_hint"),
						error: s.value,
						required: ""
					}, {
						default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
							id: e,
							"onUpdate:modelValue": w[3] ||= (e) => i.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: N(C(X).text_input)
						}, null, 10, Oe), [[x, i.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					I(U, {
						label: C(n)("settings.llm_connections.temperature_label"),
						hint: C(n)("settings.llm_connections.temperature_hint")
					}, {
						default: y(() => [I(K, {
							modelValue: i.value.temperature,
							"onUpdate:modelValue": w[4] ||= (e) => i.value.temperature = e,
							label: C(n)("settings.llm_connections.temperature_label"),
							"increment-label": C(n)("common.actions.increase"),
							"decrement-label": C(n)("common.actions.decrease"),
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
					I(U, { label: C(n)("settings.llm_connections.max_output_tokens_label") }, {
						default: y(() => [I(K, {
							modelValue: i.value.max_output_tokens,
							"onUpdate:modelValue": w[5] ||= (e) => i.value.max_output_tokens = e,
							label: C(n)("settings.llm_connections.max_output_tokens_label"),
							"increment-label": C(n)("common.actions.increase"),
							"decrement-label": C(n)("common.actions.decrease"),
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
					I(q, {
						modelValue: i.value.is_default,
						"onUpdate:modelValue": w[6] ||= (e) => i.value.is_default = e,
						label: C(n)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					c.value ? (_(), b("p", {
						key: 0,
						class: N([C(X).status_text, C(X).description]),
						"data-tone": "error"
					}, A(c.value), 3)) : T("", !0),
					D("div", { class: N(C(X).actions_row) }, [I(z, {
						label: C(n)("common.actions.save"),
						pending: a.value,
						onClick: te
					}, null, 8, ["label", "pending"]), I(z, {
						label: C(n)("common.actions.cancel"),
						variant: "secondary",
						onClick: ee
					}, null, 8, ["label"])], 2)
				], 2)) : T("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			I(H, {
				open: d.value !== null,
				title: C(n)("settings.llm_connections.credential_dialog_title"),
				description: C(n)("settings.llm_connections.credential_dialog_description"),
				"close-label": C(n)("common.actions.close"),
				"onUpdate:open": w[9] ||= (e) => !e && Y()
			}, {
				default: y(() => [D("div", { class: N(C(X).form_grid) }, [I(U, {
					label: C(n)("settings.llm_connections.credential_label"),
					hint: C(n)("provider.credentials.not_stored_locally"),
					error: m.value,
					required: ""
				}, {
					default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
						id: e,
						"onUpdate:modelValue": w[8] ||= (e) => f.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: N(C(X).text_input),
						"data-testid": "llm-credential-input"
					}, null, 10, ke), [[x, f.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), D("div", { class: N(C(X).actions_row) }, [I(z, {
					label: C(n)("common.actions.save"),
					pending: p.value,
					onClick: Z
				}, null, 8, ["label", "pending"]), I(z, {
					label: C(n)("common.actions.cancel"),
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
			I(ne, {
				open: l.value !== null,
				title: C(n)("settings.llm_connections.remove_confirm_title", { name: l.value?.display_name ?? "" }),
				description: C(n)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": C(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": C(n)("confirmations.destructive.default_cancel_action"),
				pending: u.value,
				"onUpdate:open": w[10] ||= (e) => !e && (l.value = null),
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
}), je = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, Me = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function Ne(e, t) {
	switch (t) {
		case "standard": return e("settings.novelai.quality_standard");
		case "light": return e("settings.novelai.quality_light");
		case "none": return e("settings.novelai.quality_none");
	}
}
function Pe(e, t) {
	switch (t) {
		case "heavy": return e("settings.novelai.uc_heavy");
		case "light": return e("settings.novelai.uc_light");
		case "human_focus": return e("settings.novelai.uc_human_focus");
		case "furry_focus": return e("settings.novelai.uc_furry_focus");
		case "none": return e("settings.novelai.uc_none");
	}
}
function Fe(e, t) {
	switch (t) {
		case "vibe_transfer": return e("settings.novelai.ignored_vibe_transfer");
		case "smea": return e("settings.novelai.ignored_smea");
		case "cfg_rescale": return e("settings.novelai.ignored_cfg_rescale");
		case "variety_plus": return e("settings.novelai.ignored_variety_plus");
		case "sampler": return e("settings.novelai.ignored_sampler");
		case "steps": return e("settings.novelai.ignored_steps");
		case "undesired_content_preset": return e("settings.novelai.ignored_undesired_content");
	}
}
//#endregion
//#region src/ui/views/settings/NovelAiSettings.vue?vue&type=script&setup=true&lang.ts
var Ie = "https://novelai.net/image", Le = /* @__PURE__ */ F({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let o = e, { t: s, d: u } = O(), d = k(() => {
			let e = o.profile.model_id;
			return e != null && a(e) !== null ? e : te;
		});
		function f() {
			if (o.profile.novelai_defaults !== null) return o.profile.novelai_defaults;
			let e = ee(d.value);
			return {
				width: e.width,
				height: e.height,
				steps: e.steps,
				scale: e.scale,
				cfg_rescale: e.cfg_rescale,
				sampler: e.sampler,
				noise_schedule: e.noise_schedule,
				quality_preset: e.quality_preset,
				undesired_content_preset: e.undesired_content_preset,
				smea: e.smea,
				dyn: e.dyn,
				variety_plus: e.variety_plus,
				vibe_asset_ids: []
			};
		}
		let p = w(f());
		v(() => o.profile.id, () => {
			p.value = f();
		});
		function g(e) {
			p.value = {
				...p.value,
				...e
			};
		}
		let y = k(() => c.safeParse(p.value).success ? null : s("settings.novelai.invalid_size")), x = k(() => {
			let e = a(d.value);
			return e === null ? [] : l(e.profile, p.value);
		}), S = w(null), j = w(null), F = w(!1), L = w(!1);
		async function R() {
			L.value = !0, j.value = null, F.value = !1;
			try {
				S.value = await o.controller.load_novelai_account();
			} catch (e) {
				F.value = e instanceof Error && e.name === "ProviderNetworkError", j.value = e instanceof Error ? e.message : String(e);
			} finally {
				L.value = !1;
			}
		}
		let B = w([]);
		m(async () => {
			try {
				B.value = (await o.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				B.value = [];
			}
		});
		let H = k(() => B.value.map((e) => ({
			value: e.profile.model_id,
			label: e.profile.display_name
		})));
		async function U(e) {
			await o.controller.save_provider_profile({
				id: o.profile.id,
				provider_id: o.profile.provider_id,
				display_name: o.profile.display_name,
				model_id: e,
				workflow_id: o.profile.workflow_id ?? null,
				is_default: o.profile.is_default,
				updated_at: o.profile.updated_at
			});
		}
		let G = i.options.map((e) => ({
			value: e,
			label: je[e]
		})), ne = r.options.map((e) => ({
			value: e,
			label: Me[e]
		})), J = k(() => t.options.map((e) => ({
			value: e,
			label: Ne(s, e)
		}))), re = k(() => n.options.map((e) => ({
			value: e,
			label: Pe(s, e)
		})));
		function Y(e, t, n) {
			t.includes(n) && g({ [e]: n });
		}
		let Z = k(() => o.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function Q(e, t) {
			let n = p.value.vibe_asset_ids.filter((t) => t !== e);
			g({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let $ = w("idle");
		async function ie() {
			$.value = "saving";
			try {
				await o.controller.save_novelai_defaults(o.profile.id, p.value), $.value = "saved";
			} catch {
				$.value = "failed";
			}
		}
		return (a, o) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "novelai-settings"
		}, [D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(s)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), D("div", { class: N(C(X).form_grid) }, [
			D("div", { class: N(C(X).actions_row) }, [I(z, {
				label: C(s)("settings.novelai.refresh_account"),
				pending: L.value,
				onClick: R
			}, null, 8, ["label", "pending"]), S.value === null ? F.value ? (_(), b("span", {
				key: 1,
				class: N(C(X).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [P(A(C(s)("settings.novelai.account_unreachable")) + " ", 1), D("a", {
				href: Ie,
				target: "_blank",
				rel: "noopener noreferrer"
			}, A(C(s)("settings.novelai.account_open_site")), 1)], 2)) : j.value === null ? T("", !0) : (_(), b("span", {
				key: 2,
				class: N(C(X).status_text)
			}, A(j.value), 3)) : (_(), b("span", {
				key: 0,
				class: N(C(X).status_text),
				"data-testid": "novelai-account"
			}, A(C(s)("settings.novelai.account_summary", {
				tier: S.value.tier,
				anlas: S.value.anlas,
				expires: C(u)(new Date(S.value.expires_at), "short_date")
			})), 3))], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.model_label")), 3), I(W, {
				"model-value": d.value,
				options: H.value,
				placeholder: d.value,
				"aria-label": C(s)("settings.novelai.model_label"),
				"onUpdate:modelValue": o[0] ||= (e) => void U(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.width_label")), 3), I(K, {
				"model-value": p.value.width,
				label: C(s)("settings.novelai.width_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": C(s)("common.actions.increase"),
				"decrement-label": C(s)("common.actions.decrease"),
				"onUpdate:modelValue": o[1] ||= (e) => g({ width: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.height_label")), 3), I(K, {
				"model-value": p.value.height,
				label: C(s)("settings.novelai.height_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": C(s)("common.actions.increase"),
				"decrement-label": C(s)("common.actions.decrease"),
				"onUpdate:modelValue": o[2] ||= (e) => g({ height: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.steps_label")), 3), I(K, {
				"model-value": p.value.steps,
				label: C(s)("settings.novelai.steps_label"),
				min: 1,
				max: 50,
				"increment-label": C(s)("common.actions.increase"),
				"decrement-label": C(s)("common.actions.decrease"),
				"onUpdate:modelValue": o[3] ||= (e) => g({ steps: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.scale_label")), 3), I(K, {
				"model-value": p.value.scale,
				label: C(s)("settings.novelai.scale_label"),
				min: 0,
				max: 10,
				step: .1,
				"increment-label": C(s)("common.actions.increase"),
				"decrement-label": C(s)("common.actions.decrease"),
				"onUpdate:modelValue": o[4] ||= (e) => g({ scale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.cfg_rescale_label")), 3), I(K, {
				"model-value": p.value.cfg_rescale,
				label: C(s)("settings.novelai.cfg_rescale_label"),
				min: 0,
				max: 1,
				step: .02,
				"increment-label": C(s)("common.actions.increase"),
				"decrement-label": C(s)("common.actions.decrease"),
				"onUpdate:modelValue": o[5] ||= (e) => g({ cfg_rescale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.sampler_label")), 3), I(W, {
				"model-value": p.value.sampler,
				options: C(G),
				placeholder: C(s)("settings.novelai.sampler_label"),
				"aria-label": C(s)("settings.novelai.sampler_label"),
				"onUpdate:modelValue": o[6] ||= (e) => Y("sampler", C(i).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.noise_schedule_label")), 3), I(W, {
				"model-value": p.value.noise_schedule,
				options: C(ne),
				placeholder: C(s)("settings.novelai.noise_schedule_label"),
				"aria-label": C(s)("settings.novelai.noise_schedule_label"),
				"onUpdate:modelValue": o[7] ||= (e) => Y("noise_schedule", C(r).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.quality_label")), 3), I(W, {
				"model-value": p.value.quality_preset,
				options: J.value,
				placeholder: C(s)("settings.novelai.quality_label"),
				"aria-label": C(s)("settings.novelai.quality_label"),
				"onUpdate:modelValue": o[8] ||= (e) => Y("quality_preset", C(t).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(s)("settings.novelai.uc_label")), 3), I(W, {
				"model-value": p.value.undesired_content_preset,
				options: re.value,
				placeholder: C(s)("settings.novelai.uc_label"),
				"aria-label": C(s)("settings.novelai.uc_label"),
				"onUpdate:modelValue": o[9] ||= (e) => Y("undesired_content_preset", C(n).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			I(q, {
				"model-value": p.value.smea,
				label: C(s)("settings.novelai.smea_label"),
				"onUpdate:modelValue": o[10] ||= (e) => g({ smea: e })
			}, null, 8, ["model-value", "label"]),
			I(q, {
				"model-value": p.value.dyn,
				label: C(s)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": o[11] ||= (e) => g({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			I(q, {
				"model-value": p.value.variety_plus,
				label: C(s)("settings.novelai.variety_label"),
				"onUpdate:modelValue": o[12] ||= (e) => g({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			D("h3", { class: N(C(X).section_title) }, A(C(s)("settings.novelai.vibes_title")), 3),
			Z.value.length === 0 ? (_(), b("p", {
				key: 0,
				class: N(C(X).description)
			}, A(C(s)("settings.novelai.vibes_empty")), 3)) : T("", !0),
			(_(!0), b(M, null, h(Z.value, (e) => (_(), E(V, {
				key: e.id,
				"model-value": p.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => Q(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			x.value.length > 0 ? (_(), b("div", {
				key: 1,
				class: N(C(X).risk_banner),
				"data-testid": "novelai-ignored"
			}, [D("p", { class: N(C(X).risk_banner_title) }, A(C(s)("settings.novelai.ignored_title")), 3), (_(!0), b(M, null, h(x.value, (e) => (_(), b("p", {
				key: e,
				class: N(C(X).risk_banner_description)
			}, A(C(Fe)(C(s), e)), 3))), 128))], 2)) : T("", !0),
			y.value === null ? T("", !0) : (_(), b("p", {
				key: 2,
				class: N(C(X).status_text),
				role: "alert"
			}, A(y.value), 3)),
			D("div", { class: N(C(X).actions_row) }, [I(z, {
				label: C(s)("settings.novelai.save"),
				variant: "primary",
				pending: $.value === "saving",
				disabled: y.value !== null,
				onClick: ie
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), D("span", {
				class: N(C(X).status_text),
				role: "status"
			}, A($.value === "saved" ? C(s)("settings.novelai.saved") : $.value === "failed" ? C(s)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Re = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function ze(e, t) {
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
var Be = ["id", "aria-describedby"], Ve = ["id", "aria-describedby"], He = ["id", "aria-describedby"], Ue = ["id", "aria-describedby"], We = /* @__PURE__ */ F({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		controller: {}
	},
	setup(t) {
		let n = t, { t: r } = O(), i = w(!1), a = w(null), s = w(!1), c = w(null), l = w(null), u = w(!1), d = w(null), f = w(""), p = w(!1), m = w(null), v = w(/* @__PURE__ */ new Map()), S = Re.map((e) => ({
			value: e,
			label: ze(r, e)
		})), j = k({
			get: () => a.value?.provider_id ?? "sd_webui",
			set: (e) => {
				a.value && (a.value.provider_id = e, a.value.workflow_id = "", e === "novelai" && !P.has(a.value.model_id) && (a.value.model_id = te));
			}
		}), P = new Set(o.map((e) => e.model_id)), F = o.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		}));
		function L() {
			a.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				model_id: "",
				workflow_id: "",
				is_default: n.profiles.length === 0
			}, c.value = null, i.value = !0;
		}
		function R(e) {
			a.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				is_default: e.is_default
			}, c.value = null, i.value = !0;
		}
		function V() {
			i.value = !1, a.value = null, c.value = null;
		}
		async function ee() {
			let t = a.value;
			if (!t || s.value) return;
			let i = t.display_name.trim(), o = t.model_id.trim(), l = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (i.length === 0 || o.length === 0 || t.provider_id === "comfyui" && l?.success !== !0) {
				c.value = r("errors.validation_required");
				return;
			}
			s.value = !0, c.value = null;
			try {
				await n.controller.save_provider_profile({
					id: t.id,
					provider_id: t.provider_id,
					display_name: i,
					model_id: o,
					workflow_id: t.provider_id === "comfyui" && l?.success === !0 ? l.data : null,
					is_default: t.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}), V();
			} catch {
				c.value = r("errors.unexpected");
			} finally {
				s.value = !1;
			}
		}
		function G(e) {
			l.value = e;
		}
		async function K() {
			let e = l.value;
			if (!(!e || u.value)) {
				u.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), l.value = null;
				} finally {
					u.value = !1;
				}
			}
		}
		function J(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function re(e) {
			d.value = e, f.value = "", m.value = null;
		}
		function Y() {
			d.value = null, f.value = "", m.value = null;
		}
		async function Z() {
			let e = d.value;
			if (!(!e || p.value)) {
				if (f.value.trim().length === 0) {
					m.value = r("errors.validation_required");
					return;
				}
				p.value = !0, m.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, f.value), Y();
				} catch {
					m.value = r("settings.credential_storage.unlock_required");
				} finally {
					p.value = !1, f.value = "";
				}
			}
		}
		async function Q(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				d.value = e, f.value = "", m.value = r("settings.credential_storage.unlock_required");
			}
		}
		async function $(e) {
			v.value.set(e.id, {
				pending: !0,
				label: null
			}), v.value = new Map(v.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), i = t.status === "success" ? `${r("status.success")} · ${r("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : r("errors.connection_test_failed", { code: t.error.code });
				v.value.set(e.id, {
					pending: !1,
					label: i
				});
			} catch {
				v.value.set(e.id, {
					pending: !1,
					label: r("errors.unexpected")
				});
			}
			v.value = new Map(v.value);
		}
		return (e, n) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "provider-profiles"
		}, [
			D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(r)("settings.sections.provider_profiles")), 3), I(z, {
				label: C(r)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: L
			}, null, 8, ["label", "variant"])], 2),
			I(B, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": C(r)("settings.provider_profiles.empty_description")
			}, {
				default: y(() => [D("div", null, [(_(!0), b(M, null, h(t.profiles, (e) => (_(), b("div", {
					key: e.id,
					class: N(C(X).profile_row),
					"data-testid": "provider-profile-row"
				}, [D("div", { class: N(C(X).profile_identity) }, [
					D("span", { class: N(C(X).profile_name) }, A(e.display_name), 3),
					D("span", { class: N(C(X).profile_meta) }, A(C(ze)(C(r), e.provider_id)), 3),
					J(e.provider_id) ? (_(), b("span", {
						key: 0,
						class: N(C(X).profile_meta)
					}, A(e.credential_reference ? C(r)("settings.provider_profiles.credential_set") : C(r)("settings.provider_profiles.credential_unset")), 3)) : T("", !0),
					v.value.get(e.id)?.label ? (_(), b("span", {
						key: 1,
						class: N(C(X).profile_meta),
						"data-testid": "profile-test-result"
					}, A(v.value.get(e.id)?.label), 3)) : T("", !0)
				], 2), D("div", { class: N(C(X).profile_actions) }, [
					e.is_default ? (_(), b("span", {
						key: 0,
						class: N(C(X).badge)
					}, A(C(r)("settings.provider_profiles.default_badge")), 3)) : T("", !0),
					I(z, {
						label: C(r)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: v.value.get(e.id)?.pending === !0,
						onClick: (t) => $(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					J(e.provider_id) ? (_(), E(z, {
						key: 1,
						label: C(r)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => re(e)
					}, null, 8, ["label", "onClick"])) : T("", !0),
					J(e.provider_id) && e.credential_reference !== null ? (_(), E(z, {
						key: 2,
						label: C(r)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => Q(e)
					}, null, 8, ["label", "onClick"])) : T("", !0),
					I(z, {
						label: C(r)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => R(e)
					}, null, 8, ["label", "onClick"]),
					I(z, {
						label: C(r)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => G(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			I(H, {
				open: i.value,
				title: a.value?.is_new ? C(r)("settings.provider_profiles.dialog_add_title") : C(r)("settings.provider_profiles.dialog_edit_title"),
				"close-label": C(r)("common.actions.close"),
				"onUpdate:open": n[6] ||= (e) => !e && V()
			}, {
				default: y(() => [a.value ? (_(), b("div", {
					key: 0,
					class: N(C(X).form_grid)
				}, [
					I(U, {
						label: C(r)("common.labels.name"),
						required: ""
					}, {
						default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => a.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: N(C(X).text_input)
						}, null, 10, Be), [[x, a.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					I(U, {
						label: C(r)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: y(({ fieldId: e }) => [I(W, {
							id: e,
							modelValue: j.value,
							"onUpdate:modelValue": n[1] ||= (e) => j.value = e,
							options: C(S),
							placeholder: C(r)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					a.value.provider_id === "novelai" ? (_(), E(U, {
						key: 0,
						label: C(r)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: y(({ fieldId: e }) => [I(W, {
							id: e,
							modelValue: a.value.model_id,
							"onUpdate:modelValue": n[2] ||= (e) => a.value.model_id = e,
							options: C(F),
							placeholder: C(r)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : (_(), E(U, {
						key: 1,
						label: C(r)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => a.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: N(C(X).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Ve), [[x, a.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					a.value.provider_id === "comfyui" ? (_(), E(U, {
						key: 2,
						label: C(r)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => a.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: N(C(X).text_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, He), [[x, a.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : T("", !0),
					I(q, {
						modelValue: a.value.is_default,
						"onUpdate:modelValue": n[5] ||= (e) => a.value.is_default = e,
						label: C(r)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					c.value ? (_(), b("p", {
						key: 3,
						class: N([C(X).status_text, C(X).description]),
						"data-tone": "error"
					}, A(c.value), 3)) : T("", !0),
					D("div", { class: N(C(X).actions_row) }, [I(z, {
						label: C(r)("common.actions.save"),
						pending: s.value,
						onClick: ee
					}, null, 8, ["label", "pending"]), I(z, {
						label: C(r)("common.actions.cancel"),
						variant: "secondary",
						onClick: V
					}, null, 8, ["label"])], 2)
				], 2)) : T("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			I(H, {
				open: d.value !== null,
				title: C(r)("settings.provider_profiles.credential_dialog_title", { name: d.value?.display_name ?? "" }),
				description: C(r)("settings.provider_profiles.credential_dialog_description"),
				"close-label": C(r)("common.actions.close"),
				"onUpdate:open": n[8] ||= (e) => !e && Y()
			}, {
				default: y(() => [D("div", { class: N(C(X).form_grid) }, [I(U, {
					label: C(r)("settings.provider_profiles.credential_label"),
					error: m.value,
					required: ""
				}, {
					default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
						id: e,
						"onUpdate:modelValue": n[7] ||= (e) => f.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: N(C(X).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, Ue), [[x, f.value]])]),
					_: 1
				}, 8, ["label", "error"]), D("div", { class: N(C(X).actions_row) }, [I(z, {
					label: C(r)("common.actions.save"),
					pending: p.value,
					onClick: Z
				}, null, 8, ["label", "pending"]), I(z, {
					label: C(r)("common.actions.cancel"),
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
			I(ne, {
				open: l.value !== null,
				title: C(r)("settings.provider_profiles.remove_confirm_title", { name: l.value?.display_name ?? "" }),
				description: C(r)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": C(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": C(r)("confirmations.destructive.default_cancel_action"),
				pending: u.value,
				"onUpdate:open": n[9] ||= (e) => !e && (l.value = null),
				onConfirm: K
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
}), Ge = ["id", "aria-describedby"], Ke = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], qe = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], Je = 200, Ye = /* @__PURE__ */ F({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = O(), r = k(() => t.settings?.translation ?? null);
		function i(e) {
			let n = r.value;
			return n === null ? Promise.resolve() : t.controller.update_settings({ translation: {
				...n,
				...e
			} });
		}
		let a = k(() => [{
			value: "free",
			label: n("settings.translation.endpoint_free")
		}, {
			value: "pro",
			label: n("settings.translation.endpoint_pro")
		}]);
		function o(e) {
			(e === "free" || e === "pro") && i({ deepl_endpoint: e });
		}
		let s = w(""), c = w("idle");
		async function l() {
			let e = s.value.trim();
			if (e !== "") {
				c.value = "saving";
				try {
					await t.controller.set_deepl_key(e), s.value = "", c.value = "saved";
				} catch {
					c.value = "failed";
				}
			}
		}
		async function u() {
			c.value = "saving";
			try {
				await t.controller.clear_deepl_key(), c.value = "cleared";
			} catch {
				c.value = "failed";
			}
		}
		let d = k(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), f = w([]);
		v(() => r.value?.glossary, (e) => {
			f.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function p() {
			f.value.length < Je && f.value.push({
				source: "",
				target: ""
			});
		}
		function m(e) {
			f.value.splice(e, 1);
		}
		function S() {
			i({ glossary: f.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (_(), b("div", {
			class: N(C(X).section),
			"data-testid": "translation-settings"
		}, [D("div", { class: N(C(X).section_header) }, [D("h2", { class: N(C(X).section_title) }, A(C(n)("settings.nav.translation")), 3)], 2), D("div", { class: N(C(X).form_grid) }, [
			D("p", { class: N(C(X).description) }, A(C(n)("settings.translation.description")), 3),
			I(U, {
				label: C(n)("settings.translation.key_label"),
				hint: C(n)("settings.translation.key_hint")
			}, {
				default: y(({ fieldId: e, describedBy: t }) => [g(D("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: N(C(X).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, Ge), [[x, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			D("div", { class: N(C(X).actions_row) }, [
				I(z, {
					label: C(n)("settings.translation.key_save"),
					variant: "primary",
					pending: c.value === "saving",
					disabled: s.value.trim() === "",
					onClick: l
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				I(z, {
					label: C(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				D("span", {
					class: N(C(X).status_text),
					role: "status"
				}, A(d.value), 3)
			], 2),
			D("div", { class: N(C(X).row) }, [D("span", { class: N(C(X).row_label) }, A(C(n)("settings.translation.endpoint_label")), 3), I(G, {
				"model-value": r.value?.deepl_endpoint ?? "free",
				options: a.value,
				label: C(n)("settings.translation.endpoint_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			D("h3", { class: N(C(X).section_title) }, A(C(n)("settings.translation.glossary_title")), 3),
			D("p", { class: N(C(X).description) }, A(C(n)("settings.translation.glossary_description")), 3),
			(_(!0), b(M, null, h(f.value, (e, t) => (_(), b("div", {
				key: t,
				class: N(C(X).actions_row),
				"data-testid": "glossary-row"
			}, [
				g(D("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": C(n)("settings.translation.glossary_source"),
					placeholder: C(n)("settings.translation.glossary_source"),
					class: N(C(X).text_input)
				}, null, 10, Ke), [[x, e.source]]),
				g(D("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": C(n)("settings.translation.glossary_target"),
					placeholder: C(n)("settings.translation.glossary_target"),
					class: N(C(X).text_input)
				}, null, 10, qe), [[x, e.target]]),
				I(z, {
					label: C(n)("settings.translation.glossary_remove"),
					onClick: (e) => m(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			D("div", { class: N(C(X).actions_row) }, [I(z, {
				label: C(n)("settings.translation.glossary_add"),
				disabled: f.value.length >= Je,
				onClick: p
			}, null, 8, ["label", "disabled"]), I(z, {
				label: C(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: S
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), Xe = ["aria-label"], Ze = [
	"data-selected",
	"aria-current",
	"onClick"
], Qe = { class: "tc-visually-hidden" }, $e = /* @__PURE__ */ F({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = S(() => import("./PromptView-DNzJ_8ca.js")), n = S(() => import("./AssetsView-PePKTI5l.js")), r = S(() => import("./DiagnosticsView-83GQM6KY.js")), i = e, { t: a } = O(), o = [
			"illustration",
			"providers",
			"translation",
			"prompts",
			"library",
			"connections",
			"general",
			"diagnostics"
		];
		function s(e) {
			switch (e) {
				case "illustration": return a("settings.nav.illustration");
				case "providers": return a("settings.nav.providers");
				case "translation": return a("settings.nav.translation");
				case "prompts": return a("settings.nav.prompts");
				case "library": return a("settings.nav.library");
				case "connections": return a("settings.nav.connections");
				case "general": return a("settings.nav.general");
				case "diagnostics": return a("settings.nav.diagnostics");
			}
		}
		let c = k(() => i.state.settings_section), l = k(() => i.state.generation.profiles.find((e) => e.id === i.state.generation.active_profile_id && e.provider_id === "novelai") ?? null);
		function u(e, t) {
			return i.controller.test_prompt_regex(e, t);
		}
		return (i, d) => (_(), b("div", {
			class: N(C(X).layout),
			"data-testid": "settings-view"
		}, [D("nav", {
			class: N(C(X).section_nav),
			"aria-label": C(a)("nav.settings")
		}, [(_(), b(M, null, h(o, (t) => D("button", {
			key: t,
			type: "button",
			class: N(["tc-interactive", C(X).section_nav_item]),
			"data-selected": t === c.value,
			"aria-current": t === c.value ? "page" : void 0,
			onClick: (n) => e.controller.set_settings_section(t)
		}, A(s(t)), 11, Ze)), 64))], 10, Xe), D("div", { class: N(C(X).section_content) }, [c.value === "prompts" ? (_(), E(C(t), {
			key: 0,
			state: e.state,
			"test-regex": u,
			onSelectPreset: d[0] ||= (t) => void e.controller.select_prompt_preset(t),
			onNewPreset: d[1] ||= (t) => e.controller.start_new_prompt_preset(),
			onBulkDeletePresets: d[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
			onUpdateDraft: d[3] ||= (t) => e.controller.update_prompt_draft(t),
			onSave: d[4] ||= (t) => void e.controller.save_prompt_preset(t)
		}, null, 8, ["state"])) : c.value === "library" ? (_(), E(C(n), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : c.value === "diagnostics" ? (_(), E(C(r), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (_(), b("div", {
			key: 3,
			class: N(C(X).view)
		}, [D("h1", Qe, A(s(c.value)), 1), c.value === "illustration" ? (_(), E(Ce, {
			key: 0,
			settings: e.state.settings.settings,
			"prompt-presets": e.state.prompt.presets,
			controller: e.controller
		}, null, 8, [
			"settings",
			"prompt-presets",
			"controller"
		])) : c.value === "providers" ? (_(), b(M, { key: 1 }, [
			e.state.generation.profiles.length === 0 ? (_(), b("section", {
				key: 0,
				class: N(C(X).onboarding),
				"data-testid": "settings-onboarding",
				"aria-labelledby": "settings-onboarding-title"
			}, [D("div", {
				class: N(C(X).onboarding_icon),
				"aria-hidden": "true"
			}, [I(R, {
				icon: C(J),
				size: 22
			}, null, 8, ["icon"])], 2), D("div", null, [
				D("p", { class: N(C(X).onboarding_label) }, A(C(a)("settings.onboarding.label")), 3),
				D("h2", {
					id: "settings-onboarding-title",
					class: N(C(X).onboarding_title)
				}, A(C(a)("settings.onboarding.title")), 3),
				D("p", { class: N(C(X).onboarding_description) }, A(C(a)("settings.onboarding.description")), 3)
			])], 2)) : T("", !0),
			I(We, {
				profiles: e.state.generation.profiles,
				controller: e.controller
			}, null, 8, ["profiles", "controller"]),
			l.value === null ? T("", !0) : (_(), E(Le, {
				key: 1,
				profile: l.value,
				vibes: e.state.assets.records.vibe,
				controller: e.controller
			}, null, 8, [
				"profile",
				"vibes",
				"controller"
			]))
		], 64)) : c.value === "translation" ? (_(), E(Ye, {
			key: 2,
			settings: e.state.settings.settings,
			controller: e.controller
		}, null, 8, ["settings", "controller"])) : c.value === "connections" ? (_(), b(M, { key: 3 }, [I(Ae, {
			connections: e.state.llm_connections.connections,
			loading: e.state.loading.has("llm_connections"),
			controller: e.controller
		}, null, 8, [
			"connections",
			"loading",
			"controller"
		]), I(me, {
			settings: e.state.settings.settings,
			"connection-test-command": e.state.diagnostics.connection_test_command,
			controller: e.controller
		}, null, 8, [
			"settings",
			"connection-test-command",
			"controller"
		])], 64)) : c.value === "general" ? (_(), b(M, { key: 4 }, [
			I(Z, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			I(oe, {
				settings: e.state.settings.settings,
				"vault-status": e.state.settings.browser_secret_vault,
				controller: e.controller
			}, null, 8, [
				"settings",
				"vault-status",
				"controller"
			]),
			I(le, {
				"vocabulary-update-channel": e.state.settings.vocabulary_update_channel,
				controller: e.controller
			}, null, 8, ["vocabulary-update-channel", "controller"])
		], 64)) : T("", !0)], 2))], 2)], 2));
	}
});
//#endregion
export { $e as default };
