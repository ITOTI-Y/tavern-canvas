import { $ as e, A as t, D as n, F as r, G as i, I as a, N as o, V as s, W as c, _ as l, a as u, at as d, c as f, ct as p, et as m, ft as h, g, h as _, k as v, m as y, n as b, nt as x, p as S, pt as C, s as w, u as T, ut as E, v as D, x as O, y as k } from "./vue-i18n-DUz2Gjn8.js";
import { n as A, t as j } from "./AppIcon-Cnhzrx9o.js";
import { t as M } from "./chevron-down-Tu_8qTxg.js";
import { t as N } from "./chevron-up-D4TetO-M.js";
import { n as ee, t as P } from "./download-DHgWv1wH.js";
import { n as F, t as I } from "./StateSurface-Bo_sA18G.js";
import { i as te, n as ne, r as L, t as R } from "./AppDialog-DJhokkv1.js";
import { n as z, t as B } from "./FieldGroup-LDtWeac7.js";
import { t as V } from "./shuffle-BAB9O4dE.js";
import { t as H } from "./trash-2-B6ZXZcor.js";
import { t as U } from "./upload-CQtsg_mB.js";
import { t as W } from "./AppSelect-DJk9aRkS.js";
import { _ as re, c as G, i as K, j as ie, o as ae, s as oe } from "./Teleport-C7mDSUEl.js";
import { n as se, t as ce } from "./SegmentedControl-Dm-Q3kIh.js";
import { c as le } from "./PopperContent-a3U-C0mc.js";
import { t as ue } from "./_prop_utils-BsJwfjAZ.js";
import { n as de, t as fe } from "./AppSwitch-x2vuooAG.js";
import { n as pe, t as me } from "./IconButton-BvRQHJyk.js";
import { t as he } from "./reference_image-DYyYuujP.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/grip-vertical.js
var ge = A("grip-vertical", [
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
]), _e = A("scan-search", [
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
]), [ve, ye] = /*#__PURE__*/ ie("TabsRoot"), be = /* @__PURE__ */ O({
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
		let n = e, r = t, { orientation: i, unmountOnHide: s, dir: l } = d(n), u = le(l);
		G();
		let f = re(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), h = m(), g = x(/* @__PURE__ */ new Set());
		return ye({
			modelValue: f,
			changeModelValue: (e) => {
				f.value = e;
			},
			orientation: i,
			dir: u,
			unmountOnHide: s,
			activationMode: n.activationMode,
			baseId: oe(void 0, "reka-tabs"),
			tabsList: h,
			contentIds: g,
			registerContent: (e) => {
				g.value = /* @__PURE__ */ new Set([...g.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(g.value);
				t.delete(e), g.value = t;
			}
		}), (e, t) => (o(), _(p(K), {
			dir: p(u),
			"data-orientation": p(i),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: c(() => [a(e.$slots, "default", { modelValue: p(f) })]),
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
function xe(e, t) {
	return `${e}-trigger-${t}`;
}
function Se(e, t) {
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
		let n = e, { forwardRef: r } = G(), i = ve(), s = S(() => xe(i.baseId, n.value)), l = S(() => Se(i.baseId, n.value)), u = S(() => n.value === i.modelValue.value), d = m(u.value);
		return t(() => {
			i.registerContent(n.value), requestAnimationFrame(() => {
				d.value = !1;
			});
		}), v(() => {
			i.unregisterContent(n.value);
		}), (e, t) => (o(), _(p(ae), {
			present: e.forceMount || u.value,
			"force-mount": ""
		}, {
			default: c(({ present: t }) => [k(p(K), {
				id: l.value,
				ref: p(r),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": u.value ? "active" : "inactive",
				"data-orientation": p(i).orientation.value,
				"aria-labelledby": s.value,
				hidden: !t,
				tabindex: "0",
				style: h({ animationDuration: d.value ? "0s" : void 0 })
			}, {
				default: c(() => [!p(i).unmountOnHide.value || t ? a(e.$slots, "default", { key: 0 }) : g("v-if", !0)]),
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
}), Ce = /* @__PURE__ */ O({
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
		let { loop: t } = d(e), { forwardRef: n, currentElement: r } = G(), i = ve();
		return i.tabsList = r, (e, r) => (o(), _(p(te), {
			"as-child": "",
			orientation: p(i).orientation.value,
			dir: p(i).dir.value,
			loop: p(t)
		}, {
			default: c(() => [k(p(K), {
				ref: p(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": p(i).orientation.value
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
		let t = e, { forwardRef: n } = G(), r = ve(), i = S(() => xe(r.baseId, t.value)), s = S(() => r.contentIds.value.has(t.value) ? Se(r.baseId, t.value) : void 0), l = S(() => t.value === r.modelValue.value);
		return (e, t) => (o(), _(p(L), {
			"as-child": "",
			focusable: !e.disabled,
			active: l.value
		}, {
			default: c(() => [k(p(K), {
				id: i.value,
				ref: p(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": l.value ? "true" : "false",
				"aria-controls": s.value,
				"data-state": l.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": p(r).orientation.value,
				onMousedown: t[0] ||= f((t) => {
					!e.disabled && t.ctrlKey === !1 ? p(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= w((t) => p(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = p(r).activationMode !== "manual";
					!l.value && !e.disabled && t && p(r).changeModelValue(e.value);
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
	assetsView: "_assetsView_10uyv_10",
	tabsList: "_tabsList_10uyv_23",
	tabsTrigger: "_tabsTrigger_10uyv_31",
	tabsContent: "_tabsContent_10uyv_55",
	categoryList: "_categoryList_10uyv_70",
	categoryToolbar: "_categoryToolbar_10uyv_77",
	searchInput: "_searchInput_10uyv_84",
	reorderHint: "_reorderHint_10uyv_100",
	emptyDescription: "_emptyDescription_10uyv_105",
	cardGrid: "_cardGrid_10uyv_110",
	assetCard: "_assetCard_10uyv_120",
	dragHandle: "_dragHandle_10uyv_135",
	assetCardMain: "_assetCardMain_10uyv_147",
	assetCardName: "_assetCardName_10uyv_165",
	assetCardSummary: "_assetCardSummary_10uyv_175",
	assetCardSummaryPart: "_assetCardSummaryPart_10uyv_183",
	assetCardActions: "_assetCardActions_10uyv_187",
	form: "_form_10uyv_199",
	textInput: "_textInput_10uyv_205",
	textArea: "_textArea_10uyv_206",
	formError: "_formError_10uyv_228",
	formActions: "_formActions_10uyv_234",
	vocabularyPanel: "_vocabularyPanel_10uyv_244",
	vocabularySearchRow: "_vocabularySearchRow_10uyv_250",
	searchResultsList: "_searchResultsList_10uyv_255",
	searchResultRow: "_searchResultRow_10uyv_261",
	searchResultTag: "_searchResultTag_10uyv_270",
	searchResultTranslation: "_searchResultTranslation_10uyv_275",
	loadMoreRow: "_loadMoreRow_10uyv_280",
	sectionTitle: "_sectionTitle_10uyv_286",
	catalogList: "_catalogList_10uyv_292",
	catalogEntry: "_catalogEntry_10uyv_298",
	catalogEntryInfo: "_catalogEntryInfo_10uyv_307",
	catalogEntryName: "_catalogEntryName_10uyv_314",
	catalogEntryMeta: "_catalogEntryMeta_10uyv_320",
	bundledBadge: "_bundledBadge_10uyv_325",
	nsfwSection: "_nsfwSection_10uyv_335",
	nsfwToggle: "_nsfwToggle_10uyv_341",
	nsfwNotice: "_nsfwNotice_10uyv_351",
	installProgress: "_installProgress_10uyv_357",
	workflowToolbarRow: "_workflowToolbarRow_10uyv_366",
	placeholderList: "_placeholderList_10uyv_372",
	placeholderRow: "_placeholderRow_10uyv_378",
	placeholderKey: "_placeholderKey_10uyv_384",
	hiddenFileInput: "_hiddenFileInput_10uyv_395",
	reference_thumbnail: "_reference_thumbnail_10uyv_407"
};
//#endregion
//#region src/ui/views/assets/asset_field_schema.ts
function we(e, t) {
	let n = e[t.key];
	return t.kind === "number" ? typeof n == "number" ? n : 0 : typeof n == "string" ? n : "";
}
function Te(e, t) {
	let n = {};
	for (let r of e) n[r.key] = t ? we(t.payload, r) : r.kind === "number" ? 0 : "";
	return n;
}
function Ee(e) {
	return Te(e, null);
}
function De(e) {
	return typeof e == "string" || typeof e == "number" || typeof e == "boolean" ? String(e) : null;
}
function Oe(e, t) {
	let n = [];
	for (let r of t) {
		let t = e[r.key];
		if (t == null || t === "") continue;
		let i = De(t);
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
var ke = ["for"], Ae = [
	"id",
	"placeholder",
	"aria-label"
], je = [
	"data-dragging",
	"onDragstart",
	"onDrop"
], Me = ["aria-label"], Ne = ["aria-label", "onClick"], X = /* @__PURE__ */ O({
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
		let n = e, a = t, s = m(""), d = m(null), f = m(null), h = S(() => {
			let e = s.value.trim().toLowerCase();
			return e === "" ? n.records : n.records.filter((t) => t.display_name.toLowerCase().includes(e));
		}), _ = S(() => n.loading ? "loading" : n.records.length === 0 ? "empty" : "ready");
		function v(e) {
			return Oe(e.payload, n.summaryFields);
		}
		function b(e) {
			d.value = e;
		}
		function x() {
			d.value && a("delete", d.value.id), d.value = null;
		}
		function w(e, t) {
			let r = n.records.findIndex((t) => t.id === e), i = r + t;
			if (r === -1 || i < 0 || i >= n.records.length) return;
			let o = [...n.records], [s] = o.splice(r, 1);
			s !== void 0 && (o.splice(i, 0, s), a("reorder", o.map((e) => e.id)));
		}
		function D() {
			if (n.records.length === 0) return;
			let e = Math.floor(Math.random() * n.records.length), t = n.records[e];
			t && a("random-select", t);
		}
		function O(e, t) {
			f.value = e, t.dataTransfer?.setData("text/plain", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
		}
		function A(e) {
			e.preventDefault();
		}
		function ee(e, t) {
			t.preventDefault();
			let r = f.value;
			if (f.value = null, !r || r === e) return;
			let i = n.records.findIndex((e) => e.id === r), o = n.records.findIndex((t) => t.id === e);
			if (i === -1 || o === -1) return;
			let s = [...n.records], [c] = s.splice(i, 1);
			c !== void 0 && (s.splice(o, 0, c), a("reorder", s.map((e) => e.id)));
		}
		return (t, n) => (o(), l("div", { class: E(p(Y).categoryList) }, [
			y("div", { class: E(p(Y).categoryToolbar) }, [
				y("label", {
					class: "tc-visually-hidden",
					for: `${e.searchLabel}-search`
				}, C(e.searchLabel), 9, ke),
				i(y("input", {
					id: `${e.searchLabel}-search`,
					"onUpdate:modelValue": n[0] ||= (e) => s.value = e,
					type: "text",
					class: E(p(Y).searchInput),
					placeholder: e.searchPlaceholder,
					"aria-label": e.searchLabel
				}, null, 10, Ae), [[u, s.value]]),
				k(F, {
					label: e.randomLabel,
					icon: p(V),
					variant: "secondary",
					onClick: D
				}, null, 8, ["label", "icon"]),
				k(F, {
					label: e.addLabel,
					icon: p(z),
					variant: "primary",
					onClick: n[1] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])
			], 2),
			e.records.length > 1 ? (o(), l("p", {
				key: 0,
				class: E(p(Y).reorderHint)
			}, C(e.reorderHint), 3)) : g("", !0),
			k(I, {
				status: _.value,
				"empty-title": e.emptyTitle,
				"min-height": "120px"
			}, {
				action: c(() => [y("p", { class: E(p(Y).emptyDescription) }, C(e.emptyDescription), 3), k(F, {
					label: e.addLabel,
					icon: p(z),
					variant: "primary",
					onClick: n[2] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])]),
				default: c(() => [y("ul", { class: E(p(Y).cardGrid) }, [(o(!0), l(T, null, r(h.value, (t) => (o(), l("li", {
					key: t.id,
					class: E(p(Y).assetCard),
					draggable: "true",
					"data-dragging": f.value === t.id ? "" : null,
					onDragstart: (e) => O(t.id, e),
					onDragover: A,
					onDrop: (e) => ee(t.id, e)
				}, [
					y("span", {
						class: E(p(Y).dragHandle),
						"aria-label": e.dragHandleLabel,
						"aria-hidden": "true"
					}, [k(j, {
						icon: p(ge),
						size: 16
					}, null, 8, ["icon"])], 10, Me),
					y("button", {
						type: "button",
						class: E(p(Y).assetCardMain),
						"aria-label": `${e.editLabel}: ${t.display_name}`,
						onClick: (e) => a("edit", t)
					}, [y("span", { class: E(p(Y).assetCardName) }, C(t.display_name), 3), v(t).length > 0 ? (o(), l("span", {
						key: 0,
						class: E(p(Y).assetCardSummary)
					}, [(o(!0), l(T, null, r(v(t), (e) => (o(), l("span", {
						key: e.label,
						class: E([p(Y).assetCardSummaryPart, e.numeric && "tc-tabular-nums"])
					}, C(e.label) + ": " + C(e.value), 3))), 128))], 2)) : g("", !0)], 10, Ne),
					y("div", { class: E(p(Y).assetCardActions) }, [
						k(me, {
							icon: p(N),
							size: "sm",
							label: e.moveUpLabel,
							onClick: (e) => w(t.id, -1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						k(me, {
							icon: p(M),
							size: "sm",
							label: e.moveDownLabel,
							onClick: (e) => w(t.id, 1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						k(me, {
							icon: p(H),
							size: "sm",
							destructive: "",
							label: e.deleteLabel,
							onClick: (e) => b(t)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						])
					], 2)
				], 42, je))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-title"]),
			k(de, {
				open: d.value !== null,
				title: d.value ? e.deleteConfirmTitle(d.value.display_name) : "",
				description: e.deleteConfirmDescription,
				"confirm-label": e.confirmLabel,
				"cancel-label": e.cancelLabel,
				"onUpdate:open": n[3] ||= (e) => {
					e || (d.value = null);
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
}), Pe = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], Fe = [
	"id",
	"value",
	"aria-describedby",
	"onInput"
], Ie = [
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
		saveError: {},
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
		let i = e, s = t;
		function u(e, t) {
			s("update:values", {
				...i.values,
				[e]: t
			});
		}
		function d(e, t) {
			s("update:values", {
				...i.values,
				[e]: t
			});
		}
		function f(e) {
			e.preventDefault(), s("save");
		}
		let m = S(() => i.pending);
		return (t, i) => (o(), l("form", {
			class: E(p(Y).form),
			onSubmit: f
		}, [
			k(B, {
				label: e.nameLabel,
				error: e.nameError,
				required: ""
			}, {
				default: c(({ fieldId: t, describedBy: n, invalid: r }) => [y("input", {
					id: t,
					class: E(p(Y).textInput),
					type: "text",
					placeholder: e.namePlaceholder,
					value: e.name,
					"aria-describedby": n,
					"aria-invalid": r,
					onInput: i[0] ||= (e) => s("update:name", e.target.value)
				}, null, 42, Pe)]),
				_: 1
			}, 8, ["label", "error"]),
			(o(!0), l(T, null, r(e.fields, (t) => (o(), _(B, n({
				key: t.key,
				label: t.label
			}, { ref_for: !0 }, p(ue)({ hint: t.hint })), {
				default: c(({ fieldId: r, describedBy: i }) => [t.kind === "text" ? (o(), l("input", {
					key: 0,
					id: r,
					class: E(p(Y).textInput),
					type: "text",
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => u(t.key, e.target.value)
				}, null, 42, Fe)) : t.kind === "textarea" ? (o(), l("textarea", {
					key: 1,
					id: r,
					class: E(p(Y).textArea),
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => u(t.key, e.target.value)
				}, null, 42, Ie)) : (o(), _(se, n({
					key: 2,
					id: r,
					"model-value": typeof e.values[t.key] == "number" ? e.values[t.key] : 0,
					label: t.label,
					step: t.step ?? 1,
					"decrement-label": e.decrementLabel,
					"increment-label": e.incrementLabel
				}, { ref_for: !0 }, p(ue)({
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
			e.saveError ? (o(), l("p", {
				key: 0,
				class: E(p(Y).formError),
				role: "alert"
			}, C(e.saveError), 3)) : g("", !0),
			y("div", { class: E(p(Y).formActions) }, [k(F, {
				label: e.cancelLabel,
				variant: "secondary",
				type: "button",
				onClick: i[1] ||= (e) => s("cancel")
			}, null, 8, ["label"]), k(F, {
				label: e.saveLabel,
				variant: "primary",
				type: "submit",
				pending: m.value
			}, null, 8, ["label", "pending"])], 2)
		], 34));
	}
});
//#endregion
//#region src/ui/views/assets/use_asset_category_panel.ts
function Q(t, n, r, i, a = []) {
	let o = m(!1), s = m(null), c = m(""), l = m(null), u = m(null), d = e({}), f = m(!1);
	function p() {
		s.value = null, c.value = "", l.value = null, u.value = null, $(d, Ee(r())), o.value = !0;
	}
	function h(e) {
		s.value = e, c.value = e.display_name, l.value = null, u.value = null;
		let t = {};
		for (let n of a) {
			let r = e.payload[n];
			(typeof r == "string" || typeof r == "number") && (t[n] = r);
		}
		$(d, {
			...Te(r(), e),
			...t
		}), o.value = !0;
	}
	function g() {
		o.value = !1;
	}
	async function _() {
		let e = c.value.trim();
		if (e === "") {
			l.value = i();
			return;
		}
		f.value = !0, u.value = null;
		try {
			let r = s.value?.id ?? crypto.randomUUID();
			await n.save_asset(t, {
				id: r,
				category: t,
				record_key: r,
				display_name: e,
				payload: { ...d }
			}), o.value = !1;
		} catch (e) {
			u.value = e instanceof Error ? e.message : String(e);
		} finally {
			f.value = !1;
		}
	}
	function v(e) {
		n.remove_asset(t, e);
	}
	function y(e) {
		n.reorder_assets(t, e);
	}
	function b(e) {
		h(e);
	}
	return {
		dialog_open: o,
		editing_record: s,
		name: c,
		name_error: l,
		save_error: u,
		values: d,
		saving: f,
		open_create: p,
		open_edit: h,
		close_dialog: g,
		save: _,
		remove: v,
		reorder: y,
		random_select: b
	};
}
function $(e, t) {
	for (let t of Object.keys(e)) Reflect.deleteProperty(e, t);
	Object.assign(e, t);
}
//#endregion
//#region src/ui/views/assets/CharacterPanel.vue
var Le = /* @__PURE__ */ O({
	__name: "CharacterPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = b(), r = S(() => [
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
				key: "excluded_traits",
				label: n("assets.characters.excluded_traits_label"),
				kind: "text",
				hint: n("assets.characters.excluded_traits_hint")
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
		return (t, s) => (o(), l("div", null, [k(X, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": p(n)("common.actions.search"),
			"search-placeholder": p(n)("common.actions.search"),
			"empty-title": p(n)("assets.characters.empty_title"),
			"empty-description": p(n)("assets.characters.empty_description"),
			"add-label": p(n)("assets.characters.add_action"),
			"random-label": p(n)("assets.random_selection_action"),
			"reorder-hint": p(n)("assets.reorder_hint"),
			"edit-label": p(n)("common.actions.edit"),
			"delete-label": p(n)("common.actions.delete"),
			"delete-confirm-title": a,
			"delete-confirm-description": p(n)("assets.delete_confirm_description"),
			"confirm-label": p(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": p(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": p(n)("assets.move_up_action"),
			"move-down-label": p(n)("assets.move_down_action"),
			"drag-handle-label": p(n)("assets.drag_handle_label"),
			onAdd: p(i).open_create,
			onEdit: p(i).open_edit,
			onDelete: p(i).remove,
			onReorder: p(i).reorder,
			onRandomSelect: p(i).random_select
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
		]), k(R, {
			open: p(i).dialog_open.value,
			title: p(i).editing_record.value ? p(n)("common.actions.edit") : p(n)("assets.characters.add_action"),
			description: p(n)("assets.form_dialog_description"),
			"close-label": p(n)("common.actions.close"),
			"onUpdate:open": s[2] ||= (e) => {
				e || p(i).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": p(n)("common.labels.name"),
				"name-placeholder": p(n)("common.labels.name"),
				name: p(i).name.value,
				"name-error": p(i).name_error.value,
				"save-error": p(i).save_error.value,
				fields: r.value,
				values: p(i).values,
				"save-label": p(n)("common.actions.save"),
				"cancel-label": p(n)("common.actions.cancel"),
				"decrement-label": p(n)("common.actions.decrease"),
				"increment-label": p(n)("common.actions.increase"),
				pending: p(i).saving.value,
				"onUpdate:name": s[0] ||= (e) => {
					p(i).name.value = e;
				},
				"onUpdate:values": s[1] ||= (e) => p($)(p(i).values, e),
				onSave: p(i).save,
				onCancel: p(i).close_dialog
			}, null, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"save-error",
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
function Re(e, t) {
	switch (t) {
		case "assistant": return e("assets.personas.roles.assistant");
		case "user": return e("assets.personas.roles.user");
	}
}
function ze(e, t) {
	switch (t) {
		case "manual": return e("assets.knowledge.source_types.manual");
		case "imported": return e("assets.knowledge.source_types.imported");
		case "character": return e("assets.knowledge.source_types.character");
	}
}
//#endregion
//#region src/ui/views/assets/KnowledgePanel.vue?vue&type=script&setup=true&lang.ts
var Be = ["id", "aria-describedby"], Ve = ["id", "aria-describedby"], He = ["id", "aria-describedby"], Ue = /* @__PURE__ */ O({
	__name: "KnowledgePanel",
	props: {
		entries: {},
		selectedIds: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = b(), a = m(!1), s = m(null), d = m(!1), f = m(null), h = m(null), v = m(null), x = m(null), w = m(!1), D = m(!1), O = m(!1), A = S(() => [
			"manual",
			"imported",
			"character"
		].map((e) => ({
			value: e,
			label: ze(n, e)
		}))), j = S({
			get: () => s.value?.source_type ?? "manual",
			set: (e) => {
				s.value && (s.value.source_type = e);
			}
		}), M = S(() => new Set(t.selectedIds)), N = S(() => t.selectedIds.length === 0 ? !1 : t.selectedIds.length === t.entries.length || "indeterminate");
		function ee(e) {
			let t = e.split(/[,，]/u).map((e) => e.trim()).filter((e) => e.length > 0);
			return [...new Set(t)];
		}
		function P(e, n) {
			let r = new Set(t.selectedIds);
			n ? r.add(e) : r.delete(e), t.controller.set_knowledge_selection([...r]);
		}
		function te(e) {
			t.controller.set_knowledge_selection(e ? t.entries.map((e) => e.id) : []);
		}
		function L() {
			s.value = {
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
		function z(e) {
			s.value = {
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
			f.value = null, h.value = null, v.value = null;
		}
		function H() {
			a.value = !1, s.value = null;
		}
		async function U() {
			let e = s.value;
			if (!e || d.value) return;
			V();
			let r = e.title.trim(), i = e.content.trim();
			if (r.length === 0 && (f.value = n("errors.validation_required")), i.length === 0 && (h.value = n("errors.validation_required")), !(f.value || h.value)) {
				d.value = !0;
				try {
					await t.controller.save_knowledge_entry({
						id: e.id,
						title: r,
						source_type: e.source_type,
						content: i,
						keywords: ee(e.keywords_text),
						priority: e.priority,
						enabled: e.enabled
					}), H();
				} catch {
					v.value = n("errors.unexpected");
				} finally {
					d.value = !1;
				}
			}
		}
		async function re() {
			let e = x.value;
			if (!(!e || w.value)) {
				w.value = !0;
				try {
					await t.controller.remove_knowledge_entry(e.id), x.value = null;
				} finally {
					w.value = !1;
				}
			}
		}
		async function G() {
			if (!O.value) {
				O.value = !0;
				try {
					await t.controller.bulk_remove_knowledge_entries(t.selectedIds), D.value = !1;
				} finally {
					O.value = !1;
				}
			}
		}
		return (t, m) => (o(), l("div", {
			class: E(p(Y).categoryList),
			"data-testid": "knowledge-panel"
		}, [
			y("div", { class: E(p(Y).categoryToolbar) }, [
				k(F, {
					label: p(n)("assets.knowledge.add_action"),
					onClick: L
				}, null, 8, ["label"]),
				e.entries.length > 0 ? (o(), _(ne, {
					key: 0,
					"model-value": N.value,
					label: p(n)("assets.knowledge.select_all_label"),
					"onUpdate:modelValue": te
				}, null, 8, ["model-value", "label"])) : g("", !0),
				e.selectedIds.length > 0 ? (o(), _(F, {
					key: 1,
					label: p(n)("assets.knowledge.bulk_delete_action", { count: e.selectedIds.length }),
					variant: "destructive",
					"data-testid": "knowledge-bulk-delete",
					onClick: m[0] ||= (e) => D.value = !0
				}, null, 8, ["label"])) : g("", !0)
			], 2),
			k(I, {
				status: e.loading ? "loading" : e.entries.length === 0 ? "empty" : "ready",
				"empty-message": p(n)("assets.knowledge.empty_description")
			}, {
				action: c(() => [k(F, {
					label: p(n)("assets.knowledge.add_action"),
					onClick: L
				}, null, 8, ["label"])]),
				default: c(() => [y("ul", { class: E(p(Y).cardGrid) }, [(o(!0), l(T, null, r(e.entries, (t) => (o(), l("li", {
					key: t.id,
					class: E(p(Y).assetCard),
					"data-testid": "knowledge-card"
				}, [
					k(ne, {
						"model-value": M.value.has(t.id),
						label: p(n)("assets.knowledge.select_label", { title: t.title }),
						"label-hidden": "",
						"onUpdate:modelValue": (e) => P(t.id, e)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					y("div", { class: E(p(Y).assetCardMain) }, [y("span", { class: E(p(Y).assetCardName) }, C(t.title), 3), y("span", { class: E(p(Y).assetCardSummary) }, [
						y("span", { class: E(p(Y).assetCardSummaryPart) }, C(p(ze)(p(n), t.source_type)), 3),
						y("span", { class: E(p(Y).assetCardSummaryPart) }, C(p(n)("assets.knowledge.priority_summary", { priority: t.priority })), 3),
						t.keywords.length > 0 ? (o(), l("span", {
							key: 0,
							class: E(p(Y).assetCardSummaryPart)
						}, C(t.keywords.join(", ")), 3)) : g("", !0)
					], 2)], 2),
					y("div", { class: E(p(Y).assetCardActions) }, [
						k(pe, { content: p(n)("assets.knowledge.enabled_label") }, {
							default: c(() => [k(fe, {
								"model-value": t.enabled,
								label: p(n)("assets.knowledge.enabled_label"),
								"label-hidden": "",
								"onUpdate:modelValue": (n) => e.controller.set_knowledge_entry_enabled(t.id, n)
							}, null, 8, [
								"model-value",
								"label",
								"onUpdate:modelValue"
							])]),
							_: 2
						}, 1032, ["content"]),
						k(F, {
							label: p(n)("common.actions.edit"),
							variant: "secondary",
							onClick: (e) => z(t)
						}, null, 8, ["label", "onClick"]),
						k(F, {
							label: p(n)("common.actions.delete"),
							variant: "destructive",
							onClick: (e) => x.value = t
						}, null, 8, ["label", "onClick"])
					], 2)
				], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			k(R, {
				open: a.value,
				title: s.value?.is_new ? p(n)("assets.knowledge.add_action") : p(n)("common.actions.edit"),
				description: p(n)("assets.form_dialog_description"),
				"close-label": p(n)("common.actions.close"),
				"onUpdate:open": m[7] ||= (e) => !e && H()
			}, {
				default: c(() => [s.value ? (o(), l("div", {
					key: 0,
					class: E(p(Y).form)
				}, [
					k(B, {
						label: p(n)("assets.knowledge.title_label"),
						error: f.value,
						required: ""
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [i(y("input", {
							id: e,
							"onUpdate:modelValue": m[1] ||= (e) => s.value.title = e,
							type: "text",
							"aria-describedby": t,
							class: E(p(Y).textInput)
						}, null, 10, Be), [[u, s.value.title]])]),
						_: 1
					}, 8, ["label", "error"]),
					k(B, {
						label: p(n)("assets.knowledge.source_type_label"),
						required: ""
					}, {
						default: c(({ fieldId: e }) => [k(W, {
							id: e,
							modelValue: j.value,
							"onUpdate:modelValue": m[2] ||= (e) => j.value = e,
							options: A.value,
							placeholder: p(n)("assets.knowledge.source_type_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					k(B, {
						label: p(n)("assets.knowledge.content_label"),
						hint: p(n)("assets.knowledge.content_hint"),
						error: h.value,
						required: ""
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [i(y("textarea", {
							id: e,
							"onUpdate:modelValue": m[3] ||= (e) => s.value.content = e,
							rows: "6",
							"aria-describedby": t,
							class: E(p(Y).textArea)
						}, null, 10, Ve), [[u, s.value.content]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					k(B, {
						label: p(n)("assets.knowledge.keywords_label"),
						hint: p(n)("assets.knowledge.keywords_hint")
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [i(y("input", {
							id: e,
							"onUpdate:modelValue": m[4] ||= (e) => s.value.keywords_text = e,
							type: "text",
							"aria-describedby": t,
							class: E(p(Y).textInput)
						}, null, 10, He), [[u, s.value.keywords_text]])]),
						_: 1
					}, 8, ["label", "hint"]),
					k(B, {
						label: p(n)("assets.knowledge.priority_label"),
						hint: p(n)("assets.knowledge.priority_hint")
					}, {
						default: c(() => [k(se, {
							modelValue: s.value.priority,
							"onUpdate:modelValue": m[5] ||= (e) => s.value.priority = e,
							label: p(n)("assets.knowledge.priority_label"),
							"increment-label": p(n)("common.actions.increase"),
							"decrement-label": p(n)("common.actions.decrease"),
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
					k(fe, {
						modelValue: s.value.enabled,
						"onUpdate:modelValue": m[6] ||= (e) => s.value.enabled = e,
						label: p(n)("assets.knowledge.enabled_label")
					}, null, 8, ["modelValue", "label"]),
					v.value ? (o(), l("p", {
						key: 0,
						class: E(p(Y).emptyDescription),
						"data-tone": "error"
					}, C(v.value), 3)) : g("", !0),
					y("div", { class: E(p(Y).formActions) }, [k(F, {
						label: p(n)("common.actions.save"),
						pending: d.value,
						onClick: U
					}, null, 8, ["label", "pending"]), k(F, {
						label: p(n)("common.actions.cancel"),
						variant: "secondary",
						onClick: H
					}, null, 8, ["label"])], 2)
				], 2)) : g("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			k(de, {
				open: x.value !== null,
				title: p(n)("assets.delete_confirm_title", { name: x.value?.title ?? "" }),
				description: p(n)("assets.knowledge.delete_confirm_description"),
				"confirm-label": p(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": p(n)("confirmations.destructive.default_cancel_action"),
				pending: w.value,
				"onUpdate:open": m[8] ||= (e) => !e && (x.value = null),
				onConfirm: re
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			k(de, {
				open: D.value,
				title: p(n)("assets.knowledge.bulk_delete_confirm_title", { count: e.selectedIds.length }),
				description: p(n)("assets.knowledge.delete_confirm_description"),
				"confirm-label": p(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": p(n)("confirmations.destructive.default_cancel_action"),
				pending: O.value,
				"onUpdate:open": m[9] ||= (e) => D.value = e,
				onConfirm: G
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
}), We = /* @__PURE__ */ O({
	__name: "LoraPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = b(), r = S(() => [{
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
		return (t, u) => (o(), l("div", null, [k(X, {
			records: e.records,
			"summary-fields": i,
			loading: e.loading,
			"search-label": p(n)("common.actions.search"),
			"search-placeholder": p(n)("common.actions.search"),
			"empty-title": p(n)("assets.lora.empty_title"),
			"empty-description": p(n)("assets.lora.empty_description"),
			"add-label": p(n)("assets.lora.add_action"),
			"random-label": p(n)("assets.random_selection_action"),
			"reorder-hint": p(n)("assets.reorder_hint"),
			"edit-label": p(n)("common.actions.edit"),
			"delete-label": p(n)("common.actions.delete"),
			"delete-confirm-title": s,
			"delete-confirm-description": p(n)("assets.delete_confirm_description"),
			"confirm-label": p(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": p(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": p(n)("assets.move_up_action"),
			"move-down-label": p(n)("assets.move_down_action"),
			"drag-handle-label": p(n)("assets.drag_handle_label"),
			onAdd: p(a).open_create,
			onEdit: p(a).open_edit,
			onDelete: p(a).remove,
			onReorder: p(a).reorder,
			onRandomSelect: p(a).random_select
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
		]), k(R, {
			open: p(a).dialog_open.value,
			title: p(a).editing_record.value ? p(n)("common.actions.edit") : p(n)("assets.lora.add_action"),
			description: p(n)("assets.form_dialog_description"),
			"close-label": p(n)("common.actions.close"),
			"onUpdate:open": u[2] ||= (e) => {
				e || p(a).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": p(n)("common.labels.name"),
				"name-placeholder": p(n)("common.labels.name"),
				name: p(a).name.value,
				"name-error": p(a).name_error.value,
				"save-error": p(a).save_error.value,
				fields: r.value,
				values: p(a).values,
				"save-label": p(n)("common.actions.save"),
				"cancel-label": p(n)("common.actions.cancel"),
				"decrement-label": p(n)("common.actions.decrease"),
				"increment-label": p(n)("common.actions.increase"),
				pending: p(a).saving.value,
				"onUpdate:name": u[0] ||= (e) => {
					p(a).name.value = e;
				},
				"onUpdate:values": u[1] ||= (e) => p($)(p(a).values, e),
				onSave: p(a).save,
				onCancel: p(a).close_dialog
			}, null, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"save-error",
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
}), Ge = ["id", "aria-describedby"], Ke = ["id", "aria-describedby"], qe = ["id", "aria-describedby"], Je = /* @__PURE__ */ O({
	__name: "PersonaPanel",
	props: {
		personas: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = b(), a = m(!1), s = m(null), d = m(!1), f = m(null), h = m(null), _ = m(null), v = m(!1), x = S(() => ["assistant", "user"].map((e) => ({
			value: e,
			label: Re(n, e)
		}))), w = S({
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
				is_active: t.personas.length === 0
			}, f.value = null, h.value = null, a.value = !0;
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
			}, f.value = null, h.value = null, a.value = !0;
		}
		function A() {
			a.value = !1, s.value = null;
		}
		async function j() {
			let e = s.value;
			if (!e || d.value) return;
			let r = e.display_name.trim();
			if (r.length === 0) {
				f.value = n("errors.validation_required");
				return;
			}
			f.value = null, h.value = null, d.value = !0;
			try {
				await t.controller.save_persona({
					id: e.id,
					display_name: r,
					role: e.role,
					description: e.description.trim(),
					greeting: e.greeting.trim(),
					avatar_image_id: e.avatar_image_id,
					is_active: e.is_active
				}), A();
			} catch {
				h.value = n("errors.unexpected");
			} finally {
				d.value = !1;
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
			let e = _.value;
			if (!(!e || v.value)) {
				v.value = !0;
				try {
					await t.controller.remove_persona(e.id), _.value = null;
				} finally {
					v.value = !1;
				}
			}
		}
		return (t, m) => (o(), l("div", {
			class: E(p(Y).categoryList),
			"data-testid": "persona-panel"
		}, [
			y("div", { class: E(p(Y).categoryToolbar) }, [k(F, {
				label: p(n)("assets.personas.add_action"),
				onClick: D
			}, null, 8, ["label"])], 2),
			k(I, {
				status: e.loading ? "loading" : e.personas.length === 0 ? "empty" : "ready",
				"empty-message": p(n)("assets.personas.empty_description")
			}, {
				action: c(() => [k(F, {
					label: p(n)("assets.personas.add_action"),
					onClick: D
				}, null, 8, ["label"])]),
				default: c(() => [y("ul", { class: E(p(Y).cardGrid) }, [(o(!0), l(T, null, r(e.personas, (e) => (o(), l("li", {
					key: e.id,
					class: E(p(Y).assetCard),
					"data-testid": "persona-card"
				}, [y("div", { class: E(p(Y).assetCardMain) }, [y("span", { class: E(p(Y).assetCardName) }, C(e.display_name), 3), y("span", { class: E(p(Y).assetCardSummary) }, [y("span", { class: E(p(Y).assetCardSummaryPart) }, C(p(Re)(p(n), e.role)), 3), e.is_active ? (o(), l("span", {
					key: 0,
					class: E(p(Y).assetCardSummaryPart)
				}, C(p(n)("assets.personas.active_badge")), 3)) : g("", !0)], 2)], 2), y("div", { class: E(p(Y).assetCardActions) }, [
					k(fe, {
						"model-value": e.is_active,
						label: p(n)("assets.personas.active_toggle_label"),
						"onUpdate:modelValue": (t) => M(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					k(F, {
						label: p(n)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => O(e)
					}, null, 8, ["label", "onClick"]),
					k(F, {
						label: p(n)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => _.value = e
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			k(R, {
				open: a.value,
				title: s.value?.is_new ? p(n)("assets.personas.add_action") : p(n)("common.actions.edit"),
				description: p(n)("assets.form_dialog_description"),
				"close-label": p(n)("common.actions.close"),
				"onUpdate:open": m[5] ||= (e) => !e && A()
			}, {
				default: c(() => [s.value ? (o(), l("div", {
					key: 0,
					class: E(p(Y).form)
				}, [
					k(B, {
						label: p(n)("common.labels.name"),
						error: f.value,
						required: ""
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [i(y("input", {
							id: e,
							"onUpdate:modelValue": m[0] ||= (e) => s.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: E(p(Y).textInput)
						}, null, 10, Ge), [[u, s.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					k(B, {
						label: p(n)("assets.personas.role_label"),
						required: ""
					}, {
						default: c(({ fieldId: e }) => [k(W, {
							id: e,
							modelValue: w.value,
							"onUpdate:modelValue": m[1] ||= (e) => w.value = e,
							options: x.value,
							placeholder: p(n)("assets.personas.role_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					k(B, {
						label: p(n)("assets.personas.description_label"),
						hint: p(n)("assets.personas.description_hint")
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [i(y("textarea", {
							id: e,
							"onUpdate:modelValue": m[2] ||= (e) => s.value.description = e,
							rows: "4",
							"aria-describedby": t,
							class: E(p(Y).textArea)
						}, null, 10, Ke), [[u, s.value.description]])]),
						_: 1
					}, 8, ["label", "hint"]),
					k(B, {
						label: p(n)("assets.personas.greeting_label"),
						hint: p(n)("assets.personas.greeting_hint")
					}, {
						default: c(({ fieldId: e, describedBy: t }) => [i(y("textarea", {
							id: e,
							"onUpdate:modelValue": m[3] ||= (e) => s.value.greeting = e,
							rows: "3",
							"aria-describedby": t,
							class: E(p(Y).textArea)
						}, null, 10, qe), [[u, s.value.greeting]])]),
						_: 1
					}, 8, ["label", "hint"]),
					k(fe, {
						modelValue: s.value.is_active,
						"onUpdate:modelValue": m[4] ||= (e) => s.value.is_active = e,
						label: p(n)("assets.personas.active_toggle_label")
					}, null, 8, ["modelValue", "label"]),
					h.value ? (o(), l("p", {
						key: 0,
						class: E(p(Y).emptyDescription),
						"data-tone": "error"
					}, C(h.value), 3)) : g("", !0),
					y("div", { class: E(p(Y).formActions) }, [k(F, {
						label: p(n)("common.actions.save"),
						pending: d.value,
						onClick: j
					}, null, 8, ["label", "pending"]), k(F, {
						label: p(n)("common.actions.cancel"),
						variant: "secondary",
						onClick: A
					}, null, 8, ["label"])], 2)
				], 2)) : g("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			k(de, {
				open: _.value !== null,
				title: p(n)("assets.delete_confirm_title", { name: _.value?.display_name ?? "" }),
				description: p(n)("assets.personas.delete_confirm_description"),
				"confirm-label": p(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": p(n)("confirmations.destructive.default_cancel_action"),
				pending: v.value,
				"onUpdate:open": m[6] ||= (e) => !e && (_.value = null),
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
}), Ye = /* @__PURE__ */ O({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: r } = b(), i = S(() => [{
			key: "description",
			label: r("assets.outfits.description_label"),
			kind: "textarea"
		}]), a = [], s = Q("outfit", t.controller, () => i.value, () => r("errors.validation_required")), u = S(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), d = S(() => {
			let e = s.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function f(e) {
			s.values.character_id = e;
		}
		let m = (e) => r("assets.delete_confirm_title", { name: e });
		return (t, h) => (o(), l("div", null, [k(X, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": p(r)("common.actions.search"),
			"search-placeholder": p(r)("common.actions.search"),
			"empty-title": p(r)("assets.outfits.empty_title"),
			"empty-description": p(r)("assets.outfits.empty_description"),
			"add-label": p(r)("assets.outfits.add_action"),
			"random-label": p(r)("assets.random_selection_action"),
			"reorder-hint": p(r)("assets.reorder_hint"),
			"edit-label": p(r)("common.actions.edit"),
			"delete-label": p(r)("common.actions.delete"),
			"delete-confirm-title": m,
			"delete-confirm-description": p(r)("assets.delete_confirm_description"),
			"confirm-label": p(r)("confirmations.destructive.default_confirm_action"),
			"cancel-label": p(r)("confirmations.destructive.default_cancel_action"),
			"move-up-label": p(r)("assets.move_up_action"),
			"move-down-label": p(r)("assets.move_down_action"),
			"drag-handle-label": p(r)("assets.drag_handle_label"),
			onAdd: p(s).open_create,
			onEdit: p(s).open_edit,
			onDelete: p(s).remove,
			onReorder: p(s).reorder,
			onRandomSelect: p(s).random_select
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
		]), k(R, {
			open: p(s).dialog_open.value,
			title: p(s).editing_record.value ? p(r)("common.actions.edit") : p(r)("assets.outfits.add_action"),
			description: p(r)("assets.form_dialog_description"),
			"close-label": p(r)("common.actions.close"),
			"onUpdate:open": h[2] ||= (e) => {
				e || p(s).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": p(r)("common.labels.name"),
				"name-placeholder": p(r)("common.labels.name"),
				name: p(s).name.value,
				"name-error": p(s).name_error.value,
				"save-error": p(s).save_error.value,
				fields: i.value,
				values: p(s).values,
				"save-label": p(r)("common.actions.save"),
				"cancel-label": p(r)("common.actions.cancel"),
				"decrement-label": p(r)("common.actions.decrease"),
				"increment-label": p(r)("common.actions.increase"),
				pending: p(s).saving.value,
				"onUpdate:name": h[0] ||= (e) => {
					p(s).name.value = e;
				},
				"onUpdate:values": h[1] ||= (e) => p($)(p(s).values, e),
				onSave: p(s).save,
				onCancel: p(s).close_dialog
			}, {
				"extra-fields": c(() => [k(B, { label: p(r)("assets.outfits.character_label") }, {
					default: c(({ fieldId: e, describedBy: t }) => [k(W, n({
						id: e,
						"model-value": d.value,
						options: u.value,
						placeholder: p(r)("assets.outfits.character_placeholder")
					}, p(ue)({ describedBy: t }), { "onUpdate:modelValue": f }), null, 16, [
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
				"save-error",
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
}), Xe = /* @__PURE__ */ O({
	__name: "ReferencePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = b(), r = S(() => [{
			key: "source_url",
			label: n("assets.reference.source_url_label"),
			kind: "text"
		}, {
			key: "notes",
			label: n("assets.reference.notes_label"),
			kind: "textarea"
		}]), i = Q("reference", t.controller, () => r.value, () => n("errors.validation_required")), a = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, s) => (o(), l("div", null, [k(X, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": p(n)("common.actions.search"),
			"search-placeholder": p(n)("common.actions.search"),
			"empty-title": p(n)("assets.reference.empty_title"),
			"empty-description": p(n)("assets.reference.empty_description"),
			"add-label": p(n)("assets.reference.add_action"),
			"random-label": p(n)("assets.random_selection_action"),
			"reorder-hint": p(n)("assets.reorder_hint"),
			"edit-label": p(n)("common.actions.edit"),
			"delete-label": p(n)("common.actions.delete"),
			"delete-confirm-title": a,
			"delete-confirm-description": p(n)("assets.delete_confirm_description"),
			"confirm-label": p(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": p(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": p(n)("assets.move_up_action"),
			"move-down-label": p(n)("assets.move_down_action"),
			"drag-handle-label": p(n)("assets.drag_handle_label"),
			onAdd: p(i).open_create,
			onEdit: p(i).open_edit,
			onDelete: p(i).remove,
			onReorder: p(i).reorder,
			onRandomSelect: p(i).random_select
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
		]), k(R, {
			open: p(i).dialog_open.value,
			title: p(i).editing_record.value ? p(n)("common.actions.edit") : p(n)("assets.reference.add_action"),
			description: p(n)("assets.form_dialog_description"),
			"close-label": p(n)("common.actions.close"),
			"onUpdate:open": s[2] ||= (e) => {
				e || p(i).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": p(n)("common.labels.name"),
				"name-placeholder": p(n)("common.labels.name"),
				name: p(i).name.value,
				"name-error": p(i).name_error.value,
				"save-error": p(i).save_error.value,
				fields: r.value,
				values: p(i).values,
				"save-label": p(n)("common.actions.save"),
				"cancel-label": p(n)("common.actions.cancel"),
				"decrement-label": p(n)("common.actions.decrease"),
				"increment-label": p(n)("common.actions.increase"),
				pending: p(i).saving.value,
				"onUpdate:name": s[0] ||= (e) => {
					p(i).name.value = e;
				},
				"onUpdate:values": s[1] ||= (e) => p($)(p(i).values, e),
				onSave: p(i).save,
				onCancel: p(i).close_dialog
			}, null, 8, [
				"name-label",
				"name-placeholder",
				"name",
				"name-error",
				"save-error",
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
}), Ze = ["src", "alt"], Qe = ["id", "aria-describedby"], $e = "novelai", et = "google", tt = /* @__PURE__ */ O({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = b(), r = S(() => [{
			value: $e,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: et,
			label: n("assets.vibe.provider_google")
		}]), i = S(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return s.values.provider !== et && e.push({
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
		}], s = Q("vibe", t.controller, () => i.value, () => n("errors.validation_required"), ["provider", "image"]), u = m(null), d = S(() => typeof s.values.image == "string" && s.values.image !== "" ? s.values.image : null);
		async function f(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				u.value = null;
				try {
					s.values.image = await he(t);
				} catch {
					u.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let h = S(() => typeof s.values.provider == "string" && s.values.provider !== "" ? s.values.provider : $e);
		function _(e) {
			s.values.provider = e;
		}
		let v = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, m) => (o(), l("div", null, [k(X, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": p(n)("common.actions.search"),
			"search-placeholder": p(n)("common.actions.search"),
			"empty-title": p(n)("assets.vibe.empty_title"),
			"empty-description": p(n)("assets.vibe.empty_description"),
			"add-label": p(n)("assets.vibe.add_action"),
			"random-label": p(n)("assets.random_selection_action"),
			"reorder-hint": p(n)("assets.reorder_hint"),
			"edit-label": p(n)("common.actions.edit"),
			"delete-label": p(n)("common.actions.delete"),
			"delete-confirm-title": v,
			"delete-confirm-description": p(n)("assets.delete_confirm_description"),
			"confirm-label": p(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": p(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": p(n)("assets.move_up_action"),
			"move-down-label": p(n)("assets.move_down_action"),
			"drag-handle-label": p(n)("assets.drag_handle_label"),
			onAdd: p(s).open_create,
			onEdit: p(s).open_edit,
			onDelete: p(s).remove,
			onReorder: p(s).reorder,
			onRandomSelect: p(s).random_select
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
		]), k(R, {
			open: p(s).dialog_open.value,
			title: p(s).editing_record.value ? p(n)("common.actions.edit") : p(n)("assets.vibe.add_action"),
			description: p(n)("assets.form_dialog_description"),
			"close-label": p(n)("common.actions.close"),
			"onUpdate:open": m[2] ||= (e) => {
				e || p(s).close_dialog();
			}
		}, {
			default: c(() => [k(Z, {
				"name-label": p(n)("common.labels.name"),
				"name-placeholder": p(n)("common.labels.name"),
				name: p(s).name.value,
				"name-error": p(s).name_error.value,
				"save-error": p(s).save_error.value,
				fields: i.value,
				values: p(s).values,
				"save-label": p(n)("common.actions.save"),
				"cancel-label": p(n)("common.actions.cancel"),
				"decrement-label": p(n)("common.actions.decrease"),
				"increment-label": p(n)("common.actions.increase"),
				pending: p(s).saving.value,
				"onUpdate:name": m[0] ||= (e) => {
					p(s).name.value = e;
				},
				"onUpdate:values": m[1] ||= (e) => p($)(p(s).values, e),
				onSave: p(s).save,
				onCancel: p(s).close_dialog
			}, {
				"extra-fields": c(() => [k(B, {
					label: p(n)("assets.vibe.image_label"),
					hint: p(n)("assets.vibe.image_hint"),
					error: u.value
				}, {
					default: c(({ fieldId: e, describedBy: t }) => [d.value === null ? g("", !0) : (o(), l("img", {
						key: 0,
						src: d.value,
						alt: p(n)("assets.vibe.image_label"),
						class: E(p(Y).reference_thumbnail)
					}, null, 10, Ze)), y("input", {
						id: e,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						"aria-describedby": t,
						"data-testid": "vibe-image-input",
						onChange: f
					}, null, 40, Qe)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), k(B, { label: p(n)("assets.vibe.provider_label") }, {
					default: c(() => [k(ce, {
						"model-value": h.value,
						options: r.value,
						label: p(n)("assets.vibe.provider_label"),
						"onUpdate:modelValue": _
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
				"save-error",
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
}), nt = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, rt = ["placeholder"], it = ["aria-expanded"], at = /* @__PURE__ */ O({
	__name: "VocabularyPanel",
	props: {
		catalog: {},
		installCommand: {},
		loading: { type: Boolean },
		controller: {},
		locale: {}
	},
	setup(e) {
		let n = e, { t: a } = b();
		t(() => {
			n.controller.load_vocabulary_catalog();
		});
		let d = /nsfw|adult|explicit/iu;
		function f(e) {
			return d.test(e.package_id) || d.test(e.display_name.en) || d.test(e.display_name["zh-CN"]);
		}
		let h = S(() => n.catalog.filter((e) => !f(e))), v = S(() => n.catalog.filter((e) => f(e))), x = m(!1);
		function w(e) {
			return n.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let O = m(null), A = m(null);
		function te(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return a("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return a("assets.vocabulary.progress_downloading");
				case "verifying_package": return a("assets.vocabulary.progress_verifying_package");
				case "installing": return a("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function ne(e) {
			O.value === null && (O.value = e.package_id, A.value = null, await n.controller.install_vocabulary_package(e, (e) => {
				A.value = te(e);
			}), O.value = null, A.value = null, n.controller.state.assets.vocabulary_install_command.status === "success" && (R.value = [], z.value = null, L.value.trim() !== "" && await W()));
		}
		let L = m(""), R = m([]), z = m(null), B = m(!1), V = m(!1), H = m(null), U = null;
		async function W() {
			let e = L.value.trim();
			if (e === "") {
				R.value = [], z.value = null;
				return;
			}
			B.value = !0;
			try {
				let t = await n.controller.search_vocabulary(e);
				R.value = t.results, z.value = t.next_cursor;
			} finally {
				B.value = !1;
			}
		}
		async function re() {
			if (z.value !== null) {
				V.value = !0;
				try {
					let e = await n.controller.load_more_vocabulary(z.value);
					R.value = [...R.value, ...e.results], z.value = e.next_cursor;
				} finally {
					V.value = !1;
				}
			}
		}
		s(L, () => {
			U !== null && clearTimeout(U), U = setTimeout(() => {
				W();
			}, 250);
		});
		async function G(e) {
			await navigator.clipboard.writeText(e.display_text), H.value = e.record_id, setTimeout(() => {
				H.value === e.record_id && (H.value = null);
			}, 2e3);
		}
		let K = S(() => n.loading ? "loading" : n.catalog.length === 0 ? "empty" : "ready"), ie = S(() => B.value && R.value.length === 0 ? "loading" : L.value.trim() === "" || R.value.length > 0 ? "ready" : "empty");
		return (e, t) => (o(), l("div", { class: E(p(Y).vocabularyPanel) }, [
			y("section", null, [
				y("p", { class: E(p(Y).sectionTitle) }, C(p(a)("assets.vocabulary.search_placeholder")), 3),
				y("div", { class: E(p(Y).vocabularySearchRow) }, [y("label", nt, C(p(a)("assets.vocabulary.search_placeholder")), 1), i(y("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
					type: "text",
					class: E(p(Y).searchInput),
					placeholder: p(a)("assets.vocabulary.search_placeholder")
				}, null, 10, rt), [[u, L.value]])], 2),
				k(I, {
					status: ie.value,
					"empty-title": p(a)("assets.vocabulary.empty_title"),
					"empty-message": p(a)("assets.vocabulary.empty_description"),
					"min-height": "60px"
				}, {
					default: c(() => [R.value.length > 0 ? (o(), l("ul", {
						key: 0,
						class: E(p(Y).searchResultsList)
					}, [(o(!0), l(T, null, r(R.value, (e) => (o(), l("li", {
						key: e.record_id,
						class: E(p(Y).searchResultRow)
					}, [
						y("span", { class: E(p(Y).searchResultTag) }, C(e.display_text), 3),
						e.category ? (o(), l("span", {
							key: 0,
							class: E(p(Y).searchResultTranslation)
						}, C(e.category), 3)) : g("", !0),
						k(F, {
							label: H.value === e.record_id ? p(a)("common.actions.copied") : p(a)("common.actions.copy"),
							icon: p(ee),
							variant: "secondary",
							onClick: () => void G(e)
						}, null, 8, [
							"label",
							"icon",
							"onClick"
						])
					], 2))), 128))], 2)) : g("", !0)]),
					_: 1
				}, 8, [
					"status",
					"empty-title",
					"empty-message"
				]),
				z.value === null ? g("", !0) : (o(), l("div", {
					key: 0,
					class: E(p(Y).loadMoreRow)
				}, [k(F, {
					label: p(a)("common.actions.next"),
					variant: "secondary",
					pending: V.value,
					onClick: t[1] ||= () => void re()
				}, null, 8, ["label", "pending"])], 2))
			]),
			y("section", null, [
				y("p", { class: E(p(Y).sectionTitle) }, C(p(a)("assets.vocabulary.update_action")), 3),
				k(I, {
					status: K.value,
					"empty-title": p(a)("assets.vocabulary.empty_title"),
					"empty-message": p(a)("assets.vocabulary.empty_description"),
					"min-height": "80px"
				}, {
					default: c(() => [y("div", { class: E(p(Y).catalogList) }, [(o(!0), l(T, null, r(h.value, (e) => (o(), l("div", {
						key: e.package_id,
						class: E(p(Y).catalogEntry)
					}, [y("div", { class: E(p(Y).catalogEntryInfo) }, [y("span", { class: E(p(Y).catalogEntryName) }, C(w(e)), 3), y("span", { class: E(["tc-tabular-nums", p(Y).catalogEntryMeta]) }, C(p(a)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (o(), l("span", {
						key: 0,
						class: E(p(Y).bundledBadge)
					}, C(p(a)("assets.vocabulary.bundled_label")), 3)) : (o(), _(F, {
						key: 1,
						label: p(a)("assets.vocabulary.import_action"),
						icon: p(P),
						variant: "primary",
						pending: O.value === e.package_id,
						onClick: () => void ne(e)
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
				O.value !== null && A.value !== null ? (o(), l("p", {
					key: 0,
					class: E(p(Y).installProgress)
				}, C(A.value), 3)) : g("", !0)
			]),
			v.value.length > 0 ? (o(), l("section", {
				key: 0,
				class: E(p(Y).nsfwSection)
			}, [y("button", {
				type: "button",
				class: E(["tc-interactive", p(Y).nsfwToggle]),
				"aria-expanded": x.value,
				onClick: t[2] ||= (e) => x.value = !x.value
			}, [k(j, {
				icon: x.value ? p(N) : p(M),
				size: 14
			}, null, 8, ["icon"]), D(" " + C(p(a)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, it), x.value ? (o(), l("div", {
				key: 1,
				class: E(p(Y).catalogList)
			}, [y("p", { class: E(p(Y).nsfwNotice) }, C(p(a)("assets.vocabulary.nsfw_disclosure_hint")), 3), (o(!0), l(T, null, r(v.value, (e) => (o(), l("div", {
				key: e.package_id,
				class: E(p(Y).catalogEntry)
			}, [y("div", { class: E(p(Y).catalogEntryInfo) }, [y("span", { class: E(p(Y).catalogEntryName) }, C(w(e)), 3), y("span", { class: E(["tc-tabular-nums", p(Y).catalogEntryMeta]) }, C(p(a)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), k(F, {
				label: p(a)("assets.vocabulary.import_action"),
				icon: p(P),
				variant: "destructive",
				pending: O.value === e.package_id,
				onClick: () => void ne(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (o(), l("p", {
				key: 0,
				class: E(p(Y).nsfwNotice)
			}, C(p(a)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : g("", !0)
		], 2));
	}
}), ot = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, st = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function ct(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(ot)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var lt = ["aria-label"], ut = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], dt = ["id", "value"], ft = "unmapped", pt = "{{", mt = "}}", ht = /* @__PURE__ */ O({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: i } = b(), a = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], u = Q("workflow", t.controller, () => a, () => n("errors.validation_required")), d = m(null), h = m([]);
		function v(e) {
			switch (e) {
				case "positive_prompt": return n("assets.workflow.target_positive_prompt");
				case "negative_prompt": return n("assets.workflow.target_negative_prompt");
				case "seed": return n("assets.workflow.target_seed");
				case "width": return n("assets.workflow.target_width");
				case "height": return n("assets.workflow.target_height");
				case "steps": return n("assets.workflow.target_steps");
			}
		}
		let x = S(() => [{
			value: ft,
			label: n("assets.workflow.placeholder_unmapped")
		}, ...st.map((e) => ({
			value: e,
			label: v(e)
		}))]);
		function w() {
			let e = u.values.workflow_json;
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
			h.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		s(() => u.editing_record.value, (e) => {
			e ? D(e.payload) : h.value = [];
		}, { immediate: !0 });
		function O() {
			let e = ct(w()), t = new Map(h.value.map((e) => [e.name, e.target]));
			h.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function A(e, t) {
			let n = h.value.find((t) => t.name === e);
			n && (n.target = t === ft ? "" : t);
		}
		function j() {
			d.value?.click();
		}
		function M(e) {
			return `${pt}${e}${mt}`;
		}
		async function N(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			u.open_create(), u.name.value = n.name.replace(/\.json$/iu, ""), u.values.workflow_json = r, h.value = ct(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function ee() {
			let e = {};
			for (let t of h.value) e[t.name] = t.target;
			u.values.placeholder_map = JSON.stringify(e), await u.save();
		}
		let P = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, a) => (o(), l("div", null, [
			y("div", { class: E(p(Y).workflowToolbarRow) }, [k(F, {
				label: p(n)("assets.workflow.import_action"),
				icon: p(U),
				variant: "primary",
				onClick: j
			}, null, 8, ["label", "icon"]), y("input", {
				ref_key: "file_input",
				ref: d,
				class: E(p(Y).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": p(n)("assets.workflow.import_action"),
				onChange: a[0] ||= (e) => void N(e)
			}, null, 42, lt)], 2),
			k(X, {
				records: e.records,
				"summary-fields": [],
				loading: e.loading,
				"search-label": p(n)("common.actions.search"),
				"search-placeholder": p(n)("common.actions.search"),
				"empty-title": p(n)("assets.workflow.empty_title"),
				"empty-description": p(n)("assets.workflow.empty_description"),
				"add-label": p(n)("assets.workflow.import_action"),
				"random-label": p(n)("assets.random_selection_action"),
				"reorder-hint": p(n)("assets.reorder_hint"),
				"edit-label": p(n)("assets.workflow.edit_action"),
				"delete-label": p(n)("common.actions.delete"),
				"delete-confirm-title": P,
				"delete-confirm-description": p(n)("assets.delete_confirm_description"),
				"confirm-label": p(n)("confirmations.destructive.default_confirm_action"),
				"cancel-label": p(n)("confirmations.destructive.default_cancel_action"),
				"move-up-label": p(n)("assets.move_up_action"),
				"move-down-label": p(n)("assets.move_down_action"),
				"drag-handle-label": p(n)("assets.drag_handle_label"),
				onAdd: j,
				onEdit: p(u).open_edit,
				onDelete: p(u).remove,
				onReorder: p(u).reorder,
				onRandomSelect: p(u).random_select
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
			k(R, {
				open: p(u).dialog_open.value,
				title: p(n)("assets.workflow.edit_action"),
				description: p(n)("assets.form_dialog_description"),
				"close-label": p(n)("common.actions.close"),
				"onUpdate:open": a[4] ||= (e) => {
					e || p(u).close_dialog();
				}
			}, {
				default: c(() => [y("form", {
					class: E(p(Y).form),
					onSubmit: a[3] ||= f(() => void ee(), ["prevent"])
				}, [
					k(B, {
						label: p(n)("common.labels.name"),
						error: p(u).name_error.value,
						required: ""
					}, {
						default: c(({ fieldId: e, describedBy: t, invalid: r }) => [y("input", {
							id: e,
							class: E(p(Y).textInput),
							type: "text",
							placeholder: p(n)("common.labels.name"),
							value: p(u).name.value,
							"aria-describedby": t,
							"aria-invalid": r,
							onInput: a[1] ||= (e) => p(u).name.value = e.target.value
						}, null, 42, ut)]),
						_: 1
					}, 8, ["label", "error"]),
					k(B, { label: p(n)("assets.workflow.json_label") }, {
						default: c(({ fieldId: e }) => [y("textarea", {
							id: e,
							class: E(p(Y).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: w(),
							onInput: a[2] ||= (e) => p(u).values.workflow_json = e.target.value
						}, null, 42, dt)]),
						_: 1
					}, 8, ["label"]),
					k(F, {
						label: p(n)("assets.workflow.placeholder_scan_action"),
						icon: p(_e),
						variant: "secondary",
						type: "button",
						onClick: O
					}, null, 8, ["label", "icon"]),
					h.value.length > 0 ? (o(), l("div", {
						key: 0,
						class: E(p(Y).placeholderList)
					}, [(o(!0), l(T, null, r(h.value, (e) => (o(), l("div", {
						key: e.name,
						class: E(p(Y).placeholderRow)
					}, [y("span", { class: E(p(Y).placeholderKey) }, C(M(e.name)), 3), (o(), _(W, {
						key: p(i),
						"model-value": e.target === "" ? ft : e.target,
						options: x.value,
						placeholder: p(n)("assets.workflow.placeholder_unmapped"),
						ariaLabel: e.name,
						"onUpdate:modelValue": (t) => A(e.name, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128))], 2)) : g("", !0),
					y("div", { class: E(p(Y).formActions) }, [k(F, {
						label: p(n)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: p(u).close_dialog
					}, null, 8, ["label", "onClick"]), k(F, {
						label: p(n)("common.actions.save"),
						variant: "primary",
						type: "submit",
						pending: p(u).saving.value
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
}), gt = /* @__PURE__ */ O({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n, locale: r } = b(), i = /* @__PURE__ */ new Set([
			"character",
			"outfit",
			"lora",
			"vibe",
			"reference",
			"workflow"
		]), a = m(t.state.assets.active_category);
		function s(e) {
			a.value = e, i.has(e) && t.controller.set_active_asset_category(e);
		}
		let u = S(() => t.state.loading.has("assets")), d = S(() => t.state.loading.has("personas")), f = S(() => t.state.loading.has("knowledge")), h = S(() => t.state.loading.has("vocabulary")), g = S(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (o(), l("div", { class: E(p(Y).assetsView) }, [k(p(be), {
			"model-value": a.value,
			"onUpdate:modelValue": s
		}, {
			default: c(() => [
				k(p(Ce), {
					class: E(p(Y).tabsList),
					"aria-label": p(n)("nav.assets")
				}, {
					default: c(() => [
						k(p(J), {
							value: "vocabulary",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.vocabulary")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(p(J), {
							value: "persona",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.personas")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(p(J), {
							value: "knowledge",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.knowledge")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(p(J), {
							value: "character",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.characters")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(p(J), {
							value: "outfit",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.outfits")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(p(J), {
							value: "lora",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.lora")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(p(J), {
							value: "vibe",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.vibe")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(p(J), {
							value: "reference",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.reference")), 1)]),
							_: 1
						}, 8, ["class"]),
						k(p(J), {
							value: "workflow",
							class: E(p(Y).tabsTrigger)
						}, {
							default: c(() => [D(C(p(n)("assets.tabs.workflow")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					_: 1
				}, 8, ["class", "aria-label"]),
				k(p(q), {
					value: "vocabulary",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(at, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						loading: h.value,
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
				k(p(q), {
					value: "persona",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(Je, {
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
				k(p(q), {
					value: "knowledge",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(Ue, {
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
				k(p(q), {
					value: "character",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(Le, {
						records: e.state.assets.records.character,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(p(q), {
					value: "outfit",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(Ye, {
						records: e.state.assets.records.outfit,
						"character-records": e.state.assets.records.character,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(p(q), {
					value: "lora",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(We, {
						records: e.state.assets.records.lora,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(p(q), {
					value: "vibe",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(tt, {
						records: e.state.assets.records.vibe,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(p(q), {
					value: "reference",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(Xe, {
						records: e.state.assets.records.reference,
						loading: u.value,
						controller: e.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				k(p(q), {
					value: "workflow",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(ht, {
						records: e.state.assets.records.workflow,
						loading: u.value,
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
export { gt as default };
