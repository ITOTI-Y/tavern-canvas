import { $ as e, I as t, N as n, U as r, h as i, it as a, st as o, x as s, y as c } from "./vue-i18n-D0uIxSJk.js";
import { _ as l, i as u, j as d } from "./Teleport-CfSgxnHY.js";
import { o as f } from "./FocusScope-MQ_KQm08.js";
import { c as p } from "./PopperContent-K7T6sb7Y.js";
import { t as m } from "./Collection-CsTPApsC.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/utils.js
var h = "rovingFocusGroup.onEntryFocus", g = {
	bubbles: !1,
	cancelable: !0
}, _ = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function v(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function y(e, t, n) {
	let r = v(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return _[r];
}
function b(e, t = !1) {
	let n = f();
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), f() !== n)) return;
}
function x(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [S, C] = /*#__PURE__*/ d("RovingFocusGroup"), w = /* @__PURE__ */ s({
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
	setup(s, { expose: d, emit: f }) {
		let _ = s, v = f, { loop: y, orientation: x, dir: S } = a(_), w = p(S), T = l(_, "currentTabStopId", v, {
			defaultValue: _.defaultCurrentTabStopId,
			passive: _.currentTabStopId === void 0
		}), E = e(!1), D = e(!1), O = e(0), { getItems: k, CollectionSlot: A } = m({ isProvider: !0 });
		function j(e) {
			let t = !D.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !E.value) {
				let t = new CustomEvent(h, g);
				if (e.currentTarget.dispatchEvent(t), v("entryFocus", t), !t.defaultPrevented) {
					let e = k().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					b([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === T.value),
						...e
					].filter(Boolean), _.preventScrollOnEntryFocus);
				}
			}
			D.value = !1;
		}
		function M() {
			setTimeout(() => {
				D.value = !1;
			}, 1);
		}
		return d({ getItems: k }), C({
			loop: y,
			dir: w,
			orientation: x,
			currentTabStopId: T,
			onItemFocus: (e) => {
				T.value = e;
			},
			onItemShiftTab: () => {
				E.value = !0;
			},
			onFocusableItemAdd: () => {
				O.value++;
			},
			onFocusableItemRemove: () => {
				O.value--;
			}
		}), (e, a) => (n(), i(o(A), null, {
			default: r(() => [c(o(u), {
				tabindex: E.value || O.value === 0 ? -1 : 0,
				"data-orientation": o(x),
				as: e.as,
				"as-child": e.asChild,
				dir: o(w),
				style: { outline: "none" },
				onMousedown: a[0] ||= (e) => D.value = !0,
				onMouseup: M,
				onFocus: j,
				onBlur: a[1] ||= (e) => E.value = !1
			}, {
				default: r(() => [t(e.$slots, "default")]),
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
});
//#endregion
export { x as a, y as i, S as n, b as r, w as t };
