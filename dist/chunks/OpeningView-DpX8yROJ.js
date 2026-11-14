import { c as e, d as t, g as n, i as r, o as i, p as a, r as o, t as s, u as c } from "./schemas-BjkyCQYG.js";
import { D as l, F as u, J as d, L as f, M as p, O as m, T as h, U as g, W as _, _ as v, a as y, at as b, dt as x, g as S, gt as C, h as w, m as T, n as E, nt as D, p as O, pt as k, q as A, rt as j, u as M, v as N, x as P, y as F } from "./vue-i18n-XoxYzLIP.js";
import { t as I } from "./opening_port-CFwXS5qA.js";
import { n as L, t as R } from "./AppIcon-DD754F_c.js";
import { t as z } from "./book-open-BFHVGETM.js";
import { n as B, r as ee, t as V } from "./StateSurface-C9eJEtTP.js";
import { t as te } from "./AppSelect-DKz1dWBv.js";
import { n as ne, t as re } from "./download-Dg_p_zFU.js";
import { t as ie } from "./AppCheckbox-mwSAcdjr.js";
import { n as ae, t as H } from "./refresh-cw-BPQB33rx.js";
import { n as oe, t as U } from "./FieldGroup-D8VsaFMT.js";
import { t as se } from "./sparkles-DIwEk888.js";
import { t as ce } from "./trash-2-Cl_9_CUX.js";
import { n as le } from "./deferred_stylesheets-DhfsdqPo.js";
import { t as ue } from "./analysis_error-a25bWfWj.js";
import { t as W } from "./model_json-B2EVqBvs.js";
import { n as de, t as fe } from "./NumberStepper-BUxNPDyt.js";
import { t as G } from "./IconButton-CPI-A0bT.js";
import { t as pe } from "./ConfirmDialog-BMpZdMGH.js";
import { t as me } from "./AppSwitch-CRj_joeq.js";
import { t as he } from "./AppDialog-luZAyPaX.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/arrow-down.js
var ge = L("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]), _e = L("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), K = L("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), ve = L("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]), ye = L("chevrons-right", [["path", {
	d: "m6 17 5-5-5-5",
	key: "xnjwq"
}], ["path", {
	d: "m13 17 5-5-5-5",
	key: "17xmmf"
}]]), be = L("file-text", [
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
]), xe = L("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]), Se = L("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]), Ce = t({
	id: n().min(1),
	name: n().max(40),
	instruction: n().max(2e3),
	max_rounds: c().int().min(0).max(3),
	output: s(["entries", "message"])
}), we = t({
	label: n().trim().min(1).max(80),
	detail: n().max(240)
}), q = t({
	text: n().trim().min(1).max(240),
	why: n().max(240),
	multiple: r(),
	options: o(we).min(2).max(5)
}), Te = t({
	question: q,
	selected: o(n()),
	other: n()
}), J = t({
	id: n().min(1),
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: o(n().trim().min(1).max(80)).max(12),
	content: n().max(8e3)
}), Y = t({
	speaker: n().trim().min(1).max(80),
	text: n().min(1).max(2e4)
}), Ee = t({
	status: s([
		"pending",
		"asking",
		"done",
		"stale"
	]),
	answers: o(Te),
	question: q.nullable(),
	entries: o(J),
	message: Y.nullable()
}), De = i("kind", [
	t({ kind: e("analysis") }),
	t({ kind: e("current") }),
	t({
		kind: e("proxy_preset"),
		proxy_preset: n().min(1)
	})
]), Oe = t({
	name: n(),
	description: n(),
	personality: n(),
	scenario: n(),
	first_message: n()
}), ke = t({
	kind: e("draft"),
	display_name: n(),
	created_at: n(),
	description: n().max(4e3),
	template_name: n(),
	steps: o(Ce).min(1).max(12),
	states: o(Ee),
	current: c().int().min(0),
	started: r(),
	connection: De,
	preset_name: n().min(1),
	worldbooks: o(n()).max(20),
	card: Oe.nullable().default(null),
	use_greeting: r().default(!1)
}), Ae = t({
	kind: e("template"),
	display_name: n().max(60),
	created_at: n(),
	steps: o(Ce).min(1).max(12)
}), je = "builtin-default", Me = [
	"genre",
	"world",
	"cast",
	"rules",
	"opening"
];
function Ne(e, t) {
	let n = {
		genre: 2,
		world: 3,
		cast: 3,
		rules: 2,
		opening: 1
	};
	return {
		id: je,
		builtin: !0,
		kind: "template",
		display_name: t,
		created_at: "1970-01-01T00:00:00.000Z",
		steps: Me.map((t) => ({
			id: t,
			...e(t),
			max_rounds: n[t],
			output: t === "opening" ? "message" : "entries"
		}))
	};
}
function Pe() {
	return {
		status: "pending",
		answers: [],
		question: null,
		entries: [],
		message: null
	};
}
function Fe(e, t) {
	e.states.forEach((e, n) => {
		n > t && (e.status === "done" || e.status === "stale") && (e.status = "stale");
	});
}
function Ie(e) {
	let t = ke.safeParse(e.payload);
	if (!t.success) return null;
	let n = t.data;
	for (; n.states.length < n.steps.length;) n.states.push(Pe());
	return n.states.length = n.steps.length, {
		...n,
		current: Math.min(n.current, n.steps.length - 1),
		id: e.id
	};
}
function X(e) {
	let t = Ae.safeParse(e.payload);
	return t.success ? {
		...t.data,
		id: e.id,
		builtin: !1
	} : null;
}
function Le(e) {
	return JSON.parse(JSON.stringify(e));
}
var Re = {
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
le("opening", "._layout_g6bg9_5{grid-template-columns:248px minmax(0,1fr);min-height:100%;display:grid}._aside_g6bg9_11{align-self:start;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-3) var(--tc-space-4);flex-direction:column;display:flex;overflow:auto}._aside_new_g6bg9_20{margin:0 var(--tc-space-1) var(--tc-space-2)}._aside_title_g6bg9_24{padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._item_g6bg9_30{color:var(--tc-text);text-align:start;border-radius:14px;gap:6px;padding:10px 12px;display:grid}._item_g6bg9_30:hover{background-color:var(--tc-surface-raised)}._item_g6bg9_30[aria-current=true]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border)}._item_name_g6bg9_48{font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._item_meta_g6bg9_56{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._dots_g6bg9_61{gap:3px;display:flex}._dot_g6bg9_61{background-color:var(--tc-divider);border-radius:999px;flex:1;height:4px}._dot_g6bg9_61[data-state=done]{background-color:var(--tc-accent)}._dot_g6bg9_61[data-state=asking]{background-color:var(--tc-marker)}._dot_g6bg9_61[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border)}._columns_g6bg9_86{grid-template-columns:minmax(0,1fr) 280px;min-width:0;display:grid}._work_g6bg9_92{min-width:0;padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-panel-padding)}._work_inner_g6bg9_97{gap:var(--tc-form-row-gap);max-width:760px;display:grid}._work_inner_g6bg9_97[data-wide]{max-width:none}._topline_g6bg9_107{gap:var(--tc-space-2) var(--tc-space-3);flex-wrap:wrap;align-items:center;display:flex}._spacer_g6bg9_114{flex:1}._compact_g6bg9_118[data-layout]{justify-self:start;width:auto}._work_head_g6bg9_123{gap:var(--tc-space-1);display:grid}._work_title_g6bg9_128{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);overflow-wrap:anywhere;margin:0}._work_description_g6bg9_137,._hint_g6bg9_138{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._error_g6bg9_145{color:var(--tc-error);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere;margin:0}._row_g6bg9_153{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._text_area_g6bg9_160{min-height:168px}._text_area_small_g6bg9_165{min-height:96px}._counter_g6bg9_174{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-align:end}._grid3_g6bg9_180{gap:var(--tc-space-4);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._chip_toggle_g6bg9_186{align-items:center;gap:var(--tc-space-1-5);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);height:32px;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);padding:0 14px;display:inline-flex}._chip_toggle_g6bg9_186[aria-pressed=true]{border-color:var(--tc-marker);background-color:var(--tc-marker);color:var(--tc-on-marker)}._steps_g6bg9_206{gap:var(--tc-space-1);flex-wrap:wrap;display:flex}._step_g6bg9_206{align-items:center;gap:var(--tc-space-2);background-color:var(--tc-surface);height:34px;box-shadow:0 0 0 1px var(--tc-divider);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);white-space:nowrap;border-radius:999px;padding:0 14px 0 6px;display:inline-flex}._step_g6bg9_206:disabled{cursor:default}._step_number_g6bg9_230{background-color:var(--tc-chip-bg);width:22px;height:22px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;display:grid}._step_g6bg9_206[data-state=done] ._step_number_g6bg9_230{background-color:var(--tc-accent);color:var(--tc-on-accent)}._step_g6bg9_206[aria-current=step]{background-color:var(--tc-marker);box-shadow:none;color:var(--tc-on-marker);font-weight:var(--tc-font-weight-semibold)}._step_g6bg9_206[aria-current=step] ._step_number_g6bg9_230{background-color:var(--tc-on-marker);color:var(--tc-marker)}._step_g6bg9_206[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._step_g6bg9_206[data-state=stale] ._step_number_g6bg9_230{border:1.5px dashed var(--tc-accent-border);background-color:#0000}._step_tag_g6bg9_269{color:var(--tc-text-muted);font-size:11px;font-weight:400}._banner_g6bg9_275{gap:var(--tc-space-2) var(--tc-space-3);padding:var(--tc-space-3) 14px;background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);border-radius:14px;flex-wrap:wrap;align-items:center;display:flex}._banner_g6bg9_275>span{flex:260px}._answered_g6bg9_293{gap:2px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:10px 14px;display:grid}._answered_question_g6bg9_305{color:var(--tc-text-muted)}._answered_answer_g6bg9_309{font-weight:var(--tc-font-weight-semibold);grid-column:1}._answered_g6bg9_293>:last-child{grid-area:1/2/3}._ask_g6bg9_319{background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border), 0 8px 24px var(--tc-shadow);border-radius:18px;gap:14px;padding:18px;display:grid}._ask_head_g6bg9_330{gap:var(--tc-space-2) 10px;flex-wrap:wrap;align-items:baseline;display:flex}._ask_title_g6bg9_337{font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg);margin:0}._badge_g6bg9_344{background-color:var(--tc-chip-bg);height:22px;color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);border-radius:999px;align-items:center;padding:0 8px;display:inline-flex}._options_g6bg9_355{gap:var(--tc-space-2);grid-template-columns:repeat(auto-fill,minmax(240px,1fr));display:grid}._option_g6bg9_355{gap:var(--tc-space-1) 10px;padding:var(--tc-space-3) 14px;border:1px solid var(--tc-divider);background-color:var(--tc-canvas);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:auto minmax(0,1fr);display:grid}._option_g6bg9_355[aria-checked=true]{border-color:var(--tc-accent-border);background-color:var(--tc-accent-soft)}._option_mark_g6bg9_378{border:1.5px solid var(--tc-border-field);background-color:var(--tc-field-bg);width:18px;height:18px;color:var(--tc-on-accent);border-radius:6px;grid-row:1/3;place-items:center;margin-top:2px;display:inline-grid}._option_mark_g6bg9_378[data-shape=radio]{border-radius:999px}._option_g6bg9_355[aria-checked=true] ._option_mark_g6bg9_378{border-color:var(--tc-accent);background-color:var(--tc-accent)}._option_label_g6bg9_400{font-weight:var(--tc-font-weight-semibold)}._option_detail_g6bg9_404{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);line-height:18px}._entries_g6bg9_411{gap:10px;display:grid}._entry_g6bg9_416{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);display:grid}._entry_head_g6bg9_425{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._entry_title_g6bg9_432{overflow-wrap:anywhere;font-size:15px;font-weight:650}._entry_content_g6bg9_438{font-size:var(--tc-font-size-sm);white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:21px}._pill_g6bg9_446{background-color:var(--tc-chip-bg);height:20px;color:var(--tc-text-muted);white-space:nowrap;border-radius:999px;align-items:center;padding:0 8px;font-size:11px;font-weight:600;display:inline-flex}._pill_g6bg9_446[data-tone=constant]{background-color:var(--tc-accent);color:var(--tc-on-accent)}._pill_g6bg9_446[data-tone=new]{background-color:var(--tc-marker);color:var(--tc-on-marker)}._pill_g6bg9_446[data-tone=modified]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._keys_g6bg9_475{gap:var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);flex-wrap:wrap;align-items:center;display:flex}._key_g6bg9_475{background-color:var(--tc-chip-bg);border-radius:999px;align-items:center;height:22px;padding:0 8px;display:inline-flex}._editor_g6bg9_493{padding:var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border);gap:14px;display:grid}._foot_g6bg9_502{gap:var(--tc-space-2);padding:var(--tc-space-3) 0;background-color:var(--tc-canvas);flex-wrap:wrap;align-items:center;display:flex;position:sticky;bottom:0}._bubble_g6bg9_514{gap:var(--tc-space-2);padding:var(--tc-space-4);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:18px;display:grid}._bubble_name_g6bg9_523{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._bubble_text_g6bg9_528{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:23px}._outputs_g6bg9_535{gap:var(--tc-space-3);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._output_g6bg9_535{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);align-content:start;display:grid}._output_title_g6bg9_551{gap:var(--tc-space-2);font-size:var(--tc-font-size-md);align-items:center;margin:0;display:flex}._known_g6bg9_560{gap:var(--tc-space-4);padding:var(--tc-space-3) var(--tc-space-4) var(--tc-space-4);border-left:1px solid var(--tc-divider);align-content:start;display:grid}._known_block_g6bg9_568{gap:6px;display:grid}._known_title_g6bg9_573{font-size:var(--tc-font-size-sm);margin:0;font-weight:700}._known_line_g6bg9_579{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere}._known_line_g6bg9_579 strong{color:var(--tc-text);font-weight:var(--tc-font-weight-semibold)}._known_toggle_g6bg9_591{display:none}._table_g6bg9_596{gap:6px;display:grid}._table_row_g6bg9_601{gap:var(--tc-space-3);padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:40px minmax(0,200px) minmax(0,1fr) 48px auto;align-items:center;display:grid}._table_row_g6bg9_601[data-off]{opacity:.55}._table_name_g6bg9_617{gap:var(--tc-space-1);font-weight:var(--tc-font-weight-semibold);overflow-wrap:anywhere;display:grid}._preview_g6bg9_624{color:var(--tc-text-muted);-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:19px;display:-webkit-box;overflow:hidden}._order_g6bg9_633{color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);text-align:center}._write_list_g6bg9_641{gap:6px;max-height:46vh;display:grid;overflow:auto}._write_row_g6bg9_648{padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:12px;grid-template-columns:auto auto minmax(0,1fr);align-items:start;gap:10px;display:grid}._write_row_g6bg9_648[data-status=same]{opacity:.6}._diff_g6bg9_664{font-size:var(--tc-font-size-xs);gap:2px;line-height:18px;display:grid}._diff_g6bg9_664 del{color:var(--tc-text-muted)}._diff_g6bg9_664 ins{background-color:var(--tc-accent-soft);text-decoration:none}._template_step_g6bg9_681{gap:10px var(--tc-space-3);padding:var(--tc-space-3) 14px;border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:auto minmax(0,1fr) auto;align-items:start;display:grid}._template_number_g6bg9_692{background-color:var(--tc-chip-bg);width:24px;height:24px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;margin-top:6px;display:grid}._template_fields_g6bg9_704{gap:var(--tc-space-2);min-width:0;display:grid}._template_side_g6bg9_710{gap:var(--tc-space-2);justify-items:end;display:grid}@container studio-workspace (width<=640px){._layout_g6bg9_5,._columns_g6bg9_86{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._aside_g6bg9_11{padding:var(--tc-space-1) var(--tc-space-4) var(--tc-space-2);scrollbar-width:none;flex-direction:row;overflow-x:auto}._aside_new_g6bg9_20{flex:none;margin:0}._aside_title_g6bg9_24,._item_meta_g6bg9_56,._dots_g6bg9_61{display:none}._item_g6bg9_30{max-width:200px;padding:6px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:999px;flex:none}._work_g6bg9_92{padding:var(--tc-space-2) var(--tc-space-4) var(--tc-space-4)}._work_title_g6bg9_128{font-size:22px;line-height:28px}._steps_g6bg9_206{scrollbar-width:none;flex-wrap:nowrap;overflow-x:auto}._step_g6bg9_206{flex:none}._step_g6bg9_206:not([aria-current=step]) ._step_label_g6bg9_769{display:none}._known_g6bg9_560{border-left:0;display:none}._known_g6bg9_560[data-open]{padding:0 var(--tc-space-4) var(--tc-space-4);display:grid}._known_toggle_g6bg9_591{display:inline-flex}._table_row_g6bg9_601{grid-template-columns:40px minmax(0,1fr) auto}._preview_g6bg9_624,._order_g6bg9_633{display:none}._template_step_g6bg9_681{grid-template-columns:minmax(0,1fr)}._template_number_g6bg9_692{display:none}._template_side_g6bg9_710{justify-items:start}}");
var Z = Re, ze = /* @__PURE__ */ P({
	__name: "OpeningSectionSwitch",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = g(e, "modelValue"), { t: n } = E(), r = O(() => [
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
		return (e, a) => (u(), w(de, {
			"model-value": t.value,
			class: k(x(Z).compact),
			options: r.value,
			label: x(n)("opening.sections.label"),
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
function Be(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region src/ui/views/opening/OpeningBooks.vue?vue&type=script&setup=true&lang.ts
var Ve = ["aria-label"], He = ["aria-current", "onClick"], Ue = ["placeholder", "aria-label"], We = ["id"], Ge = ["id", "aria-describedby"], Ke = ["id"], qe = ["data-off"], Je = ["aria-label"], Ye = /* @__PURE__ */ P({
	__name: "OpeningBooks",
	props: /*@__PURE__*/ l({
		host: {},
		hostError: {},
		lists: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: /*@__PURE__*/ l(["refresh-lists"], ["update:section"]),
	setup(e, { emit: t }) {
		let n = e, r = g(e, "section"), i = t, { t: a } = E(), o = j(n.lists.chat_book ?? n.lists.books[0] ?? null), s = j([]), c = j(!1), l = j(!1), p = j(null);
		async function h() {
			if (s.value = [], n.host !== null && o.value !== null) {
				c.value = !0, p.value = null;
				try {
					s.value = await n.host.read_entries(o.value);
				} catch (e) {
					p.value = a("opening.errors.failed", { reason: Be(e) });
				} finally {
					c.value = !1;
				}
			}
		}
		_(o, () => void h(), { immediate: !0 }), _(() => n.lists.books, (e) => {
			(o.value === null || !e.includes(o.value)) && (o.value = n.lists.chat_book ?? e[0] ?? null);
		});
		async function b(e) {
			if (n.host === null) return !1;
			l.value = !0, p.value = null;
			try {
				return await e(n.host), i("refresh-lists"), await h(), !0;
			} catch (e) {
				return p.value = a("opening.errors.failed", { reason: Be(e) }), !1;
			} finally {
				l.value = !1;
			}
		}
		let D = j(null), P = j(""), I = O(() => P.value.trim() !== o.value && n.lists.books.includes(P.value.trim()));
		function L(e) {
			P.value = e === "rename" ? o.value ?? "" : "", D.value = e;
		}
		async function R() {
			let e = P.value.trim(), t = D.value, n = o.value;
			e === "" || I.value || t === null || await b((r) => t === "create" || n === null ? r.create_worldbook(e) : r.rename_worldbook(n, e)) && (D.value = null, o.value = e);
		}
		let z = j(!1);
		async function ee() {
			let e = o.value;
			e !== null && await b((t) => t.delete_worldbook(e)) && (z.value = !1, o.value = null);
		}
		async function ne() {
			let e = o.value;
			e !== null && await b((t) => t.bind_chat_worldbook(e));
		}
		function re(e) {
			return e === n.lists.chat_book ? a("opening.books.bound") : "";
		}
		let ie = j(""), H = j("all"), se = O(() => [
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
		]), le = O(() => {
			let e = ie.value.trim().toLowerCase();
			return s.value.filter((t) => H.value === "constant" && !t.constant || H.value === "keyword" && t.constant ? !1 : e === "" || [
				t.name,
				t.content,
				...t.keys
			].some((t) => t.toLowerCase().includes(e)));
		}), ue = O(() => s.value.filter((e) => e.enabled).length), W = j(null);
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
		async function ge() {
			let e = W.value, t = o.value;
			if (e === null || t === null) return;
			let n = [...new Set(e.keys.split(/[,，、]/u).map((e) => e.trim()).filter((e) => e !== ""))];
			await b((r) => r.save_entries(t, {
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
			n !== null && await b((r) => r.save_entries(n, {
				upsert: [{
					...e,
					enabled: t
				}],
				remove: []
			}));
		}
		let K = j(null);
		async function ve() {
			let e = K.value, t = o.value;
			e !== null && t !== null && (await b((n) => n.save_entries(t, {
				upsert: [],
				remove: [e.uid]
			})), K.value = null);
		}
		return (t, n) => (u(), v("div", { class: k(x(Z).layout) }, [
			T("aside", {
				class: k(x(Z).aside),
				"aria-label": x(a)("opening.books.list_label")
			}, [
				F(B, {
					class: k(x(Z).aside_new),
					icon: x(oe),
					label: x(a)("opening.books.new"),
					disabled: e.host === null,
					onClick: n[0] ||= (e) => L("create")
				}, null, 8, [
					"class",
					"icon",
					"label",
					"disabled"
				]),
				e.lists.books.length > 0 ? (u(), v("div", {
					key: 0,
					class: k(x(Z).aside_title)
				}, C(x(a)("opening.books.list_title")), 3)) : S("", !0),
				(u(!0), v(M, null, f(e.lists.books, (e) => (u(), v("button", {
					key: e,
					type: "button",
					class: k(["tc-interactive", x(Z).item]),
					"aria-current": e === o.value ? "true" : void 0,
					onClick: (t) => o.value = e
				}, [T("span", { class: k(x(Z).item_name) }, C(e), 3), re(e) === "" ? S("", !0) : (u(), v("span", {
					key: 0,
					class: k(x(Z).item_meta)
				}, C(re(e)), 3))], 10, He))), 128))
			], 10, Ve),
			T("div", { class: k(x(Z).work) }, [T("div", {
				class: k(x(Z).work_inner),
				"data-wide": ""
			}, [T("div", { class: k(x(Z).topline) }, [
				F(ze, {
					modelValue: r.value,
					"onUpdate:modelValue": n[1] ||= (e) => r.value = e
				}, null, 8, ["modelValue"]),
				T("span", { class: k(x(Z).spacer) }, null, 2),
				o.value === null ? S("", !0) : (u(), v(M, { key: 0 }, [
					o.value !== e.lists.chat_book && e.host?.chat_name() !== null ? (u(), w(B, {
						key: 0,
						icon: x(xe),
						label: x(a)("opening.books.bind"),
						variant: "ghost",
						disabled: l.value,
						onClick: ne
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])) : S("", !0),
					F(B, {
						icon: x(ae),
						label: x(a)("opening.books.rename"),
						variant: "ghost",
						disabled: l.value,
						onClick: n[2] ||= (e) => L("rename")
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					]),
					F(G, {
						icon: x(ce),
						label: x(a)("opening.books.delete"),
						destructive: "",
						disabled: l.value,
						onClick: n[3] ||= (e) => z.value = !0
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])
				], 64))
			], 2), e.host === null ? (u(), w(V, {
				key: 0,
				status: "empty",
				"empty-title": x(a)("opening.books.unavailable_title"),
				"empty-message": e.hostError ?? x(a)("opening.books.unavailable_message")
			}, null, 8, ["empty-title", "empty-message"])) : o.value === null ? (u(), v("div", {
				key: 1,
				class: k(x(Z).work_head)
			}, [T("h1", { class: k(x(Z).work_title) }, C(x(a)("opening.books.title")), 3), T("p", { class: k(x(Z).work_description) }, C(x(a)("opening.books.empty")), 3)], 2)) : (u(), v(M, { key: 2 }, [
				T("div", { class: k(x(Z).work_head) }, [T("h1", { class: k(x(Z).work_title) }, C(o.value), 3), T("p", { class: k(x(Z).work_description) }, [N(C(x(a)("opening.books.summary", {
					n: s.value.length,
					enabled: ue.value
				})) + " ", 1), o.value === e.lists.chat_book ? (u(), v(M, { key: 0 }, [N(" · " + C(x(a)("opening.books.bound")), 1)], 64)) : S("", !0)], 2)], 2),
				p.value === null ? S("", !0) : (u(), v("p", {
					key: 0,
					class: k(x(Z).error),
					role: "alert"
				}, C(p.value), 3)),
				T("div", { class: k(x(Z).row) }, [
					d(T("input", {
						"onUpdate:modelValue": n[4] ||= (e) => ie.value = e,
						class: k([x(Z).input, x(Z).spacer]),
						type: "search",
						placeholder: x(a)("opening.books.search"),
						"aria-label": x(a)("opening.books.search")
					}, null, 10, Ue), [[y, ie.value]]),
					F(te, {
						modelValue: H.value,
						"onUpdate:modelValue": n[5] ||= (e) => H.value = e,
						options: se.value,
						placeholder: x(a)("opening.books.filter_all"),
						"aria-label": x(a)("opening.books.filter_label")
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder",
						"aria-label"
					]),
					F(B, {
						icon: x(oe),
						label: x(a)("opening.books.add_entry"),
						disabled: l.value,
						onClick: n[6] ||= (e) => de(null)
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])
				], 2),
				W.value === null ? S("", !0) : (u(), v("div", {
					key: 1,
					class: k(x(Z).editor)
				}, [
					T("div", { class: k(x(Z).grid3) }, [F(U, { label: x(a)("opening.entry.title_label") }, {
						default: A(({ fieldId: e }) => [d(T("input", {
							id: e,
							"onUpdate:modelValue": n[7] ||= (e) => W.value.name = e,
							class: k(x(Z).input),
							maxlength: "120"
						}, null, 10, We), [[y, W.value.name]])]),
						_: 1
					}, 8, ["label"]), F(U, { label: x(a)("opening.books.order_label") }, {
						default: A(({ fieldId: e }) => [F(fe, {
							id: e,
							modelValue: W.value.order,
							"onUpdate:modelValue": n[8] ||= (e) => W.value.order = e,
							label: x(a)("opening.books.order_label"),
							"increment-label": x(a)("opening.books.order_up"),
							"decrement-label": x(a)("opening.books.order_down"),
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
					F(me, {
						modelValue: W.value.constant,
						"onUpdate:modelValue": n[9] ||= (e) => W.value.constant = e,
						label: x(a)("opening.entry.constant_label"),
						description: x(a)("opening.entry.constant_hint")
					}, null, 8, [
						"modelValue",
						"label",
						"description"
					]),
					W.value.constant ? S("", !0) : (u(), w(U, {
						key: 0,
						label: x(a)("opening.entry.keys_label"),
						hint: x(a)("opening.entry.keys_hint")
					}, {
						default: A(({ fieldId: e, describedBy: t }) => [d(T("input", {
							id: e,
							"onUpdate:modelValue": n[10] ||= (e) => W.value.keys = e,
							class: k(x(Z).input),
							"aria-describedby": t
						}, null, 10, Ge), [[y, W.value.keys]])]),
						_: 1
					}, 8, ["label", "hint"])),
					F(U, { label: x(a)("opening.entry.content_label") }, {
						default: A(({ fieldId: e }) => [d(T("textarea", {
							id: e,
							"onUpdate:modelValue": n[11] ||= (e) => W.value.content = e,
							class: k(x(Z).text_area)
						}, null, 10, Ke), [[y, W.value.content]])]),
						_: 1
					}, 8, ["label"]),
					T("div", { class: k(x(Z).row) }, [
						T("span", { class: k(x(Z).spacer) }, null, 2),
						F(B, {
							label: x(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[12] ||= (e) => W.value = null
						}, null, 8, ["label"]),
						F(B, {
							label: x(a)("common.actions.save"),
							variant: "primary",
							pending: l.value,
							disabled: W.value.name.trim() === "",
							onClick: ge
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])
					], 2)
				], 2)),
				F(V, {
					status: c.value ? "loading" : le.value.length === 0 ? "empty" : "ready",
					"empty-title": x(a)("opening.books.no_entries"),
					"min-height": "80px"
				}, {
					default: A(() => [T("div", { class: k(x(Z).table) }, [(u(!0), v(M, null, f(le.value, (e) => (u(), v("div", {
						key: e.uid,
						class: k(x(Z).table_row),
						"data-off": e.enabled ? void 0 : ""
					}, [
						F(me, {
							"model-value": e.enabled,
							label: x(a)("opening.books.enabled", { name: e.name }),
							"label-hidden": "",
							disabled: l.value,
							"onUpdate:modelValue": (t) => _e(e, t)
						}, null, 8, [
							"model-value",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						T("span", { class: k(x(Z).table_name) }, [N(C(e.name) + " ", 1), T("span", { class: k(x(Z).keys) }, [e.constant ? (u(), v("span", {
							key: 0,
							class: k(x(Z).pill),
							"data-tone": "constant"
						}, C(x(a)("opening.entry.constant")), 3)) : (u(!0), v(M, { key: 1 }, f(e.keys.slice(0, 4), (e) => (u(), v("span", {
							key: e,
							class: k(x(Z).key)
						}, C(e), 3))), 128))], 2)], 2),
						T("span", { class: k(x(Z).preview) }, C(e.content), 3),
						T("span", { class: k(x(Z).order) }, C(e.order), 3),
						T("span", { class: k(x(Z).row) }, [F(G, {
							icon: x(ae),
							label: x(a)("opening.entry.edit"),
							size: "sm",
							disabled: l.value,
							onClick: (t) => de(e)
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						]), F(G, {
							icon: x(ce),
							label: x(a)("opening.entry.remove"),
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
					], 10, qe))), 128))], 2)]),
					_: 1
				}, 8, ["status", "empty-title"])
			], 64))], 2)], 2),
			F(he, m({
				open: D.value !== null,
				title: D.value === "rename" ? x(a)("opening.books.rename") : x(a)("opening.books.new")
			}, D.value === "rename" ? { description: x(a)("opening.books.rename_hint") } : {}, {
				"close-label": x(a)("common.actions.close"),
				"onUpdate:open": n[15] ||= (e) => D.value = e ? D.value : null
			}), {
				default: A(() => [T("div", { class: k(x(Z).work_inner) }, [
					d(T("input", {
						"onUpdate:modelValue": n[13] ||= (e) => P.value = e,
						class: k(x(Z).input),
						maxlength: "120",
						"aria-label": x(a)("opening.books.name_label")
					}, null, 10, Je), [[y, P.value]]),
					I.value ? (u(), v("p", {
						key: 0,
						class: k(x(Z).error)
					}, C(x(a)("opening.write.name_taken")), 3)) : S("", !0),
					T("div", { class: k(x(Z).row) }, [
						T("span", { class: k(x(Z).spacer) }, null, 2),
						F(B, {
							label: x(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[14] ||= (e) => D.value = null
						}, null, 8, ["label"]),
						F(B, {
							label: x(a)("common.actions.save"),
							variant: "primary",
							pending: l.value,
							disabled: P.value.trim() === "" || I.value,
							onClick: R
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
			F(pe, {
				open: z.value,
				"onUpdate:open": n[16] ||= (e) => z.value = e,
				title: x(a)("opening.books.delete_title", { name: o.value ?? "" }),
				description: x(a)("opening.books.delete_description"),
				"confirm-label": x(a)("common.actions.delete"),
				"cancel-label": x(a)("common.actions.cancel"),
				pending: l.value,
				onConfirm: ee
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			F(pe, {
				open: K.value !== null,
				title: x(a)("opening.books.delete_entry_title", { name: K.value?.name ?? "" }),
				description: x(a)("opening.books.delete_entry_description"),
				"confirm-label": x(a)("common.actions.delete"),
				"cancel-label": x(a)("common.actions.cancel"),
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
function Xe(e) {
	return e.states.flatMap((e) => e.status === "done" || e.status === "stale" ? e.entries : []);
}
var Ze = (e) => e.trim().toLowerCase();
function Qe(e, t) {
	let n = (e) => [...e].sort().join("\n");
	return n(e) === n(t);
}
function $e(e, t) {
	let n = new Map(t.map((e) => [Ze(e.name), e]));
	return e.map((e) => {
		let t = n.get(Ze(e.title)) ?? null;
		return t === null ? {
			entry: e,
			existing: null,
			status: "new"
		} : {
			entry: e,
			existing: t,
			status: t.content.trim() === e.content.trim() && t.constant === e.constant && (e.constant || Qe(t.keys, e.keys)) ? "same" : "modified"
		};
	});
}
var et = 10;
function tt(e, t, n) {
	let r = n.reduce((e, t) => Math.max(e, t.order), 0);
	return {
		upsert: e.filter((e) => e.status !== "same" && t.has(e.entry.id)).map((e) => {
			let t = {
				name: e.entry.title,
				constant: e.entry.constant,
				keys: e.entry.constant ? [] : e.entry.keys,
				content: e.entry.content
			};
			return e.existing === null ? (r += et, {
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
function nt(e, t) {
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
var rt = ["id"], it = ["id", "aria-describedby"], at = ["id"], ot = /* @__PURE__ */ P({
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
		let n = e, r = t, { t: i } = E(), a = j(n.editing), o = j(""), s = j(!1), c = j(""), l = j("");
		function p() {
			o.value = n.entry.title, s.value = n.entry.constant, c.value = n.entry.keys.join(", "), l.value = n.entry.content, a.value = !0;
		}
		a.value && p();
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
		return (t, n) => a.value ? (u(), v("div", {
			key: 0,
			class: k(x(Z).editor)
		}, [
			F(U, { label: x(i)("opening.entry.title_label") }, {
				default: A(({ fieldId: e }) => [d(T("input", {
					id: e,
					"onUpdate:modelValue": n[0] ||= (e) => o.value = e,
					class: k(x(Z).input),
					maxlength: "120"
				}, null, 10, rt), [[y, o.value]])]),
				_: 1
			}, 8, ["label"]),
			F(me, {
				modelValue: s.value,
				"onUpdate:modelValue": n[1] ||= (e) => s.value = e,
				label: x(i)("opening.entry.constant_label"),
				description: x(i)("opening.entry.constant_hint")
			}, null, 8, [
				"modelValue",
				"label",
				"description"
			]),
			s.value ? S("", !0) : (u(), w(U, {
				key: 0,
				label: x(i)("opening.entry.keys_label"),
				hint: x(i)("opening.entry.keys_hint")
			}, {
				default: A(({ fieldId: e, describedBy: t }) => [d(T("input", {
					id: e,
					"onUpdate:modelValue": n[2] ||= (e) => c.value = e,
					class: k(x(Z).input),
					"aria-describedby": t
				}, null, 10, it), [[y, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])),
			F(U, { label: x(i)("opening.entry.content_label") }, {
				default: A(({ fieldId: e }) => [d(T("textarea", {
					id: e,
					"onUpdate:modelValue": n[3] ||= (e) => l.value = e,
					class: k(x(Z).text_area),
					maxlength: "8000"
				}, null, 10, at), [[y, l.value]])]),
				_: 1
			}, 8, ["label"]),
			T("div", { class: k(x(Z).row) }, [
				T("span", { class: k(x(Z).spacer) }, null, 2),
				F(B, {
					label: x(i)("common.actions.cancel"),
					variant: "ghost",
					onClick: h
				}, null, 8, ["label"]),
				F(B, {
					label: x(i)("common.actions.save"),
					variant: "primary",
					disabled: o.value.trim() === "" || l.value.trim() === "",
					onClick: m
				}, null, 8, ["label", "disabled"])
			], 2)
		], 2)) : (u(), v("article", {
			key: 1,
			class: k(x(Z).entry)
		}, [
			T("div", { class: k(x(Z).entry_head) }, [
				T("span", { class: k(x(Z).entry_title) }, C(e.entry.title), 3),
				e.entry.constant ? (u(), v("span", {
					key: 0,
					class: k(x(Z).pill),
					"data-tone": "constant"
				}, C(x(i)("opening.entry.constant")), 3)) : (u(), v("span", {
					key: 1,
					class: k(x(Z).pill)
				}, C(x(i)("opening.entry.keyword")), 3)),
				T("span", { class: k(x(Z).spacer) }, null, 2),
				F(G, {
					icon: x(H),
					label: x(i)("opening.entry.rewrite"),
					size: "sm",
					disabled: e.disabled || e.rewriting,
					onClick: n[4] ||= (e) => r("rewrite")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				F(G, {
					icon: x(ae),
					label: x(i)("opening.entry.edit"),
					size: "sm",
					disabled: e.disabled,
					onClick: p
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				F(G, {
					icon: x(ce),
					label: x(i)("opening.entry.remove"),
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
			!e.entry.constant && e.entry.keys.length > 0 ? (u(), v("div", {
				key: 0,
				class: k(x(Z).keys)
			}, [N(C(x(i)("opening.entry.keys_label")) + " ", 1), (u(!0), v(M, null, f(e.entry.keys, (e) => (u(), v("span", {
				key: e,
				class: k(x(Z).key)
			}, C(e), 3))), 128))], 2)) : S("", !0),
			e.rewriting ? (u(), v("p", {
				key: 1,
				class: k(x(Z).hint),
				role: "status"
			}, C(x(i)("opening.status.rewriting")), 3)) : S("", !0),
			T("p", { class: k(x(Z).entry_content) }, C(e.entry.content), 3)
		], 2));
	}
}), Q = ["aria-label"], st = ["data-status"], ct = ["data-tone"], lt = /* @__PURE__ */ P({
	__name: "OpeningWriteDialog",
	props: /*@__PURE__*/ l({
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
	emits: /*@__PURE__*/ l(["written"], ["update:open"]),
	setup(e, { emit: t }) {
		let n = e, r = g(e, "open"), i = t, { t: a } = E(), o = j("new"), s = j(""), c = j(void 0), l = j([]), p = j(!1), m = j(!1), h = j(null), b = j(/* @__PURE__ */ new Set()), D = O(() => [{
			value: "new",
			label: a("opening.write.mode_new")
		}, {
			value: "existing",
			label: a("opening.write.mode_existing")
		}]), N = O(() => n.lists.books.map((e) => ({
			value: e,
			label: e
		}))), P = O(() => $e(n.entries, o.value === "existing" ? l.value : []));
		function I() {
			b.value = new Set(P.value.filter((e) => e.status !== "same").map((e) => e.entry.id));
		}
		async function L() {
			if (l.value = [], o.value !== "existing" || c.value === void 0) {
				I();
				return;
			}
			p.value = !0, h.value = null;
			try {
				l.value = await n.host.read_entries(c.value);
			} catch (e) {
				h.value = a("opening.write.read_failed", { reason: Be(e) });
			} finally {
				p.value = !1, I();
			}
		}
		_(r, (e) => {
			e && (h.value = null, s.value = n.defaultName, c.value = n.lists.chat_book ?? n.lists.books[0], o.value = n.lists.chat_book === null ? "new" : "existing", L());
		}), _([o, c], () => {
			L();
		});
		function R(e, t) {
			let n = new Set(b.value);
			t === !0 ? n.add(e) : n.delete(e), b.value = n;
		}
		let z = O(() => o.value === "new" ? s.value.trim() : c.value ?? ""), ee = O(() => o.value === "new" && n.lists.books.includes(s.value.trim())), V = O(() => P.value.filter((e) => e.status !== "same" && b.value.has(e.entry.id)).length), ne = O(() => r.value ? n.host.chat_name() : null);
		function re(e) {
			switch (e.status) {
				case "new": return a("opening.write.status_new");
				case "modified": return a("opening.write.status_modified");
				case "same": return a("opening.write.status_same");
			}
		}
		async function ae() {
			let e = z.value;
			if (!(e === "" || ee.value)) {
				m.value = !0, h.value = null;
				try {
					o.value === "new" && await n.host.create_worldbook(e);
					let t = o.value === "new" ? [] : l.value;
					await n.host.save_entries(e, tt(P.value, b.value, t)), ne.value !== null && await n.host.bind_chat_worldbook(e), i("written", e), r.value = !1;
				} catch (e) {
					h.value = a("opening.write.failed", { reason: Be(e) });
				} finally {
					m.value = !1;
				}
			}
		}
		return (e, t) => (u(), w(he, {
			open: r.value,
			"onUpdate:open": t[4] ||= (e) => r.value = e,
			title: x(a)("opening.write.title"),
			description: x(a)("opening.write.description"),
			"close-label": x(a)("common.actions.close")
		}, {
			default: A(() => [T("div", { class: k(x(Z).work_inner) }, [
				F(de, {
					modelValue: o.value,
					"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
					class: k(x(Z).compact),
					options: D.value,
					label: x(a)("opening.write.mode_label")
				}, null, 8, [
					"modelValue",
					"class",
					"options",
					"label"
				]),
				o.value === "new" ? d((u(), v("input", {
					key: 0,
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					class: k(x(Z).input),
					maxlength: "120",
					"aria-label": x(a)("opening.write.name_label")
				}, null, 10, Q)), [[y, s.value]]) : (u(), w(te, {
					key: 1,
					modelValue: c.value,
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					options: N.value,
					placeholder: x(a)("opening.write.book_placeholder"),
					"aria-label": x(a)("opening.write.book_label")
				}, null, 8, [
					"modelValue",
					"options",
					"placeholder",
					"aria-label"
				])),
				ee.value ? (u(), v("p", {
					key: 2,
					class: k(x(Z).error)
				}, C(x(a)("opening.write.name_taken")), 3)) : S("", !0),
				p.value ? (u(), v("p", {
					key: 3,
					class: k(x(Z).hint),
					role: "status"
				}, C(x(a)("opening.write.loading")), 3)) : (u(), v("div", {
					key: 4,
					class: k(x(Z).write_list)
				}, [(u(!0), v(M, null, f(P.value, (e) => (u(), v("div", {
					key: e.entry.id,
					class: k(x(Z).write_row),
					"data-status": e.status
				}, [
					F(ie, {
						"model-value": e.status !== "same" && b.value.has(e.entry.id),
						label: e.entry.title,
						"label-hidden": "",
						disabled: e.status === "same",
						"onUpdate:modelValue": (t) => R(e.entry.id, t)
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]),
					T("span", {
						class: k(x(Z).pill),
						"data-tone": e.status
					}, C(re(e)), 11, ct),
					T("span", null, [T("strong", null, C(e.entry.title), 1), e.status === "modified" && e.existing !== null ? (u(), v("span", {
						key: 0,
						class: k(x(Z).diff)
					}, [T("del", null, C(e.existing.content), 1), T("ins", null, C(e.entry.content), 1)], 2)) : S("", !0)])
				], 10, st))), 128))], 2)),
				T("p", { class: k(x(Z).hint) }, C(ne.value === null ? x(a)("opening.write.no_chat") : x(a)("opening.write.bind_note", {
					book: z.value,
					chat: ne.value
				})), 3),
				h.value === null ? S("", !0) : (u(), v("p", {
					key: 5,
					class: k(x(Z).error),
					role: "alert"
				}, C(h.value), 3)),
				T("div", { class: k(x(Z).row) }, [
					T("span", { class: k(x(Z).spacer) }, null, 2),
					F(B, {
						label: x(a)("common.actions.cancel"),
						variant: "ghost",
						onClick: t[3] ||= (e) => r.value = !1
					}, null, 8, ["label"]),
					F(B, {
						label: x(a)("opening.write.confirm", { n: V.value }),
						variant: "primary",
						pending: m.value,
						disabled: V.value === 0 || z.value === "" || ee.value || p.value,
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
}), ut = ["aria-label"], dt = ["aria-current", "onClick"], ft = ["data-state"], pt = ["id", "value"], mt = [
	"id",
	"value",
	"aria-describedby",
	"placeholder"
], ht = ["aria-pressed", "onClick"], gt = ["aria-label"], _t = [
	"data-state",
	"aria-current",
	"disabled",
	"onClick"
], vt = ["role", "aria-label"], yt = [
	"role",
	"aria-checked",
	"disabled",
	"onClick"
], bt = ["data-shape"], xt = ["id", "placeholder"], St = ["id"], Ct = ["id"], wt = ["data-open", "aria-label"], Tt = 4e3, Et = /* @__PURE__ */ P({
	__name: "OpeningBuild",
	props: /*@__PURE__*/ l({
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
	emits: /*@__PURE__*/ l(["refresh-lists"], ["update:section"]),
	setup(e, { emit: t }) {
		let n = e, r = g(e, "section"), i = t, { t: a } = E(), o = j(n.store.drafts.value[0]?.id ?? null), s = O(() => o.value === null ? null : n.store.draft(o.value)), c = j(null);
		function l(e) {
			return e.states.map((t, n) => t.status === "pending" && e.started && n === e.current ? "asking" : t.status);
		}
		function p(e) {
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
				states: e.steps.map(Pe),
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
		let b = j(!1), D = j(!1);
		async function P() {
			let e = s.value;
			if (e !== null) {
				D.value = !0;
				try {
					await n.store.remove(e.id), b.value = !1, o.value = n.store.drafts.value[0]?.id ?? null;
				} finally {
					D.value = !1;
				}
			}
		}
		function I(e, t = !1) {
			s.value !== null && n.store.edit(s.value, e, { debounce: t });
		}
		let L = O(() => n.templates.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), V = j(je);
		_(() => s.value?.template_name, (e) => {
			V.value = n.templates.find((t) => t.display_name === e)?.id ?? "builtin-default";
		}, { immediate: !0 });
		function le(e) {
			let t = e === void 0 ? void 0 : m(e);
			t !== void 0 && (V.value = t.id, I((e) => {
				e.template_name = t.display_name, e.steps = t.steps.map((e) => ({ ...e })), e.states = t.steps.map(Pe), e.current = 0;
			}));
		}
		let W = O(() => [
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
		]), de = O(() => {
			let e = s.value?.connection;
			return e?.kind === "proxy_preset" ? `proxy:${e.proxy_preset}` : e?.kind;
		});
		function fe(e) {
			e !== void 0 && I((t) => {
				t.connection = e.startsWith("proxy:") ? {
					kind: "proxy_preset",
					proxy_preset: e.slice(6)
				} : e === "current" ? { kind: "current" } : { kind: "analysis" };
			});
		}
		let me = O(() => n.lists.presets.map((e) => ({
			value: e,
			label: e === "in_use" ? a("opening.settings.preset_in_use") : e
		})));
		function he(e) {
			e !== void 0 && I((t) => {
				t.preset_name = e;
			});
		}
		function ge(e) {
			I((t) => {
				t.worldbooks = t.worldbooks.includes(e) ? t.worldbooks.filter((t) => t !== e) : [...t.worldbooks, e].slice(0, 20);
			});
		}
		let ve = j(null);
		_([o, () => n.host], () => {
			ve.value = n.host?.character() ?? null;
		}, { immediate: !0 });
		function xe(e) {
			let t = ve.value;
			I((n) => {
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
		function Ce(e) {
			I((t) => {
				t.use_greeting = e === !0 && t.card !== null;
			});
		}
		function we(e) {
			return W.value.find((e) => e.value === de.value)?.label ?? e.connection.kind;
		}
		let q = O(() => s.value === null ? null : n.flow.busy(s.value.id)), Te = O(() => s.value === null ? null : n.flow.error(s.value.id)), J = O(() => s.value?.steps[s.value.current] ?? null), Y = O(() => s.value?.states[s.value.current] ?? null), Ee = O(() => s.value !== null && s.value.current === s.value.steps.length - 1), De = O(() => Y.value?.status === "done" || Y.value?.status === "stale"), Oe = O(() => s.value?.states.some((e) => e.status === "stale") ?? !1);
		function ke(e) {
			return e instanceof ue ? a("opening.errors.unparsable", { excerpt: e.excerpt }) : a("opening.errors.failed", { reason: Be(e) });
		}
		function Ae(e) {
			return e === "stale" ? a("opening.steps.stale") : "";
		}
		function Me(e) {
			let t = s.value;
			return t !== null && (t.states[e]?.status !== "pending" || e === t.current);
		}
		function Ne(e) {
			I((t) => {
				t.current = e;
			});
		}
		async function Ie() {
			let e = s.value;
			e !== null && e.description.trim() !== "" && (I((e) => {
				e.started = !0;
			}), await n.flow.run_step(e, 0));
		}
		let X = j([]), Le = j("");
		_(() => Y.value?.question, () => {
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
		async function Ve() {
			s.value !== null && await n.flow.answer(s.value, X.value, Le.value);
		}
		function He(e, t) {
			let n = [...e, ...t === "" ? [] : [t]];
			return n.length === 0 ? a("opening.ask.left_to_model") : n.join(a("opening.ask.joiner"));
		}
		let Ue = j(null);
		function We(e, t) {
			I((n) => {
				let r = n.states[e]?.entries, i = r?.findIndex((e) => e.id === t.id) ?? -1;
				r !== void 0 && i >= 0 && (r[i] = t), Fe(n, e);
			}), Ue.value = null;
		}
		function Ge(e, t) {
			I((n) => {
				let r = n.states[e];
				r !== void 0 && (r.entries = r.entries.filter((e) => e.id !== t)), Fe(n, e);
			});
		}
		function Ke(e) {
			let t = crypto.randomUUID();
			I((n) => {
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
		let Je = j(!1), Ye = j(""), Ze = j("");
		function Qe() {
			Ye.value = Y.value?.message?.speaker ?? "", Ze.value = Y.value?.message?.text ?? "", Je.value = !0;
		}
		function $e() {
			let e = s.value?.current ?? 0;
			I((t) => {
				let n = t.states[e];
				n !== void 0 && (n.message = {
					speaker: Ye.value.trim(),
					text: Ze.value
				});
			}), Je.value = !1;
		}
		let et = O(() => s.value === null ? [] : Xe(s.value)), tt = O(() => [...s.value?.states ?? []].reverse().find((e) => e.message !== null)?.message ?? null), rt = j(!1), it = j(null);
		function at(e) {
			it.value = a("opening.output.book_written", { book: e }), i("refresh-lists");
		}
		let Q = j(!1), st = j(!1), ct = O(() => Q.value ? n.host?.chat_name() ?? null : null);
		async function Et() {
			let e = tt.value;
			if (n.host !== null && e !== null) {
				st.value = !0;
				try {
					await n.host.append_character_message(e.speaker, e.text), Q.value = !1, it.value = a("opening.output.message_added");
				} catch (e) {
					c.value = a("opening.errors.failed", { reason: Be(e) }), Q.value = !1;
				} finally {
					st.value = !1;
				}
			}
		}
		function Dt() {
			let e = s.value;
			return e === null ? "" : nt(e, {
				description: a("opening.markdown.description"),
				constant: a("opening.entry.constant"),
				keys: a("opening.entry.keys_label")
			});
		}
		async function Ot() {
			try {
				await navigator.clipboard.writeText(Dt()), it.value = a("opening.output.copied");
			} catch (e) {
				c.value = a("opening.errors.failed", { reason: Be(e) });
			}
		}
		function kt() {
			let e = URL.createObjectURL(new Blob([Dt()], { type: "text/markdown" })), t = document.createElement("a");
			t.href = e, t.download = `${s.value?.display_name ?? "opening"}.md`, t.click(), URL.revokeObjectURL(e);
		}
		let At = j(!1);
		return _(o, () => {
			c.value = null, it.value = null, Je.value = !1;
		}), (t, n) => (u(), v("div", { class: k(x(Z).layout) }, [
			T("aside", {
				class: k(x(Z).aside),
				"aria-label": x(a)("opening.draft.list_label")
			}, [
				F(B, {
					class: k(x(Z).aside_new),
					icon: x(oe),
					label: x(a)("opening.draft.new"),
					onClick: h
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				e.store.drafts.value.length > 0 ? (u(), v("div", {
					key: 0,
					class: k(x(Z).aside_title)
				}, C(x(a)("opening.draft.list_title")), 3)) : S("", !0),
				(u(!0), v(M, null, f(e.store.drafts.value, (e) => (u(), v("button", {
					key: e.id,
					type: "button",
					class: k(["tc-interactive", x(Z).item]),
					"aria-current": e.id === o.value ? "true" : void 0,
					onClick: (t) => o.value = e.id
				}, [
					T("span", { class: k(x(Z).item_name) }, C(e.display_name), 3),
					T("span", { class: k(x(Z).dots) }, [(u(!0), v(M, null, f(l(e), (e, t) => (u(), v("i", {
						key: t,
						class: k(x(Z).dot),
						"data-state": e
					}, null, 10, ft))), 128))], 2),
					T("span", { class: k(x(Z).item_meta) }, C(p(e)), 3)
				], 10, dt))), 128))
			], 10, ut),
			T("div", { class: k(x(Z).columns) }, [T("div", { class: k(x(Z).work) }, [T("div", { class: k(x(Z).work_inner) }, [
				T("div", { class: k(x(Z).topline) }, [
					F(ze, {
						modelValue: r.value,
						"onUpdate:modelValue": n[0] ||= (e) => r.value = e
					}, null, 8, ["modelValue"]),
					T("span", { class: k(x(Z).spacer) }, null, 2),
					s.value !== null && s.value.started ? (u(), w(B, {
						key: 0,
						class: k(x(Z).known_toggle),
						icon: x(z),
						label: x(a)("opening.known.toggle"),
						variant: "ghost",
						onClick: n[1] ||= (e) => At.value = !At.value
					}, null, 8, [
						"class",
						"icon",
						"label"
					])) : S("", !0),
					s.value === null ? S("", !0) : (u(), w(G, {
						key: 1,
						icon: x(ce),
						label: x(a)("opening.draft.delete"),
						onClick: n[2] ||= (e) => b.value = !0
					}, null, 8, ["icon", "label"]))
				], 2),
				e.hostError === null ? S("", !0) : (u(), v("p", {
					key: 0,
					class: k(x(Z).error)
				}, C(x(a)("opening.errors.host", { reason: e.hostError })), 3)),
				e.saveError === null ? S("", !0) : (u(), v("p", {
					key: 1,
					class: k(x(Z).error),
					role: "alert"
				}, C(x(a)("opening.errors.save", { reason: e.saveError })), 3)),
				c.value === null ? S("", !0) : (u(), v("p", {
					key: 2,
					class: k(x(Z).error),
					role: "alert"
				}, C(c.value), 3)),
				s.value === null ? (u(), v("div", {
					key: 3,
					class: k(x(Z).work_head)
				}, [
					T("h1", { class: k(x(Z).work_title) }, C(x(a)("opening.title")), 3),
					T("p", { class: k(x(Z).work_description) }, C(x(a)("opening.empty_hint")), 3),
					T("div", { class: k(x(Z).row) }, [F(B, {
						icon: x(oe),
						label: x(a)("opening.draft.new"),
						variant: "primary",
						onClick: h
					}, null, 8, ["icon", "label"])], 2)
				], 2)) : s.value.started ? J.value !== null && Y.value !== null ? (u(), v(M, { key: 5 }, [
					T("nav", {
						class: k(x(Z).steps),
						"aria-label": x(a)("opening.steps.label")
					}, [(u(!0), v(M, null, f(s.value.steps, (e, t) => (u(), v("button", {
						key: e.id,
						type: "button",
						class: k(["tc-interactive", x(Z).step]),
						"data-state": s.value.states[t]?.status,
						"aria-current": t === s.value.current ? "step" : void 0,
						disabled: !Me(t) || q.value !== null,
						onClick: (e) => Ne(t)
					}, [
						T("span", { class: k(x(Z).step_number) }, [s.value.states[t]?.status === "done" ? (u(), w(R, {
							key: 0,
							icon: x(ee),
							size: 13
						}, null, 8, ["icon"])) : (u(), v(M, { key: 1 }, [N(C(t + 1), 1)], 64))], 2),
						T("span", { class: k(x(Z).step_label) }, C(e.name), 3),
						T("span", { class: k(x(Z).step_tag) }, C(Ae(s.value.states[t]?.status ?? "")), 3)
					], 10, _t))), 128))], 10, gt),
					Oe.value ? (u(), v("div", {
						key: 0,
						class: k(x(Z).banner)
					}, [T("span", null, C(x(a)("opening.steps.stale_banner")), 1), F(B, {
						icon: x(H),
						label: x(a)("opening.steps.regenerate_stale"),
						pending: q.value !== null,
						onClick: n[5] ||= (t) => e.flow.regenerate_stale(s.value)
					}, null, 8, [
						"icon",
						"label",
						"pending"
					])], 2)) : S("", !0),
					T("div", { class: k(x(Z).work_head) }, [T("h1", { class: k(x(Z).work_title) }, C(J.value.name), 3), T("p", { class: k(x(Z).work_description) }, C(J.value.instruction), 3)], 2),
					(u(!0), v(M, null, f(Y.value.answers, (t, n) => (u(), v("div", {
						key: n,
						class: k(x(Z).answered)
					}, [
						T("span", { class: k(x(Z).answered_question) }, C(x(a)("opening.ask.answered", {
							n: n + 1,
							question: t.question.text
						})), 3),
						T("span", { class: k(x(Z).answered_answer) }, C(He(t.selected, t.other)), 3),
						F(B, {
							icon: x(ae),
							label: x(a)("opening.ask.change"),
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
					q.value === null ? S("", !0) : (u(), v("p", {
						key: 1,
						class: k(x(Z).hint),
						role: "status"
					}, C(q.value.kind === "question" ? x(a)("opening.status.asking") : q.value.kind === "generate" ? x(a)("opening.status.generating", { step: s.value.steps[q.value.step]?.name ?? "" }) : x(a)("opening.status.rewriting")), 3)),
					Te.value === null ? S("", !0) : (u(), v("div", {
						key: 2,
						class: k(x(Z).banner),
						role: "alert"
					}, [T("span", null, C(ke(Te.value)), 1), Y.value.status === "asking" && Y.value.question === null ? (u(), w(B, {
						key: 0,
						icon: x(H),
						label: x(a)("opening.status.retry"),
						onClick: n[6] ||= (t) => e.flow.run_step(s.value, s.value.current)
					}, null, 8, ["icon", "label"])) : S("", !0)], 2)),
					Y.value.question === null ? Y.value.status === "pending" && q.value === null ? (u(), v("div", {
						key: 4,
						class: k(x(Z).row)
					}, [F(B, {
						icon: x(se),
						label: x(a)("opening.steps.run"),
						variant: "primary",
						onClick: n[9] ||= (t) => e.flow.run_step(s.value, s.value.current)
					}, null, 8, ["icon", "label"])], 2)) : S("", !0) : (u(), v("div", {
						key: 3,
						class: k(x(Z).ask)
					}, [
						T("div", { class: k(x(Z).ask_head) }, [
							T("h2", { class: k(x(Z).ask_title) }, C(Y.value.question.text), 3),
							T("span", { class: k(x(Z).badge) }, C(Y.value.question.multiple ? x(a)("opening.ask.multiple") : x(a)("opening.ask.single")), 3),
							T("span", { class: k(x(Z).spacer) }, null, 2),
							T("span", { class: k(x(Z).hint) }, C(x(a)("opening.ask.round", {
								n: Y.value.answers.length + 1,
								max: J.value.max_rounds
							})), 3)
						], 2),
						Y.value.question.why === "" ? S("", !0) : (u(), v("p", {
							key: 0,
							class: k(x(Z).hint)
						}, C(Y.value.question.why), 3)),
						T("div", {
							class: k(x(Z).options),
							role: Y.value.question.multiple ? "group" : "radiogroup",
							"aria-label": Y.value.question.text
						}, [(u(!0), v(M, null, f(Y.value.question.options, (e) => (u(), v("button", {
							key: e.label,
							type: "button",
							class: k(["tc-interactive", x(Z).option]),
							role: Y.value.question.multiple ? "checkbox" : "radio",
							"aria-checked": X.value.includes(e.label),
							disabled: q.value !== null,
							onClick: (t) => Re(e.label)
						}, [
							T("span", {
								class: k(x(Z).option_mark),
								"data-shape": Y.value.question.multiple ? "box" : "radio"
							}, [X.value.includes(e.label) ? (u(), w(R, {
								key: 0,
								icon: x(ee),
								size: 13
							}, null, 8, ["icon"])) : S("", !0)], 10, bt),
							T("span", { class: k(x(Z).option_label) }, C(e.label), 3),
							T("span", { class: k(x(Z).option_detail) }, C(e.detail), 3)
						], 10, yt))), 128))], 10, vt),
						F(U, { label: x(a)("opening.ask.other_label") }, {
							default: A(({ fieldId: e }) => [d(T("input", {
								id: e,
								"onUpdate:modelValue": n[7] ||= (e) => Le.value = e,
								class: k(x(Z).input),
								maxlength: "500",
								placeholder: x(a)("opening.ask.other_placeholder")
							}, null, 10, xt), [[y, Le.value]])]),
							_: 1
						}, 8, ["label"]),
						T("div", { class: k(x(Z).row) }, [
							F(B, {
								icon: x(ye),
								label: x(a)("opening.ask.skip"),
								variant: "ghost",
								disabled: q.value !== null,
								onClick: n[8] ||= (t) => e.flow.skip(s.value)
							}, null, 8, [
								"icon",
								"label",
								"disabled"
							]),
							T("span", { class: k(x(Z).spacer) }, null, 2),
							F(B, {
								icon: x(K),
								label: x(a)("opening.ask.confirm"),
								variant: "primary",
								pending: q.value !== null,
								disabled: X.value.length === 0 && Le.value.trim() === "",
								onClick: Ve
							}, null, 8, [
								"icon",
								"label",
								"pending",
								"disabled"
							])
						], 2)
					], 2)),
					De.value && J.value.output === "entries" ? (u(), v("div", {
						key: 5,
						class: k(x(Z).entries)
					}, [(u(!0), v(M, null, f(Y.value.entries, (t) => (u(), w(ot, {
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
					]))), 128))], 2)) : S("", !0),
					De.value && J.value.output === "message" && Y.value.message !== null ? (u(), v(M, { key: 6 }, [Je.value ? (u(), v("div", {
						key: 0,
						class: k(x(Z).editor)
					}, [
						F(U, { label: x(a)("opening.message.speaker_label") }, {
							default: A(({ fieldId: e }) => [d(T("input", {
								id: e,
								"onUpdate:modelValue": n[11] ||= (e) => Ye.value = e,
								class: k(x(Z).input),
								maxlength: "80"
							}, null, 10, St), [[y, Ye.value]])]),
							_: 1
						}, 8, ["label"]),
						F(U, { label: x(a)("opening.message.text_label") }, {
							default: A(({ fieldId: e }) => [d(T("textarea", {
								id: e,
								"onUpdate:modelValue": n[12] ||= (e) => Ze.value = e,
								class: k(x(Z).text_area)
							}, null, 10, Ct), [[y, Ze.value]])]),
							_: 1
						}, 8, ["label"]),
						T("div", { class: k(x(Z).row) }, [
							T("span", { class: k(x(Z).spacer) }, null, 2),
							F(B, {
								label: x(a)("common.actions.cancel"),
								variant: "ghost",
								onClick: n[13] ||= (e) => Je.value = !1
							}, null, 8, ["label"]),
							F(B, {
								label: x(a)("common.actions.save"),
								variant: "primary",
								disabled: Ye.value.trim() === "" || Ze.value.trim() === "",
								onClick: $e
							}, null, 8, ["label", "disabled"])
						], 2)
					], 2)) : (u(), v("div", {
						key: 1,
						class: k(x(Z).bubble)
					}, [T("span", { class: k(x(Z).bubble_name) }, C(Y.value.message.speaker), 3), T("p", { class: k(x(Z).bubble_text) }, C(Y.value.message.text), 3)], 2)), Je.value ? S("", !0) : (u(), v("div", {
						key: 2,
						class: k(x(Z).row)
					}, [F(B, {
						icon: x(ae),
						label: x(a)("opening.message.edit"),
						disabled: q.value !== null,
						onClick: Qe
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])], 2))], 64)) : S("", !0),
					De.value ? (u(), v("div", {
						key: 7,
						class: k(x(Z).foot)
					}, [
						Y.value.answers.length < J.value.max_rounds ? (u(), w(B, {
							key: 0,
							icon: x(_e),
							label: x(a)("opening.steps.ask_more"),
							variant: "ghost",
							disabled: q.value !== null,
							onClick: n[14] ||= (t) => e.flow.run_step(s.value, s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])) : S("", !0),
						J.value.output === "entries" ? (u(), w(B, {
							key: 1,
							icon: x(oe),
							label: x(a)("opening.entry.add"),
							disabled: q.value !== null,
							onClick: n[15] ||= (e) => Ke(s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])) : S("", !0),
						T("span", { class: k(x(Z).spacer) }, null, 2),
						F(B, {
							icon: x(H),
							label: x(a)("opening.steps.regenerate"),
							pending: q.value?.kind === "generate",
							disabled: q.value !== null,
							onClick: n[16] ||= (t) => e.flow.generate(s.value, s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						]),
						Ee.value ? S("", !0) : (u(), w(B, {
							key: 2,
							icon: x(K),
							label: x(a)("opening.steps.next"),
							variant: "primary",
							disabled: q.value !== null,
							onClick: n[17] ||= (t) => e.flow.next(s.value)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						]))
					], 2)) : S("", !0),
					Ee.value && De.value ? (u(), v(M, { key: 8 }, [T("div", { class: k(x(Z).outputs) }, [
						T("div", { class: k(x(Z).output) }, [
							T("h3", { class: k(x(Z).output_title) }, [F(R, { icon: x(z) }, null, 8, ["icon"]), N(C(x(a)("opening.output.book_title")), 1)], 2),
							T("p", { class: k(x(Z).hint) }, C(x(a)("opening.output.book_hint", { n: et.value.length })), 3),
							T("div", { class: k(x(Z).row) }, [F(B, {
								label: x(a)("opening.output.book_action"),
								variant: "primary",
								disabled: e.host === null || et.value.length === 0 || q.value !== null,
								onClick: n[18] ||= (e) => rt.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						T("div", { class: k(x(Z).output) }, [
							T("h3", { class: k(x(Z).output_title) }, [F(R, { icon: x(Se) }, null, 8, ["icon"]), N(C(x(a)("opening.output.message_title")), 1)], 2),
							T("p", { class: k(x(Z).hint) }, C(x(a)("opening.output.message_hint")), 3),
							T("div", { class: k(x(Z).row) }, [F(B, {
								label: x(a)("opening.output.message_action"),
								disabled: e.host === null || tt.value === null || q.value !== null,
								onClick: n[19] ||= (e) => Q.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						T("div", { class: k(x(Z).output) }, [
							T("h3", { class: k(x(Z).output_title) }, [F(R, { icon: x(be) }, null, 8, ["icon"]), N(C(x(a)("opening.output.markdown_title")), 1)], 2),
							T("p", { class: k(x(Z).hint) }, C(x(a)("opening.output.markdown_hint")), 3),
							T("div", { class: k(x(Z).row) }, [F(B, {
								icon: x(ne),
								label: x(a)("opening.output.copy"),
								onClick: Ot
							}, null, 8, ["icon", "label"]), F(B, {
								icon: x(re),
								label: x(a)("opening.output.download"),
								variant: "ghost",
								onClick: kt
							}, null, 8, ["icon", "label"])], 2)
						], 2)
					], 2), it.value === null ? S("", !0) : (u(), v("p", {
						key: 0,
						class: k(x(Z).hint),
						role: "status"
					}, C(it.value), 3))], 64)) : S("", !0)
				], 64)) : S("", !0) : (u(), v(M, { key: 4 }, [
					F(U, { label: x(a)("opening.draft.name_label") }, {
						default: A(({ fieldId: e }) => [T("input", {
							id: e,
							value: s.value.display_name,
							class: k(x(Z).input),
							maxlength: "60",
							onInput: n[3] ||= (e) => {
								I((t) => {
									t.display_name = e.target.value;
								}, !0);
							}
						}, null, 42, pt)]),
						_: 1
					}, 8, ["label"]),
					F(U, {
						label: x(a)("opening.draft.description_label"),
						hint: x(a)("opening.draft.description_hint")
					}, {
						default: A(({ fieldId: e, describedBy: t }) => [T("textarea", {
							id: e,
							value: s.value.description,
							class: k(x(Z).text_area),
							maxlength: Tt,
							"aria-describedby": t,
							placeholder: x(a)("opening.draft.description_placeholder"),
							onInput: n[4] ||= (e) => {
								I((t) => {
									t.description = e.target.value;
								}, !0);
							}
						}, null, 42, mt), T("div", { class: k(x(Z).counter) }, C(s.value.description.length) + " / " + C(Tt), 3)]),
						_: 1
					}, 8, ["label", "hint"]),
					T("div", { class: k(x(Z).grid3) }, [
						F(U, { label: x(a)("opening.settings.template_label") }, {
							default: A(({ fieldId: e }) => [F(te, {
								id: e,
								"model-value": V.value,
								options: L.value,
								placeholder: x(a)("opening.settings.template_label"),
								"onUpdate:modelValue": le
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						F(U, { label: x(a)("opening.settings.connection_label") }, {
							default: A(({ fieldId: e }) => [F(te, {
								id: e,
								"model-value": de.value,
								options: W.value,
								placeholder: x(a)("opening.settings.connection_label"),
								"onUpdate:modelValue": fe
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						F(U, { label: x(a)("opening.settings.preset_label") }, {
							default: A(({ fieldId: e }) => [F(te, {
								id: e,
								"model-value": s.value.preset_name,
								options: me.value,
								placeholder: x(a)("opening.settings.preset_label"),
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
					F(U, {
						label: x(a)("opening.settings.worldbooks_label"),
						hint: x(a)("opening.settings.worldbooks_hint")
					}, {
						default: A(() => [e.lists.books.length > 0 ? (u(), v("div", {
							key: 0,
							class: k(x(Z).row)
						}, [(u(!0), v(M, null, f(e.lists.books, (e) => (u(), v("button", {
							key: e,
							type: "button",
							class: k(["tc-interactive", x(Z).chip_toggle]),
							"aria-pressed": s.value.worldbooks.includes(e),
							onClick: (t) => ge(e)
						}, [F(R, {
							icon: x(z),
							size: 14
						}, null, 8, ["icon"]), N(C(e), 1)], 10, ht))), 128))], 2)) : (u(), v("p", {
							key: 1,
							class: k(x(Z).hint)
						}, C(x(a)("opening.settings.no_worldbooks")), 3))]),
						_: 1
					}, 8, ["label", "hint"]),
					F(U, {
						label: x(a)("opening.settings.card_label"),
						hint: x(a)("opening.settings.card_hint")
					}, {
						default: A(() => [T("div", { class: k(x(Z).row) }, [F(ie, {
							"model-value": s.value.card !== null,
							label: s.value.card === null ? ve.value === null ? x(a)("opening.settings.card_none") : x(a)("opening.settings.card_use", { name: ve.value.name }) : x(a)("opening.settings.card_use", { name: s.value.card.name }),
							disabled: s.value.card === null && ve.value === null,
							"onUpdate:modelValue": xe
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						]), F(ie, {
							"model-value": s.value.use_greeting,
							label: x(a)("opening.settings.greeting_use"),
							disabled: s.value.card === null || s.value.card.first_message.trim() === "",
							"onUpdate:modelValue": Ce
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					T("div", { class: k(x(Z).row) }, [
						T("span", { class: k(x(Z).spacer) }, null, 2),
						T("span", { class: k(x(Z).hint) }, C(x(a)("opening.draft.step_count", { n: s.value.steps.length })), 3),
						F(B, {
							icon: x(se),
							label: x(a)("opening.draft.start"),
							variant: "primary",
							pending: q.value !== null,
							disabled: s.value.description.trim() === "",
							onClick: Ie
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						])
					], 2)
				], 64))
			], 2)], 2), s.value !== null && s.value.started ? (u(), v("aside", {
				key: 0,
				class: k(x(Z).known),
				"data-open": At.value ? "" : void 0,
				"aria-label": x(a)("opening.known.label")
			}, [
				T("div", { class: k(x(Z).known_block) }, [T("h3", { class: k(x(Z).known_title) }, C(x(a)("opening.known.settled")), 3), (u(!0), v(M, null, f(s.value.steps, (e, t) => (u(), v(M, { key: e.id }, [t !== s.value.current && (s.value.states[t]?.entries.length ?? 0) > 0 ? (u(), v("div", {
					key: 0,
					class: k(x(Z).known_line)
				}, [
					T("strong", null, C(e.name), 1),
					n[24] ||= T("br", null, null, -1),
					N(C((s.value.states[t]?.entries ?? []).map((e) => e.title).join(x(a)("opening.ask.joiner"))), 1)
				], 2)) : S("", !0)], 64))), 128))], 2),
				Y.value !== null && Y.value.answers.length > 0 ? (u(), v("div", {
					key: 0,
					class: k(x(Z).known_block)
				}, [T("h3", { class: k(x(Z).known_title) }, C(x(a)("opening.known.answered")), 3), (u(!0), v(M, null, f(Y.value.answers, (e, t) => (u(), v("div", {
					key: t,
					class: k(x(Z).known_line)
				}, C(He(e.selected, e.other)), 3))), 128))], 2)) : S("", !0),
				T("div", { class: k(x(Z).known_block) }, [T("h3", { class: k(x(Z).known_title) }, C(x(a)("opening.known.draft")), 3), T("div", { class: k(x(Z).known_line) }, [
					N(C(x(a)("opening.known.connection", { name: we(s.value) })), 1),
					n[26] ||= T("br", null, null, -1),
					N(C(x(a)("opening.known.preset", { name: s.value.preset_name === "in_use" ? x(a)("opening.settings.preset_in_use") : s.value.preset_name })), 1),
					n[27] ||= T("br", null, null, -1),
					s.value.card === null ? S("", !0) : (u(), v(M, { key: 0 }, [N(C(s.value.use_greeting ? x(a)("opening.known.card_greeting", { name: s.value.card.name }) : x(a)("opening.known.card", { name: s.value.card.name })), 1), n[25] ||= T("br", null, null, -1)], 64)),
					N(C(s.value.worldbooks.length === 0 ? x(a)("opening.known.no_books") : x(a)("opening.known.books", { names: s.value.worldbooks.join(x(a)("opening.ask.joiner")) })), 1)
				], 2)], 2)
			], 10, wt)) : S("", !0)], 2),
			e.host !== null && s.value !== null ? (u(), w(lt, {
				key: 0,
				open: rt.value,
				"onUpdate:open": n[20] ||= (e) => rt.value = e,
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
			])) : S("", !0),
			F(pe, {
				open: Q.value,
				"onUpdate:open": n[21] ||= (e) => Q.value = e,
				title: x(a)("opening.output.append_title"),
				description: ct.value === null ? x(a)("opening.output.append_no_chat") : x(a)("opening.output.append_description", {
					chat: ct.value,
					speaker: tt.value?.speaker ?? ""
				}),
				"confirm-label": x(a)("opening.output.append_confirm"),
				"cancel-label": x(a)("common.actions.cancel"),
				pending: st.value,
				destructive: !1,
				onConfirm: n[22] ||= (e) => ct.value === null ? Q.value = !1 : Et()
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			F(pe, {
				open: b.value,
				"onUpdate:open": n[23] ||= (e) => b.value = e,
				title: x(a)("opening.draft.delete_title", { name: s.value?.display_name ?? "" }),
				description: x(a)("opening.draft.delete_description"),
				"confirm-label": x(a)("common.actions.delete"),
				"cancel-label": x(a)("common.actions.cancel"),
				pending: D.value,
				onConfirm: P
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
}), Dt = ["aria-label"], Ot = ["aria-current", "onClick"], kt = ["id", "value"], At = [
	"value",
	"disabled",
	"aria-label",
	"onInput"
], jt = [
	"value",
	"disabled",
	"aria-label",
	"placeholder",
	"onInput"
], Mt = /* @__PURE__ */ P({
	__name: "OpeningTemplates",
	props: /*@__PURE__*/ l({
		store: {},
		templates: {},
		saveError: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: ["update:section"],
	setup(e) {
		let t = e, n = g(e, "section"), { t: r } = E(), i = j(je), a = O(() => t.templates.find((e) => e.id === i.value) ?? t.templates[0] ?? null), o = O(() => a.value !== null && !a.value.builtin), s = O(() => [{
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
		function d(e, t, n = !1) {
			l((n) => {
				let r = n.steps[e];
				r !== void 0 && t(r);
			}, n);
		}
		function p(e, t) {
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
		function _(e, t) {
			(t === "entries" || t === "message") && d(e, (e) => {
				e.output = t;
			});
		}
		let y = j(!1);
		async function b() {
			let e = a.value;
			e !== null && !e.builtin && (await t.store.remove(e.id), y.value = !1, i.value = je);
		}
		return (t, g) => (u(), v("div", { class: k(x(Z).layout) }, [
			T("aside", {
				class: k(x(Z).aside),
				"aria-label": x(r)("opening.templates.list_label")
			}, [
				F(B, {
					class: k(x(Z).aside_new),
					icon: x(oe),
					label: x(r)("opening.templates.new"),
					onClick: g[0] ||= (e) => c(null)
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				T("div", { class: k(x(Z).aside_title) }, C(x(r)("opening.templates.list_title")), 3),
				(u(!0), v(M, null, f(e.templates, (e) => (u(), v("button", {
					key: e.id,
					type: "button",
					class: k(["tc-interactive", x(Z).item]),
					"aria-current": e.id === a.value?.id ? "true" : void 0,
					onClick: (t) => i.value = e.id
				}, [T("span", { class: k(x(Z).item_name) }, C(e.display_name), 3), T("span", { class: k(x(Z).item_meta) }, C(e.builtin ? x(r)("opening.templates.builtin_meta", { n: e.steps.length }) : x(r)("opening.templates.meta", { n: e.steps.length })), 3)], 10, Ot))), 128))
			], 10, Dt),
			T("div", { class: k(x(Z).work) }, [a.value === null ? S("", !0) : (u(), v("div", {
				key: 0,
				class: k(x(Z).work_inner)
			}, [
				T("div", { class: k(x(Z).topline) }, [
					F(ze, {
						modelValue: n.value,
						"onUpdate:modelValue": g[1] ||= (e) => n.value = e
					}, null, 8, ["modelValue"]),
					T("span", { class: k(x(Z).spacer) }, null, 2),
					F(B, {
						icon: x(ne),
						label: x(r)("opening.templates.copy"),
						variant: "ghost",
						onClick: g[2] ||= (e) => c(a.value)
					}, null, 8, ["icon", "label"]),
					o.value ? (u(), w(G, {
						key: 0,
						icon: x(ce),
						label: x(r)("opening.templates.delete"),
						destructive: "",
						onClick: g[3] ||= (e) => y.value = !0
					}, null, 8, ["icon", "label"])) : S("", !0)
				], 2),
				e.saveError === null ? S("", !0) : (u(), v("p", {
					key: 0,
					class: k(x(Z).error),
					role: "alert"
				}, C(x(r)("opening.errors.save", { reason: e.saveError })), 3)),
				T("div", { class: k(x(Z).work_head) }, [o.value ? (u(), w(U, {
					key: 1,
					label: x(r)("opening.templates.name_label")
				}, {
					default: A(({ fieldId: e }) => [T("input", {
						id: e,
						value: a.value.display_name,
						class: k(x(Z).input),
						maxlength: "60",
						onInput: g[4] ||= (e) => {
							l((t) => {
								t.display_name = e.target.value;
							}, !0);
						}
					}, null, 42, kt)]),
					_: 1
				}, 8, ["label"])) : (u(), v("h1", {
					key: 0,
					class: k(x(Z).work_title)
				}, C(a.value.display_name), 3)), T("p", { class: k(x(Z).work_description) }, C(o.value ? x(r)("opening.templates.hint") : x(r)("opening.templates.builtin_hint")), 3)], 2),
				(u(!0), v(M, null, f(a.value.steps, (e, t) => (u(), v("div", {
					key: e.id,
					class: k(x(Z).template_step)
				}, [
					T("span", { class: k(x(Z).template_number) }, C(t + 1), 3),
					T("div", { class: k(x(Z).template_fields) }, [T("input", {
						value: e.name,
						class: k(x(Z).input),
						maxlength: "40",
						disabled: !o.value,
						"aria-label": x(r)("opening.templates.step_name", { n: t + 1 }),
						onInput: (e) => {
							d(t, (t) => {
								t.name = e.target.value;
							}, !0);
						}
					}, null, 42, At), T("textarea", {
						value: e.instruction,
						class: k(x(Z).text_area_small),
						maxlength: "2000",
						disabled: !o.value,
						"aria-label": x(r)("opening.templates.step_instruction", { n: t + 1 }),
						placeholder: x(r)("opening.templates.instruction_placeholder"),
						onInput: (e) => {
							d(t, (t) => {
								t.instruction = e.target.value;
							}, !0);
						}
					}, null, 42, jt)], 2),
					T("div", { class: k(x(Z).template_side) }, [
						T("span", { class: k(x(Z).hint) }, C(x(r)("opening.templates.rounds_label")), 3),
						F(fe, {
							"model-value": e.max_rounds,
							label: x(r)("opening.templates.rounds_label"),
							"increment-label": x(r)("opening.templates.rounds_up"),
							"decrement-label": x(r)("opening.templates.rounds_down"),
							min: 0,
							max: x(3),
							disabled: !o.value,
							"onUpdate:modelValue": (e) => d(t, (t) => {
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
						F(te, {
							"model-value": e.output,
							options: s.value,
							placeholder: x(r)("opening.templates.output_label"),
							"aria-label": x(r)("opening.templates.output_label"),
							disabled: !o.value,
							"onUpdate:modelValue": (e) => _(t, e)
						}, null, 8, [
							"model-value",
							"options",
							"placeholder",
							"aria-label",
							"disabled",
							"onUpdate:modelValue"
						]),
						o.value ? (u(), v("div", {
							key: 0,
							class: k(x(Z).row)
						}, [
							F(G, {
								icon: x(ve),
								label: x(r)("opening.templates.move_up"),
								size: "sm",
								disabled: t === 0,
								onClick: (e) => p(t, -1)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]),
							F(G, {
								icon: x(ge),
								label: x(r)("opening.templates.move_down"),
								size: "sm",
								disabled: t === a.value.steps.length - 1,
								onClick: (e) => p(t, 1)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]),
							F(G, {
								icon: x(ce),
								label: x(r)("opening.templates.remove_step"),
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
						], 2)) : S("", !0)
					], 2)
				], 2))), 128)),
				o.value ? (u(), v("div", {
					key: 1,
					class: k(x(Z).row)
				}, [F(B, {
					icon: x(oe),
					label: x(r)("opening.templates.add_step"),
					disabled: a.value.steps.length >= x(12),
					onClick: m
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				])], 2)) : S("", !0)
			], 2))], 2),
			F(pe, {
				open: y.value,
				"onUpdate:open": g[5] ||= (e) => y.value = e,
				title: x(r)("opening.templates.delete_title", { name: a.value?.display_name ?? "" }),
				description: x(r)("opening.templates.delete_description"),
				"confirm-label": x(r)("common.actions.delete"),
				"cancel-label": x(r)("common.actions.cancel"),
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
}), $ = { type: "string" }, Nt = {
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
}, Pt = {
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
}, Ft = {
	name: "tavern_canvas_opening_question",
	value: {
		type: "object",
		properties: { question: { anyOf: [Nt, { type: "null" }] } },
		required: ["question"],
		additionalProperties: !1
	}
}, It = {
	name: "tavern_canvas_opening_entries",
	value: {
		type: "object",
		properties: { entries: {
			type: "array",
			items: Pt
		} },
		required: ["entries"],
		additionalProperties: !1
	}
}, Lt = {
	name: "tavern_canvas_opening_entry",
	value: {
		type: "object",
		properties: { entry: Pt },
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
	for (let r of W(e, t)) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let t = n.safeParse(e);
		if (t.success) return t.data;
	}
	throw new ue(`The reply contains no ${r} JSON object`, e);
}
var qt = t({ question: a((e) => typeof e == "object" && e && "options" in e && Array.isArray(e.options) ? {
	...e,
	options: e.options.slice(0, 5)
} : e, q).nullable() });
function Jt(e, t, n) {
	return {
		user_input: [
			...Wt(e, t),
			"",
			`Decide whether one more question is needed before writing this step. At most ${String(n)} more may be asked in this step.`,
			"Ask only about a choice that changes what this step writes and that the description and the answers leave open. Never ask about anything already settled.",
			"If you ask: write the question, a one-sentence reason it matters (why), and 3 or 4 options, each a short label with a one-sentence detail. Set multiple to true only when several options can hold at once. Do not add an 'other' option; the user can always type their own.",
			"If nothing important is open, set question to null.",
			"Reply with only a JSON object of the form {\"question\": {...} or null}."
		].join("\n"),
		json_schema: Ft,
		parse: (e) => Kt(e, "question", qt, "question").question
	};
}
var Yt = t({
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: o(n()).transform((e) => [...new Set(e.map((e) => e.trim()).filter((e) => e !== ""))].slice(0, 12)),
	content: n().trim().min(1).max(8e3)
});
function Xt(e) {
	return {
		id: crypto.randomUUID(),
		...e,
		keys: e.constant ? [] : e.keys
	};
}
var Zt = [
	"- One entry per distinct thing: the world overview, each faction, each place, each character, each group of rules.",
	"- title: '<kind>｜<name>', both in the language of the description, for example a faction, a place or a character.",
	"- constant: true only for what must always be in context: the world overview, hard rules of the world, narration and style requirements, content boundaries. Otherwise false.",
	"- keys: when constant is false, 1 to 5 words or names that appear in the story whenever this entry matters; [] when constant is true.",
	"- content: self-contained prose a storyteller can rely on, without referring to other entries by number."
];
function Qt(e, n) {
	return {
		user_input: [
			...Wt(e, n),
			"",
			"Now write this step's result as world book entries.",
			...Zt,
			"Reply with only a JSON object of the form {\"entries\": [...]}."
		].join("\n"),
		json_schema: It,
		parse: (e) => Kt(e, "entries", t({ entries: o(Yt).min(1).max(30) }), "entries").entries.map(Xt)
	};
}
function $t(e, n, r) {
	return {
		user_input: [
			...Wt(e, n),
			"",
			"Entries this step already has:",
			...(e.states[n]?.entries ?? []).map(Vt),
			"",
			`Rewrite only this entry, keeping its subject and fitting everything above: ${Vt(r)}`,
			...Zt.slice(1),
			"Reply with only a JSON object of the form {\"entry\": {...}}."
		].join("\n"),
		json_schema: Lt,
		parse: (e) => ({
			...Xt(Kt(e, "entry", t({ entry: Yt }), "entry").entry),
			id: r.id
		})
	};
}
function en(e, t) {
	return {
		user_input: [
			...Wt(e, t),
			"",
			"Now write the opening message: the first message of the roleplay, sent by the character who meets {{user}} first.",
			"- speaker: that character's name.",
			"- text: the whole message, following the narration person, style and length settled above, ending at a moment {{user}} can answer. Do not speak or act for {{user}}.",
			"Reply with only a JSON object of the form {\"speaker\": \"...\", \"text\": \"...\"}."
		].join("\n"),
		json_schema: Rt,
		parse: (e) => Kt(e, "text", Y, "opening message")
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_flow.ts
function tn(e, t) {
	let n = D(/* @__PURE__ */ new Map()), r = D(/* @__PURE__ */ new Map());
	function i(e) {
		return {
			connection: e.connection,
			preset_name: e.preset_name,
			worldbooks: e.worldbooks,
			text: Gt(e)
		};
	}
	async function a(e, t, i) {
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
	async function o(n, r) {
		let o = n.steps[r];
		o !== void 0 && await a(n, {
			kind: "generate",
			step: r
		}, async () => {
			if (o.output === "message") {
				let a = await e.request(en(n, r), i(n));
				t.edit(n, (e) => {
					let t = e.states[r];
					t !== void 0 && Object.assign(t, {
						message: a,
						question: null,
						status: "done"
					});
				});
			} else {
				let a = await e.request(Qt(n, r), i(n));
				t.edit(n, (e) => {
					let t = e.states[r];
					t !== void 0 && Object.assign(t, {
						entries: a,
						question: null,
						status: "done"
					});
				});
			}
			t.edit(n, (e) => {
				Fe(e, r);
			});
		});
	}
	async function s(n, r) {
		let s = n.steps[r], c = n.states[r];
		if (s === void 0 || c === void 0) return;
		t.edit(n, (e) => {
			e.current = r;
			let t = e.states[r];
			t !== void 0 && (t.status = "asking");
		});
		let l = s.max_rounds - c.answers.length;
		if (l > 0) {
			let o = { asked: !1 };
			if (!await a(n, {
				kind: "question",
				step: r
			}, async () => {
				let a = await e.request(Jt(n, r, l), i(n));
				a !== null && (o.asked = !0, t.edit(n, (e) => {
					let t = e.states[r];
					t !== void 0 && (t.question = a);
				}));
			}) || o.asked) return;
		}
		await o(n, r);
	}
	return {
		busy: (e) => n.get(e) ?? null,
		error: (e) => r.get(e) ?? null,
		run_step: s,
		generate: o,
		async answer(e, n, r) {
			let i = e.current, a = e.states[i]?.question;
			a != null && (t.edit(e, (e) => {
				let t = e.states[i];
				t !== void 0 && (t.answers.push({
					question: a,
					selected: [...n],
					other: r.trim()
				}), t.question = null);
			}), await s(e, i));
		},
		async skip(e) {
			t.edit(e, (e) => {
				let t = e.states[e.current];
				t !== void 0 && (t.question = null);
			}), await o(e, e.current);
		},
		reask(e, n, r) {
			t.edit(e, (e) => {
				let t = e.states[n], i = t?.answers[r];
				t !== void 0 && i !== void 0 && (t.answers = t.answers.slice(0, r), t.question = i.question, t.status = "asking", e.current = n, Fe(e, n));
			});
		},
		async next(e) {
			let n = e.current + 1, r = e.states[n];
			r !== void 0 && (t.edit(e, (e) => {
				e.current = n;
			}), r.status === "pending" && await s(e, n));
		},
		async regenerate_stale(e) {
			for (let t = 0; t < e.steps.length; t += 1) if (e.states[t]?.status === "stale" && (await o(e, t), r.has(e.id))) return;
		},
		async rewrite_entry(n, r, o) {
			await a(n, {
				kind: "rewrite",
				step: r,
				entry_id: o.id
			}, async () => {
				let a = await e.request($t(n, r, o), i(n));
				t.edit(n, (e) => {
					let t = e.states[r]?.entries, n = t?.findIndex((e) => e.id === o.id) ?? -1;
					t !== void 0 && n >= 0 && (t[n] = a), Fe(e, r);
				});
			});
		}
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_messages.ts
var nn = {
	en: async () => (await import("./opening_en-B6QlHgxr.js")).en_messages,
	"zh-CN": async () => (await import("./opening_zh_cn-dbeA5NPb.js")).zh_cn_messages
};
function rn() {
	let e = E({ useScope: "global" }), t = j(!1);
	async function n(n) {
		for (let t of /* @__PURE__ */ new Set(["en", n])) {
			let n = nn[t];
			n !== void 0 && !e.te("opening.title", t) && e.mergeLocaleMessage(t, await n());
		}
		t.value = !0;
	}
	return _(e.locale, (e) => {
		n(e);
	}, { immediate: !0 }), t;
}
//#endregion
//#region src/ui/views/opening/use_opening_store.ts
var an = 600;
function on(e) {
	if (e.kind === "draft") {
		let { id: t, ...n } = e;
		return ke.parse(Le(n));
	}
	let { id: t, builtin: n, ...r } = e;
	return Ae.parse(Le(r));
}
function sn(e) {
	let t = D(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	function i(e) {
		return t.get(e.id) ?? (e.payload.kind === "template" ? X(e) : Ie(e));
	}
	let a = O(() => {
		let n = e.records().map(i).filter((e) => e !== null);
		for (let e of t.values()) n.some((t) => t.id === e.id) || n.push(e);
		return n.sort((e, t) => t.created_at.localeCompare(e.created_at));
	}), o = O(() => a.value.filter((e) => e.kind === "draft")), s = O(() => a.value.filter((e) => e.kind === "template"));
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
				payload: on(n)
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
			}, an));
		},
		async remove(i) {
			let a = r.get(i);
			a !== void 0 && (clearTimeout(a), r.delete(i)), await n.get(i), t.delete(i), n.delete(i), await e.remove(i);
		}
	};
}
//#endregion
//#region src/ui/views/opening/OpeningView.vue
var cn = /* @__PURE__ */ P({
	__name: "OpeningView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = E(), r = h(I, null), i = rn(), a = j(null);
		function o(e) {
			return e instanceof Error ? e.message : String(e);
		}
		let s = sn({
			records: () => t.state.assets.records.opening,
			save: (e) => t.controller.save_asset("opening", e),
			remove: (e) => t.controller.remove_asset("opening", e),
			on_save_error: (e) => {
				a.value = o(e);
			}
		}), c = r === null ? null : tn(r, s), l = j("build"), d = b(null), f = j(null), m = j({
			books: [],
			presets: ["in_use"],
			proxies: [],
			chat_book: null
		});
		function g() {
			let e = d.value;
			if (e !== null) try {
				m.value = {
					books: e.list_worldbooks(),
					presets: e.preset_names(),
					proxies: e.proxy_preset_names(),
					chat_book: e.chat_worldbook()
				};
			} catch (e) {
				f.value = o(e);
			}
		}
		p(async () => {
			if (r !== null) try {
				d.value = await r.host(), g();
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
		let y = O(() => i.value ? [Ne(_, n("opening.builtin.name")), ...s.templates.value] : []);
		return (e, t) => x(i) ? x(r) === null || x(c) === null ? (u(), w(V, {
			key: 1,
			status: "empty",
			"empty-title": x(n)("opening.unavailable_title"),
			"empty-message": x(n)("opening.unavailable_message")
		}, null, 8, ["empty-title", "empty-message"])) : (u(), v(M, { key: 2 }, [l.value === "build" ? (u(), w(Et, {
			key: 0,
			section: l.value,
			"onUpdate:section": t[0] ||= (e) => l.value = e,
			store: x(s),
			flow: x(c),
			host: d.value,
			"host-error": f.value,
			lists: m.value,
			templates: y.value,
			"save-error": a.value,
			onRefreshLists: g
		}, null, 8, [
			"section",
			"store",
			"flow",
			"host",
			"host-error",
			"lists",
			"templates",
			"save-error"
		])) : l.value === "books" ? (u(), w(Ye, {
			key: 1,
			section: l.value,
			"onUpdate:section": t[1] ||= (e) => l.value = e,
			host: d.value,
			"host-error": f.value,
			lists: m.value,
			onRefreshLists: g
		}, null, 8, [
			"section",
			"host",
			"host-error",
			"lists"
		])) : (u(), w(Mt, {
			key: 2,
			section: l.value,
			"onUpdate:section": t[2] ||= (e) => l.value = e,
			store: x(s),
			templates: y.value,
			"save-error": a.value
		}, null, 8, [
			"section",
			"store",
			"templates",
			"save-error"
		]))], 64)) : (u(), w(V, {
			key: 0,
			status: "loading"
		}));
	}
});
//#endregion
export { cn as default };
