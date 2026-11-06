//#region src/ui/experience/host_image_icon.ts
var e = "http://www.w3.org/2000/svg", t = [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2"
	}],
	["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
];
function n(n) {
	let r = n.createElementNS(e, "svg");
	for (let [e, t] of Object.entries({
		viewBox: "0 0 24 24",
		width: "1em",
		height: "1em",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": "2",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"aria-hidden": "true"
	})) r.setAttribute(e, t);
	for (let [i, a] of t) {
		let t = n.createElementNS(e, i);
		for (let [e, n] of Object.entries(a)) t.setAttribute(e, n);
		r.append(t);
	}
	return r;
}
//#endregion
export { n as t };
