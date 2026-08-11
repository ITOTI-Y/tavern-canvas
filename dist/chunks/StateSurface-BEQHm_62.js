import { I as e, N as t, _ as n, dt as r, ft as i, g as a, h as o, lt as s, m as c, p as l, st as u, x as d, y as f } from "./vue-i18n-D0uIxSJk.js";
import { n as p, t as m } from "./AppIcon-C3iVkJ88.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/loader-circle.js
var h = p("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), g = {
	iconButton: "_iconButton_1jsrv_32",
	iconButtonSm: "_iconButtonSm_1jsrv_42",
	iconButtonMd: "_iconButtonMd_1jsrv_47",
	iconButtonLg: "_iconButtonLg_1jsrv_52",
	iconButtonDestructive: "_iconButtonDestructive_1jsrv_65",
	iconButtonPressed: "_iconButtonPressed_1jsrv_74",
	appButton: "_appButton_1jsrv_84",
	appButtonContent: "_appButtonContent_1jsrv_100",
	appButtonContentPending: "_appButtonContentPending_1jsrv_107",
	appButtonLabel: "_appButtonLabel_1jsrv_111",
	appButtonSpinner: "_appButtonSpinner_1jsrv_118",
	"tc-icon-rotate": "_tc-icon-rotate_1jsrv_1",
	appButtonPrimary: "_appButtonPrimary_1jsrv_136",
	appButtonSecondary: "_appButtonSecondary_1jsrv_147",
	appButtonDestructive: "_appButtonDestructive_1jsrv_156",
	segmentedControl: "_segmentedControl_1jsrv_169",
	segmentedControlItem: "_segmentedControlItem_1jsrv_178",
	segmentedControlItemLabel: "_segmentedControlItemLabel_1jsrv_199",
	switchRow: "_switchRow_1jsrv_210",
	switchLabelGroup: "_switchLabelGroup_1jsrv_222",
	switchLabel: "_switchLabel_1jsrv_222",
	switchDescription: "_switchDescription_1jsrv_234",
	switchRoot: "_switchRoot_1jsrv_247",
	switchThumb: "_switchThumb_1jsrv_266",
	numberStepper: "_numberStepper_1jsrv_298",
	numberStepperButton: "_numberStepperButton_1jsrv_308",
	numberStepperInput: "_numberStepperInput_1jsrv_326",
	selectTrigger: "_selectTrigger_1jsrv_345",
	selectValue: "_selectValue_1jsrv_367",
	selectContent: "_selectContent_1jsrv_376",
	selectViewport: "_selectViewport_1jsrv_385",
	selectItem: "_selectItem_1jsrv_389",
	selectItemIndicator: "_selectItemIndicator_1jsrv_417",
	fieldGroup: "_fieldGroup_1jsrv_426",
	fieldGroupLabel: "_fieldGroupLabel_1jsrv_432",
	fieldGroupRequired: "_fieldGroupRequired_1jsrv_438",
	fieldGroupHint: "_fieldGroupHint_1jsrv_442",
	fieldGroupError: "_fieldGroupError_1jsrv_449",
	dialogOverlay: "_dialogOverlay_1jsrv_460",
	dialogContent: "_dialogContent_1jsrv_467",
	confirmDialogContent: "_confirmDialogContent_1jsrv_485",
	dialogHeader: "_dialogHeader_1jsrv_489",
	dialogTitle: "_dialogTitle_1jsrv_496",
	dialogClose: "_dialogClose_1jsrv_503",
	dialogDescription: "_dialogDescription_1jsrv_516",
	dialogBody: "_dialogBody_1jsrv_522",
	confirmDialogActions: "_confirmDialogActions_1jsrv_528",
	tooltipContent: "_tooltipContent_1jsrv_538",
	tooltipArrow: "_tooltipArrow_1jsrv_549",
	stateSurface: "_stateSurface_1jsrv_557",
	stateSurfaceSkeleton: "_stateSurfaceSkeleton_1jsrv_562",
	skeletonBlock: "_skeletonBlock_1jsrv_569",
	stateSurfaceMessage: "_stateSurfaceMessage_1jsrv_575",
	stateSurfaceMessageGroup: "_stateSurfaceMessageGroup_1jsrv_587",
	stateSurfaceMessageTitle: "_stateSurfaceMessageTitle_1jsrv_593",
	stateSurfaceMessageText: "_stateSurfaceMessageText_1jsrv_601",
	stateSurfaceErrorText: "_stateSurfaceErrorText_1jsrv_608",
	stateSurfaceAction: "_stateSurfaceAction_1jsrv_612",
	toastViewport: "_toastViewport_1jsrv_620",
	toastRoot: "_toastRoot_1jsrv_634",
	toastTitle: "_toastTitle_1jsrv_645",
	toastDescription: "_toastDescription_1jsrv_652",
	toastClose: "_toastClose_1jsrv_658",
	toastSuccess: "_toastSuccess_1jsrv_673",
	toastError: "_toastError_1jsrv_681",
	virtualList: "_virtualList_1jsrv_693",
	virtualListSizer: "_virtualListSizer_1jsrv_698",
	virtualListItem: "_virtualListItem_1jsrv_703"
}, _ = [
	"type",
	"disabled",
	"aria-busy",
	"aria-label"
], v = /* @__PURE__ */ d({
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
	setup(e, { emit: r }) {
		let d = e, p = r, v = {
			primary: g.appButtonPrimary,
			secondary: g.appButtonSecondary,
			destructive: g.appButtonDestructive
		}, y = l(() => v[d.variant]), b = l(() => d.disabled || d.pending);
		function x(e) {
			b.value || p("click", e);
		}
		return (r, l) => (t(), n("button", {
			type: e.type,
			class: s(["tc-interactive", [u(g).appButton, y.value]]),
			disabled: b.value,
			"aria-busy": e.pending,
			"aria-label": e.label,
			onClick: x
		}, [c("span", {
			class: s([u(g).appButtonContent, e.pending && u(g).appButtonContentPending]),
			"aria-hidden": "true"
		}, [e.icon ? (t(), o(m, {
			key: 0,
			icon: e.icon,
			size: 16
		}, null, 8, ["icon"])) : a("", !0), c("span", { class: s(u(g).appButtonLabel) }, i(e.label), 3)], 2), e.pending ? (t(), n("span", {
			key: 0,
			class: s(u(g).appButtonSpinner),
			"aria-hidden": "true"
		}, [f(m, {
			icon: u(h),
			size: 16
		}, null, 8, ["icon"])], 2)) : a("", !0)], 10, _));
	}
}), y = /* @__PURE__ */ d({
	__name: "StateSurface",
	props: {
		status: {},
		minHeight: { default: "160px" },
		emptyTitle: { default: "" },
		emptyMessage: { default: "" },
		errorMessage: { default: "" }
	},
	setup(o) {
		return (l, d) => (t(), n("div", {
			class: s(u(g).stateSurface),
			style: r({ minHeight: o.minHeight })
		}, [o.status === "loading" ? (t(), n("div", {
			key: 0,
			class: s(u(g).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [e(l.$slots, "skeleton", {}, () => [
			c("div", {
				class: s(u(g).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			c("div", {
				class: s(u(g).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			c("div", {
				class: s(u(g).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : o.status === "empty" ? (t(), n("div", {
			key: 1,
			class: s(u(g).stateSurfaceMessage)
		}, [c("div", { class: s(u(g).stateSurfaceMessageGroup) }, [o.emptyTitle ? (t(), n("p", {
			key: 0,
			class: s(u(g).stateSurfaceMessageTitle)
		}, i(o.emptyTitle), 3)) : a("", !0), o.emptyMessage ? (t(), n("p", {
			key: 1,
			class: s(u(g).stateSurfaceMessageText)
		}, i(o.emptyMessage), 3)) : a("", !0)], 2), l.$slots.action ? (t(), n("div", {
			key: 0,
			class: s(u(g).stateSurfaceAction)
		}, [e(l.$slots, "action")], 2)) : a("", !0)], 2)) : o.status === "error" ? (t(), n("div", {
			key: 2,
			class: s(u(g).stateSurfaceMessage),
			role: "alert"
		}, [c("p", { class: s([u(g).stateSurfaceMessageText, u(g).stateSurfaceErrorText]) }, i(o.errorMessage), 3), l.$slots.action ? (t(), n("div", {
			key: 0,
			class: s(u(g).stateSurfaceAction)
		}, [e(l.$slots, "action")], 2)) : a("", !0)], 2)) : e(l.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
export { h as i, v as n, g as r, y as t };
