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

/** Vue adapter over the Studio controller. `markRaw` keeps Vue from proxying it: its private class fields fail brand checks through a Proxy. */
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
