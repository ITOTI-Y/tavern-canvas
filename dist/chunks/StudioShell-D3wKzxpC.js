import { t as e } from "./shell.module-Bkh0ofYg.js";
import { I as t, J as n, R as r, S as i, _ as a, _t as o, b as s, d as c, ft as l, g as u, gt as d, h as f, it as p, m, mt as h, n as g, v as _, x as v, y } from "./vue-i18n-BQWz_HuU.js";
import { n as b, t as x } from "./AppIcon-B1iv8vRB.js";
import { n as S, t as C } from "./route_nav-5KhCah_z.js";
import { n as w } from "./components_styles-Cab5IILs.js";
import { t as T } from "./trash-2-Cx1sVMBS.js";
import { t as E } from "./x-CZeKQbKW.js";
import { t as D } from "./use_shell_viewport-DM2u8YpX.js";
import { t as O } from "./AppTooltip-DuggrS-8.js";
import { n as k, r as A, t as j } from "./PopoverPortal-CDsj-yHu.js";
import { t as M } from "./PopoverTrigger-CtR9sgc0.js";
import { t as N } from "./slot_error_label-BgREwP7d.js";
import { t as P } from "./use_portal_target-BZ79IssD.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/feather.js
var F = b("feather", [
	["path", {
		d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
		key: "18jl4k"
	}],
	["path", {
		d: "M16 8 2 22",
		key: "vp34q"
	}],
	["path", {
		d: "M17.5 15H9",
		key: "1oz8nu"
	}]
]), I = b("panel-right-close", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M15 3v18",
		key: "14nvp0"
	}],
	["path", {
		d: "m8 9 3 3-3 3",
		key: "12hl5m"
	}]
]), L = b("panel-right-open", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M15 3v18",
		key: "14nvp0"
	}],
	["path", {
		d: "m10 15-3-3 3-3",
		key: "1pgupc"
	}]
]), R = /* @__PURE__ */ i({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let n = v(() => import("./GalleryView-CxI44pK_.js")), r = v(() => import("./SettingsView-Bw6AeVKD.js")), i = v(() => import("./AssetsView-BdDSOkTp.js")), a = v(() => import("./CreateView-BAUaHSTr.js")), o = v(() => import("./OpeningView-Wu6jTPa1.js"));
		return (s, c) => e.state.route === "gallery" ? (t(), u(l(n), {
			key: 0,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "library" ? (t(), u(l(i), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "create" ? (t(), u(l(a), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "opening" ? (t(), u(l(o), {
			key: 3,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (t(), u(l(r), {
			key: 4,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"]));
	}
}), z = ["aria-label", "title"], B = ["data-status"], V = {
	key: 0,
	class: "tc-tabular-nums"
}, H = /* @__PURE__ */ i({
	__name: "TaskStrip",
	props: { tasks: {} },
	emits: ["clear-failed"],
	setup(n, { emit: i }) {
		let u = n, d = i, { t: p, n: v } = g(), y = {
			"status.loading": () => p("status.loading"),
			"status.empty": () => p("status.empty"),
			"status.partial": () => p("status.partial"),
			"status.error": () => p("status.error"),
			"status.disabled": () => p("status.disabled"),
			"status.success": () => p("status.success"),
			"status.pending": () => p("status.pending"),
			"status.running": () => p("status.running"),
			"status.cancelled": () => p("status.cancelled"),
			"status.completed": () => p("status.completed"),
			"status.failed": () => p("status.failed"),
			"status.retrying": () => p("status.retrying"),
			"status.online": () => p("status.online"),
			"status.offline": () => p("status.offline"),
			"status.connected": () => p("status.connected"),
			"status.blocked": () => p("status.blocked"),
			"status.unknown": () => p("status.unknown")
		};
		function b(e) {
			return y[e]?.() ?? e;
		}
		function S(e) {
			let t = b(e.label_code);
			return e.error === null ? t : t + p("nav.task_strip_error", { reason: N(p, e.error) });
		}
		let C = m(() => u.tasks.some((e) => e.status === "error"));
		return (n, i) => (t(), _("div", {
			class: h(l(e).task_strip),
			"data-testid": "task-list"
		}, [f("div", { class: h(l(e).task_strip_header) }, [f("span", { class: h([l(e).task_strip_summary, "tc-tabular-nums"]) }, o(l(p)("nav.task_strip_count", u.tasks.length)), 3), C.value ? (t(), _("button", {
			key: 0,
			type: "button",
			class: h(["tc-interactive", l(e).icon_button]),
			"aria-label": l(p)("nav.task_strip_clear_failed"),
			title: l(p)("nav.task_strip_clear_failed"),
			"data-testid": "task-strip-clear-failed",
			onClick: i[0] ||= (e) => d("clear-failed")
		}, [s(x, {
			icon: l(T),
			size: 16
		}, null, 8, ["icon"])], 10, z)) : a("", !0)], 2), f("div", { class: h(l(e).task_strip_list) }, [(t(!0), _(c, null, r(u.tasks, (n) => (t(), _("div", {
			key: n.id,
			class: h(l(e).task_chip)
		}, [
			f("span", {
				class: h(l(e).task_chip_dot),
				"data-status": n.status
			}, null, 10, B),
			f("span", { class: h(l(e).task_chip_label) }, o(S(n)), 3),
			n.progress === null ? a("", !0) : (t(), _("span", V, o(l(v)(n.progress, "percent")), 1))
		], 2))), 128))], 2)], 2));
	}
}), U = ["aria-label"], W = ["aria-current", "onClick"], G = ["aria-label"], K = ["aria-label", "aria-pressed"], q = ["aria-label"], J = /* @__PURE__ */ i({
	__name: "TopCommandBar",
	props: {
		route: {},
		tasks: {},
		showTabs: { type: Boolean },
		inspectorCollapsed: { type: Boolean },
		inspectorAvailable: { type: Boolean }
	},
	emits: [
		"select-route",
		"set-inspector-collapsed",
		"clear-failed-tasks",
		"close"
	],
	setup(i, { emit: d }) {
		let p = i, v = d, { t: b } = g(), T = P(), D = m(() => C.map((e) => ({
			...e,
			label: S(b, e.route)
		}))), N = m(() => p.tasks.some((e) => e.status === "pending")), R = m(() => p.inspectorCollapsed ? L : I), z = m(() => p.inspectorCollapsed ? b("nav.inspector_expand") : b("nav.inspector_collapse"));
		function B() {
			v("set-inspector-collapsed", !p.inspectorCollapsed);
		}
		return (d, m) => (t(), _("header", {
			class: h(l(e).top_bar),
			"data-window-drag-handle": ""
		}, [
			f("span", { class: h(l(e).top_bar_brand) }, [f("span", {
				class: h(l(e).top_bar_brand_mark),
				"aria-hidden": "true"
			}, [s(x, {
				icon: l(F),
				size: 15
			}, null, 8, ["icon"])], 2), y(" " + o(l(b)("app.name")), 1)], 2),
			i.showTabs ? (t(), _("nav", {
				key: 0,
				class: h(l(e).top_tabs),
				"aria-label": l(b)("app.name"),
				"data-testid": "studio-tabs"
			}, [(t(!0), _(c, null, r(D.value, (n) => (t(), _("button", {
				key: n.route,
				type: "button",
				class: h(["tc-interactive", l(e).top_tab]),
				"aria-current": n.route === p.route ? "page" : void 0,
				onClick: (e) => v("select-route", n.route)
			}, [s(x, {
				icon: n.icon,
				size: 16
			}, null, 8, ["icon"]), f("span", null, o(n.label), 1)], 10, W))), 128))], 10, U)) : a("", !0),
			f("div", { class: h(l(e).top_bar_end) }, [
				p.tasks.length > 0 ? (t(), u(l(A), { key: 0 }, {
					default: n(() => [s(l(M), { "as-child": "" }, {
						default: n(() => [f("button", {
							type: "button",
							class: h(["tc-interactive", l(e).task_pill]),
							"data-testid": "task-pill",
							"aria-label": l(b)("nav.task_strip_count", p.tasks.length)
						}, [s(x, {
							icon: l(w),
							size: 15,
							class: h(N.value ? l(e).task_pill_spin : void 0)
						}, null, 8, ["icon", "class"]), f("span", { class: h([l(e).task_pill_label, "tc-tabular-nums"]) }, o(l(b)("nav.task_strip_count", p.tasks.length)), 3)], 10, G)]),
						_: 1
					}), s(l(j), { to: l(T) }, {
						default: n(() => [s(l(k), {
							class: h(l(e).task_popover),
							align: "end",
							"side-offset": 8
						}, {
							default: n(() => [s(H, {
								tasks: p.tasks,
								onClearFailed: m[0] ||= (e) => v("clear-failed-tasks")
							}, null, 8, ["tasks"])]),
							_: 1
						}, 8, ["class"])]),
						_: 1
					}, 8, ["to"])]),
					_: 1
				})) : a("", !0),
				i.inspectorAvailable ? (t(), u(O, {
					key: 1,
					content: z.value,
					side: "bottom"
				}, {
					default: n(() => [f("button", {
						type: "button",
						class: h(["tc-interactive", l(e).icon_button]),
						"data-testid": "inspector-toggle",
						"aria-label": z.value,
						"aria-pressed": !i.inspectorCollapsed,
						onClick: B
					}, [s(x, {
						icon: R.value,
						size: 16
					}, null, 8, ["icon"])], 10, K)]),
					_: 1
				}, 8, ["content"])) : a("", !0),
				s(O, {
					content: l(b)("common.close"),
					side: "bottom"
				}, {
					default: n(() => [f("button", {
						type: "button",
						class: h(["tc-interactive", [l(e).icon_button, l(e).close_button]]),
						"data-testid": "studio-close",
						"aria-label": l(b)("common.close"),
						onClick: m[1] ||= (e) => v("close")
					}, [s(x, {
						icon: l(E),
						size: 16
					}, null, 8, ["icon"])], 10, q)]),
					_: 1
				}, 8, ["content"])
			], 2)
		], 2));
	}
}), Y = ["data-viewport", "data-inspector-collapsed"], X = ["aria-label"], Z = /* @__PURE__ */ i({
	__name: "StudioShell",
	props: {
		state: {},
		controller: {},
		viewport: {}
	},
	emits: [
		"select-route",
		"set-inspector-collapsed",
		"resize-inspector",
		"close"
	],
	setup(n, { emit: r }) {
		let i = v(() => import("./ContextInspector-S0dJya1E.js")), c = v(() => import("./InspectorSheet-D_vinrlm.js")), y = v(() => import("./MobileBottomNav-mI4OCcv8.js")), b = n, x = r, { t: S } = g(), C = D(b.viewport), w = /* @__PURE__ */ new Set(["vocabulary"]), T = m(() => [...b.state.loading].some((e) => !w.has(e))), E = m(() => b.state.failures.size > 0), O = m(() => ({ "--tc-inspector-width": `${String(b.state.inspector.width)}px` })), k = p(!1), A = m(() => b.state.route === "gallery"), j = m(() => !A.value || b.state.inspector.collapsed), M = m(() => C.value === "mobile" ? !k.value : j.value);
		function N(e) {
			C.value === "mobile" && (k.value = !e), x("set-inspector-collapsed", e);
		}
		function P(e) {
			x("select-route", e);
		}
		return (n, r) => (t(), _("div", {
			class: h(l(e).shell),
			"data-viewport": l(C),
			"data-inspector-collapsed": l(C) === "desktop" ? j.value : null,
			style: d(O.value)
		}, [
			s(J, {
				route: b.state.route,
				tasks: b.state.tasks,
				"show-tabs": l(C) === "desktop",
				"inspector-collapsed": M.value,
				"inspector-available": A.value,
				onSelectRoute: P,
				onSetInspectorCollapsed: N,
				onClearFailedTasks: r[0] ||= () => void b.controller.dismiss_failed_tasks(),
				onClose: r[1] ||= (e) => x("close")
			}, null, 8, [
				"route",
				"tasks",
				"show-tabs",
				"inspector-collapsed",
				"inspector-available"
			]),
			f("main", {
				class: h(l(e).workspace),
				"data-testid": "workspace"
			}, [E.value ? (t(), _("div", {
				key: 0,
				class: h(l(e).partial_banner),
				"data-testid": "partial-banner"
			}, [f("div", null, [f("p", null, o(l(S)("app.partial_init.banner_title")), 1), f("p", null, o(l(S)("app.partial_init.banner_description")), 1)]), f("button", {
				type: "button",
				class: h(["tc-interactive", l(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: r[2] ||= (e) => b.controller.set_settings_section("diagnostics")
			}, o(l(S)("settings.nav.diagnostics")), 3)], 2)) : a("", !0), T.value ? (t(), _("div", {
				key: 1,
				class: h(l(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": l(S)("status.loading")
			}, [
				f("div", { class: h([l(e).skeleton_block, l(e).skeleton_title]) }, null, 2),
				f("div", { class: h([l(e).skeleton_block, l(e).skeleton_line]) }, null, 2),
				f("div", { class: h([l(e).skeleton_block, l(e).skeleton_line_short]) }, null, 2)
			], 10, X)) : (t(), u(R, {
				key: 2,
				state: b.state,
				controller: b.controller
			}, null, 8, ["state", "controller"]))], 2),
			l(C) === "desktop" && A.value && !b.state.inspector.collapsed ? (t(), u(l(i), {
				key: 0,
				width: b.state.inspector.width,
				selection: b.state.inspector.selected_record,
				onResize: r[3] ||= (e) => x("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : a("", !0),
			l(C) === "mobile" ? (t(), u(l(y), {
				key: 1,
				route: b.state.route,
				onSelect: P
			}, null, 8, ["route"])) : a("", !0),
			l(C) === "mobile" && A.value ? (t(), u(l(c), {
				key: 2,
				open: k.value,
				selection: b.state.inspector.selected_record,
				"onUpdate:open": r[4] ||= (e) => N(!e)
			}, null, 8, ["open", "selection"])) : a("", !0)
		], 14, Y));
	}
});
//#endregion
export { Z as default };
