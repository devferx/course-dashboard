// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { coursesRouter } from "./courses";
import { usersRouter } from "./users";
import { modulesRouter } from "./modules";
import { lessonsRouter } from "./lessons";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("courses.", coursesRouter)
  .merge("users.", usersRouter)
  .merge("modules.", modulesRouter)
  .merge("lessons.", lessonsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
