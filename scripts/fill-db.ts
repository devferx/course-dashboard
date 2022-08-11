import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import { prisma } from "../src/server/db/client";

const doBackFill = async () => {
  const users = new Array(5).fill(1).map(() => ({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: "123456",
    profilePic: faker.image.avatar(),
    role: UserRole.TEACHER,
  }));

  await prisma.user.createMany({
    data: [...users],
  });
};

doBackFill();
