/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `UserList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserList_title_key" ON "UserList"("title");
