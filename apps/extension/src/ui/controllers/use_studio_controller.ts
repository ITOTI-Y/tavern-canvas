import { markRaw, onScopeDispose, shallowRef, type ShallowRef } from "vue";

import type { StudioState } from "../contracts/view_models.js";
import {
  create_studio_controller,
  type StudioController,
  type StudioControllerOptions,
} from "./studio_controller.js";

export interface UseStudioControllerResult {
  readonly controller: StudioController;
  readonly state: Readonly<ShallowRef<Readonly<StudioState>>>;
}

/**
 * Vue adapter over the framework-agnostic Studio controller: wraps its plain `on_change`
 * pub/sub in a `shallowRef` (the controller always replaces `state` wholesale on every mutation,
 * so shallow reactivity is both correct and avoids deep-proxying the whole view-model tree) and
 * ties `start`/`stop` to the current effect scope.
 *
 * `markRaw` on the controller itself (Stage 06 Task 7 finding): `StudioControllerImpl` uses
 * private class fields (`#capabilities`, `#state`, ...), and Vue's `reactive()` -- which any
 * feature view passing `controller` on as a prop will trigger, directly or via
 * `@vue/test-utils`'s own props-reactivity for `setProps()` -- wraps it in a Proxy whose `this`
 * no longer satisfies the private-field brand check, throwing
 * "Cannot read private member #capabilities from an object whose class did not declare it" the
 * moment any method runs. The controller is never itself reactive state (only `.state` is,
 * via the `shallowRef` below); marking it raw is therefore lossless and fixes every current and
 * future call site that threads `controller` through component props.
 */
export function use_studio_controller(options: StudioControllerOptions): UseStudioControllerResult {
  const controller = markRaw(create_studio_controller(options));
  const state = shallowRef<Readonly<StudioState>>(controller.state);

  const unsubscribe = controller.on_change(() => {
    state.value = controller.state;
  });

  void controller.start();

  onScopeDispose(() => {
    unsubscribe();
    void controller.stop();
  });

  return { controller, state };
}
