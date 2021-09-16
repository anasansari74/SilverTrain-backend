/*
  Warnings:

  - You are about to drop the column `userId` on the `TrainRide` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainRide" DROP CONSTRAINT "TrainRide_userId_fkey";

-- AlterTable
ALTER TABLE "TrainRide" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_TrainRideToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TrainRideToUser_AB_unique" ON "_TrainRideToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainRideToUser_B_index" ON "_TrainRideToUser"("B");

-- AddForeignKey
ALTER TABLE "_TrainRideToUser" ADD FOREIGN KEY ("A") REFERENCES "TrainRide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainRideToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
