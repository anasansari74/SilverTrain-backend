/*
  Warnings:

  - You are about to drop the `TrainTicketsOnTrainRides` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `TrainTicket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TrainTicketsOnTrainRides" DROP CONSTRAINT "TrainTicketsOnTrainRides_trainRideId_fkey";

-- DropForeignKey
ALTER TABLE "TrainTicketsOnTrainRides" DROP CONSTRAINT "TrainTicketsOnTrainRides_trainTicketId_fkey";

-- AlterTable
ALTER TABLE "TrainRide" ADD COLUMN     "trainTicketId" INTEGER;

-- AlterTable
ALTER TABLE "TrainTicket" ADD COLUMN     "class" "Class" NOT NULL DEFAULT E'ECONOMY',
ADD COLUMN     "trainRideId" INTEGER,
ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "TrainTicketsOnTrainRides";

-- CreateTable
CREATE TABLE "_TrainRideToTrainTicket" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TrainRideToTrainTicket_AB_unique" ON "_TrainRideToTrainTicket"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainRideToTrainTicket_B_index" ON "_TrainRideToTrainTicket"("B");

-- AddForeignKey
ALTER TABLE "_TrainRideToTrainTicket" ADD FOREIGN KEY ("A") REFERENCES "TrainRide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainRideToTrainTicket" ADD FOREIGN KEY ("B") REFERENCES "TrainTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
