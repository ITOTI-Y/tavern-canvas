import { a as e } from "./ids-DjWg1HG8.js";
import { i as t, o as n } from "./novelai-cCZ4kJg6.js";
import { i as r, t as i } from "./novelai_models-CXz0Nwhv.js";
import { n as a, o, s } from "./llm_connection-BDY8YbEp.js";
import { a as c, n as l, o as u, r as d } from "./http_acknowledgment-DGpvRi1i.js";
import { A as f, F as p, G as m, N as h, V as g, W as _, _ as v, a as y, b, ct as x, et as S, g as C, h as w, m as T, n as E, p as D, pt as O, s as k, u as A, ut as j, v as M, x as N, y as P } from "./vue-i18n-DUz2Gjn8.js";
import { n as F, t as I } from "./AppIcon-Cnhzrx9o.js";
import { n as L, t as R } from "./StateSurface-C9BHPFzJ.js";
import { t as z } from "./AppDialog-CZA1VX_t.js";
import { t as B } from "./FieldGroup-BT7DUBzO.js";
import "./browser_secret_vault-DhuOFaGV.js";
import { n as V, t as ee } from "./novelai_request_defaults-B0sJ9ANr.js";
import { t as H } from "./AppCheckbox-RNtXaamz.js";
import { n as U, t as W } from "./NumberStepper-D_xT95AR.js";
import { t as G } from "./AppSelect-cXrCnvJ_.js";
import { t as te } from "./ConfirmDialog-BmeYOL4s.js";
import { t as K } from "./PromptTagChips-DUTDFVU6.js";
import { t as q } from "./AppSwitch-ClFwVatq.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var J = F("cable", [
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
]), Y = F("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), X = F("triangle-alert", [
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
]), Z = {
	view: "_view_recet_7",
	onboarding: "_onboarding_recet_16",
	onboarding_icon: "_onboarding_icon_recet_25",
	onboarding_label: "_onboarding_label_recet_37",
	onboarding_title: "_onboarding_title_recet_44",
	onboarding_description: "_onboarding_description_recet_51",
	section: "_section_recet_70",
	section_header: "_section_header_recet_79",
	section_title: "_section_title_recet_89",
	row: "_row_recet_95",
	row_label: "_row_label_recet_104",
	row_value: "_row_value_recet_112",
	profile_row: "_profile_row_recet_76",
	profile_identity: "_profile_identity_recet_120",
	profile_name: "_profile_name_recet_144",
	profile_meta: "_profile_meta_recet_151",
	profile_actions: "_profile_actions_recet_161",
	badge: "_badge_recet_169",
	form_grid: "_form_grid_recet_178",
	status_text: "_status_text_recet_184",
	risk_banner: "_risk_banner_recet_204",
	risk_banner_title: "_risk_banner_title_recet_218",
	risk_banner_description: "_risk_banner_description_recet_230",
	risk_banner_actions: "_risk_banner_actions_recet_237",
	acknowledged_note: "_acknowledged_note_recet_243",
	description: "_description_recet_251",
	actions_row: "_actions_row_recet_258",
	vault_mode_row: "_vault_mode_row_recet_264",
	vault_controls: "_vault_controls_recet_280",
	vault_unlocked_actions: "_vault_unlocked_actions_recet_291",
	text_input: "_text_input_recet_298",
	layout: "_layout_recet_314",
	section_nav: "_section_nav_recet_320",
	section_nav_item: "_section_nav_item_recet_328",
	section_content: "_section_content_recet_341",
	prompt_tag_row: "_prompt_tag_row_recet_359"
}, Q = /* @__PURE__ */ N({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = {
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
		let a = D(() => [
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
		]), o = D(() => [
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
		return (t, r) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "appearance-settings"
		}, [T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(n)("settings.sections.appearance")), 3)], 2), T("div", { class: j(x(Z).form_grid) }, [
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.appearance.theme_label")), 3), P(U, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: x(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.appearance.language_label")), 3), P(U, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: x(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.appearance.inspector_width_label")), 3), P(W, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: x(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": x(n)("common.actions.increase"),
				"decrement-label": x(n)("common.actions.decrease"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			P(q, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: x(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), ne = ["data-tone"], $ = ["id", "aria-describedby"], re = ["id", "aria-describedby"], ie = ["id", "aria-describedby"], ae = /* @__PURE__ */ N({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = S(""), i = S(""), a = S(!1), o = S(null), s = S(!1), c = D(() => [
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
		]), l = D({
			get: () => t.settings?.credential_storage_mode ?? "browser_device",
			set: (e) => {
				o.value = null, t.controller.update_settings({ credential_storage_mode: e }).catch(() => {
					o.value = n("errors.unexpected");
				});
			}
		}), u = D(() => {
			let e = { count: t.vaultStatus.secret_count };
			switch (t.vaultStatus.state) {
				case "unavailable": return n("settings.credential_storage.states.unavailable", e);
				case "error": return n("settings.credential_storage.states.error", e);
				case "uninitialized": return n("settings.credential_storage.states.uninitialized", e);
				case "locked": return n("settings.credential_storage.states.locked", e);
				case "unlocked": return n("settings.credential_storage.states.unlocked", e);
			}
		}), d = D(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function f() {
			r.value = "", i.value = "";
		}
		function p(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function g(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function b() {
			if (!(a.value || !p(!0))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.initialize_browser_secret_vault(r.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), f();
				} catch (e) {
					o.value = g(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function w() {
			if (!(a.value || !p(!1))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.unlock_browser_secret_vault(r.value), f();
				} catch (e) {
					o.value = g(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function M() {
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
		async function N() {
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
		return (t, f) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "credential-storage-settings"
		}, [
			T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (h(), v("span", {
				key: 0,
				class: j(x(Z).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, O(u.value), 11, ne)) : C("", !0)], 2),
			T("div", { class: j(x(Z).vault_mode_row) }, [T("div", { class: j(x(Z).profile_identity) }, [T("span", { class: j(x(Z).profile_name) }, O(x(n)("settings.credential_storage.mode_label")), 3), T("span", { class: j(x(Z).profile_meta) }, O(x(n)("settings.credential_storage.mode_hint")), 3)], 2), P(U, {
				modelValue: l.value,
				"onUpdate:modelValue": f[0] ||= (e) => l.value = e,
				options: c.value,
				label: x(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (h(), v("div", {
				key: 0,
				class: j(x(Z).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (h(), v("p", {
				key: 0,
				class: j(x(Z).status_text),
				"data-tone": "error",
				role: "alert"
			}, O(d.value), 3)) : e.vaultStatus.state === "uninitialized" ? (h(), v(A, { key: 1 }, [
				P(B, {
					label: x(n)("settings.credential_storage.passphrase_label"),
					hint: x(n)("settings.credential_storage.passphrase_hint", { count: x(12) }),
					required: ""
				}, {
					default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": f[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: j(x(Z).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, $), [[y, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				P(B, {
					label: x(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": f[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: j(x(Z).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, re), [[y, i.value]])]),
					_: 1
				}, 8, ["label"]),
				P(L, {
					label: x(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: b
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (h(), v(A, { key: 2 }, [P(B, {
				label: x(n)("settings.credential_storage.passphrase_label"),
				hint: x(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
					id: e,
					"onUpdate:modelValue": f[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: j(x(Z).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: k(w, ["enter"])
				}, null, 42, ie), [[y, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), P(L, {
				label: x(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: w
			}, null, 8, ["label", "pending"])], 64)) : (h(), v("div", {
				key: 3,
				class: j(x(Z).vault_unlocked_actions)
			}, [P(L, {
				label: x(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: M
			}, null, 8, ["label", "pending"]), P(L, {
				label: x(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: f[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (h(), v("p", {
				key: 4,
				class: j(x(Z).status_text),
				"data-tone": "error",
				role: "alert"
			}, O(o.value), 3)) : C("", !0)], 2)) : C("", !0),
			P(te, {
				open: s.value,
				title: x(n)("settings.credential_storage.reset_confirm_title"),
				description: x(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": x(n)("settings.credential_storage.reset_action"),
				"cancel-label": x(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": f[5] ||= (e) => s.value = e,
				onConfirm: N
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
}), oe = ["aria-label"], se = ["aria-label"], ce = /* @__PURE__ */ N({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = S(!1), i = [{
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
		let o = S(!1), s = S(!1), c = S(null), l = S(null), u = S(null);
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
		let m = D(() => {
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
		}), g = S(!1), _ = S(null);
		async function y() {
			if (!g.value) {
				g.value = !0, _.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "inkwell-archive.zip", r.click(), URL.revokeObjectURL(n);
				} catch {
					_.value = n("errors.unexpected");
				} finally {
					g.value = !1;
				}
			}
		}
		let b = S(!1), k = S(null), A = S(null);
		function M() {
			A.value?.click();
		}
		async function N(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || b.value)) {
				b.value = !0, k.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					k.value = n("errors.unexpected");
				} finally {
					b.value = !1;
				}
			}
		}
		return (t, l) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "data-settings"
		}, [T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(n)("settings.sections.data")), 3)], 2), T("div", { class: j(x(Z).form_grid) }, [
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.data.vocabulary_channel_label")), 3), P(U, {
				"model-value": e.vocabularyUpdateChannel ?? "bundled",
				options: i,
				label: x(n)("settings.data.vocabulary_channel_label"),
				disabled: r.value,
				"onUpdate:modelValue": a
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])], 2),
			T("div", { class: j(x(Z).actions_row) }, [
				P(L, {
					label: x(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: o.value,
					onClick: d
				}, null, 8, ["label", "pending"]),
				o.value ? (h(), w(L, {
					key: 0,
					label: x(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: f
				}, null, 8, ["label"])) : C("", !0),
				T("input", {
					ref_key: "vocabulary_file_input",
					ref: u,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": x(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: p
				}, null, 40, oe)
			], 2),
			T("p", { class: j(x(Z).description) }, O(x(n)("settings.data.vocabulary_import.description")), 3),
			m.value ? (h(), v("p", {
				key: 0,
				class: j([x(Z).status_text, x(Z).description]),
				"data-testid": "vocabulary-import-progress"
			}, O(m.value), 3)) : C("", !0),
			s.value ? (h(), v("p", {
				key: 1,
				class: j([x(Z).status_text, x(Z).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, O(x(n)("settings.data.vocabulary_import.success")), 3)) : C("", !0),
			c.value ? (h(), v("p", {
				key: 2,
				class: j([x(Z).status_text, x(Z).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, O(c.value), 3)) : C("", !0),
			T("div", { class: j(x(Z).actions_row) }, [
				P(L, {
					label: x(n)("settings.data.archive_export_action"),
					pending: g.value,
					onClick: y
				}, null, 8, ["label", "pending"]),
				P(L, {
					label: x(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: b.value,
					onClick: M
				}, null, 8, ["label", "pending"]),
				T("input", {
					ref_key: "file_input",
					ref: A,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": x(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: N
				}, null, 40, se)
			], 2),
			T("p", { class: j(x(Z).description) }, O(x(n)("settings.data.archive_import_description")), 3),
			_.value ? (h(), v("p", {
				key: 3,
				class: j([x(Z).status_text, x(Z).description]),
				"data-tone": "error"
			}, O(_.value), 3)) : C("", !0),
			k.value ? (h(), v("p", {
				key: 4,
				class: j([x(Z).status_text, x(Z).description]),
				"data-tone": "error"
			}, O(k.value), 3)) : C("", !0)
		], 2)], 2));
	}
}), le = ["id", "aria-describedby"], ue = ["data-severity"], de = ["id"], fe = ["id", "aria-describedby"], pe = /* @__PURE__ */ N({
	__name: "GatewaySettings",
	props: {
		settings: {},
		connectionTestCommand: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, i = S(t.settings?.gateway.endpoint ?? ""), a = S(null), o = S(!1), s = S(!1), f = S(""), p = S(!1), b = S(null);
		g(() => t.settings?.gateway.endpoint ?? "", (e) => {
			i.value = e;
		});
		let k = D(() => {
			let e = i.value.trim();
			if (e.length === 0) return null;
			try {
				if (!u(e)) return null;
				let n = c(e), r = l(n), i = d(t.settings?.gateway.http_acknowledgments ?? {}, n);
				return {
					origin: n,
					severity: r === "public_or_unknown" ? "error" : "warning",
					acknowledged: i
				};
			} catch {
				return null;
			}
		});
		async function A() {
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
				s = c(e);
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
		async function N() {
			let e = k.value;
			if (!(!e || s.value)) {
				s.value = !0;
				try {
					await t.controller.acknowledge_http_origin(e.origin);
				} finally {
					s.value = !1;
				}
			}
		}
		async function F() {
			let e = f.value.trim();
			if (b.value = null, !(e.length === 0 || p.value)) {
				p.value = !0;
				try {
					await t.controller.set_gateway_token(e), f.value = "";
				} catch {
					b.value = n("settings.credential_storage.unlock_required");
				} finally {
					p.value = !1;
				}
			}
		}
		async function R() {
			if (!p.value) {
				p.value = !0, b.value = null;
				try {
					await t.controller.clear_gateway_token();
				} catch {
					b.value = n("settings.credential_storage.unlock_required");
				} finally {
					p.value = !1;
				}
			}
		}
		function z() {
			t.controller.test_diagnostics_connection();
		}
		let V = D(() => t.connectionTestCommand.status === "pending");
		return (t, r) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "gateway-settings"
		}, [T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(n)("settings.sections.gateway")), 3)], 2), T("div", { class: j(x(Z).form_grid) }, [
			P(B, {
				label: x(n)("settings.gateway.endpoint_label"),
				hint: x(n)("settings.gateway.endpoint_hint"),
				error: a.value
			}, {
				default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
					id: e,
					"onUpdate:modelValue": r[0] ||= (e) => i.value = e,
					type: "text",
					"aria-describedby": t,
					class: j(x(Z).text_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: A
				}, null, 42, le), [[y, i.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			k.value && !k.value.acknowledged ? (h(), v("div", {
				key: 0,
				class: j(x(Z).risk_banner),
				"data-severity": k.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				T("div", { class: j(x(Z).risk_banner_title) }, [P(I, {
					icon: x(X),
					size: 16
				}, null, 8, ["icon"]), M(" " + O(x(n)("settings.http_risk.warning_title")), 1)], 2),
				T("p", { class: j(x(Z).risk_banner_description) }, O(k.value.severity === "error" ? x(n)("settings.http_risk.error_description_public", { origin: k.value.origin }) : x(n)("settings.http_risk.warning_description_local", { origin: k.value.origin })), 3),
				T("p", { class: j(x(Z).risk_banner_description) }, O(x(n)("settings.http_risk.disclosure")), 3),
				T("div", { class: j(x(Z).risk_banner_actions) }, [P(L, {
					label: x(n)("settings.http_risk.continue_action"),
					pending: s.value,
					onClick: N
				}, null, 8, ["label", "pending"])], 2)
			], 10, ue)) : k.value && k.value.acknowledged ? (h(), v("div", {
				key: 1,
				class: j(x(Z).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [P(I, {
				icon: x(Y),
				size: 14
			}, null, 8, ["icon"]), M(" " + O(x(n)("settings.http_risk.acknowledged_label")), 1)], 2)) : C("", !0),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.gateway.protocol_label")), 3), P(L, {
				label: x(n)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: V.value,
				onClick: z
			}, null, 8, ["label", "pending"])], 2),
			P(B, { label: x(n)("settings.gateway.token_secret_label") }, {
				default: _(({ fieldId: t }) => [T("span", {
					id: t,
					class: j(x(Z).row_value),
					"data-testid": "gateway-token-reference"
				}, O(e.settings?.gateway.token_secret_id ?? x(n)("settings.gateway.token_not_set")), 11, de)]),
				_: 1
			}, 8, ["label"]),
			P(B, {
				label: x(n)("settings.gateway.token_label"),
				hint: x(n)("settings.gateway.token_hint"),
				error: b.value
			}, {
				default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
					id: e,
					"onUpdate:modelValue": r[1] ||= (e) => f.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: j(x(Z).text_input),
					"data-testid": "gateway-token-input"
				}, null, 10, fe), [[y, f.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			T("div", { class: j(x(Z).row) }, [P(L, {
				label: x(n)("settings.gateway.token_save_action"),
				pending: p.value,
				disabled: f.value.trim().length === 0,
				"data-testid": "gateway-token-save",
				onClick: F
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), e.settings?.gateway.token_secret_id ? (h(), w(L, {
				key: 0,
				label: x(n)("settings.gateway.token_clear_action"),
				variant: "secondary",
				pending: p.value,
				"data-testid": "gateway-token-clear",
				onClick: R
			}, null, 8, ["label", "pending"])) : C("", !0)], 2)
		], 2)], 2));
	}
}), me = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], he = ["id", "aria-describedby"], ge = ["id", "aria-describedby"], _e = ["id", "aria-describedby"], ve = ["id", "aria-describedby"], ye = ["id", "aria-describedby"], be = "in_use", xe = "none", Se = /* @__PURE__ */ N({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = D(() => t.settings?.illustration ?? null);
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
		let o = S(""), s = S(""), c = S(""), l = S(""), u = S("");
		g(r, (e) => {
			o.value = e === null || e.preset_name === be ? "" : e.preset_name, e?.connection.kind === "proxy_preset" ? (s.value = e.connection.proxy_preset, c.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (l.value = e.connection.api_url, u.value = e.connection.model);
		}, { immediate: !0 });
		function d() {
			a({ preset_name: o.value.trim() || be });
		}
		let p = D(() => [
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
		function b() {
			let e = s.value.trim();
			if (e === "") return null;
			let t = c.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function w() {
			let e = l.value.trim(), t = u.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let k = D(() => V.value === "custom" && l.value.trim() !== "" && w() === null);
		function M() {
			let e = w();
			e !== null && a({ connection: e });
		}
		let N = S(""), F = S("idle");
		async function I() {
			let e = N.value.trim();
			if (e !== "") {
				F.value = "saving";
				try {
					await t.controller.set_analysis_key(e), N.value = "", F.value = "saved";
				} catch {
					F.value = "failed";
				}
			}
		}
		async function R() {
			F.value = "saving";
			try {
				await t.controller.clear_analysis_key(), F.value = "cleared";
			} catch {
				F.value = "failed";
			}
		}
		let z = D(() => {
			switch (F.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), V = S(r.value?.connection.kind ?? "current");
		g(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (V.value = e);
		});
		function ee(e) {
			if (e === "current") V.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				V.value = "proxy_preset";
				let e = b();
				e !== null && a({ connection: e });
			} else e === "custom" && (V.value = "custom", M());
		}
		function H() {
			let e = b();
			e !== null && a({ connection: e });
		}
		let te = D(() => [{
			value: xe,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function K(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let J = D(() => [
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
		]), Y = S(r.value?.world_info.mode ?? "chat");
		g(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (Y.value = e);
		});
		let X = S([]), Q = S(!1);
		async function ne() {
			try {
				X.value = await t.controller.list_worldbooks(), Q.value = !1;
			} catch {
				Q.value = !0;
			}
		}
		f(() => {
			Y.value === "worldbook" && ne();
		});
		let $ = D(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbook : void 0), re = D(() => [.../* @__PURE__ */ new Set([...X.value, ...$.value === void 0 ? [] : [$.value]])].map((e) => ({
			value: e,
			label: e
		})));
		function ie(e) {
			e === "chat" || e === "off" ? (Y.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (Y.value = e, ne());
		}
		function ae(e) {
			a({ world_info: {
				mode: "worldbook",
				worldbook: e
			} });
		}
		return (t, f) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "illustration-settings"
		}, [T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(n)("settings.nav.illustration")), 3)], 2), T("div", { class: j(x(Z).form_grid) }, [
			P(q, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: x(n)("settings.illustration.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": f[0] ||= (e) => i({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			T("p", { class: j(x(Z).description) }, O(x(n)("settings.illustration.auto_generation_hint")), 3),
			P(B, {
				label: x(n)("settings.illustration.preset_label"),
				hint: x(n)("settings.illustration.preset_hint")
			}, {
				default: _(({ fieldId: t, describedBy: r }) => [m(T("input", {
					id: t,
					"onUpdate:modelValue": f[1] ||= (e) => o.value = e,
					type: "text",
					placeholder: x(n)("settings.illustration.preset_placeholder"),
					"aria-describedby": r,
					class: j(x(Z).text_input),
					disabled: !e.settings,
					"data-testid": "analysis-preset-input",
					onBlur: d
				}, null, 42, me), [[y, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.illustration.connection_label")), 3), P(U, {
				"model-value": V.value,
				options: p.value,
				label: x(n)("settings.illustration.connection_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": ee
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			V.value === "proxy_preset" ? (h(), v(A, { key: 0 }, [P(B, {
				label: x(n)("settings.illustration.proxy_preset_label"),
				hint: x(n)("settings.illustration.proxy_preset_hint")
			}, {
				default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
					id: e,
					"onUpdate:modelValue": f[2] ||= (e) => s.value = e,
					type: "text",
					"aria-describedby": t,
					class: j(x(Z).text_input),
					"data-testid": "analysis-proxy-preset-input",
					onBlur: H
				}, null, 42, he), [[y, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]), P(B, {
				label: x(n)("settings.illustration.proxy_model_label"),
				hint: x(n)("settings.illustration.proxy_model_hint")
			}, {
				default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
					id: e,
					"onUpdate:modelValue": f[3] ||= (e) => c.value = e,
					type: "text",
					"aria-describedby": t,
					class: j(x(Z).text_input),
					onBlur: H
				}, null, 42, ge), [[y, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])], 64)) : C("", !0),
			V.value === "custom" ? (h(), v(A, { key: 1 }, [
				P(B, {
					label: x(n)("settings.illustration.custom_url_label"),
					hint: x(n)("settings.illustration.custom_url_hint"),
					error: k.value ? x(n)("settings.illustration.custom_invalid") : null
				}, {
					default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": f[4] ||= (e) => l.value = e,
						type: "url",
						placeholder: "https://",
						"aria-describedby": t,
						class: j(x(Z).text_input),
						"data-testid": "analysis-custom-url-input",
						onBlur: M
					}, null, 42, _e), [[y, l.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]),
				P(B, { label: x(n)("settings.illustration.custom_model_label") }, {
					default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": f[5] ||= (e) => u.value = e,
						type: "text",
						"aria-describedby": t,
						class: j(x(Z).text_input),
						"data-testid": "analysis-custom-model-input",
						onBlur: M
					}, null, 42, ve), [[y, u.value]])]),
					_: 1
				}, 8, ["label"]),
				P(B, {
					label: x(n)("settings.illustration.custom_key_label"),
					hint: x(n)("settings.illustration.custom_key_hint")
				}, {
					default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": f[6] ||= (e) => N.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: j(x(Z).text_input),
						"data-testid": "analysis-custom-key-input"
					}, null, 10, ye), [[y, N.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				T("div", { class: j(x(Z).actions_row) }, [
					P(L, {
						label: x(n)("settings.illustration.custom_key_save"),
						variant: "primary",
						pending: F.value === "saving",
						disabled: N.value.trim() === "",
						onClick: I
					}, null, 8, [
						"label",
						"pending",
						"disabled"
					]),
					P(L, {
						label: x(n)("settings.illustration.custom_key_clear"),
						onClick: R
					}, null, 8, ["label"]),
					T("span", {
						class: j(x(Z).status_text),
						role: "status"
					}, O(z.value), 3)
				], 2)
			], 64)) : C("", !0),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.illustration.chat_history_label")), 3), P(W, {
				"model-value": r.value?.max_chat_history,
				label: x(n)("settings.illustration.chat_history_label"),
				min: 0,
				max: 20,
				"increment-label": x(n)("common.actions.increase"),
				"decrement-label": x(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": f[7] ||= (e) => a({ max_chat_history: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.illustration.world_info_label")), 3), P(U, {
				"model-value": Y.value,
				options: J.value,
				label: x(n)("settings.illustration.world_info_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": ie
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			T("p", { class: j(x(Z).description) }, O(x(n)("settings.illustration.world_info_hint")), 3),
			Y.value === "worldbook" ? (h(), v(A, { key: 2 }, [T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.illustration.worldbook_label")), 3), P(G, {
				"model-value": $.value,
				options: re.value,
				placeholder: x(n)("settings.illustration.worldbook_placeholder"),
				"aria-label": x(n)("settings.illustration.worldbook_label"),
				"onUpdate:modelValue": ae
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2), Q.value ? (h(), v("p", {
				key: 0,
				class: j(x(Z).description),
				role: "alert"
			}, O(x(n)("settings.illustration.worldbook_unavailable")), 3)) : C("", !0)], 64)) : C("", !0),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.illustration.max_images_label")), 3), P(W, {
				"model-value": r.value?.max_images_per_message,
				label: x(n)("settings.illustration.max_images_label"),
				min: 1,
				max: 8,
				"increment-label": x(n)("common.actions.increase"),
				"decrement-label": x(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": f[8] ||= (e) => a({ max_images_per_message: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.illustration.prompt_preset_label")), 3), P(G, {
				"model-value": r.value?.prompt_preset_id ?? xe,
				options: te.value,
				placeholder: x(n)("settings.illustration.prompt_preset_label"),
				"aria-label": x(n)("settings.illustration.prompt_preset_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": K
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label",
				"disabled"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.illustration.concurrency_label")), 3), P(W, {
				"model-value": e.settings?.global_concurrency,
				label: x(n)("settings.illustration.concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": x(n)("common.actions.increase"),
				"decrement-label": x(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": f[9] ||= (e) => i({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2)
		], 2)], 2));
	}
}), Ce = [
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
];
function we(e, t) {
	switch (t) {
		case "openai_compatible": return e("settings.llm_connections.provider_kinds.openai_compatible");
		case "anthropic": return e("settings.llm_connections.provider_kinds.anthropic");
		case "google_generative": return e("settings.llm_connections.provider_kinds.google_generative");
		case "ollama": return e("settings.llm_connections.provider_kinds.ollama");
	}
}
function Te(e) {
	return a[e].completion_routes;
}
//#endregion
//#region src/ui/views/settings/LlmConnections.vue?vue&type=script&setup=true&lang.ts
var Ee = ["id", "aria-describedby"], De = ["id", "aria-describedby"], Oe = ["id", "aria-describedby"], ke = /* @__PURE__ */ N({
	__name: "LlmConnections",
	props: {
		connections: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = S(!1), i = S(null), a = S(!1), o = S(null), s = S(null), c = S(null), l = S(null), u = S(!1), d = S(null), f = S(""), g = S(!1), b = S(null), k = S(/* @__PURE__ */ new Map()), M = D(() => Ce.map((e) => ({
			value: e,
			label: we(n, e)
		}))), N = D(() => Te(i.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), F = D({
			get: () => i.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				i.value && (i.value.provider_kind = e, i.value.route = Te(i.value.provider_kind)[0] ?? "");
			}
		}), I = D({
			get: () => i.value?.route ?? "",
			set: (e) => {
				i.value && (i.value.route = e);
			}
		});
		function V() {
			i.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_kind: "openai_compatible",
				route: Te("openai_compatible")[0] ?? "",
				display_name: "",
				model_id: "",
				temperature: .7,
				max_output_tokens: 2048,
				is_default: t.connections.length === 0
			}, H(), r.value = !0;
		}
		function ee(e) {
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
			}, H(), r.value = !0;
		}
		function H() {
			o.value = null, s.value = null, c.value = null;
		}
		function U() {
			r.value = !1, i.value = null, H();
		}
		async function K() {
			let e = i.value;
			if (!e || a.value) return;
			H();
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
					}), U();
				} catch {
					c.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		function J(e) {
			l.value = e;
		}
		async function Y() {
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
		function X(e) {
			d.value = e, f.value = "", b.value = null;
		}
		function Q() {
			d.value = null, f.value = "", b.value = null;
		}
		async function ne() {
			let e = d.value;
			if (!(!e || g.value)) {
				if (f.value.trim().length === 0) {
					b.value = n("errors.validation_required");
					return;
				}
				g.value = !0, b.value = null;
				try {
					await t.controller.set_llm_connection_credential(e.id, f.value), Q();
				} catch {
					b.value = n("settings.credential_storage.unlock_required");
				} finally {
					g.value = !1, f.value = "";
				}
			}
		}
		async function $(e) {
			try {
				await t.controller.clear_llm_connection_credential(e.id);
			} catch {
				d.value = e, f.value = "", b.value = n("settings.credential_storage.unlock_required");
			}
		}
		async function re(e) {
			k.value = new Map(k.value).set(e.id, {
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
			k.value = new Map(k.value).set(e.id, {
				pending: !1,
				label: r
			});
		}
		return (t, S) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "llm-connections"
		}, [
			T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(n)("settings.sections.llm_connections")), 3), P(L, {
				label: x(n)("settings.llm_connections.add_action"),
				onClick: V
			}, null, 8, ["label"])], 2),
			T("p", { class: j(x(Z).description) }, O(x(n)("settings.llm_connections.section_description")), 3),
			P(R, {
				status: e.loading ? "loading" : e.connections.length === 0 ? "empty" : "ready",
				"empty-message": x(n)("settings.llm_connections.empty_description")
			}, {
				action: _(() => [P(L, {
					label: x(n)("settings.llm_connections.add_action"),
					onClick: V
				}, null, 8, ["label"])]),
				default: _(() => [T("div", null, [(h(!0), v(A, null, p(e.connections, (e) => (h(), v("div", {
					key: e.id,
					class: j(x(Z).profile_row),
					"data-testid": "llm-connection-row"
				}, [T("div", { class: j(x(Z).profile_identity) }, [
					T("span", { class: j(x(Z).profile_name) }, O(e.display_name), 3),
					T("span", { class: j(x(Z).profile_meta) }, O(x(we)(x(n), e.provider_kind)) + " · " + O(e.model_id), 3),
					T("span", {
						class: j(x(Z).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, O(e.credential_reference ? x(n)("settings.llm_connections.credential_set") : x(n)("settings.llm_connections.credential_unset")), 3),
					k.value.get(e.id)?.label ? (h(), v("span", {
						key: 0,
						class: j(x(Z).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, O(k.value.get(e.id)?.label), 3)) : C("", !0)
				], 2), T("div", { class: j(x(Z).profile_actions) }, [
					e.is_default ? (h(), v("span", {
						key: 0,
						class: j(x(Z).badge)
					}, O(x(n)("settings.llm_connections.default_badge")), 3)) : C("", !0),
					P(L, {
						label: x(n)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: k.value.get(e.id)?.pending === !0,
						onClick: (t) => re(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					P(L, {
						label: x(n)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (t) => X(e)
					}, null, 8, ["label", "onClick"]),
					e.credential_reference ? (h(), w(L, {
						key: 1,
						label: x(n)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => $(e)
					}, null, 8, ["label", "onClick"])) : C("", !0),
					P(L, {
						label: x(n)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => ee(e)
					}, null, 8, ["label", "onClick"]),
					P(L, {
						label: x(n)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => J(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			P(z, {
				open: r.value,
				title: i.value?.is_new ? x(n)("settings.llm_connections.dialog_add_title") : x(n)("settings.llm_connections.dialog_edit_title"),
				description: x(n)("settings.llm_connections.dialog_description"),
				"close-label": x(n)("common.actions.close"),
				"onUpdate:open": S[7] ||= (e) => !e && U()
			}, {
				default: _(() => [i.value ? (h(), v("div", {
					key: 0,
					class: j(x(Z).form_grid)
				}, [
					P(B, {
						label: x(n)("common.labels.name"),
						error: o.value,
						required: ""
					}, {
						default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": S[0] ||= (e) => i.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: j(x(Z).text_input)
						}, null, 10, Ee), [[y, i.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					P(B, {
						label: x(n)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: _(({ fieldId: e }) => [P(G, {
							id: e,
							modelValue: F.value,
							"onUpdate:modelValue": S[1] ||= (e) => F.value = e,
							options: M.value,
							placeholder: x(n)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					P(B, {
						label: x(n)("settings.llm_connections.route_label"),
						hint: x(n)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: _(({ fieldId: e }) => [P(G, {
							id: e,
							modelValue: I.value,
							"onUpdate:modelValue": S[2] ||= (e) => I.value = e,
							options: N.value,
							placeholder: x(n)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					P(B, {
						label: x(n)("settings.llm_connections.model_label"),
						hint: x(n)("settings.llm_connections.model_hint"),
						error: s.value,
						required: ""
					}, {
						default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": S[3] ||= (e) => i.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: j(x(Z).text_input)
						}, null, 10, De), [[y, i.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					P(B, {
						label: x(n)("settings.llm_connections.temperature_label"),
						hint: x(n)("settings.llm_connections.temperature_hint")
					}, {
						default: _(() => [P(W, {
							modelValue: i.value.temperature,
							"onUpdate:modelValue": S[4] ||= (e) => i.value.temperature = e,
							label: x(n)("settings.llm_connections.temperature_label"),
							"increment-label": x(n)("common.actions.increase"),
							"decrement-label": x(n)("common.actions.decrease"),
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
					P(B, { label: x(n)("settings.llm_connections.max_output_tokens_label") }, {
						default: _(() => [P(W, {
							modelValue: i.value.max_output_tokens,
							"onUpdate:modelValue": S[5] ||= (e) => i.value.max_output_tokens = e,
							label: x(n)("settings.llm_connections.max_output_tokens_label"),
							"increment-label": x(n)("common.actions.increase"),
							"decrement-label": x(n)("common.actions.decrease"),
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
					P(q, {
						modelValue: i.value.is_default,
						"onUpdate:modelValue": S[6] ||= (e) => i.value.is_default = e,
						label: x(n)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					c.value ? (h(), v("p", {
						key: 0,
						class: j([x(Z).status_text, x(Z).description]),
						"data-tone": "error"
					}, O(c.value), 3)) : C("", !0),
					T("div", { class: j(x(Z).actions_row) }, [P(L, {
						label: x(n)("common.actions.save"),
						pending: a.value,
						onClick: K
					}, null, 8, ["label", "pending"]), P(L, {
						label: x(n)("common.actions.cancel"),
						variant: "secondary",
						onClick: U
					}, null, 8, ["label"])], 2)
				], 2)) : C("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			P(z, {
				open: d.value !== null,
				title: x(n)("settings.llm_connections.credential_dialog_title"),
				description: x(n)("settings.llm_connections.credential_dialog_description"),
				"close-label": x(n)("common.actions.close"),
				"onUpdate:open": S[9] ||= (e) => !e && Q()
			}, {
				default: _(() => [T("div", { class: j(x(Z).form_grid) }, [P(B, {
					label: x(n)("settings.llm_connections.credential_label"),
					hint: x(n)("provider.credentials.not_stored_locally"),
					error: b.value,
					required: ""
				}, {
					default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": S[8] ||= (e) => f.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: j(x(Z).text_input),
						"data-testid": "llm-credential-input"
					}, null, 10, Oe), [[y, f.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), T("div", { class: j(x(Z).actions_row) }, [P(L, {
					label: x(n)("common.actions.save"),
					pending: g.value,
					onClick: ne
				}, null, 8, ["label", "pending"]), P(L, {
					label: x(n)("common.actions.cancel"),
					variant: "secondary",
					onClick: Q
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			P(te, {
				open: l.value !== null,
				title: x(n)("settings.llm_connections.remove_confirm_title", { name: l.value?.display_name ?? "" }),
				description: x(n)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": x(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": x(n)("confirmations.destructive.default_cancel_action"),
				pending: u.value,
				"onUpdate:open": S[10] ||= (e) => !e && (l.value = null),
				onConfirm: Y
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
}), Ae = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, je = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function Me(e, t) {
	switch (t) {
		case "vibe_transfer": return e("settings.novelai.ignored_vibe_transfer");
		case "smea": return e("settings.novelai.ignored_smea");
		case "cfg_rescale": return e("settings.novelai.ignored_cfg_rescale");
		case "variety_plus": return e("settings.novelai.ignored_variety_plus");
		case "sampler": return e("settings.novelai.ignored_sampler");
		case "steps": return e("settings.novelai.ignored_steps");
	}
}
//#endregion
//#region src/ui/views/settings/NovelAiSettings.vue?vue&type=script&setup=true&lang.ts
var Ne = "https://novelai.net/image", Pe = /* @__PURE__ */ N({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let i = e, { t: a, d: c } = E(), l = D(() => {
			let e = i.profile.model_id;
			return e != null && r(e) !== null ? e : ee;
		});
		function u() {
			if (i.profile.novelai_defaults !== null) return i.profile.novelai_defaults;
			let e = V(l.value);
			return {
				width: e.width,
				height: e.height,
				steps: e.steps,
				scale: e.scale,
				cfg_rescale: e.cfg_rescale,
				sampler: e.sampler,
				noise_schedule: e.noise_schedule,
				smea: e.smea,
				dyn: e.dyn,
				variety_plus: e.variety_plus,
				vibe_asset_ids: []
			};
		}
		let d = S(u());
		g(() => i.profile.id, () => {
			d.value = u();
		});
		function m(e) {
			d.value = {
				...d.value,
				...e
			};
		}
		let _ = D(() => o.safeParse(d.value).success ? null : a("settings.novelai.invalid_size")), y = D(() => {
			let e = r(l.value);
			return e === null ? [] : s(e.profile, d.value);
		}), b = S(null), k = S(null), N = S(!1), F = S(!1);
		async function I() {
			F.value = !0, k.value = null, N.value = !1;
			try {
				b.value = await i.controller.load_novelai_account();
			} catch (e) {
				N.value = e instanceof Error && e.name === "ProviderNetworkError", k.value = e instanceof Error ? e.message : String(e);
			} finally {
				F.value = !1;
			}
		}
		let R = S([]);
		f(async () => {
			try {
				R.value = (await i.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				R.value = [];
			}
		});
		let z = D(() => R.value.map((e) => ({
			value: e.profile.model_id,
			label: e.profile.display_name
		})));
		async function B(e) {
			await i.controller.save_provider_profile({
				id: i.profile.id,
				provider_id: i.profile.provider_id,
				display_name: i.profile.display_name,
				model_id: e,
				workflow_id: i.profile.workflow_id ?? null,
				is_default: i.profile.is_default,
				updated_at: i.profile.updated_at
			});
		}
		let U = n.options.map((e) => ({
			value: e,
			label: Ae[e]
		})), te = t.options.map((e) => ({
			value: e,
			label: je[e]
		}));
		function K(e, t, n) {
			t.includes(n) && m({ [e]: n });
		}
		let J = D(() => i.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function Y(e, t) {
			let n = d.value.vibe_asset_ids.filter((t) => t !== e);
			m({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let X = S("idle");
		async function Q() {
			X.value = "saving";
			try {
				await i.controller.save_novelai_defaults(i.profile.id, d.value), X.value = "saved";
			} catch {
				X.value = "failed";
			}
		}
		return (r, i) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "novelai-settings"
		}, [T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(a)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), T("div", { class: j(x(Z).form_grid) }, [
			T("div", { class: j(x(Z).actions_row) }, [P(L, {
				label: x(a)("settings.novelai.refresh_account"),
				pending: F.value,
				onClick: I
			}, null, 8, ["label", "pending"]), b.value === null ? N.value ? (h(), v("span", {
				key: 1,
				class: j(x(Z).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [M(O(x(a)("settings.novelai.account_unreachable")) + " ", 1), T("a", {
				href: Ne,
				target: "_blank",
				rel: "noopener noreferrer"
			}, O(x(a)("settings.novelai.account_open_site")), 1)], 2)) : k.value === null ? C("", !0) : (h(), v("span", {
				key: 2,
				class: j(x(Z).status_text)
			}, O(k.value), 3)) : (h(), v("span", {
				key: 0,
				class: j(x(Z).status_text),
				"data-testid": "novelai-account"
			}, O(x(a)("settings.novelai.account_summary", {
				tier: b.value.tier,
				anlas: b.value.anlas,
				expires: x(c)(new Date(b.value.expires_at), "short_date")
			})), 3))], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(a)("settings.novelai.model_label")), 3), P(G, {
				"model-value": l.value,
				options: z.value,
				placeholder: l.value,
				"aria-label": x(a)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void B(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(a)("settings.novelai.width_label")), 3), P(W, {
				"model-value": d.value.width,
				label: x(a)("settings.novelai.width_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": x(a)("common.actions.increase"),
				"decrement-label": x(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[1] ||= (e) => m({ width: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(a)("settings.novelai.height_label")), 3), P(W, {
				"model-value": d.value.height,
				label: x(a)("settings.novelai.height_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": x(a)("common.actions.increase"),
				"decrement-label": x(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[2] ||= (e) => m({ height: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(a)("settings.novelai.steps_label")), 3), P(W, {
				"model-value": d.value.steps,
				label: x(a)("settings.novelai.steps_label"),
				min: 1,
				max: 50,
				"increment-label": x(a)("common.actions.increase"),
				"decrement-label": x(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[3] ||= (e) => m({ steps: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(a)("settings.novelai.scale_label")), 3), P(W, {
				"model-value": d.value.scale,
				label: x(a)("settings.novelai.scale_label"),
				min: 0,
				max: 10,
				step: .1,
				"increment-label": x(a)("common.actions.increase"),
				"decrement-label": x(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[4] ||= (e) => m({ scale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(a)("settings.novelai.cfg_rescale_label")), 3), P(W, {
				"model-value": d.value.cfg_rescale,
				label: x(a)("settings.novelai.cfg_rescale_label"),
				min: 0,
				max: 1,
				step: .02,
				"increment-label": x(a)("common.actions.increase"),
				"decrement-label": x(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[5] ||= (e) => m({ cfg_rescale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(a)("settings.novelai.sampler_label")), 3), P(G, {
				"model-value": d.value.sampler,
				options: x(U),
				placeholder: x(a)("settings.novelai.sampler_label"),
				"aria-label": x(a)("settings.novelai.sampler_label"),
				"onUpdate:modelValue": i[6] ||= (e) => K("sampler", x(n).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(a)("settings.novelai.noise_schedule_label")), 3), P(G, {
				"model-value": d.value.noise_schedule,
				options: x(te),
				placeholder: x(a)("settings.novelai.noise_schedule_label"),
				"aria-label": x(a)("settings.novelai.noise_schedule_label"),
				"onUpdate:modelValue": i[7] ||= (e) => K("noise_schedule", x(t).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			P(q, {
				"model-value": d.value.smea,
				label: x(a)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[8] ||= (e) => m({ smea: e })
			}, null, 8, ["model-value", "label"]),
			P(q, {
				"model-value": d.value.dyn,
				label: x(a)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[9] ||= (e) => m({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			P(q, {
				"model-value": d.value.variety_plus,
				label: x(a)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[10] ||= (e) => m({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			T("h3", { class: j(x(Z).section_title) }, O(x(a)("settings.novelai.vibes_title")), 3),
			J.value.length === 0 ? (h(), v("p", {
				key: 0,
				class: j(x(Z).description)
			}, O(x(a)("settings.novelai.vibes_empty")), 3)) : C("", !0),
			(h(!0), v(A, null, p(J.value, (e) => (h(), w(H, {
				key: e.id,
				"model-value": d.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => Y(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			y.value.length > 0 ? (h(), v("div", {
				key: 1,
				class: j(x(Z).risk_banner),
				"data-testid": "novelai-ignored"
			}, [T("p", { class: j(x(Z).risk_banner_title) }, O(x(a)("settings.novelai.ignored_title")), 3), (h(!0), v(A, null, p(y.value, (e) => (h(), v("p", {
				key: e,
				class: j(x(Z).risk_banner_description)
			}, O(x(Me)(x(a), e)), 3))), 128))], 2)) : C("", !0),
			_.value === null ? C("", !0) : (h(), v("p", {
				key: 2,
				class: j(x(Z).status_text),
				role: "alert"
			}, O(_.value), 3)),
			T("div", { class: j(x(Z).actions_row) }, [P(L, {
				label: x(a)("settings.novelai.save"),
				variant: "primary",
				pending: X.value === "saving",
				disabled: _.value !== null,
				onClick: Q
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), T("span", {
				class: j(x(Z).status_text),
				role: "status"
			}, O(X.value === "saved" ? x(a)("settings.novelai.saved") : X.value === "failed" ? x(a)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Fe = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Ie(e, t) {
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
var Le = ["id", "aria-describedby"], Re = ["id", "aria-describedby"], ze = ["id", "aria-describedby"], Be = ["id", "aria-describedby"], Ve = /* @__PURE__ */ N({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		promptTagPresets: {},
		controller: {}
	},
	setup(t) {
		let n = t;
		function r(e) {
			return {
				profile: e,
				custom_presets: n.promptTagPresets,
				save: (e, t) => n.controller.save_prompt_tags(e, t)
			};
		}
		let { t: a } = E(), o = S(!1), s = S(null), c = S(!1), l = S(null), u = S(null), d = S(!1), f = S(null), g = S(""), b = S(!1), k = S(null), M = S(/* @__PURE__ */ new Map()), N = Fe.map((e) => ({
			value: e,
			label: Ie(a, e)
		})), F = D({
			get: () => s.value?.provider_id ?? "sd_webui",
			set: (e) => {
				s.value && (s.value.provider_id = e, s.value.workflow_id = "", e === "novelai" && !I.has(s.value.model_id) && (s.value.model_id = ee));
			}
		}), I = new Set(i.map((e) => e.model_id)), V = i.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		}));
		function H() {
			s.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				model_id: "",
				workflow_id: "",
				is_default: n.profiles.length === 0
			}, l.value = null, o.value = !0;
		}
		function U(e) {
			s.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				is_default: e.is_default
			}, l.value = null, o.value = !0;
		}
		function W() {
			o.value = !1, s.value = null, l.value = null;
		}
		async function J() {
			let t = s.value;
			if (!t || c.value) return;
			let r = t.display_name.trim(), i = t.model_id.trim(), o = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (r.length === 0 || i.length === 0 || t.provider_id === "comfyui" && o?.success !== !0) {
				l.value = a("errors.validation_required");
				return;
			}
			c.value = !0, l.value = null;
			try {
				await n.controller.save_provider_profile({
					id: t.id,
					provider_id: t.provider_id,
					display_name: r,
					model_id: i,
					workflow_id: t.provider_id === "comfyui" && o?.success === !0 ? o.data : null,
					is_default: t.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}), W();
			} catch {
				l.value = a("errors.unexpected");
			} finally {
				c.value = !1;
			}
		}
		function Y(e) {
			u.value = e;
		}
		async function X() {
			let e = u.value;
			if (!(!e || d.value)) {
				d.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), u.value = null;
				} finally {
					d.value = !1;
				}
			}
		}
		function Q(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function ne(e) {
			f.value = e, g.value = "", k.value = null;
		}
		function $() {
			f.value = null, g.value = "", k.value = null;
		}
		async function re() {
			let e = f.value;
			if (!(!e || b.value)) {
				if (g.value.trim().length === 0) {
					k.value = a("errors.validation_required");
					return;
				}
				b.value = !0, k.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, g.value), $();
				} catch {
					k.value = a("settings.credential_storage.unlock_required");
				} finally {
					b.value = !1, g.value = "";
				}
			}
		}
		async function ie(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				f.value = e, g.value = "", k.value = a("settings.credential_storage.unlock_required");
			}
		}
		async function ae(e) {
			M.value.set(e.id, {
				pending: !0,
				label: null
			}), M.value = new Map(M.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), r = t.status === "success" ? `${a("status.success")} · ${a("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : a("errors.connection_test_failed", { code: t.error.code });
				M.value.set(e.id, {
					pending: !1,
					label: r
				});
			} catch {
				M.value.set(e.id, {
					pending: !1,
					label: a("errors.unexpected")
				});
			}
			M.value = new Map(M.value);
		}
		return (e, n) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "provider-profiles"
		}, [
			T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(a)("settings.sections.provider_profiles")), 3), P(L, {
				label: x(a)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: H
			}, null, 8, ["label", "variant"])], 2),
			P(R, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": x(a)("settings.provider_profiles.empty_description")
			}, {
				default: _(() => [T("div", null, [(h(!0), v(A, null, p(t.profiles, (e) => (h(), v("div", {
					key: e.id,
					class: j(x(Z).profile_row),
					"data-testid": "provider-profile-row"
				}, [T("div", { class: j(x(Z).profile_identity) }, [
					T("span", { class: j(x(Z).profile_name) }, O(e.display_name), 3),
					T("span", { class: j(x(Z).profile_meta) }, O(x(Ie)(x(a), e.provider_id)), 3),
					Q(e.provider_id) ? (h(), v("span", {
						key: 0,
						class: j(x(Z).profile_meta)
					}, O(e.credential_reference ? x(a)("settings.provider_profiles.credential_set") : x(a)("settings.provider_profiles.credential_unset")), 3)) : C("", !0),
					M.value.get(e.id)?.label ? (h(), v("span", {
						key: 1,
						class: j(x(Z).profile_meta),
						"data-testid": "profile-test-result"
					}, O(M.value.get(e.id)?.label), 3)) : C("", !0),
					T("div", { class: j(x(Z).prompt_tag_row) }, [P(K, {
						port: r(e),
						kind: "quality"
					}, null, 8, ["port"]), P(K, {
						port: r(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), T("div", { class: j(x(Z).profile_actions) }, [
					e.is_default ? (h(), v("span", {
						key: 0,
						class: j(x(Z).badge)
					}, O(x(a)("settings.provider_profiles.default_badge")), 3)) : C("", !0),
					P(L, {
						label: x(a)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: M.value.get(e.id)?.pending === !0,
						onClick: (t) => ae(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					Q(e.provider_id) ? (h(), w(L, {
						key: 1,
						label: x(a)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => ne(e)
					}, null, 8, ["label", "onClick"])) : C("", !0),
					Q(e.provider_id) && e.credential_reference !== null ? (h(), w(L, {
						key: 2,
						label: x(a)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => ie(e)
					}, null, 8, ["label", "onClick"])) : C("", !0),
					P(L, {
						label: x(a)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => U(e)
					}, null, 8, ["label", "onClick"]),
					P(L, {
						label: x(a)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => Y(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			P(z, {
				open: o.value,
				title: s.value?.is_new ? x(a)("settings.provider_profiles.dialog_add_title") : x(a)("settings.provider_profiles.dialog_edit_title"),
				"close-label": x(a)("common.actions.close"),
				"onUpdate:open": n[6] ||= (e) => !e && W()
			}, {
				default: _(() => [s.value ? (h(), v("div", {
					key: 0,
					class: j(x(Z).form_grid)
				}, [
					P(B, {
						label: x(a)("common.labels.name"),
						required: ""
					}, {
						default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => s.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: j(x(Z).text_input)
						}, null, 10, Le), [[y, s.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					P(B, {
						label: x(a)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: _(({ fieldId: e }) => [P(G, {
							id: e,
							modelValue: F.value,
							"onUpdate:modelValue": n[1] ||= (e) => F.value = e,
							options: x(N),
							placeholder: x(a)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					s.value.provider_id === "novelai" ? (h(), w(B, {
						key: 0,
						label: x(a)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: _(({ fieldId: e }) => [P(G, {
							id: e,
							modelValue: s.value.model_id,
							"onUpdate:modelValue": n[2] ||= (e) => s.value.model_id = e,
							options: x(V),
							placeholder: x(a)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : (h(), w(B, {
						key: 1,
						label: x(a)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => s.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: j(x(Z).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Re), [[y, s.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					s.value.provider_id === "comfyui" ? (h(), w(B, {
						key: 2,
						label: x(a)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => s.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: j(x(Z).text_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, ze), [[y, s.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : C("", !0),
					P(q, {
						modelValue: s.value.is_default,
						"onUpdate:modelValue": n[5] ||= (e) => s.value.is_default = e,
						label: x(a)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					l.value ? (h(), v("p", {
						key: 3,
						class: j([x(Z).status_text, x(Z).description]),
						"data-tone": "error"
					}, O(l.value), 3)) : C("", !0),
					T("div", { class: j(x(Z).actions_row) }, [P(L, {
						label: x(a)("common.actions.save"),
						pending: c.value,
						onClick: J
					}, null, 8, ["label", "pending"]), P(L, {
						label: x(a)("common.actions.cancel"),
						variant: "secondary",
						onClick: W
					}, null, 8, ["label"])], 2)
				], 2)) : C("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			P(z, {
				open: f.value !== null,
				title: x(a)("settings.provider_profiles.credential_dialog_title", { name: f.value?.display_name ?? "" }),
				description: x(a)("settings.provider_profiles.credential_dialog_description"),
				"close-label": x(a)("common.actions.close"),
				"onUpdate:open": n[8] ||= (e) => !e && $()
			}, {
				default: _(() => [T("div", { class: j(x(Z).form_grid) }, [P(B, {
					label: x(a)("settings.provider_profiles.credential_label"),
					error: k.value,
					required: ""
				}, {
					default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": n[7] ||= (e) => g.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: j(x(Z).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, Be), [[y, g.value]])]),
					_: 1
				}, 8, ["label", "error"]), T("div", { class: j(x(Z).actions_row) }, [P(L, {
					label: x(a)("common.actions.save"),
					pending: b.value,
					onClick: re
				}, null, 8, ["label", "pending"]), P(L, {
					label: x(a)("common.actions.cancel"),
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
			P(te, {
				open: u.value !== null,
				title: x(a)("settings.provider_profiles.remove_confirm_title", { name: u.value?.display_name ?? "" }),
				description: x(a)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": x(a)("confirmations.destructive.default_confirm_action"),
				"cancel-label": x(a)("confirmations.destructive.default_cancel_action"),
				pending: d.value,
				"onUpdate:open": n[9] ||= (e) => !e && (u.value = null),
				onConfirm: X
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
}), He = ["id", "aria-describedby"], Ue = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], We = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], Ge = 200, Ke = /* @__PURE__ */ N({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = D(() => t.settings?.translation ?? null);
		function i(e) {
			let n = r.value;
			return n === null ? Promise.resolve() : t.controller.update_settings({ translation: {
				...n,
				...e
			} });
		}
		let a = D(() => [{
			value: "free",
			label: n("settings.translation.endpoint_free")
		}, {
			value: "pro",
			label: n("settings.translation.endpoint_pro")
		}]);
		function o(e) {
			(e === "free" || e === "pro") && i({ deepl_endpoint: e });
		}
		let s = S(""), c = S("idle");
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
		let d = D(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), f = S([]);
		g(() => r.value?.glossary, (e) => {
			f.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function b() {
			f.value.length < Ge && f.value.push({
				source: "",
				target: ""
			});
		}
		function C(e) {
			f.value.splice(e, 1);
		}
		function w() {
			i({ glossary: f.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (h(), v("div", {
			class: j(x(Z).section),
			"data-testid": "translation-settings"
		}, [T("div", { class: j(x(Z).section_header) }, [T("h2", { class: j(x(Z).section_title) }, O(x(n)("settings.nav.translation")), 3)], 2), T("div", { class: j(x(Z).form_grid) }, [
			T("p", { class: j(x(Z).description) }, O(x(n)("settings.translation.description")), 3),
			P(B, {
				label: x(n)("settings.translation.key_label"),
				hint: x(n)("settings.translation.key_hint")
			}, {
				default: _(({ fieldId: e, describedBy: t }) => [m(T("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: j(x(Z).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, He), [[y, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			T("div", { class: j(x(Z).actions_row) }, [
				P(L, {
					label: x(n)("settings.translation.key_save"),
					variant: "primary",
					pending: c.value === "saving",
					disabled: s.value.trim() === "",
					onClick: l
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				P(L, {
					label: x(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				T("span", {
					class: j(x(Z).status_text),
					role: "status"
				}, O(d.value), 3)
			], 2),
			T("div", { class: j(x(Z).row) }, [T("span", { class: j(x(Z).row_label) }, O(x(n)("settings.translation.endpoint_label")), 3), P(U, {
				"model-value": r.value?.deepl_endpoint ?? "free",
				options: a.value,
				label: x(n)("settings.translation.endpoint_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			T("h3", { class: j(x(Z).section_title) }, O(x(n)("settings.translation.glossary_title")), 3),
			T("p", { class: j(x(Z).description) }, O(x(n)("settings.translation.glossary_description")), 3),
			(h(!0), v(A, null, p(f.value, (e, t) => (h(), v("div", {
				key: t,
				class: j(x(Z).actions_row),
				"data-testid": "glossary-row"
			}, [
				m(T("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": x(n)("settings.translation.glossary_source"),
					placeholder: x(n)("settings.translation.glossary_source"),
					class: j(x(Z).text_input)
				}, null, 10, Ue), [[y, e.source]]),
				m(T("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": x(n)("settings.translation.glossary_target"),
					placeholder: x(n)("settings.translation.glossary_target"),
					class: j(x(Z).text_input)
				}, null, 10, We), [[y, e.target]]),
				P(L, {
					label: x(n)("settings.translation.glossary_remove"),
					onClick: (e) => C(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			T("div", { class: j(x(Z).actions_row) }, [P(L, {
				label: x(n)("settings.translation.glossary_add"),
				disabled: f.value.length >= Ge,
				onClick: b
			}, null, 8, ["label", "disabled"]), P(L, {
				label: x(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: w
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), qe = ["aria-label"], Je = [
	"data-selected",
	"aria-current",
	"onClick"
], Ye = { class: "tc-visually-hidden" }, Xe = /* @__PURE__ */ N({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = b(() => import("./PromptView-BuMIWMog.js")), n = b(() => import("./AssetsView-CkGIblws.js")), r = b(() => import("./PromptTagPresetPanel-Br_gULW9.js")), i = b(() => import("./DiagnosticsView-BLA_u9Bf.js")), a = e, { t: o } = E(), s = [
			"illustration",
			"providers",
			"translation",
			"prompts",
			"library",
			"connections",
			"general",
			"diagnostics"
		];
		function c(e) {
			switch (e) {
				case "illustration": return o("settings.nav.illustration");
				case "providers": return o("settings.nav.providers");
				case "translation": return o("settings.nav.translation");
				case "prompts": return o("settings.nav.prompts");
				case "library": return o("settings.nav.library");
				case "connections": return o("settings.nav.connections");
				case "general": return o("settings.nav.general");
				case "diagnostics": return o("settings.nav.diagnostics");
			}
		}
		let l = D(() => a.state.settings_section), u = D(() => a.state.generation.profiles.find((e) => e.id === a.state.generation.active_profile_id && e.provider_id === "novelai") ?? null);
		function d(e, t) {
			return a.controller.test_prompt_regex(e, t);
		}
		return (a, f) => (h(), v("div", {
			class: j(x(Z).layout),
			"data-testid": "settings-view"
		}, [T("nav", {
			class: j(x(Z).section_nav),
			"aria-label": x(o)("nav.settings")
		}, [(h(), v(A, null, p(s, (t) => T("button", {
			key: t,
			type: "button",
			class: j(["tc-interactive", x(Z).section_nav_item]),
			"data-selected": t === l.value,
			"aria-current": t === l.value ? "page" : void 0,
			onClick: (n) => e.controller.set_settings_section(t)
		}, O(c(t)), 11, Je)), 64))], 10, qe), T("div", { class: j(x(Z).section_content) }, [l.value === "prompts" ? (h(), v(A, { key: 0 }, [P(x(t), {
			state: e.state,
			"test-regex": d,
			onSelectPreset: f[0] ||= (t) => void e.controller.select_prompt_preset(t),
			onNewPreset: f[1] ||= (t) => e.controller.start_new_prompt_preset(),
			onBulkDeletePresets: f[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
			onUpdateDraft: f[3] ||= (t) => e.controller.update_prompt_draft(t),
			onSave: f[4] ||= (t) => void e.controller.save_prompt_preset(t)
		}, null, 8, ["state"]), P(x(r), {
			records: e.state.assets.records.prompt_tag,
			loading: e.state.loading.has("assets"),
			controller: e.controller
		}, null, 8, [
			"records",
			"loading",
			"controller"
		])], 64)) : l.value === "library" ? (h(), w(x(n), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : l.value === "diagnostics" ? (h(), w(x(i), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (h(), v("div", {
			key: 3,
			class: j(x(Z).view)
		}, [T("h1", Ye, O(c(l.value)), 1), l.value === "illustration" ? (h(), w(Se, {
			key: 0,
			settings: e.state.settings.settings,
			"prompt-presets": e.state.prompt.presets,
			controller: e.controller
		}, null, 8, [
			"settings",
			"prompt-presets",
			"controller"
		])) : l.value === "providers" ? (h(), v(A, { key: 1 }, [
			e.state.generation.profiles.length === 0 ? (h(), v("section", {
				key: 0,
				class: j(x(Z).onboarding),
				"data-testid": "settings-onboarding",
				"aria-labelledby": "settings-onboarding-title"
			}, [T("div", {
				class: j(x(Z).onboarding_icon),
				"aria-hidden": "true"
			}, [P(I, {
				icon: x(J),
				size: 22
			}, null, 8, ["icon"])], 2), T("div", null, [
				T("p", { class: j(x(Z).onboarding_label) }, O(x(o)("settings.onboarding.label")), 3),
				T("h2", {
					id: "settings-onboarding-title",
					class: j(x(Z).onboarding_title)
				}, O(x(o)("settings.onboarding.title")), 3),
				T("p", { class: j(x(Z).onboarding_description) }, O(x(o)("settings.onboarding.description")), 3)
			])], 2)) : C("", !0),
			P(Ve, {
				profiles: e.state.generation.profiles,
				"prompt-tag-presets": e.state.assets.records.prompt_tag,
				controller: e.controller
			}, null, 8, [
				"profiles",
				"prompt-tag-presets",
				"controller"
			]),
			u.value === null ? C("", !0) : (h(), w(Pe, {
				key: 1,
				profile: u.value,
				vibes: e.state.assets.records.vibe,
				controller: e.controller
			}, null, 8, [
				"profile",
				"vibes",
				"controller"
			]))
		], 64)) : l.value === "translation" ? (h(), w(Ke, {
			key: 2,
			settings: e.state.settings.settings,
			controller: e.controller
		}, null, 8, ["settings", "controller"])) : l.value === "connections" ? (h(), v(A, { key: 3 }, [P(ke, {
			connections: e.state.llm_connections.connections,
			loading: e.state.loading.has("llm_connections"),
			controller: e.controller
		}, null, 8, [
			"connections",
			"loading",
			"controller"
		]), P(pe, {
			settings: e.state.settings.settings,
			"connection-test-command": e.state.diagnostics.connection_test_command,
			controller: e.controller
		}, null, 8, [
			"settings",
			"connection-test-command",
			"controller"
		])], 64)) : l.value === "general" ? (h(), v(A, { key: 4 }, [
			P(Q, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			P(ae, {
				settings: e.state.settings.settings,
				"vault-status": e.state.settings.browser_secret_vault,
				controller: e.controller
			}, null, 8, [
				"settings",
				"vault-status",
				"controller"
			]),
			P(ce, {
				"vocabulary-update-channel": e.state.settings.vocabulary_update_channel,
				controller: e.controller
			}, null, 8, ["vocabulary-update-channel", "controller"])
		], 64)) : C("", !0)], 2))], 2)], 2));
	}
});
//#endregion
export { Xe as default };
