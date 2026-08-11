import { $ as e, A as t, B as n, D as r, F as i, I as a, N as o, Q as s, U as c, W as l, _ as u, a as d, c as f, dt as p, ft as m, g as h, h as g, it as _, k as v, lt as y, m as b, n as x, p as S, s as C, st as w, tt as T, u as E, v as D, x as O, y as k } from "./vue-i18n-D0uIxSJk.js";
import { n as A, t as j } from "./AppIcon-C3iVkJ88.js";
import { t as M } from "./chevron-down-CwbP0nda.js";
import { t as N } from "./chevron-up-DOD737Dx.js";
import { t as P } from "./copy-CgzgZVk5.js";
import { n as ee, t as te } from "./trash-2-BSN31Aev.js";
import { n as F, t as I } from "./StateSurface-BEQHm_62.js";
import { n as L, t as R } from "./NumberStepper-BODguUjk.js";
import { n as z, t as B } from "./FieldGroup-Cy3BpEB-.js";
import { t as V } from "./shuffle-DAH1WX4K.js";
import { t as H } from "./AppSelect-FH6QY0f8.js";
import { _ as U, c as W, i as G, j as ne, o as re, s as ie } from "./Teleport-CfSgxnHY.js";
import { c as ae } from "./PopperContent-K7T6sb7Y.js";
import { n as oe, t as se } from "./_prop_utils-xadmv5JU.js";
import { t as K } from "./AppSwitch-DMAmbdlY.js";
import { t as ce } from "./RovingFocusGroup-BDSC0leT.js";
import { t as le } from "./IconButton-CYdojfyf.js";
import { n as ue, t as de } from "./SegmentedControl-DK6LHuLY.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/grip-vertical.js
var fe = A("grip-vertical", [
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
]), pe = A("scan-search", [
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
]), me = A("upload", [
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
]), [he, ge] = /*#__PURE__*/ ne("TabsRoot"), _e = /* @__PURE__ */ O({
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
	setup(t, { emit: n }) {
		let r = t, i = n, { orientation: s, unmountOnHide: l, dir: u } = _(r), d = ae(u);
		W();
		let f = U(r, "modelValue", i, {
			defaultValue: r.defaultValue,
			passive: r.modelValue === void 0
		}), p = e(), m = T(/* @__PURE__ */ new Set());
		return ge({
			modelValue: f,
			changeModelValue: (e) => {
				f.value = e;
			},
			orientation: s,
			dir: d,
			unmountOnHide: l,
			activationMode: r.activationMode,
			baseId: ie(void 0, "reka-tabs"),
			tabsList: p,
			contentIds: m,
			registerContent: (e) => {
				m.value = /* @__PURE__ */ new Set([...m.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(m.value);
				t.delete(e), m.value = t;
			}
		}), (e, t) => (o(), g(w(G), {
			dir: w(d),
			"data-orientation": w(s),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: c(() => [a(e.$slots, "default", { modelValue: w(f) })]),
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
function ve(e, t) {
	return `${e}-trigger-${t}`;
}
function ye(e, t) {
	return `${e}-content-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var q = /* @__PURE__ */ O({
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
	setup(n) {
		let r = n, { forwardRef: i } = W(), s = he(), l = S(() => ve(s.baseId, r.value)), u = S(() => ye(s.baseId, r.value)), d = S(() => r.value === s.modelValue.value), f = e(d.value);
		return t(() => {
			s.registerContent(r.value), requestAnimationFrame(() => {
				f.value = !1;
			});
		}), v(() => {
			s.unregisterContent(r.value);
		}), (e, t) => (o(), g(w(re), {
			present: e.forceMount || d.value,
			"force-mount": ""
		}, {
			default: c(({ present: t }) => [k(w(G), {
				id: u.value,
				ref: w(i),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": d.value ? "active" : "inactive",
				"data-orientation": w(s).orientation.value,
				"aria-labelledby": l.value,
				hidden: !t,
				tabindex: "0",
				style: p({ animationDuration: f.value ? "0s" : void 0 })
			}, {
				default: c(() => [!w(s).unmountOnHide.value || t ? a(e.$slots, "default", { key: 0 }) : h("v-if", !0)]),
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
}), be = /* @__PURE__ */ O({
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
		let { loop: t } = _(e), { forwardRef: n, currentElement: r } = W(), i = he();
		return i.tabsList = r, (e, r) => (o(), g(w(ce), {
			"as-child": "",
			orientation: w(i).orientation.value,
			dir: w(i).dir.value,
			loop: w(t)
		}, {
			default: c(() => [k(w(G), {
				ref: w(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": w(i).orientation.value
			}, {
				default: c(() => [a(e.$slots, "default")]),
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
}), J = /* @__PURE__ */ O({
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
		let t = e, { forwardRef: n } = W(), r = he(), i = S(() => ve(r.baseId, t.value)), s = S(() => r.contentIds.value.has(t.value) ? ye(r.baseId, t.value) : void 0), l = S(() => t.value === r.modelValue.value);
		return (e, t) => (o(), g(w(ue), {
			"as-child": "",
			focusable: !e.disabled,
			active: l.value
		}, {
			default: c(() => [k(w(G), {
				id: i.value,
				ref: w(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": l.value ? "true" : "false",
				"aria-controls": s.value,
				"data-state": l.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": w(r).orientation.value,
				onMousedown: t[0] ||= f((t) => {
					!e.disabled && t.ctrlKey === !1 ? w(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= C((t) => w(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = w(r).activationMode !== "manual";
					!l.value && !e.disabled && t && w(r).changeModelValue(e.value);
				}
			}, {
				default: c(() => [a(e.$slots, "default")]),
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
}), Y = {
	assetsView: "_assetsView_1lx1r_10",
	tabsList: "_tabsList_1lx1r_23",
	tabsTrigger: "_tabsTrigger_1lx1r_31",
	tabsContent: "_tabsContent_1lx1r_55",
	categoryList: "_categoryList_1lx1r_70",
	categoryToolbar: "_categoryToolbar_1lx1r_76",
	searchInput: "_searchInput_1lx1r_83",
	reorderHint: "_reorderHint_1lx1r_99",
	emptyDescription: "_emptyDescription_1lx1r_104",
	cardGrid: "_cardGrid_1lx1r_109",
	assetCard: "_assetCard_1lx1r_115",
	dragHandle: "_dragHandle_1lx1r_129",
	assetCardMain: "_assetCardMain_1lx1r_137",
	assetCardName: "_assetCardName_1lx1r_155",
	assetCardSummary: "_assetCardSummary_1lx1r_165",
	assetCardSummaryPart: "_assetCardSummaryPart_1lx1r_173",
	assetCardActions: "_assetCardActions_1lx1r_177",
	form: "_form_1lx1r_188",
	textInput: "_textInput_1lx1r_194",
	textArea: "_textArea_1lx1r_195",
	formActions: "_formActions_1lx1r_217",
	vocabularyPanel: "_vocabularyPanel_1lx1r_227",
	vocabularySearchRow: "_vocabularySearchRow_1lx1r_233",
	searchResultsList: "_searchResultsList_1lx1r_238",
	searchResultRow: "_searchResultRow_1lx1r_244",
	searchResultTag: "_searchResultTag_1lx1r_253",
	searchResultTranslation: "_searchResultTranslation_1lx1r_258",
	loadMoreRow: "_loadMoreRow_1lx1r_263",
	sectionTitle: "_sectionTitle_1lx1r_269",
	catalogList: "_catalogList_1lx1r_275",
	catalogEntry: "_catalogEntry_1lx1r_281",
	catalogEntryInfo: "_catalogEntryInfo_1lx1r_290",
	catalogEntryName: "_catalogEntryName_1lx1r_297",
	catalogEntryMeta: "_catalogEntryMeta_1lx1r_303",
	bundledBadge: "_bundledBadge_1lx1r_308",
	nsfwSection: "_nsfwSection_1lx1r_318",
	nsfwToggle: "_nsfwToggle_1lx1r_324",
	nsfwNotice: "_nsfwNotice_1lx1r_334",
	installProgress: "_installProgress_1lx1r_340",
	workflowToolbarRow: "_workflowToolbarRow_1lx1r_349",
	placeholderList: "_placeholderList_1lx1r_355",
	placeholderRow: "_placeholderRow_1lx1r_361",
	placeholderKey: "_placeholderKey_1lx1r_367",
	hiddenFileInput: "_hiddenFileInput_1lx1r_378"
};
//#endregion
//#region src/ui/views/assets/asset_field_schema.ts
function xe(e, t) {
	let n = e[t.key];
	return t.kind === "number" ? typeof n == "number" ? n : 0 : typeof n == "string" ? n : "";
}
function Se(e, t) {
	let n = {};
	for (let r of e) n[r.key] = t ? xe(t.payload, r) : r.kind === "number" ? 0 : "";
	return n;
}
function Ce(e) {
	return Se(e, null);
}
function we(e) {
	return typeof e == "string" || typeof e == "number" || typeof e == "boolean" ? String(e) : null;
}
function Te(e, t) {
	let n = [];
	for (let r of t) {
		let t = e[r.key];
		if (t == null || t === "") continue;
		let i = we(t);
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
var Ee = ["for"], De = [
	"id",
	"placeholder",
	"aria-label"
], Oe = [
	"data-dragging",
	"onDragstart",
	"onDrop"
], ke = ["aria-label"], Ae = ["aria-label", "onClick"], X = /* @__PURE__ */ O({
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
	setup(t, { emit: n }) {
		let r = t, a = n, s = e(""), f = e(null), p = e(null), g = S(() => {
			let e = s.value.trim().toLowerCase();
			return e === "" ? r.records : r.records.filter((t) => t.display_name.toLowerCase().includes(e));
		}), _ = S(() => r.loading ? "loading" : r.records.length === 0 ? "empty" : "ready");
		function v(e) {
			return Te(e.payload, r.summaryFields);
		}
		function x(e) {
			f.value = e;
		}
		function C() {
			f.value && a("delete", f.value.id), f.value = null;
		}
		function T(e, t) {
			let n = r.records.findIndex((t) => t.id === e), i = n + t;
			if (n === -1 || i < 0 || i >= r.records.length) return;
			let o = [...r.records], [s] = o.splice(n, 1);
			s !== void 0 && (o.splice(i, 0, s), a("reorder", o.map((e) => e.id)));
		}
		function D() {
			if (r.records.length === 0) return;
			let e = Math.floor(Math.random() * r.records.length), t = r.records[e];
			t && a("random-select", t);
		}
		function O(e, t) {
			p.value = e, t.dataTransfer?.setData("text/plain", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
		}
		function A(e) {
			e.preventDefault();
		}
		function P(e, t) {
			t.preventDefault();
			let n = p.value;
			if (p.value = null, !n || n === e) return;
			let i = r.records.findIndex((e) => e.id === n), o = r.records.findIndex((t) => t.id === e);
			if (i === -1 || o === -1) return;
			let s = [...r.records], [c] = s.splice(i, 1);
			c !== void 0 && (s.splice(o, 0, c), a("reorder", s.map((e) => e.id)));
		}
		return (e, n) => (o(), u("div", { class: y(w(Y).categoryList) }, [
			b("div", { class: y(w(Y).categoryToolbar) }, [
				b("label", {
					class: "tc-visually-hidden",
					for: `${t.searchLabel}-search`
				}, m(t.searchLabel), 9, Ee),
				l(b("input", {
					id: `${t.searchLabel}-search`,
					"onUpdate:modelValue": n[0] ||= (e) => s.value = e,
					type: "text",
					class: y(w(Y).searchInput),
					placeholder: t.searchPlaceholder,
					"aria-label": t.searchLabel
				}, null, 10, De), [[d, s.value]]),
				k(F, {
					label: t.randomLabel,
					icon: w(V),
					variant: "secondary",
					onClick: D
				}, null, 8, ["label", "icon"]),
				k(F, {
					label: t.addLabel,
					icon: w(z),
					variant: "primary",
					onClick: n[1] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])
			], 2),
			t.records.length > 1 ? (o(), u("p", {
				key: 0,
				class: y(w(Y).reorderHint)
			}, m(t.reorderHint), 3)) : h("", !0),
			k(I, {
				status: _.value,
				"empty-title": t.emptyTitle,
				"min-height": "120px"
			}, {
				action: c(() => [b("p", { class: y(w(Y).emptyDescription) }, m(t.emptyDescription), 3), k(F, {
					label: t.addLabel,
					icon: w(z),
					variant: "primary",
					onClick: n[2] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])]),
				default: c(() => [b("ul", { class: y(w(Y).cardGrid) }, [(o(!0), u(E, null, i(g.value, (e) => (o(), u("li", {
					key: e.id,
					class: y(w(Y).assetCard),
					draggable: "true",
					"data-dragging": p.value === e.id ? "" : null,
					onDragstart: (t) => O(e.id, t),
					onDragover: A,
					onDrop: (t) => P(e.id, t)
				}, [
					b("span", {
						class: y(w(Y).dragHandle),
						"aria-label": t.dragHandleLabel,
						"aria-hidden": "true"
					}, [k(j, {
						icon: w(fe),
						size: 16
					}, null, 8, ["icon"])], 10, ke),
					b("button", {
						type: "button",
						class: y(w(Y).assetCardMain),
						"aria-label": `${t.editLabel}: ${e.display_name}`,
						onClick: (t) => a("edit", e)
					}, [b("span", { class: y(w(Y).assetCardName) }, m(e.display_name), 3), v(e).length > 0 ? (o(), u("span", {
						key: 0,
						class: y(w(Y).assetCardSummary)
					}, [(o(!0), u(E, null, i(v(e), (e) => (o(), u("span", {
						key: e.label,
						class: y([w(Y).assetCardSummaryPart, e.numeric && "tc-tabular-nums"])
					}, m(e.label) + ": " + m(e.value), 3))), 128))], 2)) : h("", !0)], 10, Ae),
					b("div", { class: y(w(Y).assetCardActions) }, [
						k(le, {
							icon: w(N),
							size: "sm",
							label: t.moveUpLabel,
							onClick: (t) => T(e.id, -1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						k(le, {
							icon: w(M),
							size: "sm",
							label: t.moveDownLabel,
							onClick: (t) => T(e.id, 1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						k(le, {
							icon: w(te),
							size: "sm",
							destructive: "",
							label: t.deleteLabel,
							onClick: (t) => x(e)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						])
					], 2)
				], 42, Oe))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-title"]),
			k(oe, {
				open: f.value !== null,
				title: f.value ? t.deleteConfirmTitle(f.value.display_name) : "",
				description: t.deleteConfirmDescription,
				"confirm-label": t.confirmLabel,
				"cancel-label": t.cancelLabel,
				"onUpdate:open": n[3] ||= (e) => {
					e || (f.value = null);
				},
				onConfirm: C
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			])
		], 2));
	}
}), je = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], Me = [
	"id",
	"value",
	"aria-describedby",
	"onInput"
], Ne = [
	"id",
	"value",
	"aria-describedby",
	"onInput"
], Z = /* @__PURE__ */ O({
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
		let n = e, s = t;
		function l(e, t) {
			s("update:values", {
				...n.values,
				[e]: t
			});
		}
		function d(e, t) {
			s("update:values", {
				...n.values,
				[e]: t
			});
		}
		function f(e) {
			e.preventDefault(), s("save");
		}
		let p = S(() => n.pending);
		return (t, n) => (o(), u("form", {
			class: y(w(Y).form),
			onSubmit: f
		}, [
			k(B, {
				label: e.nameLabel,
				error: e.nameError,
				required: ""
			}, {
				default: c(({ fieldId: t, describedBy: r, invalid: i }) => [b("input", {
					id: t,
					class: y(w(Y).textInput),
					type: "text",
					placeholder: e.namePlaceholder,
					value: e.name,
					"aria-describedby": r,
					"aria-invalid": i,
					onInput: n[0] ||= (e) => s("update:name", e.target.value)
				}, null, 42, je)]),
				_: 1
			}, 8, ["label", "error"]),
			(o(!0), u(E, null, i(e.fields, (t) => (o(), g(B, r({
				key: t.key,
				label: t.label
			}, { ref_for: !0 }, w(se)({ hint: t.hint })), {
				default: c(({ fieldId: n, describedBy: i }) => [t.kind === "text" ? (o(), u("input", {
					key: 0,
					id: n,
					class: y(w(Y).textInput),
					type: "text",
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => l(t.key, e.target.value)
				}, null, 42, Me)) : t.kind === "textarea" ? (o(), u("textarea", {
					key: 1,
					id: n,
					class: y(w(Y).textArea),
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => l(t.key, e.target.value)
				}, null, 42, Ne)) : (o(), g(R, r({
					key: 2,
					id: n,
					"model-value": typeof e.values[t.key] == "number" ? e.values[t.key] : 0,
					label: t.label,
					step: t.step ?? 1,
					"decrement-label": e.decrementLabel,
					"increment-label": e.incrementLabel
				}, { ref_for: !0 }, w(se)({
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
			b("div", { class: y(w(Y).formActions) }, [k(F, {
				label: e.cancelLabel,
				variant: "secondary",
				type: "button",
				onClick: n[1] ||= (e) => s("cancel")
			}, null, 8, ["label"]), k(F, {
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
	let a = e(!1), o = e(null), c = e(""), l = e(null), u = s({}), d = e(!1);
	function f() {
		o.value = null, c.value = "", l.value = null, $(u, Ce(r())), a.value = !0;
	}
	function p(e) {
		o.value = e, c.value = e.display_name, l.value = null, $(u, Se(r(), e)), a.value = !0;
	}
	function m() {
		a.value = !1;
	}
	async function h() {
		let e = c.value.trim();
		if (e === "") {
			l.value = i();
			return;
		}
		d.value = !0;
		try {
			let r = o.value?.id ?? crypto.randomUUID();
			await n.save_asset(t, {
				id: r,
				category: t,
				record_key: r,
				display_name: e,
				payload: { ...u }
			}), a.value = !1;
		} finally {
			d.value = !1;
		}
	}
	function g(e) {
		n.remove_asset(t, e);
	}
	function _(e) {
		n.reorder_assets(t, e);
	}
	function v(e) {
		p(e);
	}
	return {
		dialog_open: a,
		editing_record: o,
		name: c,
		name_error: l,
		values: u,
		saving: d,
		open_create: f,
		open_edit: p,
		close_dialog: m,
		save: h,
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
var Pe = /* @__PURE__ */ O({
	__name: "CharacterPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), r = S(() => [
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
		return (t, s) => (o(), u("div", null, [k(X, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": w(n)("common.actions.search"),
			"search-placeholder": w(n)("common.actions.search"),
			"empty-title": w(n)("assets.characters.empty_title"),
			"empty-description": w(n)("assets.characters.empty_description"),
			"add-label": w(n)("assets.characters.add_action"),
			"random-label": w(n)("assets.random_selection_action"),
			"reorder-hint": w(n)("assets.reorder_hint"),
			"edit-label": w(n)("common.actions.edit"),
			"delete-label": w(n)("common.actions.delete"),
			"delete-confirm-title": a,
			"delete-confirm-description": w(n)("assets.delete_confirm_description"),
			"confirm-label": w(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": w(n)("assets.move_up_action"),
			"move-down-label": w(n)("assets.move_down_action"),
			"drag-handle-label": w(n)("assets.drag_handle_label"),
			onAdd: w(i).open_create,
			onEdit: w(i).open_edit,
			onDelete: w(i).remove,
			onReorder: w(i).reorder,
			onRandomSelect: w(i).random_select
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
		]), k(L, {
			open: w(i).dialog_open.value,
			title: w(i).editing_record.value ? w(n)("common.actions.edit") : w(n)("assets.characters.add_action"),
			description: w(n)("assets.form_dialog_description"),
			"close-label": w(n)("common.actions.close"),
			"onUpdate:open": s[2] ||= (e) => {
				e || w(i).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": w(n)("common.labels.name"),
				"name-placeholder": w(n)("common.labels.name"),
				name: w(i).name.value,
				"name-error": w(i).name_error.value,
				fields: r.value,
				values: w(i).values,
				"save-label": w(n)("common.actions.save"),
				"cancel-label": w(n)("common.actions.cancel"),
				"decrement-label": w(n)("common.actions.decrease"),
				"increment-label": w(n)("common.actions.increase"),
				pending: w(i).saving.value,
				"onUpdate:name": s[0] ||= (e) => {
					w(i).name.value = e;
				},
				"onUpdate:values": s[1] ||= (e) => w($)(w(i).values, e),
				onSave: w(i).save,
				onCancel: w(i).close_dialog
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
});
//#endregion
//#region src/ui/views/assets/persona_labels.ts
function Fe(e, t) {
	switch (t) {
		case "assistant": return e("assets.personas.roles.assistant");
		case "user": return e("assets.personas.roles.user");
	}
}
function Ie(e, t) {
	switch (t) {
		case "manual": return e("assets.knowledge.source_types.manual");
		case "imported": return e("assets.knowledge.source_types.imported");
		case "character": return e("assets.knowledge.source_types.character");
	}
}
//#endregion
//#region src/ui/views/assets/KnowledgePanel.vue?vue&type=script&setup=true&lang.ts
var Le = ["id", "aria-describedby"], Re = ["id", "aria-describedby"], ze = ["id", "aria-describedby"], Be = /* @__PURE__ */ O({
	__name: "KnowledgePanel",
	props: {
		entries: {},
		selectedIds: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(t) {
		let n = t, { t: r } = x(), a = e(!1), s = e(null), f = e(!1), p = e(null), _ = e(null), v = e(null), C = e(null), T = e(!1), D = e(!1), O = e(!1), A = S(() => [
			"manual",
			"imported",
			"character"
		].map((e) => ({
			value: e,
			label: Ie(r, e)
		}))), j = S({
			get: () => s.value?.source_type ?? "manual",
			set: (e) => {
				s.value && (s.value.source_type = e);
			}
		}), M = S(() => new Set(n.selectedIds)), N = S(() => n.entries.length > 0 && n.selectedIds.length === n.entries.length);
		function P(e) {
			let t = e.split(/[,，]/u).map((e) => e.trim()).filter((e) => e.length > 0);
			return [...new Set(t)];
		}
		function ee(e, t) {
			let r = new Set(n.selectedIds);
			t ? r.add(e) : r.delete(e), n.controller.set_knowledge_selection([...r]);
		}
		function te(e) {
			n.controller.set_knowledge_selection(e ? n.entries.map((e) => e.id) : []);
		}
		function z() {
			s.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				title: "",
				source_type: "manual",
				content: "",
				keywords_text: "",
				priority: 10,
				enabled: !0
			}, U(), a.value = !0;
		}
		function V(e) {
			s.value = {
				id: e.id,
				is_new: !1,
				title: e.title,
				source_type: e.source_type,
				content: e.content,
				keywords_text: e.keywords.join(", "),
				priority: e.priority,
				enabled: e.enabled
			}, U(), a.value = !0;
		}
		function U() {
			p.value = null, _.value = null, v.value = null;
		}
		function W() {
			a.value = !1, s.value = null;
		}
		async function G() {
			let e = s.value;
			if (!e || f.value) return;
			U();
			let t = e.title.trim(), i = e.content.trim();
			if (t.length === 0 && (p.value = r("errors.validation_required")), i.length === 0 && (_.value = r("errors.validation_required")), !(p.value || _.value)) {
				f.value = !0;
				try {
					await n.controller.save_knowledge_entry({
						id: e.id,
						title: t,
						source_type: e.source_type,
						content: i,
						keywords: P(e.keywords_text),
						priority: e.priority,
						enabled: e.enabled
					}), W();
				} catch {
					v.value = r("errors.unexpected");
				} finally {
					f.value = !1;
				}
			}
		}
		async function ne() {
			let e = C.value;
			if (!(!e || T.value)) {
				T.value = !0;
				try {
					await n.controller.remove_knowledge_entry(e.id), C.value = null;
				} finally {
					T.value = !1;
				}
			}
		}
		async function re() {
			if (!O.value) {
				O.value = !0;
				try {
					await n.controller.bulk_remove_knowledge_entries(n.selectedIds), D.value = !1;
				} finally {
					O.value = !1;
				}
			}
		}
		return (e, n) => (o(), u("div", {
			class: y(w(Y).categoryList),
			"data-testid": "knowledge-panel"
		}, [
			b("div", { class: y(w(Y).categoryToolbar) }, [
				k(F, {
					label: w(r)("assets.knowledge.add_action"),
					onClick: z
				}, null, 8, ["label"]),
				t.entries.length > 0 ? (o(), g(K, {
					key: 0,
					"model-value": N.value,
					label: w(r)("assets.knowledge.select_all_label"),
					"onUpdate:modelValue": te
				}, null, 8, ["model-value", "label"])) : h("", !0),
				t.selectedIds.length > 0 ? (o(), g(F, {
					key: 1,
					label: w(r)("assets.knowledge.bulk_delete_action", { count: t.selectedIds.length }),
					variant: "destructive",
					"data-testid": "knowledge-bulk-delete",
					onClick: n[0] ||= (e) => D.value = !0
				}, null, 8, ["label"])) : h("", !0)
			], 2),
			k(I, {
				status: t.loading ? "loading" : t.entries.length === 0 ? "empty" : "ready",
				"empty-message": w(r)("assets.knowledge.empty_description")
			}, {
				action: c(() => [k(F, {
					label: w(r)("assets.knowledge.add_action"),
					onClick: z
				}, null, 8, ["label"])]),
				default: c(() => [b("ul", { class: y(w(Y).cardGrid) }, [(o(!0), u(E, null, i(t.entries, (e) => (o(), u("li", {
					key: e.id,
					class: y(w(Y).assetCard),
					"data-testid": "knowledge-card"
				}, [b("div", { class: y(w(Y).assetCardMain) }, [b("span", { class: y(w(Y).assetCardName) }, m(e.title), 3), b("span", { class: y(w(Y).assetCardSummary) }, [
					b("span", { class: y(w(Y).assetCardSummaryPart) }, m(w(Ie)(w(r), e.source_type)), 3),
					b("span", { class: y(w(Y).assetCardSummaryPart) }, m(w(r)("assets.knowledge.priority_summary", { priority: e.priority })), 3),
					e.keywords.length > 0 ? (o(), u("span", {
						key: 0,
						class: y(w(Y).assetCardSummaryPart)
					}, m(e.keywords.join(", ")), 3)) : h("", !0)
				], 2)], 2), b("div", { class: y(w(Y).assetCardActions) }, [
					k(K, {
						"model-value": M.value.has(e.id),
						label: w(r)("assets.knowledge.select_label", { title: e.title }),
						"onUpdate:modelValue": (t) => ee(e.id, t)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					k(K, {
						"model-value": e.enabled,
						label: w(r)("assets.knowledge.enabled_label"),
						"onUpdate:modelValue": (n) => t.controller.set_knowledge_entry_enabled(e.id, n)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					k(F, {
						label: w(r)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => V(e)
					}, null, 8, ["label", "onClick"]),
					k(F, {
						label: w(r)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => C.value = e
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			k(L, {
				open: a.value,
				title: s.value?.is_new ? w(r)("assets.knowledge.add_action") : w(r)("common.actions.edit"),
				description: w(r)("assets.form_dialog_description"),
				"close-label": w(r)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && W()
			}, {
				default: c(() => [s.value ? (o(), u("div", {
					key: 0,
					class: y(w(Y).form)
				}, [
					k(B, {
						label: w(r)("assets.knowledge.title_label"),
						error: p.value,
						required: ""
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [l(b("input", {
							id: e,
							"onUpdate:modelValue": n[1] ||= (e) => s.value.title = e,
							type: "text",
							"aria-describedby": t,
							class: y(w(Y).textInput)
						}, null, 10, Le), [[d, s.value.title]])]),
						_: 1
					}, 8, ["label", "error"]),
					k(B, {
						label: w(r)("assets.knowledge.source_type_label"),
						required: ""
					}, {
						default: c(({ fieldId: e }) => [k(H, {
							id: e,
							modelValue: j.value,
							"onUpdate:modelValue": n[2] ||= (e) => j.value = e,
							options: A.value,
							placeholder: w(r)("assets.knowledge.source_type_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					k(B, {
						label: w(r)("assets.knowledge.content_label"),
						hint: w(r)("assets.knowledge.content_hint"),
						error: _.value,
						required: ""
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [l(b("textarea", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => s.value.content = e,
							rows: "6",
							"aria-describedby": t,
							class: y(w(Y).textArea)
						}, null, 10, Re), [[d, s.value.content]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					k(B, {
						label: w(r)("assets.knowledge.keywords_label"),
						hint: w(r)("assets.knowledge.keywords_hint")
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [l(b("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => s.value.keywords_text = e,
							type: "text",
							"aria-describedby": t,
							class: y(w(Y).textInput)
						}, null, 10, ze), [[d, s.value.keywords_text]])]),
						_: 1
					}, 8, ["label", "hint"]),
					k(B, {
						label: w(r)("assets.knowledge.priority_label"),
						hint: w(r)("assets.knowledge.priority_hint")
					}, {
						default: c(() => [k(R, {
							modelValue: s.value.priority,
							"onUpdate:modelValue": n[5] ||= (e) => s.value.priority = e,
							label: w(r)("assets.knowledge.priority_label"),
							"increment-label": w(r)("common.actions.increase"),
							"decrement-label": w(r)("common.actions.decrease"),
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
					k(K, {
						modelValue: s.value.enabled,
						"onUpdate:modelValue": n[6] ||= (e) => s.value.enabled = e,
						label: w(r)("assets.knowledge.enabled_label")
					}, null, 8, ["modelValue", "label"]),
					v.value ? (o(), u("p", {
						key: 0,
						class: y(w(Y).emptyDescription),
						"data-tone": "error"
					}, m(v.value), 3)) : h("", !0),
					b("div", { class: y(w(Y).formActions) }, [k(F, {
						label: w(r)("common.actions.save"),
						pending: f.value,
						onClick: G
					}, null, 8, ["label", "pending"]), k(F, {
						label: w(r)("common.actions.cancel"),
						variant: "secondary",
						onClick: W
					}, null, 8, ["label"])], 2)
				], 2)) : h("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			k(oe, {
				open: C.value !== null,
				title: w(r)("assets.delete_confirm_title", { name: C.value?.title ?? "" }),
				description: w(r)("assets.knowledge.delete_confirm_description"),
				"confirm-label": w(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": w(r)("confirmations.destructive.default_cancel_action"),
				pending: T.value,
				"onUpdate:open": n[8] ||= (e) => !e && (C.value = null),
				onConfirm: ne
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			k(oe, {
				open: D.value,
				title: w(r)("assets.knowledge.bulk_delete_confirm_title", { count: t.selectedIds.length }),
				description: w(r)("assets.knowledge.delete_confirm_description"),
				"confirm-label": w(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": w(r)("confirmations.destructive.default_cancel_action"),
				pending: O.value,
				"onUpdate:open": n[9] ||= (e) => D.value = e,
				onConfirm: re
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
}), Ve = /* @__PURE__ */ O({
	__name: "LoraPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), r = S(() => [{
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
		}], a = Q("lora", t.controller, () => r.value, () => n("errors.validation_required")), s = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, l) => (o(), u("div", null, [k(X, {
			records: e.records,
			"summary-fields": i,
			loading: e.loading,
			"search-label": w(n)("common.actions.search"),
			"search-placeholder": w(n)("common.actions.search"),
			"empty-title": w(n)("assets.lora.empty_title"),
			"empty-description": w(n)("assets.lora.empty_description"),
			"add-label": w(n)("assets.lora.add_action"),
			"random-label": w(n)("assets.random_selection_action"),
			"reorder-hint": w(n)("assets.reorder_hint"),
			"edit-label": w(n)("common.actions.edit"),
			"delete-label": w(n)("common.actions.delete"),
			"delete-confirm-title": s,
			"delete-confirm-description": w(n)("assets.delete_confirm_description"),
			"confirm-label": w(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": w(n)("assets.move_up_action"),
			"move-down-label": w(n)("assets.move_down_action"),
			"drag-handle-label": w(n)("assets.drag_handle_label"),
			onAdd: w(a).open_create,
			onEdit: w(a).open_edit,
			onDelete: w(a).remove,
			onReorder: w(a).reorder,
			onRandomSelect: w(a).random_select
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
		]), k(L, {
			open: w(a).dialog_open.value,
			title: w(a).editing_record.value ? w(n)("common.actions.edit") : w(n)("assets.lora.add_action"),
			description: w(n)("assets.form_dialog_description"),
			"close-label": w(n)("common.actions.close"),
			"onUpdate:open": l[2] ||= (e) => {
				e || w(a).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": w(n)("common.labels.name"),
				"name-placeholder": w(n)("common.labels.name"),
				name: w(a).name.value,
				"name-error": w(a).name_error.value,
				fields: r.value,
				values: w(a).values,
				"save-label": w(n)("common.actions.save"),
				"cancel-label": w(n)("common.actions.cancel"),
				"decrement-label": w(n)("common.actions.decrease"),
				"increment-label": w(n)("common.actions.increase"),
				pending: w(a).saving.value,
				"onUpdate:name": l[0] ||= (e) => {
					w(a).name.value = e;
				},
				"onUpdate:values": l[1] ||= (e) => w($)(w(a).values, e),
				onSave: w(a).save,
				onCancel: w(a).close_dialog
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
}), He = ["id", "aria-describedby"], Ue = ["id", "aria-describedby"], We = ["id", "aria-describedby"], Ge = /* @__PURE__ */ O({
	__name: "PersonaPanel",
	props: {
		personas: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(t) {
		let n = t, { t: r } = x(), a = e(!1), s = e(null), f = e(!1), p = e(null), g = e(null), _ = e(null), v = e(!1), C = S(() => ["assistant", "user"].map((e) => ({
			value: e,
			label: Fe(r, e)
		}))), T = S({
			get: () => s.value?.role ?? "assistant",
			set: (e) => {
				s.value && (s.value.role = e);
			}
		});
		function D() {
			s.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				display_name: "",
				role: "assistant",
				description: "",
				greeting: "",
				avatar_image_id: null,
				is_active: n.personas.length === 0
			}, p.value = null, g.value = null, a.value = !0;
		}
		function O(e) {
			s.value = {
				id: e.id,
				is_new: !1,
				display_name: e.display_name,
				role: e.role,
				description: e.description,
				greeting: e.greeting,
				avatar_image_id: e.avatar_image_id,
				is_active: e.is_active
			}, p.value = null, g.value = null, a.value = !0;
		}
		function A() {
			a.value = !1, s.value = null;
		}
		async function j() {
			let e = s.value;
			if (!e || f.value) return;
			let t = e.display_name.trim();
			if (t.length === 0) {
				p.value = r("errors.validation_required");
				return;
			}
			p.value = null, g.value = null, f.value = !0;
			try {
				await n.controller.save_persona({
					id: e.id,
					display_name: t,
					role: e.role,
					description: e.description.trim(),
					greeting: e.greeting.trim(),
					avatar_image_id: e.avatar_image_id,
					is_active: e.is_active
				}), A();
			} catch {
				g.value = r("errors.unexpected");
			} finally {
				f.value = !1;
			}
		}
		async function M(e, t) {
			await n.controller.save_persona({
				id: e.id,
				display_name: e.display_name,
				role: e.role,
				description: e.description,
				greeting: e.greeting,
				avatar_image_id: e.avatar_image_id,
				is_active: t
			});
		}
		async function N() {
			let e = _.value;
			if (!(!e || v.value)) {
				v.value = !0;
				try {
					await n.controller.remove_persona(e.id), _.value = null;
				} finally {
					v.value = !1;
				}
			}
		}
		return (e, n) => (o(), u("div", {
			class: y(w(Y).categoryList),
			"data-testid": "persona-panel"
		}, [
			b("div", { class: y(w(Y).categoryToolbar) }, [k(F, {
				label: w(r)("assets.personas.add_action"),
				onClick: D
			}, null, 8, ["label"])], 2),
			k(I, {
				status: t.loading ? "loading" : t.personas.length === 0 ? "empty" : "ready",
				"empty-message": w(r)("assets.personas.empty_description")
			}, {
				action: c(() => [k(F, {
					label: w(r)("assets.personas.add_action"),
					onClick: D
				}, null, 8, ["label"])]),
				default: c(() => [b("ul", { class: y(w(Y).cardGrid) }, [(o(!0), u(E, null, i(t.personas, (e) => (o(), u("li", {
					key: e.id,
					class: y(w(Y).assetCard),
					"data-testid": "persona-card"
				}, [b("div", { class: y(w(Y).assetCardMain) }, [b("span", { class: y(w(Y).assetCardName) }, m(e.display_name), 3), b("span", { class: y(w(Y).assetCardSummary) }, [b("span", { class: y(w(Y).assetCardSummaryPart) }, m(w(Fe)(w(r), e.role)), 3), e.is_active ? (o(), u("span", {
					key: 0,
					class: y(w(Y).assetCardSummaryPart)
				}, m(w(r)("assets.personas.active_badge")), 3)) : h("", !0)], 2)], 2), b("div", { class: y(w(Y).assetCardActions) }, [
					k(K, {
						"model-value": e.is_active,
						label: w(r)("assets.personas.active_toggle_label"),
						"onUpdate:modelValue": (t) => M(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					k(F, {
						label: w(r)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => O(e)
					}, null, 8, ["label", "onClick"]),
					k(F, {
						label: w(r)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => _.value = e
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			k(L, {
				open: a.value,
				title: s.value?.is_new ? w(r)("assets.personas.add_action") : w(r)("common.actions.edit"),
				description: w(r)("assets.form_dialog_description"),
				"close-label": w(r)("common.actions.close"),
				"onUpdate:open": n[5] ||= (e) => !e && A()
			}, {
				default: c(() => [s.value ? (o(), u("div", {
					key: 0,
					class: y(w(Y).form)
				}, [
					k(B, {
						label: w(r)("common.labels.name"),
						error: p.value,
						required: ""
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [l(b("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => s.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: y(w(Y).textInput)
						}, null, 10, He), [[d, s.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					k(B, {
						label: w(r)("assets.personas.role_label"),
						required: ""
					}, {
						default: c(({ fieldId: e }) => [k(H, {
							id: e,
							modelValue: T.value,
							"onUpdate:modelValue": n[1] ||= (e) => T.value = e,
							options: C.value,
							placeholder: w(r)("assets.personas.role_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					k(B, {
						label: w(r)("assets.personas.description_label"),
						hint: w(r)("assets.personas.description_hint")
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [l(b("textarea", {
							id: e,
							"onUpdate:modelValue": n[2] ||= (e) => s.value.description = e,
							rows: "4",
							"aria-describedby": t,
							class: y(w(Y).textArea)
						}, null, 10, Ue), [[d, s.value.description]])]),
						_: 1
					}, 8, ["label", "hint"]),
					k(B, {
						label: w(r)("assets.personas.greeting_label"),
						hint: w(r)("assets.personas.greeting_hint")
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [l(b("textarea", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => s.value.greeting = e,
							rows: "3",
							"aria-describedby": t,
							class: y(w(Y).textArea)
						}, null, 10, We), [[d, s.value.greeting]])]),
						_: 1
					}, 8, ["label", "hint"]),
					k(K, {
						modelValue: s.value.is_active,
						"onUpdate:modelValue": n[4] ||= (e) => s.value.is_active = e,
						label: w(r)("assets.personas.active_toggle_label")
					}, null, 8, ["modelValue", "label"]),
					g.value ? (o(), u("p", {
						key: 0,
						class: y(w(Y).emptyDescription),
						"data-tone": "error"
					}, m(g.value), 3)) : h("", !0),
					b("div", { class: y(w(Y).formActions) }, [k(F, {
						label: w(r)("common.actions.save"),
						pending: f.value,
						onClick: j
					}, null, 8, ["label", "pending"]), k(F, {
						label: w(r)("common.actions.cancel"),
						variant: "secondary",
						onClick: A
					}, null, 8, ["label"])], 2)
				], 2)) : h("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			k(oe, {
				open: _.value !== null,
				title: w(r)("assets.delete_confirm_title", { name: _.value?.display_name ?? "" }),
				description: w(r)("assets.personas.delete_confirm_description"),
				"confirm-label": w(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": w(r)("confirmations.destructive.default_cancel_action"),
				pending: v.value,
				"onUpdate:open": n[6] ||= (e) => !e && (_.value = null),
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
}), Ke = /* @__PURE__ */ O({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), i = S(() => [{
			key: "description",
			label: n("assets.outfits.description_label"),
			kind: "textarea"
		}]), a = [], s = Q("outfit", t.controller, () => i.value, () => n("errors.validation_required")), l = S(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), d = S(() => {
			let e = s.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function f(e) {
			s.values.character_id = e;
		}
		let p = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, m) => (o(), u("div", null, [k(X, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": w(n)("common.actions.search"),
			"search-placeholder": w(n)("common.actions.search"),
			"empty-title": w(n)("assets.outfits.empty_title"),
			"empty-description": w(n)("assets.outfits.empty_description"),
			"add-label": w(n)("assets.outfits.add_action"),
			"random-label": w(n)("assets.random_selection_action"),
			"reorder-hint": w(n)("assets.reorder_hint"),
			"edit-label": w(n)("common.actions.edit"),
			"delete-label": w(n)("common.actions.delete"),
			"delete-confirm-title": p,
			"delete-confirm-description": w(n)("assets.delete_confirm_description"),
			"confirm-label": w(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": w(n)("assets.move_up_action"),
			"move-down-label": w(n)("assets.move_down_action"),
			"drag-handle-label": w(n)("assets.drag_handle_label"),
			onAdd: w(s).open_create,
			onEdit: w(s).open_edit,
			onDelete: w(s).remove,
			onReorder: w(s).reorder,
			onRandomSelect: w(s).random_select
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
		]), k(L, {
			open: w(s).dialog_open.value,
			title: w(s).editing_record.value ? w(n)("common.actions.edit") : w(n)("assets.outfits.add_action"),
			description: w(n)("assets.form_dialog_description"),
			"close-label": w(n)("common.actions.close"),
			"onUpdate:open": m[2] ||= (e) => {
				e || w(s).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": w(n)("common.labels.name"),
				"name-placeholder": w(n)("common.labels.name"),
				name: w(s).name.value,
				"name-error": w(s).name_error.value,
				fields: i.value,
				values: w(s).values,
				"save-label": w(n)("common.actions.save"),
				"cancel-label": w(n)("common.actions.cancel"),
				"decrement-label": w(n)("common.actions.decrease"),
				"increment-label": w(n)("common.actions.increase"),
				pending: w(s).saving.value,
				"onUpdate:name": m[0] ||= (e) => {
					w(s).name.value = e;
				},
				"onUpdate:values": m[1] ||= (e) => w($)(w(s).values, e),
				onSave: w(s).save,
				onCancel: w(s).close_dialog
			}, {
				"extra-fields": c(() => [k(B, { label: w(n)("assets.outfits.character_label") }, {
					default: c(({ fieldId: e, describedBy: t }) => [k(H, r({
						id: e,
						"model-value": d.value,
						options: l.value,
						placeholder: w(n)("assets.outfits.character_placeholder")
					}, w(se)({ describedBy: t }), { "onUpdate:modelValue": f }), null, 16, [
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
}), qe = /* @__PURE__ */ O({
	__name: "ReferencePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), r = S(() => [{
			key: "source_url",
			label: n("assets.reference.source_url_label"),
			kind: "text"
		}, {
			key: "notes",
			label: n("assets.reference.notes_label"),
			kind: "textarea"
		}]), i = Q("reference", t.controller, () => r.value, () => n("errors.validation_required")), a = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, s) => (o(), u("div", null, [k(X, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": w(n)("common.actions.search"),
			"search-placeholder": w(n)("common.actions.search"),
			"empty-title": w(n)("assets.reference.empty_title"),
			"empty-description": w(n)("assets.reference.empty_description"),
			"add-label": w(n)("assets.reference.add_action"),
			"random-label": w(n)("assets.random_selection_action"),
			"reorder-hint": w(n)("assets.reorder_hint"),
			"edit-label": w(n)("common.actions.edit"),
			"delete-label": w(n)("common.actions.delete"),
			"delete-confirm-title": a,
			"delete-confirm-description": w(n)("assets.delete_confirm_description"),
			"confirm-label": w(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": w(n)("assets.move_up_action"),
			"move-down-label": w(n)("assets.move_down_action"),
			"drag-handle-label": w(n)("assets.drag_handle_label"),
			onAdd: w(i).open_create,
			onEdit: w(i).open_edit,
			onDelete: w(i).remove,
			onReorder: w(i).reorder,
			onRandomSelect: w(i).random_select
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
		]), k(L, {
			open: w(i).dialog_open.value,
			title: w(i).editing_record.value ? w(n)("common.actions.edit") : w(n)("assets.reference.add_action"),
			description: w(n)("assets.form_dialog_description"),
			"close-label": w(n)("common.actions.close"),
			"onUpdate:open": s[2] ||= (e) => {
				e || w(i).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": w(n)("common.labels.name"),
				"name-placeholder": w(n)("common.labels.name"),
				name: w(i).name.value,
				"name-error": w(i).name_error.value,
				fields: r.value,
				values: w(i).values,
				"save-label": w(n)("common.actions.save"),
				"cancel-label": w(n)("common.actions.cancel"),
				"decrement-label": w(n)("common.actions.decrease"),
				"increment-label": w(n)("common.actions.increase"),
				pending: w(i).saving.value,
				"onUpdate:name": s[0] ||= (e) => {
					w(i).name.value = e;
				},
				"onUpdate:values": s[1] ||= (e) => w($)(w(i).values, e),
				onSave: w(i).save,
				onCancel: w(i).close_dialog
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
}), Je = "novelai", Ye = "google", Xe = /* @__PURE__ */ O({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = x(), r = S(() => [{
			value: Je,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: Ye,
			label: n("assets.vibe.provider_google")
		}]), i = S(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return s.values.provider !== Ye && e.push({
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
		}], s = Q("vibe", t.controller, () => i.value, () => n("errors.validation_required")), l = S(() => typeof s.values.provider == "string" && s.values.provider !== "" ? s.values.provider : Je);
		function d(e) {
			s.values.provider = e;
		}
		let f = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, p) => (o(), u("div", null, [k(X, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": w(n)("common.actions.search"),
			"search-placeholder": w(n)("common.actions.search"),
			"empty-title": w(n)("assets.vibe.empty_title"),
			"empty-description": w(n)("assets.vibe.empty_description"),
			"add-label": w(n)("assets.vibe.add_action"),
			"random-label": w(n)("assets.random_selection_action"),
			"reorder-hint": w(n)("assets.reorder_hint"),
			"edit-label": w(n)("common.actions.edit"),
			"delete-label": w(n)("common.actions.delete"),
			"delete-confirm-title": f,
			"delete-confirm-description": w(n)("assets.delete_confirm_description"),
			"confirm-label": w(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": w(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": w(n)("assets.move_up_action"),
			"move-down-label": w(n)("assets.move_down_action"),
			"drag-handle-label": w(n)("assets.drag_handle_label"),
			onAdd: w(s).open_create,
			onEdit: w(s).open_edit,
			onDelete: w(s).remove,
			onReorder: w(s).reorder,
			onRandomSelect: w(s).random_select
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
		]), k(L, {
			open: w(s).dialog_open.value,
			title: w(s).editing_record.value ? w(n)("common.actions.edit") : w(n)("assets.vibe.add_action"),
			description: w(n)("assets.form_dialog_description"),
			"close-label": w(n)("common.actions.close"),
			"onUpdate:open": p[2] ||= (e) => {
				e || w(s).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": w(n)("common.labels.name"),
				"name-placeholder": w(n)("common.labels.name"),
				name: w(s).name.value,
				"name-error": w(s).name_error.value,
				fields: i.value,
				values: w(s).values,
				"save-label": w(n)("common.actions.save"),
				"cancel-label": w(n)("common.actions.cancel"),
				"decrement-label": w(n)("common.actions.decrease"),
				"increment-label": w(n)("common.actions.increase"),
				pending: w(s).saving.value,
				"onUpdate:name": p[0] ||= (e) => {
					w(s).name.value = e;
				},
				"onUpdate:values": p[1] ||= (e) => w($)(w(s).values, e),
				onSave: w(s).save,
				onCancel: w(s).close_dialog
			}, {
				"extra-fields": c(() => [k(B, { label: w(n)("assets.vibe.provider_label") }, {
					default: c(() => [k(de, {
						"model-value": l.value,
						options: r.value,
						label: w(n)("assets.vibe.provider_label"),
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
}), Ze = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, Qe = ["placeholder"], $e = ["aria-expanded"], et = /* @__PURE__ */ O({
	__name: "VocabularyPanel",
	props: {
		catalog: {},
		installCommand: {},
		loading: { type: Boolean },
		controller: {},
		locale: {}
	},
	setup(r) {
		let a = r, { t: s } = x();
		t(() => {
			a.controller.load_vocabulary_catalog();
		});
		let f = /nsfw|adult|explicit/iu;
		function p(e) {
			return f.test(e.package_id) || f.test(e.display_name.en) || f.test(e.display_name["zh-CN"]);
		}
		let _ = S(() => a.catalog.filter((e) => !p(e))), v = S(() => a.catalog.filter((e) => p(e))), C = e(!1);
		function T(e) {
			return a.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let O = e(null), A = e(null);
		function te(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return s("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return s("assets.vocabulary.progress_downloading");
				case "verifying_package": return s("assets.vocabulary.progress_verifying_package");
				case "installing": return s("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function L(e) {
			O.value === null && (O.value = e.package_id, A.value = null, await a.controller.install_vocabulary_package(e, (e) => {
				A.value = te(e);
			}), O.value = null, A.value = null, a.controller.state.assets.vocabulary_install_command.status === "success" && (z.value = [], B.value = null, R.value.trim() !== "" && await G()));
		}
		let R = e(""), z = e([]), B = e(null), V = e(!1), H = e(!1), U = e(null), W = null;
		async function G() {
			let e = R.value.trim();
			if (e === "") {
				z.value = [], B.value = null;
				return;
			}
			V.value = !0;
			try {
				let t = await a.controller.search_vocabulary(e);
				z.value = t.results, B.value = t.next_cursor;
			} finally {
				V.value = !1;
			}
		}
		async function ne() {
			if (B.value !== null) {
				H.value = !0;
				try {
					let e = await a.controller.load_more_vocabulary(B.value);
					z.value = [...z.value, ...e.results], B.value = e.next_cursor;
				} finally {
					H.value = !1;
				}
			}
		}
		n(R, () => {
			W !== null && clearTimeout(W), W = setTimeout(() => {
				G();
			}, 250);
		});
		async function re(e) {
			await navigator.clipboard.writeText(e.display_text), U.value = e.record_id, setTimeout(() => {
				U.value === e.record_id && (U.value = null);
			}, 2e3);
		}
		let ie = S(() => a.loading ? "loading" : a.catalog.length === 0 ? "empty" : "ready"), ae = S(() => V.value && z.value.length === 0 ? "loading" : R.value.trim() === "" || z.value.length > 0 ? "ready" : "empty");
		return (e, t) => (o(), u("div", { class: y(w(Y).vocabularyPanel) }, [
			b("section", null, [
				b("p", { class: y(w(Y).sectionTitle) }, m(w(s)("assets.vocabulary.search_placeholder")), 3),
				b("div", { class: y(w(Y).vocabularySearchRow) }, [b("label", Ze, m(w(s)("assets.vocabulary.search_placeholder")), 1), l(b("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
					type: "text",
					class: y(w(Y).searchInput),
					placeholder: w(s)("assets.vocabulary.search_placeholder")
				}, null, 10, Qe), [[d, R.value]])], 2),
				k(I, {
					status: ae.value,
					"empty-title": w(s)("assets.vocabulary.empty_title"),
					"empty-message": w(s)("assets.vocabulary.empty_description"),
					"min-height": "60px"
				}, {
					default: c(() => [z.value.length > 0 ? (o(), u("ul", {
						key: 0,
						class: y(w(Y).searchResultsList)
					}, [(o(!0), u(E, null, i(z.value, (e) => (o(), u("li", {
						key: e.record_id,
						class: y(w(Y).searchResultRow)
					}, [
						b("span", { class: y(w(Y).searchResultTag) }, m(e.display_text), 3),
						e.category ? (o(), u("span", {
							key: 0,
							class: y(w(Y).searchResultTranslation)
						}, m(e.category), 3)) : h("", !0),
						k(F, {
							label: U.value === e.record_id ? w(s)("common.actions.copied") : w(s)("common.actions.copy"),
							icon: w(P),
							variant: "secondary",
							onClick: () => void re(e)
						}, null, 8, [
							"label",
							"icon",
							"onClick"
						])
					], 2))), 128))], 2)) : h("", !0)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
					"empty-message"
				]),
				B.value === null ? h("", !0) : (o(), u("div", {
					key: 0,
					class: y(w(Y).loadMoreRow)
				}, [k(F, {
					label: w(s)("common.actions.next"),
					variant: "secondary",
					pending: H.value,
					onClick: t[1] ||= () => void ne()
				}, null, 8, ["label", "pending"])], 2))
			]),
			b("section", null, [
				b("p", { class: y(w(Y).sectionTitle) }, m(w(s)("assets.vocabulary.update_action")), 3),
				k(I, {
					status: ie.value,
					"empty-title": w(s)("assets.vocabulary.empty_title"),
					"empty-message": w(s)("assets.vocabulary.empty_description"),
					"min-height": "80px"
				}, {
					default: c(() => [b("div", { class: y(w(Y).catalogList) }, [(o(!0), u(E, null, i(_.value, (e) => (o(), u("div", {
						key: e.package_id,
						class: y(w(Y).catalogEntry)
					}, [b("div", { class: y(w(Y).catalogEntryInfo) }, [b("span", { class: y(w(Y).catalogEntryName) }, m(T(e)), 3), b("span", { class: y(["tc-tabular-nums", w(Y).catalogEntryMeta]) }, m(w(s)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (o(), u("span", {
						key: 0,
						class: y(w(Y).bundledBadge)
					}, m(w(s)("assets.vocabulary.bundled_label")), 3)) : (o(), g(F, {
						key: 1,
						label: w(s)("assets.vocabulary.import_action"),
						icon: w(ee),
						variant: "primary",
						pending: O.value === e.package_id,
						onClick: () => void L(e)
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
				O.value !== null && A.value !== null ? (o(), u("p", {
					key: 0,
					class: y(w(Y).installProgress)
				}, m(A.value), 3)) : h("", !0)
			]),
			v.value.length > 0 ? (o(), u("section", {
				key: 0,
				class: y(w(Y).nsfwSection)
			}, [b("button", {
				type: "button",
				class: y(["tc-interactive", w(Y).nsfwToggle]),
				"aria-expanded": C.value,
				onClick: t[2] ||= (e) => C.value = !C.value
			}, [k(j, {
				icon: C.value ? w(N) : w(M),
				size: 14
			}, null, 8, ["icon"]), D(" " + m(w(s)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, $e), C.value ? (o(), u("div", {
				key: 1,
				class: y(w(Y).catalogList)
			}, [b("p", { class: y(w(Y).nsfwNotice) }, m(w(s)("assets.vocabulary.nsfw_disclosure_hint")), 3), (o(!0), u(E, null, i(v.value, (e) => (o(), u("div", {
				key: e.package_id,
				class: y(w(Y).catalogEntry)
			}, [b("div", { class: y(w(Y).catalogEntryInfo) }, [b("span", { class: y(w(Y).catalogEntryName) }, m(T(e)), 3), b("span", { class: y(["tc-tabular-nums", w(Y).catalogEntryMeta]) }, m(w(s)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), k(F, {
				label: w(s)("assets.vocabulary.import_action"),
				icon: w(ee),
				variant: "destructive",
				pending: O.value === e.package_id,
				onClick: () => void L(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (o(), u("p", {
				key: 0,
				class: y(w(Y).nsfwNotice)
			}, m(w(s)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : h("", !0)
		], 2));
	}
}), tt = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, nt = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function rt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(tt)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var it = ["aria-label"], at = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], ot = ["id", "value"], st = "unmapped", ct = "{{", lt = "}}", ut = /* @__PURE__ */ O({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(t) {
		let r = t, { t: a, locale: s } = x(), l = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], d = Q("workflow", r.controller, () => l, () => a("errors.validation_required")), p = e(null), _ = e([]);
		function v(e) {
			switch (e) {
				case "positive_prompt": return a("assets.workflow.target_positive_prompt");
				case "negative_prompt": return a("assets.workflow.target_negative_prompt");
				case "seed": return a("assets.workflow.target_seed");
				case "width": return a("assets.workflow.target_width");
				case "height": return a("assets.workflow.target_height");
				case "steps": return a("assets.workflow.target_steps");
			}
		}
		let C = S(() => [{
			value: st,
			label: a("assets.workflow.placeholder_unmapped")
		}, ...nt.map((e) => ({
			value: e,
			label: v(e)
		}))]);
		function T() {
			let e = d.values.workflow_json;
			return typeof e == "string" ? e : "";
		}
		function D(e) {
			let t = e.placeholder_map, n = {};
			if (typeof t == "string") try {
				let e = JSON.parse(t);
				typeof e == "object" && e && (n = e);
			} catch {
				n = {};
			}
			_.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		n(() => d.editing_record.value, (e) => {
			e ? D(e.payload) : _.value = [];
		}, { immediate: !0 });
		function O() {
			let e = rt(T()), t = new Map(_.value.map((e) => [e.name, e.target]));
			_.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function A(e, t) {
			let n = _.value.find((t) => t.name === e);
			n && (n.target = t === st ? "" : t);
		}
		function j() {
			p.value?.click();
		}
		function M(e) {
			return `${ct}${e}${lt}`;
		}
		async function N(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			d.open_create(), d.name.value = n.name.replace(/\.json$/iu, ""), d.values.workflow_json = r, _.value = rt(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function P() {
			let e = {};
			for (let t of _.value) e[t.name] = t.target;
			d.values.placeholder_map = JSON.stringify(e), await d.save();
		}
		let ee = (e) => a("assets.delete_confirm_title", { name: e });
		return (e, n) => (o(), u("div", null, [
			b("div", { class: y(w(Y).workflowToolbarRow) }, [k(F, {
				label: w(a)("assets.workflow.import_action"),
				icon: w(me),
				variant: "primary",
				onClick: j
			}, null, 8, ["label", "icon"]), b("input", {
				ref_key: "file_input",
				ref: p,
				class: y(w(Y).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": w(a)("assets.workflow.import_action"),
				onChange: n[0] ||= (e) => void N(e)
			}, null, 42, it)], 2),
			k(X, {
				records: t.records,
				"summary-fields": [],
				loading: t.loading,
				"search-label": w(a)("common.actions.search"),
				"search-placeholder": w(a)("common.actions.search"),
				"empty-title": w(a)("assets.workflow.empty_title"),
				"empty-description": w(a)("assets.workflow.empty_description"),
				"add-label": w(a)("assets.workflow.import_action"),
				"random-label": w(a)("assets.random_selection_action"),
				"reorder-hint": w(a)("assets.reorder_hint"),
				"edit-label": w(a)("assets.workflow.edit_action"),
				"delete-label": w(a)("common.actions.delete"),
				"delete-confirm-title": ee,
				"delete-confirm-description": w(a)("assets.delete_confirm_description"),
				"confirm-label": w(a)("confirmations.destructive.default_confirm_action"),
				"cancel-label": w(a)("confirmations.destructive.default_cancel_action"),
				"move-up-label": w(a)("assets.move_up_action"),
				"move-down-label": w(a)("assets.move_down_action"),
				"drag-handle-label": w(a)("assets.drag_handle_label"),
				onAdd: j,
				onEdit: w(d).open_edit,
				onDelete: w(d).remove,
				onReorder: w(d).reorder,
				onRandomSelect: w(d).random_select
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
			k(L, {
				open: w(d).dialog_open.value,
				title: w(a)("assets.workflow.edit_action"),
				description: w(a)("assets.form_dialog_description"),
				"close-label": w(a)("common.actions.close"),
				"onUpdate:open": n[4] ||= (e) => {
					e || w(d).close_dialog();
				}
			}, {
				default: c(() => [b("form", {
					class: y(w(Y).form),
					onSubmit: n[3] ||= f(() => void P(), ["prevent"])
				}, [
					k(B, {
						label: w(a)("common.labels.name"),
						error: w(d).name_error.value,
						required: ""
					}, {
						default: c(({ fieldId: e, describedBy: t, invalid: r }) => [b("input", {
							id: e,
							class: y(w(Y).textInput),
							type: "text",
							placeholder: w(a)("common.labels.name"),
							value: w(d).name.value,
							"aria-describedby": t,
							"aria-invalid": r,
							onInput: n[1] ||= (e) => w(d).name.value = e.target.value
						}, null, 42, at)]),
						_: 1
					}, 8, ["label", "error"]),
					k(B, { label: w(a)("assets.workflow.json_label") }, {
						default: c(({ fieldId: e }) => [b("textarea", {
							id: e,
							class: y(w(Y).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: T(),
							onInput: n[2] ||= (e) => w(d).values.workflow_json = e.target.value
						}, null, 42, ot)]),
						_: 1
					}, 8, ["label"]),
					k(F, {
						label: w(a)("assets.workflow.placeholder_scan_action"),
						icon: w(pe),
						variant: "secondary",
						type: "button",
						onClick: O
					}, null, 8, ["label", "icon"]),
					_.value.length > 0 ? (o(), u("div", {
						key: 0,
						class: y(w(Y).placeholderList)
					}, [(o(!0), u(E, null, i(_.value, (e) => (o(), u("div", {
						key: e.name,
						class: y(w(Y).placeholderRow)
					}, [b("span", { class: y(w(Y).placeholderKey) }, m(M(e.name)), 3), (o(), g(H, {
						key: w(s),
						"model-value": e.target === "" ? st : e.target,
						options: C.value,
						placeholder: w(a)("assets.workflow.placeholder_unmapped"),
						ariaLabel: e.name,
						"onUpdate:modelValue": (t) => A(e.name, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128))], 2)) : h("", !0),
					b("div", { class: y(w(Y).formActions) }, [k(F, {
						label: w(a)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: w(d).close_dialog
					}, null, 8, ["label", "onClick"]), k(F, {
						label: w(a)("common.actions.save"),
						variant: "primary",
						type: "submit",
						pending: w(d).saving.value
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
}), dt = /* @__PURE__ */ O({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(t) {
		let n = t, { t: r, locale: i } = x(), a = /* @__PURE__ */ new Set([
			"character",
			"outfit",
			"lora",
			"vibe",
			"reference",
			"workflow"
		]), s = e(n.state.assets.active_category);
		function l(e) {
			s.value = e, a.has(e) && n.controller.set_active_asset_category(e);
		}
		let d = S(() => n.state.loading.has("assets")), f = S(() => n.state.loading.has("personas")), p = S(() => n.state.loading.has("knowledge")), h = S(() => n.state.loading.has("vocabulary")), g = S(() => i.value === "zh-CN" ? "zh-CN" : "en");
		return (e, n) => (o(), u("div", { class: y(w(Y).assetsView) }, [k(w(_e), {
			"model-value": s.value,
			"onUpdate:modelValue": l
		}, {
			default: c(() => [
				k(w(be), {
					class: y(w(Y).tabsList),
					"aria-label": w(r)("nav.assets")
				}, {
					default: c(() => [
						k(w(J), {
							value: "vocabulary",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.vocabulary")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(w(J), {
							value: "persona",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.personas")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(w(J), {
							value: "knowledge",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.knowledge")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(w(J), {
							value: "character",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.characters")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(w(J), {
							value: "outfit",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.outfits")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(w(J), {
							value: "lora",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.lora")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(w(J), {
							value: "vibe",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.vibe")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(w(J), {
							value: "reference",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.reference")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(w(J), {
							value: "workflow",
							class: y(w(Y).tabsTrigger)
						}, {
							default: c(() => [D(m(w(r)("assets.tabs.workflow")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					_: 1
				}, 8, ["class", "aria-label"]),
				k(w(q), {
					value: "vocabulary",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(et, {
						catalog: t.state.assets.vocabulary_catalog,
						"install-command": t.state.assets.vocabulary_install_command,
						loading: h.value,
						controller: t.controller,
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
				k(w(q), {
					value: "persona",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(Ge, {
						personas: t.state.library.personas,
						loading: f.value,
						controller: t.controller
					}, null, 8, [
						"personas",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(w(q), {
					value: "knowledge",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(Be, {
						entries: t.state.library.knowledge,
						"selected-ids": t.state.library.selected_knowledge_ids,
						loading: p.value,
						controller: t.controller
					}, null, 8, [
						"entries",
						"selected-ids",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(w(q), {
					value: "character",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(Pe, {
						records: t.state.assets.records.character,
						loading: d.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(w(q), {
					value: "outfit",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(Ke, {
						records: t.state.assets.records.outfit,
						"character-records": t.state.assets.records.character,
						loading: d.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(w(q), {
					value: "lora",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(Ve, {
						records: t.state.assets.records.lora,
						loading: d.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(w(q), {
					value: "vibe",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(Xe, {
						records: t.state.assets.records.vibe,
						loading: d.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(w(q), {
					value: "reference",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(qe, {
						records: t.state.assets.records.reference,
						loading: d.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(w(q), {
					value: "workflow",
					class: y(w(Y).tabsContent)
				}, {
					default: c(() => [k(ut, {
						records: t.state.assets.records.workflow,
						loading: d.value,
						controller: t.controller
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
export { dt as default };
