export type SerializableValue =
  | null
  | boolean
  | number
  | string
  | readonly SerializableValue[]
  | { readonly [key: string]: SerializableValue };

export interface DomainEventEnvelope<
  TEventType extends string = string,
  TPayload extends SerializableValue = SerializableValue,
> {
  readonly event_id: string;
  readonly event_type: TEventType;
  readonly occurred_at: string;
  readonly payload: TPayload;
}

export type DomainEventHandler<TEvent extends DomainEventEnvelope> = (
  event: TEvent,
) => void | Promise<void>;

export interface SubscriberFailureDiagnostic {
  readonly event_id: string;
  readonly event_type: string;
  readonly subscriber_index: number;
  readonly error: unknown;
}

type SerializableEventMap<TEventMap> = {
  readonly [TEventType in keyof TEventMap]: SerializableValue;
};

type EventType<TEventMap> = Extract<keyof TEventMap, string>;
type StoredHandler = (event: unknown) => void | Promise<void>;

export class DomainEventBus<
  TEventMap extends SerializableEventMap<TEventMap> = Record<
    string,
    SerializableValue
  >,
> {
  readonly #handlers = new Map<EventType<TEventMap>, Set<StoredHandler>>();

  subscribe<TEventType extends EventType<TEventMap>>(
    event_type: TEventType,
    handler: DomainEventHandler<
      DomainEventEnvelope<TEventType, TEventMap[TEventType]>
    >,
  ): () => void {
    let handlers = this.#handlers.get(event_type);
    if (handlers === undefined) {
      handlers = new Set();
      this.#handlers.set(event_type, handlers);
    }

    const stored_handler: StoredHandler = (event) =>
      handler(
        event as DomainEventEnvelope<TEventType, TEventMap[TEventType]>,
      );
    handlers.add(stored_handler);

    return () => {
      handlers.delete(stored_handler);
      if (handlers.size === 0 && this.#handlers.get(event_type) === handlers) {
        this.#handlers.delete(event_type);
      }
    };
  }

  async publish<TEventType extends EventType<TEventMap>>(
    event: DomainEventEnvelope<TEventType, TEventMap[TEventType]>,
  ): Promise<readonly SubscriberFailureDiagnostic[]> {
    const handlers = this.#handlers.get(event.event_type);
    if (handlers === undefined) {
      return [];
    }

    const snapshot = [...handlers];
    const diagnostics: SubscriberFailureDiagnostic[] = [];
    for (const [subscriber_index, handler] of snapshot.entries()) {
      try {
        await handler(event);
      } catch (error) {
        diagnostics.push({
          event_id: event.event_id,
          event_type: event.event_type,
          subscriber_index,
          error,
        });
      }
    }

    return diagnostics;
  }
}
