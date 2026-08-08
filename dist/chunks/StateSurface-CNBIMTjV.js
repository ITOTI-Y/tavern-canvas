import { I as e, S as t, _ as n, b as r, ft as i, g as a, ht as o, mt as s, r as c, t as l, ut as u, v as d, w as f, y as p, z as m } from "./AppIcon-BpY-A4VH.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/loader-circle.js
var h = c("loader-circle", [["path", {
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
], v = /* @__PURE__ */ f({
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
	setup(s, { emit: c }) {
		let f = s, m = c, v = {
			primary: g.appButtonPrimary,
			secondary: g.appButtonSecondary,
			destructive: g.appButtonDestructive
		}, y = a(() => v[f.variant]), b = a(() => f.disabled || f.pending);
		function x(e) {
			b.value || m("click", e);
		}
		return (a, c) => (e(), r("button", {
			type: s.type,
			class: i(["tc-interactive", [u(g).appButton, y.value]]),
			disabled: b.value,
			"aria-busy": s.pending,
			"aria-label": s.label,
			onClick: x
		}, [n("span", {
			class: i([u(g).appButtonContent, s.pending && u(g).appButtonContentPending]),
			"aria-hidden": "true"
		}, [s.icon ? (e(), d(l, {
			key: 0,
			icon: s.icon,
			size: 16
		}, null, 8, ["icon"])) : p("", !0), n("span", { class: i(u(g).appButtonLabel) }, o(s.label), 3)], 2), s.pending ? (e(), r("span", {
			key: 0,
			class: i(u(g).appButtonSpinner),
			"aria-hidden": "true"
		}, [t(l, {
			icon: u(h),
			size: 16
		}, null, 8, ["icon"])], 2)) : p("", !0)], 10, _));
	}
}), y = /* @__PURE__ */ f({
	__name: "StateSurface",
	props: {
		status: {},
		minHeight: { default: "160px" },
		emptyMessage: {},
		errorMessage: {}
	},
	setup(t) {
		return (a, c) => (e(), r("div", {
			class: i(u(g).stateSurface),
			style: s({ minHeight: t.minHeight })
		}, [t.status === "loading" ? (e(), r("div", {
			key: 0,
			class: i(u(g).stateSurfaceSkeleton),
			"aria-hidden": "true"
		}, [m(a.$slots, "skeleton", {}, () => [
			n("div", {
				class: i(u(g).skeletonBlock),
				style: { width: "70%" }
			}, null, 2),
			n("div", {
				class: i(u(g).skeletonBlock),
				style: { width: "100%" }
			}, null, 2),
			n("div", {
				class: i(u(g).skeletonBlock),
				style: { width: "85%" }
			}, null, 2)
		])], 2)) : t.status === "empty" ? (e(), r("div", {
			key: 1,
			class: i(u(g).stateSurfaceMessage)
		}, [n("p", { class: i(u(g).stateSurfaceMessageText) }, o(t.emptyMessage), 3), a.$slots.action ? (e(), r("div", {
			key: 0,
			class: i(u(g).stateSurfaceAction)
		}, [m(a.$slots, "action")], 2)) : p("", !0)], 2)) : t.status === "error" ? (e(), r("div", {
			key: 2,
			class: i(u(g).stateSurfaceMessage),
			role: "alert"
		}, [n("p", { class: i([u(g).stateSurfaceMessageText, u(g).stateSurfaceErrorText]) }, o(t.errorMessage), 3), a.$slots.action ? (e(), r("div", {
			key: 0,
			class: i(u(g).stateSurfaceAction)
		}, [m(a.$slots, "action")], 2)) : p("", !0)], 2)) : m(a.$slots, "default", {}, void 0, void 0, 3)], 6));
	}
});
//#endregion
export { h as i, v as n, g as r, y as t };

//# sourceMappingURL=StateSurface-CNBIMTjV.js.map