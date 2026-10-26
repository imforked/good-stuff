/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `UserList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserList_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserList_userId_title_key" ON "UserList"("userId", "title");
