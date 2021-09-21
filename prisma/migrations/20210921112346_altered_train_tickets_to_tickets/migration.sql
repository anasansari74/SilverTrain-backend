/*
  Warnings:

  - You are about to drop the `TrainTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainTicket" DROP CONSTRAINT "TrainTicket_trainRideId_fkey";

-- DropForeignKey
ALTER TABLE "TrainTicket" DROP CONSTRAINT "TrainTicket_userId_fkey";

-- DropTable
DROP TABLE "TrainTicket";

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "class" "Class" NOT NULL DEFAULT E'ECONOMY',
    "userId" INTEGER NOT NULL,
    "trainRideId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_trainRideId_fkey" FOREIGN KEY ("trainRideId") REFERENCES "TrainRide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
