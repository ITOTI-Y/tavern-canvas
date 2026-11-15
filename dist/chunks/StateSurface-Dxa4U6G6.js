import { I as e, S as t, _ as n, _t as r, b as i, ft as a, g as o, gt as s, h as c, m as l, mt as u, v as d, z as f } from "./vue-i18n-BQWz_HuU.js";
import { n as p, t as m } from "./AppIcon-B1iv8vRB.js";
import { n as h, t as g } from "./components_styles-Cab5IILs.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/check.js
var _ = p("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), v = [
	"type",
	"disabled",
	"aria-busy",
	"aria-label"
], y = /* @__PURE__ */ t({
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
		let f = t, p = s, _ = {
			primary: g.appButtonPrimary,
			secondary: g.appButtonSecondary,
			ghost: g.appButtonGhost,
			destructive: g.appButtonDestructive
		}, y = l(() => _[f.variant]), b = l(() => f.disabled || f.pending);
		function x(e) {
			b.value || p("click", e);
		}
		return (s, l) => (e(), d("button", {
			type: t.type,
			class: u(["tc-interactive", [a(g).appButton, y.value]]),
			disabled: b.value,
			"aria-busy": t.pending,
			"aria-label": t.label,
			onClick: x
		}, [c("span", {
			class: u([a(g).appButtonContent, t.pending && a(g).appButtonContentPending]),
			"aria-hidden": "true"
		}, [t.icon ? (e(), o(m, {
			key: 0,
			icon: t.icon,
			size: 16
		}, null, 8, ["icon"])) : n("", !0), c("span", { class: u(a(g).appButtonLabel) }, r(t.label), 3)], 2), t.pending ? (e(), d("span", {
			key: 0,
			class: u(a(g).appButtonSpinner),
			"aria-hidden": "true"
		}, [i(m, {
			icon: a(h),
			size: 16
		}, null, 8, ["icon"])], 2)) : n("", !0)], 10, v));
	}
}), b = /* @__PURE__ */ t({
	__name: "StateSurface",
	props: {
		status: {},
		minHeight: { default: "160px" },
		emptyTitle: { default: "" },
		emptyMessage: { default: "" },
		errorMessage: { default: "" }
	},
	setup(t) {
		return (i, o) => (e(), d("div", {
			class: u(a(g).stateSurface),
			style: s({ minHeight: t.minHeight })
		}, [t.status === "loading" ? (e(), d("div", {
			key: 0,
			class: u(a(g).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [f(i.$slots, "skeleton", {}, () => [
			c("div", {
				class: u(a(g).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			c("div", {
				class: u(a(g).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			c("div", {
				class: u(a(g).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : t.status === "empty" ? (e(), d("div", {
			key: 1,
			class: u(a(g).stateSurfaceMessage)
		}, [c("div", { class: u(a(g).stateSurfaceMessageGroup) }, [t.emptyTitle ? (e(), d("p", {
			key: 0,
			class: u(a(g).stateSurfaceMessageTitle)
		}, r(t.emptyTitle), 3)) : n("", !0), t.emptyMessage ? (e(), d("p", {
			key: 1,
			class: u(a(g).stateSurfaceMessageText)
		}, r(t.emptyMessage), 3)) : n("", !0)], 2), i.$slots.action ? (e(), d("div", {
			key: 0,
			class: u(a(g).stateSurfaceAction)
		}, [f(i.$slots, "action")], 2)) : n("", !0)], 2)) : t.status === "error" ? (e(), d("div", {
			key: 2,
			class: u(a(g).stateSurfaceMessage),
			role: "alert"
		}, [c("p", { class: u([a(g).stateSurfaceMessageText, a(g).stateSurfaceErrorText]) }, r(t.errorMessage), 3), i.$slots.action ? (e(), d("div", {
			key: 0,
			class: u(a(g).stateSurfaceAction)
		}, [f(i.$slots, "action")], 2)) : n("", !0)], 2)) : f(i.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
export { y as n, _ as r, b as t };
