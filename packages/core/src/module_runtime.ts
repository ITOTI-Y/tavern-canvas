import { CapabilityRegistry } from "./capability_registry.js";
import { DomainEventBus } from "./domain_event_bus.js";

export interface ModuleContext {
  readonly capabilities: CapabilityRegistry;
  readonly events: DomainEventBus;
}

export interface RuntimeModule {
  readonly module_id: string;
  readonly requires: readonly string[];
  start(context: ModuleContext): Promise<void>;
  stop(): Promise<void>;
}

export type RuntimeState =
  | "idle"
  | "starting"
  | "started"
  | "stopping"
  | "stopped"
  | "failed";

type VisitState = "visiting" | "visited";

export class ModuleRuntime {
  readonly #modules_by_id = new Map<string, RuntimeModule>();
  readonly #context: ModuleContext;
  readonly #started_modules: RuntimeModule[] = [];
  #state: RuntimeState = "idle";

  constructor(
    modules: readonly RuntimeModule[],
    capabilities = new CapabilityRegistry(),
    events = new DomainEventBus(),
  ) {
    for (const module of modules) {
      if (this.#modules_by_id.has(module.module_id)) {
        throw new Error(`Module "${module.module_id}" is registered more than once`);
      }
      this.#modules_by_id.set(module.module_id, module);
    }
    this.#context = { capabilities, events };
  }

  get state(): RuntimeState {
    return this.#state;
  }

  async start_all(): Promise<void> {
    if (this.#state === "started") {
      return;
    }
    if (this.#state !== "idle") {
      throw new Error(`Cannot start modules while runtime state is "${this.#state}"`);
    }

    this.#state = "starting";
    let starting_module: RuntimeModule | undefined;
    try {
      const startup_order = this.#build_startup_order();
      for (const module of startup_order) {
        starting_module = module;
        await module.start(this.#context);
        this.#started_modules.push(module);
        starting_module = undefined;
      }
      this.#state = "started";
    } catch (error) {
      if (starting_module !== undefined) {
        this.#context.capabilities.remove_by_owner(starting_module.module_id);
      }
      const rollback_failures = await this.#stop_started_modules();
      this.#state = "failed";
      if (rollback_failures.length > 0) {
        throw new AggregateError(
          [error, ...rollback_failures],
          "Module startup and rollback failed",
          { cause: error },
        );
      }
      throw error;
    }
  }

  async stop_all(): Promise<void> {
    if (this.#state === "stopped") {
      return;
    }
    if (this.#state === "idle") {
      this.#state = "stopped";
      return;
    }
    if (this.#state === "failed" && this.#started_modules.length === 0) {
      return;
    }
    if (this.#state !== "started" && this.#state !== "failed") {
      throw new Error(`Cannot stop modules while runtime state is "${this.#state}"`);
    }

    const was_failed = this.#state === "failed";
    this.#state = "stopping";
    const stop_failures = await this.#stop_started_modules();
    if (was_failed || stop_failures.length > 0) {
      this.#state = "failed";
    } else {
      this.#state = "stopped";
    }

    if (stop_failures.length > 0) {
      throw new AggregateError(stop_failures, "One or more modules failed to stop");
    }
  }

  #build_startup_order(): RuntimeModule[] {
    const missing_dependencies: string[] = [];
    for (const module of this.#modules_by_id.values()) {
      for (const required_module_id of module.requires) {
        if (!this.#modules_by_id.has(required_module_id)) {
          missing_dependencies.push(
            `${module.module_id} -> ${required_module_id}`,
          );
        }
      }
    }

    const visit_states = new Map<string, VisitState>();
    const stack: string[] = [];
    const cycles: string[] = [];
    const startup_order: RuntimeModule[] = [];

    const visit = (module: RuntimeModule): void => {
      const state = visit_states.get(module.module_id);
      if (state === "visited") {
        return;
      }
      if (state === "visiting") {
        const cycle_start = stack.indexOf(module.module_id);
        cycles.push(
          [...stack.slice(cycle_start), module.module_id].join(" -> "),
        );
        return;
      }

      visit_states.set(module.module_id, "visiting");
      stack.push(module.module_id);
      for (const required_module_id of module.requires) {
        const dependency = this.#modules_by_id.get(required_module_id);
        if (dependency !== undefined) {
          visit(dependency);
        }
      }
      stack.pop();
      visit_states.set(module.module_id, "visited");
      startup_order.push(module);
    };

    for (const module of this.#modules_by_id.values()) {
      visit(module);
    }

    if (missing_dependencies.length > 0 || cycles.length > 0) {
      const details: string[] = [];
      if (missing_dependencies.length > 0) {
        details.push(`Missing dependencies: ${missing_dependencies.join(", ")}`);
      }
      if (cycles.length > 0) {
        details.push(`Dependency cycles: ${cycles.join(", ")}`);
      }
      throw new Error(`Module preflight failed. ${details.join(". ")}`);
    }

    return startup_order;
  }

  async #stop_started_modules(): Promise<unknown[]> {
    const failures: unknown[] = [];
    for (let index = this.#started_modules.length - 1; index >= 0; index -= 1) {
      const module = this.#started_modules[index];
      if (module === undefined) {
        continue;
      }
      try {
        await module.stop();
      } catch (error) {
        failures.push(error);
      } finally {
        this.#context.capabilities.remove_by_owner(module.module_id);
      }
    }
    this.#started_modules.length = 0;
    return failures;
  }
}
