import { a as e, c as t, s as n } from "./wardrobe_library-CZLkOF9h.js";
import { A as r, D as i, F as a, G as o, I as s, N as c, T as l, V as u, W as d, _ as f, a as p, at as m, c as h, ct as g, et as _, ft as v, g as y, h as b, k as x, m as S, n as C, nt as w, p as T, pt as E, s as D, u as O, ut as k, v as A, x as j, y as M } from "./vue-i18n-DUz2Gjn8.js";
import { t as N } from "./portal_keys-BFbEhMBO.js";
import { n as P, t as ee } from "./AppIcon-Cnhzrx9o.js";
import { t as F } from "./chevron-down-Tu_8qTxg.js";
import { t as te } from "./chevron-up-D4TetO-M.js";
import { n as ne, t as re } from "./download-DHgWv1wH.js";
import { a as I, i as L, n as R, r as z, t as B } from "./use_asset_category_panel-CXkmv9D3.js";
import { n as V, t as ie } from "./StateSurface-C9BHPFzJ.js";
import { n as H, r as U, t as W } from "./AppDialog-DAUL3Hew.js";
import { t as G } from "./FieldGroup-BT7DUBzO.js";
import { t as ae } from "./upload-CQtsg_mB.js";
import { t as K } from "./_prop_utils-CqbCYIc0.js";
import { M as oe, _ as se, c as q, i as J, o as ce, s as le } from "./Teleport-CZ6NJvBB.js";
import { t as ue } from "./AppCheckbox-DhrQWrHZ.js";
import { n as Y } from "./NumberStepper-DKrPnJBN.js";
import { c as de } from "./PopperContent-8IQaFABb.js";
import { t as X } from "./AppSelect-BledsuNR.js";
import { t as fe } from "./reference_image-DYyYuujP.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/scan-search.js
var pe = P("scan-search", [
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
]), [Z, me] = /*#__PURE__*/ oe("TabsRoot"), he = /* @__PURE__ */ j({
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
		let n = e, r = t, { orientation: i, unmountOnHide: a, dir: o } = m(n), l = de(o);
		q();
		let u = se(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), f = _(), p = w(/* @__PURE__ */ new Set());
		return me({
			modelValue: u,
			changeModelValue: (e) => {
				u.value = e;
			},
			orientation: i,
			dir: l,
			unmountOnHide: a,
			activationMode: n.activationMode,
			baseId: le(void 0, "reka-tabs"),
			tabsList: f,
			contentIds: p,
			registerContent: (e) => {
				p.value = /* @__PURE__ */ new Set([...p.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(p.value);
				t.delete(e), p.value = t;
			}
		}), (e, t) => (c(), b(g(J), {
			dir: g(l),
			"data-orientation": g(i),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: d(() => [s(e.$slots, "default", { modelValue: g(u) })]),
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
function ge(e, t) {
	return `${e}-trigger-${t}`;
}
function _e(e, t) {
	return `${e}-content-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var Q = /* @__PURE__ */ j({
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
		let t = e, { forwardRef: n } = q(), i = Z(), a = T(() => ge(i.baseId, t.value)), o = T(() => _e(i.baseId, t.value)), l = T(() => t.value === i.modelValue.value), u = _(l.value);
		return r(() => {
			i.registerContent(t.value), requestAnimationFrame(() => {
				u.value = !1;
			});
		}), x(() => {
			i.unregisterContent(t.value);
		}), (e, t) => (c(), b(g(ce), {
			present: e.forceMount || l.value,
			"force-mount": ""
		}, {
			default: d(({ present: t }) => [M(g(J), {
				id: o.value,
				ref: g(n),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": l.value ? "active" : "inactive",
				"data-orientation": g(i).orientation.value,
				"aria-labelledby": a.value,
				hidden: !t,
				tabindex: "0",
				style: v({ animationDuration: u.value ? "0s" : void 0 })
			}, {
				default: d(() => [!g(i).unmountOnHide.value || t ? s(e.$slots, "default", { key: 0 }) : y("v-if", !0)]),
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
}), ve = /* @__PURE__ */ j({
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
		let { loop: t } = m(e), { forwardRef: n, currentElement: r } = q(), i = Z();
		return i.tabsList = r, (e, r) => (c(), b(g(U), {
			"as-child": "",
			orientation: g(i).orientation.value,
			dir: g(i).dir.value,
			loop: g(t)
		}, {
			default: d(() => [M(g(J), {
				ref: g(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": g(i).orientation.value
			}, {
				default: d(() => [s(e.$slots, "default")]),
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
}), $ = /* @__PURE__ */ j({
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
		let t = e, { forwardRef: n } = q(), r = Z(), i = T(() => ge(r.baseId, t.value)), a = T(() => r.contentIds.value.has(t.value) ? _e(r.baseId, t.value) : void 0), o = T(() => t.value === r.modelValue.value);
		return (e, t) => (c(), b(g(H), {
			"as-child": "",
			focusable: !e.disabled,
			active: o.value
		}, {
			default: d(() => [M(g(J), {
				id: i.value,
				ref: g(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": o.value ? "true" : "false",
				"aria-controls": a.value,
				"data-state": o.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": g(r).orientation.value,
				onMousedown: t[0] ||= h((t) => {
					!e.disabled && t.ctrlKey === !1 ? g(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= D((t) => g(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = g(r).activationMode !== "manual";
					!o.value && !e.disabled && t && g(r).changeModelValue(e.value);
				}
			}, {
				default: d(() => [s(e.$slots, "default")]),
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
function ye(e, t) {
	let n = l(N, _(null));
	return {
		active_chat_id: n,
		visible: T(() => e().flatMap((e) => {
			let r = e.payload.chat_id;
			return typeof r != "string" || r === "" ? [e] : r === n.value ? [{
				...e,
				payload: {
					...e.payload,
					scope_label: t()
				}
			}] : [];
		}))
	};
}
//#endregion
//#region src/ui/views/assets/wardrobe_labels.ts
function be(e, t) {
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
function xe(e, t) {
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
var Se = ["src", "alt"], Ce = ["id", "aria-describedby"], we = "none", Te = /* @__PURE__ */ j({
	__name: "CharacterPanel",
	props: {
		records: {},
		outfitRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(t) {
		let r = t, { t: a } = C(), { visible: o } = ye(() => r.records, () => a("assets.chat_scope_label")), s = T(() => [
			{
				key: "aliases",
				label: a("assets.characters.aliases_label"),
				kind: "text",
				hint: a("assets.characters.aliases_hint")
			},
			...n.map((e) => ({
				key: e,
				label: be(a, e),
				kind: "text"
			})),
			{
				key: "excluded_traits",
				label: a("assets.characters.excluded_traits_label"),
				kind: "text",
				hint: a("assets.characters.excluded_traits_hint")
			}
		]), l = T(() => [{
			key: "scope_label",
			label: a("assets.scope_label")
		}]), u = R("character", r.controller, () => s.value, () => a("errors.validation_required"), [
			"subject",
			"default_outfit_id",
			"reference_image",
			"reference_send",
			"reference_mode",
			"origin",
			"locked_fields",
			"chat_id",
			"created_from_message_id"
		]), p = T(() => [
			{
				value: "girl",
				label: a("assets.characters.subject_girl")
			},
			{
				value: "boy",
				label: a("assets.characters.subject_boy")
			},
			{
				value: "other",
				label: a("assets.characters.subject_other")
			}
		]), m = T(() => u.values.subject === "boy" || u.values.subject === "other" ? u.values.subject : "girl"), h = T(() => {
			let e = u.editing_record.value?.id;
			return [{
				value: we,
				label: a("assets.characters.default_outfit_first")
			}, ...r.outfitRecords.filter((t) => {
				let n = t.payload.character_id;
				return typeof n != "string" || n === "" || n === e;
			}).map((e) => ({
				value: e.id,
				label: e.display_name
			}))];
		}), v = T(() => typeof u.values.default_outfit_id == "string" && u.values.default_outfit_id !== "" ? u.values.default_outfit_id : we), x = T(() => typeof u.values.chat_id == "string" && u.values.chat_id !== ""), w = T(() => [
			{
				value: "vibe",
				label: a("assets.characters.reference_mode_vibe")
			},
			{
				value: "img2img",
				label: a("assets.characters.reference_mode_img2img")
			},
			{
				value: "precise",
				label: a("assets.characters.reference_mode_precise")
			}
		]), D = _(null), j = T(() => typeof u.values.reference_image == "string" && u.values.reference_image !== "" ? u.values.reference_image : null), N = T(() => typeof u.values.reference_mode == "string" ? u.values.reference_mode : "vibe");
		async function P(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				D.value = null;
				try {
					u.values.reference_image = await fe(t), u.values.reference_mode = N.value;
				} catch {
					D.value = a("assets.characters.reference_image_unreadable");
				}
			}
		}
		function ee() {
			for (let e of [
				"reference_image",
				"reference_send",
				"reference_mode"
			]) Reflect.deleteProperty(u.values, e);
		}
		async function F() {
			let t = u.editing_record.value?.payload ?? {}, r = n.filter((n) => e(u.values[n]).join(",") !== e(typeof t[n] == "string" ? t[n] : "").join(",")), i = /* @__PURE__ */ new Set([...e(u.values.locked_fields), ...r]);
			u.values.locked_fields = [...i].join(", "), u.values.origin = typeof u.values.origin == "string" ? u.values.origin : "user", await u.save();
		}
		async function te() {
			u.values.chat_id = "", await F();
		}
		let ne = (e) => a("assets.delete_confirm_title", { name: e });
		return (e, n) => (c(), f("div", null, [M(L, {
			records: g(o),
			"summary-fields": l.value,
			loading: t.loading,
			"search-label": g(a)("common.actions.search"),
			"search-placeholder": g(a)("common.actions.search"),
			"empty-title": g(a)("assets.characters.empty_title"),
			"empty-description": g(a)("assets.characters.empty_description"),
			"add-label": g(a)("assets.characters.add_action"),
			"random-label": g(a)("assets.random_selection_action"),
			"reorder-hint": g(a)("assets.reorder_hint"),
			"edit-label": g(a)("common.actions.edit"),
			"delete-label": g(a)("common.actions.delete"),
			"delete-confirm-title": ne,
			"delete-confirm-description": g(a)("assets.delete_confirm_description"),
			"confirm-label": g(a)("confirmations.destructive.default_confirm_action"),
			"cancel-label": g(a)("confirmations.destructive.default_cancel_action"),
			"move-up-label": g(a)("assets.move_up_action"),
			"move-down-label": g(a)("assets.move_down_action"),
			"drag-handle-label": g(a)("assets.drag_handle_label"),
			onAdd: g(u).open_create,
			onEdit: g(u).open_edit,
			onDelete: g(u).remove,
			onReorder: g(u).reorder,
			onRandomSelect: g(u).random_select
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
		]), M(W, {
			open: g(u).dialog_open.value,
			title: g(u).editing_record.value ? g(a)("common.actions.edit") : g(a)("assets.characters.add_action"),
			description: g(a)("assets.form_dialog_description"),
			"close-label": g(a)("common.actions.close"),
			"onUpdate:open": n[6] ||= (e) => {
				e || g(u).close_dialog();
			}
		}, {
			default: d(() => [M(z, {
				"name-label": g(a)("common.labels.name"),
				"name-placeholder": g(a)("common.labels.name"),
				name: g(u).name.value,
				"name-error": g(u).name_error.value,
				"save-error": g(u).save_error.value,
				fields: s.value,
				values: g(u).values,
				"save-label": g(a)("common.actions.save"),
				"cancel-label": g(a)("common.actions.cancel"),
				"decrement-label": g(a)("common.actions.decrease"),
				"increment-label": g(a)("common.actions.increase"),
				pending: g(u).saving.value,
				"onUpdate:name": n[4] ||= (e) => {
					g(u).name.value = e;
				},
				"onUpdate:values": n[5] ||= (e) => g(B)(g(u).values, e),
				onSave: F,
				onCancel: g(u).close_dialog
			}, {
				"extra-fields": d(() => [
					x.value ? (c(), f("p", {
						key: 0,
						class: k(g(I).chat_scope_note)
					}, [A(E(g(a)("assets.chat_scope_note")) + " ", 1), M(V, {
						label: g(a)("assets.import_to_global_action"),
						"data-testid": "import-to-global",
						onClick: te
					}, null, 8, ["label"])], 2)) : y("", !0),
					M(G, { label: g(a)("assets.characters.subject_label") }, {
						default: d(() => [M(Y, {
							"model-value": m.value,
							options: p.value,
							label: g(a)("assets.characters.subject_label"),
							"onUpdate:modelValue": n[0] ||= (e) => g(u).values.subject = e
						}, null, 8, [
							"model-value",
							"options",
							"label"
						])]),
						_: 1
					}, 8, ["label"]),
					M(G, { label: g(a)("assets.characters.default_outfit_label") }, {
						default: d(({ fieldId: e, describedBy: t }) => [M(X, i({
							id: e,
							"model-value": v.value,
							options: h.value,
							placeholder: g(a)("assets.characters.default_outfit_label")
						}, g(K)({ describedBy: t }), { "onUpdate:modelValue": n[1] ||= (e) => g(u).values.default_outfit_id = e === we ? "" : e }), null, 16, [
							"id",
							"model-value",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					M(G, {
						label: g(a)("assets.characters.reference_image_label"),
						hint: g(a)("assets.characters.reference_image_hint"),
						error: D.value
					}, {
						default: d(({ fieldId: e, describedBy: t }) => [
							j.value === null ? y("", !0) : (c(), f("img", {
								key: 0,
								src: j.value,
								alt: g(a)("assets.characters.reference_image_label"),
								class: k(g(I).reference_thumbnail)
							}, null, 10, Se)),
							S("input", {
								id: e,
								type: "file",
								accept: "image/png,image/jpeg,image/webp",
								"aria-describedby": t,
								"data-testid": "character-reference-input",
								onChange: P
							}, null, 40, Ce),
							j.value === null ? y("", !0) : (c(), b(V, {
								key: 1,
								label: g(a)("assets.characters.reference_image_remove"),
								onClick: ee
							}, null, 8, ["label"]))
						]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					j.value === null ? y("", !0) : (c(), f(O, { key: 1 }, [M(ue, {
						"model-value": g(u).values.reference_send === 1,
						label: g(a)("assets.characters.reference_send_label"),
						"onUpdate:modelValue": n[2] ||= (e) => g(u).values.reference_send = +!!e
					}, null, 8, ["model-value", "label"]), M(G, {
						label: g(a)("assets.characters.reference_mode_label"),
						hint: g(a)("assets.characters.reference_mode_hint")
					}, {
						default: d(() => [M(Y, {
							"model-value": N.value,
							options: w.value,
							label: g(a)("assets.characters.reference_mode_label"),
							"onUpdate:modelValue": n[3] ||= (e) => g(u).values.reference_mode = e
						}, null, 8, [
							"model-value",
							"options",
							"label"
						])]),
						_: 1
					}, 8, ["label", "hint"])], 64))
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
		])]));
	}
}), Ee = /* @__PURE__ */ j({
	__name: "LoraPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = C(), r = T(() => [
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
		]), a = [
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
		], o = R("lora", t.controller, () => r.value, () => n("errors.validation_required"), ["character_id"]);
		function s() {
			o.open_create(), o.values.weight = 1;
		}
		let l = T(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), u = T(() => {
			let e = o.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		}), p = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, m) => (c(), f("div", null, [M(L, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": g(n)("common.actions.search"),
			"search-placeholder": g(n)("common.actions.search"),
			"empty-title": g(n)("assets.lora.empty_title"),
			"empty-description": g(n)("assets.lora.empty_description"),
			"add-label": g(n)("assets.lora.add_action"),
			"random-label": g(n)("assets.random_selection_action"),
			"reorder-hint": g(n)("assets.reorder_hint"),
			"edit-label": g(n)("common.actions.edit"),
			"delete-label": g(n)("common.actions.delete"),
			"delete-confirm-title": p,
			"delete-confirm-description": g(n)("assets.delete_confirm_description"),
			"confirm-label": g(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": g(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": g(n)("assets.move_up_action"),
			"move-down-label": g(n)("assets.move_down_action"),
			"drag-handle-label": g(n)("assets.drag_handle_label"),
			onAdd: s,
			onEdit: g(o).open_edit,
			onDelete: g(o).remove,
			onReorder: g(o).reorder,
			onRandomSelect: g(o).random_select
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
		]), M(W, {
			open: g(o).dialog_open.value,
			title: g(o).editing_record.value ? g(n)("common.actions.edit") : g(n)("assets.lora.add_action"),
			description: g(n)("assets.form_dialog_description"),
			"close-label": g(n)("common.actions.close"),
			"onUpdate:open": m[3] ||= (e) => {
				e || g(o).close_dialog();
			}
		}, {
			default: d(() => [M(z, {
				"name-label": g(n)("common.labels.name"),
				"name-placeholder": g(n)("common.labels.name"),
				name: g(o).name.value,
				"name-error": g(o).name_error.value,
				"save-error": g(o).save_error.value,
				fields: r.value,
				values: g(o).values,
				"save-label": g(n)("common.actions.save"),
				"cancel-label": g(n)("common.actions.cancel"),
				"decrement-label": g(n)("common.actions.decrease"),
				"increment-label": g(n)("common.actions.increase"),
				pending: g(o).saving.value,
				"onUpdate:name": m[1] ||= (e) => {
					g(o).name.value = e;
				},
				"onUpdate:values": m[2] ||= (e) => g(B)(g(o).values, e),
				onSave: g(o).save,
				onCancel: g(o).close_dialog
			}, {
				"extra-fields": d(() => [M(G, {
					label: g(n)("assets.lora.character_label"),
					hint: g(n)("assets.lora.character_hint")
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [M(X, i({
						id: e,
						"model-value": u.value,
						options: l.value,
						placeholder: g(n)("assets.lora.character_placeholder")
					}, g(K)({ describedBy: t }), { "onUpdate:modelValue": m[0] ||= (e) => g(o).values.character_id = e }), null, 16, [
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
}), De = /* @__PURE__ */ j({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let n = e, { t: r } = C(), a = T(() => t.map((e) => ({
			key: e,
			label: xe(r, e),
			kind: "text"
		}))), o = T(() => [{
			key: "scope_label",
			label: r("assets.scope_label")
		}]), { visible: s } = ye(() => n.records, () => r("assets.chat_scope_label")), { visible: l } = ye(() => n.characterRecords, () => r("assets.chat_scope_label")), u = R("outfit", n.controller, () => a.value, () => r("errors.validation_required"), [
			"character_id",
			"origin",
			"chat_id"
		]), p = T(() => typeof u.values.chat_id == "string" && u.values.chat_id !== "");
		async function m() {
			u.values.chat_id = "", await u.save();
		}
		let h = T(() => l.value.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), _ = T(() => {
			let e = u.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function v(e) {
			u.values.character_id = e;
		}
		let b = (e) => r("assets.delete_confirm_title", { name: e });
		return (t, n) => (c(), f("div", null, [M(L, {
			records: g(s),
			"summary-fields": o.value,
			loading: e.loading,
			"search-label": g(r)("common.actions.search"),
			"search-placeholder": g(r)("common.actions.search"),
			"empty-title": g(r)("assets.outfits.empty_title"),
			"empty-description": g(r)("assets.outfits.empty_description"),
			"add-label": g(r)("assets.outfits.add_action"),
			"random-label": g(r)("assets.random_selection_action"),
			"reorder-hint": g(r)("assets.reorder_hint"),
			"edit-label": g(r)("common.actions.edit"),
			"delete-label": g(r)("common.actions.delete"),
			"delete-confirm-title": b,
			"delete-confirm-description": g(r)("assets.delete_confirm_description"),
			"confirm-label": g(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": g(r)("confirmations.destructive.default_cancel_action"),
			"move-up-label": g(r)("assets.move_up_action"),
			"move-down-label": g(r)("assets.move_down_action"),
			"drag-handle-label": g(r)("assets.drag_handle_label"),
			onAdd: g(u).open_create,
			onEdit: g(u).open_edit,
			onDelete: g(u).remove,
			onReorder: g(u).reorder,
			onRandomSelect: g(u).random_select
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
		]), M(W, {
			open: g(u).dialog_open.value,
			title: g(u).editing_record.value ? g(r)("common.actions.edit") : g(r)("assets.outfits.add_action"),
			description: g(r)("assets.form_dialog_description"),
			"close-label": g(r)("common.actions.close"),
			"onUpdate:open": n[2] ||= (e) => {
				e || g(u).close_dialog();
			}
		}, {
			default: d(() => [M(z, {
				"name-label": g(r)("common.labels.name"),
				"name-placeholder": g(r)("common.labels.name"),
				name: g(u).name.value,
				"name-error": g(u).name_error.value,
				"save-error": g(u).save_error.value,
				fields: a.value,
				values: g(u).values,
				"save-label": g(r)("common.actions.save"),
				"cancel-label": g(r)("common.actions.cancel"),
				"decrement-label": g(r)("common.actions.decrease"),
				"increment-label": g(r)("common.actions.increase"),
				pending: g(u).saving.value,
				"onUpdate:name": n[0] ||= (e) => {
					g(u).name.value = e;
				},
				"onUpdate:values": n[1] ||= (e) => g(B)(g(u).values, e),
				onSave: g(u).save,
				onCancel: g(u).close_dialog
			}, {
				"extra-fields": d(() => [p.value ? (c(), f("p", {
					key: 0,
					class: k(g(I).chat_scope_note)
				}, [A(E(g(r)("assets.chat_scope_note")) + " ", 1), M(V, {
					label: g(r)("assets.import_to_global_action"),
					onClick: m
				}, null, 8, ["label"])], 2)) : y("", !0), M(G, { label: g(r)("assets.outfits.character_label") }, {
					default: d(({ fieldId: e, describedBy: t }) => [M(X, i({
						id: e,
						"model-value": _.value,
						options: h.value,
						placeholder: g(r)("assets.outfits.character_placeholder")
					}, g(K)({ describedBy: t }), { "onUpdate:modelValue": v }), null, 16, [
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
}), Oe = ["src", "alt"], ke = ["id", "aria-describedby"], Ae = "novelai", je = "google", Me = /* @__PURE__ */ j({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = C(), r = T(() => [{
			value: Ae,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: je,
			label: n("assets.vibe.provider_google")
		}]), i = T(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return o.values.provider !== je && e.push({
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
		}], o = R("vibe", t.controller, () => i.value, () => n("errors.validation_required"), ["provider", "image"]), s = _(null), l = T(() => typeof o.values.image == "string" && o.values.image !== "" ? o.values.image : null);
		async function u(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				s.value = null;
				try {
					o.values.image = await fe(t);
				} catch {
					s.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let p = T(() => typeof o.values.provider == "string" && o.values.provider !== "" ? o.values.provider : Ae);
		function m(e) {
			o.values.provider = e;
		}
		let h = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, _) => (c(), f("div", null, [M(L, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": g(n)("common.actions.search"),
			"search-placeholder": g(n)("common.actions.search"),
			"empty-title": g(n)("assets.vibe.empty_title"),
			"empty-description": g(n)("assets.vibe.empty_description"),
			"add-label": g(n)("assets.vibe.add_action"),
			"random-label": g(n)("assets.random_selection_action"),
			"reorder-hint": g(n)("assets.reorder_hint"),
			"edit-label": g(n)("common.actions.edit"),
			"delete-label": g(n)("common.actions.delete"),
			"delete-confirm-title": h,
			"delete-confirm-description": g(n)("assets.delete_confirm_description"),
			"confirm-label": g(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": g(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": g(n)("assets.move_up_action"),
			"move-down-label": g(n)("assets.move_down_action"),
			"drag-handle-label": g(n)("assets.drag_handle_label"),
			onAdd: g(o).open_create,
			onEdit: g(o).open_edit,
			onDelete: g(o).remove,
			onReorder: g(o).reorder,
			onRandomSelect: g(o).random_select
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
		]), M(W, {
			open: g(o).dialog_open.value,
			title: g(o).editing_record.value ? g(n)("common.actions.edit") : g(n)("assets.vibe.add_action"),
			description: g(n)("assets.form_dialog_description"),
			"close-label": g(n)("common.actions.close"),
			"onUpdate:open": _[2] ||= (e) => {
				e || g(o).close_dialog();
			}
		}, {
			default: d(() => [M(z, {
				"name-label": g(n)("common.labels.name"),
				"name-placeholder": g(n)("common.labels.name"),
				name: g(o).name.value,
				"name-error": g(o).name_error.value,
				"save-error": g(o).save_error.value,
				fields: i.value,
				values: g(o).values,
				"save-label": g(n)("common.actions.save"),
				"cancel-label": g(n)("common.actions.cancel"),
				"decrement-label": g(n)("common.actions.decrease"),
				"increment-label": g(n)("common.actions.increase"),
				pending: g(o).saving.value,
				"onUpdate:name": _[0] ||= (e) => {
					g(o).name.value = e;
				},
				"onUpdate:values": _[1] ||= (e) => g(B)(g(o).values, e),
				onSave: g(o).save,
				onCancel: g(o).close_dialog
			}, {
				"extra-fields": d(() => [M(G, {
					label: g(n)("assets.vibe.image_label"),
					hint: g(n)("assets.vibe.image_hint"),
					error: s.value
				}, {
					default: d(({ fieldId: e, describedBy: t }) => [l.value === null ? y("", !0) : (c(), f("img", {
						key: 0,
						src: l.value,
						alt: g(n)("assets.vibe.image_label"),
						class: k(g(I).reference_thumbnail)
					}, null, 10, Oe)), S("input", {
						id: e,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						"aria-describedby": t,
						"data-testid": "vibe-image-input",
						onChange: u
					}, null, 40, ke)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), M(G, { label: g(n)("assets.vibe.provider_label") }, {
					default: d(() => [M(Y, {
						"model-value": p.value,
						options: r.value,
						label: g(n)("assets.vibe.provider_label"),
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
		])]));
	}
}), Ne = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, Pe = ["placeholder"], Fe = ["aria-expanded"], Ie = /* @__PURE__ */ j({
	__name: "VocabularyPanel",
	props: {
		catalog: {},
		installCommand: {},
		loading: { type: Boolean },
		controller: {},
		locale: {}
	},
	setup(e) {
		let t = e, { t: n } = C();
		r(() => {
			t.controller.load_vocabulary_catalog();
		});
		let i = /nsfw|adult|explicit/iu;
		function s(e) {
			return i.test(e.package_id) || i.test(e.display_name.en) || i.test(e.display_name["zh-CN"]);
		}
		let l = T(() => t.catalog.filter((e) => !s(e))), m = T(() => t.catalog.filter((e) => s(e))), h = _(!1);
		function v(e) {
			return t.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let x = _(null), w = _(null);
		function D(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return n("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return n("assets.vocabulary.progress_downloading");
				case "verifying_package": return n("assets.vocabulary.progress_verifying_package");
				case "installing": return n("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function j(e) {
			x.value === null && (x.value = e.package_id, w.value = null, await t.controller.install_vocabulary_package(e, (e) => {
				w.value = D(e);
			}), x.value = null, w.value = null, t.controller.state.assets.vocabulary_install_command.status === "success" && (P.value = [], L.value = null, N.value.trim() !== "" && await U()));
		}
		let N = _(""), P = _([]), L = _(null), R = _(!1), z = _(!1), B = _(null), H = null;
		async function U() {
			let e = N.value.trim();
			if (e === "") {
				P.value = [], L.value = null;
				return;
			}
			R.value = !0;
			try {
				let n = await t.controller.search_vocabulary(e);
				P.value = n.results, L.value = n.next_cursor;
			} finally {
				R.value = !1;
			}
		}
		async function W() {
			if (L.value !== null) {
				z.value = !0;
				try {
					let e = await t.controller.load_more_vocabulary(L.value);
					P.value = [...P.value, ...e.results], L.value = e.next_cursor;
				} finally {
					z.value = !1;
				}
			}
		}
		u(N, () => {
			H !== null && clearTimeout(H), H = setTimeout(() => {
				U();
			}, 250);
		});
		async function G(e) {
			await navigator.clipboard.writeText(e.display_text), B.value = e.record_id, setTimeout(() => {
				B.value === e.record_id && (B.value = null);
			}, 2e3);
		}
		let ae = T(() => t.loading ? "loading" : t.catalog.length === 0 ? "empty" : "ready"), K = T(() => R.value && P.value.length === 0 ? "loading" : N.value.trim() === "" || P.value.length > 0 ? "ready" : "empty");
		return (e, t) => (c(), f("div", { class: k(g(I).vocabularyPanel) }, [
			S("section", null, [
				S("p", { class: k(g(I).sectionTitle) }, E(g(n)("assets.vocabulary.search_placeholder")), 3),
				S("div", { class: k(g(I).vocabularySearchRow) }, [S("label", Ne, E(g(n)("assets.vocabulary.search_placeholder")), 1), o(S("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": t[0] ||= (e) => N.value = e,
					type: "text",
					class: k(g(I).searchInput),
					placeholder: g(n)("assets.vocabulary.search_placeholder")
				}, null, 10, Pe), [[p, N.value]])], 2),
				M(ie, {
					status: K.value,
					"empty-title": g(n)("assets.vocabulary.empty_title"),
					"empty-message": g(n)("assets.vocabulary.empty_description"),
					"min-height": "60px"
				}, {
					default: d(() => [P.value.length > 0 ? (c(), f("ul", {
						key: 0,
						class: k(g(I).searchResultsList)
					}, [(c(!0), f(O, null, a(P.value, (e) => (c(), f("li", {
						key: e.record_id,
						class: k(g(I).searchResultRow)
					}, [
						S("span", { class: k(g(I).searchResultTag) }, E(e.display_text), 3),
						e.category ? (c(), f("span", {
							key: 0,
							class: k(g(I).searchResultTranslation)
						}, E(e.category), 3)) : y("", !0),
						M(V, {
							label: B.value === e.record_id ? g(n)("common.actions.copied") : g(n)("common.actions.copy"),
							icon: g(ne),
							variant: "secondary",
							onClick: () => void G(e)
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
					"empty-message"
				]),
				L.value === null ? y("", !0) : (c(), f("div", {
					key: 0,
					class: k(g(I).loadMoreRow)
				}, [M(V, {
					label: g(n)("common.actions.next"),
					variant: "secondary",
					pending: z.value,
					onClick: t[1] ||= () => void W()
				}, null, 8, ["label", "pending"])], 2))
			]),
			S("section", null, [
				S("p", { class: k(g(I).sectionTitle) }, E(g(n)("assets.vocabulary.update_action")), 3),
				M(ie, {
					status: ae.value,
					"empty-title": g(n)("assets.vocabulary.empty_title"),
					"empty-message": g(n)("assets.vocabulary.empty_description"),
					"min-height": "80px"
				}, {
					default: d(() => [S("div", { class: k(g(I).catalogList) }, [(c(!0), f(O, null, a(l.value, (e) => (c(), f("div", {
						key: e.package_id,
						class: k(g(I).catalogEntry)
					}, [S("div", { class: k(g(I).catalogEntryInfo) }, [S("span", { class: k(g(I).catalogEntryName) }, E(v(e)), 3), S("span", { class: k(["tc-tabular-nums", g(I).catalogEntryMeta]) }, E(g(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (c(), f("span", {
						key: 0,
						class: k(g(I).bundledBadge)
					}, E(g(n)("assets.vocabulary.bundled_label")), 3)) : (c(), b(V, {
						key: 1,
						label: g(n)("assets.vocabulary.import_action"),
						icon: g(re),
						variant: "primary",
						pending: x.value === e.package_id,
						onClick: () => void j(e)
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
				x.value !== null && w.value !== null ? (c(), f("p", {
					key: 0,
					class: k(g(I).installProgress)
				}, E(w.value), 3)) : y("", !0)
			]),
			m.value.length > 0 ? (c(), f("section", {
				key: 0,
				class: k(g(I).nsfwSection)
			}, [S("button", {
				type: "button",
				class: k(["tc-interactive", g(I).nsfwToggle]),
				"aria-expanded": h.value,
				onClick: t[2] ||= (e) => h.value = !h.value
			}, [M(ee, {
				icon: h.value ? g(te) : g(F),
				size: 14
			}, null, 8, ["icon"]), A(" " + E(g(n)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, Fe), h.value ? (c(), f("div", {
				key: 1,
				class: k(g(I).catalogList)
			}, [S("p", { class: k(g(I).nsfwNotice) }, E(g(n)("assets.vocabulary.nsfw_disclosure_hint")), 3), (c(!0), f(O, null, a(m.value, (e) => (c(), f("div", {
				key: e.package_id,
				class: k(g(I).catalogEntry)
			}, [S("div", { class: k(g(I).catalogEntryInfo) }, [S("span", { class: k(g(I).catalogEntryName) }, E(v(e)), 3), S("span", { class: k(["tc-tabular-nums", g(I).catalogEntryMeta]) }, E(g(n)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), M(V, {
				label: g(n)("assets.vocabulary.import_action"),
				icon: g(re),
				variant: "destructive",
				pending: x.value === e.package_id,
				onClick: () => void j(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (c(), f("p", {
				key: 0,
				class: k(g(I).nsfwNotice)
			}, E(g(n)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : y("", !0)
		], 2));
	}
}), Le = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, Re = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function ze(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(Le)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var Be = ["aria-label"], Ve = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], He = ["id", "value"], Ue = "unmapped", We = "{{", Ge = "}}", Ke = /* @__PURE__ */ j({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = C(), i = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], o = R("workflow", t.controller, () => i, () => n("errors.validation_required")), s = _(null), l = _([]);
		function p(e) {
			switch (e) {
				case "positive_prompt": return n("assets.workflow.target_positive_prompt");
				case "negative_prompt": return n("assets.workflow.target_negative_prompt");
				case "seed": return n("assets.workflow.target_seed");
				case "width": return n("assets.workflow.target_width");
				case "height": return n("assets.workflow.target_height");
				case "steps": return n("assets.workflow.target_steps");
			}
		}
		let m = T(() => [{
			value: Ue,
			label: n("assets.workflow.placeholder_unmapped")
		}, ...Re.map((e) => ({
			value: e,
			label: p(e)
		}))]);
		function v() {
			let e = o.values.workflow_json;
			return typeof e == "string" ? e : "";
		}
		function x(e) {
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
		u(() => o.editing_record.value, (e) => {
			e ? x(e.payload) : l.value = [];
		}, { immediate: !0 });
		function w() {
			let e = ze(v()), t = new Map(l.value.map((e) => [e.name, e.target]));
			l.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function D(e, t) {
			let n = l.value.find((t) => t.name === e);
			n && (n.target = t === Ue ? "" : t);
		}
		function A() {
			s.value?.click();
		}
		function j(e) {
			return `${We}${e}${Ge}`;
		}
		async function N(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			o.open_create(), o.name.value = n.name.replace(/\.json$/iu, ""), o.values.workflow_json = r, l.value = ze(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function P() {
			let e = {};
			for (let t of l.value) e[t.name] = t.target;
			o.values.placeholder_map = JSON.stringify(e), await o.save();
		}
		let ee = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, i) => (c(), f("div", null, [
			S("div", { class: k(g(I).workflowToolbarRow) }, [M(V, {
				label: g(n)("assets.workflow.import_action"),
				icon: g(ae),
				variant: "primary",
				onClick: A
			}, null, 8, ["label", "icon"]), S("input", {
				ref_key: "file_input",
				ref: s,
				class: k(g(I).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": g(n)("assets.workflow.import_action"),
				onChange: i[0] ||= (e) => void N(e)
			}, null, 42, Be)], 2),
			M(L, {
				records: e.records,
				"summary-fields": [],
				loading: e.loading,
				"search-label": g(n)("common.actions.search"),
				"search-placeholder": g(n)("common.actions.search"),
				"empty-title": g(n)("assets.workflow.empty_title"),
				"empty-description": g(n)("assets.workflow.empty_description"),
				"add-label": g(n)("assets.workflow.import_action"),
				"random-label": g(n)("assets.random_selection_action"),
				"reorder-hint": g(n)("assets.reorder_hint"),
				"edit-label": g(n)("assets.workflow.edit_action"),
				"delete-label": g(n)("common.actions.delete"),
				"delete-confirm-title": ee,
				"delete-confirm-description": g(n)("assets.delete_confirm_description"),
				"confirm-label": g(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": g(n)("confirmations.destructive.default_cancel_action"),
				"move-up-label": g(n)("assets.move_up_action"),
				"move-down-label": g(n)("assets.move_down_action"),
				"drag-handle-label": g(n)("assets.drag_handle_label"),
				onAdd: A,
				onEdit: g(o).open_edit,
				onDelete: g(o).remove,
				onReorder: g(o).reorder,
				onRandomSelect: g(o).random_select
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
			M(W, {
				open: g(o).dialog_open.value,
				title: g(n)("assets.workflow.edit_action"),
				description: g(n)("assets.form_dialog_description"),
				"close-label": g(n)("common.actions.close"),
				"onUpdate:open": i[4] ||= (e) => {
					e || g(o).close_dialog();
				}
			}, {
				default: d(() => [S("form", {
					class: k(g(I).form),
					onSubmit: i[3] ||= h(() => void P(), ["prevent"])
				}, [
					M(G, {
						label: g(n)("common.labels.name"),
						error: g(o).name_error.value,
						required: ""
					}, {
						default: d(({ fieldId: e, describedBy: t, invalid: r }) => [S("input", {
							id: e,
							class: k(g(I).textInput),
							type: "text",
							placeholder: g(n)("common.labels.name"),
							value: g(o).name.value,
							"aria-describedby": t,
							"aria-invalid": r,
							onInput: i[1] ||= (e) => g(o).name.value = e.target.value
						}, null, 42, Ve)]),
						_: 1
					}, 8, ["label", "error"]),
					M(G, { label: g(n)("assets.workflow.json_label") }, {
						default: d(({ fieldId: e }) => [S("textarea", {
							id: e,
							class: k(g(I).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: v(),
							onInput: i[2] ||= (e) => g(o).values.workflow_json = e.target.value
						}, null, 42, He)]),
						_: 1
					}, 8, ["label"]),
					M(V, {
						label: g(n)("assets.workflow.placeholder_scan_action"),
						icon: g(pe),
						variant: "secondary",
						type: "button",
						onClick: w
					}, null, 8, ["label", "icon"]),
					l.value.length > 0 ? (c(), f("div", {
						key: 0,
						class: k(g(I).placeholderList)
					}, [(c(!0), f(O, null, a(l.value, (e) => (c(), f("div", {
						key: e.name,
						class: k(g(I).placeholderRow)
					}, [S("span", { class: k(g(I).placeholderKey) }, E(j(e.name)), 3), (c(), b(X, {
						key: g(r),
						"model-value": e.target === "" ? Ue : e.target,
						options: m.value,
						placeholder: g(n)("assets.workflow.placeholder_unmapped"),
						ariaLabel: e.name,
						"onUpdate:modelValue": (t) => D(e.name, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128))], 2)) : y("", !0),
					S("div", { class: k(g(I).formActions) }, [M(V, {
						label: g(n)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: g(o).close_dialog
					}, null, 8, ["label", "onClick"]), M(V, {
						label: g(n)("common.actions.save"),
						variant: "primary",
						type: "submit",
						pending: g(o).saving.value
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
}), qe = /* @__PURE__ */ j({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = C(), i = /* @__PURE__ */ new Set([
			"character",
			"outfit",
			"lora",
			"vibe",
			"workflow"
		]), a = _(t.state.assets.active_category);
		function o(e) {
			a.value = e, i.has(e) && t.controller.set_active_asset_category(e);
		}
		let s = T(() => t.state.loading.has("assets")), l = T(() => t.state.loading.has("vocabulary")), u = T(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (c(), f("div", { class: k(g(I).assetsView) }, [M(g(he), {
			"model-value": a.value,
			"onUpdate:modelValue": o
		}, {
			default: d(() => [
				M(g(ve), {
					class: k(g(I).tabsList),
					"aria-label": g(n)("nav.assets")
				}, {
					default: d(() => [
						M(g($), {
							value: "vocabulary",
							class: k(g(I).tabsTrigger)
						}, {
							default: d(() => [A(E(g(n)("assets.tabs.vocabulary")), 1)]),
							_: 1
						}, 8, ["class"]),
						M(g($), {
							value: "character",
							class: k(g(I).tabsTrigger)
						}, {
							default: d(() => [A(E(g(n)("assets.tabs.characters")), 1)]),
							_: 1
						}, 8, ["class"]),
						M(g($), {
							value: "outfit",
							class: k(g(I).tabsTrigger)
						}, {
							default: d(() => [A(E(g(n)("assets.tabs.outfits")), 1)]),
							_: 1
						}, 8, ["class"]),
						M(g($), {
							value: "lora",
							class: k(g(I).tabsTrigger)
						}, {
							default: d(() => [A(E(g(n)("assets.tabs.lora")), 1)]),
							_: 1
						}, 8, ["class"]),
						M(g($), {
							value: "vibe",
							class: k(g(I).tabsTrigger)
						}, {
							default: d(() => [A(E(g(n)("assets.tabs.vibe")), 1)]),
							_: 1
						}, 8, ["class"]),
						M(g($), {
							value: "workflow",
							class: k(g(I).tabsTrigger)
						}, {
							default: d(() => [A(E(g(n)("assets.tabs.workflow")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					_: 1
				}, 8, ["class", "aria-label"]),
				M(g(Q), {
					value: "vocabulary",
					class: k(g(I).tabsContent)
				}, {
					default: d(() => [M(Ie, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						loading: l.value,
						controller: e.controller,
						locale: u.value
					}, null, 8, [
						"catalog",
						"install-command",
						"loading",
						"controller",
						"locale"
					])]),
					_: 1
				}, 8, ["class"]),
				M(g(Q), {
					value: "character",
					class: k(g(I).tabsContent)
				}, {
					default: d(() => [M(Te, {
						records: e.state.assets.records.character,
						"outfit-records": e.state.assets.records.outfit,
						loading: s.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"outfit-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				M(g(Q), {
					value: "outfit",
					class: k(g(I).tabsContent)
				}, {
					default: d(() => [M(De, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: s.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				M(g(Q), {
					value: "lora",
					class: k(g(I).tabsContent)
				}, {
					default: d(() => [M(Ee, {
						records: e.state.assets.records.lora,
						"character-records": e.state.assets.records.character,
						loading: s.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				M(g(Q), {
					value: "vibe",
					class: k(g(I).tabsContent)
				}, {
					default: d(() => [M(Me, {
						records: e.state.assets.records.vibe,
						loading: s.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				M(g(Q), {
					value: "workflow",
					class: k(g(I).tabsContent)
				}, {
					default: d(() => [M(Ke, {
						records: e.state.assets.records.workflow,
						loading: s.value,
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
export { qe as default };
