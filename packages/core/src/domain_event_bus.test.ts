import { describe, expect, it } from "vitest";

import { DomainEventBus } from "./domain_event_bus.js";

type TestEvents = {
  "counter.incremented": {
    readonly amount: number;
  };
  "counter.reset": null;
};

const increment_event = (event_id: string, amount: number) => ({
  event_id,
  event_type: "counter.incremented" as const,
  occurred_at: "2026-08-05T09:30:00.000Z",
  payload: { amount },
});

describe("DomainEventBus", () => {
  it("publishes from a handler snapshot when subscriptions change mid-event", async () => {
    const bus = new DomainEventBus<TestEvents>();
    const observed: string[] = [];
    let changed_subscriptions = false;

    let unsubscribe_second: () => void;
    bus.subscribe("counter.incremented", async (event) => {
      observed.push(`first:${event.payload.amount}`);
      if (!changed_subscriptions) {
        changed_subscriptions = true;
        unsubscribe_second();
        bus.subscribe("counter.incremented", async (later_event) => {
          observed.push(`third:${later_event.payload.amount}`);
        });
      }
    });
    unsubscribe_second = bus.subscribe(
      "counter.incremented",
      async (event) => {
        observed.push(`second:${event.payload.amount}`);
      },
    );

    expect(await bus.publish(increment_event("event-1", 1))).toEqual([]);
    expect(await bus.publish(increment_event("event-2", 2))).toEqual([]);
    expect(observed).toEqual(["first:1", "second:1", "first:2", "third:2"]);
  });

  it("continues after a subscriber failure and returns structured diagnostics", async () => {
    const bus = new DomainEventBus<TestEvents>();
    const subscriber_error = new Error("subscriber unavailable");
    const observed: number[] = [];

    bus.subscribe("counter.incremented", async () => {
      throw subscriber_error;
    });
    bus.subscribe("counter.incremented", async (event) => {
      observed.push(event.payload.amount);
    });

    const diagnostics = await bus.publish(increment_event("event-7", 7));

    expect(observed).toEqual([7]);
    expect(diagnostics).toEqual([
      {
        event_id: "event-7",
        event_type: "counter.incremented",
        subscriber_index: 0,
        error: subscriber_error,
      },
    ]);
  });

  it("delivers an event only to subscribers of its declared type", async () => {
    const bus = new DomainEventBus<TestEvents>();
    const observed: string[] = [];

    bus.subscribe("counter.reset", async () => {
      observed.push("reset");
    });
    bus.subscribe("counter.incremented", async () => {
      observed.push("incremented");
    });

    await bus.publish({
      event_id: "event-reset",
      event_type: "counter.reset",
      occurred_at: "2026-08-05T09:31:00.000Z",
      payload: null,
    });

    expect(observed).toEqual(["reset"]);
  });
});
