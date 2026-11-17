/** The parts of SillyTavern's context that hold the chat's world info sticky and cooldown timers. */
export interface WorldInfoTimersContext {
  getCurrentChatId(): unknown;
  readonly chat: readonly unknown[];
  readonly chatMetadata?: Record<string, unknown>;
}

export interface WorldInfoTimersHold {
  /** Puts the timers back as they were, unless the chat changed meanwhile. */
  restore(): void;
}

/**
 * Keeps a request the extension sends from moving the chat's world info timers. Tavern Helper
 * scans world info for every request it sends and records sticky and cooldown starts in the chat
 * metadata as a story turn would, so an analysis could put an entry on cooldown for the next reply.
 * When the chat or its message count changed during the request, a story turn ran and set its
 * own timers, which are kept.
 */
export function hold_world_info_timers(
  get_context: () => WorldInfoTimersContext,
): WorldInfoTimersHold {
  const context = get_context();
  const metadata = context.chatMetadata;
  const chat_id = context.getCurrentChatId();
  const length = context.chat.length;
  const before =
    metadata?.timedWorldInfo === undefined ? undefined : structuredClone(metadata.timedWorldInfo);
  return {
    restore() {
      const now = get_context();
      if (
        metadata === undefined ||
        now.chatMetadata !== metadata ||
        now.getCurrentChatId() !== chat_id ||
        now.chat.length !== length
      ) {
        return;
      }
      if (before === undefined) {
        delete metadata.timedWorldInfo;
      } else {
        metadata.timedWorldInfo = before;
      }
    },
  };
}
