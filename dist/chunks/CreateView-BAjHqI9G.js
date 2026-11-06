import { d as e, g as t, i as n, r, t as i, u as a } from "./schemas-BjkyCQYG.js";
import { n as o } from "./settings-BPfL5ty6.js";
import { A as s, G as c, H as l, I as u, K as d, P as f, T as ee, V as p, _ as m, a as te, dt as h, et as g, g as _, h as v, j as ne, lt as y, m as b, mt as x, n as S, p as C, pt as re, tt as w, u as T, v as E, x as D, y as O } from "./vue-i18n-L-BrQRnK.js";
import { t as ie } from "./portal_keys-DthxrmWp.js";
import { t as ae } from "./creation_port-CiZWBydV.js";
import { n as k, t as A } from "./AppIcon-DkyxvN8k.js";
import { n as j, t as oe } from "./StateSurface-DkfG2xGX.js";
import { t as se } from "./ImageSizeField-hfPCwmMW.js";
import { n as ce, t as M } from "./components_styles-D-hVkM2e.js";
import { t as N } from "./AppCheckbox-COGvwvBT.js";
import { n as P, t as F } from "./refresh-cw-BQBKyT1B.js";
import { n as le, t as I } from "./FieldGroup-DUIzuG3F.js";
import { t as ue } from "./sparkles-DHUWhG-4.js";
import { t as de } from "./trash-2-Dqlz-IWX.js";
import { n as L } from "./deferred_stylesheets-C5SZyo6f.js";
import { r as R, t as fe } from "./creation_planning-D9KBWp2D.js";
import { n as pe, r as me, t as z } from "./TagInput-DaW9nw0K.js";
import { t as B } from "./IconButton-DsFRFlSI.js";
import { t as he } from "./ConfirmDialog-B5HDtQez.js";
import { t as V } from "./ZoomableImage-DCmD7ZC5.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/book-open.js
var ge = k("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]), _e = k("layout-panel-top", [
	["rect", {
		width: "18",
		height: "7",
		x: "3",
		y: "3",
		rx: "1",
		key: "f1a2em"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "14",
		rx: "1",
		key: "1bb6yr"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "14",
		rx: "1",
		key: "nxv5o0"
	}]
]), H = k("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]), ve = k("tags", [
	["path", {
		d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
		key: "16rjxf"
	}],
	["path", {
		d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193",
		key: "178nd4"
	}],
	["circle", {
		cx: "10.5",
		cy: "6.5",
		r: ".5",
		fill: "currentColor",
		key: "12ikhr"
	}]
]), ye = 2.2;
function be(e) {
	let t = [], n = null, r = (e) => {
		t.push({
			cells: e,
			narrow: e.length === 1 && (e[0]?.ratio ?? 0) <= 1
		});
	};
	for (let [t, i] of e.entries()) {
		let e = {
			item: i,
			index: t,
			ratio: i.size.width / i.size.height
		};
		n === null ? n = e : n.ratio + e.ratio <= ye ? (r([n, e]), n = null) : (r([n]), n = e);
	}
	return n !== null && r([n]), t;
}
//#endregion
//#region src/ui/views/create/CreationImage.vue?vue&type=script&setup=true&lang.ts
var xe = ["src", "alt"], Se = /* @__PURE__ */ D({
	__name: "CreationImage",
	props: {
		imageId: {},
		alt: {},
		readImage: { type: Function },
		imageClass: {},
		zoomable: { type: Boolean }
	},
	emits: ["failed"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = w(null), a = 0;
		function o() {
			i.value !== null && (URL.revokeObjectURL(i.value), i.value = null);
		}
		return l(() => n.imageId, async (e) => {
			let t = a += 1;
			o();
			try {
				let r = await n.readImage(e);
				t === a && (i.value = URL.createObjectURL(r));
			} catch {
				t === a && r("failed");
			}
		}, { immediate: !0 }), s(() => {
			a += 1, o();
		}), (t, n) => i.value === null ? _("", !0) : (f(), m(T, { key: 0 }, [e.zoomable ? (f(), v(V, {
			key: 0,
			src: i.value,
			alt: e.alt,
			"image-class": e.imageClass
		}, null, 8, [
			"src",
			"alt",
			"image-class"
		])) : (f(), m("img", {
			key: 1,
			src: i.value,
			alt: e.alt,
			class: h(e.imageClass)
		}, null, 10, xe))], 64));
	}
}), Ce = {
	layout: "_layout_1o45b_6",
	history: "_history_1o45b_12",
	history_new: "_history_new_1o45b_21",
	history_title: "_history_title_1o45b_25",
	history_item: "_history_item_1o45b_31",
	history_thumb: "_history_thumb_1o45b_51",
	history_body: "_history_body_1o45b_69",
	history_name: "_history_name_1o45b_75",
	history_meta: "_history_meta_1o45b_83",
	kind: "_kind_1o45b_93",
	work: "_work_1o45b_105",
	work_inner: "_work_inner_1o45b_110",
	work_head: "_work_head_1o45b_116",
	work_title: "_work_title_1o45b_121",
	work_description: "_work_description_1o45b_130",
	text_area: "_text_area_1o45b_135 tc-field tc-field-multiline",
	counter: "_counter_1o45b_140",
	row: "_row_1o45b_146",
	hint: "_hint_1o45b_153",
	error: "_error_1o45b_160",
	grid2: "_grid2_1o45b_167",
	chip_toggle: "_chip_toggle_1o45b_173",
	story_summary: "_story_summary_1o45b_192",
	story_summary_label: "_story_summary_label_1o45b_203",
	story_summary_text: "_story_summary_text_1o45b_208",
	story_summary_action: "_story_summary_action_1o45b_219",
	plan: "_plan_1o45b_225",
	plan_head: "_plan_head_1o45b_230",
	section_title: "_section_title_1o45b_237",
	scene: "_scene_1o45b_248",
	scene_main: "_scene_main_1o45b_258",
	scene_side: "_scene_side_1o45b_262",
	scene_number: "_scene_number_1o45b_270",
	scene_top: "_scene_top_1o45b_282",
	scene_text: "_scene_text_1o45b_288 tc-field tc-field-multiline",
	scene_source: "_scene_source_1o45b_296",
	scene_meta: "_scene_meta_1o45b_308",
	who: "_who_1o45b_315",
	scene_error: "_scene_error_1o45b_325",
	plan_foot: "_plan_foot_1o45b_331",
	spacer: "_spacer_1o45b_342",
	range_summary: "_range_summary_1o45b_347",
	range_summary_action: "_range_summary_action_1o45b_359",
	range: "_range_1o45b_347",
	message: "_message_1o45b_368",
	bound: "_bound_1o45b_391",
	message_body: "_message_body_1o45b_410",
	message_name: "_message_name_1o45b_415",
	message_number: "_message_number_1o45b_424",
	message_excerpt: "_message_excerpt_1o45b_431",
	strip: "_strip_1o45b_441",
	strip_toolbar: "_strip_toolbar_1o45b_447",
	panel: "_panel_1o45b_456",
	results: "_results_1o45b_466",
	panel_frame: "_panel_frame_1o45b_477",
	panel_image: "_panel_image_1o45b_491",
	panel_number: "_panel_number_1o45b_498",
	panel_state: "_panel_state_1o45b_515",
	panel_bar: "_panel_bar_1o45b_533",
	panel_caption: "_panel_caption_1o45b_539",
	compact: "_compact_1o45b_551",
	page: "_page_1o45b_557",
	page_row: "_page_row_1o45b_568",
	panel_source: "_panel_source_1o45b_592",
	panel_tools: "_panel_tools_1o45b_602",
	narrow_only: "_narrow_only_1o45b_626",
	wide_only: "_wide_only_1o45b_690",
	mode_switch: "_mode_switch_1o45b_698"
};
//#endregion
//#region src/ui/views/create/create_styles.ts
L("create", "._layout_1o45b_6{grid-template-columns:260px minmax(0,1fr);min-height:100%;display:grid}._history_1o45b_12{align-self:start;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-3) var(--tc-space-4);flex-direction:column;display:flex;overflow:auto}._history_new_1o45b_21{margin:0 var(--tc-space-1) var(--tc-space-2)}._history_title_1o45b_25{padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._history_item_1o45b_31{padding:var(--tc-space-2);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:40px minmax(0,1fr);align-items:center;gap:10px;display:grid}._history_item_1o45b_31:hover{background-color:var(--tc-surface-raised)}._history_item_1o45b_31[aria-current=true]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border)}._history_thumb_1o45b_51{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-sunken);width:40px;height:52px;color:var(--tc-text-muted);place-items:center;display:grid;overflow:hidden}._history_thumb_1o45b_51 img{object-fit:cover;width:100%;height:100%;display:block}._history_body_1o45b_69{gap:var(--tc-space-0-5);min-width:0;display:grid}._history_name_1o45b_75{font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._history_meta_1o45b_83{gap:var(--tc-space-1-5);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);white-space:nowrap;align-items:center;display:flex;overflow:hidden}._kind_1o45b_93{height:18px;padding:0 var(--tc-space-1-5);border-radius:var(--tc-radius-chip);background-color:var(--tc-chip-bg);color:var(--tc-text-muted);flex:none;align-items:center;font-size:11px;display:inline-flex}._work_1o45b_105{min-width:0;padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-panel-padding)}._work_inner_1o45b_110{gap:var(--tc-form-row-gap);max-width:760px;display:grid}._work_head_1o45b_116{gap:var(--tc-space-1);display:grid}._work_title_1o45b_121{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);overflow-wrap:anywhere;margin:0}._work_description_1o45b_130{color:var(--tc-text-muted);margin:0}._text_area_1o45b_135{min-height:168px}._counter_1o45b_140{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-align:end}._row_1o45b_146{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._hint_1o45b_153{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._error_1o45b_160{color:var(--tc-error);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._grid2_1o45b_167{gap:var(--tc-form-row-gap);grid-template-columns:repeat(auto-fill,minmax(220px,1fr));display:grid}._chip_toggle_1o45b_173{align-items:center;gap:var(--tc-space-1-5);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);height:32px;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);padding:0 14px;display:inline-flex}._chip_toggle_1o45b_173[aria-pressed=true]{border-color:var(--tc-marker);background-color:var(--tc-marker);color:var(--tc-on-marker)}._story_summary_1o45b_192{gap:var(--tc-space-1) var(--tc-space-3);padding:var(--tc-space-3) var(--tc-space-3) var(--tc-space-3) var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:minmax(0,1fr) auto;align-items:center;display:grid}._story_summary_label_1o45b_203{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._story_summary_text_1o45b_208{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);-webkit-line-clamp:2;-webkit-box-orient:vertical;grid-column:1;display:-webkit-box;overflow:hidden}._story_summary_action_1o45b_219{grid-area:1/2/3}._plan_1o45b_225{gap:var(--tc-space-3);display:grid}._plan_head_1o45b_230{gap:var(--tc-space-1-5) var(--tc-space-3);flex-wrap:wrap;align-items:baseline;display:flex}._section_title_1o45b_237{font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg);margin:0}._plan_head_1o45b_230 ._hint_1o45b_153{margin-inline-start:auto}._scene_1o45b_248{padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:auto minmax(0,1fr);gap:14px;display:grid}._scene_1o45b_248[data-disabled=true] ._scene_main_1o45b_258{opacity:.55}._scene_side_1o45b_262{padding-top:var(--tc-space-0-5);align-content:start;justify-items:center;gap:10px;display:grid}._scene_number_1o45b_270{color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs)}._scene_main_1o45b_258{gap:10px;min-width:0;display:grid}._scene_top_1o45b_282{align-items:flex-start;gap:10px;display:flex}._scene_text_1o45b_288{field-sizing:content;flex:1;min-width:0;min-height:0}._scene_source_1o45b_296{border-inline-start:2px solid var(--tc-divider);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);-webkit-line-clamp:2;-webkit-box-orient:vertical;padding-inline-start:var(--tc-space-2);line-height:18px;display:-webkit-box;overflow:hidden}._scene_meta_1o45b_308{gap:var(--tc-space-1-5);flex-wrap:wrap;align-items:center;display:flex}._who_1o45b_315{border-radius:var(--tc-radius-chip);background-color:var(--tc-accent-soft);height:26px;font-size:var(--tc-font-size-xs);align-items:center;padding:0 10px;display:inline-flex}._scene_error_1o45b_325{color:var(--tc-error);font-size:var(--tc-font-size-xs);margin:0}._plan_foot_1o45b_331{gap:var(--tc-space-2);padding:var(--tc-space-3) 0;background-color:var(--tc-canvas);flex-wrap:wrap;align-items:center;display:flex;position:sticky;bottom:0}._spacer_1o45b_342{flex:1}._range_summary_1o45b_347{gap:var(--tc-space-2) var(--tc-space-4);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);flex-wrap:wrap;align-items:center;padding:6px 6px 6px 14px;display:flex}._range_summary_action_1o45b_359{margin-inline-start:auto}._range_1o45b_347{gap:var(--tc-space-1-5);display:grid}._message_1o45b_368{padding:10px var(--tc-space-3);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:24px minmax(0,1fr);align-items:start;gap:10px;display:grid}._message_1o45b_368:hover{background-color:var(--tc-surface-raised)}._message_1o45b_368[data-in-range=true]{background-color:var(--tc-accent-soft)}._message_1o45b_368[data-edge=true]{box-shadow:inset 0 0 0 1.5px var(--tc-accent-border)}._bound_1o45b_391{width:22px;height:22px;margin-top:var(--tc-space-0-5);border:1.5px solid var(--tc-border-field);color:var(--tc-text-muted);border-radius:999px;place-items:center;font-size:11px;display:grid}._message_1o45b_368[data-edge=true] ._bound_1o45b_391{border-color:var(--tc-accent);background-color:var(--tc-accent);color:var(--tc-on-accent);font-weight:var(--tc-font-weight-semibold)}._message_body_1o45b_410{min-width:0;display:grid}._message_name_1o45b_415{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._message_1o45b_368[data-user=true] ._message_name_1o45b_415{color:var(--tc-text-muted)}._message_number_1o45b_424{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);font-weight:var(--tc-font-weight-regular);margin-inline-start:var(--tc-space-1-5)}._message_excerpt_1o45b_431{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._strip_1o45b_441{justify-items:center;gap:18px;display:grid}._strip_toolbar_1o45b_447{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;width:100%;max-width:600px;display:flex}._panel_1o45b_456{gap:var(--tc-space-1-5);grid-template-columns:minmax(0,1fr);width:100%;min-width:0;max-width:520px;margin:0;display:grid}._results_1o45b_466{gap:var(--tc-space-3);flex-wrap:wrap;align-items:flex-start;display:flex}._results_1o45b_466 ._panel_1o45b_456{max-width:220px}._panel_frame_1o45b_477{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-sunken);min-width:0;position:relative;overflow:hidden}._panel_frame_1o45b_477>button{width:100%;height:100%;display:block}._panel_image_1o45b_491{object-fit:cover;width:100%;height:100%;display:block}._panel_number_1o45b_498{top:var(--tc-space-2);left:var(--tc-space-2);background-color:var(--tc-media-scrim);min-width:22px;height:22px;color:var(--tc-media-ink);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);pointer-events:none;border-radius:999px;place-items:center;padding:0 7px;display:grid;position:absolute}._panel_state_1o45b_515{place-content:center;justify-items:center;gap:var(--tc-space-2);padding:var(--tc-space-3);background-color:var(--tc-surface-raised);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);text-align:center;display:grid;position:absolute;inset:0}._panel_state_1o45b_515[data-error=true]{color:var(--tc-error)}._panel_bar_1o45b_533{gap:var(--tc-space-1);align-items:center;display:flex}._panel_caption_1o45b_539{min-width:0;color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-overflow:ellipsis;white-space:nowrap;flex:1;overflow:hidden}._compact_1o45b_551[data-layout]{justify-self:start;width:auto}._page_1o45b_557{gap:var(--tc-space-2);width:100%;max-width:600px;padding:var(--tc-space-3);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);display:grid}._page_row_1o45b_568{gap:var(--tc-space-2);align-items:flex-start;min-width:0;display:flex}._page_row_1o45b_568[data-narrow=true]{justify-content:center}._page_row_1o45b_568[data-narrow=true]>._panel_1o45b_456{max-width:calc(50% - var(--tc-space-1))}._panel_1o45b_456[data-layout=page]{max-width:none}._panel_1o45b_456[data-layout=page] ._panel_frame_1o45b_477{border:2px solid var(--tc-text);border-radius:2px}._panel_source_1o45b_592{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);line-height:var(--tc-line-height-xs);-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}._panel_tools_1o45b_602{top:var(--tc-space-1-5);right:var(--tc-space-1-5);gap:var(--tc-space-1);padding:var(--tc-space-0-5);background-color:var(--tc-surface);opacity:0;transition:opacity var(--tc-motion-fast) ease;border-radius:999px;display:flex;position:absolute}._panel_frame_1o45b_477:hover ._panel_tools_1o45b_602,._panel_frame_1o45b_477:focus-within ._panel_tools_1o45b_602{opacity:1}@media (hover:none){._panel_tools_1o45b_602{opacity:1}}._narrow_only_1o45b_626{display:none}@container studio-workspace (width<=640px){._layout_1o45b_6{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._history_1o45b_12{padding:var(--tc-space-1) var(--tc-space-4) var(--tc-space-2);scrollbar-width:none;flex-direction:row;overflow-x:auto}._history_new_1o45b_21{flex:none;margin:0}._history_title_1o45b_25{display:none}._history_item_1o45b_31{max-width:200px;padding:var(--tc-space-1-5) var(--tc-space-3) var(--tc-space-1-5) var(--tc-space-1-5);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:999px;flex:none;grid-template-columns:32px auto}._history_thumb_1o45b_51{border-radius:999px;width:32px;height:32px}._history_meta_1o45b_83{display:none}._work_1o45b_105{padding:var(--tc-space-2) var(--tc-space-4) var(--tc-space-4)}._work_title_1o45b_121{font-size:22px;line-height:28px}._scene_1o45b_248{padding:var(--tc-space-3);gap:10px}._scene_source_1o45b_296,._wide_only_1o45b_690{display:none}._narrow_only_1o45b_626{display:inline-flex}._mode_switch_1o45b_698[data-layout]{justify-self:stretch;width:100%}}");
var U = Ce, we = ["data-layout"], Te = ["data-error"], Ee = ["title"], De = ["for"], Oe = /* @__PURE__ */ D({
	__name: "PanelFigure",
	props: {
		scene: {},
		index: {},
		pending: { type: Boolean },
		numbered: { type: Boolean },
		layout: {},
		source: {},
		readImage: { type: Function }
	},
	emits: ["regenerate", "update:prompt"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = S(), a = w(!1), o = w(!1), s = p();
		l(() => n.scene.active_image_id, () => {
			o.value = !1;
		});
		let c = C(() => `${String(n.scene.size.width)} / ${String(n.scene.size.height)}`), u = C(() => n.scene.scene || n.scene.positive_prompt);
		return (t, n) => (f(), m("figure", {
			class: h(y(U).panel),
			"data-layout": e.layout
		}, [
			b("div", {
				class: h(y(U).panel_frame),
				style: re({ aspectRatio: c.value })
			}, [
				e.pending ? (f(), m("div", {
					key: 0,
					class: h(y(U).panel_state)
				}, [b("span", {
					class: h(y(M).appButtonSpinner),
					"aria-hidden": "true"
				}, [O(A, { icon: y(ce) }, null, 8, ["icon"])], 2), E(" " + x(y(i)("create.panel_pending")), 1)], 2)) : e.scene.active_image_id !== null && !o.value ? (f(), v(Se, {
					key: e.scene.active_image_id,
					"image-id": e.scene.active_image_id,
					alt: u.value,
					"read-image": e.readImage,
					"image-class": y(U).panel_image,
					zoomable: "",
					onFailed: n[0] ||= (e) => o.value = !0
				}, null, 8, [
					"image-id",
					"alt",
					"read-image",
					"image-class"
				])) : (f(), m("div", {
					key: 2,
					class: h(y(U).panel_state),
					"data-error": String(e.scene.last_error !== null || o.value)
				}, x(o.value ? y(i)("create.panel_missing") : e.scene.last_error === null ? y(i)("create.panel_empty") : y(i)("create.scene_failed", { reason: e.scene.last_error })), 11, Te)),
				e.numbered ? (f(), m("span", {
					key: 3,
					class: h(y(U).panel_number)
				}, x(e.index + 1), 3)) : _("", !0),
				e.layout === "page" ? (f(), m("span", {
					key: 4,
					class: h(y(U).panel_tools)
				}, [O(B, {
					icon: y(F),
					size: "sm",
					label: y(i)("create.panel_regenerate"),
					disabled: e.pending,
					onClick: n[1] ||= (e) => r("regenerate")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]), O(B, {
					icon: y(P),
					size: "sm",
					label: y(i)("create.panel_edit_prompt"),
					pressed: a.value,
					onClick: n[2] ||= (e) => a.value = !a.value
				}, null, 8, [
					"icon",
					"label",
					"pressed"
				])], 2)) : _("", !0)
			], 6),
			e.source === null ? _("", !0) : (f(), m("figcaption", {
				key: 0,
				class: h(y(U).panel_source),
				title: e.source
			}, x(e.source), 11, Ee)),
			e.layout === "list" ? (f(), m("figcaption", {
				key: 1,
				class: h(y(U).panel_bar)
			}, [
				b("span", { class: h(y(U).panel_caption) }, x(u.value), 3),
				O(j, {
					class: h(y(U).wide_only),
					icon: y(F),
					label: y(i)("create.panel_regenerate"),
					variant: "ghost",
					disabled: e.pending,
					onClick: n[3] ||= (e) => r("regenerate")
				}, null, 8, [
					"class",
					"icon",
					"label",
					"disabled"
				]),
				O(j, {
					class: h(y(U).wide_only),
					icon: y(P),
					label: y(i)("create.panel_edit_prompt"),
					variant: "ghost",
					onClick: n[4] ||= (e) => a.value = !a.value
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				b("span", { class: h(y(U).narrow_only) }, [O(B, {
					icon: y(F),
					size: "sm",
					label: y(i)("create.panel_regenerate"),
					disabled: e.pending,
					onClick: n[5] ||= (e) => r("regenerate")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]), O(B, {
					icon: y(P),
					size: "sm",
					label: y(i)("create.panel_edit_prompt"),
					pressed: a.value,
					onClick: n[6] ||= (e) => a.value = !a.value
				}, null, 8, [
					"icon",
					"label",
					"pressed"
				])], 2)
			], 2)) : _("", !0),
			a.value ? (f(), m(T, { key: 2 }, [b("label", {
				for: y(s),
				class: "tc-visually-hidden"
			}, x(y(i)("create.scene_tags_label")), 9, De), O(z, {
				id: y(s),
				"model-value": e.scene.positive_prompt,
				"onUpdate:modelValue": n[7] ||= (e) => r("update:prompt", e)
			}, null, 8, ["id", "model-value"])], 64)) : _("", !0)
		], 10, we));
	}
}), ke = ["data-disabled"], W = ["value", "aria-label"], G = ["for"], Ae = /* @__PURE__ */ D({
	__name: "SceneCard",
	props: {
		scene: {},
		index: {}
	},
	emits: ["change", "remove"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = S(), a = C(() => {
			let { width: e, height: t } = n.scene.size;
			return e === t ? "square" : e > t ? "landscape" : "portrait";
		}), o = C(() => [
			{
				value: "portrait",
				label: i("create.frame.portrait")
			},
			{
				value: "landscape",
				label: i("create.frame.landscape")
			},
			{
				value: "square",
				label: i("create.frame.square")
			}
		]), s = p(), c = C(() => String(n.index + 1).padStart(2, "0"));
		function l(e) {
			let t = fe[e];
			r("change", { size: { ...t } }, !1);
		}
		return (t, n) => (f(), m("article", {
			class: h(y(U).scene),
			"data-disabled": String(!e.scene.enabled)
		}, [b("div", { class: h(y(U).scene_side) }, [O(N, {
			"model-value": e.scene.enabled,
			label: y(i)("create.scene_enabled", { n: e.index + 1 }),
			"label-hidden": "",
			"onUpdate:modelValue": n[0] ||= (e) => r("change", { enabled: e }, !1)
		}, null, 8, ["model-value", "label"]), b("span", { class: h(y(U).scene_number) }, x(c.value), 3)], 2), b("div", { class: h(y(U).scene_main) }, [
			b("div", { class: h(y(U).scene_top) }, [b("textarea", {
				class: h(y(U).scene_text),
				rows: "2",
				value: e.scene.scene,
				"aria-label": y(i)("create.scene_text_label", { n: e.index + 1 }),
				onInput: n[1] ||= (e) => r("change", { scene: e.target.value }, !0)
			}, null, 42, W), O(B, {
				icon: y(de),
				size: "sm",
				label: y(i)("create.scene_remove"),
				onClick: n[2] ||= (e) => r("remove")
			}, null, 8, ["icon", "label"])], 2),
			e.scene.excerpt === "" ? _("", !0) : (f(), m("div", {
				key: 0,
				class: h(y(U).scene_source)
			}, x(e.scene.excerpt), 3)),
			b("div", { class: h(y(U).scene_meta) }, [(f(!0), m(T, null, u(e.scene.characters, (e) => (f(), m("span", {
				key: e,
				class: h(y(U).who)
			}, x(e), 3))), 128)), O(me, {
				class: h(y(U).compact),
				"model-value": a.value,
				options: o.value,
				label: y(i)("create.frame_label"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"class",
				"model-value",
				"options",
				"label"
			])], 2),
			b("label", {
				for: y(s),
				class: "tc-visually-hidden"
			}, x(y(i)("create.scene_tags_label")), 9, G),
			O(z, {
				id: y(s),
				"model-value": e.scene.positive_prompt,
				"onUpdate:modelValue": n[3] ||= (e) => r("change", { positive_prompt: e }, !0)
			}, null, 8, ["id", "model-value"]),
			e.scene.last_error === null ? _("", !0) : (f(), m("p", {
				key: 1,
				class: h(y(U).scene_error),
				role: "alert"
			}, x(y(i)("create.scene_failed", { reason: e.scene.last_error })), 3))
		], 2)], 10, ke));
	}
}), K = ["aria-label"], q = [
	"data-in-range",
	"data-edge",
	"data-user",
	"aria-pressed",
	"onClick"
], je = 40, Me = /* @__PURE__ */ D({
	__name: "StripRange",
	props: {
		messages: {},
		from: {},
		to: {}
	},
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = S(), a = w(je), o = C(() => n.messages.slice(-a.value)), s = C(() => n.messages.filter((e) => e.message_id >= n.from && e.message_id <= n.to).length), c = w(null);
		function l(e) {
			if (c.value === null) {
				c.value = e, r("change", e, e);
				return;
			}
			r("change", Math.min(c.value, e), Math.max(c.value, e)), c.value = null;
		}
		function d() {
			let e = n.messages.findLast((e) => !e.is_user);
			e !== void 0 && (c.value = null, r("change", e.message_id, e.message_id));
		}
		function ee(e) {
			return e === n.from ? i("create.range_from") : e === n.to ? i("create.range_to") : "";
		}
		function p(e) {
			return e.slice(0, 400).replace(/\s+/gu, " ").trim();
		}
		return (t, n) => (f(), m(T, null, [
			b("div", { class: h(y(U).range_summary) }, [
				O(A, { icon: y(H) }, null, 8, ["icon"]),
				b("span", null, x(y(i)("create.range_summary", {
					from: `#${e.from}`,
					to: `#${e.to}`,
					n: s.value
				})), 1),
				b("span", { class: h(y(U).range_summary_action) }, [O(j, {
					label: y(i)("create.range_latest"),
					variant: "ghost",
					onClick: d
				}, null, 8, ["label"])], 2)
			], 2),
			b("p", { class: h(y(U).hint) }, x(c.value === null ? y(i)("create.range_hint_start") : y(i)("create.range_hint_end")), 3),
			b("div", {
				class: h(y(U).range),
				role: "group",
				"aria-label": y(i)("create.range_label")
			}, [o.value.length < e.messages.length ? (f(), v(j, {
				key: 0,
				label: y(i)("create.range_more"),
				variant: "ghost",
				onClick: n[0] ||= (e) => a.value += je
			}, null, 8, ["label"])) : _("", !0), (f(!0), m(T, null, u(o.value, (t) => (f(), m("button", {
				key: t.message_id,
				type: "button",
				class: h(["tc-interactive", y(U).message]),
				"data-in-range": String(t.message_id >= e.from && t.message_id <= e.to),
				"data-edge": String(t.message_id === e.from || t.message_id === e.to),
				"data-user": String(t.is_user),
				"aria-pressed": t.message_id >= e.from && t.message_id <= e.to,
				onClick: (e) => l(t.message_id)
			}, [b("span", { class: h(y(U).bound) }, x(ee(t.message_id)), 3), b("span", { class: h(y(U).message_body) }, [b("span", { class: h(y(U).message_name) }, [E(x(t.name), 1), b("span", { class: h(y(U).message_number) }, "#" + x(t.message_id), 3)], 2), b("span", { class: h(y(U).message_excerpt) }, x(p(t.text)), 3)], 2)], 10, q))), 128))], 10, K)
		], 64));
	}
}), J = e({
	name: t(),
	prompt: t(),
	negative_prompt: t()
}), Y = e({
	id: t().min(1),
	enabled: n(),
	scene: t(),
	excerpt: t(),
	characters: r(t()),
	size: e({
		width: a().int().positive(),
		height: a().int().positive()
	}),
	positive_prompt: t(),
	negative_prompt: t(),
	character_prompts: r(J),
	image_ids: r(t()),
	active_image_id: t().nullable(),
	last_error: t().nullable()
}), X = e({
	display_name: t(),
	kind: i([
		"story",
		"prompt",
		"strip"
	]),
	created_at: t(),
	story: t().default(""),
	worldbooks: r(t()).default([]),
	chat_id: t().nullable().default(null),
	from_message: a().int().nullable().default(null),
	to_message: a().int().nullable().default(null),
	style: i(["strip", "default"]).default("strip"),
	scenes: r(Y)
});
function Ne(e) {
	let t = X.safeParse(e.payload);
	return t.success ? {
		...t.data,
		id: e.id
	} : null;
}
function Pe(e) {
	let { id: t, ...n } = e;
	return X.parse(JSON.parse(JSON.stringify(n)));
}
//#endregion
//#region src/ui/views/create/use_creation_store.ts
var Fe = 600;
function Ie(e) {
	let t = g(/* @__PURE__ */ new Map()), n = g(/* @__PURE__ */ new Set()), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = C(() => {
		let n = e.records().map((e) => t.get(e.id) ?? Ne(e)).filter((e) => e !== null);
		for (let e of t.values()) n.some((t) => t.id === e.id) || n.push(e);
		return n.sort((e, t) => t.created_at.localeCompare(e.created_at));
	});
	function o(n) {
		let r = t.get(n);
		if (r !== void 0) return r;
		let i = e.records().find((e) => e.id === n), a = i === void 0 ? null : Ne(i);
		return a === null ? null : (t.set(n, a), t.get(n) ?? null);
	}
	function s(n) {
		let a = i.get(n);
		a !== void 0 && (clearTimeout(a), i.delete(n));
		let o = (r.get(n) ?? Promise.resolve()).then(async () => {
			let r = t.get(n);
			if (r === void 0) return;
			let i = Pe(r);
			await e.save({
				id: n,
				category: "creation",
				record_key: n,
				display_name: i.display_name,
				payload: i
			});
		}).catch(e.on_save_error);
		return r.set(n, o), o;
	}
	async function c(e) {
		t.set(e.id, e), await s(e.id);
	}
	function l(e, t, n = { debounce: !1 }) {
		let r = o(e);
		if (r === null) return;
		if (t(r), !n.debounce) {
			s(e);
			return;
		}
		let a = i.get(e);
		a !== void 0 && clearTimeout(a), i.set(e, setTimeout(() => {
			s(e);
		}, Fe));
	}
	async function u(n) {
		let a = i.get(n);
		a !== void 0 && (clearTimeout(a), i.delete(n)), await r.get(n), t.delete(n), r.delete(n), await e.remove(n);
	}
	async function d(t, r, i) {
		let a = i.filter((e) => !n.has(e));
		for (let e of a) n.add(e);
		for (let i of a) {
			let a = o(r), s = a?.scenes.find((e) => e.id === i);
			if (a === null || s === void 0) {
				n.delete(i);
				continue;
			}
			let c = a.kind === "strip" ? {
				settings: e.strip_settings(),
				style: a.style
			} : null, u = null, d = null;
			try {
				u = await t.generate(R(s, c));
			} catch (e) {
				d = e instanceof Error ? e.message : String(e);
			}
			n.delete(i), l(r, (e) => {
				let t = e.scenes.find((e) => e.id === i);
				t !== void 0 && (u !== null && (t.image_ids.push(u), t.active_image_id = u), t.last_error = d);
			});
		}
	}
	return {
		list: a,
		get: o,
		add: c,
		edit: l,
		remove: u,
		pending: n,
		generate: d
	};
}
//#endregion
//#region src/ui/views/create/CreateView.vue?vue&type=script&setup=true&lang.ts
var Le = ["aria-label"], Re = ["aria-current", "onClick"], ze = ["id", "placeholder"], Be = ["aria-pressed", "onClick"], Ve = ["aria-pressed"], He = ["data-narrow"], Ue = 4e3, We = 4, Ge = /* @__PURE__ */ D({
	__name: "CreateView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = S(), i = ee(ae, null), a = C(() => t.state.settings.settings?.illustration.strip ?? o), s = w(null);
		function p(e) {
			return e instanceof Error ? e.message : String(e);
		}
		let g = Ie({
			records: () => t.state.assets.records.creation,
			save: (e) => t.controller.save_asset("creation", e),
			remove: (e) => t.controller.remove_asset("creation", e),
			strip_settings: () => a.value,
			on_save_error: (e) => {
				s.value = n("create.save_failed", { reason: p(e) });
			}
		});
		function D(e) {
			return t.state.gallery.records.find((t) => t.id === e)?.media_type ?? "image/png";
		}
		async function k(e) {
			let n = await t.controller.read_gallery_bytes(e);
			return new Blob([new Uint8Array(n)], { type: D(e) });
		}
		async function ce(e) {
			let n = await t.controller.read_gallery_thumbnail(e);
			return new Blob([new Uint8Array(n)], { type: "image/webp" });
		}
		let M = w(null), N = C(() => g.list.value.find((e) => e.id === M.value) ?? null), L = w("plan"), R = w(!1);
		function fe(e) {
			return e.scenes.some((e) => e.active_image_id !== null);
		}
		function V(e) {
			s.value = null, R.value = !1, M.value = e;
			let t = e === null ? null : g.get(e);
			if (L.value = t !== null && fe(t) ? "panels" : "plan", t?.kind === "prompt") {
				let e = t.scenes[0];
				e !== void 0 && ($.value = e.positive_prompt, tt.value = e.negative_prompt, nt.value = { ...e.size });
			}
		}
		let H = w("story"), ye = C(() => N.value?.kind ?? H.value), xe = C(() => [
			{
				value: "story",
				label: n("create.mode.story")
			},
			{
				value: "prompt",
				label: n("create.mode.prompt")
			},
			{
				value: "strip",
				label: n("create.mode.strip")
			}
		]), Ce = C(() => new Intl.DateTimeFormat(r.value, {
			month: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}));
		function we(e) {
			switch (e) {
				case "story": return n("create.mode.story");
				case "prompt": return n("create.mode.prompt");
				case "strip": return n("create.mode.strip");
			}
		}
		function Te(e) {
			switch (e) {
				case "story": return ge;
				case "prompt": return ve;
				case "strip": return _e;
			}
		}
		function Ee(e) {
			return e.scenes.filter((e) => e.active_image_id !== null).length;
		}
		function De(e) {
			let t = Ee(e);
			return `${e.kind === "strip" ? n("create.panel_count", t) : n("create.picture_count", t)} · ${Ce.value.format(new Date(e.created_at))}`;
		}
		function ke(e) {
			return e.scenes.find((e) => e.active_image_id !== null)?.active_image_id ?? null;
		}
		let W = w(""), G = w([]), K = w([]), q = w(!1);
		ne(async () => {
			try {
				G.value = await t.controller.list_worldbooks();
			} catch {
				G.value = [];
			}
		});
		function je(e) {
			K.value = K.value.includes(e) ? K.value.filter((t) => t !== e) : [...K.value, e];
		}
		function J(e) {
			let t = e.trim().split(/\r?\n/u)[0]?.trim() ?? "";
			return t.length > 24 ? `${t.slice(0, 24)}…` : t;
		}
		function Y(e, t) {
			return {
				id: crypto.randomUUID(),
				display_name: t,
				kind: e,
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				story: "",
				worldbooks: [],
				chat_id: null,
				from_message: null,
				to_message: null,
				style: a.value.style,
				scenes: []
			};
		}
		async function X() {
			let e = W.value.trim();
			if (!(i === null || e === "" || q.value)) {
				q.value = !0, s.value = null;
				try {
					let t = await i.plan_story(e, K.value), n = N.value;
					if (n !== null && n.kind === "story") g.edit(n.id, (n) => {
						n.story = e, n.worldbooks = [...K.value], n.display_name = J(e), n.scenes = [...t];
					});
					else {
						let n = Y("story", J(e));
						n.story = e, n.worldbooks = [...K.value], n.scenes = [...t], await g.add(n), M.value = n.id;
					}
					R.value = !1, W.value = "", K.value = [], L.value = "plan";
				} catch (e) {
					s.value = n("create.plan_failed", { reason: p(e) });
				} finally {
					q.value = !1;
				}
			}
		}
		function Ne() {
			let e = N.value;
			e !== null && (W.value = e.story, K.value = e.worldbooks.filter((e) => G.value.includes(e)), R.value = !0);
		}
		async function Pe() {
			let e = N.value;
			e !== null && (e.kind === "story" ? (W.value = e.story, K.value = [...e.worldbooks], await X()) : e.kind === "strip" && await et());
		}
		let Fe = C(() => ye.value === "story" && (N.value === null || R.value)), Ge = w(null), Z = w([]), Q = w(null), Ke = w(!1), qe = w(0), Je = w(0), Ye = w(a.value.style), Xe = w(a.value.max_panels), Ze = C(() => [{
			value: "strip",
			label: n("create.style.strip")
		}, {
			value: "default",
			label: n("create.style.default")
		}]);
		async function Qe() {
			if (i !== null) {
				Ke.value = !0, Q.value = null;
				try {
					let { chat_id: e, messages: t } = await i.strip_messages();
					Ge.value = e, Z.value = t;
					let n = t.findLast((e) => !e.is_user) ?? t.at(-1);
					qe.value = n?.message_id ?? 0, Je.value = n?.message_id ?? 0;
				} catch {
					Q.value = n("create.strip_no_chat"), Z.value = [];
				} finally {
					Ke.value = !1;
				}
			}
		}
		let $e = ee(ie, w(null));
		l(() => [N.value === null && H.value === "strip", $e.value], ([e]) => {
			e && (Ye.value = a.value.style, Xe.value = a.value.max_panels, Qe());
		});
		async function et() {
			if (i === null || q.value) return;
			let e = N.value, t = e?.from_message ?? qe.value, r = e?.to_message ?? Je.value;
			q.value = !0, s.value = null;
			try {
				if (e !== null) {
					let { chat_id: t } = await i.strip_messages();
					if (t !== e.chat_id) throw Error(n("create.strip_other_chat"));
				}
				let o = e === null ? Xe.value : a.value.max_panels, s = await i.plan_strip(t, r, o);
				if (e !== null) g.edit(e.id, (e) => {
					e.scenes = [...s];
				});
				else {
					let e = Y("strip", n("create.strip_title", {
						from: String(t),
						to: String(r)
					}));
					e.chat_id = Ge.value, e.from_message = t, e.to_message = r, e.style = Ye.value, e.scenes = [...s], await g.add(e), M.value = e.id;
				}
				L.value = "plan";
			} catch (e) {
				s.value = n("create.plan_failed", { reason: p(e) });
			} finally {
				q.value = !1;
			}
		}
		let $ = w(""), tt = w(""), nt = w({
			width: 832,
			height: 1216
		}), rt = w(1);
		async function it() {
			if (i === null || $.value.trim() === "") return;
			s.value = null;
			let e = Array.from({ length: rt.value }, () => ({
				id: crypto.randomUUID(),
				enabled: !0,
				scene: "",
				excerpt: "",
				characters: [],
				size: { ...nt.value },
				positive_prompt: $.value,
				negative_prompt: tt.value,
				character_prompts: [],
				image_ids: [],
				active_image_id: null,
				last_error: null
			})), t = N.value, n;
			if (t !== null && t.kind === "prompt") n = t.id, g.edit(n, (t) => {
				t.scenes.push(...e);
			});
			else {
				let t = Y("prompt", J($.value));
				t.scenes = e, await g.add(t), M.value = t.id, n = t.id;
			}
			await g.generate(i, n, e.map((e) => e.id));
		}
		let at = C(() => N.value?.scenes.filter((e) => e.enabled).length ?? 0), ot = C(() => N.value?.scenes.filter((e) => e.enabled && e.active_image_id === null && !g.pending.has(e.id)) ?? []), st = C(() => N.value?.scenes.filter((e) => e.enabled || e.active_image_id !== null || g.pending.has(e.id)) ?? []), ct = w(!1), lt = C(() => be(st.value));
		function ut(e, t, n) {
			let r = N.value;
			r !== null && g.edit(r.id, (n) => {
				let r = n.scenes.find((t) => t.id === e);
				r !== void 0 && Object.assign(r, t);
			}, { debounce: n });
		}
		function dt(e) {
			let t = N.value;
			t !== null && g.edit(t.id, (t) => {
				t.scenes = t.scenes.filter((t) => t.id !== e);
			});
		}
		function ft() {
			let e = N.value;
			if (i === null || e === null) return;
			let t = ot.value.map((e) => e.id);
			L.value = "panels", g.generate(i, e.id, t);
		}
		function pt(e) {
			let t = N.value;
			i !== null && t !== null && g.generate(i, t.id, [e]);
		}
		let mt = C(() => N.value?.display_name ?? n("create.title")), ht = C(() => {
			let e = N.value;
			if (e === null) switch (H.value) {
				case "story": return n("create.description.story");
				case "prompt": return n("create.description.prompt");
				case "strip": return n("create.description.strip");
			}
			let t = e.scenes.length;
			switch (e.kind) {
				case "story": return n("create.summary.story", { n: t });
				case "prompt": return n("create.description.prompt");
				case "strip": return n("create.summary.strip", {
					from: String(e.from_message ?? ""),
					to: String(e.to_message ?? ""),
					n: t,
					style: e.style === "strip" ? n("create.style.strip") : n("create.style.default")
				});
			}
		}), gt = w(!1), _t = w(!1);
		async function vt() {
			let e = N.value;
			if (e !== null) {
				_t.value = !0;
				try {
					await g.remove(e.id), gt.value = !1, V(null);
				} catch (e) {
					s.value = n("create.save_failed", { reason: p(e) });
				} finally {
					_t.value = !1;
				}
			}
		}
		return (e, t) => (f(), m(T, null, [y(i) === null ? (f(), v(oe, {
			key: 0,
			status: "empty",
			"empty-title": y(n)("create.unavailable_title"),
			"empty-message": y(n)("create.unavailable_message")
		}, null, 8, ["empty-title", "empty-message"])) : (f(), m("div", {
			key: 1,
			class: h(y(U).layout)
		}, [b("aside", {
			class: h(y(U).history),
			"aria-label": y(n)("create.history_label")
		}, [
			O(j, {
				class: h(y(U).history_new),
				icon: y(le),
				label: y(n)("create.new"),
				onClick: t[0] ||= (e) => V(null)
			}, null, 8, [
				"class",
				"icon",
				"label"
			]),
			y(g).list.value.length > 0 ? (f(), m("div", {
				key: 0,
				class: h(y(U).history_title)
			}, x(y(n)("create.history_recent")), 3)) : _("", !0),
			(f(!0), m(T, null, u(y(g).list.value, (e) => (f(), m("button", {
				key: e.id,
				type: "button",
				class: h(["tc-interactive", y(U).history_item]),
				"aria-current": e.id === M.value ? "true" : void 0,
				onClick: (t) => V(e.id)
			}, [b("span", { class: h(y(U).history_thumb) }, [ke(e) === null ? (f(), v(A, {
				key: 1,
				icon: Te(e.kind)
			}, null, 8, ["icon"])) : (f(), v(Se, {
				key: 0,
				"image-id": ke(e) ?? "",
				alt: "",
				"read-image": ce
			}, null, 8, ["image-id"]))], 2), b("span", { class: h(y(U).history_body) }, [b("span", { class: h(y(U).history_name) }, x(e.display_name), 3), b("span", { class: h(y(U).history_meta) }, [b("span", { class: h(y(U).kind) }, x(we(e.kind)), 3), E(" " + x(De(e)), 1)], 2)], 2)], 10, Re))), 128))
		], 10, Le), b("div", { class: h(y(U).work) }, [b("div", { class: h(y(U).work_inner) }, [
			b("div", { class: h(y(U).row) }, [b("div", { class: h([y(U).work_head, y(U).spacer]) }, [b("h1", { class: h(y(U).work_title) }, x(mt.value), 3), b("p", { class: h(y(U).work_description) }, x(ht.value), 3)], 2), N.value === null ? _("", !0) : (f(), v(B, {
				key: 0,
				icon: y(de),
				label: y(n)("create.delete"),
				onClick: t[1] ||= (e) => gt.value = !0
			}, null, 8, ["icon", "label"]))], 2),
			N.value === null ? (f(), v(me, {
				key: 0,
				modelValue: H.value,
				"onUpdate:modelValue": t[2] ||= (e) => H.value = e,
				class: h([y(U).compact, y(U).mode_switch]),
				options: xe.value,
				label: y(n)("create.mode_label")
			}, null, 8, [
				"modelValue",
				"class",
				"options",
				"label"
			])) : _("", !0),
			s.value === null ? _("", !0) : (f(), m("p", {
				key: 1,
				class: h(y(U).error),
				role: "alert"
			}, x(s.value), 3)),
			Fe.value ? (f(), m(T, { key: 2 }, [
				O(I, { label: y(n)("create.story_label") }, {
					default: c(({ fieldId: e }) => [d(b("textarea", {
						id: e,
						"onUpdate:modelValue": t[3] ||= (e) => W.value = e,
						class: h(y(U).text_area),
						maxlength: Ue,
						placeholder: y(n)("create.story_placeholder")
					}, null, 10, ze), [[te, W.value]]), b("div", { class: h(y(U).counter) }, x(W.value.length) + " / " + x(Ue), 3)]),
					_: 1
				}, 8, ["label"]),
				G.value.length > 0 ? (f(), v(I, {
					key: 0,
					label: y(n)("create.worldbooks_label"),
					hint: y(n)("create.worldbooks_hint")
				}, {
					default: c(() => [b("div", { class: h(y(U).row) }, [(f(!0), m(T, null, u(G.value, (e) => (f(), m("button", {
						key: e,
						type: "button",
						class: h(["tc-interactive", y(U).chip_toggle]),
						"aria-pressed": K.value.includes(e),
						onClick: (t) => je(e)
					}, [O(A, {
						icon: y(ge),
						size: 14
					}, null, 8, ["icon"]), E(x(e), 1)], 10, Be))), 128))], 2)]),
					_: 1
				}, 8, ["label", "hint"])) : _("", !0),
				b("div", { class: h(y(U).row) }, [
					O(j, {
						icon: y(ue),
						label: y(n)("create.plan_story"),
						variant: "primary",
						pending: q.value,
						disabled: W.value.trim() === "",
						onClick: X
					}, null, 8, [
						"icon",
						"label",
						"pending",
						"disabled"
					]),
					R.value ? (f(), v(j, {
						key: 0,
						label: y(n)("common.actions.cancel"),
						variant: "ghost",
						onClick: t[4] ||= (e) => R.value = !1
					}, null, 8, ["label"])) : _("", !0),
					b("span", { class: h(y(U).hint) }, x(y(n)("create.plan_story_hint", { n: 6 })), 3)
				], 2)
			], 64)) : N.value !== null && N.value.kind === "story" ? (f(), m("div", {
				key: 3,
				class: h(y(U).story_summary)
			}, [
				b("span", { class: h(y(U).story_summary_label) }, x(N.value.worldbooks.length > 0 ? y(n)("create.story_summary_books", {
					n: N.value.story.length,
					books: N.value.worldbooks.join("、")
				}) : y(n)("create.story_summary", { n: N.value.story.length })), 3),
				b("span", { class: h(y(U).story_summary_text) }, x(N.value.story), 3),
				b("span", { class: h(y(U).story_summary_action) }, [O(j, {
					icon: y(P),
					label: y(n)("create.edit_story"),
					variant: "ghost",
					onClick: Ne
				}, null, 8, ["icon", "label"])], 2)
			], 2)) : _("", !0),
			ye.value === "prompt" ? (f(), m(T, { key: 4 }, [
				O(I, {
					label: y(n)("create.positive_label"),
					hint: y(n)("create.positive_hint")
				}, {
					default: c(({ fieldId: e, describedBy: n }) => [O(z, {
						id: e,
						modelValue: $.value,
						"onUpdate:modelValue": t[5] ||= (e) => $.value = e,
						"described-by": n
					}, null, 8, [
						"id",
						"modelValue",
						"described-by"
					])]),
					_: 1
				}, 8, ["label", "hint"]),
				O(I, { label: y(n)("create.negative_label") }, {
					default: c(({ fieldId: e }) => [O(z, {
						id: e,
						modelValue: tt.value,
						"onUpdate:modelValue": t[6] ||= (e) => tt.value = e
					}, null, 8, ["id", "modelValue"])]),
					_: 1
				}, 8, ["label"]),
				O(se, {
					modelValue: nt.value,
					"onUpdate:modelValue": t[7] ||= (e) => nt.value = e
				}, null, 8, ["modelValue"]),
				b("div", { class: h(y(U).grid2) }, [O(I, { label: y(n)("create.count_label") }, {
					default: c(({ fieldId: e }) => [O(pe, {
						id: e,
						"model-value": rt.value,
						label: y(n)("create.count_label"),
						min: 1,
						max: We,
						"increment-label": y(n)("common.actions.increase"),
						"decrement-label": y(n)("common.actions.decrease"),
						"onUpdate:modelValue": t[8] ||= (e) => rt.value = e ?? 1
					}, null, 8, [
						"id",
						"model-value",
						"label",
						"increment-label",
						"decrement-label"
					])]),
					_: 1
				}, 8, ["label"])], 2),
				b("div", { class: h(y(U).row) }, [O(j, {
					icon: y(ue),
					label: y(n)("create.generate_count", { n: rt.value }),
					variant: "primary",
					disabled: $.value.trim() === "",
					onClick: it
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]), b("span", { class: h(y(U).hint) }, x(y(n)("create.generate_hint")), 3)], 2),
				N.value !== null && N.value.scenes.length > 0 ? (f(), m("div", {
					key: 0,
					class: h(y(U).results)
				}, [(f(!0), m(T, null, u(N.value.scenes, (e, t) => (f(), v(Oe, {
					key: e.id,
					scene: e,
					index: t,
					pending: y(g).pending.has(e.id),
					numbered: !1,
					layout: "list",
					source: null,
					"read-image": k,
					onRegenerate: (t) => pt(e.id),
					"onUpdate:prompt": (t) => ut(e.id, { positive_prompt: t }, !0)
				}, null, 8, [
					"scene",
					"index",
					"pending",
					"onRegenerate",
					"onUpdate:prompt"
				]))), 128))], 2)) : _("", !0)
			], 64)) : _("", !0),
			N.value === null && H.value === "strip" ? (f(), m(T, { key: 5 }, [Ke.value || Q.value !== null ? (f(), v(oe, {
				key: 0,
				status: Ke.value ? "loading" : "error",
				"min-height": "160px",
				"error-message": Q.value ?? ""
			}, null, 8, ["status", "error-message"])) : (f(), m(T, { key: 1 }, [
				O(Me, {
					messages: Z.value,
					from: qe.value,
					to: Je.value,
					onChange: t[9] ||= (e, t) => (qe.value = e, Je.value = t)
				}, null, 8, [
					"messages",
					"from",
					"to"
				]),
				b("div", { class: h(y(U).grid2) }, [O(I, { label: y(n)("create.style_label") }, {
					default: c(() => [O(me, {
						modelValue: Ye.value,
						"onUpdate:modelValue": t[10] ||= (e) => Ye.value = e,
						class: h(y(U).compact),
						options: Ze.value,
						label: y(n)("create.style_label")
					}, null, 8, [
						"modelValue",
						"class",
						"options",
						"label"
					])]),
					_: 1
				}, 8, ["label"]), O(I, { label: y(n)("create.max_panels_label") }, {
					default: c(({ fieldId: e }) => [O(pe, {
						id: e,
						"model-value": Xe.value,
						label: y(n)("create.max_panels_label"),
						min: 1,
						max: 12,
						"increment-label": y(n)("common.actions.increase"),
						"decrement-label": y(n)("common.actions.decrease"),
						"onUpdate:modelValue": t[11] ||= (e) => Xe.value = e ?? a.value.max_panels
					}, null, 8, [
						"id",
						"model-value",
						"label",
						"increment-label",
						"decrement-label"
					])]),
					_: 1
				}, 8, ["label"])], 2),
				b("div", { class: h(y(U).row) }, [O(j, {
					icon: y(_e),
					label: y(n)("create.plan_strip"),
					variant: "primary",
					pending: q.value,
					disabled: Z.value.length === 0,
					onClick: et
				}, null, 8, [
					"icon",
					"label",
					"pending",
					"disabled"
				]), b("span", { class: h(y(U).hint) }, x(y(n)("create.plan_strip_hint")), 3)], 2)
			], 64))], 64)) : _("", !0),
			N.value !== null && N.value.kind !== "prompt" && L.value === "plan" && !R.value ? (f(), m("section", {
				key: 6,
				class: h(y(U).plan)
			}, [
				b("div", { class: h(y(U).plan_head) }, [b("h2", { class: h(y(U).section_title) }, x(N.value.kind === "strip" ? y(n)("create.panels_title") : y(n)("create.scenes_title")), 3), b("span", { class: h(y(U).hint) }, x(y(n)("create.scenes_selected", {
					n: at.value,
					total: N.value.scenes.length
				})), 3)], 2),
				N.value.scenes.length === 0 ? (f(), m("p", {
					key: 0,
					class: h(y(U).hint)
				}, x(y(n)("create.scenes_empty")), 3)) : _("", !0),
				(f(!0), m(T, null, u(N.value.scenes, (e, t) => (f(), v(Ae, {
					key: e.id,
					scene: e,
					index: t,
					onChange: (t, n) => ut(e.id, t, n),
					onRemove: (t) => dt(e.id)
				}, null, 8, [
					"scene",
					"index",
					"onChange",
					"onRemove"
				]))), 128)),
				b("div", { class: h(y(U).plan_foot) }, [
					O(j, {
						icon: y(F),
						label: y(n)("create.replan"),
						variant: "ghost",
						pending: q.value,
						onClick: Pe
					}, null, 8, [
						"icon",
						"label",
						"pending"
					]),
					b("span", { class: h(y(U).spacer) }, null, 2),
					fe(N.value) ? (f(), v(j, {
						key: 0,
						label: y(n)("create.show_panels"),
						variant: "secondary",
						onClick: t[12] ||= (e) => L.value = "panels"
					}, null, 8, ["label"])) : _("", !0),
					O(j, {
						label: y(n)("create.generate_count", { n: ot.value.length }),
						variant: "primary",
						disabled: ot.value.length === 0,
						onClick: ft
					}, null, 8, ["label", "disabled"])
				], 2)
			], 2)) : _("", !0),
			N.value !== null && N.value.kind !== "prompt" && L.value === "panels" ? (f(), m("div", {
				key: 7,
				class: h(y(U).strip)
			}, [b("div", { class: h(y(U).strip_toolbar) }, [
				b("span", { class: h(y(U).kind) }, x(we(N.value.kind)), 3),
				b("span", { class: h(y(U).hint) }, x(y(n)("create.panels_saved")), 3),
				b("span", { class: h(y(U).spacer) }, null, 2),
				b("button", {
					type: "button",
					class: h(["tc-interactive", y(U).chip_toggle]),
					"aria-pressed": ct.value,
					onClick: t[13] ||= (e) => ct.value = !ct.value
				}, x(y(n)("create.show_source")), 11, Ve),
				O(j, {
					icon: y(P),
					label: y(n)("create.edit_scenes"),
					variant: "ghost",
					onClick: t[14] ||= (e) => L.value = "plan"
				}, null, 8, ["icon", "label"])
			], 2), b("div", { class: h(y(U).page) }, [(f(!0), m(T, null, u(lt.value, (e) => (f(), m("div", {
				key: e.cells[0]?.item.id,
				class: h(y(U).page_row),
				"data-narrow": String(e.narrow)
			}, [(f(!0), m(T, null, u(e.cells, (e) => (f(), v(Oe, {
				key: e.item.id,
				style: re({ flex: `${String(e.ratio)} 1 0` }),
				scene: e.item,
				index: e.index,
				pending: y(g).pending.has(e.item.id),
				numbered: !0,
				layout: "page",
				source: ct.value && e.item.excerpt !== "" ? e.item.excerpt : null,
				"read-image": k,
				onRegenerate: (t) => pt(e.item.id),
				"onUpdate:prompt": (t) => ut(e.item.id, { positive_prompt: t }, !0)
			}, null, 8, [
				"style",
				"scene",
				"index",
				"pending",
				"source",
				"onRegenerate",
				"onUpdate:prompt"
			]))), 128))], 10, He))), 128))], 2)], 2)) : _("", !0)
		], 2)], 2)], 2)), O(he, {
			open: gt.value,
			title: y(n)("create.delete_title"),
			description: y(n)("create.delete_description"),
			"confirm-label": y(n)("common.actions.delete"),
			"cancel-label": y(n)("common.actions.cancel"),
			pending: _t.value,
			"onUpdate:open": t[15] ||= (e) => gt.value = e,
			onConfirm: vt
		}, null, 8, [
			"open",
			"title",
			"description",
			"confirm-label",
			"cancel-label",
			"pending"
		])], 64));
	}
});
//#endregion
export { Ge as default };
