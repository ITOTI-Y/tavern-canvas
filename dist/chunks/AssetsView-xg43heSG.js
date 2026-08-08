import { $ as e, A as t, B as n, D as r, F as i, I as a, L as o, N as s, Q as c, U as l, W as u, _ as d, a as f, c as p, dt as m, ft as h, g, h as _, it as v, k as y, lt as b, m as x, n as S, p as C, s as w, st as T, tt as E, u as D, v as O, x as k, y as A } from "./vue-i18n-CmRk7RjK.js";
import { t as j } from "./createLucideIcon-DAbI7E00.js";
import { t as M } from "./chevron-down-CvI5L1EB.js";
import { t as N } from "./chevron-up-D_L3-oTI.js";
import { t as ee } from "./copy-B8vKnwL3.js";
import { n as P, t as te } from "./trash-2-C5a57-Nr.js";
import { n as F, t as I } from "./StateSurface-BqMfI2cI.js";
import { n as L, t as R } from "./NumberStepper-ClF9OQR0.js";
import { n as z, t as B } from "./FieldGroup-FjrngN50.js";
import { t as V } from "./shuffle-DfipXozs.js";
import { t as H } from "./AppSelect-BRIguiRc.js";
import { _ as U, c as W, i as G, j as ne, o as re, s as ie } from "./Teleport-abGLK5Wv.js";
import { c as ae } from "./PopperContent-CWEcCerf.js";
import { n as oe, t as se } from "./_prop_utils-DuwFuJLL.js";
import { t as K } from "./AppSwitch-BcrYzJli.js";
import { t as ce } from "./RovingFocusGroup-C0pItw0h.js";
import { t as le } from "./IconButton-BaGVt1ov.js";
import { n as ue, t as de } from "./SegmentedControl-D4EyVIZf.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/grip-vertical.js
var fe = j("grip-vertical", [
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
]), pe = j("scan-search", [
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
]), me = j("upload", [
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
]), [he, ge] = /*#__PURE__*/ ne("TabsRoot"), _e = /* @__PURE__ */ k({
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
		let r = t, i = n, { orientation: o, unmountOnHide: c, dir: u } = v(r), d = ae(u);
		W();
		let f = U(r, "modelValue", i, {
			defaultValue: r.defaultValue,
			passive: r.modelValue === void 0
		}), p = e(), m = E(/* @__PURE__ */ new Set());
		return ge({
			modelValue: f,
			changeModelValue: (e) => {
				f.value = e;
			},
			orientation: o,
			dir: d,
			unmountOnHide: c,
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
		}), (e, t) => (s(), _(T(G), {
			dir: T(d),
			"data-orientation": T(o),
			"as-child": e.asChild,
			as: e.as
		}, {
			default: l(() => [a(e.$slots, "default", { modelValue: T(f) })]),
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
var q = /* @__PURE__ */ k({
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
		let r = n, { forwardRef: i } = W(), o = he(), c = C(() => ve(o.baseId, r.value)), u = C(() => ye(o.baseId, r.value)), d = C(() => r.value === o.modelValue.value), f = e(d.value);
		return t(() => {
			o.registerContent(r.value), requestAnimationFrame(() => {
				f.value = !1;
			});
		}), y(() => {
			o.unregisterContent(r.value);
		}), (e, t) => (s(), _(T(re), {
			present: e.forceMount || d.value,
			"force-mount": ""
		}, {
			default: l(({ present: t }) => [A(T(G), {
				id: u.value,
				ref: T(i),
				"as-child": e.asChild,
				as: e.as,
				role: "tabpanel",
				"data-state": d.value ? "active" : "inactive",
				"data-orientation": T(o).orientation.value,
				"aria-labelledby": c.value,
				hidden: !t,
				tabindex: "0",
				style: m({ animationDuration: f.value ? "0s" : void 0 })
			}, {
				default: l(() => [!T(o).unmountOnHide.value || t ? a(e.$slots, "default", { key: 0 }) : g("v-if", !0)]),
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
}), be = /* @__PURE__ */ k({
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
		let { loop: t } = v(e), { forwardRef: n, currentElement: r } = W(), i = he();
		return i.tabsList = r, (e, r) => (s(), _(T(ce), {
			"as-child": "",
			orientation: T(i).orientation.value,
			dir: T(i).dir.value,
			loop: T(t)
		}, {
			default: l(() => [A(T(G), {
				ref: T(n),
				role: "tablist",
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": T(i).orientation.value
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
}), J = /* @__PURE__ */ k({
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
		let t = e, { forwardRef: n } = W(), r = he(), i = C(() => ve(r.baseId, t.value)), o = C(() => r.contentIds.value.has(t.value) ? ye(r.baseId, t.value) : void 0), c = C(() => t.value === r.modelValue.value);
		return (e, t) => (s(), _(T(ue), {
			"as-child": "",
			focusable: !e.disabled,
			active: c.value
		}, {
			default: l(() => [A(T(G), {
				id: i.value,
				ref: T(n),
				role: "tab",
				type: e.as === "button" ? "button" : void 0,
				as: e.as,
				"as-child": e.asChild,
				"aria-selected": c.value ? "true" : "false",
				"aria-controls": o.value,
				"data-state": c.value ? "active" : "inactive",
				disabled: e.disabled,
				"data-disabled": e.disabled ? "" : void 0,
				"data-orientation": T(r).orientation.value,
				onMousedown: t[0] ||= p((t) => {
					!e.disabled && t.ctrlKey === !1 ? T(r).changeModelValue(e.value) : t.preventDefault();
				}, ["left"]),
				onKeydown: t[1] ||= w((t) => T(r).changeModelValue(e.value), ["enter", "space"]),
				onFocus: t[2] ||= () => {
					let t = T(r).activationMode !== "manual";
					!c.value && !e.disabled && t && T(r).changeModelValue(e.value);
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
], ke = ["aria-label"], Ae = ["aria-label", "onClick"], X = /* @__PURE__ */ k({
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
		let r = t, a = n, o = e(""), c = e(null), p = e(null), m = C(() => {
			let e = o.value.trim().toLowerCase();
			return e === "" ? r.records : r.records.filter((t) => t.display_name.toLowerCase().includes(e));
		}), _ = C(() => r.loading ? "loading" : r.records.length === 0 ? "empty" : "ready");
		function v(e) {
			return Te(e.payload, r.summaryFields);
		}
		function y(e) {
			c.value = e;
		}
		function S() {
			c.value && a("delete", c.value.id), c.value = null;
		}
		function w(e, t) {
			let n = r.records.findIndex((t) => t.id === e), i = n + t;
			if (n === -1 || i < 0 || i >= r.records.length) return;
			let o = [...r.records], [s] = o.splice(n, 1);
			s !== void 0 && (o.splice(i, 0, s), a("reorder", o.map((e) => e.id)));
		}
		function E() {
			if (r.records.length === 0) return;
			let e = Math.floor(Math.random() * r.records.length), t = r.records[e];
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
			let i = r.records.findIndex((e) => e.id === n), o = r.records.findIndex((t) => t.id === e);
			if (i === -1 || o === -1) return;
			let s = [...r.records], [c] = s.splice(i, 1);
			c !== void 0 && (s.splice(o, 0, c), a("reorder", s.map((e) => e.id)));
		}
		return (e, n) => (s(), d("div", { class: b(T(Y).categoryList) }, [
			x("div", { class: b(T(Y).categoryToolbar) }, [
				x("label", {
					class: "tc-visually-hidden",
					for: `${t.searchLabel}-search`
				}, h(t.searchLabel), 9, Ee),
				u(x("input", {
					id: `${t.searchLabel}-search`,
					"onUpdate:modelValue": n[0] ||= (e) => o.value = e,
					type: "text",
					class: b(T(Y).searchInput),
					placeholder: t.searchPlaceholder,
					"aria-label": t.searchLabel
				}, null, 10, De), [[f, o.value]]),
				A(F, {
					label: t.randomLabel,
					icon: T(V),
					variant: "secondary",
					onClick: E
				}, null, 8, ["label", "icon"]),
				A(F, {
					label: t.addLabel,
					icon: T(z),
					variant: "primary",
					onClick: n[1] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])
			], 2),
			t.records.length > 1 ? (s(), d("p", {
				key: 0,
				class: b(T(Y).reorderHint)
			}, h(t.reorderHint), 3)) : g("", !0),
			A(I, {
				status: _.value,
				"empty-message": t.emptyTitle,
				"min-height": "120px"
			}, {
				action: l(() => [x("p", { class: b(T(Y).emptyDescription) }, h(t.emptyDescription), 3), A(F, {
					label: t.addLabel,
					icon: T(z),
					variant: "primary",
					onClick: n[2] ||= (e) => a("add")
				}, null, 8, ["label", "icon"])]),
				default: l(() => [x("ul", { class: b(T(Y).cardGrid) }, [(s(!0), d(D, null, i(m.value, (e) => (s(), d("li", {
					key: e.id,
					class: b(T(Y).assetCard),
					draggable: "true",
					"data-dragging": p.value === e.id ? "" : null,
					onDragstart: (t) => O(e.id, t),
					onDragover: k,
					onDrop: (t) => j(e.id, t)
				}, [
					x("span", {
						class: b(T(Y).dragHandle),
						"aria-label": t.dragHandleLabel,
						"aria-hidden": "true"
					}, [A(T(fe), {
						size: 16,
						"stroke-width": 1.75
					})], 10, ke),
					x("button", {
						type: "button",
						class: b(T(Y).assetCardMain),
						"aria-label": `${t.editLabel}: ${e.display_name}`,
						onClick: (t) => a("edit", e)
					}, [x("span", { class: b(T(Y).assetCardName) }, h(e.display_name), 3), v(e).length > 0 ? (s(), d("span", {
						key: 0,
						class: b(T(Y).assetCardSummary)
					}, [(s(!0), d(D, null, i(v(e), (e) => (s(), d("span", {
						key: e.label,
						class: b([T(Y).assetCardSummaryPart, e.numeric && "tc-tabular-nums"])
					}, h(e.label) + ": " + h(e.value), 3))), 128))], 2)) : g("", !0)], 10, Ae),
					x("div", { class: b(T(Y).assetCardActions) }, [
						A(le, {
							icon: T(N),
							size: "sm",
							label: t.moveUpLabel,
							onClick: (t) => w(e.id, -1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						A(le, {
							icon: T(M),
							size: "sm",
							label: t.moveDownLabel,
							onClick: (t) => w(e.id, 1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						A(le, {
							icon: T(te),
							size: "sm",
							destructive: "",
							label: t.deleteLabel,
							onClick: (t) => y(e)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						])
					], 2)
				], 42, Oe))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			A(oe, {
				open: c.value !== null,
				title: c.value ? t.deleteConfirmTitle(c.value.display_name) : "",
				description: t.deleteConfirmDescription,
				"confirm-label": t.confirmLabel,
				"cancel-label": t.cancelLabel,
				"onUpdate:open": n[3] ||= (e) => {
					e || (c.value = null);
				},
				onConfirm: S
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
], Z = /* @__PURE__ */ k({
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
		let n = e, o = t;
		function c(e, t) {
			o("update:values", {
				...n.values,
				[e]: t
			});
		}
		function u(e, t) {
			o("update:values", {
				...n.values,
				[e]: t
			});
		}
		function f(e) {
			e.preventDefault(), o("save");
		}
		let p = C(() => n.pending);
		return (t, n) => (s(), d("form", {
			class: b(T(Y).form),
			onSubmit: f
		}, [
			A(B, {
				label: e.nameLabel,
				error: e.nameError,
				required: ""
			}, {
				default: l(({ fieldId: t, describedBy: r, invalid: i }) => [x("input", {
					id: t,
					class: b(T(Y).textInput),
					type: "text",
					placeholder: e.namePlaceholder,
					value: e.name,
					"aria-describedby": r,
					"aria-invalid": i,
					onInput: n[0] ||= (e) => o("update:name", e.target.value)
				}, null, 42, je)]),
				_: 1
			}, 8, ["label", "error"]),
			(s(!0), d(D, null, i(e.fields, (t) => (s(), _(B, r({
				key: t.key,
				label: t.label
			}, { ref_for: !0 }, T(se)({ hint: t.hint })), {
				default: l(({ fieldId: n, describedBy: i }) => [t.kind === "text" ? (s(), d("input", {
					key: 0,
					id: n,
					class: b(T(Y).textInput),
					type: "text",
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => c(t.key, e.target.value)
				}, null, 42, Me)) : t.kind === "textarea" ? (s(), d("textarea", {
					key: 1,
					id: n,
					class: b(T(Y).textArea),
					value: e.values[t.key],
					"aria-describedby": i,
					onInput: (e) => c(t.key, e.target.value)
				}, null, 42, Ne)) : (s(), _(R, r({
					key: 2,
					id: n,
					"model-value": typeof e.values[t.key] == "number" ? e.values[t.key] : 0,
					label: t.label,
					step: t.step ?? 1,
					"decrement-label": e.decrementLabel,
					"increment-label": e.incrementLabel
				}, { ref_for: !0 }, T(se)({
					min: t.min,
					max: t.max,
					describedBy: i
				}), { "onUpdate:modelValue": (e) => u(t.key, e) }), null, 16, [
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
			x("div", { class: b(T(Y).formActions) }, [A(F, {
				label: e.cancelLabel,
				variant: "secondary",
				type: "button",
				onClick: n[1] ||= (e) => o("cancel")
			}, null, 8, ["label"]), A(F, {
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
	let a = e(!1), o = e(null), s = e(""), l = e(null), u = c({}), d = e(!1);
	function f() {
		o.value = null, s.value = "", l.value = null, $(u, Ce(r())), a.value = !0;
	}
	function p(e) {
		o.value = e, s.value = e.display_name, l.value = null, $(u, Se(r(), e)), a.value = !0;
	}
	function m() {
		a.value = !1;
	}
	async function h() {
		let e = s.value.trim();
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
		name: s,
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
var Pe = /* @__PURE__ */ k({
	__name: "CharacterPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = S(), r = C(() => [
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
		return (t, o) => (s(), d("div", null, [A(X, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": T(n)("common.actions.search"),
			"search-placeholder": T(n)("common.actions.search"),
			"empty-title": T(n)("assets.characters.empty_title"),
			"empty-description": T(n)("assets.characters.empty_description"),
			"add-label": T(n)("assets.characters.add_action"),
			"random-label": T(n)("assets.random_selection_action"),
			"reorder-hint": T(n)("assets.reorder_hint"),
			"edit-label": T(n)("common.actions.edit"),
			"delete-label": T(n)("common.actions.delete"),
			"delete-confirm-title": a,
			"delete-confirm-description": T(n)("assets.delete_confirm_description"),
			"confirm-label": T(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": T(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": T(n)("assets.move_up_action"),
			"move-down-label": T(n)("assets.move_down_action"),
			"drag-handle-label": T(n)("assets.drag_handle_label"),
			onAdd: T(i).open_create,
			onEdit: T(i).open_edit,
			onDelete: T(i).remove,
			onReorder: T(i).reorder,
			onRandomSelect: T(i).random_select
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
		]), A(L, {
			open: T(i).dialog_open.value,
			title: T(i).editing_record.value ? T(n)("common.actions.edit") : T(n)("assets.characters.add_action"),
			description: T(n)("assets.form_dialog_description"),
			"close-label": T(n)("common.actions.close"),
			"onUpdate:open": o[2] ||= (e) => {
				e || T(i).close_dialog();
			}
		}, {
			default: l(() => [A(Z, {
				"name-label": T(n)("common.labels.name"),
				"name-placeholder": T(n)("common.labels.name"),
				name: T(i).name.value,
				"name-error": T(i).name_error.value,
				fields: r.value,
				values: T(i).values,
				"save-label": T(n)("common.actions.save"),
				"cancel-label": T(n)("common.actions.cancel"),
				"decrement-label": T(n)("common.actions.decrease"),
				"increment-label": T(n)("common.actions.increase"),
				pending: T(i).saving.value,
				"onUpdate:name": o[0] ||= (e) => {
					T(i).name.value = e;
				},
				"onUpdate:values": o[1] ||= (e) => T($)(T(i).values, e),
				onSave: T(i).save,
				onCancel: T(i).close_dialog
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
var Le = ["id", "aria-describedby"], Re = ["id", "aria-describedby"], ze = ["id", "aria-describedby"], Be = /* @__PURE__ */ k({
	__name: "KnowledgePanel",
	props: {
		entries: {},
		selectedIds: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(t) {
		let n = t, { t: r } = S(), a = e(!1), o = e(null), c = e(!1), p = e(null), m = e(null), v = e(null), y = e(null), w = e(!1), E = e(!1), O = e(!1), k = C(() => [
			"manual",
			"imported",
			"character"
		].map((e) => ({
			value: e,
			label: Ie(r, e)
		}))), j = C({
			get: () => o.value?.source_type ?? "manual",
			set: (e) => {
				o.value && (o.value.source_type = e);
			}
		}), M = C(() => new Set(n.selectedIds)), N = C(() => n.entries.length > 0 && n.selectedIds.length === n.entries.length);
		function ee(e) {
			let t = e.split(/[,，]/u).map((e) => e.trim()).filter((e) => e.length > 0);
			return [...new Set(t)];
		}
		function P(e, t) {
			let r = new Set(n.selectedIds);
			t ? r.add(e) : r.delete(e), n.controller.set_knowledge_selection([...r]);
		}
		function te(e) {
			n.controller.set_knowledge_selection(e ? n.entries.map((e) => e.id) : []);
		}
		function z() {
			o.value = {
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
			o.value = {
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
			p.value = null, m.value = null, v.value = null;
		}
		function W() {
			a.value = !1, o.value = null;
		}
		async function G() {
			let e = o.value;
			if (!e || c.value) return;
			U();
			let t = e.title.trim(), i = e.content.trim();
			if (t.length === 0 && (p.value = r("errors.validation_required")), i.length === 0 && (m.value = r("errors.validation_required")), !(p.value || m.value)) {
				c.value = !0;
				try {
					await n.controller.save_knowledge_entry({
						id: e.id,
						title: t,
						source_type: e.source_type,
						content: i,
						keywords: ee(e.keywords_text),
						priority: e.priority,
						enabled: e.enabled
					}), W();
				} catch {
					v.value = r("errors.unexpected");
				} finally {
					c.value = !1;
				}
			}
		}
		async function ne() {
			let e = y.value;
			if (!(!e || w.value)) {
				w.value = !0;
				try {
					await n.controller.remove_knowledge_entry(e.id), y.value = null;
				} finally {
					w.value = !1;
				}
			}
		}
		async function re() {
			if (!O.value) {
				O.value = !0;
				try {
					await n.controller.bulk_remove_knowledge_entries(n.selectedIds), E.value = !1;
				} finally {
					O.value = !1;
				}
			}
		}
		return (e, n) => (s(), d("div", {
			class: b(T(Y).categoryList),
			"data-testid": "knowledge-panel"
		}, [
			x("div", { class: b(T(Y).categoryToolbar) }, [
				A(F, {
					label: T(r)("assets.knowledge.add_action"),
					onClick: z
				}, null, 8, ["label"]),
				t.entries.length > 0 ? (s(), _(K, {
					key: 0,
					"model-value": N.value,
					label: T(r)("assets.knowledge.select_all_label"),
					"onUpdate:modelValue": te
				}, null, 8, ["model-value", "label"])) : g("", !0),
				t.selectedIds.length > 0 ? (s(), _(F, {
					key: 1,
					label: T(r)("assets.knowledge.bulk_delete_action", { count: t.selectedIds.length }),
					variant: "destructive",
					"data-testid": "knowledge-bulk-delete",
					onClick: n[0] ||= (e) => E.value = !0
				}, null, 8, ["label"])) : g("", !0)
			], 2),
			A(I, {
				status: t.loading ? "loading" : t.entries.length === 0 ? "empty" : "ready",
				"empty-message": T(r)("assets.knowledge.empty_description")
			}, {
				action: l(() => [A(F, {
					label: T(r)("assets.knowledge.add_action"),
					onClick: z
				}, null, 8, ["label"])]),
				default: l(() => [x("ul", { class: b(T(Y).cardGrid) }, [(s(!0), d(D, null, i(t.entries, (e) => (s(), d("li", {
					key: e.id,
					class: b(T(Y).assetCard),
					"data-testid": "knowledge-card"
				}, [x("div", { class: b(T(Y).assetCardMain) }, [x("span", { class: b(T(Y).assetCardName) }, h(e.title), 3), x("span", { class: b(T(Y).assetCardSummary) }, [
					x("span", { class: b(T(Y).assetCardSummaryPart) }, h(T(Ie)(T(r), e.source_type)), 3),
					x("span", { class: b(T(Y).assetCardSummaryPart) }, h(T(r)("assets.knowledge.priority_summary", { priority: e.priority })), 3),
					e.keywords.length > 0 ? (s(), d("span", {
						key: 0,
						class: b(T(Y).assetCardSummaryPart)
					}, h(e.keywords.join(", ")), 3)) : g("", !0)
				], 2)], 2), x("div", { class: b(T(Y).assetCardActions) }, [
					A(K, {
						"model-value": M.value.has(e.id),
						label: T(r)("assets.knowledge.select_label", { title: e.title }),
						"onUpdate:modelValue": (t) => P(e.id, t)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					A(K, {
						"model-value": e.enabled,
						label: T(r)("assets.knowledge.enabled_label"),
						"onUpdate:modelValue": (n) => t.controller.set_knowledge_entry_enabled(e.id, n)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					A(F, {
						label: T(r)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => V(e)
					}, null, 8, ["label", "onClick"]),
					A(F, {
						label: T(r)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => y.value = e
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			A(L, {
				open: a.value,
				title: o.value?.is_new ? T(r)("assets.knowledge.add_action") : T(r)("common.actions.edit"),
				description: T(r)("assets.form_dialog_description"),
				"close-label": T(r)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && W()
			}, {
				default: l(() => [o.value ? (s(), d("div", {
					key: 0,
					class: b(T(Y).form)
				}, [
					A(B, {
						label: T(r)("assets.knowledge.title_label"),
						error: p.value,
						required: ""
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [u(x("input", {
							id: e,
							"onUpdate:modelValue": n[1] ||= (e) => o.value.title = e,
							type: "text",
							"aria-describedby": t,
							class: b(T(Y).textInput)
						}, null, 10, Le), [[f, o.value.title]])]),
						_: 1
					}, 8, ["label", "error"]),
					A(B, {
						label: T(r)("assets.knowledge.source_type_label"),
						required: ""
					}, {
						default: l(({ fieldId: e }) => [A(H, {
							id: e,
							modelValue: j.value,
							"onUpdate:modelValue": n[2] ||= (e) => j.value = e,
							options: k.value,
							placeholder: T(r)("assets.knowledge.source_type_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					A(B, {
						label: T(r)("assets.knowledge.content_label"),
						hint: T(r)("assets.knowledge.content_hint"),
						error: m.value,
						required: ""
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [u(x("textarea", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => o.value.content = e,
							rows: "6",
							"aria-describedby": t,
							class: b(T(Y).textArea)
						}, null, 10, Re), [[f, o.value.content]])]),
						_: 1
					}, 8, [
						"label",
						"hint",
						"error"
					]),
					A(B, {
						label: T(r)("assets.knowledge.keywords_label"),
						hint: T(r)("assets.knowledge.keywords_hint")
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [u(x("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => o.value.keywords_text = e,
							type: "text",
							"aria-describedby": t,
							class: b(T(Y).textInput)
						}, null, 10, ze), [[f, o.value.keywords_text]])]),
						_: 1
					}, 8, ["label", "hint"]),
					A(B, {
						label: T(r)("assets.knowledge.priority_label"),
						hint: T(r)("assets.knowledge.priority_hint")
					}, {
						default: l(() => [A(R, {
							modelValue: o.value.priority,
							"onUpdate:modelValue": n[5] ||= (e) => o.value.priority = e,
							label: T(r)("assets.knowledge.priority_label"),
							"increment-label": T(r)("common.actions.increase"),
							"decrement-label": T(r)("common.actions.decrease"),
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
					A(K, {
						modelValue: o.value.enabled,
						"onUpdate:modelValue": n[6] ||= (e) => o.value.enabled = e,
						label: T(r)("assets.knowledge.enabled_label")
					}, null, 8, ["modelValue", "label"]),
					v.value ? (s(), d("p", {
						key: 0,
						class: b(T(Y).emptyDescription),
						"data-tone": "error"
					}, h(v.value), 3)) : g("", !0),
					x("div", { class: b(T(Y).formActions) }, [A(F, {
						label: T(r)("common.actions.save"),
						pending: c.value,
						onClick: G
					}, null, 8, ["label", "pending"]), A(F, {
						label: T(r)("common.actions.cancel"),
						variant: "secondary",
						onClick: W
					}, null, 8, ["label"])], 2)
				], 2)) : g("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			A(oe, {
				open: y.value !== null,
				title: T(r)("assets.delete_confirm_title", { name: y.value?.title ?? "" }),
				description: T(r)("assets.knowledge.delete_confirm_description"),
				"confirm-label": T(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": T(r)("confirmations.destructive.default_cancel_action"),
				pending: w.value,
				"onUpdate:open": n[8] ||= (e) => !e && (y.value = null),
				onConfirm: ne
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			]),
			A(oe, {
				open: E.value,
				title: T(r)("assets.knowledge.bulk_delete_confirm_title", { count: t.selectedIds.length }),
				description: T(r)("assets.knowledge.delete_confirm_description"),
				"confirm-label": T(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": T(r)("confirmations.destructive.default_cancel_action"),
				pending: O.value,
				"onUpdate:open": n[9] ||= (e) => E.value = e,
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
}), Ve = /* @__PURE__ */ k({
	__name: "LoraPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = S(), r = C(() => [{
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
		return (t, c) => (s(), d("div", null, [A(X, {
			records: e.records,
			"summary-fields": i,
			loading: e.loading,
			"search-label": T(n)("common.actions.search"),
			"search-placeholder": T(n)("common.actions.search"),
			"empty-title": T(n)("assets.lora.empty_title"),
			"empty-description": T(n)("assets.lora.empty_description"),
			"add-label": T(n)("assets.lora.add_action"),
			"random-label": T(n)("assets.random_selection_action"),
			"reorder-hint": T(n)("assets.reorder_hint"),
			"edit-label": T(n)("common.actions.edit"),
			"delete-label": T(n)("common.actions.delete"),
			"delete-confirm-title": o,
			"delete-confirm-description": T(n)("assets.delete_confirm_description"),
			"confirm-label": T(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": T(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": T(n)("assets.move_up_action"),
			"move-down-label": T(n)("assets.move_down_action"),
			"drag-handle-label": T(n)("assets.drag_handle_label"),
			onAdd: T(a).open_create,
			onEdit: T(a).open_edit,
			onDelete: T(a).remove,
			onReorder: T(a).reorder,
			onRandomSelect: T(a).random_select
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
		]), A(L, {
			open: T(a).dialog_open.value,
			title: T(a).editing_record.value ? T(n)("common.actions.edit") : T(n)("assets.lora.add_action"),
			description: T(n)("assets.form_dialog_description"),
			"close-label": T(n)("common.actions.close"),
			"onUpdate:open": c[2] ||= (e) => {
				e || T(a).close_dialog();
			}
		}, {
			default: l(() => [A(Z, {
				"name-label": T(n)("common.labels.name"),
				"name-placeholder": T(n)("common.labels.name"),
				name: T(a).name.value,
				"name-error": T(a).name_error.value,
				fields: r.value,
				values: T(a).values,
				"save-label": T(n)("common.actions.save"),
				"cancel-label": T(n)("common.actions.cancel"),
				"decrement-label": T(n)("common.actions.decrease"),
				"increment-label": T(n)("common.actions.increase"),
				pending: T(a).saving.value,
				"onUpdate:name": c[0] ||= (e) => {
					T(a).name.value = e;
				},
				"onUpdate:values": c[1] ||= (e) => T($)(T(a).values, e),
				onSave: T(a).save,
				onCancel: T(a).close_dialog
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
}), He = ["id", "aria-describedby"], Ue = ["id", "aria-describedby"], We = ["id", "aria-describedby"], Ge = /* @__PURE__ */ k({
	__name: "PersonaPanel",
	props: {
		personas: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(t) {
		let n = t, { t: r } = S(), a = e(!1), o = e(null), c = e(!1), p = e(null), m = e(null), _ = e(null), v = e(!1), y = C(() => ["assistant", "user"].map((e) => ({
			value: e,
			label: Fe(r, e)
		}))), w = C({
			get: () => o.value?.role ?? "assistant",
			set: (e) => {
				o.value && (o.value.role = e);
			}
		});
		function E() {
			o.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				display_name: "",
				role: "assistant",
				description: "",
				greeting: "",
				avatar_image_id: null,
				is_active: n.personas.length === 0
			}, p.value = null, m.value = null, a.value = !0;
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
			}, p.value = null, m.value = null, a.value = !0;
		}
		function k() {
			a.value = !1, o.value = null;
		}
		async function j() {
			let e = o.value;
			if (!e || c.value) return;
			let t = e.display_name.trim();
			if (t.length === 0) {
				p.value = r("errors.validation_required");
				return;
			}
			p.value = null, m.value = null, c.value = !0;
			try {
				await n.controller.save_persona({
					id: e.id,
					display_name: t,
					role: e.role,
					description: e.description.trim(),
					greeting: e.greeting.trim(),
					avatar_image_id: e.avatar_image_id,
					is_active: e.is_active
				}), k();
			} catch {
				m.value = r("errors.unexpected");
			} finally {
				c.value = !1;
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
		return (e, n) => (s(), d("div", {
			class: b(T(Y).categoryList),
			"data-testid": "persona-panel"
		}, [
			x("div", { class: b(T(Y).categoryToolbar) }, [A(F, {
				label: T(r)("assets.personas.add_action"),
				onClick: E
			}, null, 8, ["label"])], 2),
			A(I, {
				status: t.loading ? "loading" : t.personas.length === 0 ? "empty" : "ready",
				"empty-message": T(r)("assets.personas.empty_description")
			}, {
				action: l(() => [A(F, {
					label: T(r)("assets.personas.add_action"),
					onClick: E
				}, null, 8, ["label"])]),
				default: l(() => [x("ul", { class: b(T(Y).cardGrid) }, [(s(!0), d(D, null, i(t.personas, (e) => (s(), d("li", {
					key: e.id,
					class: b(T(Y).assetCard),
					"data-testid": "persona-card"
				}, [x("div", { class: b(T(Y).assetCardMain) }, [x("span", { class: b(T(Y).assetCardName) }, h(e.display_name), 3), x("span", { class: b(T(Y).assetCardSummary) }, [x("span", { class: b(T(Y).assetCardSummaryPart) }, h(T(Fe)(T(r), e.role)), 3), e.is_active ? (s(), d("span", {
					key: 0,
					class: b(T(Y).assetCardSummaryPart)
				}, h(T(r)("assets.personas.active_badge")), 3)) : g("", !0)], 2)], 2), x("div", { class: b(T(Y).assetCardActions) }, [
					A(K, {
						"model-value": e.is_active,
						label: T(r)("assets.personas.active_toggle_label"),
						"onUpdate:modelValue": (t) => M(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]),
					A(F, {
						label: T(r)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => O(e)
					}, null, 8, ["label", "onClick"]),
					A(F, {
						label: T(r)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => _.value = e
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-message"]),
			A(L, {
				open: a.value,
				title: o.value?.is_new ? T(r)("assets.personas.add_action") : T(r)("common.actions.edit"),
				description: T(r)("assets.form_dialog_description"),
				"close-label": T(r)("common.actions.close"),
				"onUpdate:open": n[5] ||= (e) => !e && k()
			}, {
				default: l(() => [o.value ? (s(), d("div", {
					key: 0,
					class: b(T(Y).form)
				}, [
					A(B, {
						label: T(r)("common.labels.name"),
						error: p.value,
						required: ""
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [u(x("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => o.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: b(T(Y).textInput)
						}, null, 10, He), [[f, o.value.display_name]])]),
						_: 1
					}, 8, ["label", "error"]),
					A(B, {
						label: T(r)("assets.personas.role_label"),
						required: ""
					}, {
						default: l(({ fieldId: e }) => [A(H, {
							id: e,
							modelValue: w.value,
							"onUpdate:modelValue": n[1] ||= (e) => w.value = e,
							options: y.value,
							placeholder: T(r)("assets.personas.role_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					A(B, {
						label: T(r)("assets.personas.description_label"),
						hint: T(r)("assets.personas.description_hint")
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [u(x("textarea", {
							id: e,
							"onUpdate:modelValue": n[2] ||= (e) => o.value.description = e,
							rows: "4",
							"aria-describedby": t,
							class: b(T(Y).textArea)
						}, null, 10, Ue), [[f, o.value.description]])]),
						_: 1
					}, 8, ["label", "hint"]),
					A(B, {
						label: T(r)("assets.personas.greeting_label"),
						hint: T(r)("assets.personas.greeting_hint")
					}, {
						default: l(({ fieldId: e, describedBy: t }) => [u(x("textarea", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => o.value.greeting = e,
							rows: "3",
							"aria-describedby": t,
							class: b(T(Y).textArea)
						}, null, 10, We), [[f, o.value.greeting]])]),
						_: 1
					}, 8, ["label", "hint"]),
					A(K, {
						modelValue: o.value.is_active,
						"onUpdate:modelValue": n[4] ||= (e) => o.value.is_active = e,
						label: T(r)("assets.personas.active_toggle_label")
					}, null, 8, ["modelValue", "label"]),
					m.value ? (s(), d("p", {
						key: 0,
						class: b(T(Y).emptyDescription),
						"data-tone": "error"
					}, h(m.value), 3)) : g("", !0),
					x("div", { class: b(T(Y).formActions) }, [A(F, {
						label: T(r)("common.actions.save"),
						pending: c.value,
						onClick: j
					}, null, 8, ["label", "pending"]), A(F, {
						label: T(r)("common.actions.cancel"),
						variant: "secondary",
						onClick: k
					}, null, 8, ["label"])], 2)
				], 2)) : g("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			A(oe, {
				open: _.value !== null,
				title: T(r)("assets.delete_confirm_title", { name: _.value?.display_name ?? "" }),
				description: T(r)("assets.personas.delete_confirm_description"),
				"confirm-label": T(r)("confirmations.destructive.default_confirm_action"),
				"cancel-label": T(r)("confirmations.destructive.default_cancel_action"),
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
}), Ke = /* @__PURE__ */ k({
	__name: "OutfitPanel",
	props: {
		records: {},
		characterRecords: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = S(), i = C(() => [{
			key: "description",
			label: n("assets.outfits.description_label"),
			kind: "textarea"
		}]), a = [], o = Q("outfit", t.controller, () => i.value, () => n("errors.validation_required")), c = C(() => t.characterRecords.map((e) => ({
			value: e.id,
			label: e.display_name
		}))), u = C(() => {
			let e = o.values.character_id;
			return typeof e == "string" && e !== "" ? e : void 0;
		});
		function f(e) {
			o.values.character_id = e;
		}
		let p = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, m) => (s(), d("div", null, [A(X, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": T(n)("common.actions.search"),
			"search-placeholder": T(n)("common.actions.search"),
			"empty-title": T(n)("assets.outfits.empty_title"),
			"empty-description": T(n)("assets.outfits.empty_description"),
			"add-label": T(n)("assets.outfits.add_action"),
			"random-label": T(n)("assets.random_selection_action"),
			"reorder-hint": T(n)("assets.reorder_hint"),
			"edit-label": T(n)("common.actions.edit"),
			"delete-label": T(n)("common.actions.delete"),
			"delete-confirm-title": p,
			"delete-confirm-description": T(n)("assets.delete_confirm_description"),
			"confirm-label": T(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": T(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": T(n)("assets.move_up_action"),
			"move-down-label": T(n)("assets.move_down_action"),
			"drag-handle-label": T(n)("assets.drag_handle_label"),
			onAdd: T(o).open_create,
			onEdit: T(o).open_edit,
			onDelete: T(o).remove,
			onReorder: T(o).reorder,
			onRandomSelect: T(o).random_select
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
		]), A(L, {
			open: T(o).dialog_open.value,
			title: T(o).editing_record.value ? T(n)("common.actions.edit") : T(n)("assets.outfits.add_action"),
			description: T(n)("assets.form_dialog_description"),
			"close-label": T(n)("common.actions.close"),
			"onUpdate:open": m[2] ||= (e) => {
				e || T(o).close_dialog();
			}
		}, {
			default: l(() => [A(Z, {
				"name-label": T(n)("common.labels.name"),
				"name-placeholder": T(n)("common.labels.name"),
				name: T(o).name.value,
				"name-error": T(o).name_error.value,
				fields: i.value,
				values: T(o).values,
				"save-label": T(n)("common.actions.save"),
				"cancel-label": T(n)("common.actions.cancel"),
				"decrement-label": T(n)("common.actions.decrease"),
				"increment-label": T(n)("common.actions.increase"),
				pending: T(o).saving.value,
				"onUpdate:name": m[0] ||= (e) => {
					T(o).name.value = e;
				},
				"onUpdate:values": m[1] ||= (e) => T($)(T(o).values, e),
				onSave: T(o).save,
				onCancel: T(o).close_dialog
			}, {
				"extra-fields": l(() => [A(B, { label: T(n)("assets.outfits.character_label") }, {
					default: l(({ fieldId: e, describedBy: t }) => [A(H, r({
						id: e,
						"model-value": u.value,
						options: c.value,
						placeholder: T(n)("assets.outfits.character_placeholder")
					}, T(se)({ describedBy: t }), { "onUpdate:modelValue": f }), null, 16, [
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
}), qe = /* @__PURE__ */ k({
	__name: "ReferencePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = S(), r = C(() => [{
			key: "source_url",
			label: n("assets.reference.source_url_label"),
			kind: "text"
		}, {
			key: "notes",
			label: n("assets.reference.notes_label"),
			kind: "textarea"
		}]), i = Q("reference", t.controller, () => r.value, () => n("errors.validation_required")), a = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, o) => (s(), d("div", null, [A(X, {
			records: e.records,
			"summary-fields": [],
			loading: e.loading,
			"search-label": T(n)("common.actions.search"),
			"search-placeholder": T(n)("common.actions.search"),
			"empty-title": T(n)("assets.reference.empty_title"),
			"empty-description": T(n)("assets.reference.empty_description"),
			"add-label": T(n)("assets.reference.add_action"),
			"random-label": T(n)("assets.random_selection_action"),
			"reorder-hint": T(n)("assets.reorder_hint"),
			"edit-label": T(n)("common.actions.edit"),
			"delete-label": T(n)("common.actions.delete"),
			"delete-confirm-title": a,
			"delete-confirm-description": T(n)("assets.delete_confirm_description"),
			"confirm-label": T(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": T(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": T(n)("assets.move_up_action"),
			"move-down-label": T(n)("assets.move_down_action"),
			"drag-handle-label": T(n)("assets.drag_handle_label"),
			onAdd: T(i).open_create,
			onEdit: T(i).open_edit,
			onDelete: T(i).remove,
			onReorder: T(i).reorder,
			onRandomSelect: T(i).random_select
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
		]), A(L, {
			open: T(i).dialog_open.value,
			title: T(i).editing_record.value ? T(n)("common.actions.edit") : T(n)("assets.reference.add_action"),
			description: T(n)("assets.form_dialog_description"),
			"close-label": T(n)("common.actions.close"),
			"onUpdate:open": o[2] ||= (e) => {
				e || T(i).close_dialog();
			}
		}, {
			default: l(() => [A(Z, {
				"name-label": T(n)("common.labels.name"),
				"name-placeholder": T(n)("common.labels.name"),
				name: T(i).name.value,
				"name-error": T(i).name_error.value,
				fields: r.value,
				values: T(i).values,
				"save-label": T(n)("common.actions.save"),
				"cancel-label": T(n)("common.actions.cancel"),
				"decrement-label": T(n)("common.actions.decrease"),
				"increment-label": T(n)("common.actions.increase"),
				pending: T(i).saving.value,
				"onUpdate:name": o[0] ||= (e) => {
					T(i).name.value = e;
				},
				"onUpdate:values": o[1] ||= (e) => T($)(T(i).values, e),
				onSave: T(i).save,
				onCancel: T(i).close_dialog
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
}), Je = "novelai", Ye = "google", Xe = /* @__PURE__ */ k({
	__name: "VibePanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = S(), r = C(() => [{
			value: Je,
			label: n("assets.vibe.provider_novelai")
		}, {
			value: Ye,
			label: n("assets.vibe.provider_google")
		}]), i = C(() => {
			let e = [{
				key: "notes",
				label: n("assets.vibe.notes_label"),
				kind: "textarea"
			}];
			return o.values.provider !== Ye && e.push({
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
		}], o = Q("vibe", t.controller, () => i.value, () => n("errors.validation_required")), c = C(() => typeof o.values.provider == "string" && o.values.provider !== "" ? o.values.provider : Je);
		function u(e) {
			o.values.provider = e;
		}
		let f = (e) => n("assets.delete_confirm_title", { name: e });
		return (t, p) => (s(), d("div", null, [A(X, {
			records: e.records,
			"summary-fields": a,
			loading: e.loading,
			"search-label": T(n)("common.actions.search"),
			"search-placeholder": T(n)("common.actions.search"),
			"empty-title": T(n)("assets.vibe.empty_title"),
			"empty-description": T(n)("assets.vibe.empty_description"),
			"add-label": T(n)("assets.vibe.add_action"),
			"random-label": T(n)("assets.random_selection_action"),
			"reorder-hint": T(n)("assets.reorder_hint"),
			"edit-label": T(n)("common.actions.edit"),
			"delete-label": T(n)("common.actions.delete"),
			"delete-confirm-title": f,
			"delete-confirm-description": T(n)("assets.delete_confirm_description"),
			"confirm-label": T(n)("confirmations.destructive.default_confirm_action"),
			"cancel-label": T(n)("confirmations.destructive.default_cancel_action"),
			"move-up-label": T(n)("assets.move_up_action"),
			"move-down-label": T(n)("assets.move_down_action"),
			"drag-handle-label": T(n)("assets.drag_handle_label"),
			onAdd: T(o).open_create,
			onEdit: T(o).open_edit,
			onDelete: T(o).remove,
			onReorder: T(o).reorder,
			onRandomSelect: T(o).random_select
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
		]), A(L, {
			open: T(o).dialog_open.value,
			title: T(o).editing_record.value ? T(n)("common.actions.edit") : T(n)("assets.vibe.add_action"),
			description: T(n)("assets.form_dialog_description"),
			"close-label": T(n)("common.actions.close"),
			"onUpdate:open": p[2] ||= (e) => {
				e || T(o).close_dialog();
			}
		}, {
			default: l(() => [A(Z, {
				"name-label": T(n)("common.labels.name"),
				"name-placeholder": T(n)("common.labels.name"),
				name: T(o).name.value,
				"name-error": T(o).name_error.value,
				fields: i.value,
				values: T(o).values,
				"save-label": T(n)("common.actions.save"),
				"cancel-label": T(n)("common.actions.cancel"),
				"decrement-label": T(n)("common.actions.decrease"),
				"increment-label": T(n)("common.actions.increase"),
				pending: T(o).saving.value,
				"onUpdate:name": p[0] ||= (e) => {
					T(o).name.value = e;
				},
				"onUpdate:values": p[1] ||= (e) => T($)(T(o).values, e),
				onSave: T(o).save,
				onCancel: T(o).close_dialog
			}, {
				"extra-fields": l(() => [A(B, { label: T(n)("assets.vibe.provider_label") }, {
					default: l(() => [A(de, {
						"model-value": c.value,
						options: r.value,
						label: T(n)("assets.vibe.provider_label"),
						"onUpdate:modelValue": u
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
}, Qe = ["placeholder"], $e = ["aria-expanded"], et = /* @__PURE__ */ k({
	__name: "VocabularyPanel",
	props: {
		catalog: {},
		installCommand: {},
		loading: { type: Boolean },
		controller: {},
		locale: {}
	},
	setup(r) {
		let a = r, { t: c } = S();
		t(() => {
			a.controller.load_vocabulary_catalog();
		});
		let p = /nsfw|adult|explicit/iu;
		function m(e) {
			return p.test(e.package_id) || p.test(e.display_name.en) || p.test(e.display_name["zh-CN"]);
		}
		let v = C(() => a.catalog.filter((e) => !m(e))), y = C(() => a.catalog.filter((e) => m(e))), w = e(!1);
		function E(e) {
			return a.locale === "zh-CN" ? e.display_name["zh-CN"] : e.display_name.en;
		}
		let k = e(null), j = e(null);
		function te(e) {
			switch (e.phase) {
				case "verifying_catalog_manifest": return c("assets.vocabulary.progress_verifying_catalog_manifest");
				case "downloading": return c("assets.vocabulary.progress_downloading");
				case "verifying_package": return c("assets.vocabulary.progress_verifying_package");
				case "installing": return c("assets.vocabulary.progress_installing");
				default: return "";
			}
		}
		async function L(e) {
			k.value === null && (k.value = e.package_id, j.value = null, await a.controller.install_vocabulary_package(e, (e) => {
				j.value = te(e);
			}), k.value = null, j.value = null, a.controller.state.assets.vocabulary_install_command.status === "success" && (z.value = [], B.value = null, R.value.trim() !== "" && await G()));
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
		let ie = C(() => a.loading ? "loading" : a.catalog.length === 0 ? "empty" : "ready"), ae = C(() => V.value && z.value.length === 0 ? "loading" : R.value.trim() === "" || z.value.length > 0 ? "ready" : "empty");
		return (e, t) => (s(), d("div", { class: b(T(Y).vocabularyPanel) }, [
			x("section", null, [
				x("p", { class: b(T(Y).sectionTitle) }, h(T(c)("assets.vocabulary.search_placeholder")), 3),
				x("div", { class: b(T(Y).vocabularySearchRow) }, [x("label", Ze, h(T(c)("assets.vocabulary.search_placeholder")), 1), u(x("input", {
					id: "vocabulary-search-input",
					"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
					type: "text",
					class: b(T(Y).searchInput),
					placeholder: T(c)("assets.vocabulary.search_placeholder")
				}, null, 10, Qe), [[f, R.value]])], 2),
				A(I, {
					status: ae.value,
					"empty-message": T(c)("assets.vocabulary.empty_title"),
					"min-height": "60px"
				}, {
					action: l(() => [x("p", { class: b(T(Y).emptyDescription) }, h(T(c)("assets.vocabulary.empty_description")), 3)]),
					default: l(() => [z.value.length > 0 ? (s(), d("ul", {
						key: 0,
						class: b(T(Y).searchResultsList)
					}, [(s(!0), d(D, null, i(z.value, (e) => (s(), d("li", {
						key: e.record_id,
						class: b(T(Y).searchResultRow)
					}, [
						x("span", { class: b(T(Y).searchResultTag) }, h(e.display_text), 3),
						e.category ? (s(), d("span", {
							key: 0,
							class: b(T(Y).searchResultTranslation)
						}, h(e.category), 3)) : g("", !0),
						A(F, {
							label: U.value === e.record_id ? T(c)("common.actions.copied") : T(c)("common.actions.copy"),
							icon: T(ee),
							variant: "secondary",
							onClick: () => void re(e)
						}, null, 8, [
							"label",
							"icon",
							"onClick"
						])
					], 2))), 128))], 2)) : g("", !0)]),
					_: 1
				}, 8, ["status", "empty-message"]),
				B.value === null ? g("", !0) : (s(), d("div", {
					key: 0,
					class: b(T(Y).loadMoreRow)
				}, [A(F, {
					label: T(c)("common.actions.next"),
					variant: "secondary",
					pending: H.value,
					onClick: t[1] ||= () => void ne()
				}, null, 8, ["label", "pending"])], 2))
			]),
			x("section", null, [
				x("p", { class: b(T(Y).sectionTitle) }, h(T(c)("assets.vocabulary.update_action")), 3),
				A(I, {
					status: ie.value,
					"empty-message": T(c)("assets.vocabulary.empty_title"),
					"min-height": "80px"
				}, {
					action: l(() => [x("p", { class: b(T(Y).emptyDescription) }, h(T(c)("assets.vocabulary.empty_description")), 3)]),
					default: l(() => [x("div", { class: b(T(Y).catalogList) }, [(s(!0), d(D, null, i(v.value, (e) => (s(), d("div", {
						key: e.package_id,
						class: b(T(Y).catalogEntry)
					}, [x("div", { class: b(T(Y).catalogEntryInfo) }, [x("span", { class: b(T(Y).catalogEntryName) }, h(E(e)), 3), x("span", { class: b(["tc-tabular-nums", T(Y).catalogEntryMeta]) }, h(T(c)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), e.bundled ? (s(), d("span", {
						key: 0,
						class: b(T(Y).bundledBadge)
					}, h(T(c)("assets.vocabulary.bundled_label")), 3)) : (s(), _(F, {
						key: 1,
						label: T(c)("assets.vocabulary.import_action"),
						icon: T(P),
						variant: "primary",
						pending: k.value === e.package_id,
						onClick: () => void L(e)
					}, null, 8, [
						"label",
						"icon",
						"pending",
						"onClick"
					]))], 2))), 128))], 2)]),
					_: 1
				}, 8, ["status", "empty-message"]),
				k.value !== null && j.value !== null ? (s(), d("p", {
					key: 0,
					class: b(T(Y).installProgress)
				}, h(j.value), 3)) : g("", !0)
			]),
			y.value.length > 0 ? (s(), d("section", {
				key: 0,
				class: b(T(Y).nsfwSection)
			}, [x("button", {
				type: "button",
				class: b(["tc-interactive", T(Y).nsfwToggle]),
				"aria-expanded": w.value,
				onClick: t[2] ||= (e) => w.value = !w.value
			}, [(s(), _(o(w.value ? T(N) : T(M)), {
				size: 14,
				"stroke-width": 1.75,
				"aria-hidden": "true"
			})), O(" " + h(T(c)("assets.vocabulary.nsfw_disclosure_label")), 1)], 10, $e), w.value ? (s(), d("div", {
				key: 1,
				class: b(T(Y).catalogList)
			}, [x("p", { class: b(T(Y).nsfwNotice) }, h(T(c)("assets.vocabulary.nsfw_disclosure_hint")), 3), (s(!0), d(D, null, i(y.value, (e) => (s(), d("div", {
				key: e.package_id,
				class: b(T(Y).catalogEntry)
			}, [x("div", { class: b(T(Y).catalogEntryInfo) }, [x("span", { class: b(T(Y).catalogEntryName) }, h(E(e)), 3), x("span", { class: b(["tc-tabular-nums", T(Y).catalogEntryMeta]) }, h(T(c)("assets.vocabulary.tag_count", e.record_count)), 3)], 2), A(F, {
				label: T(c)("assets.vocabulary.import_action"),
				icon: T(P),
				variant: "destructive",
				pending: k.value === e.package_id,
				onClick: () => void L(e)
			}, null, 8, [
				"label",
				"icon",
				"pending",
				"onClick"
			])], 2))), 128))], 2)) : (s(), d("p", {
				key: 0,
				class: b(T(Y).nsfwNotice)
			}, h(T(c)("assets.vocabulary.nsfw_disclosure_hint")), 3))], 2)) : g("", !0)
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
], ot = ["id", "value"], st = "unmapped", ct = "{{", lt = "}}", ut = /* @__PURE__ */ k({
	__name: "WorkflowPanel",
	props: {
		records: {},
		loading: { type: Boolean },
		controller: {}
	},
	setup(t) {
		let r = t, { t: a, locale: o } = S(), c = [{
			key: "workflow_json",
			label: "",
			kind: "textarea"
		}], u = Q("workflow", r.controller, () => c, () => a("errors.validation_required")), f = e(null), m = e([]);
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
		let y = C(() => [{
			value: st,
			label: a("assets.workflow.placeholder_unmapped")
		}, ...nt.map((e) => ({
			value: e,
			label: v(e)
		}))]);
		function w() {
			let e = u.values.workflow_json;
			return typeof e == "string" ? e : "";
		}
		function E(e) {
			let t = e.placeholder_map, n = {};
			if (typeof t == "string") try {
				let e = JSON.parse(t);
				typeof e == "object" && e && (n = e);
			} catch {
				n = {};
			}
			m.value = Object.entries(n).map(([e, t]) => ({
				name: e,
				target: t
			}));
		}
		n(() => u.editing_record.value, (e) => {
			e ? E(e.payload) : m.value = [];
		}, { immediate: !0 });
		function O() {
			let e = rt(w()), t = new Map(m.value.map((e) => [e.name, e.target]));
			m.value = e.map((e) => ({
				name: e,
				target: t.get(e) ?? ""
			}));
		}
		function k(e, t) {
			let n = m.value.find((t) => t.name === e);
			n && (n.target = t === st ? "" : t);
		}
		function j() {
			f.value?.click();
		}
		function M(e) {
			return `${ct}${e}${lt}`;
		}
		async function N(e) {
			let t = e.target, n = t.files?.[0];
			if (t.value = "", !n) return;
			let r = await n.text();
			u.open_create(), u.name.value = n.name.replace(/\.json$/iu, ""), u.values.workflow_json = r, m.value = rt(r).map((e) => ({
				name: e,
				target: ""
			}));
		}
		async function ee() {
			let e = {};
			for (let t of m.value) e[t.name] = t.target;
			u.values.placeholder_map = JSON.stringify(e), await u.save();
		}
		let P = (e) => a("assets.delete_confirm_title", { name: e });
		return (e, n) => (s(), d("div", null, [
			x("div", { class: b(T(Y).workflowToolbarRow) }, [A(F, {
				label: T(a)("assets.workflow.import_action"),
				icon: T(me),
				variant: "primary",
				onClick: j
			}, null, 8, ["label", "icon"]), x("input", {
				ref_key: "file_input",
				ref: f,
				class: b(T(Y).hiddenFileInput),
				type: "file",
				accept: "application/json,.json",
				"aria-label": T(a)("assets.workflow.import_action"),
				onChange: n[0] ||= (e) => void N(e)
			}, null, 42, it)], 2),
			A(X, {
				records: t.records,
				"summary-fields": [],
				loading: t.loading,
				"search-label": T(a)("common.actions.search"),
				"search-placeholder": T(a)("common.actions.search"),
				"empty-title": T(a)("assets.workflow.empty_title"),
				"empty-description": T(a)("assets.workflow.empty_description"),
				"add-label": T(a)("assets.workflow.import_action"),
				"random-label": T(a)("assets.random_selection_action"),
				"reorder-hint": T(a)("assets.reorder_hint"),
				"edit-label": T(a)("assets.workflow.edit_action"),
				"delete-label": T(a)("common.actions.delete"),
				"delete-confirm-title": P,
				"delete-confirm-description": T(a)("assets.delete_confirm_description"),
				"confirm-label": T(a)("confirmations.destructive.default_confirm_action"),
				"cancel-label": T(a)("confirmations.destructive.default_cancel_action"),
				"move-up-label": T(a)("assets.move_up_action"),
				"move-down-label": T(a)("assets.move_down_action"),
				"drag-handle-label": T(a)("assets.drag_handle_label"),
				onAdd: j,
				onEdit: T(u).open_edit,
				onDelete: T(u).remove,
				onReorder: T(u).reorder,
				onRandomSelect: T(u).random_select
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
			A(L, {
				open: T(u).dialog_open.value,
				title: T(a)("assets.workflow.edit_action"),
				description: T(a)("assets.form_dialog_description"),
				"close-label": T(a)("common.actions.close"),
				"onUpdate:open": n[4] ||= (e) => {
					e || T(u).close_dialog();
				}
			}, {
				default: l(() => [x("form", {
					class: b(T(Y).form),
					onSubmit: n[3] ||= p(() => void ee(), ["prevent"])
				}, [
					A(B, {
						label: T(a)("common.labels.name"),
						error: T(u).name_error.value,
						required: ""
					}, {
						default: l(({ fieldId: e, describedBy: t, invalid: r }) => [x("input", {
							id: e,
							class: b(T(Y).textInput),
							type: "text",
							placeholder: T(a)("common.labels.name"),
							value: T(u).name.value,
							"aria-describedby": t,
							"aria-invalid": r,
							onInput: n[1] ||= (e) => T(u).name.value = e.target.value
						}, null, 42, at)]),
						_: 1
					}, 8, ["label", "error"]),
					A(B, { label: T(a)("assets.workflow.json_label") }, {
						default: l(({ fieldId: e }) => [x("textarea", {
							id: e,
							class: b(T(Y).textArea),
							style: {
								"min-height": "160px",
								"font-family": "ui-monospace, monospace"
							},
							value: w(),
							onInput: n[2] ||= (e) => T(u).values.workflow_json = e.target.value
						}, null, 42, ot)]),
						_: 1
					}, 8, ["label"]),
					A(F, {
						label: T(a)("assets.workflow.placeholder_scan_action"),
						icon: T(pe),
						variant: "secondary",
						type: "button",
						onClick: O
					}, null, 8, ["label", "icon"]),
					m.value.length > 0 ? (s(), d("div", {
						key: 0,
						class: b(T(Y).placeholderList)
					}, [(s(!0), d(D, null, i(m.value, (e) => (s(), d("div", {
						key: e.name,
						class: b(T(Y).placeholderRow)
					}, [x("span", { class: b(T(Y).placeholderKey) }, h(M(e.name)), 3), (s(), _(H, {
						key: T(o),
						"model-value": e.target === "" ? st : e.target,
						options: y.value,
						placeholder: T(a)("assets.workflow.placeholder_unmapped"),
						ariaLabel: e.name,
						"onUpdate:modelValue": (t) => k(e.name, t)
					}, null, 8, [
						"model-value",
						"options",
						"placeholder",
						"ariaLabel",
						"onUpdate:modelValue"
					]))], 2))), 128))], 2)) : g("", !0),
					x("div", { class: b(T(Y).formActions) }, [A(F, {
						label: T(a)("common.actions.cancel"),
						variant: "secondary",
						type: "button",
						onClick: T(u).close_dialog
					}, null, 8, ["label", "onClick"]), A(F, {
						label: T(a)("common.actions.save"),
						variant: "primary",
						type: "submit",
						pending: T(u).saving.value
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
}), dt = /* @__PURE__ */ k({
	__name: "AssetsView",
	props: {
		state: {},
		controller: {}
	},
	setup(t) {
		let n = t, { t: r, locale: i } = S(), a = /* @__PURE__ */ new Set([
			"character",
			"outfit",
			"lora",
			"vibe",
			"reference",
			"workflow"
		]), o = e(n.state.assets.active_category);
		function c(e) {
			o.value = e, a.has(e) && n.controller.set_active_asset_category(e);
		}
		let u = C(() => n.state.loading.has("assets")), f = C(() => n.state.loading.has("personas")), p = C(() => n.state.loading.has("knowledge")), m = C(() => n.state.loading.has("vocabulary")), g = C(() => i.value === "zh-CN" ? "zh-CN" : "en");
		return (e, n) => (s(), d("div", { class: b(T(Y).assetsView) }, [A(T(_e), {
			"model-value": o.value,
			"onUpdate:modelValue": c
		}, {
			default: l(() => [
				A(T(be), {
					class: b(T(Y).tabsList),
					"aria-label": T(r)("nav.assets")
				}, {
					default: l(() => [
						A(T(J), {
							value: "vocabulary",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.vocabulary")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(T(J), {
							value: "persona",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.personas")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(T(J), {
							value: "knowledge",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.knowledge")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(T(J), {
							value: "character",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.characters")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(T(J), {
							value: "outfit",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.outfits")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(T(J), {
							value: "lora",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.lora")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(T(J), {
							value: "vibe",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.vibe")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(T(J), {
							value: "reference",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.reference")), 1)]),
							_: 1
						}, 8, ["class"]),
						A(T(J), {
							value: "workflow",
							class: b(T(Y).tabsTrigger)
						}, {
							default: l(() => [O(h(T(r)("assets.tabs.workflow")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					_: 1
				}, 8, ["class", "aria-label"]),
				A(T(q), {
					value: "vocabulary",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(et, {
						catalog: t.state.assets.vocabulary_catalog,
						"install-command": t.state.assets.vocabulary_install_command,
						loading: m.value,
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
				A(T(q), {
					value: "persona",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(Ge, {
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
				A(T(q), {
					value: "knowledge",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(Be, {
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
				A(T(q), {
					value: "character",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(Pe, {
						records: t.state.assets.records.character,
						loading: u.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(T(q), {
					value: "outfit",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(Ke, {
						records: t.state.assets.records.outfit,
						"character-records": t.state.assets.records.character,
						loading: u.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"character-records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(T(q), {
					value: "lora",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(Ve, {
						records: t.state.assets.records.lora,
						loading: u.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(T(q), {
					value: "vibe",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(Xe, {
						records: t.state.assets.records.vibe,
						loading: u.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(T(q), {
					value: "reference",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(qe, {
						records: t.state.assets.records.reference,
						loading: u.value,
						controller: t.controller
					}, null, 8, [
						"records",
						"loading",
						"controller"
					])]),
					_: 1
				}, 8, ["class"]),
				A(T(q), {
					value: "workflow",
					class: b(T(Y).tabsContent)
				}, {
					default: l(() => [A(ut, {
						records: t.state.assets.records.workflow,
						loading: u.value,
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
