/** Carries the start of the raw output so the user can see what their preset made the model write. */
export class AnalysisParseError extends Error {
  readonly excerpt: string;

  constructor(message: string, raw: string) {
    super(message);
    this.name = "AnalysisParseError";
    this.excerpt = raw.slice(0, 400);
  }
}

/** The analysis request was stopped by the user or ran past its time limit; it is not retried. */
export class AnalysisStoppedError extends Error {
  readonly reason: "cancelled" | "timed_out";

  constructor(reason: "cancelled" | "timed_out") {
    super(reason === "cancelled" ? "Analysis was cancelled" : "Analysis timed out");
    this.name = "AnalysisStoppedError";
    this.reason = reason;
  }
}
