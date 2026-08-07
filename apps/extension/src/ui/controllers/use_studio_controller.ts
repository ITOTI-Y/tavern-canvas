import { onScopeDispose, shallowRef, type ShallowRef } from "vue";

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
 */
export function use_studio_controller(options: StudioControllerOptions): UseStudioControllerResult {
  const controller = create_studio_controller(options);
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
