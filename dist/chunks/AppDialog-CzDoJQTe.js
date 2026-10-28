import { A as e, C as t, I as n, N as r, O as i, T as a, V as o, W as s, at as c, ct as l, dt as u, et as d, g as f, h as p, j as m, m as h, p as g, pt as _, ut as v, v as y, x as b, y as x } from "./vue-i18n-DUz2Gjn8.js";
import { n as S } from "./portal_keys-B9C82xtk.js";
import { n as C, t as w } from "./AppIcon-Cnhzrx9o.js";
import { r as T } from "./StateSurface-BA0Ffiwe.js";
import { t as E } from "./x-CDKrptQJ.js";
import { r as D } from "./_prop_utils-CqbCYIc0.js";
import { M as O, _ as k, i as A, s as j } from "./Teleport-CZ6NJvBB.js";
import { o as M } from "./FocusScope-DyrFWv3K.js";
import { c as N } from "./PopperContent-8IQaFABb.js";
import { a as P, c as F, i as I, n as L, r as R, s as z, t as B } from "./Collection-DWsxNExQ.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var V = C("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]), H = "rovingFocusGroup.onEntryFocus", U = {
	bubbles: !1,
	cancelable: !0
}, W = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function G(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function K(e, t, n) {
	let r = G(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return W[r];
}
function q(e, t = !1) {
	let n = M();
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), M() !== n)) return;
}
function J(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [Y, X] = /*#__PURE__*/ O("RovingFocusGroup"), Z = /* @__PURE__ */ b({
	__name: "RovingFocusGroup",
	props: {
		orientation: {
			type: String,
			required: !1,
			default: void 0
		},
		dir: {
			type: String,
			required: !1
		},
		loop: {
			type: Boolean,
			required: !1,
			default: !1
		},
		currentTabStopId: {
			type: [String, null],
			required: !1
		},
		defaultCurrentTabStopId: {
			type: String,
			required: !1
		},
		preventScrollOnEntryFocus: {
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
			required: !1
		}
	},
	emits: ["entryFocus", "update:currentTabStopId"],
	setup(e, { expose: t, emit: i }) {
		let a = e, o = i, { loop: u, orientation: f, dir: m } = c(a), h = N(m), g = k(a, "currentTabStopId", o, {
			defaultValue: a.defaultCurrentTabStopId,
			passive: a.currentTabStopId === void 0
		}), _ = d(!1), v = d(!1), y = d(0), { getItems: b, CollectionSlot: S } = B({ isProvider: !0 });
		function C(e) {
			let t = !v.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !_.value) {
				let t = new CustomEvent(H, U);
				if (e.currentTarget.dispatchEvent(t), o("entryFocus", t), !t.defaultPrevented) {
					let e = b().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					q([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === g.value),
						...e
					].filter(Boolean), a.preventScrollOnEntryFocus);
				}
			}
			v.value = !1;
		}
		function w() {
			setTimeout(() => {
				v.value = !1;
			}, 1);
		}
		return t({ getItems: b }), X({
			loop: u,
			dir: h,
			orientation: f,
			currentTabStopId: g,
			onItemFocus: (e) => {
				g.value = e;
			},
			onItemShiftTab: () => {
				_.value = !0;
			},
			onFocusableItemAdd: () => {
				y.value++;
			},
			onFocusableItemRemove: () => {
				y.value--;
			}
		}), (e, t) => (r(), p(l(S), null, {
			default: s(() => [x(l(A), {
				tabindex: _.value || y.value === 0 ? -1 : 0,
				"data-orientation": l(f),
				as: e.as,
				"as-child": e.asChild,
				dir: l(h),
				style: { outline: "none" },
				onMousedown: t[0] ||= (e) => v.value = !0,
				onMouseup: w,
				onFocus: C,
				onBlur: t[1] ||= (e) => _.value = !1
			}, {
				default: s(() => [n(e.$slots, "default")]),
				_: 3
			}, 8, [
				"tabindex",
				"data-orientation",
				"as",
				"as-child",
				"dir"
			])]),
			_: 3
		}));
	}
}), Q = /* @__PURE__ */ b({
	__name: "RovingFocusItem",
	props: {
		tabStopId: {
			type: String,
			required: !1
		},
		focusable: {
			type: Boolean,
			required: !1,
			default: !0
		},
		active: {
			type: Boolean,
			required: !1
		},
		allowShiftKey: {
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
	setup(t) {
		let a = t, c = Y(), u = j(), d = g(() => a.tabStopId || u), f = g(() => c.currentTabStopId.value === d.value), { getItems: h, CollectionItem: _ } = B();
		e(() => {
			a.focusable && c.onFocusableItemAdd();
		}), m(() => {
			a.focusable && c.onFocusableItemRemove();
		}), o(() => a.focusable, (e, t) => {
			e !== t && (e ? c.onFocusableItemAdd() : c.onFocusableItemRemove());
		});
		function v(e) {
			if (e.key === "Tab" && e.shiftKey) {
				c.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let t = K(e, c.orientation.value, c.dir.value);
			if (t !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !a.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let n = [...h().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (t === "last") n.reverse();
				else if (t === "prev" || t === "next") {
					t === "prev" && n.reverse();
					let r = n.indexOf(e.currentTarget);
					n = c.loop.value ? J(n, r + 1) : n.slice(r + 1);
				}
				i(() => q(n));
			}
		}
		return (e, t) => (r(), p(l(_), null, {
			default: s(() => [x(l(A), {
				tabindex: f.value ? 0 : -1,
				"data-orientation": l(c).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: t[0] ||= (t) => {
					e.focusable ? l(c).onItemFocus(d.value) : t.preventDefault();
				},
				onFocus: t[1] ||= (e) => l(c).onItemFocus(d.value),
				onKeydown: v
			}, {
				default: s(() => [n(e.$slots, "default")]),
				_: 3
			}, 8, [
				"tabindex",
				"data-orientation",
				"data-active",
				"data-disabled",
				"as",
				"as-child"
			])]),
			_: 3
		}));
	}
}), $ = /* @__PURE__ */ b({
	__name: "AppDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {}
	},
	emits: ["update:open"],
	setup(e, { emit: i }) {
		let o = i;
		function c(e) {
			o("update:open", e);
		}
		let d = a(S, void 0), m = g(() => d ? { to: d } : {});
		return (i, a) => (r(), p(l(F), {
			open: e.open,
			"onUpdate:open": c
		}, {
			default: s(() => [x(l(D), u(t(m.value)), {
				default: s(() => [x(l(R), { class: v(l(T).dialogOverlay) }, null, 8, ["class"]), x(l(P), { class: v(l(T).dialogContent) }, {
					default: s(() => [
						h("header", { class: v(l(T).dialogHeader) }, [x(l(L), { class: v(l(T).dialogTitle) }, {
							default: s(() => [y(_(e.title), 1)]),
							_: 1
						}, 8, ["class"]), x(l(z), {
							class: v(["tc-interactive", l(T).dialogClose]),
							"aria-label": e.closeLabel
						}, {
							default: s(() => [x(w, {
								icon: l(E),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						e.description ? (r(), p(l(I), {
							key: 0,
							class: v(l(T).dialogDescription)
						}, {
							default: s(() => [y(_(e.description), 1)]),
							_: 1
						}, 8, ["class"])) : f("", !0),
						h("div", { class: v(l(T).dialogBody) }, [n(i.$slots, "default")], 2)
					]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["open"]));
	}
});
//#endregion
export { V as i, Q as n, Z as r, $ as t };
