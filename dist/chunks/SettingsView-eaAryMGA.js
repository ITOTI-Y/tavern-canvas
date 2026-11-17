import { a as e } from "./ids-pPJWL4BL.js";
import { i as t, o as n } from "./novelai-CAMu2SDf.js";
import { i as r, t as i } from "./novelai_models-CXz0Nwhv.js";
import { a, i as o, o as s, r as c, t as l } from "./server_inspection-BTxqOeen.js";
import { n as u } from "./settings-Dljuq0-Y.js";
import { F as d, J as f, L as p, M as m, T as h, W as g, _, a as v, b as y, dt as b, g as x, gt as S, h as C, m as w, n as ee, p as T, pt as E, q as D, rt as O, s as k, u as A, v as j, x as M, y as N } from "./vue-i18n-XoxYzLIP.js";
import { t as P } from "./portal_keys-CIBE-_PC.js";
import { n as F, t as I } from "./AppIcon-DD754F_c.js";
import { n as L, r as R, t as z } from "./PromptTagChips-C_ulfUkh.js";
import { t as B } from "./AppSelect-D9W90Q5V.js";
import { a as te, i as V, n as H, t as U } from "./ImageSizeField-C2fv9RrU.js";
import { t as ne } from "./AppCheckbox-BVvntDyn.js";
import { t as W } from "./FieldGroup-B_IY3tpe.js";
import { n as G, t as K } from "./workflow_target_label-qdBfYfiW.js";
import { t as re } from "./sparkles-DIwEk888.js";
import "./browser_secret_vault-Cl9sZA7g.js";
import { b as ie, d as ae, n as q } from "./workflow_mapping-BBTT75pE.js";
import { n as oe, t as se } from "./novelai_request_defaults-DmJSc0ed.js";
import { t as ce } from "./catalog_url-B1GMOf5E.js";
import { n as J, t as Y } from "./NumberStepper-BMomgGCv.js";
import { t as le } from "./ToastViewport-DmwVzyoR.js";
import { t as ue } from "./ConfirmDialog-CbzfGSo1.js";
import { t as de } from "./TagInput-BIrlsKBu.js";
import { t as fe } from "./AppSwitch-BT0FcNgF.js";
import { n as X, t as pe } from "./StateSurface-BclMzzSh.js";
import { t as me } from "./AppDialog-BpBOf7Tt.js";
import { t as he } from "./use_toasts-BkstxFb0.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var ge = F("cable", [
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
]), _e = F("sliders-horizontal", [
	["path", {
		d: "M10 5H3",
		key: "1qgfaw"
	}],
	["path", {
		d: "M12 19H3",
		key: "yhmn1j"
	}],
	["path", {
		d: "M14 3v4",
		key: "1sua03"
	}],
	["path", {
		d: "M16 17v4",
		key: "1q0r14"
	}],
	["path", {
		d: "M21 12h-9",
		key: "1o4lsq"
	}],
	["path", {
		d: "M21 19h-5",
		key: "1rlt1p"
	}],
	["path", {
		d: "M21 5h-7",
		key: "1oszz2"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M8 12H3",
		key: "a7s4jb"
	}]
]), ve = /* @__PURE__ */ M({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = {
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
		let a = T(() => [
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
		]), o = T(() => [
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
		return (t, r) => (d(), _("div", {
			class: E(b(H).section),
			"data-testid": "appearance-settings"
		}, [w("div", { class: E(b(H).section_header) }, [w("h2", { class: E(b(H).section_title) }, S(b(n)("settings.sections.appearance")), 3)], 2), w("div", { class: E(b(H).form_grid) }, [
			w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.appearance.theme_label")), 3), N(J, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: b(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.appearance.language_label")), 3), N(J, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: b(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.appearance.inspector_width_label")), 3), N(Y, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: b(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": b(n)("common.actions.increase"),
				"decrement-label": b(n)("common.actions.decrease"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			N(fe, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: b(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), ye = ["data-tone"], Z = ["id", "aria-describedby"], be = ["id", "aria-describedby"], Q = ["id", "aria-describedby"], $ = /* @__PURE__ */ M({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = O(""), i = O(""), a = O(!1), o = O(null), s = O(!1), c = T(() => [
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
		]), l = T({
			get: () => t.settings?.credential_storage_mode ?? "browser_device",
			set: (e) => {
				o.value = null, t.controller.update_settings({ credential_storage_mode: e }).catch(() => {
					o.value = n("errors.unexpected");
				});
			}
		}), u = T(() => {
			let e = { count: t.vaultStatus.secret_count };
			switch (t.vaultStatus.state) {
				case "unavailable": return n("settings.credential_storage.states.unavailable", e);
				case "error": return n("settings.credential_storage.states.error", e);
				case "uninitialized": return n("settings.credential_storage.states.uninitialized", e);
				case "locked": return n("settings.credential_storage.states.locked", e);
				case "unlocked": return n("settings.credential_storage.states.unlocked", e);
			}
		}), p = T(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function m() {
			r.value = "", i.value = "";
		}
		function h(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function g(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function y() {
			if (!(a.value || !h(!0))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.initialize_browser_secret_vault(r.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), m();
				} catch (e) {
					o.value = g(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function C() {
			if (!(a.value || !h(!1))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.unlock_browser_secret_vault(r.value), m();
				} catch (e) {
					o.value = g(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function j() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.lock_browser_secret_vault(), m();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		async function M() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.reset_browser_secret_vault(), s.value = !1, m();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		return (t, m) => (d(), _("div", {
			class: E(b(H).section),
			"data-testid": "credential-storage-settings"
		}, [
			w("div", { class: E(b(H).section_header) }, [w("h2", { class: E(b(H).section_title) }, S(b(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (d(), _("span", {
				key: 0,
				class: E(b(H).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, S(u.value), 11, ye)) : x("", !0)], 2),
			w("div", { class: E(b(H).vault_mode_row) }, [w("div", { class: E(b(H).profile_identity) }, [w("span", { class: E(b(H).profile_name) }, S(b(n)("settings.credential_storage.mode_label")), 3), w("span", { class: E(b(H).profile_meta) }, S(b(n)("settings.credential_storage.mode_hint")), 3)], 2), N(J, {
				modelValue: l.value,
				"onUpdate:modelValue": m[0] ||= (e) => l.value = e,
				options: c.value,
				label: b(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (d(), _("div", {
				key: 0,
				class: E(b(H).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (d(), _("p", {
				key: 0,
				class: E(b(H).status_text),
				"data-tone": "error",
				role: "alert"
			}, S(p.value), 3)) : e.vaultStatus.state === "uninitialized" ? (d(), _(A, { key: 1 }, [
				N(W, {
					label: b(n)("settings.credential_storage.passphrase_label"),
					hint: b(n)("settings.credential_storage.passphrase_hint", { count: b(12) }),
					required: ""
				}, {
					default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": m[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: E(b(H).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, Z), [[v, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				N(W, {
					label: b(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": m[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: E(b(H).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, be), [[v, i.value]])]),
					_: 1
				}, 8, ["label"]),
				N(X, {
					label: b(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: y
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (d(), _(A, { key: 2 }, [N(W, {
				label: b(n)("settings.credential_storage.passphrase_label"),
				hint: b(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
					id: e,
					"onUpdate:modelValue": m[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: E(b(H).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: k(C, ["enter"])
				}, null, 42, Q), [[v, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), N(X, {
				label: b(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: C
			}, null, 8, ["label", "pending"])], 64)) : (d(), _("div", {
				key: 3,
				class: E(b(H).vault_unlocked_actions)
			}, [N(X, {
				label: b(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: j
			}, null, 8, ["label", "pending"]), N(X, {
				label: b(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: m[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (d(), _("p", {
				key: 4,
				class: E(b(H).status_text),
				"data-tone": "error",
				role: "alert"
			}, S(o.value), 3)) : x("", !0)], 2)) : x("", !0),
			N(ue, {
				open: s.value,
				title: b(n)("settings.credential_storage.reset_confirm_title"),
				description: b(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": b(n)("settings.credential_storage.reset_action"),
				"cancel-label": b(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": m[5] ||= (e) => s.value = e,
				onConfirm: M
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
}), xe = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Se = ["id", "aria-describedby"], Ce = ["aria-label"], we = ["aria-label"], Te = /* @__PURE__ */ M({
	__name: "DataSettings",
	props: {
		remote: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = O(""), i = O(!1);
		g(() => t.remote?.catalog_url, (e) => {
			r.value = e ?? "";
		}, { immediate: !0 });
		async function a() {
			let e = t.remote, n = ce(r.value);
			i.value = n === null, e !== null && n !== null && (r.value = n, n !== e.catalog_url && await t.controller.update_settings({ vocabulary_remote: {
				...e,
				catalog_url: n
			} }));
		}
		let o = O(""), s = O("idle");
		async function c() {
			let e = o.value.trim();
			if (e !== "") {
				s.value = "saving";
				try {
					await t.controller.set_vocabulary_token(e), o.value = "", s.value = "idle";
				} catch {
					s.value = "failed";
				}
			}
		}
		async function l() {
			s.value = "saving";
			try {
				await t.controller.clear_vocabulary_token(), s.value = "idle";
			} catch {
				s.value = "failed";
			}
		}
		let u = T(() => s.value === "failed" ? n("settings.data.vocabulary_token_failed") : t.remote?.token_saved === !0 ? n("settings.data.vocabulary_token_present") : n("settings.data.vocabulary_token_absent")), p = O(!1), m = O(!1), h = O(null), y = O(null), k = O(null);
		function A() {
			k.value?.click();
		}
		function j() {
			t.controller.cancel_vocabulary_import();
		}
		async function M(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || p.value)) {
				p.value = !0, m.value = !1, h.value = null, y.value = null;
				try {
					await t.controller.import_vocabulary_package(i, (e) => {
						y.value = e;
					}), m.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					h.value = n("settings.data.vocabulary_import_error", { code: t });
				} finally {
					p.value = !1;
				}
			}
		}
		let P = T(() => {
			let e = y.value;
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
		}), F = O(!1), I = O(null);
		async function L() {
			if (!F.value) {
				F.value = !0, I.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "inkwell-archive.zip", r.click(), URL.revokeObjectURL(n);
				} catch {
					I.value = n("errors.unexpected");
				} finally {
					F.value = !1;
				}
			}
		}
		let R = O(!1), z = O(null), B = O(null);
		function te() {
			B.value?.click();
		}
		async function V(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || R.value)) {
				R.value = !0, z.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					z.value = n("errors.unexpected");
				} finally {
					R.value = !1;
				}
			}
		}
		return (t, g) => (d(), _("div", {
			class: E(b(H).section),
			"data-testid": "data-settings"
		}, [w("div", { class: E(b(H).section_header) }, [w("h2", { class: E(b(H).section_title) }, S(b(n)("settings.sections.data")), 3)], 2), w("div", { class: E(b(H).form_grid) }, [
			N(W, {
				label: b(n)("settings.data.vocabulary_catalog_label"),
				hint: b(n)("settings.data.vocabulary_catalog_hint")
			}, {
				default: D(({ fieldId: t, describedBy: i }) => [f(w("input", {
					id: t,
					"onUpdate:modelValue": g[0] ||= (e) => r.value = e,
					type: "url",
					autocomplete: "off",
					spellcheck: "false",
					placeholder: b(n)("settings.data.vocabulary_catalog_placeholder"),
					"aria-describedby": i,
					class: E(b(H).text_input),
					disabled: e.remote === null,
					"data-testid": "vocabulary-catalog-input",
					onChange: a
				}, null, 42, xe), [[v, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			i.value ? (d(), _("p", {
				key: 0,
				class: E([b(H).status_text, b(H).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-catalog-invalid"
			}, S(b(n)("settings.data.vocabulary_catalog_invalid")), 3)) : x("", !0),
			N(W, {
				label: b(n)("settings.data.vocabulary_token_label"),
				hint: b(n)("settings.data.vocabulary_token_hint")
			}, {
				default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
					id: e,
					"onUpdate:modelValue": g[1] ||= (e) => o.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: E(b(H).text_input),
					"data-testid": "vocabulary-token-input"
				}, null, 10, Se), [[v, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			w("div", { class: E(b(H).actions_row) }, [
				N(X, {
					label: b(n)("settings.data.vocabulary_token_save"),
					variant: "primary",
					pending: s.value === "saving",
					disabled: o.value.trim() === "",
					onClick: c
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				e.remote?.token_saved === !0 ? (d(), C(X, {
					key: 0,
					label: b(n)("settings.data.vocabulary_token_clear"),
					onClick: l
				}, null, 8, ["label"])) : x("", !0),
				w("span", {
					class: E(b(H).status_text),
					role: "status"
				}, S(u.value), 3)
			], 2),
			w("div", { class: E(b(H).actions_row) }, [
				N(X, {
					label: b(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: p.value,
					onClick: A
				}, null, 8, ["label", "pending"]),
				p.value ? (d(), C(X, {
					key: 0,
					label: b(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: j
				}, null, 8, ["label"])) : x("", !0),
				w("input", {
					ref_key: "vocabulary_file_input",
					ref: k,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": b(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: M
				}, null, 40, Ce)
			], 2),
			w("p", { class: E(b(H).description) }, S(b(n)("settings.data.vocabulary_import.description")), 3),
			P.value ? (d(), _("p", {
				key: 1,
				class: E([b(H).status_text, b(H).description]),
				"data-testid": "vocabulary-import-progress"
			}, S(P.value), 3)) : x("", !0),
			m.value ? (d(), _("p", {
				key: 2,
				class: E([b(H).status_text, b(H).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, S(b(n)("settings.data.vocabulary_import.success")), 3)) : x("", !0),
			h.value ? (d(), _("p", {
				key: 3,
				class: E([b(H).status_text, b(H).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, S(h.value), 3)) : x("", !0),
			w("div", { class: E(b(H).actions_row) }, [
				N(X, {
					label: b(n)("settings.data.archive_export_action"),
					pending: F.value,
					onClick: L
				}, null, 8, ["label", "pending"]),
				N(X, {
					label: b(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: R.value,
					onClick: te
				}, null, 8, ["label", "pending"]),
				w("input", {
					ref_key: "file_input",
					ref: B,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": b(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: V
				}, null, 40, we)
			], 2),
			w("p", { class: E(b(H).description) }, S(b(n)("settings.data.archive_import_description")), 3),
			I.value ? (d(), _("p", {
				key: 4,
				class: E([b(H).status_text, b(H).description]),
				"data-tone": "error"
			}, S(I.value), 3)) : x("", !0),
			z.value ? (d(), _("p", {
				key: 5,
				class: E([b(H).status_text, b(H).description]),
				"data-tone": "error"
			}, S(z.value), 3)) : x("", !0)
		], 2)], 2));
	}
}), Ee = ["id"], De = "none", Oe = "default", ke = /* @__PURE__ */ M({
	__name: "SizeSetSettings",
	props: { illustration: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = ee(), a = h(P, O(null)), o = [
			{
				width: 832,
				height: 1216
			},
			{
				width: 1216,
				height: 832
			},
			{
				width: 1024,
				height: 1024
			},
			{
				width: 1344,
				height: 768
			}
		], s = T(() => n.illustration.size_sets), c = T(() => s.value.map((e) => ({
			value: e.id,
			label: e.name
		}))), l = T(() => [{
			value: De,
			label: i("settings.size_sets.none")
		}, ...c.value]), u = T(() => [{
			value: Oe,
			label: i("settings.size_sets.follow_default")
		}, ...l.value]), m = T(() => {
			let e = a.value;
			return e === null || !(e in n.illustration.size_set_by_chat) ? Oe : n.illustration.size_set_by_chat[e] ?? De;
		});
		function y(e) {
			r("update", { size_set_id: e === De ? null : e });
		}
		function k(e) {
			let t = a.value;
			if (t === null) return;
			let i = Object.entries(n.illustration.size_set_by_chat).filter(([e]) => e !== t), o = e === Oe ? i : [...i, [t, e === De ? null : e]];
			r("update", { size_set_by_chat: Object.fromEntries(o.slice(-100)) });
		}
		let j = O(s.value[0]?.id ?? null);
		g(s, (e) => {
			e.some((e) => e.id === j.value) || (j.value = e[0]?.id ?? null);
		});
		let M = T(() => s.value.find((e) => e.id === j.value) ?? null), F = O("");
		g(M, (e) => {
			F.value = e?.name ?? "";
		}, { immediate: !0 });
		function I(e, t = {}) {
			r("update", {
				size_sets: [...e],
				...t
			});
		}
		function L(e) {
			let t = M.value;
			t !== null && I(s.value.map((n) => n.id === t.id ? {
				...n,
				...e
			} : n));
		}
		function R(e) {
			let t = {
				id: crypto.randomUUID(),
				name: e === null ? i("settings.size_sets.new_name", { n: s.value.length + 1 }) : i("settings.size_sets.copy_name", { name: e.name }),
				sizes: (e?.sizes ?? o).map((e) => ({ ...e }))
			};
			j.value = t.id, I([...s.value, t]);
		}
		function z() {
			let e = M.value;
			e !== null && I(s.value.filter((t) => t.id !== e.id), {
				size_set_id: n.illustration.size_set_id === e.id ? null : n.illustration.size_set_id,
				size_set_by_chat: Object.fromEntries(Object.entries(n.illustration.size_set_by_chat).filter(([, t]) => t !== e.id))
			});
		}
		function G() {
			let e = F.value.trim();
			e !== "" && e !== M.value?.name && L({ name: e });
		}
		let K = (e, t) => e.width === t.width && e.height === t.height, re = T(() => {
			let e = (M.value?.sizes ?? []).filter((e) => !V.some((t) => K(t, e)));
			return [...V, ...e];
		});
		function ie(e) {
			let t = `${te(e)} · ${String(e.width)} × ${String(e.height)}`;
			return e.width * e.height > 1048576 ? `${t} · ${i("settings.size_sets.costs_anlas")}` : t;
		}
		function ae(e) {
			return M.value?.sizes.some((t) => K(t, e)) ?? !1;
		}
		function q(e, t) {
			let n = M.value;
			if (n === null) return;
			let r = t ? [...n.sizes, { ...e }] : n.sizes.filter((t) => !K(t, e));
			r.length > 0 && r.length <= 16 && L({ sizes: r });
		}
		let oe = O({
			width: 1344,
			height: 768
		});
		function se() {
			ae(oe.value) || q(oe.value, !0);
		}
		return (t, n) => (d(), _("section", {
			class: E(b(H).section),
			"data-testid": "size-set-settings"
		}, [
			w("h2", { class: E(b(H).section_title) }, S(b(i)("settings.groups.sizes")), 3),
			w("p", { class: E(b(H).description) }, S(b(i)("settings.size_sets.hint")), 3),
			w("div", { class: E(b(H).field_grid) }, [w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(i)("settings.size_sets.default_label")), 3), N(B, {
				"model-value": e.illustration.size_set_id ?? De,
				options: l.value,
				placeholder: b(i)("settings.size_sets.default_label"),
				"aria-label": b(i)("settings.size_sets.default_label"),
				"onUpdate:modelValue": y
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2), b(a) === null ? x("", !0) : (d(), _("div", {
				key: 0,
				class: E(b(H).row)
			}, [w("span", { class: E(b(H).row_label) }, S(b(i)("settings.size_sets.chat_label")), 3), N(B, {
				"model-value": m.value,
				options: u.value,
				placeholder: b(i)("settings.size_sets.chat_label"),
				"aria-label": b(i)("settings.size_sets.chat_label"),
				"data-testid": "size-set-chat-select",
				"onUpdate:modelValue": k
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2))], 2),
			w("div", { class: E(b(H).actions_row) }, [
				s.value.length > 0 ? (d(), C(B, {
					key: 0,
					"model-value": j.value ?? void 0,
					options: c.value,
					placeholder: b(i)("settings.size_sets.edit_label"),
					"aria-label": b(i)("settings.size_sets.edit_label"),
					"onUpdate:modelValue": n[0] ||= (e) => j.value = e
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])) : x("", !0),
				N(X, {
					label: b(i)("settings.size_sets.add"),
					onClick: n[1] ||= (e) => R(null)
				}, null, 8, ["label"]),
				M.value === null ? x("", !0) : (d(), C(X, {
					key: 1,
					label: b(i)("settings.size_sets.duplicate"),
					variant: "ghost",
					onClick: n[2] ||= (e) => R(M.value)
				}, null, 8, ["label"])),
				M.value === null ? x("", !0) : (d(), C(X, {
					key: 2,
					label: b(i)("settings.size_sets.remove"),
					variant: "destructive",
					onClick: z
				}, null, 8, ["label"]))
			], 2),
			M.value === null ? x("", !0) : (d(), _(A, { key: 0 }, [
				N(W, { label: b(i)("settings.size_sets.name_label") }, {
					default: D(({ fieldId: e }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => F.value = e,
						type: "text",
						maxlength: "60",
						class: E(b(H).text_input),
						"data-testid": "size-set-name-input",
						onBlur: G
					}, null, 42, Ee), [[v, F.value]])]),
					_: 1
				}, 8, ["label"]),
				w("fieldset", {
					class: E(b(H).check_list),
					"data-testid": "size-set-sizes"
				}, [w("legend", { class: E(b(H).row_label) }, S(b(i)("settings.size_sets.sizes_label")), 3), (d(!0), _(A, null, p(re.value, (e) => (d(), C(ne, {
					key: `${e.width}x${e.height}`,
					"model-value": ae(e),
					label: ie(e),
					disabled: ae(e) && M.value.sizes.length === 1,
					"onUpdate:modelValue": (t) => q(e, t)
				}, null, 8, [
					"model-value",
					"label",
					"disabled",
					"onUpdate:modelValue"
				]))), 128))], 2),
				N(U, {
					modelValue: oe.value,
					"onUpdate:modelValue": n[4] ||= (e) => oe.value = e
				}, null, 8, ["modelValue"]),
				w("div", { class: E(b(H).actions_row) }, [N(X, {
					label: b(i)("settings.size_sets.add_custom"),
					variant: "ghost",
					disabled: ae(oe.value) || M.value.sizes.length >= 16,
					onClick: se
				}, null, 8, ["label", "disabled"])], 2)
			], 64))
		], 2));
	}
}), Ae = ["id", "aria-describedby"], je = ["id", "aria-describedby"], Me = ["id", "aria-describedby"], Ne = ["id", "aria-describedby"], Pe = ["id", "aria-describedby"], Fe = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Ie = [
	"id",
	"aria-describedby",
	"disabled"
], Le = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Re = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], ze = "in_use", Be = "none", Ve = /* @__PURE__ */ M({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = T(() => t.settings?.illustration ?? null);
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
		let o = T(() => r.value?.strip ?? u);
		function s(e) {
			a({ strip: {
				...o.value,
				...e
			} });
		}
		let c = T(() => [{
			value: "strip",
			label: n("create.style.strip")
		}, {
			value: "default",
			label: n("create.style.default")
		}]), l = O(""), h = O(""), y = O(""), k = O(""), j = O(""), M = O(""), P = O(""), F = O("");
		g(r, (e) => {
			l.value = e === null || e.preset_name === ze ? "" : e.preset_name, M.value = e?.wardrobe_model ?? "", P.value = e?.analysis_guidance ?? "", F.value = e?.wardrobe_guidance ?? "", e?.connection.kind === "proxy_preset" ? (h.value = e.connection.proxy_preset, y.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (k.value = e.connection.api_url, j.value = e.connection.model);
		}, { immediate: !0 });
		function I() {
			a({ wardrobe_model: M.value.trim() || null });
		}
		function L() {
			a({ preset_name: l.value.trim() || ze });
		}
		let R = T(() => [
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
		function z() {
			let e = h.value.trim();
			if (e === "") return null;
			let t = y.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function te() {
			let e = k.value.trim(), t = j.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let V = T(() => q.value === "custom" && k.value.trim() !== "" && te() === null);
		function U() {
			let e = te();
			e !== null && a({ connection: e });
		}
		let G = O(""), K = O("idle");
		async function re() {
			let e = G.value.trim();
			if (e !== "") {
				K.value = "saving";
				try {
					await t.controller.set_analysis_key(e), G.value = "", K.value = "saved";
				} catch {
					K.value = "failed";
				}
			}
		}
		async function ie() {
			K.value = "saving";
			try {
				await t.controller.clear_analysis_key(), K.value = "cleared";
			} catch {
				K.value = "failed";
			}
		}
		let ae = T(() => {
			switch (K.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), q = O(r.value?.connection.kind ?? "current");
		g(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (q.value = e);
		});
		function oe(e) {
			if (e === "current") q.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				q.value = "proxy_preset";
				let e = z();
				e !== null && a({ connection: e });
			} else e === "custom" && (q.value = "custom", U());
		}
		function se() {
			let e = z();
			e !== null && a({ connection: e });
		}
		let ce = T(() => [{
			value: Be,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function le(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let ue = T(() => [{
			value: "builtin",
			label: n("settings.illustration.preset_source_builtin")
		}, {
			value: "sillytavern",
			label: n("settings.illustration.preset_source_sillytavern")
		}]);
		function pe(e) {
			(e === "builtin" || e === "sillytavern") && a({ preset_source: e });
		}
		let me = T(() => [{
			value: "auto",
			label: n("settings.illustration.structured_output_auto")
		}, {
			value: "tools",
			label: n("settings.illustration.structured_output_tools")
		}]), he = T(() => [{
			value: "preset",
			label: n("settings.illustration.reasoning_preset")
		}, {
			value: "min",
			label: n("settings.illustration.reasoning_min")
		}]);
		function ge(e) {
			(e === "preset" || e === "min") && a({ analysis_reasoning: e });
		}
		function _e(e) {
			(e === "auto" || e === "tools") && a({ structured_output: e });
		}
		let ve = T(() => [
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
		]), ye = O(r.value?.world_info.mode ?? "chat");
		g(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (ye.value = e);
		});
		let Z = O([]), be = O(!1);
		async function Q() {
			try {
				Z.value = await t.controller.list_worldbooks(), be.value = !1;
			} catch {
				be.value = !0;
			}
		}
		m(() => {
			ye.value === "worldbook" && Q();
		});
		let $ = T(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbooks : []), xe = T(() => [.../* @__PURE__ */ new Set([...Z.value, ...$.value])]);
		function Se(e) {
			e === "chat" || e === "off" ? (ye.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (ye.value = e, Q());
		}
		function Ce(e, t) {
			let n = t ? [...$.value, e] : $.value.filter((t) => t !== e);
			n.length > 0 && a({ world_info: {
				mode: "worldbook",
				worldbooks: n
			} });
		}
		return (t, u) => (d(), _("div", {
			class: E(b(H).groups),
			"data-testid": "illustration-settings"
		}, [
			w("section", { class: E(b(H).section) }, [
				w("h2", { class: E(b(H).section_title) }, S(b(n)("settings.groups.generation")), 3),
				N(fe, {
					"model-value": e.settings?.auto_generation_enabled ?? !1,
					label: b(n)("settings.illustration.auto_generation_label"),
					description: b(n)("settings.illustration.auto_generation_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[0] ||= (e) => i({ auto_generation_enabled: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				w("div", { class: E(b(H).field_grid) }, [
					w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.illustration.max_images_label")), 3), N(Y, {
						"model-value": r.value?.max_images_per_message,
						label: b(n)("settings.illustration.max_images_label"),
						min: 1,
						max: 8,
						"increment-label": b(n)("common.actions.increase"),
						"decrement-label": b(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": u[1] ||= (e) => a({ max_images_per_message: e })
					}, null, 8, [
						"model-value",
						"label",
						"increment-label",
						"decrement-label",
						"disabled"
					])], 2),
					w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.illustration.prompt_preset_label")), 3), N(B, {
						"model-value": r.value?.prompt_preset_id ?? Be,
						options: ce.value,
						placeholder: b(n)("settings.illustration.prompt_preset_label"),
						"aria-label": b(n)("settings.illustration.prompt_preset_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": le
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"aria-label",
						"disabled"
					])], 2),
					w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.illustration.concurrency_label")), 3), N(Y, {
						"model-value": e.settings?.global_concurrency,
						label: b(n)("settings.illustration.concurrency_label"),
						min: 1,
						max: 4,
						"increment-label": b(n)("common.actions.increase"),
						"decrement-label": b(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": u[2] ||= (e) => i({ global_concurrency: e })
					}, null, 8, [
						"model-value",
						"label",
						"increment-label",
						"decrement-label",
						"disabled"
					])], 2)
				], 2)
			], 2),
			r.value === null ? x("", !0) : (d(), C(ke, {
				key: 0,
				illustration: r.value,
				onUpdate: a
			}, null, 8, ["illustration"])),
			w("section", { class: E(b(H).section) }, [
				w("h2", { class: E(b(H).section_title) }, S(b(n)("settings.groups.analysis")), 3),
				w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.illustration.connection_label")), 3), N(J, {
					"model-value": q.value,
					options: R.value,
					label: b(n)("settings.illustration.connection_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": oe
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				q.value === "proxy_preset" ? (d(), _(A, { key: 0 }, [N(W, {
					label: b(n)("settings.illustration.proxy_preset_label"),
					hint: b(n)("settings.illustration.proxy_preset_hint")
				}, {
					default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": u[3] ||= (e) => h.value = e,
						type: "text",
						"aria-describedby": t,
						class: E(b(H).text_input),
						"data-testid": "analysis-proxy-preset-input",
						onBlur: se
					}, null, 42, Ae), [[v, h.value]])]),
					_: 1
				}, 8, ["label", "hint"]), N(W, {
					label: b(n)("settings.illustration.proxy_model_label"),
					hint: b(n)("settings.illustration.proxy_model_hint")
				}, {
					default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": u[4] ||= (e) => y.value = e,
						type: "text",
						"aria-describedby": t,
						class: E(b(H).text_input),
						onBlur: se
					}, null, 42, je), [[v, y.value]])]),
					_: 1
				}, 8, ["label", "hint"])], 64)) : x("", !0),
				q.value === "custom" ? (d(), _(A, { key: 1 }, [
					N(W, {
						label: b(n)("settings.illustration.custom_url_label"),
						hint: b(n)("settings.illustration.custom_url_hint"),
						error: V.value ? b(n)("settings.illustration.custom_invalid") : null
					}, {
						default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": u[5] ||= (e) => k.value = e,
							type: "url",
							placeholder: "https://",
							"aria-describedby": t,
							class: E(b(H).text_input),
							"data-testid": "analysis-custom-url-input",
							onBlur: U
						}, null, 42, Me), [[v, k.value]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					N(W, { label: b(n)("settings.illustration.custom_model_label") }, {
						default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": u[6] ||= (e) => j.value = e,
							type: "text",
							"aria-describedby": t,
							class: E(b(H).text_input),
							"data-testid": "analysis-custom-model-input",
							onBlur: U
						}, null, 42, Ne), [[v, j.value]])]),
						_: 1
					}, 8, ["label"]),
					N(W, {
						label: b(n)("settings.illustration.custom_key_label"),
						hint: b(n)("settings.illustration.custom_key_hint")
					}, {
						default: D(({ fieldId: e, describedBy: t }) => [w("div", { class: E(b(H).input_row) }, [f(w("input", {
							id: e,
							"onUpdate:modelValue": u[7] ||= (e) => G.value = e,
							type: "password",
							autocomplete: "off",
							"aria-describedby": t,
							class: E(b(H).text_input),
							"data-testid": "analysis-custom-key-input"
						}, null, 10, Pe), [[v, G.value]]), N(X, {
							label: b(n)("settings.illustration.custom_key_save"),
							pending: K.value === "saving",
							disabled: G.value.trim() === "",
							onClick: re
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					w("div", { class: E(b(H).actions_row) }, [N(X, {
						label: b(n)("settings.illustration.custom_key_clear"),
						variant: "ghost",
						onClick: ie
					}, null, 8, ["label"]), w("span", {
						class: E(b(H).status_text),
						role: "status"
					}, S(ae.value), 3)], 2)
				], 64)) : x("", !0),
				N(W, {
					label: b(n)("settings.illustration.preset_source_label"),
					hint: b(n)("settings.illustration.preset_source_hint")
				}, {
					default: D(({ fieldId: t, describedBy: i }) => [N(B, {
						id: t,
						"described-by": i,
						"model-value": r.value?.preset_source ?? "builtin",
						options: ue.value,
						placeholder: b(n)("settings.illustration.preset_source_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": pe
					}, null, 8, [
						"id",
						"described-by",
						"model-value",
						"options",
						"placeholder",
						"disabled"
					])]),
					_: 1
				}, 8, ["label", "hint"]),
				r.value?.preset_source === "sillytavern" ? (d(), C(W, {
					key: 2,
					label: b(n)("settings.illustration.preset_label"),
					hint: b(n)("settings.illustration.preset_hint")
				}, {
					default: D(({ fieldId: t, describedBy: r }) => [f(w("input", {
						id: t,
						"onUpdate:modelValue": u[8] ||= (e) => l.value = e,
						type: "text",
						placeholder: b(n)("settings.illustration.preset_placeholder"),
						"aria-describedby": r,
						class: E(b(H).text_input),
						disabled: !e.settings,
						"data-testid": "analysis-preset-input",
						onBlur: L
					}, null, 42, Fe), [[v, l.value]])]),
					_: 1
				}, 8, ["label", "hint"])) : x("", !0),
				N(W, {
					label: b(n)("settings.illustration.structured_output_label"),
					hint: b(n)("settings.illustration.structured_output_hint")
				}, {
					default: D(({ fieldId: t, describedBy: i }) => [N(B, {
						id: t,
						"described-by": i,
						"model-value": r.value?.structured_output ?? "auto",
						options: me.value,
						placeholder: b(n)("settings.illustration.structured_output_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": _e
					}, null, 8, [
						"id",
						"described-by",
						"model-value",
						"options",
						"placeholder",
						"disabled"
					])]),
					_: 1
				}, 8, ["label", "hint"]),
				N(W, {
					label: b(n)("settings.illustration.reasoning_label"),
					hint: b(n)("settings.illustration.reasoning_hint")
				}, {
					default: D(({ fieldId: t, describedBy: i }) => [N(B, {
						id: t,
						"described-by": i,
						"model-value": r.value?.analysis_reasoning ?? "preset",
						options: he.value,
						placeholder: b(n)("settings.illustration.reasoning_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": ge
					}, null, 8, [
						"id",
						"described-by",
						"model-value",
						"options",
						"placeholder",
						"disabled"
					])]),
					_: 1
				}, 8, ["label", "hint"]),
				w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.illustration.chat_history_label")), 3), N(Y, {
					"model-value": r.value?.max_chat_history,
					label: b(n)("settings.illustration.chat_history_label"),
					min: 0,
					max: 20,
					"increment-label": b(n)("common.actions.increase"),
					"decrement-label": b(n)("common.actions.decrease"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[9] ||= (e) => a({ max_chat_history: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label",
					"disabled"
				])], 2),
				w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.illustration.world_info_label")), 3), N(J, {
					"model-value": ye.value,
					options: ve.value,
					label: b(n)("settings.illustration.world_info_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": Se
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				w("p", { class: E(b(H).description) }, S(b(n)("settings.illustration.world_info_hint")), 3),
				ye.value === "worldbook" ? (d(), _(A, { key: 3 }, [w("fieldset", {
					class: E(b(H).check_list),
					"data-testid": "worldbook-list"
				}, [
					w("legend", { class: E(b(H).row_label) }, S(b(n)("settings.illustration.worldbook_label")), 3),
					(d(!0), _(A, null, p(xe.value, (e) => (d(), C(ne, {
						key: e,
						"model-value": $.value.includes(e),
						label: e,
						disabled: $.value.length === 1 && $.value.includes(e),
						"onUpdate:modelValue": (t) => Ce(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]))), 128)),
					$.value.length === 0 ? (d(), _("p", {
						key: 0,
						class: E(b(H).description)
					}, S(b(n)("settings.illustration.worldbook_placeholder")), 3)) : x("", !0)
				], 2), be.value ? (d(), _("p", {
					key: 0,
					class: E(b(H).description),
					role: "alert"
				}, S(b(n)("settings.illustration.worldbook_unavailable")), 3)) : x("", !0)], 64)) : x("", !0),
				N(W, {
					label: b(n)("settings.illustration.wardrobe_model_label"),
					hint: q.value === "current" ? b(n)("settings.illustration.wardrobe_model_current_hint") : b(n)("settings.illustration.wardrobe_model_hint")
				}, {
					default: D(({ fieldId: t, describedBy: n }) => [f(w("input", {
						id: t,
						"onUpdate:modelValue": u[10] ||= (e) => M.value = e,
						type: "text",
						"aria-describedby": n,
						class: E(b(H).text_input),
						disabled: !e.settings || q.value === "current",
						"data-testid": "wardrobe-model-input",
						onBlur: I
					}, null, 42, Ie), [[v, M.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			w("section", { class: E(b(H).section) }, [
				w("h2", { class: E(b(H).section_title) }, S(b(n)("settings.groups.guidance")), 3),
				N(W, {
					label: b(n)("settings.illustration.analysis_guidance_label"),
					hint: b(n)("settings.illustration.analysis_guidance_hint")
				}, {
					default: D(({ fieldId: t, describedBy: r }) => [f(w("textarea", {
						id: t,
						"onUpdate:modelValue": u[11] ||= (e) => P.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: b(n)("settings.illustration.analysis_guidance_placeholder"),
						"aria-describedby": r,
						class: E(b(H).text_area),
						disabled: !e.settings,
						"data-testid": "analysis-guidance-input",
						onBlur: u[12] ||= (e) => a({ analysis_guidance: P.value.trim() })
					}, null, 42, Le), [[v, P.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				N(W, {
					label: b(n)("settings.illustration.wardrobe_guidance_label"),
					hint: b(n)("settings.illustration.wardrobe_guidance_hint")
				}, {
					default: D(({ fieldId: t, describedBy: r }) => [f(w("textarea", {
						id: t,
						"onUpdate:modelValue": u[13] ||= (e) => F.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: b(n)("settings.illustration.wardrobe_guidance_placeholder"),
						"aria-describedby": r,
						class: E(b(H).text_area),
						disabled: !e.settings,
						"data-testid": "wardrobe-guidance-input",
						onBlur: u[14] ||= (e) => a({ wardrobe_guidance: F.value.trim() })
					}, null, 42, Re), [[v, F.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			w("section", { class: E(b(H).section) }, [
				w("h2", { class: E(b(H).section_title) }, S(b(n)("settings.groups.strip")), 3),
				N(W, {
					label: b(n)("settings.illustration.strip_style_label"),
					hint: b(n)("settings.illustration.strip_style_hint")
				}, {
					default: D(() => [N(J, {
						"model-value": o.value.style,
						options: c.value,
						label: b(n)("settings.illustration.strip_style_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": u[15] ||= (e) => s({ style: e === "default" ? "default" : "strip" })
					}, null, 8, [
						"model-value",
						"options",
						"label",
						"disabled"
					])]),
					_: 1
				}, 8, ["label", "hint"]),
				N(W, { label: b(n)("settings.illustration.strip_max_label") }, {
					default: D(({ fieldId: t }) => [N(Y, {
						id: t,
						"model-value": o.value.max_panels,
						label: b(n)("settings.illustration.strip_max_label"),
						min: 1,
						max: 12,
						"increment-label": b(n)("common.actions.increase"),
						"decrement-label": b(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": u[16] ||= (e) => s({ max_panels: e ?? o.value.max_panels })
					}, null, 8, [
						"id",
						"model-value",
						"label",
						"increment-label",
						"decrement-label",
						"disabled"
					])]),
					_: 1
				}, 8, ["label"]),
				N(fe, {
					"model-value": o.value.symbol_bubbles,
					label: b(n)("settings.illustration.strip_bubbles_label"),
					description: b(n)("settings.illustration.strip_bubbles_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[17] ||= (e) => s({ symbol_bubbles: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				N(W, { label: b(n)("settings.illustration.strip_style_tags_label") }, {
					default: D(({ fieldId: e }) => [N(de, {
						id: e,
						"model-value": o.value.style_tags,
						"onUpdate:modelValue": u[18] ||= (e) => s({ style_tags: e })
					}, null, 8, ["id", "model-value"])]),
					_: 1
				}, 8, ["label"]),
				N(W, {
					label: b(n)("settings.illustration.strip_no_text_label"),
					hint: b(n)("settings.illustration.strip_no_text_hint")
				}, {
					default: D(({ fieldId: e, describedBy: t }) => [N(de, {
						id: e,
						"model-value": o.value.no_text_tags,
						"described-by": t,
						"onUpdate:modelValue": u[19] ||= (e) => s({ no_text_tags: e })
					}, null, 8, [
						"id",
						"model-value",
						"described-by"
					])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2)
		], 2));
	}
}), He = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, Ue = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function We(e, t) {
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
var Ge = "https://novelai.net/image", Ke = /* @__PURE__ */ M({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let i = e, { t: o, d: c } = ee(), l = T(() => {
			let e = i.profile.model_id;
			return e != null && r(e) !== null ? e : se;
		});
		function u() {
			if (i.profile.novelai_defaults !== null) return i.profile.novelai_defaults;
			let e = oe(l.value);
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
		let f = O(u());
		g(() => i.profile.id, () => {
			f.value = u();
		});
		function h(e) {
			f.value = {
				...f.value,
				...e
			};
		}
		let v = T(() => a.safeParse(f.value).success ? null : o("settings.novelai.invalid_size")), y = T(() => {
			let e = r(l.value);
			return e === null ? [] : s(e.profile, f.value);
		}), D = O(null), k = O(null), M = O(!1), P = O(!1);
		async function F() {
			P.value = !0, k.value = null, M.value = !1;
			try {
				D.value = await i.controller.load_novelai_account();
			} catch (e) {
				M.value = e instanceof Error && e.name === "ProviderNetworkError", k.value = e instanceof Error ? e.message : String(e);
			} finally {
				P.value = !1;
			}
		}
		let I = O([]);
		m(async () => {
			try {
				I.value = (await i.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				I.value = [];
			}
		});
		let L = T(() => I.value.map((e) => ({
			value: e.profile.model_id,
			label: e.profile.display_name
		})));
		async function R(e) {
			await i.controller.save_provider_profile({
				id: i.profile.id,
				provider_id: i.profile.provider_id,
				display_name: i.profile.display_name,
				model_id: e,
				workflow_id: i.profile.workflow_id ?? null,
				base_url: i.profile.base_url ?? null,
				updated_at: i.profile.updated_at
			});
		}
		let z = n.options.map((e) => ({
			value: e,
			label: He[e]
		})), te = t.options.map((e) => ({
			value: e,
			label: Ue[e]
		}));
		function V(e, t, n) {
			t.includes(n) && h({ [e]: n });
		}
		let W = T(() => i.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function G(e, t) {
			let n = f.value.vibe_asset_ids.filter((t) => t !== e);
			h({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let K = O("idle");
		async function re() {
			K.value = "saving";
			try {
				await i.controller.save_novelai_defaults(i.profile.id, f.value), K.value = "saved";
			} catch {
				K.value = "failed";
			}
		}
		return (r, i) => (d(), _("div", {
			class: E(b(H).section),
			"data-testid": "novelai-settings"
		}, [w("div", { class: E(b(H).section_header) }, [w("h2", { class: E(b(H).section_title) }, S(b(o)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), w("div", { class: E(b(H).form_grid) }, [
			w("div", { class: E(b(H).actions_row) }, [N(X, {
				label: b(o)("settings.novelai.refresh_account"),
				pending: P.value,
				onClick: F
			}, null, 8, ["label", "pending"]), D.value === null ? M.value ? (d(), _("span", {
				key: 1,
				class: E(b(H).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [j(S(b(o)("settings.novelai.account_unreachable")) + " ", 1), w("a", {
				href: Ge,
				target: "_blank",
				rel: "noopener noreferrer"
			}, S(b(o)("settings.novelai.account_open_site")), 1)], 2)) : k.value === null ? x("", !0) : (d(), _("span", {
				key: 2,
				class: E(b(H).status_text)
			}, S(k.value), 3)) : (d(), _("span", {
				key: 0,
				class: E(b(H).status_text),
				"data-testid": "novelai-account"
			}, S(b(o)("settings.novelai.account_summary", {
				tier: D.value.tier,
				anlas: D.value.anlas,
				expires: b(c)(new Date(D.value.expires_at), "short_date")
			})), 3))], 2),
			w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(o)("settings.novelai.model_label")), 3), N(B, {
				"model-value": l.value,
				options: L.value,
				placeholder: l.value,
				"aria-label": b(o)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void R(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			N(U, {
				"model-value": {
					width: f.value.width,
					height: f.value.height
				},
				"onUpdate:modelValue": i[1] ||= (e) => h(e)
			}, null, 8, ["model-value"]),
			w("div", { class: E(b(H).field_grid) }, [
				w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(o)("settings.novelai.steps_label")), 3), N(Y, {
					"model-value": f.value.steps,
					label: b(o)("settings.novelai.steps_label"),
					min: 1,
					max: 50,
					"increment-label": b(o)("common.actions.increase"),
					"decrement-label": b(o)("common.actions.decrease"),
					"onUpdate:modelValue": i[2] ||= (e) => h({ steps: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(o)("settings.novelai.scale_label")), 3), N(Y, {
					"model-value": f.value.scale,
					label: b(o)("settings.novelai.scale_label"),
					min: 0,
					max: 10,
					step: .1,
					"increment-label": b(o)("common.actions.increase"),
					"decrement-label": b(o)("common.actions.decrease"),
					"onUpdate:modelValue": i[3] ||= (e) => h({ scale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(o)("settings.novelai.cfg_rescale_label")), 3), N(Y, {
					"model-value": f.value.cfg_rescale,
					label: b(o)("settings.novelai.cfg_rescale_label"),
					min: 0,
					max: 1,
					step: .02,
					"increment-label": b(o)("common.actions.increase"),
					"decrement-label": b(o)("common.actions.decrease"),
					"onUpdate:modelValue": i[4] ||= (e) => h({ cfg_rescale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(o)("settings.novelai.sampler_label")), 3), N(B, {
					"model-value": f.value.sampler,
					options: b(z),
					placeholder: b(o)("settings.novelai.sampler_label"),
					"aria-label": b(o)("settings.novelai.sampler_label"),
					"onUpdate:modelValue": i[5] ||= (e) => V("sampler", b(n).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2),
				w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(o)("settings.novelai.noise_schedule_label")), 3), N(B, {
					"model-value": f.value.noise_schedule,
					options: b(te),
					placeholder: b(o)("settings.novelai.noise_schedule_label"),
					"aria-label": b(o)("settings.novelai.noise_schedule_label"),
					"onUpdate:modelValue": i[6] ||= (e) => V("noise_schedule", b(t).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2)
			], 2),
			N(fe, {
				"model-value": f.value.smea,
				label: b(o)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[7] ||= (e) => h({ smea: e })
			}, null, 8, ["model-value", "label"]),
			N(fe, {
				"model-value": f.value.dyn,
				label: b(o)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[8] ||= (e) => h({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			N(fe, {
				"model-value": f.value.variety_plus,
				label: b(o)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[9] ||= (e) => h({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			w("h3", { class: E(b(H).section_title) }, S(b(o)("settings.novelai.vibes_title")), 3),
			W.value.length === 0 ? (d(), _("p", {
				key: 0,
				class: E(b(H).description)
			}, S(b(o)("settings.novelai.vibes_empty")), 3)) : x("", !0),
			(d(!0), _(A, null, p(W.value, (e) => (d(), C(ne, {
				key: e.id,
				"model-value": f.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => G(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			y.value.length > 0 ? (d(), _("div", {
				key: 1,
				class: E(b(H).risk_banner),
				"data-testid": "novelai-ignored"
			}, [w("p", { class: E(b(H).risk_banner_title) }, S(b(o)("settings.novelai.ignored_title")), 3), (d(!0), _(A, null, p(y.value, (e) => (d(), _("p", {
				key: e,
				class: E(b(H).risk_banner_description)
			}, S(b(We)(b(o), e)), 3))), 128))], 2)) : x("", !0),
			v.value === null ? x("", !0) : (d(), _("p", {
				key: 2,
				class: E(b(H).status_text),
				role: "alert"
			}, S(v.value), 3)),
			w("div", { class: E(b(H).actions_row) }, [N(X, {
				label: b(o)("settings.novelai.save"),
				variant: "primary",
				pending: K.value === "saving",
				disabled: v.value !== null,
				onClick: re
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), w("span", {
				class: E(b(H).status_text),
				role: "status"
			}, S(K.value === "saved" ? b(o)("settings.novelai.saved") : K.value === "failed" ? b(o)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), qe = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Je(e, t) {
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
var Ye = ["id", "aria-describedby"], Xe = ["id", "aria-describedby"], Ze = ["id", "aria-describedby"], Qe = [
	"id",
	"onUpdate:modelValue",
	"step",
	"placeholder",
	"aria-describedby",
	"data-testid"
], $e = ["onUpdate:modelValue", "aria-label"], et = {
	key: 2,
	"data-testid": "comfyui-inspection"
}, tt = ["id", "aria-describedby"], nt = "keep-workflow-value", rt = "workflow", it = "http://127.0.0.1:7860", at = "http://127.0.0.1:8188", ot = /* @__PURE__ */ M({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		promptTagPresets: {},
		workflows: {},
		activeProfileId: {},
		controller: {}
	},
	setup(t) {
		let n = t, r = T(() => n.profiles.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), a = T({
			get: () => n.profiles.some((e) => e.id === n.activeProfileId) ? n.activeProfileId ?? "" : "",
			set: (e) => {
				let t = n.profiles.find((t) => t.id === e);
				t !== void 0 && n.controller.set_active_provider_profile(t.id);
			}
		});
		function o(e) {
			return {
				profile: e,
				custom_presets: n.promptTagPresets,
				save: (e, t) => n.controller.save_prompt_tags(e, t)
			};
		}
		let { t: s } = ee();
		function u(e) {
			return l.some((t) => t === e);
		}
		function m(e) {
			return {
				steps: e?.steps?.toString() ?? "",
				cfg: e?.cfg?.toString() ?? "",
				sampler_name: e?.sampler_name ?? "",
				scheduler: e?.scheduler ?? "",
				model: e?.model ?? "",
				text_encoder: e?.text_encoder ?? "",
				vae: e?.vae ?? ""
			};
		}
		function h(e) {
			return (e?.loras ?? []).map((e) => ({
				lora_name: e.lora_name,
				strength: e.strength.toString()
			}));
		}
		function y(e, t) {
			let n = e.steps.trim() === "" ? void 0 : Number(e.steps), r = e.cfg.trim() === "" ? void 0 : Number(e.cfg), i = t.filter((e) => e.lora_name !== "").map((e) => ({
				lora_name: e.lora_name,
				strength: Number(e.strength)
			}));
			if (n !== void 0 && (!Number.isInteger(n) || n < 1 || n > 200) || r !== void 0 && (!Number.isFinite(r) || r < 0 || r > 100) || i.some((e) => !Number.isFinite(e.strength) || Math.abs(e.strength) > 10)) return null;
			let a = (e) => e.trim() === "" ? void 0 : e.trim(), o = a(e.sampler_name), s = a(e.scheduler), c = a(e.model), l = a(e.text_encoder), u = a(e.vae);
			return {
				...n === void 0 ? {} : { steps: n },
				...r === void 0 ? {} : { cfg: r },
				...o === void 0 ? {} : { sampler_name: o },
				...s === void 0 ? {} : { scheduler: s },
				...c === void 0 ? {} : { model: c },
				...l === void 0 ? {} : { text_encoder: l },
				...u === void 0 ? {} : { vae: u },
				...i.length === 0 ? {} : { loras: i }
			};
		}
		let k = O(!1), j = O(null), M = O(!1), P = O(null), F = O(null), I = O(!1), L = O(null), R = O(""), te = O(!1), V = O(null), U = O(/* @__PURE__ */ new Map()), ne = qe.map((e) => ({
			value: e,
			label: Je(s, e)
		})), G = T({
			get: () => j.value?.provider_id ?? "sd_webui",
			set: (e) => {
				j.value && (j.value.provider_id = e, j.value.workflow_id = "", Z.value = null, Q.value = null, j.value.base_url = e === "comfyui" ? at : it, e === "novelai" && !re.has(j.value.model_id) && (j.value.model_id = se));
			}
		}), re = new Set(i.map((e) => e.model_id)), oe = i.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		})), ce = T(() => j.value?.provider_id === "sd_webui" || j.value?.provider_id === "comfyui"), J = T(() => n.workflows.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), Y = T(() => {
			let e = n.workflows.find((e) => e.id === j.value?.workflow_id);
			if (e === void 0) return null;
			try {
				return ae(e.payload);
			} catch {
				return null;
			}
		}), le = T(() => q.filter((e) => Y.value?.mapping.inputs[e] !== void 0));
		function de(e) {
			let t = Y.value === null ? null : ie(Y.value, e);
			return t === null ? "" : t.toString();
		}
		function fe(e) {
			let t = j.value?.comfyui[e] ?? "", n = Z.value?.options[e] ?? [];
			return [{
				value: nt,
				label: s("settings.provider_profiles.comfyui.keep_workflow_value", { value: de(e) })
			}, ...[.../* @__PURE__ */ new Set([...t === "" ? [] : [t], ...n])].map((e) => ({
				value: e,
				label: e
			}))];
		}
		function he(e, t) {
			j.value && (j.value.comfyui[e] = t === nt ? "" : t);
		}
		let ge = T(() => Y.value?.mapping.lora_model !== void 0);
		function _e(e) {
			let t = Z.value?.lora_names ?? [];
			return [.../* @__PURE__ */ new Set([...e === "" ? [] : [e], ...t])].map((e) => ({
				value: e,
				label: e
			}));
		}
		function ve() {
			j.value?.loras.push({
				lora_name: "",
				strength: "1"
			});
		}
		function ye(e) {
			j.value?.loras.splice(e, 1);
		}
		let Z = O(null), be = O(!1), Q = O(null), $;
		g(() => j.value?.provider_id === "comfyui" ? `${j.value.base_url}\n${j.value.workflow_id}` : null, (e) => {
			clearTimeout($), e !== null && Se(j.value?.base_url ?? "") !== null && ($ = setTimeout(() => void xe(), 600));
		});
		async function xe() {
			let t = j.value;
			if (!t || be.value) return;
			let r = Se(t.base_url);
			if (r === null) {
				Q.value = s("settings.provider_profiles.base_url_invalid");
				return;
			}
			let i = e.safeParse(t.workflow_id);
			be.value = !0, Q.value = null, Z.value = null;
			try {
				Z.value = await n.controller.inspect_comfyui({
					base_url: r,
					workflow_id: i.success ? i.data : null
				});
			} catch {
				Q.value = s("settings.provider_profiles.comfyui.unreachable");
			} finally {
				be.value = !1;
			}
		}
		function Se(e) {
			try {
				return c(e.trim());
			} catch {
				return null;
			}
		}
		function Ce() {
			j.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "novelai",
				display_name: "",
				model_id: se,
				workflow_id: "",
				base_url: it,
				comfyui: m(null),
				loras: []
			}, P.value = null, Z.value = null, Q.value = null, k.value = !0;
		}
		function we(e) {
			j.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				base_url: e.base_url ?? "",
				comfyui: m(e.comfyui_defaults),
				loras: h(e.comfyui_defaults)
			}, P.value = null, Z.value = null, Q.value = null, k.value = !0;
		}
		function Te() {
			k.value = !1, j.value = null, P.value = null;
		}
		async function Ee() {
			let t = j.value;
			if (!t || M.value) return;
			let r = t.display_name.trim(), i = t.provider_id === "comfyui" ? rt : t.model_id.trim(), a = y(t.comfyui, t.loras);
			if (t.provider_id === "comfyui" && a === null) {
				P.value = s("settings.provider_profiles.comfyui.number_invalid");
				return;
			}
			let o = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (r.length === 0 || i.length === 0 || t.provider_id === "comfyui" && o?.success !== !0) {
				P.value = s("errors.validation_required");
				return;
			}
			let c = ce.value ? Se(t.base_url) : null;
			if (ce.value && c === null) {
				P.value = s("settings.provider_profiles.base_url_invalid");
				return;
			}
			M.value = !0, P.value = null;
			try {
				await n.controller.save_provider_profile({
					id: t.id,
					provider_id: t.provider_id,
					display_name: r,
					model_id: i,
					workflow_id: t.provider_id === "comfyui" && o?.success === !0 ? o.data : null,
					base_url: c,
					updated_at: (/* @__PURE__ */ new Date()).toISOString(),
					...t.provider_id === "comfyui" && a !== null ? { comfyui_defaults: a } : {}
				}), Te();
			} catch {
				P.value = s("errors.unexpected");
			} finally {
				M.value = !1;
			}
		}
		function De(e) {
			F.value = e;
		}
		async function Oe() {
			let e = F.value;
			if (!(!e || I.value)) {
				I.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), F.value = null;
				} finally {
					I.value = !1;
				}
			}
		}
		function ke(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function Ae(e) {
			L.value = e, R.value = "", V.value = null;
		}
		function je() {
			L.value = null, R.value = "", V.value = null;
		}
		async function Me() {
			let e = L.value;
			if (!(!e || te.value)) {
				if (R.value.trim().length === 0) {
					V.value = s("errors.validation_required");
					return;
				}
				te.value = !0, V.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, R.value), je();
				} catch {
					V.value = s("settings.credential_storage.unlock_required");
				} finally {
					te.value = !1, R.value = "";
				}
			}
		}
		async function Ne(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				L.value = e, R.value = "", V.value = s("settings.credential_storage.unlock_required");
			}
		}
		async function Pe(e) {
			U.value.set(e.id, {
				pending: !0,
				label: null
			}), U.value = new Map(U.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), r = t.status === "success" ? `${s("status.success")} · ${s("settings.provider_profiles.connection_test_latency", { ms: t.latency_ms })}` : s("settings.provider_profiles.connection_test_failed", { code: t.error.code });
				U.value.set(e.id, {
					pending: !1,
					label: r
				});
			} catch {
				U.value.set(e.id, {
					pending: !1,
					label: s("errors.unexpected")
				});
			}
			U.value = new Map(U.value);
		}
		return (e, n) => (d(), _("div", {
			class: E(b(H).section),
			"data-testid": "provider-profiles"
		}, [
			w("div", { class: E(b(H).section_header) }, [w("h2", { class: E(b(H).section_title) }, S(b(s)("settings.sections.provider_profiles")), 3), N(X, {
				label: b(s)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: Ce
			}, null, 8, ["label", "variant"])], 2),
			t.profiles.length > 0 ? (d(), C(W, {
				key: 0,
				label: b(s)("settings.provider_profiles.active_label"),
				hint: b(s)("settings.provider_profiles.active_hint")
			}, {
				default: D(({ fieldId: e }) => [N(B, {
					id: e,
					modelValue: a.value,
					"onUpdate:modelValue": n[0] ||= (e) => a.value = e,
					options: r.value,
					placeholder: b(s)("settings.provider_profiles.active_label")
				}, null, 8, [
					"id",
					"modelValue",
					"options",
					"placeholder"
				])]),
				_: 1
			}, 8, ["label", "hint"])) : x("", !0),
			N(pe, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": b(s)("settings.provider_profiles.empty_description")
			}, {
				default: D(() => [w("div", null, [(d(!0), _(A, null, p(t.profiles, (e) => (d(), _("div", {
					key: e.id,
					class: E(b(H).profile_row),
					"data-testid": "provider-profile-row"
				}, [w("div", { class: E(b(H).profile_identity) }, [
					w("span", { class: E(b(H).profile_name) }, S(e.display_name), 3),
					w("span", { class: E(b(H).profile_meta) }, S(b(Je)(b(s), e.provider_id)), 3),
					ke(e.provider_id) ? (d(), _("span", {
						key: 0,
						class: E(b(H).profile_meta)
					}, S(e.credential_reference ? b(s)("settings.provider_profiles.credential_set") : b(s)("settings.provider_profiles.credential_unset")), 3)) : x("", !0),
					U.value.get(e.id)?.label ? (d(), _("span", {
						key: 1,
						class: E(b(H).profile_meta),
						"data-testid": "profile-test-result"
					}, S(U.value.get(e.id)?.label), 3)) : x("", !0),
					w("div", { class: E(b(H).prompt_tag_row) }, [N(z, {
						port: o(e),
						kind: "quality"
					}, null, 8, ["port"]), N(z, {
						port: o(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), w("div", { class: E(b(H).profile_actions) }, [
					e.id === t.activeProfileId ? (d(), _("span", {
						key: 0,
						class: E(b(H).badge)
					}, S(b(s)("settings.provider_profiles.active_badge")), 3)) : x("", !0),
					N(X, {
						label: b(s)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: U.value.get(e.id)?.pending === !0,
						onClick: (t) => Pe(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					ke(e.provider_id) ? (d(), C(X, {
						key: 1,
						label: b(s)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => Ae(e)
					}, null, 8, ["label", "onClick"])) : x("", !0),
					ke(e.provider_id) && e.credential_reference !== null ? (d(), C(X, {
						key: 2,
						label: b(s)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => Ne(e)
					}, null, 8, ["label", "onClick"])) : x("", !0),
					N(X, {
						label: b(s)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => we(e)
					}, null, 8, ["label", "onClick"]),
					N(X, {
						label: b(s)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => De(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			N(me, {
				open: k.value,
				title: j.value?.is_new ? b(s)("settings.provider_profiles.dialog_add_title") : b(s)("settings.provider_profiles.dialog_edit_title"),
				"close-label": b(s)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && Te()
			}, {
				default: D(() => [j.value ? (d(), _("div", {
					key: 0,
					class: E(b(H).form_grid)
				}, [
					N(W, {
						label: b(s)("common.labels.name"),
						required: ""
					}, {
						default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": n[1] ||= (e) => j.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: E(b(H).text_input)
						}, null, 10, Ye), [[v, j.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					N(W, {
						label: b(s)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: D(({ fieldId: e }) => [N(B, {
							id: e,
							modelValue: G.value,
							"onUpdate:modelValue": n[2] ||= (e) => G.value = e,
							options: b(ne),
							placeholder: b(s)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					j.value.provider_id === "novelai" ? (d(), C(W, {
						key: 0,
						label: b(s)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: D(({ fieldId: e }) => [N(B, {
							id: e,
							modelValue: j.value.model_id,
							"onUpdate:modelValue": n[3] ||= (e) => j.value.model_id = e,
							options: b(oe),
							placeholder: b(s)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : j.value.provider_id === "comfyui" ? x("", !0) : (d(), C(W, {
						key: 1,
						label: b(s)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => j.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: E(b(H).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Xe), [[v, j.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					ce.value ? (d(), C(W, {
						key: 2,
						label: b(s)("settings.provider_profiles.base_url_label"),
						hint: j.value.provider_id === "comfyui" ? b(s)("settings.provider_profiles.base_url_hint_comfyui") : b(s)("settings.provider_profiles.base_url_hint_sd_webui"),
						required: ""
					}, {
						default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => j.value.base_url = e,
							type: "url",
							"aria-describedby": t,
							class: E(b(H).text_input),
							"data-testid": "provider-base-url-input"
						}, null, 10, Ze), [[v, j.value.base_url]])]),
						_: 1
					}, 8, ["label", "hint"])) : x("", !0),
					j.value.provider_id === "comfyui" ? (d(), C(W, {
						key: 3,
						label: b(s)("settings.provider_profiles.workflow_label"),
						hint: J.value.length === 0 ? b(s)("settings.provider_profiles.comfyui.no_workflows") : void 0,
						required: ""
					}, {
						default: D(({ fieldId: e }) => [N(B, {
							id: e,
							modelValue: j.value.workflow_id,
							"onUpdate:modelValue": n[6] ||= (e) => j.value.workflow_id = e,
							options: J.value,
							placeholder: b(s)("settings.provider_profiles.workflow_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"])) : x("", !0),
					j.value.provider_id === "comfyui" ? (d(), _(A, { key: 4 }, [
						(d(!0), _(A, null, p(le.value, (e) => (d(), _(A, { key: e }, [u(e) ? (d(), C(W, {
							key: 0,
							label: b(K)(b(s), e)
						}, {
							default: D(({ fieldId: t }) => [N(B, {
								id: t,
								"model-value": j.value.comfyui[e] || nt,
								options: fe(e),
								placeholder: b(K)(b(s), e),
								"onUpdate:modelValue": (t) => he(e, t)
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder",
								"onUpdate:modelValue"
							])]),
							_: 2
						}, 1032, ["label"])) : (d(), C(W, {
							key: 1,
							label: b(K)(b(s), e),
							hint: b(s)("settings.provider_profiles.comfyui.default_hint", { value: de(e) })
						}, {
							default: D(({ fieldId: t, describedBy: n }) => [f(w("input", {
								id: t,
								"onUpdate:modelValue": (t) => j.value.comfyui[e] = t,
								type: "number",
								step: e === "cfg" ? "any" : 1,
								placeholder: de(e),
								"aria-describedby": n,
								class: E(b(H).text_input),
								"data-testid": `comfyui-default-${e}`
							}, null, 10, Qe), [[v, j.value.comfyui[e]]])]),
							_: 2
						}, 1032, ["label", "hint"]))], 64))), 128)),
						Y.value === null ? x("", !0) : (d(), C(W, {
							key: 0,
							label: b(s)("settings.provider_profiles.comfyui.loras_label"),
							hint: ge.value ? b(s)("settings.provider_profiles.comfyui.loras_hint") : b(s)("settings.provider_profiles.comfyui.loras_unmapped")
						}, {
							default: D(() => [w("div", {
								class: E(b(H).form_grid),
								"data-testid": "comfyui-loras"
							}, [(d(!0), _(A, null, p(j.value.loras, (e, t) => (d(), _("div", {
								key: t,
								class: E(b(H).lora_row),
								"data-testid": "comfyui-lora-row"
							}, [
								N(B, {
									modelValue: e.lora_name,
									"onUpdate:modelValue": (t) => e.lora_name = t,
									options: _e(e.lora_name),
									placeholder: b(s)("settings.provider_profiles.comfyui.lora_placeholder"),
									ariaLabel: b(s)("settings.provider_profiles.comfyui.lora_placeholder")
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"placeholder",
									"ariaLabel"
								]),
								f(w("input", {
									"onUpdate:modelValue": (t) => e.strength = t,
									type: "number",
									step: "0.05",
									"aria-label": b(s)("settings.provider_profiles.comfyui.lora_strength_label"),
									class: E(b(H).text_input)
								}, null, 10, $e), [[v, e.strength]]),
								N(X, {
									label: b(s)("common.actions.delete"),
									variant: "ghost",
									onClick: (e) => ye(t)
								}, null, 8, ["label", "onClick"])
							], 2))), 128)), w("div", { class: E(b(H).actions_row) }, [N(X, {
								label: b(s)("settings.provider_profiles.comfyui.add_lora_action"),
								variant: "secondary",
								disabled: !ge.value,
								"data-testid": "comfyui-add-lora",
								onClick: ve
							}, null, 8, ["label", "disabled"])], 2)], 2)]),
							_: 1
						}, 8, ["label", "hint"])),
						w("div", { class: E(b(H).actions_row) }, [N(X, {
							label: b(s)("settings.provider_profiles.comfyui.inspect_action"),
							variant: "secondary",
							pending: be.value,
							"data-testid": "comfyui-inspect",
							onClick: xe
						}, null, 8, ["label", "pending"])], 2),
						Q.value ? (d(), _("p", {
							key: 1,
							class: E([b(H).status_text, b(H).description]),
							"data-tone": "error"
						}, S(Q.value), 3)) : x("", !0),
						Z.value ? (d(), _("div", et, [
							w("p", { class: E([b(H).status_text, b(H).description]) }, S(b(s)("settings.provider_profiles.comfyui.connected", { version: Z.value.version ?? "?" })), 3),
							Z.value.missing_node_types.length > 0 ? (d(), _("p", {
								key: 0,
								class: E([b(H).status_text, b(H).description]),
								"data-tone": "error"
							}, S(b(s)("settings.provider_profiles.comfyui.missing_nodes", { names: Z.value.missing_node_types.join(", ") })), 3)) : x("", !0),
							(d(!0), _(A, null, p(Z.value.missing_values, (e) => (d(), _("p", {
								key: `${e.node_id}:${e.property}`,
								class: E([b(H).status_text, b(H).description]),
								"data-tone": "error"
							}, S(b(s)("settings.provider_profiles.comfyui.missing_value", {
								node: e.node_id,
								class_type: e.class_type,
								property: e.property,
								value: e.value
							})), 3))), 128)),
							j.value.workflow_id !== "" && Z.value.missing_node_types.length === 0 && Z.value.missing_values.length === 0 ? (d(), _("p", {
								key: 1,
								class: E([b(H).status_text, b(H).description])
							}, S(b(s)("settings.provider_profiles.comfyui.workflow_ready")), 3)) : x("", !0)
						])) : x("", !0)
					], 64)) : x("", !0),
					P.value ? (d(), _("p", {
						key: 5,
						class: E([b(H).status_text, b(H).description]),
						"data-tone": "error"
					}, S(P.value), 3)) : x("", !0),
					w("div", { class: E(b(H).actions_row) }, [N(X, {
						label: b(s)("common.actions.save"),
						pending: M.value,
						onClick: Ee
					}, null, 8, ["label", "pending"]), N(X, {
						label: b(s)("common.actions.cancel"),
						variant: "secondary",
						onClick: Te
					}, null, 8, ["label"])], 2)
				], 2)) : x("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			N(me, {
				open: L.value !== null,
				title: b(s)("settings.provider_profiles.credential_dialog_title", { name: L.value?.display_name ?? "" }),
				description: b(s)("settings.provider_profiles.credential_dialog_description"),
				"close-label": b(s)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && je()
			}, {
				default: D(() => [w("div", { class: E(b(H).form_grid) }, [N(W, {
					label: b(s)("settings.provider_profiles.credential_label"),
					error: V.value,
					required: ""
				}, {
					default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => R.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: E(b(H).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, tt), [[v, R.value]])]),
					_: 1
				}, 8, ["label", "error"]), w("div", { class: E(b(H).actions_row) }, [N(X, {
					label: b(s)("common.actions.save"),
					pending: te.value,
					onClick: Me
				}, null, 8, ["label", "pending"]), N(X, {
					label: b(s)("common.actions.cancel"),
					variant: "secondary",
					onClick: je
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			N(ue, {
				open: F.value !== null,
				title: b(s)("settings.provider_profiles.remove_confirm_title", { name: F.value?.display_name ?? "" }),
				description: b(s)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": b(s)("confirmations.destructive.default_confirm_action"),
				"cancel-label": b(s)("confirmations.destructive.default_cancel_action"),
				pending: I.value,
				"onUpdate:open": n[10] ||= (e) => !e && (F.value = null),
				onConfirm: Oe
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
}), st = ["id", "aria-describedby"], ct = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], lt = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], ut = 200, dt = /* @__PURE__ */ M({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = T(() => t.settings?.translation ?? null);
		function i(e) {
			let n = r.value;
			return n === null ? Promise.resolve() : t.controller.update_settings({ translation: {
				...n,
				...e
			} });
		}
		let a = T(() => [{
			value: "free",
			label: n("settings.translation.endpoint_free")
		}, {
			value: "pro",
			label: n("settings.translation.endpoint_pro")
		}]);
		function o(e) {
			(e === "free" || e === "pro") && i({ deepl_endpoint: e });
		}
		let s = O(""), c = O("idle");
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
		let m = T(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), h = O([]);
		g(() => r.value?.glossary, (e) => {
			h.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function y() {
			h.value.length < ut && h.value.push({
				source: "",
				target: ""
			});
		}
		function x(e) {
			h.value.splice(e, 1);
		}
		function C() {
			i({ glossary: h.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (d(), _("div", {
			class: E(b(H).section),
			"data-testid": "translation-settings"
		}, [w("div", { class: E(b(H).section_header) }, [w("h2", { class: E(b(H).section_title) }, S(b(n)("settings.nav.translation")), 3)], 2), w("div", { class: E(b(H).form_grid) }, [
			w("p", { class: E(b(H).description) }, S(b(n)("settings.translation.description")), 3),
			N(W, {
				label: b(n)("settings.translation.key_label"),
				hint: b(n)("settings.translation.key_hint")
			}, {
				default: D(({ fieldId: e, describedBy: t }) => [f(w("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: E(b(H).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, st), [[v, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			w("div", { class: E(b(H).actions_row) }, [
				N(X, {
					label: b(n)("settings.translation.key_save"),
					variant: "primary",
					pending: c.value === "saving",
					disabled: s.value.trim() === "",
					onClick: l
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				N(X, {
					label: b(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				w("span", {
					class: E(b(H).status_text),
					role: "status"
				}, S(m.value), 3)
			], 2),
			w("div", { class: E(b(H).row) }, [w("span", { class: E(b(H).row_label) }, S(b(n)("settings.translation.endpoint_label")), 3), N(J, {
				"model-value": r.value?.deepl_endpoint ?? "free",
				options: a.value,
				label: b(n)("settings.translation.endpoint_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			w("h3", { class: E(b(H).section_title) }, S(b(n)("settings.translation.glossary_title")), 3),
			w("p", { class: E(b(H).description) }, S(b(n)("settings.translation.glossary_description")), 3),
			(d(!0), _(A, null, p(h.value, (e, t) => (d(), _("div", {
				key: t,
				class: E(b(H).actions_row),
				"data-testid": "glossary-row"
			}, [
				f(w("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": b(n)("settings.translation.glossary_source"),
					placeholder: b(n)("settings.translation.glossary_source"),
					class: E(b(H).text_input)
				}, null, 10, ct), [[v, e.source]]),
				f(w("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": b(n)("settings.translation.glossary_target"),
					placeholder: b(n)("settings.translation.glossary_target"),
					class: E(b(H).text_input)
				}, null, 10, lt), [[v, e.target]]),
				N(X, {
					label: b(n)("settings.translation.glossary_remove"),
					onClick: (e) => x(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			w("div", { class: E(b(H).actions_row) }, [N(X, {
				label: b(n)("settings.translation.glossary_add"),
				disabled: h.value.length >= ut,
				onClick: y
			}, null, 8, ["label", "disabled"]), N(X, {
				label: b(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: C
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), ft = ["aria-label"], pt = [
	"data-selected",
	"aria-current",
	"onClick"
], mt = /* @__PURE__ */ M({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = y(() => import("./PromptView-CpaeXTjp.js")), n = y(() => import("./PromptTagPresetPanel-C6QwXlpK.js")), r = y(() => import("./DiagnosticsView-BQgD0LCe.js")), i = e, { t: a } = ee(), s = [
			"illustration",
			"providers",
			"translation",
			"prompts",
			"general",
			"diagnostics"
		];
		function c(e) {
			switch (e) {
				case "illustration": return a("settings.nav.illustration");
				case "providers": return a("settings.nav.providers");
				case "translation": return a("settings.nav.translation");
				case "prompts": return a("settings.nav.prompts");
				case "general": return a("settings.nav.general");
				case "diagnostics": return a("settings.nav.diagnostics");
			}
		}
		let l = {
			illustration: re,
			providers: o,
			translation: L,
			prompts: R,
			general: _e,
			diagnostics: G
		};
		function u(e) {
			switch (e) {
				case "illustration": return a("settings.pane.illustration");
				case "providers": return a("settings.pane.providers");
				case "translation": return a("settings.pane.translation");
				case "prompts": return a("settings.pane.prompts");
				case "general": return a("settings.pane.general");
				case "diagnostics": return a("settings.pane.diagnostics");
			}
		}
		let f = T(() => i.state.settings_section), { toasts: m, push: h, dismiss: v } = he();
		g(() => i.state.settings.update_command.status, (e, t) => {
			e === "success" && t === "pending" && h({
				title: a("settings.saved"),
				variant: "success",
				duration: 1800
			});
		});
		let D = T(() => i.state.generation.profiles.find((e) => e.id === i.state.settings.settings?.active_provider_profile_id && e.provider_id === "novelai") ?? null);
		function O(e, t) {
			return i.controller.test_prompt_regex(e, t);
		}
		return (i, o) => (d(), _("div", {
			class: E(b(H).layout),
			"data-testid": "settings-view"
		}, [
			w("nav", {
				class: E(b(H).section_nav),
				"aria-label": b(a)("nav.settings")
			}, [(d(), _(A, null, p(s, (t) => w("button", {
				key: t,
				type: "button",
				class: E(["tc-interactive", b(H).section_nav_item]),
				"data-selected": t === f.value,
				"aria-current": t === f.value ? "page" : void 0,
				onClick: (n) => e.controller.set_settings_section(t)
			}, [N(I, {
				icon: l[t],
				size: 15
			}, null, 8, ["icon"]), w("span", null, S(c(t)), 1)], 10, pt)), 64))], 10, ft),
			w("div", { class: E(b(H).section_content) }, [
				w("header", { class: E(b(H).pane_head) }, [w("h1", { class: E(b(H).pane_title) }, S(c(f.value)), 3), w("p", { class: E(b(H).pane_description) }, S(u(f.value)), 3)], 2),
				e.state.settings.update_command.status === "error" ? (d(), _("p", {
					key: 0,
					class: E([b(H).status_text, b(H).description]),
					"data-tone": "error",
					role: "alert",
					"data-testid": "settings-save-failed"
				}, S(b(a)("settings.save_failed", { code: e.state.settings.update_command.failure.code })), 3)) : x("", !0),
				f.value === "prompts" ? (d(), _(A, { key: 1 }, [N(b(t), {
					state: e.state,
					"test-regex": O,
					onSelectPreset: o[0] ||= (t) => void e.controller.select_prompt_preset(t),
					onNewPreset: o[1] ||= (t) => e.controller.start_new_prompt_preset(),
					onBulkDeletePresets: o[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
					onUpdateDraft: o[3] ||= (t) => e.controller.update_prompt_draft(t),
					onSave: o[4] ||= (t) => void e.controller.save_prompt_preset(t)
				}, null, 8, ["state"]), N(b(n), {
					records: e.state.assets.records.prompt_tag,
					loading: e.state.loading.has("assets"),
					controller: e.controller
				}, null, 8, [
					"records",
					"loading",
					"controller"
				])], 64)) : f.value === "diagnostics" ? (d(), C(b(r), {
					key: 2,
					state: e.state,
					controller: e.controller
				}, null, 8, ["state", "controller"])) : (d(), _("div", {
					key: 3,
					class: E(b(H).view)
				}, [f.value === "illustration" ? (d(), C(Ve, {
					key: 0,
					settings: e.state.settings.settings,
					"prompt-presets": e.state.prompt.presets,
					controller: e.controller
				}, null, 8, [
					"settings",
					"prompt-presets",
					"controller"
				])) : f.value === "providers" ? (d(), _(A, { key: 1 }, [
					e.state.generation.profiles.length === 0 ? (d(), _("section", {
						key: 0,
						class: E(b(H).onboarding),
						"data-testid": "settings-onboarding",
						"aria-labelledby": "settings-onboarding-title"
					}, [w("div", {
						class: E(b(H).onboarding_icon),
						"aria-hidden": "true"
					}, [N(I, {
						icon: b(ge),
						size: 22
					}, null, 8, ["icon"])], 2), w("div", null, [
						w("p", { class: E(b(H).onboarding_label) }, S(b(a)("settings.onboarding.label")), 3),
						w("h2", {
							id: "settings-onboarding-title",
							class: E(b(H).onboarding_title)
						}, S(b(a)("settings.onboarding.title")), 3),
						w("p", { class: E(b(H).onboarding_description) }, S(b(a)("settings.onboarding.description")), 3)
					])], 2)) : x("", !0),
					N(ot, {
						profiles: e.state.generation.profiles,
						"prompt-tag-presets": e.state.assets.records.prompt_tag,
						workflows: e.state.assets.records.workflow,
						"active-profile-id": e.state.settings.settings?.active_provider_profile_id ?? null,
						controller: e.controller
					}, null, 8, [
						"profiles",
						"prompt-tag-presets",
						"workflows",
						"active-profile-id",
						"controller"
					]),
					D.value === null ? x("", !0) : (d(), C(Ke, {
						key: 1,
						profile: D.value,
						vibes: e.state.assets.records.vibe,
						controller: e.controller
					}, null, 8, [
						"profile",
						"vibes",
						"controller"
					]))
				], 64)) : f.value === "translation" ? (d(), C(dt, {
					key: 2,
					settings: e.state.settings.settings,
					controller: e.controller
				}, null, 8, ["settings", "controller"])) : f.value === "general" ? (d(), _(A, { key: 3 }, [
					N(ve, {
						settings: e.state.settings.settings,
						controller: e.controller
					}, null, 8, ["settings", "controller"]),
					N($, {
						settings: e.state.settings.settings,
						"vault-status": e.state.settings.browser_secret_vault,
						controller: e.controller
					}, null, 8, [
						"settings",
						"vault-status",
						"controller"
					]),
					N(Te, {
						remote: e.state.settings.settings?.vocabulary_remote ?? null,
						controller: e.controller
					}, null, 8, ["remote", "controller"])
				], 64)) : x("", !0)], 2))
			], 2),
			N(le, {
				toasts: b(m),
				"viewport-label": b(a)("common.notifications.viewport_label"),
				"announce-label": b(a)("common.notifications.announce_label"),
				"close-label": b(a)("common.actions.close"),
				onDismiss: b(v)
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
export { mt as default };
