import { a as e } from "./ids-pPJWL4BL.js";
import { i as t, o as n } from "./novelai-B6V3MfU9.js";
import { i as r, t as i } from "./novelai_models-CXz0Nwhv.js";
import { a, i as o, n as s, r as c, t as l } from "./http_origin-B-Rw6Ppb.js";
import { n as u } from "./settings-DJXtl7jq.js";
import { F as d, J as f, L as p, M as m, T as h, W as g, _, a as v, b as y, dt as b, g as x, gt as S, h as C, m as w, n as T, p as E, pt as D, q as O, rt as k, s as A, u as j, v as M, x as N, y as P } from "./vue-i18n-XoxYzLIP.js";
import { t as F } from "./portal_keys-DthxrmWp.js";
import { n as I, t as L } from "./AppIcon-DD754F_c.js";
import { n as ee, r as R, t as z } from "./PromptTagChips-BJtFEi8-.js";
import { n as B, t as te } from "./StateSurface-C9eJEtTP.js";
import { t as V } from "./AppSelect-DKz1dWBv.js";
import { a as H, i as U, n as W, t as G } from "./ImageSizeField-dUSassCk.js";
import { t as ne } from "./AppCheckbox-mwSAcdjr.js";
import { t as K } from "./FieldGroup-D8VsaFMT.js";
import { t as q } from "./scan-search-BFExP56Z.js";
import { t as re } from "./sparkles-DIwEk888.js";
import "./browser_secret_vault-Cl9sZA7g.js";
import { n as ie, t as J } from "./novelai_request_defaults-DmJSc0ed.js";
import { t as Y } from "./catalog_url-B1GMOf5E.js";
import { n as X, t as Z } from "./NumberStepper-BUxNPDyt.js";
import { t as ae } from "./ToastViewport-CFqJKFdb.js";
import { t as oe } from "./ConfirmDialog-BMpZdMGH.js";
import { t as se } from "./TagInput-D7G-qA43.js";
import { t as Q } from "./AppSwitch-CRj_joeq.js";
import { t as ce } from "./AppDialog-luZAyPaX.js";
import { t as le } from "./use_toasts-BkstxFb0.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var ue = I("cable", [
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
]), de = I("sliders-horizontal", [
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
]), fe = /* @__PURE__ */ N({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = T(), r = {
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
		let a = E(() => [
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
		]), o = E(() => [
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
			class: D(b(W).section),
			"data-testid": "appearance-settings"
		}, [w("div", { class: D(b(W).section_header) }, [w("h2", { class: D(b(W).section_title) }, S(b(n)("settings.sections.appearance")), 3)], 2), w("div", { class: D(b(W).form_grid) }, [
			w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.appearance.theme_label")), 3), P(X, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: b(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.appearance.language_label")), 3), P(X, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: b(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.appearance.inspector_width_label")), 3), P(Z, {
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
			P(Q, {
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
}), pe = ["data-tone"], me = ["id", "aria-describedby"], $ = ["id", "aria-describedby"], he = ["id", "aria-describedby"], ge = /* @__PURE__ */ N({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = T(), r = k(""), i = k(""), a = k(!1), o = k(null), s = k(!1), c = E(() => [
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
		]), l = E({
			get: () => t.settings?.credential_storage_mode ?? "browser_device",
			set: (e) => {
				o.value = null, t.controller.update_settings({ credential_storage_mode: e }).catch(() => {
					o.value = n("errors.unexpected");
				});
			}
		}), u = E(() => {
			let e = { count: t.vaultStatus.secret_count };
			switch (t.vaultStatus.state) {
				case "unavailable": return n("settings.credential_storage.states.unavailable", e);
				case "error": return n("settings.credential_storage.states.error", e);
				case "uninitialized": return n("settings.credential_storage.states.uninitialized", e);
				case "locked": return n("settings.credential_storage.states.locked", e);
				case "unlocked": return n("settings.credential_storage.states.unlocked", e);
			}
		}), p = E(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
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
		async function M() {
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
		async function N() {
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
			class: D(b(W).section),
			"data-testid": "credential-storage-settings"
		}, [
			w("div", { class: D(b(W).section_header) }, [w("h2", { class: D(b(W).section_title) }, S(b(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (d(), _("span", {
				key: 0,
				class: D(b(W).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, S(u.value), 11, pe)) : x("", !0)], 2),
			w("div", { class: D(b(W).vault_mode_row) }, [w("div", { class: D(b(W).profile_identity) }, [w("span", { class: D(b(W).profile_name) }, S(b(n)("settings.credential_storage.mode_label")), 3), w("span", { class: D(b(W).profile_meta) }, S(b(n)("settings.credential_storage.mode_hint")), 3)], 2), P(X, {
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
				class: D(b(W).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (d(), _("p", {
				key: 0,
				class: D(b(W).status_text),
				"data-tone": "error",
				role: "alert"
			}, S(p.value), 3)) : e.vaultStatus.state === "uninitialized" ? (d(), _(j, { key: 1 }, [
				P(K, {
					label: b(n)("settings.credential_storage.passphrase_label"),
					hint: b(n)("settings.credential_storage.passphrase_hint", { count: b(12) }),
					required: ""
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": m[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: D(b(W).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, me), [[v, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				P(K, {
					label: b(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": m[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: D(b(W).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, $), [[v, i.value]])]),
					_: 1
				}, 8, ["label"]),
				P(B, {
					label: b(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: y
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (d(), _(j, { key: 2 }, [P(K, {
				label: b(n)("settings.credential_storage.passphrase_label"),
				hint: b(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
					id: e,
					"onUpdate:modelValue": m[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: D(b(W).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: A(C, ["enter"])
				}, null, 42, he), [[v, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), P(B, {
				label: b(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: C
			}, null, 8, ["label", "pending"])], 64)) : (d(), _("div", {
				key: 3,
				class: D(b(W).vault_unlocked_actions)
			}, [P(B, {
				label: b(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: M
			}, null, 8, ["label", "pending"]), P(B, {
				label: b(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: m[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (d(), _("p", {
				key: 4,
				class: D(b(W).status_text),
				"data-tone": "error",
				role: "alert"
			}, S(o.value), 3)) : x("", !0)], 2)) : x("", !0),
			P(oe, {
				open: s.value,
				title: b(n)("settings.credential_storage.reset_confirm_title"),
				description: b(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": b(n)("settings.credential_storage.reset_action"),
				"cancel-label": b(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": m[5] ||= (e) => s.value = e,
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
}), _e = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], ve = ["id", "aria-describedby"], ye = ["aria-label"], be = ["aria-label"], xe = /* @__PURE__ */ N({
	__name: "DataSettings",
	props: {
		remote: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = T(), r = k(""), i = k(!1);
		g(() => t.remote?.catalog_url, (e) => {
			r.value = e ?? "";
		}, { immediate: !0 });
		async function a() {
			let e = t.remote, n = Y(r.value);
			i.value = n === null, e !== null && n !== null && (r.value = n, n !== e.catalog_url && await t.controller.update_settings({ vocabulary_remote: {
				...e,
				catalog_url: n
			} }));
		}
		let o = k(""), s = k("idle");
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
		let u = E(() => s.value === "failed" ? n("settings.data.vocabulary_token_failed") : t.remote?.token_saved === !0 ? n("settings.data.vocabulary_token_present") : n("settings.data.vocabulary_token_absent")), p = k(!1), m = k(!1), h = k(null), y = k(null), A = k(null);
		function j() {
			A.value?.click();
		}
		function M() {
			t.controller.cancel_vocabulary_import();
		}
		async function N(e) {
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
		let F = E(() => {
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
		}), I = k(!1), L = k(null);
		async function ee() {
			if (!I.value) {
				I.value = !0, L.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "inkwell-archive.zip", r.click(), URL.revokeObjectURL(n);
				} catch {
					L.value = n("errors.unexpected");
				} finally {
					I.value = !1;
				}
			}
		}
		let R = k(!1), z = k(null), te = k(null);
		function V() {
			te.value?.click();
		}
		async function H(e) {
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
			class: D(b(W).section),
			"data-testid": "data-settings"
		}, [w("div", { class: D(b(W).section_header) }, [w("h2", { class: D(b(W).section_title) }, S(b(n)("settings.sections.data")), 3)], 2), w("div", { class: D(b(W).form_grid) }, [
			P(K, {
				label: b(n)("settings.data.vocabulary_catalog_label"),
				hint: b(n)("settings.data.vocabulary_catalog_hint")
			}, {
				default: O(({ fieldId: t, describedBy: i }) => [f(w("input", {
					id: t,
					"onUpdate:modelValue": g[0] ||= (e) => r.value = e,
					type: "url",
					autocomplete: "off",
					spellcheck: "false",
					placeholder: b(n)("settings.data.vocabulary_catalog_placeholder"),
					"aria-describedby": i,
					class: D(b(W).text_input),
					disabled: e.remote === null,
					"data-testid": "vocabulary-catalog-input",
					onChange: a
				}, null, 42, _e), [[v, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			i.value ? (d(), _("p", {
				key: 0,
				class: D([b(W).status_text, b(W).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-catalog-invalid"
			}, S(b(n)("settings.data.vocabulary_catalog_invalid")), 3)) : x("", !0),
			P(K, {
				label: b(n)("settings.data.vocabulary_token_label"),
				hint: b(n)("settings.data.vocabulary_token_hint")
			}, {
				default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
					id: e,
					"onUpdate:modelValue": g[1] ||= (e) => o.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: D(b(W).text_input),
					"data-testid": "vocabulary-token-input"
				}, null, 10, ve), [[v, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			w("div", { class: D(b(W).actions_row) }, [
				P(B, {
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
				e.remote?.token_saved === !0 ? (d(), C(B, {
					key: 0,
					label: b(n)("settings.data.vocabulary_token_clear"),
					onClick: l
				}, null, 8, ["label"])) : x("", !0),
				w("span", {
					class: D(b(W).status_text),
					role: "status"
				}, S(u.value), 3)
			], 2),
			w("div", { class: D(b(W).actions_row) }, [
				P(B, {
					label: b(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: p.value,
					onClick: j
				}, null, 8, ["label", "pending"]),
				p.value ? (d(), C(B, {
					key: 0,
					label: b(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: M
				}, null, 8, ["label"])) : x("", !0),
				w("input", {
					ref_key: "vocabulary_file_input",
					ref: A,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": b(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: N
				}, null, 40, ye)
			], 2),
			w("p", { class: D(b(W).description) }, S(b(n)("settings.data.vocabulary_import.description")), 3),
			F.value ? (d(), _("p", {
				key: 1,
				class: D([b(W).status_text, b(W).description]),
				"data-testid": "vocabulary-import-progress"
			}, S(F.value), 3)) : x("", !0),
			m.value ? (d(), _("p", {
				key: 2,
				class: D([b(W).status_text, b(W).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, S(b(n)("settings.data.vocabulary_import.success")), 3)) : x("", !0),
			h.value ? (d(), _("p", {
				key: 3,
				class: D([b(W).status_text, b(W).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, S(h.value), 3)) : x("", !0),
			w("div", { class: D(b(W).actions_row) }, [
				P(B, {
					label: b(n)("settings.data.archive_export_action"),
					pending: I.value,
					onClick: ee
				}, null, 8, ["label", "pending"]),
				P(B, {
					label: b(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: R.value,
					onClick: V
				}, null, 8, ["label", "pending"]),
				w("input", {
					ref_key: "file_input",
					ref: te,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": b(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: H
				}, null, 40, be)
			], 2),
			w("p", { class: D(b(W).description) }, S(b(n)("settings.data.archive_import_description")), 3),
			L.value ? (d(), _("p", {
				key: 4,
				class: D([b(W).status_text, b(W).description]),
				"data-tone": "error"
			}, S(L.value), 3)) : x("", !0),
			z.value ? (d(), _("p", {
				key: 5,
				class: D([b(W).status_text, b(W).description]),
				"data-tone": "error"
			}, S(z.value), 3)) : x("", !0)
		], 2)], 2));
	}
}), Se = ["id"], Ce = "none", we = "default", Te = /* @__PURE__ */ N({
	__name: "SizeSetSettings",
	props: { illustration: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = T(), a = h(F, k(null)), o = [
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
		], s = E(() => n.illustration.size_sets), c = E(() => s.value.map((e) => ({
			value: e.id,
			label: e.name
		}))), l = E(() => [{
			value: Ce,
			label: i("settings.size_sets.none")
		}, ...c.value]), u = E(() => [{
			value: we,
			label: i("settings.size_sets.follow_default")
		}, ...l.value]), m = E(() => {
			let e = a.value;
			return e === null || !(e in n.illustration.size_set_by_chat) ? we : n.illustration.size_set_by_chat[e] ?? Ce;
		});
		function y(e) {
			r("update", { size_set_id: e === Ce ? null : e });
		}
		function A(e) {
			let t = a.value;
			if (t === null) return;
			let i = Object.entries(n.illustration.size_set_by_chat).filter(([e]) => e !== t), o = e === we ? i : [...i, [t, e === Ce ? null : e]];
			r("update", { size_set_by_chat: Object.fromEntries(o.slice(-100)) });
		}
		let M = k(s.value[0]?.id ?? null);
		g(s, (e) => {
			e.some((e) => e.id === M.value) || (M.value = e[0]?.id ?? null);
		});
		let N = E(() => s.value.find((e) => e.id === M.value) ?? null), I = k("");
		g(N, (e) => {
			I.value = e?.name ?? "";
		}, { immediate: !0 });
		function L(e, t = {}) {
			r("update", {
				size_sets: [...e],
				...t
			});
		}
		function ee(e) {
			let t = N.value;
			t !== null && L(s.value.map((n) => n.id === t.id ? {
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
			M.value = t.id, L([...s.value, t]);
		}
		function z() {
			let e = N.value;
			e !== null && L(s.value.filter((t) => t.id !== e.id), {
				size_set_id: n.illustration.size_set_id === e.id ? null : n.illustration.size_set_id,
				size_set_by_chat: Object.fromEntries(Object.entries(n.illustration.size_set_by_chat).filter(([, t]) => t !== e.id))
			});
		}
		function te() {
			let e = I.value.trim();
			e !== "" && e !== N.value?.name && ee({ name: e });
		}
		let q = (e, t) => e.width === t.width && e.height === t.height, re = E(() => {
			let e = (N.value?.sizes ?? []).filter((e) => !U.some((t) => q(t, e)));
			return [...U, ...e];
		});
		function ie(e) {
			let t = `${H(e)} · ${String(e.width)} × ${String(e.height)}`;
			return e.width * e.height > 1048576 ? `${t} · ${i("settings.size_sets.costs_anlas")}` : t;
		}
		function J(e) {
			return N.value?.sizes.some((t) => q(t, e)) ?? !1;
		}
		function Y(e, t) {
			let n = N.value;
			if (n === null) return;
			let r = t ? [...n.sizes, { ...e }] : n.sizes.filter((t) => !q(t, e));
			r.length > 0 && r.length <= 16 && ee({ sizes: r });
		}
		let X = k({
			width: 1344,
			height: 768
		});
		function Z() {
			J(X.value) || Y(X.value, !0);
		}
		return (t, n) => (d(), _("section", {
			class: D(b(W).section),
			"data-testid": "size-set-settings"
		}, [
			w("h2", { class: D(b(W).section_title) }, S(b(i)("settings.groups.sizes")), 3),
			w("p", { class: D(b(W).description) }, S(b(i)("settings.size_sets.hint")), 3),
			w("div", { class: D(b(W).field_grid) }, [w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(i)("settings.size_sets.default_label")), 3), P(V, {
				"model-value": e.illustration.size_set_id ?? Ce,
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
				class: D(b(W).row)
			}, [w("span", { class: D(b(W).row_label) }, S(b(i)("settings.size_sets.chat_label")), 3), P(V, {
				"model-value": m.value,
				options: u.value,
				placeholder: b(i)("settings.size_sets.chat_label"),
				"aria-label": b(i)("settings.size_sets.chat_label"),
				"data-testid": "size-set-chat-select",
				"onUpdate:modelValue": A
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2))], 2),
			w("div", { class: D(b(W).actions_row) }, [
				s.value.length > 0 ? (d(), C(V, {
					key: 0,
					"model-value": M.value ?? void 0,
					options: c.value,
					placeholder: b(i)("settings.size_sets.edit_label"),
					"aria-label": b(i)("settings.size_sets.edit_label"),
					"onUpdate:modelValue": n[0] ||= (e) => M.value = e
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])) : x("", !0),
				P(B, {
					label: b(i)("settings.size_sets.add"),
					onClick: n[1] ||= (e) => R(null)
				}, null, 8, ["label"]),
				N.value === null ? x("", !0) : (d(), C(B, {
					key: 1,
					label: b(i)("settings.size_sets.duplicate"),
					variant: "ghost",
					onClick: n[2] ||= (e) => R(N.value)
				}, null, 8, ["label"])),
				N.value === null ? x("", !0) : (d(), C(B, {
					key: 2,
					label: b(i)("settings.size_sets.remove"),
					variant: "destructive",
					onClick: z
				}, null, 8, ["label"]))
			], 2),
			N.value === null ? x("", !0) : (d(), _(j, { key: 0 }, [
				P(K, { label: b(i)("settings.size_sets.name_label") }, {
					default: O(({ fieldId: e }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => I.value = e,
						type: "text",
						maxlength: "60",
						class: D(b(W).text_input),
						"data-testid": "size-set-name-input",
						onBlur: te
					}, null, 42, Se), [[v, I.value]])]),
					_: 1
				}, 8, ["label"]),
				w("fieldset", {
					class: D(b(W).check_list),
					"data-testid": "size-set-sizes"
				}, [w("legend", { class: D(b(W).row_label) }, S(b(i)("settings.size_sets.sizes_label")), 3), (d(!0), _(j, null, p(re.value, (e) => (d(), C(ne, {
					key: `${e.width}x${e.height}`,
					"model-value": J(e),
					label: ie(e),
					disabled: J(e) && N.value.sizes.length === 1,
					"onUpdate:modelValue": (t) => Y(e, t)
				}, null, 8, [
					"model-value",
					"label",
					"disabled",
					"onUpdate:modelValue"
				]))), 128))], 2),
				P(G, {
					modelValue: X.value,
					"onUpdate:modelValue": n[4] ||= (e) => X.value = e
				}, null, 8, ["modelValue"]),
				w("div", { class: D(b(W).actions_row) }, [P(B, {
					label: b(i)("settings.size_sets.add_custom"),
					variant: "ghost",
					disabled: J(X.value) || N.value.sizes.length >= 16,
					onClick: Z
				}, null, 8, ["label", "disabled"])], 2)
			], 64))
		], 2));
	}
}), Ee = ["id", "aria-describedby"], De = ["id", "aria-describedby"], Oe = ["id", "aria-describedby"], ke = ["id", "aria-describedby"], Ae = ["id", "aria-describedby"], je = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Me = [
	"id",
	"aria-describedby",
	"disabled"
], Ne = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Pe = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Fe = "in_use", Ie = "none", Le = /* @__PURE__ */ N({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = T(), r = E(() => t.settings?.illustration ?? null);
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
		let o = E(() => r.value?.strip ?? u);
		function s(e) {
			a({ strip: {
				...o.value,
				...e
			} });
		}
		let c = E(() => [{
			value: "strip",
			label: n("create.style.strip")
		}, {
			value: "default",
			label: n("create.style.default")
		}]), l = k(""), h = k(""), y = k(""), A = k(""), M = k(""), N = k(""), F = k(""), I = k("");
		g(r, (e) => {
			l.value = e === null || e.preset_name === Fe ? "" : e.preset_name, N.value = e?.wardrobe_model ?? "", F.value = e?.analysis_guidance ?? "", I.value = e?.wardrobe_guidance ?? "", e?.connection.kind === "proxy_preset" ? (h.value = e.connection.proxy_preset, y.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (A.value = e.connection.api_url, M.value = e.connection.model);
		}, { immediate: !0 });
		function L() {
			a({ wardrobe_model: N.value.trim() || null });
		}
		function ee() {
			a({ preset_name: l.value.trim() || Fe });
		}
		let R = E(() => [
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
			let e = A.value.trim(), t = M.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let H = E(() => Y.value === "custom" && A.value.trim() !== "" && te() === null);
		function U() {
			let e = te();
			e !== null && a({ connection: e });
		}
		let G = k(""), q = k("idle");
		async function re() {
			let e = G.value.trim();
			if (e !== "") {
				q.value = "saving";
				try {
					await t.controller.set_analysis_key(e), G.value = "", q.value = "saved";
				} catch {
					q.value = "failed";
				}
			}
		}
		async function ie() {
			q.value = "saving";
			try {
				await t.controller.clear_analysis_key(), q.value = "cleared";
			} catch {
				q.value = "failed";
			}
		}
		let J = E(() => {
			switch (q.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), Y = k(r.value?.connection.kind ?? "current");
		g(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (Y.value = e);
		});
		function ae(e) {
			if (e === "current") Y.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				Y.value = "proxy_preset";
				let e = z();
				e !== null && a({ connection: e });
			} else e === "custom" && (Y.value = "custom", U());
		}
		function oe() {
			let e = z();
			e !== null && a({ connection: e });
		}
		let ce = E(() => [{
			value: Ie,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function le(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let ue = E(() => [
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
		]), de = k(r.value?.world_info.mode ?? "chat");
		g(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (de.value = e);
		});
		let fe = k([]), pe = k(!1);
		async function me() {
			try {
				fe.value = await t.controller.list_worldbooks(), pe.value = !1;
			} catch {
				pe.value = !0;
			}
		}
		m(() => {
			de.value === "worldbook" && me();
		});
		let $ = E(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbooks : []), he = E(() => [.../* @__PURE__ */ new Set([...fe.value, ...$.value])]);
		function ge(e) {
			e === "chat" || e === "off" ? (de.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (de.value = e, me());
		}
		function _e(e, t) {
			let n = t ? [...$.value, e] : $.value.filter((t) => t !== e);
			n.length > 0 && a({ world_info: {
				mode: "worldbook",
				worldbooks: n
			} });
		}
		return (t, u) => (d(), _("div", {
			class: D(b(W).groups),
			"data-testid": "illustration-settings"
		}, [
			w("section", { class: D(b(W).section) }, [
				w("h2", { class: D(b(W).section_title) }, S(b(n)("settings.groups.generation")), 3),
				P(Q, {
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
				w("div", { class: D(b(W).field_grid) }, [
					w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.illustration.max_images_label")), 3), P(Z, {
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
					w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.illustration.prompt_preset_label")), 3), P(V, {
						"model-value": r.value?.prompt_preset_id ?? Ie,
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
					w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.illustration.concurrency_label")), 3), P(Z, {
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
			r.value === null ? x("", !0) : (d(), C(Te, {
				key: 0,
				illustration: r.value,
				onUpdate: a
			}, null, 8, ["illustration"])),
			w("section", { class: D(b(W).section) }, [
				w("h2", { class: D(b(W).section_title) }, S(b(n)("settings.groups.analysis")), 3),
				w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.illustration.connection_label")), 3), P(X, {
					"model-value": Y.value,
					options: R.value,
					label: b(n)("settings.illustration.connection_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": ae
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				Y.value === "proxy_preset" ? (d(), _(j, { key: 0 }, [P(K, {
					label: b(n)("settings.illustration.proxy_preset_label"),
					hint: b(n)("settings.illustration.proxy_preset_hint")
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": u[3] ||= (e) => h.value = e,
						type: "text",
						"aria-describedby": t,
						class: D(b(W).text_input),
						"data-testid": "analysis-proxy-preset-input",
						onBlur: oe
					}, null, 42, Ee), [[v, h.value]])]),
					_: 1
				}, 8, ["label", "hint"]), P(K, {
					label: b(n)("settings.illustration.proxy_model_label"),
					hint: b(n)("settings.illustration.proxy_model_hint")
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": u[4] ||= (e) => y.value = e,
						type: "text",
						"aria-describedby": t,
						class: D(b(W).text_input),
						onBlur: oe
					}, null, 42, De), [[v, y.value]])]),
					_: 1
				}, 8, ["label", "hint"])], 64)) : x("", !0),
				Y.value === "custom" ? (d(), _(j, { key: 1 }, [
					P(K, {
						label: b(n)("settings.illustration.custom_url_label"),
						hint: b(n)("settings.illustration.custom_url_hint"),
						error: H.value ? b(n)("settings.illustration.custom_invalid") : null
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": u[5] ||= (e) => A.value = e,
							type: "url",
							placeholder: "https://",
							"aria-describedby": t,
							class: D(b(W).text_input),
							"data-testid": "analysis-custom-url-input",
							onBlur: U
						}, null, 42, Oe), [[v, A.value]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					P(K, { label: b(n)("settings.illustration.custom_model_label") }, {
						default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": u[6] ||= (e) => M.value = e,
							type: "text",
							"aria-describedby": t,
							class: D(b(W).text_input),
							"data-testid": "analysis-custom-model-input",
							onBlur: U
						}, null, 42, ke), [[v, M.value]])]),
						_: 1
					}, 8, ["label"]),
					P(K, {
						label: b(n)("settings.illustration.custom_key_label"),
						hint: b(n)("settings.illustration.custom_key_hint")
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [w("div", { class: D(b(W).input_row) }, [f(w("input", {
							id: e,
							"onUpdate:modelValue": u[7] ||= (e) => G.value = e,
							type: "password",
							autocomplete: "off",
							"aria-describedby": t,
							class: D(b(W).text_input),
							"data-testid": "analysis-custom-key-input"
						}, null, 10, Ae), [[v, G.value]]), P(B, {
							label: b(n)("settings.illustration.custom_key_save"),
							pending: q.value === "saving",
							disabled: G.value.trim() === "",
							onClick: re
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					w("div", { class: D(b(W).actions_row) }, [P(B, {
						label: b(n)("settings.illustration.custom_key_clear"),
						variant: "ghost",
						onClick: ie
					}, null, 8, ["label"]), w("span", {
						class: D(b(W).status_text),
						role: "status"
					}, S(J.value), 3)], 2)
				], 64)) : x("", !0),
				P(K, {
					label: b(n)("settings.illustration.preset_label"),
					hint: b(n)("settings.illustration.preset_hint")
				}, {
					default: O(({ fieldId: t, describedBy: r }) => [f(w("input", {
						id: t,
						"onUpdate:modelValue": u[8] ||= (e) => l.value = e,
						type: "text",
						placeholder: b(n)("settings.illustration.preset_placeholder"),
						"aria-describedby": r,
						class: D(b(W).text_input),
						disabled: !e.settings,
						"data-testid": "analysis-preset-input",
						onBlur: ee
					}, null, 42, je), [[v, l.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.illustration.chat_history_label")), 3), P(Z, {
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
				w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.illustration.world_info_label")), 3), P(X, {
					"model-value": de.value,
					options: ue.value,
					label: b(n)("settings.illustration.world_info_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": ge
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				w("p", { class: D(b(W).description) }, S(b(n)("settings.illustration.world_info_hint")), 3),
				de.value === "worldbook" ? (d(), _(j, { key: 2 }, [w("fieldset", {
					class: D(b(W).check_list),
					"data-testid": "worldbook-list"
				}, [
					w("legend", { class: D(b(W).row_label) }, S(b(n)("settings.illustration.worldbook_label")), 3),
					(d(!0), _(j, null, p(he.value, (e) => (d(), C(ne, {
						key: e,
						"model-value": $.value.includes(e),
						label: e,
						disabled: $.value.length === 1 && $.value.includes(e),
						"onUpdate:modelValue": (t) => _e(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]))), 128)),
					$.value.length === 0 ? (d(), _("p", {
						key: 0,
						class: D(b(W).description)
					}, S(b(n)("settings.illustration.worldbook_placeholder")), 3)) : x("", !0)
				], 2), pe.value ? (d(), _("p", {
					key: 0,
					class: D(b(W).description),
					role: "alert"
				}, S(b(n)("settings.illustration.worldbook_unavailable")), 3)) : x("", !0)], 64)) : x("", !0),
				P(K, {
					label: b(n)("settings.illustration.wardrobe_model_label"),
					hint: Y.value === "current" ? b(n)("settings.illustration.wardrobe_model_current_hint") : b(n)("settings.illustration.wardrobe_model_hint")
				}, {
					default: O(({ fieldId: t, describedBy: n }) => [f(w("input", {
						id: t,
						"onUpdate:modelValue": u[10] ||= (e) => N.value = e,
						type: "text",
						"aria-describedby": n,
						class: D(b(W).text_input),
						disabled: !e.settings || Y.value === "current",
						"data-testid": "wardrobe-model-input",
						onBlur: L
					}, null, 42, Me), [[v, N.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			w("section", { class: D(b(W).section) }, [
				w("h2", { class: D(b(W).section_title) }, S(b(n)("settings.groups.guidance")), 3),
				P(K, {
					label: b(n)("settings.illustration.analysis_guidance_label"),
					hint: b(n)("settings.illustration.analysis_guidance_hint")
				}, {
					default: O(({ fieldId: t, describedBy: r }) => [f(w("textarea", {
						id: t,
						"onUpdate:modelValue": u[11] ||= (e) => F.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: b(n)("settings.illustration.analysis_guidance_placeholder"),
						"aria-describedby": r,
						class: D(b(W).text_area),
						disabled: !e.settings,
						"data-testid": "analysis-guidance-input",
						onBlur: u[12] ||= (e) => a({ analysis_guidance: F.value.trim() })
					}, null, 42, Ne), [[v, F.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				P(K, {
					label: b(n)("settings.illustration.wardrobe_guidance_label"),
					hint: b(n)("settings.illustration.wardrobe_guidance_hint")
				}, {
					default: O(({ fieldId: t, describedBy: r }) => [f(w("textarea", {
						id: t,
						"onUpdate:modelValue": u[13] ||= (e) => I.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: b(n)("settings.illustration.wardrobe_guidance_placeholder"),
						"aria-describedby": r,
						class: D(b(W).text_area),
						disabled: !e.settings,
						"data-testid": "wardrobe-guidance-input",
						onBlur: u[14] ||= (e) => a({ wardrobe_guidance: I.value.trim() })
					}, null, 42, Pe), [[v, I.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			w("section", { class: D(b(W).section) }, [
				w("h2", { class: D(b(W).section_title) }, S(b(n)("settings.groups.strip")), 3),
				P(K, {
					label: b(n)("settings.illustration.strip_style_label"),
					hint: b(n)("settings.illustration.strip_style_hint")
				}, {
					default: O(() => [P(X, {
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
				P(K, { label: b(n)("settings.illustration.strip_max_label") }, {
					default: O(({ fieldId: t }) => [P(Z, {
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
				P(Q, {
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
				P(K, { label: b(n)("settings.illustration.strip_style_tags_label") }, {
					default: O(({ fieldId: e }) => [P(se, {
						id: e,
						"model-value": o.value.style_tags,
						"onUpdate:modelValue": u[18] ||= (e) => s({ style_tags: e })
					}, null, 8, ["id", "model-value"])]),
					_: 1
				}, 8, ["label"]),
				P(K, {
					label: b(n)("settings.illustration.strip_no_text_label"),
					hint: b(n)("settings.illustration.strip_no_text_hint")
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [P(se, {
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
}), Re = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, ze = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function Be(e, t) {
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
var Ve = "https://novelai.net/image", He = /* @__PURE__ */ N({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let i = e, { t: s, d: c } = T(), l = E(() => {
			let e = i.profile.model_id;
			return e != null && r(e) !== null ? e : J;
		});
		function u() {
			if (i.profile.novelai_defaults !== null) return i.profile.novelai_defaults;
			let e = ie(l.value);
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
		let f = k(u());
		g(() => i.profile.id, () => {
			f.value = u();
		});
		function h(e) {
			f.value = {
				...f.value,
				...e
			};
		}
		let v = E(() => o.safeParse(f.value).success ? null : s("settings.novelai.invalid_size")), y = E(() => {
			let e = r(l.value);
			return e === null ? [] : a(e.profile, f.value);
		}), O = k(null), A = k(null), N = k(!1), F = k(!1);
		async function I() {
			F.value = !0, A.value = null, N.value = !1;
			try {
				O.value = await i.controller.load_novelai_account();
			} catch (e) {
				N.value = e instanceof Error && e.name === "ProviderNetworkError", A.value = e instanceof Error ? e.message : String(e);
			} finally {
				F.value = !1;
			}
		}
		let L = k([]);
		m(async () => {
			try {
				L.value = (await i.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				L.value = [];
			}
		});
		let ee = E(() => L.value.map((e) => ({
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
				is_default: i.profile.is_default,
				updated_at: i.profile.updated_at
			});
		}
		let z = n.options.map((e) => ({
			value: e,
			label: Re[e]
		})), te = t.options.map((e) => ({
			value: e,
			label: ze[e]
		}));
		function H(e, t, n) {
			t.includes(n) && h({ [e]: n });
		}
		let U = E(() => i.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function K(e, t) {
			let n = f.value.vibe_asset_ids.filter((t) => t !== e);
			h({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let q = k("idle");
		async function re() {
			q.value = "saving";
			try {
				await i.controller.save_novelai_defaults(i.profile.id, f.value), q.value = "saved";
			} catch {
				q.value = "failed";
			}
		}
		return (r, i) => (d(), _("div", {
			class: D(b(W).section),
			"data-testid": "novelai-settings"
		}, [w("div", { class: D(b(W).section_header) }, [w("h2", { class: D(b(W).section_title) }, S(b(s)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), w("div", { class: D(b(W).form_grid) }, [
			w("div", { class: D(b(W).actions_row) }, [P(B, {
				label: b(s)("settings.novelai.refresh_account"),
				pending: F.value,
				onClick: I
			}, null, 8, ["label", "pending"]), O.value === null ? N.value ? (d(), _("span", {
				key: 1,
				class: D(b(W).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [M(S(b(s)("settings.novelai.account_unreachable")) + " ", 1), w("a", {
				href: Ve,
				target: "_blank",
				rel: "noopener noreferrer"
			}, S(b(s)("settings.novelai.account_open_site")), 1)], 2)) : A.value === null ? x("", !0) : (d(), _("span", {
				key: 2,
				class: D(b(W).status_text)
			}, S(A.value), 3)) : (d(), _("span", {
				key: 0,
				class: D(b(W).status_text),
				"data-testid": "novelai-account"
			}, S(b(s)("settings.novelai.account_summary", {
				tier: O.value.tier,
				anlas: O.value.anlas,
				expires: b(c)(new Date(O.value.expires_at), "short_date")
			})), 3))], 2),
			w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(s)("settings.novelai.model_label")), 3), P(V, {
				"model-value": l.value,
				options: ee.value,
				placeholder: l.value,
				"aria-label": b(s)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void R(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			P(G, {
				"model-value": {
					width: f.value.width,
					height: f.value.height
				},
				"onUpdate:modelValue": i[1] ||= (e) => h(e)
			}, null, 8, ["model-value"]),
			w("div", { class: D(b(W).field_grid) }, [
				w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(s)("settings.novelai.steps_label")), 3), P(Z, {
					"model-value": f.value.steps,
					label: b(s)("settings.novelai.steps_label"),
					min: 1,
					max: 50,
					"increment-label": b(s)("common.actions.increase"),
					"decrement-label": b(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[2] ||= (e) => h({ steps: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(s)("settings.novelai.scale_label")), 3), P(Z, {
					"model-value": f.value.scale,
					label: b(s)("settings.novelai.scale_label"),
					min: 0,
					max: 10,
					step: .1,
					"increment-label": b(s)("common.actions.increase"),
					"decrement-label": b(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[3] ||= (e) => h({ scale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(s)("settings.novelai.cfg_rescale_label")), 3), P(Z, {
					"model-value": f.value.cfg_rescale,
					label: b(s)("settings.novelai.cfg_rescale_label"),
					min: 0,
					max: 1,
					step: .02,
					"increment-label": b(s)("common.actions.increase"),
					"decrement-label": b(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[4] ||= (e) => h({ cfg_rescale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(s)("settings.novelai.sampler_label")), 3), P(V, {
					"model-value": f.value.sampler,
					options: b(z),
					placeholder: b(s)("settings.novelai.sampler_label"),
					"aria-label": b(s)("settings.novelai.sampler_label"),
					"onUpdate:modelValue": i[5] ||= (e) => H("sampler", b(n).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2),
				w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(s)("settings.novelai.noise_schedule_label")), 3), P(V, {
					"model-value": f.value.noise_schedule,
					options: b(te),
					placeholder: b(s)("settings.novelai.noise_schedule_label"),
					"aria-label": b(s)("settings.novelai.noise_schedule_label"),
					"onUpdate:modelValue": i[6] ||= (e) => H("noise_schedule", b(t).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2)
			], 2),
			P(Q, {
				"model-value": f.value.smea,
				label: b(s)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[7] ||= (e) => h({ smea: e })
			}, null, 8, ["model-value", "label"]),
			P(Q, {
				"model-value": f.value.dyn,
				label: b(s)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[8] ||= (e) => h({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			P(Q, {
				"model-value": f.value.variety_plus,
				label: b(s)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[9] ||= (e) => h({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			w("h3", { class: D(b(W).section_title) }, S(b(s)("settings.novelai.vibes_title")), 3),
			U.value.length === 0 ? (d(), _("p", {
				key: 0,
				class: D(b(W).description)
			}, S(b(s)("settings.novelai.vibes_empty")), 3)) : x("", !0),
			(d(!0), _(j, null, p(U.value, (e) => (d(), C(ne, {
				key: e.id,
				"model-value": f.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => K(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			y.value.length > 0 ? (d(), _("div", {
				key: 1,
				class: D(b(W).risk_banner),
				"data-testid": "novelai-ignored"
			}, [w("p", { class: D(b(W).risk_banner_title) }, S(b(s)("settings.novelai.ignored_title")), 3), (d(!0), _(j, null, p(y.value, (e) => (d(), _("p", {
				key: e,
				class: D(b(W).risk_banner_description)
			}, S(b(Be)(b(s), e)), 3))), 128))], 2)) : x("", !0),
			v.value === null ? x("", !0) : (d(), _("p", {
				key: 2,
				class: D(b(W).status_text),
				role: "alert"
			}, S(v.value), 3)),
			w("div", { class: D(b(W).actions_row) }, [P(B, {
				label: b(s)("settings.novelai.save"),
				variant: "primary",
				pending: q.value === "saving",
				disabled: v.value !== null,
				onClick: re
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), w("span", {
				class: D(b(W).status_text),
				role: "status"
			}, S(q.value === "saved" ? b(s)("settings.novelai.saved") : q.value === "failed" ? b(s)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Ue = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function We(e, t) {
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
var Ge = ["id", "aria-describedby"], Ke = ["id", "aria-describedby"], qe = ["id", "aria-describedby"], Je = ["id", "aria-describedby"], Ye = ["id", "aria-describedby"], Xe = "http://127.0.0.1:7860", Ze = "http://127.0.0.1:8188", Qe = /* @__PURE__ */ N({
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
		let { t: a } = T(), o = k(!1), c = k(null), u = k(!1), m = k(null), h = k(null), g = k(!1), y = k(null), A = k(""), M = k(!1), N = k(null), F = k(/* @__PURE__ */ new Map()), I = Ue.map((e) => ({
			value: e,
			label: We(a, e)
		})), L = E({
			get: () => c.value?.provider_id ?? "sd_webui",
			set: (e) => {
				c.value && (c.value.provider_id = e, c.value.workflow_id = "", c.value.base_url = e === "comfyui" ? Ze : Xe, e === "novelai" && !ee.has(c.value.model_id) && (c.value.model_id = J));
			}
		}), ee = new Set(i.map((e) => e.model_id)), R = i.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		})), H = E(() => c.value?.provider_id === "sd_webui" || c.value?.provider_id === "comfyui");
		function U(e) {
			try {
				let t = s(e.trim());
				return l(t) ? t : null;
			} catch {
				return null;
			}
		}
		function G() {
			c.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "novelai",
				display_name: "",
				model_id: J,
				workflow_id: "",
				base_url: Xe,
				is_default: n.profiles.length === 0
			}, m.value = null, o.value = !0;
		}
		function ne(e) {
			c.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				base_url: e.base_url ?? "",
				is_default: e.is_default
			}, m.value = null, o.value = !0;
		}
		function q() {
			o.value = !1, c.value = null, m.value = null;
		}
		async function re() {
			let t = c.value;
			if (!t || u.value) return;
			let r = t.display_name.trim(), i = t.model_id.trim(), o = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (r.length === 0 || i.length === 0 || t.provider_id === "comfyui" && o?.success !== !0) {
				m.value = a("errors.validation_required");
				return;
			}
			let s = H.value ? U(t.base_url) : null;
			if (H.value && s === null) {
				m.value = a("settings.provider_profiles.base_url_invalid");
				return;
			}
			u.value = !0, m.value = null;
			try {
				await n.controller.save_provider_profile({
					id: t.id,
					provider_id: t.provider_id,
					display_name: r,
					model_id: i,
					workflow_id: t.provider_id === "comfyui" && o?.success === !0 ? o.data : null,
					base_url: s,
					is_default: t.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}), q();
			} catch {
				m.value = a("errors.unexpected");
			} finally {
				u.value = !1;
			}
		}
		function ie(e) {
			h.value = e;
		}
		async function Y() {
			let e = h.value;
			if (!(!e || g.value)) {
				g.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), h.value = null;
				} finally {
					g.value = !1;
				}
			}
		}
		function X(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function Z(e) {
			y.value = e, A.value = "", N.value = null;
		}
		function ae() {
			y.value = null, A.value = "", N.value = null;
		}
		async function se() {
			let e = y.value;
			if (!(!e || M.value)) {
				if (A.value.trim().length === 0) {
					N.value = a("errors.validation_required");
					return;
				}
				M.value = !0, N.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, A.value), ae();
				} catch {
					N.value = a("settings.credential_storage.unlock_required");
				} finally {
					M.value = !1, A.value = "";
				}
			}
		}
		async function le(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				y.value = e, A.value = "", N.value = a("settings.credential_storage.unlock_required");
			}
		}
		async function ue(e) {
			F.value.set(e.id, {
				pending: !0,
				label: null
			}), F.value = new Map(F.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), r = t.status === "success" ? `${a("status.success")} · ${a("settings.provider_profiles.connection_test_latency", { ms: t.latency_ms })}` : a("settings.provider_profiles.connection_test_failed", { code: t.error.code });
				F.value.set(e.id, {
					pending: !1,
					label: r
				});
			} catch {
				F.value.set(e.id, {
					pending: !1,
					label: a("errors.unexpected")
				});
			}
			F.value = new Map(F.value);
		}
		return (e, n) => (d(), _("div", {
			class: D(b(W).section),
			"data-testid": "provider-profiles"
		}, [
			w("div", { class: D(b(W).section_header) }, [w("h2", { class: D(b(W).section_title) }, S(b(a)("settings.sections.provider_profiles")), 3), P(B, {
				label: b(a)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: G
			}, null, 8, ["label", "variant"])], 2),
			P(te, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": b(a)("settings.provider_profiles.empty_description")
			}, {
				default: O(() => [w("div", null, [(d(!0), _(j, null, p(t.profiles, (e) => (d(), _("div", {
					key: e.id,
					class: D(b(W).profile_row),
					"data-testid": "provider-profile-row"
				}, [w("div", { class: D(b(W).profile_identity) }, [
					w("span", { class: D(b(W).profile_name) }, S(e.display_name), 3),
					w("span", { class: D(b(W).profile_meta) }, S(b(We)(b(a), e.provider_id)), 3),
					X(e.provider_id) ? (d(), _("span", {
						key: 0,
						class: D(b(W).profile_meta)
					}, S(e.credential_reference ? b(a)("settings.provider_profiles.credential_set") : b(a)("settings.provider_profiles.credential_unset")), 3)) : x("", !0),
					F.value.get(e.id)?.label ? (d(), _("span", {
						key: 1,
						class: D(b(W).profile_meta),
						"data-testid": "profile-test-result"
					}, S(F.value.get(e.id)?.label), 3)) : x("", !0),
					w("div", { class: D(b(W).prompt_tag_row) }, [P(z, {
						port: r(e),
						kind: "quality"
					}, null, 8, ["port"]), P(z, {
						port: r(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), w("div", { class: D(b(W).profile_actions) }, [
					e.is_default ? (d(), _("span", {
						key: 0,
						class: D(b(W).badge)
					}, S(b(a)("settings.provider_profiles.default_badge")), 3)) : x("", !0),
					P(B, {
						label: b(a)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: F.value.get(e.id)?.pending === !0,
						onClick: (t) => ue(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					X(e.provider_id) ? (d(), C(B, {
						key: 1,
						label: b(a)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => Z(e)
					}, null, 8, ["label", "onClick"])) : x("", !0),
					X(e.provider_id) && e.credential_reference !== null ? (d(), C(B, {
						key: 2,
						label: b(a)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => le(e)
					}, null, 8, ["label", "onClick"])) : x("", !0),
					P(B, {
						label: b(a)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => ne(e)
					}, null, 8, ["label", "onClick"]),
					P(B, {
						label: b(a)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => ie(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			P(ce, {
				open: o.value,
				title: c.value?.is_new ? b(a)("settings.provider_profiles.dialog_add_title") : b(a)("settings.provider_profiles.dialog_edit_title"),
				"close-label": b(a)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && q()
			}, {
				default: O(() => [c.value ? (d(), _("div", {
					key: 0,
					class: D(b(W).form_grid)
				}, [
					P(K, {
						label: b(a)("common.labels.name"),
						required: ""
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => c.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: D(b(W).text_input)
						}, null, 10, Ge), [[v, c.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					P(K, {
						label: b(a)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: O(({ fieldId: e }) => [P(V, {
							id: e,
							modelValue: L.value,
							"onUpdate:modelValue": n[1] ||= (e) => L.value = e,
							options: b(I),
							placeholder: b(a)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					c.value.provider_id === "novelai" ? (d(), C(K, {
						key: 0,
						label: b(a)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: O(({ fieldId: e }) => [P(V, {
							id: e,
							modelValue: c.value.model_id,
							"onUpdate:modelValue": n[2] ||= (e) => c.value.model_id = e,
							options: b(R),
							placeholder: b(a)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : (d(), C(K, {
						key: 1,
						label: b(a)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => c.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: D(b(W).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Ke), [[v, c.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					H.value ? (d(), C(K, {
						key: 2,
						label: b(a)("settings.provider_profiles.base_url_label"),
						hint: c.value.provider_id === "comfyui" ? b(a)("settings.provider_profiles.base_url_hint_comfyui") : b(a)("settings.provider_profiles.base_url_hint_sd_webui"),
						required: ""
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => c.value.base_url = e,
							type: "url",
							"aria-describedby": t,
							class: D(b(W).text_input),
							"data-testid": "provider-base-url-input"
						}, null, 10, qe), [[v, c.value.base_url]])]),
						_: 1
					}, 8, ["label", "hint"])) : x("", !0),
					c.value.provider_id === "comfyui" ? (d(), C(K, {
						key: 3,
						label: b(a)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => c.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: D(b(W).text_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, Je), [[v, c.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : x("", !0),
					P(Q, {
						modelValue: c.value.is_default,
						"onUpdate:modelValue": n[6] ||= (e) => c.value.is_default = e,
						label: b(a)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					m.value ? (d(), _("p", {
						key: 4,
						class: D([b(W).status_text, b(W).description]),
						"data-tone": "error"
					}, S(m.value), 3)) : x("", !0),
					w("div", { class: D(b(W).actions_row) }, [P(B, {
						label: b(a)("common.actions.save"),
						pending: u.value,
						onClick: re
					}, null, 8, ["label", "pending"]), P(B, {
						label: b(a)("common.actions.cancel"),
						variant: "secondary",
						onClick: q
					}, null, 8, ["label"])], 2)
				], 2)) : x("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			P(ce, {
				open: y.value !== null,
				title: b(a)("settings.provider_profiles.credential_dialog_title", { name: y.value?.display_name ?? "" }),
				description: b(a)("settings.provider_profiles.credential_dialog_description"),
				"close-label": b(a)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && ae()
			}, {
				default: O(() => [w("div", { class: D(b(W).form_grid) }, [P(K, {
					label: b(a)("settings.provider_profiles.credential_label"),
					error: N.value,
					required: ""
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => A.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: D(b(W).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, Ye), [[v, A.value]])]),
					_: 1
				}, 8, ["label", "error"]), w("div", { class: D(b(W).actions_row) }, [P(B, {
					label: b(a)("common.actions.save"),
					pending: M.value,
					onClick: se
				}, null, 8, ["label", "pending"]), P(B, {
					label: b(a)("common.actions.cancel"),
					variant: "secondary",
					onClick: ae
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			P(oe, {
				open: h.value !== null,
				title: b(a)("settings.provider_profiles.remove_confirm_title", { name: h.value?.display_name ?? "" }),
				description: b(a)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": b(a)("confirmations.destructive.default_confirm_action"),
				"cancel-label": b(a)("confirmations.destructive.default_cancel_action"),
				pending: g.value,
				"onUpdate:open": n[10] ||= (e) => !e && (h.value = null),
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
}), $e = ["id", "aria-describedby"], et = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], tt = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], nt = 200, rt = /* @__PURE__ */ N({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = T(), r = E(() => t.settings?.translation ?? null);
		function i(e) {
			let n = r.value;
			return n === null ? Promise.resolve() : t.controller.update_settings({ translation: {
				...n,
				...e
			} });
		}
		let a = E(() => [{
			value: "free",
			label: n("settings.translation.endpoint_free")
		}, {
			value: "pro",
			label: n("settings.translation.endpoint_pro")
		}]);
		function o(e) {
			(e === "free" || e === "pro") && i({ deepl_endpoint: e });
		}
		let s = k(""), c = k("idle");
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
		let m = E(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), h = k([]);
		g(() => r.value?.glossary, (e) => {
			h.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function y() {
			h.value.length < nt && h.value.push({
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
			class: D(b(W).section),
			"data-testid": "translation-settings"
		}, [w("div", { class: D(b(W).section_header) }, [w("h2", { class: D(b(W).section_title) }, S(b(n)("settings.nav.translation")), 3)], 2), w("div", { class: D(b(W).form_grid) }, [
			w("p", { class: D(b(W).description) }, S(b(n)("settings.translation.description")), 3),
			P(K, {
				label: b(n)("settings.translation.key_label"),
				hint: b(n)("settings.translation.key_hint")
			}, {
				default: O(({ fieldId: e, describedBy: t }) => [f(w("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: D(b(W).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, $e), [[v, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			w("div", { class: D(b(W).actions_row) }, [
				P(B, {
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
				P(B, {
					label: b(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				w("span", {
					class: D(b(W).status_text),
					role: "status"
				}, S(m.value), 3)
			], 2),
			w("div", { class: D(b(W).row) }, [w("span", { class: D(b(W).row_label) }, S(b(n)("settings.translation.endpoint_label")), 3), P(X, {
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
			w("h3", { class: D(b(W).section_title) }, S(b(n)("settings.translation.glossary_title")), 3),
			w("p", { class: D(b(W).description) }, S(b(n)("settings.translation.glossary_description")), 3),
			(d(!0), _(j, null, p(h.value, (e, t) => (d(), _("div", {
				key: t,
				class: D(b(W).actions_row),
				"data-testid": "glossary-row"
			}, [
				f(w("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": b(n)("settings.translation.glossary_source"),
					placeholder: b(n)("settings.translation.glossary_source"),
					class: D(b(W).text_input)
				}, null, 10, et), [[v, e.source]]),
				f(w("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": b(n)("settings.translation.glossary_target"),
					placeholder: b(n)("settings.translation.glossary_target"),
					class: D(b(W).text_input)
				}, null, 10, tt), [[v, e.target]]),
				P(B, {
					label: b(n)("settings.translation.glossary_remove"),
					onClick: (e) => x(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			w("div", { class: D(b(W).actions_row) }, [P(B, {
				label: b(n)("settings.translation.glossary_add"),
				disabled: h.value.length >= nt,
				onClick: y
			}, null, 8, ["label", "disabled"]), P(B, {
				label: b(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: C
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), it = ["aria-label"], at = [
	"data-selected",
	"aria-current",
	"onClick"
], ot = /* @__PURE__ */ N({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = y(() => import("./PromptView-DubARoCH.js")), n = y(() => import("./PromptTagPresetPanel-BlynfcrQ.js")), r = y(() => import("./DiagnosticsView-EmIy5wMV.js")), i = e, { t: a } = T(), o = [
			"illustration",
			"providers",
			"translation",
			"prompts",
			"general",
			"diagnostics"
		];
		function s(e) {
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
			providers: c,
			translation: ee,
			prompts: R,
			general: de,
			diagnostics: q
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
		let f = E(() => i.state.settings_section), { toasts: m, push: h, dismiss: v } = le();
		g(() => i.state.settings.update_command.status, (e, t) => {
			e === "success" && t === "pending" && h({
				title: a("settings.saved"),
				variant: "success",
				duration: 1800
			});
		});
		let O = E(() => i.state.generation.profiles.find((e) => e.id === i.state.generation.active_profile_id && e.provider_id === "novelai") ?? null);
		function k(e, t) {
			return i.controller.test_prompt_regex(e, t);
		}
		return (i, c) => (d(), _("div", {
			class: D(b(W).layout),
			"data-testid": "settings-view"
		}, [
			w("nav", {
				class: D(b(W).section_nav),
				"aria-label": b(a)("nav.settings")
			}, [(d(), _(j, null, p(o, (t) => w("button", {
				key: t,
				type: "button",
				class: D(["tc-interactive", b(W).section_nav_item]),
				"data-selected": t === f.value,
				"aria-current": t === f.value ? "page" : void 0,
				onClick: (n) => e.controller.set_settings_section(t)
			}, [P(L, {
				icon: l[t],
				size: 15
			}, null, 8, ["icon"]), w("span", null, S(s(t)), 1)], 10, at)), 64))], 10, it),
			w("div", { class: D(b(W).section_content) }, [
				w("header", { class: D(b(W).pane_head) }, [w("h1", { class: D(b(W).pane_title) }, S(s(f.value)), 3), w("p", { class: D(b(W).pane_description) }, S(u(f.value)), 3)], 2),
				e.state.settings.update_command.status === "error" ? (d(), _("p", {
					key: 0,
					class: D([b(W).status_text, b(W).description]),
					"data-tone": "error",
					role: "alert",
					"data-testid": "settings-save-failed"
				}, S(b(a)("settings.save_failed", { code: e.state.settings.update_command.failure.code })), 3)) : x("", !0),
				f.value === "prompts" ? (d(), _(j, { key: 1 }, [P(b(t), {
					state: e.state,
					"test-regex": k,
					onSelectPreset: c[0] ||= (t) => void e.controller.select_prompt_preset(t),
					onNewPreset: c[1] ||= (t) => e.controller.start_new_prompt_preset(),
					onBulkDeletePresets: c[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
					onUpdateDraft: c[3] ||= (t) => e.controller.update_prompt_draft(t),
					onSave: c[4] ||= (t) => void e.controller.save_prompt_preset(t)
				}, null, 8, ["state"]), P(b(n), {
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
					class: D(b(W).view)
				}, [f.value === "illustration" ? (d(), C(Le, {
					key: 0,
					settings: e.state.settings.settings,
					"prompt-presets": e.state.prompt.presets,
					controller: e.controller
				}, null, 8, [
					"settings",
					"prompt-presets",
					"controller"
				])) : f.value === "providers" ? (d(), _(j, { key: 1 }, [
					e.state.generation.profiles.length === 0 ? (d(), _("section", {
						key: 0,
						class: D(b(W).onboarding),
						"data-testid": "settings-onboarding",
						"aria-labelledby": "settings-onboarding-title"
					}, [w("div", {
						class: D(b(W).onboarding_icon),
						"aria-hidden": "true"
					}, [P(L, {
						icon: b(ue),
						size: 22
					}, null, 8, ["icon"])], 2), w("div", null, [
						w("p", { class: D(b(W).onboarding_label) }, S(b(a)("settings.onboarding.label")), 3),
						w("h2", {
							id: "settings-onboarding-title",
							class: D(b(W).onboarding_title)
						}, S(b(a)("settings.onboarding.title")), 3),
						w("p", { class: D(b(W).onboarding_description) }, S(b(a)("settings.onboarding.description")), 3)
					])], 2)) : x("", !0),
					P(Qe, {
						profiles: e.state.generation.profiles,
						"prompt-tag-presets": e.state.assets.records.prompt_tag,
						controller: e.controller
					}, null, 8, [
						"profiles",
						"prompt-tag-presets",
						"controller"
					]),
					O.value === null ? x("", !0) : (d(), C(He, {
						key: 1,
						profile: O.value,
						vibes: e.state.assets.records.vibe,
						controller: e.controller
					}, null, 8, [
						"profile",
						"vibes",
						"controller"
					]))
				], 64)) : f.value === "translation" ? (d(), C(rt, {
					key: 2,
					settings: e.state.settings.settings,
					controller: e.controller
				}, null, 8, ["settings", "controller"])) : f.value === "general" ? (d(), _(j, { key: 3 }, [
					P(fe, {
						settings: e.state.settings.settings,
						controller: e.controller
					}, null, 8, ["settings", "controller"]),
					P(ge, {
						settings: e.state.settings.settings,
						"vault-status": e.state.settings.browser_secret_vault,
						controller: e.controller
					}, null, 8, [
						"settings",
						"vault-status",
						"controller"
					]),
					P(xe, {
						remote: e.state.settings.settings?.vocabulary_remote ?? null,
						controller: e.controller
					}, null, 8, ["remote", "controller"])
				], 64)) : x("", !0)], 2))
			], 2),
			P(ae, {
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
export { ot as default };
