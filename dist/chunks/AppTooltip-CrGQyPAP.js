import { $ as e, C as t, D as n, E as r, G as i, H as a, L as o, M as s, P as c, R as l, S as u, T as d, U as f, W as p, X as m, _ as h, at as g, c as _, dt as v, ft as y, h as b, j as x, lt as S, mt as C, nt as w, ot as T, p as E, pt as D, q as ee, rt as O, tt as k, ut as A, v as j, x as M, y as N, z as te } from "./vue-i18n-L-BrQRnK.js";
import { n as ne } from "./portal_keys-DthxrmWp.js";
import { t as re } from "./components_styles-cMkBAg-0.js";
import { A as ie, C as ae, D as oe, O as se, P as ce, S as le, a as ue, f as P, g as de, h as fe, l as pe, p as me, s as F, t as he, u as ge, v as _e, y as ve } from "./Teleport-CquQcgiX.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useDirection.js
function ye(e) {
	let t = de({ dir: k("ltr") });
	return E(() => e?.value || t.dir?.value || "ltr");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardProps.js
function be(e) {
	let t = u(), n = Object.keys(t?.type.props ?? {}).reduce((e, n) => {
		let r = (t?.type.props[n]).default;
		return r !== void 0 && (e[n] = r), e;
	}, {}), r = g(e);
	return E(() => {
		let e = {}, i = t?.vnode.props ?? {};
		return Object.keys(i).forEach((t) => {
			e[A(t)] = i[t];
		}), Object.keys({
			...n,
			...e
		}).reduce((e, t) => (r.value[t] !== void 0 && (e[t] = r.value[t]), e), {});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardPropsEmits.js
function xe(e, t) {
	let n = be(e), r = t ? me(t) : {};
	return E(() => ({
		...n.value,
		...r
	}));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function Se(e, t) {
	let n = oe(!1, 300);
	se(() => {
		n.value = !1;
	});
	let r = k(null), i = ae();
	function a() {
		r.value = null, n.value = !1;
	}
	function o(e, t) {
		if (!t) return;
		let i = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = we(a, Ce(a, i.getBoundingClientRect()), 1), s = Te(t.getBoundingClientRect()), c = De([...o, ...s]);
		r.value = c, n.value = !0;
	}
	return f((n) => {
		if (e.value && t.value) {
			let r = (e) => o(e, t.value), i = (t) => o(t, e.value);
			e.value.addEventListener("pointerleave", r), t.value.addEventListener("pointerleave", i), n(() => {
				e.value?.removeEventListener("pointerleave", r), t.value?.removeEventListener("pointerleave", i);
			});
		}
	}), f((n) => {
		if (r.value) {
			let o = (n) => {
				if (!r.value || !(n.target instanceof Element)) return;
				let o = n.target, s = {
					x: n.clientX,
					y: n.clientY
				}, c = e.value?.contains(o) || t.value?.contains(o), l = !Ee(s, r.value), u = !!o.closest("[data-grace-area-trigger]");
				c ? a() : (l || u) && (a(), i.trigger());
			};
			e.value?.ownerDocument.addEventListener("pointermove", o), n(() => e.value?.ownerDocument.removeEventListener("pointermove", o));
		}
	}), {
		isPointerInTransit: n,
		onPointerExit: i.on
	};
}
function Ce(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function we(e, t, n = 5) {
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
function Te(e) {
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
function Ee(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function De(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), Oe(t);
}
function Oe(e) {
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
function ke(e) {
	let t = k(), n = E(() => t.value?.width ?? 0), r = E(() => t.value?.height ?? 0), i;
	return x(() => {
		let n = _e(e);
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
	}), s(() => {
		i?.disconnect(), i = void 0;
	}), {
		width: n,
		height: r
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHidden.js
var Ae = /* @__PURE__ */ M({
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
		return (e, t) => (c(), b(S(F), {
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
			default: i(() => [o(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"aria-hidden",
			"data-hidden",
			"tabindex"
		]));
	}
}), [je, Me] = /*#__PURE__*/ ce("PopperRoot"), Ne = /* @__PURE__ */ M({
	inheritAttrs: !1,
	__name: "PopperRoot",
	setup(e) {
		let t = k();
		return Me({
			anchor: t,
			onAnchorChange: (e) => t.value = e
		}), (e, t) => o(e.$slots, "default");
	}
}), Pe = /* @__PURE__ */ M({
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
		let t = e, { forwardRef: n, currentElement: r } = P(), a = je();
		return p(() => {
			a.onAnchorChange(t.reference ?? r.value);
		}), (e, t) => (c(), b(S(F), {
			ref: S(n),
			as: e.as,
			"as-child": e.asChild
		}, {
			default: i(() => [o(e.$slots, "default")]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), Fe = {
	key: 0,
	d: "M0 0L6 6L12 0"
}, Ie = {
	key: 1,
	d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
}, Le = /* @__PURE__ */ M({
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
		return P(), (e, r) => (c(), b(S(F), n(t, {
			width: e.width,
			height: e.height,
			viewBox: e.asChild ? void 0 : "0 0 12 6",
			preserveAspectRatio: e.asChild ? void 0 : "none"
		}), {
			default: i(() => [o(e.$slots, "default", {}, () => [e.rounded ? (c(), h("path", Ie)) : (c(), h("path", Fe))])]),
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
function Re(e) {
	return e !== null;
}
function ze(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Be(n), u = {
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
function Be(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Ve = [
	"top",
	"right",
	"bottom",
	"left"
], I = Math.min, L = Math.max, He = Math.round, Ue = Math.floor, R = (e) => ({
	x: e,
	y: e
}), We = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Ge(e, t, n) {
	return L(e, I(t, n));
}
function z(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function B(e) {
	return e.split("-")[0];
}
function V(e) {
	return e.split("-")[1];
}
function Ke(e) {
	return e === "x" ? "y" : "x";
}
function qe(e) {
	return e === "y" ? "height" : "width";
}
function H(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Je(e) {
	return Ke(H(e));
}
function Ye(e, t, n) {
	n === void 0 && (n = !1);
	let r = V(e), i = Je(e), a = qe(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = it(o)), [o, it(o)];
}
function Xe(e) {
	let t = it(e);
	return [
		Ze(e),
		t,
		Ze(t)
	];
}
function Ze(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Qe = ["left", "right"], $e = ["right", "left"], et = ["top", "bottom"], tt = ["bottom", "top"];
function nt(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? $e : Qe : t ? Qe : $e;
		case "left":
		case "right": return t ? et : tt;
		default: return [];
	}
}
function rt(e, t, n, r) {
	let i = V(e), a = nt(B(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Ze)))), a;
}
function it(e) {
	let t = B(e);
	return We[t] + e.slice(t.length);
}
function at(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function ot(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : at(e);
}
function st(e) {
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
function ct(e, t, n) {
	let { reference: r, floating: i } = e, a = H(t), o = Je(t), s = qe(o), c = B(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = V(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function lt(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = z(t, e), p = ot(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = st(await i.getClippingRect({
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
	}, y = st(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var ut = 50, dt = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: lt
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = ct(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < ut && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = ct(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, ft = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = z(e, t) || {};
		if (l == null) return {};
		let d = ot(u), f = {
			x: n,
			y: r
		}, p = Je(i), m = qe(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = I(d[_], T), D = I(d[v], T), ee = C - h[m] - D, O = C / 2 - h[m] / 2 + w, k = Ge(E, O, ee), A = !c.arrow && V(i) != null && O !== k && a.reference[m] / 2 - (O < E ? E : D) - h[m] / 2 < 0, j = A ? O < E ? O - E : O - ee : 0;
		return {
			[p]: f[p] + j,
			data: {
				[p]: k,
				centerOffset: O - k - j,
				...A && { alignmentOffset: j }
			},
			reset: A
		};
	}
}), pt = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = z(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = B(r), _ = H(o), v = B(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [it(o)] : Xe(o)), x = p !== "none";
			!d && x && b.push(...rt(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Ye(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === H(t) || T.every((e) => H(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = H(e.placement);
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
function mt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function ht(e) {
	return Ve.some((t) => e[t] >= 0);
}
var gt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = z(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = mt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: ht(e)
					} };
				}
				case "escaped": {
					let e = mt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: ht(e)
					} };
				}
				default: return {};
			}
		}
	};
}, _t = /*#__PURE__*/ new Set(["left", "top"]);
async function vt(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = B(n), s = V(n), c = H(n) === "y", l = _t.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = z(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var yt = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await vt(t, e);
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
}, bt = function(e) {
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
			} }, ...l } = z(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = H(i), p = Ke(f), m = u[p], h = u[f], g = (e, t) => Ge(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, xt = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = z(e, t), u = {
				x: n,
				y: r
			}, d = H(i), f = Ke(d), p = u[f], m = u[d], h = z(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = _t.has(B(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, St = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = z(e, t), c = await i.detectOverflow(t, s), l = B(n), u = V(n), d = H(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = I(p - c[m], g), y = I(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * L(c.left, c.right) : S = p - 2 * L(c.top, c.bottom)), await o({
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
function Ct() {
	return typeof window < "u";
}
function U(e) {
	return wt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function W(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function G(e) {
	return ((wt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function wt(e) {
	return Ct() ? e instanceof Node || e instanceof W(e).Node : !1;
}
function K(e) {
	return Ct() ? e instanceof Element || e instanceof W(e).Element : !1;
}
function q(e) {
	return Ct() ? e instanceof HTMLElement || e instanceof W(e).HTMLElement : !1;
}
function Tt(e) {
	return !Ct() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof W(e).ShadowRoot;
}
function Et(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Y(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Dt(e) {
	return /^(table|td|th)$/.test(U(e));
}
function Ot(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var kt = /transform|translate|scale|rotate|perspective|filter/, At = /paint|layout|strict|content/, J = (e) => !!e && e !== "none", jt;
function Mt(e) {
	let t = K(e) ? Y(e) : e;
	return J(t.transform) || J(t.translate) || J(t.scale) || J(t.rotate) || J(t.perspective) || !Pt() && (J(t.backdropFilter) || J(t.filter)) || kt.test(t.willChange || "") || At.test(t.contain || "");
}
function Nt(e) {
	let t = X(e);
	for (; q(t) && !Ft(t);) {
		if (Mt(t)) return t;
		if (Ot(t)) return null;
		t = X(t);
	}
	return null;
}
function Pt() {
	return jt ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), jt;
}
function Ft(e) {
	return /^(html|body|#document)$/.test(U(e));
}
function Y(e) {
	return W(e).getComputedStyle(e);
}
function It(e) {
	return K(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function X(e) {
	if (U(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Tt(e) && e.host || G(e);
	return Tt(t) ? t.host : t;
}
function Lt(e) {
	let t = X(e);
	return Ft(t) ? (e.ownerDocument || e).body : q(t) && Et(t) ? t : Lt(t);
}
function Rt(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Lt(e), i = r === e.ownerDocument?.body, a = W(r);
	if (i) {
		let e = zt(a);
		return t.concat(a, a.visualViewport || [], Et(r) ? r : [], e && n ? Rt(e) : []);
	}
	return t.concat(r, Rt(r, [], n));
}
function zt(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Bt(e) {
	let t = Y(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = q(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = He(n) !== a || He(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Vt(e) {
	return K(e) ? e : e.contextElement;
}
function Z(e) {
	let t = Vt(e);
	if (!q(t)) return R(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Bt(t), o = (a ? He(n.width) : n.width) / r, s = (a ? He(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Ht = /*#__PURE__*/ R(0);
function Ut(e) {
	let t = W(e);
	return !Pt() || !t.visualViewport ? Ht : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Wt(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === W(e);
}
function Q(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Vt(e), o = R(1);
	t && (r ? K(r) && (o = Z(r)) : o = Z(e));
	let s = Wt(a, n, r) ? Ut(a) : R(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = W(a), t = K(r) ? W(r) : r, n = e, i = zt(n);
		for (; i && t !== n;) {
			let e = Z(i), t = i.getBoundingClientRect(), r = Y(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = W(i), i = zt(n);
		}
	}
	return st({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Gt(e, t) {
	let n = It(e).scrollLeft;
	return t ? t.left + n : Q(G(e)).left + n;
}
function Kt(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Gt(e, n),
		y: n.top + t.scrollTop
	};
}
function qt(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = G(r), s = t ? Ot(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = R(1), u = R(0), d = q(r);
	if ((d || !a) && ((U(r) !== "body" || Et(o)) && (c = It(r)), d)) {
		let e = Q(r);
		l = Z(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Kt(o, c) : R(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Jt(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Yt(e) {
	let t = It(e), n = e.ownerDocument.body, r = L(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = L(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Gt(e), o = -t.scrollTop;
	return Y(n).direction === "rtl" && (a += L(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Xt = 25;
function Zt(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = W(e), a = G(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Pt() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Gt(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Xt && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Qt(e, t) {
	let n = Q(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Z(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function $t(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Zt(e, n, t);
	else if (t === "document") r = Yt(G(e));
	else if (K(t)) r = Qt(t, n);
	else {
		let n = Ut(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return st(r);
}
function en(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Rt(e, [], !1).filter((e) => K(e) && U(e) !== "body"), i = null, a = Y(e).position === "fixed", o = a ? X(e) : e;
	for (; K(o) && !Ft(o);) {
		let e = Y(o), t = Mt(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = X(o);
	}
	return t.set(e, r), r;
}
function tn(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Ot(t) ? [] : en(t, this._c) : [].concat(n), r], o = $t(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = $t(t, a[e], i);
		s = L(n.top, s), c = I(n.right, c), l = I(n.bottom, l), u = L(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function nn(e) {
	let { width: t, height: n } = Bt(e);
	return {
		width: t,
		height: n
	};
}
function rn(e, t, n) {
	let r = q(t), i = G(t), a = n === "fixed", o = Q(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = R(0);
	if ((r || !a) && ((U(t) !== "body" || Et(i)) && (s = It(t)), r)) {
		let e = Q(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Gt(i));
	let l = i && !r && !a ? Kt(i, s) : R(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function an(e) {
	return Y(e).position === "static";
}
function on(e, t) {
	if (!q(e) || Y(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return G(e) === n && (n = n.ownerDocument.body), n;
}
function sn(e, t) {
	let n = W(e);
	if (Ot(e)) return n;
	if (!q(e)) {
		let t = X(e);
		for (; t && !Ft(t);) {
			if (K(t) && !an(t)) return t;
			t = X(t);
		}
		return n;
	}
	let r = on(e, t);
	for (; r && Dt(r) && an(r);) r = on(r, t);
	return r && Ft(r) && an(r) && !Mt(r) ? n : r || Nt(e) || n;
}
var cn = async function(e) {
	let t = this.getOffsetParent || sn, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: rn(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ln(e) {
	return Y(e).direction === "rtl";
}
var un = {
	convertOffsetParentRelativeRectToViewportRelativeRect: qt,
	getDocumentElement: G,
	getClippingRect: tn,
	getOffsetParent: sn,
	getElementRects: cn,
	getClientRects: Jt,
	getDimensions: nn,
	getScale: Z,
	isElement: K,
	isRTL: ln
};
function dn(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function fn(e, t, n) {
	let r = null, i, a = G(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Ue(d), h = Ue(a.clientWidth - (u + f)), g = Ue(a.clientHeight - (d + p)), _ = Ue(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: L(0, I(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!dn(l, e.getBoundingClientRect())) return s();
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
	let c = W(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function pn(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Vt(e), u = i || a ? [...l ? Rt(l) : [], ...t ? Rt(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? fn(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Q(e) : null;
	c && g();
	function g() {
		let t = Q(e);
		h && !dn(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var mn = yt, hn = bt, gn = pt, _n = St, vn = gt, yn = ft, bn = xt, xn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...un,
		...i.platform,
		_c: r
	};
	return dt(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+vue@1.1.11_vue@3.5.40_typescript@6.0.3_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function Sn(e) {
	return typeof e == "object" && !!e && "$el" in e;
}
function Cn(e) {
	if (Sn(e)) {
		let t = e.$el;
		return wt(t) && U(t) === "#comment" ? null : t;
	}
	return e;
}
function $(e) {
	return typeof e == "function" ? e() : S(e);
}
function wn(e) {
	return {
		name: "arrow",
		options: e,
		fn(t) {
			let n = Cn($(e.element));
			return n == null ? {} : yn({
				element: n,
				padding: e.padding
			}).fn(t);
		}
	};
}
function Tn(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function En(e, t) {
	let n = Tn(e);
	return Math.round(t * n) / n;
}
function Dn(t, n, r) {
	r === void 0 && (r = {});
	let i = r.whileElementsMounted, o = E(() => $(r.open) ?? !0), s = E(() => $(r.middleware)), c = E(() => $(r.placement) ?? "bottom"), l = E(() => $(r.strategy) ?? "absolute"), u = E(() => $(r.transform) ?? !0), d = E(() => Cn(t.value)), f = E(() => Cn(n.value)), p = k(0), h = k(0), g = k(l.value), _ = k(c.value), v = O({}), y = k(!1), b = E(() => {
		let e = {
			position: g.value,
			left: "0",
			top: "0"
		};
		if (!f.value) return e;
		let t = En(f.value, p.value), n = En(f.value, h.value);
		return u.value ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...Tn(f.value) >= 1.5 && { willChange: "transform" }
		} : {
			position: g.value,
			left: t + "px",
			top: n + "px"
		};
	}), x;
	function S() {
		if (d.value == null || f.value == null) return;
		let e = o.value;
		xn(d.value, f.value, {
			middleware: s.value,
			placement: c.value,
			strategy: l.value
		}).then((t) => {
			p.value = t.x, h.value = t.y, g.value = t.strategy, _.value = t.placement, v.value = t.middlewareData, y.value = e !== !1;
		});
	}
	function C() {
		typeof x == "function" && (x(), x = void 0);
	}
	function T() {
		if (C(), i === void 0) {
			S();
			return;
		}
		if (d.value != null && f.value != null) {
			x = i(d.value, f.value, S);
			return;
		}
	}
	function D() {
		o.value || (y.value = !1);
	}
	return a([
		s,
		c,
		l,
		o
	], S, { flush: "sync" }), a([d, f], T, { flush: "sync" }), a(o, D, { flush: "sync" }), m() && e(C), {
		x: w(p),
		y: w(h),
		strategy: w(g),
		placement: w(_),
		middlewareData: w(v),
		isPositioned: w(y),
		floatingStyles: b,
		update: S
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperContent.js
var On = ["dir"], kn = {
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
}, [An, jn] = /*#__PURE__*/ ce("PopperContent"), Mn = /* @__PURE__ */ M({
	inheritAttrs: !1,
	__name: "PopperContent",
	props: /* @__PURE__ */ r({
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
	}, { ...kn }),
	emits: ["placed"],
	setup(e, { emit: t }) {
		let r = e, a = t, s = je(), { forwardRef: l, currentElement: u } = P(), d = ye(E(() => r.dir)), m = k(), g = k(), { width: _, height: v } = ke(g), y = E(() => r.side + (r.align === "center" ? "" : `-${r.align}`)), x = E(() => typeof r.collisionPadding == "number" ? r.collisionPadding : {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			...r.collisionPadding
		}), C = E(() => Array.isArray(r.collisionBoundary) ? r.collisionBoundary : [r.collisionBoundary]), w = E(() => ({
			padding: x.value,
			boundary: C.value.filter(Re),
			altBoundary: C.value.length > 0
		})), T = E(() => ({
			mainAxis: r.sideFlip,
			crossAxis: r.alignFlip
		})), O = E(() => [
			mn({
				mainAxis: r.sideOffset + v.value,
				alignmentAxis: r.alignOffset
			}),
			r.prioritizePosition && r.avoidCollisions && gn({
				...w.value,
				...T.value
			}),
			r.avoidCollisions && hn({
				mainAxis: !0,
				crossAxis: !!r.prioritizePosition,
				limiter: r.sticky === "partial" ? bn() : void 0,
				...w.value
			}),
			!r.prioritizePosition && r.avoidCollisions && gn({
				...w.value,
				...T.value
			}),
			_n({
				...w.value,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--reka-popper-available-width", `${n}px`), o.setProperty("--reka-popper-available-height", `${r}px`), o.setProperty("--reka-popper-anchor-width", `${i}px`), o.setProperty("--reka-popper-anchor-height", `${a}px`);
				}
			}),
			g.value && wn({
				element: g.value,
				padding: r.arrowPadding
			}),
			ze({
				arrowWidth: _.value,
				arrowHeight: v.value,
				dir: d.value
			}),
			r.hideWhenDetached && vn({
				strategy: "referenceHidden",
				...w.value
			})
		]), { floatingStyles: A, placement: j, isPositioned: M, middlewareData: N, update: te } = Dn(E(() => r.reference ?? s.anchor.value), m, {
			strategy: r.positionStrategy,
			placement: y,
			whileElementsMounted: (...e) => pn(...e, {
				layoutShift: !r.disableUpdateOnLayoutShift,
				animationFrame: r.updatePositionStrategy === "always"
			}),
			middleware: O
		}), ne = E(() => Be(j.value)[0]), re = E(() => Be(j.value)[1]);
		p(() => {
			M.value && a("placed");
		});
		let ie = E(() => {
			let e = N.value.arrow?.centerOffset !== 0;
			return r.hideShiftedArrow && e;
		}), ae = k("");
		return f(() => {
			u.value && (ae.value = window.getComputedStyle(u.value).zIndex);
		}), jn({
			placedSide: ne,
			onArrowChange: (e) => g.value = e,
			arrowX: E(() => N.value.arrow?.x ?? 0),
			arrowY: E(() => N.value.arrow?.y ?? 0),
			shouldHideArrow: ie
		}), (e, t) => (c(), h("div", {
			ref_key: "floatingRef",
			ref: m,
			"data-reka-popper-content-wrapper": "",
			dir: S(d),
			style: D({
				...S(A),
				transform: S(M) ? S(A).transform : "translate(0, -200%)",
				minWidth: "max-content",
				zIndex: ae.value,
				"--reka-popper-transform-origin": [S(N).transformOrigin?.x, S(N).transformOrigin?.y].join(" "),
				...S(N).hide?.referenceHidden && {
					visibility: "hidden",
					pointerEvents: "none"
				}
			})
		}, [r.memoDependencies ? ee([
			r.asChild,
			r.as,
			ne.value,
			re.value,
			S(M),
			...Object.values(e.$attrs),
			...r.memoDependencies
		], () => (c(), b(S(F), n({
			key: 0,
			ref: S(l)
		}, e.$attrs, {
			"as-child": r.asChild,
			as: r.as,
			"data-side": ne.value,
			"data-align": re.value,
			style: { animation: S(M) ? void 0 : "none" }
		}), {
			default: i(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"style"
		])), t, 0) : (c(), b(S(F), n({
			key: 1,
			ref: S(l)
		}, e.$attrs, {
			"as-child": r.asChild,
			as: r.as,
			"data-side": ne.value,
			"data-align": re.value,
			dir: S(d),
			style: { animation: S(M) ? void 0 : "none" }
		}), {
			default: i(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"dir",
			"style"
		]))], 12, On));
	}
}), Nn = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Pn = /* @__PURE__ */ M({
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
		let { forwardRef: t } = P(), r = An(), a = E(() => Nn[r.placedSide.value]);
		return (e, s) => (c(), h("span", {
			ref: (e) => {
				S(r).onArrowChange(e ?? void 0);
			},
			style: D({
				position: "absolute",
				left: S(r).arrowX?.value ? `${S(r).arrowX?.value}px` : void 0,
				top: S(r).arrowY?.value ? `${S(r).arrowY?.value}px` : void 0,
				[a.value]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0"
				}[S(r).placedSide.value],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)"
				}[S(r).placedSide.value],
				visibility: S(r).shouldHideArrow.value ? "hidden" : void 0
			})
		}, [N(Le, n(e.$attrs, {
			ref: S(t),
			style: { display: "block" },
			as: e.as,
			"as-child": e.asChild,
			rounded: e.rounded,
			width: e.width,
			height: e.height
		}), {
			default: i(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"rounded",
			"width",
			"height"
		])], 4));
	}
}), Fn = /* @__PURE__ */ M({
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
		return P(), (e, r) => (c(), b(S(Pn), y(t(n)), {
			default: i(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [In, Ln] = /*#__PURE__*/ ce("TooltipProvider"), Rn = /* @__PURE__ */ M({
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
		let { delayDuration: t, skipDelayDuration: n, disableHoverableContent: r, disableClosingTrigger: i, ignoreNonKeyboardFocus: a, disabled: s, content: c } = T(e);
		P();
		let l = k(!0), u = k(!1), { start: d, stop: f } = ie(() => {
			l.value = !0;
		}, n, { immediate: !1 });
		return Ln({
			isOpenDelayed: l,
			delayDuration: t,
			onOpen() {
				f(), l.value = !1;
			},
			onClose() {
				d();
			},
			isPointerInTransitRef: u,
			disableHoverableContent: r,
			disableClosingTrigger: i,
			disabled: s,
			ignoreNonKeyboardFocus: a,
			content: c
		}), (e, t) => o(e.$slots, "default");
	}
}), zn = "tooltip.open", [Bn, Vn] = /*#__PURE__*/ ce("TooltipRoot"), Hn = /* @__PURE__ */ M({
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
		let n = e, r = t;
		P();
		let s = In(), l = E(() => n.disableHoverableContent ?? s.disableHoverableContent.value), u = E(() => n.disableClosingTrigger ?? s.disableClosingTrigger.value), d = E(() => n.disabled ?? s.disabled.value), f = E(() => n.delayDuration ?? s.delayDuration.value), p = E(() => n.ignoreNonKeyboardFocus ?? s.ignoreNonKeyboardFocus.value), m = le(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		a(m, (e) => {
			s.onClose && (e ? (s.onOpen(), document.dispatchEvent(new CustomEvent(zn))) : s.onClose());
		});
		let h = k(!1), g = k(), _ = E(() => m.value ? h.value ? "delayed-open" : "instant-open" : "closed"), { start: v, stop: y } = ie(() => {
			h.value = !0, m.value = !0;
		}, f, { immediate: !1 });
		function x() {
			y(), h.value = !1, m.value = !0;
		}
		function C() {
			y(), m.value = !1;
		}
		function w() {
			v();
		}
		return Vn({
			contentId: "",
			open: m,
			stateAttribute: _,
			trigger: g,
			onTriggerChange(e) {
				g.value = e;
			},
			onTriggerEnter() {
				s.isOpenDelayed.value ? w() : x();
			},
			onTriggerLeave() {
				l.value ? C() : y();
			},
			onOpen: x,
			onClose: C,
			disableHoverableContent: l,
			disableClosingTrigger: u,
			disabled: d,
			ignoreNonKeyboardFocus: p
		}), (e, t) => (c(), b(S(Ne), null, {
			default: i(() => [o(e.$slots, "default", { open: S(m) })]),
			_: 3
		}));
	}
}), Un = /* @__PURE__ */ M({
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
		let r = e, a = t, s = Bn(), l = In(), { forwardRef: u, currentElement: d } = P(), f = E(() => r.ariaLabel || d.value?.textContent), p = E(() => {
			let { ariaLabel: e, ...t } = r;
			return fe(t, l.content.value ?? {}, {
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
		return x(() => {
			ve(window, "scroll", (e) => {
				e.target?.contains(s.trigger.value) && s.onClose();
			}, { capture: !0 }), ve(window, zn, s.onClose);
		}), (e, t) => (c(), b(S(ue), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: t[0] ||= (e) => a("escapeKeyDown", e),
			onPointerDownOutside: t[1] ||= (e) => {
				S(s).disableClosingTrigger.value && S(s).trigger.value?.contains(e.target) && e.preventDefault(), a("pointerDownOutside", e);
			},
			onFocusOutside: t[2] ||= _(() => {}, ["prevent"]),
			onDismiss: t[3] ||= (e) => S(s).onClose()
		}, {
			default: i(() => [N(S(Mn), n({
				ref: S(u),
				"data-state": S(s).stateAttribute.value
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
				default: i(() => [o(e.$slots, "default"), N(S(Ae), {
					id: S(s).contentId,
					role: "tooltip"
				}, {
					default: i(() => [j(C(f.value), 1)]),
					_: 1
				}, 8, ["id"])]),
				_: 3
			}, 16, ["data-state"])]),
			_: 3
		}));
	}
}), Wn = /* @__PURE__ */ M({
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
		let t = be(e), { forwardRef: r, currentElement: a } = P(), { trigger: s, onClose: l } = Bn(), u = In(), { isPointerInTransit: d, onPointerExit: f } = Se(s, a);
		return u.isPointerInTransitRef = d, f(() => {
			l();
		}), (e, a) => (c(), b(Un, n({ ref: S(r) }, S(t)), {
			default: i(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Gn = /* @__PURE__ */ M({
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
		let r = e, a = t, s = Bn(), u = xe(r, a), { forwardRef: d } = P();
		return (e, t) => (c(), b(S(pe), { present: e.forceMount || S(s).open.value }, {
			default: i(() => [(c(), b(l(S(s).disableHoverableContent.value ? Un : Wn), n({ ref: S(d) }, S(u)), {
				default: i(() => [o(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), Kn = /* @__PURE__ */ M({
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
		return (e, r) => (c(), b(S(he), y(t(n)), {
			default: i(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), qn = /* @__PURE__ */ M({
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
	setup(e) {
		let t = e, r = Bn(), a = In();
		r.contentId ||= ge(void 0, "reka-tooltip-content");
		let { forwardRef: s, currentElement: l } = P(), u = k(!1), d = k(!1), f = E(() => r.disabled.value ? {} : {
			click: y,
			focus: _,
			pointermove: h,
			pointerleave: g,
			pointerdown: m,
			blur: v
		});
		x(() => {
			r.onTriggerChange(l.value);
		});
		function p() {
			setTimeout(() => {
				u.value = !1;
			}, 1);
		}
		function m() {
			r.open && !r.disableClosingTrigger.value && r.onClose(), u.value = !0, document.addEventListener("pointerup", p, { once: !0 });
		}
		function h(e) {
			e.pointerType !== "touch" && !d.value && !a.isPointerInTransitRef.value && (r.onTriggerEnter(), d.value = !0);
		}
		function g() {
			r.onTriggerLeave(), d.value = !1;
		}
		function _(e) {
			u.value || r.ignoreNonKeyboardFocus.value && !e.target.matches?.(":focus-visible") || r.onOpen();
		}
		function v() {
			r.onClose();
		}
		function y() {
			r.disableClosingTrigger.value || r.onClose();
		}
		return (e, a) => (c(), b(S(Pe), {
			"as-child": "",
			reference: e.reference
		}, {
			default: i(() => [N(S(F), n({
				ref: S(s),
				"aria-describedby": S(r).open.value ? S(r).contentId : void 0,
				"data-state": S(r).stateAttribute.value,
				as: e.as,
				"as-child": t.asChild,
				"data-grace-area-trigger": ""
			}, te(f.value)), {
				default: i(() => [o(e.$slots, "default")]),
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
}), Jn = /* @__PURE__ */ M({
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
		let n = d(ne, void 0), r = E(() => n ? { to: n } : {});
		return (n, a) => (c(), b(S(Rn), { "disable-hoverable-content": !1 }, {
			default: i(() => [N(S(Hn), {
				"delay-duration": e.delayDuration,
				disabled: e.disabled
			}, {
				default: i(() => [N(S(qn), { "as-child": "" }, {
					default: i(() => [o(n.$slots, "default")]),
					_: 3
				}), N(S(Kn), y(t(r.value)), {
					default: i(() => [N(S(Gn), {
						side: e.side,
						"side-offset": 6,
						class: v(S(re).tooltipContent)
					}, {
						default: i(() => [j(C(e.content) + " ", 1), N(S(Fn), {
							class: v(S(re).tooltipArrow),
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
export { Ae as a, ye as c, Ne as i, Mn as n, xe as o, Pe as r, be as s, Jn as t };
