import { a as e, i as t, n, o as r, s as i } from "./wardrobe_library-D08dVzPC.js";
import { A as a, E as o, G as s, I as c, J as l, M as u, N as d, R as f, S as p, Y as m, _ as h, _t as g, b as _, c as v, d as y, ft as b, g as x, gt as S, h as C, it as w, k as T, l as E, lt as D, m as O, mt as k, n as A, o as j, ot as M, v as N, y as P, z as F } from "./vue-i18n-BQWz_HuU.js";
import { r as I, t as L } from "./portal_keys-DthxrmWp.js";
import { n as R, t as z } from "./AppIcon-B1iv8vRB.js";
import { n as B, t as ee } from "./StateSurface-Dxa4U6G6.js";
import { n as te, t as V } from "./AppSelect-ne0yiQQW.js";
import { n as ne, t as H } from "./download-ByOSvXgA.js";
import { t as U } from "./image-plus-CDYzFRnQ.js";
import { n as re, r as W, t as G } from "./AppCheckbox-CHqNg9ZG.js";
import { t as K } from "./FieldGroup-B4bm8x77.js";
import { n as q, t as J } from "./workflow_target_label-_QZHF2k5.js";
import { a as Y, i as X, n as Z, r as ie, t as ae } from "./use_asset_category_panel-ZOiu7cWE.js";
import { t as oe } from "./upload-0RKJ11C5.js";
import { t as se } from "./x-CZeKQbKW.js";
import { _ as ce, a as le, c as ue, d as de, h as fe, i as pe, l as me, o as he, p as ge, r as _e, u as ve } from "./workflow_mapping-1vKn8khF.js";
import { t as ye } from "./_prop_utils-BQHilWOI.js";
import { P as be, S as xe, f as Se, l as Ce, s as we, u as Te } from "./Teleport-B2amidH8.js";
import { n as Ee } from "./NumberStepper-Q3rxAKj9.js";
import { c as De } from "./AppTooltip-DuggrS-8.js";
import { t as Oe } from "./IconButton-DbYdD8bu.js";
import { t as ke } from "./ConfirmDialog-BbJ8Vn0S.js";
import { t as Ae } from "./AppSwitch-BQKT0Mao.js";
import { t as je } from "./ZoomableImage-Cj2h7qbt.js";
import { n as Me } from "./reference_image-B8V-aXPW.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/chevron-up.js
var Ne = R("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), [Pe, Fe] = /*#__PURE__*/ be("TabsRoot"), Ie = /* @__PURE__ */ p({
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
		let n = e, r = t, { orientation: i, unmountOnHide: a, dir: o } = D(n), s = De(o);
		Se();
		let u = xe(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), d = w(), f = M(/* @__PURE__ */ new Set());
		return Fe({
			modelValue: u,
			changeModelValue: (e) => {
				u.value = e;
			},
			orientation: i,
			dir: s,
			unmountOnHide: a,
			activationMode: n.activationMode,
			baseId: Te(void 0, "reka-tabs"),
			tabsList: d,
			contentIds: f,
			registerContent: (e) => {
				f.value = /* @__PURE__ */ new Set([...f.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(f.value);
				t.delete(e), f.value = t;
			}
		}), (e, t) => (c(), x(b(we), {
			dir: b(s),
			"data-orientation": b(i),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: l(() => [F(e.$slots, "default", { modelValue: b(u) })]),
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
function Le(e, t) {
	return `${e}-trigger-${t}`;
}
function Re(e, t) {
	return `${e}-content-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var Q = /* @__PURE__ */ p({
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
		let t = e, { forwardRef: n } = Se(), r = Pe(), i = O(() => Le(r.baseId, t.value)), a = O(() => Re(r.baseId, t.value)), o = O(() => t.value === r.modelValue.value), s = w(o.value);
		return d(() => {
			r.registerContent(t.value), requestAnimationFrame(() => {
				s.value = !1;
			});
		}), u(() => {
			r.unregisterContent(t.value);
		}), (e, t) => (c(), x(b(Ce), {
			present: e.forceMount || o.value,
			"force-mount": ""
		}, {
			default: l(({ present: t }) => [_(b(we), {
				id: a.value,
				ref: b(n),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": o.value ? "active" : "inactive",
				"data-orientation": b(r).orientation.value,
				"aria-labelledby": i.value,
				hidden: !t,
				tabindex: "0",
				style: S({ animationDuration: s.value ? "0s" : void 0 })
			}, {
				default: l(() => [!b(r).unmountOnHide.value || t ? F(e.$slots, "default", { key: 0 }) : h("v-if", !0)]),
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
}), ze = /* @__PURE__ */ p({
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
		let { loop: t } = D(e), { forwardRef: n, currentElement: r } = Se(), i = Pe();
		return i.tabsList = r, (e, r) => (c(), x(b(W), {
			"as-child": "",
			orientation: b(i).orientation.value,
			dir: b(i).dir.value,
			loop: b(t)
		}, {
			default: l(() => [_(b(we), {
				ref: b(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": b(i).orientation.value
			}, {
				default: l(() => [F(e.$slots, "default")]),
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
}), Be = /* @__PURE__ */ p({
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
		let t = e, { forwardRef: n } = Se(), r = Pe(), i = O(() => Le(r.baseId, t.value)), a = O(() => r.contentIds.value.has(t.value) ? Re(r.baseId, t.value) : void 0), o = O(() => t.value === r.modelValue.value);
		return (e, t) => (c(), x(b(re), {
			"as-child": "",
			focusable: !e.disabled,
			active: o.value
		}, {
			default: l(() => [_(b(we), {
				id: i.value,
				ref: b(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": o.value ? "true" : "false",
				"aria-controls": a.value,
				"data-state": o.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": b(r).orientation.value,
				onMousedown: t[0] ||= E((t) => {
					!e.disabled && t.ctrlKey === !1 ? b(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= v((t) => b(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = b(r).activationMode !== "manual";
					!o.value && !e.disabled && t && b(r).changeModelValue(e.value);
				}
			}, {
				default: l(() => [F(e.$slots, "default")]),
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
}), Ve = ["aria-label"], He = ["data-empty"], Ue = ["src"], We = /* @__PURE__ */ p({
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
		let n = e, r = t, i = w(null);
		return s(() => n.open, async (e) => {
			e && (await a(), i.value?.focus({ preventScroll: !0 }), i.value?.scrollIntoView({ block: "nearest" }));
		}), (t, n) => e.open ? (c(), N("aside", {
			key: 0,
			ref_key: "root",
			ref: i,
			class: k(b(Y).editor),
			"aria-label": e.title,
			tabindex: "-1",
			"data-testid": "asset-editor",
			onKeydown: n[1] ||= v((e) => r("update:open", !1), ["esc"])
		}, [C("header", { class: k(b(Y).editorHead) }, [
			e.thumbnail === void 0 ? h("", !0) : (c(), N("span", {
				key: 0,
				class: k(b(Y).editorThumb),
				"data-empty": e.thumbnail === null ? "" : void 0
			}, [e.thumbnail === null ? h("", !0) : (c(), N("img", {
				key: 0,
				src: e.thumbnail,
				alt: ""
			}, null, 8, Ue))], 10, He)),
			C("div", { class: k(b(Y).editorHeading) }, [C("h3", { class: k(b(Y).editorTitle) }, g(e.title), 3), C("p", { class: k(b(Y).editorDescription) }, g(e.description), 3)], 2),
			_(Oe, {
				icon: b(se),
				label: e.closeLabel,
				onClick: n[0] ||= (e) => r("update:open", !1)
			}, null, 8, ["icon", "label"])
		], 2), C("div", { class: k(b(Y).editorBody) }, [F(t.$slots, "default")], 2)], 42, Ve)) : h("", !0);
	}
});
//#endregion
//#region src/ui/views/assets/chat_scope.ts
function Ge(e, t, n = () => !1) {
	let r = o(L, w(null));
	return {
		active_chat_id: r,
		visible: O(() => e().flatMap((e) => {
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
var Ke = ["id"], qe = ["id"], Je = /* @__PURE__ */ p({
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
		let n = e, r = t, { t: i } = A(), a = o(I, null), s = w(null), u = w(null), d = w(!1), f = w(!1), p = w(""), v = w(""), S = O(() => [
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
		async function T(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", n === void 0) return;
			u.value = null;
			let a;
			try {
				a = await Me(n);
			} catch {
				u.value = i("assets.characters.reference_image_unreadable");
				return;
			}
			r("update:image", a), r("uploaded", a);
		}
		function E() {
			p.value = n.defaultPrompt.positive_prompt, v.value = n.defaultPrompt.negative_prompt, u.value = null, d.value = !0;
		}
		async function D() {
			if (a !== null) {
				f.value = !0, u.value = null;
				try {
					let e = await a.generate({
						positive_prompt: p.value,
						negative_prompt: v.value
					}), t = await Me(e);
					r("update:image", t), r("generated", t), d.value = !1;
				} catch (e) {
					u.value = i("assets.characters.reference_generate_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					f.value = !1;
				}
			}
		}
		return (t, n) => (c(), N(y, null, [
			_(K, {
				label: b(i)("assets.characters.reference_image_label"),
				hint: b(i)("assets.characters.reference_image_hint"),
				error: u.value
			}, {
				default: l(() => [C("div", { class: k(b(Y).reference) }, [e.image === null ? h("", !0) : (c(), x(je, {
					key: 0,
					src: e.image,
					alt: b(i)("assets.characters.reference_image_label"),
					"image-class": b(Y).reference_thumbnail
				}, null, 8, [
					"src",
					"alt",
					"image-class"
				])), C("div", { class: k(b(Y).reference_actions) }, [
					C("input", {
						ref_key: "file_input",
						ref: s,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						hidden: "",
						"data-testid": "character-reference-input",
						onChange: T
					}, null, 544),
					_(B, {
						label: b(i)("assets.characters.reference_upload"),
						onClick: n[0] ||= (e) => s.value?.click()
					}, null, 8, ["label"]),
					b(a) === null ? h("", !0) : (c(), x(B, {
						key: 0,
						label: b(i)("assets.characters.reference_generate"),
						disabled: d.value,
						"data-testid": "character-reference-generate",
						onClick: E
					}, null, 8, ["label", "disabled"])),
					e.image === null ? h("", !0) : (c(), x(B, {
						key: 1,
						label: b(i)("assets.characters.reference_image_remove"),
						onClick: n[1] ||= (e) => r("update:image", null)
					}, null, 8, ["label"]))
				], 2)], 2)]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			d.value ? (c(), N("div", {
				key: 0,
				class: k(b(Y).reference_composer)
			}, [
				C("p", { class: k(b(Y).chat_scope_note) }, g(b(i)("assets.characters.reference_generate_hint")), 3),
				_(K, { label: b(i)("assets.characters.reference_prompt_label") }, {
					default: l(({ fieldId: e }) => [m(C("textarea", {
						id: e,
						"onUpdate:modelValue": n[2] ||= (e) => p.value = e,
						class: k(b(Y).textArea)
					}, null, 10, Ke), [[j, p.value]])]),
					_: 1
				}, 8, ["label"]),
				_(K, { label: b(i)("assets.characters.reference_negative_label") }, {
					default: l(({ fieldId: e }) => [m(C("textarea", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => v.value = e,
						class: k(b(Y).textArea)
					}, null, 10, qe), [[j, v.value]])]),
					_: 1
				}, 8, ["label"]),
				C("div", { class: k(b(Y).reference_actions) }, [_(B, {
					label: b(i)("common.actions.cancel"),
					onClick: n[4] ||= (e) => d.value = !1
				}, null, 8, ["label"]), _(B, {
					label: e.image === null ? b(i)("assets.characters.reference_generate_submit") : b(i)("assets.characters.reference_regenerate_submit"),
					variant: "primary",
					pending: f.value,
					"data-testid": "character-reference-submit",
					onClick: D
				}, null, 8, ["label", "pending"])], 2)
			], 2)) : h("", !0),
			e.image === null ? h("", !0) : (c(), N(y, { key: 1 }, [_(G, {
				"model-value": e.send,
				label: b(i)("assets.characters.reference_send_label"),
				"onUpdate:modelValue": n[5] ||= (e) => r("update:send", e)
			}, null, 8, ["model-value", "label"]), _(K, {
				label: b(i)("assets.characters.reference_mode_label"),
				hint: b(i)("assets.characters.reference_mode_hint")
			}, {
				default: l(() => [_(Ee, {
					"model-value": e.mode,
					options: S.value,
					label: b(i)("assets.characters.reference_mode_label"),
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
function Ye(e, t) {
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
function Xe(e, t) {
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
var Ze = ["data-editing"], Qe = "none", $e = "solo, full body, standing, looking at viewer, simple background, white background", et = /* @__PURE__ */ p({
	__name: "CharacterPanel",
	props: {
		records: {},
		outfitRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(a) {
		let s = a, { t: u } = A(), { visible: d } = Ge(() => s.records, () => ({
			this_chat: u("assets.chat_scope_label"),
			other_chat: (e) => u("assets.other_chat_scope_label", { chat: e })
		}), () => s.showAllChats), f = O(() => [
			{
				key: "aliases",
				label: u("assets.characters.aliases_label"),
				kind: "text",
				hint: u("assets.characters.aliases_hint")
			},
			...r.map((e) => ({
				key: e,
				label: Ye(u, e),
				kind: "tags",
				...e === "character" ? { hint: u("assets.characters.character_tag_hint") } : {}
			})),
			{
				key: "excluded_traits",
				label: u("assets.characters.excluded_traits_label"),
				kind: "tags",
				hint: u("assets.characters.excluded_traits_hint")
			}
		]), p = O(() => [{
			key: "scope_label",
			label: u("assets.scope_label")
		}]), m = Z("character", s.controller, () => f.value, () => u("errors.validation_required"), [
			"subject",
			"default_outfit_id",
			"reference_image",
			"reference_send",
			"reference_mode",
			"origin",
			"locked_fields",
			"chat_id",
			"created_from_message_id"
		], { reference_image: "reference_thumbnail" }), v = O(() => [
			{
				value: "girl",
				label: u("assets.characters.subject_girl")
			},
			{
				value: "boy",
				label: u("assets.characters.subject_boy")
			},
			{
				value: "other",
				label: u("assets.characters.subject_other")
			}
		]), y = O(() => m.values.subject === "boy" || m.values.subject === "other" ? m.values.subject : "girl"), x = O(() => {
			let e = m.record_id.value;
			return [{
				value: Qe,
				label: u("assets.characters.default_outfit_first")
			}, ...s.outfitRecords.filter((t) => {
				let n = t.payload.character_id;
				return typeof n != "string" || n === "" || n === e;
			}).map((e) => ({
				value: e.id,
				label: e.display_name
			}))];
		}), S = O(() => typeof m.values.default_outfit_id == "string" && m.values.default_outfit_id !== "" ? m.values.default_outfit_id : Qe), E = O(() => typeof m.values.chat_id == "string" && m.values.chat_id !== ""), D = O(() => typeof m.values.reference_image == "string" && m.values.reference_image !== "" ? m.values.reference_image : null), j = O(() => m.values.reference_mode === "img2img" || m.values.reference_mode === "precise" ? m.values.reference_mode : "vibe");
		function M(e) {
			if (e === null) {
				for (let e of [
					"reference_image",
					"reference_send",
					"reference_mode"
				]) Reflect.deleteProperty(m.values, e);
				return;
			}
			m.values.reference_image = e, m.values.reference_mode = j.value;
		}
		let F = o(I, null), L = w(null), R = w(!1), z = w(null);
		function ee(e) {
			s.outfitRecords.some((e) => e.payload.character_id === m.record_id.value) || (L.value = e);
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
					character_id: m.record_id.value,
					origin: "analysis",
					chat_id: typeof m.values.chat_id == "string" ? m.values.chat_id : ""
				}
			}), m.values.default_outfit_id = t;
		}
		async function ne() {
			let e = L.value;
			if (e !== null && F !== null) {
				R.value = !0, z.value = null;
				try {
					await te(await F.read_outfit(e));
				} catch (e) {
					z.value = u("assets.characters.outfit_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					R.value = !1, L.value = null;
				}
			}
		}
		let H = w(null), U = w(!1);
		function re(e) {
			F !== null && (H.value = e);
		}
		async function W() {
			let t = H.value;
			if (t !== null && F !== null) {
				U.value = !0, z.value = null;
				try {
					let i = await F.read_character(t);
					for (let t of r) {
						let r = i.appearance[t];
						r !== void 0 && e(m.values[t]).length === 0 && (m.values[t] = n(r));
					}
					m.values.subject !== "girl" && m.values.subject !== "boy" && (m.values.subject = i.subject), i.outfit !== null && await te(i.outfit);
				} catch (e) {
					z.value = u("assets.characters.character_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					U.value = !1, H.value = null;
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
		function J(e) {
			return u(e === "boy" ? "assets.characters.subject_boy" : e === "other" ? "assets.characters.subject_other" : "assets.characters.subject_girl");
		}
		function oe(t) {
			let n = q(t, "reference_thumbnail") || q(t, "reference_image");
			return {
				thumbnail: n === "" ? null : n,
				subtitle: J(q(t, "subject")),
				detail: [e(q(t, "aliases")).join("、"), q(t, "scope_label")].filter((e) => e !== "").join(" · "),
				tags: r.flatMap((n) => e(q(t, n)))
			};
		}
		let se = O(() => {
			let e = m.record_id.value, n = s.outfitRecords.map(t), r = n.find((e) => e.id === m.values.default_outfit_id) ?? n.find((t) => t.character_id === e);
			return r === void 0 ? [] : i.flatMap((e) => r.slots[e]);
		}), ce = O(() => ({
			positive_prompt: n([
				G[y.value],
				$e,
				...r.flatMap((t) => e(m.values[t])),
				...se.value
			].filter((e) => e !== "")),
			negative_prompt: n(e(m.values.excluded_traits))
		}));
		async function le() {
			let t = m.editing_record.value?.payload ?? {}, n = r.filter((n) => e(m.values[n]).join(",") !== e(typeof t[n] == "string" ? t[n] : "").join(",")), i = /* @__PURE__ */ new Set([...e(m.values.locked_fields), ...n]);
			m.values.locked_fields = [...i].join(", "), m.values.origin = typeof m.values.origin == "string" ? m.values.origin : "user", await m.save();
		}
		async function ue() {
			m.values.chat_id = "", await le();
		}
		return (e, t) => (c(), N("div", {
			class: k(b(Y).assetsBody),
			"data-editing": b(m).dialog_open.value ? "" : void 0
		}, [
			C("div", { class: k(b(Y).assetsMain) }, [_(X, {
				"active-id": b(m).dialog_open.value ? b(m).record_id.value : null,
				describe: oe,
				records: b(d),
				"summary-fields": p.value,
				loading: a.loading,
				"search-label": b(u)("common.actions.search"),
				"search-placeholder": b(u)("common.actions.search"),
				"empty-title": b(u)("assets.characters.empty_title"),
				"empty-description": b(u)("assets.characters.empty_description"),
				"add-label": b(u)("assets.characters.add_action"),
				"random-label": b(u)("assets.random_selection_action"),
				"reorder-hint": b(u)("assets.reorder_hint"),
				"edit-label": b(u)("common.actions.edit"),
				"delete-confirm-description": b(u)("assets.delete_confirm_description"),
				"confirm-label": b(u)("confirmations.destructive.default_confirm_action"),
				"cancel-label": b(u)("confirmations.destructive.default_cancel_action"),
				onAdd: b(m).open_create,
				onEdit: b(m).open_edit,
				onDeleteMany: t[0] ||= (e) => void b(m).remove_many(e),
				onReorder: b(m).reorder,
				onRandomSelect: b(m).random_select
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
			_(We, {
				open: b(m).dialog_open.value,
				title: b(m).editing_record.value ? b(m).editing_record.value.display_name : b(u)("assets.characters.add_action"),
				description: b(m).editing_record.value ? b(u)("assets.characters.editor_description", { name: b(m).editing_record.value.display_name }) : b(u)("assets.form_dialog_description"),
				thumbnail: b(m).thumbnail("reference_image"),
				"close-label": b(u)("common.actions.close"),
				"onUpdate:open": t[7] ||= (e) => {
					e || b(m).close_dialog();
				}
			}, {
				default: l(() => [_(ie, {
					"name-label": b(u)("common.labels.name"),
					"name-placeholder": b(u)("common.labels.name"),
					name: b(m).name.value,
					"name-error": b(m).name_error.value,
					"save-error": b(m).save_error.value,
					fields: f.value,
					values: b(m).values,
					"save-label": b(u)("common.actions.save"),
					"cancel-label": b(u)("common.actions.cancel"),
					"decrement-label": b(u)("common.actions.decrease"),
					"increment-label": b(u)("common.actions.increase"),
					pending: b(m).saving.value,
					"onUpdate:name": t[5] ||= (e) => {
						b(m).name.value = e;
					},
					"onUpdate:values": t[6] ||= (e) => b(ae)(b(m).values, e),
					onSave: le,
					onCancel: b(m).close_dialog
				}, {
					"leading-fields": l(() => [
						_(Je, {
							image: D.value,
							send: b(m).values.reference_send === 1,
							mode: j.value,
							"default-prompt": ce.value,
							"onUpdate:image": M,
							"onUpdate:send": t[1] ||= (e) => b(m).values.reference_send = +!!e,
							"onUpdate:mode": t[2] ||= (e) => b(m).values.reference_mode = e,
							onGenerated: ee,
							onUploaded: re
						}, null, 8, [
							"image",
							"send",
							"mode",
							"default-prompt"
						]),
						z.value === null ? h("", !0) : (c(), N("p", {
							key: 0,
							class: k(b(Y).formError),
							role: "alert"
						}, g(z.value), 3)),
						_(K, { label: b(u)("assets.characters.subject_label") }, {
							default: l(() => [_(Ee, {
								"model-value": y.value,
								options: v.value,
								label: b(u)("assets.characters.subject_label"),
								"onUpdate:modelValue": t[3] ||= (e) => b(m).values.subject = e
							}, null, 8, [
								"model-value",
								"options",
								"label"
							])]),
							_: 1
						}, 8, ["label"])
					]),
					"extra-fields": l(() => [E.value ? (c(), N("p", {
						key: 0,
						class: k(b(Y).chat_scope_note)
					}, [P(g(b(u)("assets.chat_scope_note")) + " ", 1), _(B, {
						label: b(u)("assets.import_to_global_action"),
						"data-testid": "import-to-global",
						onClick: ue
					}, null, 8, ["label"])], 2)) : h("", !0), _(K, { label: b(u)("assets.characters.default_outfit_label") }, {
						default: l(({ fieldId: e, describedBy: n }) => [_(V, T({
							id: e,
							"model-value": S.value,
							options: x.value,
							placeholder: b(u)("assets.characters.default_outfit_label")
						}, b(ye)({ describedBy: n }), { "onUpdate:modelValue": t[4] ||= (e) => b(m).values.default_outfit_id = e === Qe ? "" : e }), null, 16, [
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
			_(ke, {
				open: L.value !== null,
				title: b(u)("assets.characters.outfit_from_reference_title"),
				description: b(u)("assets.characters.outfit_from_reference_description"),
				"confirm-label": b(u)("assets.characters.outfit_from_reference_confirm"),
				"cancel-label": b(u)("assets.characters.outfit_from_reference_cancel"),
				pending: R.value,
				destructive: !1,
				"onUpdate:open": t[8] ||= (e) => {
					!e && !R.value && (L.value = null);
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
			_(ke, {
				open: H.value !== null,
				title: b(u)("assets.characters.character_from_reference_title"),
				description: b(u)("assets.characters.character_from_reference_description"),
				"confirm-label": b(u)("assets.characters.character_from_reference_confirm"),
				"cancel-label": b(u)("assets.characters.character_from_reference_cancel"),
				pending: U.value,
				destructive: !1,
				"onUpdate:open": t[9] ||= (e) => {
					!e && !U.value && (H.value = null);
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
		], 10, Ze));
	}
}), tt = ["data-editing"], nt = /* @__PURE__ */ p({
	__name: "LoraPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = A(), r = O(() => [
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
		], a = Z("lora", t.controller, () => r.value, () => n("errors.validation_required"), ["character_id"]);
		function o() {
			a.open_create(), a.values.weight = 1;
		}
		let s = O(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), u = O(() => {
			let e = a.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		return (t, d) => (c(), N("div", {
			class: k(b(Y).assetsBody),
			"data-editing": b(a).dialog_open.value ? "" : void 0
		}, [C("div", { class: k(b(Y).assetsMain) }, [_(X, {
			"active-id": b(a).dialog_open.value ? b(a).record_id.value : null,
			records: e.records,
			"summary-fields": i,
			loading: e.loading,
			"search-label": b(n)("common.actions.search"),
			"search-placeholder": b(n)("common.actions.search"),
			"empty-title": b(n)("assets.lora.empty_title"),
			"empty-description": b(n)("assets.lora.empty_description"),
			"add-label": b(n)("assets.lora.add_action"),
			"random-label": b(n)("assets.random_selection_action"),
			"reorder-hint": b(n)("assets.reorder_hint"),
			"edit-label": b(n)("common.actions.edit"),
			"delete-confirm-description": b(n)("assets.delete_confirm_description"),
			"confirm-label": b(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": b(n)("confirmations.destructive.default_cancel_action"),
			onAdd: o,
			onEdit: b(a).open_edit,
			onDeleteMany: d[0] ||= (e) => void b(a).remove_many(e),
			onReorder: b(a).reorder,
			onRandomSelect: b(a).random_select
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
		])], 2), _(We, {
			open: b(a).dialog_open.value,
			title: b(a).editing_record.value ? b(a).editing_record.value.display_name : b(n)("assets.lora.add_action"),
			description: b(n)("assets.form_dialog_description"),
			"close-label": b(n)("common.actions.close"),
			"onUpdate:open": d[4] ||= (e) => {
				e || b(a).close_dialog();
			}
		}, {
			default: l(() => [_(ie, {
				"name-label": b(n)("common.labels.name"),
				"name-placeholder": b(n)("common.labels.name"),
				name: b(a).name.value,
				"name-error": b(a).name_error.value,
				"save-error": b(a).save_error.value,
				fields: r.value,
				values: b(a).values,
				"save-label": b(n)("common.actions.save"),
				"cancel-label": b(n)("common.actions.cancel"),
				"decrement-label": b(n)("common.actions.decrease"),
				"increment-label": b(n)("common.actions.increase"),
				pending: b(a).saving.value,
				"onUpdate:name": d[2] ||= (e) => {
					b(a).name.value = e;
				},
				"onUpdate:values": d[3] ||= (e) => b(ae)(b(a).values, e),
				onSave: b(a).save,
				onCancel: b(a).close_dialog
			}, {
				"extra-fields": l(() => [_(K, {
					label: b(n)("assets.lora.character_label"),
					hint: b(n)("assets.lora.character_hint")
				}, {
					default: l(({ fieldId: e, describedBy: t }) => [_(V, T({
						id: e,
						"model-value": u.value,
						options: s.value,
						placeholder: b(n)("assets.lora.character_placeholder")
					}, b(ye)({ describedBy: t }), { "onUpdate:modelValue": d[1] ||= (e) => b(a).values.character_id = e }), null, 16, [
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
		])], 10, tt));
	}
}), rt = /* @__PURE__ */ p({
	__name: "OutfitPreview",
	props: {
		image: {},
		prompt: { type: Function }
	},
	emits: ["update:image"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = A(), a = o(I, null), s = w(!1), u = w(null);
		async function d() {
			if (a !== null) {
				s.value = !0, u.value = null;
				try {
					r("update:image", await Me(await a.generate(n.prompt())));
				} catch (e) {
					u.value = i("assets.outfits.preview_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					s.value = !1;
				}
			}
		}
		return (t, n) => b(a) !== null || e.image !== null ? (c(), x(K, {
			key: 0,
			label: b(i)("assets.outfits.preview_label"),
			hint: b(i)("assets.outfits.preview_hint"),
			error: u.value
		}, {
			default: l(() => [C("div", { class: k(b(Y).reference) }, [e.image === null ? h("", !0) : (c(), x(je, {
				key: 0,
				src: e.image,
				alt: b(i)("assets.outfits.preview_label"),
				"image-class": b(Y).reference_thumbnail
			}, null, 8, [
				"src",
				"alt",
				"image-class"
			])), C("div", { class: k(b(Y).reference_actions) }, [b(a) === null ? h("", !0) : (c(), x(B, {
				key: 0,
				label: e.image === null ? b(i)("assets.outfits.preview_generate") : b(i)("assets.outfits.preview_regenerate"),
				icon: b(U),
				pending: s.value,
				"data-testid": "outfit-preview-generate",
				onClick: d
			}, null, 8, [
				"label",
				"icon",
				"pending"
			])), e.image === null ? h("", !0) : (c(), x(B, {
				key: 1,
				label: b(i)("assets.outfits.preview_remove"),
				variant: "ghost",
				onClick: n[0] ||= (e) => r("update:image", null)
			}, null, 8, ["label"]))], 2)], 2)]),
			_: 1
		}, 8, [
			"label",
			"hint",
			"error"
		])) : h("", !0);
	}
}), it = ["data-editing"], at = "solo, full body, standing, simple background, white background", ot = /* @__PURE__ */ p({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(t) {
		let n = t, { t: r } = A(), a = O(() => i.map((e) => ({
			key: e,
			label: Xe(r, e),
			kind: "tags"
		}))), o = O(() => [{
			key: "owner_label",
			label: r("assets.outfits.character_label")
		}, {
			key: "scope_label",
			label: r("assets.scope_label")
		}]), { visible: s } = Ge(() => n.records, () => ({
			this_chat: r("assets.chat_scope_label"),
			other_chat: (e) => r("assets.other_chat_scope_label", { chat: e })
		}), () => n.showAllChats), u = O(() => s.value.map((e) => {
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
		let { visible: p } = Ge(() => n.characterRecords, () => ({
			this_chat: r("assets.chat_scope_label"),
			other_chat: (e) => r("assets.other_chat_scope_label", { chat: e })
		})), m = Z("outfit", n.controller, () => a.value, () => r("errors.validation_required"), [
			"character_id",
			"origin",
			"chat_id",
			"preview_image"
		], { preview_image: "preview_thumbnail" }), v = O(() => typeof m.values.preview_image == "string" && m.values.preview_image !== "" ? m.values.preview_image : null);
		function y(e) {
			e === null ? Reflect.deleteProperty(m.values, "preview_image") : m.values.preview_image = e;
		}
		let x = {
			girl: "1girl",
			boy: "1boy"
		};
		function S() {
			let t = n.characterRecords.find((e) => e.id === m.values.character_id);
			return {
				positive_prompt: [
					t === void 0 ? "" : x[String(t.payload.subject)] ?? "",
					at,
					...i.flatMap((t) => e(m.values[t]))
				].filter((e) => e !== "").join(", "),
				negative_prompt: ""
			};
		}
		let w = O(() => typeof m.values.chat_id == "string" && m.values.chat_id !== "");
		async function E() {
			m.values.chat_id = "", await m.save();
		}
		let D = O(() => p.value.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), j = O(() => {
			let e = m.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function M(e) {
			m.values.character_id = e;
		}
		return (e, n) => (c(), N("div", {
			class: k(b(Y).assetsBody),
			"data-editing": b(m).dialog_open.value ? "" : void 0
		}, [C("div", { class: k(b(Y).assetsMain) }, [_(X, {
			"active-id": b(m).dialog_open.value ? b(m).record_id.value : null,
			describe: f,
			records: u.value,
			"summary-fields": o.value,
			loading: t.loading,
			"search-label": b(r)("common.actions.search"),
			"search-placeholder": b(r)("common.actions.search"),
			"empty-title": b(r)("assets.outfits.empty_title"),
			"empty-description": b(r)("assets.outfits.empty_description"),
			"add-label": b(r)("assets.outfits.add_action"),
			"random-label": b(r)("assets.random_selection_action"),
			"reorder-hint": b(r)("assets.reorder_hint"),
			"edit-label": b(r)("common.actions.edit"),
			"delete-confirm-description": b(r)("assets.delete_confirm_description"),
			"confirm-label": b(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": b(r)("confirmations.destructive.default_cancel_action"),
			onAdd: b(m).open_create,
			onEdit: b(m).open_edit,
			onDeleteMany: n[0] ||= (e) => void b(m).remove_many(e),
			onReorder: b(m).reorder,
			onRandomSelect: b(m).random_select
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
		])], 2), _(We, {
			open: b(m).dialog_open.value,
			title: b(m).editing_record.value ? b(m).editing_record.value.display_name : b(r)("assets.outfits.add_action"),
			description: b(r)("assets.form_dialog_description"),
			thumbnail: b(m).thumbnail("preview_image"),
			"close-label": b(r)("common.actions.close"),
			"onUpdate:open": n[3] ||= (e) => {
				e || b(m).close_dialog();
			}
		}, {
			default: l(() => [_(ie, {
				"name-label": b(r)("common.labels.name"),
				"name-placeholder": b(r)("common.labels.name"),
				name: b(m).name.value,
				"name-error": b(m).name_error.value,
				"save-error": b(m).save_error.value,
				fields: a.value,
				values: b(m).values,
				"save-label": b(r)("common.actions.save"),
				"cancel-label": b(r)("common.actions.cancel"),
				"decrement-label": b(r)("common.actions.decrease"),
				"increment-label": b(r)("common.actions.increase"),
				pending: b(m).saving.value,
				"onUpdate:name": n[1] ||= (e) => {
					b(m).name.value = e;
				},
				"onUpdate:values": n[2] ||= (e) => b(ae)(b(m).values, e),
				onSave: b(m).save,
				onCancel: b(m).close_dialog
			}, {
				"leading-fields": l(() => [_(rt, {
					image: v.value,
					prompt: S,
					"onUpdate:image": y
				}, null, 8, ["image"])]),
				"extra-fields": l(() => [w.value ? (c(), N("p", {
					key: 0,
					class: k(b(Y).chat_scope_note)
				}, [P(g(b(r)("assets.chat_scope_note")) + " ", 1), _(B, {
					label: b(r)("assets.import_to_global_action"),
					onClick: E
				}, null, 8, ["label"])], 2)) : h("", !0), _(K, { label: b(r)("assets.outfits.character_label") }, {
					default: l(({ fieldId: e, describedBy: t }) => [_(V, T({
						id: e,
						"model-value": j.value,
						options: D.value,
						placeholder: b(r)("assets.outfits.character_placeholder")
					}, b(ye)({ describedBy: t }), { "onUpdate:modelValue": M }), null, 16, [
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
		])], 10, it));
	}
}), st = ["data-editing"], ct = ["id", "aria-describedby"], lt = "novelai", ut = "google", dt = /* @__PURE__ */ p({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = A(), r = O(() => [{
			value: lt,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: ut,
			label: n("assets.vibe.provider_google")
		}]), i = O(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return s.values.provider !== ut && e.push({
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
		}];
		function o(e) {
			let t = e.payload.image_thumbnail ?? e.payload.image, r = e.payload.strength;
			return {
				thumbnail: typeof t == "string" && t !== "" ? t : null,
				detail: typeof r == "number" ? `${n("assets.vibe.strength_label")} ${String(r)}` : ""
			};
		}
		let s = Z("vibe", t.controller, () => i.value, () => n("errors.validation_required"), ["provider", "image"], { image: "image_thumbnail" }), u = w(null), d = O(() => typeof s.values.image == "string" && s.values.image !== "" ? s.values.image : null);
		async function f(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				u.value = null;
				try {
					s.values.image = await Me(t);
				} catch {
					u.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let p = O(() => typeof s.values.provider == "string" && s.values.provider !== "" ? s.values.provider : lt);
		function m(e) {
			s.values.provider = e;
		}
		return (t, g) => (c(), N("div", {
			class: k(b(Y).assetsBody),
			"data-editing": b(s).dialog_open.value ? "" : void 0
		}, [C("div", { class: k(b(Y).assetsMain) }, [_(X, {
			"active-id": b(s).dialog_open.value ? b(s).record_id.value : null,
			describe: o,
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": b(n)("common.actions.search"),
			"search-placeholder": b(n)("common.actions.search"),
			"empty-title": b(n)("assets.vibe.empty_title"),
			"empty-description": b(n)("assets.vibe.empty_description"),
			"add-label": b(n)("assets.vibe.add_action"),
			"random-label": b(n)("assets.random_selection_action"),
			"reorder-hint": b(n)("assets.reorder_hint"),
			"edit-label": b(n)("common.actions.edit"),
			"delete-confirm-description": b(n)("assets.delete_confirm_description"),
			"confirm-label": b(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": b(n)("confirmations.destructive.default_cancel_action"),
			onAdd: b(s).open_create,
			onEdit: b(s).open_edit,
			onDeleteMany: g[0] ||= (e) => void b(s).remove_many(e),
			onReorder: b(s).reorder,
			onRandomSelect: b(s).random_select
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
		])], 2), _(We, {
			open: b(s).dialog_open.value,
			title: b(s).editing_record.value ? b(s).editing_record.value.display_name : b(n)("assets.vibe.add_action"),
			description: b(n)("assets.form_dialog_description"),
			"close-label": b(n)("common.actions.close"),
			"onUpdate:open": g[3] ||= (e) => {
				e || b(s).close_dialog();
			}
		}, {
			default: l(() => [_(ie, {
				"name-label": b(n)("common.labels.name"),
				"name-placeholder": b(n)("common.labels.name"),
				name: b(s).name.value,
				"name-error": b(s).name_error.value,
				"save-error": b(s).save_error.value,
				fields: i.value,
				values: b(s).values,
				"save-label": b(n)("common.actions.save"),
				"cancel-label": b(n)("common.actions.cancel"),
				"decrement-label": b(n)("common.actions.decrease"),
				"increment-label": b(n)("common.actions.increase"),
				pending: b(s).saving.value,
				"onUpdate:name": g[1] ||= (e) => {
					b(s).name.value = e;
				},
				"onUpdate:values": g[2] ||= (e) => b(ae)(b(s).values, e),
				onSave: b(s).save,
				onCancel: b(s).close_dialog
			}, {
				"extra-fields": l(() => [_(K, {
					label: b(n)("assets.vibe.image_label"),
					hint: b(n)("assets.vibe.image_hint"),
					error: u.value
				}, {
					default: l(({ fieldId: e, describedBy: t }) => [d.value === null ? h("", !0) : (c(), x(je, {
						key: 0,
						src: d.value,
						alt: b(n)("assets.vibe.image_label"),
						"image-class": b(Y).reference_thumbnail
					}, null, 8, [
						"src",
						"alt",
						"image-class"
					])), C("input", {
						id: e,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						"aria-describedby": t,
						"data-testid": "vibe-image-input",
						onChange: f
					}, null, 40, ct)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), _(K, { label: b(n)("assets.vibe.provider_label") }, {
					default: l(() => [_(Ee, {
						"model-value": p.value,
						options: r.value,
						label: b(n)("assets.vibe.provider_label"),
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
		])], 10, st));
	}
}), ft = { "data-testid": "vocabulary-installed" }, pt = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, mt = ["placeholder"], ht = ["aria-expanded"], gt = /* @__PURE__ */ p({
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
		let t = e, { t: n } = A();
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
		let i = w({ status: "loading" });
		async function a() {
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
		d(() => {
			a();
		});
		let o = w(!1);
		function u() {
			o.value = !0, t.controller.load_vocabulary_catalog();
		}
		let p = /nsfw|adult|explicit/iu;
		function v(e) {
			return p.test(e.package_id) || p.test(e.display_name.en) || p.test(e.display_name["zh-CN"]);
		}
		let S = O(() => t.catalog.filter((e) => !v(e))), T = O(() => t.catalog.filter((e) => v(e))), E = w(!1);
		function D(e) {
			return t.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let M = w(null), F = w(null);
		function I(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return n("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return n("assets.vocabulary.progress_downloading");
				case "verifying_package": return n("assets.vocabulary.progress_verifying_package");
				case "installing": return n("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function L(e) {
			M.value === null && (M.value = e.package_id, F.value = null, await t.controller.install_vocabulary_package(e, (e) => {
				F.value = I(e);
			}), M.value = null, F.value = null, t.controller.state.assets.vocabulary_install_command.status === "success" && (V.value = [], U.value = null, a(), R.value.trim() !== "" && await J()));
		}
		let R = w(""), V = w([]), U = w(null), re = w(!1), W = w(!1), G = w(!1), K = w(null), q = null;
		async function J() {
			let e = R.value.trim();
			if (e === "") {
				V.value = [], U.value = null;
				return;
			}
			re.value = !0, W.value = !1;
			try {
				let n = await t.controller.search_vocabulary(e);
				V.value = n.results, U.value = n.next_cursor;
			} catch {
				V.value = [], U.value = null, W.value = !0;
			} finally {
				re.value = !1;
			}
		}
		async function X() {
			if (U.value !== null) {
				G.value = !0;
				try {
					let e = await t.controller.load_more_vocabulary(U.value);
					V.value = [...V.value, ...e.results], U.value = e.next_cursor;
				} finally {
					G.value = !1;
				}
			}
		}
		s(R, () => {
			q !== null && clearTimeout(q), q = setTimeout(() => {
				J();
			}, 250);
		});
		async function Z(e) {
			await navigator.clipboard.writeText(e.display_text), K.value = e.record_id, setTimeout(() => {
				K.value === e.record_id && (K.value = null);
			}, 2e3);
		}
		let ie = O(() => t.loading ? "loading" : t.catalogFailure === null ? t.catalog.length === 0 ? "empty" : "ready" : "error"), ae = O(() => re.value && V.value.length === 0 ? "loading" : W.value ? "error" : R.value.trim() === "" || V.value.length > 0 ? "ready" : "empty");
		return (t, a) => (c(), N("div", { class: k(b(Y).vocabularyPanel) }, [
			C("section", ft, [C("p", { class: k(b(Y).sectionTitle) }, g(b(n)("assets.vocabulary.installed_title")), 3), i.value.status === "loading" ? (c(), N("p", {
				key: 0,
				class: k(b(Y).catalogEntryMeta)
			}, g(b(n)("assets.vocabulary.installed_preparing")), 3)) : i.value.status === "failed" ? (c(), N("p", {
				key: 1,
				class: k(b(Y).catalogEntryMeta)
			}, g(b(n)("assets.vocabulary.installed_failed")), 3)) : i.value.package === null ? (c(), N("p", {
				key: 2,
				class: k(b(Y).catalogEntryMeta)
			}, g(b(n)("assets.vocabulary.installed_none")), 3)) : (c(), N("div", {
				key: 3,
				class: k(b(Y).catalogEntry)
			}, [C("div", { class: k(b(Y).catalogEntryInfo) }, [C("span", { class: k(b(Y).catalogEntryName) }, g(i.value.package.package_id), 3), C("span", { class: k(["tc-tabular-nums", b(Y).catalogEntryMeta]) }, g(i.value.package.data_version) + " · " + g(b(n)("assets.vocabulary.tag_count", i.value.package.record_count)), 3)], 2)], 2))]),
			C("section", null, [
				C("p", { class: k(b(Y).sectionTitle) }, g(b(n)("assets.vocabulary.search_placeholder")), 3),
				C("div", { class: k(b(Y).vocabularySearchRow) }, [C("label", pt, g(b(n)("assets.vocabulary.search_placeholder")), 1), m(C("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": a[0] ||= (e) => R.value = e,
					type: "text",
					class: k(b(Y).searchInput),
					placeholder: b(n)("assets.vocabulary.search_placeholder")
				}, null, 10, mt), [[j, R.value]])], 2),
				_(ee, {
					status: ae.value,
					"empty-title": b(n)("assets.vocabulary.no_results_title"),
					"empty-message": b(n)("assets.vocabulary.no_results_description"),
					"error-message": b(n)("assets.vocabulary.search_failed"),
					"min-height": "60px"
				}, {
					default: l(() => [V.value.length > 0 ? (c(), N("ul", {
						key: 0,
						class: k(b(Y).searchResultsList)
					}, [(c(!0), N(y, null, f(V.value, (e) => (c(), N("li", {
						key: e.record_id,
						class: k(b(Y).searchResultRow)
					}, [
						C("span", { class: k(b(Y).searchResultTag) }, g(e.display_text), 3),
						e.category ? (c(), N("span", {
							key: 0,
							class: k(b(Y).searchResultTranslation)
						}, g(e.category), 3)) : h("", !0),
						_(B, {
							label: K.value === e.record_id ? b(n)("common.actions.copied") : b(n)("common.actions.copy"),
							icon: b(ne),
							variant: "secondary",
							onClick: () => void Z(e)
						}, null, 8, [
							"label",
							"icon",
							"onClick"
						])
					], 2))), 128))], 2)) : h("", !0)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
					"empty-message",
					"error-message"
				]),
				U.value === null ? h("", !0) : (c(), N("div", {
					key: 0,
					class: k(b(Y).loadMoreRow)
				}, [_(B, {
					label: b(n)("common.actions.next"),
					variant: "secondary",
					pending: G.value,
					onClick: a[1] ||= () => void X()
				}, null, 8, ["label", "pending"])], 2))
			]),
			C("section", null, [
				C("p", { class: k(b(Y).sectionTitle) }, g(b(n)("assets.vocabulary.updates_title")), 3),
				o.value ? (c(), x(ee, {
					key: 1,
					status: ie.value,
					"empty-title": b(n)("assets.vocabulary.no_updates_title"),
					"empty-message": b(n)("assets.vocabulary.no_updates_description"),
					"error-message": e.catalogFailure === null ? "" : r(e.catalogFailure.code, !1),
					"min-height": "80px"
				}, {
					default: l(() => [C("div", { class: k(b(Y).catalogList) }, [(c(!0), N(y, null, f(S.value, (e) => (c(), N("div", {
						key: e.package_id,
						class: k(b(Y).catalogEntry)
					}, [C("div", { class: k(b(Y).catalogEntryInfo) }, [C("span", { class: k(b(Y).catalogEntryName) }, g(D(e)), 3), C("span", { class: k(["tc-tabular-nums", b(Y).catalogEntryMeta]) }, g(b(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (c(), N("span", {
						key: 0,
						class: k(b(Y).bundledBadge)
					}, g(b(n)("assets.vocabulary.bundled_label")), 3)) : (c(), x(B, {
						key: 1,
						label: b(n)("assets.vocabulary.import_action"),
						icon: b(H),
						variant: "primary",
						pending: M.value === e.package_id,
						onClick: () => void L(e)
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
				])) : (c(), x(B, {
					key: 0,
					label: b(n)("assets.vocabulary.update_action"),
					variant: "secondary",
					"data-testid": "vocabulary-check-updates",
					onClick: u
				}, null, 8, ["label"])),
				M.value !== null && F.value !== null ? (c(), N("p", {
					key: 2,
					class: k(b(Y).installProgress)
				}, g(F.value), 3)) : h("", !0),
				e.installCommand.status === "error" ? (c(), N("p", {
					key: 3,
					class: k(b(Y).installProgress),
					role: "alert",
					"data-testid": "vocabulary-install-error"
				}, g(r(e.installCommand.failure.code, !0)), 3)) : h("", !0)
			]),
			T.value.length > 0 ? (c(), N("section", {
				key: 0,
				class: k(b(Y).nsfwSection)
			}, [C("button", {
				type: "button",
				class: k(["tc-interactive", b(Y).nsfwToggle]),
				"aria-expanded": E.value,
				onClick: a[2] ||= (e) => E.value = !E.value
			}, [_(z, {
				icon: E.value ? b(Ne) : b(te),
				size: 14
			}, null, 8, ["icon"]), P(" " + g(b(n)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, ht), E.value ? (c(), N("div", {
				key: 1,
				class: k(b(Y).catalogList)
			}, [C("p", { class: k(b(Y).nsfwNotice) }, g(b(n)("assets.vocabulary.nsfw_disclosure_hint")), 3), (c(!0), N(y, null, f(T.value, (e) => (c(), N("div", {
				key: e.package_id,
				class: k(b(Y).catalogEntry)
			}, [C("div", { class: k(b(Y).catalogEntryInfo) }, [C("span", { class: k(b(Y).catalogEntryName) }, g(D(e)), 3), C("span", { class: k(["tc-tabular-nums", b(Y).catalogEntryMeta]) }, g(b(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), _(B, {
				label: b(n)("assets.vocabulary.import_action"),
				icon: b(H),
				variant: "destructive",
				pending: M.value === e.package_id,
				onClick: () => void L(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (c(), N("p", {
				key: 0,
				class: k(b(Y).nsfwNotice)
			}, g(b(n)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : h("", !0)
		], 2));
	}
}), _t = ["data-editing"], vt = ["aria-label"], yt = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], bt = ["id", "value"], $ = "unmapped", xt = "\n", St = /* @__PURE__ */ p({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = A(), i = [{
			key: pe,
			label: "",
			kind: "textarea"
		}], a = Z("workflow", t.controller, () => i, () => n("errors.validation_required")), o = w(null), u = {
			inputs: {},
			output_node_ids: []
		}, d = w(u);
		function p() {
			let e = a.values[pe];
			return typeof e == "string" ? e : "";
		}
		let m = O(() => {
			try {
				return {
					workflow: ve(p()),
					error: null
				};
			} catch (e) {
				return {
					workflow: null,
					error: e instanceof he && e.reason === "not_api_format" ? n("assets.workflow.format_not_api") : n("assets.workflow.format_not_json")
				};
			}
		}), v = O(() => m.value.workflow === null ? [] : fe(m.value.workflow));
		function S(e) {
			let t = ge(e);
			return [{
				value: $,
				label: n("assets.workflow.unmapped")
			}, ...v.value.filter((e) => e.type === t).map((e) => ({
				value: `${e.node_id}${xt}${e.property}`,
				label: `${e.title} · ${e.property}`
			}))];
		}
		let T = O(() => [{
			value: $,
			label: n("assets.workflow.unmapped")
		}, ...(m.value.workflow === null ? [] : ce(m.value.workflow)).map((e) => ({
			value: e.node_id,
			label: e.title
		}))]);
		function D(e) {
			let t = d.value.inputs[e], n = t === void 0 ? $ : `${t.node_id}${xt}${t.property}`;
			return S(e).some((e) => e.value === n) ? n : $;
		}
		function j(e, t) {
			let n = { ...d.value.inputs }, [r, i] = t.split(xt);
			t === $ || r === void 0 || i === void 0 ? Reflect.deleteProperty(n, e) : n[e] = {
				node_id: r,
				property: i
			}, d.value = {
				...d.value,
				inputs: n
			};
		}
		let M = O(() => {
			let e = d.value.output_node_ids[0] ?? $;
			return T.value.some((t) => t.value === e) ? e : $;
		});
		function P(e) {
			d.value = {
				...d.value,
				output_node_ids: e === $ ? [] : [e]
			};
		}
		let F = O(() => me(d.value).map((e) => J(n, e)));
		s(() => a.editing_record.value, (e) => {
			if (!e) {
				d.value = u;
				return;
			}
			try {
				d.value = de(e.payload).mapping;
			} catch {
				d.value = u;
			}
		}, { immediate: !0 });
		function I() {
			d.value = m.value.workflow === null ? u : ue(m.value.workflow);
		}
		function L() {
			o.value?.click();
		}
		async function R(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			a.open_create(), a.name.value = n.name.replace(/\.json$/iu, ""), a.values[pe] = r, I();
		}
		async function z() {
			m.value.workflow !== null && (a.values[_e] = JSON.stringify(d.value), await a.save());
		}
		return (t, i) => (c(), N("div", {
			class: k(b(Y).assetsBody),
			"data-editing": b(a).dialog_open.value ? "" : void 0
		}, [C("div", { class: k(b(Y).assetsMain) }, [C("div", { class: k(b(Y).workflowToolbarRow) }, [_(B, {
			label: b(n)("assets.workflow.import_action"),
			icon: b(oe),
			variant: "primary",
			onClick: L
		}, null, 8, ["label", "icon"]), C("input", {
			ref_key: "file_input",
			ref: o,
			class: k(b(Y).hiddenFileInput),
			type: "file",
			accept: "application/json,.json",
			"aria-label": b(n)("assets.workflow.import_action"),
			onChange: i[0] ||= (e) => void R(e)
		}, null, 42, vt)], 2), _(X, {
			"active-id": b(a).dialog_open.value ? b(a).record_id.value : null,
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": b(n)("common.actions.search"),
			"search-placeholder": b(n)("common.actions.search"),
			"empty-title": b(n)("assets.workflow.empty_title"),
			"empty-description": b(n)("assets.workflow.empty_description"),
			"add-label": b(n)("assets.workflow.import_action"),
			"random-label": b(n)("assets.random_selection_action"),
			"reorder-hint": b(n)("assets.reorder_hint"),
			"edit-label": b(n)("assets.workflow.edit_action"),
			"delete-confirm-description": b(n)("assets.delete_confirm_description"),
			"confirm-label": b(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": b(n)("confirmations.destructive.default_cancel_action"),
			onAdd: L,
			onEdit: b(a).open_edit,
			onDeleteMany: i[1] ||= (e) => void b(a).remove_many(e),
			onReorder: b(a).reorder,
			onRandomSelect: b(a).random_select
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
		])], 2), _(We, {
			open: b(a).dialog_open.value,
			title: b(n)("assets.workflow.edit_action"),
			description: b(n)("assets.form_dialog_description"),
			"close-label": b(n)("common.actions.close"),
			"onUpdate:open": i[5] ||= (e) => {
				e || b(a).close_dialog();
			}
		}, {
			default: l(() => [C("form", {
				class: k(b(Y).form),
				onSubmit: i[4] ||= E(() => void z(), ["prevent"])
			}, [
				_(K, {
					label: b(n)("common.labels.name"),
					error: b(a).name_error.value,
					required: ""
				}, {
					default: l(({ fieldId: e, describedBy: t, invalid: r }) => [C("input", {
						id: e,
						class: k(b(Y).textInput),
						type: "text",
						placeholder: b(n)("common.labels.name"),
						value: b(a).name.value,
						"aria-describedby": t,
						"aria-invalid": r,
						onInput: i[2] ||= (e) => b(a).name.value = e.target.value
					}, null, 42, yt)]),
					_: 1
				}, 8, ["label", "error"]),
				_(K, { label: b(n)("assets.workflow.json_label") }, {
					default: l(({ fieldId: e }) => [C("textarea", {
						id: e,
						class: k([b(Y).textArea, b(Y).codeTextArea]),
						value: p(),
						onInput: i[3] ||= (e) => b(a).values[b("workflow_json")] = e.target.value
					}, null, 42, bt)]),
					_: 1
				}, 8, ["label"]),
				m.value.error === null ? h("", !0) : (c(), N("p", {
					key: 0,
					class: k(b(Y).formError),
					role: "alert"
				}, g(m.value.error), 3)),
				m.value.workflow === null ? h("", !0) : (c(), N(y, { key: 1 }, [
					_(B, {
						label: b(n)("assets.workflow.detect_action"),
						icon: b(q),
						variant: "secondary",
						type: "button",
						onClick: I
					}, null, 8, ["label", "icon"]),
					C("p", { class: k(b(Y).editorDescription) }, g(b(n)("assets.workflow.mapping_hint")), 3),
					C("div", { class: k(b(Y).mappingList) }, [(c(!0), N(y, null, f(b(le), (e) => (c(), N("div", {
						key: e,
						class: k(b(Y).mappingRow)
					}, [C("span", { class: k(b(Y).mappingKey) }, g(b(J)(b(n), e)), 3), (c(), x(V, {
						key: `${b(r)}:${e}`,
						"model-value": D(e),
						options: S(e),
						placeholder: b(n)("assets.workflow.unmapped"),
						ariaLabel: b(J)(b(n), e),
						"onUpdate:modelValue": (t) => j(e, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128)), C("div", { class: k(b(Y).mappingRow) }, [C("span", { class: k(b(Y).mappingKey) }, g(b(J)(b(n), "output")), 3), (c(), x(V, {
						key: `${b(r)}:output`,
						"model-value": M.value,
						options: T.value,
						placeholder: b(n)("assets.workflow.unmapped"),
						ariaLabel: b(J)(b(n), "output"),
						"onUpdate:modelValue": P
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel"
					]))], 2)], 2),
					F.value.length > 0 ? (c(), N("p", {
						key: 0,
						class: k(b(Y).formError),
						role: "alert"
					}, g(b(n)("assets.workflow.mapping_missing", { names: F.value.join(", ") })), 3)) : h("", !0)
				], 64)),
				C("div", { class: k(b(Y).formActions) }, [_(B, {
					label: b(n)("common.actions.cancel"),
					variant: "ghost",
					type: "button",
					onClick: b(a).close_dialog
				}, null, 8, ["label", "onClick"]), _(B, {
					label: b(n)("common.actions.save"),
					variant: "primary",
					type: "submit",
					pending: b(a).saving.value,
					disabled: m.value.workflow === null
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				])], 2)
			], 34)]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])], 10, _t));
	}
}), Ct = /* @__PURE__ */ p({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = A(), i = [
			"character",
			"outfit",
			"lora",
			"vibe",
			"workflow"
		], a = w(t.state.assets.active_category), s = w(!1), u = o(L, w(null));
		function d(e) {
			a.value = e, i.includes(String(e)) && t.controller.set_active_asset_category(e);
		}
		function p(e) {
			let t = e.chat_id;
			return typeof t == "string" && t !== "" && t !== u.value;
		}
		function m(e) {
			let n = t.state.assets.records[e];
			return s.value ? n.length : n.filter((e) => !p(e.payload)).length;
		}
		let v = O(() => [...t.state.assets.records.character, ...t.state.assets.records.outfit].some((e) => p(e.payload))), x = O(() => ({
			character: n("assets.tabs.characters"),
			outfit: n("assets.tabs.outfits"),
			lora: n("assets.tabs.lora"),
			vibe: n("assets.tabs.vibe"),
			workflow: n("assets.tabs.workflow")
		})), S = O(() => t.state.loading.has("assets")), C = O(() => t.state.loading.has("vocabulary")), T = O(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (c(), N("div", { class: k(b(Y).assetsView) }, [_(b(Ie), {
			"model-value": a.value,
			class: k(b(Y).tabsRoot),
			"onUpdate:modelValue": d
		}, {
			default: l(() => [
				_(b(ze), {
					class: k(b(Y).tabsList),
					"aria-label": b(n)("nav.assets")
				}, {
					default: l(() => [(c(), N(y, null, f(i, (e) => _(b(Be), {
						key: e,
						value: e,
						class: k(b(Y).tabsTrigger)
					}, {
						default: l(() => [P(g(x.value[e]) + " ", 1), S.value ? h("", !0) : (c(), N("span", {
							key: 0,
							class: k([b(Y).tabsCount, "tc-tabular-nums"])
						}, g(m(e)), 3))]),
						_: 2
					}, 1032, ["value", "class"])), 64)), _(b(Be), {
						value: "vocabulary",
						class: k(b(Y).tabsTrigger)
					}, {
						default: l(() => [P(g(b(n)("assets.tabs.vocabulary")), 1)]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				v.value && (a.value === "character" || a.value === "outfit") ? (c(), N("div", {
					key: 0,
					class: k(b(Y).scopeSwitch)
				}, [_(Ae, {
					modelValue: s.value,
					"onUpdate:modelValue": r[0] ||= (e) => s.value = e,
					label: b(n)("assets.show_all_chats_label")
				}, null, 8, ["modelValue", "label"])], 2)) : h("", !0),
				_(b(Q), {
					value: "character",
					class: k(b(Y).tabsContent)
				}, {
					default: l(() => [_(et, {
						records: e.state.assets.records.character,
						"outfit-records": e.state.assets.records.outfit,
						loading: S.value,
						controller: e.controller,
						"show-all-chats": s.value
					}, null, 8, [
						"records",
						"outfit-records",
						"loading",
						"controller",
						"show-all-chats"
					])]),
					_: 1
				}, 8, ["class"]),
				_(b(Q), {
					value: "outfit",
					class: k(b(Y).tabsContent)
				}, {
					default: l(() => [_(ot, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: S.value,
						controller: e.controller,
						"show-all-chats": s.value
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller",
						"show-all-chats"
					])]),
					_: 1
				}, 8, ["class"]),
				_(b(Q), {
					value: "lora",
					class: k(b(Y).tabsContent)
				}, {
					default: l(() => [_(nt, {
						records: e.state.assets.records.lora,
						"character-records": e.state.assets.records.character,
						loading: S.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				_(b(Q), {
					value: "vibe",
					class: k(b(Y).tabsContent)
				}, {
					default: l(() => [_(dt, {
						records: e.state.assets.records.vibe,
						loading: S.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				_(b(Q), {
					value: "workflow",
					class: k(b(Y).tabsContent)
				}, {
					default: l(() => [_(St, {
						records: e.state.assets.records.workflow,
						loading: S.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				_(b(Q), {
					value: "vocabulary",
					class: k([b(Y).tabsContent, b(Y).vocabularyContent])
				}, {
					default: l(() => [_(gt, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						"catalog-failure": e.state.failures.get("vocabulary") ?? null,
						loading: C.value,
						controller: e.controller,
						locale: T.value
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
export { Ct as default };
