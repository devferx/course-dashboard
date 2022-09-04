import { z } from "zod";
import { createRouter } from "./context";

export const lessonsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      const lessons = await ctx.prisma.lesson.findMany({
        include: {
          module: {
            include: {
              course: true,
            },
          },
        },
      });
      const count = await ctx.prisma.lesson.count();

      return { lessons, count };
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      slug: z.string(),
      moduleId: z.string(),
      videoLink: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const lesson = await ctx.prisma.lesson.create({
        data: {
          ...input,
        },
      });

      return lesson;
    },
  })
  .mutation("deleteMany", {
    input: z.array(z.string()),
    async resolve({ ctx, input }) {
      const lessons = await ctx.prisma.lesson.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });

      return lessons;
    },
  });
