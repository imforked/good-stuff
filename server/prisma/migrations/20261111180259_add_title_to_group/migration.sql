/*
  Warnings:

  - A unique constraint covering the columns `[groupId,title]` on the table `GroupList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `GroupList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GroupList" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GroupList_groupId_title_key" ON "GroupList"("groupId", "title");
