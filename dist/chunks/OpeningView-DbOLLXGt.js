import { c as e, d as t, g as n, i as r, o as i, p as a, r as o, t as s, u as c, y as l } from "./schemas-BjkyCQYG.js";
import { D as u, F as d, J as f, L as p, M as m, O as h, T as g, U as _, W as v, _ as y, a as b, at as x, dt as S, g as C, gt as w, h as T, m as E, n as D, nt as O, p as k, pt as A, q as j, rt as M, u as N, v as P, x as F, y as I } from "./vue-i18n-XoxYzLIP.js";
import { t as ee } from "./opening_port-CFwXS5qA.js";
import { n as L, t as R } from "./AppIcon-DD754F_c.js";
import { t as te } from "./book-open-BFHVGETM.js";
import { n as z, r as ne, t as B } from "./StateSurface-C9eJEtTP.js";
import { t as re } from "./AppSelect-DKz1dWBv.js";
import { n as ie, t as ae } from "./download-Dg_p_zFU.js";
import { t as V } from "./AppCheckbox-mwSAcdjr.js";
import { n as oe, t as se } from "./refresh-cw-BPQB33rx.js";
import { n as H, t as U } from "./FieldGroup-D8VsaFMT.js";
import { t as ce } from "./sparkles-DIwEk888.js";
import { t as le } from "./trash-2-Cl_9_CUX.js";
import { n as ue } from "./deferred_stylesheets-DhfsdqPo.js";
import { t as W } from "./analysis_error-a25bWfWj.js";
import { t as de } from "./model_json-B2EVqBvs.js";
import { n as fe, t as pe } from "./NumberStepper-BUxNPDyt.js";
import { t as G } from "./IconButton-CPI-A0bT.js";
import { t as me } from "./ConfirmDialog-BMpZdMGH.js";
import { t as he } from "./AppSwitch-CRj_joeq.js";
import { t as ge } from "./AppDialog-luZAyPaX.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/arrow-down.js
var _e = L("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]), K = L("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), ve = L("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), ye = L("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]), be = L("chevrons-right", [["path", {
	d: "m6 17 5-5-5-5",
	key: "xnjwq"
}], ["path", {
	d: "m13 17 5-5-5-5",
	key: "17xmmf"
}]]), xe = L("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]), Se = L("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]), Ce = L("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]), we = t({
	id: n().min(1),
	name: n().max(40),
	instruction: n().max(2e3),
	max_rounds: c().int().min(0).max(3),
	output: s(["entries", "message"])
}), q = t({
	label: n().trim().min(1).max(80),
	detail: n().max(240)
}), Te = t({
	text: n().trim().min(1).max(240),
	why: n().max(240),
	multiple: r(),
	options: o(q).min(2).max(5)
}), J = t({
	question: Te,
	selected: o(n()),
	other: n()
}), Y = t({
	id: n().min(1),
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: o(n().trim().min(1).max(80)).max(12),
	content: n().max(8e3)
}), Ee = t({
	speaker: n().trim().min(1).max(80),
	text: n().min(1).max(2e4)
}), De = t({
	status: s([
		"pending",
		"asking",
		"done",
		"stale"
	]),
	answers: o(J),
	question: Te.nullable(),
	entries: o(Y),
	message: Ee.nullable()
}), Oe = i("kind", [
	t({ kind: e("analysis") }),
	t({ kind: e("current") }),
	t({
		kind: e("proxy_preset"),
		proxy_preset: n().min(1)
	})
]), ke = t({
	name: n(),
	description: n(),
	personality: n(),
	scenario: n(),
	first_message: n()
}), Ae = t({
	kind: e("draft"),
	display_name: n(),
	created_at: n(),
	description: n().max(4e3),
	template_name: n(),
	steps: o(we).min(1).max(12),
	states: o(De),
	current: c().int().min(0),
	started: r(),
	connection: Oe,
	preset_name: n().min(1),
	worldbooks: o(n()).max(20),
	card: ke.nullable().default(null),
	use_greeting: r().default(!1)
}), je = t({
	kind: e("template"),
	display_name: n().max(60),
	created_at: n(),
	steps: o(we).min(1).max(12)
}), Me = "builtin-default", Ne = [
	"genre",
	"world",
	"cast",
	"rules",
	"opening"
];
function Pe(e, t) {
	let n = {
		genre: 2,
		world: 3,
		cast: 3,
		rules: 2,
		opening: 1
	};
	return {
		id: Me,
		builtin: !0,
		kind: "template",
		display_name: t,
		created_at: "1970-01-01T00:00:00.000Z",
		steps: Ne.map((t) => ({
			id: t,
			...e(t),
			max_rounds: n[t],
			output: t === "opening" ? "message" : "entries"
		}))
	};
}
function Fe() {
	return {
		status: "pending",
		answers: [],
		question: null,
		entries: [],
		message: null
	};
}
function Ie(e, t) {
	e.states.forEach((e, n) => {
		n > t && (e.status === "done" || e.status === "stale") && (e.status = "stale");
	});
}
function X(e) {
	let t = Ae.safeParse(e.payload);
	if (!t.success) return null;
	let n = t.data;
	for (; n.states.length < n.steps.length;) n.states.push(Fe());
	return n.states.length = n.steps.length, {
		...n,
		current: Math.min(n.current, n.steps.length - 1),
		id: e.id
	};
}
function Le(e) {
	let t = je.safeParse(e.payload);
	return t.success ? {
		...t.data,
		id: e.id,
		builtin: !1
	} : null;
}
function Re(e) {
	return JSON.parse(JSON.stringify(e));
}
var ze = {
	layout: "_layout_g6bg9_5",
	aside: "_aside_g6bg9_11",
	aside_new: "_aside_new_g6bg9_20",
	aside_title: "_aside_title_g6bg9_24",
	item: "_item_g6bg9_30",
	item_name: "_item_name_g6bg9_48",
	item_meta: "_item_meta_g6bg9_56",
	dots: "_dots_g6bg9_61",
	dot: "_dot_g6bg9_61",
	columns: "_columns_g6bg9_86",
	work: "_work_g6bg9_92",
	work_inner: "_work_inner_g6bg9_97",
	topline: "_topline_g6bg9_107",
	spacer: "_spacer_g6bg9_114",
	compact: "_compact_g6bg9_118",
	work_head: "_work_head_g6bg9_123",
	work_title: "_work_title_g6bg9_128",
	work_description: "_work_description_g6bg9_137",
	hint: "_hint_g6bg9_138",
	error: "_error_g6bg9_145",
	row: "_row_g6bg9_153",
	text_area: "_text_area_g6bg9_160 tc-field tc-field-multiline",
	text_area_small: "_text_area_small_g6bg9_165 tc-field tc-field-multiline",
	input: "_input_g6bg9_170 tc-field",
	counter: "_counter_g6bg9_174",
	grid3: "_grid3_g6bg9_180",
	chip_toggle: "_chip_toggle_g6bg9_186",
	steps: "_steps_g6bg9_206",
	step: "_step_g6bg9_206",
	step_number: "_step_number_g6bg9_230",
	step_tag: "_step_tag_g6bg9_269",
	banner: "_banner_g6bg9_275",
	answered: "_answered_g6bg9_293",
	answered_question: "_answered_question_g6bg9_305",
	answered_answer: "_answered_answer_g6bg9_309",
	ask: "_ask_g6bg9_319",
	ask_head: "_ask_head_g6bg9_330",
	ask_title: "_ask_title_g6bg9_337",
	badge: "_badge_g6bg9_344",
	options: "_options_g6bg9_355",
	option: "_option_g6bg9_355",
	option_mark: "_option_mark_g6bg9_378",
	option_label: "_option_label_g6bg9_400",
	option_detail: "_option_detail_g6bg9_404",
	entries: "_entries_g6bg9_411",
	entry: "_entry_g6bg9_416",
	entry_head: "_entry_head_g6bg9_425",
	entry_title: "_entry_title_g6bg9_432",
	entry_content: "_entry_content_g6bg9_438",
	pill: "_pill_g6bg9_446",
	keys: "_keys_g6bg9_475",
	key: "_key_g6bg9_475",
	editor: "_editor_g6bg9_493",
	foot: "_foot_g6bg9_502",
	bubble: "_bubble_g6bg9_514",
	bubble_name: "_bubble_name_g6bg9_523",
	bubble_text: "_bubble_text_g6bg9_528",
	outputs: "_outputs_g6bg9_535",
	output: "_output_g6bg9_535",
	output_title: "_output_title_g6bg9_551",
	known: "_known_g6bg9_560",
	known_block: "_known_block_g6bg9_568",
	known_title: "_known_title_g6bg9_573",
	known_line: "_known_line_g6bg9_579",
	known_toggle: "_known_toggle_g6bg9_591",
	table: "_table_g6bg9_596",
	table_row: "_table_row_g6bg9_601",
	table_name: "_table_name_g6bg9_617",
	preview: "_preview_g6bg9_624",
	order: "_order_g6bg9_633",
	write_list: "_write_list_g6bg9_641",
	write_row: "_write_row_g6bg9_648",
	diff: "_diff_g6bg9_664",
	template_step: "_template_step_g6bg9_681",
	template_number: "_template_number_g6bg9_692",
	template_fields: "_template_fields_g6bg9_704",
	template_side: "_template_side_g6bg9_710",
	step_label: "_step_label_g6bg9_769"
};
//#endregion
//#region src/ui/views/opening/opening_styles.ts
ue("opening", "._layout_g6bg9_5{grid-template-columns:248px minmax(0,1fr);min-height:100%;display:grid}._aside_g6bg9_11{align-self:start;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-3) var(--tc-space-4);flex-direction:column;display:flex;overflow:auto}._aside_new_g6bg9_20{margin:0 var(--tc-space-1) var(--tc-space-2)}._aside_title_g6bg9_24{padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._item_g6bg9_30{color:var(--tc-text);text-align:start;border-radius:14px;gap:6px;padding:10px 12px;display:grid}._item_g6bg9_30:hover{background-color:var(--tc-surface-raised)}._item_g6bg9_30[aria-current=true]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border)}._item_name_g6bg9_48{font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._item_meta_g6bg9_56{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._dots_g6bg9_61{gap:3px;display:flex}._dot_g6bg9_61{background-color:var(--tc-divider);border-radius:999px;flex:1;height:4px}._dot_g6bg9_61[data-state=done]{background-color:var(--tc-accent)}._dot_g6bg9_61[data-state=asking]{background-color:var(--tc-marker)}._dot_g6bg9_61[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border)}._columns_g6bg9_86{grid-template-columns:minmax(0,1fr) 280px;min-width:0;display:grid}._work_g6bg9_92{min-width:0;padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-panel-padding)}._work_inner_g6bg9_97{gap:var(--tc-form-row-gap);max-width:760px;display:grid}._work_inner_g6bg9_97[data-wide]{max-width:none}._topline_g6bg9_107{gap:var(--tc-space-2) var(--tc-space-3);flex-wrap:wrap;align-items:center;display:flex}._spacer_g6bg9_114{flex:1}._compact_g6bg9_118[data-layout]{justify-self:start;width:auto}._work_head_g6bg9_123{gap:var(--tc-space-1);display:grid}._work_title_g6bg9_128{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);overflow-wrap:anywhere;margin:0}._work_description_g6bg9_137,._hint_g6bg9_138{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._error_g6bg9_145{color:var(--tc-error);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere;margin:0}._row_g6bg9_153{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._text_area_g6bg9_160{min-height:168px}._text_area_small_g6bg9_165{min-height:96px}._counter_g6bg9_174{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-align:end}._grid3_g6bg9_180{gap:var(--tc-space-4);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._chip_toggle_g6bg9_186{align-items:center;gap:var(--tc-space-1-5);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);height:32px;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);padding:0 14px;display:inline-flex}._chip_toggle_g6bg9_186[aria-pressed=true]{border-color:var(--tc-marker);background-color:var(--tc-marker);color:var(--tc-on-marker)}._steps_g6bg9_206{gap:var(--tc-space-1);flex-wrap:wrap;display:flex}._step_g6bg9_206{align-items:center;gap:var(--tc-space-2);background-color:var(--tc-surface);height:34px;box-shadow:0 0 0 1px var(--tc-divider);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);white-space:nowrap;border-radius:999px;padding:0 14px 0 6px;display:inline-flex}._step_g6bg9_206:disabled{cursor:default}._step_number_g6bg9_230{background-color:var(--tc-chip-bg);width:22px;height:22px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;display:grid}._step_g6bg9_206[data-state=done] ._step_number_g6bg9_230{background-color:var(--tc-accent);color:var(--tc-on-accent)}._step_g6bg9_206[aria-current=step]{background-color:var(--tc-marker);box-shadow:none;color:var(--tc-on-marker);font-weight:var(--tc-font-weight-semibold)}._step_g6bg9_206[aria-current=step] ._step_number_g6bg9_230{background-color:var(--tc-on-marker);color:var(--tc-marker)}._step_g6bg9_206[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._step_g6bg9_206[data-state=stale] ._step_number_g6bg9_230{border:1.5px dashed var(--tc-accent-border);background-color:#0000}._step_tag_g6bg9_269{color:var(--tc-text-muted);font-size:11px;font-weight:400}._banner_g6bg9_275{gap:var(--tc-space-2) var(--tc-space-3);padding:var(--tc-space-3) 14px;background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);border-radius:14px;flex-wrap:wrap;align-items:center;display:flex}._banner_g6bg9_275>span{flex:260px}._answered_g6bg9_293{gap:2px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:10px 14px;display:grid}._answered_question_g6bg9_305{color:var(--tc-text-muted)}._answered_answer_g6bg9_309{font-weight:var(--tc-font-weight-semibold);grid-column:1}._answered_g6bg9_293>:last-child{grid-area:1/2/3}._ask_g6bg9_319{background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border), 0 8px 24px var(--tc-shadow);border-radius:18px;gap:14px;padding:18px;display:grid}._ask_head_g6bg9_330{gap:var(--tc-space-2) 10px;flex-wrap:wrap;align-items:baseline;display:flex}._ask_title_g6bg9_337{font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg);margin:0}._badge_g6bg9_344{background-color:var(--tc-chip-bg);height:22px;color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);border-radius:999px;align-items:center;padding:0 8px;display:inline-flex}._options_g6bg9_355{gap:var(--tc-space-2);grid-template-columns:repeat(auto-fill,minmax(240px,1fr));display:grid}._option_g6bg9_355{gap:var(--tc-space-1) 10px;padding:var(--tc-space-3) 14px;border:1px solid var(--tc-divider);background-color:var(--tc-canvas);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:auto minmax(0,1fr);display:grid}._option_g6bg9_355[aria-checked=true]{border-color:var(--tc-accent-border);background-color:var(--tc-accent-soft)}._option_mark_g6bg9_378{border:1.5px solid var(--tc-border-field);background-color:var(--tc-field-bg);width:18px;height:18px;color:var(--tc-on-accent);border-radius:6px;grid-row:1/3;place-items:center;margin-top:2px;display:inline-grid}._option_mark_g6bg9_378[data-shape=radio]{border-radius:999px}._option_g6bg9_355[aria-checked=true] ._option_mark_g6bg9_378{border-color:var(--tc-accent);background-color:var(--tc-accent)}._option_label_g6bg9_400{font-weight:var(--tc-font-weight-semibold)}._option_detail_g6bg9_404{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);line-height:18px}._entries_g6bg9_411{gap:10px;display:grid}._entry_g6bg9_416{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);display:grid}._entry_head_g6bg9_425{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._entry_title_g6bg9_432{overflow-wrap:anywhere;font-size:15px;font-weight:650}._entry_content_g6bg9_438{font-size:var(--tc-font-size-sm);white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:21px}._pill_g6bg9_446{background-color:var(--tc-chip-bg);height:20px;color:var(--tc-text-muted);white-space:nowrap;border-radius:999px;align-items:center;padding:0 8px;font-size:11px;font-weight:600;display:inline-flex}._pill_g6bg9_446[data-tone=constant]{background-color:var(--tc-accent);color:var(--tc-on-accent)}._pill_g6bg9_446[data-tone=new]{background-color:var(--tc-marker);color:var(--tc-on-marker)}._pill_g6bg9_446[data-tone=modified]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._keys_g6bg9_475{gap:var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);flex-wrap:wrap;align-items:center;display:flex}._key_g6bg9_475{background-color:var(--tc-chip-bg);border-radius:999px;align-items:center;height:22px;padding:0 8px;display:inline-flex}._editor_g6bg9_493{padding:var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border);gap:14px;display:grid}._foot_g6bg9_502{gap:var(--tc-space-2);padding:var(--tc-space-3) 0;background-color:var(--tc-canvas);flex-wrap:wrap;align-items:center;display:flex;position:sticky;bottom:0}._bubble_g6bg9_514{gap:var(--tc-space-2);padding:var(--tc-space-4);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:18px;display:grid}._bubble_name_g6bg9_523{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._bubble_text_g6bg9_528{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:23px}._outputs_g6bg9_535{gap:var(--tc-space-3);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._output_g6bg9_535{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);align-content:start;display:grid}._output_title_g6bg9_551{gap:var(--tc-space-2);font-size:var(--tc-font-size-md);align-items:center;margin:0;display:flex}._known_g6bg9_560{gap:var(--tc-space-4);padding:var(--tc-space-3) var(--tc-space-4) var(--tc-space-4);border-left:1px solid var(--tc-divider);align-content:start;display:grid}._known_block_g6bg9_568{gap:6px;display:grid}._known_title_g6bg9_573{font-size:var(--tc-font-size-sm);margin:0;font-weight:700}._known_line_g6bg9_579{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere}._known_line_g6bg9_579 strong{color:var(--tc-text);font-weight:var(--tc-font-weight-semibold)}._known_toggle_g6bg9_591{display:none}._table_g6bg9_596{gap:6px;display:grid}._table_row_g6bg9_601{gap:var(--tc-space-3);padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:40px minmax(0,200px) minmax(0,1fr) 48px auto;align-items:center;display:grid}._table_row_g6bg9_601[data-off]{opacity:.55}._table_name_g6bg9_617{gap:var(--tc-space-1);font-weight:var(--tc-font-weight-semibold);overflow-wrap:anywhere;display:grid}._preview_g6bg9_624{color:var(--tc-text-muted);-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:19px;display:-webkit-box;overflow:hidden}._order_g6bg9_633{color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);text-align:center}._write_list_g6bg9_641{gap:6px;max-height:46vh;display:grid;overflow:auto}._write_row_g6bg9_648{padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:12px;grid-template-columns:auto auto minmax(0,1fr);align-items:start;gap:10px;display:grid}._write_row_g6bg9_648[data-status=same]{opacity:.6}._diff_g6bg9_664{font-size:var(--tc-font-size-xs);gap:2px;line-height:18px;display:grid}._diff_g6bg9_664 del{color:var(--tc-text-muted)}._diff_g6bg9_664 ins{background-color:var(--tc-accent-soft);text-decoration:none}._template_step_g6bg9_681{gap:10px var(--tc-space-3);padding:var(--tc-space-3) 14px;border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:auto minmax(0,1fr) auto;align-items:start;display:grid}._template_number_g6bg9_692{background-color:var(--tc-chip-bg);width:24px;height:24px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;margin-top:6px;display:grid}._template_fields_g6bg9_704{gap:var(--tc-space-2);min-width:0;display:grid}._template_side_g6bg9_710{gap:var(--tc-space-2);justify-items:end;display:grid}@container studio-workspace (width<=640px){._layout_g6bg9_5,._columns_g6bg9_86{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._aside_g6bg9_11{padding:var(--tc-space-1) var(--tc-space-4) var(--tc-space-2);scrollbar-width:none;flex-direction:row;overflow-x:auto}._aside_new_g6bg9_20{flex:none;margin:0}._aside_title_g6bg9_24,._item_meta_g6bg9_56,._dots_g6bg9_61{display:none}._item_g6bg9_30{max-width:200px;padding:6px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:999px;flex:none}._work_g6bg9_92{padding:var(--tc-space-2) var(--tc-space-4) var(--tc-space-4)}._work_title_g6bg9_128{font-size:22px;line-height:28px}._steps_g6bg9_206{scrollbar-width:none;flex-wrap:nowrap;overflow-x:auto}._step_g6bg9_206{flex:none}._step_g6bg9_206:not([aria-current=step]) ._step_label_g6bg9_769{display:none}._known_g6bg9_560{border-left:0;display:none}._known_g6bg9_560[data-open]{padding:0 var(--tc-space-4) var(--tc-space-4);display:grid}._known_toggle_g6bg9_591{display:inline-flex}._table_row_g6bg9_601{grid-template-columns:40px minmax(0,1fr) auto}._preview_g6bg9_624,._order_g6bg9_633{display:none}._template_step_g6bg9_681{grid-template-columns:minmax(0,1fr)}._template_number_g6bg9_692{display:none}._template_side_g6bg9_710{justify-items:start}}");
var Z = ze, Be = /* @__PURE__ */ F({
	__name: "OpeningSectionSwitch",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = _(e, "modelValue"), { t: n } = D(), r = k(() => [
			{
				value: "build",
				label: n("opening.sections.build")
			},
			{
				value: "books",
				label: n("opening.sections.books")
			},
			{
				value: "templates",
				label: n("opening.sections.templates")
			}
		]);
		function i(e) {
			(e === "build" || e === "books" || e === "templates") && (t.value = e);
		}
		return (e, a) => (d(), T(fe, {
			"model-value": t.value,
			class: A(S(Z).compact),
			options: r.value,
			label: S(n)("opening.sections.label"),
			"onUpdate:modelValue": i
		}, null, 8, [
			"model-value",
			"class",
			"options",
			"label"
		]));
	}
});
//#endregion
//#region src/ui/views/opening/opening_section.ts
function Ve(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region src/ui/views/opening/OpeningBooks.vue?vue&type=script&setup=true&lang.ts
var He = ["aria-label"], Ue = ["aria-current", "onClick"], We = ["placeholder", "aria-label"], Ge = ["id"], Ke = ["id", "aria-describedby"], qe = ["id"], Je = ["data-off"], Ye = ["aria-label"], Xe = /* @__PURE__ */ F({
	__name: "OpeningBooks",
	props: /*@__PURE__*/ u({
		host: {},
		hostError: {},
		lists: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: /*@__PURE__*/ u(["refresh-lists"], ["update:section"]),
	setup(e, { emit: t }) {
		let n = e, r = _(e, "section"), i = t, { t: a } = D(), o = M(n.lists.chat_book ?? n.lists.books[0] ?? null), s = M([]), c = M(!1), l = M(!1), u = M(null);
		async function m() {
			if (s.value = [], n.host !== null && o.value !== null) {
				c.value = !0, u.value = null;
				try {
					s.value = await n.host.read_entries(o.value);
				} catch (e) {
					u.value = a("opening.errors.failed", { reason: Ve(e) });
				} finally {
					c.value = !1;
				}
			}
		}
		v(o, () => void m(), { immediate: !0 }), v(() => n.lists.books, (e) => {
			(o.value === null || !e.includes(o.value)) && (o.value = n.lists.chat_book ?? e[0] ?? null);
		});
		async function g(e) {
			if (n.host === null) return !1;
			l.value = !0, u.value = null;
			try {
				return await e(n.host), i("refresh-lists"), await m(), !0;
			} catch (e) {
				return u.value = a("opening.errors.failed", { reason: Ve(e) }), !1;
			} finally {
				l.value = !1;
			}
		}
		let x = M(null), O = M(""), F = k(() => O.value.trim() !== o.value && n.lists.books.includes(O.value.trim()));
		function ee(e) {
			O.value = e === "rename" ? o.value ?? "" : "", x.value = e;
		}
		async function L() {
			let e = O.value.trim(), t = x.value, n = o.value;
			e === "" || F.value || t === null || await g((r) => t === "create" || n === null ? r.create_worldbook(e) : r.rename_worldbook(n, e)) && (x.value = null, o.value = e);
		}
		let R = M(!1);
		async function te() {
			let e = o.value;
			e !== null && await g((t) => t.delete_worldbook(e)) && (R.value = !1, o.value = null);
		}
		async function ne() {
			let e = o.value;
			e !== null && await g((t) => t.bind_chat_worldbook(e));
		}
		function ie(e) {
			return e === n.lists.chat_book ? a("opening.books.bound") : "";
		}
		let ae = M(""), V = M("all"), se = k(() => [
			{
				value: "all",
				label: a("opening.books.filter_all")
			},
			{
				value: "constant",
				label: a("opening.books.filter_constant")
			},
			{
				value: "keyword",
				label: a("opening.books.filter_keyword")
			}
		]), ce = k(() => {
			let e = ae.value.trim().toLowerCase();
			return s.value.filter((t) => V.value === "constant" && !t.constant || V.value === "keyword" && t.constant ? !1 : e === "" || [
				t.name,
				t.content,
				...t.keys
			].some((t) => t.toLowerCase().includes(e)));
		}), ue = k(() => s.value.filter((e) => e.enabled).length), W = M(null);
		function de(e) {
			let t = s.value.reduce((e, t) => Math.max(e, t.order), 0);
			W.value = e === null ? {
				uid: void 0,
				name: "",
				constant: !1,
				keys: "",
				content: "",
				order: t + 10,
				enabled: !0
			} : {
				uid: e.uid,
				name: e.name,
				constant: e.constant,
				keys: e.keys.join(", "),
				content: e.content,
				order: e.order,
				enabled: e.enabled
			};
		}
		async function fe() {
			let e = W.value, t = o.value;
			if (e === null || t === null) return;
			let n = [...new Set(e.keys.split(/[,，、]/u).map((e) => e.trim()).filter((e) => e !== ""))];
			await g((r) => r.save_entries(t, {
				upsert: [{
					...e.uid === void 0 ? {} : { uid: e.uid },
					name: e.name.trim(),
					enabled: e.enabled,
					constant: e.constant,
					keys: e.constant ? [] : n,
					content: e.content,
					order: e.order
				}],
				remove: []
			})) && (W.value = null);
		}
		async function _e(e, t) {
			let n = o.value;
			n !== null && await g((r) => r.save_entries(n, {
				upsert: [{
					...e,
					enabled: t
				}],
				remove: []
			}));
		}
		let K = M(null);
		async function ve() {
			let e = K.value, t = o.value;
			e !== null && t !== null && (await g((n) => n.save_entries(t, {
				upsert: [],
				remove: [e.uid]
			})), K.value = null);
		}
		return (t, n) => (d(), y("div", { class: A(S(Z).layout) }, [
			E("aside", {
				class: A(S(Z).aside),
				"aria-label": S(a)("opening.books.list_label")
			}, [
				I(z, {
					class: A(S(Z).aside_new),
					icon: S(H),
					label: S(a)("opening.books.new"),
					disabled: e.host === null,
					onClick: n[0] ||= (e) => ee("create")
				}, null, 8, [
					"class",
					"icon",
					"label",
					"disabled"
				]),
				e.lists.books.length > 0 ? (d(), y("div", {
					key: 0,
					class: A(S(Z).aside_title)
				}, w(S(a)("opening.books.list_title")), 3)) : C("", !0),
				(d(!0), y(N, null, p(e.lists.books, (e) => (d(), y("button", {
					key: e,
					type: "button",
					class: A(["tc-interactive", S(Z).item]),
					"aria-current": e === o.value ? "true" : void 0,
					onClick: (t) => o.value = e
				}, [E("span", { class: A(S(Z).item_name) }, w(e), 3), ie(e) === "" ? C("", !0) : (d(), y("span", {
					key: 0,
					class: A(S(Z).item_meta)
				}, w(ie(e)), 3))], 10, Ue))), 128))
			], 10, He),
			E("div", { class: A(S(Z).work) }, [E("div", {
				class: A(S(Z).work_inner),
				"data-wide": ""
			}, [E("div", { class: A(S(Z).topline) }, [
				I(Be, {
					modelValue: r.value,
					"onUpdate:modelValue": n[1] ||= (e) => r.value = e
				}, null, 8, ["modelValue"]),
				E("span", { class: A(S(Z).spacer) }, null, 2),
				o.value === null ? C("", !0) : (d(), y(N, { key: 0 }, [
					o.value !== e.lists.chat_book && e.host?.chat_name() !== null ? (d(), T(z, {
						key: 0,
						icon: S(Se),
						label: S(a)("opening.books.bind"),
						variant: "ghost",
						disabled: l.value,
						onClick: ne
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])) : C("", !0),
					I(z, {
						icon: S(oe),
						label: S(a)("opening.books.rename"),
						variant: "ghost",
						disabled: l.value,
						onClick: n[2] ||= (e) => ee("rename")
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					]),
					I(G, {
						icon: S(le),
						label: S(a)("opening.books.delete"),
						destructive: "",
						disabled: l.value,
						onClick: n[3] ||= (e) => R.value = !0
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])
				], 64))
			], 2), e.host === null ? (d(), T(B, {
				key: 0,
				status: "empty",
				"empty-title": S(a)("opening.books.unavailable_title"),
				"empty-message": e.hostError ?? S(a)("opening.books.unavailable_message")
			}, null, 8, ["empty-title", "empty-message"])) : o.value === null ? (d(), y("div", {
				key: 1,
				class: A(S(Z).work_head)
			}, [E("h1", { class: A(S(Z).work_title) }, w(S(a)("opening.books.title")), 3), E("p", { class: A(S(Z).work_description) }, w(S(a)("opening.books.empty")), 3)], 2)) : (d(), y(N, { key: 2 }, [
				E("div", { class: A(S(Z).work_head) }, [E("h1", { class: A(S(Z).work_title) }, w(o.value), 3), E("p", { class: A(S(Z).work_description) }, [P(w(S(a)("opening.books.summary", {
					n: s.value.length,
					enabled: ue.value
				})) + " ", 1), o.value === e.lists.chat_book ? (d(), y(N, { key: 0 }, [P(" · " + w(S(a)("opening.books.bound")), 1)], 64)) : C("", !0)], 2)], 2),
				u.value === null ? C("", !0) : (d(), y("p", {
					key: 0,
					class: A(S(Z).error),
					role: "alert"
				}, w(u.value), 3)),
				E("div", { class: A(S(Z).row) }, [
					f(E("input", {
						"onUpdate:modelValue": n[4] ||= (e) => ae.value = e,
						class: A([S(Z).input, S(Z).spacer]),
						type: "search",
						placeholder: S(a)("opening.books.search"),
						"aria-label": S(a)("opening.books.search")
					}, null, 10, We), [[b, ae.value]]),
					I(re, {
						modelValue: V.value,
						"onUpdate:modelValue": n[5] ||= (e) => V.value = e,
						options: se.value,
						placeholder: S(a)("opening.books.filter_all"),
						"aria-label": S(a)("opening.books.filter_label")
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder",
						"aria-label"
					]),
					I(z, {
						icon: S(H),
						label: S(a)("opening.books.add_entry"),
						disabled: l.value,
						onClick: n[6] ||= (e) => de(null)
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])
				], 2),
				W.value === null ? C("", !0) : (d(), y("div", {
					key: 1,
					class: A(S(Z).editor)
				}, [
					E("div", { class: A(S(Z).grid3) }, [I(U, { label: S(a)("opening.entry.title_label") }, {
						default: j(({ fieldId: e }) => [f(E("input", {
							id: e,
							"onUpdate:modelValue": n[7] ||= (e) => W.value.name = e,
							class: A(S(Z).input),
							maxlength: "120"
						}, null, 10, Ge), [[b, W.value.name]])]),
						_: 1
					}, 8, ["label"]), I(U, { label: S(a)("opening.books.order_label") }, {
						default: j(({ fieldId: e }) => [I(pe, {
							id: e,
							modelValue: W.value.order,
							"onUpdate:modelValue": n[8] ||= (e) => W.value.order = e,
							label: S(a)("opening.books.order_label"),
							"increment-label": S(a)("opening.books.order_up"),
							"decrement-label": S(a)("opening.books.order_down"),
							min: 0,
							max: 1e4
						}, null, 8, [
							"id",
							"modelValue",
							"label",
							"increment-label",
							"decrement-label"
						])]),
						_: 1
					}, 8, ["label"])], 2),
					I(he, {
						modelValue: W.value.constant,
						"onUpdate:modelValue": n[9] ||= (e) => W.value.constant = e,
						label: S(a)("opening.entry.constant_label"),
						description: S(a)("opening.entry.constant_hint")
					}, null, 8, [
						"modelValue",
						"label",
						"description"
					]),
					W.value.constant ? C("", !0) : (d(), T(U, {
						key: 0,
						label: S(a)("opening.entry.keys_label"),
						hint: S(a)("opening.entry.keys_hint")
					}, {
						default: j(({ fieldId: e, describedBy: t }) => [f(E("input", {
							id: e,
							"onUpdate:modelValue": n[10] ||= (e) => W.value.keys = e,
							class: A(S(Z).input),
							"aria-describedby": t
						}, null, 10, Ke), [[b, W.value.keys]])]),
						_: 1
					}, 8, ["label", "hint"])),
					I(U, { label: S(a)("opening.entry.content_label") }, {
						default: j(({ fieldId: e }) => [f(E("textarea", {
							id: e,
							"onUpdate:modelValue": n[11] ||= (e) => W.value.content = e,
							class: A(S(Z).text_area)
						}, null, 10, qe), [[b, W.value.content]])]),
						_: 1
					}, 8, ["label"]),
					E("div", { class: A(S(Z).row) }, [
						E("span", { class: A(S(Z).spacer) }, null, 2),
						I(z, {
							label: S(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[12] ||= (e) => W.value = null
						}, null, 8, ["label"]),
						I(z, {
							label: S(a)("common.actions.save"),
							variant: "primary",
							pending: l.value,
							disabled: W.value.name.trim() === "",
							onClick: fe
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])
					], 2)
				], 2)),
				I(B, {
					status: c.value ? "loading" : ce.value.length === 0 ? "empty" : "ready",
					"empty-title": S(a)("opening.books.no_entries"),
					"min-height": "80px"
				}, {
					default: j(() => [E("div", { class: A(S(Z).table) }, [(d(!0), y(N, null, p(ce.value, (e) => (d(), y("div", {
						key: e.uid,
						class: A(S(Z).table_row),
						"data-off": e.enabled ? void 0 : ""
					}, [
						I(he, {
							"model-value": e.enabled,
							label: S(a)("opening.books.enabled", { name: e.name }),
							"label-hidden": "",
							disabled: l.value,
							"onUpdate:modelValue": (t) => _e(e, t)
						}, null, 8, [
							"model-value",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						E("span", { class: A(S(Z).table_name) }, [P(w(e.name) + " ", 1), E("span", { class: A(S(Z).keys) }, [e.constant ? (d(), y("span", {
							key: 0,
							class: A(S(Z).pill),
							"data-tone": "constant"
						}, w(S(a)("opening.entry.constant")), 3)) : (d(!0), y(N, { key: 1 }, p(e.keys.slice(0, 4), (e) => (d(), y("span", {
							key: e,
							class: A(S(Z).key)
						}, w(e), 3))), 128))], 2)], 2),
						E("span", { class: A(S(Z).preview) }, w(e.content), 3),
						E("span", { class: A(S(Z).order) }, w(e.order), 3),
						E("span", { class: A(S(Z).row) }, [I(G, {
							icon: S(oe),
							label: S(a)("opening.entry.edit"),
							size: "sm",
							disabled: l.value,
							onClick: (t) => de(e)
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						]), I(G, {
							icon: S(le),
							label: S(a)("opening.entry.remove"),
							size: "sm",
							destructive: "",
							disabled: l.value,
							onClick: (t) => K.value = e
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						])], 2)
					], 10, Je))), 128))], 2)]),
					_: 1
				}, 8, ["status", "empty-title"])
			], 64))], 2)], 2),
			I(ge, h({
				open: x.value !== null,
				title: x.value === "rename" ? S(a)("opening.books.rename") : S(a)("opening.books.new")
			}, x.value === "rename" ? { description: S(a)("opening.books.rename_hint") } : {}, {
				"close-label": S(a)("common.actions.close"),
				"onUpdate:open": n[15] ||= (e) => x.value = e ? x.value : null
			}), {
				default: j(() => [E("div", { class: A(S(Z).work_inner) }, [
					f(E("input", {
						"onUpdate:modelValue": n[13] ||= (e) => O.value = e,
						class: A(S(Z).input),
						maxlength: "120",
						"aria-label": S(a)("opening.books.name_label")
					}, null, 10, Ye), [[b, O.value]]),
					F.value ? (d(), y("p", {
						key: 0,
						class: A(S(Z).error)
					}, w(S(a)("opening.write.name_taken")), 3)) : C("", !0),
					E("div", { class: A(S(Z).row) }, [
						E("span", { class: A(S(Z).spacer) }, null, 2),
						I(z, {
							label: S(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[14] ||= (e) => x.value = null
						}, null, 8, ["label"]),
						I(z, {
							label: S(a)("common.actions.save"),
							variant: "primary",
							pending: l.value,
							disabled: O.value.trim() === "" || F.value,
							onClick: L
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])
					], 2)
				], 2)]),
				_: 1
			}, 16, [
				"open",
				"title",
				"close-label"
			]),
			I(me, {
				open: R.value,
				"onUpdate:open": n[16] ||= (e) => R.value = e,
				title: S(a)("opening.books.delete_title", { name: o.value ?? "" }),
				description: S(a)("opening.books.delete_description"),
				"confirm-label": S(a)("common.actions.delete"),
				"cancel-label": S(a)("common.actions.cancel"),
				pending: l.value,
				onConfirm: te
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			I(me, {
				open: K.value !== null,
				title: S(a)("opening.books.delete_entry_title", { name: K.value?.name ?? "" }),
				description: S(a)("opening.books.delete_entry_description"),
				"confirm-label": S(a)("common.actions.delete"),
				"cancel-label": S(a)("common.actions.cancel"),
				pending: l.value,
				"onUpdate:open": n[17] ||= (e) => K.value = e ? K.value : null,
				onConfirm: ve
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 2));
	}
});
//#endregion
//#region src/modules/opening/opening_output.ts
function Ze(e) {
	return e.states.flatMap((e) => e.status === "done" || e.status === "stale" ? e.entries : []);
}
var Qe = (e) => e.trim().toLowerCase();
function $e(e, t) {
	let n = (e) => [...e].sort().join("\n");
	return n(e) === n(t);
}
function et(e, t) {
	let n = new Map(t.map((e) => [Qe(e.name), e]));
	return e.map((e) => {
		let t = n.get(Qe(e.title)) ?? null;
		return t === null ? {
			entry: e,
			existing: null,
			status: "new"
		} : {
			entry: e,
			existing: t,
			status: t.content.trim() === e.content.trim() && t.constant === e.constant && (e.constant || $e(t.keys, e.keys)) ? "same" : "modified"
		};
	});
}
var tt = 10;
function nt(e, t, n) {
	let r = n.reduce((e, t) => Math.max(e, t.order), 0);
	return {
		upsert: e.filter((e) => e.status !== "same" && t.has(e.entry.id)).map((e) => {
			let t = {
				name: e.entry.title,
				constant: e.entry.constant,
				keys: e.entry.constant ? [] : e.entry.keys,
				content: e.entry.content
			};
			return e.existing === null ? (r += tt, {
				...t,
				enabled: !0,
				order: r
			}) : {
				...t,
				uid: e.existing.uid,
				enabled: e.existing.enabled,
				order: e.existing.order
			};
		}),
		remove: []
	};
}
function rt(e, t) {
	let n = [
		`# ${e.display_name}`,
		"",
		`## ${t.description}`,
		"",
		e.description.trim()
	];
	return e.steps.forEach((r, i) => {
		let a = e.states[i];
		if (!(a === void 0 || a.status !== "done" && a.status !== "stale")) {
			n.push("", `## ${r.name}`);
			for (let e of a.entries) {
				let r = e.constant ? t.constant : `${t.keys}: ${e.keys.join(", ")}`;
				n.push("", `### ${e.title}`, "", `*${r}*`, "", e.content.trim());
			}
			a.message !== null && n.push("", `**${a.message.speaker}**`, "", a.message.text.trim());
		}
	}), `${n.join("\n")}\n`;
}
//#endregion
//#region src/ui/views/opening/OpeningEntryCard.vue?vue&type=script&setup=true&lang.ts
var it = ["id"], at = ["id", "aria-describedby"], Q = ["id"], ot = /* @__PURE__ */ F({
	__name: "OpeningEntryCard",
	props: {
		entry: {},
		rewriting: { type: Boolean },
		disabled: { type: Boolean },
		editing: { type: Boolean }
	},
	emits: [
		"save",
		"remove",
		"rewrite",
		"cancel"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = D(), a = M(n.editing), o = M(""), s = M(!1), c = M(""), l = M("");
		function u() {
			o.value = n.entry.title, s.value = n.entry.constant, c.value = n.entry.keys.join(", "), l.value = n.entry.content, a.value = !0;
		}
		a.value && u();
		function m() {
			let e = [...new Set(c.value.split(/[,，、]/u).map((e) => e.trim()).filter((e) => e !== ""))];
			r("save", {
				id: n.entry.id,
				title: o.value.trim(),
				constant: s.value,
				keys: s.value ? [] : e.slice(0, 12),
				content: l.value.trim()
			}), a.value = !1;
		}
		function h() {
			a.value = !1, r("cancel");
		}
		return (t, n) => a.value ? (d(), y("div", {
			key: 0,
			class: A(S(Z).editor)
		}, [
			I(U, { label: S(i)("opening.entry.title_label") }, {
				default: j(({ fieldId: e }) => [f(E("input", {
					id: e,
					"onUpdate:modelValue": n[0] ||= (e) => o.value = e,
					class: A(S(Z).input),
					maxlength: "120"
				}, null, 10, it), [[b, o.value]])]),
				_: 1
			}, 8, ["label"]),
			I(he, {
				modelValue: s.value,
				"onUpdate:modelValue": n[1] ||= (e) => s.value = e,
				label: S(i)("opening.entry.constant_label"),
				description: S(i)("opening.entry.constant_hint")
			}, null, 8, [
				"modelValue",
				"label",
				"description"
			]),
			s.value ? C("", !0) : (d(), T(U, {
				key: 0,
				label: S(i)("opening.entry.keys_label"),
				hint: S(i)("opening.entry.keys_hint")
			}, {
				default: j(({ fieldId: e, describedBy: t }) => [f(E("input", {
					id: e,
					"onUpdate:modelValue": n[2] ||= (e) => c.value = e,
					class: A(S(Z).input),
					"aria-describedby": t
				}, null, 10, at), [[b, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])),
			I(U, { label: S(i)("opening.entry.content_label") }, {
				default: j(({ fieldId: e }) => [f(E("textarea", {
					id: e,
					"onUpdate:modelValue": n[3] ||= (e) => l.value = e,
					class: A(S(Z).text_area),
					maxlength: "8000"
				}, null, 10, Q), [[b, l.value]])]),
				_: 1
			}, 8, ["label"]),
			E("div", { class: A(S(Z).row) }, [
				E("span", { class: A(S(Z).spacer) }, null, 2),
				I(z, {
					label: S(i)("common.actions.cancel"),
					variant: "ghost",
					onClick: h
				}, null, 8, ["label"]),
				I(z, {
					label: S(i)("common.actions.save"),
					variant: "primary",
					disabled: o.value.trim() === "" || l.value.trim() === "",
					onClick: m
				}, null, 8, ["label", "disabled"])
			], 2)
		], 2)) : (d(), y("article", {
			key: 1,
			class: A(S(Z).entry)
		}, [
			E("div", { class: A(S(Z).entry_head) }, [
				E("span", { class: A(S(Z).entry_title) }, w(e.entry.title), 3),
				e.entry.constant ? (d(), y("span", {
					key: 0,
					class: A(S(Z).pill),
					"data-tone": "constant"
				}, w(S(i)("opening.entry.constant")), 3)) : (d(), y("span", {
					key: 1,
					class: A(S(Z).pill)
				}, w(S(i)("opening.entry.keyword")), 3)),
				E("span", { class: A(S(Z).spacer) }, null, 2),
				I(G, {
					icon: S(se),
					label: S(i)("opening.entry.rewrite"),
					size: "sm",
					disabled: e.disabled || e.rewriting,
					onClick: n[4] ||= (e) => r("rewrite")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				I(G, {
					icon: S(oe),
					label: S(i)("opening.entry.edit"),
					size: "sm",
					disabled: e.disabled,
					onClick: u
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				I(G, {
					icon: S(le),
					label: S(i)("opening.entry.remove"),
					size: "sm",
					destructive: "",
					disabled: e.disabled,
					onClick: n[5] ||= (e) => r("remove")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				])
			], 2),
			!e.entry.constant && e.entry.keys.length > 0 ? (d(), y("div", {
				key: 0,
				class: A(S(Z).keys)
			}, [P(w(S(i)("opening.entry.keys_label")) + " ", 1), (d(!0), y(N, null, p(e.entry.keys, (e) => (d(), y("span", {
				key: e,
				class: A(S(Z).key)
			}, w(e), 3))), 128))], 2)) : C("", !0),
			e.rewriting ? (d(), y("p", {
				key: 1,
				class: A(S(Z).hint),
				role: "status"
			}, w(S(i)("opening.status.rewriting")), 3)) : C("", !0),
			E("p", { class: A(S(Z).entry_content) }, w(e.entry.content), 3)
		], 2));
	}
}), st = ["aria-label"], ct = ["data-status"], lt = ["data-tone"], ut = /* @__PURE__ */ F({
	__name: "OpeningWriteDialog",
	props: /*@__PURE__*/ u({
		host: {},
		entries: {},
		defaultName: {},
		lists: {}
	}, {
		open: {
			type: Boolean,
			required: !0
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ u(["written"], ["update:open"]),
	setup(e, { emit: t }) {
		let n = e, r = _(e, "open"), i = t, { t: a } = D(), o = M("new"), s = M(""), c = M(void 0), l = M([]), u = M(!1), m = M(!1), h = M(null), g = M(/* @__PURE__ */ new Set()), x = k(() => [{
			value: "new",
			label: a("opening.write.mode_new")
		}, {
			value: "existing",
			label: a("opening.write.mode_existing")
		}]), O = k(() => n.lists.books.map((e) => ({
			value: e,
			label: e
		}))), P = k(() => et(n.entries, o.value === "existing" ? l.value : []));
		function F() {
			g.value = new Set(P.value.filter((e) => e.status !== "same").map((e) => e.entry.id));
		}
		async function ee() {
			if (l.value = [], o.value !== "existing" || c.value === void 0) {
				F();
				return;
			}
			u.value = !0, h.value = null;
			try {
				l.value = await n.host.read_entries(c.value);
			} catch (e) {
				h.value = a("opening.write.read_failed", { reason: Ve(e) });
			} finally {
				u.value = !1, F();
			}
		}
		v(r, (e) => {
			e && (h.value = null, s.value = n.defaultName, c.value = n.lists.chat_book ?? n.lists.books[0], o.value = n.lists.chat_book === null ? "new" : "existing", ee());
		}), v([o, c], () => {
			ee();
		});
		function L(e, t) {
			let n = new Set(g.value);
			t === !0 ? n.add(e) : n.delete(e), g.value = n;
		}
		let R = k(() => o.value === "new" ? s.value.trim() : c.value ?? ""), te = k(() => o.value === "new" && n.lists.books.includes(s.value.trim())), ne = k(() => P.value.filter((e) => e.status !== "same" && g.value.has(e.entry.id)).length), B = k(() => r.value ? n.host.chat_name() : null);
		function ie(e) {
			switch (e.status) {
				case "new": return a("opening.write.status_new");
				case "modified": return a("opening.write.status_modified");
				case "same": return a("opening.write.status_same");
			}
		}
		async function ae() {
			let e = R.value;
			if (!(e === "" || te.value)) {
				m.value = !0, h.value = null;
				try {
					o.value === "new" && await n.host.create_worldbook(e);
					let t = o.value === "new" ? [] : l.value;
					await n.host.save_entries(e, nt(P.value, g.value, t)), B.value !== null && await n.host.bind_chat_worldbook(e), i("written", e), r.value = !1;
				} catch (e) {
					h.value = a("opening.write.failed", { reason: Ve(e) });
				} finally {
					m.value = !1;
				}
			}
		}
		return (e, t) => (d(), T(ge, {
			open: r.value,
			"onUpdate:open": t[4] ||= (e) => r.value = e,
			title: S(a)("opening.write.title"),
			description: S(a)("opening.write.description"),
			"close-label": S(a)("common.actions.close")
		}, {
			default: j(() => [E("div", { class: A(S(Z).work_inner) }, [
				I(fe, {
					modelValue: o.value,
					"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
					class: A(S(Z).compact),
					options: x.value,
					label: S(a)("opening.write.mode_label")
				}, null, 8, [
					"modelValue",
					"class",
					"options",
					"label"
				]),
				o.value === "new" ? f((d(), y("input", {
					key: 0,
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					class: A(S(Z).input),
					maxlength: "120",
					"aria-label": S(a)("opening.write.name_label")
				}, null, 10, st)), [[b, s.value]]) : (d(), T(re, {
					key: 1,
					modelValue: c.value,
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					options: O.value,
					placeholder: S(a)("opening.write.book_placeholder"),
					"aria-label": S(a)("opening.write.book_label")
				}, null, 8, [
					"modelValue",
					"options",
					"placeholder",
					"aria-label"
				])),
				te.value ? (d(), y("p", {
					key: 2,
					class: A(S(Z).error)
				}, w(S(a)("opening.write.name_taken")), 3)) : C("", !0),
				u.value ? (d(), y("p", {
					key: 3,
					class: A(S(Z).hint),
					role: "status"
				}, w(S(a)("opening.write.loading")), 3)) : (d(), y("div", {
					key: 4,
					class: A(S(Z).write_list)
				}, [(d(!0), y(N, null, p(P.value, (e) => (d(), y("div", {
					key: e.entry.id,
					class: A(S(Z).write_row),
					"data-status": e.status
				}, [
					I(V, {
						"model-value": e.status !== "same" && g.value.has(e.entry.id),
						label: e.entry.title,
						"label-hidden": "",
						disabled: e.status === "same",
						"onUpdate:modelValue": (t) => L(e.entry.id, t)
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]),
					E("span", {
						class: A(S(Z).pill),
						"data-tone": e.status
					}, w(ie(e)), 11, lt),
					E("span", null, [E("strong", null, w(e.entry.title), 1), e.status === "modified" && e.existing !== null ? (d(), y("span", {
						key: 0,
						class: A(S(Z).diff)
					}, [E("del", null, w(e.existing.content), 1), E("ins", null, w(e.entry.content), 1)], 2)) : C("", !0)])
				], 10, ct))), 128))], 2)),
				E("p", { class: A(S(Z).hint) }, w(B.value === null ? S(a)("opening.write.no_chat") : S(a)("opening.write.bind_note", {
					book: R.value,
					chat: B.value
				})), 3),
				h.value === null ? C("", !0) : (d(), y("p", {
					key: 5,
					class: A(S(Z).error),
					role: "alert"
				}, w(h.value), 3)),
				E("div", { class: A(S(Z).row) }, [
					E("span", { class: A(S(Z).spacer) }, null, 2),
					I(z, {
						label: S(a)("common.actions.cancel"),
						variant: "ghost",
						onClick: t[3] ||= (e) => r.value = !1
					}, null, 8, ["label"]),
					I(z, {
						label: S(a)("opening.write.confirm", { n: ne.value }),
						variant: "primary",
						pending: m.value,
						disabled: ne.value === 0 || R.value === "" || te.value || u.value,
						onClick: ae
					}, null, 8, [
						"label",
						"pending",
						"disabled"
					])
				], 2)
			], 2)]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		]));
	}
}), dt = ["aria-label"], ft = ["aria-current", "onClick"], pt = ["data-state"], mt = ["id", "value"], ht = [
	"id",
	"value",
	"aria-describedby",
	"placeholder"
], gt = ["aria-pressed", "onClick"], _t = ["aria-label"], vt = [
	"data-state",
	"aria-current",
	"disabled",
	"onClick"
], yt = ["role", "aria-label"], bt = [
	"role",
	"aria-checked",
	"disabled",
	"onClick"
], xt = ["data-shape"], St = ["id", "placeholder"], Ct = ["id"], wt = ["id"], Tt = ["data-open", "aria-label"], Et = 4e3, Dt = /* @__PURE__ */ F({
	__name: "OpeningBuild",
	props: /*@__PURE__*/ u({
		store: {},
		flow: {},
		host: {},
		hostError: {},
		lists: {},
		templates: {},
		saveError: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: /*@__PURE__*/ u(["refresh-lists"], ["update:section"]),
	setup(e, { emit: t }) {
		let n = e, r = _(e, "section"), i = t, { t: a } = D(), o = M(n.store.drafts.value[0]?.id ?? null), s = k(() => o.value === null ? null : n.store.draft(o.value)), c = M(null);
		function l(e) {
			return e.states.map((t, n) => t.status === "pending" && e.started && n === e.current ? "asking" : t.status);
		}
		function u(e) {
			return e.started ? e.states.every((e) => e.status === "done") ? a("opening.draft.finished") : a("opening.draft.at_step", {
				n: e.current + 1,
				total: e.steps.length
			}) : a("opening.draft.not_started");
		}
		function m(e) {
			return n.templates.find((t) => t.id === e);
		}
		async function h() {
			let e = m("builtin-default") ?? n.templates[0];
			if (e === void 0) return;
			let t = {
				id: crypto.randomUUID(),
				kind: "draft",
				display_name: a("opening.draft.new_name", { n: n.store.drafts.value.length + 1 }),
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				description: "",
				template_name: e.display_name,
				steps: e.steps.map((e) => ({ ...e })),
				states: e.steps.map(Fe),
				current: 0,
				started: !1,
				connection: { kind: "analysis" },
				preset_name: "in_use",
				worldbooks: [],
				card: null,
				use_greeting: !1
			};
			await n.store.add(t), o.value = t.id;
		}
		let g = M(!1), x = M(!1);
		async function O() {
			let e = s.value;
			if (e !== null) {
				x.value = !0;
				try {
					await n.store.remove(e.id), g.value = !1, o.value = n.store.drafts.value[0]?.id ?? null;
				} finally {
					x.value = !1;
				}
			}
		}
		function F(e, t = !1) {
			s.value !== null && n.store.edit(s.value, e, { debounce: t });
		}
		let ee = k(() => n.templates.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), L = M(Me);
		v(() => s.value?.template_name, (e) => {
			L.value = n.templates.find((t) => t.display_name === e)?.id ?? "builtin-default";
		}, { immediate: !0 });
		function B(e) {
			let t = e === void 0 ? void 0 : m(e);
			t !== void 0 && (L.value = t.id, F((e) => {
				e.template_name = t.display_name, e.steps = t.steps.map((e) => ({ ...e })), e.states = t.steps.map(Fe), e.current = 0;
			}));
		}
		let ue = k(() => [
			{
				value: "analysis",
				label: a("opening.settings.connection_analysis")
			},
			{
				value: "current",
				label: a("opening.settings.connection_current")
			},
			...n.lists.proxies.map((e) => ({
				value: `proxy:${e}`,
				label: a("opening.settings.connection_proxy", { name: e })
			}))
		]), de = k(() => {
			let e = s.value?.connection;
			return e?.kind === "proxy_preset" ? `proxy:${e.proxy_preset}` : e?.kind;
		});
		function fe(e) {
			e !== void 0 && F((t) => {
				t.connection = e.startsWith("proxy:") ? {
					kind: "proxy_preset",
					proxy_preset: e.slice(6)
				} : e === "current" ? { kind: "current" } : { kind: "analysis" };
			});
		}
		let pe = k(() => n.lists.presets.map((e) => ({
			value: e,
			label: e === "in_use" ? a("opening.settings.preset_in_use") : e
		})));
		function he(e) {
			e !== void 0 && F((t) => {
				t.preset_name = e;
			});
		}
		function ge(e) {
			F((t) => {
				t.worldbooks = t.worldbooks.includes(e) ? t.worldbooks.filter((t) => t !== e) : [...t.worldbooks, e].slice(0, 20);
			});
		}
		let _e = M(null);
		v([o, () => n.host], () => {
			_e.value = n.host?.character() ?? null;
		}, { immediate: !0 });
		function ye(e) {
			let t = _e.value;
			F((n) => {
				if (e === !0 && t !== null) {
					n.card = {
						name: t.name,
						description: t.description,
						personality: t.personality,
						scenario: t.scenario,
						first_message: t.first_message
					}, n.worldbooks = [.../* @__PURE__ */ new Set([...n.worldbooks, ...t.worldbooks])].slice(0, 20);
					return;
				}
				n.card = null, n.use_greeting = !1;
			});
		}
		function Se(e) {
			F((t) => {
				t.use_greeting = e === !0 && t.card !== null;
			});
		}
		function we(e) {
			return ue.value.find((e) => e.value === de.value)?.label ?? e.connection.kind;
		}
		let q = k(() => s.value === null ? null : n.flow.busy(s.value.id)), Te = k(() => s.value === null ? null : n.flow.error(s.value.id)), J = k(() => s.value?.steps[s.value.current] ?? null), Y = k(() => s.value?.states[s.value.current] ?? null), Ee = k(() => s.value !== null && s.value.current === s.value.steps.length - 1), De = k(() => Y.value?.status === "done" || Y.value?.status === "stale"), Oe = k(() => s.value?.states.some((e) => e.status === "stale") ?? !1);
		function ke(e) {
			return e instanceof W ? a("opening.errors.unparsable", { excerpt: e.excerpt }) : a("opening.errors.failed", { reason: Ve(e) });
		}
		function Ae(e) {
			return e === "stale" ? a("opening.steps.stale") : "";
		}
		function je(e) {
			let t = s.value;
			return t !== null && (t.states[e]?.status !== "pending" || e === t.current);
		}
		function Ne(e) {
			F((t) => {
				t.current = e;
			});
		}
		async function Pe() {
			let e = s.value;
			e !== null && e.description.trim() !== "" && (F((e) => {
				e.started = !0;
			}), await n.flow.run_step(e, 0));
		}
		let X = M([]), Le = M("");
		v(() => Y.value?.question, () => {
			X.value = [], Le.value = "";
		});
		function Re(e) {
			let t = Y.value?.question;
			if (t != null) {
				if (!t.multiple) {
					X.value = X.value.includes(e) ? [] : [e];
					return;
				}
				X.value = X.value.includes(e) ? X.value.filter((t) => t !== e) : [...X.value, e];
			}
		}
		async function ze() {
			s.value !== null && await n.flow.answer(s.value, X.value, Le.value);
		}
		function He(e, t) {
			let n = [...e, ...t === "" ? [] : [t]];
			return n.length === 0 ? a("opening.ask.left_to_model") : n.join(a("opening.ask.joiner"));
		}
		let Ue = M(null);
		function We(e, t) {
			F((n) => {
				let r = n.states[e]?.entries, i = r?.findIndex((e) => e.id === t.id) ?? -1;
				r !== void 0 && i >= 0 && (r[i] = t), Ie(n, e);
			}), Ue.value = null;
		}
		function Ge(e, t) {
			F((n) => {
				let r = n.states[e];
				r !== void 0 && (r.entries = r.entries.filter((e) => e.id !== t)), Ie(n, e);
			});
		}
		function Ke(e) {
			let t = crypto.randomUUID();
			F((n) => {
				n.states[e]?.entries.push({
					id: t,
					title: a("opening.entry.new_title"),
					constant: !1,
					keys: [],
					content: ""
				});
			}), Ue.value = t;
		}
		function qe(e, t) {
			Ue.value === t && (Ge(e, t), Ue.value = null);
		}
		let Je = M(!1), Ye = M(""), Xe = M("");
		function Qe() {
			Ye.value = Y.value?.message?.speaker ?? "", Xe.value = Y.value?.message?.text ?? "", Je.value = !0;
		}
		function $e() {
			let e = s.value?.current ?? 0;
			F((t) => {
				let n = t.states[e];
				n !== void 0 && (n.message = {
					speaker: Ye.value.trim(),
					text: Xe.value
				});
			}), Je.value = !1;
		}
		let et = k(() => s.value === null ? [] : Ze(s.value)), tt = k(() => [...s.value?.states ?? []].reverse().find((e) => e.message !== null)?.message ?? null), nt = M(!1), it = M(null);
		function at(e) {
			it.value = a("opening.output.book_written", { book: e }), i("refresh-lists");
		}
		let Q = M(!1), st = M(!1), ct = k(() => Q.value ? n.host?.chat_name() ?? null : null);
		async function lt() {
			let e = tt.value;
			if (n.host !== null && e !== null) {
				st.value = !0;
				try {
					await n.host.append_character_message(e.speaker, e.text), Q.value = !1, it.value = a("opening.output.message_added");
				} catch (e) {
					c.value = a("opening.errors.failed", { reason: Ve(e) }), Q.value = !1;
				} finally {
					st.value = !1;
				}
			}
		}
		function Dt() {
			let e = s.value;
			return e === null ? "" : rt(e, {
				description: a("opening.markdown.description"),
				constant: a("opening.entry.constant"),
				keys: a("opening.entry.keys_label")
			});
		}
		async function Ot() {
			try {
				await navigator.clipboard.writeText(Dt()), it.value = a("opening.output.copied");
			} catch (e) {
				c.value = a("opening.errors.failed", { reason: Ve(e) });
			}
		}
		function kt() {
			let e = URL.createObjectURL(new Blob([Dt()], { type: "text/markdown" })), t = document.createElement("a");
			t.href = e, t.download = `${s.value?.display_name ?? "opening"}.md`, t.click(), URL.revokeObjectURL(e);
		}
		let At = M(!1);
		return v(o, () => {
			c.value = null, it.value = null, Je.value = !1;
		}), (t, n) => (d(), y("div", { class: A(S(Z).layout) }, [
			E("aside", {
				class: A(S(Z).aside),
				"aria-label": S(a)("opening.draft.list_label")
			}, [
				I(z, {
					class: A(S(Z).aside_new),
					icon: S(H),
					label: S(a)("opening.draft.new"),
					onClick: h
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				e.store.drafts.value.length > 0 ? (d(), y("div", {
					key: 0,
					class: A(S(Z).aside_title)
				}, w(S(a)("opening.draft.list_title")), 3)) : C("", !0),
				(d(!0), y(N, null, p(e.store.drafts.value, (e) => (d(), y("button", {
					key: e.id,
					type: "button",
					class: A(["tc-interactive", S(Z).item]),
					"aria-current": e.id === o.value ? "true" : void 0,
					onClick: (t) => o.value = e.id
				}, [
					E("span", { class: A(S(Z).item_name) }, w(e.display_name), 3),
					E("span", { class: A(S(Z).dots) }, [(d(!0), y(N, null, p(l(e), (e, t) => (d(), y("i", {
						key: t,
						class: A(S(Z).dot),
						"data-state": e
					}, null, 10, pt))), 128))], 2),
					E("span", { class: A(S(Z).item_meta) }, w(u(e)), 3)
				], 10, ft))), 128))
			], 10, dt),
			E("div", { class: A(S(Z).columns) }, [E("div", { class: A(S(Z).work) }, [E("div", { class: A(S(Z).work_inner) }, [
				E("div", { class: A(S(Z).topline) }, [
					I(Be, {
						modelValue: r.value,
						"onUpdate:modelValue": n[0] ||= (e) => r.value = e
					}, null, 8, ["modelValue"]),
					E("span", { class: A(S(Z).spacer) }, null, 2),
					s.value !== null && s.value.started ? (d(), T(z, {
						key: 0,
						class: A(S(Z).known_toggle),
						icon: S(te),
						label: S(a)("opening.known.toggle"),
						variant: "ghost",
						onClick: n[1] ||= (e) => At.value = !At.value
					}, null, 8, [
						"class",
						"icon",
						"label"
					])) : C("", !0),
					s.value === null ? C("", !0) : (d(), T(G, {
						key: 1,
						icon: S(le),
						label: S(a)("opening.draft.delete"),
						onClick: n[2] ||= (e) => g.value = !0
					}, null, 8, ["icon", "label"]))
				], 2),
				e.hostError === null ? C("", !0) : (d(), y("p", {
					key: 0,
					class: A(S(Z).error)
				}, w(S(a)("opening.errors.host", { reason: e.hostError })), 3)),
				e.saveError === null ? C("", !0) : (d(), y("p", {
					key: 1,
					class: A(S(Z).error),
					role: "alert"
				}, w(S(a)("opening.errors.save", { reason: e.saveError })), 3)),
				c.value === null ? C("", !0) : (d(), y("p", {
					key: 2,
					class: A(S(Z).error),
					role: "alert"
				}, w(c.value), 3)),
				s.value === null ? (d(), y("div", {
					key: 3,
					class: A(S(Z).work_head)
				}, [
					E("h1", { class: A(S(Z).work_title) }, w(S(a)("opening.title")), 3),
					E("p", { class: A(S(Z).work_description) }, w(S(a)("opening.empty_hint")), 3),
					E("div", { class: A(S(Z).row) }, [I(z, {
						icon: S(H),
						label: S(a)("opening.draft.new"),
						variant: "primary",
						onClick: h
					}, null, 8, ["icon", "label"])], 2)
				], 2)) : s.value.started ? J.value !== null && Y.value !== null ? (d(), y(N, { key: 5 }, [
					E("nav", {
						class: A(S(Z).steps),
						"aria-label": S(a)("opening.steps.label")
					}, [(d(!0), y(N, null, p(s.value.steps, (e, t) => (d(), y("button", {
						key: e.id,
						type: "button",
						class: A(["tc-interactive", S(Z).step]),
						"data-state": s.value.states[t]?.status,
						"aria-current": t === s.value.current ? "step" : void 0,
						disabled: !je(t) || q.value !== null,
						onClick: (e) => Ne(t)
					}, [
						E("span", { class: A(S(Z).step_number) }, [s.value.states[t]?.status === "done" ? (d(), T(R, {
							key: 0,
							icon: S(ne),
							size: 13
						}, null, 8, ["icon"])) : (d(), y(N, { key: 1 }, [P(w(t + 1), 1)], 64))], 2),
						E("span", { class: A(S(Z).step_label) }, w(e.name), 3),
						E("span", { class: A(S(Z).step_tag) }, w(Ae(s.value.states[t]?.status ?? "")), 3)
					], 10, vt))), 128))], 10, _t),
					Oe.value ? (d(), y("div", {
						key: 0,
						class: A(S(Z).banner)
					}, [E("span", null, w(S(a)("opening.steps.stale_banner")), 1), I(z, {
						icon: S(se),
						label: S(a)("opening.steps.regenerate_stale"),
						pending: q.value !== null,
						onClick: n[5] ||= (t) => e.flow.regenerate_stale(s.value)
					}, null, 8, [
						"icon",
						"label",
						"pending"
					])], 2)) : C("", !0),
					E("div", { class: A(S(Z).work_head) }, [E("h1", { class: A(S(Z).work_title) }, w(J.value.name), 3), E("p", { class: A(S(Z).work_description) }, w(J.value.instruction), 3)], 2),
					(d(!0), y(N, null, p(Y.value.answers, (t, n) => (d(), y("div", {
						key: n,
						class: A(S(Z).answered)
					}, [
						E("span", { class: A(S(Z).answered_question) }, w(S(a)("opening.ask.answered", {
							n: n + 1,
							question: t.question.text
						})), 3),
						E("span", { class: A(S(Z).answered_answer) }, w(He(t.selected, t.other)), 3),
						I(z, {
							icon: S(oe),
							label: S(a)("opening.ask.change"),
							variant: "ghost",
							disabled: q.value !== null,
							onClick: (t) => e.flow.reask(s.value, s.value.current, n)
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						])
					], 2))), 128)),
					q.value === null ? C("", !0) : (d(), y("p", {
						key: 1,
						class: A(S(Z).hint),
						role: "status"
					}, w(q.value.kind === "question" ? S(a)("opening.status.asking") : q.value.kind === "generate" ? S(a)("opening.status.generating", { step: s.value.steps[q.value.step]?.name ?? "" }) : S(a)("opening.status.rewriting")), 3)),
					q.value === null && e.flow.dropped(s.value.id) > 0 && De.value ? (d(), y("p", {
						key: 2,
						class: A(S(Z).hint),
						role: "status"
					}, w(S(a)("opening.status.dropped", { n: e.flow.dropped(s.value.id) })), 3)) : C("", !0),
					Te.value === null ? C("", !0) : (d(), y("div", {
						key: 3,
						class: A(S(Z).banner),
						role: "alert"
					}, [E("span", null, w(ke(Te.value)), 1), Y.value.status === "asking" && Y.value.question === null ? (d(), T(z, {
						key: 0,
						icon: S(se),
						label: S(a)("opening.status.retry"),
						onClick: n[6] ||= (t) => e.flow.run_step(s.value, s.value.current)
					}, null, 8, ["icon", "label"])) : C("", !0)], 2)),
					Y.value.question === null ? Y.value.status === "pending" && q.value === null ? (d(), y("div", {
						key: 5,
						class: A(S(Z).row)
					}, [I(z, {
						icon: S(ce),
						label: S(a)("opening.steps.run"),
						variant: "primary",
						onClick: n[9] ||= (t) => e.flow.run_step(s.value, s.value.current)
					}, null, 8, ["icon", "label"])], 2)) : C("", !0) : (d(), y("div", {
						key: 4,
						class: A(S(Z).ask)
					}, [
						E("div", { class: A(S(Z).ask_head) }, [
							E("h2", { class: A(S(Z).ask_title) }, w(Y.value.question.text), 3),
							E("span", { class: A(S(Z).badge) }, w(Y.value.question.multiple ? S(a)("opening.ask.multiple") : S(a)("opening.ask.single")), 3),
							E("span", { class: A(S(Z).spacer) }, null, 2),
							E("span", { class: A(S(Z).hint) }, w(S(a)("opening.ask.round", {
								n: Y.value.answers.length + 1,
								max: J.value.max_rounds
							})), 3)
						], 2),
						Y.value.question.why === "" ? C("", !0) : (d(), y("p", {
							key: 0,
							class: A(S(Z).hint)
						}, w(Y.value.question.why), 3)),
						E("div", {
							class: A(S(Z).options),
							role: Y.value.question.multiple ? "group" : "radiogroup",
							"aria-label": Y.value.question.text
						}, [(d(!0), y(N, null, p(Y.value.question.options, (e) => (d(), y("button", {
							key: e.label,
							type: "button",
							class: A(["tc-interactive", S(Z).option]),
							role: Y.value.question.multiple ? "checkbox" : "radio",
							"aria-checked": X.value.includes(e.label),
							disabled: q.value !== null,
							onClick: (t) => Re(e.label)
						}, [
							E("span", {
								class: A(S(Z).option_mark),
								"data-shape": Y.value.question.multiple ? "box" : "radio"
							}, [X.value.includes(e.label) ? (d(), T(R, {
								key: 0,
								icon: S(ne),
								size: 13
							}, null, 8, ["icon"])) : C("", !0)], 10, xt),
							E("span", { class: A(S(Z).option_label) }, w(e.label), 3),
							E("span", { class: A(S(Z).option_detail) }, w(e.detail), 3)
						], 10, bt))), 128))], 10, yt),
						I(U, { label: S(a)("opening.ask.other_label") }, {
							default: j(({ fieldId: e }) => [f(E("input", {
								id: e,
								"onUpdate:modelValue": n[7] ||= (e) => Le.value = e,
								class: A(S(Z).input),
								maxlength: "500",
								placeholder: S(a)("opening.ask.other_placeholder")
							}, null, 10, St), [[b, Le.value]])]),
							_: 1
						}, 8, ["label"]),
						E("div", { class: A(S(Z).row) }, [
							I(z, {
								icon: S(be),
								label: S(a)("opening.ask.skip"),
								variant: "ghost",
								disabled: q.value !== null,
								onClick: n[8] ||= (t) => e.flow.skip(s.value)
							}, null, 8, [
								"icon",
								"label",
								"disabled"
							]),
							E("span", { class: A(S(Z).spacer) }, null, 2),
							I(z, {
								icon: S(ve),
								label: S(a)("opening.ask.confirm"),
								variant: "primary",
								pending: q.value !== null,
								disabled: X.value.length === 0 && Le.value.trim() === "",
								onClick: ze
							}, null, 8, [
								"icon",
								"label",
								"pending",
								"disabled"
							])
						], 2)
					], 2)),
					De.value && J.value.output === "entries" ? (d(), y("div", {
						key: 6,
						class: A(S(Z).entries)
					}, [(d(!0), y(N, null, p(Y.value.entries, (t) => (d(), T(ot, {
						key: t.id,
						entry: t,
						editing: t.id === Ue.value,
						rewriting: q.value?.kind === "rewrite" && q.value.entry_id === t.id,
						disabled: q.value !== null,
						onSave: n[10] ||= (e) => We(s.value.current, e),
						onRemove: (e) => Ge(s.value.current, t.id),
						onRewrite: (n) => e.flow.rewrite_entry(s.value, s.value.current, t),
						onCancel: (e) => qe(s.value.current, t.id)
					}, null, 8, [
						"entry",
						"editing",
						"rewriting",
						"disabled",
						"onRemove",
						"onRewrite",
						"onCancel"
					]))), 128))], 2)) : C("", !0),
					De.value && J.value.output === "message" && Y.value.message !== null ? (d(), y(N, { key: 7 }, [Je.value ? (d(), y("div", {
						key: 0,
						class: A(S(Z).editor)
					}, [
						I(U, { label: S(a)("opening.message.speaker_label") }, {
							default: j(({ fieldId: e }) => [f(E("input", {
								id: e,
								"onUpdate:modelValue": n[11] ||= (e) => Ye.value = e,
								class: A(S(Z).input),
								maxlength: "80"
							}, null, 10, Ct), [[b, Ye.value]])]),
							_: 1
						}, 8, ["label"]),
						I(U, { label: S(a)("opening.message.text_label") }, {
							default: j(({ fieldId: e }) => [f(E("textarea", {
								id: e,
								"onUpdate:modelValue": n[12] ||= (e) => Xe.value = e,
								class: A(S(Z).text_area)
							}, null, 10, wt), [[b, Xe.value]])]),
							_: 1
						}, 8, ["label"]),
						E("div", { class: A(S(Z).row) }, [
							E("span", { class: A(S(Z).spacer) }, null, 2),
							I(z, {
								label: S(a)("common.actions.cancel"),
								variant: "ghost",
								onClick: n[13] ||= (e) => Je.value = !1
							}, null, 8, ["label"]),
							I(z, {
								label: S(a)("common.actions.save"),
								variant: "primary",
								disabled: Ye.value.trim() === "" || Xe.value.trim() === "",
								onClick: $e
							}, null, 8, ["label", "disabled"])
						], 2)
					], 2)) : (d(), y("div", {
						key: 1,
						class: A(S(Z).bubble)
					}, [E("span", { class: A(S(Z).bubble_name) }, w(Y.value.message.speaker), 3), E("p", { class: A(S(Z).bubble_text) }, w(Y.value.message.text), 3)], 2)), Je.value ? C("", !0) : (d(), y("div", {
						key: 2,
						class: A(S(Z).row)
					}, [I(z, {
						icon: S(oe),
						label: S(a)("opening.message.edit"),
						disabled: q.value !== null,
						onClick: Qe
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])], 2))], 64)) : C("", !0),
					De.value ? (d(), y("div", {
						key: 8,
						class: A(S(Z).foot)
					}, [
						Y.value.answers.length < J.value.max_rounds ? (d(), T(z, {
							key: 0,
							icon: S(K),
							label: S(a)("opening.steps.ask_more"),
							variant: "ghost",
							disabled: q.value !== null,
							onClick: n[14] ||= (t) => e.flow.run_step(s.value, s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])) : C("", !0),
						J.value.output === "entries" ? (d(), T(z, {
							key: 1,
							icon: S(H),
							label: S(a)("opening.entry.add"),
							disabled: q.value !== null,
							onClick: n[15] ||= (e) => Ke(s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])) : C("", !0),
						E("span", { class: A(S(Z).spacer) }, null, 2),
						I(z, {
							icon: S(se),
							label: S(a)("opening.steps.regenerate"),
							pending: q.value?.kind === "generate",
							disabled: q.value !== null,
							onClick: n[16] ||= (t) => e.flow.generate(s.value, s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						]),
						Ee.value ? C("", !0) : (d(), T(z, {
							key: 2,
							icon: S(ve),
							label: S(a)("opening.steps.next"),
							variant: "primary",
							disabled: q.value !== null,
							onClick: n[17] ||= (t) => e.flow.next(s.value)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						]))
					], 2)) : C("", !0),
					Ee.value && De.value ? (d(), y(N, { key: 9 }, [E("div", { class: A(S(Z).outputs) }, [
						E("div", { class: A(S(Z).output) }, [
							E("h3", { class: A(S(Z).output_title) }, [I(R, { icon: S(te) }, null, 8, ["icon"]), P(w(S(a)("opening.output.book_title")), 1)], 2),
							E("p", { class: A(S(Z).hint) }, w(S(a)("opening.output.book_hint", { n: et.value.length })), 3),
							E("div", { class: A(S(Z).row) }, [I(z, {
								label: S(a)("opening.output.book_action"),
								variant: "primary",
								disabled: e.host === null || et.value.length === 0 || q.value !== null,
								onClick: n[18] ||= (e) => nt.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						E("div", { class: A(S(Z).output) }, [
							E("h3", { class: A(S(Z).output_title) }, [I(R, { icon: S(Ce) }, null, 8, ["icon"]), P(w(S(a)("opening.output.message_title")), 1)], 2),
							E("p", { class: A(S(Z).hint) }, w(S(a)("opening.output.message_hint")), 3),
							E("div", { class: A(S(Z).row) }, [I(z, {
								label: S(a)("opening.output.message_action"),
								disabled: e.host === null || tt.value === null || q.value !== null,
								onClick: n[19] ||= (e) => Q.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						E("div", { class: A(S(Z).output) }, [
							E("h3", { class: A(S(Z).output_title) }, [I(R, { icon: S(xe) }, null, 8, ["icon"]), P(w(S(a)("opening.output.markdown_title")), 1)], 2),
							E("p", { class: A(S(Z).hint) }, w(S(a)("opening.output.markdown_hint")), 3),
							E("div", { class: A(S(Z).row) }, [I(z, {
								icon: S(ie),
								label: S(a)("opening.output.copy"),
								onClick: Ot
							}, null, 8, ["icon", "label"]), I(z, {
								icon: S(ae),
								label: S(a)("opening.output.download"),
								variant: "ghost",
								onClick: kt
							}, null, 8, ["icon", "label"])], 2)
						], 2)
					], 2), it.value === null ? C("", !0) : (d(), y("p", {
						key: 0,
						class: A(S(Z).hint),
						role: "status"
					}, w(it.value), 3))], 64)) : C("", !0)
				], 64)) : C("", !0) : (d(), y(N, { key: 4 }, [
					I(U, { label: S(a)("opening.draft.name_label") }, {
						default: j(({ fieldId: e }) => [E("input", {
							id: e,
							value: s.value.display_name,
							class: A(S(Z).input),
							maxlength: "60",
							onInput: n[3] ||= (e) => {
								F((t) => {
									t.display_name = e.target.value;
								}, !0);
							}
						}, null, 42, mt)]),
						_: 1
					}, 8, ["label"]),
					I(U, {
						label: S(a)("opening.draft.description_label"),
						hint: S(a)("opening.draft.description_hint")
					}, {
						default: j(({ fieldId: e, describedBy: t }) => [E("textarea", {
							id: e,
							value: s.value.description,
							class: A(S(Z).text_area),
							maxlength: Et,
							"aria-describedby": t,
							placeholder: S(a)("opening.draft.description_placeholder"),
							onInput: n[4] ||= (e) => {
								F((t) => {
									t.description = e.target.value;
								}, !0);
							}
						}, null, 42, ht), E("div", { class: A(S(Z).counter) }, w(s.value.description.length) + " / " + w(Et), 3)]),
						_: 1
					}, 8, ["label", "hint"]),
					E("div", { class: A(S(Z).grid3) }, [
						I(U, { label: S(a)("opening.settings.template_label") }, {
							default: j(({ fieldId: e }) => [I(re, {
								id: e,
								"model-value": L.value,
								options: ee.value,
								placeholder: S(a)("opening.settings.template_label"),
								"onUpdate:modelValue": B
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						I(U, { label: S(a)("opening.settings.connection_label") }, {
							default: j(({ fieldId: e }) => [I(re, {
								id: e,
								"model-value": de.value,
								options: ue.value,
								placeholder: S(a)("opening.settings.connection_label"),
								"onUpdate:modelValue": fe
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						I(U, { label: S(a)("opening.settings.preset_label") }, {
							default: j(({ fieldId: e }) => [I(re, {
								id: e,
								"model-value": s.value.preset_name,
								options: pe.value,
								placeholder: S(a)("opening.settings.preset_label"),
								"onUpdate:modelValue": he
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"])
					], 2),
					I(U, {
						label: S(a)("opening.settings.worldbooks_label"),
						hint: S(a)("opening.settings.worldbooks_hint")
					}, {
						default: j(() => [e.lists.books.length > 0 ? (d(), y("div", {
							key: 0,
							class: A(S(Z).row)
						}, [(d(!0), y(N, null, p(e.lists.books, (e) => (d(), y("button", {
							key: e,
							type: "button",
							class: A(["tc-interactive", S(Z).chip_toggle]),
							"aria-pressed": s.value.worldbooks.includes(e),
							onClick: (t) => ge(e)
						}, [I(R, {
							icon: S(te),
							size: 14
						}, null, 8, ["icon"]), P(w(e), 1)], 10, gt))), 128))], 2)) : (d(), y("p", {
							key: 1,
							class: A(S(Z).hint)
						}, w(S(a)("opening.settings.no_worldbooks")), 3))]),
						_: 1
					}, 8, ["label", "hint"]),
					I(U, {
						label: S(a)("opening.settings.card_label"),
						hint: S(a)("opening.settings.card_hint")
					}, {
						default: j(() => [E("div", { class: A(S(Z).row) }, [I(V, {
							"model-value": s.value.card !== null,
							label: s.value.card === null ? _e.value === null ? S(a)("opening.settings.card_none") : S(a)("opening.settings.card_use", { name: _e.value.name }) : S(a)("opening.settings.card_use", { name: s.value.card.name }),
							disabled: s.value.card === null && _e.value === null,
							"onUpdate:modelValue": ye
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						]), I(V, {
							"model-value": s.value.use_greeting,
							label: S(a)("opening.settings.greeting_use"),
							disabled: s.value.card === null || s.value.card.first_message.trim() === "",
							"onUpdate:modelValue": Se
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					E("div", { class: A(S(Z).row) }, [
						E("span", { class: A(S(Z).spacer) }, null, 2),
						E("span", { class: A(S(Z).hint) }, w(S(a)("opening.draft.step_count", { n: s.value.steps.length })), 3),
						I(z, {
							icon: S(ce),
							label: S(a)("opening.draft.start"),
							variant: "primary",
							pending: q.value !== null,
							disabled: s.value.description.trim() === "",
							onClick: Pe
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						])
					], 2)
				], 64))
			], 2)], 2), s.value !== null && s.value.started ? (d(), y("aside", {
				key: 0,
				class: A(S(Z).known),
				"data-open": At.value ? "" : void 0,
				"aria-label": S(a)("opening.known.label")
			}, [
				E("div", { class: A(S(Z).known_block) }, [E("h3", { class: A(S(Z).known_title) }, w(S(a)("opening.known.settled")), 3), (d(!0), y(N, null, p(s.value.steps, (e, t) => (d(), y(N, { key: e.id }, [t !== s.value.current && (s.value.states[t]?.entries.length ?? 0) > 0 ? (d(), y("div", {
					key: 0,
					class: A(S(Z).known_line)
				}, [
					E("strong", null, w(e.name), 1),
					n[24] ||= E("br", null, null, -1),
					P(w((s.value.states[t]?.entries ?? []).map((e) => e.title).join(S(a)("opening.ask.joiner"))), 1)
				], 2)) : C("", !0)], 64))), 128))], 2),
				Y.value !== null && Y.value.answers.length > 0 ? (d(), y("div", {
					key: 0,
					class: A(S(Z).known_block)
				}, [E("h3", { class: A(S(Z).known_title) }, w(S(a)("opening.known.answered")), 3), (d(!0), y(N, null, p(Y.value.answers, (e, t) => (d(), y("div", {
					key: t,
					class: A(S(Z).known_line)
				}, w(He(e.selected, e.other)), 3))), 128))], 2)) : C("", !0),
				E("div", { class: A(S(Z).known_block) }, [E("h3", { class: A(S(Z).known_title) }, w(S(a)("opening.known.draft")), 3), E("div", { class: A(S(Z).known_line) }, [
					P(w(S(a)("opening.known.connection", { name: we(s.value) })), 1),
					n[26] ||= E("br", null, null, -1),
					P(w(S(a)("opening.known.preset", { name: s.value.preset_name === "in_use" ? S(a)("opening.settings.preset_in_use") : s.value.preset_name })), 1),
					n[27] ||= E("br", null, null, -1),
					s.value.card === null ? C("", !0) : (d(), y(N, { key: 0 }, [P(w(s.value.use_greeting ? S(a)("opening.known.card_greeting", { name: s.value.card.name }) : S(a)("opening.known.card", { name: s.value.card.name })), 1), n[25] ||= E("br", null, null, -1)], 64)),
					P(w(s.value.worldbooks.length === 0 ? S(a)("opening.known.no_books") : S(a)("opening.known.books", { names: s.value.worldbooks.join(S(a)("opening.ask.joiner")) })), 1)
				], 2)], 2)
			], 10, Tt)) : C("", !0)], 2),
			e.host !== null && s.value !== null ? (d(), T(ut, {
				key: 0,
				open: nt.value,
				"onUpdate:open": n[20] ||= (e) => nt.value = e,
				host: e.host,
				entries: et.value,
				"default-name": s.value.display_name,
				lists: e.lists,
				onWritten: at
			}, null, 8, [
				"open",
				"host",
				"entries",
				"default-name",
				"lists"
			])) : C("", !0),
			I(me, {
				open: Q.value,
				"onUpdate:open": n[21] ||= (e) => Q.value = e,
				title: S(a)("opening.output.append_title"),
				description: ct.value === null ? S(a)("opening.output.append_no_chat") : S(a)("opening.output.append_description", {
					chat: ct.value,
					speaker: tt.value?.speaker ?? ""
				}),
				"confirm-label": S(a)("opening.output.append_confirm"),
				"cancel-label": S(a)("common.actions.cancel"),
				pending: st.value,
				destructive: !1,
				onConfirm: n[22] ||= (e) => ct.value === null ? Q.value = !1 : lt()
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			I(me, {
				open: g.value,
				"onUpdate:open": n[23] ||= (e) => g.value = e,
				title: S(a)("opening.draft.delete_title", { name: s.value?.display_name ?? "" }),
				description: S(a)("opening.draft.delete_description"),
				"confirm-label": S(a)("common.actions.delete"),
				"cancel-label": S(a)("common.actions.cancel"),
				pending: x.value,
				onConfirm: O
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 2));
	}
}), Ot = ["aria-label"], kt = ["aria-current", "onClick"], At = ["id", "value"], jt = [
	"value",
	"disabled",
	"aria-label",
	"onInput"
], Mt = [
	"value",
	"disabled",
	"aria-label",
	"placeholder",
	"onInput"
], Nt = /* @__PURE__ */ F({
	__name: "OpeningTemplates",
	props: /*@__PURE__*/ u({
		store: {},
		templates: {},
		saveError: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: ["update:section"],
	setup(e) {
		let t = e, n = _(e, "section"), { t: r } = D(), i = M(Me), a = k(() => t.templates.find((e) => e.id === i.value) ?? t.templates[0] ?? null), o = k(() => a.value !== null && !a.value.builtin), s = k(() => [{
			value: "entries",
			label: r("opening.templates.output_entries")
		}, {
			value: "message",
			label: r("opening.templates.output_message")
		}]);
		async function c(e) {
			let n = e === null ? [{
				id: crypto.randomUUID(),
				name: r("opening.templates.new_step"),
				instruction: "",
				max_rounds: 2,
				output: "entries"
			}] : e.steps.map((e) => ({
				...e,
				id: crypto.randomUUID()
			})), a = {
				id: crypto.randomUUID(),
				builtin: !1,
				kind: "template",
				display_name: e === null ? r("opening.templates.new_name") : r("opening.templates.copy_name", { name: e.display_name }),
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				steps: n
			};
			await t.store.add(a), i.value = a.id;
		}
		function l(e, n = !1) {
			a.value !== null && o.value && t.store.edit(a.value, e, { debounce: n });
		}
		function u(e, t, n = !1) {
			l((n) => {
				let r = n.steps[e];
				r !== void 0 && t(r);
			}, n);
		}
		function f(e, t) {
			l((n) => {
				let r = e + t, i = n.steps[e], a = n.steps[r];
				i !== void 0 && a !== void 0 && (n.steps[e] = a, n.steps[r] = i);
			});
		}
		function m() {
			l((e) => {
				e.steps.length < 12 && e.steps.push({
					id: crypto.randomUUID(),
					name: r("opening.templates.new_step"),
					instruction: "",
					max_rounds: 2,
					output: "entries"
				});
			});
		}
		function h(e) {
			l((t) => {
				t.steps.length > 1 && t.steps.splice(e, 1);
			});
		}
		function g(e, t) {
			(t === "entries" || t === "message") && u(e, (e) => {
				e.output = t;
			});
		}
		let v = M(!1);
		async function b() {
			let e = a.value;
			e !== null && !e.builtin && (await t.store.remove(e.id), v.value = !1, i.value = Me);
		}
		return (t, _) => (d(), y("div", { class: A(S(Z).layout) }, [
			E("aside", {
				class: A(S(Z).aside),
				"aria-label": S(r)("opening.templates.list_label")
			}, [
				I(z, {
					class: A(S(Z).aside_new),
					icon: S(H),
					label: S(r)("opening.templates.new"),
					onClick: _[0] ||= (e) => c(null)
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				E("div", { class: A(S(Z).aside_title) }, w(S(r)("opening.templates.list_title")), 3),
				(d(!0), y(N, null, p(e.templates, (e) => (d(), y("button", {
					key: e.id,
					type: "button",
					class: A(["tc-interactive", S(Z).item]),
					"aria-current": e.id === a.value?.id ? "true" : void 0,
					onClick: (t) => i.value = e.id
				}, [E("span", { class: A(S(Z).item_name) }, w(e.display_name), 3), E("span", { class: A(S(Z).item_meta) }, w(e.builtin ? S(r)("opening.templates.builtin_meta", { n: e.steps.length }) : S(r)("opening.templates.meta", { n: e.steps.length })), 3)], 10, kt))), 128))
			], 10, Ot),
			E("div", { class: A(S(Z).work) }, [a.value === null ? C("", !0) : (d(), y("div", {
				key: 0,
				class: A(S(Z).work_inner)
			}, [
				E("div", { class: A(S(Z).topline) }, [
					I(Be, {
						modelValue: n.value,
						"onUpdate:modelValue": _[1] ||= (e) => n.value = e
					}, null, 8, ["modelValue"]),
					E("span", { class: A(S(Z).spacer) }, null, 2),
					I(z, {
						icon: S(ie),
						label: S(r)("opening.templates.copy"),
						variant: "ghost",
						onClick: _[2] ||= (e) => c(a.value)
					}, null, 8, ["icon", "label"]),
					o.value ? (d(), T(G, {
						key: 0,
						icon: S(le),
						label: S(r)("opening.templates.delete"),
						destructive: "",
						onClick: _[3] ||= (e) => v.value = !0
					}, null, 8, ["icon", "label"])) : C("", !0)
				], 2),
				e.saveError === null ? C("", !0) : (d(), y("p", {
					key: 0,
					class: A(S(Z).error),
					role: "alert"
				}, w(S(r)("opening.errors.save", { reason: e.saveError })), 3)),
				E("div", { class: A(S(Z).work_head) }, [o.value ? (d(), T(U, {
					key: 1,
					label: S(r)("opening.templates.name_label")
				}, {
					default: j(({ fieldId: e }) => [E("input", {
						id: e,
						value: a.value.display_name,
						class: A(S(Z).input),
						maxlength: "60",
						onInput: _[4] ||= (e) => {
							l((t) => {
								t.display_name = e.target.value;
							}, !0);
						}
					}, null, 42, At)]),
					_: 1
				}, 8, ["label"])) : (d(), y("h1", {
					key: 0,
					class: A(S(Z).work_title)
				}, w(a.value.display_name), 3)), E("p", { class: A(S(Z).work_description) }, w(o.value ? S(r)("opening.templates.hint") : S(r)("opening.templates.builtin_hint")), 3)], 2),
				(d(!0), y(N, null, p(a.value.steps, (e, t) => (d(), y("div", {
					key: e.id,
					class: A(S(Z).template_step)
				}, [
					E("span", { class: A(S(Z).template_number) }, w(t + 1), 3),
					E("div", { class: A(S(Z).template_fields) }, [E("input", {
						value: e.name,
						class: A(S(Z).input),
						maxlength: "40",
						disabled: !o.value,
						"aria-label": S(r)("opening.templates.step_name", { n: t + 1 }),
						onInput: (e) => {
							u(t, (t) => {
								t.name = e.target.value;
							}, !0);
						}
					}, null, 42, jt), E("textarea", {
						value: e.instruction,
						class: A(S(Z).text_area_small),
						maxlength: "2000",
						disabled: !o.value,
						"aria-label": S(r)("opening.templates.step_instruction", { n: t + 1 }),
						placeholder: S(r)("opening.templates.instruction_placeholder"),
						onInput: (e) => {
							u(t, (t) => {
								t.instruction = e.target.value;
							}, !0);
						}
					}, null, 42, Mt)], 2),
					E("div", { class: A(S(Z).template_side) }, [
						E("span", { class: A(S(Z).hint) }, w(S(r)("opening.templates.rounds_label")), 3),
						I(pe, {
							"model-value": e.max_rounds,
							label: S(r)("opening.templates.rounds_label"),
							"increment-label": S(r)("opening.templates.rounds_up"),
							"decrement-label": S(r)("opening.templates.rounds_down"),
							min: 0,
							max: S(3),
							disabled: !o.value,
							"onUpdate:modelValue": (e) => u(t, (t) => {
								t.max_rounds = e ?? 0;
							})
						}, null, 8, [
							"model-value",
							"label",
							"increment-label",
							"decrement-label",
							"max",
							"disabled",
							"onUpdate:modelValue"
						]),
						I(re, {
							"model-value": e.output,
							options: s.value,
							placeholder: S(r)("opening.templates.output_label"),
							"aria-label": S(r)("opening.templates.output_label"),
							disabled: !o.value,
							"onUpdate:modelValue": (e) => g(t, e)
						}, null, 8, [
							"model-value",
							"options",
							"placeholder",
							"aria-label",
							"disabled",
							"onUpdate:modelValue"
						]),
						o.value ? (d(), y("div", {
							key: 0,
							class: A(S(Z).row)
						}, [
							I(G, {
								icon: S(ye),
								label: S(r)("opening.templates.move_up"),
								size: "sm",
								disabled: t === 0,
								onClick: (e) => f(t, -1)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]),
							I(G, {
								icon: S(_e),
								label: S(r)("opening.templates.move_down"),
								size: "sm",
								disabled: t === a.value.steps.length - 1,
								onClick: (e) => f(t, 1)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]),
							I(G, {
								icon: S(le),
								label: S(r)("opening.templates.remove_step"),
								size: "sm",
								destructive: "",
								disabled: a.value.steps.length === 1,
								onClick: (e) => h(t)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							])
						], 2)) : C("", !0)
					], 2)
				], 2))), 128)),
				o.value ? (d(), y("div", {
					key: 1,
					class: A(S(Z).row)
				}, [I(z, {
					icon: S(H),
					label: S(r)("opening.templates.add_step"),
					disabled: a.value.steps.length >= S(12),
					onClick: m
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				])], 2)) : C("", !0)
			], 2))], 2),
			I(me, {
				open: v.value,
				"onUpdate:open": _[5] ||= (e) => v.value = e,
				title: S(r)("opening.templates.delete_title", { name: a.value?.display_name ?? "" }),
				description: S(r)("opening.templates.delete_description"),
				"confirm-label": S(r)("common.actions.delete"),
				"cancel-label": S(r)("common.actions.cancel"),
				onConfirm: b
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			])
		], 2));
	}
}), $ = { type: "string" }, Pt = {
	type: "object",
	properties: {
		text: $,
		why: $,
		multiple: { type: "boolean" },
		options: {
			type: "array",
			items: {
				type: "object",
				properties: {
					label: $,
					detail: $
				},
				required: ["label", "detail"],
				additionalProperties: !1
			}
		}
	},
	required: [
		"text",
		"why",
		"multiple",
		"options"
	],
	additionalProperties: !1
}, Ft = {
	type: "object",
	properties: {
		title: $,
		constant: { type: "boolean" },
		keys: {
			type: "array",
			items: $
		},
		content: $
	},
	required: [
		"title",
		"constant",
		"keys",
		"content"
	],
	additionalProperties: !1
}, It = {
	name: "tavern_canvas_opening_entries",
	value: {
		type: "object",
		properties: { entries: {
			type: "array",
			items: Ft
		} },
		required: ["entries"],
		additionalProperties: !1
	}
}, Lt = {
	name: "tavern_canvas_opening_entry",
	value: {
		type: "object",
		properties: { entry: Ft },
		required: ["entry"],
		additionalProperties: !1
	}
}, Rt = {
	name: "tavern_canvas_opening_message",
	value: {
		type: "object",
		properties: {
			speaker: $,
			text: $
		},
		required: ["speaker", "text"],
		additionalProperties: !1
	}
}, zt = [
	"[Inkwell opening builder]",
	"You help the user build the opening of a roleplay story one step at a time: its world, characters, rules and first scene.",
	"Write every value in the language of the user's description.",
	"The user's own character is {{user}}. Refer to them only as {{user}} and never decide their appearance, personality or past.",
	"Keep everything consistent with what is settled below and with any world info you were given."
];
function Bt(e) {
	let t = [...e.selected, ...e.other.trim() === "" ? [] : [e.other.trim()]];
	return `- Q: ${e.question.text}\n  A: ${t.length === 0 ? "(left to you)" : t.join("; ")}`;
}
function Vt(e) {
	let t = e.constant ? "always active" : `keys: ${e.keys.join(", ")}`;
	return `- ${e.title} (${t}): ${e.content}`;
}
function Ht(e, t) {
	let n = [];
	return e.steps.slice(0, t).forEach((t, r) => {
		let i = e.states[r];
		i === void 0 || i.status !== "done" && i.status !== "stale" || (n.push(`## ${t.name}`), n.push(...i.entries.map(Vt)), i.message !== null && n.push(`- Opening message by ${i.message.speaker}: ${i.message.text}`));
	}), n.length === 0 ? ["(nothing yet)"] : n;
}
function Ut(e) {
	let { card: t } = e;
	if (t === null) return [];
	let n = (e, t) => t.trim() === "" ? [] : [`${e}: ${t.trim()}`], r = e.use_greeting && t.first_message.trim() !== "" ? [
		"",
		"The card's first message, which also describes the world:",
		t.first_message.trim()
	] : [];
	return [
		"",
		`Character card of ${t.name} (background; keep everything consistent with it):`,
		...n("Description", t.description),
		...n("Personality", t.personality),
		...n("Scenario", t.scenario),
		...r
	];
}
function Wt(e, t) {
	let n = e.steps[t], r = e.states[t];
	if (n === void 0 || r === void 0) throw RangeError(`The draft has no step ${String(t)}`);
	return [
		...zt,
		"",
		"The user's description:",
		e.description.trim(),
		...Ut(e),
		"",
		"Settled so far:",
		...Ht(e, t),
		"",
		`Current step: ${n.name}`,
		`What this step settles: ${n.instruction}`,
		"",
		"Answers given in this step:",
		...r.answers.length === 0 ? ["(none)"] : r.answers.map(Bt)
	];
}
function Gt(e) {
	let { card: t } = e;
	return [
		e.description,
		...t === null ? [] : [t.description, t.scenario],
		...t !== null && e.use_greeting ? [t.first_message] : [],
		...e.states.flatMap((e) => [...e.answers.flatMap((e) => [...e.selected, e.other]), ...e.entries.map((e) => `${e.title} ${e.content}`)])
	].join("\n");
}
function Kt(e, t, n, r) {
	for (let r of de(e, t)) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let t = n.safeParse(e);
		if (t.success) return t.data;
	}
	throw new W(`The reply contains no ${r} JSON object`, e);
}
var qt = a((e) => typeof e == "object" && e && "options" in e && Array.isArray(e.options) ? {
	...e,
	options: e.options.slice(0, 5)
} : e, Te), Jt = t({
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: o(n()).transform((e) => [...new Set(e.map((e) => e.trim()).filter((e) => e !== ""))].slice(0, 12)),
	content: n().trim().min(1).max(8e3)
}), Yt = 30;
function Xt(e) {
	return {
		id: crypto.randomUUID(),
		...e,
		keys: e.constant ? [] : e.keys
	};
}
function Zt(e, t) {
	let n = e.slice(0, Yt).flatMap((e) => {
		let t = Jt.safeParse(e);
		return t.success ? [Xt(t.data)] : [];
	});
	if (n.length === 0) throw new W("The reply contains no valid entry", t);
	return {
		entries: n,
		dropped: e.length - n.length
	};
}
function Qt(e, t) {
	return e.filter((e) => e.name === t).flatMap((e) => {
		try {
			return [JSON.parse(e.arguments)];
		} catch {
			return [null];
		}
	});
}
var $t = [
	"- One entry per distinct thing: the world overview, each faction, each place, each character, each group of rules.",
	"- title: '<kind>｜<name>', both in the language of the description, for example a faction, a place or a character.",
	"- constant: true only for what must always be in context: the world overview, hard rules of the world, narration and style requirements, content boundaries. Otherwise false.",
	"- keys: when constant is false, 1 to 5 words or names that appear in the story whenever this entry matters; [] when constant is true.",
	"- content: self-contained prose a storyteller can rely on, without referring to other entries by number."
], en = [
	"The opening message is the first message of the roleplay, sent by the character who meets {{user}} first.",
	"- speaker: that character's name.",
	"- text: the whole message, following the narration person, style and length settled above, ending at a moment {{user}} can answer. Do not speak or act for {{user}}."
], tn = ["Ask only about a choice that changes what this step writes and that the description and the answers leave open. Never ask about anything already settled.", "A question has the question text, a one-sentence reason it matters (why), and 3 or 4 options, each a short label with a one-sentence detail. Set multiple to true only when several options can hold at once. Do not add an 'other' option; the user can always type their own."], nn = "ask_question", rn = "add_entry", an = "write_message", on = t({ entries: o(l()).min(1) });
function sn(e, t) {
	let n = [
		...Wt(e, t),
		"",
		"Now write this step's result as world book entries.",
		...$t
	], r = (e) => Zt(Kt(e, "entries", on, "entries").entries, e);
	return {
		user_input: [...n, "Reply with only a JSON object of the form {\"entries\": [...]}."].join("\n"),
		json_schema: It,
		parse: r,
		tools: {
			tools: [{
				name: rn,
				description: "Add one world book entry.",
				parameters: Ft
			}],
			choice: "required",
			user_input: [...n, `Call ${rn} once for each entry, all in this reply.`].join("\n"),
			parse: (e, t) => {
				let n = Qt(e, rn);
				return n.length === 0 ? r(t) : Zt(n, t);
			}
		}
	};
}
var cn = {
	name: "tavern_canvas_opening_turn",
	value: {
		type: "object",
		properties: {
			question: { anyOf: [Pt, { type: "null" }] },
			entries: {
				type: "array",
				items: Ft
			}
		},
		required: ["question", "entries"],
		additionalProperties: !1
	}
}, ln = {
	name: "tavern_canvas_opening_turn",
	value: {
		type: "object",
		properties: {
			question: { anyOf: [Pt, { type: "null" }] },
			message: { anyOf: [Rt.value, { type: "null" }] }
		},
		required: ["question", "message"],
		additionalProperties: !1
	}
}, un = t({
	question: l().optional(),
	entries: o(l()).optional(),
	message: l().optional()
});
function dn(e, t, n) {
	let r = e.steps[t]?.output === "message", i = r ? en : ["The step's result is world book entries.", ...$t], a = [
		...Wt(e, t),
		"",
		`Either ask one more question before writing this step (at most ${String(n)} more may be asked in this step), or write the step now if nothing important is open.`,
		...tn,
		...i
	];
	function o(e, t, n) {
		let r = qt.safeParse(e);
		if (r.success) return {
			kind: "question",
			question: r.data
		};
		if (e != null) throw new W("The reply asks a malformed question", n);
		return t();
	}
	let s = (e) => {
		let t = Kt(e, "question", un, "opening turn");
		return o(t.question, () => {
			if (r) {
				let n = Ee.safeParse(t.message);
				if (!n.success) throw new W("The reply contains no opening message", e);
				return {
					kind: "message",
					message: n.data
				};
			}
			return {
				kind: "entries",
				...Zt(t.entries ?? [], e)
			};
		}, e);
	};
	return {
		user_input: [...a, r ? "Reply with only a JSON object of the form {\"question\": {...} or null, \"message\": {\"speaker\": \"...\", \"text\": \"...\"} or null}: a question and a null message, or a null question and the message." : "Reply with only a JSON object of the form {\"question\": {...} or null, \"entries\": [...]}: a question and no entries, or a null question and the entries."].join("\n"),
		json_schema: r ? ln : cn,
		parse: s,
		tools: {
			tools: [{
				name: nn,
				description: "Ask the user one question with options.",
				parameters: Pt
			}, r ? {
				name: an,
				description: "Write the opening message.",
				parameters: Rt.value
			} : {
				name: rn,
				description: "Add one world book entry.",
				parameters: Ft
			}],
			choice: "required",
			user_input: [...a, r ? `Call ${nn} once to ask, or ${an} once to write the message.` : `Call ${nn} once to ask, or ${rn} once for each entry, all in this reply, to write the step.`].join("\n"),
			parse: (e, t) => {
				let [n] = Qt(e, nn);
				return e.length === 0 ? s(t) : o(n ?? null, () => {
					if (r) {
						let n = Ee.safeParse(Qt(e, an)[0]);
						if (!n.success) throw new W("The reply contains no opening message", t);
						return {
							kind: "message",
							message: n.data
						};
					}
					return {
						kind: "entries",
						...Zt(Qt(e, rn), t)
					};
				}, t);
			}
		}
	};
}
function fn(e, n, r) {
	return {
		user_input: [
			...Wt(e, n),
			"",
			"Entries this step already has:",
			...(e.states[n]?.entries ?? []).map(Vt),
			"",
			`Rewrite only this entry, keeping its subject and fitting everything above: ${Vt(r)}`,
			...$t.slice(1),
			"Reply with only a JSON object of the form {\"entry\": {...}}."
		].join("\n"),
		json_schema: Lt,
		parse: (e) => ({
			...Xt(Kt(e, "entry", t({ entry: Jt }), "entry").entry),
			id: r.id
		})
	};
}
function pn(e, t) {
	return {
		user_input: [
			...Wt(e, t),
			"",
			"Now write the opening message.",
			...en,
			"Reply with only a JSON object of the form {\"speaker\": \"...\", \"text\": \"...\"}."
		].join("\n"),
		json_schema: Rt,
		parse: (e) => Kt(e, "text", Ee, "opening message")
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_flow.ts
function mn(e, t) {
	let n = O(/* @__PURE__ */ new Map()), r = O(/* @__PURE__ */ new Map()), i = O(/* @__PURE__ */ new Map());
	function a(e, n, r) {
		i.set(e.id, r.kind === "entries" ? r.dropped : 0), t.edit(e, (e) => {
			let t = e.states[n];
			t !== void 0 && (t.question = null, t.status = "done", r.kind === "entries" ? t.entries = r.entries : t.message = r.message), Ie(e, n);
		});
	}
	function o(e) {
		return {
			connection: e.connection,
			preset_name: e.preset_name,
			worldbooks: e.worldbooks,
			text: Gt(e)
		};
	}
	async function s(e, t, i) {
		if (n.has(e.id)) return !1;
		n.set(e.id, t), r.delete(e.id);
		try {
			return await i(), !0;
		} catch (t) {
			return r.set(e.id, t), !1;
		} finally {
			n.delete(e.id);
		}
	}
	async function c(t, n) {
		let r = t.steps[n];
		r !== void 0 && await s(t, {
			kind: "generate",
			step: n
		}, async () => {
			r.output === "message" ? a(t, n, {
				kind: "message",
				message: await e.request(pn(t, n), o(t))
			}) : a(t, n, {
				kind: "entries",
				...await e.request(sn(t, n), o(t))
			});
		});
	}
	async function l(n, r) {
		let i = n.steps[r], l = n.states[r];
		if (i === void 0 || l === void 0) return;
		t.edit(n, (e) => {
			e.current = r;
			let t = e.states[r];
			t !== void 0 && (t.status = "asking");
		});
		let u = i.max_rounds - l.answers.length;
		if (u <= 0) {
			await c(n, r);
			return;
		}
		await s(n, {
			kind: "question",
			step: r
		}, async () => {
			let i = await e.request(dn(n, r, u), o(n));
			if (i.kind !== "question") {
				a(n, r, i);
				return;
			}
			t.edit(n, (e) => {
				let t = e.states[r];
				t !== void 0 && (t.question = i.question);
			});
		});
	}
	return {
		busy: (e) => n.get(e) ?? null,
		error: (e) => r.get(e) ?? null,
		dropped: (e) => i.get(e) ?? 0,
		run_step: l,
		generate: c,
		async answer(e, n, r) {
			let i = e.current, a = e.states[i]?.question;
			a != null && (t.edit(e, (e) => {
				let t = e.states[i];
				t !== void 0 && (t.answers.push({
					question: a,
					selected: [...n],
					other: r.trim()
				}), t.question = null);
			}), await l(e, i));
		},
		async skip(e) {
			t.edit(e, (e) => {
				let t = e.states[e.current];
				t !== void 0 && (t.question = null);
			}), await c(e, e.current);
		},
		reask(e, n, r) {
			t.edit(e, (e) => {
				let t = e.states[n], i = t?.answers[r];
				t !== void 0 && i !== void 0 && (t.answers = t.answers.slice(0, r), t.question = i.question, t.status = "asking", e.current = n, Ie(e, n));
			});
		},
		async next(e) {
			let n = e.current + 1, r = e.states[n];
			r !== void 0 && (t.edit(e, (e) => {
				e.current = n;
			}), r.status === "pending" && await l(e, n));
		},
		async regenerate_stale(e) {
			for (let t = 0; t < e.steps.length; t += 1) if (e.states[t]?.status === "stale" && (await c(e, t), r.has(e.id))) return;
		},
		async rewrite_entry(n, r, i) {
			await s(n, {
				kind: "rewrite",
				step: r,
				entry_id: i.id
			}, async () => {
				let a = await e.request(fn(n, r, i), o(n));
				t.edit(n, (e) => {
					let t = e.states[r]?.entries, n = t?.findIndex((e) => e.id === i.id) ?? -1;
					t !== void 0 && n >= 0 && (t[n] = a), Ie(e, r);
				});
			});
		}
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_messages.ts
var hn = {
	en: async () => (await import("./opening_en-S0jZZdno.js")).en_messages,
	"zh-CN": async () => (await import("./opening_zh_cn-G-FkmPX_.js")).zh_cn_messages
};
function gn() {
	let e = D({ useScope: "global" }), t = M(!1);
	async function n(n) {
		for (let t of /* @__PURE__ */ new Set(["en", n])) {
			let n = hn[t];
			n !== void 0 && !e.te("opening.title", t) && e.mergeLocaleMessage(t, await n());
		}
		t.value = !0;
	}
	return v(e.locale, (e) => {
		n(e);
	}, { immediate: !0 }), t;
}
//#endregion
//#region src/ui/views/opening/use_opening_store.ts
var _n = 600;
function vn(e) {
	if (e.kind === "draft") {
		let { id: t, ...n } = e;
		return Ae.parse(Re(n));
	}
	let { id: t, builtin: n, ...r } = e;
	return je.parse(Re(r));
}
function yn(e) {
	let t = O(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	function i(e) {
		return t.get(e.id) ?? (e.payload.kind === "template" ? Le(e) : X(e));
	}
	let a = k(() => {
		let n = e.records().map(i).filter((e) => e !== null);
		for (let e of t.values()) n.some((t) => t.id === e.id) || n.push(e);
		return n.sort((e, t) => t.created_at.localeCompare(e.created_at));
	}), o = k(() => a.value.filter((e) => e.kind === "draft")), s = k(() => a.value.filter((e) => e.kind === "template"));
	function c(n) {
		let r = t.get(n);
		if (r !== void 0) return r;
		let a = e.records().find((e) => e.id === n), o = a === void 0 ? null : i(a);
		return o === null ? null : (t.set(n, o), t.get(n) ?? null);
	}
	function l(i) {
		let a = r.get(i);
		a !== void 0 && (clearTimeout(a), r.delete(i));
		let o = (n.get(i) ?? Promise.resolve()).then(async () => {
			let n = t.get(i);
			n !== void 0 && await e.save({
				id: i,
				category: "opening",
				record_key: i,
				display_name: n.display_name,
				payload: vn(n)
			});
		}).catch(e.on_save_error);
		return n.set(i, o), o;
	}
	return {
		drafts: o,
		templates: s,
		draft(e) {
			let t = c(e);
			return t?.kind === "draft" ? t : null;
		},
		template(e) {
			let t = c(e);
			return t?.kind === "template" ? t : null;
		},
		async add(e) {
			t.set(e.id, e), await l(e.id);
		},
		edit(e, t, n = { debounce: !1 }) {
			let i = c(e.id);
			if (i === null) return;
			if (t(i), !n.debounce) {
				l(e.id);
				return;
			}
			let a = r.get(e.id);
			a !== void 0 && clearTimeout(a), r.set(e.id, setTimeout(() => {
				l(e.id);
			}, _n));
		},
		async remove(i) {
			let a = r.get(i);
			a !== void 0 && (clearTimeout(a), r.delete(i)), await n.get(i), t.delete(i), n.delete(i), await e.remove(i);
		}
	};
}
//#endregion
//#region src/ui/views/opening/OpeningView.vue
var bn = /* @__PURE__ */ F({
	__name: "OpeningView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = g(ee, null), i = gn(), a = M(null);
		function o(e) {
			return e instanceof Error ? e.message : String(e);
		}
		let s = yn({
			records: () => t.state.assets.records.opening,
			save: (e) => t.controller.save_asset("opening", e),
			remove: (e) => t.controller.remove_asset("opening", e),
			on_save_error: (e) => {
				a.value = o(e);
			}
		}), c = r === null ? null : mn(r, s), l = M("build"), u = x(null), f = M(null), p = M({
			books: [],
			presets: ["in_use"],
			proxies: [],
			chat_book: null
		});
		function h() {
			let e = u.value;
			if (e !== null) try {
				p.value = {
					books: e.list_worldbooks(),
					presets: e.preset_names(),
					proxies: e.proxy_preset_names(),
					chat_book: e.chat_worldbook()
				};
			} catch (e) {
				f.value = o(e);
			}
		}
		m(async () => {
			if (r !== null) try {
				u.value = await r.host(), h();
			} catch (e) {
				f.value = o(e);
			}
		});
		function _(e) {
			switch (e) {
				case "genre": return {
					name: n("opening.builtin.genre_name"),
					instruction: n("opening.builtin.genre_text")
				};
				case "world": return {
					name: n("opening.builtin.world_name"),
					instruction: n("opening.builtin.world_text")
				};
				case "cast": return {
					name: n("opening.builtin.cast_name"),
					instruction: n("opening.builtin.cast_text")
				};
				case "rules": return {
					name: n("opening.builtin.rules_name"),
					instruction: n("opening.builtin.rules_text")
				};
				case "opening": return {
					name: n("opening.builtin.opening_name"),
					instruction: n("opening.builtin.opening_text")
				};
			}
		}
		let v = k(() => i.value ? [Pe(_, n("opening.builtin.name")), ...s.templates.value] : []);
		return (e, t) => S(i) ? S(r) === null || S(c) === null ? (d(), T(B, {
			key: 1,
			status: "empty",
			"empty-title": S(n)("opening.unavailable_title"),
			"empty-message": S(n)("opening.unavailable_message")
		}, null, 8, ["empty-title", "empty-message"])) : (d(), y(N, { key: 2 }, [l.value === "build" ? (d(), T(Dt, {
			key: 0,
			section: l.value,
			"onUpdate:section": t[0] ||= (e) => l.value = e,
			store: S(s),
			flow: S(c),
			host: u.value,
			"host-error": f.value,
			lists: p.value,
			templates: v.value,
			"save-error": a.value,
			onRefreshLists: h
		}, null, 8, [
			"section",
			"store",
			"flow",
			"host",
			"host-error",
			"lists",
			"templates",
			"save-error"
		])) : l.value === "books" ? (d(), T(Xe, {
			key: 1,
			section: l.value,
			"onUpdate:section": t[1] ||= (e) => l.value = e,
			host: u.value,
			"host-error": f.value,
			lists: p.value,
			onRefreshLists: h
		}, null, 8, [
			"section",
			"host",
			"host-error",
			"lists"
		])) : (d(), T(Nt, {
			key: 2,
			section: l.value,
			"onUpdate:section": t[2] ||= (e) => l.value = e,
			store: S(s),
			templates: v.value,
			"save-error": a.value
		}, null, 8, [
			"section",
			"store",
			"templates",
			"save-error"
		]))], 64)) : (d(), T(B, {
			key: 0,
			status: "loading"
		}));
	}
});
//#endregion
export { bn as default };
