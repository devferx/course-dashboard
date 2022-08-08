// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { coursesRouter } from "./courses";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("courses.", coursesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
