import { I as e, K as t, N as n, R as r, S as i, _ as a, a as o, b as s, ft as c, g as l, ht as u, n as d, p as f, t as p, ut as m, v as h, w as g, x as _, y as v } from "./AppIcon-BpY-A4VH.js";
import { n as y } from "./create_i18n-ijk1h_jt.js";
import { t as b } from "./check-deKde2R4.js";
import { n as x, t as S } from "./StateSurface-CNBIMTjV.js";
import { t as C } from "./VirtualList-D2u-jZaJ.js";
import { n as w, t as T } from "./MigrationStatus-DZ-yxWIP.js";
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
var O = ["data-capability-id"], k = ["data-tone", "data-available"], A = /* @__PURE__ */ g({
	__name: "CapabilityMatrix",
	props: { matrix: {} },
	setup(t) {
		let { t: n } = o();
		return (o, l) => (e(), s("div", {
			class: c(m(w).section),
			"data-testid": "capability-matrix"
		}, [a("div", { class: c(m(w).section_header) }, [a("h2", { class: c(m(w).section_title) }, u(m(n)("diagnostics.capability_matrix.title")), 3)], 2), a("div", null, [(e(!0), s(f, null, r(m(E), (r) => (e(), s("div", {
			key: r,
			class: c(m(w).row),
			"data-capability-id": r
		}, [a("span", { class: c(m(w).row_label) }, u(m(D)(m(n), r)), 3), a("span", {
			class: c(m(w).status_text),
			"data-tone": t.matrix[r]?.available ? "success" : "error",
			"data-available": t.matrix[r]?.available === !0
		}, [i(p, {
			icon: t.matrix[r]?.available ? m(b) : m(d),
			size: 14
		}, null, 8, ["icon"]), _(" " + u(t.matrix[r]?.available ? m(n)("diagnostics.capability_matrix.available") : m(n)("diagnostics.capability_matrix.unavailable")), 1)], 10, k)], 10, O))), 128))])], 2));
	}
}), j = { class: "tc-tabular-nums" }, M = /* @__PURE__ */ g({
	__name: "ConnectionTests",
	props: {
		command: {},
		gatewayEndpoint: {}
	},
	emits: ["run"],
	setup(t, { emit: n }) {
		let r = t, d = n, { t: f } = o(), p = l(() => r.command.status === "pending");
		function h(e) {
			return e === "gateway_incompatible" && r.gatewayEndpoint ? f("errors.gateway_incompatible", { origin: r.gatewayEndpoint }) : e === "gateway_offline" && r.gatewayEndpoint ? f("errors.gateway_offline", { origin: r.gatewayEndpoint }) : f("errors.connection_test_failed", { code: e });
		}
		return (n, r) => (e(), s("div", {
			class: c(m(w).section),
			"data-testid": "connection-tests"
		}, [a("div", { class: c(m(w).section_header) }, [a("h2", { class: c(m(w).section_title) }, u(m(f)("diagnostics.connection_tests.title")), 3), i(x, {
			label: m(f)("diagnostics.connection_tests.run_action"),
			pending: p.value,
			onClick: r[0] ||= (e) => d("run")
		}, null, 8, ["label", "pending"])], 2), t.command.status === "idle" ? (e(), s("p", {
			key: 0,
			class: c(m(w).description)
		}, u(m(f)("diagnostics.connection_tests.run_action")), 3)) : p.value ? (e(), s("p", {
			key: 1,
			class: c(m(w).description)
		}, u(m(f)("diagnostics.connection_tests.running")), 3)) : t.command.status === "success" && t.command.result.status === "success" ? (e(), s("div", {
			key: 2,
			class: c(m(w).status_text),
			"data-tone": "success",
			"data-testid": "connection-test-result"
		}, [_(u(m(f)("status.success")) + " · ", 1), a("span", j, u(m(f)("diagnostics.connection_tests.latency_label", { ms: t.command.result.latency_ms })), 1)], 2)) : t.command.status === "success" && t.command.result.status === "failed" ? (e(), s("p", {
			key: 3,
			class: c([m(w).status_text, m(w).description]),
			"data-tone": "error",
			"data-testid": "connection-test-result"
		}, u(h(t.command.result.code)), 3)) : t.command.status === "error" ? (e(), s("p", {
			key: 4,
			class: c([m(w).status_text, m(w).description]),
			"data-tone": "error",
			"data-testid": "connection-test-result"
		}, u(h(t.command.failure.code)), 3)) : v("", !0)], 2));
	}
}), N = .9, P = /* @__PURE__ */ g({
	__name: "StorageUsage",
	props: {
		usageBytes: {},
		quotaBytes: {}
	},
	setup(t) {
		let n = t, { t: r, locale: i } = o(), d = l(() => n.usageBytes !== null && n.quotaBytes !== null && n.quotaBytes > 0 && n.usageBytes / n.quotaBytes >= N);
		function f(e) {
			return y(e, i.value);
		}
		return (n, i) => (e(), s("div", {
			class: c(m(w).section),
			"data-testid": "storage-usage"
		}, [
			a("div", { class: c(m(w).section_header) }, [a("h2", { class: c(m(w).section_title) }, u(m(r)("diagnostics.storage_usage.title")), 3)], 2),
			a("div", { class: c(m(w).row) }, [a("span", { class: c(m(w).row_label) }, u(m(r)("diagnostics.storage_usage.estimate_label")), 3), a("span", { class: c(["tc-tabular-nums", m(w).row_value]) }, u(t.usageBytes === null ? m(r)("status.unknown") : f(t.usageBytes)), 3)], 2),
			a("div", { class: c(m(w).row) }, [a("span", { class: c(m(w).row_label) }, u(m(r)("diagnostics.storage_usage.quota_label")), 3), t.quotaBytes === null ? (e(), s("span", {
				key: 1,
				class: c(m(w).status_text),
				"data-tone": "warning",
				"data-testid": "storage-quota-unavailable"
			}, u(m(r)("diagnostics.storage_usage.quota_unavailable")), 3)) : (e(), s("span", {
				key: 0,
				class: c(["tc-tabular-nums", m(w).row_value]),
				"data-testid": "storage-quota-value"
			}, u(f(t.quotaBytes)), 3))], 2),
			d.value ? (e(), s("p", {
				key: 0,
				class: c([m(w).status_text, m(w).description]),
				"data-tone": "warning",
				"data-testid": "storage-quota-high-pressure"
			}, u(m(r)("diagnostics.storage_usage.quota_high_pressure")), 3)) : v("", !0),
			a("div", { class: c(m(w).row) }, [a("span", { class: c(m(w).row_label) }, u(m(r)("diagnostics.storage_usage.cache_references_label")), 3), a("span", {
				class: c(m(w).status_text),
				"data-tone": "warning",
				"data-testid": "cache-references-value"
			}, u(m(r)("diagnostics.storage_usage.cache_references_unavailable")), 3)], 2)
		], 2));
	}
}), F = 32, I = "320px", L = /* @__PURE__ */ g({
	__name: "TaskTimeline",
	props: { entries: {} },
	setup(n) {
		let r = n, { t: d, d: f } = o(), p = l(() => r.entries.length === 0 ? "empty" : "ready");
		function h(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : f(t, "short_time");
		}
		return (r, o) => (e(), s("div", {
			class: c(m(w).section),
			"data-testid": "task-timeline"
		}, [a("div", { class: c(m(w).section_header) }, [a("h2", { class: c(m(w).section_title) }, u(m(d)("diagnostics.task_timeline.title")), 3), n.entries.length > 0 ? (e(), s("span", {
			key: 0,
			class: c(["tc-tabular-nums", m(w).row_label])
		}, u(m(d)("diagnostics.task_timeline.count_label", n.entries.length)), 3)) : v("", !0)], 2), i(S, {
			status: p.value,
			"empty-message": m(d)("diagnostics.task_timeline.empty_description"),
			"min-height": "80px"
		}, {
			default: t(() => [a("div", { class: c(m(w).timeline_list) }, [n.entries.length > 0 ? (e(), s("div", {
				key: 0,
				class: c([m(w).timeline_row, m(w).timeline_header]),
				"data-testid": "timeline-header"
			}, [
				a("span", { class: c(m(w).timeline_cell) }, u(m(d)("diagnostics.task_timeline.time_label")), 3),
				a("span", { class: c(m(w).timeline_cell) }, u(m(d)("diagnostics.task_timeline.event_label")), 3),
				a("span", { class: c(m(w).timeline_cell) }, u(m(d)("diagnostics.task_timeline.module_label")), 3),
				a("span", { class: c(m(w).timeline_cell) }, u(m(d)("diagnostics.task_timeline.provider_label")), 3)
			], 2)) : v("", !0), i(C, {
				items: n.entries,
				"item-size": F,
				height: I,
				"aria-label": m(d)("diagnostics.task_timeline.title"),
				"get-key": (e) => e.event_id
			}, {
				default: t(({ item: t }) => [t ? (e(), s("div", {
					key: 0,
					class: c(m(w).timeline_row),
					"data-testid": "timeline-row"
				}, [
					a("span", { class: c(m(w).timeline_cell) }, u(h(t.occurred_at)), 3),
					a("span", { class: c([m(w).timeline_cell, m(w).timeline_code]) }, u(t.event_code), 3),
					a("span", { class: c([m(w).timeline_cell, m(w).timeline_code]) }, u(t.module_id), 3),
					t.error_code ? (e(), s("span", {
						key: 0,
						class: c([
							m(w).timeline_cell,
							m(w).timeline_code,
							m(w).timeline_error
						])
					}, u(m(d)("diagnostics.task_timeline.error_code_label")) + ": " + u(t.error_code), 3)) : t.provider_id ? (e(), s("span", {
						key: 1,
						class: c(m(w).timeline_cell)
					}, u(t.provider_id), 3)) : (e(), s("span", {
						key: 2,
						class: c(m(w).timeline_cell)
					}, null, 2))
				], 2)) : v("", !0)]),
				_: 1
			}, 8, [
				"items",
				"aria-label",
				"get-key"
			])], 2)]),
			_: 1
		}, 8, ["status", "empty-message"])], 2));
	}
}), R = /* @__PURE__ */ g({
	__name: "DiagnosticsView",
	props: {
		state: {},
		controller: {}
	},
	setup(t) {
		let r = t, { t: d } = o(), f = l(() => r.state.diagnostics.snapshot), p = l(() => r.state.settings.settings?.gateway.endpoint ?? null), g = l(() => r.state.diagnostics.support_bundle_command), _ = l(() => g.value.status === "pending");
		n(() => {
			r.controller.load_diagnostics_timeline();
		});
		function y() {
			r.controller.test_diagnostics_connection();
		}
		function b() {
			r.controller.export_support_bundle();
		}
		function S() {
			if (g.value.status !== "success") return;
			let e = JSON.stringify(g.value.result, null, 2), t = new Blob([e], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
			r.href = n, r.download = "tavern-canvas-support-bundle.json", r.click(), URL.revokeObjectURL(n);
		}
		return (n, r) => (e(), s("div", {
			class: c(m(w).view),
			"data-testid": "diagnostics-view"
		}, [
			a("div", { class: c(m(w).section) }, [
				a("div", { class: c(m(w).section_header) }, [a("h2", { class: c(m(w).section_title) }, u(m(d)("diagnostics.versions.title")), 3)], 2),
				a("div", { class: c(m(w).row) }, [a("span", { class: c(m(w).row_label) }, u(m(d)("diagnostics.versions.helper_label")), 3), a("span", { class: c(["tc-tabular-nums", m(w).row_value]) }, u(f.value?.helper_version ?? m(d)("status.unknown")), 3)], 2),
				a("div", { class: c(m(w).row) }, [a("span", { class: c(m(w).row_label) }, u(m(d)("diagnostics.versions.protocol_label")), 3), a("span", { class: c(["tc-tabular-nums", m(w).row_value]) }, u(f.value?.protocol_version ?? m(d)("status.unknown")), 3)], 2)
			], 2),
			i(A, { matrix: f.value?.capability_matrix ?? {} }, null, 8, ["matrix"]),
			i(M, {
				command: t.state.diagnostics.connection_test_command,
				"gateway-endpoint": p.value,
				onRun: y
			}, null, 8, ["command", "gateway-endpoint"]),
			i(L, { entries: t.state.diagnostics.timeline }, null, 8, ["entries"]),
			i(T, { snapshot: t.state.diagnostics.migration }, null, 8, ["snapshot"]),
			i(P, {
				"usage-bytes": f.value?.storage_usage_bytes ?? null,
				"quota-bytes": f.value?.storage_quota_bytes ?? null
			}, null, 8, ["usage-bytes", "quota-bytes"]),
			a("div", {
				class: c(m(w).section),
				"data-testid": "support-bundle"
			}, [
				a("div", { class: c(m(w).section_header) }, [a("h2", { class: c(m(w).section_title) }, u(m(d)("diagnostics.support_bundle.title")), 3)], 2),
				a("p", { class: c(m(w).description) }, u(m(d)("diagnostics.support_bundle.description")), 3),
				a("div", { class: c(m(w).actions_row) }, [i(x, {
					label: m(d)("diagnostics.support_bundle.export_action"),
					pending: _.value,
					onClick: b
				}, null, 8, ["label", "pending"]), g.value.status === "success" ? (e(), h(x, {
					key: 0,
					label: m(d)("common.actions.download"),
					variant: "secondary",
					onClick: S
				}, null, 8, ["label"])) : v("", !0)], 2),
				g.value.status === "success" ? (e(), s("p", {
					key: 0,
					class: c([m(w).status_text, m(w).description]),
					"data-tone": "success",
					"data-testid": "support-bundle-summary"
				}, u(m(d)("diagnostics.support_bundle.exported_toast")) + " · " + u(g.value.result.error_codes.length) + " · " + u(g.value.result.timeline.length), 3)) : g.value.status === "error" ? (e(), s("p", {
					key: 1,
					class: c([m(w).status_text, m(w).description]),
					"data-tone": "error"
				}, u(m(d)("errors.unexpected")), 3)) : v("", !0),
				g.value.status === "success" ? (e(), s("pre", {
					key: 2,
					class: c(m(w).description),
					"data-testid": "support-bundle-preview"
				}, u(JSON.stringify(g.value.result, null, 2)), 3)) : v("", !0)
			], 2)
		], 2));
	}
});
//#endregion
export { R as default };

//# sourceMappingURL=DiagnosticsView-DrJ1wPMP.js.map