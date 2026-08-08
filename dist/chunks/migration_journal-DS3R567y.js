import { $ as e, ct as t, dt as n, ft as r, it as i, ot as a, tt as o, ut as s } from "./src-CpgRWEjb.js";
import { k as c } from "./job_repository-CcjjS_PI.js";
import { n as l } from "./business_repositories-CDvcbNGU.js";
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
], p = n({
	path: r(),
	message: r()
}), m = n({
	reason: e(f),
	message: r(),
	step: r()
}), h = {
	source_fingerprint: r().min(1),
	staging_namespace: r().min(1),
	started_at: r().min(1),
	completed_batches: o(r()),
	counts: s(r(), t().int().nonnegative()),
	image_hashes: o(r()),
	warnings: o(p)
}, g = i("state", [
	n({
		state: a("inventory"),
		...h
	}),
	n({
		state: a("copying"),
		...h
	}),
	n({
		state: a("verifying"),
		...h
	}),
	n({
		state: a("ready_to_switch"),
		...h
	}),
	n({
		state: a("completed"),
		...h
	}),
	n({
		state: a("failed"),
		...h,
		failure: m
	}),
	n({
		state: a("not_required"),
		checked_at: r().min(1)
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
