import { a as e, i as t, n, o as r, s as i } from "./wardrobe_library-BkM-wKPK.js";
import { A as a, C as o, D as s, G as c, H as l, I as u, K as d, L as f, O as p, P as m, T as h, _ as g, a as _, c as v, dt as y, ft as b, g as x, h as S, j as C, lt as w, m as T, mt as E, n as D, ot as O, p as k, pt as A, rt as j, s as M, tt as N, u as P, v as F, x as I, y as L } from "./vue-i18n-L-BrQRnK.js";
import { n as R, r as z, t as B } from "./portal_keys-DthxrmWp.js";
import { n as V, t as ee } from "./AppIcon-DkyxvN8k.js";
import { n as H, t as U } from "./StateSurface-CYPYd2Rl.js";
import { n as W, t as G } from "./AppSelect-jUx_pTQw.js";
import { n as te, t as ne } from "./download-B0Y9EiOz.js";
import { t as K } from "./image-plus-D7OOsWBN.js";
import { t as q } from "./components_styles-DfkKC2VR.js";
import { n as re, r as ie, t as ae } from "./AppCheckbox-Cgz54uQV.js";
import { t as J } from "./FieldGroup-C0diPHlP.js";
import { n as oe, t as se } from "./AppSwitch-BeUU4ize.js";
import { a as Y, i as X, n as Z, r as ce, t as le } from "./use_asset_category_panel-DTLQqx9a.js";
import { t as ue } from "./upload-BjktsLMj.js";
import { t as de } from "./x-D7Ry5i_D.js";
import { n as fe, t as pe } from "./_prop_utils-DgoYzKlR.js";
import { P as me, S as he, f as ge, l as _e, s as ve, u as ye } from "./Teleport-CquQcgiX.js";
import { n as be } from "./NumberStepper-TrSn2gr9.js";
import { c as xe } from "./AppTooltip-Bay48E5d.js";
import { c as Se, i as Ce, l as we, o as Te, r as Ee, t as De } from "./IconButton-Co--h1UV.js";
import { t as Oe } from "./ConfirmDialog-DsgvxfoB.js";
import { n as ke } from "./reference_image-B8V-aXPW.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/chevron-up.js
var Ae = V("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), [je, Me] = /*#__PURE__*/ me("TabsRoot"), Ne = /* @__PURE__ */ I({
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
		let n = e, r = t, { orientation: i, unmountOnHide: a, dir: o } = O(n), s = xe(o);
		ge();
		let l = he(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), u = N(), d = j(/* @__PURE__ */ new Set());
		return Me({
			modelValue: l,
			changeModelValue: (e) => {
				l.value = e;
			},
			orientation: i,
			dir: s,
			unmountOnHide: a,
			activationMode: n.activationMode,
			baseId: ye(void 0, "reka-tabs"),
			tabsList: u,
			contentIds: d,
			registerContent: (e) => {
				d.value = /* @__PURE__ */ new Set([...d.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(d.value);
				t.delete(e), d.value = t;
			}
		}), (e, t) => (m(), S(w(ve), {
			dir: w(s),
			"data-orientation": w(i),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: c(() => [f(e.$slots, "default", { modelValue: w(l) })]),
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
function Pe(e, t) {
	return `${e}-trigger-${t}`;
}
function Fe(e, t) {
	return `${e}-content-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var Q = /* @__PURE__ */ I({
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
		let t = e, { forwardRef: n } = ge(), r = je(), i = k(() => Pe(r.baseId, t.value)), o = k(() => Fe(r.baseId, t.value)), s = k(() => t.value === r.modelValue.value), l = N(s.value);
		return C(() => {
			r.registerContent(t.value), requestAnimationFrame(() => {
				l.value = !1;
			});
		}), a(() => {
			r.unregisterContent(t.value);
		}), (e, t) => (m(), S(w(_e), {
			present: e.forceMount || s.value,
			"force-mount": ""
		}, {
			default: c(({ present: t }) => [L(w(ve), {
				id: o.value,
				ref: w(n),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": s.value ? "active" : "inactive",
				"data-orientation": w(r).orientation.value,
				"aria-labelledby": i.value,
				hidden: !t,
				tabindex: "0",
				style: A({ animationDuration: l.value ? "0s" : void 0 })
			}, {
				default: c(() => [!w(r).unmountOnHide.value || t ? f(e.$slots, "default", { key: 0 }) : x("v-if", !0)]),
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
}), Ie = /* @__PURE__ */ I({
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
		let { loop: t } = O(e), { forwardRef: n, currentElement: r } = ge(), i = je();
		return i.tabsList = r, (e, r) => (m(), S(w(ie), {
			"as-child": "",
			orientation: w(i).orientation.value,
			dir: w(i).dir.value,
			loop: w(t)
		}, {
			default: c(() => [L(w(ve), {
				ref: w(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": w(i).orientation.value
			}, {
				default: c(() => [f(e.$slots, "default")]),
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
}), Le = /* @__PURE__ */ I({
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
		let t = e, { forwardRef: n } = ge(), r = je(), i = k(() => Pe(r.baseId, t.value)), a = k(() => r.contentIds.value.has(t.value) ? Fe(r.baseId, t.value) : void 0), o = k(() => t.value === r.modelValue.value);
		return (e, t) => (m(), S(w(re), {
			"as-child": "",
			focusable: !e.disabled,
			active: o.value
		}, {
			default: c(() => [L(w(ve), {
				id: i.value,
				ref: w(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": o.value ? "true" : "false",
				"aria-controls": a.value,
				"data-state": o.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": w(r).orientation.value,
				onMousedown: t[0] ||= v((t) => {
					!e.disabled && t.ctrlKey === !1 ? w(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= M((t) => w(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = w(r).activationMode !== "manual";
					!o.value && !e.disabled && t && w(r).changeModelValue(e.value);
				}
			}, {
				default: c(() => [f(e.$slots, "default")]),
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
}), Re = ["aria-label"], ze = ["data-empty"], Be = ["src"], $ = /* @__PURE__ */ I({
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
		let n = e, r = t, i = N(null);
		return l(() => n.open, async (e) => {
			e && (await p(), i.value?.focus({ preventScroll: !0 }), i.value?.scrollIntoView({ block: "nearest" }));
		}), (t, n) => e.open ? (m(), g("aside", {
			key: 0,
			ref_key: "root",
			ref: i,
			class: y(w(Y).editor),
			"aria-label": e.title,
			tabindex: "-1",
			"data-testid": "asset-editor",
			onKeydown: n[1] ||= M((e) => r("update:open", !1), ["esc"])
		}, [T("header", { class: y(w(Y).editorHead) }, [
			e.thumbnail === void 0 ? x("", !0) : (m(), g("span", {
				key: 0,
				class: y(w(Y).editorThumb),
				"data-empty": e.thumbnail === null ? "" : void 0
			}, [e.thumbnail === null ? x("", !0) : (m(), g("img", {
				key: 0,
				src: e.thumbnail,
				alt: ""
			}, null, 8, Be))], 10, ze)),
			T("div", { class: y(w(Y).editorHeading) }, [T("h3", { class: y(w(Y).editorTitle) }, E(e.title), 3), T("p", { class: y(w(Y).editorDescription) }, E(e.description), 3)], 2),
			L(De, {
				icon: w(de),
				label: e.closeLabel,
				onClick: n[0] ||= (e) => r("update:open", !1)
			}, null, 8, ["icon", "label"])
		], 2), T("div", { class: y(w(Y).editorBody) }, [f(t.$slots, "default")], 2)], 42, Re)) : x("", !0);
	}
});
//#endregion
//#region src/ui/views/assets/chat_scope.ts
function Ve(e, t, n = () => !1) {
	let r = h(B, N(null));
	return {
		active_chat_id: r,
		visible: k(() => e().flatMap((e) => {
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
//#region src/ui/components/ZoomableImage.vue?vue&type=script&setup=true&lang.ts
var He = ["aria-label"], Ue = ["src", "alt"], We = ["src", "alt"], Ge = /* @__PURE__ */ I({
	__name: "ZoomableImage",
	props: {
		src: {},
		alt: {},
		imageClass: {}
	},
	setup(e) {
		let { t } = D(), n = N(!1), r = h(R, void 0), i = k(() => r ? { to: r } : {});
		return (r, a) => (m(), g(P, null, [T("button", {
			type: "button",
			class: y(w(q).zoomTrigger),
			"aria-label": `${w(t)("common.actions.enlarge")}: ${e.alt}`,
			onClick: a[0] ||= (e) => n.value = !0
		}, [T("img", {
			src: e.src,
			alt: e.alt,
			class: y(e.imageClass)
		}, null, 10, Ue)], 10, He), L(w(we), {
			open: n.value,
			"onUpdate:open": a[3] ||= (e) => n.value = e
		}, {
			default: c(() => [L(w(fe), b(o(i.value)), {
				default: c(() => [L(w(Ce), {
					class: y(w(q).dialogOverlay),
					onClick: a[1] ||= (e) => n.value = !1
				}, null, 8, ["class"]), L(w(Te), {
					class: y(w(q).zoomContent),
					"aria-describedby": void 0,
					onClick: a[2] ||= (e) => n.value = !1
				}, {
					default: c(() => [
						L(w(Ee), { class: "tc-visually-hidden" }, {
							default: c(() => [F(E(e.alt), 1)]),
							_: 1
						}),
						T("img", {
							src: e.src,
							alt: e.alt,
							class: y(w(q).zoomImage)
						}, null, 10, We),
						L(w(Se), {
							class: y(["tc-interactive", w(q).zoomClose]),
							"aria-label": w(t)("common.actions.close")
						}, {
							default: c(() => [L(ee, {
								icon: w(de),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])
					]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 8, ["open"])], 64));
	}
}), Ke = ["id"], qe = ["id"], Je = /* @__PURE__ */ I({
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
		let n = e, r = t, { t: i } = D(), a = h(z, null), o = N(null), s = N(null), l = N(!1), u = N(!1), f = N(""), p = N(""), v = k(() => [
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
		async function b(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", n === void 0) return;
			s.value = null;
			let a;
			try {
				a = await ke(n);
			} catch {
				s.value = i("assets.characters.reference_image_unreadable");
				return;
			}
			r("update:image", a), r("uploaded", a);
		}
		function C() {
			f.value = n.defaultPrompt.positive_prompt, p.value = n.defaultPrompt.negative_prompt, s.value = null, l.value = !0;
		}
		async function O() {
			if (a !== null) {
				u.value = !0, s.value = null;
				try {
					let e = await a.generate({
						positive_prompt: f.value,
						negative_prompt: p.value
					}), t = await ke(e);
					r("update:image", t), r("generated", t), l.value = !1;
				} catch (e) {
					s.value = i("assets.characters.reference_generate_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					u.value = !1;
				}
			}
		}
		return (t, n) => (m(), g(P, null, [
			L(J, {
				label: w(i)("assets.characters.reference_image_label"),
				hint: w(i)("assets.characters.reference_image_hint"),
				error: s.value
			}, {
				default: c(() => [T("div", { class: y(w(Y).reference) }, [e.image === null ? x("", !0) : (m(), S(Ge, {
					key: 0,
					src: e.image,
					alt: w(i)("assets.characters.reference_image_label"),
					"image-class": w(Y).reference_thumbnail
				}, null, 8, [
					"src",
					"alt",
					"image-class"
				])), T("div", { class: y(w(Y).reference_actions) }, [
					T("input", {
						ref_key: "file_input",
						ref: o,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						hidden: "",
						"data-testid": "character-reference-input",
						onChange: b
					}, null, 544),
					L(H, {
						label: w(i)("assets.characters.reference_upload"),
						onClick: n[0] ||= (e) => o.value?.click()
					}, null, 8, ["label"]),
					w(a) === null ? x("", !0) : (m(), S(H, {
						key: 0,
						label: w(i)("assets.characters.reference_generate"),
						disabled: l.value,
						"data-testid": "character-reference-generate",
						onClick: C
					}, null, 8, ["label", "disabled"])),
					e.image === null ? x("", !0) : (m(), S(H, {
						key: 1,
						label: w(i)("assets.characters.reference_image_remove"),
						onClick: n[1] ||= (e) => r("update:image", null)
					}, null, 8, ["label"]))
				], 2)], 2)]),
				_: 1
			}, 8, [
				"label",
				"hint",
				"error"
			]),
			l.value ? (m(), g("div", {
				key: 0,
				class: y(w(Y).reference_composer)
			}, [
				T("p", { class: y(w(Y).chat_scope_note) }, E(w(i)("assets.characters.reference_generate_hint")), 3),
				L(J, { label: w(i)("assets.characters.reference_prompt_label") }, {
					default: c(({ fieldId: e }) => [d(T("textarea", {
						id: e,
						"onUpdate:modelValue": n[2] ||= (e) => f.value = e,
						class: y(w(Y).textArea)
					}, null, 10, Ke), [[_, f.value]])]),
					_: 1
				}, 8, ["label"]),
				L(J, { label: w(i)("assets.characters.reference_negative_label") }, {
					default: c(({ fieldId: e }) => [d(T("textarea", {
						id: e,
						"onUpdate:modelValue": n[3] ||= (e) => p.value = e,
						class: y(w(Y).textArea)
					}, null, 10, qe), [[_, p.value]])]),
					_: 1
				}, 8, ["label"]),
				T("div", { class: y(w(Y).reference_actions) }, [L(H, {
					label: w(i)("common.actions.cancel"),
					onClick: n[4] ||= (e) => l.value = !1
				}, null, 8, ["label"]), L(H, {
					label: e.image === null ? w(i)("assets.characters.reference_generate_submit") : w(i)("assets.characters.reference_regenerate_submit"),
					variant: "primary",
					pending: u.value,
					"data-testid": "character-reference-submit",
					onClick: O
				}, null, 8, ["label", "pending"])], 2)
			], 2)) : x("", !0),
			e.image === null ? x("", !0) : (m(), g(P, { key: 1 }, [L(ae, {
				"model-value": e.send,
				label: w(i)("assets.characters.reference_send_label"),
				"onUpdate:modelValue": n[5] ||= (e) => r("update:send", e)
			}, null, 8, ["model-value", "label"]), L(J, {
				label: w(i)("assets.characters.reference_mode_label"),
				hint: w(i)("assets.characters.reference_mode_hint")
			}, {
				default: c(() => [L(be, {
					"model-value": e.mode,
					options: v.value,
					label: w(i)("assets.characters.reference_mode_label"),
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
var Ze = ["data-editing"], Qe = "none", $e = "solo, full body, standing, looking at viewer, simple background, white background", et = /* @__PURE__ */ I({
	__name: "CharacterPanel",
	props: {
		records: {},
		outfitRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(a) {
		let o = a, { t: l } = D(), { visible: u } = Ve(() => o.records, () => ({
			this_chat: l("assets.chat_scope_label"),
			other_chat: (e) => l("assets.other_chat_scope_label", { chat: e })
		}), () => o.showAllChats), d = k(() => [
			{
				key: "aliases",
				label: l("assets.characters.aliases_label"),
				kind: "text",
				hint: l("assets.characters.aliases_hint")
			},
			...r.map((e) => ({
				key: e,
				label: Ye(l, e),
				kind: "tags"
			})),
			{
				key: "excluded_traits",
				label: l("assets.characters.excluded_traits_label"),
				kind: "tags",
				hint: l("assets.characters.excluded_traits_hint")
			}
		]), f = k(() => [{
			key: "scope_label",
			label: l("assets.scope_label")
		}]), p = Z("character", o.controller, () => d.value, () => l("errors.validation_required"), [
			"subject",
			"default_outfit_id",
			"reference_image",
			"reference_send",
			"reference_mode",
			"origin",
			"locked_fields",
			"chat_id",
			"created_from_message_id"
		], { reference_image: "reference_thumbnail" }), _ = k(() => [
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
		]), v = k(() => p.values.subject === "boy" || p.values.subject === "other" ? p.values.subject : "girl"), b = k(() => {
			let e = p.record_id.value;
			return [{
				value: Qe,
				label: l("assets.characters.default_outfit_first")
			}, ...o.outfitRecords.filter((t) => {
				let n = t.payload.character_id;
				return typeof n != "string" || n === "" || n === e;
			}).map((e) => ({
				value: e.id,
				label: e.display_name
			}))];
		}), S = k(() => typeof p.values.default_outfit_id == "string" && p.values.default_outfit_id !== "" ? p.values.default_outfit_id : Qe), C = k(() => typeof p.values.chat_id == "string" && p.values.chat_id !== ""), O = k(() => typeof p.values.reference_image == "string" && p.values.reference_image !== "" ? p.values.reference_image : null), A = k(() => p.values.reference_mode === "img2img" || p.values.reference_mode === "precise" ? p.values.reference_mode : "vibe");
		function j(e) {
			if (e === null) {
				for (let e of [
					"reference_image",
					"reference_send",
					"reference_mode"
				]) Reflect.deleteProperty(p.values, e);
				return;
			}
			p.values.reference_image = e, p.values.reference_mode = A.value;
		}
		let M = h(z, null), P = N(null), I = N(!1), R = N(null);
		function B(e) {
			o.outfitRecords.some((e) => e.payload.character_id === p.record_id.value) || (P.value = e);
		}
		async function V(e) {
			let t = crypto.randomUUID();
			await o.controller.save_asset("outfit", {
				id: t,
				category: "outfit",
				record_key: t,
				display_name: e.name,
				payload: {
					...Object.fromEntries(i.map((t) => [t, n(e.slots[t] ?? [])])),
					character_id: p.record_id.value,
					origin: "analysis",
					chat_id: typeof p.values.chat_id == "string" ? p.values.chat_id : ""
				}
			}), p.values.default_outfit_id = t;
		}
		async function ee() {
			let e = P.value;
			if (e !== null && M !== null) {
				I.value = !0, R.value = null;
				try {
					await V(await M.read_outfit(e));
				} catch (e) {
					R.value = l("assets.characters.outfit_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					I.value = !1, P.value = null;
				}
			}
		}
		let U = N(null), W = N(!1);
		function te(e) {
			M !== null && (U.value = e);
		}
		async function ne() {
			let t = U.value;
			if (t !== null && M !== null) {
				W.value = !0, R.value = null;
				try {
					let i = await M.read_character(t);
					for (let t of r) {
						let r = i.appearance[t];
						r !== void 0 && e(p.values[t]).length === 0 && (p.values[t] = n(r));
					}
					p.values.subject !== "girl" && p.values.subject !== "boy" && (p.values.subject = i.subject), i.outfit !== null && await V(i.outfit);
				} catch (e) {
					R.value = l("assets.characters.character_from_reference_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					W.value = !1, U.value = null;
				}
			}
		}
		let K = {
			girl: "1girl",
			boy: "1boy",
			other: ""
		};
		function q(e, t) {
			let n = e.payload[t];
			return typeof n == "string" ? n : "";
		}
		function re(e) {
			return l(e === "boy" ? "assets.characters.subject_boy" : e === "other" ? "assets.characters.subject_other" : "assets.characters.subject_girl");
		}
		function ie(t) {
			let n = q(t, "reference_thumbnail") || q(t, "reference_image");
			return {
				thumbnail: n === "" ? null : n,
				subtitle: re(q(t, "subject")),
				detail: [e(q(t, "aliases")).join("、"), q(t, "scope_label")].filter((e) => e !== "").join(" · "),
				tags: r.flatMap((n) => e(q(t, n)))
			};
		}
		let ae = k(() => {
			let e = p.record_id.value, n = o.outfitRecords.map(t), r = n.find((e) => e.id === p.values.default_outfit_id) ?? n.find((t) => t.character_id === e);
			return r === void 0 ? [] : i.flatMap((e) => r.slots[e]);
		}), oe = k(() => ({
			positive_prompt: n([
				K[v.value],
				$e,
				...r.flatMap((t) => e(p.values[t])),
				...ae.value
			].filter((e) => e !== "")),
			negative_prompt: n(e(p.values.excluded_traits))
		}));
		async function se() {
			let t = p.editing_record.value?.payload ?? {}, n = r.filter((n) => e(p.values[n]).join(",") !== e(typeof t[n] == "string" ? t[n] : "").join(",")), i = /* @__PURE__ */ new Set([...e(p.values.locked_fields), ...n]);
			p.values.locked_fields = [...i].join(", "), p.values.origin = typeof p.values.origin == "string" ? p.values.origin : "user", await p.save();
		}
		async function ue() {
			p.values.chat_id = "", await se();
		}
		return (e, t) => (m(), g("div", {
			class: y(w(Y).assetsBody),
			"data-editing": w(p).dialog_open.value ? "" : void 0
		}, [
			T("div", { class: y(w(Y).assetsMain) }, [L(X, {
				"active-id": w(p).dialog_open.value ? w(p).record_id.value : null,
				describe: ie,
				records: w(u),
				"summary-fields": f.value,
				loading: a.loading,
				"search-label": w(l)("common.actions.search"),
				"search-placeholder": w(l)("common.actions.search"),
				"empty-title": w(l)("assets.characters.empty_title"),
				"empty-description": w(l)("assets.characters.empty_description"),
				"add-label": w(l)("assets.characters.add_action"),
				"random-label": w(l)("assets.random_selection_action"),
				"reorder-hint": w(l)("assets.reorder_hint"),
				"edit-label": w(l)("common.actions.edit"),
				"delete-confirm-description": w(l)("assets.delete_confirm_description"),
				"confirm-label": w(l)("confirmations.destructive.default_confirm_action"),
				"cancel-label": w(l)("confirmations.destructive.default_cancel_action"),
				onAdd: w(p).open_create,
				onEdit: w(p).open_edit,
				onDeleteMany: t[0] ||= (e) => void w(p).remove_many(e),
				onReorder: w(p).reorder,
				onRandomSelect: w(p).random_select
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
			L($, {
				open: w(p).dialog_open.value,
				title: w(p).editing_record.value ? w(p).editing_record.value.display_name : w(l)("assets.characters.add_action"),
				description: w(p).editing_record.value ? w(l)("assets.characters.editor_description", { name: w(p).editing_record.value.display_name }) : w(l)("assets.form_dialog_description"),
				thumbnail: w(p).thumbnail("reference_image"),
				"close-label": w(l)("common.actions.close"),
				"onUpdate:open": t[7] ||= (e) => {
					e || w(p).close_dialog();
				}
			}, {
				default: c(() => [L(ce, {
					"name-label": w(l)("common.labels.name"),
					"name-placeholder": w(l)("common.labels.name"),
					name: w(p).name.value,
					"name-error": w(p).name_error.value,
					"save-error": w(p).save_error.value,
					fields: d.value,
					values: w(p).values,
					"save-label": w(l)("common.actions.save"),
					"cancel-label": w(l)("common.actions.cancel"),
					"decrement-label": w(l)("common.actions.decrease"),
					"increment-label": w(l)("common.actions.increase"),
					pending: w(p).saving.value,
					"onUpdate:name": t[5] ||= (e) => {
						w(p).name.value = e;
					},
					"onUpdate:values": t[6] ||= (e) => w(le)(w(p).values, e),
					onSave: se,
					onCancel: w(p).close_dialog
				}, {
					"leading-fields": c(() => [
						L(Je, {
							image: O.value,
							send: w(p).values.reference_send === 1,
							mode: A.value,
							"default-prompt": oe.value,
							"onUpdate:image": j,
							"onUpdate:send": t[1] ||= (e) => w(p).values.reference_send = +!!e,
							"onUpdate:mode": t[2] ||= (e) => w(p).values.reference_mode = e,
							onGenerated: B,
							onUploaded: te
						}, null, 8, [
							"image",
							"send",
							"mode",
							"default-prompt"
						]),
						R.value === null ? x("", !0) : (m(), g("p", {
							key: 0,
							class: y(w(Y).formError),
							role: "alert"
						}, E(R.value), 3)),
						L(J, { label: w(l)("assets.characters.subject_label") }, {
							default: c(() => [L(be, {
								"model-value": v.value,
								options: _.value,
								label: w(l)("assets.characters.subject_label"),
								"onUpdate:modelValue": t[3] ||= (e) => w(p).values.subject = e
							}, null, 8, [
								"model-value",
								"options",
								"label"
							])]),
							_: 1
						}, 8, ["label"])
					]),
					"extra-fields": c(() => [C.value ? (m(), g("p", {
						key: 0,
						class: y(w(Y).chat_scope_note)
					}, [F(E(w(l)("assets.chat_scope_note")) + " ", 1), L(H, {
						label: w(l)("assets.import_to_global_action"),
						"data-testid": "import-to-global",
						onClick: ue
					}, null, 8, ["label"])], 2)) : x("", !0), L(J, { label: w(l)("assets.characters.default_outfit_label") }, {
						default: c(({ fieldId: e, describedBy: n }) => [L(G, s({
							id: e,
							"model-value": S.value,
							options: b.value,
							placeholder: w(l)("assets.characters.default_outfit_label")
						}, w(pe)({ describedBy: n }), { "onUpdate:modelValue": t[4] ||= (e) => w(p).values.default_outfit_id = e === Qe ? "" : e }), null, 16, [
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
			L(Oe, {
				open: P.value !== null,
				title: w(l)("assets.characters.outfit_from_reference_title"),
				description: w(l)("assets.characters.outfit_from_reference_description"),
				"confirm-label": w(l)("assets.characters.outfit_from_reference_confirm"),
				"cancel-label": w(l)("assets.characters.outfit_from_reference_cancel"),
				pending: I.value,
				destructive: !1,
				"onUpdate:open": t[8] ||= (e) => {
					!e && !I.value && (P.value = null);
				},
				onConfirm: ee
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			L(Oe, {
				open: U.value !== null,
				title: w(l)("assets.characters.character_from_reference_title"),
				description: w(l)("assets.characters.character_from_reference_description"),
				"confirm-label": w(l)("assets.characters.character_from_reference_confirm"),
				"cancel-label": w(l)("assets.characters.character_from_reference_cancel"),
				pending: W.value,
				destructive: !1,
				"onUpdate:open": t[9] ||= (e) => {
					!e && !W.value && (U.value = null);
				},
				onConfirm: ne
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
}), tt = ["data-editing"], nt = /* @__PURE__ */ I({
	__name: "LoraPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = k(() => [
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
		let l = k(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), u = k(() => {
			let e = a.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		return (t, d) => (m(), g("div", {
			class: y(w(Y).assetsBody),
			"data-editing": w(a).dialog_open.value ? "" : void 0
		}, [T("div", { class: y(w(Y).assetsMain) }, [L(X, {
			"active-id": w(a).dialog_open.value ? w(a).record_id.value : null,
			records: e.records,
			"summary-fields": i,
			loading: e.loading,
			"search-label": w(n)("common.actions.search"),
			"search-placeholder": w(n)("common.actions.search"),
			"empty-title": w(n)("assets.lora.empty_title"),
			"empty-description": w(n)("assets.lora.empty_description"),
			"add-label": w(n)("assets.lora.add_action"),
			"random-label": w(n)("assets.random_selection_action"),
			"reorder-hint": w(n)("assets.reorder_hint"),
			"edit-label": w(n)("common.actions.edit"),
			"delete-confirm-description": w(n)("assets.delete_confirm_description"),
			"confirm-label": w(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(n)("confirmations.destructive.default_cancel_action"),
			onAdd: o,
			onEdit: w(a).open_edit,
			onDeleteMany: d[0] ||= (e) => void w(a).remove_many(e),
			onReorder: w(a).reorder,
			onRandomSelect: w(a).random_select
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
		])], 2), L($, {
			open: w(a).dialog_open.value,
			title: w(a).editing_record.value ? w(a).editing_record.value.display_name : w(n)("assets.lora.add_action"),
			description: w(n)("assets.form_dialog_description"),
			"close-label": w(n)("common.actions.close"),
			"onUpdate:open": d[4] ||= (e) => {
				e || w(a).close_dialog();
			}
		}, {
			default: c(() => [L(ce, {
				"name-label": w(n)("common.labels.name"),
				"name-placeholder": w(n)("common.labels.name"),
				name: w(a).name.value,
				"name-error": w(a).name_error.value,
				"save-error": w(a).save_error.value,
				fields: r.value,
				values: w(a).values,
				"save-label": w(n)("common.actions.save"),
				"cancel-label": w(n)("common.actions.cancel"),
				"decrement-label": w(n)("common.actions.decrease"),
				"increment-label": w(n)("common.actions.increase"),
				pending: w(a).saving.value,
				"onUpdate:name": d[2] ||= (e) => {
					w(a).name.value = e;
				},
				"onUpdate:values": d[3] ||= (e) => w(le)(w(a).values, e),
				onSave: w(a).save,
				onCancel: w(a).close_dialog
			}, {
				"extra-fields": c(() => [L(J, {
					label: w(n)("assets.lora.character_label"),
					hint: w(n)("assets.lora.character_hint")
				}, {
					default: c(({ fieldId: e, describedBy: t }) => [L(G, s({
						id: e,
						"model-value": u.value,
						options: l.value,
						placeholder: w(n)("assets.lora.character_placeholder")
					}, w(pe)({ describedBy: t }), { "onUpdate:modelValue": d[1] ||= (e) => w(a).values.character_id = e }), null, 16, [
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
}), rt = /* @__PURE__ */ I({
	__name: "OutfitPreview",
	props: {
		image: {},
		prompt: { type: Function }
	},
	emits: ["update:image"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = D(), a = h(z, null), o = N(!1), s = N(null);
		async function l() {
			if (a !== null) {
				o.value = !0, s.value = null;
				try {
					r("update:image", await ke(await a.generate(n.prompt())));
				} catch (e) {
					s.value = i("assets.outfits.preview_failed", { reason: e instanceof Error ? e.message : String(e) });
				} finally {
					o.value = !1;
				}
			}
		}
		return (t, n) => w(a) !== null || e.image !== null ? (m(), S(J, {
			key: 0,
			label: w(i)("assets.outfits.preview_label"),
			hint: w(i)("assets.outfits.preview_hint"),
			error: s.value
		}, {
			default: c(() => [T("div", { class: y(w(Y).reference) }, [e.image === null ? x("", !0) : (m(), S(Ge, {
				key: 0,
				src: e.image,
				alt: w(i)("assets.outfits.preview_label"),
				"image-class": w(Y).reference_thumbnail
			}, null, 8, [
				"src",
				"alt",
				"image-class"
			])), T("div", { class: y(w(Y).reference_actions) }, [w(a) === null ? x("", !0) : (m(), S(H, {
				key: 0,
				label: e.image === null ? w(i)("assets.outfits.preview_generate") : w(i)("assets.outfits.preview_regenerate"),
				icon: w(K),
				pending: o.value,
				"data-testid": "outfit-preview-generate",
				onClick: l
			}, null, 8, [
				"label",
				"icon",
				"pending"
			])), e.image === null ? x("", !0) : (m(), S(H, {
				key: 1,
				label: w(i)("assets.outfits.preview_remove"),
				variant: "ghost",
				onClick: n[0] ||= (e) => r("update:image", null)
			}, null, 8, ["label"]))], 2)], 2)]),
			_: 1
		}, 8, [
			"label",
			"hint",
			"error"
		])) : x("", !0);
	}
}), it = ["data-editing"], at = "solo, full body, standing, simple background, white background", ot = /* @__PURE__ */ I({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {},
		showAllChats: { type: Boolean }
	},
	setup(t) {
		let n = t, { t: r } = D(), a = k(() => i.map((e) => ({
			key: e,
			label: Xe(r, e),
			kind: "tags"
		}))), o = k(() => [{
			key: "owner_label",
			label: r("assets.outfits.character_label")
		}, {
			key: "scope_label",
			label: r("assets.scope_label")
		}]), { visible: l } = Ve(() => n.records, () => ({
			this_chat: r("assets.chat_scope_label"),
			other_chat: (e) => r("assets.other_chat_scope_label", { chat: e })
		}), () => n.showAllChats), u = k(() => l.value.map((e) => {
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
		let { visible: p } = Ve(() => n.characterRecords, () => ({
			this_chat: r("assets.chat_scope_label"),
			other_chat: (e) => r("assets.other_chat_scope_label", { chat: e })
		})), h = Z("outfit", n.controller, () => a.value, () => r("errors.validation_required"), [
			"character_id",
			"origin",
			"chat_id",
			"preview_image"
		], { preview_image: "preview_thumbnail" }), _ = k(() => typeof h.values.preview_image == "string" && h.values.preview_image !== "" ? h.values.preview_image : null);
		function v(e) {
			e === null ? Reflect.deleteProperty(h.values, "preview_image") : h.values.preview_image = e;
		}
		let b = {
			girl: "1girl",
			boy: "1boy"
		};
		function S() {
			let t = n.characterRecords.find((e) => e.id === h.values.character_id);
			return {
				positive_prompt: [
					t === void 0 ? "" : b[String(t.payload.subject)] ?? "",
					at,
					...i.flatMap((t) => e(h.values[t]))
				].filter((e) => e !== "").join(", "),
				negative_prompt: ""
			};
		}
		let C = k(() => typeof h.values.chat_id == "string" && h.values.chat_id !== "");
		async function O() {
			h.values.chat_id = "", await h.save();
		}
		let A = k(() => p.value.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), j = k(() => {
			let e = h.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function M(e) {
			h.values.character_id = e;
		}
		return (e, n) => (m(), g("div", {
			class: y(w(Y).assetsBody),
			"data-editing": w(h).dialog_open.value ? "" : void 0
		}, [T("div", { class: y(w(Y).assetsMain) }, [L(X, {
			"active-id": w(h).dialog_open.value ? w(h).record_id.value : null,
			describe: f,
			records: u.value,
			"summary-fields": o.value,
			loading: t.loading,
			"search-label": w(r)("common.actions.search"),
			"search-placeholder": w(r)("common.actions.search"),
			"empty-title": w(r)("assets.outfits.empty_title"),
			"empty-description": w(r)("assets.outfits.empty_description"),
			"add-label": w(r)("assets.outfits.add_action"),
			"random-label": w(r)("assets.random_selection_action"),
			"reorder-hint": w(r)("assets.reorder_hint"),
			"edit-label": w(r)("common.actions.edit"),
			"delete-confirm-description": w(r)("assets.delete_confirm_description"),
			"confirm-label": w(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(r)("confirmations.destructive.default_cancel_action"),
			onAdd: w(h).open_create,
			onEdit: w(h).open_edit,
			onDeleteMany: n[0] ||= (e) => void w(h).remove_many(e),
			onReorder: w(h).reorder,
			onRandomSelect: w(h).random_select
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
		])], 2), L($, {
			open: w(h).dialog_open.value,
			title: w(h).editing_record.value ? w(h).editing_record.value.display_name : w(r)("assets.outfits.add_action"),
			description: w(r)("assets.form_dialog_description"),
			thumbnail: w(h).thumbnail("preview_image"),
			"close-label": w(r)("common.actions.close"),
			"onUpdate:open": n[3] ||= (e) => {
				e || w(h).close_dialog();
			}
		}, {
			default: c(() => [L(ce, {
				"name-label": w(r)("common.labels.name"),
				"name-placeholder": w(r)("common.labels.name"),
				name: w(h).name.value,
				"name-error": w(h).name_error.value,
				"save-error": w(h).save_error.value,
				fields: a.value,
				values: w(h).values,
				"save-label": w(r)("common.actions.save"),
				"cancel-label": w(r)("common.actions.cancel"),
				"decrement-label": w(r)("common.actions.decrease"),
				"increment-label": w(r)("common.actions.increase"),
				pending: w(h).saving.value,
				"onUpdate:name": n[1] ||= (e) => {
					w(h).name.value = e;
				},
				"onUpdate:values": n[2] ||= (e) => w(le)(w(h).values, e),
				onSave: w(h).save,
				onCancel: w(h).close_dialog
			}, {
				"leading-fields": c(() => [L(rt, {
					image: _.value,
					prompt: S,
					"onUpdate:image": v
				}, null, 8, ["image"])]),
				"extra-fields": c(() => [C.value ? (m(), g("p", {
					key: 0,
					class: y(w(Y).chat_scope_note)
				}, [F(E(w(r)("assets.chat_scope_note")) + " ", 1), L(H, {
					label: w(r)("assets.import_to_global_action"),
					onClick: O
				}, null, 8, ["label"])], 2)) : x("", !0), L(J, { label: w(r)("assets.outfits.character_label") }, {
					default: c(({ fieldId: e, describedBy: t }) => [L(G, s({
						id: e,
						"model-value": j.value,
						options: A.value,
						placeholder: w(r)("assets.outfits.character_placeholder")
					}, w(pe)({ describedBy: t }), { "onUpdate:modelValue": M }), null, 16, [
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
}), st = ["data-editing"], ct = ["id", "aria-describedby"], lt = "novelai", ut = "google", dt = /* @__PURE__ */ I({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = k(() => [{
			value: lt,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: ut,
			label: n("assets.vibe.provider_google")
		}]), i = k(() => {
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
		let s = Z("vibe", t.controller, () => i.value, () => n("errors.validation_required"), ["provider", "image"], { image: "image_thumbnail" }), l = N(null), u = k(() => typeof s.values.image == "string" && s.values.image !== "" ? s.values.image : null);
		async function d(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				l.value = null;
				try {
					s.values.image = await ke(t);
				} catch {
					l.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let f = k(() => typeof s.values.provider == "string" && s.values.provider !== "" ? s.values.provider : lt);
		function p(e) {
			s.values.provider = e;
		}
		return (t, h) => (m(), g("div", {
			class: y(w(Y).assetsBody),
			"data-editing": w(s).dialog_open.value ? "" : void 0
		}, [T("div", { class: y(w(Y).assetsMain) }, [L(X, {
			"active-id": w(s).dialog_open.value ? w(s).record_id.value : null,
			describe: o,
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": w(n)("common.actions.search"),
			"search-placeholder": w(n)("common.actions.search"),
			"empty-title": w(n)("assets.vibe.empty_title"),
			"empty-description": w(n)("assets.vibe.empty_description"),
			"add-label": w(n)("assets.vibe.add_action"),
			"random-label": w(n)("assets.random_selection_action"),
			"reorder-hint": w(n)("assets.reorder_hint"),
			"edit-label": w(n)("common.actions.edit"),
			"delete-confirm-description": w(n)("assets.delete_confirm_description"),
			"confirm-label": w(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(n)("confirmations.destructive.default_cancel_action"),
			onAdd: w(s).open_create,
			onEdit: w(s).open_edit,
			onDeleteMany: h[0] ||= (e) => void w(s).remove_many(e),
			onReorder: w(s).reorder,
			onRandomSelect: w(s).random_select
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
		])], 2), L($, {
			open: w(s).dialog_open.value,
			title: w(s).editing_record.value ? w(s).editing_record.value.display_name : w(n)("assets.vibe.add_action"),
			description: w(n)("assets.form_dialog_description"),
			"close-label": w(n)("common.actions.close"),
			"onUpdate:open": h[3] ||= (e) => {
				e || w(s).close_dialog();
			}
		}, {
			default: c(() => [L(ce, {
				"name-label": w(n)("common.labels.name"),
				"name-placeholder": w(n)("common.labels.name"),
				name: w(s).name.value,
				"name-error": w(s).name_error.value,
				"save-error": w(s).save_error.value,
				fields: i.value,
				values: w(s).values,
				"save-label": w(n)("common.actions.save"),
				"cancel-label": w(n)("common.actions.cancel"),
				"decrement-label": w(n)("common.actions.decrease"),
				"increment-label": w(n)("common.actions.increase"),
				pending: w(s).saving.value,
				"onUpdate:name": h[1] ||= (e) => {
					w(s).name.value = e;
				},
				"onUpdate:values": h[2] ||= (e) => w(le)(w(s).values, e),
				onSave: w(s).save,
				onCancel: w(s).close_dialog
			}, {
				"extra-fields": c(() => [L(J, {
					label: w(n)("assets.vibe.image_label"),
					hint: w(n)("assets.vibe.image_hint"),
					error: l.value
				}, {
					default: c(({ fieldId: e, describedBy: t }) => [u.value === null ? x("", !0) : (m(), S(Ge, {
						key: 0,
						src: u.value,
						alt: w(n)("assets.vibe.image_label"),
						"image-class": w(Y).reference_thumbnail
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
					}, null, 40, ct)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), L(J, { label: w(n)("assets.vibe.provider_label") }, {
					default: c(() => [L(be, {
						"model-value": f.value,
						options: r.value,
						label: w(n)("assets.vibe.provider_label"),
						"onUpdate:modelValue": p
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
}, mt = ["placeholder"], ht = ["aria-expanded"], gt = /* @__PURE__ */ I({
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
		let t = e, { t: n } = D(), r = N({ status: "loading" });
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
		C(() => {
			i();
		});
		let a = N(!1);
		function o() {
			a.value = !0, t.controller.load_vocabulary_catalog();
		}
		let s = /nsfw|adult|explicit/iu;
		function f(e) {
			return s.test(e.package_id) || s.test(e.display_name.en) || s.test(e.display_name["zh-CN"]);
		}
		let p = k(() => t.catalog.filter((e) => !f(e))), h = k(() => t.catalog.filter((e) => f(e))), v = N(!1);
		function b(e) {
			return t.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let O = N(null), A = N(null);
		function j(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return n("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return n("assets.vocabulary.progress_downloading");
				case "verifying_package": return n("assets.vocabulary.progress_verifying_package");
				case "installing": return n("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function M(e) {
			O.value === null && (O.value = e.package_id, A.value = null, await t.controller.install_vocabulary_package(e, (e) => {
				A.value = j(e);
			}), O.value = null, A.value = null, t.controller.state.assets.vocabulary_install_command.status === "success" && (R.value = [], z.value = null, i(), I.value.trim() !== "" && await re()));
		}
		let I = N(""), R = N([]), z = N(null), B = N(!1), V = N(!1), G = N(!1), K = N(null), q = null;
		async function re() {
			let e = I.value.trim();
			if (e === "") {
				R.value = [], z.value = null;
				return;
			}
			B.value = !0, V.value = !1;
			try {
				let n = await t.controller.search_vocabulary(e);
				R.value = n.results, z.value = n.next_cursor;
			} catch {
				R.value = [], z.value = null, V.value = !0;
			} finally {
				B.value = !1;
			}
		}
		async function ie() {
			if (z.value !== null) {
				G.value = !0;
				try {
					let e = await t.controller.load_more_vocabulary(z.value);
					R.value = [...R.value, ...e.results], z.value = e.next_cursor;
				} finally {
					G.value = !1;
				}
			}
		}
		l(I, () => {
			q !== null && clearTimeout(q), q = setTimeout(() => {
				re();
			}, 250);
		});
		async function ae(e) {
			await navigator.clipboard.writeText(e.display_text), K.value = e.record_id, setTimeout(() => {
				K.value === e.record_id && (K.value = null);
			}, 2e3);
		}
		let J = k(() => t.loading ? "loading" : t.catalogFailure === null ? t.catalog.length === 0 ? "empty" : "ready" : "error"), oe = k(() => B.value && R.value.length === 0 ? "loading" : V.value ? "error" : I.value.trim() === "" || R.value.length > 0 ? "ready" : "empty");
		return (t, i) => (m(), g("div", { class: y(w(Y).vocabularyPanel) }, [
			T("section", ft, [T("p", { class: y(w(Y).sectionTitle) }, E(w(n)("assets.vocabulary.installed_title")), 3), r.value.status === "loading" ? (m(), g("p", {
				key: 0,
				class: y(w(Y).catalogEntryMeta)
			}, E(w(n)("assets.vocabulary.installed_preparing")), 3)) : r.value.status === "failed" ? (m(), g("p", {
				key: 1,
				class: y(w(Y).catalogEntryMeta)
			}, E(w(n)("assets.vocabulary.installed_failed")), 3)) : r.value.package === null ? (m(), g("p", {
				key: 2,
				class: y(w(Y).catalogEntryMeta)
			}, E(w(n)("assets.vocabulary.installed_none")), 3)) : (m(), g("div", {
				key: 3,
				class: y(w(Y).catalogEntry)
			}, [T("div", { class: y(w(Y).catalogEntryInfo) }, [T("span", { class: y(w(Y).catalogEntryName) }, E(r.value.package.package_id), 3), T("span", { class: y(["tc-tabular-nums", w(Y).catalogEntryMeta]) }, E(r.value.package.data_version) + " · " + E(w(n)("assets.vocabulary.tag_count", r.value.package.record_count)), 3)], 2)], 2))]),
			T("section", null, [
				T("p", { class: y(w(Y).sectionTitle) }, E(w(n)("assets.vocabulary.search_placeholder")), 3),
				T("div", { class: y(w(Y).vocabularySearchRow) }, [T("label", pt, E(w(n)("assets.vocabulary.search_placeholder")), 1), d(T("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": i[0] ||= (e) => I.value = e,
					type: "text",
					class: y(w(Y).searchInput),
					placeholder: w(n)("assets.vocabulary.search_placeholder")
				}, null, 10, mt), [[_, I.value]])], 2),
				L(U, {
					status: oe.value,
					"empty-title": w(n)("assets.vocabulary.no_results_title"),
					"empty-message": w(n)("assets.vocabulary.no_results_description"),
					"error-message": w(n)("assets.vocabulary.search_failed"),
					"min-height": "60px"
				}, {
					default: c(() => [R.value.length > 0 ? (m(), g("ul", {
						key: 0,
						class: y(w(Y).searchResultsList)
					}, [(m(!0), g(P, null, u(R.value, (e) => (m(), g("li", {
						key: e.record_id,
						class: y(w(Y).searchResultRow)
					}, [
						T("span", { class: y(w(Y).searchResultTag) }, E(e.display_text), 3),
						e.category ? (m(), g("span", {
							key: 0,
							class: y(w(Y).searchResultTranslation)
						}, E(e.category), 3)) : x("", !0),
						L(H, {
							label: K.value === e.record_id ? w(n)("common.actions.copied") : w(n)("common.actions.copy"),
							icon: w(te),
							variant: "secondary",
							onClick: () => void ae(e)
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
					"empty-message",
					"error-message"
				]),
				z.value === null ? x("", !0) : (m(), g("div", {
					key: 0,
					class: y(w(Y).loadMoreRow)
				}, [L(H, {
					label: w(n)("common.actions.next"),
					variant: "secondary",
					pending: G.value,
					onClick: i[1] ||= () => void ie()
				}, null, 8, ["label", "pending"])], 2))
			]),
			T("section", null, [
				T("p", { class: y(w(Y).sectionTitle) }, E(w(n)("assets.vocabulary.updates_title")), 3),
				a.value ? (m(), S(U, {
					key: 1,
					status: J.value,
					"empty-title": w(n)("assets.vocabulary.no_updates_title"),
					"empty-message": w(n)("assets.vocabulary.no_updates_description"),
					"error-message": e.catalogFailure === null ? "" : w(n)("assets.vocabulary.catalog_failed_code", { code: e.catalogFailure.code }),
					"min-height": "80px"
				}, {
					default: c(() => [T("div", { class: y(w(Y).catalogList) }, [(m(!0), g(P, null, u(p.value, (e) => (m(), g("div", {
						key: e.package_id,
						class: y(w(Y).catalogEntry)
					}, [T("div", { class: y(w(Y).catalogEntryInfo) }, [T("span", { class: y(w(Y).catalogEntryName) }, E(b(e)), 3), T("span", { class: y(["tc-tabular-nums", w(Y).catalogEntryMeta]) }, E(w(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (m(), g("span", {
						key: 0,
						class: y(w(Y).bundledBadge)
					}, E(w(n)("assets.vocabulary.bundled_label")), 3)) : (m(), S(H, {
						key: 1,
						label: w(n)("assets.vocabulary.import_action"),
						icon: w(ne),
						variant: "primary",
						pending: O.value === e.package_id,
						onClick: () => void M(e)
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
				])) : (m(), S(H, {
					key: 0,
					label: w(n)("assets.vocabulary.update_action"),
					variant: "secondary",
					"data-testid": "vocabulary-check-updates",
					onClick: o
				}, null, 8, ["label"])),
				O.value !== null && A.value !== null ? (m(), g("p", {
					key: 2,
					class: y(w(Y).installProgress)
				}, E(A.value), 3)) : x("", !0)
			]),
			h.value.length > 0 ? (m(), g("section", {
				key: 0,
				class: y(w(Y).nsfwSection)
			}, [T("button", {
				type: "button",
				class: y(["tc-interactive", w(Y).nsfwToggle]),
				"aria-expanded": v.value,
				onClick: i[2] ||= (e) => v.value = !v.value
			}, [L(ee, {
				icon: v.value ? w(Ae) : w(W),
				size: 14
			}, null, 8, ["icon"]), F(" " + E(w(n)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, ht), v.value ? (m(), g("div", {
				key: 1,
				class: y(w(Y).catalogList)
			}, [T("p", { class: y(w(Y).nsfwNotice) }, E(w(n)("assets.vocabulary.nsfw_disclosure_hint")), 3), (m(!0), g(P, null, u(h.value, (e) => (m(), g("div", {
				key: e.package_id,
				class: y(w(Y).catalogEntry)
			}, [T("div", { class: y(w(Y).catalogEntryInfo) }, [T("span", { class: y(w(Y).catalogEntryName) }, E(b(e)), 3), T("span", { class: y(["tc-tabular-nums", w(Y).catalogEntryMeta]) }, E(w(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), L(H, {
				label: w(n)("assets.vocabulary.import_action"),
				icon: w(ne),
				variant: "destructive",
				pending: O.value === e.package_id,
				onClick: () => void M(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (m(), g("p", {
				key: 0,
				class: y(w(Y).nsfwNotice)
			}, E(w(n)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : x("", !0)
		], 2));
	}
}), _t = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, vt = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function yt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(_t)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var bt = ["data-editing"], xt = ["aria-label"], St = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], Ct = ["id", "value"], wt = "unmapped", Tt = "{{", Et = "}}", Dt = /* @__PURE__ */ I({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = D(), i = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], a = Z("workflow", t.controller, () => i, () => n("errors.validation_required")), o = N(null), s = N([]);
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
		let f = k(() => [{
			value: wt,
			label: n("assets.workflow.placeholder_unmapped")
		}, ...vt.map((e) => ({
			value: e,
			label: d(e)
		}))]);
		function p() {
			let e = a.values.workflow_json;
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
			s.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		l(() => a.editing_record.value, (e) => {
			e ? h(e.payload) : s.value = [];
		}, { immediate: !0 });
		function _() {
			let e = yt(p()), t = new Map(s.value.map((e) => [e.name, e.target]));
			s.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function b(e, t) {
			let n = s.value.find((t) => t.name === e);
			n && (n.target = t === wt ? "" : t);
		}
		function C() {
			o.value?.click();
		}
		function O(e) {
			return `${Tt}${e}${Et}`;
		}
		async function A(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			a.open_create(), a.name.value = n.name.replace(/\.json$/iu, ""), a.values.workflow_json = r, s.value = yt(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function j() {
			let e = {};
			for (let t of s.value) e[t.name] = t.target;
			a.values.placeholder_map = JSON.stringify(e), await a.save();
		}
		return (t, i) => (m(), g("div", {
			class: y(w(Y).assetsBody),
			"data-editing": w(a).dialog_open.value ? "" : void 0
		}, [T("div", { class: y(w(Y).assetsMain) }, [T("div", { class: y(w(Y).workflowToolbarRow) }, [L(H, {
			label: w(n)("assets.workflow.import_action"),
			icon: w(ue),
			variant: "primary",
			onClick: C
		}, null, 8, ["label", "icon"]), T("input", {
			ref_key: "file_input",
			ref: o,
			class: y(w(Y).hiddenFileInput),
			type: "file",
			accept: "application/json,.json",
			"aria-label": w(n)("assets.workflow.import_action"),
			onChange: i[0] ||= (e) => void A(e)
		}, null, 42, xt)], 2), L(X, {
			"active-id": w(a).dialog_open.value ? w(a).record_id.value : null,
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": w(n)("common.actions.search"),
			"search-placeholder": w(n)("common.actions.search"),
			"empty-title": w(n)("assets.workflow.empty_title"),
			"empty-description": w(n)("assets.workflow.empty_description"),
			"add-label": w(n)("assets.workflow.import_action"),
			"random-label": w(n)("assets.random_selection_action"),
			"reorder-hint": w(n)("assets.reorder_hint"),
			"edit-label": w(n)("assets.workflow.edit_action"),
			"delete-confirm-description": w(n)("assets.delete_confirm_description"),
			"confirm-label": w(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(n)("confirmations.destructive.default_cancel_action"),
			onAdd: C,
			onEdit: w(a).open_edit,
			onDeleteMany: i[1] ||= (e) => void w(a).remove_many(e),
			onReorder: w(a).reorder,
			onRandomSelect: w(a).random_select
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
		])], 2), L($, {
			open: w(a).dialog_open.value,
			title: w(n)("assets.workflow.edit_action"),
			description: w(n)("assets.form_dialog_description"),
			"close-label": w(n)("common.actions.close"),
			"onUpdate:open": i[5] ||= (e) => {
				e || w(a).close_dialog();
			}
		}, {
			default: c(() => [T("form", {
				class: y(w(Y).form),
				onSubmit: i[4] ||= v(() => void j(), ["prevent"])
			}, [
				L(J, {
					label: w(n)("common.labels.name"),
					error: w(a).name_error.value,
					required: ""
				}, {
					default: c(({ fieldId: e, describedBy: t, invalid: r }) => [T("input", {
						id: e,
						class: y(w(Y).textInput),
						type: "text",
						placeholder: w(n)("common.labels.name"),
						value: w(a).name.value,
						"aria-describedby": t,
						"aria-invalid": r,
						onInput: i[2] ||= (e) => w(a).name.value = e.target.value
					}, null, 42, St)]),
					_: 1
				}, 8, ["label", "error"]),
				L(J, { label: w(n)("assets.workflow.json_label") }, {
					default: c(({ fieldId: e }) => [T("textarea", {
						id: e,
						class: y([w(Y).textArea, w(Y).codeTextArea]),
						value: p(),
						onInput: i[3] ||= (e) => w(a).values.workflow_json = e.target.value
					}, null, 42, Ct)]),
					_: 1
				}, 8, ["label"]),
				L(H, {
					label: w(n)("assets.workflow.placeholder_scan_action"),
					icon: w(oe),
					variant: "secondary",
					type: "button",
					onClick: _
				}, null, 8, ["label", "icon"]),
				s.value.length > 0 ? (m(), g("div", {
					key: 0,
					class: y(w(Y).placeholderList)
				}, [(m(!0), g(P, null, u(s.value, (e) => (m(), g("div", {
					key: e.name,
					class: y(w(Y).placeholderRow)
				}, [T("span", { class: y(w(Y).placeholderKey) }, E(O(e.name)), 3), (m(), S(G, {
					key: w(r),
					"model-value": e.target === "" ? wt : e.target,
					options: f.value,
					placeholder: w(n)("assets.workflow.placeholder_unmapped"),
					ariaLabel: e.name,
					"onUpdate:modelValue": (t) => b(e.name, t)
				}, null, 8, [
					"model-value",
					"options",
					"placeholder",
					"ariaLabel",
					"onUpdate:modelValue"
				]))], 2))), 128))], 2)) : x("", !0),
				T("div", { class: y(w(Y).formActions) }, [L(H, {
					label: w(n)("common.actions.cancel"),
					variant: "ghost",
					type: "button",
					onClick: w(a).close_dialog
				}, null, 8, ["label", "onClick"]), L(H, {
					label: w(n)("common.actions.save"),
					variant: "primary",
					type: "submit",
					pending: w(a).saving.value
				}, null, 8, ["label", "pending"])], 2)
			], 34)]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])], 10, bt));
	}
}), Ot = /* @__PURE__ */ I({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = D(), i = [
			"character",
			"outfit",
			"lora",
			"vibe",
			"workflow"
		], a = N(t.state.assets.active_category), o = N(!1), s = h(B, N(null));
		function l(e) {
			a.value = e, i.includes(String(e)) && t.controller.set_active_asset_category(e);
		}
		function d(e) {
			let t = e.chat_id;
			return typeof t == "string" && t !== "" && t !== s.value;
		}
		function f(e) {
			let n = t.state.assets.records[e];
			return o.value ? n.length : n.filter((e) => !d(e.payload)).length;
		}
		let p = k(() => [...t.state.assets.records.character, ...t.state.assets.records.outfit].some((e) => d(e.payload))), _ = k(() => ({
			character: n("assets.tabs.characters"),
			outfit: n("assets.tabs.outfits"),
			lora: n("assets.tabs.lora"),
			vibe: n("assets.tabs.vibe"),
			workflow: n("assets.tabs.workflow")
		})), v = k(() => t.state.loading.has("assets")), b = k(() => t.state.loading.has("vocabulary")), S = k(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (m(), g("div", { class: y(w(Y).assetsView) }, [L(w(Ne), {
			"model-value": a.value,
			class: y(w(Y).tabsRoot),
			"onUpdate:modelValue": l
		}, {
			default: c(() => [
				L(w(Ie), {
					class: y(w(Y).tabsList),
					"aria-label": w(n)("nav.assets")
				}, {
					default: c(() => [(m(), g(P, null, u(i, (e) => L(w(Le), {
						key: e,
						value: e,
						class: y(w(Y).tabsTrigger)
					}, {
						default: c(() => [F(E(_.value[e]) + " ", 1), v.value ? x("", !0) : (m(), g("span", {
							key: 0,
							class: y([w(Y).tabsCount, "tc-tabular-nums"])
						}, E(f(e)), 3))]),
						_: 2
					}, 1032, ["value", "class"])), 64)), L(w(Le), {
						value: "vocabulary",
						class: y(w(Y).tabsTrigger)
					}, {
						default: c(() => [F(E(w(n)("assets.tabs.vocabulary")), 1)]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				p.value && (a.value === "character" || a.value === "outfit") ? (m(), g("div", {
					key: 0,
					class: y(w(Y).scopeSwitch)
				}, [L(se, {
					modelValue: o.value,
					"onUpdate:modelValue": r[0] ||= (e) => o.value = e,
					label: w(n)("assets.show_all_chats_label")
				}, null, 8, ["modelValue", "label"])], 2)) : x("", !0),
				L(w(Q), {
					value: "character",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [L(et, {
						records: e.state.assets.records.character,
						"outfit-records": e.state.assets.records.outfit,
						loading: v.value,
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
				L(w(Q), {
					value: "outfit",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [L(ot, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: v.value,
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
				L(w(Q), {
					value: "lora",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [L(nt, {
						records: e.state.assets.records.lora,
						"character-records": e.state.assets.records.character,
						loading: v.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				L(w(Q), {
					value: "vibe",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [L(dt, {
						records: e.state.assets.records.vibe,
						loading: v.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				L(w(Q), {
					value: "workflow",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [L(Dt, {
						records: e.state.assets.records.workflow,
						loading: v.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				L(w(Q), {
					value: "vocabulary",
					class: y([w(Y).tabsContent, w(Y).vocabularyContent])
				}, {
					default: c(() => [L(gt, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						"catalog-failure": e.state.failures.get("vocabulary") ?? null,
						loading: b.value,
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
export { Ot as default };
