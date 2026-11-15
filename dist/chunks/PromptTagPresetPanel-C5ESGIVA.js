import { I as e, J as t, S as n, _t as r, b as i, ft as a, h as o, m as s, mt as c, n as l, v as u } from "./vue-i18n-BQWz_HuU.js";
import { t as d } from "./FieldGroup-B4bm8x77.js";
import { i as f, n as p, r as m, t as h } from "./use_asset_category_panel-ZOiu7cWE.js";
import { n as g } from "./NumberStepper-Q3rxAKj9.js";
import { t as _ } from "./AppDialog-B_P8hQSz.js";
import { t as v } from "./prompt_styles-DfG7McZY.js";
//#endregion
//#region src/ui/views/prompt/PromptTagPresetPanel.vue
var y = /* @__PURE__ */ n({
	__name: "PromptTagPresetPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(n) {
		let y = n, { t: b } = l(), x = s(() => [{
			key: "text",
			label: b("prompt_tags.text_label"),
			kind: "textarea",
			required: !0,
			hint: b("prompt_tags.text_hint")
		}]), S = s(() => [{
			key: "kind_label",
			label: b("prompt_tags.kind_label")
		}]), C = s(() => [{
			value: "quality",
			label: b("prompt_tags.kind_quality")
		}, {
			value: "undesired_content",
			label: b("prompt_tags.kind_undesired")
		}]), w = s(() => y.records.map((e) => ({
			...e,
			payload: {
				...e.payload,
				kind_label: e.payload.kind === "undesired_content" ? b("prompt_tags.kind_undesired") : b("prompt_tags.kind_quality")
			}
		}))), T = p("prompt_tag", y.controller, () => x.value, () => b("errors.validation_required"), ["kind"]);
		function E() {
			T.open_create(), T.values.kind = "quality";
		}
		return (s, l) => (e(), u("section", {
			class: c(a(v).prompt_tag_panel),
			"data-testid": "prompt-tag-presets"
		}, [
			o("div", { class: c(a(v).section_header) }, [o("span", { class: c(a(v).section_title) }, r(a(b)("prompt_tags.panel_title")), 3)], 2),
			o("p", { class: c(a(v).prompt_tag_description) }, r(a(b)("prompt_tags.panel_description")), 3),
			i(f, {
				records: w.value,
				"summary-fields": S.value,
				loading: n.loading,
				"search-label": a(b)("common.actions.search"),
				"search-placeholder": a(b)("common.actions.search"),
				"empty-title": a(b)("prompt_tags.empty_title"),
				"empty-description": a(b)("prompt_tags.empty_description"),
				"add-label": a(b)("prompt_tags.add_action"),
				"random-label": a(b)("assets.random_selection_action"),
				"reorder-hint": a(b)("assets.reorder_hint"),
				"edit-label": a(b)("common.actions.edit"),
				"delete-confirm-description": a(b)("assets.delete_confirm_description"),
				"confirm-label": a(b)("confirmations.destructive.default_confirm_action"),
				"cancel-label": a(b)("confirmations.destructive.default_cancel_action"),
				onAdd: E,
				onEdit: a(T).open_edit,
				onDeleteMany: l[0] ||= (e) => void a(T).remove_many(e),
				onReorder: a(T).reorder,
				onRandomSelect: a(T).random_select
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
			i(_, {
				open: a(T).dialog_open.value,
				title: a(T).editing_record.value ? a(b)("common.actions.edit") : a(b)("prompt_tags.add_action"),
				description: a(b)("assets.form_dialog_description"),
				"close-label": a(b)("common.actions.close"),
				"onUpdate:open": l[4] ||= (e) => {
					e || a(T).close_dialog();
				}
			}, {
				default: t(() => [i(m, {
					"name-label": a(b)("common.labels.name"),
					"name-placeholder": a(b)("common.labels.name"),
					name: a(T).name.value,
					"name-error": a(T).name_error.value,
					"save-error": a(T).save_error.value,
					fields: x.value,
					values: a(T).values,
					"save-label": a(b)("common.actions.save"),
					"cancel-label": a(b)("common.actions.cancel"),
					"decrement-label": a(b)("common.actions.decrease"),
					"increment-label": a(b)("common.actions.increase"),
					pending: a(T).saving.value,
					"onUpdate:name": l[2] ||= (e) => {
						a(T).name.value = e;
					},
					"onUpdate:values": l[3] ||= (e) => a(h)(a(T).values, e),
					onSave: a(T).save,
					onCancel: a(T).close_dialog
				}, {
					"extra-fields": t(() => [i(d, { label: a(b)("prompt_tags.kind_label") }, {
						default: t(() => [i(g, {
							"model-value": a(T).values.kind === "undesired_content" ? "undesired_content" : "quality",
							options: C.value,
							label: a(b)("prompt_tags.kind_label"),
							"onUpdate:modelValue": l[1] ||= (e) => a(T).values.kind = e
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
