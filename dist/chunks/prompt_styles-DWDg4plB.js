import { n as e } from "./deferred_stylesheets-BpS7LWkd.js";
var t = {
	prompt_view: "_prompt_view_1nd8m_7",
	browser_column: "_browser_column_1nd8m_14",
	editor_column: "_editor_column_1nd8m_18",
	section_header: "_section_header_1nd8m_40",
	section_title: "_section_title_1nd8m_49",
	icon_text_button: "_icon_text_button_1nd8m_56",
	text_input: "_text_input_1nd8m_68 tc-field",
	text_input_narrow: "_text_input_narrow_1nd8m_72 tc-field",
	textarea: "_textarea_1nd8m_82 tc-field tc-field-multiline",
	preset_browser: "_preset_browser_1nd8m_88",
	search_input: "_search_input_1nd8m_93 tc-field",
	bulk_delete_button: "_bulk_delete_button_1nd8m_99",
	group_header: "_group_header_1nd8m_114",
	preset_list: "_preset_list_1nd8m_124",
	preset_row: "_preset_row_1nd8m_129",
	preset_row_selected: "_preset_row_selected_1nd8m_138",
	preset_name_button: "_preset_name_button_1nd8m_144",
	name_row: "_name_row_1nd8m_156",
	prompt_builder: "_prompt_builder_1nd8m_170",
	replacement_rules: "_replacement_rules_1nd8m_185",
	regex_rules: "_regex_rules_1nd8m_186",
	rule_row: "_rule_row_1nd8m_191",
	rule_row_action: "_rule_row_action_1nd8m_200",
	test_result: "_test_result_1nd8m_213",
	test_result_error: "_test_result_error_1nd8m_220",
	prompt_tag_panel: "_prompt_tag_panel_1nd8m_229",
	prompt_tag_description: "_prompt_tag_description_1nd8m_234"
};
//#endregion
//#region src/ui/views/prompt/prompt_styles.ts
e("prompt", "._prompt_view_1nd8m_7{grid-template-columns:minmax(220px,280px) minmax(0,1fr);gap:0;min-height:100%;display:grid}._browser_column_1nd8m_14{border-right:1px solid var(--tc-divider)}._editor_column_1nd8m_18{min-width:0;padding-bottom:var(--tc-space-6);flex-direction:column;display:flex}@media (width<=959px){._prompt_view_1nd8m_7{grid-template-columns:minmax(0,1fr)}._browser_column_1nd8m_14{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_1nd8m_40{justify-content:space-between;align-items:center;gap:var(--tc-space-2);padding:var(--tc-space-5) var(--tc-space-5) var(--tc-space-2);flex-wrap:wrap;display:flex}._section_title_1nd8m_49{color:var(--tc-text);font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);line-height:var(--tc-line-height-lg)}._icon_text_button_1nd8m_56{align-items:center;gap:var(--tc-space-1);height:var(--tc-control-height-sm);padding:0 var(--tc-space-2);border-radius:var(--tc-radius-control);color:var(--tc-text);font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-medium);display:inline-flex}._text_input_narrow_1nd8m_72{width:9ch;padding:0 var(--tc-space-3)}._icon_text_button_1nd8m_56:hover{background-color:var(--tc-surface-raised)}._preset_browser_1nd8m_88{flex-direction:column;display:flex}._search_input_1nd8m_93{width:auto;margin:0 var(--tc-space-5) var(--tc-space-2)}._bulk_delete_button_1nd8m_99:hover{background-color:var(--tc-error-soft)}._bulk_delete_button_1nd8m_99{height:var(--tc-control-height-sm);margin:0 var(--tc-space-5) var(--tc-space-2);padding:0 var(--tc-control-padding-x-sm);border-radius:var(--tc-radius-control);color:var(--tc-error);font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-medium);align-self:flex-start}._group_header_1nd8m_114{padding:var(--tc-space-3) var(--tc-space-5) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;display:flex}._preset_list_1nd8m_124{flex-direction:column;display:flex}._preset_row_1nd8m_129{align-items:center;gap:var(--tc-space-2);margin:0 var(--tc-space-2);padding:0 var(--tc-space-3);border-radius:var(--tc-radius-control);display:flex}._preset_row_selected_1nd8m_138{background-color:var(--tc-marker);color:var(--tc-on-marker);font-weight:var(--tc-font-weight-medium)}._preset_name_button_1nd8m_144{min-width:0;padding:var(--tc-space-1) 0;text-align:left;text-overflow:ellipsis;white-space:nowrap;flex:auto;overflow:hidden}._name_row_1nd8m_156{align-items:flex-end;gap:var(--tc-space-3);padding:var(--tc-space-3) var(--tc-space-5) var(--tc-space-4);border-bottom:1px solid var(--tc-divider);display:flex}._name_row_1nd8m_156>:first-child{flex:auto}._prompt_builder_1nd8m_170{gap:var(--tc-form-row-gap);padding:0 var(--tc-space-5) var(--tc-space-6);border-bottom:1px solid var(--tc-divider);flex-direction:column;display:flex}._prompt_builder_1nd8m_170>._section_header_1nd8m_40{margin-bottom:calc(var(--tc-space-2) - var(--tc-form-row-gap));padding-inline:0}._replacement_rules_1nd8m_185,._regex_rules_1nd8m_186{padding-bottom:var(--tc-space-2);border-bottom:1px solid var(--tc-divider)}._rule_row_1nd8m_191{align-items:flex-end;gap:var(--tc-space-2);padding:var(--tc-space-3) var(--tc-space-5);border-top:1px solid var(--tc-divider);flex-wrap:wrap;display:flex}._rule_row_1nd8m_191>:not(._rule_row_action_1nd8m_200){flex:140px}._rule_row_action_1nd8m_200{align-items:center;gap:var(--tc-space-2);flex:none;display:flex}._test_result_1nd8m_213{color:var(--tc-success);font-size:var(--tc-font-size-xs);flex-basis:100%;margin:0}._test_result_error_1nd8m_220{color:var(--tc-error);font-size:var(--tc-font-size-xs);flex-basis:100%;margin:0}._prompt_tag_panel_1nd8m_229{padding-bottom:var(--tc-space-4);border-top:1px solid var(--tc-divider)}._prompt_tag_description_1nd8m_234{padding:0 var(--tc-space-5) var(--tc-space-2);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);margin:0}");
var n = t;
//#endregion
export { n as t };
