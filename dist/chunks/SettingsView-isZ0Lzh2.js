import { a as e } from "./ids-pPJWL4BL.js";
import { i as t, o as n } from "./novelai-B6V3MfU9.js";
import { i as r, t as i } from "./novelai_models-CXz0Nwhv.js";
import { a, i as o, n as s, r as c, t as l } from "./http_origin-sVHHWysL.js";
import { n as u } from "./settings-Ct41KxU3.js";
import { G as d, H as f, I as p, K as m, P as h, T as g, _, a as v, b as y, dt as b, g as x, h as S, j as C, lt as w, m as T, mt as E, n as D, p as O, s as k, tt as A, u as j, v as M, x as N, y as P } from "./vue-i18n-L-BrQRnK.js";
import { t as F } from "./portal_keys-DthxrmWp.js";
import { n as I, t as L } from "./AppIcon-DkyxvN8k.js";
import { n as R, r as ee, t as te } from "./PromptTagChips-CCFe1e5c.js";
import { n as z, t as ne } from "./StateSurface-DkfG2xGX.js";
import { t as B } from "./AppSelect-CBwNO7WX.js";
import { a as V, i as H, n as U, t as W } from "./ImageSizeField-BQmm3N2a.js";
import { t as re } from "./AppCheckbox-COGvwvBT.js";
import { t as G } from "./FieldGroup-DUIzuG3F.js";
import { n as K, t as q } from "./AppSwitch-DBPX1VeE.js";
import { t as ie } from "./sparkles-DHUWhG-4.js";
import "./browser_secret_vault-Cl9sZA7g.js";
import { n as J, t as ae } from "./novelai_request_defaults-DmJSc0ed.js";
import { n as Y, r as X, t as oe } from "./TagInput-DaW9nw0K.js";
import { t as Z } from "./ToastViewport-D9UeF33M.js";
import { t as se } from "./ConfirmDialog-B5HDtQez.js";
import { t as ce } from "./AppDialog-fgY6zEMc.js";
import { t as le } from "./use_toasts-taqPHY-l.js";
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
]), Q = /* @__PURE__ */ N({
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
		return (t, r) => (h(), _("div", {
			class: b(w(U).section),
			"data-testid": "appearance-settings"
		}, [T("div", { class: b(w(U).section_header) }, [T("h2", { class: b(w(U).section_title) }, E(w(n)("settings.sections.appearance")), 3)], 2), T("div", { class: b(w(U).form_grid) }, [
			T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.appearance.theme_label")), 3), P(X, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: w(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.appearance.language_label")), 3), P(X, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: w(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.appearance.inspector_width_label")), 3), P(Y, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: w(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": w(n)("common.actions.increase"),
				"decrement-label": w(n)("common.actions.decrease"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			P(q, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: w(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), fe = ["data-tone"], pe = ["id", "aria-describedby"], me = ["id", "aria-describedby"], $ = ["id", "aria-describedby"], he = /* @__PURE__ */ N({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = A(""), i = A(""), a = A(!1), o = A(null), s = A(!1), c = O(() => [
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
		]), l = O({
			get: () => t.settings?.credential_storage_mode ?? "browser_device",
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
		}), f = O(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function p() {
			r.value = "", i.value = "";
		}
		function g(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function y(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function S() {
			if (!(a.value || !g(!0))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.initialize_browser_secret_vault(r.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), p();
				} catch (e) {
					o.value = y(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function C() {
			if (!(a.value || !g(!1))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.unlock_browser_secret_vault(r.value), p();
				} catch (e) {
					o.value = y(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function M() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.lock_browser_secret_vault(), p();
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
					await t.controller.reset_browser_secret_vault(), s.value = !1, p();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		return (t, p) => (h(), _("div", {
			class: b(w(U).section),
			"data-testid": "credential-storage-settings"
		}, [
			T("div", { class: b(w(U).section_header) }, [T("h2", { class: b(w(U).section_title) }, E(w(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (h(), _("span", {
				key: 0,
				class: b(w(U).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, E(u.value), 11, fe)) : x("", !0)], 2),
			T("div", { class: b(w(U).vault_mode_row) }, [T("div", { class: b(w(U).profile_identity) }, [T("span", { class: b(w(U).profile_name) }, E(w(n)("settings.credential_storage.mode_label")), 3), T("span", { class: b(w(U).profile_meta) }, E(w(n)("settings.credential_storage.mode_hint")), 3)], 2), P(X, {
				modelValue: l.value,
				"onUpdate:modelValue": p[0] ||= (e) => l.value = e,
				options: c.value,
				label: w(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (h(), _("div", {
				key: 0,
				class: b(w(U).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (h(), _("p", {
				key: 0,
				class: b(w(U).status_text),
				"data-tone": "error",
				role: "alert"
			}, E(f.value), 3)) : e.vaultStatus.state === "uninitialized" ? (h(), _(j, { key: 1 }, [
				P(G, {
					label: w(n)("settings.credential_storage.passphrase_label"),
					hint: w(n)("settings.credential_storage.passphrase_hint", { count: w(12) }),
					required: ""
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": p[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: b(w(U).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, pe), [[v, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				P(G, {
					label: w(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": p[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: b(w(U).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, me), [[v, i.value]])]),
					_: 1
				}, 8, ["label"]),
				P(z, {
					label: w(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: S
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (h(), _(j, { key: 2 }, [P(G, {
				label: w(n)("settings.credential_storage.passphrase_label"),
				hint: w(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
					id: e,
					"onUpdate:modelValue": p[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: b(w(U).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: k(C, ["enter"])
				}, null, 42, $), [[v, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), P(z, {
				label: w(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: C
			}, null, 8, ["label", "pending"])], 64)) : (h(), _("div", {
				key: 3,
				class: b(w(U).vault_unlocked_actions)
			}, [P(z, {
				label: w(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: M
			}, null, 8, ["label", "pending"]), P(z, {
				label: w(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: p[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (h(), _("p", {
				key: 4,
				class: b(w(U).status_text),
				"data-tone": "error",
				role: "alert"
			}, E(o.value), 3)) : x("", !0)], 2)) : x("", !0),
			P(se, {
				open: s.value,
				title: w(n)("settings.credential_storage.reset_confirm_title"),
				description: w(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": w(n)("settings.credential_storage.reset_action"),
				"cancel-label": w(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": p[5] ||= (e) => s.value = e,
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
}), ge = ["aria-label"], _e = ["aria-label"], ve = /* @__PURE__ */ N({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = A(!1), i = [{
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
		let o = A(!1), s = A(!1), c = A(null), l = A(null), u = A(null);
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
		}), g = A(!1), v = A(null);
		async function y() {
			if (!g.value) {
				g.value = !0, v.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "inkwell-archive.zip", r.click(), URL.revokeObjectURL(n);
				} catch {
					v.value = n("errors.unexpected");
				} finally {
					g.value = !1;
				}
			}
		}
		let C = A(!1), k = A(null), j = A(null);
		function M() {
			j.value?.click();
		}
		async function N(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || C.value)) {
				C.value = !0, k.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					k.value = n("errors.unexpected");
				} finally {
					C.value = !1;
				}
			}
		}
		return (t, l) => (h(), _("div", {
			class: b(w(U).section),
			"data-testid": "data-settings"
		}, [T("div", { class: b(w(U).section_header) }, [T("h2", { class: b(w(U).section_title) }, E(w(n)("settings.sections.data")), 3)], 2), T("div", { class: b(w(U).form_grid) }, [
			T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.data.vocabulary_channel_label")), 3), P(X, {
				"model-value": e.vocabularyUpdateChannel ?? "bundled",
				options: i,
				label: w(n)("settings.data.vocabulary_channel_label"),
				disabled: r.value,
				"onUpdate:modelValue": a
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])], 2),
			T("div", { class: b(w(U).actions_row) }, [
				P(z, {
					label: w(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: o.value,
					onClick: d
				}, null, 8, ["label", "pending"]),
				o.value ? (h(), S(z, {
					key: 0,
					label: w(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: f
				}, null, 8, ["label"])) : x("", !0),
				T("input", {
					ref_key: "vocabulary_file_input",
					ref: u,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": w(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: p
				}, null, 40, ge)
			], 2),
			T("p", { class: b(w(U).description) }, E(w(n)("settings.data.vocabulary_import.description")), 3),
			m.value ? (h(), _("p", {
				key: 0,
				class: b([w(U).status_text, w(U).description]),
				"data-testid": "vocabulary-import-progress"
			}, E(m.value), 3)) : x("", !0),
			s.value ? (h(), _("p", {
				key: 1,
				class: b([w(U).status_text, w(U).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, E(w(n)("settings.data.vocabulary_import.success")), 3)) : x("", !0),
			c.value ? (h(), _("p", {
				key: 2,
				class: b([w(U).status_text, w(U).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, E(c.value), 3)) : x("", !0),
			T("div", { class: b(w(U).actions_row) }, [
				P(z, {
					label: w(n)("settings.data.archive_export_action"),
					pending: g.value,
					onClick: y
				}, null, 8, ["label", "pending"]),
				P(z, {
					label: w(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: C.value,
					onClick: M
				}, null, 8, ["label", "pending"]),
				T("input", {
					ref_key: "file_input",
					ref: j,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": w(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: N
				}, null, 40, _e)
			], 2),
			T("p", { class: b(w(U).description) }, E(w(n)("settings.data.archive_import_description")), 3),
			v.value ? (h(), _("p", {
				key: 3,
				class: b([w(U).status_text, w(U).description]),
				"data-tone": "error"
			}, E(v.value), 3)) : x("", !0),
			k.value ? (h(), _("p", {
				key: 4,
				class: b([w(U).status_text, w(U).description]),
				"data-tone": "error"
			}, E(k.value), 3)) : x("", !0)
		], 2)], 2));
	}
}), ye = ["id"], be = "none", xe = "default", Se = /* @__PURE__ */ N({
	__name: "SizeSetSettings",
	props: { illustration: {} },
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = D(), a = g(F, A(null)), o = [
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
		], s = O(() => n.illustration.size_sets), c = O(() => s.value.map((e) => ({
			value: e.id,
			label: e.name
		}))), l = O(() => [{
			value: be,
			label: i("settings.size_sets.none")
		}, ...c.value]), u = O(() => [{
			value: xe,
			label: i("settings.size_sets.follow_default")
		}, ...l.value]), y = O(() => {
			let e = a.value;
			return e === null || !(e in n.illustration.size_set_by_chat) ? xe : n.illustration.size_set_by_chat[e] ?? be;
		});
		function C(e) {
			r("update", { size_set_id: e === be ? null : e });
		}
		function k(e) {
			let t = a.value;
			if (t === null) return;
			let i = Object.entries(n.illustration.size_set_by_chat).filter(([e]) => e !== t), o = e === xe ? i : [...i, [t, e === be ? null : e]];
			r("update", { size_set_by_chat: Object.fromEntries(o.slice(-100)) });
		}
		let M = A(s.value[0]?.id ?? null);
		f(s, (e) => {
			e.some((e) => e.id === M.value) || (M.value = e[0]?.id ?? null);
		});
		let N = O(() => s.value.find((e) => e.id === M.value) ?? null), I = A("");
		f(N, (e) => {
			I.value = e?.name ?? "";
		}, { immediate: !0 });
		function L(e, t = {}) {
			r("update", {
				size_sets: [...e],
				...t
			});
		}
		function R(e) {
			let t = N.value;
			t !== null && L(s.value.map((n) => n.id === t.id ? {
				...n,
				...e
			} : n));
		}
		function ee(e) {
			let t = {
				id: crypto.randomUUID(),
				name: e === null ? i("settings.size_sets.new_name", { n: s.value.length + 1 }) : i("settings.size_sets.copy_name", { name: e.name }),
				sizes: (e?.sizes ?? o).map((e) => ({ ...e }))
			};
			M.value = t.id, L([...s.value, t]);
		}
		function te() {
			let e = N.value;
			e !== null && L(s.value.filter((t) => t.id !== e.id), {
				size_set_id: n.illustration.size_set_id === e.id ? null : n.illustration.size_set_id,
				size_set_by_chat: Object.fromEntries(Object.entries(n.illustration.size_set_by_chat).filter(([, t]) => t !== e.id))
			});
		}
		function ne() {
			let e = I.value.trim();
			e !== "" && e !== N.value?.name && R({ name: e });
		}
		let K = (e, t) => e.width === t.width && e.height === t.height, q = O(() => {
			let e = (N.value?.sizes ?? []).filter((e) => !H.some((t) => K(t, e)));
			return [...H, ...e];
		});
		function ie(e) {
			let t = `${V(e)} · ${String(e.width)} × ${String(e.height)}`;
			return e.width * e.height > 1048576 ? `${t} · ${i("settings.size_sets.costs_anlas")}` : t;
		}
		function J(e) {
			return N.value?.sizes.some((t) => K(t, e)) ?? !1;
		}
		function ae(e, t) {
			let n = N.value;
			if (n === null) return;
			let r = t ? [...n.sizes, { ...e }] : n.sizes.filter((t) => !K(t, e));
			r.length > 0 && r.length <= 16 && R({ sizes: r });
		}
		let Y = A({
			width: 1344,
			height: 768
		});
		function X() {
			J(Y.value) || ae(Y.value, !0);
		}
		return (t, n) => (h(), _("section", {
			class: b(w(U).section),
			"data-testid": "size-set-settings"
		}, [
			T("h2", { class: b(w(U).section_title) }, E(w(i)("settings.groups.sizes")), 3),
			T("p", { class: b(w(U).description) }, E(w(i)("settings.size_sets.hint")), 3),
			T("div", { class: b(w(U).field_grid) }, [T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(i)("settings.size_sets.default_label")), 3), P(B, {
				"model-value": e.illustration.size_set_id ?? be,
				options: l.value,
				placeholder: w(i)("settings.size_sets.default_label"),
				"aria-label": w(i)("settings.size_sets.default_label"),
				"onUpdate:modelValue": C
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2), w(a) === null ? x("", !0) : (h(), _("div", {
				key: 0,
				class: b(w(U).row)
			}, [T("span", { class: b(w(U).row_label) }, E(w(i)("settings.size_sets.chat_label")), 3), P(B, {
				"model-value": y.value,
				options: u.value,
				placeholder: w(i)("settings.size_sets.chat_label"),
				"aria-label": w(i)("settings.size_sets.chat_label"),
				"data-testid": "size-set-chat-select",
				"onUpdate:modelValue": k
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2))], 2),
			T("div", { class: b(w(U).actions_row) }, [
				s.value.length > 0 ? (h(), S(B, {
					key: 0,
					"model-value": M.value ?? void 0,
					options: c.value,
					placeholder: w(i)("settings.size_sets.edit_label"),
					"aria-label": w(i)("settings.size_sets.edit_label"),
					"onUpdate:modelValue": n[0] ||= (e) => M.value = e
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])) : x("", !0),
				P(z, {
					label: w(i)("settings.size_sets.add"),
					onClick: n[1] ||= (e) => ee(null)
				}, null, 8, ["label"]),
				N.value === null ? x("", !0) : (h(), S(z, {
					key: 1,
					label: w(i)("settings.size_sets.duplicate"),
					variant: "ghost",
					onClick: n[2] ||= (e) => ee(N.value)
				}, null, 8, ["label"])),
				N.value === null ? x("", !0) : (h(), S(z, {
					key: 2,
					label: w(i)("settings.size_sets.remove"),
					variant: "destructive",
					onClick: te
				}, null, 8, ["label"]))
			], 2),
			N.value === null ? x("", !0) : (h(), _(j, { key: 0 }, [
				P(G, { label: w(i)("settings.size_sets.name_label") }, {
					default: d(({ fieldId: e }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => I.value = e,
						type: "text",
						maxlength: "60",
						class: b(w(U).text_input),
						"data-testid": "size-set-name-input",
						onBlur: ne
					}, null, 42, ye), [[v, I.value]])]),
					_: 1
				}, 8, ["label"]),
				T("fieldset", {
					class: b(w(U).check_list),
					"data-testid": "size-set-sizes"
				}, [T("legend", { class: b(w(U).row_label) }, E(w(i)("settings.size_sets.sizes_label")), 3), (h(!0), _(j, null, p(q.value, (e) => (h(), S(re, {
					key: `${e.width}x${e.height}`,
					"model-value": J(e),
					label: ie(e),
					disabled: J(e) && N.value.sizes.length === 1,
					"onUpdate:modelValue": (t) => ae(e, t)
				}, null, 8, [
					"model-value",
					"label",
					"disabled",
					"onUpdate:modelValue"
				]))), 128))], 2),
				P(W, {
					modelValue: Y.value,
					"onUpdate:modelValue": n[4] ||= (e) => Y.value = e
				}, null, 8, ["modelValue"]),
				T("div", { class: b(w(U).actions_row) }, [P(z, {
					label: w(i)("settings.size_sets.add_custom"),
					variant: "ghost",
					disabled: J(Y.value) || N.value.sizes.length >= 16,
					onClick: X
				}, null, 8, ["label", "disabled"])], 2)
			], 64))
		], 2));
	}
}), Ce = ["id", "aria-describedby"], we = ["id", "aria-describedby"], Te = ["id", "aria-describedby"], Ee = ["id", "aria-describedby"], De = ["id", "aria-describedby"], Oe = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], ke = [
	"id",
	"aria-describedby",
	"disabled"
], Ae = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], je = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Me = "in_use", Ne = "none", Pe = /* @__PURE__ */ N({
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
		let o = O(() => r.value?.strip ?? u);
		function s(e) {
			a({ strip: {
				...o.value,
				...e
			} });
		}
		let c = O(() => [{
			value: "strip",
			label: n("create.style.strip")
		}, {
			value: "default",
			label: n("create.style.default")
		}]), l = A(""), g = A(""), y = A(""), k = A(""), M = A(""), N = A(""), F = A(""), I = A("");
		f(r, (e) => {
			l.value = e === null || e.preset_name === Me ? "" : e.preset_name, N.value = e?.wardrobe_model ?? "", F.value = e?.analysis_guidance ?? "", I.value = e?.wardrobe_guidance ?? "", e?.connection.kind === "proxy_preset" ? (g.value = e.connection.proxy_preset, y.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (k.value = e.connection.api_url, M.value = e.connection.model);
		}, { immediate: !0 });
		function L() {
			a({ wardrobe_model: N.value.trim() || null });
		}
		function R() {
			a({ preset_name: l.value.trim() || Me });
		}
		let ee = O(() => [
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
		function te() {
			let e = g.value.trim();
			if (e === "") return null;
			let t = y.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function ne() {
			let e = k.value.trim(), t = M.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let V = O(() => Z.value === "custom" && k.value.trim() !== "" && ne() === null);
		function H() {
			let e = ne();
			e !== null && a({ connection: e });
		}
		let W = A(""), K = A("idle");
		async function ie() {
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
		async function J() {
			K.value = "saving";
			try {
				await t.controller.clear_analysis_key(), K.value = "cleared";
			} catch {
				K.value = "failed";
			}
		}
		let ae = O(() => {
			switch (K.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), Z = A(r.value?.connection.kind ?? "current");
		f(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (Z.value = e);
		});
		function se(e) {
			if (e === "current") Z.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				Z.value = "proxy_preset";
				let e = te();
				e !== null && a({ connection: e });
			} else e === "custom" && (Z.value = "custom", H());
		}
		function ce() {
			let e = te();
			e !== null && a({ connection: e });
		}
		let le = O(() => [{
			value: Ne,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function ue(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let de = O(() => [
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
		]), Q = A(r.value?.world_info.mode ?? "chat");
		f(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (Q.value = e);
		});
		let fe = A([]), pe = A(!1);
		async function me() {
			try {
				fe.value = await t.controller.list_worldbooks(), pe.value = !1;
			} catch {
				pe.value = !0;
			}
		}
		C(() => {
			Q.value === "worldbook" && me();
		});
		let $ = O(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbooks : []), he = O(() => [.../* @__PURE__ */ new Set([...fe.value, ...$.value])]);
		function ge(e) {
			e === "chat" || e === "off" ? (Q.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (Q.value = e, me());
		}
		function _e(e, t) {
			let n = t ? [...$.value, e] : $.value.filter((t) => t !== e);
			n.length > 0 && a({ world_info: {
				mode: "worldbook",
				worldbooks: n
			} });
		}
		return (t, u) => (h(), _("div", {
			class: b(w(U).groups),
			"data-testid": "illustration-settings"
		}, [
			T("section", { class: b(w(U).section) }, [
				T("h2", { class: b(w(U).section_title) }, E(w(n)("settings.groups.generation")), 3),
				P(q, {
					"model-value": e.settings?.auto_generation_enabled ?? !1,
					label: w(n)("settings.illustration.auto_generation_label"),
					description: w(n)("settings.illustration.auto_generation_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[0] ||= (e) => i({ auto_generation_enabled: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				T("div", { class: b(w(U).field_grid) }, [
					T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.illustration.max_images_label")), 3), P(Y, {
						"model-value": r.value?.max_images_per_message,
						label: w(n)("settings.illustration.max_images_label"),
						min: 1,
						max: 8,
						"increment-label": w(n)("common.actions.increase"),
						"decrement-label": w(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": u[1] ||= (e) => a({ max_images_per_message: e })
					}, null, 8, [
						"model-value",
						"label",
						"increment-label",
						"decrement-label",
						"disabled"
					])], 2),
					T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.illustration.prompt_preset_label")), 3), P(B, {
						"model-value": r.value?.prompt_preset_id ?? Ne,
						options: le.value,
						placeholder: w(n)("settings.illustration.prompt_preset_label"),
						"aria-label": w(n)("settings.illustration.prompt_preset_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": ue
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"aria-label",
						"disabled"
					])], 2),
					T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.illustration.concurrency_label")), 3), P(Y, {
						"model-value": e.settings?.global_concurrency,
						label: w(n)("settings.illustration.concurrency_label"),
						min: 1,
						max: 4,
						"increment-label": w(n)("common.actions.increase"),
						"decrement-label": w(n)("common.actions.decrease"),
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
			r.value === null ? x("", !0) : (h(), S(Se, {
				key: 0,
				illustration: r.value,
				onUpdate: a
			}, null, 8, ["illustration"])),
			T("section", { class: b(w(U).section) }, [
				T("h2", { class: b(w(U).section_title) }, E(w(n)("settings.groups.analysis")), 3),
				T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.illustration.connection_label")), 3), P(X, {
					"model-value": Z.value,
					options: ee.value,
					label: w(n)("settings.illustration.connection_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": se
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				Z.value === "proxy_preset" ? (h(), _(j, { key: 0 }, [P(G, {
					label: w(n)("settings.illustration.proxy_preset_label"),
					hint: w(n)("settings.illustration.proxy_preset_hint")
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": u[3] ||= (e) => g.value = e,
						type: "text",
						"aria-describedby": t,
						class: b(w(U).text_input),
						"data-testid": "analysis-proxy-preset-input",
						onBlur: ce
					}, null, 42, Ce), [[v, g.value]])]),
					_: 1
				}, 8, ["label", "hint"]), P(G, {
					label: w(n)("settings.illustration.proxy_model_label"),
					hint: w(n)("settings.illustration.proxy_model_hint")
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": u[4] ||= (e) => y.value = e,
						type: "text",
						"aria-describedby": t,
						class: b(w(U).text_input),
						onBlur: ce
					}, null, 42, we), [[v, y.value]])]),
					_: 1
				}, 8, ["label", "hint"])], 64)) : x("", !0),
				Z.value === "custom" ? (h(), _(j, { key: 1 }, [
					P(G, {
						label: w(n)("settings.illustration.custom_url_label"),
						hint: w(n)("settings.illustration.custom_url_hint"),
						error: V.value ? w(n)("settings.illustration.custom_invalid") : null
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": u[5] ||= (e) => k.value = e,
							type: "url",
							placeholder: "https://",
							"aria-describedby": t,
							class: b(w(U).text_input),
							"data-testid": "analysis-custom-url-input",
							onBlur: H
						}, null, 42, Te), [[v, k.value]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					P(G, { label: w(n)("settings.illustration.custom_model_label") }, {
						default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": u[6] ||= (e) => M.value = e,
							type: "text",
							"aria-describedby": t,
							class: b(w(U).text_input),
							"data-testid": "analysis-custom-model-input",
							onBlur: H
						}, null, 42, Ee), [[v, M.value]])]),
						_: 1
					}, 8, ["label"]),
					P(G, {
						label: w(n)("settings.illustration.custom_key_label"),
						hint: w(n)("settings.illustration.custom_key_hint")
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [T("div", { class: b(w(U).input_row) }, [m(T("input", {
							id: e,
							"onUpdate:modelValue": u[7] ||= (e) => W.value = e,
							type: "password",
							autocomplete: "off",
							"aria-describedby": t,
							class: b(w(U).text_input),
							"data-testid": "analysis-custom-key-input"
						}, null, 10, De), [[v, W.value]]), P(z, {
							label: w(n)("settings.illustration.custom_key_save"),
							pending: K.value === "saving",
							disabled: W.value.trim() === "",
							onClick: ie
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					T("div", { class: b(w(U).actions_row) }, [P(z, {
						label: w(n)("settings.illustration.custom_key_clear"),
						variant: "ghost",
						onClick: J
					}, null, 8, ["label"]), T("span", {
						class: b(w(U).status_text),
						role: "status"
					}, E(ae.value), 3)], 2)
				], 64)) : x("", !0),
				P(G, {
					label: w(n)("settings.illustration.preset_label"),
					hint: w(n)("settings.illustration.preset_hint")
				}, {
					default: d(({ fieldId: t, describedBy: r }) => [m(T("input", {
						id: t,
						"onUpdate:modelValue": u[8] ||= (e) => l.value = e,
						type: "text",
						placeholder: w(n)("settings.illustration.preset_placeholder"),
						"aria-describedby": r,
						class: b(w(U).text_input),
						disabled: !e.settings,
						"data-testid": "analysis-preset-input",
						onBlur: R
					}, null, 42, Oe), [[v, l.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.illustration.chat_history_label")), 3), P(Y, {
					"model-value": r.value?.max_chat_history,
					label: w(n)("settings.illustration.chat_history_label"),
					min: 0,
					max: 20,
					"increment-label": w(n)("common.actions.increase"),
					"decrement-label": w(n)("common.actions.decrease"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[9] ||= (e) => a({ max_chat_history: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label",
					"disabled"
				])], 2),
				T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.illustration.world_info_label")), 3), P(X, {
					"model-value": Q.value,
					options: de.value,
					label: w(n)("settings.illustration.world_info_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": ge
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				T("p", { class: b(w(U).description) }, E(w(n)("settings.illustration.world_info_hint")), 3),
				Q.value === "worldbook" ? (h(), _(j, { key: 2 }, [T("fieldset", {
					class: b(w(U).check_list),
					"data-testid": "worldbook-list"
				}, [
					T("legend", { class: b(w(U).row_label) }, E(w(n)("settings.illustration.worldbook_label")), 3),
					(h(!0), _(j, null, p(he.value, (e) => (h(), S(re, {
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
					$.value.length === 0 ? (h(), _("p", {
						key: 0,
						class: b(w(U).description)
					}, E(w(n)("settings.illustration.worldbook_placeholder")), 3)) : x("", !0)
				], 2), pe.value ? (h(), _("p", {
					key: 0,
					class: b(w(U).description),
					role: "alert"
				}, E(w(n)("settings.illustration.worldbook_unavailable")), 3)) : x("", !0)], 64)) : x("", !0),
				P(G, {
					label: w(n)("settings.illustration.wardrobe_model_label"),
					hint: Z.value === "current" ? w(n)("settings.illustration.wardrobe_model_current_hint") : w(n)("settings.illustration.wardrobe_model_hint")
				}, {
					default: d(({ fieldId: t, describedBy: n }) => [m(T("input", {
						id: t,
						"onUpdate:modelValue": u[10] ||= (e) => N.value = e,
						type: "text",
						"aria-describedby": n,
						class: b(w(U).text_input),
						disabled: !e.settings || Z.value === "current",
						"data-testid": "wardrobe-model-input",
						onBlur: L
					}, null, 42, ke), [[v, N.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			T("section", { class: b(w(U).section) }, [
				T("h2", { class: b(w(U).section_title) }, E(w(n)("settings.groups.guidance")), 3),
				P(G, {
					label: w(n)("settings.illustration.analysis_guidance_label"),
					hint: w(n)("settings.illustration.analysis_guidance_hint")
				}, {
					default: d(({ fieldId: t, describedBy: r }) => [m(T("textarea", {
						id: t,
						"onUpdate:modelValue": u[11] ||= (e) => F.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: w(n)("settings.illustration.analysis_guidance_placeholder"),
						"aria-describedby": r,
						class: b(w(U).text_area),
						disabled: !e.settings,
						"data-testid": "analysis-guidance-input",
						onBlur: u[12] ||= (e) => a({ analysis_guidance: F.value.trim() })
					}, null, 42, Ae), [[v, F.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				P(G, {
					label: w(n)("settings.illustration.wardrobe_guidance_label"),
					hint: w(n)("settings.illustration.wardrobe_guidance_hint")
				}, {
					default: d(({ fieldId: t, describedBy: r }) => [m(T("textarea", {
						id: t,
						"onUpdate:modelValue": u[13] ||= (e) => I.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: w(n)("settings.illustration.wardrobe_guidance_placeholder"),
						"aria-describedby": r,
						class: b(w(U).text_area),
						disabled: !e.settings,
						"data-testid": "wardrobe-guidance-input",
						onBlur: u[14] ||= (e) => a({ wardrobe_guidance: I.value.trim() })
					}, null, 42, je), [[v, I.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			T("section", { class: b(w(U).section) }, [
				T("h2", { class: b(w(U).section_title) }, E(w(n)("settings.groups.strip")), 3),
				P(G, {
					label: w(n)("settings.illustration.strip_style_label"),
					hint: w(n)("settings.illustration.strip_style_hint")
				}, {
					default: d(() => [P(X, {
						"model-value": o.value.style,
						options: c.value,
						label: w(n)("settings.illustration.strip_style_label"),
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
				P(G, { label: w(n)("settings.illustration.strip_max_label") }, {
					default: d(({ fieldId: t }) => [P(Y, {
						id: t,
						"model-value": o.value.max_panels,
						label: w(n)("settings.illustration.strip_max_label"),
						min: 1,
						max: 12,
						"increment-label": w(n)("common.actions.increase"),
						"decrement-label": w(n)("common.actions.decrease"),
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
				P(q, {
					"model-value": o.value.symbol_bubbles,
					label: w(n)("settings.illustration.strip_bubbles_label"),
					description: w(n)("settings.illustration.strip_bubbles_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[17] ||= (e) => s({ symbol_bubbles: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				P(G, { label: w(n)("settings.illustration.strip_style_tags_label") }, {
					default: d(({ fieldId: e }) => [P(oe, {
						id: e,
						"model-value": o.value.style_tags,
						"onUpdate:modelValue": u[18] ||= (e) => s({ style_tags: e })
					}, null, 8, ["id", "model-value"])]),
					_: 1
				}, 8, ["label"]),
				P(G, {
					label: w(n)("settings.illustration.strip_no_text_label"),
					hint: w(n)("settings.illustration.strip_no_text_hint")
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [P(oe, {
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
}), Fe = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, Ie = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function Le(e, t) {
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
var Re = "https://novelai.net/image", ze = /* @__PURE__ */ N({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let i = e, { t: s, d: c } = D(), l = O(() => {
			let e = i.profile.model_id;
			return e != null && r(e) !== null ? e : ae;
		});
		function u() {
			if (i.profile.novelai_defaults !== null) return i.profile.novelai_defaults;
			let e = J(l.value);
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
		let d = A(u());
		f(() => i.profile.id, () => {
			d.value = u();
		});
		function m(e) {
			d.value = {
				...d.value,
				...e
			};
		}
		let g = O(() => o.safeParse(d.value).success ? null : s("settings.novelai.invalid_size")), v = O(() => {
			let e = r(l.value);
			return e === null ? [] : a(e.profile, d.value);
		}), y = A(null), k = A(null), N = A(!1), F = A(!1);
		async function I() {
			F.value = !0, k.value = null, N.value = !1;
			try {
				y.value = await i.controller.load_novelai_account();
			} catch (e) {
				N.value = e instanceof Error && e.name === "ProviderNetworkError", k.value = e instanceof Error ? e.message : String(e);
			} finally {
				F.value = !1;
			}
		}
		let L = A([]);
		C(async () => {
			try {
				L.value = (await i.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				L.value = [];
			}
		});
		let R = O(() => L.value.map((e) => ({
			value: e.profile.model_id,
			label: e.profile.display_name
		})));
		async function ee(e) {
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
		let te = n.options.map((e) => ({
			value: e,
			label: Fe[e]
		})), ne = t.options.map((e) => ({
			value: e,
			label: Ie[e]
		}));
		function V(e, t, n) {
			t.includes(n) && m({ [e]: n });
		}
		let H = O(() => i.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function G(e, t) {
			let n = d.value.vibe_asset_ids.filter((t) => t !== e);
			m({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let K = A("idle");
		async function ie() {
			K.value = "saving";
			try {
				await i.controller.save_novelai_defaults(i.profile.id, d.value), K.value = "saved";
			} catch {
				K.value = "failed";
			}
		}
		return (r, i) => (h(), _("div", {
			class: b(w(U).section),
			"data-testid": "novelai-settings"
		}, [T("div", { class: b(w(U).section_header) }, [T("h2", { class: b(w(U).section_title) }, E(w(s)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), T("div", { class: b(w(U).form_grid) }, [
			T("div", { class: b(w(U).actions_row) }, [P(z, {
				label: w(s)("settings.novelai.refresh_account"),
				pending: F.value,
				onClick: I
			}, null, 8, ["label", "pending"]), y.value === null ? N.value ? (h(), _("span", {
				key: 1,
				class: b(w(U).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [M(E(w(s)("settings.novelai.account_unreachable")) + " ", 1), T("a", {
				href: Re,
				target: "_blank",
				rel: "noopener noreferrer"
			}, E(w(s)("settings.novelai.account_open_site")), 1)], 2)) : k.value === null ? x("", !0) : (h(), _("span", {
				key: 2,
				class: b(w(U).status_text)
			}, E(k.value), 3)) : (h(), _("span", {
				key: 0,
				class: b(w(U).status_text),
				"data-testid": "novelai-account"
			}, E(w(s)("settings.novelai.account_summary", {
				tier: y.value.tier,
				anlas: y.value.anlas,
				expires: w(c)(new Date(y.value.expires_at), "short_date")
			})), 3))], 2),
			T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(s)("settings.novelai.model_label")), 3), P(B, {
				"model-value": l.value,
				options: R.value,
				placeholder: l.value,
				"aria-label": w(s)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void ee(e)
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
				"onUpdate:modelValue": i[1] ||= (e) => m(e)
			}, null, 8, ["model-value"]),
			T("div", { class: b(w(U).field_grid) }, [
				T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(s)("settings.novelai.steps_label")), 3), P(Y, {
					"model-value": d.value.steps,
					label: w(s)("settings.novelai.steps_label"),
					min: 1,
					max: 50,
					"increment-label": w(s)("common.actions.increase"),
					"decrement-label": w(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[2] ||= (e) => m({ steps: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(s)("settings.novelai.scale_label")), 3), P(Y, {
					"model-value": d.value.scale,
					label: w(s)("settings.novelai.scale_label"),
					min: 0,
					max: 10,
					step: .1,
					"increment-label": w(s)("common.actions.increase"),
					"decrement-label": w(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[3] ||= (e) => m({ scale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(s)("settings.novelai.cfg_rescale_label")), 3), P(Y, {
					"model-value": d.value.cfg_rescale,
					label: w(s)("settings.novelai.cfg_rescale_label"),
					min: 0,
					max: 1,
					step: .02,
					"increment-label": w(s)("common.actions.increase"),
					"decrement-label": w(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[4] ||= (e) => m({ cfg_rescale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(s)("settings.novelai.sampler_label")), 3), P(B, {
					"model-value": d.value.sampler,
					options: w(te),
					placeholder: w(s)("settings.novelai.sampler_label"),
					"aria-label": w(s)("settings.novelai.sampler_label"),
					"onUpdate:modelValue": i[5] ||= (e) => V("sampler", w(n).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2),
				T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(s)("settings.novelai.noise_schedule_label")), 3), P(B, {
					"model-value": d.value.noise_schedule,
					options: w(ne),
					placeholder: w(s)("settings.novelai.noise_schedule_label"),
					"aria-label": w(s)("settings.novelai.noise_schedule_label"),
					"onUpdate:modelValue": i[6] ||= (e) => V("noise_schedule", w(t).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2)
			], 2),
			P(q, {
				"model-value": d.value.smea,
				label: w(s)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[7] ||= (e) => m({ smea: e })
			}, null, 8, ["model-value", "label"]),
			P(q, {
				"model-value": d.value.dyn,
				label: w(s)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[8] ||= (e) => m({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			P(q, {
				"model-value": d.value.variety_plus,
				label: w(s)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[9] ||= (e) => m({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			T("h3", { class: b(w(U).section_title) }, E(w(s)("settings.novelai.vibes_title")), 3),
			H.value.length === 0 ? (h(), _("p", {
				key: 0,
				class: b(w(U).description)
			}, E(w(s)("settings.novelai.vibes_empty")), 3)) : x("", !0),
			(h(!0), _(j, null, p(H.value, (e) => (h(), S(re, {
				key: e.id,
				"model-value": d.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => G(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			v.value.length > 0 ? (h(), _("div", {
				key: 1,
				class: b(w(U).risk_banner),
				"data-testid": "novelai-ignored"
			}, [T("p", { class: b(w(U).risk_banner_title) }, E(w(s)("settings.novelai.ignored_title")), 3), (h(!0), _(j, null, p(v.value, (e) => (h(), _("p", {
				key: e,
				class: b(w(U).risk_banner_description)
			}, E(w(Le)(w(s), e)), 3))), 128))], 2)) : x("", !0),
			g.value === null ? x("", !0) : (h(), _("p", {
				key: 2,
				class: b(w(U).status_text),
				role: "alert"
			}, E(g.value), 3)),
			T("div", { class: b(w(U).actions_row) }, [P(z, {
				label: w(s)("settings.novelai.save"),
				variant: "primary",
				pending: K.value === "saving",
				disabled: g.value !== null,
				onClick: ie
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), T("span", {
				class: b(w(U).status_text),
				role: "status"
			}, E(K.value === "saved" ? w(s)("settings.novelai.saved") : K.value === "failed" ? w(s)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Be = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Ve(e, t) {
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
var He = ["id", "aria-describedby"], Ue = ["id", "aria-describedby"], We = ["id", "aria-describedby"], Ge = ["id", "aria-describedby"], Ke = ["id", "aria-describedby"], qe = "http://127.0.0.1:7860", Je = "http://127.0.0.1:8188", Ye = /* @__PURE__ */ N({
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
		let { t: a } = D(), o = A(!1), c = A(null), u = A(!1), f = A(null), g = A(null), y = A(!1), C = A(null), k = A(""), M = A(!1), N = A(null), F = A(/* @__PURE__ */ new Map()), I = Be.map((e) => ({
			value: e,
			label: Ve(a, e)
		})), L = O({
			get: () => c.value?.provider_id ?? "sd_webui",
			set: (e) => {
				c.value && (c.value.provider_id = e, c.value.workflow_id = "", c.value.base_url = e === "comfyui" ? Je : qe, e === "novelai" && !R.has(c.value.model_id) && (c.value.model_id = ae));
			}
		}), R = new Set(i.map((e) => e.model_id)), ee = i.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		})), V = O(() => c.value?.provider_id === "sd_webui" || c.value?.provider_id === "comfyui");
		function H(e) {
			try {
				let t = s(e.trim());
				return l(t) ? t : null;
			} catch {
				return null;
			}
		}
		function W() {
			c.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "novelai",
				display_name: "",
				model_id: ae,
				workflow_id: "",
				base_url: qe,
				is_default: n.profiles.length === 0
			}, f.value = null, o.value = !0;
		}
		function re(e) {
			c.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				base_url: e.base_url ?? "",
				is_default: e.is_default
			}, f.value = null, o.value = !0;
		}
		function K() {
			o.value = !1, c.value = null, f.value = null;
		}
		async function ie() {
			let t = c.value;
			if (!t || u.value) return;
			let r = t.display_name.trim(), i = t.model_id.trim(), o = t.provider_id === "comfyui" ? e.safeParse(t.workflow_id.trim()) : null;
			if (r.length === 0 || i.length === 0 || t.provider_id === "comfyui" && o?.success !== !0) {
				f.value = a("errors.validation_required");
				return;
			}
			let s = V.value ? H(t.base_url) : null;
			if (V.value && s === null) {
				f.value = a("settings.provider_profiles.base_url_invalid");
				return;
			}
			u.value = !0, f.value = null;
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
				}), K();
			} catch {
				f.value = a("errors.unexpected");
			} finally {
				u.value = !1;
			}
		}
		function J(e) {
			g.value = e;
		}
		async function Y() {
			let e = g.value;
			if (!(!e || y.value)) {
				y.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), g.value = null;
				} finally {
					y.value = !1;
				}
			}
		}
		function X(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function oe(e) {
			C.value = e, k.value = "", N.value = null;
		}
		function Z() {
			C.value = null, k.value = "", N.value = null;
		}
		async function le() {
			let e = C.value;
			if (!(!e || M.value)) {
				if (k.value.trim().length === 0) {
					N.value = a("errors.validation_required");
					return;
				}
				M.value = !0, N.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, k.value), Z();
				} catch {
					N.value = a("settings.credential_storage.unlock_required");
				} finally {
					M.value = !1, k.value = "";
				}
			}
		}
		async function ue(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				C.value = e, k.value = "", N.value = a("settings.credential_storage.unlock_required");
			}
		}
		async function de(e) {
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
		return (e, n) => (h(), _("div", {
			class: b(w(U).section),
			"data-testid": "provider-profiles"
		}, [
			T("div", { class: b(w(U).section_header) }, [T("h2", { class: b(w(U).section_title) }, E(w(a)("settings.sections.provider_profiles")), 3), P(z, {
				label: w(a)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: W
			}, null, 8, ["label", "variant"])], 2),
			P(ne, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": w(a)("settings.provider_profiles.empty_description")
			}, {
				default: d(() => [T("div", null, [(h(!0), _(j, null, p(t.profiles, (e) => (h(), _("div", {
					key: e.id,
					class: b(w(U).profile_row),
					"data-testid": "provider-profile-row"
				}, [T("div", { class: b(w(U).profile_identity) }, [
					T("span", { class: b(w(U).profile_name) }, E(e.display_name), 3),
					T("span", { class: b(w(U).profile_meta) }, E(w(Ve)(w(a), e.provider_id)), 3),
					X(e.provider_id) ? (h(), _("span", {
						key: 0,
						class: b(w(U).profile_meta)
					}, E(e.credential_reference ? w(a)("settings.provider_profiles.credential_set") : w(a)("settings.provider_profiles.credential_unset")), 3)) : x("", !0),
					F.value.get(e.id)?.label ? (h(), _("span", {
						key: 1,
						class: b(w(U).profile_meta),
						"data-testid": "profile-test-result"
					}, E(F.value.get(e.id)?.label), 3)) : x("", !0),
					T("div", { class: b(w(U).prompt_tag_row) }, [P(te, {
						port: r(e),
						kind: "quality"
					}, null, 8, ["port"]), P(te, {
						port: r(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), T("div", { class: b(w(U).profile_actions) }, [
					e.is_default ? (h(), _("span", {
						key: 0,
						class: b(w(U).badge)
					}, E(w(a)("settings.provider_profiles.default_badge")), 3)) : x("", !0),
					P(z, {
						label: w(a)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: F.value.get(e.id)?.pending === !0,
						onClick: (t) => de(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					X(e.provider_id) ? (h(), S(z, {
						key: 1,
						label: w(a)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => oe(e)
					}, null, 8, ["label", "onClick"])) : x("", !0),
					X(e.provider_id) && e.credential_reference !== null ? (h(), S(z, {
						key: 2,
						label: w(a)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => ue(e)
					}, null, 8, ["label", "onClick"])) : x("", !0),
					P(z, {
						label: w(a)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => re(e)
					}, null, 8, ["label", "onClick"]),
					P(z, {
						label: w(a)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => J(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			P(ce, {
				open: o.value,
				title: c.value?.is_new ? w(a)("settings.provider_profiles.dialog_add_title") : w(a)("settings.provider_profiles.dialog_edit_title"),
				"close-label": w(a)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && K()
			}, {
				default: d(() => [c.value ? (h(), _("div", {
					key: 0,
					class: b(w(U).form_grid)
				}, [
					P(G, {
						label: w(a)("common.labels.name"),
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => c.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: b(w(U).text_input)
						}, null, 10, He), [[v, c.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					P(G, {
						label: w(a)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: d(({ fieldId: e }) => [P(B, {
							id: e,
							modelValue: L.value,
							"onUpdate:modelValue": n[1] ||= (e) => L.value = e,
							options: w(I),
							placeholder: w(a)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					c.value.provider_id === "novelai" ? (h(), S(G, {
						key: 0,
						label: w(a)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: d(({ fieldId: e }) => [P(B, {
							id: e,
							modelValue: c.value.model_id,
							"onUpdate:modelValue": n[2] ||= (e) => c.value.model_id = e,
							options: w(ee),
							placeholder: w(a)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : (h(), S(G, {
						key: 1,
						label: w(a)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => c.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: b(w(U).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Ue), [[v, c.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					V.value ? (h(), S(G, {
						key: 2,
						label: w(a)("settings.provider_profiles.base_url_label"),
						hint: c.value.provider_id === "comfyui" ? w(a)("settings.provider_profiles.base_url_hint_comfyui") : w(a)("settings.provider_profiles.base_url_hint_sd_webui"),
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => c.value.base_url = e,
							type: "url",
							"aria-describedby": t,
							class: b(w(U).text_input),
							"data-testid": "provider-base-url-input"
						}, null, 10, We), [[v, c.value.base_url]])]),
						_: 1
					}, 8, ["label", "hint"])) : x("", !0),
					c.value.provider_id === "comfyui" ? (h(), S(G, {
						key: 3,
						label: w(a)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => c.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: b(w(U).text_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, Ge), [[v, c.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : x("", !0),
					P(q, {
						modelValue: c.value.is_default,
						"onUpdate:modelValue": n[6] ||= (e) => c.value.is_default = e,
						label: w(a)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					f.value ? (h(), _("p", {
						key: 4,
						class: b([w(U).status_text, w(U).description]),
						"data-tone": "error"
					}, E(f.value), 3)) : x("", !0),
					T("div", { class: b(w(U).actions_row) }, [P(z, {
						label: w(a)("common.actions.save"),
						pending: u.value,
						onClick: ie
					}, null, 8, ["label", "pending"]), P(z, {
						label: w(a)("common.actions.cancel"),
						variant: "secondary",
						onClick: K
					}, null, 8, ["label"])], 2)
				], 2)) : x("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			P(ce, {
				open: C.value !== null,
				title: w(a)("settings.provider_profiles.credential_dialog_title", { name: C.value?.display_name ?? "" }),
				description: w(a)("settings.provider_profiles.credential_dialog_description"),
				"close-label": w(a)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && Z()
			}, {
				default: d(() => [T("div", { class: b(w(U).form_grid) }, [P(G, {
					label: w(a)("settings.provider_profiles.credential_label"),
					error: N.value,
					required: ""
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => k.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: b(w(U).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, Ke), [[v, k.value]])]),
					_: 1
				}, 8, ["label", "error"]), T("div", { class: b(w(U).actions_row) }, [P(z, {
					label: w(a)("common.actions.save"),
					pending: M.value,
					onClick: le
				}, null, 8, ["label", "pending"]), P(z, {
					label: w(a)("common.actions.cancel"),
					variant: "secondary",
					onClick: Z
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			P(se, {
				open: g.value !== null,
				title: w(a)("settings.provider_profiles.remove_confirm_title", { name: g.value?.display_name ?? "" }),
				description: w(a)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": w(a)("confirmations.destructive.default_confirm_action"),
				"cancel-label": w(a)("confirmations.destructive.default_cancel_action"),
				pending: y.value,
				"onUpdate:open": n[10] ||= (e) => !e && (g.value = null),
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
}), Xe = ["id", "aria-describedby"], Ze = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], Qe = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], $e = 200, et = /* @__PURE__ */ N({
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
		let s = A(""), c = A("idle");
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
		let g = O(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), y = A([]);
		f(() => r.value?.glossary, (e) => {
			y.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function x() {
			y.value.length < $e && y.value.push({
				source: "",
				target: ""
			});
		}
		function S(e) {
			y.value.splice(e, 1);
		}
		function C() {
			i({ glossary: y.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (h(), _("div", {
			class: b(w(U).section),
			"data-testid": "translation-settings"
		}, [T("div", { class: b(w(U).section_header) }, [T("h2", { class: b(w(U).section_title) }, E(w(n)("settings.nav.translation")), 3)], 2), T("div", { class: b(w(U).form_grid) }, [
			T("p", { class: b(w(U).description) }, E(w(n)("settings.translation.description")), 3),
			P(G, {
				label: w(n)("settings.translation.key_label"),
				hint: w(n)("settings.translation.key_hint")
			}, {
				default: d(({ fieldId: e, describedBy: t }) => [m(T("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: b(w(U).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, Xe), [[v, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			T("div", { class: b(w(U).actions_row) }, [
				P(z, {
					label: w(n)("settings.translation.key_save"),
					variant: "primary",
					pending: c.value === "saving",
					disabled: s.value.trim() === "",
					onClick: l
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				P(z, {
					label: w(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				T("span", {
					class: b(w(U).status_text),
					role: "status"
				}, E(g.value), 3)
			], 2),
			T("div", { class: b(w(U).row) }, [T("span", { class: b(w(U).row_label) }, E(w(n)("settings.translation.endpoint_label")), 3), P(X, {
				"model-value": r.value?.deepl_endpoint ?? "free",
				options: a.value,
				label: w(n)("settings.translation.endpoint_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			T("h3", { class: b(w(U).section_title) }, E(w(n)("settings.translation.glossary_title")), 3),
			T("p", { class: b(w(U).description) }, E(w(n)("settings.translation.glossary_description")), 3),
			(h(!0), _(j, null, p(y.value, (e, t) => (h(), _("div", {
				key: t,
				class: b(w(U).actions_row),
				"data-testid": "glossary-row"
			}, [
				m(T("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": w(n)("settings.translation.glossary_source"),
					placeholder: w(n)("settings.translation.glossary_source"),
					class: b(w(U).text_input)
				}, null, 10, Ze), [[v, e.source]]),
				m(T("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": w(n)("settings.translation.glossary_target"),
					placeholder: w(n)("settings.translation.glossary_target"),
					class: b(w(U).text_input)
				}, null, 10, Qe), [[v, e.target]]),
				P(z, {
					label: w(n)("settings.translation.glossary_remove"),
					onClick: (e) => S(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			T("div", { class: b(w(U).actions_row) }, [P(z, {
				label: w(n)("settings.translation.glossary_add"),
				disabled: y.value.length >= $e,
				onClick: x
			}, null, 8, ["label", "disabled"]), P(z, {
				label: w(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: C
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), tt = ["aria-label"], nt = [
	"data-selected",
	"aria-current",
	"onClick"
], rt = /* @__PURE__ */ N({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = y(() => import("./PromptView-BVeZuNP5.js")), n = y(() => import("./PromptTagPresetPanel-By5jcE0Z.js")), r = y(() => import("./DiagnosticsView-Ctrk7MjU.js")), i = e, { t: a } = D(), o = [
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
			illustration: ie,
			providers: c,
			translation: R,
			prompts: ee,
			general: de,
			diagnostics: K
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
		let d = O(() => i.state.settings_section), { toasts: m, push: g, dismiss: v } = le();
		f(() => i.state.settings.update_command.status, (e, t) => {
			e === "success" && t === "pending" && g({
				title: a("settings.saved"),
				variant: "success",
				duration: 1800
			});
		});
		let C = O(() => i.state.generation.profiles.find((e) => e.id === i.state.generation.active_profile_id && e.provider_id === "novelai") ?? null);
		function k(e, t) {
			return i.controller.test_prompt_regex(e, t);
		}
		return (i, c) => (h(), _("div", {
			class: b(w(U).layout),
			"data-testid": "settings-view"
		}, [
			T("nav", {
				class: b(w(U).section_nav),
				"aria-label": w(a)("nav.settings")
			}, [(h(), _(j, null, p(o, (t) => T("button", {
				key: t,
				type: "button",
				class: b(["tc-interactive", w(U).section_nav_item]),
				"data-selected": t === d.value,
				"aria-current": t === d.value ? "page" : void 0,
				onClick: (n) => e.controller.set_settings_section(t)
			}, [P(L, {
				icon: l[t],
				size: 15
			}, null, 8, ["icon"]), T("span", null, E(s(t)), 1)], 10, nt)), 64))], 10, tt),
			T("div", { class: b(w(U).section_content) }, [
				T("header", { class: b(w(U).pane_head) }, [T("h1", { class: b(w(U).pane_title) }, E(s(d.value)), 3), T("p", { class: b(w(U).pane_description) }, E(u(d.value)), 3)], 2),
				e.state.settings.update_command.status === "error" ? (h(), _("p", {
					key: 0,
					class: b([w(U).status_text, w(U).description]),
					"data-tone": "error",
					role: "alert",
					"data-testid": "settings-save-failed"
				}, E(w(a)("settings.save_failed", { code: e.state.settings.update_command.failure.code })), 3)) : x("", !0),
				d.value === "prompts" ? (h(), _(j, { key: 1 }, [P(w(t), {
					state: e.state,
					"test-regex": k,
					onSelectPreset: c[0] ||= (t) => void e.controller.select_prompt_preset(t),
					onNewPreset: c[1] ||= (t) => e.controller.start_new_prompt_preset(),
					onBulkDeletePresets: c[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
					onUpdateDraft: c[3] ||= (t) => e.controller.update_prompt_draft(t),
					onSave: c[4] ||= (t) => void e.controller.save_prompt_preset(t)
				}, null, 8, ["state"]), P(w(n), {
					records: e.state.assets.records.prompt_tag,
					loading: e.state.loading.has("assets"),
					controller: e.controller
				}, null, 8, [
					"records",
					"loading",
					"controller"
				])], 64)) : d.value === "diagnostics" ? (h(), S(w(r), {
					key: 2,
					state: e.state,
					controller: e.controller
				}, null, 8, ["state", "controller"])) : (h(), _("div", {
					key: 3,
					class: b(w(U).view)
				}, [d.value === "illustration" ? (h(), S(Pe, {
					key: 0,
					settings: e.state.settings.settings,
					"prompt-presets": e.state.prompt.presets,
					controller: e.controller
				}, null, 8, [
					"settings",
					"prompt-presets",
					"controller"
				])) : d.value === "providers" ? (h(), _(j, { key: 1 }, [
					e.state.generation.profiles.length === 0 ? (h(), _("section", {
						key: 0,
						class: b(w(U).onboarding),
						"data-testid": "settings-onboarding",
						"aria-labelledby": "settings-onboarding-title"
					}, [T("div", {
						class: b(w(U).onboarding_icon),
						"aria-hidden": "true"
					}, [P(L, {
						icon: w(ue),
						size: 22
					}, null, 8, ["icon"])], 2), T("div", null, [
						T("p", { class: b(w(U).onboarding_label) }, E(w(a)("settings.onboarding.label")), 3),
						T("h2", {
							id: "settings-onboarding-title",
							class: b(w(U).onboarding_title)
						}, E(w(a)("settings.onboarding.title")), 3),
						T("p", { class: b(w(U).onboarding_description) }, E(w(a)("settings.onboarding.description")), 3)
					])], 2)) : x("", !0),
					P(Ye, {
						profiles: e.state.generation.profiles,
						"prompt-tag-presets": e.state.assets.records.prompt_tag,
						controller: e.controller
					}, null, 8, [
						"profiles",
						"prompt-tag-presets",
						"controller"
					]),
					C.value === null ? x("", !0) : (h(), S(ze, {
						key: 1,
						profile: C.value,
						vibes: e.state.assets.records.vibe,
						controller: e.controller
					}, null, 8, [
						"profile",
						"vibes",
						"controller"
					]))
				], 64)) : d.value === "translation" ? (h(), S(et, {
					key: 2,
					settings: e.state.settings.settings,
					controller: e.controller
				}, null, 8, ["settings", "controller"])) : d.value === "general" ? (h(), _(j, { key: 3 }, [
					P(Q, {
						settings: e.state.settings.settings,
						controller: e.controller
					}, null, 8, ["settings", "controller"]),
					P(he, {
						settings: e.state.settings.settings,
						"vault-status": e.state.settings.browser_secret_vault,
						controller: e.controller
					}, null, 8, [
						"settings",
						"vault-status",
						"controller"
					]),
					P(ve, {
						"vocabulary-update-channel": e.state.settings.vocabulary_update_channel,
						controller: e.controller
					}, null, 8, ["vocabulary-update-channel", "controller"])
				], 64)) : x("", !0)], 2))
			], 2),
			P(Z, {
				toasts: w(m),
				"viewport-label": w(a)("common.notifications.viewport_label"),
				"announce-label": w(a)("common.notifications.announce_label"),
				"close-label": w(a)("common.actions.close"),
				onDismiss: w(v)
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
export { rt as default };
