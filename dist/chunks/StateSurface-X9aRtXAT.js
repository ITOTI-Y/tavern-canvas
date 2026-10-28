import { L as e, P as t, _ as n, dt as r, g as i, h as a, lt as o, m as s, mt as c, p as l, pt as u, x as d, y as f } from "./vue-i18n-L-BrQRnK.js";
import { n as p, t as m } from "./AppIcon-DkyxvN8k.js";
import { n as h, t as g } from "./components_styles-DHX8irr3.js";
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
	setup(e, { emit: u }) {
		let d = e, p = u, _ = {
			primary: g.appButtonPrimary,
			secondary: g.appButtonSecondary,
			ghost: g.appButtonGhost,
			destructive: g.appButtonDestructive
		}, y = l(() => _[d.variant]), b = l(() => d.disabled || d.pending);
		function x(e) {
			b.value || p("click", e);
		}
		return (l, u) => (t(), n("button", {
			type: e.type,
			class: r(["tc-interactive", [o(g).appButton, y.value]]),
			disabled: b.value,
			"aria-busy": e.pending,
			"aria-label": e.label,
			onClick: x
		}, [s("span", {
			class: r([o(g).appButtonContent, e.pending && o(g).appButtonContentPending]),
			"aria-hidden": "true"
		}, [e.icon ? (t(), a(m, {
			key: 0,
			icon: e.icon,
			size: 16
		}, null, 8, ["icon"])) : i("", !0), s("span", { class: r(o(g).appButtonLabel) }, c(e.label), 3)], 2), e.pending ? (t(), n("span", {
			key: 0,
			class: r(o(g).appButtonSpinner),
			"aria-hidden": "true"
		}, [f(m, {
			icon: o(h),
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
	setup(a) {
		return (l, d) => (t(), n("div", {
			class: r(o(g).stateSurface),
			style: u({ minHeight: a.minHeight })
		}, [a.status === "loading" ? (t(), n("div", {
			key: 0,
			class: r(o(g).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [e(l.$slots, "skeleton", {}, () => [
			s("div", {
				class: r(o(g).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			s("div", {
				class: r(o(g).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			s("div", {
				class: r(o(g).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : a.status === "empty" ? (t(), n("div", {
			key: 1,
			class: r(o(g).stateSurfaceMessage)
		}, [s("div", { class: r(o(g).stateSurfaceMessageGroup) }, [a.emptyTitle ? (t(), n("p", {
			key: 0,
			class: r(o(g).stateSurfaceMessageTitle)
		}, c(a.emptyTitle), 3)) : i("", !0), a.emptyMessage ? (t(), n("p", {
			key: 1,
			class: r(o(g).stateSurfaceMessageText)
		}, c(a.emptyMessage), 3)) : i("", !0)], 2), l.$slots.action ? (t(), n("div", {
			key: 0,
			class: r(o(g).stateSurfaceAction)
		}, [e(l.$slots, "action")], 2)) : i("", !0)], 2)) : a.status === "error" ? (t(), n("div", {
			key: 2,
			class: r(o(g).stateSurfaceMessage),
			role: "alert"
		}, [s("p", { class: r([o(g).stateSurfaceMessageText, o(g).stateSurfaceErrorText]) }, c(a.errorMessage), 3), l.$slots.action ? (t(), n("div", {
			key: 0,
			class: r(o(g).stateSurfaceAction)
		}, [e(l.$slots, "action")], 2)) : i("", !0)], 2)) : e(l.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
export { y as n, _ as r, b as t };
