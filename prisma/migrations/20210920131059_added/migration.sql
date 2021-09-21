/*
  Warnings:

  - You are about to drop the column `class` on the `TrainRide` table. All the data in the column will be lost.
  - You are about to drop the `_TrainRideToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TrainRideToUser" DROP CONSTRAINT "_TrainRideToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainRideToUser" DROP CONSTRAINT "_TrainRideToUser_B_fkey";

-- AlterTable
ALTER TABLE "TrainRide" DROP COLUMN "class";

-- DropTable
DROP TABLE "_TrainRideToUser";

-- CreateTable
CREATE TABLE "TrainTicket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "TrainTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainTicketsOnTrainRides" (
    "id" SERIAL NOT NULL,
    "class" "Class" NOT NULL DEFAULT E'ECONOMY',
    "trainRideId" INTEGER NOT NULL,
    "trainTicketId" INTEGER NOT NULL,

    CONSTRAINT "TrainTicketsOnTrainRides_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainTicket" ADD CONSTRAINT "TrainTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainTicketsOnTrainRides" ADD CONSTRAINT "TrainTicketsOnTrainRides_trainRideId_fkey" FOREIGN KEY ("trainRideId") REFERENCES "TrainRide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainTicketsOnTrainRides" ADD CONSTRAINT "TrainTicketsOnTrainRides_trainTicketId_fkey" FOREIGN KEY ("trainTicketId") REFERENCES "TrainTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
