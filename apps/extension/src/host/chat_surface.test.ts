import { describe, expect, it, vi } from "vitest";

import {
  CHAT_SURFACE_PARTICIPANT_ID,
  ChatSurfaceMounts,
  register_chat_surface_participant,
  type ChatSurfaceEvent,
} from "./chat_surface.js";

function tauritavern(managed: boolean) {
  const registerParticipant = vi.fn();
  return {
    registerParticipant,
    globals: {
      __TAURITAVERN__: {
        api: {
          chatSurface: { isManagedOwnershipRequired: () => managed, registerParticipant },
        },
      },
    },
  };
}

describe("register_chat_surface_participant", () => {
  it("registers a commit participant only under managed ownership", () => {
    const managed = tauritavern(true);
    const mounts = new ChatSurfaceMounts();

    expect(register_chat_surface_participant(managed.globals, mounts)).toBe(true);
    expect(mounts.active).toBe(true);
    expect(Object.keys(managed.registerParticipant.mock.calls[0]?.[0] as object).sort()).toEqual([
      "didCommitContent",
      "id",
      "protocolVersion",
    ]);
    expect(managed.registerParticipant).toHaveBeenCalledWith(
      expect.objectContaining({ id: CHAT_SURFACE_PARTICIPANT_ID, protocolVersion: 1 }),
    );

    const static_mode = tauritavern(false);
    const idle = new ChatSurfaceMounts();
    expect(register_chat_surface_participant(static_mode.globals, idle)).toBe(false);
    expect(static_mode.registerParticipant).not.toHaveBeenCalled();
    expect(idle.active).toBe(false);
    expect(register_chat_surface_participant({}, idle)).toBe(false);
  });

  it("tracks committed content until the host releases it", () => {
    const managed = tauritavern(true);
    const mounts = new ChatSurfaceMounts();
    register_chat_surface_participant(managed.globals, mounts);
    const participant = managed.registerParticipant.mock.calls[0]?.[0] as {
      didCommitContent: (context: {
        mesid: number;
        element: HTMLElement;
        content: HTMLElement;
      }) => () => void;
    };
    const events: ChatSurfaceEvent[] = [];
    mounts.subscribe((event) => {
      events.push(event);
    });
    const element = document.createElement("div");
    const content = document.createElement("div");

    const release = participant.didCommitContent({ mesid: 3, element, content });
    expect(mounts.mounted()).toEqual([{ mesid: 3, element, content }]);
    release();

    expect(mounts.mounted()).toEqual([]);
    expect(events.map((event) => event.type)).toEqual(["committed", "released"]);
  });

  it("keeps a listener failure away from the host callback", () => {
    const mounts = new ChatSurfaceMounts();
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    mounts.subscribe(() => {
      throw new Error("boom");
    });

    expect(() =>
      mounts.commit({
        mesid: 1,
        element: document.createElement("div"),
        content: document.createElement("div"),
      }),
    ).not.toThrow();
    expect(error).toHaveBeenCalledOnce();
    error.mockRestore();
  });
});
