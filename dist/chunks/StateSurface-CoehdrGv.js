import { I as e, N as t, _ as n, ct as r, ft as i, g as a, h as o, m as s, p as c, pt as l, ut as u, x as d, y as f } from "./vue-i18n-DUz2Gjn8.js";
import { t as p } from "./AppIcon-Cnhzrx9o.js";
import { n as m, t as h } from "./components_styles-AQk4evuq.js";
//#region src/ui/components/AppButton.vue?vue&type=script&setup=true&lang.ts
var g = [
	"type",
	"disabled",
	"aria-busy",
	"aria-label"
], _ = /* @__PURE__ */ d({
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
	setup(e, { emit: i }) {
		let d = e, _ = i, v = {
			primary: h.appButtonPrimary,
			secondary: h.appButtonSecondary,
			ghost: h.appButtonGhost,
			destructive: h.appButtonDestructive
		}, y = c(() => v[d.variant]), b = c(() => d.disabled || d.pending);
		function x(e) {
			b.value || _("click", e);
		}
		return (i, c) => (t(), n("button", {
			type: e.type,
			class: u(["tc-interactive", [r(h).appButton, y.value]]),
			disabled: b.value,
			"aria-busy": e.pending,
			"aria-label": e.label,
			onClick: x
		}, [s("span", {
			class: u([r(h).appButtonContent, e.pending && r(h).appButtonContentPending]),
			"aria-hidden": "true"
		}, [e.icon ? (t(), o(p, {
			key: 0,
			icon: e.icon,
			size: 16
		}, null, 8, ["icon"])) : a("", !0), s("span", { class: u(r(h).appButtonLabel) }, l(e.label), 3)], 2), e.pending ? (t(), n("span", {
			key: 0,
			class: u(r(h).appButtonSpinner),
			"aria-hidden": "true"
		}, [f(p, {
			icon: r(m),
			size: 16
		}, null, 8, ["icon"])], 2)) : a("", !0)], 10, g));
	}
}), v = /* @__PURE__ */ d({
	__name: "StateSurface",
	props: {
		status: {},
		minHeight: { default: "160px" },
		emptyTitle: { default: "" },
		emptyMessage: { default: "" },
		errorMessage: { default: "" }
	},
	setup(o) {
		return (c, d) => (t(), n("div", {
			class: u(r(h).stateSurface),
			style: i({ minHeight: o.minHeight })
		}, [o.status === "loading" ? (t(), n("div", {
			key: 0,
			class: u(r(h).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [e(c.$slots, "skeleton", {}, () => [
			s("div", {
				class: u(r(h).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			s("div", {
				class: u(r(h).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			s("div", {
				class: u(r(h).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : o.status === "empty" ? (t(), n("div", {
			key: 1,
			class: u(r(h).stateSurfaceMessage)
		}, [s("div", { class: u(r(h).stateSurfaceMessageGroup) }, [o.emptyTitle ? (t(), n("p", {
			key: 0,
			class: u(r(h).stateSurfaceMessageTitle)
		}, l(o.emptyTitle), 3)) : a("", !0), o.emptyMessage ? (t(), n("p", {
			key: 1,
			class: u(r(h).stateSurfaceMessageText)
		}, l(o.emptyMessage), 3)) : a("", !0)], 2), c.$slots.action ? (t(), n("div", {
			key: 0,
			class: u(r(h).stateSurfaceAction)
		}, [e(c.$slots, "action")], 2)) : a("", !0)], 2)) : o.status === "error" ? (t(), n("div", {
			key: 2,
			class: u(r(h).stateSurfaceMessage),
			role: "alert"
		}, [s("p", { class: u([r(h).stateSurfaceMessageText, r(h).stateSurfaceErrorText]) }, l(o.errorMessage), 3), c.$slots.action ? (t(), n("div", {
			key: 0,
			class: u(r(h).stateSurfaceAction)
		}, [e(c.$slots, "action")], 2)) : a("", !0)], 2)) : e(c.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
export { _ as n, v as t };
