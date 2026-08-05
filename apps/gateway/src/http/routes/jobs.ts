import { Router } from "express";
import { JobIdSchema } from "@tavern-canvas/contracts";

import { GatewayHttpError } from "../error_handler.js";
import { JobService } from "../../jobs/job_service.js";
import { JobWorker } from "../../jobs/job_worker.js";

export interface JobsRouteOptions {
  readonly service: JobService;
  readonly worker: JobWorker;
}

export function create_jobs_router(options: JobsRouteOptions): Router {
  const router = Router();

  router.post("/jobs", (request, response) => {
    const result = options.service.create_job(
      request.body as {
        readonly protocol_version: unknown;
        readonly request: unknown;
      },
    );
    if (result.created) {
      options.worker.enqueue(result.job.job_id);
    }
    response.status(202).setHeader("location", `/v1/jobs/${result.job.job_id}`).json(result.job);
  });

  router.get("/jobs/:job_id", (request, response) => {
    const job_id = parse_job_id(request.params.job_id);
    const job = options.service.get_job(job_id);
    if (job === undefined) {
      throw new GatewayHttpError(404, "job_not_found");
    }
    response.json(job);
  });

  router.delete("/jobs/:job_id", (request, response) => {
    const job_id = parse_job_id(request.params.job_id);
    const exists = options.service.cancel_job(job_id);
    if (exists) {
      options.worker.cancel_active(job_id);
    }
    response.status(204).end();
  });

  return router;
}

function parse_job_id(value: string): string {
  return JobIdSchema.parse(value);
}
