import { t as e } from "./shell.module-bsdu70fJ.js";
import { F as t, N as n, W as r, _ as i, b as a, ct as o, et as s, ft as c, g as l, h as u, m as d, n as f, p, pt as m, u as h, ut as g, v as _, x as v, y } from "./vue-i18n-DUz2Gjn8.js";
import { n as b, t as x } from "./AppIcon-Cnhzrx9o.js";
import { n as S, t as C } from "./route_nav-DYh_X9u3.js";
import { n as w } from "./components_styles-AQk4evuq.js";
import { t as T } from "./trash-2-B6ZXZcor.js";
import { t as E } from "./x-CDKrptQJ.js";
import { t as D } from "./use_shell_viewport-gzNx5bpo.js";
import { t as O } from "./AppTooltip-CUidZ-oG.js";
import { i as k, n as A, r as j, t as M } from "./PopoverTrigger-CZT9XAF0.js";
import { t as N } from "./slot_error_label-DVTxbQeB.js";
import { t as P } from "./use_portal_target-B1sQl01g.js";
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
		let t = a(() => import("./GalleryView-o3EU10OW.js")), r = a(() => import("./SettingsView-DN33PvMu.js")), i = a(() => import("./AssetsView-C4bW5Z8-.js"));
		return (a, s) => e.state.route === "gallery" ? (n(), u(o(t), {
			key: 0,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "library" ? (n(), u(o(i), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (n(), u(o(r), {
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
	setup(r, { emit: a }) {
		let s = r, c = a, { t: u, n: _ } = f(), v = {
			"status.loading": () => u("status.loading"),
			"status.empty": () => u("status.empty"),
			"status.partial": () => u("status.partial"),
			"status.error": () => u("status.error"),
			"status.disabled": () => u("status.disabled"),
			"status.success": () => u("status.success"),
			"status.pending": () => u("status.pending"),
			"status.running": () => u("status.running"),
			"status.cancelled": () => u("status.cancelled"),
			"status.completed": () => u("status.completed"),
			"status.failed": () => u("status.failed"),
			"status.retrying": () => u("status.retrying"),
			"status.online": () => u("status.online"),
			"status.offline": () => u("status.offline"),
			"status.connected": () => u("status.connected"),
			"status.blocked": () => u("status.blocked"),
			"status.unknown": () => u("status.unknown")
		};
		function b(e) {
			return v[e]?.() ?? e;
		}
		function S(e) {
			let t = b(e.label_code);
			return e.error === null ? t : t + u("nav.task_strip_error", { reason: N(u, e.error) });
		}
		let C = p(() => s.tasks.some((e) => e.status === "error"));
		return (r, a) => (n(), i("div", {
			class: g(o(e).task_strip),
			"data-testid": "task-list"
		}, [d("div", { class: g(o(e).task_strip_header) }, [d("span", { class: g([o(e).task_strip_summary, "tc-tabular-nums"]) }, m(o(u)("nav.task_strip_count", s.tasks.length)), 3), C.value ? (n(), i("button", {
			key: 0,
			type: "button",
			class: g(["tc-interactive", o(e).icon_button]),
			"aria-label": o(u)("nav.task_strip_clear_failed"),
			title: o(u)("nav.task_strip_clear_failed"),
			"data-testid": "task-strip-clear-failed",
			onClick: a[0] ||= (e) => c("clear-failed")
		}, [y(x, {
			icon: o(T),
			size: 16
		}, null, 8, ["icon"])], 10, z)) : l("", !0)], 2), d("div", { class: g(o(e).task_strip_list) }, [(n(!0), i(h, null, t(s.tasks, (t) => (n(), i("div", {
			key: t.id,
			class: g(o(e).task_chip)
		}, [
			d("span", {
				class: g(o(e).task_chip_dot),
				"data-status": t.status
			}, null, 10, B),
			d("span", { class: g(o(e).task_chip_label) }, m(S(t)), 3),
			t.progress === null ? l("", !0) : (n(), i("span", V, m(o(_)(t.progress, "percent")), 1))
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
	setup(a, { emit: s }) {
		let c = a, v = s, { t: b } = f(), T = P(), D = p(() => C.map((e) => ({
			...e,
			label: S(b, e.route)
		}))), N = p(() => c.tasks.some((e) => e.status === "pending")), R = p(() => c.inspectorCollapsed ? L : I), z = p(() => c.inspectorCollapsed ? b("nav.inspector_expand") : b("nav.inspector_collapse"));
		function B() {
			v("set-inspector-collapsed", !c.inspectorCollapsed);
		}
		return (s, f) => (n(), i("header", {
			class: g(o(e).top_bar),
			"data-window-drag-handle": ""
		}, [
			d("span", { class: g(o(e).top_bar_brand) }, [d("span", {
				class: g(o(e).top_bar_brand_mark),
				"aria-hidden": "true"
			}, [y(x, {
				icon: o(F),
				size: 15
			}, null, 8, ["icon"])], 2), _(" " + m(o(b)("app.name")), 1)], 2),
			a.showTabs ? (n(), i("nav", {
				key: 0,
				class: g(o(e).top_tabs),
				"aria-label": o(b)("app.name"),
				"data-testid": "studio-tabs"
			}, [(n(!0), i(h, null, t(D.value, (t) => (n(), i("button", {
				key: t.route,
				type: "button",
				class: g(["tc-interactive", o(e).top_tab]),
				"aria-current": t.route === c.route ? "page" : void 0,
				onClick: (e) => v("select-route", t.route)
			}, [y(x, {
				icon: t.icon,
				size: 16
			}, null, 8, ["icon"]), d("span", null, m(t.label), 1)], 10, W))), 128))], 10, U)) : l("", !0),
			d("div", { class: g(o(e).top_bar_end) }, [
				c.tasks.length > 0 ? (n(), u(o(k), { key: 0 }, {
					default: r(() => [y(o(M), { "as-child": "" }, {
						default: r(() => [d("button", {
							type: "button",
							class: g(["tc-interactive", o(e).task_pill]),
							"data-testid": "task-pill",
							"aria-label": o(b)("nav.task_strip_count", c.tasks.length)
						}, [y(x, {
							icon: o(w),
							size: 15,
							class: g(N.value ? o(e).task_pill_spin : void 0)
						}, null, 8, ["icon", "class"]), d("span", { class: g([o(e).task_pill_label, "tc-tabular-nums"]) }, m(o(b)("nav.task_strip_count", c.tasks.length)), 3)], 10, G)]),
						_: 1
					}), y(o(A), { to: o(T) }, {
						default: r(() => [y(o(j), {
							class: g(o(e).task_popover),
							align: "end",
							"side-offset": 8
						}, {
							default: r(() => [y(H, {
								tasks: c.tasks,
								onClearFailed: f[0] ||= (e) => v("clear-failed-tasks")
							}, null, 8, ["tasks"])]),
							_: 1
						}, 8, ["class"])]),
						_: 1
					}, 8, ["to"])]),
					_: 1
				})) : l("", !0),
				a.inspectorAvailable ? (n(), u(O, {
					key: 1,
					content: z.value,
					side: "bottom"
				}, {
					default: r(() => [d("button", {
						type: "button",
						class: g(["tc-interactive", o(e).icon_button]),
						"data-testid": "inspector-toggle",
						"aria-label": z.value,
						"aria-pressed": !a.inspectorCollapsed,
						onClick: B
					}, [y(x, {
						icon: R.value,
						size: 16
					}, null, 8, ["icon"])], 10, K)]),
					_: 1
				}, 8, ["content"])) : l("", !0),
				y(O, {
					content: o(b)("common.close"),
					side: "bottom"
				}, {
					default: r(() => [d("button", {
						type: "button",
						class: g(["tc-interactive", [o(e).icon_button, o(e).close_button]]),
						"data-testid": "studio-close",
						"aria-label": o(b)("common.close"),
						onClick: f[1] ||= (e) => v("close")
					}, [y(x, {
						icon: o(E),
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
	setup(t, { emit: r }) {
		let h = a(() => import("./ContextInspector-DgVGWz7-.js")), _ = a(() => import("./InspectorSheet-Das1BaL8.js")), v = a(() => import("./MobileBottomNav-DcDm0CW4.js")), b = t, x = r, { t: S } = f(), C = D(b.viewport), w = /* @__PURE__ */ new Set(["vocabulary"]), T = p(() => [...b.state.loading].some((e) => !w.has(e))), E = p(() => b.state.failures.size > 0), O = p(() => ({ "--tc-inspector-width": `${String(b.state.inspector.width)}px` })), k = s(!1), A = p(() => b.state.route === "gallery" || b.state.route === "library"), j = p(() => !A.value || b.state.inspector.collapsed), M = p(() => C.value === "mobile" ? !k.value : j.value);
		function N(e) {
			C.value === "mobile" && (k.value = !e), x("set-inspector-collapsed", e);
		}
		function P(e) {
			x("select-route", e);
		}
		return (t, r) => (n(), i("div", {
			class: g(o(e).shell),
			"data-viewport": o(C),
			"data-inspector-collapsed": o(C) === "desktop" ? j.value : null,
			style: c(O.value)
		}, [
			y(J, {
				route: b.state.route,
				tasks: b.state.tasks,
				"show-tabs": o(C) === "desktop",
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
			d("main", {
				class: g(o(e).workspace),
				"data-testid": "workspace"
			}, [E.value ? (n(), i("div", {
				key: 0,
				class: g(o(e).partial_banner),
				"data-testid": "partial-banner"
			}, [d("div", null, [d("p", null, m(o(S)("app.partial_init.banner_title")), 1), d("p", null, m(o(S)("app.partial_init.banner_description")), 1)]), d("button", {
				type: "button",
				class: g(["tc-interactive", o(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: r[2] ||= (e) => b.controller.set_settings_section("diagnostics")
			}, m(o(S)("settings.nav.diagnostics")), 3)], 2)) : l("", !0), T.value ? (n(), i("div", {
				key: 1,
				class: g(o(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": o(S)("status.loading")
			}, [
				d("div", { class: g([o(e).skeleton_block, o(e).skeleton_title]) }, null, 2),
				d("div", { class: g([o(e).skeleton_block, o(e).skeleton_line]) }, null, 2),
				d("div", { class: g([o(e).skeleton_block, o(e).skeleton_line_short]) }, null, 2)
			], 10, X)) : (n(), u(R, {
				key: 2,
				state: b.state,
				controller: b.controller
			}, null, 8, ["state", "controller"]))], 2),
			o(C) === "desktop" && A.value && !b.state.inspector.collapsed ? (n(), u(o(h), {
				key: 0,
				width: b.state.inspector.width,
				selection: b.state.inspector.selected_record,
				onResize: r[3] ||= (e) => x("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : l("", !0),
			o(C) === "mobile" ? (n(), u(o(v), {
				key: 1,
				route: b.state.route,
				onSelect: P
			}, null, 8, ["route"])) : l("", !0),
			o(C) === "mobile" && A.value ? (n(), u(o(_), {
				key: 2,
				open: k.value,
				selection: b.state.inspector.selected_record,
				"onUpdate:open": r[4] ||= (e) => N(!e)
			}, null, 8, ["open", "selection"])) : l("", !0)
		], 14, Y));
	}
});
//#endregion
export { Z as default };
