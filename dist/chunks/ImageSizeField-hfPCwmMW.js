import { P as e, _ as t, dt as n, lt as r, m as i, mt as a, n as o, p as s, tt as c, x as l, y as u } from "./vue-i18n-L-BrQRnK.js";
import { n as d } from "./AppIcon-DkyxvN8k.js";
import { t as f } from "./AppSelect-CBwNO7WX.js";
import { n as p } from "./deferred_stylesheets-C5SZyo6f.js";
import { n as m } from "./TagInput-DaW9nw0K.js";
import { t as h } from "./IconButton-DsFRFlSI.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/link-2.js
var g = d("link-2", [
	["path", {
		d: "M9 17H7A5 5 0 0 1 7 7h2",
		key: "8i5ue5"
	}],
	["path", {
		d: "M15 7h2a5 5 0 1 1 0 10h-2",
		key: "1b9ql8"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "12",
		y2: "12",
		key: "1jonct"
	}]
]), _ = d("unlink-2", [["path", {
	d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2",
	key: "1re2ne"
}]]), v = [
	{
		id: "portrait",
		width: 832,
		height: 1216
	},
	{
		id: "landscape",
		width: 1216,
		height: 832
	},
	{
		id: "square",
		width: 1024,
		height: 1024
	},
	{
		id: "portrait_large",
		width: 1024,
		height: 1536
	},
	{
		id: "landscape_large",
		width: 1536,
		height: 1024
	},
	{
		id: "square_large",
		width: 1472,
		height: 1472
	},
	{
		id: "wallpaper_portrait",
		width: 1088,
		height: 1920
	},
	{
		id: "wallpaper_landscape",
		width: 1920,
		height: 1088
	}
], y = 2048;
function b(e) {
	return v.find((t) => t.width === e.width && t.height === e.height)?.id ?? null;
}
function x(e) {
	return Math.min(y, Math.max(64, Math.round(e / 64) * 64));
}
function S(e, t, n, r) {
	return t === "width" ? {
		width: n,
		height: r === null ? e.height : x(n / r)
	} : {
		width: r === null ? e.width : x(n * r),
		height: n
	};
}
var C = {
	layout: "_layout_7qw2u_9",
	section_nav: "_section_nav_7qw2u_15",
	section_nav_item: "_section_nav_item_7qw2u_23",
	section_content: "_section_content_7qw2u_49",
	pane_head: "_pane_head_7qw2u_53",
	pane_title: "_pane_title_7qw2u_60",
	pane_description: "_pane_description_7qw2u_68",
	groups: "_groups_7qw2u_75",
	input_row: "_input_row_7qw2u_81",
	view: "_view_7qw2u_92",
	onboarding: "_onboarding_7qw2u_100",
	onboarding_icon: "_onboarding_icon_7qw2u_110",
	onboarding_label: "_onboarding_label_7qw2u_121",
	onboarding_title: "_onboarding_title_7qw2u_128",
	onboarding_description: "_onboarding_description_7qw2u_135",
	section: "_section_7qw2u_15",
	section_header: "_section_header_7qw2u_158",
	section_title: "_section_title_7qw2u_166",
	form_grid: "_form_grid_7qw2u_173",
	row: "_row_7qw2u_178",
	field_grid: "_field_grid_7qw2u_187",
	check_list: "_check_list_7qw2u_194",
	image_size: "_image_size_7qw2u_209",
	image_size_sides: "_image_size_sides_7qw2u_215",
	row_label: "_row_label_7qw2u_222",
	row_value: "_row_value_7qw2u_231",
	profile_row: "_profile_row_7qw2u_238",
	profile_identity: "_profile_identity_7qw2u_250",
	profile_name: "_profile_name_7qw2u_258",
	profile_meta: "_profile_meta_7qw2u_266",
	profile_actions: "_profile_actions_7qw2u_275",
	badge: "_badge_7qw2u_283",
	description: "_description_7qw2u_304",
	status_text: "_status_text_7qw2u_308",
	risk_banner: "_risk_banner_7qw2u_329",
	risk_banner_title: "_risk_banner_title_7qw2u_344",
	risk_banner_description: "_risk_banner_description_7qw2u_356",
	risk_banner_actions: "_risk_banner_actions_7qw2u_364",
	acknowledged_note: "_acknowledged_note_7qw2u_371",
	actions_row: "_actions_row_7qw2u_388",
	vault_mode_row: "_vault_mode_row_7qw2u_395",
	vault_controls: "_vault_controls_7qw2u_409",
	vault_unlocked_actions: "_vault_unlocked_actions_7qw2u_419",
	text_input: "_text_input_7qw2u_426 tc-field",
	text_area: "_text_area_7qw2u_430 tc-field tc-field-multiline",
	prompt_tag_row: "_prompt_tag_row_7qw2u_434"
};
//#endregion
//#region src/ui/views/settings/settings_styles.ts
p("settings", "._layout_7qw2u_9{grid-template-columns:var(--tc-nav-width) minmax(0, 1fr);min-height:100%;display:grid}._section_nav_7qw2u_15{gap:var(--tc-space-0-5);padding:var(--tc-space-2) var(--tc-space-3);background-color:var(--tc-canvas);flex-direction:column;display:flex}._section_nav_item_7qw2u_23{align-items:center;gap:var(--tc-space-2);height:var(--tc-control-height-md);padding:0 var(--tc-control-padding-x-md);border-radius:var(--tc-radius-control);color:var(--tc-text-muted);font-size:var(--tc-control-font-size);text-align:start;white-space:nowrap;flex:none;display:flex}._section_nav_item_7qw2u_23:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._section_nav_item_7qw2u_23[data-selected=true],._section_nav_item_7qw2u_23[data-selected=true]:hover{background-color:var(--tc-marker);color:var(--tc-on-marker);font-weight:var(--tc-font-weight-medium)}._section_content_7qw2u_49{min-width:0}._pane_head_7qw2u_53{gap:var(--tc-space-1);max-width:var(--tc-form-max-width);padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-group-gap);display:grid}._pane_title_7qw2u_60{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);margin:0}._pane_description_7qw2u_68{color:var(--tc-text-muted);font-size:var(--tc-font-size-md);line-height:var(--tc-line-height-md);margin:0}._groups_7qw2u_75{gap:var(--tc-group-gap);flex-direction:column;display:flex}._input_row_7qw2u_81{align-items:center;gap:var(--tc-space-2);display:flex}._input_row_7qw2u_81>input{flex:auto;min-width:0}._view_7qw2u_92{gap:var(--tc-group-gap);max-width:var(--tc-form-max-width);padding:0 var(--tc-panel-padding) var(--tc-panel-padding);flex-direction:column;display:flex}._onboarding_7qw2u_100{grid-template-columns:var(--tc-control-height-lg) minmax(0, 1fr);gap:var(--tc-space-4);padding:var(--tc-space-6);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);display:grid}._onboarding_icon_7qw2u_110{width:var(--tc-control-height-lg);height:var(--tc-control-height-lg);border-radius:var(--tc-radius-control);background-color:var(--tc-marker);color:var(--tc-on-marker);justify-content:center;align-items:center;display:flex}._onboarding_label_7qw2u_121{margin-bottom:var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);font-weight:var(--tc-font-weight-semibold)}._onboarding_title_7qw2u_128{color:var(--tc-text);font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);line-height:var(--tc-line-height-lg)}._onboarding_description_7qw2u_135{max-width:62ch;margin-top:var(--tc-space-2);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm)}._section_7qw2u_15{gap:var(--tc-form-row-gap);flex-direction:column;min-width:0;display:flex}._section_7qw2u_15+._section_7qw2u_15{margin-top:calc(-1 * var(--tc-group-gap) / 2);padding-top:var(--tc-group-gap);border-top:1px solid var(--tc-divider)}._section_header_7qw2u_158{justify-content:space-between;align-items:center;gap:var(--tc-space-3);flex-wrap:wrap;display:flex}._section_title_7qw2u_166{color:var(--tc-text);font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg)}._form_grid_7qw2u_173>._section_title_7qw2u_166{margin-top:var(--tc-space-2)}._row_7qw2u_178{justify-items:start;gap:var(--tc-field-gap);grid-template-columns:minmax(0,1fr);min-width:0;display:grid}._field_grid_7qw2u_187{gap:var(--tc-form-row-gap) var(--tc-space-6);grid-template-columns:repeat(auto-fill,minmax(220px,1fr));align-items:start;display:grid}._check_list_7qw2u_194{justify-items:start;gap:var(--tc-space-2);border:0;min-width:0;margin:0;padding:0;display:grid}._check_list_7qw2u_194>legend{margin-bottom:var(--tc-field-gap);padding:0}._image_size_7qw2u_209{justify-items:start;gap:var(--tc-field-gap);display:grid}._image_size_sides_7qw2u_215{align-items:flex-end;gap:var(--tc-space-2) var(--tc-space-3);flex-wrap:wrap;display:flex}._row_label_7qw2u_222{min-width:0;color:var(--tc-text);font-size:var(--tc-label-font-size);font-weight:600;line-height:var(--tc-line-height-sm);overflow-wrap:anywhere}._row_value_7qw2u_231{color:var(--tc-text);flex:none}._profile_row_7qw2u_238{justify-content:space-between;align-items:center;gap:var(--tc-space-3);padding:var(--tc-space-3) 0;border-top:1px solid var(--tc-divider);flex-wrap:wrap;display:flex}._profile_identity_7qw2u_250{gap:var(--tc-space-0-5);flex-direction:column;flex:12rem;min-width:0;display:flex}._profile_name_7qw2u_258{color:var(--tc-text);font-weight:var(--tc-font-weight-medium);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_meta_7qw2u_266{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_actions_7qw2u_275{justify-content:flex-end;align-items:center;gap:var(--tc-space-1);flex-wrap:wrap;display:flex}._badge_7qw2u_283{height:var(--tc-chip-height-sm);padding:0 var(--tc-space-2);border:1px solid var(--tc-accent-border);border-radius:var(--tc-radius-chip);background-color:var(--tc-accent-soft);color:var(--tc-accent-text);font-size:var(--tc-font-size-xs);flex:none;align-items:center;display:inline-flex}._form_grid_7qw2u_173{gap:var(--tc-form-row-gap);flex-direction:column;display:flex}._form_grid_7qw2u_173>._description_7qw2u_304{margin-top:calc(var(--tc-field-gap) - var(--tc-form-row-gap))}._status_text_7qw2u_308{align-items:center;gap:var(--tc-space-1-5);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);display:inline-flex}._status_text_7qw2u_308[data-tone=success]{color:var(--tc-success)}._status_text_7qw2u_308[data-tone=warning]{color:var(--tc-warning)}._status_text_7qw2u_308[data-tone=error]{color:var(--tc-error)}._risk_banner_7qw2u_329{gap:var(--tc-space-2);padding:var(--tc-space-4);border:1px solid var(--tc-warning);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);flex-direction:column;display:flex}._risk_banner_7qw2u_329[data-severity=error]{border-color:var(--tc-error);background-color:var(--tc-error-soft)}._risk_banner_title_7qw2u_344{align-items:center;gap:var(--tc-space-1-5);color:var(--tc-warning);font-weight:var(--tc-font-weight-semibold);display:flex}._risk_banner_7qw2u_329[data-severity=error] ._risk_banner_title_7qw2u_344{color:var(--tc-error)}._risk_banner_description_7qw2u_356{color:var(--tc-text);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere;margin:0}._risk_banner_actions_7qw2u_364{align-items:center;gap:var(--tc-space-2);flex-wrap:wrap;display:flex}._acknowledged_note_7qw2u_371{align-items:center;gap:var(--tc-space-1-5);color:var(--tc-success);font-size:var(--tc-font-size-sm);display:flex}._description_7qw2u_304{max-width:60ch;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere;margin:0}._actions_row_7qw2u_388{align-items:center;gap:var(--tc-space-2);flex-wrap:wrap;display:flex}._vault_mode_row_7qw2u_395{justify-content:space-between;align-items:center;gap:var(--tc-space-3);flex-wrap:wrap;display:flex}._vault_mode_row_7qw2u_395 ._profile_meta_7qw2u_266{white-space:normal;text-overflow:clip;overflow:visible}._vault_controls_7qw2u_409{gap:var(--tc-space-3);width:min(100%,520px);display:grid}._vault_controls_7qw2u_409>button{width:fit-content}._vault_unlocked_actions_7qw2u_419{align-items:center;gap:var(--tc-space-2);flex-wrap:wrap;display:flex}._prompt_tag_row_7qw2u_434{gap:var(--tc-space-1-5);flex-wrap:wrap;display:flex}@container studio-workspace (width<=640px){._layout_7qw2u_9{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._section_nav_7qw2u_15{padding:var(--tc-space-2) var(--tc-space-4);border-bottom:1px solid var(--tc-divider);scrollbar-width:none;flex-direction:row;overflow-x:auto}._pane_head_7qw2u_53{padding:var(--tc-space-3) var(--tc-space-4) var(--tc-group-gap)}._view_7qw2u_92{padding:0 var(--tc-space-4) var(--tc-space-4)}._onboarding_7qw2u_100{padding:var(--tc-space-5);grid-template-columns:minmax(0,1fr)}}");
var w = C, T = "custom", E = /* @__PURE__ */ l({
	__name: "ImageSizeField",
	props: { modelValue: {} },
	emits: ["update:modelValue"],
	setup(l, { emit: d }) {
		let p = l, x = d, { t: C } = o(), E = c(null);
		function D(e) {
			switch (e) {
				case "portrait": return C("settings.image_size.portrait");
				case "landscape": return C("settings.image_size.landscape");
				case "square": return C("settings.image_size.square");
				case "portrait_large": return C("settings.image_size.portrait_large");
				case "landscape_large": return C("settings.image_size.landscape_large");
				case "square_large": return C("settings.image_size.square_large");
				case "wallpaper_portrait": return C("settings.image_size.wallpaper_portrait");
				case "wallpaper_landscape": return C("settings.image_size.wallpaper_landscape");
			}
		}
		let O = s(() => [...v.map((e) => ({
			value: e.id,
			label: `${D(e.id)} ${String(e.width)} × ${String(e.height)}`
		})), {
			value: T,
			label: C("settings.image_size.custom")
		}]), k = s(() => b(p.modelValue) ?? T);
		function A(e) {
			let t = v.find((t) => t.id === e);
			t !== void 0 && (x("update:modelValue", {
				width: t.width,
				height: t.height
			}), E.value !== null && (E.value = t.width / t.height));
		}
		function j() {
			E.value = E.value === null ? p.modelValue.width / p.modelValue.height : null;
		}
		function M(e, t) {
			x("update:modelValue", S(p.modelValue, e, t, E.value));
		}
		return (o, s) => (e(), t("div", {
			class: n(r(w).image_size),
			"data-testid": "image-size-field"
		}, [
			i("span", { class: n(r(w).row_label) }, a(r(C)("settings.image_size.label")), 3),
			u(f, {
				"model-value": k.value,
				options: O.value,
				placeholder: r(C)("settings.image_size.label"),
				"aria-label": r(C)("settings.image_size.label"),
				"onUpdate:modelValue": A
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			]),
			i("div", { class: n(r(w).image_size_sides) }, [
				i("div", { class: n(r(w).row) }, [i("span", { class: n(r(w).row_label) }, a(r(C)("settings.novelai.width_label")), 3), u(m, {
					"model-value": l.modelValue.width,
					label: r(C)("settings.novelai.width_label"),
					min: r(64),
					max: r(y),
					step: r(64),
					"increment-label": r(C)("common.actions.increase"),
					"decrement-label": r(C)("common.actions.decrease"),
					"onUpdate:modelValue": s[0] ||= (e) => M("width", e)
				}, null, 8, [
					"model-value",
					"label",
					"min",
					"max",
					"step",
					"increment-label",
					"decrement-label"
				])], 2),
				u(h, {
					icon: E.value === null ? r(_) : r(g),
					label: r(C)("settings.image_size.lock_ratio"),
					pressed: E.value !== null,
					onClick: j
				}, null, 8, [
					"icon",
					"label",
					"pressed"
				]),
				i("div", { class: n(r(w).row) }, [i("span", { class: n(r(w).row_label) }, a(r(C)("settings.novelai.height_label")), 3), u(m, {
					"model-value": l.modelValue.height,
					label: r(C)("settings.novelai.height_label"),
					min: r(64),
					max: r(y),
					step: r(64),
					"increment-label": r(C)("common.actions.increase"),
					"decrement-label": r(C)("common.actions.decrease"),
					"onUpdate:modelValue": s[1] ||= (e) => M("height", e)
				}, null, 8, [
					"model-value",
					"label",
					"min",
					"max",
					"step",
					"increment-label",
					"decrement-label"
				])], 2)
			], 2)
		], 2));
	}
});
//#endregion
export { w as n, E as t };
