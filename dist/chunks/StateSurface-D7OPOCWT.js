import { F as e, R as t, _ as n, dt as r, g as i, gt as a, h as o, ht as s, m as c, p as l, pt as u, x as d, y as f } from "./vue-i18n-XoxYzLIP.js";
import { t as p } from "./AppIcon-DD754F_c.js";
import { n as m, t as h } from "./components_styles-COPsMRS_.js";
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
	setup(t, { emit: s }) {
		let d = t, _ = s, v = {
			primary: h.appButtonPrimary,
			secondary: h.appButtonSecondary,
			ghost: h.appButtonGhost,
			destructive: h.appButtonDestructive
		}, y = l(() => v[d.variant]), b = l(() => d.disabled || d.pending);
		function x(e) {
			b.value || _("click", e);
		}
		return (s, l) => (e(), n("button", {
			type: t.type,
			class: u(["tc-interactive", [r(h).appButton, y.value]]),
			disabled: b.value,
			"aria-busy": t.pending,
			"aria-label": t.label,
			onClick: x
		}, [c("span", {
			class: u([r(h).appButtonContent, t.pending && r(h).appButtonContentPending]),
			"aria-hidden": "true"
		}, [t.icon ? (e(), o(p, {
			key: 0,
			icon: t.icon,
			size: 16
		}, null, 8, ["icon"])) : i("", !0), c("span", { class: u(r(h).appButtonLabel) }, a(t.label), 3)], 2), t.pending ? (e(), n("span", {
			key: 0,
			class: u(r(h).appButtonSpinner),
			"aria-hidden": "true"
		}, [f(p, {
			icon: r(m),
			size: 16
		}, null, 8, ["icon"])], 2)) : i("", !0)], 10, g));
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
		return (l, d) => (e(), n("div", {
			class: u(r(h).stateSurface),
			style: s({ minHeight: o.minHeight })
		}, [o.status === "loading" ? (e(), n("div", {
			key: 0,
			class: u(r(h).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [t(l.$slots, "skeleton", {}, () => [
			c("div", {
				class: u(r(h).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			c("div", {
				class: u(r(h).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			c("div", {
				class: u(r(h).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : o.status === "empty" ? (e(), n("div", {
			key: 1,
			class: u(r(h).stateSurfaceMessage)
		}, [c("div", { class: u(r(h).stateSurfaceMessageGroup) }, [o.emptyTitle ? (e(), n("p", {
			key: 0,
			class: u(r(h).stateSurfaceMessageTitle)
		}, a(o.emptyTitle), 3)) : i("", !0), o.emptyMessage ? (e(), n("p", {
			key: 1,
			class: u(r(h).stateSurfaceMessageText)
		}, a(o.emptyMessage), 3)) : i("", !0)], 2), l.$slots.action ? (e(), n("div", {
			key: 0,
			class: u(r(h).stateSurfaceAction)
		}, [t(l.$slots, "action")], 2)) : i("", !0)], 2)) : o.status === "error" ? (e(), n("div", {
			key: 2,
			class: u(r(h).stateSurfaceMessage),
			role: "alert"
		}, [c("p", { class: u([r(h).stateSurfaceMessageText, r(h).stateSurfaceErrorText]) }, a(o.errorMessage), 3), l.$slots.action ? (e(), n("div", {
			key: 0,
			class: u(r(h).stateSurfaceAction)
		}, [t(l.$slots, "action")], 2)) : i("", !0)], 2)) : t(l.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
export { _ as n, v as t };
