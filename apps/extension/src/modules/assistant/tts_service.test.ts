import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  extract_dialogue_scope,
  split_text_to_segments,
  TtsService,
  type SpeechSynthesisHandlers,
  type SpeechSynthesisPort,
  type SpeechUtteranceOptions,
} from "./tts_service.js";

describe("extract_dialogue_scope", () => {
  it("pulls only quoted dialogue spans in quoted scope", () => {
    expect(
      extract_dialogue_scope('She looked up. "I need to go now." He nodded silently.', "quoted"),
    ).toBe("I need to go now.");
  });

  it("supports Chinese curly quotes", () => {
    expect(extract_dialogue_scope("她说：“我们走吧。”然后转身离开。", "quoted")).toBe("我们走吧。");
  });

  it("falls back to the full text when nothing is quoted", () => {
    expect(extract_dialogue_scope("No quotes here at all.", "quoted")).toBe(
      "No quotes here at all.",
    );
  });

  it("returns the full text unmodified in full scope", () => {
    expect(extract_dialogue_scope('"Quoted" and unquoted.', "full")).toBe(
      '"Quoted" and unquoted.',
    );
  });
});

describe("split_text_to_segments", () => {
  it("splits on sentence terminators, keeping the terminator with each segment", () => {
    expect(split_text_to_segments("One. Two! Three?")).toEqual(["One.", "Two!", "Three?"]);
  });

  it("splits on CJK terminators", () => {
    expect(split_text_to_segments("你好。今天天气不错！")).toEqual(["你好。", "今天天气不错！"]);
  });

  it("drops empty segments", () => {
    expect(split_text_to_segments("  ")).toEqual([]);
  });
});

function fake_port(): SpeechSynthesisPort & {
  readonly calls: { text: string; options: SpeechUtteranceOptions }[];
  resolve(index: number): void;
  fail(index: number): void;
  readonly pause_calls: number;
  readonly resume_calls: number;
  readonly cancel_calls: number;
} {
  const calls: { text: string; options: SpeechUtteranceOptions }[] = [];
  const pending: SpeechSynthesisHandlers[] = [];
  let pause_calls = 0;
  let resume_calls = 0;
  let cancel_calls = 0;
  return {
    calls,
    get pause_calls() {
      return pause_calls;
    },
    get resume_calls() {
      return resume_calls;
    },
    get cancel_calls() {
      return cancel_calls;
    },
    list_voices: () => [{ voice_id: "v1", name: "Voice One", lang: "en-US" }],
    speak(text, options, handlers) {
      calls.push({ text, options });
      pending.push(handlers);
    },
    pause: () => {
      pause_calls += 1;
    },
    resume: () => {
      resume_calls += 1;
    },
    cancel: () => {
      cancel_calls += 1;
    },
    resolve(index: number) {
      pending[index]?.on_end();
    },
    fail(index: number) {
      pending[index]?.on_error();
    },
  };
}

describe("TtsService", () => {
  it("plays segments sequentially, advancing to the next on end", () => {
    const port = fake_port();
    const service = new TtsService(port);

    service.play("First sentence. Second sentence.", { scope: "full", rate: 1, voice_id: null });

    expect(port.calls).toHaveLength(1);
    expect(port.calls[0]?.text).toBe("First sentence.");
    expect(service.state).toBe("playing");

    port.resolve(0);

    expect(port.calls).toHaveLength(2);
    expect(port.calls[1]?.text).toBe("Second sentence.");

    port.resolve(1);

    expect(service.state).toBe("idle");
  });

  it("passes rate and voice through to the port for every segment", () => {
    const port = fake_port();
    const service = new TtsService(port);

    service.play("Only sentence.", { scope: "full", rate: 1.5, voice_id: "v1" });

    expect(port.calls[0]?.options).toEqual({ rate: 1.5, voice_id: "v1" });
  });

  it("pauses and resumes through the port, preserving the current segment", () => {
    const port = fake_port();
    const service = new TtsService(port);
    service.play("First. Second.", { scope: "full", rate: 1, voice_id: null });

    service.pause();
    expect(service.state).toBe("paused");
    expect(port.pause_calls).toBe(1);

    service.resume();
    expect(service.state).toBe("playing");
    expect(port.resume_calls).toBe(1);
  });

  it("stop cancels the port and returns to idle, discarding remaining segments", () => {
    const port = fake_port();
    const service = new TtsService(port);
    service.play("First. Second. Third.", { scope: "full", rate: 1, voice_id: null });

    service.stop();

    expect(service.state).toBe("idle");
    expect(port.cancel_calls).toBeGreaterThanOrEqual(1);

    port.resolve(0);
    expect(port.calls).toHaveLength(1);
  });

  it("retries a failing segment twice before skipping to the next one", () => {
    const port = fake_port();
    const service = new TtsService(port);
    service.play("First. Second.", { scope: "full", rate: 1, voice_id: null });

    port.fail(0);
    port.fail(1);
    port.fail(2);

    expect(port.calls).toHaveLength(4);
    expect(port.calls[3]?.text).toBe("Second.");
  });

  it("notifies state-change listeners and stops after dispose", () => {
    const port = fake_port();
    const service = new TtsService(port);
    const states: string[] = [];
    service.on_state_change((state) => states.push(state));

    service.play("Only.", { scope: "full", rate: 1, voice_id: null });
    service.dispose();

    expect(states).toEqual(["playing", "idle"]);
    expect(port.cancel_calls).toBeGreaterThanOrEqual(1);
  });

  it("exposes the port's voice catalog", () => {
    const port = fake_port();
    const service = new TtsService(port);

    expect(service.list_voices()).toEqual([{ voice_id: "v1", name: "Voice One", lang: "en-US" }]);
  });
});

describe("TtsService: never logs spoken content", () => {
  let console_spies: { mockRestore(): void }[];

  beforeEach(() => {
    console_spies = [
      vi.spyOn(console, "log").mockImplementation(() => {}),
      vi.spyOn(console, "info").mockImplementation(() => {}),
      vi.spyOn(console, "warn").mockImplementation(() => {}),
      vi.spyOn(console, "error").mockImplementation(() => {}),
      vi.spyOn(console, "debug").mockImplementation(() => {}),
    ];
  });

  afterEach(() => {
    for (const spy of console_spies) {
      spy.mockRestore();
    }
  });

  it("never passes the spoken segment text to any console method across the full lifecycle", () => {
    const port = fake_port();
    const service = new TtsService(port);
    const secret_line = "the quick brown fox jumps over the lazy dog SECRET-MARKER";

    service.play(secret_line, { scope: "full", rate: 1, voice_id: null });
    port.fail(0);
    service.pause();
    service.resume();
    service.stop();

    for (const spy of console_spies) {
      expect(spy).not.toHaveBeenCalled();
    }
  });
});
