import { I as e, R as t, _ as n, a as r, b as i, ft as a, g as o, ht as s, p as c, ut as l, w as u, y as d } from "./AppIcon-BpY-A4VH.js";
var f = {
	view: "_view_t20r4_7",
	section: "_section_t20r4_14",
	section_header: "_section_header_t20r4_20",
	section_title: "_section_title_t20r4_28",
	row: "_row_t20r4_34",
	row_label: "_row_label_t20r4_43",
	row_value: "_row_value_t20r4_51",
	status_text: "_status_text_t20r4_56",
	timeline_list: "_timeline_list_t20r4_75",
	timeline_row: "_timeline_row_t20r4_79",
	timeline_cell: "_timeline_cell_t20r4_90",
	timeline_header: "_timeline_header_t20r4_97",
	timeline_code: "_timeline_code_t20r4_108",
	timeline_error: "_timeline_error_t20r4_113",
	warning_list: "_warning_list_t20r4_117",
	warning_item: "_warning_item_t20r4_124",
	actions_row: "_actions_row_t20r4_130",
	description: "_description_t20r4_137"
};
//#endregion
//#region src/ui/views/diagnostics/migration_labels.ts
function p(e, t) {
	switch (t) {
		case "inventory": return e("migration.journal.inventory");
		case "copying": return e("migration.journal.copying");
		case "verifying": return e("migration.journal.verifying");
		case "ready_to_switch": return e("migration.journal.ready_to_switch");
		case "completed": return e("migration.journal.completed");
		case "failed": return e("migration.journal.failed");
		case "not_required": return e("migration.journal.not_required");
	}
}
function m(e, t) {
	switch (t) {
		case "invalid_source": return e("migration.failure_reasons.invalid_source");
		case "unknown_setting_path": return e("migration.failure_reasons.unknown_setting_path");
		case "converter_error": return e("migration.failure_reasons.converter_error");
		case "missing_blob": return e("migration.failure_reasons.missing_blob");
		case "hash_mismatch": return e("migration.failure_reasons.hash_mismatch");
		case "count_mismatch": return e("migration.failure_reasons.count_mismatch");
		case "secret_transfer_blocked": return e("migration.failure_reasons.secret_transfer_blocked");
		case "switch_failed": return e("migration.failure_reasons.switch_failed");
		default: return t;
	}
}
//#endregion
//#region src/ui/views/diagnostics/MigrationStatus.vue?vue&type=script&setup=true&lang.ts
var h = ["data-tone"], g = /* @__PURE__ */ u({
	__name: "MigrationStatus",
	props: { snapshot: {} },
	setup(u) {
		let g = u, { t: _ } = r(), v = o(() => Object.entries(g.snapshot?.counts ?? {})), y = o(() => v.value.reduce((e, [, t]) => e + t, 0));
		return (r, o) => (e(), i("div", {
			class: a(l(f).section),
			"data-testid": "migration-status"
		}, [
			n("div", { class: a(l(f).section_header) }, [n("h2", { class: a(l(f).section_title) }, s(l(_)("diagnostics.migration_status.title")), 3)], 2),
			u.snapshot ? (e(), i("div", {
				key: 0,
				class: a(l(f).row)
			}, [n("span", { class: a(l(f).row_label) }, s(l(_)("common.labels.status")), 3), n("span", {
				class: a(l(f).status_text),
				"data-tone": u.snapshot.state === "failed" ? "error" : "success",
				"data-testid": "migration-state"
			}, s(l(p)(l(_), u.snapshot.state)), 11, h)], 2)) : d("", !0),
			u.snapshot && y.value > 0 ? (e(), i("div", {
				key: 1,
				class: a(l(f).row)
			}, [n("span", { class: a(l(f).row_label) }, s(l(_)("diagnostics.migration_status.counts_label")), 3), n("span", { class: a(["tc-tabular-nums", l(f).row_value]) }, s(l(_)("migration.record_count", y.value)), 3)], 2)) : d("", !0),
			u.snapshot?.failure_reason ? (e(), i("div", {
				key: 2,
				class: a(l(f).row)
			}, [n("span", { class: a(l(f).row_label) }, s(l(_)("common.labels.description")), 3), n("span", {
				class: a([l(f).status_text, l(f).row_value]),
				"data-tone": "error"
			}, s(l(m)(l(_), u.snapshot.failure_reason)), 3)], 2)) : d("", !0),
			u.snapshot && u.snapshot.warnings.length > 0 ? (e(), i("div", {
				key: 3,
				class: a(l(f).warning_list)
			}, [n("span", { class: a(l(f).row_label) }, s(l(_)("diagnostics.migration_status.warnings_label")), 3), (e(!0), i(c, null, t(u.snapshot.warnings, (t, n) => (e(), i("p", {
				key: n,
				class: a(l(f).warning_item)
			}, s(t), 3))), 128))], 2)) : d("", !0),
			u.snapshot ? d("", !0) : (e(), i("p", {
				key: 4,
				class: a(l(f).description),
				"data-testid": "migration-status-unknown"
			}, s(l(_)("status.unknown")), 3))
		], 2));
	}
});
//#endregion
export { f as n, g as t };

//# sourceMappingURL=MigrationStatus-DZ-yxWIP.js.map