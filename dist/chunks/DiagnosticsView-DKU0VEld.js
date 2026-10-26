import { A as e, F as t, N as n, W as r, _ as i, ct as a, g as o, h as s, m as c, n as l, p as u, pt as d, u as f, ut as p, v as m, x as h, y as g } from "./vue-i18n-DUz2Gjn8.js";
import { n as _ } from "./create_i18n-CiN-r1sS.js";
import { t as v } from "./AppIcon-Cnhzrx9o.js";
import { t as y } from "./check-BhrVRbkS.js";
import { n as b, t as x } from "./StateSurface-Bo_sA18G.js";
import { t as S } from "./x-CDKrptQJ.js";
import { t as C } from "./VirtualList-BEUmgiC-.js";
//#endregion
//#region src/ui/views/diagnostics/capability_labels.ts
var w = [
	"main_generation_events",
	"preset_generation",
	"message_swipe_metadata",
	"tavern_regex",
	"tavern_helper",
	"gateway_protocol"
];
function T(e, t) {
	switch (t) {
		case "main_generation_events": return e("diagnostics.capability_matrix.capabilities.main_generation_events");
		case "preset_generation": return e("diagnostics.capability_matrix.capabilities.preset_generation");
		case "message_swipe_metadata": return e("diagnostics.capability_matrix.capabilities.message_swipe_metadata");
		case "tavern_regex": return e("diagnostics.capability_matrix.capabilities.tavern_regex");
		case "tavern_helper": return e("diagnostics.capability_matrix.capabilities.tavern_helper");
		case "gateway_protocol": return e("diagnostics.capability_matrix.capabilities.gateway_protocol");
	}
}
var E = {
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
}, D = ["data-capability-id"], O = ["data-tone", "data-available"], k = /* @__PURE__ */ h({
	__name: "CapabilityMatrix",
	props: { matrix: {} },
	setup(e) {
		let { t: r } = l();
		return (o, s) => (n(), i("div", {
			class: p(a(E).section),
			"data-testid": "capability-matrix"
		}, [c("div", { class: p(a(E).section_header) }, [c("h2", { class: p(a(E).section_title) }, d(a(r)("diagnostics.capability_matrix.title")), 3)], 2), c("div", null, [(n(!0), i(f, null, t(a(w), (t) => (n(), i("div", {
			key: t,
			class: p(a(E).row),
			"data-capability-id": t
		}, [c("span", { class: p(a(E).row_label) }, d(a(T)(a(r), t)), 3), c("span", {
			class: p(a(E).status_text),
			"data-tone": e.matrix[t]?.available ? "success" : "error",
			"data-available": e.matrix[t]?.available === !0
		}, [g(v, {
			icon: e.matrix[t]?.available ? a(y) : a(S),
			size: 14
		}, null, 8, ["icon"]), m(" " + d(e.matrix[t]?.available ? a(r)("diagnostics.capability_matrix.available") : a(r)("diagnostics.capability_matrix.unavailable")), 1)], 10, O)], 10, D))), 128))])], 2));
	}
}), A = { class: "tc-tabular-nums" }, j = /* @__PURE__ */ h({
	__name: "ConnectionTests",
	props: {
		command: {},
		gatewayEndpoint: {}
	},
	emits: ["run"],
	setup(e, { emit: t }) {
		let r = e, s = t, { t: f } = l(), h = u(() => r.command.status === "pending");
		function _(e) {
			return e === "gateway_incompatible" && r.gatewayEndpoint ? f("errors.gateway_incompatible", { origin: r.gatewayEndpoint }) : e === "gateway_offline" && r.gatewayEndpoint ? f("errors.gateway_offline", { origin: r.gatewayEndpoint }) : f("errors.connection_test_failed", { code: e });
		}
		return (t, r) => (n(), i("div", {
			class: p(a(E).section),
			"data-testid": "connection-tests"
		}, [c("div", { class: p(a(E).section_header) }, [c("h2", { class: p(a(E).section_title) }, d(a(f)("diagnostics.connection_tests.title")), 3), g(b, {
			label: a(f)("diagnostics.connection_tests.run_action"),
			pending: h.value,
			onClick: r[0] ||= (e) => s("run")
		}, null, 8, ["label", "pending"])], 2), e.command.status === "idle" ? (n(), i("p", {
			key: 0,
			class: p(a(E).description)
		}, d(a(f)("diagnostics.connection_tests.idle")), 3)) : h.value ? (n(), i("p", {
			key: 1,
			class: p(a(E).description)
		}, d(a(f)("diagnostics.connection_tests.running")), 3)) : e.command.status === "success" && e.command.result.status === "success" ? (n(), i("div", {
			key: 2,
			class: p(a(E).status_text),
			"data-tone": "success",
			"data-testid": "connection-test-result"
		}, [m(d(a(f)("status.success")) + " · ", 1), c("span", A, d(a(f)("diagnostics.connection_tests.latency_label", { ms: e.command.result.latency_ms })), 1)], 2)) : e.command.status === "success" && e.command.result.status === "failed" ? (n(), i("p", {
			key: 3,
			class: p([a(E).status_text, a(E).description]),
			"data-tone": "error",
			"data-testid": "connection-test-result"
		}, d(_(e.command.result.code)), 3)) : e.command.status === "error" ? (n(), i("p", {
			key: 4,
			class: p([a(E).status_text, a(E).description]),
			"data-tone": "error",
			"data-testid": "connection-test-result"
		}, d(_(e.command.failure.code)), 3)) : o("", !0)], 2));
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
			class: p(a(E).section),
			"data-testid": "storage-usage"
		}, [
			c("div", { class: p(a(E).section_header) }, [c("h2", { class: p(a(E).section_title) }, d(a(r)("diagnostics.storage_usage.title")), 3)], 2),
			c("div", { class: p(a(E).row) }, [c("span", { class: p(a(E).row_label) }, d(a(r)("diagnostics.storage_usage.estimate_label")), 3), c("span", { class: p(["tc-tabular-nums", a(E).row_value]) }, d(e.usageBytes === null ? a(r)("status.unknown") : m(e.usageBytes)), 3)], 2),
			c("div", { class: p(a(E).row) }, [c("span", { class: p(a(E).row_label) }, d(a(r)("diagnostics.storage_usage.quota_label")), 3), e.quotaBytes === null ? (n(), i("span", {
				key: 1,
				class: p(a(E).status_text),
				"data-tone": "warning",
				"data-testid": "storage-quota-unavailable"
			}, d(a(r)("diagnostics.storage_usage.quota_unavailable")), 3)) : (n(), i("span", {
				key: 0,
				class: p(["tc-tabular-nums", a(E).row_value]),
				"data-testid": "storage-quota-value"
			}, d(m(e.quotaBytes)), 3))], 2),
			f.value ? (n(), i("p", {
				key: 0,
				class: p([a(E).status_text, a(E).description]),
				"data-tone": "warning",
				"data-testid": "storage-quota-high-pressure"
			}, d(a(r)("diagnostics.storage_usage.quota_high_pressure")), 3)) : o("", !0),
			c("div", { class: p(a(E).row) }, [c("span", { class: p(a(E).row_label) }, d(a(r)("diagnostics.storage_usage.cache_references_label")), 3), c("span", {
				class: p(a(E).status_text),
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
			class: p(a(E).section),
			"data-testid": "task-timeline"
		}, [c("div", { class: p(a(E).section_header) }, [c("h2", { class: p(a(E).section_title) }, d(a(s)("diagnostics.task_timeline.title")), 3), e.entries.length > 0 ? (n(), i("span", {
			key: 0,
			class: p(["tc-tabular-nums", a(E).row_label])
		}, d(a(s)("diagnostics.task_timeline.count_label", e.entries.length)), 3)) : o("", !0)], 2), g(x, {
			status: m.value,
			"empty-message": a(s)("diagnostics.task_timeline.empty_description"),
			"min-height": "80px"
		}, {
			default: r(() => [c("div", { class: p(a(E).timeline_list) }, [e.entries.length > 0 ? (n(), i("div", {
				key: 0,
				class: p([a(E).timeline_row, a(E).timeline_header]),
				"data-testid": "timeline-header"
			}, [
				c("span", { class: p(a(E).timeline_cell) }, d(a(s)("diagnostics.task_timeline.time_label")), 3),
				c("span", { class: p(a(E).timeline_cell) }, d(a(s)("diagnostics.task_timeline.event_label")), 3),
				c("span", { class: p(a(E).timeline_cell) }, d(a(s)("diagnostics.task_timeline.module_label")), 3),
				c("span", { class: p(a(E).timeline_cell) }, d(a(s)("diagnostics.task_timeline.provider_label")), 3)
			], 2)) : o("", !0), g(C, {
				items: e.entries,
				"item-size": P,
				height: F,
				"aria-label": a(s)("diagnostics.task_timeline.title"),
				"get-key": (e) => e.event_id
			}, {
				default: r(({ item: e }) => [e ? (n(), i("div", {
					key: 0,
					class: p(a(E).timeline_row),
					"data-testid": "timeline-row"
				}, [
					c("span", { class: p(a(E).timeline_cell) }, d(h(e.occurred_at)), 3),
					c("span", { class: p([a(E).timeline_cell, a(E).timeline_code]) }, d(e.event_code), 3),
					c("span", { class: p([a(E).timeline_cell, a(E).timeline_code]) }, d(e.module_id), 3),
					e.error_code ? (n(), i("span", {
						key: 0,
						class: p([
							a(E).timeline_cell,
							a(E).timeline_code,
							a(E).timeline_error
						])
					}, d(a(s)("diagnostics.task_timeline.error_code_label")) + ": " + d(e.error_code), 3)) : e.provider_id ? (n(), i("span", {
						key: 1,
						class: p(a(E).timeline_cell)
					}, d(e.provider_id), 3)) : (n(), i("span", {
						key: 2,
						class: p(a(E).timeline_cell)
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
		let r = t, { t: f } = l(), m = u(() => r.state.diagnostics.snapshot), h = u(() => r.state.settings.settings?.gateway.endpoint ?? null), _ = u(() => r.state.diagnostics.support_bundle_command), v = u(() => _.value.status === "pending");
		e(() => {
			r.controller.load_diagnostics_timeline();
		});
		function y() {
			r.controller.test_diagnostics_connection();
		}
		function x() {
			r.controller.export_support_bundle();
		}
		function S() {
			if (_.value.status !== "success") return;
			let e = JSON.stringify(_.value.result, null, 2), t = new Blob([e], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
			r.href = n, r.download = "tavern-canvas-support-bundle.json", r.click(), URL.revokeObjectURL(n);
		}
		return (e, r) => (n(), i("div", {
			class: p(a(E).view),
			"data-testid": "diagnostics-view"
		}, [
			c("div", { class: p(a(E).section) }, [
				c("div", { class: p(a(E).section_header) }, [c("h2", { class: p(a(E).section_title) }, d(a(f)("diagnostics.versions.title")), 3)], 2),
				c("div", { class: p(a(E).row) }, [c("span", { class: p(a(E).row_label) }, d(a(f)("diagnostics.versions.helper_label")), 3), c("span", { class: p(["tc-tabular-nums", a(E).row_value]) }, d(m.value?.helper_version ?? a(f)("status.unknown")), 3)], 2),
				c("div", { class: p(a(E).row) }, [c("span", { class: p(a(E).row_label) }, d(a(f)("diagnostics.versions.protocol_label")), 3), c("span", { class: p(["tc-tabular-nums", a(E).row_value]) }, d(m.value?.protocol_version ?? a(f)("status.unknown")), 3)], 2)
			], 2),
			g(k, { matrix: m.value?.capability_matrix ?? {} }, null, 8, ["matrix"]),
			g(j, {
				command: t.state.diagnostics.connection_test_command,
				"gateway-endpoint": h.value,
				onRun: y
			}, null, 8, ["command", "gateway-endpoint"]),
			g(I, { entries: t.state.diagnostics.timeline }, null, 8, ["entries"]),
			g(N, {
				"usage-bytes": m.value?.storage_usage_bytes ?? null,
				"quota-bytes": m.value?.storage_quota_bytes ?? null
			}, null, 8, ["usage-bytes", "quota-bytes"]),
			c("div", {
				class: p(a(E).section),
				"data-testid": "support-bundle"
			}, [
				c("div", { class: p(a(E).section_header) }, [c("h2", { class: p(a(E).section_title) }, d(a(f)("diagnostics.support_bundle.title")), 3)], 2),
				c("p", { class: p(a(E).description) }, d(a(f)("diagnostics.support_bundle.description")), 3),
				c("div", { class: p(a(E).actions_row) }, [g(b, {
					label: a(f)("diagnostics.support_bundle.export_action"),
					pending: v.value,
					onClick: x
				}, null, 8, ["label", "pending"]), _.value.status === "success" ? (n(), s(b, {
					key: 0,
					label: a(f)("common.actions.download"),
					variant: "secondary",
					onClick: S
				}, null, 8, ["label"])) : o("", !0)], 2),
				_.value.status === "success" ? (n(), i("p", {
					key: 0,
					class: p([a(E).status_text, a(E).description]),
					"data-tone": "success",
					"data-testid": "support-bundle-summary"
				}, d(a(f)("diagnostics.support_bundle.exported_toast")) + " · " + d(_.value.result.error_codes.length) + " · " + d(_.value.result.timeline.length), 3)) : _.value.status === "error" ? (n(), i("p", {
					key: 1,
					class: p([a(E).status_text, a(E).description]),
					"data-tone": "error"
				}, d(a(f)("errors.unexpected")), 3)) : o("", !0),
				_.value.status === "success" ? (n(), i("pre", {
					key: 2,
					class: p(a(E).description),
					"data-testid": "support-bundle-preview"
				}, d(JSON.stringify(_.value.result, null, 2)), 3)) : o("", !0)
			], 2)
		], 2));
	}
});
//#endregion
export { L as default };
