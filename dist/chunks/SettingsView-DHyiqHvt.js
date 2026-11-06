import { a as e } from "./ids-pPJWL4BL.js";
import { i as t, o as n } from "./novelai-B6V3MfU9.js";
import { i as r, t as i } from "./novelai_models-CXz0Nwhv.js";
import { a, i as o, n as s, r as c, t as l } from "./http_origin-gVxrRWXz.js";
import { n as u } from "./settings-AUN8XBLO.js";
import { G as d, H as f, I as p, K as m, P as h, _ as g, a as _, b as v, dt as y, g as b, h as x, j as S, lt as C, m as w, mt as T, n as E, p as D, s as O, tt as k, u as A, v as j, x as M, y as N } from "./vue-i18n-L-BrQRnK.js";
import { n as P, t as F } from "./AppIcon-DkyxvN8k.js";
import { n as I, r as L, t as ee } from "./PromptTagChips-CCFe1e5c.js";
import { n as R, t as te } from "./StateSurface-DkfG2xGX.js";
import { t as z } from "./AppSelect-CBwNO7WX.js";
import { n as B, t as ne } from "./ImageSizeField-hfPCwmMW.js";
import { t as re } from "./AppCheckbox-COGvwvBT.js";
import { t as V } from "./FieldGroup-DUIzuG3F.js";
import { n as H, t as U } from "./AppSwitch-DBPX1VeE.js";
import { t as W } from "./sparkles-DHUWhG-4.js";
import "./browser_secret_vault-Cl9sZA7g.js";
import { n as G, t as K } from "./novelai_request_defaults-B0sJ9ANr.js";
import { n as q, r as J, t as ie } from "./TagInput-DaW9nw0K.js";
import { t as Y } from "./ToastViewport-D9UeF33M.js";
import { t as ae } from "./ConfirmDialog-B5HDtQez.js";
import { t as oe } from "./AppDialog-fgY6zEMc.js";
import { t as se } from "./use_toasts-taqPHY-l.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var X = P("cable", [
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
]), ce = P("sliders-horizontal", [
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
]), Z = /* @__PURE__ */ M({
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
		return (t, r) => (h(), g("div", {
			class: y(C(B).section),
			"data-testid": "appearance-settings"
		}, [w("div", { class: y(C(B).section_header) }, [w("h2", { class: y(C(B).section_title) }, T(C(n)("settings.sections.appearance")), 3)], 2), w("div", { class: y(C(B).form_grid) }, [
			w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.appearance.theme_label")), 3), N(J, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: C(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.appearance.language_label")), 3), N(J, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: C(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.appearance.inspector_width_label")), 3), N(q, {
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
			N(U, {
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
}), le = ["data-tone"], ue = ["id", "aria-describedby"], de = ["id", "aria-describedby"], Q = ["id", "aria-describedby"], fe = /* @__PURE__ */ M({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = k(""), i = k(""), a = k(!1), o = k(null), s = k(!1), c = D(() => [
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
		}), f = D(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function p() {
			r.value = "", i.value = "";
		}
		function v(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function x(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function S() {
			if (!(a.value || !v(!0))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.initialize_browser_secret_vault(r.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), p();
				} catch (e) {
					o.value = x(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function j() {
			if (!(a.value || !v(!1))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.unlock_browser_secret_vault(r.value), p();
				} catch (e) {
					o.value = x(e);
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
		async function P() {
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
		return (t, p) => (h(), g("div", {
			class: y(C(B).section),
			"data-testid": "credential-storage-settings"
		}, [
			w("div", { class: y(C(B).section_header) }, [w("h2", { class: y(C(B).section_title) }, T(C(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (h(), g("span", {
				key: 0,
				class: y(C(B).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, T(u.value), 11, le)) : b("", !0)], 2),
			w("div", { class: y(C(B).vault_mode_row) }, [w("div", { class: y(C(B).profile_identity) }, [w("span", { class: y(C(B).profile_name) }, T(C(n)("settings.credential_storage.mode_label")), 3), w("span", { class: y(C(B).profile_meta) }, T(C(n)("settings.credential_storage.mode_hint")), 3)], 2), N(J, {
				modelValue: l.value,
				"onUpdate:modelValue": p[0] ||= (e) => l.value = e,
				options: c.value,
				label: C(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (h(), g("div", {
				key: 0,
				class: y(C(B).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (h(), g("p", {
				key: 0,
				class: y(C(B).status_text),
				"data-tone": "error",
				role: "alert"
			}, T(f.value), 3)) : e.vaultStatus.state === "uninitialized" ? (h(), g(A, { key: 1 }, [
				N(V, {
					label: C(n)("settings.credential_storage.passphrase_label"),
					hint: C(n)("settings.credential_storage.passphrase_hint", { count: C(12) }),
					required: ""
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
						id: e,
						"onUpdate:modelValue": p[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: y(C(B).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, ue), [[_, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				N(V, {
					label: C(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
						id: e,
						"onUpdate:modelValue": p[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: y(C(B).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, de), [[_, i.value]])]),
					_: 1
				}, 8, ["label"]),
				N(R, {
					label: C(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: S
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (h(), g(A, { key: 2 }, [N(V, {
				label: C(n)("settings.credential_storage.passphrase_label"),
				hint: C(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
					id: e,
					"onUpdate:modelValue": p[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: y(C(B).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: O(j, ["enter"])
				}, null, 42, Q), [[_, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), N(R, {
				label: C(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: j
			}, null, 8, ["label", "pending"])], 64)) : (h(), g("div", {
				key: 3,
				class: y(C(B).vault_unlocked_actions)
			}, [N(R, {
				label: C(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: M
			}, null, 8, ["label", "pending"]), N(R, {
				label: C(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: p[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (h(), g("p", {
				key: 4,
				class: y(C(B).status_text),
				"data-tone": "error",
				role: "alert"
			}, T(o.value), 3)) : b("", !0)], 2)) : b("", !0),
			N(ae, {
				open: s.value,
				title: C(n)("settings.credential_storage.reset_confirm_title"),
				description: C(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": C(n)("settings.credential_storage.reset_action"),
				"cancel-label": C(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": p[5] ||= (e) => s.value = e,
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
}), pe = ["aria-label"], me = ["aria-label"], $ = /* @__PURE__ */ M({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = k(!1), i = [{
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
		let o = k(!1), s = k(!1), c = k(null), l = k(null), u = k(null);
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
		}), _ = k(!1), v = k(null);
		async function S() {
			if (!_.value) {
				_.value = !0, v.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "inkwell-archive.zip", r.click(), URL.revokeObjectURL(n);
				} catch {
					v.value = n("errors.unexpected");
				} finally {
					_.value = !1;
				}
			}
		}
		let O = k(!1), A = k(null), j = k(null);
		function M() {
			j.value?.click();
		}
		async function P(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || O.value)) {
				O.value = !0, A.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					A.value = n("errors.unexpected");
				} finally {
					O.value = !1;
				}
			}
		}
		return (t, l) => (h(), g("div", {
			class: y(C(B).section),
			"data-testid": "data-settings"
		}, [w("div", { class: y(C(B).section_header) }, [w("h2", { class: y(C(B).section_title) }, T(C(n)("settings.sections.data")), 3)], 2), w("div", { class: y(C(B).form_grid) }, [
			w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.data.vocabulary_channel_label")), 3), N(J, {
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
			w("div", { class: y(C(B).actions_row) }, [
				N(R, {
					label: C(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: o.value,
					onClick: d
				}, null, 8, ["label", "pending"]),
				o.value ? (h(), x(R, {
					key: 0,
					label: C(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: f
				}, null, 8, ["label"])) : b("", !0),
				w("input", {
					ref_key: "vocabulary_file_input",
					ref: u,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": C(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: p
				}, null, 40, pe)
			], 2),
			w("p", { class: y(C(B).description) }, T(C(n)("settings.data.vocabulary_import.description")), 3),
			m.value ? (h(), g("p", {
				key: 0,
				class: y([C(B).status_text, C(B).description]),
				"data-testid": "vocabulary-import-progress"
			}, T(m.value), 3)) : b("", !0),
			s.value ? (h(), g("p", {
				key: 1,
				class: y([C(B).status_text, C(B).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, T(C(n)("settings.data.vocabulary_import.success")), 3)) : b("", !0),
			c.value ? (h(), g("p", {
				key: 2,
				class: y([C(B).status_text, C(B).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, T(c.value), 3)) : b("", !0),
			w("div", { class: y(C(B).actions_row) }, [
				N(R, {
					label: C(n)("settings.data.archive_export_action"),
					pending: _.value,
					onClick: S
				}, null, 8, ["label", "pending"]),
				N(R, {
					label: C(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: O.value,
					onClick: M
				}, null, 8, ["label", "pending"]),
				w("input", {
					ref_key: "file_input",
					ref: j,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": C(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: P
				}, null, 40, me)
			], 2),
			w("p", { class: y(C(B).description) }, T(C(n)("settings.data.archive_import_description")), 3),
			v.value ? (h(), g("p", {
				key: 3,
				class: y([C(B).status_text, C(B).description]),
				"data-tone": "error"
			}, T(v.value), 3)) : b("", !0),
			A.value ? (h(), g("p", {
				key: 4,
				class: y([C(B).status_text, C(B).description]),
				"data-tone": "error"
			}, T(A.value), 3)) : b("", !0)
		], 2)], 2));
	}
}), he = ["id", "aria-describedby"], ge = ["id", "aria-describedby"], _e = ["id", "aria-describedby"], ve = ["id", "aria-describedby"], ye = ["id", "aria-describedby"], be = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], xe = [
	"id",
	"aria-describedby",
	"disabled"
], Se = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Ce = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], we = "in_use", Te = "none", Ee = /* @__PURE__ */ M({
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
		let o = D(() => r.value?.strip ?? u);
		function s(e) {
			a({ strip: {
				...o.value,
				...e
			} });
		}
		let c = D(() => [{
			value: "strip",
			label: n("create.style.strip")
		}, {
			value: "default",
			label: n("create.style.default")
		}]), l = k(""), v = k(""), O = k(""), j = k(""), M = k(""), P = k(""), F = k(""), I = k("");
		f(r, (e) => {
			l.value = e === null || e.preset_name === we ? "" : e.preset_name, P.value = e?.wardrobe_model ?? "", F.value = e?.analysis_guidance ?? "", I.value = e?.wardrobe_guidance ?? "", e?.connection.kind === "proxy_preset" ? (v.value = e.connection.proxy_preset, O.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (j.value = e.connection.api_url, M.value = e.connection.model);
		}, { immediate: !0 });
		function L() {
			a({ wardrobe_model: P.value.trim() || null });
		}
		function ee() {
			a({ preset_name: l.value.trim() || we });
		}
		let te = D(() => [
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
		function ne() {
			let e = v.value.trim();
			if (e === "") return null;
			let t = O.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function H() {
			let e = j.value.trim(), t = M.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let W = D(() => X.value === "custom" && j.value.trim() !== "" && H() === null);
		function G() {
			let e = H();
			e !== null && a({ connection: e });
		}
		let K = k(""), Y = k("idle");
		async function ae() {
			let e = K.value.trim();
			if (e !== "") {
				Y.value = "saving";
				try {
					await t.controller.set_analysis_key(e), K.value = "", Y.value = "saved";
				} catch {
					Y.value = "failed";
				}
			}
		}
		async function oe() {
			Y.value = "saving";
			try {
				await t.controller.clear_analysis_key(), Y.value = "cleared";
			} catch {
				Y.value = "failed";
			}
		}
		let se = D(() => {
			switch (Y.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), X = k(r.value?.connection.kind ?? "current");
		f(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (X.value = e);
		});
		function ce(e) {
			if (e === "current") X.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				X.value = "proxy_preset";
				let e = ne();
				e !== null && a({ connection: e });
			} else e === "custom" && (X.value = "custom", G());
		}
		function Z() {
			let e = ne();
			e !== null && a({ connection: e });
		}
		let le = D(() => [{
			value: Te,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function ue(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let de = D(() => [
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
		]), Q = k(r.value?.world_info.mode ?? "chat");
		f(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (Q.value = e);
		});
		let fe = k([]), pe = k(!1);
		async function me() {
			try {
				fe.value = await t.controller.list_worldbooks(), pe.value = !1;
			} catch {
				pe.value = !0;
			}
		}
		S(() => {
			Q.value === "worldbook" && me();
		});
		let $ = D(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbooks : []), Ee = D(() => [.../* @__PURE__ */ new Set([...fe.value, ...$.value])]);
		function De(e) {
			e === "chat" || e === "off" ? (Q.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (Q.value = e, me());
		}
		function Oe(e, t) {
			let n = t ? [...$.value, e] : $.value.filter((t) => t !== e);
			n.length > 0 && a({ world_info: {
				mode: "worldbook",
				worldbooks: n
			} });
		}
		return (t, u) => (h(), g("div", {
			class: y(C(B).groups),
			"data-testid": "illustration-settings"
		}, [
			w("section", { class: y(C(B).section) }, [
				w("h2", { class: y(C(B).section_title) }, T(C(n)("settings.groups.generation")), 3),
				N(U, {
					"model-value": e.settings?.auto_generation_enabled ?? !1,
					label: C(n)("settings.illustration.auto_generation_label"),
					description: C(n)("settings.illustration.auto_generation_hint"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[0] ||= (e) => i({ auto_generation_enabled: e })
				}, null, 8, [
					"model-value",
					"label",
					"description",
					"disabled"
				]),
				w("div", { class: y(C(B).field_grid) }, [
					w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.illustration.max_images_label")), 3), N(q, {
						"model-value": r.value?.max_images_per_message,
						label: C(n)("settings.illustration.max_images_label"),
						min: 1,
						max: 8,
						"increment-label": C(n)("common.actions.increase"),
						"decrement-label": C(n)("common.actions.decrease"),
						disabled: !e.settings,
						"onUpdate:modelValue": u[1] ||= (e) => a({ max_images_per_message: e })
					}, null, 8, [
						"model-value",
						"label",
						"increment-label",
						"decrement-label",
						"disabled"
					])], 2),
					w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.illustration.prompt_preset_label")), 3), N(z, {
						"model-value": r.value?.prompt_preset_id ?? Te,
						options: le.value,
						placeholder: C(n)("settings.illustration.prompt_preset_label"),
						"aria-label": C(n)("settings.illustration.prompt_preset_label"),
						disabled: !e.settings,
						"onUpdate:modelValue": ue
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"aria-label",
						"disabled"
					])], 2),
					w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.illustration.concurrency_label")), 3), N(q, {
						"model-value": e.settings?.global_concurrency,
						label: C(n)("settings.illustration.concurrency_label"),
						min: 1,
						max: 4,
						"increment-label": C(n)("common.actions.increase"),
						"decrement-label": C(n)("common.actions.decrease"),
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
			w("section", { class: y(C(B).section) }, [
				w("h2", { class: y(C(B).section_title) }, T(C(n)("settings.groups.analysis")), 3),
				w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.illustration.connection_label")), 3), N(J, {
					"model-value": X.value,
					options: te.value,
					label: C(n)("settings.illustration.connection_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": ce
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				X.value === "proxy_preset" ? (h(), g(A, { key: 0 }, [N(V, {
					label: C(n)("settings.illustration.proxy_preset_label"),
					hint: C(n)("settings.illustration.proxy_preset_hint")
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
						id: e,
						"onUpdate:modelValue": u[3] ||= (e) => v.value = e,
						type: "text",
						"aria-describedby": t,
						class: y(C(B).text_input),
						"data-testid": "analysis-proxy-preset-input",
						onBlur: Z
					}, null, 42, he), [[_, v.value]])]),
					_: 1
				}, 8, ["label", "hint"]), N(V, {
					label: C(n)("settings.illustration.proxy_model_label"),
					hint: C(n)("settings.illustration.proxy_model_hint")
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
						id: e,
						"onUpdate:modelValue": u[4] ||= (e) => O.value = e,
						type: "text",
						"aria-describedby": t,
						class: y(C(B).text_input),
						onBlur: Z
					}, null, 42, ge), [[_, O.value]])]),
					_: 1
				}, 8, ["label", "hint"])], 64)) : b("", !0),
				X.value === "custom" ? (h(), g(A, { key: 1 }, [
					N(V, {
						label: C(n)("settings.illustration.custom_url_label"),
						hint: C(n)("settings.illustration.custom_url_hint"),
						error: W.value ? C(n)("settings.illustration.custom_invalid") : null
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
							id: e,
							"onUpdate:modelValue": u[5] ||= (e) => j.value = e,
							type: "url",
							placeholder: "https://",
							"aria-describedby": t,
							class: y(C(B).text_input),
							"data-testid": "analysis-custom-url-input",
							onBlur: G
						}, null, 42, _e), [[_, j.value]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					N(V, { label: C(n)("settings.illustration.custom_model_label") }, {
						default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
							id: e,
							"onUpdate:modelValue": u[6] ||= (e) => M.value = e,
							type: "text",
							"aria-describedby": t,
							class: y(C(B).text_input),
							"data-testid": "analysis-custom-model-input",
							onBlur: G
						}, null, 42, ve), [[_, M.value]])]),
						_: 1
					}, 8, ["label"]),
					N(V, {
						label: C(n)("settings.illustration.custom_key_label"),
						hint: C(n)("settings.illustration.custom_key_hint")
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [w("div", { class: y(C(B).input_row) }, [m(w("input", {
							id: e,
							"onUpdate:modelValue": u[7] ||= (e) => K.value = e,
							type: "password",
							autocomplete: "off",
							"aria-describedby": t,
							class: y(C(B).text_input),
							"data-testid": "analysis-custom-key-input"
						}, null, 10, ye), [[_, K.value]]), N(R, {
							label: C(n)("settings.illustration.custom_key_save"),
							pending: Y.value === "saving",
							disabled: K.value.trim() === "",
							onClick: ae
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					w("div", { class: y(C(B).actions_row) }, [N(R, {
						label: C(n)("settings.illustration.custom_key_clear"),
						variant: "ghost",
						onClick: oe
					}, null, 8, ["label"]), w("span", {
						class: y(C(B).status_text),
						role: "status"
					}, T(se.value), 3)], 2)
				], 64)) : b("", !0),
				N(V, {
					label: C(n)("settings.illustration.preset_label"),
					hint: C(n)("settings.illustration.preset_hint")
				}, {
					default: d(({ fieldId: t, describedBy: r }) => [m(w("input", {
						id: t,
						"onUpdate:modelValue": u[8] ||= (e) => l.value = e,
						type: "text",
						placeholder: C(n)("settings.illustration.preset_placeholder"),
						"aria-describedby": r,
						class: y(C(B).text_input),
						disabled: !e.settings,
						"data-testid": "analysis-preset-input",
						onBlur: ee
					}, null, 42, be), [[_, l.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.illustration.chat_history_label")), 3), N(q, {
					"model-value": r.value?.max_chat_history,
					label: C(n)("settings.illustration.chat_history_label"),
					min: 0,
					max: 20,
					"increment-label": C(n)("common.actions.increase"),
					"decrement-label": C(n)("common.actions.decrease"),
					disabled: !e.settings,
					"onUpdate:modelValue": u[9] ||= (e) => a({ max_chat_history: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label",
					"disabled"
				])], 2),
				w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.illustration.world_info_label")), 3), N(J, {
					"model-value": Q.value,
					options: de.value,
					label: C(n)("settings.illustration.world_info_label"),
					disabled: !e.settings,
					"onUpdate:modelValue": De
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled"
				])], 2),
				w("p", { class: y(C(B).description) }, T(C(n)("settings.illustration.world_info_hint")), 3),
				Q.value === "worldbook" ? (h(), g(A, { key: 2 }, [w("fieldset", {
					class: y(C(B).check_list),
					"data-testid": "worldbook-list"
				}, [
					w("legend", { class: y(C(B).row_label) }, T(C(n)("settings.illustration.worldbook_label")), 3),
					(h(!0), g(A, null, p(Ee.value, (e) => (h(), x(re, {
						key: e,
						"model-value": $.value.includes(e),
						label: e,
						disabled: $.value.length === 1 && $.value.includes(e),
						"onUpdate:modelValue": (t) => Oe(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]))), 128)),
					$.value.length === 0 ? (h(), g("p", {
						key: 0,
						class: y(C(B).description)
					}, T(C(n)("settings.illustration.worldbook_placeholder")), 3)) : b("", !0)
				], 2), pe.value ? (h(), g("p", {
					key: 0,
					class: y(C(B).description),
					role: "alert"
				}, T(C(n)("settings.illustration.worldbook_unavailable")), 3)) : b("", !0)], 64)) : b("", !0),
				N(V, {
					label: C(n)("settings.illustration.wardrobe_model_label"),
					hint: X.value === "current" ? C(n)("settings.illustration.wardrobe_model_current_hint") : C(n)("settings.illustration.wardrobe_model_hint")
				}, {
					default: d(({ fieldId: t, describedBy: n }) => [m(w("input", {
						id: t,
						"onUpdate:modelValue": u[10] ||= (e) => P.value = e,
						type: "text",
						"aria-describedby": n,
						class: y(C(B).text_input),
						disabled: !e.settings || X.value === "current",
						"data-testid": "wardrobe-model-input",
						onBlur: L
					}, null, 42, xe), [[_, P.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			w("section", { class: y(C(B).section) }, [
				w("h2", { class: y(C(B).section_title) }, T(C(n)("settings.groups.guidance")), 3),
				N(V, {
					label: C(n)("settings.illustration.analysis_guidance_label"),
					hint: C(n)("settings.illustration.analysis_guidance_hint")
				}, {
					default: d(({ fieldId: t, describedBy: r }) => [m(w("textarea", {
						id: t,
						"onUpdate:modelValue": u[11] ||= (e) => F.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: C(n)("settings.illustration.analysis_guidance_placeholder"),
						"aria-describedby": r,
						class: y(C(B).text_area),
						disabled: !e.settings,
						"data-testid": "analysis-guidance-input",
						onBlur: u[12] ||= (e) => a({ analysis_guidance: F.value.trim() })
					}, null, 42, Se), [[_, F.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				N(V, {
					label: C(n)("settings.illustration.wardrobe_guidance_label"),
					hint: C(n)("settings.illustration.wardrobe_guidance_hint")
				}, {
					default: d(({ fieldId: t, describedBy: r }) => [m(w("textarea", {
						id: t,
						"onUpdate:modelValue": u[13] ||= (e) => I.value = e,
						rows: "3",
						maxlength: "2000",
						placeholder: C(n)("settings.illustration.wardrobe_guidance_placeholder"),
						"aria-describedby": r,
						class: y(C(B).text_area),
						disabled: !e.settings,
						"data-testid": "wardrobe-guidance-input",
						onBlur: u[14] ||= (e) => a({ wardrobe_guidance: I.value.trim() })
					}, null, 42, Ce), [[_, I.value]])]),
					_: 1
				}, 8, ["label", "hint"])
			], 2),
			w("section", { class: y(C(B).section) }, [
				w("h2", { class: y(C(B).section_title) }, T(C(n)("settings.groups.strip")), 3),
				N(V, {
					label: C(n)("settings.illustration.strip_style_label"),
					hint: C(n)("settings.illustration.strip_style_hint")
				}, {
					default: d(() => [N(J, {
						"model-value": o.value.style,
						options: c.value,
						label: C(n)("settings.illustration.strip_style_label"),
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
				N(V, { label: C(n)("settings.illustration.strip_max_label") }, {
					default: d(({ fieldId: t }) => [N(q, {
						id: t,
						"model-value": o.value.max_panels,
						label: C(n)("settings.illustration.strip_max_label"),
						min: 1,
						max: 12,
						"increment-label": C(n)("common.actions.increase"),
						"decrement-label": C(n)("common.actions.decrease"),
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
				N(V, { label: C(n)("settings.illustration.strip_style_tags_label") }, {
					default: d(({ fieldId: e }) => [N(ie, {
						id: e,
						"model-value": o.value.style_tags,
						"onUpdate:modelValue": u[17] ||= (e) => s({ style_tags: e })
					}, null, 8, ["id", "model-value"])]),
					_: 1
				}, 8, ["label"]),
				N(V, {
					label: C(n)("settings.illustration.strip_no_text_label"),
					hint: C(n)("settings.illustration.strip_no_text_hint")
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [N(ie, {
						id: e,
						"model-value": o.value.no_text_tags,
						"described-by": t,
						"onUpdate:modelValue": u[18] ||= (e) => s({ no_text_tags: e })
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
}), De = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, Oe = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function ke(e, t) {
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
var Ae = "https://novelai.net/image", je = /* @__PURE__ */ M({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let i = e, { t: s, d: c } = E(), l = D(() => {
			let e = i.profile.model_id;
			return e != null && r(e) !== null ? e : K;
		});
		function u() {
			if (i.profile.novelai_defaults !== null) return i.profile.novelai_defaults;
			let e = G(l.value);
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
		f(() => i.profile.id, () => {
			d.value = u();
		});
		function m(e) {
			d.value = {
				...d.value,
				...e
			};
		}
		let _ = D(() => o.safeParse(d.value).success ? null : s("settings.novelai.invalid_size")), v = D(() => {
			let e = r(l.value);
			return e === null ? [] : a(e.profile, d.value);
		}), O = k(null), M = k(null), P = k(!1), F = k(!1);
		async function I() {
			F.value = !0, M.value = null, P.value = !1;
			try {
				O.value = await i.controller.load_novelai_account();
			} catch (e) {
				P.value = e instanceof Error && e.name === "ProviderNetworkError", M.value = e instanceof Error ? e.message : String(e);
			} finally {
				F.value = !1;
			}
		}
		let L = k([]);
		S(async () => {
			try {
				L.value = (await i.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				L.value = [];
			}
		});
		let ee = D(() => L.value.map((e) => ({
			value: e.profile.model_id,
			label: e.profile.display_name
		})));
		async function te(e) {
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
		let V = n.options.map((e) => ({
			value: e,
			label: De[e]
		})), H = t.options.map((e) => ({
			value: e,
			label: Oe[e]
		}));
		function W(e, t, n) {
			t.includes(n) && m({ [e]: n });
		}
		let J = D(() => i.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function ie(e, t) {
			let n = d.value.vibe_asset_ids.filter((t) => t !== e);
			m({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let Y = k("idle");
		async function ae() {
			Y.value = "saving";
			try {
				await i.controller.save_novelai_defaults(i.profile.id, d.value), Y.value = "saved";
			} catch {
				Y.value = "failed";
			}
		}
		return (r, i) => (h(), g("div", {
			class: y(C(B).section),
			"data-testid": "novelai-settings"
		}, [w("div", { class: y(C(B).section_header) }, [w("h2", { class: y(C(B).section_title) }, T(C(s)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), w("div", { class: y(C(B).form_grid) }, [
			w("div", { class: y(C(B).actions_row) }, [N(R, {
				label: C(s)("settings.novelai.refresh_account"),
				pending: F.value,
				onClick: I
			}, null, 8, ["label", "pending"]), O.value === null ? P.value ? (h(), g("span", {
				key: 1,
				class: y(C(B).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [j(T(C(s)("settings.novelai.account_unreachable")) + " ", 1), w("a", {
				href: Ae,
				target: "_blank",
				rel: "noopener noreferrer"
			}, T(C(s)("settings.novelai.account_open_site")), 1)], 2)) : M.value === null ? b("", !0) : (h(), g("span", {
				key: 2,
				class: y(C(B).status_text)
			}, T(M.value), 3)) : (h(), g("span", {
				key: 0,
				class: y(C(B).status_text),
				"data-testid": "novelai-account"
			}, T(C(s)("settings.novelai.account_summary", {
				tier: O.value.tier,
				anlas: O.value.anlas,
				expires: C(c)(new Date(O.value.expires_at), "short_date")
			})), 3))], 2),
			w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(s)("settings.novelai.model_label")), 3), N(z, {
				"model-value": l.value,
				options: ee.value,
				placeholder: l.value,
				"aria-label": C(s)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void te(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			N(ne, {
				"model-value": {
					width: d.value.width,
					height: d.value.height
				},
				"onUpdate:modelValue": i[1] ||= (e) => m(e)
			}, null, 8, ["model-value"]),
			w("div", { class: y(C(B).field_grid) }, [
				w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(s)("settings.novelai.steps_label")), 3), N(q, {
					"model-value": d.value.steps,
					label: C(s)("settings.novelai.steps_label"),
					min: 1,
					max: 50,
					"increment-label": C(s)("common.actions.increase"),
					"decrement-label": C(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[2] ||= (e) => m({ steps: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(s)("settings.novelai.scale_label")), 3), N(q, {
					"model-value": d.value.scale,
					label: C(s)("settings.novelai.scale_label"),
					min: 0,
					max: 10,
					step: .1,
					"increment-label": C(s)("common.actions.increase"),
					"decrement-label": C(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[3] ||= (e) => m({ scale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(s)("settings.novelai.cfg_rescale_label")), 3), N(q, {
					"model-value": d.value.cfg_rescale,
					label: C(s)("settings.novelai.cfg_rescale_label"),
					min: 0,
					max: 1,
					step: .02,
					"increment-label": C(s)("common.actions.increase"),
					"decrement-label": C(s)("common.actions.decrease"),
					"onUpdate:modelValue": i[4] ||= (e) => m({ cfg_rescale: e })
				}, null, 8, [
					"model-value",
					"label",
					"increment-label",
					"decrement-label"
				])], 2),
				w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(s)("settings.novelai.sampler_label")), 3), N(z, {
					"model-value": d.value.sampler,
					options: C(V),
					placeholder: C(s)("settings.novelai.sampler_label"),
					"aria-label": C(s)("settings.novelai.sampler_label"),
					"onUpdate:modelValue": i[5] ||= (e) => W("sampler", C(n).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2),
				w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(s)("settings.novelai.noise_schedule_label")), 3), N(z, {
					"model-value": d.value.noise_schedule,
					options: C(H),
					placeholder: C(s)("settings.novelai.noise_schedule_label"),
					"aria-label": C(s)("settings.novelai.noise_schedule_label"),
					"onUpdate:modelValue": i[6] ||= (e) => W("noise_schedule", C(t).options, e)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"aria-label"
				])], 2)
			], 2),
			N(U, {
				"model-value": d.value.smea,
				label: C(s)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[7] ||= (e) => m({ smea: e })
			}, null, 8, ["model-value", "label"]),
			N(U, {
				"model-value": d.value.dyn,
				label: C(s)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[8] ||= (e) => m({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			N(U, {
				"model-value": d.value.variety_plus,
				label: C(s)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[9] ||= (e) => m({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			w("h3", { class: y(C(B).section_title) }, T(C(s)("settings.novelai.vibes_title")), 3),
			J.value.length === 0 ? (h(), g("p", {
				key: 0,
				class: y(C(B).description)
			}, T(C(s)("settings.novelai.vibes_empty")), 3)) : b("", !0),
			(h(!0), g(A, null, p(J.value, (e) => (h(), x(re, {
				key: e.id,
				"model-value": d.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => ie(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			v.value.length > 0 ? (h(), g("div", {
				key: 1,
				class: y(C(B).risk_banner),
				"data-testid": "novelai-ignored"
			}, [w("p", { class: y(C(B).risk_banner_title) }, T(C(s)("settings.novelai.ignored_title")), 3), (h(!0), g(A, null, p(v.value, (e) => (h(), g("p", {
				key: e,
				class: y(C(B).risk_banner_description)
			}, T(C(ke)(C(s), e)), 3))), 128))], 2)) : b("", !0),
			_.value === null ? b("", !0) : (h(), g("p", {
				key: 2,
				class: y(C(B).status_text),
				role: "alert"
			}, T(_.value), 3)),
			w("div", { class: y(C(B).actions_row) }, [N(R, {
				label: C(s)("settings.novelai.save"),
				variant: "primary",
				pending: Y.value === "saving",
				disabled: _.value !== null,
				onClick: ae
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), w("span", {
				class: y(C(B).status_text),
				role: "status"
			}, T(Y.value === "saved" ? C(s)("settings.novelai.saved") : Y.value === "failed" ? C(s)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Me = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Ne(e, t) {
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
var Pe = ["id", "aria-describedby"], Fe = ["id", "aria-describedby"], Ie = ["id", "aria-describedby"], Le = ["id", "aria-describedby"], Re = ["id", "aria-describedby"], ze = "http://127.0.0.1:7860", Be = "http://127.0.0.1:8188", Ve = /* @__PURE__ */ M({
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
		let { t: a } = E(), o = k(!1), c = k(null), u = k(!1), f = k(null), v = k(null), S = k(!1), O = k(null), j = k(""), M = k(!1), P = k(null), F = k(/* @__PURE__ */ new Map()), I = Me.map((e) => ({
			value: e,
			label: Ne(a, e)
		})), L = D({
			get: () => c.value?.provider_id ?? "sd_webui",
			set: (e) => {
				c.value && (c.value.provider_id = e, c.value.workflow_id = "", c.value.base_url = e === "comfyui" ? Be : ze, e === "novelai" && !ne.has(c.value.model_id) && (c.value.model_id = K));
			}
		}), ne = new Set(i.map((e) => e.model_id)), re = i.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		})), H = D(() => c.value?.provider_id === "sd_webui" || c.value?.provider_id === "comfyui");
		function W(e) {
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
				provider_id: "sd_webui",
				display_name: "",
				model_id: "",
				workflow_id: "",
				base_url: ze,
				is_default: n.profiles.length === 0
			}, f.value = null, o.value = !0;
		}
		function q(e) {
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
		function J() {
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
			let s = H.value ? W(t.base_url) : null;
			if (H.value && s === null) {
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
				}), J();
			} catch {
				f.value = a("errors.unexpected");
			} finally {
				u.value = !1;
			}
		}
		function Y(e) {
			v.value = e;
		}
		async function se() {
			let e = v.value;
			if (!(!e || S.value)) {
				S.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), v.value = null;
				} finally {
					S.value = !1;
				}
			}
		}
		function X(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function ce(e) {
			O.value = e, j.value = "", P.value = null;
		}
		function Z() {
			O.value = null, j.value = "", P.value = null;
		}
		async function le() {
			let e = O.value;
			if (!(!e || M.value)) {
				if (j.value.trim().length === 0) {
					P.value = a("errors.validation_required");
					return;
				}
				M.value = !0, P.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, j.value), Z();
				} catch {
					P.value = a("settings.credential_storage.unlock_required");
				} finally {
					M.value = !1, j.value = "";
				}
			}
		}
		async function ue(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				O.value = e, j.value = "", P.value = a("settings.credential_storage.unlock_required");
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
		return (e, n) => (h(), g("div", {
			class: y(C(B).section),
			"data-testid": "provider-profiles"
		}, [
			w("div", { class: y(C(B).section_header) }, [w("h2", { class: y(C(B).section_title) }, T(C(a)("settings.sections.provider_profiles")), 3), N(R, {
				label: C(a)("settings.provider_profiles.add_action"),
				variant: t.profiles.length === 0 ? "primary" : "secondary",
				onClick: G
			}, null, 8, ["label", "variant"])], 2),
			N(te, {
				status: t.profiles.length === 0 ? "empty" : "ready",
				"empty-message": C(a)("settings.provider_profiles.empty_description")
			}, {
				default: d(() => [w("div", null, [(h(!0), g(A, null, p(t.profiles, (e) => (h(), g("div", {
					key: e.id,
					class: y(C(B).profile_row),
					"data-testid": "provider-profile-row"
				}, [w("div", { class: y(C(B).profile_identity) }, [
					w("span", { class: y(C(B).profile_name) }, T(e.display_name), 3),
					w("span", { class: y(C(B).profile_meta) }, T(C(Ne)(C(a), e.provider_id)), 3),
					X(e.provider_id) ? (h(), g("span", {
						key: 0,
						class: y(C(B).profile_meta)
					}, T(e.credential_reference ? C(a)("settings.provider_profiles.credential_set") : C(a)("settings.provider_profiles.credential_unset")), 3)) : b("", !0),
					F.value.get(e.id)?.label ? (h(), g("span", {
						key: 1,
						class: y(C(B).profile_meta),
						"data-testid": "profile-test-result"
					}, T(F.value.get(e.id)?.label), 3)) : b("", !0),
					w("div", { class: y(C(B).prompt_tag_row) }, [N(ee, {
						port: r(e),
						kind: "quality"
					}, null, 8, ["port"]), N(ee, {
						port: r(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), w("div", { class: y(C(B).profile_actions) }, [
					e.is_default ? (h(), g("span", {
						key: 0,
						class: y(C(B).badge)
					}, T(C(a)("settings.provider_profiles.default_badge")), 3)) : b("", !0),
					N(R, {
						label: C(a)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: F.value.get(e.id)?.pending === !0,
						onClick: (t) => de(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					X(e.provider_id) ? (h(), x(R, {
						key: 1,
						label: C(a)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => ce(e)
					}, null, 8, ["label", "onClick"])) : b("", !0),
					X(e.provider_id) && e.credential_reference !== null ? (h(), x(R, {
						key: 2,
						label: C(a)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => ue(e)
					}, null, 8, ["label", "onClick"])) : b("", !0),
					N(R, {
						label: C(a)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => q(e)
					}, null, 8, ["label", "onClick"]),
					N(R, {
						label: C(a)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => Y(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			N(oe, {
				open: o.value,
				title: c.value?.is_new ? C(a)("settings.provider_profiles.dialog_add_title") : C(a)("settings.provider_profiles.dialog_edit_title"),
				"close-label": C(a)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && J()
			}, {
				default: d(() => [c.value ? (h(), g("div", {
					key: 0,
					class: y(C(B).form_grid)
				}, [
					N(V, {
						label: C(a)("common.labels.name"),
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => c.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: y(C(B).text_input)
						}, null, 10, Pe), [[_, c.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					N(V, {
						label: C(a)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: d(({ fieldId: e }) => [N(z, {
							id: e,
							modelValue: L.value,
							"onUpdate:modelValue": n[1] ||= (e) => L.value = e,
							options: C(I),
							placeholder: C(a)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					c.value.provider_id === "novelai" ? (h(), x(V, {
						key: 0,
						label: C(a)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: d(({ fieldId: e }) => [N(z, {
							id: e,
							modelValue: c.value.model_id,
							"onUpdate:modelValue": n[2] ||= (e) => c.value.model_id = e,
							options: C(re),
							placeholder: C(a)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : (h(), x(V, {
						key: 1,
						label: C(a)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => c.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: y(C(B).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Fe), [[_, c.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					H.value ? (h(), x(V, {
						key: 2,
						label: C(a)("settings.provider_profiles.base_url_label"),
						hint: c.value.provider_id === "comfyui" ? C(a)("settings.provider_profiles.base_url_hint_comfyui") : C(a)("settings.provider_profiles.base_url_hint_sd_webui"),
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => c.value.base_url = e,
							type: "url",
							"aria-describedby": t,
							class: y(C(B).text_input),
							"data-testid": "provider-base-url-input"
						}, null, 10, Ie), [[_, c.value.base_url]])]),
						_: 1
					}, 8, ["label", "hint"])) : b("", !0),
					c.value.provider_id === "comfyui" ? (h(), x(V, {
						key: 3,
						label: C(a)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => c.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: y(C(B).text_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, Le), [[_, c.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : b("", !0),
					N(U, {
						modelValue: c.value.is_default,
						"onUpdate:modelValue": n[6] ||= (e) => c.value.is_default = e,
						label: C(a)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					f.value ? (h(), g("p", {
						key: 4,
						class: y([C(B).status_text, C(B).description]),
						"data-tone": "error"
					}, T(f.value), 3)) : b("", !0),
					w("div", { class: y(C(B).actions_row) }, [N(R, {
						label: C(a)("common.actions.save"),
						pending: u.value,
						onClick: ie
					}, null, 8, ["label", "pending"]), N(R, {
						label: C(a)("common.actions.cancel"),
						variant: "secondary",
						onClick: J
					}, null, 8, ["label"])], 2)
				], 2)) : b("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			N(oe, {
				open: O.value !== null,
				title: C(a)("settings.provider_profiles.credential_dialog_title", { name: O.value?.display_name ?? "" }),
				description: C(a)("settings.provider_profiles.credential_dialog_description"),
				"close-label": C(a)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && Z()
			}, {
				default: d(() => [w("div", { class: y(C(B).form_grid) }, [N(V, {
					label: C(a)("settings.provider_profiles.credential_label"),
					error: P.value,
					required: ""
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => j.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: y(C(B).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, Re), [[_, j.value]])]),
					_: 1
				}, 8, ["label", "error"]), w("div", { class: y(C(B).actions_row) }, [N(R, {
					label: C(a)("common.actions.save"),
					pending: M.value,
					onClick: le
				}, null, 8, ["label", "pending"]), N(R, {
					label: C(a)("common.actions.cancel"),
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
			N(ae, {
				open: v.value !== null,
				title: C(a)("settings.provider_profiles.remove_confirm_title", { name: v.value?.display_name ?? "" }),
				description: C(a)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": C(a)("confirmations.destructive.default_confirm_action"),
				"cancel-label": C(a)("confirmations.destructive.default_cancel_action"),
				pending: S.value,
				"onUpdate:open": n[10] ||= (e) => !e && (v.value = null),
				onConfirm: se
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
], Ge = 200, Ke = /* @__PURE__ */ M({
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
		let v = D(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), b = k([]);
		f(() => r.value?.glossary, (e) => {
			b.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function x() {
			b.value.length < Ge && b.value.push({
				source: "",
				target: ""
			});
		}
		function S(e) {
			b.value.splice(e, 1);
		}
		function O() {
			i({ glossary: b.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (h(), g("div", {
			class: y(C(B).section),
			"data-testid": "translation-settings"
		}, [w("div", { class: y(C(B).section_header) }, [w("h2", { class: y(C(B).section_title) }, T(C(n)("settings.nav.translation")), 3)], 2), w("div", { class: y(C(B).form_grid) }, [
			w("p", { class: y(C(B).description) }, T(C(n)("settings.translation.description")), 3),
			N(V, {
				label: C(n)("settings.translation.key_label"),
				hint: C(n)("settings.translation.key_hint")
			}, {
				default: d(({ fieldId: e, describedBy: t }) => [m(w("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: y(C(B).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, He), [[_, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			w("div", { class: y(C(B).actions_row) }, [
				N(R, {
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
				N(R, {
					label: C(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				w("span", {
					class: y(C(B).status_text),
					role: "status"
				}, T(v.value), 3)
			], 2),
			w("div", { class: y(C(B).row) }, [w("span", { class: y(C(B).row_label) }, T(C(n)("settings.translation.endpoint_label")), 3), N(J, {
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
			w("h3", { class: y(C(B).section_title) }, T(C(n)("settings.translation.glossary_title")), 3),
			w("p", { class: y(C(B).description) }, T(C(n)("settings.translation.glossary_description")), 3),
			(h(!0), g(A, null, p(b.value, (e, t) => (h(), g("div", {
				key: t,
				class: y(C(B).actions_row),
				"data-testid": "glossary-row"
			}, [
				m(w("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": C(n)("settings.translation.glossary_source"),
					placeholder: C(n)("settings.translation.glossary_source"),
					class: y(C(B).text_input)
				}, null, 10, Ue), [[_, e.source]]),
				m(w("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": C(n)("settings.translation.glossary_target"),
					placeholder: C(n)("settings.translation.glossary_target"),
					class: y(C(B).text_input)
				}, null, 10, We), [[_, e.target]]),
				N(R, {
					label: C(n)("settings.translation.glossary_remove"),
					onClick: (e) => S(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			w("div", { class: y(C(B).actions_row) }, [N(R, {
				label: C(n)("settings.translation.glossary_add"),
				disabled: b.value.length >= Ge,
				onClick: x
			}, null, 8, ["label", "disabled"]), N(R, {
				label: C(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: O
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), qe = ["aria-label"], Je = [
	"data-selected",
	"aria-current",
	"onClick"
], Ye = /* @__PURE__ */ M({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = v(() => import("./PromptView-BVeZuNP5.js")), n = v(() => import("./PromptTagPresetPanel-By5jcE0Z.js")), r = v(() => import("./DiagnosticsView-Ce-pF2oP.js")), i = e, { t: a } = E(), o = [
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
			illustration: W,
			providers: c,
			translation: I,
			prompts: L,
			general: ce,
			diagnostics: H
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
		let d = D(() => i.state.settings_section), { toasts: m, push: _, dismiss: S } = se();
		f(() => i.state.settings.update_command.status, (e, t) => {
			e === "success" && t === "pending" && _({
				title: a("settings.saved"),
				variant: "success",
				duration: 1800
			});
		});
		let O = D(() => i.state.generation.profiles.find((e) => e.id === i.state.generation.active_profile_id && e.provider_id === "novelai") ?? null);
		function k(e, t) {
			return i.controller.test_prompt_regex(e, t);
		}
		return (i, c) => (h(), g("div", {
			class: y(C(B).layout),
			"data-testid": "settings-view"
		}, [
			w("nav", {
				class: y(C(B).section_nav),
				"aria-label": C(a)("nav.settings")
			}, [(h(), g(A, null, p(o, (t) => w("button", {
				key: t,
				type: "button",
				class: y(["tc-interactive", C(B).section_nav_item]),
				"data-selected": t === d.value,
				"aria-current": t === d.value ? "page" : void 0,
				onClick: (n) => e.controller.set_settings_section(t)
			}, [N(F, {
				icon: l[t],
				size: 15
			}, null, 8, ["icon"]), w("span", null, T(s(t)), 1)], 10, Je)), 64))], 10, qe),
			w("div", { class: y(C(B).section_content) }, [
				w("header", { class: y(C(B).pane_head) }, [w("h1", { class: y(C(B).pane_title) }, T(s(d.value)), 3), w("p", { class: y(C(B).pane_description) }, T(u(d.value)), 3)], 2),
				e.state.settings.update_command.status === "error" ? (h(), g("p", {
					key: 0,
					class: y([C(B).status_text, C(B).description]),
					"data-tone": "error",
					role: "alert",
					"data-testid": "settings-save-failed"
				}, T(C(a)("settings.save_failed", { code: e.state.settings.update_command.failure.code })), 3)) : b("", !0),
				d.value === "prompts" ? (h(), g(A, { key: 1 }, [N(C(t), {
					state: e.state,
					"test-regex": k,
					onSelectPreset: c[0] ||= (t) => void e.controller.select_prompt_preset(t),
					onNewPreset: c[1] ||= (t) => e.controller.start_new_prompt_preset(),
					onBulkDeletePresets: c[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
					onUpdateDraft: c[3] ||= (t) => e.controller.update_prompt_draft(t),
					onSave: c[4] ||= (t) => void e.controller.save_prompt_preset(t)
				}, null, 8, ["state"]), N(C(n), {
					records: e.state.assets.records.prompt_tag,
					loading: e.state.loading.has("assets"),
					controller: e.controller
				}, null, 8, [
					"records",
					"loading",
					"controller"
				])], 64)) : d.value === "diagnostics" ? (h(), x(C(r), {
					key: 2,
					state: e.state,
					controller: e.controller
				}, null, 8, ["state", "controller"])) : (h(), g("div", {
					key: 3,
					class: y(C(B).view)
				}, [d.value === "illustration" ? (h(), x(Ee, {
					key: 0,
					settings: e.state.settings.settings,
					"prompt-presets": e.state.prompt.presets,
					controller: e.controller
				}, null, 8, [
					"settings",
					"prompt-presets",
					"controller"
				])) : d.value === "providers" ? (h(), g(A, { key: 1 }, [
					e.state.generation.profiles.length === 0 ? (h(), g("section", {
						key: 0,
						class: y(C(B).onboarding),
						"data-testid": "settings-onboarding",
						"aria-labelledby": "settings-onboarding-title"
					}, [w("div", {
						class: y(C(B).onboarding_icon),
						"aria-hidden": "true"
					}, [N(F, {
						icon: C(X),
						size: 22
					}, null, 8, ["icon"])], 2), w("div", null, [
						w("p", { class: y(C(B).onboarding_label) }, T(C(a)("settings.onboarding.label")), 3),
						w("h2", {
							id: "settings-onboarding-title",
							class: y(C(B).onboarding_title)
						}, T(C(a)("settings.onboarding.title")), 3),
						w("p", { class: y(C(B).onboarding_description) }, T(C(a)("settings.onboarding.description")), 3)
					])], 2)) : b("", !0),
					N(Ve, {
						profiles: e.state.generation.profiles,
						"prompt-tag-presets": e.state.assets.records.prompt_tag,
						controller: e.controller
					}, null, 8, [
						"profiles",
						"prompt-tag-presets",
						"controller"
					]),
					O.value === null ? b("", !0) : (h(), x(je, {
						key: 1,
						profile: O.value,
						vibes: e.state.assets.records.vibe,
						controller: e.controller
					}, null, 8, [
						"profile",
						"vibes",
						"controller"
					]))
				], 64)) : d.value === "translation" ? (h(), x(Ke, {
					key: 2,
					settings: e.state.settings.settings,
					controller: e.controller
				}, null, 8, ["settings", "controller"])) : d.value === "general" ? (h(), g(A, { key: 3 }, [
					N(Z, {
						settings: e.state.settings.settings,
						controller: e.controller
					}, null, 8, ["settings", "controller"]),
					N(fe, {
						settings: e.state.settings.settings,
						"vault-status": e.state.settings.browser_secret_vault,
						controller: e.controller
					}, null, 8, [
						"settings",
						"vault-status",
						"controller"
					]),
					N($, {
						"vocabulary-update-channel": e.state.settings.vocabulary_update_channel,
						controller: e.controller
					}, null, 8, ["vocabulary-update-channel", "controller"])
				], 64)) : b("", !0)], 2))
			], 2),
			N(Y, {
				toasts: C(m),
				"viewport-label": C(a)("common.notifications.viewport_label"),
				"announce-label": C(a)("common.notifications.announce_label"),
				"close-label": C(a)("common.actions.close"),
				onDismiss: C(S)
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
export { Ye as default };
