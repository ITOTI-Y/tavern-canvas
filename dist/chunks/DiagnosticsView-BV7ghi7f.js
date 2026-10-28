import { A as e, F as t, N as n, W as r, _ as i, ct as a, g as o, h as s, m as c, n as l, p as u, pt as d, u as f, ut as p, v as m, x as h, y as g } from "./vue-i18n-DUz2Gjn8.js";
import { n as _ } from "./create_i18n-DbmzklIO.js";
import { t as v } from "./AppIcon-Cnhzrx9o.js";
import { C as y, i as b, r as x } from "./AppSelect-CRHyq1ex.js";
import { t as S } from "./x-CDKrptQJ.js";
import { n as C } from "./deferred_stylesheets-BpS7LWkd.js";
import { t as w } from "./VirtualList-Cm20oanL.js";
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
//#region src/ui/views/diagnostics/diagnostics_styles.ts
C("diagnostics", "._view_t20r4_7{flex-direction:column;gap:24px;padding:16px;display:flex}._section_t20r4_14{flex-direction:column;min-width:0;display:flex}._section_header_t20r4_20{justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px;display:flex}._section_title_t20r4_28{color:var(--tc-text);font-size:13px;font-weight:600}._row_t20r4_34{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:8px 0;display:flex}._row_label_t20r4_43{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_t20r4_51{color:var(--tc-text);flex:none}._status_text_t20r4_56{color:var(--tc-text-muted);align-items:center;gap:6px;display:inline-flex}._status_text_t20r4_56[data-tone=success]{color:var(--tc-success)}._status_text_t20r4_56[data-tone=warning]{color:var(--tc-warning)}._status_text_t20r4_56[data-tone=error]{color:var(--tc-error)}._timeline_list_t20r4_75{border-top:1px solid var(--tc-divider)}._timeline_row_t20r4_79{border-bottom:1px solid var(--tc-divider);grid-template-columns:92px 1fr 1fr minmax(0,1.4fr);align-items:center;gap:12px;height:100%;padding:0 4px;font-size:12px;display:grid}._timeline_cell_t20r4_90{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._timeline_header_t20r4_97{color:var(--tc-text-muted);text-transform:uppercase;font-size:11px;font-weight:600}._timeline_header_t20r4_97 ._timeline_cell_t20r4_90{color:inherit}._timeline_code_t20r4_108{color:var(--tc-text);font-family:ui-monospace,SFMono-Regular,Consolas,monospace}._timeline_error_t20r4_113{color:var(--tc-error)}._warning_list_t20r4_117{flex-direction:column;gap:4px;padding:8px 0 0;display:flex}._warning_item_t20r4_124{color:var(--tc-warning);overflow-wrap:anywhere;font-size:12px}._actions_row_t20r4_130{align-items:center;gap:12px;padding-top:8px;display:flex}._description_t20r4_137{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}");
var O = D, k = ["data-capability-id"], A = ["data-tone", "data-available"], j = /* @__PURE__ */ h({
	__name: "CapabilityMatrix",
	props: { matrix: {} },
	setup(e) {
		let { t: r } = l();
		return (o, s) => (n(), i("div", {
			class: p(a(O).section),
			"data-testid": "capability-matrix"
		}, [c("div", { class: p(a(O).section_header) }, [c("h2", { class: p(a(O).section_title) }, d(a(r)("diagnostics.capability_matrix.title")), 3)], 2), c("div", null, [(n(!0), i(f, null, t(a(T), (t) => (n(), i("div", {
			key: t,
			class: p(a(O).row),
			"data-capability-id": t
		}, [c("span", { class: p(a(O).row_label) }, d(a(E)(a(r), t)), 3), c("span", {
			class: p(a(O).status_text),
			"data-tone": e.matrix[t]?.available ? "success" : "error",
			"data-available": e.matrix[t]?.available === !0
		}, [g(v, {
			icon: e.matrix[t]?.available ? a(y) : a(S),
			size: 14
		}, null, 8, ["icon"]), m(" " + d(e.matrix[t]?.available ? a(r)("diagnostics.capability_matrix.available") : a(r)("diagnostics.capability_matrix.unavailable")), 1)], 10, A)], 10, k))), 128))])], 2));
	}
}), M = .9, N = /* @__PURE__ */ h({
	__name: "StorageUsage",
	props: {
		usageBytes: {},
		quotaBytes: {}
	},
	setup(e) {
		let t = e, { t: r, locale: s } = l(), f = u(() => t.usageBytes !== null && t.quotaBytes !== null && t.quotaBytes > 0 && t.usageBytes / t.quotaBytes >= M);
		function m(e) {
			return _(e, s.value);
		}
		return (t, s) => (n(), i("div", {
			class: p(a(O).section),
			"data-testid": "storage-usage"
		}, [
			c("div", { class: p(a(O).section_header) }, [c("h2", { class: p(a(O).section_title) }, d(a(r)("diagnostics.storage_usage.title")), 3)], 2),
			c("div", { class: p(a(O).row) }, [c("span", { class: p(a(O).row_label) }, d(a(r)("diagnostics.storage_usage.estimate_label")), 3), c("span", { class: p(["tc-tabular-nums", a(O).row_value]) }, d(e.usageBytes === null ? a(r)("status.unknown") : m(e.usageBytes)), 3)], 2),
			c("div", { class: p(a(O).row) }, [c("span", { class: p(a(O).row_label) }, d(a(r)("diagnostics.storage_usage.quota_label")), 3), e.quotaBytes === null ? (n(), i("span", {
				key: 1,
				class: p(a(O).status_text),
				"data-tone": "warning",
				"data-testid": "storage-quota-unavailable"
			}, d(a(r)("diagnostics.storage_usage.quota_unavailable")), 3)) : (n(), i("span", {
				key: 0,
				class: p(["tc-tabular-nums", a(O).row_value]),
				"data-testid": "storage-quota-value"
			}, d(m(e.quotaBytes)), 3))], 2),
			f.value ? (n(), i("p", {
				key: 0,
				class: p([a(O).status_text, a(O).description]),
				"data-tone": "warning",
				"data-testid": "storage-quota-high-pressure"
			}, d(a(r)("diagnostics.storage_usage.quota_high_pressure")), 3)) : o("", !0),
			c("div", { class: p(a(O).row) }, [c("span", { class: p(a(O).row_label) }, d(a(r)("diagnostics.storage_usage.cache_references_label")), 3), c("span", {
				class: p(a(O).status_text),
				"data-tone": "warning",
				"data-testid": "cache-references-value"
			}, d(a(r)("diagnostics.storage_usage.cache_references_unavailable")), 3)], 2)
		], 2));
	}
}), P = 32, F = "320px", I = /* @__PURE__ */ h({
	__name: "TaskTimeline",
	props: { entries: {} },
	setup(e) {
		let t = e, { t: s, d: f } = l(), m = u(() => t.entries.length === 0 ? "empty" : "ready");
		function h(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : f(t, "short_time");
		}
		return (t, l) => (n(), i("div", {
			class: p(a(O).section),
			"data-testid": "task-timeline"
		}, [c("div", { class: p(a(O).section_header) }, [c("h2", { class: p(a(O).section_title) }, d(a(s)("diagnostics.task_timeline.title")), 3), e.entries.length > 0 ? (n(), i("span", {
			key: 0,
			class: p(["tc-tabular-nums", a(O).row_label])
		}, d(a(s)("diagnostics.task_timeline.count_label", e.entries.length)), 3)) : o("", !0)], 2), g(x, {
			status: m.value,
			"empty-message": a(s)("diagnostics.task_timeline.empty_description"),
			"min-height": "80px"
		}, {
			default: r(() => [c("div", { class: p(a(O).timeline_list) }, [e.entries.length > 0 ? (n(), i("div", {
				key: 0,
				class: p([a(O).timeline_row, a(O).timeline_header]),
				"data-testid": "timeline-header"
			}, [
				c("span", { class: p(a(O).timeline_cell) }, d(a(s)("diagnostics.task_timeline.time_label")), 3),
				c("span", { class: p(a(O).timeline_cell) }, d(a(s)("diagnostics.task_timeline.event_label")), 3),
				c("span", { class: p(a(O).timeline_cell) }, d(a(s)("diagnostics.task_timeline.module_label")), 3),
				c("span", { class: p(a(O).timeline_cell) }, d(a(s)("diagnostics.task_timeline.provider_label")), 3)
			], 2)) : o("", !0), g(w, {
				items: e.entries,
				"item-size": P,
				height: F,
				"aria-label": a(s)("diagnostics.task_timeline.title"),
				"get-key": (e) => e.event_id
			}, {
				default: r(({ item: e }) => [e ? (n(), i("div", {
					key: 0,
					class: p(a(O).timeline_row),
					"data-testid": "timeline-row"
				}, [
					c("span", { class: p(a(O).timeline_cell) }, d(h(e.occurred_at)), 3),
					c("span", { class: p([a(O).timeline_cell, a(O).timeline_code]) }, d(e.event_code), 3),
					c("span", { class: p([a(O).timeline_cell, a(O).timeline_code]) }, d(e.module_id), 3),
					e.error_code ? (n(), i("span", {
						key: 0,
						class: p([
							a(O).timeline_cell,
							a(O).timeline_code,
							a(O).timeline_error
						])
					}, d(a(s)("diagnostics.task_timeline.error_code_label")) + ": " + d(e.error_code), 3)) : e.provider_id ? (n(), i("span", {
						key: 1,
						class: p(a(O).timeline_cell)
					}, d(e.provider_id), 3)) : (n(), i("span", {
						key: 2,
						class: p(a(O).timeline_cell)
					}, null, 2))
				], 2)) : o("", !0)]),
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
	setup(t) {
		let r = t, { t: f } = l(), m = u(() => r.state.diagnostics.snapshot), h = u(() => r.state.diagnostics.support_bundle_command), _ = u(() => h.value.status === "pending");
		e(() => {
			r.controller.load_diagnostics_timeline();
		});
		function v() {
			r.controller.export_support_bundle();
		}
		function y() {
			if (h.value.status !== "success") return;
			let e = JSON.stringify(h.value.result, null, 2), t = new Blob([e], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
			r.href = n, r.download = "tavern-canvas-support-bundle.json", r.click(), URL.revokeObjectURL(n);
		}
		return (e, r) => (n(), i("div", {
			class: p(a(O).view),
			"data-testid": "diagnostics-view"
		}, [
			c("div", { class: p(a(O).section) }, [c("div", { class: p(a(O).section_header) }, [c("h2", { class: p(a(O).section_title) }, d(a(f)("diagnostics.versions.title")), 3)], 2), c("div", { class: p(a(O).row) }, [c("span", { class: p(a(O).row_label) }, d(a(f)("diagnostics.versions.helper_label")), 3), c("span", { class: p(["tc-tabular-nums", a(O).row_value]) }, d(m.value?.helper_version ?? a(f)("status.unknown")), 3)], 2)], 2),
			g(j, { matrix: m.value?.capability_matrix ?? {} }, null, 8, ["matrix"]),
			g(I, { entries: t.state.diagnostics.timeline }, null, 8, ["entries"]),
			g(N, {
				"usage-bytes": m.value?.storage_usage_bytes ?? null,
				"quota-bytes": m.value?.storage_quota_bytes ?? null
			}, null, 8, ["usage-bytes", "quota-bytes"]),
			c("div", {
				class: p(a(O).section),
				"data-testid": "support-bundle"
			}, [
				c("div", { class: p(a(O).section_header) }, [c("h2", { class: p(a(O).section_title) }, d(a(f)("diagnostics.support_bundle.title")), 3)], 2),
				c("p", { class: p(a(O).description) }, d(a(f)("diagnostics.support_bundle.description")), 3),
				c("div", { class: p(a(O).actions_row) }, [g(b, {
					label: a(f)("diagnostics.support_bundle.export_action"),
					pending: _.value,
					onClick: v
				}, null, 8, ["label", "pending"]), h.value.status === "success" ? (n(), s(b, {
					key: 0,
					label: a(f)("common.actions.download"),
					variant: "secondary",
					onClick: y
				}, null, 8, ["label"])) : o("", !0)], 2),
				h.value.status === "success" ? (n(), i("p", {
					key: 0,
					class: p([a(O).status_text, a(O).description]),
					"data-tone": "success",
					"data-testid": "support-bundle-summary"
				}, d(a(f)("diagnostics.support_bundle.exported_toast")) + " · " + d(h.value.result.error_codes.length) + " · " + d(h.value.result.timeline.length), 3)) : h.value.status === "error" ? (n(), i("p", {
					key: 1,
					class: p([a(O).status_text, a(O).description]),
					"data-tone": "error"
				}, d(a(f)("errors.unexpected")), 3)) : o("", !0),
				h.value.status === "success" ? (n(), i("pre", {
					key: 2,
					class: p(a(O).description),
					"data-testid": "support-bundle-preview"
				}, d(JSON.stringify(h.value.result, null, 2)), 3)) : o("", !0)
			], 2)
		], 2));
	}
});
//#endregion
export { L as default };
