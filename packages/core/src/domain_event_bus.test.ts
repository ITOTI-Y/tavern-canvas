import { describe, expect, it } from "vitest";

import { DomainEventBus } from "./domain_event_bus.js";

type TestEvents = {
  "counter.incremented": {
    readonly amount: number;
  };
  "counter.reset": null;
};

// @ts-expect-error Domain event payloads cannot contain undefined.
new DomainEventBus<{ invalid: undefined }>();
// @ts-expect-error Domain event payloads cannot contain functions.
new DomainEventBus<{ invalid: () => void }>();
// @ts-expect-error Domain event payloads cannot contain bigint values.
new DomainEventBus<{ invalid: bigint }>();
// @ts-expect-error Nested domain event payloads must remain serializable.
new DomainEventBus<{ invalid: { nested: { callback: () => void } } }>();

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
    unsubscribe_second = bus.subscribe("counter.incremented", async (event) => {
      observed.push(`second:${event.payload.amount}`);
    });

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

  it("does not let an old disposer remove a replacement subscription", async () => {
    const bus = new DomainEventBus<TestEvents>();
    const observed: string[] = [];
    const unsubscribe_first = bus.subscribe("counter.incremented", async () => {
      observed.push("first");
    });

    unsubscribe_first();
    bus.subscribe("counter.incremented", async () => {
      observed.push("replacement");
    });
    unsubscribe_first();

    expect(await bus.publish(increment_event("event-replacement", 1))).toEqual([]);
    expect(observed).toEqual(["replacement"]);
  });

  it("keeps a replacement added by a self-unsubscribing publisher handler", async () => {
    const bus = new DomainEventBus<TestEvents>();
    const observed: string[] = [];
    let unsubscribe_first: () => void;

    unsubscribe_first = bus.subscribe("counter.incremented", async (event) => {
      observed.push(`first:${event.payload.amount}`);
      unsubscribe_first();
      bus.subscribe("counter.incremented", async (later_event) => {
        observed.push(`replacement:${later_event.payload.amount}`);
      });
    });

    await bus.publish(increment_event("event-first", 1));
    unsubscribe_first();
    await bus.publish(increment_event("event-later", 2));

    expect(observed).toEqual(["first:1", "replacement:2"]);
  });

  it("preserves subscriber and diagnostic order across interleaved failures", async () => {
    const bus = new DomainEventBus<TestEvents>();
    const first_error = new Error("first failure");
    const second_error = new Error("second failure");
    const observed: string[] = [];

    bus.subscribe("counter.incremented", async () => {
      observed.push("success:0");
    });
    bus.subscribe("counter.incremented", async () => {
      observed.push("failure:1");
      throw first_error;
    });
    bus.subscribe("counter.incremented", async () => {
      observed.push("success:2");
    });
    bus.subscribe("counter.incremented", async () => {
      observed.push("failure:3");
      throw second_error;
    });
    bus.subscribe("counter.incremented", async () => {
      observed.push("success:4");
    });

    const diagnostics = await bus.publish(increment_event("event-mixed", 4));

    expect(observed).toEqual(["success:0", "failure:1", "success:2", "failure:3", "success:4"]);
    expect(diagnostics).toEqual([
      {
        event_id: "event-mixed",
        event_type: "counter.incremented",
        subscriber_index: 1,
        error: first_error,
      },
      {
        event_id: "event-mixed",
        event_type: "counter.incremented",
        subscriber_index: 3,
        error: second_error,
      },
    ]);
  });

  it("returns no diagnostics when an event has no subscribers", async () => {
    const bus = new DomainEventBus<TestEvents>();

    await expect(
      bus.publish({
        event_id: "event-unhandled",
        event_type: "counter.reset",
        occurred_at: "2026-08-05T09:32:00.000Z",
        payload: null,
      }),
    ).resolves.toEqual([]);
  });
});
