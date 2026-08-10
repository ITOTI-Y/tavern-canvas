import { $ as e, B as t, P as n, T as r, V as i, X as a, p as o, w as s, x as c } from "./vue-i18n-D0uIxSJk.js";
import { a as l, p as u } from "./Teleport-CfSgxnHY.js";
import { o as d } from "./FocusScope-MQ_KQm08.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function f() {
	let t = e();
	return {
		primitiveElement: t,
		currentElement: o(() => ["#text", "#comment"].includes(t.value?.$el.nodeName) ? t.value?.$el.nextElementSibling : u(t))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/utils.js
var p = "menu.itemSelect", m = ["Enter", " "], h = [
	"ArrowDown",
	"PageUp",
	"Home"
], g = [
	"ArrowUp",
	"PageDown",
	"End"
], _ = [...h, ...g];
[...m], [...m];
function v(e) {
	return e ? "open" : "closed";
}
function y(e) {
	let t = d();
	for (let n of e) if (n === t || (n.focus(), d() !== t)) return;
}
function b(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function x(e, t) {
	return t ? b({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function S(e) {
	return e.pointerType === "mouse";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Collection/Collection.js
var C = "data-reka-collection-item";
function w(u = {}) {
	let { key: d = "", isProvider: p = !1 } = u, m = `${d}CollectionProvider`, h;
	if (p) {
		let t = e(/* @__PURE__ */ new Map());
		h = {
			collectionRef: e(),
			itemMap: t
		}, n(m, h);
	} else h = r(m);
	let g = (e = !1) => {
		let t = h.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${C}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(h.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, _ = /*#__PURE__*/ c({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: n, attrs: r }) {
			let { primitiveElement: i, currentElement: a } = f();
			return t(a, () => {
				h.collectionRef.value = a.value;
			}), () => s(l, {
				ref: i,
				...r
			}, n);
		}
	}), v = /*#__PURE__*/ c({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: o } = f();
			return i((t) => {
				if (o.value) {
					let n = a(o.value);
					h.itemMap.value.set(n, {
						ref: o.value,
						value: e.value
					}), t(() => h.itemMap.value.delete(n));
				}
			}), () => s(l, {
				...n,
				[C]: "",
				ref: r
			}, t);
		}
	});
	return {
		getItems: g,
		reactiveItems: o(() => Array.from(h.itemMap.value.values())),
		itemMapSize: o(() => h.itemMap.value.size),
		CollectionSlot: _,
		CollectionItem: v
	};
}
//#endregion
export { m as a, S as c, g as i, x as l, _ as n, y as o, p as r, v as s, w as t, f as u };
