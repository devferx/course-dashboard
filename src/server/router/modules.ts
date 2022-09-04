import { z } from "zod";
import { createRouter } from "./context";

export const modulesRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      const modules = await ctx.prisma.module.findMany({
        include: {
          course: true,
        },
      });
      const count = await ctx.prisma.module.count();

      return {
        modules,
        count,
      };
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      slug: z.string(),
      order: z.number(),
      courseId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.module.create({
        data: {
          ...input,
          lessons: {
            create: [],
          },
        },
      });
    },
  })
  .mutation("deleteMany", {
    input: z.array(z.string()),
    async resolve({ ctx, input }) {
      return await ctx.prisma.module.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
    },
  });
