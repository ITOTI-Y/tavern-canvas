import { a as e } from "./ids-pPJWL4BL.js";
import { i as t, o as n } from "./novelai-B6V3MfU9.js";
import { i as r, t as i } from "./novelai_models-CXz0Nwhv.js";
import { a, i as o, o as s, r as c, t as l } from "./server_inspection-BrKVzwkO.js";
import { n as u } from "./settings-DW51ow35.js";
import { E as d, G as f, I as p, J as m, N as h, R as g, S as _, Y as v, _ as y, _t as b, a as x, b as S, c as C, d as w, ft as T, g as E, h as D, it as O, m as k, mt as A, n as j, o as M, v as N, x as P, y as F } from "./vue-i18n-BQWz_HuU.js";
import { t as I } from "./portal_keys-DthxrmWp.js";
import { n as L, t as R } from "./AppIcon-B1iv8vRB.js";
import { n as z, r as B, t as ee } from "./PromptTagChips-CxHrnNHf.js";
import { n as V, t as H } from "./StateSurface-Dxa4U6G6.js";
import { t as U } from "./AppSelect-ne0yiQQW.js";
import { a as te, i as W, n as G, t as K } from "./ImageSizeField-mAqVP39n.js";
import { t as ne } from "./AppCheckbox-CHqNg9ZG.js";
import { t as q } from "./FieldGroup-B4bm8x77.js";
import { n as re, t as ie } from "./workflow_target_label-_QZHF2k5.js";
import { t as ae } from "./sparkles-Beps81HN.js";
import "./browser_secret_vault-Cl9sZA7g.js";
import { d as J, n as oe, v as se } from "./workflow_mapping-1vKn8khF.js";
import { n as ce, t as le } from "./novelai_request_defaults-DmJSc0ed.js";
import { t as ue } from "./catalog_url-B1GMOf5E.js";
import { n as Y, t as X } from "./NumberStepper-Q3rxAKj9.js";
import { t as Z } from "./ToastViewport-CuumTAT9.js";
import { t as de } from "./ConfirmDialog-BbJ8Vn0S.js";
import { t as fe } from "./TagInput-CcZvqoLP.js";
import { t as Q } from "./AppSwitch-BQKT0Mao.js";
import { t as pe } from "./AppDialog-B_P8hQSz.js";
import { t as me } from "./use_toasts-IjxnITpJ.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var he = L("cable", [
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
]), ge = L("sliders-horizontal", [
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
]), $ = /* @__PURE__ */ _({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = j(), r = {
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
		return (t, r) => (p(), N("div", {
			class: A(T(G).section),
			"data-testid": "appearance-settings"
		}, [D("div", { class: A(T(G).section_header) }, [D("h2", { class: A(T(G).section_title) }, b(T(n)("settings.sections.appearance")), 3)], 2), D("div", { class: A(T(G).form_grid) }, [
			D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.appearance.theme_label")), 3), S(Y, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: T(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.appearance.language_label")), 3), S(Y, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: T(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.appearance.inspector_width_label")), 3), S(X, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: T(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": T(n)("common.actions.increase"),
				"decrement-label": T(n)("common.actions.decrease"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			S(Q, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: T(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), _e = ["data-tone"], ve = ["id", "aria-describedby"], ye = ["id", "aria-describedby"], be = ["id", "aria-describedby"], xe = /* @__PURE__ */ _({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = j(), r = O(""), i = O(""), a = O(!1), o = O(null), s = O(!1), c = k(() => [
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
					await t.controller.initialize_browser_secret_vault(r.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), f();
				} catch (e) {
					o.value = g(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function x() {
			if (!(a.value || !h(!1))) {
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
		async function E() {
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
		async function P() {
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
		return (t, f) => (p(), N("div", {
			class: A(T(G).section),
			"data-testid": "credential-storage-settings"
		}, [
			D("div", { class: A(T(G).section_header) }, [D("h2", { class: A(T(G).section_title) }, b(T(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (p(), N("span", {
				key: 0,
				class: A(T(G).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, b(u.value), 11, _e)) : y("", !0)], 2),
			D("div", { class: A(T(G).vault_mode_row) }, [D("div", { class: A(T(G).profile_identity) }, [D("span", { class: A(T(G).profile_name) }, b(T(n)("settings.credential_storage.mode_label")), 3), D("span", { class: A(T(G).profile_meta) }, b(T(n)("settings.credential_storage.mode_hint")), 3)], 2), S(Y, {
				modelValue: l.value,
				"onUpdate:modelValue": f[0] ||= (e) => l.value = e,
				options: c.value,
				label: T(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (p(), N("div", {
				key: 0,
				class: A(T(G).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (p(), N("p", {
				key: 0,
				class: A(T(G).status_text),
				"data-tone": "error",
				role: "alert"
			}, b(d.value), 3)) : e.vaultStatus.state === "uninitialized" ? (p(), N(w, { key: 1 }, [
				S(q, {
					label: T(n)("settings.credential_storage.passphrase_label"),
					hint: T(n)("settings.credential_storage.passphrase_hint", { count: T(12) }),
					required: ""
				}, {
					default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
						id: e,
						"onUpdate:modelValue": f[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: A(T(G).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, ve), [[M, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				S(q, {
					label: T(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
						id: e,
						"onUpdate:modelValue": f[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: A(T(G).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, ye), [[M, i.value]])]),
					_: 1
				}, 8, ["label"]),
				S(V, {
					label: T(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: _
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (p(), N(w, { key: 2 }, [S(q, {
				label: T(n)("settings.credential_storage.passphrase_label"),
				hint: T(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
					id: e,
					"onUpdate:modelValue": f[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: A(T(G).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: C(x, ["enter"])
				}, null, 42, be), [[M, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), S(V, {
				label: T(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: x
			}, null, 8, ["label", "pending"])], 64)) : (p(), N("div", {
				key: 3,
				class: A(T(G).vault_unlocked_actions)
			}, [S(V, {
				label: T(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: E
			}, null, 8, ["label", "pending"]), S(V, {
				label: T(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: f[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (p(), N("p", {
				key: 4,
				class: A(T(G).status_text),
				"data-tone": "error",
				role: "alert"
			}, b(o.value), 3)) : y("", !0)], 2)) : y("", !0),
			S(de, {
				open: s.value,
				title: T(n)("settings.credential_storage.reset_confirm_title"),
				description: T(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": T(n)("settings.credential_storage.reset_action"),
				"cancel-label": T(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": f[5] ||= (e) => s.value = e,
				onConfirm: P
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
], Ce = ["id", "aria-describedby"], we = ["aria-label"], Te = ["aria-label"], Ee = /* @__PURE__ */ _({
	__name: "DataSettings",
	props: {
		remote: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = j(), r = O(""), i = O(!1);
		f(() => t.remote?.catalog_url, (e) => {
			r.value = e ?? "";
		}, { immediate: !0 });
		async function a() {
			let e = t.remote, n = ue(r.value);
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
		let u = k(() => s.value === "failed" ? n("settings.data.vocabulary_token_failed") : t.remote?.token_saved === !0 ? n("settings.data.vocabulary_token_present") : n("settings.data.vocabulary_token_absent")), d = O(!1), h = O(!1), g = O(null), _ = O(null), x = O(null);
		function C() {
			x.value?.click();
		}
		function w() {
			t.controller.cancel_vocabulary_import();
		}
		async function P(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || d.value)) {
				d.value = !0, h.value = !1, g.value = null, _.value = null;
				try {
					await t.controller.import_vocabulary_package(i, (e) => {
						_.value = e;
					}), h.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					g.value = n("settings.data.vocabulary_import_error", { code: t });
				} finally {
					d.value = !1;
				}
			}
		}
		let F = k(() => {
			let e = _.value;
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
		}), I = O(!1), L = O(null);
		async function R() {
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
		let z = O(!1), B = O(null), ee = O(null);
		function H() {
			ee.value?.click();
		}
		async function U(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || z.value)) {
				z.value = !0, B.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					B.value = n("errors.unexpected");
				} finally {
					z.value = !1;
				}
			}
		}
		return (t, f) => (p(), N("div", {
			class: A(T(G).section),
			"data-testid": "data-settings"
		}, [D("div", { class: A(T(G).section_header) }, [D("h2", { class: A(T(G).section_title) }, b(T(n)("settings.sections.data")), 3)], 2), D("div", { class: A(T(G).form_grid) }, [
			S(q, {
				label: T(n)("settings.data.vocabulary_catalog_label"),
				hint: T(n)("settings.data.vocabulary_catalog_hint")
			}, {
				default: m(({ fieldId: t, describedBy: i }) => [v(D("input", {
					id: t,
					"onUpdate:modelValue": f[0] ||= (e) => r.value = e,
					type: "url",
					autocomplete: "off",
					spellcheck: "false",
					placeholder: T(n)("settings.data.vocabulary_catalog_placeholder"),
					"aria-describedby": i,
					class: A(T(G).text_input),
					disabled: e.remote === null,
					"data-testid": "vocabulary-catalog-input",
					onChange: a
				}, null, 42, Se), [[M, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			i.value ? (p(), N("p", {
				key: 0,
				class: A([T(G).status_text, T(G).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-catalog-invalid"
			}, b(T(n)("settings.data.vocabulary_catalog_invalid")), 3)) : y("", !0),
			S(q, {
				label: T(n)("settings.data.vocabulary_token_label"),
				hint: T(n)("settings.data.vocabulary_token_hint")
			}, {
				default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
					id: e,
					"onUpdate:modelValue": f[1] ||= (e) => o.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: A(T(G).text_input),
					"data-testid": "vocabulary-token-input"
				}, null, 10, Ce), [[M, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			D("div", { class: A(T(G).actions_row) }, [
				S(V, {
					label: T(n)("settings.data.vocabulary_token_save"),
					variant: "primary",
					pending: s.value === "saving",
					disabled: o.value.trim() === "",
					onClick: c
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				e.remote?.token_saved === !0 ? (p(), E(V, {
					key: 0,
					label: T(n)("settings.data.vocabulary_token_clear"),
					onClick: l
				}, null, 8, ["label"])) : y("", !0),
				D("span", {
					class: A(T(G).status_text),
					role: "status"
				}, b(u.value), 3)
			], 2),
			D("div", { class: A(T(G).actions_row) }, [
				S(V, {
					label: T(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: d.value,
					onClick: C
				}, null, 8, ["label", "pending"]),
				d.value ? (p(), E(V, {
					key: 0,
					label: T(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: w
				}, null, 8, ["label"])) : y("", !0),
				D("input", {
					ref_key: "vocabulary_file_input",
					ref: x,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": T(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: P
				}, null, 40, we)
			], 2),
			D("p", { class: A(T(G).description) }, b(T(n)("settings.data.vocabulary_import.description")), 3),
			F.value ? (p(), N("p", {
				key: 1,
				class: A([T(G).status_text, T(G).description]),
				"data-testid": "vocabulary-import-progress"
			}, b(F.value), 3)) : y("", !0),
			h.value ? (p(), N("p", {
				key: 2,
				class: A([T(G).status_text, T(G).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, b(T(n)("settings.data.vocabulary_import.success")), 3)) : y("", !0),
			g.value ? (p(), N("p", {
				key: 3,
				class: A([T(G).status_text, T(G).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, b(g.value), 3)) : y("", !0),
			D("div", { class: A(T(G).actions_row) }, [
				S(V, {
					label: T(n)("settings.data.archive_export_action"),
					pending: I.value,
					onClick: R
				}, null, 8, ["label", "pending"]),
				S(V, {
					label: T(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: z.value,
					onClick: H
				}, null, 8, ["label", "pending"]),
				D("input", {
					ref_key: "file_input",
					ref: ee,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": T(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: U
				}, null, 40, Te)
			], 2),
			D("p", { class: A(T(G).description) }, b(T(n)("settings.data.archive_import_description")), 3),
			L.value ? (p(), N("p", {
				key: 4,
				class: A([T(G).status_text, T(G).description]),
				"data-tone": "error"
			}, b(L.value), 3)) : y("", !0),
			B.value ? (p(), N("p", {
				key: 5,
				class: A([T(G).status_text, T(G).description]),
				"data-tone": "error"
			}, b(B.value), 3)) : y("", !0)
		], 2)], 2));
	}
}), De = ["id"], Oe = "none", ke = "default", Ae = /* @__PURE__ */ _({
	__name: "SizeSetSettings",
	props: { illustration: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = j(), a = d(I, O(null)), o = [
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
		], s = k(() => n.illustration.size_sets), c = k(() => s.value.map((e) => ({
			value: e.id,
			label: e.name
		}))), l = k(() => [{
			value: Oe,
			label: i("settings.size_sets.none")
		}, ...c.value]), u = k(() => [{
			value: ke,
			label: i("settings.size_sets.follow_default")
		}, ...l.value]), h = k(() => {
			let e = a.value;
			return e === null || !(e in n.illustration.size_set_by_chat) ? ke : n.illustration.size_set_by_chat[e] ?? Oe;
		});
		function _(e) {
			r("update", { size_set_id: e === Oe ? null : e });
		}
		function x(e) {
			let t = a.value;
			if (t === null) return;
			let i = Object.entries(n.illustration.size_set_by_chat).filter(([e]) => e !== t), o = e === ke ? i : [...i, [t, e === Oe ? null : e]];
			r("update", { size_set_by_chat: Object.fromEntries(o.slice(-100)) });
		}
		let C = O(s.value[0]?.id ?? null);
		f(s, (e) => {
			e.some((e) => e.id === C.value) || (C.value = e[0]?.id ?? null);
		});
		let P = k(() => s.value.find((e) => e.id === C.value) ?? null), F = O("");
		f(P, (e) => {
			F.value = e?.name ?? "";
		}, { immediate: !0 });
		function L(e, t = {}) {
			r("update", {
				size_sets: [...e],
				...t
			});
		}
		function R(e) {
			let t = P.value;
			t !== null && L(s.value.map((n) => n.id === t.id ? {
				...n,
				...e
			} : n));
		}
		function z(e) {
			let t = {
				id: crypto.randomUUID(),
				name: e === null ? i("settings.size_sets.new_name", { n: s.value.length + 1 }) : i("settings.size_sets.copy_name", { name: e.name }),
				sizes: (e?.sizes ?? o).map((e) => ({ ...e }))
			};
			C.value = t.id, L([...s.value, t]);
		}
		function B() {
			let e = P.value;
			e !== null && L(s.value.filter((t) => t.id !== e.id), {
				size_set_id: n.illustration.size_set_id === e.id ? null : n.illustration.size_set_id,
				size_set_by_chat: Object.fromEntries(Object.entries(n.illustration.size_set_by_chat).filter(([, t]) => t !== e.id))
			});
		}
		function ee() {
			let e = F.value.trim();
			e !== "" && e !== P.value?.name && R({ name: e });
		}
		let H = (e, t) => e.width === t.width && e.height === t.height, re = k(() => {
			let e = (P.value?.sizes ?? []).filter((e) => !W.some((t) => H(t, e)));
			return [...W, ...e];
		});
		function ie(e) {
			let t = `${te(e)} · ${String(e.width)} × ${String(e.height)}`;
			return e.width * e.height > 1048576 ? `${t} · ${i("settings.size_sets.costs_anlas")}` : t;
		}
		function ae(e) {
			return P.value?.sizes.some((t) => H(t, e)) ?? !1;
		}
		function J(e, t) {
			let n = P.value;
			if (n === null) return;
			let r = t ? [...n.sizes, { ...e }] : n.sizes.filter((t) => !H(t, e));
			r.length > 0 && r.length <= 16 && R({ sizes: r });
		}
		let oe = O({
			width: 1344,
			height: 768
		});
		function se() {
			ae(oe.value) || J(oe.value, !0);
		}
		return (t, n) => (p(), N("section", {
			class: A(T(G).section),
			"data-testid": "size-set-settings"
		}, [
			D("h2", { class: A(T(G).section_title) }, b(T(i)("settings.groups.sizes")), 3),
			D("p", { class: A(T(G).description) }, b(T(i)("settings.size_sets.hint")), 3),
			D("div", { class: A(T(G).field_grid) }, [D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(i)("settings.size_sets.default_label")), 3), S(U, {
				"model-value": e.illustration.size_set_id ?? Oe,
				options: l.value,
				placeholder: T(i)("settings.size_sets.default_label"),
				"aria-label": T(i)("settings.size_sets.default_label"),
				"onUpdate:modelValue": _
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2), T(a) === null ? y("", !0) : (p(), N("div", {
				key: 0,
				class: A(T(G).row)
			}, [D("span", { class: A(T(G).row_label) }, b(T(i)("settings.size_sets.chat_label")), 3), S(U, {
				"model-value": h.value,
				options: u.value,
				placeholder: T(i)("settings.size_sets.chat_label"),
				"aria-label": T(i)("settings.size_sets.chat_label"),
				"data-testid": "size-set-chat-select",
				"onUpdate:modelValue": x
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2))], 2),
			D("div", { class: A(T(G).actions_row) }, [
				s.value.length > 0 ? (p(), E(U, {
					key: 0,
					"model-value": C.value ?? void 0,
					options: c.value,
					placeholder: T(i)("settings.size_sets.edit_label"),
					"aria-label": T(i)("settings.size_sets.edit_label"),
					"onUpdate:modelValue": n[0] ||= (e) => C.value = e
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])) : y("", !0),
				S(V, {
					label: T(i)("settings.size_sets.add"),
					onClick: n[1] ||= (e) => z(null)
				}, null, 8, ["label"]),
				P.value === null ? y("", !0) : (p(), E(V, {
					key: 1,
					label: T(i)("settings.size_sets.duplicate"),
					variant: "ghost",
					onClick: n[2] ||= (e) => z(P.value)
				}, null, 8, ["label"])),
				P.value === null ? y("", !0) : (p(), E(V, {
					key: 2,
					label: T(i)("settings.size_sets.remove"),
					variant: "destructive",
					onClick: B
				}, null, 8, ["label"]))
			], 2),
			P.value === null ? y("", !0) : (p(), N(w, { key: 0 }, [
				S(q, { label: T(i)("settings.size_sets.name_label") }, {
					default: m(({ fieldId: e }) => [v(D("input", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => F.value = e,
						type: "text",
						maxlength: "60",
						class: A(T(G).text_input),
						"data-testid": "size-set-name-input",
						onBlur: ee
					}, null, 42, De), [[M, F.value]])]),
					_: 1
				}, 8, ["label"]),
				D("fieldset", {
					class: A(T(G).check_list),
					"data-testid": "size-set-sizes"
				}, [D("legend", { class: A(T(G).row_label) }, b(T(i)("settings.size_sets.sizes_label")), 3), (p(!0), N(w, null, g(re.value, (e) => (p(), E(ne, {
					key: `${e.width}x${e.height}`,
					"model-value": ae(e),
					label: ie(e),
					disabled: ae(e) && P.value.sizes.length === 1,
					"onUpdate:modelValue": (t) => J(e, t)
				}, null, 8, [
					"model-value",
					"label",
					"disabled",
					"onUpdate:modelValue"
				]))), 128))], 2),
				S(K, {
					modelValue: oe.value,
					"onUpdate:modelValue": n[4] ||= (e) => oe.value = e
				}, null, 8, ["modelValue"]),
				D("div", { class: A(T(G).actions_row) }, [S(V, {
					label: T(i)("settings.size_sets.add_custom"),
					variant: "ghost",
					disabled: ae(oe.value) || P.value.sizes.length >= 16,
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
], Be = "in_use", Ve = "none", He = /* @__PURE__ */ _({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = j(), r = k(() => t.settings?.illustration ?? null);
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
		let o = k(() => r.value?.strip ?? u);
		function s(e) {
			a({ strip: {
				...o.value,
				...e
			} });
		}
		let c = k(() => [{
			value: "strip",
			label: n("create.style.strip")
		}, {
			value: "default",
			label: n("create.style.default")
		}]), l = O(""), d = O(""), _ = O(""), x = O(""), C = O(""), P = O(""), F = O(""), I = O("");
		f(r, (e) => {
			l.value = e === null || e.preset_name === Be ? "" : e.preset_name, P.value = e?.wardrobe_model ?? "", F.value = e?.analysis_guidance ?? "", I.value = e?.wardrobe_guidance ?? "", e?.connection.kind === "proxy_preset" ? (d.value = e.connection.proxy_preset, _.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (x.value = e.connection.api_url, C.value = e.connection.model);
		}, { immediate: !0 });
		function L() {
			a({ wardrobe_model: P.value.trim() || null });
		}
		function R() {
			a({ preset_name: l.value.trim() || Be });
		}
		let z = k(() => [
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
		function B() {
			let e = d.value.trim();
			if (e === "") return null;
			let t = _.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function ee() {
			let e = x.value.trim(), t = C.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let H = k(() => J.value === "custom" && x.value.trim() !== "" && ee() === null);
		function te() {
			let e = ee();
			e !== null && a({ connection: e });
		}
		let W = O(""), K = O("idle");
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
		let ae = k(() => {
			switch (K.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), J = O(r.value?.connection.kind ?? "current");
		f(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (J.value = e);
		});
		function oe(e) {
			if (e === "current") J.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				J.value = "proxy_preset";
				let e = B();
				e !== null && a({ connection: e });
			} else e === "custom" && (J.value = "custom", te());
		}
		function se() {
			let e = B();
			e !== null && a({ connection: e });
		}
		let ce = k(() => [{
			value: Ve,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function le(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let ue = k(() => [
			{
				value: "auto",
				label: n("settings.illustration.structured_output_auto")
			},
			{
				value: "json_schema",
				label: n("settings.illustration.structured_output_json")
			},
			{
				value: "tools",
				label: n("settings.illustration.structured_output_tools")
			}
		]);
		function Z(e) {
			(e === "auto" || e === "json_schema" || e === "tools") && a({ structured_output: e });
		}
		let de = k(() => [
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
		]), pe = O(r.value?.world_info.mode ?? "chat");
		f(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (pe.value = e);
		});
		let me = O([]), he = O(!1);
		async function ge() {
			try {
				me.value = await t.controller.list_worldbooks(), he.value = !1;
			} catch {
				he.value = !0;
			}
		}
		h(() => {
			pe.value === "worldbook" && ge();
		});
		let $ = k(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbooks : []), _e = k(() => [.../* @__PURE__ */ new Set([...me.value, ...$.value])]);
		function ve(e) {
			e === "chat" || e === "off" ? (pe.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (pe.value = e, ge());
		}
		function ye(e, t) {
			let n = t ? [...$.value, e] : $.value.filter((t) => t !== e);
			n.length > 0 && a({ world_info: {
				mode: "worldbook",
				worldbooks: n
			} });
		}
		return (t, u) => (p(), N("div", {
			class: A(T(G).groups),
			"data-testid": "illustration-settings"
		}, [
			D("section", { class: A(T(G).section) }, [
				D("h2", { class: A(T(G).section_title) }, b(T(n)("settings.groups.generation")), 3),
				S(Q, {
					"model-value": e.settings?.auto_generation_enabled ?? !1,
					label: T(n)("settings.illustration.auto_generation_label"),
					description: T(n)("settings.illustration.auto_generation_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[0] ||= (e) => i({ auto_generation_enabled: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				D("div", { class: A(T(G).field_grid) }, [
					D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.illustration.max_images_label")), 3), S(X, {
						"model-value": r.value?.max_images_per_message,
						label: T(n)("settings.illustration.max_images_label"),
						min: 1,
						max: 8,
						"increment-label": T(n)("common.actions.increase"),
						"decrement-label": T(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": u[1] ||= (e) => a({ max_images_per_message: e })
					}, null, 8, [
						"model-value",
						"label",
						"increment-label",
						"decrement-label",
						"disabled"
					])], 2),
					D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.illustration.prompt_preset_label")), 3), S(U, {
						"model-value": r.value?.prompt_preset_id ?? Ve,
						options: ce.value,
						placeholder: T(n)("settings.illustration.prompt_preset_label"),
						"aria-label": T(n)("settings.illustration.prompt_preset_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": le
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"aria-label",
						"disabled"
					])], 2),
					D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.illustration.concurrency_label")), 3), S(X, {
						"model-value": e.settings?.global_concurrency,
						label: T(n)("settings.illustration.concurrency_label"),
						min: 1,
						max: 4,
						"increment-label": T(n)("common.actions.increase"),
						"decrement-label": T(n)("common.actions.decrease"),
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
			r.value === null ? y("", !0) : (p(), E(Ae, {
				key: 0,
				illustration: r.value,
				onUpdate: a
			}, null, 8, ["illustration"])),
			D("section", { class: A(T(G).section) }, [
				D("h2", { class: A(T(G).section_title) }, b(T(n)("settings.groups.analysis")), 3),
				D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.illustration.connection_label")), 3), S(Y, {
					"model-value": J.value,
					options: z.value,
					label: T(n)("settings.illustration.connection_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": oe
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				J.value === "proxy_preset" ? (p(), N(w, { key: 0 }, [S(q, {
					label: T(n)("settings.illustration.proxy_preset_label"),
					hint: T(n)("settings.illustration.proxy_preset_hint")
				}, {
					default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
						id: e,
						"onUpdate:modelValue": u[3] ||= (e) => d.value = e,
						type: "text",
						"aria-describedby": t,
						class: A(T(G).text_input),
						"data-testid": "analysis-proxy-preset-input",
						onBlur: se
					}, null, 42, je), [[M, d.value]])]),
					_: 1
				}, 8, ["label", "hint"]), S(q, {
					label: T(n)("settings.illustration.proxy_model_label"),
					hint: T(n)("settings.illustration.proxy_model_hint")
				}, {
					default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
						id: e,
						"onUpdate:modelValue": u[4] ||= (e) => _.value = e,
						type: "text",
						"aria-describedby": t,
						class: A(T(G).text_input),
						onBlur: se
					}, null, 42, Me), [[M, _.value]])]),
					_: 1
				}, 8, ["label", "hint"])], 64)) : y("", !0),
				J.value === "custom" ? (p(), N(w, { key: 1 }, [
					S(q, {
						label: T(n)("settings.illustration.custom_url_label"),
						hint: T(n)("settings.illustration.custom_url_hint"),
						error: H.value ? T(n)("settings.illustration.custom_invalid") : null
					}, {
						default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
							id: e,
							"onUpdate:modelValue": u[5] ||= (e) => x.value = e,
							type: "url",
							placeholder: "https://",
							"aria-describedby": t,
							class: A(T(G).text_input),
							"data-testid": "analysis-custom-url-input",
							onBlur: te
						}, null, 42, Ne), [[M, x.value]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					S(q, { label: T(n)("settings.illustration.custom_model_label") }, {
						default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
							id: e,
							"onUpdate:modelValue": u[6] ||= (e) => C.value = e,
							type: "text",
							"aria-describedby": t,
							class: A(T(G).text_input),
							"data-testid": "analysis-custom-model-input",
							onBlur: te
						}, null, 42, Pe), [[M, C.value]])]),
						_: 1
					}, 8, ["label"]),
					S(q, {
						label: T(n)("settings.illustration.custom_key_label"),
						hint: T(n)("settings.illustration.custom_key_hint")
					}, {
						default: m(({ fieldId: e, describedBy: t }) => [D("div", { class: A(T(G).input_row) }, [v(D("input", {
							id: e,
							"onUpdate:modelValue": u[7] ||= (e) => W.value = e,
							type: "password",
							autocomplete: "off",
							"aria-describedby": t,
							class: A(T(G).text_input),
							"data-testid": "analysis-custom-key-input"
						}, null, 10, Fe), [[M, W.value]]), S(V, {
							label: T(n)("settings.illustration.custom_key_save"),
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
					D("div", { class: A(T(G).actions_row) }, [S(V, {
						label: T(n)("settings.illustration.custom_key_clear"),
						variant: "ghost",
						onClick: ie
					}, null, 8, ["label"]), D("span", {
						class: A(T(G).status_text),
						role: "status"
					}, b(ae.value), 3)], 2)
				], 64)) : y("", !0),
				S(q, {
					label: T(n)("settings.illustration.preset_label"),
					hint: T(n)("settings.illustration.preset_hint")
				}, {
					default: m(({ fieldId: t, describedBy: r }) => [v(D("input", {
						id: t,
						"onUpdate:modelValue": u[8] ||= (e) => l.value = e,
						type: "text",
						placeholder: T(n)("settings.illustration.preset_placeholder"),
						"aria-describedby": r,
						class: A(T(G).text_input),
						disabled: !e.settings,
						"data-testid": "analysis-preset-input",
						onBlur: R
					}, null, 42, Ie), [[M, l.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				S(q, {
					label: T(n)("settings.illustration.structured_output_label"),
					hint: T(n)("settings.illustration.structured_output_hint")
				}, {
					default: m(({ fieldId: t, describedBy: i }) => [S(U, {
						id: t,
						"described-by": i,
						"model-value": r.value?.structured_output ?? "auto",
						options: ue.value,
						placeholder: T(n)("settings.illustration.structured_output_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": Z
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
				D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.illustration.chat_history_label")), 3), S(X, {
					"model-value": r.value?.max_chat_history,
					label: T(n)("settings.illustration.chat_history_label"),
					min: 0,
					max: 20,
					"increment-label": T(n)("common.actions.increase"),
					"decrement-label": T(n)("common.actions.decrease"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[9] ||= (e) => a({ max_chat_history: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label",
					"disabled"
				])], 2),
				D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.illustration.world_info_label")), 3), S(Y, {
					"model-value": pe.value,
					options: de.value,
					label: T(n)("settings.illustration.world_info_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": ve
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				D("p", { class: A(T(G).description) }, b(T(n)("settings.illustration.world_info_hint")), 3),
				pe.value === "worldbook" ? (p(), N(w, { key: 2 }, [D("fieldset", {
					class: A(T(G).check_list),
					"data-testid": "worldbook-list"
				}, [
					D("legend", { class: A(T(G).row_label) }, b(T(n)("settings.illustration.worldbook_label")), 3),
					(p(!0), N(w, null, g(_e.value, (e) => (p(), E(ne, {
						key: e,
						"model-value": $.value.includes(e),
						label: e,
						disabled: $.value.length === 1 && $.value.includes(e),
						"onUpdate:modelValue": (t) => ye(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]))), 128)),
					$.value.length === 0 ? (p(), N("p", {
						key: 0,
						class: A(T(G).description)
					}, b(T(n)("settings.illustration.worldbook_placeholder")), 3)) : y("", !0)
				], 2), he.value ? (p(), N("p", {
					key: 0,
					class: A(T(G).description),
					role: "alert"
				}, b(T(n)("settings.illustration.worldbook_unavailable")), 3)) : y("", !0)], 64)) : y("", !0),
				S(q, {
					label: T(n)("settings.illustration.wardrobe_model_label"),
					hint: J.value === "current" ? T(n)("settings.illustration.wardrobe_model_current_hint") : T(n)("settings.illustration.wardrobe_model_hint")
				}, {
					default: m(({ fieldId: t, describedBy: n }) => [v(D("input", {
						id: t,
						"onUpdate:modelValue": u[10] ||= (e) => P.value = e,
						type: "text",
						"aria-describedby": n,
						class: A(T(G).text_input),
						disabled: !e.settings || J.value === "current",
						"data-testid": "wardrobe-model-input",
						onBlur: L
					}, null, 42, Le), [[M, P.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			D("section", { class: A(T(G).section) }, [
				D("h2", { class: A(T(G).section_title) }, b(T(n)("settings.groups.guidance")), 3),
				S(q, {
					label: T(n)("settings.illustration.analysis_guidance_label"),
					hint: T(n)("settings.illustration.analysis_guidance_hint")
				}, {
					default: m(({ fieldId: t, describedBy: r }) => [v(D("textarea", {
						id: t,
						"onUpdate:modelValue": u[11] ||= (e) => F.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: T(n)("settings.illustration.analysis_guidance_placeholder"),
						"aria-describedby": r,
						class: A(T(G).text_area),
						disabled: !e.settings,
						"data-testid": "analysis-guidance-input",
						onBlur: u[12] ||= (e) => a({ analysis_guidance: F.value.trim() })
					}, null, 42, Re), [[M, F.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				S(q, {
					label: T(n)("settings.illustration.wardrobe_guidance_label"),
					hint: T(n)("settings.illustration.wardrobe_guidance_hint")
				}, {
					default: m(({ fieldId: t, describedBy: r }) => [v(D("textarea", {
						id: t,
						"onUpdate:modelValue": u[13] ||= (e) => I.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: T(n)("settings.illustration.wardrobe_guidance_placeholder"),
						"aria-describedby": r,
						class: A(T(G).text_area),
						disabled: !e.settings,
						"data-testid": "wardrobe-guidance-input",
						onBlur: u[14] ||= (e) => a({ wardrobe_guidance: I.value.trim() })
					}, null, 42, ze), [[M, I.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			D("section", { class: A(T(G).section) }, [
				D("h2", { class: A(T(G).section_title) }, b(T(n)("settings.groups.strip")), 3),
				S(q, {
					label: T(n)("settings.illustration.strip_style_label"),
					hint: T(n)("settings.illustration.strip_style_hint")
				}, {
					default: m(() => [S(Y, {
						"model-value": o.value.style,
						options: c.value,
						label: T(n)("settings.illustration.strip_style_label"),
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
				S(q, { label: T(n)("settings.illustration.strip_max_label") }, {
					default: m(({ fieldId: t }) => [S(X, {
						id: t,
						"model-value": o.value.max_panels,
						label: T(n)("settings.illustration.strip_max_label"),
						min: 1,
						max: 12,
						"increment-label": T(n)("common.actions.increase"),
						"decrement-label": T(n)("common.actions.decrease"),
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
				S(Q, {
					"model-value": o.value.symbol_bubbles,
					label: T(n)("settings.illustration.strip_bubbles_label"),
					description: T(n)("settings.illustration.strip_bubbles_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[17] ||= (e) => s({ symbol_bubbles: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				S(q, { label: T(n)("settings.illustration.strip_style_tags_label") }, {
					default: m(({ fieldId: e }) => [S(fe, {
						id: e,
						"model-value": o.value.style_tags,
						"onUpdate:modelValue": u[18] ||= (e) => s({ style_tags: e })
					}, null, 8, ["id", "model-value"])]),
					_: 1
				}, 8, ["label"]),
				S(q, {
					label: T(n)("settings.illustration.strip_no_text_label"),
					hint: T(n)("settings.illustration.strip_no_text_hint")
				}, {
					default: m(({ fieldId: e, describedBy: t }) => [S(fe, {
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
var Ke = "https://novelai.net/image", qe = /* @__PURE__ */ _({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let i = e, { t: o, d: c } = j(), l = k(() => {
			let e = i.profile.model_id;
			return e != null && r(e) !== null ? e : le;
		});
		function u() {
			if (i.profile.novelai_defaults !== null) return i.profile.novelai_defaults;
			let e = ce(l.value);
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
		let d = O(u());
		f(() => i.profile.id, () => {
			d.value = u();
		});
		function m(e) {
			d.value = {
				...d.value,
				...e
			};
		}
		let _ = k(() => a.safeParse(d.value).success ? null : o("settings.novelai.invalid_size")), v = k(() => {
			let e = r(l.value);
			return e === null ? [] : s(e.profile, d.value);
		}), x = O(null), C = O(null), M = O(!1), P = O(!1);
		async function I() {
			P.value = !0, C.value = null, M.value = !1;
			try {
				x.value = await i.controller.load_novelai_account();
			} catch (e) {
				M.value = e instanceof Error && e.name === "ProviderNetworkError", C.value = e instanceof Error ? e.message : String(e);
			} finally {
				P.value = !1;
			}
		}
		let L = O([]);
		h(async () => {
			try {
				L.value = (await i.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				L.value = [];
			}
		});
		let R = k(() => L.value.map((e) => ({
			value: e.profile.model_id,
			label: e.profile.display_name
		})));
		async function z(e) {
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
		let B = n.options.map((e) => ({
			value: e,
			label: Ue[e]
		})), ee = t.options.map((e) => ({
			value: e,
			label: We[e]
		}));
		function H(e, t, n) {
			t.includes(n) && m({ [e]: n });
		}
		let te = k(() => i.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function W(e, t) {
			let n = d.value.vibe_asset_ids.filter((t) => t !== e);
			m({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let q = O("idle");
		async function re() {
			q.value = "saving";
			try {
				await i.controller.save_novelai_defaults(i.profile.id, d.value), q.value = "saved";
			} catch {
				q.value = "failed";
			}
		}
		return (r, i) => (p(), N("div", {
			class: A(T(G).section),
			"data-testid": "novelai-settings"
		}, [D("div", { class: A(T(G).section_header) }, [D("h2", { class: A(T(G).section_title) }, b(T(o)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), D("div", { class: A(T(G).form_grid) }, [
			D("div", { class: A(T(G).actions_row) }, [S(V, {
				label: T(o)("settings.novelai.refresh_account"),
				pending: P.value,
				onClick: I
			}, null, 8, ["label", "pending"]), x.value === null ? M.value ? (p(), N("span", {
				key: 1,
				class: A(T(G).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [F(b(T(o)("settings.novelai.account_unreachable")) + " ", 1), D("a", {
				href: Ke,
				target: "_blank",
				rel: "noopener noreferrer"
			}, b(T(o)("settings.novelai.account_open_site")), 1)], 2)) : C.value === null ? y("", !0) : (p(), N("span", {
				key: 2,
				class: A(T(G).status_text)
			}, b(C.value), 3)) : (p(), N("span", {
				key: 0,
				class: A(T(G).status_text),
				"data-testid": "novelai-account"
			}, b(T(o)("settings.novelai.account_summary", {
				tier: x.value.tier,
				anlas: x.value.anlas,
				expires: T(c)(new Date(x.value.expires_at), "short_date")
			})), 3))], 2),
			D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(o)("settings.novelai.model_label")), 3), S(U, {
				"model-value": l.value,
				options: R.value,
				placeholder: l.value,
				"aria-label": T(o)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void z(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			S(K, {
				"model-value": {
					width: d.value.width,
					height: d.value.height
				},
				"onUpdate:modelValue": i[1] ||= (e) => m(e)
			}, null, 8, ["model-value"]),
			D("div", { class: A(T(G).field_grid) }, [
				D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(o)("settings.novelai.steps_label")), 3), S(X, {
					"model-value": d.value.steps,
					label: T(o)("settings.novelai.steps_label"),
					min: 1,
					max: 50,
					"increment-label": T(o)("common.actions.increase"),
					"decrement-label": T(o)("common.actions.decrease"),
					"onUpdate:modelValue": i[2] ||= (e) => m({ steps: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(o)("settings.novelai.scale_label")), 3), S(X, {
					"model-value": d.value.scale,
					label: T(o)("settings.novelai.scale_label"),
					min: 0,
					max: 10,
					step: .1,
					"increment-label": T(o)("common.actions.increase"),
					"decrement-label": T(o)("common.actions.decrease"),
					"onUpdate:modelValue": i[3] ||= (e) => m({ scale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(o)("settings.novelai.cfg_rescale_label")), 3), S(X, {
					"model-value": d.value.cfg_rescale,
					label: T(o)("settings.novelai.cfg_rescale_label"),
					min: 0,
					max: 1,
					step: .02,
					"increment-label": T(o)("common.actions.increase"),
					"decrement-label": T(o)("common.actions.decrease"),
					"onUpdate:modelValue": i[4] ||= (e) => m({ cfg_rescale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(o)("settings.novelai.sampler_label")), 3), S(U, {
					"model-value": d.value.sampler,
					options: T(B),
					placeholder: T(o)("settings.novelai.sampler_label"),
					"aria-label": T(o)("settings.novelai.sampler_label"),
					"onUpdate:modelValue": i[5] ||= (e) => H("sampler", T(n).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2),
				D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(o)("settings.novelai.noise_schedule_label")), 3), S(U, {
					"model-value": d.value.noise_schedule,
					options: T(ee),
					placeholder: T(o)("settings.novelai.noise_schedule_label"),
					"aria-label": T(o)("settings.novelai.noise_schedule_label"),
					"onUpdate:modelValue": i[6] ||= (e) => H("noise_schedule", T(t).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2)
			], 2),
			S(Q, {
				"model-value": d.value.smea,
				label: T(o)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[7] ||= (e) => m({ smea: e })
			}, null, 8, ["model-value", "label"]),
			S(Q, {
				"model-value": d.value.dyn,
				label: T(o)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[8] ||= (e) => m({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			S(Q, {
				"model-value": d.value.variety_plus,
				label: T(o)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[9] ||= (e) => m({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			D("h3", { class: A(T(G).section_title) }, b(T(o)("settings.novelai.vibes_title")), 3),
			te.value.length === 0 ? (p(), N("p", {
				key: 0,
				class: A(T(G).description)
			}, b(T(o)("settings.novelai.vibes_empty")), 3)) : y("", !0),
			(p(!0), N(w, null, g(te.value, (e) => (p(), E(ne, {
				key: e.id,
				"model-value": d.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => W(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			v.value.length > 0 ? (p(), N("div", {
				key: 1,
				class: A(T(G).risk_banner),
				"data-testid": "novelai-ignored"
			}, [D("p", { class: A(T(G).risk_banner_title) }, b(T(o)("settings.novelai.ignored_title")), 3), (p(!0), N(w, null, g(v.value, (e) => (p(), N("p", {
				key: e,
				class: A(T(G).risk_banner_description)
			}, b(T(Ge)(T(o), e)), 3))), 128))], 2)) : y("", !0),
			_.value === null ? y("", !0) : (p(), N("p", {
				key: 2,
				class: A(T(G).status_text),
				role: "alert"
			}, b(_.value), 3)),
			D("div", { class: A(T(G).actions_row) }, [S(V, {
				label: T(o)("settings.novelai.save"),
				variant: "primary",
				pending: q.value === "saving",
				disabled: _.value !== null,
				onClick: re
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), D("span", {
				class: A(T(G).status_text),
				role: "status"
			}, b(q.value === "saved" ? T(o)("settings.novelai.saved") : q.value === "failed" ? T(o)("settings.novelai.save_failed") : ""), 3)], 2)
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
	"onUpdate:modelValue",
	"type",
	"step",
	"list",
	"placeholder",
	"aria-describedby",
	"data-testid"
], et = ["id"], tt = ["value"], nt = {
	key: 1,
	"data-testid": "comfyui-inspection"
}, rt = ["id", "aria-describedby"], it = "workflow", at = "http://127.0.0.1:7860", ot = "http://127.0.0.1:8188", st = /* @__PURE__ */ _({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		promptTagPresets: {},
		workflows: {},
		activeProfileId: {},
		controller: {}
	},
	setup(t) {
		let n = t, r = k(() => n.profiles.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), a = k({
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
		let { t: s } = j();
		function u(e) {
			return {
				steps: e?.steps?.toString() ?? "",
				cfg: e?.cfg?.toString() ?? "",
				sampler_name: e?.sampler_name ?? "",
				scheduler: e?.scheduler ?? "",
				model: e?.model ?? ""
			};
		}
		function d(e) {
			let t = e.steps.trim() === "" ? void 0 : Number(e.steps), n = e.cfg.trim() === "" ? void 0 : Number(e.cfg);
			if (t !== void 0 && (!Number.isInteger(t) || t < 1 || t > 200) || n !== void 0 && (!Number.isFinite(n) || n < 0 || n > 100)) return null;
			let r = (e) => e.trim() === "" ? void 0 : e.trim(), i = r(e.sampler_name), a = r(e.scheduler), o = r(e.model);
			return {
				...t === void 0 ? {} : { steps: t },
				...n === void 0 ? {} : { cfg: n },
				...i === void 0 ? {} : { sampler_name: i },
				...a === void 0 ? {} : { scheduler: a },
				...o === void 0 ? {} : { model: o }
			};
		}
		let f = O(!1), h = O(null), _ = O(!1), C = O(null), P = O(null), F = O(!1), I = O(null), L = O(""), R = O(!1), z = O(null), B = O(/* @__PURE__ */ new Map()), te = Je.map((e) => ({
			value: e,
			label: Ye(s, e)
		})), W = k({
			get: () => h.value?.provider_id ?? "sd_webui",
			set: (e) => {
				h.value && (h.value.provider_id = e, h.value.workflow_id = "", Z.value = null, Q.value = null, h.value.base_url = e === "comfyui" ? ot : at, e === "novelai" && !K.has(h.value.model_id) && (h.value.model_id = le));
			}
		}), K = new Set(i.map((e) => e.model_id)), ne = i.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		})), re = k(() => h.value?.provider_id === "sd_webui" || h.value?.provider_id === "comfyui"), ae = k(() => n.workflows.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), ce = k(() => {
			let e = n.workflows.find((e) => e.id === h.value?.workflow_id);
			if (e === void 0) return null;
			try {
				return J(e.payload);
			} catch {
				return null;
			}
		}), ue = k(() => oe.filter((e) => ce.value?.mapping.inputs[e] !== void 0));
		function Y(e) {
			let t = ce.value === null ? null : se(ce.value, e);
			return t === null ? "" : t.toString();
		}
		function X(e) {
			let t = l.find((t) => t === e);
			return t === void 0 ? [] : Z.value?.options[t] ?? [];
		}
		let Z = O(null), fe = O(!1), Q = O(null);
		async function me() {
			let t = h.value;
			if (!t || fe.value) return;
			let r = he(t.base_url);
			if (r === null) {
				Q.value = s("settings.provider_profiles.base_url_invalid");
				return;
			}
			let i = e.safeParse(t.workflow_id);
			fe.value = !0, Q.value = null, Z.value = null;
			try {
				Z.value = await n.controller.inspect_comfyui({
					base_url: r,
					workflow_id: i.success ? i.data : null
				});
			} catch {
				Q.value = s("settings.provider_profiles.comfyui.unreachable");
			} finally {
				fe.value = !1;
			}
		}
		function he(e) {
			try {
				return c(e.trim());
			} catch {
				return null;
			}
		}
		function ge() {
			h.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "novelai",
				display_name: "",
				model_id: le,
				workflow_id: "",
				base_url: at,
				comfyui: u(null)
			}, C.value = null, Z.value = null, Q.value = null, f.value = !0;
		}
		function $(e) {
			h.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				base_url: e.base_url ?? "",
				comfyui: u(e.comfyui_defaults)
			}, C.value = null, Z.value = null, Q.value = null, f.value = !0;
		}
		function _e() {
			f.value = !1, h.value = null, C.value = null;
		}
		async function ve() {
			let t = h.value;
			if (!t || _.value) return;
			let r = t.display_name.trim(), i = t.provider_id === "comfyui" ? it : t.model_id.trim(), a = d(t.comfyui);
			if (t.provider_id === "comfyui" && a === null) {
				C.value = s("settings.provider_profiles.comfyui.number_invalid");
				return;
			}
			let o = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (r.length === 0 || i.length === 0 || t.provider_id === "comfyui" && o?.success !== !0) {
				C.value = s("errors.validation_required");
				return;
			}
			let c = re.value ? he(t.base_url) : null;
			if (re.value && c === null) {
				C.value = s("settings.provider_profiles.base_url_invalid");
				return;
			}
			_.value = !0, C.value = null;
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
				}), _e();
			} catch {
				C.value = s("errors.unexpected");
			} finally {
				_.value = !1;
			}
		}
		function ye(e) {
			P.value = e;
		}
		async function be() {
			let e = P.value;
			if (!(!e || F.value)) {
				F.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), P.value = null;
				} finally {
					F.value = !1;
				}
			}
		}
		function xe(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function Se(e) {
			I.value = e, L.value = "", z.value = null;
		}
		function Ce() {
			I.value = null, L.value = "", z.value = null;
		}
		async function we() {
			let e = I.value;
			if (!(!e || R.value)) {
				if (L.value.trim().length === 0) {
					z.value = s("errors.validation_required");
					return;
				}
				R.value = !0, z.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, L.value), Ce();
				} catch {
					z.value = s("settings.credential_storage.unlock_required");
				} finally {
					R.value = !1, L.value = "";
				}
			}
		}
		async function Te(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				I.value = e, L.value = "", z.value = s("settings.credential_storage.unlock_required");
			}
		}
		async function Ee(e) {
			B.value.set(e.id, {
				pending: !0,
				label: null
			}), B.value = new Map(B.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), r = t.status === "success" ? `${s("status.success")} · ${s("settings.provider_profiles.connection_test_latency", { ms: t.latency_ms })}` : s("settings.provider_profiles.connection_test_failed", { code: t.error.code });
				B.value.set(e.id, {
					pending: !1,
					label: r
				});
			} catch {
				B.value.set(e.id, {
					pending: !1,
					label: s("errors.unexpected")
				});
			}
			B.value = new Map(B.value);
		}
		return (e, n) => (p(), N("div", {
			class: A(T(G).section),
			"data-testid": "provider-profiles"
		}, [
			D("div", { class: A(T(G).section_header) }, [D("h2", { class: A(T(G).section_title) }, b(T(s)("settings.sections.provider_profiles")), 3), S(V, {
				label: T(s)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: ge
			}, null, 8, ["label", "variant"])], 2),
			t.profiles.length > 0 ? (p(), E(q, {
				key: 0,
				label: T(s)("settings.provider_profiles.active_label"),
				hint: T(s)("settings.provider_profiles.active_hint")
			}, {
				default: m(({ fieldId: e }) => [S(U, {
					id: e,
					modelValue: a.value,
					"onUpdate:modelValue": n[0] ||= (e) => a.value = e,
					options: r.value,
					placeholder: T(s)("settings.provider_profiles.active_label")
				}, null, 8, [
					"id",
					"modelValue",
					"options",
					"placeholder"
				])]),
				_: 1
			}, 8, ["label", "hint"])) : y("", !0),
			S(H, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": T(s)("settings.provider_profiles.empty_description")
			}, {
				default: m(() => [D("div", null, [(p(!0), N(w, null, g(t.profiles, (e) => (p(), N("div", {
					key: e.id,
					class: A(T(G).profile_row),
					"data-testid": "provider-profile-row"
				}, [D("div", { class: A(T(G).profile_identity) }, [
					D("span", { class: A(T(G).profile_name) }, b(e.display_name), 3),
					D("span", { class: A(T(G).profile_meta) }, b(T(Ye)(T(s), e.provider_id)), 3),
					xe(e.provider_id) ? (p(), N("span", {
						key: 0,
						class: A(T(G).profile_meta)
					}, b(e.credential_reference ? T(s)("settings.provider_profiles.credential_set") : T(s)("settings.provider_profiles.credential_unset")), 3)) : y("", !0),
					B.value.get(e.id)?.label ? (p(), N("span", {
						key: 1,
						class: A(T(G).profile_meta),
						"data-testid": "profile-test-result"
					}, b(B.value.get(e.id)?.label), 3)) : y("", !0),
					D("div", { class: A(T(G).prompt_tag_row) }, [S(ee, {
						port: o(e),
						kind: "quality"
					}, null, 8, ["port"]), S(ee, {
						port: o(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), D("div", { class: A(T(G).profile_actions) }, [
					e.id === t.activeProfileId ? (p(), N("span", {
						key: 0,
						class: A(T(G).badge)
					}, b(T(s)("settings.provider_profiles.active_badge")), 3)) : y("", !0),
					S(V, {
						label: T(s)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: B.value.get(e.id)?.pending === !0,
						onClick: (t) => Ee(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					xe(e.provider_id) ? (p(), E(V, {
						key: 1,
						label: T(s)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => Se(e)
					}, null, 8, ["label", "onClick"])) : y("", !0),
					xe(e.provider_id) && e.credential_reference !== null ? (p(), E(V, {
						key: 2,
						label: T(s)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => Te(e)
					}, null, 8, ["label", "onClick"])) : y("", !0),
					S(V, {
						label: T(s)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => $(e)
					}, null, 8, ["label", "onClick"]),
					S(V, {
						label: T(s)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => ye(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			S(pe, {
				open: f.value,
				title: h.value?.is_new ? T(s)("settings.provider_profiles.dialog_add_title") : T(s)("settings.provider_profiles.dialog_edit_title"),
				"close-label": T(s)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && _e()
			}, {
				default: m(() => [h.value ? (p(), N("div", {
					key: 0,
					class: A(T(G).form_grid)
				}, [
					S(q, {
						label: T(s)("common.labels.name"),
						required: ""
					}, {
						default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
							id: e,
							"onUpdate:modelValue": n[1] ||= (e) => h.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: A(T(G).text_input)
						}, null, 10, Xe), [[M, h.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					S(q, {
						label: T(s)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: m(({ fieldId: e }) => [S(U, {
							id: e,
							modelValue: W.value,
							"onUpdate:modelValue": n[2] ||= (e) => W.value = e,
							options: T(te),
							placeholder: T(s)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					h.value.provider_id === "novelai" ? (p(), E(q, {
						key: 0,
						label: T(s)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: m(({ fieldId: e }) => [S(U, {
							id: e,
							modelValue: h.value.model_id,
							"onUpdate:modelValue": n[3] ||= (e) => h.value.model_id = e,
							options: T(ne),
							placeholder: T(s)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : h.value.provider_id === "comfyui" ? y("", !0) : (p(), E(q, {
						key: 1,
						label: T(s)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => h.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: A(T(G).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Ze), [[M, h.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					re.value ? (p(), E(q, {
						key: 2,
						label: T(s)("settings.provider_profiles.base_url_label"),
						hint: h.value.provider_id === "comfyui" ? T(s)("settings.provider_profiles.base_url_hint_comfyui") : T(s)("settings.provider_profiles.base_url_hint_sd_webui"),
						required: ""
					}, {
						default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => h.value.base_url = e,
							type: "url",
							"aria-describedby": t,
							class: A(T(G).text_input),
							"data-testid": "provider-base-url-input"
						}, null, 10, Qe), [[M, h.value.base_url]])]),
						_: 1
					}, 8, ["label", "hint"])) : y("", !0),
					h.value.provider_id === "comfyui" ? (p(), E(q, {
						key: 3,
						label: T(s)("settings.provider_profiles.workflow_label"),
						hint: ae.value.length === 0 ? T(s)("settings.provider_profiles.comfyui.no_workflows") : void 0,
						required: ""
					}, {
						default: m(({ fieldId: e }) => [S(U, {
							id: e,
							modelValue: h.value.workflow_id,
							"onUpdate:modelValue": n[6] ||= (e) => h.value.workflow_id = e,
							options: ae.value,
							placeholder: T(s)("settings.provider_profiles.workflow_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label", "hint"])) : y("", !0),
					h.value.provider_id === "comfyui" ? (p(), N(w, { key: 4 }, [
						(p(!0), N(w, null, g(ue.value, (e) => (p(), E(q, {
							key: e,
							label: T(ie)(T(s), e),
							hint: T(s)("settings.provider_profiles.comfyui.default_hint", { value: Y(e) })
						}, {
							default: m(({ fieldId: t, describedBy: n }) => [v(D("input", {
								id: t,
								"onUpdate:modelValue": (t) => h.value.comfyui[e] = t,
								type: e === "steps" || e === "cfg" ? "number" : "text",
								step: e === "cfg" ? "any" : void 0,
								list: X(e).length > 0 ? `${t}-choices` : void 0,
								placeholder: Y(e),
								"aria-describedby": n,
								class: A(T(G).text_input),
								"data-testid": `comfyui-default-${e}`
							}, null, 10, $e), [[x, h.value.comfyui[e]]]), X(e).length > 0 ? (p(), N("datalist", {
								key: 0,
								id: `${t}-choices`
							}, [(p(!0), N(w, null, g(X(e), (e) => (p(), N("option", {
								key: e,
								value: e
							}, null, 8, tt))), 128))], 8, et)) : y("", !0)]),
							_: 2
						}, 1032, ["label", "hint"]))), 128)),
						D("div", { class: A(T(G).actions_row) }, [S(V, {
							label: T(s)("settings.provider_profiles.comfyui.inspect_action"),
							variant: "secondary",
							pending: fe.value,
							"data-testid": "comfyui-inspect",
							onClick: me
						}, null, 8, ["label", "pending"])], 2),
						Q.value ? (p(), N("p", {
							key: 0,
							class: A([T(G).status_text, T(G).description]),
							"data-tone": "error"
						}, b(Q.value), 3)) : y("", !0),
						Z.value ? (p(), N("div", nt, [
							D("p", { class: A([T(G).status_text, T(G).description]) }, b(T(s)("settings.provider_profiles.comfyui.connected", { version: Z.value.version ?? "?" })), 3),
							Z.value.missing_node_types.length > 0 ? (p(), N("p", {
								key: 0,
								class: A([T(G).status_text, T(G).description]),
								"data-tone": "error"
							}, b(T(s)("settings.provider_profiles.comfyui.missing_nodes", { names: Z.value.missing_node_types.join(", ") })), 3)) : y("", !0),
							(p(!0), N(w, null, g(Z.value.missing_values, (e) => (p(), N("p", {
								key: `${e.node_id}:${e.property}`,
								class: A([T(G).status_text, T(G).description]),
								"data-tone": "error"
							}, b(T(s)("settings.provider_profiles.comfyui.missing_value", {
								node: e.node_id,
								class_type: e.class_type,
								property: e.property,
								value: e.value
							})), 3))), 128)),
							h.value.workflow_id !== "" && Z.value.missing_node_types.length === 0 && Z.value.missing_values.length === 0 ? (p(), N("p", {
								key: 1,
								class: A([T(G).status_text, T(G).description])
							}, b(T(s)("settings.provider_profiles.comfyui.workflow_ready")), 3)) : y("", !0)
						])) : y("", !0)
					], 64)) : y("", !0),
					C.value ? (p(), N("p", {
						key: 5,
						class: A([T(G).status_text, T(G).description]),
						"data-tone": "error"
					}, b(C.value), 3)) : y("", !0),
					D("div", { class: A(T(G).actions_row) }, [S(V, {
						label: T(s)("common.actions.save"),
						pending: _.value,
						onClick: ve
					}, null, 8, ["label", "pending"]), S(V, {
						label: T(s)("common.actions.cancel"),
						variant: "secondary",
						onClick: _e
					}, null, 8, ["label"])], 2)
				], 2)) : y("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			S(pe, {
				open: I.value !== null,
				title: T(s)("settings.provider_profiles.credential_dialog_title", { name: I.value?.display_name ?? "" }),
				description: T(s)("settings.provider_profiles.credential_dialog_description"),
				"close-label": T(s)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && Ce()
			}, {
				default: m(() => [D("div", { class: A(T(G).form_grid) }, [S(q, {
					label: T(s)("settings.provider_profiles.credential_label"),
					error: z.value,
					required: ""
				}, {
					default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => L.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: A(T(G).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, rt), [[M, L.value]])]),
					_: 1
				}, 8, ["label", "error"]), D("div", { class: A(T(G).actions_row) }, [S(V, {
					label: T(s)("common.actions.save"),
					pending: R.value,
					onClick: we
				}, null, 8, ["label", "pending"]), S(V, {
					label: T(s)("common.actions.cancel"),
					variant: "secondary",
					onClick: Ce
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			S(de, {
				open: P.value !== null,
				title: T(s)("settings.provider_profiles.remove_confirm_title", { name: P.value?.display_name ?? "" }),
				description: T(s)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": T(s)("confirmations.destructive.default_confirm_action"),
				"cancel-label": T(s)("confirmations.destructive.default_cancel_action"),
				pending: F.value,
				"onUpdate:open": n[10] ||= (e) => !e && (P.value = null),
				onConfirm: be
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
], dt = 200, ft = /* @__PURE__ */ _({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = j(), r = k(() => t.settings?.translation ?? null);
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
		let d = k(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), h = O([]);
		f(() => r.value?.glossary, (e) => {
			h.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function _() {
			h.value.length < dt && h.value.push({
				source: "",
				target: ""
			});
		}
		function y(e) {
			h.value.splice(e, 1);
		}
		function x() {
			i({ glossary: h.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (p(), N("div", {
			class: A(T(G).section),
			"data-testid": "translation-settings"
		}, [D("div", { class: A(T(G).section_header) }, [D("h2", { class: A(T(G).section_title) }, b(T(n)("settings.nav.translation")), 3)], 2), D("div", { class: A(T(G).form_grid) }, [
			D("p", { class: A(T(G).description) }, b(T(n)("settings.translation.description")), 3),
			S(q, {
				label: T(n)("settings.translation.key_label"),
				hint: T(n)("settings.translation.key_hint")
			}, {
				default: m(({ fieldId: e, describedBy: t }) => [v(D("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: A(T(G).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, ct), [[M, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			D("div", { class: A(T(G).actions_row) }, [
				S(V, {
					label: T(n)("settings.translation.key_save"),
					variant: "primary",
					pending: c.value === "saving",
					disabled: s.value.trim() === "",
					onClick: l
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				S(V, {
					label: T(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				D("span", {
					class: A(T(G).status_text),
					role: "status"
				}, b(d.value), 3)
			], 2),
			D("div", { class: A(T(G).row) }, [D("span", { class: A(T(G).row_label) }, b(T(n)("settings.translation.endpoint_label")), 3), S(Y, {
				"model-value": r.value?.deepl_endpoint ?? "free",
				options: a.value,
				label: T(n)("settings.translation.endpoint_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			D("h3", { class: A(T(G).section_title) }, b(T(n)("settings.translation.glossary_title")), 3),
			D("p", { class: A(T(G).description) }, b(T(n)("settings.translation.glossary_description")), 3),
			(p(!0), N(w, null, g(h.value, (e, t) => (p(), N("div", {
				key: t,
				class: A(T(G).actions_row),
				"data-testid": "glossary-row"
			}, [
				v(D("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": T(n)("settings.translation.glossary_source"),
					placeholder: T(n)("settings.translation.glossary_source"),
					class: A(T(G).text_input)
				}, null, 10, lt), [[M, e.source]]),
				v(D("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": T(n)("settings.translation.glossary_target"),
					placeholder: T(n)("settings.translation.glossary_target"),
					class: A(T(G).text_input)
				}, null, 10, ut), [[M, e.target]]),
				S(V, {
					label: T(n)("settings.translation.glossary_remove"),
					onClick: (e) => y(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			D("div", { class: A(T(G).actions_row) }, [S(V, {
				label: T(n)("settings.translation.glossary_add"),
				disabled: h.value.length >= dt,
				onClick: _
			}, null, 8, ["label", "disabled"]), S(V, {
				label: T(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: x
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), pt = ["aria-label"], mt = [
	"data-selected",
	"aria-current",
	"onClick"
], ht = /* @__PURE__ */ _({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = P(() => import("./PromptView-DZIC21hw.js")), n = P(() => import("./PromptTagPresetPanel-C5ESGIVA.js")), r = P(() => import("./DiagnosticsView-BfhWZaCX.js")), i = e, { t: a } = j(), s = [
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
			illustration: ae,
			providers: o,
			translation: z,
			prompts: B,
			general: ge,
			diagnostics: re
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
		let d = k(() => i.state.settings_section), { toasts: m, push: h, dismiss: _ } = me();
		f(() => i.state.settings.update_command.status, (e, t) => {
			e === "success" && t === "pending" && h({
				title: a("settings.saved"),
				variant: "success",
				duration: 1800
			});
		});
		let v = k(() => i.state.generation.profiles.find((e) => e.id === i.state.settings.settings?.active_provider_profile_id && e.provider_id === "novelai") ?? null);
		function x(e, t) {
			return i.controller.test_prompt_regex(e, t);
		}
		return (i, o) => (p(), N("div", {
			class: A(T(G).layout),
			"data-testid": "settings-view"
		}, [
			D("nav", {
				class: A(T(G).section_nav),
				"aria-label": T(a)("nav.settings")
			}, [(p(), N(w, null, g(s, (t) => D("button", {
				key: t,
				type: "button",
				class: A(["tc-interactive", T(G).section_nav_item]),
				"data-selected": t === d.value,
				"aria-current": t === d.value ? "page" : void 0,
				onClick: (n) => e.controller.set_settings_section(t)
			}, [S(R, {
				icon: l[t],
				size: 15
			}, null, 8, ["icon"]), D("span", null, b(c(t)), 1)], 10, mt)), 64))], 10, pt),
			D("div", { class: A(T(G).section_content) }, [
				D("header", { class: A(T(G).pane_head) }, [D("h1", { class: A(T(G).pane_title) }, b(c(d.value)), 3), D("p", { class: A(T(G).pane_description) }, b(u(d.value)), 3)], 2),
				e.state.settings.update_command.status === "error" ? (p(), N("p", {
					key: 0,
					class: A([T(G).status_text, T(G).description]),
					"data-tone": "error",
					role: "alert",
					"data-testid": "settings-save-failed"
				}, b(T(a)("settings.save_failed", { code: e.state.settings.update_command.failure.code })), 3)) : y("", !0),
				d.value === "prompts" ? (p(), N(w, { key: 1 }, [S(T(t), {
					state: e.state,
					"test-regex": x,
					onSelectPreset: o[0] ||= (t) => void e.controller.select_prompt_preset(t),
					onNewPreset: o[1] ||= (t) => e.controller.start_new_prompt_preset(),
					onBulkDeletePresets: o[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
					onUpdateDraft: o[3] ||= (t) => e.controller.update_prompt_draft(t),
					onSave: o[4] ||= (t) => void e.controller.save_prompt_preset(t)
				}, null, 8, ["state"]), S(T(n), {
					records: e.state.assets.records.prompt_tag,
					loading: e.state.loading.has("assets"),
					controller: e.controller
				}, null, 8, [
					"records",
					"loading",
					"controller"
				])], 64)) : d.value === "diagnostics" ? (p(), E(T(r), {
					key: 2,
					state: e.state,
					controller: e.controller
				}, null, 8, ["state", "controller"])) : (p(), N("div", {
					key: 3,
					class: A(T(G).view)
				}, [d.value === "illustration" ? (p(), E(He, {
					key: 0,
					settings: e.state.settings.settings,
					"prompt-presets": e.state.prompt.presets,
					controller: e.controller
				}, null, 8, [
					"settings",
					"prompt-presets",
					"controller"
				])) : d.value === "providers" ? (p(), N(w, { key: 1 }, [
					e.state.generation.profiles.length === 0 ? (p(), N("section", {
						key: 0,
						class: A(T(G).onboarding),
						"data-testid": "settings-onboarding",
						"aria-labelledby": "settings-onboarding-title"
					}, [D("div", {
						class: A(T(G).onboarding_icon),
						"aria-hidden": "true"
					}, [S(R, {
						icon: T(he),
						size: 22
					}, null, 8, ["icon"])], 2), D("div", null, [
						D("p", { class: A(T(G).onboarding_label) }, b(T(a)("settings.onboarding.label")), 3),
						D("h2", {
							id: "settings-onboarding-title",
							class: A(T(G).onboarding_title)
						}, b(T(a)("settings.onboarding.title")), 3),
						D("p", { class: A(T(G).onboarding_description) }, b(T(a)("settings.onboarding.description")), 3)
					])], 2)) : y("", !0),
					S(st, {
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
					v.value === null ? y("", !0) : (p(), E(qe, {
						key: 1,
						profile: v.value,
						vibes: e.state.assets.records.vibe,
						controller: e.controller
					}, null, 8, [
						"profile",
						"vibes",
						"controller"
					]))
				], 64)) : d.value === "translation" ? (p(), E(ft, {
					key: 2,
					settings: e.state.settings.settings,
					controller: e.controller
				}, null, 8, ["settings", "controller"])) : d.value === "general" ? (p(), N(w, { key: 3 }, [
					S($, {
						settings: e.state.settings.settings,
						controller: e.controller
					}, null, 8, ["settings", "controller"]),
					S(xe, {
						settings: e.state.settings.settings,
						"vault-status": e.state.settings.browser_secret_vault,
						controller: e.controller
					}, null, 8, [
						"settings",
						"vault-status",
						"controller"
					]),
					S(Ee, {
						remote: e.state.settings.settings?.vocabulary_remote ?? null,
						controller: e.controller
					}, null, 8, ["remote", "controller"])
				], 64)) : y("", !0)], 2))
			], 2),
			S(Z, {
				toasts: T(m),
				"viewport-label": T(a)("common.notifications.viewport_label"),
				"announce-label": T(a)("common.notifications.announce_label"),
				"close-label": T(a)("common.actions.close"),
				onDismiss: T(_)
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
