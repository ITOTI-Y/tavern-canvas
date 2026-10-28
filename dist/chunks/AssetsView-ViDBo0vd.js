import { a as e, i as t, n, o as r, s as i } from "./wardrobe_library-cpT1rkQA.js";
import { A as a, D as o, G as s, H as c, I as l, K as u, L as d, O as f, P as p, T as m, _ as h, a as g, c as _, dt as v, g as y, h as b, j as x, lt as S, m as C, mt as w, n as T, ot as E, p as D, pt as O, rt as k, s as A, tt as j, u as M, v as N, x as P, y as F } from "./vue-i18n-L-BrQRnK.js";
import { r as I, t as L } from "./portal_keys-DthxrmWp.js";
import { n as R, t as z } from "./AppIcon-DkyxvN8k.js";
import { n as B, t as ee } from "./StateSurface-X9aRtXAT.js";
import { n as te, t as V } from "./AppSelect-D-2VXU1J.js";
import { n as ne, t as H } from "./download-B0Y9EiOz.js";
import { t as U } from "./image-plus-D7OOsWBN.js";
import { n as W, r as G, t as K } from "./AppCheckbox-qcV3D_N_.js";
import { t as q } from "./FieldGroup-CViCiHLn.js";
import { n as J, t as re } from "./AppSwitch-DeEYCZzD.js";
import { a as Y, i as X, n as Z, r as Q, t as ie } from "./use_asset_category_panel-CawmA-00.js";
import { t as ae } from "./upload-BjktsLMj.js";
import { t as oe } from "./x-D7Ry5i_D.js";
import { t as se } from "./_prop_utils-O1SzpV_h.js";
import { P as ce, S as le, f as ue, l as de, s as fe, u as pe } from "./Teleport-CquQcgiX.js";
import { n as me } from "./NumberStepper-CeqkgodA.js";
import { c as he } from "./PopperContent-BPSDCuaj.js";
import { t as ge } from "./ConfirmDialog-DASvEQUq.js";
import { t as _e } from "./IconButton-4U1H-LPK.js";
import { n as ve } from "./reference_image-B8V-aXPW.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/chevron-up.js
var ye = R("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), [be, xe] = /*#__PURE__*/ ce("TabsRoot"), Se = /* @__PURE__ */ P({
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
		let n = e, r = t, { orientation: i, unmountOnHide: a, dir: o } = E(n), c = he(o);
		ue();
		let l = le(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), u = j(), f = k(/* @__PURE__ */ new Set());
		return xe({
			modelValue: l,
			changeModelValue: (e) => {
				l.value = e;
			},
			orientation: i,
			dir: c,
			unmountOnHide: a,
			activationMode: n.activationMode,
			baseId: pe(void 0, "reka-tabs"),
			tabsList: u,
			contentIds: f,
			registerContent: (e) => {
				f.value = /* @__PURE__ */ new Set([...f.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(f.value);
				t.delete(e), f.value = t;
			}
		}), (e, t) => (p(), b(S(fe), {
			dir: S(c),
			"data-orientation": S(i),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: s(() => [d(e.$slots, "default", { modelValue: S(l) })]),
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
function Ce(e, t) {
	return `${e}-trigger-${t}`;
}
function we(e, t) {
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
		let t = e, { forwardRef: n } = ue(), r = be(), i = D(() => Ce(r.baseId, t.value)), o = D(() => we(r.baseId, t.value)), c = D(() => t.value === r.modelValue.value), l = j(c.value);
		return x(() => {
			r.registerContent(t.value), requestAnimationFrame(() => {
				l.value = !1;
			});
		}), a(() => {
			r.unregisterContent(t.value);
		}), (e, t) => (p(), b(S(de), {
			present: e.forceMount || c.value,
			"force-mount": ""
		}, {
			default: s(({ present: t }) => [F(S(fe), {
				id: o.value,
				ref: S(n),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": c.value ? "active" : "inactive",
				"data-orientation": S(r).orientation.value,
				"aria-labelledby": i.value,
				hidden: !t,
				tabindex: "0",
				style: O({ animationDuration: l.value ? "0s" : void 0 })
			}, {
				default: s(() => [!S(r).unmountOnHide.value || t ? d(e.$slots, "default", { key: 0 }) : y("v-if", !0)]),
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
}), Te = /* @__PURE__ */ P({
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
		let { loop: t } = E(e), { forwardRef: n, currentElement: r } = ue(), i = be();
		return i.tabsList = r, (e, r) => (p(), b(S(G), {
			"as-child": "",
			orientation: S(i).orientation.value,
			dir: S(i).dir.value,
			loop: S(t)
		}, {
			default: s(() => [F(S(fe), {
				ref: S(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": S(i).orientation.value
			}, {
				default: s(() => [d(e.$slots, "default")]),
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
}), Ee = /* @__PURE__ */ P({
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
		let t = e, { forwardRef: n } = ue(), r = be(), i = D(() => Ce(r.baseId, t.value)), a = D(() => r.contentIds.value.has(t.value) ? we(r.baseId, t.value) : void 0), o = D(() => t.value === r.modelValue.value);
		return (e, t) => (p(), b(S(W), {
			"as-child": "",
			focusable: !e.disabled,
			active: o.value
		}, {
			default: s(() => [F(S(fe), {
				id: i.value,
				ref: S(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": o.value ? "true" : "false",
				"aria-controls": a.value,
				"data-state": o.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": S(r).orientation.value,
				onMousedown: t[0] ||= _((t) => {
					!e.disabled && t.ctrlKey === !1 ? S(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= A((t) => S(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = S(r).activationMode !== "manual";
					!o.value && !e.disabled && t && S(r).changeModelValue(e.value);
				}
			}, {
				default: s(() => [d(e.$slots, "default")]),
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
}), De = ["aria-label"], Oe = ["data-empty"], ke = ["src"], Ae = /* @__PURE__ */ P({
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
		let n = e, r = t, i = j(null);
		return c(() => n.open, async (e) => {
			e && (await f(), i.value?.focus({ preventScroll: !0 }), i.value?.scrollIntoView({ block: "nearest" }));
		}), (t, n) => e.open ? (p(), h("aside", {
			key: 0,
			ref_key: "root",
			ref: i,
			class: v(S(Y).editor),
			"aria-label": e.title,
			tabindex: "-1",
			"data-testid": "asset-editor",
			onKeydown: n[1] ||= A((e) => r("update:open", !1), ["esc"])
		}, [C("header", { class: v(S(Y).editorHead) }, [
			e.thumbnail === void 0 ? y("", !0) : (p(), h("span", {
				key: 0,
				class: v(S(Y).editorThumb),
				"data-empty": e.thumbnail === null ? "" : void 0
			}, [e.thumbnail === null ? y("", !0) : (p(), h("img", {
				key: 0,
				src: e.thumbnail,
				alt: ""
			}, null, 8, ke))], 10, Oe)),
			C("div", { class: v(S(Y).editorHeading) }, [C("h3", { class: v(S(Y).editorTitle) }, w(e.title), 3), C("p", { class: v(S(Y).editorDescription) }, w(e.description), 3)], 2),
			F(_e, {
				icon: S(oe),
				label: e.closeLabel,
				onClick: n[0] ||= (e) => r("update:open", !1)
			}, null, 8, ["icon", "label"])
		], 2), C("div", { class: v(S(Y).editorBody) }, [d(t.$slots, "default")], 2)], 42, De)) : y("", !0);
	}
});
//#endregion
//#region src/ui/views/assets/chat_scope.ts
function je(e, t, n = () => !1) {
	let r = m(L, j(null));
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
var Me = ["src", "alt"], Ne = ["id"], Pe = ["id"], Fe = /* @__PURE__ */ P({
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
		let n = e, r = t, { t: i } = T(), a = m(I, null), o = j(null), c = j(null), l = j(!1), d = j(!1), f = j(""), _ = j(""), x = D(() => [
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
		async function E(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", n === void 0) return;
			c.value = null;
			let a;
			try {
				a = await ve(n);
			} catch {
				c.value = i("assets.characters.reference_image_unreadable");
				return;
			}
			r("update:image", a), r("uploaded", a);
		}
		function O() {
			f.value = n.defaultPrompt.positive_prompt, _.value = n.defaultPrompt.negative_prompt, c.value = null, l.value = !0;
		}
		async function k() {
			if (a !== null) {
				d.value = !0, c.value = null;
				try {
					let e = await a.generate({
						positive_prompt: f.value,
						negative_prompt: _.value
					}), t = await ve(e);
					r("update:image", t), r("generated", t), l.value = !1;
				} catch (e) {
					c.value = i("assets.characters.reference_generate_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					d.value = !1;
				}
			}
		}
		return (t, n) => (p(), h(M, null, [
			F(q, {
				label: S(i)("assets.characters.reference_image_label"),
				hint: S(i)("assets.characters.reference_image_hint"),
				error: c.value
			}, {
				default: s(() => [C("div", { class: v(S(Y).reference) }, [e.image === null ? y("", !0) : (p(), h("img", {
					key: 0,
					src: e.image,
					alt: S(i)("assets.characters.reference_image_label"),
					class: v(S(Y).reference_thumbnail)
				}, null, 10, Me)), C("div", { class: v(S(Y).reference_actions) }, [
					C("input", {
						ref_key: "file_input",
						ref: o,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						hidden: "",
						"data-testid": "character-reference-input",
						onChange: E
					}, null, 544),
					F(B, {
						label: S(i)("assets.characters.reference_upload"),
						onClick: n[0] ||= (e) => o.value?.click()
					}, null, 8, ["label"]),
					S(a) === null ? y("", !0) : (p(), b(B, {
						key: 0,
						label: S(i)("assets.characters.reference_generate"),
						disabled: l.value,
						"data-testid": "character-reference-generate",
						onClick: O
					}, null, 8, ["label", "disabled"])),
					e.image === null ? y("", !0) : (p(), b(B, {
						key: 1,
						label: S(i)("assets.characters.reference_image_remove"),
						onClick: n[1] ||= (e) => r("update:image", null)
					}, null, 8, ["label"]))
				], 2)], 2)]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			l.value ? (p(), h("div", {
				key: 0,
				class: v(S(Y).reference_composer)
			}, [
				C("p", { class: v(S(Y).chat_scope_note) }, w(S(i)("assets.characters.reference_generate_hint")), 3),
				F(q, { label: S(i)("assets.characters.reference_prompt_label") }, {
					default: s(({ fieldId: e }) => [u(C("textarea", {
						id: e,
						"onUpdate:modelValue": n[2] ||= (e) => f.value = e,
						class: v(S(Y).textArea)
					}, null, 10, Ne), [[g, f.value]])]),
					_: 1
				}, 8, ["label"]),
				F(q, { label: S(i)("assets.characters.reference_negative_label") }, {
					default: s(({ fieldId: e }) => [u(C("textarea", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => _.value = e,
						class: v(S(Y).textArea)
					}, null, 10, Pe), [[g, _.value]])]),
					_: 1
				}, 8, ["label"]),
				C("div", { class: v(S(Y).reference_actions) }, [F(B, {
					label: S(i)("common.actions.cancel"),
					onClick: n[4] ||= (e) => l.value = !1
				}, null, 8, ["label"]), F(B, {
					label: e.image === null ? S(i)("assets.characters.reference_generate_submit") : S(i)("assets.characters.reference_regenerate_submit"),
					variant: "primary",
					pending: d.value,
					"data-testid": "character-reference-submit",
					onClick: k
				}, null, 8, ["label", "pending"])], 2)
			], 2)) : y("", !0),
			e.image === null ? y("", !0) : (p(), h(M, { key: 1 }, [F(K, {
				"model-value": e.send,
				label: S(i)("assets.characters.reference_send_label"),
				"onUpdate:modelValue": n[5] ||= (e) => r("update:send", e)
			}, null, 8, ["model-value", "label"]), F(q, {
				label: S(i)("assets.characters.reference_mode_label"),
				hint: S(i)("assets.characters.reference_mode_hint")
			}, {
				default: s(() => [F(me, {
					"model-value": e.mode,
					options: x.value,
					label: S(i)("assets.characters.reference_mode_label"),
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
	setup(a) {
		let c = a, { t: l } = T(), { visible: u } = je(() => c.records, () => ({
			this_chat: l("assets.chat_scope_label"),
			other_chat: (e) => l("assets.other_chat_scope_label", { chat: e })
		}), () => c.showAllChats), d = D(() => [
			{
				key: "aliases",
				label: l("assets.characters.aliases_label"),
				kind: "text",
				hint: l("assets.characters.aliases_hint")
			},
			...r.map((e) => ({
				key: e,
				label: Ie(l, e),
				kind: "tags"
			})),
			{
				key: "excluded_traits",
				label: l("assets.characters.excluded_traits_label"),
				kind: "tags",
				hint: l("assets.characters.excluded_traits_hint")
			}
		]), f = D(() => [{
			key: "scope_label",
			label: l("assets.scope_label")
		}]), g = Z("character", c.controller, () => d.value, () => l("errors.validation_required"), [
			"subject",
			"default_outfit_id",
			"reference_image",
			"reference_send",
			"reference_mode",
			"origin",
			"locked_fields",
			"chat_id",
			"created_from_message_id"
		], { reference_image: "reference_thumbnail" }), _ = D(() => [
			{
				value: "girl",
				label: l("assets.characters.subject_girl")
			},
			{
				value: "boy",
				label: l("assets.characters.subject_boy")
			},
			{
				value: "other",
				label: l("assets.characters.subject_other")
			}
		]), b = D(() => g.values.subject === "boy" || g.values.subject === "other" ? g.values.subject : "girl"), x = D(() => {
			let e = g.record_id.value;
			return [{
				value: ze,
				label: l("assets.characters.default_outfit_first")
			}, ...c.outfitRecords.filter((t) => {
				let n = t.payload.character_id;
				return typeof n != "string" || n === "" || n === e;
			}).map((e) => ({
				value: e.id,
				label: e.display_name
			}))];
		}), E = D(() => typeof g.values.default_outfit_id == "string" && g.values.default_outfit_id !== "" ? g.values.default_outfit_id : ze), O = D(() => typeof g.values.chat_id == "string" && g.values.chat_id !== ""), k = D(() => typeof g.values.reference_image == "string" && g.values.reference_image !== "" ? g.values.reference_image : null), A = D(() => g.values.reference_mode === "img2img" || g.values.reference_mode === "precise" ? g.values.reference_mode : "vibe");
		function M(e) {
			if (e === null) {
				for (let e of [
					"reference_image",
					"reference_send",
					"reference_mode"
				]) Reflect.deleteProperty(g.values, e);
				return;
			}
			g.values.reference_image = e, g.values.reference_mode = A.value;
		}
		let P = m(I, null), L = j(null), R = j(!1), z = j(null);
		function ee(e) {
			c.outfitRecords.some((e) => e.payload.character_id === g.record_id.value) || (L.value = e);
		}
		async function te(e) {
			let t = crypto.randomUUID();
			await c.controller.save_asset("outfit", {
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
			let e = L.value;
			if (e !== null && P !== null) {
				R.value = !0, z.value = null;
				try {
					await te(await P.read_outfit(e));
				} catch (e) {
					z.value = l("assets.characters.outfit_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					R.value = !1, L.value = null;
				}
			}
		}
		let H = j(null), U = j(!1);
		function W(e) {
			P !== null && (H.value = e);
		}
		async function G() {
			let t = H.value;
			if (t !== null && P !== null) {
				U.value = !0, z.value = null;
				try {
					let i = await P.read_character(t);
					for (let t of r) {
						let r = i.appearance[t];
						r !== void 0 && e(g.values[t]).length === 0 && (g.values[t] = n(r));
					}
					g.values.subject !== "girl" && g.values.subject !== "boy" && (g.values.subject = i.subject), i.outfit !== null && await te(i.outfit);
				} catch (e) {
					z.value = l("assets.characters.character_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					U.value = !1, H.value = null;
				}
			}
		}
		let K = {
			girl: "1girl",
			boy: "1boy",
			other: ""
		};
		function J(e, t) {
			let n = e.payload[t];
			return typeof n == "string" ? n : "";
		}
		function re(e) {
			return l(e === "boy" ? "assets.characters.subject_boy" : e === "other" ? "assets.characters.subject_other" : "assets.characters.subject_girl");
		}
		function ae(t) {
			let n = J(t, "reference_thumbnail") || J(t, "reference_image");
			return {
				thumbnail: n === "" ? null : n,
				subtitle: re(J(t, "subject")),
				detail: [e(J(t, "aliases")).join("、"), J(t, "scope_label")].filter((e) => e !== "").join(" · "),
				tags: r.flatMap((n) => e(J(t, n)))
			};
		}
		let oe = D(() => {
			let e = g.record_id.value, n = c.outfitRecords.map(t), r = n.find((e) => e.id === g.values.default_outfit_id) ?? n.find((t) => t.character_id === e);
			return r === void 0 ? [] : i.flatMap((e) => r.slots[e]);
		}), ce = D(() => ({
			positive_prompt: n([
				K[b.value],
				Be,
				...r.flatMap((t) => e(g.values[t])),
				...oe.value
			].filter((e) => e !== "")),
			negative_prompt: n(e(g.values.excluded_traits))
		}));
		async function le() {
			let t = g.editing_record.value?.payload ?? {}, n = r.filter((n) => e(g.values[n]).join(",") !== e(typeof t[n] == "string" ? t[n] : "").join(",")), i = /* @__PURE__ */ new Set([...e(g.values.locked_fields), ...n]);
			g.values.locked_fields = [...i].join(", "), g.values.origin = typeof g.values.origin == "string" ? g.values.origin : "user", await g.save();
		}
		async function ue() {
			g.values.chat_id = "", await le();
		}
		return (e, t) => (p(), h("div", {
			class: v(S(Y).assetsBody),
			"data-editing": S(g).dialog_open.value ? "" : void 0
		}, [
			C("div", { class: v(S(Y).assetsMain) }, [F(X, {
				"active-id": S(g).dialog_open.value ? S(g).record_id.value : null,
				describe: ae,
				records: S(u),
				"summary-fields": f.value,
				loading: a.loading,
				"search-label": S(l)("common.actions.search"),
				"search-placeholder": S(l)("common.actions.search"),
				"empty-title": S(l)("assets.characters.empty_title"),
				"empty-description": S(l)("assets.characters.empty_description"),
				"add-label": S(l)("assets.characters.add_action"),
				"random-label": S(l)("assets.random_selection_action"),
				"reorder-hint": S(l)("assets.reorder_hint"),
				"edit-label": S(l)("common.actions.edit"),
				"delete-confirm-description": S(l)("assets.delete_confirm_description"),
				"confirm-label": S(l)("confirmations.destructive.default_confirm_action"),
				"cancel-label": S(l)("confirmations.destructive.default_cancel_action"),
				onAdd: S(g).open_create,
				onEdit: S(g).open_edit,
				onDeleteMany: t[0] ||= (e) => void S(g).remove_many(e),
				onReorder: S(g).reorder,
				onRandomSelect: S(g).random_select
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
			F(Ae, {
				open: S(g).dialog_open.value,
				title: S(g).editing_record.value ? S(g).editing_record.value.display_name : S(l)("assets.characters.add_action"),
				description: S(g).editing_record.value ? S(l)("assets.characters.editor_description", { name: S(g).editing_record.value.display_name }) : S(l)("assets.form_dialog_description"),
				thumbnail: S(g).thumbnail("reference_image"),
				"close-label": S(l)("common.actions.close"),
				"onUpdate:open": t[7] ||= (e) => {
					e || S(g).close_dialog();
				}
			}, {
				default: s(() => [F(Q, {
					"name-label": S(l)("common.labels.name"),
					"name-placeholder": S(l)("common.labels.name"),
					name: S(g).name.value,
					"name-error": S(g).name_error.value,
					"save-error": S(g).save_error.value,
					fields: d.value,
					values: S(g).values,
					"save-label": S(l)("common.actions.save"),
					"cancel-label": S(l)("common.actions.cancel"),
					"decrement-label": S(l)("common.actions.decrease"),
					"increment-label": S(l)("common.actions.increase"),
					pending: S(g).saving.value,
					"onUpdate:name": t[5] ||= (e) => {
						S(g).name.value = e;
					},
					"onUpdate:values": t[6] ||= (e) => S(ie)(S(g).values, e),
					onSave: le,
					onCancel: S(g).close_dialog
				}, {
					"leading-fields": s(() => [
						F(Fe, {
							image: k.value,
							send: S(g).values.reference_send === 1,
							mode: A.value,
							"default-prompt": ce.value,
							"onUpdate:image": M,
							"onUpdate:send": t[1] ||= (e) => S(g).values.reference_send = +!!e,
							"onUpdate:mode": t[2] ||= (e) => S(g).values.reference_mode = e,
							onGenerated: ee,
							onUploaded: W
						}, null, 8, [
							"image",
							"send",
							"mode",
							"default-prompt"
						]),
						z.value === null ? y("", !0) : (p(), h("p", {
							key: 0,
							class: v(S(Y).formError),
							role: "alert"
						}, w(z.value), 3)),
						F(q, { label: S(l)("assets.characters.subject_label") }, {
							default: s(() => [F(me, {
								"model-value": b.value,
								options: _.value,
								label: S(l)("assets.characters.subject_label"),
								"onUpdate:modelValue": t[3] ||= (e) => S(g).values.subject = e
							}, null, 8, [
								"model-value",
								"options",
								"label"
							])]),
							_: 1
						}, 8, ["label"])
					]),
					"extra-fields": s(() => [O.value ? (p(), h("p", {
						key: 0,
						class: v(S(Y).chat_scope_note)
					}, [N(w(S(l)("assets.chat_scope_note")) + " ", 1), F(B, {
						label: S(l)("assets.import_to_global_action"),
						"data-testid": "import-to-global",
						onClick: ue
					}, null, 8, ["label"])], 2)) : y("", !0), F(q, { label: S(l)("assets.characters.default_outfit_label") }, {
						default: s(({ fieldId: e, describedBy: n }) => [F(V, o({
							id: e,
							"model-value": E.value,
							options: x.value,
							placeholder: S(l)("assets.characters.default_outfit_label")
						}, S(se)({ describedBy: n }), { "onUpdate:modelValue": t[4] ||= (e) => S(g).values.default_outfit_id = e === ze ? "" : e }), null, 16, [
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
				open: L.value !== null,
				title: S(l)("assets.characters.outfit_from_reference_title"),
				description: S(l)("assets.characters.outfit_from_reference_description"),
				"confirm-label": S(l)("assets.characters.outfit_from_reference_confirm"),
				"cancel-label": S(l)("assets.characters.outfit_from_reference_cancel"),
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
			F(ge, {
				open: H.value !== null,
				title: S(l)("assets.characters.character_from_reference_title"),
				description: S(l)("assets.characters.character_from_reference_description"),
				"confirm-label": S(l)("assets.characters.character_from_reference_confirm"),
				"cancel-label": S(l)("assets.characters.character_from_reference_cancel"),
				pending: U.value,
				destructive: !1,
				"onUpdate:open": t[9] ||= (e) => {
					!e && !U.value && (H.value = null);
				},
				onConfirm: G
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
		], a = Z("lora", t.controller, () => r.value, () => n("errors.validation_required"), ["character_id"]);
		function c() {
			a.open_create(), a.values.weight = 1;
		}
		let l = D(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), u = D(() => {
			let e = a.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		return (t, d) => (p(), h("div", {
			class: v(S(Y).assetsBody),
			"data-editing": S(a).dialog_open.value ? "" : void 0
		}, [C("div", { class: v(S(Y).assetsMain) }, [F(X, {
			"active-id": S(a).dialog_open.value ? S(a).record_id.value : null,
			records: e.records,
			"summary-fields": i,
			loading: e.loading,
			"search-label": S(n)("common.actions.search"),
			"search-placeholder": S(n)("common.actions.search"),
			"empty-title": S(n)("assets.lora.empty_title"),
			"empty-description": S(n)("assets.lora.empty_description"),
			"add-label": S(n)("assets.lora.add_action"),
			"random-label": S(n)("assets.random_selection_action"),
			"reorder-hint": S(n)("assets.reorder_hint"),
			"edit-label": S(n)("common.actions.edit"),
			"delete-confirm-description": S(n)("assets.delete_confirm_description"),
			"confirm-label": S(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": S(n)("confirmations.destructive.default_cancel_action"),
			onAdd: c,
			onEdit: S(a).open_edit,
			onDeleteMany: d[0] ||= (e) => void S(a).remove_many(e),
			onReorder: S(a).reorder,
			onRandomSelect: S(a).random_select
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
		])], 2), F(Ae, {
			open: S(a).dialog_open.value,
			title: S(a).editing_record.value ? S(a).editing_record.value.display_name : S(n)("assets.lora.add_action"),
			description: S(n)("assets.form_dialog_description"),
			"close-label": S(n)("common.actions.close"),
			"onUpdate:open": d[4] ||= (e) => {
				e || S(a).close_dialog();
			}
		}, {
			default: s(() => [F(Q, {
				"name-label": S(n)("common.labels.name"),
				"name-placeholder": S(n)("common.labels.name"),
				name: S(a).name.value,
				"name-error": S(a).name_error.value,
				"save-error": S(a).save_error.value,
				fields: r.value,
				values: S(a).values,
				"save-label": S(n)("common.actions.save"),
				"cancel-label": S(n)("common.actions.cancel"),
				"decrement-label": S(n)("common.actions.decrease"),
				"increment-label": S(n)("common.actions.increase"),
				pending: S(a).saving.value,
				"onUpdate:name": d[2] ||= (e) => {
					S(a).name.value = e;
				},
				"onUpdate:values": d[3] ||= (e) => S(ie)(S(a).values, e),
				onSave: S(a).save,
				onCancel: S(a).close_dialog
			}, {
				"extra-fields": s(() => [F(q, {
					label: S(n)("assets.lora.character_label"),
					hint: S(n)("assets.lora.character_hint")
				}, {
					default: s(({ fieldId: e, describedBy: t }) => [F(V, o({
						id: e,
						"model-value": u.value,
						options: l.value,
						placeholder: S(n)("assets.lora.character_placeholder")
					}, S(se)({ describedBy: t }), { "onUpdate:modelValue": d[1] ||= (e) => S(a).values.character_id = e }), null, 16, [
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
}), We = ["src", "alt"], Ge = /* @__PURE__ */ P({
	__name: "OutfitPreview",
	props: {
		image: {},
		prompt: { type: Function }
	},
	emits: ["update:image"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = T(), a = m(I, null), o = j(!1), c = j(null);
		async function l() {
			if (a !== null) {
				o.value = !0, c.value = null;
				try {
					r("update:image", await ve(await a.generate(n.prompt())));
				} catch (e) {
					c.value = i("assets.outfits.preview_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					o.value = !1;
				}
			}
		}
		return (t, n) => S(a) !== null || e.image !== null ? (p(), b(q, {
			key: 0,
			label: S(i)("assets.outfits.preview_label"),
			hint: S(i)("assets.outfits.preview_hint"),
			error: c.value
		}, {
			default: s(() => [C("div", { class: v(S(Y).reference) }, [e.image === null ? y("", !0) : (p(), h("img", {
				key: 0,
				src: e.image,
				alt: S(i)("assets.outfits.preview_label"),
				class: v(S(Y).reference_thumbnail)
			}, null, 10, We)), C("div", { class: v(S(Y).reference_actions) }, [S(a) === null ? y("", !0) : (p(), b(B, {
				key: 0,
				label: e.image === null ? S(i)("assets.outfits.preview_generate") : S(i)("assets.outfits.preview_regenerate"),
				icon: S(U),
				pending: o.value,
				"data-testid": "outfit-preview-generate",
				onClick: l
			}, null, 8, [
				"label",
				"icon",
				"pending"
			])), e.image === null ? y("", !0) : (p(), b(B, {
				key: 1,
				label: S(i)("assets.outfits.preview_remove"),
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
}), Ke = ["data-editing"], qe = "solo, full body, standing, simple background, white background", Je = /* @__PURE__ */ P({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(t) {
		let n = t, { t: r } = T(), a = D(() => i.map((e) => ({
			key: e,
			label: Le(r, e),
			kind: "tags"
		}))), c = D(() => [{
			key: "owner_label",
			label: r("assets.outfits.character_label")
		}, {
			key: "scope_label",
			label: r("assets.scope_label")
		}]), { visible: l } = je(() => n.records, () => ({
			this_chat: r("assets.chat_scope_label"),
			other_chat: (e) => r("assets.other_chat_scope_label", { chat: e })
		}), () => n.showAllChats), u = D(() => l.value.map((e) => {
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
		let { visible: m } = je(() => n.characterRecords, () => ({
			this_chat: r("assets.chat_scope_label"),
			other_chat: (e) => r("assets.other_chat_scope_label", { chat: e })
		})), g = Z("outfit", n.controller, () => a.value, () => r("errors.validation_required"), [
			"character_id",
			"origin",
			"chat_id",
			"preview_image"
		], { preview_image: "preview_thumbnail" }), _ = D(() => typeof g.values.preview_image == "string" && g.values.preview_image !== "" ? g.values.preview_image : null);
		function b(e) {
			e === null ? Reflect.deleteProperty(g.values, "preview_image") : g.values.preview_image = e;
		}
		let x = {
			girl: "1girl",
			boy: "1boy"
		};
		function E() {
			let t = n.characterRecords.find((e) => e.id === g.values.character_id);
			return {
				positive_prompt: [
					t === void 0 ? "" : x[String(t.payload.subject)] ?? "",
					qe,
					...i.flatMap((t) => e(g.values[t]))
				].filter((e) => e !== "").join(", "),
				negative_prompt: ""
			};
		}
		let O = D(() => typeof g.values.chat_id == "string" && g.values.chat_id !== "");
		async function k() {
			g.values.chat_id = "", await g.save();
		}
		let A = D(() => m.value.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), j = D(() => {
			let e = g.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function M(e) {
			g.values.character_id = e;
		}
		return (e, n) => (p(), h("div", {
			class: v(S(Y).assetsBody),
			"data-editing": S(g).dialog_open.value ? "" : void 0
		}, [C("div", { class: v(S(Y).assetsMain) }, [F(X, {
			"active-id": S(g).dialog_open.value ? S(g).record_id.value : null,
			describe: f,
			records: u.value,
			"summary-fields": c.value,
			loading: t.loading,
			"search-label": S(r)("common.actions.search"),
			"search-placeholder": S(r)("common.actions.search"),
			"empty-title": S(r)("assets.outfits.empty_title"),
			"empty-description": S(r)("assets.outfits.empty_description"),
			"add-label": S(r)("assets.outfits.add_action"),
			"random-label": S(r)("assets.random_selection_action"),
			"reorder-hint": S(r)("assets.reorder_hint"),
			"edit-label": S(r)("common.actions.edit"),
			"delete-confirm-description": S(r)("assets.delete_confirm_description"),
			"confirm-label": S(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": S(r)("confirmations.destructive.default_cancel_action"),
			onAdd: S(g).open_create,
			onEdit: S(g).open_edit,
			onDeleteMany: n[0] ||= (e) => void S(g).remove_many(e),
			onReorder: S(g).reorder,
			onRandomSelect: S(g).random_select
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
		])], 2), F(Ae, {
			open: S(g).dialog_open.value,
			title: S(g).editing_record.value ? S(g).editing_record.value.display_name : S(r)("assets.outfits.add_action"),
			description: S(r)("assets.form_dialog_description"),
			thumbnail: S(g).thumbnail("preview_image"),
			"close-label": S(r)("common.actions.close"),
			"onUpdate:open": n[3] ||= (e) => {
				e || S(g).close_dialog();
			}
		}, {
			default: s(() => [F(Q, {
				"name-label": S(r)("common.labels.name"),
				"name-placeholder": S(r)("common.labels.name"),
				name: S(g).name.value,
				"name-error": S(g).name_error.value,
				"save-error": S(g).save_error.value,
				fields: a.value,
				values: S(g).values,
				"save-label": S(r)("common.actions.save"),
				"cancel-label": S(r)("common.actions.cancel"),
				"decrement-label": S(r)("common.actions.decrease"),
				"increment-label": S(r)("common.actions.increase"),
				pending: S(g).saving.value,
				"onUpdate:name": n[1] ||= (e) => {
					S(g).name.value = e;
				},
				"onUpdate:values": n[2] ||= (e) => S(ie)(S(g).values, e),
				onSave: S(g).save,
				onCancel: S(g).close_dialog
			}, {
				"leading-fields": s(() => [F(Ge, {
					image: _.value,
					prompt: E,
					"onUpdate:image": b
				}, null, 8, ["image"])]),
				"extra-fields": s(() => [O.value ? (p(), h("p", {
					key: 0,
					class: v(S(Y).chat_scope_note)
				}, [N(w(S(r)("assets.chat_scope_note")) + " ", 1), F(B, {
					label: S(r)("assets.import_to_global_action"),
					onClick: k
				}, null, 8, ["label"])], 2)) : y("", !0), F(q, { label: S(r)("assets.outfits.character_label") }, {
					default: s(({ fieldId: e, describedBy: t }) => [F(V, o({
						id: e,
						"model-value": j.value,
						options: A.value,
						placeholder: S(r)("assets.outfits.character_placeholder")
					}, S(se)({ describedBy: t }), { "onUpdate:modelValue": M }), null, 16, [
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
		])], 10, Ke));
	}
}), Ye = ["data-editing"], Xe = ["src", "alt"], Ze = ["id", "aria-describedby"], Qe = "novelai", $e = "google", et = /* @__PURE__ */ P({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = T(), r = D(() => [{
			value: Qe,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: $e,
			label: n("assets.vibe.provider_google")
		}]), i = D(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return c.values.provider !== $e && e.push({
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
		let c = Z("vibe", t.controller, () => i.value, () => n("errors.validation_required"), ["provider", "image"], { image: "image_thumbnail" }), l = j(null), u = D(() => typeof c.values.image == "string" && c.values.image !== "" ? c.values.image : null);
		async function d(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				l.value = null;
				try {
					c.values.image = await ve(t);
				} catch {
					l.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let f = D(() => typeof c.values.provider == "string" && c.values.provider !== "" ? c.values.provider : Qe);
		function m(e) {
			c.values.provider = e;
		}
		return (t, g) => (p(), h("div", {
			class: v(S(Y).assetsBody),
			"data-editing": S(c).dialog_open.value ? "" : void 0
		}, [C("div", { class: v(S(Y).assetsMain) }, [F(X, {
			"active-id": S(c).dialog_open.value ? S(c).record_id.value : null,
			describe: o,
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": S(n)("common.actions.search"),
			"search-placeholder": S(n)("common.actions.search"),
			"empty-title": S(n)("assets.vibe.empty_title"),
			"empty-description": S(n)("assets.vibe.empty_description"),
			"add-label": S(n)("assets.vibe.add_action"),
			"random-label": S(n)("assets.random_selection_action"),
			"reorder-hint": S(n)("assets.reorder_hint"),
			"edit-label": S(n)("common.actions.edit"),
			"delete-confirm-description": S(n)("assets.delete_confirm_description"),
			"confirm-label": S(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": S(n)("confirmations.destructive.default_cancel_action"),
			onAdd: S(c).open_create,
			onEdit: S(c).open_edit,
			onDeleteMany: g[0] ||= (e) => void S(c).remove_many(e),
			onReorder: S(c).reorder,
			onRandomSelect: S(c).random_select
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
		])], 2), F(Ae, {
			open: S(c).dialog_open.value,
			title: S(c).editing_record.value ? S(c).editing_record.value.display_name : S(n)("assets.vibe.add_action"),
			description: S(n)("assets.form_dialog_description"),
			"close-label": S(n)("common.actions.close"),
			"onUpdate:open": g[3] ||= (e) => {
				e || S(c).close_dialog();
			}
		}, {
			default: s(() => [F(Q, {
				"name-label": S(n)("common.labels.name"),
				"name-placeholder": S(n)("common.labels.name"),
				name: S(c).name.value,
				"name-error": S(c).name_error.value,
				"save-error": S(c).save_error.value,
				fields: i.value,
				values: S(c).values,
				"save-label": S(n)("common.actions.save"),
				"cancel-label": S(n)("common.actions.cancel"),
				"decrement-label": S(n)("common.actions.decrease"),
				"increment-label": S(n)("common.actions.increase"),
				pending: S(c).saving.value,
				"onUpdate:name": g[1] ||= (e) => {
					S(c).name.value = e;
				},
				"onUpdate:values": g[2] ||= (e) => S(ie)(S(c).values, e),
				onSave: S(c).save,
				onCancel: S(c).close_dialog
			}, {
				"extra-fields": s(() => [F(q, {
					label: S(n)("assets.vibe.image_label"),
					hint: S(n)("assets.vibe.image_hint"),
					error: l.value
				}, {
					default: s(({ fieldId: e, describedBy: t }) => [u.value === null ? y("", !0) : (p(), h("img", {
						key: 0,
						src: u.value,
						alt: S(n)("assets.vibe.image_label"),
						class: v(S(Y).reference_thumbnail)
					}, null, 10, Xe)), C("input", {
						id: e,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						"aria-describedby": t,
						"data-testid": "vibe-image-input",
						onChange: d
					}, null, 40, Ze)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), F(q, { label: S(n)("assets.vibe.provider_label") }, {
					default: s(() => [F(me, {
						"model-value": f.value,
						options: r.value,
						label: S(n)("assets.vibe.provider_label"),
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
		])], 10, Ye));
	}
}), tt = { "data-testid": "vocabulary-installed" }, nt = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, rt = ["placeholder"], it = ["aria-expanded"], at = /* @__PURE__ */ P({
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
		let t = e, { t: n } = T(), r = j({ status: "loading" });
		async function i() {
			r.value = { status: "loading" };
			try {
				r.value = {
					status: "ready",
					package: await t.controller.load_installed_vocabulary()
				};
			} catch {
				r.value = { status: "failed" };
			}
		}
		x(() => {
			i();
		});
		let a = j(!1);
		function o() {
			a.value = !0, t.controller.load_vocabulary_catalog();
		}
		let d = /nsfw|adult|explicit/iu;
		function f(e) {
			return d.test(e.package_id) || d.test(e.display_name.en) || d.test(e.display_name["zh-CN"]);
		}
		let m = D(() => t.catalog.filter((e) => !f(e))), _ = D(() => t.catalog.filter((e) => f(e))), E = j(!1);
		function O(e) {
			return t.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let k = j(null), A = j(null);
		function P(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return n("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return n("assets.vocabulary.progress_downloading");
				case "verifying_package": return n("assets.vocabulary.progress_verifying_package");
				case "installing": return n("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function I(e) {
			k.value === null && (k.value = e.package_id, A.value = null, await t.controller.install_vocabulary_package(e, (e) => {
				A.value = P(e);
			}), k.value = null, A.value = null, t.controller.state.assets.vocabulary_install_command.status === "success" && (R.value = [], V.value = null, i(), L.value.trim() !== "" && await J()));
		}
		let L = j(""), R = j([]), V = j(null), U = j(!1), W = j(!1), G = j(!1), K = j(null), q = null;
		async function J() {
			let e = L.value.trim();
			if (e === "") {
				R.value = [], V.value = null;
				return;
			}
			U.value = !0, W.value = !1;
			try {
				let n = await t.controller.search_vocabulary(e);
				R.value = n.results, V.value = n.next_cursor;
			} catch {
				R.value = [], V.value = null, W.value = !0;
			} finally {
				U.value = !1;
			}
		}
		async function re() {
			if (V.value !== null) {
				G.value = !0;
				try {
					let e = await t.controller.load_more_vocabulary(V.value);
					R.value = [...R.value, ...e.results], V.value = e.next_cursor;
				} finally {
					G.value = !1;
				}
			}
		}
		c(L, () => {
			q !== null && clearTimeout(q), q = setTimeout(() => {
				J();
			}, 250);
		});
		async function X(e) {
			await navigator.clipboard.writeText(e.display_text), K.value = e.record_id, setTimeout(() => {
				K.value === e.record_id && (K.value = null);
			}, 2e3);
		}
		let Z = D(() => t.loading ? "loading" : t.catalogFailure === null ? t.catalog.length === 0 ? "empty" : "ready" : "error"), Q = D(() => U.value && R.value.length === 0 ? "loading" : W.value ? "error" : L.value.trim() === "" || R.value.length > 0 ? "ready" : "empty");
		return (t, i) => (p(), h("div", { class: v(S(Y).vocabularyPanel) }, [
			C("section", tt, [C("p", { class: v(S(Y).sectionTitle) }, w(S(n)("assets.vocabulary.installed_title")), 3), r.value.status === "loading" ? (p(), h("p", {
				key: 0,
				class: v(S(Y).catalogEntryMeta)
			}, w(S(n)("assets.vocabulary.installed_preparing")), 3)) : r.value.status === "failed" ? (p(), h("p", {
				key: 1,
				class: v(S(Y).catalogEntryMeta)
			}, w(S(n)("assets.vocabulary.installed_failed")), 3)) : r.value.package === null ? (p(), h("p", {
				key: 2,
				class: v(S(Y).catalogEntryMeta)
			}, w(S(n)("assets.vocabulary.installed_none")), 3)) : (p(), h("div", {
				key: 3,
				class: v(S(Y).catalogEntry)
			}, [C("div", { class: v(S(Y).catalogEntryInfo) }, [C("span", { class: v(S(Y).catalogEntryName) }, w(r.value.package.package_id), 3), C("span", { class: v(["tc-tabular-nums", S(Y).catalogEntryMeta]) }, w(r.value.package.data_version) + " · " + w(S(n)("assets.vocabulary.tag_count", r.value.package.record_count)), 3)], 2)], 2))]),
			C("section", null, [
				C("p", { class: v(S(Y).sectionTitle) }, w(S(n)("assets.vocabulary.search_placeholder")), 3),
				C("div", { class: v(S(Y).vocabularySearchRow) }, [C("label", nt, w(S(n)("assets.vocabulary.search_placeholder")), 1), u(C("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": i[0] ||= (e) => L.value = e,
					type: "text",
					class: v(S(Y).searchInput),
					placeholder: S(n)("assets.vocabulary.search_placeholder")
				}, null, 10, rt), [[g, L.value]])], 2),
				F(ee, {
					status: Q.value,
					"empty-title": S(n)("assets.vocabulary.no_results_title"),
					"empty-message": S(n)("assets.vocabulary.no_results_description"),
					"error-message": S(n)("assets.vocabulary.search_failed"),
					"min-height": "60px"
				}, {
					default: s(() => [R.value.length > 0 ? (p(), h("ul", {
						key: 0,
						class: v(S(Y).searchResultsList)
					}, [(p(!0), h(M, null, l(R.value, (e) => (p(), h("li", {
						key: e.record_id,
						class: v(S(Y).searchResultRow)
					}, [
						C("span", { class: v(S(Y).searchResultTag) }, w(e.display_text), 3),
						e.category ? (p(), h("span", {
							key: 0,
							class: v(S(Y).searchResultTranslation)
						}, w(e.category), 3)) : y("", !0),
						F(B, {
							label: K.value === e.record_id ? S(n)("common.actions.copied") : S(n)("common.actions.copy"),
							icon: S(ne),
							variant: "secondary",
							onClick: () => void X(e)
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
				V.value === null ? y("", !0) : (p(), h("div", {
					key: 0,
					class: v(S(Y).loadMoreRow)
				}, [F(B, {
					label: S(n)("common.actions.next"),
					variant: "secondary",
					pending: G.value,
					onClick: i[1] ||= () => void re()
				}, null, 8, ["label", "pending"])], 2))
			]),
			C("section", null, [
				C("p", { class: v(S(Y).sectionTitle) }, w(S(n)("assets.vocabulary.updates_title")), 3),
				a.value ? (p(), b(ee, {
					key: 1,
					status: Z.value,
					"empty-title": S(n)("assets.vocabulary.no_updates_title"),
					"empty-message": S(n)("assets.vocabulary.no_updates_description"),
					"error-message": e.catalogFailure === null ? "" : S(n)("assets.vocabulary.catalog_failed_code", { code: e.catalogFailure.code }),
					"min-height": "80px"
				}, {
					default: s(() => [C("div", { class: v(S(Y).catalogList) }, [(p(!0), h(M, null, l(m.value, (e) => (p(), h("div", {
						key: e.package_id,
						class: v(S(Y).catalogEntry)
					}, [C("div", { class: v(S(Y).catalogEntryInfo) }, [C("span", { class: v(S(Y).catalogEntryName) }, w(O(e)), 3), C("span", { class: v(["tc-tabular-nums", S(Y).catalogEntryMeta]) }, w(S(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (p(), h("span", {
						key: 0,
						class: v(S(Y).bundledBadge)
					}, w(S(n)("assets.vocabulary.bundled_label")), 3)) : (p(), b(B, {
						key: 1,
						label: S(n)("assets.vocabulary.import_action"),
						icon: S(H),
						variant: "primary",
						pending: k.value === e.package_id,
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
				])) : (p(), b(B, {
					key: 0,
					label: S(n)("assets.vocabulary.update_action"),
					variant: "secondary",
					"data-testid": "vocabulary-check-updates",
					onClick: o
				}, null, 8, ["label"])),
				k.value !== null && A.value !== null ? (p(), h("p", {
					key: 2,
					class: v(S(Y).installProgress)
				}, w(A.value), 3)) : y("", !0)
			]),
			_.value.length > 0 ? (p(), h("section", {
				key: 0,
				class: v(S(Y).nsfwSection)
			}, [C("button", {
				type: "button",
				class: v(["tc-interactive", S(Y).nsfwToggle]),
				"aria-expanded": E.value,
				onClick: i[2] ||= (e) => E.value = !E.value
			}, [F(z, {
				icon: E.value ? S(ye) : S(te),
				size: 14
			}, null, 8, ["icon"]), N(" " + w(S(n)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, it), E.value ? (p(), h("div", {
				key: 1,
				class: v(S(Y).catalogList)
			}, [C("p", { class: v(S(Y).nsfwNotice) }, w(S(n)("assets.vocabulary.nsfw_disclosure_hint")), 3), (p(!0), h(M, null, l(_.value, (e) => (p(), h("div", {
				key: e.package_id,
				class: v(S(Y).catalogEntry)
			}, [C("div", { class: v(S(Y).catalogEntryInfo) }, [C("span", { class: v(S(Y).catalogEntryName) }, w(O(e)), 3), C("span", { class: v(["tc-tabular-nums", S(Y).catalogEntryMeta]) }, w(S(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), F(B, {
				label: S(n)("assets.vocabulary.import_action"),
				icon: S(H),
				variant: "destructive",
				pending: k.value === e.package_id,
				onClick: () => void I(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (p(), h("p", {
				key: 0,
				class: v(S(Y).nsfwNotice)
			}, w(S(n)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : y("", !0)
		], 2));
	}
}), ot = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, st = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function ct(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(ot)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var lt = ["data-editing"], ut = ["aria-label"], dt = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], ft = ["id", "value"], pt = "unmapped", mt = "{{", ht = "}}", gt = /* @__PURE__ */ P({
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
		}], a = Z("workflow", t.controller, () => i, () => n("errors.validation_required")), o = j(null), u = j([]);
		function d(e) {
			switch (e) {
				case "positive_prompt": return n("assets.workflow.target_positive_prompt");
				case "negative_prompt": return n("assets.workflow.target_negative_prompt");
				case "seed": return n("assets.workflow.target_seed");
				case "width": return n("assets.workflow.target_width");
				case "height": return n("assets.workflow.target_height");
				case "steps": return n("assets.workflow.target_steps");
			}
		}
		let f = D(() => [{
			value: pt,
			label: n("assets.workflow.placeholder_unmapped")
		}, ...st.map((e) => ({
			value: e,
			label: d(e)
		}))]);
		function m() {
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
			u.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		c(() => a.editing_record.value, (e) => {
			e ? g(e.payload) : u.value = [];
		}, { immediate: !0 });
		function x() {
			let e = ct(m()), t = new Map(u.value.map((e) => [e.name, e.target]));
			u.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function E(e, t) {
			let n = u.value.find((t) => t.name === e);
			n && (n.target = t === pt ? "" : t);
		}
		function O() {
			o.value?.click();
		}
		function k(e) {
			return `${mt}${e}${ht}`;
		}
		async function A(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			a.open_create(), a.name.value = n.name.replace(/\.json$/iu, ""), a.values.workflow_json = r, u.value = ct(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function N() {
			let e = {};
			for (let t of u.value) e[t.name] = t.target;
			a.values.placeholder_map = JSON.stringify(e), await a.save();
		}
		return (t, i) => (p(), h("div", {
			class: v(S(Y).assetsBody),
			"data-editing": S(a).dialog_open.value ? "" : void 0
		}, [C("div", { class: v(S(Y).assetsMain) }, [C("div", { class: v(S(Y).workflowToolbarRow) }, [F(B, {
			label: S(n)("assets.workflow.import_action"),
			icon: S(ae),
			variant: "primary",
			onClick: O
		}, null, 8, ["label", "icon"]), C("input", {
			ref_key: "file_input",
			ref: o,
			class: v(S(Y).hiddenFileInput),
			type: "file",
			accept: "application/json,.json",
			"aria-label": S(n)("assets.workflow.import_action"),
			onChange: i[0] ||= (e) => void A(e)
		}, null, 42, ut)], 2), F(X, {
			"active-id": S(a).dialog_open.value ? S(a).record_id.value : null,
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": S(n)("common.actions.search"),
			"search-placeholder": S(n)("common.actions.search"),
			"empty-title": S(n)("assets.workflow.empty_title"),
			"empty-description": S(n)("assets.workflow.empty_description"),
			"add-label": S(n)("assets.workflow.import_action"),
			"random-label": S(n)("assets.random_selection_action"),
			"reorder-hint": S(n)("assets.reorder_hint"),
			"edit-label": S(n)("assets.workflow.edit_action"),
			"delete-confirm-description": S(n)("assets.delete_confirm_description"),
			"confirm-label": S(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": S(n)("confirmations.destructive.default_cancel_action"),
			onAdd: O,
			onEdit: S(a).open_edit,
			onDeleteMany: i[1] ||= (e) => void S(a).remove_many(e),
			onReorder: S(a).reorder,
			onRandomSelect: S(a).random_select
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
		])], 2), F(Ae, {
			open: S(a).dialog_open.value,
			title: S(n)("assets.workflow.edit_action"),
			description: S(n)("assets.form_dialog_description"),
			"close-label": S(n)("common.actions.close"),
			"onUpdate:open": i[5] ||= (e) => {
				e || S(a).close_dialog();
			}
		}, {
			default: s(() => [C("form", {
				class: v(S(Y).form),
				onSubmit: i[4] ||= _(() => void N(), ["prevent"])
			}, [
				F(q, {
					label: S(n)("common.labels.name"),
					error: S(a).name_error.value,
					required: ""
				}, {
					default: s(({ fieldId: e, describedBy: t, invalid: r }) => [C("input", {
						id: e,
						class: v(S(Y).textInput),
						type: "text",
						placeholder: S(n)("common.labels.name"),
						value: S(a).name.value,
						"aria-describedby": t,
						"aria-invalid": r,
						onInput: i[2] ||= (e) => S(a).name.value = e.target.value
					}, null, 42, dt)]),
					_: 1
				}, 8, ["label", "error"]),
				F(q, { label: S(n)("assets.workflow.json_label") }, {
					default: s(({ fieldId: e }) => [C("textarea", {
						id: e,
						class: v([S(Y).textArea, S(Y).codeTextArea]),
						value: m(),
						onInput: i[3] ||= (e) => S(a).values.workflow_json = e.target.value
					}, null, 42, ft)]),
					_: 1
				}, 8, ["label"]),
				F(B, {
					label: S(n)("assets.workflow.placeholder_scan_action"),
					icon: S(J),
					variant: "secondary",
					type: "button",
					onClick: x
				}, null, 8, ["label", "icon"]),
				u.value.length > 0 ? (p(), h("div", {
					key: 0,
					class: v(S(Y).placeholderList)
				}, [(p(!0), h(M, null, l(u.value, (e) => (p(), h("div", {
					key: e.name,
					class: v(S(Y).placeholderRow)
				}, [C("span", { class: v(S(Y).placeholderKey) }, w(k(e.name)), 3), (p(), b(V, {
					key: S(r),
					"model-value": e.target === "" ? pt : e.target,
					options: f.value,
					placeholder: S(n)("assets.workflow.placeholder_unmapped"),
					ariaLabel: e.name,
					"onUpdate:modelValue": (t) => E(e.name, t)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"ariaLabel",
					"onUpdate:modelValue"
				]))], 2))), 128))], 2)) : y("", !0),
				C("div", { class: v(S(Y).formActions) }, [F(B, {
					label: S(n)("common.actions.cancel"),
					variant: "ghost",
					type: "button",
					onClick: S(a).close_dialog
				}, null, 8, ["label", "onClick"]), F(B, {
					label: S(n)("common.actions.save"),
					variant: "primary",
					type: "submit",
					pending: S(a).saving.value
				}, null, 8, ["label", "pending"])], 2)
			], 34)]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])], 10, lt));
	}
}), _t = /* @__PURE__ */ P({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = T(), i = [
			"character",
			"outfit",
			"lora",
			"vibe",
			"workflow"
		], a = j(t.state.assets.active_category), o = j(!1), c = m(L, j(null));
		function u(e) {
			a.value = e, i.includes(String(e)) && t.controller.set_active_asset_category(e);
		}
		function d(e) {
			let t = e.chat_id;
			return typeof t == "string" && t !== "" && t !== c.value;
		}
		function f(e) {
			let n = t.state.assets.records[e];
			return o.value ? n.length : n.filter((e) => !d(e.payload)).length;
		}
		let g = D(() => [...t.state.assets.records.character, ...t.state.assets.records.outfit].some((e) => d(e.payload))), _ = D(() => ({
			character: n("assets.tabs.characters"),
			outfit: n("assets.tabs.outfits"),
			lora: n("assets.tabs.lora"),
			vibe: n("assets.tabs.vibe"),
			workflow: n("assets.tabs.workflow")
		})), b = D(() => t.state.loading.has("assets")), x = D(() => t.state.loading.has("vocabulary")), C = D(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (p(), h("div", { class: v(S(Y).assetsView) }, [F(S(Se), {
			"model-value": a.value,
			class: v(S(Y).tabsRoot),
			"onUpdate:modelValue": u
		}, {
			default: s(() => [
				F(S(Te), {
					class: v(S(Y).tabsList),
					"aria-label": S(n)("nav.assets")
				}, {
					default: s(() => [(p(), h(M, null, l(i, (e) => F(S(Ee), {
						key: e,
						value: e,
						class: v(S(Y).tabsTrigger)
					}, {
						default: s(() => [N(w(_.value[e]) + " ", 1), b.value ? y("", !0) : (p(), h("span", {
							key: 0,
							class: v([S(Y).tabsCount, "tc-tabular-nums"])
						}, w(f(e)), 3))]),
						_: 2
					}, 1032, ["value", "class"])), 64)), F(S(Ee), {
						value: "vocabulary",
						class: v(S(Y).tabsTrigger)
					}, {
						default: s(() => [N(w(S(n)("assets.tabs.vocabulary")), 1)]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				g.value && (a.value === "character" || a.value === "outfit") ? (p(), h("div", {
					key: 0,
					class: v(S(Y).scopeSwitch)
				}, [F(re, {
					modelValue: o.value,
					"onUpdate:modelValue": r[0] ||= (e) => o.value = e,
					label: S(n)("assets.show_all_chats_label")
				}, null, 8, ["modelValue", "label"])], 2)) : y("", !0),
				F(S($), {
					value: "character",
					class: v(S(Y).tabsContent)
				}, {
					default: s(() => [F(Ve, {
						records: e.state.assets.records.character,
						"outfit-records": e.state.assets.records.outfit,
						loading: b.value,
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
				F(S($), {
					value: "outfit",
					class: v(S(Y).tabsContent)
				}, {
					default: s(() => [F(Je, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: b.value,
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
				F(S($), {
					value: "lora",
					class: v(S(Y).tabsContent)
				}, {
					default: s(() => [F(Ue, {
						records: e.state.assets.records.lora,
						"character-records": e.state.assets.records.character,
						loading: b.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				F(S($), {
					value: "vibe",
					class: v(S(Y).tabsContent)
				}, {
					default: s(() => [F(et, {
						records: e.state.assets.records.vibe,
						loading: b.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				F(S($), {
					value: "workflow",
					class: v(S(Y).tabsContent)
				}, {
					default: s(() => [F(gt, {
						records: e.state.assets.records.workflow,
						loading: b.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				F(S($), {
					value: "vocabulary",
					class: v([S(Y).tabsContent, S(Y).vocabularyContent])
				}, {
					default: s(() => [F(at, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						"catalog-failure": e.state.failures.get("vocabulary") ?? null,
						loading: x.value,
						controller: e.controller,
						locale: C.value
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
export { _t as default };
