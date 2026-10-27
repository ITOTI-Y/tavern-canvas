import { $ as e, A as t, D as n, F as r, G as i, I as a, N as o, V as s, W as c, _ as l, a as u, at as d, c as f, ct as p, et as m, ft as h, g, h as _, k as v, m as y, n as b, nt as x, p as S, pt as C, s as w, u as T, ut as E, v as D, x as O, y as k } from "./vue-i18n-DUz2Gjn8.js";
import { n as A, t as j } from "./AppIcon-Cnhzrx9o.js";
import { t as ee } from "./chevron-down-Tu_8qTxg.js";
import { t as te } from "./chevron-up-D4TetO-M.js";
import { n as ne, t as re } from "./download-DHgWv1wH.js";
import { n as M, t as N } from "./StateSurface-Bo_sA18G.js";
import { i as ie, n as P, r as F, t as I } from "./AppDialog-BizR-VGE.js";
import { n as L, t as R } from "./FieldGroup-LDtWeac7.js";
import { t as z } from "./shuffle-BAB9O4dE.js";
import { t as B } from "./trash-2-B6ZXZcor.js";
import { t as V } from "./upload-CQtsg_mB.js";
import { n as H, t as U } from "./AppSelect-CIW6ICNh.js";
import { _ as ae, c as W, i as G, j as oe, o as se, s as ce } from "./Teleport-C7mDSUEl.js";
import { n as le, t as ue } from "./NumberStepper-jpxDjrkG.js";
import { c as de } from "./PopperContent-a3U-C0mc.js";
import { t as fe } from "./ConfirmDialog-B3fuCaB9.js";
import { t as K } from "./IconButton-CKVrOjmk.js";
import { t as pe } from "./reference_image-DYyYuujP.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/grip-vertical.js
var me = A("grip-vertical", [
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
]), he = A("scan-search", [
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
]), [ge, _e] = /*#__PURE__*/ oe("TabsRoot"), ve = /* @__PURE__ */ O({
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
		let n = e, r = t, { orientation: i, unmountOnHide: s, dir: l } = d(n), u = de(l);
		W();
		let f = ae(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), h = m(), g = x(/* @__PURE__ */ new Set());
		return _e({
			modelValue: f,
			changeModelValue: (e) => {
				f.value = e;
			},
			orientation: i,
			dir: u,
			unmountOnHide: s,
			activationMode: n.activationMode,
			baseId: ce(void 0, "reka-tabs"),
			tabsList: h,
			contentIds: g,
			registerContent: (e) => {
				g.value = /* @__PURE__ */ new Set([...g.value, e]);
			},
			unregisterContent: (e) => {
				let t = new Set(g.value);
				t.delete(e), g.value = t;
			}
		}), (e, t) => (o(), _(p(G), {
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
function ye(e, t) {
	return `${e}-trigger-${t}`;
}
function be(e, t) {
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
		let n = e, { forwardRef: r } = W(), i = ge(), s = S(() => ye(i.baseId, n.value)), l = S(() => be(i.baseId, n.value)), u = S(() => n.value === i.modelValue.value), d = m(u.value);
		return t(() => {
			i.registerContent(n.value), requestAnimationFrame(() => {
				d.value = !1;
			});
		}), v(() => {
			i.unregisterContent(n.value);
		}), (e, t) => (o(), _(p(se), {
			present: e.forceMount || u.value,
			"force-mount": ""
		}, {
			default: c(({ present: t }) => [k(p(G), {
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
}), xe = /* @__PURE__ */ O({
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
		let { loop: t } = d(e), { forwardRef: n, currentElement: r } = W(), i = ge();
		return i.tabsList = r, (e, r) => (o(), _(p(ie), {
			"as-child": "",
			orientation: p(i).orientation.value,
			dir: p(i).dir.value,
			loop: p(t)
		}, {
			default: c(() => [k(p(G), {
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
		let t = e, { forwardRef: n } = W(), r = ge(), i = S(() => ye(r.baseId, t.value)), s = S(() => r.contentIds.value.has(t.value) ? be(r.baseId, t.value) : void 0), l = S(() => t.value === r.modelValue.value);
		return (e, t) => (o(), _(p(F), {
			"as-child": "",
			focusable: !e.disabled,
			active: l.value
		}, {
			default: c(() => [k(p(G), {
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
function Se(e, t) {
	let n = e[t.key];
	return t.kind === "number" ? typeof n == "number" ? n : 0 : typeof n == "string" ? n : "";
}
function Ce(e, t) {
	let n = {};
	for (let r of e) n[r.key] = t ? Se(t.payload, r) : r.kind === "number" ? 0 : "";
	return n;
}
function we(e) {
	return Ce(e, null);
}
function Te(e) {
	return typeof e == "string" || typeof e == "number" || typeof e == "boolean" ? String(e) : null;
}
function Ee(e, t) {
	let n = [];
	for (let r of t) {
		let t = e[r.key];
		if (t == null || t === "") continue;
		let i = Te(t);
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
var De = ["for"], Oe = [
	"id",
	"placeholder",
	"aria-label"
], ke = [
	"data-dragging",
	"onDragstart",
	"onDrop"
], Ae = ["aria-label"], je = ["aria-label", "onClick"], X = /* @__PURE__ */ O({
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
			return Ee(e.payload, n.summaryFields);
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
		function ne(e, t) {
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
				}, C(e.searchLabel), 9, De),
				i(y("input", {
					id: `${e.searchLabel}-search`,
					"onUpdate:modelValue": n[0] ||= (e) => s.value = e,
					type: "text",
					class: E(p(Y).searchInput),
					placeholder: e.searchPlaceholder,
					"aria-label": e.searchLabel
				}, null, 10, Oe), [[u, s.value]]),
				k(M, {
					label: e.randomLabel,
					icon: p(z),
					variant: "secondary",
					onClick: D
				}, null, 8, ["label", "icon"]),
				k(M, {
					label: e.addLabel,
					icon: p(L),
					variant: "primary",
					onClick: n[1] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])
			], 2),
			e.records.length > 1 ? (o(), l("p", {
				key: 0,
				class: E(p(Y).reorderHint)
			}, C(e.reorderHint), 3)) : g("", !0),
			k(N, {
				status: _.value,
				"empty-title": e.emptyTitle,
				"min-height": "120px"
			}, {
				action: c(() => [y("p", { class: E(p(Y).emptyDescription) }, C(e.emptyDescription), 3), k(M, {
					label: e.addLabel,
					icon: p(L),
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
					onDrop: (e) => ne(t.id, e)
				}, [
					y("span", {
						class: E(p(Y).dragHandle),
						"aria-label": e.dragHandleLabel,
						"aria-hidden": "true"
					}, [k(j, {
						icon: p(me),
						size: 16
					}, null, 8, ["icon"])], 10, Ae),
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
					}, C(e.label) + ": " + C(e.value), 3))), 128))], 2)) : g("", !0)], 10, je),
					y("div", { class: E(p(Y).assetCardActions) }, [
						k(K, {
							icon: p(te),
							size: "sm",
							label: e.moveUpLabel,
							onClick: (e) => w(t.id, -1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						k(K, {
							icon: p(ee),
							size: "sm",
							label: e.moveDownLabel,
							onClick: (e) => w(t.id, 1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						k(K, {
							icon: p(B),
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
				], 42, ke))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-title"]),
			k(fe, {
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
}), Me = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], Ne = [
	"id",
	"value",
	"aria-describedby",
	"onInput"
], Pe = [
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
			k(R, {
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
				}, null, 42, Me)]),
				_: 1
			}, 8, ["label", "error"]),
			(o(!0), l(T, null, r(e.fields, (t) => (o(), _(R, n({
				key: t.key,
				label: t.label
			}, { ref_for: !0 }, p(H)({ hint: t.hint })), {
				default: c(({ fieldId: r, describedBy: i }) => [t.kind === "text" ? (o(), l("input", {
					key: 0,
					id: r,
					class: E(p(Y).textInput),
					type: "text",
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => u(t.key, e.target.value)
				}, null, 42, Ne)) : t.kind === "textarea" ? (o(), l("textarea", {
					key: 1,
					id: r,
					class: E(p(Y).textArea),
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => u(t.key, e.target.value)
				}, null, 42, Pe)) : (o(), _(ue, n({
					key: 2,
					id: r,
					"model-value": typeof e.values[t.key] == "number" ? e.values[t.key] : 0,
					label: t.label,
					step: t.step ?? 1,
					"decrement-label": e.decrementLabel,
					"increment-label": e.incrementLabel
				}, { ref_for: !0 }, p(H)({
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
			y("div", { class: E(p(Y).formActions) }, [k(M, {
				label: e.cancelLabel,
				variant: "secondary",
				type: "button",
				onClick: i[1] ||= (e) => s("cancel")
			}, null, 8, ["label"]), k(M, {
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
		s.value = null, c.value = "", l.value = null, u.value = null, $(d, we(r())), o.value = !0;
	}
	function h(e) {
		s.value = e, c.value = e.display_name, l.value = null, u.value = null;
		let t = {};
		for (let n of a) {
			let r = e.payload[n];
			(typeof r == "string" || typeof r == "number") && (t[n] = r);
		}
		$(d, {
			...Ce(r(), e),
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
//#region src/ui/views/assets/CharacterPanel.vue?vue&type=script&setup=true&lang.ts
var Fe = ["src", "alt"], Ie = ["id", "aria-describedby"], Le = /* @__PURE__ */ O({
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
			}
		]), i = [
			"reference_image",
			"reference_send",
			"reference_mode"
		], a = Q("character", t.controller, () => r.value, () => n("errors.validation_required"), i), s = S(() => [
			{
				value: "vibe",
				label: n("assets.characters.reference_mode_vibe")
			},
			{
				value: "img2img",
				label: n("assets.characters.reference_mode_img2img")
			},
			{
				value: "precise",
				label: n("assets.characters.reference_mode_precise")
			}
		]), u = m(null), d = S(() => typeof a.values.reference_image == "string" && a.values.reference_image !== "" ? a.values.reference_image : null), f = S(() => typeof a.values.reference_mode == "string" ? a.values.reference_mode : "vibe");
		async function h(e) {
			let t = e.target.files?.[0];
			if (t !== void 0) {
				u.value = null;
				try {
					a.values.reference_image = await pe(t), a.values.reference_mode = f.value;
				} catch {
					u.value = n("assets.characters.reference_image_unreadable");
				}
			}
		}
		function v() {
			for (let e of i) Reflect.deleteProperty(a.values, e);
		}
		let x = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, i) => (o(), l("div", null, [k(X, {
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
			"delete-confirm-title": x,
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
		]), k(I, {
			open: p(a).dialog_open.value,
			title: p(a).editing_record.value ? p(n)("common.actions.edit") : p(n)("assets.characters.add_action"),
			description: p(n)("assets.form_dialog_description"),
			"close-label": p(n)("common.actions.close"),
			"onUpdate:open": i[4] ||= (e) => {
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
				"onUpdate:name": i[2] ||= (e) => {
					p(a).name.value = e;
				},
				"onUpdate:values": i[3] ||= (e) => p($)(p(a).values, e),
				onSave: p(a).save,
				onCancel: p(a).close_dialog
			}, {
				"extra-fields": c(() => [k(R, {
					label: p(n)("assets.characters.reference_image_label"),
					hint: p(n)("assets.characters.reference_image_hint"),
					error: u.value
				}, {
					default: c(({ fieldId: e, describedBy: t }) => [
						d.value === null ? g("", !0) : (o(), l("img", {
							key: 0,
							src: d.value,
							alt: p(n)("assets.characters.reference_image_label"),
							class: E(p(Y).reference_thumbnail)
						}, null, 10, Fe)),
						y("input", {
							id: e,
							type: "file",
							accept: "image/png,image/jpeg,image/webp",
							"aria-describedby": t,
							"data-testid": "character-reference-input",
							onChange: h
						}, null, 40, Ie),
						d.value === null ? g("", !0) : (o(), _(M, {
							key: 1,
							label: p(n)("assets.characters.reference_image_remove"),
							onClick: v
						}, null, 8, ["label"]))
					]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), d.value === null ? g("", !0) : (o(), l(T, { key: 0 }, [k(P, {
					"model-value": p(a).values.reference_send === 1,
					label: p(n)("assets.characters.reference_send_label"),
					"onUpdate:modelValue": i[0] ||= (e) => p(a).values.reference_send = +!!e
				}, null, 8, ["model-value", "label"]), k(R, {
					label: p(n)("assets.characters.reference_mode_label"),
					hint: p(n)("assets.characters.reference_mode_hint")
				}, {
					default: c(() => [k(le, {
						"model-value": f.value,
						options: s.value,
						label: p(n)("assets.characters.reference_mode_label"),
						"onUpdate:modelValue": i[1] ||= (e) => p(a).values.reference_mode = e
					}, null, 8, [
						"model-value",
						"options",
						"label"
					])]),
					_: 1
				}, 8, ["label", "hint"])], 64))]),
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
}), Re = /* @__PURE__ */ O({
	__name: "LoraPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: r } = b(), i = S(() => [
			{
				key: "file_name",
				label: r("assets.lora.file_name_label"),
				kind: "text",
				required: !0,
				hint: r("assets.lora.file_name_hint")
			},
			{
				key: "trigger_words",
				label: r("assets.lora.trigger_words_label"),
				kind: "text"
			},
			{
				key: "weight",
				label: r("assets.lora.weight_label"),
				kind: "number",
				min: 0,
				max: 2,
				step: .05
			}
		]), a = [
			{
				key: "file_name",
				label: r("assets.lora.file_name_label")
			},
			{
				key: "weight",
				label: r("assets.lora.weight_label"),
				numeric: !0
			},
			{
				key: "trigger_words",
				label: r("assets.lora.trigger_words_label")
			}
		], s = Q("lora", t.controller, () => i.value, () => r("errors.validation_required"), ["character_id"]);
		function u() {
			s.open_create(), s.values.weight = 1;
		}
		let d = S(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), f = S(() => {
			let e = s.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		}), m = (e) => r("assets.delete_confirm_title", { name: e });
		return (t, h) => (o(), l("div", null, [k(X, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": p(r)("common.actions.search"),
			"search-placeholder": p(r)("common.actions.search"),
			"empty-title": p(r)("assets.lora.empty_title"),
			"empty-description": p(r)("assets.lora.empty_description"),
			"add-label": p(r)("assets.lora.add_action"),
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
			onAdd: u,
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
			"onEdit",
			"onDelete",
			"onReorder",
			"onRandomSelect"
		]), k(I, {
			open: p(s).dialog_open.value,
			title: p(s).editing_record.value ? p(r)("common.actions.edit") : p(r)("assets.lora.add_action"),
			description: p(r)("assets.form_dialog_description"),
			"close-label": p(r)("common.actions.close"),
			"onUpdate:open": h[3] ||= (e) => {
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
				"onUpdate:name": h[1] ||= (e) => {
					p(s).name.value = e;
				},
				"onUpdate:values": h[2] ||= (e) => p($)(p(s).values, e),
				onSave: p(s).save,
				onCancel: p(s).close_dialog
			}, {
				"extra-fields": c(() => [k(R, {
					label: p(r)("assets.lora.character_label"),
					hint: p(r)("assets.lora.character_hint")
				}, {
					default: c(({ fieldId: e, describedBy: t }) => [k(U, n({
						id: e,
						"model-value": f.value,
						options: d.value,
						placeholder: p(r)("assets.lora.character_placeholder")
					}, p(H)({ describedBy: t }), { "onUpdate:modelValue": h[0] ||= (e) => p(s).values.character_id = e }), null, 16, [
						"id",
						"model-value",
						"options",
						"placeholder"
					])]),
					_: 1
				}, 8, ["label", "hint"])]),
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
}), ze = /* @__PURE__ */ O({
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
		}]), a = [], s = Q("outfit", t.controller, () => i.value, () => r("errors.validation_required"), ["character_id"]), u = S(() => t.characterRecords.map((e) => ({
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
		]), k(I, {
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
				"extra-fields": c(() => [k(R, { label: p(r)("assets.outfits.character_label") }, {
					default: c(({ fieldId: e, describedBy: t }) => [k(U, n({
						id: e,
						"model-value": d.value,
						options: u.value,
						placeholder: p(r)("assets.outfits.character_placeholder")
					}, p(H)({ describedBy: t }), { "onUpdate:modelValue": f }), null, 16, [
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
}), Be = ["src", "alt"], Ve = ["id", "aria-describedby"], He = "novelai", Ue = "google", We = /* @__PURE__ */ O({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = b(), r = S(() => [{
			value: He,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: Ue,
			label: n("assets.vibe.provider_google")
		}]), i = S(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return s.values.provider !== Ue && e.push({
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
					s.values.image = await pe(t);
				} catch {
					u.value = n("assets.vibe.image_unreadable");
				}
			}
		}
		let h = S(() => typeof s.values.provider == "string" && s.values.provider !== "" ? s.values.provider : He);
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
		]), k(I, {
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
				"extra-fields": c(() => [k(R, {
					label: p(n)("assets.vibe.image_label"),
					hint: p(n)("assets.vibe.image_hint"),
					error: u.value
				}, {
					default: c(({ fieldId: e, describedBy: t }) => [d.value === null ? g("", !0) : (o(), l("img", {
						key: 0,
						src: d.value,
						alt: p(n)("assets.vibe.image_label"),
						class: E(p(Y).reference_thumbnail)
					}, null, 10, Be)), y("input", {
						id: e,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						"aria-describedby": t,
						"data-testid": "vibe-image-input",
						onChange: f
					}, null, 40, Ve)]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]), k(R, { label: p(n)("assets.vibe.provider_label") }, {
					default: c(() => [k(le, {
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
}), Ge = {
	class: "tc-visually-hidden",
	for: "vocabulary-search-input"
}, Ke = ["placeholder"], qe = ["aria-expanded"], Je = /* @__PURE__ */ O({
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
		function ie(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return a("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return a("assets.vocabulary.progress_downloading");
				case "verifying_package": return a("assets.vocabulary.progress_verifying_package");
				case "installing": return a("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function P(e) {
			O.value === null && (O.value = e.package_id, A.value = null, await n.controller.install_vocabulary_package(e, (e) => {
				A.value = ie(e);
			}), O.value = null, A.value = null, n.controller.state.assets.vocabulary_install_command.status === "success" && (I.value = [], L.value = null, F.value.trim() !== "" && await H()));
		}
		let F = m(""), I = m([]), L = m(null), R = m(!1), z = m(!1), B = m(null), V = null;
		async function H() {
			let e = F.value.trim();
			if (e === "") {
				I.value = [], L.value = null;
				return;
			}
			R.value = !0;
			try {
				let t = await n.controller.search_vocabulary(e);
				I.value = t.results, L.value = t.next_cursor;
			} finally {
				R.value = !1;
			}
		}
		async function U() {
			if (L.value !== null) {
				z.value = !0;
				try {
					let e = await n.controller.load_more_vocabulary(L.value);
					I.value = [...I.value, ...e.results], L.value = e.next_cursor;
				} finally {
					z.value = !1;
				}
			}
		}
		s(F, () => {
			V !== null && clearTimeout(V), V = setTimeout(() => {
				H();
			}, 250);
		});
		async function ae(e) {
			await navigator.clipboard.writeText(e.display_text), B.value = e.record_id, setTimeout(() => {
				B.value === e.record_id && (B.value = null);
			}, 2e3);
		}
		let W = S(() => n.loading ? "loading" : n.catalog.length === 0 ? "empty" : "ready"), G = S(() => R.value && I.value.length === 0 ? "loading" : F.value.trim() === "" || I.value.length > 0 ? "ready" : "empty");
		return (e, t) => (o(), l("div", { class: E(p(Y).vocabularyPanel) }, [
			y("section", null, [
				y("p", { class: E(p(Y).sectionTitle) }, C(p(a)("assets.vocabulary.search_placeholder")), 3),
				y("div", { class: E(p(Y).vocabularySearchRow) }, [y("label", Ge, C(p(a)("assets.vocabulary.search_placeholder")), 1), i(y("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": t[0] ||= (e) => F.value = e,
					type: "text",
					class: E(p(Y).searchInput),
					placeholder: p(a)("assets.vocabulary.search_placeholder")
				}, null, 10, Ke), [[u, F.value]])], 2),
				k(N, {
					status: G.value,
					"empty-title": p(a)("assets.vocabulary.empty_title"),
					"empty-message": p(a)("assets.vocabulary.empty_description"),
					"min-height": "60px"
				}, {
					default: c(() => [I.value.length > 0 ? (o(), l("ul", {
						key: 0,
						class: E(p(Y).searchResultsList)
					}, [(o(!0), l(T, null, r(I.value, (e) => (o(), l("li", {
						key: e.record_id,
						class: E(p(Y).searchResultRow)
					}, [
						y("span", { class: E(p(Y).searchResultTag) }, C(e.display_text), 3),
						e.category ? (o(), l("span", {
							key: 0,
							class: E(p(Y).searchResultTranslation)
						}, C(e.category), 3)) : g("", !0),
						k(M, {
							label: B.value === e.record_id ? p(a)("common.actions.copied") : p(a)("common.actions.copy"),
							icon: p(ne),
							variant: "secondary",
							onClick: () => void ae(e)
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
				L.value === null ? g("", !0) : (o(), l("div", {
					key: 0,
					class: E(p(Y).loadMoreRow)
				}, [k(M, {
					label: p(a)("common.actions.next"),
					variant: "secondary",
					pending: z.value,
					onClick: t[1] ||= () => void U()
				}, null, 8, ["label", "pending"])], 2))
			]),
			y("section", null, [
				y("p", { class: E(p(Y).sectionTitle) }, C(p(a)("assets.vocabulary.update_action")), 3),
				k(N, {
					status: W.value,
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
					}, C(p(a)("assets.vocabulary.bundled_label")), 3)) : (o(), _(M, {
						key: 1,
						label: p(a)("assets.vocabulary.import_action"),
						icon: p(re),
						variant: "primary",
						pending: O.value === e.package_id,
						onClick: () => void P(e)
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
				icon: x.value ? p(te) : p(ee),
				size: 14
			}, null, 8, ["icon"]), D(" " + C(p(a)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, qe), x.value ? (o(), l("div", {
				key: 1,
				class: E(p(Y).catalogList)
			}, [y("p", { class: E(p(Y).nsfwNotice) }, C(p(a)("assets.vocabulary.nsfw_disclosure_hint")), 3), (o(!0), l(T, null, r(v.value, (e) => (o(), l("div", {
				key: e.package_id,
				class: E(p(Y).catalogEntry)
			}, [y("div", { class: E(p(Y).catalogEntryInfo) }, [y("span", { class: E(p(Y).catalogEntryName) }, C(w(e)), 3), y("span", { class: E(["tc-tabular-nums", p(Y).catalogEntryMeta]) }, C(p(a)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), k(M, {
				label: p(a)("assets.vocabulary.import_action"),
				icon: p(re),
				variant: "destructive",
				pending: O.value === e.package_id,
				onClick: () => void P(e)
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
}), Ye = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu, Xe = [
	"positive_prompt",
	"negative_prompt",
	"seed",
	"width",
	"height",
	"steps"
];
function Ze(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.matchAll(Ye)) {
		let e = n[1];
		e !== void 0 && t.add(e);
	}
	return [...t];
}
//#endregion
//#region src/ui/views/assets/WorkflowPanel.vue?vue&type=script&setup=true&lang.ts
var Qe = ["aria-label"], $e = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], et = ["id", "value"], tt = "unmapped", nt = "{{", rt = "}}", it = /* @__PURE__ */ O({
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
			value: tt,
			label: n("assets.workflow.placeholder_unmapped")
		}, ...Xe.map((e) => ({
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
			let e = Ze(w()), t = new Map(h.value.map((e) => [e.name, e.target]));
			h.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function A(e, t) {
			let n = h.value.find((t) => t.name === e);
			n && (n.target = t === tt ? "" : t);
		}
		function j() {
			d.value?.click();
		}
		function ee(e) {
			return `${nt}${e}${rt}`;
		}
		async function te(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			u.open_create(), u.name.value = n.name.replace(/\.json$/iu, ""), u.values.workflow_json = r, h.value = Ze(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function ne() {
			let e = {};
			for (let t of h.value) e[t.name] = t.target;
			u.values.placeholder_map = JSON.stringify(e), await u.save();
		}
		let re = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, a) => (o(), l("div", null, [
			y("div", { class: E(p(Y).workflowToolbarRow) }, [k(M, {
				label: p(n)("assets.workflow.import_action"),
				icon: p(V),
				variant: "primary",
				onClick: j
			}, null, 8, ["label", "icon"]), y("input", {
				ref_key: "file_input",
				ref: d,
				class: E(p(Y).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": p(n)("assets.workflow.import_action"),
				onChange: a[0] ||= (e) => void te(e)
			}, null, 42, Qe)], 2),
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
				"delete-confirm-title": re,
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
			k(I, {
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
					onSubmit: a[3] ||= f(() => void ne(), ["prevent"])
				}, [
					k(R, {
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
						}, null, 42, $e)]),
						_: 1
					}, 8, ["label", "error"]),
					k(R, { label: p(n)("assets.workflow.json_label") }, {
						default: c(({ fieldId: e }) => [y("textarea", {
							id: e,
							class: E(p(Y).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: w(),
							onInput: a[2] ||= (e) => p(u).values.workflow_json = e.target.value
						}, null, 42, et)]),
						_: 1
					}, 8, ["label"]),
					k(M, {
						label: p(n)("assets.workflow.placeholder_scan_action"),
						icon: p(he),
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
					}, [y("span", { class: E(p(Y).placeholderKey) }, C(ee(e.name)), 3), (o(), _(U, {
						key: p(i),
						"model-value": e.target === "" ? tt : e.target,
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
					y("div", { class: E(p(Y).formActions) }, [k(M, {
						label: p(n)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: p(u).close_dialog
					}, null, 8, ["label", "onClick"]), k(M, {
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
}), at = /* @__PURE__ */ O({
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
			"workflow"
		]), a = m(t.state.assets.active_category);
		function s(e) {
			a.value = e, i.has(e) && t.controller.set_active_asset_category(e);
		}
		let u = S(() => t.state.loading.has("assets")), d = S(() => t.state.loading.has("vocabulary")), f = S(() => r.value === "zh-CN" ? "zh-CN" : "en");
		return (t, r) => (o(), l("div", { class: E(p(Y).assetsView) }, [k(p(ve), {
			"model-value": a.value,
			"onUpdate:modelValue": s
		}, {
			default: c(() => [
				k(p(xe), {
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
					default: c(() => [k(Je, {
						catalog: e.state.assets.vocabulary_catalog,
						"install-command": e.state.assets.vocabulary_install_command,
						loading: d.value,
						controller: e.controller,
						locale: f.value
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
					default: c(() => [k(ze, {
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
					default: c(() => [k(Re, {
						records: e.state.assets.records.lora,
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
					value: "vibe",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(We, {
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
					value: "workflow",
					class: E(p(Y).tabsContent)
				}, {
					default: c(() => [k(it, {
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
export { at as default };
