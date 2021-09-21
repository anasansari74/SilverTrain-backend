/*
  Warnings:

  - You are about to drop the `_TrainRideToTrainTicket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `trainRideId` to the `TrainTicket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TrainRideToTrainTicket" DROP CONSTRAINT "_TrainRideToTrainTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainRideToTrainTicket" DROP CONSTRAINT "_TrainRideToTrainTicket_B_fkey";

-- AlterTable
ALTER TABLE "TrainTicket" ADD COLUMN     "trainRideId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_TrainRideToTrainTicket";

-- AddForeignKey
ALTER TABLE "TrainTicket" ADD CONSTRAINT "TrainTicket_trainRideId_fkey" FOREIGN KEY ("trainRideId") REFERENCES "TrainRide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
