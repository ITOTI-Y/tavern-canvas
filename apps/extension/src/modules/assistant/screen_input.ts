export interface DisplayMediaPort {
  get_display_media(): Promise<MediaStream>;
}

export function create_browser_display_media_port(
  media_devices: Pick<MediaDevices, "getDisplayMedia">,
): DisplayMediaPort {
  return { get_display_media: () => media_devices.getDisplayMedia({ video: true }) };
}

export interface FrameCapturePort {
  capture_frame(track: MediaStreamTrack): Promise<Blob>;
}

interface BrowserImageCapture {
  grabFrame(): Promise<ImageBitmap>;
}

export function create_browser_frame_capture_port(
  create_image_capture: (track: MediaStreamTrack) => BrowserImageCapture,
): FrameCapturePort {
  return {
    async capture_frame(track) {
      const bitmap = await create_image_capture(track).grabFrame();
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas 2D context unavailable for screen capture");
      }
      context.drawImage(bitmap, 0, 0);
      return canvas.convertToBlob({ type: "image/png" });
    },
  };
}

export type ScreenCaptureState = "idle" | "capturing" | "error";

/** Explicit-command-only: `start_capture()` is never called automatically; the track's `ended` event keeps the native "stop sharing" affordance in sync. */
export class ScreenInputService {
  readonly #display_media: DisplayMediaPort;
  readonly #frame_capture: FrameCapturePort;
  #stream: MediaStream | null = null;
  #state: ScreenCaptureState = "idle";
  readonly #state_listeners = new Set<(state: ScreenCaptureState) => void>();
  #native_stop_cleanups: (() => void)[] = [];

  constructor(display_media: DisplayMediaPort, frame_capture: FrameCapturePort) {
    this.#display_media = display_media;
    this.#frame_capture = frame_capture;
  }

  get state(): ScreenCaptureState {
    return this.#state;
  }

  get is_active(): boolean {
    return this.#stream !== null;
  }

  on_state_change(handler: (state: ScreenCaptureState) => void): () => void {
    this.#state_listeners.add(handler);
    return () => this.#state_listeners.delete(handler);
  }

  async start_capture(): Promise<void> {
    if (this.#stream !== null) {
      return;
    }
    try {
      const stream = await this.#display_media.get_display_media();
      this.#stream = stream;
      this.#set_state("capturing");
      for (const track of stream.getVideoTracks()) {
        const on_ended = (): void => {
          this.stop_capture();
        };
        track.addEventListener("ended", on_ended);
        this.#native_stop_cleanups.push(() => {
          track.removeEventListener("ended", on_ended);
        });
      }
    } catch {
      this.#stream = null;
      this.#set_state("error");
    }
  }

  async capture_frame(): Promise<Blob | null> {
    const track = this.#stream?.getVideoTracks()[0];
    if (track === undefined) {
      return null;
    }
    return this.#frame_capture.capture_frame(track);
  }

  stop_capture(): void {
    for (const cleanup of this.#native_stop_cleanups.splice(0)) {
      cleanup();
    }
    for (const track of this.#stream?.getTracks() ?? []) {
      track.stop();
    }
    this.#stream = null;
    if (this.#state !== "idle") {
      this.#set_state("idle");
    }
  }

  dispose(): void {
    this.stop_capture();
    this.#state_listeners.clear();
  }

  #set_state(state: ScreenCaptureState): void {
    this.#state = state;
    for (const listener of this.#state_listeners) {
      listener(state);
    }
  }
}

export interface ScreenInputAutoCaptureSettings {
  readonly screen_capture_enabled: boolean;
  readonly auto_capture_on_send: boolean;
}

/** A send never triggers a capture unless both the feature and the toggle are on. */
export function should_auto_capture_on_send(settings: ScreenInputAutoCaptureSettings): boolean {
  return settings.screen_capture_enabled && settings.auto_capture_on_send;
}
