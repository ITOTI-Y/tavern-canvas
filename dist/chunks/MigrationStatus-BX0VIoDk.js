import { F as e, N as t, _ as n, ct as r, g as i, m as a, n as o, p as s, pt as c, u as l, ut as u, x as d } from "./vue-i18n-DUz2Gjn8.js";
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
var h = ["data-tone"], g = /* @__PURE__ */ d({
	__name: "MigrationStatus",
	props: { snapshot: {} },
	setup(d) {
		let g = d, { t: _ } = o(), v = s(() => Object.entries(g.snapshot?.counts ?? {})), y = s(() => v.value.reduce((e, [, t]) => e + t, 0));
		return (o, s) => (t(), n("div", {
			class: u(r(f).section),
			"data-testid": "migration-status"
		}, [
			a("div", { class: u(r(f).section_header) }, [a("h2", { class: u(r(f).section_title) }, c(r(_)("diagnostics.migration_status.title")), 3)], 2),
			d.snapshot ? (t(), n("div", {
				key: 0,
				class: u(r(f).row)
			}, [a("span", { class: u(r(f).row_label) }, c(r(_)("common.labels.status")), 3), a("span", {
				class: u(r(f).status_text),
				"data-tone": d.snapshot.state === "failed" ? "error" : "success",
				"data-testid": "migration-state"
			}, c(r(p)(r(_), d.snapshot.state)), 11, h)], 2)) : i("", !0),
			d.snapshot && y.value > 0 ? (t(), n("div", {
				key: 1,
				class: u(r(f).row)
			}, [a("span", { class: u(r(f).row_label) }, c(r(_)("diagnostics.migration_status.counts_label")), 3), a("span", { class: u(["tc-tabular-nums", r(f).row_value]) }, c(r(_)("migration.record_count", y.value)), 3)], 2)) : i("", !0),
			d.snapshot?.failure_reason ? (t(), n("div", {
				key: 2,
				class: u(r(f).row)
			}, [a("span", { class: u(r(f).row_label) }, c(r(_)("common.labels.description")), 3), a("span", {
				class: u([r(f).status_text, r(f).row_value]),
				"data-tone": "error"
			}, c(r(m)(r(_), d.snapshot.failure_reason)), 3)], 2)) : i("", !0),
			d.snapshot && d.snapshot.warnings.length > 0 ? (t(), n("div", {
				key: 3,
				class: u(r(f).warning_list)
			}, [a("span", { class: u(r(f).row_label) }, c(r(_)("diagnostics.migration_status.warnings_label")), 3), (t(!0), n(l, null, e(d.snapshot.warnings, (e, i) => (t(), n("p", {
				key: i,
				class: u(r(f).warning_item)
			}, c(e), 3))), 128))], 2)) : i("", !0),
			d.snapshot ? i("", !0) : (t(), n("p", {
				key: 4,
				class: u(r(f).description),
				"data-testid": "migration-status-unknown"
			}, c(r(_)("status.unknown")), 3))
		], 2));
	}
});
//#endregion
export { f as n, g as t };
