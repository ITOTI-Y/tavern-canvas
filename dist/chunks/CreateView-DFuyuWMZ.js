import { d as e, g as t, i as n, r, t as i, u as a } from "./schemas-BjkyCQYG.js";
import { n as o } from "./settings-AUN8XBLO.js";
import { A as s, G as c, H as l, I as u, K as d, P as f, T as ee, V as p, _ as m, a as te, dt as h, et as g, g as _, h as v, j as ne, lt as y, m as b, mt as x, n as S, p as C, pt as re, tt as w, u as T, v as E, x as D, y as O } from "./vue-i18n-L-BrQRnK.js";
import { t as ie } from "./portal_keys-DthxrmWp.js";
import { t as ae } from "./creation_port-CiZWBydV.js";
import { n as k, t as A } from "./AppIcon-DkyxvN8k.js";
import { n as j, t as oe } from "./StateSurface-DkfG2xGX.js";
import { t as se } from "./ImageSizeField-hfPCwmMW.js";
import { n as M, t as N } from "./components_styles-D-hVkM2e.js";
import { t as P } from "./AppCheckbox-COGvwvBT.js";
import { n as F, t as ce } from "./refresh-cw-BQBKyT1B.js";
import { n as le, t as I } from "./FieldGroup-DUIzuG3F.js";
import { t as ue } from "./sparkles-DHUWhG-4.js";
import { t as de } from "./trash-2-Dqlz-IWX.js";
import { n as L } from "./deferred_stylesheets-C5SZyo6f.js";
import { r as fe, t as R } from "./creation_planning-DMFz8H3q.js";
import { n as pe, r as me, t as he } from "./TagInput-DaW9nw0K.js";
import { t as ge } from "./IconButton-DsFRFlSI.js";
import { t as _e } from "./ConfirmDialog-B5HDtQez.js";
import { t as z } from "./ZoomableImage-DCmD7ZC5.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/book-open.js
var ve = k("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]), ye = k("layout-panel-top", [
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
]), be = k("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]), xe = k("tags", [
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
]), Se = ["src", "alt"], Ce = /* @__PURE__ */ D({
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
		}), (t, n) => i.value === null ? _("", !0) : (f(), m(T, { key: 0 }, [e.zoomable ? (f(), v(z, {
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
		}, null, 10, Se))], 64));
	}
}), we = {
	layout: "_layout_j0wq9_6",
	history: "_history_j0wq9_12",
	history_new: "_history_new_j0wq9_21",
	history_title: "_history_title_j0wq9_25",
	history_item: "_history_item_j0wq9_31",
	history_thumb: "_history_thumb_j0wq9_51",
	history_body: "_history_body_j0wq9_69",
	history_name: "_history_name_j0wq9_75",
	history_meta: "_history_meta_j0wq9_83",
	kind: "_kind_j0wq9_93",
	work: "_work_j0wq9_105",
	work_inner: "_work_inner_j0wq9_110",
	work_head: "_work_head_j0wq9_116",
	work_title: "_work_title_j0wq9_121",
	work_description: "_work_description_j0wq9_130",
	text_area: "_text_area_j0wq9_135 tc-field tc-field-multiline",
	counter: "_counter_j0wq9_140",
	row: "_row_j0wq9_146",
	hint: "_hint_j0wq9_153",
	error: "_error_j0wq9_160",
	grid2: "_grid2_j0wq9_167",
	chip_toggle: "_chip_toggle_j0wq9_173",
	story_summary: "_story_summary_j0wq9_192",
	story_summary_label: "_story_summary_label_j0wq9_203",
	story_summary_text: "_story_summary_text_j0wq9_208",
	story_summary_action: "_story_summary_action_j0wq9_219",
	plan: "_plan_j0wq9_225",
	plan_head: "_plan_head_j0wq9_230",
	section_title: "_section_title_j0wq9_237",
	scene: "_scene_j0wq9_248",
	scene_main: "_scene_main_j0wq9_258",
	scene_side: "_scene_side_j0wq9_262",
	scene_number: "_scene_number_j0wq9_270",
	scene_top: "_scene_top_j0wq9_282",
	scene_text: "_scene_text_j0wq9_288 tc-field tc-field-multiline",
	scene_source: "_scene_source_j0wq9_296",
	scene_meta: "_scene_meta_j0wq9_308",
	who: "_who_j0wq9_315",
	scene_error: "_scene_error_j0wq9_325",
	plan_foot: "_plan_foot_j0wq9_331",
	spacer: "_spacer_j0wq9_342",
	range_summary: "_range_summary_j0wq9_347",
	range_summary_action: "_range_summary_action_j0wq9_359",
	range: "_range_j0wq9_347",
	message: "_message_j0wq9_368",
	bound: "_bound_j0wq9_391",
	message_body: "_message_body_j0wq9_410",
	message_name: "_message_name_j0wq9_415",
	message_number: "_message_number_j0wq9_424",
	message_excerpt: "_message_excerpt_j0wq9_431",
	strip: "_strip_j0wq9_441",
	strip_toolbar: "_strip_toolbar_j0wq9_447",
	panel: "_panel_j0wq9_456",
	results: "_results_j0wq9_464",
	panel_frame: "_panel_frame_j0wq9_475",
	panel_image: "_panel_image_j0wq9_488",
	panel_number: "_panel_number_j0wq9_495",
	panel_state: "_panel_state_j0wq9_512",
	panel_bar: "_panel_bar_j0wq9_530",
	panel_caption: "_panel_caption_j0wq9_536",
	compact: "_compact_j0wq9_548",
	narrow_only: "_narrow_only_j0wq9_553",
	wide_only: "_wide_only_j0wq9_617",
	mode_switch: "_mode_switch_j0wq9_625"
};
//#endregion
//#region src/ui/views/create/create_styles.ts
L("create", "._layout_j0wq9_6{grid-template-columns:260px minmax(0,1fr);min-height:100%;display:grid}._history_j0wq9_12{align-self:start;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-3) var(--tc-space-4);flex-direction:column;display:flex;overflow:auto}._history_new_j0wq9_21{margin:0 var(--tc-space-1) var(--tc-space-2)}._history_title_j0wq9_25{padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._history_item_j0wq9_31{padding:var(--tc-space-2);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:40px minmax(0,1fr);align-items:center;gap:10px;display:grid}._history_item_j0wq9_31:hover{background-color:var(--tc-surface-raised)}._history_item_j0wq9_31[aria-current=true]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border)}._history_thumb_j0wq9_51{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-sunken);width:40px;height:52px;color:var(--tc-text-muted);place-items:center;display:grid;overflow:hidden}._history_thumb_j0wq9_51 img{object-fit:cover;width:100%;height:100%;display:block}._history_body_j0wq9_69{gap:var(--tc-space-0-5);min-width:0;display:grid}._history_name_j0wq9_75{font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._history_meta_j0wq9_83{gap:var(--tc-space-1-5);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);white-space:nowrap;align-items:center;display:flex;overflow:hidden}._kind_j0wq9_93{height:18px;padding:0 var(--tc-space-1-5);border-radius:var(--tc-radius-chip);background-color:var(--tc-chip-bg);color:var(--tc-text-muted);flex:none;align-items:center;font-size:11px;display:inline-flex}._work_j0wq9_105{min-width:0;padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-panel-padding)}._work_inner_j0wq9_110{gap:var(--tc-form-row-gap);max-width:760px;display:grid}._work_head_j0wq9_116{gap:var(--tc-space-1);display:grid}._work_title_j0wq9_121{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);overflow-wrap:anywhere;margin:0}._work_description_j0wq9_130{color:var(--tc-text-muted);margin:0}._text_area_j0wq9_135{min-height:168px}._counter_j0wq9_140{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-align:end}._row_j0wq9_146{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._hint_j0wq9_153{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._error_j0wq9_160{color:var(--tc-error);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._grid2_j0wq9_167{gap:var(--tc-form-row-gap);grid-template-columns:repeat(auto-fill,minmax(220px,1fr));display:grid}._chip_toggle_j0wq9_173{align-items:center;gap:var(--tc-space-1-5);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);height:32px;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);padding:0 14px;display:inline-flex}._chip_toggle_j0wq9_173[aria-pressed=true]{border-color:var(--tc-marker);background-color:var(--tc-marker);color:var(--tc-on-marker)}._story_summary_j0wq9_192{gap:var(--tc-space-1) var(--tc-space-3);padding:var(--tc-space-3) var(--tc-space-3) var(--tc-space-3) var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:minmax(0,1fr) auto;align-items:center;display:grid}._story_summary_label_j0wq9_203{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._story_summary_text_j0wq9_208{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);-webkit-line-clamp:2;-webkit-box-orient:vertical;grid-column:1;display:-webkit-box;overflow:hidden}._story_summary_action_j0wq9_219{grid-area:1/2/3}._plan_j0wq9_225{gap:var(--tc-space-3);display:grid}._plan_head_j0wq9_230{gap:var(--tc-space-1-5) var(--tc-space-3);flex-wrap:wrap;align-items:baseline;display:flex}._section_title_j0wq9_237{font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg);margin:0}._plan_head_j0wq9_230 ._hint_j0wq9_153{margin-inline-start:auto}._scene_j0wq9_248{padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:auto minmax(0,1fr);gap:14px;display:grid}._scene_j0wq9_248[data-disabled=true] ._scene_main_j0wq9_258{opacity:.55}._scene_side_j0wq9_262{padding-top:var(--tc-space-0-5);align-content:start;justify-items:center;gap:10px;display:grid}._scene_number_j0wq9_270{color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs)}._scene_main_j0wq9_258{gap:10px;min-width:0;display:grid}._scene_top_j0wq9_282{align-items:flex-start;gap:10px;display:flex}._scene_text_j0wq9_288{field-sizing:content;flex:1;min-width:0;min-height:0}._scene_source_j0wq9_296{border-inline-start:2px solid var(--tc-divider);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);-webkit-line-clamp:2;-webkit-box-orient:vertical;padding-inline-start:var(--tc-space-2);line-height:18px;display:-webkit-box;overflow:hidden}._scene_meta_j0wq9_308{gap:var(--tc-space-1-5);flex-wrap:wrap;align-items:center;display:flex}._who_j0wq9_315{border-radius:var(--tc-radius-chip);background-color:var(--tc-accent-soft);height:26px;font-size:var(--tc-font-size-xs);align-items:center;padding:0 10px;display:inline-flex}._scene_error_j0wq9_325{color:var(--tc-error);font-size:var(--tc-font-size-xs);margin:0}._plan_foot_j0wq9_331{gap:var(--tc-space-2);padding:var(--tc-space-3) 0;background-color:var(--tc-canvas);flex-wrap:wrap;align-items:center;display:flex;position:sticky;bottom:0}._spacer_j0wq9_342{flex:1}._range_summary_j0wq9_347{gap:var(--tc-space-2) var(--tc-space-4);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);flex-wrap:wrap;align-items:center;padding:6px 6px 6px 14px;display:flex}._range_summary_action_j0wq9_359{margin-inline-start:auto}._range_j0wq9_347{gap:var(--tc-space-1-5);display:grid}._message_j0wq9_368{padding:10px var(--tc-space-3);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:24px minmax(0,1fr);align-items:start;gap:10px;display:grid}._message_j0wq9_368:hover{background-color:var(--tc-surface-raised)}._message_j0wq9_368[data-in-range=true]{background-color:var(--tc-accent-soft)}._message_j0wq9_368[data-edge=true]{box-shadow:inset 0 0 0 1.5px var(--tc-accent-border)}._bound_j0wq9_391{width:22px;height:22px;margin-top:var(--tc-space-0-5);border:1.5px solid var(--tc-border-field);color:var(--tc-text-muted);border-radius:999px;place-items:center;font-size:11px;display:grid}._message_j0wq9_368[data-edge=true] ._bound_j0wq9_391{border-color:var(--tc-accent);background-color:var(--tc-accent);color:var(--tc-on-accent);font-weight:var(--tc-font-weight-semibold)}._message_body_j0wq9_410{min-width:0;display:grid}._message_name_j0wq9_415{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._message_j0wq9_368[data-user=true] ._message_name_j0wq9_415{color:var(--tc-text-muted)}._message_number_j0wq9_424{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);font-weight:var(--tc-font-weight-regular);margin-inline-start:var(--tc-space-1-5)}._message_excerpt_j0wq9_431{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._strip_j0wq9_441{justify-items:center;gap:18px;display:grid}._strip_toolbar_j0wq9_447{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;width:100%;max-width:520px;display:flex}._panel_j0wq9_456{gap:var(--tc-space-1-5);width:100%;max-width:520px;margin:0;display:grid}._results_j0wq9_464{gap:var(--tc-space-3);flex-wrap:wrap;align-items:flex-start;display:flex}._results_j0wq9_464 ._panel_j0wq9_456{max-width:220px}._panel_frame_j0wq9_475{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-sunken);position:relative;overflow:hidden}._panel_frame_j0wq9_475>button{width:100%;height:100%;display:block}._panel_image_j0wq9_488{object-fit:cover;width:100%;height:100%;display:block}._panel_number_j0wq9_495{top:var(--tc-space-2);left:var(--tc-space-2);background-color:var(--tc-media-scrim);min-width:22px;height:22px;color:var(--tc-media-ink);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);pointer-events:none;border-radius:999px;place-items:center;padding:0 7px;display:grid;position:absolute}._panel_state_j0wq9_512{place-content:center;justify-items:center;gap:var(--tc-space-2);padding:var(--tc-space-3);background-color:var(--tc-surface-raised);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);text-align:center;display:grid;position:absolute;inset:0}._panel_state_j0wq9_512[data-error=true]{color:var(--tc-error)}._panel_bar_j0wq9_530{gap:var(--tc-space-1);align-items:center;display:flex}._panel_caption_j0wq9_536{min-width:0;color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-overflow:ellipsis;white-space:nowrap;flex:1;overflow:hidden}._compact_j0wq9_548[data-layout]{justify-self:start;width:auto}._narrow_only_j0wq9_553{display:none}@container studio-workspace (width<=640px){._layout_j0wq9_6{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._history_j0wq9_12{padding:var(--tc-space-1) var(--tc-space-4) var(--tc-space-2);scrollbar-width:none;flex-direction:row;overflow-x:auto}._history_new_j0wq9_21{flex:none;margin:0}._history_title_j0wq9_25{display:none}._history_item_j0wq9_31{max-width:200px;padding:var(--tc-space-1-5) var(--tc-space-3) var(--tc-space-1-5) var(--tc-space-1-5);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:999px;flex:none;grid-template-columns:32px auto}._history_thumb_j0wq9_51{border-radius:999px;width:32px;height:32px}._history_meta_j0wq9_83{display:none}._work_j0wq9_105{padding:var(--tc-space-2) var(--tc-space-4) var(--tc-space-4)}._work_title_j0wq9_121{font-size:22px;line-height:28px}._scene_j0wq9_248{padding:var(--tc-space-3);gap:10px}._scene_source_j0wq9_296,._wide_only_j0wq9_617{display:none}._narrow_only_j0wq9_553{display:inline-flex}._mode_switch_j0wq9_625[data-layout]{justify-self:stretch;width:100%}}");
var B = we, Te = ["data-error"], Ee = ["for"], De = /* @__PURE__ */ D({
	__name: "PanelFigure",
	props: {
		scene: {},
		index: {},
		pending: { type: Boolean },
		numbered: { type: Boolean },
		readImage: { type: Function }
	},
	emits: ["regenerate", "update:prompt"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = S(), a = w(!1), o = w(!1), s = p();
		l(() => n.scene.active_image_id, () => {
			o.value = !1;
		});
		let c = C(() => `${String(n.scene.size.width)} / ${String(n.scene.size.height)}`), u = C(() => n.scene.scene || n.scene.positive_prompt);
		return (t, n) => (f(), m("figure", { class: h(y(B).panel) }, [
			b("div", {
				class: h(y(B).panel_frame),
				style: re({ aspectRatio: c.value })
			}, [e.pending ? (f(), m("div", {
				key: 0,
				class: h(y(B).panel_state)
			}, [b("span", {
				class: h(y(N).appButtonSpinner),
				"aria-hidden": "true"
			}, [O(A, { icon: y(M) }, null, 8, ["icon"])], 2), E(" " + x(y(i)("create.panel_pending")), 1)], 2)) : e.scene.active_image_id !== null && !o.value ? (f(), v(Ce, {
				key: e.scene.active_image_id,
				"image-id": e.scene.active_image_id,
				alt: u.value,
				"read-image": e.readImage,
				"image-class": y(B).panel_image,
				zoomable: "",
				onFailed: n[0] ||= (e) => o.value = !0
			}, null, 8, [
				"image-id",
				"alt",
				"read-image",
				"image-class"
			])) : (f(), m("div", {
				key: 2,
				class: h(y(B).panel_state),
				"data-error": String(e.scene.last_error !== null || o.value)
			}, x(o.value ? y(i)("create.panel_missing") : e.scene.last_error === null ? y(i)("create.panel_empty") : y(i)("create.scene_failed", { reason: e.scene.last_error })), 11, Te)), e.numbered ? (f(), m("span", {
				key: 3,
				class: h(y(B).panel_number)
			}, x(e.index + 1), 3)) : _("", !0)], 6),
			b("figcaption", { class: h(y(B).panel_bar) }, [
				b("span", { class: h(y(B).panel_caption) }, x(u.value), 3),
				O(j, {
					class: h(y(B).wide_only),
					icon: y(ce),
					label: y(i)("create.panel_regenerate"),
					variant: "ghost",
					disabled: e.pending,
					onClick: n[1] ||= (e) => r("regenerate")
				}, null, 8, [
					"class",
					"icon",
					"label",
					"disabled"
				]),
				O(j, {
					class: h(y(B).wide_only),
					icon: y(F),
					label: y(i)("create.panel_edit_prompt"),
					variant: "ghost",
					onClick: n[2] ||= (e) => a.value = !a.value
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				b("span", { class: h(y(B).narrow_only) }, [O(ge, {
					icon: y(ce),
					size: "sm",
					label: y(i)("create.panel_regenerate"),
					disabled: e.pending,
					onClick: n[3] ||= (e) => r("regenerate")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]), O(ge, {
					icon: y(F),
					size: "sm",
					label: y(i)("create.panel_edit_prompt"),
					pressed: a.value,
					onClick: n[4] ||= (e) => a.value = !a.value
				}, null, 8, [
					"icon",
					"label",
					"pressed"
				])], 2)
			], 2),
			a.value ? (f(), m(T, { key: 0 }, [b("label", {
				for: y(s),
				class: "tc-visually-hidden"
			}, x(y(i)("create.scene_tags_label")), 9, Ee), O(he, {
				id: y(s),
				"model-value": e.scene.positive_prompt,
				"onUpdate:modelValue": n[5] ||= (e) => r("update:prompt", e)
			}, null, 8, ["id", "model-value"])], 64)) : _("", !0)
		], 2));
	}
}), Oe = ["data-disabled"], ke = ["value", "aria-label"], Ae = ["for"], je = /* @__PURE__ */ D({
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
			let t = R[e];
			r("change", { size: { ...t } }, !1);
		}
		return (t, n) => (f(), m("article", {
			class: h(y(B).scene),
			"data-disabled": String(!e.scene.enabled)
		}, [b("div", { class: h(y(B).scene_side) }, [O(P, {
			"model-value": e.scene.enabled,
			label: y(i)("create.scene_enabled", { n: e.index + 1 }),
			"label-hidden": "",
			"onUpdate:modelValue": n[0] ||= (e) => r("change", { enabled: e }, !1)
		}, null, 8, ["model-value", "label"]), b("span", { class: h(y(B).scene_number) }, x(c.value), 3)], 2), b("div", { class: h(y(B).scene_main) }, [
			b("div", { class: h(y(B).scene_top) }, [b("textarea", {
				class: h(y(B).scene_text),
				rows: "2",
				value: e.scene.scene,
				"aria-label": y(i)("create.scene_text_label", { n: e.index + 1 }),
				onInput: n[1] ||= (e) => r("change", { scene: e.target.value }, !0)
			}, null, 42, ke), O(ge, {
				icon: y(de),
				size: "sm",
				label: y(i)("create.scene_remove"),
				onClick: n[2] ||= (e) => r("remove")
			}, null, 8, ["icon", "label"])], 2),
			e.scene.excerpt === "" ? _("", !0) : (f(), m("div", {
				key: 0,
				class: h(y(B).scene_source)
			}, x(e.scene.excerpt), 3)),
			b("div", { class: h(y(B).scene_meta) }, [(f(!0), m(T, null, u(e.scene.characters, (e) => (f(), m("span", {
				key: e,
				class: h(y(B).who)
			}, x(e), 3))), 128)), O(me, {
				class: h(y(B).compact),
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
			}, x(y(i)("create.scene_tags_label")), 9, Ae),
			O(he, {
				id: y(s),
				"model-value": e.scene.positive_prompt,
				"onUpdate:modelValue": n[3] ||= (e) => r("change", { positive_prompt: e }, !0)
			}, null, 8, ["id", "model-value"]),
			e.scene.last_error === null ? _("", !0) : (f(), m("p", {
				key: 1,
				class: h(y(B).scene_error),
				role: "alert"
			}, x(y(i)("create.scene_failed", { reason: e.scene.last_error })), 3))
		], 2)], 10, Oe));
	}
}), V = ["aria-label"], H = [
	"data-in-range",
	"data-edge",
	"data-user",
	"aria-pressed",
	"onClick"
], U = 40, Me = /* @__PURE__ */ D({
	__name: "StripRange",
	props: {
		messages: {},
		from: {},
		to: {}
	},
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = S(), a = w(U), o = C(() => n.messages.slice(-a.value)), s = C(() => n.messages.filter((e) => e.message_id >= n.from && e.message_id <= n.to).length), c = w(null);
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
			b("div", { class: h(y(B).range_summary) }, [
				O(A, { icon: y(be) }, null, 8, ["icon"]),
				b("span", null, x(y(i)("create.range_summary", {
					from: `#${e.from}`,
					to: `#${e.to}`,
					n: s.value
				})), 1),
				b("span", { class: h(y(B).range_summary_action) }, [O(j, {
					label: y(i)("create.range_latest"),
					variant: "ghost",
					onClick: d
				}, null, 8, ["label"])], 2)
			], 2),
			b("p", { class: h(y(B).hint) }, x(c.value === null ? y(i)("create.range_hint_start") : y(i)("create.range_hint_end")), 3),
			b("div", {
				class: h(y(B).range),
				role: "group",
				"aria-label": y(i)("create.range_label")
			}, [o.value.length < e.messages.length ? (f(), v(j, {
				key: 0,
				label: y(i)("create.range_more"),
				variant: "ghost",
				onClick: n[0] ||= (e) => a.value += U
			}, null, 8, ["label"])) : _("", !0), (f(!0), m(T, null, u(o.value, (t) => (f(), m("button", {
				key: t.message_id,
				type: "button",
				class: h(["tc-interactive", y(B).message]),
				"data-in-range": String(t.message_id >= e.from && t.message_id <= e.to),
				"data-edge": String(t.message_id === e.from || t.message_id === e.to),
				"data-user": String(t.is_user),
				"aria-pressed": t.message_id >= e.from && t.message_id <= e.to,
				onClick: (e) => l(t.message_id)
			}, [b("span", { class: h(y(B).bound) }, x(ee(t.message_id)), 3), b("span", { class: h(y(B).message_body) }, [b("span", { class: h(y(B).message_name) }, [E(x(t.name), 1), b("span", { class: h(y(B).message_number) }, "#" + x(t.message_id), 3)], 2), b("span", { class: h(y(B).message_excerpt) }, x(p(t.text)), 3)], 2)], 10, H))), 128))], 10, V)
		], 64));
	}
}), W = e({
	name: t(),
	prompt: t(),
	negative_prompt: t()
}), Ne = e({
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
	character_prompts: r(W),
	image_ids: r(t()),
	active_image_id: t().nullable(),
	last_error: t().nullable()
}), G = e({
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
	scenes: r(Ne)
});
function K(e) {
	let t = G.safeParse(e.payload);
	return t.success ? {
		...t.data,
		id: e.id
	} : null;
}
function Pe(e) {
	let { id: t, ...n } = e;
	return G.parse(JSON.parse(JSON.stringify(n)));
}
//#endregion
//#region src/ui/views/create/use_creation_store.ts
var Fe = 600;
function Ie(e) {
	let t = g(/* @__PURE__ */ new Map()), n = g(/* @__PURE__ */ new Set()), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = C(() => {
		let n = e.records().map((e) => t.get(e.id) ?? K(e)).filter((e) => e !== null);
		for (let e of t.values()) n.some((t) => t.id === e.id) || n.push(e);
		return n.sort((e, t) => t.created_at.localeCompare(e.created_at));
	});
	function o(n) {
		let r = t.get(n);
		if (r !== void 0) return r;
		let i = e.records().find((e) => e.id === n), a = i === void 0 ? null : K(i);
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
				u = await t.generate(fe(s, c));
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
var Le = ["aria-label"], Re = ["aria-current", "onClick"], ze = ["id", "placeholder"], Be = ["aria-pressed", "onClick"], Ve = 4e3, He = 4, Ue = /* @__PURE__ */ D({
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
		function re(e) {
			return t.state.gallery.records.find((t) => t.id === e)?.media_type ?? "image/png";
		}
		async function D(e) {
			let n = await t.controller.read_gallery_bytes(e);
			return new Blob([new Uint8Array(n)], { type: re(e) });
		}
		async function k(e) {
			let n = await t.controller.read_gallery_thumbnail(e);
			return new Blob([new Uint8Array(n)], { type: "image/webp" });
		}
		let M = w(null), N = C(() => g.list.value.find((e) => e.id === M.value) ?? null), P = w("plan"), L = w(!1);
		function fe(e) {
			return e.scenes.some((e) => e.active_image_id !== null);
		}
		function R(e) {
			s.value = null, L.value = !1, M.value = e;
			let t = e === null ? null : g.get(e);
			if (P.value = t !== null && fe(t) ? "panels" : "plan", t?.kind === "prompt") {
				let e = t.scenes[0];
				e !== void 0 && ($.value = e.positive_prompt, Ze.value = e.negative_prompt, Qe.value = { ...e.size });
			}
		}
		let z = w("story"), be = C(() => N.value?.kind ?? z.value), Se = C(() => [
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
		]), we = C(() => new Intl.DateTimeFormat(r.value, {
			month: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}));
		function Te(e) {
			switch (e) {
				case "story": return n("create.mode.story");
				case "prompt": return n("create.mode.prompt");
				case "strip": return n("create.mode.strip");
			}
		}
		function Ee(e) {
			switch (e) {
				case "story": return ve;
				case "prompt": return xe;
				case "strip": return ye;
			}
		}
		function Oe(e) {
			return e.scenes.filter((e) => e.active_image_id !== null).length;
		}
		function ke(e) {
			let t = Oe(e);
			return `${e.kind === "strip" ? n("create.panel_count", t) : n("create.picture_count", t)} · ${we.value.format(new Date(e.created_at))}`;
		}
		function Ae(e) {
			return e.scenes.find((e) => e.active_image_id !== null)?.active_image_id ?? null;
		}
		let V = w(""), H = w([]), U = w([]), W = w(!1);
		ne(async () => {
			try {
				H.value = await t.controller.list_worldbooks();
			} catch {
				H.value = [];
			}
		});
		function Ne(e) {
			U.value = U.value.includes(e) ? U.value.filter((t) => t !== e) : [...U.value, e];
		}
		function G(e) {
			let t = e.trim().split(/\r?\n/u)[0]?.trim() ?? "";
			return t.length > 24 ? `${t.slice(0, 24)}…` : t;
		}
		function K(e, t) {
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
			let e = V.value.trim();
			if (!(i === null || e === "" || W.value)) {
				W.value = !0, s.value = null;
				try {
					let t = await i.plan_story(e, U.value), n = N.value;
					if (n !== null && n.kind === "story") g.edit(n.id, (n) => {
						n.story = e, n.worldbooks = [...U.value], n.display_name = G(e), n.scenes = [...t];
					});
					else {
						let n = K("story", G(e));
						n.story = e, n.worldbooks = [...U.value], n.scenes = [...t], await g.add(n), M.value = n.id;
					}
					L.value = !1, V.value = "", U.value = [], P.value = "plan";
				} catch (e) {
					s.value = n("create.plan_failed", { reason: p(e) });
				} finally {
					W.value = !1;
				}
			}
		}
		function Fe() {
			let e = N.value;
			e !== null && (V.value = e.story, U.value = e.worldbooks.filter((e) => H.value.includes(e)), L.value = !0);
		}
		async function Ue() {
			let e = N.value;
			e !== null && (e.kind === "story" ? (V.value = e.story, U.value = [...e.worldbooks], await Pe()) : e.kind === "strip" && await Xe());
		}
		let We = C(() => be.value === "story" && (N.value === null || L.value)), Ge = w(null), q = w([]), J = w(null), Y = w(!1), X = w(0), Z = w(0), Q = w(a.value.style), Ke = w(a.value.max_panels), qe = C(() => [{
			value: "strip",
			label: n("create.style.strip")
		}, {
			value: "default",
			label: n("create.style.default")
		}]);
		async function Je() {
			if (i !== null) {
				Y.value = !0, J.value = null;
				try {
					let { chat_id: e, messages: t } = await i.strip_messages();
					Ge.value = e, q.value = t;
					let n = t.findLast((e) => !e.is_user) ?? t.at(-1);
					X.value = n?.message_id ?? 0, Z.value = n?.message_id ?? 0;
				} catch {
					J.value = n("create.strip_no_chat"), q.value = [];
				} finally {
					Y.value = !1;
				}
			}
		}
		let Ye = ee(ie, w(null));
		l(() => [N.value === null && z.value === "strip", Ye.value], ([e]) => {
			e && (Q.value = a.value.style, Ke.value = a.value.max_panels, Je());
		});
		async function Xe() {
			if (i === null || W.value) return;
			let e = N.value, t = e?.from_message ?? X.value, r = e?.to_message ?? Z.value;
			W.value = !0, s.value = null;
			try {
				if (e !== null) {
					let { chat_id: t } = await i.strip_messages();
					if (t !== e.chat_id) throw Error(n("create.strip_other_chat"));
				}
				let o = e === null ? Ke.value : a.value.max_panels, s = await i.plan_strip(t, r, o);
				if (e !== null) g.edit(e.id, (e) => {
					e.scenes = [...s];
				});
				else {
					let e = K("strip", n("create.strip_title", {
						from: String(t),
						to: String(r)
					}));
					e.chat_id = Ge.value, e.from_message = t, e.to_message = r, e.style = Q.value, e.scenes = [...s], await g.add(e), M.value = e.id;
				}
				P.value = "plan";
			} catch (e) {
				s.value = n("create.plan_failed", { reason: p(e) });
			} finally {
				W.value = !1;
			}
		}
		let $ = w(""), Ze = w(""), Qe = w({
			width: 832,
			height: 1216
		}), $e = w(1);
		async function et() {
			if (i === null || $.value.trim() === "") return;
			s.value = null;
			let e = Array.from({ length: $e.value }, () => ({
				id: crypto.randomUUID(),
				enabled: !0,
				scene: "",
				excerpt: "",
				characters: [],
				size: { ...Qe.value },
				positive_prompt: $.value,
				negative_prompt: Ze.value,
				character_prompts: [],
				image_ids: [],
				active_image_id: null,
				last_error: null
			})), t = N.value, n;
			if (t !== null && t.kind === "prompt") n = t.id, g.edit(n, (t) => {
				t.scenes.push(...e);
			});
			else {
				let t = K("prompt", G($.value));
				t.scenes = e, await g.add(t), M.value = t.id, n = t.id;
			}
			await g.generate(i, n, e.map((e) => e.id));
		}
		let tt = C(() => N.value?.scenes.filter((e) => e.enabled).length ?? 0), nt = C(() => N.value?.scenes.filter((e) => e.enabled && e.active_image_id === null && !g.pending.has(e.id)) ?? []), rt = C(() => N.value?.scenes.filter((e) => e.enabled || e.active_image_id !== null || g.pending.has(e.id)) ?? []);
		function it(e, t, n) {
			let r = N.value;
			r !== null && g.edit(r.id, (n) => {
				let r = n.scenes.find((t) => t.id === e);
				r !== void 0 && Object.assign(r, t);
			}, { debounce: n });
		}
		function at(e) {
			let t = N.value;
			t !== null && g.edit(t.id, (t) => {
				t.scenes = t.scenes.filter((t) => t.id !== e);
			});
		}
		function ot() {
			let e = N.value;
			if (i === null || e === null) return;
			let t = nt.value.map((e) => e.id);
			P.value = "panels", g.generate(i, e.id, t);
		}
		function st(e) {
			let t = N.value;
			i !== null && t !== null && g.generate(i, t.id, [e]);
		}
		let ct = C(() => N.value?.display_name ?? n("create.title")), lt = C(() => {
			let e = N.value;
			if (e === null) switch (z.value) {
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
		}), ut = w(!1), dt = w(!1);
		async function ft() {
			let e = N.value;
			if (e !== null) {
				dt.value = !0;
				try {
					await g.remove(e.id), ut.value = !1, R(null);
				} catch (e) {
					s.value = n("create.save_failed", { reason: p(e) });
				} finally {
					dt.value = !1;
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
			class: h(y(B).layout)
		}, [b("aside", {
			class: h(y(B).history),
			"aria-label": y(n)("create.history_label")
		}, [
			O(j, {
				class: h(y(B).history_new),
				icon: y(le),
				label: y(n)("create.new"),
				onClick: t[0] ||= (e) => R(null)
			}, null, 8, [
				"class",
				"icon",
				"label"
			]),
			y(g).list.value.length > 0 ? (f(), m("div", {
				key: 0,
				class: h(y(B).history_title)
			}, x(y(n)("create.history_recent")), 3)) : _("", !0),
			(f(!0), m(T, null, u(y(g).list.value, (e) => (f(), m("button", {
				key: e.id,
				type: "button",
				class: h(["tc-interactive", y(B).history_item]),
				"aria-current": e.id === M.value ? "true" : void 0,
				onClick: (t) => R(e.id)
			}, [b("span", { class: h(y(B).history_thumb) }, [Ae(e) === null ? (f(), v(A, {
				key: 1,
				icon: Ee(e.kind)
			}, null, 8, ["icon"])) : (f(), v(Ce, {
				key: 0,
				"image-id": Ae(e) ?? "",
				alt: "",
				"read-image": k
			}, null, 8, ["image-id"]))], 2), b("span", { class: h(y(B).history_body) }, [b("span", { class: h(y(B).history_name) }, x(e.display_name), 3), b("span", { class: h(y(B).history_meta) }, [b("span", { class: h(y(B).kind) }, x(Te(e.kind)), 3), E(" " + x(ke(e)), 1)], 2)], 2)], 10, Re))), 128))
		], 10, Le), b("div", { class: h(y(B).work) }, [b("div", { class: h(y(B).work_inner) }, [
			b("div", { class: h(y(B).row) }, [b("div", { class: h([y(B).work_head, y(B).spacer]) }, [b("h1", { class: h(y(B).work_title) }, x(ct.value), 3), b("p", { class: h(y(B).work_description) }, x(lt.value), 3)], 2), N.value === null ? _("", !0) : (f(), v(ge, {
				key: 0,
				icon: y(de),
				label: y(n)("create.delete"),
				onClick: t[1] ||= (e) => ut.value = !0
			}, null, 8, ["icon", "label"]))], 2),
			N.value === null ? (f(), v(me, {
				key: 0,
				modelValue: z.value,
				"onUpdate:modelValue": t[2] ||= (e) => z.value = e,
				class: h([y(B).compact, y(B).mode_switch]),
				options: Se.value,
				label: y(n)("create.mode_label")
			}, null, 8, [
				"modelValue",
				"class",
				"options",
				"label"
			])) : _("", !0),
			s.value === null ? _("", !0) : (f(), m("p", {
				key: 1,
				class: h(y(B).error),
				role: "alert"
			}, x(s.value), 3)),
			We.value ? (f(), m(T, { key: 2 }, [
				O(I, { label: y(n)("create.story_label") }, {
					default: c(({ fieldId: e }) => [d(b("textarea", {
						id: e,
						"onUpdate:modelValue": t[3] ||= (e) => V.value = e,
						class: h(y(B).text_area),
						maxlength: Ve,
						placeholder: y(n)("create.story_placeholder")
					}, null, 10, ze), [[te, V.value]]), b("div", { class: h(y(B).counter) }, x(V.value.length) + " / " + x(Ve), 3)]),
					_: 1
				}, 8, ["label"]),
				H.value.length > 0 ? (f(), v(I, {
					key: 0,
					label: y(n)("create.worldbooks_label"),
					hint: y(n)("create.worldbooks_hint")
				}, {
					default: c(() => [b("div", { class: h(y(B).row) }, [(f(!0), m(T, null, u(H.value, (e) => (f(), m("button", {
						key: e,
						type: "button",
						class: h(["tc-interactive", y(B).chip_toggle]),
						"aria-pressed": U.value.includes(e),
						onClick: (t) => Ne(e)
					}, [O(A, {
						icon: y(ve),
						size: 14
					}, null, 8, ["icon"]), E(x(e), 1)], 10, Be))), 128))], 2)]),
					_: 1
				}, 8, ["label", "hint"])) : _("", !0),
				b("div", { class: h(y(B).row) }, [
					O(j, {
						icon: y(ue),
						label: y(n)("create.plan_story"),
						variant: "primary",
						pending: W.value,
						disabled: V.value.trim() === "",
						onClick: Pe
					}, null, 8, [
						"icon",
						"label",
						"pending",
						"disabled"
					]),
					L.value ? (f(), v(j, {
						key: 0,
						label: y(n)("common.actions.cancel"),
						variant: "ghost",
						onClick: t[4] ||= (e) => L.value = !1
					}, null, 8, ["label"])) : _("", !0),
					b("span", { class: h(y(B).hint) }, x(y(n)("create.plan_story_hint", { n: 6 })), 3)
				], 2)
			], 64)) : N.value !== null && N.value.kind === "story" ? (f(), m("div", {
				key: 3,
				class: h(y(B).story_summary)
			}, [
				b("span", { class: h(y(B).story_summary_label) }, x(N.value.worldbooks.length > 0 ? y(n)("create.story_summary_books", {
					n: N.value.story.length,
					books: N.value.worldbooks.join("、")
				}) : y(n)("create.story_summary", { n: N.value.story.length })), 3),
				b("span", { class: h(y(B).story_summary_text) }, x(N.value.story), 3),
				b("span", { class: h(y(B).story_summary_action) }, [O(j, {
					icon: y(F),
					label: y(n)("create.edit_story"),
					variant: "ghost",
					onClick: Fe
				}, null, 8, ["icon", "label"])], 2)
			], 2)) : _("", !0),
			be.value === "prompt" ? (f(), m(T, { key: 4 }, [
				O(I, {
					label: y(n)("create.positive_label"),
					hint: y(n)("create.positive_hint")
				}, {
					default: c(({ fieldId: e, describedBy: n }) => [O(he, {
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
					default: c(({ fieldId: e }) => [O(he, {
						id: e,
						modelValue: Ze.value,
						"onUpdate:modelValue": t[6] ||= (e) => Ze.value = e
					}, null, 8, ["id", "modelValue"])]),
					_: 1
				}, 8, ["label"]),
				O(se, {
					modelValue: Qe.value,
					"onUpdate:modelValue": t[7] ||= (e) => Qe.value = e
				}, null, 8, ["modelValue"]),
				b("div", { class: h(y(B).grid2) }, [O(I, { label: y(n)("create.count_label") }, {
					default: c(({ fieldId: e }) => [O(pe, {
						id: e,
						"model-value": $e.value,
						label: y(n)("create.count_label"),
						min: 1,
						max: He,
						"increment-label": y(n)("common.actions.increase"),
						"decrement-label": y(n)("common.actions.decrease"),
						"onUpdate:modelValue": t[8] ||= (e) => $e.value = e ?? 1
					}, null, 8, [
						"id",
						"model-value",
						"label",
						"increment-label",
						"decrement-label"
					])]),
					_: 1
				}, 8, ["label"])], 2),
				b("div", { class: h(y(B).row) }, [O(j, {
					icon: y(ue),
					label: y(n)("create.generate_count", { n: $e.value }),
					variant: "primary",
					disabled: $.value.trim() === "",
					onClick: et
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]), b("span", { class: h(y(B).hint) }, x(y(n)("create.generate_hint")), 3)], 2),
				N.value !== null && N.value.scenes.length > 0 ? (f(), m("div", {
					key: 0,
					class: h(y(B).results)
				}, [(f(!0), m(T, null, u(N.value.scenes, (e, t) => (f(), v(De, {
					key: e.id,
					scene: e,
					index: t,
					pending: y(g).pending.has(e.id),
					numbered: !1,
					"read-image": D,
					onRegenerate: (t) => st(e.id),
					"onUpdate:prompt": (t) => it(e.id, { positive_prompt: t }, !0)
				}, null, 8, [
					"scene",
					"index",
					"pending",
					"onRegenerate",
					"onUpdate:prompt"
				]))), 128))], 2)) : _("", !0)
			], 64)) : _("", !0),
			N.value === null && z.value === "strip" ? (f(), m(T, { key: 5 }, [Y.value || J.value !== null ? (f(), v(oe, {
				key: 0,
				status: Y.value ? "loading" : "error",
				"min-height": "160px",
				"error-message": J.value ?? ""
			}, null, 8, ["status", "error-message"])) : (f(), m(T, { key: 1 }, [
				O(Me, {
					messages: q.value,
					from: X.value,
					to: Z.value,
					onChange: t[9] ||= (e, t) => (X.value = e, Z.value = t)
				}, null, 8, [
					"messages",
					"from",
					"to"
				]),
				b("div", { class: h(y(B).grid2) }, [O(I, { label: y(n)("create.style_label") }, {
					default: c(() => [O(me, {
						modelValue: Q.value,
						"onUpdate:modelValue": t[10] ||= (e) => Q.value = e,
						class: h(y(B).compact),
						options: qe.value,
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
						"model-value": Ke.value,
						label: y(n)("create.max_panels_label"),
						min: 1,
						max: 12,
						"increment-label": y(n)("common.actions.increase"),
						"decrement-label": y(n)("common.actions.decrease"),
						"onUpdate:modelValue": t[11] ||= (e) => Ke.value = e ?? a.value.max_panels
					}, null, 8, [
						"id",
						"model-value",
						"label",
						"increment-label",
						"decrement-label"
					])]),
					_: 1
				}, 8, ["label"])], 2),
				b("div", { class: h(y(B).row) }, [O(j, {
					icon: y(ye),
					label: y(n)("create.plan_strip"),
					variant: "primary",
					pending: W.value,
					disabled: q.value.length === 0,
					onClick: Xe
				}, null, 8, [
					"icon",
					"label",
					"pending",
					"disabled"
				]), b("span", { class: h(y(B).hint) }, x(y(n)("create.plan_strip_hint")), 3)], 2)
			], 64))], 64)) : _("", !0),
			N.value !== null && N.value.kind !== "prompt" && P.value === "plan" && !L.value ? (f(), m("section", {
				key: 6,
				class: h(y(B).plan)
			}, [
				b("div", { class: h(y(B).plan_head) }, [b("h2", { class: h(y(B).section_title) }, x(N.value.kind === "strip" ? y(n)("create.panels_title") : y(n)("create.scenes_title")), 3), b("span", { class: h(y(B).hint) }, x(y(n)("create.scenes_selected", {
					n: tt.value,
					total: N.value.scenes.length
				})), 3)], 2),
				N.value.scenes.length === 0 ? (f(), m("p", {
					key: 0,
					class: h(y(B).hint)
				}, x(y(n)("create.scenes_empty")), 3)) : _("", !0),
				(f(!0), m(T, null, u(N.value.scenes, (e, t) => (f(), v(je, {
					key: e.id,
					scene: e,
					index: t,
					onChange: (t, n) => it(e.id, t, n),
					onRemove: (t) => at(e.id)
				}, null, 8, [
					"scene",
					"index",
					"onChange",
					"onRemove"
				]))), 128)),
				b("div", { class: h(y(B).plan_foot) }, [
					O(j, {
						icon: y(ce),
						label: y(n)("create.replan"),
						variant: "ghost",
						pending: W.value,
						onClick: Ue
					}, null, 8, [
						"icon",
						"label",
						"pending"
					]),
					b("span", { class: h(y(B).spacer) }, null, 2),
					fe(N.value) ? (f(), v(j, {
						key: 0,
						label: y(n)("create.show_panels"),
						variant: "secondary",
						onClick: t[12] ||= (e) => P.value = "panels"
					}, null, 8, ["label"])) : _("", !0),
					O(j, {
						label: y(n)("create.generate_count", { n: nt.value.length }),
						variant: "primary",
						disabled: nt.value.length === 0,
						onClick: ot
					}, null, 8, ["label", "disabled"])
				], 2)
			], 2)) : _("", !0),
			N.value !== null && N.value.kind !== "prompt" && P.value === "panels" ? (f(), m("div", {
				key: 7,
				class: h(y(B).strip)
			}, [b("div", { class: h(y(B).strip_toolbar) }, [
				b("span", { class: h(y(B).kind) }, x(Te(N.value.kind)), 3),
				b("span", { class: h(y(B).hint) }, x(y(n)("create.panels_saved")), 3),
				b("span", { class: h(y(B).spacer) }, null, 2),
				O(j, {
					icon: y(F),
					label: y(n)("create.edit_scenes"),
					variant: "ghost",
					onClick: t[13] ||= (e) => P.value = "plan"
				}, null, 8, ["icon", "label"])
			], 2), (f(!0), m(T, null, u(rt.value, (e, t) => (f(), v(De, {
				key: e.id,
				scene: e,
				index: t,
				pending: y(g).pending.has(e.id),
				numbered: !0,
				"read-image": D,
				onRegenerate: (t) => st(e.id),
				"onUpdate:prompt": (t) => it(e.id, { positive_prompt: t }, !0)
			}, null, 8, [
				"scene",
				"index",
				"pending",
				"onRegenerate",
				"onUpdate:prompt"
			]))), 128))], 2)) : _("", !0)
		], 2)], 2)], 2)), O(_e, {
			open: ut.value,
			title: y(n)("create.delete_title"),
			description: y(n)("create.delete_description"),
			"confirm-label": y(n)("common.actions.delete"),
			"cancel-label": y(n)("common.actions.cancel"),
			pending: dt.value,
			"onUpdate:open": t[14] ||= (e) => ut.value = e,
			onConfirm: ft
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
export { Ue as default };
