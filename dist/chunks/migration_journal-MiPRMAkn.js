import { _t as e, at as t, ft as n, mt as r, st as i, ut as a, vt as o, yt as s } from "./src-CLzfjths.js";
import { k as c } from "./job_repository-DB1y8cIh.js";
import { n as l } from "./business_repositories-cGxFpOW9.js";
//#region src/migration/migration_journal.ts
var u = "migration:", d = "migration:not_required", f = [
	"invalid_source",
	"unknown_setting_path",
	"converter_error",
	"missing_blob",
	"hash_mismatch",
	"count_mismatch",
	"secret_transfer_blocked",
	"switch_failed"
], p = o({
	path: s(),
	message: s()
}), m = o({
	reason: t(f),
	message: s(),
	step: s()
}), h = {
	source_fingerprint: s().min(1),
	staging_namespace: s().min(1),
	started_at: s().min(1),
	completed_batches: i(s()),
	counts: e(s(), r().int().nonnegative()),
	image_hashes: i(s()),
	warnings: i(p)
}, g = a("state", [
	o({
		state: n("inventory"),
		...h
	}),
	o({
		state: n("copying"),
		...h
	}),
	o({
		state: n("verifying"),
		...h
	}),
	o({
		state: n("ready_to_switch"),
		...h
	}),
	o({
		state: n("completed"),
		...h
	}),
	o({
		state: n("failed"),
		...h,
		failure: m
	}),
	o({
		state: n("not_required"),
		checked_at: s().min(1)
	})
]);
function _(e) {
	let t = new l(e);
	return {
		async load(e) {
			let n = await t.get(e);
			if (n === null) return null;
			let r = g.safeParse(n.payload);
			if (!r.success) throw Error(`Migration journal "${e}" has a corrupt payload`);
			return {
				state: r.data.state,
				updated_at: n.updated_at,
				payload: r.data
			};
		},
		async save(e, n, r) {
			let i = await t.get(e), a = {
				migration_id: e,
				source_version: 2,
				state: n.state,
				updated_at: r,
				payload: c(n)
			};
			if (i === null) {
				await t.create(a);
				return;
			}
			await t.update(a);
		}
	};
}
function v(e) {
	return { async with_marker_transaction(t, n) {
		let r = new l(e), i = e.transaction(["migration_journal"], "readonly");
		try {
			let e = await r.get(t, i), a = await n({ get_marker: () => Promise.resolve(e === null ? null : {
				namespace: e.migration_id,
				state: e.state
			}) });
			return await i.done, a;
		} catch (e) {
			throw await i.done.catch(() => void 0), e;
		}
	} };
}
//#endregion
export { v as i, d as n, _ as r, u as t };
