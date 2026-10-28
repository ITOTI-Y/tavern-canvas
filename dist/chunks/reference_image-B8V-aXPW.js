import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
//#region src/ui/views/assets/reference_image.ts
var t = /* @__PURE__ */ e({
	card_thumbnail: () => a,
	read_reference_image: () => i,
	reference_image_bytes: () => s
}), n = 1536, r = 192;
function i(e) {
	return o(e, n, "image/jpeg", .92);
}
async function a(e) {
	return o(new Blob([new Uint8Array(s(e))]), r, "image/webp", .8);
}
async function o(e, t, n, r) {
	let i = await createImageBitmap(e);
	try {
		let e = Math.min(1, t / Math.max(i.width, i.height)), a = Math.max(1, Math.round(i.width * e)), o = Math.max(1, Math.round(i.height * e)), s = new OffscreenCanvas(a, o), c = s.getContext("2d");
		if (c === null) throw Error("A 2D canvas context is unavailable in this browser");
		c.drawImage(i, 0, 0, a, o);
		let l = await s.convertToBlob({
			type: n,
			quality: r
		});
		return await new Promise((e, t) => {
			let n = new FileReader();
			n.onload = () => {
				e(n.result);
			}, n.onerror = () => {
				t(n.error ?? /* @__PURE__ */ Error("The image could not be read"));
			}, n.readAsDataURL(l);
		});
	} finally {
		i.close();
	}
}
function s(e) {
	let t = e.slice(e.indexOf(",") + 1);
	return Uint8Array.from(atob(t), (e) => e.charCodeAt(0));
}
//#endregion
export { i as n, t as r, a as t };
