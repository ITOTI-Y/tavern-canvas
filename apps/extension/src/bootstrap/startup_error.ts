import { MINIMUM_TAVERN_HELPER_VERSION, type BootstrapProbeResult } from "../host/index.js";

export const JS_SLASH_RUNNER_UPDATE_URL = "https://github.com/N0VI028/JS-Slash-Runner";

export type StartupStatus =
  | {
      readonly state: "ready";
      readonly title: string;
      readonly message: string;
    }
  | {
      readonly state: "blocked";
      readonly title: string;
      readonly message: string;
      readonly update_url: string;
    }
  | {
      readonly state: "failed";
      readonly title: string;
      readonly message: string;
    };

export function status_from_probe(result: BootstrapProbeResult): StartupStatus {
  if (result.ready) {
    return {
      state: "ready",
      title: "TavernCanvas ready",
      message: `Connected through JS Slash Runner ${result.helper_version}.`,
    };
  }

  const requirement = `JS Slash Runner ${MINIMUM_TAVERN_HELPER_VERSION} or newer is required.`;
  switch (result.error_code) {
    case "tavern_helper_missing":
      return {
        state: "blocked",
        title: "JS Slash Runner is required",
        message: requirement,
        update_url: JS_SLASH_RUNNER_UPDATE_URL,
      };
    case "helper_version_invalid":
      return {
        state: "blocked",
        title: "JS Slash Runner version is invalid",
        message: `TavernCanvas could not verify the installed version. ${requirement}`,
        update_url: JS_SLASH_RUNNER_UPDATE_URL,
      };
    case "helper_version_unsupported":
      return {
        state: "blocked",
        title: "Update JS Slash Runner",
        message: requirement,
        update_url: JS_SLASH_RUNNER_UPDATE_URL,
      };
    case "helper_api_incomplete":
      return {
        state: "blocked",
        title: "JS Slash Runner API is incomplete",
        message: `Required public capabilities are unavailable. ${requirement}`,
        update_url: JS_SLASH_RUNNER_UPDATE_URL,
      };
  }
}

export function startup_failed_status(): StartupStatus {
  return {
    state: "failed",
    title: "TavernCanvas could not start",
    message:
      "Runtime initialization failed. Reload SillyTavern after checking extension diagnostics.",
  };
}
