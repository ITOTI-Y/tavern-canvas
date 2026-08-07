import { describe, expect, it, vi } from "vitest";

import {
  AsrService,
  is_valid_asr_result,
  should_auto_stop_on_silence,
  wire_conversation_mode,
  type AsrRecognitionHandlers,
  type AsrSettings,
  type MicrophonePermissionPort,
  type SpeechRecognitionPort,
  type SpeechRecognitionPortFactory,
} from "./asr_service.js";
import { TtsService, type SpeechSynthesisPort } from "./tts_service.js";

const SETTINGS: AsrSettings = {
  language: "en-US",
  vad_threshold: 0.02,
  silence_timeout_ms: 1500,
  append_mode: false,
  auto_send: false,
};

function fake_recognition(): SpeechRecognitionPort & {
  handlers: AsrRecognitionHandlers | null;
  readonly stop_calls: number;
  readonly abort_calls: number;
} {
  let handlers: AsrRecognitionHandlers | null = null;
  let stop_calls = 0;
  let abort_calls = 0;
  return {
    get handlers() {
      return handlers;
    },
    set handlers(value) {
      handlers = value;
    },
    get stop_calls() {
      return stop_calls;
    },
    get abort_calls() {
      return abort_calls;
    },
    start: (_language, h) => {
      handlers = h;
    },
    stop: () => {
      stop_calls += 1;
    },
    abort: () => {
      abort_calls += 1;
    },
  };
}

function granted_permission(): MicrophonePermissionPort {
  return { request: () => Promise.resolve("granted") };
}

describe("is_valid_asr_result", () => {
  it("accepts an ordinary transcript", () => {
    expect(is_valid_asr_result("please open the settings panel")).toBe(true);
  });

  it("rejects an empty transcript", () => {
    expect(is_valid_asr_result("   ")).toBe(false);
  });

  it("rejects a raw JSON error blob", () => {
    expect(is_valid_asr_result('{"error": "invalid_request"}')).toBe(false);
  });

  it("rejects a Python traceback", () => {
    expect(is_valid_asr_result("Traceback (most recent call last):\n  File x")).toBe(false);
  });

  it("rejects a server error signature", () => {
    expect(is_valid_asr_result("500 Internal Server Error")).toBe(false);
  });
});

describe("should_auto_stop_on_silence", () => {
  it("is false until the trailing window is fully below threshold", () => {
    expect(should_auto_stop_on_silence([0.5, 0.01, 0.01], 0.02, 3)).toBe(false);
  });

  it("is true once the trailing window is fully below threshold", () => {
    expect(should_auto_stop_on_silence([0.5, 0.01, 0.01, 0.01], 0.02, 3)).toBe(true);
  });

  it("is false when there is not yet enough history", () => {
    expect(should_auto_stop_on_silence([0.01], 0.02, 3)).toBe(false);
  });
});

describe("AsrService", () => {
  it("reports unavailable without ever requesting permission when no recognition backend exists", async () => {
    const factory: SpeechRecognitionPortFactory = () => null;
    const permission = { request: vi.fn(() => Promise.resolve("granted" as const)) };
    const service = new AsrService(factory, permission);

    await service.start(SETTINGS);

    expect(service.state).toBe("unavailable");
    expect(permission.request).not.toHaveBeenCalled();
  });

  it("walks requesting_permission -> listening -> transcribing -> idle on a final result", async () => {
    const recognition = fake_recognition();
    const service = new AsrService(() => recognition, granted_permission());
    const states: string[] = [];
    service.on_state_change((state) => states.push(state));
    const results: string[] = [];
    service.on_result((text) => results.push(text));

    await service.start(SETTINGS);
    expect(service.state).toBe("listening");

    recognition.handlers?.on_result("open the gallery", true);

    expect(results).toEqual(["open the gallery"]);
    expect(states).toEqual(["requesting_permission", "listening", "transcribing", "idle"]);
  });

  it("moves to error and never listens when microphone permission is denied", async () => {
    const recognition = fake_recognition();
    const service = new AsrService(() => recognition, { request: () => Promise.resolve("denied") });

    await service.start(SETTINGS);

    expect(service.state).toBe("error");
  });

  it("filters an invalid transcript before it reaches result listeners", async () => {
    const recognition = fake_recognition();
    const service = new AsrService(() => recognition, granted_permission());
    const results: string[] = [];
    service.on_result((text) => results.push(text));

    await service.start(SETTINGS);
    recognition.handlers?.on_result("Traceback (most recent call last):", true);

    expect(results).toEqual([]);
    expect(service.state).toBe("idle");
  });

  it("cancel aborts the recognition port and returns to idle", async () => {
    const recognition = fake_recognition();
    const service = new AsrService(() => recognition, granted_permission());
    await service.start(SETTINGS);

    service.cancel();

    expect(recognition.abort_calls).toBe(1);
    expect(service.state).toBe("idle");
  });

  it("stop delegates to the recognition port without forcing an immediate state change", async () => {
    const recognition = fake_recognition();
    const service = new AsrService(() => recognition, granted_permission());
    await service.start(SETTINGS);

    service.stop();

    expect(recognition.stop_calls).toBe(1);
  });

  it("dispose cancels an active session, notifying listeners of the final idle transition before clearing them", async () => {
    const recognition = fake_recognition();
    const service = new AsrService(() => recognition, granted_permission());
    await service.start(SETTINGS);
    const states: string[] = [];
    service.on_state_change((state) => states.push(state));

    service.dispose();

    expect(recognition.abort_calls).toBe(1);
    expect(states).toEqual(["idle"]);

    states.length = 0;
    service.dispose();
    expect(states).toEqual([]);
  });
});

describe("wire_conversation_mode", () => {
  function fake_tts_port(): SpeechSynthesisPort {
    return {
      list_voices: () => [],
      speak: (_text, _options, handlers) => {
        setTimeout(() => handlers.on_end(), 0);
      },
      pause: () => {},
      resume: () => {},
      cancel: () => {},
    };
  }

  it("mutes ASR (aborts recognition) the instant TTS starts speaking", async () => {
    const recognition = fake_recognition();
    const asr = new AsrService(() => recognition, granted_permission());
    await asr.start(SETTINGS);
    const tts = new TtsService(fake_tts_port());

    wire_conversation_mode(asr, tts, () => SETTINGS);
    tts.play("Hello there.", { scope: "full", rate: 1, voice_id: null });

    expect(recognition.abort_calls).toBe(1);
  });

  it("restarts ASR listening once TTS returns to idle", async () => {
    const recognition = fake_recognition();
    const start_calls: string[] = [];
    const factory: SpeechRecognitionPortFactory = () => {
      start_calls.push("start");
      return recognition;
    };
    const asr = new AsrService(factory, granted_permission());
    const tts = new TtsService(fake_tts_port());
    wire_conversation_mode(asr, tts, () => SETTINGS);

    tts.play("Hi.", { scope: "full", rate: 1, voice_id: null });
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await Promise.resolve();

    expect(start_calls.length).toBeGreaterThanOrEqual(1);
  });
});
