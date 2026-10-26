export class NovelAiServiceUnavailableError extends Error {
  readonly code = "capability_unavailable";

  constructor(message: string) {
    super(message);
    this.name = "NovelAiServiceUnavailableError";
  }
}
