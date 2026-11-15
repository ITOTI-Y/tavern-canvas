import { c as e, d as t, g as n, i as r, o as i, p as a, r as o, t as s, u as c, y as l } from "./schemas-BjkyCQYG.js";
import { A as u, E as d, G as f, I as p, J as m, N as h, O as g, R as _, S as v, W as y, Y as b, _ as x, _t as S, b as C, c as ee, d as w, ft as T, g as E, h as D, it as O, k, m as A, mt as j, n as M, o as N, ot as te, rt as P, v as F, y as I } from "./vue-i18n-BQWz_HuU.js";
import { t as L } from "./opening_port-CFwXS5qA.js";
import { n as R, t as z } from "./AppIcon-B1iv8vRB.js";
import { t as B } from "./book-open-D0Ryehb1.js";
import { n as V, r as ne, t as re } from "./StateSurface-Dxa4U6G6.js";
import { t as ie } from "./AppSelect-ne0yiQQW.js";
import { n as ae, t as oe } from "./download-ByOSvXgA.js";
import { t as se } from "./AppCheckbox-CHqNg9ZG.js";
import { n as ce, t as le } from "./refresh-cw-DmykN9Hd.js";
import { n as ue, t as H } from "./FieldGroup-B4bm8x77.js";
import { t as U } from "./sparkles-Beps81HN.js";
import { t as de } from "./trash-2-Cx1sVMBS.js";
import { n as fe } from "./deferred_stylesheets-DhfsdqPo.js";
import { t as pe } from "./analysis_error-a25bWfWj.js";
import { t as me } from "./model_json-B2EVqBvs.js";
import { n as W, t as he } from "./NumberStepper-Q3rxAKj9.js";
import { t as G } from "./IconButton-DbYdD8bu.js";
import { t as ge } from "./ConfirmDialog-BbJ8Vn0S.js";
import { t as _e } from "./AppSwitch-BQKT0Mao.js";
import { t as ve } from "./AppDialog-B_P8hQSz.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/arrow-down.js
var ye = R("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]), be = R("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), xe = R("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), Se = R("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]), Ce = R("chevrons-right", [["path", {
	d: "m6 17 5-5-5-5",
	key: "xnjwq"
}], ["path", {
	d: "m13 17 5-5-5-5",
	key: "17xmmf"
}]]), we = R("file-text", [
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
]), Te = R("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]), Ee = R("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]), De = t({
	id: n().min(1),
	name: n().max(40),
	instruction: n().max(2e3),
	max_rounds: c().int().min(0).max(3),
	output: s(["entries", "message"])
}), K = t({
	label: n().trim().min(1).max(80),
	detail: n().max(240)
}), Oe = t({
	text: n().trim().min(1).max(240),
	why: n().max(240),
	multiple: r(),
	options: o(K).min(2).max(5)
}), q = t({
	question: Oe,
	selected: o(n()),
	other: n()
}), J = t({
	id: n().min(1),
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: o(n().trim().min(1).max(80)).max(12),
	content: n().max(8e3)
}), ke = t({
	speaker: n().trim().min(1).max(80),
	text: n().min(1).max(2e4)
}), Ae = t({
	status: s([
		"pending",
		"asking",
		"done",
		"stale"
	]),
	answers: o(q),
	question: Oe.nullable(),
	entries: o(J),
	message: ke.nullable()
}), je = i("kind", [
	t({ kind: e("analysis") }),
	t({ kind: e("current") }),
	t({
		kind: e("proxy_preset"),
		proxy_preset: n().min(1)
	})
]), Me = t({
	name: n(),
	description: n(),
	personality: n(),
	scenario: n(),
	first_message: n()
}), Ne = t({
	kind: e("draft"),
	display_name: n(),
	created_at: n(),
	description: n().max(4e3),
	template_name: n(),
	steps: o(De).min(1).max(12),
	states: o(Ae),
	current: c().int().min(0),
	started: r(),
	connection: je,
	preset_name: n().min(1),
	worldbooks: o(n()).max(20),
	card: Me.nullable().default(null),
	use_greeting: r().default(!1)
}), Pe = t({
	kind: e("template"),
	display_name: n().max(60),
	created_at: n(),
	steps: o(De).min(1).max(12)
}), Fe = "builtin-default", Ie = [
	"genre",
	"world",
	"cast",
	"rules",
	"opening"
];
function Le(e, t) {
	let n = {
		genre: 2,
		world: 3,
		cast: 3,
		rules: 2,
		opening: 1
	};
	return {
		id: Fe,
		builtin: !0,
		kind: "template",
		display_name: t,
		created_at: "1970-01-01T00:00:00.000Z",
		steps: Ie.map((t) => ({
			id: t,
			...e(t),
			max_rounds: n[t],
			output: t === "opening" ? "message" : "entries"
		}))
	};
}
function Re() {
	return {
		status: "pending",
		answers: [],
		question: null,
		entries: [],
		message: null
	};
}
function ze(e, t) {
	e.states.forEach((e, n) => {
		n > t && (e.status === "done" || e.status === "stale") && (e.status = "stale");
	});
}
function Y(e) {
	let t = Ne.safeParse(e.payload);
	if (!t.success) return null;
	let n = t.data;
	for (; n.states.length < n.steps.length;) n.states.push(Re());
	return n.states.length = n.steps.length, {
		...n,
		current: Math.min(n.current, n.steps.length - 1),
		id: e.id
	};
}
function Be(e) {
	let t = Pe.safeParse(e.payload);
	return t.success ? {
		...t.data,
		id: e.id,
		builtin: !1
	} : null;
}
function X(e) {
	return JSON.parse(JSON.stringify(e));
}
var Ve = {
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
fe("opening", "._layout_g6bg9_5{grid-template-columns:248px minmax(0,1fr);min-height:100%;display:grid}._aside_g6bg9_11{align-self:start;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-3) var(--tc-space-4);flex-direction:column;display:flex;overflow:auto}._aside_new_g6bg9_20{margin:0 var(--tc-space-1) var(--tc-space-2)}._aside_title_g6bg9_24{padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._item_g6bg9_30{color:var(--tc-text);text-align:start;border-radius:14px;gap:6px;padding:10px 12px;display:grid}._item_g6bg9_30:hover{background-color:var(--tc-surface-raised)}._item_g6bg9_30[aria-current=true]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border)}._item_name_g6bg9_48{font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._item_meta_g6bg9_56{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._dots_g6bg9_61{gap:3px;display:flex}._dot_g6bg9_61{background-color:var(--tc-divider);border-radius:999px;flex:1;height:4px}._dot_g6bg9_61[data-state=done]{background-color:var(--tc-accent)}._dot_g6bg9_61[data-state=asking]{background-color:var(--tc-marker)}._dot_g6bg9_61[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border)}._columns_g6bg9_86{grid-template-columns:minmax(0,1fr) 280px;min-width:0;display:grid}._work_g6bg9_92{min-width:0;padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-panel-padding)}._work_inner_g6bg9_97{gap:var(--tc-form-row-gap);max-width:760px;display:grid}._work_inner_g6bg9_97[data-wide]{max-width:none}._topline_g6bg9_107{gap:var(--tc-space-2) var(--tc-space-3);flex-wrap:wrap;align-items:center;display:flex}._spacer_g6bg9_114{flex:1}._compact_g6bg9_118[data-layout]{justify-self:start;width:auto}._work_head_g6bg9_123{gap:var(--tc-space-1);display:grid}._work_title_g6bg9_128{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);overflow-wrap:anywhere;margin:0}._work_description_g6bg9_137,._hint_g6bg9_138{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._error_g6bg9_145{color:var(--tc-error);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere;margin:0}._row_g6bg9_153{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._text_area_g6bg9_160{min-height:168px}._text_area_small_g6bg9_165{min-height:96px}._counter_g6bg9_174{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-align:end}._grid3_g6bg9_180{gap:var(--tc-space-4);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._chip_toggle_g6bg9_186{align-items:center;gap:var(--tc-space-1-5);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);height:32px;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);padding:0 14px;display:inline-flex}._chip_toggle_g6bg9_186[aria-pressed=true]{border-color:var(--tc-marker);background-color:var(--tc-marker);color:var(--tc-on-marker)}._steps_g6bg9_206{gap:var(--tc-space-1);flex-wrap:wrap;display:flex}._step_g6bg9_206{align-items:center;gap:var(--tc-space-2);background-color:var(--tc-surface);height:34px;box-shadow:0 0 0 1px var(--tc-divider);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);white-space:nowrap;border-radius:999px;padding:0 14px 0 6px;display:inline-flex}._step_g6bg9_206:disabled{cursor:default}._step_number_g6bg9_230{background-color:var(--tc-chip-bg);width:22px;height:22px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;display:grid}._step_g6bg9_206[data-state=done] ._step_number_g6bg9_230{background-color:var(--tc-accent);color:var(--tc-on-accent)}._step_g6bg9_206[aria-current=step]{background-color:var(--tc-marker);box-shadow:none;color:var(--tc-on-marker);font-weight:var(--tc-font-weight-semibold)}._step_g6bg9_206[aria-current=step] ._step_number_g6bg9_230{background-color:var(--tc-on-marker);color:var(--tc-marker)}._step_g6bg9_206[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._step_g6bg9_206[data-state=stale] ._step_number_g6bg9_230{border:1.5px dashed var(--tc-accent-border);background-color:#0000}._step_tag_g6bg9_269{color:var(--tc-text-muted);font-size:11px;font-weight:400}._banner_g6bg9_275{gap:var(--tc-space-2) var(--tc-space-3);padding:var(--tc-space-3) 14px;background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);border-radius:14px;flex-wrap:wrap;align-items:center;display:flex}._banner_g6bg9_275>span{flex:260px}._answered_g6bg9_293{gap:2px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:10px 14px;display:grid}._answered_question_g6bg9_305{color:var(--tc-text-muted)}._answered_answer_g6bg9_309{font-weight:var(--tc-font-weight-semibold);grid-column:1}._answered_g6bg9_293>:last-child{grid-area:1/2/3}._ask_g6bg9_319{background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border), 0 8px 24px var(--tc-shadow);border-radius:18px;gap:14px;padding:18px;display:grid}._ask_head_g6bg9_330{gap:var(--tc-space-2) 10px;flex-wrap:wrap;align-items:baseline;display:flex}._ask_title_g6bg9_337{font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg);margin:0}._badge_g6bg9_344{background-color:var(--tc-chip-bg);height:22px;color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);border-radius:999px;align-items:center;padding:0 8px;display:inline-flex}._options_g6bg9_355{gap:var(--tc-space-2);grid-template-columns:repeat(auto-fill,minmax(240px,1fr));display:grid}._option_g6bg9_355{gap:var(--tc-space-1) 10px;padding:var(--tc-space-3) 14px;border:1px solid var(--tc-divider);background-color:var(--tc-canvas);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:auto minmax(0,1fr);display:grid}._option_g6bg9_355[aria-checked=true]{border-color:var(--tc-accent-border);background-color:var(--tc-accent-soft)}._option_mark_g6bg9_378{border:1.5px solid var(--tc-border-field);background-color:var(--tc-field-bg);width:18px;height:18px;color:var(--tc-on-accent);border-radius:6px;grid-row:1/3;place-items:center;margin-top:2px;display:inline-grid}._option_mark_g6bg9_378[data-shape=radio]{border-radius:999px}._option_g6bg9_355[aria-checked=true] ._option_mark_g6bg9_378{border-color:var(--tc-accent);background-color:var(--tc-accent)}._option_label_g6bg9_400{font-weight:var(--tc-font-weight-semibold)}._option_detail_g6bg9_404{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);line-height:18px}._entries_g6bg9_411{gap:10px;display:grid}._entry_g6bg9_416{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);display:grid}._entry_head_g6bg9_425{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._entry_title_g6bg9_432{overflow-wrap:anywhere;font-size:15px;font-weight:650}._entry_content_g6bg9_438{font-size:var(--tc-font-size-sm);white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:21px}._pill_g6bg9_446{background-color:var(--tc-chip-bg);height:20px;color:var(--tc-text-muted);white-space:nowrap;border-radius:999px;align-items:center;padding:0 8px;font-size:11px;font-weight:600;display:inline-flex}._pill_g6bg9_446[data-tone=constant]{background-color:var(--tc-accent);color:var(--tc-on-accent)}._pill_g6bg9_446[data-tone=new]{background-color:var(--tc-marker);color:var(--tc-on-marker)}._pill_g6bg9_446[data-tone=modified]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._keys_g6bg9_475{gap:var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);flex-wrap:wrap;align-items:center;display:flex}._key_g6bg9_475{background-color:var(--tc-chip-bg);border-radius:999px;align-items:center;height:22px;padding:0 8px;display:inline-flex}._editor_g6bg9_493{padding:var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border);gap:14px;display:grid}._foot_g6bg9_502{gap:var(--tc-space-2);padding:var(--tc-space-3) 0;background-color:var(--tc-canvas);flex-wrap:wrap;align-items:center;display:flex;position:sticky;bottom:0}._bubble_g6bg9_514{gap:var(--tc-space-2);padding:var(--tc-space-4);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:18px;display:grid}._bubble_name_g6bg9_523{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._bubble_text_g6bg9_528{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:23px}._outputs_g6bg9_535{gap:var(--tc-space-3);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._output_g6bg9_535{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);align-content:start;display:grid}._output_title_g6bg9_551{gap:var(--tc-space-2);font-size:var(--tc-font-size-md);align-items:center;margin:0;display:flex}._known_g6bg9_560{gap:var(--tc-space-4);padding:var(--tc-space-3) var(--tc-space-4) var(--tc-space-4);border-left:1px solid var(--tc-divider);align-content:start;display:grid}._known_block_g6bg9_568{gap:6px;display:grid}._known_title_g6bg9_573{font-size:var(--tc-font-size-sm);margin:0;font-weight:700}._known_line_g6bg9_579{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere}._known_line_g6bg9_579 strong{color:var(--tc-text);font-weight:var(--tc-font-weight-semibold)}._known_toggle_g6bg9_591{display:none}._table_g6bg9_596{gap:6px;display:grid}._table_row_g6bg9_601{gap:var(--tc-space-3);padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:40px minmax(0,200px) minmax(0,1fr) 48px auto;align-items:center;display:grid}._table_row_g6bg9_601[data-off]{opacity:.55}._table_name_g6bg9_617{gap:var(--tc-space-1);font-weight:var(--tc-font-weight-semibold);overflow-wrap:anywhere;display:grid}._preview_g6bg9_624{color:var(--tc-text-muted);-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:19px;display:-webkit-box;overflow:hidden}._order_g6bg9_633{color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);text-align:center}._write_list_g6bg9_641{gap:6px;max-height:46vh;display:grid;overflow:auto}._write_row_g6bg9_648{padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:12px;grid-template-columns:auto auto minmax(0,1fr);align-items:start;gap:10px;display:grid}._write_row_g6bg9_648[data-status=same]{opacity:.6}._diff_g6bg9_664{font-size:var(--tc-font-size-xs);gap:2px;line-height:18px;display:grid}._diff_g6bg9_664 del{color:var(--tc-text-muted)}._diff_g6bg9_664 ins{background-color:var(--tc-accent-soft);text-decoration:none}._template_step_g6bg9_681{gap:10px var(--tc-space-3);padding:var(--tc-space-3) 14px;border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:auto minmax(0,1fr) auto;align-items:start;display:grid}._template_number_g6bg9_692{background-color:var(--tc-chip-bg);width:24px;height:24px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;margin-top:6px;display:grid}._template_fields_g6bg9_704{gap:var(--tc-space-2);min-width:0;display:grid}._template_side_g6bg9_710{gap:var(--tc-space-2);justify-items:end;display:grid}@container studio-workspace (width<=640px){._layout_g6bg9_5,._columns_g6bg9_86{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._aside_g6bg9_11{padding:var(--tc-space-1) var(--tc-space-4) var(--tc-space-2);scrollbar-width:none;flex-direction:row;overflow-x:auto}._aside_new_g6bg9_20{flex:none;margin:0}._aside_title_g6bg9_24,._item_meta_g6bg9_56,._dots_g6bg9_61{display:none}._item_g6bg9_30{max-width:200px;padding:6px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:999px;flex:none}._work_g6bg9_92{padding:var(--tc-space-2) var(--tc-space-4) var(--tc-space-4)}._work_title_g6bg9_128{font-size:22px;line-height:28px}._steps_g6bg9_206{scrollbar-width:none;flex-wrap:nowrap;overflow-x:auto}._step_g6bg9_206{flex:none}._step_g6bg9_206:not([aria-current=step]) ._step_label_g6bg9_769{display:none}._known_g6bg9_560{border-left:0;display:none}._known_g6bg9_560[data-open]{padding:0 var(--tc-space-4) var(--tc-space-4);display:grid}._known_toggle_g6bg9_591{display:inline-flex}._table_row_g6bg9_601{grid-template-columns:40px minmax(0,1fr) auto}._preview_g6bg9_624,._order_g6bg9_633{display:none}._template_step_g6bg9_681{grid-template-columns:minmax(0,1fr)}._template_number_g6bg9_692{display:none}._template_side_g6bg9_710{justify-items:start}}");
var Z = Ve, He = /* @__PURE__ */ v({
	__name: "OpeningSectionSwitch",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = y(e, "modelValue"), { t: n } = M(), r = A(() => [
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
		return (e, a) => (p(), E(W, {
			"model-value": t.value,
			class: j(T(Z).compact),
			options: r.value,
			label: T(n)("opening.sections.label"),
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
function Ue(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region src/ui/views/opening/OpeningBooks.vue?vue&type=script&setup=true&lang.ts
var We = ["aria-label"], Ge = ["aria-current", "onClick"], Ke = ["placeholder", "aria-label"], qe = ["id"], Je = ["id", "aria-describedby"], Ye = ["id"], Xe = ["data-off"], Ze = ["aria-label"], Qe = /* @__PURE__ */ v({
	__name: "OpeningBooks",
	props: /*@__PURE__*/ g({
		host: {},
		hostError: {},
		lists: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: /*@__PURE__*/ g(["refresh-lists"], ["update:section"]),
	setup(e, { emit: t }) {
		let n = e, r = y(e, "section"), i = t, { t: a } = M(), o = O(n.lists.chat_book ?? n.lists.books[0] ?? null), s = O([]), c = O(!1), l = O(!1), u = O(null);
		async function d() {
			if (s.value = [], n.host !== null && o.value !== null) {
				c.value = !0, u.value = null;
				try {
					s.value = await n.host.read_entries(o.value);
				} catch (e) {
					u.value = a("opening.errors.failed", { reason: Ue(e) });
				} finally {
					c.value = !1;
				}
			}
		}
		f(o, () => void d(), { immediate: !0 }), f(() => n.lists.books, (e) => {
			(o.value === null || !e.includes(o.value)) && (o.value = n.lists.chat_book ?? e[0] ?? null);
		});
		async function h(e) {
			if (n.host === null) return !1;
			l.value = !0, u.value = null;
			try {
				return await e(n.host), i("refresh-lists"), await d(), !0;
			} catch (e) {
				return u.value = a("opening.errors.failed", { reason: Ue(e) }), !1;
			} finally {
				l.value = !1;
			}
		}
		let g = O(null), v = O(""), ee = A(() => v.value.trim() !== o.value && n.lists.books.includes(v.value.trim()));
		function te(e) {
			v.value = e === "rename" ? o.value ?? "" : "", g.value = e;
		}
		async function P() {
			let e = v.value.trim(), t = g.value, n = o.value;
			e === "" || ee.value || t === null || await h((r) => t === "create" || n === null ? r.create_worldbook(e) : r.rename_worldbook(n, e)) && (g.value = null, o.value = e);
		}
		let L = O(!1);
		async function R() {
			let e = o.value;
			e !== null && await h((t) => t.delete_worldbook(e)) && (L.value = !1, o.value = null);
		}
		async function z() {
			let e = o.value;
			e !== null && await h((t) => t.bind_chat_worldbook(e));
		}
		function B(e) {
			return e === n.lists.chat_book ? a("opening.books.bound") : "";
		}
		let ne = O(""), ae = O("all"), oe = A(() => [
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
		]), se = A(() => {
			let e = ne.value.trim().toLowerCase();
			return s.value.filter((t) => ae.value === "constant" && !t.constant || ae.value === "keyword" && t.constant ? !1 : e === "" || [
				t.name,
				t.content,
				...t.keys
			].some((t) => t.toLowerCase().includes(e)));
		}), le = A(() => s.value.filter((e) => e.enabled).length), U = O(null);
		function fe(e) {
			let t = s.value.reduce((e, t) => Math.max(e, t.order), 0);
			U.value = e === null ? {
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
		async function pe() {
			let e = U.value, t = o.value;
			if (e === null || t === null) return;
			let n = [...new Set(e.keys.split(/[,，、]/u).map((e) => e.trim()).filter((e) => e !== ""))];
			await h((r) => r.save_entries(t, {
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
			})) && (U.value = null);
		}
		async function me(e, t) {
			let n = o.value;
			n !== null && await h((r) => r.save_entries(n, {
				upsert: [{
					...e,
					enabled: t
				}],
				remove: []
			}));
		}
		let W = O(null);
		async function ye() {
			let e = W.value, t = o.value;
			e !== null && t !== null && (await h((n) => n.save_entries(t, {
				upsert: [],
				remove: [e.uid]
			})), W.value = null);
		}
		return (t, n) => (p(), F("div", { class: j(T(Z).layout) }, [
			D("aside", {
				class: j(T(Z).aside),
				"aria-label": T(a)("opening.books.list_label")
			}, [
				C(V, {
					class: j(T(Z).aside_new),
					icon: T(ue),
					label: T(a)("opening.books.new"),
					disabled: e.host === null,
					onClick: n[0] ||= (e) => te("create")
				}, null, 8, [
					"class",
					"icon",
					"label",
					"disabled"
				]),
				e.lists.books.length > 0 ? (p(), F("div", {
					key: 0,
					class: j(T(Z).aside_title)
				}, S(T(a)("opening.books.list_title")), 3)) : x("", !0),
				(p(!0), F(w, null, _(e.lists.books, (e) => (p(), F("button", {
					key: e,
					type: "button",
					class: j(["tc-interactive", T(Z).item]),
					"aria-current": e === o.value ? "true" : void 0,
					onClick: (t) => o.value = e
				}, [D("span", { class: j(T(Z).item_name) }, S(e), 3), B(e) === "" ? x("", !0) : (p(), F("span", {
					key: 0,
					class: j(T(Z).item_meta)
				}, S(B(e)), 3))], 10, Ge))), 128))
			], 10, We),
			D("div", { class: j(T(Z).work) }, [D("div", {
				class: j(T(Z).work_inner),
				"data-wide": ""
			}, [D("div", { class: j(T(Z).topline) }, [
				C(He, {
					modelValue: r.value,
					"onUpdate:modelValue": n[1] ||= (e) => r.value = e
				}, null, 8, ["modelValue"]),
				D("span", { class: j(T(Z).spacer) }, null, 2),
				o.value === null ? x("", !0) : (p(), F(w, { key: 0 }, [
					o.value !== e.lists.chat_book && e.host?.chat_name() !== null ? (p(), E(V, {
						key: 0,
						icon: T(Te),
						label: T(a)("opening.books.bind"),
						variant: "ghost",
						disabled: l.value,
						onClick: z
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])) : x("", !0),
					C(V, {
						icon: T(ce),
						label: T(a)("opening.books.rename"),
						variant: "ghost",
						disabled: l.value,
						onClick: n[2] ||= (e) => te("rename")
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					]),
					C(G, {
						icon: T(de),
						label: T(a)("opening.books.delete"),
						destructive: "",
						disabled: l.value,
						onClick: n[3] ||= (e) => L.value = !0
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])
				], 64))
			], 2), e.host === null ? (p(), E(re, {
				key: 0,
				status: "empty",
				"empty-title": T(a)("opening.books.unavailable_title"),
				"empty-message": e.hostError ?? T(a)("opening.books.unavailable_message")
			}, null, 8, ["empty-title", "empty-message"])) : o.value === null ? (p(), F("div", {
				key: 1,
				class: j(T(Z).work_head)
			}, [D("h1", { class: j(T(Z).work_title) }, S(T(a)("opening.books.title")), 3), D("p", { class: j(T(Z).work_description) }, S(T(a)("opening.books.empty")), 3)], 2)) : (p(), F(w, { key: 2 }, [
				D("div", { class: j(T(Z).work_head) }, [D("h1", { class: j(T(Z).work_title) }, S(o.value), 3), D("p", { class: j(T(Z).work_description) }, [I(S(T(a)("opening.books.summary", {
					n: s.value.length,
					enabled: le.value
				})) + " ", 1), o.value === e.lists.chat_book ? (p(), F(w, { key: 0 }, [I(" · " + S(T(a)("opening.books.bound")), 1)], 64)) : x("", !0)], 2)], 2),
				u.value === null ? x("", !0) : (p(), F("p", {
					key: 0,
					class: j(T(Z).error),
					role: "alert"
				}, S(u.value), 3)),
				D("div", { class: j(T(Z).row) }, [
					b(D("input", {
						"onUpdate:modelValue": n[4] ||= (e) => ne.value = e,
						class: j([T(Z).input, T(Z).spacer]),
						type: "search",
						placeholder: T(a)("opening.books.search"),
						"aria-label": T(a)("opening.books.search")
					}, null, 10, Ke), [[N, ne.value]]),
					C(ie, {
						modelValue: ae.value,
						"onUpdate:modelValue": n[5] ||= (e) => ae.value = e,
						options: oe.value,
						placeholder: T(a)("opening.books.filter_all"),
						"aria-label": T(a)("opening.books.filter_label")
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder",
						"aria-label"
					]),
					C(V, {
						icon: T(ue),
						label: T(a)("opening.books.add_entry"),
						disabled: l.value,
						onClick: n[6] ||= (e) => fe(null)
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])
				], 2),
				U.value === null ? x("", !0) : (p(), F("div", {
					key: 1,
					class: j(T(Z).editor)
				}, [
					D("div", { class: j(T(Z).grid3) }, [C(H, { label: T(a)("opening.entry.title_label") }, {
						default: m(({ fieldId: e }) => [b(D("input", {
							id: e,
							"onUpdate:modelValue": n[7] ||= (e) => U.value.name = e,
							class: j(T(Z).input),
							maxlength: "120"
						}, null, 10, qe), [[N, U.value.name]])]),
						_: 1
					}, 8, ["label"]), C(H, { label: T(a)("opening.books.order_label") }, {
						default: m(({ fieldId: e }) => [C(he, {
							id: e,
							modelValue: U.value.order,
							"onUpdate:modelValue": n[8] ||= (e) => U.value.order = e,
							label: T(a)("opening.books.order_label"),
							"increment-label": T(a)("opening.books.order_up"),
							"decrement-label": T(a)("opening.books.order_down"),
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
					C(_e, {
						modelValue: U.value.constant,
						"onUpdate:modelValue": n[9] ||= (e) => U.value.constant = e,
						label: T(a)("opening.entry.constant_label"),
						description: T(a)("opening.entry.constant_hint")
					}, null, 8, [
						"modelValue",
						"label",
						"description"
					]),
					U.value.constant ? x("", !0) : (p(), E(H, {
						key: 0,
						label: T(a)("opening.entry.keys_label"),
						hint: T(a)("opening.entry.keys_hint")
					}, {
						default: m(({ fieldId: e, describedBy: t }) => [b(D("input", {
							id: e,
							"onUpdate:modelValue": n[10] ||= (e) => U.value.keys = e,
							class: j(T(Z).input),
							"aria-describedby": t
						}, null, 10, Je), [[N, U.value.keys]])]),
						_: 1
					}, 8, ["label", "hint"])),
					C(H, { label: T(a)("opening.entry.content_label") }, {
						default: m(({ fieldId: e }) => [b(D("textarea", {
							id: e,
							"onUpdate:modelValue": n[11] ||= (e) => U.value.content = e,
							class: j(T(Z).text_area)
						}, null, 10, Ye), [[N, U.value.content]])]),
						_: 1
					}, 8, ["label"]),
					D("div", { class: j(T(Z).row) }, [
						D("span", { class: j(T(Z).spacer) }, null, 2),
						C(V, {
							label: T(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[12] ||= (e) => U.value = null
						}, null, 8, ["label"]),
						C(V, {
							label: T(a)("common.actions.save"),
							variant: "primary",
							pending: l.value,
							disabled: U.value.name.trim() === "",
							onClick: pe
						}, null, 8, [
							"label",
							"pending",
							"disabled"
						])
					], 2)
				], 2)),
				C(re, {
					status: c.value ? "loading" : se.value.length === 0 ? "empty" : "ready",
					"empty-title": T(a)("opening.books.no_entries"),
					"min-height": "80px"
				}, {
					default: m(() => [D("div", { class: j(T(Z).table) }, [(p(!0), F(w, null, _(se.value, (e) => (p(), F("div", {
						key: e.uid,
						class: j(T(Z).table_row),
						"data-off": e.enabled ? void 0 : ""
					}, [
						C(_e, {
							"model-value": e.enabled,
							label: T(a)("opening.books.enabled", { name: e.name }),
							"label-hidden": "",
							disabled: l.value,
							"onUpdate:modelValue": (t) => me(e, t)
						}, null, 8, [
							"model-value",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						D("span", { class: j(T(Z).table_name) }, [I(S(e.name) + " ", 1), D("span", { class: j(T(Z).keys) }, [e.constant ? (p(), F("span", {
							key: 0,
							class: j(T(Z).pill),
							"data-tone": "constant"
						}, S(T(a)("opening.entry.constant")), 3)) : (p(!0), F(w, { key: 1 }, _(e.keys.slice(0, 4), (e) => (p(), F("span", {
							key: e,
							class: j(T(Z).key)
						}, S(e), 3))), 128))], 2)], 2),
						D("span", { class: j(T(Z).preview) }, S(e.content), 3),
						D("span", { class: j(T(Z).order) }, S(e.order), 3),
						D("span", { class: j(T(Z).row) }, [C(G, {
							icon: T(ce),
							label: T(a)("opening.entry.edit"),
							size: "sm",
							disabled: l.value,
							onClick: (t) => fe(e)
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						]), C(G, {
							icon: T(de),
							label: T(a)("opening.entry.remove"),
							size: "sm",
							destructive: "",
							disabled: l.value,
							onClick: (t) => W.value = e
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						])], 2)
					], 10, Xe))), 128))], 2)]),
					_: 1
				}, 8, ["status", "empty-title"])
			], 64))], 2)], 2),
			C(ve, k({
				open: g.value !== null,
				title: g.value === "rename" ? T(a)("opening.books.rename") : T(a)("opening.books.new")
			}, g.value === "rename" ? { description: T(a)("opening.books.rename_hint") } : {}, {
				"close-label": T(a)("common.actions.close"),
				"onUpdate:open": n[15] ||= (e) => g.value = e ? g.value : null
			}), {
				default: m(() => [D("div", { class: j(T(Z).work_inner) }, [
					b(D("input", {
						"onUpdate:modelValue": n[13] ||= (e) => v.value = e,
						class: j(T(Z).input),
						maxlength: "120",
						"aria-label": T(a)("opening.books.name_label")
					}, null, 10, Ze), [[N, v.value]]),
					ee.value ? (p(), F("p", {
						key: 0,
						class: j(T(Z).error)
					}, S(T(a)("opening.write.name_taken")), 3)) : x("", !0),
					D("div", { class: j(T(Z).row) }, [
						D("span", { class: j(T(Z).spacer) }, null, 2),
						C(V, {
							label: T(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[14] ||= (e) => g.value = null
						}, null, 8, ["label"]),
						C(V, {
							label: T(a)("common.actions.save"),
							variant: "primary",
							pending: l.value,
							disabled: v.value.trim() === "" || ee.value,
							onClick: P
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
			C(ge, {
				open: L.value,
				"onUpdate:open": n[16] ||= (e) => L.value = e,
				title: T(a)("opening.books.delete_title", { name: o.value ?? "" }),
				description: T(a)("opening.books.delete_description"),
				"confirm-label": T(a)("common.actions.delete"),
				"cancel-label": T(a)("common.actions.cancel"),
				pending: l.value,
				onConfirm: R
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			C(ge, {
				open: W.value !== null,
				title: T(a)("opening.books.delete_entry_title", { name: W.value?.name ?? "" }),
				description: T(a)("opening.books.delete_entry_description"),
				"confirm-label": T(a)("common.actions.delete"),
				"cancel-label": T(a)("common.actions.cancel"),
				pending: l.value,
				"onUpdate:open": n[17] ||= (e) => W.value = e ? W.value : null,
				onConfirm: ye
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
function $e(e) {
	return e.states.flatMap((e) => e.status === "done" || e.status === "stale" ? e.entries : []);
}
var et = (e) => e.trim().toLowerCase();
function tt(e, t) {
	let n = (e) => [...e].sort().join("\n");
	return n(e) === n(t);
}
function nt(e, t) {
	let n = new Map(t.map((e) => [et(e.name), e]));
	return e.map((e) => {
		let t = n.get(et(e.title)) ?? null;
		return t === null ? {
			entry: e,
			existing: null,
			status: "new"
		} : {
			entry: e,
			existing: t,
			status: t.content.trim() === e.content.trim() && t.constant === e.constant && (e.constant || tt(t.keys, e.keys)) ? "same" : "modified"
		};
	});
}
var rt = 10;
function it(e, t, n) {
	let r = n.reduce((e, t) => Math.max(e, t.order), 0);
	return {
		upsert: e.filter((e) => e.status !== "same" && t.has(e.entry.id)).map((e) => {
			let t = {
				name: e.entry.title,
				constant: e.entry.constant,
				keys: e.entry.constant ? [] : e.entry.keys,
				content: e.entry.content
			};
			return e.existing === null ? (r += rt, {
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
function at(e, t) {
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
var ot = ["id"], st = ["id", "aria-describedby"], ct = ["id"], lt = /* @__PURE__ */ v({
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
		let n = e, r = t, { t: i } = M(), a = O(n.editing), o = O(""), s = O(!1), c = O(""), l = O("");
		function u() {
			o.value = n.entry.title, s.value = n.entry.constant, c.value = n.entry.keys.join(", "), l.value = n.entry.content, a.value = !0;
		}
		a.value && u();
		function d() {
			let e = [...new Set(c.value.split(/[,，、]/u).map((e) => e.trim()).filter((e) => e !== ""))];
			r("save", {
				id: n.entry.id,
				title: o.value.trim(),
				constant: s.value,
				keys: s.value ? [] : e.slice(0, 12),
				content: l.value.trim()
			}), a.value = !1;
		}
		function f() {
			a.value = !1, r("cancel");
		}
		return (t, n) => a.value ? (p(), F("div", {
			key: 0,
			class: j(T(Z).editor)
		}, [
			C(H, { label: T(i)("opening.entry.title_label") }, {
				default: m(({ fieldId: e }) => [b(D("input", {
					id: e,
					"onUpdate:modelValue": n[0] ||= (e) => o.value = e,
					class: j(T(Z).input),
					maxlength: "120"
				}, null, 10, ot), [[N, o.value]])]),
				_: 1
			}, 8, ["label"]),
			C(_e, {
				modelValue: s.value,
				"onUpdate:modelValue": n[1] ||= (e) => s.value = e,
				label: T(i)("opening.entry.constant_label"),
				description: T(i)("opening.entry.constant_hint")
			}, null, 8, [
				"modelValue",
				"label",
				"description"
			]),
			s.value ? x("", !0) : (p(), E(H, {
				key: 0,
				label: T(i)("opening.entry.keys_label"),
				hint: T(i)("opening.entry.keys_hint")
			}, {
				default: m(({ fieldId: e, describedBy: t }) => [b(D("input", {
					id: e,
					"onUpdate:modelValue": n[2] ||= (e) => c.value = e,
					class: j(T(Z).input),
					"aria-describedby": t
				}, null, 10, st), [[N, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])),
			C(H, { label: T(i)("opening.entry.content_label") }, {
				default: m(({ fieldId: e }) => [b(D("textarea", {
					id: e,
					"onUpdate:modelValue": n[3] ||= (e) => l.value = e,
					class: j(T(Z).text_area),
					maxlength: "8000"
				}, null, 10, ct), [[N, l.value]])]),
				_: 1
			}, 8, ["label"]),
			D("div", { class: j(T(Z).row) }, [
				D("span", { class: j(T(Z).spacer) }, null, 2),
				C(V, {
					label: T(i)("common.actions.cancel"),
					variant: "ghost",
					onClick: f
				}, null, 8, ["label"]),
				C(V, {
					label: T(i)("common.actions.save"),
					variant: "primary",
					disabled: o.value.trim() === "" || l.value.trim() === "",
					onClick: d
				}, null, 8, ["label", "disabled"])
			], 2)
		], 2)) : (p(), F("article", {
			key: 1,
			class: j(T(Z).entry)
		}, [
			D("div", { class: j(T(Z).entry_head) }, [
				D("span", { class: j(T(Z).entry_title) }, S(e.entry.title), 3),
				e.entry.constant ? (p(), F("span", {
					key: 0,
					class: j(T(Z).pill),
					"data-tone": "constant"
				}, S(T(i)("opening.entry.constant")), 3)) : (p(), F("span", {
					key: 1,
					class: j(T(Z).pill)
				}, S(T(i)("opening.entry.keyword")), 3)),
				D("span", { class: j(T(Z).spacer) }, null, 2),
				C(G, {
					icon: T(le),
					label: T(i)("opening.entry.rewrite"),
					size: "sm",
					disabled: e.disabled || e.rewriting,
					onClick: n[4] ||= (e) => r("rewrite")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				C(G, {
					icon: T(ce),
					label: T(i)("opening.entry.edit"),
					size: "sm",
					disabled: e.disabled,
					onClick: u
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				C(G, {
					icon: T(de),
					label: T(i)("opening.entry.remove"),
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
			!e.entry.constant && e.entry.keys.length > 0 ? (p(), F("div", {
				key: 0,
				class: j(T(Z).keys)
			}, [I(S(T(i)("opening.entry.keys_label")) + " ", 1), (p(!0), F(w, null, _(e.entry.keys, (e) => (p(), F("span", {
				key: e,
				class: j(T(Z).key)
			}, S(e), 3))), 128))], 2)) : x("", !0),
			e.rewriting ? (p(), F("p", {
				key: 1,
				class: j(T(Z).hint),
				role: "status"
			}, S(T(i)("opening.status.rewriting")), 3)) : x("", !0),
			D("p", { class: j(T(Z).entry_content) }, S(e.entry.content), 3)
		], 2));
	}
}), ut = ["aria-label"], dt = ["data-status"], ft = ["data-tone"], pt = /* @__PURE__ */ v({
	__name: "OpeningWriteDialog",
	props: /*@__PURE__*/ g({
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
	emits: /*@__PURE__*/ g(["written"], ["update:open"]),
	setup(e, { emit: t }) {
		let n = e, r = y(e, "open"), i = t, { t: a } = M(), o = O("new"), s = O(""), c = O(void 0), l = O([]), u = O(!1), d = O(!1), h = O(null), g = O(/* @__PURE__ */ new Set()), v = A(() => [{
			value: "new",
			label: a("opening.write.mode_new")
		}, {
			value: "existing",
			label: a("opening.write.mode_existing")
		}]), ee = A(() => n.lists.books.map((e) => ({
			value: e,
			label: e
		}))), k = A(() => nt(n.entries, o.value === "existing" ? l.value : []));
		function te() {
			g.value = new Set(k.value.filter((e) => e.status !== "same").map((e) => e.entry.id));
		}
		async function P() {
			if (l.value = [], o.value !== "existing" || c.value === void 0) {
				te();
				return;
			}
			u.value = !0, h.value = null;
			try {
				l.value = await n.host.read_entries(c.value);
			} catch (e) {
				h.value = a("opening.write.read_failed", { reason: Ue(e) });
			} finally {
				u.value = !1, te();
			}
		}
		f(r, (e) => {
			e && (h.value = null, s.value = n.defaultName, c.value = n.lists.chat_book ?? n.lists.books[0], o.value = n.lists.chat_book === null ? "new" : "existing", P());
		}), f([o, c], () => {
			P();
		});
		function I(e, t) {
			let n = new Set(g.value);
			t === !0 ? n.add(e) : n.delete(e), g.value = n;
		}
		let L = A(() => o.value === "new" ? s.value.trim() : c.value ?? ""), R = A(() => o.value === "new" && n.lists.books.includes(s.value.trim())), z = A(() => k.value.filter((e) => e.status !== "same" && g.value.has(e.entry.id)).length), B = A(() => r.value ? n.host.chat_name() : null);
		function ne(e) {
			switch (e.status) {
				case "new": return a("opening.write.status_new");
				case "modified": return a("opening.write.status_modified");
				case "same": return a("opening.write.status_same");
			}
		}
		async function re() {
			let e = L.value;
			if (!(e === "" || R.value)) {
				d.value = !0, h.value = null;
				try {
					o.value === "new" && await n.host.create_worldbook(e);
					let t = o.value === "new" ? [] : l.value;
					await n.host.save_entries(e, it(k.value, g.value, t)), B.value !== null && await n.host.bind_chat_worldbook(e), i("written", e), r.value = !1;
				} catch (e) {
					h.value = a("opening.write.failed", { reason: Ue(e) });
				} finally {
					d.value = !1;
				}
			}
		}
		return (e, t) => (p(), E(ve, {
			open: r.value,
			"onUpdate:open": t[4] ||= (e) => r.value = e,
			title: T(a)("opening.write.title"),
			description: T(a)("opening.write.description"),
			"close-label": T(a)("common.actions.close")
		}, {
			default: m(() => [D("div", { class: j(T(Z).work_inner) }, [
				C(W, {
					modelValue: o.value,
					"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
					class: j(T(Z).compact),
					options: v.value,
					label: T(a)("opening.write.mode_label")
				}, null, 8, [
					"modelValue",
					"class",
					"options",
					"label"
				]),
				o.value === "new" ? b((p(), F("input", {
					key: 0,
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					class: j(T(Z).input),
					maxlength: "120",
					"aria-label": T(a)("opening.write.name_label")
				}, null, 10, ut)), [[N, s.value]]) : (p(), E(ie, {
					key: 1,
					modelValue: c.value,
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					options: ee.value,
					placeholder: T(a)("opening.write.book_placeholder"),
					"aria-label": T(a)("opening.write.book_label")
				}, null, 8, [
					"modelValue",
					"options",
					"placeholder",
					"aria-label"
				])),
				R.value ? (p(), F("p", {
					key: 2,
					class: j(T(Z).error)
				}, S(T(a)("opening.write.name_taken")), 3)) : x("", !0),
				u.value ? (p(), F("p", {
					key: 3,
					class: j(T(Z).hint),
					role: "status"
				}, S(T(a)("opening.write.loading")), 3)) : (p(), F("div", {
					key: 4,
					class: j(T(Z).write_list)
				}, [(p(!0), F(w, null, _(k.value, (e) => (p(), F("div", {
					key: e.entry.id,
					class: j(T(Z).write_row),
					"data-status": e.status
				}, [
					C(se, {
						"model-value": e.status !== "same" && g.value.has(e.entry.id),
						label: e.entry.title,
						"label-hidden": "",
						disabled: e.status === "same",
						"onUpdate:modelValue": (t) => I(e.entry.id, t)
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]),
					D("span", {
						class: j(T(Z).pill),
						"data-tone": e.status
					}, S(ne(e)), 11, ft),
					D("span", null, [D("strong", null, S(e.entry.title), 1), e.status === "modified" && e.existing !== null ? (p(), F("span", {
						key: 0,
						class: j(T(Z).diff)
					}, [D("del", null, S(e.existing.content), 1), D("ins", null, S(e.entry.content), 1)], 2)) : x("", !0)])
				], 10, dt))), 128))], 2)),
				D("p", { class: j(T(Z).hint) }, S(B.value === null ? T(a)("opening.write.no_chat") : T(a)("opening.write.bind_note", {
					book: L.value,
					chat: B.value
				})), 3),
				h.value === null ? x("", !0) : (p(), F("p", {
					key: 5,
					class: j(T(Z).error),
					role: "alert"
				}, S(h.value), 3)),
				D("div", { class: j(T(Z).row) }, [
					D("span", { class: j(T(Z).spacer) }, null, 2),
					C(V, {
						label: T(a)("common.actions.cancel"),
						variant: "ghost",
						onClick: t[3] ||= (e) => r.value = !1
					}, null, 8, ["label"]),
					C(V, {
						label: T(a)("opening.write.confirm", { n: z.value }),
						variant: "primary",
						pending: d.value,
						disabled: z.value === 0 || L.value === "" || R.value || u.value,
						onClick: re
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
}), mt = ["aria-label"], ht = ["aria-current", "onClick"], gt = ["data-state"], _t = ["id", "value"], vt = [
	"id",
	"value",
	"aria-describedby",
	"placeholder"
], yt = ["aria-pressed", "onClick"], bt = ["aria-label"], xt = [
	"data-state",
	"aria-current",
	"disabled",
	"onClick"
], St = ["role", "aria-label"], Ct = [
	"role",
	"aria-checked",
	"disabled",
	"onClick"
], wt = ["data-shape"], Tt = ["id", "placeholder"], Et = ["id"], Dt = ["id"], Ot = [
	"id",
	"aria-describedby",
	"placeholder"
], kt = ["data-open", "aria-label"], At = 4e3, jt = /* @__PURE__ */ v({
	__name: "OpeningBuild",
	props: /*@__PURE__*/ g({
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
	emits: /*@__PURE__*/ g(["refresh-lists"], ["update:section"]),
	setup(e, { emit: t }) {
		let n = e, r = y(e, "section"), i = t, { t: a } = M(), o = O(n.store.drafts.value[0]?.id ?? null), s = A(() => o.value === null ? null : n.store.draft(o.value)), c = O(null);
		function l(e) {
			return e.states.map((t, n) => t.status === "pending" && e.started && n === e.current ? "asking" : t.status);
		}
		function d(e) {
			return e.started ? e.states.every((e) => e.status === "done") ? a("opening.draft.finished") : a("opening.draft.at_step", {
				n: e.current + 1,
				total: e.steps.length
			}) : a("opening.draft.not_started");
		}
		function h(e) {
			return n.templates.find((t) => t.id === e);
		}
		async function g() {
			let e = h("builtin-default") ?? n.templates[0];
			if (e === void 0) return;
			let t = {
				id: crypto.randomUUID(),
				kind: "draft",
				display_name: a("opening.draft.new_name", { n: n.store.drafts.value.length + 1 }),
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				description: "",
				template_name: e.display_name,
				steps: e.steps.map((e) => ({ ...e })),
				states: e.steps.map(Re),
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
		let v = O(!1), k = O(!1);
		async function te() {
			let e = s.value;
			if (e !== null) {
				k.value = !0;
				try {
					await n.store.remove(e.id), v.value = !1, o.value = n.store.drafts.value[0]?.id ?? null;
				} finally {
					k.value = !1;
				}
			}
		}
		function P(e, t = !1) {
			s.value !== null && n.store.edit(s.value, e, { debounce: t });
		}
		let L = A(() => n.templates.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), R = O(Fe);
		f(() => s.value?.template_name, (e) => {
			R.value = n.templates.find((t) => t.display_name === e)?.id ?? "builtin-default";
		}, { immediate: !0 });
		function re(e) {
			let t = e === void 0 ? void 0 : h(e);
			t !== void 0 && (R.value = t.id, P((e) => {
				e.template_name = t.display_name, e.steps = t.steps.map((e) => ({ ...e })), e.states = t.steps.map(Re), e.current = 0;
			}));
		}
		let fe = A(() => [
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
		]), me = A(() => {
			let e = s.value?.connection;
			return e?.kind === "proxy_preset" ? `proxy:${e.proxy_preset}` : e?.kind;
		});
		function W(e) {
			e !== void 0 && P((t) => {
				t.connection = e.startsWith("proxy:") ? {
					kind: "proxy_preset",
					proxy_preset: e.slice(6)
				} : e === "current" ? { kind: "current" } : { kind: "analysis" };
			});
		}
		let he = A(() => n.lists.presets.map((e) => ({
			value: e,
			label: e === "in_use" ? a("opening.settings.preset_in_use") : e
		})));
		function _e(e) {
			e !== void 0 && P((t) => {
				t.preset_name = e;
			});
		}
		function ve(e) {
			P((t) => {
				t.worldbooks = t.worldbooks.includes(e) ? t.worldbooks.filter((t) => t !== e) : [...t.worldbooks, e].slice(0, 20);
			});
		}
		let ye = O(null);
		f([o, () => n.host], () => {
			ye.value = n.host?.character() ?? null;
		}, { immediate: !0 });
		function Se(e) {
			let t = ye.value;
			P((n) => {
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
		function Te(e) {
			P((t) => {
				t.use_greeting = e === !0 && t.card !== null;
			});
		}
		function De(e) {
			return fe.value.find((e) => e.value === me.value)?.label ?? e.connection.kind;
		}
		let K = A(() => s.value === null ? null : n.flow.busy(s.value.id)), Oe = A(() => s.value === null ? null : n.flow.error(s.value.id)), q = A(() => s.value?.steps[s.value.current] ?? null), J = A(() => s.value?.states[s.value.current] ?? null), ke = A(() => s.value !== null && s.value.current === s.value.steps.length - 1), Ae = A(() => J.value?.status === "done" || J.value?.status === "stale"), je = A(() => s.value?.states.some((e) => e.status === "stale") ?? !1);
		function Me(e) {
			return e instanceof pe ? a("opening.errors.unparsable", { excerpt: e.excerpt }) : a("opening.errors.failed", { reason: Ue(e) });
		}
		function Ne(e) {
			return e === "stale" ? a("opening.steps.stale") : "";
		}
		function Pe(e) {
			let t = s.value;
			return t !== null && (t.states[e]?.status !== "pending" || e === t.current);
		}
		function Ie(e) {
			P((t) => {
				t.current = e;
			});
		}
		async function Le() {
			let e = s.value;
			e !== null && e.description.trim() !== "" && (P((e) => {
				e.started = !0;
			}), await n.flow.run_step(e, 0));
		}
		let Y = O([]), Be = O(""), X = O(!1), Ve = O(""), We = O(null);
		async function Ge() {
			X.value = !0, await u(), We.value?.focus();
		}
		f(() => [s.value?.id, s.value?.current], () => {
			X.value = !1, Ve.value = "";
		});
		async function Ke() {
			let e = s.value;
			if (e === null) return;
			let t = Ve.value;
			X.value = !1, Ve.value = "", await n.flow.ask_more(e, e.current, t);
		}
		f(() => J.value?.question, () => {
			Y.value = [], Be.value = "";
		});
		function qe(e) {
			let t = J.value?.question;
			if (t != null) {
				if (!t.multiple) {
					Y.value = Y.value.includes(e) ? [] : [e];
					return;
				}
				Y.value = Y.value.includes(e) ? Y.value.filter((t) => t !== e) : [...Y.value, e];
			}
		}
		async function Je() {
			s.value !== null && await n.flow.answer(s.value, Y.value, Be.value);
		}
		function Ye(e, t) {
			let n = [...e, ...t === "" ? [] : [t]];
			return n.length === 0 ? a("opening.ask.left_to_model") : n.join(a("opening.ask.joiner"));
		}
		let Xe = O(null);
		function Ze(e, t) {
			P((n) => {
				let r = n.states[e]?.entries, i = r?.findIndex((e) => e.id === t.id) ?? -1;
				r !== void 0 && i >= 0 && (r[i] = t), ze(n, e);
			}), Xe.value = null;
		}
		function Qe(e, t) {
			P((n) => {
				let r = n.states[e];
				r !== void 0 && (r.entries = r.entries.filter((e) => e.id !== t)), ze(n, e);
			});
		}
		function et(e) {
			let t = crypto.randomUUID();
			P((n) => {
				n.states[e]?.entries.push({
					id: t,
					title: a("opening.entry.new_title"),
					constant: !1,
					keys: [],
					content: ""
				});
			}), Xe.value = t;
		}
		function tt(e, t) {
			Xe.value === t && (Qe(e, t), Xe.value = null);
		}
		let nt = O(!1), rt = O(""), it = O("");
		function ot() {
			rt.value = J.value?.message?.speaker ?? "", it.value = J.value?.message?.text ?? "", nt.value = !0;
		}
		function st() {
			let e = s.value?.current ?? 0;
			P((t) => {
				let n = t.states[e];
				n !== void 0 && (n.message = {
					speaker: rt.value.trim(),
					text: it.value
				});
			}), nt.value = !1;
		}
		let ct = A(() => s.value === null ? [] : $e(s.value)), ut = A(() => [...s.value?.states ?? []].reverse().find((e) => e.message !== null)?.message ?? null), dt = O(!1), ft = O(null);
		function jt(e) {
			ft.value = a("opening.output.book_written", { book: e }), i("refresh-lists");
		}
		let Q = O(!1), Mt = O(!1), Nt = A(() => Q.value ? n.host?.chat_name() ?? null : null);
		async function Pt() {
			let e = ut.value;
			if (n.host !== null && e !== null) {
				Mt.value = !0;
				try {
					await n.host.append_character_message(e.speaker, e.text), Q.value = !1, ft.value = a("opening.output.message_added");
				} catch (e) {
					c.value = a("opening.errors.failed", { reason: Ue(e) }), Q.value = !1;
				} finally {
					Mt.value = !1;
				}
			}
		}
		function Ft() {
			let e = s.value;
			return e === null ? "" : at(e, {
				description: a("opening.markdown.description"),
				constant: a("opening.entry.constant"),
				keys: a("opening.entry.keys_label")
			});
		}
		async function It() {
			try {
				await navigator.clipboard.writeText(Ft()), ft.value = a("opening.output.copied");
			} catch (e) {
				c.value = a("opening.errors.failed", { reason: Ue(e) });
			}
		}
		function $() {
			let e = URL.createObjectURL(new Blob([Ft()], { type: "text/markdown" })), t = document.createElement("a");
			t.href = e, t.download = `${s.value?.display_name ?? "opening"}.md`, t.click(), URL.revokeObjectURL(e);
		}
		let Lt = O(!1);
		return f(o, () => {
			c.value = null, ft.value = null, nt.value = !1;
		}), (t, n) => (p(), F("div", { class: j(T(Z).layout) }, [
			D("aside", {
				class: j(T(Z).aside),
				"aria-label": T(a)("opening.draft.list_label")
			}, [
				C(V, {
					class: j(T(Z).aside_new),
					icon: T(ue),
					label: T(a)("opening.draft.new"),
					onClick: g
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				e.store.drafts.value.length > 0 ? (p(), F("div", {
					key: 0,
					class: j(T(Z).aside_title)
				}, S(T(a)("opening.draft.list_title")), 3)) : x("", !0),
				(p(!0), F(w, null, _(e.store.drafts.value, (e) => (p(), F("button", {
					key: e.id,
					type: "button",
					class: j(["tc-interactive", T(Z).item]),
					"aria-current": e.id === o.value ? "true" : void 0,
					onClick: (t) => o.value = e.id
				}, [
					D("span", { class: j(T(Z).item_name) }, S(e.display_name), 3),
					D("span", { class: j(T(Z).dots) }, [(p(!0), F(w, null, _(l(e), (e, t) => (p(), F("i", {
						key: t,
						class: j(T(Z).dot),
						"data-state": e
					}, null, 10, gt))), 128))], 2),
					D("span", { class: j(T(Z).item_meta) }, S(d(e)), 3)
				], 10, ht))), 128))
			], 10, mt),
			D("div", { class: j(T(Z).columns) }, [D("div", { class: j(T(Z).work) }, [D("div", { class: j(T(Z).work_inner) }, [
				D("div", { class: j(T(Z).topline) }, [
					C(He, {
						modelValue: r.value,
						"onUpdate:modelValue": n[0] ||= (e) => r.value = e
					}, null, 8, ["modelValue"]),
					D("span", { class: j(T(Z).spacer) }, null, 2),
					s.value !== null && s.value.started ? (p(), E(V, {
						key: 0,
						class: j(T(Z).known_toggle),
						icon: T(B),
						label: T(a)("opening.known.toggle"),
						variant: "ghost",
						onClick: n[1] ||= (e) => Lt.value = !Lt.value
					}, null, 8, [
						"class",
						"icon",
						"label"
					])) : x("", !0),
					s.value === null ? x("", !0) : (p(), E(G, {
						key: 1,
						icon: T(de),
						label: T(a)("opening.draft.delete"),
						onClick: n[2] ||= (e) => v.value = !0
					}, null, 8, ["icon", "label"]))
				], 2),
				e.hostError === null ? x("", !0) : (p(), F("p", {
					key: 0,
					class: j(T(Z).error)
				}, S(T(a)("opening.errors.host", { reason: e.hostError })), 3)),
				e.saveError === null ? x("", !0) : (p(), F("p", {
					key: 1,
					class: j(T(Z).error),
					role: "alert"
				}, S(T(a)("opening.errors.save", { reason: e.saveError })), 3)),
				c.value === null ? x("", !0) : (p(), F("p", {
					key: 2,
					class: j(T(Z).error),
					role: "alert"
				}, S(c.value), 3)),
				s.value === null ? (p(), F("div", {
					key: 3,
					class: j(T(Z).work_head)
				}, [
					D("h1", { class: j(T(Z).work_title) }, S(T(a)("opening.title")), 3),
					D("p", { class: j(T(Z).work_description) }, S(T(a)("opening.empty_hint")), 3),
					D("div", { class: j(T(Z).row) }, [C(V, {
						icon: T(ue),
						label: T(a)("opening.draft.new"),
						variant: "primary",
						onClick: g
					}, null, 8, ["icon", "label"])], 2)
				], 2)) : s.value.started ? q.value !== null && J.value !== null ? (p(), F(w, { key: 5 }, [
					D("nav", {
						class: j(T(Z).steps),
						"aria-label": T(a)("opening.steps.label")
					}, [(p(!0), F(w, null, _(s.value.steps, (e, t) => (p(), F("button", {
						key: e.id,
						type: "button",
						class: j(["tc-interactive", T(Z).step]),
						"data-state": s.value.states[t]?.status,
						"aria-current": t === s.value.current ? "step" : void 0,
						disabled: !Pe(t) || K.value !== null,
						onClick: (e) => Ie(t)
					}, [
						D("span", { class: j(T(Z).step_number) }, [s.value.states[t]?.status === "done" ? (p(), E(z, {
							key: 0,
							icon: T(ne),
							size: 13
						}, null, 8, ["icon"])) : (p(), F(w, { key: 1 }, [I(S(t + 1), 1)], 64))], 2),
						D("span", { class: j(T(Z).step_label) }, S(e.name), 3),
						D("span", { class: j(T(Z).step_tag) }, S(Ne(s.value.states[t]?.status ?? "")), 3)
					], 10, xt))), 128))], 10, bt),
					je.value ? (p(), F("div", {
						key: 0,
						class: j(T(Z).banner)
					}, [D("span", null, S(T(a)("opening.steps.stale_banner")), 1), C(V, {
						icon: T(le),
						label: T(a)("opening.steps.regenerate_stale"),
						pending: K.value !== null,
						onClick: n[5] ||= (t) => e.flow.regenerate_stale(s.value)
					}, null, 8, [
						"icon",
						"label",
						"pending"
					])], 2)) : x("", !0),
					D("div", { class: j(T(Z).work_head) }, [D("h1", { class: j(T(Z).work_title) }, S(q.value.name), 3), D("p", { class: j(T(Z).work_description) }, S(q.value.instruction), 3)], 2),
					(p(!0), F(w, null, _(J.value.answers, (t, n) => (p(), F("div", {
						key: n,
						class: j(T(Z).answered)
					}, [
						D("span", { class: j(T(Z).answered_question) }, S(T(a)("opening.ask.answered", {
							n: n + 1,
							question: t.question.text
						})), 3),
						D("span", { class: j(T(Z).answered_answer) }, S(Ye(t.selected, t.other)), 3),
						C(V, {
							icon: T(ce),
							label: T(a)("opening.ask.change"),
							variant: "ghost",
							disabled: K.value !== null,
							onClick: (t) => e.flow.reask(s.value, s.value.current, n)
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						])
					], 2))), 128)),
					K.value === null ? x("", !0) : (p(), F("p", {
						key: 1,
						class: j(T(Z).hint),
						role: "status"
					}, S(K.value.kind === "question" ? T(a)("opening.status.asking") : K.value.kind === "generate" ? T(a)("opening.status.generating", { step: s.value.steps[K.value.step]?.name ?? "" }) : T(a)("opening.status.rewriting")), 3)),
					K.value === null && e.flow.dropped(s.value.id) > 0 && Ae.value ? (p(), F("p", {
						key: 2,
						class: j(T(Z).hint),
						role: "status"
					}, S(T(a)("opening.status.dropped", { n: e.flow.dropped(s.value.id) })), 3)) : x("", !0),
					Oe.value === null ? x("", !0) : (p(), F("div", {
						key: 3,
						class: j(T(Z).banner),
						role: "alert"
					}, [D("span", null, S(Me(Oe.value)), 1), J.value.status === "asking" && J.value.question === null ? (p(), E(V, {
						key: 0,
						icon: T(le),
						label: T(a)("opening.status.retry"),
						onClick: n[6] ||= (t) => e.flow.run_step(s.value, s.value.current)
					}, null, 8, ["icon", "label"])) : x("", !0)], 2)),
					J.value.question === null ? J.value.status === "pending" && K.value === null ? (p(), F("div", {
						key: 5,
						class: j(T(Z).row)
					}, [C(V, {
						icon: T(U),
						label: T(a)("opening.steps.run"),
						variant: "primary",
						onClick: n[9] ||= (t) => e.flow.run_step(s.value, s.value.current)
					}, null, 8, ["icon", "label"])], 2)) : x("", !0) : (p(), F("div", {
						key: 4,
						class: j(T(Z).ask)
					}, [
						D("div", { class: j(T(Z).ask_head) }, [
							D("h2", { class: j(T(Z).ask_title) }, S(J.value.question.text), 3),
							D("span", { class: j(T(Z).badge) }, S(J.value.question.multiple ? T(a)("opening.ask.multiple") : T(a)("opening.ask.single")), 3),
							D("span", { class: j(T(Z).spacer) }, null, 2),
							D("span", { class: j(T(Z).hint) }, S(J.value.answers.length < q.value.max_rounds ? T(a)("opening.ask.round", {
								n: J.value.answers.length + 1,
								max: q.value.max_rounds
							}) : T(a)("opening.ask.round_more", { n: J.value.answers.length + 1 })), 3)
						], 2),
						J.value.question.why === "" ? x("", !0) : (p(), F("p", {
							key: 0,
							class: j(T(Z).hint)
						}, S(J.value.question.why), 3)),
						D("div", {
							class: j(T(Z).options),
							role: J.value.question.multiple ? "group" : "radiogroup",
							"aria-label": J.value.question.text
						}, [(p(!0), F(w, null, _(J.value.question.options, (e) => (p(), F("button", {
							key: e.label,
							type: "button",
							class: j(["tc-interactive", T(Z).option]),
							role: J.value.question.multiple ? "checkbox" : "radio",
							"aria-checked": Y.value.includes(e.label),
							disabled: K.value !== null,
							onClick: (t) => qe(e.label)
						}, [
							D("span", {
								class: j(T(Z).option_mark),
								"data-shape": J.value.question.multiple ? "box" : "radio"
							}, [Y.value.includes(e.label) ? (p(), E(z, {
								key: 0,
								icon: T(ne),
								size: 13
							}, null, 8, ["icon"])) : x("", !0)], 10, wt),
							D("span", { class: j(T(Z).option_label) }, S(e.label), 3),
							D("span", { class: j(T(Z).option_detail) }, S(e.detail), 3)
						], 10, Ct))), 128))], 10, St),
						C(H, { label: T(a)("opening.ask.other_label") }, {
							default: m(({ fieldId: e }) => [b(D("input", {
								id: e,
								"onUpdate:modelValue": n[7] ||= (e) => Be.value = e,
								class: j(T(Z).input),
								maxlength: "500",
								placeholder: T(a)("opening.ask.other_placeholder")
							}, null, 10, Tt), [[N, Be.value]])]),
							_: 1
						}, 8, ["label"]),
						D("div", { class: j(T(Z).row) }, [
							C(V, {
								icon: T(Ce),
								label: T(a)("opening.ask.skip"),
								variant: "ghost",
								disabled: K.value !== null,
								onClick: n[8] ||= (t) => e.flow.skip(s.value)
							}, null, 8, [
								"icon",
								"label",
								"disabled"
							]),
							D("span", { class: j(T(Z).spacer) }, null, 2),
							C(V, {
								icon: T(xe),
								label: T(a)("opening.ask.confirm"),
								variant: "primary",
								pending: K.value !== null,
								disabled: Y.value.length === 0 && Be.value.trim() === "",
								onClick: Je
							}, null, 8, [
								"icon",
								"label",
								"pending",
								"disabled"
							])
						], 2)
					], 2)),
					Ae.value && q.value.output === "entries" ? (p(), F("div", {
						key: 6,
						class: j(T(Z).entries)
					}, [(p(!0), F(w, null, _(J.value.entries, (t) => (p(), E(lt, {
						key: t.id,
						entry: t,
						editing: t.id === Xe.value,
						rewriting: K.value?.kind === "rewrite" && K.value.entry_id === t.id,
						disabled: K.value !== null,
						onSave: n[10] ||= (e) => Ze(s.value.current, e),
						onRemove: (e) => Qe(s.value.current, t.id),
						onRewrite: (n) => e.flow.rewrite_entry(s.value, s.value.current, t),
						onCancel: (e) => tt(s.value.current, t.id)
					}, null, 8, [
						"entry",
						"editing",
						"rewriting",
						"disabled",
						"onRemove",
						"onRewrite",
						"onCancel"
					]))), 128))], 2)) : x("", !0),
					Ae.value && q.value.output === "message" && J.value.message !== null ? (p(), F(w, { key: 7 }, [nt.value ? (p(), F("div", {
						key: 0,
						class: j(T(Z).editor)
					}, [
						C(H, { label: T(a)("opening.message.speaker_label") }, {
							default: m(({ fieldId: e }) => [b(D("input", {
								id: e,
								"onUpdate:modelValue": n[11] ||= (e) => rt.value = e,
								class: j(T(Z).input),
								maxlength: "80"
							}, null, 10, Et), [[N, rt.value]])]),
							_: 1
						}, 8, ["label"]),
						C(H, { label: T(a)("opening.message.text_label") }, {
							default: m(({ fieldId: e }) => [b(D("textarea", {
								id: e,
								"onUpdate:modelValue": n[12] ||= (e) => it.value = e,
								class: j(T(Z).text_area)
							}, null, 10, Dt), [[N, it.value]])]),
							_: 1
						}, 8, ["label"]),
						D("div", { class: j(T(Z).row) }, [
							D("span", { class: j(T(Z).spacer) }, null, 2),
							C(V, {
								label: T(a)("common.actions.cancel"),
								variant: "ghost",
								onClick: n[13] ||= (e) => nt.value = !1
							}, null, 8, ["label"]),
							C(V, {
								label: T(a)("common.actions.save"),
								variant: "primary",
								disabled: rt.value.trim() === "" || it.value.trim() === "",
								onClick: st
							}, null, 8, ["label", "disabled"])
						], 2)
					], 2)) : (p(), F("div", {
						key: 1,
						class: j(T(Z).bubble)
					}, [D("span", { class: j(T(Z).bubble_name) }, S(J.value.message.speaker), 3), D("p", { class: j(T(Z).bubble_text) }, S(J.value.message.text), 3)], 2)), nt.value ? x("", !0) : (p(), F("div", {
						key: 2,
						class: j(T(Z).row)
					}, [C(V, {
						icon: T(ce),
						label: T(a)("opening.message.edit"),
						disabled: K.value !== null,
						onClick: ot
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])], 2))], 64)) : x("", !0),
					Ae.value && X.value ? (p(), F("div", {
						key: 8,
						class: j(T(Z).ask)
					}, [C(H, {
						label: T(a)("opening.steps.ask_more_label"),
						hint: T(a)("opening.steps.ask_more_hint")
					}, {
						default: m(({ fieldId: e, describedBy: t }) => [b(D("input", {
							id: e,
							ref_key: "more_input",
							ref: We,
							"onUpdate:modelValue": n[14] ||= (e) => Ve.value = e,
							class: j(T(Z).input),
							maxlength: "500",
							"aria-describedby": t,
							placeholder: T(a)("opening.steps.ask_more_placeholder"),
							onKeydown: ee(Ke, ["enter"])
						}, null, 42, Ot), [[N, Ve.value]])]),
						_: 1
					}, 8, ["label", "hint"]), D("div", { class: j(T(Z).row) }, [
						C(V, {
							label: T(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[15] ||= (e) => X.value = !1
						}, null, 8, ["label"]),
						D("span", { class: j(T(Z).spacer) }, null, 2),
						C(V, {
							icon: T(xe),
							label: T(a)("opening.steps.ask_more_start"),
							variant: "primary",
							disabled: K.value !== null,
							onClick: Ke
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])
					], 2)], 2)) : x("", !0),
					Ae.value ? (p(), F("div", {
						key: 9,
						class: j(T(Z).foot)
					}, [
						C(V, {
							icon: T(be),
							label: T(a)("opening.steps.ask_more"),
							variant: "ghost",
							pending: K.value?.kind === "question",
							disabled: K.value !== null || X.value,
							onClick: Ge
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						]),
						q.value.output === "entries" ? (p(), E(V, {
							key: 0,
							icon: T(ue),
							label: T(a)("opening.entry.add"),
							disabled: K.value !== null,
							onClick: n[16] ||= (e) => et(s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])) : x("", !0),
						D("span", { class: j(T(Z).spacer) }, null, 2),
						C(V, {
							icon: T(le),
							label: T(a)("opening.steps.regenerate"),
							pending: K.value?.kind === "generate",
							disabled: K.value !== null,
							onClick: n[17] ||= (t) => e.flow.generate(s.value, s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						]),
						ke.value ? x("", !0) : (p(), E(V, {
							key: 1,
							icon: T(xe),
							label: T(a)("opening.steps.next"),
							variant: "primary",
							disabled: K.value !== null,
							onClick: n[18] ||= (t) => e.flow.next(s.value)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						]))
					], 2)) : x("", !0),
					ke.value && Ae.value ? (p(), F(w, { key: 10 }, [D("div", { class: j(T(Z).outputs) }, [
						D("div", { class: j(T(Z).output) }, [
							D("h3", { class: j(T(Z).output_title) }, [C(z, { icon: T(B) }, null, 8, ["icon"]), I(S(T(a)("opening.output.book_title")), 1)], 2),
							D("p", { class: j(T(Z).hint) }, S(T(a)("opening.output.book_hint", { n: ct.value.length })), 3),
							D("div", { class: j(T(Z).row) }, [C(V, {
								label: T(a)("opening.output.book_action"),
								variant: "primary",
								disabled: e.host === null || ct.value.length === 0 || K.value !== null,
								onClick: n[19] ||= (e) => dt.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						D("div", { class: j(T(Z).output) }, [
							D("h3", { class: j(T(Z).output_title) }, [C(z, { icon: T(Ee) }, null, 8, ["icon"]), I(S(T(a)("opening.output.message_title")), 1)], 2),
							D("p", { class: j(T(Z).hint) }, S(T(a)("opening.output.message_hint")), 3),
							D("div", { class: j(T(Z).row) }, [C(V, {
								label: T(a)("opening.output.message_action"),
								disabled: e.host === null || ut.value === null || K.value !== null,
								onClick: n[20] ||= (e) => Q.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						D("div", { class: j(T(Z).output) }, [
							D("h3", { class: j(T(Z).output_title) }, [C(z, { icon: T(we) }, null, 8, ["icon"]), I(S(T(a)("opening.output.markdown_title")), 1)], 2),
							D("p", { class: j(T(Z).hint) }, S(T(a)("opening.output.markdown_hint")), 3),
							D("div", { class: j(T(Z).row) }, [C(V, {
								icon: T(ae),
								label: T(a)("opening.output.copy"),
								onClick: It
							}, null, 8, ["icon", "label"]), C(V, {
								icon: T(oe),
								label: T(a)("opening.output.download"),
								variant: "ghost",
								onClick: $
							}, null, 8, ["icon", "label"])], 2)
						], 2)
					], 2), ft.value === null ? x("", !0) : (p(), F("p", {
						key: 0,
						class: j(T(Z).hint),
						role: "status"
					}, S(ft.value), 3))], 64)) : x("", !0)
				], 64)) : x("", !0) : (p(), F(w, { key: 4 }, [
					C(H, { label: T(a)("opening.draft.name_label") }, {
						default: m(({ fieldId: e }) => [D("input", {
							id: e,
							value: s.value.display_name,
							class: j(T(Z).input),
							maxlength: "60",
							onInput: n[3] ||= (e) => {
								P((t) => {
									t.display_name = e.target.value;
								}, !0);
							}
						}, null, 42, _t)]),
						_: 1
					}, 8, ["label"]),
					C(H, {
						label: T(a)("opening.draft.description_label"),
						hint: T(a)("opening.draft.description_hint")
					}, {
						default: m(({ fieldId: e, describedBy: t }) => [D("textarea", {
							id: e,
							value: s.value.description,
							class: j(T(Z).text_area),
							maxlength: At,
							"aria-describedby": t,
							placeholder: T(a)("opening.draft.description_placeholder"),
							onInput: n[4] ||= (e) => {
								P((t) => {
									t.description = e.target.value;
								}, !0);
							}
						}, null, 42, vt), D("div", { class: j(T(Z).counter) }, S(s.value.description.length) + " / " + S(At), 3)]),
						_: 1
					}, 8, ["label", "hint"]),
					D("div", { class: j(T(Z).grid3) }, [
						C(H, { label: T(a)("opening.settings.template_label") }, {
							default: m(({ fieldId: e }) => [C(ie, {
								id: e,
								"model-value": R.value,
								options: L.value,
								placeholder: T(a)("opening.settings.template_label"),
								"onUpdate:modelValue": re
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						C(H, { label: T(a)("opening.settings.connection_label") }, {
							default: m(({ fieldId: e }) => [C(ie, {
								id: e,
								"model-value": me.value,
								options: fe.value,
								placeholder: T(a)("opening.settings.connection_label"),
								"onUpdate:modelValue": W
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						C(H, { label: T(a)("opening.settings.preset_label") }, {
							default: m(({ fieldId: e }) => [C(ie, {
								id: e,
								"model-value": s.value.preset_name,
								options: he.value,
								placeholder: T(a)("opening.settings.preset_label"),
								"onUpdate:modelValue": _e
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"])
					], 2),
					C(H, {
						label: T(a)("opening.settings.worldbooks_label"),
						hint: T(a)("opening.settings.worldbooks_hint")
					}, {
						default: m(() => [e.lists.books.length > 0 ? (p(), F("div", {
							key: 0,
							class: j(T(Z).row)
						}, [(p(!0), F(w, null, _(e.lists.books, (e) => (p(), F("button", {
							key: e,
							type: "button",
							class: j(["tc-interactive", T(Z).chip_toggle]),
							"aria-pressed": s.value.worldbooks.includes(e),
							onClick: (t) => ve(e)
						}, [C(z, {
							icon: T(B),
							size: 14
						}, null, 8, ["icon"]), I(S(e), 1)], 10, yt))), 128))], 2)) : (p(), F("p", {
							key: 1,
							class: j(T(Z).hint)
						}, S(T(a)("opening.settings.no_worldbooks")), 3))]),
						_: 1
					}, 8, ["label", "hint"]),
					C(H, {
						label: T(a)("opening.settings.card_label"),
						hint: T(a)("opening.settings.card_hint")
					}, {
						default: m(() => [D("div", { class: j(T(Z).row) }, [C(se, {
							"model-value": s.value.card !== null,
							label: s.value.card === null ? ye.value === null ? T(a)("opening.settings.card_none") : T(a)("opening.settings.card_use", { name: ye.value.name }) : T(a)("opening.settings.card_use", { name: s.value.card.name }),
							disabled: s.value.card === null && ye.value === null,
							"onUpdate:modelValue": Se
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						]), C(se, {
							"model-value": s.value.use_greeting,
							label: T(a)("opening.settings.greeting_use"),
							disabled: s.value.card === null || s.value.card.first_message.trim() === "",
							"onUpdate:modelValue": Te
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					D("div", { class: j(T(Z).row) }, [
						D("span", { class: j(T(Z).spacer) }, null, 2),
						D("span", { class: j(T(Z).hint) }, S(T(a)("opening.draft.step_count", { n: s.value.steps.length })), 3),
						C(V, {
							icon: T(U),
							label: T(a)("opening.draft.start"),
							variant: "primary",
							pending: K.value !== null,
							disabled: s.value.description.trim() === "",
							onClick: Le
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						])
					], 2)
				], 64))
			], 2)], 2), s.value !== null && s.value.started ? (p(), F("aside", {
				key: 0,
				class: j(T(Z).known),
				"data-open": Lt.value ? "" : void 0,
				"aria-label": T(a)("opening.known.label")
			}, [
				D("div", { class: j(T(Z).known_block) }, [D("h3", { class: j(T(Z).known_title) }, S(T(a)("opening.known.settled")), 3), (p(!0), F(w, null, _(s.value.steps, (e, t) => (p(), F(w, { key: e.id }, [t !== s.value.current && (s.value.states[t]?.entries.length ?? 0) > 0 ? (p(), F("div", {
					key: 0,
					class: j(T(Z).known_line)
				}, [
					D("strong", null, S(e.name), 1),
					n[25] ||= D("br", null, null, -1),
					I(S((s.value.states[t]?.entries ?? []).map((e) => e.title).join(T(a)("opening.ask.joiner"))), 1)
				], 2)) : x("", !0)], 64))), 128))], 2),
				J.value !== null && J.value.answers.length > 0 ? (p(), F("div", {
					key: 0,
					class: j(T(Z).known_block)
				}, [D("h3", { class: j(T(Z).known_title) }, S(T(a)("opening.known.answered")), 3), (p(!0), F(w, null, _(J.value.answers, (e, t) => (p(), F("div", {
					key: t,
					class: j(T(Z).known_line)
				}, S(Ye(e.selected, e.other)), 3))), 128))], 2)) : x("", !0),
				D("div", { class: j(T(Z).known_block) }, [D("h3", { class: j(T(Z).known_title) }, S(T(a)("opening.known.draft")), 3), D("div", { class: j(T(Z).known_line) }, [
					I(S(T(a)("opening.known.connection", { name: De(s.value) })), 1),
					n[27] ||= D("br", null, null, -1),
					I(S(T(a)("opening.known.preset", { name: s.value.preset_name === "in_use" ? T(a)("opening.settings.preset_in_use") : s.value.preset_name })), 1),
					n[28] ||= D("br", null, null, -1),
					s.value.card === null ? x("", !0) : (p(), F(w, { key: 0 }, [I(S(s.value.use_greeting ? T(a)("opening.known.card_greeting", { name: s.value.card.name }) : T(a)("opening.known.card", { name: s.value.card.name })), 1), n[26] ||= D("br", null, null, -1)], 64)),
					I(S(s.value.worldbooks.length === 0 ? T(a)("opening.known.no_books") : T(a)("opening.known.books", { names: s.value.worldbooks.join(T(a)("opening.ask.joiner")) })), 1)
				], 2)], 2)
			], 10, kt)) : x("", !0)], 2),
			e.host !== null && s.value !== null ? (p(), E(pt, {
				key: 0,
				open: dt.value,
				"onUpdate:open": n[21] ||= (e) => dt.value = e,
				host: e.host,
				entries: ct.value,
				"default-name": s.value.display_name,
				lists: e.lists,
				onWritten: jt
			}, null, 8, [
				"open",
				"host",
				"entries",
				"default-name",
				"lists"
			])) : x("", !0),
			C(ge, {
				open: Q.value,
				"onUpdate:open": n[22] ||= (e) => Q.value = e,
				title: T(a)("opening.output.append_title"),
				description: Nt.value === null ? T(a)("opening.output.append_no_chat") : T(a)("opening.output.append_description", {
					chat: Nt.value,
					speaker: ut.value?.speaker ?? ""
				}),
				"confirm-label": T(a)("opening.output.append_confirm"),
				"cancel-label": T(a)("common.actions.cancel"),
				pending: Mt.value,
				destructive: !1,
				onConfirm: n[23] ||= (e) => Nt.value === null ? Q.value = !1 : Pt()
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			C(ge, {
				open: v.value,
				"onUpdate:open": n[24] ||= (e) => v.value = e,
				title: T(a)("opening.draft.delete_title", { name: s.value?.display_name ?? "" }),
				description: T(a)("opening.draft.delete_description"),
				"confirm-label": T(a)("common.actions.delete"),
				"cancel-label": T(a)("common.actions.cancel"),
				pending: k.value,
				onConfirm: te
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
}), Q = ["aria-label"], Mt = ["aria-current", "onClick"], Nt = ["id", "value"], Pt = [
	"value",
	"disabled",
	"aria-label",
	"onInput"
], Ft = [
	"value",
	"disabled",
	"aria-label",
	"placeholder",
	"onInput"
], It = /* @__PURE__ */ v({
	__name: "OpeningTemplates",
	props: /*@__PURE__*/ g({
		store: {},
		templates: {},
		saveError: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: ["update:section"],
	setup(e) {
		let t = e, n = y(e, "section"), { t: r } = M(), i = O(Fe), a = A(() => t.templates.find((e) => e.id === i.value) ?? t.templates[0] ?? null), o = A(() => a.value !== null && !a.value.builtin), s = A(() => [{
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
		function d(e, t) {
			l((n) => {
				let r = e + t, i = n.steps[e], a = n.steps[r];
				i !== void 0 && a !== void 0 && (n.steps[e] = a, n.steps[r] = i);
			});
		}
		function f() {
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
		let v = O(!1);
		async function b() {
			let e = a.value;
			e !== null && !e.builtin && (await t.store.remove(e.id), v.value = !1, i.value = Fe);
		}
		return (t, y) => (p(), F("div", { class: j(T(Z).layout) }, [
			D("aside", {
				class: j(T(Z).aside),
				"aria-label": T(r)("opening.templates.list_label")
			}, [
				C(V, {
					class: j(T(Z).aside_new),
					icon: T(ue),
					label: T(r)("opening.templates.new"),
					onClick: y[0] ||= (e) => c(null)
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				D("div", { class: j(T(Z).aside_title) }, S(T(r)("opening.templates.list_title")), 3),
				(p(!0), F(w, null, _(e.templates, (e) => (p(), F("button", {
					key: e.id,
					type: "button",
					class: j(["tc-interactive", T(Z).item]),
					"aria-current": e.id === a.value?.id ? "true" : void 0,
					onClick: (t) => i.value = e.id
				}, [D("span", { class: j(T(Z).item_name) }, S(e.display_name), 3), D("span", { class: j(T(Z).item_meta) }, S(e.builtin ? T(r)("opening.templates.builtin_meta", { n: e.steps.length }) : T(r)("opening.templates.meta", { n: e.steps.length })), 3)], 10, Mt))), 128))
			], 10, Q),
			D("div", { class: j(T(Z).work) }, [a.value === null ? x("", !0) : (p(), F("div", {
				key: 0,
				class: j(T(Z).work_inner)
			}, [
				D("div", { class: j(T(Z).topline) }, [
					C(He, {
						modelValue: n.value,
						"onUpdate:modelValue": y[1] ||= (e) => n.value = e
					}, null, 8, ["modelValue"]),
					D("span", { class: j(T(Z).spacer) }, null, 2),
					C(V, {
						icon: T(ae),
						label: T(r)("opening.templates.copy"),
						variant: "ghost",
						onClick: y[2] ||= (e) => c(a.value)
					}, null, 8, ["icon", "label"]),
					o.value ? (p(), E(G, {
						key: 0,
						icon: T(de),
						label: T(r)("opening.templates.delete"),
						destructive: "",
						onClick: y[3] ||= (e) => v.value = !0
					}, null, 8, ["icon", "label"])) : x("", !0)
				], 2),
				e.saveError === null ? x("", !0) : (p(), F("p", {
					key: 0,
					class: j(T(Z).error),
					role: "alert"
				}, S(T(r)("opening.errors.save", { reason: e.saveError })), 3)),
				D("div", { class: j(T(Z).work_head) }, [o.value ? (p(), E(H, {
					key: 1,
					label: T(r)("opening.templates.name_label")
				}, {
					default: m(({ fieldId: e }) => [D("input", {
						id: e,
						value: a.value.display_name,
						class: j(T(Z).input),
						maxlength: "60",
						onInput: y[4] ||= (e) => {
							l((t) => {
								t.display_name = e.target.value;
							}, !0);
						}
					}, null, 42, Nt)]),
					_: 1
				}, 8, ["label"])) : (p(), F("h1", {
					key: 0,
					class: j(T(Z).work_title)
				}, S(a.value.display_name), 3)), D("p", { class: j(T(Z).work_description) }, S(o.value ? T(r)("opening.templates.hint") : T(r)("opening.templates.builtin_hint")), 3)], 2),
				(p(!0), F(w, null, _(a.value.steps, (e, t) => (p(), F("div", {
					key: e.id,
					class: j(T(Z).template_step)
				}, [
					D("span", { class: j(T(Z).template_number) }, S(t + 1), 3),
					D("div", { class: j(T(Z).template_fields) }, [D("input", {
						value: e.name,
						class: j(T(Z).input),
						maxlength: "40",
						disabled: !o.value,
						"aria-label": T(r)("opening.templates.step_name", { n: t + 1 }),
						onInput: (e) => {
							u(t, (t) => {
								t.name = e.target.value;
							}, !0);
						}
					}, null, 42, Pt), D("textarea", {
						value: e.instruction,
						class: j(T(Z).text_area_small),
						maxlength: "2000",
						disabled: !o.value,
						"aria-label": T(r)("opening.templates.step_instruction", { n: t + 1 }),
						placeholder: T(r)("opening.templates.instruction_placeholder"),
						onInput: (e) => {
							u(t, (t) => {
								t.instruction = e.target.value;
							}, !0);
						}
					}, null, 42, Ft)], 2),
					D("div", { class: j(T(Z).template_side) }, [
						D("span", { class: j(T(Z).hint) }, S(T(r)("opening.templates.rounds_label")), 3),
						C(he, {
							"model-value": e.max_rounds,
							label: T(r)("opening.templates.rounds_label"),
							"increment-label": T(r)("opening.templates.rounds_up"),
							"decrement-label": T(r)("opening.templates.rounds_down"),
							min: 0,
							max: T(3),
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
						C(ie, {
							"model-value": e.output,
							options: s.value,
							placeholder: T(r)("opening.templates.output_label"),
							"aria-label": T(r)("opening.templates.output_label"),
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
						o.value ? (p(), F("div", {
							key: 0,
							class: j(T(Z).row)
						}, [
							C(G, {
								icon: T(Se),
								label: T(r)("opening.templates.move_up"),
								size: "sm",
								disabled: t === 0,
								onClick: (e) => d(t, -1)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]),
							C(G, {
								icon: T(ye),
								label: T(r)("opening.templates.move_down"),
								size: "sm",
								disabled: t === a.value.steps.length - 1,
								onClick: (e) => d(t, 1)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]),
							C(G, {
								icon: T(de),
								label: T(r)("opening.templates.remove_step"),
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
						], 2)) : x("", !0)
					], 2)
				], 2))), 128)),
				o.value ? (p(), F("div", {
					key: 1,
					class: j(T(Z).row)
				}, [C(V, {
					icon: T(ue),
					label: T(r)("opening.templates.add_step"),
					disabled: a.value.steps.length >= T(12),
					onClick: f
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				])], 2)) : x("", !0)
			], 2))], 2),
			C(ge, {
				open: v.value,
				"onUpdate:open": y[5] ||= (e) => v.value = e,
				title: T(r)("opening.templates.delete_title", { name: a.value?.display_name ?? "" }),
				description: T(r)("opening.templates.delete_description"),
				"confirm-label": T(r)("common.actions.delete"),
				"cancel-label": T(r)("common.actions.cancel"),
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
}), $ = { type: "string" }, Lt = {
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
}, Rt = {
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
}, zt = {
	name: "tavern_canvas_opening_entries",
	value: {
		type: "object",
		properties: { entries: {
			type: "array",
			items: Rt
		} },
		required: ["entries"],
		additionalProperties: !1
	}
}, Bt = {
	name: "tavern_canvas_opening_entry",
	value: {
		type: "object",
		properties: { entry: Rt },
		required: ["entry"],
		additionalProperties: !1
	}
}, Vt = {
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
}, Ht = [
	"[Inkwell opening builder]",
	"You help the user build the opening of a roleplay story one step at a time: its world, characters, rules and first scene.",
	"Write every value in the language of the user's description.",
	"The user's own character is {{user}}. Refer to them only as {{user}} and never decide their appearance, personality or past.",
	"Keep everything consistent with what is settled below and with any world info you were given."
];
function Ut(e) {
	let t = [...e.selected, ...e.other.trim() === "" ? [] : [e.other.trim()]];
	return `- Q: ${e.question.text}\n  A: ${t.length === 0 ? "(left to you)" : t.join("; ")}`;
}
function Wt(e) {
	let t = e.constant ? "always active" : `keys: ${e.keys.join(", ")}`;
	return `- ${e.title} (${t}): ${e.content}`;
}
function Gt(e, t) {
	let n = [];
	return e.steps.slice(0, t).forEach((t, r) => {
		let i = e.states[r];
		i === void 0 || i.status !== "done" && i.status !== "stale" || (n.push(`## ${t.name}`), n.push(...i.entries.map(Wt)), i.message !== null && n.push(`- Opening message by ${i.message.speaker}: ${i.message.text}`));
	}), n.length === 0 ? ["(nothing yet)"] : n;
}
function Kt(e) {
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
function qt(e, t) {
	let n = e.steps[t], r = e.states[t];
	if (n === void 0 || r === void 0) throw RangeError(`The draft has no step ${String(t)}`);
	return [
		...Ht,
		"",
		"The user's description:",
		e.description.trim(),
		...Kt(e),
		"",
		"Settled so far:",
		...Gt(e, t),
		"",
		`Current step: ${n.name}`,
		`What this step settles: ${n.instruction}`,
		"",
		"Answers given in this step:",
		...r.answers.length === 0 ? ["(none)"] : r.answers.map(Ut)
	];
}
function Jt(e) {
	let { card: t } = e;
	return [
		e.description,
		...t === null ? [] : [t.description, t.scenario],
		...t !== null && e.use_greeting ? [t.first_message] : [],
		...e.states.flatMap((e) => [...e.answers.flatMap((e) => [...e.selected, e.other]), ...e.entries.map((e) => `${e.title} ${e.content}`)])
	].join("\n");
}
function Yt(e, t, n, r) {
	for (let r of me(e, t)) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let t = n.safeParse(e);
		if (t.success) return t.data;
	}
	throw new pe(`The reply contains no ${r} JSON object`, e);
}
var Xt = a((e) => typeof e == "object" && e && "options" in e && Array.isArray(e.options) ? {
	...e,
	options: e.options.slice(0, 5)
} : e, Oe), Zt = t({
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: o(n()).transform((e) => [...new Set(e.map((e) => e.trim()).filter((e) => e !== ""))].slice(0, 12)),
	content: n().trim().min(1).max(8e3)
}), Qt = 30;
function $t(e) {
	return {
		id: crypto.randomUUID(),
		...e,
		keys: e.constant ? [] : e.keys
	};
}
function en(e, t) {
	let n = e.slice(0, Qt).flatMap((e) => {
		let t = Zt.safeParse(e);
		return t.success ? [$t(t.data)] : [];
	});
	if (n.length === 0) throw new pe("The reply contains no valid entry", t);
	return {
		entries: n,
		dropped: e.length - n.length
	};
}
function tn(e, t) {
	return e.filter((e) => e.name === t).flatMap((e) => {
		try {
			return [JSON.parse(e.arguments)];
		} catch {
			return [null];
		}
	});
}
var nn = [
	"- One entry per distinct thing: the world overview, each faction, each place, each character, each group of rules.",
	"- title: '<kind>｜<name>', both in the language of the description, for example a faction, a place or a character.",
	"- constant: true only for what must always be in context: the world overview, hard rules of the world, narration and style requirements, content boundaries. Otherwise false.",
	"- keys: when constant is false, 1 to 5 words or names that appear in the story whenever this entry matters; [] when constant is true.",
	"- content: self-contained prose a storyteller can rely on, without referring to other entries by number."
], rn = [
	"The opening message is the first message of the roleplay, sent by the character who meets {{user}} first.",
	"- speaker: that character's name.",
	"- text: the whole message, following the narration person, style and length settled above, ending at a moment {{user}} can answer. Do not speak or act for {{user}}."
], an = ["Ask only about a choice that changes what this step writes and that the description and the answers leave open. Never ask about anything already settled.", "A question has the question text, a one-sentence reason it matters (why), and 3 or 4 options, each a short label with a one-sentence detail. Set multiple to true only when several options can hold at once. Do not add an 'other' option; the user can always type their own."], on = "ask_question", sn = "add_entry", cn = t({ entries: o(l()).min(1) });
function ln(e, t) {
	let n = [
		...qt(e, t),
		"",
		"Now write this step's result as world book entries.",
		...nn
	], r = (e) => en(Yt(e, "entries", cn, "entries").entries, e);
	return {
		user_input: [...n, "Reply with only a JSON object of the form {\"entries\": [...]}."].join("\n"),
		json_schema: zt,
		parse: r,
		tools: {
			tools: [{
				name: sn,
				description: "Add one world book entry.",
				parameters: Rt
			}],
			choice: "required",
			user_input: [...n, `Call ${sn} once for each entry, all in this reply.`].join("\n"),
			parse: (e, t) => {
				let n = tn(e, sn);
				return n.length === 0 ? r(t) : en(n, t);
			}
		}
	};
}
var un = {
	name: "tavern_canvas_opening_question",
	value: {
		type: "object",
		properties: { question: Lt },
		required: ["question"],
		additionalProperties: !1
	}
}, dn = t({ question: l() });
function fn(e, t) {
	let n = Xt.safeParse(e);
	if (!n.success) throw new pe("The reply contains no well-formed question", t);
	return n.data;
}
function pn(e, t, n) {
	let r = e.states[t], i = r?.message == null ? (r?.entries ?? []).map(Wt) : [`${r.message.speaker}: ${r.message.text}`], a = [
		...qt(e, t),
		"",
		"This step's current result:",
		...i.length === 0 ? ["(none)"] : i,
		"",
		"The user has read this result and wants to be asked one more question before the step is written again.",
		n.trim() === "" ? "Ask about the open choice whose answer would change the result the most: something the description and the answers left to you, or a decision in the result the user may want to make differently." : `The user wants the question to be about: ${n.trim()}. Ask about the choice within that which would change the result the most.`,
		...an
	], o = (e) => fn(Yt(e, "question", dn, "question").question, e);
	return {
		user_input: [...a, "Reply with only a JSON object of the form {\"question\": {...}}."].join("\n"),
		json_schema: un,
		parse: o,
		tools: {
			tools: [{
				name: on,
				description: "Ask the user one question with options.",
				parameters: Lt
			}],
			choice: { name: on },
			user_input: [...a, `Call ${on} once.`].join("\n"),
			parse: (e, t) => {
				let [n] = tn(e, on);
				return n === void 0 ? o(t) : fn(n, t);
			}
		}
	};
}
var mn = "step_ready", hn = {
	type: "array",
	items: {
		type: "object",
		properties: {
			aspect: $,
			settled: { type: "boolean" }
		},
		required: ["aspect", "settled"],
		additionalProperties: !1
	}
}, gn = {
	name: "tavern_canvas_opening_next",
	value: {
		type: "object",
		properties: {
			aspects: hn,
			question: { anyOf: [Lt, { type: "null" }] }
		},
		required: ["aspects", "question"],
		additionalProperties: !1
	}
}, _n = o(t({
	aspect: n().trim().min(1),
	settled: r()
})).min(1), vn = t({
	aspects: l(),
	question: l()
});
function yn(e, t, n) {
	let r = _n.safeParse(e);
	if (!r.success) throw new pe("The reply lists no aspects of the step", n);
	if (t != null) return fn(t, n);
	if (r.data.some((e) => !e.settled)) throw new pe("The reply leaves an aspect open without asking about it", n);
	return null;
}
function bn(e, t, n) {
	let r = [
		...qt(e, t),
		"",
		"Before this step is written, check what it still needs from the user.",
		"First list 2 to 6 aspects this step must settle, taken from what this step settles, each a few words in the language of the description.",
		"An aspect is settled only when the user's description, a settled earlier step or an answer in this step states it. An aspect you would have to choose yourself is not settled.",
		`If any aspect is not settled, ask one question about the most important one; at most ${String(n)} more questions may be asked in this step. Only when every aspect is settled, ask nothing.`,
		...an
	], i = (e) => {
		let t = Yt(e, "aspects", vn, "question");
		return yn(t.aspects, t.question, e);
	};
	return {
		user_input: [...r, "Reply with only a JSON object of the form {\"aspects\": [{\"aspect\": \"...\", \"settled\": true or false}, ...], \"question\": {...} or null}."].join("\n"),
		json_schema: gn,
		parse: i,
		tools: {
			tools: [{
				name: on,
				description: "List the step's aspects and ask the user about the most important open one.",
				parameters: {
					type: "object",
					properties: {
						aspects: hn,
						question: Lt
					},
					required: ["aspects", "question"],
					additionalProperties: !1
				}
			}, {
				name: mn,
				description: "List the step's aspects when every one is settled.",
				parameters: {
					type: "object",
					properties: { aspects: hn },
					required: ["aspects"],
					additionalProperties: !1
				}
			}],
			choice: "required",
			user_input: [...r, `Call ${on} once to ask, or ${mn} once when every aspect is settled.`].join("\n"),
			parse: (e, t) => {
				let [n] = tn(e, on), [r] = tn(e, mn), a = vn.partial().safeParse(n ?? r);
				return a.success ? yn(a.data.aspects, n === void 0 ? null : a.data.question, t) : i(t);
			}
		}
	};
}
function xn(e, n, r) {
	return {
		user_input: [
			...qt(e, n),
			"",
			"Entries this step already has:",
			...(e.states[n]?.entries ?? []).map(Wt),
			"",
			`Rewrite only this entry, keeping its subject and fitting everything above: ${Wt(r)}`,
			...nn.slice(1),
			"Reply with only a JSON object of the form {\"entry\": {...}}."
		].join("\n"),
		json_schema: Bt,
		parse: (e) => ({
			...$t(Yt(e, "entry", t({ entry: Zt }), "entry").entry),
			id: r.id
		})
	};
}
function Sn(e, t) {
	return {
		user_input: [
			...qt(e, t),
			"",
			"Now write the opening message.",
			...rn,
			"Reply with only a JSON object of the form {\"speaker\": \"...\", \"text\": \"...\"}."
		].join("\n"),
		json_schema: Vt,
		parse: (e) => Yt(e, "text", ke, "opening message")
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_flow.ts
function Cn(e, t) {
	let n = P(/* @__PURE__ */ new Map()), r = P(/* @__PURE__ */ new Map()), i = P(/* @__PURE__ */ new Map());
	function a(e, n, r) {
		i.set(e.id, r.kind === "entries" ? r.dropped : 0), t.edit(e, (e) => {
			let t = e.states[n];
			t !== void 0 && (t.question = null, t.status = "done", r.kind === "entries" ? t.entries = r.entries : t.message = r.message), ze(e, n);
		});
	}
	function o(e) {
		return {
			connection: e.connection,
			preset_name: e.preset_name,
			worldbooks: e.worldbooks,
			text: Jt(e)
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
				message: await e.request(Sn(t, n), o(t))
			}) : a(t, n, {
				kind: "entries",
				...await e.request(ln(t, n), o(t))
			});
		});
	}
	async function l(n, r) {
		let i = n.steps[r], a = n.states[r];
		if (i === void 0 || a === void 0) return;
		t.edit(n, (e) => {
			e.current = r;
			let t = e.states[r];
			t !== void 0 && (t.status = "asking");
		});
		let l = i.max_rounds - a.answers.length;
		if (l > 0) {
			let i = { asked: !1 };
			if (!await s(n, {
				kind: "question",
				step: r
			}, async () => {
				let a = await e.request(bn(n, r, l), o(n));
				a !== null && (i.asked = !0, t.edit(n, (e) => {
					let t = e.states[r];
					t !== void 0 && (t.question = a);
				}));
			}) || i.asked) return;
		}
		await c(n, r);
	}
	async function u(n, r, i) {
		await s(n, {
			kind: "question",
			step: r
		}, async () => {
			let a = await e.request(pn(n, r, i), o(n));
			t.edit(n, (e) => {
				e.current = r;
				let t = e.states[r];
				t !== void 0 && (t.question = a, t.status = "asking");
			});
		});
	}
	return {
		busy: (e) => n.get(e) ?? null,
		error: (e) => r.get(e) ?? null,
		dropped: (e) => i.get(e) ?? 0,
		run_step: l,
		ask_more: u,
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
				t !== void 0 && i !== void 0 && (t.answers = t.answers.slice(0, r), t.question = i.question, t.status = "asking", e.current = n, ze(e, n));
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
				let a = await e.request(xn(n, r, i), o(n));
				t.edit(n, (e) => {
					let t = e.states[r]?.entries, n = t?.findIndex((e) => e.id === i.id) ?? -1;
					t !== void 0 && n >= 0 && (t[n] = a), ze(e, r);
				});
			});
		}
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_messages.ts
var wn = {
	en: async () => (await import("./opening_en-D_f0aaN5.js")).en_messages,
	"zh-CN": async () => (await import("./opening_zh_cn-CFSUA-G7.js")).zh_cn_messages
};
function Tn() {
	let e = M({ useScope: "global" }), t = O(!1);
	async function n(n) {
		for (let t of /* @__PURE__ */ new Set(["en", n])) {
			let n = wn[t];
			n !== void 0 && !e.te("opening.title", t) && e.mergeLocaleMessage(t, await n());
		}
		t.value = !0;
	}
	return f(e.locale, (e) => {
		n(e);
	}, { immediate: !0 }), t;
}
//#endregion
//#region src/ui/views/opening/use_opening_store.ts
var En = 600;
function Dn(e) {
	if (e.kind === "draft") {
		let { id: t, ...n } = e;
		return Ne.parse(X(n));
	}
	let { id: t, builtin: n, ...r } = e;
	return Pe.parse(X(r));
}
function On(e) {
	let t = P(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	function i(e) {
		return t.get(e.id) ?? (e.payload.kind === "template" ? Be(e) : Y(e));
	}
	let a = A(() => {
		let n = e.records().map(i).filter((e) => e !== null);
		for (let e of t.values()) n.some((t) => t.id === e.id) || n.push(e);
		return n.sort((e, t) => t.created_at.localeCompare(e.created_at));
	}), o = A(() => a.value.filter((e) => e.kind === "draft")), s = A(() => a.value.filter((e) => e.kind === "template"));
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
				payload: Dn(n)
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
			}, En));
		},
		async remove(i) {
			let a = r.get(i);
			a !== void 0 && (clearTimeout(a), r.delete(i)), await n.get(i), t.delete(i), n.delete(i), await e.remove(i);
		}
	};
}
//#endregion
//#region src/ui/views/opening/OpeningView.vue
var kn = /* @__PURE__ */ v({
	__name: "OpeningView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = M(), r = d(L, null), i = Tn(), a = O(null);
		function o(e) {
			return e instanceof Error ? e.message : String(e);
		}
		let s = On({
			records: () => t.state.assets.records.opening,
			save: (e) => t.controller.save_asset("opening", e),
			remove: (e) => t.controller.remove_asset("opening", e),
			on_save_error: (e) => {
				a.value = o(e);
			}
		}), c = r === null ? null : Cn(r, s), l = O("build"), u = te(null), f = O(null), m = O({
			books: [],
			presets: ["in_use"],
			proxies: [],
			chat_book: null
		});
		function g() {
			let e = u.value;
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
		h(async () => {
			if (r !== null) try {
				u.value = await r.host(), g();
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
		let v = A(() => i.value ? [Le(_, n("opening.builtin.name")), ...s.templates.value] : []);
		return (e, t) => T(i) ? T(r) === null || T(c) === null ? (p(), E(re, {
			key: 1,
			status: "empty",
			"empty-title": T(n)("opening.unavailable_title"),
			"empty-message": T(n)("opening.unavailable_message")
		}, null, 8, ["empty-title", "empty-message"])) : (p(), F(w, { key: 2 }, [l.value === "build" ? (p(), E(jt, {
			key: 0,
			section: l.value,
			"onUpdate:section": t[0] ||= (e) => l.value = e,
			store: T(s),
			flow: T(c),
			host: u.value,
			"host-error": f.value,
			lists: m.value,
			templates: v.value,
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
		])) : l.value === "books" ? (p(), E(Qe, {
			key: 1,
			section: l.value,
			"onUpdate:section": t[1] ||= (e) => l.value = e,
			host: u.value,
			"host-error": f.value,
			lists: m.value,
			onRefreshLists: g
		}, null, 8, [
			"section",
			"host",
			"host-error",
			"lists"
		])) : (p(), E(It, {
			key: 2,
			section: l.value,
			"onUpdate:section": t[2] ||= (e) => l.value = e,
			store: T(s),
			templates: v.value,
			"save-error": a.value
		}, null, 8, [
			"section",
			"store",
			"templates",
			"save-error"
		]))], 64)) : (p(), E(re, {
			key: 0,
			status: "loading"
		}));
	}
});
//#endregion
export { kn as default };
