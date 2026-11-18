import { t as e } from "./shell.module-Bkh0ofYg.js";
import { F as t, I as n, L as r, _ as i, b as a, dt as o, g as s, gt as c, h as l, ht as u, m as d, n as f, p, pt as m, q as h, rt as g, u as _, v, x as y, y as b } from "./vue-i18n-XoxYzLIP.js";
import { n as x } from "./portal_keys-CIBE-_PC.js";
import { n as S, t as C } from "./use_shell_viewport-SYgqjvre.js";
import { n as w, t as T } from "./AppIcon-DD754F_c.js";
import { n as E } from "./components_styles-CTlfgDU5.js";
import { n as D, t as O } from "./route_nav-CLGBgaEt.js";
import { t as k } from "./trash-2-Cl_9_CUX.js";
import { t as A } from "./x-CyHrRl6n.js";
import { t as j } from "./AppTooltip-D3BiEM01.js";
import { t as M } from "./ToastViewport-DmwVzyoR.js";
import { n as N, r as P, t as F } from "./PopoverPortal-CubTQ6nq.js";
import { t as I } from "./PopoverTrigger-Ds3NuxQO.js";
import { t as L } from "./slot_error_label-OLw2A1jQ.js";
import { t as R } from "./use_portal_target-Dz0vdIvT.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/feather.js
var z = w("feather", [
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
]), B = w("panel-right-close", [
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
]), V = w("panel-right-open", [
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
]), H = /* @__PURE__ */ y({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let n = a(() => import("./GalleryView-DeOw3i0g.js")), r = a(() => import("./SettingsView-iC5h7gRG.js")), i = a(() => import("./AssetsView-RClWTg3Q.js")), s = a(() => import("./CreateView-D9BKlqPX.js")), c = a(() => import("./OpeningView-B8QqIv3q.js"));
		return (a, u) => e.state.route === "gallery" ? (t(), l(o(n), {
			key: 0,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "library" ? (t(), l(o(i), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "create" ? (t(), l(o(s), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : e.state.route === "opening" ? (t(), l(o(c), {
			key: 3,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (t(), l(o(r), {
			key: 4,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"]));
	}
}), U = ["aria-label", "title"], W = ["data-status"], G = {
	key: 0,
	class: "tc-tabular-nums"
}, K = /* @__PURE__ */ y({
	__name: "TaskStrip",
	props: { tasks: {} },
	emits: ["clear-failed"],
	setup(n, { emit: a }) {
		let l = n, u = a, { t: h, n: g } = f(), v = {
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
		function y(e) {
			return v[e]?.() ?? e;
		}
		function x(e) {
			let t = y(e.label_code);
			return e.error === null ? t : t + h("nav.task_strip_error", { reason: L(h, e.error) });
		}
		let S = p(() => l.tasks.some((e) => e.status === "error"));
		return (n, a) => (t(), i("div", {
			class: m(o(e).task_strip),
			"data-testid": "task-list"
		}, [d("div", { class: m(o(e).task_strip_header) }, [d("span", { class: m([o(e).task_strip_summary, "tc-tabular-nums"]) }, c(o(h)("nav.task_strip_count", l.tasks.length)), 3), S.value ? (t(), i("button", {
			key: 0,
			type: "button",
			class: m(["tc-interactive", o(e).icon_button]),
			"aria-label": o(h)("nav.task_strip_clear_failed"),
			title: o(h)("nav.task_strip_clear_failed"),
			"data-testid": "task-strip-clear-failed",
			onClick: a[0] ||= (e) => u("clear-failed")
		}, [b(T, {
			icon: o(k),
			size: 16
		}, null, 8, ["icon"])], 10, U)) : s("", !0)], 2), d("div", { class: m(o(e).task_strip_list) }, [(t(!0), i(_, null, r(l.tasks, (n) => (t(), i("div", {
			key: n.id,
			class: m(o(e).task_chip)
		}, [
			d("span", {
				class: m(o(e).task_chip_dot),
				"data-status": n.status
			}, null, 10, W),
			d("span", { class: m(o(e).task_chip_label) }, c(x(n)), 3),
			n.progress === null ? s("", !0) : (t(), i("span", G, c(o(g)(n.progress, "percent")), 1))
		], 2))), 128))], 2)], 2));
	}
}), q = ["aria-label"], J = ["aria-current", "onClick"], Y = ["aria-label"], X = ["aria-label", "aria-pressed"], Z = ["aria-label"], Q = /* @__PURE__ */ y({
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
	setup(n, { emit: a }) {
		let u = n, g = a, { t: y } = f(), x = R(), S = p(() => O.map((e) => ({
			...e,
			label: D(y, e.route)
		}))), C = p(() => u.tasks.some((e) => e.status === "pending")), w = p(() => u.inspectorCollapsed ? V : B), k = p(() => u.inspectorCollapsed ? y("nav.inspector_expand") : y("nav.inspector_collapse"));
		function M() {
			g("set-inspector-collapsed", !u.inspectorCollapsed);
		}
		return (a, f) => (t(), i("header", {
			class: m(o(e).top_bar),
			"data-window-drag-handle": ""
		}, [
			d("span", { class: m(o(e).top_bar_brand) }, [d("span", {
				class: m(o(e).top_bar_brand_mark),
				"aria-hidden": "true"
			}, [b(T, {
				icon: o(z),
				size: 15
			}, null, 8, ["icon"])], 2), v(" " + c(o(y)("app.name")), 1)], 2),
			n.showTabs ? (t(), i("nav", {
				key: 0,
				class: m(o(e).top_tabs),
				"aria-label": o(y)("app.name"),
				"data-testid": "studio-tabs"
			}, [(t(!0), i(_, null, r(S.value, (n) => (t(), i("button", {
				key: n.route,
				type: "button",
				class: m(["tc-interactive", o(e).top_tab]),
				"aria-current": n.route === u.route ? "page" : void 0,
				onClick: (e) => g("select-route", n.route)
			}, [b(T, {
				icon: n.icon,
				size: 16
			}, null, 8, ["icon"]), d("span", null, c(n.label), 1)], 10, J))), 128))], 10, q)) : s("", !0),
			d("div", { class: m(o(e).top_bar_end) }, [
				u.tasks.length > 0 ? (t(), l(o(P), { key: 0 }, {
					default: h(() => [b(o(I), { "as-child": "" }, {
						default: h(() => [d("button", {
							type: "button",
							class: m(["tc-interactive", o(e).task_pill]),
							"data-testid": "task-pill",
							"aria-label": o(y)("nav.task_strip_count", u.tasks.length)
						}, [b(T, {
							icon: o(E),
							size: 15,
							class: m(C.value ? o(e).task_pill_spin : void 0)
						}, null, 8, ["icon", "class"]), d("span", { class: m([o(e).task_pill_label, "tc-tabular-nums"]) }, c(o(y)("nav.task_strip_count", u.tasks.length)), 3)], 10, Y)]),
						_: 1
					}), b(o(F), { to: o(x) }, {
						default: h(() => [b(o(N), {
							class: m(o(e).task_popover),
							align: "end",
							"side-offset": 8
						}, {
							default: h(() => [b(K, {
								tasks: u.tasks,
								onClearFailed: f[0] ||= (e) => g("clear-failed-tasks")
							}, null, 8, ["tasks"])]),
							_: 1
						}, 8, ["class"])]),
						_: 1
					}, 8, ["to"])]),
					_: 1
				})) : s("", !0),
				n.inspectorAvailable ? (t(), l(j, {
					key: 1,
					content: k.value,
					side: "bottom"
				}, {
					default: h(() => [d("button", {
						type: "button",
						class: m(["tc-interactive", o(e).icon_button]),
						"data-testid": "inspector-toggle",
						"aria-label": k.value,
						"aria-pressed": !n.inspectorCollapsed,
						onClick: M
					}, [b(T, {
						icon: w.value,
						size: 16
					}, null, 8, ["icon"])], 10, X)]),
					_: 1
				}, 8, ["content"])) : s("", !0),
				b(j, {
					content: o(y)("common.close"),
					side: "bottom"
				}, {
					default: h(() => [d("button", {
						type: "button",
						class: m(["tc-interactive", [o(e).icon_button, o(e).close_button]]),
						"data-testid": "studio-close",
						"aria-label": o(y)("common.close"),
						onClick: f[1] ||= (e) => g("close")
					}, [b(T, {
						icon: o(A),
						size: 16
					}, null, 8, ["icon"])], 10, Z)]),
					_: 1
				}, 8, ["content"])
			], 2)
		], 2));
	}
}), $ = ["data-viewport", "data-inspector-collapsed"], ee = ["aria-label"], te = /* @__PURE__ */ y({
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
	setup(r, { emit: h }) {
		let _ = a(() => import("./ContextInspector-BnXo2g4x.js")), v = a(() => import("./InspectorSheet-DicfiB8H.js")), y = a(() => import("./MobileBottomNav-CHGWDTsJ.js")), w = r, T = h, { t: E } = f(), D = C(w.viewport), O = /* @__PURE__ */ new Set(["vocabulary"]), k = p(() => [...w.state.loading].some((e) => !O.has(e))), A = p(() => w.state.failures.size > 0), j = p(() => ({ "--tc-inspector-width": `${String(w.state.inspector.width)}px` })), N = g(!1), P = p(() => w.state.route === "gallery"), F = p(() => !P.value || w.state.inspector.collapsed), I = p(() => D.value === "mobile" ? !N.value : F.value);
		function L(e) {
			D.value === "mobile" && (N.value = !e), T("set-inspector-collapsed", e);
		}
		function R(e) {
			T("select-route", e);
		}
		n(x, (e, t) => {
			w.controller.defer_deletion(e, t);
		});
		function z(e) {
			return e.label === null ? E("app.deletion.deleted_count", { n: e.count }) : E("app.deletion.deleted_named", { name: e.label });
		}
		let B = g(/* @__PURE__ */ new Set()), V = p(() => [...w.state.pending_deletions.filter((e) => !B.value.has(e.id)).map((e) => ({
			id: e.id,
			title: z(e),
			duration: S,
			action: {
				label: E("app.deletion.undo"),
				run: () => {
					w.controller.undo_deletion(e.id);
				}
			}
		})), ...w.state.deletion_failure === null ? [] : [{
			id: "deletion-failure",
			title: E("app.deletion.failed"),
			description: w.state.deletion_failure.message,
			variant: "error"
		}]]);
		function U(e) {
			if (e === "deletion-failure") {
				w.controller.dismiss_deletion_failure();
				return;
			}
			B.value = /* @__PURE__ */ new Set([...B.value, e]);
		}
		return (n, r) => (t(), i("div", {
			class: m(o(e).shell),
			"data-viewport": o(D),
			"data-inspector-collapsed": o(D) === "desktop" ? F.value : null,
			style: u(j.value)
		}, [
			b(Q, {
				route: w.state.route,
				tasks: w.state.tasks,
				"show-tabs": o(D) === "desktop",
				"inspector-collapsed": I.value,
				"inspector-available": P.value,
				onSelectRoute: R,
				onSetInspectorCollapsed: L,
				onClearFailedTasks: r[0] ||= () => void w.controller.dismiss_failed_tasks(),
				onClose: r[1] ||= (e) => T("close")
			}, null, 8, [
				"route",
				"tasks",
				"show-tabs",
				"inspector-collapsed",
				"inspector-available"
			]),
			d("main", {
				class: m(o(e).workspace),
				"data-testid": "workspace"
			}, [A.value ? (t(), i("div", {
				key: 0,
				class: m(o(e).partial_banner),
				"data-testid": "partial-banner"
			}, [d("div", null, [d("p", null, c(o(E)("app.partial_init.banner_title")), 1), d("p", null, c(o(E)("app.partial_init.banner_description")), 1)]), d("button", {
				type: "button",
				class: m(["tc-interactive", o(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: r[2] ||= (e) => w.controller.set_settings_section("diagnostics")
			}, c(o(E)("settings.nav.diagnostics")), 3)], 2)) : s("", !0), k.value ? (t(), i("div", {
				key: 1,
				class: m(o(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": o(E)("status.loading")
			}, [
				d("div", { class: m([o(e).skeleton_block, o(e).skeleton_title]) }, null, 2),
				d("div", { class: m([o(e).skeleton_block, o(e).skeleton_line]) }, null, 2),
				d("div", { class: m([o(e).skeleton_block, o(e).skeleton_line_short]) }, null, 2)
			], 10, ee)) : (t(), l(H, {
				key: 2,
				state: w.state,
				controller: w.controller
			}, null, 8, ["state", "controller"]))], 2),
			o(D) === "desktop" && P.value && !w.state.inspector.collapsed ? (t(), l(o(_), {
				key: 0,
				width: w.state.inspector.width,
				selection: w.state.inspector.selected_record,
				onResize: r[3] ||= (e) => T("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : s("", !0),
			o(D) === "mobile" ? (t(), l(o(y), {
				key: 1,
				route: w.state.route,
				onSelect: R
			}, null, 8, ["route"])) : s("", !0),
			o(D) === "mobile" && P.value ? (t(), l(o(v), {
				key: 2,
				open: N.value,
				selection: w.state.inspector.selected_record,
				"onUpdate:open": r[4] ||= (e) => L(!e)
			}, null, 8, ["open", "selection"])) : s("", !0),
			b(M, {
				toasts: V.value,
				"viewport-label": o(E)("common.notifications.viewport_label"),
				"announce-label": o(E)("common.notifications.announce_label"),
				"close-label": o(E)("common.actions.close"),
				onDismiss: U
			}, null, 8, [
				"toasts",
				"viewport-label",
				"announce-label",
				"close-label"
			])
		], 14, $));
	}
});
//#endregion
export { te as default };
