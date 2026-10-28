import { t as e } from "./shell.module-Bkh0ofYg.js";
import { G as t, I as n, P as r, _ as i, b as a, dt as o, g as s, h as c, lt as l, m as u, mt as d, n as f, p, pt as m, tt as h, u as g, v as _, x as v, y } from "./vue-i18n-L-BrQRnK.js";
import { n as b, t as x } from "./AppIcon-DkyxvN8k.js";
import { n as S, t as C } from "./route_nav-CXLRDOo3.js";
import { n as w } from "./components_styles-DfkKC2VR.js";
import { t as T } from "./trash-2-Dqlz-IWX.js";
import { t as E } from "./x-D7Ry5i_D.js";
import { t as D } from "./use_shell_viewport-Yd0oBRFR.js";
import { t as O } from "./AppTooltip-Bay48E5d.js";
import { n as k, r as A, t as j } from "./PopoverPortal-9Sdzb5-R.js";
import { t as M } from "./PopoverTrigger-EsRtmuet.js";
import { t as N } from "./slot_error_label-BgREwP7d.js";
import { t as P } from "./use_portal_target-RDZJMCu5.js";
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
]), R = /* @__PURE__ */ v({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = a(() => import("./GalleryView-DJV2d5oC.js")), n = a(() => import("./SettingsView-DoZ4Bgx1.js")), i = a(() => import("./AssetsView-Dd4aXX7a.js"));
		return (a, o) => e.state.route === "gallery" ? (r(), c(l(t), {
			key: 0,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "library" ? (r(), c(l(i), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (r(), c(l(n), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"]));
	}
}), z = ["aria-label", "title"], B = ["data-status"], V = {
	key: 0,
	class: "tc-tabular-nums"
}, H = /* @__PURE__ */ v({
	__name: "TaskStrip",
	props: { tasks: {} },
	emits: ["clear-failed"],
	setup(t, { emit: a }) {
		let c = t, m = a, { t: h, n: _ } = f(), v = {
			"status.loading": () => h("status.loading"),
			"status.empty": () => h("status.empty"),
			"status.partial": () => h("status.partial"),
			"status.error": () => h("status.error"),
			"status.disabled": () => h("status.disabled"),
			"status.success": () => h("status.success"),
			"status.pending": () => h("status.pending"),
			"status.running": () => h("status.running"),
			"status.cancelled": () => h("status.cancelled"),
			"status.completed": () => h("status.completed"),
			"status.failed": () => h("status.failed"),
			"status.retrying": () => h("status.retrying"),
			"status.online": () => h("status.online"),
			"status.offline": () => h("status.offline"),
			"status.connected": () => h("status.connected"),
			"status.blocked": () => h("status.blocked"),
			"status.unknown": () => h("status.unknown")
		};
		function b(e) {
			return v[e]?.() ?? e;
		}
		function S(e) {
			let t = b(e.label_code);
			return e.error === null ? t : t + h("nav.task_strip_error", { reason: N(h, e.error) });
		}
		let C = p(() => c.tasks.some((e) => e.status === "error"));
		return (t, a) => (r(), i("div", {
			class: o(l(e).task_strip),
			"data-testid": "task-list"
		}, [u("div", { class: o(l(e).task_strip_header) }, [u("span", { class: o([l(e).task_strip_summary, "tc-tabular-nums"]) }, d(l(h)("nav.task_strip_count", c.tasks.length)), 3), C.value ? (r(), i("button", {
			key: 0,
			type: "button",
			class: o(["tc-interactive", l(e).icon_button]),
			"aria-label": l(h)("nav.task_strip_clear_failed"),
			title: l(h)("nav.task_strip_clear_failed"),
			"data-testid": "task-strip-clear-failed",
			onClick: a[0] ||= (e) => m("clear-failed")
		}, [y(x, {
			icon: l(T),
			size: 16
		}, null, 8, ["icon"])], 10, z)) : s("", !0)], 2), u("div", { class: o(l(e).task_strip_list) }, [(r(!0), i(g, null, n(c.tasks, (t) => (r(), i("div", {
			key: t.id,
			class: o(l(e).task_chip)
		}, [
			u("span", {
				class: o(l(e).task_chip_dot),
				"data-status": t.status
			}, null, 10, B),
			u("span", { class: o(l(e).task_chip_label) }, d(S(t)), 3),
			t.progress === null ? s("", !0) : (r(), i("span", V, d(l(_)(t.progress, "percent")), 1))
		], 2))), 128))], 2)], 2));
	}
}), U = ["aria-label"], W = ["aria-current", "onClick"], G = ["aria-label"], K = ["aria-label", "aria-pressed"], q = ["aria-label"], J = /* @__PURE__ */ v({
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
	setup(a, { emit: m }) {
		let h = a, v = m, { t: b } = f(), T = P(), D = p(() => C.map((e) => ({
			...e,
			label: S(b, e.route)
		}))), N = p(() => h.tasks.some((e) => e.status === "pending")), R = p(() => h.inspectorCollapsed ? L : I), z = p(() => h.inspectorCollapsed ? b("nav.inspector_expand") : b("nav.inspector_collapse"));
		function B() {
			v("set-inspector-collapsed", !h.inspectorCollapsed);
		}
		return (f, p) => (r(), i("header", {
			class: o(l(e).top_bar),
			"data-window-drag-handle": ""
		}, [
			u("span", { class: o(l(e).top_bar_brand) }, [u("span", {
				class: o(l(e).top_bar_brand_mark),
				"aria-hidden": "true"
			}, [y(x, {
				icon: l(F),
				size: 15
			}, null, 8, ["icon"])], 2), _(" " + d(l(b)("app.name")), 1)], 2),
			a.showTabs ? (r(), i("nav", {
				key: 0,
				class: o(l(e).top_tabs),
				"aria-label": l(b)("app.name"),
				"data-testid": "studio-tabs"
			}, [(r(!0), i(g, null, n(D.value, (t) => (r(), i("button", {
				key: t.route,
				type: "button",
				class: o(["tc-interactive", l(e).top_tab]),
				"aria-current": t.route === h.route ? "page" : void 0,
				onClick: (e) => v("select-route", t.route)
			}, [y(x, {
				icon: t.icon,
				size: 16
			}, null, 8, ["icon"]), u("span", null, d(t.label), 1)], 10, W))), 128))], 10, U)) : s("", !0),
			u("div", { class: o(l(e).top_bar_end) }, [
				h.tasks.length > 0 ? (r(), c(l(A), { key: 0 }, {
					default: t(() => [y(l(M), { "as-child": "" }, {
						default: t(() => [u("button", {
							type: "button",
							class: o(["tc-interactive", l(e).task_pill]),
							"data-testid": "task-pill",
							"aria-label": l(b)("nav.task_strip_count", h.tasks.length)
						}, [y(x, {
							icon: l(w),
							size: 15,
							class: o(N.value ? l(e).task_pill_spin : void 0)
						}, null, 8, ["icon", "class"]), u("span", { class: o([l(e).task_pill_label, "tc-tabular-nums"]) }, d(l(b)("nav.task_strip_count", h.tasks.length)), 3)], 10, G)]),
						_: 1
					}), y(l(j), { to: l(T) }, {
						default: t(() => [y(l(k), {
							class: o(l(e).task_popover),
							align: "end",
							"side-offset": 8
						}, {
							default: t(() => [y(H, {
								tasks: h.tasks,
								onClearFailed: p[0] ||= (e) => v("clear-failed-tasks")
							}, null, 8, ["tasks"])]),
							_: 1
						}, 8, ["class"])]),
						_: 1
					}, 8, ["to"])]),
					_: 1
				})) : s("", !0),
				a.inspectorAvailable ? (r(), c(O, {
					key: 1,
					content: z.value,
					side: "bottom"
				}, {
					default: t(() => [u("button", {
						type: "button",
						class: o(["tc-interactive", l(e).icon_button]),
						"data-testid": "inspector-toggle",
						"aria-label": z.value,
						"aria-pressed": !a.inspectorCollapsed,
						onClick: B
					}, [y(x, {
						icon: R.value,
						size: 16
					}, null, 8, ["icon"])], 10, K)]),
					_: 1
				}, 8, ["content"])) : s("", !0),
				y(O, {
					content: l(b)("common.close"),
					side: "bottom"
				}, {
					default: t(() => [u("button", {
						type: "button",
						class: o(["tc-interactive", [l(e).icon_button, l(e).close_button]]),
						"data-testid": "studio-close",
						"aria-label": l(b)("common.close"),
						onClick: p[1] ||= (e) => v("close")
					}, [y(x, {
						icon: l(E),
						size: 16
					}, null, 8, ["icon"])], 10, q)]),
					_: 1
				}, 8, ["content"])
			], 2)
		], 2));
	}
}), Y = ["data-viewport", "data-inspector-collapsed"], X = ["aria-label"], Z = /* @__PURE__ */ v({
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
	setup(t, { emit: n }) {
		let g = a(() => import("./ContextInspector-BU7Rl_A-.js")), _ = a(() => import("./InspectorSheet-ByM4O0ug.js")), v = a(() => import("./MobileBottomNav-Dlpso8DH.js")), b = t, x = n, { t: S } = f(), C = D(b.viewport), w = /* @__PURE__ */ new Set(["vocabulary"]), T = p(() => [...b.state.loading].some((e) => !w.has(e))), E = p(() => b.state.failures.size > 0), O = p(() => ({ "--tc-inspector-width": `${String(b.state.inspector.width)}px` })), k = h(!1), A = p(() => b.state.route === "gallery"), j = p(() => !A.value || b.state.inspector.collapsed), M = p(() => C.value === "mobile" ? !k.value : j.value);
		function N(e) {
			C.value === "mobile" && (k.value = !e), x("set-inspector-collapsed", e);
		}
		function P(e) {
			x("select-route", e);
		}
		return (t, n) => (r(), i("div", {
			class: o(l(e).shell),
			"data-viewport": l(C),
			"data-inspector-collapsed": l(C) === "desktop" ? j.value : null,
			style: m(O.value)
		}, [
			y(J, {
				route: b.state.route,
				tasks: b.state.tasks,
				"show-tabs": l(C) === "desktop",
				"inspector-collapsed": M.value,
				"inspector-available": A.value,
				onSelectRoute: P,
				onSetInspectorCollapsed: N,
				onClearFailedTasks: n[0] ||= () => void b.controller.dismiss_failed_tasks(),
				onClose: n[1] ||= (e) => x("close")
			}, null, 8, [
				"route",
				"tasks",
				"show-tabs",
				"inspector-collapsed",
				"inspector-available"
			]),
			u("main", {
				class: o(l(e).workspace),
				"data-testid": "workspace"
			}, [E.value ? (r(), i("div", {
				key: 0,
				class: o(l(e).partial_banner),
				"data-testid": "partial-banner"
			}, [u("div", null, [u("p", null, d(l(S)("app.partial_init.banner_title")), 1), u("p", null, d(l(S)("app.partial_init.banner_description")), 1)]), u("button", {
				type: "button",
				class: o(["tc-interactive", l(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: n[2] ||= (e) => b.controller.set_settings_section("diagnostics")
			}, d(l(S)("settings.nav.diagnostics")), 3)], 2)) : s("", !0), T.value ? (r(), i("div", {
				key: 1,
				class: o(l(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": l(S)("status.loading")
			}, [
				u("div", { class: o([l(e).skeleton_block, l(e).skeleton_title]) }, null, 2),
				u("div", { class: o([l(e).skeleton_block, l(e).skeleton_line]) }, null, 2),
				u("div", { class: o([l(e).skeleton_block, l(e).skeleton_line_short]) }, null, 2)
			], 10, X)) : (r(), c(R, {
				key: 2,
				state: b.state,
				controller: b.controller
			}, null, 8, ["state", "controller"]))], 2),
			l(C) === "desktop" && A.value && !b.state.inspector.collapsed ? (r(), c(l(g), {
				key: 0,
				width: b.state.inspector.width,
				selection: b.state.inspector.selected_record,
				onResize: n[3] ||= (e) => x("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : s("", !0),
			l(C) === "mobile" ? (r(), c(l(v), {
				key: 1,
				route: b.state.route,
				onSelect: P
			}, null, 8, ["route"])) : s("", !0),
			l(C) === "mobile" && A.value ? (r(), c(l(_), {
				key: 2,
				open: k.value,
				selection: b.state.inspector.selected_record,
				"onUpdate:open": n[4] ||= (e) => N(!e)
			}, null, 8, ["open", "selection"])) : s("", !0)
		], 14, Y));
	}
});
//#endregion
export { Z as default };
