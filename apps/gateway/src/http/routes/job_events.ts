import { Router, type Response } from "express";
import { JobIdSchema, type GatewayJobEvent } from "@tavern-canvas/contracts";

import { GatewayHttpError } from "../error_handler.js";
import type { JobService } from "../../jobs/job_service.js";

export interface JobEventsRouteOptions {
  readonly service: JobService;
  readonly controller?: SseConnectionController;
}

export class SseConnectionController {
  readonly #connections = new Set<() => void>();

  get active_connections(): number {
    return this.#connections.size;
  }

  register(response: Response, cleanup: () => void): () => void {
    let closed = false;
    const close_connection = (end_response: boolean): void => {
      if (closed) {
        return;
      }
      closed = true;
      this.#connections.delete(unregister);
      response.off("close", on_close);
      cleanup();
      if (end_response && !response.writableEnded) {
        response.end();
      }
    };
    const on_close = (): void => {
      close_connection(false);
    };
    const unregister = (): void => {
      close_connection(true);
    };
    this.#connections.add(unregister);
    response.once("close", on_close);
    return unregister;
  }

  close_all(): void {
    for (const unregister of [...this.#connections]) {
      unregister();
    }
  }
}

export function create_job_events_router(options: JobEventsRouteOptions): Router {
  const router = Router();
  const controller = options.controller ?? new SseConnectionController();

  router.get("/jobs/:job_id/events", (request, response) => {
    const job_id = JobIdSchema.parse(request.params.job_id);
    if (options.service.get_stored_job(job_id) === undefined) {
      throw new GatewayHttpError(404, "job_not_found");
    }
    const after_sequence = parse_sequence(
      request.header("last-event-id") ?? query_value(request.query.after),
    );
    response.status(200);
    response.setHeader("content-type", "text/event-stream; charset=utf-8");
    response.setHeader("cache-control", "no-cache, no-transform");
    response.setHeader("connection", "keep-alive");
    response.setHeader("x-accel-buffering", "no");
    response.flushHeaders();

    let last_sequence = after_sequence;
    const send = (event: GatewayJobEvent): void => {
      if (event.sequence <= last_sequence || response.writableEnded) {
        return;
      }
      last_sequence = event.sequence;
      response.write(`id: ${String(event.sequence)}\n`);
      response.write("event: job\n");
      response.write(`data: ${JSON.stringify(event)}\n\n`);
    };
    const unsubscribe = options.service.subscribe(job_id, (stored_event) => {
      send(options.service.to_public_event(stored_event));
    });
    const heartbeat = setInterval(() => {
      if (!response.writableEnded) {
        response.write(": keep-alive\n\n");
      }
    }, 15_000);
    controller.register(response, () => {
      clearInterval(heartbeat);
      unsubscribe();
    });
    for (const event of options.service.list_events(job_id, after_sequence)) {
      send(event);
    }
  });

  return router;
}

function parse_sequence(value: string | undefined): number {
  if (value === undefined || value.trim() === "") {
    return 0;
  }
  if (!/^\d+$/u.test(value)) {
    throw new GatewayHttpError(400, "invalid_request");
  }
  const sequence = Number(value);
  if (!Number.isSafeInteger(sequence) || sequence < 0) {
    throw new GatewayHttpError(400, "invalid_request");
  }
  return sequence;
}

function query_value(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}
