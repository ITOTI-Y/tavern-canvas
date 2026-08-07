export type TtsDialogueScope = "quoted" | "full";

const QUOTE_PATTERN = /["“]([^"”]+)["”]/gu;

/**
 * "quoted" mirrors legacy `extractDialogueForTTS`: pulls only the quoted-dialogue spans (straight
 * or Chinese curly quotes) out of a reply, so narration/stage directions are skipped. Falls back
 * to the full text when nothing is quoted, rather than reading nothing aloud.
 */
export function extract_dialogue_scope(text: string, scope: TtsDialogueScope): string {
  if (scope === "full") {
    return text;
  }
  const matches = [...text.matchAll(QUOTE_PATTERN)];
  if (matches.length === 0) {
    return text;
  }
  return matches.map((match) => match[1]).join(" ");
}

const SENTENCE_PATTERN = /[^。！？.!?\n]+[。！？.!?]?/gu;

/** Mirrors legacy `splitTextToSegments`: sentence-boundary chunks (CJK and Latin terminators), so
 * each segment can be spoken and retried independently. */
export function split_text_to_segments(text: string): readonly string[] {
  const matches = text.match(SENTENCE_PATTERN) ?? [];
  return matches.map((segment) => segment.trim()).filter((segment) => segment.length > 0);
}

export interface AssistantSpeechVoice {
  readonly voice_id: string;
  readonly name: string;
  readonly lang: string;
}

export interface SpeechSynthesisHandlers {
  readonly on_end: () => void;
  readonly on_error: () => void;
}

export interface SpeechUtteranceOptions {
  readonly voice_id: string | null;
  readonly rate: number;
}

/** Injected so `TtsService` never touches `window.speechSynthesis` directly -- the real
 * implementation is `create_browser_speech_synthesis_port`, tests supply a fake. */
export interface SpeechSynthesisPort {
  list_voices(): readonly AssistantSpeechVoice[];
  speak(text: string, options: SpeechUtteranceOptions, handlers: SpeechSynthesisHandlers): void;
  pause(): void;
  resume(): void;
  cancel(): void;
}

export function create_browser_speech_synthesis_port(
  synth: Pick<SpeechSynthesis, "getVoices" | "speak" | "pause" | "resume" | "cancel">,
): SpeechSynthesisPort {
  return {
    list_voices: () =>
      synth.getVoices().map((voice) => ({ voice_id: voice.voiceURI, name: voice.name, lang: voice.lang })),
    speak(text, options, handlers) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate;
      const voice =
        options.voice_id !== null
          ? synth.getVoices().find((candidate) => candidate.voiceURI === options.voice_id)
          : undefined;
      if (voice) {
        utterance.voice = voice;
      }
      utterance.onend = () => { handlers.on_end(); };
      utterance.onerror = () => { handlers.on_error(); };
      synth.speak(utterance);
    },
    pause: () => { synth.pause(); },
    resume: () => { synth.resume(); },
    cancel: () => { synth.cancel(); },
  };
}

export type TtsPlaybackState = "idle" | "playing" | "paused";

export interface TtsPlayOptions {
  readonly scope: TtsDialogueScope;
  readonly rate: number;
  readonly voice_id: string | null;
}

const MAX_RETRIES_PER_SEGMENT = 2;

/**
 * Sequential segment playback over an injected `SpeechSynthesisPort`. Never receives or retains
 * spoken text past what `play()` needs to split into segments -- no segment content is ever
 * logged, thrown into an error message, or otherwise surfaced outside the port call itself.
 */
export class TtsService {
  readonly #port: SpeechSynthesisPort;
  #state: TtsPlaybackState = "idle";
  #segments: readonly string[] = [];
  #segment_index = 0;
  #retries_this_segment = 0;
  #options: TtsPlayOptions = { scope: "full", rate: 1, voice_id: null };
  #state_listeners = new Set<(state: TtsPlaybackState) => void>();

  constructor(port: SpeechSynthesisPort) {
    this.#port = port;
  }

  get state(): TtsPlaybackState {
    return this.#state;
  }

  list_voices(): readonly AssistantSpeechVoice[] {
    return this.#port.list_voices();
  }

  on_state_change(handler: (state: TtsPlaybackState) => void): () => void {
    this.#state_listeners.add(handler);
    return () => this.#state_listeners.delete(handler);
  }

  play(text: string, options: TtsPlayOptions): void {
    this.#port.cancel();
    const scoped_text = extract_dialogue_scope(text, options.scope);
    this.#segments = split_text_to_segments(scoped_text);
    this.#segment_index = 0;
    this.#retries_this_segment = 0;
    this.#options = options;
    if (this.#segments.length === 0) {
      this.#set_state("idle");
      return;
    }
    this.#set_state("playing");
    this.#speak_current_segment();
  }

  pause(): void {
    if (this.#state !== "playing") {
      return;
    }
    this.#port.pause();
    this.#set_state("paused");
  }

  resume(): void {
    if (this.#state !== "paused") {
      return;
    }
    this.#port.resume();
    this.#set_state("playing");
  }

  stop(): void {
    this.#port.cancel();
    this.#segments = [];
    this.#segment_index = 0;
    this.#set_state("idle");
  }

  dispose(): void {
    this.stop();
    this.#state_listeners.clear();
  }

  #speak_current_segment(): void {
    const segment = this.#segments[this.#segment_index];
    if (segment === undefined) {
      this.#set_state("idle");
      return;
    }
    this.#port.speak(
      segment,
      { voice_id: this.#options.voice_id, rate: this.#options.rate },
      {
        on_end: () => {
          this.#retries_this_segment = 0;
          this.#segment_index += 1;
          if (this.#state === "playing") {
            this.#speak_current_segment();
          }
        },
        on_error: () => {
          this.#retries_this_segment += 1;
          if (this.#retries_this_segment > MAX_RETRIES_PER_SEGMENT) {
            this.#retries_this_segment = 0;
            this.#segment_index += 1;
          }
          if (this.#state === "playing") {
            this.#speak_current_segment();
          }
        },
      },
    );
  }

  #set_state(state: TtsPlaybackState): void {
    this.#state = state;
    for (const listener of this.#state_listeners) {
      listener(state);
    }
  }
}
