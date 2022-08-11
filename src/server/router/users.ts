import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import { createRouter } from "./context";

export const usersRouter = createRouter()
  .query("getTeachers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany({
        where: {
          role: "TEACHER",
        },
        include: {
          courses: true,
        },
      });
    },
  })
  .mutation("generateTeachers", {
    async resolve({ ctx }) {
      const users = new Array(5).fill(1).map(() => ({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: "123456",
        profilePic: faker.image.avatar(),
        role: UserRole.TEACHER,
      }));

      await ctx.prisma.user.createMany({
        data: [...users],
      });

      return users;
    },
  })
  .mutation("deleteAllTeachers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.deleteMany({
        where: {
          role: "TEACHER",
          courses: {
            none: {},
          },
        },
      });
    },
  });
