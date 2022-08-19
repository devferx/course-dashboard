/*
  Warnings:

  - A unique constraint covering the columns `[courseId,slug]` on the table `Module` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Module_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Module_courseId_slug_key" ON "Module"("courseId", "slug");
