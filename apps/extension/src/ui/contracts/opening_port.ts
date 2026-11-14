import type { InjectionKey } from "vue";

import type { OpeningHost } from "../../modules/opening/opening_host.js";

/** Which backend writes the opening: the analysis settings' connection, the chat's, or a proxy preset. */
export type OpeningConnection =
  | { readonly kind: "analysis" }
  | { readonly kind: "current" }
  | { readonly kind: "proxy_preset"; readonly proxy_preset: string };

export interface OpeningRequestOptions {
  readonly connection: OpeningConnection;
  /** A chat completion preset name; `in_use` is the one currently loaded. */
  readonly preset_name: string;
  /** Books whose entries this text activates are sent as world info; empty sends none. */
  readonly worldbooks: readonly string[];
  readonly text: string;
}

/** One request answered with JSON that matches `json_schema` and that `parse` validates. */
export interface OpeningStructuredRequest<T> {
  readonly user_input: string;
  readonly json_schema: {
    readonly name: string;
    readonly value: Readonly<Record<string, unknown>>;
  };
  readonly parse: (raw: string) => T;
}

/** What the opening page needs from the host and the analysis model. */
export interface OpeningPort {
  request<T>(request: OpeningStructuredRequest<T>, options: OpeningRequestOptions): Promise<T>;
  /** Rejects when JS-Slash-Runner lacks the world book or chat message methods. */
  host(): Promise<OpeningHost>;
}

/** `null` without a chat host. */
export const OPENING_KEY: InjectionKey<OpeningPort | null> = Symbol("tavern-canvas-opening");
