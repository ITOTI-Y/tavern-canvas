import { bt as e, ft as t, gt as n, lt as r, mt as i, st as a, xt as o, yt as s } from "./src-B1pCVwkN.js";
import { k as c } from "./job_repository-Cci2nOvt.js";
import { n as l } from "./business_repositories-CSXCQSWl.js";
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
], p = e({
	path: o(),
	message: o()
}), m = e({
	reason: a(f),
	message: o(),
	step: o()
}), h = {
	source_fingerprint: o().min(1),
	staging_namespace: o().min(1),
	started_at: o().min(1),
	completed_batches: r(o()),
	counts: s(o(), n().int().nonnegative()),
	image_hashes: r(o()),
	warnings: r(p)
}, g = t("state", [
	e({
		state: i("inventory"),
		...h
	}),
	e({
		state: i("copying"),
		...h
	}),
	e({
		state: i("verifying"),
		...h
	}),
	e({
		state: i("ready_to_switch"),
		...h
	}),
	e({
		state: i("completed"),
		...h
	}),
	e({
		state: i("failed"),
		...h,
		failure: m
	}),
	e({
		state: i("not_required"),
		checked_at: o().min(1)
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
