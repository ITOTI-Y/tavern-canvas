import { n as e } from "./deferred_stylesheets-BpS7LWkd.js";
var t = {
	prompt_view: "_prompt_view_1vzr5_7",
	browser_column: "_browser_column_1vzr5_14",
	editor_column: "_editor_column_1vzr5_18",
	section_header: "_section_header_1vzr5_40",
	section_title: "_section_title_1vzr5_48",
	icon_text_button: "_icon_text_button_1vzr5_55",
	text_input: "_text_input_1vzr5_63",
	text_input_narrow: "_text_input_narrow_1vzr5_74",
	textarea: "_textarea_1vzr5_91",
	preset_browser: "_preset_browser_1vzr5_111",
	search_input: "_search_input_1vzr5_116",
	bulk_delete_button: "_bulk_delete_button_1vzr5_126",
	group_header: "_group_header_1vzr5_135",
	preset_list: "_preset_list_1vzr5_145",
	preset_row: "_preset_row_1vzr5_150",
	preset_row_selected: "_preset_row_selected_1vzr5_157",
	preset_name_button: "_preset_name_button_1vzr5_161",
	name_row: "_name_row_1vzr5_173",
	prompt_builder: "_prompt_builder_1vzr5_187",
	replacement_rules: "_replacement_rules_1vzr5_197",
	regex_rules: "_regex_rules_1vzr5_198",
	rule_row: "_rule_row_1vzr5_203",
	rule_row_action: "_rule_row_action_1vzr5_212",
	test_result: "_test_result_1vzr5_225",
	test_result_error: "_test_result_error_1vzr5_232",
	prompt_tag_panel: "_prompt_tag_panel_1vzr5_241",
	prompt_tag_description: "_prompt_tag_description_1vzr5_246"
};
//#endregion
//#region src/ui/views/prompt/prompt_styles.ts
e("prompt", "._prompt_view_1vzr5_7{grid-template-columns:minmax(220px,280px) minmax(0,1fr);gap:0;min-height:100%;display:grid}._browser_column_1vzr5_14{border-right:1px solid var(--tc-divider)}._editor_column_1vzr5_18{flex-direction:column;min-width:0;padding-bottom:24px;display:flex}@media (width<=959px){._prompt_view_1vzr5_7{grid-template-columns:minmax(0,1fr)}._browser_column_1vzr5_14{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_1vzr5_40{justify-content:space-between;align-items:center;gap:8px;padding:12px 16px 4px;display:flex}._section_title_1vzr5_48{font-weight:600}._icon_text_button_1vzr5_55{color:var(--tc-accent);align-items:center;gap:4px;padding:1px 6px;display:inline-flex}._text_input_1vzr5_63{width:100%;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_narrow_1vzr5_74{width:64px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_1vzr5_63:focus-visible,._text_input_narrow_1vzr5_74:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._textarea_1vzr5_91{width:100%;min-height:56px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:8px 10px;font-family:inherit;font-size:14px}._textarea_1vzr5_91:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._preset_browser_1vzr5_111{flex-direction:column;display:flex}._search_input_1vzr5_116{color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 8px;font-size:13px}._bulk_delete_button_1vzr5_126{color:var(--tc-error);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 10px;font-size:12px}._group_header_1vzr5_135{color:var(--tc-text-muted);border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;padding:6px 16px;font-size:12px;display:flex}._preset_list_1vzr5_145{flex-direction:column;display:flex}._preset_row_1vzr5_150{align-items:center;gap:8px;padding:4px 16px;display:flex}._preset_row_selected_1vzr5_157{background-color:var(--tc-surface-raised)}._preset_name_button_1vzr5_161{text-align:left;text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;padding:4px 0;overflow:hidden}._name_row_1vzr5_173{border-bottom:1px solid var(--tc-divider);align-items:flex-end;gap:12px;padding:12px 16px;display:flex}._name_row_1vzr5_173>:first-child{flex:auto}._prompt_builder_1vzr5_187{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:8px;padding-bottom:8px;display:flex}._replacement_rules_1vzr5_197,._regex_rules_1vzr5_198{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._rule_row_1vzr5_203{border-top:1px solid var(--tc-divider);flex-wrap:wrap;align-items:flex-end;gap:8px;padding:8px 16px;display:flex}._rule_row_1vzr5_203>:not(._rule_row_action_1vzr5_212){flex:140px}._rule_row_action_1vzr5_212{flex:none;align-items:center;gap:8px;display:flex}._test_result_1vzr5_225{color:var(--tc-success);flex-basis:100%;margin:0;font-size:12px}._test_result_error_1vzr5_232{color:var(--tc-error);flex-basis:100%;margin:0;font-size:12px}._prompt_tag_panel_1vzr5_241{border-top:1px solid var(--tc-divider);padding-bottom:16px}._prompt_tag_description_1vzr5_246{color:var(--tc-text-muted);margin:0;padding:0 16px 8px;font-size:12px}");
var n = t;
//#endregion
export { n as t };
