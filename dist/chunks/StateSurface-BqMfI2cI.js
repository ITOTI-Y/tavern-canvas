import { I as e, N as t, _ as n, dt as r, ft as i, g as a, h as o, lt as s, m as c, p as l, st as u, x as d, y as f } from "./vue-i18n-CmRk7RjK.js";
import { t as p } from "./createLucideIcon-DAbI7E00.js";
import { t as m } from "./AppIcon-B4b88cvE.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/loader-circle.js
var h = p("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), g = {
	iconButton: "_iconButton_k9i16_32",
	iconButtonSm: "_iconButtonSm_k9i16_42",
	iconButtonMd: "_iconButtonMd_k9i16_47",
	iconButtonLg: "_iconButtonLg_k9i16_52",
	iconButtonDestructive: "_iconButtonDestructive_k9i16_65",
	iconButtonPressed: "_iconButtonPressed_k9i16_74",
	appButton: "_appButton_k9i16_84",
	appButtonContent: "_appButtonContent_k9i16_100",
	appButtonContentPending: "_appButtonContentPending_k9i16_107",
	appButtonLabel: "_appButtonLabel_k9i16_111",
	appButtonSpinner: "_appButtonSpinner_k9i16_118",
	"tc-icon-rotate": "_tc-icon-rotate_k9i16_1",
	appButtonPrimary: "_appButtonPrimary_k9i16_130",
	appButtonSecondary: "_appButtonSecondary_k9i16_139",
	appButtonDestructive: "_appButtonDestructive_k9i16_148",
	segmentedControl: "_segmentedControl_k9i16_161",
	segmentedControlItem: "_segmentedControlItem_k9i16_170",
	segmentedControlItemLabel: "_segmentedControlItemLabel_k9i16_191",
	switchRow: "_switchRow_k9i16_202",
	switchLabelGroup: "_switchLabelGroup_k9i16_214",
	switchLabel: "_switchLabel_k9i16_214",
	switchDescription: "_switchDescription_k9i16_226",
	switchRoot: "_switchRoot_k9i16_232",
	switchThumb: "_switchThumb_k9i16_251",
	numberStepper: "_numberStepper_k9i16_274",
	numberStepperButton: "_numberStepperButton_k9i16_283",
	numberStepperInput: "_numberStepperInput_k9i16_301",
	selectTrigger: "_selectTrigger_k9i16_320",
	selectValue: "_selectValue_k9i16_342",
	selectContent: "_selectContent_k9i16_351",
	selectViewport: "_selectViewport_k9i16_360",
	selectItem: "_selectItem_k9i16_364",
	selectItemIndicator: "_selectItemIndicator_k9i16_392",
	fieldGroup: "_fieldGroup_k9i16_401",
	fieldGroupLabel: "_fieldGroupLabel_k9i16_407",
	fieldGroupRequired: "_fieldGroupRequired_k9i16_413",
	fieldGroupHint: "_fieldGroupHint_k9i16_417",
	fieldGroupError: "_fieldGroupError_k9i16_424",
	dialogOverlay: "_dialogOverlay_k9i16_435",
	dialogContent: "_dialogContent_k9i16_442",
	confirmDialogContent: "_confirmDialogContent_k9i16_460",
	dialogHeader: "_dialogHeader_k9i16_464",
	dialogTitle: "_dialogTitle_k9i16_471",
	dialogClose: "_dialogClose_k9i16_478",
	dialogDescription: "_dialogDescription_k9i16_491",
	dialogBody: "_dialogBody_k9i16_497",
	confirmDialogActions: "_confirmDialogActions_k9i16_503",
	tooltipContent: "_tooltipContent_k9i16_513",
	tooltipArrow: "_tooltipArrow_k9i16_524",
	stateSurface: "_stateSurface_k9i16_532",
	stateSurfaceSkeleton: "_stateSurfaceSkeleton_k9i16_537",
	skeletonBlock: "_skeletonBlock_k9i16_544",
	stateSurfaceMessage: "_stateSurfaceMessage_k9i16_550",
	stateSurfaceMessageText: "_stateSurfaceMessageText_k9i16_559",
	stateSurfaceErrorText: "_stateSurfaceErrorText_k9i16_566",
	stateSurfaceAction: "_stateSurfaceAction_k9i16_570",
	toastViewport: "_toastViewport_k9i16_578",
	toastRoot: "_toastRoot_k9i16_592",
	toastTitle: "_toastTitle_k9i16_603",
	toastDescription: "_toastDescription_k9i16_610",
	toastClose: "_toastClose_k9i16_616",
	toastSuccess: "_toastSuccess_k9i16_631",
	toastError: "_toastError_k9i16_639",
	virtualList: "_virtualList_k9i16_651",
	virtualListSizer: "_virtualListSizer_k9i16_656",
	virtualListItem: "_virtualListItem_k9i16_661"
}, _ = [
	"type",
	"disabled",
	"aria-busy",
	"aria-label"
], v = /* @__PURE__ */ d({
	__name: "AppButton",
	props: {
		label: {},
		icon: {},
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
		emptyMessage: {},
		errorMessage: {}
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
		}, [c("p", { class: s(u(g).stateSurfaceMessageText) }, i(o.emptyMessage), 3), l.$slots.action ? (t(), n("div", {
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
