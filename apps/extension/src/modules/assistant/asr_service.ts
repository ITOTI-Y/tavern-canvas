import type { TtsPlaybackState, TtsService } from "./tts_service.js";

export type AsrState =
  | "idle"
  | "requesting_permission"
  | "listening"
  | "transcribing"
  | "error"
  | "unavailable";

export interface MicrophonePermissionPort {
  request(): Promise<"granted" | "denied">;
}

export interface AsrRecognitionHandlers {
  readonly on_result: (transcript: string, is_final: boolean) => void;
  readonly on_error: () => void;
  readonly on_end: () => void;
}

/** Injected so `AsrService` never touches a global recognition constructor directly. */
export interface SpeechRecognitionPort {
  start(language: string, handlers: AsrRecognitionHandlers): void;
  stop(): void;
  abort(): void;
}

/** Returns `null` when no usable recognition backend exists -- the caller reports
 * `"unavailable"`, never guesses from `navigator.userAgent`. */
export type SpeechRecognitionPortFactory = () => SpeechRecognitionPort | null;

interface BrowserSpeechRecognitionResultAlternative {
  readonly transcript: string;
}

interface BrowserSpeechRecognitionResult extends ArrayLike<BrowserSpeechRecognitionResultAlternative> {
  readonly isFinal: boolean;
}

interface BrowserSpeechRecognitionEvent {
  readonly results: ArrayLike<BrowserSpeechRecognitionResult>;
}

interface BrowserSpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

export interface SpeechRecognitionGlobals {
  readonly SpeechRecognition?: new () => BrowserSpeechRecognition;
  readonly webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
}

/** Presence-of-constructor detection only -- never `navigator.userAgent` sniffing
 * (task-5-brief.md's explicit requirement). */
export function create_browser_speech_recognition_factory(
  globals: SpeechRecognitionGlobals,
): SpeechRecognitionPortFactory {
  const Constructor = globals.SpeechRecognition ?? globals.webkitSpeechRecognition;
  if (Constructor === undefined) {
    return () => null;
  }
  return () => {
    const instance = new Constructor();
    return {
      start(language, handlers) {
        instance.lang = language;
        instance.continuous = false;
        instance.interimResults = true;
        instance.onresult = (event) => {
          const last_index = event.results.length - 1;
          const result = event.results[last_index];
          const transcript = result?.[0]?.transcript;
          if (result !== undefined && transcript !== undefined) {
            handlers.on_result(transcript, result.isFinal);
          }
        };
        instance.onerror = () => { handlers.on_error(); };
        instance.onend = () => { handlers.on_end(); };
        instance.start();
      },
      stop: () => { instance.stop(); },
      abort: () => { instance.abort(); },
    };
  };
}

const INVALID_RESULT_PATTERNS: readonly RegExp[] = [
  /^\s*$/u,
  /^\s*[{[][\s\S]*[}\]]\s*$/u,
  /Traceback \(most recent call last\)/u,
  /internal server error/iu,
  /\b(500|502|503|401|403|404)\b.*\berror\b/iu,
];

/** Mirrors legacy `isValidASRResult`: rejects server-error signatures, raw JSON/traceback dumps,
 * and empty results before a transcript ever reaches the chat input. */
export function is_valid_asr_result(text: string): boolean {
  return !INVALID_RESULT_PATTERNS.some((pattern) => pattern.test(text));
}

/** True once the trailing `window_frames` RMS samples have all sat below `threshold` -- the
 * voice-activity-detection auto-stop signal (mirrors legacy `runVAD`'s silence check). */
export function should_auto_stop_on_silence(
  rms_history: readonly number[],
  threshold: number,
  window_frames: number,
): boolean {
  if (window_frames <= 0 || rms_history.length < window_frames) {
    return false;
  }
  return rms_history.slice(-window_frames).every((rms) => rms < threshold);
}

export interface AsrSettings {
  readonly language: string;
  readonly vad_threshold: number;
  readonly silence_timeout_ms: number;
  readonly append_mode: boolean;
  readonly auto_send: boolean;
}

/**
 * Capture-lifecycle state machine over an injected `SpeechRecognitionPort`. Never starts
 * listening on its own -- every transition out of `idle` is triggered by an explicit `start()`
 * call from the UI (never inferred, never on a timer).
 */
export class AsrService {
  readonly #recognition_factory: SpeechRecognitionPortFactory;
  readonly #permission: MicrophonePermissionPort;
  #recognition: SpeechRecognitionPort | null = null;
  #state: AsrState = "idle";
  readonly #state_listeners = new Set<(state: AsrState) => void>();
  readonly #result_listeners = new Set<(transcript: string) => void>();

  constructor(recognition_factory: SpeechRecognitionPortFactory, permission: MicrophonePermissionPort) {
    this.#recognition_factory = recognition_factory;
    this.#permission = permission;
  }

  get state(): AsrState {
    return this.#state;
  }

  on_state_change(handler: (state: AsrState) => void): () => void {
    this.#state_listeners.add(handler);
    return () => this.#state_listeners.delete(handler);
  }

  on_result(handler: (transcript: string) => void): () => void {
    this.#result_listeners.add(handler);
    return () => this.#result_listeners.delete(handler);
  }

  async start(settings: AsrSettings): Promise<void> {
    if (this.#state !== "idle" && this.#state !== "error" && this.#state !== "unavailable") {
      return;
    }

    const recognition = this.#recognition_factory();
    if (recognition === null) {
      this.#set_state("unavailable");
      return;
    }

    this.#set_state("requesting_permission");
    const permission_result = await this.#permission.request();
    if (permission_result !== "granted") {
      this.#set_state("error");
      return;
    }

    this.#recognition = recognition;
    this.#set_state("listening");
    recognition.start(settings.language, {
      on_result: (transcript, is_final) => {
        if (!is_final) {
          return;
        }
        this.#set_state("transcribing");
        if (is_valid_asr_result(transcript)) {
          for (const listener of this.#result_listeners) {
            listener(transcript);
          }
        }
        this.#set_state("idle");
      },
      on_error: () => {
        this.#set_state("error");
      },
      on_end: () => {
        if (this.#state === "listening") {
          this.#set_state("idle");
        }
      },
    });
  }

  stop(): void {
    this.#recognition?.stop();
  }

  cancel(): void {
    this.#recognition?.abort();
    this.#recognition = null;
    if (this.#state !== "idle") {
      this.#set_state("idle");
    }
  }

  dispose(): void {
    this.cancel();
    this.#state_listeners.clear();
    this.#result_listeners.clear();
  }

  #set_state(state: AsrState): void {
    this.#state = state;
    for (const listener of this.#state_listeners) {
      listener(state);
    }
  }
}

/**
 * Hands-free conversation-mode wiring (legacy `startConversationMode`/watchdog): mutes ASR the
 * instant TTS starts speaking, and restarts listening as soon as TTS goes idle -- the TTS state
 * transition itself is the resume signal, so no separate watchdog poll timer is needed. Returns
 * the unsubscribe function; the caller disposes it (and separately cancels `asr`) on stop.
 */
export function wire_conversation_mode(
  asr: AsrService,
  tts: Pick<TtsService, "on_state_change">,
  settings_provider: () => AsrSettings,
): () => void {
  return tts.on_state_change((state: TtsPlaybackState) => {
    if (state === "playing") {
      asr.cancel();
    } else if (state === "idle") {
      void asr.start(settings_provider());
    }
  });
}
