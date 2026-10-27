import { $ as e, D as t, F as n, G as r, I as i, N as a, W as o, _ as s, a as c, ct as l, et as u, g as d, h as f, m as p, p as m, pt as h, u as g, ut as _, x as v, y } from "./vue-i18n-DUz2Gjn8.js";
import { n as b, t as x } from "./AppIcon-Cnhzrx9o.js";
import { t as S } from "./chevron-down-Tu_8qTxg.js";
import { t as C } from "./chevron-up-D4TetO-M.js";
import { n as w, t as T } from "./StateSurface-C9BHPFzJ.js";
import { n as E, t as D } from "./FieldGroup-BT7DUBzO.js";
import { t as O } from "./shuffle-BAB9O4dE.js";
import { t as k } from "./trash-2-B6ZXZcor.js";
import { t as A } from "./_prop_utils-CqbCYIc0.js";
import { t as j } from "./NumberStepper-D_xT95AR.js";
import { t as M } from "./ConfirmDialog-BmeYOL4s.js";
import { t as N } from "./IconButton-CwFaDVm-.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/grip-vertical.js
var P = b("grip-vertical", [
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
]), F = {
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
function I(e, t) {
	let n = e[t.key];
	return t.kind === "number" ? typeof n == "number" ? n : 0 : typeof n == "string" ? n : "";
}
function L(e, t) {
	let n = {};
	for (let r of e) n[r.key] = t ? I(t.payload, r) : r.kind === "number" ? 0 : "";
	return n;
}
function R(e) {
	return L(e, null);
}
function z(e) {
	return typeof e == "string" || typeof e == "number" || typeof e == "boolean" ? String(e) : null;
}
function B(e, t) {
	let n = [];
	for (let r of t) {
		let t = e[r.key];
		if (t == null || t === "") continue;
		let i = z(t);
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
var V = ["for"], H = [
	"id",
	"placeholder",
	"aria-label"
], U = [
	"data-dragging",
	"onDragstart",
	"onDrop"
], W = ["aria-label"], G = ["aria-label", "onClick"], K = /* @__PURE__ */ v({
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
		let i = e, f = t, v = u(""), b = u(null), D = u(null), A = m(() => {
			let e = v.value.trim().toLowerCase();
			return e === "" ? i.records : i.records.filter((t) => t.display_name.toLowerCase().includes(e));
		}), j = m(() => i.loading ? "loading" : i.records.length === 0 ? "empty" : "ready");
		function I(e) {
			return B(e.payload, i.summaryFields);
		}
		function L(e) {
			b.value = e;
		}
		function R() {
			b.value && f("delete", b.value.id), b.value = null;
		}
		function z(e, t) {
			let n = i.records.findIndex((t) => t.id === e), r = n + t;
			if (n === -1 || r < 0 || r >= i.records.length) return;
			let a = [...i.records], [o] = a.splice(n, 1);
			o !== void 0 && (a.splice(r, 0, o), f("reorder", a.map((e) => e.id)));
		}
		function K() {
			if (i.records.length === 0) return;
			let e = Math.floor(Math.random() * i.records.length), t = i.records[e];
			t && f("random-select", t);
		}
		function q(e, t) {
			D.value = e, t.dataTransfer?.setData("text/plain", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
		}
		function J(e) {
			e.preventDefault();
		}
		function Y(e, t) {
			t.preventDefault();
			let n = D.value;
			if (D.value = null, !n || n === e) return;
			let r = i.records.findIndex((e) => e.id === n), a = i.records.findIndex((t) => t.id === e);
			if (r === -1 || a === -1) return;
			let o = [...i.records], [s] = o.splice(r, 1);
			s !== void 0 && (o.splice(a, 0, s), f("reorder", o.map((e) => e.id)));
		}
		return (t, i) => (a(), s("div", { class: _(l(F).categoryList) }, [
			p("div", { class: _(l(F).categoryToolbar) }, [
				p("label", {
					class: "tc-visually-hidden",
					for: `${e.searchLabel}-search`
				}, h(e.searchLabel), 9, V),
				r(p("input", {
					id: `${e.searchLabel}-search`,
					"onUpdate:modelValue": i[0] ||= (e) => v.value = e,
					type: "text",
					class: _(l(F).searchInput),
					placeholder: e.searchPlaceholder,
					"aria-label": e.searchLabel
				}, null, 10, H), [[c, v.value]]),
				y(w, {
					label: e.randomLabel,
					icon: l(O),
					variant: "secondary",
					onClick: K
				}, null, 8, ["label", "icon"]),
				y(w, {
					label: e.addLabel,
					icon: l(E),
					variant: "primary",
					onClick: i[1] ||= (e) => f("add")
				}, null, 8, ["label", "icon"])
			], 2),
			e.records.length > 1 ? (a(), s("p", {
				key: 0,
				class: _(l(F).reorderHint)
			}, h(e.reorderHint), 3)) : d("", !0),
			y(T, {
				status: j.value,
				"empty-title": e.emptyTitle,
				"min-height": "120px"
			}, {
				action: o(() => [p("p", { class: _(l(F).emptyDescription) }, h(e.emptyDescription), 3), y(w, {
					label: e.addLabel,
					icon: l(E),
					variant: "primary",
					onClick: i[2] ||= (e) => f("add")
				}, null, 8, ["label", "icon"])]),
				default: o(() => [p("ul", { class: _(l(F).cardGrid) }, [(a(!0), s(g, null, n(A.value, (t) => (a(), s("li", {
					key: t.id,
					class: _(l(F).assetCard),
					draggable: "true",
					"data-dragging": D.value === t.id ? "" : null,
					onDragstart: (e) => q(t.id, e),
					onDragover: J,
					onDrop: (e) => Y(t.id, e)
				}, [
					p("span", {
						class: _(l(F).dragHandle),
						"aria-label": e.dragHandleLabel,
						"aria-hidden": "true"
					}, [y(x, {
						icon: l(P),
						size: 16
					}, null, 8, ["icon"])], 10, W),
					p("button", {
						type: "button",
						class: _(l(F).assetCardMain),
						"aria-label": `${e.editLabel}: ${t.display_name}`,
						onClick: (e) => f("edit", t)
					}, [p("span", { class: _(l(F).assetCardName) }, h(t.display_name), 3), I(t).length > 0 ? (a(), s("span", {
						key: 0,
						class: _(l(F).assetCardSummary)
					}, [(a(!0), s(g, null, n(I(t), (e) => (a(), s("span", {
						key: e.label,
						class: _([l(F).assetCardSummaryPart, e.numeric && "tc-tabular-nums"])
					}, h(e.label) + ": " + h(e.value), 3))), 128))], 2)) : d("", !0)], 10, G),
					p("div", { class: _(l(F).assetCardActions) }, [
						y(N, {
							icon: l(C),
							size: "sm",
							label: e.moveUpLabel,
							onClick: (e) => z(t.id, -1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						y(N, {
							icon: l(S),
							size: "sm",
							label: e.moveDownLabel,
							onClick: (e) => z(t.id, 1)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						]),
						y(N, {
							icon: l(k),
							size: "sm",
							destructive: "",
							label: e.deleteLabel,
							onClick: (e) => L(t)
						}, null, 8, [
							"icon",
							"label",
							"onClick"
						])
					], 2)
				], 42, U))), 128))], 2)]),
				_: 1
			}, 8, ["status", "empty-title"]),
			y(M, {
				open: b.value !== null,
				title: b.value ? e.deleteConfirmTitle(b.value.display_name) : "",
				description: e.deleteConfirmDescription,
				"confirm-label": e.confirmLabel,
				"cancel-label": e.cancelLabel,
				"onUpdate:open": i[3] ||= (e) => {
					e || (b.value = null);
				},
				onConfirm: R
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label"
			])
		], 2));
	}
}), q = [
	"id",
	"placeholder",
	"value",
	"aria-describedby",
	"aria-invalid"
], J = [
	"id",
	"value",
	"aria-describedby",
	"onInput"
], Y = [
	"id",
	"value",
	"aria-describedby",
	"onInput"
], X = /* @__PURE__ */ v({
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
	setup(e, { emit: r }) {
		let c = e, u = r;
		function v(e, t) {
			u("update:values", {
				...c.values,
				[e]: t
			});
		}
		function b(e, t) {
			u("update:values", {
				...c.values,
				[e]: t
			});
		}
		function x(e) {
			e.preventDefault(), u("save");
		}
		let S = m(() => c.pending);
		return (r, c) => (a(), s("form", {
			class: _(l(F).form),
			onSubmit: x
		}, [
			y(D, {
				label: e.nameLabel,
				error: e.nameError,
				required: ""
			}, {
				default: o(({ fieldId: t, describedBy: n, invalid: r }) => [p("input", {
					id: t,
					class: _(l(F).textInput),
					type: "text",
					placeholder: e.namePlaceholder,
					value: e.name,
					"aria-describedby": n,
					"aria-invalid": r,
					onInput: c[0] ||= (e) => u("update:name", e.target.value)
				}, null, 42, q)]),
				_: 1
			}, 8, ["label", "error"]),
			(a(!0), s(g, null, n(e.fields, (n) => (a(), f(D, t({
				key: n.key,
				label: n.label
			}, { ref_for: !0 }, l(A)({ hint: n.hint })), {
				default: o(({ fieldId: r, describedBy: i }) => [n.kind === "text" ? (a(), s("input", {
					key: 0,
					id: r,
					class: _(l(F).textInput),
					type: "text",
					value: e.values[n.key],
					"aria-describedby": i,
					onInput: (e) => v(n.key, e.target.value)
				}, null, 42, J)) : n.kind === "textarea" ? (a(), s("textarea", {
					key: 1,
					id: r,
					class: _(l(F).textArea),
					value: e.values[n.key],
					"aria-describedby": i,
					onInput: (e) => v(n.key, e.target.value)
				}, null, 42, Y)) : (a(), f(j, t({
					key: 2,
					id: r,
					"model-value": typeof e.values[n.key] == "number" ? e.values[n.key] : 0,
					label: n.label,
					step: n.step ?? 1,
					"decrement-label": e.decrementLabel,
					"increment-label": e.incrementLabel
				}, { ref_for: !0 }, l(A)({
					min: n.min,
					max: n.max,
					describedBy: i
				}), { "onUpdate:modelValue": (e) => b(n.key, e) }), null, 16, [
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
			i(r.$slots, "extra-fields"),
			e.saveError ? (a(), s("p", {
				key: 0,
				class: _(l(F).formError),
				role: "alert"
			}, h(e.saveError), 3)) : d("", !0),
			p("div", { class: _(l(F).formActions) }, [y(w, {
				label: e.cancelLabel,
				variant: "secondary",
				type: "button",
				onClick: c[1] ||= (e) => u("cancel")
			}, null, 8, ["label"]), y(w, {
				label: e.saveLabel,
				variant: "primary",
				type: "submit",
				pending: S.value
			}, null, 8, ["label", "pending"])], 2)
		], 34));
	}
});
//#endregion
//#region src/ui/views/assets/use_asset_category_panel.ts
function Z(t, n, r, i, a = []) {
	let o = u(!1), s = u(null), c = u(""), l = u(null), d = u(null), f = e({}), p = u(!1);
	function m() {
		s.value = null, c.value = "", l.value = null, d.value = null, Q(f, R(r())), o.value = !0;
	}
	function h(e) {
		s.value = e, c.value = e.display_name, l.value = null, d.value = null;
		let t = {};
		for (let n of a) {
			let r = e.payload[n];
			(typeof r == "string" || typeof r == "number") && (t[n] = r);
		}
		Q(f, {
			...L(r(), e),
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
		p.value = !0, d.value = null;
		try {
			let r = s.value?.id ?? crypto.randomUUID();
			await n.save_asset(t, {
				id: r,
				category: t,
				record_key: r,
				display_name: e,
				payload: { ...f }
			}), o.value = !1;
		} catch (e) {
			d.value = e instanceof Error ? e.message : String(e);
		} finally {
			p.value = !1;
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
		save_error: d,
		values: f,
		saving: p,
		open_create: m,
		open_edit: h,
		close_dialog: g,
		save: _,
		remove: v,
		reorder: y,
		random_select: b
	};
}
function Q(e, t) {
	for (let t of Object.keys(e)) Reflect.deleteProperty(e, t);
	Object.assign(e, t);
}
//#endregion
export { F as a, K as i, Z as n, X as r, Q as t };
