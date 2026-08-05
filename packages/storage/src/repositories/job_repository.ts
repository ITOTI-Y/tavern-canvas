import type { IDBPDatabase } from "idb";

import {
  type DBSchema,
  type GenerationJob,
  GenerationJobSchema,
} from "../database_schema.js";
import { IndexedDbRepository } from "../repository.js";

export class GenerationJobRepository extends IndexedDbRepository<"generation_jobs", GenerationJob> {
  constructor(database: IDBPDatabase<DBSchema>) {
    super(database, "generation_jobs", GenerationJobSchema);
  }
}

export function create_generation_job_repository(
  database: IDBPDatabase<DBSchema>,
): GenerationJobRepository {
  return new GenerationJobRepository(database);
}
