import { c as e, d as t, g as n, i as r, o as i, p as a, r as o, t as s, u as c, y as l } from "./schemas-BjkyCQYG.js";
import { D as u, F as d, J as f, L as p, M as m, O as h, T as g, U as _, W as v, _ as y, a as b, at as x, dt as S, g as C, gt as w, h as T, k as E, m as D, n as O, nt as k, p as A, pt as j, q as M, rt as N, s as ee, u as P, v as F, x as I, y as L } from "./vue-i18n-XoxYzLIP.js";
import { t as R } from "./opening_port-CFwXS5qA.js";
import { n as z, t as B } from "./AppIcon-DD754F_c.js";
import { t as V } from "./book-open-BFHVGETM.js";
import { n as H, r as te, t as ne } from "./StateSurface-C9eJEtTP.js";
import { t as re } from "./AppSelect-DKz1dWBv.js";
import { n as ie, t as ae } from "./download-Dg_p_zFU.js";
import { t as oe } from "./AppCheckbox-mwSAcdjr.js";
import { n as se, t as ce } from "./refresh-cw-BPQB33rx.js";
import { n as le, t as U } from "./FieldGroup-D8VsaFMT.js";
import { t as W } from "./sparkles-DIwEk888.js";
import { t as ue } from "./trash-2-Cl_9_CUX.js";
import { n as de } from "./deferred_stylesheets-DhfsdqPo.js";
import { t as fe } from "./analysis_error-a25bWfWj.js";
import { t as pe } from "./model_json-B2EVqBvs.js";
import { n as G, t as me } from "./NumberStepper-BUxNPDyt.js";
import { t as K } from "./IconButton-CPI-A0bT.js";
import { t as he } from "./ConfirmDialog-BMpZdMGH.js";
import { t as ge } from "./AppSwitch-CRj_joeq.js";
import { t as _e } from "./AppDialog-BO01QxB5.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/arrow-down.js
var ve = z("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]), ye = z("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), be = z("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), xe = z("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]), Se = z("chevrons-right", [["path", {
	d: "m6 17 5-5-5-5",
	key: "xnjwq"
}], ["path", {
	d: "m13 17 5-5-5-5",
	key: "17xmmf"
}]]), Ce = z("file-text", [
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
]), we = z("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]), Te = z("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]), Ee = t({
	id: n().min(1),
	name: n().max(40),
	instruction: n().max(2e3),
	max_rounds: c().int().min(0).max(3),
	output: s(["entries", "message"])
}), q = t({
	label: n().trim().min(1).max(80),
	detail: n().max(240)
}), De = t({
	text: n().trim().min(1).max(240),
	why: n().max(240),
	multiple: r(),
	options: o(q).min(2).max(5)
}), J = t({
	question: De,
	selected: o(n()),
	other: n()
}), Y = t({
	id: n().min(1),
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: o(n().trim().min(1).max(80)).max(12),
	content: n().max(8e3)
}), Oe = t({
	speaker: n().trim().min(1).max(80),
	text: n().min(1).max(2e4)
}), ke = t({
	status: s([
		"pending",
		"asking",
		"done",
		"stale"
	]),
	answers: o(J),
	question: De.nullable(),
	entries: o(Y),
	message: Oe.nullable()
}), Ae = i("kind", [
	t({ kind: e("analysis") }),
	t({ kind: e("current") }),
	t({
		kind: e("proxy_preset"),
		proxy_preset: n().min(1)
	})
]), je = t({
	name: n(),
	description: n(),
	personality: n(),
	scenario: n(),
	first_message: n()
}), Me = t({
	kind: e("draft"),
	display_name: n(),
	created_at: n(),
	description: n().max(4e3),
	template_name: n(),
	steps: o(Ee).min(1).max(12),
	states: o(ke),
	current: c().int().min(0),
	started: r(),
	connection: Ae,
	preset_name: n().min(1),
	worldbooks: o(n()).max(20),
	card: je.nullable().default(null),
	use_greeting: r().default(!1)
}), Ne = t({
	kind: e("template"),
	display_name: n().max(60),
	created_at: n(),
	steps: o(Ee).min(1).max(12)
}), Pe = "builtin-default", Fe = [
	"genre",
	"world",
	"cast",
	"rules",
	"opening"
];
function Ie(e, t) {
	let n = {
		genre: 2,
		world: 3,
		cast: 3,
		rules: 2,
		opening: 1
	};
	return {
		id: Pe,
		builtin: !0,
		kind: "template",
		display_name: t,
		created_at: "1970-01-01T00:00:00.000Z",
		steps: Fe.map((t) => ({
			id: t,
			...e(t),
			max_rounds: n[t],
			output: t === "opening" ? "message" : "entries"
		}))
	};
}
function Le() {
	return {
		status: "pending",
		answers: [],
		question: null,
		entries: [],
		message: null
	};
}
function Re(e, t) {
	e.states.forEach((e, n) => {
		n > t && (e.status === "done" || e.status === "stale") && (e.status = "stale");
	});
}
function ze(e, t) {
	e.description = t, Re(e, -1);
}
function Be(e) {
	let t = Me.safeParse(e.payload);
	if (!t.success) return null;
	let n = t.data;
	for (; n.states.length < n.steps.length;) n.states.push(Le());
	return n.states.length = n.steps.length, {
		...n,
		current: Math.min(n.current, n.steps.length - 1),
		id: e.id
	};
}
function X(e) {
	let t = Ne.safeParse(e.payload);
	return t.success ? {
		...t.data,
		id: e.id,
		builtin: !1
	} : null;
}
function Ve(e) {
	return JSON.parse(JSON.stringify(e));
}
var He = {
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
de("opening", "._layout_g6bg9_5{grid-template-columns:248px minmax(0,1fr);min-height:100%;display:grid}._aside_g6bg9_11{align-self:start;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-3) var(--tc-space-4);flex-direction:column;display:flex;overflow:auto}._aside_new_g6bg9_20{margin:0 var(--tc-space-1) var(--tc-space-2)}._aside_title_g6bg9_24{padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._item_g6bg9_30{color:var(--tc-text);text-align:start;border-radius:14px;gap:6px;padding:10px 12px;display:grid}._item_g6bg9_30:hover{background-color:var(--tc-surface-raised)}._item_g6bg9_30[aria-current=true]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border)}._item_name_g6bg9_48{font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._item_meta_g6bg9_56{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._dots_g6bg9_61{gap:3px;display:flex}._dot_g6bg9_61{background-color:var(--tc-divider);border-radius:999px;flex:1;height:4px}._dot_g6bg9_61[data-state=done]{background-color:var(--tc-accent)}._dot_g6bg9_61[data-state=asking]{background-color:var(--tc-marker)}._dot_g6bg9_61[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border)}._columns_g6bg9_86{grid-template-columns:minmax(0,1fr) 280px;min-width:0;display:grid}._work_g6bg9_92{min-width:0;padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-panel-padding)}._work_inner_g6bg9_97{gap:var(--tc-form-row-gap);max-width:760px;display:grid}._work_inner_g6bg9_97[data-wide]{max-width:none}._topline_g6bg9_107{gap:var(--tc-space-2) var(--tc-space-3);flex-wrap:wrap;align-items:center;display:flex}._spacer_g6bg9_114{flex:1}._compact_g6bg9_118[data-layout]{justify-self:start;width:auto}._work_head_g6bg9_123{gap:var(--tc-space-1);display:grid}._work_title_g6bg9_128{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);overflow-wrap:anywhere;margin:0}._work_description_g6bg9_137,._hint_g6bg9_138{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._error_g6bg9_145{color:var(--tc-error);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere;margin:0}._row_g6bg9_153{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._text_area_g6bg9_160{min-height:168px}._text_area_small_g6bg9_165{min-height:96px}._counter_g6bg9_174{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-align:end}._grid3_g6bg9_180{gap:var(--tc-space-4);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._chip_toggle_g6bg9_186{align-items:center;gap:var(--tc-space-1-5);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);height:32px;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);padding:0 14px;display:inline-flex}._chip_toggle_g6bg9_186[aria-pressed=true]{border-color:var(--tc-marker);background-color:var(--tc-marker);color:var(--tc-on-marker)}._steps_g6bg9_206{gap:var(--tc-space-1);flex-wrap:wrap;display:flex}._step_g6bg9_206{align-items:center;gap:var(--tc-space-2);background-color:var(--tc-surface);height:34px;box-shadow:0 0 0 1px var(--tc-divider);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);white-space:nowrap;border-radius:999px;padding:0 14px 0 6px;display:inline-flex}._step_g6bg9_206:disabled{cursor:default}._step_number_g6bg9_230{background-color:var(--tc-chip-bg);width:22px;height:22px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;display:grid}._step_g6bg9_206[data-state=done] ._step_number_g6bg9_230{background-color:var(--tc-accent);color:var(--tc-on-accent)}._step_g6bg9_206[aria-current=step]{background-color:var(--tc-marker);box-shadow:none;color:var(--tc-on-marker);font-weight:var(--tc-font-weight-semibold)}._step_g6bg9_206[aria-current=step] ._step_number_g6bg9_230{background-color:var(--tc-on-marker);color:var(--tc-marker)}._step_g6bg9_206[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._step_g6bg9_206[data-state=stale] ._step_number_g6bg9_230{border:1.5px dashed var(--tc-accent-border);background-color:#0000}._step_tag_g6bg9_269{color:var(--tc-text-muted);font-size:11px;font-weight:400}._banner_g6bg9_275{gap:var(--tc-space-2) var(--tc-space-3);padding:var(--tc-space-3) 14px;background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);border-radius:14px;flex-wrap:wrap;align-items:center;display:flex}._banner_g6bg9_275>span{flex:260px}._answered_g6bg9_293{gap:2px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:10px 14px;display:grid}._answered_question_g6bg9_305{color:var(--tc-text-muted)}._answered_answer_g6bg9_309{font-weight:var(--tc-font-weight-semibold);grid-column:1}._answered_g6bg9_293>:last-child{grid-area:1/2/3}._ask_g6bg9_319{background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border), 0 8px 24px var(--tc-shadow);border-radius:18px;gap:14px;padding:18px;display:grid}._ask_head_g6bg9_330{gap:var(--tc-space-2) 10px;flex-wrap:wrap;align-items:baseline;display:flex}._ask_title_g6bg9_337{font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg);margin:0}._badge_g6bg9_344{background-color:var(--tc-chip-bg);height:22px;color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);border-radius:999px;align-items:center;padding:0 8px;display:inline-flex}._options_g6bg9_355{gap:var(--tc-space-2);grid-template-columns:repeat(auto-fill,minmax(240px,1fr));display:grid}._option_g6bg9_355{gap:var(--tc-space-1) 10px;padding:var(--tc-space-3) 14px;border:1px solid var(--tc-divider);background-color:var(--tc-canvas);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:auto minmax(0,1fr);display:grid}._option_g6bg9_355[aria-checked=true]{border-color:var(--tc-accent-border);background-color:var(--tc-accent-soft)}._option_mark_g6bg9_378{border:1.5px solid var(--tc-border-field);background-color:var(--tc-field-bg);width:18px;height:18px;color:var(--tc-on-accent);border-radius:6px;grid-row:1/3;place-items:center;margin-top:2px;display:inline-grid}._option_mark_g6bg9_378[data-shape=radio]{border-radius:999px}._option_g6bg9_355[aria-checked=true] ._option_mark_g6bg9_378{border-color:var(--tc-accent);background-color:var(--tc-accent)}._option_label_g6bg9_400{font-weight:var(--tc-font-weight-semibold)}._option_detail_g6bg9_404{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);line-height:18px}._entries_g6bg9_411{gap:10px;display:grid}._entry_g6bg9_416{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);display:grid}._entry_head_g6bg9_425{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._entry_title_g6bg9_432{overflow-wrap:anywhere;font-size:15px;font-weight:650}._entry_content_g6bg9_438{font-size:var(--tc-font-size-sm);white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:21px}._pill_g6bg9_446{background-color:var(--tc-chip-bg);height:20px;color:var(--tc-text-muted);white-space:nowrap;border-radius:999px;align-items:center;padding:0 8px;font-size:11px;font-weight:600;display:inline-flex}._pill_g6bg9_446[data-tone=constant]{background-color:var(--tc-accent);color:var(--tc-on-accent)}._pill_g6bg9_446[data-tone=new]{background-color:var(--tc-marker);color:var(--tc-on-marker)}._pill_g6bg9_446[data-tone=modified]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._keys_g6bg9_475{gap:var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);flex-wrap:wrap;align-items:center;display:flex}._key_g6bg9_475{background-color:var(--tc-chip-bg);border-radius:999px;align-items:center;height:22px;padding:0 8px;display:inline-flex}._editor_g6bg9_493{padding:var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border);gap:14px;display:grid}._foot_g6bg9_502{gap:var(--tc-space-2);padding:var(--tc-space-3) 0;background-color:var(--tc-canvas);flex-wrap:wrap;align-items:center;display:flex;position:sticky;bottom:0}._bubble_g6bg9_514{gap:var(--tc-space-2);padding:var(--tc-space-4);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:18px;display:grid}._bubble_name_g6bg9_523{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._bubble_text_g6bg9_528{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:23px}._outputs_g6bg9_535{gap:var(--tc-space-3);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._output_g6bg9_535{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);align-content:start;display:grid}._output_title_g6bg9_551{gap:var(--tc-space-2);font-size:var(--tc-font-size-md);align-items:center;margin:0;display:flex}._known_g6bg9_560{gap:var(--tc-space-4);padding:var(--tc-space-3) var(--tc-space-4) var(--tc-space-4);border-left:1px solid var(--tc-divider);align-content:start;display:grid}._known_block_g6bg9_568{gap:6px;display:grid}._known_title_g6bg9_573{font-size:var(--tc-font-size-sm);margin:0;font-weight:700}._known_line_g6bg9_579{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere}._known_line_g6bg9_579 strong{color:var(--tc-text);font-weight:var(--tc-font-weight-semibold)}._known_toggle_g6bg9_591{display:none}._table_g6bg9_596{gap:6px;display:grid}._table_row_g6bg9_601{gap:var(--tc-space-3);padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:40px minmax(0,200px) minmax(0,1fr) 48px auto;align-items:center;display:grid}._table_row_g6bg9_601[data-off]{opacity:.55}._table_name_g6bg9_617{gap:var(--tc-space-1);font-weight:var(--tc-font-weight-semibold);overflow-wrap:anywhere;display:grid}._preview_g6bg9_624{color:var(--tc-text-muted);-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:19px;display:-webkit-box;overflow:hidden}._order_g6bg9_633{color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);text-align:center}._write_list_g6bg9_641{gap:6px;max-height:46vh;display:grid;overflow:auto}._write_row_g6bg9_648{padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:12px;grid-template-columns:auto auto minmax(0,1fr);align-items:start;gap:10px;display:grid}._write_row_g6bg9_648[data-status=same]{opacity:.6}._diff_g6bg9_664{font-size:var(--tc-font-size-xs);gap:2px;line-height:18px;display:grid}._diff_g6bg9_664 del{color:var(--tc-text-muted)}._diff_g6bg9_664 ins{background-color:var(--tc-accent-soft);text-decoration:none}._template_step_g6bg9_681{gap:10px var(--tc-space-3);padding:var(--tc-space-3) 14px;border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:auto minmax(0,1fr) auto;align-items:start;display:grid}._template_number_g6bg9_692{background-color:var(--tc-chip-bg);width:24px;height:24px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;margin-top:6px;display:grid}._template_fields_g6bg9_704{gap:var(--tc-space-2);min-width:0;display:grid}._template_side_g6bg9_710{gap:var(--tc-space-2);justify-items:end;display:grid}@container studio-workspace (width<=640px){._layout_g6bg9_5,._columns_g6bg9_86{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._aside_g6bg9_11{padding:var(--tc-space-1) var(--tc-space-4) var(--tc-space-2);scrollbar-width:none;flex-direction:row;overflow-x:auto}._aside_new_g6bg9_20{flex:none;margin:0}._aside_title_g6bg9_24,._item_meta_g6bg9_56,._dots_g6bg9_61{display:none}._item_g6bg9_30{max-width:200px;padding:6px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:999px;flex:none}._work_g6bg9_92{padding:var(--tc-space-2) var(--tc-space-4) var(--tc-space-4)}._work_title_g6bg9_128{font-size:22px;line-height:28px}._steps_g6bg9_206{scrollbar-width:none;flex-wrap:nowrap;overflow-x:auto}._step_g6bg9_206{flex:none}._step_g6bg9_206:not([aria-current=step]) ._step_label_g6bg9_769{display:none}._known_g6bg9_560{border-left:0;display:none}._known_g6bg9_560[data-open]{padding:0 var(--tc-space-4) var(--tc-space-4);display:grid}._known_toggle_g6bg9_591{display:inline-flex}._table_row_g6bg9_601{grid-template-columns:40px minmax(0,1fr) auto}._preview_g6bg9_624,._order_g6bg9_633{display:none}._template_step_g6bg9_681{grid-template-columns:minmax(0,1fr)}._template_number_g6bg9_692{display:none}._template_side_g6bg9_710{justify-items:start}}");
var Z = He, Ue = /* @__PURE__ */ I({
	__name: "OpeningSectionSwitch",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = _(e, "modelValue"), { t: n } = O(), r = A(() => [
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
		return (e, a) => (d(), T(G, {
			"model-value": t.value,
			class: j(S(Z).compact),
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
function We(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region src/ui/views/opening/OpeningBooks.vue?vue&type=script&setup=true&lang.ts
var Q = ["aria-label"], Ge = ["aria-current", "onClick"], Ke = ["placeholder", "aria-label"], qe = ["id"], Je = ["id", "aria-describedby"], Ye = ["id"], Xe = ["data-off"], Ze = ["aria-label"], Qe = /* @__PURE__ */ I({
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
		let n = e, r = _(e, "section"), i = t, { t: a } = O(), o = N(n.lists.chat_book ?? n.lists.books[0] ?? null), s = N([]), c = N(!1), l = N(!1), u = N(null);
		async function m() {
			if (s.value = [], n.host !== null && o.value !== null) {
				c.value = !0, u.value = null;
				try {
					s.value = await n.host.read_entries(o.value);
				} catch (e) {
					u.value = a("opening.errors.failed", { reason: We(e) });
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
				return u.value = a("opening.errors.failed", { reason: We(e) }), !1;
			} finally {
				l.value = !1;
			}
		}
		let x = N(null), E = N(""), k = A(() => E.value.trim() !== o.value && n.lists.books.includes(E.value.trim()));
		function ee(e) {
			E.value = e === "rename" ? o.value ?? "" : "", x.value = e;
		}
		async function I() {
			let e = E.value.trim(), t = x.value, n = o.value;
			e === "" || k.value || t === null || await g((r) => t === "create" || n === null ? r.create_worldbook(e) : r.rename_worldbook(n, e)) && (x.value = null, o.value = e);
		}
		let R = N(!1);
		async function z() {
			let e = o.value;
			e !== null && await g((t) => t.delete_worldbook(e)) && (R.value = !1, o.value = null);
		}
		async function B() {
			let e = o.value;
			e !== null && await g((t) => t.bind_chat_worldbook(e));
		}
		function V(e) {
			return e === n.lists.chat_book ? a("opening.books.bound") : "";
		}
		let te = N(""), ie = N("all"), ae = A(() => [
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
		]), oe = A(() => {
			let e = te.value.trim().toLowerCase();
			return s.value.filter((t) => ie.value === "constant" && !t.constant || ie.value === "keyword" && t.constant ? !1 : e === "" || [
				t.name,
				t.content,
				...t.keys
			].some((t) => t.toLowerCase().includes(e)));
		}), ce = A(() => s.value.filter((e) => e.enabled).length), W = N(null);
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
		async function pe(e, t) {
			let n = o.value;
			n !== null && await g((r) => r.save_entries(n, {
				upsert: [{
					...e,
					enabled: t
				}],
				remove: []
			}));
		}
		let G = N(null);
		async function ve() {
			let e = G.value, t = o.value;
			e !== null && t !== null && (await g((n) => n.save_entries(t, {
				upsert: [],
				remove: [e.uid]
			})), G.value = null);
		}
		return (t, n) => (d(), y("div", { class: j(S(Z).layout) }, [
			D("aside", {
				class: j(S(Z).aside),
				"aria-label": S(a)("opening.books.list_label")
			}, [
				L(H, {
					class: j(S(Z).aside_new),
					icon: S(le),
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
					class: j(S(Z).aside_title)
				}, w(S(a)("opening.books.list_title")), 3)) : C("", !0),
				(d(!0), y(P, null, p(e.lists.books, (e) => (d(), y("button", {
					key: e,
					type: "button",
					class: j(["tc-interactive", S(Z).item]),
					"aria-current": e === o.value ? "true" : void 0,
					onClick: (t) => o.value = e
				}, [D("span", { class: j(S(Z).item_name) }, w(e), 3), V(e) === "" ? C("", !0) : (d(), y("span", {
					key: 0,
					class: j(S(Z).item_meta)
				}, w(V(e)), 3))], 10, Ge))), 128))
			], 10, Q),
			D("div", { class: j(S(Z).work) }, [D("div", {
				class: j(S(Z).work_inner),
				"data-wide": ""
			}, [D("div", { class: j(S(Z).topline) }, [
				L(Ue, {
					modelValue: r.value,
					"onUpdate:modelValue": n[1] ||= (e) => r.value = e
				}, null, 8, ["modelValue"]),
				D("span", { class: j(S(Z).spacer) }, null, 2),
				o.value === null ? C("", !0) : (d(), y(P, { key: 0 }, [
					o.value !== e.lists.chat_book && e.host?.chat_name() !== null ? (d(), T(H, {
						key: 0,
						icon: S(we),
						label: S(a)("opening.books.bind"),
						variant: "ghost",
						disabled: l.value,
						onClick: B
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])) : C("", !0),
					L(H, {
						icon: S(se),
						label: S(a)("opening.books.rename"),
						variant: "ghost",
						disabled: l.value,
						onClick: n[2] ||= (e) => ee("rename")
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					]),
					L(K, {
						icon: S(ue),
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
			], 2), e.host === null ? (d(), T(ne, {
				key: 0,
				status: "empty",
				"empty-title": S(a)("opening.books.unavailable_title"),
				"empty-message": e.hostError ?? S(a)("opening.books.unavailable_message")
			}, null, 8, ["empty-title", "empty-message"])) : o.value === null ? (d(), y("div", {
				key: 1,
				class: j(S(Z).work_head)
			}, [D("h1", { class: j(S(Z).work_title) }, w(S(a)("opening.books.title")), 3), D("p", { class: j(S(Z).work_description) }, w(S(a)("opening.books.empty")), 3)], 2)) : (d(), y(P, { key: 2 }, [
				D("div", { class: j(S(Z).work_head) }, [D("h1", { class: j(S(Z).work_title) }, w(o.value), 3), D("p", { class: j(S(Z).work_description) }, [F(w(S(a)("opening.books.summary", {
					n: s.value.length,
					enabled: ce.value
				})) + " ", 1), o.value === e.lists.chat_book ? (d(), y(P, { key: 0 }, [F(" · " + w(S(a)("opening.books.bound")), 1)], 64)) : C("", !0)], 2)], 2),
				u.value === null ? C("", !0) : (d(), y("p", {
					key: 0,
					class: j(S(Z).error),
					role: "alert"
				}, w(u.value), 3)),
				D("div", { class: j(S(Z).row) }, [
					f(D("input", {
						"onUpdate:modelValue": n[4] ||= (e) => te.value = e,
						class: j([S(Z).input, S(Z).spacer]),
						type: "search",
						placeholder: S(a)("opening.books.search"),
						"aria-label": S(a)("opening.books.search")
					}, null, 10, Ke), [[b, te.value]]),
					L(re, {
						modelValue: ie.value,
						"onUpdate:modelValue": n[5] ||= (e) => ie.value = e,
						options: ae.value,
						placeholder: S(a)("opening.books.filter_all"),
						"aria-label": S(a)("opening.books.filter_label")
					}, null, 8, [
						"modelValue",
						"options",
						"placeholder",
						"aria-label"
					]),
					L(H, {
						icon: S(le),
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
					class: j(S(Z).editor)
				}, [
					D("div", { class: j(S(Z).grid3) }, [L(U, { label: S(a)("opening.entry.title_label") }, {
						default: M(({ fieldId: e }) => [f(D("input", {
							id: e,
							"onUpdate:modelValue": n[7] ||= (e) => W.value.name = e,
							class: j(S(Z).input),
							maxlength: "120"
						}, null, 10, qe), [[b, W.value.name]])]),
						_: 1
					}, 8, ["label"]), L(U, { label: S(a)("opening.books.order_label") }, {
						default: M(({ fieldId: e }) => [L(me, {
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
					L(ge, {
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
						default: M(({ fieldId: e, describedBy: t }) => [f(D("input", {
							id: e,
							"onUpdate:modelValue": n[10] ||= (e) => W.value.keys = e,
							class: j(S(Z).input),
							"aria-describedby": t
						}, null, 10, Je), [[b, W.value.keys]])]),
						_: 1
					}, 8, ["label", "hint"])),
					L(U, { label: S(a)("opening.entry.content_label") }, {
						default: M(({ fieldId: e }) => [f(D("textarea", {
							id: e,
							"onUpdate:modelValue": n[11] ||= (e) => W.value.content = e,
							class: j(S(Z).text_area)
						}, null, 10, Ye), [[b, W.value.content]])]),
						_: 1
					}, 8, ["label"]),
					D("div", { class: j(S(Z).row) }, [
						D("span", { class: j(S(Z).spacer) }, null, 2),
						L(H, {
							label: S(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[12] ||= (e) => W.value = null
						}, null, 8, ["label"]),
						L(H, {
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
				L(ne, {
					status: c.value ? "loading" : oe.value.length === 0 ? "empty" : "ready",
					"empty-title": S(a)("opening.books.no_entries"),
					"min-height": "80px"
				}, {
					default: M(() => [D("div", { class: j(S(Z).table) }, [(d(!0), y(P, null, p(oe.value, (e) => (d(), y("div", {
						key: e.uid,
						class: j(S(Z).table_row),
						"data-off": e.enabled ? void 0 : ""
					}, [
						L(ge, {
							"model-value": e.enabled,
							label: S(a)("opening.books.enabled", { name: e.name }),
							"label-hidden": "",
							disabled: l.value,
							"onUpdate:modelValue": (t) => pe(e, t)
						}, null, 8, [
							"model-value",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						D("span", { class: j(S(Z).table_name) }, [F(w(e.name) + " ", 1), D("span", { class: j(S(Z).keys) }, [e.constant ? (d(), y("span", {
							key: 0,
							class: j(S(Z).pill),
							"data-tone": "constant"
						}, w(S(a)("opening.entry.constant")), 3)) : (d(!0), y(P, { key: 1 }, p(e.keys.slice(0, 4), (e) => (d(), y("span", {
							key: e,
							class: j(S(Z).key)
						}, w(e), 3))), 128))], 2)], 2),
						D("span", { class: j(S(Z).preview) }, w(e.content), 3),
						D("span", { class: j(S(Z).order) }, w(e.order), 3),
						D("span", { class: j(S(Z).row) }, [L(K, {
							icon: S(se),
							label: S(a)("opening.entry.edit"),
							size: "sm",
							disabled: l.value,
							onClick: (t) => de(e)
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						]), L(K, {
							icon: S(ue),
							label: S(a)("opening.entry.remove"),
							size: "sm",
							destructive: "",
							disabled: l.value,
							onClick: (t) => G.value = e
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
			L(_e, h({
				open: x.value !== null,
				title: x.value === "rename" ? S(a)("opening.books.rename") : S(a)("opening.books.new")
			}, x.value === "rename" ? { description: S(a)("opening.books.rename_hint") } : {}, {
				"close-label": S(a)("common.actions.close"),
				"onUpdate:open": n[15] ||= (e) => x.value = e ? x.value : null
			}), {
				default: M(() => [D("div", { class: j(S(Z).work_inner) }, [
					f(D("input", {
						"onUpdate:modelValue": n[13] ||= (e) => E.value = e,
						class: j(S(Z).input),
						maxlength: "120",
						"aria-label": S(a)("opening.books.name_label")
					}, null, 10, Ze), [[b, E.value]]),
					k.value ? (d(), y("p", {
						key: 0,
						class: j(S(Z).error)
					}, w(S(a)("opening.write.name_taken")), 3)) : C("", !0),
					D("div", { class: j(S(Z).row) }, [
						D("span", { class: j(S(Z).spacer) }, null, 2),
						L(H, {
							label: S(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[14] ||= (e) => x.value = null
						}, null, 8, ["label"]),
						L(H, {
							label: S(a)("common.actions.save"),
							variant: "primary",
							pending: l.value,
							disabled: E.value.trim() === "" || k.value,
							onClick: I
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
			L(he, {
				open: R.value,
				"onUpdate:open": n[16] ||= (e) => R.value = e,
				title: S(a)("opening.books.delete_title", { name: o.value ?? "" }),
				description: S(a)("opening.books.delete_description"),
				"confirm-label": S(a)("common.actions.delete"),
				"cancel-label": S(a)("common.actions.cancel"),
				pending: l.value,
				onConfirm: z
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			L(he, {
				open: G.value !== null,
				title: S(a)("opening.books.delete_entry_title", { name: G.value?.name ?? "" }),
				description: S(a)("opening.books.delete_entry_description"),
				"confirm-label": S(a)("common.actions.delete"),
				"cancel-label": S(a)("common.actions.cancel"),
				pending: l.value,
				"onUpdate:open": n[17] ||= (e) => G.value = e ? G.value : null,
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
var ot = ["id"], st = ["id", "aria-describedby"], ct = ["id"], lt = /* @__PURE__ */ I({
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
		let n = e, r = t, { t: i } = O(), a = N(n.editing), o = N(""), s = N(!1), c = N(""), l = N("");
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
			class: j(S(Z).editor)
		}, [
			L(U, { label: S(i)("opening.entry.title_label") }, {
				default: M(({ fieldId: e }) => [f(D("input", {
					id: e,
					"onUpdate:modelValue": n[0] ||= (e) => o.value = e,
					class: j(S(Z).input),
					maxlength: "120"
				}, null, 10, ot), [[b, o.value]])]),
				_: 1
			}, 8, ["label"]),
			L(ge, {
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
				default: M(({ fieldId: e, describedBy: t }) => [f(D("input", {
					id: e,
					"onUpdate:modelValue": n[2] ||= (e) => c.value = e,
					class: j(S(Z).input),
					"aria-describedby": t
				}, null, 10, st), [[b, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])),
			L(U, { label: S(i)("opening.entry.content_label") }, {
				default: M(({ fieldId: e }) => [f(D("textarea", {
					id: e,
					"onUpdate:modelValue": n[3] ||= (e) => l.value = e,
					class: j(S(Z).text_area),
					maxlength: "8000"
				}, null, 10, ct), [[b, l.value]])]),
				_: 1
			}, 8, ["label"]),
			D("div", { class: j(S(Z).row) }, [
				D("span", { class: j(S(Z).spacer) }, null, 2),
				L(H, {
					label: S(i)("common.actions.cancel"),
					variant: "ghost",
					onClick: h
				}, null, 8, ["label"]),
				L(H, {
					label: S(i)("common.actions.save"),
					variant: "primary",
					disabled: o.value.trim() === "" || l.value.trim() === "",
					onClick: m
				}, null, 8, ["label", "disabled"])
			], 2)
		], 2)) : (d(), y("article", {
			key: 1,
			class: j(S(Z).entry)
		}, [
			D("div", { class: j(S(Z).entry_head) }, [
				D("span", { class: j(S(Z).entry_title) }, w(e.entry.title), 3),
				e.entry.constant ? (d(), y("span", {
					key: 0,
					class: j(S(Z).pill),
					"data-tone": "constant"
				}, w(S(i)("opening.entry.constant")), 3)) : (d(), y("span", {
					key: 1,
					class: j(S(Z).pill)
				}, w(S(i)("opening.entry.keyword")), 3)),
				D("span", { class: j(S(Z).spacer) }, null, 2),
				L(K, {
					icon: S(ce),
					label: S(i)("opening.entry.rewrite"),
					size: "sm",
					disabled: e.disabled || e.rewriting,
					onClick: n[4] ||= (e) => r("rewrite")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				L(K, {
					icon: S(se),
					label: S(i)("opening.entry.edit"),
					size: "sm",
					disabled: e.disabled,
					onClick: u
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				L(K, {
					icon: S(ue),
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
				class: j(S(Z).keys)
			}, [F(w(S(i)("opening.entry.keys_label")) + " ", 1), (d(!0), y(P, null, p(e.entry.keys, (e) => (d(), y("span", {
				key: e,
				class: j(S(Z).key)
			}, w(e), 3))), 128))], 2)) : C("", !0),
			e.rewriting ? (d(), y("p", {
				key: 1,
				class: j(S(Z).hint),
				role: "status"
			}, w(S(i)("opening.status.rewriting")), 3)) : C("", !0),
			D("p", { class: j(S(Z).entry_content) }, w(e.entry.content), 3)
		], 2));
	}
}), ut = ["aria-label"], dt = ["data-status"], ft = ["data-tone"], pt = /* @__PURE__ */ I({
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
		let n = e, r = _(e, "open"), i = t, { t: a } = O(), o = N("new"), s = N(""), c = N(void 0), l = N([]), u = N(!1), m = N(!1), h = N(null), g = N(/* @__PURE__ */ new Set()), x = A(() => [{
			value: "new",
			label: a("opening.write.mode_new")
		}, {
			value: "existing",
			label: a("opening.write.mode_existing")
		}]), E = A(() => n.lists.books.map((e) => ({
			value: e,
			label: e
		}))), k = A(() => nt(n.entries, o.value === "existing" ? l.value : []));
		function ee() {
			g.value = new Set(k.value.filter((e) => e.status !== "same").map((e) => e.entry.id));
		}
		async function F() {
			if (l.value = [], o.value !== "existing" || c.value === void 0) {
				ee();
				return;
			}
			u.value = !0, h.value = null;
			try {
				l.value = await n.host.read_entries(c.value);
			} catch (e) {
				h.value = a("opening.write.read_failed", { reason: We(e) });
			} finally {
				u.value = !1, ee();
			}
		}
		v(r, (e) => {
			e && (h.value = null, s.value = n.defaultName, c.value = n.lists.chat_book ?? n.lists.books[0], o.value = n.lists.chat_book === null ? "new" : "existing", F());
		}), v([o, c], () => {
			F();
		});
		function I(e, t) {
			let n = new Set(g.value);
			t === !0 ? n.add(e) : n.delete(e), g.value = n;
		}
		let R = A(() => o.value === "new" ? s.value.trim() : c.value ?? ""), z = A(() => o.value === "new" && n.lists.books.includes(s.value.trim())), B = A(() => k.value.filter((e) => e.status !== "same" && g.value.has(e.entry.id)).length), V = A(() => r.value ? n.host.chat_name() : null);
		function te(e) {
			switch (e.status) {
				case "new": return a("opening.write.status_new");
				case "modified": return a("opening.write.status_modified");
				case "same": return a("opening.write.status_same");
			}
		}
		async function ne() {
			let e = R.value;
			if (!(e === "" || z.value)) {
				m.value = !0, h.value = null;
				try {
					o.value === "new" && await n.host.create_worldbook(e);
					let t = o.value === "new" ? [] : l.value;
					await n.host.save_entries(e, it(k.value, g.value, t)), V.value !== null && await n.host.bind_chat_worldbook(e), i("written", e), r.value = !1;
				} catch (e) {
					h.value = a("opening.write.failed", { reason: We(e) });
				} finally {
					m.value = !1;
				}
			}
		}
		return (e, t) => (d(), T(_e, {
			open: r.value,
			"onUpdate:open": t[4] ||= (e) => r.value = e,
			title: S(a)("opening.write.title"),
			description: S(a)("opening.write.description"),
			"close-label": S(a)("common.actions.close")
		}, {
			default: M(() => [D("div", { class: j(S(Z).work_inner) }, [
				L(G, {
					modelValue: o.value,
					"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
					class: j(S(Z).compact),
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
					class: j(S(Z).input),
					maxlength: "120",
					"aria-label": S(a)("opening.write.name_label")
				}, null, 10, ut)), [[b, s.value]]) : (d(), T(re, {
					key: 1,
					modelValue: c.value,
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					options: E.value,
					placeholder: S(a)("opening.write.book_placeholder"),
					"aria-label": S(a)("opening.write.book_label")
				}, null, 8, [
					"modelValue",
					"options",
					"placeholder",
					"aria-label"
				])),
				z.value ? (d(), y("p", {
					key: 2,
					class: j(S(Z).error)
				}, w(S(a)("opening.write.name_taken")), 3)) : C("", !0),
				u.value ? (d(), y("p", {
					key: 3,
					class: j(S(Z).hint),
					role: "status"
				}, w(S(a)("opening.write.loading")), 3)) : (d(), y("div", {
					key: 4,
					class: j(S(Z).write_list)
				}, [(d(!0), y(P, null, p(k.value, (e) => (d(), y("div", {
					key: e.entry.id,
					class: j(S(Z).write_row),
					"data-status": e.status
				}, [
					L(oe, {
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
						class: j(S(Z).pill),
						"data-tone": e.status
					}, w(te(e)), 11, ft),
					D("span", null, [D("strong", null, w(e.entry.title), 1), e.status === "modified" && e.existing !== null ? (d(), y("span", {
						key: 0,
						class: j(S(Z).diff)
					}, [D("del", null, w(e.existing.content), 1), D("ins", null, w(e.entry.content), 1)], 2)) : C("", !0)])
				], 10, dt))), 128))], 2)),
				D("p", { class: j(S(Z).hint) }, w(V.value === null ? S(a)("opening.write.no_chat") : S(a)("opening.write.bind_note", {
					book: R.value,
					chat: V.value
				})), 3),
				h.value === null ? C("", !0) : (d(), y("p", {
					key: 5,
					class: j(S(Z).error),
					role: "alert"
				}, w(h.value), 3)),
				D("div", { class: j(S(Z).row) }, [
					D("span", { class: j(S(Z).spacer) }, null, 2),
					L(H, {
						label: S(a)("common.actions.cancel"),
						variant: "ghost",
						onClick: t[3] ||= (e) => r.value = !1
					}, null, 8, ["label"]),
					L(H, {
						label: S(a)("opening.write.confirm", { n: B.value }),
						variant: "primary",
						pending: m.value,
						disabled: B.value === 0 || R.value === "" || z.value || u.value,
						onClick: ne
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
], yt = ["aria-pressed", "onClick"], bt = ["id", "aria-describedby"], xt = ["aria-label"], St = [
	"data-state",
	"aria-current",
	"disabled",
	"onClick"
], Ct = ["role", "aria-label"], wt = [
	"role",
	"aria-checked",
	"disabled",
	"onClick"
], Tt = ["data-shape"], Et = ["id", "placeholder"], Dt = ["id"], Ot = ["id"], kt = [
	"id",
	"aria-describedby",
	"placeholder"
], At = ["data-open", "aria-label"], jt = 4e3, Mt = /* @__PURE__ */ I({
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
		let n = e, r = _(e, "section"), i = t, { t: a } = O(), o = N(n.store.drafts.value[0]?.id ?? null), s = A(() => o.value === null ? null : n.store.draft(o.value)), c = N(null);
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
				states: e.steps.map(Le),
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
		let g = N(!1), x = N(!1);
		async function k() {
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
		function I(e, t = !1) {
			s.value !== null && n.store.edit(s.value, e, { debounce: t });
		}
		let R = A(() => n.templates.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), z = N(Pe);
		v(() => s.value?.template_name, (e) => {
			z.value = n.templates.find((t) => t.display_name === e)?.id ?? "builtin-default";
		}, { immediate: !0 });
		function ne(e) {
			let t = e === void 0 ? void 0 : m(e);
			t !== void 0 && (z.value = t.id, I((e) => {
				e.template_name = t.display_name, e.steps = t.steps.map((e) => ({ ...e })), e.states = t.steps.map(Le), e.current = 0;
			}));
		}
		let de = A(() => [
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
		]), pe = A(() => {
			let e = s.value?.connection;
			return e?.kind === "proxy_preset" ? `proxy:${e.proxy_preset}` : e?.kind;
		});
		function G(e) {
			e !== void 0 && I((t) => {
				t.connection = e.startsWith("proxy:") ? {
					kind: "proxy_preset",
					proxy_preset: e.slice(6)
				} : e === "current" ? { kind: "current" } : { kind: "analysis" };
			});
		}
		let me = A(() => n.lists.presets.map((e) => ({
			value: e,
			label: e === "in_use" ? a("opening.settings.preset_in_use") : e
		})));
		function ge(e) {
			e !== void 0 && I((t) => {
				t.preset_name = e;
			});
		}
		function _e(e) {
			I((t) => {
				t.worldbooks = t.worldbooks.includes(e) ? t.worldbooks.filter((t) => t !== e) : [...t.worldbooks, e].slice(0, 20);
			});
		}
		let ve = N(null);
		v([o, () => n.host], () => {
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
		function we(e) {
			I((t) => {
				t.use_greeting = e === !0 && t.card !== null;
			});
		}
		function Ee(e) {
			return de.value.find((e) => e.value === pe.value)?.label ?? e.connection.kind;
		}
		let q = A(() => s.value === null ? null : n.flow.busy(s.value.id)), De = A(() => s.value === null ? null : n.flow.error(s.value.id)), J = A(() => s.value?.steps[s.value.current] ?? null), Y = A(() => s.value?.states[s.value.current] ?? null), Oe = A(() => s.value !== null && s.value.current === s.value.steps.length - 1), ke = A(() => Y.value?.status === "done" || Y.value?.status === "stale"), Ae = A(() => s.value?.states.some((e) => e.status === "stale") ?? !1);
		function je(e) {
			return e instanceof fe ? a("opening.errors.unparsable", { excerpt: e.excerpt }) : a("opening.errors.failed", { reason: We(e) });
		}
		function Me(e) {
			return e === "stale" ? a("opening.steps.stale") : "";
		}
		function Ne(e) {
			let t = s.value;
			return t !== null && (t.states[e]?.status !== "pending" || e === t.current);
		}
		function Fe(e) {
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
		let Be = N(!1), X = N("");
		function Ve() {
			X.value = s.value?.description ?? "", Be.value = !0;
		}
		function He() {
			let e = X.value;
			I((t) => {
				ze(t, e);
			}), Be.value = !1;
		}
		let Q = N([]), Ge = N(""), Ke = N(!1), qe = N(""), Je = N(null);
		async function Ye() {
			Ke.value = !0, await E(), Je.value?.focus();
		}
		v(() => [s.value?.id, s.value?.current], () => {
			Ke.value = !1, qe.value = "";
		});
		async function Xe() {
			let e = s.value;
			if (e === null) return;
			let t = qe.value;
			Ke.value = !1, qe.value = "", await n.flow.ask_more(e, e.current, t);
		}
		v(() => Y.value?.question, () => {
			Q.value = [], Ge.value = "";
		});
		function Ze(e) {
			let t = Y.value?.question;
			if (t != null) {
				if (!t.multiple) {
					Q.value = Q.value.includes(e) ? [] : [e];
					return;
				}
				Q.value = Q.value.includes(e) ? Q.value.filter((t) => t !== e) : [...Q.value, e];
			}
		}
		async function Qe() {
			s.value !== null && await n.flow.answer(s.value, Q.value, Ge.value);
		}
		function et(e, t) {
			let n = [...e, ...t === "" ? [] : [t]];
			return n.length === 0 ? a("opening.ask.left_to_model") : n.join(a("opening.ask.joiner"));
		}
		let tt = N(null);
		function nt(e, t) {
			I((n) => {
				let r = n.states[e]?.entries, i = r?.findIndex((e) => e.id === t.id) ?? -1;
				r !== void 0 && i >= 0 && (r[i] = t), Re(n, e);
			}), tt.value = null;
		}
		function rt(e, t) {
			I((n) => {
				let r = n.states[e];
				r !== void 0 && (r.entries = r.entries.filter((e) => e.id !== t)), Re(n, e);
			});
		}
		function it(e) {
			let t = crypto.randomUUID();
			I((n) => {
				n.states[e]?.entries.push({
					id: t,
					title: a("opening.entry.new_title"),
					constant: !1,
					keys: [],
					content: ""
				});
			}), tt.value = t;
		}
		function ot(e, t) {
			tt.value === t && (rt(e, t), tt.value = null);
		}
		let st = N(!1), ct = N(""), ut = N("");
		function dt() {
			ct.value = Y.value?.message?.speaker ?? "", ut.value = Y.value?.message?.text ?? "", st.value = !0;
		}
		function ft() {
			let e = s.value?.current ?? 0;
			I((t) => {
				let n = t.states[e];
				n !== void 0 && (n.message = {
					speaker: ct.value.trim(),
					text: ut.value
				});
			}), st.value = !1;
		}
		let Mt = A(() => s.value === null ? [] : $e(s.value)), Nt = A(() => [...s.value?.states ?? []].reverse().find((e) => e.message !== null)?.message ?? null), Pt = N(!1), Ft = N(null);
		function It(e) {
			Ft.value = a("opening.output.book_written", { book: e }), i("refresh-lists");
		}
		let Lt = N(!1), Rt = N(!1), $ = A(() => Lt.value ? n.host?.chat_name() ?? null : null);
		async function zt() {
			let e = Nt.value;
			if (n.host !== null && e !== null) {
				Rt.value = !0;
				try {
					await n.host.append_character_message(e.speaker, e.text), Lt.value = !1, Ft.value = a("opening.output.message_added");
				} catch (e) {
					c.value = a("opening.errors.failed", { reason: We(e) }), Lt.value = !1;
				} finally {
					Rt.value = !1;
				}
			}
		}
		function Bt() {
			let e = s.value;
			return e === null ? "" : at(e, {
				description: a("opening.markdown.description"),
				constant: a("opening.entry.constant"),
				keys: a("opening.entry.keys_label")
			});
		}
		async function Vt() {
			try {
				await navigator.clipboard.writeText(Bt()), Ft.value = a("opening.output.copied");
			} catch (e) {
				c.value = a("opening.errors.failed", { reason: We(e) });
			}
		}
		function Ht() {
			let e = URL.createObjectURL(new Blob([Bt()], { type: "text/markdown" })), t = document.createElement("a");
			t.href = e, t.download = `${s.value?.display_name ?? "opening"}.md`, t.click(), URL.revokeObjectURL(e);
		}
		let Ut = N(!1);
		return v(o, () => {
			c.value = null, Ft.value = null, st.value = !1, Be.value = !1;
		}), (t, n) => (d(), y("div", { class: j(S(Z).layout) }, [
			D("aside", {
				class: j(S(Z).aside),
				"aria-label": S(a)("opening.draft.list_label")
			}, [
				L(H, {
					class: j(S(Z).aside_new),
					icon: S(le),
					label: S(a)("opening.draft.new"),
					onClick: h
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				e.store.drafts.value.length > 0 ? (d(), y("div", {
					key: 0,
					class: j(S(Z).aside_title)
				}, w(S(a)("opening.draft.list_title")), 3)) : C("", !0),
				(d(!0), y(P, null, p(e.store.drafts.value, (e) => (d(), y("button", {
					key: e.id,
					type: "button",
					class: j(["tc-interactive", S(Z).item]),
					"aria-current": e.id === o.value ? "true" : void 0,
					onClick: (t) => o.value = e.id
				}, [
					D("span", { class: j(S(Z).item_name) }, w(e.display_name), 3),
					D("span", { class: j(S(Z).dots) }, [(d(!0), y(P, null, p(l(e), (e, t) => (d(), y("i", {
						key: t,
						class: j(S(Z).dot),
						"data-state": e
					}, null, 10, gt))), 128))], 2),
					D("span", { class: j(S(Z).item_meta) }, w(u(e)), 3)
				], 10, ht))), 128))
			], 10, mt),
			D("div", { class: j(S(Z).columns) }, [D("div", { class: j(S(Z).work) }, [D("div", { class: j(S(Z).work_inner) }, [
				D("div", { class: j(S(Z).topline) }, [
					L(Ue, {
						modelValue: r.value,
						"onUpdate:modelValue": n[0] ||= (e) => r.value = e
					}, null, 8, ["modelValue"]),
					D("span", { class: j(S(Z).spacer) }, null, 2),
					s.value !== null && s.value.started ? (d(), T(H, {
						key: 0,
						icon: S(se),
						label: S(a)("opening.draft.description_label"),
						variant: "ghost",
						disabled: q.value !== null || Be.value,
						onClick: Ve
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])) : C("", !0),
					s.value !== null && s.value.started ? (d(), T(H, {
						key: 1,
						class: j(S(Z).known_toggle),
						icon: S(V),
						label: S(a)("opening.known.toggle"),
						variant: "ghost",
						onClick: n[1] ||= (e) => Ut.value = !Ut.value
					}, null, 8, [
						"class",
						"icon",
						"label"
					])) : C("", !0),
					s.value === null ? C("", !0) : (d(), T(K, {
						key: 2,
						icon: S(ue),
						label: S(a)("opening.draft.delete"),
						onClick: n[2] ||= (e) => g.value = !0
					}, null, 8, ["icon", "label"]))
				], 2),
				e.hostError === null ? C("", !0) : (d(), y("p", {
					key: 0,
					class: j(S(Z).error)
				}, w(S(a)("opening.errors.host", { reason: e.hostError })), 3)),
				e.saveError === null ? C("", !0) : (d(), y("p", {
					key: 1,
					class: j(S(Z).error),
					role: "alert"
				}, w(S(a)("opening.errors.save", { reason: e.saveError })), 3)),
				c.value === null ? C("", !0) : (d(), y("p", {
					key: 2,
					class: j(S(Z).error),
					role: "alert"
				}, w(c.value), 3)),
				s.value === null ? (d(), y("div", {
					key: 3,
					class: j(S(Z).work_head)
				}, [
					D("h1", { class: j(S(Z).work_title) }, w(S(a)("opening.title")), 3),
					D("p", { class: j(S(Z).work_description) }, w(S(a)("opening.empty_hint")), 3),
					D("div", { class: j(S(Z).row) }, [L(H, {
						icon: S(le),
						label: S(a)("opening.draft.new"),
						variant: "primary",
						onClick: h
					}, null, 8, ["icon", "label"])], 2)
				], 2)) : s.value.started ? J.value !== null && Y.value !== null ? (d(), y(P, { key: 5 }, [
					Be.value ? (d(), y("div", {
						key: 0,
						class: j(S(Z).editor)
					}, [L(U, {
						label: S(a)("opening.draft.description_label"),
						hint: S(a)("opening.draft.description_change_hint")
					}, {
						default: M(({ fieldId: e, describedBy: t }) => [f(D("textarea", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => X.value = e,
							class: j(S(Z).text_area),
							maxlength: jt,
							"aria-describedby": t
						}, null, 10, bt), [[b, X.value]]), D("div", { class: j(S(Z).counter) }, w(X.value.length) + " / " + w(jt), 3)]),
						_: 1
					}, 8, ["label", "hint"]), D("div", { class: j(S(Z).row) }, [
						D("span", { class: j(S(Z).spacer) }, null, 2),
						L(H, {
							label: S(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[6] ||= (e) => Be.value = !1
						}, null, 8, ["label"]),
						L(H, {
							label: S(a)("common.actions.save"),
							variant: "primary",
							disabled: q.value !== null || X.value.trim() === "" || X.value === s.value.description,
							onClick: He
						}, null, 8, ["label", "disabled"])
					], 2)], 2)) : C("", !0),
					D("nav", {
						class: j(S(Z).steps),
						"aria-label": S(a)("opening.steps.label")
					}, [(d(!0), y(P, null, p(s.value.steps, (e, t) => (d(), y("button", {
						key: e.id,
						type: "button",
						class: j(["tc-interactive", S(Z).step]),
						"data-state": s.value.states[t]?.status,
						"aria-current": t === s.value.current ? "step" : void 0,
						disabled: !Ne(t) || q.value !== null,
						onClick: (e) => Fe(t)
					}, [
						D("span", { class: j(S(Z).step_number) }, [s.value.states[t]?.status === "done" ? (d(), T(B, {
							key: 0,
							icon: S(te),
							size: 13
						}, null, 8, ["icon"])) : (d(), y(P, { key: 1 }, [F(w(t + 1), 1)], 64))], 2),
						D("span", { class: j(S(Z).step_label) }, w(e.name), 3),
						D("span", { class: j(S(Z).step_tag) }, w(Me(s.value.states[t]?.status ?? "")), 3)
					], 10, St))), 128))], 10, xt),
					Ae.value ? (d(), y("div", {
						key: 1,
						class: j(S(Z).banner)
					}, [D("span", null, w(S(a)("opening.steps.stale_banner")), 1), L(H, {
						icon: S(ce),
						label: S(a)("opening.steps.regenerate_stale"),
						pending: q.value !== null,
						onClick: n[7] ||= (t) => e.flow.regenerate_stale(s.value)
					}, null, 8, [
						"icon",
						"label",
						"pending"
					])], 2)) : C("", !0),
					D("div", { class: j(S(Z).work_head) }, [D("h1", { class: j(S(Z).work_title) }, w(J.value.name), 3), D("p", { class: j(S(Z).work_description) }, w(J.value.instruction), 3)], 2),
					(d(!0), y(P, null, p(Y.value.answers, (t, n) => (d(), y("div", {
						key: n,
						class: j(S(Z).answered)
					}, [
						D("span", { class: j(S(Z).answered_question) }, w(S(a)("opening.ask.answered", {
							n: n + 1,
							question: t.question.text
						})), 3),
						D("span", { class: j(S(Z).answered_answer) }, w(et(t.selected, t.other)), 3),
						L(H, {
							icon: S(se),
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
						key: 2,
						class: j(S(Z).hint),
						role: "status"
					}, w(q.value.kind === "question" ? S(a)("opening.status.asking") : q.value.kind === "generate" ? S(a)("opening.status.generating", { step: s.value.steps[q.value.step]?.name ?? "" }) : S(a)("opening.status.rewriting")), 3)),
					q.value === null && e.flow.dropped(s.value.id) > 0 && ke.value ? (d(), y("p", {
						key: 3,
						class: j(S(Z).hint),
						role: "status"
					}, w(S(a)("opening.status.dropped", { n: e.flow.dropped(s.value.id) })), 3)) : C("", !0),
					De.value === null ? C("", !0) : (d(), y("div", {
						key: 4,
						class: j(S(Z).banner),
						role: "alert"
					}, [D("span", null, w(je(De.value)), 1), Y.value.status === "asking" && Y.value.question === null ? (d(), T(H, {
						key: 0,
						icon: S(ce),
						label: S(a)("opening.status.retry"),
						onClick: n[8] ||= (t) => e.flow.run_step(s.value, s.value.current)
					}, null, 8, ["icon", "label"])) : C("", !0)], 2)),
					Y.value.question === null ? Y.value.status === "pending" && q.value === null ? (d(), y("div", {
						key: 6,
						class: j(S(Z).row)
					}, [L(H, {
						icon: S(W),
						label: S(a)("opening.steps.run"),
						variant: "primary",
						onClick: n[11] ||= (t) => e.flow.run_step(s.value, s.value.current)
					}, null, 8, ["icon", "label"])], 2)) : C("", !0) : (d(), y("div", {
						key: 5,
						class: j(S(Z).ask)
					}, [
						D("div", { class: j(S(Z).ask_head) }, [
							D("h2", { class: j(S(Z).ask_title) }, w(Y.value.question.text), 3),
							D("span", { class: j(S(Z).badge) }, w(Y.value.question.multiple ? S(a)("opening.ask.multiple") : S(a)("opening.ask.single")), 3),
							D("span", { class: j(S(Z).spacer) }, null, 2),
							D("span", { class: j(S(Z).hint) }, w(Y.value.answers.length < J.value.max_rounds ? S(a)("opening.ask.round", {
								n: Y.value.answers.length + 1,
								max: J.value.max_rounds
							}) : S(a)("opening.ask.round_more", { n: Y.value.answers.length + 1 })), 3)
						], 2),
						Y.value.question.why === "" ? C("", !0) : (d(), y("p", {
							key: 0,
							class: j(S(Z).hint)
						}, w(Y.value.question.why), 3)),
						D("div", {
							class: j(S(Z).options),
							role: Y.value.question.multiple ? "group" : "radiogroup",
							"aria-label": Y.value.question.text
						}, [(d(!0), y(P, null, p(Y.value.question.options, (e) => (d(), y("button", {
							key: e.label,
							type: "button",
							class: j(["tc-interactive", S(Z).option]),
							role: Y.value.question.multiple ? "checkbox" : "radio",
							"aria-checked": Q.value.includes(e.label),
							disabled: q.value !== null,
							onClick: (t) => Ze(e.label)
						}, [
							D("span", {
								class: j(S(Z).option_mark),
								"data-shape": Y.value.question.multiple ? "box" : "radio"
							}, [Q.value.includes(e.label) ? (d(), T(B, {
								key: 0,
								icon: S(te),
								size: 13
							}, null, 8, ["icon"])) : C("", !0)], 10, Tt),
							D("span", { class: j(S(Z).option_label) }, w(e.label), 3),
							D("span", { class: j(S(Z).option_detail) }, w(e.detail), 3)
						], 10, wt))), 128))], 10, Ct),
						L(U, { label: S(a)("opening.ask.other_label") }, {
							default: M(({ fieldId: e }) => [f(D("input", {
								id: e,
								"onUpdate:modelValue": n[9] ||= (e) => Ge.value = e,
								class: j(S(Z).input),
								maxlength: "500",
								placeholder: S(a)("opening.ask.other_placeholder")
							}, null, 10, Et), [[b, Ge.value]])]),
							_: 1
						}, 8, ["label"]),
						D("div", { class: j(S(Z).row) }, [
							L(H, {
								icon: S(Se),
								label: S(a)("opening.ask.skip"),
								variant: "ghost",
								disabled: q.value !== null,
								onClick: n[10] ||= (t) => e.flow.skip(s.value)
							}, null, 8, [
								"icon",
								"label",
								"disabled"
							]),
							D("span", { class: j(S(Z).spacer) }, null, 2),
							L(H, {
								icon: S(be),
								label: S(a)("opening.ask.confirm"),
								variant: "primary",
								pending: q.value !== null,
								disabled: Q.value.length === 0 && Ge.value.trim() === "",
								onClick: Qe
							}, null, 8, [
								"icon",
								"label",
								"pending",
								"disabled"
							])
						], 2)
					], 2)),
					ke.value && J.value.output === "entries" ? (d(), y("div", {
						key: 7,
						class: j(S(Z).entries)
					}, [(d(!0), y(P, null, p(Y.value.entries, (t) => (d(), T(lt, {
						key: t.id,
						entry: t,
						editing: t.id === tt.value,
						rewriting: q.value?.kind === "rewrite" && q.value.entry_id === t.id,
						disabled: q.value !== null,
						onSave: n[12] ||= (e) => nt(s.value.current, e),
						onRemove: (e) => rt(s.value.current, t.id),
						onRewrite: (n) => e.flow.rewrite_entry(s.value, s.value.current, t),
						onCancel: (e) => ot(s.value.current, t.id)
					}, null, 8, [
						"entry",
						"editing",
						"rewriting",
						"disabled",
						"onRemove",
						"onRewrite",
						"onCancel"
					]))), 128))], 2)) : C("", !0),
					ke.value && J.value.output === "message" && Y.value.message !== null ? (d(), y(P, { key: 8 }, [st.value ? (d(), y("div", {
						key: 0,
						class: j(S(Z).editor)
					}, [
						L(U, { label: S(a)("opening.message.speaker_label") }, {
							default: M(({ fieldId: e }) => [f(D("input", {
								id: e,
								"onUpdate:modelValue": n[13] ||= (e) => ct.value = e,
								class: j(S(Z).input),
								maxlength: "80"
							}, null, 10, Dt), [[b, ct.value]])]),
							_: 1
						}, 8, ["label"]),
						L(U, { label: S(a)("opening.message.text_label") }, {
							default: M(({ fieldId: e }) => [f(D("textarea", {
								id: e,
								"onUpdate:modelValue": n[14] ||= (e) => ut.value = e,
								class: j(S(Z).text_area)
							}, null, 10, Ot), [[b, ut.value]])]),
							_: 1
						}, 8, ["label"]),
						D("div", { class: j(S(Z).row) }, [
							D("span", { class: j(S(Z).spacer) }, null, 2),
							L(H, {
								label: S(a)("common.actions.cancel"),
								variant: "ghost",
								onClick: n[15] ||= (e) => st.value = !1
							}, null, 8, ["label"]),
							L(H, {
								label: S(a)("common.actions.save"),
								variant: "primary",
								disabled: ct.value.trim() === "" || ut.value.trim() === "",
								onClick: ft
							}, null, 8, ["label", "disabled"])
						], 2)
					], 2)) : (d(), y("div", {
						key: 1,
						class: j(S(Z).bubble)
					}, [D("span", { class: j(S(Z).bubble_name) }, w(Y.value.message.speaker), 3), D("p", { class: j(S(Z).bubble_text) }, w(Y.value.message.text), 3)], 2)), st.value ? C("", !0) : (d(), y("div", {
						key: 2,
						class: j(S(Z).row)
					}, [L(H, {
						icon: S(se),
						label: S(a)("opening.message.edit"),
						disabled: q.value !== null,
						onClick: dt
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])], 2))], 64)) : C("", !0),
					ke.value && Ke.value ? (d(), y("div", {
						key: 9,
						class: j(S(Z).ask)
					}, [L(U, {
						label: S(a)("opening.steps.ask_more_label"),
						hint: S(a)("opening.steps.ask_more_hint")
					}, {
						default: M(({ fieldId: e, describedBy: t }) => [f(D("input", {
							id: e,
							ref_key: "more_input",
							ref: Je,
							"onUpdate:modelValue": n[16] ||= (e) => qe.value = e,
							class: j(S(Z).input),
							maxlength: "500",
							"aria-describedby": t,
							placeholder: S(a)("opening.steps.ask_more_placeholder"),
							onKeydown: ee(Xe, ["enter"])
						}, null, 42, kt), [[b, qe.value]])]),
						_: 1
					}, 8, ["label", "hint"]), D("div", { class: j(S(Z).row) }, [
						L(H, {
							label: S(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[17] ||= (e) => Ke.value = !1
						}, null, 8, ["label"]),
						D("span", { class: j(S(Z).spacer) }, null, 2),
						L(H, {
							icon: S(be),
							label: S(a)("opening.steps.ask_more_start"),
							variant: "primary",
							disabled: q.value !== null,
							onClick: Xe
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])
					], 2)], 2)) : C("", !0),
					ke.value ? (d(), y("div", {
						key: 10,
						class: j(S(Z).foot)
					}, [
						L(H, {
							icon: S(ye),
							label: S(a)("opening.steps.ask_more"),
							variant: "ghost",
							pending: q.value?.kind === "question",
							disabled: q.value !== null || Ke.value,
							onClick: Ye
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						]),
						J.value.output === "entries" ? (d(), T(H, {
							key: 0,
							icon: S(le),
							label: S(a)("opening.entry.add"),
							disabled: q.value !== null,
							onClick: n[18] ||= (e) => it(s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])) : C("", !0),
						D("span", { class: j(S(Z).spacer) }, null, 2),
						L(H, {
							icon: S(ce),
							label: S(a)("opening.steps.regenerate"),
							pending: q.value?.kind === "generate",
							disabled: q.value !== null,
							onClick: n[19] ||= (t) => e.flow.generate(s.value, s.value.current)
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						]),
						Oe.value ? C("", !0) : (d(), T(H, {
							key: 1,
							icon: S(be),
							label: S(a)("opening.steps.next"),
							variant: "primary",
							disabled: q.value !== null,
							onClick: n[20] ||= (t) => e.flow.next(s.value)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						]))
					], 2)) : C("", !0),
					Oe.value && ke.value ? (d(), y(P, { key: 11 }, [D("div", { class: j(S(Z).outputs) }, [
						D("div", { class: j(S(Z).output) }, [
							D("h3", { class: j(S(Z).output_title) }, [L(B, { icon: S(V) }, null, 8, ["icon"]), F(w(S(a)("opening.output.book_title")), 1)], 2),
							D("p", { class: j(S(Z).hint) }, w(S(a)("opening.output.book_hint", { n: Mt.value.length })), 3),
							D("div", { class: j(S(Z).row) }, [L(H, {
								label: S(a)("opening.output.book_action"),
								variant: "primary",
								disabled: e.host === null || Mt.value.length === 0 || q.value !== null,
								onClick: n[21] ||= (e) => Pt.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						D("div", { class: j(S(Z).output) }, [
							D("h3", { class: j(S(Z).output_title) }, [L(B, { icon: S(Te) }, null, 8, ["icon"]), F(w(S(a)("opening.output.message_title")), 1)], 2),
							D("p", { class: j(S(Z).hint) }, w(S(a)("opening.output.message_hint")), 3),
							D("div", { class: j(S(Z).row) }, [L(H, {
								label: S(a)("opening.output.message_action"),
								disabled: e.host === null || Nt.value === null || q.value !== null,
								onClick: n[22] ||= (e) => Lt.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						D("div", { class: j(S(Z).output) }, [
							D("h3", { class: j(S(Z).output_title) }, [L(B, { icon: S(Ce) }, null, 8, ["icon"]), F(w(S(a)("opening.output.markdown_title")), 1)], 2),
							D("p", { class: j(S(Z).hint) }, w(S(a)("opening.output.markdown_hint")), 3),
							D("div", { class: j(S(Z).row) }, [L(H, {
								icon: S(ie),
								label: S(a)("opening.output.copy"),
								onClick: Vt
							}, null, 8, ["icon", "label"]), L(H, {
								icon: S(ae),
								label: S(a)("opening.output.download"),
								variant: "ghost",
								onClick: Ht
							}, null, 8, ["icon", "label"])], 2)
						], 2)
					], 2), Ft.value === null ? C("", !0) : (d(), y("p", {
						key: 0,
						class: j(S(Z).hint),
						role: "status"
					}, w(Ft.value), 3))], 64)) : C("", !0)
				], 64)) : C("", !0) : (d(), y(P, { key: 4 }, [
					L(U, { label: S(a)("opening.draft.name_label") }, {
						default: M(({ fieldId: e }) => [D("input", {
							id: e,
							value: s.value.display_name,
							class: j(S(Z).input),
							maxlength: "60",
							onInput: n[3] ||= (e) => {
								I((t) => {
									t.display_name = e.target.value;
								}, !0);
							}
						}, null, 42, _t)]),
						_: 1
					}, 8, ["label"]),
					L(U, {
						label: S(a)("opening.draft.description_label"),
						hint: S(a)("opening.draft.description_hint")
					}, {
						default: M(({ fieldId: e, describedBy: t }) => [D("textarea", {
							id: e,
							value: s.value.description,
							class: j(S(Z).text_area),
							maxlength: jt,
							"aria-describedby": t,
							placeholder: S(a)("opening.draft.description_placeholder"),
							onInput: n[4] ||= (e) => {
								I((t) => {
									t.description = e.target.value;
								}, !0);
							}
						}, null, 42, vt), D("div", { class: j(S(Z).counter) }, w(s.value.description.length) + " / " + w(jt), 3)]),
						_: 1
					}, 8, ["label", "hint"]),
					D("div", { class: j(S(Z).grid3) }, [
						L(U, { label: S(a)("opening.settings.template_label") }, {
							default: M(({ fieldId: e }) => [L(re, {
								id: e,
								"model-value": z.value,
								options: R.value,
								placeholder: S(a)("opening.settings.template_label"),
								"onUpdate:modelValue": ne
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						L(U, { label: S(a)("opening.settings.connection_label") }, {
							default: M(({ fieldId: e }) => [L(re, {
								id: e,
								"model-value": pe.value,
								options: de.value,
								placeholder: S(a)("opening.settings.connection_label"),
								"onUpdate:modelValue": G
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						L(U, { label: S(a)("opening.settings.preset_label") }, {
							default: M(({ fieldId: e }) => [L(re, {
								id: e,
								"model-value": s.value.preset_name,
								options: me.value,
								placeholder: S(a)("opening.settings.preset_label"),
								"onUpdate:modelValue": ge
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"])
					], 2),
					L(U, {
						label: S(a)("opening.settings.worldbooks_label"),
						hint: S(a)("opening.settings.worldbooks_hint")
					}, {
						default: M(() => [e.lists.books.length > 0 ? (d(), y("div", {
							key: 0,
							class: j(S(Z).row)
						}, [(d(!0), y(P, null, p(e.lists.books, (e) => (d(), y("button", {
							key: e,
							type: "button",
							class: j(["tc-interactive", S(Z).chip_toggle]),
							"aria-pressed": s.value.worldbooks.includes(e),
							onClick: (t) => _e(e)
						}, [L(B, {
							icon: S(V),
							size: 14
						}, null, 8, ["icon"]), F(w(e), 1)], 10, yt))), 128))], 2)) : (d(), y("p", {
							key: 1,
							class: j(S(Z).hint)
						}, w(S(a)("opening.settings.no_worldbooks")), 3))]),
						_: 1
					}, 8, ["label", "hint"]),
					L(U, {
						label: S(a)("opening.settings.card_label"),
						hint: S(a)("opening.settings.card_hint")
					}, {
						default: M(() => [D("div", { class: j(S(Z).row) }, [L(oe, {
							"model-value": s.value.card !== null,
							label: s.value.card === null ? ve.value === null ? S(a)("opening.settings.card_none") : S(a)("opening.settings.card_use", { name: ve.value.name }) : S(a)("opening.settings.card_use", { name: s.value.card.name }),
							disabled: s.value.card === null && ve.value === null,
							"onUpdate:modelValue": xe
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						]), L(oe, {
							"model-value": s.value.use_greeting,
							label: S(a)("opening.settings.greeting_use"),
							disabled: s.value.card === null || s.value.card.first_message.trim() === "",
							"onUpdate:modelValue": we
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					D("div", { class: j(S(Z).row) }, [
						D("span", { class: j(S(Z).spacer) }, null, 2),
						D("span", { class: j(S(Z).hint) }, w(S(a)("opening.draft.step_count", { n: s.value.steps.length })), 3),
						L(H, {
							icon: S(W),
							label: S(a)("opening.draft.start"),
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
			], 2)], 2), s.value !== null && s.value.started ? (d(), y("aside", {
				key: 0,
				class: j(S(Z).known),
				"data-open": Ut.value ? "" : void 0,
				"aria-label": S(a)("opening.known.label")
			}, [
				D("div", { class: j(S(Z).known_block) }, [D("h3", { class: j(S(Z).known_title) }, w(S(a)("opening.known.settled")), 3), (d(!0), y(P, null, p(s.value.steps, (e, t) => (d(), y(P, { key: e.id }, [t !== s.value.current && (s.value.states[t]?.entries.length ?? 0) > 0 ? (d(), y("div", {
					key: 0,
					class: j(S(Z).known_line)
				}, [
					D("strong", null, w(e.name), 1),
					n[27] ||= D("br", null, null, -1),
					F(w((s.value.states[t]?.entries ?? []).map((e) => e.title).join(S(a)("opening.ask.joiner"))), 1)
				], 2)) : C("", !0)], 64))), 128))], 2),
				Y.value !== null && Y.value.answers.length > 0 ? (d(), y("div", {
					key: 0,
					class: j(S(Z).known_block)
				}, [D("h3", { class: j(S(Z).known_title) }, w(S(a)("opening.known.answered")), 3), (d(!0), y(P, null, p(Y.value.answers, (e, t) => (d(), y("div", {
					key: t,
					class: j(S(Z).known_line)
				}, w(et(e.selected, e.other)), 3))), 128))], 2)) : C("", !0),
				D("div", { class: j(S(Z).known_block) }, [D("h3", { class: j(S(Z).known_title) }, w(S(a)("opening.known.draft")), 3), D("div", { class: j(S(Z).known_line) }, [
					F(w(S(a)("opening.known.connection", { name: Ee(s.value) })), 1),
					n[29] ||= D("br", null, null, -1),
					F(w(S(a)("opening.known.preset", { name: s.value.preset_name === "in_use" ? S(a)("opening.settings.preset_in_use") : s.value.preset_name })), 1),
					n[30] ||= D("br", null, null, -1),
					s.value.card === null ? C("", !0) : (d(), y(P, { key: 0 }, [F(w(s.value.use_greeting ? S(a)("opening.known.card_greeting", { name: s.value.card.name }) : S(a)("opening.known.card", { name: s.value.card.name })), 1), n[28] ||= D("br", null, null, -1)], 64)),
					F(w(s.value.worldbooks.length === 0 ? S(a)("opening.known.no_books") : S(a)("opening.known.books", { names: s.value.worldbooks.join(S(a)("opening.ask.joiner")) })), 1)
				], 2)], 2)
			], 10, At)) : C("", !0)], 2),
			e.host !== null && s.value !== null ? (d(), T(pt, {
				key: 0,
				open: Pt.value,
				"onUpdate:open": n[23] ||= (e) => Pt.value = e,
				host: e.host,
				entries: Mt.value,
				"default-name": s.value.display_name,
				lists: e.lists,
				onWritten: It
			}, null, 8, [
				"open",
				"host",
				"entries",
				"default-name",
				"lists"
			])) : C("", !0),
			L(he, {
				open: Lt.value,
				"onUpdate:open": n[24] ||= (e) => Lt.value = e,
				title: S(a)("opening.output.append_title"),
				description: $.value === null ? S(a)("opening.output.append_no_chat") : S(a)("opening.output.append_description", {
					chat: $.value,
					speaker: Nt.value?.speaker ?? ""
				}),
				"confirm-label": S(a)("opening.output.append_confirm"),
				"cancel-label": S(a)("common.actions.cancel"),
				pending: Rt.value,
				destructive: !1,
				onConfirm: n[25] ||= (e) => $.value === null ? Lt.value = !1 : zt()
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			L(he, {
				open: g.value,
				"onUpdate:open": n[26] ||= (e) => g.value = e,
				title: S(a)("opening.draft.delete_title", { name: s.value?.display_name ?? "" }),
				description: S(a)("opening.draft.delete_description"),
				"confirm-label": S(a)("common.actions.delete"),
				"cancel-label": S(a)("common.actions.cancel"),
				pending: x.value,
				onConfirm: k
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
}), Nt = ["aria-label"], Pt = ["aria-current", "onClick"], Ft = ["id", "value"], It = [
	"value",
	"disabled",
	"aria-label",
	"onInput"
], Lt = [
	"value",
	"disabled",
	"aria-label",
	"placeholder",
	"onInput"
], Rt = /* @__PURE__ */ I({
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
		let t = e, n = _(e, "section"), { t: r } = O(), i = N(Pe), a = A(() => t.templates.find((e) => e.id === i.value) ?? t.templates[0] ?? null), o = A(() => a.value !== null && !a.value.builtin), s = A(() => [{
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
		let v = N(!1);
		async function b() {
			let e = a.value;
			e !== null && !e.builtin && (await t.store.remove(e.id), v.value = !1, i.value = Pe);
		}
		return (t, _) => (d(), y("div", { class: j(S(Z).layout) }, [
			D("aside", {
				class: j(S(Z).aside),
				"aria-label": S(r)("opening.templates.list_label")
			}, [
				L(H, {
					class: j(S(Z).aside_new),
					icon: S(le),
					label: S(r)("opening.templates.new"),
					onClick: _[0] ||= (e) => c(null)
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				D("div", { class: j(S(Z).aside_title) }, w(S(r)("opening.templates.list_title")), 3),
				(d(!0), y(P, null, p(e.templates, (e) => (d(), y("button", {
					key: e.id,
					type: "button",
					class: j(["tc-interactive", S(Z).item]),
					"aria-current": e.id === a.value?.id ? "true" : void 0,
					onClick: (t) => i.value = e.id
				}, [D("span", { class: j(S(Z).item_name) }, w(e.display_name), 3), D("span", { class: j(S(Z).item_meta) }, w(e.builtin ? S(r)("opening.templates.builtin_meta", { n: e.steps.length }) : S(r)("opening.templates.meta", { n: e.steps.length })), 3)], 10, Pt))), 128))
			], 10, Nt),
			D("div", { class: j(S(Z).work) }, [a.value === null ? C("", !0) : (d(), y("div", {
				key: 0,
				class: j(S(Z).work_inner)
			}, [
				D("div", { class: j(S(Z).topline) }, [
					L(Ue, {
						modelValue: n.value,
						"onUpdate:modelValue": _[1] ||= (e) => n.value = e
					}, null, 8, ["modelValue"]),
					D("span", { class: j(S(Z).spacer) }, null, 2),
					L(H, {
						icon: S(ie),
						label: S(r)("opening.templates.copy"),
						variant: "ghost",
						onClick: _[2] ||= (e) => c(a.value)
					}, null, 8, ["icon", "label"]),
					o.value ? (d(), T(K, {
						key: 0,
						icon: S(ue),
						label: S(r)("opening.templates.delete"),
						destructive: "",
						onClick: _[3] ||= (e) => v.value = !0
					}, null, 8, ["icon", "label"])) : C("", !0)
				], 2),
				e.saveError === null ? C("", !0) : (d(), y("p", {
					key: 0,
					class: j(S(Z).error),
					role: "alert"
				}, w(S(r)("opening.errors.save", { reason: e.saveError })), 3)),
				D("div", { class: j(S(Z).work_head) }, [o.value ? (d(), T(U, {
					key: 1,
					label: S(r)("opening.templates.name_label")
				}, {
					default: M(({ fieldId: e }) => [D("input", {
						id: e,
						value: a.value.display_name,
						class: j(S(Z).input),
						maxlength: "60",
						onInput: _[4] ||= (e) => {
							l((t) => {
								t.display_name = e.target.value;
							}, !0);
						}
					}, null, 42, Ft)]),
					_: 1
				}, 8, ["label"])) : (d(), y("h1", {
					key: 0,
					class: j(S(Z).work_title)
				}, w(a.value.display_name), 3)), D("p", { class: j(S(Z).work_description) }, w(o.value ? S(r)("opening.templates.hint") : S(r)("opening.templates.builtin_hint")), 3)], 2),
				(d(!0), y(P, null, p(a.value.steps, (e, t) => (d(), y("div", {
					key: e.id,
					class: j(S(Z).template_step)
				}, [
					D("span", { class: j(S(Z).template_number) }, w(t + 1), 3),
					D("div", { class: j(S(Z).template_fields) }, [D("input", {
						value: e.name,
						class: j(S(Z).input),
						maxlength: "40",
						disabled: !o.value,
						"aria-label": S(r)("opening.templates.step_name", { n: t + 1 }),
						onInput: (e) => {
							u(t, (t) => {
								t.name = e.target.value;
							}, !0);
						}
					}, null, 42, It), D("textarea", {
						value: e.instruction,
						class: j(S(Z).text_area_small),
						maxlength: "2000",
						disabled: !o.value,
						"aria-label": S(r)("opening.templates.step_instruction", { n: t + 1 }),
						placeholder: S(r)("opening.templates.instruction_placeholder"),
						onInput: (e) => {
							u(t, (t) => {
								t.instruction = e.target.value;
							}, !0);
						}
					}, null, 42, Lt)], 2),
					D("div", { class: j(S(Z).template_side) }, [
						D("span", { class: j(S(Z).hint) }, w(S(r)("opening.templates.rounds_label")), 3),
						L(me, {
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
						L(re, {
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
							class: j(S(Z).row)
						}, [
							L(K, {
								icon: S(xe),
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
							L(K, {
								icon: S(ve),
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
							L(K, {
								icon: S(ue),
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
					class: j(S(Z).row)
				}, [L(H, {
					icon: S(le),
					label: S(r)("opening.templates.add_step"),
					disabled: a.value.steps.length >= S(12),
					onClick: m
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				])], 2)) : C("", !0)
			], 2))], 2),
			L(he, {
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
}), $ = { type: "string" }, zt = {
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
}, Bt = {
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
}, Vt = {
	name: "tavern_canvas_opening_entries",
	value: {
		type: "object",
		properties: { entries: {
			type: "array",
			items: Bt
		} },
		required: ["entries"],
		additionalProperties: !1
	}
}, Ht = {
	name: "tavern_canvas_opening_entry",
	value: {
		type: "object",
		properties: { entry: Bt },
		required: ["entry"],
		additionalProperties: !1
	}
}, Ut = {
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
}, Wt = [
	"[Inkwell opening builder]",
	"You help the user build the opening of a roleplay story one step at a time: its world, characters, rules and first scene.",
	"Write every value in the language of the user's description.",
	"The user's own character is {{user}}. Refer to them only as {{user}} and never decide their appearance, personality or past.",
	"Keep everything consistent with what is settled below and with any world info you were given."
];
function Gt(e) {
	let t = [...e.selected, ...e.other.trim() === "" ? [] : [e.other.trim()]];
	return `- Q: ${e.question.text}\n  A: ${t.length === 0 ? "(left to you)" : t.join("; ")}`;
}
function Kt(e) {
	let t = e.constant ? "always active" : `keys: ${e.keys.join(", ")}`;
	return `- ${e.title} (${t}): ${e.content}`;
}
function qt(e, t) {
	let n = [];
	return e.steps.slice(0, t).forEach((t, r) => {
		let i = e.states[r];
		i === void 0 || i.status !== "done" && i.status !== "stale" || (n.push(`## ${t.name}`), n.push(...i.entries.map(Kt)), i.message !== null && n.push(`- Opening message by ${i.message.speaker}: ${i.message.text}`));
	}), n.length === 0 ? ["(nothing yet)"] : n;
}
function Jt(e) {
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
function Yt(e, t) {
	let n = e.steps[t], r = e.states[t];
	if (n === void 0 || r === void 0) throw RangeError(`The draft has no step ${String(t)}`);
	return [
		...Wt,
		"",
		"The user's description:",
		e.description.trim(),
		...Jt(e),
		"",
		"Settled so far:",
		...qt(e, t),
		"",
		`Current step: ${n.name}`,
		`What this step settles: ${n.instruction}`,
		"",
		"Answers given in this step:",
		...r.answers.length === 0 ? ["(none)"] : r.answers.map(Gt)
	];
}
function Xt(e) {
	let { card: t } = e;
	return [
		e.description,
		...t === null ? [] : [t.description, t.scenario],
		...t !== null && e.use_greeting ? [t.first_message] : [],
		...e.states.flatMap((e) => [...e.answers.flatMap((e) => [...e.selected, e.other]), ...e.entries.map((e) => `${e.title} ${e.content}`)])
	].join("\n");
}
function Zt(e, t, n, r) {
	for (let r of pe(e, t)) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let t = n.safeParse(e);
		if (t.success) return t.data;
	}
	throw new fe(`The reply contains no ${r} JSON object`, e);
}
var Qt = a((e) => typeof e == "object" && e && "options" in e && Array.isArray(e.options) ? {
	...e,
	options: e.options.slice(0, 5)
} : e, De), $t = t({
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: o(n()).transform((e) => [...new Set(e.map((e) => e.trim()).filter((e) => e !== ""))].slice(0, 12)),
	content: n().trim().min(1).max(8e3)
}), en = 30;
function tn(e) {
	return {
		id: crypto.randomUUID(),
		...e,
		keys: e.constant ? [] : e.keys
	};
}
function nn(e, t) {
	let n = e.slice(0, en).flatMap((e) => {
		let t = $t.safeParse(e);
		return t.success ? [tn(t.data)] : [];
	});
	if (n.length === 0) throw new fe("The reply contains no valid entry", t);
	return {
		entries: n,
		dropped: e.length - n.length
	};
}
function rn(e, t) {
	return e.filter((e) => e.name === t).flatMap((e) => {
		try {
			return [JSON.parse(e.arguments)];
		} catch {
			return [null];
		}
	});
}
var an = [
	"- One entry per distinct thing: the world overview, each faction, each place, each character, each group of rules.",
	"- title: '<kind>｜<name>', both in the language of the description, for example a faction, a place or a character.",
	"- constant: true only for what must always be in context: the world overview, hard rules of the world, narration and style requirements, content boundaries. Otherwise false.",
	"- keys: when constant is false, 1 to 5 words or names that appear in the story whenever this entry matters; [] when constant is true.",
	"- content: self-contained prose a storyteller can rely on, without referring to other entries by number."
], on = [
	"The opening message is the first message of the roleplay, sent by the character who meets {{user}} first.",
	"- speaker: that character's name.",
	"- text: the whole message, following the narration person, style and length settled above, ending at a moment {{user}} can answer. Do not speak or act for {{user}}."
], sn = ["Ask only about a choice that changes what this step writes and that the description and the answers leave open. Never ask about anything already settled.", "A question has the question text, a one-sentence reason it matters (why), and 3 or 4 options, each a short label with a one-sentence detail. Set multiple to true only when several options can hold at once. Do not add an 'other' option; the user can always type their own."], cn = "ask_question", ln = "add_entry", un = t({ entries: o(l()).min(1) });
function dn(e, t) {
	let n = [
		...Yt(e, t),
		"",
		"Now write this step's result as world book entries.",
		...an
	], r = (e) => nn(Zt(e, "entries", un, "entries").entries, e);
	return {
		user_input: [...n, "Reply with only a JSON object of the form {\"entries\": [...]}."].join("\n"),
		json_schema: Vt,
		parse: r,
		tools: {
			tools: [{
				name: ln,
				description: "Add one world book entry.",
				parameters: Bt
			}],
			choice: "required",
			user_input: [...n, `Call ${ln} once for each entry, all in this reply.`].join("\n"),
			parse: (e, t) => {
				let n = rn(e, ln);
				return n.length === 0 ? r(t) : nn(n, t);
			}
		}
	};
}
var fn = {
	name: "tavern_canvas_opening_question",
	value: {
		type: "object",
		properties: { question: zt },
		required: ["question"],
		additionalProperties: !1
	}
}, pn = t({ question: l() });
function mn(e, t) {
	let n = Qt.safeParse(e);
	if (!n.success) throw new fe("The reply contains no well-formed question", t);
	return n.data;
}
function hn(e, t, n) {
	let r = e.states[t], i = r?.message == null ? (r?.entries ?? []).map(Kt) : [`${r.message.speaker}: ${r.message.text}`], a = [
		...Yt(e, t),
		"",
		"This step's current result:",
		...i.length === 0 ? ["(none)"] : i,
		"",
		"The user has read this result and wants to be asked one more question before the step is written again.",
		n.trim() === "" ? "Ask about the open choice whose answer would change the result the most: something the description and the answers left to you, or a decision in the result the user may want to make differently." : `The user wants the question to be about: ${n.trim()}. Ask about the choice within that which would change the result the most.`,
		...sn
	], o = (e) => mn(Zt(e, "question", pn, "question").question, e);
	return {
		user_input: [...a, "Reply with only a JSON object of the form {\"question\": {...}}."].join("\n"),
		json_schema: fn,
		parse: o,
		tools: {
			tools: [{
				name: cn,
				description: "Ask the user one question with options.",
				parameters: zt
			}],
			choice: { name: cn },
			user_input: [...a, `Call ${cn} once.`].join("\n"),
			parse: (e, t) => {
				let [n] = rn(e, cn);
				return n === void 0 ? o(t) : mn(n, t);
			}
		}
	};
}
var gn = "step_ready", _n = {
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
}, vn = {
	name: "tavern_canvas_opening_next",
	value: {
		type: "object",
		properties: {
			aspects: _n,
			question: { anyOf: [zt, { type: "null" }] }
		},
		required: ["aspects", "question"],
		additionalProperties: !1
	}
}, yn = o(t({
	aspect: n().trim().min(1),
	settled: r()
})).min(1), bn = t({
	aspects: l(),
	question: l()
});
function xn(e, t, n) {
	let r = yn.safeParse(e);
	if (!r.success) throw new fe("The reply lists no aspects of the step", n);
	if (t != null) return mn(t, n);
	if (r.data.some((e) => !e.settled)) throw new fe("The reply leaves an aspect open without asking about it", n);
	return null;
}
function Sn(e, t, n) {
	let r = [
		...Yt(e, t),
		"",
		"Before this step is written, check what it still needs from the user.",
		"First list 2 to 6 aspects this step must settle, taken from what this step settles, each a few words in the language of the description.",
		"An aspect is settled only when the user's description, a settled earlier step or an answer in this step states it. An aspect you would have to choose yourself is not settled.",
		`If any aspect is not settled, ask one question about the most important one; at most ${String(n)} more questions may be asked in this step. Only when every aspect is settled, ask nothing.`,
		...sn
	], i = (e) => {
		let t = Zt(e, "aspects", bn, "question");
		return xn(t.aspects, t.question, e);
	};
	return {
		user_input: [...r, "Reply with only a JSON object of the form {\"aspects\": [{\"aspect\": \"...\", \"settled\": true or false}, ...], \"question\": {...} or null}."].join("\n"),
		json_schema: vn,
		parse: i,
		tools: {
			tools: [{
				name: cn,
				description: "List the step's aspects and ask the user about the most important open one.",
				parameters: {
					type: "object",
					properties: {
						aspects: _n,
						question: zt
					},
					required: ["aspects", "question"],
					additionalProperties: !1
				}
			}, {
				name: gn,
				description: "List the step's aspects when every one is settled.",
				parameters: {
					type: "object",
					properties: { aspects: _n },
					required: ["aspects"],
					additionalProperties: !1
				}
			}],
			choice: "required",
			user_input: [...r, `Call ${cn} once to ask, or ${gn} once when every aspect is settled.`].join("\n"),
			parse: (e, t) => {
				let [n] = rn(e, cn), [r] = rn(e, gn), a = bn.partial().safeParse(n ?? r);
				return a.success ? xn(a.data.aspects, n === void 0 ? null : a.data.question, t) : i(t);
			}
		}
	};
}
function Cn(e, n, r) {
	return {
		user_input: [
			...Yt(e, n),
			"",
			"Entries this step already has:",
			...(e.states[n]?.entries ?? []).map(Kt),
			"",
			`Rewrite only this entry, keeping its subject and fitting everything above: ${Kt(r)}`,
			...an.slice(1),
			"Reply with only a JSON object of the form {\"entry\": {...}}."
		].join("\n"),
		json_schema: Ht,
		parse: (e) => ({
			...tn(Zt(e, "entry", t({ entry: $t }), "entry").entry),
			id: r.id
		})
	};
}
function wn(e, t) {
	return {
		user_input: [
			...Yt(e, t),
			"",
			"Now write the opening message.",
			...on,
			"Reply with only a JSON object of the form {\"speaker\": \"...\", \"text\": \"...\"}."
		].join("\n"),
		json_schema: Ut,
		parse: (e) => Zt(e, "text", Oe, "opening message")
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_flow.ts
function Tn(e, t) {
	let n = k(/* @__PURE__ */ new Map()), r = k(/* @__PURE__ */ new Map()), i = k(/* @__PURE__ */ new Map());
	function a(e, n, r) {
		i.set(e.id, r.kind === "entries" ? r.dropped : 0), t.edit(e, (e) => {
			let t = e.states[n];
			t !== void 0 && (t.question = null, t.status = "done", r.kind === "entries" ? t.entries = r.entries : t.message = r.message), Re(e, n);
		});
	}
	function o(e) {
		return {
			connection: e.connection,
			preset_name: e.preset_name,
			worldbooks: e.worldbooks,
			text: Xt(e)
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
				message: await e.request(wn(t, n), o(t))
			}) : a(t, n, {
				kind: "entries",
				...await e.request(dn(t, n), o(t))
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
				let a = await e.request(Sn(n, r, l), o(n));
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
			let a = await e.request(hn(n, r, i), o(n));
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
				t !== void 0 && i !== void 0 && (t.answers = t.answers.slice(0, r), t.question = i.question, t.status = "asking", e.current = n, Re(e, n));
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
				let a = await e.request(Cn(n, r, i), o(n));
				t.edit(n, (e) => {
					let t = e.states[r]?.entries, n = t?.findIndex((e) => e.id === i.id) ?? -1;
					t !== void 0 && n >= 0 && (t[n] = a), Re(e, r);
				});
			});
		}
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_messages.ts
var En = {
	en: async () => (await import("./opening_en-vZJQa2CG.js")).en_messages,
	"zh-CN": async () => (await import("./opening_zh_cn-B5QVLSaV.js")).zh_cn_messages
};
function Dn() {
	let e = O({ useScope: "global" }), t = N(!1);
	async function n(n) {
		for (let t of /* @__PURE__ */ new Set(["en", n])) {
			let n = En[t];
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
var On = 600;
function kn(e) {
	if (e.kind === "draft") {
		let { id: t, ...n } = e;
		return Me.parse(Ve(n));
	}
	let { id: t, builtin: n, ...r } = e;
	return Ne.parse(Ve(r));
}
function An(e) {
	let t = k(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	function i(e) {
		return t.get(e.id) ?? (e.payload.kind === "template" ? X(e) : Be(e));
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
				payload: kn(n)
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
			}, On));
		},
		async remove(i) {
			let a = r.get(i);
			a !== void 0 && (clearTimeout(a), r.delete(i)), await n.get(i), t.delete(i), n.delete(i), await e.remove(i);
		}
	};
}
//#endregion
//#region src/ui/views/opening/OpeningView.vue
var jn = /* @__PURE__ */ I({
	__name: "OpeningView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = O(), r = g(R, null), i = Dn(), a = N(null);
		function o(e) {
			return e instanceof Error ? e.message : String(e);
		}
		let s = An({
			records: () => t.state.assets.records.opening,
			save: (e) => t.controller.save_asset("opening", e),
			remove: (e) => t.controller.remove_asset("opening", e),
			on_save_error: (e) => {
				a.value = o(e);
			}
		}), c = r === null ? null : Tn(r, s), l = N("build"), u = x(null), f = N(null), p = N({
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
		let v = A(() => i.value ? [Ie(_, n("opening.builtin.name")), ...s.templates.value] : []);
		return (e, t) => S(i) ? S(r) === null || S(c) === null ? (d(), T(ne, {
			key: 1,
			status: "empty",
			"empty-title": S(n)("opening.unavailable_title"),
			"empty-message": S(n)("opening.unavailable_message")
		}, null, 8, ["empty-title", "empty-message"])) : (d(), y(P, { key: 2 }, [l.value === "build" ? (d(), T(Mt, {
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
		])) : l.value === "books" ? (d(), T(Qe, {
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
		])) : (d(), T(Rt, {
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
		]))], 64)) : (d(), T(ne, {
			key: 0,
			status: "loading"
		}));
	}
});
//#endregion
export { jn as default };
