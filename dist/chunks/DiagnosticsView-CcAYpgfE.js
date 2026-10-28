import { G as e, I as t, P as n, _ as r, dt as i, g as a, h as o, j as s, lt as c, m as l, mt as u, n as d, p as f, u as p, v as m, x as h, y as g } from "./vue-i18n-L-BrQRnK.js";
import { n as _ } from "./create_i18n-C2x-EsSI.js";
import { t as v } from "./AppIcon-DkyxvN8k.js";
import { n as y, r as b, t as x } from "./StateSurface-X9aRtXAT.js";
import { t as S } from "./x-D7Ry5i_D.js";
import { n as C } from "./deferred_stylesheets-BpS7LWkd.js";
import { t as w } from "./VirtualList-9A-DMhS4.js";
//#endregion
//#region src/ui/views/diagnostics/capability_labels.ts
var T = [
	"main_generation_events",
	"preset_generation",
	"message_swipe_metadata",
	"tavern_regex",
	"tavern_helper"
];
function E(e, t) {
	switch (t) {
		case "main_generation_events": return e("diagnostics.capability_matrix.capabilities.main_generation_events");
		case "preset_generation": return e("diagnostics.capability_matrix.capabilities.preset_generation");
		case "message_swipe_metadata": return e("diagnostics.capability_matrix.capabilities.message_swipe_metadata");
		case "tavern_regex": return e("diagnostics.capability_matrix.capabilities.tavern_regex");
		case "tavern_helper": return e("diagnostics.capability_matrix.capabilities.tavern_helper");
	}
}
var D = {
	view: "_view_t3z03_7",
	section: "_section_t3z03_20",
	section_header: "_section_header_t3z03_26",
	section_title: "_section_title_t3z03_34",
	row: "_row_t3z03_41",
	row_label: "_row_label_t3z03_52",
	row_value: "_row_value_t3z03_60",
	status_text: "_status_text_t3z03_65",
	timeline_list: "_timeline_list_t3z03_84",
	timeline_row: "_timeline_row_t3z03_88",
	timeline_cell: "_timeline_cell_t3z03_99",
	timeline_header: "_timeline_header_t3z03_106",
	timeline_code: "_timeline_code_t3z03_117",
	timeline_error: "_timeline_error_t3z03_122",
	warning_list: "_warning_list_t3z03_126",
	warning_item: "_warning_item_t3z03_133",
	actions_row: "_actions_row_t3z03_139",
	description: "_description_t3z03_146"
};
//#endregion
//#region src/ui/views/diagnostics/diagnostics_styles.ts
C("diagnostics", "._view_t3z03_7{gap:var(--tc-group-gap);padding:var(--tc-space-4) var(--tc-panel-padding) var(--tc-panel-padding);flex-direction:column;display:flex}@container studio-workspace (width<=640px){._view_t3z03_7{padding:var(--tc-space-4)}}._section_t3z03_20{flex-direction:column;min-width:0;display:flex}._section_header_t3z03_26{justify-content:space-between;align-items:center;gap:var(--tc-space-3);padding-bottom:var(--tc-space-3);display:flex}._section_title_t3z03_34{color:var(--tc-text);font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);line-height:var(--tc-line-height-lg)}._row_t3z03_41{justify-content:space-between;align-items:center;gap:var(--tc-space-3);min-height:var(--tc-control-height-lg);padding:var(--tc-space-1) 0;border-top:1px solid var(--tc-divider);font-size:var(--tc-font-size-sm);display:flex}._row_label_t3z03_52{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_t3z03_60{color:var(--tc-text);flex:none}._status_text_t3z03_65{align-items:center;gap:var(--tc-space-1-5);color:var(--tc-text-muted);display:inline-flex}._status_text_t3z03_65[data-tone=success]{color:var(--tc-success)}._status_text_t3z03_65[data-tone=warning]{color:var(--tc-warning)}._status_text_t3z03_65[data-tone=error]{color:var(--tc-error)}._timeline_list_t3z03_84{border-top:1px solid var(--tc-divider)}._timeline_row_t3z03_88{align-items:center;gap:var(--tc-space-3);height:100%;padding:0 var(--tc-space-1);border-bottom:1px solid var(--tc-divider);font-size:var(--tc-font-size-xs);grid-template-columns:92px 1fr 1fr minmax(0,1.4fr);display:grid}._timeline_cell_t3z03_99{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._timeline_header_t3z03_106{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);font-weight:var(--tc-font-weight-semibold);text-transform:uppercase}._timeline_header_t3z03_106 ._timeline_cell_t3z03_99{color:inherit}._timeline_code_t3z03_117{color:var(--tc-text);font-family:var(--tc-font-mono)}._timeline_error_t3z03_122{color:var(--tc-error)}._warning_list_t3z03_126{gap:var(--tc-space-1);padding:var(--tc-space-2) 0 0;flex-direction:column;display:flex}._warning_item_t3z03_133{color:var(--tc-warning);font-size:var(--tc-font-size-xs);overflow-wrap:anywhere}._actions_row_t3z03_139{align-items:center;gap:var(--tc-space-3);padding-top:var(--tc-space-2);display:flex}._description_t3z03_146{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs);overflow-wrap:anywhere;margin:0}");
var O = D, k = ["data-capability-id"], A = ["data-tone", "data-available"], j = /* @__PURE__ */ h({
	__name: "CapabilityMatrix",
	props: { matrix: {} },
	setup(e) {
		let { t: a } = d();
		return (o, s) => (n(), r("div", {
			class: i(c(O).section),
			"data-testid": "capability-matrix"
		}, [l("div", { class: i(c(O).section_header) }, [l("h2", { class: i(c(O).section_title) }, u(c(a)("diagnostics.capability_matrix.title")), 3)], 2), l("div", null, [(n(!0), r(p, null, t(c(T), (t) => (n(), r("div", {
			key: t,
			class: i(c(O).row),
			"data-capability-id": t
		}, [l("span", { class: i(c(O).row_label) }, u(c(E)(c(a), t)), 3), l("span", {
			class: i(c(O).status_text),
			"data-tone": e.matrix[t]?.available ? "success" : "error",
			"data-available": e.matrix[t]?.available === !0
		}, [g(v, {
			icon: e.matrix[t]?.available ? c(b) : c(S),
			size: 14
		}, null, 8, ["icon"]), m(" " + u(e.matrix[t]?.available ? c(a)("diagnostics.capability_matrix.available") : c(a)("diagnostics.capability_matrix.unavailable")), 1)], 10, A)], 10, k))), 128))])], 2));
	}
}), M = .9, N = /* @__PURE__ */ h({
	__name: "StorageUsage",
	props: {
		usageBytes: {},
		quotaBytes: {}
	},
	setup(e) {
		let t = e, { t: o, locale: s } = d(), p = f(() => t.usageBytes !== null && t.quotaBytes !== null && t.quotaBytes > 0 && t.usageBytes / t.quotaBytes >= M);
		function m(e) {
			return _(e, s.value);
		}
		return (t, s) => (n(), r("div", {
			class: i(c(O).section),
			"data-testid": "storage-usage"
		}, [
			l("div", { class: i(c(O).section_header) }, [l("h2", { class: i(c(O).section_title) }, u(c(o)("diagnostics.storage_usage.title")), 3)], 2),
			l("div", { class: i(c(O).row) }, [l("span", { class: i(c(O).row_label) }, u(c(o)("diagnostics.storage_usage.estimate_label")), 3), l("span", { class: i(["tc-tabular-nums", c(O).row_value]) }, u(e.usageBytes === null ? c(o)("status.unknown") : m(e.usageBytes)), 3)], 2),
			l("div", { class: i(c(O).row) }, [l("span", { class: i(c(O).row_label) }, u(c(o)("diagnostics.storage_usage.quota_label")), 3), e.quotaBytes === null ? (n(), r("span", {
				key: 1,
				class: i(c(O).status_text),
				"data-tone": "warning",
				"data-testid": "storage-quota-unavailable"
			}, u(c(o)("diagnostics.storage_usage.quota_unavailable")), 3)) : (n(), r("span", {
				key: 0,
				class: i(["tc-tabular-nums", c(O).row_value]),
				"data-testid": "storage-quota-value"
			}, u(m(e.quotaBytes)), 3))], 2),
			p.value ? (n(), r("p", {
				key: 0,
				class: i([c(O).status_text, c(O).description]),
				"data-tone": "warning",
				"data-testid": "storage-quota-high-pressure"
			}, u(c(o)("diagnostics.storage_usage.quota_high_pressure")), 3)) : a("", !0),
			l("div", { class: i(c(O).row) }, [l("span", { class: i(c(O).row_label) }, u(c(o)("diagnostics.storage_usage.cache_references_label")), 3), l("span", {
				class: i(c(O).status_text),
				"data-tone": "warning",
				"data-testid": "cache-references-value"
			}, u(c(o)("diagnostics.storage_usage.cache_references_unavailable")), 3)], 2)
		], 2));
	}
}), P = 32, F = "320px", I = /* @__PURE__ */ h({
	__name: "TaskTimeline",
	props: { entries: {} },
	setup(t) {
		let o = t, { t: s, d: p } = d(), m = f(() => o.entries.length === 0 ? "empty" : "ready");
		function h(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : p(t, "short_time");
		}
		return (o, d) => (n(), r("div", {
			class: i(c(O).section),
			"data-testid": "task-timeline"
		}, [l("div", { class: i(c(O).section_header) }, [l("h2", { class: i(c(O).section_title) }, u(c(s)("diagnostics.task_timeline.title")), 3), t.entries.length > 0 ? (n(), r("span", {
			key: 0,
			class: i(["tc-tabular-nums", c(O).row_label])
		}, u(c(s)("diagnostics.task_timeline.count_label", t.entries.length)), 3)) : a("", !0)], 2), g(x, {
			status: m.value,
			"empty-message": c(s)("diagnostics.task_timeline.empty_description"),
			"min-height": "80px"
		}, {
			default: e(() => [l("div", { class: i(c(O).timeline_list) }, [t.entries.length > 0 ? (n(), r("div", {
				key: 0,
				class: i([c(O).timeline_row, c(O).timeline_header]),
				"data-testid": "timeline-header"
			}, [
				l("span", { class: i(c(O).timeline_cell) }, u(c(s)("diagnostics.task_timeline.time_label")), 3),
				l("span", { class: i(c(O).timeline_cell) }, u(c(s)("diagnostics.task_timeline.event_label")), 3),
				l("span", { class: i(c(O).timeline_cell) }, u(c(s)("diagnostics.task_timeline.module_label")), 3),
				l("span", { class: i(c(O).timeline_cell) }, u(c(s)("diagnostics.task_timeline.provider_label")), 3)
			], 2)) : a("", !0), g(w, {
				items: t.entries,
				"item-size": P,
				height: F,
				"aria-label": c(s)("diagnostics.task_timeline.title"),
				"get-key": (e) => e.event_id
			}, {
				default: e(({ item: e }) => [e ? (n(), r("div", {
					key: 0,
					class: i(c(O).timeline_row),
					"data-testid": "timeline-row"
				}, [
					l("span", { class: i(c(O).timeline_cell) }, u(h(e.occurred_at)), 3),
					l("span", { class: i([c(O).timeline_cell, c(O).timeline_code]) }, u(e.event_code), 3),
					l("span", { class: i([c(O).timeline_cell, c(O).timeline_code]) }, u(e.module_id), 3),
					e.error_code ? (n(), r("span", {
						key: 0,
						class: i([
							c(O).timeline_cell,
							c(O).timeline_code,
							c(O).timeline_error
						])
					}, u(c(s)("diagnostics.task_timeline.error_code_label")) + ": " + u(e.error_code), 3)) : e.provider_id ? (n(), r("span", {
						key: 1,
						class: i(c(O).timeline_cell)
					}, u(e.provider_id), 3)) : (n(), r("span", {
						key: 2,
						class: i(c(O).timeline_cell)
					}, null, 2))
				], 2)) : a("", !0)]),
				_: 1
			}, 8, [
				"items",
				"aria-label",
				"get-key"
			])], 2)]),
			_: 1
		}, 8, ["status", "empty-message"])], 2));
	}
}), L = /* @__PURE__ */ h({
	__name: "DiagnosticsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: p } = d(), m = f(() => t.state.diagnostics.snapshot), h = f(() => t.state.diagnostics.support_bundle_command), _ = f(() => h.value.status === "pending");
		s(() => {
			t.controller.load_diagnostics_timeline();
		});
		function v() {
			t.controller.export_support_bundle();
		}
		function b() {
			if (h.value.status !== "success") return;
			let e = JSON.stringify(h.value.result, null, 2), t = new Blob([e], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
			r.href = n, r.download = "tavern-canvas-support-bundle.json", r.click(), URL.revokeObjectURL(n);
		}
		return (t, s) => (n(), r("div", {
			class: i(c(O).view),
			"data-testid": "diagnostics-view"
		}, [
			l("div", { class: i(c(O).section) }, [l("div", { class: i(c(O).section_header) }, [l("h2", { class: i(c(O).section_title) }, u(c(p)("diagnostics.versions.title")), 3)], 2), l("div", { class: i(c(O).row) }, [l("span", { class: i(c(O).row_label) }, u(c(p)("diagnostics.versions.helper_label")), 3), l("span", { class: i(["tc-tabular-nums", c(O).row_value]) }, u(m.value?.helper_version ?? c(p)("status.unknown")), 3)], 2)], 2),
			g(j, { matrix: m.value?.capability_matrix ?? {} }, null, 8, ["matrix"]),
			g(I, { entries: e.state.diagnostics.timeline }, null, 8, ["entries"]),
			g(N, {
				"usage-bytes": m.value?.storage_usage_bytes ?? null,
				"quota-bytes": m.value?.storage_quota_bytes ?? null
			}, null, 8, ["usage-bytes", "quota-bytes"]),
			l("div", {
				class: i(c(O).section),
				"data-testid": "support-bundle"
			}, [
				l("div", { class: i(c(O).section_header) }, [l("h2", { class: i(c(O).section_title) }, u(c(p)("diagnostics.support_bundle.title")), 3)], 2),
				l("p", { class: i(c(O).description) }, u(c(p)("diagnostics.support_bundle.description")), 3),
				l("div", { class: i(c(O).actions_row) }, [g(y, {
					label: c(p)("diagnostics.support_bundle.export_action"),
					pending: _.value,
					onClick: v
				}, null, 8, ["label", "pending"]), h.value.status === "success" ? (n(), o(y, {
					key: 0,
					label: c(p)("common.actions.download"),
					variant: "secondary",
					onClick: b
				}, null, 8, ["label"])) : a("", !0)], 2),
				h.value.status === "success" ? (n(), r("p", {
					key: 0,
					class: i([c(O).status_text, c(O).description]),
					"data-tone": "success",
					"data-testid": "support-bundle-summary"
				}, u(c(p)("diagnostics.support_bundle.exported_toast")) + " · " + u(h.value.result.error_codes.length) + " · " + u(h.value.result.timeline.length), 3)) : h.value.status === "error" ? (n(), r("p", {
					key: 1,
					class: i([c(O).status_text, c(O).description]),
					"data-tone": "error"
				}, u(c(p)("errors.unexpected")), 3)) : a("", !0),
				h.value.status === "success" ? (n(), r("pre", {
					key: 2,
					class: i(c(O).description),
					"data-testid": "support-bundle-preview"
				}, u(JSON.stringify(h.value.result, null, 2)), 3)) : a("", !0)
			], 2)
		], 2));
	}
});
//#endregion
export { L as default };
