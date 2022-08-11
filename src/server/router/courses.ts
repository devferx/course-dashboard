import { createRouter } from "./context";
import { z } from "zod";
import { CourseStatus } from "@prisma/client";

export const coursesRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.course.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      slug: z.string(),
      status: z.enum([CourseStatus.DRAFT, CourseStatus.PUBLISHED]),
      teacher: z.string(),
      duration: z.number(),
      price: z.number(),
      currency: z.string(),
      imageUrl: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.course.create({
        data: {
          ...input,
          teacher: {
            connect: {
              id: input.teacher,
            },
          },
        },
      });
    },
  })
  .query("deleteAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.course.deleteMany({});
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.course.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
