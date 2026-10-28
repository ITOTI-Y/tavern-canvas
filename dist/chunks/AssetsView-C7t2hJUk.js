import { a as e, i as t, n, o as r, s as i } from "./wardrobe_library-cpT1rkQA.js";
import { A as a, D as o, F as s, G as c, I as l, N as u, T as d, V as f, W as p, _ as m, a as h, at as g, c as _, ct as v, et as y, ft as b, g as x, h as S, k as C, m as w, n as T, nt as E, p as D, pt as O, s as k, u as A, ut as j, v as M, x as N, y as P } from "./vue-i18n-DUz2Gjn8.js";
import { r as F, t as I } from "./portal_keys-B9C82xtk.js";
import { n as L, t as R } from "./AppIcon-Cnhzrx9o.js";
import { i as z, n as B, r as ee, t as V } from "./AppSelect-CRHyq1ex.js";
import { t as te } from "./chevron-down-Tu_8qTxg.js";
import { t as ne } from "./chevron-up-D4TetO-M.js";
import { n as H, t as U } from "./download-DHgWv1wH.js";
import { a as W, i as G, n as K, r as q, t as J } from "./use_asset_category_panel-ra3ACBcY.js";
import { a as re, i as ie, n as Y, r as ae } from "./PromptTagChips-DuVZRo9M.js";
import { t as X } from "./FieldGroup-5lMIUNw6.js";
import { t as oe } from "./upload-CQtsg_mB.js";
import { M as se, _ as ce, c as Z, i as le, o as ue, s as de } from "./Teleport-CZ6NJvBB.js";
import { c as fe } from "./PopperContent-8IQaFABb.js";
import { n as pe, t as me } from "./ConfirmDialog-CcAJItG1.js";
import { t as he } from "./reference_image-DYyYuujP.js";
import { r as ge } from "./SettingsView-BvGeDxju.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/scan-search.js
var _e = L("scan-search", [
	["path", {
		d: "M3 7V5a2 2 0 0 1 2-2h2",
		key: "aa7l1z"
	}],
	["path", {
		d: "M17 3h2a2 2 0 0 1 2 2v2",
		key: "4qcy5o"
	}],
	["path", {
		d: "M21 17v2a2 2 0 0 1-2 2h-2",
		key: "6vwrx8"
	}],
	["path", {
		d: "M7 21H5a2 2 0 0 1-2-2v-2",
		key: "ioqczr"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}],
	["path", {
		d: "m16 16-1.9-1.9",
		key: "1dq9hf"
	}]
]), [ve, ye] = /*#__PURE__*/ se("TabsRoot"), be = /* @__PURE__ */ N({
	__name: "TabsRoot",
	props: {
		defaultValue: {
			type: null,
			required: !1
		},
		orientation: {
			type: String,
			required: !1,
			default: "horizontal"
		},
		dir: {
			type: String,
			required: !1
		},
		activationMode: {
			type: String,
			required: !1,
			default: "automatic"
		},
		modelValue: {
			type: null,
			required: !1
		},
		unmountOnHide: {
			type: Boolean,
			required: !1,
			default: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { orientation: i, unmountOnHide: a, dir: o } = g(n), s = fe(o);
		Z();
		let c = ce(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), d = y(), f = E(/* @__PURE__ */ new Set());
		return ye({
			modelValue: c,
			changeModelValue: (e) => {
				c.value = e;
			},
			orientation: i,
			dir: s,
			unmountOnHide: a,
			activationMode: n.activationMode,
			baseId: de(void 0, "reka-tabs"),
			tabsList: d,
			contentIds: f,
			registerContent: (e) => {
				f.value = /* @__PURE__ */ new Set([...f.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(f.value);
				t.delete(e), f.value = t;
			}
		}), (e, t) => (u(), S(v(le), {
			dir: v(s),
			"data-orientation": v(i),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: p(() => [l(e.$slots, "default", { modelValue: v(c) })]),
			_: 3
		}, 8, [
			"dir",
			"data-orientation",
			"as-child",
			"as"
		]));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/utils.js
function xe(e, t) {
	return `${e}-trigger-${t}`;
}
function Se(e, t) {
	return `${e}-content-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var Q = /* @__PURE__ */ N({
	__name: "TabsContent",
	props: {
		value: {
			type: [String, Number],
			required: !0
		},
		forceMount: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let t = e, { forwardRef: n } = Z(), r = ve(), i = D(() => xe(r.baseId, t.value)), o = D(() => Se(r.baseId, t.value)), s = D(() => t.value === r.modelValue.value), c = y(s.value);
		return a(() => {
			r.registerContent(t.value), requestAnimationFrame(() => {
				c.value = !1;
			});
		}), C(() => {
			r.unregisterContent(t.value);
		}), (e, t) => (u(), S(v(ue), {
			present: e.forceMount || s.value,
			"force-mount": ""
		}, {
			default: p(({ present: t }) => [P(v(le), {
				id: o.value,
				ref: v(n),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": s.value ? "active" : "inactive",
				"data-orientation": v(r).orientation.value,
				"aria-labelledby": i.value,
				hidden: !t,
				tabindex: "0",
				style: b({ animationDuration: c.value ? "0s" : void 0 })
			}, {
				default: p(() => [!v(r).unmountOnHide.value || t ? l(e.$slots, "default", { key: 0 }) : x("v-if", !0)]),
				_: 2
			}, 1032, [
				"id",
				"as-child",
				"as",
				"data-state",
				"data-orientation",
				"aria-labelledby",
				"hidden",
				"style"
			])]),
			_: 3
		}, 8, ["present"]));
	}
}), Ce = /* @__PURE__ */ N({
	__name: "TabsList",
	props: {
		loop: {
			type: Boolean,
			required: !1,
			default: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let { loop: t } = g(e), { forwardRef: n, currentElement: r } = Z(), i = ve();
		return i.tabsList = r, (e, r) => (u(), S(v(re), {
			"as-child": "",
			orientation: v(i).orientation.value,
			dir: v(i).dir.value,
			loop: v(t)
		}, {
			default: p(() => [P(v(le), {
				ref: v(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": v(i).orientation.value
			}, {
				default: p(() => [l(e.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"aria-orientation"
			])]),
			_: 3
		}, 8, [
			"orientation",
			"dir",
			"loop"
		]));
	}
}), $ = /* @__PURE__ */ N({
	__name: "TabsTrigger",
	props: {
		value: {
			type: [String, Number],
			required: !0
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(e) {
		let t = e, { forwardRef: n } = Z(), r = ve(), i = D(() => xe(r.baseId, t.value)), a = D(() => r.contentIds.value.has(t.value) ? Se(r.baseId, t.value) : void 0), o = D(() => t.value === r.modelValue.value);
		return (e, t) => (u(), S(v(ie), {
			"as-child": "",
			focusable: !e.disabled,
			active: o.value
		}, {
			default: p(() => [P(v(le), {
				id: i.value,
				ref: v(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": o.value ? "true" : "false",
				"aria-controls": a.value,
				"data-state": o.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": v(r).orientation.value,
				onMousedown: t[0] ||= _((t) => {
					!e.disabled && t.ctrlKey === !1 ? v(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= k((t) => v(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = v(r).activationMode !== "manual";
					!o.value && !e.disabled && t && v(r).changeModelValue(e.value);
				}
			}, {
				default: p(() => [l(e.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"type",
				"as",
				"as-child",
				"aria-selected",
				"aria-controls",
				"data-state",
				"disabled",
				"data-disabled",
				"data-orientation"
			])]),
			_: 3
		}, 8, ["focusable", "active"]));
	}
});
//#endregion
//#region src/ui/views/assets/chat_scope.ts
function we(e, t, n = () => !1) {
	let r = d(I, y(null));
	return {
		active_chat_id: r,
		visible: D(() => e().flatMap((e) => {
			let i = e.payload.chat_id;
			return typeof i != "string" || i === "" ? [e] : i === r.value ? [{
				...e,
				payload: {
					...e.payload,
					scope_label: t().this_chat
				}
			}] : n() ? [{
				...e,
				payload: {
					...e.payload,
					scope_label: t().other_chat(i)
				}
			}] : [];
		}))
	};
}
//#endregion
//#region src/ui/views/assets/CharacterReference.vue?vue&type=script&setup=true&lang.ts
var Te = ["src", "alt"], Ee = ["id"], De = ["id"], Oe = /* @__PURE__ */ N({
	__name: "CharacterReference",
	props: {
		image: {},
		send: { type: Boolean },
		mode: {},
		defaultPrompt: {}
	},
	emits: [
		"update:image",
		"update:send",
		"update:mode",
		"generated",
		"uploaded"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = T(), a = d(F, null), o = y(null), s = y(null), l = y(!1), f = y(!1), g = y(""), _ = y(""), b = D(() => [
			{
				value: "vibe",
				label: i("assets.characters.reference_mode_vibe")
			},
			{
				value: "img2img",
				label: i("assets.characters.reference_mode_img2img")
			},
			{
				value: "precise",
				label: i("assets.characters.reference_mode_precise")
			}
		]);
		async function C(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", n === void 0) return;
			s.value = null;
			let a;
			try {
				a = await he(n);
			} catch {
				s.value = i("assets.characters.reference_image_unreadable");
				return;
			}
			r("update:image", a), r("uploaded", a);
		}
		function E() {
			g.value = n.defaultPrompt.positive_prompt, _.value = n.defaultPrompt.negative_prompt, s.value = null, l.value = !0;
		}
		async function k() {
			if (a !== null) {
				f.value = !0, s.value = null;
				try {
					let e = await a.generate({
						positive_prompt: g.value,
						negative_prompt: _.value
					}), t = await he(e);
					r("update:image", t), r("generated", t), l.value = !1;
				} catch (e) {
					s.value = i("assets.characters.reference_generate_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					f.value = !1;
				}
			}
		}
		return (t, n) => (u(), m(A, null, [
			P(X, {
				label: v(i)("assets.characters.reference_image_label"),
				hint: v(i)("assets.characters.reference_image_hint"),
				error: s.value
			}, {
				default: p(() => [w("div", { class: j(v(W).reference) }, [e.image === null ? x("", !0) : (u(), m("img", {
					key: 0,
					src: e.image,
					alt: v(i)("assets.characters.reference_image_label"),
					class: j(v(W).reference_thumbnail)
				}, null, 10, Te)), w("div", { class: j(v(W).reference_actions) }, [
					w("input", {
						ref_key: "file_input",
						ref: o,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						hidden: "",
						"data-testid": "character-reference-input",
						onChange: C
					}, null, 544),
					P(z, {
						label: v(i)("assets.characters.reference_upload"),
						onClick: n[0] ||= (e) => o.value?.click()
					}, null, 8, ["label"]),
					v(a) === null ? x("", !0) : (u(), S(z, {
						key: 0,
						label: v(i)("assets.characters.reference_generate"),
						disabled: l.value,
						"data-testid": "character-reference-generate",
						onClick: E
					}, null, 8, ["label", "disabled"])),
					e.image === null ? x("", !0) : (u(), S(z, {
						key: 1,
						label: v(i)("assets.characters.reference_image_remove"),
						onClick: n[1] ||= (e) => r("update:image", null)
					}, null, 8, ["label"]))
				], 2)], 2)]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			l.value ? (u(), m("div", {
				key: 0,
				class: j(v(W).reference_composer)
			}, [
				w("p", { class: j(v(W).chat_scope_note) }, O(v(i)("assets.characters.reference_generate_hint")), 3),
				P(X, { label: v(i)("assets.characters.reference_prompt_label") }, {
					default: p(({ fieldId: e }) => [c(w("textarea", {
						id: e,
						"onUpdate:modelValue": n[2] ||= (e) => g.value = e,
						class: j(v(W).textArea)
					}, null, 10, Ee), [[h, g.value]])]),
					_: 1
				}, 8, ["label"]),
				P(X, { label: v(i)("assets.characters.reference_negative_label") }, {
					default: p(({ fieldId: e }) => [c(w("textarea", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => _.value = e,
						class: j(v(W).textArea)
					}, null, 10, De), [[h, _.value]])]),
					_: 1
				}, 8, ["label"]),
				w("div", { class: j(v(W).reference_actions) }, [P(z, {
					label: v(i)("common.actions.cancel"),
					onClick: n[4] ||= (e) => l.value = !1
				}, null, 8, ["label"]), P(z, {
					label: e.image === null ? v(i)("assets.characters.reference_generate_submit") : v(i)("assets.characters.reference_regenerate_submit"),
					variant: "primary",
					pending: f.value,
					"data-testid": "character-reference-submit",
					onClick: k
				}, null, 8, ["label", "pending"])], 2)
			], 2)) : x("", !0),
			e.image === null ? x("", !0) : (u(), m(A, { key: 1 }, [P(ae, {
				"model-value": e.send,
				label: v(i)("assets.characters.reference_send_label"),
				"onUpdate:modelValue": n[5] ||= (e) => r("update:send", e)
			}, null, 8, ["model-value", "label"]), P(X, {
				label: v(i)("assets.characters.reference_mode_label"),
				hint: v(i)("assets.characters.reference_mode_hint")
			}, {
				default: p(() => [P(ge, {
					"model-value": e.mode,
					options: b.value,
					label: v(i)("assets.characters.reference_mode_label"),
					"onUpdate:modelValue": n[6] ||= (e) => r("update:mode", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				_: 1
			}, 8, ["label", "hint"])], 64))
		], 64));
	}
});
//#endregion
//#region src/ui/views/assets/wardrobe_labels.ts
function ke(e, t) {
	switch (t) {
		case "age": return e("assets.characters.appearance.age");
		case "body": return e("assets.characters.appearance.body");
		case "skin": return e("assets.characters.appearance.skin");
		case "hair": return e("assets.characters.appearance.hair");
		case "eyes": return e("assets.characters.appearance.eyes");
		case "makeup": return e("assets.characters.appearance.makeup");
		case "expression": return e("assets.characters.appearance.expression");
		case "features": return e("assets.characters.appearance.features");
	}
}
function Ae(e, t) {
	switch (t) {
		case "full_body": return e("assets.outfits.slots.full_body");
		case "outerwear": return e("assets.outfits.slots.outerwear");
		case "top": return e("assets.outfits.slots.top");
		case "bottom": return e("assets.outfits.slots.bottom");
		case "legwear": return e("assets.outfits.slots.legwear");
		case "footwear": return e("assets.outfits.slots.footwear");
		case "headwear": return e("assets.outfits.slots.headwear");
		case "accessories": return e("assets.outfits.slots.accessories");
	}
}
//#endregion
//#region src/ui/views/assets/CharacterPanel.vue?vue&type=script&setup=true&lang.ts
var je = "none", Me = "solo, full body, standing, looking at viewer, simple background, white background", Ne = /* @__PURE__ */ N({
	__name: "CharacterPanel",
	props: {
		records: {},
		outfitRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(a) {
		let s = a, { t: c } = T(), { visible: l } = we(() => s.records, () => ({
			this_chat: c("assets.chat_scope_label"),
			other_chat: (e) => c("assets.other_chat_scope_label", { chat: e })
		}), () => s.showAllChats), f = D(() => [
			{
				key: "aliases",
				label: c("assets.characters.aliases_label"),
				kind: "text",
				hint: c("assets.characters.aliases_hint")
			},
			...r.map((e) => ({
				key: e,
				label: ke(c, e),
				kind: "text"
			})),
			{
				key: "excluded_traits",
				label: c("assets.characters.excluded_traits_label"),
				kind: "text",
				hint: c("assets.characters.excluded_traits_hint")
			}
		]), h = D(() => [{
			key: "scope_label",
			label: c("assets.scope_label")
		}]), g = K("character", s.controller, () => f.value, () => c("errors.validation_required"), [
			"subject",
			"default_outfit_id",
			"reference_image",
			"reference_send",
			"reference_mode",
			"origin",
			"locked_fields",
			"chat_id",
			"created_from_message_id"
		]), _ = D(() => [
			{
				value: "girl",
				label: c("assets.characters.subject_girl")
			},
			{
				value: "boy",
				label: c("assets.characters.subject_boy")
			},
			{
				value: "other",
				label: c("assets.characters.subject_other")
			}
		]), b = D(() => g.values.subject === "boy" || g.values.subject === "other" ? g.values.subject : "girl"), S = D(() => {
			let e = g.record_id.value;
			return [{
				value: je,
				label: c("assets.characters.default_outfit_first")
			}, ...s.outfitRecords.filter((t) => {
				let n = t.payload.character_id;
				return typeof n != "string" || n === "" || n === e;
			}).map((e) => ({
				value: e.id,
				label: e.display_name
			}))];
		}), C = D(() => typeof g.values.default_outfit_id == "string" && g.values.default_outfit_id !== "" ? g.values.default_outfit_id : je), w = D(() => typeof g.values.chat_id == "string" && g.values.chat_id !== ""), E = D(() => typeof g.values.reference_image == "string" && g.values.reference_image !== "" ? g.values.reference_image : null), k = D(() => g.values.reference_mode === "img2img" || g.values.reference_mode === "precise" ? g.values.reference_mode : "vibe");
		function A(e) {
			if (e === null) {
				for (let e of [
					"reference_image",
					"reference_send",
					"reference_mode"
				]) Reflect.deleteProperty(g.values, e);
				return;
			}
			g.values.reference_image = e, g.values.reference_mode = k.value;
		}
		let N = d(F, null), I = y(null), L = y(!1), R = y(null);
		function ee(e) {
			s.outfitRecords.some((e) => e.payload.character_id === g.record_id.value) || (I.value = e);
		}
		async function te(e) {
			let t = crypto.randomUUID();
			await s.controller.save_asset("outfit", {
				id: t,
				category: "outfit",
				record_key: t,
				display_name: e.name,
				payload: {
					...Object.fromEntries(i.map((t) => [t, n(e.slots[t] ?? [])])),
					character_id: g.record_id.value,
					origin: "analysis",
					chat_id: typeof g.values.chat_id == "string" ? g.values.chat_id : ""
				}
			}), g.values.default_outfit_id = t;
		}
		async function ne() {
			let e = I.value;
			if (e !== null && N !== null) {
				L.value = !0, R.value = null;
				try {
					await te(await N.read_outfit(e));
				} catch (e) {
					R.value = c("assets.characters.outfit_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					L.value = !1, I.value = null;
				}
			}
		}
		let H = y(null), U = y(!1);
		function re(e) {
			N !== null && (H.value = e);
		}
		async function ie() {
			let t = H.value;
			if (t !== null && N !== null) {
				U.value = !0, R.value = null;
				try {
					let i = await N.read_character(t);
					for (let t of r) {
						let r = i.appearance[t];
						r !== void 0 && e(g.values[t]).length === 0 && (g.values[t] = n(r));
					}
					g.values.subject !== "girl" && g.values.subject !== "boy" && (g.values.subject = i.subject), i.outfit !== null && await te(i.outfit);
				} catch (e) {
					R.value = c("assets.characters.character_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					U.value = !1, H.value = null;
				}
			}
		}
		let ae = {
			girl: "1girl",
			boy: "1boy",
			other: ""
		}, oe = D(() => {
			let e = g.record_id.value, n = s.outfitRecords.map(t), r = n.find((e) => e.id === g.values.default_outfit_id) ?? n.find((t) => t.character_id === e);
			return r === void 0 ? [] : i.flatMap((e) => r.slots[e]);
		}), se = D(() => ({
			positive_prompt: n([
				ae[b.value],
				Me,
				...r.flatMap((t) => e(g.values[t])),
				...oe.value
			].filter((e) => e !== "")),
			negative_prompt: n(e(g.values.excluded_traits))
		}));
		async function ce() {
			let t = g.editing_record.value?.payload ?? {}, n = r.filter((n) => e(g.values[n]).join(",") !== e(typeof t[n] == "string" ? t[n] : "").join(",")), i = /* @__PURE__ */ new Set([...e(g.values.locked_fields), ...n]);
			g.values.locked_fields = [...i].join(", "), g.values.origin = typeof g.values.origin == "string" ? g.values.origin : "user", await g.save();
		}
		async function Z() {
			g.values.chat_id = "", await ce();
		}
		let le = (e) => c("assets.delete_confirm_title", { name: e });
		return (e, t) => (u(), m("div", null, [
			P(G, {
				records: v(l),
				"summary-fields": h.value,
				loading: a.loading,
				"search-label": v(c)("common.actions.search"),
				"search-placeholder": v(c)("common.actions.search"),
				"empty-title": v(c)("assets.characters.empty_title"),
				"empty-description": v(c)("assets.characters.empty_description"),
				"add-label": v(c)("assets.characters.add_action"),
				"random-label": v(c)("assets.random_selection_action"),
				"reorder-hint": v(c)("assets.reorder_hint"),
				"edit-label": v(c)("common.actions.edit"),
				"delete-label": v(c)("common.actions.delete"),
				"delete-confirm-title": le,
				"delete-confirm-description": v(c)("assets.delete_confirm_description"),
				"confirm-label": v(c)("confirmations.destructive.default_confirm_action"),
				"cancel-label": v(c)("confirmations.destructive.default_cancel_action"),
				"move-up-label": v(c)("assets.move_up_action"),
				"move-down-label": v(c)("assets.move_down_action"),
				"drag-handle-label": v(c)("assets.drag_handle_label"),
				onAdd: v(g).open_create,
				onEdit: v(g).open_edit,
				onDelete: v(g).remove,
				onDeleteMany: t[0] ||= (e) => void v(g).remove_many(e),
				onReorder: v(g).reorder,
				onRandomSelect: v(g).random_select
			}, null, 8, [
				"records",
				"summary-fields",
				"loading",
				"search-label",
				"search-placeholder",
				"empty-title",
				"empty-description",
				"add-label",
				"random-label",
				"reorder-hint",
				"edit-label",
				"delete-label",
				"delete-confirm-description",
				"confirm-label",
				"cancel-label",
				"move-up-label",
				"move-down-label",
				"drag-handle-label",
				"onAdd",
				"onEdit",
				"onDelete",
				"onReorder",
				"onRandomSelect"
			]),
			P(Y, {
				open: v(g).dialog_open.value,
				title: v(g).editing_record.value ? v(c)("common.actions.edit") : v(c)("assets.characters.add_action"),
				description: v(c)("assets.form_dialog_description"),
				"close-label": v(c)("common.actions.close"),
				"onUpdate:open": t[7] ||= (e) => {
					e || v(g).close_dialog();
				}
			}, {
				default: p(() => [P(q, {
					"name-label": v(c)("common.labels.name"),
					"name-placeholder": v(c)("common.labels.name"),
					name: v(g).name.value,
					"name-error": v(g).name_error.value,
					"save-error": v(g).save_error.value,
					fields: f.value,
					values: v(g).values,
					"save-label": v(c)("common.actions.save"),
					"cancel-label": v(c)("common.actions.cancel"),
					"decrement-label": v(c)("common.actions.decrease"),
					"increment-label": v(c)("common.actions.increase"),
					pending: v(g).saving.value,
					"onUpdate:name": t[5] ||= (e) => {
						v(g).name.value = e;
					},
					"onUpdate:values": t[6] ||= (e) => v(J)(v(g).values, e),
					onSave: ce,
					onCancel: v(g).close_dialog
				}, {
					"leading-fields": p(() => [P(Oe, {
						image: E.value,
						send: v(g).values.reference_send === 1,
						mode: k.value,
						"default-prompt": se.value,
						"onUpdate:image": A,
						"onUpdate:send": t[1] ||= (e) => v(g).values.reference_send = +!!e,
						"onUpdate:mode": t[2] ||= (e) => v(g).values.reference_mode = e,
						onGenerated: ee,
						onUploaded: re
					}, null, 8, [
						"image",
						"send",
						"mode",
						"default-prompt"
					]), R.value === null ? x("", !0) : (u(), m("p", {
						key: 0,
						class: j(v(W).formError),
						role: "alert"
					}, O(R.value), 3))]),
					"extra-fields": p(() => [
						w.value ? (u(), m("p", {
							key: 0,
							class: j(v(W).chat_scope_note)
						}, [M(O(v(c)("assets.chat_scope_note")) + " ", 1), P(z, {
							label: v(c)("assets.import_to_global_action"),
							"data-testid": "import-to-global",
							onClick: Z
						}, null, 8, ["label"])], 2)) : x("", !0),
						P(X, { label: v(c)("assets.characters.subject_label") }, {
							default: p(() => [P(ge, {
								"model-value": b.value,
								options: _.value,
								label: v(c)("assets.characters.subject_label"),
								"onUpdate:modelValue": t[3] ||= (e) => v(g).values.subject = e
							}, null, 8, [
								"model-value",
								"options",
								"label"
							])]),
							_: 1
						}, 8, ["label"]),
						P(X, { label: v(c)("assets.characters.default_outfit_label") }, {
							default: p(({ fieldId: e, describedBy: n }) => [P(V, o({
								id: e,
								"model-value": C.value,
								options: S.value,
								placeholder: v(c)("assets.characters.default_outfit_label")
							}, v(B)({ describedBy: n }), { "onUpdate:modelValue": t[4] ||= (e) => v(g).values.default_outfit_id = e === je ? "" : e }), null, 16, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"])
					]),
					_: 1
				}, 8, [
					"name-label",
					"name-placeholder",
					"name",
					"name-error",
					"save-error",
					"fields",
					"values",
					"save-label",
					"cancel-label",
					"decrement-label",
					"increment-label",
					"pending",
					"onCancel"
				])]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			P(me, {
				open: I.value !== null,
				title: v(c)("assets.characters.outfit_from_reference_title"),
				description: v(c)("assets.characters.outfit_from_reference_description"),
				"confirm-label": v(c)("assets.characters.outfit_from_reference_confirm"),
				"cancel-label": v(c)("assets.characters.outfit_from_reference_cancel"),
				pending: L.value,
				destructive: !1,
				"onUpdate:open": t[8] ||= (e) => {
					!e && !L.value && (I.value = null);
				},
				onConfirm: ne
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			P(me, {
				open: H.value !== null,
				title: v(c)("assets.characters.character_from_reference_title"),
				description: v(c)("assets.characters.character_from_reference_description"),
				"confirm-label": v(c)("assets.characters.character_from_reference_confirm"),
				"cancel-label": v(c)("assets.characters.character_from_reference_cancel"),
				pending: U.value,
				destructive: !1,
				"onUpdate:open": t[9] ||= (e) => {
					!e && !U.value && (H.value = null);
				},
				onConfirm: ie
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		]));
	}
}), Pe = /* @__PURE__ */ N({
	__name: "LoraPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = T(), r = D(() => [
			{
				key: "file_name",
				label: n("assets.lora.file_name_label"),
				kind: "text",
				required: !0,
				hint: n("assets.lora.file_name_hint")
			},
			{
				key: "trigger_words",
				label: n("assets.lora.trigger_words_label"),
				kind: "text"
			},
			{
				key: "weight",
				label: n("assets.lora.weight_label"),
				kind: "number",
				min: 0,
				max: 2,
				step: .05
			}
		]), i = [
			{
				key: "file_name",
				label: n("assets.lora.file_name_label")
			},
			{
				key: "weight",
				label: n("assets.lora.weight_label"),
				numeric: !0
			},
			{
				key: "trigger_words",
				label: n("assets.lora.trigger_words_label")
			}
		], a = K("lora", t.controller, () => r.value, () => n("errors.validation_required"), ["character_id"]);
		function s() {
			a.open_create(), a.values.weight = 1;
		}
		let c = D(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), l = D(() => {
			let e = a.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		}), d = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, f) => (u(), m("div", null, [P(G, {
			records: e.records,
			"summary-fields": i,
			loading: e.loading,
			"search-label": v(n)("common.actions.search"),
			"search-placeholder": v(n)("common.actions.search"),
			"empty-title": v(n)("assets.lora.empty_title"),
			"empty-description": v(n)("assets.lora.empty_description"),
			"add-label": v(n)("assets.lora.add_action"),
			"random-label": v(n)("assets.random_selection_action"),
			"reorder-hint": v(n)("assets.reorder_hint"),
			"edit-label": v(n)("common.actions.edit"),
			"delete-label": v(n)("common.actions.delete"),
			"delete-confirm-title": d,
			"delete-confirm-description": v(n)("assets.delete_confirm_description"),
			"confirm-label": v(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": v(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": v(n)("assets.move_up_action"),
			"move-down-label": v(n)("assets.move_down_action"),
			"drag-handle-label": v(n)("assets.drag_handle_label"),
			onAdd: s,
			onEdit: v(a).open_edit,
			onDelete: v(a).remove,
			onDeleteMany: f[0] ||= (e) => void v(a).remove_many(e),
			onReorder: v(a).reorder,
			onRandomSelect: v(a).random_select
		}, null, 8, [
			"records",
			"loading",
			"search-label",
			"search-placeholder",
			"empty-title",
			"empty-description",
			"add-label",
			"random-label",
			"reorder-hint",
			"edit-label",
			"delete-label",
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"move-up-label",
			"move-down-label",
			"drag-handle-label",
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), P(Y, {
			open: v(a).dialog_open.value,
			title: v(a).editing_record.value ? v(n)("common.actions.edit") : v(n)("assets.lora.add_action"),
			description: v(n)("assets.form_dialog_description"),
			"close-label": v(n)("common.actions.close"),
			"onUpdate:open": f[4] ||= (e) => {
				e || v(a).close_dialog();
			}
		}, {
			default: p(() => [P(q, {
				"name-label": v(n)("common.labels.name"),
				"name-placeholder": v(n)("common.labels.name"),
				name: v(a).name.value,
				"name-error": v(a).name_error.value,
				"save-error": v(a).save_error.value,
				fields: r.value,
				values: v(a).values,
				"save-label": v(n)("common.actions.save"),
				"cancel-label": v(n)("common.actions.cancel"),
				"decrement-label": v(n)("common.actions.decrease"),
				"increment-label": v(n)("common.actions.increase"),
				pending: v(a).saving.value,
				"onUpdate:name": f[2] ||= (e) => {
					v(a).name.value = e;
				},
				"onUpdate:values": f[3] ||= (e) => v(J)(v(a).values, e),
				onSave: v(a).save,
				onCancel: v(a).close_dialog
			}, {
				"extra-fields": p(() => [P(X, {
					label: v(n)("assets.lora.character_label"),
					hint: v(n)("assets.lora.character_hint")
				}, {
					default: p(({ fieldId: e, describedBy: t }) => [P(V, o({
						id: e,
						"model-value": l.value,
						options: c.value,
						placeholder: v(n)("assets.lora.character_placeholder")
					}, v(B)({ describedBy: t }), { "onUpdate:modelValue": f[1] ||= (e) => v(a).values.character_id = e }), null, 16, [
						"id",
						"model-value",
						"options",
						"placeholder"
					])]),
					_: 1
				}, 8, ["label", "hint"])]),
				_: 1
			}, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"save-error",
				"fields",
				"values",
				"save-label",
				"cancel-label",
				"decrement-label",
				"increment-label",
				"pending",
				"onSave",
				"onCancel"
			])]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])]));
	}
}), Fe = /* @__PURE__ */ N({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(e) {
		let t = e, { t: n } = T(), r = D(() => i.map((e) => ({
			key: e,
			label: Ae(n, e),
			kind: "text"
		}))), a = D(() => [{
			key: "owner_label",
			label: n("assets.outfits.character_label")
		}, {
			key: "scope_label",
			label: n("assets.scope_label")
		}]), { visible: s } = we(() => t.records, () => ({
			this_chat: n("assets.chat_scope_label"),
			other_chat: (e) => n("assets.other_chat_scope_label", { chat: e })
		}), () => t.showAllChats), c = D(() => s.value.map((e) => {
			let n = t.characterRecords.find((t) => t.id === e.payload.character_id);
			return n === void 0 ? e : {
				...e,
				payload: {
					...e.payload,
					owner_label: n.display_name
				}
			};
		})), { visible: l } = we(() => t.characterRecords, () => ({
			this_chat: n("assets.chat_scope_label"),
			other_chat: (e) => n("assets.other_chat_scope_label", { chat: e })
		})), d = K("outfit", t.controller, () => r.value, () => n("errors.validation_required"), [
			"character_id",
			"origin",
			"chat_id"
		]), f = D(() => typeof d.values.chat_id == "string" && d.values.chat_id !== "");
		async function h() {
			d.values.chat_id = "", await d.save();
		}
		let g = D(() => l.value.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), _ = D(() => {
			let e = d.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function y(e) {
			d.values.character_id = e;
		}
		let b = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, i) => (u(), m("div", null, [P(G, {
			records: c.value,
			"summary-fields": a.value,
			loading: e.loading,
			"search-label": v(n)("common.actions.search"),
			"search-placeholder": v(n)("common.actions.search"),
			"empty-title": v(n)("assets.outfits.empty_title"),
			"empty-description": v(n)("assets.outfits.empty_description"),
			"add-label": v(n)("assets.outfits.add_action"),
			"random-label": v(n)("assets.random_selection_action"),
			"reorder-hint": v(n)("assets.reorder_hint"),
			"edit-label": v(n)("common.actions.edit"),
			"delete-label": v(n)("common.actions.delete"),
			"delete-confirm-title": b,
			"delete-confirm-description": v(n)("assets.delete_confirm_description"),
			"confirm-label": v(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": v(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": v(n)("assets.move_up_action"),
			"move-down-label": v(n)("assets.move_down_action"),
			"drag-handle-label": v(n)("assets.drag_handle_label"),
			onAdd: v(d).open_create,
			onEdit: v(d).open_edit,
			onDelete: v(d).remove,
			onDeleteMany: i[0] ||= (e) => void v(d).remove_many(e),
			onReorder: v(d).reorder,
			onRandomSelect: v(d).random_select
		}, null, 8, [
			"records",
			"summary-fields",
			"loading",
			"search-label",
			"search-placeholder",
			"empty-title",
			"empty-description",
			"add-label",
			"random-label",
			"reorder-hint",
			"edit-label",
			"delete-label",
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"move-up-label",
			"move-down-label",
			"drag-handle-label",
			"onAdd",
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), P(Y, {
			open: v(d).dialog_open.value,
			title: v(d).editing_record.value ? v(n)("common.actions.edit") : v(n)("assets.outfits.add_action"),
			description: v(n)("assets.form_dialog_description"),
			"close-label": v(n)("common.actions.close"),
			"onUpdate:open": i[3] ||= (e) => {
				e || v(d).close_dialog();
			}
		}, {
			default: p(() => [P(q, {
				"name-label": v(n)("common.labels.name"),
				"name-placeholder": v(n)("common.labels.name"),
				name: v(d).name.value,
				"name-error": v(d).name_error.value,
				"save-error": v(d).save_error.value,
				fields: r.value,
				values: v(d).values,
				"save-label": v(n)("common.actions.save"),
				"cancel-label": v(n)("common.actions.cancel"),
				"decrement-label": v(n)("common.actions.decrease"),
				"increment-label": v(n)("common.actions.increase"),
				pending: v(d).saving.value,
				"onUpdate:name": i[1] ||= (e) => {
					v(d).name.value = e;
				},
				"onUpdate:values": i[2] ||= (e) => v(J)(v(d).values, e),
				onSave: v(d).save,
				onCancel: v(d).close_dialog
			}, {
				"extra-fields": p(() => [f.value ? (u(), m("p", {
					key: 0,
					class: j(v(W).chat_scope_note)
				}, [M(O(v(n)("assets.chat_scope_note")) + " ", 1), P(z, {
					label: v(n)("assets.import_to_global_action"),
					onClick: h
				}, null, 8, ["label"])], 2)) : x("", !0), P(X, { label: v(n)("assets.outfits.character_label") }, {
					default: p(({ fieldId: e, describedBy: t }) => [P(V, o({
						id: e,
						"model-value": _.value,
						options: g.value,
						placeholder: v(n)("assets.outfits.character_placeholder")
					}, v(B)({ describedBy: t }), { "onUpdate:modelValue": y }), null, 16, [
						"id",
						"model-value",
						"options",
						"placeholder"
					])]),
					_: 1
				}, 8, ["label"])]),
				_: 1
			}, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"save-error",
				"fields",
				"values",
				"save-label",
				"cancel-label",
				"decrement-label",
				"increment-label",
				"pending",
				"onSave",
				"onCancel"
			])]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])]));
	}
}), Ie = ["src", "alt"], Le = ["id", "aria-describedby"], Re = "novelai", ze = "google", Be = /* @__PURE__ */ N({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = T(), r = D(() => [{
			value: Re,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: ze,
			label: n("assets.vibe.provider_google")
		}]), i = D(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return o.values.provider !== ze && e.push({
				key: "strength",
				label: n("assets.vibe.strength_label"),
				kind: "number",
				min: 0,
				max: 1,
				step: .05
			}, {
				key: "information_extracted",
				label: n("assets.vibe.information_extracted_label"),
				kind: "number",
				min: 0,
				max: 1,
				step: .05
			}), e;
		}), a = [{
			key: "strength",
			label: n("assets.vibe.strength_label"),
			numeric: !0
		}], o = K("vibe", t.controller, () => i.value, () => n("errors.validation_required"), ["provider", "image"]), s = y(null), c = D(() => typeof o.values.image == "string" && o.values.image !== "" ? o.values.image : null);
		async function l(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				s.value = null;
				try {
					o.values.image = await he(t);
				} catch {
					s.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let d = D(() => typeof o.values.provider == "string" && o.values.provider !== "" ? o.values.provider : Re);
		function f(e) {
			o.values.provider = e;
		}
		let h = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, g) => (u(), m("div", null, [P(G, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": v(n)("common.actions.search"),
			"search-placeholder": v(n)("common.actions.search"),
			"empty-title": v(n)("assets.vibe.empty_title"),
			"empty-description": v(n)("assets.vibe.empty_description"),
			"add-label": v(n)("assets.vibe.add_action"),
			"random-label": v(n)("assets.random_selection_action"),
			"reorder-hint": v(n)("assets.reorder_hint"),
			"edit-label": v(n)("common.actions.edit"),
			"delete-label": v(n)("common.actions.delete"),
			"delete-confirm-title": h,
			"delete-confirm-description": v(n)("assets.delete_confirm_description"),
			"confirm-label": v(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": v(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": v(n)("assets.move_up_action"),
			"move-down-label": v(n)("assets.move_down_action"),
			"drag-handle-label": v(n)("assets.drag_handle_label"),
			onAdd: v(o).open_create,
			onEdit: v(o).open_edit,
			onDelete: v(o).remove,
			onDeleteMany: g[0] ||= (e) => void v(o).remove_many(e),
			onReorder: v(o).reorder,
			onRandomSelect: v(o).random_select
		}, null, 8, [
			"records",
			"loading",
			"search-label",
			"search-placeholder",
			"empty-title",
			"empty-description",
			"add-label",
			"random-label",
			"reorder-hint",
			"edit-label",
			"delete-label",
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"move-up-label",
			"move-down-label",
			"drag-handle-label",
			"onAdd",
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), P(Y, {
			open: v(o).dialog_open.value,
			title: v(o).editing_record.value ? v(n)("common.actions.edit") : v(n)("assets.vibe.add_action"),
			description: v(n)("assets.form_dialog_description"),
			"close-label": v(n)("common.actions.close"),
			"onUpdate:open": g[3] ||= (e) => {
				e || v(o).close_dialog();
			}
		}, {
			default: p(() => [P(q, {
				"name-label": v(n)("common.labels.name"),
				"name-placeholder": v(n)("common.labels.name"),
				name: v(o).name.value,
				"name-error": v(o).name_error.value,
				"save-error": v(o).save_error.value,
				fields: i.value,
				values: v(o).values,
				"save-label": v(n)("common.actions.save"),
				"cancel-label": v(n)("common.actions.cancel"),
				"decrement-label": v(n)("common.actions.decrease"),
				"increment-label": v(n)("common.actions.increase"),
				pending: v(o).saving.value,
				"onUpdate:name": g[1] ||= (e) => {
					v(o).name.value = e;
				},
				"onUpdate:values": g[2] ||= (e) => v(J)(v(o).values, e),
				onSave: v(o).save,
				onCancel: v(o).close_dialog
			}, {
				"extra-fields": p(() => [P(X, {
					label: v(n)("assets.vibe.image_label"),
					hint: v(n)("assets.vibe.image_hint"),
					error: s.value
				}, {
					default: p(({ fieldId: e, describedBy: t }) => [c.value === null ? x("", !0) : (u(), m("img", {
						key: 0,
						src: c.value,
						alt: v(n)("assets.vibe.image_label"),
						class: j(v(W).reference_thumbnail)
					}, null, 10, Ie)), w("input", {
						id: e,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						"aria-describedby": t,
						"data-testid": "vibe-image-input",
						onChange: l
					}, null, 40, Le)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), P(X, { label: v(n)("assets.vibe.provider_label") }, {
					default: p(() => [P(ge, {
						"model-value": d.value,
						options: r.value,
						label: v(n)("assets.vibe.provider_label"),
						"onUpdate:modelValue": f
					}, null, 8, [
						"model-value",
						"options",
						"label"
					])]),
					_: 1
				}, 8, ["label"])]),
				_: 1
			}, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"save-error",
				"fields",
				"values",
				"save-label",
				"cancel-label",
				"decrement-label",
				"increment-label",
				"pending",
				"onSave",
				"onCancel"
			])]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])]));
	}
}), Ve = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, He = ["placeholder"], Ue = ["aria-expanded"], We = /* @__PURE__ */ N({
	__name: "VocabularyPanel",
	props: {
		catalog: {},
		installCommand: {},
		loading: { type: Boolean },
		controller: {},
		locale: {}
	},
	setup(e) {
		let t = e, { t: n } = T();
		a(() => {
			t.controller.load_vocabulary_catalog();
		});
		let r = /nsfw|adult|explicit/iu;
		function i(e) {
			return r.test(e.package_id) || r.test(e.display_name.en) || r.test(e.display_name["zh-CN"]);
		}
		let o = D(() => t.catalog.filter((e) => !i(e))), l = D(() => t.catalog.filter((e) => i(e))), d = y(!1);
		function g(e) {
			return t.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let _ = y(null), b = y(null);
		function C(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return n("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return n("assets.vocabulary.progress_downloading");
				case "verifying_package": return n("assets.vocabulary.progress_verifying_package");
				case "installing": return n("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function E(e) {
			_.value === null && (_.value = e.package_id, b.value = null, await t.controller.install_vocabulary_package(e, (e) => {
				b.value = C(e);
			}), _.value = null, b.value = null, t.controller.state.assets.vocabulary_install_command.status === "success" && (N.value = [], F.value = null, k.value.trim() !== "" && await G()));
		}
		let k = y(""), N = y([]), F = y(null), I = y(!1), L = y(!1), B = y(null), V = null;
		async function G() {
			let e = k.value.trim();
			if (e === "") {
				N.value = [], F.value = null;
				return;
			}
			I.value = !0;
			try {
				let n = await t.controller.search_vocabulary(e);
				N.value = n.results, F.value = n.next_cursor;
			} finally {
				I.value = !1;
			}
		}
		async function K() {
			if (F.value !== null) {
				L.value = !0;
				try {
					let e = await t.controller.load_more_vocabulary(F.value);
					N.value = [...N.value, ...e.results], F.value = e.next_cursor;
				} finally {
					L.value = !1;
				}
			}
		}
		f(k, () => {
			V !== null && clearTimeout(V), V = setTimeout(() => {
				G();
			}, 250);
		});
		async function q(e) {
			await navigator.clipboard.writeText(e.display_text), B.value = e.record_id, setTimeout(() => {
				B.value === e.record_id && (B.value = null);
			}, 2e3);
		}
		let J = D(() => t.loading ? "loading" : t.catalog.length === 0 ? "empty" : "ready"), re = D(() => I.value && N.value.length === 0 ? "loading" : k.value.trim() === "" || N.value.length > 0 ? "ready" : "empty");
		return (e, t) => (u(), m("div", { class: j(v(W).vocabularyPanel) }, [
			w("section", null, [
				w("p", { class: j(v(W).sectionTitle) }, O(v(n)("assets.vocabulary.search_placeholder")), 3),
				w("div", { class: j(v(W).vocabularySearchRow) }, [w("label", Ve, O(v(n)("assets.vocabulary.search_placeholder")), 1), c(w("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": t[0] ||= (e) => k.value = e,
					type: "text",
					class: j(v(W).searchInput),
					placeholder: v(n)("assets.vocabulary.search_placeholder")
				}, null, 10, He), [[h, k.value]])], 2),
				P(ee, {
					status: re.value,
					"empty-title": v(n)("assets.vocabulary.empty_title"),
					"empty-message": v(n)("assets.vocabulary.empty_description"),
					"min-height": "60px"
				}, {
					default: p(() => [N.value.length > 0 ? (u(), m("ul", {
						key: 0,
						class: j(v(W).searchResultsList)
					}, [(u(!0), m(A, null, s(N.value, (e) => (u(), m("li", {
						key: e.record_id,
						class: j(v(W).searchResultRow)
					}, [
						w("span", { class: j(v(W).searchResultTag) }, O(e.display_text), 3),
						e.category ? (u(), m("span", {
							key: 0,
							class: j(v(W).searchResultTranslation)
						}, O(e.category), 3)) : x("", !0),
						P(z, {
							label: B.value === e.record_id ? v(n)("common.actions.copied") : v(n)("common.actions.copy"),
							icon: v(H),
							variant: "secondary",
							onClick: () => void q(e)
						}, null, 8, [
							"label",
							"icon",
							"onClick"
						])
					], 2))), 128))], 2)) : x("", !0)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
					"empty-message"
				]),
				F.value === null ? x("", !0) : (u(), m("div", {
					key: 0,
					class: j(v(W).loadMoreRow)
				}, [P(z, {
					label: v(n)("common.actions.next"),
					variant: "secondary",
					pending: L.value,
					onClick: t[1] ||= () => void K()
				}, null, 8, ["label", "pending"])], 2))
			]),
			w("section", null, [
				w("p", { class: j(v(W).sectionTitle) }, O(v(n)("assets.vocabulary.update_action")), 3),
				P(ee, {
					status: J.value,
					"empty-title": v(n)("assets.vocabulary.empty_title"),
					"empty-message": v(n)("assets.vocabulary.empty_description"),
					"min-height": "80px"
				}, {
					default: p(() => [w("div", { class: j(v(W).catalogList) }, [(u(!0), m(A, null, s(o.value, (e) => (u(), m("div", {
						key: e.package_id,
						class: j(v(W).catalogEntry)
					}, [w("div", { class: j(v(W).catalogEntryInfo) }, [w("span", { class: j(v(W).catalogEntryName) }, O(g(e)), 3), w("span", { class: j(["tc-tabular-nums", v(W).catalogEntryMeta]) }, O(v(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (u(), m("span", {
						key: 0,
						class: j(v(W).bundledBadge)
					}, O(v(n)("assets.vocabulary.bundled_label")), 3)) : (u(), S(z, {
						key: 1,
						label: v(n)("assets.vocabulary.import_action"),
						icon: v(U),
						variant: "primary",
						pending: _.value === e.package_id,
						onClick: () => void E(e)
					}, null, 8, [
						"label",
						"icon",
						"pending",
						"onClick"
					]))], 2))), 128))], 2)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
					"empty-message"
				]),
				_.value !== null && b.value !== null ? (u(), m("p", {
					key: 0,
					class: j(v(W).installProgress)
				}, O(b.value), 3)) : x("", !0)
			]),
			l.value.length > 0 ? (u(), m("section", {
				key: 0,
				class: j(v(W).nsfwSection)
			}, [w("button", {
				type: "button",
				class: j(["tc-interactive", v(W).nsfwToggle]),
				"aria-expanded": d.value,
				onClick: t[2] ||= (e) => d.value = !d.value
			}, [P(R, {
				icon: d.value ? v(ne) : v(te),
				size: 14
			}, null, 8, ["icon"]), M(" " + O(v(n)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, Ue), d.value ? (u(), m("div", {
				key: 1,
				class: j(v(W).catalogList)
			}, [w("p", { class: j(v(W).nsfwNotice) }, O(v(n)("assets.vocabulary.nsfw_disclosure_hint")), 3), (u(!0), m(A, null, s(l.value, (e) => (u(), m("div", {
				key: e.package_id,
				class: j(v(W).catalogEntry)
			}, [w("div", { class: j(v(W).catalogEntryInfo) }, [w("span", { class: j(v(W).catalogEntryName) }, O(g(e)), 3), w("span", { class: j(["tc-tabular-nums", v(W).catalogEntryMeta]) }, O(v(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), P(z, {
				label: v(n)("assets.vocabulary.import_action"),
				icon: v(U),
				variant: "destructive",
				pending: _.value === e.package_id,
				onClick: () => void E(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (u(), m("p", {
				key: 0,
				class: j(v(W).nsfwNotice)
			}, O(v(n)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : x("", !0)
		], 2));
	}
}), Ge = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, Ke = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function qe(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(Ge)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var Je = ["aria-label"], Ye = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], Xe = ["id", "value"], Ze = "unmapped", Qe = "{{", $e = "}}", et = /* @__PURE__ */ N({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = T(), i = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], a = K("workflow", t.controller, () => i, () => n("errors.validation_required")), o = y(null), c = y([]);
		function l(e) {
			switch (e) {
				case "positive_prompt": return n("assets.workflow.target_positive_prompt");
				case "negative_prompt": return n("assets.workflow.target_negative_prompt");
				case "seed": return n("assets.workflow.target_seed");
				case "width": return n("assets.workflow.target_width");
				case "height": return n("assets.workflow.target_height");
				case "steps": return n("assets.workflow.target_steps");
			}
		}
		let d = D(() => [{
			value: Ze,
			label: n("assets.workflow.placeholder_unmapped")
		}, ...Ke.map((e) => ({
			value: e,
			label: l(e)
		}))]);
		function h() {
			let e = a.values.workflow_json;
			return typeof e == "string" ? e : "";
		}
		function g(e) {
			let t = e.placeholder_map, n = {};
			if (typeof t == "string") try {
				let e = JSON.parse(t);
				typeof e == "object" && e && (n = e);
			} catch {
				n = {};
			}
			c.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		f(() => a.editing_record.value, (e) => {
			e ? g(e.payload) : c.value = [];
		}, { immediate: !0 });
		function b() {
			let e = qe(h()), t = new Map(c.value.map((e) => [e.name, e.target]));
			c.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function C(e, t) {
			let n = c.value.find((t) => t.name === e);
			n && (n.target = t === Ze ? "" : t);
		}
		function E() {
			o.value?.click();
		}
		function k(e) {
			return `${Qe}${e}${$e}`;
		}
		async function M(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			a.open_create(), a.name.value = n.name.replace(/\.json$/iu, ""), a.values.workflow_json = r, c.value = qe(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function N() {
			let e = {};
			for (let t of c.value) e[t.name] = t.target;
			a.values.placeholder_map = JSON.stringify(e), await a.save();
		}
		let F = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, i) => (u(), m("div", null, [
			w("div", { class: j(v(W).workflowToolbarRow) }, [P(z, {
				label: v(n)("assets.workflow.import_action"),
				icon: v(oe),
				variant: "primary",
				onClick: E
			}, null, 8, ["label", "icon"]), w("input", {
				ref_key: "file_input",
				ref: o,
				class: j(v(W).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": v(n)("assets.workflow.import_action"),
				onChange: i[0] ||= (e) => void M(e)
			}, null, 42, Je)], 2),
			P(G, {
				records: e.records,
				"summary-fields": [],
				loading: e.loading,
				"search-label": v(n)("common.actions.search"),
				"search-placeholder": v(n)("common.actions.search"),
				"empty-title": v(n)("assets.workflow.empty_title"),
				"empty-description": v(n)("assets.workflow.empty_description"),
				"add-label": v(n)("assets.workflow.import_action"),
				"random-label": v(n)("assets.random_selection_action"),
				"reorder-hint": v(n)("assets.reorder_hint"),
				"edit-label": v(n)("assets.workflow.edit_action"),
				"delete-label": v(n)("common.actions.delete"),
				"delete-confirm-title": F,
				"delete-confirm-description": v(n)("assets.delete_confirm_description"),
				"confirm-label": v(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": v(n)("confirmations.destructive.default_cancel_action"),
				"move-up-label": v(n)("assets.move_up_action"),
				"move-down-label": v(n)("assets.move_down_action"),
				"drag-handle-label": v(n)("assets.drag_handle_label"),
				onAdd: E,
				onEdit: v(a).open_edit,
				onDelete: v(a).remove,
				onDeleteMany: i[1] ||= (e) => void v(a).remove_many(e),
				onReorder: v(a).reorder,
				onRandomSelect: v(a).random_select
			}, null, 8, [
				"records",
				"loading",
				"search-label",
				"search-placeholder",
				"empty-title",
				"empty-description",
				"add-label",
				"random-label",
				"reorder-hint",
				"edit-label",
				"delete-label",
				"delete-confirm-description",
				"confirm-label",
				"cancel-label",
				"move-up-label",
				"move-down-label",
				"drag-handle-label",
				"onEdit",
				"onDelete",
				"onReorder",
				"onRandomSelect"
			]),
			P(Y, {
				open: v(a).dialog_open.value,
				title: v(n)("assets.workflow.edit_action"),
				description: v(n)("assets.form_dialog_description"),
				"close-label": v(n)("common.actions.close"),
				"onUpdate:open": i[5] ||= (e) => {
					e || v(a).close_dialog();
				}
			}, {
				default: p(() => [w("form", {
					class: j(v(W).form),
					onSubmit: i[4] ||= _(() => void N(), ["prevent"])
				}, [
					P(X, {
						label: v(n)("common.labels.name"),
						error: v(a).name_error.value,
						required: ""
					}, {
						default: p(({ fieldId: e, describedBy: t, invalid: r }) => [w("input", {
							id: e,
							class: j(v(W).textInput),
							type: "text",
							placeholder: v(n)("common.labels.name"),
							value: v(a).name.value,
							"aria-describedby": t,
							"aria-invalid": r,
							onInput: i[2] ||= (e) => v(a).name.value = e.target.value
						}, null, 42, Ye)]),
						_: 1
					}, 8, ["label", "error"]),
					P(X, { label: v(n)("assets.workflow.json_label") }, {
						default: p(({ fieldId: e }) => [w("textarea", {
							id: e,
							class: j(v(W).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: h(),
							onInput: i[3] ||= (e) => v(a).values.workflow_json = e.target.value
						}, null, 42, Xe)]),
						_: 1
					}, 8, ["label"]),
					P(z, {
						label: v(n)("assets.workflow.placeholder_scan_action"),
						icon: v(_e),
						variant: "secondary",
						type: "button",
						onClick: b
					}, null, 8, ["label", "icon"]),
					c.value.length > 0 ? (u(), m("div", {
						key: 0,
						class: j(v(W).placeholderList)
					}, [(u(!0), m(A, null, s(c.value, (e) => (u(), m("div", {
						key: e.name,
						class: j(v(W).placeholderRow)
					}, [w("span", { class: j(v(W).placeholderKey) }, O(k(e.name)), 3), (u(), S(V, {
						key: v(r),
						"model-value": e.target === "" ? Ze : e.target,
						options: d.value,
						placeholder: v(n)("assets.workflow.placeholder_unmapped"),
						ariaLabel: e.name,
						"onUpdate:modelValue": (t) => C(e.name, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128))], 2)) : x("", !0),
					w("div", { class: j(v(W).formActions) }, [P(z, {
						label: v(n)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: v(a).close_dialog
					}, null, 8, ["label", "onClick"]), P(z, {
						label: v(n)("common.actions.save"),
						variant: "primary",
						type: "submit",
						pending: v(a).saving.value
					}, null, 8, ["label", "pending"])], 2)
				], 34)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			])
		]));
	}
}), tt = /* @__PURE__ */ N({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = T(), i = /* @__PURE__ */ new Set([
			"character",
			"outfit",
			"lora",
			"vibe",
			"workflow"
		]), a = y(t.state.assets.active_category), o = y(!1);
		function s(e) {
			a.value = e, i.has(e) && t.controller.set_active_asset_category(e);
		}
		let c = D(() => t.state.loading.has("assets")), l = D(() => t.state.loading.has("vocabulary")), d = D(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (u(), m("div", { class: j(v(W).assetsView) }, [P(v(be), {
			"model-value": a.value,
			"onUpdate:modelValue": s
		}, {
			default: p(() => [
				P(v(Ce), {
					class: j(v(W).tabsList),
					"aria-label": v(n)("nav.assets")
				}, {
					default: p(() => [
						P(v($), {
							value: "vocabulary",
							class: j(v(W).tabsTrigger)
						}, {
							default: p(() => [M(O(v(n)("assets.tabs.vocabulary")), 1)]),
							_: 1
						}, 8, ["class"]),
						P(v($), {
							value: "character",
							class: j(v(W).tabsTrigger)
						}, {
							default: p(() => [M(O(v(n)("assets.tabs.characters")), 1)]),
							_: 1
						}, 8, ["class"]),
						P(v($), {
							value: "outfit",
							class: j(v(W).tabsTrigger)
						}, {
							default: p(() => [M(O(v(n)("assets.tabs.outfits")), 1)]),
							_: 1
						}, 8, ["class"]),
						P(v($), {
							value: "lora",
							class: j(v(W).tabsTrigger)
						}, {
							default: p(() => [M(O(v(n)("assets.tabs.lora")), 1)]),
							_: 1
						}, 8, ["class"]),
						P(v($), {
							value: "vibe",
							class: j(v(W).tabsTrigger)
						}, {
							default: p(() => [M(O(v(n)("assets.tabs.vibe")), 1)]),
							_: 1
						}, 8, ["class"]),
						P(v($), {
							value: "workflow",
							class: j(v(W).tabsTrigger)
						}, {
							default: p(() => [M(O(v(n)("assets.tabs.workflow")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					_: 1
				}, 8, ["class", "aria-label"]),
				P(v(Q), {
					value: "vocabulary",
					class: j(v(W).tabsContent)
				}, {
					default: p(() => [P(We, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						loading: l.value,
						controller: e.controller,
						locale: d.value
					}, null, 8, [
						"catalog",
						"install-command",
						"loading",
						"controller",
						"locale"
					])]),
					_: 1
				}, 8, ["class"]),
				P(v(Q), {
					value: "character",
					class: j(v(W).tabsContent)
				}, {
					default: p(() => [P(pe, {
						modelValue: o.value,
						"onUpdate:modelValue": r[0] ||= (e) => o.value = e,
						label: v(n)("assets.show_all_chats_label")
					}, null, 8, ["modelValue", "label"]), P(Ne, {
						records: e.state.assets.records.character,
						"outfit-records": e.state.assets.records.outfit,
						loading: c.value,
						controller: e.controller,
						"show-all-chats": o.value
					}, null, 8, [
						"records",
						"outfit-records",
						"loading",
						"controller",
						"show-all-chats"
					])]),
					_: 1
				}, 8, ["class"]),
				P(v(Q), {
					value: "outfit",
					class: j(v(W).tabsContent)
				}, {
					default: p(() => [P(pe, {
						modelValue: o.value,
						"onUpdate:modelValue": r[1] ||= (e) => o.value = e,
						label: v(n)("assets.show_all_chats_label")
					}, null, 8, ["modelValue", "label"]), P(Fe, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: c.value,
						controller: e.controller,
						"show-all-chats": o.value
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller",
						"show-all-chats"
					])]),
					_: 1
				}, 8, ["class"]),
				P(v(Q), {
					value: "lora",
					class: j(v(W).tabsContent)
				}, {
					default: p(() => [P(Pe, {
						records: e.state.assets.records.lora,
						"character-records": e.state.assets.records.character,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				P(v(Q), {
					value: "vibe",
					class: j(v(W).tabsContent)
				}, {
					default: p(() => [P(Be, {
						records: e.state.assets.records.vibe,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				P(v(Q), {
					value: "workflow",
					class: j(v(W).tabsContent)
				}, {
					default: p(() => [P(et, {
						records: e.state.assets.records.workflow,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"])
			]),
			_: 1
		}, 8, ["model-value"])], 2));
	}
});
//#endregion
export { tt as default };
