/*
  Warnings:

  - You are about to drop the column `slug` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomSlug]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomSlug` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "slug",
ADD COLUMN     "roomSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomSlug_key" ON "Room"("roomSlug");
