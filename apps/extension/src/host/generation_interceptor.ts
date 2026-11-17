/**
 * SillyTavern's `generate_interceptor` for Inkwell (named in the manifest): it runs, awaited, once
 * the user's message is in the chat and before the prompt is built, so work done here reaches
 * the prompt through a macro.
 */
type InterceptorWork = (generation_type: string) => Promise<void>;

let work: InterceptorWork | null = null;

export function set_generation_interceptor(next: InterceptorWork | null): void {
  work = next;
}

export async function inkwell_generate_interceptor(
  _chat: unknown,
  _context_size: unknown,
  _abort: unknown,
  generation_type?: string,
): Promise<void> {
  await work?.(generation_type ?? "normal");
}
