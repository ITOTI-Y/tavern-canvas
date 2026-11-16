import { t as e } from "./shell.module-Bkh0ofYg.js";
import { F as t, L as n, _ as r, b as i, dt as a, g as o, gt as s, h as c, ht as l, m as u, n as d, p as f, pt as p, q as m, rt as h, u as g, v as _, x as v, y } from "./vue-i18n-XoxYzLIP.js";
import { n as b, t as x } from "./AppIcon-DD754F_c.js";
import { n as S, t as C } from "./route_nav-CLGBgaEt.js";
import { n as w } from "./components_styles-BXC5Dc_L.js";
import { t as T } from "./trash-2-Cl_9_CUX.js";
import { t as E } from "./x-CyHrRl6n.js";
import { t as D } from "./use_shell_viewport-DbBNJ7xc.js";
import { t as O } from "./AppTooltip-CmgWxKYL.js";
import { n as k, r as A, t as j } from "./PopoverPortal-iJ-JXJ4S.js";
import { t as M } from "./PopoverTrigger-BTrioSF6.js";
import { t as N } from "./slot_error_label-Dz5Iarxp.js";
import { t as P } from "./use_portal_target-BjeZ76eT.js";
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
		let n = i(() => import("./GalleryView-DrL09N1Z.js")), r = i(() => import("./SettingsView-DTXdGbRc.js")), o = i(() => import("./AssetsView-BeBGBgsy.js")), s = i(() => import("./CreateView-PI4-yMf7.js")), l = i(() => import("./OpeningView-BHTr0xGB.js"));
		return (i, u) => e.state.route === "gallery" ? (t(), c(a(n), {
			key: 0,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "library" ? (t(), c(a(o), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "create" ? (t(), c(a(s), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "opening" ? (t(), c(a(l), {
			key: 3,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (t(), c(a(r), {
			key: 4,
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
	setup(i, { emit: c }) {
		let l = i, m = c, { t: h, n: _ } = d(), v = {
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
		let C = f(() => l.tasks.some((e) => e.status === "error"));
		return (i, c) => (t(), r("div", {
			class: p(a(e).task_strip),
			"data-testid": "task-list"
		}, [u("div", { class: p(a(e).task_strip_header) }, [u("span", { class: p([a(e).task_strip_summary, "tc-tabular-nums"]) }, s(a(h)("nav.task_strip_count", l.tasks.length)), 3), C.value ? (t(), r("button", {
			key: 0,
			type: "button",
			class: p(["tc-interactive", a(e).icon_button]),
			"aria-label": a(h)("nav.task_strip_clear_failed"),
			title: a(h)("nav.task_strip_clear_failed"),
			"data-testid": "task-strip-clear-failed",
			onClick: c[0] ||= (e) => m("clear-failed")
		}, [y(x, {
			icon: a(T),
			size: 16
		}, null, 8, ["icon"])], 10, z)) : o("", !0)], 2), u("div", { class: p(a(e).task_strip_list) }, [(t(!0), r(g, null, n(l.tasks, (n) => (t(), r("div", {
			key: n.id,
			class: p(a(e).task_chip)
		}, [
			u("span", {
				class: p(a(e).task_chip_dot),
				"data-status": n.status
			}, null, 10, B),
			u("span", { class: p(a(e).task_chip_label) }, s(S(n)), 3),
			n.progress === null ? o("", !0) : (t(), r("span", V, s(a(_)(n.progress, "percent")), 1))
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
	setup(i, { emit: l }) {
		let h = i, v = l, { t: b } = d(), T = P(), D = f(() => C.map((e) => ({
			...e,
			label: S(b, e.route)
		}))), N = f(() => h.tasks.some((e) => e.status === "pending")), R = f(() => h.inspectorCollapsed ? L : I), z = f(() => h.inspectorCollapsed ? b("nav.inspector_expand") : b("nav.inspector_collapse"));
		function B() {
			v("set-inspector-collapsed", !h.inspectorCollapsed);
		}
		return (l, d) => (t(), r("header", {
			class: p(a(e).top_bar),
			"data-window-drag-handle": ""
		}, [
			u("span", { class: p(a(e).top_bar_brand) }, [u("span", {
				class: p(a(e).top_bar_brand_mark),
				"aria-hidden": "true"
			}, [y(x, {
				icon: a(F),
				size: 15
			}, null, 8, ["icon"])], 2), _(" " + s(a(b)("app.name")), 1)], 2),
			i.showTabs ? (t(), r("nav", {
				key: 0,
				class: p(a(e).top_tabs),
				"aria-label": a(b)("app.name"),
				"data-testid": "studio-tabs"
			}, [(t(!0), r(g, null, n(D.value, (n) => (t(), r("button", {
				key: n.route,
				type: "button",
				class: p(["tc-interactive", a(e).top_tab]),
				"aria-current": n.route === h.route ? "page" : void 0,
				onClick: (e) => v("select-route", n.route)
			}, [y(x, {
				icon: n.icon,
				size: 16
			}, null, 8, ["icon"]), u("span", null, s(n.label), 1)], 10, W))), 128))], 10, U)) : o("", !0),
			u("div", { class: p(a(e).top_bar_end) }, [
				h.tasks.length > 0 ? (t(), c(a(A), { key: 0 }, {
					default: m(() => [y(a(M), { "as-child": "" }, {
						default: m(() => [u("button", {
							type: "button",
							class: p(["tc-interactive", a(e).task_pill]),
							"data-testid": "task-pill",
							"aria-label": a(b)("nav.task_strip_count", h.tasks.length)
						}, [y(x, {
							icon: a(w),
							size: 15,
							class: p(N.value ? a(e).task_pill_spin : void 0)
						}, null, 8, ["icon", "class"]), u("span", { class: p([a(e).task_pill_label, "tc-tabular-nums"]) }, s(a(b)("nav.task_strip_count", h.tasks.length)), 3)], 10, G)]),
						_: 1
					}), y(a(j), { to: a(T) }, {
						default: m(() => [y(a(k), {
							class: p(a(e).task_popover),
							align: "end",
							"side-offset": 8
						}, {
							default: m(() => [y(H, {
								tasks: h.tasks,
								onClearFailed: d[0] ||= (e) => v("clear-failed-tasks")
							}, null, 8, ["tasks"])]),
							_: 1
						}, 8, ["class"])]),
						_: 1
					}, 8, ["to"])]),
					_: 1
				})) : o("", !0),
				i.inspectorAvailable ? (t(), c(O, {
					key: 1,
					content: z.value,
					side: "bottom"
				}, {
					default: m(() => [u("button", {
						type: "button",
						class: p(["tc-interactive", a(e).icon_button]),
						"data-testid": "inspector-toggle",
						"aria-label": z.value,
						"aria-pressed": !i.inspectorCollapsed,
						onClick: B
					}, [y(x, {
						icon: R.value,
						size: 16
					}, null, 8, ["icon"])], 10, K)]),
					_: 1
				}, 8, ["content"])) : o("", !0),
				y(O, {
					content: a(b)("common.close"),
					side: "bottom"
				}, {
					default: m(() => [u("button", {
						type: "button",
						class: p(["tc-interactive", [a(e).icon_button, a(e).close_button]]),
						"data-testid": "studio-close",
						"aria-label": a(b)("common.close"),
						onClick: d[1] ||= (e) => v("close")
					}, [y(x, {
						icon: a(E),
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
	setup(n, { emit: m }) {
		let g = i(() => import("./ContextInspector-BnXo2g4x.js")), _ = i(() => import("./InspectorSheet-z-R9nuQ4.js")), v = i(() => import("./MobileBottomNav-CHGWDTsJ.js")), b = n, x = m, { t: S } = d(), C = D(b.viewport), w = /* @__PURE__ */ new Set(["vocabulary"]), T = f(() => [...b.state.loading].some((e) => !w.has(e))), E = f(() => b.state.failures.size > 0), O = f(() => ({ "--tc-inspector-width": `${String(b.state.inspector.width)}px` })), k = h(!1), A = f(() => b.state.route === "gallery"), j = f(() => !A.value || b.state.inspector.collapsed), M = f(() => C.value === "mobile" ? !k.value : j.value);
		function N(e) {
			C.value === "mobile" && (k.value = !e), x("set-inspector-collapsed", e);
		}
		function P(e) {
			x("select-route", e);
		}
		return (n, i) => (t(), r("div", {
			class: p(a(e).shell),
			"data-viewport": a(C),
			"data-inspector-collapsed": a(C) === "desktop" ? j.value : null,
			style: l(O.value)
		}, [
			y(J, {
				route: b.state.route,
				tasks: b.state.tasks,
				"show-tabs": a(C) === "desktop",
				"inspector-collapsed": M.value,
				"inspector-available": A.value,
				onSelectRoute: P,
				onSetInspectorCollapsed: N,
				onClearFailedTasks: i[0] ||= () => void b.controller.dismiss_failed_tasks(),
				onClose: i[1] ||= (e) => x("close")
			}, null, 8, [
				"route",
				"tasks",
				"show-tabs",
				"inspector-collapsed",
				"inspector-available"
			]),
			u("main", {
				class: p(a(e).workspace),
				"data-testid": "workspace"
			}, [E.value ? (t(), r("div", {
				key: 0,
				class: p(a(e).partial_banner),
				"data-testid": "partial-banner"
			}, [u("div", null, [u("p", null, s(a(S)("app.partial_init.banner_title")), 1), u("p", null, s(a(S)("app.partial_init.banner_description")), 1)]), u("button", {
				type: "button",
				class: p(["tc-interactive", a(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: i[2] ||= (e) => b.controller.set_settings_section("diagnostics")
			}, s(a(S)("settings.nav.diagnostics")), 3)], 2)) : o("", !0), T.value ? (t(), r("div", {
				key: 1,
				class: p(a(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": a(S)("status.loading")
			}, [
				u("div", { class: p([a(e).skeleton_block, a(e).skeleton_title]) }, null, 2),
				u("div", { class: p([a(e).skeleton_block, a(e).skeleton_line]) }, null, 2),
				u("div", { class: p([a(e).skeleton_block, a(e).skeleton_line_short]) }, null, 2)
			], 10, X)) : (t(), c(R, {
				key: 2,
				state: b.state,
				controller: b.controller
			}, null, 8, ["state", "controller"]))], 2),
			a(C) === "desktop" && A.value && !b.state.inspector.collapsed ? (t(), c(a(g), {
				key: 0,
				width: b.state.inspector.width,
				selection: b.state.inspector.selected_record,
				onResize: i[3] ||= (e) => x("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : o("", !0),
			a(C) === "mobile" ? (t(), c(a(v), {
				key: 1,
				route: b.state.route,
				onSelect: P
			}, null, 8, ["route"])) : o("", !0),
			a(C) === "mobile" && A.value ? (t(), c(a(_), {
				key: 2,
				open: k.value,
				selection: b.state.inspector.selected_record,
				"onUpdate:open": i[4] ||= (e) => N(!e)
			}, null, 8, ["open", "selection"])) : o("", !0)
		], 14, Y));
	}
});
//#endregion
export { Z as default };
