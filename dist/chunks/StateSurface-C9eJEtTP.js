import { F as e, R as t, _ as n, dt as r, g as i, gt as a, h as o, ht as s, m as c, p as l, pt as u, x as d, y as f } from "./vue-i18n-XoxYzLIP.js";
import { n as p, t as m } from "./AppIcon-DD754F_c.js";
import { n as h, t as g } from "./components_styles-BXC5Dc_L.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/check.js
var _ = p("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), v = [
	"type",
	"disabled",
	"aria-busy",
	"aria-label"
], y = /* @__PURE__ */ d({
	__name: "AppButton",
	props: {
		label: {},
		icon: { default: void 0 },
		variant: { default: "secondary" },
		pending: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: { default: "button" }
	},
	emits: ["click"],
	setup(t, { emit: s }) {
		let d = t, p = s, _ = {
			primary: g.appButtonPrimary,
			secondary: g.appButtonSecondary,
			ghost: g.appButtonGhost,
			destructive: g.appButtonDestructive
		}, y = l(() => _[d.variant]), b = l(() => d.disabled || d.pending);
		function x(e) {
			b.value || p("click", e);
		}
		return (s, l) => (e(), n("button", {
			type: t.type,
			class: u(["tc-interactive", [r(g).appButton, y.value]]),
			disabled: b.value,
			"aria-busy": t.pending,
			"aria-label": t.label,
			onClick: x
		}, [c("span", {
			class: u([r(g).appButtonContent, t.pending && r(g).appButtonContentPending]),
			"aria-hidden": "true"
		}, [t.icon ? (e(), o(m, {
			key: 0,
			icon: t.icon,
			size: 16
		}, null, 8, ["icon"])) : i("", !0), c("span", { class: u(r(g).appButtonLabel) }, a(t.label), 3)], 2), t.pending ? (e(), n("span", {
			key: 0,
			class: u(r(g).appButtonSpinner),
			"aria-hidden": "true"
		}, [f(m, {
			icon: r(h),
			size: 16
		}, null, 8, ["icon"])], 2)) : i("", !0)], 10, v));
	}
}), b = /* @__PURE__ */ d({
	__name: "StateSurface",
	props: {
		status: {},
		minHeight: { default: "160px" },
		emptyTitle: { default: "" },
		emptyMessage: { default: "" },
		errorMessage: { default: "" }
	},
	setup(o) {
		return (l, d) => (e(), n("div", {
			class: u(r(g).stateSurface),
			style: s({ minHeight: o.minHeight })
		}, [o.status === "loading" ? (e(), n("div", {
			key: 0,
			class: u(r(g).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [t(l.$slots, "skeleton", {}, () => [
			c("div", {
				class: u(r(g).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			c("div", {
				class: u(r(g).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			c("div", {
				class: u(r(g).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : o.status === "empty" ? (e(), n("div", {
			key: 1,
			class: u(r(g).stateSurfaceMessage)
		}, [c("div", { class: u(r(g).stateSurfaceMessageGroup) }, [o.emptyTitle ? (e(), n("p", {
			key: 0,
			class: u(r(g).stateSurfaceMessageTitle)
		}, a(o.emptyTitle), 3)) : i("", !0), o.emptyMessage ? (e(), n("p", {
			key: 1,
			class: u(r(g).stateSurfaceMessageText)
		}, a(o.emptyMessage), 3)) : i("", !0)], 2), l.$slots.action ? (e(), n("div", {
			key: 0,
			class: u(r(g).stateSurfaceAction)
		}, [t(l.$slots, "action")], 2)) : i("", !0)], 2)) : o.status === "error" ? (e(), n("div", {
			key: 2,
			class: u(r(g).stateSurfaceMessage),
			role: "alert"
		}, [c("p", { class: u([r(g).stateSurfaceMessageText, r(g).stateSurfaceErrorText]) }, a(o.errorMessage), 3), l.$slots.action ? (e(), n("div", {
			key: 0,
			class: u(r(g).stateSurfaceAction)
		}, [t(l.$slots, "action")], 2)) : i("", !0)], 2)) : t(l.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
export { y as n, _ as r, b as t };
