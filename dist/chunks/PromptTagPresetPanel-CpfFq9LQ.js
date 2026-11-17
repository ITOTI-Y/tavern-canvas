import { F as e, _ as t, dt as n, gt as r, m as i, n as a, p as o, pt as s, q as c, x as l, y as u } from "./vue-i18n-XoxYzLIP.js";
import { t as d } from "./FieldGroup-B_z8muEe.js";
import { i as f, n as p, r as m, t as h } from "./use_asset_category_panel-CU2YjXfF.js";
import { n as g } from "./NumberStepper-CaTG-ewu.js";
import { t as _ } from "./AppDialog-hFVVBnfV.js";
import { t as v } from "./prompt_styles-DfG7McZY.js";
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
		}))), T = p("prompt_tag", y.controller, () => x.value, () => b("errors.validation_required"), ["kind"]);
		function E() {
			T.open_create(), T.values.kind = "quality";
		}
		return (a, o) => (e(), t("section", {
			class: s(n(v).prompt_tag_panel),
			"data-testid": "prompt-tag-presets"
		}, [
			i("div", { class: s(n(v).section_header) }, [i("span", { class: s(n(v).section_title) }, r(n(b)("prompt_tags.panel_title")), 3)], 2),
			i("p", { class: s(n(v).prompt_tag_description) }, r(n(b)("prompt_tags.panel_description")), 3),
			u(f, {
				records: w.value,
				"summary-fields": S.value,
				loading: l.loading,
				"search-label": n(b)("common.actions.search"),
				"search-placeholder": n(b)("common.actions.search"),
				"empty-title": n(b)("prompt_tags.empty_title"),
				"empty-description": n(b)("prompt_tags.empty_description"),
				"add-label": n(b)("prompt_tags.add_action"),
				"random-label": n(b)("assets.random_selection_action"),
				"reorder-hint": n(b)("assets.reorder_hint"),
				"edit-label": n(b)("common.actions.edit"),
				"delete-confirm-description": n(b)("assets.delete_confirm_description"),
				"confirm-label": n(b)("confirmations.destructive.default_confirm_action"),
				"cancel-label": n(b)("confirmations.destructive.default_cancel_action"),
				onAdd: E,
				onEdit: n(T).open_edit,
				onDeleteMany: o[0] ||= (e) => void n(T).remove_many(e),
				onReorder: n(T).reorder,
				onRandomSelect: n(T).random_select
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
				"delete-confirm-description",
				"confirm-label",
				"cancel-label",
				"onEdit",
				"onReorder",
				"onRandomSelect"
			]),
			u(_, {
				open: n(T).dialog_open.value,
				title: n(T).editing_record.value ? n(b)("common.actions.edit") : n(b)("prompt_tags.add_action"),
				description: n(b)("assets.form_dialog_description"),
				"close-label": n(b)("common.actions.close"),
				"onUpdate:open": o[4] ||= (e) => {
					e || n(T).close_dialog();
				}
			}, {
				default: c(() => [u(m, {
					"name-label": n(b)("common.labels.name"),
					"name-placeholder": n(b)("common.labels.name"),
					name: n(T).name.value,
					"name-error": n(T).name_error.value,
					"save-error": n(T).save_error.value,
					fields: x.value,
					values: n(T).values,
					"save-label": n(b)("common.actions.save"),
					"cancel-label": n(b)("common.actions.cancel"),
					"decrement-label": n(b)("common.actions.decrease"),
					"increment-label": n(b)("common.actions.increase"),
					pending: n(T).saving.value,
					"onUpdate:name": o[2] ||= (e) => {
						n(T).name.value = e;
					},
					"onUpdate:values": o[3] ||= (e) => n(h)(n(T).values, e),
					onSave: n(T).save,
					onCancel: n(T).close_dialog
				}, {
					"extra-fields": c(() => [u(d, { label: n(b)("prompt_tags.kind_label") }, {
						default: c(() => [u(g, {
							"model-value": n(T).values.kind === "undesired_content" ? "undesired_content" : "quality",
							options: C.value,
							label: n(b)("prompt_tags.kind_label"),
							"onUpdate:modelValue": o[1] ||= (e) => n(T).values.kind = e
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
