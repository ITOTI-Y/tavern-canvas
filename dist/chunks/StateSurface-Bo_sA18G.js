import { I as e, N as t, _ as n, ct as r, ft as i, g as a, h as o, m as s, p as c, pt as l, ut as u, x as d, y as f } from "./vue-i18n-DUz2Gjn8.js";
import { n as p, t as m } from "./AppIcon-Cnhzrx9o.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/loader-circle.js
var h = p("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), g = {
	iconButton: "_iconButton_1r8sc_32",
	iconButtonSm: "_iconButtonSm_1r8sc_42",
	iconButtonMd: "_iconButtonMd_1r8sc_47",
	iconButtonLg: "_iconButtonLg_1r8sc_52",
	iconButtonDestructive: "_iconButtonDestructive_1r8sc_65",
	iconButtonPressed: "_iconButtonPressed_1r8sc_74",
	appButton: "_appButton_1r8sc_84",
	appButtonContent: "_appButtonContent_1r8sc_100",
	appButtonContentPending: "_appButtonContentPending_1r8sc_107",
	appButtonLabel: "_appButtonLabel_1r8sc_111",
	appButtonSpinner: "_appButtonSpinner_1r8sc_118",
	"tc-icon-rotate": "_tc-icon-rotate_1r8sc_1",
	appButtonPrimary: "_appButtonPrimary_1r8sc_136",
	appButtonSecondary: "_appButtonSecondary_1r8sc_147",
	appButtonDestructive: "_appButtonDestructive_1r8sc_156",
	segmentedControl: "_segmentedControl_1r8sc_169",
	segmentedControlItem: "_segmentedControlItem_1r8sc_178",
	segmentedControlItemLabel: "_segmentedControlItemLabel_1r8sc_199",
	switchRow: "_switchRow_1r8sc_210",
	switchLabelGroup: "_switchLabelGroup_1r8sc_222",
	switchLabel: "_switchLabel_1r8sc_222",
	switchDescription: "_switchDescription_1r8sc_234",
	switchRoot: "_switchRoot_1r8sc_247",
	switchThumb: "_switchThumb_1r8sc_266",
	checkboxRow: "_checkboxRow_1r8sc_293",
	checkboxBox: "_checkboxBox_1r8sc_311",
	checkboxIndicator: "_checkboxIndicator_1r8sc_335",
	checkboxLabel: "_checkboxLabel_1r8sc_341",
	numberStepper: "_numberStepper_1r8sc_355",
	numberStepperButton: "_numberStepperButton_1r8sc_365",
	numberStepperInput: "_numberStepperInput_1r8sc_383",
	selectTrigger: "_selectTrigger_1r8sc_402",
	selectValue: "_selectValue_1r8sc_424",
	selectContent: "_selectContent_1r8sc_433",
	selectViewport: "_selectViewport_1r8sc_444",
	selectItem: "_selectItem_1r8sc_448",
	selectItemText: "_selectItemText_1r8sc_461",
	selectItemIndicator: "_selectItemIndicator_1r8sc_483",
	fieldGroup: "_fieldGroup_1r8sc_493",
	fieldGroupLabel: "_fieldGroupLabel_1r8sc_499",
	fieldGroupRequired: "_fieldGroupRequired_1r8sc_505",
	fieldGroupHint: "_fieldGroupHint_1r8sc_509",
	fieldGroupError: "_fieldGroupError_1r8sc_516",
	dialogOverlay: "_dialogOverlay_1r8sc_527",
	dialogContent: "_dialogContent_1r8sc_534",
	confirmDialogContent: "_confirmDialogContent_1r8sc_552",
	dialogHeader: "_dialogHeader_1r8sc_556",
	dialogTitle: "_dialogTitle_1r8sc_563",
	dialogClose: "_dialogClose_1r8sc_570",
	dialogDescription: "_dialogDescription_1r8sc_583",
	dialogBody: "_dialogBody_1r8sc_589",
	confirmDialogActions: "_confirmDialogActions_1r8sc_595",
	tooltipContent: "_tooltipContent_1r8sc_605",
	tooltipArrow: "_tooltipArrow_1r8sc_616",
	stateSurface: "_stateSurface_1r8sc_624",
	stateSurfaceSkeleton: "_stateSurfaceSkeleton_1r8sc_630",
	skeletonBlock: "_skeletonBlock_1r8sc_637",
	stateSurfaceMessage: "_stateSurfaceMessage_1r8sc_643",
	stateSurfaceMessageGroup: "_stateSurfaceMessageGroup_1r8sc_656",
	stateSurfaceMessageTitle: "_stateSurfaceMessageTitle_1r8sc_662",
	stateSurfaceMessageText: "_stateSurfaceMessageText_1r8sc_670",
	stateSurfaceErrorText: "_stateSurfaceErrorText_1r8sc_677",
	stateSurfaceAction: "_stateSurfaceAction_1r8sc_681",
	toastViewport: "_toastViewport_1r8sc_689",
	toastRoot: "_toastRoot_1r8sc_703",
	toastTitle: "_toastTitle_1r8sc_714",
	toastDescription: "_toastDescription_1r8sc_721",
	toastClose: "_toastClose_1r8sc_727",
	toastSuccess: "_toastSuccess_1r8sc_742",
	toastError: "_toastError_1r8sc_750",
	virtualList: "_virtualList_1r8sc_762",
	virtualListSizer: "_virtualListSizer_1r8sc_767",
	virtualListItem: "_virtualListItem_1r8sc_772"
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
	setup(e, { emit: i }) {
		let d = e, p = i, v = {
			primary: g.appButtonPrimary,
			secondary: g.appButtonSecondary,
			destructive: g.appButtonDestructive
		}, y = c(() => v[d.variant]), b = c(() => d.disabled || d.pending);
		function x(e) {
			b.value || p("click", e);
		}
		return (i, c) => (t(), n("button", {
			type: e.type,
			class: u(["tc-interactive", [r(g).appButton, y.value]]),
			disabled: b.value,
			"aria-busy": e.pending,
			"aria-label": e.label,
			onClick: x
		}, [s("span", {
			class: u([r(g).appButtonContent, e.pending && r(g).appButtonContentPending]),
			"aria-hidden": "true"
		}, [e.icon ? (t(), o(m, {
			key: 0,
			icon: e.icon,
			size: 16
		}, null, 8, ["icon"])) : a("", !0), s("span", { class: u(r(g).appButtonLabel) }, l(e.label), 3)], 2), e.pending ? (t(), n("span", {
			key: 0,
			class: u(r(g).appButtonSpinner),
			"aria-hidden": "true"
		}, [f(m, {
			icon: r(h),
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
		return (c, d) => (t(), n("div", {
			class: u(r(g).stateSurface),
			style: i({ minHeight: o.minHeight })
		}, [o.status === "loading" ? (t(), n("div", {
			key: 0,
			class: u(r(g).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [e(c.$slots, "skeleton", {}, () => [
			s("div", {
				class: u(r(g).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			s("div", {
				class: u(r(g).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			s("div", {
				class: u(r(g).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : o.status === "empty" ? (t(), n("div", {
			key: 1,
			class: u(r(g).stateSurfaceMessage)
		}, [s("div", { class: u(r(g).stateSurfaceMessageGroup) }, [o.emptyTitle ? (t(), n("p", {
			key: 0,
			class: u(r(g).stateSurfaceMessageTitle)
		}, l(o.emptyTitle), 3)) : a("", !0), o.emptyMessage ? (t(), n("p", {
			key: 1,
			class: u(r(g).stateSurfaceMessageText)
		}, l(o.emptyMessage), 3)) : a("", !0)], 2), c.$slots.action ? (t(), n("div", {
			key: 0,
			class: u(r(g).stateSurfaceAction)
		}, [e(c.$slots, "action")], 2)) : a("", !0)], 2)) : o.status === "error" ? (t(), n("div", {
			key: 2,
			class: u(r(g).stateSurfaceMessage),
			role: "alert"
		}, [s("p", { class: u([r(g).stateSurfaceMessageText, r(g).stateSurfaceErrorText]) }, l(o.errorMessage), 3), c.$slots.action ? (t(), n("div", {
			key: 0,
			class: u(r(g).stateSurfaceAction)
		}, [e(c.$slots, "action")], 2)) : a("", !0)], 2)) : e(c.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
export { h as i, v as n, g as r, y as t };
