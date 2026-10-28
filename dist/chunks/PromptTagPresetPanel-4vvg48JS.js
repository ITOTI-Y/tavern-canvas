import { G as e, P as t, _ as n, dt as r, lt as i, m as a, mt as o, n as s, p as c, x as l, y as u } from "./vue-i18n-L-BrQRnK.js";
import { i as d, n as f, r as p, t as m } from "./use_asset_category_panel-0tKQbD62.js";
import { t as h } from "./FieldGroup-CViCiHLn.js";
import { n as g } from "./NumberStepper-juOMl-Ck.js";
import { t as _ } from "./AppDialog-CwkMmVVL.js";
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
		let y = l, { t: b } = s(), x = c(() => [{
			key: "text",
			label: b("prompt_tags.text_label"),
			kind: "textarea",
			required: !0,
			hint: b("prompt_tags.text_hint")
		}]), S = c(() => [{
			key: "kind_label",
			label: b("prompt_tags.kind_label")
		}]), C = c(() => [{
			value: "quality",
			label: b("prompt_tags.kind_quality")
		}, {
			value: "undesired_content",
			label: b("prompt_tags.kind_undesired")
		}]), w = c(() => y.records.map((e) => ({
			...e,
			payload: {
				...e.payload,
				kind_label: e.payload.kind === "undesired_content" ? b("prompt_tags.kind_undesired") : b("prompt_tags.kind_quality")
			}
		}))), T = f("prompt_tag", y.controller, () => x.value, () => b("errors.validation_required"), ["kind"]);
		function E() {
			T.open_create(), T.values.kind = "quality";
		}
		return (s, c) => (t(), n("section", {
			class: r(i(v).prompt_tag_panel),
			"data-testid": "prompt-tag-presets"
		}, [
			a("div", { class: r(i(v).section_header) }, [a("span", { class: r(i(v).section_title) }, o(i(b)("prompt_tags.panel_title")), 3)], 2),
			a("p", { class: r(i(v).prompt_tag_description) }, o(i(b)("prompt_tags.panel_description")), 3),
			u(d, {
				records: w.value,
				"summary-fields": S.value,
				loading: l.loading,
				"search-label": i(b)("common.actions.search"),
				"search-placeholder": i(b)("common.actions.search"),
				"empty-title": i(b)("prompt_tags.empty_title"),
				"empty-description": i(b)("prompt_tags.empty_description"),
				"add-label": i(b)("prompt_tags.add_action"),
				"random-label": i(b)("assets.random_selection_action"),
				"reorder-hint": i(b)("assets.reorder_hint"),
				"edit-label": i(b)("common.actions.edit"),
				"delete-confirm-description": i(b)("assets.delete_confirm_description"),
				"confirm-label": i(b)("confirmations.destructive.default_confirm_action"),
				"cancel-label": i(b)("confirmations.destructive.default_cancel_action"),
				onAdd: E,
				onEdit: i(T).open_edit,
				onDeleteMany: c[0] ||= (e) => void i(T).remove_many(e),
				onReorder: i(T).reorder,
				onRandomSelect: i(T).random_select
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
				open: i(T).dialog_open.value,
				title: i(T).editing_record.value ? i(b)("common.actions.edit") : i(b)("prompt_tags.add_action"),
				description: i(b)("assets.form_dialog_description"),
				"close-label": i(b)("common.actions.close"),
				"onUpdate:open": c[4] ||= (e) => {
					e || i(T).close_dialog();
				}
			}, {
				default: e(() => [u(p, {
					"name-label": i(b)("common.labels.name"),
					"name-placeholder": i(b)("common.labels.name"),
					name: i(T).name.value,
					"name-error": i(T).name_error.value,
					"save-error": i(T).save_error.value,
					fields: x.value,
					values: i(T).values,
					"save-label": i(b)("common.actions.save"),
					"cancel-label": i(b)("common.actions.cancel"),
					"decrement-label": i(b)("common.actions.decrease"),
					"increment-label": i(b)("common.actions.increase"),
					pending: i(T).saving.value,
					"onUpdate:name": c[2] ||= (e) => {
						i(T).name.value = e;
					},
					"onUpdate:values": c[3] ||= (e) => i(m)(i(T).values, e),
					onSave: i(T).save,
					onCancel: i(T).close_dialog
				}, {
					"extra-fields": e(() => [u(h, { label: i(b)("prompt_tags.kind_label") }, {
						default: e(() => [u(g, {
							"model-value": i(T).values.kind === "undesired_content" ? "undesired_content" : "quality",
							options: C.value,
							label: i(b)("prompt_tags.kind_label"),
							"onUpdate:modelValue": c[1] ||= (e) => i(T).values.kind = e
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
