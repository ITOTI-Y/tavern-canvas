import { c as e, d as t, g as n, i as r, m as i, o as a, p as o, r as s, t as c, u as l, y as u } from "./schemas-BjkyCQYG.js";
import { D as d, F as f, J as p, L as m, M as h, O as g, T as _, U as v, W as y, _ as b, a as x, at as S, dt as C, g as w, gt as T, h as E, k as D, m as O, n as ee, nt as k, p as A, pt as j, q as M, rt as N, s as te, u as P, v as F, x as I, y as L } from "./vue-i18n-XoxYzLIP.js";
import { n as R } from "./portal_keys-CIBE-_PC.js";
import { t as ne } from "./opening_port-CFwXS5qA.js";
import { n as z, t as re } from "./AppIcon-DD754F_c.js";
import { t as B } from "./book-open-BFHVGETM.js";
import { r as ie } from "./components_styles-COPsMRS_.js";
import { t as ae } from "./AppSelect-Dk1xcksi.js";
import { n as oe, t as se } from "./download-Dg_p_zFU.js";
import { t as ce } from "./AppCheckbox-Doh1RgAx.js";
import { n as le, t as V } from "./refresh-cw-BPQB33rx.js";
import { n as ue, t as H } from "./FieldGroup-B_z8muEe.js";
import { t as de } from "./sparkles-DIwEk888.js";
import { t as fe } from "./trash-2-Cl_9_CUX.js";
import { t as pe } from "./x-CyHrRl6n.js";
import { n as me } from "./deferred_stylesheets-DhfsdqPo.js";
import { n as U, t as he } from "./analysis_error-DyAzoHE3.js";
import { t as ge } from "./model_json-B2EVqBvs.js";
import { n as _e, t as ve } from "./NumberStepper-CaTG-ewu.js";
import { t as W } from "./IconButton-B3DZhN69.js";
import { t as ye } from "./ConfirmDialog-YmdHM2H5.js";
import { t as be } from "./AppSwitch-DLRr0ph6.js";
import { n as G, t as K } from "./StateSurface-D7OPOCWT.js";
import { t as xe } from "./AppDialog-hFVVBnfV.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/arrow-down.js
var q = z("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]), Se = z("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), Ce = z("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), we = z("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]), Te = z("chevrons-right", [["path", {
	d: "m6 17 5-5-5-5",
	key: "xnjwq"
}], ["path", {
	d: "m13 17 5-5-5-5",
	key: "17xmmf"
}]]), Ee = z("file-text", [
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
]), J = z("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]), De = z("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]), Oe = z("square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]), ke = t({
	id: n().min(1),
	name: n().max(40),
	instruction: n().max(2e3),
	max_rounds: l().int().min(0).max(3),
	output: c(["entries", "message"])
}), Ae = t({
	label: n().trim().min(1).max(80),
	detail: n().max(240)
}), Y = t({
	text: n().trim().min(1).max(240),
	why: n().max(240),
	multiple: r(),
	options: s(Ae).min(2).max(5)
}), je = t({
	question: Y,
	selected: s(n()),
	other: n()
}), Me = t({
	id: n().min(1),
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: s(n().trim().min(1).max(80)).max(12),
	content: n().max(8e3)
}), Ne = t({
	speaker: n().trim().min(1).max(80),
	text: n().min(1).max(2e4)
}), Pe = t({
	status: c([
		"pending",
		"asking",
		"done",
		"stale"
	]),
	answers: s(je),
	question: Y.nullable(),
	entries: s(Me),
	message: Ne.nullable()
}), Fe = a("kind", [
	t({ kind: e("analysis") }),
	t({ kind: e("current") }),
	t({
		kind: e("proxy_preset"),
		proxy_preset: n().min(1)
	})
]), Ie = t({
	entry_id: n().min(1),
	uid: l().int(),
	name: n(),
	constant: r(),
	keys: s(n()),
	content: n()
}), Le = t({
	name: n(),
	description: n(),
	personality: n(),
	scenario: n(),
	first_message: n()
}), Re = t({
	kind: e("draft"),
	display_name: n(),
	created_at: n(),
	description: n().max(4e3),
	template_name: n(),
	steps: s(ke).min(1).max(12),
	states: s(Pe),
	current: l().int().min(0),
	started: r(),
	connection: Fe,
	preset_name: n().min(1),
	worldbooks: s(n()).max(20),
	card: Le.nullable().default(null),
	use_greeting: r().default(!1),
	written: i(n(), s(Ie)).default({})
}), ze = t({
	kind: e("template"),
	display_name: n().max(60),
	created_at: n(),
	steps: s(ke).min(1).max(12)
}), Be = "builtin-default", Ve = [
	"genre",
	"world",
	"cast",
	"rules",
	"opening"
];
function He(e, t) {
	let n = {
		genre: 2,
		world: 3,
		cast: 3,
		rules: 2,
		opening: 1
	};
	return {
		id: Be,
		builtin: !0,
		kind: "template",
		display_name: t,
		created_at: "1970-01-01T00:00:00.000Z",
		steps: Ve.map((t) => ({
			id: t,
			...e(t),
			max_rounds: n[t],
			output: t === "opening" ? "message" : "entries"
		}))
	};
}
function Ue() {
	return {
		status: "pending",
		answers: [],
		question: null,
		entries: [],
		message: null
	};
}
function We(e, t) {
	e.states.forEach((e, n) => {
		n > t && (e.status === "done" || e.status === "stale") && (e.status = "stale");
	});
}
function Ge(e, t) {
	e.description = t, We(e, -1);
}
function X(e) {
	let t = Re.safeParse(e.payload);
	if (!t.success) return null;
	let n = t.data;
	for (; n.states.length < n.steps.length;) n.states.push(Ue());
	return n.states.length = n.steps.length, {
		...n,
		current: Math.min(n.current, n.steps.length - 1),
		id: e.id
	};
}
function Ke(e) {
	let t = ze.safeParse(e.payload);
	return t.success ? {
		...t.data,
		id: e.id,
		builtin: !1
	} : null;
}
function qe(e) {
	return JSON.parse(JSON.stringify(e));
}
//#endregion
//#region src/ui/components/use_deferred_deletion.ts
function Je() {
	let e = _(R);
	if (e === void 0) throw Error("Deferred deletion needs the studio shell, which provides it");
	return e;
}
var Ye = {
	layout: "_layout_1kbcg_5",
	aside: "_aside_1kbcg_11",
	aside_new: "_aside_new_1kbcg_20",
	aside_title: "_aside_title_1kbcg_24",
	item: "_item_1kbcg_30",
	item_name: "_item_name_1kbcg_48",
	item_meta: "_item_meta_1kbcg_56",
	dots: "_dots_1kbcg_61",
	dot: "_dot_1kbcg_61",
	columns: "_columns_1kbcg_86",
	work: "_work_1kbcg_92",
	work_inner: "_work_inner_1kbcg_97",
	topline: "_topline_1kbcg_107",
	spacer: "_spacer_1kbcg_114",
	compact: "_compact_1kbcg_118",
	work_head: "_work_head_1kbcg_123",
	work_title: "_work_title_1kbcg_128",
	work_description: "_work_description_1kbcg_137",
	hint: "_hint_1kbcg_138",
	error: "_error_1kbcg_145",
	row: "_row_1kbcg_153",
	text_area: "_text_area_1kbcg_160 tc-field tc-field-multiline",
	text_area_small: "_text_area_small_1kbcg_165 tc-field tc-field-multiline",
	input: "_input_1kbcg_170 tc-field",
	counter: "_counter_1kbcg_174",
	grid3: "_grid3_1kbcg_180",
	chip_toggle: "_chip_toggle_1kbcg_186",
	steps: "_steps_1kbcg_206",
	step: "_step_1kbcg_206",
	step_number: "_step_number_1kbcg_230",
	step_tag: "_step_tag_1kbcg_269",
	banner: "_banner_1kbcg_275",
	answered: "_answered_1kbcg_293",
	answered_question: "_answered_question_1kbcg_305",
	answered_answer: "_answered_answer_1kbcg_309",
	ask: "_ask_1kbcg_319",
	ask_head: "_ask_head_1kbcg_330",
	ask_title: "_ask_title_1kbcg_337",
	badge: "_badge_1kbcg_344",
	options: "_options_1kbcg_355",
	option: "_option_1kbcg_355",
	option_mark: "_option_mark_1kbcg_378",
	option_label: "_option_label_1kbcg_400",
	option_detail: "_option_detail_1kbcg_404",
	entries: "_entries_1kbcg_411",
	entry: "_entry_1kbcg_416",
	entry_head: "_entry_head_1kbcg_425",
	entry_title: "_entry_title_1kbcg_432",
	entry_content: "_entry_content_1kbcg_438",
	pill: "_pill_1kbcg_446",
	keys: "_keys_1kbcg_490",
	key: "_key_1kbcg_490",
	editor: "_editor_1kbcg_508",
	foot: "_foot_1kbcg_517",
	bubble: "_bubble_1kbcg_529",
	bubble_name: "_bubble_name_1kbcg_538",
	bubble_text: "_bubble_text_1kbcg_543",
	outputs: "_outputs_1kbcg_550",
	output: "_output_1kbcg_550",
	output_title: "_output_title_1kbcg_566",
	known: "_known_1kbcg_575",
	known_block: "_known_block_1kbcg_583",
	known_title: "_known_title_1kbcg_588",
	known_line: "_known_line_1kbcg_594",
	known_toggle: "_known_toggle_1kbcg_606",
	table: "_table_1kbcg_611",
	table_row: "_table_row_1kbcg_616",
	table_name: "_table_name_1kbcg_632",
	preview: "_preview_1kbcg_639",
	order: "_order_1kbcg_648",
	write_list: "_write_list_1kbcg_656",
	write_row: "_write_row_1kbcg_663",
	diff: "_diff_1kbcg_679",
	template_step: "_template_step_1kbcg_696",
	template_number: "_template_number_1kbcg_707",
	template_fields: "_template_fields_1kbcg_719",
	template_side: "_template_side_1kbcg_725",
	step_label: "_step_label_1kbcg_784"
};
//#endregion
//#region src/ui/views/opening/opening_styles.ts
me("opening", "._layout_1kbcg_5{grid-template-columns:248px minmax(0,1fr);min-height:100%;display:grid}._aside_1kbcg_11{align-self:start;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-3) var(--tc-space-4);flex-direction:column;display:flex;overflow:auto}._aside_new_1kbcg_20{margin:0 var(--tc-space-1) var(--tc-space-2)}._aside_title_1kbcg_24{padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._item_1kbcg_30{color:var(--tc-text);text-align:start;border-radius:14px;gap:6px;padding:10px 12px;display:grid}._item_1kbcg_30:hover{background-color:var(--tc-surface-raised)}._item_1kbcg_30[aria-current=true]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border)}._item_name_1kbcg_48{font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._item_meta_1kbcg_56{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._dots_1kbcg_61{gap:3px;display:flex}._dot_1kbcg_61{background-color:var(--tc-divider);border-radius:999px;flex:1;height:4px}._dot_1kbcg_61[data-state=done]{background-color:var(--tc-accent)}._dot_1kbcg_61[data-state=asking]{background-color:var(--tc-marker)}._dot_1kbcg_61[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border)}._columns_1kbcg_86{grid-template-columns:minmax(0,1fr) 280px;min-width:0;display:grid}._work_1kbcg_92{min-width:0;padding:var(--tc-space-2) var(--tc-panel-padding) var(--tc-panel-padding)}._work_inner_1kbcg_97{gap:var(--tc-form-row-gap);max-width:760px;display:grid}._work_inner_1kbcg_97[data-wide]{max-width:none}._topline_1kbcg_107{gap:var(--tc-space-2) var(--tc-space-3);flex-wrap:wrap;align-items:center;display:flex}._spacer_1kbcg_114{flex:1}._compact_1kbcg_118[data-layout]{justify-self:start;width:auto}._work_head_1kbcg_123{gap:var(--tc-space-1);display:grid}._work_title_1kbcg_128{color:var(--tc-text);font-size:var(--tc-font-size-xl);font-weight:700;line-height:var(--tc-line-height-xl);overflow-wrap:anywhere;margin:0}._work_description_1kbcg_137,._hint_1kbcg_138{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);margin:0}._error_1kbcg_145{color:var(--tc-error);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere;margin:0}._row_1kbcg_153{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._text_area_1kbcg_160{min-height:168px}._text_area_small_1kbcg_165{min-height:96px}._counter_1kbcg_174{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);text-align:end}._grid3_1kbcg_180{gap:var(--tc-space-4);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._chip_toggle_1kbcg_186{align-items:center;gap:var(--tc-space-1-5);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-chip);background-color:var(--tc-surface);height:32px;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);padding:0 14px;display:inline-flex}._chip_toggle_1kbcg_186[aria-pressed=true]{border-color:var(--tc-marker);background-color:var(--tc-marker);color:var(--tc-on-marker)}._steps_1kbcg_206{gap:var(--tc-space-1);flex-wrap:wrap;display:flex}._step_1kbcg_206{align-items:center;gap:var(--tc-space-2);background-color:var(--tc-surface);height:34px;box-shadow:0 0 0 1px var(--tc-divider);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);white-space:nowrap;border-radius:999px;padding:0 14px 0 6px;display:inline-flex}._step_1kbcg_206:disabled{cursor:default}._step_number_1kbcg_230{background-color:var(--tc-chip-bg);width:22px;height:22px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;display:grid}._step_1kbcg_206[data-state=done] ._step_number_1kbcg_230{background-color:var(--tc-accent);color:var(--tc-on-accent)}._step_1kbcg_206[aria-current=step]{background-color:var(--tc-marker);box-shadow:none;color:var(--tc-on-marker);font-weight:var(--tc-font-weight-semibold)}._step_1kbcg_206[aria-current=step] ._step_number_1kbcg_230{background-color:var(--tc-on-marker);color:var(--tc-marker)}._step_1kbcg_206[data-state=stale]{background-color:var(--tc-accent-soft);box-shadow:0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._step_1kbcg_206[data-state=stale] ._step_number_1kbcg_230{border:1.5px dashed var(--tc-accent-border);background-color:#0000}._step_tag_1kbcg_269{color:var(--tc-text-muted);font-size:11px;font-weight:400}._banner_1kbcg_275{gap:var(--tc-space-2) var(--tc-space-3);padding:var(--tc-space-3) 14px;background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);border-radius:14px;flex-wrap:wrap;align-items:center;display:flex}._banner_1kbcg_275>span{flex:260px}._answered_1kbcg_293{gap:2px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:10px 14px;display:grid}._answered_question_1kbcg_305{color:var(--tc-text-muted)}._answered_answer_1kbcg_309{font-weight:var(--tc-font-weight-semibold);grid-column:1}._answered_1kbcg_293>:last-child{grid-area:1/2/3}._ask_1kbcg_319{background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border), 0 8px 24px var(--tc-shadow);border-radius:18px;gap:14px;padding:18px;display:grid}._ask_head_1kbcg_330{gap:var(--tc-space-2) 10px;flex-wrap:wrap;align-items:baseline;display:flex}._ask_title_1kbcg_337{font-size:var(--tc-font-size-lg);font-weight:700;line-height:var(--tc-line-height-lg);margin:0}._badge_1kbcg_344{background-color:var(--tc-chip-bg);height:22px;color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);border-radius:999px;align-items:center;padding:0 8px;display:inline-flex}._options_1kbcg_355{gap:var(--tc-space-2);grid-template-columns:repeat(auto-fill,minmax(240px,1fr));display:grid}._option_1kbcg_355{gap:var(--tc-space-1) 10px;padding:var(--tc-space-3) 14px;border:1px solid var(--tc-divider);background-color:var(--tc-canvas);color:var(--tc-text);text-align:start;border-radius:14px;grid-template-columns:auto minmax(0,1fr);display:grid}._option_1kbcg_355[aria-checked=true]{border-color:var(--tc-accent-border);background-color:var(--tc-accent-soft)}._option_mark_1kbcg_378{border:1.5px solid var(--tc-border-field);background-color:var(--tc-field-bg);width:18px;height:18px;color:var(--tc-on-accent);border-radius:6px;grid-row:1/3;place-items:center;margin-top:2px;display:inline-grid}._option_mark_1kbcg_378[data-shape=radio]{border-radius:999px}._option_1kbcg_355[aria-checked=true] ._option_mark_1kbcg_378{border-color:var(--tc-accent);background-color:var(--tc-accent)}._option_label_1kbcg_400{font-weight:var(--tc-font-weight-semibold)}._option_detail_1kbcg_404{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);line-height:18px}._entries_1kbcg_411{gap:10px;display:grid}._entry_1kbcg_416{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);display:grid}._entry_head_1kbcg_425{gap:var(--tc-space-2);flex-wrap:wrap;align-items:center;display:flex}._entry_title_1kbcg_432{overflow-wrap:anywhere;font-size:15px;font-weight:650}._entry_content_1kbcg_438{font-size:var(--tc-font-size-sm);white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:21px}._pill_1kbcg_446{background-color:var(--tc-chip-bg);height:20px;color:var(--tc-text-muted);white-space:nowrap;border-radius:999px;align-items:center;padding:0 8px;font-size:11px;font-weight:600;display:inline-flex}._pill_1kbcg_446[data-tone=constant]{background-color:var(--tc-accent);color:var(--tc-on-accent)}._pill_1kbcg_446[data-tone=new]{background-color:var(--tc-marker);color:var(--tc-on-marker)}._pill_1kbcg_446[data-tone=changed],._pill_1kbcg_446[data-tone=modified]{background-color:var(--tc-accent-soft);box-shadow:inset 0 0 0 1px var(--tc-accent-border);color:var(--tc-text)}._pill_1kbcg_446[data-tone=book_edited],._pill_1kbcg_446[data-tone=conflict],._pill_1kbcg_446[data-tone=book_deleted]{background-color:var(--tc-surface);box-shadow:inset 0 0 0 1px var(--tc-border-strong);color:var(--tc-text)}._pill_1kbcg_446[data-tone=removed]{background-color:var(--tc-surface);box-shadow:inset 0 0 0 1px var(--tc-error);color:var(--tc-error)}._keys_1kbcg_490{gap:var(--tc-space-1);color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);flex-wrap:wrap;align-items:center;display:flex}._key_1kbcg_490{background-color:var(--tc-chip-bg);border-radius:999px;align-items:center;height:22px;padding:0 8px;display:inline-flex}._editor_1kbcg_508{padding:var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1.5px var(--tc-accent-border);gap:14px;display:grid}._foot_1kbcg_517{gap:var(--tc-space-2);padding:var(--tc-space-3) 0;background-color:var(--tc-canvas);flex-wrap:wrap;align-items:center;display:flex;position:sticky;bottom:0}._bubble_1kbcg_529{gap:var(--tc-space-2);padding:var(--tc-space-4);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:18px;display:grid}._bubble_name_1kbcg_538{font-size:var(--tc-font-size-sm);font-weight:var(--tc-font-weight-semibold)}._bubble_text_1kbcg_543{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;line-height:23px}._outputs_1kbcg_550{gap:var(--tc-space-3);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}._output_1kbcg_550{gap:var(--tc-space-2);padding:14px var(--tc-space-4);border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);align-content:start;display:grid}._output_title_1kbcg_566{gap:var(--tc-space-2);font-size:var(--tc-font-size-md);align-items:center;margin:0;display:flex}._known_1kbcg_575{gap:var(--tc-space-4);padding:var(--tc-space-3) var(--tc-space-4) var(--tc-space-4);border-left:1px solid var(--tc-divider);align-content:start;display:grid}._known_block_1kbcg_583{gap:6px;display:grid}._known_title_1kbcg_588{font-size:var(--tc-font-size-sm);margin:0;font-weight:700}._known_line_1kbcg_594{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);overflow-wrap:anywhere}._known_line_1kbcg_594 strong{color:var(--tc-text);font-weight:var(--tc-font-weight-semibold)}._known_toggle_1kbcg_606{display:none}._table_1kbcg_611{gap:6px;display:grid}._table_row_1kbcg_616{gap:var(--tc-space-3);padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:14px;grid-template-columns:40px minmax(0,200px) minmax(0,1fr) 48px auto;align-items:center;display:grid}._table_row_1kbcg_616[data-off]{opacity:.55}._table_name_1kbcg_632{gap:var(--tc-space-1);font-weight:var(--tc-font-weight-semibold);overflow-wrap:anywhere;display:grid}._preview_1kbcg_639{color:var(--tc-text-muted);-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:19px;display:-webkit-box;overflow:hidden}._order_1kbcg_648{color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);text-align:center}._write_list_1kbcg_656{gap:6px;max-height:46vh;display:grid;overflow:auto}._write_row_1kbcg_663{padding:10px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);border-radius:12px;grid-template-columns:auto auto minmax(0,1fr);align-items:start;gap:10px;display:grid}._write_row_1kbcg_663[data-status=same]{opacity:.6}._diff_1kbcg_679{font-size:var(--tc-font-size-xs);gap:2px;line-height:18px;display:grid}._diff_1kbcg_679 del{color:var(--tc-text-muted)}._diff_1kbcg_679 ins{background-color:var(--tc-accent-soft);text-decoration:none}._template_step_1kbcg_696{gap:10px var(--tc-space-3);padding:var(--tc-space-3) 14px;border-radius:var(--tc-radius-card);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);grid-template-columns:auto minmax(0,1fr) auto;align-items:start;display:grid}._template_number_1kbcg_707{background-color:var(--tc-chip-bg);width:24px;height:24px;font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);border-radius:999px;place-items:center;margin-top:6px;display:grid}._template_fields_1kbcg_719{gap:var(--tc-space-2);min-width:0;display:grid}._template_side_1kbcg_725{gap:var(--tc-space-2);justify-items:end;display:grid}@container studio-workspace (width<=640px){._layout_1kbcg_5,._columns_1kbcg_86{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr)}._aside_1kbcg_11{padding:var(--tc-space-1) var(--tc-space-4) var(--tc-space-2);scrollbar-width:none;flex-direction:row;overflow-x:auto}._aside_new_1kbcg_20{flex:none;margin:0}._aside_title_1kbcg_24,._item_meta_1kbcg_56,._dots_1kbcg_61{display:none}._item_1kbcg_30{max-width:200px;padding:6px var(--tc-space-3);background-color:var(--tc-surface);box-shadow:0 0 0 1px var(--tc-divider);border-radius:999px;flex:none}._work_1kbcg_92{padding:var(--tc-space-2) var(--tc-space-4) var(--tc-space-4)}._work_title_1kbcg_128{font-size:22px;line-height:28px}._steps_1kbcg_206{scrollbar-width:none;flex-wrap:nowrap;overflow-x:auto}._step_1kbcg_206{flex:none}._step_1kbcg_206:not([aria-current=step]) ._step_label_1kbcg_784{display:none}._known_1kbcg_575{border-left:0;display:none}._known_1kbcg_575[data-open]{padding:0 var(--tc-space-4) var(--tc-space-4);display:grid}._known_toggle_1kbcg_606{display:inline-flex}._table_row_1kbcg_616{grid-template-columns:40px minmax(0,1fr) auto}._preview_1kbcg_639,._order_1kbcg_648{display:none}._template_step_1kbcg_696{grid-template-columns:minmax(0,1fr)}._template_number_1kbcg_707{display:none}._template_side_1kbcg_725{justify-items:start}}");
var Z = Ye, Xe = /* @__PURE__ */ I({
	__name: "OpeningSectionSwitch",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = v(e, "modelValue"), { t: n } = ee(), r = A(() => [
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
		return (e, a) => (f(), E(_e, {
			"model-value": t.value,
			class: j(C(Z).compact),
			options: r.value,
			label: C(n)("opening.sections.label"),
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
function Ze(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region src/ui/views/opening/OpeningBooks.vue?vue&type=script&setup=true&lang.ts
var Qe = ["aria-label"], $e = ["aria-current", "onClick"], et = ["placeholder", "aria-label"], tt = ["id"], nt = ["id", "aria-describedby"], rt = ["id"], it = ["data-off"], at = ["aria-label"], ot = /* @__PURE__ */ I({
	__name: "OpeningBooks",
	props: /*@__PURE__*/ d({
		host: {},
		hostError: {},
		lists: {},
		noRecursionBooks: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: /*@__PURE__*/ d(["refresh-lists", "set-no-recursion"], ["update:section"]),
	setup(e, { emit: t }) {
		let n = e, r = v(e, "section"), i = t, { t: a } = ee(), o = Je(), s = N(/* @__PURE__ */ new Set()), c = N(/* @__PURE__ */ new Set()), l = (e, t) => `${e}\u0000${String(t)}`, u = A(() => n.lists.books.filter((e) => !s.value.has(e))), d = N(n.lists.chat_book ?? n.lists.books[0] ?? null), h = N([]), _ = N(!1), S = N(!1), D = N(null);
		async function k() {
			if (h.value = [], n.host !== null && d.value !== null) {
				_.value = !0, D.value = null;
				try {
					let e = d.value;
					h.value = (await n.host.read_entries(e)).filter((t) => !c.value.has(l(e, t.uid)));
				} catch (e) {
					D.value = a("opening.errors.failed", { reason: Ze(e) });
				} finally {
					_.value = !1;
				}
			}
		}
		y(d, () => void k(), { immediate: !0 }), y(u, (e) => {
			(d.value === null || !e.includes(d.value)) && (d.value = n.lists.chat_book ?? e[0] ?? null);
		});
		async function te(e) {
			if (n.host === null) return !1;
			S.value = !0, D.value = null;
			try {
				return await e(n.host), i("refresh-lists"), await k(), !0;
			} catch (e) {
				return D.value = a("opening.errors.failed", { reason: Ze(e) }), !1;
			} finally {
				S.value = !1;
			}
		}
		let I = N(null), R = N(""), ne = A(() => R.value.trim() !== d.value && n.lists.books.includes(R.value.trim()));
		function z(e) {
			R.value = e === "rename" ? d.value ?? "" : "", I.value = e;
		}
		async function re() {
			let e = R.value.trim(), t = I.value, n = d.value;
			e === "" || ne.value || t === null || await te((r) => t === "create" || n === null ? r.create_worldbook(e) : r.rename_worldbook(n, e)) && (I.value = null, d.value = e);
		}
		let B = N(!1);
		function ie() {
			let e = d.value, t = n.host;
			e !== null && t !== null && (s.value = /* @__PURE__ */ new Set([...s.value, e]), B.value = !1, d.value = n.lists.chat_book === e ? null : n.lists.chat_book, d.value ??= u.value[0] ?? null, o({
				label: e,
				count: 1
			}, {
				commit: async () => {
					await t.delete_worldbook(e), i("refresh-lists");
				},
				restore: () => {
					s.value = new Set([...s.value].filter((t) => t !== e));
				}
			}));
		}
		async function oe() {
			let e = d.value;
			e !== null && await te((t) => t.bind_chat_worldbook(e));
		}
		function se(e) {
			return e === n.lists.chat_book ? a("opening.books.bound") : "";
		}
		let ce = N(""), V = N("all"), de = A(() => [
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
		]), pe = A(() => {
			let e = ce.value.trim().toLowerCase();
			return h.value.filter((t) => V.value === "constant" && !t.constant || V.value === "keyword" && t.constant ? !1 : e === "" || [
				t.name,
				t.content,
				...t.keys
			].some((t) => t.toLowerCase().includes(e)));
		}), me = A(() => h.value.filter((e) => e.enabled).length), U = N(null);
		function he(e) {
			let t = h.value.reduce((e, t) => Math.max(e, t.order), 0);
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
		async function ge() {
			let e = U.value, t = d.value;
			if (e === null || t === null) return;
			let n = [...new Set(e.keys.split(/[,，、]/u).map((e) => e.trim()).filter((e) => e !== ""))];
			await te((r) => r.save_entries(t, {
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
		async function _e(e, t) {
			let n = d.value;
			n !== null && await te((r) => r.save_entries(n, {
				upsert: [{
					...e,
					enabled: t
				}],
				remove: []
			}));
		}
		let q = N(null);
		function Se() {
			let e = q.value, t = d.value, r = n.host;
			if (e === null || t === null || r === null) return;
			let a = l(t, e.uid);
			c.value = /* @__PURE__ */ new Set([...c.value, a]), h.value = h.value.filter((t) => t.uid !== e.uid), q.value = null, o({
				label: e.name,
				count: 1
			}, {
				commit: async () => {
					await r.save_entries(t, {
						upsert: [],
						remove: [e.uid]
					}), c.value = new Set([...c.value].filter((e) => e !== a)), i("refresh-lists");
				},
				restore: () => {
					c.value = new Set([...c.value].filter((e) => e !== a)), d.value === t && k();
				}
			});
		}
		return (t, n) => (f(), b("div", { class: j(C(Z).layout) }, [
			O("aside", {
				class: j(C(Z).aside),
				"aria-label": C(a)("opening.books.list_label")
			}, [
				L(G, {
					class: j(C(Z).aside_new),
					icon: C(ue),
					label: C(a)("opening.books.new"),
					disabled: e.host === null,
					onClick: n[0] ||= (e) => z("create")
				}, null, 8, [
					"class",
					"icon",
					"label",
					"disabled"
				]),
				u.value.length > 0 ? (f(), b("div", {
					key: 0,
					class: j(C(Z).aside_title)
				}, T(C(a)("opening.books.list_title")), 3)) : w("", !0),
				(f(!0), b(P, null, m(u.value, (e) => (f(), b("button", {
					key: e,
					type: "button",
					class: j(["tc-interactive", C(Z).item]),
					"aria-current": e === d.value ? "true" : void 0,
					onClick: (t) => d.value = e
				}, [O("span", { class: j(C(Z).item_name) }, T(e), 3), se(e) === "" ? w("", !0) : (f(), b("span", {
					key: 0,
					class: j(C(Z).item_meta)
				}, T(se(e)), 3))], 10, $e))), 128))
			], 10, Qe),
			O("div", { class: j(C(Z).work) }, [O("div", {
				class: j(C(Z).work_inner),
				"data-wide": ""
			}, [
				O("div", { class: j(C(Z).topline) }, [
					L(Xe, {
						modelValue: r.value,
						"onUpdate:modelValue": n[1] ||= (e) => r.value = e
					}, null, 8, ["modelValue"]),
					O("span", { class: j(C(Z).spacer) }, null, 2),
					d.value === null ? w("", !0) : (f(), b(P, { key: 0 }, [
						d.value !== e.lists.chat_book && e.host?.chat_name() !== null ? (f(), E(G, {
							key: 0,
							icon: C(J),
							label: C(a)("opening.books.bind"),
							variant: "ghost",
							disabled: S.value,
							onClick: oe
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])) : w("", !0),
						L(G, {
							icon: C(le),
							label: C(a)("opening.books.rename"),
							variant: "ghost",
							disabled: S.value,
							onClick: n[2] ||= (e) => z("rename")
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						]),
						L(W, {
							icon: C(fe),
							label: C(a)("opening.books.delete"),
							destructive: "",
							disabled: S.value,
							onClick: n[3] ||= (e) => B.value = !0
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])
					], 64))
				], 2),
				d.value === null ? w("", !0) : (f(), E(be, {
					key: 0,
					"model-value": e.noRecursionBooks.includes(d.value),
					label: C(a)("opening.books.no_recursion"),
					description: C(a)("opening.books.no_recursion_hint"),
					"onUpdate:modelValue": n[4] ||= (e) => d.value !== null && i("set-no-recursion", d.value, e)
				}, null, 8, [
					"model-value",
					"label",
					"description"
				])),
				e.host === null ? (f(), E(K, {
					key: 1,
					status: "empty",
					"empty-title": C(a)("opening.books.unavailable_title"),
					"empty-message": e.hostError ?? C(a)("opening.books.unavailable_message")
				}, null, 8, ["empty-title", "empty-message"])) : d.value === null ? (f(), b("div", {
					key: 2,
					class: j(C(Z).work_head)
				}, [O("h1", { class: j(C(Z).work_title) }, T(C(a)("opening.books.title")), 3), O("p", { class: j(C(Z).work_description) }, T(C(a)("opening.books.empty")), 3)], 2)) : (f(), b(P, { key: 3 }, [
					O("div", { class: j(C(Z).work_head) }, [O("h1", { class: j(C(Z).work_title) }, T(d.value), 3), O("p", { class: j(C(Z).work_description) }, [F(T(C(a)("opening.books.summary", {
						n: h.value.length,
						enabled: me.value
					})) + " ", 1), d.value === e.lists.chat_book ? (f(), b(P, { key: 0 }, [F(" · " + T(C(a)("opening.books.bound")), 1)], 64)) : w("", !0)], 2)], 2),
					D.value === null ? w("", !0) : (f(), b("p", {
						key: 0,
						class: j(C(Z).error),
						role: "alert"
					}, T(D.value), 3)),
					O("div", { class: j(C(Z).row) }, [
						p(O("input", {
							"onUpdate:modelValue": n[5] ||= (e) => ce.value = e,
							class: j([C(Z).input, C(Z).spacer]),
							type: "search",
							placeholder: C(a)("opening.books.search"),
							"aria-label": C(a)("opening.books.search")
						}, null, 10, et), [[x, ce.value]]),
						L(ae, {
							modelValue: V.value,
							"onUpdate:modelValue": n[6] ||= (e) => V.value = e,
							options: de.value,
							placeholder: C(a)("opening.books.filter_all"),
							"aria-label": C(a)("opening.books.filter_label")
						}, null, 8, [
							"modelValue",
							"options",
							"placeholder",
							"aria-label"
						]),
						L(G, {
							icon: C(ue),
							label: C(a)("opening.books.add_entry"),
							disabled: S.value,
							onClick: n[7] ||= (e) => he(null)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])
					], 2),
					U.value === null ? w("", !0) : (f(), b("div", {
						key: 1,
						class: j(C(Z).editor)
					}, [
						O("div", { class: j(C(Z).grid3) }, [L(H, { label: C(a)("opening.entry.title_label") }, {
							default: M(({ fieldId: e }) => [p(O("input", {
								id: e,
								"onUpdate:modelValue": n[8] ||= (e) => U.value.name = e,
								class: j(C(Z).input),
								maxlength: "120"
							}, null, 10, tt), [[x, U.value.name]])]),
							_: 1
						}, 8, ["label"]), L(H, { label: C(a)("opening.books.order_label") }, {
							default: M(({ fieldId: e }) => [L(ve, {
								id: e,
								modelValue: U.value.order,
								"onUpdate:modelValue": n[9] ||= (e) => U.value.order = e,
								label: C(a)("opening.books.order_label"),
								"increment-label": C(a)("opening.books.order_up"),
								"decrement-label": C(a)("opening.books.order_down"),
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
						L(be, {
							modelValue: U.value.constant,
							"onUpdate:modelValue": n[10] ||= (e) => U.value.constant = e,
							label: C(a)("opening.entry.constant_label"),
							description: C(a)("opening.entry.constant_hint")
						}, null, 8, [
							"modelValue",
							"label",
							"description"
						]),
						U.value.constant ? w("", !0) : (f(), E(H, {
							key: 0,
							label: C(a)("opening.entry.keys_label"),
							hint: C(a)("opening.entry.keys_hint")
						}, {
							default: M(({ fieldId: e, describedBy: t }) => [p(O("input", {
								id: e,
								"onUpdate:modelValue": n[11] ||= (e) => U.value.keys = e,
								class: j(C(Z).input),
								"aria-describedby": t
							}, null, 10, nt), [[x, U.value.keys]])]),
							_: 1
						}, 8, ["label", "hint"])),
						L(H, { label: C(a)("opening.entry.content_label") }, {
							default: M(({ fieldId: e }) => [p(O("textarea", {
								id: e,
								"onUpdate:modelValue": n[12] ||= (e) => U.value.content = e,
								class: j(C(Z).text_area)
							}, null, 10, rt), [[x, U.value.content]])]),
							_: 1
						}, 8, ["label"]),
						O("div", { class: j(C(Z).row) }, [
							O("span", { class: j(C(Z).spacer) }, null, 2),
							L(G, {
								label: C(a)("common.actions.cancel"),
								variant: "ghost",
								onClick: n[13] ||= (e) => U.value = null
							}, null, 8, ["label"]),
							L(G, {
								label: C(a)("common.actions.save"),
								variant: "primary",
								pending: S.value,
								disabled: U.value.name.trim() === "",
								onClick: ge
							}, null, 8, [
								"label",
								"pending",
								"disabled"
							])
						], 2)
					], 2)),
					L(K, {
						status: _.value ? "loading" : pe.value.length === 0 ? "empty" : "ready",
						"empty-title": C(a)("opening.books.no_entries"),
						"min-height": "80px"
					}, {
						default: M(() => [O("div", { class: j(C(Z).table) }, [(f(!0), b(P, null, m(pe.value, (e) => (f(), b("div", {
							key: e.uid,
							class: j(C(Z).table_row),
							"data-off": e.enabled ? void 0 : ""
						}, [
							L(be, {
								"model-value": e.enabled,
								label: C(a)("opening.books.enabled", { name: e.name }),
								"label-hidden": "",
								disabled: S.value,
								"onUpdate:modelValue": (t) => _e(e, t)
							}, null, 8, [
								"model-value",
								"label",
								"disabled",
								"onUpdate:modelValue"
							]),
							O("span", { class: j(C(Z).table_name) }, [F(T(e.name) + " ", 1), O("span", { class: j(C(Z).keys) }, [e.constant ? (f(), b("span", {
								key: 0,
								class: j(C(Z).pill),
								"data-tone": "constant"
							}, T(C(a)("opening.entry.constant")), 3)) : (f(!0), b(P, { key: 1 }, m(e.keys.slice(0, 4), (e) => (f(), b("span", {
								key: e,
								class: j(C(Z).key)
							}, T(e), 3))), 128))], 2)], 2),
							O("span", { class: j(C(Z).preview) }, T(e.content), 3),
							O("span", { class: j(C(Z).order) }, T(e.order), 3),
							O("span", { class: j(C(Z).row) }, [L(W, {
								icon: C(le),
								label: C(a)("opening.entry.edit"),
								size: "sm",
								disabled: S.value,
								onClick: (t) => he(e)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]), L(W, {
								icon: C(fe),
								label: C(a)("opening.entry.remove"),
								size: "sm",
								destructive: "",
								disabled: S.value,
								onClick: (t) => q.value = e
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							])], 2)
						], 10, it))), 128))], 2)]),
						_: 1
					}, 8, ["status", "empty-title"])
				], 64))
			], 2)], 2),
			L(xe, g({
				open: I.value !== null,
				title: I.value === "rename" ? C(a)("opening.books.rename") : C(a)("opening.books.new")
			}, I.value === "rename" ? { description: C(a)("opening.books.rename_hint") } : {}, {
				"close-label": C(a)("common.actions.close"),
				"onUpdate:open": n[16] ||= (e) => I.value = e ? I.value : null
			}), {
				default: M(() => [O("div", { class: j(C(Z).work_inner) }, [
					p(O("input", {
						"onUpdate:modelValue": n[14] ||= (e) => R.value = e,
						class: j(C(Z).input),
						maxlength: "120",
						"aria-label": C(a)("opening.books.name_label")
					}, null, 10, at), [[x, R.value]]),
					ne.value ? (f(), b("p", {
						key: 0,
						class: j(C(Z).error)
					}, T(C(a)("opening.write.name_taken")), 3)) : w("", !0),
					O("div", { class: j(C(Z).row) }, [
						O("span", { class: j(C(Z).spacer) }, null, 2),
						L(G, {
							label: C(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[15] ||= (e) => I.value = null
						}, null, 8, ["label"]),
						L(G, {
							label: C(a)("common.actions.save"),
							variant: "primary",
							pending: S.value,
							disabled: R.value.trim() === "" || ne.value,
							onClick: re
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
			L(ye, {
				open: B.value,
				"onUpdate:open": n[17] ||= (e) => B.value = e,
				title: C(a)("opening.books.delete_title", { name: d.value ?? "" }),
				description: C(a)("opening.books.delete_description"),
				"confirm-label": C(a)("common.actions.delete"),
				"cancel-label": C(a)("common.actions.cancel"),
				pending: S.value,
				onConfirm: ie
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			L(ye, {
				open: q.value !== null,
				title: C(a)("opening.books.delete_entry_title", { name: q.value?.name ?? "" }),
				description: C(a)("opening.books.delete_entry_description"),
				"confirm-label": C(a)("common.actions.delete"),
				"cancel-label": C(a)("common.actions.cancel"),
				pending: S.value,
				"onUpdate:open": n[18] ||= (e) => q.value = e ? q.value : null,
				onConfirm: Se
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
function st(e) {
	return e.states.flatMap((e) => e.status === "done" || e.status === "stale" ? e.entries : []);
}
var ct = (e) => e.trim().toLowerCase(), Q = (e) => ({
	name: e.title,
	constant: e.constant,
	keys: e.constant ? [] : e.keys,
	content: e.content
});
function lt(e, t) {
	let n = (e) => [...e].sort().join("\n");
	return ct(e.name) === ct(t.name) && e.content.trim() === t.content.trim() && e.constant === t.constant && (e.constant || n(e.keys) === n(t.keys));
}
function ut(e, t, n) {
	let r = new Map(t.map((e) => [e.uid, e])), i = new Map(n.map((e) => [e.entry_id, e])), a = new Set(e.map((e) => e.id)), o = new Set(n.filter((e) => a.has(e.entry_id)).map((e) => e.uid)), s = new Map(t.filter((e) => !o.has(e.uid)).map((e) => [ct(e.name), e])), c = e.map((e) => {
		let t = i.get(e.id);
		if (t !== void 0) {
			let n = r.get(t.uid);
			if (n === void 0) return {
				key: e.id,
				entry: e,
				existing: null,
				status: "book_deleted",
				suggested: !1
			};
			let i = !lt(Q(e), t), a = !lt(n, t), o = i ? a ? "conflict" : "changed" : a ? "book_edited" : "same";
			return {
				key: e.id,
				entry: e,
				existing: n,
				status: o,
				suggested: o === "changed"
			};
		}
		let n = s.get(ct(e.title));
		if (n === void 0) return {
			key: e.id,
			entry: e,
			existing: null,
			status: "new",
			suggested: !0
		};
		s.delete(ct(e.title)), o.add(n.uid);
		let a = lt(Q(e), n) ? "same" : "changed";
		return {
			key: e.id,
			entry: e,
			existing: n,
			status: a,
			suggested: a === "changed"
		};
	});
	for (let e of n) {
		let t = r.get(e.uid);
		a.has(e.entry_id) || t === void 0 || o.has(t.uid) || (o.add(t.uid), c.push({
			key: `book:${String(t.uid)}`,
			entry: null,
			existing: t,
			status: "removed",
			suggested: lt(t, e)
		}));
	}
	return c;
}
var dt = 10;
function ft(e, t, n, r) {
	let i = n.reduce((e, t) => Math.max(e, t.order), 0);
	return {
		upsert: e.flatMap((e) => {
			let { entry: n } = e;
			if (n === null || e.status === "same" || !t.has(e.key)) return [];
			let a = {
				name: n.title,
				constant: n.constant,
				keys: n.constant ? [] : n.keys,
				content: n.content
			};
			return e.existing === null ? (i += dt, [{
				...a,
				enabled: !0,
				order: i,
				placement: {
					position: r.position,
					depth: r.depth,
					prevent_outgoing: n.constant && r.constant_no_recursion
				}
			}]) : [{
				...a,
				uid: e.existing.uid,
				enabled: e.existing.enabled,
				order: e.existing.order
			}];
		}),
		remove: e.flatMap((e) => e.status === "removed" && e.existing !== null && t.has(e.key) ? [e.existing.uid] : [])
	};
}
function pt(e, t, n, r) {
	let i = new Map(r.map((e) => [e.entry_id, e])), a = new Set(e.flatMap((e) => e.existing !== null && e.status !== "book_deleted" ? [e.existing.uid] : [])), o = [];
	for (let s of e) {
		if (s.entry === null) {
			let e = s.existing !== null && !t.has(s.key), n = r.find((e) => e.uid === s.existing?.uid);
			e && n !== void 0 && o.push(n);
			continue;
		}
		let e = s.entry;
		if (!(s.status === "same" || t.has(s.key))) {
			let t = i.get(e.id);
			t !== void 0 && o.push(t);
			continue;
		}
		let c = s.existing !== null && s.status !== "book_deleted" ? s.existing.uid : null;
		if (c === null) {
			let t = n.find((t) => !a.has(t.uid) && ct(t.name) === ct(e.title));
			if (t === void 0) continue;
			a.add(t.uid), c = t.uid;
		}
		o.push({
			entry_id: e.id,
			uid: c,
			...Q(e),
			keys: [...Q(e).keys]
		});
	}
	return o;
}
function mt(e, t) {
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
var ht = ["id"], gt = ["id", "aria-describedby"], _t = ["id"], vt = /* @__PURE__ */ I({
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
		let n = e, r = t, { t: i } = ee(), a = N(n.editing), o = N(""), s = N(!1), c = N(""), l = N("");
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
		function h() {
			a.value = !1, r("cancel");
		}
		return (t, n) => a.value ? (f(), b("div", {
			key: 0,
			class: j(C(Z).editor)
		}, [
			L(H, { label: C(i)("opening.entry.title_label") }, {
				default: M(({ fieldId: e }) => [p(O("input", {
					id: e,
					"onUpdate:modelValue": n[0] ||= (e) => o.value = e,
					class: j(C(Z).input),
					maxlength: "120"
				}, null, 10, ht), [[x, o.value]])]),
				_: 1
			}, 8, ["label"]),
			L(be, {
				modelValue: s.value,
				"onUpdate:modelValue": n[1] ||= (e) => s.value = e,
				label: C(i)("opening.entry.constant_label"),
				description: C(i)("opening.entry.constant_hint")
			}, null, 8, [
				"modelValue",
				"label",
				"description"
			]),
			s.value ? w("", !0) : (f(), E(H, {
				key: 0,
				label: C(i)("opening.entry.keys_label"),
				hint: C(i)("opening.entry.keys_hint")
			}, {
				default: M(({ fieldId: e, describedBy: t }) => [p(O("input", {
					id: e,
					"onUpdate:modelValue": n[2] ||= (e) => c.value = e,
					class: j(C(Z).input),
					"aria-describedby": t
				}, null, 10, gt), [[x, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])),
			L(H, { label: C(i)("opening.entry.content_label") }, {
				default: M(({ fieldId: e }) => [p(O("textarea", {
					id: e,
					"onUpdate:modelValue": n[3] ||= (e) => l.value = e,
					class: j(C(Z).text_area),
					maxlength: "8000"
				}, null, 10, _t), [[x, l.value]])]),
				_: 1
			}, 8, ["label"]),
			O("div", { class: j(C(Z).row) }, [
				O("span", { class: j(C(Z).spacer) }, null, 2),
				L(G, {
					label: C(i)("common.actions.cancel"),
					variant: "ghost",
					onClick: h
				}, null, 8, ["label"]),
				L(G, {
					label: C(i)("common.actions.save"),
					variant: "primary",
					disabled: o.value.trim() === "" || l.value.trim() === "",
					onClick: d
				}, null, 8, ["label", "disabled"])
			], 2)
		], 2)) : (f(), b("article", {
			key: 1,
			class: j(C(Z).entry)
		}, [
			O("div", { class: j(C(Z).entry_head) }, [
				O("span", { class: j(C(Z).entry_title) }, T(e.entry.title), 3),
				e.entry.constant ? (f(), b("span", {
					key: 0,
					class: j(C(Z).pill),
					"data-tone": "constant"
				}, T(C(i)("opening.entry.constant")), 3)) : (f(), b("span", {
					key: 1,
					class: j(C(Z).pill)
				}, T(C(i)("opening.entry.keyword")), 3)),
				O("span", { class: j(C(Z).spacer) }, null, 2),
				L(W, {
					icon: C(V),
					label: C(i)("opening.entry.rewrite"),
					size: "sm",
					disabled: e.disabled || e.rewriting,
					onClick: n[4] ||= (e) => r("rewrite")
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				L(W, {
					icon: C(le),
					label: C(i)("opening.entry.edit"),
					size: "sm",
					disabled: e.disabled,
					onClick: u
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				]),
				L(W, {
					icon: C(fe),
					label: C(i)("opening.entry.remove"),
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
			!e.entry.constant && e.entry.keys.length > 0 ? (f(), b("div", {
				key: 0,
				class: j(C(Z).keys)
			}, [F(T(C(i)("opening.entry.keys_label")) + " ", 1), (f(!0), b(P, null, m(e.entry.keys, (e) => (f(), b("span", {
				key: e,
				class: j(C(Z).key)
			}, T(e), 3))), 128))], 2)) : w("", !0),
			e.rewriting ? (f(), b("p", {
				key: 1,
				class: j(C(Z).hint),
				role: "status"
			}, T(C(i)("opening.status.rewriting")), 3)) : w("", !0),
			O("p", { class: j(C(Z).entry_content) }, T(e.entry.content), 3)
		], 2));
	}
}), yt = ["aria-label"], bt = ["data-status"], xt = ["data-tone"], St = /* @__PURE__ */ I({
	__name: "OpeningWriteDialog",
	props: /*@__PURE__*/ d({
		host: {},
		entries: {},
		defaultName: {},
		lists: {},
		written: {}
	}, {
		open: {
			type: Boolean,
			required: !0
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ d(["written"], ["update:open"]),
	setup(e, { emit: t }) {
		let n = e, r = v(e, "open"), i = t, { t: a } = ee(), o = N("new"), s = N(""), c = N(void 0), l = N([]), u = N(!1), d = N(!1), h = N(null), g = N(/* @__PURE__ */ new Set()), _ = A(() => [{
			value: "new",
			label: a("opening.write.mode_new")
		}, {
			value: "existing",
			label: a("opening.write.mode_existing")
		}]), S = A(() => n.lists.books.map((e) => ({
			value: e,
			label: e
		}))), D = N("after_character_definition"), k = N(!0), te = A(() => [
			{
				value: "after_character_definition",
				label: a("opening.write.position_after")
			},
			{
				value: "before_character_definition",
				label: a("opening.write.position_before")
			},
			{
				value: "at_depth",
				label: a("opening.write.position_depth")
			}
		]), F = A(() => o.value === "existing" && c.value !== void 0 ? n.written[c.value] ?? [] : []), I = A(() => ut(n.entries, o.value === "existing" ? l.value : [], F.value));
		function R() {
			g.value = new Set(I.value.filter((e) => e.suggested).map((e) => e.key));
		}
		function ne(e) {
			return e.entry?.title ?? e.existing?.name ?? "";
		}
		async function z() {
			if (l.value = [], o.value !== "existing" || c.value === void 0) {
				R();
				return;
			}
			u.value = !0, h.value = null;
			try {
				l.value = await n.host.read_entries(c.value);
			} catch (e) {
				h.value = a("opening.write.read_failed", { reason: Ze(e) });
			} finally {
				u.value = !1, R();
			}
		}
		y(r, (e) => {
			e && (h.value = null, s.value = n.defaultName, c.value = n.lists.chat_book ?? n.lists.books[0], o.value = n.lists.chat_book === null ? "new" : "existing", z());
		}), y([o, c], () => {
			z();
		});
		function re(e, t) {
			let n = new Set(g.value);
			t === !0 ? n.add(e) : n.delete(e), g.value = n;
		}
		let B = A(() => o.value === "new" ? s.value.trim() : c.value ?? ""), ie = A(() => o.value === "new" && n.lists.books.includes(s.value.trim())), oe = A(() => I.value.filter((e) => e.status !== "same" && g.value.has(e.key)).length), se = A(() => r.value ? n.host.chat_name() : null);
		function le(e) {
			switch (e.status) {
				case "new": return a("opening.write.status_new");
				case "changed": return a("opening.write.status_modified");
				case "same": return a("opening.write.status_same");
				case "book_edited": return a("opening.write.status_book_edited");
				case "conflict": return a("opening.write.status_conflict");
				case "book_deleted": return a("opening.write.status_book_deleted");
				case "removed": return a("opening.write.status_removed");
			}
		}
		async function V() {
			let e = B.value;
			if (!(e === "" || ie.value)) {
				d.value = !0, h.value = null;
				try {
					o.value === "new" && await n.host.create_worldbook(e);
					let t = o.value === "new" ? [] : l.value, a = {
						position: D.value,
						depth: 4,
						constant_no_recursion: k.value
					};
					await n.host.save_entries(e, ft(I.value, g.value, t, a));
					let s = pt(I.value, g.value, await n.host.read_entries(e), F.value);
					se.value !== null && await n.host.bind_chat_worldbook(e), i("written", e, s), r.value = !1;
				} catch (e) {
					h.value = a("opening.write.failed", { reason: Ze(e) });
				} finally {
					d.value = !1;
				}
			}
		}
		return (e, t) => (f(), E(xe, {
			open: r.value,
			"onUpdate:open": t[6] ||= (e) => r.value = e,
			title: C(a)("opening.write.title"),
			description: C(a)("opening.write.description"),
			"close-label": C(a)("common.actions.close")
		}, {
			default: M(() => [O("div", { class: j(C(Z).work_inner) }, [
				L(_e, {
					modelValue: o.value,
					"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
					class: j(C(Z).compact),
					options: _.value,
					label: C(a)("opening.write.mode_label")
				}, null, 8, [
					"modelValue",
					"class",
					"options",
					"label"
				]),
				o.value === "new" ? p((f(), b("input", {
					key: 0,
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					class: j(C(Z).input),
					maxlength: "120",
					"aria-label": C(a)("opening.write.name_label")
				}, null, 10, yt)), [[x, s.value]]) : (f(), E(ae, {
					key: 1,
					modelValue: c.value,
					"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
					options: S.value,
					placeholder: C(a)("opening.write.book_placeholder"),
					"aria-label": C(a)("opening.write.book_label")
				}, null, 8, [
					"modelValue",
					"options",
					"placeholder",
					"aria-label"
				])),
				ie.value ? (f(), b("p", {
					key: 2,
					class: j(C(Z).error)
				}, T(C(a)("opening.write.name_taken")), 3)) : w("", !0),
				u.value ? (f(), b("p", {
					key: 3,
					class: j(C(Z).hint),
					role: "status"
				}, T(C(a)("opening.write.loading")), 3)) : (f(), b("div", {
					key: 4,
					class: j(C(Z).write_list)
				}, [(f(!0), b(P, null, m(I.value, (e) => (f(), b("div", {
					key: e.key,
					class: j(C(Z).write_row),
					"data-status": e.status
				}, [
					L(ce, {
						"model-value": e.status !== "same" && g.value.has(e.key),
						label: ne(e),
						"label-hidden": "",
						disabled: e.status === "same",
						"onUpdate:modelValue": (t) => re(e.key, t)
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]),
					O("span", {
						class: j(C(Z).pill),
						"data-tone": e.status
					}, T(le(e)), 11, xt),
					O("span", null, [O("strong", null, T(ne(e)), 1), e.entry !== null && e.existing !== null && (e.status === "changed" || e.status === "conflict" || e.status === "book_edited") ? (f(), b("span", {
						key: 0,
						class: j(C(Z).diff)
					}, [O("del", null, T(e.existing.content), 1), O("ins", null, T(e.entry.content), 1)], 2)) : w("", !0)])
				], 10, bt))), 128))], 2)),
				O("div", { class: j(C(Z).row) }, [L(ae, {
					modelValue: D.value,
					"onUpdate:modelValue": t[3] ||= (e) => D.value = e,
					options: te.value,
					placeholder: C(a)("opening.write.position_label"),
					"aria-label": C(a)("opening.write.position_label")
				}, null, 8, [
					"modelValue",
					"options",
					"placeholder",
					"aria-label"
				]), L(ce, {
					modelValue: k.value,
					"onUpdate:modelValue": t[4] ||= (e) => k.value = e,
					label: C(a)("opening.write.constant_no_recursion")
				}, null, 8, ["modelValue", "label"])], 2),
				O("p", { class: j(C(Z).hint) }, T(C(a)("opening.write.placement_hint")), 3),
				O("p", { class: j(C(Z).hint) }, T(se.value === null ? C(a)("opening.write.no_chat") : C(a)("opening.write.bind_note", {
					book: B.value,
					chat: se.value
				})), 3),
				h.value === null ? w("", !0) : (f(), b("p", {
					key: 5,
					class: j(C(Z).error),
					role: "alert"
				}, T(h.value), 3)),
				O("div", { class: j(C(Z).row) }, [
					O("span", { class: j(C(Z).spacer) }, null, 2),
					L(G, {
						label: C(a)("common.actions.cancel"),
						variant: "ghost",
						onClick: t[5] ||= (e) => r.value = !1
					}, null, 8, ["label"]),
					L(G, {
						label: C(a)("opening.write.confirm", { n: oe.value }),
						variant: "primary",
						pending: d.value,
						disabled: oe.value === 0 || B.value === "" || ie.value || u.value,
						onClick: V
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
}), Ct = ["aria-label"], wt = ["aria-current", "onClick"], Tt = ["data-state"], Et = ["id", "value"], Dt = [
	"id",
	"value",
	"aria-describedby",
	"placeholder"
], Ot = ["aria-pressed", "onClick"], kt = ["id", "aria-describedby"], At = ["aria-label"], jt = [
	"data-state",
	"aria-current",
	"disabled",
	"onClick"
], Mt = ["role", "aria-label"], Nt = [
	"role",
	"aria-checked",
	"disabled",
	"onClick"
], Pt = ["data-shape"], Ft = ["id", "placeholder"], It = [
	"id",
	"aria-describedby",
	"placeholder"
], Lt = ["id"], Rt = ["id"], zt = [
	"id",
	"aria-describedby",
	"placeholder"
], Bt = ["data-open", "aria-label"], Vt = 4e3, Ht = /* @__PURE__ */ I({
	__name: "OpeningBuild",
	props: /*@__PURE__*/ d({
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
	emits: /*@__PURE__*/ d(["refresh-lists"], ["update:section"]),
	setup(e, { emit: t }) {
		let n = e, r = v(e, "section"), i = t, { t: a } = ee(), o = Je(), s = N(n.store.drafts.value[0]?.id ?? null), c = A(() => s.value === null ? null : n.store.draft(s.value)), l = N(null);
		function u(e) {
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
				states: e.steps.map(Ue),
				current: 0,
				started: !1,
				connection: { kind: "analysis" },
				preset_name: "in_use",
				worldbooks: [],
				card: null,
				use_greeting: !1,
				written: {}
			};
			await n.store.add(t), s.value = t.id;
		}
		let _ = N(!1), S = N(!1);
		async function k() {
			let e = c.value;
			if (e !== null) {
				S.value = !0;
				try {
					await n.store.remove(e.id), _.value = !1, s.value = n.store.drafts.value[0]?.id ?? null;
				} finally {
					S.value = !1;
				}
			}
		}
		function I(e, t = !1) {
			c.value !== null && n.store.edit(c.value, e, { debounce: t });
		}
		let R = A(() => n.templates.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), ne = N(Be);
		y(() => c.value?.template_name, (e) => {
			ne.value = n.templates.find((t) => t.display_name === e)?.id ?? "builtin-default";
		}, { immediate: !0 });
		function z(e) {
			let t = e === void 0 ? void 0 : h(e);
			t !== void 0 && (ne.value = t.id, I((e) => {
				e.template_name = t.display_name, e.steps = t.steps.map((e) => ({ ...e })), e.states = t.steps.map(Ue), e.current = 0;
			}));
		}
		let me = A(() => [
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
		]), U = A(() => {
			let e = c.value?.connection;
			return e?.kind === "proxy_preset" ? `proxy:${e.proxy_preset}` : e?.kind;
		});
		function ge(e) {
			e !== void 0 && I((t) => {
				t.connection = e.startsWith("proxy:") ? {
					kind: "proxy_preset",
					proxy_preset: e.slice(6)
				} : e === "current" ? { kind: "current" } : { kind: "analysis" };
			});
		}
		let _e = A(() => n.lists.presets.map((e) => ({
			value: e,
			label: e === "in_use" ? a("opening.settings.preset_in_use") : e
		})));
		function ve(e) {
			e !== void 0 && I((t) => {
				t.preset_name = e;
			});
		}
		function be(e) {
			I((t) => {
				t.worldbooks = t.worldbooks.includes(e) ? t.worldbooks.filter((t) => t !== e) : [...t.worldbooks, e].slice(0, 20);
			});
		}
		let K = N(null);
		y([s, () => n.host], () => {
			K.value = n.host?.character() ?? null;
		}, { immediate: !0 });
		function xe(e) {
			let t = K.value;
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
		function q(e) {
			I((t) => {
				t.use_greeting = e === !0 && t.card !== null;
			});
		}
		function we(e) {
			return me.value.find((e) => e.value === U.value)?.label ?? e.connection.kind;
		}
		let J = A(() => c.value === null ? null : n.flow.busy(c.value.id)), ke = A(() => c.value === null ? null : n.flow.error(c.value.id)), Ae = A(() => c.value?.steps[c.value.current] ?? null), Y = A(() => c.value?.states[c.value.current] ?? null), je = A(() => c.value !== null && c.value.current === c.value.steps.length - 1), Me = A(() => Y.value?.status === "done" || Y.value?.status === "stale"), Ne = A(() => c.value?.states.some((e) => e.status === "stale") ?? !1);
		function Pe(e) {
			return e instanceof he ? a("opening.errors.unparsable", { excerpt: e.excerpt }) : a("opening.errors.failed", { reason: Ze(e) });
		}
		function Fe(e) {
			return e === "stale" ? a("opening.steps.stale") : "";
		}
		function Ie(e) {
			let t = c.value;
			return t !== null && (t.states[e]?.status !== "pending" || e === t.current);
		}
		function Le(e) {
			I((t) => {
				t.current = e;
			});
		}
		async function Re() {
			let e = c.value;
			e !== null && e.description.trim() !== "" && (I((e) => {
				e.started = !0;
			}), await n.flow.run_step(e, 0));
		}
		let ze = N(!1), Ve = N("");
		function He() {
			Ve.value = c.value?.description ?? "", ze.value = !0;
		}
		function We() {
			let e = Ve.value;
			I((t) => {
				Ge(t, e);
			}), ze.value = !1;
		}
		let X = N([]), Ke = N(""), Ye = N(!1), Qe = N("");
		async function $e() {
			let e = c.value;
			if (e === null) return;
			let t = Qe.value;
			Ye.value = !1, Qe.value = "", await n.flow.refine_question(e, t);
		}
		let et = N(!1), tt = N(""), nt = N(null);
		async function rt() {
			et.value = !0, await D(), nt.value?.focus();
		}
		y(() => [c.value?.id, c.value?.current], () => {
			et.value = !1, tt.value = "";
		});
		async function it() {
			let e = c.value;
			if (e === null) return;
			let t = tt.value;
			et.value = !1, tt.value = "", await n.flow.ask_more(e, e.current, t);
		}
		y(() => Y.value?.question, () => {
			X.value = [], Ke.value = "";
		});
		function at(e) {
			let t = Y.value?.question;
			if (t != null) {
				if (!t.multiple) {
					X.value = X.value.includes(e) ? [] : [e];
					return;
				}
				X.value = X.value.includes(e) ? X.value.filter((t) => t !== e) : [...X.value, e];
			}
		}
		async function ot() {
			c.value !== null && await n.flow.answer(c.value, X.value, Ke.value);
		}
		function ct(e, t) {
			let n = [...e, ...t === "" ? [] : [t]];
			return n.length === 0 ? a("opening.ask.left_to_model") : n.join(a("opening.ask.joiner"));
		}
		let Q = N(null);
		function lt(e, t) {
			I((n) => {
				let r = n.states[e]?.entries, i = r?.findIndex((e) => e.id === t.id) ?? -1;
				r !== void 0 && i >= 0 && (r[i] = t);
			}), Q.value = null;
		}
		function ut(e, t) {
			let r = c.value?.id, i = c.value?.states[e]?.entries ?? [], a = i.findIndex((e) => e.id === t), s = i[a];
			if (r !== void 0 && s !== void 0 && Q.value !== t) {
				let i = qe(s);
				o({
					label: s.title,
					count: 1
				}, {
					commit: () => Promise.resolve(),
					restore: () => {
						let o = n.store.draft(r);
						o !== null && n.store.edit(o, (n) => {
							let r = n.states[e];
							r !== void 0 && !r.entries.some((e) => e.id === t) && r.entries.splice(Math.min(a, r.entries.length), 0, i);
						});
					}
				});
			}
			I((n) => {
				let r = n.states[e];
				r !== void 0 && (r.entries = r.entries.filter((e) => e.id !== t));
			});
		}
		function dt(e) {
			let t = crypto.randomUUID();
			I((n) => {
				n.states[e]?.entries.push({
					id: t,
					title: a("opening.entry.new_title"),
					constant: !1,
					keys: [],
					content: ""
				});
			}), Q.value = t;
		}
		function ft(e, t) {
			Q.value === t && (ut(e, t), Q.value = null);
		}
		let pt = N(!1), ht = N(""), gt = N("");
		function _t() {
			ht.value = Y.value?.message?.speaker ?? "", gt.value = Y.value?.message?.text ?? "", pt.value = !0;
		}
		function yt() {
			let e = c.value?.current ?? 0;
			I((t) => {
				let n = t.states[e];
				n !== void 0 && (n.message = {
					speaker: ht.value.trim(),
					text: gt.value
				});
			}), pt.value = !1;
		}
		let bt = A(() => c.value === null ? [] : st(c.value)), xt = A(() => [...c.value?.states ?? []].reverse().find((e) => e.message !== null)?.message ?? null), Ht = N(!1), Ut = N(null);
		function Wt(e, t) {
			I((n) => {
				n.written = {
					...n.written,
					[e]: t
				};
			}), Ut.value = a("opening.output.book_written", { book: e }), i("refresh-lists");
		}
		let Gt = N(!1), Kt = N(!1), qt = A(() => Gt.value ? n.host?.chat_name() ?? null : null);
		async function Jt() {
			let e = xt.value;
			if (n.host !== null && e !== null) {
				Kt.value = !0;
				try {
					await n.host.append_character_message(e.speaker, e.text), Gt.value = !1, Ut.value = a("opening.output.message_added");
				} catch (e) {
					l.value = a("opening.errors.failed", { reason: Ze(e) }), Gt.value = !1;
				} finally {
					Kt.value = !1;
				}
			}
		}
		function $() {
			let e = c.value;
			return e === null ? "" : mt(e, {
				description: a("opening.markdown.description"),
				constant: a("opening.entry.constant"),
				keys: a("opening.entry.keys_label")
			});
		}
		async function Yt() {
			try {
				await navigator.clipboard.writeText($()), Ut.value = a("opening.output.copied");
			} catch (e) {
				l.value = a("opening.errors.failed", { reason: Ze(e) });
			}
		}
		function Xt() {
			let e = URL.createObjectURL(new Blob([$()], { type: "text/markdown" })), t = document.createElement("a");
			t.href = e, t.download = `${c.value?.display_name ?? "opening"}.md`, t.click(), URL.revokeObjectURL(e);
		}
		let Zt = N(!1);
		return y(s, () => {
			l.value = null, Ut.value = null, pt.value = !1, ze.value = !1;
		}), (t, n) => (f(), b("div", { class: j(C(Z).layout) }, [
			O("aside", {
				class: j(C(Z).aside),
				"aria-label": C(a)("opening.draft.list_label")
			}, [
				L(G, {
					class: j(C(Z).aside_new),
					icon: C(ue),
					label: C(a)("opening.draft.new"),
					onClick: g
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				e.store.drafts.value.length > 0 ? (f(), b("div", {
					key: 0,
					class: j(C(Z).aside_title)
				}, T(C(a)("opening.draft.list_title")), 3)) : w("", !0),
				(f(!0), b(P, null, m(e.store.drafts.value, (e) => (f(), b("button", {
					key: e.id,
					type: "button",
					class: j(["tc-interactive", C(Z).item]),
					"aria-current": e.id === s.value ? "true" : void 0,
					onClick: (t) => s.value = e.id
				}, [
					O("span", { class: j(C(Z).item_name) }, T(e.display_name), 3),
					O("span", { class: j(C(Z).dots) }, [(f(!0), b(P, null, m(u(e), (e, t) => (f(), b("i", {
						key: t,
						class: j(C(Z).dot),
						"data-state": e
					}, null, 10, Tt))), 128))], 2),
					O("span", { class: j(C(Z).item_meta) }, T(d(e)), 3)
				], 10, wt))), 128))
			], 10, Ct),
			O("div", { class: j(C(Z).columns) }, [O("div", { class: j(C(Z).work) }, [O("div", { class: j(C(Z).work_inner) }, [
				O("div", { class: j(C(Z).topline) }, [
					L(Xe, {
						modelValue: r.value,
						"onUpdate:modelValue": n[0] ||= (e) => r.value = e
					}, null, 8, ["modelValue"]),
					O("span", { class: j(C(Z).spacer) }, null, 2),
					c.value !== null && c.value.started ? (f(), E(G, {
						key: 0,
						icon: C(le),
						label: C(a)("opening.draft.description_label"),
						variant: "ghost",
						disabled: J.value !== null || ze.value,
						onClick: He
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])) : w("", !0),
					c.value !== null && c.value.started ? (f(), E(G, {
						key: 1,
						class: j(C(Z).known_toggle),
						icon: C(B),
						label: C(a)("opening.known.toggle"),
						variant: "ghost",
						onClick: n[1] ||= (e) => Zt.value = !Zt.value
					}, null, 8, [
						"class",
						"icon",
						"label"
					])) : w("", !0),
					c.value === null ? w("", !0) : (f(), E(W, {
						key: 2,
						icon: C(fe),
						label: C(a)("opening.draft.delete"),
						onClick: n[2] ||= (e) => _.value = !0
					}, null, 8, ["icon", "label"]))
				], 2),
				e.hostError === null ? w("", !0) : (f(), b("p", {
					key: 0,
					class: j(C(Z).error)
				}, T(C(a)("opening.errors.host", { reason: e.hostError })), 3)),
				e.saveError === null ? w("", !0) : (f(), b("p", {
					key: 1,
					class: j(C(Z).error),
					role: "alert"
				}, T(C(a)("opening.errors.save", { reason: e.saveError })), 3)),
				l.value === null ? w("", !0) : (f(), b("p", {
					key: 2,
					class: j(C(Z).error),
					role: "alert"
				}, T(l.value), 3)),
				c.value === null ? (f(), b("div", {
					key: 3,
					class: j(C(Z).work_head)
				}, [
					O("h1", { class: j(C(Z).work_title) }, T(C(a)("opening.title")), 3),
					O("p", { class: j(C(Z).work_description) }, T(C(a)("opening.empty_hint")), 3),
					O("div", { class: j(C(Z).row) }, [L(G, {
						icon: C(ue),
						label: C(a)("opening.draft.new"),
						variant: "primary",
						onClick: g
					}, null, 8, ["icon", "label"])], 2)
				], 2)) : c.value.started ? Ae.value !== null && Y.value !== null ? (f(), b(P, { key: 5 }, [
					ze.value ? (f(), b("div", {
						key: 0,
						class: j(C(Z).editor)
					}, [L(H, {
						label: C(a)("opening.draft.description_label"),
						hint: C(a)("opening.draft.description_change_hint")
					}, {
						default: M(({ fieldId: e, describedBy: t }) => [p(O("textarea", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => Ve.value = e,
							class: j(C(Z).text_area),
							maxlength: Vt,
							"aria-describedby": t
						}, null, 10, kt), [[x, Ve.value]]), O("div", { class: j(C(Z).counter) }, T(Ve.value.length) + " / " + T(Vt), 3)]),
						_: 1
					}, 8, ["label", "hint"]), O("div", { class: j(C(Z).row) }, [
						O("span", { class: j(C(Z).spacer) }, null, 2),
						L(G, {
							label: C(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[6] ||= (e) => ze.value = !1
						}, null, 8, ["label"]),
						L(G, {
							label: C(a)("common.actions.save"),
							variant: "primary",
							disabled: J.value !== null || Ve.value.trim() === "" || Ve.value === c.value.description,
							onClick: We
						}, null, 8, ["label", "disabled"])
					], 2)], 2)) : w("", !0),
					O("nav", {
						class: j(C(Z).steps),
						"aria-label": C(a)("opening.steps.label")
					}, [(f(!0), b(P, null, m(c.value.steps, (e, t) => (f(), b("button", {
						key: e.id,
						type: "button",
						class: j(["tc-interactive", C(Z).step]),
						"data-state": c.value.states[t]?.status,
						"aria-current": t === c.value.current ? "step" : void 0,
						disabled: !Ie(t) || J.value !== null,
						onClick: (e) => Le(t)
					}, [
						O("span", { class: j(C(Z).step_number) }, [c.value.states[t]?.status === "done" ? (f(), E(re, {
							key: 0,
							icon: C(ie),
							size: 13
						}, null, 8, ["icon"])) : (f(), b(P, { key: 1 }, [F(T(t + 1), 1)], 64))], 2),
						O("span", { class: j(C(Z).step_label) }, T(e.name), 3),
						O("span", { class: j(C(Z).step_tag) }, T(Fe(c.value.states[t]?.status ?? "")), 3)
					], 10, jt))), 128))], 10, At),
					Ne.value ? (f(), b("div", {
						key: 1,
						class: j(C(Z).banner)
					}, [O("span", null, T(C(a)("opening.steps.stale_banner")), 1), L(G, {
						icon: C(V),
						label: C(a)("opening.steps.regenerate_stale"),
						pending: J.value !== null,
						onClick: n[7] ||= (t) => e.flow.regenerate_stale(c.value)
					}, null, 8, [
						"icon",
						"label",
						"pending"
					])], 2)) : w("", !0),
					O("div", { class: j(C(Z).work_head) }, [O("h1", { class: j(C(Z).work_title) }, T(Ae.value.name), 3), O("p", { class: j(C(Z).work_description) }, T(Ae.value.instruction), 3)], 2),
					(f(!0), b(P, null, m(Y.value.answers, (t, n) => (f(), b("div", {
						key: n,
						class: j(C(Z).answered)
					}, [
						O("span", { class: j(C(Z).answered_question) }, T(C(a)("opening.ask.answered", {
							n: n + 1,
							question: t.question.text
						})), 3),
						O("span", { class: j(C(Z).answered_answer) }, T(ct(t.selected, t.other)), 3),
						L(G, {
							icon: C(le),
							label: C(a)("opening.ask.change"),
							variant: "ghost",
							disabled: J.value !== null,
							onClick: (t) => e.flow.reask(c.value, c.value.current, n)
						}, null, 8, [
							"icon",
							"label",
							"disabled",
							"onClick"
						])
					], 2))), 128)),
					J.value === null ? w("", !0) : (f(), b("div", {
						key: 2,
						class: j(C(Z).row)
					}, [O("p", {
						class: j(C(Z).hint),
						role: "status"
					}, T(J.value.kind === "question" ? C(a)("opening.status.asking") : J.value.kind === "generate" ? C(a)("opening.status.generating", { step: c.value.steps[J.value.step]?.name ?? "" }) : C(a)("opening.status.rewriting")), 3), L(G, {
						icon: C(Oe),
						label: C(a)("opening.status.stop"),
						variant: "ghost",
						onClick: n[8] ||= (t) => e.flow.cancel(c.value)
					}, null, 8, ["icon", "label"])], 2)),
					J.value === null && e.flow.dropped(c.value.id) > 0 && Me.value ? (f(), b("p", {
						key: 3,
						class: j(C(Z).hint),
						role: "status"
					}, T(C(a)("opening.status.dropped", { n: e.flow.dropped(c.value.id) })), 3)) : w("", !0),
					ke.value === null ? w("", !0) : (f(), b("div", {
						key: 4,
						class: j(C(Z).banner),
						role: "alert"
					}, [O("span", null, T(Pe(ke.value)), 1), Y.value.status === "asking" && Y.value.question === null ? (f(), E(G, {
						key: 0,
						icon: C(V),
						label: C(a)("opening.status.retry"),
						onClick: n[9] ||= (t) => e.flow.run_step(c.value, c.value.current)
					}, null, 8, ["icon", "label"])) : w("", !0)], 2)),
					Y.value.question === null ? Y.value.status === "pending" && J.value === null ? (f(), b("div", {
						key: 6,
						class: j(C(Z).row)
					}, [L(G, {
						icon: C(de),
						label: C(a)("opening.steps.run"),
						variant: "primary",
						onClick: n[16] ||= (t) => e.flow.run_step(c.value, c.value.current)
					}, null, 8, ["icon", "label"])], 2)) : w("", !0) : (f(), b("div", {
						key: 5,
						class: j(C(Z).ask)
					}, [
						O("div", { class: j(C(Z).ask_head) }, [
							O("h2", { class: j(C(Z).ask_title) }, T(Y.value.question.text), 3),
							O("span", { class: j(C(Z).badge) }, T(Y.value.question.multiple ? C(a)("opening.ask.multiple") : C(a)("opening.ask.single")), 3),
							O("span", { class: j(C(Z).spacer) }, null, 2),
							O("span", { class: j(C(Z).hint) }, T(Y.value.answers.length < Ae.value.max_rounds ? C(a)("opening.ask.round", {
								n: Y.value.answers.length + 1,
								max: Ae.value.max_rounds
							}) : C(a)("opening.ask.round_more", { n: Y.value.answers.length + 1 })), 3)
						], 2),
						Y.value.question.why === "" ? w("", !0) : (f(), b("p", {
							key: 0,
							class: j(C(Z).hint)
						}, T(Y.value.question.why), 3)),
						O("div", {
							class: j(C(Z).options),
							role: Y.value.question.multiple ? "group" : "radiogroup",
							"aria-label": Y.value.question.text
						}, [(f(!0), b(P, null, m(Y.value.question.options, (e) => (f(), b("button", {
							key: e.label,
							type: "button",
							class: j(["tc-interactive", C(Z).option]),
							role: Y.value.question.multiple ? "checkbox" : "radio",
							"aria-checked": X.value.includes(e.label),
							disabled: J.value !== null,
							onClick: (t) => at(e.label)
						}, [
							O("span", {
								class: j(C(Z).option_mark),
								"data-shape": Y.value.question.multiple ? "box" : "radio"
							}, [X.value.includes(e.label) ? (f(), E(re, {
								key: 0,
								icon: C(ie),
								size: 13
							}, null, 8, ["icon"])) : w("", !0)], 10, Pt),
							O("span", { class: j(C(Z).option_label) }, T(e.label), 3),
							O("span", { class: j(C(Z).option_detail) }, T(e.detail), 3)
						], 10, Nt))), 128))], 10, Mt),
						L(H, { label: C(a)("opening.ask.other_label") }, {
							default: M(({ fieldId: e }) => [p(O("input", {
								id: e,
								"onUpdate:modelValue": n[10] ||= (e) => Ke.value = e,
								class: j(C(Z).input),
								maxlength: "500",
								placeholder: C(a)("opening.ask.other_placeholder")
							}, null, 10, Ft), [[x, Ke.value]])]),
							_: 1
						}, 8, ["label"]),
						Ye.value ? (f(), b("div", {
							key: 1,
							class: j(C(Z).ask)
						}, [L(H, {
							label: C(a)("opening.ask.refine_label"),
							hint: C(a)("opening.ask.refine_hint")
						}, {
							default: M(({ fieldId: e, describedBy: t }) => [p(O("input", {
								id: e,
								"onUpdate:modelValue": n[11] ||= (e) => Qe.value = e,
								class: j(C(Z).input),
								maxlength: "500",
								"aria-describedby": t,
								placeholder: C(a)("opening.ask.refine_placeholder"),
								onKeydown: te($e, ["enter"])
							}, null, 42, It), [[x, Qe.value]])]),
							_: 1
						}, 8, ["label", "hint"]), O("div", { class: j(C(Z).row) }, [
							L(G, {
								label: C(a)("common.actions.cancel"),
								variant: "ghost",
								onClick: n[12] ||= (e) => Ye.value = !1
							}, null, 8, ["label"]),
							O("span", { class: j(C(Z).spacer) }, null, 2),
							L(G, {
								icon: C(V),
								label: C(a)("opening.ask.refine_start"),
								variant: "primary",
								disabled: J.value !== null,
								onClick: $e
							}, null, 8, [
								"icon",
								"label",
								"disabled"
							])
						], 2)], 2)) : w("", !0),
						O("div", { class: j(C(Z).row) }, [
							L(G, {
								icon: C(pe),
								label: C(a)("opening.ask.cancel"),
								variant: "ghost",
								disabled: J.value !== null,
								onClick: n[13] ||= (t) => e.flow.cancel_question(c.value)
							}, null, 8, [
								"icon",
								"label",
								"disabled"
							]),
							L(G, {
								icon: C(V),
								label: C(a)("opening.ask.refine"),
								variant: "ghost",
								disabled: J.value !== null || Ye.value,
								onClick: n[14] ||= (e) => Ye.value = !0
							}, null, 8, [
								"icon",
								"label",
								"disabled"
							]),
							L(G, {
								icon: C(Te),
								label: C(a)("opening.ask.skip"),
								variant: "ghost",
								disabled: J.value !== null,
								onClick: n[15] ||= (t) => e.flow.skip(c.value)
							}, null, 8, [
								"icon",
								"label",
								"disabled"
							]),
							O("span", { class: j(C(Z).spacer) }, null, 2),
							L(G, {
								icon: C(Ce),
								label: C(a)("opening.ask.confirm"),
								variant: "primary",
								pending: J.value !== null,
								disabled: X.value.length === 0 && Ke.value.trim() === "",
								onClick: ot
							}, null, 8, [
								"icon",
								"label",
								"pending",
								"disabled"
							])
						], 2)
					], 2)),
					Me.value && Ae.value.output === "entries" ? (f(), b("div", {
						key: 7,
						class: j(C(Z).entries)
					}, [(f(!0), b(P, null, m(Y.value.entries, (t) => (f(), E(vt, {
						key: t.id,
						entry: t,
						editing: t.id === Q.value,
						rewriting: J.value?.kind === "rewrite" && J.value.entry_id === t.id,
						disabled: J.value !== null,
						onSave: n[17] ||= (e) => lt(c.value.current, e),
						onRemove: (e) => ut(c.value.current, t.id),
						onRewrite: (n) => e.flow.rewrite_entry(c.value, c.value.current, t),
						onCancel: (e) => ft(c.value.current, t.id)
					}, null, 8, [
						"entry",
						"editing",
						"rewriting",
						"disabled",
						"onRemove",
						"onRewrite",
						"onCancel"
					]))), 128))], 2)) : w("", !0),
					Me.value && Ae.value.output === "message" && Y.value.message !== null ? (f(), b(P, { key: 8 }, [pt.value ? (f(), b("div", {
						key: 0,
						class: j(C(Z).editor)
					}, [
						L(H, { label: C(a)("opening.message.speaker_label") }, {
							default: M(({ fieldId: e }) => [p(O("input", {
								id: e,
								"onUpdate:modelValue": n[18] ||= (e) => ht.value = e,
								class: j(C(Z).input),
								maxlength: "80"
							}, null, 10, Lt), [[x, ht.value]])]),
							_: 1
						}, 8, ["label"]),
						L(H, { label: C(a)("opening.message.text_label") }, {
							default: M(({ fieldId: e }) => [p(O("textarea", {
								id: e,
								"onUpdate:modelValue": n[19] ||= (e) => gt.value = e,
								class: j(C(Z).text_area)
							}, null, 10, Rt), [[x, gt.value]])]),
							_: 1
						}, 8, ["label"]),
						O("div", { class: j(C(Z).row) }, [
							O("span", { class: j(C(Z).spacer) }, null, 2),
							L(G, {
								label: C(a)("common.actions.cancel"),
								variant: "ghost",
								onClick: n[20] ||= (e) => pt.value = !1
							}, null, 8, ["label"]),
							L(G, {
								label: C(a)("common.actions.save"),
								variant: "primary",
								disabled: ht.value.trim() === "" || gt.value.trim() === "",
								onClick: yt
							}, null, 8, ["label", "disabled"])
						], 2)
					], 2)) : (f(), b("div", {
						key: 1,
						class: j(C(Z).bubble)
					}, [O("span", { class: j(C(Z).bubble_name) }, T(Y.value.message.speaker), 3), O("p", { class: j(C(Z).bubble_text) }, T(Y.value.message.text), 3)], 2)), pt.value ? w("", !0) : (f(), b("div", {
						key: 2,
						class: j(C(Z).row)
					}, [L(G, {
						icon: C(le),
						label: C(a)("opening.message.edit"),
						disabled: J.value !== null,
						onClick: _t
					}, null, 8, [
						"icon",
						"label",
						"disabled"
					])], 2))], 64)) : w("", !0),
					Me.value && et.value ? (f(), b("div", {
						key: 9,
						class: j(C(Z).ask)
					}, [L(H, {
						label: C(a)("opening.steps.ask_more_label"),
						hint: C(a)("opening.steps.ask_more_hint")
					}, {
						default: M(({ fieldId: e, describedBy: t }) => [p(O("input", {
							id: e,
							ref_key: "more_input",
							ref: nt,
							"onUpdate:modelValue": n[21] ||= (e) => tt.value = e,
							class: j(C(Z).input),
							maxlength: "500",
							"aria-describedby": t,
							placeholder: C(a)("opening.steps.ask_more_placeholder"),
							onKeydown: te(it, ["enter"])
						}, null, 42, zt), [[x, tt.value]])]),
						_: 1
					}, 8, ["label", "hint"]), O("div", { class: j(C(Z).row) }, [
						L(G, {
							label: C(a)("common.actions.cancel"),
							variant: "ghost",
							onClick: n[22] ||= (e) => et.value = !1
						}, null, 8, ["label"]),
						O("span", { class: j(C(Z).spacer) }, null, 2),
						L(G, {
							icon: C(Ce),
							label: C(a)("opening.steps.ask_more_start"),
							variant: "primary",
							disabled: J.value !== null,
							onClick: it
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])
					], 2)], 2)) : w("", !0),
					Me.value ? (f(), b("div", {
						key: 10,
						class: j(C(Z).foot)
					}, [
						L(G, {
							icon: C(Se),
							label: C(a)("opening.steps.ask_more"),
							variant: "ghost",
							pending: J.value?.kind === "question",
							disabled: J.value !== null || et.value,
							onClick: rt
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						]),
						Ae.value.output === "entries" ? (f(), E(G, {
							key: 0,
							icon: C(ue),
							label: C(a)("opening.entry.add"),
							disabled: J.value !== null,
							onClick: n[23] ||= (e) => dt(c.value.current)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						])) : w("", !0),
						O("span", { class: j(C(Z).spacer) }, null, 2),
						L(G, {
							icon: C(V),
							label: C(a)("opening.steps.regenerate"),
							pending: J.value?.kind === "generate",
							disabled: J.value !== null,
							onClick: n[24] ||= (t) => e.flow.generate(c.value, c.value.current)
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						]),
						je.value ? w("", !0) : (f(), E(G, {
							key: 1,
							icon: C(Ce),
							label: C(a)("opening.steps.next"),
							variant: "primary",
							disabled: J.value !== null,
							onClick: n[25] ||= (t) => e.flow.next(c.value)
						}, null, 8, [
							"icon",
							"label",
							"disabled"
						]))
					], 2)) : w("", !0),
					je.value && Me.value ? (f(), b(P, { key: 11 }, [O("div", { class: j(C(Z).outputs) }, [
						O("div", { class: j(C(Z).output) }, [
							O("h3", { class: j(C(Z).output_title) }, [L(re, { icon: C(B) }, null, 8, ["icon"]), F(T(C(a)("opening.output.book_title")), 1)], 2),
							O("p", { class: j(C(Z).hint) }, T(C(a)("opening.output.book_hint", { n: bt.value.length })), 3),
							O("div", { class: j(C(Z).row) }, [L(G, {
								label: C(a)("opening.output.book_action"),
								variant: "primary",
								disabled: e.host === null || bt.value.length === 0 || J.value !== null,
								onClick: n[26] ||= (e) => Ht.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						O("div", { class: j(C(Z).output) }, [
							O("h3", { class: j(C(Z).output_title) }, [L(re, { icon: C(De) }, null, 8, ["icon"]), F(T(C(a)("opening.output.message_title")), 1)], 2),
							O("p", { class: j(C(Z).hint) }, T(C(a)("opening.output.message_hint")), 3),
							O("div", { class: j(C(Z).row) }, [L(G, {
								label: C(a)("opening.output.message_action"),
								disabled: e.host === null || xt.value === null || J.value !== null,
								onClick: n[27] ||= (e) => Gt.value = !0
							}, null, 8, ["label", "disabled"])], 2)
						], 2),
						O("div", { class: j(C(Z).output) }, [
							O("h3", { class: j(C(Z).output_title) }, [L(re, { icon: C(Ee) }, null, 8, ["icon"]), F(T(C(a)("opening.output.markdown_title")), 1)], 2),
							O("p", { class: j(C(Z).hint) }, T(C(a)("opening.output.markdown_hint")), 3),
							O("div", { class: j(C(Z).row) }, [L(G, {
								icon: C(oe),
								label: C(a)("opening.output.copy"),
								onClick: Yt
							}, null, 8, ["icon", "label"]), L(G, {
								icon: C(se),
								label: C(a)("opening.output.download"),
								variant: "ghost",
								onClick: Xt
							}, null, 8, ["icon", "label"])], 2)
						], 2)
					], 2), Ut.value === null ? w("", !0) : (f(), b("p", {
						key: 0,
						class: j(C(Z).hint),
						role: "status"
					}, T(Ut.value), 3))], 64)) : w("", !0)
				], 64)) : w("", !0) : (f(), b(P, { key: 4 }, [
					L(H, { label: C(a)("opening.draft.name_label") }, {
						default: M(({ fieldId: e }) => [O("input", {
							id: e,
							value: c.value.display_name,
							class: j(C(Z).input),
							maxlength: "60",
							onInput: n[3] ||= (e) => {
								I((t) => {
									t.display_name = e.target.value;
								}, !0);
							}
						}, null, 42, Et)]),
						_: 1
					}, 8, ["label"]),
					L(H, {
						label: C(a)("opening.draft.description_label"),
						hint: C(a)("opening.draft.description_hint")
					}, {
						default: M(({ fieldId: e, describedBy: t }) => [O("textarea", {
							id: e,
							value: c.value.description,
							class: j(C(Z).text_area),
							maxlength: Vt,
							"aria-describedby": t,
							placeholder: C(a)("opening.draft.description_placeholder"),
							onInput: n[4] ||= (e) => {
								I((t) => {
									t.description = e.target.value;
								}, !0);
							}
						}, null, 42, Dt), O("div", { class: j(C(Z).counter) }, T(c.value.description.length) + " / " + T(Vt), 3)]),
						_: 1
					}, 8, ["label", "hint"]),
					O("div", { class: j(C(Z).grid3) }, [
						L(H, { label: C(a)("opening.settings.template_label") }, {
							default: M(({ fieldId: e }) => [L(ae, {
								id: e,
								"model-value": ne.value,
								options: R.value,
								placeholder: C(a)("opening.settings.template_label"),
								"onUpdate:modelValue": z
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						L(H, { label: C(a)("opening.settings.connection_label") }, {
							default: M(({ fieldId: e }) => [L(ae, {
								id: e,
								"model-value": U.value,
								options: me.value,
								placeholder: C(a)("opening.settings.connection_label"),
								"onUpdate:modelValue": ge
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"]),
						L(H, { label: C(a)("opening.settings.preset_label") }, {
							default: M(({ fieldId: e }) => [L(ae, {
								id: e,
								"model-value": c.value.preset_name,
								options: _e.value,
								placeholder: C(a)("opening.settings.preset_label"),
								"onUpdate:modelValue": ve
							}, null, 8, [
								"id",
								"model-value",
								"options",
								"placeholder"
							])]),
							_: 1
						}, 8, ["label"])
					], 2),
					L(H, {
						label: C(a)("opening.settings.worldbooks_label"),
						hint: C(a)("opening.settings.worldbooks_hint")
					}, {
						default: M(() => [e.lists.books.length > 0 ? (f(), b("div", {
							key: 0,
							class: j(C(Z).row)
						}, [(f(!0), b(P, null, m(e.lists.books, (e) => (f(), b("button", {
							key: e,
							type: "button",
							class: j(["tc-interactive", C(Z).chip_toggle]),
							"aria-pressed": c.value.worldbooks.includes(e),
							onClick: (t) => be(e)
						}, [L(re, {
							icon: C(B),
							size: 14
						}, null, 8, ["icon"]), F(T(e), 1)], 10, Ot))), 128))], 2)) : (f(), b("p", {
							key: 1,
							class: j(C(Z).hint)
						}, T(C(a)("opening.settings.no_worldbooks")), 3))]),
						_: 1
					}, 8, ["label", "hint"]),
					L(H, {
						label: C(a)("opening.settings.card_label"),
						hint: C(a)("opening.settings.card_hint")
					}, {
						default: M(() => [O("div", { class: j(C(Z).row) }, [L(ce, {
							"model-value": c.value.card !== null,
							label: c.value.card === null ? K.value === null ? C(a)("opening.settings.card_none") : C(a)("opening.settings.card_use", { name: K.value.name }) : C(a)("opening.settings.card_use", { name: c.value.card.name }),
							disabled: c.value.card === null && K.value === null,
							"onUpdate:modelValue": xe
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						]), L(ce, {
							"model-value": c.value.use_greeting,
							label: C(a)("opening.settings.greeting_use"),
							disabled: c.value.card === null || c.value.card.first_message.trim() === "",
							"onUpdate:modelValue": q
						}, null, 8, [
							"model-value",
							"label",
							"disabled"
						])], 2)]),
						_: 1
					}, 8, ["label", "hint"]),
					O("div", { class: j(C(Z).row) }, [
						O("span", { class: j(C(Z).spacer) }, null, 2),
						O("span", { class: j(C(Z).hint) }, T(C(a)("opening.draft.step_count", { n: c.value.steps.length })), 3),
						L(G, {
							icon: C(de),
							label: C(a)("opening.draft.start"),
							variant: "primary",
							pending: J.value !== null,
							disabled: c.value.description.trim() === "",
							onClick: Re
						}, null, 8, [
							"icon",
							"label",
							"pending",
							"disabled"
						])
					], 2)
				], 64))
			], 2)], 2), c.value !== null && c.value.started ? (f(), b("aside", {
				key: 0,
				class: j(C(Z).known),
				"data-open": Zt.value ? "" : void 0,
				"aria-label": C(a)("opening.known.label")
			}, [
				O("div", { class: j(C(Z).known_block) }, [O("h3", { class: j(C(Z).known_title) }, T(C(a)("opening.known.settled")), 3), (f(!0), b(P, null, m(c.value.steps, (e, t) => (f(), b(P, { key: e.id }, [t !== c.value.current && (c.value.states[t]?.entries.length ?? 0) > 0 ? (f(), b("div", {
					key: 0,
					class: j(C(Z).known_line)
				}, [
					O("strong", null, T(e.name), 1),
					n[32] ||= O("br", null, null, -1),
					F(T((c.value.states[t]?.entries ?? []).map((e) => e.title).join(C(a)("opening.ask.joiner"))), 1)
				], 2)) : w("", !0)], 64))), 128))], 2),
				Y.value !== null && Y.value.answers.length > 0 ? (f(), b("div", {
					key: 0,
					class: j(C(Z).known_block)
				}, [O("h3", { class: j(C(Z).known_title) }, T(C(a)("opening.known.answered")), 3), (f(!0), b(P, null, m(Y.value.answers, (e, t) => (f(), b("div", {
					key: t,
					class: j(C(Z).known_line)
				}, T(ct(e.selected, e.other)), 3))), 128))], 2)) : w("", !0),
				O("div", { class: j(C(Z).known_block) }, [O("h3", { class: j(C(Z).known_title) }, T(C(a)("opening.known.draft")), 3), O("div", { class: j(C(Z).known_line) }, [
					F(T(C(a)("opening.known.connection", { name: we(c.value) })), 1),
					n[34] ||= O("br", null, null, -1),
					F(T(C(a)("opening.known.preset", { name: c.value.preset_name === "in_use" ? C(a)("opening.settings.preset_in_use") : c.value.preset_name })), 1),
					n[35] ||= O("br", null, null, -1),
					c.value.card === null ? w("", !0) : (f(), b(P, { key: 0 }, [F(T(c.value.use_greeting ? C(a)("opening.known.card_greeting", { name: c.value.card.name }) : C(a)("opening.known.card", { name: c.value.card.name })), 1), n[33] ||= O("br", null, null, -1)], 64)),
					F(T(c.value.worldbooks.length === 0 ? C(a)("opening.known.no_books") : C(a)("opening.known.books", { names: c.value.worldbooks.join(C(a)("opening.ask.joiner")) })), 1)
				], 2)], 2)
			], 10, Bt)) : w("", !0)], 2),
			e.host !== null && c.value !== null ? (f(), E(St, {
				key: 0,
				open: Ht.value,
				"onUpdate:open": n[28] ||= (e) => Ht.value = e,
				host: e.host,
				entries: bt.value,
				"default-name": c.value.display_name,
				lists: e.lists,
				written: c.value.written,
				onWritten: Wt
			}, null, 8, [
				"open",
				"host",
				"entries",
				"default-name",
				"lists",
				"written"
			])) : w("", !0),
			L(ye, {
				open: Gt.value,
				"onUpdate:open": n[29] ||= (e) => Gt.value = e,
				title: C(a)("opening.output.append_title"),
				description: qt.value === null ? C(a)("opening.output.append_no_chat") : C(a)("opening.output.append_description", {
					chat: qt.value,
					speaker: xt.value?.speaker ?? ""
				}),
				"confirm-label": C(a)("opening.output.append_confirm"),
				"cancel-label": C(a)("common.actions.cancel"),
				pending: Kt.value,
				destructive: !1,
				onConfirm: n[30] ||= (e) => qt.value === null ? Gt.value = !1 : Jt()
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			L(ye, {
				open: _.value,
				"onUpdate:open": n[31] ||= (e) => _.value = e,
				title: C(a)("opening.draft.delete_title", { name: c.value?.display_name ?? "" }),
				description: C(a)("opening.draft.delete_description"),
				"confirm-label": C(a)("common.actions.delete"),
				"cancel-label": C(a)("common.actions.cancel"),
				pending: S.value,
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
}), Ut = ["aria-label"], Wt = ["aria-current", "onClick"], Gt = ["id", "value"], Kt = [
	"value",
	"disabled",
	"aria-label",
	"onInput"
], qt = [
	"value",
	"disabled",
	"aria-label",
	"placeholder",
	"onInput"
], Jt = /* @__PURE__ */ I({
	__name: "OpeningTemplates",
	props: /*@__PURE__*/ d({
		store: {},
		templates: {},
		saveError: {}
	}, {
		section: { required: !0 },
		sectionModifiers: {}
	}),
	emits: ["update:section"],
	setup(e) {
		let t = e, n = v(e, "section"), { t: r } = ee(), i = N(Be), a = A(() => t.templates.find((e) => e.id === i.value) ?? t.templates[0] ?? null), o = A(() => a.value !== null && !a.value.builtin), s = A(() => [{
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
		function p() {
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
		let _ = N(!1);
		async function y() {
			let e = a.value;
			e !== null && !e.builtin && (await t.store.remove(e.id), _.value = !1, i.value = Be);
		}
		return (t, v) => (f(), b("div", { class: j(C(Z).layout) }, [
			O("aside", {
				class: j(C(Z).aside),
				"aria-label": C(r)("opening.templates.list_label")
			}, [
				L(G, {
					class: j(C(Z).aside_new),
					icon: C(ue),
					label: C(r)("opening.templates.new"),
					onClick: v[0] ||= (e) => c(null)
				}, null, 8, [
					"class",
					"icon",
					"label"
				]),
				O("div", { class: j(C(Z).aside_title) }, T(C(r)("opening.templates.list_title")), 3),
				(f(!0), b(P, null, m(e.templates, (e) => (f(), b("button", {
					key: e.id,
					type: "button",
					class: j(["tc-interactive", C(Z).item]),
					"aria-current": e.id === a.value?.id ? "true" : void 0,
					onClick: (t) => i.value = e.id
				}, [O("span", { class: j(C(Z).item_name) }, T(e.display_name), 3), O("span", { class: j(C(Z).item_meta) }, T(e.builtin ? C(r)("opening.templates.builtin_meta", { n: e.steps.length }) : C(r)("opening.templates.meta", { n: e.steps.length })), 3)], 10, Wt))), 128))
			], 10, Ut),
			O("div", { class: j(C(Z).work) }, [a.value === null ? w("", !0) : (f(), b("div", {
				key: 0,
				class: j(C(Z).work_inner)
			}, [
				O("div", { class: j(C(Z).topline) }, [
					L(Xe, {
						modelValue: n.value,
						"onUpdate:modelValue": v[1] ||= (e) => n.value = e
					}, null, 8, ["modelValue"]),
					O("span", { class: j(C(Z).spacer) }, null, 2),
					L(G, {
						icon: C(oe),
						label: C(r)("opening.templates.copy"),
						variant: "ghost",
						onClick: v[2] ||= (e) => c(a.value)
					}, null, 8, ["icon", "label"]),
					o.value ? (f(), E(W, {
						key: 0,
						icon: C(fe),
						label: C(r)("opening.templates.delete"),
						destructive: "",
						onClick: v[3] ||= (e) => _.value = !0
					}, null, 8, ["icon", "label"])) : w("", !0)
				], 2),
				e.saveError === null ? w("", !0) : (f(), b("p", {
					key: 0,
					class: j(C(Z).error),
					role: "alert"
				}, T(C(r)("opening.errors.save", { reason: e.saveError })), 3)),
				O("div", { class: j(C(Z).work_head) }, [o.value ? (f(), E(H, {
					key: 1,
					label: C(r)("opening.templates.name_label")
				}, {
					default: M(({ fieldId: e }) => [O("input", {
						id: e,
						value: a.value.display_name,
						class: j(C(Z).input),
						maxlength: "60",
						onInput: v[4] ||= (e) => {
							l((t) => {
								t.display_name = e.target.value;
							}, !0);
						}
					}, null, 42, Gt)]),
					_: 1
				}, 8, ["label"])) : (f(), b("h1", {
					key: 0,
					class: j(C(Z).work_title)
				}, T(a.value.display_name), 3)), O("p", { class: j(C(Z).work_description) }, T(o.value ? C(r)("opening.templates.hint") : C(r)("opening.templates.builtin_hint")), 3)], 2),
				(f(!0), b(P, null, m(a.value.steps, (e, t) => (f(), b("div", {
					key: e.id,
					class: j(C(Z).template_step)
				}, [
					O("span", { class: j(C(Z).template_number) }, T(t + 1), 3),
					O("div", { class: j(C(Z).template_fields) }, [O("input", {
						value: e.name,
						class: j(C(Z).input),
						maxlength: "40",
						disabled: !o.value,
						"aria-label": C(r)("opening.templates.step_name", { n: t + 1 }),
						onInput: (e) => {
							u(t, (t) => {
								t.name = e.target.value;
							}, !0);
						}
					}, null, 42, Kt), O("textarea", {
						value: e.instruction,
						class: j(C(Z).text_area_small),
						maxlength: "2000",
						disabled: !o.value,
						"aria-label": C(r)("opening.templates.step_instruction", { n: t + 1 }),
						placeholder: C(r)("opening.templates.instruction_placeholder"),
						onInput: (e) => {
							u(t, (t) => {
								t.instruction = e.target.value;
							}, !0);
						}
					}, null, 42, qt)], 2),
					O("div", { class: j(C(Z).template_side) }, [
						O("span", { class: j(C(Z).hint) }, T(C(r)("opening.templates.rounds_label")), 3),
						L(ve, {
							"model-value": e.max_rounds,
							label: C(r)("opening.templates.rounds_label"),
							"increment-label": C(r)("opening.templates.rounds_up"),
							"decrement-label": C(r)("opening.templates.rounds_down"),
							min: 0,
							max: C(3),
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
						L(ae, {
							"model-value": e.output,
							options: s.value,
							placeholder: C(r)("opening.templates.output_label"),
							"aria-label": C(r)("opening.templates.output_label"),
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
						o.value ? (f(), b("div", {
							key: 0,
							class: j(C(Z).row)
						}, [
							L(W, {
								icon: C(we),
								label: C(r)("opening.templates.move_up"),
								size: "sm",
								disabled: t === 0,
								onClick: (e) => d(t, -1)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]),
							L(W, {
								icon: C(q),
								label: C(r)("opening.templates.move_down"),
								size: "sm",
								disabled: t === a.value.steps.length - 1,
								onClick: (e) => d(t, 1)
							}, null, 8, [
								"icon",
								"label",
								"disabled",
								"onClick"
							]),
							L(W, {
								icon: C(fe),
								label: C(r)("opening.templates.remove_step"),
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
						], 2)) : w("", !0)
					], 2)
				], 2))), 128)),
				o.value ? (f(), b("div", {
					key: 1,
					class: j(C(Z).row)
				}, [L(G, {
					icon: C(ue),
					label: C(r)("opening.templates.add_step"),
					disabled: a.value.steps.length >= C(12),
					onClick: p
				}, null, 8, [
					"icon",
					"label",
					"disabled"
				])], 2)) : w("", !0)
			], 2))], 2),
			L(ye, {
				open: _.value,
				"onUpdate:open": v[5] ||= (e) => _.value = e,
				title: C(r)("opening.templates.delete_title", { name: a.value?.display_name ?? "" }),
				description: C(r)("opening.templates.delete_description"),
				"confirm-label": C(r)("common.actions.delete"),
				"cancel-label": C(r)("common.actions.cancel"),
				onConfirm: y
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			])
		], 2));
	}
}), $ = { type: "string" }, Yt = {
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
}, Xt = {
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
}, Zt = {
	name: "tavern_canvas_opening_entries",
	value: {
		type: "object",
		properties: { entries: {
			type: "array",
			items: Xt
		} },
		required: ["entries"],
		additionalProperties: !1
	}
}, Qt = {
	name: "tavern_canvas_opening_entry",
	value: {
		type: "object",
		properties: { entry: Xt },
		required: ["entry"],
		additionalProperties: !1
	}
}, $t = {
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
}, en = [
	"[Inkwell opening builder]",
	"You help the user build the opening of a roleplay story one step at a time: its world, characters, rules and first scene.",
	"Write every value in the language of the user's description.",
	"The user's own character is {{user}}. Refer to them only as {{user}} and never decide their appearance, personality or past.",
	"Keep everything consistent with what is settled below and with any world info you were given."
];
function tn(e) {
	let t = [...e.selected, ...e.other.trim() === "" ? [] : [e.other.trim()]];
	return `- Q: ${e.question.text}\n  A: ${t.length === 0 ? "(left to you)" : t.join("; ")}`;
}
function nn(e) {
	let t = e.constant ? "always active" : `keys: ${e.keys.join(", ")}`;
	return `- ${e.title} (${t}): ${e.content}`;
}
function rn(e, t) {
	let n = [];
	return e.steps.slice(0, t).forEach((t, r) => {
		let i = e.states[r];
		i === void 0 || i.status !== "done" && i.status !== "stale" || (n.push(`## ${t.name}`), n.push(...i.entries.map(nn)), i.message !== null && n.push(`- Opening message by ${i.message.speaker}: ${i.message.text}`));
	}), n.length === 0 ? ["(nothing yet)"] : n;
}
function an(e) {
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
function on(e, t) {
	let n = e.steps[t], r = e.states[t];
	if (n === void 0 || r === void 0) throw RangeError(`The draft has no step ${String(t)}`);
	return [
		...en,
		"",
		"The user's description:",
		e.description.trim(),
		...an(e),
		"",
		"Settled so far:",
		...rn(e, t),
		"",
		`Current step: ${n.name}`,
		`What this step settles: ${n.instruction}`,
		"",
		"Answers given in this step:",
		...r.answers.length === 0 ? ["(none)"] : r.answers.map(tn)
	];
}
function sn(e) {
	let { card: t } = e;
	return [
		e.description,
		...t === null ? [] : [t.description, t.scenario],
		...t !== null && e.use_greeting ? [t.first_message] : [],
		...e.states.flatMap((e) => [...e.answers.flatMap((e) => [...e.selected, e.other]), ...e.entries.map((e) => `${e.title} ${e.content}`)])
	].join("\n");
}
function cn(e, t, n, r) {
	for (let r of ge(e, t)) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let t = n.safeParse(e);
		if (t.success) return t.data;
	}
	throw new he(`The reply contains no ${r} JSON object`, e);
}
var ln = o((e) => typeof e == "object" && e && "options" in e && Array.isArray(e.options) ? {
	...e,
	options: e.options.slice(0, 5)
} : e, Y), un = t({
	title: n().trim().min(1).max(120),
	constant: r(),
	keys: s(n()).transform((e) => [...new Set(e.map((e) => e.trim()).filter((e) => e !== ""))].slice(0, 12)),
	content: n().trim().min(1).max(8e3)
}), dn = 30;
function fn(e) {
	return {
		id: crypto.randomUUID(),
		...e,
		keys: e.constant ? [] : e.keys
	};
}
function pn(e, t) {
	let n = e.slice(0, dn).flatMap((e) => {
		let t = un.safeParse(e);
		return t.success ? [fn(t.data)] : [];
	});
	if (n.length === 0) throw new he("The reply contains no valid entry", t);
	return {
		entries: n,
		dropped: e.length - n.length
	};
}
function mn(e, t) {
	return e.filter((e) => e.name === t).flatMap((e) => {
		try {
			return [JSON.parse(e.arguments)];
		} catch {
			return [null];
		}
	});
}
var hn = [
	"- One entry per distinct thing: the world overview, each faction, each place, each character, each group of rules.",
	"- title: '<kind>｜<name>', both in the language of the description, for example a faction, a place or a character.",
	"- constant: true only for what must always be in context: the world overview, hard rules of the world, narration and style requirements, content boundaries. Otherwise false.",
	"- keys: when constant is false, 1 to 5 words or names that appear in the story whenever this entry matters; [] when constant is true.",
	"- content: self-contained prose a storyteller can rely on, without referring to other entries by number."
], gn = [
	"The opening message is the first message of the roleplay, sent by the character who meets {{user}} first.",
	"- speaker: that character's name.",
	"- text: the whole message, following the narration person, style and length settled above, ending at a moment {{user}} can answer. Do not speak or act for {{user}}."
], _n = ["Ask only about a choice that changes what this step writes and that the description and the answers leave open. Never ask about anything already settled.", "A question has the question text, a one-sentence reason it matters (why), and 3 or 4 options, each a short label with a one-sentence detail. Set multiple to true only when several options can hold at once. Do not add an 'other' option; the user can always type their own."], vn = "ask_question", yn = "add_entry", bn = t({ entries: s(u()).min(1) });
function xn(e, t) {
	let n = [
		...on(e, t),
		"",
		"Now write this step's result as world book entries.",
		...hn
	], r = (e) => pn(cn(e, "entries", bn, "entries").entries, e);
	return {
		user_input: [...n, "Reply with only a JSON object of the form {\"entries\": [...]}."].join("\n"),
		json_schema: Zt,
		parse: r,
		tools: {
			tools: [{
				name: yn,
				description: "Add one world book entry.",
				parameters: Xt
			}],
			choice: "required",
			user_input: [...n, `Call ${yn} once for each entry, all in this reply.`].join("\n"),
			parse: (e, t) => {
				let n = mn(e, yn);
				return n.length === 0 ? r(t) : pn(n, t);
			}
		}
	};
}
var Sn = {
	name: "tavern_canvas_opening_question",
	value: {
		type: "object",
		properties: { question: Yt },
		required: ["question"],
		additionalProperties: !1
	}
}, Cn = t({ question: u() });
function wn(e, t) {
	let n = ln.safeParse(e);
	if (!n.success) throw new he("The reply contains no well-formed question", t);
	return n.data;
}
function Tn(e) {
	return e.length === 0 ? [] : [
		"",
		"The user turned down these questions in this step, oldest first:",
		...e.flatMap((e, t) => [
			`${String(t + 1)}. ${e.question.text}`,
			`   Options: ${e.question.options.map((e) => e.label).join(" / ")}`,
			e.feedback.trim() === "" ? "   The user gave no reason." : `   The user's feedback: ${e.feedback.trim()}`
		]),
		"Ask one new question that follows the latest feedback. Do not repeat a question or option the user turned down."
	];
}
function En(e, t, n, r) {
	let i = e.states[t], a = i?.message == null ? (i?.entries ?? []).map(nn) : [`${i.message.speaker}: ${i.message.text}`], o = [
		...on(e, t),
		"",
		"This step's current result:",
		...a.length === 0 ? ["(none yet)"] : a,
		"",
		a.length === 0 ? "The user wants to be asked one more question before the step is written." : "The user has read this result and wants to be asked one more question before the step is written again.",
		n.trim() === "" ? "Ask about the open choice whose answer would change the result the most: something the description and the answers left to you, or a decision in the result the user may want to make differently." : `The user wants the question to be about: ${n.trim()}. Ask about the choice within that which would change the result the most.`,
		...Tn(r),
		..._n
	], s = (e) => wn(cn(e, "question", Cn, "question").question, e);
	return {
		user_input: [...o, "Reply with only a JSON object of the form {\"question\": {...}}."].join("\n"),
		json_schema: Sn,
		parse: s,
		tools: {
			tools: [{
				name: vn,
				description: "Ask the user one question with options.",
				parameters: Yt
			}],
			choice: { name: vn },
			user_input: [...o, `Call ${vn} once.`].join("\n"),
			parse: (e, t) => {
				let [n] = mn(e, vn);
				return n === void 0 ? s(t) : wn(n, t);
			}
		}
	};
}
var Dn = "step_ready", On = {
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
}, kn = {
	name: "tavern_canvas_opening_next",
	value: {
		type: "object",
		properties: {
			aspects: On,
			question: { anyOf: [Yt, { type: "null" }] }
		},
		required: ["aspects", "question"],
		additionalProperties: !1
	}
}, An = s(t({
	aspect: n().trim().min(1),
	settled: r()
})).min(1), jn = t({
	aspects: u(),
	question: u()
});
function Mn(e, t, n) {
	let r = An.safeParse(e);
	if (!r.success) throw new he("The reply lists no aspects of the step", n);
	if (t != null) return wn(t, n);
	if (r.data.some((e) => !e.settled)) throw new he("The reply leaves an aspect open without asking about it", n);
	return null;
}
function Nn(e, t, n) {
	let r = [
		...on(e, t),
		"",
		"Before this step is written, check what it still needs from the user.",
		"First list 2 to 6 aspects this step must settle, taken from what this step settles, each a few words in the language of the description.",
		"An aspect is settled only when the user's description, a settled earlier step or an answer in this step states it. An aspect you would have to choose yourself is not settled.",
		`If any aspect is not settled, ask one question about the most important one; at most ${String(n)} more questions may be asked in this step. Only when every aspect is settled, ask nothing.`,
		..._n
	], i = (e) => {
		let t = cn(e, "aspects", jn, "question");
		return Mn(t.aspects, t.question, e);
	};
	return {
		user_input: [...r, "Reply with only a JSON object of the form {\"aspects\": [{\"aspect\": \"...\", \"settled\": true or false}, ...], \"question\": {...} or null}."].join("\n"),
		json_schema: kn,
		parse: i,
		tools: {
			tools: [{
				name: vn,
				description: "List the step's aspects and ask the user about the most important open one.",
				parameters: {
					type: "object",
					properties: {
						aspects: On,
						question: Yt
					},
					required: ["aspects", "question"],
					additionalProperties: !1
				}
			}, {
				name: Dn,
				description: "List the step's aspects when every one is settled.",
				parameters: {
					type: "object",
					properties: { aspects: On },
					required: ["aspects"],
					additionalProperties: !1
				}
			}],
			choice: "required",
			user_input: [...r, `Call ${vn} once to ask, or ${Dn} once when every aspect is settled.`].join("\n"),
			parse: (e, t) => {
				let [n] = mn(e, vn), [r] = mn(e, Dn), a = jn.partial().safeParse(n ?? r);
				return a.success ? Mn(a.data.aspects, n === void 0 ? null : a.data.question, t) : i(t);
			}
		}
	};
}
function Pn(e, n, r) {
	return {
		user_input: [
			...on(e, n),
			"",
			"Entries this step already has:",
			...(e.states[n]?.entries ?? []).map(nn),
			"",
			`Rewrite only this entry, keeping its subject and fitting everything above: ${nn(r)}`,
			...hn.slice(1),
			"Reply with only a JSON object of the form {\"entry\": {...}}."
		].join("\n"),
		json_schema: Qt,
		parse: (e) => ({
			...fn(cn(e, "entry", t({ entry: un }), "entry").entry),
			id: r.id
		})
	};
}
function Fn(e, t) {
	return {
		user_input: [
			...on(e, t),
			"",
			"Now write the opening message.",
			...gn,
			"Reply with only a JSON object of the form {\"speaker\": \"...\", \"text\": \"...\"}."
		].join("\n"),
		json_schema: $t,
		parse: (e) => cn(e, "text", Ne, "opening message")
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_flow.ts
function In(e, t) {
	let n = k(/* @__PURE__ */ new Map()), r = k(/* @__PURE__ */ new Map()), i = k(/* @__PURE__ */ new Map()), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = (e, t) => `${e.id}:${String(t)}`;
	function l(e, n, r) {
		i.set(e.id, r.kind === "entries" ? r.dropped : 0), t.edit(e, (e) => {
			let t = e.states[n];
			t !== void 0 && (t.question = null, t.status = "done", r.kind === "entries" ? t.entries = r.entries : t.message = r.message), We(e, n);
		});
	}
	function u(e) {
		return {
			connection: e.connection,
			preset_name: e.preset_name,
			worldbooks: e.worldbooks,
			text: sn(e)
		};
	}
	async function d(e, t, i) {
		if (n.has(e.id)) return "failed";
		let o = new AbortController();
		a.set(e.id, o), n.set(e.id, t), r.delete(e.id);
		try {
			return await i(o.signal), "done";
		} catch (t) {
			return t instanceof U && t.reason === "cancelled" ? "cancelled" : (r.set(e.id, t), "failed");
		} finally {
			n.delete(e.id), a.delete(e.id);
		}
	}
	function f(e, n, r) {
		t.edit(e, (e) => {
			let t = e.states[n];
			t !== void 0 && (t.status = r);
		});
	}
	function p(e, t) {
		let n = e.states[t]?.status;
		n !== void 0 && n !== "asking" && o.set(c(e, t), n);
	}
	function m(e, t) {
		let n = e.states[t], r = (n?.entries.length ?? 0) > 0 || n?.message != null;
		f(e, t, o.get(c(e, t)) ?? (r ? "done" : "pending"));
	}
	function h(e, n, r) {
		t.edit(e, (e) => {
			e.current = n;
			let t = e.states[n];
			t !== void 0 && (t.question = r, t.status = "asking");
		});
	}
	async function g(t, n) {
		let r = t.steps[n];
		if (r === void 0) return "failed";
		let i = await d(t, {
			kind: "generate",
			step: n
		}, async (i) => {
			r.output === "message" ? l(t, n, {
				kind: "message",
				message: await e.request(Fn(t, n), u(t), i)
			}) : l(t, n, {
				kind: "entries",
				...await e.request(xn(t, n), u(t), i)
			});
		});
		return s.delete(c(t, n)), i;
	}
	async function _(n, r) {
		let i = n.steps[r], a = n.states[r];
		if (i === void 0 || a === void 0) return;
		p(n, r), t.edit(n, (e) => {
			e.current = r;
			let t = e.states[r];
			t !== void 0 && (t.status = "asking");
		});
		let o = i.max_rounds - a.answers.length;
		if (o > 0) {
			let t = { value: !1 }, i = await d(n, {
				kind: "question",
				step: r
			}, async (i) => {
				let a = await e.request(Nn(n, r, o), u(n), i);
				a !== null && (t.value = !0, h(n, r, a));
			});
			if (i === "cancelled") {
				m(n, r);
				return;
			}
			if (i === "failed" || t.value) return;
		}
		await g(n, r);
	}
	async function v(t, n, r) {
		await d(t, {
			kind: "question",
			step: n
		}, async (i) => {
			h(t, n, await e.request(En(t, n, r, s.get(c(t, n)) ?? []), u(t), i));
		}) === "cancelled" && t.states[n]?.question == null && m(t, n);
	}
	return {
		busy: (e) => n.get(e) ?? null,
		error: (e) => r.get(e) ?? null,
		dropped: (e) => i.get(e) ?? 0,
		run_step: _,
		async ask_more(e, t, n) {
			p(e, t), s.delete(c(e, t)), await v(e, t, n);
		},
		async refine_question(e, t) {
			let n = e.current, r = e.states[n]?.question;
			if (r == null) return;
			let i = s.get(c(e, n)) ?? [];
			s.set(c(e, n), [...i, {
				question: r,
				feedback: t.trim()
			}]), await v(e, n, "");
		},
		cancel_question(e) {
			let n = e.current;
			t.edit(e, (e) => {
				let t = e.states[n];
				t !== void 0 && (t.question = null);
			}), s.delete(c(e, n)), m(e, n);
		},
		cancel(e) {
			a.get(e.id)?.abort();
		},
		async generate(e, t) {
			await g(e, t);
		},
		async answer(e, n, r) {
			let i = e.current, a = e.states[i]?.question;
			a != null && (s.delete(c(e, i)), t.edit(e, (e) => {
				let t = e.states[i];
				t !== void 0 && (t.answers.push({
					question: a,
					selected: [...n],
					other: r.trim()
				}), t.question = null);
			}), await _(e, i));
		},
		async skip(e) {
			s.delete(c(e, e.current)), t.edit(e, (e) => {
				let t = e.states[e.current];
				t !== void 0 && (t.question = null);
			}), await g(e, e.current);
		},
		reask(e, n, r) {
			t.edit(e, (e) => {
				let t = e.states[n], i = t?.answers[r];
				t !== void 0 && i !== void 0 && (t.answers = t.answers.slice(0, r), t.question = i.question, t.status = "asking", e.current = n, We(e, n));
			});
		},
		async next(e) {
			let n = e.current + 1, r = e.states[n];
			r !== void 0 && (t.edit(e, (e) => {
				e.current = n;
			}), r.status === "pending" && await _(e, n));
		},
		async regenerate_stale(e) {
			for (let t = 0; t < e.steps.length; t += 1) if (e.states[t]?.status === "stale" && await g(e, t) !== "done") return;
		},
		async rewrite_entry(n, r, i) {
			await d(n, {
				kind: "rewrite",
				step: r,
				entry_id: i.id
			}, async (a) => {
				let o = await e.request(Pn(n, r, i), u(n), a);
				t.edit(n, (e) => {
					let t = e.states[r]?.entries, n = t?.findIndex((e) => e.id === i.id) ?? -1;
					t !== void 0 && n >= 0 && (t[n] = o);
				});
			});
		}
	};
}
//#endregion
//#region src/ui/views/opening/use_opening_messages.ts
var Ln = {
	en: async () => (await import("./opening_en-BiQzKaaR.js")).en_messages,
	"zh-CN": async () => (await import("./opening_zh_cn-D-AiikIA.js")).zh_cn_messages
};
function Rn() {
	let e = ee({ useScope: "global" }), t = N(!1);
	async function n(n) {
		for (let t of /* @__PURE__ */ new Set(["en", n])) {
			let n = Ln[t];
			n !== void 0 && !e.te("opening.title", t) && e.mergeLocaleMessage(t, await n());
		}
		t.value = !0;
	}
	return y(e.locale, (e) => {
		n(e);
	}, { immediate: !0 }), t;
}
//#endregion
//#region src/ui/views/opening/use_opening_store.ts
var zn = 600;
function Bn(e) {
	if (e.kind === "draft") {
		let { id: t, ...n } = e;
		return Re.parse(qe(n));
	}
	let { id: t, builtin: n, ...r } = e;
	return ze.parse(qe(r));
}
function Vn(e) {
	let t = k(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
	function a(e) {
		return i.has(e.id) ? null : t.get(e.id) ?? (e.payload.kind === "template" ? Ke(e) : X(e));
	}
	let o = A(() => {
		let n = e.records().map(a).filter((e) => e !== null);
		for (let e of t.values()) n.some((t) => t.id === e.id) || n.push(e);
		return n.sort((e, t) => t.created_at.localeCompare(e.created_at));
	}), s = A(() => o.value.filter((e) => e.kind === "draft")), c = A(() => o.value.filter((e) => e.kind === "template"));
	function l(n) {
		if (i.has(n)) return null;
		let r = t.get(n);
		if (r !== void 0) return r;
		let o = e.records().find((e) => e.id === n), s = o === void 0 ? null : a(o);
		return s === null ? null : (t.set(n, s), t.get(n) ?? null);
	}
	function u(a) {
		let o = r.get(a);
		o !== void 0 && (clearTimeout(o), r.delete(a));
		let s = (n.get(a) ?? Promise.resolve()).then(async () => {
			let n = t.get(a);
			n === void 0 || i.has(a) || await e.save({
				id: a,
				category: "opening",
				record_key: a,
				display_name: n.display_name,
				payload: Bn(n)
			});
		}).catch(e.on_save_error);
		return n.set(a, s), s;
	}
	return {
		drafts: s,
		templates: c,
		draft(e) {
			let t = l(e);
			return t?.kind === "draft" ? t : null;
		},
		template(e) {
			let t = l(e);
			return t?.kind === "template" ? t : null;
		},
		async add(e) {
			t.set(e.id, e), await u(e.id);
		},
		edit(e, t, n = { debounce: !1 }) {
			let i = l(e.id);
			if (i === null) return;
			if (t(i), !n.debounce) {
				u(e.id);
				return;
			}
			let a = r.get(e.id);
			a !== void 0 && clearTimeout(a), r.set(e.id, setTimeout(() => {
				u(e.id);
			}, zn));
		},
		async remove(a) {
			r.has(a) && await u(a), i.add(a), await n.get(a), t.delete(a), n.delete(a);
			try {
				await e.remove(a);
			} finally {
				i.delete(a);
			}
		}
	};
}
//#endregion
//#region src/ui/views/opening/OpeningView.vue
var Hn = /* @__PURE__ */ I({
	__name: "OpeningView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = ee(), r = _(ne, null), i = Rn(), a = N(null);
		function o(e) {
			return e instanceof Error ? e.message : String(e);
		}
		let s = Vn({
			records: () => t.state.assets.records.opening,
			save: (e) => t.controller.save_asset("opening", e),
			remove: (e) => t.controller.remove_asset("opening", e),
			on_save_error: (e) => {
				a.value = o(e);
			}
		}), c = r === null ? null : In(r, s), l = N("build"), u = S(null), d = N(null), p = N({
			books: [],
			presets: ["in_use"],
			proxies: [],
			chat_book: null
		});
		function m() {
			let e = u.value;
			if (e !== null) try {
				p.value = {
					books: e.list_worldbooks(),
					presets: e.preset_names(),
					proxies: e.proxy_preset_names(),
					chat_book: e.chat_worldbook()
				};
			} catch (e) {
				d.value = o(e);
			}
		}
		h(async () => {
			if (r !== null) try {
				u.value = await r.host(), m();
			} catch (e) {
				d.value = o(e);
			}
		});
		function g(e) {
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
		let v = A(() => i.value ? [He(g, n("opening.builtin.name")), ...s.templates.value] : []), y = A(() => t.state.settings.settings?.world_info_overrides.no_recursion_books ?? []);
		function x(e, n) {
			let r = y.value.filter((t) => t !== e);
			t.controller.update_settings({ world_info_overrides: { no_recursion_books: n ? [...r, e] : r } });
		}
		return (e, t) => C(i) ? C(r) === null || C(c) === null ? (f(), E(K, {
			key: 1,
			status: "empty",
			"empty-title": C(n)("opening.unavailable_title"),
			"empty-message": C(n)("opening.unavailable_message")
		}, null, 8, ["empty-title", "empty-message"])) : (f(), b(P, { key: 2 }, [l.value === "build" ? (f(), E(Ht, {
			key: 0,
			section: l.value,
			"onUpdate:section": t[0] ||= (e) => l.value = e,
			store: C(s),
			flow: C(c),
			host: u.value,
			"host-error": d.value,
			lists: p.value,
			templates: v.value,
			"save-error": a.value,
			onRefreshLists: m
		}, null, 8, [
			"section",
			"store",
			"flow",
			"host",
			"host-error",
			"lists",
			"templates",
			"save-error"
		])) : l.value === "books" ? (f(), E(ot, {
			key: 1,
			section: l.value,
			"onUpdate:section": t[1] ||= (e) => l.value = e,
			host: u.value,
			"host-error": d.value,
			lists: p.value,
			"no-recursion-books": y.value,
			onRefreshLists: m,
			onSetNoRecursion: x
		}, null, 8, [
			"section",
			"host",
			"host-error",
			"lists",
			"no-recursion-books"
		])) : (f(), E(Jt, {
			key: 2,
			section: l.value,
			"onUpdate:section": t[2] ||= (e) => l.value = e,
			store: C(s),
			templates: v.value,
			"save-error": a.value
		}, null, 8, [
			"section",
			"store",
			"templates",
			"save-error"
		]))], 64)) : (f(), E(K, {
			key: 0,
			status: "loading"
		}));
	}
});
//#endregion
export { Hn as default };
