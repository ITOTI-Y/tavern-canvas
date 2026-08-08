import { $ as e, J as t, X as n, at as r, ot as i, rt as a, st as o, tt as s } from "./src-BPUc1ma2.js";
import { C as c, n as l } from "./business_repositories-CBdwxJT1.js";
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
], p = i({
	path: o(),
	message: o()
}), m = i({
	reason: t(f),
	message: o(),
	step: o()
}), h = {
	source_fingerprint: o().min(1),
	staging_namespace: o().min(1),
	started_at: o().min(1),
	completed_batches: n(o()),
	counts: r(o(), a().int().nonnegative()),
	image_hashes: n(o()),
	warnings: n(p)
}, g = e("state", [
	i({
		state: s("inventory"),
		...h
	}),
	i({
		state: s("copying"),
		...h
	}),
	i({
		state: s("verifying"),
		...h
	}),
	i({
		state: s("ready_to_switch"),
		...h
	}),
	i({
		state: s("completed"),
		...h
	}),
	i({
		state: s("failed"),
		...h,
		failure: m
	}),
	i({
		state: s("not_required"),
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
