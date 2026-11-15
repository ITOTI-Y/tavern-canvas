import { d as e, g as t, i as n, r, t as i, u as a } from "./schemas-BjkyCQYG.js";
import { n as o } from "./settings-DW51ow35.js";
import { F as s, H as c, J as l, L as u, M as d, T as f, W as p, _ as m, a as ee, dt as h, g, gt as _, h as v, ht as te, j as y, m as b, n as x, nt as S, p as C, pt as w, q as T, rt as E, u as D, v as O, x as k, y as A } from "./vue-i18n-XoxYzLIP.js";
import { t as ne } from "./portal_keys-DthxrmWp.js";
import { t as re } from "./creation_port-CiZWBydV.js";
import { n as j, t as ie } from "./AppIcon-DD754F_c.js";
import { t as ae } from "./book-open-BFHVGETM.js";
import { n as M, t as oe } from "./StateSurface-C9eJEtTP.js";
import { t as se } from "./AppSelect-DKz1dWBv.js";
import { a as N, t as ce } from "./ImageSizeField-dUSassCk.js";
import { n as P, t as F } from "./components_styles-BXC5Dc_L.js";
import { t as I } from "./AppCheckbox-mwSAcdjr.js";
import { n as L, t as le } from "./refresh-cw-BPQB33rx.js";
import { n as ue, t as R } from "./FieldGroup-D8VsaFMT.js";
import { t as de } from "./sparkles-DIwEk888.js";
import { t as fe } from "./trash-2-Cl_9_CUX.js";
import { n as pe } from "./deferred_stylesheets-DhfsdqPo.js";
import { t as me } from "./size_choice-BAuN1-V0.js";
import { r as z, t as B } from "./creation_planning-B64h6hlc.js";
import { n as he, t as ge } from "./NumberStepper-BUxNPDyt.js";
import { t as V } from "./IconButton-CPI-A0bT.js";
import { t as _e } from "./ConfirmDialog-BMpZdMGH.js";
import { t as H } from "./TagInput-D7G-qA43.js";
import { t as ve } from "./ZoomableImage-hCp3JCgd.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/layout-panel-top.js
var ye = j("layout-panel-top", [
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
]), be = j("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]), xe = j("tags", [
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
]), Se = 2.2;
function Ce(e) {
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
		n === null ? n = e : n.ratio + e.ratio <= Se ? (r([n, e]), n = null) : (r([n]), n = e);
	}
	return n !== null && r([n]), t;
}
//#endregion
//#region src/ui/views/create/CreationImage.vue?vue&type=script&setup=true&lang.ts
var we = ["src", "alt"], Te = /* @__PURE__ */ k({
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
		let n = e, r = t, i = E(null), a = 0;
		function o() {
			i.value !== null && (URL.revokeObjectURL(i.value), i.value = null);
		}
		return p(() => n.imageId, async (e) => {
			let t = a += 1;
			o();
			try {
				let r = await n.readImage(e);
				t === a && (i.value = URL.createObjectURL(r));
			} catch {
				t === a && r("failed");
			}
		}, { immediate: !0 }), y(() => {
			a += 1, o();
		}), (t, n) => i.value === null ? g("", !0) : (s(), m(D, { key: 0 }, [e.zoomable ? (s(), v(ve, {
			key: 0,
			src: i.value,
			alt: e.alt,
			"image-class": e.imageClass
		}, null, 8, [
			"src",
			"alt",
			"image-class"
		])) : (s(), m("img", {
			key: 1,
			src: i.value,
			alt: e.alt,
			class: w(e.imageClass)
		}, null, 10, we))], 64));
	}
}), Ee = {
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
pe("create", "._layout_1o45b_6{grid-template-columns:260px minmax(0,1fr);min-height:100%;display:grid}._history_1o45b_12{align-self:start;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-3) var(--tc-space-4);flex-direction:column;display:flex;overflow:auto}._history_new_1o45b_21{margin:0 var(--tc-space-1) var(--tc-space-2)}._history_title_1o45b_25{padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._history_item_1o45b_31{padding:var(--tc-space-2);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:40px minmax(0,1fr);align-items:center;gap:10px;display:grid}._history_item_1o45b_31:hover{background-color:var(--tc-surface-raised)}._history_item_1o45b_31[aria-current=true]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border)}._history_thumb_1o45b_51{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-sunken);width:40px;height:52px;color:var(--tc-text-muted);place-items:center;display:grid;overflow:hidden}._history_thumb_1o45b_51 img{object-fit:cover;width:100%;height:100%;display:block}._history_body_1o45b_69{gap:var(--tc-space-0-5);min-width:0;display:grid}._history_name_1o45b_75{font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._history_meta_1o45b_83{gap:var(--tc-space-1-5);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);white-space:nowrap;align-items:center;display:flex;overflow:hidden}._kind_1o45b_93{height:18px;padding:0 var(--tc-space-1-5);border-radius:var(--tc-radius-chip);background-color:var(--tc-chip-bg);color:var(--tc-text-muted);flex:none;align-items:center;font-size:11px;display:inline-flex}._work_1o45b_105{min-width:0;padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-panel-padding)}._work_inner_1o45b_110{gap:var(--tc-form-row-gap);max-width:760px;display:grid}._work_head_1o45b_116{gap:var(--tc-space-1);display:grid}._work_title_1o45b_121{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);overflow-wrap:anywhere;margin:0}._work_description_1o45b_130{color:var(--tc-text-muted);margin:0}._text_area_1o45b_135{min-height:168px}._counter_1o45b_140{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-align:end}._row_1o45b_146{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._hint_1o45b_153{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._error_1o45b_160{color:var(--tc-error);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._grid2_1o45b_167{gap:var(--tc-form-row-gap);grid-template-columns:repeat(auto-fill,minmax(220px,1fr));display:grid}._chip_toggle_1o45b_173{align-items:center;gap:var(--tc-space-1-5);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);height:32px;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);padding:0 14px;display:inline-flex}._chip_toggle_1o45b_173[aria-pressed=true]{border-color:var(--tc-marker);background-color:var(--tc-marker);color:var(--tc-on-marker)}._story_summary_1o45b_192{gap:var(--tc-space-1) var(--tc-space-3);padding:var(--tc-space-3) var(--tc-space-3) var(--tc-space-3) var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:minmax(0,1fr) auto;align-items:center;display:grid}._story_summary_label_1o45b_203{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._story_summary_text_1o45b_208{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);-webkit-line-clamp:2;-webkit-box-orient:vertical;grid-column:1;display:-webkit-box;overflow:hidden}._story_summary_action_1o45b_219{grid-area:1/2/3}._plan_1o45b_225{gap:var(--tc-space-3);display:grid}._plan_head_1o45b_230{gap:var(--tc-space-1-5) var(--tc-space-3);flex-wrap:wrap;align-items:baseline;display:flex}._section_title_1o45b_237{font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg);margin:0}._plan_head_1o45b_230 ._hint_1o45b_153{margin-inline-start:auto}._scene_1o45b_248{padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:auto minmax(0,1fr);gap:14px;display:grid}._scene_1o45b_248[data-disabled=true] ._scene_main_1o45b_258{opacity:.55}._scene_side_1o45b_262{padding-top:var(--tc-space-0-5);align-content:start;justify-items:center;gap:10px;display:grid}._scene_number_1o45b_270{color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs)}._scene_main_1o45b_258{gap:10px;min-width:0;display:grid}._scene_top_1o45b_282{align-items:flex-start;gap:10px;display:flex}._scene_text_1o45b_288{field-sizing:content;flex:1;min-width:0;min-height:0}._scene_source_1o45b_296{border-inline-start:2px solid var(--tc-divider);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);-webkit-line-clamp:2;-webkit-box-orient:vertical;padding-inline-start:var(--tc-space-2);line-height:18px;display:-webkit-box;overflow:hidden}._scene_meta_1o45b_308{gap:var(--tc-space-1-5);flex-wrap:wrap;align-items:center;display:flex}._who_1o45b_315{border-radius:var(--tc-radius-chip);background-color:var(--tc-accent-soft);height:26px;font-size:var(--tc-font-size-xs);align-items:center;padding:0 10px;display:inline-flex}._scene_error_1o45b_325{color:var(--tc-error);font-size:var(--tc-font-size-xs);margin:0}._plan_foot_1o45b_331{gap:var(--tc-space-2);padding:var(--tc-space-3) 0;background-color:var(--tc-canvas);flex-wrap:wrap;align-items:center;display:flex;position:sticky;bottom:0}._spacer_1o45b_342{flex:1}._range_summary_1o45b_347{gap:var(--tc-space-2) var(--tc-space-4);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);flex-wrap:wrap;align-items:center;padding:6px 6px 6px 14px;display:flex}._range_summary_action_1o45b_359{margin-inline-start:auto}._range_1o45b_347{gap:var(--tc-space-1-5);display:grid}._message_1o45b_368{padding:10px var(--tc-space-3);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:24px minmax(0,1fr);align-items:start;gap:10px;display:grid}._message_1o45b_368:hover{background-color:var(--tc-surface-raised)}._message_1o45b_368[data-in-range=true]{background-color:var(--tc-accent-soft)}._message_1o45b_368[data-edge=true]{box-shadow:inset 0 0 0 1.5px var(--tc-accent-border)}._bound_1o45b_391{width:22px;height:22px;margin-top:var(--tc-space-0-5);border:1.5px solid var(--tc-border-field);color:var(--tc-text-muted);border-radius:999px;place-items:center;font-size:11px;display:grid}._message_1o45b_368[data-edge=true] ._bound_1o45b_391{border-color:var(--tc-accent);background-color:var(--tc-accent);color:var(--tc-on-accent);font-weight:var(--tc-font-weight-semibold)}._message_body_1o45b_410{min-width:0;display:grid}._message_name_1o45b_415{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._message_1o45b_368[data-user=true] ._message_name_1o45b_415{color:var(--tc-text-muted)}._message_number_1o45b_424{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);font-weight:var(--tc-font-weight-regular);margin-inline-start:var(--tc-space-1-5)}._message_excerpt_1o45b_431{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._strip_1o45b_441{justify-items:center;gap:18px;display:grid}._strip_toolbar_1o45b_447{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;width:100%;max-width:600px;display:flex}._panel_1o45b_456{gap:var(--tc-space-1-5);grid-template-columns:minmax(0,1fr);width:100%;min-width:0;max-width:520px;margin:0;display:grid}._results_1o45b_466{gap:var(--tc-space-3);flex-wrap:wrap;align-items:flex-start;display:flex}._results_1o45b_466 ._panel_1o45b_456{max-width:220px}._panel_frame_1o45b_477{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-sunken);min-width:0;position:relative;overflow:hidden}._panel_frame_1o45b_477>button{width:100%;height:100%;display:block}._panel_image_1o45b_491{object-fit:cover;width:100%;height:100%;display:block}._panel_number_1o45b_498{top:var(--tc-space-2);left:var(--tc-space-2);background-color:var(--tc-media-scrim);min-width:22px;height:22px;color:var(--tc-media-ink);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);pointer-events:none;border-radius:999px;place-items:center;padding:0 7px;display:grid;position:absolute}._panel_state_1o45b_515{place-content:center;justify-items:center;gap:var(--tc-space-2);padding:var(--tc-space-3);background-color:var(--tc-surface-raised);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);text-align:center;display:grid;position:absolute;inset:0}._panel_state_1o45b_515[data-error=true]{color:var(--tc-error)}._panel_bar_1o45b_533{gap:var(--tc-space-1);align-items:center;display:flex}._panel_caption_1o45b_539{min-width:0;color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-overflow:ellipsis;white-space:nowrap;flex:1;overflow:hidden}._compact_1o45b_551[data-layout]{justify-self:start;width:auto}._page_1o45b_557{gap:var(--tc-space-2);width:100%;max-width:600px;padding:var(--tc-space-3);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);display:grid}._page_row_1o45b_568{gap:var(--tc-space-2);align-items:flex-start;min-width:0;display:flex}._page_row_1o45b_568[data-narrow=true]{justify-content:center}._page_row_1o45b_568[data-narrow=true]>._panel_1o45b_456{max-width:calc(50% - var(--tc-space-1))}._panel_1o45b_456[data-layout=page]{max-width:none}._panel_1o45b_456[data-layout=page] ._panel_frame_1o45b_477{border:2px solid var(--tc-text);border-radius:2px}._panel_source_1o45b_592{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);line-height:var(--tc-line-height-xs);-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}._panel_tools_1o45b_602{top:var(--tc-space-1-5);right:var(--tc-space-1-5);gap:var(--tc-space-1);padding:var(--tc-space-0-5);background-color:var(--tc-surface);opacity:0;transition:opacity var(--tc-motion-fast) ease;border-radius:999px;display:flex;position:absolute}._panel_frame_1o45b_477:hover ._panel_tools_1o45b_602,._panel_frame_1o45b_477:focus-within ._panel_tools_1o45b_602{opacity:1}@media (hover:none){._panel_tools_1o45b_602{opacity:1}}._narrow_only_1o45b_626{display:none}@container studio-workspace (width<=640px){._layout_1o45b_6{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._history_1o45b_12{padding:var(--tc-space-1) var(--tc-space-4) var(--tc-space-2);scrollbar-width:none;flex-direction:row;overflow-x:auto}._history_new_1o45b_21{flex:none;margin:0}._history_title_1o45b_25{display:none}._history_item_1o45b_31{max-width:200px;padding:var(--tc-space-1-5) var(--tc-space-3) var(--tc-space-1-5) var(--tc-space-1-5);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:999px;flex:none;grid-template-columns:32px auto}._history_thumb_1o45b_51{border-radius:999px;width:32px;height:32px}._history_meta_1o45b_83{display:none}._work_1o45b_105{padding:var(--tc-space-2) var(--tc-space-4) var(--tc-space-4)}._work_title_1o45b_121{font-size:22px;line-height:28px}._scene_1o45b_248{padding:var(--tc-space-3);gap:10px}._scene_source_1o45b_296,._wide_only_1o45b_690{display:none}._narrow_only_1o45b_626{display:inline-flex}._mode_switch_1o45b_698[data-layout]{justify-self:stretch;width:100%}}");
var U = Ee, De = ["data-layout"], Oe = ["data-error"], ke = ["title"], W = ["for"], Ae = /* @__PURE__ */ k({
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
		let n = e, r = t, { t: i } = x(), a = E(!1), o = E(!1), l = c();
		p(() => n.scene.active_image_id, () => {
			o.value = !1;
		});
		let u = C(() => `${String(n.scene.size.width)} / ${String(n.scene.size.height)}`), d = C(() => n.scene.scene || n.scene.positive_prompt);
		return (t, n) => (s(), m("figure", {
			class: w(h(U).panel),
			"data-layout": e.layout
		}, [
			b("div", {
				class: w(h(U).panel_frame),
				style: te({ aspectRatio: u.value })
			}, [
				e.pending ? (s(), m("div", {
					key: 0,
					class: w(h(U).panel_state)
				}, [b("span", {
					class: w(h(F).appButtonSpinner),
					"aria-hidden": "true"
				}, [A(ie, { icon: h(P) }, null, 8, ["icon"])], 2), O(" " + _(h(i)("create.panel_pending")), 1)], 2)) : e.scene.active_image_id !== null && !o.value ? (s(), v(Te, {
					key: e.scene.active_image_id,
					"image-id": e.scene.active_image_id,
					alt: d.value,
					"read-image": e.readImage,
					"image-class": h(U).panel_image,
					zoomable: "",
					onFailed: n[0] ||= (e) => o.value = !0
				}, null, 8, [
					"image-id",
					"alt",
					"read-image",
					"image-class"
				])) : (s(), m("div", {
					key: 2,
					class: w(h(U).panel_state),
					"data-error": String(e.scene.last_error !== null || o.value)
				}, _(o.value ? h(i)("create.panel_missing") : e.scene.last_error === null ? h(i)("create.panel_empty") : h(i)("create.scene_failed", { reason: e.scene.last_error })), 11, Oe)),
				e.numbered ? (s(), m("span", {
					key: 3,
					class: w(h(U).panel_number)
				}, _(e.index + 1), 3)) : g("", !0),
				e.layout === "page" ? (s(), m("span", {
					key: 4,
					class: w(h(U).panel_tools)
				}, [A(V, {
					icon: h(le),
					size: "sm",
					label: h(i)("create.panel_regenerate"),
					disabled: e.pending,
					onClick: n[1] ||= (e) => r("regenerate")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]), A(V, {
					icon: h(L),
					size: "sm",
					label: h(i)("create.panel_edit_prompt"),
					pressed: a.value,
					onClick: n[2] ||= (e) => a.value = !a.value
				}, null, 8, [
					"icon",
					"label",
					"pressed"
				])], 2)) : g("", !0)
			], 6),
			e.source === null ? g("", !0) : (s(), m("figcaption", {
				key: 0,
				class: w(h(U).panel_source),
				title: e.source
			}, _(e.source), 11, ke)),
			e.layout === "list" ? (s(), m("figcaption", {
				key: 1,
				class: w(h(U).panel_bar)
			}, [
				b("span", { class: w(h(U).panel_caption) }, _(d.value), 3),
				A(M, {
					class: w(h(U).wide_only),
					icon: h(le),
					label: h(i)("create.panel_regenerate"),
					variant: "ghost",
					disabled: e.pending,
					onClick: n[3] ||= (e) => r("regenerate")
				}, null, 8, [
					"class",
					"icon",
					"label",
					"disabled"
				]),
				A(M, {
					class: w(h(U).wide_only),
					icon: h(L),
					label: h(i)("create.panel_edit_prompt"),
					variant: "ghost",
					onClick: n[4] ||= (e) => a.value = !a.value
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				b("span", { class: w(h(U).narrow_only) }, [A(V, {
					icon: h(le),
					size: "sm",
					label: h(i)("create.panel_regenerate"),
					disabled: e.pending,
					onClick: n[5] ||= (e) => r("regenerate")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]), A(V, {
					icon: h(L),
					size: "sm",
					label: h(i)("create.panel_edit_prompt"),
					pressed: a.value,
					onClick: n[6] ||= (e) => a.value = !a.value
				}, null, 8, [
					"icon",
					"label",
					"pressed"
				])], 2)
			], 2)) : g("", !0),
			a.value ? (s(), m(D, { key: 2 }, [b("label", {
				for: h(l),
				class: "tc-visually-hidden"
			}, _(h(i)("create.scene_tags_label")), 9, W), A(H, {
				id: h(l),
				"model-value": e.scene.positive_prompt,
				"onUpdate:modelValue": n[7] ||= (e) => r("update:prompt", e)
			}, null, 8, ["id", "model-value"])], 64)) : g("", !0)
		], 10, De));
	}
}), G = ["data-disabled"], K = ["value", "aria-label"], q = ["for"], je = /* @__PURE__ */ k({
	__name: "SceneCard",
	props: {
		scene: {},
		index: {},
		sizes: {}
	},
	emits: ["change", "remove"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = x(), a = C(() => {
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
		]), l = c(), d = C(() => String(n.index + 1).padStart(2, "0")), f = (e) => `${String(e.width)}x${String(e.height)}`, p = C(() => (n.sizes.some((e) => f(e) === f(n.scene.size)) ? n.sizes : [n.scene.size, ...n.sizes]).map((e) => ({
			value: f(e),
			label: `${N(e)} · ${String(e.width)} × ${String(e.height)}`
		})));
		function ee(e) {
			let t = n.sizes.find((t) => f(t) === e);
			t !== void 0 && r("change", { size: { ...t } }, !1);
		}
		function te(e) {
			let t = B[e];
			r("change", { size: { ...t } }, !1);
		}
		return (t, n) => (s(), m("article", {
			class: w(h(U).scene),
			"data-disabled": String(!e.scene.enabled)
		}, [b("div", { class: w(h(U).scene_side) }, [A(I, {
			"model-value": e.scene.enabled,
			label: h(i)("create.scene_enabled", { n: e.index + 1 }),
			"label-hidden": "",
			"onUpdate:modelValue": n[0] ||= (e) => r("change", { enabled: e }, !1)
		}, null, 8, ["model-value", "label"]), b("span", { class: w(h(U).scene_number) }, _(d.value), 3)], 2), b("div", { class: w(h(U).scene_main) }, [
			b("div", { class: w(h(U).scene_top) }, [b("textarea", {
				class: w(h(U).scene_text),
				rows: "2",
				value: e.scene.scene,
				"aria-label": h(i)("create.scene_text_label", { n: e.index + 1 }),
				onInput: n[1] ||= (e) => r("change", { scene: e.target.value }, !0)
			}, null, 42, K), A(V, {
				icon: h(fe),
				size: "sm",
				label: h(i)("create.scene_remove"),
				onClick: n[2] ||= (e) => r("remove")
			}, null, 8, ["icon", "label"])], 2),
			e.scene.excerpt === "" ? g("", !0) : (s(), m("div", {
				key: 0,
				class: w(h(U).scene_source)
			}, _(e.scene.excerpt), 3)),
			b("div", { class: w(h(U).scene_meta) }, [(s(!0), m(D, null, u(e.scene.characters, (e) => (s(), m("span", {
				key: e,
				class: w(h(U).who)
			}, _(e), 3))), 128)), e.sizes.length > 0 ? (s(), v(se, {
				key: 0,
				"model-value": f(e.scene.size),
				options: p.value,
				placeholder: h(i)("create.frame_label"),
				"aria-label": h(i)("create.frame_label"),
				"onUpdate:modelValue": ee
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])) : (s(), v(he, {
				key: 1,
				class: w(h(U).compact),
				"model-value": a.value,
				options: o.value,
				label: h(i)("create.frame_label"),
				"onUpdate:modelValue": te
			}, null, 8, [
				"class",
				"model-value",
				"options",
				"label"
			]))], 2),
			b("label", {
				for: h(l),
				class: "tc-visually-hidden"
			}, _(h(i)("create.scene_tags_label")), 9, q),
			A(H, {
				id: h(l),
				"model-value": e.scene.positive_prompt,
				"onUpdate:modelValue": n[3] ||= (e) => r("change", { positive_prompt: e }, !0)
			}, null, 8, ["id", "model-value"]),
			e.scene.last_error === null ? g("", !0) : (s(), m("p", {
				key: 1,
				class: w(h(U).scene_error),
				role: "alert"
			}, _(h(i)("create.scene_failed", { reason: e.scene.last_error })), 3))
		], 2)], 10, G));
	}
}), Me = ["aria-label"], J = [
	"data-in-range",
	"data-edge",
	"data-user",
	"aria-pressed",
	"onClick"
], Y = 40, Ne = /* @__PURE__ */ k({
	__name: "StripRange",
	props: {
		messages: {},
		from: {},
		to: {}
	},
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = x(), a = E(Y), o = C(() => n.messages.slice(-a.value)), c = C(() => n.messages.filter((e) => e.message_id >= n.from && e.message_id <= n.to).length), l = E(null);
		function d(e) {
			if (l.value === null) {
				l.value = e, r("change", e, e);
				return;
			}
			r("change", Math.min(l.value, e), Math.max(l.value, e)), l.value = null;
		}
		function f() {
			let e = n.messages.findLast((e) => !e.is_user);
			e !== void 0 && (l.value = null, r("change", e.message_id, e.message_id));
		}
		function p(e) {
			return e === n.from ? i("create.range_from") : e === n.to ? i("create.range_to") : "";
		}
		function ee(e) {
			return e.slice(0, 400).replace(/\s+/gu, " ").trim();
		}
		return (t, n) => (s(), m(D, null, [
			b("div", { class: w(h(U).range_summary) }, [
				A(ie, { icon: h(be) }, null, 8, ["icon"]),
				b("span", null, _(h(i)("create.range_summary", {
					from: `#${e.from}`,
					to: `#${e.to}`,
					n: c.value
				})), 1),
				b("span", { class: w(h(U).range_summary_action) }, [A(M, {
					label: h(i)("create.range_latest"),
					variant: "ghost",
					onClick: f
				}, null, 8, ["label"])], 2)
			], 2),
			b("p", { class: w(h(U).hint) }, _(l.value === null ? h(i)("create.range_hint_start") : h(i)("create.range_hint_end")), 3),
			b("div", {
				class: w(h(U).range),
				role: "group",
				"aria-label": h(i)("create.range_label")
			}, [o.value.length < e.messages.length ? (s(), v(M, {
				key: 0,
				label: h(i)("create.range_more"),
				variant: "ghost",
				onClick: n[0] ||= (e) => a.value += Y
			}, null, 8, ["label"])) : g("", !0), (s(!0), m(D, null, u(o.value, (t) => (s(), m("button", {
				key: t.message_id,
				type: "button",
				class: w(["tc-interactive", h(U).message]),
				"data-in-range": String(t.message_id >= e.from && t.message_id <= e.to),
				"data-edge": String(t.message_id === e.from || t.message_id === e.to),
				"data-user": String(t.is_user),
				"aria-pressed": t.message_id >= e.from && t.message_id <= e.to,
				onClick: (e) => d(t.message_id)
			}, [b("span", { class: w(h(U).bound) }, _(p(t.message_id)), 3), b("span", { class: w(h(U).message_body) }, [b("span", { class: w(h(U).message_name) }, [O(_(t.name), 1), b("span", { class: w(h(U).message_number) }, "#" + _(t.message_id), 3)], 2), b("span", { class: w(h(U).message_excerpt) }, _(ee(t.text)), 3)], 2)], 10, J))), 128))], 10, Me)
		], 64));
	}
}), Pe = e({
	name: t(),
	prompt: t(),
	negative_prompt: t(),
	center: e({
		x: a().min(0).max(1),
		y: a().min(0).max(1)
	}).optional()
}), Fe = e({
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
	character_prompts: r(Pe),
	image_ids: r(t()),
	active_image_id: t().nullable(),
	last_error: t().nullable()
}), Ie = e({
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
	scenes: r(Fe)
});
function Le(e) {
	let t = Ie.safeParse(e.payload);
	return t.success ? {
		...t.data,
		id: e.id
	} : null;
}
function Re(e) {
	let { id: t, ...n } = e;
	return Ie.parse(JSON.parse(JSON.stringify(n)));
}
//#endregion
//#region src/ui/views/create/use_creation_store.ts
var X = 600;
function ze(e) {
	let t = S(/* @__PURE__ */ new Map()), n = S(/* @__PURE__ */ new Set()), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = C(() => {
		let n = e.records().map((e) => t.get(e.id) ?? Le(e)).filter((e) => e !== null);
		for (let e of t.values()) n.some((t) => t.id === e.id) || n.push(e);
		return n.sort((e, t) => t.created_at.localeCompare(e.created_at));
	});
	function o(n) {
		let r = t.get(n);
		if (r !== void 0) return r;
		let i = e.records().find((e) => e.id === n), a = i === void 0 ? null : Le(i);
		return a === null ? null : (t.set(n, a), t.get(n) ?? null);
	}
	function s(n) {
		let a = i.get(n);
		a !== void 0 && (clearTimeout(a), i.delete(n));
		let o = (r.get(n) ?? Promise.resolve()).then(async () => {
			let r = t.get(n);
			if (r === void 0) return;
			let i = Re(r);
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
		}, X));
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
				u = await t.generate(z(s, c));
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
var Be = ["aria-label"], Ve = ["aria-current", "onClick"], He = ["id", "placeholder"], Ue = ["aria-pressed", "onClick"], We = ["aria-pressed"], Ge = ["data-narrow"], Ke = 4e3, qe = 4, Z = /* @__PURE__ */ k({
	__name: "CreateView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = x(), i = f(re, null), a = C(() => t.state.settings.settings?.illustration.strip ?? o), c = E(null);
		function y(e) {
			return e instanceof Error ? e.message : String(e);
		}
		let S = ze({
			records: () => t.state.assets.records.creation,
			save: (e) => t.controller.save_asset("creation", e),
			remove: (e) => t.controller.remove_asset("creation", e),
			strip_settings: () => a.value,
			on_save_error: (e) => {
				c.value = n("create.save_failed", { reason: y(e) });
			}
		});
		function k(e) {
			return t.state.gallery.records.find((t) => t.id === e)?.media_type ?? "image/png";
		}
		async function j(e) {
			let n = await t.controller.read_gallery_bytes(e);
			return new Blob([new Uint8Array(n)], { type: k(e) });
		}
		async function se(e) {
			let n = await t.controller.read_gallery_thumbnail(e);
			return new Blob([new Uint8Array(n)], { type: "image/webp" });
		}
		let N = E(null), P = C(() => S.list.value.find((e) => e.id === N.value) ?? null), F = E("plan"), I = E(!1);
		function pe(e) {
			return e.scenes.some((e) => e.active_image_id !== null);
		}
		function z(e) {
			c.value = null, I.value = !1, N.value = e;
			let t = e === null ? null : S.get(e);
			if (F.value = t !== null && pe(t) ? "panels" : "plan", t?.kind === "prompt") {
				let e = t.scenes[0];
				e !== void 0 && (Q.value = e.positive_prompt, it.value = e.negative_prompt, $.value = { ...e.size });
			}
		}
		let B = E("story"), ve = C(() => P.value?.kind ?? B.value), be = C(() => [
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
		]), Se = C(() => new Intl.DateTimeFormat(r.value, {
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
		function Ee(e) {
			switch (e) {
				case "story": return ae;
				case "prompt": return xe;
				case "strip": return ye;
			}
		}
		function De(e) {
			return e.scenes.filter((e) => e.active_image_id !== null).length;
		}
		function Oe(e) {
			let t = De(e);
			return `${e.kind === "strip" ? n("create.panel_count", t) : n("create.picture_count", t)} · ${Se.value.format(new Date(e.created_at))}`;
		}
		function ke(e) {
			return e.scenes.find((e) => e.active_image_id !== null)?.active_image_id ?? null;
		}
		let W = E(""), G = E([]), K = E([]), q = E(!1);
		d(async () => {
			try {
				G.value = await t.controller.list_worldbooks();
			} catch {
				G.value = [];
			}
		});
		function Me(e) {
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
		async function Pe() {
			let e = W.value.trim();
			if (!(i === null || e === "" || q.value)) {
				q.value = !0, c.value = null;
				try {
					let t = await i.plan_story(e, K.value), n = P.value;
					if (n !== null && n.kind === "story") S.edit(n.id, (n) => {
						n.story = e, n.worldbooks = [...K.value], n.display_name = J(e), n.scenes = [...t];
					});
					else {
						let n = Y("story", J(e));
						n.story = e, n.worldbooks = [...K.value], n.scenes = [...t], await S.add(n), N.value = n.id;
					}
					I.value = !1, W.value = "", K.value = [], F.value = "plan";
				} catch (e) {
					c.value = n("create.plan_failed", { reason: y(e) });
				} finally {
					q.value = !1;
				}
			}
		}
		function Fe() {
			let e = P.value;
			e !== null && (W.value = e.story, K.value = e.worldbooks.filter((e) => G.value.includes(e)), I.value = !0);
		}
		async function Ie() {
			let e = P.value;
			e !== null && (e.kind === "story" ? (W.value = e.story, K.value = [...e.worldbooks], await Pe()) : e.kind === "strip" && await rt());
		}
		let Le = C(() => ve.value === "story" && (P.value === null || I.value)), Re = E(null), X = E([]), Z = E(null), Je = E(!1), Ye = E(0), Xe = E(0), Ze = E(a.value.style), Qe = E(a.value.max_panels), $e = C(() => [{
			value: "strip",
			label: n("create.style.strip")
		}, {
			value: "default",
			label: n("create.style.default")
		}]);
		async function et() {
			if (i !== null) {
				Je.value = !0, Z.value = null;
				try {
					let { chat_id: e, messages: t } = await i.strip_messages();
					Re.value = e, X.value = t;
					let n = t.findLast((e) => !e.is_user) ?? t.at(-1);
					Ye.value = n?.message_id ?? 0, Xe.value = n?.message_id ?? 0;
				} catch {
					Z.value = n("create.strip_no_chat"), X.value = [];
				} finally {
					Je.value = !1;
				}
			}
		}
		let tt = f(ne, E(null)), nt = C(() => {
			let e = t.state.settings.settings?.illustration;
			return e === void 0 ? [] : me(e, P.value?.kind === "strip" ? tt.value : null);
		});
		p(() => [P.value === null && B.value === "strip", tt.value], ([e]) => {
			e && (Ze.value = a.value.style, Qe.value = a.value.max_panels, et());
		});
		async function rt() {
			if (i === null || q.value) return;
			let e = P.value, t = e?.from_message ?? Ye.value, r = e?.to_message ?? Xe.value;
			q.value = !0, c.value = null;
			try {
				if (e !== null) {
					let { chat_id: t } = await i.strip_messages();
					if (t !== e.chat_id) throw Error(n("create.strip_other_chat"));
				}
				let o = e === null ? Qe.value : a.value.max_panels, s = await i.plan_strip(t, r, o);
				if (e !== null) S.edit(e.id, (e) => {
					e.scenes = [...s];
				});
				else {
					let e = Y("strip", n("create.strip_title", {
						from: String(t),
						to: String(r)
					}));
					e.chat_id = Re.value, e.from_message = t, e.to_message = r, e.style = Ze.value, e.scenes = [...s], await S.add(e), N.value = e.id;
				}
				F.value = "plan";
			} catch (e) {
				c.value = n("create.plan_failed", { reason: y(e) });
			} finally {
				q.value = !1;
			}
		}
		let Q = E(""), it = E(""), $ = E({
			width: 832,
			height: 1216
		}), at = E(1);
		async function ot() {
			if (i === null || Q.value.trim() === "") return;
			c.value = null;
			let e = Array.from({ length: at.value }, () => ({
				id: crypto.randomUUID(),
				enabled: !0,
				scene: "",
				excerpt: "",
				characters: [],
				size: { ...$.value },
				positive_prompt: Q.value,
				negative_prompt: it.value,
				character_prompts: [],
				image_ids: [],
				active_image_id: null,
				last_error: null
			})), t = P.value, n;
			if (t !== null && t.kind === "prompt") n = t.id, S.edit(n, (t) => {
				t.scenes.push(...e);
			});
			else {
				let t = Y("prompt", J(Q.value));
				t.scenes = e, await S.add(t), N.value = t.id, n = t.id;
			}
			await S.generate(i, n, e.map((e) => e.id));
		}
		let st = C(() => P.value?.scenes.filter((e) => e.enabled).length ?? 0), ct = C(() => P.value?.scenes.filter((e) => e.enabled && e.active_image_id === null && !S.pending.has(e.id)) ?? []), lt = C(() => P.value?.scenes.filter((e) => e.enabled || e.active_image_id !== null || S.pending.has(e.id)) ?? []), ut = E(!1), dt = C(() => Ce(lt.value));
		function ft(e, t, n) {
			let r = P.value;
			r !== null && S.edit(r.id, (n) => {
				let r = n.scenes.find((t) => t.id === e);
				r !== void 0 && Object.assign(r, t);
			}, { debounce: n });
		}
		function pt(e) {
			let t = P.value;
			t !== null && S.edit(t.id, (t) => {
				t.scenes = t.scenes.filter((t) => t.id !== e);
			});
		}
		function mt() {
			let e = P.value;
			if (i === null || e === null) return;
			let t = ct.value.map((e) => e.id);
			F.value = "panels", S.generate(i, e.id, t);
		}
		function ht(e) {
			let t = P.value;
			i !== null && t !== null && S.generate(i, t.id, [e]);
		}
		let gt = C(() => P.value?.display_name ?? n("create.title")), _t = C(() => {
			let e = P.value;
			if (e === null) switch (B.value) {
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
		}), vt = E(!1), yt = E(!1);
		async function bt() {
			let e = P.value;
			if (e !== null) {
				yt.value = !0;
				try {
					await S.remove(e.id), vt.value = !1, z(null);
				} catch (e) {
					c.value = n("create.save_failed", { reason: y(e) });
				} finally {
					yt.value = !1;
				}
			}
		}
		return (e, t) => (s(), m(D, null, [h(i) === null ? (s(), v(oe, {
			key: 0,
			status: "empty",
			"empty-title": h(n)("create.unavailable_title"),
			"empty-message": h(n)("create.unavailable_message")
		}, null, 8, ["empty-title", "empty-message"])) : (s(), m("div", {
			key: 1,
			class: w(h(U).layout)
		}, [b("aside", {
			class: w(h(U).history),
			"aria-label": h(n)("create.history_label")
		}, [
			A(M, {
				class: w(h(U).history_new),
				icon: h(ue),
				label: h(n)("create.new"),
				onClick: t[0] ||= (e) => z(null)
			}, null, 8, [
				"class",
				"icon",
				"label"
			]),
			h(S).list.value.length > 0 ? (s(), m("div", {
				key: 0,
				class: w(h(U).history_title)
			}, _(h(n)("create.history_recent")), 3)) : g("", !0),
			(s(!0), m(D, null, u(h(S).list.value, (e) => (s(), m("button", {
				key: e.id,
				type: "button",
				class: w(["tc-interactive", h(U).history_item]),
				"aria-current": e.id === N.value ? "true" : void 0,
				onClick: (t) => z(e.id)
			}, [b("span", { class: w(h(U).history_thumb) }, [ke(e) === null ? (s(), v(ie, {
				key: 1,
				icon: Ee(e.kind)
			}, null, 8, ["icon"])) : (s(), v(Te, {
				key: 0,
				"image-id": ke(e) ?? "",
				alt: "",
				"read-image": se
			}, null, 8, ["image-id"]))], 2), b("span", { class: w(h(U).history_body) }, [b("span", { class: w(h(U).history_name) }, _(e.display_name), 3), b("span", { class: w(h(U).history_meta) }, [b("span", { class: w(h(U).kind) }, _(we(e.kind)), 3), O(" " + _(Oe(e)), 1)], 2)], 2)], 10, Ve))), 128))
		], 10, Be), b("div", { class: w(h(U).work) }, [b("div", { class: w(h(U).work_inner) }, [
			b("div", { class: w(h(U).row) }, [b("div", { class: w([h(U).work_head, h(U).spacer]) }, [b("h1", { class: w(h(U).work_title) }, _(gt.value), 3), b("p", { class: w(h(U).work_description) }, _(_t.value), 3)], 2), P.value === null ? g("", !0) : (s(), v(V, {
				key: 0,
				icon: h(fe),
				label: h(n)("create.delete"),
				onClick: t[1] ||= (e) => vt.value = !0
			}, null, 8, ["icon", "label"]))], 2),
			P.value === null ? (s(), v(he, {
				key: 0,
				modelValue: B.value,
				"onUpdate:modelValue": t[2] ||= (e) => B.value = e,
				class: w([h(U).compact, h(U).mode_switch]),
				options: be.value,
				label: h(n)("create.mode_label")
			}, null, 8, [
				"modelValue",
				"class",
				"options",
				"label"
			])) : g("", !0),
			c.value === null ? g("", !0) : (s(), m("p", {
				key: 1,
				class: w(h(U).error),
				role: "alert"
			}, _(c.value), 3)),
			Le.value ? (s(), m(D, { key: 2 }, [
				A(R, { label: h(n)("create.story_label") }, {
					default: T(({ fieldId: e }) => [l(b("textarea", {
						id: e,
						"onUpdate:modelValue": t[3] ||= (e) => W.value = e,
						class: w(h(U).text_area),
						maxlength: Ke,
						placeholder: h(n)("create.story_placeholder")
					}, null, 10, He), [[ee, W.value]]), b("div", { class: w(h(U).counter) }, _(W.value.length) + " / " + _(Ke), 3)]),
					_: 1
				}, 8, ["label"]),
				G.value.length > 0 ? (s(), v(R, {
					key: 0,
					label: h(n)("create.worldbooks_label"),
					hint: h(n)("create.worldbooks_hint")
				}, {
					default: T(() => [b("div", { class: w(h(U).row) }, [(s(!0), m(D, null, u(G.value, (e) => (s(), m("button", {
						key: e,
						type: "button",
						class: w(["tc-interactive", h(U).chip_toggle]),
						"aria-pressed": K.value.includes(e),
						onClick: (t) => Me(e)
					}, [A(ie, {
						icon: h(ae),
						size: 14
					}, null, 8, ["icon"]), O(_(e), 1)], 10, Ue))), 128))], 2)]),
					_: 1
				}, 8, ["label", "hint"])) : g("", !0),
				b("div", { class: w(h(U).row) }, [
					A(M, {
						icon: h(de),
						label: h(n)("create.plan_story"),
						variant: "primary",
						pending: q.value,
						disabled: W.value.trim() === "",
						onClick: Pe
					}, null, 8, [
						"icon",
						"label",
						"pending",
						"disabled"
					]),
					I.value ? (s(), v(M, {
						key: 0,
						label: h(n)("common.actions.cancel"),
						variant: "ghost",
						onClick: t[4] ||= (e) => I.value = !1
					}, null, 8, ["label"])) : g("", !0),
					b("span", { class: w(h(U).hint) }, _(h(n)("create.plan_story_hint", { n: 6 })), 3)
				], 2)
			], 64)) : P.value !== null && P.value.kind === "story" ? (s(), m("div", {
				key: 3,
				class: w(h(U).story_summary)
			}, [
				b("span", { class: w(h(U).story_summary_label) }, _(P.value.worldbooks.length > 0 ? h(n)("create.story_summary_books", {
					n: P.value.story.length,
					books: P.value.worldbooks.join("、")
				}) : h(n)("create.story_summary", { n: P.value.story.length })), 3),
				b("span", { class: w(h(U).story_summary_text) }, _(P.value.story), 3),
				b("span", { class: w(h(U).story_summary_action) }, [A(M, {
					icon: h(L),
					label: h(n)("create.edit_story"),
					variant: "ghost",
					onClick: Fe
				}, null, 8, ["icon", "label"])], 2)
			], 2)) : g("", !0),
			ve.value === "prompt" ? (s(), m(D, { key: 4 }, [
				A(R, {
					label: h(n)("create.positive_label"),
					hint: h(n)("create.positive_hint")
				}, {
					default: T(({ fieldId: e, describedBy: n }) => [A(H, {
						id: e,
						modelValue: Q.value,
						"onUpdate:modelValue": t[5] ||= (e) => Q.value = e,
						"described-by": n
					}, null, 8, [
						"id",
						"modelValue",
						"described-by"
					])]),
					_: 1
				}, 8, ["label", "hint"]),
				A(R, { label: h(n)("create.negative_label") }, {
					default: T(({ fieldId: e }) => [A(H, {
						id: e,
						modelValue: it.value,
						"onUpdate:modelValue": t[6] ||= (e) => it.value = e
					}, null, 8, ["id", "modelValue"])]),
					_: 1
				}, 8, ["label"]),
				A(ce, {
					modelValue: $.value,
					"onUpdate:modelValue": t[7] ||= (e) => $.value = e
				}, null, 8, ["modelValue"]),
				b("div", { class: w(h(U).grid2) }, [A(R, { label: h(n)("create.count_label") }, {
					default: T(({ fieldId: e }) => [A(ge, {
						id: e,
						"model-value": at.value,
						label: h(n)("create.count_label"),
						min: 1,
						max: qe,
						"increment-label": h(n)("common.actions.increase"),
						"decrement-label": h(n)("common.actions.decrease"),
						"onUpdate:modelValue": t[8] ||= (e) => at.value = e ?? 1
					}, null, 8, [
						"id",
						"model-value",
						"label",
						"increment-label",
						"decrement-label"
					])]),
					_: 1
				}, 8, ["label"])], 2),
				b("div", { class: w(h(U).row) }, [A(M, {
					icon: h(de),
					label: h(n)("create.generate_count", { n: at.value }),
					variant: "primary",
					disabled: Q.value.trim() === "",
					onClick: ot
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]), b("span", { class: w(h(U).hint) }, _(h(n)("create.generate_hint")), 3)], 2),
				P.value !== null && P.value.scenes.length > 0 ? (s(), m("div", {
					key: 0,
					class: w(h(U).results)
				}, [(s(!0), m(D, null, u(P.value.scenes, (e, t) => (s(), v(Ae, {
					key: e.id,
					scene: e,
					index: t,
					pending: h(S).pending.has(e.id),
					numbered: !1,
					layout: "list",
					source: null,
					"read-image": j,
					onRegenerate: (t) => ht(e.id),
					"onUpdate:prompt": (t) => ft(e.id, { positive_prompt: t }, !0)
				}, null, 8, [
					"scene",
					"index",
					"pending",
					"onRegenerate",
					"onUpdate:prompt"
				]))), 128))], 2)) : g("", !0)
			], 64)) : g("", !0),
			P.value === null && B.value === "strip" ? (s(), m(D, { key: 5 }, [Je.value || Z.value !== null ? (s(), v(oe, {
				key: 0,
				status: Je.value ? "loading" : "error",
				"min-height": "160px",
				"error-message": Z.value ?? ""
			}, null, 8, ["status", "error-message"])) : (s(), m(D, { key: 1 }, [
				A(Ne, {
					messages: X.value,
					from: Ye.value,
					to: Xe.value,
					onChange: t[9] ||= (e, t) => (Ye.value = e, Xe.value = t)
				}, null, 8, [
					"messages",
					"from",
					"to"
				]),
				b("div", { class: w(h(U).grid2) }, [A(R, { label: h(n)("create.style_label") }, {
					default: T(() => [A(he, {
						modelValue: Ze.value,
						"onUpdate:modelValue": t[10] ||= (e) => Ze.value = e,
						class: w(h(U).compact),
						options: $e.value,
						label: h(n)("create.style_label")
					}, null, 8, [
						"modelValue",
						"class",
						"options",
						"label"
					])]),
					_: 1
				}, 8, ["label"]), A(R, { label: h(n)("create.max_panels_label") }, {
					default: T(({ fieldId: e }) => [A(ge, {
						id: e,
						"model-value": Qe.value,
						label: h(n)("create.max_panels_label"),
						min: 1,
						max: 12,
						"increment-label": h(n)("common.actions.increase"),
						"decrement-label": h(n)("common.actions.decrease"),
						"onUpdate:modelValue": t[11] ||= (e) => Qe.value = e ?? a.value.max_panels
					}, null, 8, [
						"id",
						"model-value",
						"label",
						"increment-label",
						"decrement-label"
					])]),
					_: 1
				}, 8, ["label"])], 2),
				b("div", { class: w(h(U).row) }, [A(M, {
					icon: h(ye),
					label: h(n)("create.plan_strip"),
					variant: "primary",
					pending: q.value,
					disabled: X.value.length === 0,
					onClick: rt
				}, null, 8, [
					"icon",
					"label",
					"pending",
					"disabled"
				]), b("span", { class: w(h(U).hint) }, _(h(n)("create.plan_strip_hint")), 3)], 2)
			], 64))], 64)) : g("", !0),
			P.value !== null && P.value.kind !== "prompt" && F.value === "plan" && !I.value ? (s(), m("section", {
				key: 6,
				class: w(h(U).plan)
			}, [
				b("div", { class: w(h(U).plan_head) }, [b("h2", { class: w(h(U).section_title) }, _(P.value.kind === "strip" ? h(n)("create.panels_title") : h(n)("create.scenes_title")), 3), b("span", { class: w(h(U).hint) }, _(h(n)("create.scenes_selected", {
					n: st.value,
					total: P.value.scenes.length
				})), 3)], 2),
				P.value.scenes.length === 0 ? (s(), m("p", {
					key: 0,
					class: w(h(U).hint)
				}, _(h(n)("create.scenes_empty")), 3)) : g("", !0),
				(s(!0), m(D, null, u(P.value.scenes, (e, t) => (s(), v(je, {
					key: e.id,
					scene: e,
					index: t,
					sizes: nt.value,
					onChange: (t, n) => ft(e.id, t, n),
					onRemove: (t) => pt(e.id)
				}, null, 8, [
					"scene",
					"index",
					"sizes",
					"onChange",
					"onRemove"
				]))), 128)),
				b("div", { class: w(h(U).plan_foot) }, [
					A(M, {
						icon: h(le),
						label: h(n)("create.replan"),
						variant: "ghost",
						pending: q.value,
						onClick: Ie
					}, null, 8, [
						"icon",
						"label",
						"pending"
					]),
					b("span", { class: w(h(U).spacer) }, null, 2),
					pe(P.value) ? (s(), v(M, {
						key: 0,
						label: h(n)("create.show_panels"),
						variant: "secondary",
						onClick: t[12] ||= (e) => F.value = "panels"
					}, null, 8, ["label"])) : g("", !0),
					A(M, {
						label: h(n)("create.generate_count", { n: ct.value.length }),
						variant: "primary",
						disabled: ct.value.length === 0,
						onClick: mt
					}, null, 8, ["label", "disabled"])
				], 2)
			], 2)) : g("", !0),
			P.value !== null && P.value.kind !== "prompt" && F.value === "panels" ? (s(), m("div", {
				key: 7,
				class: w(h(U).strip)
			}, [b("div", { class: w(h(U).strip_toolbar) }, [
				b("span", { class: w(h(U).kind) }, _(we(P.value.kind)), 3),
				b("span", { class: w(h(U).hint) }, _(h(n)("create.panels_saved")), 3),
				b("span", { class: w(h(U).spacer) }, null, 2),
				b("button", {
					type: "button",
					class: w(["tc-interactive", h(U).chip_toggle]),
					"aria-pressed": ut.value,
					onClick: t[13] ||= (e) => ut.value = !ut.value
				}, _(h(n)("create.show_source")), 11, We),
				A(M, {
					icon: h(L),
					label: h(n)("create.edit_scenes"),
					variant: "ghost",
					onClick: t[14] ||= (e) => F.value = "plan"
				}, null, 8, ["icon", "label"])
			], 2), b("div", { class: w(h(U).page) }, [(s(!0), m(D, null, u(dt.value, (e) => (s(), m("div", {
				key: e.cells[0]?.item.id,
				class: w(h(U).page_row),
				"data-narrow": String(e.narrow)
			}, [(s(!0), m(D, null, u(e.cells, (e) => (s(), v(Ae, {
				key: e.item.id,
				style: te({ flex: `${String(e.ratio)} 1 0` }),
				scene: e.item,
				index: e.index,
				pending: h(S).pending.has(e.item.id),
				numbered: !0,
				layout: "page",
				source: ut.value && e.item.excerpt !== "" ? e.item.excerpt : null,
				"read-image": j,
				onRegenerate: (t) => ht(e.item.id),
				"onUpdate:prompt": (t) => ft(e.item.id, { positive_prompt: t }, !0)
			}, null, 8, [
				"style",
				"scene",
				"index",
				"pending",
				"source",
				"onRegenerate",
				"onUpdate:prompt"
			]))), 128))], 10, Ge))), 128))], 2)], 2)) : g("", !0)
		], 2)], 2)], 2)), A(_e, {
			open: vt.value,
			title: h(n)("create.delete_title"),
			description: h(n)("create.delete_description"),
			"confirm-label": h(n)("common.actions.delete"),
			"cancel-label": h(n)("common.actions.cancel"),
			pending: yt.value,
			"onUpdate:open": t[15] ||= (e) => vt.value = e,
			onConfirm: bt
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
export { Z as default };
