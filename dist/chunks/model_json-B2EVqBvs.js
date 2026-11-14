//#region src/modules/illustration/model_json.ts
var e = /<(think|thinking|reasoning)>[\s\S]*?<\/\1>/giu, t = /```(?:json)?\s*([\s\S]*?)```/giu;
function n(e, t) {
	for (let n = e.lastIndexOf("}"); n >= 0; n = e.lastIndexOf("}", n - 1)) {
		let r = 0;
		for (let i = n; i >= 0; --i) {
			let a = e[i];
			if (a === "}") r += 1;
			else if (a === "{" && (--r, r === 0)) {
				let r = e.slice(i, n + 1);
				if (r.includes(`"${t}"`)) return r;
				break;
			}
		}
	}
	return null;
}
function r(r, i) {
	let a = r.replace(e, "").trim(), o = [...a.matchAll(t)].map((e) => (e[1] ?? "").trim()).reverse(), s = n(a, i);
	return [
		a,
		...o,
		...s === null ? [] : [s]
	];
}
//#endregion
export { r as t };
