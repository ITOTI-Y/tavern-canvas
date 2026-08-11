import { $ as e, A as t, D as n, F as r, G as i, I as a, L as o, N as s, V as c, W as l, _ as u, a as d, at as f, c as p, ct as m, et as h, ft as g, g as _, h as v, k as y, m as b, n as x, nt as S, p as C, pt as w, s as T, u as E, ut as D, v as O, x as k, y as A, z as j } from "./vue-i18n-DUz2Gjn8.js";
import { n as M, t as N } from "./AppIcon-Cnhzrx9o.js";
import { t as P } from "./check-BhrVRbkS.js";
import { t as ee } from "./chevron-down-Tu_8qTxg.js";
import { t as te } from "./chevron-up-D4TetO-M.js";
import { t as ne } from "./copy-CzjDY47g.js";
import { n as re, t as F } from "./trash-2-BmyBvoOS.js";
import { n as I, r as L, t as R } from "./StateSurface-Bo_sA18G.js";
import { n as z, r as B, t as V } from "./NumberStepper-zIDhvMwB.js";
import { n as H, t as U } from "./FieldGroup-LDtWeac7.js";
import { t as ie } from "./shuffle-BAB9O4dE.js";
import { a as W, t as G } from "./AppSelect-CJ-1Hi5_.js";
import { _ as ae, c as K, i as q, j as oe, k as se, o as ce, s as le } from "./Teleport-C7mDSUEl.js";
import { c as ue } from "./PopperContent-7a56nwZP.js";
import { n as de, r as fe, t as pe, u as me } from "./_prop_utils-DtjJGT5O.js";
import { n as he, t as ge } from "./AppSwitch-w_KIxpNZ.js";
import { t as _e } from "./RovingFocusGroup-CK-2q3kn.js";
import { n as ve, t as ye } from "./IconButton-JYVgios9.js";
import { n as be, t as xe } from "./SegmentedControl-CR6qvbSJ.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/grip-vertical.js
var Se = M("grip-vertical", [
	["circle", {
		cx: "9",
		cy: "12",
		r: "1",
		key: "1vctgf"
	}],
	["circle", {
		cx: "9",
		cy: "5",
		r: "1",
		key: "hp0tcf"
	}],
	["circle", {
		cx: "9",
		cy: "19",
		r: "1",
		key: "fkjjf6"
	}],
	["circle", {
		cx: "15",
		cy: "12",
		r: "1",
		key: "1tmaij"
	}],
	["circle", {
		cx: "15",
		cy: "5",
		r: "1",
		key: "19l28e"
	}],
	["circle", {
		cx: "15",
		cy: "19",
		r: "1",
		key: "f4zoj3"
	}]
]), Ce = M("scan-search", [
	["path", {
		d: "M3 7V5a2 2 0 0 1 2-2h2",
		key: "aa7l1z"
	}],
	["path", {
		d: "M17 3h2a2 2 0 0 1 2 2v2",
		key: "4qcy5o"
	}],
	["path", {
		d: "M21 17v2a2 2 0 0 1-2 2h-2",
		key: "6vwrx8"
	}],
	["path", {
		d: "M7 21H5a2 2 0 0 1-2-2v-2",
		key: "ioqczr"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}],
	["path", {
		d: "m16 16-1.9-1.9",
		key: "1dq9hf"
	}]
]), we = M("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
function Te(e, t) {
	return se(e) ? !1 : Array.isArray(e) ? e.some((e) => W(e, t)) : W(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxGroupRoot.js
var [Ee, De] = /*#__PURE__*/ oe("CheckboxGroupRoot");
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/utils.js
function Oe(e) {
	return e === "indeterminate";
}
function ke(e) {
	return Oe(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
var [Ae, je] = /*#__PURE__*/ oe("CheckboxRoot"), Me = /* @__PURE__ */ k({
	inheritAttrs: !1,
	__name: "CheckboxRoot",
	props: {
		defaultValue: {
			type: null,
			required: !1
		},
		modelValue: {
			type: null,
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		value: {
			type: null,
			required: !1,
			default: "on"
		},
		id: {
			type: String,
			required: !1
		},
		trueValue: {
			type: null,
			required: !1,
			default: () => !0
		},
		falseValue: {
			type: null,
			required: !1,
			default: () => !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = e, i = t, { forwardRef: c, currentElement: d } = K(), f = Ee(null), h = ae(r, "modelValue", i, {
			defaultValue: r.defaultValue ?? r.falseValue,
			passive: r.modelValue === void 0
		}), g = C(() => f?.disabled.value || r.disabled), y = C(() => W(h.value, r.trueValue)), b = C(() => se(f?.modelValue.value) ? h.value === "indeterminate" ? "indeterminate" : y.value : Te(f.modelValue.value, r.value));
		function x() {
			if (se(f?.modelValue.value)) h.value === "indeterminate" ? h.value = r.trueValue : h.value = y.value ? r.falseValue : r.trueValue;
			else {
				let e = [...f.modelValue.value || []];
				if (Te(e, r.value)) {
					let t = e.findIndex((e) => W(e, r.value));
					e.splice(t, 1);
				} else e.push(r.value);
				f.modelValue.value = e;
			}
		}
		let S = me(d), w = he(), D = j(), O = C(() => {
			if (!D["aria-label"]) return r.id && d.value ? document.querySelector(`[for="${r.id}"]`)?.innerText : void 0;
		});
		return je({
			disabled: g,
			state: b
		}), (e, t) => (s(), u(E, null, [(s(), v(o(m(f)?.rovingFocus.value ? m(be) : m(q)), n({
			...e.$attrs,
			...m(w)
		}, {
			id: e.id,
			ref: m(c),
			role: "checkbox",
			"as-child": e.asChild,
			as: e.as,
			type: e.as === "button" ? "button" : void 0,
			"aria-checked": m(Oe)(b.value) ? "mixed" : b.value,
			"aria-required": e.required,
			"aria-label": e.$attrs["aria-label"] || O.value,
			"data-state": m(ke)(b.value),
			"data-disabled": g.value ? "" : void 0,
			disabled: g.value,
			focusable: m(f)?.rovingFocus.value ? !g.value : void 0,
			onKeydown: T(p(() => {}, ["prevent"]), ["enter"]),
			onClick: x
		}), {
			default: l(() => [a(e.$slots, "default", {
				modelValue: m(h),
				state: b.value
			})]),
			_: 3
		}, 16, [
			"id",
			"as-child",
			"as",
			"type",
			"aria-checked",
			"aria-required",
			"aria-label",
			"data-state",
			"data-disabled",
			"disabled",
			"focusable",
			"onKeydown"
		])), m(S) && e.name && !m(f) ? (s(), v(m(fe), n({
			key: 0,
			type: "checkbox",
			checked: !!b.value,
			name: e.name,
			value: e.value,
			disabled: g.value,
			required: e.required
		}, m(w)), null, 16, [
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		])) : _("v-if", !0)], 64));
	}
}), Ne = /* @__PURE__ */ k({
	__name: "CheckboxIndicator",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		let { forwardRef: t } = K(), r = Ae();
		return (e, i) => (s(), v(m(ce), { present: e.forceMount || m(Oe)(m(r).state.value) || m(r).state.value === !0 }, {
			default: l(() => [A(m(q), n({
				ref: m(t),
				"data-state": m(ke)(m(r).state.value),
				"data-disabled": m(r).disabled.value ? "" : void 0,
				style: { pointerEvents: "none" },
				"as-child": e.asChild,
				as: e.as
			}, e.$attrs), {
				default: l(() => [a(e.$slots, "default")]),
				_: 3
			}, 16, [
				"data-state",
				"data-disabled",
				"as-child",
				"as"
			])]),
			_: 3
		}, 8, ["present"]));
	}
}), [Pe, Fe] = /*#__PURE__*/ oe("TabsRoot"), Ie = /* @__PURE__ */ k({
	__name: "TabsRoot",
	props: {
		defaultValue: {
			type: null,
			required: !1
		},
		orientation: {
			type: String,
			required: !1,
			default: "horizontal"
		},
		dir: {
			type: String,
			required: !1
		},
		activationMode: {
			type: String,
			required: !1,
			default: "automatic"
		},
		modelValue: {
			type: null,
			required: !1
		},
		unmountOnHide: {
			type: Boolean,
			required: !1,
			default: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { orientation: i, unmountOnHide: o, dir: c } = f(n), u = ue(c);
		K();
		let d = ae(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), p = h(), g = S(/* @__PURE__ */ new Set());
		return Fe({
			modelValue: d,
			changeModelValue: (e) => {
				d.value = e;
			},
			orientation: i,
			dir: u,
			unmountOnHide: o,
			activationMode: n.activationMode,
			baseId: le(void 0, "reka-tabs"),
			tabsList: p,
			contentIds: g,
			registerContent: (e) => {
				g.value = /* @__PURE__ */ new Set([...g.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(g.value);
				t.delete(e), g.value = t;
			}
		}), (e, t) => (s(), v(m(q), {
			dir: m(u),
			"data-orientation": m(i),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: l(() => [a(e.$slots, "default", { modelValue: m(d) })]),
			_: 3
		}, 8, [
			"dir",
			"data-orientation",
			"as-child",
			"as"
		]));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/utils.js
function Le(e, t) {
	return `${e}-trigger-${t}`;
}
function Re(e, t) {
	return `${e}-content-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var J = /* @__PURE__ */ k({
	__name: "TabsContent",
	props: {
		value: {
			type: [String, Number],
			required: !0
		},
		forceMount: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let n = e, { forwardRef: r } = K(), i = Pe(), o = C(() => Le(i.baseId, n.value)), c = C(() => Re(i.baseId, n.value)), u = C(() => n.value === i.modelValue.value), d = h(u.value);
		return t(() => {
			i.registerContent(n.value), requestAnimationFrame(() => {
				d.value = !1;
			});
		}), y(() => {
			i.unregisterContent(n.value);
		}), (e, t) => (s(), v(m(ce), {
			present: e.forceMount || u.value,
			"force-mount": ""
		}, {
			default: l(({ present: t }) => [A(m(q), {
				id: c.value,
				ref: m(r),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": u.value ? "active" : "inactive",
				"data-orientation": m(i).orientation.value,
				"aria-labelledby": o.value,
				hidden: !t,
				tabindex: "0",
				style: g({ animationDuration: d.value ? "0s" : void 0 })
			}, {
				default: l(() => [!m(i).unmountOnHide.value || t ? a(e.$slots, "default", { key: 0 }) : _("v-if", !0)]),
				_: 2
			}, 1032, [
				"id",
				"as-child",
				"as",
				"data-state",
				"data-orientation",
				"aria-labelledby",
				"hidden",
				"style"
			])]),
			_: 3
		}, 8, ["present"]));
	}
}), ze = /* @__PURE__ */ k({
	__name: "TabsList",
	props: {
		loop: {
			type: Boolean,
			required: !1,
			default: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let { loop: t } = f(e), { forwardRef: n, currentElement: r } = K(), i = Pe();
		return i.tabsList = r, (e, r) => (s(), v(m(_e), {
			"as-child": "",
			orientation: m(i).orientation.value,
			dir: m(i).dir.value,
			loop: m(t)
		}, {
			default: l(() => [A(m(q), {
				ref: m(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": m(i).orientation.value
			}, {
				default: l(() => [a(e.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"aria-orientation"
			])]),
			_: 3
		}, 8, [
			"orientation",
			"dir",
			"loop"
		]));
	}
}), Y = /* @__PURE__ */ k({
	__name: "TabsTrigger",
	props: {
		value: {
			type: [String, Number],
			required: !0
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(e) {
		let t = e, { forwardRef: n } = K(), r = Pe(), i = C(() => Le(r.baseId, t.value)), o = C(() => r.contentIds.value.has(t.value) ? Re(r.baseId, t.value) : void 0), c = C(() => t.value === r.modelValue.value);
		return (e, t) => (s(), v(m(be), {
			"as-child": "",
			focusable: !e.disabled,
			active: c.value
		}, {
			default: l(() => [A(m(q), {
				id: i.value,
				ref: m(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": c.value ? "true" : "false",
				"aria-controls": o.value,
				"data-state": c.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": m(r).orientation.value,
				onMousedown: t[0] ||= p((t) => {
					!e.disabled && t.ctrlKey === !1 ? m(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= T((t) => m(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = m(r).activationMode !== "manual";
					!c.value && !e.disabled && t && m(r).changeModelValue(e.value);
				}
			}, {
				default: l(() => [a(e.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"type",
				"as",
				"as-child",
				"aria-selected",
				"aria-controls",
				"data-state",
				"disabled",
				"data-disabled",
				"data-orientation"
			])]),
			_: 3
		}, 8, ["focusable", "active"]));
	}
}), X = {
	assetsView: "_assetsView_s3c58_10",
	tabsList: "_tabsList_s3c58_23",
	tabsTrigger: "_tabsTrigger_s3c58_31",
	tabsContent: "_tabsContent_s3c58_55",
	categoryList: "_categoryList_s3c58_70",
	categoryToolbar: "_categoryToolbar_s3c58_77",
	searchInput: "_searchInput_s3c58_84",
	reorderHint: "_reorderHint_s3c58_100",
	emptyDescription: "_emptyDescription_s3c58_105",
	cardGrid: "_cardGrid_s3c58_110",
	assetCard: "_assetCard_s3c58_120",
	dragHandle: "_dragHandle_s3c58_135",
	assetCardMain: "_assetCardMain_s3c58_147",
	assetCardName: "_assetCardName_s3c58_165",
	assetCardSummary: "_assetCardSummary_s3c58_175",
	assetCardSummaryPart: "_assetCardSummaryPart_s3c58_183",
	assetCardActions: "_assetCardActions_s3c58_187",
	form: "_form_s3c58_199",
	textInput: "_textInput_s3c58_205",
	textArea: "_textArea_s3c58_206",
	formActions: "_formActions_s3c58_228",
	vocabularyPanel: "_vocabularyPanel_s3c58_238",
	vocabularySearchRow: "_vocabularySearchRow_s3c58_244",
	searchResultsList: "_searchResultsList_s3c58_249",
	searchResultRow: "_searchResultRow_s3c58_255",
	searchResultTag: "_searchResultTag_s3c58_264",
	searchResultTranslation: "_searchResultTranslation_s3c58_269",
	loadMoreRow: "_loadMoreRow_s3c58_274",
	sectionTitle: "_sectionTitle_s3c58_280",
	catalogList: "_catalogList_s3c58_286",
	catalogEntry: "_catalogEntry_s3c58_292",
	catalogEntryInfo: "_catalogEntryInfo_s3c58_301",
	catalogEntryName: "_catalogEntryName_s3c58_308",
	catalogEntryMeta: "_catalogEntryMeta_s3c58_314",
	bundledBadge: "_bundledBadge_s3c58_319",
	nsfwSection: "_nsfwSection_s3c58_329",
	nsfwToggle: "_nsfwToggle_s3c58_335",
	nsfwNotice: "_nsfwNotice_s3c58_345",
	installProgress: "_installProgress_s3c58_351",
	workflowToolbarRow: "_workflowToolbarRow_s3c58_360",
	placeholderList: "_placeholderList_s3c58_366",
	placeholderRow: "_placeholderRow_s3c58_372",
	placeholderKey: "_placeholderKey_s3c58_378",
	hiddenFileInput: "_hiddenFileInput_s3c58_389"
};
//#endregion
//#region src/ui/views/assets/asset_field_schema.ts
function Be(e, t) {
	let n = e[t.key];
	return t.kind === "number" ? typeof n == "number" ? n : 0 : typeof n == "string" ? n : "";
}
function Ve(e, t) {
	let n = {};
	for (let r of e) n[r.key] = t ? Be(t.payload, r) : r.kind === "number" ? 0 : "";
	return n;
}
function He(e) {
	return Ve(e, null);
}
function Ue(e) {
	return typeof e == "string" || typeof e == "number" || typeof e == "boolean" ? String(e) : null;
}
function We(e, t) {
	let n = [];
	for (let r of t) {
		let t = e[r.key];
		if (t == null || t === "") continue;
		let i = Ue(t);
		i !== null && n.push({
			label: r.label,
			value: i,
			numeric: r.numeric ?? !1
		});
	}
	return n;
}
//#endregion
//#region src/ui/views/assets/AssetCategoryList.vue?vue&type=script&setup=true&lang.ts
var Ge = ["for"], Ke = [
	"id",
	"placeholder",
	"aria-label"
], qe = [
	"data-dragging",
	"onDragstart",
	"onDrop"
], Je = ["aria-label"], Ye = ["aria-label", "onClick"], Z = /* @__PURE__ */ k({
	__name: "AssetCategoryList",
	props: {
		records: {},
		summaryFields: {},
		loading: { type: Boolean },
		searchLabel: {},
		searchPlaceholder: {},
		emptyTitle: {},
		emptyDescription: {},
		addLabel: {},
		randomLabel: {},
		reorderHint: {},
		editLabel: {},
		deleteLabel: {},
		deleteConfirmTitle: { type: Function },
		deleteConfirmDescription: {},
		confirmLabel: {},
		cancelLabel: {},
		moveUpLabel: {},
		moveDownLabel: {},
		dragHandleLabel: {}
	},
	emits: [
		"add",
		"edit",
		"delete",
		"reorder",
		"random-select"
	],
	setup(e, { emit: t }) {
		let n = e, a = t, o = h(""), c = h(null), f = h(null), p = C(() => {
			let e = o.value.trim().toLowerCase();
			return e === "" ? n.records : n.records.filter((t) => t.display_name.toLowerCase().includes(e));
		}), g = C(() => n.loading ? "loading" : n.records.length === 0 ? "empty" : "ready");
		function v(e) {
			return We(e.payload, n.summaryFields);
		}
		function y(e) {
			c.value = e;
		}
		function x() {
			c.value && a("delete", c.value.id), c.value = null;
		}
		function S(e, t) {
			let r = n.records.findIndex((t) => t.id === e), i = r + t;
			if (r === -1 || i < 0 || i >= n.records.length) return;
			let o = [...n.records], [s] = o.splice(r, 1);
			s !== void 0 && (o.splice(i, 0, s), a("reorder", o.map((e) => e.id)));
		}
		function T() {
			if (n.records.length === 0) return;
			let e = Math.floor(Math.random() * n.records.length), t = n.records[e];
			t && a("random-select", t);
		}
		function O(e, t) {
			f.value = e, t.dataTransfer?.setData("text/plain", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
		}
		function k(e) {
			e.preventDefault();
		}
		function j(e, t) {
			t.preventDefault();
			let r = f.value;
			if (f.value = null, !r || r === e) return;
			let i = n.records.findIndex((e) => e.id === r), o = n.records.findIndex((t) => t.id === e);
			if (i === -1 || o === -1) return;
			let s = [...n.records], [c] = s.splice(i, 1);
			c !== void 0 && (s.splice(o, 0, c), a("reorder", s.map((e) => e.id)));
		}
		return (t, n) => (s(), u("div", { class: D(m(X).categoryList) }, [
			b("div", { class: D(m(X).categoryToolbar) }, [
				b("label", {
					class: "tc-visually-hidden",
					for: `${e.searchLabel}-search`
				}, w(e.searchLabel), 9, Ge),
				i(b("input", {
					id: `${e.searchLabel}-search`,
					"onUpdate:modelValue": n[0] ||= (e) => o.value = e,
					type: "text",
					class: D(m(X).searchInput),
					placeholder: e.searchPlaceholder,
					"aria-label": e.searchLabel
				}, null, 10, Ke), [[d, o.value]]),
				A(I, {
					label: e.randomLabel,
					icon: m(ie),
					variant: "secondary",
					onClick: T
				}, null, 8, ["label", "icon"]),
				A(I, {
					label: e.addLabel,
					icon: m(H),
					variant: "primary",
					onClick: n[1] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])
			], 2),
			e.records.length > 1 ? (s(), u("p", {
				key: 0,
				class: D(m(X).reorderHint)
			}, w(e.reorderHint), 3)) : _("", !0),
			A(R, {
				status: g.value,
				"empty-title": e.emptyTitle,
				"min-height": "120px"
			}, {
				action: l(() => [b("p", { class: D(m(X).emptyDescription) }, w(e.emptyDescription), 3), A(I, {
					label: e.addLabel,
					icon: m(H),
					variant: "primary",
					onClick: n[2] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])]),
				default: l(() => [b("ul", { class: D(m(X).cardGrid) }, [(s(!0), u(E, null, r(p.value, (t) => (s(), u("li", {
					key: t.id,
					class: D(m(X).assetCard),
					draggable: "true",
					"data-dragging": f.value === t.id ? "" : null,
					onDragstart: (e) => O(t.id, e),
					onDragover: k,
					onDrop: (e) => j(t.id, e)
				}, [
					b("span", {
						class: D(m(X).dragHandle),
						"aria-label": e.dragHandleLabel,
						"aria-hidden": "true"
					}, [A(N, {
						icon: m(Se),
						size: 16
					}, null, 8, ["icon"])], 10, Je),
					b("button", {
						type: "button",
						class: D(m(X).assetCardMain),
						"aria-label": `${e.editLabel}: ${t.display_name}`,
						onClick: (e) => a("edit", t)
					}, [b("span", { class: D(m(X).assetCardName) }, w(t.display_name), 3), v(t).length > 0 ? (s(), u("span", {
						key: 0,
						class: D(m(X).assetCardSummary)
					}, [(s(!0), u(E, null, r(v(t), (e) => (s(), u("span", {
						key: e.label,
						class: D([m(X).assetCardSummaryPart, e.numeric && "tc-tabular-nums"])
					}, w(e.label) + ": " + w(e.value), 3))), 128))], 2)) : _("", !0)], 10, Ye),
					b("div", { class: D(m(X).assetCardActions) }, [
						A(ye, {
							icon: m(te),
							size: "sm",
							label: e.moveUpLabel,
							onClick: (e) => S(t.id, -1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						A(ye, {
							icon: m(ee),
							size: "sm",
							label: e.moveDownLabel,
							onClick: (e) => S(t.id, 1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						A(ye, {
							icon: m(F),
							size: "sm",
							destructive: "",
							label: e.deleteLabel,
							onClick: (e) => y(t)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						])
					], 2)
				], 42, qe))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-title"]),
			A(de, {
				open: c.value !== null,
				title: c.value ? e.deleteConfirmTitle(c.value.display_name) : "",
				description: e.deleteConfirmDescription,
				"confirm-label": e.confirmLabel,
				"cancel-label": e.cancelLabel,
				"onUpdate:open": n[3] ||= (e) => {
					e || (c.value = null);
				},
				onConfirm: x
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			])
		], 2));
	}
}), Xe = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], Ze = [
	"id",
	"value",
	"aria-describedby",
	"onInput"
], Qe = [
	"id",
	"value",
	"aria-describedby",
	"onInput"
], $e = /* @__PURE__ */ k({
	__name: "AssetRecordForm",
	props: {
		nameLabel: {},
		namePlaceholder: {},
		name: {},
		nameError: {},
		fields: {},
		values: {},
		saveLabel: {},
		cancelLabel: {},
		decrementLabel: {},
		incrementLabel: {},
		pending: { type: Boolean }
	},
	emits: [
		"update:name",
		"update:values",
		"save",
		"cancel"
	],
	setup(e, { emit: t }) {
		let i = e, o = t;
		function c(e, t) {
			o("update:values", {
				...i.values,
				[e]: t
			});
		}
		function d(e, t) {
			o("update:values", {
				...i.values,
				[e]: t
			});
		}
		function f(e) {
			e.preventDefault(), o("save");
		}
		let p = C(() => i.pending);
		return (t, i) => (s(), u("form", {
			class: D(m(X).form),
			onSubmit: f
		}, [
			A(U, {
				label: e.nameLabel,
				error: e.nameError,
				required: ""
			}, {
				default: l(({ fieldId: t, describedBy: n, invalid: r }) => [b("input", {
					id: t,
					class: D(m(X).textInput),
					type: "text",
					placeholder: e.namePlaceholder,
					value: e.name,
					"aria-describedby": n,
					"aria-invalid": r,
					onInput: i[0] ||= (e) => o("update:name", e.target.value)
				}, null, 42, Xe)]),
				_: 1
			}, 8, ["label", "error"]),
			(s(!0), u(E, null, r(e.fields, (t) => (s(), v(U, n({
				key: t.key,
				label: t.label
			}, { ref_for: !0 }, m(pe)({ hint: t.hint })), {
				default: l(({ fieldId: r, describedBy: i }) => [t.kind === "text" ? (s(), u("input", {
					key: 0,
					id: r,
					class: D(m(X).textInput),
					type: "text",
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => c(t.key, e.target.value)
				}, null, 42, Ze)) : t.kind === "textarea" ? (s(), u("textarea", {
					key: 1,
					id: r,
					class: D(m(X).textArea),
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => c(t.key, e.target.value)
				}, null, 42, Qe)) : (s(), v(V, n({
					key: 2,
					id: r,
					"model-value": typeof e.values[t.key] == "number" ? e.values[t.key] : 0,
					label: t.label,
					step: t.step ?? 1,
					"decrement-label": e.decrementLabel,
					"increment-label": e.incrementLabel
				}, { ref_for: !0 }, m(pe)({
					min: t.min,
					max: t.max,
					describedBy: i
				}), { "onUpdate:modelValue": (e) => d(t.key, e) }), null, 16, [
					"id",
					"model-value",
					"label",
					"step",
					"decrement-label",
					"increment-label",
					"onUpdate:modelValue"
				]))]),
				_: 2
			}, 1040, ["label"]))), 128)),
			a(t.$slots, "extra-fields"),
			b("div", { class: D(m(X).formActions) }, [A(I, {
				label: e.cancelLabel,
				variant: "secondary",
				type: "button",
				onClick: i[1] ||= (e) => o("cancel")
			}, null, 8, ["label"]), A(I, {
				label: e.saveLabel,
				variant: "primary",
				type: "submit",
				pending: p.value
			}, null, 8, ["label", "pending"])], 2)
		], 34));
	}
});
//#endregion
//#region src/ui/views/assets/use_asset_category_panel.ts
function Q(t, n, r, i) {
	let a = h(!1), o = h(null), s = h(""), c = h(null), l = e({}), u = h(!1);
	function d() {
		o.value = null, s.value = "", c.value = null, $(l, He(r())), a.value = !0;
	}
	function f(e) {
		o.value = e, s.value = e.display_name, c.value = null, $(l, Ve(r(), e)), a.value = !0;
	}
	function p() {
		a.value = !1;
	}
	async function m() {
		let e = s.value.trim();
		if (e === "") {
			c.value = i();
			return;
		}
		u.value = !0;
		try {
			let r = o.value?.id ?? crypto.randomUUID();
			await n.save_asset(t, {
				id: r,
				category: t,
				record_key: r,
				display_name: e,
				payload: { ...l }
			}), a.value = !1;
		} finally {
			u.value = !1;
		}
	}
	function g(e) {
		n.remove_asset(t, e);
	}
	function _(e) {
		n.reorder_assets(t, e);
	}
	function v(e) {
		f(e);
	}
	return {
		dialog_open: a,
		editing_record: o,
		name: s,
		name_error: c,
		values: l,
		saving: u,
		open_create: d,
		open_edit: f,
		close_dialog: p,
		save: m,
		remove: g,
		reorder: _,
		random_select: v
	};
}
function $(e, t) {
	for (let t of Object.keys(e)) Reflect.deleteProperty(e, t);
	Object.assign(e, t);
}
//#endregion
//#region src/ui/views/assets/CharacterPanel.vue
var et = /* @__PURE__ */ k({
	__name: "CharacterPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), r = C(() => [
			{
				key: "role_label",
				label: n("assets.characters.role_label"),
				kind: "text"
			},
			{
				key: "appearance",
				label: n("assets.characters.appearance_label"),
				kind: "textarea"
			},
			{
				key: "context_notes",
				label: n("assets.characters.context_notes_label"),
				kind: "textarea"
			},
			{
				key: "world_info_reference",
				label: n("assets.characters.world_info_reference_label"),
				kind: "text",
				hint: n("assets.characters.world_info_reference_hint")
			}
		]), i = Q("character", t.controller, () => r.value, () => n("errors.validation_required")), a = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, o) => (s(), u("div", null, [A(Z, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": m(n)("common.actions.search"),
			"search-placeholder": m(n)("common.actions.search"),
			"empty-title": m(n)("assets.characters.empty_title"),
			"empty-description": m(n)("assets.characters.empty_description"),
			"add-label": m(n)("assets.characters.add_action"),
			"random-label": m(n)("assets.random_selection_action"),
			"reorder-hint": m(n)("assets.reorder_hint"),
			"edit-label": m(n)("common.actions.edit"),
			"delete-label": m(n)("common.actions.delete"),
			"delete-confirm-title": a,
			"delete-confirm-description": m(n)("assets.delete_confirm_description"),
			"confirm-label": m(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": m(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": m(n)("assets.move_up_action"),
			"move-down-label": m(n)("assets.move_down_action"),
			"drag-handle-label": m(n)("assets.drag_handle_label"),
			onAdd: m(i).open_create,
			onEdit: m(i).open_edit,
			onDelete: m(i).remove,
			onReorder: m(i).reorder,
			onRandomSelect: m(i).random_select
		}, null, 8, [
			"records",
			"loading",
			"search-label",
			"search-placeholder",
			"empty-title",
			"empty-description",
			"add-label",
			"random-label",
			"reorder-hint",
			"edit-label",
			"delete-label",
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"move-up-label",
			"move-down-label",
			"drag-handle-label",
			"onAdd",
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), A(z, {
			open: m(i).dialog_open.value,
			title: m(i).editing_record.value ? m(n)("common.actions.edit") : m(n)("assets.characters.add_action"),
			description: m(n)("assets.form_dialog_description"),
			"close-label": m(n)("common.actions.close"),
			"onUpdate:open": o[2] ||= (e) => {
				e || m(i).close_dialog();
			}
		}, {
			default: l(() => [A($e, {
				"name-label": m(n)("common.labels.name"),
				"name-placeholder": m(n)("common.labels.name"),
				name: m(i).name.value,
				"name-error": m(i).name_error.value,
				fields: r.value,
				values: m(i).values,
				"save-label": m(n)("common.actions.save"),
				"cancel-label": m(n)("common.actions.cancel"),
				"decrement-label": m(n)("common.actions.decrease"),
				"increment-label": m(n)("common.actions.increase"),
				pending: m(i).saving.value,
				"onUpdate:name": o[0] ||= (e) => {
					m(i).name.value = e;
				},
				"onUpdate:values": o[1] ||= (e) => m($)(m(i).values, e),
				onSave: m(i).save,
				onCancel: m(i).close_dialog
			}, null, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"fields",
				"values",
				"save-label",
				"cancel-label",
				"decrement-label",
				"increment-label",
				"pending",
				"onSave",
				"onCancel"
			])]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])]));
	}
}), tt = ["data-disabled"], nt = /* @__PURE__ */ k({
	__name: "AppCheckbox",
	props: {
		modelValue: { type: [Boolean, String] },
		label: {},
		labelHidden: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			n("update:modelValue", e === !0);
		}
		return (t, n) => (s(), u("label", {
			class: D(m(L).checkboxRow),
			"data-disabled": e.disabled ? "" : void 0
		}, [A(m(Me), {
			class: D(["tc-interactive", m(L).checkboxBox]),
			"model-value": e.modelValue,
			disabled: e.disabled,
			"aria-label": e.labelHidden ? e.label : void 0,
			"onUpdate:modelValue": r
		}, {
			default: l(() => [A(m(Ne), { class: D(m(L).checkboxIndicator) }, {
				default: l(() => [A(N, {
					icon: e.modelValue === "indeterminate" ? m(B) : m(P),
					size: 14
				}, null, 8, ["icon"])]),
				_: 1
			}, 8, ["class"])]),
			_: 1
		}, 8, [
			"class",
			"model-value",
			"disabled",
			"aria-label"
		]), e.labelHidden ? _("", !0) : (s(), u("span", {
			key: 0,
			class: D(m(L).checkboxLabel)
		}, w(e.label), 3))], 10, tt));
	}
});
//#endregion
//#region src/ui/views/assets/persona_labels.ts
function rt(e, t) {
	switch (t) {
		case "assistant": return e("assets.personas.roles.assistant");
		case "user": return e("assets.personas.roles.user");
	}
}
function it(e, t) {
	switch (t) {
		case "manual": return e("assets.knowledge.source_types.manual");
		case "imported": return e("assets.knowledge.source_types.imported");
		case "character": return e("assets.knowledge.source_types.character");
	}
}
//#endregion
//#region src/ui/views/assets/KnowledgePanel.vue?vue&type=script&setup=true&lang.ts
var at = ["id", "aria-describedby"], ot = ["id", "aria-describedby"], st = ["id", "aria-describedby"], ct = /* @__PURE__ */ k({
	__name: "KnowledgePanel",
	props: {
		entries: {},
		selectedIds: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), a = h(!1), o = h(null), c = h(!1), f = h(null), p = h(null), g = h(null), y = h(null), S = h(!1), T = h(!1), O = h(!1), k = C(() => [
			"manual",
			"imported",
			"character"
		].map((e) => ({
			value: e,
			label: it(n, e)
		}))), j = C({
			get: () => o.value?.source_type ?? "manual",
			set: (e) => {
				o.value && (o.value.source_type = e);
			}
		}), M = C(() => new Set(t.selectedIds)), N = C(() => t.selectedIds.length === 0 ? !1 : t.selectedIds.length === t.entries.length || "indeterminate");
		function P(e) {
			let t = e.split(/[,，]/u).map((e) => e.trim()).filter((e) => e.length > 0);
			return [...new Set(t)];
		}
		function ee(e, n) {
			let r = new Set(t.selectedIds);
			n ? r.add(e) : r.delete(e), t.controller.set_knowledge_selection([...r]);
		}
		function te(e) {
			t.controller.set_knowledge_selection(e ? t.entries.map((e) => e.id) : []);
		}
		function ne() {
			o.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				title: "",
				source_type: "manual",
				content: "",
				keywords_text: "",
				priority: 10,
				enabled: !0
			}, F(), a.value = !0;
		}
		function re(e) {
			o.value = {
				id: e.id,
				is_new: !1,
				title: e.title,
				source_type: e.source_type,
				content: e.content,
				keywords_text: e.keywords.join(", "),
				priority: e.priority,
				enabled: e.enabled
			}, F(), a.value = !0;
		}
		function F() {
			f.value = null, p.value = null, g.value = null;
		}
		function L() {
			a.value = !1, o.value = null;
		}
		async function B() {
			let e = o.value;
			if (!e || c.value) return;
			F();
			let r = e.title.trim(), i = e.content.trim();
			if (r.length === 0 && (f.value = n("errors.validation_required")), i.length === 0 && (p.value = n("errors.validation_required")), !(f.value || p.value)) {
				c.value = !0;
				try {
					await t.controller.save_knowledge_entry({
						id: e.id,
						title: r,
						source_type: e.source_type,
						content: i,
						keywords: P(e.keywords_text),
						priority: e.priority,
						enabled: e.enabled
					}), L();
				} catch {
					g.value = n("errors.unexpected");
				} finally {
					c.value = !1;
				}
			}
		}
		async function H() {
			let e = y.value;
			if (!(!e || S.value)) {
				S.value = !0;
				try {
					await t.controller.remove_knowledge_entry(e.id), y.value = null;
				} finally {
					S.value = !1;
				}
			}
		}
		async function ie() {
			if (!O.value) {
				O.value = !0;
				try {
					await t.controller.bulk_remove_knowledge_entries(t.selectedIds), T.value = !1;
				} finally {
					O.value = !1;
				}
			}
		}
		return (t, h) => (s(), u("div", {
			class: D(m(X).categoryList),
			"data-testid": "knowledge-panel"
		}, [
			b("div", { class: D(m(X).categoryToolbar) }, [
				A(I, {
					label: m(n)("assets.knowledge.add_action"),
					onClick: ne
				}, null, 8, ["label"]),
				e.entries.length > 0 ? (s(), v(nt, {
					key: 0,
					"model-value": N.value,
					label: m(n)("assets.knowledge.select_all_label"),
					"onUpdate:modelValue": te
				}, null, 8, ["model-value", "label"])) : _("", !0),
				e.selectedIds.length > 0 ? (s(), v(I, {
					key: 1,
					label: m(n)("assets.knowledge.bulk_delete_action", { count: e.selectedIds.length }),
					variant: "destructive",
					"data-testid": "knowledge-bulk-delete",
					onClick: h[0] ||= (e) => T.value = !0
				}, null, 8, ["label"])) : _("", !0)
			], 2),
			A(R, {
				status: e.loading ? "loading" : e.entries.length === 0 ? "empty" : "ready",
				"empty-message": m(n)("assets.knowledge.empty_description")
			}, {
				action: l(() => [A(I, {
					label: m(n)("assets.knowledge.add_action"),
					onClick: ne
				}, null, 8, ["label"])]),
				default: l(() => [b("ul", { class: D(m(X).cardGrid) }, [(s(!0), u(E, null, r(e.entries, (t) => (s(), u("li", {
					key: t.id,
					class: D(m(X).assetCard),
					"data-testid": "knowledge-card"
				}, [
					A(nt, {
						"model-value": M.value.has(t.id),
						label: m(n)("assets.knowledge.select_label", { title: t.title }),
						"label-hidden": "",
						"onUpdate:modelValue": (e) => ee(t.id, e)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					b("div", { class: D(m(X).assetCardMain) }, [b("span", { class: D(m(X).assetCardName) }, w(t.title), 3), b("span", { class: D(m(X).assetCardSummary) }, [
						b("span", { class: D(m(X).assetCardSummaryPart) }, w(m(it)(m(n), t.source_type)), 3),
						b("span", { class: D(m(X).assetCardSummaryPart) }, w(m(n)("assets.knowledge.priority_summary", { priority: t.priority })), 3),
						t.keywords.length > 0 ? (s(), u("span", {
							key: 0,
							class: D(m(X).assetCardSummaryPart)
						}, w(t.keywords.join(", ")), 3)) : _("", !0)
					], 2)], 2),
					b("div", { class: D(m(X).assetCardActions) }, [
						A(ve, { content: m(n)("assets.knowledge.enabled_label") }, {
							default: l(() => [A(ge, {
								"model-value": t.enabled,
								label: m(n)("assets.knowledge.enabled_label"),
								"label-hidden": "",
								"onUpdate:modelValue": (n) => e.controller.set_knowledge_entry_enabled(t.id, n)
							}, null, 8, [
								"model-value",
								"label",
								"onUpdate:modelValue"
							])]),
							_: 2
						}, 1032, ["content"]),
						A(I, {
							label: m(n)("common.actions.edit"),
							variant: "secondary",
							onClick: (e) => re(t)
						}, null, 8, ["label", "onClick"]),
						A(I, {
							label: m(n)("common.actions.delete"),
							variant: "destructive",
							onClick: (e) => y.value = t
						}, null, 8, ["label", "onClick"])
					], 2)
				], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			A(z, {
				open: a.value,
				title: o.value?.is_new ? m(n)("assets.knowledge.add_action") : m(n)("common.actions.edit"),
				description: m(n)("assets.form_dialog_description"),
				"close-label": m(n)("common.actions.close"),
				"onUpdate:open": h[7] ||= (e) => !e && L()
			}, {
				default: l(() => [o.value ? (s(), u("div", {
					key: 0,
					class: D(m(X).form)
				}, [
					A(U, {
						label: m(n)("assets.knowledge.title_label"),
						error: f.value,
						required: ""
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [i(b("input", {
							id: e,
							"onUpdate:modelValue": h[1] ||= (e) => o.value.title = e,
							type: "text",
							"aria-describedby": t,
							class: D(m(X).textInput)
						}, null, 10, at), [[d, o.value.title]])]),
						_: 1
					}, 8, ["label", "error"]),
					A(U, {
						label: m(n)("assets.knowledge.source_type_label"),
						required: ""
					}, {
						default: l(({ fieldId: e }) => [A(G, {
							id: e,
							modelValue: j.value,
							"onUpdate:modelValue": h[2] ||= (e) => j.value = e,
							options: k.value,
							placeholder: m(n)("assets.knowledge.source_type_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					A(U, {
						label: m(n)("assets.knowledge.content_label"),
						hint: m(n)("assets.knowledge.content_hint"),
						error: p.value,
						required: ""
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [i(b("textarea", {
							id: e,
							"onUpdate:modelValue": h[3] ||= (e) => o.value.content = e,
							rows: "6",
							"aria-describedby": t,
							class: D(m(X).textArea)
						}, null, 10, ot), [[d, o.value.content]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					A(U, {
						label: m(n)("assets.knowledge.keywords_label"),
						hint: m(n)("assets.knowledge.keywords_hint")
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [i(b("input", {
							id: e,
							"onUpdate:modelValue": h[4] ||= (e) => o.value.keywords_text = e,
							type: "text",
							"aria-describedby": t,
							class: D(m(X).textInput)
						}, null, 10, st), [[d, o.value.keywords_text]])]),
						_: 1
					}, 8, ["label", "hint"]),
					A(U, {
						label: m(n)("assets.knowledge.priority_label"),
						hint: m(n)("assets.knowledge.priority_hint")
					}, {
						default: l(() => [A(V, {
							modelValue: o.value.priority,
							"onUpdate:modelValue": h[5] ||= (e) => o.value.priority = e,
							label: m(n)("assets.knowledge.priority_label"),
							"increment-label": m(n)("common.actions.increase"),
							"decrement-label": m(n)("common.actions.decrease"),
							min: 0,
							max: 1e3,
							step: 5
						}, null, 8, [
							"modelValue",
							"label",
							"increment-label",
							"decrement-label"
						])]),
						_: 1
					}, 8, ["label", "hint"]),
					A(ge, {
						modelValue: o.value.enabled,
						"onUpdate:modelValue": h[6] ||= (e) => o.value.enabled = e,
						label: m(n)("assets.knowledge.enabled_label")
					}, null, 8, ["modelValue", "label"]),
					g.value ? (s(), u("p", {
						key: 0,
						class: D(m(X).emptyDescription),
						"data-tone": "error"
					}, w(g.value), 3)) : _("", !0),
					b("div", { class: D(m(X).formActions) }, [A(I, {
						label: m(n)("common.actions.save"),
						pending: c.value,
						onClick: B
					}, null, 8, ["label", "pending"]), A(I, {
						label: m(n)("common.actions.cancel"),
						variant: "secondary",
						onClick: L
					}, null, 8, ["label"])], 2)
				], 2)) : _("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			A(de, {
				open: y.value !== null,
				title: m(n)("assets.delete_confirm_title", { name: y.value?.title ?? "" }),
				description: m(n)("assets.knowledge.delete_confirm_description"),
				"confirm-label": m(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": m(n)("confirmations.destructive.default_cancel_action"),
				pending: S.value,
				"onUpdate:open": h[8] ||= (e) => !e && (y.value = null),
				onConfirm: H
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			A(de, {
				open: T.value,
				title: m(n)("assets.knowledge.bulk_delete_confirm_title", { count: e.selectedIds.length }),
				description: m(n)("assets.knowledge.delete_confirm_description"),
				"confirm-label": m(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": m(n)("confirmations.destructive.default_cancel_action"),
				pending: O.value,
				"onUpdate:open": h[9] ||= (e) => T.value = e,
				onConfirm: ie
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 2));
	}
}), lt = /* @__PURE__ */ k({
	__name: "LoraPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), r = C(() => [{
			key: "trigger_words",
			label: n("assets.lora.trigger_words_label"),
			kind: "text"
		}, {
			key: "weight",
			label: n("assets.lora.weight_label"),
			kind: "number",
			min: 0,
			max: 2,
			step: .05
		}]), i = [{
			key: "weight",
			label: n("assets.lora.weight_label"),
			numeric: !0
		}, {
			key: "trigger_words",
			label: n("assets.lora.trigger_words_label")
		}], a = Q("lora", t.controller, () => r.value, () => n("errors.validation_required")), o = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, c) => (s(), u("div", null, [A(Z, {
			records: e.records,
			"summary-fields": i,
			loading: e.loading,
			"search-label": m(n)("common.actions.search"),
			"search-placeholder": m(n)("common.actions.search"),
			"empty-title": m(n)("assets.lora.empty_title"),
			"empty-description": m(n)("assets.lora.empty_description"),
			"add-label": m(n)("assets.lora.add_action"),
			"random-label": m(n)("assets.random_selection_action"),
			"reorder-hint": m(n)("assets.reorder_hint"),
			"edit-label": m(n)("common.actions.edit"),
			"delete-label": m(n)("common.actions.delete"),
			"delete-confirm-title": o,
			"delete-confirm-description": m(n)("assets.delete_confirm_description"),
			"confirm-label": m(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": m(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": m(n)("assets.move_up_action"),
			"move-down-label": m(n)("assets.move_down_action"),
			"drag-handle-label": m(n)("assets.drag_handle_label"),
			onAdd: m(a).open_create,
			onEdit: m(a).open_edit,
			onDelete: m(a).remove,
			onReorder: m(a).reorder,
			onRandomSelect: m(a).random_select
		}, null, 8, [
			"records",
			"loading",
			"search-label",
			"search-placeholder",
			"empty-title",
			"empty-description",
			"add-label",
			"random-label",
			"reorder-hint",
			"edit-label",
			"delete-label",
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"move-up-label",
			"move-down-label",
			"drag-handle-label",
			"onAdd",
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), A(z, {
			open: m(a).dialog_open.value,
			title: m(a).editing_record.value ? m(n)("common.actions.edit") : m(n)("assets.lora.add_action"),
			description: m(n)("assets.form_dialog_description"),
			"close-label": m(n)("common.actions.close"),
			"onUpdate:open": c[2] ||= (e) => {
				e || m(a).close_dialog();
			}
		}, {
			default: l(() => [A($e, {
				"name-label": m(n)("common.labels.name"),
				"name-placeholder": m(n)("common.labels.name"),
				name: m(a).name.value,
				"name-error": m(a).name_error.value,
				fields: r.value,
				values: m(a).values,
				"save-label": m(n)("common.actions.save"),
				"cancel-label": m(n)("common.actions.cancel"),
				"decrement-label": m(n)("common.actions.decrease"),
				"increment-label": m(n)("common.actions.increase"),
				pending: m(a).saving.value,
				"onUpdate:name": c[0] ||= (e) => {
					m(a).name.value = e;
				},
				"onUpdate:values": c[1] ||= (e) => m($)(m(a).values, e),
				onSave: m(a).save,
				onCancel: m(a).close_dialog
			}, null, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"fields",
				"values",
				"save-label",
				"cancel-label",
				"decrement-label",
				"increment-label",
				"pending",
				"onSave",
				"onCancel"
			])]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])]));
	}
}), ut = ["id", "aria-describedby"], dt = ["id", "aria-describedby"], ft = ["id", "aria-describedby"], pt = /* @__PURE__ */ k({
	__name: "PersonaPanel",
	props: {
		personas: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), a = h(!1), o = h(null), c = h(!1), f = h(null), p = h(null), g = h(null), v = h(!1), y = C(() => ["assistant", "user"].map((e) => ({
			value: e,
			label: rt(n, e)
		}))), S = C({
			get: () => o.value?.role ?? "assistant",
			set: (e) => {
				o.value && (o.value.role = e);
			}
		});
		function T() {
			o.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				display_name: "",
				role: "assistant",
				description: "",
				greeting: "",
				avatar_image_id: null,
				is_active: t.personas.length === 0
			}, f.value = null, p.value = null, a.value = !0;
		}
		function O(e) {
			o.value = {
				id: e.id,
				is_new: !1,
				display_name: e.display_name,
				role: e.role,
				description: e.description,
				greeting: e.greeting,
				avatar_image_id: e.avatar_image_id,
				is_active: e.is_active
			}, f.value = null, p.value = null, a.value = !0;
		}
		function k() {
			a.value = !1, o.value = null;
		}
		async function j() {
			let e = o.value;
			if (!e || c.value) return;
			let r = e.display_name.trim();
			if (r.length === 0) {
				f.value = n("errors.validation_required");
				return;
			}
			f.value = null, p.value = null, c.value = !0;
			try {
				await t.controller.save_persona({
					id: e.id,
					display_name: r,
					role: e.role,
					description: e.description.trim(),
					greeting: e.greeting.trim(),
					avatar_image_id: e.avatar_image_id,
					is_active: e.is_active
				}), k();
			} catch {
				p.value = n("errors.unexpected");
			} finally {
				c.value = !1;
			}
		}
		async function M(e, n) {
			await t.controller.save_persona({
				id: e.id,
				display_name: e.display_name,
				role: e.role,
				description: e.description,
				greeting: e.greeting,
				avatar_image_id: e.avatar_image_id,
				is_active: n
			});
		}
		async function N() {
			let e = g.value;
			if (!(!e || v.value)) {
				v.value = !0;
				try {
					await t.controller.remove_persona(e.id), g.value = null;
				} finally {
					v.value = !1;
				}
			}
		}
		return (t, h) => (s(), u("div", {
			class: D(m(X).categoryList),
			"data-testid": "persona-panel"
		}, [
			b("div", { class: D(m(X).categoryToolbar) }, [A(I, {
				label: m(n)("assets.personas.add_action"),
				onClick: T
			}, null, 8, ["label"])], 2),
			A(R, {
				status: e.loading ? "loading" : e.personas.length === 0 ? "empty" : "ready",
				"empty-message": m(n)("assets.personas.empty_description")
			}, {
				action: l(() => [A(I, {
					label: m(n)("assets.personas.add_action"),
					onClick: T
				}, null, 8, ["label"])]),
				default: l(() => [b("ul", { class: D(m(X).cardGrid) }, [(s(!0), u(E, null, r(e.personas, (e) => (s(), u("li", {
					key: e.id,
					class: D(m(X).assetCard),
					"data-testid": "persona-card"
				}, [b("div", { class: D(m(X).assetCardMain) }, [b("span", { class: D(m(X).assetCardName) }, w(e.display_name), 3), b("span", { class: D(m(X).assetCardSummary) }, [b("span", { class: D(m(X).assetCardSummaryPart) }, w(m(rt)(m(n), e.role)), 3), e.is_active ? (s(), u("span", {
					key: 0,
					class: D(m(X).assetCardSummaryPart)
				}, w(m(n)("assets.personas.active_badge")), 3)) : _("", !0)], 2)], 2), b("div", { class: D(m(X).assetCardActions) }, [
					A(ge, {
						"model-value": e.is_active,
						label: m(n)("assets.personas.active_toggle_label"),
						"onUpdate:modelValue": (t) => M(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					A(I, {
						label: m(n)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => O(e)
					}, null, 8, ["label", "onClick"]),
					A(I, {
						label: m(n)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => g.value = e
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			A(z, {
				open: a.value,
				title: o.value?.is_new ? m(n)("assets.personas.add_action") : m(n)("common.actions.edit"),
				description: m(n)("assets.form_dialog_description"),
				"close-label": m(n)("common.actions.close"),
				"onUpdate:open": h[5] ||= (e) => !e && k()
			}, {
				default: l(() => [o.value ? (s(), u("div", {
					key: 0,
					class: D(m(X).form)
				}, [
					A(U, {
						label: m(n)("common.labels.name"),
						error: f.value,
						required: ""
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [i(b("input", {
							id: e,
							"onUpdate:modelValue": h[0] ||= (e) => o.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: D(m(X).textInput)
						}, null, 10, ut), [[d, o.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					A(U, {
						label: m(n)("assets.personas.role_label"),
						required: ""
					}, {
						default: l(({ fieldId: e }) => [A(G, {
							id: e,
							modelValue: S.value,
							"onUpdate:modelValue": h[1] ||= (e) => S.value = e,
							options: y.value,
							placeholder: m(n)("assets.personas.role_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					A(U, {
						label: m(n)("assets.personas.description_label"),
						hint: m(n)("assets.personas.description_hint")
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [i(b("textarea", {
							id: e,
							"onUpdate:modelValue": h[2] ||= (e) => o.value.description = e,
							rows: "4",
							"aria-describedby": t,
							class: D(m(X).textArea)
						}, null, 10, dt), [[d, o.value.description]])]),
						_: 1
					}, 8, ["label", "hint"]),
					A(U, {
						label: m(n)("assets.personas.greeting_label"),
						hint: m(n)("assets.personas.greeting_hint")
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [i(b("textarea", {
							id: e,
							"onUpdate:modelValue": h[3] ||= (e) => o.value.greeting = e,
							rows: "3",
							"aria-describedby": t,
							class: D(m(X).textArea)
						}, null, 10, ft), [[d, o.value.greeting]])]),
						_: 1
					}, 8, ["label", "hint"]),
					A(ge, {
						modelValue: o.value.is_active,
						"onUpdate:modelValue": h[4] ||= (e) => o.value.is_active = e,
						label: m(n)("assets.personas.active_toggle_label")
					}, null, 8, ["modelValue", "label"]),
					p.value ? (s(), u("p", {
						key: 0,
						class: D(m(X).emptyDescription),
						"data-tone": "error"
					}, w(p.value), 3)) : _("", !0),
					b("div", { class: D(m(X).formActions) }, [A(I, {
						label: m(n)("common.actions.save"),
						pending: c.value,
						onClick: j
					}, null, 8, ["label", "pending"]), A(I, {
						label: m(n)("common.actions.cancel"),
						variant: "secondary",
						onClick: k
					}, null, 8, ["label"])], 2)
				], 2)) : _("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			A(de, {
				open: g.value !== null,
				title: m(n)("assets.delete_confirm_title", { name: g.value?.display_name ?? "" }),
				description: m(n)("assets.personas.delete_confirm_description"),
				"confirm-label": m(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": m(n)("confirmations.destructive.default_cancel_action"),
				pending: v.value,
				"onUpdate:open": h[6] ||= (e) => !e && (g.value = null),
				onConfirm: N
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 2));
	}
}), mt = /* @__PURE__ */ k({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: r } = x(), i = C(() => [{
			key: "description",
			label: r("assets.outfits.description_label"),
			kind: "textarea"
		}]), a = [], o = Q("outfit", t.controller, () => i.value, () => r("errors.validation_required")), c = C(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), d = C(() => {
			let e = o.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function f(e) {
			o.values.character_id = e;
		}
		let p = (e) => r("assets.delete_confirm_title", { name: e });
		return (t, h) => (s(), u("div", null, [A(Z, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": m(r)("common.actions.search"),
			"search-placeholder": m(r)("common.actions.search"),
			"empty-title": m(r)("assets.outfits.empty_title"),
			"empty-description": m(r)("assets.outfits.empty_description"),
			"add-label": m(r)("assets.outfits.add_action"),
			"random-label": m(r)("assets.random_selection_action"),
			"reorder-hint": m(r)("assets.reorder_hint"),
			"edit-label": m(r)("common.actions.edit"),
			"delete-label": m(r)("common.actions.delete"),
			"delete-confirm-title": p,
			"delete-confirm-description": m(r)("assets.delete_confirm_description"),
			"confirm-label": m(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": m(r)("confirmations.destructive.default_cancel_action"),
			"move-up-label": m(r)("assets.move_up_action"),
			"move-down-label": m(r)("assets.move_down_action"),
			"drag-handle-label": m(r)("assets.drag_handle_label"),
			onAdd: m(o).open_create,
			onEdit: m(o).open_edit,
			onDelete: m(o).remove,
			onReorder: m(o).reorder,
			onRandomSelect: m(o).random_select
		}, null, 8, [
			"records",
			"loading",
			"search-label",
			"search-placeholder",
			"empty-title",
			"empty-description",
			"add-label",
			"random-label",
			"reorder-hint",
			"edit-label",
			"delete-label",
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"move-up-label",
			"move-down-label",
			"drag-handle-label",
			"onAdd",
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), A(z, {
			open: m(o).dialog_open.value,
			title: m(o).editing_record.value ? m(r)("common.actions.edit") : m(r)("assets.outfits.add_action"),
			description: m(r)("assets.form_dialog_description"),
			"close-label": m(r)("common.actions.close"),
			"onUpdate:open": h[2] ||= (e) => {
				e || m(o).close_dialog();
			}
		}, {
			default: l(() => [A($e, {
				"name-label": m(r)("common.labels.name"),
				"name-placeholder": m(r)("common.labels.name"),
				name: m(o).name.value,
				"name-error": m(o).name_error.value,
				fields: i.value,
				values: m(o).values,
				"save-label": m(r)("common.actions.save"),
				"cancel-label": m(r)("common.actions.cancel"),
				"decrement-label": m(r)("common.actions.decrease"),
				"increment-label": m(r)("common.actions.increase"),
				pending: m(o).saving.value,
				"onUpdate:name": h[0] ||= (e) => {
					m(o).name.value = e;
				},
				"onUpdate:values": h[1] ||= (e) => m($)(m(o).values, e),
				onSave: m(o).save,
				onCancel: m(o).close_dialog
			}, {
				"extra-fields": l(() => [A(U, { label: m(r)("assets.outfits.character_label") }, {
					default: l(({ fieldId: e, describedBy: t }) => [A(G, n({
						id: e,
						"model-value": d.value,
						options: c.value,
						placeholder: m(r)("assets.outfits.character_placeholder")
					}, m(pe)({ describedBy: t }), { "onUpdate:modelValue": f }), null, 16, [
						"id",
						"model-value",
						"options",
						"placeholder"
					])]),
					_: 1
				}, 8, ["label"])]),
				_: 1
			}, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"fields",
				"values",
				"save-label",
				"cancel-label",
				"decrement-label",
				"increment-label",
				"pending",
				"onSave",
				"onCancel"
			])]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])]));
	}
}), ht = /* @__PURE__ */ k({
	__name: "ReferencePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), r = C(() => [{
			key: "source_url",
			label: n("assets.reference.source_url_label"),
			kind: "text"
		}, {
			key: "notes",
			label: n("assets.reference.notes_label"),
			kind: "textarea"
		}]), i = Q("reference", t.controller, () => r.value, () => n("errors.validation_required")), a = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, o) => (s(), u("div", null, [A(Z, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": m(n)("common.actions.search"),
			"search-placeholder": m(n)("common.actions.search"),
			"empty-title": m(n)("assets.reference.empty_title"),
			"empty-description": m(n)("assets.reference.empty_description"),
			"add-label": m(n)("assets.reference.add_action"),
			"random-label": m(n)("assets.random_selection_action"),
			"reorder-hint": m(n)("assets.reorder_hint"),
			"edit-label": m(n)("common.actions.edit"),
			"delete-label": m(n)("common.actions.delete"),
			"delete-confirm-title": a,
			"delete-confirm-description": m(n)("assets.delete_confirm_description"),
			"confirm-label": m(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": m(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": m(n)("assets.move_up_action"),
			"move-down-label": m(n)("assets.move_down_action"),
			"drag-handle-label": m(n)("assets.drag_handle_label"),
			onAdd: m(i).open_create,
			onEdit: m(i).open_edit,
			onDelete: m(i).remove,
			onReorder: m(i).reorder,
			onRandomSelect: m(i).random_select
		}, null, 8, [
			"records",
			"loading",
			"search-label",
			"search-placeholder",
			"empty-title",
			"empty-description",
			"add-label",
			"random-label",
			"reorder-hint",
			"edit-label",
			"delete-label",
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"move-up-label",
			"move-down-label",
			"drag-handle-label",
			"onAdd",
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), A(z, {
			open: m(i).dialog_open.value,
			title: m(i).editing_record.value ? m(n)("common.actions.edit") : m(n)("assets.reference.add_action"),
			description: m(n)("assets.form_dialog_description"),
			"close-label": m(n)("common.actions.close"),
			"onUpdate:open": o[2] ||= (e) => {
				e || m(i).close_dialog();
			}
		}, {
			default: l(() => [A($e, {
				"name-label": m(n)("common.labels.name"),
				"name-placeholder": m(n)("common.labels.name"),
				name: m(i).name.value,
				"name-error": m(i).name_error.value,
				fields: r.value,
				values: m(i).values,
				"save-label": m(n)("common.actions.save"),
				"cancel-label": m(n)("common.actions.cancel"),
				"decrement-label": m(n)("common.actions.decrease"),
				"increment-label": m(n)("common.actions.increase"),
				pending: m(i).saving.value,
				"onUpdate:name": o[0] ||= (e) => {
					m(i).name.value = e;
				},
				"onUpdate:values": o[1] ||= (e) => m($)(m(i).values, e),
				onSave: m(i).save,
				onCancel: m(i).close_dialog
			}, null, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"fields",
				"values",
				"save-label",
				"cancel-label",
				"decrement-label",
				"increment-label",
				"pending",
				"onSave",
				"onCancel"
			])]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])]));
	}
}), gt = "novelai", _t = "google", vt = /* @__PURE__ */ k({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), r = C(() => [{
			value: gt,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: _t,
			label: n("assets.vibe.provider_google")
		}]), i = C(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return o.values.provider !== _t && e.push({
				key: "strength",
				label: n("assets.vibe.strength_label"),
				kind: "number",
				min: 0,
				max: 1,
				step: .05
			}, {
				key: "information_extracted",
				label: n("assets.vibe.information_extracted_label"),
				kind: "number",
				min: 0,
				max: 1,
				step: .05
			}), e;
		}), a = [{
			key: "strength",
			label: n("assets.vibe.strength_label"),
			numeric: !0
		}], o = Q("vibe", t.controller, () => i.value, () => n("errors.validation_required")), c = C(() => typeof o.values.provider == "string" && o.values.provider !== "" ? o.values.provider : gt);
		function d(e) {
			o.values.provider = e;
		}
		let f = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, p) => (s(), u("div", null, [A(Z, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": m(n)("common.actions.search"),
			"search-placeholder": m(n)("common.actions.search"),
			"empty-title": m(n)("assets.vibe.empty_title"),
			"empty-description": m(n)("assets.vibe.empty_description"),
			"add-label": m(n)("assets.vibe.add_action"),
			"random-label": m(n)("assets.random_selection_action"),
			"reorder-hint": m(n)("assets.reorder_hint"),
			"edit-label": m(n)("common.actions.edit"),
			"delete-label": m(n)("common.actions.delete"),
			"delete-confirm-title": f,
			"delete-confirm-description": m(n)("assets.delete_confirm_description"),
			"confirm-label": m(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": m(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": m(n)("assets.move_up_action"),
			"move-down-label": m(n)("assets.move_down_action"),
			"drag-handle-label": m(n)("assets.drag_handle_label"),
			onAdd: m(o).open_create,
			onEdit: m(o).open_edit,
			onDelete: m(o).remove,
			onReorder: m(o).reorder,
			onRandomSelect: m(o).random_select
		}, null, 8, [
			"records",
			"loading",
			"search-label",
			"search-placeholder",
			"empty-title",
			"empty-description",
			"add-label",
			"random-label",
			"reorder-hint",
			"edit-label",
			"delete-label",
			"delete-confirm-description",
			"confirm-label",
			"cancel-label",
			"move-up-label",
			"move-down-label",
			"drag-handle-label",
			"onAdd",
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), A(z, {
			open: m(o).dialog_open.value,
			title: m(o).editing_record.value ? m(n)("common.actions.edit") : m(n)("assets.vibe.add_action"),
			description: m(n)("assets.form_dialog_description"),
			"close-label": m(n)("common.actions.close"),
			"onUpdate:open": p[2] ||= (e) => {
				e || m(o).close_dialog();
			}
		}, {
			default: l(() => [A($e, {
				"name-label": m(n)("common.labels.name"),
				"name-placeholder": m(n)("common.labels.name"),
				name: m(o).name.value,
				"name-error": m(o).name_error.value,
				fields: i.value,
				values: m(o).values,
				"save-label": m(n)("common.actions.save"),
				"cancel-label": m(n)("common.actions.cancel"),
				"decrement-label": m(n)("common.actions.decrease"),
				"increment-label": m(n)("common.actions.increase"),
				pending: m(o).saving.value,
				"onUpdate:name": p[0] ||= (e) => {
					m(o).name.value = e;
				},
				"onUpdate:values": p[1] ||= (e) => m($)(m(o).values, e),
				onSave: m(o).save,
				onCancel: m(o).close_dialog
			}, {
				"extra-fields": l(() => [A(U, { label: m(n)("assets.vibe.provider_label") }, {
					default: l(() => [A(xe, {
						"model-value": c.value,
						options: r.value,
						label: m(n)("assets.vibe.provider_label"),
						"onUpdate:modelValue": d
					}, null, 8, [
						"model-value",
						"options",
						"label"
					])]),
					_: 1
				}, 8, ["label"])]),
				_: 1
			}, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"fields",
				"values",
				"save-label",
				"cancel-label",
				"decrement-label",
				"increment-label",
				"pending",
				"onSave",
				"onCancel"
			])]),
			_: 1
		}, 8, [
			"open",
			"title",
			"description",
			"close-label"
		])]));
	}
}), yt = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, bt = ["placeholder"], xt = ["aria-expanded"], St = /* @__PURE__ */ k({
	__name: "VocabularyPanel",
	props: {
		catalog: {},
		installCommand: {},
		loading: { type: Boolean },
		controller: {},
		locale: {}
	},
	setup(e) {
		let n = e, { t: a } = x();
		t(() => {
			n.controller.load_vocabulary_catalog();
		});
		let o = /nsfw|adult|explicit/iu;
		function f(e) {
			return o.test(e.package_id) || o.test(e.display_name.en) || o.test(e.display_name["zh-CN"]);
		}
		let p = C(() => n.catalog.filter((e) => !f(e))), g = C(() => n.catalog.filter((e) => f(e))), y = h(!1);
		function S(e) {
			return n.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let T = h(null), k = h(null);
		function j(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return a("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return a("assets.vocabulary.progress_downloading");
				case "verifying_package": return a("assets.vocabulary.progress_verifying_package");
				case "installing": return a("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function M(e) {
			T.value === null && (T.value = e.package_id, k.value = null, await n.controller.install_vocabulary_package(e, (e) => {
				k.value = j(e);
			}), T.value = null, k.value = null, n.controller.state.assets.vocabulary_install_command.status === "success" && (F.value = [], L.value = null, P.value.trim() !== "" && await U()));
		}
		let P = h(""), F = h([]), L = h(null), z = h(!1), B = h(!1), V = h(null), H = null;
		async function U() {
			let e = P.value.trim();
			if (e === "") {
				F.value = [], L.value = null;
				return;
			}
			z.value = !0;
			try {
				let t = await n.controller.search_vocabulary(e);
				F.value = t.results, L.value = t.next_cursor;
			} finally {
				z.value = !1;
			}
		}
		async function ie() {
			if (L.value !== null) {
				B.value = !0;
				try {
					let e = await n.controller.load_more_vocabulary(L.value);
					F.value = [...F.value, ...e.results], L.value = e.next_cursor;
				} finally {
					B.value = !1;
				}
			}
		}
		c(P, () => {
			H !== null && clearTimeout(H), H = setTimeout(() => {
				U();
			}, 250);
		});
		async function W(e) {
			await navigator.clipboard.writeText(e.display_text), V.value = e.record_id, setTimeout(() => {
				V.value === e.record_id && (V.value = null);
			}, 2e3);
		}
		let G = C(() => n.loading ? "loading" : n.catalog.length === 0 ? "empty" : "ready"), ae = C(() => z.value && F.value.length === 0 ? "loading" : P.value.trim() === "" || F.value.length > 0 ? "ready" : "empty");
		return (e, t) => (s(), u("div", { class: D(m(X).vocabularyPanel) }, [
			b("section", null, [
				b("p", { class: D(m(X).sectionTitle) }, w(m(a)("assets.vocabulary.search_placeholder")), 3),
				b("div", { class: D(m(X).vocabularySearchRow) }, [b("label", yt, w(m(a)("assets.vocabulary.search_placeholder")), 1), i(b("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": t[0] ||= (e) => P.value = e,
					type: "text",
					class: D(m(X).searchInput),
					placeholder: m(a)("assets.vocabulary.search_placeholder")
				}, null, 10, bt), [[d, P.value]])], 2),
				A(R, {
					status: ae.value,
					"empty-title": m(a)("assets.vocabulary.empty_title"),
					"empty-message": m(a)("assets.vocabulary.empty_description"),
					"min-height": "60px"
				}, {
					default: l(() => [F.value.length > 0 ? (s(), u("ul", {
						key: 0,
						class: D(m(X).searchResultsList)
					}, [(s(!0), u(E, null, r(F.value, (e) => (s(), u("li", {
						key: e.record_id,
						class: D(m(X).searchResultRow)
					}, [
						b("span", { class: D(m(X).searchResultTag) }, w(e.display_text), 3),
						e.category ? (s(), u("span", {
							key: 0,
							class: D(m(X).searchResultTranslation)
						}, w(e.category), 3)) : _("", !0),
						A(I, {
							label: V.value === e.record_id ? m(a)("common.actions.copied") : m(a)("common.actions.copy"),
							icon: m(ne),
							variant: "secondary",
							onClick: () => void W(e)
						}, null, 8, [
							"label",
							"icon",
							"onClick"
						])
					], 2))), 128))], 2)) : _("", !0)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
					"empty-message"
				]),
				L.value === null ? _("", !0) : (s(), u("div", {
					key: 0,
					class: D(m(X).loadMoreRow)
				}, [A(I, {
					label: m(a)("common.actions.next"),
					variant: "secondary",
					pending: B.value,
					onClick: t[1] ||= () => void ie()
				}, null, 8, ["label", "pending"])], 2))
			]),
			b("section", null, [
				b("p", { class: D(m(X).sectionTitle) }, w(m(a)("assets.vocabulary.update_action")), 3),
				A(R, {
					status: G.value,
					"empty-title": m(a)("assets.vocabulary.empty_title"),
					"empty-message": m(a)("assets.vocabulary.empty_description"),
					"min-height": "80px"
				}, {
					default: l(() => [b("div", { class: D(m(X).catalogList) }, [(s(!0), u(E, null, r(p.value, (e) => (s(), u("div", {
						key: e.package_id,
						class: D(m(X).catalogEntry)
					}, [b("div", { class: D(m(X).catalogEntryInfo) }, [b("span", { class: D(m(X).catalogEntryName) }, w(S(e)), 3), b("span", { class: D(["tc-tabular-nums", m(X).catalogEntryMeta]) }, w(m(a)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (s(), u("span", {
						key: 0,
						class: D(m(X).bundledBadge)
					}, w(m(a)("assets.vocabulary.bundled_label")), 3)) : (s(), v(I, {
						key: 1,
						label: m(a)("assets.vocabulary.import_action"),
						icon: m(re),
						variant: "primary",
						pending: T.value === e.package_id,
						onClick: () => void M(e)
					}, null, 8, [
						"label",
						"icon",
						"pending",
						"onClick"
					]))], 2))), 128))], 2)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
					"empty-message"
				]),
				T.value !== null && k.value !== null ? (s(), u("p", {
					key: 0,
					class: D(m(X).installProgress)
				}, w(k.value), 3)) : _("", !0)
			]),
			g.value.length > 0 ? (s(), u("section", {
				key: 0,
				class: D(m(X).nsfwSection)
			}, [b("button", {
				type: "button",
				class: D(["tc-interactive", m(X).nsfwToggle]),
				"aria-expanded": y.value,
				onClick: t[2] ||= (e) => y.value = !y.value
			}, [A(N, {
				icon: y.value ? m(te) : m(ee),
				size: 14
			}, null, 8, ["icon"]), O(" " + w(m(a)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, xt), y.value ? (s(), u("div", {
				key: 1,
				class: D(m(X).catalogList)
			}, [b("p", { class: D(m(X).nsfwNotice) }, w(m(a)("assets.vocabulary.nsfw_disclosure_hint")), 3), (s(!0), u(E, null, r(g.value, (e) => (s(), u("div", {
				key: e.package_id,
				class: D(m(X).catalogEntry)
			}, [b("div", { class: D(m(X).catalogEntryInfo) }, [b("span", { class: D(m(X).catalogEntryName) }, w(S(e)), 3), b("span", { class: D(["tc-tabular-nums", m(X).catalogEntryMeta]) }, w(m(a)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), A(I, {
				label: m(a)("assets.vocabulary.import_action"),
				icon: m(re),
				variant: "destructive",
				pending: T.value === e.package_id,
				onClick: () => void M(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (s(), u("p", {
				key: 0,
				class: D(m(X).nsfwNotice)
			}, w(m(a)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : _("", !0)
		], 2));
	}
}), Ct = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, wt = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function Tt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(Ct)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var Et = ["aria-label"], Dt = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], Ot = ["id", "value"], kt = "unmapped", At = "{{", jt = "}}", Mt = /* @__PURE__ */ k({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: i } = x(), a = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], o = Q("workflow", t.controller, () => a, () => n("errors.validation_required")), d = h(null), f = h([]);
		function g(e) {
			switch (e) {
				case "positive_prompt": return n("assets.workflow.target_positive_prompt");
				case "negative_prompt": return n("assets.workflow.target_negative_prompt");
				case "seed": return n("assets.workflow.target_seed");
				case "width": return n("assets.workflow.target_width");
				case "height": return n("assets.workflow.target_height");
				case "steps": return n("assets.workflow.target_steps");
			}
		}
		let y = C(() => [{
			value: kt,
			label: n("assets.workflow.placeholder_unmapped")
		}, ...wt.map((e) => ({
			value: e,
			label: g(e)
		}))]);
		function S() {
			let e = o.values.workflow_json;
			return typeof e == "string" ? e : "";
		}
		function T(e) {
			let t = e.placeholder_map, n = {};
			if (typeof t == "string") try {
				let e = JSON.parse(t);
				typeof e == "object" && e && (n = e);
			} catch {
				n = {};
			}
			f.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		c(() => o.editing_record.value, (e) => {
			e ? T(e.payload) : f.value = [];
		}, { immediate: !0 });
		function O() {
			let e = Tt(S()), t = new Map(f.value.map((e) => [e.name, e.target]));
			f.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function k(e, t) {
			let n = f.value.find((t) => t.name === e);
			n && (n.target = t === kt ? "" : t);
		}
		function j() {
			d.value?.click();
		}
		function M(e) {
			return `${At}${e}${jt}`;
		}
		async function N(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			o.open_create(), o.name.value = n.name.replace(/\.json$/iu, ""), o.values.workflow_json = r, f.value = Tt(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function P() {
			let e = {};
			for (let t of f.value) e[t.name] = t.target;
			o.values.placeholder_map = JSON.stringify(e), await o.save();
		}
		let ee = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, a) => (s(), u("div", null, [
			b("div", { class: D(m(X).workflowToolbarRow) }, [A(I, {
				label: m(n)("assets.workflow.import_action"),
				icon: m(we),
				variant: "primary",
				onClick: j
			}, null, 8, ["label", "icon"]), b("input", {
				ref_key: "file_input",
				ref: d,
				class: D(m(X).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": m(n)("assets.workflow.import_action"),
				onChange: a[0] ||= (e) => void N(e)
			}, null, 42, Et)], 2),
			A(Z, {
				records: e.records,
				"summary-fields": [],
				loading: e.loading,
				"search-label": m(n)("common.actions.search"),
				"search-placeholder": m(n)("common.actions.search"),
				"empty-title": m(n)("assets.workflow.empty_title"),
				"empty-description": m(n)("assets.workflow.empty_description"),
				"add-label": m(n)("assets.workflow.import_action"),
				"random-label": m(n)("assets.random_selection_action"),
				"reorder-hint": m(n)("assets.reorder_hint"),
				"edit-label": m(n)("assets.workflow.edit_action"),
				"delete-label": m(n)("common.actions.delete"),
				"delete-confirm-title": ee,
				"delete-confirm-description": m(n)("assets.delete_confirm_description"),
				"confirm-label": m(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": m(n)("confirmations.destructive.default_cancel_action"),
				"move-up-label": m(n)("assets.move_up_action"),
				"move-down-label": m(n)("assets.move_down_action"),
				"drag-handle-label": m(n)("assets.drag_handle_label"),
				onAdd: j,
				onEdit: m(o).open_edit,
				onDelete: m(o).remove,
				onReorder: m(o).reorder,
				onRandomSelect: m(o).random_select
			}, null, 8, [
				"records",
				"loading",
				"search-label",
				"search-placeholder",
				"empty-title",
				"empty-description",
				"add-label",
				"random-label",
				"reorder-hint",
				"edit-label",
				"delete-label",
				"delete-confirm-description",
				"confirm-label",
				"cancel-label",
				"move-up-label",
				"move-down-label",
				"drag-handle-label",
				"onEdit",
				"onDelete",
				"onReorder",
				"onRandomSelect"
			]),
			A(z, {
				open: m(o).dialog_open.value,
				title: m(n)("assets.workflow.edit_action"),
				description: m(n)("assets.form_dialog_description"),
				"close-label": m(n)("common.actions.close"),
				"onUpdate:open": a[4] ||= (e) => {
					e || m(o).close_dialog();
				}
			}, {
				default: l(() => [b("form", {
					class: D(m(X).form),
					onSubmit: a[3] ||= p(() => void P(), ["prevent"])
				}, [
					A(U, {
						label: m(n)("common.labels.name"),
						error: m(o).name_error.value,
						required: ""
					}, {
						default: l(({ fieldId: e, describedBy: t, invalid: r }) => [b("input", {
							id: e,
							class: D(m(X).textInput),
							type: "text",
							placeholder: m(n)("common.labels.name"),
							value: m(o).name.value,
							"aria-describedby": t,
							"aria-invalid": r,
							onInput: a[1] ||= (e) => m(o).name.value = e.target.value
						}, null, 42, Dt)]),
						_: 1
					}, 8, ["label", "error"]),
					A(U, { label: m(n)("assets.workflow.json_label") }, {
						default: l(({ fieldId: e }) => [b("textarea", {
							id: e,
							class: D(m(X).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: S(),
							onInput: a[2] ||= (e) => m(o).values.workflow_json = e.target.value
						}, null, 42, Ot)]),
						_: 1
					}, 8, ["label"]),
					A(I, {
						label: m(n)("assets.workflow.placeholder_scan_action"),
						icon: m(Ce),
						variant: "secondary",
						type: "button",
						onClick: O
					}, null, 8, ["label", "icon"]),
					f.value.length > 0 ? (s(), u("div", {
						key: 0,
						class: D(m(X).placeholderList)
					}, [(s(!0), u(E, null, r(f.value, (e) => (s(), u("div", {
						key: e.name,
						class: D(m(X).placeholderRow)
					}, [b("span", { class: D(m(X).placeholderKey) }, w(M(e.name)), 3), (s(), v(G, {
						key: m(i),
						"model-value": e.target === "" ? kt : e.target,
						options: y.value,
						placeholder: m(n)("assets.workflow.placeholder_unmapped"),
						ariaLabel: e.name,
						"onUpdate:modelValue": (t) => k(e.name, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128))], 2)) : _("", !0),
					b("div", { class: D(m(X).formActions) }, [A(I, {
						label: m(n)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: m(o).close_dialog
					}, null, 8, ["label", "onClick"]), A(I, {
						label: m(n)("common.actions.save"),
						variant: "primary",
						type: "submit",
						pending: m(o).saving.value
					}, null, 8, ["label", "pending"])], 2)
				], 34)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			])
		]));
	}
}), Nt = /* @__PURE__ */ k({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = x(), i = /* @__PURE__ */ new Set([
			"character",
			"outfit",
			"lora",
			"vibe",
			"reference",
			"workflow"
		]), a = h(t.state.assets.active_category);
		function o(e) {
			a.value = e, i.has(e) && t.controller.set_active_asset_category(e);
		}
		let c = C(() => t.state.loading.has("assets")), d = C(() => t.state.loading.has("personas")), f = C(() => t.state.loading.has("knowledge")), p = C(() => t.state.loading.has("vocabulary")), g = C(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (s(), u("div", { class: D(m(X).assetsView) }, [A(m(Ie), {
			"model-value": a.value,
			"onUpdate:modelValue": o
		}, {
			default: l(() => [
				A(m(ze), {
					class: D(m(X).tabsList),
					"aria-label": m(n)("nav.assets")
				}, {
					default: l(() => [
						A(m(Y), {
							value: "vocabulary",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.vocabulary")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(m(Y), {
							value: "persona",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.personas")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(m(Y), {
							value: "knowledge",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.knowledge")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(m(Y), {
							value: "character",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.characters")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(m(Y), {
							value: "outfit",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.outfits")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(m(Y), {
							value: "lora",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.lora")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(m(Y), {
							value: "vibe",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.vibe")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(m(Y), {
							value: "reference",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.reference")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(m(Y), {
							value: "workflow",
							class: D(m(X).tabsTrigger)
						}, {
							default: l(() => [O(w(m(n)("assets.tabs.workflow")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					_: 1
				}, 8, ["class", "aria-label"]),
				A(m(J), {
					value: "vocabulary",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(St, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						loading: p.value,
						controller: e.controller,
						locale: g.value
					}, null, 8, [
						"catalog",
						"install-command",
						"loading",
						"controller",
						"locale"
					])]),
					_: 1
				}, 8, ["class"]),
				A(m(J), {
					value: "persona",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(pt, {
						personas: e.state.library.personas,
						loading: d.value,
						controller: e.controller
					}, null, 8, [
						"personas",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(m(J), {
					value: "knowledge",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(ct, {
						entries: e.state.library.knowledge,
						"selected-ids": e.state.library.selected_knowledge_ids,
						loading: f.value,
						controller: e.controller
					}, null, 8, [
						"entries",
						"selected-ids",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(m(J), {
					value: "character",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(et, {
						records: e.state.assets.records.character,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(m(J), {
					value: "outfit",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(mt, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(m(J), {
					value: "lora",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(lt, {
						records: e.state.assets.records.lora,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(m(J), {
					value: "vibe",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(vt, {
						records: e.state.assets.records.vibe,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(m(J), {
					value: "reference",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(ht, {
						records: e.state.assets.records.reference,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(m(J), {
					value: "workflow",
					class: D(m(X).tabsContent)
				}, {
					default: l(() => [A(Mt, {
						records: e.state.assets.records.workflow,
						loading: c.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"])
			]),
			_: 1
		}, 8, ["model-value"])], 2));
	}
});
//#endregion
export { Nt as default };
