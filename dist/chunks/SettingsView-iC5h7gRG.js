import { a as e } from "./ids-pPJWL4BL.js";
import { i as t, o as n } from "./novelai-CAMu2SDf.js";
import { i as r, t as i } from "./novelai_models-CXz0Nwhv.js";
import { a, i as o, o as s, r as c, s as l, t as u } from "./server_inspection-D1w5EidV.js";
import { n as d } from "./settings-CPEkVgp_.js";
import { F as f, J as p, L as m, M as h, T as g, W as _, _ as v, a as y, b, dt as x, g as S, gt as C, h as w, m as T, n as ee, p as E, pt as D, q as O, rt as k, s as A, u as j, v as M, x as N, y as P } from "./vue-i18n-XoxYzLIP.js";
import { t as F } from "./portal_keys-CIBE-_PC.js";
import { n as I, t as L } from "./AppIcon-DD754F_c.js";
import { n as R, r as z, t as te } from "./PromptTagChips-C_ulfUkh.js";
import { t as B } from "./AppSelect-D9W90Q5V.js";
import { a as V, i as H, n as U, t as W } from "./ImageSizeField-C2fv9RrU.js";
import { t as ne } from "./AppCheckbox-BVvntDyn.js";
import { t as G } from "./FieldGroup-B_IY3tpe.js";
import { n as K, t as re } from "./workflow_target_label-qdBfYfiW.js";
import { t as ie } from "./sparkles-DIwEk888.js";
import "./browser_secret_vault-Cl9sZA7g.js";
import { b as ae, d as q, n as oe } from "./workflow_mapping-BBTT75pE.js";
import { n as se, t as ce } from "./novelai_request_defaults-DmJSc0ed.js";
import { t as le } from "./catalog_url-B1GMOf5E.js";
import { n as J, t as Y } from "./NumberStepper-BMomgGCv.js";
import { t as ue } from "./ToastViewport-DmwVzyoR.js";
import { t as de } from "./ConfirmDialog-CbzfGSo1.js";
import { t as fe } from "./TagInput-BIrlsKBu.js";
import { t as X } from "./AppSwitch-BT0FcNgF.js";
import { n as Z, t as pe } from "./StateSurface-BclMzzSh.js";
import { t as me } from "./AppDialog-BpBOf7Tt.js";
import { t as he } from "./use_toasts-BkstxFb0.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var ge = I("cable", [
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
]), _e = I("sliders-horizontal", [
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
]), ve = /* @__PURE__ */ N({
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
		return (t, r) => (f(), v("div", {
			class: D(x(U).section),
			"data-testid": "appearance-settings"
		}, [T("div", { class: D(x(U).section_header) }, [T("h2", { class: D(x(U).section_title) }, C(x(n)("settings.sections.appearance")), 3)], 2), T("div", { class: D(x(U).form_grid) }, [
			T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.appearance.theme_label")), 3), P(J, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: x(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.appearance.language_label")), 3), P(J, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: x(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.appearance.inspector_width_label")), 3), P(Y, {
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
			P(X, {
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
}), ye = ["data-tone"], Q = ["id", "aria-describedby"], be = ["id", "aria-describedby"], $ = ["id", "aria-describedby"], xe = /* @__PURE__ */ N({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = k(""), i = k(""), a = k(!1), o = k(null), s = k(!1), c = E(() => [
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
		}), d = E(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function m() {
			r.value = "", i.value = "";
		}
		function h(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function g(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function _() {
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
		async function b() {
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
		async function w() {
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
		return (t, m) => (f(), v("div", {
			class: D(x(U).section),
			"data-testid": "credential-storage-settings"
		}, [
			T("div", { class: D(x(U).section_header) }, [T("h2", { class: D(x(U).section_title) }, C(x(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (f(), v("span", {
				key: 0,
				class: D(x(U).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, C(u.value), 11, ye)) : S("", !0)], 2),
			T("div", { class: D(x(U).vault_mode_row) }, [T("div", { class: D(x(U).profile_identity) }, [T("span", { class: D(x(U).profile_name) }, C(x(n)("settings.credential_storage.mode_label")), 3), T("span", { class: D(x(U).profile_meta) }, C(x(n)("settings.credential_storage.mode_hint")), 3)], 2), P(J, {
				modelValue: l.value,
				"onUpdate:modelValue": m[0] ||= (e) => l.value = e,
				options: c.value,
				label: x(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (f(), v("div", {
				key: 0,
				class: D(x(U).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (f(), v("p", {
				key: 0,
				class: D(x(U).status_text),
				"data-tone": "error",
				role: "alert"
			}, C(d.value), 3)) : e.vaultStatus.state === "uninitialized" ? (f(), v(j, { key: 1 }, [
				P(G, {
					label: x(n)("settings.credential_storage.passphrase_label"),
					hint: x(n)("settings.credential_storage.passphrase_hint", { count: x(12) }),
					required: ""
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
						id: e,
						"onUpdate:modelValue": m[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: D(x(U).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, Q), [[y, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				P(G, {
					label: x(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
						id: e,
						"onUpdate:modelValue": m[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: D(x(U).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, be), [[y, i.value]])]),
					_: 1
				}, 8, ["label"]),
				P(Z, {
					label: x(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: _
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (f(), v(j, { key: 2 }, [P(G, {
				label: x(n)("settings.credential_storage.passphrase_label"),
				hint: x(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
					id: e,
					"onUpdate:modelValue": m[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: D(x(U).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: A(b, ["enter"])
				}, null, 42, $), [[y, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), P(Z, {
				label: x(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: b
			}, null, 8, ["label", "pending"])], 64)) : (f(), v("div", {
				key: 3,
				class: D(x(U).vault_unlocked_actions)
			}, [P(Z, {
				label: x(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: w
			}, null, 8, ["label", "pending"]), P(Z, {
				label: x(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: m[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (f(), v("p", {
				key: 4,
				class: D(x(U).status_text),
				"data-tone": "error",
				role: "alert"
			}, C(o.value), 3)) : S("", !0)], 2)) : S("", !0),
			P(de, {
				open: s.value,
				title: x(n)("settings.credential_storage.reset_confirm_title"),
				description: x(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": x(n)("settings.credential_storage.reset_action"),
				"cancel-label": x(n)("common.actions.cancel"),
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
}), Se = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Ce = ["id", "aria-describedby"], we = ["aria-label"], Te = ["aria-label"], Ee = /* @__PURE__ */ N({
	__name: "DataSettings",
	props: {
		remote: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = k(""), i = k(!1);
		_(() => t.remote?.catalog_url, (e) => {
			r.value = e ?? "";
		}, { immediate: !0 });
		async function a() {
			let e = t.remote, n = le(r.value);
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
		let u = E(() => s.value === "failed" ? n("settings.data.vocabulary_token_failed") : t.remote?.token_saved === !0 ? n("settings.data.vocabulary_token_present") : n("settings.data.vocabulary_token_absent")), d = k(!1), m = k(!1), h = k(null), g = k(null), b = k(null);
		function A() {
			b.value?.click();
		}
		function j() {
			t.controller.cancel_vocabulary_import();
		}
		async function M(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || d.value)) {
				d.value = !0, m.value = !1, h.value = null, g.value = null;
				try {
					await t.controller.import_vocabulary_package(i, (e) => {
						g.value = e;
					}), m.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					h.value = n("settings.data.vocabulary_import_error", { code: t });
				} finally {
					d.value = !1;
				}
			}
		}
		let N = E(() => {
			let e = g.value;
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
		}), F = k(!1), I = k(null);
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
		let R = k(!1), z = k(null), te = k(null);
		function B() {
			te.value?.click();
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
		return (t, g) => (f(), v("div", {
			class: D(x(U).section),
			"data-testid": "data-settings"
		}, [T("div", { class: D(x(U).section_header) }, [T("h2", { class: D(x(U).section_title) }, C(x(n)("settings.sections.data")), 3)], 2), T("div", { class: D(x(U).form_grid) }, [
			P(G, {
				label: x(n)("settings.data.vocabulary_catalog_label"),
				hint: x(n)("settings.data.vocabulary_catalog_hint")
			}, {
				default: O(({ fieldId: t, describedBy: i }) => [p(T("input", {
					id: t,
					"onUpdate:modelValue": g[0] ||= (e) => r.value = e,
					type: "url",
					autocomplete: "off",
					spellcheck: "false",
					placeholder: x(n)("settings.data.vocabulary_catalog_placeholder"),
					"aria-describedby": i,
					class: D(x(U).text_input),
					disabled: e.remote === null,
					"data-testid": "vocabulary-catalog-input",
					onChange: a
				}, null, 42, Se), [[y, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			i.value ? (f(), v("p", {
				key: 0,
				class: D([x(U).status_text, x(U).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-catalog-invalid"
			}, C(x(n)("settings.data.vocabulary_catalog_invalid")), 3)) : S("", !0),
			P(G, {
				label: x(n)("settings.data.vocabulary_token_label"),
				hint: x(n)("settings.data.vocabulary_token_hint")
			}, {
				default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
					id: e,
					"onUpdate:modelValue": g[1] ||= (e) => o.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: D(x(U).text_input),
					"data-testid": "vocabulary-token-input"
				}, null, 10, Ce), [[y, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			T("div", { class: D(x(U).actions_row) }, [
				P(Z, {
					label: x(n)("settings.data.vocabulary_token_save"),
					variant: "primary",
					pending: s.value === "saving",
					disabled: o.value.trim() === "",
					onClick: c
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				e.remote?.token_saved === !0 ? (f(), w(Z, {
					key: 0,
					label: x(n)("settings.data.vocabulary_token_clear"),
					onClick: l
				}, null, 8, ["label"])) : S("", !0),
				T("span", {
					class: D(x(U).status_text),
					role: "status"
				}, C(u.value), 3)
			], 2),
			T("div", { class: D(x(U).actions_row) }, [
				P(Z, {
					label: x(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: d.value,
					onClick: A
				}, null, 8, ["label", "pending"]),
				d.value ? (f(), w(Z, {
					key: 0,
					label: x(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: j
				}, null, 8, ["label"])) : S("", !0),
				T("input", {
					ref_key: "vocabulary_file_input",
					ref: b,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": x(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: M
				}, null, 40, we)
			], 2),
			T("p", { class: D(x(U).description) }, C(x(n)("settings.data.vocabulary_import.description")), 3),
			N.value ? (f(), v("p", {
				key: 1,
				class: D([x(U).status_text, x(U).description]),
				"data-testid": "vocabulary-import-progress"
			}, C(N.value), 3)) : S("", !0),
			m.value ? (f(), v("p", {
				key: 2,
				class: D([x(U).status_text, x(U).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, C(x(n)("settings.data.vocabulary_import.success")), 3)) : S("", !0),
			h.value ? (f(), v("p", {
				key: 3,
				class: D([x(U).status_text, x(U).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, C(h.value), 3)) : S("", !0),
			T("div", { class: D(x(U).actions_row) }, [
				P(Z, {
					label: x(n)("settings.data.archive_export_action"),
					pending: F.value,
					onClick: L
				}, null, 8, ["label", "pending"]),
				P(Z, {
					label: x(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: R.value,
					onClick: B
				}, null, 8, ["label", "pending"]),
				T("input", {
					ref_key: "file_input",
					ref: te,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": x(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: V
				}, null, 40, Te)
			], 2),
			T("p", { class: D(x(U).description) }, C(x(n)("settings.data.archive_import_description")), 3),
			I.value ? (f(), v("p", {
				key: 4,
				class: D([x(U).status_text, x(U).description]),
				"data-tone": "error"
			}, C(I.value), 3)) : S("", !0),
			z.value ? (f(), v("p", {
				key: 5,
				class: D([x(U).status_text, x(U).description]),
				"data-tone": "error"
			}, C(z.value), 3)) : S("", !0)
		], 2)], 2));
	}
}), De = ["id"], Oe = "none", ke = "default", Ae = /* @__PURE__ */ N({
	__name: "SizeSetSettings",
	props: { illustration: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = ee(), a = g(F, k(null)), o = [
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
			value: Oe,
			label: i("settings.size_sets.none")
		}, ...c.value]), u = E(() => [{
			value: ke,
			label: i("settings.size_sets.follow_default")
		}, ...l.value]), d = E(() => {
			let e = a.value;
			return e === null || !(e in n.illustration.size_set_by_chat) ? ke : n.illustration.size_set_by_chat[e] ?? Oe;
		});
		function h(e) {
			r("update", { size_set_id: e === Oe ? null : e });
		}
		function b(e) {
			let t = a.value;
			if (t === null) return;
			let i = Object.entries(n.illustration.size_set_by_chat).filter(([e]) => e !== t), o = e === ke ? i : [...i, [t, e === Oe ? null : e]];
			r("update", { size_set_by_chat: Object.fromEntries(o.slice(-100)) });
		}
		let A = k(s.value[0]?.id ?? null);
		_(s, (e) => {
			e.some((e) => e.id === A.value) || (A.value = e[0]?.id ?? null);
		});
		let M = E(() => s.value.find((e) => e.id === A.value) ?? null), N = k("");
		_(M, (e) => {
			N.value = e?.name ?? "";
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
			A.value = t.id, I([...s.value, t]);
		}
		function z() {
			let e = M.value;
			e !== null && I(s.value.filter((t) => t.id !== e.id), {
				size_set_id: n.illustration.size_set_id === e.id ? null : n.illustration.size_set_id,
				size_set_by_chat: Object.fromEntries(Object.entries(n.illustration.size_set_by_chat).filter(([, t]) => t !== e.id))
			});
		}
		function te() {
			let e = N.value.trim();
			e !== "" && e !== M.value?.name && L({ name: e });
		}
		let K = (e, t) => e.width === t.width && e.height === t.height, re = E(() => {
			let e = (M.value?.sizes ?? []).filter((e) => !H.some((t) => K(t, e)));
			return [...H, ...e];
		});
		function ie(e) {
			let t = `${V(e)} · ${String(e.width)} × ${String(e.height)}`;
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
		let oe = k({
			width: 1344,
			height: 768
		});
		function se() {
			ae(oe.value) || q(oe.value, !0);
		}
		return (t, n) => (f(), v("section", {
			class: D(x(U).section),
			"data-testid": "size-set-settings"
		}, [
			T("h2", { class: D(x(U).section_title) }, C(x(i)("settings.groups.sizes")), 3),
			T("p", { class: D(x(U).description) }, C(x(i)("settings.size_sets.hint")), 3),
			T("div", { class: D(x(U).field_grid) }, [T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(i)("settings.size_sets.default_label")), 3), P(B, {
				"model-value": e.illustration.size_set_id ?? Oe,
				options: l.value,
				placeholder: x(i)("settings.size_sets.default_label"),
				"aria-label": x(i)("settings.size_sets.default_label"),
				"onUpdate:modelValue": h
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2), x(a) === null ? S("", !0) : (f(), v("div", {
				key: 0,
				class: D(x(U).row)
			}, [T("span", { class: D(x(U).row_label) }, C(x(i)("settings.size_sets.chat_label")), 3), P(B, {
				"model-value": d.value,
				options: u.value,
				placeholder: x(i)("settings.size_sets.chat_label"),
				"aria-label": x(i)("settings.size_sets.chat_label"),
				"data-testid": "size-set-chat-select",
				"onUpdate:modelValue": b
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2))], 2),
			T("div", { class: D(x(U).actions_row) }, [
				s.value.length > 0 ? (f(), w(B, {
					key: 0,
					"model-value": A.value ?? void 0,
					options: c.value,
					placeholder: x(i)("settings.size_sets.edit_label"),
					"aria-label": x(i)("settings.size_sets.edit_label"),
					"onUpdate:modelValue": n[0] ||= (e) => A.value = e
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])) : S("", !0),
				P(Z, {
					label: x(i)("settings.size_sets.add"),
					onClick: n[1] ||= (e) => R(null)
				}, null, 8, ["label"]),
				M.value === null ? S("", !0) : (f(), w(Z, {
					key: 1,
					label: x(i)("settings.size_sets.duplicate"),
					variant: "ghost",
					onClick: n[2] ||= (e) => R(M.value)
				}, null, 8, ["label"])),
				M.value === null ? S("", !0) : (f(), w(Z, {
					key: 2,
					label: x(i)("settings.size_sets.remove"),
					variant: "destructive",
					onClick: z
				}, null, 8, ["label"]))
			], 2),
			M.value === null ? S("", !0) : (f(), v(j, { key: 0 }, [
				P(G, { label: x(i)("settings.size_sets.name_label") }, {
					default: O(({ fieldId: e }) => [p(T("input", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => N.value = e,
						type: "text",
						maxlength: "60",
						class: D(x(U).text_input),
						"data-testid": "size-set-name-input",
						onBlur: te
					}, null, 42, De), [[y, N.value]])]),
					_: 1
				}, 8, ["label"]),
				T("fieldset", {
					class: D(x(U).check_list),
					"data-testid": "size-set-sizes"
				}, [T("legend", { class: D(x(U).row_label) }, C(x(i)("settings.size_sets.sizes_label")), 3), (f(!0), v(j, null, m(re.value, (e) => (f(), w(ne, {
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
				P(W, {
					modelValue: oe.value,
					"onUpdate:modelValue": n[4] ||= (e) => oe.value = e
				}, null, 8, ["modelValue"]),
				T("div", { class: D(x(U).actions_row) }, [P(Z, {
					label: x(i)("settings.size_sets.add_custom"),
					variant: "ghost",
					disabled: ae(oe.value) || M.value.sizes.length >= 16,
					onClick: se
				}, null, 8, ["label", "disabled"])], 2)
			], 64))
		], 2));
	}
}), je = ["id", "aria-describedby"], Me = ["id", "aria-describedby"], Ne = ["id", "aria-describedby"], Pe = ["id", "aria-describedby"], Fe = ["id", "aria-describedby"], Ie = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Le = [
	"id",
	"aria-describedby",
	"disabled"
], Re = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], ze = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Be = "in_use", Ve = "none", He = /* @__PURE__ */ N({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = E(() => t.settings?.illustration ?? null);
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
		let o = E(() => r.value?.strip ?? d);
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
		}]), l = k(""), u = k(""), g = k(""), b = k(""), A = k(""), M = k(""), N = k(""), F = k("");
		_(r, (e) => {
			l.value = e === null || e.preset_name === Be ? "" : e.preset_name, M.value = e?.wardrobe_model ?? "", N.value = e?.analysis_guidance ?? "", F.value = e?.wardrobe_guidance ?? "", e?.connection.kind === "proxy_preset" ? (u.value = e.connection.proxy_preset, g.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (b.value = e.connection.api_url, A.value = e.connection.model);
		}, { immediate: !0 });
		function I() {
			a({ wardrobe_model: M.value.trim() || null });
		}
		function L() {
			a({ preset_name: l.value.trim() || Be });
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
			let e = u.value.trim();
			if (e === "") return null;
			let t = g.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function te() {
			let e = b.value.trim(), t = A.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let V = E(() => q.value === "custom" && b.value.trim() !== "" && te() === null);
		function H() {
			let e = te();
			e !== null && a({ connection: e });
		}
		let W = k(""), K = k("idle");
		async function re() {
			let e = W.value.trim();
			if (e !== "") {
				K.value = "saving";
				try {
					await t.controller.set_analysis_key(e), W.value = "", K.value = "saved";
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
		let ae = E(() => {
			switch (K.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), q = k(r.value?.connection.kind ?? "current");
		_(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (q.value = e);
		});
		function oe(e) {
			if (e === "current") q.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				q.value = "proxy_preset";
				let e = z();
				e !== null && a({ connection: e });
			} else e === "custom" && (q.value = "custom", H());
		}
		function se() {
			let e = z();
			e !== null && a({ connection: e });
		}
		let ce = E(() => [{
			value: Ve,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function le(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let ue = E(() => [{
			value: "builtin",
			label: n("settings.illustration.preset_source_builtin")
		}, {
			value: "sillytavern",
			label: n("settings.illustration.preset_source_sillytavern")
		}]);
		function de(e) {
			(e === "builtin" || e === "sillytavern") && a({ preset_source: e });
		}
		let pe = E(() => [{
			value: "auto",
			label: n("settings.illustration.structured_output_auto")
		}, {
			value: "tools",
			label: n("settings.illustration.structured_output_tools")
		}]), me = E(() => [{
			value: "preset",
			label: n("settings.illustration.reasoning_preset")
		}, {
			value: "min",
			label: n("settings.illustration.reasoning_min")
		}]);
		function he(e) {
			(e === "preset" || e === "min") && a({ analysis_reasoning: e });
		}
		function ge(e) {
			(e === "auto" || e === "tools") && a({ structured_output: e });
		}
		let _e = E(() => [
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
		]), ve = k(r.value?.world_info.mode ?? "chat");
		_(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (ve.value = e);
		});
		let ye = k([]), Q = k(!1);
		async function be() {
			try {
				ye.value = await t.controller.list_worldbooks(), Q.value = !1;
			} catch {
				Q.value = !0;
			}
		}
		h(() => {
			ve.value === "worldbook" && be();
		});
		let $ = E(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbooks : []), xe = E(() => [.../* @__PURE__ */ new Set([...ye.value, ...$.value])]);
		function Se(e) {
			e === "chat" || e === "off" ? (ve.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (ve.value = e, be());
		}
		function Ce(e, t) {
			let n = t ? [...$.value, e] : $.value.filter((t) => t !== e);
			n.length > 0 && a({ world_info: {
				mode: "worldbook",
				worldbooks: n
			} });
		}
		return (t, d) => (f(), v("div", {
			class: D(x(U).groups),
			"data-testid": "illustration-settings"
		}, [
			T("section", { class: D(x(U).section) }, [
				T("h2", { class: D(x(U).section_title) }, C(x(n)("settings.groups.generation")), 3),
				P(X, {
					"model-value": e.settings?.auto_generation_enabled ?? !1,
					label: x(n)("settings.illustration.auto_generation_label"),
					description: x(n)("settings.illustration.auto_generation_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": d[0] ||= (e) => i({ auto_generation_enabled: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				P(X, {
					"model-value": r.value?.inline_analysis ?? !1,
					label: x(n)("settings.illustration.inline_analysis_label"),
					description: x(n)("settings.illustration.inline_analysis_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": d[1] ||= (e) => a({ inline_analysis: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				T("div", { class: D(x(U).field_grid) }, [
					T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.illustration.max_images_label")), 3), P(Y, {
						"model-value": r.value?.max_images_per_message,
						label: x(n)("settings.illustration.max_images_label"),
						min: 1,
						max: 8,
						"increment-label": x(n)("common.actions.increase"),
						"decrement-label": x(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": d[2] ||= (e) => a({ max_images_per_message: e })
					}, null, 8, [
						"model-value",
						"label",
						"increment-label",
						"decrement-label",
						"disabled"
					])], 2),
					T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.illustration.prompt_preset_label")), 3), P(B, {
						"model-value": r.value?.prompt_preset_id ?? Ve,
						options: ce.value,
						placeholder: x(n)("settings.illustration.prompt_preset_label"),
						"aria-label": x(n)("settings.illustration.prompt_preset_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": le
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"aria-label",
						"disabled"
					])], 2),
					T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.illustration.concurrency_label")), 3), P(Y, {
						"model-value": e.settings?.global_concurrency,
						label: x(n)("settings.illustration.concurrency_label"),
						min: 1,
						max: 4,
						"increment-label": x(n)("common.actions.increase"),
						"decrement-label": x(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": d[3] ||= (e) => i({ global_concurrency: e })
					}, null, 8, [
						"model-value",
						"label",
						"increment-label",
						"decrement-label",
						"disabled"
					])], 2)
				], 2)
			], 2),
			r.value === null ? S("", !0) : (f(), w(Ae, {
				key: 0,
				illustration: r.value,
				onUpdate: a
			}, null, 8, ["illustration"])),
			T("section", { class: D(x(U).section) }, [
				T("h2", { class: D(x(U).section_title) }, C(x(n)("settings.groups.analysis")), 3),
				T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.illustration.connection_label")), 3), P(J, {
					"model-value": q.value,
					options: R.value,
					label: x(n)("settings.illustration.connection_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": oe
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				q.value === "proxy_preset" ? (f(), v(j, { key: 0 }, [P(G, {
					label: x(n)("settings.illustration.proxy_preset_label"),
					hint: x(n)("settings.illustration.proxy_preset_hint")
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
						id: e,
						"onUpdate:modelValue": d[4] ||= (e) => u.value = e,
						type: "text",
						"aria-describedby": t,
						class: D(x(U).text_input),
						"data-testid": "analysis-proxy-preset-input",
						onBlur: se
					}, null, 42, je), [[y, u.value]])]),
					_: 1
				}, 8, ["label", "hint"]), P(G, {
					label: x(n)("settings.illustration.proxy_model_label"),
					hint: x(n)("settings.illustration.proxy_model_hint")
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
						id: e,
						"onUpdate:modelValue": d[5] ||= (e) => g.value = e,
						type: "text",
						"aria-describedby": t,
						class: D(x(U).text_input),
						onBlur: se
					}, null, 42, Me), [[y, g.value]])]),
					_: 1
				}, 8, ["label", "hint"])], 64)) : S("", !0),
				q.value === "custom" ? (f(), v(j, { key: 1 }, [
					P(G, {
						label: x(n)("settings.illustration.custom_url_label"),
						hint: x(n)("settings.illustration.custom_url_hint"),
						error: V.value ? x(n)("settings.illustration.custom_invalid") : null
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
							id: e,
							"onUpdate:modelValue": d[6] ||= (e) => b.value = e,
							type: "url",
							placeholder: "https://",
							"aria-describedby": t,
							class: D(x(U).text_input),
							"data-testid": "analysis-custom-url-input",
							onBlur: H
						}, null, 42, Ne), [[y, b.value]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					P(G, { label: x(n)("settings.illustration.custom_model_label") }, {
						default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
							id: e,
							"onUpdate:modelValue": d[7] ||= (e) => A.value = e,
							type: "text",
							"aria-describedby": t,
							class: D(x(U).text_input),
							"data-testid": "analysis-custom-model-input",
							onBlur: H
						}, null, 42, Pe), [[y, A.value]])]),
						_: 1
					}, 8, ["label"]),
					P(G, {
						label: x(n)("settings.illustration.custom_key_label"),
						hint: x(n)("settings.illustration.custom_key_hint")
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [T("div", { class: D(x(U).input_row) }, [p(T("input", {
							id: e,
							"onUpdate:modelValue": d[8] ||= (e) => W.value = e,
							type: "password",
							autocomplete: "off",
							"aria-describedby": t,
							class: D(x(U).text_input),
							"data-testid": "analysis-custom-key-input"
						}, null, 10, Fe), [[y, W.value]]), P(Z, {
							label: x(n)("settings.illustration.custom_key_save"),
							pending: K.value === "saving",
							disabled: W.value.trim() === "",
							onClick: re
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					T("div", { class: D(x(U).actions_row) }, [P(Z, {
						label: x(n)("settings.illustration.custom_key_clear"),
						variant: "ghost",
						onClick: ie
					}, null, 8, ["label"]), T("span", {
						class: D(x(U).status_text),
						role: "status"
					}, C(ae.value), 3)], 2)
				], 64)) : S("", !0),
				P(G, {
					label: x(n)("settings.illustration.preset_source_label"),
					hint: x(n)("settings.illustration.preset_source_hint")
				}, {
					default: O(({ fieldId: t, describedBy: i }) => [P(B, {
						id: t,
						"described-by": i,
						"model-value": r.value?.preset_source ?? "builtin",
						options: ue.value,
						placeholder: x(n)("settings.illustration.preset_source_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": de
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
				r.value?.preset_source === "sillytavern" ? (f(), w(G, {
					key: 2,
					label: x(n)("settings.illustration.preset_label"),
					hint: x(n)("settings.illustration.preset_hint")
				}, {
					default: O(({ fieldId: t, describedBy: r }) => [p(T("input", {
						id: t,
						"onUpdate:modelValue": d[9] ||= (e) => l.value = e,
						type: "text",
						placeholder: x(n)("settings.illustration.preset_placeholder"),
						"aria-describedby": r,
						class: D(x(U).text_input),
						disabled: !e.settings,
						"data-testid": "analysis-preset-input",
						onBlur: L
					}, null, 42, Ie), [[y, l.value]])]),
					_: 1
				}, 8, ["label", "hint"])) : S("", !0),
				P(G, {
					label: x(n)("settings.illustration.structured_output_label"),
					hint: x(n)("settings.illustration.structured_output_hint")
				}, {
					default: O(({ fieldId: t, describedBy: i }) => [P(B, {
						id: t,
						"described-by": i,
						"model-value": r.value?.structured_output ?? "auto",
						options: pe.value,
						placeholder: x(n)("settings.illustration.structured_output_label"),
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
				P(X, {
					"model-value": r.value?.skip_thought ?? !0,
					label: x(n)("settings.illustration.skip_thought_label"),
					description: x(n)("settings.illustration.skip_thought_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": d[10] ||= (e) => a({ skip_thought: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				P(G, {
					label: x(n)("settings.illustration.reasoning_label"),
					hint: x(n)("settings.illustration.reasoning_hint")
				}, {
					default: O(({ fieldId: t, describedBy: i }) => [P(B, {
						id: t,
						"described-by": i,
						"model-value": r.value?.analysis_reasoning ?? "preset",
						options: me.value,
						placeholder: x(n)("settings.illustration.reasoning_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": he
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
				T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.illustration.chat_history_label")), 3), P(Y, {
					"model-value": r.value?.max_chat_history,
					label: x(n)("settings.illustration.chat_history_label"),
					min: 0,
					max: 20,
					"increment-label": x(n)("common.actions.increase"),
					"decrement-label": x(n)("common.actions.decrease"),
					disabled: !e.settings,
					"onUpdate:modelValue": d[11] ||= (e) => a({ max_chat_history: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label",
					"disabled"
				])], 2),
				T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.illustration.world_info_label")), 3), P(J, {
					"model-value": ve.value,
					options: _e.value,
					label: x(n)("settings.illustration.world_info_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": Se
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				T("p", { class: D(x(U).description) }, C(x(n)("settings.illustration.world_info_hint")), 3),
				ve.value === "worldbook" ? (f(), v(j, { key: 3 }, [T("fieldset", {
					class: D(x(U).check_list),
					"data-testid": "worldbook-list"
				}, [
					T("legend", { class: D(x(U).row_label) }, C(x(n)("settings.illustration.worldbook_label")), 3),
					(f(!0), v(j, null, m(xe.value, (e) => (f(), w(ne, {
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
					$.value.length === 0 ? (f(), v("p", {
						key: 0,
						class: D(x(U).description)
					}, C(x(n)("settings.illustration.worldbook_placeholder")), 3)) : S("", !0)
				], 2), Q.value ? (f(), v("p", {
					key: 0,
					class: D(x(U).description),
					role: "alert"
				}, C(x(n)("settings.illustration.worldbook_unavailable")), 3)) : S("", !0)], 64)) : S("", !0),
				P(G, {
					label: x(n)("settings.illustration.wardrobe_model_label"),
					hint: q.value === "current" ? x(n)("settings.illustration.wardrobe_model_current_hint") : x(n)("settings.illustration.wardrobe_model_hint")
				}, {
					default: O(({ fieldId: t, describedBy: n }) => [p(T("input", {
						id: t,
						"onUpdate:modelValue": d[12] ||= (e) => M.value = e,
						type: "text",
						"aria-describedby": n,
						class: D(x(U).text_input),
						disabled: !e.settings || q.value === "current",
						"data-testid": "wardrobe-model-input",
						onBlur: I
					}, null, 42, Le), [[y, M.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			T("section", { class: D(x(U).section) }, [
				T("h2", { class: D(x(U).section_title) }, C(x(n)("settings.groups.guidance")), 3),
				P(G, {
					label: x(n)("settings.illustration.analysis_guidance_label"),
					hint: x(n)("settings.illustration.analysis_guidance_hint")
				}, {
					default: O(({ fieldId: t, describedBy: r }) => [p(T("textarea", {
						id: t,
						"onUpdate:modelValue": d[13] ||= (e) => N.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: x(n)("settings.illustration.analysis_guidance_placeholder"),
						"aria-describedby": r,
						class: D(x(U).text_area),
						disabled: !e.settings,
						"data-testid": "analysis-guidance-input",
						onBlur: d[14] ||= (e) => a({ analysis_guidance: N.value.trim() })
					}, null, 42, Re), [[y, N.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				P(G, {
					label: x(n)("settings.illustration.wardrobe_guidance_label"),
					hint: x(n)("settings.illustration.wardrobe_guidance_hint")
				}, {
					default: O(({ fieldId: t, describedBy: r }) => [p(T("textarea", {
						id: t,
						"onUpdate:modelValue": d[15] ||= (e) => F.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: x(n)("settings.illustration.wardrobe_guidance_placeholder"),
						"aria-describedby": r,
						class: D(x(U).text_area),
						disabled: !e.settings,
						"data-testid": "wardrobe-guidance-input",
						onBlur: d[16] ||= (e) => a({ wardrobe_guidance: F.value.trim() })
					}, null, 42, ze), [[y, F.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			T("section", { class: D(x(U).section) }, [
				T("h2", { class: D(x(U).section_title) }, C(x(n)("settings.groups.strip")), 3),
				P(G, {
					label: x(n)("settings.illustration.strip_style_label"),
					hint: x(n)("settings.illustration.strip_style_hint")
				}, {
					default: O(() => [P(J, {
						"model-value": o.value.style,
						options: c.value,
						label: x(n)("settings.illustration.strip_style_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": d[17] ||= (e) => s({ style: e === "default" ? "default" : "strip" })
					}, null, 8, [
						"model-value",
						"options",
						"label",
						"disabled"
					])]),
					_: 1
				}, 8, ["label", "hint"]),
				P(G, { label: x(n)("settings.illustration.strip_max_label") }, {
					default: O(({ fieldId: t }) => [P(Y, {
						id: t,
						"model-value": o.value.max_panels,
						label: x(n)("settings.illustration.strip_max_label"),
						min: 1,
						max: 12,
						"increment-label": x(n)("common.actions.increase"),
						"decrement-label": x(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": d[18] ||= (e) => s({ max_panels: e ?? o.value.max_panels })
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
				P(X, {
					"model-value": o.value.symbol_bubbles,
					label: x(n)("settings.illustration.strip_bubbles_label"),
					description: x(n)("settings.illustration.strip_bubbles_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": d[19] ||= (e) => s({ symbol_bubbles: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				P(G, { label: x(n)("settings.illustration.strip_style_tags_label") }, {
					default: O(({ fieldId: e }) => [P(fe, {
						id: e,
						"model-value": o.value.style_tags,
						"onUpdate:modelValue": d[20] ||= (e) => s({ style_tags: e })
					}, null, 8, ["id", "model-value"])]),
					_: 1
				}, 8, ["label"]),
				P(G, {
					label: x(n)("settings.illustration.strip_no_text_label"),
					hint: x(n)("settings.illustration.strip_no_text_hint")
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [P(fe, {
						id: e,
						"model-value": o.value.no_text_tags,
						"described-by": t,
						"onUpdate:modelValue": d[21] ||= (e) => s({ no_text_tags: e })
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
}), Ue = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, We = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function Ge(e, t) {
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
var Ke = "https://novelai.net/image", qe = /* @__PURE__ */ N({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let i = e, { t: a, d: o } = ee(), c = E(() => {
			let e = i.profile.model_id;
			return e != null && r(e) !== null ? e : ce;
		});
		function u() {
			if (i.profile.novelai_defaults !== null) return i.profile.novelai_defaults;
			let e = se(c.value);
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
		let d = k(u());
		_(() => i.profile.id, () => {
			d.value = u();
		});
		function p(e) {
			d.value = {
				...d.value,
				...e
			};
		}
		let g = E(() => s.safeParse(d.value).success ? null : a("settings.novelai.invalid_size")), y = E(() => {
			let e = r(c.value);
			return e === null ? [] : l(e.profile, d.value);
		}), b = k(null), O = k(null), A = k(!1), N = k(!1);
		async function F() {
			N.value = !0, O.value = null, A.value = !1;
			try {
				b.value = await i.controller.load_novelai_account();
			} catch (e) {
				A.value = e instanceof Error && e.name === "ProviderNetworkError", O.value = e instanceof Error ? e.message : String(e);
			} finally {
				N.value = !1;
			}
		}
		let I = k([]);
		h(async () => {
			try {
				I.value = (await i.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				I.value = [];
			}
		});
		let L = E(() => I.value.map((e) => ({
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
			label: Ue[e]
		})), te = t.options.map((e) => ({
			value: e,
			label: We[e]
		}));
		function V(e, t, n) {
			t.includes(n) && p({ [e]: n });
		}
		let H = E(() => i.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function G(e, t) {
			let n = d.value.vibe_asset_ids.filter((t) => t !== e);
			p({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let K = k("idle");
		async function re() {
			K.value = "saving";
			try {
				await i.controller.save_novelai_defaults(i.profile.id, d.value), K.value = "saved";
			} catch {
				K.value = "failed";
			}
		}
		return (r, i) => (f(), v("div", {
			class: D(x(U).section),
			"data-testid": "novelai-settings"
		}, [T("div", { class: D(x(U).section_header) }, [T("h2", { class: D(x(U).section_title) }, C(x(a)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), T("div", { class: D(x(U).form_grid) }, [
			T("div", { class: D(x(U).actions_row) }, [P(Z, {
				label: x(a)("settings.novelai.refresh_account"),
				pending: N.value,
				onClick: F
			}, null, 8, ["label", "pending"]), b.value === null ? A.value ? (f(), v("span", {
				key: 1,
				class: D(x(U).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [M(C(x(a)("settings.novelai.account_unreachable")) + " ", 1), T("a", {
				href: Ke,
				target: "_blank",
				rel: "noopener noreferrer"
			}, C(x(a)("settings.novelai.account_open_site")), 1)], 2)) : O.value === null ? S("", !0) : (f(), v("span", {
				key: 2,
				class: D(x(U).status_text)
			}, C(O.value), 3)) : (f(), v("span", {
				key: 0,
				class: D(x(U).status_text),
				"data-testid": "novelai-account"
			}, C(x(a)("settings.novelai.account_summary", {
				tier: b.value.tier,
				anlas: b.value.anlas,
				expires: x(o)(new Date(b.value.expires_at), "short_date")
			})), 3))], 2),
			T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(a)("settings.novelai.model_label")), 3), P(B, {
				"model-value": c.value,
				options: L.value,
				placeholder: c.value,
				"aria-label": x(a)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void R(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			P(W, {
				"model-value": {
					width: d.value.width,
					height: d.value.height
				},
				"onUpdate:modelValue": i[1] ||= (e) => p(e)
			}, null, 8, ["model-value"]),
			T("div", { class: D(x(U).field_grid) }, [
				T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(a)("settings.novelai.steps_label")), 3), P(Y, {
					"model-value": d.value.steps,
					label: x(a)("settings.novelai.steps_label"),
					min: 1,
					max: 50,
					"increment-label": x(a)("common.actions.increase"),
					"decrement-label": x(a)("common.actions.decrease"),
					"onUpdate:modelValue": i[2] ||= (e) => p({ steps: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(a)("settings.novelai.scale_label")), 3), P(Y, {
					"model-value": d.value.scale,
					label: x(a)("settings.novelai.scale_label"),
					min: 0,
					max: 10,
					step: .1,
					"increment-label": x(a)("common.actions.increase"),
					"decrement-label": x(a)("common.actions.decrease"),
					"onUpdate:modelValue": i[3] ||= (e) => p({ scale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(a)("settings.novelai.cfg_rescale_label")), 3), P(Y, {
					"model-value": d.value.cfg_rescale,
					label: x(a)("settings.novelai.cfg_rescale_label"),
					min: 0,
					max: 1,
					step: .02,
					"increment-label": x(a)("common.actions.increase"),
					"decrement-label": x(a)("common.actions.decrease"),
					"onUpdate:modelValue": i[4] ||= (e) => p({ cfg_rescale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(a)("settings.novelai.sampler_label")), 3), P(B, {
					"model-value": d.value.sampler,
					options: x(z),
					placeholder: x(a)("settings.novelai.sampler_label"),
					"aria-label": x(a)("settings.novelai.sampler_label"),
					"onUpdate:modelValue": i[5] ||= (e) => V("sampler", x(n).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2),
				T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(a)("settings.novelai.noise_schedule_label")), 3), P(B, {
					"model-value": d.value.noise_schedule,
					options: x(te),
					placeholder: x(a)("settings.novelai.noise_schedule_label"),
					"aria-label": x(a)("settings.novelai.noise_schedule_label"),
					"onUpdate:modelValue": i[6] ||= (e) => V("noise_schedule", x(t).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2)
			], 2),
			P(X, {
				"model-value": d.value.smea,
				label: x(a)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[7] ||= (e) => p({ smea: e })
			}, null, 8, ["model-value", "label"]),
			P(X, {
				"model-value": d.value.dyn,
				label: x(a)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[8] ||= (e) => p({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			P(X, {
				"model-value": d.value.variety_plus,
				label: x(a)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[9] ||= (e) => p({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			T("h3", { class: D(x(U).section_title) }, C(x(a)("settings.novelai.vibes_title")), 3),
			H.value.length === 0 ? (f(), v("p", {
				key: 0,
				class: D(x(U).description)
			}, C(x(a)("settings.novelai.vibes_empty")), 3)) : S("", !0),
			(f(!0), v(j, null, m(H.value, (e) => (f(), w(ne, {
				key: e.id,
				"model-value": d.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => G(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			y.value.length > 0 ? (f(), v("div", {
				key: 1,
				class: D(x(U).risk_banner),
				"data-testid": "novelai-ignored"
			}, [T("p", { class: D(x(U).risk_banner_title) }, C(x(a)("settings.novelai.ignored_title")), 3), (f(!0), v(j, null, m(y.value, (e) => (f(), v("p", {
				key: e,
				class: D(x(U).risk_banner_description)
			}, C(x(Ge)(x(a), e)), 3))), 128))], 2)) : S("", !0),
			g.value === null ? S("", !0) : (f(), v("p", {
				key: 2,
				class: D(x(U).status_text),
				role: "alert"
			}, C(g.value), 3)),
			T("div", { class: D(x(U).actions_row) }, [P(Z, {
				label: x(a)("settings.novelai.save"),
				variant: "primary",
				pending: K.value === "saving",
				disabled: g.value !== null,
				onClick: re
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), T("span", {
				class: D(x(U).status_text),
				role: "status"
			}, C(K.value === "saved" ? x(a)("settings.novelai.saved") : K.value === "failed" ? x(a)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Je = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Ye(e, t) {
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
var Xe = ["id", "aria-describedby"], Ze = ["id", "aria-describedby"], Qe = ["id", "aria-describedby"], $e = [
	"id",
	"value",
	"step",
	"placeholder",
	"aria-describedby",
	"data-testid",
	"onInput"
], et = [
	"value",
	"aria-label",
	"onInput"
], tt = {
	key: 2,
	"data-testid": "comfyui-inspection"
}, nt = ["id", "aria-describedby"], rt = "keep-workflow-value", it = "workflow", at = "http://127.0.0.1:7860", ot = "http://127.0.0.1:8188", st = /* @__PURE__ */ N({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		promptTagPresets: {},
		workflows: {},
		activeProfileId: {},
		controller: {}
	},
	setup(t) {
		let n = t, r = E(() => n.profiles.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), a = E({
			get: () => n.profiles.some((e) => e.id === n.activeProfileId) ? n.activeProfileId ?? "" : "",
			set: (e) => {
				let t = n.profiles.find((t) => t.id === e);
				t !== void 0 && n.controller.set_active_provider_profile(t.id);
			}
		});
		function s(e) {
			return {
				profile: e,
				custom_presets: n.promptTagPresets,
				save: (e, t) => n.controller.save_prompt_tags(e, t)
			};
		}
		let { t: l } = ee();
		function d(e) {
			return u.some((t) => t === e);
		}
		function h(e) {
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
		function g(e) {
			return (e?.loras ?? []).map((e) => ({
				lora_name: e.lora_name,
				strength: e.strength.toString()
			}));
		}
		function b(e, t) {
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
		let A = k(!1), M = k(null), N = k(!1), F = k(null), I = k(null), L = k(!1), R = k(null), z = k(""), V = k(!1), H = k(null), W = k(/* @__PURE__ */ new Map()), ne = Je.map((e) => ({
			value: e,
			label: Ye(l, e)
		})), K = E({
			get: () => M.value?.provider_id ?? "sd_webui",
			set: (e) => {
				M.value && (M.value.provider_id = e, M.value.workflow_id = "", Q.value = null, $.value = null, M.value.base_url = e === "comfyui" ? ot : at, e === "novelai" && !ie.has(M.value.model_id) && (M.value.model_id = ce));
			}
		}), ie = new Set(i.map((e) => e.model_id)), se = i.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		})), le = E(() => M.value?.provider_id === "sd_webui" || M.value?.provider_id === "comfyui"), J = E(() => n.workflows.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), Y = E(() => {
			let e = n.workflows.find((e) => e.id === M.value?.workflow_id);
			if (e === void 0) return null;
			try {
				return q(e.payload);
			} catch {
				return null;
			}
		}), ue = E(() => oe.filter((e) => Y.value?.mapping.inputs[e] !== void 0));
		function fe(e) {
			let t = Y.value === null ? null : ae(Y.value, e);
			return t === null ? "" : t.toString();
		}
		function X(e) {
			let t = M.value?.comfyui[e] ?? "", n = Q.value?.options[e] ?? [];
			return [{
				value: rt,
				label: l("settings.provider_profiles.comfyui.keep_workflow_value", { value: fe(e) })
			}, ...[.../* @__PURE__ */ new Set([...t === "" ? [] : [t], ...n])].map((e) => ({
				value: e,
				label: e
			}))];
		}
		function he(e, t) {
			M.value && (M.value.comfyui[e] = t === rt ? "" : t);
		}
		let ge = E(() => Y.value?.mapping.lora_model !== void 0);
		function _e(e) {
			let t = Q.value?.lora_names ?? [];
			return [.../* @__PURE__ */ new Set([...e === "" ? [] : [e], ...t])].map((e) => ({
				value: e,
				label: e
			}));
		}
		function ve() {
			M.value?.loras.push({
				lora_name: "",
				strength: "1"
			});
		}
		function ye(e) {
			M.value?.loras.splice(e, 1);
		}
		let Q = k(null), be = k(!1), $ = k(null), xe = E(() => {
			let e = Q.value?.lora_names ?? [];
			return ge.value && e.length > 0 ? [...new Set((M.value?.loras ?? []).map((e) => e.lora_name).filter((t) => t !== "" && !e.includes(t)))] : [];
		}), Se = E(() => {
			let e = Q.value;
			return e === null ? [] : Y.value === null || M.value === null ? e.missing_values : c(e, Y.value, M.value.comfyui);
		}), Ce;
		_(() => M.value?.provider_id === "comfyui" ? `${M.value.base_url}\n${M.value.workflow_id}` : null, (e) => {
			clearTimeout(Ce), e !== null && Te(M.value?.base_url ?? "") !== null && (Ce = setTimeout(() => void we(), 600));
		});
		async function we() {
			let t = M.value;
			if (!t || be.value) return;
			let r = Te(t.base_url);
			if (r === null) {
				$.value = l("settings.provider_profiles.base_url_invalid");
				return;
			}
			let i = e.safeParse(t.workflow_id);
			be.value = !0, $.value = null, Q.value = null;
			try {
				Q.value = await n.controller.inspect_comfyui({
					base_url: r,
					workflow_id: i.success ? i.data : null
				});
			} catch {
				$.value = l("settings.provider_profiles.comfyui.unreachable");
			} finally {
				be.value = !1;
			}
		}
		function Te(e) {
			try {
				return o(e.trim());
			} catch {
				return null;
			}
		}
		function Ee() {
			M.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "novelai",
				display_name: "",
				model_id: ce,
				workflow_id: "",
				base_url: at,
				comfyui: h(null),
				loras: []
			}, F.value = null, Q.value = null, $.value = null, A.value = !0;
		}
		function De(e) {
			M.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				base_url: e.base_url ?? "",
				comfyui: h(e.comfyui_defaults),
				loras: g(e.comfyui_defaults)
			}, F.value = null, Q.value = null, $.value = null, A.value = !0;
		}
		function Oe() {
			A.value = !1, M.value = null, F.value = null;
		}
		async function ke() {
			let t = M.value;
			if (!t || N.value) return;
			let r = t.display_name.trim(), i = t.provider_id === "comfyui" ? it : t.model_id.trim(), a = b(t.comfyui, t.loras);
			if (t.provider_id === "comfyui" && a === null) {
				F.value = l("settings.provider_profiles.comfyui.number_invalid");
				return;
			}
			let o = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (r.length === 0 || i.length === 0 || t.provider_id === "comfyui" && o?.success !== !0) {
				F.value = l("errors.validation_required");
				return;
			}
			let s = le.value ? Te(t.base_url) : null;
			if (le.value && s === null) {
				F.value = l("settings.provider_profiles.base_url_invalid");
				return;
			}
			N.value = !0, F.value = null;
			try {
				await n.controller.save_provider_profile({
					id: t.id,
					provider_id: t.provider_id,
					display_name: r,
					model_id: i,
					workflow_id: t.provider_id === "comfyui" && o?.success === !0 ? o.data : null,
					base_url: s,
					updated_at: (/* @__PURE__ */ new Date()).toISOString(),
					...t.provider_id === "comfyui" && a !== null ? { comfyui_defaults: a } : {}
				}), Oe();
			} catch {
				F.value = l("errors.unexpected");
			} finally {
				N.value = !1;
			}
		}
		function Ae(e) {
			I.value = e;
		}
		async function je() {
			let e = I.value;
			if (!(!e || L.value)) {
				L.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), I.value = null;
				} finally {
					L.value = !1;
				}
			}
		}
		function Me(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function Ne(e) {
			R.value = e, z.value = "", H.value = null;
		}
		function Pe() {
			R.value = null, z.value = "", H.value = null;
		}
		async function Fe() {
			let e = R.value;
			if (!(!e || V.value)) {
				if (z.value.trim().length === 0) {
					H.value = l("errors.validation_required");
					return;
				}
				V.value = !0, H.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, z.value), Pe();
				} catch {
					H.value = l("settings.credential_storage.unlock_required");
				} finally {
					V.value = !1, z.value = "";
				}
			}
		}
		async function Ie(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				R.value = e, z.value = "", H.value = l("settings.credential_storage.unlock_required");
			}
		}
		async function Le(e) {
			W.value.set(e.id, {
				pending: !0,
				label: null
			}), W.value = new Map(W.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), r = t.status === "success" ? `${l("status.success")} · ${l("settings.provider_profiles.connection_test_latency", { ms: t.latency_ms })}` : l("settings.provider_profiles.connection_test_failed", { code: t.error.code });
				W.value.set(e.id, {
					pending: !1,
					label: r
				});
			} catch {
				W.value.set(e.id, {
					pending: !1,
					label: l("errors.unexpected")
				});
			}
			W.value = new Map(W.value);
		}
		return (e, n) => (f(), v("div", {
			class: D(x(U).section),
			"data-testid": "provider-profiles"
		}, [
			T("div", { class: D(x(U).section_header) }, [T("h2", { class: D(x(U).section_title) }, C(x(l)("settings.sections.provider_profiles")), 3), P(Z, {
				label: x(l)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: Ee
			}, null, 8, ["label", "variant"])], 2),
			t.profiles.length > 0 ? (f(), w(G, {
				key: 0,
				label: x(l)("settings.provider_profiles.active_label"),
				hint: x(l)("settings.provider_profiles.active_hint")
			}, {
				default: O(({ fieldId: e }) => [P(B, {
					id: e,
					modelValue: a.value,
					"onUpdate:modelValue": n[0] ||= (e) => a.value = e,
					options: r.value,
					placeholder: x(l)("settings.provider_profiles.active_label")
				}, null, 8, [
					"id",
					"modelValue",
					"options",
					"placeholder"
				])]),
				_: 1
			}, 8, ["label", "hint"])) : S("", !0),
			P(pe, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": x(l)("settings.provider_profiles.empty_description")
			}, {
				default: O(() => [T("div", null, [(f(!0), v(j, null, m(t.profiles, (e) => (f(), v("div", {
					key: e.id,
					class: D(x(U).profile_row),
					"data-testid": "provider-profile-row"
				}, [T("div", { class: D(x(U).profile_identity) }, [
					T("span", { class: D(x(U).profile_name) }, C(e.display_name), 3),
					T("span", { class: D(x(U).profile_meta) }, C(x(Ye)(x(l), e.provider_id)), 3),
					Me(e.provider_id) ? (f(), v("span", {
						key: 0,
						class: D(x(U).profile_meta)
					}, C(e.credential_reference ? x(l)("settings.provider_profiles.credential_set") : x(l)("settings.provider_profiles.credential_unset")), 3)) : S("", !0),
					W.value.get(e.id)?.label ? (f(), v("span", {
						key: 1,
						class: D(x(U).profile_meta),
						"data-testid": "profile-test-result"
					}, C(W.value.get(e.id)?.label), 3)) : S("", !0),
					T("div", { class: D(x(U).prompt_tag_row) }, [P(te, {
						port: s(e),
						kind: "quality"
					}, null, 8, ["port"]), P(te, {
						port: s(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), T("div", { class: D(x(U).profile_actions) }, [
					e.id === t.activeProfileId ? (f(), v("span", {
						key: 0,
						class: D(x(U).badge)
					}, C(x(l)("settings.provider_profiles.active_badge")), 3)) : S("", !0),
					P(Z, {
						label: x(l)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: W.value.get(e.id)?.pending === !0,
						onClick: (t) => Le(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					Me(e.provider_id) ? (f(), w(Z, {
						key: 1,
						label: x(l)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => Ne(e)
					}, null, 8, ["label", "onClick"])) : S("", !0),
					Me(e.provider_id) && e.credential_reference !== null ? (f(), w(Z, {
						key: 2,
						label: x(l)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => Ie(e)
					}, null, 8, ["label", "onClick"])) : S("", !0),
					P(Z, {
						label: x(l)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => De(e)
					}, null, 8, ["label", "onClick"]),
					P(Z, {
						label: x(l)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => Ae(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			P(me, {
				open: A.value,
				title: M.value?.is_new ? x(l)("settings.provider_profiles.dialog_add_title") : x(l)("settings.provider_profiles.dialog_edit_title"),
				"close-label": x(l)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && Oe()
			}, {
				default: O(() => [M.value ? (f(), v("div", {
					key: 0,
					class: D(x(U).form_grid)
				}, [
					P(G, {
						label: x(l)("common.labels.name"),
						required: ""
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
							id: e,
							"onUpdate:modelValue": n[1] ||= (e) => M.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: D(x(U).text_input)
						}, null, 10, Xe), [[y, M.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					P(G, {
						label: x(l)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: O(({ fieldId: e }) => [P(B, {
							id: e,
							modelValue: K.value,
							"onUpdate:modelValue": n[2] ||= (e) => K.value = e,
							options: x(ne),
							placeholder: x(l)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					M.value.provider_id === "novelai" ? (f(), w(G, {
						key: 0,
						label: x(l)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: O(({ fieldId: e }) => [P(B, {
							id: e,
							modelValue: M.value.model_id,
							"onUpdate:modelValue": n[3] ||= (e) => M.value.model_id = e,
							options: x(se),
							placeholder: x(l)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : M.value.provider_id === "comfyui" ? S("", !0) : (f(), w(G, {
						key: 1,
						label: x(l)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => M.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: D(x(U).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Ze), [[y, M.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					le.value ? (f(), w(G, {
						key: 2,
						label: x(l)("settings.provider_profiles.base_url_label"),
						hint: M.value.provider_id === "comfyui" ? x(l)("settings.provider_profiles.base_url_hint_comfyui") : x(l)("settings.provider_profiles.base_url_hint_sd_webui"),
						required: ""
					}, {
						default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => M.value.base_url = e,
							type: "url",
							"aria-describedby": t,
							class: D(x(U).text_input),
							"data-testid": "provider-base-url-input"
						}, null, 10, Qe), [[y, M.value.base_url]])]),
						_: 1
					}, 8, ["label", "hint"])) : S("", !0),
					M.value.provider_id === "comfyui" ? (f(), w(G, {
						key: 3,
						label: x(l)("settings.provider_profiles.workflow_label"),
						hint: J.value.length === 0 ? x(l)("settings.provider_profiles.comfyui.no_workflows") : void 0,
						required: ""
					}, {
						default: O(({ fieldId: e }) => [P(B, {
							id: e,
							modelValue: M.value.workflow_id,
							"onUpdate:modelValue": n[6] ||= (e) => M.value.workflow_id = e,
							options: J.value,
							placeholder: x(l)("settings.provider_profiles.workflow_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"])) : S("", !0),
					M.value.provider_id === "comfyui" ? (f(), v(j, { key: 4 }, [
						(f(!0), v(j, null, m(ue.value, (e) => (f(), v(j, { key: e }, [d(e) ? (f(), w(G, {
							key: 0,
							label: x(re)(x(l), e)
						}, {
							default: O(({ fieldId: t }) => [P(B, {
								id: t,
								"model-value": M.value.comfyui[e] || rt,
								options: X(e),
								placeholder: x(re)(x(l), e),
								"onUpdate:modelValue": (t) => he(e, t)
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder",
								"onUpdate:modelValue"
							])]),
							_: 2
						}, 1032, ["label"])) : (f(), w(G, {
							key: 1,
							label: x(re)(x(l), e),
							hint: x(l)("settings.provider_profiles.comfyui.default_hint", { value: fe(e) })
						}, {
							default: O(({ fieldId: t, describedBy: n }) => [T("input", {
								id: t,
								value: M.value.comfyui[e],
								type: "number",
								step: e === "cfg" ? "any" : 1,
								placeholder: fe(e),
								"aria-describedby": n,
								class: D(x(U).text_input),
								"data-testid": `comfyui-default-${e}`,
								onInput: (t) => {
									M.value !== null && (M.value.comfyui[e] = t.target.value);
								}
							}, null, 42, $e)]),
							_: 2
						}, 1032, ["label", "hint"]))], 64))), 128)),
						Y.value === null ? S("", !0) : (f(), w(G, {
							key: 0,
							label: x(l)("settings.provider_profiles.comfyui.loras_label"),
							hint: ge.value ? x(l)("settings.provider_profiles.comfyui.loras_hint") : x(l)("settings.provider_profiles.comfyui.loras_unmapped")
						}, {
							default: O(() => [T("div", {
								class: D(x(U).form_grid),
								"data-testid": "comfyui-loras"
							}, [(f(!0), v(j, null, m(M.value.loras, (e, t) => (f(), v("div", {
								key: t,
								class: D(x(U).lora_row),
								"data-testid": "comfyui-lora-row"
							}, [
								P(B, {
									modelValue: e.lora_name,
									"onUpdate:modelValue": (t) => e.lora_name = t,
									options: _e(e.lora_name),
									placeholder: x(l)("settings.provider_profiles.comfyui.lora_placeholder"),
									ariaLabel: x(l)("settings.provider_profiles.comfyui.lora_placeholder")
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"placeholder",
									"ariaLabel"
								]),
								T("input", {
									value: e.strength,
									type: "number",
									step: "0.05",
									"aria-label": x(l)("settings.provider_profiles.comfyui.lora_strength_label"),
									class: D(x(U).text_input),
									onInput: (t) => e.strength = t.target.value
								}, null, 42, et),
								P(Z, {
									label: x(l)("common.actions.delete"),
									variant: "ghost",
									onClick: (e) => ye(t)
								}, null, 8, ["label", "onClick"])
							], 2))), 128)), T("div", { class: D(x(U).actions_row) }, [P(Z, {
								label: x(l)("settings.provider_profiles.comfyui.add_lora_action"),
								variant: "secondary",
								disabled: !ge.value,
								"data-testid": "comfyui-add-lora",
								onClick: ve
							}, null, 8, ["label", "disabled"])], 2)], 2)]),
							_: 1
						}, 8, ["label", "hint"])),
						T("div", { class: D(x(U).actions_row) }, [P(Z, {
							label: x(l)("settings.provider_profiles.comfyui.inspect_action"),
							variant: "secondary",
							pending: be.value,
							"data-testid": "comfyui-inspect",
							onClick: we
						}, null, 8, ["label", "pending"])], 2),
						$.value ? (f(), v("p", {
							key: 1,
							class: D([x(U).status_text, x(U).description]),
							"data-tone": "error"
						}, C($.value), 3)) : S("", !0),
						Q.value ? (f(), v("div", tt, [
							T("p", { class: D([x(U).status_text, x(U).description]) }, C(x(l)("settings.provider_profiles.comfyui.connected", { version: Q.value.version ?? "?" })), 3),
							Q.value.missing_node_types.length > 0 ? (f(), v("p", {
								key: 0,
								class: D([x(U).status_text, x(U).description]),
								"data-tone": "error"
							}, C(x(l)("settings.provider_profiles.comfyui.missing_nodes", { names: Q.value.missing_node_types.join(", ") })), 3)) : S("", !0),
							(f(!0), v(j, null, m(Se.value, (e) => (f(), v("p", {
								key: `${e.node_id}:${e.property}`,
								class: D([x(U).status_text, x(U).description]),
								"data-tone": "error"
							}, C(x(l)("settings.provider_profiles.comfyui.missing_value", {
								node: e.node_id,
								class_type: e.class_type,
								property: e.property,
								value: e.value
							})), 3))), 128)),
							(f(!0), v(j, null, m(xe.value, (e) => (f(), v("p", {
								key: `lora:${e}`,
								class: D([x(U).status_text, x(U).description]),
								"data-tone": "error"
							}, C(x(l)("settings.provider_profiles.comfyui.missing_lora", { value: e })), 3))), 128)),
							M.value.workflow_id !== "" && xe.value.length === 0 && Q.value.missing_node_types.length === 0 && Se.value.length === 0 ? (f(), v("p", {
								key: 1,
								class: D([x(U).status_text, x(U).description])
							}, C(x(l)("settings.provider_profiles.comfyui.workflow_ready")), 3)) : S("", !0)
						])) : S("", !0)
					], 64)) : S("", !0),
					F.value ? (f(), v("p", {
						key: 5,
						class: D([x(U).status_text, x(U).description]),
						"data-tone": "error"
					}, C(F.value), 3)) : S("", !0),
					T("div", { class: D(x(U).actions_row) }, [P(Z, {
						label: x(l)("common.actions.save"),
						pending: N.value,
						onClick: ke
					}, null, 8, ["label", "pending"]), P(Z, {
						label: x(l)("common.actions.cancel"),
						variant: "secondary",
						onClick: Oe
					}, null, 8, ["label"])], 2)
				], 2)) : S("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			P(me, {
				open: R.value !== null,
				title: x(l)("settings.provider_profiles.credential_dialog_title", { name: R.value?.display_name ?? "" }),
				description: x(l)("settings.provider_profiles.credential_dialog_description"),
				"close-label": x(l)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && Pe()
			}, {
				default: O(() => [T("div", { class: D(x(U).form_grid) }, [P(G, {
					label: x(l)("settings.provider_profiles.credential_label"),
					error: H.value,
					required: ""
				}, {
					default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => z.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: D(x(U).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, nt), [[y, z.value]])]),
					_: 1
				}, 8, ["label", "error"]), T("div", { class: D(x(U).actions_row) }, [P(Z, {
					label: x(l)("common.actions.save"),
					pending: V.value,
					onClick: Fe
				}, null, 8, ["label", "pending"]), P(Z, {
					label: x(l)("common.actions.cancel"),
					variant: "secondary",
					onClick: Pe
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			P(de, {
				open: I.value !== null,
				title: x(l)("settings.provider_profiles.remove_confirm_title", { name: I.value?.display_name ?? "" }),
				description: x(l)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": x(l)("confirmations.destructive.default_confirm_action"),
				"cancel-label": x(l)("confirmations.destructive.default_cancel_action"),
				pending: L.value,
				"onUpdate:open": n[10] ||= (e) => !e && (I.value = null),
				onConfirm: je
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
}), ct = ["id", "aria-describedby"], lt = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], ut = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], dt = 200, ft = /* @__PURE__ */ N({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = E(() => t.settings?.translation ?? null);
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
		let d = E(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), h = k([]);
		_(() => r.value?.glossary, (e) => {
			h.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function g() {
			h.value.length < dt && h.value.push({
				source: "",
				target: ""
			});
		}
		function b(e) {
			h.value.splice(e, 1);
		}
		function S() {
			i({ glossary: h.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (f(), v("div", {
			class: D(x(U).section),
			"data-testid": "translation-settings"
		}, [T("div", { class: D(x(U).section_header) }, [T("h2", { class: D(x(U).section_title) }, C(x(n)("settings.nav.translation")), 3)], 2), T("div", { class: D(x(U).form_grid) }, [
			T("p", { class: D(x(U).description) }, C(x(n)("settings.translation.description")), 3),
			P(G, {
				label: x(n)("settings.translation.key_label"),
				hint: x(n)("settings.translation.key_hint")
			}, {
				default: O(({ fieldId: e, describedBy: t }) => [p(T("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: D(x(U).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, ct), [[y, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			T("div", { class: D(x(U).actions_row) }, [
				P(Z, {
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
				P(Z, {
					label: x(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				T("span", {
					class: D(x(U).status_text),
					role: "status"
				}, C(d.value), 3)
			], 2),
			T("div", { class: D(x(U).row) }, [T("span", { class: D(x(U).row_label) }, C(x(n)("settings.translation.endpoint_label")), 3), P(J, {
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
			T("h3", { class: D(x(U).section_title) }, C(x(n)("settings.translation.glossary_title")), 3),
			T("p", { class: D(x(U).description) }, C(x(n)("settings.translation.glossary_description")), 3),
			(f(!0), v(j, null, m(h.value, (e, t) => (f(), v("div", {
				key: t,
				class: D(x(U).actions_row),
				"data-testid": "glossary-row"
			}, [
				p(T("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": x(n)("settings.translation.glossary_source"),
					placeholder: x(n)("settings.translation.glossary_source"),
					class: D(x(U).text_input)
				}, null, 10, lt), [[y, e.source]]),
				p(T("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": x(n)("settings.translation.glossary_target"),
					placeholder: x(n)("settings.translation.glossary_target"),
					class: D(x(U).text_input)
				}, null, 10, ut), [[y, e.target]]),
				P(Z, {
					label: x(n)("settings.translation.glossary_remove"),
					onClick: (e) => b(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			T("div", { class: D(x(U).actions_row) }, [P(Z, {
				label: x(n)("settings.translation.glossary_add"),
				disabled: h.value.length >= dt,
				onClick: g
			}, null, 8, ["label", "disabled"]), P(Z, {
				label: x(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: S
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), pt = ["aria-label"], mt = [
	"data-selected",
	"aria-current",
	"onClick"
], ht = /* @__PURE__ */ N({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = b(() => import("./PromptView-CpaeXTjp.js")), n = b(() => import("./PromptTagPresetPanel-C6QwXlpK.js")), r = b(() => import("./DiagnosticsView-Br5GH4PI.js")), i = e, { t: o } = ee(), s = [
			"illustration",
			"providers",
			"translation",
			"prompts",
			"general",
			"diagnostics"
		];
		function c(e) {
			switch (e) {
				case "illustration": return o("settings.nav.illustration");
				case "providers": return o("settings.nav.providers");
				case "translation": return o("settings.nav.translation");
				case "prompts": return o("settings.nav.prompts");
				case "general": return o("settings.nav.general");
				case "diagnostics": return o("settings.nav.diagnostics");
			}
		}
		let l = {
			illustration: ie,
			providers: a,
			translation: R,
			prompts: z,
			general: _e,
			diagnostics: K
		};
		function u(e) {
			switch (e) {
				case "illustration": return o("settings.pane.illustration");
				case "providers": return o("settings.pane.providers");
				case "translation": return o("settings.pane.translation");
				case "prompts": return o("settings.pane.prompts");
				case "general": return o("settings.pane.general");
				case "diagnostics": return o("settings.pane.diagnostics");
			}
		}
		let d = E(() => i.state.settings_section), { toasts: p, push: h, dismiss: g } = he();
		_(() => i.state.settings.update_command.status, (e, t) => {
			e === "success" && t === "pending" && h({
				title: o("settings.saved"),
				variant: "success",
				duration: 1800
			});
		});
		let y = E(() => i.state.generation.profiles.find((e) => e.id === i.state.settings.settings?.active_provider_profile_id && e.provider_id === "novelai") ?? null);
		function O(e, t) {
			return i.controller.test_prompt_regex(e, t);
		}
		return (i, a) => (f(), v("div", {
			class: D(x(U).layout),
			"data-testid": "settings-view"
		}, [
			T("nav", {
				class: D(x(U).section_nav),
				"aria-label": x(o)("nav.settings")
			}, [(f(), v(j, null, m(s, (t) => T("button", {
				key: t,
				type: "button",
				class: D(["tc-interactive", x(U).section_nav_item]),
				"data-selected": t === d.value,
				"aria-current": t === d.value ? "page" : void 0,
				onClick: (n) => e.controller.set_settings_section(t)
			}, [P(L, {
				icon: l[t],
				size: 15
			}, null, 8, ["icon"]), T("span", null, C(c(t)), 1)], 10, mt)), 64))], 10, pt),
			T("div", { class: D(x(U).section_content) }, [
				T("header", { class: D(x(U).pane_head) }, [T("h1", { class: D(x(U).pane_title) }, C(c(d.value)), 3), T("p", { class: D(x(U).pane_description) }, C(u(d.value)), 3)], 2),
				e.state.settings.update_command.status === "error" ? (f(), v("p", {
					key: 0,
					class: D([x(U).status_text, x(U).description]),
					"data-tone": "error",
					role: "alert",
					"data-testid": "settings-save-failed"
				}, C(x(o)("settings.save_failed", { code: e.state.settings.update_command.failure.code })), 3)) : S("", !0),
				d.value === "prompts" ? (f(), v(j, { key: 1 }, [P(x(t), {
					state: e.state,
					"test-regex": O,
					onSelectPreset: a[0] ||= (t) => void e.controller.select_prompt_preset(t),
					onNewPreset: a[1] ||= (t) => e.controller.start_new_prompt_preset(),
					onBulkDeletePresets: a[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
					onUpdateDraft: a[3] ||= (t) => e.controller.update_prompt_draft(t),
					onSave: a[4] ||= (t) => void e.controller.save_prompt_preset(t)
				}, null, 8, ["state"]), P(x(n), {
					records: e.state.assets.records.prompt_tag,
					loading: e.state.loading.has("assets"),
					controller: e.controller
				}, null, 8, [
					"records",
					"loading",
					"controller"
				])], 64)) : d.value === "diagnostics" ? (f(), w(x(r), {
					key: 2,
					state: e.state,
					controller: e.controller
				}, null, 8, ["state", "controller"])) : (f(), v("div", {
					key: 3,
					class: D(x(U).view)
				}, [d.value === "illustration" ? (f(), w(He, {
					key: 0,
					settings: e.state.settings.settings,
					"prompt-presets": e.state.prompt.presets,
					controller: e.controller
				}, null, 8, [
					"settings",
					"prompt-presets",
					"controller"
				])) : d.value === "providers" ? (f(), v(j, { key: 1 }, [
					e.state.generation.profiles.length === 0 ? (f(), v("section", {
						key: 0,
						class: D(x(U).onboarding),
						"data-testid": "settings-onboarding",
						"aria-labelledby": "settings-onboarding-title"
					}, [T("div", {
						class: D(x(U).onboarding_icon),
						"aria-hidden": "true"
					}, [P(L, {
						icon: x(ge),
						size: 22
					}, null, 8, ["icon"])], 2), T("div", null, [
						T("p", { class: D(x(U).onboarding_label) }, C(x(o)("settings.onboarding.label")), 3),
						T("h2", {
							id: "settings-onboarding-title",
							class: D(x(U).onboarding_title)
						}, C(x(o)("settings.onboarding.title")), 3),
						T("p", { class: D(x(U).onboarding_description) }, C(x(o)("settings.onboarding.description")), 3)
					])], 2)) : S("", !0),
					P(st, {
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
					y.value === null ? S("", !0) : (f(), w(qe, {
						key: 1,
						profile: y.value,
						vibes: e.state.assets.records.vibe,
						controller: e.controller
					}, null, 8, [
						"profile",
						"vibes",
						"controller"
					]))
				], 64)) : d.value === "translation" ? (f(), w(ft, {
					key: 2,
					settings: e.state.settings.settings,
					controller: e.controller
				}, null, 8, ["settings", "controller"])) : d.value === "general" ? (f(), v(j, { key: 3 }, [
					P(ve, {
						settings: e.state.settings.settings,
						controller: e.controller
					}, null, 8, ["settings", "controller"]),
					P(xe, {
						settings: e.state.settings.settings,
						"vault-status": e.state.settings.browser_secret_vault,
						controller: e.controller
					}, null, 8, [
						"settings",
						"vault-status",
						"controller"
					]),
					P(Ee, {
						remote: e.state.settings.settings?.vocabulary_remote ?? null,
						controller: e.controller
					}, null, 8, ["remote", "controller"])
				], 64)) : S("", !0)], 2))
			], 2),
			P(ue, {
				toasts: x(p),
				"viewport-label": x(o)("common.notifications.viewport_label"),
				"announce-label": x(o)("common.notifications.announce_label"),
				"close-label": x(o)("common.actions.close"),
				onDismiss: x(g)
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
export { ht as default };
