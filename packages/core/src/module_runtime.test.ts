import { describe, expect, it } from "vitest";

import { CapabilityRegistry } from "./capability_registry.js";
import { DomainEventBus } from "./domain_event_bus.js";
import {
  ModuleRuntime,
  type ModuleContext,
  type RuntimeModule,
} from "./module_runtime.js";

type StartBehavior = (context: ModuleContext) => void | Promise<void>;
type StopBehavior = () => void | Promise<void>;

class RecordingModule implements RuntimeModule {
  readonly module_id: string;
  readonly requires: readonly string[];
  readonly #on_start: StartBehavior;
  readonly #on_stop: StopBehavior;

  constructor(
    module_id: string,
    requires: readonly string[],
    on_start: StartBehavior,
    on_stop: StopBehavior = () => undefined,
  ) {
    this.module_id = module_id;
    this.requires = requires;
    this.#on_start = on_start;
    this.#on_stop = on_stop;
  }

  async start(context: ModuleContext): Promise<void> {
    await this.#on_start(context);
  }

  async stop(): Promise<void> {
    await this.#on_stop();
  }
}

describe("ModuleRuntime", () => {
  it("starts dependencies in each module's declared order", async () => {
    const lifecycle: string[] = [];
    const leaf = new RecordingModule("leaf", ["right", "left"], () => {
      lifecycle.push("start:leaf");
    });
    const left = new RecordingModule("left", [], () => {
      lifecycle.push("start:left");
    });
    const right = new RecordingModule("right", [], () => {
      lifecycle.push("start:right");
    });
    const runtime = new ModuleRuntime([leaf, left, right]);

    await runtime.start_all();

    expect(lifecycle).toEqual(["start:right", "start:left", "start:leaf"]);
    expect(runtime.state).toBe("started");
  });

  it("reports all missing dependencies and cycles before starting a module", async () => {
    const lifecycle: string[] = [];
    const modules = [
      new RecordingModule("missing.owner", ["absent.first", "absent.second"], () => {
        lifecycle.push("start:missing.owner");
      }),
      new RecordingModule("cycle.a", ["cycle.b"], () => {
        lifecycle.push("start:cycle.a");
      }),
      new RecordingModule("cycle.b", ["cycle.a"], () => {
        lifecycle.push("start:cycle.b");
      }),
    ];
    const runtime = new ModuleRuntime(modules);

    let thrown: unknown;
    try {
      await runtime.start_all();
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(Error);
    const message = (thrown as Error).message;
    expect(message).toContain("missing.owner -> absent.first");
    expect(message).toContain("missing.owner -> absent.second");
    expect(message).toContain("cycle.a -> cycle.b -> cycle.a");
    expect(lifecycle).toEqual([]);
    expect(runtime.state).toBe("failed");
  });

  it("rolls back started modules in reverse and removes every startup capability", async () => {
    const lifecycle: string[] = [];
    const capabilities = new CapabilityRegistry();
    const startup_error = new Error("leaf failed");
    const root = new RecordingModule(
      "root",
      [],
      (context) => {
        lifecycle.push("start:root");
        context.capabilities.register("cap.root", "root", { ready: true });
      },
      () => {
        lifecycle.push("stop:root");
      },
    );
    const middle = new RecordingModule(
      "middle",
      ["root"],
      (context) => {
        lifecycle.push("start:middle");
        context.capabilities.register("cap.middle", "middle", { ready: true });
      },
      () => {
        lifecycle.push("stop:middle");
      },
    );
    const leaf = new RecordingModule("leaf", ["middle"], (context) => {
      lifecycle.push("start:leaf");
      context.capabilities.register("cap.leaf", "leaf", { ready: false });
      throw startup_error;
    });
    const runtime = new ModuleRuntime(
      [leaf, middle, root],
      capabilities,
      new DomainEventBus(),
    );

    await expect(runtime.start_all()).rejects.toBe(startup_error);

    expect(lifecycle).toEqual([
      "start:root",
      "start:middle",
      "start:leaf",
      "stop:middle",
      "stop:root",
    ]);
    expect(capabilities.has("cap.root")).toBe(false);
    expect(capabilities.has("cap.middle")).toBe(false);
    expect(capabilities.has("cap.leaf")).toBe(false);
    expect(runtime.state).toBe("failed");
  });

  it("stops in reverse order, removes owned capabilities, and is idempotent", async () => {
    const lifecycle: string[] = [];
    const capabilities = new CapabilityRegistry();
    const first = new RecordingModule(
      "first",
      [],
      (context) => {
        lifecycle.push("start:first");
        context.capabilities.register("cap.first", "first", 1);
      },
      () => {
        lifecycle.push("stop:first");
      },
    );
    const second = new RecordingModule(
      "second",
      ["first"],
      (context) => {
        lifecycle.push("start:second");
        context.capabilities.register("cap.second", "second", 2);
      },
      () => {
        lifecycle.push("stop:second");
      },
    );
    const runtime = new ModuleRuntime(
      [second, first],
      capabilities,
      new DomainEventBus(),
    );

    await runtime.start_all();
    await runtime.stop_all();
    await runtime.stop_all();

    expect(lifecycle).toEqual([
      "start:first",
      "start:second",
      "stop:second",
      "stop:first",
    ]);
    expect(capabilities.has("cap.first")).toBe(false);
    expect(capabilities.has("cap.second")).toBe(false);
    expect(runtime.state).toBe("stopped");
  });

  it("exposes stable state throughout lifecycle transitions", async () => {
    const states_seen_by_module: string[] = [];
    let runtime: ModuleRuntime;
    const module = new RecordingModule(
      "observer",
      [],
      () => {
        states_seen_by_module.push(runtime.state);
      },
      () => {
        states_seen_by_module.push(runtime.state);
      },
    );
    runtime = new ModuleRuntime([module]);

    expect(runtime.state).toBe("idle");
    await runtime.start_all();
    expect(runtime.state).toBe("started");
    await runtime.stop_all();

    expect(states_seen_by_module).toEqual(["starting", "stopping"]);
    expect(runtime.state).toBe("stopped");
  });
});
