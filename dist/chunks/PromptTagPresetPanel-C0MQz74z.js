import { N as e, W as t, _ as n, ct as r, m as i, n as a, p as o, pt as s, ut as c, x as l, y as u } from "./vue-i18n-DUz2Gjn8.js";
import { i as d, n as f, r as p, t as m } from "./use_asset_category_panel-zFkFxzAq.js";
import { t as h } from "./AppDialog-BjoeMuBm.js";
import { t as g } from "./FieldGroup-BUTxEmp1.js";
import { n as _ } from "./NumberStepper-C9VAT8H7.js";
import { t as v } from "./prompt_styles-DWDg4plB.js";
//#endregion
//#region src/ui/views/prompt/PromptTagPresetPanel.vue
var y = /* @__PURE__ */ l({
	__name: "PromptTagPresetPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(l) {
		let y = l, { t: b } = a(), x = o(() => [{
			key: "text",
			label: b("prompt_tags.text_label"),
			kind: "textarea",
			required: !0,
			hint: b("prompt_tags.text_hint")
		}]), S = o(() => [{
			key: "kind_label",
			label: b("prompt_tags.kind_label")
		}]), C = o(() => [{
			value: "quality",
			label: b("prompt_tags.kind_quality")
		}, {
			value: "undesired_content",
			label: b("prompt_tags.kind_undesired")
		}]), w = o(() => y.records.map((e) => ({
			...e,
			payload: {
				...e.payload,
				kind_label: e.payload.kind === "undesired_content" ? b("prompt_tags.kind_undesired") : b("prompt_tags.kind_quality")
			}
		}))), T = f("prompt_tag", y.controller, () => x.value, () => b("errors.validation_required"), ["kind"]);
		function E() {
			T.open_create(), T.values.kind = "quality";
		}
		let D = (e) => b("assets.delete_confirm_title", { name: e });
		return (a, o) => (e(), n("section", {
			class: c(r(v).prompt_tag_panel),
			"data-testid": "prompt-tag-presets"
		}, [
			i("div", { class: c(r(v).section_header) }, [i("span", { class: c(r(v).section_title) }, s(r(b)("prompt_tags.panel_title")), 3)], 2),
			i("p", { class: c(r(v).prompt_tag_description) }, s(r(b)("prompt_tags.panel_description")), 3),
			u(d, {
				records: w.value,
				"summary-fields": S.value,
				loading: l.loading,
				"search-label": r(b)("common.actions.search"),
				"search-placeholder": r(b)("common.actions.search"),
				"empty-title": r(b)("prompt_tags.empty_title"),
				"empty-description": r(b)("prompt_tags.empty_description"),
				"add-label": r(b)("prompt_tags.add_action"),
				"random-label": r(b)("assets.random_selection_action"),
				"reorder-hint": r(b)("assets.reorder_hint"),
				"edit-label": r(b)("common.actions.edit"),
				"delete-label": r(b)("common.actions.delete"),
				"delete-confirm-title": D,
				"delete-confirm-description": r(b)("assets.delete_confirm_description"),
				"confirm-label": r(b)("confirmations.destructive.default_confirm_action"),
				"cancel-label": r(b)("confirmations.destructive.default_cancel_action"),
				"move-up-label": r(b)("assets.move_up_action"),
				"move-down-label": r(b)("assets.move_down_action"),
				"drag-handle-label": r(b)("assets.drag_handle_label"),
				onAdd: E,
				onEdit: r(T).open_edit,
				onDelete: r(T).remove,
				onReorder: r(T).reorder,
				onRandomSelect: r(T).random_select
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
				"onEdit",
				"onDelete",
				"onReorder",
				"onRandomSelect"
			]),
			u(h, {
				open: r(T).dialog_open.value,
				title: r(T).editing_record.value ? r(b)("common.actions.edit") : r(b)("prompt_tags.add_action"),
				description: r(b)("assets.form_dialog_description"),
				"close-label": r(b)("common.actions.close"),
				"onUpdate:open": o[3] ||= (e) => {
					e || r(T).close_dialog();
				}
			}, {
				default: t(() => [u(p, {
					"name-label": r(b)("common.labels.name"),
					"name-placeholder": r(b)("common.labels.name"),
					name: r(T).name.value,
					"name-error": r(T).name_error.value,
					"save-error": r(T).save_error.value,
					fields: x.value,
					values: r(T).values,
					"save-label": r(b)("common.actions.save"),
					"cancel-label": r(b)("common.actions.cancel"),
					"decrement-label": r(b)("common.actions.decrease"),
					"increment-label": r(b)("common.actions.increase"),
					pending: r(T).saving.value,
					"onUpdate:name": o[1] ||= (e) => {
						r(T).name.value = e;
					},
					"onUpdate:values": o[2] ||= (e) => r(m)(r(T).values, e),
					onSave: r(T).save,
					onCancel: r(T).close_dialog
				}, {
					"extra-fields": t(() => [u(g, { label: r(b)("prompt_tags.kind_label") }, {
						default: t(() => [u(_, {
							"model-value": r(T).values.kind === "undesired_content" ? "undesired_content" : "quality",
							options: C.value,
							label: r(b)("prompt_tags.kind_label"),
							"onUpdate:modelValue": o[0] ||= (e) => r(T).values.kind = e
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
			])
		], 2));
	}
});
//#endregion
export { y as default };
