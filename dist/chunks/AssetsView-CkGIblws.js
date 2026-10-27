import { A as e, D as t, F as n, G as r, I as i, N as a, V as o, W as s, _ as c, a as l, at as u, c as d, ct as f, et as p, ft as m, g as h, h as g, k as _, m as v, n as y, nt as b, p as x, pt as S, s as C, u as w, ut as T, v as E, x as D, y as O } from "./vue-i18n-DUz2Gjn8.js";
import { n as k, t as A } from "./AppIcon-Cnhzrx9o.js";
import { t as j } from "./chevron-down-Tu_8qTxg.js";
import { t as ee } from "./chevron-up-D4TetO-M.js";
import { n as te, t as M } from "./download-DHgWv1wH.js";
import { a as N, i as P, n as F, r as I, t as L } from "./use_asset_category_panel-C1ALZa7b.js";
import { n as R, t as ne } from "./StateSurface-C9BHPFzJ.js";
import { n as z, r as B, t as V } from "./AppDialog-CZA1VX_t.js";
import { t as H } from "./FieldGroup-BT7DUBzO.js";
import { t as U } from "./upload-CQtsg_mB.js";
import { t as W } from "./_prop_utils-CqbCYIc0.js";
import { M as G, _ as re, c as K, i as q, o as ie, s as ae } from "./Teleport-CZ6NJvBB.js";
import { t as oe } from "./AppCheckbox-RNtXaamz.js";
import { n as se } from "./NumberStepper-D_xT95AR.js";
import { c as ce } from "./PopperContent-8IQaFABb.js";
import { t as J } from "./AppSelect-cXrCnvJ_.js";
import { t as le } from "./reference_image-DYyYuujP.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/scan-search.js
var ue = k("scan-search", [
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
]), [Y, de] = /*#__PURE__*/ G("TabsRoot"), fe = /* @__PURE__ */ D({
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
		let n = e, r = t, { orientation: o, unmountOnHide: c, dir: l } = u(n), d = ce(l);
		K();
		let m = re(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), h = p(), _ = b(/* @__PURE__ */ new Set());
		return de({
			modelValue: m,
			changeModelValue: (e) => {
				m.value = e;
			},
			orientation: o,
			dir: d,
			unmountOnHide: c,
			activationMode: n.activationMode,
			baseId: ae(void 0, "reka-tabs"),
			tabsList: h,
			contentIds: _,
			registerContent: (e) => {
				_.value = /* @__PURE__ */ new Set([..._.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(_.value);
				t.delete(e), _.value = t;
			}
		}), (e, t) => (a(), g(f(q), {
			dir: f(d),
			"data-orientation": f(o),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: s(() => [i(e.$slots, "default", { modelValue: f(m) })]),
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
function pe(e, t) {
	return `${e}-trigger-${t}`;
}
function me(e, t) {
	return `${e}-content-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var X = /* @__PURE__ */ D({
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
	setup(t) {
		let n = t, { forwardRef: r } = K(), o = Y(), c = x(() => pe(o.baseId, n.value)), l = x(() => me(o.baseId, n.value)), u = x(() => n.value === o.modelValue.value), d = p(u.value);
		return e(() => {
			o.registerContent(n.value), requestAnimationFrame(() => {
				d.value = !1;
			});
		}), _(() => {
			o.unregisterContent(n.value);
		}), (e, t) => (a(), g(f(ie), {
			present: e.forceMount || u.value,
			"force-mount": ""
		}, {
			default: s(({ present: t }) => [O(f(q), {
				id: l.value,
				ref: f(r),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": u.value ? "active" : "inactive",
				"data-orientation": f(o).orientation.value,
				"aria-labelledby": c.value,
				hidden: !t,
				tabindex: "0",
				style: m({ animationDuration: d.value ? "0s" : void 0 })
			}, {
				default: s(() => [!f(o).unmountOnHide.value || t ? i(e.$slots, "default", { key: 0 }) : h("v-if", !0)]),
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
}), he = /* @__PURE__ */ D({
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
		let { loop: t } = u(e), { forwardRef: n, currentElement: r } = K(), o = Y();
		return o.tabsList = r, (e, r) => (a(), g(f(B), {
			"as-child": "",
			orientation: f(o).orientation.value,
			dir: f(o).dir.value,
			loop: f(t)
		}, {
			default: s(() => [O(f(q), {
				ref: f(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": f(o).orientation.value
			}, {
				default: s(() => [i(e.$slots, "default")]),
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
}), Z = /* @__PURE__ */ D({
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
		let t = e, { forwardRef: n } = K(), r = Y(), o = x(() => pe(r.baseId, t.value)), c = x(() => r.contentIds.value.has(t.value) ? me(r.baseId, t.value) : void 0), l = x(() => t.value === r.modelValue.value);
		return (e, t) => (a(), g(f(z), {
			"as-child": "",
			focusable: !e.disabled,
			active: l.value
		}, {
			default: s(() => [O(f(q), {
				id: o.value,
				ref: f(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": l.value ? "true" : "false",
				"aria-controls": c.value,
				"data-state": l.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": f(r).orientation.value,
				onMousedown: t[0] ||= d((t) => {
					!e.disabled && t.ctrlKey === !1 ? f(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= C((t) => f(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = f(r).activationMode !== "manual";
					!l.value && !e.disabled && t && f(r).changeModelValue(e.value);
				}
			}, {
				default: s(() => [i(e.$slots, "default")]),
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
}), ge = ["src", "alt"], _e = ["id", "aria-describedby"], ve = /* @__PURE__ */ D({
	__name: "CharacterPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = y(), r = x(() => [
			{
				key: "role_label",
				label: n("assets.characters.role_label"),
				kind: "text"
			},
			{
				key: "appearance",
				label: n("assets.characters.appearance_label"),
				kind: "textarea"
			},
			{
				key: "excluded_traits",
				label: n("assets.characters.excluded_traits_label"),
				kind: "text",
				hint: n("assets.characters.excluded_traits_hint")
			},
			{
				key: "context_notes",
				label: n("assets.characters.context_notes_label"),
				kind: "textarea"
			}
		]), i = [
			"reference_image",
			"reference_send",
			"reference_mode"
		], o = F("character", t.controller, () => r.value, () => n("errors.validation_required"), i), l = x(() => [
			{
				value: "vibe",
				label: n("assets.characters.reference_mode_vibe")
			},
			{
				value: "img2img",
				label: n("assets.characters.reference_mode_img2img")
			},
			{
				value: "precise",
				label: n("assets.characters.reference_mode_precise")
			}
		]), u = p(null), d = x(() => typeof o.values.reference_image == "string" && o.values.reference_image !== "" ? o.values.reference_image : null), m = x(() => typeof o.values.reference_mode == "string" ? o.values.reference_mode : "vibe");
		async function _(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				u.value = null;
				try {
					o.values.reference_image = await le(t), o.values.reference_mode = m.value;
				} catch {
					u.value = n("assets.characters.reference_image_unreadable");
				}
			}
		}
		function b() {
			for (let e of i) Reflect.deleteProperty(o.values, e);
		}
		let S = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, i) => (a(), c("div", null, [O(P, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": f(n)("common.actions.search"),
			"search-placeholder": f(n)("common.actions.search"),
			"empty-title": f(n)("assets.characters.empty_title"),
			"empty-description": f(n)("assets.characters.empty_description"),
			"add-label": f(n)("assets.characters.add_action"),
			"random-label": f(n)("assets.random_selection_action"),
			"reorder-hint": f(n)("assets.reorder_hint"),
			"edit-label": f(n)("common.actions.edit"),
			"delete-label": f(n)("common.actions.delete"),
			"delete-confirm-title": S,
			"delete-confirm-description": f(n)("assets.delete_confirm_description"),
			"confirm-label": f(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": f(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": f(n)("assets.move_up_action"),
			"move-down-label": f(n)("assets.move_down_action"),
			"drag-handle-label": f(n)("assets.drag_handle_label"),
			onAdd: f(o).open_create,
			onEdit: f(o).open_edit,
			onDelete: f(o).remove,
			onReorder: f(o).reorder,
			onRandomSelect: f(o).random_select
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
		]), O(V, {
			open: f(o).dialog_open.value,
			title: f(o).editing_record.value ? f(n)("common.actions.edit") : f(n)("assets.characters.add_action"),
			description: f(n)("assets.form_dialog_description"),
			"close-label": f(n)("common.actions.close"),
			"onUpdate:open": i[4] ||= (e) => {
				e || f(o).close_dialog();
			}
		}, {
			default: s(() => [O(I, {
				"name-label": f(n)("common.labels.name"),
				"name-placeholder": f(n)("common.labels.name"),
				name: f(o).name.value,
				"name-error": f(o).name_error.value,
				"save-error": f(o).save_error.value,
				fields: r.value,
				values: f(o).values,
				"save-label": f(n)("common.actions.save"),
				"cancel-label": f(n)("common.actions.cancel"),
				"decrement-label": f(n)("common.actions.decrease"),
				"increment-label": f(n)("common.actions.increase"),
				pending: f(o).saving.value,
				"onUpdate:name": i[2] ||= (e) => {
					f(o).name.value = e;
				},
				"onUpdate:values": i[3] ||= (e) => f(L)(f(o).values, e),
				onSave: f(o).save,
				onCancel: f(o).close_dialog
			}, {
				"extra-fields": s(() => [O(H, {
					label: f(n)("assets.characters.reference_image_label"),
					hint: f(n)("assets.characters.reference_image_hint"),
					error: u.value
				}, {
					default: s(({ fieldId: e, describedBy: t }) => [
						d.value === null ? h("", !0) : (a(), c("img", {
							key: 0,
							src: d.value,
							alt: f(n)("assets.characters.reference_image_label"),
							class: T(f(N).reference_thumbnail)
						}, null, 10, ge)),
						v("input", {
							id: e,
							type: "file",
							accept: "image/png,image/jpeg,image/webp",
							"aria-describedby": t,
							"data-testid": "character-reference-input",
							onChange: _
						}, null, 40, _e),
						d.value === null ? h("", !0) : (a(), g(R, {
							key: 1,
							label: f(n)("assets.characters.reference_image_remove"),
							onClick: b
						}, null, 8, ["label"]))
					]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), d.value === null ? h("", !0) : (a(), c(w, { key: 0 }, [O(oe, {
					"model-value": f(o).values.reference_send === 1,
					label: f(n)("assets.characters.reference_send_label"),
					"onUpdate:modelValue": i[0] ||= (e) => f(o).values.reference_send = +!!e
				}, null, 8, ["model-value", "label"]), O(H, {
					label: f(n)("assets.characters.reference_mode_label"),
					hint: f(n)("assets.characters.reference_mode_hint")
				}, {
					default: s(() => [O(se, {
						"model-value": m.value,
						options: l.value,
						label: f(n)("assets.characters.reference_mode_label"),
						"onUpdate:modelValue": i[1] ||= (e) => f(o).values.reference_mode = e
					}, null, 8, [
						"model-value",
						"options",
						"label"
					])]),
					_: 1
				}, 8, ["label", "hint"])], 64))]),
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
}), ye = /* @__PURE__ */ D({
	__name: "LoraPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let n = e, { t: r } = y(), i = x(() => [
			{
				key: "file_name",
				label: r("assets.lora.file_name_label"),
				kind: "text",
				required: !0,
				hint: r("assets.lora.file_name_hint")
			},
			{
				key: "trigger_words",
				label: r("assets.lora.trigger_words_label"),
				kind: "text"
			},
			{
				key: "weight",
				label: r("assets.lora.weight_label"),
				kind: "number",
				min: 0,
				max: 2,
				step: .05
			}
		]), o = [
			{
				key: "file_name",
				label: r("assets.lora.file_name_label")
			},
			{
				key: "weight",
				label: r("assets.lora.weight_label"),
				numeric: !0
			},
			{
				key: "trigger_words",
				label: r("assets.lora.trigger_words_label")
			}
		], l = F("lora", n.controller, () => i.value, () => r("errors.validation_required"), ["character_id"]);
		function u() {
			l.open_create(), l.values.weight = 1;
		}
		let d = x(() => n.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), p = x(() => {
			let e = l.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		}), m = (e) => r("assets.delete_confirm_title", { name: e });
		return (n, h) => (a(), c("div", null, [O(P, {
			records: e.records,
			"summary-fields": o,
			loading: e.loading,
			"search-label": f(r)("common.actions.search"),
			"search-placeholder": f(r)("common.actions.search"),
			"empty-title": f(r)("assets.lora.empty_title"),
			"empty-description": f(r)("assets.lora.empty_description"),
			"add-label": f(r)("assets.lora.add_action"),
			"random-label": f(r)("assets.random_selection_action"),
			"reorder-hint": f(r)("assets.reorder_hint"),
			"edit-label": f(r)("common.actions.edit"),
			"delete-label": f(r)("common.actions.delete"),
			"delete-confirm-title": m,
			"delete-confirm-description": f(r)("assets.delete_confirm_description"),
			"confirm-label": f(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": f(r)("confirmations.destructive.default_cancel_action"),
			"move-up-label": f(r)("assets.move_up_action"),
			"move-down-label": f(r)("assets.move_down_action"),
			"drag-handle-label": f(r)("assets.drag_handle_label"),
			onAdd: u,
			onEdit: f(l).open_edit,
			onDelete: f(l).remove,
			onReorder: f(l).reorder,
			onRandomSelect: f(l).random_select
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
		]), O(V, {
			open: f(l).dialog_open.value,
			title: f(l).editing_record.value ? f(r)("common.actions.edit") : f(r)("assets.lora.add_action"),
			description: f(r)("assets.form_dialog_description"),
			"close-label": f(r)("common.actions.close"),
			"onUpdate:open": h[3] ||= (e) => {
				e || f(l).close_dialog();
			}
		}, {
			default: s(() => [O(I, {
				"name-label": f(r)("common.labels.name"),
				"name-placeholder": f(r)("common.labels.name"),
				name: f(l).name.value,
				"name-error": f(l).name_error.value,
				"save-error": f(l).save_error.value,
				fields: i.value,
				values: f(l).values,
				"save-label": f(r)("common.actions.save"),
				"cancel-label": f(r)("common.actions.cancel"),
				"decrement-label": f(r)("common.actions.decrease"),
				"increment-label": f(r)("common.actions.increase"),
				pending: f(l).saving.value,
				"onUpdate:name": h[1] ||= (e) => {
					f(l).name.value = e;
				},
				"onUpdate:values": h[2] ||= (e) => f(L)(f(l).values, e),
				onSave: f(l).save,
				onCancel: f(l).close_dialog
			}, {
				"extra-fields": s(() => [O(H, {
					label: f(r)("assets.lora.character_label"),
					hint: f(r)("assets.lora.character_hint")
				}, {
					default: s(({ fieldId: e, describedBy: n }) => [O(J, t({
						id: e,
						"model-value": p.value,
						options: d.value,
						placeholder: f(r)("assets.lora.character_placeholder")
					}, f(W)({ describedBy: n }), { "onUpdate:modelValue": h[0] ||= (e) => f(l).values.character_id = e }), null, 16, [
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
}), be = /* @__PURE__ */ D({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let n = e, { t: r } = y(), i = x(() => [{
			key: "description",
			label: r("assets.outfits.description_label"),
			kind: "textarea"
		}]), o = [], l = F("outfit", n.controller, () => i.value, () => r("errors.validation_required"), ["character_id"]), u = x(() => n.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), d = x(() => {
			let e = l.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function p(e) {
			l.values.character_id = e;
		}
		let m = (e) => r("assets.delete_confirm_title", { name: e });
		return (n, h) => (a(), c("div", null, [O(P, {
			records: e.records,
			"summary-fields": o,
			loading: e.loading,
			"search-label": f(r)("common.actions.search"),
			"search-placeholder": f(r)("common.actions.search"),
			"empty-title": f(r)("assets.outfits.empty_title"),
			"empty-description": f(r)("assets.outfits.empty_description"),
			"add-label": f(r)("assets.outfits.add_action"),
			"random-label": f(r)("assets.random_selection_action"),
			"reorder-hint": f(r)("assets.reorder_hint"),
			"edit-label": f(r)("common.actions.edit"),
			"delete-label": f(r)("common.actions.delete"),
			"delete-confirm-title": m,
			"delete-confirm-description": f(r)("assets.delete_confirm_description"),
			"confirm-label": f(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": f(r)("confirmations.destructive.default_cancel_action"),
			"move-up-label": f(r)("assets.move_up_action"),
			"move-down-label": f(r)("assets.move_down_action"),
			"drag-handle-label": f(r)("assets.drag_handle_label"),
			onAdd: f(l).open_create,
			onEdit: f(l).open_edit,
			onDelete: f(l).remove,
			onReorder: f(l).reorder,
			onRandomSelect: f(l).random_select
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
		]), O(V, {
			open: f(l).dialog_open.value,
			title: f(l).editing_record.value ? f(r)("common.actions.edit") : f(r)("assets.outfits.add_action"),
			description: f(r)("assets.form_dialog_description"),
			"close-label": f(r)("common.actions.close"),
			"onUpdate:open": h[2] ||= (e) => {
				e || f(l).close_dialog();
			}
		}, {
			default: s(() => [O(I, {
				"name-label": f(r)("common.labels.name"),
				"name-placeholder": f(r)("common.labels.name"),
				name: f(l).name.value,
				"name-error": f(l).name_error.value,
				"save-error": f(l).save_error.value,
				fields: i.value,
				values: f(l).values,
				"save-label": f(r)("common.actions.save"),
				"cancel-label": f(r)("common.actions.cancel"),
				"decrement-label": f(r)("common.actions.decrease"),
				"increment-label": f(r)("common.actions.increase"),
				pending: f(l).saving.value,
				"onUpdate:name": h[0] ||= (e) => {
					f(l).name.value = e;
				},
				"onUpdate:values": h[1] ||= (e) => f(L)(f(l).values, e),
				onSave: f(l).save,
				onCancel: f(l).close_dialog
			}, {
				"extra-fields": s(() => [O(H, { label: f(r)("assets.outfits.character_label") }, {
					default: s(({ fieldId: e, describedBy: n }) => [O(J, t({
						id: e,
						"model-value": d.value,
						options: u.value,
						placeholder: f(r)("assets.outfits.character_placeholder")
					}, f(W)({ describedBy: n }), { "onUpdate:modelValue": p }), null, 16, [
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
}), xe = ["src", "alt"], Se = ["id", "aria-describedby"], Ce = "novelai", we = "google", Te = /* @__PURE__ */ D({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = y(), r = x(() => [{
			value: Ce,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: we,
			label: n("assets.vibe.provider_google")
		}]), i = x(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return l.values.provider !== we && e.push({
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
		}], l = F("vibe", t.controller, () => i.value, () => n("errors.validation_required"), ["provider", "image"]), u = p(null), d = x(() => typeof l.values.image == "string" && l.values.image !== "" ? l.values.image : null);
		async function m(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				u.value = null;
				try {
					l.values.image = await le(t);
				} catch {
					u.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let g = x(() => typeof l.values.provider == "string" && l.values.provider !== "" ? l.values.provider : Ce);
		function _(e) {
			l.values.provider = e;
		}
		let b = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, p) => (a(), c("div", null, [O(P, {
			records: e.records,
			"summary-fields": o,
			loading: e.loading,
			"search-label": f(n)("common.actions.search"),
			"search-placeholder": f(n)("common.actions.search"),
			"empty-title": f(n)("assets.vibe.empty_title"),
			"empty-description": f(n)("assets.vibe.empty_description"),
			"add-label": f(n)("assets.vibe.add_action"),
			"random-label": f(n)("assets.random_selection_action"),
			"reorder-hint": f(n)("assets.reorder_hint"),
			"edit-label": f(n)("common.actions.edit"),
			"delete-label": f(n)("common.actions.delete"),
			"delete-confirm-title": b,
			"delete-confirm-description": f(n)("assets.delete_confirm_description"),
			"confirm-label": f(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": f(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": f(n)("assets.move_up_action"),
			"move-down-label": f(n)("assets.move_down_action"),
			"drag-handle-label": f(n)("assets.drag_handle_label"),
			onAdd: f(l).open_create,
			onEdit: f(l).open_edit,
			onDelete: f(l).remove,
			onReorder: f(l).reorder,
			onRandomSelect: f(l).random_select
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
		]), O(V, {
			open: f(l).dialog_open.value,
			title: f(l).editing_record.value ? f(n)("common.actions.edit") : f(n)("assets.vibe.add_action"),
			description: f(n)("assets.form_dialog_description"),
			"close-label": f(n)("common.actions.close"),
			"onUpdate:open": p[2] ||= (e) => {
				e || f(l).close_dialog();
			}
		}, {
			default: s(() => [O(I, {
				"name-label": f(n)("common.labels.name"),
				"name-placeholder": f(n)("common.labels.name"),
				name: f(l).name.value,
				"name-error": f(l).name_error.value,
				"save-error": f(l).save_error.value,
				fields: i.value,
				values: f(l).values,
				"save-label": f(n)("common.actions.save"),
				"cancel-label": f(n)("common.actions.cancel"),
				"decrement-label": f(n)("common.actions.decrease"),
				"increment-label": f(n)("common.actions.increase"),
				pending: f(l).saving.value,
				"onUpdate:name": p[0] ||= (e) => {
					f(l).name.value = e;
				},
				"onUpdate:values": p[1] ||= (e) => f(L)(f(l).values, e),
				onSave: f(l).save,
				onCancel: f(l).close_dialog
			}, {
				"extra-fields": s(() => [O(H, {
					label: f(n)("assets.vibe.image_label"),
					hint: f(n)("assets.vibe.image_hint"),
					error: u.value
				}, {
					default: s(({ fieldId: e, describedBy: t }) => [d.value === null ? h("", !0) : (a(), c("img", {
						key: 0,
						src: d.value,
						alt: f(n)("assets.vibe.image_label"),
						class: T(f(N).reference_thumbnail)
					}, null, 10, xe)), v("input", {
						id: e,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						"aria-describedby": t,
						"data-testid": "vibe-image-input",
						onChange: m
					}, null, 40, Se)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), O(H, { label: f(n)("assets.vibe.provider_label") }, {
					default: s(() => [O(se, {
						"model-value": g.value,
						options: r.value,
						label: f(n)("assets.vibe.provider_label"),
						"onUpdate:modelValue": _
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
}), Ee = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, De = ["placeholder"], Oe = ["aria-expanded"], ke = /* @__PURE__ */ D({
	__name: "VocabularyPanel",
	props: {
		catalog: {},
		installCommand: {},
		loading: { type: Boolean },
		controller: {},
		locale: {}
	},
	setup(t) {
		let i = t, { t: u } = y();
		e(() => {
			i.controller.load_vocabulary_catalog();
		});
		let d = /nsfw|adult|explicit/iu;
		function m(e) {
			return d.test(e.package_id) || d.test(e.display_name.en) || d.test(e.display_name["zh-CN"]);
		}
		let _ = x(() => i.catalog.filter((e) => !m(e))), b = x(() => i.catalog.filter((e) => m(e))), C = p(!1);
		function D(e) {
			return i.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let k = p(null), P = p(null);
		function F(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return u("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return u("assets.vocabulary.progress_downloading");
				case "verifying_package": return u("assets.vocabulary.progress_verifying_package");
				case "installing": return u("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function I(e) {
			k.value === null && (k.value = e.package_id, P.value = null, await i.controller.install_vocabulary_package(e, (e) => {
				P.value = F(e);
			}), k.value = null, P.value = null, i.controller.state.assets.vocabulary_install_command.status === "success" && (z.value = [], B.value = null, L.value.trim() !== "" && await G()));
		}
		let L = p(""), z = p([]), B = p(null), V = p(!1), H = p(!1), U = p(null), W = null;
		async function G() {
			let e = L.value.trim();
			if (e === "") {
				z.value = [], B.value = null;
				return;
			}
			V.value = !0;
			try {
				let t = await i.controller.search_vocabulary(e);
				z.value = t.results, B.value = t.next_cursor;
			} finally {
				V.value = !1;
			}
		}
		async function re() {
			if (B.value !== null) {
				H.value = !0;
				try {
					let e = await i.controller.load_more_vocabulary(B.value);
					z.value = [...z.value, ...e.results], B.value = e.next_cursor;
				} finally {
					H.value = !1;
				}
			}
		}
		o(L, () => {
			W !== null && clearTimeout(W), W = setTimeout(() => {
				G();
			}, 250);
		});
		async function K(e) {
			await navigator.clipboard.writeText(e.display_text), U.value = e.record_id, setTimeout(() => {
				U.value === e.record_id && (U.value = null);
			}, 2e3);
		}
		let q = x(() => i.loading ? "loading" : i.catalog.length === 0 ? "empty" : "ready"), ie = x(() => V.value && z.value.length === 0 ? "loading" : L.value.trim() === "" || z.value.length > 0 ? "ready" : "empty");
		return (e, t) => (a(), c("div", { class: T(f(N).vocabularyPanel) }, [
			v("section", null, [
				v("p", { class: T(f(N).sectionTitle) }, S(f(u)("assets.vocabulary.search_placeholder")), 3),
				v("div", { class: T(f(N).vocabularySearchRow) }, [v("label", Ee, S(f(u)("assets.vocabulary.search_placeholder")), 1), r(v("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
					type: "text",
					class: T(f(N).searchInput),
					placeholder: f(u)("assets.vocabulary.search_placeholder")
				}, null, 10, De), [[l, L.value]])], 2),
				O(ne, {
					status: ie.value,
					"empty-title": f(u)("assets.vocabulary.empty_title"),
					"empty-message": f(u)("assets.vocabulary.empty_description"),
					"min-height": "60px"
				}, {
					default: s(() => [z.value.length > 0 ? (a(), c("ul", {
						key: 0,
						class: T(f(N).searchResultsList)
					}, [(a(!0), c(w, null, n(z.value, (e) => (a(), c("li", {
						key: e.record_id,
						class: T(f(N).searchResultRow)
					}, [
						v("span", { class: T(f(N).searchResultTag) }, S(e.display_text), 3),
						e.category ? (a(), c("span", {
							key: 0,
							class: T(f(N).searchResultTranslation)
						}, S(e.category), 3)) : h("", !0),
						O(R, {
							label: U.value === e.record_id ? f(u)("common.actions.copied") : f(u)("common.actions.copy"),
							icon: f(te),
							variant: "secondary",
							onClick: () => void K(e)
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
					"empty-message"
				]),
				B.value === null ? h("", !0) : (a(), c("div", {
					key: 0,
					class: T(f(N).loadMoreRow)
				}, [O(R, {
					label: f(u)("common.actions.next"),
					variant: "secondary",
					pending: H.value,
					onClick: t[1] ||= () => void re()
				}, null, 8, ["label", "pending"])], 2))
			]),
			v("section", null, [
				v("p", { class: T(f(N).sectionTitle) }, S(f(u)("assets.vocabulary.update_action")), 3),
				O(ne, {
					status: q.value,
					"empty-title": f(u)("assets.vocabulary.empty_title"),
					"empty-message": f(u)("assets.vocabulary.empty_description"),
					"min-height": "80px"
				}, {
					default: s(() => [v("div", { class: T(f(N).catalogList) }, [(a(!0), c(w, null, n(_.value, (e) => (a(), c("div", {
						key: e.package_id,
						class: T(f(N).catalogEntry)
					}, [v("div", { class: T(f(N).catalogEntryInfo) }, [v("span", { class: T(f(N).catalogEntryName) }, S(D(e)), 3), v("span", { class: T(["tc-tabular-nums", f(N).catalogEntryMeta]) }, S(f(u)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (a(), c("span", {
						key: 0,
						class: T(f(N).bundledBadge)
					}, S(f(u)("assets.vocabulary.bundled_label")), 3)) : (a(), g(R, {
						key: 1,
						label: f(u)("assets.vocabulary.import_action"),
						icon: f(M),
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
					"empty-message"
				]),
				k.value !== null && P.value !== null ? (a(), c("p", {
					key: 0,
					class: T(f(N).installProgress)
				}, S(P.value), 3)) : h("", !0)
			]),
			b.value.length > 0 ? (a(), c("section", {
				key: 0,
				class: T(f(N).nsfwSection)
			}, [v("button", {
				type: "button",
				class: T(["tc-interactive", f(N).nsfwToggle]),
				"aria-expanded": C.value,
				onClick: t[2] ||= (e) => C.value = !C.value
			}, [O(A, {
				icon: C.value ? f(ee) : f(j),
				size: 14
			}, null, 8, ["icon"]), E(" " + S(f(u)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, Oe), C.value ? (a(), c("div", {
				key: 1,
				class: T(f(N).catalogList)
			}, [v("p", { class: T(f(N).nsfwNotice) }, S(f(u)("assets.vocabulary.nsfw_disclosure_hint")), 3), (a(!0), c(w, null, n(b.value, (e) => (a(), c("div", {
				key: e.package_id,
				class: T(f(N).catalogEntry)
			}, [v("div", { class: T(f(N).catalogEntryInfo) }, [v("span", { class: T(f(N).catalogEntryName) }, S(D(e)), 3), v("span", { class: T(["tc-tabular-nums", f(N).catalogEntryMeta]) }, S(f(u)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), O(R, {
				label: f(u)("assets.vocabulary.import_action"),
				icon: f(M),
				variant: "destructive",
				pending: k.value === e.package_id,
				onClick: () => void I(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (a(), c("p", {
				key: 0,
				class: T(f(N).nsfwNotice)
			}, S(f(u)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : h("", !0)
		], 2));
	}
}), Ae = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, je = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function Q(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(Ae)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var Me = ["aria-label"], Ne = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], Pe = ["id", "value"], $ = "unmapped", Fe = "{{", Ie = "}}", Le = /* @__PURE__ */ D({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: r, locale: i } = y(), l = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], u = F("workflow", t.controller, () => l, () => r("errors.validation_required")), m = p(null), _ = p([]);
		function b(e) {
			switch (e) {
				case "positive_prompt": return r("assets.workflow.target_positive_prompt");
				case "negative_prompt": return r("assets.workflow.target_negative_prompt");
				case "seed": return r("assets.workflow.target_seed");
				case "width": return r("assets.workflow.target_width");
				case "height": return r("assets.workflow.target_height");
				case "steps": return r("assets.workflow.target_steps");
			}
		}
		let C = x(() => [{
			value: $,
			label: r("assets.workflow.placeholder_unmapped")
		}, ...je.map((e) => ({
			value: e,
			label: b(e)
		}))]);
		function E() {
			let e = u.values.workflow_json;
			return typeof e == "string" ? e : "";
		}
		function D(e) {
			let t = e.placeholder_map, n = {};
			if (typeof t == "string") try {
				let e = JSON.parse(t);
				typeof e == "object" && e && (n = e);
			} catch {
				n = {};
			}
			_.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		o(() => u.editing_record.value, (e) => {
			e ? D(e.payload) : _.value = [];
		}, { immediate: !0 });
		function k() {
			let e = Q(E()), t = new Map(_.value.map((e) => [e.name, e.target]));
			_.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function A(e, t) {
			let n = _.value.find((t) => t.name === e);
			n && (n.target = t === $ ? "" : t);
		}
		function j() {
			m.value?.click();
		}
		function ee(e) {
			return `${Fe}${e}${Ie}`;
		}
		async function te(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			u.open_create(), u.name.value = n.name.replace(/\.json$/iu, ""), u.values.workflow_json = r, _.value = Q(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function M() {
			let e = {};
			for (let t of _.value) e[t.name] = t.target;
			u.values.placeholder_map = JSON.stringify(e), await u.save();
		}
		let I = (e) => r("assets.delete_confirm_title", { name: e });
		return (t, o) => (a(), c("div", null, [
			v("div", { class: T(f(N).workflowToolbarRow) }, [O(R, {
				label: f(r)("assets.workflow.import_action"),
				icon: f(U),
				variant: "primary",
				onClick: j
			}, null, 8, ["label", "icon"]), v("input", {
				ref_key: "file_input",
				ref: m,
				class: T(f(N).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": f(r)("assets.workflow.import_action"),
				onChange: o[0] ||= (e) => void te(e)
			}, null, 42, Me)], 2),
			O(P, {
				records: e.records,
				"summary-fields": [],
				loading: e.loading,
				"search-label": f(r)("common.actions.search"),
				"search-placeholder": f(r)("common.actions.search"),
				"empty-title": f(r)("assets.workflow.empty_title"),
				"empty-description": f(r)("assets.workflow.empty_description"),
				"add-label": f(r)("assets.workflow.import_action"),
				"random-label": f(r)("assets.random_selection_action"),
				"reorder-hint": f(r)("assets.reorder_hint"),
				"edit-label": f(r)("assets.workflow.edit_action"),
				"delete-label": f(r)("common.actions.delete"),
				"delete-confirm-title": I,
				"delete-confirm-description": f(r)("assets.delete_confirm_description"),
				"confirm-label": f(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": f(r)("confirmations.destructive.default_cancel_action"),
				"move-up-label": f(r)("assets.move_up_action"),
				"move-down-label": f(r)("assets.move_down_action"),
				"drag-handle-label": f(r)("assets.drag_handle_label"),
				onAdd: j,
				onEdit: f(u).open_edit,
				onDelete: f(u).remove,
				onReorder: f(u).reorder,
				onRandomSelect: f(u).random_select
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
			O(V, {
				open: f(u).dialog_open.value,
				title: f(r)("assets.workflow.edit_action"),
				description: f(r)("assets.form_dialog_description"),
				"close-label": f(r)("common.actions.close"),
				"onUpdate:open": o[4] ||= (e) => {
					e || f(u).close_dialog();
				}
			}, {
				default: s(() => [v("form", {
					class: T(f(N).form),
					onSubmit: o[3] ||= d(() => void M(), ["prevent"])
				}, [
					O(H, {
						label: f(r)("common.labels.name"),
						error: f(u).name_error.value,
						required: ""
					}, {
						default: s(({ fieldId: e, describedBy: t, invalid: n }) => [v("input", {
							id: e,
							class: T(f(N).textInput),
							type: "text",
							placeholder: f(r)("common.labels.name"),
							value: f(u).name.value,
							"aria-describedby": t,
							"aria-invalid": n,
							onInput: o[1] ||= (e) => f(u).name.value = e.target.value
						}, null, 42, Ne)]),
						_: 1
					}, 8, ["label", "error"]),
					O(H, { label: f(r)("assets.workflow.json_label") }, {
						default: s(({ fieldId: e }) => [v("textarea", {
							id: e,
							class: T(f(N).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: E(),
							onInput: o[2] ||= (e) => f(u).values.workflow_json = e.target.value
						}, null, 42, Pe)]),
						_: 1
					}, 8, ["label"]),
					O(R, {
						label: f(r)("assets.workflow.placeholder_scan_action"),
						icon: f(ue),
						variant: "secondary",
						type: "button",
						onClick: k
					}, null, 8, ["label", "icon"]),
					_.value.length > 0 ? (a(), c("div", {
						key: 0,
						class: T(f(N).placeholderList)
					}, [(a(!0), c(w, null, n(_.value, (e) => (a(), c("div", {
						key: e.name,
						class: T(f(N).placeholderRow)
					}, [v("span", { class: T(f(N).placeholderKey) }, S(ee(e.name)), 3), (a(), g(J, {
						key: f(i),
						"model-value": e.target === "" ? $ : e.target,
						options: C.value,
						placeholder: f(r)("assets.workflow.placeholder_unmapped"),
						ariaLabel: e.name,
						"onUpdate:modelValue": (t) => A(e.name, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128))], 2)) : h("", !0),
					v("div", { class: T(f(N).formActions) }, [O(R, {
						label: f(r)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: f(u).close_dialog
					}, null, 8, ["label", "onClick"]), O(R, {
						label: f(r)("common.actions.save"),
						variant: "primary",
						type: "submit",
						pending: f(u).saving.value
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
}), Re = /* @__PURE__ */ D({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = y(), i = /* @__PURE__ */ new Set([
			"character",
			"outfit",
			"lora",
			"vibe",
			"workflow"
		]), o = p(t.state.assets.active_category);
		function l(e) {
			o.value = e, i.has(e) && t.controller.set_active_asset_category(e);
		}
		let u = x(() => t.state.loading.has("assets")), d = x(() => t.state.loading.has("vocabulary")), m = x(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (a(), c("div", { class: T(f(N).assetsView) }, [O(f(fe), {
			"model-value": o.value,
			"onUpdate:modelValue": l
		}, {
			default: s(() => [
				O(f(he), {
					class: T(f(N).tabsList),
					"aria-label": f(n)("nav.assets")
				}, {
					default: s(() => [
						O(f(Z), {
							value: "vocabulary",
							class: T(f(N).tabsTrigger)
						}, {
							default: s(() => [E(S(f(n)("assets.tabs.vocabulary")), 1)]),
							_: 1
						}, 8, ["class"]),
						O(f(Z), {
							value: "character",
							class: T(f(N).tabsTrigger)
						}, {
							default: s(() => [E(S(f(n)("assets.tabs.characters")), 1)]),
							_: 1
						}, 8, ["class"]),
						O(f(Z), {
							value: "outfit",
							class: T(f(N).tabsTrigger)
						}, {
							default: s(() => [E(S(f(n)("assets.tabs.outfits")), 1)]),
							_: 1
						}, 8, ["class"]),
						O(f(Z), {
							value: "lora",
							class: T(f(N).tabsTrigger)
						}, {
							default: s(() => [E(S(f(n)("assets.tabs.lora")), 1)]),
							_: 1
						}, 8, ["class"]),
						O(f(Z), {
							value: "vibe",
							class: T(f(N).tabsTrigger)
						}, {
							default: s(() => [E(S(f(n)("assets.tabs.vibe")), 1)]),
							_: 1
						}, 8, ["class"]),
						O(f(Z), {
							value: "workflow",
							class: T(f(N).tabsTrigger)
						}, {
							default: s(() => [E(S(f(n)("assets.tabs.workflow")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					_: 1
				}, 8, ["class", "aria-label"]),
				O(f(X), {
					value: "vocabulary",
					class: T(f(N).tabsContent)
				}, {
					default: s(() => [O(ke, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						loading: d.value,
						controller: e.controller,
						locale: m.value
					}, null, 8, [
						"catalog",
						"install-command",
						"loading",
						"controller",
						"locale"
					])]),
					_: 1
				}, 8, ["class"]),
				O(f(X), {
					value: "character",
					class: T(f(N).tabsContent)
				}, {
					default: s(() => [O(ve, {
						records: e.state.assets.records.character,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				O(f(X), {
					value: "outfit",
					class: T(f(N).tabsContent)
				}, {
					default: s(() => [O(be, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				O(f(X), {
					value: "lora",
					class: T(f(N).tabsContent)
				}, {
					default: s(() => [O(ye, {
						records: e.state.assets.records.lora,
						"character-records": e.state.assets.records.character,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				O(f(X), {
					value: "vibe",
					class: T(f(N).tabsContent)
				}, {
					default: s(() => [O(Te, {
						records: e.state.assets.records.vibe,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				O(f(X), {
					value: "workflow",
					class: T(f(N).tabsContent)
				}, {
					default: s(() => [O(Le, {
						records: e.state.assets.records.workflow,
						loading: u.value,
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
export { Re as default };
