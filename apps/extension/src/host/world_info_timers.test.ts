import { describe, expect, it } from "vitest";

import { hold_world_info_timers, type WorldInfoTimersContext } from "./world_info_timers.js";

function context(chat_id: string, chat: unknown[], metadata: Record<string, unknown>) {
  const state = { chat_id, chat, metadata };
  const get = (): WorldInfoTimersContext => ({
    getCurrentChatId: () => state.chat_id,
    chat: state.chat,
    chatMetadata: state.metadata,
  });
  return { state, get };
}

describe("hold_world_info_timers", () => {
  it("puts back the sticky and cooldown timers a request changed", () => {
    const metadata: Record<string, unknown> = {
      timedWorldInfo: { sticky: { a: { start: 3, end: 5 } }, cooldown: {} },
    };
    const { get } = context("c1", [1, 2, 3], metadata);

    const hold = hold_world_info_timers(get);
    metadata.timedWorldInfo = {
      sticky: { a: { start: 3, end: 5 }, b: { start: 3, end: 8 } },
      cooldown: { c: { start: 3, end: 6 } },
    };
    hold.restore();

    expect(metadata.timedWorldInfo).toEqual({
      sticky: { a: { start: 3, end: 5 } },
      cooldown: {},
    });
  });

  it("keeps the timers a story turn set when a message arrived during the request", () => {
    const metadata: Record<string, unknown> = { timedWorldInfo: { sticky: {}, cooldown: {} } };
    const { state, get } = context("c1", [1, 2, 3], metadata);

    const hold = hold_world_info_timers(get);
    state.chat = [1, 2, 3, 4];
    metadata.timedWorldInfo = { sticky: { b: { start: 4, end: 6 } }, cooldown: {} };
    hold.restore();

    expect(metadata.timedWorldInfo).toEqual({ sticky: { b: { start: 4, end: 6 } }, cooldown: {} });
  });
});
