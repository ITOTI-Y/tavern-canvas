//#region src/host/tavern_helper_opening.ts
var e = [
	"getWorldbookNames",
	"getWorldbook",
	"createWorldbook",
	"replaceWorldbook",
	"deleteWorldbook",
	"getChatWorldbookName",
	"rebindChatWorldbook",
	"getPresetNames",
	"getProxyPresetNames",
	"createChatMessages"
], t = class extends Error {
	code = "opening_host_unavailable";
	constructor(e) {
		super(`JS-Slash-Runner lacks ${e.join(", ")}`), this.name = "OpeningHostUnavailableError";
	}
};
function n(e) {
	return typeof e == "object" && !!e;
}
function r(e, t) {
	if (!Array.isArray(e) || !e.every((e) => typeof e == "string")) throw Error(`TavernHelper returned invalid ${t}`);
	return e;
}
function i(e) {
	if (typeof e == "string") return e;
	if (e instanceof RegExp) return `/${e.source}/${e.flags}`;
	throw Error("TavernHelper returned an invalid world info key");
}
var a = /^\/(.+)\/([dgimsuvy]*)$/u;
function o(e) {
	let t = a.exec(e);
	if (t?.[1] === void 0) return e;
	try {
		return new RegExp(t[1], t[2]);
	} catch {
		return e;
	}
}
function s(e) {
	if (!n(e) || !n(e.strategy) || !n(e.position)) throw Error("TavernHelper returned an invalid world info entry");
	let { uid: t, name: r, enabled: a, content: o } = e, { type: s, keys: c } = e.strategy, { order: l } = e.position;
	if (typeof t != "number" || typeof r != "string" || typeof a != "boolean" || typeof o != "string" || typeof s != "string" || !Array.isArray(c) || typeof l != "number") throw Error("TavernHelper returned an invalid world info entry");
	return {
		uid: t,
		name: r,
		enabled: a,
		constant: s === "constant",
		keys: c.map(i),
		content: o,
		order: l
	};
}
function c(e, t) {
	let r = n(e.strategy) ? e.strategy : {}, i = n(e.position) ? e.position : {};
	return {
		...e,
		name: t.name,
		enabled: t.enabled,
		content: t.content,
		strategy: {
			...r,
			type: t.constant ? "constant" : "selective",
			keys: t.keys.map(o)
		},
		position: {
			...i,
			order: t.order
		}
	};
}
function l(r) {
	let i = n(r) ? r.TavernHelper : void 0, a = e.filter((e) => !n(i) || typeof i[e] != "function");
	if (a.length > 0) throw new t(a);
	return i;
}
function u(e) {
	return typeof e == "string" ? e : "";
}
function d(e) {
	let t = n(e) ? e.SillyTavern : void 0, r = n(t) ? t.getContext : void 0;
	if (typeof r != "function") return null;
	let i = r();
	return n(i) ? i : null;
}
function f(e) {
	let t = n(e) ? e.getCharWorldbookNames : void 0;
	if (typeof t != "function") return [];
	try {
		let e = t("current");
		if (!n(e)) return [];
		let r = Array.isArray(e.additional) ? e.additional : [];
		return [e.primary, ...r].filter((e) => typeof e == "string" && e !== "");
	} catch {
		return [];
	}
}
function p(e) {
	let t = l(e);
	async function i(e) {
		let r = await t.getWorldbook(e);
		if (!Array.isArray(r) || !r.every(n)) throw Error(`TavernHelper returned invalid entries for world book ${e}`);
		return r;
	}
	function a() {
		try {
			let e = t.getChatWorldbookName("current");
			return typeof e == "string" && e !== "" ? e : null;
		} catch {
			return null;
		}
	}
	return {
		list_worldbooks: () => r(t.getWorldbookNames(), "world book names"),
		async read_entries(e) {
			return (await i(e)).map(s);
		},
		async create_worldbook(e) {
			if (!await t.createWorldbook(e, [])) throw Error(`A world book named ${e} already exists`);
		},
		async save_entries(e, n) {
			let r = new Set(n.remove), a = new Map(n.upsert.flatMap((e) => e.uid === void 0 ? [] : [[e.uid, e]])), o = (await i(e)).filter((e) => typeof e.uid != "number" || !r.has(e.uid)).map((e) => {
				let t = typeof e.uid == "number" ? a.get(e.uid) : void 0;
				return t === void 0 ? e : c(e, t);
			}), s = n.upsert.filter((e) => e.uid === void 0).map((e) => c({}, e));
			await t.replaceWorldbook(e, [...o, ...s]);
		},
		async delete_worldbook(e) {
			await t.deleteWorldbook(e);
		},
		async rename_worldbook(e, n) {
			let r = await i(e);
			if (!await t.createWorldbook(n, r)) throw Error(`A world book named ${n} already exists`);
			a() === e && await t.rebindChatWorldbook("current", n), await t.deleteWorldbook(e);
		},
		chat_name() {
			let t = d(e)?.chatId;
			return typeof t == "string" && t !== "" ? t : null;
		},
		character() {
			let t = d(e), r = t?.characters, i = t?.characterId, a = Array.isArray(r) && (typeof i == "number" || typeof i == "string") ? r[Number(i)] : void 0, o = n(a) && n(a.data) ? a.data : null, s = n(a) ? u(a.name) : "";
			return o === null || s === "" ? null : {
				name: s,
				description: u(o.description),
				personality: u(o.personality),
				scenario: u(o.scenario),
				first_message: u(o.first_mes),
				worldbooks: f(n(e) ? e.TavernHelper : void 0)
			};
		},
		chat_worldbook: a,
		async bind_chat_worldbook(e) {
			await t.rebindChatWorldbook("current", e);
		},
		preset_names: () => r(t.getPresetNames(), "preset names"),
		proxy_preset_names: () => r(t.getProxyPresetNames(), "proxy preset names"),
		async append_character_message(e, n) {
			await t.createChatMessages([{
				role: "assistant",
				name: e,
				message: n
			}], { refresh: "affected" });
		}
	};
}
//#endregion
export { p as create_opening_host };
