import { describe, expect, it } from "vitest";

import { CapabilityRegistry } from "./capability_registry.js";
import { DomainEventBus } from "./domain_event_bus.js";
import { ModuleRuntime, type ModuleContext, type RuntimeModule } from "./module_runtime.js";

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
    const runtime = new ModuleRuntime([leaf, middle, root], capabilities, new DomainEventBus());

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
    const runtime = new ModuleRuntime([second, first], capabilities, new DomainEventBus());

    await runtime.start_all();
    await runtime.stop_all();
    await runtime.stop_all();

    expect(lifecycle).toEqual(["start:first", "start:second", "stop:second", "stop:first"]);
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

  it("continues rollback after a middle module fails to stop", async () => {
    const lifecycle: string[] = [];
    const capabilities = new CapabilityRegistry();
    const startup_error = new Error("leaf start failed");
    const rollback_error = new Error("middle stop failed");
    const root = new RecordingModule(
      "root",
      [],
      (context) => {
        lifecycle.push("start:root");
        context.capabilities.register("cap.root", "root", 1);
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
        context.capabilities.register("cap.middle", "middle", 2);
      },
      () => {
        lifecycle.push("stop:middle");
        throw rollback_error;
      },
    );
    const upper = new RecordingModule(
      "upper",
      ["middle"],
      (context) => {
        lifecycle.push("start:upper");
        context.capabilities.register("cap.upper", "upper", 3);
      },
      () => {
        lifecycle.push("stop:upper");
      },
    );
    const leaf = new RecordingModule("leaf", ["upper"], (context) => {
      lifecycle.push("start:leaf");
      context.capabilities.register("cap.leaf", "leaf", 4);
      throw startup_error;
    });
    const runtime = new ModuleRuntime(
      [leaf, upper, middle, root],
      capabilities,
      new DomainEventBus(),
    );

    let thrown: unknown;
    try {
      await runtime.start_all();
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(AggregateError);
    expect((thrown as AggregateError).errors).toEqual([startup_error, rollback_error]);
    expect((thrown as AggregateError).cause).toBe(startup_error);
    expect(lifecycle).toEqual([
      "start:root",
      "start:middle",
      "start:upper",
      "start:leaf",
      "stop:upper",
      "stop:middle",
      "stop:root",
    ]);
    expect(capabilities.has("cap.root")).toBe(false);
    expect(capabilities.has("cap.middle")).toBe(false);
    expect(capabilities.has("cap.upper")).toBe(false);
    expect(capabilities.has("cap.leaf")).toBe(false);
    expect(runtime.state).toBe("failed");
  });

  it("continues normal shutdown after a middle module fails to stop", async () => {
    const lifecycle: string[] = [];
    const capabilities = new CapabilityRegistry();
    const stop_error = new Error("middle stop failed");
    const root = new RecordingModule(
      "root",
      [],
      (context) => {
        lifecycle.push("start:root");
        context.capabilities.register("cap.root", "root", 1);
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
        context.capabilities.register("cap.middle", "middle", 2);
      },
      () => {
        lifecycle.push("stop:middle");
        throw stop_error;
      },
    );
    const upper = new RecordingModule(
      "upper",
      ["middle"],
      (context) => {
        lifecycle.push("start:upper");
        context.capabilities.register("cap.upper", "upper", 3);
      },
      () => {
        lifecycle.push("stop:upper");
      },
    );
    const runtime = new ModuleRuntime([upper, middle, root], capabilities, new DomainEventBus());

    await runtime.start_all();
    let thrown: unknown;
    try {
      await runtime.stop_all();
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(AggregateError);
    expect((thrown as AggregateError).errors).toEqual([stop_error]);
    expect(lifecycle).toEqual([
      "start:root",
      "start:middle",
      "start:upper",
      "stop:upper",
      "stop:middle",
      "stop:root",
    ]);
    expect(capabilities.has("cap.root")).toBe(false);
    expect(capabilities.has("cap.middle")).toBe(false);
    expect(capabilities.has("cap.upper")).toBe(false);
    expect(runtime.state).toBe("failed");
    await expect(runtime.stop_all()).resolves.toBeUndefined();
  });

  it("rejects duplicate module identifiers before runtime construction", () => {
    const first = new RecordingModule("duplicate", [], () => undefined);
    const second = new RecordingModule("duplicate", [], () => undefined);

    expect(() => new ModuleRuntime([first, second])).toThrowError(/duplicate/u);
  });

  it("does not start already-started modules a second time", async () => {
    const lifecycle: string[] = [];
    const module = new RecordingModule("single", [], () => {
      lifecycle.push("start:single");
    });
    const runtime = new ModuleRuntime([module]);

    await runtime.start_all();
    await runtime.start_all();

    expect(lifecycle).toEqual(["start:single"]);
    expect(runtime.state).toBe("started");
  });

  it("keeps failed and stopped runtimes terminal across repeated calls", async () => {
    const startup_error = new Error("cannot start");
    const failed_runtime = new ModuleRuntime([
      new RecordingModule("broken", [], () => {
        throw startup_error;
      }),
    ]);

    await expect(failed_runtime.start_all()).rejects.toBe(startup_error);
    await expect(failed_runtime.start_all()).rejects.toThrowError(/failed/u);
    await expect(failed_runtime.stop_all()).resolves.toBeUndefined();
    await expect(failed_runtime.stop_all()).resolves.toBeUndefined();
    expect(failed_runtime.state).toBe("failed");

    const stopped_runtime = new ModuleRuntime([]);
    await stopped_runtime.stop_all();
    await stopped_runtime.stop_all();
    expect(stopped_runtime.state).toBe("stopped");
    await expect(stopped_runtime.start_all()).rejects.toThrowError(/stopped/u);
  });

  it("rejects lifecycle reentry while start and stop transitions are pending", async () => {
    const { promise: start_gate, resolve: release_start } = Promise.withResolvers<void>();
    const starting_runtime = new ModuleRuntime([
      new RecordingModule("slow-start", [], async () => {
        await start_gate;
      }),
    ]);

    const starting = starting_runtime.start_all();
    expect(starting_runtime.state).toBe("starting");
    await expect(starting_runtime.start_all()).rejects.toThrowError(/starting/u);
    await expect(starting_runtime.stop_all()).rejects.toThrowError(/starting/u);
    release_start();
    await starting;

    const { promise: stop_gate, resolve: release_stop } = Promise.withResolvers<void>();
    const stopping_runtime = new ModuleRuntime([
      new RecordingModule(
        "slow-stop",
        [],
        () => undefined,
        async () => {
          await stop_gate;
        },
      ),
    ]);
    await stopping_runtime.start_all();

    const stopping = stopping_runtime.stop_all();
    expect(stopping_runtime.state).toBe("stopping");
    await expect(stopping_runtime.start_all()).rejects.toThrowError(/stopping/u);
    await expect(stopping_runtime.stop_all()).rejects.toThrowError(/stopping/u);
    release_stop();
    await stopping;
    expect(stopping_runtime.state).toBe("stopped");

    await starting_runtime.stop_all();
  });

  it("awaits dependency registration before sharing its capability", async () => {
    const lifecycle: string[] = [];
    const { promise: dependency_gate, resolve: release_dependency } = Promise.withResolvers<void>();
    const dependency = new RecordingModule("dependency", [], async (context) => {
      lifecycle.push("dependency:starting");
      await dependency_gate;
      context.capabilities.register("shared.value", "dependency", {
        value: 42,
      });
      lifecycle.push("dependency:ready");
    });
    const dependent = new RecordingModule("dependent", ["dependency"], (context) => {
      lifecycle.push(
        `dependent:${context.capabilities.require<{ value: number }>("shared.value").value}`,
      );
    });
    const runtime = new ModuleRuntime([dependent, dependency]);

    const starting = runtime.start_all();
    await Promise.resolve();
    expect(lifecycle).toEqual(["dependency:starting"]);
    release_dependency();
    await starting;

    expect(lifecycle).toEqual(["dependency:starting", "dependency:ready", "dependent:42"]);
    await runtime.stop_all();
  });
});
