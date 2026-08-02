/*
  Warnings:

  - You are about to drop the `AlsoRecommend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `heroImgUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longDescription` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "POST_TYPE" AS ENUM ('RESTAURANT', 'COFFEE_SHOP', 'BAKERY', 'BAR', 'BREWERY', 'WINERY', 'FOOD_CART', 'DESSERT', 'HIKE', 'PARK', 'GARDEN', 'VIEWPOINT', 'BEACH', 'WATERFALL', 'CAMPING', 'GALLERY', 'MUSEUM', 'MURAL', 'BOOKSTORE', 'LIVE_MUSIC', 'CONCERT', 'COMEDY', 'THEATER', 'MOVIE', 'FESTIVAL', 'EVENT', 'ARCADE', 'SHOP', 'VINTAGE_STORE', 'RECORD_STORE', 'FARMERS_MARKET', 'BIKE_RIDE', 'RUNNING_ROUTE', 'CLIMBING_GYM', 'GYM', 'YOGA', 'SPA', 'ALBUM', 'SONG', 'PLAYLIST', 'PODCAST', 'BOOK', 'TV_SHOW', 'VIDEO_GAME', 'BOARD_GAME', 'AIRBNB', 'HOTEL', 'DAY_TRIP', 'ROAD_TRIP', 'DOG_FRIENDLY', 'FAMILY_ACTIVITY', 'DATE_IDEA', 'HIDDEN_GEM');

-- CreateEnum
CREATE TYPE "POST_LOCATION" AS ENUM ('NORTH', 'NORTHEAST', 'NORTHWEST', 'SOUTH', 'SOUTHEAST', 'SOUTHWEST', 'DOWNTOWN', 'PEARL_DISTRICT', 'OLD_TOWN_CHINATOWN', 'SOUTH_WATERFRONT', 'ST_JOHNS', 'CATHEDRAL_PARK', 'PORTSMOUTH', 'UNIVERSITY_PARK', 'KENTON', 'ALBERTA_ARTS', 'CONCORDIA', 'BEAUMONT_WILSHIRE', 'HOLLYWOOD', 'ROSEWAY', 'CULLY', 'IRVINGTON', 'SABIN', 'KING', 'NOB_HILL', 'SLABTOWN', 'FOREST_PARK', 'HAWTHORNE', 'DIVISION', 'BELMONT', 'BUCKMAN', 'MT_TABOR', 'SELLWOOD_MORELAND', 'REED', 'LADD_ADDITION', 'CRESTON_KENILWORTH', 'WOODSTOCK', 'MONTAVILLA', 'HILLSDALE', 'MULTNOMAH_VILLAGE', 'SOUTHWEST_HILLS', 'GATEWAY', 'PARKROSE', 'LENTS', 'POWELLHURST_GILBERT', 'ARGAY');

-- DropForeignKey
ALTER TABLE "AlsoRecommend" DROP CONSTRAINT "AlsoRecommend_postId_fkey";

-- DropForeignKey
ALTER TABLE "AlsoRecommend" DROP CONSTRAINT "AlsoRecommend_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "heroImgUrl" TEXT NOT NULL,
ADD COLUMN     "location" "POST_LOCATION" NOT NULL,
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "type" "POST_TYPE" NOT NULL;

-- DropTable
DROP TABLE "AlsoRecommend";

-- DropTable
DROP TABLE "Comment";

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bookmark_postId_idx" ON "Bookmark"("postId");

-- CreateIndex
CREATE INDEX "Bookmark_userId_idx" ON "Bookmark"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_postId_key" ON "Bookmark"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
