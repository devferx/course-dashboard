import { createRouter } from "./context";

export const coursesRouter = createRouter().query("getAll", {
  async resolve({ ctx }) {
    return await ctx.prisma.course.findMany();
  },
});
