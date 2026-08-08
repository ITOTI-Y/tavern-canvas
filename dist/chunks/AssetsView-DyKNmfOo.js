import { A as e, B as t, I as n, K as r, M as i, N as a, R as o, S as s, U as c, _ as l, a as u, b as d, c as f, d as p, ft as m, g as h, ht as g, it as _, mt as v, nt as y, p as b, q as x, r as S, st as C, tt as w, u as T, ut as E, v as D, w as O, x as k, y as A, z as j } from "./AppIcon-BpY-A4VH.js";
import { r as M } from "./useTypeahead-DHbSip40.js";
import { t as N } from "./chevron-up-BB8zEGvw.js";
import { t as ee } from "./copy-CYaZEuNp.js";
import { n as te, t as ne } from "./trash-2-CYok8WLv.js";
import { n as P, t as F } from "./StateSurface-CNBIMTjV.js";
import { n as I, t as L } from "./NumberStepper-BcQ97MQl.js";
import { n as R, t as z } from "./FieldGroup-BPi4aGE9.js";
import { t as B } from "./shuffle-CV6Zfm_h.js";
import { B as V, C as H, Q as U, T as re, j as ie, k as W, w as ae } from "./PopperContent-_OEj_1Tb.js";
import { t as oe } from "./AppSelect-YiC8A59f.js";
import { n as G, t as se } from "./_prop_utils-CoKBy72F.js";
import { t as K } from "./AppSwitch-Cp98f87Q.js";
import { t as ce } from "./RovingFocusGroup-soVq9DTI.js";
import { t as le } from "./IconButton-CW62aQy5.js";
import { n as ue, t as de } from "./SegmentedControl-DhxUizbt.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/grip-vertical.js
var fe = S("grip-vertical", [
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
]), pe = S("scan-search", [
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
]), me = S("upload", [
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
]), [he, ge] = /*#__PURE__*/ U("TabsRoot"), _e = /* @__PURE__ */ O({
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
		let i = e, a = t, { orientation: o, unmountOnHide: s, dir: c } = C(i), l = ie(c);
		W();
		let u = V(i, "modelValue", a, {
			defaultValue: i.defaultValue,
			passive: i.modelValue === void 0
		}), d = y(), f = _(/* @__PURE__ */ new Set());
		return ge({
			modelValue: u,
			changeModelValue: (e) => {
				u.value = e;
			},
			orientation: o,
			dir: l,
			unmountOnHide: s,
			activationMode: i.activationMode,
			baseId: re(void 0, "reka-tabs"),
			tabsList: d,
			contentIds: f,
			registerContent: (e) => {
				f.value = /* @__PURE__ */ new Set([...f.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(f.value);
				t.delete(e), f.value = t;
			}
		}), (e, t) => (n(), D(E(H), {
			dir: E(l),
			"data-orientation": E(o),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: r(() => [j(e.$slots, "default", { modelValue: E(u) })]),
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
	setup(e) {
		let t = e, { forwardRef: o } = W(), c = he(), l = h(() => ve(c.baseId, t.value)), u = h(() => ye(c.baseId, t.value)), d = h(() => t.value === c.modelValue.value), f = y(d.value);
		return a(() => {
			c.registerContent(t.value), requestAnimationFrame(() => {
				f.value = !1;
			});
		}), i(() => {
			c.unregisterContent(t.value);
		}), (e, t) => (n(), D(E(ae), {
			present: e.forceMount || d.value,
			"force-mount": ""
		}, {
			default: r(({ present: t }) => [s(E(H), {
				id: u.value,
				ref: E(o),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": d.value ? "active" : "inactive",
				"data-orientation": E(c).orientation.value,
				"aria-labelledby": l.value,
				hidden: !t,
				tabindex: "0",
				style: v({ animationDuration: f.value ? "0s" : void 0 })
			}, {
				default: r(() => [!E(c).unmountOnHide.value || t ? j(e.$slots, "default", { key: 0 }) : A("v-if", !0)]),
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
		let { loop: t } = C(e), { forwardRef: i, currentElement: a } = W(), o = he();
		return o.tabsList = a, (e, a) => (n(), D(E(ce), {
			"as-child": "",
			orientation: E(o).orientation.value,
			dir: E(o).dir.value,
			loop: E(t)
		}, {
			default: r(() => [s(E(H), {
				ref: E(i),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": E(o).orientation.value
			}, {
				default: r(() => [j(e.$slots, "default")]),
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
		let t = e, { forwardRef: i } = W(), a = he(), o = h(() => ve(a.baseId, t.value)), c = h(() => a.contentIds.value.has(t.value) ? ye(a.baseId, t.value) : void 0), l = h(() => t.value === a.modelValue.value);
		return (e, t) => (n(), D(E(ue), {
			"as-child": "",
			focusable: !e.disabled,
			active: l.value
		}, {
			default: r(() => [s(E(H), {
				id: o.value,
				ref: E(i),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": l.value ? "true" : "false",
				"aria-controls": c.value,
				"data-state": l.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": E(a).orientation.value,
				onMousedown: t[0] ||= p((t) => {
					!e.disabled && t.ctrlKey === !1 ? E(a).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= T((t) => E(a).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = E(a).activationMode !== "manual";
					!l.value && !e.disabled && t && E(a).changeModelValue(e.value);
				}
			}, {
				default: r(() => [j(e.$slots, "default")]),
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
	setup(e, { emit: t }) {
		let i = e, a = t, c = y(""), u = y(null), p = y(null), _ = h(() => {
			let e = c.value.trim().toLowerCase();
			return e === "" ? i.records : i.records.filter((t) => t.display_name.toLowerCase().includes(e));
		}), v = h(() => i.loading ? "loading" : i.records.length === 0 ? "empty" : "ready");
		function S(e) {
			return Te(e.payload, i.summaryFields);
		}
		function C(e) {
			u.value = e;
		}
		function w() {
			u.value && a("delete", u.value.id), u.value = null;
		}
		function T(e, t) {
			let n = i.records.findIndex((t) => t.id === e), r = n + t;
			if (n === -1 || r < 0 || r >= i.records.length) return;
			let o = [...i.records], [s] = o.splice(n, 1);
			s !== void 0 && (o.splice(r, 0, s), a("reorder", o.map((e) => e.id)));
		}
		function D() {
			if (i.records.length === 0) return;
			let e = Math.floor(Math.random() * i.records.length), t = i.records[e];
			t && a("random-select", t);
		}
		function O(e, t) {
			p.value = e, t.dataTransfer?.setData("text/plain", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
		}
		function k(e) {
			e.preventDefault();
		}
		function j(e, t) {
			t.preventDefault();
			let n = p.value;
			if (p.value = null, !n || n === e) return;
			let r = i.records.findIndex((e) => e.id === n), o = i.records.findIndex((t) => t.id === e);
			if (r === -1 || o === -1) return;
			let s = [...i.records], [c] = s.splice(r, 1);
			c !== void 0 && (s.splice(o, 0, c), a("reorder", s.map((e) => e.id)));
		}
		return (t, i) => (n(), d("div", { class: m(E(Y).categoryList) }, [
			l("div", { class: m(E(Y).categoryToolbar) }, [
				l("label", {
					class: "tc-visually-hidden",
					for: `${e.searchLabel}-search`
				}, g(e.searchLabel), 9, Ee),
				x(l("input", {
					id: `${e.searchLabel}-search`,
					"onUpdate:modelValue": i[0] ||= (e) => c.value = e,
					type: "text",
					class: m(E(Y).searchInput),
					placeholder: e.searchPlaceholder,
					"aria-label": e.searchLabel
				}, null, 10, De), [[f, c.value]]),
				s(P, {
					label: e.randomLabel,
					icon: E(B),
					variant: "secondary",
					onClick: D
				}, null, 8, ["label", "icon"]),
				s(P, {
					label: e.addLabel,
					icon: E(R),
					variant: "primary",
					onClick: i[1] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])
			], 2),
			e.records.length > 1 ? (n(), d("p", {
				key: 0,
				class: m(E(Y).reorderHint)
			}, g(e.reorderHint), 3)) : A("", !0),
			s(F, {
				status: v.value,
				"empty-message": e.emptyTitle,
				"min-height": "120px"
			}, {
				action: r(() => [l("p", { class: m(E(Y).emptyDescription) }, g(e.emptyDescription), 3), s(P, {
					label: e.addLabel,
					icon: E(R),
					variant: "primary",
					onClick: i[2] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])]),
				default: r(() => [l("ul", { class: m(E(Y).cardGrid) }, [(n(!0), d(b, null, o(_.value, (t) => (n(), d("li", {
					key: t.id,
					class: m(E(Y).assetCard),
					draggable: "true",
					"data-dragging": p.value === t.id ? "" : null,
					onDragstart: (e) => O(t.id, e),
					onDragover: k,
					onDrop: (e) => j(t.id, e)
				}, [
					l("span", {
						class: m(E(Y).dragHandle),
						"aria-label": e.dragHandleLabel,
						"aria-hidden": "true"
					}, [s(E(fe), {
						size: 16,
						"stroke-width": 1.75
					})], 10, ke),
					l("button", {
						type: "button",
						class: m(E(Y).assetCardMain),
						"aria-label": `${e.editLabel}: ${t.display_name}`,
						onClick: (e) => a("edit", t)
					}, [l("span", { class: m(E(Y).assetCardName) }, g(t.display_name), 3), S(t).length > 0 ? (n(), d("span", {
						key: 0,
						class: m(E(Y).assetCardSummary)
					}, [(n(!0), d(b, null, o(S(t), (e) => (n(), d("span", {
						key: e.label,
						class: m([E(Y).assetCardSummaryPart, e.numeric && "tc-tabular-nums"])
					}, g(e.label) + ": " + g(e.value), 3))), 128))], 2)) : A("", !0)], 10, Ae),
					l("div", { class: m(E(Y).assetCardActions) }, [
						s(le, {
							icon: E(N),
							size: "sm",
							label: e.moveUpLabel,
							onClick: (e) => T(t.id, -1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						s(le, {
							icon: E(M),
							size: "sm",
							label: e.moveDownLabel,
							onClick: (e) => T(t.id, 1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						s(le, {
							icon: E(ne),
							size: "sm",
							destructive: "",
							label: e.deleteLabel,
							onClick: (e) => C(t)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						])
					], 2)
				], 42, Oe))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			s(G, {
				open: u.value !== null,
				title: u.value ? e.deleteConfirmTitle(u.value.display_name) : "",
				description: e.deleteConfirmDescription,
				"confirm-label": e.confirmLabel,
				"cancel-label": e.cancelLabel,
				"onUpdate:open": i[3] ||= (e) => {
					e || (u.value = null);
				},
				onConfirm: w
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
	setup(t, { emit: i }) {
		let a = t, c = i;
		function u(e, t) {
			c("update:values", {
				...a.values,
				[e]: t
			});
		}
		function f(e, t) {
			c("update:values", {
				...a.values,
				[e]: t
			});
		}
		function p(e) {
			e.preventDefault(), c("save");
		}
		let g = h(() => a.pending);
		return (i, a) => (n(), d("form", {
			class: m(E(Y).form),
			onSubmit: p
		}, [
			s(z, {
				label: t.nameLabel,
				error: t.nameError,
				required: ""
			}, {
				default: r(({ fieldId: e, describedBy: n, invalid: r }) => [l("input", {
					id: e,
					class: m(E(Y).textInput),
					type: "text",
					placeholder: t.namePlaceholder,
					value: t.name,
					"aria-describedby": n,
					"aria-invalid": r,
					onInput: a[0] ||= (e) => c("update:name", e.target.value)
				}, null, 42, je)]),
				_: 1
			}, 8, ["label", "error"]),
			(n(!0), d(b, null, o(t.fields, (i) => (n(), D(z, e({
				key: i.key,
				label: i.label
			}, { ref_for: !0 }, E(se)({ hint: i.hint })), {
				default: r(({ fieldId: r, describedBy: a }) => [i.kind === "text" ? (n(), d("input", {
					key: 0,
					id: r,
					class: m(E(Y).textInput),
					type: "text",
					value: t.values[i.key],
					"aria-describedby": a,
					onInput: (e) => u(i.key, e.target.value)
				}, null, 42, Me)) : i.kind === "textarea" ? (n(), d("textarea", {
					key: 1,
					id: r,
					class: m(E(Y).textArea),
					value: t.values[i.key],
					"aria-describedby": a,
					onInput: (e) => u(i.key, e.target.value)
				}, null, 42, Ne)) : (n(), D(L, e({
					key: 2,
					id: r,
					"model-value": typeof t.values[i.key] == "number" ? t.values[i.key] : 0,
					label: i.label,
					step: i.step ?? 1,
					"decrement-label": t.decrementLabel,
					"increment-label": t.incrementLabel
				}, { ref_for: !0 }, E(se)({
					min: i.min,
					max: i.max,
					describedBy: a
				}), { "onUpdate:modelValue": (e) => f(i.key, e) }), null, 16, [
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
			j(i.$slots, "extra-fields"),
			l("div", { class: m(E(Y).formActions) }, [s(P, {
				label: t.cancelLabel,
				variant: "secondary",
				type: "button",
				onClick: a[1] ||= (e) => c("cancel")
			}, null, 8, ["label"]), s(P, {
				label: t.saveLabel,
				variant: "primary",
				type: "submit",
				pending: g.value
			}, null, 8, ["label", "pending"])], 2)
		], 34));
	}
});
//#endregion
//#region src/ui/views/assets/use_asset_category_panel.ts
function Q(e, t, n, r) {
	let i = y(!1), a = y(null), o = y(""), s = y(null), c = w({}), l = y(!1);
	function u() {
		a.value = null, o.value = "", s.value = null, $(c, Ce(n())), i.value = !0;
	}
	function d(e) {
		a.value = e, o.value = e.display_name, s.value = null, $(c, Se(n(), e)), i.value = !0;
	}
	function f() {
		i.value = !1;
	}
	async function p() {
		let n = o.value.trim();
		if (n === "") {
			s.value = r();
			return;
		}
		l.value = !0;
		try {
			let r = a.value?.id ?? crypto.randomUUID();
			await t.save_asset(e, {
				id: r,
				category: e,
				record_key: r,
				display_name: n,
				payload: { ...c }
			}), i.value = !1;
		} finally {
			l.value = !1;
		}
	}
	function m(n) {
		t.remove_asset(e, n);
	}
	function h(n) {
		t.reorder_assets(e, n);
	}
	function g(e) {
		d(e);
	}
	return {
		dialog_open: i,
		editing_record: a,
		name: o,
		name_error: s,
		values: c,
		saving: l,
		open_create: u,
		open_edit: d,
		close_dialog: f,
		save: p,
		remove: m,
		reorder: h,
		random_select: g
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
		let t = e, { t: i } = u(), a = h(() => [
			{
				key: "role_label",
				label: i("assets.characters.role_label"),
				kind: "text"
			},
			{
				key: "appearance",
				label: i("assets.characters.appearance_label"),
				kind: "textarea"
			},
			{
				key: "context_notes",
				label: i("assets.characters.context_notes_label"),
				kind: "textarea"
			},
			{
				key: "world_info_reference",
				label: i("assets.characters.world_info_reference_label"),
				kind: "text",
				hint: i("assets.characters.world_info_reference_hint")
			}
		]), o = Q("character", t.controller, () => a.value, () => i("errors.validation_required")), c = (e) => i("assets.delete_confirm_title", { name: e });
		return (t, l) => (n(), d("div", null, [s(X, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": E(i)("common.actions.search"),
			"search-placeholder": E(i)("common.actions.search"),
			"empty-title": E(i)("assets.characters.empty_title"),
			"empty-description": E(i)("assets.characters.empty_description"),
			"add-label": E(i)("assets.characters.add_action"),
			"random-label": E(i)("assets.random_selection_action"),
			"reorder-hint": E(i)("assets.reorder_hint"),
			"edit-label": E(i)("common.actions.edit"),
			"delete-label": E(i)("common.actions.delete"),
			"delete-confirm-title": c,
			"delete-confirm-description": E(i)("assets.delete_confirm_description"),
			"confirm-label": E(i)("confirmations.destructive.default_confirm_action"),
			"cancel-label": E(i)("confirmations.destructive.default_cancel_action"),
			"move-up-label": E(i)("assets.move_up_action"),
			"move-down-label": E(i)("assets.move_down_action"),
			"drag-handle-label": E(i)("assets.drag_handle_label"),
			onAdd: E(o).open_create,
			onEdit: E(o).open_edit,
			onDelete: E(o).remove,
			onReorder: E(o).reorder,
			onRandomSelect: E(o).random_select
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
		]), s(I, {
			open: E(o).dialog_open.value,
			title: E(o).editing_record.value ? E(i)("common.actions.edit") : E(i)("assets.characters.add_action"),
			description: E(i)("assets.form_dialog_description"),
			"close-label": E(i)("common.actions.close"),
			"onUpdate:open": l[2] ||= (e) => {
				e || E(o).close_dialog();
			}
		}, {
			default: r(() => [s(Z, {
				"name-label": E(i)("common.labels.name"),
				"name-placeholder": E(i)("common.labels.name"),
				name: E(o).name.value,
				"name-error": E(o).name_error.value,
				fields: a.value,
				values: E(o).values,
				"save-label": E(i)("common.actions.save"),
				"cancel-label": E(i)("common.actions.cancel"),
				"decrement-label": E(i)("common.actions.decrease"),
				"increment-label": E(i)("common.actions.increase"),
				pending: E(o).saving.value,
				"onUpdate:name": l[0] ||= (e) => {
					E(o).name.value = e;
				},
				"onUpdate:values": l[1] ||= (e) => E($)(E(o).values, e),
				onSave: E(o).save,
				onCancel: E(o).close_dialog
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
	setup(e) {
		let t = e, { t: i } = u(), a = y(!1), c = y(null), p = y(!1), _ = y(null), v = y(null), S = y(null), C = y(null), w = y(!1), T = y(!1), O = y(!1), k = h(() => [
			"manual",
			"imported",
			"character"
		].map((e) => ({
			value: e,
			label: Ie(i, e)
		}))), j = h({
			get: () => c.value?.source_type ?? "manual",
			set: (e) => {
				c.value && (c.value.source_type = e);
			}
		}), M = h(() => new Set(t.selectedIds)), N = h(() => t.entries.length > 0 && t.selectedIds.length === t.entries.length);
		function ee(e) {
			let t = e.split(/[,，]/u).map((e) => e.trim()).filter((e) => e.length > 0);
			return [...new Set(t)];
		}
		function te(e, n) {
			let r = new Set(t.selectedIds);
			n ? r.add(e) : r.delete(e), t.controller.set_knowledge_selection([...r]);
		}
		function ne(e) {
			t.controller.set_knowledge_selection(e ? t.entries.map((e) => e.id) : []);
		}
		function R() {
			c.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				title: "",
				source_type: "manual",
				content: "",
				keywords_text: "",
				priority: 10,
				enabled: !0
			}, V(), a.value = !0;
		}
		function B(e) {
			c.value = {
				id: e.id,
				is_new: !1,
				title: e.title,
				source_type: e.source_type,
				content: e.content,
				keywords_text: e.keywords.join(", "),
				priority: e.priority,
				enabled: e.enabled
			}, V(), a.value = !0;
		}
		function V() {
			_.value = null, v.value = null, S.value = null;
		}
		function H() {
			a.value = !1, c.value = null;
		}
		async function U() {
			let e = c.value;
			if (!e || p.value) return;
			V();
			let n = e.title.trim(), r = e.content.trim();
			if (n.length === 0 && (_.value = i("errors.validation_required")), r.length === 0 && (v.value = i("errors.validation_required")), !(_.value || v.value)) {
				p.value = !0;
				try {
					await t.controller.save_knowledge_entry({
						id: e.id,
						title: n,
						source_type: e.source_type,
						content: r,
						keywords: ee(e.keywords_text),
						priority: e.priority,
						enabled: e.enabled
					}), H();
				} catch {
					S.value = i("errors.unexpected");
				} finally {
					p.value = !1;
				}
			}
		}
		async function re() {
			let e = C.value;
			if (!(!e || w.value)) {
				w.value = !0;
				try {
					await t.controller.remove_knowledge_entry(e.id), C.value = null;
				} finally {
					w.value = !1;
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
		return (t, u) => (n(), d("div", {
			class: m(E(Y).categoryList),
			"data-testid": "knowledge-panel"
		}, [
			l("div", { class: m(E(Y).categoryToolbar) }, [
				s(P, {
					label: E(i)("assets.knowledge.add_action"),
					onClick: R
				}, null, 8, ["label"]),
				e.entries.length > 0 ? (n(), D(K, {
					key: 0,
					"model-value": N.value,
					label: E(i)("assets.knowledge.select_all_label"),
					"onUpdate:modelValue": ne
				}, null, 8, ["model-value", "label"])) : A("", !0),
				e.selectedIds.length > 0 ? (n(), D(P, {
					key: 1,
					label: E(i)("assets.knowledge.bulk_delete_action", { count: e.selectedIds.length }),
					variant: "destructive",
					"data-testid": "knowledge-bulk-delete",
					onClick: u[0] ||= (e) => T.value = !0
				}, null, 8, ["label"])) : A("", !0)
			], 2),
			s(F, {
				status: e.loading ? "loading" : e.entries.length === 0 ? "empty" : "ready",
				"empty-message": E(i)("assets.knowledge.empty_description")
			}, {
				action: r(() => [s(P, {
					label: E(i)("assets.knowledge.add_action"),
					onClick: R
				}, null, 8, ["label"])]),
				default: r(() => [l("ul", { class: m(E(Y).cardGrid) }, [(n(!0), d(b, null, o(e.entries, (t) => (n(), d("li", {
					key: t.id,
					class: m(E(Y).assetCard),
					"data-testid": "knowledge-card"
				}, [l("div", { class: m(E(Y).assetCardMain) }, [l("span", { class: m(E(Y).assetCardName) }, g(t.title), 3), l("span", { class: m(E(Y).assetCardSummary) }, [
					l("span", { class: m(E(Y).assetCardSummaryPart) }, g(E(Ie)(E(i), t.source_type)), 3),
					l("span", { class: m(E(Y).assetCardSummaryPart) }, g(E(i)("assets.knowledge.priority_summary", { priority: t.priority })), 3),
					t.keywords.length > 0 ? (n(), d("span", {
						key: 0,
						class: m(E(Y).assetCardSummaryPart)
					}, g(t.keywords.join(", ")), 3)) : A("", !0)
				], 2)], 2), l("div", { class: m(E(Y).assetCardActions) }, [
					s(K, {
						"model-value": M.value.has(t.id),
						label: E(i)("assets.knowledge.select_label", { title: t.title }),
						"onUpdate:modelValue": (e) => te(t.id, e)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					s(K, {
						"model-value": t.enabled,
						label: E(i)("assets.knowledge.enabled_label"),
						"onUpdate:modelValue": (n) => e.controller.set_knowledge_entry_enabled(t.id, n)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					s(P, {
						label: E(i)("common.actions.edit"),
						variant: "secondary",
						onClick: (e) => B(t)
					}, null, 8, ["label", "onClick"]),
					s(P, {
						label: E(i)("common.actions.delete"),
						variant: "destructive",
						onClick: (e) => C.value = t
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			s(I, {
				open: a.value,
				title: c.value?.is_new ? E(i)("assets.knowledge.add_action") : E(i)("common.actions.edit"),
				description: E(i)("assets.form_dialog_description"),
				"close-label": E(i)("common.actions.close"),
				"onUpdate:open": u[7] ||= (e) => !e && H()
			}, {
				default: r(() => [c.value ? (n(), d("div", {
					key: 0,
					class: m(E(Y).form)
				}, [
					s(z, {
						label: E(i)("assets.knowledge.title_label"),
						error: _.value,
						required: ""
					}, {
						default: r(({ fieldId: e, describedBy: t }) => [x(l("input", {
							id: e,
							"onUpdate:modelValue": u[1] ||= (e) => c.value.title = e,
							type: "text",
							"aria-describedby": t,
							class: m(E(Y).textInput)
						}, null, 10, Le), [[f, c.value.title]])]),
						_: 1
					}, 8, ["label", "error"]),
					s(z, {
						label: E(i)("assets.knowledge.source_type_label"),
						required: ""
					}, {
						default: r(({ fieldId: e }) => [s(oe, {
							id: e,
							modelValue: j.value,
							"onUpdate:modelValue": u[2] ||= (e) => j.value = e,
							options: k.value,
							placeholder: E(i)("assets.knowledge.source_type_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					s(z, {
						label: E(i)("assets.knowledge.content_label"),
						hint: E(i)("assets.knowledge.content_hint"),
						error: v.value,
						required: ""
					}, {
						default: r(({ fieldId: e, describedBy: t }) => [x(l("textarea", {
							id: e,
							"onUpdate:modelValue": u[3] ||= (e) => c.value.content = e,
							rows: "6",
							"aria-describedby": t,
							class: m(E(Y).textArea)
						}, null, 10, Re), [[f, c.value.content]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					s(z, {
						label: E(i)("assets.knowledge.keywords_label"),
						hint: E(i)("assets.knowledge.keywords_hint")
					}, {
						default: r(({ fieldId: e, describedBy: t }) => [x(l("input", {
							id: e,
							"onUpdate:modelValue": u[4] ||= (e) => c.value.keywords_text = e,
							type: "text",
							"aria-describedby": t,
							class: m(E(Y).textInput)
						}, null, 10, ze), [[f, c.value.keywords_text]])]),
						_: 1
					}, 8, ["label", "hint"]),
					s(z, {
						label: E(i)("assets.knowledge.priority_label"),
						hint: E(i)("assets.knowledge.priority_hint")
					}, {
						default: r(() => [s(L, {
							modelValue: c.value.priority,
							"onUpdate:modelValue": u[5] ||= (e) => c.value.priority = e,
							label: E(i)("assets.knowledge.priority_label"),
							"increment-label": E(i)("common.actions.increase"),
							"decrement-label": E(i)("common.actions.decrease"),
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
					s(K, {
						modelValue: c.value.enabled,
						"onUpdate:modelValue": u[6] ||= (e) => c.value.enabled = e,
						label: E(i)("assets.knowledge.enabled_label")
					}, null, 8, ["modelValue", "label"]),
					S.value ? (n(), d("p", {
						key: 0,
						class: m(E(Y).emptyDescription),
						"data-tone": "error"
					}, g(S.value), 3)) : A("", !0),
					l("div", { class: m(E(Y).formActions) }, [s(P, {
						label: E(i)("common.actions.save"),
						pending: p.value,
						onClick: U
					}, null, 8, ["label", "pending"]), s(P, {
						label: E(i)("common.actions.cancel"),
						variant: "secondary",
						onClick: H
					}, null, 8, ["label"])], 2)
				], 2)) : A("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			s(G, {
				open: C.value !== null,
				title: E(i)("assets.delete_confirm_title", { name: C.value?.title ?? "" }),
				description: E(i)("assets.knowledge.delete_confirm_description"),
				"confirm-label": E(i)("confirmations.destructive.default_confirm_action"),
				"cancel-label": E(i)("confirmations.destructive.default_cancel_action"),
				pending: w.value,
				"onUpdate:open": u[8] ||= (e) => !e && (C.value = null),
				onConfirm: re
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			s(G, {
				open: T.value,
				title: E(i)("assets.knowledge.bulk_delete_confirm_title", { count: e.selectedIds.length }),
				description: E(i)("assets.knowledge.delete_confirm_description"),
				"confirm-label": E(i)("confirmations.destructive.default_confirm_action"),
				"cancel-label": E(i)("confirmations.destructive.default_cancel_action"),
				pending: O.value,
				"onUpdate:open": u[9] ||= (e) => T.value = e,
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
}), Ve = /* @__PURE__ */ O({
	__name: "LoraPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: i } = u(), a = h(() => [{
			key: "trigger_words",
			label: i("assets.lora.trigger_words_label"),
			kind: "text"
		}, {
			key: "weight",
			label: i("assets.lora.weight_label"),
			kind: "number",
			min: 0,
			max: 2,
			step: .05
		}]), o = [{
			key: "weight",
			label: i("assets.lora.weight_label"),
			numeric: !0
		}, {
			key: "trigger_words",
			label: i("assets.lora.trigger_words_label")
		}], c = Q("lora", t.controller, () => a.value, () => i("errors.validation_required")), l = (e) => i("assets.delete_confirm_title", { name: e });
		return (t, u) => (n(), d("div", null, [s(X, {
			records: e.records,
			"summary-fields": o,
			loading: e.loading,
			"search-label": E(i)("common.actions.search"),
			"search-placeholder": E(i)("common.actions.search"),
			"empty-title": E(i)("assets.lora.empty_title"),
			"empty-description": E(i)("assets.lora.empty_description"),
			"add-label": E(i)("assets.lora.add_action"),
			"random-label": E(i)("assets.random_selection_action"),
			"reorder-hint": E(i)("assets.reorder_hint"),
			"edit-label": E(i)("common.actions.edit"),
			"delete-label": E(i)("common.actions.delete"),
			"delete-confirm-title": l,
			"delete-confirm-description": E(i)("assets.delete_confirm_description"),
			"confirm-label": E(i)("confirmations.destructive.default_confirm_action"),
			"cancel-label": E(i)("confirmations.destructive.default_cancel_action"),
			"move-up-label": E(i)("assets.move_up_action"),
			"move-down-label": E(i)("assets.move_down_action"),
			"drag-handle-label": E(i)("assets.drag_handle_label"),
			onAdd: E(c).open_create,
			onEdit: E(c).open_edit,
			onDelete: E(c).remove,
			onReorder: E(c).reorder,
			onRandomSelect: E(c).random_select
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
		]), s(I, {
			open: E(c).dialog_open.value,
			title: E(c).editing_record.value ? E(i)("common.actions.edit") : E(i)("assets.lora.add_action"),
			description: E(i)("assets.form_dialog_description"),
			"close-label": E(i)("common.actions.close"),
			"onUpdate:open": u[2] ||= (e) => {
				e || E(c).close_dialog();
			}
		}, {
			default: r(() => [s(Z, {
				"name-label": E(i)("common.labels.name"),
				"name-placeholder": E(i)("common.labels.name"),
				name: E(c).name.value,
				"name-error": E(c).name_error.value,
				fields: a.value,
				values: E(c).values,
				"save-label": E(i)("common.actions.save"),
				"cancel-label": E(i)("common.actions.cancel"),
				"decrement-label": E(i)("common.actions.decrease"),
				"increment-label": E(i)("common.actions.increase"),
				pending: E(c).saving.value,
				"onUpdate:name": u[0] ||= (e) => {
					E(c).name.value = e;
				},
				"onUpdate:values": u[1] ||= (e) => E($)(E(c).values, e),
				onSave: E(c).save,
				onCancel: E(c).close_dialog
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
	setup(e) {
		let t = e, { t: i } = u(), a = y(!1), c = y(null), p = y(!1), _ = y(null), v = y(null), S = y(null), C = y(!1), w = h(() => ["assistant", "user"].map((e) => ({
			value: e,
			label: Fe(i, e)
		}))), T = h({
			get: () => c.value?.role ?? "assistant",
			set: (e) => {
				c.value && (c.value.role = e);
			}
		});
		function D() {
			c.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				display_name: "",
				role: "assistant",
				description: "",
				greeting: "",
				avatar_image_id: null,
				is_active: t.personas.length === 0
			}, _.value = null, v.value = null, a.value = !0;
		}
		function O(e) {
			c.value = {
				id: e.id,
				is_new: !1,
				display_name: e.display_name,
				role: e.role,
				description: e.description,
				greeting: e.greeting,
				avatar_image_id: e.avatar_image_id,
				is_active: e.is_active
			}, _.value = null, v.value = null, a.value = !0;
		}
		function k() {
			a.value = !1, c.value = null;
		}
		async function j() {
			let e = c.value;
			if (!e || p.value) return;
			let n = e.display_name.trim();
			if (n.length === 0) {
				_.value = i("errors.validation_required");
				return;
			}
			_.value = null, v.value = null, p.value = !0;
			try {
				await t.controller.save_persona({
					id: e.id,
					display_name: n,
					role: e.role,
					description: e.description.trim(),
					greeting: e.greeting.trim(),
					avatar_image_id: e.avatar_image_id,
					is_active: e.is_active
				}), k();
			} catch {
				v.value = i("errors.unexpected");
			} finally {
				p.value = !1;
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
			let e = S.value;
			if (!(!e || C.value)) {
				C.value = !0;
				try {
					await t.controller.remove_persona(e.id), S.value = null;
				} finally {
					C.value = !1;
				}
			}
		}
		return (t, u) => (n(), d("div", {
			class: m(E(Y).categoryList),
			"data-testid": "persona-panel"
		}, [
			l("div", { class: m(E(Y).categoryToolbar) }, [s(P, {
				label: E(i)("assets.personas.add_action"),
				onClick: D
			}, null, 8, ["label"])], 2),
			s(F, {
				status: e.loading ? "loading" : e.personas.length === 0 ? "empty" : "ready",
				"empty-message": E(i)("assets.personas.empty_description")
			}, {
				action: r(() => [s(P, {
					label: E(i)("assets.personas.add_action"),
					onClick: D
				}, null, 8, ["label"])]),
				default: r(() => [l("ul", { class: m(E(Y).cardGrid) }, [(n(!0), d(b, null, o(e.personas, (e) => (n(), d("li", {
					key: e.id,
					class: m(E(Y).assetCard),
					"data-testid": "persona-card"
				}, [l("div", { class: m(E(Y).assetCardMain) }, [l("span", { class: m(E(Y).assetCardName) }, g(e.display_name), 3), l("span", { class: m(E(Y).assetCardSummary) }, [l("span", { class: m(E(Y).assetCardSummaryPart) }, g(E(Fe)(E(i), e.role)), 3), e.is_active ? (n(), d("span", {
					key: 0,
					class: m(E(Y).assetCardSummaryPart)
				}, g(E(i)("assets.personas.active_badge")), 3)) : A("", !0)], 2)], 2), l("div", { class: m(E(Y).assetCardActions) }, [
					s(K, {
						"model-value": e.is_active,
						label: E(i)("assets.personas.active_toggle_label"),
						"onUpdate:modelValue": (t) => M(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					s(P, {
						label: E(i)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => O(e)
					}, null, 8, ["label", "onClick"]),
					s(P, {
						label: E(i)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => S.value = e
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			s(I, {
				open: a.value,
				title: c.value?.is_new ? E(i)("assets.personas.add_action") : E(i)("common.actions.edit"),
				description: E(i)("assets.form_dialog_description"),
				"close-label": E(i)("common.actions.close"),
				"onUpdate:open": u[5] ||= (e) => !e && k()
			}, {
				default: r(() => [c.value ? (n(), d("div", {
					key: 0,
					class: m(E(Y).form)
				}, [
					s(z, {
						label: E(i)("common.labels.name"),
						error: _.value,
						required: ""
					}, {
						default: r(({ fieldId: e, describedBy: t }) => [x(l("input", {
							id: e,
							"onUpdate:modelValue": u[0] ||= (e) => c.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: m(E(Y).textInput)
						}, null, 10, He), [[f, c.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					s(z, {
						label: E(i)("assets.personas.role_label"),
						required: ""
					}, {
						default: r(({ fieldId: e }) => [s(oe, {
							id: e,
							modelValue: T.value,
							"onUpdate:modelValue": u[1] ||= (e) => T.value = e,
							options: w.value,
							placeholder: E(i)("assets.personas.role_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					s(z, {
						label: E(i)("assets.personas.description_label"),
						hint: E(i)("assets.personas.description_hint")
					}, {
						default: r(({ fieldId: e, describedBy: t }) => [x(l("textarea", {
							id: e,
							"onUpdate:modelValue": u[2] ||= (e) => c.value.description = e,
							rows: "4",
							"aria-describedby": t,
							class: m(E(Y).textArea)
						}, null, 10, Ue), [[f, c.value.description]])]),
						_: 1
					}, 8, ["label", "hint"]),
					s(z, {
						label: E(i)("assets.personas.greeting_label"),
						hint: E(i)("assets.personas.greeting_hint")
					}, {
						default: r(({ fieldId: e, describedBy: t }) => [x(l("textarea", {
							id: e,
							"onUpdate:modelValue": u[3] ||= (e) => c.value.greeting = e,
							rows: "3",
							"aria-describedby": t,
							class: m(E(Y).textArea)
						}, null, 10, We), [[f, c.value.greeting]])]),
						_: 1
					}, 8, ["label", "hint"]),
					s(K, {
						modelValue: c.value.is_active,
						"onUpdate:modelValue": u[4] ||= (e) => c.value.is_active = e,
						label: E(i)("assets.personas.active_toggle_label")
					}, null, 8, ["modelValue", "label"]),
					v.value ? (n(), d("p", {
						key: 0,
						class: m(E(Y).emptyDescription),
						"data-tone": "error"
					}, g(v.value), 3)) : A("", !0),
					l("div", { class: m(E(Y).formActions) }, [s(P, {
						label: E(i)("common.actions.save"),
						pending: p.value,
						onClick: j
					}, null, 8, ["label", "pending"]), s(P, {
						label: E(i)("common.actions.cancel"),
						variant: "secondary",
						onClick: k
					}, null, 8, ["label"])], 2)
				], 2)) : A("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			s(G, {
				open: S.value !== null,
				title: E(i)("assets.delete_confirm_title", { name: S.value?.display_name ?? "" }),
				description: E(i)("assets.personas.delete_confirm_description"),
				"confirm-label": E(i)("confirmations.destructive.default_confirm_action"),
				"cancel-label": E(i)("confirmations.destructive.default_cancel_action"),
				pending: C.value,
				"onUpdate:open": u[6] ||= (e) => !e && (S.value = null),
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
	setup(t) {
		let i = t, { t: a } = u(), o = h(() => [{
			key: "description",
			label: a("assets.outfits.description_label"),
			kind: "textarea"
		}]), c = [], l = Q("outfit", i.controller, () => o.value, () => a("errors.validation_required")), f = h(() => i.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), p = h(() => {
			let e = l.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function m(e) {
			l.values.character_id = e;
		}
		let g = (e) => a("assets.delete_confirm_title", { name: e });
		return (i, u) => (n(), d("div", null, [s(X, {
			records: t.records,
			"summary-fields": c,
			loading: t.loading,
			"search-label": E(a)("common.actions.search"),
			"search-placeholder": E(a)("common.actions.search"),
			"empty-title": E(a)("assets.outfits.empty_title"),
			"empty-description": E(a)("assets.outfits.empty_description"),
			"add-label": E(a)("assets.outfits.add_action"),
			"random-label": E(a)("assets.random_selection_action"),
			"reorder-hint": E(a)("assets.reorder_hint"),
			"edit-label": E(a)("common.actions.edit"),
			"delete-label": E(a)("common.actions.delete"),
			"delete-confirm-title": g,
			"delete-confirm-description": E(a)("assets.delete_confirm_description"),
			"confirm-label": E(a)("confirmations.destructive.default_confirm_action"),
			"cancel-label": E(a)("confirmations.destructive.default_cancel_action"),
			"move-up-label": E(a)("assets.move_up_action"),
			"move-down-label": E(a)("assets.move_down_action"),
			"drag-handle-label": E(a)("assets.drag_handle_label"),
			onAdd: E(l).open_create,
			onEdit: E(l).open_edit,
			onDelete: E(l).remove,
			onReorder: E(l).reorder,
			onRandomSelect: E(l).random_select
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
		]), s(I, {
			open: E(l).dialog_open.value,
			title: E(l).editing_record.value ? E(a)("common.actions.edit") : E(a)("assets.outfits.add_action"),
			description: E(a)("assets.form_dialog_description"),
			"close-label": E(a)("common.actions.close"),
			"onUpdate:open": u[2] ||= (e) => {
				e || E(l).close_dialog();
			}
		}, {
			default: r(() => [s(Z, {
				"name-label": E(a)("common.labels.name"),
				"name-placeholder": E(a)("common.labels.name"),
				name: E(l).name.value,
				"name-error": E(l).name_error.value,
				fields: o.value,
				values: E(l).values,
				"save-label": E(a)("common.actions.save"),
				"cancel-label": E(a)("common.actions.cancel"),
				"decrement-label": E(a)("common.actions.decrease"),
				"increment-label": E(a)("common.actions.increase"),
				pending: E(l).saving.value,
				"onUpdate:name": u[0] ||= (e) => {
					E(l).name.value = e;
				},
				"onUpdate:values": u[1] ||= (e) => E($)(E(l).values, e),
				onSave: E(l).save,
				onCancel: E(l).close_dialog
			}, {
				"extra-fields": r(() => [s(z, { label: E(a)("assets.outfits.character_label") }, {
					default: r(({ fieldId: t, describedBy: n }) => [s(oe, e({
						id: t,
						"model-value": p.value,
						options: f.value,
						placeholder: E(a)("assets.outfits.character_placeholder")
					}, E(se)({ describedBy: n }), { "onUpdate:modelValue": m }), null, 16, [
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
		let t = e, { t: i } = u(), a = h(() => [{
			key: "source_url",
			label: i("assets.reference.source_url_label"),
			kind: "text"
		}, {
			key: "notes",
			label: i("assets.reference.notes_label"),
			kind: "textarea"
		}]), o = Q("reference", t.controller, () => a.value, () => i("errors.validation_required")), c = (e) => i("assets.delete_confirm_title", { name: e });
		return (t, l) => (n(), d("div", null, [s(X, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": E(i)("common.actions.search"),
			"search-placeholder": E(i)("common.actions.search"),
			"empty-title": E(i)("assets.reference.empty_title"),
			"empty-description": E(i)("assets.reference.empty_description"),
			"add-label": E(i)("assets.reference.add_action"),
			"random-label": E(i)("assets.random_selection_action"),
			"reorder-hint": E(i)("assets.reorder_hint"),
			"edit-label": E(i)("common.actions.edit"),
			"delete-label": E(i)("common.actions.delete"),
			"delete-confirm-title": c,
			"delete-confirm-description": E(i)("assets.delete_confirm_description"),
			"confirm-label": E(i)("confirmations.destructive.default_confirm_action"),
			"cancel-label": E(i)("confirmations.destructive.default_cancel_action"),
			"move-up-label": E(i)("assets.move_up_action"),
			"move-down-label": E(i)("assets.move_down_action"),
			"drag-handle-label": E(i)("assets.drag_handle_label"),
			onAdd: E(o).open_create,
			onEdit: E(o).open_edit,
			onDelete: E(o).remove,
			onReorder: E(o).reorder,
			onRandomSelect: E(o).random_select
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
		]), s(I, {
			open: E(o).dialog_open.value,
			title: E(o).editing_record.value ? E(i)("common.actions.edit") : E(i)("assets.reference.add_action"),
			description: E(i)("assets.form_dialog_description"),
			"close-label": E(i)("common.actions.close"),
			"onUpdate:open": l[2] ||= (e) => {
				e || E(o).close_dialog();
			}
		}, {
			default: r(() => [s(Z, {
				"name-label": E(i)("common.labels.name"),
				"name-placeholder": E(i)("common.labels.name"),
				name: E(o).name.value,
				"name-error": E(o).name_error.value,
				fields: a.value,
				values: E(o).values,
				"save-label": E(i)("common.actions.save"),
				"cancel-label": E(i)("common.actions.cancel"),
				"decrement-label": E(i)("common.actions.decrease"),
				"increment-label": E(i)("common.actions.increase"),
				pending: E(o).saving.value,
				"onUpdate:name": l[0] ||= (e) => {
					E(o).name.value = e;
				},
				"onUpdate:values": l[1] ||= (e) => E($)(E(o).values, e),
				onSave: E(o).save,
				onCancel: E(o).close_dialog
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
		let t = e, { t: i } = u(), a = h(() => [{
			value: Je,
			label: i("assets.vibe.provider_novelai")
		}, {
			value: Ye,
			label: i("assets.vibe.provider_google")
		}]), o = h(() => {
			let e = [{
				key: "notes",
				label: i("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return l.values.provider !== Ye && e.push({
				key: "strength",
				label: i("assets.vibe.strength_label"),
				kind: "number",
				min: 0,
				max: 1,
				step: .05
			}, {
				key: "information_extracted",
				label: i("assets.vibe.information_extracted_label"),
				kind: "number",
				min: 0,
				max: 1,
				step: .05
			}), e;
		}), c = [{
			key: "strength",
			label: i("assets.vibe.strength_label"),
			numeric: !0
		}], l = Q("vibe", t.controller, () => o.value, () => i("errors.validation_required")), f = h(() => typeof l.values.provider == "string" && l.values.provider !== "" ? l.values.provider : Je);
		function p(e) {
			l.values.provider = e;
		}
		let m = (e) => i("assets.delete_confirm_title", { name: e });
		return (t, u) => (n(), d("div", null, [s(X, {
			records: e.records,
			"summary-fields": c,
			loading: e.loading,
			"search-label": E(i)("common.actions.search"),
			"search-placeholder": E(i)("common.actions.search"),
			"empty-title": E(i)("assets.vibe.empty_title"),
			"empty-description": E(i)("assets.vibe.empty_description"),
			"add-label": E(i)("assets.vibe.add_action"),
			"random-label": E(i)("assets.random_selection_action"),
			"reorder-hint": E(i)("assets.reorder_hint"),
			"edit-label": E(i)("common.actions.edit"),
			"delete-label": E(i)("common.actions.delete"),
			"delete-confirm-title": m,
			"delete-confirm-description": E(i)("assets.delete_confirm_description"),
			"confirm-label": E(i)("confirmations.destructive.default_confirm_action"),
			"cancel-label": E(i)("confirmations.destructive.default_cancel_action"),
			"move-up-label": E(i)("assets.move_up_action"),
			"move-down-label": E(i)("assets.move_down_action"),
			"drag-handle-label": E(i)("assets.drag_handle_label"),
			onAdd: E(l).open_create,
			onEdit: E(l).open_edit,
			onDelete: E(l).remove,
			onReorder: E(l).reorder,
			onRandomSelect: E(l).random_select
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
		]), s(I, {
			open: E(l).dialog_open.value,
			title: E(l).editing_record.value ? E(i)("common.actions.edit") : E(i)("assets.vibe.add_action"),
			description: E(i)("assets.form_dialog_description"),
			"close-label": E(i)("common.actions.close"),
			"onUpdate:open": u[2] ||= (e) => {
				e || E(l).close_dialog();
			}
		}, {
			default: r(() => [s(Z, {
				"name-label": E(i)("common.labels.name"),
				"name-placeholder": E(i)("common.labels.name"),
				name: E(l).name.value,
				"name-error": E(l).name_error.value,
				fields: o.value,
				values: E(l).values,
				"save-label": E(i)("common.actions.save"),
				"cancel-label": E(i)("common.actions.cancel"),
				"decrement-label": E(i)("common.actions.decrease"),
				"increment-label": E(i)("common.actions.increase"),
				pending: E(l).saving.value,
				"onUpdate:name": u[0] ||= (e) => {
					E(l).name.value = e;
				},
				"onUpdate:values": u[1] ||= (e) => E($)(E(l).values, e),
				onSave: E(l).save,
				onCancel: E(l).close_dialog
			}, {
				"extra-fields": r(() => [s(z, { label: E(i)("assets.vibe.provider_label") }, {
					default: r(() => [s(de, {
						"model-value": f.value,
						options: a.value,
						label: E(i)("assets.vibe.provider_label"),
						"onUpdate:modelValue": p
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
	setup(e) {
		let i = e, { t: a } = u(), p = /nsfw|adult|explicit/iu;
		function _(e) {
			return p.test(e.package_id) || p.test(e.display_name.en) || p.test(e.display_name["zh-CN"]);
		}
		let v = h(() => i.catalog.filter((e) => !_(e))), S = h(() => i.catalog.filter((e) => _(e))), C = y(!1);
		function w(e) {
			return i.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let T = y(null), O = y(null);
		function j(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return a("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return a("assets.vocabulary.progress_downloading");
				case "verifying_package": return a("assets.vocabulary.progress_verifying_package");
				case "installing": return a("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function ne(e) {
			T.value === null && (T.value = e.package_id, O.value = null, await i.controller.install_vocabulary_package(e, (e) => {
				O.value = j(e);
			}), T.value = null, O.value = null, i.controller.state.assets.vocabulary_install_command.status === "success" && (L.value = [], R.value = null, I.value.trim() !== "" && await U()));
		}
		let I = y(""), L = y([]), R = y(null), z = y(!1), B = y(!1), V = y(null), H = null;
		async function U() {
			let e = I.value.trim();
			if (e === "") {
				L.value = [], R.value = null;
				return;
			}
			z.value = !0;
			try {
				let t = await i.controller.search_vocabulary(e);
				L.value = t.results, R.value = t.next_cursor;
			} finally {
				z.value = !1;
			}
		}
		async function re() {
			if (R.value !== null) {
				B.value = !0;
				try {
					let e = await i.controller.load_more_vocabulary(R.value);
					L.value = [...L.value, ...e.results], R.value = e.next_cursor;
				} finally {
					B.value = !1;
				}
			}
		}
		c(I, () => {
			H !== null && clearTimeout(H), H = setTimeout(() => {
				U();
			}, 250);
		});
		async function ie(e) {
			await navigator.clipboard.writeText(e.display_text), V.value = e.record_id, setTimeout(() => {
				V.value === e.record_id && (V.value = null);
			}, 2e3);
		}
		let W = h(() => i.loading ? "loading" : i.catalog.length === 0 ? "empty" : "ready"), ae = h(() => z.value && L.value.length === 0 ? "loading" : I.value.trim() === "" || L.value.length > 0 ? "ready" : "empty");
		return (e, i) => (n(), d("div", { class: m(E(Y).vocabularyPanel) }, [
			l("section", null, [
				l("p", { class: m(E(Y).sectionTitle) }, g(E(a)("assets.vocabulary.search_placeholder")), 3),
				l("div", { class: m(E(Y).vocabularySearchRow) }, [l("label", Ze, g(E(a)("assets.vocabulary.search_placeholder")), 1), x(l("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": i[0] ||= (e) => I.value = e,
					type: "text",
					class: m(E(Y).searchInput),
					placeholder: E(a)("assets.vocabulary.search_placeholder")
				}, null, 10, Qe), [[f, I.value]])], 2),
				s(F, {
					status: ae.value,
					"empty-message": E(a)("assets.vocabulary.empty_title"),
					"min-height": "60px"
				}, {
					action: r(() => [l("p", { class: m(E(Y).emptyDescription) }, g(E(a)("assets.vocabulary.empty_description")), 3)]),
					default: r(() => [L.value.length > 0 ? (n(), d("ul", {
						key: 0,
						class: m(E(Y).searchResultsList)
					}, [(n(!0), d(b, null, o(L.value, (e) => (n(), d("li", {
						key: e.record_id,
						class: m(E(Y).searchResultRow)
					}, [
						l("span", { class: m(E(Y).searchResultTag) }, g(e.display_text), 3),
						e.category ? (n(), d("span", {
							key: 0,
							class: m(E(Y).searchResultTranslation)
						}, g(e.category), 3)) : A("", !0),
						s(P, {
							label: V.value === e.record_id ? E(a)("common.actions.copied") : E(a)("common.actions.copy"),
							icon: E(ee),
							variant: "secondary",
							onClick: () => void ie(e)
						}, null, 8, [
							"label",
							"icon",
							"onClick"
						])
					], 2))), 128))], 2)) : A("", !0)]),
					_: 1
				}, 8, ["status", "empty-message"]),
				R.value === null ? A("", !0) : (n(), d("div", {
					key: 0,
					class: m(E(Y).loadMoreRow)
				}, [s(P, {
					label: E(a)("common.actions.next"),
					variant: "secondary",
					pending: B.value,
					onClick: i[1] ||= () => void re()
				}, null, 8, ["label", "pending"])], 2))
			]),
			l("section", null, [
				l("p", { class: m(E(Y).sectionTitle) }, g(E(a)("assets.vocabulary.update_action")), 3),
				s(F, {
					status: W.value,
					"empty-message": E(a)("assets.vocabulary.empty_title"),
					"min-height": "80px"
				}, {
					action: r(() => [l("p", { class: m(E(Y).emptyDescription) }, g(E(a)("assets.vocabulary.empty_description")), 3)]),
					default: r(() => [l("div", { class: m(E(Y).catalogList) }, [(n(!0), d(b, null, o(v.value, (e) => (n(), d("div", {
						key: e.package_id,
						class: m(E(Y).catalogEntry)
					}, [l("div", { class: m(E(Y).catalogEntryInfo) }, [l("span", { class: m(E(Y).catalogEntryName) }, g(w(e)), 3), l("span", { class: m(["tc-tabular-nums", E(Y).catalogEntryMeta]) }, g(E(a)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (n(), d("span", {
						key: 0,
						class: m(E(Y).bundledBadge)
					}, g(E(a)("assets.vocabulary.bundled_label")), 3)) : (n(), D(P, {
						key: 1,
						label: E(a)("assets.vocabulary.import_action"),
						icon: E(te),
						variant: "primary",
						pending: T.value === e.package_id,
						onClick: () => void ne(e)
					}, null, 8, [
						"label",
						"icon",
						"pending",
						"onClick"
					]))], 2))), 128))], 2)]),
					_: 1
				}, 8, ["status", "empty-message"]),
				T.value !== null && O.value !== null ? (n(), d("p", {
					key: 0,
					class: m(E(Y).installProgress)
				}, g(O.value), 3)) : A("", !0)
			]),
			S.value.length > 0 ? (n(), d("section", {
				key: 0,
				class: m(E(Y).nsfwSection)
			}, [l("button", {
				type: "button",
				class: m(["tc-interactive", E(Y).nsfwToggle]),
				"aria-expanded": C.value,
				onClick: i[2] ||= (e) => C.value = !C.value
			}, [(n(), D(t(C.value ? E(N) : E(M)), {
				size: 14,
				"stroke-width": 1.75,
				"aria-hidden": "true"
			})), k(" " + g(E(a)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, $e), C.value ? (n(), d("div", {
				key: 1,
				class: m(E(Y).catalogList)
			}, [l("p", { class: m(E(Y).nsfwNotice) }, g(E(a)("assets.vocabulary.nsfw_disclosure_hint")), 3), (n(!0), d(b, null, o(S.value, (e) => (n(), d("div", {
				key: e.package_id,
				class: m(E(Y).catalogEntry)
			}, [l("div", { class: m(E(Y).catalogEntryInfo) }, [l("span", { class: m(E(Y).catalogEntryName) }, g(w(e)), 3), l("span", { class: m(["tc-tabular-nums", E(Y).catalogEntryMeta]) }, g(E(a)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), s(P, {
				label: E(a)("assets.vocabulary.import_action"),
				icon: E(te),
				variant: "destructive",
				pending: T.value === e.package_id,
				onClick: () => void ne(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (n(), d("p", {
				key: 0,
				class: m(E(Y).nsfwNotice)
			}, g(E(a)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : A("", !0)
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
	setup(e) {
		let t = e, { t: i, locale: a } = u(), f = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], _ = Q("workflow", t.controller, () => f, () => i("errors.validation_required")), v = y(null), x = y([]);
		function S(e) {
			switch (e) {
				case "positive_prompt": return i("assets.workflow.target_positive_prompt");
				case "negative_prompt": return i("assets.workflow.target_negative_prompt");
				case "seed": return i("assets.workflow.target_seed");
				case "width": return i("assets.workflow.target_width");
				case "height": return i("assets.workflow.target_height");
				case "steps": return i("assets.workflow.target_steps");
			}
		}
		let C = h(() => [{
			value: st,
			label: i("assets.workflow.placeholder_unmapped")
		}, ...nt.map((e) => ({
			value: e,
			label: S(e)
		}))]);
		function w() {
			let e = _.values.workflow_json;
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
			x.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		c(() => _.editing_record.value, (e) => {
			e ? T(e.payload) : x.value = [];
		}, { immediate: !0 });
		function O() {
			let e = rt(w()), t = new Map(x.value.map((e) => [e.name, e.target]));
			x.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function k(e, t) {
			let n = x.value.find((t) => t.name === e);
			n && (n.target = t === st ? "" : t);
		}
		function j() {
			v.value?.click();
		}
		function M(e) {
			return `${ct}${e}${lt}`;
		}
		async function N(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			_.open_create(), _.name.value = n.name.replace(/\.json$/iu, ""), _.values.workflow_json = r, x.value = rt(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function ee() {
			let e = {};
			for (let t of x.value) e[t.name] = t.target;
			_.values.placeholder_map = JSON.stringify(e), await _.save();
		}
		let te = (e) => i("assets.delete_confirm_title", { name: e });
		return (t, c) => (n(), d("div", null, [
			l("div", { class: m(E(Y).workflowToolbarRow) }, [s(P, {
				label: E(i)("assets.workflow.import_action"),
				icon: E(me),
				variant: "primary",
				onClick: j
			}, null, 8, ["label", "icon"]), l("input", {
				ref_key: "file_input",
				ref: v,
				class: m(E(Y).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": E(i)("assets.workflow.import_action"),
				onChange: c[0] ||= (e) => void N(e)
			}, null, 42, it)], 2),
			s(X, {
				records: e.records,
				"summary-fields": [],
				loading: e.loading,
				"search-label": E(i)("common.actions.search"),
				"search-placeholder": E(i)("common.actions.search"),
				"empty-title": E(i)("assets.workflow.empty_title"),
				"empty-description": E(i)("assets.workflow.empty_description"),
				"add-label": E(i)("assets.workflow.import_action"),
				"random-label": E(i)("assets.random_selection_action"),
				"reorder-hint": E(i)("assets.reorder_hint"),
				"edit-label": E(i)("assets.workflow.edit_action"),
				"delete-label": E(i)("common.actions.delete"),
				"delete-confirm-title": te,
				"delete-confirm-description": E(i)("assets.delete_confirm_description"),
				"confirm-label": E(i)("confirmations.destructive.default_confirm_action"),
				"cancel-label": E(i)("confirmations.destructive.default_cancel_action"),
				"move-up-label": E(i)("assets.move_up_action"),
				"move-down-label": E(i)("assets.move_down_action"),
				"drag-handle-label": E(i)("assets.drag_handle_label"),
				onAdd: j,
				onEdit: E(_).open_edit,
				onDelete: E(_).remove,
				onReorder: E(_).reorder,
				onRandomSelect: E(_).random_select
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
			s(I, {
				open: E(_).dialog_open.value,
				title: E(i)("assets.workflow.edit_action"),
				description: E(i)("assets.form_dialog_description"),
				"close-label": E(i)("common.actions.close"),
				"onUpdate:open": c[4] ||= (e) => {
					e || E(_).close_dialog();
				}
			}, {
				default: r(() => [l("form", {
					class: m(E(Y).form),
					onSubmit: c[3] ||= p(() => void ee(), ["prevent"])
				}, [
					s(z, {
						label: E(i)("common.labels.name"),
						error: E(_).name_error.value,
						required: ""
					}, {
						default: r(({ fieldId: e, describedBy: t, invalid: n }) => [l("input", {
							id: e,
							class: m(E(Y).textInput),
							type: "text",
							placeholder: E(i)("common.labels.name"),
							value: E(_).name.value,
							"aria-describedby": t,
							"aria-invalid": n,
							onInput: c[1] ||= (e) => E(_).name.value = e.target.value
						}, null, 42, at)]),
						_: 1
					}, 8, ["label", "error"]),
					s(z, { label: E(i)("assets.workflow.json_label") }, {
						default: r(({ fieldId: e }) => [l("textarea", {
							id: e,
							class: m(E(Y).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: w(),
							onInput: c[2] ||= (e) => E(_).values.workflow_json = e.target.value
						}, null, 42, ot)]),
						_: 1
					}, 8, ["label"]),
					s(P, {
						label: E(i)("assets.workflow.placeholder_scan_action"),
						icon: E(pe),
						variant: "secondary",
						type: "button",
						onClick: O
					}, null, 8, ["label", "icon"]),
					x.value.length > 0 ? (n(), d("div", {
						key: 0,
						class: m(E(Y).placeholderList)
					}, [(n(!0), d(b, null, o(x.value, (e) => (n(), d("div", {
						key: e.name,
						class: m(E(Y).placeholderRow)
					}, [l("span", { class: m(E(Y).placeholderKey) }, g(M(e.name)), 3), (n(), D(oe, {
						key: E(a),
						"model-value": e.target === "" ? st : e.target,
						options: C.value,
						placeholder: E(i)("assets.workflow.placeholder_unmapped"),
						ariaLabel: e.name,
						"onUpdate:modelValue": (t) => k(e.name, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128))], 2)) : A("", !0),
					l("div", { class: m(E(Y).formActions) }, [s(P, {
						label: E(i)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: E(_).close_dialog
					}, null, 8, ["label", "onClick"]), s(P, {
						label: E(i)("common.actions.save"),
						variant: "primary",
						type: "submit",
						pending: E(_).saving.value
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
	setup(e) {
		let t = e, { t: i, locale: a } = u(), o = /* @__PURE__ */ new Set([
			"character",
			"outfit",
			"lora",
			"vibe",
			"reference",
			"workflow"
		]), c = y(t.state.assets.active_category);
		function l(e) {
			c.value = e, o.has(e) && t.controller.set_active_asset_category(e);
		}
		let f = h(() => t.state.loading.has("assets")), p = h(() => t.state.loading.has("personas")), _ = h(() => t.state.loading.has("knowledge")), v = h(() => t.state.loading.has("vocabulary")), b = h(() => a.value === "zh-CN" ? "zh-CN" : "en");
		return (t, a) => (n(), d("div", { class: m(E(Y).assetsView) }, [s(E(_e), {
			"model-value": c.value,
			"onUpdate:modelValue": l
		}, {
			default: r(() => [
				s(E(be), {
					class: m(E(Y).tabsList),
					"aria-label": E(i)("nav.assets")
				}, {
					default: r(() => [
						s(E(J), {
							value: "vocabulary",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.vocabulary")), 1)]),
							_: 1
						}, 8, ["class"]),
						s(E(J), {
							value: "persona",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.personas")), 1)]),
							_: 1
						}, 8, ["class"]),
						s(E(J), {
							value: "knowledge",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.knowledge")), 1)]),
							_: 1
						}, 8, ["class"]),
						s(E(J), {
							value: "character",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.characters")), 1)]),
							_: 1
						}, 8, ["class"]),
						s(E(J), {
							value: "outfit",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.outfits")), 1)]),
							_: 1
						}, 8, ["class"]),
						s(E(J), {
							value: "lora",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.lora")), 1)]),
							_: 1
						}, 8, ["class"]),
						s(E(J), {
							value: "vibe",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.vibe")), 1)]),
							_: 1
						}, 8, ["class"]),
						s(E(J), {
							value: "reference",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.reference")), 1)]),
							_: 1
						}, 8, ["class"]),
						s(E(J), {
							value: "workflow",
							class: m(E(Y).tabsTrigger)
						}, {
							default: r(() => [k(g(E(i)("assets.tabs.workflow")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					_: 1
				}, 8, ["class", "aria-label"]),
				s(E(q), {
					value: "vocabulary",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(et, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						loading: v.value,
						controller: e.controller,
						locale: b.value
					}, null, 8, [
						"catalog",
						"install-command",
						"loading",
						"controller",
						"locale"
					])]),
					_: 1
				}, 8, ["class"]),
				s(E(q), {
					value: "persona",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(Ge, {
						personas: e.state.library.personas,
						loading: p.value,
						controller: e.controller
					}, null, 8, [
						"personas",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				s(E(q), {
					value: "knowledge",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(Be, {
						entries: e.state.library.knowledge,
						"selected-ids": e.state.library.selected_knowledge_ids,
						loading: _.value,
						controller: e.controller
					}, null, 8, [
						"entries",
						"selected-ids",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				s(E(q), {
					value: "character",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(Pe, {
						records: e.state.assets.records.character,
						loading: f.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				s(E(q), {
					value: "outfit",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(Ke, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: f.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				s(E(q), {
					value: "lora",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(Ve, {
						records: e.state.assets.records.lora,
						loading: f.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				s(E(q), {
					value: "vibe",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(Xe, {
						records: e.state.assets.records.vibe,
						loading: f.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				s(E(q), {
					value: "reference",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(qe, {
						records: e.state.assets.records.reference,
						loading: f.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				s(E(q), {
					value: "workflow",
					class: m(E(Y).tabsContent)
				}, {
					default: r(() => [s(ut, {
						records: e.state.assets.records.workflow,
						loading: f.value,
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
export { dt as default };

//# sourceMappingURL=AssetsView-DyKNmfOo.js.map