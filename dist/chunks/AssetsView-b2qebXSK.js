import { a as e, i as t, n, o as r, s as i } from "./wardrobe_library-D08dVzPC.js";
import { F as a, J as o, L as s, M as c, O as l, R as u, T as d, W as f, _ as p, a as m, at as h, c as g, ct as _, dt as v, g as y, gt as b, h as x, ht as S, j as C, k as w, m as T, n as E, p as D, pt as O, q as k, rt as A, s as j, u as M, v as N, x as P, y as F } from "./vue-i18n-XoxYzLIP.js";
import { r as ee, t as I } from "./portal_keys-DthxrmWp.js";
import { n as L, t as R } from "./AppIcon-DD754F_c.js";
import { n as z, t as te } from "./StateSurface-C9eJEtTP.js";
import { n as ne, t as B } from "./AppSelect-DKz1dWBv.js";
import { n as re, t as V } from "./download-Dg_p_zFU.js";
import { t as H } from "./image-plus-BCbJI3Bj.js";
import { n as U, r as W, t as G } from "./AppCheckbox-mwSAcdjr.js";
import { t as K } from "./FieldGroup-D8VsaFMT.js";
import { t as q } from "./scan-search-BFExP56Z.js";
import { a as J, i as Y, n as X, r as Z, t as ie } from "./use_asset_category_panel-CtwslIhi.js";
import { t as ae } from "./upload-CkFV9HPm.js";
import { t as oe } from "./x-CyHrRl6n.js";
import { t as se } from "./_prop_utils-CvImpN6J.js";
import { P as ce, S as le, f as Q, l as ue, s as de, u as fe } from "./Teleport-zHbQRGnp.js";
import { n as pe } from "./NumberStepper-BUxNPDyt.js";
import { c as me } from "./AppTooltip-CmgWxKYL.js";
import { t as he } from "./IconButton-CPI-A0bT.js";
import { t as ge } from "./ConfirmDialog-BMpZdMGH.js";
import { t as _e } from "./AppSwitch-CRj_joeq.js";
import { t as ve } from "./ZoomableImage-hCp3JCgd.js";
import { n as ye } from "./reference_image-B8V-aXPW.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/chevron-up.js
var be = L("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), [xe, Se] = /*#__PURE__*/ ce("TabsRoot"), Ce = /* @__PURE__ */ P({
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
		let n = e, r = t, { orientation: i, unmountOnHide: o, dir: s } = _(n), c = me(s);
		Q();
		let l = le(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), d = A(), f = h(/* @__PURE__ */ new Set());
		return Se({
			modelValue: l,
			changeModelValue: (e) => {
				l.value = e;
			},
			orientation: i,
			dir: c,
			unmountOnHide: o,
			activationMode: n.activationMode,
			baseId: fe(void 0, "reka-tabs"),
			tabsList: d,
			contentIds: f,
			registerContent: (e) => {
				f.value = /* @__PURE__ */ new Set([...f.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(f.value);
				t.delete(e), f.value = t;
			}
		}), (e, t) => (a(), x(v(de), {
			dir: v(c),
			"data-orientation": v(i),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: k(() => [u(e.$slots, "default", { modelValue: v(l) })]),
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
function we(e, t) {
	return `${e}-trigger-${t}`;
}
function Te(e, t) {
	return `${e}-content-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var $ = /* @__PURE__ */ P({
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
		let t = e, { forwardRef: n } = Q(), r = xe(), i = D(() => we(r.baseId, t.value)), o = D(() => Te(r.baseId, t.value)), s = D(() => t.value === r.modelValue.value), l = A(s.value);
		return c(() => {
			r.registerContent(t.value), requestAnimationFrame(() => {
				l.value = !1;
			});
		}), C(() => {
			r.unregisterContent(t.value);
		}), (e, t) => (a(), x(v(ue), {
			present: e.forceMount || s.value,
			"force-mount": ""
		}, {
			default: k(({ present: t }) => [F(v(de), {
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
				style: S({ animationDuration: l.value ? "0s" : void 0 })
			}, {
				default: k(() => [!v(r).unmountOnHide.value || t ? u(e.$slots, "default", { key: 0 }) : y("v-if", !0)]),
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
}), Ee = /* @__PURE__ */ P({
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
		let { loop: t } = _(e), { forwardRef: n, currentElement: r } = Q(), i = xe();
		return i.tabsList = r, (e, r) => (a(), x(v(W), {
			"as-child": "",
			orientation: v(i).orientation.value,
			dir: v(i).dir.value,
			loop: v(t)
		}, {
			default: k(() => [F(v(de), {
				ref: v(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": v(i).orientation.value
			}, {
				default: k(() => [u(e.$slots, "default")]),
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
}), De = /* @__PURE__ */ P({
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
		let t = e, { forwardRef: n } = Q(), r = xe(), i = D(() => we(r.baseId, t.value)), o = D(() => r.contentIds.value.has(t.value) ? Te(r.baseId, t.value) : void 0), s = D(() => t.value === r.modelValue.value);
		return (e, t) => (a(), x(v(U), {
			"as-child": "",
			focusable: !e.disabled,
			active: s.value
		}, {
			default: k(() => [F(v(de), {
				id: i.value,
				ref: v(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": s.value ? "true" : "false",
				"aria-controls": o.value,
				"data-state": s.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": v(r).orientation.value,
				onMousedown: t[0] ||= g((t) => {
					!e.disabled && t.ctrlKey === !1 ? v(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= j((t) => v(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = v(r).activationMode !== "manual";
					!s.value && !e.disabled && t && v(r).changeModelValue(e.value);
				}
			}, {
				default: k(() => [u(e.$slots, "default")]),
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
}), Oe = ["aria-label"], ke = ["data-empty"], Ae = ["src"], je = /* @__PURE__ */ P({
	__name: "AssetEditorPanel",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {},
		thumbnail: { default: void 0 }
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = A(null);
		return f(() => n.open, async (e) => {
			e && (await w(), i.value?.focus({ preventScroll: !0 }), i.value?.scrollIntoView({ block: "nearest" }));
		}), (t, n) => e.open ? (a(), p("aside", {
			key: 0,
			ref_key: "root",
			ref: i,
			class: O(v(J).editor),
			"aria-label": e.title,
			tabindex: "-1",
			"data-testid": "asset-editor",
			onKeydown: n[1] ||= j((e) => r("update:open", !1), ["esc"])
		}, [T("header", { class: O(v(J).editorHead) }, [
			e.thumbnail === void 0 ? y("", !0) : (a(), p("span", {
				key: 0,
				class: O(v(J).editorThumb),
				"data-empty": e.thumbnail === null ? "" : void 0
			}, [e.thumbnail === null ? y("", !0) : (a(), p("img", {
				key: 0,
				src: e.thumbnail,
				alt: ""
			}, null, 8, Ae))], 10, ke)),
			T("div", { class: O(v(J).editorHeading) }, [T("h3", { class: O(v(J).editorTitle) }, b(e.title), 3), T("p", { class: O(v(J).editorDescription) }, b(e.description), 3)], 2),
			F(he, {
				icon: v(oe),
				label: e.closeLabel,
				onClick: n[0] ||= (e) => r("update:open", !1)
			}, null, 8, ["icon", "label"])
		], 2), T("div", { class: O(v(J).editorBody) }, [u(t.$slots, "default")], 2)], 42, Oe)) : y("", !0);
	}
});
//#endregion
//#region src/ui/views/assets/chat_scope.ts
function Me(e, t, n = () => !1) {
	let r = d(I, A(null));
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
var Ne = ["id"], Pe = ["id"], Fe = /* @__PURE__ */ P({
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
		let n = e, r = t, { t: i } = E(), s = d(ee, null), c = A(null), l = A(null), u = A(!1), f = A(!1), h = A(""), g = A(""), _ = D(() => [
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
		async function S(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", n === void 0) return;
			l.value = null;
			let a;
			try {
				a = await ye(n);
			} catch {
				l.value = i("assets.characters.reference_image_unreadable");
				return;
			}
			r("update:image", a), r("uploaded", a);
		}
		function C() {
			h.value = n.defaultPrompt.positive_prompt, g.value = n.defaultPrompt.negative_prompt, l.value = null, u.value = !0;
		}
		async function w() {
			if (s !== null) {
				f.value = !0, l.value = null;
				try {
					let e = await s.generate({
						positive_prompt: h.value,
						negative_prompt: g.value
					}), t = await ye(e);
					r("update:image", t), r("generated", t), u.value = !1;
				} catch (e) {
					l.value = i("assets.characters.reference_generate_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					f.value = !1;
				}
			}
		}
		return (t, n) => (a(), p(M, null, [
			F(K, {
				label: v(i)("assets.characters.reference_image_label"),
				hint: v(i)("assets.characters.reference_image_hint"),
				error: l.value
			}, {
				default: k(() => [T("div", { class: O(v(J).reference) }, [e.image === null ? y("", !0) : (a(), x(ve, {
					key: 0,
					src: e.image,
					alt: v(i)("assets.characters.reference_image_label"),
					"image-class": v(J).reference_thumbnail
				}, null, 8, [
					"src",
					"alt",
					"image-class"
				])), T("div", { class: O(v(J).reference_actions) }, [
					T("input", {
						ref_key: "file_input",
						ref: c,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						hidden: "",
						"data-testid": "character-reference-input",
						onChange: S
					}, null, 544),
					F(z, {
						label: v(i)("assets.characters.reference_upload"),
						onClick: n[0] ||= (e) => c.value?.click()
					}, null, 8, ["label"]),
					v(s) === null ? y("", !0) : (a(), x(z, {
						key: 0,
						label: v(i)("assets.characters.reference_generate"),
						disabled: u.value,
						"data-testid": "character-reference-generate",
						onClick: C
					}, null, 8, ["label", "disabled"])),
					e.image === null ? y("", !0) : (a(), x(z, {
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
			u.value ? (a(), p("div", {
				key: 0,
				class: O(v(J).reference_composer)
			}, [
				T("p", { class: O(v(J).chat_scope_note) }, b(v(i)("assets.characters.reference_generate_hint")), 3),
				F(K, { label: v(i)("assets.characters.reference_prompt_label") }, {
					default: k(({ fieldId: e }) => [o(T("textarea", {
						id: e,
						"onUpdate:modelValue": n[2] ||= (e) => h.value = e,
						class: O(v(J).textArea)
					}, null, 10, Ne), [[m, h.value]])]),
					_: 1
				}, 8, ["label"]),
				F(K, { label: v(i)("assets.characters.reference_negative_label") }, {
					default: k(({ fieldId: e }) => [o(T("textarea", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => g.value = e,
						class: O(v(J).textArea)
					}, null, 10, Pe), [[m, g.value]])]),
					_: 1
				}, 8, ["label"]),
				T("div", { class: O(v(J).reference_actions) }, [F(z, {
					label: v(i)("common.actions.cancel"),
					onClick: n[4] ||= (e) => u.value = !1
				}, null, 8, ["label"]), F(z, {
					label: e.image === null ? v(i)("assets.characters.reference_generate_submit") : v(i)("assets.characters.reference_regenerate_submit"),
					variant: "primary",
					pending: f.value,
					"data-testid": "character-reference-submit",
					onClick: w
				}, null, 8, ["label", "pending"])], 2)
			], 2)) : y("", !0),
			e.image === null ? y("", !0) : (a(), p(M, { key: 1 }, [F(G, {
				"model-value": e.send,
				label: v(i)("assets.characters.reference_send_label"),
				"onUpdate:modelValue": n[5] ||= (e) => r("update:send", e)
			}, null, 8, ["model-value", "label"]), F(K, {
				label: v(i)("assets.characters.reference_mode_label"),
				hint: v(i)("assets.characters.reference_mode_hint")
			}, {
				default: k(() => [F(pe, {
					"model-value": e.mode,
					options: _.value,
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
function Ie(e, t) {
	switch (t) {
		case "character": return e("assets.characters.appearance.character");
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
function Le(e, t) {
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
var Re = ["data-editing"], ze = "none", Be = "solo, full body, standing, looking at viewer, simple background, white background", Ve = /* @__PURE__ */ P({
	__name: "CharacterPanel",
	props: {
		records: {},
		outfitRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(o) {
		let s = o, { t: c } = E(), { visible: u } = Me(() => s.records, () => ({
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
				label: Ie(c, e),
				kind: "tags",
				...e === "character" ? { hint: c("assets.characters.character_tag_hint") } : {}
			})),
			{
				key: "excluded_traits",
				label: c("assets.characters.excluded_traits_label"),
				kind: "tags",
				hint: c("assets.characters.excluded_traits_hint")
			}
		]), m = D(() => [{
			key: "scope_label",
			label: c("assets.scope_label")
		}]), h = X("character", s.controller, () => f.value, () => c("errors.validation_required"), [
			"subject",
			"default_outfit_id",
			"reference_image",
			"reference_send",
			"reference_mode",
			"origin",
			"locked_fields",
			"chat_id",
			"created_from_message_id"
		], { reference_image: "reference_thumbnail" }), g = D(() => [
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
		]), _ = D(() => h.values.subject === "boy" || h.values.subject === "other" ? h.values.subject : "girl"), x = D(() => {
			let e = h.record_id.value;
			return [{
				value: ze,
				label: c("assets.characters.default_outfit_first")
			}, ...s.outfitRecords.filter((t) => {
				let n = t.payload.character_id;
				return typeof n != "string" || n === "" || n === e;
			}).map((e) => ({
				value: e.id,
				label: e.display_name
			}))];
		}), S = D(() => typeof h.values.default_outfit_id == "string" && h.values.default_outfit_id !== "" ? h.values.default_outfit_id : ze), C = D(() => typeof h.values.chat_id == "string" && h.values.chat_id !== ""), w = D(() => typeof h.values.reference_image == "string" && h.values.reference_image !== "" ? h.values.reference_image : null), j = D(() => h.values.reference_mode === "img2img" || h.values.reference_mode === "precise" ? h.values.reference_mode : "vibe");
		function M(e) {
			if (e === null) {
				for (let e of [
					"reference_image",
					"reference_send",
					"reference_mode"
				]) Reflect.deleteProperty(h.values, e);
				return;
			}
			h.values.reference_image = e, h.values.reference_mode = j.value;
		}
		let P = d(ee, null), I = A(null), L = A(!1), R = A(null);
		function te(e) {
			s.outfitRecords.some((e) => e.payload.character_id === h.record_id.value) || (I.value = e);
		}
		async function ne(e) {
			let t = crypto.randomUUID();
			await s.controller.save_asset("outfit", {
				id: t,
				category: "outfit",
				record_key: t,
				display_name: e.name,
				payload: {
					...Object.fromEntries(i.map((t) => [t, n(e.slots[t] ?? [])])),
					character_id: h.record_id.value,
					origin: "analysis",
					chat_id: typeof h.values.chat_id == "string" ? h.values.chat_id : ""
				}
			}), h.values.default_outfit_id = t;
		}
		async function re() {
			let e = I.value;
			if (e !== null && P !== null) {
				L.value = !0, R.value = null;
				try {
					await ne(await P.read_outfit(e));
				} catch (e) {
					R.value = c("assets.characters.outfit_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					L.value = !1, I.value = null;
				}
			}
		}
		let V = A(null), H = A(!1);
		function U(e) {
			P !== null && (V.value = e);
		}
		async function W() {
			let t = V.value;
			if (t !== null && P !== null) {
				H.value = !0, R.value = null;
				try {
					let i = await P.read_character(t);
					for (let t of r) {
						let r = i.appearance[t];
						r !== void 0 && e(h.values[t]).length === 0 && (h.values[t] = n(r));
					}
					h.values.subject !== "girl" && h.values.subject !== "boy" && (h.values.subject = i.subject), i.outfit !== null && await ne(i.outfit);
				} catch (e) {
					R.value = c("assets.characters.character_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					H.value = !1, V.value = null;
				}
			}
		}
		let G = {
			girl: "1girl",
			boy: "1boy",
			other: ""
		};
		function q(e, t) {
			let n = e.payload[t];
			return typeof n == "string" ? n : "";
		}
		function ae(e) {
			return c(e === "boy" ? "assets.characters.subject_boy" : e === "other" ? "assets.characters.subject_other" : "assets.characters.subject_girl");
		}
		function oe(t) {
			let n = q(t, "reference_thumbnail") || q(t, "reference_image");
			return {
				thumbnail: n === "" ? null : n,
				subtitle: ae(q(t, "subject")),
				detail: [e(q(t, "aliases")).join("、"), q(t, "scope_label")].filter((e) => e !== "").join(" · "),
				tags: r.flatMap((n) => e(q(t, n)))
			};
		}
		let ce = D(() => {
			let e = h.record_id.value, n = s.outfitRecords.map(t), r = n.find((e) => e.id === h.values.default_outfit_id) ?? n.find((t) => t.character_id === e);
			return r === void 0 ? [] : i.flatMap((e) => r.slots[e]);
		}), le = D(() => ({
			positive_prompt: n([
				G[_.value],
				Be,
				...r.flatMap((t) => e(h.values[t])),
				...ce.value
			].filter((e) => e !== "")),
			negative_prompt: n(e(h.values.excluded_traits))
		}));
		async function Q() {
			let t = h.editing_record.value?.payload ?? {}, n = r.filter((n) => e(h.values[n]).join(",") !== e(typeof t[n] == "string" ? t[n] : "").join(",")), i = /* @__PURE__ */ new Set([...e(h.values.locked_fields), ...n]);
			h.values.locked_fields = [...i].join(", "), h.values.origin = typeof h.values.origin == "string" ? h.values.origin : "user", await h.save();
		}
		async function ue() {
			h.values.chat_id = "", await Q();
		}
		return (e, t) => (a(), p("div", {
			class: O(v(J).assetsBody),
			"data-editing": v(h).dialog_open.value ? "" : void 0
		}, [
			T("div", { class: O(v(J).assetsMain) }, [F(Y, {
				"active-id": v(h).dialog_open.value ? v(h).record_id.value : null,
				describe: oe,
				records: v(u),
				"summary-fields": m.value,
				loading: o.loading,
				"search-label": v(c)("common.actions.search"),
				"search-placeholder": v(c)("common.actions.search"),
				"empty-title": v(c)("assets.characters.empty_title"),
				"empty-description": v(c)("assets.characters.empty_description"),
				"add-label": v(c)("assets.characters.add_action"),
				"random-label": v(c)("assets.random_selection_action"),
				"reorder-hint": v(c)("assets.reorder_hint"),
				"edit-label": v(c)("common.actions.edit"),
				"delete-confirm-description": v(c)("assets.delete_confirm_description"),
				"confirm-label": v(c)("confirmations.destructive.default_confirm_action"),
				"cancel-label": v(c)("confirmations.destructive.default_cancel_action"),
				onAdd: v(h).open_create,
				onEdit: v(h).open_edit,
				onDeleteMany: t[0] ||= (e) => void v(h).remove_many(e),
				onReorder: v(h).reorder,
				onRandomSelect: v(h).random_select
			}, null, 8, [
				"active-id",
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
				"delete-confirm-description",
				"confirm-label",
				"cancel-label",
				"onAdd",
				"onEdit",
				"onReorder",
				"onRandomSelect"
			])], 2),
			F(je, {
				open: v(h).dialog_open.value,
				title: v(h).editing_record.value ? v(h).editing_record.value.display_name : v(c)("assets.characters.add_action"),
				description: v(h).editing_record.value ? v(c)("assets.characters.editor_description", { name: v(h).editing_record.value.display_name }) : v(c)("assets.form_dialog_description"),
				thumbnail: v(h).thumbnail("reference_image"),
				"close-label": v(c)("common.actions.close"),
				"onUpdate:open": t[7] ||= (e) => {
					e || v(h).close_dialog();
				}
			}, {
				default: k(() => [F(Z, {
					"name-label": v(c)("common.labels.name"),
					"name-placeholder": v(c)("common.labels.name"),
					name: v(h).name.value,
					"name-error": v(h).name_error.value,
					"save-error": v(h).save_error.value,
					fields: f.value,
					values: v(h).values,
					"save-label": v(c)("common.actions.save"),
					"cancel-label": v(c)("common.actions.cancel"),
					"decrement-label": v(c)("common.actions.decrease"),
					"increment-label": v(c)("common.actions.increase"),
					pending: v(h).saving.value,
					"onUpdate:name": t[5] ||= (e) => {
						v(h).name.value = e;
					},
					"onUpdate:values": t[6] ||= (e) => v(ie)(v(h).values, e),
					onSave: Q,
					onCancel: v(h).close_dialog
				}, {
					"leading-fields": k(() => [
						F(Fe, {
							image: w.value,
							send: v(h).values.reference_send === 1,
							mode: j.value,
							"default-prompt": le.value,
							"onUpdate:image": M,
							"onUpdate:send": t[1] ||= (e) => v(h).values.reference_send = +!!e,
							"onUpdate:mode": t[2] ||= (e) => v(h).values.reference_mode = e,
							onGenerated: te,
							onUploaded: U
						}, null, 8, [
							"image",
							"send",
							"mode",
							"default-prompt"
						]),
						R.value === null ? y("", !0) : (a(), p("p", {
							key: 0,
							class: O(v(J).formError),
							role: "alert"
						}, b(R.value), 3)),
						F(K, { label: v(c)("assets.characters.subject_label") }, {
							default: k(() => [F(pe, {
								"model-value": _.value,
								options: g.value,
								label: v(c)("assets.characters.subject_label"),
								"onUpdate:modelValue": t[3] ||= (e) => v(h).values.subject = e
							}, null, 8, [
								"model-value",
								"options",
								"label"
							])]),
							_: 1
						}, 8, ["label"])
					]),
					"extra-fields": k(() => [C.value ? (a(), p("p", {
						key: 0,
						class: O(v(J).chat_scope_note)
					}, [N(b(v(c)("assets.chat_scope_note")) + " ", 1), F(z, {
						label: v(c)("assets.import_to_global_action"),
						"data-testid": "import-to-global",
						onClick: ue
					}, null, 8, ["label"])], 2)) : y("", !0), F(K, { label: v(c)("assets.characters.default_outfit_label") }, {
						default: k(({ fieldId: e, describedBy: n }) => [F(B, l({
							id: e,
							"model-value": S.value,
							options: x.value,
							placeholder: v(c)("assets.characters.default_outfit_label")
						}, v(se)({ describedBy: n }), { "onUpdate:modelValue": t[4] ||= (e) => v(h).values.default_outfit_id = e === ze ? "" : e }), null, 16, [
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
					"onCancel"
				])]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"thumbnail",
				"close-label"
			]),
			F(ge, {
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
				onConfirm: re
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			F(ge, {
				open: V.value !== null,
				title: v(c)("assets.characters.character_from_reference_title"),
				description: v(c)("assets.characters.character_from_reference_description"),
				"confirm-label": v(c)("assets.characters.character_from_reference_confirm"),
				"cancel-label": v(c)("assets.characters.character_from_reference_cancel"),
				pending: H.value,
				destructive: !1,
				"onUpdate:open": t[9] ||= (e) => {
					!e && !H.value && (V.value = null);
				},
				onConfirm: W
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 10, Re));
	}
}), He = ["data-editing"], Ue = /* @__PURE__ */ P({
	__name: "LoraPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = D(() => [
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
		], o = X("lora", t.controller, () => r.value, () => n("errors.validation_required"), ["character_id"]);
		function s() {
			o.open_create(), o.values.weight = 1;
		}
		let c = D(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), u = D(() => {
			let e = o.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		return (t, d) => (a(), p("div", {
			class: O(v(J).assetsBody),
			"data-editing": v(o).dialog_open.value ? "" : void 0
		}, [T("div", { class: O(v(J).assetsMain) }, [F(Y, {
			"active-id": v(o).dialog_open.value ? v(o).record_id.value : null,
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
			"delete-confirm-description": v(n)("assets.delete_confirm_description"),
			"confirm-label": v(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": v(n)("confirmations.destructive.default_cancel_action"),
			onAdd: s,
			onEdit: v(o).open_edit,
			onDeleteMany: d[0] ||= (e) => void v(o).remove_many(e),
			onReorder: v(o).reorder,
			onRandomSelect: v(o).random_select
		}, null, 8, [
			"active-id",
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
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"onEdit",
			"onReorder",
			"onRandomSelect"
		])], 2), F(je, {
			open: v(o).dialog_open.value,
			title: v(o).editing_record.value ? v(o).editing_record.value.display_name : v(n)("assets.lora.add_action"),
			description: v(n)("assets.form_dialog_description"),
			"close-label": v(n)("common.actions.close"),
			"onUpdate:open": d[4] ||= (e) => {
				e || v(o).close_dialog();
			}
		}, {
			default: k(() => [F(Z, {
				"name-label": v(n)("common.labels.name"),
				"name-placeholder": v(n)("common.labels.name"),
				name: v(o).name.value,
				"name-error": v(o).name_error.value,
				"save-error": v(o).save_error.value,
				fields: r.value,
				values: v(o).values,
				"save-label": v(n)("common.actions.save"),
				"cancel-label": v(n)("common.actions.cancel"),
				"decrement-label": v(n)("common.actions.decrease"),
				"increment-label": v(n)("common.actions.increase"),
				pending: v(o).saving.value,
				"onUpdate:name": d[2] ||= (e) => {
					v(o).name.value = e;
				},
				"onUpdate:values": d[3] ||= (e) => v(ie)(v(o).values, e),
				onSave: v(o).save,
				onCancel: v(o).close_dialog
			}, {
				"extra-fields": k(() => [F(K, {
					label: v(n)("assets.lora.character_label"),
					hint: v(n)("assets.lora.character_hint")
				}, {
					default: k(({ fieldId: e, describedBy: t }) => [F(B, l({
						id: e,
						"model-value": u.value,
						options: c.value,
						placeholder: v(n)("assets.lora.character_placeholder")
					}, v(se)({ describedBy: t }), { "onUpdate:modelValue": d[1] ||= (e) => v(o).values.character_id = e }), null, 16, [
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
		])], 10, He));
	}
}), We = /* @__PURE__ */ P({
	__name: "OutfitPreview",
	props: {
		image: {},
		prompt: { type: Function }
	},
	emits: ["update:image"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = E(), o = d(ee, null), s = A(!1), c = A(null);
		async function l() {
			if (o !== null) {
				s.value = !0, c.value = null;
				try {
					r("update:image", await ye(await o.generate(n.prompt())));
				} catch (e) {
					c.value = i("assets.outfits.preview_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					s.value = !1;
				}
			}
		}
		return (t, n) => v(o) !== null || e.image !== null ? (a(), x(K, {
			key: 0,
			label: v(i)("assets.outfits.preview_label"),
			hint: v(i)("assets.outfits.preview_hint"),
			error: c.value
		}, {
			default: k(() => [T("div", { class: O(v(J).reference) }, [e.image === null ? y("", !0) : (a(), x(ve, {
				key: 0,
				src: e.image,
				alt: v(i)("assets.outfits.preview_label"),
				"image-class": v(J).reference_thumbnail
			}, null, 8, [
				"src",
				"alt",
				"image-class"
			])), T("div", { class: O(v(J).reference_actions) }, [v(o) === null ? y("", !0) : (a(), x(z, {
				key: 0,
				label: e.image === null ? v(i)("assets.outfits.preview_generate") : v(i)("assets.outfits.preview_regenerate"),
				icon: v(H),
				pending: s.value,
				"data-testid": "outfit-preview-generate",
				onClick: l
			}, null, 8, [
				"label",
				"icon",
				"pending"
			])), e.image === null ? y("", !0) : (a(), x(z, {
				key: 1,
				label: v(i)("assets.outfits.preview_remove"),
				variant: "ghost",
				onClick: n[0] ||= (e) => r("update:image", null)
			}, null, 8, ["label"]))], 2)], 2)]),
			_: 1
		}, 8, [
			"label",
			"hint",
			"error"
		])) : y("", !0);
	}
}), Ge = ["data-editing"], Ke = "solo, full body, standing, simple background, white background", qe = /* @__PURE__ */ P({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(t) {
		let n = t, { t: r } = E(), o = D(() => i.map((e) => ({
			key: e,
			label: Le(r, e),
			kind: "tags"
		}))), s = D(() => [{
			key: "owner_label",
			label: r("assets.outfits.character_label")
		}, {
			key: "scope_label",
			label: r("assets.scope_label")
		}]), { visible: c } = Me(() => n.records, () => ({
			this_chat: r("assets.chat_scope_label"),
			other_chat: (e) => r("assets.other_chat_scope_label", { chat: e })
		}), () => n.showAllChats), u = D(() => c.value.map((e) => {
			let t = n.characterRecords.find((t) => t.id === e.payload.character_id);
			return t === void 0 ? e : {
				...e,
				payload: {
					...e.payload,
					owner_label: t.display_name
				}
			};
		}));
		function d(e, t) {
			let n = e.payload[t];
			return typeof n == "string" ? n : "";
		}
		function f(t) {
			let n = d(t, "preview_thumbnail") || d(t, "preview_image");
			return {
				thumbnail: n === "" ? null : n,
				subtitle: d(t, "owner_label"),
				detail: d(t, "scope_label"),
				tags: i.flatMap((n) => e(d(t, n)))
			};
		}
		let { visible: m } = Me(() => n.characterRecords, () => ({
			this_chat: r("assets.chat_scope_label"),
			other_chat: (e) => r("assets.other_chat_scope_label", { chat: e })
		})), h = X("outfit", n.controller, () => o.value, () => r("errors.validation_required"), [
			"character_id",
			"origin",
			"chat_id",
			"preview_image"
		], { preview_image: "preview_thumbnail" }), g = D(() => typeof h.values.preview_image == "string" && h.values.preview_image !== "" ? h.values.preview_image : null);
		function _(e) {
			e === null ? Reflect.deleteProperty(h.values, "preview_image") : h.values.preview_image = e;
		}
		let x = {
			girl: "1girl",
			boy: "1boy"
		};
		function S() {
			let t = n.characterRecords.find((e) => e.id === h.values.character_id);
			return {
				positive_prompt: [
					t === void 0 ? "" : x[String(t.payload.subject)] ?? "",
					Ke,
					...i.flatMap((t) => e(h.values[t]))
				].filter((e) => e !== "").join(", "),
				negative_prompt: ""
			};
		}
		let C = D(() => typeof h.values.chat_id == "string" && h.values.chat_id !== "");
		async function w() {
			h.values.chat_id = "", await h.save();
		}
		let A = D(() => m.value.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), j = D(() => {
			let e = h.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function M(e) {
			h.values.character_id = e;
		}
		return (e, n) => (a(), p("div", {
			class: O(v(J).assetsBody),
			"data-editing": v(h).dialog_open.value ? "" : void 0
		}, [T("div", { class: O(v(J).assetsMain) }, [F(Y, {
			"active-id": v(h).dialog_open.value ? v(h).record_id.value : null,
			describe: f,
			records: u.value,
			"summary-fields": s.value,
			loading: t.loading,
			"search-label": v(r)("common.actions.search"),
			"search-placeholder": v(r)("common.actions.search"),
			"empty-title": v(r)("assets.outfits.empty_title"),
			"empty-description": v(r)("assets.outfits.empty_description"),
			"add-label": v(r)("assets.outfits.add_action"),
			"random-label": v(r)("assets.random_selection_action"),
			"reorder-hint": v(r)("assets.reorder_hint"),
			"edit-label": v(r)("common.actions.edit"),
			"delete-confirm-description": v(r)("assets.delete_confirm_description"),
			"confirm-label": v(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": v(r)("confirmations.destructive.default_cancel_action"),
			onAdd: v(h).open_create,
			onEdit: v(h).open_edit,
			onDeleteMany: n[0] ||= (e) => void v(h).remove_many(e),
			onReorder: v(h).reorder,
			onRandomSelect: v(h).random_select
		}, null, 8, [
			"active-id",
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
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"onAdd",
			"onEdit",
			"onReorder",
			"onRandomSelect"
		])], 2), F(je, {
			open: v(h).dialog_open.value,
			title: v(h).editing_record.value ? v(h).editing_record.value.display_name : v(r)("assets.outfits.add_action"),
			description: v(r)("assets.form_dialog_description"),
			thumbnail: v(h).thumbnail("preview_image"),
			"close-label": v(r)("common.actions.close"),
			"onUpdate:open": n[3] ||= (e) => {
				e || v(h).close_dialog();
			}
		}, {
			default: k(() => [F(Z, {
				"name-label": v(r)("common.labels.name"),
				"name-placeholder": v(r)("common.labels.name"),
				name: v(h).name.value,
				"name-error": v(h).name_error.value,
				"save-error": v(h).save_error.value,
				fields: o.value,
				values: v(h).values,
				"save-label": v(r)("common.actions.save"),
				"cancel-label": v(r)("common.actions.cancel"),
				"decrement-label": v(r)("common.actions.decrease"),
				"increment-label": v(r)("common.actions.increase"),
				pending: v(h).saving.value,
				"onUpdate:name": n[1] ||= (e) => {
					v(h).name.value = e;
				},
				"onUpdate:values": n[2] ||= (e) => v(ie)(v(h).values, e),
				onSave: v(h).save,
				onCancel: v(h).close_dialog
			}, {
				"leading-fields": k(() => [F(We, {
					image: g.value,
					prompt: S,
					"onUpdate:image": _
				}, null, 8, ["image"])]),
				"extra-fields": k(() => [C.value ? (a(), p("p", {
					key: 0,
					class: O(v(J).chat_scope_note)
				}, [N(b(v(r)("assets.chat_scope_note")) + " ", 1), F(z, {
					label: v(r)("assets.import_to_global_action"),
					onClick: w
				}, null, 8, ["label"])], 2)) : y("", !0), F(K, { label: v(r)("assets.outfits.character_label") }, {
					default: k(({ fieldId: e, describedBy: t }) => [F(B, l({
						id: e,
						"model-value": j.value,
						options: A.value,
						placeholder: v(r)("assets.outfits.character_placeholder")
					}, v(se)({ describedBy: t }), { "onUpdate:modelValue": M }), null, 16, [
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
			"thumbnail",
			"close-label"
		])], 10, Ge));
	}
}), Je = ["data-editing"], Ye = ["id", "aria-describedby"], Xe = "novelai", Ze = "google", Qe = /* @__PURE__ */ P({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = D(() => [{
			value: Xe,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: Ze,
			label: n("assets.vibe.provider_google")
		}]), i = D(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return c.values.provider !== Ze && e.push({
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
		}), o = [{
			key: "strength",
			label: n("assets.vibe.strength_label"),
			numeric: !0
		}];
		function s(e) {
			let t = e.payload.image_thumbnail ?? e.payload.image, r = e.payload.strength;
			return {
				thumbnail: typeof t == "string" && t !== "" ? t : null,
				detail: typeof r == "number" ? `${n("assets.vibe.strength_label")} ${String(r)}` : ""
			};
		}
		let c = X("vibe", t.controller, () => i.value, () => n("errors.validation_required"), ["provider", "image"], { image: "image_thumbnail" }), l = A(null), u = D(() => typeof c.values.image == "string" && c.values.image !== "" ? c.values.image : null);
		async function d(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				l.value = null;
				try {
					c.values.image = await ye(t);
				} catch {
					l.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let f = D(() => typeof c.values.provider == "string" && c.values.provider !== "" ? c.values.provider : Xe);
		function m(e) {
			c.values.provider = e;
		}
		return (t, h) => (a(), p("div", {
			class: O(v(J).assetsBody),
			"data-editing": v(c).dialog_open.value ? "" : void 0
		}, [T("div", { class: O(v(J).assetsMain) }, [F(Y, {
			"active-id": v(c).dialog_open.value ? v(c).record_id.value : null,
			describe: s,
			records: e.records,
			"summary-fields": o,
			loading: e.loading,
			"search-label": v(n)("common.actions.search"),
			"search-placeholder": v(n)("common.actions.search"),
			"empty-title": v(n)("assets.vibe.empty_title"),
			"empty-description": v(n)("assets.vibe.empty_description"),
			"add-label": v(n)("assets.vibe.add_action"),
			"random-label": v(n)("assets.random_selection_action"),
			"reorder-hint": v(n)("assets.reorder_hint"),
			"edit-label": v(n)("common.actions.edit"),
			"delete-confirm-description": v(n)("assets.delete_confirm_description"),
			"confirm-label": v(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": v(n)("confirmations.destructive.default_cancel_action"),
			onAdd: v(c).open_create,
			onEdit: v(c).open_edit,
			onDeleteMany: h[0] ||= (e) => void v(c).remove_many(e),
			onReorder: v(c).reorder,
			onRandomSelect: v(c).random_select
		}, null, 8, [
			"active-id",
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
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"onAdd",
			"onEdit",
			"onReorder",
			"onRandomSelect"
		])], 2), F(je, {
			open: v(c).dialog_open.value,
			title: v(c).editing_record.value ? v(c).editing_record.value.display_name : v(n)("assets.vibe.add_action"),
			description: v(n)("assets.form_dialog_description"),
			"close-label": v(n)("common.actions.close"),
			"onUpdate:open": h[3] ||= (e) => {
				e || v(c).close_dialog();
			}
		}, {
			default: k(() => [F(Z, {
				"name-label": v(n)("common.labels.name"),
				"name-placeholder": v(n)("common.labels.name"),
				name: v(c).name.value,
				"name-error": v(c).name_error.value,
				"save-error": v(c).save_error.value,
				fields: i.value,
				values: v(c).values,
				"save-label": v(n)("common.actions.save"),
				"cancel-label": v(n)("common.actions.cancel"),
				"decrement-label": v(n)("common.actions.decrease"),
				"increment-label": v(n)("common.actions.increase"),
				pending: v(c).saving.value,
				"onUpdate:name": h[1] ||= (e) => {
					v(c).name.value = e;
				},
				"onUpdate:values": h[2] ||= (e) => v(ie)(v(c).values, e),
				onSave: v(c).save,
				onCancel: v(c).close_dialog
			}, {
				"extra-fields": k(() => [F(K, {
					label: v(n)("assets.vibe.image_label"),
					hint: v(n)("assets.vibe.image_hint"),
					error: l.value
				}, {
					default: k(({ fieldId: e, describedBy: t }) => [u.value === null ? y("", !0) : (a(), x(ve, {
						key: 0,
						src: u.value,
						alt: v(n)("assets.vibe.image_label"),
						"image-class": v(J).reference_thumbnail
					}, null, 8, [
						"src",
						"alt",
						"image-class"
					])), T("input", {
						id: e,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						"aria-describedby": t,
						"data-testid": "vibe-image-input",
						onChange: d
					}, null, 40, Ye)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), F(K, { label: v(n)("assets.vibe.provider_label") }, {
					default: k(() => [F(pe, {
						"model-value": f.value,
						options: r.value,
						label: v(n)("assets.vibe.provider_label"),
						"onUpdate:modelValue": m
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
		])], 10, Je));
	}
}), $e = { "data-testid": "vocabulary-installed" }, et = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, tt = ["placeholder"], nt = ["aria-expanded"], rt = /* @__PURE__ */ P({
	__name: "VocabularyPanel",
	props: {
		catalog: {},
		installCommand: {},
		loading: { type: Boolean },
		catalogFailure: {},
		controller: {},
		locale: {}
	},
	setup(e) {
		let t = e, { t: n } = E();
		function r(e, t) {
			switch (e) {
				case "catalog_url_missing": return n("assets.vocabulary.failures.catalog_url_missing");
				case "catalog_unauthorized": return n("assets.vocabulary.failures.catalog_unauthorized");
				case "catalog_not_found": return n("assets.vocabulary.failures.catalog_not_found");
				case "not_exposed": return n("assets.vocabulary.failures.not_exposed");
				case "manifest_fetch_failed": return n("assets.vocabulary.failures.manifest_fetch_failed");
				default: return n(t ? "assets.vocabulary.install_failed_code" : "assets.vocabulary.catalog_failed_code", { code: e });
			}
		}
		let i = A({ status: "loading" });
		async function l() {
			i.value = { status: "loading" };
			try {
				i.value = {
					status: "ready",
					package: await t.controller.load_installed_vocabulary()
				};
			} catch {
				i.value = { status: "failed" };
			}
		}
		c(() => {
			l();
		});
		let u = A(!1);
		function d() {
			u.value = !0, t.controller.load_vocabulary_catalog();
		}
		let h = /nsfw|adult|explicit/iu;
		function g(e) {
			return h.test(e.package_id) || h.test(e.display_name.en) || h.test(e.display_name["zh-CN"]);
		}
		let _ = D(() => t.catalog.filter((e) => !g(e))), S = D(() => t.catalog.filter((e) => g(e))), C = A(!1);
		function w(e) {
			return t.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let j = A(null), P = A(null);
		function ee(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return n("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return n("assets.vocabulary.progress_downloading");
				case "verifying_package": return n("assets.vocabulary.progress_verifying_package");
				case "installing": return n("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function I(e) {
			j.value === null && (j.value = e.package_id, P.value = null, await t.controller.install_vocabulary_package(e, (e) => {
				P.value = ee(e);
			}), j.value = null, P.value = null, t.controller.state.assets.vocabulary_install_command.status === "success" && (B.value = [], H.value = null, l(), L.value.trim() !== "" && await Y()));
		}
		let L = A(""), B = A([]), H = A(null), U = A(!1), W = A(!1), G = A(!1), K = A(null), q = null;
		async function Y() {
			let e = L.value.trim();
			if (e === "") {
				B.value = [], H.value = null;
				return;
			}
			U.value = !0, W.value = !1;
			try {
				let n = await t.controller.search_vocabulary(e);
				B.value = n.results, H.value = n.next_cursor;
			} catch {
				B.value = [], H.value = null, W.value = !0;
			} finally {
				U.value = !1;
			}
		}
		async function X() {
			if (H.value !== null) {
				G.value = !0;
				try {
					let e = await t.controller.load_more_vocabulary(H.value);
					B.value = [...B.value, ...e.results], H.value = e.next_cursor;
				} finally {
					G.value = !1;
				}
			}
		}
		f(L, () => {
			q !== null && clearTimeout(q), q = setTimeout(() => {
				Y();
			}, 250);
		});
		async function Z(e) {
			await navigator.clipboard.writeText(e.display_text), K.value = e.record_id, setTimeout(() => {
				K.value === e.record_id && (K.value = null);
			}, 2e3);
		}
		let ie = D(() => t.loading ? "loading" : t.catalogFailure === null ? t.catalog.length === 0 ? "empty" : "ready" : "error"), ae = D(() => U.value && B.value.length === 0 ? "loading" : W.value ? "error" : L.value.trim() === "" || B.value.length > 0 ? "ready" : "empty");
		return (t, c) => (a(), p("div", { class: O(v(J).vocabularyPanel) }, [
			T("section", $e, [T("p", { class: O(v(J).sectionTitle) }, b(v(n)("assets.vocabulary.installed_title")), 3), i.value.status === "loading" ? (a(), p("p", {
				key: 0,
				class: O(v(J).catalogEntryMeta)
			}, b(v(n)("assets.vocabulary.installed_preparing")), 3)) : i.value.status === "failed" ? (a(), p("p", {
				key: 1,
				class: O(v(J).catalogEntryMeta)
			}, b(v(n)("assets.vocabulary.installed_failed")), 3)) : i.value.package === null ? (a(), p("p", {
				key: 2,
				class: O(v(J).catalogEntryMeta)
			}, b(v(n)("assets.vocabulary.installed_none")), 3)) : (a(), p("div", {
				key: 3,
				class: O(v(J).catalogEntry)
			}, [T("div", { class: O(v(J).catalogEntryInfo) }, [T("span", { class: O(v(J).catalogEntryName) }, b(i.value.package.package_id), 3), T("span", { class: O(["tc-tabular-nums", v(J).catalogEntryMeta]) }, b(i.value.package.data_version) + " · " + b(v(n)("assets.vocabulary.tag_count", i.value.package.record_count)), 3)], 2)], 2))]),
			T("section", null, [
				T("p", { class: O(v(J).sectionTitle) }, b(v(n)("assets.vocabulary.search_placeholder")), 3),
				T("div", { class: O(v(J).vocabularySearchRow) }, [T("label", et, b(v(n)("assets.vocabulary.search_placeholder")), 1), o(T("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": c[0] ||= (e) => L.value = e,
					type: "text",
					class: O(v(J).searchInput),
					placeholder: v(n)("assets.vocabulary.search_placeholder")
				}, null, 10, tt), [[m, L.value]])], 2),
				F(te, {
					status: ae.value,
					"empty-title": v(n)("assets.vocabulary.no_results_title"),
					"empty-message": v(n)("assets.vocabulary.no_results_description"),
					"error-message": v(n)("assets.vocabulary.search_failed"),
					"min-height": "60px"
				}, {
					default: k(() => [B.value.length > 0 ? (a(), p("ul", {
						key: 0,
						class: O(v(J).searchResultsList)
					}, [(a(!0), p(M, null, s(B.value, (e) => (a(), p("li", {
						key: e.record_id,
						class: O(v(J).searchResultRow)
					}, [
						T("span", { class: O(v(J).searchResultTag) }, b(e.display_text), 3),
						e.category ? (a(), p("span", {
							key: 0,
							class: O(v(J).searchResultTranslation)
						}, b(e.category), 3)) : y("", !0),
						F(z, {
							label: K.value === e.record_id ? v(n)("common.actions.copied") : v(n)("common.actions.copy"),
							icon: v(re),
							variant: "secondary",
							onClick: () => void Z(e)
						}, null, 8, [
							"label",
							"icon",
							"onClick"
						])
					], 2))), 128))], 2)) : y("", !0)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
					"empty-message",
					"error-message"
				]),
				H.value === null ? y("", !0) : (a(), p("div", {
					key: 0,
					class: O(v(J).loadMoreRow)
				}, [F(z, {
					label: v(n)("common.actions.next"),
					variant: "secondary",
					pending: G.value,
					onClick: c[1] ||= () => void X()
				}, null, 8, ["label", "pending"])], 2))
			]),
			T("section", null, [
				T("p", { class: O(v(J).sectionTitle) }, b(v(n)("assets.vocabulary.updates_title")), 3),
				u.value ? (a(), x(te, {
					key: 1,
					status: ie.value,
					"empty-title": v(n)("assets.vocabulary.no_updates_title"),
					"empty-message": v(n)("assets.vocabulary.no_updates_description"),
					"error-message": e.catalogFailure === null ? "" : r(e.catalogFailure.code, !1),
					"min-height": "80px"
				}, {
					default: k(() => [T("div", { class: O(v(J).catalogList) }, [(a(!0), p(M, null, s(_.value, (e) => (a(), p("div", {
						key: e.package_id,
						class: O(v(J).catalogEntry)
					}, [T("div", { class: O(v(J).catalogEntryInfo) }, [T("span", { class: O(v(J).catalogEntryName) }, b(w(e)), 3), T("span", { class: O(["tc-tabular-nums", v(J).catalogEntryMeta]) }, b(v(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (a(), p("span", {
						key: 0,
						class: O(v(J).bundledBadge)
					}, b(v(n)("assets.vocabulary.bundled_label")), 3)) : (a(), x(z, {
						key: 1,
						label: v(n)("assets.vocabulary.import_action"),
						icon: v(V),
						variant: "primary",
						pending: j.value === e.package_id,
						onClick: () => void I(e)
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
					"empty-message",
					"error-message"
				])) : (a(), x(z, {
					key: 0,
					label: v(n)("assets.vocabulary.update_action"),
					variant: "secondary",
					"data-testid": "vocabulary-check-updates",
					onClick: d
				}, null, 8, ["label"])),
				j.value !== null && P.value !== null ? (a(), p("p", {
					key: 2,
					class: O(v(J).installProgress)
				}, b(P.value), 3)) : y("", !0),
				e.installCommand.status === "error" ? (a(), p("p", {
					key: 3,
					class: O(v(J).installProgress),
					role: "alert",
					"data-testid": "vocabulary-install-error"
				}, b(r(e.installCommand.failure.code, !0)), 3)) : y("", !0)
			]),
			S.value.length > 0 ? (a(), p("section", {
				key: 0,
				class: O(v(J).nsfwSection)
			}, [T("button", {
				type: "button",
				class: O(["tc-interactive", v(J).nsfwToggle]),
				"aria-expanded": C.value,
				onClick: c[2] ||= (e) => C.value = !C.value
			}, [F(R, {
				icon: C.value ? v(be) : v(ne),
				size: 14
			}, null, 8, ["icon"]), N(" " + b(v(n)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, nt), C.value ? (a(), p("div", {
				key: 1,
				class: O(v(J).catalogList)
			}, [T("p", { class: O(v(J).nsfwNotice) }, b(v(n)("assets.vocabulary.nsfw_disclosure_hint")), 3), (a(!0), p(M, null, s(S.value, (e) => (a(), p("div", {
				key: e.package_id,
				class: O(v(J).catalogEntry)
			}, [T("div", { class: O(v(J).catalogEntryInfo) }, [T("span", { class: O(v(J).catalogEntryName) }, b(w(e)), 3), T("span", { class: O(["tc-tabular-nums", v(J).catalogEntryMeta]) }, b(v(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), F(z, {
				label: v(n)("assets.vocabulary.import_action"),
				icon: v(V),
				variant: "destructive",
				pending: j.value === e.package_id,
				onClick: () => void I(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (a(), p("p", {
				key: 0,
				class: O(v(J).nsfwNotice)
			}, b(v(n)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : y("", !0)
		], 2));
	}
}), it = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, at = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function ot(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(it)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var st = ["data-editing"], ct = ["aria-label"], lt = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], ut = ["id", "value"], dt = "unmapped", ft = "{{", pt = "}}", mt = /* @__PURE__ */ P({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = E(), i = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], o = X("workflow", t.controller, () => i, () => n("errors.validation_required")), c = A(null), l = A([]);
		function u(e) {
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
			value: dt,
			label: n("assets.workflow.placeholder_unmapped")
		}, ...at.map((e) => ({
			value: e,
			label: u(e)
		}))]);
		function m() {
			let e = o.values.workflow_json;
			return typeof e == "string" ? e : "";
		}
		function h(e) {
			let t = e.placeholder_map, n = {};
			if (typeof t == "string") try {
				let e = JSON.parse(t);
				typeof e == "object" && e && (n = e);
			} catch {
				n = {};
			}
			l.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		f(() => o.editing_record.value, (e) => {
			e ? h(e.payload) : l.value = [];
		}, { immediate: !0 });
		function _() {
			let e = ot(m()), t = new Map(l.value.map((e) => [e.name, e.target]));
			l.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function S(e, t) {
			let n = l.value.find((t) => t.name === e);
			n && (n.target = t === dt ? "" : t);
		}
		function C() {
			c.value?.click();
		}
		function w(e) {
			return `${ft}${e}${pt}`;
		}
		async function j(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			o.open_create(), o.name.value = n.name.replace(/\.json$/iu, ""), o.values.workflow_json = r, l.value = ot(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function N() {
			let e = {};
			for (let t of l.value) e[t.name] = t.target;
			o.values.placeholder_map = JSON.stringify(e), await o.save();
		}
		return (t, i) => (a(), p("div", {
			class: O(v(J).assetsBody),
			"data-editing": v(o).dialog_open.value ? "" : void 0
		}, [T("div", { class: O(v(J).assetsMain) }, [T("div", { class: O(v(J).workflowToolbarRow) }, [F(z, {
			label: v(n)("assets.workflow.import_action"),
			icon: v(ae),
			variant: "primary",
			onClick: C
		}, null, 8, ["label", "icon"]), T("input", {
			ref_key: "file_input",
			ref: c,
			class: O(v(J).hiddenFileInput),
			type: "file",
			accept: "application/json,.json",
			"aria-label": v(n)("assets.workflow.import_action"),
			onChange: i[0] ||= (e) => void j(e)
		}, null, 42, ct)], 2), F(Y, {
			"active-id": v(o).dialog_open.value ? v(o).record_id.value : null,
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
			"delete-confirm-description": v(n)("assets.delete_confirm_description"),
			"confirm-label": v(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": v(n)("confirmations.destructive.default_cancel_action"),
			onAdd: C,
			onEdit: v(o).open_edit,
			onDeleteMany: i[1] ||= (e) => void v(o).remove_many(e),
			onReorder: v(o).reorder,
			onRandomSelect: v(o).random_select
		}, null, 8, [
			"active-id",
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
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"onEdit",
			"onReorder",
			"onRandomSelect"
		])], 2), F(je, {
			open: v(o).dialog_open.value,
			title: v(n)("assets.workflow.edit_action"),
			description: v(n)("assets.form_dialog_description"),
			"close-label": v(n)("common.actions.close"),
			"onUpdate:open": i[5] ||= (e) => {
				e || v(o).close_dialog();
			}
		}, {
			default: k(() => [T("form", {
				class: O(v(J).form),
				onSubmit: i[4] ||= g(() => void N(), ["prevent"])
			}, [
				F(K, {
					label: v(n)("common.labels.name"),
					error: v(o).name_error.value,
					required: ""
				}, {
					default: k(({ fieldId: e, describedBy: t, invalid: r }) => [T("input", {
						id: e,
						class: O(v(J).textInput),
						type: "text",
						placeholder: v(n)("common.labels.name"),
						value: v(o).name.value,
						"aria-describedby": t,
						"aria-invalid": r,
						onInput: i[2] ||= (e) => v(o).name.value = e.target.value
					}, null, 42, lt)]),
					_: 1
				}, 8, ["label", "error"]),
				F(K, { label: v(n)("assets.workflow.json_label") }, {
					default: k(({ fieldId: e }) => [T("textarea", {
						id: e,
						class: O([v(J).textArea, v(J).codeTextArea]),
						value: m(),
						onInput: i[3] ||= (e) => v(o).values.workflow_json = e.target.value
					}, null, 42, ut)]),
					_: 1
				}, 8, ["label"]),
				F(z, {
					label: v(n)("assets.workflow.placeholder_scan_action"),
					icon: v(q),
					variant: "secondary",
					type: "button",
					onClick: _
				}, null, 8, ["label", "icon"]),
				l.value.length > 0 ? (a(), p("div", {
					key: 0,
					class: O(v(J).placeholderList)
				}, [(a(!0), p(M, null, s(l.value, (e) => (a(), p("div", {
					key: e.name,
					class: O(v(J).placeholderRow)
				}, [T("span", { class: O(v(J).placeholderKey) }, b(w(e.name)), 3), (a(), x(B, {
					key: v(r),
					"model-value": e.target === "" ? dt : e.target,
					options: d.value,
					placeholder: v(n)("assets.workflow.placeholder_unmapped"),
					ariaLabel: e.name,
					"onUpdate:modelValue": (t) => S(e.name, t)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"ariaLabel",
					"onUpdate:modelValue"
				]))], 2))), 128))], 2)) : y("", !0),
				T("div", { class: O(v(J).formActions) }, [F(z, {
					label: v(n)("common.actions.cancel"),
					variant: "ghost",
					type: "button",
					onClick: v(o).close_dialog
				}, null, 8, ["label", "onClick"]), F(z, {
					label: v(n)("common.actions.save"),
					variant: "primary",
					type: "submit",
					pending: v(o).saving.value
				}, null, 8, ["label", "pending"])], 2)
			], 34)]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])], 10, st));
	}
}), ht = /* @__PURE__ */ P({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = E(), i = [
			"character",
			"outfit",
			"lora",
			"vibe",
			"workflow"
		], o = A(t.state.assets.active_category), c = A(!1), l = d(I, A(null));
		function u(e) {
			o.value = e, i.includes(String(e)) && t.controller.set_active_asset_category(e);
		}
		function f(e) {
			let t = e.chat_id;
			return typeof t == "string" && t !== "" && t !== l.value;
		}
		function m(e) {
			let n = t.state.assets.records[e];
			return c.value ? n.length : n.filter((e) => !f(e.payload)).length;
		}
		let h = D(() => [...t.state.assets.records.character, ...t.state.assets.records.outfit].some((e) => f(e.payload))), g = D(() => ({
			character: n("assets.tabs.characters"),
			outfit: n("assets.tabs.outfits"),
			lora: n("assets.tabs.lora"),
			vibe: n("assets.tabs.vibe"),
			workflow: n("assets.tabs.workflow")
		})), _ = D(() => t.state.loading.has("assets")), x = D(() => t.state.loading.has("vocabulary")), S = D(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (a(), p("div", { class: O(v(J).assetsView) }, [F(v(Ce), {
			"model-value": o.value,
			class: O(v(J).tabsRoot),
			"onUpdate:modelValue": u
		}, {
			default: k(() => [
				F(v(Ee), {
					class: O(v(J).tabsList),
					"aria-label": v(n)("nav.assets")
				}, {
					default: k(() => [(a(), p(M, null, s(i, (e) => F(v(De), {
						key: e,
						value: e,
						class: O(v(J).tabsTrigger)
					}, {
						default: k(() => [N(b(g.value[e]) + " ", 1), _.value ? y("", !0) : (a(), p("span", {
							key: 0,
							class: O([v(J).tabsCount, "tc-tabular-nums"])
						}, b(m(e)), 3))]),
						_: 2
					}, 1032, ["value", "class"])), 64)), F(v(De), {
						value: "vocabulary",
						class: O(v(J).tabsTrigger)
					}, {
						default: k(() => [N(b(v(n)("assets.tabs.vocabulary")), 1)]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				h.value && (o.value === "character" || o.value === "outfit") ? (a(), p("div", {
					key: 0,
					class: O(v(J).scopeSwitch)
				}, [F(_e, {
					modelValue: c.value,
					"onUpdate:modelValue": r[0] ||= (e) => c.value = e,
					label: v(n)("assets.show_all_chats_label")
				}, null, 8, ["modelValue", "label"])], 2)) : y("", !0),
				F(v($), {
					value: "character",
					class: O(v(J).tabsContent)
				}, {
					default: k(() => [F(Ve, {
						records: e.state.assets.records.character,
						"outfit-records": e.state.assets.records.outfit,
						loading: _.value,
						controller: e.controller,
						"show-all-chats": c.value
					}, null, 8, [
						"records",
						"outfit-records",
						"loading",
						"controller",
						"show-all-chats"
					])]),
					_: 1
				}, 8, ["class"]),
				F(v($), {
					value: "outfit",
					class: O(v(J).tabsContent)
				}, {
					default: k(() => [F(qe, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: _.value,
						controller: e.controller,
						"show-all-chats": c.value
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller",
						"show-all-chats"
					])]),
					_: 1
				}, 8, ["class"]),
				F(v($), {
					value: "lora",
					class: O(v(J).tabsContent)
				}, {
					default: k(() => [F(Ue, {
						records: e.state.assets.records.lora,
						"character-records": e.state.assets.records.character,
						loading: _.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				F(v($), {
					value: "vibe",
					class: O(v(J).tabsContent)
				}, {
					default: k(() => [F(Qe, {
						records: e.state.assets.records.vibe,
						loading: _.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				F(v($), {
					value: "workflow",
					class: O(v(J).tabsContent)
				}, {
					default: k(() => [F(mt, {
						records: e.state.assets.records.workflow,
						loading: _.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				F(v($), {
					value: "vocabulary",
					class: O([v(J).tabsContent, v(J).vocabularyContent])
				}, {
					default: k(() => [F(rt, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						"catalog-failure": e.state.failures.get("vocabulary") ?? null,
						loading: x.value,
						controller: e.controller,
						locale: S.value
					}, null, 8, [
						"catalog",
						"install-command",
						"catalog-failure",
						"loading",
						"controller",
						"locale"
					])]),
					_: 1
				}, 8, ["class"])
			]),
			_: 1
		}, 8, ["model-value", "class"])], 2));
	}
});
//#endregion
export { ht as default };
