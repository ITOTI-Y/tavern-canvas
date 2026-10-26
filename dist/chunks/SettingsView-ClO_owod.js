import { a as e } from "./ids-DjWg1HG8.js";
import { a as t, c as n, i as r, s as i } from "./novelai-BG6cLQq6.js";
import { r as a } from "./novelai_models-CWhnujYI.js";
import { n as o, o as s, s as c } from "./llm_connection-DZhYUypM.js";
import { a as l, n as u, o as d, r as f } from "./http_acknowledgment-a-0GLUwN.js";
import { A as p, F as m, G as h, N as g, V as _, W as v, _ as y, a as b, b as x, ct as S, et as C, g as w, h as T, m as E, n as D, p as O, pt as k, s as A, u as j, ut as M, v as N, x as P, y as F } from "./vue-i18n-DUz2Gjn8.js";
import { n as I, t as L } from "./AppIcon-Cnhzrx9o.js";
import { n as R, t as z } from "./StateSurface-Bo_sA18G.js";
import { n as B, t as V } from "./AppDialog-DJhokkv1.js";
import { t as H } from "./FieldGroup-LDtWeac7.js";
import "./browser_secret_vault-BPvzuZ77.js";
import { n as U, t as W } from "./novelai_request_defaults-ZvIzjSeh.js";
import { t as G } from "./AppSelect-DJk9aRkS.js";
import { n as K, t as q } from "./SegmentedControl-Dm-Q3kIh.js";
import { n as ee, t as J } from "./AppSwitch-x2vuooAG.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var te = I("cable", [
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
]), Y = I("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), X = I("triangle-alert", [
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
}, Q = /* @__PURE__ */ P({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = {
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
		let a = O(() => [
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
		]), o = O(() => [
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
		return (t, r) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "appearance-settings"
		}, [E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(n)("settings.sections.appearance")), 3)], 2), E("div", { class: M(S(Z).form_grid) }, [
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.appearance.theme_label")), 3), F(q, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: S(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.appearance.language_label")), 3), F(q, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: S(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.appearance.inspector_width_label")), 3), F(K, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: S(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": S(n)("common.actions.increase"),
				"decrement-label": S(n)("common.actions.decrease"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			F(J, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: S(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), $ = ["data-tone"], ne = ["id", "aria-describedby"], re = ["id", "aria-describedby"], ie = ["id", "aria-describedby"], ae = /* @__PURE__ */ P({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = C(""), i = C(""), a = C(!1), o = C(null), s = C(!1), c = O(() => [{
			value: "host",
			label: n("settings.credential_storage.modes.host")
		}, {
			value: "browser_encrypted",
			label: n("settings.credential_storage.modes.browser_encrypted")
		}]), l = O({
			get: () => t.settings?.credential_storage_mode ?? "host",
			set: (e) => {
				o.value = null, t.controller.update_settings({ credential_storage_mode: e }).catch(() => {
					o.value = n("errors.unexpected");
				});
			}
		}), u = O(() => {
			let e = { count: t.vaultStatus.secret_count };
			switch (t.vaultStatus.state) {
				case "unavailable": return n("settings.credential_storage.states.unavailable", e);
				case "error": return n("settings.credential_storage.states.error", e);
				case "uninitialized": return n("settings.credential_storage.states.uninitialized", e);
				case "locked": return n("settings.credential_storage.states.locked", e);
				case "unlocked": return n("settings.credential_storage.states.unlocked", e);
			}
		}), d = O(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function f() {
			r.value = "", i.value = "";
		}
		function p(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function m(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function _() {
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
		async function x() {
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
		async function T() {
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
		return (t, f) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "credential-storage-settings"
		}, [
			E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (g(), y("span", {
				key: 0,
				class: M(S(Z).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, k(u.value), 11, $)) : w("", !0)], 2),
			E("div", { class: M(S(Z).vault_mode_row) }, [E("div", { class: M(S(Z).profile_identity) }, [E("span", { class: M(S(Z).profile_name) }, k(S(n)("settings.credential_storage.mode_label")), 3), E("span", { class: M(S(Z).profile_meta) }, k(S(n)("settings.credential_storage.mode_hint")), 3)], 2), F(q, {
				modelValue: l.value,
				"onUpdate:modelValue": f[0] ||= (e) => l.value = e,
				options: c.value,
				label: S(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (g(), y("div", {
				key: 0,
				class: M(S(Z).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (g(), y("p", {
				key: 0,
				class: M(S(Z).status_text),
				"data-tone": "error",
				role: "alert"
			}, k(d.value), 3)) : e.vaultStatus.state === "uninitialized" ? (g(), y(j, { key: 1 }, [
				F(H, {
					label: S(n)("settings.credential_storage.passphrase_label"),
					hint: S(n)("settings.credential_storage.passphrase_hint", { count: S(12) }),
					required: ""
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
						id: e,
						"onUpdate:modelValue": f[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: M(S(Z).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, ne), [[b, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				F(H, {
					label: S(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
						id: e,
						"onUpdate:modelValue": f[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: M(S(Z).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, re), [[b, i.value]])]),
					_: 1
				}, 8, ["label"]),
				F(R, {
					label: S(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: _
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (g(), y(j, { key: 2 }, [F(H, {
				label: S(n)("settings.credential_storage.passphrase_label"),
				hint: S(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
					id: e,
					"onUpdate:modelValue": f[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: M(S(Z).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: A(x, ["enter"])
				}, null, 42, ie), [[b, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), F(R, {
				label: S(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: x
			}, null, 8, ["label", "pending"])], 64)) : (g(), y("div", {
				key: 3,
				class: M(S(Z).vault_unlocked_actions)
			}, [F(R, {
				label: S(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: T
			}, null, 8, ["label", "pending"]), F(R, {
				label: S(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: f[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (g(), y("p", {
				key: 4,
				class: M(S(Z).status_text),
				"data-tone": "error",
				role: "alert"
			}, k(o.value), 3)) : w("", !0)], 2)) : w("", !0),
			F(ee, {
				open: s.value,
				title: S(n)("settings.credential_storage.reset_confirm_title"),
				description: S(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": S(n)("settings.credential_storage.reset_action"),
				"cancel-label": S(n)("common.actions.cancel"),
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
}), oe = ["aria-label"], se = ["aria-label"], ce = /* @__PURE__ */ P({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = C(!1), i = [{
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
		let o = C(!1), s = C(!1), c = C(null), l = C(null), u = C(null);
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
		let m = O(() => {
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
		}), h = C(!1), _ = C(null);
		async function v() {
			if (!h.value) {
				h.value = !0, _.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "tavern-canvas-archive.json", r.click(), URL.revokeObjectURL(n);
				} catch {
					_.value = n("errors.unexpected");
				} finally {
					h.value = !1;
				}
			}
		}
		let b = C(!1), x = C(null), A = C(null);
		function j() {
			A.value?.click();
		}
		async function N(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || b.value)) {
				b.value = !0, x.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					x.value = n("errors.unexpected");
				} finally {
					b.value = !1;
				}
			}
		}
		return (t, l) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "data-settings"
		}, [E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(n)("settings.sections.data")), 3)], 2), E("div", { class: M(S(Z).form_grid) }, [
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.data.vocabulary_channel_label")), 3), F(q, {
				"model-value": e.vocabularyUpdateChannel ?? "bundled",
				options: i,
				label: S(n)("settings.data.vocabulary_channel_label"),
				disabled: r.value,
				"onUpdate:modelValue": a
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])], 2),
			E("div", { class: M(S(Z).actions_row) }, [
				F(R, {
					label: S(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: o.value,
					onClick: d
				}, null, 8, ["label", "pending"]),
				o.value ? (g(), T(R, {
					key: 0,
					label: S(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: f
				}, null, 8, ["label"])) : w("", !0),
				E("input", {
					ref_key: "vocabulary_file_input",
					ref: u,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": S(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: p
				}, null, 40, oe)
			], 2),
			E("p", { class: M(S(Z).description) }, k(S(n)("settings.data.vocabulary_import.description")), 3),
			m.value ? (g(), y("p", {
				key: 0,
				class: M([S(Z).status_text, S(Z).description]),
				"data-testid": "vocabulary-import-progress"
			}, k(m.value), 3)) : w("", !0),
			s.value ? (g(), y("p", {
				key: 1,
				class: M([S(Z).status_text, S(Z).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, k(S(n)("settings.data.vocabulary_import.success")), 3)) : w("", !0),
			c.value ? (g(), y("p", {
				key: 2,
				class: M([S(Z).status_text, S(Z).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, k(c.value), 3)) : w("", !0),
			E("div", { class: M(S(Z).actions_row) }, [
				F(R, {
					label: S(n)("settings.data.archive_export_action"),
					pending: h.value,
					onClick: v
				}, null, 8, ["label", "pending"]),
				F(R, {
					label: S(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: b.value,
					onClick: j
				}, null, 8, ["label", "pending"]),
				E("input", {
					ref_key: "file_input",
					ref: A,
					type: "file",
					accept: "application/json",
					class: "tc-visually-hidden",
					"aria-label": S(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: N
				}, null, 40, se)
			], 2),
			E("p", { class: M(S(Z).description) }, k(S(n)("settings.data.archive_import_description")), 3),
			_.value ? (g(), y("p", {
				key: 3,
				class: M([S(Z).status_text, S(Z).description]),
				"data-tone": "error"
			}, k(_.value), 3)) : w("", !0),
			x.value ? (g(), y("p", {
				key: 4,
				class: M([S(Z).status_text, S(Z).description]),
				"data-tone": "error"
			}, k(x.value), 3)) : w("", !0)
		], 2)], 2));
	}
}), le = ["id", "aria-describedby"], ue = ["data-severity"], de = ["id"], fe = ["id", "aria-describedby"], pe = /* @__PURE__ */ P({
	__name: "GatewaySettings",
	props: {
		settings: {},
		connectionTestCommand: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		}, i = C(t.settings?.gateway.endpoint ?? ""), a = C(null), o = C(!1), s = C(!1), c = C(""), p = C(!1), m = C(null);
		_(() => t.settings?.gateway.endpoint ?? "", (e) => {
			i.value = e;
		});
		let x = O(() => {
			let e = i.value.trim();
			if (e.length === 0) return null;
			try {
				if (!d(e)) return null;
				let n = l(e), r = u(n), i = f(t.settings?.gateway.http_acknowledgments ?? {}, n);
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
				s = l(e);
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
			let e = x.value;
			if (!(!e || s.value)) {
				s.value = !0;
				try {
					await t.controller.acknowledge_http_origin(e.origin);
				} finally {
					s.value = !1;
				}
			}
		}
		async function P() {
			let e = c.value.trim();
			if (m.value = null, !(e.length === 0 || p.value)) {
				p.value = !0;
				try {
					await t.controller.set_gateway_token(e), c.value = "";
				} catch {
					m.value = n("settings.credential_storage.unlock_required");
				} finally {
					p.value = !1;
				}
			}
		}
		async function I() {
			if (!p.value) {
				p.value = !0, m.value = null;
				try {
					await t.controller.clear_gateway_token();
				} catch {
					m.value = n("settings.credential_storage.unlock_required");
				} finally {
					p.value = !1;
				}
			}
		}
		function z() {
			t.controller.test_diagnostics_connection();
		}
		let B = O(() => t.connectionTestCommand.status === "pending");
		return (t, r) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "gateway-settings"
		}, [E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(n)("settings.sections.gateway")), 3)], 2), E("div", { class: M(S(Z).form_grid) }, [
			F(H, {
				label: S(n)("settings.gateway.endpoint_label"),
				hint: S(n)("settings.gateway.endpoint_hint"),
				error: a.value
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
					id: e,
					"onUpdate:modelValue": r[0] ||= (e) => i.value = e,
					type: "text",
					"aria-describedby": t,
					class: M(S(Z).text_input),
					"data-testid": "gateway-endpoint-input",
					onBlur: A
				}, null, 42, le), [[b, i.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			x.value && !x.value.acknowledged ? (g(), y("div", {
				key: 0,
				class: M(S(Z).risk_banner),
				"data-severity": x.value.severity,
				"data-testid": "http-risk-banner",
				role: "alert"
			}, [
				E("div", { class: M(S(Z).risk_banner_title) }, [F(L, {
					icon: S(X),
					size: 16
				}, null, 8, ["icon"]), N(" " + k(S(n)("settings.http_risk.warning_title")), 1)], 2),
				E("p", { class: M(S(Z).risk_banner_description) }, k(x.value.severity === "error" ? S(n)("settings.http_risk.error_description_public", { origin: x.value.origin }) : S(n)("settings.http_risk.warning_description_local", { origin: x.value.origin })), 3),
				E("p", { class: M(S(Z).risk_banner_description) }, k(S(n)("settings.http_risk.disclosure")), 3),
				E("div", { class: M(S(Z).risk_banner_actions) }, [F(R, {
					label: S(n)("settings.http_risk.continue_action"),
					pending: s.value,
					onClick: j
				}, null, 8, ["label", "pending"])], 2)
			], 10, ue)) : x.value && x.value.acknowledged ? (g(), y("div", {
				key: 1,
				class: M(S(Z).acknowledged_note),
				"data-testid": "http-risk-acknowledged"
			}, [F(L, {
				icon: S(Y),
				size: 14
			}, null, 8, ["icon"]), N(" " + k(S(n)("settings.http_risk.acknowledged_label")), 1)], 2)) : w("", !0),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.gateway.protocol_label")), 3), F(R, {
				label: S(n)("settings.gateway.detect_action"),
				variant: "secondary",
				pending: B.value,
				onClick: z
			}, null, 8, ["label", "pending"])], 2),
			F(H, { label: S(n)("settings.gateway.token_secret_label") }, {
				default: v(({ fieldId: t }) => [E("span", {
					id: t,
					class: M(S(Z).row_value),
					"data-testid": "gateway-token-reference"
				}, k(e.settings?.gateway.token_secret_id ?? S(n)("settings.gateway.token_not_set")), 11, de)]),
				_: 1
			}, 8, ["label"]),
			F(H, {
				label: S(n)("settings.gateway.token_label"),
				hint: S(n)("settings.gateway.token_hint"),
				error: m.value
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
					id: e,
					"onUpdate:modelValue": r[1] ||= (e) => c.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: M(S(Z).text_input),
					"data-testid": "gateway-token-input"
				}, null, 10, fe), [[b, c.value]])]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			E("div", { class: M(S(Z).row) }, [F(R, {
				label: S(n)("settings.gateway.token_save_action"),
				pending: p.value,
				disabled: c.value.trim().length === 0,
				"data-testid": "gateway-token-save",
				onClick: P
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), e.settings?.gateway.token_secret_id ? (g(), T(R, {
				key: 0,
				label: S(n)("settings.gateway.token_clear_action"),
				variant: "secondary",
				pending: p.value,
				"data-testid": "gateway-token-clear",
				onClick: I
			}, null, 8, ["label", "pending"])) : w("", !0)], 2)
		], 2)], 2));
	}
}), me = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], he = ["id", "aria-describedby"], ge = ["id", "aria-describedby"], _e = ["id", "aria-describedby"], ve = ["id", "aria-describedby"], ye = ["id", "aria-describedby"], be = "in_use", xe = "none", Se = /* @__PURE__ */ P({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = O(() => t.settings?.illustration ?? null);
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
		let o = C(""), s = C(""), c = C(""), l = C(""), u = C("");
		_(r, (e) => {
			o.value = e === null || e.preset_name === be ? "" : e.preset_name, e?.connection.kind === "proxy_preset" ? (s.value = e.connection.proxy_preset, c.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (l.value = e.connection.api_url, u.value = e.connection.model);
		}, { immediate: !0 });
		function d() {
			a({ preset_name: o.value.trim() || be });
		}
		let f = O(() => [
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
		function m() {
			let e = l.value.trim(), t = u.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let x = O(() => z.value === "custom" && l.value.trim() !== "" && m() === null);
		function T() {
			let e = m();
			e !== null && a({ connection: e });
		}
		let A = C(""), N = C("idle");
		async function P() {
			let e = A.value.trim();
			if (e !== "") {
				N.value = "saving";
				try {
					await t.controller.set_analysis_key(e), A.value = "", N.value = "saved";
				} catch {
					N.value = "failed";
				}
			}
		}
		async function I() {
			N.value = "saving";
			try {
				await t.controller.clear_analysis_key(), N.value = "cleared";
			} catch {
				N.value = "failed";
			}
		}
		let L = O(() => {
			switch (N.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), z = C(r.value?.connection.kind ?? "current");
		_(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (z.value = e);
		});
		function B(e) {
			if (e === "current") z.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				z.value = "proxy_preset";
				let e = p();
				e !== null && a({ connection: e });
			} else e === "custom" && (z.value = "custom", T());
		}
		function V() {
			let e = p();
			e !== null && a({ connection: e });
		}
		let U = O(() => [{
			value: xe,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function W(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		return (t, p) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "illustration-settings"
		}, [E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(n)("settings.nav.illustration")), 3)], 2), E("div", { class: M(S(Z).form_grid) }, [
			F(J, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: S(n)("settings.illustration.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": p[0] ||= (e) => i({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			E("p", { class: M(S(Z).description) }, k(S(n)("settings.illustration.auto_generation_hint")), 3),
			F(H, {
				label: S(n)("settings.illustration.preset_label"),
				hint: S(n)("settings.illustration.preset_hint")
			}, {
				default: v(({ fieldId: t, describedBy: r }) => [h(E("input", {
					id: t,
					"onUpdate:modelValue": p[1] ||= (e) => o.value = e,
					type: "text",
					placeholder: S(n)("settings.illustration.preset_placeholder"),
					"aria-describedby": r,
					class: M(S(Z).text_input),
					disabled: !e.settings,
					"data-testid": "analysis-preset-input",
					onBlur: d
				}, null, 42, me), [[b, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.illustration.connection_label")), 3), F(q, {
				"model-value": z.value,
				options: f.value,
				label: S(n)("settings.illustration.connection_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": B
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			z.value === "proxy_preset" ? (g(), y(j, { key: 0 }, [F(H, {
				label: S(n)("settings.illustration.proxy_preset_label"),
				hint: S(n)("settings.illustration.proxy_preset_hint")
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
					id: e,
					"onUpdate:modelValue": p[2] ||= (e) => s.value = e,
					type: "text",
					"aria-describedby": t,
					class: M(S(Z).text_input),
					"data-testid": "analysis-proxy-preset-input",
					onBlur: V
				}, null, 42, he), [[b, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]), F(H, {
				label: S(n)("settings.illustration.proxy_model_label"),
				hint: S(n)("settings.illustration.proxy_model_hint")
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
					id: e,
					"onUpdate:modelValue": p[3] ||= (e) => c.value = e,
					type: "text",
					"aria-describedby": t,
					class: M(S(Z).text_input),
					onBlur: V
				}, null, 42, ge), [[b, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])], 64)) : w("", !0),
			z.value === "custom" ? (g(), y(j, { key: 1 }, [
				F(H, {
					label: S(n)("settings.illustration.custom_url_label"),
					hint: S(n)("settings.illustration.custom_url_hint"),
					error: x.value ? S(n)("settings.illustration.custom_invalid") : null
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
						id: e,
						"onUpdate:modelValue": p[4] ||= (e) => l.value = e,
						type: "url",
						placeholder: "https://",
						"aria-describedby": t,
						class: M(S(Z).text_input),
						"data-testid": "analysis-custom-url-input",
						onBlur: T
					}, null, 42, _e), [[b, l.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]),
				F(H, { label: S(n)("settings.illustration.custom_model_label") }, {
					default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
						id: e,
						"onUpdate:modelValue": p[5] ||= (e) => u.value = e,
						type: "text",
						"aria-describedby": t,
						class: M(S(Z).text_input),
						"data-testid": "analysis-custom-model-input",
						onBlur: T
					}, null, 42, ve), [[b, u.value]])]),
					_: 1
				}, 8, ["label"]),
				F(H, {
					label: S(n)("settings.illustration.custom_key_label"),
					hint: S(n)("settings.illustration.custom_key_hint")
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
						id: e,
						"onUpdate:modelValue": p[6] ||= (e) => A.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: M(S(Z).text_input),
						"data-testid": "analysis-custom-key-input"
					}, null, 10, ye), [[b, A.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				E("div", { class: M(S(Z).actions_row) }, [
					F(R, {
						label: S(n)("settings.illustration.custom_key_save"),
						variant: "primary",
						pending: N.value === "saving",
						disabled: A.value.trim() === "",
						onClick: P
					}, null, 8, [
						"label",
						"pending",
						"disabled"
					]),
					F(R, {
						label: S(n)("settings.illustration.custom_key_clear"),
						onClick: I
					}, null, 8, ["label"]),
					E("span", {
						class: M(S(Z).status_text),
						role: "status"
					}, k(L.value), 3)
				], 2)
			], 64)) : w("", !0),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.illustration.chat_history_label")), 3), F(K, {
				"model-value": r.value?.max_chat_history,
				label: S(n)("settings.illustration.chat_history_label"),
				min: 0,
				max: 20,
				"increment-label": S(n)("common.actions.increase"),
				"decrement-label": S(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": p[7] ||= (e) => a({ max_chat_history: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.illustration.max_images_label")), 3), F(K, {
				"model-value": r.value?.max_images_per_message,
				label: S(n)("settings.illustration.max_images_label"),
				min: 1,
				max: 8,
				"increment-label": S(n)("common.actions.increase"),
				"decrement-label": S(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": p[8] ||= (e) => a({ max_images_per_message: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.illustration.prompt_preset_label")), 3), F(G, {
				"model-value": r.value?.prompt_preset_id ?? xe,
				options: U.value,
				placeholder: S(n)("settings.illustration.prompt_preset_label"),
				"aria-label": S(n)("settings.illustration.prompt_preset_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": W
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label",
				"disabled"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.illustration.concurrency_label")), 3), F(K, {
				"model-value": e.settings?.global_concurrency,
				label: S(n)("settings.illustration.concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": S(n)("common.actions.increase"),
				"decrement-label": S(n)("common.actions.decrease"),
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
	return o[e].completion_routes;
}
//#endregion
//#region src/ui/views/settings/LlmConnections.vue?vue&type=script&setup=true&lang.ts
var Ee = ["id", "aria-describedby"], De = ["id", "aria-describedby"], Oe = ["id", "aria-describedby"], ke = /* @__PURE__ */ P({
	__name: "LlmConnections",
	props: {
		connections: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = C(!1), i = C(null), a = C(!1), o = C(null), s = C(null), c = C(null), l = C(null), u = C(!1), d = C(null), f = C(""), p = C(!1), _ = C(null), x = C(/* @__PURE__ */ new Map()), A = O(() => Ce.map((e) => ({
			value: e,
			label: we(n, e)
		}))), N = O(() => Te(i.value?.provider_kind ?? "openai_compatible").map((e) => ({
			value: e,
			label: e
		}))), P = O({
			get: () => i.value?.provider_kind ?? "openai_compatible",
			set: (e) => {
				i.value && (i.value.provider_kind = e, i.value.route = Te(i.value.provider_kind)[0] ?? "");
			}
		}), I = O({
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
				route: Te("openai_compatible")[0] ?? "",
				display_name: "",
				model_id: "",
				temperature: .7,
				max_output_tokens: 2048,
				is_default: t.connections.length === 0
			}, U(), r.value = !0;
		}
		function B(e) {
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
			}, U(), r.value = !0;
		}
		function U() {
			o.value = null, s.value = null, c.value = null;
		}
		function W() {
			r.value = !1, i.value = null, U();
		}
		async function q() {
			let e = i.value;
			if (!e || a.value) return;
			U();
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
					}), W();
				} catch {
					c.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		function te(e) {
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
			d.value = e, f.value = "", _.value = null;
		}
		function Q() {
			d.value = null, f.value = "", _.value = null;
		}
		async function $() {
			let e = d.value;
			if (!(!e || p.value)) {
				if (f.value.trim().length === 0) {
					_.value = n("errors.validation_required");
					return;
				}
				p.value = !0, _.value = null;
				try {
					await t.controller.set_llm_connection_credential(e.id, f.value), Q();
				} catch {
					_.value = n("settings.credential_storage.unlock_required");
				} finally {
					p.value = !1, f.value = "";
				}
			}
		}
		async function ne(e) {
			try {
				await t.controller.clear_llm_connection_credential(e.id);
			} catch {
				d.value = e, f.value = "", _.value = n("settings.credential_storage.unlock_required");
			}
		}
		async function re(e) {
			x.value = new Map(x.value).set(e.id, {
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
			x.value = new Map(x.value).set(e.id, {
				pending: !1,
				label: r
			});
		}
		return (t, C) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "llm-connections"
		}, [
			E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(n)("settings.sections.llm_connections")), 3), F(R, {
				label: S(n)("settings.llm_connections.add_action"),
				onClick: L
			}, null, 8, ["label"])], 2),
			E("p", { class: M(S(Z).description) }, k(S(n)("settings.llm_connections.section_description")), 3),
			F(z, {
				status: e.loading ? "loading" : e.connections.length === 0 ? "empty" : "ready",
				"empty-message": S(n)("settings.llm_connections.empty_description")
			}, {
				action: v(() => [F(R, {
					label: S(n)("settings.llm_connections.add_action"),
					onClick: L
				}, null, 8, ["label"])]),
				default: v(() => [E("div", null, [(g(!0), y(j, null, m(e.connections, (e) => (g(), y("div", {
					key: e.id,
					class: M(S(Z).profile_row),
					"data-testid": "llm-connection-row"
				}, [E("div", { class: M(S(Z).profile_identity) }, [
					E("span", { class: M(S(Z).profile_name) }, k(e.display_name), 3),
					E("span", { class: M(S(Z).profile_meta) }, k(S(we)(S(n), e.provider_kind)) + " · " + k(e.model_id), 3),
					E("span", {
						class: M(S(Z).profile_meta),
						"data-testid": "llm-connection-credential-state"
					}, k(e.credential_reference ? S(n)("settings.llm_connections.credential_set") : S(n)("settings.llm_connections.credential_unset")), 3),
					x.value.get(e.id)?.label ? (g(), y("span", {
						key: 0,
						class: M(S(Z).profile_meta),
						"data-testid": "llm-connection-test-result"
					}, k(x.value.get(e.id)?.label), 3)) : w("", !0)
				], 2), E("div", { class: M(S(Z).profile_actions) }, [
					e.is_default ? (g(), y("span", {
						key: 0,
						class: M(S(Z).badge)
					}, k(S(n)("settings.llm_connections.default_badge")), 3)) : w("", !0),
					F(R, {
						label: S(n)("settings.llm_connections.connection_test_action"),
						variant: "secondary",
						pending: x.value.get(e.id)?.pending === !0,
						onClick: (t) => re(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					F(R, {
						label: S(n)("settings.llm_connections.set_credential_action"),
						variant: "secondary",
						onClick: (t) => X(e)
					}, null, 8, ["label", "onClick"]),
					e.credential_reference ? (g(), T(R, {
						key: 1,
						label: S(n)("settings.llm_connections.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => ne(e)
					}, null, 8, ["label", "onClick"])) : w("", !0),
					F(R, {
						label: S(n)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => B(e)
					}, null, 8, ["label", "onClick"]),
					F(R, {
						label: S(n)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => te(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			F(V, {
				open: r.value,
				title: i.value?.is_new ? S(n)("settings.llm_connections.dialog_add_title") : S(n)("settings.llm_connections.dialog_edit_title"),
				description: S(n)("settings.llm_connections.dialog_description"),
				"close-label": S(n)("common.actions.close"),
				"onUpdate:open": C[7] ||= (e) => !e && W()
			}, {
				default: v(() => [i.value ? (g(), y("div", {
					key: 0,
					class: M(S(Z).form_grid)
				}, [
					F(H, {
						label: S(n)("common.labels.name"),
						error: o.value,
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
							id: e,
							"onUpdate:modelValue": C[0] ||= (e) => i.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: M(S(Z).text_input)
						}, null, 10, Ee), [[b, i.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					F(H, {
						label: S(n)("settings.llm_connections.provider_kind_label"),
						required: ""
					}, {
						default: v(({ fieldId: e }) => [F(G, {
							id: e,
							modelValue: P.value,
							"onUpdate:modelValue": C[1] ||= (e) => P.value = e,
							options: A.value,
							placeholder: S(n)("settings.llm_connections.provider_kind_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					F(H, {
						label: S(n)("settings.llm_connections.route_label"),
						hint: S(n)("settings.llm_connections.route_hint"),
						required: ""
					}, {
						default: v(({ fieldId: e }) => [F(G, {
							id: e,
							modelValue: I.value,
							"onUpdate:modelValue": C[2] ||= (e) => I.value = e,
							options: N.value,
							placeholder: S(n)("settings.llm_connections.route_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					F(H, {
						label: S(n)("settings.llm_connections.model_label"),
						hint: S(n)("settings.llm_connections.model_hint"),
						error: s.value,
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
							id: e,
							"onUpdate:modelValue": C[3] ||= (e) => i.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: M(S(Z).text_input)
						}, null, 10, De), [[b, i.value.model_id]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					F(H, {
						label: S(n)("settings.llm_connections.temperature_label"),
						hint: S(n)("settings.llm_connections.temperature_hint")
					}, {
						default: v(() => [F(K, {
							modelValue: i.value.temperature,
							"onUpdate:modelValue": C[4] ||= (e) => i.value.temperature = e,
							label: S(n)("settings.llm_connections.temperature_label"),
							"increment-label": S(n)("common.actions.increase"),
							"decrement-label": S(n)("common.actions.decrease"),
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
					F(H, { label: S(n)("settings.llm_connections.max_output_tokens_label") }, {
						default: v(() => [F(K, {
							modelValue: i.value.max_output_tokens,
							"onUpdate:modelValue": C[5] ||= (e) => i.value.max_output_tokens = e,
							label: S(n)("settings.llm_connections.max_output_tokens_label"),
							"increment-label": S(n)("common.actions.increase"),
							"decrement-label": S(n)("common.actions.decrease"),
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
					F(J, {
						modelValue: i.value.is_default,
						"onUpdate:modelValue": C[6] ||= (e) => i.value.is_default = e,
						label: S(n)("settings.llm_connections.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					c.value ? (g(), y("p", {
						key: 0,
						class: M([S(Z).status_text, S(Z).description]),
						"data-tone": "error"
					}, k(c.value), 3)) : w("", !0),
					E("div", { class: M(S(Z).actions_row) }, [F(R, {
						label: S(n)("common.actions.save"),
						pending: a.value,
						onClick: q
					}, null, 8, ["label", "pending"]), F(R, {
						label: S(n)("common.actions.cancel"),
						variant: "secondary",
						onClick: W
					}, null, 8, ["label"])], 2)
				], 2)) : w("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			F(V, {
				open: d.value !== null,
				title: S(n)("settings.llm_connections.credential_dialog_title"),
				description: S(n)("settings.llm_connections.credential_dialog_description"),
				"close-label": S(n)("common.actions.close"),
				"onUpdate:open": C[9] ||= (e) => !e && Q()
			}, {
				default: v(() => [E("div", { class: M(S(Z).form_grid) }, [F(H, {
					label: S(n)("settings.llm_connections.credential_label"),
					hint: S(n)("provider.credentials.not_stored_locally"),
					error: _.value,
					required: ""
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
						id: e,
						"onUpdate:modelValue": C[8] ||= (e) => f.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: M(S(Z).text_input),
						"data-testid": "llm-credential-input"
					}, null, 10, Oe), [[b, f.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), E("div", { class: M(S(Z).actions_row) }, [F(R, {
					label: S(n)("common.actions.save"),
					pending: p.value,
					onClick: $
				}, null, 8, ["label", "pending"]), F(R, {
					label: S(n)("common.actions.cancel"),
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
			F(ee, {
				open: l.value !== null,
				title: S(n)("settings.llm_connections.remove_confirm_title", { name: l.value?.display_name ?? "" }),
				description: S(n)("settings.llm_connections.remove_confirm_description"),
				"confirm-label": S(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": S(n)("confirmations.destructive.default_cancel_action"),
				pending: u.value,
				"onUpdate:open": C[10] ||= (e) => !e && (l.value = null),
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
		case "standard": return e("settings.novelai.quality_standard");
		case "light": return e("settings.novelai.quality_light");
		case "none": return e("settings.novelai.quality_none");
	}
}
function Ne(e, t) {
	switch (t) {
		case "heavy": return e("settings.novelai.uc_heavy");
		case "light": return e("settings.novelai.uc_light");
		case "human_focus": return e("settings.novelai.uc_human_focus");
		case "furry_focus": return e("settings.novelai.uc_furry_focus");
		case "none": return e("settings.novelai.uc_none");
	}
}
function Pe(e, t) {
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
//#region src/ui/views/settings/NovelAiSettings.vue
var Fe = /* @__PURE__ */ P({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let o = e, { t: l, d: u } = D(), d = O(() => {
			let e = o.profile.model_id;
			return e != null && a(e) !== null ? e : W;
		});
		function f() {
			if (o.profile.novelai_defaults !== null) return o.profile.novelai_defaults;
			let e = U(d.value);
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
		let h = C(f());
		_(() => o.profile.id, () => {
			h.value = f();
		});
		function v(e) {
			h.value = {
				...h.value,
				...e
			};
		}
		let b = O(() => s.safeParse(h.value).success ? null : l("settings.novelai.invalid_size")), x = O(() => {
			let e = a(d.value);
			return e === null ? [] : c(e.profile, h.value);
		}), A = C(null), N = C(null), P = C(!1);
		async function I() {
			P.value = !0, N.value = null;
			try {
				A.value = await o.controller.load_novelai_account();
			} catch (e) {
				N.value = e instanceof Error ? e.message : String(e);
			} finally {
				P.value = !1;
			}
		}
		let L = C([]);
		p(async () => {
			try {
				L.value = (await o.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				L.value = [];
			}
		});
		let z = O(() => L.value.map((e) => ({
			value: e.profile.model_id,
			label: e.profile.display_name
		})));
		async function V(e) {
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
		let H = i.options.map((e) => ({
			value: e,
			label: Ae[e]
		})), q = r.options.map((e) => ({
			value: e,
			label: je[e]
		})), ee = O(() => t.options.map((e) => ({
			value: e,
			label: Me(l, e)
		}))), te = O(() => n.options.map((e) => ({
			value: e,
			label: Ne(l, e)
		})));
		function Y(e, t, n) {
			t.includes(n) && v({ [e]: n });
		}
		let X = O(() => o.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function Q(e, t) {
			let n = h.value.vibe_asset_ids.filter((t) => t !== e);
			v({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let $ = C("idle");
		async function ne() {
			$.value = "saving";
			try {
				await o.controller.save_novelai_defaults(o.profile.id, h.value), $.value = "saved";
			} catch {
				$.value = "failed";
			}
		}
		return (a, o) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "novelai-settings"
		}, [E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(l)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), E("div", { class: M(S(Z).form_grid) }, [
			E("div", { class: M(S(Z).actions_row) }, [F(R, {
				label: S(l)("settings.novelai.refresh_account"),
				pending: P.value,
				onClick: I
			}, null, 8, ["label", "pending"]), A.value === null ? N.value === null ? w("", !0) : (g(), y("span", {
				key: 1,
				class: M(S(Z).status_text)
			}, k(N.value), 3)) : (g(), y("span", {
				key: 0,
				class: M(S(Z).status_text),
				"data-testid": "novelai-account"
			}, k(S(l)("settings.novelai.account_summary", {
				tier: A.value.tier,
				anlas: A.value.anlas,
				expires: S(u)(new Date(A.value.expires_at), "short_date")
			})), 3))], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.model_label")), 3), F(G, {
				"model-value": d.value,
				options: z.value,
				placeholder: d.value,
				"aria-label": S(l)("settings.novelai.model_label"),
				"onUpdate:modelValue": o[0] ||= (e) => void V(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.width_label")), 3), F(K, {
				"model-value": h.value.width,
				label: S(l)("settings.novelai.width_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": S(l)("common.actions.increase"),
				"decrement-label": S(l)("common.actions.decrease"),
				"onUpdate:modelValue": o[1] ||= (e) => v({ width: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.height_label")), 3), F(K, {
				"model-value": h.value.height,
				label: S(l)("settings.novelai.height_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": S(l)("common.actions.increase"),
				"decrement-label": S(l)("common.actions.decrease"),
				"onUpdate:modelValue": o[2] ||= (e) => v({ height: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.steps_label")), 3), F(K, {
				"model-value": h.value.steps,
				label: S(l)("settings.novelai.steps_label"),
				min: 1,
				max: 50,
				"increment-label": S(l)("common.actions.increase"),
				"decrement-label": S(l)("common.actions.decrease"),
				"onUpdate:modelValue": o[3] ||= (e) => v({ steps: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.scale_label")), 3), F(K, {
				"model-value": h.value.scale,
				label: S(l)("settings.novelai.scale_label"),
				min: 0,
				max: 10,
				step: .1,
				"increment-label": S(l)("common.actions.increase"),
				"decrement-label": S(l)("common.actions.decrease"),
				"onUpdate:modelValue": o[4] ||= (e) => v({ scale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.cfg_rescale_label")), 3), F(K, {
				"model-value": h.value.cfg_rescale,
				label: S(l)("settings.novelai.cfg_rescale_label"),
				min: 0,
				max: 1,
				step: .02,
				"increment-label": S(l)("common.actions.increase"),
				"decrement-label": S(l)("common.actions.decrease"),
				"onUpdate:modelValue": o[5] ||= (e) => v({ cfg_rescale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.sampler_label")), 3), F(G, {
				"model-value": h.value.sampler,
				options: S(H),
				placeholder: S(l)("settings.novelai.sampler_label"),
				"aria-label": S(l)("settings.novelai.sampler_label"),
				"onUpdate:modelValue": o[6] ||= (e) => Y("sampler", S(i).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.noise_schedule_label")), 3), F(G, {
				"model-value": h.value.noise_schedule,
				options: S(q),
				placeholder: S(l)("settings.novelai.noise_schedule_label"),
				"aria-label": S(l)("settings.novelai.noise_schedule_label"),
				"onUpdate:modelValue": o[7] ||= (e) => Y("noise_schedule", S(r).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.quality_label")), 3), F(G, {
				"model-value": h.value.quality_preset,
				options: ee.value,
				placeholder: S(l)("settings.novelai.quality_label"),
				"aria-label": S(l)("settings.novelai.quality_label"),
				"onUpdate:modelValue": o[8] ||= (e) => Y("quality_preset", S(t).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(l)("settings.novelai.uc_label")), 3), F(G, {
				"model-value": h.value.undesired_content_preset,
				options: te.value,
				placeholder: S(l)("settings.novelai.uc_label"),
				"aria-label": S(l)("settings.novelai.uc_label"),
				"onUpdate:modelValue": o[9] ||= (e) => Y("undesired_content_preset", S(n).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			F(J, {
				"model-value": h.value.smea,
				label: S(l)("settings.novelai.smea_label"),
				"onUpdate:modelValue": o[10] ||= (e) => v({ smea: e })
			}, null, 8, ["model-value", "label"]),
			F(J, {
				"model-value": h.value.dyn,
				label: S(l)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": o[11] ||= (e) => v({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			F(J, {
				"model-value": h.value.variety_plus,
				label: S(l)("settings.novelai.variety_label"),
				"onUpdate:modelValue": o[12] ||= (e) => v({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			E("h3", { class: M(S(Z).section_title) }, k(S(l)("settings.novelai.vibes_title")), 3),
			X.value.length === 0 ? (g(), y("p", {
				key: 0,
				class: M(S(Z).description)
			}, k(S(l)("settings.novelai.vibes_empty")), 3)) : w("", !0),
			(g(!0), y(j, null, m(X.value, (e) => (g(), T(B, {
				key: e.id,
				"model-value": h.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => Q(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			x.value.length > 0 ? (g(), y("div", {
				key: 1,
				class: M(S(Z).risk_banner),
				"data-testid": "novelai-ignored"
			}, [E("p", { class: M(S(Z).risk_banner_title) }, k(S(l)("settings.novelai.ignored_title")), 3), (g(!0), y(j, null, m(x.value, (e) => (g(), y("p", {
				key: e,
				class: M(S(Z).risk_banner_description)
			}, k(S(Pe)(S(l), e)), 3))), 128))], 2)) : w("", !0),
			b.value === null ? w("", !0) : (g(), y("p", {
				key: 2,
				class: M(S(Z).status_text),
				role: "alert"
			}, k(b.value), 3)),
			E("div", { class: M(S(Z).actions_row) }, [F(R, {
				label: S(l)("settings.novelai.save"),
				variant: "primary",
				pending: $.value === "saving",
				disabled: b.value !== null,
				onClick: ne
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), E("span", {
				class: M(S(Z).status_text),
				role: "status"
			}, k($.value === "saved" ? S(l)("settings.novelai.saved") : $.value === "failed" ? S(l)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Ie = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Le(e, t) {
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
var Re = ["id", "aria-describedby"], ze = ["id", "aria-describedby"], Be = ["id", "aria-describedby"], Ve = ["id", "aria-describedby"], He = /* @__PURE__ */ P({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		controller: {}
	},
	setup(t) {
		let n = t, { t: r } = D(), i = C(!1), a = C(null), o = C(!1), s = C(null), c = C(null), l = C(!1), u = C(null), d = C(""), f = C(!1), p = C(null), _ = C(/* @__PURE__ */ new Map()), x = Ie.map((e) => ({
			value: e,
			label: Le(r, e)
		})), A = O({
			get: () => a.value?.provider_id ?? "sd_webui",
			set: (e) => {
				a.value && (a.value.provider_id = e, a.value.workflow_id = "");
			}
		});
		function N() {
			a.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				model_id: "",
				workflow_id: "",
				is_default: n.profiles.length === 0
			}, s.value = null, i.value = !0;
		}
		function P(e) {
			a.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				is_default: e.is_default
			}, s.value = null, i.value = !0;
		}
		function I() {
			i.value = !1, a.value = null, s.value = null;
		}
		async function L() {
			let t = a.value;
			if (!t || o.value) return;
			let i = t.display_name.trim(), c = t.model_id.trim(), l = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (i.length === 0 || c.length === 0 || t.provider_id === "comfyui" && l?.success !== !0) {
				s.value = r("errors.validation_required");
				return;
			}
			o.value = !0, s.value = null;
			try {
				await n.controller.save_provider_profile({
					id: t.id,
					provider_id: t.provider_id,
					display_name: i,
					model_id: c,
					workflow_id: t.provider_id === "comfyui" && l?.success === !0 ? l.data : null,
					is_default: t.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}), I();
			} catch {
				s.value = r("errors.unexpected");
			} finally {
				o.value = !1;
			}
		}
		function B(e) {
			c.value = e;
		}
		async function U() {
			let e = c.value;
			if (!(!e || l.value)) {
				l.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), c.value = null;
				} finally {
					l.value = !1;
				}
			}
		}
		function W(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function K(e) {
			u.value = e, d.value = "", p.value = null;
		}
		function q() {
			u.value = null, d.value = "", p.value = null;
		}
		async function te() {
			let e = u.value;
			if (!(!e || f.value)) {
				if (d.value.trim().length === 0) {
					p.value = r("errors.validation_required");
					return;
				}
				f.value = !0, p.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, d.value), q();
				} catch {
					p.value = r("settings.credential_storage.unlock_required");
				} finally {
					f.value = !1, d.value = "";
				}
			}
		}
		async function Y(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				u.value = e, d.value = "", p.value = r("settings.credential_storage.unlock_required");
			}
		}
		async function X(e) {
			_.value.set(e.id, {
				pending: !0,
				label: null
			}), _.value = new Map(_.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), i = t.status === "success" ? `${r("status.success")} · ${r("diagnostics.connection_tests.latency_label", { ms: t.latency_ms })}` : r("errors.connection_test_failed", { code: t.error.code });
				_.value.set(e.id, {
					pending: !1,
					label: i
				});
			} catch {
				_.value.set(e.id, {
					pending: !1,
					label: r("errors.unexpected")
				});
			}
			_.value = new Map(_.value);
		}
		return (e, n) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "provider-profiles"
		}, [
			E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(r)("settings.sections.provider_profiles")), 3), F(R, {
				label: S(r)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: N
			}, null, 8, ["label", "variant"])], 2),
			F(z, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": S(r)("settings.provider_profiles.empty_description")
			}, {
				default: v(() => [E("div", null, [(g(!0), y(j, null, m(t.profiles, (e) => (g(), y("div", {
					key: e.id,
					class: M(S(Z).profile_row),
					"data-testid": "provider-profile-row"
				}, [E("div", { class: M(S(Z).profile_identity) }, [
					E("span", { class: M(S(Z).profile_name) }, k(e.display_name), 3),
					E("span", { class: M(S(Z).profile_meta) }, k(S(Le)(S(r), e.provider_id)), 3),
					W(e.provider_id) ? (g(), y("span", {
						key: 0,
						class: M(S(Z).profile_meta)
					}, k(e.credential_reference ? S(r)("settings.provider_profiles.credential_set") : S(r)("settings.provider_profiles.credential_unset")), 3)) : w("", !0),
					_.value.get(e.id)?.label ? (g(), y("span", {
						key: 1,
						class: M(S(Z).profile_meta),
						"data-testid": "profile-test-result"
					}, k(_.value.get(e.id)?.label), 3)) : w("", !0)
				], 2), E("div", { class: M(S(Z).profile_actions) }, [
					e.is_default ? (g(), y("span", {
						key: 0,
						class: M(S(Z).badge)
					}, k(S(r)("settings.provider_profiles.default_badge")), 3)) : w("", !0),
					F(R, {
						label: S(r)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: _.value.get(e.id)?.pending === !0,
						onClick: (t) => X(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					W(e.provider_id) ? (g(), T(R, {
						key: 1,
						label: S(r)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => K(e)
					}, null, 8, ["label", "onClick"])) : w("", !0),
					W(e.provider_id) && e.credential_reference !== null ? (g(), T(R, {
						key: 2,
						label: S(r)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => Y(e)
					}, null, 8, ["label", "onClick"])) : w("", !0),
					F(R, {
						label: S(r)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => P(e)
					}, null, 8, ["label", "onClick"]),
					F(R, {
						label: S(r)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => B(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			F(V, {
				open: i.value,
				title: a.value?.is_new ? S(r)("settings.provider_profiles.dialog_add_title") : S(r)("settings.provider_profiles.dialog_edit_title"),
				"close-label": S(r)("common.actions.close"),
				"onUpdate:open": n[5] ||= (e) => !e && I()
			}, {
				default: v(() => [a.value ? (g(), y("div", {
					key: 0,
					class: M(S(Z).form_grid)
				}, [
					F(H, {
						label: S(r)("common.labels.name"),
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => a.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: M(S(Z).text_input)
						}, null, 10, Re), [[b, a.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					F(H, {
						label: S(r)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: v(({ fieldId: e }) => [F(G, {
							id: e,
							modelValue: A.value,
							"onUpdate:modelValue": n[1] ||= (e) => A.value = e,
							options: S(x),
							placeholder: S(r)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					F(H, {
						label: S(r)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
							id: e,
							"onUpdate:modelValue": n[2] ||= (e) => a.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: M(S(Z).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, ze), [[b, a.value.model_id]])]),
						_: 1
					}, 8, ["label"]),
					a.value.provider_id === "comfyui" ? (g(), T(H, {
						key: 0,
						label: S(r)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => a.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: M(S(Z).text_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, Be), [[b, a.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : w("", !0),
					F(J, {
						modelValue: a.value.is_default,
						"onUpdate:modelValue": n[4] ||= (e) => a.value.is_default = e,
						label: S(r)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					s.value ? (g(), y("p", {
						key: 1,
						class: M([S(Z).status_text, S(Z).description]),
						"data-tone": "error"
					}, k(s.value), 3)) : w("", !0),
					E("div", { class: M(S(Z).actions_row) }, [F(R, {
						label: S(r)("common.actions.save"),
						pending: o.value,
						onClick: L
					}, null, 8, ["label", "pending"]), F(R, {
						label: S(r)("common.actions.cancel"),
						variant: "secondary",
						onClick: I
					}, null, 8, ["label"])], 2)
				], 2)) : w("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			F(V, {
				open: u.value !== null,
				title: S(r)("settings.provider_profiles.credential_dialog_title", { name: u.value?.display_name ?? "" }),
				description: S(r)("settings.provider_profiles.credential_dialog_description"),
				"close-label": S(r)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && q()
			}, {
				default: v(() => [E("div", { class: M(S(Z).form_grid) }, [F(H, {
					label: S(r)("settings.provider_profiles.credential_label"),
					error: p.value,
					required: ""
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
						id: e,
						"onUpdate:modelValue": n[6] ||= (e) => d.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: M(S(Z).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, Ve), [[b, d.value]])]),
					_: 1
				}, 8, ["label", "error"]), E("div", { class: M(S(Z).actions_row) }, [F(R, {
					label: S(r)("common.actions.save"),
					pending: f.value,
					onClick: te
				}, null, 8, ["label", "pending"]), F(R, {
					label: S(r)("common.actions.cancel"),
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
			F(ee, {
				open: c.value !== null,
				title: S(r)("settings.provider_profiles.remove_confirm_title", { name: c.value?.display_name ?? "" }),
				description: S(r)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": S(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": S(r)("confirmations.destructive.default_cancel_action"),
				pending: l.value,
				"onUpdate:open": n[8] ||= (e) => !e && (c.value = null),
				onConfirm: U
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
}), Ue = ["id", "aria-describedby"], We = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], Ge = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], Ke = 200, qe = /* @__PURE__ */ P({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = O(() => t.settings?.translation ?? null);
		function i(e) {
			let n = r.value;
			return n === null ? Promise.resolve() : t.controller.update_settings({ translation: {
				...n,
				...e
			} });
		}
		let a = O(() => [{
			value: "free",
			label: n("settings.translation.endpoint_free")
		}, {
			value: "pro",
			label: n("settings.translation.endpoint_pro")
		}]);
		function o(e) {
			(e === "free" || e === "pro") && i({ deepl_endpoint: e });
		}
		let s = C(""), c = C("idle");
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
		let d = O(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), f = C([]);
		_(() => r.value?.glossary, (e) => {
			f.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function p() {
			f.value.length < Ke && f.value.push({
				source: "",
				target: ""
			});
		}
		function x(e) {
			f.value.splice(e, 1);
		}
		function w() {
			i({ glossary: f.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (g(), y("div", {
			class: M(S(Z).section),
			"data-testid": "translation-settings"
		}, [E("div", { class: M(S(Z).section_header) }, [E("h2", { class: M(S(Z).section_title) }, k(S(n)("settings.nav.translation")), 3)], 2), E("div", { class: M(S(Z).form_grid) }, [
			E("p", { class: M(S(Z).description) }, k(S(n)("settings.translation.description")), 3),
			F(H, {
				label: S(n)("settings.translation.key_label"),
				hint: S(n)("settings.translation.key_hint")
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [h(E("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: M(S(Z).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, Ue), [[b, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			E("div", { class: M(S(Z).actions_row) }, [
				F(R, {
					label: S(n)("settings.translation.key_save"),
					variant: "primary",
					pending: c.value === "saving",
					disabled: s.value.trim() === "",
					onClick: l
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				F(R, {
					label: S(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				E("span", {
					class: M(S(Z).status_text),
					role: "status"
				}, k(d.value), 3)
			], 2),
			E("div", { class: M(S(Z).row) }, [E("span", { class: M(S(Z).row_label) }, k(S(n)("settings.translation.endpoint_label")), 3), F(q, {
				"model-value": r.value?.deepl_endpoint ?? "free",
				options: a.value,
				label: S(n)("settings.translation.endpoint_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			E("h3", { class: M(S(Z).section_title) }, k(S(n)("settings.translation.glossary_title")), 3),
			E("p", { class: M(S(Z).description) }, k(S(n)("settings.translation.glossary_description")), 3),
			(g(!0), y(j, null, m(f.value, (e, t) => (g(), y("div", {
				key: t,
				class: M(S(Z).actions_row),
				"data-testid": "glossary-row"
			}, [
				h(E("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": S(n)("settings.translation.glossary_source"),
					placeholder: S(n)("settings.translation.glossary_source"),
					class: M(S(Z).text_input)
				}, null, 10, We), [[b, e.source]]),
				h(E("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": S(n)("settings.translation.glossary_target"),
					placeholder: S(n)("settings.translation.glossary_target"),
					class: M(S(Z).text_input)
				}, null, 10, Ge), [[b, e.target]]),
				F(R, {
					label: S(n)("settings.translation.glossary_remove"),
					onClick: (e) => x(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			E("div", { class: M(S(Z).actions_row) }, [F(R, {
				label: S(n)("settings.translation.glossary_add"),
				disabled: f.value.length >= Ke,
				onClick: p
			}, null, 8, ["label", "disabled"]), F(R, {
				label: S(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: w
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), Je = ["aria-label"], Ye = [
	"data-selected",
	"aria-current",
	"onClick"
], Xe = { class: "tc-visually-hidden" }, Ze = /* @__PURE__ */ P({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = x(() => import("./PromptView-Bgh22nYB.js")), n = x(() => import("./AssetsView-1FKtSc_X.js")), r = x(() => import("./DiagnosticsView-BiAE6t4M.js")), i = e, { t: a } = D(), o = [
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
		let c = O(() => i.state.settings_section), l = O(() => i.state.generation.profiles.find((e) => e.id === i.state.generation.active_profile_id && e.provider_id === "novelai") ?? null);
		function u(e, t) {
			return i.controller.test_prompt_regex(e, t);
		}
		return (i, d) => (g(), y("div", {
			class: M(S(Z).layout),
			"data-testid": "settings-view"
		}, [E("nav", {
			class: M(S(Z).section_nav),
			"aria-label": S(a)("nav.settings")
		}, [(g(), y(j, null, m(o, (t) => E("button", {
			key: t,
			type: "button",
			class: M(["tc-interactive", S(Z).section_nav_item]),
			"data-selected": t === c.value,
			"aria-current": t === c.value ? "page" : void 0,
			onClick: (n) => e.controller.set_settings_section(t)
		}, k(s(t)), 11, Ye)), 64))], 10, Je), E("div", { class: M(S(Z).section_content) }, [c.value === "prompts" ? (g(), T(S(t), {
			key: 0,
			state: e.state,
			"test-regex": u,
			onSelectPreset: d[0] ||= (t) => void e.controller.select_prompt_preset(t),
			onNewPreset: d[1] ||= (t) => e.controller.start_new_prompt_preset(),
			onBulkDeletePresets: d[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
			onUpdateDraft: d[3] ||= (t) => e.controller.update_prompt_draft(t),
			onSave: d[4] ||= (t) => void e.controller.save_prompt_preset(t)
		}, null, 8, ["state"])) : c.value === "library" ? (g(), T(S(n), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : c.value === "diagnostics" ? (g(), T(S(r), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (g(), y("div", {
			key: 3,
			class: M(S(Z).view)
		}, [E("h1", Xe, k(s(c.value)), 1), c.value === "illustration" ? (g(), T(Se, {
			key: 0,
			settings: e.state.settings.settings,
			"prompt-presets": e.state.prompt.presets,
			controller: e.controller
		}, null, 8, [
			"settings",
			"prompt-presets",
			"controller"
		])) : c.value === "providers" ? (g(), y(j, { key: 1 }, [
			e.state.generation.profiles.length === 0 ? (g(), y("section", {
				key: 0,
				class: M(S(Z).onboarding),
				"data-testid": "settings-onboarding",
				"aria-labelledby": "settings-onboarding-title"
			}, [E("div", {
				class: M(S(Z).onboarding_icon),
				"aria-hidden": "true"
			}, [F(L, {
				icon: S(te),
				size: 22
			}, null, 8, ["icon"])], 2), E("div", null, [
				E("p", { class: M(S(Z).onboarding_label) }, k(S(a)("settings.onboarding.label")), 3),
				E("h2", {
					id: "settings-onboarding-title",
					class: M(S(Z).onboarding_title)
				}, k(S(a)("settings.onboarding.title")), 3),
				E("p", { class: M(S(Z).onboarding_description) }, k(S(a)("settings.onboarding.description")), 3)
			])], 2)) : w("", !0),
			F(He, {
				profiles: e.state.generation.profiles,
				controller: e.controller
			}, null, 8, ["profiles", "controller"]),
			l.value === null ? w("", !0) : (g(), T(Fe, {
				key: 1,
				profile: l.value,
				vibes: e.state.assets.records.vibe,
				controller: e.controller
			}, null, 8, [
				"profile",
				"vibes",
				"controller"
			]))
		], 64)) : c.value === "translation" ? (g(), T(qe, {
			key: 2,
			settings: e.state.settings.settings,
			controller: e.controller
		}, null, 8, ["settings", "controller"])) : c.value === "connections" ? (g(), y(j, { key: 3 }, [F(ke, {
			connections: e.state.llm_connections.connections,
			loading: e.state.loading.has("llm_connections"),
			controller: e.controller
		}, null, 8, [
			"connections",
			"loading",
			"controller"
		]), F(pe, {
			settings: e.state.settings.settings,
			"connection-test-command": e.state.diagnostics.connection_test_command,
			controller: e.controller
		}, null, 8, [
			"settings",
			"connection-test-command",
			"controller"
		])], 64)) : c.value === "general" ? (g(), y(j, { key: 4 }, [
			F(Q, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			F(ae, {
				settings: e.state.settings.settings,
				"vault-status": e.state.settings.browser_secret_vault,
				controller: e.controller
			}, null, 8, [
				"settings",
				"vault-status",
				"controller"
			]),
			F(ce, {
				"vocabulary-update-channel": e.state.settings.vocabulary_update_channel,
				controller: e.controller
			}, null, 8, ["vocabulary-update-channel", "controller"])
		], 64)) : w("", !0)], 2))], 2)], 2));
	}
});
//#endregion
export { Ze as default };
