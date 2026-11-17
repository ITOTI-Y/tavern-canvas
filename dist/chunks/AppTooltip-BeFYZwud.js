import { B as e, C as t, E as n, F as r, G as i, I as a, K as o, M as s, N as c, O as l, Q as u, R as d, S as f, T as p, W as m, Y as h, _ as g, at as _, c as v, ct as y, dt as b, et as x, ft as S, gt as C, h as w, ht as T, it as E, mt as D, p as O, pt as k, q as A, rt as j, st as M, tt as ee, v as N, w as te, x as P, y as F, z as ne } from "./vue-i18n-XoxYzLIP.js";
import { r as re } from "./portal_keys-CIBE-_PC.js";
import { t as ie } from "./components_styles-COPsMRS_.js";
import { A as ae, C as oe, D as se, O as ce, P as le, S as ue, a as de, c as fe, f as I, g as pe, h as me, l as he, p as ge, s as L, t as _e, u as ve, v as ye, y as be } from "./Teleport-zHbQRGnp.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useDirection.js
function xe(e) {
	let t = pe({ dir: j("ltr") });
	return O(() => e?.value || t.dir?.value || "ltr");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardProps.js
function Se(e) {
	let t = f(), n = Object.keys(t?.type.props ?? {}).reduce((e, n) => {
		let r = (t?.type.props[n]).default;
		return r !== void 0 && (e[n] = r), e;
	}, {}), r = M(e);
	return O(() => {
		let e = {}, i = t?.vnode.props ?? {};
		return Object.keys(i).forEach((t) => {
			e[S(t)] = i[t];
		}), Object.keys({
			...n,
			...e
		}).reduce((e, t) => (r.value[t] !== void 0 && (e[t] = r.value[t]), e), {});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardPropsEmits.js
function Ce(e, t) {
	let n = Se(e), r = t ? ge(t) : {};
	return O(() => ({
		...n.value,
		...r
	}));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function we(e, t) {
	let n = se(!1, 300);
	ce(() => {
		n.value = !1;
	});
	let r = j(null), a = oe();
	function o() {
		r.value = null, n.value = !1;
	}
	function s(e, t) {
		if (!t) return;
		let i = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = Ee(a, Te(a, i.getBoundingClientRect()), 1), s = De(t.getBoundingClientRect()), c = ke([...o, ...s]);
		r.value = c, n.value = !0;
	}
	return i((n) => {
		if (e.value && t.value) {
			let r = (e) => s(e, t.value), i = (t) => s(t, e.value);
			e.value.addEventListener("pointerleave", r), t.value.addEventListener("pointerleave", i), n(() => {
				e.value?.removeEventListener("pointerleave", r), t.value?.removeEventListener("pointerleave", i);
			});
		}
	}), i((n) => {
		if (r.value) {
			let i = (n) => {
				if (!r.value || !(n.target instanceof Element)) return;
				let i = n.target, s = {
					x: n.clientX,
					y: n.clientY
				}, c = e.value?.contains(i) || t.value?.contains(i), l = !Oe(s, r.value), u = !!i.closest("[data-grace-area-trigger]");
				c ? o() : (l || u) && (o(), a.trigger());
			};
			e.value?.ownerDocument.addEventListener("pointermove", i), n(() => e.value?.ownerDocument.removeEventListener("pointermove", i));
		}
	}), {
		isPointerInTransit: n,
		onPointerExit: a.on
	};
}
function Te(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function Ee(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right": r.push({
			x: e.x - n,
			y: e.y - n
		}, {
			x: e.x - n,
			y: e.y + n
		});
	}
	return r;
}
function De(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
function Oe(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function ke(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), Ae(t);
}
function Ae(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t.at(-1), n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n.at(-1), t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useSize.js
function je(e) {
	let t = j(), n = O(() => t.value?.width ?? 0), r = O(() => t.value?.height ?? 0), i;
	return s(() => {
		let n = ye(e);
		n ? (t.value = {
			width: n.offsetWidth,
			height: n.offsetHeight
		}, i = new ResizeObserver((e) => {
			if (!Array.isArray(e) || !e.length) return;
			let r = e[0], i, a;
			if ("borderBoxSize" in r) {
				let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
				i = t.inlineSize, a = t.blockSize;
			} else i = n.offsetWidth, a = n.offsetHeight;
			t.value = {
				width: i,
				height: a
			};
		}), i.observe(n, { box: "border-box" })) : t.value = void 0;
	}), c(() => {
		i?.disconnect(), i = void 0;
	}), {
		width: n,
		height: r
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function Me() {
	let e = j();
	return {
		primitiveElement: e,
		currentElement: O(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : ye(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Collection/Collection.js
var Ne = "data-reka-collection-item";
function Pe(e = {}) {
	let { key: t = "", isProvider: n = !1 } = e, r = `${t}CollectionProvider`, o;
	if (n) {
		let e = j(/* @__PURE__ */ new Map());
		o = {
			collectionRef: j(),
			itemMap: e
		}, a(r, o);
	} else o = p(r);
	let s = (e = !1) => {
		let t = o.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${Ne}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(o.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, c = /*#__PURE__*/ P({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: i } = Me();
			return m(i, () => {
				o.collectionRef.value = i.value;
			}), () => te(fe, {
				ref: r,
				...n
			}, t);
		}
	}), l = /*#__PURE__*/ P({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: a } = Me();
			return i((t) => {
				if (a.value) {
					let n = x(a.value);
					o.itemMap.value.set(n, {
						ref: a.value,
						value: e.value
					}), t(() => o.itemMap.value.delete(n));
				}
			}), () => te(fe, {
				...n,
				[Ne]: "",
				ref: r
			}, t);
		}
	});
	return {
		getItems: s,
		reactiveItems: O(() => Array.from(o.itemMap.value.values())),
		itemMapSize: O(() => o.itemMap.value.size),
		CollectionSlot: c,
		CollectionItem: l
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHidden.js
var Fe = /* @__PURE__ */ P({
	__name: "VisuallyHidden",
	props: {
		feature: {
			type: String,
			required: !1,
			default: "focusable"
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
		return (e, t) => (r(), w(b(L), {
			as: e.as,
			"as-child": e.asChild,
			"aria-hidden": e.feature === "focusable" || e.feature === "fully-hidden" ? "true" : void 0,
			"data-hidden": e.feature === "fully-hidden" ? "" : void 0,
			tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
			style: {
				position: "absolute",
				border: 0,
				width: "1px",
				height: "1px",
				padding: 0,
				margin: "-1px",
				overflow: "hidden",
				clip: "rect(0, 0, 0, 0)",
				clipPath: "inset(50%)",
				whiteSpace: "nowrap",
				wordWrap: "normal",
				top: "-1px",
				left: "-1px"
			}
		}, {
			default: A(() => [d(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"aria-hidden",
			"data-hidden",
			"tabindex"
		]));
	}
}), [Ie, Le] = /*#__PURE__*/ le("PopperRoot"), Re = /* @__PURE__ */ P({
	inheritAttrs: !1,
	__name: "PopperRoot",
	setup(e) {
		let t = j();
		return Le({
			anchor: t,
			onAnchorChange: (e) => t.value = e
		}), (e, t) => d(e.$slots, "default");
	}
}), ze = /* @__PURE__ */ P({
	__name: "PopperAnchor",
	props: {
		reference: {
			type: null,
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
		let t = e, { forwardRef: n, currentElement: i } = I(), a = Ie();
		return o(() => {
			a.onAnchorChange(t.reference ?? i.value);
		}), (e, t) => (r(), w(b(L), {
			ref: b(n),
			as: e.as,
			"as-child": e.asChild
		}, {
			default: A(() => [d(e.$slots, "default")]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), Be = {
	key: 0,
	d: "M0 0L6 6L12 0"
}, Ve = {
	key: 1,
	d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
}, He = /* @__PURE__ */ P({
	__name: "Arrow",
	props: {
		width: {
			type: Number,
			required: !1,
			default: 10
		},
		height: {
			type: Number,
			required: !1,
			default: 5
		},
		rounded: {
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
			default: "svg"
		}
	},
	setup(e) {
		let t = e;
		return I(), (e, n) => (r(), w(b(L), l(t, {
			width: e.width,
			height: e.height,
			viewBox: e.asChild ? void 0 : "0 0 12 6",
			preserveAspectRatio: e.asChild ? void 0 : "none"
		}), {
			default: A(() => [d(e.$slots, "default", {}, () => [e.rounded ? (r(), g("path", Ve)) : (r(), g("path", Be))])]),
			_: 3
		}, 16, [
			"width",
			"height",
			"viewBox",
			"preserveAspectRatio"
		]));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/utils.js
function Ue(e) {
	return e !== null;
}
function We(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Ge(n), u = {
				start: e.dir === "rtl" ? "100%" : "0%",
				center: "50%",
				end: e.dir === "rtl" ? "0%" : "100%"
			}[l], d = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[l], f = (i.arrow?.x ?? 0) + o / 2, p = (i.arrow?.y ?? 0) + s / 2, m = "", h = "";
			return c === "bottom" ? (m = a ? u : `${f}px`, h = `${-s}px`) : c === "top" ? (m = a ? u : `${f}px`, h = `${r.floating.height + s}px`) : c === "right" ? (m = `${-s}px`, h = a ? d : `${p}px`) : c === "left" && (m = `${r.floating.width + s}px`, h = a ? d : `${p}px`), { data: {
				x: m,
				y: h
			} };
		}
	};
}
function Ge(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Ke = [
	"top",
	"right",
	"bottom",
	"left"
], R = Math.min, z = Math.max, qe = Math.round, Je = Math.floor, B = (e) => ({
	x: e,
	y: e
}), Ye = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Xe(e, t, n) {
	return z(e, R(t, n));
}
function V(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function H(e) {
	return e.split("-")[0];
}
function U(e) {
	return e.split("-")[1];
}
function Ze(e) {
	return e === "x" ? "y" : "x";
}
function Qe(e) {
	return e === "y" ? "height" : "width";
}
function W(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function $e(e) {
	return Ze(W(e));
}
function et(e, t, n) {
	n === void 0 && (n = !1);
	let r = U(e), i = $e(e), a = Qe(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = lt(o)), [o, lt(o)];
}
function tt(e) {
	let t = lt(e);
	return [
		nt(e),
		t,
		nt(t)
	];
}
function nt(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var rt = ["left", "right"], it = ["right", "left"], at = ["top", "bottom"], ot = ["bottom", "top"];
function st(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? it : rt : t ? rt : it;
		case "left":
		case "right": return t ? at : ot;
		default: return [];
	}
}
function ct(e, t, n, r) {
	let i = U(e), a = st(H(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(nt)))), a;
}
function lt(e) {
	let t = H(e);
	return Ye[t] + e.slice(t.length);
}
function ut(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function dt(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : ut(e);
}
function ft(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function pt(e, t, n) {
	let { reference: r, floating: i } = e, a = W(t), o = $e(t), s = Qe(o), c = H(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = U(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function mt(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = V(t, e), p = dt(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = ft(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = ft(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var ht = 50, gt = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: mt
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = pt(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < ht && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = pt(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, _t = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = V(e, t) || {};
		if (l == null) return {};
		let d = dt(u), f = {
			x: n,
			y: r
		}, p = $e(i), m = Qe(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = R(d[_], T), D = R(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = Xe(E, k, O), j = !c.arrow && U(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + M,
			data: {
				[p]: A,
				centerOffset: k - A - M,
				...j && { alignmentOffset: M }
			},
			reset: j
		};
	}
}), vt = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = V(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = H(r), _ = W(o), v = H(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [lt(o)] : tt(o)), x = p !== "none";
			!d && x && b.push(...ct(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = et(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === W(t) || T.every((e) => W(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = W(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function yt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function bt(e) {
	return Ke.some((t) => e[t] >= 0);
}
var xt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = V(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = yt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: bt(e)
					} };
				}
				case "escaped": {
					let e = yt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: bt(e)
					} };
				}
				default: return {};
			}
		}
	};
}, St = /*#__PURE__*/ new Set(["left", "top"]);
async function Ct(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = H(n), s = U(n), c = W(n) === "y", l = St.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = V(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var wt = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ct(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Tt = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = V(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = W(i), p = Ze(f), m = u[p], h = u[f], g = (e, t) => Xe(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Et = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = V(e, t), u = {
				x: n,
				y: r
			}, d = W(i), f = Ze(d), p = u[f], m = u[d], h = V(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = St.has(H(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Dt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = V(e, t), c = await i.detectOverflow(t, s), l = H(n), u = U(n), d = W(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = R(p - c[m], g), y = R(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * z(c.left, c.right) : S = p - 2 * z(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Ot() {
	return typeof window < "u";
}
function G(e) {
	return kt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function K(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function q(e) {
	return ((kt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function kt(e) {
	return Ot() ? e instanceof Node || e instanceof K(e).Node : !1;
}
function J(e) {
	return Ot() ? e instanceof Element || e instanceof K(e).Element : !1;
}
function Y(e) {
	return Ot() ? e instanceof HTMLElement || e instanceof K(e).HTMLElement : !1;
}
function At(e) {
	return !Ot() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof K(e).ShadowRoot;
}
function jt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Z(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Mt(e) {
	return /^(table|td|th)$/.test(G(e));
}
function Nt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Pt = /transform|translate|scale|rotate|perspective|filter/, Ft = /paint|layout|strict|content/, X = (e) => !!e && e !== "none", It;
function Lt(e) {
	let t = J(e) ? Z(e) : e;
	return X(t.transform) || X(t.translate) || X(t.scale) || X(t.rotate) || X(t.perspective) || !zt() && (X(t.backdropFilter) || X(t.filter)) || Pt.test(t.willChange || "") || Ft.test(t.contain || "");
}
function Rt(e) {
	let t = Q(e);
	for (; Y(t) && !Bt(t);) {
		if (Lt(t)) return t;
		if (Nt(t)) return null;
		t = Q(t);
	}
	return null;
}
function zt() {
	return It ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), It;
}
function Bt(e) {
	return /^(html|body|#document)$/.test(G(e));
}
function Z(e) {
	return K(e).getComputedStyle(e);
}
function Vt(e) {
	return J(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Q(e) {
	if (G(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || At(e) && e.host || q(e);
	return At(t) ? t.host : t;
}
function Ht(e) {
	let t = Q(e);
	return Bt(t) ? (e.ownerDocument || e).body : Y(t) && jt(t) ? t : Ht(t);
}
function Ut(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Ht(e), i = r === e.ownerDocument?.body, a = K(r);
	if (i) {
		let e = Wt(a);
		return t.concat(a, a.visualViewport || [], jt(r) ? r : [], e && n ? Ut(e) : []);
	}
	return t.concat(r, Ut(r, [], n));
}
function Wt(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Gt(e) {
	let t = Z(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Y(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = qe(n) !== a || qe(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Kt(e) {
	return J(e) ? e : e.contextElement;
}
function qt(e) {
	let t = Kt(e);
	if (!Y(t)) return B(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Gt(t), o = (a ? qe(n.width) : n.width) / r, s = (a ? qe(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Jt = /*#__PURE__*/ B(0);
function Yt(e) {
	let t = K(e);
	return !zt() || !t.visualViewport ? Jt : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Xt(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === K(e);
}
function $(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Kt(e), o = B(1);
	t && (r ? J(r) && (o = qt(r)) : o = qt(e));
	let s = Xt(a, n, r) ? Yt(a) : B(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = K(a), t = J(r) ? K(r) : r, n = e, i = Wt(n);
		for (; i && t !== n;) {
			let e = qt(i), t = i.getBoundingClientRect(), r = Z(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = K(i), i = Wt(n);
		}
	}
	return ft({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Zt(e, t) {
	let n = Vt(e).scrollLeft;
	return t ? t.left + n : $(q(e)).left + n;
}
function Qt(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Zt(e, n),
		y: n.top + t.scrollTop
	};
}
function $t(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = q(r), s = t ? Nt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = B(1), u = B(0), d = Y(r);
	if ((d || !a) && ((G(r) !== "body" || jt(o)) && (c = Vt(r)), d)) {
		let e = $(r);
		l = qt(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Qt(o, c) : B(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function en(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function tn(e) {
	let t = Vt(e), n = e.ownerDocument.body, r = z(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = z(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Zt(e), o = -t.scrollTop;
	return Z(n).direction === "rtl" && (a += z(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var nn = 25;
function rn(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = K(e), a = q(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !zt() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Zt(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= nn && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function an(e, t) {
	let n = $(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = qt(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function on(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = rn(e, n, t);
	else if (t === "document") r = tn(q(e));
	else if (J(t)) r = an(t, n);
	else {
		let n = Yt(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return ft(r);
}
function sn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Ut(e, [], !1).filter((e) => J(e) && G(e) !== "body"), i = null, a = Z(e).position === "fixed", o = a ? Q(e) : e;
	for (; J(o) && !Bt(o);) {
		let e = Z(o), t = Lt(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Q(o);
	}
	return t.set(e, r), r;
}
function cn(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Nt(t) ? [] : sn(t, this._c) : [].concat(n), r], o = on(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = on(t, a[e], i);
		s = z(n.top, s), c = R(n.right, c), l = R(n.bottom, l), u = z(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function ln(e) {
	let { width: t, height: n } = Gt(e);
	return {
		width: t,
		height: n
	};
}
function un(e, t, n) {
	let r = Y(t), i = q(t), a = n === "fixed", o = $(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = B(0);
	if ((r || !a) && ((G(t) !== "body" || jt(i)) && (s = Vt(t)), r)) {
		let e = $(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Zt(i));
	let l = i && !r && !a ? Qt(i, s) : B(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function dn(e) {
	return Z(e).position === "static";
}
function fn(e, t) {
	if (!Y(e) || Z(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return q(e) === n && (n = n.ownerDocument.body), n;
}
function pn(e, t) {
	let n = K(e);
	if (Nt(e)) return n;
	if (!Y(e)) {
		let t = Q(e);
		for (; t && !Bt(t);) {
			if (J(t) && !dn(t)) return t;
			t = Q(t);
		}
		return n;
	}
	let r = fn(e, t);
	for (; r && Mt(r) && dn(r);) r = fn(r, t);
	return r && Bt(r) && dn(r) && !Lt(r) ? n : r || Rt(e) || n;
}
var mn = async function(e) {
	let t = this.getOffsetParent || pn, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: un(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function hn(e) {
	return Z(e).direction === "rtl";
}
var gn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: $t,
	getDocumentElement: q,
	getClippingRect: cn,
	getOffsetParent: pn,
	getElementRects: mn,
	getClientRects: en,
	getDimensions: ln,
	getScale: qt,
	isElement: J,
	isRTL: hn
};
function _n(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function vn(e, t, n) {
	let r = null, i, a = q(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Je(d), h = Je(a.clientWidth - (u + f)), g = Je(a.clientHeight - (d + p)), _ = Je(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: z(0, R(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!_n(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = K(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function yn(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Kt(e), u = i || a ? [...l ? Ut(l) : [], ...t ? Ut(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? vn(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? $(e) : null;
	c && g();
	function g() {
		let t = $(e);
		h && !_n(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var bn = wt, xn = Tt, Sn = vt, Cn = Dt, wn = xt, Tn = _t, En = Et, Dn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...gn,
		...i.platform,
		_c: r
	};
	return gt(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+vue@1.1.11_vue@3.5.40_typescript@6.0.3_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function On(e) {
	return typeof e == "object" && !!e && "$el" in e;
}
function kn(e) {
	if (On(e)) {
		let t = e.$el;
		return kt(t) && G(t) === "#comment" ? null : t;
	}
	return e;
}
function An(e) {
	return typeof e == "function" ? e() : b(e);
}
function jn(e) {
	return {
		name: "arrow",
		options: e,
		fn(t) {
			let n = kn(An(e.element));
			return n == null ? {} : Tn({
				element: n,
				padding: e.padding
			}).fn(t);
		}
	};
}
function Mn(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Nn(e, t) {
	let n = Mn(e);
	return Math.round(t * n) / n;
}
function Pn(e, t, n) {
	n === void 0 && (n = {});
	let r = n.whileElementsMounted, i = O(() => An(n.open) ?? !0), a = O(() => An(n.middleware)), o = O(() => An(n.placement) ?? "bottom"), s = O(() => An(n.strategy) ?? "absolute"), c = O(() => An(n.transform) ?? !0), l = O(() => kn(e.value)), d = O(() => kn(t.value)), f = j(0), p = j(0), h = j(s.value), g = j(o.value), v = _({}), y = j(!1), b = O(() => {
		let e = {
			position: h.value,
			left: "0",
			top: "0"
		};
		if (!d.value) return e;
		let t = Nn(d.value, f.value), n = Nn(d.value, p.value);
		return c.value ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...Mn(d.value) >= 1.5 && { willChange: "transform" }
		} : {
			position: h.value,
			left: t + "px",
			top: n + "px"
		};
	}), x;
	function S() {
		if (l.value == null || d.value == null) return;
		let e = i.value;
		Dn(l.value, d.value, {
			middleware: a.value,
			placement: o.value,
			strategy: s.value
		}).then((t) => {
			f.value = t.x, p.value = t.y, h.value = t.strategy, g.value = t.placement, v.value = t.middlewareData, y.value = e !== !1;
		});
	}
	function C() {
		typeof x == "function" && (x(), x = void 0);
	}
	function w() {
		if (C(), r === void 0) {
			S();
			return;
		}
		if (l.value != null && d.value != null) {
			x = r(l.value, d.value, S);
			return;
		}
	}
	function T() {
		i.value || (y.value = !1);
	}
	return m([
		a,
		o,
		s,
		i
	], S, { flush: "sync" }), m([l, d], w, { flush: "sync" }), m(i, T, { flush: "sync" }), u() && ee(C), {
		x: E(f),
		y: E(p),
		strategy: E(h),
		placement: E(g),
		middlewareData: E(v),
		isPositioned: E(y),
		floatingStyles: b,
		update: S
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperContent.js
var Fn = ["dir"], In = {
	side: "bottom",
	sideOffset: 0,
	sideFlip: !0,
	align: "center",
	alignOffset: 0,
	alignFlip: !0,
	arrowPadding: 0,
	hideShiftedArrow: !0,
	avoidCollisions: !0,
	collisionBoundary: () => [],
	collisionPadding: 0,
	sticky: "partial",
	hideWhenDetached: !1,
	positionStrategy: "fixed",
	updatePositionStrategy: "optimized",
	prioritizePosition: !1
}, [Ln, Rn] = /*#__PURE__*/ le("PopperContent"), zn = /* @__PURE__ */ P({
	inheritAttrs: !1,
	__name: "PopperContent",
	props: /* @__PURE__ */ n({
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
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
	}, { ...In }),
	emits: ["placed"],
	setup(e, { emit: t }) {
		let n = e, a = t, s = Ie(), { forwardRef: c, currentElement: u } = I(), f = xe(O(() => n.dir)), p = j(), m = j(), { width: _, height: v } = je(m), y = O(() => n.side + (n.align === "center" ? "" : `-${n.align}`)), x = O(() => typeof n.collisionPadding == "number" ? n.collisionPadding : {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			...n.collisionPadding
		}), S = O(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), C = O(() => ({
			padding: x.value,
			boundary: S.value.filter(Ue),
			altBoundary: S.value.length > 0
		})), E = O(() => ({
			mainAxis: n.sideFlip,
			crossAxis: n.alignFlip
		})), D = O(() => [
			bn({
				mainAxis: n.sideOffset + v.value,
				alignmentAxis: n.alignOffset
			}),
			n.prioritizePosition && n.avoidCollisions && Sn({
				...C.value,
				...E.value
			}),
			n.avoidCollisions && xn({
				mainAxis: !0,
				crossAxis: !!n.prioritizePosition,
				limiter: n.sticky === "partial" ? En() : void 0,
				...C.value
			}),
			!n.prioritizePosition && n.avoidCollisions && Sn({
				...C.value,
				...E.value
			}),
			Cn({
				...C.value,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--reka-popper-available-width", `${n}px`), o.setProperty("--reka-popper-available-height", `${r}px`), o.setProperty("--reka-popper-anchor-width", `${i}px`), o.setProperty("--reka-popper-anchor-height", `${a}px`);
				}
			}),
			m.value && jn({
				element: m.value,
				padding: n.arrowPadding
			}),
			We({
				arrowWidth: _.value,
				arrowHeight: v.value,
				dir: f.value
			}),
			n.hideWhenDetached && wn({
				strategy: "referenceHidden",
				...C.value
			})
		]), { floatingStyles: k, placement: M, isPositioned: ee, middlewareData: N, update: te } = Pn(O(() => n.reference ?? s.anchor.value), p, {
			strategy: n.positionStrategy,
			placement: y,
			whileElementsMounted: (...e) => yn(...e, {
				layoutShift: !n.disableUpdateOnLayoutShift,
				animationFrame: n.updatePositionStrategy === "always"
			}),
			middleware: D
		}), P = O(() => Ge(M.value)[0]), F = O(() => Ge(M.value)[1]);
		o(() => {
			ee.value && a("placed");
		});
		let ne = O(() => {
			let e = N.value.arrow?.centerOffset !== 0;
			return n.hideShiftedArrow && e;
		}), re = j("");
		return i(() => {
			u.value && (re.value = window.getComputedStyle(u.value).zIndex);
		}), Rn({
			placedSide: P,
			onArrowChange: (e) => m.value = e,
			arrowX: O(() => N.value.arrow?.x ?? 0),
			arrowY: O(() => N.value.arrow?.y ?? 0),
			shouldHideArrow: ne
		}), (e, t) => (r(), g("div", {
			ref_key: "floatingRef",
			ref: p,
			"data-reka-popper-content-wrapper": "",
			dir: b(f),
			style: T({
				...b(k),
				transform: b(ee) ? b(k).transform : "translate(0, -200%)",
				minWidth: "max-content",
				zIndex: re.value,
				"--reka-popper-transform-origin": [b(N).transformOrigin?.x, b(N).transformOrigin?.y].join(" "),
				...b(N).hide?.referenceHidden && {
					visibility: "hidden",
					pointerEvents: "none"
				}
			})
		}, [n.memoDependencies ? h([
			n.asChild,
			n.as,
			P.value,
			F.value,
			b(ee),
			...Object.values(e.$attrs),
			...n.memoDependencies
		], () => (r(), w(b(L), l({
			key: 0,
			ref: b(c)
		}, e.$attrs, {
			"as-child": n.asChild,
			as: n.as,
			"data-side": P.value,
			"data-align": F.value,
			style: { animation: b(ee) ? void 0 : "none" }
		}), {
			default: A(() => [d(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"style"
		])), t, 0) : (r(), w(b(L), l({
			key: 1,
			ref: b(c)
		}, e.$attrs, {
			"as-child": n.asChild,
			as: n.as,
			"data-side": P.value,
			"data-align": F.value,
			dir: b(f),
			style: { animation: b(ee) ? void 0 : "none" }
		}), {
			default: A(() => [d(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"dir",
			"style"
		]))], 12, Fn));
	}
}), Bn = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Vn = /* @__PURE__ */ P({
	inheritAttrs: !1,
	__name: "PopperArrow",
	props: {
		width: {
			type: Number,
			required: !1
		},
		height: {
			type: Number,
			required: !1
		},
		rounded: {
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
			default: "svg"
		}
	},
	setup(e) {
		let { forwardRef: t } = I(), n = Ln(), i = O(() => Bn[n.placedSide.value]);
		return (e, a) => (r(), g("span", {
			ref: (e) => {
				b(n).onArrowChange(e ?? void 0);
			},
			style: T({
				position: "absolute",
				left: b(n).arrowX?.value ? `${b(n).arrowX?.value}px` : void 0,
				top: b(n).arrowY?.value ? `${b(n).arrowY?.value}px` : void 0,
				[i.value]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0"
				}[b(n).placedSide.value],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)"
				}[b(n).placedSide.value],
				visibility: b(n).shouldHideArrow.value ? "hidden" : void 0
			})
		}, [F(He, l(e.$attrs, {
			ref: b(t),
			style: { display: "block" },
			as: e.as,
			"as-child": e.asChild,
			rounded: e.rounded,
			width: e.width,
			height: e.height
		}), {
			default: A(() => [d(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"rounded",
			"width",
			"height"
		])], 4));
	}
}), Hn = /* @__PURE__ */ P({
	__name: "TooltipArrow",
	props: {
		width: {
			type: Number,
			required: !1,
			default: 10
		},
		height: {
			type: Number,
			required: !1,
			default: 5
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "svg"
		}
	},
	setup(e) {
		let n = e;
		return I(), (e, i) => (r(), w(b(Vn), D(t(n)), {
			default: A(() => [d(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [Un, Wn] = /*#__PURE__*/ le("TooltipProvider"), Gn = /* @__PURE__ */ P({
	inheritAttrs: !1,
	__name: "TooltipProvider",
	props: {
		delayDuration: {
			type: Number,
			required: !1,
			default: 700
		},
		skipDelayDuration: {
			type: Number,
			required: !1,
			default: 300
		},
		disableHoverableContent: {
			type: Boolean,
			required: !1,
			default: !1
		},
		disableClosingTrigger: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: !1,
			default: !1
		},
		content: {
			type: Object,
			required: !1
		}
	},
	setup(e) {
		let { delayDuration: t, skipDelayDuration: n, disableHoverableContent: r, disableClosingTrigger: i, ignoreNonKeyboardFocus: a, disabled: o, content: s } = y(e);
		I();
		let c = j(!0), l = j(!1), { start: u, stop: f } = ae(() => {
			c.value = !0;
		}, n, { immediate: !1 });
		return Wn({
			isOpenDelayed: c,
			delayDuration: t,
			onOpen() {
				f(), c.value = !1;
			},
			onClose() {
				u();
			},
			isPointerInTransitRef: l,
			disableHoverableContent: r,
			disableClosingTrigger: i,
			disabled: o,
			ignoreNonKeyboardFocus: a,
			content: s
		}), (e, t) => d(e.$slots, "default");
	}
}), Kn = "tooltip.open", [qn, Jn] = /*#__PURE__*/ le("TooltipRoot"), Yn = /* @__PURE__ */ P({
	__name: "TooltipRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		delayDuration: {
			type: Number,
			required: !1,
			default: void 0
		},
		disableHoverableContent: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		disableClosingTrigger: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: !1,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, i = t;
		I();
		let a = Un(), o = O(() => n.disableHoverableContent ?? a.disableHoverableContent.value), s = O(() => n.disableClosingTrigger ?? a.disableClosingTrigger.value), c = O(() => n.disabled ?? a.disabled.value), l = O(() => n.delayDuration ?? a.delayDuration.value), u = O(() => n.ignoreNonKeyboardFocus ?? a.ignoreNonKeyboardFocus.value), f = ue(n, "open", i, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		m(f, (e) => {
			a.onClose && (e ? (a.onOpen(), document.dispatchEvent(new CustomEvent(Kn))) : a.onClose());
		});
		let p = j(!1), h = j(), g = O(() => f.value ? p.value ? "delayed-open" : "instant-open" : "closed"), { start: _, stop: v } = ae(() => {
			p.value = !0, f.value = !0;
		}, l, { immediate: !1 });
		function y() {
			v(), p.value = !1, f.value = !0;
		}
		function x() {
			v(), f.value = !1;
		}
		function S() {
			_();
		}
		return Jn({
			contentId: "",
			open: f,
			stateAttribute: g,
			trigger: h,
			onTriggerChange(e) {
				h.value = e;
			},
			onTriggerEnter() {
				a.isOpenDelayed.value ? S() : y();
			},
			onTriggerLeave() {
				o.value ? x() : v();
			},
			onOpen: y,
			onClose: x,
			disableHoverableContent: o,
			disableClosingTrigger: s,
			disabled: c,
			ignoreNonKeyboardFocus: u
		}), (e, t) => (r(), w(b(Re), null, {
			default: A(() => [d(e.$slots, "default", { open: b(f) })]),
			_: 3
		}));
	}
}), Xn = /* @__PURE__ */ P({
	__name: "TooltipContentImpl",
	props: {
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = qn(), o = Un(), { forwardRef: c, currentElement: u } = I(), f = O(() => n.ariaLabel || u.value?.textContent), p = O(() => {
			let { ariaLabel: e, ...t } = n;
			return me(t, o.content.value ?? {}, {
				side: "top",
				sideOffset: 0,
				align: "center",
				avoidCollisions: !0,
				collisionBoundary: [],
				collisionPadding: 0,
				arrowPadding: 0,
				sticky: "partial",
				hideWhenDetached: !1
			});
		});
		return s(() => {
			be(window, "scroll", (e) => {
				e.target?.contains(a.trigger.value) && a.onClose();
			}, { capture: !0 }), be(window, Kn, a.onClose);
		}), (e, t) => (r(), w(b(de), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: t[0] ||= (e) => i("escapeKeyDown", e),
			onPointerDownOutside: t[1] ||= (e) => {
				b(a).disableClosingTrigger.value && b(a).trigger.value?.contains(e.target) && e.preventDefault(), i("pointerDownOutside", e);
			},
			onFocusOutside: t[2] ||= v(() => {}, ["prevent"]),
			onDismiss: t[3] ||= (e) => b(a).onClose()
		}, {
			default: A(() => [F(b(zn), l({
				ref: b(c),
				"data-state": b(a).stateAttribute.value
			}, {
				...e.$attrs,
				...p.value
			}, { style: {
				"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
				"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
				"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: A(() => [d(e.$slots, "default"), F(b(Fe), {
					id: b(a).contentId,
					role: "tooltip"
				}, {
					default: A(() => [N(C(f.value), 1)]),
					_: 1
				}, 8, ["id"])]),
				_: 3
			}, 16, ["data-state"])]),
			_: 3
		}));
	}
}), Zn = /* @__PURE__ */ P({
	__name: "TooltipContentHoverable",
	props: {
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	setup(e) {
		let t = Se(e), { forwardRef: n, currentElement: i } = I(), { trigger: a, onClose: o } = qn(), s = Un(), { isPointerInTransit: c, onPointerExit: u } = we(a, i);
		return s.isPointerInTransitRef = c, u(() => {
			o();
		}), (e, i) => (r(), w(Xn, l({ ref: b(n) }, b(t)), {
			default: A(() => [d(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Qn = /* @__PURE__ */ P({
	__name: "TooltipContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = qn(), o = Ce(n, i), { forwardRef: s } = I();
		return (e, t) => (r(), w(b(he), { present: e.forceMount || b(a).open.value }, {
			default: A(() => [(r(), w(ne(b(a).disableHoverableContent.value ? Xn : Zn), l({ ref: b(s) }, b(o)), {
				default: A(() => [d(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), $n = /* @__PURE__ */ P({
	__name: "TooltipPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let n = e;
		return (e, i) => (r(), w(b(_e), D(t(n)), {
			default: A(() => [d(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), er = /* @__PURE__ */ P({
	__name: "TooltipTrigger",
	props: {
		reference: {
			type: null,
			required: !1
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
	setup(t) {
		let n = t, i = qn(), a = Un();
		i.contentId ||= ve(void 0, "reka-tooltip-content");
		let { forwardRef: o, currentElement: c } = I(), u = j(!1), f = j(!1), p = O(() => i.disabled.value ? {} : {
			click: x,
			focus: v,
			pointermove: g,
			pointerleave: _,
			pointerdown: h,
			blur: y
		});
		s(() => {
			i.onTriggerChange(c.value);
		});
		function m() {
			setTimeout(() => {
				u.value = !1;
			}, 1);
		}
		function h() {
			i.open && !i.disableClosingTrigger.value && i.onClose(), u.value = !0, document.addEventListener("pointerup", m, { once: !0 });
		}
		function g(e) {
			e.pointerType !== "touch" && !f.value && !a.isPointerInTransitRef.value && (i.onTriggerEnter(), f.value = !0);
		}
		function _() {
			i.onTriggerLeave(), f.value = !1;
		}
		function v(e) {
			u.value || i.ignoreNonKeyboardFocus.value && !e.target.matches?.(":focus-visible") || i.onOpen();
		}
		function y() {
			i.onClose();
		}
		function x() {
			i.disableClosingTrigger.value || i.onClose();
		}
		return (t, a) => (r(), w(b(ze), {
			"as-child": "",
			reference: t.reference
		}, {
			default: A(() => [F(b(L), l({
				ref: b(o),
				"aria-describedby": b(i).open.value ? b(i).contentId : void 0,
				"data-state": b(i).stateAttribute.value,
				as: t.as,
				"as-child": n.asChild,
				"data-grace-area-trigger": ""
			}, e(p.value)), {
				default: A(() => [d(t.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-describedby",
				"data-state",
				"as",
				"as-child"
			])]),
			_: 3
		}, 8, ["reference"]));
	}
}), tr = /* @__PURE__ */ P({
	__name: "AppTooltip",
	props: {
		content: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		side: { default: "top" },
		delayDuration: { default: 300 }
	},
	setup(e) {
		let n = p(re, void 0), i = O(() => n ? { to: n } : {});
		return (n, a) => (r(), w(b(Gn), { "disable-hoverable-content": !1 }, {
			default: A(() => [F(b(Yn), {
				"delay-duration": e.delayDuration,
				disabled: e.disabled
			}, {
				default: A(() => [F(b(er), { "as-child": "" }, {
					default: A(() => [d(n.$slots, "default")]),
					_: 3
				}), F(b($n), D(t(i.value)), {
					default: A(() => [F(b(Qn), {
						side: e.side,
						"side-offset": 6,
						class: k(b(ie).tooltipContent)
					}, {
						default: A(() => [N(C(e.content) + " ", 1), F(b(Hn), {
							class: k(b(ie).tooltipArrow),
							width: 8,
							height: 5
						}, null, 8, ["class"])]),
						_: 1
					}, 8, ["side", "class"])]),
					_: 1
				}, 16)]),
				_: 3
			}, 8, ["delay-duration", "disabled"])]),
			_: 3
		}));
	}
});
//#endregion
export { Fe as a, Ce as c, Re as i, Se as l, zn as n, Pe as o, ze as r, Me as s, tr as t, xe as u };
