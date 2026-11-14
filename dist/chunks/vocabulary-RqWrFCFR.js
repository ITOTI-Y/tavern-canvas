import { c as e, g as t, h as n, r, t as i, u as a } from "./schemas-BjkyCQYG.js";
import { n as o } from "./generation-CxBPzqgd.js";
var s = a().int().nonnegative(), c = t().trim().max(64), l = a().int().nonnegative(), u = i([
	"prefix",
	"alias",
	"trigram",
	"detail",
	"hot"
]);
function d(e) {
	return e.normalize("NFKC").replace(/_/gu, " ").toLowerCase().replace(/\s+/gu, " ").trim();
}
var f = n({
	record_id: a().int().nonnegative(),
	tag: t().trim().min(1).max(256),
	translation: t().trim().max(512).optional(),
	aliases: r(t().trim().min(1).max(256)).max(32).default([]),
	category: t().trim().max(64).optional(),
	popularity: a().int().nonnegative().default(0),
	description: t().trim().max(4096).optional()
});
r(f).check((e) => {
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
var p = t().regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/u), m = t().trim().min(1).max(128).regex(/^[a-z][a-z0-9_-]*$/u), h = /\.\./u, g = /^[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/u, _ = t().trim().min(1).max(512).refine((e) => !h.test(e) && g.test(e), "must be a safe relative path: letters, digits, '.', '_', '-', and '/' segments only, no scheme, no traversal"), v = n({
	shard_id: t().min(1).max(128),
	package_id: m,
	kind: u,
	path: _,
	sha256: o,
	byte_length: a().int().nonnegative()
}), y = n({
	path: _,
	byte_length: a().int().positive()
}), b = n({
	package_id: m,
	schema_version: e(1),
	data_version: p,
	changelog: t().trim().min(1).max(4096),
	record_count: a().int().nonnegative(),
	compressed_size: a().int().nonnegative(),
	minimum_extension_version: p,
	shards: r(v).min(1).max(5e4),
	pack: y.optional()
}).check((e) => {
	let { pack: t } = e.value, n = e.value.shards.reduce((e, t) => e + t.byte_length, 0);
	t !== void 0 && t.byte_length !== n && e.issues.push({
		code: "custom",
		input: t.byte_length,
		message: `pack byte_length must equal the shards' total ${String(n)}`,
		path: ["pack", "byte_length"]
	});
	let r = /* @__PURE__ */ new Set();
	e.value.shards.forEach((t, n) => {
		r.has(t.shard_id) && e.issues.push({
			code: "custom",
			input: t.shard_id,
			message: `duplicate shard_id: ${t.shard_id}`,
			path: [
				"shards",
				n,
				"shard_id"
			]
		}), r.add(t.shard_id), t.package_id !== e.value.package_id && e.issues.push({
			code: "custom",
			input: t.package_id,
			message: "shard package_id must match manifest package_id",
			path: [
				"shards",
				n,
				"package_id"
			]
		});
	});
});
//#endregion
export { l as a, p as c, d, m as i, v as l, u as n, s as o, b as r, f as s, c as t, _ as u };
