import { b as e, g as t, l as n, m as r, s as i, x as a } from "./ids-CQF5rr2J.js";
import { i as o } from "./generation-Ck4v0g3Y.js";
var s = t().int().nonnegative(), c = a().trim().max(64), l = t().int().nonnegative(), u = i([
	"prefix",
	"alias",
	"trigram",
	"detail",
	"hot"
]);
function d(e) {
	return e.normalize("NFKC").replace(/_/gu, " ").toLowerCase().replace(/\s+/gu, " ").trim();
}
var f = e({
	record_id: t().int().nonnegative(),
	tag: a().trim().min(1).max(256),
	translation: a().trim().max(512).optional(),
	aliases: n(a().trim().min(1).max(256)).max(32).default([]),
	category: a().trim().max(64).optional(),
	popularity: t().int().nonnegative().default(0),
	description: a().trim().max(4096).optional()
});
n(f).check((e) => {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
	e.value.forEach((r, i) => {
		t.has(r.record_id) && e.issues.push({
			code: "custom",
			input: r.record_id,
			message: `duplicate record_id: ${String(r.record_id)}`,
			path: [i, "record_id"]
		}), t.add(r.record_id);
		let a = d(r.tag);
		n.has(a) && e.issues.push({
			code: "custom",
			input: r.tag,
			message: `duplicate normalized tag: ${a}`,
			path: [i, "tag"]
		}), n.add(a);
	});
});
var p = a().regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/u), m = a().trim().min(1).max(128).regex(/^[a-z][a-z0-9_-]*$/u), h = /\.\./u, g = /^[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/u, _ = a().trim().min(1).max(512).refine((e) => !h.test(e) && g.test(e), "must be a safe relative path: letters, digits, '.', '_', '-', and '/' segments only, no scheme, no traversal"), v = e({
	shard_id: a().min(1).max(128),
	package_id: m,
	kind: u,
	path: _,
	sha256: o,
	byte_length: t().int().nonnegative()
}), y = e({
	package_id: m,
	schema_version: r(1),
	data_version: p,
	changelog: a().trim().min(1).max(4096),
	record_count: t().int().nonnegative(),
	compressed_size: t().int().nonnegative(),
	minimum_extension_version: p,
	shards: n(v).min(1).max(5e4)
}).check((e) => {
	let t = /* @__PURE__ */ new Set();
	e.value.shards.forEach((n, r) => {
		t.has(n.shard_id) && e.issues.push({
			code: "custom",
			input: n.shard_id,
			message: `duplicate shard_id: ${n.shard_id}`,
			path: [
				"shards",
				r,
				"shard_id"
			]
		}), t.add(n.shard_id), n.package_id !== e.value.package_id && e.issues.push({
			code: "custom",
			input: n.package_id,
			message: "shard package_id must match manifest package_id",
			path: [
				"shards",
				r,
				"package_id"
			]
		});
	});
});
//#endregion
export { l as a, p as c, d, m as i, v as l, u as n, s as o, y as r, f as s, c as t, _ as u };
