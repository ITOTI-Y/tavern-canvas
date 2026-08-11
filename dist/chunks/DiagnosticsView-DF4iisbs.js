import { A as e, F as t, N as n, U as r, _ as i, ft as a, g as o, h as s, lt as c, m as l, n as u, p as d, st as f, u as p, v as m, x as h, y as g } from "./vue-i18n-D0uIxSJk.js";
import { n as _ } from "./create_i18n-Du9K3mIm.js";
import { t as v } from "./AppIcon-C3iVkJ88.js";
import { t as y } from "./check-BnwxwDqJ.js";
import { n as b, t as x } from "./StateSurface-BEQHm_62.js";
import { t as S } from "./x-DZfSclkZ.js";
import { t as C } from "./VirtualList-CHj0FrH_.js";
import { n as w, t as T } from "./MigrationStatus-DrvjYhJ7.js";
//#endregion
//#region src/ui/views/diagnostics/capability_labels.ts
var E = [
	"native_tool_manager",
	"main_generation_events",
	"private_prompt_generation",
	"message_swipe_metadata",
	"host_image_upload",
	"tavern_helper",
	"tauri_chat_surface",
	"tauri_world_info_activation",
	"gateway_protocol"
];
function D(e, t) {
	switch (t) {
		case "native_tool_manager": return e("diagnostics.capability_matrix.capabilities.native_tool_manager");
		case "main_generation_events": return e("diagnostics.capability_matrix.capabilities.main_generation_events");
		case "private_prompt_generation": return e("diagnostics.capability_matrix.capabilities.private_prompt_generation");
		case "message_swipe_metadata": return e("diagnostics.capability_matrix.capabilities.message_swipe_metadata");
		case "host_image_upload": return e("diagnostics.capability_matrix.capabilities.host_image_upload");
		case "tavern_helper": return e("diagnostics.capability_matrix.capabilities.tavern_helper");
		case "tauri_chat_surface": return e("diagnostics.capability_matrix.capabilities.tauri_chat_surface");
		case "tauri_world_info_activation": return e("diagnostics.capability_matrix.capabilities.tauri_world_info_activation");
		case "gateway_protocol": return e("diagnostics.capability_matrix.capabilities.gateway_protocol");
	}
}
//#endregion
//#region src/ui/views/diagnostics/CapabilityMatrix.vue?vue&type=script&setup=true&lang.ts
var O = ["data-capability-id"], k = ["data-tone", "data-available"], A = /* @__PURE__ */ h({
	__name: "CapabilityMatrix",
	props: { matrix: {} },
	setup(e) {
		let { t: r } = u();
		return (o, s) => (n(), i("div", {
			class: c(f(w).section),
			"data-testid": "capability-matrix"
		}, [l("div", { class: c(f(w).section_header) }, [l("h2", { class: c(f(w).section_title) }, a(f(r)("diagnostics.capability_matrix.title")), 3)], 2), l("div", null, [(n(!0), i(p, null, t(f(E), (t) => (n(), i("div", {
			key: t,
			class: c(f(w).row),
			"data-capability-id": t
		}, [l("span", { class: c(f(w).row_label) }, a(f(D)(f(r), t)), 3), l("span", {
			class: c(f(w).status_text),
			"data-tone": e.matrix[t]?.available ? "success" : "error",
			"data-available": e.matrix[t]?.available === !0
		}, [g(v, {
			icon: e.matrix[t]?.available ? f(y) : f(S),
			size: 14
		}, null, 8, ["icon"]), m(" " + a(e.matrix[t]?.available ? f(r)("diagnostics.capability_matrix.available") : f(r)("diagnostics.capability_matrix.unavailable")), 1)], 10, k)], 10, O))), 128))])], 2));
	}
}), j = { class: "tc-tabular-nums" }, M = /* @__PURE__ */ h({
	__name: "ConnectionTests",
	props: {
		command: {},
		gatewayEndpoint: {}
	},
	emits: ["run"],
	setup(e, { emit: t }) {
		let r = e, s = t, { t: p } = u(), h = d(() => r.command.status === "pending");
		function _(e) {
			return e === "gateway_incompatible" && r.gatewayEndpoint ? p("errors.gateway_incompatible", { origin: r.gatewayEndpoint }) : e === "gateway_offline" && r.gatewayEndpoint ? p("errors.gateway_offline", { origin: r.gatewayEndpoint }) : p("errors.connection_test_failed", { code: e });
		}
		return (t, r) => (n(), i("div", {
			class: c(f(w).section),
			"data-testid": "connection-tests"
		}, [l("div", { class: c(f(w).section_header) }, [l("h2", { class: c(f(w).section_title) }, a(f(p)("diagnostics.connection_tests.title")), 3), g(b, {
			label: f(p)("diagnostics.connection_tests.run_action"),
			pending: h.value,
			onClick: r[0] ||= (e) => s("run")
		}, null, 8, ["label", "pending"])], 2), e.command.status === "idle" ? (n(), i("p", {
			key: 0,
			class: c(f(w).description)
		}, a(f(p)("diagnostics.connection_tests.idle")), 3)) : h.value ? (n(), i("p", {
			key: 1,
			class: c(f(w).description)
		}, a(f(p)("diagnostics.connection_tests.running")), 3)) : e.command.status === "success" && e.command.result.status === "success" ? (n(), i("div", {
			key: 2,
			class: c(f(w).status_text),
			"data-tone": "success",
			"data-testid": "connection-test-result"
		}, [m(a(f(p)("status.success")) + " · ", 1), l("span", j, a(f(p)("diagnostics.connection_tests.latency_label", { ms: e.command.result.latency_ms })), 1)], 2)) : e.command.status === "success" && e.command.result.status === "failed" ? (n(), i("p", {
			key: 3,
			class: c([f(w).status_text, f(w).description]),
			"data-tone": "error",
			"data-testid": "connection-test-result"
		}, a(_(e.command.result.code)), 3)) : e.command.status === "error" ? (n(), i("p", {
			key: 4,
			class: c([f(w).status_text, f(w).description]),
			"data-tone": "error",
			"data-testid": "connection-test-result"
		}, a(_(e.command.failure.code)), 3)) : o("", !0)], 2));
	}
}), N = .9, P = /* @__PURE__ */ h({
	__name: "StorageUsage",
	props: {
		usageBytes: {},
		quotaBytes: {}
	},
	setup(e) {
		let t = e, { t: r, locale: s } = u(), p = d(() => t.usageBytes !== null && t.quotaBytes !== null && t.quotaBytes > 0 && t.usageBytes / t.quotaBytes >= N);
		function m(e) {
			return _(e, s.value);
		}
		return (t, s) => (n(), i("div", {
			class: c(f(w).section),
			"data-testid": "storage-usage"
		}, [
			l("div", { class: c(f(w).section_header) }, [l("h2", { class: c(f(w).section_title) }, a(f(r)("diagnostics.storage_usage.title")), 3)], 2),
			l("div", { class: c(f(w).row) }, [l("span", { class: c(f(w).row_label) }, a(f(r)("diagnostics.storage_usage.estimate_label")), 3), l("span", { class: c(["tc-tabular-nums", f(w).row_value]) }, a(e.usageBytes === null ? f(r)("status.unknown") : m(e.usageBytes)), 3)], 2),
			l("div", { class: c(f(w).row) }, [l("span", { class: c(f(w).row_label) }, a(f(r)("diagnostics.storage_usage.quota_label")), 3), e.quotaBytes === null ? (n(), i("span", {
				key: 1,
				class: c(f(w).status_text),
				"data-tone": "warning",
				"data-testid": "storage-quota-unavailable"
			}, a(f(r)("diagnostics.storage_usage.quota_unavailable")), 3)) : (n(), i("span", {
				key: 0,
				class: c(["tc-tabular-nums", f(w).row_value]),
				"data-testid": "storage-quota-value"
			}, a(m(e.quotaBytes)), 3))], 2),
			p.value ? (n(), i("p", {
				key: 0,
				class: c([f(w).status_text, f(w).description]),
				"data-tone": "warning",
				"data-testid": "storage-quota-high-pressure"
			}, a(f(r)("diagnostics.storage_usage.quota_high_pressure")), 3)) : o("", !0),
			l("div", { class: c(f(w).row) }, [l("span", { class: c(f(w).row_label) }, a(f(r)("diagnostics.storage_usage.cache_references_label")), 3), l("span", {
				class: c(f(w).status_text),
				"data-tone": "warning",
				"data-testid": "cache-references-value"
			}, a(f(r)("diagnostics.storage_usage.cache_references_unavailable")), 3)], 2)
		], 2));
	}
}), F = 32, I = "320px", L = /* @__PURE__ */ h({
	__name: "TaskTimeline",
	props: { entries: {} },
	setup(e) {
		let t = e, { t: s, d: p } = u(), m = d(() => t.entries.length === 0 ? "empty" : "ready");
		function h(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : p(t, "short_time");
		}
		return (t, u) => (n(), i("div", {
			class: c(f(w).section),
			"data-testid": "task-timeline"
		}, [l("div", { class: c(f(w).section_header) }, [l("h2", { class: c(f(w).section_title) }, a(f(s)("diagnostics.task_timeline.title")), 3), e.entries.length > 0 ? (n(), i("span", {
			key: 0,
			class: c(["tc-tabular-nums", f(w).row_label])
		}, a(f(s)("diagnostics.task_timeline.count_label", e.entries.length)), 3)) : o("", !0)], 2), g(x, {
			status: m.value,
			"empty-message": f(s)("diagnostics.task_timeline.empty_description"),
			"min-height": "80px"
		}, {
			default: r(() => [l("div", { class: c(f(w).timeline_list) }, [e.entries.length > 0 ? (n(), i("div", {
				key: 0,
				class: c([f(w).timeline_row, f(w).timeline_header]),
				"data-testid": "timeline-header"
			}, [
				l("span", { class: c(f(w).timeline_cell) }, a(f(s)("diagnostics.task_timeline.time_label")), 3),
				l("span", { class: c(f(w).timeline_cell) }, a(f(s)("diagnostics.task_timeline.event_label")), 3),
				l("span", { class: c(f(w).timeline_cell) }, a(f(s)("diagnostics.task_timeline.module_label")), 3),
				l("span", { class: c(f(w).timeline_cell) }, a(f(s)("diagnostics.task_timeline.provider_label")), 3)
			], 2)) : o("", !0), g(C, {
				items: e.entries,
				"item-size": F,
				height: I,
				"aria-label": f(s)("diagnostics.task_timeline.title"),
				"get-key": (e) => e.event_id
			}, {
				default: r(({ item: e }) => [e ? (n(), i("div", {
					key: 0,
					class: c(f(w).timeline_row),
					"data-testid": "timeline-row"
				}, [
					l("span", { class: c(f(w).timeline_cell) }, a(h(e.occurred_at)), 3),
					l("span", { class: c([f(w).timeline_cell, f(w).timeline_code]) }, a(e.event_code), 3),
					l("span", { class: c([f(w).timeline_cell, f(w).timeline_code]) }, a(e.module_id), 3),
					e.error_code ? (n(), i("span", {
						key: 0,
						class: c([
							f(w).timeline_cell,
							f(w).timeline_code,
							f(w).timeline_error
						])
					}, a(f(s)("diagnostics.task_timeline.error_code_label")) + ": " + a(e.error_code), 3)) : e.provider_id ? (n(), i("span", {
						key: 1,
						class: c(f(w).timeline_cell)
					}, a(e.provider_id), 3)) : (n(), i("span", {
						key: 2,
						class: c(f(w).timeline_cell)
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
}), R = /* @__PURE__ */ h({
	__name: "DiagnosticsView",
	props: {
		state: {},
		controller: {}
	},
	setup(t) {
		let r = t, { t: p } = u(), m = d(() => r.state.diagnostics.snapshot), h = d(() => r.state.settings.settings?.gateway.endpoint ?? null), _ = d(() => r.state.diagnostics.support_bundle_command), v = d(() => _.value.status === "pending");
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
			class: c(f(w).view),
			"data-testid": "diagnostics-view"
		}, [
			l("div", { class: c(f(w).section) }, [
				l("div", { class: c(f(w).section_header) }, [l("h2", { class: c(f(w).section_title) }, a(f(p)("diagnostics.versions.title")), 3)], 2),
				l("div", { class: c(f(w).row) }, [l("span", { class: c(f(w).row_label) }, a(f(p)("diagnostics.versions.helper_label")), 3), l("span", { class: c(["tc-tabular-nums", f(w).row_value]) }, a(m.value?.helper_version ?? f(p)("status.unknown")), 3)], 2),
				l("div", { class: c(f(w).row) }, [l("span", { class: c(f(w).row_label) }, a(f(p)("diagnostics.versions.protocol_label")), 3), l("span", { class: c(["tc-tabular-nums", f(w).row_value]) }, a(m.value?.protocol_version ?? f(p)("status.unknown")), 3)], 2)
			], 2),
			g(A, { matrix: m.value?.capability_matrix ?? {} }, null, 8, ["matrix"]),
			g(M, {
				command: t.state.diagnostics.connection_test_command,
				"gateway-endpoint": h.value,
				onRun: y
			}, null, 8, ["command", "gateway-endpoint"]),
			g(L, { entries: t.state.diagnostics.timeline }, null, 8, ["entries"]),
			g(T, { snapshot: t.state.diagnostics.migration }, null, 8, ["snapshot"]),
			g(P, {
				"usage-bytes": m.value?.storage_usage_bytes ?? null,
				"quota-bytes": m.value?.storage_quota_bytes ?? null
			}, null, 8, ["usage-bytes", "quota-bytes"]),
			l("div", {
				class: c(f(w).section),
				"data-testid": "support-bundle"
			}, [
				l("div", { class: c(f(w).section_header) }, [l("h2", { class: c(f(w).section_title) }, a(f(p)("diagnostics.support_bundle.title")), 3)], 2),
				l("p", { class: c(f(w).description) }, a(f(p)("diagnostics.support_bundle.description")), 3),
				l("div", { class: c(f(w).actions_row) }, [g(b, {
					label: f(p)("diagnostics.support_bundle.export_action"),
					pending: v.value,
					onClick: x
				}, null, 8, ["label", "pending"]), _.value.status === "success" ? (n(), s(b, {
					key: 0,
					label: f(p)("common.actions.download"),
					variant: "secondary",
					onClick: S
				}, null, 8, ["label"])) : o("", !0)], 2),
				_.value.status === "success" ? (n(), i("p", {
					key: 0,
					class: c([f(w).status_text, f(w).description]),
					"data-tone": "success",
					"data-testid": "support-bundle-summary"
				}, a(f(p)("diagnostics.support_bundle.exported_toast")) + " · " + a(_.value.result.error_codes.length) + " · " + a(_.value.result.timeline.length), 3)) : _.value.status === "error" ? (n(), i("p", {
					key: 1,
					class: c([f(w).status_text, f(w).description]),
					"data-tone": "error"
				}, a(f(p)("errors.unexpected")), 3)) : o("", !0),
				_.value.status === "success" ? (n(), i("pre", {
					key: 2,
					class: c(f(w).description),
					"data-testid": "support-bundle-preview"
				}, a(JSON.stringify(_.value.result, null, 2)), 3)) : o("", !0)
			], 2)
		], 2));
	}
});
//#endregion
export { R as default };
