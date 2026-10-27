import { I as e, N as t, _ as n, ct as r, ft as i, g as a, h as o, m as s, p as c, pt as l, ut as u, x as d, y as f } from "./vue-i18n-DUz2Gjn8.js";
import { n as p, t as m } from "./AppIcon-Cnhzrx9o.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/loader-circle.js
var h = p("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), g = {
	iconButton: "_iconButton_4cnmf_32",
	iconButtonSm: "_iconButtonSm_4cnmf_42",
	iconButtonMd: "_iconButtonMd_4cnmf_47",
	iconButtonLg: "_iconButtonLg_4cnmf_52",
	iconButtonDestructive: "_iconButtonDestructive_4cnmf_65",
	iconButtonPressed: "_iconButtonPressed_4cnmf_74",
	appButton: "_appButton_4cnmf_84",
	appButtonContent: "_appButtonContent_4cnmf_100",
	appButtonContentPending: "_appButtonContentPending_4cnmf_107",
	appButtonLabel: "_appButtonLabel_4cnmf_111",
	appButtonSpinner: "_appButtonSpinner_4cnmf_118",
	"tc-icon-rotate": "_tc-icon-rotate_4cnmf_1",
	appButtonPrimary: "_appButtonPrimary_4cnmf_136",
	appButtonSecondary: "_appButtonSecondary_4cnmf_147",
	appButtonDestructive: "_appButtonDestructive_4cnmf_156",
	segmentedControl: "_segmentedControl_4cnmf_169",
	segmentedControlItem: "_segmentedControlItem_4cnmf_178",
	segmentedControlItemLabel: "_segmentedControlItemLabel_4cnmf_199",
	switchRow: "_switchRow_4cnmf_210",
	switchLabelGroup: "_switchLabelGroup_4cnmf_222",
	switchLabel: "_switchLabel_4cnmf_222",
	switchDescription: "_switchDescription_4cnmf_234",
	switchRoot: "_switchRoot_4cnmf_247",
	switchThumb: "_switchThumb_4cnmf_266",
	checkboxRow: "_checkboxRow_4cnmf_293",
	checkboxBox: "_checkboxBox_4cnmf_311",
	checkboxIndicator: "_checkboxIndicator_4cnmf_335",
	checkboxLabel: "_checkboxLabel_4cnmf_341",
	numberStepper: "_numberStepper_4cnmf_355",
	numberStepperButton: "_numberStepperButton_4cnmf_365",
	numberStepperInput: "_numberStepperInput_4cnmf_383",
	selectTrigger: "_selectTrigger_4cnmf_402",
	selectValue: "_selectValue_4cnmf_424",
	selectContent: "_selectContent_4cnmf_433",
	selectViewport: "_selectViewport_4cnmf_444",
	selectItem: "_selectItem_4cnmf_448",
	selectItemText: "_selectItemText_4cnmf_461",
	selectItemIndicator: "_selectItemIndicator_4cnmf_483",
	fieldGroup: "_fieldGroup_4cnmf_493",
	fieldGroupLabel: "_fieldGroupLabel_4cnmf_499",
	fieldGroupRequired: "_fieldGroupRequired_4cnmf_505",
	fieldGroupHint: "_fieldGroupHint_4cnmf_509",
	fieldGroupError: "_fieldGroupError_4cnmf_516",
	dialogOverlay: "_dialogOverlay_4cnmf_527",
	dialogContent: "_dialogContent_4cnmf_534",
	confirmDialogContent: "_confirmDialogContent_4cnmf_552",
	dialogHeader: "_dialogHeader_4cnmf_556",
	dialogTitle: "_dialogTitle_4cnmf_563",
	dialogClose: "_dialogClose_4cnmf_570",
	dialogDescription: "_dialogDescription_4cnmf_583",
	dialogBody: "_dialogBody_4cnmf_589",
	confirmDialogActions: "_confirmDialogActions_4cnmf_595",
	tooltipContent: "_tooltipContent_4cnmf_605",
	tooltipArrow: "_tooltipArrow_4cnmf_616",
	stateSurface: "_stateSurface_4cnmf_624",
	stateSurfaceSkeleton: "_stateSurfaceSkeleton_4cnmf_630",
	skeletonBlock: "_skeletonBlock_4cnmf_637",
	stateSurfaceMessage: "_stateSurfaceMessage_4cnmf_643",
	stateSurfaceMessageGroup: "_stateSurfaceMessageGroup_4cnmf_656",
	stateSurfaceMessageTitle: "_stateSurfaceMessageTitle_4cnmf_662",
	stateSurfaceMessageText: "_stateSurfaceMessageText_4cnmf_670",
	stateSurfaceErrorText: "_stateSurfaceErrorText_4cnmf_677",
	stateSurfaceAction: "_stateSurfaceAction_4cnmf_681",
	toastViewport: "_toastViewport_4cnmf_689",
	toastRoot: "_toastRoot_4cnmf_703",
	toastTitle: "_toastTitle_4cnmf_714",
	toastDescription: "_toastDescription_4cnmf_721",
	toastClose: "_toastClose_4cnmf_727",
	toastSuccess: "_toastSuccess_4cnmf_742",
	toastError: "_toastError_4cnmf_750",
	virtualList: "_virtualList_4cnmf_762",
	virtualListSizer: "_virtualListSizer_4cnmf_767",
	virtualListItem: "_virtualListItem_4cnmf_772",
	promptTagChip: "_promptTagChip_4cnmf_783",
	promptTagTrigger: "_promptTagTrigger_4cnmf_798",
	promptTagToggle: "_promptTagToggle_4cnmf_809",
	promptTagContent: "_promptTagContent_4cnmf_823",
	promptTagGroup: "_promptTagGroup_4cnmf_834",
	promptTagGroupTitle: "_promptTagGroupTitle_4cnmf_839",
	promptTagOption: "_promptTagOption_4cnmf_847",
	promptTagOptionLabel: "_promptTagOptionLabel_4cnmf_865",
	promptTagOptionText: "_promptTagOptionText_4cnmf_872",
	promptTagOptionTextClamped: "_promptTagOptionTextClamped_4cnmf_878"
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
